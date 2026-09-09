const Ue = `<h2>Работа с проверками</h2>
<details open><summary>1. Первая проверка</summary><ol><li>Откройте проект и подключите IFC/SMDX штатными средствами Топоматик 360.</li><li>Откройте нижнюю вкладку «Проверки» и нажмите «Обновить модели».</li><li>Нажмите «＋ Проверка» и задайте ей понятное имя.</li><li>Во вкладке «Выбрать» оставьте галочки только у нужных файлов в А и Б. «Все модели» включено по умолчанию.</li><li>Выберите «По пересечению» или «Дублирование» и нажмите «Запустить».</li><li>Во вкладке «Результаты» дважды нажмите строку: камера направится к конфликту, а пересекающиеся элементы будут выделены красным.</li></ol><p>Первое обновление без созданной проверки получает только список файлов. При запуске индексируются модели, отмеченные хотя бы в одной стороне. Файл проекта WDX служит контейнером и в выбор моделей не попадает.</p></details>
<details><summary>2. Выбор моделей и сохранённые наборы</summary><p>Выбор А и выбор Б задают две стороны сравнения. Снимите «Все модели» и отметьте конкретные IFC/SMDX. Для поиска дубликатов внутри одного файла отметьте его с обеих сторон.</p><p>Часто используемый состав можно сохранить как набор моделей, а затем применить в другой проверке. Наборы входят в файл проверок. Состав выборки задаётся галочками моделей и ручным выделением объектов.</p><p>IFC GUID читается из свойства <code>ifc.id</code>; также поддерживаются GlobalId, IfcGuid и GUID.</p></details>
<details><summary>3. Работа с выделением в 3D</summary><p>Сначала выделите элементы штатными средствами в 3D-окне, затем используйте кнопку в нужной стороне:</p><ul><li><b>Показать выбранные элементы</b> — выделяет весь текущий состав.</li><li><b>Только выделенные в 3D</b> — оставляет только выделенные объекты.</li><li><b>＋ Добавить из 3D</b> — добавляет выделенные объекты к моделям.</li><li><b>− Исключить из 3D</b> — исключает выделенные объекты.</li><li><b>Сбросить ручной выбор</b> — снова использует отмеченные модели.</li></ul><p>Ручные идентификаторы могут измениться после замены IFC/SMDX, поэтому такую выборку следует проверить заново.</p></details>
<details><summary>4. Пересечения, вхождение, касания и дубликаты</summary><p><b>Пересечение</b> фиксирует пересечение поверхностей или вложенность замкнутых тел. <b>Расчётное вхождение</b> — оценка глубины проникновения в миллиметрах. Поле «Минимальное вхождение» отсекает меньшие результаты, например значение 20 оставляет конфликты от 20 мм.</p><p>Для открытой или неполной поверхности надёжно определить глубину нельзя; такой результат получает нулевую оценку. «Точность расчёта» задаёт числовую погрешность. <b>Касание</b> — соприкосновение без проникновения; переключатель включает такие пары.</p><p><b>Дублирование</b> ищет совпадающие треугольники в одинаковых мировых координатах. Для дубликатов внутри файла отметьте его и в А, и в Б. Порядок вершин не важен; разная триангуляция одинаковой формы пока не сопоставляется.</p></details>
<details><summary>5. Составные объекты и неполная геометрия</summary><p>Один IFC-объект может состоять из нескольких частей. Чтобы не сравнивать его части между собой, включите «Не проверять геометрию одного составного объекта» во вкладке «Правила». Там же можно исключить пары одной модели или одинакового значения свойства.</p><p>Пустые и неполные геометрические части пропускаются, а пригодные части модели продолжают участвовать. Плагин показывает сводное замечание с количеством пропущенных элементов. Незагруженный подключённый файл блокирует расчёт только тогда, когда он входит в выборку.</p></details>
<details><summary>6. Результаты и состояния</summary><p>«Новый» найден впервые, «Активный» найден повторно, «Проверенный» рассмотрен, «Подтверждённый» подтверждён, «Исключённый» исключён из работы. «Исправленный» означает, что пара исчезла при повторном расчёте с теми же правилами; состояние можно изменить вручную.</p><p>В таблице доступны IFC GUID, расчётное вхождение, назначение и комментарий. Галочки меняют состояние сразу у нескольких строк. Значения можно выделять и копировать. Состояние «Устарела» у проверки означает, что после последнего расчёта изменили её тип, выборки, параметры или правила. Результаты сохраняются до нового успешного запуска.</p></details>
<details><summary>7. Отчёт и снимки</summary><p>Кнопка «Снимок пары» в карточке результата сохраняет текущий ракурс только с двумя элементами коллизии. Остальные модели и знаки временно скрываются, после снимка видимость сцены восстанавливается. При формировании отчёта снимки пар создаются автоматически; старые снимки всей сцены заменяются. В результатах и готовом отчёте доступны поиск, фильтр состояний и фильтр минимального вхождения.</p><p>Файл сессии предназначен для открытия результатов в плагине «НашеПО · Коллизии». Для исправленной пары с отсутствующими элементами используется сохранённый снимок пары, если он есть.</p></details>
<details><summary>8. Проекты, сохранение и очистка</summary><p>В пределах открытой страницы каждый проект получает собственный список проверок. При переключении проекта данные предыдущего не подмешиваются. «Очистить проект» удаляет проверки, результаты и наборы только у текущего проекта.</p><p>«Сохранить проверки» записывает правила, наборы моделей, результаты, комментарии и снимки в JSON. «Открыть проверки» загружает этот файл. Геометрия в файл не входит: соответствующие модели надо открыть отдельно. После закрытия или обновления страницы продолжение работы возможно из сохранённого файла.</p></details>
<details><summary>9. Большие проекты</summary><p>Жёсткого предела в 6 млн треугольников нет. При запуске строится индекс только по отмеченным моделям. Точная геометрия передаётся в расчёт по мере появления близких пар в компактном индексированном виде.</p><p>Время и память всё равно зависят от состава выборок и числа потенциальных пар. Разделяйте проверки по моделям и системам. В сцене одновременно показывается до 3000 знаков; при 50 000 результатах расчёт останавливается без замены прежнего результата.</p></details>`;
function Be(e) {
  let t = e.parentElement, i;
  for (; t && !i; )
    i = [...t.children].find(
      (d) => d.classList.contains("resizer-horizontal")
    ), t = t.parentElement;
  if (!i) return () => {
  };
  const c = i, s = e.ownerDocument.defaultView;
  let n;
  const r = () => {
    if (n === void 0) return;
    const d = n;
    n = void 0, c.dispatchEvent(
      new MouseEvent("mouseup", { bubbles: !0, composed: !0 })
    ), c.hasPointerCapture(d) && c.releasePointerCapture(d);
  }, m = (d) => {
    d.button === 0 && (n = d.pointerId, c.setPointerCapture(d.pointerId));
  };
  return c.addEventListener("pointerdown", m), c.addEventListener("pointerup", r), c.addEventListener("pointercancel", r), c.addEventListener("lostpointercapture", r), s.addEventListener("blur", r), () => {
    r(), c.removeEventListener("pointerdown", m), c.removeEventListener("pointerup", r), c.removeEventListener("pointercancel", r), c.removeEventListener("lostpointercapture", r), s.removeEventListener("blur", r);
  };
}
const Fe = "0.3.1", xe = (e) => typeof e == "string" && /^data:image\/(jpeg|png);base64,[A-Za-z0-9+/=]+$/.test(e), re = {
  new: "Новый",
  active: "Активный",
  reviewed: "Проверенный",
  approved: "Подтверждённый",
  resolved: "Исправленный",
  excluded: "Исключённый"
}, Ce = () => ({
  models: [],
  modelsMode: "all",
  conditions: [],
  mode: "all",
  include: [],
  exclude: []
}), Ge = () => ({
  id: crypto.randomUUID(),
  name: "Новая проверка",
  type: "intersection",
  a: Ce(),
  b: Ce(),
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
}), Ae = ({
  triangles: e,
  vertices: t,
  indices: i,
  triangleCount: c,
  closed: s,
  bounds: n,
  ...r
}) => r;
function ge(e, t) {
  return t.exclude.includes(e.id) ? !1 : t.include.includes(e.id) ? !0 : !(t.manualOnly || t.modelsMode === "selected" && !t.models.includes(e.modelId) || t.modelsMode === void 0 && t.models.length && !t.models.includes(e.modelId));
}
const Ye = (e) => JSON.stringify([
  e.type,
  ...[e.a, e.b].map(
    ({
      models: t,
      modelsMode: i,
      conditions: c,
      mode: s,
      include: n,
      exclude: r,
      manualOnly: m
    }) => ({
      models: t,
      modelsMode: i,
      conditions: c,
      mode: s,
      include: n,
      exclude: r,
      manualOnly: m
    })
  ),
  e.precision,
  e.minPenetration,
  e.touching,
  e.ignoreSameModel,
  e.ignoreSameGroup,
  e.equalProperty,
  e.includeHidden
]), Ze = (e, t) => JSON.stringify([e, t].sort());
function Qe(e, t, i) {
  const c = new Map(e.map((n) => [n.id, n])), s = t.map((n) => {
    const r = c.get(n.id);
    return c.delete(n.id), {
      ...n,
      note: r?.note ?? "",
      assignee: r?.assignee ?? "",
      firstSeen: r?.firstSeen ?? i,
      lastSeen: i,
      state: !r || r.state === "resolved" ? "new" : r.state === "new" ? "active" : r.state
    };
  });
  for (const n of c.values())
    s.push({
      ...n,
      state: n.state === "excluded" ? "excluded" : "resolved"
    });
  return s;
}
function Ve(e) {
  const t = JSON.parse(e);
  if (t?.format !== "nashepo.checks" || t.version !== 1 || !Array.isArray(t.checks))
    throw Error("Это не файл проекта проверок НашеПО.");
  const i = /* @__PURE__ */ new Set();
  if (t.sets ??= [], !Array.isArray(t.sets) || !t.sets.every(
    (s) => s && typeof s.id == "string" && typeof s.name == "string" && s.selection && Array.isArray(s.selection.models) && s.selection.models.every((n) => typeof n == "string") && (s.selection.modelsMode === void 0 || ["all", "selected"].includes(s.selection.modelsMode)) && Array.isArray(s.selection.conditions) && s.selection.conditions.every(
      (n) => n && typeof n.field == "string" && typeof n.value == "string" && ["eq", "ne", "contains", "exists", "gt", "lt"].includes(
        n.op
      )
    ) && ["all", "any"].includes(s.selection.mode)
  ))
    throw Error("Некорректные наборы моделей.");
  const c = (s) => /\.wdx(?:[?#].*)?$/i.test(s);
  for (const s of t.sets)
    s.selection.models = s.selection.models.filter(
      (n) => !c(n)
    ), s.selection.conditions = [], s.selection.mode = "all", s.selection.modelsMode ??= s.selection.models.length ? "selected" : "all";
  for (const s of t.checks) {
    if (!s || typeof s.id != "string" || i.has(s.id) || typeof s.name != "string" || !["intersection", "duplicates"].includes(s.type) || !["new", "done", "stale"].includes(s.status) || !Number.isFinite(s.precision) || s.precision < 1e-3 || s.precision > 100 || s.minPenetration !== void 0 && (!Number.isFinite(s.minPenetration) || s.minPenetration < 0 || s.minPenetration > 1e5) || !Array.isArray(s.results))
      throw Error("Некорректные параметры проверки.");
    if (i.add(s.id), s.minPenetration ??= 0, ![
      "touching",
      "ignoreSameModel",
      "ignoreSameGroup",
      "includeHidden"
    ].every(
      (n) => typeof s[n] == "boolean"
    ) || typeof s.equalProperty != "string" || s.warnings !== void 0 && (!Array.isArray(s.warnings) || !s.warnings.every((n) => typeof n == "string")) || s.modelsAtRun !== void 0 && (!Array.isArray(s.modelsAtRun) || !s.modelsAtRun.every((n) => typeof n == "string")))
      throw Error("Некорректные правила проверки.");
    s.warnings ??= [], s.modelsAtRun = s.modelsAtRun?.filter((n) => !c(n));
    for (const n of [s.a, s.b]) {
      if (!n || n.manualOnly !== void 0 && typeof n.manualOnly != "boolean" || n.modelsMode !== void 0 && !["all", "selected"].includes(n.modelsMode) || n.presetId !== void 0 && typeof n.presetId != "string" || !["all", "any"].includes(n.mode) || ![n.models, n.include, n.exclude].every(
        (r) => Array.isArray(r) && r.every((m) => typeof m == "string")
      ) || !Array.isArray(n.conditions) || !n.conditions.every(
        (r) => r && typeof r.field == "string" && typeof r.value == "string" && ["eq", "ne", "contains", "exists", "gt", "lt"].includes(r.op)
      ))
        throw Error("Некорректная выборка.");
      n.modelsMode ??= n.models.length ? "selected" : "all", n.models = n.models.filter((r) => !c(r)), n.conditions = [], n.mode = "all";
    }
    for (const n of s.results) {
      if (n?.image !== void 0 && !xe(n.image))
        throw Error("Некорректный снимок результата.");
      if (n?.imageScope !== void 0 && n.imageScope !== "pair")
        throw Error("Некорректный состав снимка результата.");
      if (!n || typeof n.id != "string" || !Object.hasOwn(re, n.state) || n.penetrationMm !== void 0 && (!Number.isFinite(n.penetrationMm) || n.penetrationMm < 0) || !Array.isArray(n.point) || n.point.length !== 3 || !n.point.every(Number.isFinite))
        throw Error("Некорректный результат.");
      for (const r of [n.a, n.b])
        if (!r || !["id", "name", "model", "modelId", "guid"].every(
          (m) => typeof r[m] == "string"
        ) || !r.properties || typeof r.properties != "object")
          throw Error("Некорректный элемент результата.");
    }
  }
  return t;
}
const R = (e, t) => [e[0] - t[0], e[1] - t[1], e[2] - t[2]], pe = (e, t, i = 1) => [
  e[0] + t[0] * i,
  e[1] + t[1] * i,
  e[2] + t[2] * i
], T = (e, t) => e[0] * t[0] + e[1] * t[1] + e[2] * t[2], me = (e, t) => [
  e[1] * t[2] - e[2] * t[1],
  e[2] * t[0] - e[0] * t[2],
  e[0] * t[1] - e[1] * t[0]
], Z = (e) => Math.hypot(...e), se = (e) => e.triangleCount ?? (e.indices ? e.indices.length / 3 : e.triangles.length / 9), ae = (e, t, i) => e.indices && e.vertices ? e.vertices[e.indices[t * 3 + Math.floor(i / 3)] * 3 + i % 3] : e.triangles[t * 9 + i], ce = (e, t) => [0, 3, 6].map((i) => [
  ae(e, t, i),
  ae(e, t, i + 1),
  ae(e, t, i + 2)
]);
function Pe(e) {
  const t = [1 / 0, 1 / 0, 1 / 0], i = [-1 / 0, -1 / 0, -1 / 0];
  for (let c = 0; c < e.length; c++) {
    const s = c % 3;
    t[s] = Math.min(t[s], e[c]), i[s] = Math.max(i[s], e[c]);
  }
  return { min: t, max: i };
}
const De = (e, t, i) => e.min.every((c, s) => c <= t.max[s] + i && e.max[s] >= t.min[s] - i);
function ke(e, t) {
  const i = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const m of t)
    for (let d = 0; d < 9; d++) {
      const p = d % 3, u = ae(e, m, d);
      i.min[p] = Math.min(i.min[p], u), i.max[p] = Math.max(i.max[p], u);
    }
  if (t.length <= 12) return { ...i, ids: t };
  const c = i.max.map((m, d) => m - i.min[d]), s = c.indexOf(Math.max(...c)), n = (m) => ae(e, m, s) + ae(e, m, s + 3) + ae(e, m, s + 6);
  t.sort((m, d) => n(m) - n(d));
  const r = t.length >> 1;
  return {
    ...i,
    left: ke(e, t.slice(0, r)),
    right: ke(e, t.slice(r))
  };
}
function* fe(e, t, i) {
  De(e, t, i) && (e.ids ? yield* e.ids : (yield* fe(e.left, t, i), yield* fe(e.right, t, i)));
}
function Se(e, t) {
  const i = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const r of t)
    for (let m = 0; m < 3; m++)
      i.min[m] = Math.min(i.min[m], e[r].bounds.min[m]), i.max[m] = Math.max(i.max[m], e[r].bounds.max[m]);
  if (t.length <= 16) return { ...i, ids: t };
  const c = i.max.map((r, m) => r - i.min[m]), s = c.indexOf(Math.max(...c));
  t.sort(
    (r, m) => e[r].bounds.min[s] + e[r].bounds.max[s] - (e[m].bounds.min[s] + e[m].bounds.max[s])
  );
  const n = t.length >> 1;
  return {
    ...i,
    left: Se(e, t.slice(0, n)),
    right: Se(e, t.slice(n))
  };
}
function je(e, t, i, c) {
  const s = R(t, e), n = R(i[1], i[0]), r = R(i[2], i[0]), m = me(s, r), d = T(n, m);
  if (Math.abs(d) <= 1e-12 * Z(s) * Z(n) * Z(r)) return;
  const p = 1 / d, u = R(e, i[0]), g = T(u, m) * p, y = me(u, n), v = T(s, y) * p, C = T(r, y) * p, E = c / Math.max(Z(n), Z(r), c);
  if (g >= -E && v >= -E && g + v <= 1 + E && C >= -E && C <= 1 + E)
    return pe(e, s, Math.max(0, Math.min(1, C)));
}
function Je(e, t, i, c) {
  const s = i.map(Math.abs).indexOf(Math.max(...i.map(Math.abs))), n = [0, 1, 2].filter((d) => d !== s), r = (d, p, u) => (p[n[0]] - d[n[0]]) * (u[n[1]] - d[n[1]]) - (p[n[1]] - d[n[1]]) * (u[n[0]] - d[n[0]]), m = (d, p) => {
    const u = p.map((g, y) => r(g, p[(y + 1) % 3], d));
    return u.every((g) => g >= -c * Z(i)) || u.every((g) => g <= c * Z(i));
  };
  for (const d of e) if (m(d, t)) return d;
  for (const d of t) if (m(d, e)) return d;
  for (let d = 0; d < 3; d++)
    for (let p = 0; p < 3; p++) {
      const u = e[d], g = e[(d + 1) % 3], y = t[p], v = t[(p + 1) % 3], C = R(g, u), E = R(v, y), x = C[n[0]] * E[n[1]] - C[n[1]] * E[n[0]];
      if (Math.abs(x) < 1e-18) continue;
      const z = R(y, u), I = (z[n[0]] * E[n[1]] - z[n[1]] * E[n[0]]) / x, f = (z[n[0]] * C[n[1]] - z[n[1]] * C[n[0]]) / x;
      if (I >= 0 && I <= 1 && f >= 0 && f <= 1) return pe(u, C, I);
    }
}
function Te(e, t, i, c) {
  const s = me(R(e[1], e[0]), R(e[2], e[0])), n = me(R(t[1], t[0]), R(t[2], t[0])), r = Z(s), m = Z(n);
  if (r < 1e-20 || m < 1e-20) return;
  const d = t.map((u) => T(R(u, e[0]), s) / r), p = e.map((u) => T(R(u, t[0]), n) / m);
  if (!(d.every((u) => u > i) || d.every((u) => u < -i) || p.every((u) => u > i) || p.every((u) => u < -i))) {
    if (d.every((u) => Math.abs(u) <= i) && p.every((u) => Math.abs(u) <= i))
      return c ? Je(e, t, s, i) : void 0;
    if (!(!c && (!(Math.min(...d) < -i && Math.max(...d) > i) || !(Math.min(...p) < -i && Math.max(...p) > i))))
      for (let u = 0; u < 3; u++) {
        const g = je(e[u], e[(u + 1) % 3], t, i);
        if (g) return g;
        const y = je(t[u], t[(u + 1) % 3], e, i);
        if (y) return y;
      }
  }
}
function He(e, t, i) {
  const c = R(t[1], t[0]), s = R(t[2], t[0]), n = me(c, s), r = Z(n);
  if (r < 1e-20 || Math.abs(T(R(e, t[0]), n)) / r > i) return !1;
  const m = R(e, t[0]), d = T(c, c), p = T(c, s), u = T(s, s), g = T(m, c), y = T(m, s), v = d * u - p * p;
  if (Math.abs(v) < 1e-30) return !1;
  const C = (g * u - y * p) / v, E = (y * d - g * p) / v, x = i / Math.max(Z(c), Z(s), i);
  return C >= -x && E >= -x && C + E <= 1 + x;
}
function be(e, t, i, c) {
  if (!t.closed || e.some((g, y) => g <= t.bounds.min[y] + c || g >= t.bounds.max[y] - c))
    return !1;
  for (const g of fe(i, { min: e, max: e }, c))
    if (He(e, ce(t, g), c)) return !1;
  const s = [1, 0.371390676, 0.52999894], n = Z(R(t.bounds.max, t.bounds.min)) * 3 + 1, r = pe(e, s, n), m = [], d = Pe([...e, ...r]);
  for (const g of fe(i, d, c)) {
    const y = je(e, r, ce(t, g), c);
    if (y) {
      const v = Z(R(y, e));
      v > c && m.push(v);
    }
  }
  m.sort((g, y) => g - y);
  let p = 0, u = -1 / 0;
  for (const g of m)
    g - u > c * 2 && (p++, u = g);
  return p % 2 === 1;
}
function we(e, t) {
  return Math.hypot(
    ...e.map((i, c) => Math.max(t.min[c] - i, 0, i - t.max[c]))
  );
}
function We(e, t) {
  const i = R(t[1], t[0]), c = R(t[2], t[0]), s = R(e, t[0]), n = T(i, s), r = T(c, s);
  if (n <= 0 && r <= 0) return Z(s);
  const m = R(e, t[1]), d = T(i, m), p = T(c, m);
  if (d >= 0 && p <= d) return Z(m);
  if (n * p - d * r <= 0 && n >= 0 && d <= 0) {
    const z = n / (n - d);
    return Z(R(e, pe(t[0], i, z)));
  }
  const g = R(e, t[2]), y = T(i, g), v = T(c, g);
  if (v >= 0 && y <= v) return Z(g);
  if (y * r - n * v <= 0 && r >= 0 && v <= 0) {
    const z = r / (r - v);
    return Z(R(e, pe(t[0], c, z)));
  }
  if (d * v - y * p <= 0 && p - d >= 0 && y - v >= 0) {
    const z = R(t[2], t[1]), I = (p - d) / (p - d + (y - v));
    return Z(R(e, pe(t[1], z, I)));
  }
  const x = me(i, c);
  return Math.abs(T(s, x)) / Math.max(Z(x), 1e-30);
}
function Xe(e, t, i) {
  let c = 1 / 0;
  const s = (n) => {
    if (we(e, n) >= c) return;
    if (n.ids) {
      for (const d of n.ids)
        c = Math.min(c, We(e, ce(t, d)));
      return;
    }
    const r = n.left, m = n.right;
    we(e, r) < we(e, m) ? (s(r), s(m)) : (s(m), s(r));
  };
  return s(i), c;
}
async function Ke(e, t, i, c, s, n, r) {
  if (!e.closed || !t.closed) return 0;
  let m = 0;
  const d = (u, g, y) => {
    be(u, g, y, n) && (m = Math.max(m, Xe(u, g, y)));
  };
  d(s, e, i), d(s, t, c);
  let p = 0;
  for (const [u, g, y] of [
    [e, t, c],
    [t, e, i]
  ]) {
    const v = se(u), C = Math.max(1, Math.floor(v / 1024));
    for (let E = 0; E < v; E += C) {
      const x = ce(u, E), z = x[0].map((q, N) => (x[0][N] + x[1][N] + x[2][N]) / 3), I = x[0].map((q, N) => (x[0][N] + x[1][N]) / 2), f = x[0].map((q, N) => (x[1][N] + x[2][N]) / 2), ne = x[0].map((q, N) => (x[2][N] + x[0][N]) / 2);
      for (const q of [x[0], x[1], x[2], I, f, ne, z])
        d(q, g, y);
      p++ % 32 === 0 && await r();
    }
  }
  if (m <= n) {
    const u = e.bounds.min.map(
      (g, y) => Math.min(e.bounds.max[y], t.bounds.max[y]) - Math.max(g, t.bounds.min[y])
    );
    m = Math.max(0, Math.min(...u));
  }
  return m * 1e3;
}
async function _e(e, t, i, c, s) {
  const n = t.precision / 1e3;
  if (!Number.isFinite(n) || n <= 0)
    throw Error("Точность расчёта должна быть положительным числом.");
  const r = e.filter((M) => t.includeHidden || !M.hidden), m = r.filter((M) => ge(M, t.a)), d = r.filter((M) => ge(M, t.b));
  if (!m.length || !d.length)
    throw Error(
      "Выборка А или Б не содержит элементов. Отметьте хотя бы одну модель в каждой стороне проверки."
    );
  let p = performance.now();
  const u = async () => {
    if (c())
      throw Error("Расчёт отменён. Предыдущие результаты сохранены.");
    performance.now() - p > 16 && (await new Promise((M) => setTimeout(M, 0)), p = performance.now());
  }, g = /* @__PURE__ */ new Map(), y = (M) => {
    let A = g.get(M.id);
    return A || (A = ke(
      M,
      Array.from({ length: se(M) }, (G, L) => L)
    ), g.set(M.id, A)), A;
  }, v = /* @__PURE__ */ new Map(), C = async (M) => {
    let A = v.get(M.id);
    if (A !== void 0) return A;
    const G = [];
    for (let L = 0; L < se(M); L++)
      G.push(
        [0, 3, 6].map(
          (oe) => [0, 1, 2].map((S) => Math.round(ae(M, L, oe + S) / n)).join(",")
        ).sort().join(";")
      ), L % 9e3 === 0 && await u();
    return A = G.sort().join("|"), v.set(M.id, A), A;
  }, E = [], x = new Set(m.map((M) => M.id)), z = new Set(d.map((M) => M.id)), I = Se(
    d,
    d.map((M, A) => A)
  ), f = /* @__PURE__ */ new Map();
  let ne = 0;
  const q = (M) => M.triangles.byteLength + (M.vertices?.byteLength || 0) + (M.indices?.byteLength || 0) + se(M) * 32;
  async function N(M, A) {
    if (!s) return M;
    let G = f.get(M.id);
    if (G)
      return f.delete(M.id), f.set(M.id, G), G;
    for (const [L, oe] of f)
      L !== A && ne > 96 * 1024 * 1024 && (f.delete(L), ne -= q(oe), g.delete(L), v.delete(L));
    return G = await s(M.id), f.set(M.id, G), ne += q(G), G;
  }
  let le = -1 / 0;
  for (let M = 0; M < m.length; M++) {
    const A = m[M];
    performance.now() - le > 150 && (le = performance.now(), i({
      phase: "Проверка пар",
      done: M,
      total: m.length,
      found: E.length
    }));
    for (const G of fe(I, A.bounds, n)) {
      const L = d[G];
      if (await u(), A.id === L.id || !De(A.bounds, L.bounds, n) || t.ignoreSameModel && A.modelId === L.modelId || t.ignoreSameGroup && A.modelId === L.modelId && A.properties.Объект && A.properties.Объект === L.properties.Объект || t.equalProperty && A.properties[t.equalProperty] !== void 0 && A.properties[t.equalProperty] === L.properties[t.equalProperty] || A.id > L.id && x.has(L.id) && z.has(A.id)) continue;
      const oe = Ze(A.id, L.id), S = await N(A), P = await N(L, A.id);
      let U, D = "surface", W = 0;
      if (t.type === "duplicates") {
        if (se(S) !== se(P) || S.bounds.min.some(
          (K, H) => Math.abs(K - P.bounds.min[H]) > n || Math.abs(S.bounds.max[H] - P.bounds.max[H]) > n
        ))
          continue;
        await C(S) === await C(P) && (U = S.bounds.min.map((K, H) => (K + S.bounds.max[H]) / 2), D = "duplicate");
      } else {
        const K = y(S), H = y(P);
        for (let V = 0; V < se(S) && !U; V++) {
          const _ = ce(S, V), ie = Pe(_.flat());
          for (const X of fe(H, ie, n)) {
            if (U = Te(_, ce(P, X), n, t.touching), U) break;
            await u();
          }
          await u();
        }
        if (!U && S.closed && P.closed) {
          const V = S.bounds.min.map(
            (_, ie) => (_ + S.bounds.max[ie]) / 2
          );
          be(V, S, K, n) && be(V, P, H, n) && (U = V, D = "contained");
        }
        if (!U) {
          for (const [V, _, ie] of [
            [S, P, H],
            [P, S, K]
          ])
            if (_.closed) {
              for (let X = 0; X < se(V) && !U; X++) {
                const ee = ce(V, X), te = ee[0].map(
                  (Y, F) => (ee[0][F] + ee[1][F] + ee[2][F]) / 3
                );
                for (const Y of [ee[0], te])
                  if (be(Y, _, ie, n)) {
                    U = Y, D = "contained";
                    break;
                  }
                await u();
              }
              if (U) break;
            }
        }
        if (U && (W = await Ke(
          S,
          P,
          K,
          H,
          U,
          n,
          u
        )), U && W + t.precision < t.minPenetration)
          continue;
      }
      if (U && (E.push({
        id: oe,
        a: Ae(S),
        b: Ae(P),
        point: U,
        kind: D,
        state: "new",
        note: "",
        assignee: "",
        firstSeen: "",
        lastSeen: "",
        penetrationMm: W
      }), E.length >= 5e4))
        throw Error(
          "Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат."
        );
    }
  }
  return i({
    phase: "Готово",
    done: m.length,
    total: m.length,
    found: E.length
  }), E;
}
const Re = `(function(){"use strict";const on=({triangles:t,vertices:n,indices:i,triangleCount:s,closed:f,bounds:e,...c})=>c;function rn(t,n){return n.exclude.includes(t.id)?!1:n.include.includes(t.id)?!0:!(n.manualOnly||n.modelsMode==="selected"&&!n.models.includes(t.modelId)||n.modelsMode===void 0&&n.models.length&&!n.models.includes(t.modelId))}const cn=(t,n)=>JSON.stringify([t,n].sort()),y=(t,n)=>[t[0]-n[0],t[1]-n[1],t[2]-n[2]],G=(t,n,i=1)=>[t[0]+n[0]*i,t[1]+n[1]*i,t[2]+n[2]*i],w=(t,n)=>t[0]*n[0]+t[1]*n[1]+t[2]*n[2],H=(t,n)=>[t[1]*n[2]-t[2]*n[1],t[2]*n[0]-t[0]*n[2],t[0]*n[1]-t[1]*n[0]],p=t=>Math.hypot(...t),L=t=>t.triangleCount??(t.indices?t.indices.length/3:t.triangles.length/9),D=(t,n,i)=>t.indices&&t.vertices?t.vertices[t.indices[n*3+Math.floor(i/3)]*3+i%3]:t.triangles[n*9+i],z=(t,n)=>[0,3,6].map(i=>[D(t,n,i),D(t,n,i+1),D(t,n,i+2)]);function sn(t){const n=[1/0,1/0,1/0],i=[-1/0,-1/0,-1/0];for(let s=0;s<t.length;s++){const f=s%3;n[f]=Math.min(n[f],t[s]),i[f]=Math.max(i[f],t[s])}return{min:n,max:i}}const an=(t,n,i)=>t.min.every((s,f)=>s<=n.max[f]+i&&t.max[f]>=n.min[f]-i);function X(t,n){const i={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const o of n)for(let r=0;r<9;r++){const u=r%3,a=D(t,o,r);i.min[u]=Math.min(i.min[u],a),i.max[u]=Math.max(i.max[u],a)}if(n.length<=12)return{...i,ids:n};const s=i.max.map((o,r)=>o-i.min[r]),f=s.indexOf(Math.max(...s)),e=o=>D(t,o,f)+D(t,o,f+3)+D(t,o,f+6);n.sort((o,r)=>e(o)-e(r));const c=n.length>>1;return{...i,left:X(t,n.slice(0,c)),right:X(t,n.slice(c))}}function*J(t,n,i){an(t,n,i)&&(t.ids?yield*t.ids:(yield*J(t.left,n,i),yield*J(t.right,n,i)))}function Y(t,n){const i={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const c of n)for(let o=0;o<3;o++)i.min[o]=Math.min(i.min[o],t[c].bounds.min[o]),i.max[o]=Math.max(i.max[o],t[c].bounds.max[o]);if(n.length<=16)return{...i,ids:n};const s=i.max.map((c,o)=>c-i.min[o]),f=s.indexOf(Math.max(...s));n.sort((c,o)=>t[c].bounds.min[f]+t[c].bounds.max[f]-(t[o].bounds.min[f]+t[o].bounds.max[f]));const e=n.length>>1;return{...i,left:Y(t,n.slice(0,e)),right:Y(t,n.slice(e))}}function Z(t,n,i,s){const f=y(n,t),e=y(i[1],i[0]),c=y(i[2],i[0]),o=H(f,c),r=w(e,o);if(Math.abs(r)<=1e-12*p(f)*p(e)*p(c))return;const u=1/r,a=y(t,i[0]),d=w(a,o)*u,l=H(a,e),M=w(f,l)*u,I=w(c,l)*u,x=s/Math.max(p(e),p(c),s);if(d>=-x&&M>=-x&&d+M<=1+x&&I>=-x&&I<=1+x)return G(t,f,Math.max(0,Math.min(1,I)))}function un(t,n,i,s){const f=i.map(Math.abs).indexOf(Math.max(...i.map(Math.abs))),e=[0,1,2].filter(r=>r!==f),c=(r,u,a)=>(u[e[0]]-r[e[0]])*(a[e[1]]-r[e[1]])-(u[e[1]]-r[e[1]])*(a[e[0]]-r[e[0]]),o=(r,u)=>{const a=u.map((d,l)=>c(d,u[(l+1)%3],r));return a.every(d=>d>=-s*p(i))||a.every(d=>d<=s*p(i))};for(const r of t)if(o(r,n))return r;for(const r of n)if(o(r,t))return r;for(let r=0;r<3;r++)for(let u=0;u<3;u++){const a=t[r],d=t[(r+1)%3],l=n[u],M=n[(u+1)%3],I=y(d,a),x=y(M,l),h=I[e[0]]*x[e[1]]-I[e[1]]*x[e[0]];if(Math.abs(h)<1e-18)continue;const P=y(l,a),C=(P[e[0]]*x[e[1]]-P[e[1]]*x[e[0]])/h,j=(P[e[0]]*I[e[1]]-P[e[1]]*I[e[0]])/h;if(C>=0&&C<=1&&j>=0&&j<=1)return G(a,I,C)}}function dn(t,n,i,s){const f=H(y(t[1],t[0]),y(t[2],t[0])),e=H(y(n[1],n[0]),y(n[2],n[0])),c=p(f),o=p(e);if(c<1e-20||o<1e-20)return;const r=n.map(a=>w(y(a,t[0]),f)/c),u=t.map(a=>w(y(a,n[0]),e)/o);if(!(r.every(a=>a>i)||r.every(a=>a<-i)||u.every(a=>a>i)||u.every(a=>a<-i))){if(r.every(a=>Math.abs(a)<=i)&&u.every(a=>Math.abs(a)<=i))return s?un(t,n,f,i):void 0;if(!(!s&&(!(Math.min(...r)<-i&&Math.max(...r)>i)||!(Math.min(...u)<-i&&Math.max(...u)>i))))for(let a=0;a<3;a++){const d=Z(t[a],t[(a+1)%3],n,i);if(d)return d;const l=Z(n[a],n[(a+1)%3],t,i);if(l)return l}}}function ln(t,n,i){const s=y(n[1],n[0]),f=y(n[2],n[0]),e=H(s,f),c=p(e);if(c<1e-20||Math.abs(w(y(t,n[0]),e))/c>i)return!1;const o=y(t,n[0]),r=w(s,s),u=w(s,f),a=w(f,f),d=w(o,s),l=w(o,f),M=r*a-u*u;if(Math.abs(M)<1e-30)return!1;const I=(d*a-l*u)/M,x=(l*r-d*u)/M,h=i/Math.max(p(s),p(f),i);return I>=-h&&x>=-h&&I+x<=1+h}function V(t,n,i,s){if(!n.closed||t.some((d,l)=>d<=n.bounds.min[l]+s||d>=n.bounds.max[l]-s))return!1;for(const d of J(i,{min:t,max:t},s))if(ln(t,z(n,d),s))return!1;const f=[1,.371390676,.52999894],e=p(y(n.bounds.max,n.bounds.min))*3+1,c=G(t,f,e),o=[],r=sn([...t,...c]);for(const d of J(i,r,s)){const l=Z(t,c,z(n,d),s);if(l){const M=p(y(l,t));M>s&&o.push(M)}}o.sort((d,l)=>d-l);let u=0,a=-1/0;for(const d of o)d-a>s*2&&(u++,a=d);return u%2===1}function $(t,n){return Math.hypot(...t.map((i,s)=>Math.max(n.min[s]-i,0,i-n.max[s])))}function mn(t,n){const i=y(n[1],n[0]),s=y(n[2],n[0]),f=y(t,n[0]),e=w(i,f),c=w(s,f);if(e<=0&&c<=0)return p(f);const o=y(t,n[1]),r=w(i,o),u=w(s,o);if(r>=0&&u<=r)return p(o);if(e*u-r*c<=0&&e>=0&&r<=0){const P=e/(e-r);return p(y(t,G(n[0],i,P)))}const d=y(t,n[2]),l=w(i,d),M=w(s,d);if(M>=0&&l<=M)return p(d);if(l*c-e*M<=0&&c>=0&&M<=0){const P=c/(c-M);return p(y(t,G(n[0],s,P)))}if(r*M-l*u<=0&&u-r>=0&&l-M>=0){const P=y(n[2],n[1]),C=(u-r)/(u-r+(l-M));return p(y(t,G(n[1],P,C)))}const h=H(i,s);return Math.abs(w(f,h))/Math.max(p(h),1e-30)}function hn(t,n,i){let s=1/0;const f=e=>{if($(t,e)>=s)return;if(e.ids){for(const r of e.ids)s=Math.min(s,mn(t,z(n,r)));return}const c=e.left,o=e.right;$(t,c)<$(t,o)?(f(c),f(o)):(f(o),f(c))};return f(i),s}async function gn(t,n,i,s,f,e,c){if(!t.closed||!n.closed)return 0;let o=0;const r=(a,d,l)=>{V(a,d,l,e)&&(o=Math.max(o,hn(a,d,l)))};r(f,t,i),r(f,n,s);let u=0;for(const[a,d,l]of[[t,n,s],[n,t,i]]){const M=L(a),I=Math.max(1,Math.floor(M/1024));for(let x=0;x<M;x+=I){const h=z(a,x),P=h[0].map((N,_)=>(h[0][_]+h[1][_]+h[2][_])/3),C=h[0].map((N,_)=>(h[0][_]+h[1][_])/2),j=h[0].map((N,_)=>(h[1][_]+h[2][_])/2),K=h[0].map((N,_)=>(h[2][_]+h[0][_])/2);for(const N of[h[0],h[1],h[2],C,j,K,P])r(N,d,l);u++%32===0&&await c()}}if(o<=e){const a=t.bounds.min.map((d,l)=>Math.min(t.bounds.max[l],n.bounds.max[l])-Math.max(d,n.bounds.min[l]));o=Math.max(0,Math.min(...a))}return o*1e3}async function yn(t,n,i,s,f){const e=n.precision/1e3;if(!Number.isFinite(e)||e<=0)throw Error("Точность расчёта должна быть положительным числом.");const c=t.filter(m=>n.includeHidden||!m.hidden),o=c.filter(m=>rn(m,n.a)),r=c.filter(m=>rn(m,n.b));if(!o.length||!r.length)throw Error("Выборка А или Б не содержит элементов. Отметьте хотя бы одну модель в каждой стороне проверки.");let u=performance.now();const a=async()=>{if(s())throw Error("Расчёт отменён. Предыдущие результаты сохранены.");performance.now()-u>16&&(await new Promise(m=>setTimeout(m,0)),u=performance.now())},d=new Map,l=m=>{let g=d.get(m.id);return g||(g=X(m,Array.from({length:L(m)},(S,b)=>b)),d.set(m.id,g)),g},M=new Map,I=async m=>{let g=M.get(m.id);if(g!==void 0)return g;const S=[];for(let b=0;b<L(m);b++)S.push([0,3,6].map(B=>[0,1,2].map(v=>Math.round(D(m,b,B+v)/e)).join(",")).sort().join(";")),b%9e3===0&&await a();return g=S.sort().join("|"),M.set(m.id,g),g},x=[],h=new Set(o.map(m=>m.id)),P=new Set(r.map(m=>m.id)),C=Y(r,r.map((m,g)=>g)),j=new Map;let K=0;const N=m=>m.triangles.byteLength+(m.vertices?.byteLength||0)+(m.indices?.byteLength||0)+L(m)*32;async function _(m,g){if(!f)return m;let S=j.get(m.id);if(S)return j.delete(m.id),j.set(m.id,S),S;for(const[b,B]of j)b!==g&&K>96*1024*1024&&(j.delete(b),K-=N(B),d.delete(b),M.delete(b));return S=await f(m.id),j.set(m.id,S),K+=N(S),S}let fn=-1/0;for(let m=0;m<o.length;m++){const g=o[m];performance.now()-fn>150&&(fn=performance.now(),i({phase:"Проверка пар",done:m,total:o.length,found:x.length}));for(const S of J(C,g.bounds,e)){const b=r[S];if(await a(),g.id===b.id||!an(g.bounds,b.bounds,e)||n.ignoreSameModel&&g.modelId===b.modelId||n.ignoreSameGroup&&g.modelId===b.modelId&&g.properties.Объект&&g.properties.Объект===b.properties.Объект||n.equalProperty&&g.properties[n.equalProperty]!==void 0&&g.properties[n.equalProperty]===b.properties[n.equalProperty]||g.id>b.id&&h.has(b.id)&&P.has(g.id))continue;const B=cn(g.id,b.id),v=await _(g),E=await _(b,g.id);let q,W="surface",nn=0;if(n.type==="duplicates"){if(L(v)!==L(E)||v.bounds.min.some((A,O)=>Math.abs(A-E.bounds.min[O])>e||Math.abs(v.bounds.max[O]-E.bounds.max[O])>e))continue;await I(v)===await I(E)&&(q=v.bounds.min.map((A,O)=>(A+v.bounds.max[O])/2),W="duplicate")}else{const A=l(v),O=l(E);for(let T=0;T<L(v)&&!q;T++){const F=z(v,T),Q=sn(F.flat());for(const R of J(O,Q,e)){if(q=dn(F,z(E,R),e,n.touching),q)break;await a()}await a()}if(!q&&v.closed&&E.closed){const T=v.bounds.min.map((F,Q)=>(F+v.bounds.max[Q])/2);V(T,v,A,e)&&V(T,E,O,e)&&(q=T,W="contained")}if(!q){for(const[T,F,Q]of[[v,E,O],[E,v,A]])if(F.closed){for(let R=0;R<L(T)&&!q;R++){const U=z(T,R),xn=U[0].map((tn,en)=>(U[0][en]+U[1][en]+U[2][en])/3);for(const tn of[U[0],xn])if(V(tn,F,Q,e)){q=tn,W="contained";break}await a()}if(q)break}}if(q&&(nn=await gn(v,E,A,O,q,e,a)),q&&nn+n.precision<n.minPenetration)continue}if(q&&(x.push({id:B,a:on(v),b:on(E),point:q,kind:W,state:"new",note:"",assignee:"",firstSeen:"",lastSeen:"",penetrationMm:nn}),x.length>=5e4))throw Error("Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат.")}}return i({phase:"Готово",done:o.length,total:o.length,found:x.length}),x}let Mn=0;const k=new Map;self.onmessage=async t=>{if(t.data.request!==void 0){const n=k.get(t.data.request);k.delete(t.data.request),t.data.error?n?.reject(Error(t.data.error)):n?.resolve(t.data.geometry);return}try{const{elements:n,check:i}=t.data,s=await yn(n,i,f=>self.postMessage({progress:f}),()=>!1,t.data.streaming?f=>new Promise((e,c)=>{const o=Mn++;k.set(o,{resolve:e,reject:c}),self.postMessage({load:f,request:o})}):void 0);self.postMessage({results:s})}catch(n){self.postMessage({error:n instanceof Error?n.message:String(n)})}}})();
`, Oe = typeof self < "u" && self.Blob && new Blob(["(self.URL || self.webkitURL).revokeObjectURL(self.location.href);", Re], { type: "text/javascript;charset=utf-8" });
function et(e) {
  let t;
  try {
    if (t = Oe && (self.URL || self.webkitURL).createObjectURL(Oe), !t) throw "";
    const i = new Worker(t, {
      name: e?.name
    });
    return i.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(t);
    }), i;
  } catch {
    return new Worker(
      "data:text/javascript;charset=utf-8," + encodeURIComponent(Re),
      {
        name: e?.name
      }
    );
  }
}
const Q = (e) => String(e ?? "").replace(
  /[&<>"']/g,
  (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[t]
);
function $e(e, t) {
  const i = URL.createObjectURL(
    new Blob([t], {
      type: e.endsWith(".html") ? "text/html;charset=utf-8" : "application/json;charset=utf-8"
    })
  ), c = document.createElement("a");
  c.href = i, c.download = e, c.click(), setTimeout(() => URL.revokeObjectURL(i), 6e4);
}
function tt(e, t) {
  const i = Q;
  return `<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${i(e.name)}</title><style>body{font:14px/1.5 system-ui;margin:24px;background:#171c23;color:#e6edf5}h1{margin:0}small{color:#a9b7c8}input,select{padding:10px;margin:15px 8px 15px 0;max-width:100%;background:#242e3b;color:inherit;border:1px solid #506074;border-radius:6px}.wrap{overflow:auto}table{border-collapse:separate;border-spacing:0;width:100%}td,th{padding:10px;border-bottom:1px solid #39475a;min-width:100px;vertical-align:top;overflow-wrap:anywhere}th{background:#253142;position:sticky;top:0;text-align:left;white-space:normal}td{max-width:350px}tr[hidden]{display:none}.shot{display:block;width:260px;border:0;background:transparent;padding:0;cursor:zoom-in}dialog{width:min(94vw,1400px);border:1px solid #506074;background:#20242b;color:white;border-radius:10px}dialog img{max-width:100%;max-height:80vh;display:block;margin:12px auto}dialog::backdrop{background:#000b}.shot img{width:100%;border-radius:6px}.legend{margin:12px 0}.red{color:#ff6161}@media print{input,select{display:none}body{background:white;color:black}.wrap{overflow:visible}th{position:static;background:#eee}}</style><h1>${i(e.name)}</h1><small>НашеПО · Проверки коллизий · ${i(e.lastRun || "")} · ${e.status === "stale" ? "Результат устарел" : "Последний завершённый расчёт"}</small><p>${i(e.type === "duplicates" ? "Совпадение треугольной геометрии" : "Пересечения поверхностей и вложенность замкнутых тел")}. Точность: ${i(e.precision)} мм${e.type === "intersection" ? `; минимальное расчётное вхождение: ${i(e.minPenetration)} мм` : ""}.</p><p class="legend"><span class="red">● Пересекающиеся элементы выделены красным</span></p><input id="search" type="search" placeholder="Поиск по всему отчёту"><select id="state"><option value="">Все состояния</option>${Object.entries(
    re
  ).map(([c, s]) => `<option value="${c}">${s}</option>`).join(
    ""
  )}</select>${e.type === "intersection" ? '<input id="depth" type="number" min="0" step="1" placeholder="Вхождение от, мм">' : ""}<span id="count"></span><div class="wrap"><table><thead><tr>${["Снимок", "№", "Состояние", "Вхождение, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "X", "Y", "Z", "Назначение", "Комментарий"].map((c) => `<th>${c}</th>`).join("")}</tr></thead><tbody>${t.map((c, s) => `<tr data-state="${c.state}" data-depth="${c.penetrationMm ?? 0}"><td>${xe(c.image) ? `<button class="shot" type="button"><img src="${c.image}" alt="Снимок конфликта ${s + 1}" loading="lazy"></button>` : "Снимок отсутствует"}</td>${[s + 1, re[c.state], e.type === "duplicates" ? "—" : (c.penetrationMm ?? 0).toFixed(1), c.a.name, c.a.model, c.a.guid, c.b.name, c.b.model, c.b.guid, ...c.point.map((n) => n.toFixed(4)), c.assignee, c.note].map((n) => `<td>${i(n)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><dialog id="picture"><button id="close-picture">Закрыть</button><img id="full-picture" alt="Снимок конфликта"></dialog><script>const modal=document.getElementById("picture");document.getElementById("close-picture").onclick=()=>modal.close();for(const b of document.querySelectorAll(".shot"))b.onclick=()=>{document.getElementById("full-picture").src=b.querySelector("img").src;modal.showModal()};const q=document.getElementById('search'),s=document.getElementById('state'),d=document.getElementById('depth'),rows=[...document.querySelectorAll('tbody tr')];function filter(){let n=0;for(const r of rows){r.hidden=!!((s.value&&r.dataset.state!==s.value)||(d&&Number(r.dataset.depth)<Number(d.value||0))||!r.textContent.toLowerCase().includes(q.value.toLowerCase()));if(!r.hidden)n++}document.getElementById('count').textContent='Коллизий: '+n}q.oninput=s.onchange=filter;if(d)d.oninput=filter;filter()<\/script></html>`;
}
function nt(e, t) {
  return JSON.stringify(
    {
      version: 1,
      id: e.id,
      name: e.name,
      images: Object.fromEntries(
        t.filter((i) => xe(i.image)).map((i) => [i.id + ".jpg", i.image])
      ),
      warnings: e.warnings,
      tests: [
        {
          id: e.id,
          name: e.name,
          clashes: t.map((i, c) => ({
            id: i.id,
            name: `Конфликт ${c + 1}`,
            distance: e.type === "duplicates" ? "" : `${(i.penetrationMm ?? 0).toFixed(1)} мм`,
            date: e.lastRun || "",
            description: e.type === "duplicates" ? "Дублирование" : "По пересечению",
            status: re[i.state],
            group: i.assignee,
            note: i.note,
            point: i.point,
            image: xe(i.image) ? i.id + ".jpg" : "",
            enabled: i.state !== "resolved",
            reviewed: i.state === "resolved" || i.state === "reviewed" || i.state === "approved",
            excluded: i.state === "excluded",
            elements: [i.a, i.b].map((s) => ({
              guid: s.guid,
              id: s.id,
              source: s.model,
              name: s.name,
              properties: s.properties
            })),
            properties: {
              Проверка: e.name,
              Вид: i.kind,
              "Расчётное вхождение, мм": String(i.penetrationMm ?? 0)
            }
          }))
        }
      ]
    },
    null,
    2
  );
}
const it = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAydpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAzIDc5Ljk2OTBhODdmYywgMjAyNS8wMy8wNi0yMDo1MDoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDZFQkU2NEQ4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDZFQkU2NEM4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI2LjExIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRENDVBNjQzODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRENDVBNjQ0ODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+pHX+ogAAD+lJREFUeNrs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", ot = ":host{display:block;height:100%;color-scheme:dark;font:13px/1.4 Segoe UI,sans-serif;color:#dbe5f0;container-type:size}*{box-sizing:border-box}[hidden]{display:none!important}main{height:100%;min-height:260px;background:#171d25;display:flex;flex-direction:column;overflow:hidden;-webkit-user-select:none;user-select:none}button,input,select,textarea{font:inherit;color:inherit;border:1px solid #425165;border-radius:6px;background:#253140;padding:7px 9px;min-width:0}button{cursor:pointer;white-space:nowrap}button:hover{background:#354459}button:disabled{opacity:.45;cursor:default}.primary{background:#b99a38;border-color:#d0ae46;color:#111820;font-weight:600}.primary:hover{background:#e0bd51}button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid #f2c94c;outline-offset:1px}input,select,textarea{background:#111a24}input,textarea,td,dd{-webkit-user-select:text;user-select:text}input[type=checkbox]{accent-color:#e6c354;width:16px;height:16px}header{display:flex;gap:7px;align-items:center;padding:8px 12px;border-bottom:1px solid #354459;flex-shrink:0;overflow-x:auto}.brand{display:flex;gap:7px;align-items:center;margin-right:8px}.brand img{width:32px;height:32px;object-fit:contain}.brand b{font-size:17px}.brand small{font-size:10px;color:#a6b5c7}#dirty{margin-left:auto;font-size:11px;color:#cabb81;white-space:nowrap}.notice{background:#1c2735;padding:5px 12px;font-size:12px;min-height:27px;max-height:70px;overflow:auto;color:#a7bbd1}.notice.error{color:#ffaaa1;background:#412725}.workspace{display:grid;grid-template-columns:230px minmax(0,1fr);flex:1;min-height:0}aside{padding:10px;display:flex;flex-direction:column;gap:9px;border-right:1px solid #354459;min-height:0}#checks{overflow:auto;flex:1;min-height:0}.check-item{display:flex;flex-direction:column;gap:5px;width:100%;margin-bottom:5px;text-align:left;white-space:normal}.check-item small{color:#a8b7ca}.check-item.active,.tabs .active{border-color:#c7ab56;background:#403b2c;color:#ffe399}.main{display:flex;flex-direction:column;min-width:0;min-height:0}.test-toolbar{display:flex;gap:7px;padding:8px 12px;align-items:center}.test-toolbar input{flex:1;font-weight:600}.tabs{display:flex;gap:7px;border-bottom:1px solid #354459;padding:0 12px 8px}.tabs button{min-width:105px}#content{flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column}.empty{padding:28px;color:#a4b4c9;text-align:center;margin:auto}h2,h3,p{margin:0 0 10px}h2{font-size:20px}h3{font-size:15px}label{display:flex;flex-direction:column;gap:5px;font-size:12px;color:#b8c6d7}.check{flex-direction:row;align-items:center;gap:6px}small{font-size:11px;color:#a8b7c9}.parameters{display:flex;gap:18px;align-items:end;padding:10px 12px}.parameters input{width:140px}.selection-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0 12px 12px}.selection{border:1px solid #39495e;border-radius:8px;padding:12px;background:#1b2633;min-width:0}.selection h3{display:flex;justify-content:space-between}.selection h3 span{color:#92c4b2;font-size:12px}.selection select[multiple]{width:100%;min-height:70px}.selection-tools{display:flex;gap:5px;flex-wrap:wrap;margin:8px 0}.selection-tools button{font-size:11px;padding:5px 7px}.selection>label{margin-bottom:8px}.condition{display:grid;grid-template-columns:minmax(80px,1fr) 100px minmax(70px,1fr) 29px;gap:5px;margin:6px 0}.condition button{padding:3px}.rules,.report{padding:18px;max-width:850px}.rules>label{margin:14px 0}.rules>p,.report>p{color:#a9b8cb}.report>button{margin:12px 8px 14px 0}.result-tools{display:flex;gap:7px;flex-wrap:wrap;padding:8px 12px}.result-tools input{flex:1;min-width:180px}.result-area{display:grid;grid-template-columns:minmax(0,1fr) 300px;flex:1;min-height:0}.table-area{display:flex;flex-direction:column;min-width:0;min-height:0}.scroll{overflow:auto;flex:1;min-height:0}table{border-collapse:separate;border-spacing:0;width:max-content;min-width:100%}th{position:sticky;top:0;background:#2a3748;z-index:1;text-align:left;max-width:240px;white-space:normal}th,td{padding:8px;border-bottom:1px solid #344154;vertical-align:top}td{max-width:320px;min-width:90px;overflow-wrap:anywhere;-webkit-user-select:text;user-select:text}td:first-child{min-width:36px}tr.active td{background:#453e29;color:#fff0b5}tr:hover td{background:#2c3847}.pager{display:flex;gap:10px;align-items:center;justify-content:center;padding:5px;border-top:1px solid #39495e;font-size:11px}.pager button{padding:2px 8px}.detail{border-left:1px solid #354459;padding:10px;overflow:auto}.detail h3{overflow-wrap:anywhere}.detail>label{margin:10px 0}.detail p{font:11px/1.5 Consolas,monospace}.detail details{border-top:1px solid #354459;padding:8px 0}summary{cursor:pointer}dl{font-size:11px;display:grid;grid-template-columns:1fr 1fr;gap:7px}dt,dd{overflow-wrap:anywhere;margin:0}dt{color:#9baec4}footer{border-top:1px solid #354459;padding:4px 12px;display:flex;justify-content:space-between;color:#91a4bb;font-size:11px}dialog{border:1px solid #53647c;border-radius:12px;background:#202c3a;color:#dbe5f0;width:min(700px,92vw);max-height:85vh;padding:20px;box-shadow:0 15px 60px #000a}dialog::backdrop{background:#000a}dialog p{margin:12px 0}dialog a{color:#f2c94c;margin-right:12px}.dialog-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:16px}@container (max-width:950px){.workspace{grid-template-columns:185px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 240px}.selection-grid{grid-template-columns:1fr}.parameters,.test-toolbar{flex-wrap:wrap}.test-toolbar input{flex-basis:100%}}@container (max-height:400px){header{padding:5px 10px}.test-toolbar{padding:5px 10px}.tabs{padding-bottom:5px}.brand img{width:25px;height:25px}footer{display:none}}:host{font-size:14px}.brand img{background:#e1e7ef;border-radius:5px;padding:3px}.selection-tools button{font-size:12px}label{font-size:13px}.choose-layout{display:grid;grid-template-columns:220px minmax(0,1fr);min-height:0;flex:1;overflow:auto}.choose-layout .parameters{display:flex;flex-direction:column;align-items:stretch;gap:15px;border-right:1px solid #354459;justify-content:flex-start}.choose-layout .parameters input{width:100%}.choose-layout .parameters input[type=checkbox]{width:16px}.choose-layout .selection-grid{padding:10px 12px;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start;min-width:0}.selection select[multiple]{height:180px;resize:vertical}.selection-mode{font-size:12px;color:#b6c4d5}.preset-row{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:9px}.preset-row select{flex:1 1 160px}.preset-row button{padding:5px 7px;font-size:12px}.model-list{height:150px;overflow:auto;border:1px solid #425165;border-radius:6px;background:#111a24;padding:5px;margin-bottom:5px}.model-list label{display:flex;flex-direction:row;align-items:center;gap:7px;padding:4px 5px;color:#dbe5f0;overflow-wrap:anywhere}.model-list label:hover{background:#253140}.model-list .model-all{position:sticky;top:-5px;z-index:1;background:#1f2b39;border-bottom:1px solid #425165;font-weight:600}.legend{display:flex;gap:12px;flex-wrap:wrap;font-family:inherit!important}.part-a{color:#ff6161}.part-b{color:#65baff}.preview{display:block;width:100%;padding:5px;margin:8px 0}.preview img{display:block;width:100%;max-height:180px;object-fit:contain}.image-dialog{width:94vw;max-width:1500px}.image-dialog img{display:block;max-width:100%;max-height:75vh;margin:10px auto}#help-dialog{width:min(1000px,94vw);line-height:1.6}#help-dialog details{padding:12px 0;border-bottom:1px solid #425165}#help-dialog summary{font-size:16px;font-weight:600;color:#f0d27a}#help-dialog li{margin:8px 0}@container (max-width:1100px){.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .selection-grid{grid-template-columns:1fr}.condition{grid-template-columns:minmax(60px,1fr) 100px minmax(60px,1fr) 29px}}@container (max-width:700px){.choose-layout{display:block}.choose-layout .parameters{border-right:0;border-bottom:1px solid #354459}.workspace{grid-template-columns:160px minmax(0,1fr)}}", ue = /* @__PURE__ */ new WeakMap(), ve = () => ({
  format: "nashepo.checks",
  version: 1,
  checks: [],
  sets: []
});
function st(e, t) {
  const i = e.shadowRoot || e.attachShadow({ mode: "open" }), c = Be(e);
  let s = t.projectToken(), n = s && ue.get(s) || ve();
  s && ue.set(s, n);
  let r, m = n.checks[0]?.id || "", d = "select", p = "", u = 0, g = !1, y = !1, v, C = !0, E = !1;
  const x = /* @__PURE__ */ new Set();
  let z;
  const I = () => n.checks.find((o) => o.id === m), f = (o) => i.querySelector("#" + o);
  i.innerHTML = `<style>${ot}</style><main><header><div class="brand"><img src="${it}" alt=""><b>НашеПО</b><small>${Fe}</small></div><button id="scan">Обновить модели</button><button id="new" class="primary">＋ Проверка</button><button id="open">Открыть проверки</button><button id="save">Сохранить проверки</button><button id="settings">⚙</button><button id="help">Справка</button><span id="dirty"></span></header><div class="notice" id="notice" role="status">Откройте IFC/SMDX в проекте и нажмите «Обновить модели».</div><div class="workspace"><aside><input id="test-search" type="search" placeholder="Поиск проверок"><div id="checks"></div><button id="all">Запустить все</button></aside><section class="main"><div class="test-toolbar"><input id="name" aria-label="Имя проверки" placeholder="Имя проверки"><button id="copy">Копировать</button><button id="delete">Удалить</button><button id="run" class="primary">▶ Запустить</button><button id="cancel" hidden>Остановить</button></div><div id="tabs" class="tabs">${[
    ["rules", "Правила"],
    ["select", "Выбрать"],
    ["results", "Результаты"],
    ["report", "Отчёт"]
  ].map(([o, a]) => `<button data-tab="${o}">${a}</button>`).join(
    ""
  )}</div><div id="content"></div></section></div><footer><span id="model-count">Модели не прочитаны</span><span>Расчёт выполняется на вашем компьютере</span></footer><input id="file" type="file" accept=".json" hidden><dialog id="settings-dialog"><h2>Настройки</h2><label>Дистанция камеры, м<input id="distance" type="number" value="15" min="0.5"></label><p class="links"><a href="https://nashepo.ru/" target="_blank" rel="noopener noreferrer">Сайт НашеПО</a><a href="https://t.me/RoburFan" target="_blank" rel="noopener noreferrer">Telegram</a></p><button data-close="settings-dialog">Закрыть</button></dialog><dialog id="help-dialog">${Ue}<button data-close="help-dialog">Закрыть</button></dialog><dialog id="set-dialog"><h2>Сохранить набор моделей</h2><label>Название<input id="set-name" maxlength="120"></label><div class="dialog-actions"><button id="set-cancel">Отмена</button><button id="set-confirm" class="primary">Сохранить</button></div></dialog></main>`;
  const ne = document.createElement("button");
  ne.id = "clear-project", ne.textContent = "Очистить проект", f("save").after(ne);
  const q = (o, a = !1) => {
    f("notice").textContent = o, f("notice").classList.toggle("error", a);
  }, N = async (o) => {
    try {
      await o();
    } catch (a) {
      q(a instanceof Error ? a.message : String(a), !0);
    }
  }, le = () => new Promise((o) => {
    const a = f("set-dialog"), l = f("set-name");
    let b = !1;
    const w = (k) => {
      b || (b = !0, a.close(), o(k));
    };
    l.value = "Новый набор", f("set-confirm").onclick = () => {
      const k = l.value.trim();
      k ? w(k) : l.focus();
    }, f("set-cancel").onclick = () => w(), a.oncancel = (k) => {
      k.preventDefault(), w();
    }, a.showModal(), l.focus(), l.select();
  }), M = () => {
    E = !0, f("dirty").textContent = "Есть несохранённые изменения";
  }, A = () => {
    const o = t.projectToken();
    return !o || o === s ? !1 : (!s && (n.checks.length || n.sets.length) ? ue.set(o, n) : n = ue.get(o) || ve(), ue.set(o, n), s = o, r = void 0, m = n.checks[0]?.id || "", p = "", x.clear(), u = 0, E = !1, t.clear(), f("dirty").textContent = "", !0);
  }, G = () => {
    const o = I();
    o?.lastRun && (o.status = "stale"), M(), P();
  }, L = () => [
    ...new Set(
      (r?.elements || []).flatMap((o) => Object.keys(o.properties))
    )
  ].sort(), oe = (o, a) => o.map(
    (l) => `<option value="${Q(l)}" ${l === a ? "selected" : ""}>${Q(l)}</option>`
  ).join("");
  function S() {
    const o = I(), a = f("result-search")?.value.toLowerCase() || "", l = f("result-state")?.value || "", b = Number(f("result-depth")?.value || 0);
    return (o?.results || []).filter(
      (w) => (!l || w.state === l) && (o?.type === "duplicates" || (w.penetrationMm ?? 0) >= b) && (!a || JSON.stringify({ ...w, image: void 0 }).toLowerCase().includes(a))
    );
  }
  function P() {
    const o = f("test-search").value.toLowerCase();
    f("checks").innerHTML = n.checks.filter((a) => a.name.toLowerCase().includes(o)).map(
      (a) => `<button class="check-item ${a.id === m ? "active" : ""}" data-check="${a.id}"><strong>${Q(a.name)}</strong><small>${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[a.status]} · ${a.results.filter((l) => !["resolved", "excluded"].includes(l.state)).length} в работе / ${a.results.length}</small></button>`
    ).join("");
  }
  function U(o, a) {
    const l = r?.elements.filter(
      ($) => (I().includeHidden || !$.hidden) && ge($, o)
    ).length || 0, b = o.manualOnly ? H(o) : o.modelsMode === "selected" ? o.models : (r?.models || []).map(($) => $.id), w = r && b.every(($) => r.indexedModelIds.includes($)) ? `${l} элементов` : "число после запуска", k = r?.models || [], h = o.modelsMode !== "selected", j = n.sets.map(
      ($) => `<option value="${Q($.id)}" ${o.presetId === $.id ? "selected" : ""}>${Q($.name)}</option>`
    ).join("");
    return `<article class="selection" data-side="${a}"><h3>Выбор ${a.toUpperCase()} <span data-selection-count>${w}</span></h3>${o.manualOnly ? '<p class="selection-mode">Только элементы, выбранные вручную</p>' : ""}<div class="preset-row"><select class="preset"><option value="">Набор моделей…</option>${j}</select><button data-selection="load-set">Применить</button><button data-selection="save-set">Сохранить набор</button><button data-selection="delete-set" ${o.presetId ? "" : "disabled"}>Удалить</button></div><div class="model-list"><label class="model-all"><input type="checkbox" class="all-models" ${h ? "checked" : ""}> Все модели</label>${k.map(($) => `<label><input type="checkbox" class="model-check" value="${Q($.id)}" ${h || o.models.includes($.id) ? "checked" : ""}> ${Q($.name)}</label>`).join("") || "<small>Нажмите «Обновить модели».</small>"}</div><small>Отметьте файлы, которые должны участвовать в выборе ${a.toUpperCase()}.</small><div class="selection-tools"><button data-selection="show">Показать выбранные элементы</button><button data-selection="only">Только выделенные в 3D</button><button data-selection="include">＋ Добавить из 3D</button><button data-selection="exclude">− Исключить из 3D</button><button data-selection="reset">Сбросить ручной выбор</button></div><small>Добавлено вручную: ${o.include.length} · исключено: ${o.exclude.length}</small></article>`;
  }
  function D() {
    P();
    const o = I();
    f("name").value = o?.name || "";
    for (const a of ["name", "copy", "delete", "run"])
      f(a).disabled = !o || g;
    for (const a of i.querySelectorAll("[data-tab]"))
      a.classList.toggle("active", a.dataset.tab === d);
    if (!o) {
      f("content").innerHTML = '<div class="empty"><h2>Создайте первую проверку</h2><p>Обновите модели, затем выберите, какие элементы проверять друг с другом.</p></div>';
      return;
    }
    d === "select" && (f("content").innerHTML = `<div class="choose-layout"><div class="parameters"><h3>Параметры проверки</h3><label>Тип<select id="type"><option value="intersection" ${o.type === "intersection" ? "selected" : ""}>По пересечению</option><option value="duplicates" ${o.type === "duplicates" ? "selected" : ""}>Дублирование</option></select></label><label title="Числовая погрешность расчёта">Точность расчёта, мм<input id="precision" type="number" value="${o.precision}" min="0.001" max="100" step="0.1"></label><label title="Конфликты с меньшим расчётным вхождением не попадут в результат">Минимальное вхождение, мм<input id="min-penetration" type="number" value="${o.minPenetration}" min="0" max="100000" step="1" ${o.type === "duplicates" ? "disabled" : ""}></label><label class="check"><input id="touching" type="checkbox" ${o.touching ? "checked" : ""} ${o.type === "duplicates" ? "disabled" : ""}>Учитывать касания</label><small>Касание — соприкосновение поверхностей без проникновения. Обычно выключено. Вхождение для произвольной IFC-геометрии является расчётной оценкой.</small><p class="legend"><span class="part-a">● Пересекающиеся элементы</span></p></div><div class="selection-grid">${U(o.a, "a")}${U(o.b, "b")}</div></div><datalist id="property-fields">${oe(L(), "")}</datalist>`), d === "rules" && (f("content").innerHTML = `<div class="rules"><h3>Исключение пар</h3><p>Элемент сам с собой не проверяется. Пара А/Б учитывается один раз.</p><label class="check"><input id="same-model" type="checkbox" ${o.ignoreSameModel ? "checked" : ""}>Не проверять элементы одной модели</label><label class="check"><input id="same-group" type="checkbox" ${o.ignoreSameGroup ? "checked" : ""}>Не проверять геометрию одного составного объекта</label><label>Не проверять пары с одинаковым значением свойства<input id="equal-property" list="property-fields" value="${Q(o.equalProperty)}" placeholder="Без ограничения"></label><label class="check"><input id="hidden" type="checkbox" ${o.includeHidden ? "checked" : ""}>Включать скрытые элементы прочитанных моделей</label><p>Незагруженные подключённые файлы нужно открыть перед расчётом.</p><datalist id="property-fields">${oe(L(), "")}</datalist></div>`), d === "results" && (f("content").innerHTML = `<div class="result-tools"><input id="result-search" type="search" placeholder="Поиск по результатам"><select id="result-state"><option value="">Все состояния</option>${Object.entries(
      re
    ).map(([a, l]) => `<option value="${a}">${l}</option>`).join(
      ""
    )}</select>${o.type === "intersection" ? '<input id="result-depth" type="number" min="0" step="1" placeholder="Вхождение от, мм">' : ""}<button id="show-markers" role="switch" aria-checked="${C}">${C ? "● Знаки включены" : "○ Знаки выключены"}</button><select id="bulk-state">${Object.entries(
      re
    ).map(([a, l]) => `<option value="${a}">${l}</option>`).join(
      ""
    )}</select><button id="bulk">Применить к выбранным</button></div><div class="result-area"><div class="table-area"><div class="scroll" id="table"></div><div class="pager"><button id="prev-page">←</button><span id="page"></span><button id="next-page">→</button><span id="selection-count"></span></div></div><div class="detail" id="detail"></div></div>`, W(), K()), d === "report" && (f("content").innerHTML = `<div class="report"><h3>${Q(o.name)}</h3><p>Результатов: ${o.results.length}. Выбрано: ${x.size}. ${o.status === "stale" ? "Результаты устарели — рекомендуется повторный запуск." : ""}</p><label class="check"><input id="selected-only" type="checkbox" ${x.size ? "checked" : ""}>Только выбранные строки</label><label class="check"><input id="report-images" type="checkbox" checked>Добавить снимки (недостающие будут созданы автоматически)</label><button id="export-html" class="primary">Сформировать HTML-отчёт</button><button id="export-viewer">Сессия для плагина «Коллизии»</button><p>Правила и все результаты сохраняются кнопкой «Сохранить проверки» в верхней панели.</p></div>`), f("content").inert = g;
  }
  function W() {
    const o = I(), a = S(), l = Math.max(1, Math.ceil(a.length / 50));
    u = Math.max(0, Math.min(u, l - 1));
    const b = a.slice(u * 50, u * 50 + 50);
    f("table").innerHTML = a.length ? `<table><thead><tr><th><input id="check-page" type="checkbox" aria-label="Выбрать страницу" ${b.every((w) => x.has(w.id)) ? "checked" : ""}></th>${["№", "Состояние", "Вхождение, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "Комментарий"].map((w) => `<th>${w}</th>`).join("")}</tr></thead><tbody>${b.map((w, k) => `<tr data-result="${Q(w.id)}" class="${w.id === p ? "active" : ""}"><td><input type="checkbox" class="row-check" aria-label="Выбрать конфликт" ${x.has(w.id) ? "checked" : ""}></td>${[u * 50 + k + 1, re[w.state], o.type === "duplicates" ? "—" : (w.penetrationMm ?? 0).toFixed(1), w.a.name, w.a.model, w.a.guid || "—", w.b.name, w.b.model, w.b.guid || "—", w.note].map((h) => `<td title="${Q(h)}">${Q(h)}</td>`).join("")}</tr>`).join("")}</tbody></table>` : '<div class="empty">Нет результатов. Запустите проверку или измените фильтры.</div>', f("page").textContent = `Страница ${u + 1} из ${l} · ${a.length} результатов`, f("selection-count").textContent = `Выбрано: ${x.size}`, f("prev-page").disabled = u === 0, f("next-page").disabled = u === l - 1;
  }
  function K() {
    const o = I()?.results.find((a) => a.id === p);
    f("detail").innerHTML = o ? `<h3>${Q(o.a.name)} × ${Q(o.b.name)}</h3><p class="legend"><span class="part-a">● Пересекающиеся элементы выделены красным</span></p><p>${I()?.type === "duplicates" ? "Дублирование" : `Расчётное вхождение: ${(o.penetrationMm ?? 0).toFixed(1)} мм`}</p>${o.image ? `<button id="open-image" class="preview"><img src="${Q(o.image)}" alt="Снимок коллизии"><span>Открыть крупнее</span></button>` : ""}<button id="capture-image">Снимок пары</button><div class="selection-tools"><button id="focus" class="primary">Перейти в 3D</button><button id="previous">←</button><button id="next">→</button></div><p>${o.point.map((a, l) => `${["X", "Y", "Z"][l]}: ${a.toFixed(4)}`).join(" · ")}</p><label>Состояние<select id="edit-state">${Object.entries(
      re
    ).map(
      ([a, l]) => `<option value="${a}" ${o.state === a ? "selected" : ""}>${l}</option>`
    ).join(
      ""
    )}</select></label><label>Назначение<input id="assignee" value="${Q(o.assignee)}"></label><label>Комментарий<textarea id="note" rows="3">${Q(o.note)}</textarea></label>${[
      o.a,
      o.b
    ].map(
      (a, l) => `<details><summary>Элемент ${l ? "Б" : "А"} · свойства</summary><dl>${Object.entries(
        a.properties
      ).map(([b, w]) => `<dt>${Q(b)}</dt><dd>${Q(w)}</dd>`).join("")}</dl></details>`
    ).join("")}` : "<p>Выберите конфликт в таблице.</p>";
  }
  const H = (o) => {
    const a = new Set(
      !o.manualOnly && o.modelsMode === "selected" ? o.models : []
    );
    for (const l of o.include)
      try {
        a.add(String(JSON.parse(l)[0]));
      } catch {
        const b = r?.elements.find(
          (w) => w.id === l
        )?.modelId;
        b && a.add(b);
      }
    return [...a];
  }, V = () => {
    const o = I();
    if (!(!o || d !== "select"))
      for (const a of i.querySelectorAll("[data-side]")) {
        const l = a.dataset.side, b = [...a.querySelectorAll(".model-check")];
        if (!b.length) continue;
        const w = b.filter((j) => j.checked).map((j) => j.value), k = w.length === b.length, h = o[l];
        h.modelsMode = k ? "all" : "selected", h.models = k ? [] : w, h.conditions = [], h.mode = "all";
      }
  }, _ = (o) => {
    if (!o?.length) return;
    const a = /* @__PURE__ */ new Set();
    for (const l of o)
      for (const b of [l.a, l.b]) {
        if (!b.manualOnly && b.modelsMode !== "selected") return;
        for (const w of H(b)) a.add(w);
      }
    return a;
  }, ie = () => {
    const o = I();
    if (o)
      for (const a of i.querySelectorAll("[data-side]")) {
        const l = a.dataset.side, b = r?.elements.filter(
          (j) => (o.includeHidden || !j.hidden) && ge(j, o[l])
        ).length || 0, w = o[l].manualOnly ? H(o[l]) : o[l].modelsMode === "selected" ? o[l].models : (r?.models || []).map((j) => j.id), k = !!r && w.every((j) => r.indexedModelIds.includes(j)), h = a.querySelector(
          "[data-selection-count]"
        );
        h && (h.textContent = k ? `${b} элементов` : "число после запуска");
      }
  };
  function X() {
    t.markers(
      S(),
      p,
      C,
      (o) => N(() => ee(o, !0))
    );
  }
  function ee(o, a = !1) {
    if (!g) {
      if (p = o, d === "results") {
        for (const l of i.querySelectorAll("[data-result]"))
          l.classList.toggle("active", l.dataset.result === o);
        K();
      }
      if (X(), a) {
        const l = I()?.results.find((b) => b.id === o);
        l && t.focus(l, Number(f("distance").value));
      }
    }
  }
  async function te(o, a = !1) {
    A();
    const l = a ? /* @__PURE__ */ new Set() : _(o);
    r = await t.scan(q, () => y, l), f("model-count").textContent = `Проиндексировано моделей: ${r.indexedModelIds.length} из ${r.models.length} · элементов: ${r.elements.length}`, D(), q(
      r.blockers.length ? r.blockers.join(" ") : r.warnings.length ? `Модели прочитаны с замечаниями. ${r.warnings.join(" ")}` : "Модели прочитаны. Настройте выборки и запустите проверку.",
      !!r.blockers.length
    );
  }
  const Y = (o) => {
    g = o;
    for (const a of [
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
      f(a).disabled = o;
    f("cancel").hidden = !o, f("content").inert = o, f("checks").inert = o;
  };
  async function F(o) {
    const a = (b) => q(`${o.name} · ${b.phase} ${b.done}/${b.total} · найдено ${b.found}`);
    let l;
    try {
      l = new et();
    } catch {
      return _e(
        r.elements,
        o,
        a,
        () => y,
        (b) => t.geometry(b, () => y)
      );
    }
    return v = l, new Promise((b, w) => {
      const k = () => {
        l.terminate(), v = void 0, z = void 0;
      };
      z = () => {
        k(), w(Error("Расчёт отменён. Предыдущие результаты сохранены."));
      }, l.onmessage = async (h) => {
        if (h.data.load) {
          try {
            const j = await t.geometry(
              h.data.load,
              () => y || v !== l
            );
            if (v !== l) return;
            const $ = [
              j.vertices?.buffer,
              j.indices?.buffer
            ].filter(Boolean);
            l.postMessage(
              { request: h.data.request, geometry: j },
              $
            );
          } catch (j) {
            v === l && l.postMessage({
              request: h.data.request,
              error: j instanceof Error ? j.message : String(j)
            });
          }
          return;
        }
        h.data.progress ? a(h.data.progress) : (k(), h.data.error ? w(Error(h.data.error)) : b(h.data.results));
      }, l.onerror = (h) => {
        k(), w(
          Error(
            `Не удалось запустить расчёт в фоновом потоке: ${h.message || "ошибка загрузки"}`
          )
        );
      }, l.postMessage({
        elements: r.elements,
        streaming: typeof t.geometry == "function",
        check: structuredClone({ ...o, results: [], warnings: [] })
      });
    });
  }
  async function de(o = !1) {
    if (g) return;
    A(), V();
    const a = o ? [...n.checks] : [I()].filter(Boolean);
    if (!a.length) throw Error("Создайте проверку.");
    for (const l of a)
      for (const b of [l.a, l.b])
        b.conditions = [], b.mode = "all";
    y = !1, Y(!0);
    try {
      if (await te(a), Y(!0), r.blockers.length)
        throw Error(
          "Состав моделей прочитан не полностью. " + r.blockers.join(" ")
        );
      for (const l of a) {
        if (y) break;
        for (const h of [l.a, l.b]) {
          if (h.modelsMode === "selected" && h.models.some((j) => !r.models.some(($) => $.id === j)))
            throw Error(
              `${l.name}: одна из моделей выборки отсутствует. Исправьте выборку.`
            );
          if (h.include.some((j) => !r.elements.some(($) => $.id === j)))
            throw Error(
              `${l.name}: вручную добавленный элемент отсутствует в модели.`
            );
        }
        const b = Ye(l);
        if (l.configAtRun === b && l.modelsAtRun?.some(
          (h) => !r.models.some((j) => j.id === h)
        ))
          throw Error(
            `${l.name}: состав моделей уменьшился. Подключите прежние модели или создайте копию проверки для нового состава. Прежние результаты сохранены.`
          );
        const w = await F(l);
        if (y || !t.isCurrent())
          throw Error(
            "Проект изменился или расчёт отменён. Предыдущие результаты сохранены."
          );
        const k = (/* @__PURE__ */ new Date()).toISOString();
        l.results = Qe(
          l.configAtRun === b ? l.results : [],
          w,
          k
        ), l.lastRun = k, l.fingerprint = r.fingerprint, l.configAtRun = b, l.modelsAtRun = [...r.indexedModelIds], l.status = "done", l.warnings = [...r.warnings], m = l.id, p = l.results[0]?.id || "", x.clear(), M();
      }
      d = "results", D(), X(), q(
        `Проверка завершена. ${I()?.results.length || 0} результатов. Сохраните проверки для продолжения работы.`
      );
    } finally {
      Y(!1), D();
    }
  }
  function he(o) {
    const a = o.closest("[data-side]")?.dataset.side;
    if (!a) return;
    const l = I()[a], b = o, w = o.closest("[data-side]");
    if (b.classList.contains("preset")) {
      l.presetId = b.value || void 0, w.querySelector(
        '[data-selection="delete-set"]'
      ).disabled = !l.presetId;
      return;
    }
    if (b.classList.contains("all-models")) {
      for (const k of w.querySelectorAll(
        ".model-check"
      ))
        k.checked = b.checked;
      l.modelsMode = b.checked ? "all" : "selected", l.models = [], l.manualOnly = !1, l.presetId = void 0;
    }
    if (b.classList.contains("model-check")) {
      const k = [
        ...w.querySelectorAll(".model-check")
      ], h = k.filter(($) => $.checked).map(($) => $.value), j = k.length > 0 && h.length === k.length;
      w.querySelector(".all-models").checked = j, l.modelsMode = j ? "all" : "selected", l.models = j ? [] : h, l.manualOnly = !1, l.presetId = void 0;
    }
    l.conditions = [], l.mode = "all", G(), ie();
  }
  f("new").onclick = () => {
    const o = Ge();
    o.name = `Проверка ${n.checks.length + 1}`, n.checks.push(o), m = o.id, d = "select", p = "", x.clear(), M(), D();
  }, f("scan").onclick = () => N(async () => {
    V(), y = !1, Y(!0);
    try {
      const o = I();
      await te(o ? [o] : void 0, !o);
    } finally {
      Y(!1), D();
    }
  }), f("run").onclick = () => N(() => de()), f("all").onclick = () => N(() => de(!0)), f("cancel").onclick = () => {
    y = !0, z?.();
  }, f("test-search").oninput = P, f("checks").onclick = (o) => {
    const a = o.target.closest(
      "[data-check]"
    );
    a && !g && (t.clear(), m = a.dataset.check, p = "", x.clear(), u = 0, D());
  }, f("tabs").onclick = (o) => {
    const a = o.target.closest("[data-tab]");
    a && !g && (d = a.dataset.tab, D());
  }, f("name").onchange = () => {
    const o = I();
    o && (o.name = f("name").value.trim() || "Проверка", M(), P());
  }, f("copy").onclick = () => {
    const o = I();
    if (!o) return;
    const a = structuredClone(o);
    Object.assign(a, {
      id: crypto.randomUUID(),
      name: o.name + " — копия",
      results: [],
      lastRun: void 0,
      fingerprint: void 0,
      configAtRun: void 0,
      status: "new"
    }), n.checks.push(a), m = a.id, p = "", x.clear(), M(), D();
  }, f("delete").onclick = () => {
    I() && confirm(`Удалить проверку «${I().name}» и её результаты?`) && (n.checks = n.checks.filter((o) => o.id !== m), m = n.checks[0]?.id || "", x.clear(), t.clear(), M(), D());
  }, f("clear-project").onclick = () => {
    !n.checks.length && !n.sets.length || confirm(
      "Очистить проверки, наборы моделей и результаты текущего проекта?"
    ) && (n.checks = [], n.sets = [], r = void 0, m = "", p = "", x.clear(), t.clear(), M(), f("model-count").textContent = "Модели не прочитаны", D(), q("Данные проверок текущего проекта очищены."));
  }, f("save").onclick = () => {
    $e("НашеПО-проверки.json", JSON.stringify(n, null, 2)), E = !1, f("dirty").textContent = "Файл проверок сохранён";
  }, f("open").onclick = () => f("file").click(), f("file").onchange = () => N(async () => {
    const o = f("file").files?.[0];
    if (!o) return;
    const a = Ve(await o.text());
    E && !confirm("Заменить текущие несохранённые проверки данными из файла?") || (n = a, s && ue.set(s, n), m = n.checks[0]?.id || "", p = "", x.clear(), t.clear(), E = !1, f("dirty").textContent = "Проверки открыты", D(), q("Проверки открыты. Обновите модели перед переходом к элементам."), f("file").value = "");
  });
  for (const o of ["settings", "help"])
    f(o).onclick = () => f(o + "-dialog").showModal();
  for (const o of i.querySelectorAll("[data-close]"))
    o.onclick = () => f(o.dataset.close).close();
  f("content").onchange = (o) => N(() => {
    const a = o.target, l = I();
    if (!l) return;
    if (a.closest("[data-side]")) {
      he(a);
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
    ].includes(a.id)) {
      if (a.id === "precision") {
        const w = Number(a.value);
        if (!Number.isFinite(w) || w < 1e-3 || w > 100)
          throw a.value = String(l.precision), Error("Точность должна быть от 0,001 до 100 мм.");
        l.precision = w;
      }
      if (a.id === "min-penetration") {
        const w = Number(a.value);
        if (!Number.isFinite(w) || w < 0 || w > 1e5)
          throw a.value = String(l.minPenetration), Error(
            "Минимальное вхождение должно быть от 0 до 100 000 мм."
          );
        l.minPenetration = w;
      }
      a.id === "type" && (l.type = a.value), a.id === "touching" && (l.touching = a.checked), a.id === "same-model" && (l.ignoreSameModel = a.checked), a.id === "same-group" && (l.ignoreSameGroup = a.checked), a.id === "hidden" && (l.includeHidden = a.checked), a.id === "equal-property" && (l.equalProperty = a.value), G(), D();
      return;
    }
    if (a.id === "result-state") {
      u = 0, W();
      return;
    }
    if (a.id === "check-page") {
      for (const w of S().slice(u * 50, u * 50 + 50))
        a.checked ? x.add(w.id) : x.delete(w.id);
      W();
      return;
    }
    if (a.classList.contains("row-check")) {
      const w = a.closest("[data-result]").dataset.result;
      a.checked ? x.add(w) : x.delete(w), f("selection-count").textContent = `Выбрано: ${x.size}`;
      return;
    }
    const b = l.results.find((w) => w.id === p);
    b && (a.id === "edit-state" && (b.state = a.value, W(), P(), X()), a.id === "assignee" && (b.assignee = a.value), a.id === "note" && (b.note = a.value, W()), M());
  }), f("content").oninput = (o) => {
    const a = o.target;
    (a.id === "result-search" || a.id === "result-depth") && (u = 0, W());
    const l = I(), b = Number(a.value);
    l && a.id === "precision" && Number.isFinite(b) && b >= 1e-3 && b <= 100 && (l.precision = b, G()), l && a.id === "min-penetration" && Number.isFinite(b) && b >= 0 && b <= 1e5 && (l.minPenetration = b, G());
  }, f("content").onclick = (o) => N(async () => {
    const a = o.target, l = a.closest("button"), b = I();
    if (!b) return;
    if (l?.dataset.selection) {
      const k = l.closest("[data-side]").dataset.side, h = b[k], j = f("content").scrollTop;
      let $ = !0;
      switch (l.dataset.selection) {
        case "load-set": {
          const O = n.sets.find((B) => B.id === h.presetId);
          if (!O) throw Error("Выберите сохранённый набор моделей.");
          Object.assign(h, structuredClone(O.selection), {
            conditions: [],
            mode: "all",
            include: [],
            exclude: [],
            manualOnly: !1,
            presetId: O.id
          });
          break;
        }
        case "save-set": {
          if (h.manualOnly)
            throw Error(
              "Ручную выборку элементов нельзя сохранить как набор моделей."
            );
          const O = await le();
          if (!O) return;
          const B = {
            id: crypto.randomUUID(),
            name: O,
            selection: {
              models: [...h.models],
              modelsMode: h.modelsMode,
              conditions: [],
              mode: "all"
            }
          };
          n.sets.push(B), h.presetId = B.id, $ = !1;
          break;
        }
        case "delete-set": {
          const O = n.sets.find((B) => B.id === h.presetId);
          if (!O) throw Error("Выберите сохранённый набор моделей.");
          if (!confirm(`Удалить набор «${O.name}»?`)) return;
          n.sets = n.sets.filter((B) => B.id !== O.id);
          for (const B of n.checks)
            for (const Ee of [B.a, B.b])
              Ee.presetId === O.id && (Ee.presetId = void 0);
          $ = !1;
          break;
        }
        case "show":
          t.select(
            (r?.elements || []).filter((O) => (b.includeHidden || !O.hidden) && ge(O, h)).map((O) => O.id)
          );
          return;
        case "only": {
          const O = t.selected();
          if (!O.length) throw Error("Выделите элементы в 3D-сцене.");
          h.include = O, h.exclude = [], h.manualOnly = !0;
          break;
        }
        case "include": {
          const O = t.selected();
          if (!O.length) throw Error("Выделите элементы в 3D-сцене.");
          h.include = [.../* @__PURE__ */ new Set([...h.include, ...O])], h.exclude = h.exclude.filter((B) => !O.includes(B));
          break;
        }
        case "exclude": {
          const O = t.selected();
          if (!O.length) throw Error("Выделите элементы в 3D-сцене.");
          h.exclude = [.../* @__PURE__ */ new Set([...h.exclude, ...O])], h.include = h.include.filter((B) => !O.includes(B));
          break;
        }
        case "reset":
          h.manualOnly = !1, h.include = [], h.exclude = [];
      }
      $ ? G() : M(), D(), f("content").scrollTop = j;
      return;
    }
    if (l?.id === "prev-page" && (u--, W()), l?.id === "next-page" && (u++, W()), l?.id === "show-markers" && (C = !C, l.textContent = C ? "● Знаки включены" : "○ Знаки выключены", l.setAttribute("aria-checked", String(C)), X()), l?.id === "bulk") {
      const k = f("bulk-state").value;
      for (const h of b.results) x.has(h.id) && (h.state = k);
      M(), W(), K(), P(), X();
    }
    if (l?.id === "capture-image") {
      const k = b.results.find((h) => h.id === p);
      if (k) {
        y = !1, Y(!0);
        try {
          k.image = await t.snapshot(
            k,
            Number(f("distance").value),
            () => y,
            !0
          ), k.imageScope = "pair", M(), K(), q("Снимок сохранён в результат.");
        } finally {
          Y(!1);
        }
      }
      return;
    }
    if (l?.id === "open-image") {
      const k = b.results.find((h) => h.id === p);
      if (k?.image) {
        const h = document.createElement("dialog");
        h.className = "image-dialog", h.innerHTML = '<button>Закрыть</button><img alt="Снимок коллизии">', h.querySelector("img").src = k.image, h.querySelector("button").onclick = () => {
          h.close(), h.remove();
        }, i.append(h), h.showModal();
      }
      return;
    }
    if (l?.id === "focus" && ee(p, !0), l?.id === "previous" || l?.id === "next") {
      const k = S(), h = k.findIndex((j) => j.id === p) + (l.id === "next" ? 1 : -1);
      k[h] && (u = Math.floor(h / 50), W(), ee(k[h].id, !0));
    }
    if (l?.id === "export-html" || l?.id === "export-viewer") {
      const k = f("selected-only").checked ? b.results.filter((j) => x.has(j.id)) : b.results;
      if (!k.length) throw Error("Нет результатов для отчёта.");
      if (f("report-images").checked) {
        const j = t.view, $ = j?.storeView();
        y = !1, Y(!0);
        try {
          let O = 0;
          for (const B of k) {
            if (y)
              throw Error(
                "Подготовка отчёта отменена. Уже полученные снимки сохранены."
              );
            if (q("Подготовка снимков: " + ++O + " / " + k.length), !B.image || B.imageScope !== "pair") {
              if (B.state === "resolved" && !t.canLocate(B)) continue;
              B.image = await t.snapshot(
                B,
                Number(f("distance").value),
                () => y
              ), B.imageScope = "pair", M();
            }
          }
        } finally {
          if (j && t.isCurrent()) {
            const O = b.results.find((B) => B.id === p);
            if (O)
              try {
                t.focus(
                  O,
                  Number(f("distance").value),
                  !1
                );
              } catch {
              }
            $ && j.restoreView($);
          }
          Y(!1);
        }
      }
      const h = f("report-images").checked ? k.map(
        (j) => j.imageScope === "pair" ? j : { ...j, image: void 0 }
      ) : k.map((j) => ({ ...j, image: void 0 }));
      $e(
        b.name + (l.id === "export-html" ? ".html" : ".collision360.json"),
        l.id === "export-html" ? tt(b, h) : nt(b, h)
      ), q(
        "Отчёт подготовлен. Результатов: " + k.length + "; со снимками: " + h.filter((j) => j.image).length + "."
      );
    }
    const w = a.closest("[data-result]");
    w && !a.closest("input") && !window.getSelection()?.toString() && ee(w.dataset.result);
  }), f("content").ondblclick = (o) => {
    const a = o.target, l = a.closest("[data-result]");
    l && !a.closest("input") && N(() => ee(l.dataset.result, !0));
  };
  const J = setInterval(() => {
    g || (A() ? (f("model-count").textContent = "Модели не прочитаны", q(
      n.checks.length ? "Открыт другой проект. Показаны его проверки; обновите модели." : "Открыт другой проект. Для него ещё нет проверок."
    ), g || D()) : r && !t.isCurrent() && (r = void 0, t.clear(), f("model-count").textContent = "3D-окно изменилось", q("Активное 3D-окно изменилось. Обновите модели."), g || D()));
  }, 1500);
  return D(), () => {
    c(), clearInterval(J), y = !0, z?.(), v?.terminate(), t.clear();
  };
}
var Ie = /* @__PURE__ */ ((e) => (e.object = "object", e.drawing = "drawing", e.table = "table", e.record = "record", e.textStyle = "textstyle", e.textStyleTable = "textstyles", e.linetype = "linetype", e.linetypeTable = "linetypes", e.layer = "layer", e.layerTable = "layers", e.block = "block", e.blockTable = "blocks", e.layout = "layout", e.layoutTable = "layouts", e.type = "type", e.typeTable = "types", e.material = "material", e.materialTable = "materials", e.geometry = "geometry", e.geometryTable = "geometries", e.group = "group", e.groupTable = "groups", e.attachment = "attachment", e.attachmentTable = "attachments", e.entities = "entities", e.entity = "entity", e.line = "l", e.solid = "s", e.insert = "i", e.polyline = "p", e.circle = "c", e.arc = "a", e.polyline3d = "p3", e.proxy = "x", e.text = "t", e.mtext = "mt", e.wipeout = "w", e.model3d = "g", e.alignment = "al", e))(Ie || {});
async function rt(e, t) {
  if (await new Promise((p) => requestAnimationFrame(() => p())), t()) throw Error("Подготовка снимков отменена.");
  const { width: i, height: c } = e.camera, s = Array.from(document.querySelectorAll("canvas")).filter(
    (p) => {
      const u = p.getBoundingClientRect();
      return u.width > 100 && u.height > 100 && p.width > 0 && p.height > 0 && getComputedStyle(p).visibility !== "hidden" && (Math.abs(u.width - i) < 4 && Math.abs(u.height - c) < 4 || Math.abs(p.width - i) < 4 && Math.abs(p.height - c) < 4);
    }
  );
  if (!s.length)
    throw Error(
      "Снимок 3D-окна недоступен: откройте одно видимое окно модели."
    );
  const n = s[0].getBoundingClientRect();
  if (s.some((p) => {
    const u = p.getBoundingClientRect();
    return Math.abs(u.x - n.x) > 4 || Math.abs(u.y - n.y) > 4;
  }))
    throw Error(
      "Открыто несколько подходящих 3D-окон. Оставьте одно окно для снимка."
    );
  const r = document.createElement("canvas"), m = Math.min(1, 1280 / s[0].width);
  r.width = Math.round(s[0].width * m), r.height = Math.round(s[0].height * m);
  const d = r.getContext("2d");
  d.fillStyle = "#20242b", d.fillRect(0, 0, r.width, r.height), e.repaint();
  for (const p of s)
    d.drawImage(p, 0, 0, r.width, r.height);
  try {
    return r.toDataURL("image/jpeg", 0.82);
  } catch {
    throw Error("Браузер запретил чтение изображения 3D-окна.");
  }
}
const Me = "nashepo.checks.points", qe = "nashepo.checks.highlight";
function Ne(e) {
  let t = performance.now();
  return async () => {
    if (e()) throw Error("Операция отменена.");
    performance.now() - t >= 16 && (await new Promise((i) => setTimeout(i, 0)), t = performance.now());
  };
}
function ye(e, t, i, c = 0) {
  if (c > 12 || e == null) return;
  if (typeof e != "object") {
    i[t] = String(e);
    return;
  }
  if (Array.isArray(e)) {
    e.forEach((n, r) => ye(n, `${t}[${r}]`, i, c + 1));
    return;
  }
  const s = e;
  if ("$value" in s) {
    ye(s.$value, t, i, c + 1);
    return;
  }
  for (const [n, r] of Object.entries(s))
    n.startsWith("$") || ye(r, t ? `${t}.${n}` : n, i, c + 1);
}
function at(e) {
  const t = e.vertices.length / 3, i = (r) => Number.isFinite(e.vertices[r * 3]) && Number.isFinite(e.vertices[r * 3 + 1]) && Number.isFinite(e.vertices[r * 3 + 2]), c = (r) => {
    const m = e.indices[r], d = e.indices[r + 1], p = e.indices[r + 2];
    return m < t && d < t && p < t && m !== d && d !== p && p !== m && i(m) && i(d) && i(p);
  };
  let s = 0;
  for (let r = 0; r < e.indices.length; r += 3) c(r) && (s += 3);
  if (s === e.indices.length) return e.indices;
  const n = new Uint32Array(s);
  for (let r = 0, m = 0; r < e.indices.length; r += 3)
    c(r) && (n[m++] = e.indices[r], n[m++] = e.indices[r + 1], n[m++] = e.indices[r + 2]);
  return n;
}
const ze = (e) => /\.wdx(?:[?#].*)?$/i.test(e);
class lt {
  constructor(t) {
    this.ctx = t;
  }
  ctx;
  metadata = /* @__PURE__ */ new Map();
  refs = /* @__PURE__ */ new Map();
  overlay;
  pointView;
  scannedApp;
  scannedView;
  get view() {
    return this.ctx.manager.activeWindow?.context;
  }
  get app() {
    return this.ctx.manager.activeApp;
  }
  isCurrent() {
    return this.scannedApp === this.app && this.scannedView === this.view;
  }
  canLocate(t) {
    return this.isCurrent() && this.refs.has(t.a.id) && this.refs.has(t.b.id);
  }
  projectToken() {
    return this.app;
  }
  async scan(t, i, c) {
    const s = this.app, n = this.view, r = s?.model;
    if (!n || !r?.layouts || !r.attachments)
      throw Error(
        "Откройте проект Топоматик 360 с IFC или SMDX и сделайте его 3D-окно активным."
      );
    const m = [], d = [], p = [], u = [], g = /* @__PURE__ */ new Map(), y = /* @__PURE__ */ new Set();
    let v = 2166136261;
    const C = Ne(
      () => i() || s !== this.app || n !== this.view
    );
    let E = -1 / 0;
    const x = (I) => {
      for (let f = 0; f < I.length; f++)
        v = Math.imul(v ^ I.charCodeAt(f), 16777619);
    }, z = async (I, f, ne) => {
      if (y.has(I)) return;
      y.add(I);
      const q = I.layers.layer0?.modelName || f, N = f, le = ze(q) || ze(N);
      le || m.push({ id: N, name: q });
      const M = !le && (!c || c.has(N)), A = [];
      M && I.layouts.model?.walk((S) => (S.type === Ie.model3d ? A.push(S) : S.type === Ie.insert && d.push(`${q}: вставка блока не включена в расчёт.`), !1));
      const G = /* @__PURE__ */ new Map();
      for (const S of A) {
        const P = JSON.stringify([
          S.layer?.UUID || "",
          S.$id || S.$path
        ]);
        G.set(P, [S]);
      }
      let L = 0;
      for (const [S, P] of G) {
        if (i()) throw Error("Чтение моделей отменено.");
        if (s !== this.app || n !== this.view)
          throw Error(
            "Активный проект изменился. Запустите чтение моделей заново."
          );
        const U = P[0].layer, D = {};
        try {
          if (U) {
            const te = [];
            let Y = U;
            for (; Y && te.length < 64; )
              te.unshift(Y), Y = Y.layer;
            for (const F of te)
              ye(F.typedProperties(), "", D), F.typed?.name && (D.Тип = F.typed.name);
          }
        } catch {
          d.push(`${q} / ${S}: часть свойств недоступна.`);
        }
        const W = D["ifc.id"] || Object.entries(D).find(
          ([te]) => /(^|\.)(globalid|ifcguid|guid)$/i.test(te)
        )?.[1] || "", K = U?.name || P[0].$id || "Элемент", H = JSON.stringify([N, S]);
        Object.assign(D, {
          Модель: q,
          Имя: K,
          GUID: W,
          Объект: U?.UUID || S
        });
        const V = {
          min: [1 / 0, 1 / 0, 1 / 0],
          max: [-1 / 0, -1 / 0, -1 / 0]
        };
        let _ = !0, ie = !1, X = 0;
        for (const te of P) {
          _ &&= te.isClosed;
          for (const Y of Object.values(te.meshes)) {
            const F = Y.geometry;
            if (!F || F.indices.length % 3) {
              ie = !0;
              continue;
            }
            _ &&= Y.isClosed;
            for (let J = 0; J < F.vertices.length; J += 3) {
              const o = [
                F.vertices[J],
                F.vertices[J + 1],
                F.vertices[J + 2]
              ];
              if (Math3d.mat4.mulv3(o, te.matrix, o), !o.every(Number.isFinite)) {
                ie = !0;
                continue;
              }
              for (let a = 0; a < 3; a++)
                V.min[a] = Math.min(V.min[a], o[a]), V.max[a] = Math.max(V.max[a], o[a]);
              if (x(o.join(",")), J % 6e4 === 0 && (performance.now() - E > 200 && (E = performance.now(), t(
                "Индексирование: " + q + " · " + u.length + " элементов"
              )), await C(), i()))
                throw Error("Чтение моделей отменено.");
            }
            const de = F.vertices.length / 3, he = (J) => Number.isFinite(F.vertices[J * 3]) && Number.isFinite(F.vertices[J * 3 + 1]) && Number.isFinite(F.vertices[J * 3 + 2]);
            for (let J = 0; J < F.indices.length; J += 3) {
              const o = F.indices[J], a = F.indices[J + 1], l = F.indices[J + 2];
              if (v = Math.imul(v ^ o, 16777619), v = Math.imul(v ^ a, 16777619), v = Math.imul(v ^ l, 16777619), o < de && a < de && l < de && o !== a && a !== l && l !== o && he(o) && he(a) && he(l) ? X++ : ie = !0, J % 15e4 === 0 && (await C(), i()))
                throw Error("Чтение моделей отменено.");
            }
          }
        }
        if (ie || !X) {
          if (X || L++, !X) continue;
          _ = !1;
        }
        const ee = {
          id: H,
          name: K,
          model: q,
          modelId: N,
          guid: W,
          properties: D,
          hidden: ne || !!U?.resolveHidden() || !!U?.resolveDisabled(),
          triangles: new Float64Array(0),
          triangleCount: X,
          closed: _,
          bounds: V
        };
        x(JSON.stringify([H, D, ee.hidden])), u.push(ee), g.set(H, P);
      }
      L && d.push(
        `${q}: пропущено элементов без треугольной геометрии — ${L}.`
      );
      const oe = [];
      I.attachments.forEach((S) => {
        oe.push(S);
      });
      for (const S of oe) {
        const P = `${f}/${S.name || S.uri || S.$id}`;
        S.model ? await z(
          S.model,
          P,
          ne || S.hidden
        ) : (!c || c.has(P)) && p.push(
          `${S.name || S.uri || "Подключённая модель"}: модель не загружена. Откройте её перед расчётом.`
        );
      }
    };
    if (await z(r, r.layers.layer0?.modelName || "Проект", !1), !u.length && (!c || c.size > 0))
      throw Error(
        "В открытом проекте не найдены 3D-элементы с доступной геометрией."
      );
    return this.clear(), this.refs = g, this.metadata = new Map(u.map((I) => [I.id, I])), this.scannedApp = s, this.scannedView = n, {
      elements: u,
      fingerprint: `${u.length}:${v >>> 0}`,
      warnings: [...new Set(d)],
      blockers: [...new Set(p)],
      models: m,
      indexedModelIds: m.filter((I) => !c || c.has(I.id)).map((I) => I.id)
    };
  }
  async geometry(t, i) {
    const c = Ne(() => i() || !this.isCurrent());
    if (!this.isCurrent()) throw Error("Активная модель изменилась.");
    const s = this.metadata.get(t), n = this.refs.get(t);
    if (!s || !n) throw Error("Элемент отсутствует.");
    const r = n.flatMap(
      (v) => Object.values(v.meshes).flatMap((C) => {
        const E = C.geometry;
        if (!E || E.indices.length % 3) return [];
        const x = at(E);
        return x.length ? [{ object: v, g: E, indices: x }] : [];
      })
    );
    let m = 0, d = 0;
    for (const { g: v, indices: C } of r) {
      if (!v) throw Error("Геометрия недоступна.");
      m += v.vertices.length, d += C.length;
    }
    const p = new Float64Array(m), u = new Uint32Array(d);
    let g = 0, y = 0;
    for (const { object: v, g: C, indices: E } of r) {
      if (!C) throw Error("Геометрия недоступна.");
      for (let x = 0; x < C.vertices.length; x += 3) {
        const z = [C.vertices[x], C.vertices[x + 1], C.vertices[x + 2]];
        if (Math3d.mat4.mulv3(z, v.matrix, z), p.set(z, g + x), x % 6e4 === 0 && (await c(), i() || !this.isCurrent()))
          throw Error("Чтение геометрии отменено.");
      }
      for (let x = 0; x < E.length; x++)
        if (u[y + x] = g / 3 + E[x], x % 15e4 === 0 && (await c(), i()))
          throw Error("Чтение геометрии отменено.");
      g += C.vertices.length, y += E.length;
    }
    return { ...s, vertices: p, indices: u };
  }
  selected() {
    if (!this.isCurrent())
      throw Error("Сначала обновите модели текущего проекта.");
    const t = new Set(this.view?.layer.selectedObjects());
    return [...this.refs].filter(([, i]) => i.some((c) => t.has(c))).map(([i]) => i);
  }
  select(t) {
    if (!this.isCurrent())
      throw Error("Сначала обновите модели текущего проекта.");
    const i = new Set(t.flatMap((c) => this.refs.get(c) || []));
    this.view.layer.clearSelected(), this.view.layer.selectObjects((c) => i.has(c), !0), this.view.invalidate();
  }
  clear() {
    if (this.overlay && (this.overlay.view.layer.removeLayer(this.overlay.layer), this.overlay.view.invalidate(), this.overlay = void 0), this.pointView) {
      const t = this.pointView.annotations.get(Me);
      t && this.pointView.annotations.release(t), this.pointView.invalidate(), this.pointView = void 0;
    }
  }
  focus(t, i, c = !0) {
    if (!this.isCurrent())
      throw Error("Обновите модели текущего проекта перед переходом.");
    if (!Number.isFinite(i) || i < 0.5)
      throw Error("Дистанция камеры должна быть не менее 0,5 м.");
    if (!this.refs.has(t.a.id) || !this.refs.has(t.b.id))
      throw Error("Один из элементов отсутствует в загруженных моделях.");
    this.select([t.a.id, t.b.id]), this.highlight([t.a.id, t.b.id]);
    const s = t.point, n = this.view;
    n.camera?.id !== "3d" && n.setCameraType("3d");
    const r = [-0.65, 0.65, -0.394], m = Math.hypot(...r);
    r.forEach((d, p) => r[p] = d / m), n.lookAt(
      s.map((d, p) => d - r[p] * i),
      r,
      [0, 0, 1],
      c,
      s
    );
  }
  highlight(t) {
    this.overlay && (this.overlay.view.layer.removeLayer(this.overlay.layer), this.overlay = void 0);
    const i = this.view, c = [...new Set(t.flatMap((d) => this.refs.get(d) || []))], s = 4281743103, n = c.flatMap(
      (d) => Object.values(d.meshes).flatMap((p) => {
        const u = p.geometry;
        if (!u) return [];
        const g = {
          ...u,
          uuid: qe + "." + u.uuid,
          colors: new Uint32Array(u.vertices.length / 3).fill(s)
        };
        return [{ obj: d, geometry: g }];
      })
    ), m = {
      id: qe,
      order: 1e4,
      visible: !0,
      paint: () => {
      },
      paint3d: (d) => {
        const p = d.color, u = d.rasterizer.material;
        d.color = s, d.rasterizer.material = void 0;
        try {
          for (const { obj: g, geometry: y } of n) {
            d.pushMatrix();
            try {
              d.multMatrix(g.matrix), d.mesh(y);
            } finally {
              d.popMatrix();
            }
          }
        } finally {
          d.color = p, d.rasterizer.material = u;
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
    i.layer.addLayer(m), this.overlay = { view: i, layer: m }, i.invalidate();
  }
  async snapshot(t, i, c, s = !1) {
    if (!this.isCurrent())
      throw Error("Обновите модели перед созданием снимков.");
    if (!this.canLocate(t))
      throw Error("Элементы результата отсутствуют в открытых моделях.");
    const n = this.view, r = n.layer.drawing;
    if (!r)
      throw Error(
        "Слой моделей недоступен для снимка пары. Откройте 3D-окно проекта."
      );
    const m = r.visible, d = n.annotations.visible, p = new Set(n.layer.selectedObjects());
    try {
      return s ? this.highlight([t.a.id, t.b.id]) : this.focus(t, i, !1), n.pauseAnimation(), n.layer.clearSelected(), r.visible = !1, n.annotations.visible = !1, n.invalidate(), await rt(n, () => c() || !this.isCurrent());
    } finally {
      r.visible = m, n.annotations.visible = d, n.layer.clearSelected(), n.layer.selectObjects((u) => p.has(u), !0), n.invalidate();
    }
  }
  markers(t, i, c, s) {
    if (!this.isCurrent()) return;
    const n = this.view;
    this.pointView && this.pointView !== n && this.clear();
    const r = n.annotations.get(Me);
    if (r && n.annotations.release(r), this.pointView = n, !c) {
      n.invalidate();
      return;
    }
    const m = n.annotations.create(Me, 1e4), d = t.filter((p) => p.id !== i).concat(t.filter((p) => p.id === i));
    for (const p of d.slice(-3e3)) {
      if (p.state === "resolved") continue;
      const [u, g, y] = p.point, v = p.id === i, C = p.state === "excluded" ? "#78818c" : p.state === "approved" || p.state === "reviewed" ? "#28b94b" : "#e1372d", E = v ? "#f2c94c" : C, x = () => s(p.id), z = [
        { type: "line", a: [u, g, y], b: [u, g, y + 1], color: E, width: 5 },
        {
          type: "polyline",
          points: [
            [u - 0.65, g, y + 1],
            [u + 0.65, g, y + 1],
            [u, g, y + 2.2],
            [u - 0.65, g, y + 1]
          ],
          color: E,
          fillColor: C,
          width: v ? 5 : 2
        },
        {
          type: "line",
          a: [u, g - 0.01, y + 1.85],
          b: [u, g - 0.01, y + 1.4],
          color: "#ffffff",
          width: 4
        },
        {
          type: "line",
          a: [u, g - 0.01, y + 1.22],
          b: [u, g - 0.01, y + 1.27],
          color: "#ffffff",
          width: 4
        }
      ];
      m.add({
        id: p.id,
        type: "shaped",
        shapes: z,
        activeShapes: z,
        activateCommand: x,
        dblCommand: x
      }), v && m.add({
        id: p.id + ":label",
        type: "simple",
        position: [u, g, y + 2.35],
        label: `${p.a.name} × ${p.b.name}`,
        labelBackground: "#f2c94c",
        labelColor: "#171717",
        activateCommand: x
      });
    }
    n.invalidate();
  }
}
let Le;
const ct = {
  open(e) {
    e.manager.revealView("nashepo.collisionfinder360/checks_panel");
  },
  mount(e) {
    const t = e.el;
    if (!t) return;
    Le?.();
    const i = document.createElement("div");
    i.style.height = "100%", t.replaceChildren(i), Le = st(i, new lt(e));
  }
};
export {
  ct as default
};
