import { Check, Clash, stateNames, isSnapshot } from "./domain";
import { utf8, zip } from "./archive";
import { version as pluginVersion } from "../package.json";
export const escape = (v: unknown) =>
  String(v ?? "").replace(
    /[&<>"']/g,
    (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[
        c
      ]!,
  );
export function download(name: string, content: string | Blob) {
  const url = URL.createObjectURL(
    content instanceof Blob ? content : new Blob([content], {
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

const fileName = (value: string) =>
  (value || "Отчёт о конфликтах")
    .replace(/[<>:"/\\|?*\u0000-\u001f]/g, "_")
    .replace(/[. ]+$/g, "")
    .slice(0, 100) || "Отчёт о конфликтах";

const imageBytes = (value: string) => {
  const comma = value.indexOf(","), binary = atob(value.slice(comma + 1)),
    result = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) result[i] = binary.charCodeAt(i);
  return result;
};

const navisStatus: Record<Clash["state"], string> = {
  new: "Новый", active: "Активн.", reviewed: "Проверен",
  approved: "Утвержден", resolved: "Исправлен", excluded: "Исключен",
};

const property = (item: Clash["a"], ...names: string[]) => {
  const normalize = (value: string) => value.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, "");
  const expected = new Set(names.map(normalize));
  const found = Object.entries(item.properties || {}).find(([key]) => expected.has(normalize(key)));
  return found?.[1] || "";
};

const navisDistance = (check: Check, row: Clash) =>
  check.type === "duplicates" ? "0.000" :
    row.kind === "touch" ? "0.000" :
      row.penetrationMm === undefined || row.depth === "unmeasurable" || row.depth === "tolerance" ? "" :
        (-row.penetrationMm / 1000).toFixed(3);

const navisDescription = (check: Check, row: Clash) =>
  check.type === "duplicates" ? "Дублирование" :
    row.kind === "touch" ? "Касание" :
      row.axialPenetrationMm !== undefined ? "По пересечению · продольный заход" : "По пересечению";

const itemValues = (item: Clash["a"]) => [
  `ID объекта: ${item.id}`,
  property(item, "Слой", "Layer"),
  item.model,
  property(item, "Объект Id", "Object Id", "Id") || item.id,
  property(item, "IfcName", "ifc.name") || item.name,
  item.guid,
  property(item, "Категория", "Category"),
  property(item, "Семейство", "Family"),
  property(item, "Объект Тип", "Тип", "Type"),
  property(item, "IfcClass", "ifc.class", "Класс IFC"),
];

export interface NavisReportPackage {
  archiveName: string;
  htmlName: string;
  imageCount: number;
  blob: Blob;
}

/** Navisworks-compatible tabular HTML with relative image links, packed with
 * its JPEG/PNG folder because a browser cannot download a directory atomically.
 */
export function navisReportPackage(check: Check, rows: Clash[]): NavisReportPackage {
  const base = fileName(check.name), folder = `${base}_files`, files: { name: string; data: Uint8Array }[] = [],
    images = new Map<string, string>();
  for (let i = 0; i < rows.length; i++) {
    const image = rows[i].image;
    if (!isSnapshot(image)) continue;
    const extension = image.startsWith("data:image/png") ? "png" : "jpg",
      name = `cd${String(i + 1).padStart(6, "0")}.${extension}`;
    images.set(rows[i].id, name);
    files.push({ name: `${folder}/${name}`, data: imageBytes(image) });
  }
  const generalHeaders = ["Изображение", "Наименование конфликта", "Статус", "Расстояние", "Расположение сетки", "Описание:", "Дата обнаружения", "Точка конфликта", "Назначение", "Комментарий", "Толщина перекрытия, мм", "Заход вдоль оси, мм", "Длина контакта, мм"],
    itemHeaders = ["Идентификатор элемента", "Слой", "Элемент Файл источника", "Объект Id", "Объект IfcName", "Объект IfcGUID", "Объект Категория", "Объект Семейство", "Объект Тип", "Объект IfcClass"],
    header = generalHeaders.map(x => `<td class="generalHeader">${escape(x)}</td>`).join("") +
      itemHeaders.map(x => `<td class="item1Header">${escape(x)}</td>`).join("") +
      itemHeaders.map(x => `<td class="item2Header">${escape(x)}</td>`).join(""),
    body = rows.map((row, index) => {
      const image = images.get(row.id), path = image ? `${encodeURIComponent(folder)}/${image}` : "",
        general = [
          image ? `<a target="_blank" href="${path}"><img border="0" width="160" src="${path}" alt="Снимок конфликта ${index + 1}"></a>` : "Снимок отсутствует",
          `Конфликт${index + 1}`, navisStatus[row.state], navisDistance(check, row), "", navisDescription(check, row),
          row.firstSeen || check.lastRun || "", `X:${row.point[0].toFixed(4)}, Y:${row.point[1].toFixed(4)}, Z:${row.point[2].toFixed(4)}`,
          row.assignee, row.note,
          row.overlapThicknessMm === undefined ? "" : depthNumber(row.overlapThicknessMm),
          row.axialPenetrationMm === undefined ? "" : depthNumber(row.axialPenetrationMm),
          row.contactLengthMm === undefined ? "" : `≈ ${depthNumber(row.contactLengthMm)}`,
        ];
      return `<tr class="contentRow" data-check-id="${escape(check.id)}" data-clash-id="${escape(row.id)}">${general.map((value, i) => `<td class="contentCell">${i ? escape(value) : value}</td>`).join("")}${itemValues(row.a).map(value => `<td class="item1Content">${escape(value)}</td>`).join("")}${itemValues(row.b).map(value => `<td class="item2Content">${escape(value)}</td>`).join("")}</tr>`;
    }).join(""),
    html = `<!doctype html><html><head><meta charset="utf-8"><title>Отчет о конфликтах</title><style>body,table{font-family:Calibri,Tahoma,Verdana,Arial,sans-serif}table{border-collapse:collapse}.titleTable{margin-bottom:16px}.headerCell{font-size:18pt;font-weight:bold}.testSummaryTable{border:3px solid #222;background:#eee;margin-bottom:16px}.testName{font-size:16pt;font-weight:bold;padding:12px}.mainTable td{border:1px solid #999;padding:6px;vertical-align:middle;min-width:90px}.headerRow{font-weight:bold}.generalHeader{background:#eee}.item1Header{background:#9cf}.item2Header{background:#fcc}.item1Content{background:#def}.item2Content{background:#fee}.contentRow{height:100px}</style></head><body><table class="titleTable"><tr class="headerRow"><td class="headerCell">Отчет о конфликтах</td></tr></table><table class="testSummaryTable"><tr class="headerRow"><td class="testName">${escape(check.name)}</td></tr></table><table class="mainTable"><tr class="headerRow"><td colspan="${generalHeaders.length}" class="generalHeader"></td><td colspan="${itemHeaders.length}" class="item1Header">Элемент 1</td><td colspan="${itemHeaders.length}" class="item2Header">Элемент 2</td></tr><tr class="headerRow">${header}</tr>${body}</table></body></html>`;
  const htmlName = `${base}.html`;
  const review = viewerReport(
      check,
      rows,
      row => {
        const image = images.get(row.id);
        return image ? `${folder}/${image}` : "";
      },
      {},
    ),
    manifest = {
      format: "nashepo.clash-package",
      version: 1,
      createdAt: new Date().toISOString(),
      producer: {
        name: "nashepo.collisionfinder360",
        version: pluginVersion,
      },
      check: {
        id: check.id,
        name: check.name,
        type: check.type,
        status: check.status,
        lastRun: check.lastRun || "",
        models: check.modelsAtRun || [],
      },
      files: {
        report: htmlName,
        review: "review.json",
        images: folder,
      },
    };
  files.unshift(
    { name: htmlName, data: utf8(html) },
    { name: "review.json", data: utf8(JSON.stringify(review, null, 2)) },
    { name: "manifest.json", data: utf8(JSON.stringify(manifest, null, 2)) },
  );
  const bytes = zip(files), buffer = bytes.buffer.slice(bytes.byteOffset, bytes.byteOffset + bytes.byteLength) as ArrayBuffer;
  return { archiveName: `${base}.zip`, htmlName, imageCount: images.size,
    blob: new Blob([buffer], { type: "application/zip" }) };
}
export const depthWords: Record<NonNullable<Clash["depth"]>, string> = {
  unmeasurable: "не определена",
  tolerance: "требует уточнения",
  approximate: "приблизительная оценка",
};
// Preserve small measured penetrations instead of rounding them to zero.
export const depthNumber = (value = 0) =>
  value > 0 && value < 0.1
    ? String(Number(value.toPrecision(2)))
    : value.toFixed(1);
export const depthCell = (r: Clash, type: Check["type"]) =>
  type === "duplicates"
    ? "—"
    : r.kind === "touch"
      ? "касание"
      : r.depth === "approximate"
        ? `≈ ${depthNumber(r.penetrationMm)}`
        : r.depth
          ? depthWords[r.depth]
          : depthNumber(r.penetrationMm);
export function reportHtml(check: Check, rows: Clash[]): string {
  const e = escape;
  return `<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${e(check.name)}</title><style>body{font:14px/1.5 system-ui;margin:24px;background:#171c23;color:#e6edf5}h1{margin:0}small{color:#a9b7c8}input,select{padding:10px;margin:15px 8px 15px 0;max-width:100%;background:#242e3b;color:inherit;border:1px solid #506074;border-radius:6px}.wrap{overflow:auto}table{border-collapse:separate;border-spacing:0;width:100%}td,th{padding:10px;border-bottom:1px solid #39475a;min-width:100px;vertical-align:top;overflow-wrap:anywhere}th{background:#253142;position:sticky;top:0;text-align:left;white-space:normal}td{max-width:350px}tr[hidden]{display:none}.shot{display:block;width:260px;border:0;background:transparent;padding:0;cursor:zoom-in}dialog{width:min(94vw,1400px);border:1px solid #506074;background:#20242b;color:white;border-radius:10px}dialog img{max-width:100%;max-height:80vh;display:block;margin:12px auto}dialog::backdrop{background:#000b}.shot img{width:100%;border-radius:6px}.legend{margin:12px 0}.red{color:#ff6161}.blue{color:#65baff}@media print{input,select{display:none}body{background:white;color:black}.wrap{overflow:visible}th{position:static;background:#eee}}</style><h1>${e(check.name)}</h1><small>НашеПО · Проверки коллизий · ${e(check.lastRun || "")} · ${check.status === "stale" ? "Результат устарел" : "Последний завершённый расчёт"}</small><p>${e(check.type === "duplicates" ? "Совпадение треугольной геометрии" : "Пересечения поверхностей и вложенность замкнутых тел")}. Точность: ${e(check.precision)} мм${check.type === "intersection" ? `; минимальная глубина: ${e(check.minPenetration)} мм` : ""}. Глубина для отбора — большее из локальной толщины перекрытия и захода вдоль оси распознанного профиля в более крупную конструкцию. Для круглых кабелей и труб с поворотами измеряется самый длинный непрерывный участок восстановленной траектории внутри конструкции; такой замер имеет знак ≈. Продольный замер включает внутреннюю пустоту колодца: до конца профиля при частичном заходе, от входа до выхода при сквозном. Раздельные оболочки измеряются отдельно. Если продольный замер неприменим, используется локальная толщина. Это не расстояние перемещения, устраняющего коллизию. Длина контакта — отдельный приблизительный замер самого длинного непрерывного соприкосновения поверхностей вдоль распознанного профиля или трассы. Он учитывает боковой контакт, даже когда ось проходит снаружи конструкции, но не заменяет глубину и не участвует в её пороге. «Касание» — контакт без разрешённого объёмного перекрытия, с нулевой глубиной. «Не определена» — у геометрии не удалось определить внутреннюю область. «Требует уточнения» — пересечение найдено, но глубина не разрешена. Знак ≈ обозначает восстановление внутренней области повреждённой оболочки, совмещение швов, сокращённую выборку либо неполное разделение контактов. Погрешность оценки не гарантируется. Строки с неопределённой глубиной сохраняются при фильтрации; все числа, включая оценки со знаком ≈, и касания сравниваются с порогом с запасом на точность.</p><p class="legend"><span class="red">● Элемент А выделен красным</span> · <span class="blue">● элемент Б — синим</span></p><input id="search" type="search" placeholder="Поиск по всему отчёту"><select id="state"><option value="">Все состояния</option>${Object.entries(
    stateNames,
  )
    .map(([k, v]) => `<option value="${k}">${v}</option>`)
    .join(
      "",
    )}</select>${check.type === "intersection" ? '<input id="depth" type="number" min="0" step="1" placeholder="Глубина от, мм">' : ""}<span id="count"></span><div class="wrap"><table><thead><tr>${["Снимок", "№", "Состояние", "Глубина для отбора, мм", "Толщина перекрытия, мм", "Заход вдоль оси, мм", "Длина контакта, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "X", "Y", "Z", "Назначение", "Комментарий"].map((x) => `<th>${x}</th>`).join("")}</tr></thead><tbody>${rows.map((r, i) => `<tr data-state="${r.state}" data-depth="${r.penetrationMm ?? 0}"${(r.depth === "unmeasurable" || r.depth === "tolerance") && r.kind !== "touch" ? " data-unmeasured=\"1\"" : ""}><td>${isSnapshot(r.image) ? `<button class="shot" type="button"><img src="${r.image}" alt="Снимок конфликта ${i + 1}" loading="lazy"></button>` : "Снимок отсутствует"}</td>${[i + 1, stateNames[r.state], depthCell(r, check.type), r.overlapThicknessMm === undefined ? "—" : depthNumber(r.overlapThicknessMm), r.axialPenetrationMm === undefined ? "—" : depthNumber(r.axialPenetrationMm), r.contactLengthMm === undefined ? "—" : "≈ " + depthNumber(r.contactLengthMm), r.a.name, r.a.model, r.a.guid, r.b.name, r.b.model, r.b.guid, ...r.point.map((v) => v.toFixed(4)), r.assignee, r.note].map((v) => `<td>${e(v)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><dialog id="picture"><button id="close-picture">Закрыть</button><img id="full-picture" alt="Снимок конфликта"></dialog><script>const modal=document.getElementById("picture");document.getElementById("close-picture").onclick=()=>modal.close();for(const b of document.querySelectorAll(".shot"))b.onclick=()=>{document.getElementById("full-picture").src=b.querySelector("img").src;modal.showModal()};const PREC=${Number(check.precision) || 0},q=document.getElementById('search'),s=document.getElementById('state'),d=document.getElementById('depth'),rows=[...document.querySelectorAll('tbody tr')];function filter(){let n=0;for(const r of rows){r.hidden=!!((s.value&&r.dataset.state!==s.value)||(d&&!r.dataset.unmeasured&&Number(r.dataset.depth)+PREC<Number(d.value||0))||!r.textContent.toLowerCase().includes(q.value.toLowerCase()));if(!r.hidden)n++}document.getElementById('count').textContent='Коллизий: '+n}q.oninput=s.onchange=filter;if(d)d.oninput=filter;filter()</script></html>`;
}
export function viewerSession(check: Check, rows: Clash[]): string {
  const imageNames = new Map(
    rows
      .filter((r) => isSnapshot(r.image))
      .map((r) => [
        r.id,
        r.id + (r.image!.startsWith("data:image/png") ? ".png" : ".jpg"),
      ]),
  );
  return JSON.stringify(
    viewerReport(
      check,
      rows,
      row => imageNames.get(row.id) || "",
      Object.fromEntries(
        rows
          .filter((r) => isSnapshot(r.image))
          .map((r) => [imageNames.get(r.id)!, r.image!]),
      ),
    ),
    null,
    2,
  );
}

function viewerReport(
  check: Check,
  rows: Clash[],
  imageName: (row: Clash) => string,
  images: Record<string, string>,
) {
  return {
      version: 1,
      id: check.id,
      name: check.name,
      images,
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
                  : `${depthNumber(r.penetrationMm)} мм`,
            date: check.lastRun || "",
            description:
              check.type === "duplicates" ? "Дублирование" : r.axialPenetrationMm !== undefined ? "По пересечению · продольный заход" : "По пересечению",
            status: stateNames[r.state],
            group: r.assignee,
            note: r.note,
            point: r.point,
            image: imageName(r),
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
              "Глубина для отбора, мм": depthCell(r, check.type),
              ...(r.contactLengthMm !== undefined ? { "Длина контакта, мм": "≈ " + depthNumber(r.contactLengthMm) } : {}),
              ...(r.axialPenetrationMm !== undefined ? {
                "Толщина перекрытия, мм": r.overlapThicknessMm === undefined ? "—" : depthNumber(r.overlapThicknessMm),
                "Заход вдоль оси, мм": depthNumber(r.axialPenetrationMm),
              } : {}),
            },
          })),
        },
      ],
    };
}
