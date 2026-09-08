const ke = `<h2>Работа с проверками</h2>
<details open><summary>1. Первая проверка: одна модель против другой</summary><ol><li>Откройте проект и подключите нужные IFC/SMDX штатными средствами Топоматик 360.</li><li>Откройте нижнюю вкладку «Проверки» и нажмите «Обновить модели». Плагин прочитает состав, свойства и габариты элементов.</li><li>Нажмите «＋ Проверка». Вверху задайте имя, например «Водопровод — канализация».</li><li>Во вкладке «Выбрать» отметьте модель водопровода в А, модель канализации в Б. Несколько файлов выбираются с Ctrl, диапазон — с Shift. Без выбранных файлов используются все прочитанные модели.</li><li>Выберите «По пересечению» и нажмите «Запустить». Пара проверяется один раз; один и тот же геометрический элемент сам с собой не сравнивается.</li><li>Во вкладке «Результаты» дважды нажмите строку: камера направится к точке конфликта. А обозначается красным, Б — синим.</li></ol></details>
<details><summary>2. Несколько проверок и выборки по свойствам</summary><p>Каждая проверка хранит собственные модели А/Б, условия и результаты. Создайте отдельные проверки для разных разделов или скопируйте существующую и измените модели. «Запустить все» последовательно выполняет все созданные проверки; поиск слева только фильтрует список, а не состав пакетного запуска.</p><p>«＋ Условие» ограничивает выборку по свойству: например типу, системе или материалу. Выберите доступное имя свойства из подсказки и задайте значение. «И» требует выполнения всех условий, «ИЛИ» — хотя бы одного. Модель и условия действуют совместно. Перед каждым запуском выборка вычисляется заново. Число элементов указано рядом с А/Б.</p><p>IFC GUID читается из свойства <code>ifc.id</code>; также поддерживаются поля GlobalId и GUID. Вы можете использовать <code>ifc.id</code> в условиях.</p></details>
<details><summary>3. Кнопки работы с выделением в 3D</summary><p>Сначала выделите элементы штатными средствами в 3D-окне, затем нажмите кнопку в нужной выборке А или Б:</p><ul><li><b>Показать выборку</b> — выделяет в сцене весь текущий состав этой выборки.</li><li><b>Только выделенные</b> — заменяет выборку текущим выделением. Удобно для проверки конкретной пары или небольшой группы. Автоматические модели и условия в этом режиме не применяются.</li><li><b>＋ Добавить выделенные</b> — включает элементы дополнительно, даже если они не проходят условия. Если уже выбраны все модели без условий, число элементов может не измениться: они уже входят в выборку.</li><li><b>− Исключить выделенные</b> — убирает элементы из выборки. Исключение имеет приоритет.</li><li><b>Вернуть автоматический выбор</b> — очищает ручные добавления/исключения и снова использует модели и условия.</li></ul><p>Ручной выбор сохраняет идентификаторы элементов. Если их заменили при обновлении модели, выделение следует задать заново.</p></details>
<details><summary>4. Пересечения, касания, точность и дубликаты</summary><p><b>Пересечение</b> — поверхности проходят друг сквозь друга либо элемент находится внутри замкнутого тела. <b>Касание</b> — поверхности соприкасаются без проникновения, например торец трубы касается стены. «Учитывать касания» включает такие пары; обычно этот переключатель оставляют выключенным.</p><p>«Точность расчёта, мм» — числовая погрешность, а не минимальная глубина проникновения. Проверки просвета и фильтр по глубине проникновения пока не реализованы.</p><p><b>Дублирование</b> ищет одинаковые треугольники в одинаковых мировых координатах после округления с заданной точностью. Для дубликатов внутри файла выберите этот файл в А и Б. Порядок треугольников и вершин не важен; разная триангуляция одинаковой формы пока не сопоставляется.</p></details>
<details><summary>5. Составные объекты и правила исключений</summary><p>Один IFC-объект может состоять из нескольких геометрических частей. Эти части проверяются друг с другом, поэтому у результата могут совпадать имя и IFC GUID. Чтобы пропускать такие пары, включите «Не проверять геометрию одного составного объекта» во вкладке «Правила».</p><p>Там же можно исключить пары из одной модели, пары с одинаковым значением свойства и включить скрытые элементы. Незагруженные подключённые файлы надо открыть перед расчётом.</p></details>
<details><summary>6. Результаты, состояния и повторный запуск</summary><p>«Новый» — найден впервые; «Активный» — найден при повторном запуске; «Проверенный» — рассмотрен пользователем; «Подтверждённый» — решение подтверждено; «Исключённый» — сознательно исключён из работы. «Исправленный» устанавливается при исчезновении пары на повторном полном расчёте с теми же условиями; его также можно выставить вручную.</p><p>Назначение — исполнитель или подразделение, комментарий — ваше решение. Галочки в таблице позволяют менять состояние сразу у нескольких результатов. Галочка в заголовке выбирает текущую страницу. Поиск и фильтр состояний ограничивают видимые строки. Значения таблицы и свойств можно выделять и копировать.</p><p>При повторном запуске с теми же условиями сохраняются назначения и комментарии. Если условия изменены, начинается новый набор результатов: сначала сохраните предыдущую работу. Отключение ранее участвовавшей модели останавливает повторный расчёт, чтобы её конфликты не стали исправленными по ошибке.</p></details>
<details><summary>7. Снимки и передача отчёта</summary><p>В карточке результата нажмите «Сохранить текущий ракурс», чтобы записать изображение 3D-окна после ручной настройки камеры. Снимок можно открыть крупнее.</p><p>Во вкладке «Отчёт» включите «Добавить снимки» и сформируйте HTML: для результатов без изображения плагин последовательно выставит камеру и сделает снимки. Не переключайте проект и не перемещайте камеру во время подготовки. Кнопка «Остановить» прерывает подготовку; уже полученные снимки сохраняются.</p><p>HTML содержит изображения, поиск и фильтр состояний; его можно открыть без Топоматик. Файл сессии открывается в плагине «НашеПО · Коллизии». Исправленным парам, элементы которых отсутствуют, сохраняется прежний снимок; новый снимок для них получить нельзя. При недоступности изображения плагин сообщает об этом и не подставляет чужой ракурс.</p></details>
<details><summary>8. Сохранение работы и большие проекты</summary><p>«Сохранить проверки» записывает правила, результаты, комментарии и снимки в JSON. «Открыть проверки» загружает этот файл для продолжения работы. Геометрия в него не включается: соответствующие модели надо открыть в Топоматик отдельно. Без сохранения в файл работа может быть потеряна при закрытии страницы.</p><p>Общий предел в 6 млн треугольников снят. Сначала строится индекс габаритов; точная геометрия близких пар передаётся в расчёт по мере необходимости в компактном индексированном виде. Расчёт всё ещё ограничен доступной памятью и временем, особенно если один элемент очень крупный или почти все элементы пересекаются. Для управляемых результатов полезно разделять проверки по системам и моделям. В сцене одновременно выводятся до 3000 знаков. При достижении 50 000 результатов расчёт останавливается с сообщением, без замены прежних результатов.</p></details>`, se = (e) => typeof e == "string" && /^data:image\/(jpeg|png);base64,[A-Za-z0-9+/=]+$/.test(e), X = {
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
}), je = () => ({
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
  bounds: s,
  ...p
}) => p;
function re(e, t) {
  if (t.exclude.includes(e.id)) return !1;
  if (t.include.includes(e.id)) return !0;
  if (t.manualOnly || t.models.length && !t.models.includes(e.modelId)) return !1;
  const i = (n) => {
    const a = e.properties[n.field], s = (a ?? "").toLocaleLowerCase(), p = n.value.toLocaleLowerCase();
    switch (n.op) {
      case "exists":
        return a !== void 0 && a !== "";
      case "eq":
        return a !== void 0 && s === p;
      case "ne":
        return a !== void 0 && s !== p;
      case "contains":
        return a !== void 0 && s.includes(p);
      case "gt":
        return a !== void 0 && a.trim() !== "" && Number(a.replace(",", ".")) > Number(n.value.replace(",", "."));
      case "lt":
        return a !== void 0 && a.trim() !== "" && Number(a.replace(",", ".")) < Number(n.value.replace(",", "."));
    }
  };
  return !t.conditions.length || (t.mode === "all" ? t.conditions.every(i) : t.conditions.some(i));
}
const Se = (e) => JSON.stringify([
  e.type,
  e.a,
  e.b,
  e.precision,
  e.touching,
  e.ignoreSameModel,
  e.ignoreSameGroup,
  e.equalProperty,
  e.includeHidden
]), Ie = (e, t) => JSON.stringify([e, t].sort());
function Ee(e, t, i) {
  const n = new Map(e.map((s) => [s.id, s])), a = t.map((s) => {
    const p = n.get(s.id);
    return n.delete(s.id), {
      ...s,
      note: p?.note ?? "",
      assignee: p?.assignee ?? "",
      firstSeen: p?.firstSeen ?? i,
      lastSeen: i,
      state: !p || p.state === "resolved" ? "new" : p.state === "new" ? "active" : p.state
    };
  });
  for (const s of n.values())
    a.push({
      ...s,
      state: s.state === "excluded" ? "excluded" : "resolved"
    });
  return a;
}
function Ce(e) {
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
        (s) => Array.isArray(s) && s.every((p) => typeof p == "string")
      ) || !Array.isArray(a.conditions) || !a.conditions.every(
        (s) => s && typeof s.field == "string" && typeof s.value == "string" && ["eq", "ne", "contains", "exists", "gt", "lt"].includes(s.op)
      ))
        throw Error("Некорректная выборка.");
    for (const a of n.results) {
      if (a?.image !== void 0 && !se(a.image))
        throw Error("Некорректный снимок результата.");
      if (!a || typeof a.id != "string" || !Object.hasOwn(X, a.state) || !Array.isArray(a.point) || a.point.length !== 3 || !a.point.every(Number.isFinite))
        throw Error("Некорректный результат.");
      for (const s of [a.a, a.b])
        if (!s || !["id", "name", "model", "modelId", "guid"].every(
          (p) => typeof s[p] == "string"
        ) || !s.properties || typeof s.properties != "object")
          throw Error("Некорректный элемент результата.");
    }
    n.status = "stale", n.warnings = [];
  }
  return t;
}
const Y = (e, t) => [e[0] - t[0], e[1] - t[1], e[2] - t[2]], me = (e, t, i = 1) => [
  e[0] + t[0] * i,
  e[1] + t[1] * i,
  e[2] + t[2] * i
], J = (e, t) => e[0] * t[0] + e[1] * t[1] + e[2] * t[2], ne = (e, t) => [
  e[1] * t[2] - e[2] * t[1],
  e[2] * t[0] - e[0] * t[2],
  e[0] * t[1] - e[1] * t[0]
], F = (e) => Math.hypot(...e), ee = (e) => e.triangleCount ?? (e.indices ? e.indices.length / 3 : e.triangles.length / 9), K = (e, t, i) => e.indices && e.vertices ? e.vertices[e.indices[t * 3 + Math.floor(i / 3)] * 3 + i % 3] : e.triangles[t * 9 + i], ie = (e, t) => [0, 3, 6].map((i) => [
  K(e, t, i),
  K(e, t, i + 1),
  K(e, t, i + 2)
]);
function we(e) {
  const t = [1 / 0, 1 / 0, 1 / 0], i = [-1 / 0, -1 / 0, -1 / 0];
  for (let n = 0; n < e.length; n++) {
    const a = n % 3;
    t[a] = Math.min(t[a], e[n]), i[a] = Math.max(i[a], e[n]);
  }
  return { min: t, max: i };
}
const ve = (e, t, i) => e.min.every((n, a) => n <= t.max[a] + i && e.max[a] >= t.min[a] - i);
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
  const n = i.max.map((d, m) => d - i.min[m]), a = n.indexOf(Math.max(...n)), s = (d) => K(e, d, a) + K(e, d, a + 3) + K(e, d, a + 6);
  t.sort((d, m) => s(d) - s(m));
  const p = t.length >> 1;
  return {
    ...i,
    left: de(e, t.slice(0, p)),
    right: de(e, t.slice(p))
  };
}
function* te(e, t, i) {
  ve(e, t, i) && (e.ids ? yield* e.ids : (yield* te(e.left, t, i), yield* te(e.right, t, i)));
}
function ue(e, t) {
  const i = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const p of t)
    for (let d = 0; d < 3; d++)
      i.min[d] = Math.min(i.min[d], e[p].bounds.min[d]), i.max[d] = Math.max(i.max[d], e[p].bounds.max[d]);
  if (t.length <= 16) return { ...i, ids: t };
  const n = i.max.map((p, d) => p - i.min[d]), a = n.indexOf(Math.max(...n));
  t.sort(
    (p, d) => e[p].bounds.min[a] + e[p].bounds.max[a] - (e[d].bounds.min[a] + e[d].bounds.max[a])
  );
  const s = t.length >> 1;
  return {
    ...i,
    left: ue(e, t.slice(0, s)),
    right: ue(e, t.slice(s))
  };
}
function pe(e, t, i, n) {
  const a = Y(t, e), s = Y(i[1], i[0]), p = Y(i[2], i[0]), d = ne(a, p), m = J(s, d);
  if (Math.abs(m) <= 1e-12 * F(a) * F(s) * F(p)) return;
  const u = 1 / m, c = Y(e, i[0]), g = J(c, d) * u, x = ne(c, s), w = J(a, x) * u, y = J(p, x) * u, v = n / Math.max(F(s), F(p), n);
  if (g >= -v && w >= -v && g + w <= 1 + v && y >= -v && y <= 1 + v)
    return me(e, a, Math.max(0, Math.min(1, y)));
}
function Oe(e, t, i, n) {
  const a = i.map(Math.abs).indexOf(Math.max(...i.map(Math.abs))), s = [0, 1, 2].filter((m) => m !== a), p = (m, u, c) => (u[s[0]] - m[s[0]]) * (c[s[1]] - m[s[1]]) - (u[s[1]] - m[s[1]]) * (c[s[0]] - m[s[0]]), d = (m, u) => {
    const c = u.map((g, x) => p(g, u[(x + 1) % 3], m));
    return c.every((g) => g >= -n * F(i)) || c.every((g) => g <= n * F(i));
  };
  for (const m of e) if (d(m, t)) return m;
  for (const m of t) if (d(m, e)) return m;
  for (let m = 0; m < 3; m++)
    for (let u = 0; u < 3; u++) {
      const c = e[m], g = e[(m + 1) % 3], x = t[u], w = t[(u + 1) % 3], y = Y(g, c), v = Y(w, x), f = y[s[0]] * v[s[1]] - y[s[1]] * v[s[0]];
      if (Math.abs(f) < 1e-18) continue;
      const C = Y(x, c), P = (C[s[0]] * v[s[1]] - C[s[1]] * v[s[0]]) / f, z = (C[s[0]] * y[s[1]] - C[s[1]] * y[s[0]]) / f;
      if (P >= 0 && P <= 1 && z >= 0 && z <= 1) return me(c, y, P);
    }
}
function Ae(e, t, i, n) {
  const a = ne(Y(e[1], e[0]), Y(e[2], e[0])), s = ne(Y(t[1], t[0]), Y(t[2], t[0])), p = F(a), d = F(s);
  if (p < 1e-20 || d < 1e-20) return;
  const m = t.map((c) => J(Y(c, e[0]), a) / p), u = e.map((c) => J(Y(c, t[0]), s) / d);
  if (!(m.every((c) => c > i) || m.every((c) => c < -i) || u.every((c) => c > i) || u.every((c) => c < -i))) {
    if (m.every((c) => Math.abs(c) <= i) && u.every((c) => Math.abs(c) <= i))
      return n ? Oe(e, t, a, i) : void 0;
    if (!(!n && (!(Math.min(...m) < -i && Math.max(...m) > i) || !(Math.min(...u) < -i && Math.max(...u) > i))))
      for (let c = 0; c < 3; c++) {
        const g = pe(e[c], e[(c + 1) % 3], t, i);
        if (g) return g;
        const x = pe(t[c], t[(c + 1) % 3], e, i);
        if (x) return x;
      }
  }
}
function Le(e, t, i) {
  const n = Y(t[1], t[0]), a = Y(t[2], t[0]), s = ne(n, a), p = F(s);
  if (p < 1e-20 || Math.abs(J(Y(e, t[0]), s)) / p > i) return !1;
  const d = Y(e, t[0]), m = J(n, n), u = J(n, a), c = J(a, a), g = J(d, n), x = J(d, a), w = m * c - u * u;
  if (Math.abs(w) < 1e-30) return !1;
  const y = (g * c - x * u) / w, v = (x * m - g * u) / w, f = i / Math.max(F(n), F(a), i);
  return y >= -f && v >= -f && y + v <= 1 + f;
}
function le(e, t, i, n) {
  if (!t.closed || e.some((g, x) => g <= t.bounds.min[x] + n || g >= t.bounds.max[x] - n))
    return !1;
  for (const g of te(i, { min: e, max: e }, n))
    if (Le(e, ie(t, g), n)) return !1;
  const a = [1, 0.371390676, 0.52999894], s = F(Y(t.bounds.max, t.bounds.min)) * 3 + 1, p = me(e, a, s), d = [], m = we([...e, ...p]);
  for (const g of te(i, m, n)) {
    const x = pe(e, p, ie(t, g), n);
    if (x) {
      const w = F(Y(x, e));
      w > n && d.push(w);
    }
  }
  d.sort((g, x) => g - x);
  let u = 0, c = -1 / 0;
  for (const g of d)
    g - c > n * 2 && (u++, c = g);
  return u % 2 === 1;
}
async function ze(e, t, i, n, a) {
  const s = t.precision / 1e3;
  if (!Number.isFinite(s) || s <= 0)
    throw Error("Точность расчёта должна быть положительным числом.");
  const p = e.filter((M) => t.includeHidden || !M.hidden), d = p.filter((M) => re(M, t.a)), m = p.filter((M) => re(M, t.b));
  if (!d.length || !m.length)
    throw Error("Выборка А или Б пуста. Проверьте модели и условия.");
  let u = performance.now();
  const c = async () => {
    if (n())
      throw Error("Расчёт отменён. Предыдущие результаты сохранены.");
    performance.now() - u > 16 && (await new Promise((M) => setTimeout(M, 0)), u = performance.now());
  }, g = /* @__PURE__ */ new Map(), x = (M) => {
    let k = g.get(M.id);
    return k || (k = de(
      M,
      Array.from({ length: ee(M) }, (L, S) => S)
    ), g.set(M.id, k)), k;
  }, w = /* @__PURE__ */ new Map(), y = async (M) => {
    let k = w.get(M.id);
    if (k !== void 0) return k;
    const L = [];
    for (let S = 0; S < ee(M); S++)
      L.push(
        [0, 3, 6].map(
          (B) => [0, 1, 2].map((A) => Math.round(K(M, S, B + A) / s)).join(",")
        ).sort().join(";")
      ), S % 9e3 === 0 && await c();
    return k = L.sort().join("|"), w.set(M.id, k), k;
  }, v = [], f = new Set(d.map((M) => M.id)), C = new Set(m.map((M) => M.id)), P = ue(
    m,
    m.map((M, k) => k)
  ), z = /* @__PURE__ */ new Map();
  let W = 0;
  const T = (M) => M.triangles.byteLength + (M.vertices?.byteLength || 0) + (M.indices?.byteLength || 0) + ee(M) * 32;
  async function O(M, k) {
    if (!a) return M;
    let L = z.get(M.id);
    if (L)
      return z.delete(M.id), z.set(M.id, L), L;
    for (const [S, B] of z)
      S !== k && W > 96 * 1024 * 1024 && (z.delete(S), W -= T(B), g.delete(S), w.delete(S));
    return L = await a(M.id), z.set(M.id, L), W += T(L), L;
  }
  for (let M = 0; M < d.length; M++) {
    const k = d[M];
    i({
      phase: "Проверка пар",
      done: M,
      total: d.length,
      found: v.length
    });
    for (const L of te(P, k.bounds, s)) {
      const S = m[L];
      if (await c(), k.id === S.id || !ve(k.bounds, S.bounds, s) || t.ignoreSameModel && k.modelId === S.modelId || t.ignoreSameGroup && k.modelId === S.modelId && k.properties.Объект && k.properties.Объект === S.properties.Объект || t.equalProperty && k.properties[t.equalProperty] !== void 0 && k.properties[t.equalProperty] === S.properties[t.equalProperty] || k.id > S.id && f.has(S.id) && C.has(k.id)) continue;
      const B = Ie(k.id, S.id), A = await O(k), N = await O(S, k.id);
      let $, V = "surface";
      if (t.type === "duplicates") {
        if (ee(A) !== ee(N) || A.bounds.min.some(
          (R, Q) => Math.abs(R - N.bounds.min[Q]) > s || Math.abs(A.bounds.max[Q] - N.bounds.max[Q]) > s
        ))
          continue;
        await y(A) === await y(N) && ($ = A.bounds.min.map((R, Q) => (R + A.bounds.max[Q]) / 2), V = "duplicate");
      } else {
        const R = x(A), Q = x(N);
        for (let q = 0; q < ee(A) && !$; q++) {
          const Z = ie(A, q), U = we(Z.flat());
          for (const o of te(Q, U, s)) {
            if ($ = Ae(Z, ie(N, o), s, t.touching), $) break;
            await c();
          }
          await c();
        }
        if (!$ && A.closed && N.closed) {
          const q = A.bounds.min.map(
            (Z, U) => (Z + A.bounds.max[U]) / 2
          );
          le(q, A, R, s) && le(q, N, Q, s) && ($ = q, V = "contained");
        }
        if (!$) {
          for (const [q, Z, U] of [
            [A, N, Q],
            [N, A, R]
          ])
            if (Z.closed) {
              for (let o = 0; o < ee(q) && !$; o++) {
                const r = ie(q, o), l = r[0].map(
                  (h, j) => (r[0][j] + r[1][j] + r[2][j]) / 3
                );
                for (const h of [r[0], l])
                  if (le(h, Z, U, s)) {
                    $ = h, V = "contained";
                    break;
                  }
                await c();
              }
              if ($) break;
            }
        }
      }
      if ($ && (v.push({
        id: B,
        a: ge(A),
        b: ge(N),
        point: $,
        kind: V,
        state: "new",
        note: "",
        assignee: "",
        firstSeen: "",
        lastSeen: ""
      }), v.length >= 5e4))
        throw Error(
          "Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат."
        );
    }
  }
  return i({
    phase: "Готово",
    done: d.length,
    total: d.length,
    found: v.length
  }), v;
}
const Me = `(function(){"use strict";const k=({triangles:t,vertices:n,indices:e,triangleCount:a,closed:o,bounds:i,...u})=>u;function nn(t,n){if(n.exclude.includes(t.id))return!1;if(n.include.includes(t.id))return!0;if(n.manualOnly||n.models.length&&!n.models.includes(t.modelId))return!1;const e=a=>{const o=t.properties[a.field],i=(o??"").toLocaleLowerCase(),u=a.value.toLocaleLowerCase();switch(a.op){case"exists":return o!==void 0&&o!=="";case"eq":return o!==void 0&&i===u;case"ne":return o!==void 0&&i!==u;case"contains":return o!==void 0&&i.includes(u);case"gt":return o!==void 0&&o.trim()!==""&&Number(o.replace(",","."))>Number(a.value.replace(",","."));case"lt":return o!==void 0&&o.trim()!==""&&Number(o.replace(",","."))<Number(a.value.replace(",","."))}};return!n.conditions.length||(n.mode==="all"?n.conditions.every(e):n.conditions.some(e))}const sn=(t,n)=>JSON.stringify([t,n].sort()),y=(t,n)=>[t[0]-n[0],t[1]-n[1],t[2]-n[2]],Q=(t,n,e=1)=>[t[0]+n[0]*e,t[1]+n[1]*e,t[2]+n[2]*e],I=(t,n)=>t[0]*n[0]+t[1]*n[1]+t[2]*n[2],A=(t,n)=>[t[1]*n[2]-t[2]*n[1],t[2]*n[0]-t[0]*n[2],t[0]*n[1]-t[1]*n[0]],v=t=>Math.hypot(...t),N=t=>t.triangleCount??(t.indices?t.indices.length/3:t.triangles.length/9),P=(t,n,e)=>t.indices&&t.vertices?t.vertices[t.indices[n*3+Math.floor(e/3)]*3+e%3]:t.triangles[n*9+e],F=(t,n)=>[0,3,6].map(e=>[P(t,n,e),P(t,n,e+1),P(t,n,e+2)]);function tn(t){const n=[1/0,1/0,1/0],e=[-1/0,-1/0,-1/0];for(let a=0;a<t.length;a++){const o=a%3;n[o]=Math.min(n[o],t[a]),e[o]=Math.max(e[o],t[a])}return{min:n,max:e}}const en=(t,n,e)=>t.min.every((a,o)=>a<=n.max[o]+e&&t.max[o]>=n.min[o]-e);function R(t,n){const e={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const r of n)for(let c=0;c<9;c++){const d=c%3,s=P(t,r,c);e.min[d]=Math.min(e.min[d],s),e.max[d]=Math.max(e.max[d],s)}if(n.length<=12)return{...e,ids:n};const a=e.max.map((r,c)=>r-e.min[c]),o=a.indexOf(Math.max(...a)),i=r=>P(t,r,o)+P(t,r,o+3)+P(t,r,o+6);n.sort((r,c)=>i(r)-i(c));const u=n.length>>1;return{...e,left:R(t,n.slice(0,u)),right:R(t,n.slice(u))}}function*C(t,n,e){en(t,n,e)&&(t.ids?yield*t.ids:(yield*C(t.left,n,e),yield*C(t.right,n,e)))}function U(t,n){const e={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const u of n)for(let r=0;r<3;r++)e.min[r]=Math.min(e.min[r],t[u].bounds.min[r]),e.max[r]=Math.max(e.max[r],t[u].bounds.max[r]);if(n.length<=16)return{...e,ids:n};const a=e.max.map((u,r)=>u-e.min[r]),o=a.indexOf(Math.max(...a));n.sort((u,r)=>t[u].bounds.min[o]+t[u].bounds.max[o]-(t[r].bounds.min[o]+t[r].bounds.max[o]));const i=n.length>>1;return{...e,left:U(t,n.slice(0,i)),right:U(t,n.slice(i))}}function V(t,n,e,a){const o=y(n,t),i=y(e[1],e[0]),u=y(e[2],e[0]),r=A(o,u),c=I(i,r);if(Math.abs(c)<=1e-12*v(o)*v(i)*v(u))return;const d=1/c,s=y(t,e[0]),l=I(s,r)*d,h=A(s,i),p=I(o,h)*d,w=I(u,h)*d,x=a/Math.max(v(i),v(u),a);if(l>=-x&&p>=-x&&l+p<=1+x&&w>=-x&&w<=1+x)return Q(t,o,Math.max(0,Math.min(1,w)))}function an(t,n,e,a){const o=e.map(Math.abs).indexOf(Math.max(...e.map(Math.abs))),i=[0,1,2].filter(c=>c!==o),u=(c,d,s)=>(d[i[0]]-c[i[0]])*(s[i[1]]-c[i[1]])-(d[i[1]]-c[i[1]])*(s[i[0]]-c[i[0]]),r=(c,d)=>{const s=d.map((l,h)=>u(l,d[(h+1)%3],c));return s.every(l=>l>=-a*v(e))||s.every(l=>l<=a*v(e))};for(const c of t)if(r(c,n))return c;for(const c of n)if(r(c,t))return c;for(let c=0;c<3;c++)for(let d=0;d<3;d++){const s=t[c],l=t[(c+1)%3],h=n[d],p=n[(d+1)%3],w=y(l,s),x=y(p,h),j=w[i[0]]*x[i[1]]-w[i[1]]*x[i[0]];if(Math.abs(j)<1e-18)continue;const T=y(h,s),G=(T[i[0]]*x[i[1]]-T[i[1]]*x[i[0]])/j,E=(T[i[0]]*w[i[1]]-T[i[1]]*w[i[0]])/j;if(G>=0&&G<=1&&E>=0&&E<=1)return Q(s,w,G)}}function cn(t,n,e,a){const o=A(y(t[1],t[0]),y(t[2],t[0])),i=A(y(n[1],n[0]),y(n[2],n[0])),u=v(o),r=v(i);if(u<1e-20||r<1e-20)return;const c=n.map(s=>I(y(s,t[0]),o)/u),d=t.map(s=>I(y(s,n[0]),i)/r);if(!(c.every(s=>s>e)||c.every(s=>s<-e)||d.every(s=>s>e)||d.every(s=>s<-e))){if(c.every(s=>Math.abs(s)<=e)&&d.every(s=>Math.abs(s)<=e))return a?an(t,n,o,e):void 0;if(!(!a&&(!(Math.min(...c)<-e&&Math.max(...c)>e)||!(Math.min(...d)<-e&&Math.max(...d)>e))))for(let s=0;s<3;s++){const l=V(t[s],t[(s+1)%3],n,e);if(l)return l;const h=V(n[s],n[(s+1)%3],t,e);if(h)return h}}}function fn(t,n,e){const a=y(n[1],n[0]),o=y(n[2],n[0]),i=A(a,o),u=v(i);if(u<1e-20||Math.abs(I(y(t,n[0]),i))/u>e)return!1;const r=y(t,n[0]),c=I(a,a),d=I(a,o),s=I(o,o),l=I(r,a),h=I(r,o),p=c*s-d*d;if(Math.abs(p)<1e-30)return!1;const w=(l*s-h*d)/p,x=(h*c-l*d)/p,j=e/Math.max(v(a),v(o),e);return w>=-j&&x>=-j&&w+x<=1+j}function W(t,n,e,a){if(!n.closed||t.some((l,h)=>l<=n.bounds.min[h]+a||l>=n.bounds.max[h]-a))return!1;for(const l of C(e,{min:t,max:t},a))if(fn(t,F(n,l),a))return!1;const o=[1,.371390676,.52999894],i=v(y(n.bounds.max,n.bounds.min))*3+1,u=Q(t,o,i),r=[],c=tn([...t,...u]);for(const l of C(e,c,a)){const h=V(t,u,F(n,l),a);if(h){const p=v(y(h,t));p>a&&r.push(p)}}r.sort((l,h)=>l-h);let d=0,s=-1/0;for(const l of r)l-s>a*2&&(d++,s=l);return d%2===1}async function un(t,n,e,a,o){const i=n.precision/1e3;if(!Number.isFinite(i)||i<=0)throw Error("Точность расчёта должна быть положительным числом.");const u=t.filter(f=>n.includeHidden||!f.hidden),r=u.filter(f=>nn(f,n.a)),c=u.filter(f=>nn(f,n.b));if(!r.length||!c.length)throw Error("Выборка А или Б пуста. Проверьте модели и условия.");let d=performance.now();const s=async()=>{if(a())throw Error("Расчёт отменён. Предыдущие результаты сохранены.");performance.now()-d>16&&(await new Promise(f=>setTimeout(f,0)),d=performance.now())},l=new Map,h=f=>{let m=l.get(f.id);return m||(m=R(f,Array.from({length:N(f)},(b,g)=>g)),l.set(f.id,m)),m},p=new Map,w=async f=>{let m=p.get(f.id);if(m!==void 0)return m;const b=[];for(let g=0;g<N(f);g++)b.push([0,3,6].map(H=>[0,1,2].map(M=>Math.round(P(f,g,H+M)/i)).join(",")).sort().join(";")),g%9e3===0&&await s();return m=b.sort().join("|"),p.set(f.id,m),m},x=[],j=new Set(r.map(f=>f.id)),T=new Set(c.map(f=>f.id)),G=U(c,c.map((f,m)=>m)),E=new Map;let Y=0;const on=f=>f.triangles.byteLength+(f.vertices?.byteLength||0)+(f.indices?.byteLength||0)+N(f)*32;async function rn(f,m){if(!o)return f;let b=E.get(f.id);if(b)return E.delete(f.id),E.set(f.id,b),b;for(const[g,H]of E)g!==m&&Y>96*1024*1024&&(E.delete(g),Y-=on(H),l.delete(g),p.delete(g));return b=await o(f.id),E.set(f.id,b),Y+=on(b),b}for(let f=0;f<r.length;f++){const m=r[f];e({phase:"Проверка пар",done:f,total:r.length,found:x.length});for(const b of C(G,m.bounds,i)){const g=c[b];if(await s(),m.id===g.id||!en(m.bounds,g.bounds,i)||n.ignoreSameModel&&m.modelId===g.modelId||n.ignoreSameGroup&&m.modelId===g.modelId&&m.properties.Объект&&m.properties.Объект===g.properties.Объект||n.equalProperty&&m.properties[n.equalProperty]!==void 0&&m.properties[n.equalProperty]===g.properties[n.equalProperty]||m.id>g.id&&j.has(g.id)&&T.has(m.id))continue;const H=sn(m.id,g.id),M=await rn(m),_=await rn(g,m.id);let q,D="surface";if(n.type==="duplicates"){if(N(M)!==N(_)||M.bounds.min.some((z,L)=>Math.abs(z-_.bounds.min[L])>i||Math.abs(M.bounds.max[L]-_.bounds.max[L])>i))continue;await w(M)===await w(_)&&(q=M.bounds.min.map((z,L)=>(z+M.bounds.max[L])/2),D="duplicate")}else{const z=h(M),L=h(_);for(let S=0;S<N(M)&&!q;S++){const O=F(M,S),J=tn(O.flat());for(const K of C(L,J,i)){if(q=cn(O,F(_,K),i,n.touching),q)break;await s()}await s()}if(!q&&M.closed&&_.closed){const S=M.bounds.min.map((O,J)=>(O+M.bounds.max[J])/2);W(S,M,z,i)&&W(S,_,L,i)&&(q=S,D="contained")}if(!q){for(const[S,O,J]of[[M,_,L],[_,M,z]])if(O.closed){for(let K=0;K<N(S)&&!q;K++){const B=F(S,K),ln=B[0].map((Z,$)=>(B[0][$]+B[1][$]+B[2][$])/3);for(const Z of[B[0],ln])if(W(Z,O,J,i)){q=Z,D="contained";break}await s()}if(q)break}}}if(q&&(x.push({id:H,a:k(M),b:k(_),point:q,kind:D,state:"new",note:"",assignee:"",firstSeen:"",lastSeen:""}),x.length>=5e4))throw Error("Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат.")}}return e({phase:"Готово",done:r.length,total:r.length,found:x.length}),x}let dn=0;const X=new Map;self.onmessage=async t=>{if(t.data.request!==void 0){const n=X.get(t.data.request);X.delete(t.data.request),t.data.error?n?.reject(Error(t.data.error)):n?.resolve(t.data.geometry);return}try{const{elements:n,check:e}=t.data,a=await un(n,e,o=>self.postMessage({progress:o}),()=>!1,t.data.streaming?o=>new Promise((i,u)=>{const r=dn++;X.set(r,{resolve:i,reject:u}),self.postMessage({load:o,request:r})}):void 0);self.postMessage({results:a})}catch(n){self.postMessage({error:n instanceof Error?n.message:String(n)})}}})();
`, be = typeof self < "u" && self.Blob && new Blob(["(self.URL || self.webkitURL).revokeObjectURL(self.location.href);", Me], { type: "text/javascript;charset=utf-8" });
function Ne(e) {
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
const D = (e) => String(e ?? "").replace(
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
function $e(e, t) {
  const i = D;
  return `<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${i(e.name)}</title><style>body{font:14px/1.5 system-ui;margin:24px;background:#171c23;color:#e6edf5}h1{margin:0}small{color:#a9b7c8}input,select{padding:10px;margin:15px 8px 15px 0;max-width:100%;background:#242e3b;color:inherit;border:1px solid #506074;border-radius:6px}.wrap{overflow:auto}table{border-collapse:separate;border-spacing:0;width:100%}td,th{padding:10px;border-bottom:1px solid #39475a;min-width:100px;vertical-align:top;overflow-wrap:anywhere}th{background:#253142;position:sticky;top:0;text-align:left;white-space:normal}td{max-width:350px}tr[hidden]{display:none}.shot{display:block;width:260px;border:0;background:transparent;padding:0;cursor:zoom-in}dialog{width:min(94vw,1400px);border:1px solid #506074;background:#20242b;color:white;border-radius:10px}dialog img{max-width:100%;max-height:80vh;display:block;margin:12px auto}dialog::backdrop{background:#000b}.shot img{width:100%;border-radius:6px}.legend{margin:12px 0}.red{color:#ff6161}.blue{color:#65baff}@media print{input,select{display:none}body{background:white;color:black}.wrap{overflow:visible}th{position:static;background:#eee}}</style><h1>${i(e.name)}</h1><small>НашеПО · Проверки коллизий · ${i(e.lastRun || "")} · ${e.status === "stale" ? "Результат устарел" : "Последний завершённый расчёт"}</small><p>${i(e.type === "duplicates" ? "Совпадение треугольной геометрии" : "Пересечения поверхностей и вложенность замкнутых тел")}. Точность: ${i(e.precision)} мм.</p><p class="legend"><span class="red">● Элемент А — красный</span> · <span class="blue">● Элемент Б — синий</span></p><input id="search" type="search" placeholder="Поиск по всему отчёту"><select id="state"><option value="">Все состояния</option>${Object.entries(
    X
  ).map(([n, a]) => `<option value="${n}">${a}</option>`).join(
    ""
  )}</select><span id="count"></span><div class="wrap"><table><thead><tr>${["Снимок", "№", "Состояние", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "X", "Y", "Z", "Назначение", "Комментарий"].map((n) => `<th>${n}</th>`).join("")}</tr></thead><tbody>${t.map((n, a) => `<tr data-state="${n.state}"><td>${se(n.image) ? `<button class="shot" type="button"><img src="${n.image}" alt="Снимок конфликта ${a + 1}" loading="lazy"></button>` : "Снимок отсутствует"}</td>${[a + 1, X[n.state], n.a.name, n.a.model, n.a.guid, n.b.name, n.b.model, n.b.guid, ...n.point.map((s) => s.toFixed(4)), n.assignee, n.note].map((s) => `<td>${i(s)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><dialog id="picture"><button id="close-picture">Закрыть</button><img id="full-picture" alt="Снимок конфликта"></dialog><script>const modal=document.getElementById("picture");document.getElementById("close-picture").onclick=()=>modal.close();for(const b of document.querySelectorAll(".shot"))b.onclick=()=>{document.getElementById("full-picture").src=b.querySelector("img").src;modal.showModal()};const q=document.getElementById('search'),s=document.getElementById('state'),rows=[...document.querySelectorAll('tbody tr')];function filter(){let n=0;for(const r of rows){r.hidden=!!((s.value&&r.dataset.state!==s.value)||!r.textContent.toLowerCase().includes(q.value.toLowerCase()));if(!r.hidden)n++}document.getElementById('count').textContent='Коллизий: '+n}q.oninput=s.onchange=filter;filter()<\/script></html>`;
}
function qe(e, t) {
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
const Re = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAydpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAzIDc5Ljk2OTBhODdmYywgMjAyNS8wMy8wNi0yMDo1MDoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDZFQkU2NEQ4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDZFQkU2NEM4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI2LjExIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRENDVBNjQzODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRENDVBNjQ0ODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+pHX+ogAAD+lJREFUeNrs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", Ue = ":host{display:block;height:100%;color-scheme:dark;font:13px/1.4 Segoe UI,sans-serif;color:#dbe5f0;container-type:size}*{box-sizing:border-box}[hidden]{display:none!important}main{height:100%;min-height:260px;background:#171d25;display:flex;flex-direction:column;overflow:hidden}button,input,select,textarea{font:inherit;color:inherit;border:1px solid #425165;border-radius:6px;background:#253140;padding:7px 9px;min-width:0}button{cursor:pointer;white-space:nowrap}button:hover{background:#354459}button:disabled{opacity:.45;cursor:default}.primary{background:#b99a38;border-color:#d0ae46;color:#111820;font-weight:600}.primary:hover{background:#e0bd51}button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid #f2c94c;outline-offset:1px}input,select,textarea{background:#111a24}input[type=checkbox]{accent-color:#e6c354;width:16px;height:16px}header{display:flex;gap:7px;align-items:center;padding:8px 12px;border-bottom:1px solid #354459;flex-shrink:0;overflow-x:auto}.brand{display:flex;gap:7px;align-items:center;margin-right:8px}.brand img{width:32px;height:32px;object-fit:contain}.brand b{font-size:17px}.brand small{font-size:10px;color:#a6b5c7}#dirty{margin-left:auto;font-size:11px;color:#cabb81;white-space:nowrap}.notice{background:#1c2735;padding:5px 12px;font-size:12px;min-height:27px;max-height:70px;overflow:auto;color:#a7bbd1}.notice.error{color:#ffaaa1;background:#412725}.workspace{display:grid;grid-template-columns:230px minmax(0,1fr);flex:1;min-height:0}aside{padding:10px;display:flex;flex-direction:column;gap:9px;border-right:1px solid #354459;min-height:0}#checks{overflow:auto;flex:1;min-height:0}.check-item{display:flex;flex-direction:column;gap:5px;width:100%;margin-bottom:5px;text-align:left;white-space:normal}.check-item small{color:#a8b7ca}.check-item.active,.tabs .active{border-color:#c7ab56;background:#403b2c;color:#ffe399}.main{display:flex;flex-direction:column;min-width:0;min-height:0}.test-toolbar{display:flex;gap:7px;padding:8px 12px;align-items:center}.test-toolbar input{flex:1;font-weight:600}.tabs{display:flex;gap:7px;border-bottom:1px solid #354459;padding:0 12px 8px}.tabs button{min-width:105px}#content{flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column}.empty{padding:28px;color:#a4b4c9;text-align:center;margin:auto}h2,h3,p{margin:0 0 10px}h2{font-size:20px}h3{font-size:15px}label{display:flex;flex-direction:column;gap:5px;font-size:12px;color:#b8c6d7}.check{flex-direction:row;align-items:center;gap:6px}small{font-size:11px;color:#a8b7c9}.parameters{display:flex;gap:18px;align-items:end;padding:10px 12px}.parameters input{width:140px}.selection-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0 12px 12px}.selection{border:1px solid #39495e;border-radius:8px;padding:12px;background:#1b2633;min-width:0}.selection h3{display:flex;justify-content:space-between}.selection h3 span{color:#92c4b2;font-size:12px}.selection select[multiple]{width:100%;min-height:70px}.selection-tools{display:flex;gap:5px;flex-wrap:wrap;margin:8px 0}.selection-tools button{font-size:11px;padding:5px 7px}.selection>label{margin-bottom:8px}.condition{display:grid;grid-template-columns:minmax(80px,1fr) 100px minmax(70px,1fr) 29px;gap:5px;margin:6px 0}.condition button{padding:3px}.rules,.report{padding:18px;max-width:850px}.rules>label{margin:14px 0}.rules>p,.report>p{color:#a9b8cb}.report>button{margin:12px 8px 14px 0}.result-tools{display:flex;gap:7px;flex-wrap:wrap;padding:8px 12px}.result-tools input{flex:1;min-width:180px}.result-area{display:grid;grid-template-columns:minmax(0,1fr) 300px;flex:1;min-height:0}.table-area{display:flex;flex-direction:column;min-width:0;min-height:0}.scroll{overflow:auto;flex:1;min-height:0}table{border-collapse:separate;border-spacing:0;width:max-content;min-width:100%}th{position:sticky;top:0;background:#2a3748;z-index:1;text-align:left;max-width:240px;white-space:normal}th,td{padding:8px;border-bottom:1px solid #344154;vertical-align:top}td{max-width:320px;min-width:90px;overflow-wrap:anywhere;-webkit-user-select:text;user-select:text}td:first-child{min-width:36px}tr.active td{background:#453e29;color:#fff0b5}tr:hover td{background:#2c3847}.pager{display:flex;gap:10px;align-items:center;justify-content:center;padding:5px;border-top:1px solid #39495e;font-size:11px}.pager button{padding:2px 8px}.detail{border-left:1px solid #354459;padding:10px;overflow:auto}.detail h3{overflow-wrap:anywhere}.detail>label{margin:10px 0}.detail p{font:11px/1.5 Consolas,monospace}.detail details{border-top:1px solid #354459;padding:8px 0}summary{cursor:pointer}dl{font-size:11px;display:grid;grid-template-columns:1fr 1fr;gap:7px}dt,dd{overflow-wrap:anywhere;margin:0}dt{color:#9baec4}footer{border-top:1px solid #354459;padding:4px 12px;display:flex;justify-content:space-between;color:#91a4bb;font-size:11px}dialog{border:1px solid #53647c;border-radius:12px;background:#202c3a;color:#dbe5f0;width:min(700px,92vw);max-height:85vh;padding:20px;box-shadow:0 15px 60px #000a}dialog::backdrop{background:#000a}dialog p{margin:12px 0}dialog a{color:#f2c94c;margin-right:12px}@container (max-width:950px){.workspace{grid-template-columns:185px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 240px}.selection-grid{grid-template-columns:1fr}.parameters,.test-toolbar{flex-wrap:wrap}.test-toolbar input{flex-basis:100%}}@container (max-height:400px){header{padding:5px 10px}.test-toolbar{padding:5px 10px}.tabs{padding-bottom:5px}.brand img{width:25px;height:25px}footer{display:none}}:host{font-size:14px}.brand img{background:#e1e7ef;border-radius:5px;padding:3px}.selection-tools button{font-size:12px}label{font-size:13px}.choose-layout{display:grid;grid-template-columns:220px minmax(0,1fr);min-height:0;flex:1;overflow:auto}.choose-layout .parameters{display:flex;flex-direction:column;align-items:stretch;gap:15px;border-right:1px solid #354459;justify-content:flex-start}.choose-layout .parameters input{width:100%}.choose-layout .parameters input[type=checkbox]{width:16px}.choose-layout .selection-grid{padding:10px 12px;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start;min-width:0}.selection select[multiple]{height:180px;resize:vertical}.selection-mode{font-size:12px;color:#b6c4d5}.legend{display:flex;gap:12px;flex-wrap:wrap;font-family:inherit!important}.part-a{color:#ff6161}.part-b{color:#65baff}.preview{display:block;width:100%;padding:5px;margin:8px 0}.preview img{display:block;width:100%;max-height:180px;object-fit:contain}.image-dialog{width:94vw;max-width:1500px}.image-dialog img{display:block;max-width:100%;max-height:75vh;margin:10px auto}#help-dialog{width:min(1000px,94vw);line-height:1.6}#help-dialog details{padding:12px 0;border-bottom:1px solid #425165}#help-dialog summary{font-size:16px;font-weight:600;color:#f0d27a}#help-dialog li{margin:8px 0}@container (max-width:1100px){.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .selection-grid{grid-template-columns:1fr}.condition{grid-template-columns:minmax(60px,1fr) 100px minmax(60px,1fr) 29px}}@container (max-width:700px){.choose-layout{display:block}.choose-layout .parameters{border-right:0;border-bottom:1px solid #354459}.workspace{grid-template-columns:160px minmax(0,1fr)}}", G = { format: "nashepo.checks", version: 1, checks: [] };
function Be(e, t) {
  const i = e.shadowRoot || e.attachShadow({ mode: "open" });
  let n, a = G.checks[0]?.id || "", s = "select", p = "", d = 0, m = !1, u = !1, c, g = !0, x = !1;
  const w = /* @__PURE__ */ new Set();
  let y;
  const v = () => G.checks.find((o) => o.id === a), f = (o) => i.querySelector("#" + o);
  i.innerHTML = `<style>${Ue}</style><main><header><div class="brand"><img src="${Re}" alt=""><b>НашеПО</b><small>0.2.0</small></div><button id="scan">Обновить модели</button><button id="new" class="primary">＋ Проверка</button><button id="open">Открыть проверки</button><button id="save">Сохранить проверки</button><button id="settings">⚙</button><button id="help">Справка</button><span id="dirty"></span></header><div class="notice" id="notice" role="status">Откройте IFC/SMDX в проекте и нажмите «Обновить модели».</div><div class="workspace"><aside><input id="test-search" type="search" placeholder="Поиск проверок"><div id="checks"></div><button id="all">Запустить все</button></aside><section class="main"><div class="test-toolbar"><input id="name" aria-label="Имя проверки" placeholder="Имя проверки"><button id="copy">Копировать</button><button id="delete">Удалить</button><button id="run" class="primary">▶ Запустить</button><button id="cancel" hidden>Остановить</button></div><div id="tabs" class="tabs">${[
    ["rules", "Правила"],
    ["select", "Выбрать"],
    ["results", "Результаты"],
    ["report", "Отчёт"]
  ].map(([o, r]) => `<button data-tab="${o}">${r}</button>`).join(
    ""
  )}</div><div id="content"></div></section></div><footer><span id="model-count">Модели не прочитаны</span><span>Расчёт выполняется на вашем компьютере</span></footer><input id="file" type="file" accept=".json" hidden><dialog id="settings-dialog"><h2>Настройки</h2><label>Дистанция камеры, м<input id="distance" type="number" value="15" min="0.5"></label><p class="links"><a href="https://nashepo.ru/" target="_blank" rel="noopener noreferrer">Сайт НашеПО</a><a href="https://t.me/RoburFan" target="_blank" rel="noopener noreferrer">Telegram</a></p><button data-close="settings-dialog">Закрыть</button></dialog><dialog id="help-dialog">${ke}<button data-close="help-dialog">Закрыть</button></dialog></main>`;
  const C = (o, r = !1) => {
    f("notice").textContent = o, f("notice").classList.toggle("error", r);
  }, P = async (o) => {
    try {
      await o();
    } catch (r) {
      C(r instanceof Error ? r.message : String(r), !0);
    }
  }, z = () => {
    x = !0, f("dirty").textContent = "Есть несохранённые изменения";
  }, W = () => {
    const o = v();
    o?.lastRun && (o.status = "stale"), z(), k();
  }, T = () => [
    ...new Set(
      (n?.elements || []).flatMap((o) => Object.keys(o.properties))
    )
  ].sort(), O = (o, r) => o.map(
    (l) => `<option value="${D(l)}" ${l === r ? "selected" : ""}>${D(l)}</option>`
  ).join("");
  function M() {
    const o = v(), r = f("result-search")?.value.toLowerCase() || "", l = f("result-state")?.value || "";
    return (o?.results || []).filter(
      (h) => (!l || h.state === l) && (!r || JSON.stringify({ ...h, image: void 0 }).toLowerCase().includes(r))
    );
  }
  function k() {
    const o = f("test-search").value.toLowerCase();
    f("checks").innerHTML = G.checks.filter((r) => r.name.toLowerCase().includes(o)).map(
      (r) => `<button class="check-item ${r.id === a ? "active" : ""}" data-check="${r.id}"><strong>${D(r.name)}</strong><small>${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[r.status]} · ${r.results.filter((l) => !["resolved", "excluded"].includes(l.state)).length} в работе / ${r.results.length}</small></button>`
    ).join("");
  }
  function L(o, r) {
    const l = n?.elements.filter(
      (h) => (v().includeHidden || !h.hidden) && re(h, o)
    ).length || 0;
    return `<article class="selection" data-side="${r}"><h3>Выбор ${r.toUpperCase()} <span>${l} элементов</span></h3><p class="selection-mode">${o.manualOnly ? "Ручная выборка — только указанные элементы" : "Автоматическая выборка — модели и условия"}</p><label>Модели (Ctrl — несколько; без выбора — все)<select multiple size="8" class="models">${(n?.models || []).map((h) => `<option value="${D(h.id)}" ${o.models.includes(h.id) ? "selected" : ""}>${D(h.name)}</option>`).join("")}</select></label><div class="selection-tools"><button data-selection="show">Показать выборку</button><button data-selection="only">Только выделенные</button><button data-selection="include">＋ Добавить выделенные</button><button data-selection="exclude">− Исключить выделенные</button><button data-selection="reset">Вернуть автоматический выбор</button></div><small>Добавлено вручную: ${o.include.length} · исключено: ${o.exclude.length}</small><label>Условия<select class="mode"><option value="all" ${o.mode === "all" ? "selected" : ""}>Выполнены все (И)</option><option value="any" ${o.mode === "any" ? "selected" : ""}>Выполнено любое (ИЛИ)</option></select></label><div class="conditions">${o.conditions.map(
      (h, j) => `<div class="condition" data-condition="${j}"><input class="field" list="property-fields" value="${D(h.field)}" placeholder="Свойство"><select class="op">${[
        ["eq", "равно"],
        ["contains", "содержит"],
        ["ne", "не равно"],
        ["exists", "существует"],
        ["gt", "больше"],
        ["lt", "меньше"]
      ].map(
        ([E, b]) => `<option value="${E}" ${h.op === E ? "selected" : ""}>${b}</option>`
      ).join(
        ""
      )}</select><input class="value" value="${D(h.value)}" placeholder="Значение" ${h.op === "exists" ? "disabled" : ""}><button data-remove="${j}" aria-label="Удалить условие">×</button></div>`
    ).join(
      ""
    )}</div><button data-selection="add">＋ Условие</button></article>`;
  }
  function S() {
    k();
    const o = v();
    f("name").value = o?.name || "";
    for (const r of ["name", "copy", "delete", "run"])
      f(r).disabled = !o || m;
    for (const r of i.querySelectorAll("[data-tab]"))
      r.classList.toggle("active", r.dataset.tab === s);
    if (!o) {
      f("content").innerHTML = '<div class="empty"><h2>Создайте первую проверку</h2><p>Обновите модели, затем выберите, какие элементы проверять друг с другом.</p></div>';
      return;
    }
    s === "select" && (f("content").innerHTML = `<div class="choose-layout"><div class="parameters"><h3>Параметры проверки</h3><label>Тип<select id="type"><option value="intersection" ${o.type === "intersection" ? "selected" : ""}>По пересечению</option><option value="duplicates" ${o.type === "duplicates" ? "selected" : ""}>Дублирование</option></select></label><label title="Числовая точность; не глубина проникновения">Точность расчёта, мм<input id="precision" type="number" value="${o.precision}" min="0.001" max="100" step="0.1"></label><label class="check"><input id="touching" type="checkbox" ${o.touching ? "checked" : ""} ${o.type === "duplicates" ? "disabled" : ""}>Учитывать касания</label><small>Касание — соприкосновение поверхностей без проникновения. Обычно выключено.</small><p class="legend"><span class="part-a">● А — красный</span><span class="part-b">● Б — синий</span></p></div><div class="selection-grid">${L(o.a, "a")}${L(o.b, "b")}</div></div><datalist id="property-fields">${O(T(), "")}</datalist>`), s === "rules" && (f("content").innerHTML = `<div class="rules"><h3>Исключение пар</h3><p>Элемент сам с собой не проверяется. Пара А/Б учитывается один раз.</p><label class="check"><input id="same-model" type="checkbox" ${o.ignoreSameModel ? "checked" : ""}>Не проверять элементы одной модели</label><label class="check"><input id="same-group" type="checkbox" ${o.ignoreSameGroup ? "checked" : ""}>Не проверять геометрию одного составного объекта</label><label>Не проверять пары с одинаковым значением свойства<input id="equal-property" list="property-fields" value="${D(o.equalProperty)}" placeholder="Без ограничения"></label><label class="check"><input id="hidden" type="checkbox" ${o.includeHidden ? "checked" : ""}>Включать скрытые элементы прочитанных моделей</label><p>Незагруженные подключённые файлы нужно открыть перед расчётом.</p><datalist id="property-fields">${O(T(), "")}</datalist></div>`), s === "results" && (f("content").innerHTML = `<div class="result-tools"><input id="result-search" type="search" placeholder="Поиск по результатам"><select id="result-state"><option value="">Все состояния</option>${Object.entries(
      X
    ).map(([r, l]) => `<option value="${r}">${l}</option>`).join(
      ""
    )}</select><button id="show-markers" role="switch" aria-checked="${g}">${g ? "● Знаки включены" : "○ Знаки выключены"}</button><select id="bulk-state">${Object.entries(
      X
    ).map(([r, l]) => `<option value="${r}">${l}</option>`).join(
      ""
    )}</select><button id="bulk">Применить к выбранным</button></div><div class="result-area"><div class="table-area"><div class="scroll" id="table"></div><div class="pager"><button id="prev-page">←</button><span id="page"></span><button id="next-page">→</button><span id="selection-count"></span></div></div><div class="detail" id="detail"></div></div>`, B(), A()), s === "report" && (f("content").innerHTML = `<div class="report"><h3>${D(o.name)}</h3><p>Результатов: ${o.results.length}. Выбрано: ${w.size}. ${o.status === "stale" ? "Результаты устарели — рекомендуется повторный запуск." : ""}</p><label class="check"><input id="selected-only" type="checkbox" ${w.size ? "checked" : ""}>Только выбранные строки</label><label class="check"><input id="report-images" type="checkbox" checked>Добавить снимки (недостающие будут созданы автоматически)</label><button id="export-html" class="primary">Сформировать HTML-отчёт</button><button id="export-viewer">Сессия для плагина «Коллизии»</button><p>Правила и все результаты сохраняются кнопкой «Сохранить проверки» в верхней панели.</p></div>`), f("content").inert = m;
  }
  function B() {
    const o = M(), r = Math.max(1, Math.ceil(o.length / 50));
    d = Math.max(0, Math.min(d, r - 1));
    const l = o.slice(d * 50, d * 50 + 50);
    f("table").innerHTML = o.length ? `<table><thead><tr><th><input id="check-page" type="checkbox" aria-label="Выбрать страницу" ${l.every((h) => w.has(h.id)) ? "checked" : ""}></th>${["№", "Состояние", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "Комментарий"].map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${l.map((h, j) => `<tr data-result="${D(h.id)}" class="${h.id === p ? "active" : ""}"><td><input type="checkbox" class="row-check" aria-label="Выбрать конфликт" ${w.has(h.id) ? "checked" : ""}></td>${[d * 50 + j + 1, X[h.state], h.a.name, h.a.model, h.a.guid || "—", h.b.name, h.b.model, h.b.guid || "—", h.note].map((E) => `<td title="${D(E)}">${D(E)}</td>`).join("")}</tr>`).join("")}</tbody></table>` : '<div class="empty">Нет результатов. Запустите проверку или измените фильтры.</div>', f("page").textContent = `Страница ${d + 1} из ${r} · ${o.length} результатов`, f("selection-count").textContent = `Выбрано: ${w.size}`, f("prev-page").disabled = d === 0, f("next-page").disabled = d === r - 1;
  }
  function A() {
    const o = v()?.results.find((r) => r.id === p);
    f("detail").innerHTML = o ? `<h3>${D(o.a.name)} × ${D(o.b.name)}</h3><p class="legend"><span class="part-a">● А — красный</span><span class="part-b">● Б — синий</span></p>${o.image ? `<button id="open-image" class="preview"><img src="${D(o.image)}" alt="Снимок коллизии"><span>Открыть крупнее</span></button>` : ""}<button id="capture-image">Сохранить текущий ракурс</button><div class="selection-tools"><button id="focus" class="primary">Перейти в 3D</button><button id="previous">←</button><button id="next">→</button></div><p>${o.point.map((r, l) => `${["X", "Y", "Z"][l]}: ${r.toFixed(4)}`).join(" · ")}</p><label>Состояние<select id="edit-state">${Object.entries(
      X
    ).map(
      ([r, l]) => `<option value="${r}" ${o.state === r ? "selected" : ""}>${l}</option>`
    ).join(
      ""
    )}</select></label><label>Назначение<input id="assignee" value="${D(o.assignee)}"></label><label>Комментарий<textarea id="note" rows="3">${D(o.note)}</textarea></label>${[
      o.a,
      o.b
    ].map(
      (r, l) => `<details><summary>Элемент ${l ? "Б" : "А"} · свойства</summary><dl>${Object.entries(
        r.properties
      ).map(([h, j]) => `<dt>${D(h)}</dt><dd>${D(j)}</dd>`).join("")}</dl></details>`
    ).join("")}` : "<p>Выберите конфликт в таблице.</p>";
  }
  function N() {
    t.markers(
      M(),
      p,
      g,
      (o) => P(() => $(o, !0))
    );
  }
  function $(o, r = !1) {
    if (!m) {
      if (p = o, s === "results") {
        for (const l of i.querySelectorAll("[data-result]"))
          l.classList.toggle("active", l.dataset.result === o);
        A();
      }
      if (N(), r) {
        const l = v()?.results.find((h) => h.id === o);
        l && t.focus(l, Number(f("distance").value));
      }
    }
  }
  async function V() {
    n = await t.scan(C, () => u), f("model-count").textContent = `Моделей: ${n.models.length} · элементов: ${n.elements.length}`;
    for (const o of G.checks)
      o.fingerprint && o.fingerprint !== n.fingerprint && (o.status = "stale");
    S(), C(
      n.warnings.length ? n.warnings.join(" ") : "Модели прочитаны. Настройте выборки и запустите проверку.",
      !!n.warnings.length
    );
  }
  const R = (o) => {
    m = o;
    for (const r of [
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
      f(r).disabled = o;
    f("cancel").hidden = !o, f("content").inert = o, f("checks").inert = o;
  };
  async function Q(o) {
    const r = (h) => C(`${o.name} · ${h.phase} ${h.done}/${h.total} · найдено ${h.found}`);
    let l;
    try {
      l = new Ne();
    } catch {
      return ze(
        n.elements,
        o,
        r,
        () => u,
        (h) => t.geometry(h, () => u)
      );
    }
    return c = l, new Promise((h, j) => {
      const E = () => {
        l.terminate(), c = void 0, y = void 0;
      };
      y = () => {
        E(), j(Error("Расчёт отменён. Предыдущие результаты сохранены."));
      }, l.onmessage = async (b) => {
        if (b.data.load) {
          try {
            const I = await t.geometry(
              b.data.load,
              () => u || c !== l
            );
            if (c !== l) return;
            const H = [
              I.vertices?.buffer,
              I.indices?.buffer
            ].filter(Boolean);
            l.postMessage(
              { request: b.data.request, geometry: I },
              H
            );
          } catch (I) {
            c === l && l.postMessage({
              request: b.data.request,
              error: I instanceof Error ? I.message : String(I)
            });
          }
          return;
        }
        b.data.progress ? r(b.data.progress) : (E(), b.data.error ? j(Error(b.data.error)) : h(b.data.results));
      }, l.onerror = (b) => {
        E(), j(
          Error(
            `Не удалось запустить расчёт в фоновом потоке: ${b.message || "ошибка загрузки"}`
          )
        );
      }, l.postMessage({
        elements: n.elements,
        streaming: typeof t.geometry == "function",
        check: structuredClone({ ...o, results: [], warnings: [] })
      });
    });
  }
  async function q(o = !1) {
    if (m) return;
    const r = o ? [...G.checks] : [v()].filter(Boolean);
    if (!r.length) throw Error("Создайте проверку.");
    u = !1, R(!0);
    try {
      if (await V(), R(!0), n.warnings.length)
        throw Error(
          "Состав моделей прочитан не полностью. " + n.warnings.join(" ")
        );
      for (const l of r) {
        if (u) break;
        for (const b of [l.a, l.b]) {
          if (b.models.some((I) => !n.models.some((H) => H.id === I)))
            throw Error(
              `${l.name}: одна из моделей выборки отсутствует. Исправьте выборку.`
            );
          if (b.include.some((I) => !n.elements.some((H) => H.id === I)))
            throw Error(
              `${l.name}: вручную добавленный элемент отсутствует в модели.`
            );
        }
        const h = Se(l);
        if (l.configAtRun === h && l.modelsAtRun?.some(
          (b) => !n.models.some((I) => I.id === b)
        ))
          throw Error(
            `${l.name}: состав моделей уменьшился. Подключите прежние модели или создайте копию проверки для нового состава. Прежние результаты сохранены.`
          );
        const j = await Q(l);
        if (u || !t.isCurrent())
          throw Error(
            "Проект изменился или расчёт отменён. Предыдущие результаты сохранены."
          );
        const E = (/* @__PURE__ */ new Date()).toISOString();
        l.results = Ee(
          l.configAtRun === h ? l.results : [],
          j,
          E
        ), l.lastRun = E, l.fingerprint = n.fingerprint, l.configAtRun = h, l.modelsAtRun = n.models.map((b) => b.id), l.status = "done", l.warnings = [], a = l.id, p = l.results[0]?.id || "", w.clear(), z();
      }
      s = "results", S(), N(), C(
        `Проверка завершена. ${v()?.results.length || 0} результатов. Сохраните проверки для продолжения работы.`
      );
    } finally {
      R(!1), S();
    }
  }
  function Z(o) {
    const r = o.closest("[data-side]")?.dataset.side;
    if (!r) return;
    const l = v()[r], h = o.closest("[data-condition]")?.dataset.condition, j = o;
    if (j.classList.contains("models") && (l.manualOnly = !1), j.classList.contains("models") && (l.models = Array.from(o.selectedOptions).map(
      (E) => E.value
    )), j.classList.contains("mode") && (l.mode = j.value), h !== void 0) {
      const E = l.conditions[Number(h)];
      j.classList.contains("field") && (E.field = j.value), j.classList.contains("op") && (E.op = j.value), j.classList.contains("value") && (E.value = j.value);
    }
    W(), S();
  }
  f("new").onclick = () => {
    const o = je();
    o.name = `Проверка ${G.checks.length + 1}`, G.checks.push(o), a = o.id, s = "select", p = "", w.clear(), z(), S();
  }, f("scan").onclick = () => P(async () => {
    u = !1, R(!0);
    try {
      await V();
    } finally {
      R(!1), S();
    }
  }), f("run").onclick = () => P(() => q()), f("all").onclick = () => P(() => q(!0)), f("cancel").onclick = () => {
    u = !0, y?.();
  }, f("test-search").oninput = k, f("checks").onclick = (o) => {
    const r = o.target.closest(
      "[data-check]"
    );
    r && !m && (t.clear(), a = r.dataset.check, p = "", w.clear(), d = 0, S());
  }, f("tabs").onclick = (o) => {
    const r = o.target.closest("[data-tab]");
    r && !m && (s = r.dataset.tab, S());
  }, f("name").onchange = () => {
    const o = v();
    o && (o.name = f("name").value.trim() || "Проверка", z(), k());
  }, f("copy").onclick = () => {
    const o = v();
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
    }), G.checks.push(r), a = r.id, p = "", w.clear(), z(), S();
  }, f("delete").onclick = () => {
    v() && confirm(`Удалить проверку «${v().name}» и её результаты?`) && (G.checks = G.checks.filter((o) => o.id !== a), a = G.checks[0]?.id || "", w.clear(), t.clear(), z(), S());
  }, f("save").onclick = () => {
    xe("НашеПО-проверки.json", JSON.stringify(G, null, 2)), x = !1, f("dirty").textContent = "Файл проверок сохранён";
  }, f("open").onclick = () => f("file").click(), f("file").onchange = () => P(async () => {
    const o = f("file").files?.[0];
    if (!o) return;
    const r = Ce(await o.text());
    x && !confirm("Заменить текущие несохранённые проверки данными из файла?") || (G.checks = r.checks, a = G.checks[0]?.id || "", p = "", w.clear(), t.clear(), x = !1, f("dirty").textContent = "Проверки открыты", S(), C("Проверки открыты. Обновите модели перед переходом к элементам."), f("file").value = "");
  });
  for (const o of ["settings", "help"])
    f(o).onclick = () => f(o + "-dialog").showModal();
  for (const o of i.querySelectorAll("[data-close]"))
    o.onclick = () => f(o.dataset.close).close();
  f("content").onchange = (o) => P(() => {
    const r = o.target, l = v();
    if (!l) return;
    if (r.closest("[data-side]")) {
      Z(r);
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
    ].includes(r.id)) {
      if (r.id === "precision") {
        const j = Number(r.value);
        if (!Number.isFinite(j) || j < 1e-3 || j > 100)
          throw r.value = String(l.precision), Error("Точность должна быть от 0,001 до 100 мм.");
        l.precision = j;
      }
      r.id === "type" && (l.type = r.value), r.id === "touching" && (l.touching = r.checked), r.id === "same-model" && (l.ignoreSameModel = r.checked), r.id === "same-group" && (l.ignoreSameGroup = r.checked), r.id === "hidden" && (l.includeHidden = r.checked), r.id === "equal-property" && (l.equalProperty = r.value), W(), S();
      return;
    }
    if (r.id === "result-state") {
      d = 0, B();
      return;
    }
    if (r.id === "check-page") {
      for (const j of M().slice(d * 50, d * 50 + 50))
        r.checked ? w.add(j.id) : w.delete(j.id);
      B();
      return;
    }
    if (r.classList.contains("row-check")) {
      const j = r.closest("[data-result]").dataset.result;
      r.checked ? w.add(j) : w.delete(j), f("selection-count").textContent = `Выбрано: ${w.size}`;
      return;
    }
    const h = l.results.find((j) => j.id === p);
    h && (r.id === "edit-state" && (h.state = r.value, B(), k(), N()), r.id === "assignee" && (h.assignee = r.value), r.id === "note" && (h.note = r.value, B()), z());
  }), f("content").oninput = (o) => {
    o.target.id === "result-search" && (d = 0, B());
  }, f("content").onclick = (o) => P(async () => {
    const r = o.target, l = r.closest("button"), h = v();
    if (!h) return;
    if (l?.dataset.selection || l?.dataset.remove !== void 0) {
      const E = l.closest("[data-side]").dataset.side, b = h[E];
      if (l.dataset.remove !== void 0)
        b.conditions.splice(Number(l.dataset.remove), 1);
      else
        switch (l.dataset.selection) {
          case "add":
            b.conditions.push({ field: "Имя", op: "contains", value: "" });
            break;
          case "show":
            t.select(
              (n?.elements || []).filter(
                (I) => (h.includeHidden || !I.hidden) && re(I, b)
              ).map((I) => I.id)
            );
            return;
          case "only": {
            const I = t.selected();
            if (!I.length) throw Error("Выделите элементы в 3D-сцене.");
            b.include = I, b.exclude = [], b.manualOnly = !0;
            break;
          }
          case "include": {
            const I = t.selected();
            if (!I.length) throw Error("Выделите элементы в 3D-сцене.");
            b.include = [.../* @__PURE__ */ new Set([...b.include, ...I])], b.exclude = b.exclude.filter((H) => !I.includes(H));
            break;
          }
          case "exclude": {
            const I = t.selected();
            if (!I.length) throw Error("Выделите элементы в 3D-сцене.");
            b.exclude = [.../* @__PURE__ */ new Set([...b.exclude, ...I])], b.include = b.include.filter((H) => !I.includes(H));
            break;
          }
          case "reset":
            b.manualOnly = !1, b.include = [], b.exclude = [];
        }
      W(), S();
      return;
    }
    if (l?.id === "prev-page" && (d--, B()), l?.id === "next-page" && (d++, B()), l?.id === "show-markers" && (g = !g, l.textContent = g ? "● Знаки включены" : "○ Знаки выключены", l.setAttribute("aria-checked", String(g)), N()), l?.id === "bulk") {
      const E = f("bulk-state").value;
      for (const b of h.results) w.has(b.id) && (b.state = E);
      z(), B(), A(), k(), N();
    }
    if (l?.id === "capture-image") {
      const E = h.results.find((b) => b.id === p);
      if (E) {
        u = !1, R(!0);
        try {
          E.image = await t.snapshot(
            E,
            Number(f("distance").value),
            () => u,
            !0
          ), z(), A(), C("Снимок сохранён в результат.");
        } finally {
          R(!1);
        }
      }
      return;
    }
    if (l?.id === "open-image") {
      const E = h.results.find((b) => b.id === p);
      if (E?.image) {
        const b = document.createElement("dialog");
        b.className = "image-dialog", b.innerHTML = '<button>Закрыть</button><img alt="Снимок коллизии">', b.querySelector("img").src = E.image, b.querySelector("button").onclick = () => {
          b.close(), b.remove();
        }, i.append(b), b.showModal();
      }
      return;
    }
    if (l?.id === "focus" && $(p, !0), l?.id === "previous" || l?.id === "next") {
      const E = M(), b = E.findIndex((I) => I.id === p) + (l.id === "next" ? 1 : -1);
      E[b] && (d = Math.floor(b / 50), B(), $(E[b].id, !0));
    }
    if (l?.id === "export-html" || l?.id === "export-viewer") {
      const E = f("selected-only").checked ? h.results.filter((I) => w.has(I.id)) : h.results;
      if (!E.length) throw Error("Нет результатов для отчёта.");
      if (f("report-images").checked) {
        const I = t.view, H = I?.storeView();
        u = !1, R(!0);
        try {
          let oe = 0;
          for (const _ of E) {
            if (u)
              throw Error(
                "Подготовка отчёта отменена. Уже полученные снимки сохранены."
              );
            if (C("Подготовка снимков: " + ++oe + " / " + E.length), !_.image) {
              if (_.state === "resolved" && !t.canLocate(_)) continue;
              _.image = await t.snapshot(
                _,
                Number(f("distance").value),
                () => u
              ), z();
            }
          }
        } finally {
          if (I && t.isCurrent()) {
            const oe = h.results.find((_) => _.id === p);
            if (oe)
              try {
                t.focus(
                  oe,
                  Number(f("distance").value),
                  !1
                );
              } catch {
              }
            H && I.restoreView(H);
          }
          R(!1);
        }
      }
      const b = f("report-images").checked ? E : E.map((I) => ({ ...I, image: void 0 }));
      xe(
        h.name + (l.id === "export-html" ? ".html" : ".collision360.json"),
        l.id === "export-html" ? $e(h, b) : qe(h, b)
      ), C(
        "Отчёт подготовлен. Результатов: " + E.length + "; со снимками: " + b.filter((I) => I.image).length + "."
      );
    }
    const j = r.closest("[data-result]");
    j && !r.closest("input") && !window.getSelection()?.toString() && $(j.dataset.result);
  }), f("content").ondblclick = (o) => {
    const r = o.target, l = r.closest("[data-result]");
    l && !r.closest("input") && P(() => $(l.dataset.result, !0));
  };
  const U = setInterval(() => {
    if (n && !t.isCurrent()) {
      n = void 0, t.clear();
      for (const o of G.checks) o.lastRun && (o.status = "stale");
      f("model-count").textContent = "Проект изменился", C("Активный проект изменился. Обновите модели."), m || S();
    }
  }, 1500);
  return S(), () => {
    clearInterval(U), u = !0, y?.(), c?.terminate(), t.clear();
  };
}
var fe = /* @__PURE__ */ ((e) => (e.object = "object", e.drawing = "drawing", e.table = "table", e.record = "record", e.textStyle = "textstyle", e.textStyleTable = "textstyles", e.linetype = "linetype", e.linetypeTable = "linetypes", e.layer = "layer", e.layerTable = "layers", e.block = "block", e.blockTable = "blocks", e.layout = "layout", e.layoutTable = "layouts", e.type = "type", e.typeTable = "types", e.material = "material", e.materialTable = "materials", e.geometry = "geometry", e.geometryTable = "geometries", e.group = "group", e.groupTable = "groups", e.attachment = "attachment", e.attachmentTable = "attachments", e.entities = "entities", e.entity = "entity", e.line = "l", e.solid = "s", e.insert = "i", e.polyline = "p", e.circle = "c", e.arc = "a", e.polyline3d = "p3", e.proxy = "x", e.text = "t", e.mtext = "mt", e.wipeout = "w", e.model3d = "g", e.alignment = "al", e))(fe || {});
async function De(e, t) {
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
  const s = a[0].getBoundingClientRect();
  if (a.some((u) => {
    const c = u.getBoundingClientRect();
    return Math.abs(c.x - s.x) > 4 || Math.abs(c.y - s.y) > 4;
  }))
    throw Error(
      "Открыто несколько подходящих 3D-окон. Оставьте одно окно для снимка."
    );
  const p = document.createElement("canvas"), d = Math.min(1, 1280 / a[0].width);
  p.width = Math.round(a[0].width * d), p.height = Math.round(a[0].height * d);
  const m = p.getContext("2d");
  m.fillStyle = "#20242b", m.fillRect(0, 0, p.width, p.height), e.repaint();
  for (const u of a)
    m.drawImage(u, 0, 0, p.width, p.height);
  try {
    return p.toDataURL("image/jpeg", 0.82);
  } catch {
    throw Error("Браузер запретил чтение изображения 3D-окна.");
  }
}
const ce = "nashepo.checks.points", Ye = "nashepo.checks.highlight";
function ae(e, t, i, n = 0) {
  if (n > 12 || e == null) return;
  if (typeof e != "object") {
    i[t] = String(e);
    return;
  }
  if (Array.isArray(e)) {
    e.forEach((s, p) => ae(s, `${t}[${p}]`, i, n + 1));
    return;
  }
  const a = e;
  if ("$value" in a) {
    ae(a.$value, t, i, n + 1);
    return;
  }
  for (const [s, p] of Object.entries(a))
    s.startsWith("$") || ae(p, t ? `${t}.${s}` : s, i, n + 1);
}
class Pe {
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
    const n = this.app, a = this.view, s = n?.model;
    if (!a || !s?.layouts || !s.attachments)
      throw Error(
        "Откройте проект Топоматик 360 с IFC или SMDX и сделайте его 3D-окно активным."
      );
    const p = [], d = [], m = [], u = /* @__PURE__ */ new Map(), c = /* @__PURE__ */ new Set();
    let g = 2166136261;
    const x = (y) => {
      for (let v = 0; v < y.length; v++)
        g = Math.imul(g ^ y.charCodeAt(v), 16777619);
    }, w = async (y, v, f) => {
      if (c.has(y)) return;
      c.add(y);
      const C = y.layers.layer0?.modelName || v, P = v;
      p.push({ id: P, name: C });
      const z = [];
      y.layouts.model?.walk((O) => (O.type === fe.model3d ? z.push(O) : O.type === fe.insert && d.push(`${C}: вставка блока не включена в расчёт.`), !1));
      const W = /* @__PURE__ */ new Map();
      for (const O of z) {
        const M = JSON.stringify([
          O.layer?.UUID || "",
          O.$id || O.$path
        ]);
        W.set(M, [O]);
      }
      for (const [O, M] of W) {
        if (i()) throw Error("Чтение моделей отменено.");
        if (n !== this.app || a !== this.view)
          throw Error(
            "Активный проект изменился. Запустите чтение моделей заново."
          );
        const k = M[0].layer, L = {};
        try {
          if (k) {
            const q = [];
            let Z = k;
            for (; Z && q.length < 64; )
              q.unshift(Z), Z = Z.layer;
            for (const U of q)
              ae(U.typedProperties(), "", L), U.typed?.name && (L.Тип = U.typed.name);
          }
        } catch {
          d.push(`${C} / ${O}: часть свойств недоступна.`);
        }
        const S = L["ifc.id"] || Object.entries(L).find(
          ([q]) => /(^|\.)(globalid|ifcguid|guid)$/i.test(q)
        )?.[1] || "", B = k?.name || M[0].$id || "Элемент", A = JSON.stringify([P, O]);
        Object.assign(L, {
          Модель: C,
          Имя: B,
          GUID: S,
          Объект: k?.UUID || O
        });
        const N = {
          min: [1 / 0, 1 / 0, 1 / 0],
          max: [-1 / 0, -1 / 0, -1 / 0]
        };
        let $ = !0, V = !1, R = 0;
        for (const q of M) {
          $ &&= q.isClosed;
          for (const Z of Object.values(q.meshes)) {
            const U = Z.geometry;
            if (!U || U.indices.length % 3) {
              V = !0;
              continue;
            }
            $ &&= Z.isClosed, R += U.indices.length / 3;
            for (let o = 0; o < U.vertices.length; o += 3) {
              const r = [
                U.vertices[o],
                U.vertices[o + 1],
                U.vertices[o + 2]
              ];
              if (Math3d.mat4.mulv3(r, q.matrix, r), !r.every(Number.isFinite)) {
                V = !0;
                continue;
              }
              for (let l = 0; l < 3; l++)
                N.min[l] = Math.min(N.min[l], r[l]), N.max[l] = Math.max(N.max[l], r[l]);
              if (x(r.join(",")), o % 6e4 === 0 && (t(
                "Индексирование: " + C + " · " + m.length + " элементов"
              ), await new Promise((l) => setTimeout(l, 0)), i()))
                throw Error("Чтение моделей отменено.");
            }
            for (let o = 0; o < U.indices.length; o++)
              if (g = Math.imul(g ^ U.indices[o], 16777619), o % 15e4 === 0 && (await new Promise((r) => setTimeout(r, 0)), i()))
                throw Error("Чтение моделей отменено.");
          }
        }
        if (V || !R) {
          if (d.push(
            C + " / " + B + ": геометрия отсутствует или неполна."
          ), !R) continue;
          $ = !1;
        }
        const Q = {
          id: A,
          name: B,
          model: C,
          modelId: P,
          guid: S,
          properties: L,
          hidden: f || !!k?.resolveHidden() || !!k?.resolveDisabled(),
          triangles: new Float64Array(0),
          triangleCount: R,
          closed: $,
          bounds: N
        };
        x(JSON.stringify([A, L, Q.hidden])), m.push(Q), u.set(A, M);
      }
      const T = [];
      y.attachments.forEach((O) => {
        T.push(O);
      });
      for (const O of T)
        O.model ? await w(
          O.model,
          `${v}/${O.name || O.uri || O.$id}`,
          f || O.hidden
        ) : d.push(
          `${O.name || O.uri || "Подключённая модель"}: модель не загружена. Откройте её перед расчётом.`
        );
    };
    if (await w(s, s.layers.layer0?.modelName || "Проект", !1), !m.length)
      throw Error(
        "В открытом проекте не найдены 3D-элементы с доступной геометрией."
      );
    return this.clear(), this.refs = u, this.metadata = new Map(m.map((y) => [y.id, y])), this.scannedApp = n, this.scannedView = a, {
      elements: m,
      fingerprint: `${m.length}:${g >>> 0}`,
      warnings: [...new Set(d)],
      models: p
    };
  }
  async geometry(t, i) {
    if (!this.isCurrent()) throw Error("Активная модель изменилась.");
    const n = this.metadata.get(t), a = this.refs.get(t);
    if (!n || !a) throw Error("Элемент отсутствует.");
    const s = a.flatMap(
      (x) => Object.values(x.meshes).map((w) => ({
        object: x,
        g: w.geometry
      }))
    );
    let p = 0, d = 0;
    for (const { g: x } of s) {
      if (!x) throw Error("Геометрия недоступна.");
      p += x.vertices.length, d += x.indices.length;
    }
    const m = new Float64Array(p), u = new Uint32Array(d);
    let c = 0, g = 0;
    for (const { object: x, g: w } of s) {
      if (!w) throw Error("Геометрия недоступна.");
      for (let y = 0; y < w.vertices.length; y += 3) {
        const v = [w.vertices[y], w.vertices[y + 1], w.vertices[y + 2]];
        if (Math3d.mat4.mulv3(v, x.matrix, v), m.set(v, c + y), y % 6e4 === 0 && (await new Promise((f) => setTimeout(f, 0)), i() || !this.isCurrent()))
          throw Error("Чтение геометрии отменено.");
      }
      for (let y = 0; y < w.indices.length; y++) {
        if (w.indices[y] >= w.vertices.length / 3)
          throw Error("Некорректный индекс геометрии.");
        if (u[g + y] = c / 3 + w.indices[y], y % 15e4 === 0 && (await new Promise((v) => setTimeout(v, 0)), i()))
          throw Error("Чтение геометрии отменено.");
      }
      c += w.vertices.length, g += w.indices.length;
    }
    return { ...n, vertices: m, indices: u };
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
    const a = t.point, s = this.view;
    s.camera?.id !== "3d" && s.setCameraType("3d");
    const p = [-0.65, 0.65, -0.394], d = Math.hypot(...p);
    p.forEach((m, u) => p[u] = m / d), s.lookAt(
      a.map((m, u) => m - p[u] * i),
      p,
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
        const g = m === 0 ? 4281743103 : 4294941995, x = new Uint32Array(c.indices.length * 2);
        x.set(c.indices);
        for (let y = 0; y < c.indices.length; y += 3)
          x[c.indices.length + y] = c.indices[y], x[c.indices.length + y + 1] = c.indices[y + 2], x[c.indices.length + y + 2] = c.indices[y + 1];
        const w = {
          uuid: "nashepo.checks." + m + "." + c.uuid,
          vertices: c.vertices,
          normals: c.normals,
          bounds: c.bounds,
          indices: x,
          colors: new Uint32Array(c.vertices.length / 3).fill(g)
        };
        return [{ obj: d, geometry: w, color: g }];
      })
    ), p = {
      id: Ye,
      order: 1e4,
      visible: !0,
      paint: () => {
      },
      paint3d: (d, m) => {
        const u = d.color, c = d.rasterizer.material;
        d.rasterizer.material = void 0;
        const g = Math3d.mat4.inverse(Math3d.mat4.alloc(), m.view);
        try {
          for (const { obj: x, geometry: w, color: y } of a) {
            d.color = y, d.pushMatrix();
            try {
              const v = Math3d.mat4.alloc();
              for (let C = 0; C < 16; C++) v[C] = x.matrix[C];
              const f = 1e-3;
              v[12] += g[8] * f, v[13] += g[9] * f, v[14] += g[10] * f, d.multMatrix(v), d.mesh(w);
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
    i.layer.addLayer(p), this.overlay = { view: i, layer: p }, i.invalidate();
  }
  async snapshot(t, i, n, a = !1) {
    if (!this.isCurrent())
      throw Error("Обновите модели перед созданием снимков.");
    if (!this.canLocate(t))
      throw Error("Элементы результата отсутствуют в открытых моделях.");
    return a ? (this.view.layer.clearSelected(), this.highlight([t.a.id, t.b.id])) : this.focus(t, i, !1), De(this.view, () => n() || !this.isCurrent());
  }
  markers(t, i, n, a) {
    if (!this.isCurrent()) return;
    const s = this.view;
    this.pointView && this.pointView !== s && this.clear();
    const p = s.annotations.get(ce);
    if (p && s.annotations.release(p), this.pointView = s, !n) {
      s.invalidate();
      return;
    }
    const d = s.annotations.create(ce, 1e4), m = t.filter((u) => u.id !== i).concat(t.filter((u) => u.id === i));
    for (const u of m.slice(-3e3)) {
      if (u.state === "resolved") continue;
      const [c, g, x] = u.point, w = u.id === i, y = u.state === "excluded" ? "#78818c" : u.state === "approved" || u.state === "reviewed" ? "#28b94b" : "#e1372d", v = w ? "#f2c94c" : y, f = () => a(u.id), C = [
        { type: "line", a: [c, g, x], b: [c, g, x + 1], color: v, width: 5 },
        {
          type: "polyline",
          points: [
            [c - 0.65, g, x + 1],
            [c + 0.65, g, x + 1],
            [c, g, x + 2.2],
            [c - 0.65, g, x + 1]
          ],
          color: v,
          fillColor: y,
          width: w ? 5 : 2
        },
        {
          type: "line",
          a: [c, g - 0.01, x + 1.85],
          b: [c, g - 0.01, x + 1.4],
          color: "#ffffff",
          width: 4
        },
        {
          type: "line",
          a: [c, g - 0.01, x + 1.22],
          b: [c, g - 0.01, x + 1.27],
          color: "#ffffff",
          width: 4
        }
      ];
      d.add({
        id: u.id,
        type: "shaped",
        shapes: C,
        activeShapes: C,
        activateCommand: f,
        dblCommand: f
      }), w && d.add({
        id: u.id + ":label",
        type: "simple",
        position: [c, g, x + 2.35],
        label: `${u.a.name} × ${u.b.name}`,
        labelBackground: "#f2c94c",
        labelColor: "#171717",
        activateCommand: f
      });
    }
    s.invalidate();
  }
}
let ye;
const Ze = {
  open(e) {
    e.manager.revealView("nashepo.collisionfinder360/checks_panel");
  },
  mount(e) {
    const t = e.el;
    if (!t) return;
    ye?.();
    const i = document.createElement("div");
    i.style.height = "100%", t.replaceChildren(i), ye = Be(i, new Pe(e));
  }
};
export {
  Ze as default
};
