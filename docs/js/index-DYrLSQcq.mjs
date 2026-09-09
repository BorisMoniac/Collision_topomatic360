const Fe = `<h2>Работа с проверками</h2>
<details open><summary>1. Первая проверка</summary><ol><li>Откройте проект и подключите IFC/SMDX штатными средствами Топоматик 360.</li><li>Откройте нижнюю вкладку «Проверки» и нажмите «Обновить модели».</li><li>Нажмите «＋ Проверка» и задайте ей понятное имя.</li><li>Во вкладке «Выбрать» оставьте галочки только у нужных файлов в А и Б. «Все модели» включено по умолчанию.</li><li>Выберите «По пересечению» или «Дублирование» и нажмите «Запустить».</li><li>Во вкладке «Результаты» дважды нажмите строку: камера направится к конфликту, а пересекающиеся элементы будут выделены красным.</li></ol><p>Первое обновление без созданной проверки получает только список файлов. При запуске индексируются модели, отмеченные хотя бы в одной стороне. Файл проекта WDX служит контейнером и в выбор моделей не попадает.</p></details>
<details><summary>2. Выбор моделей и сохранённые наборы</summary><p>Выбор А и выбор Б задают две стороны сравнения. Снимите «Все модели» и отметьте конкретные IFC/SMDX. Для поиска дубликатов внутри одного файла отметьте его с обеих сторон.</p><p>Часто используемый состав можно сохранить как набор моделей, а затем применить в другой проверке. Наборы входят в файл проверок. Состав выборки задаётся галочками моделей и ручным выделением объектов.</p><p>IFC GUID читается из свойства <code>ifc.id</code>; также поддерживаются GlobalId, IfcGuid и GUID.</p></details>
<details><summary>3. Работа с выделением в 3D</summary><p>Сначала выделите элементы штатными средствами в 3D-окне, затем используйте кнопку в нужной стороне:</p><ul><li><b>Показать выбранные элементы</b> — выделяет весь текущий состав.</li><li><b>Только выделенные в 3D</b> — оставляет только выделенные объекты.</li><li><b>＋ Добавить из 3D</b> — добавляет выделенные объекты к моделям.</li><li><b>− Исключить из 3D</b> — исключает выделенные объекты.</li><li><b>Сбросить ручной выбор</b> — снова использует отмеченные модели.</li></ul><p>Ручные идентификаторы могут измениться после замены IFC/SMDX, поэтому такую выборку следует проверить заново.</p></details>
<details><summary>4. Пересечения, вхождение, касания и дубликаты</summary><p><b>Пересечение</b> фиксирует пересечение поверхностей или вложенность замкнутых тел. <b>Расчётное вхождение</b> — оценка глубины проникновения в миллиметрах. Поле «Минимальное вхождение» отсекает меньшие результаты, например значение 20 оставляет конфликты от 20 мм.</p><p>Для открытой или неполной поверхности надёжно определить глубину нельзя; такой результат получает нулевую оценку. «Точность расчёта» задаёт числовую погрешность. <b>Касание</b> — соприкосновение без проникновения; переключатель включает такие пары.</p><p><b>Дублирование</b> ищет совпадающие треугольники в одинаковых мировых координатах. Для дубликатов внутри файла отметьте его и в А, и в Б. Порядок вершин не важен; разная триангуляция одинаковой формы пока не сопоставляется.</p></details>
<details><summary>5. Составные объекты и неполная геометрия</summary><p>Один IFC-объект может состоять из нескольких частей. Чтобы не сравнивать его части между собой, включите «Не проверять геометрию одного составного объекта» во вкладке «Правила». Там же можно исключить пары одной модели или одинакового значения свойства.</p><p>Пустые и неполные геометрические части пропускаются, а пригодные части модели продолжают участвовать. Плагин показывает сводное замечание с количеством пропущенных элементов. Незагруженный подключённый файл блокирует расчёт только тогда, когда он входит в выборку.</p></details>
<details><summary>6. Результаты и состояния</summary><p>«Новый» найден впервые, «Активный» найден повторно, «Проверенный» рассмотрен, «Подтверждённый» подтверждён, «Исключённый» исключён из работы. «Исправленный» означает, что пара исчезла при повторном расчёте с теми же правилами; состояние можно изменить вручную.</p><p>В таблице доступны IFC GUID, расчётное вхождение, назначение и комментарий. Галочки меняют состояние сразу у нескольких строк. Значения можно выделять и копировать. Состояние «Устарела» у проверки означает, что после последнего расчёта изменили её тип, выборки, параметры или правила. Результаты сохраняются до нового успешного запуска.</p></details>
<details><summary>7. Отчёт и снимки</summary><p>Кнопка «Снимок пары» в карточке результата сохраняет текущий ракурс только с двумя элементами коллизии. Остальные модели и знаки временно скрываются, после снимка видимость сцены восстанавливается. При формировании отчёта снимки пар создаются автоматически; старые снимки всей сцены заменяются. В результатах и готовом отчёте доступны поиск, фильтр состояний и фильтр минимального вхождения.</p><p>Файл сессии предназначен для открытия результатов в плагине «НашеПО · Коллизии». Для исправленной пары с отсутствующими элементами используется сохранённый снимок пары, если он есть.</p></details>
<details><summary>8. Проекты, сохранение и очистка</summary><p>В пределах открытой страницы каждый проект получает собственный список проверок. При переключении проекта данные предыдущего не подмешиваются. «Очистить проект» удаляет проверки, результаты и наборы только у текущего проекта.</p><p>«Сохранить проверки» записывает правила, наборы моделей, результаты, комментарии и снимки в JSON. «Открыть проверки» загружает этот файл. Геометрия в файл не входит: соответствующие модели надо открыть отдельно. После закрытия или обновления страницы продолжение работы возможно из сохранённого файла.</p></details>
<details><summary>9. Большие проекты</summary><p>Жёсткого предела в 6 млн треугольников нет. При запуске строится индекс только по отмеченным моделям. Точная геометрия передаётся в расчёт по мере появления близких пар в компактном индексированном виде.</p><p>Время и память всё равно зависят от состава выборок и числа потенциальных пар. Разделяйте проверки по моделям и системам. В сцене одновременно показывается до 3000 знаков; при 50 000 результатах расчёт останавливается без замены прежнего результата.</p></details>`;
function Ge(e) {
  let t = e.parentElement, i;
  for (; t && !i; )
    i = [...t.children].find(
      (d) => d.classList.contains("resizer-horizontal")
    ), t = t.parentElement;
  if (!i) return () => {
  };
  const l = i, r = e.ownerDocument.defaultView;
  let n;
  const s = () => {
    if (n === void 0) return;
    const d = n;
    n = void 0, l.dispatchEvent(
      new MouseEvent("mouseup", { bubbles: !0, composed: !0 })
    ), l.hasPointerCapture(d) && l.releasePointerCapture(d);
  }, m = (d) => {
    d.button === 0 && (n = d.pointerId, l.setPointerCapture(d.pointerId));
  };
  return l.addEventListener("pointerdown", m), l.addEventListener("pointerup", s), l.addEventListener("pointercancel", s), l.addEventListener("lostpointercapture", s), r.addEventListener("blur", s), () => {
    s(), l.removeEventListener("pointerdown", m), l.removeEventListener("pointerup", s), l.removeEventListener("pointercancel", s), l.removeEventListener("lostpointercapture", s), r.removeEventListener("blur", s);
  };
}
const Ye = "0.3.2", ve = (e) => typeof e == "string" && /^data:image\/(jpeg|png);base64,[A-Za-z0-9+/=]+$/.test(e), le = {
  new: "Новый",
  active: "Активный",
  reviewed: "Проверенный",
  approved: "Подтверждённый",
  resolved: "Исправленный",
  excluded: "Исключённый"
}, Ae = () => ({
  models: [],
  modelsMode: "all",
  conditions: [],
  mode: "all",
  include: [],
  exclude: []
}), Ze = () => ({
  id: crypto.randomUUID(),
  name: "Новая проверка",
  type: "intersection",
  a: Ae(),
  b: Ae(),
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
}), Oe = ({
  triangles: e,
  vertices: t,
  indices: i,
  triangleCount: l,
  closed: r,
  bounds: n,
  ...s
}) => s;
function ye(e, t) {
  return t.exclude.includes(e.id) ? !1 : t.include.includes(e.id) ? !0 : !(t.manualOnly || t.modelsMode === "selected" && !t.models.includes(e.modelId) || t.modelsMode === void 0 && t.models.length && !t.models.includes(e.modelId));
}
const Qe = (e) => JSON.stringify([
  e.type,
  ...[e.a, e.b].map(
    ({
      models: t,
      modelsMode: i,
      conditions: l,
      mode: r,
      include: n,
      exclude: s,
      manualOnly: m
    }) => ({
      models: t,
      modelsMode: i,
      conditions: l,
      mode: r,
      include: n,
      exclude: s,
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
]), Ve = (e, t) => JSON.stringify([e, t].sort());
function Je(e, t, i) {
  const l = new Map(e.map((n) => [n.id, n])), r = t.map((n) => {
    const s = l.get(n.id);
    return l.delete(n.id), {
      ...n,
      note: s?.note ?? "",
      assignee: s?.assignee ?? "",
      firstSeen: s?.firstSeen ?? i,
      lastSeen: i,
      state: !s || s.state === "resolved" ? "new" : s.state === "new" ? "active" : s.state
    };
  });
  for (const n of l.values())
    r.push({
      ...n,
      state: n.state === "excluded" ? "excluded" : "resolved"
    });
  return r;
}
function Te(e) {
  const t = JSON.parse(e);
  if (t?.format !== "nashepo.checks" || t.version !== 1 || !Array.isArray(t.checks))
    throw Error("Это не файл проекта проверок НашеПО.");
  const i = /* @__PURE__ */ new Set();
  if (t.sets ??= [], !Array.isArray(t.sets) || !t.sets.every(
    (r) => r && typeof r.id == "string" && typeof r.name == "string" && r.selection && Array.isArray(r.selection.models) && r.selection.models.every((n) => typeof n == "string") && (r.selection.modelsMode === void 0 || ["all", "selected"].includes(r.selection.modelsMode)) && Array.isArray(r.selection.conditions) && r.selection.conditions.every(
      (n) => n && typeof n.field == "string" && typeof n.value == "string" && ["eq", "ne", "contains", "exists", "gt", "lt"].includes(
        n.op
      )
    ) && ["all", "any"].includes(r.selection.mode)
  ))
    throw Error("Некорректные наборы моделей.");
  const l = (r) => /\.wdx(?:[?#].*)?$/i.test(r);
  for (const r of t.sets)
    r.selection.models = r.selection.models.filter(
      (n) => !l(n)
    ), r.selection.conditions = [], r.selection.mode = "all", r.selection.modelsMode ??= r.selection.models.length ? "selected" : "all";
  for (const r of t.checks) {
    if (!r || typeof r.id != "string" || i.has(r.id) || typeof r.name != "string" || !["intersection", "duplicates"].includes(r.type) || !["new", "done", "stale"].includes(r.status) || !Number.isFinite(r.precision) || r.precision < 1e-3 || r.precision > 100 || r.minPenetration !== void 0 && (!Number.isFinite(r.minPenetration) || r.minPenetration < 0 || r.minPenetration > 1e5) || !Array.isArray(r.results))
      throw Error("Некорректные параметры проверки.");
    if (i.add(r.id), r.minPenetration ??= 0, ![
      "touching",
      "ignoreSameModel",
      "ignoreSameGroup",
      "includeHidden"
    ].every(
      (n) => typeof r[n] == "boolean"
    ) || typeof r.equalProperty != "string" || r.warnings !== void 0 && (!Array.isArray(r.warnings) || !r.warnings.every((n) => typeof n == "string")) || r.modelsAtRun !== void 0 && (!Array.isArray(r.modelsAtRun) || !r.modelsAtRun.every((n) => typeof n == "string")))
      throw Error("Некорректные правила проверки.");
    r.warnings ??= [], r.modelsAtRun = r.modelsAtRun?.filter((n) => !l(n));
    for (const n of [r.a, r.b]) {
      if (!n || n.manualOnly !== void 0 && typeof n.manualOnly != "boolean" || n.modelsMode !== void 0 && !["all", "selected"].includes(n.modelsMode) || n.presetId !== void 0 && typeof n.presetId != "string" || !["all", "any"].includes(n.mode) || ![n.models, n.include, n.exclude].every(
        (s) => Array.isArray(s) && s.every((m) => typeof m == "string")
      ) || !Array.isArray(n.conditions) || !n.conditions.every(
        (s) => s && typeof s.field == "string" && typeof s.value == "string" && ["eq", "ne", "contains", "exists", "gt", "lt"].includes(s.op)
      ))
        throw Error("Некорректная выборка.");
      n.modelsMode ??= n.models.length ? "selected" : "all", n.models = n.models.filter((s) => !l(s)), n.conditions = [], n.mode = "all";
    }
    for (const n of r.results) {
      if (n?.image !== void 0 && !ve(n.image))
        throw Error("Некорректный снимок результата.");
      if (n?.imageScope !== void 0 && n.imageScope !== "pair")
        throw Error("Некорректный состав снимка результата.");
      if (!n || typeof n.id != "string" || !Object.hasOwn(le, n.state) || n.penetrationMm !== void 0 && (!Number.isFinite(n.penetrationMm) || n.penetrationMm < 0) || !Array.isArray(n.point) || n.point.length !== 3 || !n.point.every(Number.isFinite))
        throw Error("Некорректный результат.");
      for (const s of [n.a, n.b])
        if (!s || !["id", "name", "model", "modelId", "guid"].every(
          (m) => typeof s[m] == "string"
        ) || !s.properties || typeof s.properties != "object")
          throw Error("Некорректный элемент результата.");
    }
  }
  return t;
}
const U = (e, t) => [e[0] - t[0], e[1] - t[1], e[2] - t[2]], fe = (e, t, i = 1) => [
  e[0] + t[0] * i,
  e[1] + t[1] * i,
  e[2] + t[2] * i
], J = (e, t) => e[0] * t[0] + e[1] * t[1] + e[2] * t[2], he = (e, t) => [
  e[1] * t[2] - e[2] * t[1],
  e[2] * t[0] - e[0] * t[2],
  e[0] * t[1] - e[1] * t[0]
], G = (e) => Math.hypot(...e), ae = (e) => e.triangleCount ?? (e.indices ? e.indices.length / 3 : e.triangles.length / 9), ce = (e, t, i) => e.indices && e.vertices ? e.vertices[e.indices[t * 3 + Math.floor(i / 3)] * 3 + i % 3] : e.triangles[t * 9 + i], ue = (e, t) => [0, 3, 6].map((i) => [
  ce(e, t, i),
  ce(e, t, i + 1),
  ce(e, t, i + 2)
]);
function De(e) {
  const t = [1 / 0, 1 / 0, 1 / 0], i = [-1 / 0, -1 / 0, -1 / 0];
  for (let l = 0; l < e.length; l++) {
    const r = l % 3;
    t[r] = Math.min(t[r], e[l]), i[r] = Math.max(i[r], e[l]);
  }
  return { min: t, max: i };
}
const Re = (e, t, i) => e.min.every((l, r) => l <= t.max[r] + i && e.max[r] >= t.min[r] - i);
function je(e, t) {
  const i = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const m of t)
    for (let d = 0; d < 9; d++) {
      const p = d % 3, u = ce(e, m, d);
      i.min[p] = Math.min(i.min[p], u), i.max[p] = Math.max(i.max[p], u);
    }
  if (t.length <= 12) return { ...i, ids: t };
  const l = i.max.map((m, d) => m - i.min[d]), r = l.indexOf(Math.max(...l)), n = (m) => ce(e, m, r) + ce(e, m, r + 3) + ce(e, m, r + 6);
  t.sort((m, d) => n(m) - n(d));
  const s = t.length >> 1;
  return {
    ...i,
    left: je(e, t.slice(0, s)),
    right: je(e, t.slice(s))
  };
}
function* ge(e, t, i) {
  Re(e, t, i) && (e.ids ? yield* e.ids : (yield* ge(e.left, t, i), yield* ge(e.right, t, i)));
}
function Ie(e, t) {
  const i = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const s of t)
    for (let m = 0; m < 3; m++)
      i.min[m] = Math.min(i.min[m], e[s].bounds.min[m]), i.max[m] = Math.max(i.max[m], e[s].bounds.max[m]);
  if (t.length <= 16) return { ...i, ids: t };
  const l = i.max.map((s, m) => s - i.min[m]), r = l.indexOf(Math.max(...l));
  t.sort(
    (s, m) => e[s].bounds.min[r] + e[s].bounds.max[r] - (e[m].bounds.min[r] + e[m].bounds.max[r])
  );
  const n = t.length >> 1;
  return {
    ...i,
    left: Ie(e, t.slice(0, n)),
    right: Ie(e, t.slice(n))
  };
}
function Ee(e, t, i, l) {
  const r = U(t, e), n = U(i[1], i[0]), s = U(i[2], i[0]), m = he(r, s), d = J(n, m);
  if (Math.abs(d) <= 1e-12 * G(r) * G(n) * G(s)) return;
  const p = 1 / d, u = U(e, i[0]), g = J(u, m) * p, y = he(u, n), v = J(r, y) * p, C = J(s, y) * p, I = l / Math.max(G(n), G(s), l);
  if (g >= -I && v >= -I && g + v <= 1 + I && C >= -I && C <= 1 + I)
    return fe(e, r, Math.max(0, Math.min(1, C)));
}
function He(e, t, i, l) {
  const r = i.map(Math.abs).indexOf(Math.max(...i.map(Math.abs))), n = [0, 1, 2].filter((d) => d !== r), s = (d, p, u) => (p[n[0]] - d[n[0]]) * (u[n[1]] - d[n[1]]) - (p[n[1]] - d[n[1]]) * (u[n[0]] - d[n[0]]), m = (d, p) => {
    const u = p.map((g, y) => s(g, p[(y + 1) % 3], d));
    return u.every((g) => g >= -l * G(i)) || u.every((g) => g <= l * G(i));
  };
  for (const d of e) if (m(d, t)) return d;
  for (const d of t) if (m(d, e)) return d;
  for (let d = 0; d < 3; d++)
    for (let p = 0; p < 3; p++) {
      const u = e[d], g = e[(d + 1) % 3], y = t[p], v = t[(p + 1) % 3], C = U(g, u), I = U(v, y), x = C[n[0]] * I[n[1]] - C[n[1]] * I[n[0]];
      if (Math.abs(x) < 1e-18) continue;
      const L = U(y, u), k = (L[n[0]] * I[n[1]] - L[n[1]] * I[n[0]]) / x, f = (L[n[0]] * C[n[1]] - L[n[1]] * C[n[0]]) / x;
      if (k >= 0 && k <= 1 && f >= 0 && f <= 1) return fe(u, C, k);
    }
}
function We(e, t, i, l) {
  const r = he(U(e[1], e[0]), U(e[2], e[0])), n = he(U(t[1], t[0]), U(t[2], t[0])), s = G(r), m = G(n);
  if (s < 1e-20 || m < 1e-20) return;
  const d = t.map((u) => J(U(u, e[0]), r) / s), p = e.map((u) => J(U(u, t[0]), n) / m);
  if (!(d.every((u) => u > i) || d.every((u) => u < -i) || p.every((u) => u > i) || p.every((u) => u < -i))) {
    if (d.every((u) => Math.abs(u) <= i) && p.every((u) => Math.abs(u) <= i))
      return l ? He(e, t, r, i) : void 0;
    if (!(!l && (!(Math.min(...d) < -i && Math.max(...d) > i) || !(Math.min(...p) < -i && Math.max(...p) > i))))
      for (let u = 0; u < 3; u++) {
        const g = Ee(e[u], e[(u + 1) % 3], t, i);
        if (g) return g;
        const y = Ee(t[u], t[(u + 1) % 3], e, i);
        if (y) return y;
      }
  }
}
function Xe(e, t, i) {
  const l = U(t[1], t[0]), r = U(t[2], t[0]), n = he(l, r), s = G(n);
  if (s < 1e-20 || Math.abs(J(U(e, t[0]), n)) / s > i) return !1;
  const m = U(e, t[0]), d = J(l, l), p = J(l, r), u = J(r, r), g = J(m, l), y = J(m, r), v = d * u - p * p;
  if (Math.abs(v) < 1e-30) return !1;
  const C = (g * u - y * p) / v, I = (y * d - g * p) / v, x = i / Math.max(G(l), G(r), i);
  return C >= -x && I >= -x && C + I <= 1 + x;
}
function xe(e, t, i, l) {
  if (!t.closed || e.some((g, y) => g <= t.bounds.min[y] + l || g >= t.bounds.max[y] - l))
    return !1;
  for (const g of ge(i, { min: e, max: e }, l))
    if (Xe(e, ue(t, g), l)) return !1;
  const r = [1, 0.371390676, 0.52999894], n = G(U(t.bounds.max, t.bounds.min)) * 3 + 1, s = fe(e, r, n), m = [], d = De([...e, ...s]);
  for (const g of ge(i, d, l)) {
    const y = Ee(e, s, ue(t, g), l);
    if (y) {
      const v = G(U(y, e));
      v > l && m.push(v);
    }
  }
  m.sort((g, y) => g - y);
  let p = 0, u = -1 / 0;
  for (const g of m)
    g - u > l * 2 && (p++, u = g);
  return p % 2 === 1;
}
function Me(e, t) {
  return Math.hypot(
    ...e.map((i, l) => Math.max(t.min[l] - i, 0, i - t.max[l]))
  );
}
function Ke(e, t) {
  const i = U(t[1], t[0]), l = U(t[2], t[0]), r = U(e, t[0]), n = J(i, r), s = J(l, r);
  if (n <= 0 && s <= 0) return G(r);
  const m = U(e, t[1]), d = J(i, m), p = J(l, m);
  if (d >= 0 && p <= d) return G(m);
  if (n * p - d * s <= 0 && n >= 0 && d <= 0) {
    const L = n / (n - d);
    return G(U(e, fe(t[0], i, L)));
  }
  const g = U(e, t[2]), y = J(i, g), v = J(l, g);
  if (v >= 0 && y <= v) return G(g);
  if (y * s - n * v <= 0 && s >= 0 && v <= 0) {
    const L = s / (s - v);
    return G(U(e, fe(t[0], l, L)));
  }
  if (d * v - y * p <= 0 && p - d >= 0 && y - v >= 0) {
    const L = U(t[2], t[1]), k = (p - d) / (p - d + (y - v));
    return G(U(e, fe(t[1], L, k)));
  }
  const x = he(i, l);
  return Math.abs(J(r, x)) / Math.max(G(x), 1e-30);
}
function _e(e, t, i) {
  let l = 1 / 0;
  const r = (n) => {
    if (Me(e, n) >= l) return;
    if (n.ids) {
      for (const d of n.ids)
        l = Math.min(l, Ke(e, ue(t, d)));
      return;
    }
    const s = n.left, m = n.right;
    Me(e, s) < Me(e, m) ? (r(s), r(m)) : (r(m), r(s));
  };
  return r(i), l;
}
async function et(e, t, i, l, r, n, s) {
  if (!e.closed || !t.closed) return 0;
  let m = 0;
  const d = (u, g, y) => {
    xe(u, g, y, n) && (m = Math.max(m, _e(u, g, y)));
  };
  d(r, e, i), d(r, t, l);
  let p = 0;
  for (const [u, g, y] of [
    [e, t, l],
    [t, e, i]
  ]) {
    const v = ae(u), C = Math.max(1, Math.floor(v / 1024));
    for (let I = 0; I < v; I += C) {
      const x = ue(u, I), L = x[0].map((q, z) => (x[0][z] + x[1][z] + x[2][z]) / 3), k = x[0].map((q, z) => (x[0][z] + x[1][z]) / 2), f = x[0].map((q, z) => (x[1][z] + x[2][z]) / 2), ie = x[0].map((q, z) => (x[2][z] + x[0][z]) / 2);
      for (const q of [x[0], x[1], x[2], k, f, ie, L])
        d(q, g, y);
      p++ % 32 === 0 && await s();
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
async function tt(e, t, i, l, r) {
  const n = t.precision / 1e3;
  if (!Number.isFinite(n) || n <= 0)
    throw Error("Точность расчёта должна быть положительным числом.");
  const s = e.filter((M) => t.includeHidden || !M.hidden), m = s.filter((M) => ye(M, t.a)), d = s.filter((M) => ye(M, t.b));
  if (!m.length || !d.length)
    throw Error(
      "Выборка А или Б не содержит элементов. Отметьте хотя бы одну модель в каждой стороне проверки."
    );
  let p = performance.now();
  const u = async () => {
    if (l())
      throw Error("Расчёт отменён. Предыдущие результаты сохранены.");
    performance.now() - p > 16 && (await new Promise((M) => setTimeout(M, 0)), p = performance.now());
  }, g = /* @__PURE__ */ new Map(), y = (M) => {
    let O = g.get(M.id);
    return O || (O = je(
      M,
      Array.from({ length: ae(M) }, (F, P) => P)
    ), g.set(M.id, O)), O;
  }, v = /* @__PURE__ */ new Map(), C = async (M) => {
    let O = v.get(M.id);
    if (O !== void 0) return O;
    const F = [];
    for (let P = 0; P < ae(M); P++)
      F.push(
        [0, 3, 6].map(
          (se) => [0, 1, 2].map((S) => Math.round(ce(M, P, se + S) / n)).join(",")
        ).sort().join(";")
      ), P % 9e3 === 0 && await u();
    return O = F.sort().join("|"), v.set(M.id, O), O;
  }, I = [], x = new Set(m.map((M) => M.id)), L = new Set(d.map((M) => M.id)), k = Ie(
    d,
    d.map((M, O) => O)
  ), f = /* @__PURE__ */ new Map();
  let ie = 0;
  const q = (M) => M.triangles.byteLength + (M.vertices?.byteLength || 0) + (M.indices?.byteLength || 0) + ae(M) * 32;
  async function z(M, O) {
    if (!r) return M;
    let F = f.get(M.id);
    if (F)
      return f.delete(M.id), f.set(M.id, F), F;
    for (const [P, se] of f)
      P !== O && ie > 96 * 1024 * 1024 && (f.delete(P), ie -= q(se), g.delete(P), v.delete(P));
    return F = await r(M.id), f.set(M.id, F), ie += q(F), F;
  }
  let de = -1 / 0;
  for (let M = 0; M < m.length; M++) {
    const O = m[M];
    performance.now() - de > 150 && (de = performance.now(), i({
      phase: "Проверка пар",
      done: M,
      total: m.length,
      found: I.length
    }));
    for (const F of ge(k, O.bounds, n)) {
      const P = d[F];
      if (await u(), O.id === P.id || !Re(O.bounds, P.bounds, n) || t.ignoreSameModel && O.modelId === P.modelId || t.ignoreSameGroup && O.modelId === P.modelId && O.properties.Объект && O.properties.Объект === P.properties.Объект || t.equalProperty && O.properties[t.equalProperty] !== void 0 && O.properties[t.equalProperty] === P.properties[t.equalProperty] || O.id > P.id && x.has(P.id) && L.has(O.id)) continue;
      const se = Ve(O.id, P.id), S = await z(O), D = await z(P, O.id);
      let B, R = "surface", H = 0;
      if (t.type === "duplicates") {
        if (ae(S) !== ae(D) || S.bounds.min.some(
          (X, T) => Math.abs(X - D.bounds.min[T]) > n || Math.abs(S.bounds.max[T] - D.bounds.max[T]) > n
        ))
          continue;
        await C(S) === await C(D) && (B = S.bounds.min.map((X, T) => (X + S.bounds.max[T]) / 2), R = "duplicate");
      } else {
        const X = y(S), T = y(D);
        for (let Q = 0; Q < ae(S) && !B; Q++) {
          const K = ue(S, Q), oe = De(K.flat());
          for (const W of ge(T, oe, n)) {
            if (B = We(K, ue(D, W), n, t.touching), B) break;
            await u();
          }
          await u();
        }
        if (!B && S.closed && D.closed) {
          const Q = S.bounds.min.map(
            (K, oe) => (K + S.bounds.max[oe]) / 2
          );
          xe(Q, S, X, n) && xe(Q, D, T, n) && (B = Q, R = "contained");
        }
        if (!B) {
          for (const [Q, K, oe] of [
            [S, D, T],
            [D, S, X]
          ])
            if (K.closed) {
              for (let W = 0; W < ae(Q) && !B; W++) {
                const _ = ue(Q, W), ee = _[0].map(
                  (te, $) => (_[0][$] + _[1][$] + _[2][$]) / 3
                );
                for (const te of [_[0], ee])
                  if (xe(te, K, oe, n)) {
                    B = te, R = "contained";
                    break;
                  }
                await u();
              }
              if (B) break;
            }
        }
        if (B && (H = await et(
          S,
          D,
          X,
          T,
          B,
          n,
          u
        )), B && H + t.precision < t.minPenetration)
          continue;
      }
      if (B && (I.push({
        id: se,
        a: Oe(S),
        b: Oe(D),
        point: B,
        kind: R,
        state: "new",
        note: "",
        assignee: "",
        firstSeen: "",
        lastSeen: "",
        penetrationMm: H
      }), I.length >= 5e4))
        throw Error(
          "Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат."
        );
    }
  }
  return i({
    phase: "Готово",
    done: m.length,
    total: m.length,
    found: I.length
  }), I;
}
const Ue = `(function(){"use strict";const on=({triangles:t,vertices:n,indices:i,triangleCount:s,closed:f,bounds:e,...c})=>c;function rn(t,n){return n.exclude.includes(t.id)?!1:n.include.includes(t.id)?!0:!(n.manualOnly||n.modelsMode==="selected"&&!n.models.includes(t.modelId)||n.modelsMode===void 0&&n.models.length&&!n.models.includes(t.modelId))}const cn=(t,n)=>JSON.stringify([t,n].sort()),y=(t,n)=>[t[0]-n[0],t[1]-n[1],t[2]-n[2]],G=(t,n,i=1)=>[t[0]+n[0]*i,t[1]+n[1]*i,t[2]+n[2]*i],w=(t,n)=>t[0]*n[0]+t[1]*n[1]+t[2]*n[2],H=(t,n)=>[t[1]*n[2]-t[2]*n[1],t[2]*n[0]-t[0]*n[2],t[0]*n[1]-t[1]*n[0]],p=t=>Math.hypot(...t),L=t=>t.triangleCount??(t.indices?t.indices.length/3:t.triangles.length/9),D=(t,n,i)=>t.indices&&t.vertices?t.vertices[t.indices[n*3+Math.floor(i/3)]*3+i%3]:t.triangles[n*9+i],z=(t,n)=>[0,3,6].map(i=>[D(t,n,i),D(t,n,i+1),D(t,n,i+2)]);function sn(t){const n=[1/0,1/0,1/0],i=[-1/0,-1/0,-1/0];for(let s=0;s<t.length;s++){const f=s%3;n[f]=Math.min(n[f],t[s]),i[f]=Math.max(i[f],t[s])}return{min:n,max:i}}const an=(t,n,i)=>t.min.every((s,f)=>s<=n.max[f]+i&&t.max[f]>=n.min[f]-i);function X(t,n){const i={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const o of n)for(let r=0;r<9;r++){const u=r%3,a=D(t,o,r);i.min[u]=Math.min(i.min[u],a),i.max[u]=Math.max(i.max[u],a)}if(n.length<=12)return{...i,ids:n};const s=i.max.map((o,r)=>o-i.min[r]),f=s.indexOf(Math.max(...s)),e=o=>D(t,o,f)+D(t,o,f+3)+D(t,o,f+6);n.sort((o,r)=>e(o)-e(r));const c=n.length>>1;return{...i,left:X(t,n.slice(0,c)),right:X(t,n.slice(c))}}function*J(t,n,i){an(t,n,i)&&(t.ids?yield*t.ids:(yield*J(t.left,n,i),yield*J(t.right,n,i)))}function Y(t,n){const i={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const c of n)for(let o=0;o<3;o++)i.min[o]=Math.min(i.min[o],t[c].bounds.min[o]),i.max[o]=Math.max(i.max[o],t[c].bounds.max[o]);if(n.length<=16)return{...i,ids:n};const s=i.max.map((c,o)=>c-i.min[o]),f=s.indexOf(Math.max(...s));n.sort((c,o)=>t[c].bounds.min[f]+t[c].bounds.max[f]-(t[o].bounds.min[f]+t[o].bounds.max[f]));const e=n.length>>1;return{...i,left:Y(t,n.slice(0,e)),right:Y(t,n.slice(e))}}function Z(t,n,i,s){const f=y(n,t),e=y(i[1],i[0]),c=y(i[2],i[0]),o=H(f,c),r=w(e,o);if(Math.abs(r)<=1e-12*p(f)*p(e)*p(c))return;const u=1/r,a=y(t,i[0]),d=w(a,o)*u,l=H(a,e),M=w(f,l)*u,I=w(c,l)*u,x=s/Math.max(p(e),p(c),s);if(d>=-x&&M>=-x&&d+M<=1+x&&I>=-x&&I<=1+x)return G(t,f,Math.max(0,Math.min(1,I)))}function un(t,n,i,s){const f=i.map(Math.abs).indexOf(Math.max(...i.map(Math.abs))),e=[0,1,2].filter(r=>r!==f),c=(r,u,a)=>(u[e[0]]-r[e[0]])*(a[e[1]]-r[e[1]])-(u[e[1]]-r[e[1]])*(a[e[0]]-r[e[0]]),o=(r,u)=>{const a=u.map((d,l)=>c(d,u[(l+1)%3],r));return a.every(d=>d>=-s*p(i))||a.every(d=>d<=s*p(i))};for(const r of t)if(o(r,n))return r;for(const r of n)if(o(r,t))return r;for(let r=0;r<3;r++)for(let u=0;u<3;u++){const a=t[r],d=t[(r+1)%3],l=n[u],M=n[(u+1)%3],I=y(d,a),x=y(M,l),h=I[e[0]]*x[e[1]]-I[e[1]]*x[e[0]];if(Math.abs(h)<1e-18)continue;const P=y(l,a),C=(P[e[0]]*x[e[1]]-P[e[1]]*x[e[0]])/h,j=(P[e[0]]*I[e[1]]-P[e[1]]*I[e[0]])/h;if(C>=0&&C<=1&&j>=0&&j<=1)return G(a,I,C)}}function dn(t,n,i,s){const f=H(y(t[1],t[0]),y(t[2],t[0])),e=H(y(n[1],n[0]),y(n[2],n[0])),c=p(f),o=p(e);if(c<1e-20||o<1e-20)return;const r=n.map(a=>w(y(a,t[0]),f)/c),u=t.map(a=>w(y(a,n[0]),e)/o);if(!(r.every(a=>a>i)||r.every(a=>a<-i)||u.every(a=>a>i)||u.every(a=>a<-i))){if(r.every(a=>Math.abs(a)<=i)&&u.every(a=>Math.abs(a)<=i))return s?un(t,n,f,i):void 0;if(!(!s&&(!(Math.min(...r)<-i&&Math.max(...r)>i)||!(Math.min(...u)<-i&&Math.max(...u)>i))))for(let a=0;a<3;a++){const d=Z(t[a],t[(a+1)%3],n,i);if(d)return d;const l=Z(n[a],n[(a+1)%3],t,i);if(l)return l}}}function ln(t,n,i){const s=y(n[1],n[0]),f=y(n[2],n[0]),e=H(s,f),c=p(e);if(c<1e-20||Math.abs(w(y(t,n[0]),e))/c>i)return!1;const o=y(t,n[0]),r=w(s,s),u=w(s,f),a=w(f,f),d=w(o,s),l=w(o,f),M=r*a-u*u;if(Math.abs(M)<1e-30)return!1;const I=(d*a-l*u)/M,x=(l*r-d*u)/M,h=i/Math.max(p(s),p(f),i);return I>=-h&&x>=-h&&I+x<=1+h}function V(t,n,i,s){if(!n.closed||t.some((d,l)=>d<=n.bounds.min[l]+s||d>=n.bounds.max[l]-s))return!1;for(const d of J(i,{min:t,max:t},s))if(ln(t,z(n,d),s))return!1;const f=[1,.371390676,.52999894],e=p(y(n.bounds.max,n.bounds.min))*3+1,c=G(t,f,e),o=[],r=sn([...t,...c]);for(const d of J(i,r,s)){const l=Z(t,c,z(n,d),s);if(l){const M=p(y(l,t));M>s&&o.push(M)}}o.sort((d,l)=>d-l);let u=0,a=-1/0;for(const d of o)d-a>s*2&&(u++,a=d);return u%2===1}function $(t,n){return Math.hypot(...t.map((i,s)=>Math.max(n.min[s]-i,0,i-n.max[s])))}function mn(t,n){const i=y(n[1],n[0]),s=y(n[2],n[0]),f=y(t,n[0]),e=w(i,f),c=w(s,f);if(e<=0&&c<=0)return p(f);const o=y(t,n[1]),r=w(i,o),u=w(s,o);if(r>=0&&u<=r)return p(o);if(e*u-r*c<=0&&e>=0&&r<=0){const P=e/(e-r);return p(y(t,G(n[0],i,P)))}const d=y(t,n[2]),l=w(i,d),M=w(s,d);if(M>=0&&l<=M)return p(d);if(l*c-e*M<=0&&c>=0&&M<=0){const P=c/(c-M);return p(y(t,G(n[0],s,P)))}if(r*M-l*u<=0&&u-r>=0&&l-M>=0){const P=y(n[2],n[1]),C=(u-r)/(u-r+(l-M));return p(y(t,G(n[1],P,C)))}const h=H(i,s);return Math.abs(w(f,h))/Math.max(p(h),1e-30)}function hn(t,n,i){let s=1/0;const f=e=>{if($(t,e)>=s)return;if(e.ids){for(const r of e.ids)s=Math.min(s,mn(t,z(n,r)));return}const c=e.left,o=e.right;$(t,c)<$(t,o)?(f(c),f(o)):(f(o),f(c))};return f(i),s}async function gn(t,n,i,s,f,e,c){if(!t.closed||!n.closed)return 0;let o=0;const r=(a,d,l)=>{V(a,d,l,e)&&(o=Math.max(o,hn(a,d,l)))};r(f,t,i),r(f,n,s);let u=0;for(const[a,d,l]of[[t,n,s],[n,t,i]]){const M=L(a),I=Math.max(1,Math.floor(M/1024));for(let x=0;x<M;x+=I){const h=z(a,x),P=h[0].map((N,_)=>(h[0][_]+h[1][_]+h[2][_])/3),C=h[0].map((N,_)=>(h[0][_]+h[1][_])/2),j=h[0].map((N,_)=>(h[1][_]+h[2][_])/2),K=h[0].map((N,_)=>(h[2][_]+h[0][_])/2);for(const N of[h[0],h[1],h[2],C,j,K,P])r(N,d,l);u++%32===0&&await c()}}if(o<=e){const a=t.bounds.min.map((d,l)=>Math.min(t.bounds.max[l],n.bounds.max[l])-Math.max(d,n.bounds.min[l]));o=Math.max(0,Math.min(...a))}return o*1e3}async function yn(t,n,i,s,f){const e=n.precision/1e3;if(!Number.isFinite(e)||e<=0)throw Error("Точность расчёта должна быть положительным числом.");const c=t.filter(m=>n.includeHidden||!m.hidden),o=c.filter(m=>rn(m,n.a)),r=c.filter(m=>rn(m,n.b));if(!o.length||!r.length)throw Error("Выборка А или Б не содержит элементов. Отметьте хотя бы одну модель в каждой стороне проверки.");let u=performance.now();const a=async()=>{if(s())throw Error("Расчёт отменён. Предыдущие результаты сохранены.");performance.now()-u>16&&(await new Promise(m=>setTimeout(m,0)),u=performance.now())},d=new Map,l=m=>{let g=d.get(m.id);return g||(g=X(m,Array.from({length:L(m)},(S,b)=>b)),d.set(m.id,g)),g},M=new Map,I=async m=>{let g=M.get(m.id);if(g!==void 0)return g;const S=[];for(let b=0;b<L(m);b++)S.push([0,3,6].map(B=>[0,1,2].map(v=>Math.round(D(m,b,B+v)/e)).join(",")).sort().join(";")),b%9e3===0&&await a();return g=S.sort().join("|"),M.set(m.id,g),g},x=[],h=new Set(o.map(m=>m.id)),P=new Set(r.map(m=>m.id)),C=Y(r,r.map((m,g)=>g)),j=new Map;let K=0;const N=m=>m.triangles.byteLength+(m.vertices?.byteLength||0)+(m.indices?.byteLength||0)+L(m)*32;async function _(m,g){if(!f)return m;let S=j.get(m.id);if(S)return j.delete(m.id),j.set(m.id,S),S;for(const[b,B]of j)b!==g&&K>96*1024*1024&&(j.delete(b),K-=N(B),d.delete(b),M.delete(b));return S=await f(m.id),j.set(m.id,S),K+=N(S),S}let fn=-1/0;for(let m=0;m<o.length;m++){const g=o[m];performance.now()-fn>150&&(fn=performance.now(),i({phase:"Проверка пар",done:m,total:o.length,found:x.length}));for(const S of J(C,g.bounds,e)){const b=r[S];if(await a(),g.id===b.id||!an(g.bounds,b.bounds,e)||n.ignoreSameModel&&g.modelId===b.modelId||n.ignoreSameGroup&&g.modelId===b.modelId&&g.properties.Объект&&g.properties.Объект===b.properties.Объект||n.equalProperty&&g.properties[n.equalProperty]!==void 0&&g.properties[n.equalProperty]===b.properties[n.equalProperty]||g.id>b.id&&h.has(b.id)&&P.has(g.id))continue;const B=cn(g.id,b.id),v=await _(g),E=await _(b,g.id);let q,W="surface",nn=0;if(n.type==="duplicates"){if(L(v)!==L(E)||v.bounds.min.some((A,O)=>Math.abs(A-E.bounds.min[O])>e||Math.abs(v.bounds.max[O]-E.bounds.max[O])>e))continue;await I(v)===await I(E)&&(q=v.bounds.min.map((A,O)=>(A+v.bounds.max[O])/2),W="duplicate")}else{const A=l(v),O=l(E);for(let T=0;T<L(v)&&!q;T++){const F=z(v,T),Q=sn(F.flat());for(const R of J(O,Q,e)){if(q=dn(F,z(E,R),e,n.touching),q)break;await a()}await a()}if(!q&&v.closed&&E.closed){const T=v.bounds.min.map((F,Q)=>(F+v.bounds.max[Q])/2);V(T,v,A,e)&&V(T,E,O,e)&&(q=T,W="contained")}if(!q){for(const[T,F,Q]of[[v,E,O],[E,v,A]])if(F.closed){for(let R=0;R<L(T)&&!q;R++){const U=z(T,R),xn=U[0].map((tn,en)=>(U[0][en]+U[1][en]+U[2][en])/3);for(const tn of[U[0],xn])if(V(tn,F,Q,e)){q=tn,W="contained";break}await a()}if(q)break}}if(q&&(nn=await gn(v,E,A,O,q,e,a)),q&&nn+n.precision<n.minPenetration)continue}if(q&&(x.push({id:B,a:on(v),b:on(E),point:q,kind:W,state:"new",note:"",assignee:"",firstSeen:"",lastSeen:"",penetrationMm:nn}),x.length>=5e4))throw Error("Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат.")}}return i({phase:"Готово",done:o.length,total:o.length,found:x.length}),x}let Mn=0;const k=new Map;self.onmessage=async t=>{if(t.data.request!==void 0){const n=k.get(t.data.request);k.delete(t.data.request),t.data.error?n?.reject(Error(t.data.error)):n?.resolve(t.data.geometry);return}try{const{elements:n,check:i}=t.data,s=await yn(n,i,f=>self.postMessage({progress:f}),()=>!1,t.data.streaming?f=>new Promise((e,c)=>{const o=Mn++;k.set(o,{resolve:e,reject:c}),self.postMessage({load:f,request:o})}):void 0);self.postMessage({results:s})}catch(n){self.postMessage({error:n instanceof Error?n.message:String(n)})}}})();
`, $e = typeof self < "u" && self.Blob && new Blob(["(self.URL || self.webkitURL).revokeObjectURL(self.location.href);", Ue], { type: "text/javascript;charset=utf-8" });
function nt(e) {
  let t;
  try {
    if (t = $e && (self.URL || self.webkitURL).createObjectURL($e), !t) throw "";
    const i = new Worker(t, {
      name: e?.name
    });
    return i.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(t);
    }), i;
  } catch {
    return new Worker(
      "data:text/javascript;charset=utf-8," + encodeURIComponent(Ue),
      {
        name: e?.name
      }
    );
  }
}
const Z = (e) => String(e ?? "").replace(
  /[&<>"']/g,
  (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[t]
);
function Ne(e, t) {
  const i = URL.createObjectURL(
    new Blob([t], {
      type: e.endsWith(".html") ? "text/html;charset=utf-8" : "application/json;charset=utf-8"
    })
  ), l = document.createElement("a");
  l.href = i, l.download = e, l.click(), setTimeout(() => URL.revokeObjectURL(i), 6e4);
}
function it(e, t) {
  const i = Z;
  return `<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${i(e.name)}</title><style>body{font:14px/1.5 system-ui;margin:24px;background:#171c23;color:#e6edf5}h1{margin:0}small{color:#a9b7c8}input,select{padding:10px;margin:15px 8px 15px 0;max-width:100%;background:#242e3b;color:inherit;border:1px solid #506074;border-radius:6px}.wrap{overflow:auto}table{border-collapse:separate;border-spacing:0;width:100%}td,th{padding:10px;border-bottom:1px solid #39475a;min-width:100px;vertical-align:top;overflow-wrap:anywhere}th{background:#253142;position:sticky;top:0;text-align:left;white-space:normal}td{max-width:350px}tr[hidden]{display:none}.shot{display:block;width:260px;border:0;background:transparent;padding:0;cursor:zoom-in}dialog{width:min(94vw,1400px);border:1px solid #506074;background:#20242b;color:white;border-radius:10px}dialog img{max-width:100%;max-height:80vh;display:block;margin:12px auto}dialog::backdrop{background:#000b}.shot img{width:100%;border-radius:6px}.legend{margin:12px 0}.red{color:#ff6161}@media print{input,select{display:none}body{background:white;color:black}.wrap{overflow:visible}th{position:static;background:#eee}}</style><h1>${i(e.name)}</h1><small>НашеПО · Проверки коллизий · ${i(e.lastRun || "")} · ${e.status === "stale" ? "Результат устарел" : "Последний завершённый расчёт"}</small><p>${i(e.type === "duplicates" ? "Совпадение треугольной геометрии" : "Пересечения поверхностей и вложенность замкнутых тел")}. Точность: ${i(e.precision)} мм${e.type === "intersection" ? `; минимальное расчётное вхождение: ${i(e.minPenetration)} мм` : ""}.</p><p class="legend"><span class="red">● Пересекающиеся элементы выделены красным</span></p><input id="search" type="search" placeholder="Поиск по всему отчёту"><select id="state"><option value="">Все состояния</option>${Object.entries(
    le
  ).map(([l, r]) => `<option value="${l}">${r}</option>`).join(
    ""
  )}</select>${e.type === "intersection" ? '<input id="depth" type="number" min="0" step="1" placeholder="Вхождение от, мм">' : ""}<span id="count"></span><div class="wrap"><table><thead><tr>${["Снимок", "№", "Состояние", "Вхождение, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "X", "Y", "Z", "Назначение", "Комментарий"].map((l) => `<th>${l}</th>`).join("")}</tr></thead><tbody>${t.map((l, r) => `<tr data-state="${l.state}" data-depth="${l.penetrationMm ?? 0}"><td>${ve(l.image) ? `<button class="shot" type="button"><img src="${l.image}" alt="Снимок конфликта ${r + 1}" loading="lazy"></button>` : "Снимок отсутствует"}</td>${[r + 1, le[l.state], e.type === "duplicates" ? "—" : (l.penetrationMm ?? 0).toFixed(1), l.a.name, l.a.model, l.a.guid, l.b.name, l.b.model, l.b.guid, ...l.point.map((n) => n.toFixed(4)), l.assignee, l.note].map((n) => `<td>${i(n)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><dialog id="picture"><button id="close-picture">Закрыть</button><img id="full-picture" alt="Снимок конфликта"></dialog><script>const modal=document.getElementById("picture");document.getElementById("close-picture").onclick=()=>modal.close();for(const b of document.querySelectorAll(".shot"))b.onclick=()=>{document.getElementById("full-picture").src=b.querySelector("img").src;modal.showModal()};const q=document.getElementById('search'),s=document.getElementById('state'),d=document.getElementById('depth'),rows=[...document.querySelectorAll('tbody tr')];function filter(){let n=0;for(const r of rows){r.hidden=!!((s.value&&r.dataset.state!==s.value)||(d&&Number(r.dataset.depth)<Number(d.value||0))||!r.textContent.toLowerCase().includes(q.value.toLowerCase()));if(!r.hidden)n++}document.getElementById('count').textContent='Коллизий: '+n}q.oninput=s.onchange=filter;if(d)d.oninput=filter;filter()<\/script></html>`;
}
function ot(e, t) {
  return JSON.stringify(
    {
      version: 1,
      id: e.id,
      name: e.name,
      images: Object.fromEntries(
        t.filter((i) => ve(i.image)).map((i) => [i.id + ".jpg", i.image])
      ),
      warnings: e.warnings,
      tests: [
        {
          id: e.id,
          name: e.name,
          clashes: t.map((i, l) => ({
            id: i.id,
            name: `Конфликт ${l + 1}`,
            distance: e.type === "duplicates" ? "" : `${(i.penetrationMm ?? 0).toFixed(1)} мм`,
            date: e.lastRun || "",
            description: e.type === "duplicates" ? "Дублирование" : "По пересечению",
            status: le[i.state],
            group: i.assignee,
            note: i.note,
            point: i.point,
            image: ve(i.image) ? i.id + ".jpg" : "",
            enabled: i.state !== "resolved",
            reviewed: i.state === "resolved" || i.state === "reviewed" || i.state === "approved",
            excluded: i.state === "excluded",
            elements: [i.a, i.b].map((r) => ({
              guid: r.guid,
              id: r.id,
              source: r.model,
              name: r.name,
              properties: r.properties
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
const rt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAydpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAzIDc5Ljk2OTBhODdmYywgMjAyNS8wMy8wNi0yMDo1MDoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDZFQkU2NEQ4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDZFQkU2NEM4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI2LjExIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRENDVBNjQzODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRENDVBNjQ0ODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+pHX+ogAAD+lJREFUeNrs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", st = ":host{display:block;height:100%;color-scheme:dark;font:13px/1.4 Segoe UI,sans-serif;color:#dbe5f0;container-type:size}*{box-sizing:border-box}[hidden]{display:none!important}main{height:100%;min-height:260px;background:#171d25;display:flex;flex-direction:column;overflow:hidden;-webkit-user-select:none;user-select:none}button,input,select,textarea{font:inherit;color:inherit;border:1px solid #425165;border-radius:6px;background:#253140;padding:7px 9px;min-width:0}button{cursor:pointer;white-space:nowrap}button:hover{background:#354459}button:disabled{opacity:.45;cursor:default}.primary{background:#b99a38;border-color:#d0ae46;color:#111820;font-weight:600}.primary:hover{background:#e0bd51}button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid #f2c94c;outline-offset:1px}input,select,textarea{background:#111a24}input,textarea,td,dd{-webkit-user-select:text;user-select:text}input[type=checkbox]{accent-color:#e6c354;width:16px;height:16px}header{display:flex;gap:7px;align-items:center;padding:8px 12px;border-bottom:1px solid #354459;flex-shrink:0;overflow-x:auto}.brand{display:flex;gap:7px;align-items:center;margin-right:8px}.brand img{width:32px;height:32px;object-fit:contain}.brand b{font-size:17px}.brand small{font-size:10px;color:#a6b5c7}#dirty{margin-left:auto;font-size:11px;color:#cabb81;white-space:nowrap}.notice{background:#1c2735;padding:5px 12px;font-size:12px;min-height:27px;max-height:70px;overflow:auto;color:#a7bbd1}.notice.error{color:#ffaaa1;background:#412725}.workspace{display:grid;grid-template-columns:230px minmax(0,1fr);flex:1;min-height:0}aside{padding:10px;display:flex;flex-direction:column;gap:9px;border-right:1px solid #354459;min-height:0}#checks{overflow:auto;flex:1;min-height:0}.check-item{display:flex;flex-direction:column;gap:5px;width:100%;margin-bottom:5px;text-align:left;white-space:normal}.check-item small{color:#a8b7ca}.check-item.active,.tabs .active{border-color:#c7ab56;background:#403b2c;color:#ffe399}.main{display:flex;flex-direction:column;min-width:0;min-height:0}.test-toolbar{display:flex;gap:7px;padding:8px 12px;align-items:center}.test-toolbar input{flex:1;font-weight:600}.tabs{display:flex;gap:7px;border-bottom:1px solid #354459;padding:0 12px 8px}.tabs button{min-width:105px}#content{flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column}.empty{padding:28px;color:#a4b4c9;text-align:center;margin:auto}h2,h3,p{margin:0 0 10px}h2{font-size:20px}h3{font-size:15px}label{display:flex;flex-direction:column;gap:5px;font-size:12px;color:#b8c6d7}.check{flex-direction:row;align-items:center;gap:6px}small{font-size:11px;color:#a8b7c9}.parameters{display:flex;gap:18px;align-items:end;padding:10px 12px}.parameters input{width:140px}.selection-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0 12px 12px}.selection{border:1px solid #39495e;border-radius:8px;padding:12px;background:#1b2633;min-width:0}.selection h3{display:flex;justify-content:space-between}.selection h3 span{color:#92c4b2;font-size:12px}.selection select[multiple]{width:100%;min-height:70px}.selection-tools{display:flex;gap:5px;flex-wrap:wrap;margin:8px 0}.selection-tools button{font-size:11px;padding:5px 7px}.selection>label{margin-bottom:8px}.condition{display:grid;grid-template-columns:minmax(80px,1fr) 100px minmax(70px,1fr) 29px;gap:5px;margin:6px 0}.condition button{padding:3px}.rules,.report{padding:18px;max-width:850px}.rules>label{margin:14px 0}.rules>p,.report>p{color:#a9b8cb}.report>button{margin:12px 8px 14px 0}.result-tools{display:flex;gap:7px;flex-wrap:wrap;padding:8px 12px}.result-tools input{flex:1;min-width:180px}.result-area{display:grid;grid-template-columns:minmax(0,1fr) 300px;flex:1;min-height:0}.table-area{display:flex;flex-direction:column;min-width:0;min-height:0}.scroll{overflow:auto;flex:1;min-height:0}table{border-collapse:separate;border-spacing:0;width:max-content;min-width:100%}th{position:sticky;top:0;background:#2a3748;z-index:1;text-align:left;max-width:240px;white-space:normal}th,td{padding:8px;border-bottom:1px solid #344154;vertical-align:top}td{max-width:320px;min-width:90px;overflow-wrap:anywhere;-webkit-user-select:text;user-select:text}td:first-child{min-width:36px}tr.active td{background:#453e29;color:#fff0b5}tr:hover td{background:#2c3847}.pager{display:flex;gap:10px;align-items:center;justify-content:center;padding:5px;border-top:1px solid #39495e;font-size:11px}.pager button{padding:2px 8px}.detail{border-left:1px solid #354459;padding:10px;overflow:auto}.detail h3{overflow-wrap:anywhere}.detail>label{margin:10px 0}.detail p{font:11px/1.5 Consolas,monospace}.detail details{border-top:1px solid #354459;padding:8px 0}summary{cursor:pointer}dl{font-size:11px;display:grid;grid-template-columns:1fr 1fr;gap:7px}dt,dd{overflow-wrap:anywhere;margin:0}dt{color:#9baec4}footer{border-top:1px solid #354459;padding:4px 12px;display:flex;justify-content:space-between;color:#91a4bb;font-size:11px}dialog{border:1px solid #53647c;border-radius:12px;background:#202c3a;color:#dbe5f0;width:min(700px,92vw);max-height:85vh;padding:20px;box-shadow:0 15px 60px #000a}dialog::backdrop{background:#000a}dialog p{margin:12px 0}dialog a{color:#f2c94c;margin-right:12px}.dialog-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:16px}@container (max-width:950px){.workspace{grid-template-columns:185px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 240px}.selection-grid{grid-template-columns:1fr}.parameters,.test-toolbar{flex-wrap:wrap}.test-toolbar input{flex-basis:100%}}@container (max-height:400px){header{padding:5px 10px}.test-toolbar{padding:5px 10px}.tabs{padding-bottom:5px}.brand img{width:25px;height:25px}footer{display:none}}:host{font-size:14px}.brand img{background:#e1e7ef;border-radius:5px;padding:3px}.selection-tools button{font-size:12px}label{font-size:13px}.choose-layout{display:grid;grid-template-columns:220px minmax(0,1fr);min-height:0;flex:1;overflow:auto}.choose-layout .parameters{display:flex;flex-direction:column;align-items:stretch;gap:15px;border-right:1px solid #354459;justify-content:flex-start}.choose-layout .parameters input{width:100%}.choose-layout .parameters input[type=checkbox]{width:16px}.choose-layout .selection-grid{padding:10px 12px;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start;min-width:0}.selection select[multiple]{height:180px;resize:vertical}.selection-mode{font-size:12px;color:#b6c4d5}.preset-row{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:9px}.preset-row select{flex:1 1 160px}.preset-row button{padding:5px 7px;font-size:12px}.model-list{height:150px;overflow:auto;border:1px solid #425165;border-radius:6px;background:#111a24;padding:5px;margin-bottom:5px}.model-list label{display:flex;flex-direction:row;align-items:center;gap:7px;padding:4px 5px;color:#dbe5f0;overflow-wrap:anywhere}.model-list label:hover{background:#253140}.model-list .model-all{position:sticky;top:-5px;z-index:1;background:#1f2b39;border-bottom:1px solid #425165;font-weight:600}.legend{display:flex;gap:12px;flex-wrap:wrap;font-family:inherit!important}.part-a{color:#ff6161}.part-b{color:#65baff}.preview{display:block;width:100%;padding:5px;margin:8px 0}.preview img{display:block;width:100%;max-height:180px;object-fit:contain}.image-dialog{width:94vw;max-width:1500px}.image-dialog img{display:block;max-width:100%;max-height:75vh;margin:10px auto}#help-dialog{width:min(1000px,94vw);line-height:1.6}#help-dialog details{padding:12px 0;border-bottom:1px solid #425165}#help-dialog summary{font-size:16px;font-weight:600;color:#f0d27a}#help-dialog li{margin:8px 0}@container (max-width:1100px){.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .selection-grid{grid-template-columns:1fr}.condition{grid-template-columns:minmax(60px,1fr) 100px minmax(60px,1fr) 29px}}@container (max-width:700px){.choose-layout{display:block}.choose-layout .parameters{border-right:0;border-bottom:1px solid #354459}.workspace{grid-template-columns:160px minmax(0,1fr)}}", me = /* @__PURE__ */ new WeakMap(), ke = () => ({
  format: "nashepo.checks",
  version: 1,
  checks: [],
  sets: []
});
function at(e, t) {
  const i = e.shadowRoot || e.attachShadow({ mode: "open" }), l = Ge(e);
  let r = t.projectToken(), n = r && me.get(r) || ke();
  r && me.set(r, n);
  let s, m = n.checks[0]?.id || "", d = "select", p = "", u = 0, g = !1, y = !1, v, C = !0, I = !1;
  const x = /* @__PURE__ */ new Set();
  let L;
  const k = () => n.checks.find((o) => o.id === m), f = (o) => i.querySelector("#" + o);
  i.innerHTML = `<style>${st}</style><main><header><div class="brand"><img src="${rt}" alt=""><b>НашеПО</b><small>${Ye}</small></div><button id="scan">Обновить модели</button><button id="new" class="primary">＋ Проверка</button><button id="open">Открыть проверки</button><button id="save">Сохранить проверки</button><button id="settings">⚙</button><button id="help">Справка</button><span id="dirty"></span></header><div class="notice" id="notice" role="status">Откройте IFC/SMDX в проекте и нажмите «Обновить модели».</div><div class="workspace"><aside><input id="test-search" type="search" placeholder="Поиск проверок"><div id="checks"></div><button id="all">Запустить все</button></aside><section class="main"><div class="test-toolbar"><input id="name" aria-label="Имя проверки" placeholder="Имя проверки"><button id="copy">Копировать</button><button id="delete">Удалить</button><button id="run" class="primary">▶ Запустить</button><button id="cancel" hidden>Остановить</button></div><div id="tabs" class="tabs">${[
    ["rules", "Правила"],
    ["select", "Выбрать"],
    ["results", "Результаты"],
    ["report", "Отчёт"]
  ].map(([o, a]) => `<button data-tab="${o}">${a}</button>`).join(
    ""
  )}</div><div id="content"></div></section></div><footer><span id="model-count">Модели не прочитаны</span><span>Расчёт выполняется на вашем компьютере</span></footer><input id="file" type="file" accept=".json" hidden><dialog id="settings-dialog"><h2>Настройки</h2><label>Дистанция камеры, м<input id="distance" type="number" value="15" min="0.5"></label><p class="links"><a href="https://nashepo.ru/" target="_blank" rel="noopener noreferrer">Сайт НашеПО</a><a href="https://t.me/RoburFan" target="_blank" rel="noopener noreferrer">Telegram</a></p><button data-close="settings-dialog">Закрыть</button></dialog><dialog id="help-dialog">${Fe}<button data-close="help-dialog">Закрыть</button></dialog><dialog id="set-dialog"><h2>Сохранить набор моделей</h2><label>Название<input id="set-name" maxlength="120"></label><div class="dialog-actions"><button id="set-cancel">Отмена</button><button id="set-confirm" class="primary">Сохранить</button></div></dialog></main>`;
  const ie = document.createElement("button");
  ie.id = "clear-project", ie.textContent = "Очистить проект", f("save").after(ie);
  const q = (o, a = !1) => {
    f("notice").textContent = o, f("notice").classList.toggle("error", a);
  }, z = async (o) => {
    try {
      await o();
    } catch (a) {
      q(a instanceof Error ? a.message : String(a), !0);
    }
  }, de = () => new Promise((o) => {
    const a = f("set-dialog"), c = f("set-name");
    let h = !1;
    const w = (j) => {
      h || (h = !0, a.close(), o(j));
    };
    c.value = "Новый набор", f("set-confirm").onclick = () => {
      const j = c.value.trim();
      j ? w(j) : c.focus();
    }, f("set-cancel").onclick = () => w(), a.oncancel = (j) => {
      j.preventDefault(), w();
    }, a.showModal(), c.focus(), c.select();
  }), M = () => {
    I = !0, f("dirty").textContent = "Есть несохранённые изменения";
  }, O = () => {
    const o = t.projectToken();
    return !o || o === r ? !1 : (!r && (n.checks.length || n.sets.length) ? me.set(o, n) : n = me.get(o) || ke(), me.set(o, n), r = o, s = void 0, m = n.checks[0]?.id || "", p = "", x.clear(), u = 0, I = !1, t.clear(), f("dirty").textContent = "", !0);
  }, F = () => {
    const o = k();
    o?.lastRun && (o.status = "stale"), M(), D();
  }, P = () => [
    ...new Set(
      (s?.elements || []).flatMap((o) => Object.keys(o.properties))
    )
  ].sort(), se = (o, a) => o.map(
    (c) => `<option value="${Z(c)}" ${c === a ? "selected" : ""}>${Z(c)}</option>`
  ).join("");
  function S() {
    const o = k(), a = f("result-search")?.value.toLowerCase() || "", c = f("result-state")?.value || "", h = Number(f("result-depth")?.value || 0);
    return (o?.results || []).filter(
      (w) => (!c || w.state === c) && (o?.type === "duplicates" || (w.penetrationMm ?? 0) >= h) && (!a || JSON.stringify({ ...w, image: void 0 }).toLowerCase().includes(a))
    );
  }
  function D() {
    const o = f("test-search").value.toLowerCase();
    f("checks").innerHTML = n.checks.filter((a) => a.name.toLowerCase().includes(o)).map(
      (a) => `<button class="check-item ${a.id === m ? "active" : ""}" data-check="${a.id}"><strong>${Z(a.name)}</strong><small>${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[a.status]} · ${a.results.filter((c) => !["resolved", "excluded"].includes(c.state)).length} в работе / ${a.results.length}</small></button>`
    ).join("");
  }
  function B(o, a) {
    const c = s?.elements.filter(
      (E) => (k().includeHidden || !E.hidden) && ye(E, o)
    ).length || 0, h = o.manualOnly ? T(o) : o.modelsMode === "selected" ? o.models : (s?.models || []).map((E) => E.id), w = s && h.every((E) => s.indexedModelIds.includes(E)) ? `${c} элементов` : "число после запуска", j = s?.models || [], b = o.modelsMode !== "selected", A = n.sets.map(
      (E) => `<option value="${Z(E.id)}" ${o.presetId === E.id ? "selected" : ""}>${Z(E.name)}</option>`
    ).join("");
    return `<article class="selection" data-side="${a}"><h3>Выбор ${a.toUpperCase()} <span data-selection-count>${w}</span></h3>${o.manualOnly ? '<p class="selection-mode">Только элементы, выбранные вручную</p>' : ""}<div class="preset-row"><select class="preset"><option value="">Набор моделей…</option>${A}</select><button data-selection="load-set">Применить</button><button data-selection="save-set">Сохранить набор</button><button data-selection="delete-set" ${o.presetId ? "" : "disabled"}>Удалить</button></div><div class="model-list"><label class="model-all"><input type="checkbox" class="all-models" ${b ? "checked" : ""}> Все модели</label>${j.map((E) => `<label><input type="checkbox" class="model-check" value="${Z(E.id)}" ${b || o.models.includes(E.id) ? "checked" : ""}> ${Z(E.name)}</label>`).join("") || "<small>Нажмите «Обновить модели».</small>"}</div><small>Отметьте файлы, которые должны участвовать в выборе ${a.toUpperCase()}.</small><div class="selection-tools"><button data-selection="show">Показать выбранные элементы</button><button data-selection="only">Только выделенные в 3D</button><button data-selection="include">＋ Добавить из 3D</button><button data-selection="exclude">− Исключить из 3D</button><button data-selection="reset">Сбросить ручной выбор</button></div><small>Добавлено вручную: ${o.include.length} · исключено: ${o.exclude.length}</small></article>`;
  }
  function R() {
    D();
    const o = k();
    f("name").value = o?.name || "";
    for (const a of ["name", "copy", "delete", "run"])
      f(a).disabled = !o || g;
    for (const a of i.querySelectorAll("[data-tab]"))
      a.classList.toggle("active", a.dataset.tab === d);
    if (!o) {
      f("content").innerHTML = '<div class="empty"><h2>Создайте первую проверку</h2><p>Обновите модели, затем выберите, какие элементы проверять друг с другом.</p></div>';
      return;
    }
    d === "select" && (f("content").innerHTML = `<div class="choose-layout"><div class="parameters"><h3>Параметры проверки</h3><label>Тип<select id="type"><option value="intersection" ${o.type === "intersection" ? "selected" : ""}>По пересечению</option><option value="duplicates" ${o.type === "duplicates" ? "selected" : ""}>Дублирование</option></select></label><label title="Числовая погрешность расчёта">Точность расчёта, мм<input id="precision" type="number" value="${o.precision}" min="0.001" max="100" step="0.1"></label><label title="Конфликты с меньшим расчётным вхождением не попадут в результат">Минимальное вхождение, мм<input id="min-penetration" type="number" value="${o.minPenetration}" min="0" max="100000" step="1" ${o.type === "duplicates" ? "disabled" : ""}></label><label class="check"><input id="touching" type="checkbox" ${o.touching ? "checked" : ""} ${o.type === "duplicates" ? "disabled" : ""}>Учитывать касания</label><small>Касание — соприкосновение поверхностей без проникновения. Обычно выключено. Вхождение для произвольной IFC-геометрии является расчётной оценкой.</small><p class="legend"><span class="part-a">● Пересекающиеся элементы</span></p></div><div class="selection-grid">${B(o.a, "a")}${B(o.b, "b")}</div></div><datalist id="property-fields">${se(P(), "")}</datalist>`), d === "rules" && (f("content").innerHTML = `<div class="rules"><h3>Исключение пар</h3><p>Элемент сам с собой не проверяется. Пара А/Б учитывается один раз.</p><label class="check"><input id="same-model" type="checkbox" ${o.ignoreSameModel ? "checked" : ""}>Не проверять элементы одной модели</label><label class="check"><input id="same-group" type="checkbox" ${o.ignoreSameGroup ? "checked" : ""}>Не проверять геометрию одного составного объекта</label><label>Не проверять пары с одинаковым значением свойства<input id="equal-property" list="property-fields" value="${Z(o.equalProperty)}" placeholder="Без ограничения"></label><label class="check"><input id="hidden" type="checkbox" ${o.includeHidden ? "checked" : ""}>Включать скрытые элементы прочитанных моделей</label><p>Незагруженные подключённые файлы нужно открыть перед расчётом.</p><datalist id="property-fields">${se(P(), "")}</datalist></div>`), d === "results" && (f("content").innerHTML = `<div class="result-tools"><input id="result-search" type="search" placeholder="Поиск по результатам"><select id="result-state"><option value="">Все состояния</option>${Object.entries(
      le
    ).map(([a, c]) => `<option value="${a}">${c}</option>`).join(
      ""
    )}</select>${o.type === "intersection" ? '<input id="result-depth" type="number" min="0" step="1" placeholder="Вхождение от, мм">' : ""}<button id="show-markers" role="switch" aria-checked="${C}">${C ? "● Знаки включены" : "○ Знаки выключены"}</button><select id="bulk-state">${Object.entries(
      le
    ).map(([a, c]) => `<option value="${a}">${c}</option>`).join(
      ""
    )}</select><button id="bulk">Применить к выбранным</button></div><div class="result-area"><div class="table-area"><div class="scroll" id="table"></div><div class="pager"><button id="prev-page">←</button><span id="page"></span><button id="next-page">→</button><span id="selection-count"></span></div></div><div class="detail" id="detail"></div></div>`, H(), X()), d === "report" && (f("content").innerHTML = `<div class="report"><h3>${Z(o.name)}</h3><p>Результатов: ${o.results.length}. Выбрано: ${x.size}. ${o.status === "stale" ? "Результаты устарели — рекомендуется повторный запуск." : ""}</p><label class="check"><input id="selected-only" type="checkbox" ${x.size ? "checked" : ""}>Только выбранные строки</label><label class="check"><input id="report-images" type="checkbox" checked>Добавить снимки (недостающие будут созданы автоматически)</label><button id="export-html" class="primary">Сформировать HTML-отчёт</button><button id="export-viewer">Сессия для плагина «Коллизии»</button><p>Правила и все результаты сохраняются кнопкой «Сохранить проверки» в верхней панели.</p></div>`), f("content").inert = g;
  }
  function H() {
    const o = k(), a = S(), c = Math.max(1, Math.ceil(a.length / 50));
    u = Math.max(0, Math.min(u, c - 1));
    const h = a.slice(u * 50, u * 50 + 50);
    f("table").innerHTML = a.length ? `<table><thead><tr><th><input id="check-page" type="checkbox" aria-label="Выбрать страницу" ${h.every((w) => x.has(w.id)) ? "checked" : ""}></th>${["№", "Состояние", "Вхождение, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "Комментарий"].map((w) => `<th>${w}</th>`).join("")}</tr></thead><tbody>${h.map((w, j) => `<tr data-result="${Z(w.id)}" class="${w.id === p ? "active" : ""}"><td><input type="checkbox" class="row-check" aria-label="Выбрать конфликт" ${x.has(w.id) ? "checked" : ""}></td>${[u * 50 + j + 1, le[w.state], o.type === "duplicates" ? "—" : (w.penetrationMm ?? 0).toFixed(1), w.a.name, w.a.model, w.a.guid || "—", w.b.name, w.b.model, w.b.guid || "—", w.note].map((b) => `<td title="${Z(b)}">${Z(b)}</td>`).join("")}</tr>`).join("")}</tbody></table>` : '<div class="empty">Нет результатов. Запустите проверку или измените фильтры.</div>', f("page").textContent = `Страница ${u + 1} из ${c} · ${a.length} результатов`, f("selection-count").textContent = `Выбрано: ${x.size}`, f("prev-page").disabled = u === 0, f("next-page").disabled = u === c - 1;
  }
  function X() {
    const o = k()?.results.find((a) => a.id === p);
    f("detail").innerHTML = o ? `<h3>${Z(o.a.name)} × ${Z(o.b.name)}</h3><p class="legend"><span class="part-a">● Пересекающиеся элементы выделены красным</span></p><p>${k()?.type === "duplicates" ? "Дублирование" : `Расчётное вхождение: ${(o.penetrationMm ?? 0).toFixed(1)} мм`}</p>${o.image ? `<button id="open-image" class="preview"><img src="${Z(o.image)}" alt="Снимок коллизии"><span>Открыть крупнее</span></button>` : ""}<button id="capture-image">Снимок пары</button><div class="selection-tools"><button id="focus" class="primary">Перейти в 3D</button><button id="previous">←</button><button id="next">→</button></div><p>${o.point.map((a, c) => `${["X", "Y", "Z"][c]}: ${a.toFixed(4)}`).join(" · ")}</p><label>Состояние<select id="edit-state">${Object.entries(
      le
    ).map(
      ([a, c]) => `<option value="${a}" ${o.state === a ? "selected" : ""}>${c}</option>`
    ).join(
      ""
    )}</select></label><label>Назначение<input id="assignee" value="${Z(o.assignee)}"></label><label>Комментарий<textarea id="note" rows="3">${Z(o.note)}</textarea></label>${[
      o.a,
      o.b
    ].map(
      (a, c) => `<details><summary>Элемент ${c ? "Б" : "А"} · свойства</summary><dl>${Object.entries(
        a.properties
      ).map(([h, w]) => `<dt>${Z(h)}</dt><dd>${Z(w)}</dd>`).join("")}</dl></details>`
    ).join("")}` : "<p>Выберите конфликт в таблице.</p>";
  }
  const T = (o) => {
    const a = new Set(
      !o.manualOnly && o.modelsMode === "selected" ? o.models : []
    );
    for (const c of o.include)
      try {
        a.add(String(JSON.parse(c)[0]));
      } catch {
        const h = s?.elements.find(
          (w) => w.id === c
        )?.modelId;
        h && a.add(h);
      }
    return [...a];
  }, Q = () => {
    const o = k();
    if (!(!o || d !== "select"))
      for (const a of i.querySelectorAll("[data-side]")) {
        const c = a.dataset.side, h = [...a.querySelectorAll(".model-check")];
        if (!h.length) continue;
        const w = h.filter((A) => A.checked).map((A) => A.value), j = w.length === h.length, b = o[c];
        b.modelsMode = j ? "all" : "selected", b.models = j ? [] : w, b.conditions = [], b.mode = "all";
      }
  }, K = (o) => {
    if (!o?.length) return;
    const a = /* @__PURE__ */ new Set();
    for (const c of o)
      for (const h of [c.a, c.b]) {
        if (!h.manualOnly && h.modelsMode !== "selected") return;
        for (const w of T(h)) a.add(w);
      }
    return a;
  }, oe = () => {
    const o = k();
    if (o)
      for (const a of i.querySelectorAll("[data-side]")) {
        const c = a.dataset.side, h = s?.elements.filter(
          (A) => (o.includeHidden || !A.hidden) && ye(A, o[c])
        ).length || 0, w = o[c].manualOnly ? T(o[c]) : o[c].modelsMode === "selected" ? o[c].models : (s?.models || []).map((A) => A.id), j = !!s && w.every((A) => s.indexedModelIds.includes(A)), b = a.querySelector(
          "[data-selection-count]"
        );
        b && (b.textContent = j ? `${h} элементов` : "число после запуска");
      }
  };
  function W() {
    t.markers(
      S(),
      p,
      C,
      (o) => z(() => _(o, !0))
    );
  }
  function _(o, a = !1) {
    if (!g) {
      if (p = o, d === "results") {
        for (const c of i.querySelectorAll("[data-result]"))
          c.classList.toggle("active", c.dataset.result === o);
        X();
      }
      if (W(), a) {
        const c = k()?.results.find((h) => h.id === o);
        c && (c.image && c.imageScope === "pair" ? t.focus(c, Number(f("distance").value)) : ee(c));
      }
    }
  }
  async function ee(o) {
    y = !1, $(!0);
    try {
      o.image = await t.snapshot(
        o,
        Number(f("distance").value),
        () => y
      ), o.imageScope = "pair", M(), d === "results" && p === o.id && X();
    } catch (a) {
      q(
        "Результаты сохранены. Снимок пары не создан: " + (a instanceof Error ? a.message : String(a)),
        !0
      );
    } finally {
      $(!1);
    }
  }
  async function te(o, a = !1) {
    O();
    const c = a ? /* @__PURE__ */ new Set() : K(o);
    s = await t.scan(q, () => y, c), f("model-count").textContent = `Проиндексировано моделей: ${s.indexedModelIds.length} из ${s.models.length} · элементов: ${s.elements.length}`, R(), q(
      s.blockers.length ? s.blockers.join(" ") : s.warnings.length ? `Модели прочитаны с замечаниями. ${s.warnings.join(" ")}` : "Модели прочитаны. Настройте выборки и запустите проверку.",
      !!s.blockers.length
    );
  }
  const $ = (o) => {
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
  async function be(o) {
    const a = (h) => q(`${o.name} · ${h.phase} ${h.done}/${h.total} · найдено ${h.found}`);
    let c;
    try {
      c = new nt();
    } catch {
      return tt(
        s.elements,
        o,
        a,
        () => y,
        (h) => t.geometry(h, () => y)
      );
    }
    return v = c, new Promise((h, w) => {
      const j = () => {
        c.terminate(), v = void 0, L = void 0;
      };
      L = () => {
        j(), w(Error("Расчёт отменён. Предыдущие результаты сохранены."));
      }, c.onmessage = async (b) => {
        if (b.data.load) {
          try {
            const A = await t.geometry(
              b.data.load,
              () => y || v !== c
            );
            if (v !== c) return;
            const E = [
              A.vertices?.buffer,
              A.indices?.buffer
            ].filter(Boolean);
            c.postMessage(
              { request: b.data.request, geometry: A },
              E
            );
          } catch (A) {
            v === c && c.postMessage({
              request: b.data.request,
              error: A instanceof Error ? A.message : String(A)
            });
          }
          return;
        }
        b.data.progress ? a(b.data.progress) : (j(), b.data.error ? w(Error(b.data.error)) : h(b.data.results));
      }, c.onerror = (b) => {
        j(), w(
          Error(
            `Не удалось запустить расчёт в фоновом потоке: ${b.message || "ошибка загрузки"}`
          )
        );
      }, c.postMessage({
        elements: s.elements,
        streaming: typeof t.geometry == "function",
        check: structuredClone({ ...o, results: [], warnings: [] })
      });
    });
  }
  async function pe(o = !1) {
    if (g) return;
    O(), Q();
    const a = o ? [...n.checks] : [k()].filter(Boolean);
    if (!a.length) throw Error("Создайте проверку.");
    for (const c of a)
      for (const h of [c.a, c.b])
        h.conditions = [], h.mode = "all";
    y = !1, $(!0);
    try {
      if (await te(a), $(!0), s.blockers.length)
        throw Error(
          "Состав моделей прочитан не полностью. " + s.blockers.join(" ")
        );
      for (const h of a) {
        if (y) break;
        for (const A of [h.a, h.b]) {
          if (A.modelsMode === "selected" && A.models.some((E) => !s.models.some((N) => N.id === E)))
            throw Error(
              `${h.name}: одна из моделей выборки отсутствует. Исправьте выборку.`
            );
          if (A.include.some((E) => !s.elements.some((N) => N.id === E)))
            throw Error(
              `${h.name}: вручную добавленный элемент отсутствует в модели.`
            );
        }
        const w = Qe(h);
        if (h.configAtRun === w && h.modelsAtRun?.some(
          (A) => !s.models.some((E) => E.id === A)
        ))
          throw Error(
            `${h.name}: состав моделей уменьшился. Подключите прежние модели или создайте копию проверки для нового состава. Прежние результаты сохранены.`
          );
        const j = await be(h);
        if (y || !t.isCurrent())
          throw Error(
            "Проект изменился или расчёт отменён. Предыдущие результаты сохранены."
          );
        const b = (/* @__PURE__ */ new Date()).toISOString();
        h.results = Je(
          h.configAtRun === w ? h.results : [],
          j,
          b
        ), h.lastRun = b, h.fingerprint = s.fingerprint, h.configAtRun = w, h.modelsAtRun = [...s.indexedModelIds], h.status = "done", h.warnings = [...s.warnings], m = h.id, p = h.results[0]?.id || "", x.clear(), M();
      }
      d = "results", R(), W(), q(
        `Проверка завершена. ${k()?.results.length || 0} результатов. Сохраните проверки для продолжения работы.`
      );
      const c = k()?.results.find((h) => h.id === p);
      c && !y && await ee(c);
    } finally {
      $(!1), R();
    }
  }
  function V(o) {
    const a = o.closest("[data-side]")?.dataset.side;
    if (!a) return;
    const c = k()[a], h = o, w = o.closest("[data-side]");
    if (h.classList.contains("preset")) {
      c.presetId = h.value || void 0, w.querySelector(
        '[data-selection="delete-set"]'
      ).disabled = !c.presetId;
      return;
    }
    if (h.classList.contains("all-models")) {
      for (const j of w.querySelectorAll(
        ".model-check"
      ))
        j.checked = h.checked;
      c.modelsMode = h.checked ? "all" : "selected", c.models = [], c.manualOnly = !1, c.presetId = void 0;
    }
    if (h.classList.contains("model-check")) {
      const j = [
        ...w.querySelectorAll(".model-check")
      ], b = j.filter((E) => E.checked).map((E) => E.value), A = j.length > 0 && b.length === j.length;
      w.querySelector(".all-models").checked = A, c.modelsMode = A ? "all" : "selected", c.models = A ? [] : b, c.manualOnly = !1, c.presetId = void 0;
    }
    c.conditions = [], c.mode = "all", F(), oe();
  }
  f("new").onclick = () => {
    const o = Ze();
    o.name = `Проверка ${n.checks.length + 1}`, n.checks.push(o), m = o.id, d = "select", p = "", x.clear(), M(), R();
  }, f("scan").onclick = () => z(async () => {
    Q(), y = !1, $(!0);
    try {
      const o = k();
      await te(o ? [o] : void 0, !o);
    } finally {
      $(!1), R();
    }
  }), f("run").onclick = () => z(() => pe()), f("all").onclick = () => z(() => pe(!0)), f("cancel").onclick = () => {
    y = !0, L?.();
  }, f("test-search").oninput = D, f("checks").onclick = (o) => {
    const a = o.target.closest(
      "[data-check]"
    );
    a && !g && (t.clear(), m = a.dataset.check, p = "", x.clear(), u = 0, R());
  }, f("tabs").onclick = (o) => {
    const a = o.target.closest("[data-tab]");
    a && !g && (d = a.dataset.tab, R());
  }, f("name").onchange = () => {
    const o = k();
    o && (o.name = f("name").value.trim() || "Проверка", M(), D());
  }, f("copy").onclick = () => {
    const o = k();
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
    }), n.checks.push(a), m = a.id, p = "", x.clear(), M(), R();
  }, f("delete").onclick = () => {
    k() && confirm(`Удалить проверку «${k().name}» и её результаты?`) && (n.checks = n.checks.filter((o) => o.id !== m), m = n.checks[0]?.id || "", x.clear(), t.clear(), M(), R());
  }, f("clear-project").onclick = () => {
    !n.checks.length && !n.sets.length || confirm(
      "Очистить проверки, наборы моделей и результаты текущего проекта?"
    ) && (n.checks = [], n.sets = [], s = void 0, m = "", p = "", x.clear(), t.clear(), M(), f("model-count").textContent = "Модели не прочитаны", R(), q("Данные проверок текущего проекта очищены."));
  }, f("save").onclick = () => {
    Ne("НашеПО-проверки.json", JSON.stringify(n, null, 2)), I = !1, f("dirty").textContent = "Файл проверок сохранён";
  }, f("open").onclick = () => f("file").click(), f("file").onchange = () => z(async () => {
    const o = f("file").files?.[0];
    if (!o) return;
    const a = Te(await o.text());
    I && !confirm("Заменить текущие несохранённые проверки данными из файла?") || (n = a, r && me.set(r, n), m = n.checks[0]?.id || "", p = "", x.clear(), t.clear(), I = !1, f("dirty").textContent = "Проверки открыты", R(), q("Проверки открыты. Обновите модели перед переходом к элементам."), f("file").value = "");
  });
  for (const o of ["settings", "help"])
    f(o).onclick = () => f(o + "-dialog").showModal();
  for (const o of i.querySelectorAll("[data-close]"))
    o.onclick = () => f(o.dataset.close).close();
  f("content").onchange = (o) => z(() => {
    const a = o.target, c = k();
    if (!c) return;
    if (a.closest("[data-side]")) {
      V(a);
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
          throw a.value = String(c.precision), Error("Точность должна быть от 0,001 до 100 мм.");
        c.precision = w;
      }
      if (a.id === "min-penetration") {
        const w = Number(a.value);
        if (!Number.isFinite(w) || w < 0 || w > 1e5)
          throw a.value = String(c.minPenetration), Error(
            "Минимальное вхождение должно быть от 0 до 100 000 мм."
          );
        c.minPenetration = w;
      }
      a.id === "type" && (c.type = a.value), a.id === "touching" && (c.touching = a.checked), a.id === "same-model" && (c.ignoreSameModel = a.checked), a.id === "same-group" && (c.ignoreSameGroup = a.checked), a.id === "hidden" && (c.includeHidden = a.checked), a.id === "equal-property" && (c.equalProperty = a.value), F(), R();
      return;
    }
    if (a.id === "result-state") {
      u = 0, H();
      return;
    }
    if (a.id === "check-page") {
      for (const w of S().slice(u * 50, u * 50 + 50))
        a.checked ? x.add(w.id) : x.delete(w.id);
      H();
      return;
    }
    if (a.classList.contains("row-check")) {
      const w = a.closest("[data-result]").dataset.result;
      a.checked ? x.add(w) : x.delete(w), f("selection-count").textContent = `Выбрано: ${x.size}`;
      return;
    }
    const h = c.results.find((w) => w.id === p);
    h && (a.id === "edit-state" && (h.state = a.value, H(), D(), W()), a.id === "assignee" && (h.assignee = a.value), a.id === "note" && (h.note = a.value, H()), M());
  }), f("content").oninput = (o) => {
    const a = o.target;
    (a.id === "result-search" || a.id === "result-depth") && (u = 0, H());
    const c = k(), h = Number(a.value);
    c && a.id === "precision" && Number.isFinite(h) && h >= 1e-3 && h <= 100 && (c.precision = h, F()), c && a.id === "min-penetration" && Number.isFinite(h) && h >= 0 && h <= 1e5 && (c.minPenetration = h, F());
  }, f("content").onclick = (o) => z(async () => {
    const a = o.target, c = a.closest("button"), h = k();
    if (!h) return;
    if (c?.dataset.selection) {
      const j = c.closest("[data-side]").dataset.side, b = h[j], A = f("content").scrollTop;
      let E = !0;
      switch (c.dataset.selection) {
        case "load-set": {
          const N = n.sets.find((Y) => Y.id === b.presetId);
          if (!N) throw Error("Выберите сохранённый набор моделей.");
          Object.assign(b, structuredClone(N.selection), {
            conditions: [],
            mode: "all",
            include: [],
            exclude: [],
            manualOnly: !1,
            presetId: N.id
          });
          break;
        }
        case "save-set": {
          if (b.manualOnly)
            throw Error(
              "Ручную выборку элементов нельзя сохранить как набор моделей."
            );
          const N = await de();
          if (!N) return;
          const Y = {
            id: crypto.randomUUID(),
            name: N,
            selection: {
              models: [...b.models],
              modelsMode: b.modelsMode,
              conditions: [],
              mode: "all"
            }
          };
          n.sets.push(Y), b.presetId = Y.id, E = !1;
          break;
        }
        case "delete-set": {
          const N = n.sets.find((Y) => Y.id === b.presetId);
          if (!N) throw Error("Выберите сохранённый набор моделей.");
          if (!confirm(`Удалить набор «${N.name}»?`)) return;
          n.sets = n.sets.filter((Y) => Y.id !== N.id);
          for (const Y of n.checks)
            for (const re of [Y.a, Y.b])
              re.presetId === N.id && (re.presetId = void 0);
          E = !1;
          break;
        }
        case "show":
          t.select(
            (s?.elements || []).filter((N) => (h.includeHidden || !N.hidden) && ye(N, b)).map((N) => N.id)
          );
          return;
        case "only": {
          const N = t.selected();
          if (!N.length) throw Error("Выделите элементы в 3D-сцене.");
          b.include = N, b.exclude = [], b.manualOnly = !0;
          break;
        }
        case "include": {
          const N = t.selected();
          if (!N.length) throw Error("Выделите элементы в 3D-сцене.");
          b.include = [.../* @__PURE__ */ new Set([...b.include, ...N])], b.exclude = b.exclude.filter((Y) => !N.includes(Y));
          break;
        }
        case "exclude": {
          const N = t.selected();
          if (!N.length) throw Error("Выделите элементы в 3D-сцене.");
          b.exclude = [.../* @__PURE__ */ new Set([...b.exclude, ...N])], b.include = b.include.filter((Y) => !N.includes(Y));
          break;
        }
        case "reset":
          b.manualOnly = !1, b.include = [], b.exclude = [];
      }
      E ? F() : M(), R(), f("content").scrollTop = A;
      return;
    }
    if (c?.id === "prev-page" && (u--, H()), c?.id === "next-page" && (u++, H()), c?.id === "show-markers" && (C = !C, c.textContent = C ? "● Знаки включены" : "○ Знаки выключены", c.setAttribute("aria-checked", String(C)), W()), c?.id === "bulk") {
      const j = f("bulk-state").value;
      for (const b of h.results) x.has(b.id) && (b.state = j);
      M(), H(), X(), D(), W();
    }
    if (c?.id === "capture-image") {
      const j = h.results.find((b) => b.id === p);
      if (j) {
        y = !1, $(!0);
        try {
          j.image = await t.snapshot(
            j,
            Number(f("distance").value),
            () => y,
            !0
          ), j.imageScope = "pair", M(), X(), q("Снимок сохранён в результат.");
        } finally {
          $(!1);
        }
      }
      return;
    }
    if (c?.id === "open-image") {
      const j = h.results.find((b) => b.id === p);
      if (j?.image) {
        const b = document.createElement("dialog");
        b.className = "image-dialog", b.innerHTML = '<button>Закрыть</button><img alt="Снимок коллизии">', b.querySelector("img").src = j.image, b.querySelector("button").onclick = () => {
          b.close(), b.remove();
        }, i.append(b), b.showModal();
      }
      return;
    }
    if (c?.id === "focus" && _(p, !0), c?.id === "previous" || c?.id === "next") {
      const j = S(), b = j.findIndex((A) => A.id === p) + (c.id === "next" ? 1 : -1);
      j[b] && (u = Math.floor(b / 50), H(), _(j[b].id, !0));
    }
    if (c?.id === "export-html" || c?.id === "export-viewer") {
      let j = 0;
      const b = f("selected-only").checked ? h.results.filter((E) => x.has(E.id)) : h.results;
      if (!b.length) throw Error("Нет результатов для отчёта.");
      if (f("report-images").checked) {
        const E = t.view, N = E?.storeView();
        y = !1, $(!0);
        try {
          let Y = 0;
          for (const re of b) {
            if (y)
              throw Error(
                "Подготовка отчёта отменена. Уже полученные снимки сохранены."
              );
            if (q("Подготовка снимков: " + ++Y + " / " + b.length), !re.image || re.imageScope !== "pair") {
              if (re.state === "resolved" && !t.canLocate(re)) continue;
              try {
                re.image = await t.snapshot(
                  re,
                  Number(f("distance").value),
                  () => y
                ), re.imageScope = "pair", M();
              } catch (Be) {
                if (y || !t.isCurrent()) throw Be;
                j++;
              }
            }
          }
        } finally {
          if (E && t.isCurrent()) {
            const Y = h.results.find((re) => re.id === p);
            if (Y)
              try {
                t.focus(
                  Y,
                  Number(f("distance").value),
                  !1
                );
              } catch {
              }
            N && E.restoreView(N);
          }
          $(!1);
        }
      }
      const A = f("report-images").checked ? b.map(
        (E) => E.imageScope === "pair" ? E : { ...E, image: void 0 }
      ) : b.map((E) => ({ ...E, image: void 0 }));
      Ne(
        h.name + (c.id === "export-html" ? ".html" : ".collision360.json"),
        c.id === "export-html" ? it(h, A) : ot(h, A)
      ), q(
        "Отчёт подготовлен. Результатов: " + b.length + "; со снимками: " + A.filter((E) => E.image).length + "." + (j ? ` Не удалось создать снимков: ${j}; эти строки включены без изображения.` : ""),
        j > 0
      );
    }
    const w = a.closest("[data-result]");
    w && !a.closest("input") && !window.getSelection()?.toString() && _(w.dataset.result);
  }), f("content").ondblclick = (o) => {
    const a = o.target, c = a.closest("[data-result]");
    c && !a.closest("input") && z(() => _(c.dataset.result, !0));
  };
  const ne = setInterval(() => {
    g || (O() ? (f("model-count").textContent = "Модели не прочитаны", q(
      n.checks.length ? "Открыт другой проект. Показаны его проверки; обновите модели." : "Открыт другой проект. Для него ещё нет проверок."
    ), g || R()) : s && !t.isCurrent() && (s = void 0, t.clear(), f("model-count").textContent = "3D-окно изменилось", q("Активное 3D-окно изменилось. Обновите модели."), g || R()));
  }, 1500);
  return R(), () => {
    l(), clearInterval(ne), y = !0, L?.(), v?.terminate(), t.clear();
  };
}
var Ce = /* @__PURE__ */ ((e) => (e.object = "object", e.drawing = "drawing", e.table = "table", e.record = "record", e.textStyle = "textstyle", e.textStyleTable = "textstyles", e.linetype = "linetype", e.linetypeTable = "linetypes", e.layer = "layer", e.layerTable = "layers", e.block = "block", e.blockTable = "blocks", e.layout = "layout", e.layoutTable = "layouts", e.type = "type", e.typeTable = "types", e.material = "material", e.materialTable = "materials", e.geometry = "geometry", e.geometryTable = "geometries", e.group = "group", e.groupTable = "groups", e.attachment = "attachment", e.attachmentTable = "attachments", e.entities = "entities", e.entity = "entity", e.line = "l", e.solid = "s", e.insert = "i", e.polyline = "p", e.circle = "c", e.arc = "a", e.polyline3d = "p3", e.proxy = "x", e.text = "t", e.mtext = "mt", e.wipeout = "w", e.model3d = "g", e.alignment = "al", e))(Ce || {});
async function lt(e, t) {
  if (await new Promise((p) => requestAnimationFrame(() => p())), t()) throw Error("Подготовка снимков отменена.");
  const { width: i, height: l } = e.camera, r = Array.from(document.querySelectorAll("canvas")).filter(
    (p) => {
      const u = p.getBoundingClientRect();
      return u.width > 100 && u.height > 100 && p.width > 0 && p.height > 0 && getComputedStyle(p).visibility !== "hidden" && (Math.abs(u.width - i) < 4 && Math.abs(u.height - l) < 4 || Math.abs(p.width - i) < 4 && Math.abs(p.height - l) < 4);
    }
  );
  if (!r.length)
    throw Error(
      "Снимок 3D-окна недоступен: откройте одно видимое окно модели."
    );
  const n = r[0].getBoundingClientRect();
  if (r.some((p) => {
    const u = p.getBoundingClientRect();
    return Math.abs(u.x - n.x) > 4 || Math.abs(u.y - n.y) > 4;
  }))
    throw Error(
      "Открыто несколько подходящих 3D-окон. Оставьте одно окно для снимка."
    );
  const s = document.createElement("canvas"), m = Math.min(1, 1280 / r[0].width);
  s.width = Math.round(r[0].width * m), s.height = Math.round(r[0].height * m);
  const d = s.getContext("2d");
  d.fillStyle = "#20242b", d.fillRect(0, 0, s.width, s.height), e.repaint();
  for (const p of r)
    d.drawImage(p, 0, 0, s.width, s.height);
  try {
    return s.toDataURL("image/jpeg", 0.82);
  } catch {
    throw Error("Браузер запретил чтение изображения 3D-окна.");
  }
}
const Se = "nashepo.checks.points", qe = "nashepo.checks.highlight";
function ze(e) {
  let t = performance.now();
  return async () => {
    if (e()) throw Error("Операция отменена.");
    performance.now() - t >= 16 && (await new Promise((i) => setTimeout(i, 0)), t = performance.now());
  };
}
function we(e, t, i, l = 0) {
  if (l > 12 || e == null) return;
  if (typeof e != "object") {
    i[t] = String(e);
    return;
  }
  if (Array.isArray(e)) {
    e.forEach((n, s) => we(n, `${t}[${s}]`, i, l + 1));
    return;
  }
  const r = e;
  if ("$value" in r) {
    we(r.$value, t, i, l + 1);
    return;
  }
  for (const [n, s] of Object.entries(r))
    n.startsWith("$") || we(s, t ? `${t}.${n}` : n, i, l + 1);
}
function ct(e) {
  const t = e.vertices.length / 3, i = (s) => Number.isFinite(e.vertices[s * 3]) && Number.isFinite(e.vertices[s * 3 + 1]) && Number.isFinite(e.vertices[s * 3 + 2]), l = (s) => {
    const m = e.indices[s], d = e.indices[s + 1], p = e.indices[s + 2];
    return m < t && d < t && p < t && m !== d && d !== p && p !== m && i(m) && i(d) && i(p);
  };
  let r = 0;
  for (let s = 0; s < e.indices.length; s += 3) l(s) && (r += 3);
  if (r === e.indices.length) return e.indices;
  const n = new Uint32Array(r);
  for (let s = 0, m = 0; s < e.indices.length; s += 3)
    l(s) && (n[m++] = e.indices[s], n[m++] = e.indices[s + 1], n[m++] = e.indices[s + 2]);
  return n;
}
const Le = (e) => /\.wdx(?:[?#].*)?$/i.test(e);
class dt {
  constructor(t) {
    this.ctx = t;
  }
  ctx;
  metadata = /* @__PURE__ */ new Map();
  refs = /* @__PURE__ */ new Map();
  overlay;
  overlayError;
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
  async scan(t, i, l) {
    const r = this.app, n = this.view, s = r?.model;
    if (!n || !s?.layouts || !s.attachments)
      throw Error(
        "Откройте проект Топоматик 360 с IFC или SMDX и сделайте его 3D-окно активным."
      );
    const m = [], d = [], p = [], u = [], g = /* @__PURE__ */ new Map(), y = /* @__PURE__ */ new Set();
    let v = 2166136261;
    const C = ze(
      () => i() || r !== this.app || n !== this.view
    );
    let I = -1 / 0;
    const x = (k) => {
      for (let f = 0; f < k.length; f++)
        v = Math.imul(v ^ k.charCodeAt(f), 16777619);
    }, L = async (k, f, ie) => {
      if (y.has(k)) return;
      y.add(k);
      const q = k.layers.layer0?.modelName || f, z = f, de = Le(q) || Le(z);
      de || m.push({ id: z, name: q });
      const M = !de && (!l || l.has(z)), O = [];
      M && k.layouts.model?.walk((S) => (S.type === Ce.model3d ? O.push(S) : S.type === Ce.insert && d.push(`${q}: вставка блока не включена в расчёт.`), !1));
      const F = /* @__PURE__ */ new Map();
      for (const S of O) {
        const D = JSON.stringify([
          S.layer?.UUID || "",
          S.$id || S.$path
        ]);
        F.set(D, [S]);
      }
      let P = 0;
      for (const [S, D] of F) {
        if (i()) throw Error("Чтение моделей отменено.");
        if (r !== this.app || n !== this.view)
          throw Error(
            "Активный проект изменился. Запустите чтение моделей заново."
          );
        const B = D[0].layer, R = {};
        try {
          if (B) {
            const ee = [];
            let te = B;
            for (; te && ee.length < 64; )
              ee.unshift(te), te = te.layer;
            for (const $ of ee)
              we($.typedProperties(), "", R), $.typed?.name && (R.Тип = $.typed.name);
          }
        } catch {
          d.push(`${q} / ${S}: часть свойств недоступна.`);
        }
        const H = R["ifc.id"] || Object.entries(R).find(
          ([ee]) => /(^|\.)(globalid|ifcguid|guid)$/i.test(ee)
        )?.[1] || "", X = B?.name || D[0].$id || "Элемент", T = JSON.stringify([z, S]);
        Object.assign(R, {
          Модель: q,
          Имя: X,
          GUID: H,
          Объект: B?.UUID || S
        });
        const Q = {
          min: [1 / 0, 1 / 0, 1 / 0],
          max: [-1 / 0, -1 / 0, -1 / 0]
        };
        let K = !0, oe = !1, W = 0;
        for (const ee of D) {
          K &&= ee.isClosed;
          for (const te of Object.values(ee.meshes)) {
            const $ = te.geometry;
            if (!$ || $.indices.length % 3) {
              oe = !0;
              continue;
            }
            K &&= te.isClosed;
            for (let V = 0; V < $.vertices.length; V += 3) {
              const ne = [
                $.vertices[V],
                $.vertices[V + 1],
                $.vertices[V + 2]
              ];
              if (Math3d.mat4.mulv3(ne, ee.matrix, ne), !ne.every(Number.isFinite)) {
                oe = !0;
                continue;
              }
              for (let o = 0; o < 3; o++)
                Q.min[o] = Math.min(Q.min[o], ne[o]), Q.max[o] = Math.max(Q.max[o], ne[o]);
              if (x(ne.join(",")), V % 6e4 === 0 && (performance.now() - I > 200 && (I = performance.now(), t(
                "Индексирование: " + q + " · " + u.length + " элементов"
              )), await C(), i()))
                throw Error("Чтение моделей отменено.");
            }
            const be = $.vertices.length / 3, pe = (V) => Number.isFinite($.vertices[V * 3]) && Number.isFinite($.vertices[V * 3 + 1]) && Number.isFinite($.vertices[V * 3 + 2]);
            for (let V = 0; V < $.indices.length; V += 3) {
              const ne = $.indices[V], o = $.indices[V + 1], a = $.indices[V + 2];
              if (v = Math.imul(v ^ ne, 16777619), v = Math.imul(v ^ o, 16777619), v = Math.imul(v ^ a, 16777619), ne < be && o < be && a < be && ne !== o && o !== a && a !== ne && pe(ne) && pe(o) && pe(a) ? W++ : oe = !0, V % 15e4 === 0 && (await C(), i()))
                throw Error("Чтение моделей отменено.");
            }
          }
        }
        if (oe || !W) {
          if (W || P++, !W) continue;
          K = !1;
        }
        const _ = {
          id: T,
          name: X,
          model: q,
          modelId: z,
          guid: H,
          properties: R,
          hidden: ie || !!B?.resolveHidden() || !!B?.resolveDisabled(),
          triangles: new Float64Array(0),
          triangleCount: W,
          closed: K,
          bounds: Q
        };
        x(JSON.stringify([T, R, _.hidden])), u.push(_), g.set(T, D);
      }
      P && d.push(
        `${q}: пропущено элементов без треугольной геометрии — ${P}.`
      );
      const se = [];
      k.attachments.forEach((S) => {
        se.push(S);
      });
      for (const S of se) {
        const D = `${f}/${S.name || S.uri || S.$id}`;
        S.model ? await L(
          S.model,
          D,
          ie || S.hidden
        ) : (!l || l.has(D)) && p.push(
          `${S.name || S.uri || "Подключённая модель"}: модель не загружена. Откройте её перед расчётом.`
        );
      }
    };
    if (await L(s, s.layers.layer0?.modelName || "Проект", !1), !u.length && (!l || l.size > 0))
      throw Error(
        "В открытом проекте не найдены 3D-элементы с доступной геометрией."
      );
    return this.clear(), this.refs = g, this.metadata = new Map(u.map((k) => [k.id, k])), this.scannedApp = r, this.scannedView = n, {
      elements: u,
      fingerprint: `${u.length}:${v >>> 0}`,
      warnings: [...new Set(d)],
      blockers: [...new Set(p)],
      models: m,
      indexedModelIds: m.filter((k) => !l || l.has(k.id)).map((k) => k.id)
    };
  }
  async geometry(t, i) {
    const l = ze(() => i() || !this.isCurrent());
    if (!this.isCurrent()) throw Error("Активная модель изменилась.");
    const r = this.metadata.get(t), n = this.refs.get(t);
    if (!r || !n) throw Error("Элемент отсутствует.");
    const s = n.flatMap(
      (v) => Object.values(v.meshes).flatMap((C) => {
        const I = C.geometry;
        if (!I || I.indices.length % 3) return [];
        const x = ct(I);
        return x.length ? [{ object: v, g: I, indices: x }] : [];
      })
    );
    let m = 0, d = 0;
    for (const { g: v, indices: C } of s) {
      if (!v) throw Error("Геометрия недоступна.");
      m += v.vertices.length, d += C.length;
    }
    const p = new Float64Array(m), u = new Uint32Array(d);
    let g = 0, y = 0;
    for (const { object: v, g: C, indices: I } of s) {
      if (!C) throw Error("Геометрия недоступна.");
      for (let x = 0; x < C.vertices.length; x += 3) {
        const L = [C.vertices[x], C.vertices[x + 1], C.vertices[x + 2]];
        if (Math3d.mat4.mulv3(L, v.matrix, L), p.set(L, g + x), x % 6e4 === 0 && (await l(), i() || !this.isCurrent()))
          throw Error("Чтение геометрии отменено.");
      }
      for (let x = 0; x < I.length; x++)
        if (u[y + x] = g / 3 + I[x], x % 15e4 === 0 && (await l(), i()))
          throw Error("Чтение геометрии отменено.");
      g += C.vertices.length, y += I.length;
    }
    return { ...r, vertices: p, indices: u };
  }
  selected() {
    if (!this.isCurrent())
      throw Error("Сначала обновите модели текущего проекта.");
    const t = new Set(this.view?.layer.selectedObjects());
    return [...this.refs].filter(([, i]) => i.some((l) => t.has(l))).map(([i]) => i);
  }
  select(t) {
    if (!this.isCurrent())
      throw Error("Сначала обновите модели текущего проекта.");
    const i = new Set(t.flatMap((l) => this.refs.get(l) || []));
    this.view.layer.clearSelected(), this.view.layer.selectObjects((l) => i.has(l), !0), this.view.invalidate();
  }
  clear() {
    if (this.overlay && (this.overlay.view.layer.removeLayer(this.overlay.layer), this.overlay.view.invalidate(), this.overlay = void 0), this.pointView) {
      const t = this.pointView.annotations.get(Se);
      t && this.pointView.annotations.release(t), this.pointView.invalidate(), this.pointView = void 0;
    }
  }
  focus(t, i, l = !0) {
    if (!this.isCurrent())
      throw Error("Обновите модели текущего проекта перед переходом.");
    if (!Number.isFinite(i) || i < 0.5)
      throw Error("Дистанция камеры должна быть не менее 0,5 м.");
    if (!this.refs.has(t.a.id) || !this.refs.has(t.b.id))
      throw Error("Один из элементов отсутствует в загруженных моделях.");
    this.select([t.a.id, t.b.id]), this.highlight([t.a.id, t.b.id]);
    const r = t.point, n = this.view;
    n.camera?.id !== "3d" && n.setCameraType("3d");
    const s = [-0.65, 0.65, -0.394], m = Math.hypot(...s);
    s.forEach((d, p) => s[p] = d / m), n.lookAt(
      r.map((d, p) => d - s[p] * i),
      s,
      [0, 0, 1],
      l,
      r
    );
  }
  highlight(t) {
    this.overlayError = void 0, this.overlay && (this.overlay.view.layer.removeLayer(this.overlay.layer), this.overlay = void 0);
    const i = this.view, l = [...new Set(t.flatMap((d) => this.refs.get(d) || []))], r = 4281743103, n = l.flatMap(
      (d) => Object.values(d.meshes).flatMap((p) => {
        const u = p.geometry;
        if (!u) return [];
        const g = {
          // SDK fields may be prototype getters rather than own properties.
          uuid: qe + "." + u.uuid,
          vertices: u.vertices,
          indices: u.indices,
          normals: u.normals,
          bounds: u.bounds,
          colors: new Uint32Array(u.vertices.length / 3).fill(r)
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
        d.color = r, d.rasterizer.material = void 0;
        try {
          for (const { obj: g, geometry: y } of n) {
            d.pushMatrix();
            try {
              d.multMatrix(g.matrix), d.mesh(y);
            } finally {
              d.popMatrix();
            }
          }
        } catch (g) {
          m.visible = !1, this.overlayError = new Error(
            "Не удалось отрисовать подсветку пары: " + (g instanceof Error ? g.message : String(g))
          );
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
  async snapshot(t, i, l, r = !1) {
    if (!this.isCurrent())
      throw Error("Обновите модели перед созданием снимков.");
    if (!this.canLocate(t))
      throw Error("Элементы результата отсутствуют в открытых моделях.");
    const n = this.view, s = n.layer.drawing;
    if (!s)
      throw Error(
        "Слой моделей недоступен для снимка пары. Откройте 3D-окно проекта."
      );
    const m = s.visible, d = n.annotations.visible, p = new Set(n.layer.selectedObjects());
    try {
      r ? this.highlight([t.a.id, t.b.id]) : this.focus(t, i, !1), n.pauseAnimation(), n.layer.clearSelected(), s.visible = !1, n.annotations.visible = !1, n.invalidate();
      const u = await lt(
        n,
        () => l() || !this.isCurrent()
      );
      if (this.overlayError) throw this.overlayError;
      return u;
    } finally {
      s.visible = m, n.annotations.visible = d, n.layer.clearSelected(), n.layer.selectObjects((u) => p.has(u), !0), n.invalidate();
    }
  }
  markers(t, i, l, r) {
    if (!this.isCurrent()) return;
    const n = this.view;
    this.pointView && this.pointView !== n && this.clear();
    const s = n.annotations.get(Se);
    if (s && n.annotations.release(s), this.pointView = n, !l) {
      n.invalidate();
      return;
    }
    const m = n.annotations.create(Se, 1e4), d = t.filter((p) => p.id !== i).concat(t.filter((p) => p.id === i));
    for (const p of d.slice(-3e3)) {
      if (p.state === "resolved") continue;
      const [u, g, y] = p.point, v = p.id === i, C = p.state === "excluded" ? "#78818c" : p.state === "approved" || p.state === "reviewed" ? "#28b94b" : "#e1372d", I = v ? "#f2c94c" : C, x = () => r(p.id), L = [
        { type: "line", a: [u, g, y], b: [u, g, y + 1], color: I, width: 5 },
        {
          type: "polyline",
          points: [
            [u - 0.65, g, y + 1],
            [u + 0.65, g, y + 1],
            [u, g, y + 2.2],
            [u - 0.65, g, y + 1]
          ],
          color: I,
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
        shapes: L,
        activeShapes: L,
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
let Pe;
const ut = {
  open(e) {
    e.manager.revealView("nashepo.collisionfinder360/checks_panel");
  },
  mount(e) {
    const t = e.el;
    if (!t) return;
    Pe?.();
    const i = document.createElement("div");
    i.style.height = "100%", t.replaceChildren(i), Pe = at(i, new dt(e));
  }
};
export {
  ut as default
};
