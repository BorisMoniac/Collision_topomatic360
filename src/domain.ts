export type Vec = [number, number, number];
export const isSnapshot = (value: unknown): value is string =>
  typeof value === "string" &&
  /^data:image\/(jpeg|png);base64,[A-Za-z0-9+/=]+$/.test(value);
export type State =
  | "new"
  | "active"
  | "reviewed"
  | "approved"
  | "resolved"
  | "excluded";
export const stateNames: Record<State, string> = {
  new: "Новый",
  active: "Активный",
  reviewed: "Проверенный",
  approved: "Подтверждённый",
  resolved: "Исправленный",
  excluded: "Исключённый",
};
export type Op = "eq" | "contains" | "ne" | "exists" | "gt" | "lt";
export interface Condition {
  field: string;
  op: Op;
  value: string;
}
export interface Selection {
  models: string[];
  modelsMode?: "all" | "selected";
  conditions: Condition[];
  mode: "all" | "any";
  include: string[];
  exclude: string[];
  manualOnly?: boolean;
  presetId?: string;
}
export interface ParameterSet {
  id: string;
  name: string;
  selection: Pick<Selection, "models" | "modelsMode" | "conditions" | "mode">;
}
export interface ElementInfo {
  id: string;
  name: string;
  model: string;
  modelId: string;
  guid: string;
  properties: Record<string, string>;
  hidden: boolean;
}
export interface GeometryElement extends ElementInfo {
  triangles: Float64Array;
  vertices?: Float64Array;
  indices?: Uint32Array;
  triangleCount?: number;
  closed: boolean;
  bounds: { min: Vec; max: Vec };
}
export interface Clash {
  id: string;
  a: ElementInfo;
  b: ElementInfo;
  point: Vec;
  kind: "surface" | "contained" | "duplicate";
  state: State;
  note: string;
  assignee: string;
  firstSeen: string;
  lastSeen: string;
  image?: string;
  penetrationMm?: number;
}
export interface Check {
  id: string;
  name: string;
  type: "intersection" | "duplicates";
  a: Selection;
  b: Selection;
  precision: number;
  minPenetration: number;
  touching: boolean;
  ignoreSameModel: boolean;
  ignoreSameGroup: boolean;
  equalProperty: string;
  includeHidden: boolean;
  results: Clash[];
  lastRun?: string;
  fingerprint?: string;
  configAtRun?: string;
  modelsAtRun?: string[];
  status: "new" | "done" | "stale";
  warnings: string[];
}
export interface Project {
  format: "nashepo.checks";
  version: 1;
  checks: Check[];
  sets: ParameterSet[];
}
export const selection = (): Selection => ({
  models: [],
  modelsMode: "all",
  conditions: [],
  mode: "all",
  include: [],
  exclude: [],
});
export const newCheck = (): Check => ({
  id: crypto.randomUUID(),
  name: "Новая проверка",
  type: "intersection",
  a: selection(),
  b: selection(),
  precision: 0.1,
  minPenetration: 0,
  touching: false,
  ignoreSameModel: false,
  ignoreSameGroup: false,
  equalProperty: "",
  includeHidden: false,
  results: [],
  status: "new",
  warnings: [],
});
export const info = ({
  triangles: _,
  vertices: _v,
  indices: _i,
  triangleCount: _n,
  closed: __,
  bounds: ___,
  ...rest
}: GeometryElement): ElementInfo => rest;
export function matches(e: ElementInfo, s: Selection): boolean {
  if (s.exclude.includes(e.id)) return false;
  if (s.include.includes(e.id)) return true;
  if (s.manualOnly) return false;
  if (s.modelsMode === "selected" && !s.models.includes(e.modelId))
    return false;
  if (
    s.modelsMode === undefined &&
    s.models.length &&
    !s.models.includes(e.modelId)
  )
    return false;
  const pass = (c: Condition) => {
    const raw = e.properties[c.field];
    const v = (raw ?? "").toLocaleLowerCase();
    const q = c.value.toLocaleLowerCase();
    switch (c.op) {
      case "exists":
        return raw !== undefined && raw !== "";
      case "eq":
        return raw !== undefined && v === q;
      case "ne":
        return raw !== undefined && v !== q;
      case "contains":
        return raw !== undefined && v.includes(q);
      case "gt":
        return (
          raw !== undefined &&
          raw.trim() !== "" &&
          Number(raw.replace(",", ".")) > Number(c.value.replace(",", "."))
        );
      case "lt":
        return (
          raw !== undefined &&
          raw.trim() !== "" &&
          Number(raw.replace(",", ".")) < Number(c.value.replace(",", "."))
        );
    }
  };
  return (
    !s.conditions.length ||
    (s.mode === "all" ? s.conditions.every(pass) : s.conditions.some(pass))
  );
}
export const configKey = (c: Check) =>
  JSON.stringify([
    c.type,
    ...[c.a, c.b].map(
      ({
        models,
        modelsMode,
        conditions,
        mode,
        include,
        exclude,
        manualOnly,
      }) => ({
        models,
        modelsMode,
        conditions,
        mode,
        include,
        exclude,
        manualOnly,
      }),
    ),
    c.precision,
    c.minPenetration,
    c.touching,
    c.ignoreSameModel,
    c.ignoreSameGroup,
    c.equalProperty,
    c.includeHidden,
  ]);
