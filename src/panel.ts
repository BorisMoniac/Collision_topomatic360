import { helpHtml } from "./help";
import { guardPanelResize } from "./resize";
import { version as pluginVersion } from "../package.json";
import {
  Check,
  Clash,
  ParameterSet,
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
const projects = new WeakMap<object, Project>();
const sessionPrefix = "nashepo.collisionfinder360.project.";
const emptyProject = (): Project => ({
  format: "nashepo.checks",
  version: 1,
  checks: [],
  sets: [],
});
const restoreSession = (id?: string): Project | undefined => {
  if (!id || typeof sessionStorage === "undefined") return;
  try {
    const value = sessionStorage.getItem(sessionPrefix + id);
    return value ? readProject(value) : undefined;
  } catch {
    return;
  }
};
const storeSession = (id: string | undefined, project: Project) => {
  if (!id || typeof sessionStorage === "undefined") return;
  try {
    // Images are reproducible and can exceed the browser storage quota.
    sessionStorage.setItem(
      sessionPrefix + id,
      JSON.stringify(project, (key, value) => (key === "image" ? undefined : value)),
    );
  } catch {
    // The in-memory copy still preserves the complete project for this page.
  }
};
export function mountPanel(
  container: HTMLElement,
  host: ModelHost,
): () => void {
  const root = container.shadowRoot || container.attachShadow({ mode: "open" });
  const disposeResize = guardPanelResize(container);
  let projectToken = host.projectToken(),
    projectId = host.projectId(),
    saved = projectToken
      ? projects.get(projectToken) || restoreSession(projectId) || emptyProject()
      : emptyProject();
  if (projectToken) projects.set(projectToken, saved);
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
  let cancelWorker: (() => void) | undefined,
    previewTimer: number | undefined,
    previewToken = 0;
  const check = () => saved.checks.find((c) => c.id === current);
  const q = <T extends HTMLElement = HTMLElement>(id: string) =>
    root.querySelector<T>("#" + id)!;
  root.innerHTML = `<style>${css}</style><main><header class="commandbar"><div class="brand"><img src="${brandLogo}" alt=""><b>НашеПО</b><small>${pluginVersion}</small></div><div class="check-heading"><input id="name" aria-label="Имя проверки" placeholder="Выберите проверку"><small id="check-summary">Проверка не выбрана</small></div><div id="tabs" class="tabs">${[
    ["select", "Выбор"],
    ["results", "Результаты"],
    ["rules", "Правила"],
    ["report", "Отчёт"],
  ]
    .map(([id, title]) => `<button data-tab="${id}">${title}</button>`)
    .join(
      "",
    )}</div><div class="header-actions"><button id="scan" title="Перечитать список и геометрию выбранных моделей">↻ Модели</button><button id="run" class="primary">▶ Запустить</button><button id="cancel" hidden>Остановить</button><details class="more-menu"><summary title="Другие команды">⋮</summary><div class="more-popover"><button id="open">Открыть проверки</button><button id="save">Сохранить проверки</button><button id="copy">Копировать проверку</button><button id="delete">Удалить проверку</button><button id="settings">Настройки</button><button id="help">Справка</button></div></details></div><span id="dirty"></span></header><div id="run-progress" class="run-progress" hidden><span id="run-phase">Подготовка</span><div id="run-bar" class="run-bar" role="progressbar"><i id="run-fill"></i></div><span id="run-value"></span></div><div class="notice" id="notice" role="status">Откройте IFC/SMDX в проекте и нажмите «Модели».</div><div class="workspace"><aside><div class="aside-title">Проверки</div><input id="test-search" type="search" placeholder="Поиск проверок"><div id="checks"></div><div class="aside-actions"><button id="all">Запустить все</button><button id="new" class="primary">＋ Новая проверка</button></div></aside><section class="main"><div id="content"></div></section></div><footer><span id="model-count">Модели не прочитаны</span><span>Расчёт выполняется на вашем компьютере</span></footer><input id="file" type="file" accept=".json" hidden><dialog id="settings-dialog"><h2>Настройки</h2><label>Дистанция камеры, м<input id="distance" type="number" value="15" min="0.5"></label><p class="links"><a href="https://nashepo.ru/" target="_blank" rel="noopener noreferrer">Сайт НашеПО</a><a href="https://t.me/RoburFan" target="_blank" rel="noopener noreferrer">Telegram</a></p><button data-close="settings-dialog">Закрыть</button></dialog><dialog id="help-dialog">${helpHtml}<button data-close="help-dialog">Закрыть</button></dialog><dialog id="set-dialog"><h2>Сохранить набор моделей</h2><label>Название<input id="set-name" maxlength="120"></label><div class="dialog-actions"><button id="set-cancel">Отмена</button><button id="set-confirm" class="primary">Сохранить</button></div></dialog></main>`;
  const clearButton = document.createElement("button");
  clearButton.id = "clear-project";
  clearButton.textContent = "Очистить проект";
  q("save").after(clearButton);
  root.querySelector(".more-popover")!.addEventListener("click", () =>
    root.querySelector(".more-menu")!.removeAttribute("open"),
  );
  const note = (text: string, error = false) => {
    q("notice").textContent = text;
    q("notice").classList.toggle("error", error);
  };
  const showProgress = (
    label: string,
    done?: number,
    total?: number,
    found?: number,
  ) => {
    const box = q("run-progress"),
      bar = q("run-bar"),
      fill = q("run-fill");
    box.hidden = false;
    q("notice").hidden = true;
    q("run-phase").textContent = label;
    if (total && total > 0 && done !== undefined) {
      const percent = Math.max(0, Math.min(100, (done / total) * 100));
      fill.style.width = `${percent}%`;
      bar.setAttribute("aria-valuemin", "0");
      bar.setAttribute("aria-valuemax", "100");
      bar.setAttribute("aria-valuenow", String(Math.round(percent)));
      q("run-value").textContent =
        `${Math.round(percent)}% · ${done}/${total}` +
        (found === undefined ? "" : ` · найдено ${found}`);
    } else {
      fill.style.width = "0";
      bar.removeAttribute("aria-valuenow");
      q("run-value").textContent = found === undefined ? "" : `Найдено ${found}`;
    }
    bar.setAttribute("aria-valuetext", q("run-value").textContent || label);
  };
  const hideProgress = () => {
    q("run-progress").hidden = true;
    q("notice").hidden = false;
  };
  const action = async (fn: () => unknown | Promise<unknown>) => {
    try {
      await fn();
    } catch (err) {
      note(err instanceof Error ? err.message : String(err), true);
    }
  };
  const requestSetName = () =>
    new Promise<string | undefined>((resolve) => {
      const dialog = q<HTMLDialogElement>("set-dialog"),
        input = q<HTMLInputElement>("set-name");
      let finished = false;
      const finish = (value?: string) => {
        if (finished) return;
        finished = true;
        dialog.close();
        resolve(value);
      };
      input.value = "Новый набор";
      q("set-confirm").onclick = () => {
        const value = input.value.trim();
        if (value) finish(value);
        else input.focus();
      };
      q("set-cancel").onclick = () => finish();
      dialog.oncancel = (event) => {
        event.preventDefault();
        finish();
      };
      dialog.showModal();
      input.focus();
      input.select();
    });
  const mark = () => {
    dirty = true;
    q("dirty").textContent = "Есть несохранённые изменения";
    if (projectToken) projects.set(projectToken, saved);
    storeSession(projectId, saved);
  };
  const switchProject = () => {
    const nextToken = host.projectToken();
    if (!nextToken || nextToken === projectToken) return false;
    if (!projectToken && (saved.checks.length || saved.sets.length))
      projects.set(nextToken, saved);
    else
      saved =
        projects.get(nextToken) ||
        restoreSession(host.projectId()) ||
        emptyProject();
    projects.set(nextToken, saved);
    projectToken = nextToken;
    projectId = host.projectId();
    snapshot = undefined;
    current = saved.checks[0]?.id || "";
    selected = "";
    checked.clear();
    page = 0;
    dirty = false;
    host.clear();
    q("dirty").textContent = "";
    return true;
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
      state = q<HTMLSelectElement>("result-state")?.value || "",
      minDepth = Number(q<HTMLInputElement>("result-depth")?.value || 0);
    return (c?.results || []).filter(
      (r) =>
        (!state || r.state === state) &&
        (c?.type === "duplicates" || (r.penetrationMm ?? 0) >= minDepth) &&
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
    const requiredModels = s.manualOnly
        ? selectionModelIds(s)
        : s.modelsMode === "selected"
          ? s.models
          : (snapshot?.models || []).map((model) => model.id),
      countText =
        snapshot &&
        requiredModels.every((id) => snapshot!.indexedModelIds.includes(id))
          ? `${count} элементов`
          : "число после запуска";
    const models = snapshot?.models || [],
      all = s.modelsMode !== "selected";
    const presets = saved.sets
      .map(
        (set) =>
          `<option value="${e(set.id)}" ${s.presetId === set.id ? "selected" : ""}>${e(set.name)}</option>`,
      )
      .join("");
    return `<article class="selection" data-side="${side}"><h3>Выбор ${side.toUpperCase()} <span data-selection-count>${countText}</span></h3>${s.manualOnly ? '<p class="selection-mode">Только элементы, выбранные вручную</p>' : ""}<div class="preset-row"><select class="preset"><option value="">Набор моделей…</option>${presets}</select><button data-selection="load-set">Применить</button><button data-selection="save-set">Сохранить набор</button><button data-selection="delete-set" ${s.presetId ? "" : "disabled"}>Удалить</button></div><div class="model-list"><label class="model-all"><input type="checkbox" class="all-models" ${all ? "checked" : ""}> Все модели</label>${models.map((m) => `<label><input type="checkbox" class="model-check" value="${e(m.id)}" ${all || s.models.includes(m.id) ? "checked" : ""}> ${e(m.name)}</label>`).join("") || "<small>Нажмите «Модели».</small>"}</div><small>Отметьте файлы, которые должны участвовать в выборе ${side.toUpperCase()}.</small><div class="selection-tools"><button data-selection="show">Показать выбранные элементы</button><button data-selection="only">Только выделенные в 3D</button><button data-selection="include">＋ Добавить из 3D</button><button data-selection="exclude">− Исключить из 3D</button><button data-selection="reset">Сбросить ручной выбор</button></div><small>Добавлено вручную: ${s.include.length} · исключено: ${s.exclude.length}</small></article>`;
  }
  function render() {
    renderChecks();
    const c = check();
    q<HTMLInputElement>("name").value = c?.name || "";
    q("check-summary").textContent = c
      ? `${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[c.status]} · ${c.results.filter((r) => !["resolved", "excluded"].includes(r.state)).length} в работе / ${c.results.length}`
      : "Проверка не выбрана";
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
        `<div class="choose-layout"><div class="parameters"><h3>Параметры проверки</h3><label>Тип<select id="type"><option value="intersection" ${c.type === "intersection" ? "selected" : ""}>По пересечению</option><option value="duplicates" ${c.type === "duplicates" ? "selected" : ""}>Дублирование</option></select></label><label title="Числовая погрешность расчёта">Точность расчёта, мм<input id="precision" type="number" value="${c.precision}" min="0.001" max="100" step="0.1"></label><label title="Конфликты с меньшей оценкой глубины не попадут в результат">Минимальная глубина, мм<input id="min-penetration" type="number" value="${c.minPenetration}" min="0" max="100000" step="1" ${c.type === "duplicates" ? "disabled" : ""}></label><label class="check"><input id="touching" type="checkbox" ${c.touching ? "checked" : ""} ${c.type === "duplicates" ? "disabled" : ""}>Учитывать касания</label><small>Глубина Hard Clash считается по фактическим пересечениям треугольников и вложенности замкнутых тел. Габариты используются только для быстрого отбора пар.</small><p class="legend"><span class="part-a">● Выбор А</span><span class="part-b">● Выбор Б</span></p></div><div class="selection-grid">${renderSelection(c.a, "a")}${renderSelection(c.b, "b")}</div></div><datalist id="property-fields">${options(fields(), "")}</datalist>`;
    if (tab === "rules")
      q("content").innerHTML =
        `<div class="rules"><h3>Исключение пар</h3><p>Элемент сам с собой не проверяется. Пара А/Б учитывается один раз.</p><label class="check"><input id="same-model" type="checkbox" ${c.ignoreSameModel ? "checked" : ""}>Не проверять элементы одной модели</label><label class="check"><input id="same-group" type="checkbox" ${c.ignoreSameGroup ? "checked" : ""}>Не проверять геометрию одного составного объекта</label><label>Не проверять пары с одинаковым значением свойства<input id="equal-property" list="property-fields" value="${e(c.equalProperty)}" placeholder="Без ограничения"></label><label class="check"><input id="hidden" type="checkbox" ${c.includeHidden ? "checked" : ""}>Включать скрытые элементы прочитанных моделей</label><p>Незагруженные подключённые файлы нужно открыть перед расчётом.</p><datalist id="property-fields">${options(fields(), "")}</datalist></div>`;
    if (tab === "results") {
      q("content").innerHTML =
        `<div class="result-tools"><div class="result-filters"><input id="result-search" type="search" placeholder="Поиск по результатам"><select id="result-state"><option value="">Все состояния</option>${Object.entries(
          stateNames,
        )
          .map(([k, v]) => `<option value="${k}">${v}</option>`)
          .join("")}</select>${c.type === "intersection" ? '<input id="result-depth" type="number" min="0" step="1" placeholder="Глубина от, мм">' : ""}<button id="show-markers" role="switch" aria-checked="${show}">${show ? "● Знаки" : "○ Знаки"}</button><span id="result-count"></span></div><div class="bulk-tools"><select id="bulk-state" title="Состояние для выбранных строк">${Object.entries(
            stateNames,
          )
            .map(([k, v]) => `<option value="${k}">${v}</option>`)
            .join("")}</select><button id="bulk">Применить</button></div></div><div class="result-area"><div class="table-area"><div class="scroll" id="table"></div><div class="pager"><span id="selection-count"></span><button id="prev-page">←</button><span id="page"></span><button id="next-page">→</button></div></div><div class="detail" id="detail"></div></div>`;
      renderTable();
      renderDetail();
    }
    if (tab === "report")
      q("content").innerHTML =
        `<div class="report"><h3>${e(c.name)}</h3><p>Результатов: ${c.results.length}. Выбрано: ${checked.size}. ${c.status === "stale" ? "Результаты устарели — рекомендуется повторный запуск." : ""}</p><label class="check"><input id="selected-only" type="checkbox" ${checked.size ? "checked" : ""}>Только выбранные строки</label><label class="check"><input id="report-images" type="checkbox" checked>Добавить снимки (недостающие будут созданы автоматически)</label><button id="export-html" class="primary">Сформировать HTML-отчёт</button><button id="export-viewer">Сессия для плагина «Коллизии»</button><p>Правила и все результаты сохраняются кнопкой «Сохранить проверки» в верхней панели.</p></div>`;
    q("content").inert = busy;
  }
  function renderTable() {
    const c = check()!,
      rows = resultRows(),
      pages = Math.max(1, Math.ceil(rows.length / 50));
    page = Math.max(0, Math.min(page, pages - 1));
    const visible = rows.slice(page * 50, page * 50 + 50);
    q("table").innerHTML = rows.length
      ? `<table><thead><tr><th><input id="check-page" type="checkbox" aria-label="Выбрать страницу" ${visible.every((r) => checked.has(r.id)) ? "checked" : ""}></th>${["№", "Состояние", "Глубина, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "Комментарий"].map((x) => `<th>${x}</th>`).join("")}</tr></thead><tbody>${visible.map((r, i) => `<tr data-result="${e(r.id)}" class="${r.id === selected ? "active" : ""}"><td><input type="checkbox" class="row-check" aria-label="Выбрать конфликт" ${checked.has(r.id) ? "checked" : ""}></td>${[page * 50 + i + 1, stateNames[r.state], c.type === "duplicates" ? "—" : (r.penetrationMm ?? 0).toFixed(1), r.a.name, r.a.model, r.a.guid || "—", r.b.name, r.b.model, r.b.guid || "—", r.note].map((v) => `<td title="${e(v)}">${e(v)}</td>`).join("")}</tr>`).join("")}</tbody></table>`
      : '<div class="empty">Нет результатов. Запустите проверку или измените фильтры.</div>';
    q("page").textContent =
      `${page + 1} / ${pages}`;
    q("result-count").textContent = `${rows.length} результатов`;
    q("selection-count").textContent = `Выбрано: ${checked.size}`;
    q<HTMLButtonElement>("prev-page").disabled = page === 0;
    q<HTMLButtonElement>("next-page").disabled = page === pages - 1;
  }
  function renderDetail() {
    const c = check(),
      rows = resultRows(),
      position = rows.findIndex((x) => x.id === selected),
      r = c?.results.find((x) => x.id === selected);
    q("detail").innerHTML = r
      ? `<div class="detail-head"><div><small>КОЛЛИЗИЯ</small><h3>#${position + 1} ${e(r.a.name)} × ${e(r.b.name)}</h3></div><div class="detail-nav"><button id="previous" title="Предыдущая коллизия" ${position <= 0 ? "disabled" : ""}>‹</button><button id="next" title="Следующая коллизия" ${position < 0 || position >= rows.length - 1 ? "disabled" : ""}>›</button></div></div><div class="clash-summary"><span>${c?.type === "duplicates" ? "Дублирование" : "Пересечение"}</span><span title="Максимальная локальная глубина по пересекающимся парам треугольников и вложенным поверхностям">${c?.type === "duplicates" ? "Совпадение геометрии" : `Глубина ${(r.penetrationMm ?? 0).toFixed(1)} мм`}</span><span>${e(stateNames[r.state])}</span></div><p class="legend"><span class="part-a">● Элемент А</span><span class="part-b">● Элемент Б</span></p><div class="preview-slot">${r.image ? `<button id="open-image" class="preview"><img src="${e(r.image)}" alt="Снимок коллизии"><span>Открыть крупнее</span></button>` : '<div class="preview-empty"><span>◫</span><small>Снимок создастся после перехода в 3D</small></div>'}</div><div class="detail-actions"><button id="focus" class="primary">Перейти в 3D</button><button id="capture-image">▣ Снимок пары</button></div><div class="detail-scroll"><div class="coordinates">${r.point.map((v, i) => `<span>${["X", "Y", "Z"][i]} ${v.toFixed(3)}</span>`).join("")}</div><label>Состояние<select id="edit-state">${Object.entries(
          stateNames,
        )
          .map(
            ([k, v]) =>
              `<option value="${k}" ${r.state === k ? "selected" : ""}>${v}</option>`,
          )
          .join(
            "",
          )}</select></label><label>Назначение<input id="assignee" value="${e(r.assignee)}"></label><label>Комментарий<textarea id="note" rows="2">${e(r.note)}</textarea></label>${[
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
          .join("")}</div>`
      : '<div class="detail-empty"><span>◫</span><p>Выберите коллизию в таблице</p><small>Двойной щелчок сразу перенесёт камеру в 3D.</small></div>';
  }
  const selectionModelIds = (s: Selection): string[] => {
    const ids = new Set(
      !s.manualOnly && s.modelsMode === "selected" ? s.models : [],
    );
    for (const id of s.include) {
      try {
        ids.add(String(JSON.parse(id)[0]));
      } catch {
        const model = snapshot?.elements.find(
          (item) => item.id === id,
        )?.modelId;
        if (model) ids.add(model);
      }
    }
    return [...ids];
  };
  const syncVisibleModelSelections = () => {
    const c = check();
    if (!c || tab !== "select") return;
    for (const article of root.querySelectorAll<HTMLElement>("[data-side]")) {
      const side = article.dataset.side as "a" | "b",
        boxes = [...article.querySelectorAll<HTMLInputElement>(".model-check")];
      if (!boxes.length) continue;
      const values = boxes
          .filter((item) => item.checked)
          .map((item) => item.value),
        all = values.length === boxes.length,
        s = c[side];
      s.modelsMode = all ? "all" : "selected";
      s.models = all ? [] : values;
      s.conditions = [];
      s.mode = "all";
    }
  };
  const scanScope = (targets?: Check[]) => {
    if (!targets?.length) return undefined;
    const ids = new Set<string>();
    for (const c of targets)
      for (const s of [c.a, c.b]) {
        if (!s.manualOnly && s.modelsMode !== "selected") return undefined;
        for (const id of selectionModelIds(s)) ids.add(id);
      }
    return ids;
  };
  const modelAliases = (value: string) => {
    let normalized = value.trim().replace(/\\/g, "/").toLocaleLowerCase();
    try {
      normalized = decodeURIComponent(normalized);
    } catch {}
    normalized = normalized.replace(/[?#].*$/, "");
    const tail = normalized.split("/").filter(Boolean).at(-1) || normalized;
    return new Set([normalized, tail]);
  };
  const reconcileModelSelections = (models: Snapshot["models"]) => {
    const exact = new Set(models.map((model) => model.id)),
      candidates = models.map((model) => ({
        id: model.id,
        aliases: new Set([
          ...modelAliases(model.id),
          ...modelAliases(model.name),
        ]),
      }));
    const resolve = (oldId: string) => {
      if (exact.has(oldId)) return oldId;
      const aliases = modelAliases(oldId),
        matches = candidates.filter((candidate) =>
          [...aliases].some((alias) => candidate.aliases.has(alias)),
        );
      return matches.length === 1 ? matches[0].id : oldId;
    };
    const elementId = (id: string) => {
      try {
        const parsed = JSON.parse(id);
        if (!Array.isArray(parsed) || parsed.length < 2) return id;
        const current = String(parsed[0]),
          replacement = resolve(current);
        return replacement === current
          ? id
          : JSON.stringify([replacement, ...parsed.slice(1)]);
      } catch {
        return id;
      }
    };
    let changed = false;
    const update = (selection: Selection) => {
      const models = selection.models.map(resolve),
        include = selection.include.map(elementId),
        exclude = selection.exclude.map(elementId);
      if (
        models.some((id, index) => id !== selection.models[index]) ||
        include.some((id, index) => id !== selection.include[index]) ||
        exclude.some((id, index) => id !== selection.exclude[index])
      ) {
        selection.models = [...new Set(models)];
        selection.include = [...new Set(include)];
        selection.exclude = [...new Set(exclude)];
        changed = true;
      }
    };
    for (const c of saved.checks) {
      update(c.a);
      update(c.b);
      if (c.modelsAtRun) c.modelsAtRun = c.modelsAtRun.map(resolve);
    }
    for (const set of saved.sets) {
      const replacement = set.selection.models.map(resolve);
      if (replacement.some((id, index) => id !== set.selection.models[index])) {
        set.selection.models = [...new Set(replacement)];
        changed = true;
      }
    }
    if (changed) mark();
    return changed;
  };
  const refreshSelectionCounts = () => {
    const c = check();
    if (!c) return;
    for (const article of root.querySelectorAll<HTMLElement>("[data-side]")) {
      const side = article.dataset.side as "a" | "b";
      const count =
        snapshot?.elements.filter(
          (item) => (c.includeHidden || !item.hidden) && matches(item, c[side]),
        ).length || 0;
      const requiredModels = c[side].manualOnly
          ? selectionModelIds(c[side])
          : c[side].modelsMode === "selected"
            ? c[side].models
            : (snapshot?.models || []).map((model) => model.id),
        complete =
          !!snapshot &&
          requiredModels.every((id) => snapshot!.indexedModelIds.includes(id));
      const output = article.querySelector<HTMLElement>(
        "[data-selection-count]",
      );
      if (output)
        output.textContent = complete
          ? `${count} элементов`
          : "число после запуска";
    }
  };
  function markers() {
    host.markers(resultRows(), selected, show, (id) =>
      action(() => pick(id, true)),
    );
  }
  function pick(id: string, focus = false) {
    if (busy) return;
    selected = id;
    if (tab === "results") {
      const index = resultRows().findIndex((row) => row.id === id),
        targetPage = index < 0 ? page : Math.floor(index / 50);
      if (targetPage !== page) {
        page = targetPage;
        renderTable();
      }
      for (const row of root.querySelectorAll<HTMLElement>("[data-result]"))
        row.classList.toggle("active", row.dataset.result === id);
      renderDetail();
      requestAnimationFrame(() => {
        const row = [...root.querySelectorAll<HTMLElement>("[data-result]")].find(
          (item) => item.dataset.result === id,
        );
        row?.scrollIntoView({ block: "nearest", inline: "nearest" });
      });
    }
    markers();
    if (focus) {
      const r = check()?.results.find((x) => x.id === id);
      if (r) {
        host.focus(r, Number(q<HTMLInputElement>("distance").value));
        schedulePreview(r);
      }
    }
  }
  function schedulePreview(r: Clash) {
    clearTimeout(previewTimer);
    const token = ++previewToken;
    const distance = Number(q<HTMLInputElement>("distance").value);
    if (
      (r.image && r.imageScope === "pair-ab" && r.imageDistance === distance) ||
      !host.canLocate(r)
    )
      return;
    previewTimer = window.setTimeout(async () => {
      if (token !== previewToken || busy || selected !== r.id) return;
      try {
        // Frame from the approach camera, not from wherever the flight to the
        // conflict happens to be after half a second.
        const image = await host.snapshot(
          r,
          distance,
          () => token !== previewToken || busy || selected !== r.id,
          false,
          false,
        );
        if (token !== previewToken || selected !== r.id) return;
        r.image = image;
        r.imageScope = "pair-ab";
        r.imageDistance = distance;
        mark();
        if (tab === "results") renderDetail();
      } catch (error) {
        if (token === previewToken && selected === r.id)
          note(
            "Не удалось создать снимок выбранной коллизии: " +
              (error instanceof Error ? error.message : String(error)),
            true,
          );
      }
    }, 500);
  }
  async function previewPair(r: Clash) {
    aborted = false;
    setBusy(true);
    showProgress("Создание снимка пары");
    try {
      const distance = Number(q<HTMLInputElement>("distance").value);
      r.image = await host.snapshot(r, distance, () => aborted);
      r.imageScope = "pair-ab";
      r.imageDistance = distance;
      mark();
      if (tab === "results" && selected === r.id) renderDetail();
    } catch (error) {
      note(
        "Результаты сохранены. Снимок пары не создан: " +
          (error instanceof Error ? error.message : String(error)),
        true,
      );
    } finally {
      hideProgress();
      setBusy(false);
    }
  }
  async function scan(targets?: Check[], catalogOnly = false) {
    switchProject();
    showProgress("Подготовка моделей");
    let scope = catalogOnly ? new Set<string>() : scanScope(targets);
    if (!catalogOnly && scope?.size) {
      const catalog = await host.scan(
        (message) => showProgress(message),
        () => aborted,
        new Set<string>(),
      );
      snapshot = catalog;
      if (reconcileModelSelections(catalog.models)) scope = scanScope(targets);
    }
    snapshot = await host.scan(
      (message) => {
        note(message);
        showProgress(message);
      },
      () => aborted,
      scope,
    );
    q("model-count").textContent =
      `Проиндексировано моделей: ${snapshot.indexedModelIds.length} из ${snapshot.models.length} · элементов: ${snapshot.elements.length}`;
    render();
    note(
      snapshot.blockers.length
        ? snapshot.blockers.join(" ")
        : snapshot.warnings.length
          ? `Модели прочитаны с замечаниями. ${snapshot.warnings.join(" ")}`
          : "Модели прочитаны. Настройте выборки и запустите проверку.",
      !!snapshot.blockers.length,
    );
  }
  const setBusy = (value: boolean) => {
    busy = value;
    if (value) {
      clearTimeout(previewTimer);
      previewToken++;
    }
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
      "clear-project",
    ])
      q<HTMLInputElement>(id).disabled = value;
    q("cancel").hidden = !value;
    q("content").inert = value;
    q("checks").inert = value;
  };
  async function compute(c: Check): Promise<Clash[]> {
    const report = (p: RunProgress) => {
      const label = `${c.name} · ${p.phase}`;
      note(`${label} ${p.done}/${p.total} · найдено ${p.found}`);
      showProgress(label, p.done, p.total, p.found);
    };
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
    switchProject();
    syncVisibleModelSelections();
    const targets = all
      ? [...saved.checks]
      : ([check()].filter(Boolean) as Check[]);
    if (!targets.length) throw Error("Создайте проверку.");
    for (const c of targets)
      for (const s of [c.a, c.b]) {
        s.conditions = [];
        s.mode = "all";
      }
    aborted = false;
    setBusy(true);
    showProgress("Подготовка моделей");
    try {
      await scan(targets);
      setBusy(true);
      if (snapshot!.blockers.length)
        throw Error(
          "Состав моделей прочитан не полностью. " +
            snapshot!.blockers.join(" "),
        );
      for (const c of targets) {
        if (aborted) break;
        for (const s of [c.a, c.b]) {
          if (
            s.modelsMode === "selected" &&
            s.models.some((id) => !snapshot!.models.some((m) => m.id === id))
          )
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
        c.modelsAtRun = [...snapshot!.indexedModelIds];
        c.status = "done";
        c.warnings = [...snapshot!.warnings];
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
      const first = check()?.results.find((r) => r.id === selected);
      if (first && !aborted) await previewPair(first);
    } finally {
      hideProgress();
      setBusy(false);
      render();
    }
  }
  function editSelection(target: HTMLElement) {
    const side = target.closest<HTMLElement>("[data-side]")?.dataset.side as
      "a" | "b" | undefined;
    if (!side) return;
    const s = check()![side];
    const input = target as HTMLInputElement;
    const article = target.closest<HTMLElement>("[data-side]")!;
    if (input.classList.contains("preset")) {
      s.presetId = input.value || undefined;
      article.querySelector<HTMLButtonElement>(
        '[data-selection="delete-set"]',
      )!.disabled = !s.presetId;
      return;
    }
    if (input.classList.contains("all-models")) {
      for (const item of article.querySelectorAll<HTMLInputElement>(
        ".model-check",
      ))
        item.checked = input.checked;
      s.modelsMode = input.checked ? "all" : "selected";
      s.models = [];
      s.manualOnly = false;
      s.presetId = undefined;
    }
    if (input.classList.contains("model-check")) {
      const boxes = [
          ...article.querySelectorAll<HTMLInputElement>(".model-check"),
        ],
        values = boxes.filter((item) => item.checked).map((item) => item.value),
        all = boxes.length > 0 && values.length === boxes.length;
      article.querySelector<HTMLInputElement>(".all-models")!.checked = all;
      s.modelsMode = all ? "all" : "selected";
      s.models = all ? [] : values;
      s.manualOnly = false;
      s.presetId = undefined;
    }
    s.conditions = [];
    s.mode = "all";
    stale();
    refreshSelectionCounts();
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
      syncVisibleModelSelections();
      aborted = false;
      setBusy(true);
      showProgress("Чтение моделей");
      try {
        const target = check();
        await scan(target ? [target] : undefined, !target);
      } finally {
        hideProgress();
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
  q("clear-project").onclick = () => {
    if (!saved.checks.length && !saved.sets.length) return;
    if (
      !confirm(
        "Очистить проверки, наборы моделей и результаты текущего проекта?",
      )
    )
      return;
    saved.checks = [];
    saved.sets = [];
    snapshot = undefined;
    current = "";
    selected = "";
    checked.clear();
    host.clear();
    mark();
    q("model-count").textContent = "Модели не прочитаны";
    render();
    note("Данные проверок текущего проекта очищены.");
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
      saved = incoming;
      if (projectToken) projects.set(projectToken, saved);
      storeSession(projectId, saved);
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
          "min-penetration",
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
        if (t.id === "min-penetration") {
          const n = Number(t.value);
          if (!Number.isFinite(n) || n < 0 || n > 100000) {
            t.value = String(c.minPenetration);
            throw Error(
              "Минимальная глубина должна быть от 0 до 100 000 мм.",
            );
          }
          c.minPenetration = n;
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
    const target = event.target as HTMLInputElement;
    if (target.id === "result-search" || target.id === "result-depth") {
      page = 0;
      renderTable();
    }
    const c = check(),
      value = Number(target.value);
    if (
      c &&
      target.id === "precision" &&
      Number.isFinite(value) &&
      value >= 0.001 &&
      value <= 100
    ) {
      c.precision = value;
      stale();
    }
    if (
      c &&
      target.id === "min-penetration" &&
      Number.isFinite(value) &&
      value >= 0 &&
      value <= 100000
    ) {
      c.minPenetration = value;
      stale();
    }
  };
  q("content").onclick = (event) =>
    action(async () => {
      const t = event.target as HTMLElement,
        b = t.closest<HTMLButtonElement>("button"),
        c = check();
      if (!c) return;
      if (b?.dataset.selection) {
        const side = b.closest<HTMLElement>("[data-side]")!.dataset.side as
            "a" | "b",
          s = c[side];
        const scrollTop = q("content").scrollTop;
        let affectsSelection = true;
        switch (b.dataset.selection) {
          case "load-set": {
            const set = saved.sets.find((item) => item.id === s.presetId);
            if (!set) throw Error("Выберите сохранённый набор моделей.");
            Object.assign(s, structuredClone(set.selection), {
              conditions: [],
              mode: "all",
              include: [],
              exclude: [],
              manualOnly: false,
              presetId: set.id,
            });
            break;
          }
          case "save-set": {
            if (s.manualOnly)
              throw Error(
                "Ручную выборку элементов нельзя сохранить как набор моделей.",
              );
            const name = await requestSetName();
            if (!name) return;
            const set: ParameterSet = {
              id: crypto.randomUUID(),
              name,
              selection: {
                models: [...s.models],
                modelsMode: s.modelsMode,
                conditions: [],
                mode: "all",
              },
            };
            saved.sets.push(set);
            s.presetId = set.id;
            affectsSelection = false;
            break;
          }
          case "delete-set": {
            const set = saved.sets.find((item) => item.id === s.presetId);
            if (!set) throw Error("Выберите сохранённый набор моделей.");
            if (!confirm(`Удалить набор «${set.name}»?`)) return;
            saved.sets = saved.sets.filter((item) => item.id !== set.id);
            for (const item of saved.checks)
              for (const selection of [item.a, item.b])
                if (selection.presetId === set.id)
                  selection.presetId = undefined;
            affectsSelection = false;
            break;
          }
          case "show":
            host.select(
              (snapshot?.elements || [])
                .filter((x) => (c.includeHidden || !x.hidden) && matches(x, s))
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
        affectsSelection ? stale() : mark();
        render();
        q("content").scrollTop = scrollTop;
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
          showProgress("Создание снимка пары");
          try {
            r.image = await host.snapshot(
              r,
              Number(q<HTMLInputElement>("distance").value),
              () => aborted,
              true,
            );
            r.imageScope = "pair-ab";
            // Framed by hand from the current viewpoint: the report must keep it.
            r.imageDistance = undefined;
            mark();
            renderDetail();
            note("Снимок сохранён в результат.");
          } finally {
            hideProgress();
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
          pick(rows[i].id, true);
        }
      }
      if (b?.id === "export-html" || b?.id === "export-viewer") {
        let failedImages = 0;
        const rows = q<HTMLInputElement>("selected-only").checked
          ? c.results.filter((r) => checked.has(r.id))
          : c.results;
        if (!rows.length) throw Error("Нет результатов для отчёта.");
        if (q<HTMLInputElement>("report-images").checked) {
          const view = host.view,
            previous = view?.storeView(),
            distance = Number(q<HTMLInputElement>("distance").value);
          aborted = false;
          setBusy(true);
          showProgress("Подготовка снимков отчёта", 0, rows.length);
          try {
            await host.captureWorkspace(async () => {
              let i = 0;
              for (const row of rows) {
                if (aborted)
                  throw Error(
                    "Подготовка отчёта отменена. Уже полученные снимки сохранены.",
                  );
                showProgress(
                  "Подготовка снимков отчёта",
                  i,
                  rows.length,
                );
                note("Подготовка снимков: " + (i + 1) + " / " + rows.length);
                // A shot framed at another approach distance is re-taken so the
                // whole report matches the current camera setting. A hand-framed
                // pair shot carries no distance and is kept as it is.
                const stale =
                  row.imageScope !== "pair-ab" ||
                  (row.imageDistance !== undefined &&
                    row.imageDistance !== distance);
                if (!row.image || stale) {
                  if (row.state === "resolved" && !host.canLocate(row)) {
                    i++;
                    continue;
                  }
                  try {
                    row.image = await host.snapshot(row, distance, () => aborted);
                    row.imageScope = "pair-ab";
                    row.imageDistance = distance;
                    mark();
                  } catch (error) {
                    if (aborted || !host.isCurrent()) throw error;
                    failedImages++;
                  }
                }
                i++;
                showProgress("Подготовка снимков отчёта", i, rows.length);
              }
            });
          } finally {
            if (view && host.isCurrent()) {
              const r = c.results.find((r) => r.id === selected);
              if (r)
                try {
                  host.focus(r, distance, false);
                } catch {}
              if (previous) view.restoreView(previous);
            }
            hideProgress();
            setBusy(false);
          }
        }
        const exportRows = q<HTMLInputElement>("report-images").checked
          ? rows.map((r) =>
              r.imageScope === "pair-ab" ? r : { ...r, image: undefined },
            )
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
            "." +
            (failedImages
              ? ` Не удалось создать снимков: ${failedImages}; эти строки включены без изображения.`
              : ""),
          failedImages > 0,
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
    if (busy) return;
    if (switchProject()) {
      q("model-count").textContent = "Модели не прочитаны";
      note(
        saved.checks.length
          ? "Открыт другой проект. Показаны его проверки; обновите модели."
          : "Открыт другой проект. Для него ещё нет проверок.",
      );
      if (!busy) render();
    } else if (snapshot && !host.isCurrent()) {
      snapshot = undefined;
      host.clear();
      q("model-count").textContent = "3D-окно изменилось";
      note("Активное 3D-окно изменилось. Обновите модели.");
      if (!busy) render();
    }
  }, 1500);
  render();
  return () => {
    disposeResize();
    clearInterval(contextTimer);
    clearTimeout(previewTimer);
    previewToken++;
    aborted = true;
    cancelWorker?.();
    worker?.terminate();
    host.clear();
  };
}
