import { helpHtml } from "./help";
import {
  Check,
  Clash,
  Condition,
  Project,
  Selection,
  State,
  configKey,
  matches,
  newCheck,
  readProject,
  reconcile,
  stateNames,
} from "./domain";
import { ModelHost, Snapshot } from "./host";
import { calculate, RunProgress } from "./geometry";
import EngineWorker from "./engine.worker?worker&inline";
import { download, escape as e, reportHtml, viewerSession } from "./export";
import { brandLogo } from "./brand";
import css from "./style.css?inline";
const saved: Project = { format: "nashepo.checks", version: 1, checks: [] };
export function mountPanel(
  container: HTMLElement,
  host: ModelHost,
): () => void {
  const root = container.shadowRoot || container.attachShadow({ mode: "open" });
  let snapshot: Snapshot | undefined,
    current = saved.checks[0]?.id || "",
    tab = "select",
    selected = "",
    page = 0,
    busy = false,
    aborted = false,
    worker: Worker | undefined,
    show = true,
    dirty = false;
  const checked = new Set<string>();
  let cancelWorker: (() => void) | undefined;
  const check = () => saved.checks.find((c) => c.id === current);
  const q = <T extends HTMLElement = HTMLElement>(id: string) =>
    root.querySelector<T>("#" + id)!;
  root.innerHTML = `<style>${css}</style><main><header><div class="brand"><img src="${brandLogo}" alt=""><b>НашеПО</b><small>0.2.0</small></div><button id="scan">Обновить модели</button><button id="new" class="primary">＋ Проверка</button><button id="open">Открыть проверки</button><button id="save">Сохранить проверки</button><button id="settings">⚙</button><button id="help">Справка</button><span id="dirty"></span></header><div class="notice" id="notice" role="status">Откройте IFC/SMDX в проекте и нажмите «Обновить модели».</div><div class="workspace"><aside><input id="test-search" type="search" placeholder="Поиск проверок"><div id="checks"></div><button id="all">Запустить все</button></aside><section class="main"><div class="test-toolbar"><input id="name" aria-label="Имя проверки" placeholder="Имя проверки"><button id="copy">Копировать</button><button id="delete">Удалить</button><button id="run" class="primary">▶ Запустить</button><button id="cancel" hidden>Остановить</button></div><div id="tabs" class="tabs">${[
    ["rules", "Правила"],
    ["select", "Выбрать"],
    ["results", "Результаты"],
    ["report", "Отчёт"],
  ]
    .map(([id, title]) => `<button data-tab="${id}">${title}</button>`)
    .join(
      "",
    )}</div><div id="content"></div></section></div><footer><span id="model-count">Модели не прочитаны</span><span>Расчёт выполняется на вашем компьютере</span></footer><input id="file" type="file" accept=".json" hidden><dialog id="settings-dialog"><h2>Настройки</h2><label>Дистанция камеры, м<input id="distance" type="number" value="15" min="0.5"></label><p class="links"><a href="https://nashepo.ru/" target="_blank" rel="noopener noreferrer">Сайт НашеПО</a><a href="https://t.me/RoburFan" target="_blank" rel="noopener noreferrer">Telegram</a></p><button data-close="settings-dialog">Закрыть</button></dialog><dialog id="help-dialog">${helpHtml}<button data-close="help-dialog">Закрыть</button></dialog></main>`;
  const note = (text: string, error = false) => {
    q("notice").textContent = text;
    q("notice").classList.toggle("error", error);
  };
  const action = async (fn: () => unknown | Promise<unknown>) => {
    try {
      await fn();
    } catch (err) {
      note(err instanceof Error ? err.message : String(err), true);
    }
  };
  const mark = () => {
    dirty = true;
    q("dirty").textContent = "Есть несохранённые изменения";
  };
  const stale = () => {
    const c = check();
    if (c?.lastRun) c.status = "stale";
    mark();
    renderChecks();
  };
  const fields = () =>
    [
      ...new Set(
        (snapshot?.elements || []).flatMap((x) => Object.keys(x.properties)),
      ),
    ].sort();
  const options = (values: string[], value: string) =>
    values
      .map(
        (v) =>
          `<option value="${e(v)}" ${v === value ? "selected" : ""}>${e(v)}</option>`,
      )
      .join("");
  function resultRows() {
    const c = check();
    const search =
        q<HTMLInputElement>("result-search")?.value.toLowerCase() || "",
      state = q<HTMLSelectElement>("result-state")?.value || "";
    return (c?.results || []).filter(
      (r) =>
        (!state || r.state === state) &&
        (!search ||
          JSON.stringify({ ...r, image: undefined })
            .toLowerCase()
            .includes(search)),
    );
  }
  function renderChecks() {
    const query = q<HTMLInputElement>("test-search").value.toLowerCase();
    q("checks").innerHTML = saved.checks
      .filter((c) => c.name.toLowerCase().includes(query))
      .map(
        (c) =>
          `<button class="check-item ${c.id === current ? "active" : ""}" data-check="${c.id}"><strong>${e(c.name)}</strong><small>${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[c.status]} · ${c.results.filter((r) => !["resolved", "excluded"].includes(r.state)).length} в работе / ${c.results.length}</small></button>`,
      )
      .join("");
  }
  function renderSelection(s: Selection, side: "a" | "b") {
    const count =
      snapshot?.elements.filter(
        (x) => (check()!.includeHidden || !x.hidden) && matches(x, s),
      ).length || 0;
    return `<article class="selection" data-side="${side}"><h3>Выбор ${side.toUpperCase()} <span>${count} элементов</span></h3><p class="selection-mode">${s.manualOnly ? "Ручная выборка — только указанные элементы" : "Автоматическая выборка — модели и условия"}</p><label>Модели (Ctrl — несколько; без выбора — все)<select multiple size="8" class="models">${(snapshot?.models || []).map((m) => `<option value="${e(m.id)}" ${s.models.includes(m.id) ? "selected" : ""}>${e(m.name)}</option>`).join("")}</select></label><div class="selection-tools"><button data-selection="show">Показать выборку</button><button data-selection="only">Только выделенные</button><button data-selection="include">＋ Добавить выделенные</button><button data-selection="exclude">− Исключить выделенные</button><button data-selection="reset">Вернуть автоматический выбор</button></div><small>Добавлено вручную: ${s.include.length} · исключено: ${s.exclude.length}</small><label>Условия<select class="mode"><option value="all" ${s.mode === "all" ? "selected" : ""}>Выполнены все (И)</option><option value="any" ${s.mode === "any" ? "selected" : ""}>Выполнено любое (ИЛИ)</option></select></label><div class="conditions">${s.conditions
      .map(
        (c, i) =>
          `<div class="condition" data-condition="${i}"><input class="field" list="property-fields" value="${e(c.field)}" placeholder="Свойство"><select class="op">${[
            ["eq", "равно"],
            ["contains", "содержит"],
            ["ne", "не равно"],
            ["exists", "существует"],
            ["gt", "больше"],
            ["lt", "меньше"],
          ]
            .map(
              ([k, v]) =>
                `<option value="${k}" ${c.op === k ? "selected" : ""}>${v}</option>`,
            )
            .join(
              "",
            )}</select><input class="value" value="${e(c.value)}" placeholder="Значение" ${c.op === "exists" ? "disabled" : ""}><button data-remove="${i}" aria-label="Удалить условие">×</button></div>`,
      )
      .join(
        "",
      )}</div><button data-selection="add">＋ Условие</button></article>`;
  }
  function render() {
    renderChecks();
    const c = check();
    q<HTMLInputElement>("name").value = c?.name || "";
    for (const id of ["name", "copy", "delete", "run"])
      q<HTMLInputElement>(id).disabled = !c || busy;
    for (const b of root.querySelectorAll<HTMLElement>("[data-tab]"))
      b.classList.toggle("active", b.dataset.tab === tab);
    if (!c) {
      q("content").innerHTML =
        '<div class="empty"><h2>Создайте первую проверку</h2><p>Обновите модели, затем выберите, какие элементы проверять друг с другом.</p></div>';
      return;
    }
    if (tab === "select")
      q("content").innerHTML =
        `<div class="choose-layout"><div class="parameters"><h3>Параметры проверки</h3><label>Тип<select id="type"><option value="intersection" ${c.type === "intersection" ? "selected" : ""}>По пересечению</option><option value="duplicates" ${c.type === "duplicates" ? "selected" : ""}>Дублирование</option></select></label><label title="Числовая точность; не глубина проникновения">Точность расчёта, мм<input id="precision" type="number" value="${c.precision}" min="0.001" max="100" step="0.1"></label><label class="check"><input id="touching" type="checkbox" ${c.touching ? "checked" : ""} ${c.type === "duplicates" ? "disabled" : ""}>Учитывать касания</label><small>Касание — соприкосновение поверхностей без проникновения. Обычно выключено.</small><p class="legend"><span class="part-a">● А — красный</span><span class="part-b">● Б — синий</span></p></div><div class="selection-grid">${renderSelection(c.a, "a")}${renderSelection(c.b, "b")}</div></div><datalist id="property-fields">${options(fields(), "")}</datalist>`;
    if (tab === "rules")
      q("content").innerHTML =
        `<div class="rules"><h3>Исключение пар</h3><p>Элемент сам с собой не проверяется. Пара А/Б учитывается один раз.</p><label class="check"><input id="same-model" type="checkbox" ${c.ignoreSameModel ? "checked" : ""}>Не проверять элементы одной модели</label><label class="check"><input id="same-group" type="checkbox" ${c.ignoreSameGroup ? "checked" : ""}>Не проверять геометрию одного составного объекта</label><label>Не проверять пары с одинаковым значением свойства<input id="equal-property" list="property-fields" value="${e(c.equalProperty)}" placeholder="Без ограничения"></label><label class="check"><input id="hidden" type="checkbox" ${c.includeHidden ? "checked" : ""}>Включать скрытые элементы прочитанных моделей</label><p>Незагруженные подключённые файлы нужно открыть перед расчётом.</p><datalist id="property-fields">${options(fields(), "")}</datalist></div>`;
    if (tab === "results") {
      q("content").innerHTML =
        `<div class="result-tools"><input id="result-search" type="search" placeholder="Поиск по результатам"><select id="result-state"><option value="">Все состояния</option>${Object.entries(
          stateNames,
        )
          .map(([k, v]) => `<option value="${k}">${v}</option>`)
          .join(
            "",
          )}</select><button id="show-markers" role="switch" aria-checked="${show}">${show ? "● Знаки включены" : "○ Знаки выключены"}</button><select id="bulk-state">${Object.entries(
          stateNames,
        )
          .map(([k, v]) => `<option value="${k}">${v}</option>`)
          .join(
            "",
          )}</select><button id="bulk">Применить к выбранным</button></div><div class="result-area"><div class="table-area"><div class="scroll" id="table"></div><div class="pager"><button id="prev-page">←</button><span id="page"></span><button id="next-page">→</button><span id="selection-count"></span></div></div><div class="detail" id="detail"></div></div>`;
      renderTable();
      renderDetail();
    }
    if (tab === "report")
      q("content").innerHTML =
        `<div class="report"><h3>${e(c.name)}</h3><p>Результатов: ${c.results.length}. Выбрано: ${checked.size}. ${c.status === "stale" ? "Результаты устарели — рекомендуется повторный запуск." : ""}</p><label class="check"><input id="selected-only" type="checkbox" ${checked.size ? "checked" : ""}>Только выбранные строки</label><label class="check"><input id="report-images" type="checkbox" checked>Добавить снимки (недостающие будут созданы автоматически)</label><button id="export-html" class="primary">Сформировать HTML-отчёт</button><button id="export-viewer">Сессия для плагина «Коллизии»</button><p>Правила и все результаты сохраняются кнопкой «Сохранить проверки» в верхней панели.</p></div>`;
    q("content").inert = busy;
  }
  function renderTable() {
    const rows = resultRows(),
      pages = Math.max(1, Math.ceil(rows.length / 50));
    page = Math.max(0, Math.min(page, pages - 1));
    const visible = rows.slice(page * 50, page * 50 + 50);
    q("table").innerHTML = rows.length
      ? `<table><thead><tr><th><input id="check-page" type="checkbox" aria-label="Выбрать страницу" ${visible.every((r) => checked.has(r.id)) ? "checked" : ""}></th>${["№", "Состояние", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "Комментарий"].map((x) => `<th>${x}</th>`).join("")}</tr></thead><tbody>${visible.map((r, i) => `<tr data-result="${e(r.id)}" class="${r.id === selected ? "active" : ""}"><td><input type="checkbox" class="row-check" aria-label="Выбрать конфликт" ${checked.has(r.id) ? "checked" : ""}></td>${[page * 50 + i + 1, stateNames[r.state], r.a.name, r.a.model, r.a.guid || "—", r.b.name, r.b.model, r.b.guid || "—", r.note].map((v) => `<td title="${e(v)}">${e(v)}</td>`).join("")}</tr>`).join("")}</tbody></table>`
      : '<div class="empty">Нет результатов. Запустите проверку или измените фильтры.</div>';
    q("page").textContent =
      `Страница ${page + 1} из ${pages} · ${rows.length} результатов`;
    q("selection-count").textContent = `Выбрано: ${checked.size}`;
    q<HTMLButtonElement>("prev-page").disabled = page === 0;
    q<HTMLButtonElement>("next-page").disabled = page === pages - 1;
  }
  function renderDetail() {
    const r = check()?.results.find((x) => x.id === selected);
    q("detail").innerHTML = r
      ? `<h3>${e(r.a.name)} × ${e(r.b.name)}</h3><p class="legend"><span class="part-a">● А — красный</span><span class="part-b">● Б — синий</span></p>${r.image ? `<button id="open-image" class="preview"><img src="${e(r.image)}" alt="Снимок коллизии"><span>Открыть крупнее</span></button>` : ""}<button id="capture-image">Сохранить текущий ракурс</button><div class="selection-tools"><button id="focus" class="primary">Перейти в 3D</button><button id="previous">←</button><button id="next">→</button></div><p>${r.point.map((v, i) => `${["X", "Y", "Z"][i]}: ${v.toFixed(4)}`).join(" · ")}</p><label>Состояние<select id="edit-state">${Object.entries(
          stateNames,
        )
          .map(
            ([k, v]) =>
              `<option value="${k}" ${r.state === k ? "selected" : ""}>${v}</option>`,
          )
          .join(
            "",
          )}</select></label><label>Назначение<input id="assignee" value="${e(r.assignee)}"></label><label>Комментарий<textarea id="note" rows="3">${e(r.note)}</textarea></label>${[
          r.a,
          r.b,
        ]
          .map(
            (o, i) =>
              `<details><summary>Элемент ${i ? "Б" : "А"} · свойства</summary><dl>${Object.entries(
                o.properties,
              )
                .map(([k, v]) => `<dt>${e(k)}</dt><dd>${e(v)}</dd>`)
                .join("")}</dl></details>`,
          )
          .join("")}`
      : "<p>Выберите конфликт в таблице.</p>";
  }
  function markers() {
    host.markers(resultRows(), selected, show, (id) =>
      action(() => pick(id, true)),
    );
  }
  function pick(id: string, focus = false) {
    if (busy) return;
    selected = id;
    if (tab === "results") {
      for (const row of root.querySelectorAll<HTMLElement>("[data-result]"))
        row.classList.toggle("active", row.dataset.result === id);
      renderDetail();
    }
    markers();
    if (focus) {
      const r = check()?.results.find((x) => x.id === id);
      if (r) host.focus(r, Number(q<HTMLInputElement>("distance").value));
    }
  }
  async function scan() {
    snapshot = await host.scan(note, () => aborted);
    q("model-count").textContent =
      `Моделей: ${snapshot.models.length} · элементов: ${snapshot.elements.length}`;
    for (const c of saved.checks)
      if (c.fingerprint && c.fingerprint !== snapshot.fingerprint)
        c.status = "stale";
    render();
    note(
      snapshot.warnings.length
        ? snapshot.warnings.join(" ")
        : "Модели прочитаны. Настройте выборки и запустите проверку.",
      !!snapshot.warnings.length,
    );
  }
  const setBusy = (value: boolean) => {
    busy = value;
    for (const id of [
      "new",
      "scan",
      "open",
      "all",
      "copy",
      "delete",
      "name",
      "run",
      "save",
    ])
      q<HTMLInputElement>(id).disabled = value;
    q("cancel").hidden = !value;
    q("content").inert = value;
    q("checks").inert = value;
  };
  async function compute(c: Check): Promise<Clash[]> {
    const report = (p: RunProgress) =>
      note(`${c.name} · ${p.phase} ${p.done}/${p.total} · найдено ${p.found}`);
    let instance: Worker;
    try {
      instance = new EngineWorker();
    } catch {
      return calculate(
        snapshot!.elements,
        c,
        report,
        () => aborted,
        (id) => host.geometry(id, () => aborted),
      );
    }
    worker = instance;
    return new Promise((resolve, reject) => {
      const finish = () => {
        instance.terminate();
        worker = undefined;
        cancelWorker = undefined;
      };
      cancelWorker = () => {
        finish();
        reject(Error("Расчёт отменён. Предыдущие результаты сохранены."));
      };
      instance.onmessage = async (event) => {
        if (event.data.load) {
          try {
            const geometry = await host.geometry(
              event.data.load,
              () => aborted || worker !== instance,
            );
            if (worker !== instance) return;
            const buffers = [
              geometry.vertices?.buffer,
              geometry.indices?.buffer,
            ].filter(Boolean) as ArrayBuffer[];
            instance.postMessage(
              { request: event.data.request, geometry },
              buffers,
            );
          } catch (error) {
            if (worker === instance)
              instance.postMessage({
                request: event.data.request,
                error: error instanceof Error ? error.message : String(error),
              });
          }
          return;
        }
        if (event.data.progress) report(event.data.progress);
        else {
          finish();
          if (event.data.error) reject(Error(event.data.error));
          else resolve(event.data.results);
        }
      };
      instance.onerror = (event) => {
        finish();
        reject(
          Error(
            `Не удалось запустить расчёт в фоновом потоке: ${event.message || "ошибка загрузки"}`,
          ),
        );
      };
      instance.postMessage({
        elements: snapshot!.elements,
        streaming: typeof host.geometry === "function",
        check: structuredClone({ ...c, results: [], warnings: [] }),
      });
    });
  }
  async function run(all = false) {
    if (busy) return;
    const targets = all
      ? [...saved.checks]
      : ([check()].filter(Boolean) as Check[]);
    if (!targets.length) throw Error("Создайте проверку.");
    aborted = false;
    setBusy(true);
    try {
      await scan();
      setBusy(true);
      if (snapshot!.warnings.length)
        throw Error(
          "Состав моделей прочитан не полностью. " +
            snapshot!.warnings.join(" "),
        );
      for (const c of targets) {
        if (aborted) break;
        for (const s of [c.a, c.b]) {
          if (s.models.some((id) => !snapshot!.models.some((m) => m.id === id)))
            throw Error(
              `${c.name}: одна из моделей выборки отсутствует. Исправьте выборку.`,
            );
          if (
            s.include.some((id) => !snapshot!.elements.some((m) => m.id === id))
          )
            throw Error(
              `${c.name}: вручную добавленный элемент отсутствует в модели.`,
            );
        }
        const config = configKey(c);
        if (
          c.configAtRun === config &&
          c.modelsAtRun?.some(
            (id) => !snapshot!.models.some((m) => m.id === id),
          )
        )
          throw Error(
            `${c.name}: состав моделей уменьшился. Подключите прежние модели или создайте копию проверки для нового состава. Прежние результаты сохранены.`,
          );
        const found = await compute(c);
        if (aborted || !host.isCurrent())
          throw Error(
            "Проект изменился или расчёт отменён. Предыдущие результаты сохранены.",
          );
        const now = new Date().toISOString();
        c.results = reconcile(
          c.configAtRun === config ? c.results : [],
          found,
          now,
        );
        c.lastRun = now;
        c.fingerprint = snapshot!.fingerprint;
        c.configAtRun = config;
        c.modelsAtRun = snapshot!.models.map((m) => m.id);
        c.status = "done";
        c.warnings = [];
        current = c.id;
        selected = c.results[0]?.id || "";
        checked.clear();
        mark();
      }
      tab = "results";
      render();
      markers();
      note(
        `Проверка завершена. ${check()?.results.length || 0} результатов. Сохраните проверки для продолжения работы.`,
      );
    } finally {
      setBusy(false);
      render();
    }
  }
  function editSelection(target: HTMLElement) {
    const side = target.closest<HTMLElement>("[data-side]")?.dataset.side as
      | "a"
      | "b"
      | undefined;
    if (!side) return;
    const s = check()![side],
      index =
        target.closest<HTMLElement>("[data-condition]")?.dataset.condition;
    const input = target as HTMLInputElement;
    if (input.classList.contains("models")) s.manualOnly = false;
    if (input.classList.contains("models"))
      s.models = Array.from((target as HTMLSelectElement).selectedOptions).map(
        (o) => o.value,
      );
    if (input.classList.contains("mode"))
      s.mode = input.value as Selection["mode"];
    if (index !== undefined) {
      const c = s.conditions[Number(index)];
      if (input.classList.contains("field")) c.field = input.value;
      if (input.classList.contains("op")) c.op = input.value as Condition["op"];
      if (input.classList.contains("value")) c.value = input.value;
    }
    stale();
    render();
  }
  q("new").onclick = () => {
    const c = newCheck();
    c.name = `Проверка ${saved.checks.length + 1}`;
    saved.checks.push(c);
    current = c.id;
    tab = "select";
    selected = "";
    checked.clear();
    mark();
    render();
  };
  q("scan").onclick = () =>
    action(async () => {
      aborted = false;
      setBusy(true);
      try {
        await scan();
      } finally {
        setBusy(false);
        render();
      }
    });
  q("run").onclick = () => action(() => run());
  q("all").onclick = () => action(() => run(true));
  q("cancel").onclick = () => {
    aborted = true;
    cancelWorker?.();
  };
  q("test-search").oninput = renderChecks;
  q("checks").onclick = (event) => {
    const b = (event.target as HTMLElement).closest<HTMLElement>(
      "[data-check]",
    );
    if (b && !busy) {
      host.clear();
      current = b.dataset.check!;
      selected = "";
      checked.clear();
      page = 0;
      render();
    }
  };
  q("tabs").onclick = (event) => {
    const b = (event.target as HTMLElement).closest<HTMLElement>("[data-tab]");
    if (b && !busy) {
      tab = b.dataset.tab!;
      render();
    }
  };
  q("name").onchange = () => {
    const c = check();
    if (c) {
      c.name = q<HTMLInputElement>("name").value.trim() || "Проверка";
      mark();
      renderChecks();
    }
  };
  q("copy").onclick = () => {
    const c = check();
    if (!c) return;
    const copy = structuredClone(c);
    Object.assign(copy, {
      id: crypto.randomUUID(),
      name: c.name + " — копия",
      results: [],
      lastRun: undefined,
      fingerprint: undefined,
      configAtRun: undefined,
      status: "new",
    });
    saved.checks.push(copy);
    current = copy.id;
    selected = "";
    checked.clear();
    mark();
    render();
  };
  q("delete").onclick = () => {
    if (!check()) return;
    if (!confirm(`Удалить проверку «${check()!.name}» и её результаты?`))
      return;
    saved.checks = saved.checks.filter((c) => c.id !== current);
    current = saved.checks[0]?.id || "";
    checked.clear();
    host.clear();
    mark();
    render();
  };
  q("save").onclick = () => {
    download("НашеПО-проверки.json", JSON.stringify(saved, null, 2));
    dirty = false;
    q("dirty").textContent = "Файл проверок сохранён";
  };
  q("open").onclick = () => q("file").click();
  q<HTMLInputElement>("file").onchange = () =>
    action(async () => {
      const file = q<HTMLInputElement>("file").files?.[0];
      if (!file) return;
      const incoming = readProject(await file.text());
      if (
        dirty &&
        !confirm("Заменить текущие несохранённые проверки данными из файла?")
      )
        return;
      saved.checks = incoming.checks;
      current = saved.checks[0]?.id || "";
      selected = "";
      checked.clear();
      host.clear();
      dirty = false;
      q("dirty").textContent = "Проверки открыты";
      render();
      note("Проверки открыты. Обновите модели перед переходом к элементам.");
      q<HTMLInputElement>("file").value = "";
    });
  for (const id of ["settings", "help"])
    q(id).onclick = () => q<HTMLDialogElement>(id + "-dialog").showModal();
  for (const button of root.querySelectorAll<HTMLElement>("[data-close]"))
    button.onclick = () => q<HTMLDialogElement>(button.dataset.close!).close();
  q("content").onchange = (event) =>
    action(() => {
      const t = event.target as HTMLInputElement,
        c = check();
      if (!c) return;
      if (t.closest("[data-side]")) {
        editSelection(t);
        return;
      }
      if (
        [
          "type",
          "precision",
          "touching",
          "same-model",
          "same-group",
          "hidden",
          "equal-property",
        ].includes(t.id)
      ) {
        if (t.id === "precision") {
          const n = Number(t.value);
          if (!Number.isFinite(n) || n < 0.001 || n > 100) {
            t.value = String(c.precision);
            throw Error("Точность должна быть от 0,001 до 100 мм.");
          }
          c.precision = n;
        }
        if (t.id === "type") c.type = t.value as Check["type"];
        if (t.id === "touching") c.touching = t.checked;
        if (t.id === "same-model") c.ignoreSameModel = t.checked;
        if (t.id === "same-group") c.ignoreSameGroup = t.checked;
        if (t.id === "hidden") c.includeHidden = t.checked;
        if (t.id === "equal-property") c.equalProperty = t.value;
        stale();
        render();
        return;
      }
      if (t.id === "result-state") {
        page = 0;
        renderTable();
        return;
      }
      if (t.id === "check-page") {
        for (const r of resultRows().slice(page * 50, page * 50 + 50))
          t.checked ? checked.add(r.id) : checked.delete(r.id);
        renderTable();
        return;
      }
      if (t.classList.contains("row-check")) {
        const id = t.closest<HTMLElement>("[data-result]")!.dataset.result!;
        t.checked ? checked.add(id) : checked.delete(id);
        q("selection-count").textContent = `Выбрано: ${checked.size}`;
        return;
      }
      const r = c.results.find((x) => x.id === selected);
      if (r) {
        if (t.id === "edit-state") {
          r.state = t.value as State;
          renderTable();
          renderChecks();
          markers();
        }
        if (t.id === "assignee") r.assignee = t.value;
        if (t.id === "note") {
          r.note = t.value;
          renderTable();
        }
        mark();
      }
    });
  q("content").oninput = (event) => {
    if ((event.target as HTMLElement).id === "result-search") {
      page = 0;
      renderTable();
    }
  };
  q("content").onclick = (event) =>
    action(async () => {
      const t = event.target as HTMLElement,
        b = t.closest<HTMLButtonElement>("button"),
        c = check();
      if (!c) return;
      if (b?.dataset.selection || b?.dataset.remove !== undefined) {
        const side = b.closest<HTMLElement>("[data-side]")!.dataset.side as
            | "a"
            | "b",
          s = c[side];
        if (b.dataset.remove !== undefined)
          s.conditions.splice(Number(b.dataset.remove), 1);
        else
          switch (b.dataset.selection) {
            case "add":
              s.conditions.push({ field: "Имя", op: "contains", value: "" });
              break;
            case "show":
              host.select(
                (snapshot?.elements || [])
                  .filter(
                    (x) => (c.includeHidden || !x.hidden) && matches(x, s),
                  )
                  .map((x) => x.id),
              );
              return;
            case "only": {
              const ids = host.selected();
              if (!ids.length) throw Error("Выделите элементы в 3D-сцене.");
              s.include = ids;
              s.exclude = [];
              s.manualOnly = true;
              break;
            }
            case "include": {
              const ids = host.selected();
              if (!ids.length) throw Error("Выделите элементы в 3D-сцене.");
              s.include = [...new Set([...s.include, ...ids])];
              s.exclude = s.exclude.filter((id) => !ids.includes(id));
              break;
            }
            case "exclude": {
              const ids = host.selected();
              if (!ids.length) throw Error("Выделите элементы в 3D-сцене.");
              s.exclude = [...new Set([...s.exclude, ...ids])];
              s.include = s.include.filter((id) => !ids.includes(id));
              break;
            }
            case "reset":
              s.manualOnly = false;
              s.include = [];
              s.exclude = [];
          }
        stale();
        render();
        return;
      }
      if (b?.id === "prev-page") {
        page--;
        renderTable();
      }
      if (b?.id === "next-page") {
        page++;
        renderTable();
      }
      if (b?.id === "show-markers") {
        show = !show;
        b.textContent = show ? "● Знаки включены" : "○ Знаки выключены";
        b.setAttribute("aria-checked", String(show));
        markers();
      }
      if (b?.id === "bulk") {
        const state = q<HTMLSelectElement>("bulk-state").value as State;
        for (const r of c.results) if (checked.has(r.id)) r.state = state;
        mark();
        renderTable();
        renderDetail();
        renderChecks();
        markers();
      }
      if (b?.id === "capture-image") {
        const r = c.results.find((r) => r.id === selected);
        if (r) {
          aborted = false;
          setBusy(true);
          try {
            r.image = await host.snapshot(
              r,
              Number(q<HTMLInputElement>("distance").value),
              () => aborted,
              true,
            );
            mark();
            renderDetail();
            note("Снимок сохранён в результат.");
          } finally {
            setBusy(false);
          }
        }
        return;
      }
      if (b?.id === "open-image") {
        const r = c.results.find((r) => r.id === selected);
        if (r?.image) {
          const dialog = document.createElement("dialog");
          dialog.className = "image-dialog";
          dialog.innerHTML =
            '<button>Закрыть</button><img alt="Снимок коллизии">';
          dialog.querySelector("img")!.src = r.image;
          dialog.querySelector("button")!.onclick = () => {
            dialog.close();
            dialog.remove();
          };
          root.append(dialog);
          dialog.showModal();
        }
        return;
      }
      if (b?.id === "focus") pick(selected, true);
      if (b?.id === "previous" || b?.id === "next") {
        const rows = resultRows(),
          i =
            rows.findIndex((r) => r.id === selected) +
            (b.id === "next" ? 1 : -1);
        if (rows[i]) {
          page = Math.floor(i / 50);
          renderTable();
          pick(rows[i].id, true);
        }
      }
      if (b?.id === "export-html" || b?.id === "export-viewer") {
        const rows = q<HTMLInputElement>("selected-only").checked
          ? c.results.filter((r) => checked.has(r.id))
          : c.results;
        if (!rows.length) throw Error("Нет результатов для отчёта.");
        if (q<HTMLInputElement>("report-images").checked) {
          const view = host.view,
            previous = view?.storeView();
          aborted = false;
          setBusy(true);
          try {
            let i = 0;
            for (const row of rows) {
              if (aborted)
                throw Error(
                  "Подготовка отчёта отменена. Уже полученные снимки сохранены.",
                );
              note("Подготовка снимков: " + ++i + " / " + rows.length);
              if (!row.image) {
                if (row.state === "resolved" && !host.canLocate(row)) continue;
                row.image = await host.snapshot(
                  row,
                  Number(q<HTMLInputElement>("distance").value),
                  () => aborted,
                );
                mark();
              }
            }
          } finally {
            if (view && host.isCurrent()) {
              const r = c.results.find((r) => r.id === selected);
              if (r)
                try {
                  host.focus(
                    r,
                    Number(q<HTMLInputElement>("distance").value),
                    false,
                  );
                } catch {}
              if (previous) view.restoreView(previous);
            }
            setBusy(false);
          }
        }
        const exportRows = q<HTMLInputElement>("report-images").checked
          ? rows
          : rows.map((r) => ({ ...r, image: undefined }));
        download(
          c.name + (b.id === "export-html" ? ".html" : ".collision360.json"),
          b.id === "export-html"
            ? reportHtml(c, exportRows)
            : viewerSession(c, exportRows),
        );
        note(
          "Отчёт подготовлен. Результатов: " +
            rows.length +
            "; со снимками: " +
            exportRows.filter((r) => r.image).length +
            ".",
        );
      }
      const row = t.closest<HTMLElement>("[data-result]");
      if (row && !t.closest("input") && !window.getSelection()?.toString())
        pick(row.dataset.result!);
    });
  q("content").ondblclick = (event) => {
    const t = event.target as HTMLElement,
      row = t.closest<HTMLElement>("[data-result]");
    if (row && !t.closest("input"))
      action(() => pick(row.dataset.result!, true));
  };
  const contextTimer = setInterval(() => {
    if (snapshot && !host.isCurrent()) {
      snapshot = undefined;
      host.clear();
      for (const c of saved.checks) if (c.lastRun) c.status = "stale";
      q("model-count").textContent = "Проект изменился";
      note("Активный проект изменился. Обновите модели.");
      if (!busy) render();
    }
  }, 1500);
  render();
  return () => {
    clearInterval(contextTimer);
    aborted = true;
    cancelWorker?.();
    worker?.terminate();
    host.clear();
  };
}
