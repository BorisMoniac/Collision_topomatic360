import { Check, Clash, stateNames, isSnapshot } from "./domain";
export const escape = (v: unknown) =>
  String(v ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
export function download(name: string, content: string) {
  const url = URL.createObjectURL(
    new Blob([content], {
      type: name.endsWith(".html")
        ? "text/html;charset=utf-8"
        : "application/json;charset=utf-8",
    }),
  );
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  a.click();
  setTimeout(() => URL.revokeObjectURL(url), 60000);
}
const depthWords: Record<NonNullable<Clash["depth"]>, string> = {
  unmeasurable: "не определена",
  tolerance: "в пределах точности",
  approximate: "неполный расчёт",
};
export const depthCell = (r: Clash, type: Check["type"]) =>
  type === "duplicates"
    ? "—"
    : r.kind === "touch"
      ? "касание"
      : r.depth === "approximate"
        ? `≈ ${(r.penetrationMm ?? 0).toFixed(1)}`
        : r.depth
          ? depthWords[r.depth]
          : (r.penetrationMm ?? 0).toFixed(1);
export function reportHtml(check: Check, rows: Clash[]): string {
  const e = escape;
  return `<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${e(check.name)}</title><style>body{font:14px/1.5 system-ui;margin:24px;background:#171c23;color:#e6edf5}h1{margin:0}small{color:#a9b7c8}input,select{padding:10px;margin:15px 8px 15px 0;max-width:100%;background:#242e3b;color:inherit;border:1px solid #506074;border-radius:6px}.wrap{overflow:auto}table{border-collapse:separate;border-spacing:0;width:100%}td,th{padding:10px;border-bottom:1px solid #39475a;min-width:100px;vertical-align:top;overflow-wrap:anywhere}th{background:#253142;position:sticky;top:0;text-align:left;white-space:normal}td{max-width:350px}tr[hidden]{display:none}.shot{display:block;width:260px;border:0;background:transparent;padding:0;cursor:zoom-in}dialog{width:min(94vw,1400px);border:1px solid #506074;background:#20242b;color:white;border-radius:10px}dialog img{max-width:100%;max-height:80vh;display:block;margin:12px auto}dialog::backdrop{background:#000b}.shot img{width:100%;border-radius:6px}.legend{margin:12px 0}.red{color:#ff6161}.blue{color:#65baff}@media print{input,select{display:none}body{background:white;color:black}.wrap{overflow:visible}th{position:static;background:#eee}}</style><h1>${e(check.name)}</h1><small>НашеПО · Проверки коллизий · ${e(check.lastRun || "")} · ${check.status === "stale" ? "Результат устарел" : "Последний завершённый расчёт"}</small><p>${e(check.type === "duplicates" ? "Совпадение треугольной геометрии" : "Пересечения поверхностей и вложенность замкнутых тел")}. Точность: ${e(check.precision)} мм${check.type === "intersection" ? `; минимальная глубина: ${e(check.minPenetration)} мм` : ""}. Глубина Hard Clash — толщина самого сильного из отдельных перекрытий пары. «Касание» означает, что общего объёма у тел нет. «Не определена» — у элемента нет собственного объёма. «В пределах точности» — перекрытие тоньше заданной точности расчёта. «Неполный расчёт» со знаком ≈ — контакт разделён не полностью и значение может быть завышено. Порог минимальной глубины на все эти строки не действует: решение по ним принимает человек.</p><p class="legend"><span class="red">● Элемент А выделен красным</span> · <span class="blue">● элемент Б — синим</span></p><input id="search" type="search" placeholder="Поиск по всему отчёту"><select id="state"><option value="">Все состояния</option>${Object.entries(
    stateNames,
  )
    .map(([k, v]) => `<option value="${k}">${v}</option>`)
    .join(
      "",
    )}</select>${check.type === "intersection" ? '<input id="depth" type="number" min="0" step="1" placeholder="Глубина от, мм">' : ""}<span id="count"></span><div class="wrap"><table><thead><tr>${["Снимок", "№", "Состояние", "Глубина, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "X", "Y", "Z", "Назначение", "Комментарий"].map((x) => `<th>${x}</th>`).join("")}</tr></thead><tbody>${rows.map((r, i) => `<tr data-state="${r.state}" data-depth="${r.penetrationMm ?? 0}"${r.depth && r.kind !== "touch" ? " data-unmeasured=\"1\"" : ""}><td>${isSnapshot(r.image) ? `<button class="shot" type="button"><img src="${r.image}" alt="Снимок конфликта ${i + 1}" loading="lazy"></button>` : "Снимок отсутствует"}</td>${[i + 1, stateNames[r.state], depthCell(r, check.type), r.a.name, r.a.model, r.a.guid, r.b.name, r.b.model, r.b.guid, ...r.point.map((v) => v.toFixed(4)), r.assignee, r.note].map((v) => `<td>${e(v)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><dialog id="picture"><button id="close-picture">Закрыть</button><img id="full-picture" alt="Снимок конфликта"></dialog><script>const modal=document.getElementById("picture");document.getElementById("close-picture").onclick=()=>modal.close();for(const b of document.querySelectorAll(".shot"))b.onclick=()=>{document.getElementById("full-picture").src=b.querySelector("img").src;modal.showModal()};const PREC=${Number(check.precision) || 0},q=document.getElementById('search'),s=document.getElementById('state'),d=document.getElementById('depth'),rows=[...document.querySelectorAll('tbody tr')];function filter(){let n=0;for(const r of rows){r.hidden=!!((s.value&&r.dataset.state!==s.value)||(d&&!r.dataset.unmeasured&&Number(r.dataset.depth)+PREC<Number(d.value||0))||!r.textContent.toLowerCase().includes(q.value.toLowerCase()));if(!r.hidden)n++}document.getElementById('count').textContent='Коллизий: '+n}q.oninput=s.onchange=filter;if(d)d.oninput=filter;filter()</script></html>`;
}
export function viewerSession(check: Check, rows: Clash[]): string {
  return JSON.stringify(
    {
      version: 1,
      id: check.id,
      name: check.name,
      images: Object.fromEntries(
        rows
          .filter((r) => isSnapshot(r.image))
          .map((r) => [r.id + ".jpg", r.image]),
      ),
      warnings: check.warnings,
      tests: [
        {
          id: check.id,
          name: check.name,
          clashes: rows.map((r, i) => ({
            id: r.id,
            name: `Конфликт ${i + 1}`,
            distance:
              check.type === "duplicates"
                ? ""
                : r.depth || r.kind === "touch"
                  ? depthCell(r, check.type)
                  : `${(r.penetrationMm ?? 0).toFixed(1)} мм`,
            date: check.lastRun || "",
            description:
              check.type === "duplicates" ? "Дублирование" : "По пересечению",
            status: stateNames[r.state],
            group: r.assignee,
            note: r.note,
            point: r.point,
            image: isSnapshot(r.image) ? r.id + ".jpg" : "",
            enabled: r.state !== "resolved",
            reviewed:
              r.state === "resolved" ||
              r.state === "reviewed" ||
              r.state === "approved",
            excluded: r.state === "excluded",
            elements: [r.a, r.b].map((e) => ({
              guid: e.guid,
              id: e.id,
              source: e.model,
              name: e.name,
              properties: e.properties,
            })),
            properties: {
              Проверка: check.name,
              Вид: r.kind,
              "Расчётная глубина пересечения, мм": depthCell(r, check.type),
            },
          })),
        },
      ],
    },
    null,
    2,
  );
}
