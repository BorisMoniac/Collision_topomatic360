import { Clash } from "./domain";
import { escape as e } from "./export";
import { ResponseMatch, WorkResponse, replyStateNames, replyDecisionNames } from "./responses";

export function responseDialog(root: ShadowRoot, response: WorkResponse, matches: ResponseMatch[]): Promise<boolean> {
  const ready = matches.filter(m => m.clash && !m.reason && !m.duplicate),
    repeats = matches.filter(m => m.duplicate).length, errors = matches.filter(m => m.reason).length;
  const dialog = document.createElement("dialog");
  dialog.className = "response-dialog";
  dialog.innerHTML = `<h2>Ответ исполнителя · ${e(response.author)}</h2>
    <p>Новых отметок: <b>${ready.length}</b> · Уже загружено: ${repeats} · Не сопоставлено: ${errors}</p>
    <p>Комментарии сохранятся в истории. Текущие состояния коллизий изменятся только после вашего решения в карточке результата.</p>
    ${ready.some(m => m.stale) ? '<p class="response-warning">Есть ответы по прежнему запуску или изменённым координатам. Сверьте их с актуальными моделями.</p>' : ""}
    ${ready.some(m => m.legacy) ? '<p class="response-warning">У части исходных пакетов нет идентификатора проекта. Сопоставление выполнено по точным ID проверки и коллизии, GUID и моделям пары.</p>' : ""}
    <div class="response-list"><table><thead><tr><th>Проверка / коллизия</th><th>Ответ</th><th>Комментарий</th><th>Сопоставление</th></tr></thead><tbody>${matches.slice(0,200).map(m => `<tr><td>${e(m.check?.name || m.change.checkId)}<br>${e(m.clash ? m.clash.a.name + " × " + m.clash.b.name : m.change.clashId)}</td><td>${e(replyStateNames[m.change.state])}</td><td>${e(m.change.comment)}</td><td>${e(m.reason || (m.duplicate ? "Уже загружено" : m.stale ? "Требует сверки с новым запуском" : "Готово к загрузке"))}</td></tr>`).join("")}</tbody></table></div>
    ${matches.length > 200 ? `<p>Показаны первые 200 из ${matches.length} записей; будут загружены все ${ready.length} сопоставленных отметок.</p>` : ""}
    <div class="dialog-actions"><button data-cancel>Закрыть</button><button data-apply class="primary" ${ready.length ? "" : "disabled"}>Загрузить ${ready.length} отметок</button></div>`;
  root.append(dialog);
  return new Promise(resolve => {
    let applied = false;
    dialog.querySelector<HTMLButtonElement>("[data-cancel]")!.onclick = () => dialog.close();
    dialog.querySelector<HTMLButtonElement>("[data-apply]")!.onclick = () => { applied = true; dialog.close(); };
    dialog.onclose = () => { dialog.remove(); resolve(applied); };
    dialog.showModal();
  });
}

export function repliesHtml(r: Clash): string {
  if (!r.workReplies?.length) return "";
  return `<details class="work-replies" open><summary>Ответы исполнителей · ${r.workReplies.length}</summary>${[...r.workReplies].reverse().map(w =>
    `<article><b>${e(w.author)} · ${e(replyStateNames[w.state])}</b><small>${e(w.modifiedAt)} · ${e(replyDecisionNames[w.decision])}</small><p>${e(w.comment || "Без комментария")}</p>
    ${w.stale ? '<small class="response-warning">Ответ относится к предыдущему запуску или другим координатам. Состояние текущей коллизии показано отдельно.</small>' : ""}
    ${w.decision === "pending" ? `<div class="dialog-actions"><button data-reply="${e(w.changeId)}" data-decision="accepted">${w.state === "fixed" ? "Подтвердить исправление" : w.state === "excluded" ? "Принять исключение" : "Вернуть в работу"}</button><button data-reply="${e(w.changeId)}" data-decision="rejected">Отклонить</button></div>` : `<small>Решение: ${e(w.decidedAt || "")}</small>`}</article>`).join("")}</details>`;
}
