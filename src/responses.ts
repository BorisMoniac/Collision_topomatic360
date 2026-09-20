import { unzipSync, strFromU8 } from "fflate";
import { Check, Clash, ElementInfo, Project, Vec, WorkReply } from "./domain";

export interface ResponseElement { id: string; guid: string; source: string; name?: string }
export interface WorkChange {
  changeId: string; projectId: string; checkId: string; clashId: string;
  exportId: string; baseRun: string; state: "fixed" | "excluded" | "active";
  comment: string; modifiedAt: string;
  a: ResponseElement; b: ResponseElement; point: Vec;
}
export interface WorkResponse {
  format: "nashepo.clash-response"; version: 1;
  responseId: string; createdAt: string; author: string; changes: WorkChange[];
}
const text = (s: unknown, max = 2048): s is string => typeof s === "string" && s.length <= max;
const date = (s: unknown) => text(s, 80) && Number.isFinite(Date.parse(s));
const point = (p: unknown): p is Vec => Array.isArray(p) && p.length === 3 && p.every(Number.isFinite);
const element = (e: ResponseElement) => e && text(e.id) && text(e.guid) && text(e.source) && !!(e.guid || e.id);

export function parseResponse(source: string): WorkResponse {
  const r = JSON.parse(source) as WorkResponse;
  if (r?.format !== "nashepo.clash-response" || r.version !== 1 || !text(r.responseId) || !r.responseId ||
      !date(r.createdAt) || !text(r.author, 200) || !r.author.trim() || !Array.isArray(r.changes) || r.changes.length > 50000)
    throw Error("Это не поддерживаемый отчёт исполнителя НашеПО.");
  const ids = new Set<string>();
  for (const c of r.changes) {
    if (!c || ![c.changeId,c.checkId,c.clashId].every(v => text(v) && !!v) || ids.has(c.changeId) ||
        ![c.projectId,c.exportId,c.baseRun].every(v => text(v)) ||
        !["fixed","excluded","active"].includes(c.state) || !text(c.comment, 20000) || !date(c.modifiedAt) ||
        !element(c.a) || !element(c.b) || !point(c.point))
      throw Error("Некорректная или повторяющаяся запись ответа исполнителя.");
    ids.add(c.changeId);
  }
  return r;
}

export async function readResponse(file: File): Promise<WorkResponse> {
  if (file.size > 1024 * 1024 * 1024) throw Error("Архив ответа превышает 1 ГБ.");
  if (!/\.zip$/i.test(file.name)) {
    if (file.size > 64 * 1024 * 1024) throw Error("Файл ответа превышает 64 МБ.");
    return parseResponse(await file.text());
  }
  let found = false;
  const files = unzipSync(new Uint8Array(await file.arrayBuffer()), { filter: f => {
    if (f.name !== "response.json") return false;
    if (found || f.originalSize > 64 * 1024 * 1024) throw Error("Некорректный размер или повтор response.json.");
    found = true;
    return true;
  }});
  if (!files["response.json"]) throw Error("В архиве нет response.json. Нужен ответ исполнителя из РОБУР, а не исходный пакет проверки.");
  return parseResponse(strFromU8(files["response.json"]));
}

export const replyStateNames = { fixed: "Исправленный", excluded: "Исключённый", active: "В работе" };
export const replyDecisionNames = { pending: "Ожидает решения", accepted: "Принято", rejected: "Отклонено" };
export interface ResponseMatch {
  change: WorkChange; check?: Check; clash?: Clash; reason?: string;
  stale?: boolean; duplicate?: boolean; legacy?: boolean;
}
const sameElement = (e: ElementInfo, p: ResponseElement) => e.model === p.source &&
  (e.guid && p.guid ? e.guid === p.guid : e.id === p.id);

/** Match exact check/result IDs AND the pair; never match by row number or caption. */
export function previewResponse(project: Project, projectId: string | undefined, response: WorkResponse): ResponseMatch[] {
  const checks = new Map(project.checks.map(c => [c.id,c]));
  const known = new Map(project.checks.flatMap(c => c.results.flatMap(r => (r.workReplies || []).map(w => [w.changeId,{reply:w, checkId:c.id, clashId:r.id}] as const))));
  return response.changes.map(change => {
    const result: ResponseMatch = { change, legacy: !change.projectId };
    if (change.projectId && change.projectId !== projectId)
      return { ...result, reason: "Другая папка проекта. Откройте исходный проект проверок." };
    const check = checks.get(change.checkId), clash = check?.results.find(r => r.id === change.clashId);
    if (!check || !clash) return { ...result, reason: "Исходная проверка или коллизия не найдена." };
    if (!(sameElement(clash.a,change.a) && sameElement(clash.b,change.b) ||
          sameElement(clash.a,change.b) && sameElement(clash.b,change.a)))
      return { ...result, reason: "Не совпадают GUID / идентификаторы или модели пары." };
    const existing = known.get(change.changeId), previous = existing?.reply;
    if (previous) {
      if (existing!.checkId !== change.checkId || existing!.clashId !== change.clashId || previous.state !== change.state || previous.comment !== change.comment || previous.author !== response.author ||
          previous.modifiedAt !== change.modifiedAt || previous.baseRun !== change.baseRun ||
          previous.point.some((v,i) => v !== change.point[i]))
        return { ...result, reason: "Идентификатор изменения уже существует с другим содержимым." };
      return { ...result, check, clash, duplicate: true };
    }
    return { ...result, check, clash,
      stale: !change.baseRun || change.baseRun !== (check.lastRun || "") ||
        Math.hypot(...clash.point.map((v,i) => v - change.point[i])) > 0.001 };
  });
}

export function applyResponse(project: Project, projectId: string | undefined, response: WorkResponse): number {
  let added = 0;
  for (const m of previewResponse(project,projectId,response)) {
    if (!m.clash || m.reason || m.duplicate) continue;
    const c = m.change;
    (m.clash.workReplies ??= []).push({ changeId:c.changeId,responseId:response.responseId,
      author:response.author,state:c.state,comment:c.comment,modifiedAt:c.modifiedAt,
      baseRun:c.baseRun,exportId:c.exportId,point:[...c.point],importedAt:new Date().toISOString(),
      decision:"pending",stale:!!m.stale,legacy:!!m.legacy });
    added++;
  }
  return added;
}

export function decideReply(clash: Clash, reply: WorkReply, decision: "accepted" | "rejected") {
  if (!clash.workReplies?.includes(reply) || reply.decision !== "pending") throw Error("Решение по этому ответу уже принято.");
  reply.decision = decision;
  reply.decidedAt = new Date().toISOString();
  if (decision === "accepted") {
    clash.state = reply.state === "fixed" ? "resolved" : reply.state === "excluded" ? "excluded" : "active";
    if (reply.state === "excluded") clash.exclusionPoint = [...clash.point];
    else delete clash.exclusionPoint;
  }
}

export function replySummary(r: Clash) {
  const replies = r.workReplies || [], pending = replies.filter(w => w.decision === "pending").length,
    last = replies[replies.length - 1];
  return pending ? `${pending} · ожидает решения` : last ? `${last.stale ? "Ранее: " : ""}${replyStateNames[last.state]} · ${replyDecisionNames[last.decision]}` : "—";
}
