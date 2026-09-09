const He = `<h2>Работа с проверками</h2>
<details open><summary>1. Первая проверка</summary><ol><li>Откройте проект и подключите IFC/SMDX штатными средствами Топоматик 360.</li><li>Откройте нижнюю вкладку «Проверки» и нажмите «Модели».</li><li>Нажмите «＋ Новая проверка» и задайте ей понятное имя.</li><li>Во вкладке «Выбор» оставьте галочки только у нужных файлов в А и Б. «Все модели» включено по умолчанию.</li><li>Выберите «По пересечению» или «Дублирование» и нажмите «Запустить».</li><li>Во вкладке «Результаты» дважды нажмите строку: камера направится к конфликту, элемент А будет выделен красным, элемент Б — синим.</li></ol><p>Первое обновление без созданной проверки получает только список файлов. При запуске индексируются модели, отмеченные хотя бы в одной стороне. Файл проекта WDX служит контейнером и в выбор моделей не попадает.</p></details>
<details><summary>2. Выбор моделей и сохранённые наборы</summary><p>Выбор А и выбор Б задают две стороны сравнения. Снимите «Все модели» и отметьте конкретные IFC/SMDX. Для поиска дубликатов внутри одного файла отметьте его с обеих сторон.</p><p>Часто используемый состав можно сохранить как набор моделей, а затем применить в другой проверке. Наборы входят в файл проверок. Состав выборки задаётся галочками моделей и ручным выделением объектов.</p><p>IFC GUID читается из свойства <code>ifc.id</code>; также поддерживаются GlobalId, IfcGuid и GUID.</p></details>
<details><summary>3. Работа с выделением в 3D</summary><p>Сначала выделите элементы штатными средствами в 3D-окне, затем используйте кнопку в нужной стороне:</p><ul><li><b>Показать выбранные элементы</b> — выделяет весь текущий состав.</li><li><b>Только выделенные в 3D</b> — оставляет только выделенные объекты.</li><li><b>＋ Добавить из 3D</b> — добавляет выделенные объекты к моделям.</li><li><b>− Исключить из 3D</b> — исключает выделенные объекты.</li><li><b>Сбросить ручной выбор</b> — снова использует отмеченные модели.</li></ul><p>Ручные идентификаторы могут измениться после замены IFC/SMDX, поэтому такую выборку следует проверить заново.</p></details>
<details><summary>4. Пересечения, глубина, касания и дубликаты</summary><p><b>Пересечение</b> фиксирует пересечение треугольных поверхностей или вложенность замкнутых тел. <b>Расчётная глубина</b> определяется по точкам поверхности одного тела, оказавшимся внутри второго: для каждой такой точки находится расстояние до ближайшей поверхности второго тела, после чего берётся наибольшее значение. Это оценка тяжести конфликта, а не длина захода трубы или другого элемента вдоль его оси. Поле «Минимальная глубина» отсекает меньшие результаты.</p><p>Для открытой или неполной поверхности надёжно определить глубину нельзя; такой результат получает нулевую оценку. Перекрытие габаритных коробок больше не используется вместо глубины: оно давало значения, похожие на диаметр трубы, при стыках фасеточных поверхностей. «Точность расчёта» задаёт числовую погрешность. <b>Касание</b> — соприкосновение без проникновения; переключатель включает такие пары.</p><p>Труба и отвод могут образовать геометрическую коллизию в месте штатного соединения из-за фасеточной аппроксимации круглых поверхностей. Такие соединения следует исключать правилом составного объекта или общим свойством, если исходная модель содержит нужную связь. <b>Дублирование</b> ищет совпадающие треугольники в одинаковых мировых координатах.</p></details>
<details><summary>5. Составные объекты и неполная геометрия</summary><p>Один IFC-объект может состоять из нескольких частей. Чтобы не сравнивать его части между собой, включите «Не проверять геометрию одного составного объекта» во вкладке «Правила». Там же можно исключить пары одной модели или одинакового значения свойства.</p><p>Пустые и неполные геометрические части пропускаются, а пригодные части модели продолжают участвовать. Плагин показывает сводное замечание с количеством пропущенных элементов. Незагруженный подключённый файл блокирует расчёт только тогда, когда он входит в выборку.</p></details>
<details><summary>6. Результаты и состояния</summary><p>«Новый» найден впервые, «Активный» найден повторно, «Проверенный» рассмотрен, «Подтверждённый» подтверждён, «Исключённый» исключён из работы. «Исправленный» означает, что пара исчезла при повторном расчёте с теми же правилами; состояние можно изменить вручную.</p><p>В таблице доступны IFC GUID, расчётная глубина, назначение и комментарий. Галочки меняют состояние сразу у нескольких строк. Значения можно выделять и копировать. При переходе стрелками активная строка автоматически прокручивается в видимую область. Состояние «Устарела» у проверки означает, что после последнего расчёта изменили её тип, выборки, параметры или правила.</p></details>
<details><summary>7. Отчёт и снимки</summary><p>Кнопка «Снимок пары» в карточке результата сохраняет текущий ракурс только с двумя элементами коллизии: элемент А показан красным, элемент Б — синим. На время съёмки нижняя панель автоматически уменьшается, чтобы освободить место для широкого 3D-кадра, а затем возвращается к прежнему размеру. При формировании отчёта снимки пар создаются автоматически.</p><p>Файл сессии предназначен для открытия результатов в плагине «НашеПО · Коллизии». Для исправленной пары с отсутствующими элементами используется сохранённый снимок пары, если он есть.</p></details>
<details><summary>8. Проекты, сохранение и очистка</summary><p>В пределах открытой страницы каждый проект получает собственный список проверок. Сворачивание или повторное открытие нижней панели сохраняет проверки, результаты и комментарии в текущей вкладке. При переключении проекта данные предыдущего не подмешиваются. «Очистить проект» удаляет проверки, результаты и наборы только у текущего проекта.</p><p>«Сохранить проверки» записывает правила, наборы моделей, результаты, комментарии и снимки в JSON. «Открыть проверки» загружает этот файл. Геометрия в файл не входит: соответствующие модели надо открыть отдельно. После обновления или закрытия страницы для продолжения работы используйте сохранённый файл.</p></details>
<details><summary>9. Большие проекты</summary><p>Жёсткого предела в 6 млн треугольников нет. При запуске строится индекс только по отмеченным моделям. Точная геометрия передаётся в расчёт по мере появления близких пар в компактном индексированном виде.</p><p>Время и память всё равно зависят от состава выборок и числа потенциальных пар. Разделяйте проверки по моделям и системам. В сцене одновременно показывается до 3000 знаков; при 50 000 результатах расчёт останавливается без замены прежнего результата.</p></details>`;
function Xe(t) {
  let e = t.parentElement, i;
  for (; e && !i; )
    i = [...e.children].find(
      (m) => m.classList.contains("resizer-horizontal")
    ), e = e.parentElement;
  if (!i) return () => {
  };
  const s = i, o = t.ownerDocument.defaultView;
  let n;
  const a = () => {
    if (n === void 0) return;
    const m = n;
    n = void 0, s.dispatchEvent(
      new MouseEvent("mouseup", { bubbles: !0, composed: !0 })
    ), s.hasPointerCapture(m) && s.releasePointerCapture(m);
  }, l = (m) => {
    m.button === 0 && (n = m.pointerId, s.setPointerCapture(m.pointerId));
  };
  return s.addEventListener("pointerdown", l), s.addEventListener("pointerup", a), s.addEventListener("pointercancel", a), s.addEventListener("lostpointercapture", a), o.addEventListener("blur", a), () => {
    a(), s.removeEventListener("pointerdown", l), s.removeEventListener("pointerup", a), s.removeEventListener("pointercancel", a), s.removeEventListener("lostpointercapture", a), o.removeEventListener("blur", a);
  };
}
const Ke = "0.3.4", ke = (t) => typeof t == "string" && /^data:image\/(jpeg|png);base64,[A-Za-z0-9+/=]+$/.test(t), pe = {
  new: "Новый",
  active: "Активный",
  reviewed: "Проверенный",
  approved: "Подтверждённый",
  resolved: "Исправленный",
  excluded: "Исключённый"
}, ze = () => ({
  models: [],
  modelsMode: "all",
  conditions: [],
  mode: "all",
  include: [],
  exclude: []
}), _e = () => ({
  id: crypto.randomUUID(),
  name: "Новая проверка",
  type: "intersection",
  a: ze(),
  b: ze(),
  precision: 0.1,
  minPenetration: 0,
  touching: !1,
  ignoreSameModel: !1,
  ignoreSameGroup: !1,
  equalProperty: "",
  includeHidden: !1,
  results: [],
  status: "new",
  warnings: []
}), qe = ({
  triangles: t,
  vertices: e,
  indices: i,
  triangleCount: s,
  closed: o,
  bounds: n,
  ...a
}) => a;
function we(t, e) {
  return e.exclude.includes(t.id) ? !1 : e.include.includes(t.id) ? !0 : !(e.manualOnly || e.modelsMode === "selected" && !e.models.includes(t.modelId) || e.modelsMode === void 0 && e.models.length && !e.models.includes(t.modelId));
}
const et = (t) => JSON.stringify([
  t.type,
  ...[t.a, t.b].map(
    ({
      models: e,
      modelsMode: i,
      conditions: s,
      mode: o,
      include: n,
      exclude: a,
      manualOnly: l
    }) => ({
      models: e,
      modelsMode: i,
      conditions: s,
      mode: o,
      include: n,
      exclude: a,
      manualOnly: l
    })
  ),
  t.precision,
  t.minPenetration,
  t.touching,
  t.ignoreSameModel,
  t.ignoreSameGroup,
  t.equalProperty,
  t.includeHidden
]), tt = (t, e) => JSON.stringify([t, e].sort());
function it(t, e, i) {
  const s = new Map(t.map((n) => [n.id, n])), o = e.map((n) => {
    const a = s.get(n.id);
    return s.delete(n.id), {
      ...n,
      note: a?.note ?? "",
      assignee: a?.assignee ?? "",
      firstSeen: a?.firstSeen ?? i,
      lastSeen: i,
      state: !a || a.state === "resolved" ? "new" : a.state === "new" ? "active" : a.state
    };
  });
  for (const n of s.values())
    o.push({
      ...n,
      state: n.state === "excluded" ? "excluded" : "resolved"
    });
  return o;
}
function Ye(t) {
  const e = JSON.parse(t);
  if (e?.format !== "nashepo.checks" || e.version !== 1 || !Array.isArray(e.checks))
    throw Error("Это не файл проекта проверок НашеПО.");
  const i = /* @__PURE__ */ new Set();
  if (e.sets ??= [], !Array.isArray(e.sets) || !e.sets.every(
    (o) => o && typeof o.id == "string" && typeof o.name == "string" && o.selection && Array.isArray(o.selection.models) && o.selection.models.every((n) => typeof n == "string") && (o.selection.modelsMode === void 0 || ["all", "selected"].includes(o.selection.modelsMode)) && Array.isArray(o.selection.conditions) && o.selection.conditions.every(
      (n) => n && typeof n.field == "string" && typeof n.value == "string" && ["eq", "ne", "contains", "exists", "gt", "lt"].includes(
        n.op
      )
    ) && ["all", "any"].includes(o.selection.mode)
  ))
    throw Error("Некорректные наборы моделей.");
  const s = (o) => /\.wdx(?:[?#].*)?$/i.test(o);
  for (const o of e.sets)
    o.selection.models = o.selection.models.filter(
      (n) => !s(n)
    ), o.selection.conditions = [], o.selection.mode = "all", o.selection.modelsMode ??= o.selection.models.length ? "selected" : "all";
  for (const o of e.checks) {
    if (!o || typeof o.id != "string" || i.has(o.id) || typeof o.name != "string" || !["intersection", "duplicates"].includes(o.type) || !["new", "done", "stale"].includes(o.status) || !Number.isFinite(o.precision) || o.precision < 1e-3 || o.precision > 100 || o.minPenetration !== void 0 && (!Number.isFinite(o.minPenetration) || o.minPenetration < 0 || o.minPenetration > 1e5) || !Array.isArray(o.results))
      throw Error("Некорректные параметры проверки.");
    if (i.add(o.id), o.minPenetration ??= 0, ![
      "touching",
      "ignoreSameModel",
      "ignoreSameGroup",
      "includeHidden"
    ].every(
      (n) => typeof o[n] == "boolean"
    ) || typeof o.equalProperty != "string" || o.warnings !== void 0 && (!Array.isArray(o.warnings) || !o.warnings.every((n) => typeof n == "string")) || o.modelsAtRun !== void 0 && (!Array.isArray(o.modelsAtRun) || !o.modelsAtRun.every((n) => typeof n == "string")))
      throw Error("Некорректные правила проверки.");
    o.warnings ??= [], o.modelsAtRun = o.modelsAtRun?.filter((n) => !s(n));
    for (const n of [o.a, o.b]) {
      if (!n || n.manualOnly !== void 0 && typeof n.manualOnly != "boolean" || n.modelsMode !== void 0 && !["all", "selected"].includes(n.modelsMode) || n.presetId !== void 0 && typeof n.presetId != "string" || !["all", "any"].includes(n.mode) || ![n.models, n.include, n.exclude].every(
        (a) => Array.isArray(a) && a.every((l) => typeof l == "string")
      ) || !Array.isArray(n.conditions) || !n.conditions.every(
        (a) => a && typeof a.field == "string" && typeof a.value == "string" && ["eq", "ne", "contains", "exists", "gt", "lt"].includes(a.op)
      ))
        throw Error("Некорректная выборка.");
      n.modelsMode ??= n.models.length ? "selected" : "all", n.models = n.models.filter((a) => !s(a)), n.conditions = [], n.mode = "all";
    }
    for (const n of o.results) {
      if (n?.image !== void 0 && !ke(n.image))
        throw Error("Некорректный снимок результата.");
      if (n?.imageScope !== void 0 && n.imageScope !== "pair" && n.imageScope !== "pair-ab")
        throw Error("Некорректный состав снимка результата.");
      if (!n || typeof n.id != "string" || !Object.hasOwn(pe, n.state) || n.penetrationMm !== void 0 && (!Number.isFinite(n.penetrationMm) || n.penetrationMm < 0) || !Array.isArray(n.point) || n.point.length !== 3 || !n.point.every(Number.isFinite))
        throw Error("Некорректный результат.");
      for (const a of [n.a, n.b])
        if (!a || !["id", "name", "model", "modelId", "guid"].every(
          (l) => typeof a[l] == "string"
        ) || !a.properties || typeof a.properties != "object")
          throw Error("Некорректный элемент результата.");
    }
  }
  return e;
}
const D = (t, e) => [t[0] - e[0], t[1] - e[1], t[2] - e[2]], be = (t, e, i = 1) => [
  t[0] + e[0] * i,
  t[1] + e[1] * i,
  t[2] + e[2] * i
], K = (t, e) => t[0] * e[0] + t[1] * e[1] + t[2] * e[2], xe = (t, e) => [
  t[1] * e[2] - t[2] * e[1],
  t[2] * e[0] - t[0] * e[2],
  t[0] * e[1] - t[1] * e[0]
], J = (t) => Math.hypot(...t), ue = (t) => t.triangleCount ?? (t.indices ? t.indices.length / 3 : t.triangles.length / 9), me = (t, e, i) => t.indices && t.vertices ? t.vertices[t.indices[e * 3 + Math.floor(i / 3)] * 3 + i % 3] : t.triangles[e * 9 + i], ge = (t, e) => [0, 3, 6].map((i) => [
  me(t, e, i),
  me(t, e, i + 1),
  me(t, e, i + 2)
]);
function Ze(t) {
  const e = [1 / 0, 1 / 0, 1 / 0], i = [-1 / 0, -1 / 0, -1 / 0];
  for (let s = 0; s < t.length; s++) {
    const o = s % 3;
    e[o] = Math.min(e[o], t[s]), i[o] = Math.max(i[o], t[s]);
  }
  return { min: e, max: i };
}
const Qe = (t, e, i) => t.min.every((s, o) => s <= e.max[o] + i && t.max[o] >= e.min[o] - i);
function Ae(t, e) {
  const i = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const l of e)
    for (let m = 0; m < 9; m++) {
      const f = m % 3, p = me(t, l, m);
      i.min[f] = Math.min(i.min[f], p), i.max[f] = Math.max(i.max[f], p);
    }
  if (e.length <= 12) return { ...i, ids: e };
  const s = i.max.map((l, m) => l - i.min[m]), o = s.indexOf(Math.max(...s)), n = (l) => me(t, l, o) + me(t, l, o + 3) + me(t, l, o + 6);
  e.sort((l, m) => n(l) - n(m));
  const a = e.length >> 1;
  return {
    ...i,
    left: Ae(t, e.slice(0, a)),
    right: Ae(t, e.slice(a))
  };
}
function* ye(t, e, i) {
  Qe(t, e, i) && (t.ids ? yield* t.ids : (yield* ye(t.left, e, i), yield* ye(t.right, e, i)));
}
function Ce(t, e) {
  const i = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const a of e)
    for (let l = 0; l < 3; l++)
      i.min[l] = Math.min(i.min[l], t[a].bounds.min[l]), i.max[l] = Math.max(i.max[l], t[a].bounds.max[l]);
  if (e.length <= 16) return { ...i, ids: e };
  const s = i.max.map((a, l) => a - i.min[l]), o = s.indexOf(Math.max(...s));
  e.sort(
    (a, l) => t[a].bounds.min[o] + t[a].bounds.max[o] - (t[l].bounds.min[o] + t[l].bounds.max[o])
  );
  const n = e.length >> 1;
  return {
    ...i,
    left: Ce(t, e.slice(0, n)),
    right: Ce(t, e.slice(n))
  };
}
function $e(t, e, i, s) {
  const o = D(e, t), n = D(i[1], i[0]), a = D(i[2], i[0]), l = xe(o, a), m = K(n, l);
  if (Math.abs(m) <= 1e-12 * J(o) * J(n) * J(a)) return;
  const f = 1 / m, p = D(t, i[0]), x = K(p, l) * f, y = xe(p, n), w = K(o, y) * f, E = K(a, y) * f, S = s / Math.max(J(n), J(a), s);
  if (x >= -S && w >= -S && x + w <= 1 + S && E >= -S && E <= 1 + S)
    return be(t, o, Math.max(0, Math.min(1, E)));
}
function nt(t, e, i, s) {
  const o = i.map(Math.abs).indexOf(Math.max(...i.map(Math.abs))), n = [0, 1, 2].filter((m) => m !== o), a = (m, f, p) => (f[n[0]] - m[n[0]]) * (p[n[1]] - m[n[1]]) - (f[n[1]] - m[n[1]]) * (p[n[0]] - m[n[0]]), l = (m, f) => {
    const p = f.map((x, y) => a(x, f[(y + 1) % 3], m));
    return p.every((x) => x >= -s * J(i)) || p.every((x) => x <= s * J(i));
  };
  for (const m of t) if (l(m, e)) return m;
  for (const m of e) if (l(m, t)) return m;
  for (let m = 0; m < 3; m++)
    for (let f = 0; f < 3; f++) {
      const p = t[m], x = t[(m + 1) % 3], y = e[f], w = e[(f + 1) % 3], E = D(x, p), S = D(w, y), M = E[n[0]] * S[n[1]] - E[n[1]] * S[n[0]];
      if (Math.abs(M) < 1e-18) continue;
      const j = D(y, p), L = (j[n[0]] * S[n[1]] - j[n[1]] * S[n[0]]) / M, C = (j[n[0]] * E[n[1]] - j[n[1]] * E[n[0]]) / M;
      if (L >= 0 && L <= 1 && C >= 0 && C <= 1) return be(p, E, L);
    }
}
function ot(t, e, i, s) {
  const o = xe(D(t[1], t[0]), D(t[2], t[0])), n = xe(D(e[1], e[0]), D(e[2], e[0])), a = J(o), l = J(n);
  if (a < 1e-20 || l < 1e-20) return;
  const m = e.map((p) => K(D(p, t[0]), o) / a), f = t.map((p) => K(D(p, e[0]), n) / l);
  if (!(m.every((p) => p > i) || m.every((p) => p < -i) || f.every((p) => p > i) || f.every((p) => p < -i))) {
    if (m.every((p) => Math.abs(p) <= i) && f.every((p) => Math.abs(p) <= i))
      return s ? nt(t, e, o, i) : void 0;
    if (!(!s && (!(Math.min(...m) < -i && Math.max(...m) > i) || !(Math.min(...f) < -i && Math.max(...f) > i))))
      for (let p = 0; p < 3; p++) {
        const x = $e(t[p], t[(p + 1) % 3], e, i);
        if (x) return x;
        const y = $e(e[p], e[(p + 1) % 3], t, i);
        if (y) return y;
      }
  }
}
function at(t, e, i) {
  const s = D(e[1], e[0]), o = D(e[2], e[0]), n = xe(s, o), a = J(n);
  if (a < 1e-20 || Math.abs(K(D(t, e[0]), n)) / a > i) return !1;
  const l = D(t, e[0]), m = K(s, s), f = K(s, o), p = K(o, o), x = K(l, s), y = K(l, o), w = m * p - f * f;
  if (Math.abs(w) < 1e-30) return !1;
  const E = (x * p - y * f) / w, S = (y * m - x * f) / w, M = i / Math.max(J(s), J(o), i);
  return E >= -M && S >= -M && E + S <= 1 + M;
}
function ve(t, e, i, s) {
  if (!e.closed || t.some((x, y) => x <= e.bounds.min[y] + s || x >= e.bounds.max[y] - s))
    return !1;
  for (const x of ye(i, { min: t, max: t }, s))
    if (at(t, ge(e, x), s)) return !1;
  const o = [1, 0.371390676, 0.52999894], n = J(D(e.bounds.max, e.bounds.min)) * 3 + 1, a = be(t, o, n), l = [], m = Ze([...t, ...a]);
  for (const x of ye(i, m, s)) {
    const y = $e(t, a, ge(e, x), s);
    if (y) {
      const w = J(D(y, t));
      w > s && l.push(w);
    }
  }
  l.sort((x, y) => x - y);
  let f = 0, p = -1 / 0;
  for (const x of l)
    x - p > s * 2 && (f++, p = x);
  return f % 2 === 1;
}
function Se(t, e) {
  return Math.hypot(
    ...t.map((i, s) => Math.max(e.min[s] - i, 0, i - e.max[s]))
  );
}
function rt(t, e) {
  const i = D(e[1], e[0]), s = D(e[2], e[0]), o = D(t, e[0]), n = K(i, o), a = K(s, o);
  if (n <= 0 && a <= 0) return J(o);
  const l = D(t, e[1]), m = K(i, l), f = K(s, l);
  if (m >= 0 && f <= m) return J(l);
  if (n * f - m * a <= 0 && n >= 0 && m <= 0) {
    const j = n / (n - m);
    return J(D(t, be(e[0], i, j)));
  }
  const x = D(t, e[2]), y = K(i, x), w = K(s, x);
  if (w >= 0 && y <= w) return J(x);
  if (y * a - n * w <= 0 && a >= 0 && w <= 0) {
    const j = a / (a - w);
    return J(D(t, be(e[0], s, j)));
  }
  if (m * w - y * f <= 0 && f - m >= 0 && y - w >= 0) {
    const j = D(e[2], e[1]), L = (f - m) / (f - m + (y - w));
    return J(D(t, be(e[1], j, L)));
  }
  const M = xe(i, s);
  return Math.abs(K(o, M)) / Math.max(J(M), 1e-30);
}
function st(t, e, i) {
  let s = 1 / 0;
  const o = (n) => {
    if (Se(t, n) >= s) return;
    if (n.ids) {
      for (const m of n.ids)
        s = Math.min(s, rt(t, ge(e, m)));
      return;
    }
    const a = n.left, l = n.right;
    Se(t, a) < Se(t, l) ? (o(a), o(l)) : (o(l), o(a));
  };
  return o(i), s;
}
async function lt(t, e, i, s, o, n, a) {
  if (!t.closed || !e.closed) return 0;
  let l = 0;
  const m = (p, x, y) => {
    ve(p, x, y, n) && (l = Math.max(l, st(p, x, y)));
  };
  m(o, t, i), m(o, e, s);
  let f = 0;
  for (const [p, x, y] of [
    [t, e, s],
    [e, t, i]
  ]) {
    const w = ue(p), E = Math.max(1, Math.floor(w / 1024));
    for (let S = 0; S < w; S += E) {
      const M = ge(p, S), j = M[0].map((Q, z) => (M[0][z] + M[1][z] + M[2][z]) / 3), L = M[0].map((Q, z) => (M[0][z] + M[1][z]) / 2), C = M[0].map((Q, z) => (M[1][z] + M[2][z]) / 2), h = M[0].map((Q, z) => (M[2][z] + M[0][z]) / 2);
      for (const Q of [M[0], M[1], M[2], L, C, h, j])
        m(Q, x, y);
      f++ % 32 === 0 && await a();
    }
  }
  return l > n ? l * 1e3 : 0;
}
async function dt(t, e, i, s, o) {
  const n = e.precision / 1e3;
  if (!Number.isFinite(n) || n <= 0)
    throw Error("Точность расчёта должна быть положительным числом.");
  const a = t.filter((k) => e.includeHidden || !k.hidden), l = a.filter((k) => we(k, e.a)), m = a.filter((k) => we(k, e.b));
  if (!l.length || !m.length)
    throw Error(
      "Выборка А или Б не содержит элементов. Отметьте хотя бы одну модель в каждой стороне проверки."
    );
  let f = performance.now();
  const p = async () => {
    if (s())
      throw Error("Расчёт отменён. Предыдущие результаты сохранены.");
    performance.now() - f > 16 && (await new Promise((k) => setTimeout(k, 0)), f = performance.now());
  }, x = /* @__PURE__ */ new Map(), y = (k) => {
    let $ = x.get(k.id);
    return $ || ($ = Ae(
      k,
      Array.from({ length: ue(k) }, (T, q) => q)
    ), x.set(k.id, $)), $;
  }, w = /* @__PURE__ */ new Map(), E = async (k) => {
    let $ = w.get(k.id);
    if ($ !== void 0) return $;
    const T = [];
    for (let q = 0; q < ue(k); q++)
      T.push(
        [0, 3, 6].map(
          (ae) => [0, 1, 2].map((A) => Math.round(me(k, q, ae + A) / n)).join(",")
        ).sort().join(";")
      ), q % 9e3 === 0 && await p();
    return $ = T.sort().join("|"), w.set(k.id, $), $;
  }, S = [], M = new Set(l.map((k) => k.id)), j = new Set(m.map((k) => k.id)), L = Ce(
    m,
    m.map((k, $) => $)
  ), C = /* @__PURE__ */ new Map();
  let h = 0;
  const Q = (k) => k.triangles.byteLength + (k.vertices?.byteLength || 0) + (k.indices?.byteLength || 0) + ue(k) * 32;
  async function z(k, $) {
    if (!o) return k;
    let T = C.get(k.id);
    if (T)
      return C.delete(k.id), C.set(k.id, T), T;
    for (const [q, ae] of C)
      q !== $ && h > 96 * 1024 * 1024 && (C.delete(q), h -= Q(ae), x.delete(q), w.delete(q));
    return T = await o(k.id), C.set(k.id, T), h += Q(T), T;
  }
  let _ = -1 / 0;
  for (let k = 0; k < l.length; k++) {
    const $ = l[k];
    performance.now() - _ > 150 && (_ = performance.now(), i({
      phase: "Проверка пар",
      done: k,
      total: l.length,
      found: S.length
    }));
    const T = [...ye(L, $.bounds, n)];
    for (let q = 0; q < T.length; q++) {
      const ae = T[q];
      performance.now() - _ > 150 && (_ = performance.now(), i({
        phase: `Проверка пар · A ${k + 1}/${l.length} · кандидаты ${q + 1}/${T.length}`,
        done: k,
        total: l.length,
        found: S.length
      }));
      const A = m[ae];
      if (await p(), $.id === A.id || !Qe($.bounds, A.bounds, n) || e.ignoreSameModel && $.modelId === A.modelId || e.ignoreSameGroup && $.modelId === A.modelId && $.properties.Объект && $.properties.Объект === A.properties.Объект || e.equalProperty && $.properties[e.equalProperty] !== void 0 && $.properties[e.equalProperty] === A.properties[e.equalProperty] || $.id > A.id && M.has(A.id) && j.has($.id)) continue;
      const ne = tt($.id, A.id), R = await z($), U = await z(A, $.id);
      let B, se = "surface", G = 0;
      if (e.type === "duplicates") {
        if (ue(R) !== ue(U) || R.bounds.min.some(
          (Y, V) => Math.abs(Y - U.bounds.min[V]) > n || Math.abs(R.bounds.max[V] - U.bounds.max[V]) > n
        ))
          continue;
        await E(R) === await E(U) && (B = R.bounds.min.map((Y, V) => (Y + R.bounds.max[V]) / 2), se = "duplicate");
      } else {
        const Y = y(R), V = y(U);
        for (let H = 0; H < ue(R) && !B; H++) {
          const ie = ge(R, H), le = Ze(ie.flat());
          for (const ee of ye(V, le, n)) {
            if (B = ot(ie, ge(U, ee), n, e.touching), B) break;
            await p();
          }
          await p();
        }
        if (!B && R.closed && U.closed) {
          const H = R.bounds.min.map(
            (ie, le) => (ie + R.bounds.max[le]) / 2
          );
          ve(H, R, Y, n) && ve(H, U, V, n) && (B = H, se = "contained");
        }
        if (!B) {
          for (const [H, ie, le] of [
            [R, U, V],
            [U, R, Y]
          ])
            if (ie.closed) {
              for (let ee = 0; ee < ue(H) && !B; ee++) {
                const X = ge(H, ee), F = X[0].map(
                  (de, ce) => (X[0][ce] + X[1][ce] + X[2][ce]) / 3
                );
                for (const de of [X[0], F])
                  if (ve(de, ie, le, n)) {
                    B = de, se = "contained";
                    break;
                  }
                await p();
              }
              if (B) break;
            }
        }
        if (B && (G = await lt(
          R,
          U,
          Y,
          V,
          B,
          n,
          p
        )), B && G + e.precision < e.minPenetration)
          continue;
      }
      if (B && (S.push({
        id: ne,
        a: qe(R),
        b: qe(U),
        point: B,
        kind: se,
        state: "new",
        note: "",
        assignee: "",
        firstSeen: "",
        lastSeen: "",
        penetrationMm: G
      }), S.length >= 5e4))
        throw Error(
          "Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат."
        );
    }
  }
  return i({
    phase: "Готово",
    done: l.length,
    total: l.length,
    found: S.length
  }), S;
}
const Ve = '(function(){"use strict";const sn=({triangles:t,vertices:n,indices:e,triangleCount:s,closed:a,bounds:i,...c})=>c;function an(t,n){return n.exclude.includes(t.id)?!1:n.include.includes(t.id)?!0:!(n.manualOnly||n.modelsMode==="selected"&&!n.models.includes(t.modelId)||n.modelsMode===void 0&&n.models.length&&!n.models.includes(t.modelId))}const un=(t,n)=>JSON.stringify([t,n].sort()),y=(t,n)=>[t[0]-n[0],t[1]-n[1],t[2]-n[2]],G=(t,n,e=1)=>[t[0]+n[0]*e,t[1]+n[1]*e,t[2]+n[2]*e],p=(t,n)=>t[0]*n[0]+t[1]*n[1]+t[2]*n[2],H=(t,n)=>[t[1]*n[2]-t[2]*n[1],t[2]*n[0]-t[0]*n[2],t[0]*n[1]-t[1]*n[0]],w=t=>Math.hypot(...t),L=t=>t.triangleCount??(t.indices?t.indices.length/3:t.triangles.length/9),A=(t,n,e)=>t.indices&&t.vertices?t.vertices[t.indices[n*3+Math.floor(e/3)]*3+e%3]:t.triangles[n*9+e],N=(t,n)=>[0,3,6].map(e=>[A(t,n,e),A(t,n,e+1),A(t,n,e+2)]);function fn(t){const n=[1/0,1/0,1/0],e=[-1/0,-1/0,-1/0];for(let s=0;s<t.length;s++){const a=s%3;n[a]=Math.min(n[a],t[s]),e[a]=Math.max(e[a],t[s])}return{min:n,max:e}}const cn=(t,n,e)=>t.min.every((s,a)=>s<=n.max[a]+e&&t.max[a]>=n.min[a]-e);function Y(t,n){const e={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const o of n)for(let r=0;r<9;r++){const u=r%3,f=A(t,o,r);e.min[u]=Math.min(e.min[u],f),e.max[u]=Math.max(e.max[u],f)}if(n.length<=12)return{...e,ids:n};const s=e.max.map((o,r)=>o-e.min[r]),a=s.indexOf(Math.max(...s)),i=o=>A(t,o,a)+A(t,o,a+3)+A(t,o,a+6);n.sort((o,r)=>i(o)-i(r));const c=n.length>>1;return{...e,left:Y(t,n.slice(0,c)),right:Y(t,n.slice(c))}}function*J(t,n,e){cn(t,n,e)&&(t.ids?yield*t.ids:(yield*J(t.left,n,e),yield*J(t.right,n,e)))}function Z(t,n){const e={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const c of n)for(let o=0;o<3;o++)e.min[o]=Math.min(e.min[o],t[c].bounds.min[o]),e.max[o]=Math.max(e.max[o],t[c].bounds.max[o]);if(n.length<=16)return{...e,ids:n};const s=e.max.map((c,o)=>c-e.min[o]),a=s.indexOf(Math.max(...s));n.sort((c,o)=>t[c].bounds.min[a]+t[c].bounds.max[a]-(t[o].bounds.min[a]+t[o].bounds.max[a]));const i=n.length>>1;return{...e,left:Z(t,n.slice(0,i)),right:Z(t,n.slice(i))}}function k(t,n,e,s){const a=y(n,t),i=y(e[1],e[0]),c=y(e[2],e[0]),o=H(a,c),r=p(i,o);if(Math.abs(r)<=1e-12*w(a)*w(i)*w(c))return;const u=1/r,f=y(t,e[0]),d=p(f,o)*u,m=H(f,i),M=p(a,m)*u,b=p(c,m)*u,x=s/Math.max(w(i),w(c),s);if(d>=-x&&M>=-x&&d+M<=1+x&&b>=-x&&b<=1+x)return G(t,a,Math.max(0,Math.min(1,b)))}function dn(t,n,e,s){const a=e.map(Math.abs).indexOf(Math.max(...e.map(Math.abs))),i=[0,1,2].filter(r=>r!==a),c=(r,u,f)=>(u[i[0]]-r[i[0]])*(f[i[1]]-r[i[1]])-(u[i[1]]-r[i[1]])*(f[i[0]]-r[i[0]]),o=(r,u)=>{const f=u.map((d,m)=>c(d,u[(m+1)%3],r));return f.every(d=>d>=-s*w(e))||f.every(d=>d<=s*w(e))};for(const r of t)if(o(r,n))return r;for(const r of n)if(o(r,t))return r;for(let r=0;r<3;r++)for(let u=0;u<3;u++){const f=t[r],d=t[(r+1)%3],m=n[u],M=n[(u+1)%3],b=y(d,f),x=y(M,m),h=b[i[0]]*x[i[1]]-b[i[1]]*x[i[0]];if(Math.abs(h)<1e-18)continue;const S=y(m,f),C=(S[i[0]]*x[i[1]]-S[i[1]]*x[i[0]])/h,O=(S[i[0]]*b[i[1]]-S[i[1]]*b[i[0]])/h;if(C>=0&&C<=1&&O>=0&&O<=1)return G(f,b,C)}}function ln(t,n,e,s){const a=H(y(t[1],t[0]),y(t[2],t[0])),i=H(y(n[1],n[0]),y(n[2],n[0])),c=w(a),o=w(i);if(c<1e-20||o<1e-20)return;const r=n.map(f=>p(y(f,t[0]),a)/c),u=t.map(f=>p(y(f,n[0]),i)/o);if(!(r.every(f=>f>e)||r.every(f=>f<-e)||u.every(f=>f>e)||u.every(f=>f<-e))){if(r.every(f=>Math.abs(f)<=e)&&u.every(f=>Math.abs(f)<=e))return s?dn(t,n,a,e):void 0;if(!(!s&&(!(Math.min(...r)<-e&&Math.max(...r)>e)||!(Math.min(...u)<-e&&Math.max(...u)>e))))for(let f=0;f<3;f++){const d=k(t[f],t[(f+1)%3],n,e);if(d)return d;const m=k(n[f],n[(f+1)%3],t,e);if(m)return m}}}function mn(t,n,e){const s=y(n[1],n[0]),a=y(n[2],n[0]),i=H(s,a),c=w(i);if(c<1e-20||Math.abs(p(y(t,n[0]),i))/c>e)return!1;const o=y(t,n[0]),r=p(s,s),u=p(s,a),f=p(a,a),d=p(o,s),m=p(o,a),M=r*f-u*u;if(Math.abs(M)<1e-30)return!1;const b=(d*f-m*u)/M,x=(m*r-d*u)/M,h=e/Math.max(w(s),w(a),e);return b>=-h&&x>=-h&&b+x<=1+h}function V(t,n,e,s){if(!n.closed||t.some((d,m)=>d<=n.bounds.min[m]+s||d>=n.bounds.max[m]-s))return!1;for(const d of J(e,{min:t,max:t},s))if(mn(t,N(n,d),s))return!1;const a=[1,.371390676,.52999894],i=w(y(n.bounds.max,n.bounds.min))*3+1,c=G(t,a,i),o=[],r=fn([...t,...c]);for(const d of J(e,r,s)){const m=k(t,c,N(n,d),s);if(m){const M=w(y(m,t));M>s&&o.push(M)}}o.sort((d,m)=>d-m);let u=0,f=-1/0;for(const d of o)d-f>s*2&&(u++,f=d);return u%2===1}function nn(t,n){return Math.hypot(...t.map((e,s)=>Math.max(n.min[s]-e,0,e-n.max[s])))}function hn(t,n){const e=y(n[1],n[0]),s=y(n[2],n[0]),a=y(t,n[0]),i=p(e,a),c=p(s,a);if(i<=0&&c<=0)return w(a);const o=y(t,n[1]),r=p(e,o),u=p(s,o);if(r>=0&&u<=r)return w(o);if(i*u-r*c<=0&&i>=0&&r<=0){const S=i/(i-r);return w(y(t,G(n[0],e,S)))}const d=y(t,n[2]),m=p(e,d),M=p(s,d);if(M>=0&&m<=M)return w(d);if(m*c-i*M<=0&&c>=0&&M<=0){const S=c/(c-M);return w(y(t,G(n[0],s,S)))}if(r*M-m*u<=0&&u-r>=0&&m-M>=0){const S=y(n[2],n[1]),C=(u-r)/(u-r+(m-M));return w(y(t,G(n[1],S,C)))}const h=H(e,s);return Math.abs(p(a,h))/Math.max(w(h),1e-30)}function gn(t,n,e){let s=1/0;const a=i=>{if(nn(t,i)>=s)return;if(i.ids){for(const r of i.ids)s=Math.min(s,hn(t,N(n,r)));return}const c=i.left,o=i.right;nn(t,c)<nn(t,o)?(a(c),a(o)):(a(o),a(c))};return a(e),s}async function yn(t,n,e,s,a,i,c){if(!t.closed||!n.closed)return 0;let o=0;const r=(f,d,m)=>{V(f,d,m,i)&&(o=Math.max(o,gn(f,d,m)))};r(a,t,e),r(a,n,s);let u=0;for(const[f,d,m]of[[t,n,s],[n,t,e]]){const M=L(f),b=Math.max(1,Math.floor(M/1024));for(let x=0;x<M;x+=b){const h=N(f,x),S=h[0].map((D,_)=>(h[0][_]+h[1][_]+h[2][_])/3),C=h[0].map((D,_)=>(h[0][_]+h[1][_])/2),O=h[0].map((D,_)=>(h[1][_]+h[2][_])/2),K=h[0].map((D,_)=>(h[2][_]+h[0][_])/2);for(const D of[h[0],h[1],h[2],C,O,K,S])r(D,d,m);u++%32===0&&await c()}}return o>i?o*1e3:0}async function Mn(t,n,e,s,a){const i=n.precision/1e3;if(!Number.isFinite(i)||i<=0)throw Error("Точность расчёта должна быть положительным числом.");const c=t.filter(l=>n.includeHidden||!l.hidden),o=c.filter(l=>an(l,n.a)),r=c.filter(l=>an(l,n.b));if(!o.length||!r.length)throw Error("Выборка А или Б не содержит элементов. Отметьте хотя бы одну модель в каждой стороне проверки.");let u=performance.now();const f=async()=>{if(s())throw Error("Расчёт отменён. Предыдущие результаты сохранены.");performance.now()-u>16&&(await new Promise(l=>setTimeout(l,0)),u=performance.now())},d=new Map,m=l=>{let g=d.get(l.id);return g||(g=Y(l,Array.from({length:L(l)},(q,I)=>I)),d.set(l.id,g)),g},M=new Map,b=async l=>{let g=M.get(l.id);if(g!==void 0)return g;const q=[];for(let I=0;I<L(l);I++)q.push([0,3,6].map(B=>[0,1,2].map(E=>Math.round(A(l,I,B+E)/i)).join(",")).sort().join(";")),I%9e3===0&&await f();return g=q.sort().join("|"),M.set(l.id,g),g},x=[],h=new Set(o.map(l=>l.id)),S=new Set(r.map(l=>l.id)),C=Z(r,r.map((l,g)=>g)),O=new Map;let K=0;const D=l=>l.triangles.byteLength+(l.vertices?.byteLength||0)+(l.indices?.byteLength||0)+L(l)*32;async function _(l,g){if(!a)return l;let q=O.get(l.id);if(q)return O.delete(l.id),O.set(l.id,q),q;for(const[I,B]of O)I!==g&&K>96*1024*1024&&(O.delete(I),K-=D(B),d.delete(I),M.delete(I));return q=await a(l.id),O.set(l.id,q),K+=D(q),q}let W=-1/0;for(let l=0;l<o.length;l++){const g=o[l];performance.now()-W>150&&(W=performance.now(),e({phase:"Проверка пар",done:l,total:o.length,found:x.length}));const q=[...J(C,g.bounds,i)];for(let I=0;I<q.length;I++){const B=q[I];performance.now()-W>150&&(W=performance.now(),e({phase:`Проверка пар · A ${l+1}/${o.length} · кандидаты ${I+1}/${q.length}`,done:l,total:o.length,found:x.length}));const E=r[B];if(await f(),g.id===E.id||!cn(g.bounds,E.bounds,i)||n.ignoreSameModel&&g.modelId===E.modelId||n.ignoreSameGroup&&g.modelId===E.modelId&&g.properties.Объект&&g.properties.Объект===E.properties.Объект||n.equalProperty&&g.properties[n.equalProperty]!==void 0&&g.properties[n.equalProperty]===E.properties[n.equalProperty]||g.id>E.id&&h.has(E.id)&&S.has(g.id))continue;const wn=un(g.id,E.id),v=await _(g),j=await _(E,g.id);let P,X="surface",en=0;if(n.type==="duplicates"){if(L(v)!==L(j)||v.bounds.min.some((z,T)=>Math.abs(z-j.bounds.min[T])>i||Math.abs(v.bounds.max[T]-j.bounds.max[T])>i))continue;await b(v)===await b(j)&&(P=v.bounds.min.map((z,T)=>(z+v.bounds.max[T])/2),X="duplicate")}else{const z=m(v),T=m(j);for(let $=0;$<L(v)&&!P;$++){const F=N(v,$),Q=fn(F.flat());for(const R of J(T,Q,i)){if(P=ln(F,N(j,R),i,n.touching),P)break;await f()}await f()}if(!P&&v.closed&&j.closed){const $=v.bounds.min.map((F,Q)=>(F+v.bounds.max[Q])/2);V($,v,z,i)&&V($,j,T,i)&&(P=$,X="contained")}if(!P){for(const[$,F,Q]of[[v,j,T],[j,v,z]])if(F.closed){for(let R=0;R<L($)&&!P;R++){const U=N($,R),pn=U[0].map((on,rn)=>(U[0][rn]+U[1][rn]+U[2][rn])/3);for(const on of[U[0],pn])if(V(on,F,Q,i)){P=on,X="contained";break}await f()}if(P)break}}if(P&&(en=await yn(v,j,z,T,P,i,f)),P&&en+n.precision<n.minPenetration)continue}if(P&&(x.push({id:wn,a:sn(v),b:sn(j),point:P,kind:X,state:"new",note:"",assignee:"",firstSeen:"",lastSeen:"",penetrationMm:en}),x.length>=5e4))throw Error("Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат.")}}return e({phase:"Готово",done:o.length,total:o.length,found:x.length}),x}let xn=0;const tn=new Map;self.onmessage=async t=>{if(t.data.request!==void 0){const n=tn.get(t.data.request);tn.delete(t.data.request),t.data.error?n?.reject(Error(t.data.error)):n?.resolve(t.data.geometry);return}try{const{elements:n,check:e}=t.data,s=await Mn(n,e,a=>self.postMessage({progress:a}),()=>!1,t.data.streaming?a=>new Promise((i,c)=>{const o=xn++;tn.set(o,{resolve:i,reject:c}),self.postMessage({load:a,request:o})}):void 0);self.postMessage({results:s})}catch(n){self.postMessage({error:n instanceof Error?n.message:String(n)})}}})();\n', Pe = typeof self < "u" && self.Blob && new Blob(["(self.URL || self.webkitURL).revokeObjectURL(self.location.href);", Ve], { type: "text/javascript;charset=utf-8" });
function ct(t) {
  let e;
  try {
    if (e = Pe && (self.URL || self.webkitURL).createObjectURL(Pe), !e) throw "";
    const i = new Worker(e, {
      name: t?.name
    });
    return i.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(e);
    }), i;
  } catch {
    return new Worker(
      "data:text/javascript;charset=utf-8," + encodeURIComponent(Ve),
      {
        name: t?.name
      }
    );
  }
}
const W = (t) => String(t ?? "").replace(
  /[&<>"']/g,
  (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[e]
);
function Le(t, e) {
  const i = URL.createObjectURL(
    new Blob([e], {
      type: t.endsWith(".html") ? "text/html;charset=utf-8" : "application/json;charset=utf-8"
    })
  ), s = document.createElement("a");
  s.href = i, s.download = t, s.click(), setTimeout(() => URL.revokeObjectURL(i), 6e4);
}
function pt(t, e) {
  const i = W;
  return `<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${i(t.name)}</title><style>body{font:14px/1.5 system-ui;margin:24px;background:#171c23;color:#e6edf5}h1{margin:0}small{color:#a9b7c8}input,select{padding:10px;margin:15px 8px 15px 0;max-width:100%;background:#242e3b;color:inherit;border:1px solid #506074;border-radius:6px}.wrap{overflow:auto}table{border-collapse:separate;border-spacing:0;width:100%}td,th{padding:10px;border-bottom:1px solid #39475a;min-width:100px;vertical-align:top;overflow-wrap:anywhere}th{background:#253142;position:sticky;top:0;text-align:left;white-space:normal}td{max-width:350px}tr[hidden]{display:none}.shot{display:block;width:260px;border:0;background:transparent;padding:0;cursor:zoom-in}dialog{width:min(94vw,1400px);border:1px solid #506074;background:#20242b;color:white;border-radius:10px}dialog img{max-width:100%;max-height:80vh;display:block;margin:12px auto}dialog::backdrop{background:#000b}.shot img{width:100%;border-radius:6px}.legend{margin:12px 0}.red{color:#ff6161}.blue{color:#65baff}@media print{input,select{display:none}body{background:white;color:black}.wrap{overflow:visible}th{position:static;background:#eee}}</style><h1>${i(t.name)}</h1><small>НашеПО · Проверки коллизий · ${i(t.lastRun || "")} · ${t.status === "stale" ? "Результат устарел" : "Последний завершённый расчёт"}</small><p>${i(t.type === "duplicates" ? "Совпадение треугольной геометрии" : "Пересечения поверхностей и вложенность замкнутых тел")}. Точность: ${i(t.precision)} мм${t.type === "intersection" ? `; минимальная глубина: ${i(t.minPenetration)} мм` : ""}. Глубина — оценка максимального удаления точки поверхности одного замкнутого тела, находящейся внутри второго, до его ближайшей поверхности; это не длина захода элемента вдоль оси.</p><p class="legend"><span class="red">● Элемент А выделен красным</span> · <span class="blue">● элемент Б — синим</span></p><input id="search" type="search" placeholder="Поиск по всему отчёту"><select id="state"><option value="">Все состояния</option>${Object.entries(
    pe
  ).map(([s, o]) => `<option value="${s}">${o}</option>`).join(
    ""
  )}</select>${t.type === "intersection" ? '<input id="depth" type="number" min="0" step="1" placeholder="Глубина от, мм">' : ""}<span id="count"></span><div class="wrap"><table><thead><tr>${["Снимок", "№", "Состояние", "Глубина, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "X", "Y", "Z", "Назначение", "Комментарий"].map((s) => `<th>${s}</th>`).join("")}</tr></thead><tbody>${e.map((s, o) => `<tr data-state="${s.state}" data-depth="${s.penetrationMm ?? 0}"><td>${ke(s.image) ? `<button class="shot" type="button"><img src="${s.image}" alt="Снимок конфликта ${o + 1}" loading="lazy"></button>` : "Снимок отсутствует"}</td>${[o + 1, pe[s.state], t.type === "duplicates" ? "—" : (s.penetrationMm ?? 0).toFixed(1), s.a.name, s.a.model, s.a.guid, s.b.name, s.b.model, s.b.guid, ...s.point.map((n) => n.toFixed(4)), s.assignee, s.note].map((n) => `<td>${i(n)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><dialog id="picture"><button id="close-picture">Закрыть</button><img id="full-picture" alt="Снимок конфликта"></dialog><script>const modal=document.getElementById("picture");document.getElementById("close-picture").onclick=()=>modal.close();for(const b of document.querySelectorAll(".shot"))b.onclick=()=>{document.getElementById("full-picture").src=b.querySelector("img").src;modal.showModal()};const q=document.getElementById('search'),s=document.getElementById('state'),d=document.getElementById('depth'),rows=[...document.querySelectorAll('tbody tr')];function filter(){let n=0;for(const r of rows){r.hidden=!!((s.value&&r.dataset.state!==s.value)||(d&&Number(r.dataset.depth)<Number(d.value||0))||!r.textContent.toLowerCase().includes(q.value.toLowerCase()));if(!r.hidden)n++}document.getElementById('count').textContent='Коллизий: '+n}q.oninput=s.onchange=filter;if(d)d.oninput=filter;filter()<\/script></html>`;
}
function ut(t, e) {
  return JSON.stringify(
    {
      version: 1,
      id: t.id,
      name: t.name,
      images: Object.fromEntries(
        e.filter((i) => ke(i.image)).map((i) => [i.id + ".jpg", i.image])
      ),
      warnings: t.warnings,
      tests: [
        {
          id: t.id,
          name: t.name,
          clashes: e.map((i, s) => ({
            id: i.id,
            name: `Конфликт ${s + 1}`,
            distance: t.type === "duplicates" ? "" : `${(i.penetrationMm ?? 0).toFixed(1)} мм`,
            date: t.lastRun || "",
            description: t.type === "duplicates" ? "Дублирование" : "По пересечению",
            status: pe[i.state],
            group: i.assignee,
            note: i.note,
            point: i.point,
            image: ke(i.image) ? i.id + ".jpg" : "",
            enabled: i.state !== "resolved",
            reviewed: i.state === "resolved" || i.state === "reviewed" || i.state === "approved",
            excluded: i.state === "excluded",
            elements: [i.a, i.b].map((o) => ({
              guid: o.guid,
              id: o.id,
              source: o.model,
              name: o.name,
              properties: o.properties
            })),
            properties: {
              Проверка: t.name,
              Вид: i.kind,
              "Расчётная глубина пересечения, мм": String(i.penetrationMm ?? 0)
            }
          }))
        }
      ]
    },
    null,
    2
  );
}
const mt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAydpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAzIDc5Ljk2OTBhODdmYywgMjAyNS8wMy8wNi0yMDo1MDoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDZFQkU2NEQ4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDZFQkU2NEM4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI2LjExIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRENDVBNjQzODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRENDVBNjQ0ODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+pHX+ogAAD+lJREFUeNrs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", ft = ":host{display:block;height:100%;color-scheme:dark;font:13px/1.4 Segoe UI,sans-serif;color:#dbe5f0;container-type:size}*{box-sizing:border-box}[hidden]{display:none!important}main{height:100%;min-height:260px;background:#171d25;display:flex;flex-direction:column;overflow:hidden;-webkit-user-select:none;user-select:none}button,input,select,textarea{font:inherit;color:inherit;border:1px solid #425165;border-radius:6px;background:#253140;padding:7px 9px;min-width:0}button{cursor:pointer;white-space:nowrap}button:hover{background:#354459}button:disabled{opacity:.45;cursor:default}.primary{background:#b99a38;border-color:#d0ae46;color:#111820;font-weight:600}.primary:hover{background:#e0bd51}button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid #f2c94c;outline-offset:1px}input,select,textarea{background:#111a24}input,textarea,td,dd{-webkit-user-select:text;user-select:text}input[type=checkbox]{accent-color:#e6c354;width:16px;height:16px}header{display:flex;gap:7px;align-items:center;padding:8px 12px;border-bottom:1px solid #354459;flex-shrink:0;overflow-x:auto}.brand{display:flex;gap:7px;align-items:center;margin-right:8px}.brand img{width:32px;height:32px;object-fit:contain}.brand b{font-size:17px}.brand small{font-size:10px;color:#a6b5c7}#dirty{margin-left:auto;font-size:11px;color:#cabb81;white-space:nowrap}.notice{background:#1c2735;padding:5px 12px;font-size:12px;min-height:27px;max-height:70px;overflow:auto;color:#a7bbd1}.notice.error{color:#ffaaa1;background:#412725}.workspace{display:grid;grid-template-columns:230px minmax(0,1fr);flex:1;min-height:0}aside{padding:10px;display:flex;flex-direction:column;gap:9px;border-right:1px solid #354459;min-height:0}#checks{overflow:auto;flex:1;min-height:0}.check-item{display:flex;flex-direction:column;gap:5px;width:100%;margin-bottom:5px;text-align:left;white-space:normal}.check-item small{color:#a8b7ca}.check-item.active,.tabs .active{border-color:#c7ab56;background:#403b2c;color:#ffe399}.main{display:flex;flex-direction:column;min-width:0;min-height:0}.test-toolbar{display:flex;gap:7px;padding:8px 12px;align-items:center}.test-toolbar input{flex:1;font-weight:600}.tabs{display:flex;gap:7px;border-bottom:1px solid #354459;padding:0 12px 8px}.tabs button{min-width:105px}#content{flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column}.empty{padding:28px;color:#a4b4c9;text-align:center;margin:auto}h2,h3,p{margin:0 0 10px}h2{font-size:20px}h3{font-size:15px}label{display:flex;flex-direction:column;gap:5px;font-size:12px;color:#b8c6d7}.check{flex-direction:row;align-items:center;gap:6px}small{font-size:11px;color:#a8b7c9}.parameters{display:flex;gap:18px;align-items:end;padding:10px 12px}.parameters input{width:140px}.selection-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0 12px 12px}.selection{border:1px solid #39495e;border-radius:8px;padding:12px;background:#1b2633;min-width:0}.selection h3{display:flex;justify-content:space-between}.selection h3 span{color:#92c4b2;font-size:12px}.selection select[multiple]{width:100%;min-height:70px}.selection-tools{display:flex;gap:5px;flex-wrap:wrap;margin:8px 0}.selection-tools button{font-size:11px;padding:5px 7px}.selection>label{margin-bottom:8px}.condition{display:grid;grid-template-columns:minmax(80px,1fr) 100px minmax(70px,1fr) 29px;gap:5px;margin:6px 0}.condition button{padding:3px}.rules,.report{padding:18px;max-width:850px}.rules>label{margin:14px 0}.rules>p,.report>p{color:#a9b8cb}.report>button{margin:12px 8px 14px 0}.result-tools{display:flex;gap:7px;flex-wrap:wrap;padding:8px 12px}.result-tools input{flex:1;min-width:180px}.result-area{display:grid;grid-template-columns:minmax(0,1fr) 300px;flex:1;min-height:0}.table-area{display:flex;flex-direction:column;min-width:0;min-height:0}.scroll{overflow:auto;flex:1;min-height:0}table{border-collapse:separate;border-spacing:0;width:max-content;min-width:100%}th{position:sticky;top:0;background:#2a3748;z-index:1;text-align:left;max-width:240px;white-space:normal}th,td{padding:8px;border-bottom:1px solid #344154;vertical-align:top}td{max-width:320px;min-width:90px;overflow-wrap:anywhere;-webkit-user-select:text;user-select:text}td:first-child{min-width:36px}tr.active td{background:#453e29;color:#fff0b5}tr:hover td{background:#2c3847}.pager{display:flex;gap:10px;align-items:center;justify-content:center;padding:5px;border-top:1px solid #39495e;font-size:11px}.pager button{padding:2px 8px}.detail{border-left:1px solid #354459;padding:10px;overflow:auto}.detail h3{overflow-wrap:anywhere}.detail>label{margin:10px 0}.detail p{font:11px/1.5 Consolas,monospace}.detail details{border-top:1px solid #354459;padding:8px 0}summary{cursor:pointer}dl{font-size:11px;display:grid;grid-template-columns:1fr 1fr;gap:7px}dt,dd{overflow-wrap:anywhere;margin:0}dt{color:#9baec4}footer{border-top:1px solid #354459;padding:4px 12px;display:flex;justify-content:space-between;color:#91a4bb;font-size:11px}dialog{border:1px solid #53647c;border-radius:12px;background:#202c3a;color:#dbe5f0;width:min(700px,92vw);max-height:85vh;padding:20px;box-shadow:0 15px 60px #000a}dialog::backdrop{background:#000a}dialog p{margin:12px 0}dialog a{color:#f2c94c;margin-right:12px}.dialog-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:16px}@container (max-width:950px){.workspace{grid-template-columns:185px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 240px}.selection-grid{grid-template-columns:1fr}.parameters,.test-toolbar{flex-wrap:wrap}.test-toolbar input{flex-basis:100%}}@container (max-height:400px){header{padding:5px 10px}.test-toolbar{padding:5px 10px}.tabs{padding-bottom:5px}.brand img{width:25px;height:25px}footer{display:none}}:host{font-size:12px}.brand img{background:#e1e7ef;border-radius:5px;padding:3px}.selection-tools button{font-size:12px}label{font-size:13px}.choose-layout{display:grid;grid-template-columns:220px minmax(0,1fr);min-height:0;flex:1;overflow:auto}.choose-layout .parameters{display:flex;flex-direction:column;align-items:stretch;gap:15px;border-right:1px solid #354459;justify-content:flex-start}.choose-layout .parameters input{width:100%}.choose-layout .parameters input[type=checkbox]{width:16px}.choose-layout .selection-grid{padding:10px 12px;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start;min-width:0}.selection select[multiple]{height:180px;resize:vertical}.selection-mode{font-size:12px;color:#b6c4d5}.preset-row{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:9px}.preset-row select{flex:1 1 160px}.preset-row button{padding:5px 7px;font-size:12px}.model-list{height:150px;overflow:auto;border:1px solid #425165;border-radius:6px;background:#111a24;padding:5px;margin-bottom:5px}.model-list label{display:flex;flex-direction:row;align-items:center;gap:7px;padding:4px 5px;color:#dbe5f0;overflow-wrap:anywhere}.model-list label:hover{background:#253140}.model-list .model-all{position:sticky;top:-5px;z-index:1;background:#1f2b39;border-bottom:1px solid #425165;font-weight:600}.legend{display:flex;gap:12px;flex-wrap:wrap;font-family:inherit!important}.part-a{color:#ff6161}.part-b{color:#65baff}.preview{display:block;width:100%;padding:5px;margin:8px 0}.preview img{display:block;width:100%;max-height:180px;object-fit:contain}.image-dialog{width:94vw;max-width:1500px}.image-dialog img{display:block;max-width:100%;max-height:75vh;margin:10px auto}#help-dialog{width:min(1000px,94vw);line-height:1.6}#help-dialog details{padding:12px 0;border-bottom:1px solid #425165}#help-dialog summary{font-size:16px;font-weight:600;color:#f0d27a}#help-dialog li{margin:8px 0}@container (max-width:1100px){.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .selection-grid{grid-template-columns:1fr}.condition{grid-template-columns:minmax(60px,1fr) 100px minmax(60px,1fr) 29px}}@container (max-width:700px){.choose-layout{display:block}.choose-layout .parameters{border-right:0;border-bottom:1px solid #354459}.workspace{grid-template-columns:160px minmax(0,1fr)}}button,input,select,textarea{padding:5px 7px;border-radius:5px}button{min-height:27px}input[type=checkbox]{width:14px;height:14px}.commandbar{position:relative;display:flex;gap:8px;min-height:45px;padding:5px 8px;overflow:visible;background:#131b25}.brand{flex:0 0 auto;margin-right:0;gap:5px}.brand img{width:28px;height:28px}.brand b{font-size:14px}.check-heading{display:grid;grid-template-rows:25px 12px;flex:0 1 230px;min-width:145px}.check-heading input{height:25px;border:0;background:transparent;padding:2px 5px;font-weight:600}.check-heading small{padding:0 5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:9px}.tabs{align-self:stretch;align-items:center;flex:0 0 auto;gap:3px;padding:0;border:0}.tabs button{flex:0 0 auto;min-width:0;padding:5px 9px;background:transparent;border-color:transparent}.tabs .active{background:#3e3828;border-color:#b99a38}.header-actions{display:flex;align-items:center;gap:4px;margin-left:auto}#dirty{margin-left:0;width:0;height:0;overflow:visible;font-size:0}#dirty:not(:empty){width:7px;height:7px;border-radius:50%;background:#e5bd43;box-shadow:0 0 0 2px #e5bd4328}.more-menu{position:relative;z-index:20}.more-menu summary{display:grid;place-items:center;width:29px;height:29px;border:1px solid #425165;border-radius:5px;background:#253140;cursor:pointer;list-style:none;font-size:18px}.more-menu summary::-webkit-details-marker{display:none}.more-popover{position:absolute;right:0;top:calc(100% + 5px);display:grid;width:190px;gap:3px;padding:6px;border:1px solid #506176;border-radius:7px;background:#192431;box-shadow:0 12px 35px #000a}.more-popover button{text-align:left}.notice{min-height:23px;max-height:45px;padding:3px 9px;font-size:10px}.run-progress{display:grid;grid-template-columns:minmax(150px,auto) minmax(120px,1fr) auto;align-items:center;gap:8px;min-height:24px;padding:3px 9px;border-bottom:1px solid #425165;background:#202a20;color:#d9e7d2;font-size:10px}.run-progress progress{width:100%;height:7px;accent-color:#e3bc43}#run-phase,#run-value{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#run-value{text-align:right;color:#b9c9b3}.workspace{grid-template-columns:190px minmax(0,1fr)}aside{gap:6px;padding:7px;background:#141c26}.aside-title{font-weight:600;font-size:12px}.aside-actions{display:grid;gap:5px}.check-item{gap:2px;margin-bottom:3px;padding:6px 7px}.check-item small{font-size:9px}.main{background:#171d25}#content{overflow:hidden}.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .parameters{gap:9px;padding:8px}.choose-layout .selection-grid{gap:8px;padding:8px}.selection{padding:8px}.selection h3,h3{font-size:13px;margin-bottom:6px}label{gap:3px;font-size:11px}small,.selection-tools button,.preset-row button{font-size:10px}.model-list{height:125px}.model-list label{padding:2px 4px}.selection-tools{gap:4px;margin:5px 0}.selection-tools button,.preset-row button{padding:3px 5px;min-height:23px}.result-tools{display:flex;align-items:center;justify-content:space-between;gap:6px;flex-wrap:nowrap;min-height:38px;padding:5px 7px;border-bottom:1px solid #354459;background:#151f2a}.result-filters,.bulk-tools{display:flex;align-items:center;gap:5px;min-width:0}.result-filters{flex:1}.result-filters input[type=search]{flex:1 1 190px;min-width:120px}#result-depth{flex:0 1 125px;min-width:92px}#result-count,#selection-count{color:#9fb0c4;white-space:nowrap;font-size:10px}.bulk-tools select{max-width:125px}.result-area{grid-template-columns:minmax(0,1fr) 310px}th,td{padding:5px 6px;font-size:11px;line-height:1.25}th{max-width:190px}td{max-width:260px;min-width:76px}.pager{justify-content:flex-end;min-height:29px;padding:3px 7px}.pager #selection-count{margin-right:auto}.detail{display:flex;flex-direction:column;min-width:0;padding:0;overflow:hidden;background:#141e29}.detail-head{display:flex;align-items:center;justify-content:space-between;gap:6px;min-height:47px;padding:7px 8px 4px}.detail-head>div:first-child{min-width:0}.detail-head small{color:#8093aa;letter-spacing:.08em}.detail-head h3{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin:0}.detail-nav{display:flex;gap:3px}.detail-nav button{min-width:27px;padding:2px 7px;font-size:17px}.clash-summary{display:flex;gap:5px;padding:0 8px 5px;color:#adbdcf;font-size:9px}.clash-summary span{padding-right:5px;border-right:1px solid #405064}.clash-summary span:last-child{border:0}.detail .legend{margin:0;padding:0 8px 5px;font-size:10px}.preview-slot{height:clamp(92px,18cqh,145px);flex:0 0 auto;margin:0 7px 6px;overflow:hidden;border:1px solid #37475b;border-radius:6px;background:#0e151d}.preview{position:relative;width:100%;height:100%;margin:0;padding:0;border:0;background:transparent}.preview img{width:100%;height:100%;max-height:none;object-fit:contain}.preview span{position:absolute;right:5px;bottom:5px;padding:3px 6px;border-radius:4px;background:#101923db;font-size:9px}.preview-empty,.detail-empty{height:100%;display:grid;place-content:center;justify-items:center;gap:4px;color:#788ba1}.preview-empty>span,.detail-empty>span{font-size:24px}.detail-actions{display:grid;grid-template-columns:1fr 1fr;gap:5px;padding:0 7px 7px}.detail-scroll{flex:1;min-height:0;overflow:auto;padding:7px 8px 12px;border-top:1px solid #354459}.detail-scroll>label{margin:7px 0}.detail p{font:inherit}.coordinates{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;font:9px/1.3 Consolas,monospace;color:#91a3b7}.coordinates span{overflow:hidden;text-overflow:ellipsis}.detail details{padding:6px 0}.detail dl{font-size:10px}.detail-empty{padding:20px;text-align:center}footer{padding:2px 8px;font-size:9px}@container (max-width:1050px){.workspace{grid-template-columns:165px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 270px}.check-heading{flex-basis:185px}.tabs button{padding-inline:6px}#dirty{display:none}}@container (max-width:820px){.brand b,.brand small,#result-count{display:none}.check-heading{flex-basis:155px}.result-tools{overflow-x:auto}.result-area{grid-template-columns:minmax(0,1fr) 245px}}@container (max-height:410px){.notice,footer{display:none}.preview-slot{height:90px}}", he = /* @__PURE__ */ new WeakMap(), We = "nashepo.collisionfinder360.project.", je = () => ({
  format: "nashepo.checks",
  version: 1,
  checks: [],
  sets: []
}), Ne = (t) => {
  if (!(!t || typeof sessionStorage > "u"))
    try {
      const e = sessionStorage.getItem(We + t);
      return e ? Ye(e) : void 0;
    } catch {
      return;
    }
}, De = (t, e) => {
  if (!(!t || typeof sessionStorage > "u"))
    try {
      sessionStorage.setItem(
        We + t,
        JSON.stringify(e, (i, s) => i === "image" ? void 0 : s)
      );
    } catch {
    }
};
function ht(t, e) {
  const i = t.shadowRoot || t.attachShadow({ mode: "open" }), s = Xe(t);
  let o = e.projectToken(), n = e.projectId(), a = o && (he.get(o) || Ne(n)) || je();
  o && he.set(o, a);
  let l, m = a.checks[0]?.id || "", f = "select", p = "", x = 0, y = !1, w = !1, E, S = !0, M = !1;
  const j = /* @__PURE__ */ new Set();
  let L;
  const C = () => a.checks.find((r) => r.id === m), h = (r) => i.querySelector("#" + r);
  i.innerHTML = `<style>${ft}</style><main><header class="commandbar"><div class="brand"><img src="${mt}" alt=""><b>НашеПО</b><small>${Ke}</small></div><div class="check-heading"><input id="name" aria-label="Имя проверки" placeholder="Выберите проверку"><small id="check-summary">Проверка не выбрана</small></div><div id="tabs" class="tabs">${[
    ["select", "Выбор"],
    ["results", "Результаты"],
    ["rules", "Правила"],
    ["report", "Отчёт"]
  ].map(([r, d]) => `<button data-tab="${r}">${d}</button>`).join(
    ""
  )}</div><div class="header-actions"><button id="scan" title="Перечитать список и геометрию выбранных моделей">↻ Модели</button><button id="run" class="primary">▶ Запустить</button><button id="cancel" hidden>Остановить</button><details class="more-menu"><summary title="Другие команды">⋮</summary><div class="more-popover"><button id="open">Открыть проверки</button><button id="save">Сохранить проверки</button><button id="copy">Копировать проверку</button><button id="delete">Удалить проверку</button><button id="settings">Настройки</button><button id="help">Справка</button></div></details></div><span id="dirty"></span></header><div id="run-progress" class="run-progress" hidden><span id="run-phase">Подготовка</span><progress id="run-bar"></progress><span id="run-value"></span></div><div class="notice" id="notice" role="status">Откройте IFC/SMDX в проекте и нажмите «Модели».</div><div class="workspace"><aside><div class="aside-title">Проверки</div><input id="test-search" type="search" placeholder="Поиск проверок"><div id="checks"></div><div class="aside-actions"><button id="all">Запустить все</button><button id="new" class="primary">＋ Новая проверка</button></div></aside><section class="main"><div id="content"></div></section></div><footer><span id="model-count">Модели не прочитаны</span><span>Расчёт выполняется на вашем компьютере</span></footer><input id="file" type="file" accept=".json" hidden><dialog id="settings-dialog"><h2>Настройки</h2><label>Дистанция камеры, м<input id="distance" type="number" value="15" min="0.5"></label><p class="links"><a href="https://nashepo.ru/" target="_blank" rel="noopener noreferrer">Сайт НашеПО</a><a href="https://t.me/RoburFan" target="_blank" rel="noopener noreferrer">Telegram</a></p><button data-close="settings-dialog">Закрыть</button></dialog><dialog id="help-dialog">${He}<button data-close="help-dialog">Закрыть</button></dialog><dialog id="set-dialog"><h2>Сохранить набор моделей</h2><label>Название<input id="set-name" maxlength="120"></label><div class="dialog-actions"><button id="set-cancel">Отмена</button><button id="set-confirm" class="primary">Сохранить</button></div></dialog></main>`;
  const Q = document.createElement("button");
  Q.id = "clear-project", Q.textContent = "Очистить проект", h("save").after(Q), i.querySelector(".more-popover").addEventListener(
    "click",
    () => i.querySelector(".more-menu").removeAttribute("open")
  );
  const z = (r, d = !1) => {
    h("notice").textContent = r, h("notice").classList.toggle("error", d);
  }, _ = (r, d, c, u) => {
    const g = h("run-progress"), v = h("run-bar");
    g.hidden = !1, h("run-phase").textContent = r, c && c > 0 && d !== void 0 ? (v.max = c, v.value = Math.min(d, c), h("run-value").textContent = `${Math.round(d / c * 100)}% · ${d}/${c}` + (u === void 0 ? "" : ` · найдено ${u}`)) : (v.removeAttribute("value"), h("run-value").textContent = u === void 0 ? "" : `Найдено ${u}`);
  }, k = () => {
    h("run-progress").hidden = !0;
  }, $ = async (r) => {
    try {
      await r();
    } catch (d) {
      z(d instanceof Error ? d.message : String(d), !0);
    }
  }, T = () => new Promise((r) => {
    const d = h("set-dialog"), c = h("set-name");
    let u = !1;
    const g = (v) => {
      u || (u = !0, d.close(), r(v));
    };
    c.value = "Новый набор", h("set-confirm").onclick = () => {
      const v = c.value.trim();
      v ? g(v) : c.focus();
    }, h("set-cancel").onclick = () => g(), d.oncancel = (v) => {
      v.preventDefault(), g();
    }, d.showModal(), c.focus(), c.select();
  }), q = () => {
    M = !0, h("dirty").textContent = "Есть несохранённые изменения", o && he.set(o, a), De(n, a);
  }, ae = () => {
    const r = e.projectToken();
    return !r || r === o ? !1 : (!o && (a.checks.length || a.sets.length) ? he.set(r, a) : a = he.get(r) || Ne(e.projectId()) || je(), he.set(r, a), o = r, n = e.projectId(), l = void 0, m = a.checks[0]?.id || "", p = "", j.clear(), x = 0, M = !1, e.clear(), h("dirty").textContent = "", !0);
  }, A = () => {
    const r = C();
    r?.lastRun && (r.status = "stale"), q(), B();
  }, ne = () => [
    ...new Set(
      (l?.elements || []).flatMap((r) => Object.keys(r.properties))
    )
  ].sort(), R = (r, d) => r.map(
    (c) => `<option value="${W(c)}" ${c === d ? "selected" : ""}>${W(c)}</option>`
  ).join("");
  function U() {
    const r = C(), d = h("result-search")?.value.toLowerCase() || "", c = h("result-state")?.value || "", u = Number(h("result-depth")?.value || 0);
    return (r?.results || []).filter(
      (g) => (!c || g.state === c) && (r?.type === "duplicates" || (g.penetrationMm ?? 0) >= u) && (!d || JSON.stringify({ ...g, image: void 0 }).toLowerCase().includes(d))
    );
  }
  function B() {
    const r = h("test-search").value.toLowerCase();
    h("checks").innerHTML = a.checks.filter((d) => d.name.toLowerCase().includes(r)).map(
      (d) => `<button class="check-item ${d.id === m ? "active" : ""}" data-check="${d.id}"><strong>${W(d.name)}</strong><small>${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[d.status]} · ${d.results.filter((c) => !["resolved", "excluded"].includes(c.state)).length} в работе / ${d.results.length}</small></button>`
    ).join("");
  }
  function se(r, d) {
    const c = l?.elements.filter(
      (I) => (C().includeHidden || !I.hidden) && we(I, r)
    ).length || 0, u = r.manualOnly ? H(r) : r.modelsMode === "selected" ? r.models : (l?.models || []).map((I) => I.id), g = l && u.every((I) => l.indexedModelIds.includes(I)) ? `${c} элементов` : "число после запуска", v = l?.models || [], b = r.modelsMode !== "selected", O = a.sets.map(
      (I) => `<option value="${W(I.id)}" ${r.presetId === I.id ? "selected" : ""}>${W(I.name)}</option>`
    ).join("");
    return `<article class="selection" data-side="${d}"><h3>Выбор ${d.toUpperCase()} <span data-selection-count>${g}</span></h3>${r.manualOnly ? '<p class="selection-mode">Только элементы, выбранные вручную</p>' : ""}<div class="preset-row"><select class="preset"><option value="">Набор моделей…</option>${O}</select><button data-selection="load-set">Применить</button><button data-selection="save-set">Сохранить набор</button><button data-selection="delete-set" ${r.presetId ? "" : "disabled"}>Удалить</button></div><div class="model-list"><label class="model-all"><input type="checkbox" class="all-models" ${b ? "checked" : ""}> Все модели</label>${v.map((I) => `<label><input type="checkbox" class="model-check" value="${W(I.id)}" ${b || r.models.includes(I.id) ? "checked" : ""}> ${W(I.name)}</label>`).join("") || "<small>Нажмите «Модели».</small>"}</div><small>Отметьте файлы, которые должны участвовать в выборе ${d.toUpperCase()}.</small><div class="selection-tools"><button data-selection="show">Показать выбранные элементы</button><button data-selection="only">Только выделенные в 3D</button><button data-selection="include">＋ Добавить из 3D</button><button data-selection="exclude">− Исключить из 3D</button><button data-selection="reset">Сбросить ручной выбор</button></div><small>Добавлено вручную: ${r.include.length} · исключено: ${r.exclude.length}</small></article>`;
  }
  function G() {
    B();
    const r = C();
    h("name").value = r?.name || "", h("check-summary").textContent = r ? `${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[r.status]} · ${r.results.filter((d) => !["resolved", "excluded"].includes(d.state)).length} в работе / ${r.results.length}` : "Проверка не выбрана";
    for (const d of ["name", "copy", "delete", "run"])
      h(d).disabled = !r || y;
    for (const d of i.querySelectorAll("[data-tab]"))
      d.classList.toggle("active", d.dataset.tab === f);
    if (!r) {
      h("content").innerHTML = '<div class="empty"><h2>Создайте первую проверку</h2><p>Обновите модели, затем выберите, какие элементы проверять друг с другом.</p></div>';
      return;
    }
    f === "select" && (h("content").innerHTML = `<div class="choose-layout"><div class="parameters"><h3>Параметры проверки</h3><label>Тип<select id="type"><option value="intersection" ${r.type === "intersection" ? "selected" : ""}>По пересечению</option><option value="duplicates" ${r.type === "duplicates" ? "selected" : ""}>Дублирование</option></select></label><label title="Числовая погрешность расчёта">Точность расчёта, мм<input id="precision" type="number" value="${r.precision}" min="0.001" max="100" step="0.1"></label><label title="Конфликты с меньшей оценкой глубины не попадут в результат">Минимальная глубина, мм<input id="min-penetration" type="number" value="${r.minPenetration}" min="0" max="100000" step="1" ${r.type === "duplicates" ? "disabled" : ""}></label><label class="check"><input id="touching" type="checkbox" ${r.touching ? "checked" : ""} ${r.type === "duplicates" ? "disabled" : ""}>Учитывать касания</label><small>Глубина — максимальное удаление точки поверхности, оказавшейся внутри второго замкнутого тела, до его ближайшей поверхности. Это не длина захода элемента вдоль оси.</small><p class="legend"><span class="part-a">● Выбор А</span><span class="part-b">● Выбор Б</span></p></div><div class="selection-grid">${se(r.a, "a")}${se(r.b, "b")}</div></div><datalist id="property-fields">${R(ne(), "")}</datalist>`), f === "rules" && (h("content").innerHTML = `<div class="rules"><h3>Исключение пар</h3><p>Элемент сам с собой не проверяется. Пара А/Б учитывается один раз.</p><label class="check"><input id="same-model" type="checkbox" ${r.ignoreSameModel ? "checked" : ""}>Не проверять элементы одной модели</label><label class="check"><input id="same-group" type="checkbox" ${r.ignoreSameGroup ? "checked" : ""}>Не проверять геометрию одного составного объекта</label><label>Не проверять пары с одинаковым значением свойства<input id="equal-property" list="property-fields" value="${W(r.equalProperty)}" placeholder="Без ограничения"></label><label class="check"><input id="hidden" type="checkbox" ${r.includeHidden ? "checked" : ""}>Включать скрытые элементы прочитанных моделей</label><p>Незагруженные подключённые файлы нужно открыть перед расчётом.</p><datalist id="property-fields">${R(ne(), "")}</datalist></div>`), f === "results" && (h("content").innerHTML = `<div class="result-tools"><div class="result-filters"><input id="result-search" type="search" placeholder="Поиск по результатам"><select id="result-state"><option value="">Все состояния</option>${Object.entries(
      pe
    ).map(([d, c]) => `<option value="${d}">${c}</option>`).join("")}</select>${r.type === "intersection" ? '<input id="result-depth" type="number" min="0" step="1" placeholder="Глубина от, мм">' : ""}<button id="show-markers" role="switch" aria-checked="${S}">${S ? "● Знаки" : "○ Знаки"}</button><span id="result-count"></span></div><div class="bulk-tools"><select id="bulk-state" title="Состояние для выбранных строк">${Object.entries(
      pe
    ).map(([d, c]) => `<option value="${d}">${c}</option>`).join("")}</select><button id="bulk">Применить</button></div></div><div class="result-area"><div class="table-area"><div class="scroll" id="table"></div><div class="pager"><span id="selection-count"></span><button id="prev-page">←</button><span id="page"></span><button id="next-page">→</button></div></div><div class="detail" id="detail"></div></div>`, Y(), V()), f === "report" && (h("content").innerHTML = `<div class="report"><h3>${W(r.name)}</h3><p>Результатов: ${r.results.length}. Выбрано: ${j.size}. ${r.status === "stale" ? "Результаты устарели — рекомендуется повторный запуск." : ""}</p><label class="check"><input id="selected-only" type="checkbox" ${j.size ? "checked" : ""}>Только выбранные строки</label><label class="check"><input id="report-images" type="checkbox" checked>Добавить снимки (недостающие будут созданы автоматически)</label><button id="export-html" class="primary">Сформировать HTML-отчёт</button><button id="export-viewer">Сессия для плагина «Коллизии»</button><p>Правила и все результаты сохраняются кнопкой «Сохранить проверки» в верхней панели.</p></div>`), h("content").inert = y;
  }
  function Y() {
    const r = C(), d = U(), c = Math.max(1, Math.ceil(d.length / 50));
    x = Math.max(0, Math.min(x, c - 1));
    const u = d.slice(x * 50, x * 50 + 50);
    h("table").innerHTML = d.length ? `<table><thead><tr><th><input id="check-page" type="checkbox" aria-label="Выбрать страницу" ${u.every((g) => j.has(g.id)) ? "checked" : ""}></th>${["№", "Состояние", "Глубина, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "Комментарий"].map((g) => `<th>${g}</th>`).join("")}</tr></thead><tbody>${u.map((g, v) => `<tr data-result="${W(g.id)}" class="${g.id === p ? "active" : ""}"><td><input type="checkbox" class="row-check" aria-label="Выбрать конфликт" ${j.has(g.id) ? "checked" : ""}></td>${[x * 50 + v + 1, pe[g.state], r.type === "duplicates" ? "—" : (g.penetrationMm ?? 0).toFixed(1), g.a.name, g.a.model, g.a.guid || "—", g.b.name, g.b.model, g.b.guid || "—", g.note].map((b) => `<td title="${W(b)}">${W(b)}</td>`).join("")}</tr>`).join("")}</tbody></table>` : '<div class="empty">Нет результатов. Запустите проверку или измените фильтры.</div>', h("page").textContent = `${x + 1} / ${c}`, h("result-count").textContent = `${d.length} результатов`, h("selection-count").textContent = `Выбрано: ${j.size}`, h("prev-page").disabled = x === 0, h("next-page").disabled = x === c - 1;
  }
  function V() {
    const r = C(), d = U(), c = d.findIndex((g) => g.id === p), u = r?.results.find((g) => g.id === p);
    h("detail").innerHTML = u ? `<div class="detail-head"><div><small>КОЛЛИЗИЯ</small><h3>#${c + 1} ${W(u.a.name)} × ${W(u.b.name)}</h3></div><div class="detail-nav"><button id="previous" title="Предыдущая коллизия" ${c <= 0 ? "disabled" : ""}>‹</button><button id="next" title="Следующая коллизия" ${c < 0 || c >= d.length - 1 ? "disabled" : ""}>›</button></div></div><div class="clash-summary"><span>${r?.type === "duplicates" ? "Дублирование" : "Пересечение"}</span><span title="Оценка максимальной глубины поверхности внутри второго тела; не длина захода вдоль оси">${r?.type === "duplicates" ? "Совпадение геометрии" : `Глубина ${(u.penetrationMm ?? 0).toFixed(1)} мм`}</span><span>${W(pe[u.state])}</span></div><p class="legend"><span class="part-a">● Элемент А</span><span class="part-b">● Элемент Б</span></p><div class="preview-slot">${u.image ? `<button id="open-image" class="preview"><img src="${W(u.image)}" alt="Снимок коллизии"><span>Открыть крупнее</span></button>` : '<div class="preview-empty"><span>◫</span><small>Снимок пары ещё не создан</small></div>'}</div><div class="detail-actions"><button id="focus" class="primary">Перейти в 3D</button><button id="capture-image">▣ Снимок пары</button></div><div class="detail-scroll"><div class="coordinates">${u.point.map((g, v) => `<span>${["X", "Y", "Z"][v]} ${g.toFixed(3)}</span>`).join("")}</div><label>Состояние<select id="edit-state">${Object.entries(
      pe
    ).map(
      ([g, v]) => `<option value="${g}" ${u.state === g ? "selected" : ""}>${v}</option>`
    ).join(
      ""
    )}</select></label><label>Назначение<input id="assignee" value="${W(u.assignee)}"></label><label>Комментарий<textarea id="note" rows="2">${W(u.note)}</textarea></label>${[
      u.a,
      u.b
    ].map(
      (g, v) => `<details><summary>Элемент ${v ? "Б" : "А"} · свойства</summary><dl>${Object.entries(
        g.properties
      ).map(([b, O]) => `<dt>${W(b)}</dt><dd>${W(O)}</dd>`).join("")}</dl></details>`
    ).join("")}</div>` : '<div class="detail-empty"><span>◫</span><p>Выберите коллизию в таблице</p><small>Двойной щелчок сразу перенесёт камеру в 3D.</small></div>';
  }
  const H = (r) => {
    const d = new Set(
      !r.manualOnly && r.modelsMode === "selected" ? r.models : []
    );
    for (const c of r.include)
      try {
        d.add(String(JSON.parse(c)[0]));
      } catch {
        const u = l?.elements.find(
          (g) => g.id === c
        )?.modelId;
        u && d.add(u);
      }
    return [...d];
  }, ie = () => {
    const r = C();
    if (!(!r || f !== "select"))
      for (const d of i.querySelectorAll("[data-side]")) {
        const c = d.dataset.side, u = [...d.querySelectorAll(".model-check")];
        if (!u.length) continue;
        const g = u.filter((O) => O.checked).map((O) => O.value), v = g.length === u.length, b = r[c];
        b.modelsMode = v ? "all" : "selected", b.models = v ? [] : g, b.conditions = [], b.mode = "all";
      }
  }, le = (r) => {
    if (!r?.length) return;
    const d = /* @__PURE__ */ new Set();
    for (const c of r)
      for (const u of [c.a, c.b]) {
        if (!u.manualOnly && u.modelsMode !== "selected") return;
        for (const g of H(u)) d.add(g);
      }
    return d;
  }, ee = () => {
    const r = C();
    if (r)
      for (const d of i.querySelectorAll("[data-side]")) {
        const c = d.dataset.side, u = l?.elements.filter(
          (O) => (r.includeHidden || !O.hidden) && we(O, r[c])
        ).length || 0, g = r[c].manualOnly ? H(r[c]) : r[c].modelsMode === "selected" ? r[c].models : (l?.models || []).map((O) => O.id), v = !!l && g.every((O) => l.indexedModelIds.includes(O)), b = d.querySelector(
          "[data-selection-count]"
        );
        b && (b.textContent = v ? `${u} элементов` : "число после запуска");
      }
  };
  function X() {
    e.markers(
      U(),
      p,
      S,
      (r) => $(() => F(r, !0))
    );
  }
  function F(r, d = !1) {
    if (!y) {
      if (p = r, f === "results") {
        const c = U().findIndex((g) => g.id === r), u = c < 0 ? x : Math.floor(c / 50);
        u !== x && (x = u, Y());
        for (const g of i.querySelectorAll("[data-result]"))
          g.classList.toggle("active", g.dataset.result === r);
        V(), requestAnimationFrame(() => {
          [...i.querySelectorAll("[data-result]")].find(
            (v) => v.dataset.result === r
          )?.scrollIntoView({ block: "nearest", inline: "nearest" });
        });
      }
      if (X(), d) {
        const c = C()?.results.find((u) => u.id === r);
        c && (c.image && c.imageScope === "pair-ab" ? e.focus(c, Number(h("distance").value)) : de(c));
      }
    }
  }
  async function de(r) {
    w = !1, N(!0), _("Создание снимка пары");
    try {
      r.image = await e.snapshot(
        r,
        Number(h("distance").value),
        () => w
      ), r.imageScope = "pair-ab", q(), f === "results" && p === r.id && V();
    } catch (d) {
      z(
        "Результаты сохранены. Снимок пары не создан: " + (d instanceof Error ? d.message : String(d)),
        !0
      );
    } finally {
      k(), N(!1);
    }
  }
  async function ce(r, d = !1) {
    ae();
    const c = d ? /* @__PURE__ */ new Set() : le(r);
    _("Подготовка моделей"), l = await e.scan(
      (u) => {
        z(u), _(u);
      },
      () => w,
      c
    ), h("model-count").textContent = `Проиндексировано моделей: ${l.indexedModelIds.length} из ${l.models.length} · элементов: ${l.elements.length}`, G(), z(
      l.blockers.length ? l.blockers.join(" ") : l.warnings.length ? `Модели прочитаны с замечаниями. ${l.warnings.join(" ")}` : "Модели прочитаны. Настройте выборки и запустите проверку.",
      !!l.blockers.length
    );
  }
  const N = (r) => {
    y = r;
    for (const d of [
      "new",
      "scan",
      "open",
      "all",
      "copy",
      "delete",
      "name",
      "run",
      "save",
      "clear-project"
    ])
      h(d).disabled = r;
    h("cancel").hidden = !r, h("content").inert = r, h("checks").inert = r;
  };
  async function oe(r) {
    const d = (u) => {
      const g = `${r.name} · ${u.phase}`;
      z(`${g} ${u.done}/${u.total} · найдено ${u.found}`), _(g, u.done, u.total, u.found);
    };
    let c;
    try {
      c = new ct();
    } catch {
      return dt(
        l.elements,
        r,
        d,
        () => w,
        (u) => e.geometry(u, () => w)
      );
    }
    return E = c, new Promise((u, g) => {
      const v = () => {
        c.terminate(), E = void 0, L = void 0;
      };
      L = () => {
        v(), g(Error("Расчёт отменён. Предыдущие результаты сохранены."));
      }, c.onmessage = async (b) => {
        if (b.data.load) {
          try {
            const O = await e.geometry(
              b.data.load,
              () => w || E !== c
            );
            if (E !== c) return;
            const I = [
              O.vertices?.buffer,
              O.indices?.buffer
            ].filter(Boolean);
            c.postMessage(
              { request: b.data.request, geometry: O },
              I
            );
          } catch (O) {
            E === c && c.postMessage({
              request: b.data.request,
              error: O instanceof Error ? O.message : String(O)
            });
          }
          return;
        }
        b.data.progress ? d(b.data.progress) : (v(), b.data.error ? g(Error(b.data.error)) : u(b.data.results));
      }, c.onerror = (b) => {
        v(), g(
          Error(
            `Не удалось запустить расчёт в фоновом потоке: ${b.message || "ошибка загрузки"}`
          )
        );
      }, c.postMessage({
        elements: l.elements,
        streaming: typeof e.geometry == "function",
        check: structuredClone({ ...r, results: [], warnings: [] })
      });
    });
  }
  async function te(r = !1) {
    if (y) return;
    ae(), ie();
    const d = r ? [...a.checks] : [C()].filter(Boolean);
    if (!d.length) throw Error("Создайте проверку.");
    for (const c of d)
      for (const u of [c.a, c.b])
        u.conditions = [], u.mode = "all";
    w = !1, N(!0), _("Подготовка моделей");
    try {
      if (await ce(d), N(!0), l.blockers.length)
        throw Error(
          "Состав моделей прочитан не полностью. " + l.blockers.join(" ")
        );
      for (const u of d) {
        if (w) break;
        for (const O of [u.a, u.b]) {
          if (O.modelsMode === "selected" && O.models.some((I) => !l.models.some((P) => P.id === I)))
            throw Error(
              `${u.name}: одна из моделей выборки отсутствует. Исправьте выборку.`
            );
          if (O.include.some((I) => !l.elements.some((P) => P.id === I)))
            throw Error(
              `${u.name}: вручную добавленный элемент отсутствует в модели.`
            );
        }
        const g = et(u);
        if (u.configAtRun === g && u.modelsAtRun?.some(
          (O) => !l.models.some((I) => I.id === O)
        ))
          throw Error(
            `${u.name}: состав моделей уменьшился. Подключите прежние модели или создайте копию проверки для нового состава. Прежние результаты сохранены.`
          );
        const v = await oe(u);
        if (w || !e.isCurrent())
          throw Error(
            "Проект изменился или расчёт отменён. Предыдущие результаты сохранены."
          );
        const b = (/* @__PURE__ */ new Date()).toISOString();
        u.results = it(
          u.configAtRun === g ? u.results : [],
          v,
          b
        ), u.lastRun = b, u.fingerprint = l.fingerprint, u.configAtRun = g, u.modelsAtRun = [...l.indexedModelIds], u.status = "done", u.warnings = [...l.warnings], m = u.id, p = u.results[0]?.id || "", j.clear(), q();
      }
      f = "results", G(), X(), z(
        `Проверка завершена. ${C()?.results.length || 0} результатов. Сохраните проверки для продолжения работы.`
      );
      const c = C()?.results.find((u) => u.id === p);
      c && !w && await de(c);
    } finally {
      k(), N(!1), G();
    }
  }
  function fe(r) {
    const d = r.closest("[data-side]")?.dataset.side;
    if (!d) return;
    const c = C()[d], u = r, g = r.closest("[data-side]");
    if (u.classList.contains("preset")) {
      c.presetId = u.value || void 0, g.querySelector(
        '[data-selection="delete-set"]'
      ).disabled = !c.presetId;
      return;
    }
    if (u.classList.contains("all-models")) {
      for (const v of g.querySelectorAll(
        ".model-check"
      ))
        v.checked = u.checked;
      c.modelsMode = u.checked ? "all" : "selected", c.models = [], c.manualOnly = !1, c.presetId = void 0;
    }
    if (u.classList.contains("model-check")) {
      const v = [
        ...g.querySelectorAll(".model-check")
      ], b = v.filter((I) => I.checked).map((I) => I.value), O = v.length > 0 && b.length === v.length;
      g.querySelector(".all-models").checked = O, c.modelsMode = O ? "all" : "selected", c.models = O ? [] : b, c.manualOnly = !1, c.presetId = void 0;
    }
    c.conditions = [], c.mode = "all", A(), ee();
  }
  h("new").onclick = () => {
    const r = _e();
    r.name = `Проверка ${a.checks.length + 1}`, a.checks.push(r), m = r.id, f = "select", p = "", j.clear(), q(), G();
  }, h("scan").onclick = () => $(async () => {
    ie(), w = !1, N(!0), _("Чтение моделей");
    try {
      const r = C();
      await ce(r ? [r] : void 0, !r);
    } finally {
      k(), N(!1), G();
    }
  }), h("run").onclick = () => $(() => te()), h("all").onclick = () => $(() => te(!0)), h("cancel").onclick = () => {
    w = !0, L?.();
  }, h("test-search").oninput = B, h("checks").onclick = (r) => {
    const d = r.target.closest(
      "[data-check]"
    );
    d && !y && (e.clear(), m = d.dataset.check, p = "", j.clear(), x = 0, G());
  }, h("tabs").onclick = (r) => {
    const d = r.target.closest("[data-tab]");
    d && !y && (f = d.dataset.tab, G());
  }, h("name").onchange = () => {
    const r = C();
    r && (r.name = h("name").value.trim() || "Проверка", q(), B());
  }, h("copy").onclick = () => {
    const r = C();
    if (!r) return;
    const d = structuredClone(r);
    Object.assign(d, {
      id: crypto.randomUUID(),
      name: r.name + " — копия",
      results: [],
      lastRun: void 0,
      fingerprint: void 0,
      configAtRun: void 0,
      status: "new"
    }), a.checks.push(d), m = d.id, p = "", j.clear(), q(), G();
  }, h("delete").onclick = () => {
    C() && confirm(`Удалить проверку «${C().name}» и её результаты?`) && (a.checks = a.checks.filter((r) => r.id !== m), m = a.checks[0]?.id || "", j.clear(), e.clear(), q(), G());
  }, h("clear-project").onclick = () => {
    !a.checks.length && !a.sets.length || confirm(
      "Очистить проверки, наборы моделей и результаты текущего проекта?"
    ) && (a.checks = [], a.sets = [], l = void 0, m = "", p = "", j.clear(), e.clear(), q(), h("model-count").textContent = "Модели не прочитаны", G(), z("Данные проверок текущего проекта очищены."));
  }, h("save").onclick = () => {
    Le("НашеПО-проверки.json", JSON.stringify(a, null, 2)), M = !1, h("dirty").textContent = "Файл проверок сохранён";
  }, h("open").onclick = () => h("file").click(), h("file").onchange = () => $(async () => {
    const r = h("file").files?.[0];
    if (!r) return;
    const d = Ye(await r.text());
    M && !confirm("Заменить текущие несохранённые проверки данными из файла?") || (a = d, o && he.set(o, a), De(n, a), m = a.checks[0]?.id || "", p = "", j.clear(), e.clear(), M = !1, h("dirty").textContent = "Проверки открыты", G(), z("Проверки открыты. Обновите модели перед переходом к элементам."), h("file").value = "");
  });
  for (const r of ["settings", "help"])
    h(r).onclick = () => h(r + "-dialog").showModal();
  for (const r of i.querySelectorAll("[data-close]"))
    r.onclick = () => h(r.dataset.close).close();
  h("content").onchange = (r) => $(() => {
    const d = r.target, c = C();
    if (!c) return;
    if (d.closest("[data-side]")) {
      fe(d);
      return;
    }
    if ([
      "type",
      "precision",
      "min-penetration",
      "touching",
      "same-model",
      "same-group",
      "hidden",
      "equal-property"
    ].includes(d.id)) {
      if (d.id === "precision") {
        const g = Number(d.value);
        if (!Number.isFinite(g) || g < 1e-3 || g > 100)
          throw d.value = String(c.precision), Error("Точность должна быть от 0,001 до 100 мм.");
        c.precision = g;
      }
      if (d.id === "min-penetration") {
        const g = Number(d.value);
        if (!Number.isFinite(g) || g < 0 || g > 1e5)
          throw d.value = String(c.minPenetration), Error(
            "Минимальная глубина должна быть от 0 до 100 000 мм."
          );
        c.minPenetration = g;
      }
      d.id === "type" && (c.type = d.value), d.id === "touching" && (c.touching = d.checked), d.id === "same-model" && (c.ignoreSameModel = d.checked), d.id === "same-group" && (c.ignoreSameGroup = d.checked), d.id === "hidden" && (c.includeHidden = d.checked), d.id === "equal-property" && (c.equalProperty = d.value), A(), G();
      return;
    }
    if (d.id === "result-state") {
      x = 0, Y();
      return;
    }
    if (d.id === "check-page") {
      for (const g of U().slice(x * 50, x * 50 + 50))
        d.checked ? j.add(g.id) : j.delete(g.id);
      Y();
      return;
    }
    if (d.classList.contains("row-check")) {
      const g = d.closest("[data-result]").dataset.result;
      d.checked ? j.add(g) : j.delete(g), h("selection-count").textContent = `Выбрано: ${j.size}`;
      return;
    }
    const u = c.results.find((g) => g.id === p);
    u && (d.id === "edit-state" && (u.state = d.value, Y(), B(), X()), d.id === "assignee" && (u.assignee = d.value), d.id === "note" && (u.note = d.value, Y()), q());
  }), h("content").oninput = (r) => {
    const d = r.target;
    (d.id === "result-search" || d.id === "result-depth") && (x = 0, Y());
    const c = C(), u = Number(d.value);
    c && d.id === "precision" && Number.isFinite(u) && u >= 1e-3 && u <= 100 && (c.precision = u, A()), c && d.id === "min-penetration" && Number.isFinite(u) && u >= 0 && u <= 1e5 && (c.minPenetration = u, A());
  }, h("content").onclick = (r) => $(async () => {
    const d = r.target, c = d.closest("button"), u = C();
    if (!u) return;
    if (c?.dataset.selection) {
      const v = c.closest("[data-side]").dataset.side, b = u[v], O = h("content").scrollTop;
      let I = !0;
      switch (c.dataset.selection) {
        case "load-set": {
          const P = a.sets.find((Z) => Z.id === b.presetId);
          if (!P) throw Error("Выберите сохранённый набор моделей.");
          Object.assign(b, structuredClone(P.selection), {
            conditions: [],
            mode: "all",
            include: [],
            exclude: [],
            manualOnly: !1,
            presetId: P.id
          });
          break;
        }
        case "save-set": {
          if (b.manualOnly)
            throw Error(
              "Ручную выборку элементов нельзя сохранить как набор моделей."
            );
          const P = await T();
          if (!P) return;
          const Z = {
            id: crypto.randomUUID(),
            name: P,
            selection: {
              models: [...b.models],
              modelsMode: b.modelsMode,
              conditions: [],
              mode: "all"
            }
          };
          a.sets.push(Z), b.presetId = Z.id, I = !1;
          break;
        }
        case "delete-set": {
          const P = a.sets.find((Z) => Z.id === b.presetId);
          if (!P) throw Error("Выберите сохранённый набор моделей.");
          if (!confirm(`Удалить набор «${P.name}»?`)) return;
          a.sets = a.sets.filter((Z) => Z.id !== P.id);
          for (const Z of a.checks)
            for (const re of [Z.a, Z.b])
              re.presetId === P.id && (re.presetId = void 0);
          I = !1;
          break;
        }
        case "show":
          e.select(
            (l?.elements || []).filter((P) => (u.includeHidden || !P.hidden) && we(P, b)).map((P) => P.id)
          );
          return;
        case "only": {
          const P = e.selected();
          if (!P.length) throw Error("Выделите элементы в 3D-сцене.");
          b.include = P, b.exclude = [], b.manualOnly = !0;
          break;
        }
        case "include": {
          const P = e.selected();
          if (!P.length) throw Error("Выделите элементы в 3D-сцене.");
          b.include = [.../* @__PURE__ */ new Set([...b.include, ...P])], b.exclude = b.exclude.filter((Z) => !P.includes(Z));
          break;
        }
        case "exclude": {
          const P = e.selected();
          if (!P.length) throw Error("Выделите элементы в 3D-сцене.");
          b.exclude = [.../* @__PURE__ */ new Set([...b.exclude, ...P])], b.include = b.include.filter((Z) => !P.includes(Z));
          break;
        }
        case "reset":
          b.manualOnly = !1, b.include = [], b.exclude = [];
      }
      I ? A() : q(), G(), h("content").scrollTop = O;
      return;
    }
    if (c?.id === "prev-page" && (x--, Y()), c?.id === "next-page" && (x++, Y()), c?.id === "show-markers" && (S = !S, c.textContent = S ? "● Знаки включены" : "○ Знаки выключены", c.setAttribute("aria-checked", String(S)), X()), c?.id === "bulk") {
      const v = h("bulk-state").value;
      for (const b of u.results) j.has(b.id) && (b.state = v);
      q(), Y(), V(), B(), X();
    }
    if (c?.id === "capture-image") {
      const v = u.results.find((b) => b.id === p);
      if (v) {
        w = !1, N(!0), _("Создание снимка пары");
        try {
          v.image = await e.snapshot(
            v,
            Number(h("distance").value),
            () => w,
            !0
          ), v.imageScope = "pair-ab", q(), V(), z("Снимок сохранён в результат.");
        } finally {
          k(), N(!1);
        }
      }
      return;
    }
    if (c?.id === "open-image") {
      const v = u.results.find((b) => b.id === p);
      if (v?.image) {
        const b = document.createElement("dialog");
        b.className = "image-dialog", b.innerHTML = '<button>Закрыть</button><img alt="Снимок коллизии">', b.querySelector("img").src = v.image, b.querySelector("button").onclick = () => {
          b.close(), b.remove();
        }, i.append(b), b.showModal();
      }
      return;
    }
    if (c?.id === "focus" && F(p, !0), c?.id === "previous" || c?.id === "next") {
      const v = U(), b = v.findIndex((O) => O.id === p) + (c.id === "next" ? 1 : -1);
      v[b] && F(v[b].id, !0);
    }
    if (c?.id === "export-html" || c?.id === "export-viewer") {
      let v = 0;
      const b = h("selected-only").checked ? u.results.filter((I) => j.has(I.id)) : u.results;
      if (!b.length) throw Error("Нет результатов для отчёта.");
      if (h("report-images").checked) {
        const I = e.view, P = I?.storeView();
        w = !1, N(!0), _("Подготовка снимков отчёта", 0, b.length);
        try {
          await e.captureWorkspace(async () => {
            let Z = 0;
            for (const re of b) {
              if (w)
                throw Error(
                  "Подготовка отчёта отменена. Уже полученные снимки сохранены."
                );
              if (_(
                "Подготовка снимков отчёта",
                Z,
                b.length
              ), z("Подготовка снимков: " + (Z + 1) + " / " + b.length), !re.image || re.imageScope !== "pair-ab") {
                if (re.state === "resolved" && !e.canLocate(re)) {
                  Z++;
                  continue;
                }
                try {
                  re.image = await e.snapshot(
                    re,
                    Number(h("distance").value),
                    () => w
                  ), re.imageScope = "pair-ab", q();
                } catch (Te) {
                  if (w || !e.isCurrent()) throw Te;
                  v++;
                }
              }
              Z++, _("Подготовка снимков отчёта", Z, b.length);
            }
          });
        } finally {
          if (I && e.isCurrent()) {
            const Z = u.results.find((re) => re.id === p);
            if (Z)
              try {
                e.focus(
                  Z,
                  Number(h("distance").value),
                  !1
                );
              } catch {
              }
            P && I.restoreView(P);
          }
          k(), N(!1);
        }
      }
      const O = h("report-images").checked ? b.map(
        (I) => I.imageScope === "pair-ab" ? I : { ...I, image: void 0 }
      ) : b.map((I) => ({ ...I, image: void 0 }));
      Le(
        u.name + (c.id === "export-html" ? ".html" : ".collision360.json"),
        c.id === "export-html" ? pt(u, O) : ut(u, O)
      ), z(
        "Отчёт подготовлен. Результатов: " + b.length + "; со снимками: " + O.filter((I) => I.image).length + "." + (v ? ` Не удалось создать снимков: ${v}; эти строки включены без изображения.` : ""),
        v > 0
      );
    }
    const g = d.closest("[data-result]");
    g && !d.closest("input") && !window.getSelection()?.toString() && F(g.dataset.result);
  }), h("content").ondblclick = (r) => {
    const d = r.target, c = d.closest("[data-result]");
    c && !d.closest("input") && $(() => F(c.dataset.result, !0));
  };
  const Je = setInterval(() => {
    y || (ae() ? (h("model-count").textContent = "Модели не прочитаны", z(
      a.checks.length ? "Открыт другой проект. Показаны его проверки; обновите модели." : "Открыт другой проект. Для него ещё нет проверок."
    ), y || G()) : l && !e.isCurrent() && (l = void 0, e.clear(), h("model-count").textContent = "3D-окно изменилось", z("Активное 3D-окно изменилось. Обновите модели."), y || G()));
  }, 1500);
  return G(), () => {
    s(), clearInterval(Je), w = !0, L?.(), E?.terminate(), e.clear();
  };
}
var Oe = /* @__PURE__ */ ((t) => (t.object = "object", t.drawing = "drawing", t.table = "table", t.record = "record", t.textStyle = "textstyle", t.textStyleTable = "textstyles", t.linetype = "linetype", t.linetypeTable = "linetypes", t.layer = "layer", t.layerTable = "layers", t.block = "block", t.blockTable = "blocks", t.layout = "layout", t.layoutTable = "layouts", t.type = "type", t.typeTable = "types", t.material = "material", t.materialTable = "materials", t.geometry = "geometry", t.geometryTable = "geometries", t.group = "group", t.groupTable = "groups", t.attachment = "attachment", t.attachmentTable = "attachments", t.entities = "entities", t.entity = "entity", t.line = "l", t.solid = "s", t.insert = "i", t.polyline = "p", t.circle = "c", t.arc = "a", t.polyline3d = "p3", t.proxy = "x", t.text = "t", t.mtext = "mt", t.wipeout = "w", t.model3d = "g", t.alignment = "al", t))(Oe || {});
async function gt(t, e) {
  if (await new Promise((f) => requestAnimationFrame(() => f())), e()) throw Error("Подготовка снимков отменена.");
  const { width: i, height: s } = t.camera, o = Array.from(document.querySelectorAll("canvas")).filter(
    (f) => {
      const p = f.getBoundingClientRect();
      return p.width > 100 && p.height > 100 && f.width > 0 && f.height > 0 && getComputedStyle(f).visibility !== "hidden" && (Math.abs(p.width - i) < 4 && Math.abs(p.height - s) < 4 || Math.abs(f.width - i) < 4 && Math.abs(f.height - s) < 4);
    }
  );
  if (!o.length)
    throw Error(
      "Снимок 3D-окна недоступен: откройте одно видимое окно модели."
    );
  const n = o[0].getBoundingClientRect();
  if (o.some((f) => {
    const p = f.getBoundingClientRect();
    return Math.abs(p.x - n.x) > 4 || Math.abs(p.y - n.y) > 4;
  }))
    throw Error(
      "Открыто несколько подходящих 3D-окон. Оставьте одно окно для снимка."
    );
  const a = document.createElement("canvas"), l = Math.min(1, 1280 / o[0].width);
  a.width = Math.round(o[0].width * l), a.height = Math.round(o[0].height * l);
  const m = a.getContext("2d");
  m.fillStyle = "#20242b", m.fillRect(0, 0, a.width, a.height), t.repaint();
  for (const f of o)
    m.drawImage(f, 0, 0, a.width, a.height);
  try {
    return a.toDataURL("image/jpeg", 0.82);
  } catch {
    throw Error("Браузер запретил чтение изображения 3D-окна.");
  }
}
const Ie = "nashepo.checks.points", Re = "nashepo.checks.highlight";
function Ue(t) {
  let e = performance.now();
  return async () => {
    if (t()) throw Error("Операция отменена.");
    performance.now() - e >= 16 && (await new Promise((i) => setTimeout(i, 0)), e = performance.now());
  };
}
function Me(t, e, i, s = 0) {
  if (s > 12 || t == null) return;
  if (typeof t != "object") {
    i[e] = String(t);
    return;
  }
  if (Array.isArray(t)) {
    t.forEach((n, a) => Me(n, `${e}[${a}]`, i, s + 1));
    return;
  }
  const o = t;
  if ("$value" in o) {
    Me(o.$value, e, i, s + 1);
    return;
  }
  for (const [n, a] of Object.entries(o))
    n.startsWith("$") || Me(a, e ? `${e}.${n}` : n, i, s + 1);
}
function bt(t) {
  const e = t.vertices.length / 3, i = (a) => Number.isFinite(t.vertices[a * 3]) && Number.isFinite(t.vertices[a * 3 + 1]) && Number.isFinite(t.vertices[a * 3 + 2]), s = (a) => {
    const l = t.indices[a], m = t.indices[a + 1], f = t.indices[a + 2];
    return l < e && m < e && f < e && l !== m && m !== f && f !== l && i(l) && i(m) && i(f);
  };
  let o = 0;
  for (let a = 0; a < t.indices.length; a += 3) s(a) && (o += 3);
  if (o === t.indices.length) return t.indices;
  const n = new Uint32Array(o);
  for (let a = 0, l = 0; a < t.indices.length; a += 3)
    s(a) && (n[l++] = t.indices[a], n[l++] = t.indices[a + 1], n[l++] = t.indices[a + 2]);
  return n;
}
const Fe = (t) => /\.wdx(?:[?#].*)?$/i.test(t);
class xt {
  constructor(e) {
    this.ctx = e;
  }
  ctx;
  metadata = /* @__PURE__ */ new Map();
  refs = /* @__PURE__ */ new Map();
  overlay;
  overlayError;
  pointView;
  scannedApp;
  scannedView;
  captureDepth = 0;
  captureLayout;
  get view() {
    return this.ctx.manager.activeWindow?.context;
  }
  get app() {
    return this.ctx.manager.activeApp;
  }
  isCurrent() {
    return this.scannedApp === this.app && this.scannedView === this.view;
  }
  canLocate(e) {
    return this.isCurrent() && this.refs.has(e.a.id) && this.refs.has(e.b.id);
  }
  projectToken() {
    return this.app;
  }
  projectId() {
    return this.app?.id;
  }
  async captureWorkspace(e) {
    const i = this.captureDepth++ === 0;
    if (i) {
      const s = this.ctx.manager.panelBar;
      s?.visible && (this.captureLayout = {
        panel: s,
        size: s.size,
        maximized: s.maximized
      }, s.maximized = !1, s.size = Math.min(s.size, 120), await new Promise(
        (o) => requestAnimationFrame(() => requestAnimationFrame(() => o()))
      ));
    }
    try {
      return await e();
    } finally {
      if (this.captureDepth--, i && this.captureLayout) {
        const { panel: s, size: o, maximized: n } = this.captureLayout;
        this.captureLayout = void 0, s.size = o, s.maximized = n, await new Promise(
          (a) => requestAnimationFrame(() => requestAnimationFrame(() => a()))
        );
      }
    }
  }
  async scan(e, i, s) {
    const o = this.app, n = this.view, a = o?.model;
    if (!n || !a?.layouts || !a.attachments)
      throw Error(
        "Откройте проект Топоматик 360 с IFC или SMDX и сделайте его 3D-окно активным."
      );
    const l = [], m = [], f = [], p = [], x = /* @__PURE__ */ new Map(), y = /* @__PURE__ */ new Set();
    let w = 2166136261;
    const E = Ue(
      () => i() || o !== this.app || n !== this.view
    );
    let S = -1 / 0;
    const M = (L) => {
      for (let C = 0; C < L.length; C++)
        w = Math.imul(w ^ L.charCodeAt(C), 16777619);
    }, j = async (L, C, h) => {
      if (y.has(L)) return;
      y.add(L);
      const Q = L.layers.layer0?.modelName || C, z = C, _ = Fe(Q) || Fe(z);
      _ || l.push({ id: z, name: Q });
      const k = !_ && (!s || s.has(z)), $ = [];
      k && L.layouts.model?.walk((A) => (A.type === Oe.model3d ? $.push(A) : A.type === Oe.insert && m.push(`${Q}: вставка блока не включена в расчёт.`), !1));
      const T = /* @__PURE__ */ new Map();
      for (const A of $) {
        const ne = JSON.stringify([
          A.layer?.UUID || "",
          A.$id || A.$path
        ]);
        T.set(ne, [A]);
      }
      let q = 0;
      for (const [A, ne] of T) {
        if (i()) throw Error("Чтение моделей отменено.");
        if (o !== this.app || n !== this.view)
          throw Error(
            "Активный проект изменился. Запустите чтение моделей заново."
          );
        const R = ne[0].layer, U = {};
        try {
          if (R) {
            const ee = [];
            let X = R;
            for (; X && ee.length < 64; )
              ee.unshift(X), X = X.layer;
            for (const F of ee)
              Me(F.typedProperties(), "", U), F.typed?.name && (U.Тип = F.typed.name);
          }
        } catch {
          m.push(`${Q} / ${A}: часть свойств недоступна.`);
        }
        const B = U["ifc.id"] || Object.entries(U).find(
          ([ee]) => /(^|\.)(globalid|ifcguid|guid)$/i.test(ee)
        )?.[1] || "", se = R?.name || ne[0].$id || "Элемент", G = JSON.stringify([z, A]);
        Object.assign(U, {
          Модель: Q,
          Имя: se,
          GUID: B,
          Объект: R?.UUID || A
        });
        const Y = {
          min: [1 / 0, 1 / 0, 1 / 0],
          max: [-1 / 0, -1 / 0, -1 / 0]
        };
        let V = !0, H = !1, ie = 0;
        for (const ee of ne) {
          V &&= ee.isClosed;
          for (const X of Object.values(ee.meshes)) {
            const F = X.geometry;
            if (!F || F.indices.length % 3) {
              H = !0;
              continue;
            }
            V &&= X.isClosed;
            for (let N = 0; N < F.vertices.length; N += 3) {
              const oe = [
                F.vertices[N],
                F.vertices[N + 1],
                F.vertices[N + 2]
              ];
              if (Math3d.mat4.mulv3(oe, ee.matrix, oe), !oe.every(Number.isFinite)) {
                H = !0;
                continue;
              }
              for (let te = 0; te < 3; te++)
                Y.min[te] = Math.min(Y.min[te], oe[te]), Y.max[te] = Math.max(Y.max[te], oe[te]);
              if (M(oe.join(",")), N % 6e4 === 0 && (performance.now() - S > 200 && (S = performance.now(), e(
                "Индексирование: " + Q + " · " + p.length + " элементов"
              )), await E(), i()))
                throw Error("Чтение моделей отменено.");
            }
            const de = F.vertices.length / 3, ce = (N) => Number.isFinite(F.vertices[N * 3]) && Number.isFinite(F.vertices[N * 3 + 1]) && Number.isFinite(F.vertices[N * 3 + 2]);
            for (let N = 0; N < F.indices.length; N += 3) {
              const oe = F.indices[N], te = F.indices[N + 1], fe = F.indices[N + 2];
              if (w = Math.imul(w ^ oe, 16777619), w = Math.imul(w ^ te, 16777619), w = Math.imul(w ^ fe, 16777619), oe < de && te < de && fe < de && oe !== te && te !== fe && fe !== oe && ce(oe) && ce(te) && ce(fe) ? ie++ : H = !0, N % 15e4 === 0 && (await E(), i()))
                throw Error("Чтение моделей отменено.");
            }
          }
        }
        if (H || !ie) {
          if (ie || q++, !ie) continue;
          V = !1;
        }
        const le = {
          id: G,
          name: se,
          model: Q,
          modelId: z,
          guid: B,
          properties: U,
          hidden: h || !!R?.resolveHidden() || !!R?.resolveDisabled(),
          triangles: new Float64Array(0),
          triangleCount: ie,
          closed: V,
          bounds: Y
        };
        M(JSON.stringify([G, U, le.hidden])), p.push(le), x.set(G, ne);
      }
      q && m.push(
        `${Q}: пропущено элементов без треугольной геометрии — ${q}.`
      );
      const ae = [];
      L.attachments.forEach((A) => {
        ae.push(A);
      });
      for (const A of ae) {
        const ne = `${C}/${A.name || A.uri || A.$id}`;
        A.model ? await j(
          A.model,
          ne,
          h || A.hidden
        ) : (!s || s.has(ne)) && f.push(
          `${A.name || A.uri || "Подключённая модель"}: модель не загружена. Откройте её перед расчётом.`
        );
      }
    };
    if (await j(a, a.layers.layer0?.modelName || "Проект", !1), !p.length && (!s || s.size > 0))
      throw Error(
        "В открытом проекте не найдены 3D-элементы с доступной геометрией."
      );
    return this.clear(), this.refs = x, this.metadata = new Map(p.map((L) => [L.id, L])), this.scannedApp = o, this.scannedView = n, {
      elements: p,
      fingerprint: `${p.length}:${w >>> 0}`,
      warnings: [...new Set(m)],
      blockers: [...new Set(f)],
      models: l,
      indexedModelIds: l.filter((L) => !s || s.has(L.id)).map((L) => L.id)
    };
  }
  async geometry(e, i) {
    const s = Ue(() => i() || !this.isCurrent());
    if (!this.isCurrent()) throw Error("Активная модель изменилась.");
    const o = this.metadata.get(e), n = this.refs.get(e);
    if (!o || !n) throw Error("Элемент отсутствует.");
    const a = n.flatMap(
      (w) => Object.values(w.meshes).flatMap((E) => {
        const S = E.geometry;
        if (!S || S.indices.length % 3) return [];
        const M = bt(S);
        return M.length ? [{ object: w, g: S, indices: M }] : [];
      })
    );
    let l = 0, m = 0;
    for (const { g: w, indices: E } of a) {
      if (!w) throw Error("Геометрия недоступна.");
      l += w.vertices.length, m += E.length;
    }
    const f = new Float64Array(l), p = new Uint32Array(m);
    let x = 0, y = 0;
    for (const { object: w, g: E, indices: S } of a) {
      if (!E) throw Error("Геометрия недоступна.");
      for (let M = 0; M < E.vertices.length; M += 3) {
        const j = [E.vertices[M], E.vertices[M + 1], E.vertices[M + 2]];
        if (Math3d.mat4.mulv3(j, w.matrix, j), f.set(j, x + M), M % 6e4 === 0 && (await s(), i() || !this.isCurrent()))
          throw Error("Чтение геометрии отменено.");
      }
      for (let M = 0; M < S.length; M++)
        if (p[y + M] = x / 3 + S[M], M % 15e4 === 0 && (await s(), i()))
          throw Error("Чтение геометрии отменено.");
      x += E.vertices.length, y += S.length;
    }
    return { ...o, vertices: f, indices: p };
  }
  selected() {
    if (!this.isCurrent())
      throw Error("Сначала обновите модели текущего проекта.");
    const e = new Set(this.view?.layer.selectedObjects());
    return [...this.refs].filter(([, i]) => i.some((s) => e.has(s))).map(([i]) => i);
  }
  select(e) {
    if (!this.isCurrent())
      throw Error("Сначала обновите модели текущего проекта.");
    const i = new Set(e.flatMap((s) => this.refs.get(s) || []));
    this.view.layer.clearSelected(), this.view.layer.selectObjects((s) => i.has(s), !0), this.view.invalidate();
  }
  clear() {
    if (this.overlay && (this.overlay.view.layer.removeLayer(this.overlay.layer), this.overlay.view.invalidate(), this.overlay = void 0), this.pointView) {
      const e = this.pointView.annotations.get(Ie);
      e && this.pointView.annotations.release(e), this.pointView.invalidate(), this.pointView = void 0;
    }
  }
  focus(e, i, s = !0) {
    if (!this.isCurrent())
      throw Error("Обновите модели текущего проекта перед переходом.");
    if (!Number.isFinite(i) || i < 0.5)
      throw Error("Дистанция камеры должна быть не менее 0,5 м.");
    if (!this.refs.has(e.a.id) || !this.refs.has(e.b.id))
      throw Error("Один из элементов отсутствует в загруженных моделях.");
    this.select([e.a.id, e.b.id]), this.highlight(e);
    const o = e.point, n = this.view;
    n.camera?.id !== "3d" && n.setCameraType("3d");
    const a = [-0.65, 0.65, -0.394], l = Math.hypot(...a);
    a.forEach((m, f) => a[f] = m / l), n.lookAt(
      o.map((m, f) => m - a[f] * i),
      a,
      [0, 0, 1],
      s,
      o
    );
  }
  highlight(e) {
    this.overlayError = void 0, this.overlay && (this.overlay.view.layer.removeLayer(this.overlay.layer), this.overlay = void 0);
    const i = this.view, o = [
      { id: e.a.id, color: 4281743103 },
      { id: e.b.id, color: 915144703 }
    ].flatMap(
      ({ id: l, color: m }, f) => [...new Set(this.refs.get(l) || [])].flatMap(
        (p) => Object.values(p.meshes).flatMap((x) => {
          const y = x.geometry;
          if (!y) return [];
          const w = {
            // SDK fields may be prototype getters rather than own properties.
            uuid: `${Re}.${f}.${y.uuid}`,
            vertices: y.vertices,
            indices: y.indices,
            normals: y.normals,
            bounds: y.bounds,
            colors: new Uint32Array(y.vertices.length / 3).fill(m)
          };
          return [{ obj: p, geometry: w, color: m }];
        })
      )
    ), a = {
      id: Re,
      order: 1e4,
      visible: !0,
      paint: () => {
      },
      paint3d: (l) => {
        const m = l.color, f = l.rasterizer.material;
        l.rasterizer.material = void 0;
        try {
          for (const { obj: p, geometry: x, color: y } of o) {
            l.color = y, l.pushMatrix();
            try {
              l.multMatrix(p.matrix), l.mesh(x);
            } finally {
              l.popMatrix();
            }
          }
        } catch (p) {
          a.visible = !1, this.overlayError = new Error(
            "Не удалось отрисовать подсветку пары: " + (p instanceof Error ? p.message : String(p))
          );
        } finally {
          l.color = m, l.rasterizer.material = f;
        }
      },
      paintObject: () => {
      },
      paintSelected: () => {
      },
      release: () => {
      },
      bounds: () => {
      },
      *objectsAt() {
      },
      *selectableObjects() {
      },
      *selectedObjects() {
      },
      selectObject: () => {
      },
      selectObjects: () => {
      },
      isSelectedObject: () => !1,
      clearSelected: () => {
      },
      owned: () => !1,
      regenCadView: () => {
      },
      hasSelected: () => !1,
      *osnap() {
      }
    };
    i.layer.addLayer(a), this.overlay = { view: i, layer: a }, i.invalidate();
  }
  async snapshot(e, i, s, o = !1) {
    return this.captureWorkspace(
      () => this.snapshotInWorkspace(e, i, s, o)
    );
  }
  async snapshotInWorkspace(e, i, s, o = !1) {
    if (!this.isCurrent())
      throw Error("Обновите модели перед созданием снимков.");
    if (!this.canLocate(e))
      throw Error("Элементы результата отсутствуют в открытых моделях.");
    const n = this.view, a = n.layer.drawing;
    if (!a)
      throw Error(
        "Слой моделей недоступен для снимка пары. Откройте 3D-окно проекта."
      );
    const l = a.visible, m = n.annotations.visible, f = new Set(n.layer.selectedObjects());
    try {
      o ? this.highlight(e) : this.focus(e, i, !1), n.pauseAnimation(), n.layer.clearSelected(), a.visible = !1, n.annotations.visible = !1, n.invalidate();
      const p = await gt(
        n,
        () => s() || !this.isCurrent()
      );
      if (this.overlayError) throw this.overlayError;
      return p;
    } finally {
      a.visible = l, n.annotations.visible = m, n.layer.clearSelected(), n.layer.selectObjects((p) => f.has(p), !0), n.invalidate();
    }
  }
  markers(e, i, s, o) {
    if (!this.isCurrent()) return;
    const n = this.view;
    this.pointView && this.pointView !== n && this.clear();
    const a = n.annotations.get(Ie);
    if (a && n.annotations.release(a), this.pointView = n, !s) {
      n.invalidate();
      return;
    }
    const l = n.annotations.create(Ie, 1e4), m = e.filter((f) => f.id !== i).concat(e.filter((f) => f.id === i));
    for (const f of m.slice(-3e3)) {
      if (f.state === "resolved") continue;
      const [p, x, y] = f.point, w = f.id === i, E = f.state === "excluded" ? "#78818c" : f.state === "approved" || f.state === "reviewed" ? "#28b94b" : "#e1372d", S = w ? "#f2c94c" : E, M = () => o(f.id), j = [
        { type: "line", a: [p, x, y], b: [p, x, y + 1], color: S, width: 5 },
        {
          type: "polyline",
          points: [
            [p - 0.65, x, y + 1],
            [p + 0.65, x, y + 1],
            [p, x, y + 2.2],
            [p - 0.65, x, y + 1]
          ],
          color: S,
          fillColor: E,
          width: w ? 5 : 2
        },
        {
          type: "line",
          a: [p, x - 0.01, y + 1.85],
          b: [p, x - 0.01, y + 1.4],
          color: "#ffffff",
          width: 4
        },
        {
          type: "line",
          a: [p, x - 0.01, y + 1.22],
          b: [p, x - 0.01, y + 1.27],
          color: "#ffffff",
          width: 4
        }
      ];
      l.add({
        id: f.id,
        type: "shaped",
        shapes: j,
        activeShapes: j,
        activateCommand: M,
        dblCommand: M
      }), w && l.add({
        id: f.id + ":label",
        type: "simple",
        position: [p, x, y + 2.35],
        label: `${f.a.name} × ${f.b.name}`,
        labelBackground: "#f2c94c",
        labelColor: "#171717",
        activateCommand: M
      });
    }
    n.invalidate();
  }
}
let Be, Ee, Ge;
const yt = {
  open(t) {
    t.manager.revealView("nashepo.collisionfinder360/checks_panel");
  },
  mount(t) {
    const e = t.el;
    if (!e) return;
    if (Ee && Ge === t.manager) {
      e.replaceChildren(Ee);
      return;
    }
    Be?.();
    const i = document.createElement("div");
    i.style.height = "100%", e.replaceChildren(i), Ee = i, Ge = t.manager, Be = ht(i, new xt(t));
  }
};
export {
  yt as default
};
