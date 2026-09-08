const je = `<h2>Работа с проверками</h2>
<details open><summary>1. Первая проверка: одна модель против другой</summary><ol><li>Откройте проект и подключите нужные IFC/SMDX штатными средствами Топоматик 360.</li><li>Откройте нижнюю вкладку «Проверки» и нажмите «Обновить модели». Плагин прочитает состав, свойства и габариты элементов.</li><li>Нажмите «＋ Проверка». Вверху задайте имя, например «Водопровод — канализация».</li><li>Во вкладке «Выбрать» отметьте модель водопровода в А, модель канализации в Б. Несколько файлов выбираются с Ctrl, диапазон — с Shift. Без выбранных файлов используются все прочитанные модели.</li><li>Выберите «По пересечению» и нажмите «Запустить». Пара проверяется один раз; один и тот же геометрический элемент сам с собой не сравнивается.</li><li>Во вкладке «Результаты» дважды нажмите строку: камера направится к точке конфликта. А обозначается красным, Б — синим.</li></ol></details>
<details><summary>2. Несколько проверок и выборки по свойствам</summary><p>Каждая проверка хранит собственные модели А/Б, условия и результаты. Создайте отдельные проверки для разных разделов или скопируйте существующую и измените модели. «Запустить все» последовательно выполняет все созданные проверки; поиск слева только фильтрует список, а не состав пакетного запуска.</p><p>«＋ Условие» ограничивает выборку по свойству: например типу, системе или материалу. Выберите доступное имя свойства из подсказки и задайте значение. «И» требует выполнения всех условий, «ИЛИ» — хотя бы одного. Модель и условия действуют совместно. Перед каждым запуском выборка вычисляется заново. Число элементов указано рядом с А/Б.</p><p>IFC GUID читается из свойства <code>ifc.id</code>; также поддерживаются поля GlobalId и GUID. Вы можете использовать <code>ifc.id</code> в условиях.</p></details>
<details><summary>3. Кнопки работы с выделением в 3D</summary><p>Сначала выделите элементы штатными средствами в 3D-окне, затем нажмите кнопку в нужной выборке А или Б:</p><ul><li><b>Показать выборку</b> — выделяет в сцене весь текущий состав этой выборки.</li><li><b>Только выделенные</b> — заменяет выборку текущим выделением. Удобно для проверки конкретной пары или небольшой группы. Автоматические модели и условия в этом режиме не применяются.</li><li><b>＋ Добавить выделенные</b> — включает элементы дополнительно, даже если они не проходят условия. Если уже выбраны все модели без условий, число элементов может не измениться: они уже входят в выборку.</li><li><b>− Исключить выделенные</b> — убирает элементы из выборки. Исключение имеет приоритет.</li><li><b>Вернуть автоматический выбор</b> — очищает ручные добавления/исключения и снова использует модели и условия.</li></ul><p>Ручной выбор сохраняет идентификаторы элементов. Если их заменили при обновлении модели, выделение следует задать заново.</p></details>
<details><summary>4. Пересечения, касания, точность и дубликаты</summary><p><b>Пересечение</b> — поверхности проходят друг сквозь друга либо элемент находится внутри замкнутого тела. <b>Касание</b> — поверхности соприкасаются без проникновения, например торец трубы касается стены. «Учитывать касания» включает такие пары; обычно этот переключатель оставляют выключенным.</p><p>«Точность расчёта, мм» — числовая погрешность, а не минимальная глубина проникновения. Проверки просвета и фильтр по глубине проникновения пока не реализованы.</p><p><b>Дублирование</b> ищет одинаковые треугольники в одинаковых мировых координатах после округления с заданной точностью. Для дубликатов внутри файла выберите этот файл в А и Б. Порядок треугольников и вершин не важен; разная триангуляция одинаковой формы пока не сопоставляется.</p></details>
<details><summary>5. Составные объекты и правила исключений</summary><p>Один IFC-объект может состоять из нескольких геометрических частей. Эти части проверяются друг с другом, поэтому у результата могут совпадать имя и IFC GUID. Чтобы пропускать такие пары, включите «Не проверять геометрию одного составного объекта» во вкладке «Правила».</p><p>Там же можно исключить пары из одной модели, пары с одинаковым значением свойства и включить скрытые элементы. Незагруженные подключённые файлы надо открыть перед расчётом.</p></details>
<details><summary>6. Результаты, состояния и повторный запуск</summary><p>«Новый» — найден впервые; «Активный» — найден при повторном запуске; «Проверенный» — рассмотрен пользователем; «Подтверждённый» — решение подтверждено; «Исключённый» — сознательно исключён из работы. «Исправленный» устанавливается при исчезновении пары на повторном полном расчёте с теми же условиями; его также можно выставить вручную.</p><p>Назначение — исполнитель или подразделение, комментарий — ваше решение. Галочки в таблице позволяют менять состояние сразу у нескольких результатов. Галочка в заголовке выбирает текущую страницу. Поиск и фильтр состояний ограничивают видимые строки. Значения таблицы и свойств можно выделять и копировать.</p><p>При повторном запуске с теми же условиями сохраняются назначения и комментарии. Если условия изменены, начинается новый набор результатов: сначала сохраните предыдущую работу. Отключение ранее участвовавшей модели останавливает повторный расчёт, чтобы её конфликты не стали исправленными по ошибке.</p></details>
<details><summary>7. Снимки и передача отчёта</summary><p>В карточке результата нажмите «Сохранить текущий ракурс», чтобы записать изображение 3D-окна после ручной настройки камеры. Снимок можно открыть крупнее.</p><p>Во вкладке «Отчёт» включите «Добавить снимки» и сформируйте HTML: для результатов без изображения плагин последовательно выставит камеру и сделает снимки. Не переключайте проект и не перемещайте камеру во время подготовки. Кнопка «Остановить» прерывает подготовку; уже полученные снимки сохраняются.</p><p>HTML содержит изображения, поиск и фильтр состояний; его можно открыть без Топоматик. Файл сессии открывается в плагине «НашеПО · Коллизии». Исправленным парам, элементы которых отсутствуют, сохраняется прежний снимок; новый снимок для них получить нельзя. При недоступности изображения плагин сообщает об этом и не подставляет чужой ракурс.</p></details>
<details><summary>8. Сохранение работы и большие проекты</summary><p>«Сохранить проверки» записывает правила, результаты, комментарии и снимки в JSON. «Открыть проверки» загружает этот файл для продолжения работы. Геометрия в него не включается: соответствующие модели надо открыть в Топоматик отдельно. Без сохранения в файл работа может быть потеряна при закрытии страницы.</p><p>Общий предел в 6 млн треугольников снят. Сначала строится индекс габаритов; точная геометрия близких пар передаётся в расчёт по мере необходимости в компактном индексированном виде. Расчёт всё ещё ограничен доступной памятью и временем, особенно если один элемент очень крупный или почти все элементы пересекаются. Для управляемых результатов полезно разделять проверки по системам и моделям. В сцене одновременно выводятся до 3000 знаков. При достижении 50 000 результатов расчёт останавливается с сообщением, без замены прежних результатов.</p></details>`, Se = "0.2.1", se = (e) => typeof e == "string" && /^data:image\/(jpeg|png);base64,[A-Za-z0-9+/=]+$/.test(e), X = {
  new: "Новый",
  active: "Активный",
  reviewed: "Проверенный",
  approved: "Подтверждённый",
  resolved: "Исправленный",
  excluded: "Исключённый"
}, he = () => ({
  models: [],
  conditions: [],
  mode: "all",
  include: [],
  exclude: []
}), Ie = () => ({
  id: crypto.randomUUID(),
  name: "Новая проверка",
  type: "intersection",
  a: he(),
  b: he(),
  precision: 0.1,
  touching: !1,
  ignoreSameModel: !1,
  ignoreSameGroup: !1,
  equalProperty: "",
  includeHidden: !1,
  results: [],
  status: "new",
  warnings: []
}), ge = ({
  triangles: e,
  vertices: t,
  indices: i,
  triangleCount: n,
  closed: a,
  bounds: r,
  ...f
}) => f;
function re(e, t) {
  if (t.exclude.includes(e.id)) return !1;
  if (t.include.includes(e.id)) return !0;
  if (t.manualOnly || t.models.length && !t.models.includes(e.modelId)) return !1;
  const i = (n) => {
    const a = e.properties[n.field], r = (a ?? "").toLocaleLowerCase(), f = n.value.toLocaleLowerCase();
    switch (n.op) {
      case "exists":
        return a !== void 0 && a !== "";
      case "eq":
        return a !== void 0 && r === f;
      case "ne":
        return a !== void 0 && r !== f;
      case "contains":
        return a !== void 0 && r.includes(f);
      case "gt":
        return a !== void 0 && a.trim() !== "" && Number(a.replace(",", ".")) > Number(n.value.replace(",", "."));
      case "lt":
        return a !== void 0 && a.trim() !== "" && Number(a.replace(",", ".")) < Number(n.value.replace(",", "."));
    }
  };
  return !t.conditions.length || (t.mode === "all" ? t.conditions.every(i) : t.conditions.some(i));
}
const Ee = (e) => JSON.stringify([
  e.type,
  e.a,
  e.b,
  e.precision,
  e.touching,
  e.ignoreSameModel,
  e.ignoreSameGroup,
  e.equalProperty,
  e.includeHidden
]), Ce = (e, t) => JSON.stringify([e, t].sort());
function Oe(e, t, i) {
  const n = new Map(e.map((r) => [r.id, r])), a = t.map((r) => {
    const f = n.get(r.id);
    return n.delete(r.id), {
      ...r,
      note: f?.note ?? "",
      assignee: f?.assignee ?? "",
      firstSeen: f?.firstSeen ?? i,
      lastSeen: i,
      state: !f || f.state === "resolved" ? "new" : f.state === "new" ? "active" : f.state
    };
  });
  for (const r of n.values())
    a.push({
      ...r,
      state: r.state === "excluded" ? "excluded" : "resolved"
    });
  return a;
}
function Ae(e) {
  const t = JSON.parse(e);
  if (t?.format !== "nashepo.checks" || t.version !== 1 || !Array.isArray(t.checks))
    throw Error("Это не файл проекта проверок НашеПО.");
  const i = /* @__PURE__ */ new Set();
  for (const n of t.checks) {
    if (!n || typeof n.id != "string" || i.has(n.id) || typeof n.name != "string" || !["intersection", "duplicates"].includes(n.type) || !Number.isFinite(n.precision) || n.precision < 1e-3 || n.precision > 100 || !Array.isArray(n.results))
      throw Error("Некорректные параметры проверки.");
    if (i.add(n.id), ![
      "touching",
      "ignoreSameModel",
      "ignoreSameGroup",
      "includeHidden"
    ].every(
      (a) => typeof n[a] == "boolean"
    ) || typeof n.equalProperty != "string" || n.modelsAtRun !== void 0 && (!Array.isArray(n.modelsAtRun) || !n.modelsAtRun.every((a) => typeof a == "string")))
      throw Error("Некорректные правила проверки.");
    for (const a of [n.a, n.b])
      if (!a || a.manualOnly !== void 0 && typeof a.manualOnly != "boolean" || !["all", "any"].includes(a.mode) || ![a.models, a.include, a.exclude].every(
        (r) => Array.isArray(r) && r.every((f) => typeof f == "string")
      ) || !Array.isArray(a.conditions) || !a.conditions.every(
        (r) => r && typeof r.field == "string" && typeof r.value == "string" && ["eq", "ne", "contains", "exists", "gt", "lt"].includes(r.op)
      ))
        throw Error("Некорректная выборка.");
    for (const a of n.results) {
      if (a?.image !== void 0 && !se(a.image))
        throw Error("Некорректный снимок результата.");
      if (!a || typeof a.id != "string" || !Object.hasOwn(X, a.state) || !Array.isArray(a.point) || a.point.length !== 3 || !a.point.every(Number.isFinite))
        throw Error("Некорректный результат.");
      for (const r of [a.a, a.b])
        if (!r || !["id", "name", "model", "modelId", "guid"].every(
          (f) => typeof r[f] == "string"
        ) || !r.properties || typeof r.properties != "object")
          throw Error("Некорректный элемент результата.");
    }
    n.status = "stale", n.warnings = [];
  }
  return t;
}
const U = (e, t) => [e[0] - t[0], e[1] - t[1], e[2] - t[2]], me = (e, t, i = 1) => [
  e[0] + t[0] * i,
  e[1] + t[1] * i,
  e[2] + t[2] * i
], H = (e, t) => e[0] * t[0] + e[1] * t[1] + e[2] * t[2], ne = (e, t) => [
  e[1] * t[2] - e[2] * t[1],
  e[2] * t[0] - e[0] * t[2],
  e[0] * t[1] - e[1] * t[0]
], Z = (e) => Math.hypot(...e), ee = (e) => e.triangleCount ?? (e.indices ? e.indices.length / 3 : e.triangles.length / 9), K = (e, t, i) => e.indices && e.vertices ? e.vertices[e.indices[t * 3 + Math.floor(i / 3)] * 3 + i % 3] : e.triangles[t * 9 + i], ie = (e, t) => [0, 3, 6].map((i) => [
  K(e, t, i),
  K(e, t, i + 1),
  K(e, t, i + 2)
]);
function ve(e) {
  const t = [1 / 0, 1 / 0, 1 / 0], i = [-1 / 0, -1 / 0, -1 / 0];
  for (let n = 0; n < e.length; n++) {
    const a = n % 3;
    t[a] = Math.min(t[a], e[n]), i[a] = Math.max(i[a], e[n]);
  }
  return { min: t, max: i };
}
const ke = (e, t, i) => e.min.every((n, a) => n <= t.max[a] + i && e.max[a] >= t.min[a] - i);
function de(e, t) {
  const i = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const d of t)
    for (let m = 0; m < 9; m++) {
      const u = m % 3, c = K(e, d, m);
      i.min[u] = Math.min(i.min[u], c), i.max[u] = Math.max(i.max[u], c);
    }
  if (t.length <= 12) return { ...i, ids: t };
  const n = i.max.map((d, m) => d - i.min[m]), a = n.indexOf(Math.max(...n)), r = (d) => K(e, d, a) + K(e, d, a + 3) + K(e, d, a + 6);
  t.sort((d, m) => r(d) - r(m));
  const f = t.length >> 1;
  return {
    ...i,
    left: de(e, t.slice(0, f)),
    right: de(e, t.slice(f))
  };
}
function* te(e, t, i) {
  ke(e, t, i) && (e.ids ? yield* e.ids : (yield* te(e.left, t, i), yield* te(e.right, t, i)));
}
function ue(e, t) {
  const i = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const f of t)
    for (let d = 0; d < 3; d++)
      i.min[d] = Math.min(i.min[d], e[f].bounds.min[d]), i.max[d] = Math.max(i.max[d], e[f].bounds.max[d]);
  if (t.length <= 16) return { ...i, ids: t };
  const n = i.max.map((f, d) => f - i.min[d]), a = n.indexOf(Math.max(...n));
  t.sort(
    (f, d) => e[f].bounds.min[a] + e[f].bounds.max[a] - (e[d].bounds.min[a] + e[d].bounds.max[a])
  );
  const r = t.length >> 1;
  return {
    ...i,
    left: ue(e, t.slice(0, r)),
    right: ue(e, t.slice(r))
  };
}
function pe(e, t, i, n) {
  const a = U(t, e), r = U(i[1], i[0]), f = U(i[2], i[0]), d = ne(a, f), m = H(r, d);
  if (Math.abs(m) <= 1e-12 * Z(a) * Z(r) * Z(f)) return;
  const u = 1 / m, c = U(e, i[0]), b = H(c, d) * u, w = ne(c, r), v = H(a, w) * u, M = H(f, w) * u, x = n / Math.max(Z(r), Z(f), n);
  if (b >= -x && v >= -x && b + v <= 1 + x && M >= -x && M <= 1 + x)
    return me(e, a, Math.max(0, Math.min(1, M)));
}
function Le(e, t, i, n) {
  const a = i.map(Math.abs).indexOf(Math.max(...i.map(Math.abs))), r = [0, 1, 2].filter((m) => m !== a), f = (m, u, c) => (u[r[0]] - m[r[0]]) * (c[r[1]] - m[r[1]]) - (u[r[1]] - m[r[1]]) * (c[r[0]] - m[r[0]]), d = (m, u) => {
    const c = u.map((b, w) => f(b, u[(w + 1) % 3], m));
    return c.every((b) => b >= -n * Z(i)) || c.every((b) => b <= n * Z(i));
  };
  for (const m of e) if (d(m, t)) return m;
  for (const m of t) if (d(m, e)) return m;
  for (let m = 0; m < 3; m++)
    for (let u = 0; u < 3; u++) {
      const c = e[m], b = e[(m + 1) % 3], w = t[u], v = t[(u + 1) % 3], M = U(b, c), x = U(v, w), p = M[r[0]] * x[r[1]] - M[r[1]] * x[r[0]];
      if (Math.abs(p) < 1e-18) continue;
      const O = U(w, c), B = (O[r[0]] * x[r[1]] - O[r[1]] * x[r[0]]) / p, A = (O[r[0]] * M[r[1]] - O[r[1]] * M[r[0]]) / p;
      if (B >= 0 && B <= 1 && A >= 0 && A <= 1) return me(c, M, B);
    }
}
function $e(e, t, i, n) {
  const a = ne(U(e[1], e[0]), U(e[2], e[0])), r = ne(U(t[1], t[0]), U(t[2], t[0])), f = Z(a), d = Z(r);
  if (f < 1e-20 || d < 1e-20) return;
  const m = t.map((c) => H(U(c, e[0]), a) / f), u = e.map((c) => H(U(c, t[0]), r) / d);
  if (!(m.every((c) => c > i) || m.every((c) => c < -i) || u.every((c) => c > i) || u.every((c) => c < -i))) {
    if (m.every((c) => Math.abs(c) <= i) && u.every((c) => Math.abs(c) <= i))
      return n ? Le(e, t, a, i) : void 0;
    if (!(!n && (!(Math.min(...m) < -i && Math.max(...m) > i) || !(Math.min(...u) < -i && Math.max(...u) > i))))
      for (let c = 0; c < 3; c++) {
        const b = pe(e[c], e[(c + 1) % 3], t, i);
        if (b) return b;
        const w = pe(t[c], t[(c + 1) % 3], e, i);
        if (w) return w;
      }
  }
}
function ze(e, t, i) {
  const n = U(t[1], t[0]), a = U(t[2], t[0]), r = ne(n, a), f = Z(r);
  if (f < 1e-20 || Math.abs(H(U(e, t[0]), r)) / f > i) return !1;
  const d = U(e, t[0]), m = H(n, n), u = H(n, a), c = H(a, a), b = H(d, n), w = H(d, a), v = m * c - u * u;
  if (Math.abs(v) < 1e-30) return !1;
  const M = (b * c - w * u) / v, x = (w * m - b * u) / v, p = i / Math.max(Z(n), Z(a), i);
  return M >= -p && x >= -p && M + x <= 1 + p;
}
function le(e, t, i, n) {
  if (!t.closed || e.some((b, w) => b <= t.bounds.min[w] + n || b >= t.bounds.max[w] - n))
    return !1;
  for (const b of te(i, { min: e, max: e }, n))
    if (ze(e, ie(t, b), n)) return !1;
  const a = [1, 0.371390676, 0.52999894], r = Z(U(t.bounds.max, t.bounds.min)) * 3 + 1, f = me(e, a, r), d = [], m = ve([...e, ...f]);
  for (const b of te(i, m, n)) {
    const w = pe(e, f, ie(t, b), n);
    if (w) {
      const v = Z(U(w, e));
      v > n && d.push(v);
    }
  }
  d.sort((b, w) => b - w);
  let u = 0, c = -1 / 0;
  for (const b of d)
    b - c > n * 2 && (u++, c = b);
  return u % 2 === 1;
}
async function Ne(e, t, i, n, a) {
  const r = t.precision / 1e3;
  if (!Number.isFinite(r) || r <= 0)
    throw Error("Точность расчёта должна быть положительным числом.");
  const f = e.filter((g) => t.includeHidden || !g.hidden), d = f.filter((g) => re(g, t.a)), m = f.filter((g) => re(g, t.b));
  if (!d.length || !m.length)
    throw Error("Выборка А или Б пуста. Проверьте модели и условия.");
  let u = performance.now();
  const c = async () => {
    if (n())
      throw Error("Расчёт отменён. Предыдущие результаты сохранены.");
    performance.now() - u > 16 && (await new Promise((g) => setTimeout(g, 0)), u = performance.now());
  }, b = /* @__PURE__ */ new Map(), w = (g) => {
    let E = b.get(g.id);
    return E || (E = de(
      g,
      Array.from({ length: ee(g) }, (C, S) => S)
    ), b.set(g.id, E)), E;
  }, v = /* @__PURE__ */ new Map(), M = async (g) => {
    let E = v.get(g.id);
    if (E !== void 0) return E;
    const C = [];
    for (let S = 0; S < ee(g); S++)
      C.push(
        [0, 3, 6].map(
          (G) => [0, 1, 2].map((L) => Math.round(K(g, S, G + L) / r)).join(",")
        ).sort().join(";")
      ), S % 9e3 === 0 && await c();
    return E = C.sort().join("|"), v.set(g.id, E), E;
  }, x = [], p = new Set(d.map((g) => g.id)), O = new Set(m.map((g) => g.id)), B = ue(
    m,
    m.map((g, E) => E)
  ), A = /* @__PURE__ */ new Map();
  let J = 0;
  const W = (g) => g.triangles.byteLength + (g.vertices?.byteLength || 0) + (g.indices?.byteLength || 0) + ee(g) * 32;
  async function T(g, E) {
    if (!a) return g;
    let C = A.get(g.id);
    if (C)
      return A.delete(g.id), A.set(g.id, C), C;
    for (const [S, G] of A)
      S !== E && J > 96 * 1024 * 1024 && (A.delete(S), J -= W(G), b.delete(S), v.delete(S));
    return C = await a(g.id), A.set(g.id, C), J += W(C), C;
  }
  let V = -1 / 0;
  for (let g = 0; g < d.length; g++) {
    const E = d[g];
    performance.now() - V > 150 && (V = performance.now(), i({
      phase: "Проверка пар",
      done: g,
      total: d.length,
      found: x.length
    }));
    for (const C of te(B, E.bounds, r)) {
      const S = m[C];
      if (await c(), E.id === S.id || !ke(E.bounds, S.bounds, r) || t.ignoreSameModel && E.modelId === S.modelId || t.ignoreSameGroup && E.modelId === S.modelId && E.properties.Объект && E.properties.Объект === S.properties.Объект || t.equalProperty && E.properties[t.equalProperty] !== void 0 && E.properties[t.equalProperty] === S.properties[t.equalProperty] || E.id > S.id && p.has(S.id) && O.has(E.id)) continue;
      const G = Ce(E.id, S.id), L = await T(E), $ = await T(S, E.id);
      let z, q = "surface";
      if (t.type === "duplicates") {
        if (ee(L) !== ee($) || L.bounds.min.some(
          (Q, D) => Math.abs(Q - $.bounds.min[D]) > r || Math.abs(L.bounds.max[D] - $.bounds.max[D]) > r
        ))
          continue;
        await M(L) === await M($) && (z = L.bounds.min.map((Q, D) => (Q + L.bounds.max[D]) / 2), q = "duplicate");
      } else {
        const Q = w(L), D = w($);
        for (let Y = 0; Y < ee(L) && !z; Y++) {
          const R = ie(L, Y), o = ve(R.flat());
          for (const s of te(D, o, r)) {
            if (z = $e(R, ie($, s), r, t.touching), z) break;
            await c();
          }
          await c();
        }
        if (!z && L.closed && $.closed) {
          const Y = L.bounds.min.map(
            (R, o) => (R + L.bounds.max[o]) / 2
          );
          le(Y, L, Q, r) && le(Y, $, D, r) && (z = Y, q = "contained");
        }
        if (!z) {
          for (const [Y, R, o] of [
            [L, $, D],
            [$, L, Q]
          ])
            if (R.closed) {
              for (let s = 0; s < ee(Y) && !z; s++) {
                const l = ie(Y, s), h = l[0].map(
                  (k, j) => (l[0][j] + l[1][j] + l[2][j]) / 3
                );
                for (const k of [l[0], h])
                  if (le(k, R, o, r)) {
                    z = k, q = "contained";
                    break;
                  }
                await c();
              }
              if (z) break;
            }
        }
      }
      if (z && (x.push({
        id: G,
        a: ge(L),
        b: ge($),
        point: z,
        kind: q,
        state: "new",
        note: "",
        assignee: "",
        firstSeen: "",
        lastSeen: ""
      }), x.length >= 5e4))
        throw Error(
          "Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат."
        );
    }
  }
  return i({
    phase: "Готово",
    done: d.length,
    total: d.length,
    found: x.length
  }), x;
}
const Me = `(function(){"use strict";const k=({triangles:t,vertices:n,indices:e,triangleCount:a,closed:o,bounds:i,...u})=>u;function nn(t,n){if(n.exclude.includes(t.id))return!1;if(n.include.includes(t.id))return!0;if(n.manualOnly||n.models.length&&!n.models.includes(t.modelId))return!1;const e=a=>{const o=t.properties[a.field],i=(o??"").toLocaleLowerCase(),u=a.value.toLocaleLowerCase();switch(a.op){case"exists":return o!==void 0&&o!=="";case"eq":return o!==void 0&&i===u;case"ne":return o!==void 0&&i!==u;case"contains":return o!==void 0&&i.includes(u);case"gt":return o!==void 0&&o.trim()!==""&&Number(o.replace(",","."))>Number(a.value.replace(",","."));case"lt":return o!==void 0&&o.trim()!==""&&Number(o.replace(",","."))<Number(a.value.replace(",","."))}};return!n.conditions.length||(n.mode==="all"?n.conditions.every(e):n.conditions.some(e))}const an=(t,n)=>JSON.stringify([t,n].sort()),y=(t,n)=>[t[0]-n[0],t[1]-n[1],t[2]-n[2]],Q=(t,n,e=1)=>[t[0]+n[0]*e,t[1]+n[1]*e,t[2]+n[2]*e],I=(t,n)=>t[0]*n[0]+t[1]*n[1]+t[2]*n[2],A=(t,n)=>[t[1]*n[2]-t[2]*n[1],t[2]*n[0]-t[0]*n[2],t[0]*n[1]-t[1]*n[0]],v=t=>Math.hypot(...t),N=t=>t.triangleCount??(t.indices?t.indices.length/3:t.triangles.length/9),L=(t,n,e)=>t.indices&&t.vertices?t.vertices[t.indices[n*3+Math.floor(e/3)]*3+e%3]:t.triangles[n*9+e],F=(t,n)=>[0,3,6].map(e=>[L(t,n,e),L(t,n,e+1),L(t,n,e+2)]);function tn(t){const n=[1/0,1/0,1/0],e=[-1/0,-1/0,-1/0];for(let a=0;a<t.length;a++){const o=a%3;n[o]=Math.min(n[o],t[a]),e[o]=Math.max(e[o],t[a])}return{min:n,max:e}}const en=(t,n,e)=>t.min.every((a,o)=>a<=n.max[o]+e&&t.max[o]>=n.min[o]-e);function R(t,n){const e={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const r of n)for(let c=0;c<9;c++){const d=c%3,s=L(t,r,c);e.min[d]=Math.min(e.min[d],s),e.max[d]=Math.max(e.max[d],s)}if(n.length<=12)return{...e,ids:n};const a=e.max.map((r,c)=>r-e.min[c]),o=a.indexOf(Math.max(...a)),i=r=>L(t,r,o)+L(t,r,o+3)+L(t,r,o+6);n.sort((r,c)=>i(r)-i(c));const u=n.length>>1;return{...e,left:R(t,n.slice(0,u)),right:R(t,n.slice(u))}}function*C(t,n,e){en(t,n,e)&&(t.ids?yield*t.ids:(yield*C(t.left,n,e),yield*C(t.right,n,e)))}function U(t,n){const e={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const u of n)for(let r=0;r<3;r++)e.min[r]=Math.min(e.min[r],t[u].bounds.min[r]),e.max[r]=Math.max(e.max[r],t[u].bounds.max[r]);if(n.length<=16)return{...e,ids:n};const a=e.max.map((u,r)=>u-e.min[r]),o=a.indexOf(Math.max(...a));n.sort((u,r)=>t[u].bounds.min[o]+t[u].bounds.max[o]-(t[r].bounds.min[o]+t[r].bounds.max[o]));const i=n.length>>1;return{...e,left:U(t,n.slice(0,i)),right:U(t,n.slice(i))}}function V(t,n,e,a){const o=y(n,t),i=y(e[1],e[0]),u=y(e[2],e[0]),r=A(o,u),c=I(i,r);if(Math.abs(c)<=1e-12*v(o)*v(i)*v(u))return;const d=1/c,s=y(t,e[0]),l=I(s,r)*d,h=A(s,i),w=I(o,h)*d,M=I(u,h)*d,x=a/Math.max(v(i),v(u),a);if(l>=-x&&w>=-x&&l+w<=1+x&&M>=-x&&M<=1+x)return Q(t,o,Math.max(0,Math.min(1,M)))}function cn(t,n,e,a){const o=e.map(Math.abs).indexOf(Math.max(...e.map(Math.abs))),i=[0,1,2].filter(c=>c!==o),u=(c,d,s)=>(d[i[0]]-c[i[0]])*(s[i[1]]-c[i[1]])-(d[i[1]]-c[i[1]])*(s[i[0]]-c[i[0]]),r=(c,d)=>{const s=d.map((l,h)=>u(l,d[(h+1)%3],c));return s.every(l=>l>=-a*v(e))||s.every(l=>l<=a*v(e))};for(const c of t)if(r(c,n))return c;for(const c of n)if(r(c,t))return c;for(let c=0;c<3;c++)for(let d=0;d<3;d++){const s=t[c],l=t[(c+1)%3],h=n[d],w=n[(d+1)%3],M=y(l,s),x=y(w,h),S=M[i[0]]*x[i[1]]-M[i[1]]*x[i[0]];if(Math.abs(S)<1e-18)continue;const T=y(h,s),G=(T[i[0]]*x[i[1]]-T[i[1]]*x[i[0]])/S,j=(T[i[0]]*M[i[1]]-T[i[1]]*M[i[0]])/S;if(G>=0&&G<=1&&j>=0&&j<=1)return Q(s,M,G)}}function fn(t,n,e,a){const o=A(y(t[1],t[0]),y(t[2],t[0])),i=A(y(n[1],n[0]),y(n[2],n[0])),u=v(o),r=v(i);if(u<1e-20||r<1e-20)return;const c=n.map(s=>I(y(s,t[0]),o)/u),d=t.map(s=>I(y(s,n[0]),i)/r);if(!(c.every(s=>s>e)||c.every(s=>s<-e)||d.every(s=>s>e)||d.every(s=>s<-e))){if(c.every(s=>Math.abs(s)<=e)&&d.every(s=>Math.abs(s)<=e))return a?cn(t,n,o,e):void 0;if(!(!a&&(!(Math.min(...c)<-e&&Math.max(...c)>e)||!(Math.min(...d)<-e&&Math.max(...d)>e))))for(let s=0;s<3;s++){const l=V(t[s],t[(s+1)%3],n,e);if(l)return l;const h=V(n[s],n[(s+1)%3],t,e);if(h)return h}}}function un(t,n,e){const a=y(n[1],n[0]),o=y(n[2],n[0]),i=A(a,o),u=v(i);if(u<1e-20||Math.abs(I(y(t,n[0]),i))/u>e)return!1;const r=y(t,n[0]),c=I(a,a),d=I(a,o),s=I(o,o),l=I(r,a),h=I(r,o),w=c*s-d*d;if(Math.abs(w)<1e-30)return!1;const M=(l*s-h*d)/w,x=(h*c-l*d)/w,S=e/Math.max(v(a),v(o),e);return M>=-S&&x>=-S&&M+x<=1+S}function W(t,n,e,a){if(!n.closed||t.some((l,h)=>l<=n.bounds.min[h]+a||l>=n.bounds.max[h]-a))return!1;for(const l of C(e,{min:t,max:t},a))if(un(t,F(n,l),a))return!1;const o=[1,.371390676,.52999894],i=v(y(n.bounds.max,n.bounds.min))*3+1,u=Q(t,o,i),r=[],c=tn([...t,...u]);for(const l of C(e,c,a)){const h=V(t,u,F(n,l),a);if(h){const w=v(y(h,t));w>a&&r.push(w)}}r.sort((l,h)=>l-h);let d=0,s=-1/0;for(const l of r)l-s>a*2&&(d++,s=l);return d%2===1}async function dn(t,n,e,a,o){const i=n.precision/1e3;if(!Number.isFinite(i)||i<=0)throw Error("Точность расчёта должна быть положительным числом.");const u=t.filter(f=>n.includeHidden||!f.hidden),r=u.filter(f=>nn(f,n.a)),c=u.filter(f=>nn(f,n.b));if(!r.length||!c.length)throw Error("Выборка А или Б пуста. Проверьте модели и условия.");let d=performance.now();const s=async()=>{if(a())throw Error("Расчёт отменён. Предыдущие результаты сохранены.");performance.now()-d>16&&(await new Promise(f=>setTimeout(f,0)),d=performance.now())},l=new Map,h=f=>{let m=l.get(f.id);return m||(m=R(f,Array.from({length:N(f)},(b,g)=>g)),l.set(f.id,m)),m},w=new Map,M=async f=>{let m=w.get(f.id);if(m!==void 0)return m;const b=[];for(let g=0;g<N(f);g++)b.push([0,3,6].map(H=>[0,1,2].map(p=>Math.round(L(f,g,H+p)/i)).join(",")).sort().join(";")),g%9e3===0&&await s();return m=b.sort().join("|"),w.set(f.id,m),m},x=[],S=new Set(r.map(f=>f.id)),T=new Set(c.map(f=>f.id)),G=U(c,c.map((f,m)=>m)),j=new Map;let Y=0;const on=f=>f.triangles.byteLength+(f.vertices?.byteLength||0)+(f.indices?.byteLength||0)+N(f)*32;async function rn(f,m){if(!o)return f;let b=j.get(f.id);if(b)return j.delete(f.id),j.set(f.id,b),b;for(const[g,H]of j)g!==m&&Y>96*1024*1024&&(j.delete(g),Y-=on(H),l.delete(g),w.delete(g));return b=await o(f.id),j.set(f.id,b),Y+=on(b),b}let sn=-1/0;for(let f=0;f<r.length;f++){const m=r[f];performance.now()-sn>150&&(sn=performance.now(),e({phase:"Проверка пар",done:f,total:r.length,found:x.length}));for(const b of C(G,m.bounds,i)){const g=c[b];if(await s(),m.id===g.id||!en(m.bounds,g.bounds,i)||n.ignoreSameModel&&m.modelId===g.modelId||n.ignoreSameGroup&&m.modelId===g.modelId&&m.properties.Объект&&m.properties.Объект===g.properties.Объект||n.equalProperty&&m.properties[n.equalProperty]!==void 0&&m.properties[n.equalProperty]===g.properties[n.equalProperty]||m.id>g.id&&S.has(g.id)&&T.has(m.id))continue;const H=an(m.id,g.id),p=await rn(m),_=await rn(g,m.id);let q,D="surface";if(n.type==="duplicates"){if(N(p)!==N(_)||p.bounds.min.some((z,E)=>Math.abs(z-_.bounds.min[E])>i||Math.abs(p.bounds.max[E]-_.bounds.max[E])>i))continue;await M(p)===await M(_)&&(q=p.bounds.min.map((z,E)=>(z+p.bounds.max[E])/2),D="duplicate")}else{const z=h(p),E=h(_);for(let P=0;P<N(p)&&!q;P++){const O=F(p,P),J=tn(O.flat());for(const K of C(E,J,i)){if(q=fn(O,F(_,K),i,n.touching),q)break;await s()}await s()}if(!q&&p.closed&&_.closed){const P=p.bounds.min.map((O,J)=>(O+p.bounds.max[J])/2);W(P,p,z,i)&&W(P,_,E,i)&&(q=P,D="contained")}if(!q){for(const[P,O,J]of[[p,_,E],[_,p,z]])if(O.closed){for(let K=0;K<N(P)&&!q;K++){const B=F(P,K),mn=B[0].map((Z,$)=>(B[0][$]+B[1][$]+B[2][$])/3);for(const Z of[B[0],mn])if(W(Z,O,J,i)){q=Z,D="contained";break}await s()}if(q)break}}}if(q&&(x.push({id:H,a:k(p),b:k(_),point:q,kind:D,state:"new",note:"",assignee:"",firstSeen:"",lastSeen:""}),x.length>=5e4))throw Error("Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат.")}}return e({phase:"Готово",done:r.length,total:r.length,found:x.length}),x}let ln=0;const X=new Map;self.onmessage=async t=>{if(t.data.request!==void 0){const n=X.get(t.data.request);X.delete(t.data.request),t.data.error?n?.reject(Error(t.data.error)):n?.resolve(t.data.geometry);return}try{const{elements:n,check:e}=t.data,a=await dn(n,e,o=>self.postMessage({progress:o}),()=>!1,t.data.streaming?o=>new Promise((i,u)=>{const r=ln++;X.set(r,{resolve:i,reject:u}),self.postMessage({load:o,request:r})}):void 0);self.postMessage({results:a})}catch(n){self.postMessage({error:n instanceof Error?n.message:String(n)})}}})();
`, be = typeof self < "u" && self.Blob && new Blob(["(self.URL || self.webkitURL).revokeObjectURL(self.location.href);", Me], { type: "text/javascript;charset=utf-8" });
function qe(e) {
  let t;
  try {
    if (t = be && (self.URL || self.webkitURL).createObjectURL(be), !t) throw "";
    const i = new Worker(t, {
      name: e?.name
    });
    return i.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(t);
    }), i;
  } catch {
    return new Worker(
      "data:text/javascript;charset=utf-8," + encodeURIComponent(Me),
      {
        name: e?.name
      }
    );
  }
}
const N = (e) => String(e ?? "").replace(
  /[&<>"']/g,
  (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[t]
);
function xe(e, t) {
  const i = URL.createObjectURL(
    new Blob([t], {
      type: e.endsWith(".html") ? "text/html;charset=utf-8" : "application/json;charset=utf-8"
    })
  ), n = document.createElement("a");
  n.href = i, n.download = e, n.click(), setTimeout(() => URL.revokeObjectURL(i), 6e4);
}
function Re(e, t) {
  const i = N;
  return `<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${i(e.name)}</title><style>body{font:14px/1.5 system-ui;margin:24px;background:#171c23;color:#e6edf5}h1{margin:0}small{color:#a9b7c8}input,select{padding:10px;margin:15px 8px 15px 0;max-width:100%;background:#242e3b;color:inherit;border:1px solid #506074;border-radius:6px}.wrap{overflow:auto}table{border-collapse:separate;border-spacing:0;width:100%}td,th{padding:10px;border-bottom:1px solid #39475a;min-width:100px;vertical-align:top;overflow-wrap:anywhere}th{background:#253142;position:sticky;top:0;text-align:left;white-space:normal}td{max-width:350px}tr[hidden]{display:none}.shot{display:block;width:260px;border:0;background:transparent;padding:0;cursor:zoom-in}dialog{width:min(94vw,1400px);border:1px solid #506074;background:#20242b;color:white;border-radius:10px}dialog img{max-width:100%;max-height:80vh;display:block;margin:12px auto}dialog::backdrop{background:#000b}.shot img{width:100%;border-radius:6px}.legend{margin:12px 0}.red{color:#ff6161}.blue{color:#65baff}@media print{input,select{display:none}body{background:white;color:black}.wrap{overflow:visible}th{position:static;background:#eee}}</style><h1>${i(e.name)}</h1><small>НашеПО · Проверки коллизий · ${i(e.lastRun || "")} · ${e.status === "stale" ? "Результат устарел" : "Последний завершённый расчёт"}</small><p>${i(e.type === "duplicates" ? "Совпадение треугольной геометрии" : "Пересечения поверхностей и вложенность замкнутых тел")}. Точность: ${i(e.precision)} мм.</p><p class="legend"><span class="red">● Элемент А — красный</span> · <span class="blue">● Элемент Б — синий</span></p><input id="search" type="search" placeholder="Поиск по всему отчёту"><select id="state"><option value="">Все состояния</option>${Object.entries(
    X
  ).map(([n, a]) => `<option value="${n}">${a}</option>`).join(
    ""
  )}</select><span id="count"></span><div class="wrap"><table><thead><tr>${["Снимок", "№", "Состояние", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "X", "Y", "Z", "Назначение", "Комментарий"].map((n) => `<th>${n}</th>`).join("")}</tr></thead><tbody>${t.map((n, a) => `<tr data-state="${n.state}"><td>${se(n.image) ? `<button class="shot" type="button"><img src="${n.image}" alt="Снимок конфликта ${a + 1}" loading="lazy"></button>` : "Снимок отсутствует"}</td>${[a + 1, X[n.state], n.a.name, n.a.model, n.a.guid, n.b.name, n.b.model, n.b.guid, ...n.point.map((r) => r.toFixed(4)), n.assignee, n.note].map((r) => `<td>${i(r)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><dialog id="picture"><button id="close-picture">Закрыть</button><img id="full-picture" alt="Снимок конфликта"></dialog><script>const modal=document.getElementById("picture");document.getElementById("close-picture").onclick=()=>modal.close();for(const b of document.querySelectorAll(".shot"))b.onclick=()=>{document.getElementById("full-picture").src=b.querySelector("img").src;modal.showModal()};const q=document.getElementById('search'),s=document.getElementById('state'),rows=[...document.querySelectorAll('tbody tr')];function filter(){let n=0;for(const r of rows){r.hidden=!!((s.value&&r.dataset.state!==s.value)||!r.textContent.toLowerCase().includes(q.value.toLowerCase()));if(!r.hidden)n++}document.getElementById('count').textContent='Коллизий: '+n}q.oninput=s.onchange=filter;filter()<\/script></html>`;
}
function Ue(e, t) {
  return JSON.stringify(
    {
      version: 1,
      id: e.id,
      name: e.name,
      images: Object.fromEntries(
        t.filter((i) => se(i.image)).map((i) => [i.id + ".jpg", i.image])
      ),
      warnings: e.warnings,
      tests: [
        {
          id: e.id,
          name: e.name,
          clashes: t.map((i, n) => ({
            id: i.id,
            name: `Конфликт ${n + 1}`,
            distance: "",
            date: e.lastRun || "",
            description: e.type === "duplicates" ? "Дублирование" : "По пересечению",
            status: X[i.state],
            group: i.assignee,
            note: i.note,
            point: i.point,
            image: se(i.image) ? i.id + ".jpg" : "",
            enabled: i.state !== "resolved",
            reviewed: i.state === "resolved" || i.state === "reviewed" || i.state === "approved",
            excluded: i.state === "excluded",
            elements: [i.a, i.b].map((a) => ({
              guid: a.guid,
              id: a.id,
              source: a.model,
              name: a.name,
              properties: a.properties
            })),
            properties: { Проверка: e.name, Вид: i.kind }
          }))
        }
      ]
    },
    null,
    2
  );
}
const Be = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAydpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAzIDc5Ljk2OTBhODdmYywgMjAyNS8wMy8wNi0yMDo1MDoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDZFQkU2NEQ4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDZFQkU2NEM4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI2LjExIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRENDVBNjQzODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRENDVBNjQ0ODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+pHX+ogAAD+lJREFUeNrs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", De = ":host{display:block;height:100%;color-scheme:dark;font:13px/1.4 Segoe UI,sans-serif;color:#dbe5f0;container-type:size}*{box-sizing:border-box}[hidden]{display:none!important}main{height:100%;min-height:260px;background:#171d25;display:flex;flex-direction:column;overflow:hidden}button,input,select,textarea{font:inherit;color:inherit;border:1px solid #425165;border-radius:6px;background:#253140;padding:7px 9px;min-width:0}button{cursor:pointer;white-space:nowrap}button:hover{background:#354459}button:disabled{opacity:.45;cursor:default}.primary{background:#b99a38;border-color:#d0ae46;color:#111820;font-weight:600}.primary:hover{background:#e0bd51}button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid #f2c94c;outline-offset:1px}input,select,textarea{background:#111a24}input[type=checkbox]{accent-color:#e6c354;width:16px;height:16px}header{display:flex;gap:7px;align-items:center;padding:8px 12px;border-bottom:1px solid #354459;flex-shrink:0;overflow-x:auto}.brand{display:flex;gap:7px;align-items:center;margin-right:8px}.brand img{width:32px;height:32px;object-fit:contain}.brand b{font-size:17px}.brand small{font-size:10px;color:#a6b5c7}#dirty{margin-left:auto;font-size:11px;color:#cabb81;white-space:nowrap}.notice{background:#1c2735;padding:5px 12px;font-size:12px;min-height:27px;max-height:70px;overflow:auto;color:#a7bbd1}.notice.error{color:#ffaaa1;background:#412725}.workspace{display:grid;grid-template-columns:230px minmax(0,1fr);flex:1;min-height:0}aside{padding:10px;display:flex;flex-direction:column;gap:9px;border-right:1px solid #354459;min-height:0}#checks{overflow:auto;flex:1;min-height:0}.check-item{display:flex;flex-direction:column;gap:5px;width:100%;margin-bottom:5px;text-align:left;white-space:normal}.check-item small{color:#a8b7ca}.check-item.active,.tabs .active{border-color:#c7ab56;background:#403b2c;color:#ffe399}.main{display:flex;flex-direction:column;min-width:0;min-height:0}.test-toolbar{display:flex;gap:7px;padding:8px 12px;align-items:center}.test-toolbar input{flex:1;font-weight:600}.tabs{display:flex;gap:7px;border-bottom:1px solid #354459;padding:0 12px 8px}.tabs button{min-width:105px}#content{flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column}.empty{padding:28px;color:#a4b4c9;text-align:center;margin:auto}h2,h3,p{margin:0 0 10px}h2{font-size:20px}h3{font-size:15px}label{display:flex;flex-direction:column;gap:5px;font-size:12px;color:#b8c6d7}.check{flex-direction:row;align-items:center;gap:6px}small{font-size:11px;color:#a8b7c9}.parameters{display:flex;gap:18px;align-items:end;padding:10px 12px}.parameters input{width:140px}.selection-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0 12px 12px}.selection{border:1px solid #39495e;border-radius:8px;padding:12px;background:#1b2633;min-width:0}.selection h3{display:flex;justify-content:space-between}.selection h3 span{color:#92c4b2;font-size:12px}.selection select[multiple]{width:100%;min-height:70px}.selection-tools{display:flex;gap:5px;flex-wrap:wrap;margin:8px 0}.selection-tools button{font-size:11px;padding:5px 7px}.selection>label{margin-bottom:8px}.condition{display:grid;grid-template-columns:minmax(80px,1fr) 100px minmax(70px,1fr) 29px;gap:5px;margin:6px 0}.condition button{padding:3px}.rules,.report{padding:18px;max-width:850px}.rules>label{margin:14px 0}.rules>p,.report>p{color:#a9b8cb}.report>button{margin:12px 8px 14px 0}.result-tools{display:flex;gap:7px;flex-wrap:wrap;padding:8px 12px}.result-tools input{flex:1;min-width:180px}.result-area{display:grid;grid-template-columns:minmax(0,1fr) 300px;flex:1;min-height:0}.table-area{display:flex;flex-direction:column;min-width:0;min-height:0}.scroll{overflow:auto;flex:1;min-height:0}table{border-collapse:separate;border-spacing:0;width:max-content;min-width:100%}th{position:sticky;top:0;background:#2a3748;z-index:1;text-align:left;max-width:240px;white-space:normal}th,td{padding:8px;border-bottom:1px solid #344154;vertical-align:top}td{max-width:320px;min-width:90px;overflow-wrap:anywhere;-webkit-user-select:text;user-select:text}td:first-child{min-width:36px}tr.active td{background:#453e29;color:#fff0b5}tr:hover td{background:#2c3847}.pager{display:flex;gap:10px;align-items:center;justify-content:center;padding:5px;border-top:1px solid #39495e;font-size:11px}.pager button{padding:2px 8px}.detail{border-left:1px solid #354459;padding:10px;overflow:auto}.detail h3{overflow-wrap:anywhere}.detail>label{margin:10px 0}.detail p{font:11px/1.5 Consolas,monospace}.detail details{border-top:1px solid #354459;padding:8px 0}summary{cursor:pointer}dl{font-size:11px;display:grid;grid-template-columns:1fr 1fr;gap:7px}dt,dd{overflow-wrap:anywhere;margin:0}dt{color:#9baec4}footer{border-top:1px solid #354459;padding:4px 12px;display:flex;justify-content:space-between;color:#91a4bb;font-size:11px}dialog{border:1px solid #53647c;border-radius:12px;background:#202c3a;color:#dbe5f0;width:min(700px,92vw);max-height:85vh;padding:20px;box-shadow:0 15px 60px #000a}dialog::backdrop{background:#000a}dialog p{margin:12px 0}dialog a{color:#f2c94c;margin-right:12px}@container (max-width:950px){.workspace{grid-template-columns:185px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 240px}.selection-grid{grid-template-columns:1fr}.parameters,.test-toolbar{flex-wrap:wrap}.test-toolbar input{flex-basis:100%}}@container (max-height:400px){header{padding:5px 10px}.test-toolbar{padding:5px 10px}.tabs{padding-bottom:5px}.brand img{width:25px;height:25px}footer{display:none}}:host{font-size:14px}.brand img{background:#e1e7ef;border-radius:5px;padding:3px}.selection-tools button{font-size:12px}label{font-size:13px}.choose-layout{display:grid;grid-template-columns:220px minmax(0,1fr);min-height:0;flex:1;overflow:auto}.choose-layout .parameters{display:flex;flex-direction:column;align-items:stretch;gap:15px;border-right:1px solid #354459;justify-content:flex-start}.choose-layout .parameters input{width:100%}.choose-layout .parameters input[type=checkbox]{width:16px}.choose-layout .selection-grid{padding:10px 12px;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start;min-width:0}.selection select[multiple]{height:180px;resize:vertical}.selection-mode{font-size:12px;color:#b6c4d5}.legend{display:flex;gap:12px;flex-wrap:wrap;font-family:inherit!important}.part-a{color:#ff6161}.part-b{color:#65baff}.preview{display:block;width:100%;padding:5px;margin:8px 0}.preview img{display:block;width:100%;max-height:180px;object-fit:contain}.image-dialog{width:94vw;max-width:1500px}.image-dialog img{display:block;max-width:100%;max-height:75vh;margin:10px auto}#help-dialog{width:min(1000px,94vw);line-height:1.6}#help-dialog details{padding:12px 0;border-bottom:1px solid #425165}#help-dialog summary{font-size:16px;font-weight:600;color:#f0d27a}#help-dialog li{margin:8px 0}@container (max-width:1100px){.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .selection-grid{grid-template-columns:1fr}.condition{grid-template-columns:minmax(60px,1fr) 100px minmax(60px,1fr) 29px}}@container (max-width:700px){.choose-layout{display:block}.choose-layout .parameters{border-right:0;border-bottom:1px solid #354459}.workspace{grid-template-columns:160px minmax(0,1fr)}}", P = { format: "nashepo.checks", version: 1, checks: [] };
function Ye(e, t) {
  const i = e.shadowRoot || e.attachShadow({ mode: "open" });
  let n, a = P.checks[0]?.id || "", r = "select", f = "", d = 0, m = !1, u = !1, c, b = !0, w = !1;
  const v = /* @__PURE__ */ new Set();
  let M;
  const x = () => P.checks.find((o) => o.id === a), p = (o) => i.querySelector("#" + o);
  i.innerHTML = `<style>${De}</style><main><header><div class="brand"><img src="${Be}" alt=""><b>НашеПО</b><small>${Se}</small></div><button id="scan">Обновить модели</button><button id="new" class="primary">＋ Проверка</button><button id="open">Открыть проверки</button><button id="save">Сохранить проверки</button><button id="settings">⚙</button><button id="help">Справка</button><span id="dirty"></span></header><div class="notice" id="notice" role="status">Откройте IFC/SMDX в проекте и нажмите «Обновить модели».</div><div class="workspace"><aside><input id="test-search" type="search" placeholder="Поиск проверок"><div id="checks"></div><button id="all">Запустить все</button></aside><section class="main"><div class="test-toolbar"><input id="name" aria-label="Имя проверки" placeholder="Имя проверки"><button id="copy">Копировать</button><button id="delete">Удалить</button><button id="run" class="primary">▶ Запустить</button><button id="cancel" hidden>Остановить</button></div><div id="tabs" class="tabs">${[
    ["rules", "Правила"],
    ["select", "Выбрать"],
    ["results", "Результаты"],
    ["report", "Отчёт"]
  ].map(([o, s]) => `<button data-tab="${o}">${s}</button>`).join(
    ""
  )}</div><div id="content"></div></section></div><footer><span id="model-count">Модели не прочитаны</span><span>Расчёт выполняется на вашем компьютере</span></footer><input id="file" type="file" accept=".json" hidden><dialog id="settings-dialog"><h2>Настройки</h2><label>Дистанция камеры, м<input id="distance" type="number" value="15" min="0.5"></label><p class="links"><a href="https://nashepo.ru/" target="_blank" rel="noopener noreferrer">Сайт НашеПО</a><a href="https://t.me/RoburFan" target="_blank" rel="noopener noreferrer">Telegram</a></p><button data-close="settings-dialog">Закрыть</button></dialog><dialog id="help-dialog">${je}<button data-close="help-dialog">Закрыть</button></dialog></main>`;
  const O = (o, s = !1) => {
    p("notice").textContent = o, p("notice").classList.toggle("error", s);
  }, B = async (o) => {
    try {
      await o();
    } catch (s) {
      O(s instanceof Error ? s.message : String(s), !0);
    }
  }, A = () => {
    w = !0, p("dirty").textContent = "Есть несохранённые изменения";
  }, J = () => {
    const o = x();
    o?.lastRun && (o.status = "stale"), A(), g();
  }, W = () => [
    ...new Set(
      (n?.elements || []).flatMap((o) => Object.keys(o.properties))
    )
  ].sort(), T = (o, s) => o.map(
    (l) => `<option value="${N(l)}" ${l === s ? "selected" : ""}>${N(l)}</option>`
  ).join("");
  function V() {
    const o = x(), s = p("result-search")?.value.toLowerCase() || "", l = p("result-state")?.value || "";
    return (o?.results || []).filter(
      (h) => (!l || h.state === l) && (!s || JSON.stringify({ ...h, image: void 0 }).toLowerCase().includes(s))
    );
  }
  function g() {
    const o = p("test-search").value.toLowerCase();
    p("checks").innerHTML = P.checks.filter((s) => s.name.toLowerCase().includes(o)).map(
      (s) => `<button class="check-item ${s.id === a ? "active" : ""}" data-check="${s.id}"><strong>${N(s.name)}</strong><small>${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[s.status]} · ${s.results.filter((l) => !["resolved", "excluded"].includes(l.state)).length} в работе / ${s.results.length}</small></button>`
    ).join("");
  }
  function E(o, s) {
    const l = n?.elements.filter(
      (h) => (x().includeHidden || !h.hidden) && re(h, o)
    ).length || 0;
    return `<article class="selection" data-side="${s}"><h3>Выбор ${s.toUpperCase()} <span>${l} элементов</span></h3><p class="selection-mode">${o.manualOnly ? "Ручная выборка — только указанные элементы" : "Автоматическая выборка — модели и условия"}</p><label>Модели (Ctrl — несколько; без выбора — все)<select multiple size="8" class="models">${(n?.models || []).map((h) => `<option value="${N(h.id)}" ${o.models.includes(h.id) ? "selected" : ""}>${N(h.name)}</option>`).join("")}</select></label><div class="selection-tools"><button data-selection="show">Показать выборку</button><button data-selection="only">Только выделенные</button><button data-selection="include">＋ Добавить выделенные</button><button data-selection="exclude">− Исключить выделенные</button><button data-selection="reset">Вернуть автоматический выбор</button></div><small>Добавлено вручную: ${o.include.length} · исключено: ${o.exclude.length}</small><label>Условия<select class="mode"><option value="all" ${o.mode === "all" ? "selected" : ""}>Выполнены все (И)</option><option value="any" ${o.mode === "any" ? "selected" : ""}>Выполнено любое (ИЛИ)</option></select></label><div class="conditions">${o.conditions.map(
      (h, k) => `<div class="condition" data-condition="${k}"><input class="field" list="property-fields" value="${N(h.field)}" placeholder="Свойство"><select class="op">${[
        ["eq", "равно"],
        ["contains", "содержит"],
        ["ne", "не равно"],
        ["exists", "существует"],
        ["gt", "больше"],
        ["lt", "меньше"]
      ].map(
        ([j, y]) => `<option value="${j}" ${h.op === j ? "selected" : ""}>${y}</option>`
      ).join(
        ""
      )}</select><input class="value" value="${N(h.value)}" placeholder="Значение" ${h.op === "exists" ? "disabled" : ""}><button data-remove="${k}" aria-label="Удалить условие">×</button></div>`
    ).join(
      ""
    )}</div><button data-selection="add">＋ Условие</button></article>`;
  }
  function C() {
    g();
    const o = x();
    p("name").value = o?.name || "";
    for (const s of ["name", "copy", "delete", "run"])
      p(s).disabled = !o || m;
    for (const s of i.querySelectorAll("[data-tab]"))
      s.classList.toggle("active", s.dataset.tab === r);
    if (!o) {
      p("content").innerHTML = '<div class="empty"><h2>Создайте первую проверку</h2><p>Обновите модели, затем выберите, какие элементы проверять друг с другом.</p></div>';
      return;
    }
    r === "select" && (p("content").innerHTML = `<div class="choose-layout"><div class="parameters"><h3>Параметры проверки</h3><label>Тип<select id="type"><option value="intersection" ${o.type === "intersection" ? "selected" : ""}>По пересечению</option><option value="duplicates" ${o.type === "duplicates" ? "selected" : ""}>Дублирование</option></select></label><label title="Числовая точность; не глубина проникновения">Точность расчёта, мм<input id="precision" type="number" value="${o.precision}" min="0.001" max="100" step="0.1"></label><label class="check"><input id="touching" type="checkbox" ${o.touching ? "checked" : ""} ${o.type === "duplicates" ? "disabled" : ""}>Учитывать касания</label><small>Касание — соприкосновение поверхностей без проникновения. Обычно выключено.</small><p class="legend"><span class="part-a">● А — красный</span><span class="part-b">● Б — синий</span></p></div><div class="selection-grid">${E(o.a, "a")}${E(o.b, "b")}</div></div><datalist id="property-fields">${T(W(), "")}</datalist>`), r === "rules" && (p("content").innerHTML = `<div class="rules"><h3>Исключение пар</h3><p>Элемент сам с собой не проверяется. Пара А/Б учитывается один раз.</p><label class="check"><input id="same-model" type="checkbox" ${o.ignoreSameModel ? "checked" : ""}>Не проверять элементы одной модели</label><label class="check"><input id="same-group" type="checkbox" ${o.ignoreSameGroup ? "checked" : ""}>Не проверять геометрию одного составного объекта</label><label>Не проверять пары с одинаковым значением свойства<input id="equal-property" list="property-fields" value="${N(o.equalProperty)}" placeholder="Без ограничения"></label><label class="check"><input id="hidden" type="checkbox" ${o.includeHidden ? "checked" : ""}>Включать скрытые элементы прочитанных моделей</label><p>Незагруженные подключённые файлы нужно открыть перед расчётом.</p><datalist id="property-fields">${T(W(), "")}</datalist></div>`), r === "results" && (p("content").innerHTML = `<div class="result-tools"><input id="result-search" type="search" placeholder="Поиск по результатам"><select id="result-state"><option value="">Все состояния</option>${Object.entries(
      X
    ).map(([s, l]) => `<option value="${s}">${l}</option>`).join(
      ""
    )}</select><button id="show-markers" role="switch" aria-checked="${b}">${b ? "● Знаки включены" : "○ Знаки выключены"}</button><select id="bulk-state">${Object.entries(
      X
    ).map(([s, l]) => `<option value="${s}">${l}</option>`).join(
      ""
    )}</select><button id="bulk">Применить к выбранным</button></div><div class="result-area"><div class="table-area"><div class="scroll" id="table"></div><div class="pager"><button id="prev-page">←</button><span id="page"></span><button id="next-page">→</button><span id="selection-count"></span></div></div><div class="detail" id="detail"></div></div>`, S(), G()), r === "report" && (p("content").innerHTML = `<div class="report"><h3>${N(o.name)}</h3><p>Результатов: ${o.results.length}. Выбрано: ${v.size}. ${o.status === "stale" ? "Результаты устарели — рекомендуется повторный запуск." : ""}</p><label class="check"><input id="selected-only" type="checkbox" ${v.size ? "checked" : ""}>Только выбранные строки</label><label class="check"><input id="report-images" type="checkbox" checked>Добавить снимки (недостающие будут созданы автоматически)</label><button id="export-html" class="primary">Сформировать HTML-отчёт</button><button id="export-viewer">Сессия для плагина «Коллизии»</button><p>Правила и все результаты сохраняются кнопкой «Сохранить проверки» в верхней панели.</p></div>`), p("content").inert = m;
  }
  function S() {
    const o = V(), s = Math.max(1, Math.ceil(o.length / 50));
    d = Math.max(0, Math.min(d, s - 1));
    const l = o.slice(d * 50, d * 50 + 50);
    p("table").innerHTML = o.length ? `<table><thead><tr><th><input id="check-page" type="checkbox" aria-label="Выбрать страницу" ${l.every((h) => v.has(h.id)) ? "checked" : ""}></th>${["№", "Состояние", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "Комментарий"].map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${l.map((h, k) => `<tr data-result="${N(h.id)}" class="${h.id === f ? "active" : ""}"><td><input type="checkbox" class="row-check" aria-label="Выбрать конфликт" ${v.has(h.id) ? "checked" : ""}></td>${[d * 50 + k + 1, X[h.state], h.a.name, h.a.model, h.a.guid || "—", h.b.name, h.b.model, h.b.guid || "—", h.note].map((j) => `<td title="${N(j)}">${N(j)}</td>`).join("")}</tr>`).join("")}</tbody></table>` : '<div class="empty">Нет результатов. Запустите проверку или измените фильтры.</div>', p("page").textContent = `Страница ${d + 1} из ${s} · ${o.length} результатов`, p("selection-count").textContent = `Выбрано: ${v.size}`, p("prev-page").disabled = d === 0, p("next-page").disabled = d === s - 1;
  }
  function G() {
    const o = x()?.results.find((s) => s.id === f);
    p("detail").innerHTML = o ? `<h3>${N(o.a.name)} × ${N(o.b.name)}</h3><p class="legend"><span class="part-a">● А — красный</span><span class="part-b">● Б — синий</span></p>${o.image ? `<button id="open-image" class="preview"><img src="${N(o.image)}" alt="Снимок коллизии"><span>Открыть крупнее</span></button>` : ""}<button id="capture-image">Сохранить текущий ракурс</button><div class="selection-tools"><button id="focus" class="primary">Перейти в 3D</button><button id="previous">←</button><button id="next">→</button></div><p>${o.point.map((s, l) => `${["X", "Y", "Z"][l]}: ${s.toFixed(4)}`).join(" · ")}</p><label>Состояние<select id="edit-state">${Object.entries(
      X
    ).map(
      ([s, l]) => `<option value="${s}" ${o.state === s ? "selected" : ""}>${l}</option>`
    ).join(
      ""
    )}</select></label><label>Назначение<input id="assignee" value="${N(o.assignee)}"></label><label>Комментарий<textarea id="note" rows="3">${N(o.note)}</textarea></label>${[
      o.a,
      o.b
    ].map(
      (s, l) => `<details><summary>Элемент ${l ? "Б" : "А"} · свойства</summary><dl>${Object.entries(
        s.properties
      ).map(([h, k]) => `<dt>${N(h)}</dt><dd>${N(k)}</dd>`).join("")}</dl></details>`
    ).join("")}` : "<p>Выберите конфликт в таблице.</p>";
  }
  function L() {
    t.markers(
      V(),
      f,
      b,
      (o) => B(() => $(o, !0))
    );
  }
  function $(o, s = !1) {
    if (!m) {
      if (f = o, r === "results") {
        for (const l of i.querySelectorAll("[data-result]"))
          l.classList.toggle("active", l.dataset.result === o);
        G();
      }
      if (L(), s) {
        const l = x()?.results.find((h) => h.id === o);
        l && t.focus(l, Number(p("distance").value));
      }
    }
  }
  async function z() {
    n = await t.scan(O, () => u), p("model-count").textContent = `Моделей: ${n.models.length} · элементов: ${n.elements.length}`;
    for (const o of P.checks)
      o.fingerprint && o.fingerprint !== n.fingerprint && (o.status = "stale");
    C(), O(
      n.warnings.length ? n.warnings.join(" ") : "Модели прочитаны. Настройте выборки и запустите проверку.",
      !!n.warnings.length
    );
  }
  const q = (o) => {
    m = o;
    for (const s of [
      "new",
      "scan",
      "open",
      "all",
      "copy",
      "delete",
      "name",
      "run",
      "save"
    ])
      p(s).disabled = o;
    p("cancel").hidden = !o, p("content").inert = o, p("checks").inert = o;
  };
  async function Q(o) {
    const s = (h) => O(`${o.name} · ${h.phase} ${h.done}/${h.total} · найдено ${h.found}`);
    let l;
    try {
      l = new qe();
    } catch {
      return Ne(
        n.elements,
        o,
        s,
        () => u,
        (h) => t.geometry(h, () => u)
      );
    }
    return c = l, new Promise((h, k) => {
      const j = () => {
        l.terminate(), c = void 0, M = void 0;
      };
      M = () => {
        j(), k(Error("Расчёт отменён. Предыдущие результаты сохранены."));
      }, l.onmessage = async (y) => {
        if (y.data.load) {
          try {
            const I = await t.geometry(
              y.data.load,
              () => u || c !== l
            );
            if (c !== l) return;
            const F = [
              I.vertices?.buffer,
              I.indices?.buffer
            ].filter(Boolean);
            l.postMessage(
              { request: y.data.request, geometry: I },
              F
            );
          } catch (I) {
            c === l && l.postMessage({
              request: y.data.request,
              error: I instanceof Error ? I.message : String(I)
            });
          }
          return;
        }
        y.data.progress ? s(y.data.progress) : (j(), y.data.error ? k(Error(y.data.error)) : h(y.data.results));
      }, l.onerror = (y) => {
        j(), k(
          Error(
            `Не удалось запустить расчёт в фоновом потоке: ${y.message || "ошибка загрузки"}`
          )
        );
      }, l.postMessage({
        elements: n.elements,
        streaming: typeof t.geometry == "function",
        check: structuredClone({ ...o, results: [], warnings: [] })
      });
    });
  }
  async function D(o = !1) {
    if (m) return;
    const s = o ? [...P.checks] : [x()].filter(Boolean);
    if (!s.length) throw Error("Создайте проверку.");
    u = !1, q(!0);
    try {
      if (await z(), q(!0), n.warnings.length)
        throw Error(
          "Состав моделей прочитан не полностью. " + n.warnings.join(" ")
        );
      for (const l of s) {
        if (u) break;
        for (const y of [l.a, l.b]) {
          if (y.models.some((I) => !n.models.some((F) => F.id === I)))
            throw Error(
              `${l.name}: одна из моделей выборки отсутствует. Исправьте выборку.`
            );
          if (y.include.some((I) => !n.elements.some((F) => F.id === I)))
            throw Error(
              `${l.name}: вручную добавленный элемент отсутствует в модели.`
            );
        }
        const h = Ee(l);
        if (l.configAtRun === h && l.modelsAtRun?.some(
          (y) => !n.models.some((I) => I.id === y)
        ))
          throw Error(
            `${l.name}: состав моделей уменьшился. Подключите прежние модели или создайте копию проверки для нового состава. Прежние результаты сохранены.`
          );
        const k = await Q(l);
        if (u || !t.isCurrent())
          throw Error(
            "Проект изменился или расчёт отменён. Предыдущие результаты сохранены."
          );
        const j = (/* @__PURE__ */ new Date()).toISOString();
        l.results = Oe(
          l.configAtRun === h ? l.results : [],
          k,
          j
        ), l.lastRun = j, l.fingerprint = n.fingerprint, l.configAtRun = h, l.modelsAtRun = n.models.map((y) => y.id), l.status = "done", l.warnings = [], a = l.id, f = l.results[0]?.id || "", v.clear(), A();
      }
      r = "results", C(), L(), O(
        `Проверка завершена. ${x()?.results.length || 0} результатов. Сохраните проверки для продолжения работы.`
      );
    } finally {
      q(!1), C();
    }
  }
  function Y(o) {
    const s = o.closest("[data-side]")?.dataset.side;
    if (!s) return;
    const l = x()[s], h = o.closest("[data-condition]")?.dataset.condition, k = o;
    if (k.classList.contains("models") && (l.manualOnly = !1), k.classList.contains("models") && (l.models = Array.from(o.selectedOptions).map(
      (j) => j.value
    )), k.classList.contains("mode") && (l.mode = k.value), h !== void 0) {
      const j = l.conditions[Number(h)];
      k.classList.contains("field") && (j.field = k.value), k.classList.contains("op") && (j.op = k.value), k.classList.contains("value") && (j.value = k.value);
    }
    J(), C();
  }
  p("new").onclick = () => {
    const o = Ie();
    o.name = `Проверка ${P.checks.length + 1}`, P.checks.push(o), a = o.id, r = "select", f = "", v.clear(), A(), C();
  }, p("scan").onclick = () => B(async () => {
    u = !1, q(!0);
    try {
      await z();
    } finally {
      q(!1), C();
    }
  }), p("run").onclick = () => B(() => D()), p("all").onclick = () => B(() => D(!0)), p("cancel").onclick = () => {
    u = !0, M?.();
  }, p("test-search").oninput = g, p("checks").onclick = (o) => {
    const s = o.target.closest(
      "[data-check]"
    );
    s && !m && (t.clear(), a = s.dataset.check, f = "", v.clear(), d = 0, C());
  }, p("tabs").onclick = (o) => {
    const s = o.target.closest("[data-tab]");
    s && !m && (r = s.dataset.tab, C());
  }, p("name").onchange = () => {
    const o = x();
    o && (o.name = p("name").value.trim() || "Проверка", A(), g());
  }, p("copy").onclick = () => {
    const o = x();
    if (!o) return;
    const s = structuredClone(o);
    Object.assign(s, {
      id: crypto.randomUUID(),
      name: o.name + " — копия",
      results: [],
      lastRun: void 0,
      fingerprint: void 0,
      configAtRun: void 0,
      status: "new"
    }), P.checks.push(s), a = s.id, f = "", v.clear(), A(), C();
  }, p("delete").onclick = () => {
    x() && confirm(`Удалить проверку «${x().name}» и её результаты?`) && (P.checks = P.checks.filter((o) => o.id !== a), a = P.checks[0]?.id || "", v.clear(), t.clear(), A(), C());
  }, p("save").onclick = () => {
    xe("НашеПО-проверки.json", JSON.stringify(P, null, 2)), w = !1, p("dirty").textContent = "Файл проверок сохранён";
  }, p("open").onclick = () => p("file").click(), p("file").onchange = () => B(async () => {
    const o = p("file").files?.[0];
    if (!o) return;
    const s = Ae(await o.text());
    w && !confirm("Заменить текущие несохранённые проверки данными из файла?") || (P.checks = s.checks, a = P.checks[0]?.id || "", f = "", v.clear(), t.clear(), w = !1, p("dirty").textContent = "Проверки открыты", C(), O("Проверки открыты. Обновите модели перед переходом к элементам."), p("file").value = "");
  });
  for (const o of ["settings", "help"])
    p(o).onclick = () => p(o + "-dialog").showModal();
  for (const o of i.querySelectorAll("[data-close]"))
    o.onclick = () => p(o.dataset.close).close();
  p("content").onchange = (o) => B(() => {
    const s = o.target, l = x();
    if (!l) return;
    if (s.closest("[data-side]")) {
      Y(s);
      return;
    }
    if ([
      "type",
      "precision",
      "touching",
      "same-model",
      "same-group",
      "hidden",
      "equal-property"
    ].includes(s.id)) {
      if (s.id === "precision") {
        const k = Number(s.value);
        if (!Number.isFinite(k) || k < 1e-3 || k > 100)
          throw s.value = String(l.precision), Error("Точность должна быть от 0,001 до 100 мм.");
        l.precision = k;
      }
      s.id === "type" && (l.type = s.value), s.id === "touching" && (l.touching = s.checked), s.id === "same-model" && (l.ignoreSameModel = s.checked), s.id === "same-group" && (l.ignoreSameGroup = s.checked), s.id === "hidden" && (l.includeHidden = s.checked), s.id === "equal-property" && (l.equalProperty = s.value), J(), C();
      return;
    }
    if (s.id === "result-state") {
      d = 0, S();
      return;
    }
    if (s.id === "check-page") {
      for (const k of V().slice(d * 50, d * 50 + 50))
        s.checked ? v.add(k.id) : v.delete(k.id);
      S();
      return;
    }
    if (s.classList.contains("row-check")) {
      const k = s.closest("[data-result]").dataset.result;
      s.checked ? v.add(k) : v.delete(k), p("selection-count").textContent = `Выбрано: ${v.size}`;
      return;
    }
    const h = l.results.find((k) => k.id === f);
    h && (s.id === "edit-state" && (h.state = s.value, S(), g(), L()), s.id === "assignee" && (h.assignee = s.value), s.id === "note" && (h.note = s.value, S()), A());
  }), p("content").oninput = (o) => {
    o.target.id === "result-search" && (d = 0, S());
  }, p("content").onclick = (o) => B(async () => {
    const s = o.target, l = s.closest("button"), h = x();
    if (!h) return;
    if (l?.dataset.selection || l?.dataset.remove !== void 0) {
      const j = l.closest("[data-side]").dataset.side, y = h[j];
      if (l.dataset.remove !== void 0)
        y.conditions.splice(Number(l.dataset.remove), 1);
      else
        switch (l.dataset.selection) {
          case "add":
            y.conditions.push({ field: "Имя", op: "contains", value: "" });
            break;
          case "show":
            t.select(
              (n?.elements || []).filter(
                (I) => (h.includeHidden || !I.hidden) && re(I, y)
              ).map((I) => I.id)
            );
            return;
          case "only": {
            const I = t.selected();
            if (!I.length) throw Error("Выделите элементы в 3D-сцене.");
            y.include = I, y.exclude = [], y.manualOnly = !0;
            break;
          }
          case "include": {
            const I = t.selected();
            if (!I.length) throw Error("Выделите элементы в 3D-сцене.");
            y.include = [.../* @__PURE__ */ new Set([...y.include, ...I])], y.exclude = y.exclude.filter((F) => !I.includes(F));
            break;
          }
          case "exclude": {
            const I = t.selected();
            if (!I.length) throw Error("Выделите элементы в 3D-сцене.");
            y.exclude = [.../* @__PURE__ */ new Set([...y.exclude, ...I])], y.include = y.include.filter((F) => !I.includes(F));
            break;
          }
          case "reset":
            y.manualOnly = !1, y.include = [], y.exclude = [];
        }
      J(), C();
      return;
    }
    if (l?.id === "prev-page" && (d--, S()), l?.id === "next-page" && (d++, S()), l?.id === "show-markers" && (b = !b, l.textContent = b ? "● Знаки включены" : "○ Знаки выключены", l.setAttribute("aria-checked", String(b)), L()), l?.id === "bulk") {
      const j = p("bulk-state").value;
      for (const y of h.results) v.has(y.id) && (y.state = j);
      A(), S(), G(), g(), L();
    }
    if (l?.id === "capture-image") {
      const j = h.results.find((y) => y.id === f);
      if (j) {
        u = !1, q(!0);
        try {
          j.image = await t.snapshot(
            j,
            Number(p("distance").value),
            () => u,
            !0
          ), A(), G(), O("Снимок сохранён в результат.");
        } finally {
          q(!1);
        }
      }
      return;
    }
    if (l?.id === "open-image") {
      const j = h.results.find((y) => y.id === f);
      if (j?.image) {
        const y = document.createElement("dialog");
        y.className = "image-dialog", y.innerHTML = '<button>Закрыть</button><img alt="Снимок коллизии">', y.querySelector("img").src = j.image, y.querySelector("button").onclick = () => {
          y.close(), y.remove();
        }, i.append(y), y.showModal();
      }
      return;
    }
    if (l?.id === "focus" && $(f, !0), l?.id === "previous" || l?.id === "next") {
      const j = V(), y = j.findIndex((I) => I.id === f) + (l.id === "next" ? 1 : -1);
      j[y] && (d = Math.floor(y / 50), S(), $(j[y].id, !0));
    }
    if (l?.id === "export-html" || l?.id === "export-viewer") {
      const j = p("selected-only").checked ? h.results.filter((I) => v.has(I.id)) : h.results;
      if (!j.length) throw Error("Нет результатов для отчёта.");
      if (p("report-images").checked) {
        const I = t.view, F = I?.storeView();
        u = !1, q(!0);
        try {
          let oe = 0;
          for (const _ of j) {
            if (u)
              throw Error(
                "Подготовка отчёта отменена. Уже полученные снимки сохранены."
              );
            if (O("Подготовка снимков: " + ++oe + " / " + j.length), !_.image) {
              if (_.state === "resolved" && !t.canLocate(_)) continue;
              _.image = await t.snapshot(
                _,
                Number(p("distance").value),
                () => u
              ), A();
            }
          }
        } finally {
          if (I && t.isCurrent()) {
            const oe = h.results.find((_) => _.id === f);
            if (oe)
              try {
                t.focus(
                  oe,
                  Number(p("distance").value),
                  !1
                );
              } catch {
              }
            F && I.restoreView(F);
          }
          q(!1);
        }
      }
      const y = p("report-images").checked ? j : j.map((I) => ({ ...I, image: void 0 }));
      xe(
        h.name + (l.id === "export-html" ? ".html" : ".collision360.json"),
        l.id === "export-html" ? Re(h, y) : Ue(h, y)
      ), O(
        "Отчёт подготовлен. Результатов: " + j.length + "; со снимками: " + y.filter((I) => I.image).length + "."
      );
    }
    const k = s.closest("[data-result]");
    k && !s.closest("input") && !window.getSelection()?.toString() && $(k.dataset.result);
  }), p("content").ondblclick = (o) => {
    const s = o.target, l = s.closest("[data-result]");
    l && !s.closest("input") && B(() => $(l.dataset.result, !0));
  };
  const R = setInterval(() => {
    if (n && !t.isCurrent()) {
      n = void 0, t.clear();
      for (const o of P.checks) o.lastRun && (o.status = "stale");
      p("model-count").textContent = "Проект изменился", O("Активный проект изменился. Обновите модели."), m || C();
    }
  }, 1500);
  return C(), () => {
    clearInterval(R), u = !0, M?.(), c?.terminate(), t.clear();
  };
}
var fe = /* @__PURE__ */ ((e) => (e.object = "object", e.drawing = "drawing", e.table = "table", e.record = "record", e.textStyle = "textstyle", e.textStyleTable = "textstyles", e.linetype = "linetype", e.linetypeTable = "linetypes", e.layer = "layer", e.layerTable = "layers", e.block = "block", e.blockTable = "blocks", e.layout = "layout", e.layoutTable = "layouts", e.type = "type", e.typeTable = "types", e.material = "material", e.materialTable = "materials", e.geometry = "geometry", e.geometryTable = "geometries", e.group = "group", e.groupTable = "groups", e.attachment = "attachment", e.attachmentTable = "attachments", e.entities = "entities", e.entity = "entity", e.line = "l", e.solid = "s", e.insert = "i", e.polyline = "p", e.circle = "c", e.arc = "a", e.polyline3d = "p3", e.proxy = "x", e.text = "t", e.mtext = "mt", e.wipeout = "w", e.model3d = "g", e.alignment = "al", e))(fe || {});
async function Pe(e, t) {
  if (await new Promise((u) => requestAnimationFrame(() => u())), t()) throw Error("Подготовка снимков отменена.");
  const { width: i, height: n } = e.camera, a = Array.from(document.querySelectorAll("canvas")).filter(
    (u) => {
      const c = u.getBoundingClientRect();
      return c.width > 100 && c.height > 100 && u.width > 0 && u.height > 0 && getComputedStyle(u).visibility !== "hidden" && (Math.abs(c.width - i) < 4 && Math.abs(c.height - n) < 4 || Math.abs(u.width - i) < 4 && Math.abs(u.height - n) < 4);
    }
  );
  if (!a.length)
    throw Error(
      "Снимок 3D-окна недоступен: откройте одно видимое окно модели."
    );
  const r = a[0].getBoundingClientRect();
  if (a.some((u) => {
    const c = u.getBoundingClientRect();
    return Math.abs(c.x - r.x) > 4 || Math.abs(c.y - r.y) > 4;
  }))
    throw Error(
      "Открыто несколько подходящих 3D-окон. Оставьте одно окно для снимка."
    );
  const f = document.createElement("canvas"), d = Math.min(1, 1280 / a[0].width);
  f.width = Math.round(a[0].width * d), f.height = Math.round(a[0].height * d);
  const m = f.getContext("2d");
  m.fillStyle = "#20242b", m.fillRect(0, 0, f.width, f.height), e.repaint();
  for (const u of a)
    m.drawImage(u, 0, 0, f.width, f.height);
  try {
    return f.toDataURL("image/jpeg", 0.82);
  } catch {
    throw Error("Браузер запретил чтение изображения 3D-окна.");
  }
}
const ce = "nashepo.checks.points", Ze = "nashepo.checks.highlight";
function ye(e) {
  let t = performance.now();
  return async () => {
    if (e()) throw Error("Операция отменена.");
    performance.now() - t >= 16 && (await new Promise((i) => setTimeout(i, 0)), t = performance.now());
  };
}
function ae(e, t, i, n = 0) {
  if (n > 12 || e == null) return;
  if (typeof e != "object") {
    i[t] = String(e);
    return;
  }
  if (Array.isArray(e)) {
    e.forEach((r, f) => ae(r, `${t}[${f}]`, i, n + 1));
    return;
  }
  const a = e;
  if ("$value" in a) {
    ae(a.$value, t, i, n + 1);
    return;
  }
  for (const [r, f] of Object.entries(a))
    r.startsWith("$") || ae(f, t ? `${t}.${r}` : r, i, n + 1);
}
class Ge {
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
  async scan(t, i) {
    const n = this.app, a = this.view, r = n?.model;
    if (!a || !r?.layouts || !r.attachments)
      throw Error(
        "Откройте проект Топоматик 360 с IFC или SMDX и сделайте его 3D-окно активным."
      );
    const f = [], d = [], m = [], u = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Set();
    let b = 2166136261;
    const w = ye(
      () => i() || n !== this.app || a !== this.view
    );
    let v = -1 / 0;
    const M = (p) => {
      for (let O = 0; O < p.length; O++)
        b = Math.imul(b ^ p.charCodeAt(O), 16777619);
    }, x = async (p, O, B) => {
      if (c.has(p)) return;
      c.add(p);
      const A = p.layers.layer0?.modelName || O, J = O;
      f.push({ id: J, name: A });
      const W = [];
      p.layouts.model?.walk((g) => (g.type === fe.model3d ? W.push(g) : g.type === fe.insert && d.push(`${A}: вставка блока не включена в расчёт.`), !1));
      const T = /* @__PURE__ */ new Map();
      for (const g of W) {
        const E = JSON.stringify([
          g.layer?.UUID || "",
          g.$id || g.$path
        ]);
        T.set(E, [g]);
      }
      for (const [g, E] of T) {
        if (i()) throw Error("Чтение моделей отменено.");
        if (n !== this.app || a !== this.view)
          throw Error(
            "Активный проект изменился. Запустите чтение моделей заново."
          );
        const C = E[0].layer, S = {};
        try {
          if (C) {
            const R = [];
            let o = C;
            for (; o && R.length < 64; )
              R.unshift(o), o = o.layer;
            for (const s of R)
              ae(s.typedProperties(), "", S), s.typed?.name && (S.Тип = s.typed.name);
          }
        } catch {
          d.push(`${A} / ${g}: часть свойств недоступна.`);
        }
        const G = S["ifc.id"] || Object.entries(S).find(
          ([R]) => /(^|\.)(globalid|ifcguid|guid)$/i.test(R)
        )?.[1] || "", L = C?.name || E[0].$id || "Элемент", $ = JSON.stringify([J, g]);
        Object.assign(S, {
          Модель: A,
          Имя: L,
          GUID: G,
          Объект: C?.UUID || g
        });
        const z = {
          min: [1 / 0, 1 / 0, 1 / 0],
          max: [-1 / 0, -1 / 0, -1 / 0]
        };
        let q = !0, Q = !1, D = 0;
        for (const R of E) {
          q &&= R.isClosed;
          for (const o of Object.values(R.meshes)) {
            const s = o.geometry;
            if (!s || s.indices.length % 3) {
              Q = !0;
              continue;
            }
            q &&= o.isClosed, D += s.indices.length / 3;
            for (let l = 0; l < s.vertices.length; l += 3) {
              const h = [
                s.vertices[l],
                s.vertices[l + 1],
                s.vertices[l + 2]
              ];
              if (Math3d.mat4.mulv3(h, R.matrix, h), !h.every(Number.isFinite)) {
                Q = !0;
                continue;
              }
              for (let k = 0; k < 3; k++)
                z.min[k] = Math.min(z.min[k], h[k]), z.max[k] = Math.max(z.max[k], h[k]);
              if (M(h.join(",")), l % 6e4 === 0 && (performance.now() - v > 200 && (v = performance.now(), t(
                "Индексирование: " + A + " · " + m.length + " элементов"
              )), await w(), i()))
                throw Error("Чтение моделей отменено.");
            }
            for (let l = 0; l < s.indices.length; l++)
              if (b = Math.imul(b ^ s.indices[l], 16777619), l % 15e4 === 0 && (await w(), i()))
                throw Error("Чтение моделей отменено.");
          }
        }
        if (Q || !D) {
          if (d.push(
            A + " / " + L + ": геометрия отсутствует или неполна."
          ), !D) continue;
          q = !1;
        }
        const Y = {
          id: $,
          name: L,
          model: A,
          modelId: J,
          guid: G,
          properties: S,
          hidden: B || !!C?.resolveHidden() || !!C?.resolveDisabled(),
          triangles: new Float64Array(0),
          triangleCount: D,
          closed: q,
          bounds: z
        };
        M(JSON.stringify([$, S, Y.hidden])), m.push(Y), u.set($, E);
      }
      const V = [];
      p.attachments.forEach((g) => {
        V.push(g);
      });
      for (const g of V)
        g.model ? await x(
          g.model,
          `${O}/${g.name || g.uri || g.$id}`,
          B || g.hidden
        ) : d.push(
          `${g.name || g.uri || "Подключённая модель"}: модель не загружена. Откройте её перед расчётом.`
        );
    };
    if (await x(r, r.layers.layer0?.modelName || "Проект", !1), !m.length)
      throw Error(
        "В открытом проекте не найдены 3D-элементы с доступной геометрией."
      );
    return this.clear(), this.refs = u, this.metadata = new Map(m.map((p) => [p.id, p])), this.scannedApp = n, this.scannedView = a, {
      elements: m,
      fingerprint: `${m.length}:${b >>> 0}`,
      warnings: [...new Set(d)],
      models: f
    };
  }
  async geometry(t, i) {
    const n = ye(() => i() || !this.isCurrent());
    if (!this.isCurrent()) throw Error("Активная модель изменилась.");
    const a = this.metadata.get(t), r = this.refs.get(t);
    if (!a || !r) throw Error("Элемент отсутствует.");
    const f = r.flatMap(
      (v) => Object.values(v.meshes).map((M) => ({
        object: v,
        g: M.geometry
      }))
    );
    let d = 0, m = 0;
    for (const { g: v } of f) {
      if (!v) throw Error("Геометрия недоступна.");
      d += v.vertices.length, m += v.indices.length;
    }
    const u = new Float64Array(d), c = new Uint32Array(m);
    let b = 0, w = 0;
    for (const { object: v, g: M } of f) {
      if (!M) throw Error("Геометрия недоступна.");
      for (let x = 0; x < M.vertices.length; x += 3) {
        const p = [M.vertices[x], M.vertices[x + 1], M.vertices[x + 2]];
        if (Math3d.mat4.mulv3(p, v.matrix, p), u.set(p, b + x), x % 6e4 === 0 && (await n(), i() || !this.isCurrent()))
          throw Error("Чтение геометрии отменено.");
      }
      for (let x = 0; x < M.indices.length; x++) {
        if (M.indices[x] >= M.vertices.length / 3)
          throw Error("Некорректный индекс геометрии.");
        if (c[w + x] = b / 3 + M.indices[x], x % 15e4 === 0 && (await n(), i()))
          throw Error("Чтение геометрии отменено.");
      }
      b += M.vertices.length, w += M.indices.length;
    }
    return { ...a, vertices: u, indices: c };
  }
  selected() {
    if (!this.isCurrent())
      throw Error("Сначала обновите модели текущего проекта.");
    const t = new Set(this.view?.layer.selectedObjects());
    return [...this.refs].filter(([, i]) => i.some((n) => t.has(n))).map(([i]) => i);
  }
  select(t) {
    if (!this.isCurrent())
      throw Error("Сначала обновите модели текущего проекта.");
    const i = new Set(t.flatMap((n) => this.refs.get(n) || []));
    this.view.layer.clearSelected(), this.view.layer.selectObjects((n) => i.has(n), !0), this.view.invalidate();
  }
  clear() {
    if (this.overlay && (this.overlay.view.layer.removeLayer(this.overlay.layer), this.overlay.view.invalidate(), this.overlay = void 0), this.pointView) {
      const t = this.pointView.annotations.get(ce);
      t && this.pointView.annotations.release(t), this.pointView.invalidate(), this.pointView = void 0;
    }
  }
  focus(t, i, n = !0) {
    if (!this.isCurrent())
      throw Error("Обновите модели текущего проекта перед переходом.");
    if (!Number.isFinite(i) || i < 0.5)
      throw Error("Дистанция камеры должна быть не менее 0,5 м.");
    if (!this.refs.has(t.a.id) || !this.refs.has(t.b.id))
      throw Error("Один из элементов отсутствует в загруженных моделях.");
    this.view.layer.clearSelected(), this.highlight([t.a.id, t.b.id]);
    const a = t.point, r = this.view;
    r.camera?.id !== "3d" && r.setCameraType("3d");
    const f = [-0.65, 0.65, -0.394], d = Math.hypot(...f);
    f.forEach((m, u) => f[u] = m / d), r.lookAt(
      a.map((m, u) => m - f[u] * i),
      f,
      [0, 0, 1],
      n,
      a
    );
  }
  highlight(t) {
    this.overlay && (this.overlay.view.layer.removeLayer(this.overlay.layer), this.overlay = void 0);
    const i = this.view, a = t.flatMap(
      (d, m) => (this.refs.get(d) || []).map((u) => ({ obj: u, side: m }))
    ).flatMap(
      ({ obj: d, side: m }) => Object.values(d.meshes).flatMap((u) => {
        const c = u.geometry;
        if (!c) return [];
        const b = m === 0 ? 4281743103 : 4294941995, w = new Uint32Array(c.indices.length * 2);
        w.set(c.indices);
        for (let M = 0; M < c.indices.length; M += 3)
          w[c.indices.length + M] = c.indices[M], w[c.indices.length + M + 1] = c.indices[M + 2], w[c.indices.length + M + 2] = c.indices[M + 1];
        const v = {
          uuid: "nashepo.checks." + m + "." + c.uuid,
          vertices: c.vertices,
          normals: c.normals,
          bounds: c.bounds,
          indices: w,
          colors: new Uint32Array(c.vertices.length / 3).fill(b)
        };
        return [{ obj: d, geometry: v, color: b }];
      })
    ), f = {
      id: Ze,
      order: 1e4,
      visible: !0,
      paint: () => {
      },
      paint3d: (d, m) => {
        const u = d.color, c = d.rasterizer.material;
        d.rasterizer.material = void 0;
        const b = Math3d.mat4.inverse(Math3d.mat4.alloc(), m.view);
        try {
          for (const { obj: w, geometry: v, color: M } of a) {
            d.color = M, d.pushMatrix();
            try {
              const x = Math3d.mat4.alloc();
              for (let O = 0; O < 16; O++) x[O] = w.matrix[O];
              const p = 1e-3;
              x[12] += b[8] * p, x[13] += b[9] * p, x[14] += b[10] * p, d.multMatrix(x), d.mesh(v);
            } finally {
              d.popMatrix();
            }
          }
        } finally {
          d.color = u, d.rasterizer.material = c;
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
    i.layer.addLayer(f), this.overlay = { view: i, layer: f }, i.invalidate();
  }
  async snapshot(t, i, n, a = !1) {
    if (!this.isCurrent())
      throw Error("Обновите модели перед созданием снимков.");
    if (!this.canLocate(t))
      throw Error("Элементы результата отсутствуют в открытых моделях.");
    return a ? (this.view.layer.clearSelected(), this.highlight([t.a.id, t.b.id])) : this.focus(t, i, !1), Pe(this.view, () => n() || !this.isCurrent());
  }
  markers(t, i, n, a) {
    if (!this.isCurrent()) return;
    const r = this.view;
    this.pointView && this.pointView !== r && this.clear();
    const f = r.annotations.get(ce);
    if (f && r.annotations.release(f), this.pointView = r, !n) {
      r.invalidate();
      return;
    }
    const d = r.annotations.create(ce, 1e4), m = t.filter((u) => u.id !== i).concat(t.filter((u) => u.id === i));
    for (const u of m.slice(-3e3)) {
      if (u.state === "resolved") continue;
      const [c, b, w] = u.point, v = u.id === i, M = u.state === "excluded" ? "#78818c" : u.state === "approved" || u.state === "reviewed" ? "#28b94b" : "#e1372d", x = v ? "#f2c94c" : M, p = () => a(u.id), O = [
        { type: "line", a: [c, b, w], b: [c, b, w + 1], color: x, width: 5 },
        {
          type: "polyline",
          points: [
            [c - 0.65, b, w + 1],
            [c + 0.65, b, w + 1],
            [c, b, w + 2.2],
            [c - 0.65, b, w + 1]
          ],
          color: x,
          fillColor: M,
          width: v ? 5 : 2
        },
        {
          type: "line",
          a: [c, b - 0.01, w + 1.85],
          b: [c, b - 0.01, w + 1.4],
          color: "#ffffff",
          width: 4
        },
        {
          type: "line",
          a: [c, b - 0.01, w + 1.22],
          b: [c, b - 0.01, w + 1.27],
          color: "#ffffff",
          width: 4
        }
      ];
      d.add({
        id: u.id,
        type: "shaped",
        shapes: O,
        activeShapes: O,
        activateCommand: p,
        dblCommand: p
      }), v && d.add({
        id: u.id + ":label",
        type: "simple",
        position: [c, b, w + 2.35],
        label: `${u.a.name} × ${u.b.name}`,
        labelBackground: "#f2c94c",
        labelColor: "#171717",
        activateCommand: p
      });
    }
    r.invalidate();
  }
}
let we;
const Qe = {
  open(e) {
    e.manager.revealView("nashepo.collisionfinder360/checks_panel");
  },
  mount(e) {
    const t = e.el;
    if (!t) return;
    we?.();
    const i = document.createElement("div");
    i.style.height = "100%", t.replaceChildren(i), we = Ye(i, new Ge(e));
  }
};
export {
  Qe as default
};