export const pairKey = (a: string, b: string) => JSON.stringify([a, b].sort());
export function reconcile(
  previous: Clash[],
  found: Clash[],
  now: string,
): Clash[] {
  const old = new Map(previous.map((c) => [c.id, c]));
  const result = found.map((c) => {
    const p = old.get(c.id);
    old.delete(c.id);
    return {
      ...c,
      note: p?.note ?? "",
      assignee: p?.assignee ?? "",
      firstSeen: p?.firstSeen ?? now,
      lastSeen: now,
      state:
        !p || p.state === "resolved"
          ? "new"
          : p.state === "new"
            ? "active"
            : p.state,
    } as Clash;
  });
  for (const p of old.values())
    result.push({
      ...p,
      state: p.state === "excluded" ? "excluded" : "resolved",
    });
  return result;
}
export function readProject(text: string): Project {
  const p = JSON.parse(text) as Project;
  if (
    p?.format !== "nashepo.checks" ||
    p.version !== 1 ||
    !Array.isArray(p.checks)
  )
    throw Error("Это не файл проекта проверок НашеПО.");
  const seen = new Set<string>();
  p.sets ??= [];
  if (
    !Array.isArray(p.sets) ||
    !p.sets.every(
      (set) =>
        set &&
        typeof set.id === "string" &&
        typeof set.name === "string" &&
        set.selection &&
        Array.isArray(set.selection.models) &&
        set.selection.models.every((id) => typeof id === "string") &&
        (set.selection.modelsMode === undefined ||
          ["all", "selected"].includes(set.selection.modelsMode)) &&
        Array.isArray(set.selection.conditions) &&
        set.selection.conditions.every(
          (condition) =>
            condition &&
            typeof condition.field === "string" &&
            typeof condition.value === "string" &&
            ["eq", "ne", "contains", "exists", "gt", "lt"].includes(
              condition.op,
            ),
        ) &&
        ["all", "any"].includes(set.selection.mode),
    )
  )
    throw Error("Некорректные наборы параметров.");
  for (const set of p.sets)
    set.selection.modelsMode ??= set.selection.models.length
      ? "selected"
      : "all";
  for (const c of p.checks) {
    if (
      !c ||
      typeof c.id !== "string" ||
      seen.has(c.id) ||
      typeof c.name !== "string" ||
      !["intersection", "duplicates"].includes(c.type) ||
      !["new", "done", "stale"].includes(c.status) ||
      !Number.isFinite(c.precision) ||
      c.precision < 0.001 ||
      c.precision > 100 ||
      (c.minPenetration !== undefined &&
        (!Number.isFinite(c.minPenetration) ||
          c.minPenetration < 0 ||
          c.minPenetration > 100000)) ||
      !Array.isArray(c.results)
    )
      throw Error("Некорректные параметры проверки.");
    seen.add(c.id);
    c.minPenetration ??= 0;
    if (
      ![
        "touching",
        "ignoreSameModel",
        "ignoreSameGroup",
        "includeHidden",
      ].every(
        (k) =>
          typeof (c as unknown as Record<string, unknown>)[k] === "boolean",
      ) ||
      typeof c.equalProperty !== "string" ||
      (c.warnings !== undefined &&
        (!Array.isArray(c.warnings) ||
          !c.warnings.every((warning) => typeof warning === "string"))) ||
      (c.modelsAtRun !== undefined &&
        (!Array.isArray(c.modelsAtRun) ||
          !c.modelsAtRun.every((id) => typeof id === "string")))
    )
      throw Error("Некорректные правила проверки.");
    c.warnings ??= [];
    for (const s of [c.a, c.b]) {
      if (
        !s ||
        (s.manualOnly !== undefined && typeof s.manualOnly !== "boolean") ||
        (s.modelsMode !== undefined &&
          !["all", "selected"].includes(s.modelsMode)) ||
        (s.presetId !== undefined && typeof s.presetId !== "string") ||
        !["all", "any"].includes(s.mode) ||
        ![s.models, s.include, s.exclude].every(
          (a) => Array.isArray(a) && a.every((v) => typeof v === "string"),
        ) ||
        !Array.isArray(s.conditions) ||
        !s.conditions.every(
          (v) =>
            v &&
            typeof v.field === "string" &&
            typeof v.value === "string" &&
            ["eq", "ne", "contains", "exists", "gt", "lt"].includes(v.op),
        )
      )
        throw Error("Некорректная выборка.");
      s.modelsMode ??= s.models.length ? "selected" : "all";
    }
    for (const r of c.results) {
      if (r?.image !== undefined && !isSnapshot(r.image))
        throw Error("Некорректный снимок результата.");
      if (
        !r ||
        typeof r.id !== "string" ||
        !Object.hasOwn(stateNames, r.state) ||
        (r.penetrationMm !== undefined &&
          (!Number.isFinite(r.penetrationMm) || r.penetrationMm < 0)) ||
        !Array.isArray(r.point) ||
        r.point.length !== 3 ||
        !r.point.every(Number.isFinite)
      )
        throw Error("Некорректный результат.");
      for (const e of [r.a, r.b])
        if (
          !e ||
          !["id", "name", "model", "modelId", "guid"].every(
            (k) =>
              typeof (e as unknown as Record<string, unknown>)[k] === "string",
          ) ||
          !e.properties ||
          typeof e.properties !== "object"
        )
          throw Error("Некорректный элемент результата.");
    }
  }
  return p;
}
