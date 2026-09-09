const Fe = `<h2>Работа с проверками</h2>
<details open><summary>1. Первая проверка</summary><ol><li>Откройте проект и подключите IFC/SMDX штатными средствами Топоматик 360.</li><li>Откройте нижнюю вкладку «Проверки» и нажмите «Модели».</li><li>Нажмите «＋ Новая проверка» и задайте ей понятное имя.</li><li>Во вкладке «Выбор» оставьте галочки только у нужных файлов в А и Б. «Все модели» включено по умолчанию.</li><li>Выберите «По пересечению» или «Дублирование» и нажмите «Запустить».</li><li>Во вкладке «Результаты» дважды нажмите строку: камера направится к конфликту, элемент А будет выделен красным, элемент Б — синим.</li></ol><p>Первое обновление без созданной проверки получает только список файлов. При запуске индексируются модели, отмеченные хотя бы в одной стороне. Файл проекта WDX служит контейнером и в выбор моделей не попадает.</p></details>
<details><summary>2. Выбор моделей и сохранённые наборы</summary><p>Выбор А и выбор Б задают две стороны сравнения. Снимите «Все модели» и отметьте конкретные IFC/SMDX. Для поиска дубликатов внутри одного файла отметьте его с обеих сторон.</p><p>Часто используемый состав можно сохранить как набор моделей, а затем применить в другой проверке. Наборы входят в файл проверок. Состав выборки задаётся галочками моделей и ручным выделением объектов.</p><p>IFC GUID читается из свойства <code>ifc.id</code>; также поддерживаются GlobalId, IfcGuid и GUID.</p></details>
<details><summary>3. Работа с выделением в 3D</summary><p>Сначала выделите элементы штатными средствами в 3D-окне, затем используйте кнопку в нужной стороне:</p><ul><li><b>Показать выбранные элементы</b> — выделяет весь текущий состав.</li><li><b>Только выделенные в 3D</b> — оставляет только выделенные объекты.</li><li><b>＋ Добавить из 3D</b> — добавляет выделенные объекты к моделям.</li><li><b>− Исключить из 3D</b> — исключает выделенные объекты.</li><li><b>Сбросить ручной выбор</b> — снова использует отмеченные модели.</li></ul><p>Ручные идентификаторы могут измениться после замены IFC/SMDX, поэтому такую выборку следует проверить заново.</p></details>
<details><summary>4. Пересечения, вхождение, касания и дубликаты</summary><p><b>Пересечение</b> фиксирует пересечение поверхностей или вложенность замкнутых тел. <b>Расчётное вхождение</b> — оценка глубины проникновения в миллиметрах. Поле «Минимальное вхождение» отсекает меньшие результаты, например значение 20 оставляет конфликты от 20 мм.</p><p>Для открытой или неполной поверхности надёжно определить глубину нельзя; такой результат получает нулевую оценку. «Точность расчёта» задаёт числовую погрешность. <b>Касание</b> — соприкосновение без проникновения; переключатель включает такие пары.</p><p><b>Дублирование</b> ищет совпадающие треугольники в одинаковых мировых координатах. Для дубликатов внутри файла отметьте его и в А, и в Б. Порядок вершин не важен; разная триангуляция одинаковой формы пока не сопоставляется.</p></details>
<details><summary>5. Составные объекты и неполная геометрия</summary><p>Один IFC-объект может состоять из нескольких частей. Чтобы не сравнивать его части между собой, включите «Не проверять геометрию одного составного объекта» во вкладке «Правила». Там же можно исключить пары одной модели или одинакового значения свойства.</p><p>Пустые и неполные геометрические части пропускаются, а пригодные части модели продолжают участвовать. Плагин показывает сводное замечание с количеством пропущенных элементов. Незагруженный подключённый файл блокирует расчёт только тогда, когда он входит в выборку.</p></details>
<details><summary>6. Результаты и состояния</summary><p>«Новый» найден впервые, «Активный» найден повторно, «Проверенный» рассмотрен, «Подтверждённый» подтверждён, «Исключённый» исключён из работы. «Исправленный» означает, что пара исчезла при повторном расчёте с теми же правилами; состояние можно изменить вручную.</p><p>В таблице доступны IFC GUID, расчётное вхождение, назначение и комментарий. Галочки меняют состояние сразу у нескольких строк. Значения можно выделять и копировать. Состояние «Устарела» у проверки означает, что после последнего расчёта изменили её тип, выборки, параметры или правила. Результаты сохраняются до нового успешного запуска.</p></details>
<details><summary>7. Отчёт и снимки</summary><p>Кнопка «Снимок пары» в карточке результата сохраняет текущий ракурс только с двумя элементами коллизии: элемент А показан красным, элемент Б — синим. Остальные модели и знаки временно скрываются, после снимка видимость сцены восстанавливается. При формировании отчёта снимки пар создаются автоматически; старые одноцветные снимки заменяются. В результатах и готовом отчёте доступны поиск, фильтр состояний и фильтр минимального вхождения.</p><p>Файл сессии предназначен для открытия результатов в плагине «НашеПО · Коллизии». Для исправленной пары с отсутствующими элементами используется сохранённый снимок пары, если он есть.</p></details>
<details><summary>8. Проекты, сохранение и очистка</summary><p>В пределах открытой страницы каждый проект получает собственный список проверок. При переключении проекта данные предыдущего не подмешиваются. «Очистить проект» удаляет проверки, результаты и наборы только у текущего проекта.</p><p>«Сохранить проверки» записывает правила, наборы моделей, результаты, комментарии и снимки в JSON. «Открыть проверки» загружает этот файл. Геометрия в файл не входит: соответствующие модели надо открыть отдельно. После закрытия или обновления страницы продолжение работы возможно из сохранённого файла.</p></details>
<details><summary>9. Большие проекты</summary><p>Жёсткого предела в 6 млн треугольников нет. При запуске строится индекс только по отмеченным моделям. Точная геометрия передаётся в расчёт по мере появления близких пар в компактном индексированном виде.</p><p>Время и память всё равно зависят от состава выборок и числа потенциальных пар. Разделяйте проверки по моделям и системам. В сцене одновременно показывается до 3000 знаков; при 50 000 результатах расчёт останавливается без замены прежнего результата.</p></details>`;
function Ge(e) {
  let t = e.parentElement, n;
  for (; t && !n; )
    n = [...t.children].find(
      (m) => m.classList.contains("resizer-horizontal")
    ), t = t.parentElement;
  if (!n) return () => {
  };
  const l = n, s = e.ownerDocument.defaultView;
  let i;
  const a = () => {
    if (i === void 0) return;
    const m = i;
    i = void 0, l.dispatchEvent(
      new MouseEvent("mouseup", { bubbles: !0, composed: !0 })
    ), l.hasPointerCapture(m) && l.releasePointerCapture(m);
  }, c = (m) => {
    m.button === 0 && (i = m.pointerId, l.setPointerCapture(m.pointerId));
  };
  return l.addEventListener("pointerdown", c), l.addEventListener("pointerup", a), l.addEventListener("pointercancel", a), l.addEventListener("lostpointercapture", a), s.addEventListener("blur", a), () => {
    a(), l.removeEventListener("pointerdown", c), l.removeEventListener("pointerup", a), l.removeEventListener("pointercancel", a), l.removeEventListener("lostpointercapture", a), s.removeEventListener("blur", a);
  };
}
const Ye = "0.3.3", ve = (e) => typeof e == "string" && /^data:image\/(jpeg|png);base64,[A-Za-z0-9+/=]+$/.test(e), re = {
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
  indices: n,
  triangleCount: l,
  closed: s,
  bounds: i,
  ...a
}) => a;
function xe(e, t) {
  return t.exclude.includes(e.id) ? !1 : t.include.includes(e.id) ? !0 : !(t.manualOnly || t.modelsMode === "selected" && !t.models.includes(e.modelId) || t.modelsMode === void 0 && t.models.length && !t.models.includes(e.modelId));
}
const Qe = (e) => JSON.stringify([
  e.type,
  ...[e.a, e.b].map(
    ({
      models: t,
      modelsMode: n,
      conditions: l,
      mode: s,
      include: i,
      exclude: a,
      manualOnly: c
    }) => ({
      models: t,
      modelsMode: n,
      conditions: l,
      mode: s,
      include: i,
      exclude: a,
      manualOnly: c
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
function Je(e, t, n) {
  const l = new Map(e.map((i) => [i.id, i])), s = t.map((i) => {
    const a = l.get(i.id);
    return l.delete(i.id), {
      ...i,
      note: a?.note ?? "",
      assignee: a?.assignee ?? "",
      firstSeen: a?.firstSeen ?? n,
      lastSeen: n,
      state: !a || a.state === "resolved" ? "new" : a.state === "new" ? "active" : a.state
    };
  });
  for (const i of l.values())
    s.push({
      ...i,
      state: i.state === "excluded" ? "excluded" : "resolved"
    });
  return s;
}
function Te(e) {
  const t = JSON.parse(e);
  if (t?.format !== "nashepo.checks" || t.version !== 1 || !Array.isArray(t.checks))
    throw Error("Это не файл проекта проверок НашеПО.");
  const n = /* @__PURE__ */ new Set();
  if (t.sets ??= [], !Array.isArray(t.sets) || !t.sets.every(
    (s) => s && typeof s.id == "string" && typeof s.name == "string" && s.selection && Array.isArray(s.selection.models) && s.selection.models.every((i) => typeof i == "string") && (s.selection.modelsMode === void 0 || ["all", "selected"].includes(s.selection.modelsMode)) && Array.isArray(s.selection.conditions) && s.selection.conditions.every(
      (i) => i && typeof i.field == "string" && typeof i.value == "string" && ["eq", "ne", "contains", "exists", "gt", "lt"].includes(
        i.op
      )
    ) && ["all", "any"].includes(s.selection.mode)
  ))
    throw Error("Некорректные наборы моделей.");
  const l = (s) => /\.wdx(?:[?#].*)?$/i.test(s);
  for (const s of t.sets)
    s.selection.models = s.selection.models.filter(
      (i) => !l(i)
    ), s.selection.conditions = [], s.selection.mode = "all", s.selection.modelsMode ??= s.selection.models.length ? "selected" : "all";
  for (const s of t.checks) {
    if (!s || typeof s.id != "string" || n.has(s.id) || typeof s.name != "string" || !["intersection", "duplicates"].includes(s.type) || !["new", "done", "stale"].includes(s.status) || !Number.isFinite(s.precision) || s.precision < 1e-3 || s.precision > 100 || s.minPenetration !== void 0 && (!Number.isFinite(s.minPenetration) || s.minPenetration < 0 || s.minPenetration > 1e5) || !Array.isArray(s.results))
      throw Error("Некорректные параметры проверки.");
    if (n.add(s.id), s.minPenetration ??= 0, ![
      "touching",
      "ignoreSameModel",
      "ignoreSameGroup",
      "includeHidden"
    ].every(
      (i) => typeof s[i] == "boolean"
    ) || typeof s.equalProperty != "string" || s.warnings !== void 0 && (!Array.isArray(s.warnings) || !s.warnings.every((i) => typeof i == "string")) || s.modelsAtRun !== void 0 && (!Array.isArray(s.modelsAtRun) || !s.modelsAtRun.every((i) => typeof i == "string")))
      throw Error("Некорректные правила проверки.");
    s.warnings ??= [], s.modelsAtRun = s.modelsAtRun?.filter((i) => !l(i));
    for (const i of [s.a, s.b]) {
      if (!i || i.manualOnly !== void 0 && typeof i.manualOnly != "boolean" || i.modelsMode !== void 0 && !["all", "selected"].includes(i.modelsMode) || i.presetId !== void 0 && typeof i.presetId != "string" || !["all", "any"].includes(i.mode) || ![i.models, i.include, i.exclude].every(
        (a) => Array.isArray(a) && a.every((c) => typeof c == "string")
      ) || !Array.isArray(i.conditions) || !i.conditions.every(
        (a) => a && typeof a.field == "string" && typeof a.value == "string" && ["eq", "ne", "contains", "exists", "gt", "lt"].includes(a.op)
      ))
        throw Error("Некорректная выборка.");
      i.modelsMode ??= i.models.length ? "selected" : "all", i.models = i.models.filter((a) => !l(a)), i.conditions = [], i.mode = "all";
    }
    for (const i of s.results) {
      if (i?.image !== void 0 && !ve(i.image))
        throw Error("Некорректный снимок результата.");
      if (i?.imageScope !== void 0 && i.imageScope !== "pair" && i.imageScope !== "pair-ab")
        throw Error("Некорректный состав снимка результата.");
      if (!i || typeof i.id != "string" || !Object.hasOwn(re, i.state) || i.penetrationMm !== void 0 && (!Number.isFinite(i.penetrationMm) || i.penetrationMm < 0) || !Array.isArray(i.point) || i.point.length !== 3 || !i.point.every(Number.isFinite))
        throw Error("Некорректный результат.");
      for (const a of [i.a, i.b])
        if (!a || !["id", "name", "model", "modelId", "guid"].every(
          (c) => typeof a[c] == "string"
        ) || !a.properties || typeof a.properties != "object")
          throw Error("Некорректный элемент результата.");
    }
  }
  return t;
}
const U = (e, t) => [e[0] - t[0], e[1] - t[1], e[2] - t[2]], fe = (e, t, n = 1) => [
  e[0] + t[0] * n,
  e[1] + t[1] * n,
  e[2] + t[2] * n
], J = (e, t) => e[0] * t[0] + e[1] * t[1] + e[2] * t[2], he = (e, t) => [
  e[1] * t[2] - e[2] * t[1],
  e[2] * t[0] - e[0] * t[2],
  e[0] * t[1] - e[1] * t[0]
], Y = (e) => Math.hypot(...e), le = (e) => e.triangleCount ?? (e.indices ? e.indices.length / 3 : e.triangles.length / 9), de = (e, t, n) => e.indices && e.vertices ? e.vertices[e.indices[t * 3 + Math.floor(n / 3)] * 3 + n % 3] : e.triangles[t * 9 + n], pe = (e, t) => [0, 3, 6].map((n) => [
  de(e, t, n),
  de(e, t, n + 1),
  de(e, t, n + 2)
]);
function De(e) {
  const t = [1 / 0, 1 / 0, 1 / 0], n = [-1 / 0, -1 / 0, -1 / 0];
  for (let l = 0; l < e.length; l++) {
    const s = l % 3;
    t[s] = Math.min(t[s], e[l]), n[s] = Math.max(n[s], e[l]);
  }
  return { min: t, max: n };
}
const Re = (e, t, n) => e.min.every((l, s) => l <= t.max[s] + n && e.max[s] >= t.min[s] - n);
function je(e, t) {
  const n = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const c of t)
    for (let m = 0; m < 9; m++) {
      const u = m % 3, p = de(e, c, m);
      n.min[u] = Math.min(n.min[u], p), n.max[u] = Math.max(n.max[u], p);
    }
  if (t.length <= 12) return { ...n, ids: t };
  const l = n.max.map((c, m) => c - n.min[m]), s = l.indexOf(Math.max(...l)), i = (c) => de(e, c, s) + de(e, c, s + 3) + de(e, c, s + 6);
  t.sort((c, m) => i(c) - i(m));
  const a = t.length >> 1;
  return {
    ...n,
    left: je(e, t.slice(0, a)),
    right: je(e, t.slice(a))
  };
}
function* ge(e, t, n) {
  Re(e, t, n) && (e.ids ? yield* e.ids : (yield* ge(e.left, t, n), yield* ge(e.right, t, n)));
}
function Ie(e, t) {
  const n = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const a of t)
    for (let c = 0; c < 3; c++)
      n.min[c] = Math.min(n.min[c], e[a].bounds.min[c]), n.max[c] = Math.max(n.max[c], e[a].bounds.max[c]);
  if (t.length <= 16) return { ...n, ids: t };
  const l = n.max.map((a, c) => a - n.min[c]), s = l.indexOf(Math.max(...l));
  t.sort(
    (a, c) => e[a].bounds.min[s] + e[a].bounds.max[s] - (e[c].bounds.min[s] + e[c].bounds.max[s])
  );
  const i = t.length >> 1;
  return {
    ...n,
    left: Ie(e, t.slice(0, i)),
    right: Ie(e, t.slice(i))
  };
}
function Ee(e, t, n, l) {
  const s = U(t, e), i = U(n[1], n[0]), a = U(n[2], n[0]), c = he(s, a), m = J(i, c);
  if (Math.abs(m) <= 1e-12 * Y(s) * Y(i) * Y(a)) return;
  const u = 1 / m, p = U(e, n[0]), y = J(p, c) * u, g = he(p, i), v = J(s, g) * u, C = J(a, g) * u, I = l / Math.max(Y(i), Y(a), l);
  if (y >= -I && v >= -I && y + v <= 1 + I && C >= -I && C <= 1 + I)
    return fe(e, s, Math.max(0, Math.min(1, C)));
}
function He(e, t, n, l) {
  const s = n.map(Math.abs).indexOf(Math.max(...n.map(Math.abs))), i = [0, 1, 2].filter((m) => m !== s), a = (m, u, p) => (u[i[0]] - m[i[0]]) * (p[i[1]] - m[i[1]]) - (u[i[1]] - m[i[1]]) * (p[i[0]] - m[i[0]]), c = (m, u) => {
    const p = u.map((y, g) => a(y, u[(g + 1) % 3], m));
    return p.every((y) => y >= -l * Y(n)) || p.every((y) => y <= l * Y(n));
  };
  for (const m of e) if (c(m, t)) return m;
  for (const m of t) if (c(m, e)) return m;
  for (let m = 0; m < 3; m++)
    for (let u = 0; u < 3; u++) {
      const p = e[m], y = e[(m + 1) % 3], g = t[u], v = t[(u + 1) % 3], C = U(y, p), I = U(v, g), w = C[i[0]] * I[i[1]] - C[i[1]] * I[i[0]];
      if (Math.abs(w) < 1e-18) continue;
      const L = U(g, p), j = (L[i[0]] * I[i[1]] - L[i[1]] * I[i[0]]) / w, h = (L[i[0]] * C[i[1]] - L[i[1]] * C[i[0]]) / w;
      if (j >= 0 && j <= 1 && h >= 0 && h <= 1) return fe(p, C, j);
    }
}
function We(e, t, n, l) {
  const s = he(U(e[1], e[0]), U(e[2], e[0])), i = he(U(t[1], t[0]), U(t[2], t[0])), a = Y(s), c = Y(i);
  if (a < 1e-20 || c < 1e-20) return;
  const m = t.map((p) => J(U(p, e[0]), s) / a), u = e.map((p) => J(U(p, t[0]), i) / c);
  if (!(m.every((p) => p > n) || m.every((p) => p < -n) || u.every((p) => p > n) || u.every((p) => p < -n))) {
    if (m.every((p) => Math.abs(p) <= n) && u.every((p) => Math.abs(p) <= n))
      return l ? He(e, t, s, n) : void 0;
    if (!(!l && (!(Math.min(...m) < -n && Math.max(...m) > n) || !(Math.min(...u) < -n && Math.max(...u) > n))))
      for (let p = 0; p < 3; p++) {
        const y = Ee(e[p], e[(p + 1) % 3], t, n);
        if (y) return y;
        const g = Ee(t[p], t[(p + 1) % 3], e, n);
        if (g) return g;
      }
  }
}
function Xe(e, t, n) {
  const l = U(t[1], t[0]), s = U(t[2], t[0]), i = he(l, s), a = Y(i);
  if (a < 1e-20 || Math.abs(J(U(e, t[0]), i)) / a > n) return !1;
  const c = U(e, t[0]), m = J(l, l), u = J(l, s), p = J(s, s), y = J(c, l), g = J(c, s), v = m * p - u * u;
  if (Math.abs(v) < 1e-30) return !1;
  const C = (y * p - g * u) / v, I = (g * m - y * u) / v, w = n / Math.max(Y(l), Y(s), n);
  return C >= -w && I >= -w && C + I <= 1 + w;
}
function ye(e, t, n, l) {
  if (!t.closed || e.some((y, g) => y <= t.bounds.min[g] + l || y >= t.bounds.max[g] - l))
    return !1;
  for (const y of ge(n, { min: e, max: e }, l))
    if (Xe(e, pe(t, y), l)) return !1;
  const s = [1, 0.371390676, 0.52999894], i = Y(U(t.bounds.max, t.bounds.min)) * 3 + 1, a = fe(e, s, i), c = [], m = De([...e, ...a]);
  for (const y of ge(n, m, l)) {
    const g = Ee(e, a, pe(t, y), l);
    if (g) {
      const v = Y(U(g, e));
      v > l && c.push(v);
    }
  }
  c.sort((y, g) => y - g);
  let u = 0, p = -1 / 0;
  for (const y of c)
    y - p > l * 2 && (u++, p = y);
  return u % 2 === 1;
}
function Me(e, t) {
  return Math.hypot(
    ...e.map((n, l) => Math.max(t.min[l] - n, 0, n - t.max[l]))
  );
}
function Ke(e, t) {
  const n = U(t[1], t[0]), l = U(t[2], t[0]), s = U(e, t[0]), i = J(n, s), a = J(l, s);
  if (i <= 0 && a <= 0) return Y(s);
  const c = U(e, t[1]), m = J(n, c), u = J(l, c);
  if (m >= 0 && u <= m) return Y(c);
  if (i * u - m * a <= 0 && i >= 0 && m <= 0) {
    const L = i / (i - m);
    return Y(U(e, fe(t[0], n, L)));
  }
  const y = U(e, t[2]), g = J(n, y), v = J(l, y);
  if (v >= 0 && g <= v) return Y(y);
  if (g * a - i * v <= 0 && a >= 0 && v <= 0) {
    const L = a / (a - v);
    return Y(U(e, fe(t[0], l, L)));
  }
  if (m * v - g * u <= 0 && u - m >= 0 && g - v >= 0) {
    const L = U(t[2], t[1]), j = (u - m) / (u - m + (g - v));
    return Y(U(e, fe(t[1], L, j)));
  }
  const w = he(n, l);
  return Math.abs(J(s, w)) / Math.max(Y(w), 1e-30);
}
function _e(e, t, n) {
  let l = 1 / 0;
  const s = (i) => {
    if (Me(e, i) >= l) return;
    if (i.ids) {
      for (const m of i.ids)
        l = Math.min(l, Ke(e, pe(t, m)));
      return;
    }
    const a = i.left, c = i.right;
    Me(e, a) < Me(e, c) ? (s(a), s(c)) : (s(c), s(a));
  };
  return s(n), l;
}
async function et(e, t, n, l, s, i, a) {
  if (!e.closed || !t.closed) return 0;
  let c = 0;
  const m = (p, y, g) => {
    ye(p, y, g, i) && (c = Math.max(c, _e(p, y, g)));
  };
  m(s, e, n), m(s, t, l);
  let u = 0;
  for (const [p, y, g] of [
    [e, t, l],
    [t, e, n]
  ]) {
    const v = le(p), C = Math.max(1, Math.floor(v / 1024));
    for (let I = 0; I < v; I += C) {
      const w = pe(p, I), L = w[0].map((q, N) => (w[0][N] + w[1][N] + w[2][N]) / 3), j = w[0].map((q, N) => (w[0][N] + w[1][N]) / 2), h = w[0].map((q, N) => (w[1][N] + w[2][N]) / 2), ne = w[0].map((q, N) => (w[2][N] + w[0][N]) / 2);
      for (const q of [w[0], w[1], w[2], j, h, ne, L])
        m(q, y, g);
      u++ % 32 === 0 && await a();
    }
  }
  if (c <= i) {
    const p = e.bounds.min.map(
      (y, g) => Math.min(e.bounds.max[g], t.bounds.max[g]) - Math.max(y, t.bounds.min[g])
    );
    c = Math.max(0, Math.min(...p));
  }
  return c * 1e3;
}
async function tt(e, t, n, l, s) {
  const i = t.precision / 1e3;
  if (!Number.isFinite(i) || i <= 0)
    throw Error("Точность расчёта должна быть положительным числом.");
  const a = e.filter((M) => t.includeHidden || !M.hidden), c = a.filter((M) => xe(M, t.a)), m = a.filter((M) => xe(M, t.b));
  if (!c.length || !m.length)
    throw Error(
      "Выборка А или Б не содержит элементов. Отметьте хотя бы одну модель в каждой стороне проверки."
    );
  let u = performance.now();
  const p = async () => {
    if (l())
      throw Error("Расчёт отменён. Предыдущие результаты сохранены.");
    performance.now() - u > 16 && (await new Promise((M) => setTimeout(M, 0)), u = performance.now());
  }, y = /* @__PURE__ */ new Map(), g = (M) => {
    let O = y.get(M.id);
    return O || (O = je(
      M,
      Array.from({ length: le(M) }, (F, P) => P)
    ), y.set(M.id, O)), O;
  }, v = /* @__PURE__ */ new Map(), C = async (M) => {
    let O = v.get(M.id);
    if (O !== void 0) return O;
    const F = [];
    for (let P = 0; P < le(M); P++)
      F.push(
        [0, 3, 6].map(
          (se) => [0, 1, 2].map((S) => Math.round(de(M, P, se + S) / i)).join(",")
        ).sort().join(";")
      ), P % 9e3 === 0 && await p();
    return O = F.sort().join("|"), v.set(M.id, O), O;
  }, I = [], w = new Set(c.map((M) => M.id)), L = new Set(m.map((M) => M.id)), j = Ie(
    m,
    m.map((M, O) => O)
  ), h = /* @__PURE__ */ new Map();
  let ne = 0;
  const q = (M) => M.triangles.byteLength + (M.vertices?.byteLength || 0) + (M.indices?.byteLength || 0) + le(M) * 32;
  async function N(M, O) {
    if (!s) return M;
    let F = h.get(M.id);
    if (F)
      return h.delete(M.id), h.set(M.id, F), F;
    for (const [P, se] of h)
      P !== O && ne > 96 * 1024 * 1024 && (h.delete(P), ne -= q(se), y.delete(P), v.delete(P));
    return F = await s(M.id), h.set(M.id, F), ne += q(F), F;
  }
  let ce = -1 / 0;
  for (let M = 0; M < c.length; M++) {
    const O = c[M];
    performance.now() - ce > 150 && (ce = performance.now(), n({
      phase: "Проверка пар",
      done: M,
      total: c.length,
      found: I.length
    }));
    for (const F of ge(j, O.bounds, i)) {
      const P = m[F];
      if (await p(), O.id === P.id || !Re(O.bounds, P.bounds, i) || t.ignoreSameModel && O.modelId === P.modelId || t.ignoreSameGroup && O.modelId === P.modelId && O.properties.Объект && O.properties.Объект === P.properties.Объект || t.equalProperty && O.properties[t.equalProperty] !== void 0 && O.properties[t.equalProperty] === P.properties[t.equalProperty] || O.id > P.id && w.has(P.id) && L.has(O.id)) continue;
      const se = Ve(O.id, P.id), S = await N(O), D = await N(P, O.id);
      let B, R = "surface", H = 0;
      if (t.type === "duplicates") {
        if (le(S) !== le(D) || S.bounds.min.some(
          (X, T) => Math.abs(X - D.bounds.min[T]) > i || Math.abs(S.bounds.max[T] - D.bounds.max[T]) > i
        ))
          continue;
        await C(S) === await C(D) && (B = S.bounds.min.map((X, T) => (X + S.bounds.max[T]) / 2), R = "duplicate");
      } else {
        const X = g(S), T = g(D);
        for (let Q = 0; Q < le(S) && !B; Q++) {
          const K = pe(S, Q), oe = De(K.flat());
          for (const W of ge(T, oe, i)) {
            if (B = We(K, pe(D, W), i, t.touching), B) break;
            await p();
          }
          await p();
        }
        if (!B && S.closed && D.closed) {
          const Q = S.bounds.min.map(
            (K, oe) => (K + S.bounds.max[oe]) / 2
          );
          ye(Q, S, X, i) && ye(Q, D, T, i) && (B = Q, R = "contained");
        }
        if (!B) {
          for (const [Q, K, oe] of [
            [S, D, T],
            [D, S, X]
          ])
            if (K.closed) {
              for (let W = 0; W < le(Q) && !B; W++) {
                const _ = pe(Q, W), ee = _[0].map(
                  (te, z) => (_[0][z] + _[1][z] + _[2][z]) / 3
                );
                for (const te of [_[0], ee])
                  if (ye(te, K, oe, i)) {
                    B = te, R = "contained";
                    break;
                  }
                await p();
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
          i,
          p
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
  return n({
    phase: "Готово",
    done: c.length,
    total: c.length,
    found: I.length
  }), I;
}
const Ue = `(function(){"use strict";const on=({triangles:t,vertices:n,indices:i,triangleCount:s,closed:f,bounds:e,...c})=>c;function rn(t,n){return n.exclude.includes(t.id)?!1:n.include.includes(t.id)?!0:!(n.manualOnly||n.modelsMode==="selected"&&!n.models.includes(t.modelId)||n.modelsMode===void 0&&n.models.length&&!n.models.includes(t.modelId))}const cn=(t,n)=>JSON.stringify([t,n].sort()),y=(t,n)=>[t[0]-n[0],t[1]-n[1],t[2]-n[2]],G=(t,n,i=1)=>[t[0]+n[0]*i,t[1]+n[1]*i,t[2]+n[2]*i],w=(t,n)=>t[0]*n[0]+t[1]*n[1]+t[2]*n[2],H=(t,n)=>[t[1]*n[2]-t[2]*n[1],t[2]*n[0]-t[0]*n[2],t[0]*n[1]-t[1]*n[0]],p=t=>Math.hypot(...t),L=t=>t.triangleCount??(t.indices?t.indices.length/3:t.triangles.length/9),D=(t,n,i)=>t.indices&&t.vertices?t.vertices[t.indices[n*3+Math.floor(i/3)]*3+i%3]:t.triangles[n*9+i],z=(t,n)=>[0,3,6].map(i=>[D(t,n,i),D(t,n,i+1),D(t,n,i+2)]);function sn(t){const n=[1/0,1/0,1/0],i=[-1/0,-1/0,-1/0];for(let s=0;s<t.length;s++){const f=s%3;n[f]=Math.min(n[f],t[s]),i[f]=Math.max(i[f],t[s])}return{min:n,max:i}}const an=(t,n,i)=>t.min.every((s,f)=>s<=n.max[f]+i&&t.max[f]>=n.min[f]-i);function X(t,n){const i={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const o of n)for(let r=0;r<9;r++){const u=r%3,a=D(t,o,r);i.min[u]=Math.min(i.min[u],a),i.max[u]=Math.max(i.max[u],a)}if(n.length<=12)return{...i,ids:n};const s=i.max.map((o,r)=>o-i.min[r]),f=s.indexOf(Math.max(...s)),e=o=>D(t,o,f)+D(t,o,f+3)+D(t,o,f+6);n.sort((o,r)=>e(o)-e(r));const c=n.length>>1;return{...i,left:X(t,n.slice(0,c)),right:X(t,n.slice(c))}}function*J(t,n,i){an(t,n,i)&&(t.ids?yield*t.ids:(yield*J(t.left,n,i),yield*J(t.right,n,i)))}function Y(t,n){const i={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const c of n)for(let o=0;o<3;o++)i.min[o]=Math.min(i.min[o],t[c].bounds.min[o]),i.max[o]=Math.max(i.max[o],t[c].bounds.max[o]);if(n.length<=16)return{...i,ids:n};const s=i.max.map((c,o)=>c-i.min[o]),f=s.indexOf(Math.max(...s));n.sort((c,o)=>t[c].bounds.min[f]+t[c].bounds.max[f]-(t[o].bounds.min[f]+t[o].bounds.max[f]));const e=n.length>>1;return{...i,left:Y(t,n.slice(0,e)),right:Y(t,n.slice(e))}}function Z(t,n,i,s){const f=y(n,t),e=y(i[1],i[0]),c=y(i[2],i[0]),o=H(f,c),r=w(e,o);if(Math.abs(r)<=1e-12*p(f)*p(e)*p(c))return;const u=1/r,a=y(t,i[0]),d=w(a,o)*u,l=H(a,e),M=w(f,l)*u,I=w(c,l)*u,x=s/Math.max(p(e),p(c),s);if(d>=-x&&M>=-x&&d+M<=1+x&&I>=-x&&I<=1+x)return G(t,f,Math.max(0,Math.min(1,I)))}function un(t,n,i,s){const f=i.map(Math.abs).indexOf(Math.max(...i.map(Math.abs))),e=[0,1,2].filter(r=>r!==f),c=(r,u,a)=>(u[e[0]]-r[e[0]])*(a[e[1]]-r[e[1]])-(u[e[1]]-r[e[1]])*(a[e[0]]-r[e[0]]),o=(r,u)=>{const a=u.map((d,l)=>c(d,u[(l+1)%3],r));return a.every(d=>d>=-s*p(i))||a.every(d=>d<=s*p(i))};for(const r of t)if(o(r,n))return r;for(const r of n)if(o(r,t))return r;for(let r=0;r<3;r++)for(let u=0;u<3;u++){const a=t[r],d=t[(r+1)%3],l=n[u],M=n[(u+1)%3],I=y(d,a),x=y(M,l),h=I[e[0]]*x[e[1]]-I[e[1]]*x[e[0]];if(Math.abs(h)<1e-18)continue;const P=y(l,a),C=(P[e[0]]*x[e[1]]-P[e[1]]*x[e[0]])/h,j=(P[e[0]]*I[e[1]]-P[e[1]]*I[e[0]])/h;if(C>=0&&C<=1&&j>=0&&j<=1)return G(a,I,C)}}function dn(t,n,i,s){const f=H(y(t[1],t[0]),y(t[2],t[0])),e=H(y(n[1],n[0]),y(n[2],n[0])),c=p(f),o=p(e);if(c<1e-20||o<1e-20)return;const r=n.map(a=>w(y(a,t[0]),f)/c),u=t.map(a=>w(y(a,n[0]),e)/o);if(!(r.every(a=>a>i)||r.every(a=>a<-i)||u.every(a=>a>i)||u.every(a=>a<-i))){if(r.every(a=>Math.abs(a)<=i)&&u.every(a=>Math.abs(a)<=i))return s?un(t,n,f,i):void 0;if(!(!s&&(!(Math.min(...r)<-i&&Math.max(...r)>i)||!(Math.min(...u)<-i&&Math.max(...u)>i))))for(let a=0;a<3;a++){const d=Z(t[a],t[(a+1)%3],n,i);if(d)return d;const l=Z(n[a],n[(a+1)%3],t,i);if(l)return l}}}function ln(t,n,i){const s=y(n[1],n[0]),f=y(n[2],n[0]),e=H(s,f),c=p(e);if(c<1e-20||Math.abs(w(y(t,n[0]),e))/c>i)return!1;const o=y(t,n[0]),r=w(s,s),u=w(s,f),a=w(f,f),d=w(o,s),l=w(o,f),M=r*a-u*u;if(Math.abs(M)<1e-30)return!1;const I=(d*a-l*u)/M,x=(l*r-d*u)/M,h=i/Math.max(p(s),p(f),i);return I>=-h&&x>=-h&&I+x<=1+h}function V(t,n,i,s){if(!n.closed||t.some((d,l)=>d<=n.bounds.min[l]+s||d>=n.bounds.max[l]-s))return!1;for(const d of J(i,{min:t,max:t},s))if(ln(t,z(n,d),s))return!1;const f=[1,.371390676,.52999894],e=p(y(n.bounds.max,n.bounds.min))*3+1,c=G(t,f,e),o=[],r=sn([...t,...c]);for(const d of J(i,r,s)){const l=Z(t,c,z(n,d),s);if(l){const M=p(y(l,t));M>s&&o.push(M)}}o.sort((d,l)=>d-l);let u=0,a=-1/0;for(const d of o)d-a>s*2&&(u++,a=d);return u%2===1}function $(t,n){return Math.hypot(...t.map((i,s)=>Math.max(n.min[s]-i,0,i-n.max[s])))}function mn(t,n){const i=y(n[1],n[0]),s=y(n[2],n[0]),f=y(t,n[0]),e=w(i,f),c=w(s,f);if(e<=0&&c<=0)return p(f);const o=y(t,n[1]),r=w(i,o),u=w(s,o);if(r>=0&&u<=r)return p(o);if(e*u-r*c<=0&&e>=0&&r<=0){const P=e/(e-r);return p(y(t,G(n[0],i,P)))}const d=y(t,n[2]),l=w(i,d),M=w(s,d);if(M>=0&&l<=M)return p(d);if(l*c-e*M<=0&&c>=0&&M<=0){const P=c/(c-M);return p(y(t,G(n[0],s,P)))}if(r*M-l*u<=0&&u-r>=0&&l-M>=0){const P=y(n[2],n[1]),C=(u-r)/(u-r+(l-M));return p(y(t,G(n[1],P,C)))}const h=H(i,s);return Math.abs(w(f,h))/Math.max(p(h),1e-30)}function hn(t,n,i){let s=1/0;const f=e=>{if($(t,e)>=s)return;if(e.ids){for(const r of e.ids)s=Math.min(s,mn(t,z(n,r)));return}const c=e.left,o=e.right;$(t,c)<$(t,o)?(f(c),f(o)):(f(o),f(c))};return f(i),s}async function gn(t,n,i,s,f,e,c){if(!t.closed||!n.closed)return 0;let o=0;const r=(a,d,l)=>{V(a,d,l,e)&&(o=Math.max(o,hn(a,d,l)))};r(f,t,i),r(f,n,s);let u=0;for(const[a,d,l]of[[t,n,s],[n,t,i]]){const M=L(a),I=Math.max(1,Math.floor(M/1024));for(let x=0;x<M;x+=I){const h=z(a,x),P=h[0].map((N,_)=>(h[0][_]+h[1][_]+h[2][_])/3),C=h[0].map((N,_)=>(h[0][_]+h[1][_])/2),j=h[0].map((N,_)=>(h[1][_]+h[2][_])/2),K=h[0].map((N,_)=>(h[2][_]+h[0][_])/2);for(const N of[h[0],h[1],h[2],C,j,K,P])r(N,d,l);u++%32===0&&await c()}}if(o<=e){const a=t.bounds.min.map((d,l)=>Math.min(t.bounds.max[l],n.bounds.max[l])-Math.max(d,n.bounds.min[l]));o=Math.max(0,Math.min(...a))}return o*1e3}async function yn(t,n,i,s,f){const e=n.precision/1e3;if(!Number.isFinite(e)||e<=0)throw Error("Точность расчёта должна быть положительным числом.");const c=t.filter(m=>n.includeHidden||!m.hidden),o=c.filter(m=>rn(m,n.a)),r=c.filter(m=>rn(m,n.b));if(!o.length||!r.length)throw Error("Выборка А или Б не содержит элементов. Отметьте хотя бы одну модель в каждой стороне проверки.");let u=performance.now();const a=async()=>{if(s())throw Error("Расчёт отменён. Предыдущие результаты сохранены.");performance.now()-u>16&&(await new Promise(m=>setTimeout(m,0)),u=performance.now())},d=new Map,l=m=>{let g=d.get(m.id);return g||(g=X(m,Array.from({length:L(m)},(S,b)=>b)),d.set(m.id,g)),g},M=new Map,I=async m=>{let g=M.get(m.id);if(g!==void 0)return g;const S=[];for(let b=0;b<L(m);b++)S.push([0,3,6].map(B=>[0,1,2].map(v=>Math.round(D(m,b,B+v)/e)).join(",")).sort().join(";")),b%9e3===0&&await a();return g=S.sort().join("|"),M.set(m.id,g),g},x=[],h=new Set(o.map(m=>m.id)),P=new Set(r.map(m=>m.id)),C=Y(r,r.map((m,g)=>g)),j=new Map;let K=0;const N=m=>m.triangles.byteLength+(m.vertices?.byteLength||0)+(m.indices?.byteLength||0)+L(m)*32;async function _(m,g){if(!f)return m;let S=j.get(m.id);if(S)return j.delete(m.id),j.set(m.id,S),S;for(const[b,B]of j)b!==g&&K>96*1024*1024&&(j.delete(b),K-=N(B),d.delete(b),M.delete(b));return S=await f(m.id),j.set(m.id,S),K+=N(S),S}let fn=-1/0;for(let m=0;m<o.length;m++){const g=o[m];performance.now()-fn>150&&(fn=performance.now(),i({phase:"Проверка пар",done:m,total:o.length,found:x.length}));for(const S of J(C,g.bounds,e)){const b=r[S];if(await a(),g.id===b.id||!an(g.bounds,b.bounds,e)||n.ignoreSameModel&&g.modelId===b.modelId||n.ignoreSameGroup&&g.modelId===b.modelId&&g.properties.Объект&&g.properties.Объект===b.properties.Объект||n.equalProperty&&g.properties[n.equalProperty]!==void 0&&g.properties[n.equalProperty]===b.properties[n.equalProperty]||g.id>b.id&&h.has(b.id)&&P.has(g.id))continue;const B=cn(g.id,b.id),v=await _(g),E=await _(b,g.id);let q,W="surface",nn=0;if(n.type==="duplicates"){if(L(v)!==L(E)||v.bounds.min.some((A,O)=>Math.abs(A-E.bounds.min[O])>e||Math.abs(v.bounds.max[O]-E.bounds.max[O])>e))continue;await I(v)===await I(E)&&(q=v.bounds.min.map((A,O)=>(A+v.bounds.max[O])/2),W="duplicate")}else{const A=l(v),O=l(E);for(let T=0;T<L(v)&&!q;T++){const F=z(v,T),Q=sn(F.flat());for(const R of J(O,Q,e)){if(q=dn(F,z(E,R),e,n.touching),q)break;await a()}await a()}if(!q&&v.closed&&E.closed){const T=v.bounds.min.map((F,Q)=>(F+v.bounds.max[Q])/2);V(T,v,A,e)&&V(T,E,O,e)&&(q=T,W="contained")}if(!q){for(const[T,F,Q]of[[v,E,O],[E,v,A]])if(F.closed){for(let R=0;R<L(T)&&!q;R++){const U=z(T,R),xn=U[0].map((tn,en)=>(U[0][en]+U[1][en]+U[2][en])/3);for(const tn of[U[0],xn])if(V(tn,F,Q,e)){q=tn,W="contained";break}await a()}if(q)break}}if(q&&(nn=await gn(v,E,A,O,q,e,a)),q&&nn+n.precision<n.minPenetration)continue}if(q&&(x.push({id:B,a:on(v),b:on(E),point:q,kind:W,state:"new",note:"",assignee:"",firstSeen:"",lastSeen:"",penetrationMm:nn}),x.length>=5e4))throw Error("Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат.")}}return i({phase:"Готово",done:o.length,total:o.length,found:x.length}),x}let Mn=0;const k=new Map;self.onmessage=async t=>{if(t.data.request!==void 0){const n=k.get(t.data.request);k.delete(t.data.request),t.data.error?n?.reject(Error(t.data.error)):n?.resolve(t.data.geometry);return}try{const{elements:n,check:i}=t.data,s=await yn(n,i,f=>self.postMessage({progress:f}),()=>!1,t.data.streaming?f=>new Promise((e,c)=>{const o=Mn++;k.set(o,{resolve:e,reject:c}),self.postMessage({load:f,request:o})}):void 0);self.postMessage({results:s})}catch(n){self.postMessage({error:n instanceof Error?n.message:String(n)})}}})();
`, ze = typeof self < "u" && self.Blob && new Blob(["(self.URL || self.webkitURL).revokeObjectURL(self.location.href);", Ue], { type: "text/javascript;charset=utf-8" });
function it(e) {
  let t;
  try {
    if (t = ze && (self.URL || self.webkitURL).createObjectURL(ze), !t) throw "";
    const n = new Worker(t, {
      name: e?.name
    });
    return n.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(t);
    }), n;
  } catch {
    return new Worker(
      "data:text/javascript;charset=utf-8," + encodeURIComponent(Ue),
      {
        name: e?.name
      }
    );
  }
}
const G = (e) => String(e ?? "").replace(
  /[&<>"']/g,
  (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[t]
);
function $e(e, t) {
  const n = URL.createObjectURL(
    new Blob([t], {
      type: e.endsWith(".html") ? "text/html;charset=utf-8" : "application/json;charset=utf-8"
    })
  ), l = document.createElement("a");
  l.href = n, l.download = e, l.click(), setTimeout(() => URL.revokeObjectURL(n), 6e4);
}
function nt(e, t) {
  const n = G;
  return `<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${n(e.name)}</title><style>body{font:14px/1.5 system-ui;margin:24px;background:#171c23;color:#e6edf5}h1{margin:0}small{color:#a9b7c8}input,select{padding:10px;margin:15px 8px 15px 0;max-width:100%;background:#242e3b;color:inherit;border:1px solid #506074;border-radius:6px}.wrap{overflow:auto}table{border-collapse:separate;border-spacing:0;width:100%}td,th{padding:10px;border-bottom:1px solid #39475a;min-width:100px;vertical-align:top;overflow-wrap:anywhere}th{background:#253142;position:sticky;top:0;text-align:left;white-space:normal}td{max-width:350px}tr[hidden]{display:none}.shot{display:block;width:260px;border:0;background:transparent;padding:0;cursor:zoom-in}dialog{width:min(94vw,1400px);border:1px solid #506074;background:#20242b;color:white;border-radius:10px}dialog img{max-width:100%;max-height:80vh;display:block;margin:12px auto}dialog::backdrop{background:#000b}.shot img{width:100%;border-radius:6px}.legend{margin:12px 0}.red{color:#ff6161}.blue{color:#65baff}@media print{input,select{display:none}body{background:white;color:black}.wrap{overflow:visible}th{position:static;background:#eee}}</style><h1>${n(e.name)}</h1><small>НашеПО · Проверки коллизий · ${n(e.lastRun || "")} · ${e.status === "stale" ? "Результат устарел" : "Последний завершённый расчёт"}</small><p>${n(e.type === "duplicates" ? "Совпадение треугольной геометрии" : "Пересечения поверхностей и вложенность замкнутых тел")}. Точность: ${n(e.precision)} мм${e.type === "intersection" ? `; минимальное расчётное вхождение: ${n(e.minPenetration)} мм` : ""}.</p><p class="legend"><span class="red">● Элемент А выделен красным</span> · <span class="blue">● элемент Б — синим</span></p><input id="search" type="search" placeholder="Поиск по всему отчёту"><select id="state"><option value="">Все состояния</option>${Object.entries(
    re
  ).map(([l, s]) => `<option value="${l}">${s}</option>`).join(
    ""
  )}</select>${e.type === "intersection" ? '<input id="depth" type="number" min="0" step="1" placeholder="Вхождение от, мм">' : ""}<span id="count"></span><div class="wrap"><table><thead><tr>${["Снимок", "№", "Состояние", "Вхождение, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "X", "Y", "Z", "Назначение", "Комментарий"].map((l) => `<th>${l}</th>`).join("")}</tr></thead><tbody>${t.map((l, s) => `<tr data-state="${l.state}" data-depth="${l.penetrationMm ?? 0}"><td>${ve(l.image) ? `<button class="shot" type="button"><img src="${l.image}" alt="Снимок конфликта ${s + 1}" loading="lazy"></button>` : "Снимок отсутствует"}</td>${[s + 1, re[l.state], e.type === "duplicates" ? "—" : (l.penetrationMm ?? 0).toFixed(1), l.a.name, l.a.model, l.a.guid, l.b.name, l.b.model, l.b.guid, ...l.point.map((i) => i.toFixed(4)), l.assignee, l.note].map((i) => `<td>${n(i)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><dialog id="picture"><button id="close-picture">Закрыть</button><img id="full-picture" alt="Снимок конфликта"></dialog><script>const modal=document.getElementById("picture");document.getElementById("close-picture").onclick=()=>modal.close();for(const b of document.querySelectorAll(".shot"))b.onclick=()=>{document.getElementById("full-picture").src=b.querySelector("img").src;modal.showModal()};const q=document.getElementById('search'),s=document.getElementById('state'),d=document.getElementById('depth'),rows=[...document.querySelectorAll('tbody tr')];function filter(){let n=0;for(const r of rows){r.hidden=!!((s.value&&r.dataset.state!==s.value)||(d&&Number(r.dataset.depth)<Number(d.value||0))||!r.textContent.toLowerCase().includes(q.value.toLowerCase()));if(!r.hidden)n++}document.getElementById('count').textContent='Коллизий: '+n}q.oninput=s.onchange=filter;if(d)d.oninput=filter;filter()<\/script></html>`;
}
function ot(e, t) {
  return JSON.stringify(
    {
      version: 1,
      id: e.id,
      name: e.name,
      images: Object.fromEntries(
        t.filter((n) => ve(n.image)).map((n) => [n.id + ".jpg", n.image])
      ),
      warnings: e.warnings,
      tests: [
        {
          id: e.id,
          name: e.name,
          clashes: t.map((n, l) => ({
            id: n.id,
            name: `Конфликт ${l + 1}`,
            distance: e.type === "duplicates" ? "" : `${(n.penetrationMm ?? 0).toFixed(1)} мм`,
            date: e.lastRun || "",
            description: e.type === "duplicates" ? "Дублирование" : "По пересечению",
            status: re[n.state],
            group: n.assignee,
            note: n.note,
            point: n.point,
            image: ve(n.image) ? n.id + ".jpg" : "",
            enabled: n.state !== "resolved",
            reviewed: n.state === "resolved" || n.state === "reviewed" || n.state === "approved",
            excluded: n.state === "excluded",
            elements: [n.a, n.b].map((s) => ({
              guid: s.guid,
              id: s.id,
              source: s.model,
              name: s.name,
              properties: s.properties
            })),
            properties: {
              Проверка: e.name,
              Вид: n.kind,
              "Расчётное вхождение, мм": String(n.penetrationMm ?? 0)
            }
          }))
        }
      ]
    },
    null,
    2
  );
}
const at = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAydpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAzIDc5Ljk2OTBhODdmYywgMjAyNS8wMy8wNi0yMDo1MDoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDZFQkU2NEQ4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDZFQkU2NEM4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI2LjExIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRENDVBNjQzODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRENDVBNjQ0ODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+pHX+ogAAD+lJREFUeNrs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", st = ":host{display:block;height:100%;color-scheme:dark;font:13px/1.4 Segoe UI,sans-serif;color:#dbe5f0;container-type:size}*{box-sizing:border-box}[hidden]{display:none!important}main{height:100%;min-height:260px;background:#171d25;display:flex;flex-direction:column;overflow:hidden;-webkit-user-select:none;user-select:none}button,input,select,textarea{font:inherit;color:inherit;border:1px solid #425165;border-radius:6px;background:#253140;padding:7px 9px;min-width:0}button{cursor:pointer;white-space:nowrap}button:hover{background:#354459}button:disabled{opacity:.45;cursor:default}.primary{background:#b99a38;border-color:#d0ae46;color:#111820;font-weight:600}.primary:hover{background:#e0bd51}button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid #f2c94c;outline-offset:1px}input,select,textarea{background:#111a24}input,textarea,td,dd{-webkit-user-select:text;user-select:text}input[type=checkbox]{accent-color:#e6c354;width:16px;height:16px}header{display:flex;gap:7px;align-items:center;padding:8px 12px;border-bottom:1px solid #354459;flex-shrink:0;overflow-x:auto}.brand{display:flex;gap:7px;align-items:center;margin-right:8px}.brand img{width:32px;height:32px;object-fit:contain}.brand b{font-size:17px}.brand small{font-size:10px;color:#a6b5c7}#dirty{margin-left:auto;font-size:11px;color:#cabb81;white-space:nowrap}.notice{background:#1c2735;padding:5px 12px;font-size:12px;min-height:27px;max-height:70px;overflow:auto;color:#a7bbd1}.notice.error{color:#ffaaa1;background:#412725}.workspace{display:grid;grid-template-columns:230px minmax(0,1fr);flex:1;min-height:0}aside{padding:10px;display:flex;flex-direction:column;gap:9px;border-right:1px solid #354459;min-height:0}#checks{overflow:auto;flex:1;min-height:0}.check-item{display:flex;flex-direction:column;gap:5px;width:100%;margin-bottom:5px;text-align:left;white-space:normal}.check-item small{color:#a8b7ca}.check-item.active,.tabs .active{border-color:#c7ab56;background:#403b2c;color:#ffe399}.main{display:flex;flex-direction:column;min-width:0;min-height:0}.test-toolbar{display:flex;gap:7px;padding:8px 12px;align-items:center}.test-toolbar input{flex:1;font-weight:600}.tabs{display:flex;gap:7px;border-bottom:1px solid #354459;padding:0 12px 8px}.tabs button{min-width:105px}#content{flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column}.empty{padding:28px;color:#a4b4c9;text-align:center;margin:auto}h2,h3,p{margin:0 0 10px}h2{font-size:20px}h3{font-size:15px}label{display:flex;flex-direction:column;gap:5px;font-size:12px;color:#b8c6d7}.check{flex-direction:row;align-items:center;gap:6px}small{font-size:11px;color:#a8b7c9}.parameters{display:flex;gap:18px;align-items:end;padding:10px 12px}.parameters input{width:140px}.selection-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0 12px 12px}.selection{border:1px solid #39495e;border-radius:8px;padding:12px;background:#1b2633;min-width:0}.selection h3{display:flex;justify-content:space-between}.selection h3 span{color:#92c4b2;font-size:12px}.selection select[multiple]{width:100%;min-height:70px}.selection-tools{display:flex;gap:5px;flex-wrap:wrap;margin:8px 0}.selection-tools button{font-size:11px;padding:5px 7px}.selection>label{margin-bottom:8px}.condition{display:grid;grid-template-columns:minmax(80px,1fr) 100px minmax(70px,1fr) 29px;gap:5px;margin:6px 0}.condition button{padding:3px}.rules,.report{padding:18px;max-width:850px}.rules>label{margin:14px 0}.rules>p,.report>p{color:#a9b8cb}.report>button{margin:12px 8px 14px 0}.result-tools{display:flex;gap:7px;flex-wrap:wrap;padding:8px 12px}.result-tools input{flex:1;min-width:180px}.result-area{display:grid;grid-template-columns:minmax(0,1fr) 300px;flex:1;min-height:0}.table-area{display:flex;flex-direction:column;min-width:0;min-height:0}.scroll{overflow:auto;flex:1;min-height:0}table{border-collapse:separate;border-spacing:0;width:max-content;min-width:100%}th{position:sticky;top:0;background:#2a3748;z-index:1;text-align:left;max-width:240px;white-space:normal}th,td{padding:8px;border-bottom:1px solid #344154;vertical-align:top}td{max-width:320px;min-width:90px;overflow-wrap:anywhere;-webkit-user-select:text;user-select:text}td:first-child{min-width:36px}tr.active td{background:#453e29;color:#fff0b5}tr:hover td{background:#2c3847}.pager{display:flex;gap:10px;align-items:center;justify-content:center;padding:5px;border-top:1px solid #39495e;font-size:11px}.pager button{padding:2px 8px}.detail{border-left:1px solid #354459;padding:10px;overflow:auto}.detail h3{overflow-wrap:anywhere}.detail>label{margin:10px 0}.detail p{font:11px/1.5 Consolas,monospace}.detail details{border-top:1px solid #354459;padding:8px 0}summary{cursor:pointer}dl{font-size:11px;display:grid;grid-template-columns:1fr 1fr;gap:7px}dt,dd{overflow-wrap:anywhere;margin:0}dt{color:#9baec4}footer{border-top:1px solid #354459;padding:4px 12px;display:flex;justify-content:space-between;color:#91a4bb;font-size:11px}dialog{border:1px solid #53647c;border-radius:12px;background:#202c3a;color:#dbe5f0;width:min(700px,92vw);max-height:85vh;padding:20px;box-shadow:0 15px 60px #000a}dialog::backdrop{background:#000a}dialog p{margin:12px 0}dialog a{color:#f2c94c;margin-right:12px}.dialog-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:16px}@container (max-width:950px){.workspace{grid-template-columns:185px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 240px}.selection-grid{grid-template-columns:1fr}.parameters,.test-toolbar{flex-wrap:wrap}.test-toolbar input{flex-basis:100%}}@container (max-height:400px){header{padding:5px 10px}.test-toolbar{padding:5px 10px}.tabs{padding-bottom:5px}.brand img{width:25px;height:25px}footer{display:none}}:host{font-size:12px}.brand img{background:#e1e7ef;border-radius:5px;padding:3px}.selection-tools button{font-size:12px}label{font-size:13px}.choose-layout{display:grid;grid-template-columns:220px minmax(0,1fr);min-height:0;flex:1;overflow:auto}.choose-layout .parameters{display:flex;flex-direction:column;align-items:stretch;gap:15px;border-right:1px solid #354459;justify-content:flex-start}.choose-layout .parameters input{width:100%}.choose-layout .parameters input[type=checkbox]{width:16px}.choose-layout .selection-grid{padding:10px 12px;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start;min-width:0}.selection select[multiple]{height:180px;resize:vertical}.selection-mode{font-size:12px;color:#b6c4d5}.preset-row{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:9px}.preset-row select{flex:1 1 160px}.preset-row button{padding:5px 7px;font-size:12px}.model-list{height:150px;overflow:auto;border:1px solid #425165;border-radius:6px;background:#111a24;padding:5px;margin-bottom:5px}.model-list label{display:flex;flex-direction:row;align-items:center;gap:7px;padding:4px 5px;color:#dbe5f0;overflow-wrap:anywhere}.model-list label:hover{background:#253140}.model-list .model-all{position:sticky;top:-5px;z-index:1;background:#1f2b39;border-bottom:1px solid #425165;font-weight:600}.legend{display:flex;gap:12px;flex-wrap:wrap;font-family:inherit!important}.part-a{color:#ff6161}.part-b{color:#65baff}.preview{display:block;width:100%;padding:5px;margin:8px 0}.preview img{display:block;width:100%;max-height:180px;object-fit:contain}.image-dialog{width:94vw;max-width:1500px}.image-dialog img{display:block;max-width:100%;max-height:75vh;margin:10px auto}#help-dialog{width:min(1000px,94vw);line-height:1.6}#help-dialog details{padding:12px 0;border-bottom:1px solid #425165}#help-dialog summary{font-size:16px;font-weight:600;color:#f0d27a}#help-dialog li{margin:8px 0}@container (max-width:1100px){.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .selection-grid{grid-template-columns:1fr}.condition{grid-template-columns:minmax(60px,1fr) 100px minmax(60px,1fr) 29px}}@container (max-width:700px){.choose-layout{display:block}.choose-layout .parameters{border-right:0;border-bottom:1px solid #354459}.workspace{grid-template-columns:160px minmax(0,1fr)}}button,input,select,textarea{padding:5px 7px;border-radius:5px}button{min-height:27px}input[type=checkbox]{width:14px;height:14px}.commandbar{position:relative;display:flex;gap:8px;min-height:45px;padding:5px 8px;overflow:visible;background:#131b25}.brand{flex:0 0 auto;margin-right:0;gap:5px}.brand img{width:28px;height:28px}.brand b{font-size:14px}.check-heading{display:grid;grid-template-rows:25px 12px;flex:0 1 230px;min-width:145px}.check-heading input{height:25px;border:0;background:transparent;padding:2px 5px;font-weight:600}.check-heading small{padding:0 5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:9px}.tabs{align-self:stretch;align-items:center;flex:0 0 auto;gap:3px;padding:0;border:0}.tabs button{flex:0 0 auto;min-width:0;padding:5px 9px;background:transparent;border-color:transparent}.tabs .active{background:#3e3828;border-color:#b99a38}.header-actions{display:flex;align-items:center;gap:4px;margin-left:auto}#dirty{margin-left:0;width:0;height:0;overflow:visible;font-size:0}#dirty:not(:empty){width:7px;height:7px;border-radius:50%;background:#e5bd43;box-shadow:0 0 0 2px #e5bd4328}.more-menu{position:relative;z-index:20}.more-menu summary{display:grid;place-items:center;width:29px;height:29px;border:1px solid #425165;border-radius:5px;background:#253140;cursor:pointer;list-style:none;font-size:18px}.more-menu summary::-webkit-details-marker{display:none}.more-popover{position:absolute;right:0;top:calc(100% + 5px);display:grid;width:190px;gap:3px;padding:6px;border:1px solid #506176;border-radius:7px;background:#192431;box-shadow:0 12px 35px #000a}.more-popover button{text-align:left}.notice{min-height:23px;max-height:45px;padding:3px 9px;font-size:10px}.workspace{grid-template-columns:190px minmax(0,1fr)}aside{gap:6px;padding:7px;background:#141c26}.aside-title{font-weight:600;font-size:12px}.aside-actions{display:grid;gap:5px}.check-item{gap:2px;margin-bottom:3px;padding:6px 7px}.check-item small{font-size:9px}.main{background:#171d25}#content{overflow:hidden}.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .parameters{gap:9px;padding:8px}.choose-layout .selection-grid{gap:8px;padding:8px}.selection{padding:8px}.selection h3,h3{font-size:13px;margin-bottom:6px}label{gap:3px;font-size:11px}small,.selection-tools button,.preset-row button{font-size:10px}.model-list{height:125px}.model-list label{padding:2px 4px}.selection-tools{gap:4px;margin:5px 0}.selection-tools button,.preset-row button{padding:3px 5px;min-height:23px}.result-tools{display:flex;align-items:center;justify-content:space-between;gap:6px;flex-wrap:nowrap;min-height:38px;padding:5px 7px;border-bottom:1px solid #354459;background:#151f2a}.result-filters,.bulk-tools{display:flex;align-items:center;gap:5px;min-width:0}.result-filters{flex:1}.result-filters input[type=search]{flex:1 1 190px;min-width:120px}#result-depth{flex:0 1 125px;min-width:92px}#result-count,#selection-count{color:#9fb0c4;white-space:nowrap;font-size:10px}.bulk-tools select{max-width:125px}.result-area{grid-template-columns:minmax(0,1fr) 310px}th,td{padding:5px 6px;font-size:11px;line-height:1.25}th{max-width:190px}td{max-width:260px;min-width:76px}.pager{justify-content:flex-end;min-height:29px;padding:3px 7px}.pager #selection-count{margin-right:auto}.detail{display:flex;flex-direction:column;min-width:0;padding:0;overflow:hidden;background:#141e29}.detail-head{display:flex;align-items:center;justify-content:space-between;gap:6px;min-height:47px;padding:7px 8px 4px}.detail-head>div:first-child{min-width:0}.detail-head small{color:#8093aa;letter-spacing:.08em}.detail-head h3{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin:0}.detail-nav{display:flex;gap:3px}.detail-nav button{min-width:27px;padding:2px 7px;font-size:17px}.clash-summary{display:flex;gap:5px;padding:0 8px 5px;color:#adbdcf;font-size:9px}.clash-summary span{padding-right:5px;border-right:1px solid #405064}.clash-summary span:last-child{border:0}.detail .legend{margin:0;padding:0 8px 5px;font-size:10px}.preview-slot{height:clamp(92px,18cqh,145px);flex:0 0 auto;margin:0 7px 6px;overflow:hidden;border:1px solid #37475b;border-radius:6px;background:#0e151d}.preview{position:relative;width:100%;height:100%;margin:0;padding:0;border:0;background:transparent}.preview img{width:100%;height:100%;max-height:none;object-fit:contain}.preview span{position:absolute;right:5px;bottom:5px;padding:3px 6px;border-radius:4px;background:#101923db;font-size:9px}.preview-empty,.detail-empty{height:100%;display:grid;place-content:center;justify-items:center;gap:4px;color:#788ba1}.preview-empty>span,.detail-empty>span{font-size:24px}.detail-actions{display:grid;grid-template-columns:1fr 1fr;gap:5px;padding:0 7px 7px}.detail-scroll{flex:1;min-height:0;overflow:auto;padding:7px 8px 12px;border-top:1px solid #354459}.detail-scroll>label{margin:7px 0}.detail p{font:inherit}.coordinates{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;font:9px/1.3 Consolas,monospace;color:#91a3b7}.coordinates span{overflow:hidden;text-overflow:ellipsis}.detail details{padding:6px 0}.detail dl{font-size:10px}.detail-empty{padding:20px;text-align:center}footer{padding:2px 8px;font-size:9px}@container (max-width:1050px){.workspace{grid-template-columns:165px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 270px}.check-heading{flex-basis:185px}.tabs button{padding-inline:6px}#dirty{display:none}}@container (max-width:820px){.brand b,.brand small,#result-count{display:none}.check-heading{flex-basis:155px}.result-tools{overflow-x:auto}.result-area{grid-template-columns:minmax(0,1fr) 245px}}@container (max-height:410px){.notice,footer{display:none}.preview-slot{height:90px}}", me = /* @__PURE__ */ new WeakMap(), ke = () => ({
  format: "nashepo.checks",
  version: 1,
  checks: [],
  sets: []
});
function rt(e, t) {
  const n = e.shadowRoot || e.attachShadow({ mode: "open" }), l = Ge(e);
  let s = t.projectToken(), i = s && me.get(s) || ke();
  s && me.set(s, i);
  let a, c = i.checks[0]?.id || "", m = "select", u = "", p = 0, y = !1, g = !1, v, C = !0, I = !1;
  const w = /* @__PURE__ */ new Set();
  let L;
  const j = () => i.checks.find((o) => o.id === c), h = (o) => n.querySelector("#" + o);
  n.innerHTML = `<style>${st}</style><main><header class="commandbar"><div class="brand"><img src="${at}" alt=""><b>НашеПО</b><small>${Ye}</small></div><div class="check-heading"><input id="name" aria-label="Имя проверки" placeholder="Выберите проверку"><small id="check-summary">Проверка не выбрана</small></div><div id="tabs" class="tabs">${[
    ["select", "Выбор"],
    ["results", "Результаты"],
    ["rules", "Правила"],
    ["report", "Отчёт"]
  ].map(([o, r]) => `<button data-tab="${o}">${r}</button>`).join(
    ""
  )}</div><div class="header-actions"><button id="scan" title="Перечитать список и геометрию выбранных моделей">↻ Модели</button><button id="run" class="primary">▶ Запустить</button><button id="cancel" hidden>Остановить</button><details class="more-menu"><summary title="Другие команды">⋮</summary><div class="more-popover"><button id="open">Открыть проверки</button><button id="save">Сохранить проверки</button><button id="copy">Копировать проверку</button><button id="delete">Удалить проверку</button><button id="settings">Настройки</button><button id="help">Справка</button></div></details></div><span id="dirty"></span></header><div class="notice" id="notice" role="status">Откройте IFC/SMDX в проекте и нажмите «Модели».</div><div class="workspace"><aside><div class="aside-title">Проверки</div><input id="test-search" type="search" placeholder="Поиск проверок"><div id="checks"></div><div class="aside-actions"><button id="all">Запустить все</button><button id="new" class="primary">＋ Новая проверка</button></div></aside><section class="main"><div id="content"></div></section></div><footer><span id="model-count">Модели не прочитаны</span><span>Расчёт выполняется на вашем компьютере</span></footer><input id="file" type="file" accept=".json" hidden><dialog id="settings-dialog"><h2>Настройки</h2><label>Дистанция камеры, м<input id="distance" type="number" value="15" min="0.5"></label><p class="links"><a href="https://nashepo.ru/" target="_blank" rel="noopener noreferrer">Сайт НашеПО</a><a href="https://t.me/RoburFan" target="_blank" rel="noopener noreferrer">Telegram</a></p><button data-close="settings-dialog">Закрыть</button></dialog><dialog id="help-dialog">${Fe}<button data-close="help-dialog">Закрыть</button></dialog><dialog id="set-dialog"><h2>Сохранить набор моделей</h2><label>Название<input id="set-name" maxlength="120"></label><div class="dialog-actions"><button id="set-cancel">Отмена</button><button id="set-confirm" class="primary">Сохранить</button></div></dialog></main>`;
  const ne = document.createElement("button");
  ne.id = "clear-project", ne.textContent = "Очистить проект", h("save").after(ne), n.querySelector(".more-popover").addEventListener(
    "click",
    () => n.querySelector(".more-menu").removeAttribute("open")
  );
  const q = (o, r = !1) => {
    h("notice").textContent = o, h("notice").classList.toggle("error", r);
  }, N = async (o) => {
    try {
      await o();
    } catch (r) {
      q(r instanceof Error ? r.message : String(r), !0);
    }
  }, ce = () => new Promise((o) => {
    const r = h("set-dialog"), d = h("set-name");
    let f = !1;
    const x = (k) => {
      f || (f = !0, r.close(), o(k));
    };
    d.value = "Новый набор", h("set-confirm").onclick = () => {
      const k = d.value.trim();
      k ? x(k) : d.focus();
    }, h("set-cancel").onclick = () => x(), r.oncancel = (k) => {
      k.preventDefault(), x();
    }, r.showModal(), d.focus(), d.select();
  }), M = () => {
    I = !0, h("dirty").textContent = "Есть несохранённые изменения";
  }, O = () => {
    const o = t.projectToken();
    return !o || o === s ? !1 : (!s && (i.checks.length || i.sets.length) ? me.set(o, i) : i = me.get(o) || ke(), me.set(o, i), s = o, a = void 0, c = i.checks[0]?.id || "", u = "", w.clear(), p = 0, I = !1, t.clear(), h("dirty").textContent = "", !0);
  }, F = () => {
    const o = j();
    o?.lastRun && (o.status = "stale"), M(), D();
  }, P = () => [
    ...new Set(
      (a?.elements || []).flatMap((o) => Object.keys(o.properties))
    )
  ].sort(), se = (o, r) => o.map(
    (d) => `<option value="${G(d)}" ${d === r ? "selected" : ""}>${G(d)}</option>`
  ).join("");
  function S() {
    const o = j(), r = h("result-search")?.value.toLowerCase() || "", d = h("result-state")?.value || "", f = Number(h("result-depth")?.value || 0);
    return (o?.results || []).filter(
      (x) => (!d || x.state === d) && (o?.type === "duplicates" || (x.penetrationMm ?? 0) >= f) && (!r || JSON.stringify({ ...x, image: void 0 }).toLowerCase().includes(r))
    );
  }
  function D() {
    const o = h("test-search").value.toLowerCase();
    h("checks").innerHTML = i.checks.filter((r) => r.name.toLowerCase().includes(o)).map(
      (r) => `<button class="check-item ${r.id === c ? "active" : ""}" data-check="${r.id}"><strong>${G(r.name)}</strong><small>${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[r.status]} · ${r.results.filter((d) => !["resolved", "excluded"].includes(d.state)).length} в работе / ${r.results.length}</small></button>`
    ).join("");
  }
  function B(o, r) {
    const d = a?.elements.filter(
      (E) => (j().includeHidden || !E.hidden) && xe(E, o)
    ).length || 0, f = o.manualOnly ? T(o) : o.modelsMode === "selected" ? o.models : (a?.models || []).map((E) => E.id), x = a && f.every((E) => a.indexedModelIds.includes(E)) ? `${d} элементов` : "число после запуска", k = a?.models || [], b = o.modelsMode !== "selected", A = i.sets.map(
      (E) => `<option value="${G(E.id)}" ${o.presetId === E.id ? "selected" : ""}>${G(E.name)}</option>`
    ).join("");
    return `<article class="selection" data-side="${r}"><h3>Выбор ${r.toUpperCase()} <span data-selection-count>${x}</span></h3>${o.manualOnly ? '<p class="selection-mode">Только элементы, выбранные вручную</p>' : ""}<div class="preset-row"><select class="preset"><option value="">Набор моделей…</option>${A}</select><button data-selection="load-set">Применить</button><button data-selection="save-set">Сохранить набор</button><button data-selection="delete-set" ${o.presetId ? "" : "disabled"}>Удалить</button></div><div class="model-list"><label class="model-all"><input type="checkbox" class="all-models" ${b ? "checked" : ""}> Все модели</label>${k.map((E) => `<label><input type="checkbox" class="model-check" value="${G(E.id)}" ${b || o.models.includes(E.id) ? "checked" : ""}> ${G(E.name)}</label>`).join("") || "<small>Нажмите «Модели».</small>"}</div><small>Отметьте файлы, которые должны участвовать в выборе ${r.toUpperCase()}.</small><div class="selection-tools"><button data-selection="show">Показать выбранные элементы</button><button data-selection="only">Только выделенные в 3D</button><button data-selection="include">＋ Добавить из 3D</button><button data-selection="exclude">− Исключить из 3D</button><button data-selection="reset">Сбросить ручной выбор</button></div><small>Добавлено вручную: ${o.include.length} · исключено: ${o.exclude.length}</small></article>`;
  }
  function R() {
    D();
    const o = j();
    h("name").value = o?.name || "", h("check-summary").textContent = o ? `${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[o.status]} · ${o.results.filter((r) => !["resolved", "excluded"].includes(r.state)).length} в работе / ${o.results.length}` : "Проверка не выбрана";
    for (const r of ["name", "copy", "delete", "run"])
      h(r).disabled = !o || y;
    for (const r of n.querySelectorAll("[data-tab]"))
      r.classList.toggle("active", r.dataset.tab === m);
    if (!o) {
      h("content").innerHTML = '<div class="empty"><h2>Создайте первую проверку</h2><p>Обновите модели, затем выберите, какие элементы проверять друг с другом.</p></div>';
      return;
    }
    m === "select" && (h("content").innerHTML = `<div class="choose-layout"><div class="parameters"><h3>Параметры проверки</h3><label>Тип<select id="type"><option value="intersection" ${o.type === "intersection" ? "selected" : ""}>По пересечению</option><option value="duplicates" ${o.type === "duplicates" ? "selected" : ""}>Дублирование</option></select></label><label title="Числовая погрешность расчёта">Точность расчёта, мм<input id="precision" type="number" value="${o.precision}" min="0.001" max="100" step="0.1"></label><label title="Конфликты с меньшим расчётным вхождением не попадут в результат">Минимальное вхождение, мм<input id="min-penetration" type="number" value="${o.minPenetration}" min="0" max="100000" step="1" ${o.type === "duplicates" ? "disabled" : ""}></label><label class="check"><input id="touching" type="checkbox" ${o.touching ? "checked" : ""} ${o.type === "duplicates" ? "disabled" : ""}>Учитывать касания</label><small>Касание — соприкосновение поверхностей без проникновения. Обычно выключено. Вхождение для произвольной IFC-геометрии является расчётной оценкой.</small><p class="legend"><span class="part-a">● Выбор А</span><span class="part-b">● Выбор Б</span></p></div><div class="selection-grid">${B(o.a, "a")}${B(o.b, "b")}</div></div><datalist id="property-fields">${se(P(), "")}</datalist>`), m === "rules" && (h("content").innerHTML = `<div class="rules"><h3>Исключение пар</h3><p>Элемент сам с собой не проверяется. Пара А/Б учитывается один раз.</p><label class="check"><input id="same-model" type="checkbox" ${o.ignoreSameModel ? "checked" : ""}>Не проверять элементы одной модели</label><label class="check"><input id="same-group" type="checkbox" ${o.ignoreSameGroup ? "checked" : ""}>Не проверять геометрию одного составного объекта</label><label>Не проверять пары с одинаковым значением свойства<input id="equal-property" list="property-fields" value="${G(o.equalProperty)}" placeholder="Без ограничения"></label><label class="check"><input id="hidden" type="checkbox" ${o.includeHidden ? "checked" : ""}>Включать скрытые элементы прочитанных моделей</label><p>Незагруженные подключённые файлы нужно открыть перед расчётом.</p><datalist id="property-fields">${se(P(), "")}</datalist></div>`), m === "results" && (h("content").innerHTML = `<div class="result-tools"><div class="result-filters"><input id="result-search" type="search" placeholder="Поиск по результатам"><select id="result-state"><option value="">Все состояния</option>${Object.entries(
      re
    ).map(([r, d]) => `<option value="${r}">${d}</option>`).join("")}</select>${o.type === "intersection" ? '<input id="result-depth" type="number" min="0" step="1" placeholder="Вхождение от, мм">' : ""}<button id="show-markers" role="switch" aria-checked="${C}">${C ? "● Знаки" : "○ Знаки"}</button><span id="result-count"></span></div><div class="bulk-tools"><select id="bulk-state" title="Состояние для выбранных строк">${Object.entries(
      re
    ).map(([r, d]) => `<option value="${r}">${d}</option>`).join("")}</select><button id="bulk">Применить</button></div></div><div class="result-area"><div class="table-area"><div class="scroll" id="table"></div><div class="pager"><span id="selection-count"></span><button id="prev-page">←</button><span id="page"></span><button id="next-page">→</button></div></div><div class="detail" id="detail"></div></div>`, H(), X()), m === "report" && (h("content").innerHTML = `<div class="report"><h3>${G(o.name)}</h3><p>Результатов: ${o.results.length}. Выбрано: ${w.size}. ${o.status === "stale" ? "Результаты устарели — рекомендуется повторный запуск." : ""}</p><label class="check"><input id="selected-only" type="checkbox" ${w.size ? "checked" : ""}>Только выбранные строки</label><label class="check"><input id="report-images" type="checkbox" checked>Добавить снимки (недостающие будут созданы автоматически)</label><button id="export-html" class="primary">Сформировать HTML-отчёт</button><button id="export-viewer">Сессия для плагина «Коллизии»</button><p>Правила и все результаты сохраняются кнопкой «Сохранить проверки» в верхней панели.</p></div>`), h("content").inert = y;
  }
  function H() {
    const o = j(), r = S(), d = Math.max(1, Math.ceil(r.length / 50));
    p = Math.max(0, Math.min(p, d - 1));
    const f = r.slice(p * 50, p * 50 + 50);
    h("table").innerHTML = r.length ? `<table><thead><tr><th><input id="check-page" type="checkbox" aria-label="Выбрать страницу" ${f.every((x) => w.has(x.id)) ? "checked" : ""}></th>${["№", "Состояние", "Вхождение, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "Комментарий"].map((x) => `<th>${x}</th>`).join("")}</tr></thead><tbody>${f.map((x, k) => `<tr data-result="${G(x.id)}" class="${x.id === u ? "active" : ""}"><td><input type="checkbox" class="row-check" aria-label="Выбрать конфликт" ${w.has(x.id) ? "checked" : ""}></td>${[p * 50 + k + 1, re[x.state], o.type === "duplicates" ? "—" : (x.penetrationMm ?? 0).toFixed(1), x.a.name, x.a.model, x.a.guid || "—", x.b.name, x.b.model, x.b.guid || "—", x.note].map((b) => `<td title="${G(b)}">${G(b)}</td>`).join("")}</tr>`).join("")}</tbody></table>` : '<div class="empty">Нет результатов. Запустите проверку или измените фильтры.</div>', h("page").textContent = `${p + 1} / ${d}`, h("result-count").textContent = `${r.length} результатов`, h("selection-count").textContent = `Выбрано: ${w.size}`, h("prev-page").disabled = p === 0, h("next-page").disabled = p === d - 1;
  }
  function X() {
    const o = j(), r = S(), d = r.findIndex((x) => x.id === u), f = o?.results.find((x) => x.id === u);
    h("detail").innerHTML = f ? `<div class="detail-head"><div><small>КОЛЛИЗИЯ</small><h3>#${d + 1} ${G(f.a.name)} × ${G(f.b.name)}</h3></div><div class="detail-nav"><button id="previous" title="Предыдущая коллизия" ${d <= 0 ? "disabled" : ""}>‹</button><button id="next" title="Следующая коллизия" ${d < 0 || d >= r.length - 1 ? "disabled" : ""}>›</button></div></div><div class="clash-summary"><span>${o?.type === "duplicates" ? "Дублирование" : "Пересечение"}</span><span>${o?.type === "duplicates" ? "Совпадение геометрии" : `Вхождение ${(f.penetrationMm ?? 0).toFixed(1)} мм`}</span><span>${G(re[f.state])}</span></div><p class="legend"><span class="part-a">● Элемент А</span><span class="part-b">● Элемент Б</span></p><div class="preview-slot">${f.image ? `<button id="open-image" class="preview"><img src="${G(f.image)}" alt="Снимок коллизии"><span>Открыть крупнее</span></button>` : '<div class="preview-empty"><span>◫</span><small>Снимок пары ещё не создан</small></div>'}</div><div class="detail-actions"><button id="focus" class="primary">Перейти в 3D</button><button id="capture-image">▣ Снимок пары</button></div><div class="detail-scroll"><div class="coordinates">${f.point.map((x, k) => `<span>${["X", "Y", "Z"][k]} ${x.toFixed(3)}</span>`).join("")}</div><label>Состояние<select id="edit-state">${Object.entries(
      re
    ).map(
      ([x, k]) => `<option value="${x}" ${f.state === x ? "selected" : ""}>${k}</option>`
    ).join(
      ""
    )}</select></label><label>Назначение<input id="assignee" value="${G(f.assignee)}"></label><label>Комментарий<textarea id="note" rows="2">${G(f.note)}</textarea></label>${[
      f.a,
      f.b
    ].map(
      (x, k) => `<details><summary>Элемент ${k ? "Б" : "А"} · свойства</summary><dl>${Object.entries(
        x.properties
      ).map(([b, A]) => `<dt>${G(b)}</dt><dd>${G(A)}</dd>`).join("")}</dl></details>`
    ).join("")}</div>` : '<div class="detail-empty"><span>◫</span><p>Выберите коллизию в таблице</p><small>Двойной щелчок сразу перенесёт камеру в 3D.</small></div>';
  }
  const T = (o) => {
    const r = new Set(
      !o.manualOnly && o.modelsMode === "selected" ? o.models : []
    );
    for (const d of o.include)
      try {
        r.add(String(JSON.parse(d)[0]));
      } catch {
        const f = a?.elements.find(
          (x) => x.id === d
        )?.modelId;
        f && r.add(f);
      }
    return [...r];
  }, Q = () => {
    const o = j();
    if (!(!o || m !== "select"))
      for (const r of n.querySelectorAll("[data-side]")) {
        const d = r.dataset.side, f = [...r.querySelectorAll(".model-check")];
        if (!f.length) continue;
        const x = f.filter((A) => A.checked).map((A) => A.value), k = x.length === f.length, b = o[d];
        b.modelsMode = k ? "all" : "selected", b.models = k ? [] : x, b.conditions = [], b.mode = "all";
      }
  }, K = (o) => {
    if (!o?.length) return;
    const r = /* @__PURE__ */ new Set();
    for (const d of o)
      for (const f of [d.a, d.b]) {
        if (!f.manualOnly && f.modelsMode !== "selected") return;
        for (const x of T(f)) r.add(x);
      }
    return r;
  }, oe = () => {
    const o = j();
    if (o)
      for (const r of n.querySelectorAll("[data-side]")) {
        const d = r.dataset.side, f = a?.elements.filter(
          (A) => (o.includeHidden || !A.hidden) && xe(A, o[d])
        ).length || 0, x = o[d].manualOnly ? T(o[d]) : o[d].modelsMode === "selected" ? o[d].models : (a?.models || []).map((A) => A.id), k = !!a && x.every((A) => a.indexedModelIds.includes(A)), b = r.querySelector(
          "[data-selection-count]"
        );
        b && (b.textContent = k ? `${f} элементов` : "число после запуска");
      }
  };
  function W() {
    t.markers(
      S(),
      u,
      C,
      (o) => N(() => _(o, !0))
    );
  }
  function _(o, r = !1) {
    if (!y) {
      if (u = o, m === "results") {
        for (const d of n.querySelectorAll("[data-result]"))
          d.classList.toggle("active", d.dataset.result === o);
        X();
      }
      if (W(), r) {
        const d = j()?.results.find((f) => f.id === o);
        d && (d.image && d.imageScope === "pair-ab" ? t.focus(d, Number(h("distance").value)) : ee(d));
      }
    }
  }
  async function ee(o) {
    g = !1, z(!0);
    try {
      o.image = await t.snapshot(
        o,
        Number(h("distance").value),
        () => g
      ), o.imageScope = "pair-ab", M(), m === "results" && u === o.id && X();
    } catch (r) {
      q(
        "Результаты сохранены. Снимок пары не создан: " + (r instanceof Error ? r.message : String(r)),
        !0
      );
    } finally {
      z(!1);
    }
  }
  async function te(o, r = !1) {
    O();
    const d = r ? /* @__PURE__ */ new Set() : K(o);
    a = await t.scan(q, () => g, d), h("model-count").textContent = `Проиндексировано моделей: ${a.indexedModelIds.length} из ${a.models.length} · элементов: ${a.elements.length}`, R(), q(
      a.blockers.length ? a.blockers.join(" ") : a.warnings.length ? `Модели прочитаны с замечаниями. ${a.warnings.join(" ")}` : "Модели прочитаны. Настройте выборки и запустите проверку.",
      !!a.blockers.length
    );
  }
  const z = (o) => {
    y = o;
    for (const r of [
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
      h(r).disabled = o;
    h("cancel").hidden = !o, h("content").inert = o, h("checks").inert = o;
  };
  async function be(o) {
    const r = (f) => q(`${o.name} · ${f.phase} ${f.done}/${f.total} · найдено ${f.found}`);
    let d;
    try {
      d = new it();
    } catch {
      return tt(
        a.elements,
        o,
        r,
        () => g,
        (f) => t.geometry(f, () => g)
      );
    }
    return v = d, new Promise((f, x) => {
      const k = () => {
        d.terminate(), v = void 0, L = void 0;
      };
      L = () => {
        k(), x(Error("Расчёт отменён. Предыдущие результаты сохранены."));
      }, d.onmessage = async (b) => {
        if (b.data.load) {
          try {
            const A = await t.geometry(
              b.data.load,
              () => g || v !== d
            );
            if (v !== d) return;
            const E = [
              A.vertices?.buffer,
              A.indices?.buffer
            ].filter(Boolean);
            d.postMessage(
              { request: b.data.request, geometry: A },
              E
            );
          } catch (A) {
            v === d && d.postMessage({
              request: b.data.request,
              error: A instanceof Error ? A.message : String(A)
            });
          }
          return;
        }
        b.data.progress ? r(b.data.progress) : (k(), b.data.error ? x(Error(b.data.error)) : f(b.data.results));
      }, d.onerror = (b) => {
        k(), x(
          Error(
            `Не удалось запустить расчёт в фоновом потоке: ${b.message || "ошибка загрузки"}`
          )
        );
      }, d.postMessage({
        elements: a.elements,
        streaming: typeof t.geometry == "function",
        check: structuredClone({ ...o, results: [], warnings: [] })
      });
    });
  }
  async function ue(o = !1) {
    if (y) return;
    O(), Q();
    const r = o ? [...i.checks] : [j()].filter(Boolean);
    if (!r.length) throw Error("Создайте проверку.");
    for (const d of r)
      for (const f of [d.a, d.b])
        f.conditions = [], f.mode = "all";
    g = !1, z(!0);
    try {
      if (await te(r), z(!0), a.blockers.length)
        throw Error(
          "Состав моделей прочитан не полностью. " + a.blockers.join(" ")
        );
      for (const f of r) {
        if (g) break;
        for (const A of [f.a, f.b]) {
          if (A.modelsMode === "selected" && A.models.some((E) => !a.models.some(($) => $.id === E)))
            throw Error(
              `${f.name}: одна из моделей выборки отсутствует. Исправьте выборку.`
            );
          if (A.include.some((E) => !a.elements.some(($) => $.id === E)))
            throw Error(
              `${f.name}: вручную добавленный элемент отсутствует в модели.`
            );
        }
        const x = Qe(f);
        if (f.configAtRun === x && f.modelsAtRun?.some(
          (A) => !a.models.some((E) => E.id === A)
        ))
          throw Error(
            `${f.name}: состав моделей уменьшился. Подключите прежние модели или создайте копию проверки для нового состава. Прежние результаты сохранены.`
          );
        const k = await be(f);
        if (g || !t.isCurrent())
          throw Error(
            "Проект изменился или расчёт отменён. Предыдущие результаты сохранены."
          );
        const b = (/* @__PURE__ */ new Date()).toISOString();
        f.results = Je(
          f.configAtRun === x ? f.results : [],
          k,
          b
        ), f.lastRun = b, f.fingerprint = a.fingerprint, f.configAtRun = x, f.modelsAtRun = [...a.indexedModelIds], f.status = "done", f.warnings = [...a.warnings], c = f.id, u = f.results[0]?.id || "", w.clear(), M();
      }
      m = "results", R(), W(), q(
        `Проверка завершена. ${j()?.results.length || 0} результатов. Сохраните проверки для продолжения работы.`
      );
      const d = j()?.results.find((f) => f.id === u);
      d && !g && await ee(d);
    } finally {
      z(!1), R();
    }
  }
  function V(o) {
    const r = o.closest("[data-side]")?.dataset.side;
    if (!r) return;
    const d = j()[r], f = o, x = o.closest("[data-side]");
    if (f.classList.contains("preset")) {
      d.presetId = f.value || void 0, x.querySelector(
        '[data-selection="delete-set"]'
      ).disabled = !d.presetId;
      return;
    }
    if (f.classList.contains("all-models")) {
      for (const k of x.querySelectorAll(
        ".model-check"
      ))
        k.checked = f.checked;
      d.modelsMode = f.checked ? "all" : "selected", d.models = [], d.manualOnly = !1, d.presetId = void 0;
    }
    if (f.classList.contains("model-check")) {
      const k = [
        ...x.querySelectorAll(".model-check")
      ], b = k.filter((E) => E.checked).map((E) => E.value), A = k.length > 0 && b.length === k.length;
      x.querySelector(".all-models").checked = A, d.modelsMode = A ? "all" : "selected", d.models = A ? [] : b, d.manualOnly = !1, d.presetId = void 0;
    }
    d.conditions = [], d.mode = "all", F(), oe();
  }
  h("new").onclick = () => {
    const o = Ze();
    o.name = `Проверка ${i.checks.length + 1}`, i.checks.push(o), c = o.id, m = "select", u = "", w.clear(), M(), R();
  }, h("scan").onclick = () => N(async () => {
    Q(), g = !1, z(!0);
    try {
      const o = j();
      await te(o ? [o] : void 0, !o);
    } finally {
      z(!1), R();
    }
  }), h("run").onclick = () => N(() => ue()), h("all").onclick = () => N(() => ue(!0)), h("cancel").onclick = () => {
    g = !0, L?.();
  }, h("test-search").oninput = D, h("checks").onclick = (o) => {
    const r = o.target.closest(
      "[data-check]"
    );
    r && !y && (t.clear(), c = r.dataset.check, u = "", w.clear(), p = 0, R());
  }, h("tabs").onclick = (o) => {
    const r = o.target.closest("[data-tab]");
    r && !y && (m = r.dataset.tab, R());
  }, h("name").onchange = () => {
    const o = j();
    o && (o.name = h("name").value.trim() || "Проверка", M(), D());
  }, h("copy").onclick = () => {
    const o = j();
    if (!o) return;
    const r = structuredClone(o);
    Object.assign(r, {
      id: crypto.randomUUID(),
      name: o.name + " — копия",
      results: [],
      lastRun: void 0,
      fingerprint: void 0,
      configAtRun: void 0,
      status: "new"
    }), i.checks.push(r), c = r.id, u = "", w.clear(), M(), R();
  }, h("delete").onclick = () => {
    j() && confirm(`Удалить проверку «${j().name}» и её результаты?`) && (i.checks = i.checks.filter((o) => o.id !== c), c = i.checks[0]?.id || "", w.clear(), t.clear(), M(), R());
  }, h("clear-project").onclick = () => {
    !i.checks.length && !i.sets.length || confirm(
      "Очистить проверки, наборы моделей и результаты текущего проекта?"
    ) && (i.checks = [], i.sets = [], a = void 0, c = "", u = "", w.clear(), t.clear(), M(), h("model-count").textContent = "Модели не прочитаны", R(), q("Данные проверок текущего проекта очищены."));
  }, h("save").onclick = () => {
    $e("НашеПО-проверки.json", JSON.stringify(i, null, 2)), I = !1, h("dirty").textContent = "Файл проверок сохранён";
  }, h("open").onclick = () => h("file").click(), h("file").onchange = () => N(async () => {
    const o = h("file").files?.[0];
    if (!o) return;
    const r = Te(await o.text());
    I && !confirm("Заменить текущие несохранённые проверки данными из файла?") || (i = r, s && me.set(s, i), c = i.checks[0]?.id || "", u = "", w.clear(), t.clear(), I = !1, h("dirty").textContent = "Проверки открыты", R(), q("Проверки открыты. Обновите модели перед переходом к элементам."), h("file").value = "");
  });
  for (const o of ["settings", "help"])
    h(o).onclick = () => h(o + "-dialog").showModal();
  for (const o of n.querySelectorAll("[data-close]"))
    o.onclick = () => h(o.dataset.close).close();
  h("content").onchange = (o) => N(() => {
    const r = o.target, d = j();
    if (!d) return;
    if (r.closest("[data-side]")) {
      V(r);
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
    ].includes(r.id)) {
      if (r.id === "precision") {
        const x = Number(r.value);
        if (!Number.isFinite(x) || x < 1e-3 || x > 100)
          throw r.value = String(d.precision), Error("Точность должна быть от 0,001 до 100 мм.");
        d.precision = x;
      }
      if (r.id === "min-penetration") {
        const x = Number(r.value);
        if (!Number.isFinite(x) || x < 0 || x > 1e5)
          throw r.value = String(d.minPenetration), Error(
            "Минимальное вхождение должно быть от 0 до 100 000 мм."
          );
        d.minPenetration = x;
      }
      r.id === "type" && (d.type = r.value), r.id === "touching" && (d.touching = r.checked), r.id === "same-model" && (d.ignoreSameModel = r.checked), r.id === "same-group" && (d.ignoreSameGroup = r.checked), r.id === "hidden" && (d.includeHidden = r.checked), r.id === "equal-property" && (d.equalProperty = r.value), F(), R();
      return;
    }
    if (r.id === "result-state") {
      p = 0, H();
      return;
    }
    if (r.id === "check-page") {
      for (const x of S().slice(p * 50, p * 50 + 50))
        r.checked ? w.add(x.id) : w.delete(x.id);
      H();
      return;
    }
    if (r.classList.contains("row-check")) {
      const x = r.closest("[data-result]").dataset.result;
      r.checked ? w.add(x) : w.delete(x), h("selection-count").textContent = `Выбрано: ${w.size}`;
      return;
    }
    const f = d.results.find((x) => x.id === u);
    f && (r.id === "edit-state" && (f.state = r.value, H(), D(), W()), r.id === "assignee" && (f.assignee = r.value), r.id === "note" && (f.note = r.value, H()), M());
  }), h("content").oninput = (o) => {
    const r = o.target;
    (r.id === "result-search" || r.id === "result-depth") && (p = 0, H());
    const d = j(), f = Number(r.value);
    d && r.id === "precision" && Number.isFinite(f) && f >= 1e-3 && f <= 100 && (d.precision = f, F()), d && r.id === "min-penetration" && Number.isFinite(f) && f >= 0 && f <= 1e5 && (d.minPenetration = f, F());
  }, h("content").onclick = (o) => N(async () => {
    const r = o.target, d = r.closest("button"), f = j();
    if (!f) return;
    if (d?.dataset.selection) {
      const k = d.closest("[data-side]").dataset.side, b = f[k], A = h("content").scrollTop;
      let E = !0;
      switch (d.dataset.selection) {
        case "load-set": {
          const $ = i.sets.find((Z) => Z.id === b.presetId);
          if (!$) throw Error("Выберите сохранённый набор моделей.");
          Object.assign(b, structuredClone($.selection), {
            conditions: [],
            mode: "all",
            include: [],
            exclude: [],
            manualOnly: !1,
            presetId: $.id
          });
          break;
        }
        case "save-set": {
          if (b.manualOnly)
            throw Error(
              "Ручную выборку элементов нельзя сохранить как набор моделей."
            );
          const $ = await ce();
          if (!$) return;
          const Z = {
            id: crypto.randomUUID(),
            name: $,
            selection: {
              models: [...b.models],
              modelsMode: b.modelsMode,
              conditions: [],
              mode: "all"
            }
          };
          i.sets.push(Z), b.presetId = Z.id, E = !1;
          break;
        }
        case "delete-set": {
          const $ = i.sets.find((Z) => Z.id === b.presetId);
          if (!$) throw Error("Выберите сохранённый набор моделей.");
          if (!confirm(`Удалить набор «${$.name}»?`)) return;
          i.sets = i.sets.filter((Z) => Z.id !== $.id);
          for (const Z of i.checks)
            for (const ae of [Z.a, Z.b])
              ae.presetId === $.id && (ae.presetId = void 0);
          E = !1;
          break;
        }
        case "show":
          t.select(
            (a?.elements || []).filter(($) => (f.includeHidden || !$.hidden) && xe($, b)).map(($) => $.id)
          );
          return;
        case "only": {
          const $ = t.selected();
          if (!$.length) throw Error("Выделите элементы в 3D-сцене.");
          b.include = $, b.exclude = [], b.manualOnly = !0;
          break;
        }
        case "include": {
          const $ = t.selected();
          if (!$.length) throw Error("Выделите элементы в 3D-сцене.");
          b.include = [.../* @__PURE__ */ new Set([...b.include, ...$])], b.exclude = b.exclude.filter((Z) => !$.includes(Z));
          break;
        }
        case "exclude": {
          const $ = t.selected();
          if (!$.length) throw Error("Выделите элементы в 3D-сцене.");
          b.exclude = [.../* @__PURE__ */ new Set([...b.exclude, ...$])], b.include = b.include.filter((Z) => !$.includes(Z));
          break;
        }
        case "reset":
          b.manualOnly = !1, b.include = [], b.exclude = [];
      }
      E ? F() : M(), R(), h("content").scrollTop = A;
      return;
    }
    if (d?.id === "prev-page" && (p--, H()), d?.id === "next-page" && (p++, H()), d?.id === "show-markers" && (C = !C, d.textContent = C ? "● Знаки включены" : "○ Знаки выключены", d.setAttribute("aria-checked", String(C)), W()), d?.id === "bulk") {
      const k = h("bulk-state").value;
      for (const b of f.results) w.has(b.id) && (b.state = k);
      M(), H(), X(), D(), W();
    }
    if (d?.id === "capture-image") {
      const k = f.results.find((b) => b.id === u);
      if (k) {
        g = !1, z(!0);
        try {
          k.image = await t.snapshot(
            k,
            Number(h("distance").value),
            () => g,
            !0
          ), k.imageScope = "pair-ab", M(), X(), q("Снимок сохранён в результат.");
        } finally {
          z(!1);
        }
      }
      return;
    }
    if (d?.id === "open-image") {
      const k = f.results.find((b) => b.id === u);
      if (k?.image) {
        const b = document.createElement("dialog");
        b.className = "image-dialog", b.innerHTML = '<button>Закрыть</button><img alt="Снимок коллизии">', b.querySelector("img").src = k.image, b.querySelector("button").onclick = () => {
          b.close(), b.remove();
        }, n.append(b), b.showModal();
      }
      return;
    }
    if (d?.id === "focus" && _(u, !0), d?.id === "previous" || d?.id === "next") {
      const k = S(), b = k.findIndex((A) => A.id === u) + (d.id === "next" ? 1 : -1);
      k[b] && (p = Math.floor(b / 50), H(), _(k[b].id, !0));
    }
    if (d?.id === "export-html" || d?.id === "export-viewer") {
      let k = 0;
      const b = h("selected-only").checked ? f.results.filter((E) => w.has(E.id)) : f.results;
      if (!b.length) throw Error("Нет результатов для отчёта.");
      if (h("report-images").checked) {
        const E = t.view, $ = E?.storeView();
        g = !1, z(!0);
        try {
          let Z = 0;
          for (const ae of b) {
            if (g)
              throw Error(
                "Подготовка отчёта отменена. Уже полученные снимки сохранены."
              );
            if (q("Подготовка снимков: " + ++Z + " / " + b.length), !ae.image || ae.imageScope !== "pair-ab") {
              if (ae.state === "resolved" && !t.canLocate(ae)) continue;
              try {
                ae.image = await t.snapshot(
                  ae,
                  Number(h("distance").value),
                  () => g
                ), ae.imageScope = "pair-ab", M();
              } catch (Be) {
                if (g || !t.isCurrent()) throw Be;
                k++;
              }
            }
          }
        } finally {
          if (E && t.isCurrent()) {
            const Z = f.results.find((ae) => ae.id === u);
            if (Z)
              try {
                t.focus(
                  Z,
                  Number(h("distance").value),
                  !1
                );
              } catch {
              }
            $ && E.restoreView($);
          }
          z(!1);
        }
      }
      const A = h("report-images").checked ? b.map(
        (E) => E.imageScope === "pair-ab" ? E : { ...E, image: void 0 }
      ) : b.map((E) => ({ ...E, image: void 0 }));
      $e(
        f.name + (d.id === "export-html" ? ".html" : ".collision360.json"),
        d.id === "export-html" ? nt(f, A) : ot(f, A)
      ), q(
        "Отчёт подготовлен. Результатов: " + b.length + "; со снимками: " + A.filter((E) => E.image).length + "." + (k ? ` Не удалось создать снимков: ${k}; эти строки включены без изображения.` : ""),
        k > 0
      );
    }
    const x = r.closest("[data-result]");
    x && !r.closest("input") && !window.getSelection()?.toString() && _(x.dataset.result);
  }), h("content").ondblclick = (o) => {
    const r = o.target, d = r.closest("[data-result]");
    d && !r.closest("input") && N(() => _(d.dataset.result, !0));
  };
  const ie = setInterval(() => {
    y || (O() ? (h("model-count").textContent = "Модели не прочитаны", q(
      i.checks.length ? "Открыт другой проект. Показаны его проверки; обновите модели." : "Открыт другой проект. Для него ещё нет проверок."
    ), y || R()) : a && !t.isCurrent() && (a = void 0, t.clear(), h("model-count").textContent = "3D-окно изменилось", q("Активное 3D-окно изменилось. Обновите модели."), y || R()));
  }, 1500);
  return R(), () => {
    l(), clearInterval(ie), g = !0, L?.(), v?.terminate(), t.clear();
  };
}
var Ce = /* @__PURE__ */ ((e) => (e.object = "object", e.drawing = "drawing", e.table = "table", e.record = "record", e.textStyle = "textstyle", e.textStyleTable = "textstyles", e.linetype = "linetype", e.linetypeTable = "linetypes", e.layer = "layer", e.layerTable = "layers", e.block = "block", e.blockTable = "blocks", e.layout = "layout", e.layoutTable = "layouts", e.type = "type", e.typeTable = "types", e.material = "material", e.materialTable = "materials", e.geometry = "geometry", e.geometryTable = "geometries", e.group = "group", e.groupTable = "groups", e.attachment = "attachment", e.attachmentTable = "attachments", e.entities = "entities", e.entity = "entity", e.line = "l", e.solid = "s", e.insert = "i", e.polyline = "p", e.circle = "c", e.arc = "a", e.polyline3d = "p3", e.proxy = "x", e.text = "t", e.mtext = "mt", e.wipeout = "w", e.model3d = "g", e.alignment = "al", e))(Ce || {});
async function lt(e, t) {
  if (await new Promise((u) => requestAnimationFrame(() => u())), t()) throw Error("Подготовка снимков отменена.");
  const { width: n, height: l } = e.camera, s = Array.from(document.querySelectorAll("canvas")).filter(
    (u) => {
      const p = u.getBoundingClientRect();
      return p.width > 100 && p.height > 100 && u.width > 0 && u.height > 0 && getComputedStyle(u).visibility !== "hidden" && (Math.abs(p.width - n) < 4 && Math.abs(p.height - l) < 4 || Math.abs(u.width - n) < 4 && Math.abs(u.height - l) < 4);
    }
  );
  if (!s.length)
    throw Error(
      "Снимок 3D-окна недоступен: откройте одно видимое окно модели."
    );
  const i = s[0].getBoundingClientRect();
  if (s.some((u) => {
    const p = u.getBoundingClientRect();
    return Math.abs(p.x - i.x) > 4 || Math.abs(p.y - i.y) > 4;
  }))
    throw Error(
      "Открыто несколько подходящих 3D-окон. Оставьте одно окно для снимка."
    );
  const a = document.createElement("canvas"), c = Math.min(1, 1280 / s[0].width);
  a.width = Math.round(s[0].width * c), a.height = Math.round(s[0].height * c);
  const m = a.getContext("2d");
  m.fillStyle = "#20242b", m.fillRect(0, 0, a.width, a.height), e.repaint();
  for (const u of s)
    m.drawImage(u, 0, 0, a.width, a.height);
  try {
    return a.toDataURL("image/jpeg", 0.82);
  } catch {
    throw Error("Браузер запретил чтение изображения 3D-окна.");
  }
}
const Se = "nashepo.checks.points", qe = "nashepo.checks.highlight";
function Ne(e) {
  let t = performance.now();
  return async () => {
    if (e()) throw Error("Операция отменена.");
    performance.now() - t >= 16 && (await new Promise((n) => setTimeout(n, 0)), t = performance.now());
  };
}
function we(e, t, n, l = 0) {
  if (l > 12 || e == null) return;
  if (typeof e != "object") {
    n[t] = String(e);
    return;
  }
  if (Array.isArray(e)) {
    e.forEach((i, a) => we(i, `${t}[${a}]`, n, l + 1));
    return;
  }
  const s = e;
  if ("$value" in s) {
    we(s.$value, t, n, l + 1);
    return;
  }
  for (const [i, a] of Object.entries(s))
    i.startsWith("$") || we(a, t ? `${t}.${i}` : i, n, l + 1);
}
function dt(e) {
  const t = e.vertices.length / 3, n = (a) => Number.isFinite(e.vertices[a * 3]) && Number.isFinite(e.vertices[a * 3 + 1]) && Number.isFinite(e.vertices[a * 3 + 2]), l = (a) => {
    const c = e.indices[a], m = e.indices[a + 1], u = e.indices[a + 2];
    return c < t && m < t && u < t && c !== m && m !== u && u !== c && n(c) && n(m) && n(u);
  };
  let s = 0;
  for (let a = 0; a < e.indices.length; a += 3) l(a) && (s += 3);
  if (s === e.indices.length) return e.indices;
  const i = new Uint32Array(s);
  for (let a = 0, c = 0; a < e.indices.length; a += 3)
    l(a) && (i[c++] = e.indices[a], i[c++] = e.indices[a + 1], i[c++] = e.indices[a + 2]);
  return i;
}
const Le = (e) => /\.wdx(?:[?#].*)?$/i.test(e);
class ct {
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
  async scan(t, n, l) {
    const s = this.app, i = this.view, a = s?.model;
    if (!i || !a?.layouts || !a.attachments)
      throw Error(
        "Откройте проект Топоматик 360 с IFC или SMDX и сделайте его 3D-окно активным."
      );
    const c = [], m = [], u = [], p = [], y = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Set();
    let v = 2166136261;
    const C = Ne(
      () => n() || s !== this.app || i !== this.view
    );
    let I = -1 / 0;
    const w = (j) => {
      for (let h = 0; h < j.length; h++)
        v = Math.imul(v ^ j.charCodeAt(h), 16777619);
    }, L = async (j, h, ne) => {
      if (g.has(j)) return;
      g.add(j);
      const q = j.layers.layer0?.modelName || h, N = h, ce = Le(q) || Le(N);
      ce || c.push({ id: N, name: q });
      const M = !ce && (!l || l.has(N)), O = [];
      M && j.layouts.model?.walk((S) => (S.type === Ce.model3d ? O.push(S) : S.type === Ce.insert && m.push(`${q}: вставка блока не включена в расчёт.`), !1));
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
        if (n()) throw Error("Чтение моделей отменено.");
        if (s !== this.app || i !== this.view)
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
            for (const z of ee)
              we(z.typedProperties(), "", R), z.typed?.name && (R.Тип = z.typed.name);
          }
        } catch {
          m.push(`${q} / ${S}: часть свойств недоступна.`);
        }
        const H = R["ifc.id"] || Object.entries(R).find(
          ([ee]) => /(^|\.)(globalid|ifcguid|guid)$/i.test(ee)
        )?.[1] || "", X = B?.name || D[0].$id || "Элемент", T = JSON.stringify([N, S]);
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
            const z = te.geometry;
            if (!z || z.indices.length % 3) {
              oe = !0;
              continue;
            }
            K &&= te.isClosed;
            for (let V = 0; V < z.vertices.length; V += 3) {
              const ie = [
                z.vertices[V],
                z.vertices[V + 1],
                z.vertices[V + 2]
              ];
              if (Math3d.mat4.mulv3(ie, ee.matrix, ie), !ie.every(Number.isFinite)) {
                oe = !0;
                continue;
              }
              for (let o = 0; o < 3; o++)
                Q.min[o] = Math.min(Q.min[o], ie[o]), Q.max[o] = Math.max(Q.max[o], ie[o]);
              if (w(ie.join(",")), V % 6e4 === 0 && (performance.now() - I > 200 && (I = performance.now(), t(
                "Индексирование: " + q + " · " + p.length + " элементов"
              )), await C(), n()))
                throw Error("Чтение моделей отменено.");
            }
            const be = z.vertices.length / 3, ue = (V) => Number.isFinite(z.vertices[V * 3]) && Number.isFinite(z.vertices[V * 3 + 1]) && Number.isFinite(z.vertices[V * 3 + 2]);
            for (let V = 0; V < z.indices.length; V += 3) {
              const ie = z.indices[V], o = z.indices[V + 1], r = z.indices[V + 2];
              if (v = Math.imul(v ^ ie, 16777619), v = Math.imul(v ^ o, 16777619), v = Math.imul(v ^ r, 16777619), ie < be && o < be && r < be && ie !== o && o !== r && r !== ie && ue(ie) && ue(o) && ue(r) ? W++ : oe = !0, V % 15e4 === 0 && (await C(), n()))
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
          modelId: N,
          guid: H,
          properties: R,
          hidden: ne || !!B?.resolveHidden() || !!B?.resolveDisabled(),
          triangles: new Float64Array(0),
          triangleCount: W,
          closed: K,
          bounds: Q
        };
        w(JSON.stringify([T, R, _.hidden])), p.push(_), y.set(T, D);
      }
      P && m.push(
        `${q}: пропущено элементов без треугольной геометрии — ${P}.`
      );
      const se = [];
      j.attachments.forEach((S) => {
        se.push(S);
      });
      for (const S of se) {
        const D = `${h}/${S.name || S.uri || S.$id}`;
        S.model ? await L(
          S.model,
          D,
          ne || S.hidden
        ) : (!l || l.has(D)) && u.push(
          `${S.name || S.uri || "Подключённая модель"}: модель не загружена. Откройте её перед расчётом.`
        );
      }
    };
    if (await L(a, a.layers.layer0?.modelName || "Проект", !1), !p.length && (!l || l.size > 0))
      throw Error(
        "В открытом проекте не найдены 3D-элементы с доступной геометрией."
      );
    return this.clear(), this.refs = y, this.metadata = new Map(p.map((j) => [j.id, j])), this.scannedApp = s, this.scannedView = i, {
      elements: p,
      fingerprint: `${p.length}:${v >>> 0}`,
      warnings: [...new Set(m)],
      blockers: [...new Set(u)],
      models: c,
      indexedModelIds: c.filter((j) => !l || l.has(j.id)).map((j) => j.id)
    };
  }
  async geometry(t, n) {
    const l = Ne(() => n() || !this.isCurrent());
    if (!this.isCurrent()) throw Error("Активная модель изменилась.");
    const s = this.metadata.get(t), i = this.refs.get(t);
    if (!s || !i) throw Error("Элемент отсутствует.");
    const a = i.flatMap(
      (v) => Object.values(v.meshes).flatMap((C) => {
        const I = C.geometry;
        if (!I || I.indices.length % 3) return [];
        const w = dt(I);
        return w.length ? [{ object: v, g: I, indices: w }] : [];
      })
    );
    let c = 0, m = 0;
    for (const { g: v, indices: C } of a) {
      if (!v) throw Error("Геометрия недоступна.");
      c += v.vertices.length, m += C.length;
    }
    const u = new Float64Array(c), p = new Uint32Array(m);
    let y = 0, g = 0;
    for (const { object: v, g: C, indices: I } of a) {
      if (!C) throw Error("Геометрия недоступна.");
      for (let w = 0; w < C.vertices.length; w += 3) {
        const L = [C.vertices[w], C.vertices[w + 1], C.vertices[w + 2]];
        if (Math3d.mat4.mulv3(L, v.matrix, L), u.set(L, y + w), w % 6e4 === 0 && (await l(), n() || !this.isCurrent()))
          throw Error("Чтение геометрии отменено.");
      }
      for (let w = 0; w < I.length; w++)
        if (p[g + w] = y / 3 + I[w], w % 15e4 === 0 && (await l(), n()))
          throw Error("Чтение геометрии отменено.");
      y += C.vertices.length, g += I.length;
    }
    return { ...s, vertices: u, indices: p };
  }
  selected() {
    if (!this.isCurrent())
      throw Error("Сначала обновите модели текущего проекта.");
    const t = new Set(this.view?.layer.selectedObjects());
    return [...this.refs].filter(([, n]) => n.some((l) => t.has(l))).map(([n]) => n);
  }
  select(t) {
    if (!this.isCurrent())
      throw Error("Сначала обновите модели текущего проекта.");
    const n = new Set(t.flatMap((l) => this.refs.get(l) || []));
    this.view.layer.clearSelected(), this.view.layer.selectObjects((l) => n.has(l), !0), this.view.invalidate();
  }
  clear() {
    if (this.overlay && (this.overlay.view.layer.removeLayer(this.overlay.layer), this.overlay.view.invalidate(), this.overlay = void 0), this.pointView) {
      const t = this.pointView.annotations.get(Se);
      t && this.pointView.annotations.release(t), this.pointView.invalidate(), this.pointView = void 0;
    }
  }
  focus(t, n, l = !0) {
    if (!this.isCurrent())
      throw Error("Обновите модели текущего проекта перед переходом.");
    if (!Number.isFinite(n) || n < 0.5)
      throw Error("Дистанция камеры должна быть не менее 0,5 м.");
    if (!this.refs.has(t.a.id) || !this.refs.has(t.b.id))
      throw Error("Один из элементов отсутствует в загруженных моделях.");
    this.select([t.a.id, t.b.id]), this.highlight(t);
    const s = t.point, i = this.view;
    i.camera?.id !== "3d" && i.setCameraType("3d");
    const a = [-0.65, 0.65, -0.394], c = Math.hypot(...a);
    a.forEach((m, u) => a[u] = m / c), i.lookAt(
      s.map((m, u) => m - a[u] * n),
      a,
      [0, 0, 1],
      l,
      s
    );
  }
  highlight(t) {
    this.overlayError = void 0, this.overlay && (this.overlay.view.layer.removeLayer(this.overlay.layer), this.overlay = void 0);
    const n = this.view, s = [
      { id: t.a.id, color: 4281743103 },
      { id: t.b.id, color: 915144703 }
    ].flatMap(
      ({ id: c, color: m }, u) => [...new Set(this.refs.get(c) || [])].flatMap(
        (p) => Object.values(p.meshes).flatMap((y) => {
          const g = y.geometry;
          if (!g) return [];
          const v = {
            // SDK fields may be prototype getters rather than own properties.
            uuid: `${qe}.${u}.${g.uuid}`,
            vertices: g.vertices,
            indices: g.indices,
            normals: g.normals,
            bounds: g.bounds,
            colors: new Uint32Array(g.vertices.length / 3).fill(m)
          };
          return [{ obj: p, geometry: v, color: m }];
        })
      )
    ), a = {
      id: qe,
      order: 1e4,
      visible: !0,
      paint: () => {
      },
      paint3d: (c) => {
        const m = c.color, u = c.rasterizer.material;
        c.rasterizer.material = void 0;
        try {
          for (const { obj: p, geometry: y, color: g } of s) {
            c.color = g, c.pushMatrix();
            try {
              c.multMatrix(p.matrix), c.mesh(y);
            } finally {
              c.popMatrix();
            }
          }
        } catch (p) {
          a.visible = !1, this.overlayError = new Error(
            "Не удалось отрисовать подсветку пары: " + (p instanceof Error ? p.message : String(p))
          );
        } finally {
          c.color = m, c.rasterizer.material = u;
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
    n.layer.addLayer(a), this.overlay = { view: n, layer: a }, n.invalidate();
  }
  async snapshot(t, n, l, s = !1) {
    if (!this.isCurrent())
      throw Error("Обновите модели перед созданием снимков.");
    if (!this.canLocate(t))
      throw Error("Элементы результата отсутствуют в открытых моделях.");
    const i = this.view, a = i.layer.drawing;
    if (!a)
      throw Error(
        "Слой моделей недоступен для снимка пары. Откройте 3D-окно проекта."
      );
    const c = a.visible, m = i.annotations.visible, u = new Set(i.layer.selectedObjects());
    try {
      s ? this.highlight(t) : this.focus(t, n, !1), i.pauseAnimation(), i.layer.clearSelected(), a.visible = !1, i.annotations.visible = !1, i.invalidate();
      const p = await lt(
        i,
        () => l() || !this.isCurrent()
      );
      if (this.overlayError) throw this.overlayError;
      return p;
    } finally {
      a.visible = c, i.annotations.visible = m, i.layer.clearSelected(), i.layer.selectObjects((p) => u.has(p), !0), i.invalidate();
    }
  }
  markers(t, n, l, s) {
    if (!this.isCurrent()) return;
    const i = this.view;
    this.pointView && this.pointView !== i && this.clear();
    const a = i.annotations.get(Se);
    if (a && i.annotations.release(a), this.pointView = i, !l) {
      i.invalidate();
      return;
    }
    const c = i.annotations.create(Se, 1e4), m = t.filter((u) => u.id !== n).concat(t.filter((u) => u.id === n));
    for (const u of m.slice(-3e3)) {
      if (u.state === "resolved") continue;
      const [p, y, g] = u.point, v = u.id === n, C = u.state === "excluded" ? "#78818c" : u.state === "approved" || u.state === "reviewed" ? "#28b94b" : "#e1372d", I = v ? "#f2c94c" : C, w = () => s(u.id), L = [
        { type: "line", a: [p, y, g], b: [p, y, g + 1], color: I, width: 5 },
        {
          type: "polyline",
          points: [
            [p - 0.65, y, g + 1],
            [p + 0.65, y, g + 1],
            [p, y, g + 2.2],
            [p - 0.65, y, g + 1]
          ],
          color: I,
          fillColor: C,
          width: v ? 5 : 2
        },
        {
          type: "line",
          a: [p, y - 0.01, g + 1.85],
          b: [p, y - 0.01, g + 1.4],
          color: "#ffffff",
          width: 4
        },
        {
          type: "line",
          a: [p, y - 0.01, g + 1.22],
          b: [p, y - 0.01, g + 1.27],
          color: "#ffffff",
          width: 4
        }
      ];
      c.add({
        id: u.id,
        type: "shaped",
        shapes: L,
        activeShapes: L,
        activateCommand: w,
        dblCommand: w
      }), v && c.add({
        id: u.id + ":label",
        type: "simple",
        position: [p, y, g + 2.35],
        label: `${u.a.name} × ${u.b.name}`,
        labelBackground: "#f2c94c",
        labelColor: "#171717",
        activateCommand: w
      });
    }
    i.invalidate();
  }
}
let Pe;
const pt = {
  open(e) {
    e.manager.revealView("nashepo.collisionfinder360/checks_panel");
  },
  mount(e) {
    const t = e.el;
    if (!t) return;
    Pe?.();
    const n = document.createElement("div");
    n.style.height = "100%", t.replaceChildren(n), Pe = rt(n, new ct(e));
  }
};
export {
  pt as default
};
