const je = `<h2>Работа с проверками</h2>
<details open><summary>1. Первая проверка: одна модель против другой</summary><ol><li>Откройте проект и подключите нужные IFC/SMDX штатными средствами Топоматик 360.</li><li>Откройте нижнюю вкладку «Проверки» и нажмите «Обновить модели». Плагин прочитает состав, свойства и габариты элементов.</li><li>Нажмите «＋ Проверка». Вверху задайте имя, например «Водопровод — канализация».</li><li>Во вкладке «Выбрать» отметьте модель водопровода в А, модель канализации в Б. Несколько файлов выбираются с Ctrl, диапазон — с Shift. Без выбранных файлов используются все прочитанные модели.</li><li>Выберите «По пересечению» и нажмите «Запустить». Пара проверяется один раз; один и тот же геометрический элемент сам с собой не сравнивается.</li><li>Во вкладке «Результаты» дважды нажмите строку: камера направится к точке конфликта. А обозначается красным, Б — синим.</li></ol></details>
<details><summary>2. Несколько проверок и выборки по свойствам</summary><p>Каждая проверка хранит собственные модели А/Б, условия и результаты. Создайте отдельные проверки для разных разделов или скопируйте существующую и измените модели. «Запустить все» последовательно выполняет все созданные проверки; поиск слева только фильтрует список, а не состав пакетного запуска.</p><p>«＋ Условие» ограничивает выборку по свойству: например типу, системе или материалу. Выберите доступное имя свойства из подсказки и задайте значение. «И» требует выполнения всех условий, «ИЛИ» — хотя бы одного. Модель и условия действуют совместно. Перед каждым запуском выборка вычисляется заново. Число элементов указано рядом с А/Б.</p><p>IFC GUID читается из свойства <code>ifc.id</code>; также поддерживаются поля GlobalId и GUID. Вы можете использовать <code>ifc.id</code> в условиях.</p></details>
<details><summary>3. Кнопки работы с выделением в 3D</summary><p>Сначала выделите элементы штатными средствами в 3D-окне, затем нажмите кнопку в нужной выборке А или Б:</p><ul><li><b>Показать выборку</b> — выделяет в сцене весь текущий состав этой выборки.</li><li><b>Только выделенные</b> — заменяет выборку текущим выделением. Удобно для проверки конкретной пары или небольшой группы. Автоматические модели и условия в этом режиме не применяются.</li><li><b>＋ Добавить выделенные</b> — включает элементы дополнительно, даже если они не проходят условия. Если уже выбраны все модели без условий, число элементов может не измениться: они уже входят в выборку.</li><li><b>− Исключить выделенные</b> — убирает элементы из выборки. Исключение имеет приоритет.</li><li><b>Вернуть автоматический выбор</b> — очищает ручные добавления/исключения и снова использует модели и условия.</li></ul><p>Ручной выбор сохраняет идентификаторы элементов. Если их заменили при обновлении модели, выделение следует задать заново.</p></details>
<details><summary>4. Пересечения, касания, точность и дубликаты</summary><p><b>Пересечение</b> — поверхности проходят друг сквозь друга либо элемент находится внутри замкнутого тела. <b>Касание</b> — поверхности соприкасаются без проникновения, например торец трубы касается стены. «Учитывать касания» включает такие пары; обычно этот переключатель оставляют выключенным.</p><p>«Точность расчёта, мм» — числовая погрешность, а не минимальная глубина проникновения. Проверки просвета и фильтр по глубине проникновения пока не реализованы.</p><p><b>Дублирование</b> ищет одинаковые треугольники в одинаковых мировых координатах после округления с заданной точностью. Для дубликатов внутри файла выберите этот файл в А и Б. Порядок треугольников и вершин не важен; разная триангуляция одинаковой формы пока не сопоставляется.</p></details>
<details><summary>5. Составные объекты и правила исключений</summary><p>Один IFC-объект может состоять из нескольких геометрических частей. Эти части проверяются друг с другом, поэтому у результата могут совпадать имя и IFC GUID. Чтобы пропускать такие пары, включите «Не проверять геометрию одного составного объекта» во вкладке «Правила».</p><p>Там же можно исключить пары из одной модели, пары с одинаковым значением свойства и включить скрытые элементы. Незагруженные подключённые файлы надо открыть перед расчётом.</p></details>
<details><summary>6. Результаты, состояния и повторный запуск</summary><p>«Новый» — найден впервые; «Активный» — найден при повторном запуске; «Проверенный» — рассмотрен пользователем; «Подтверждённый» — решение подтверждено; «Исключённый» — сознательно исключён из работы. «Исправленный» устанавливается при исчезновении пары на повторном полном расчёте с теми же условиями; его также можно выставить вручную.</p><p>Назначение — исполнитель или подразделение, комментарий — ваше решение. Галочки в таблице позволяют менять состояние сразу у нескольких результатов. Галочка в заголовке выбирает текущую страницу. Поиск и фильтр состояний ограничивают видимые строки. Значения таблицы и свойств можно выделять и копировать.</p><p>При повторном запуске с теми же условиями сохраняются назначения и комментарии. Если условия изменены, начинается новый набор результатов: сначала сохраните предыдущую работу. Отключение ранее участвовавшей модели останавливает повторный расчёт, чтобы её конфликты не стали исправленными по ошибке.</p></details>
<details><summary>7. Снимки и передача отчёта</summary><p>В карточке результата нажмите «Сохранить текущий ракурс», чтобы записать изображение 3D-окна после ручной настройки камеры. Снимок можно открыть крупнее.</p><p>Во вкладке «Отчёт» включите «Добавить снимки» и сформируйте HTML: для результатов без изображения плагин последовательно выставит камеру и сделает снимки. Не переключайте проект и не перемещайте камеру во время подготовки. Кнопка «Остановить» прерывает подготовку; уже полученные снимки сохраняются.</p><p>HTML содержит изображения, поиск и фильтр состояний; его можно открыть без Топоматик. Файл сессии открывается в плагине «НашеПО · Коллизии». Исправленным парам, элементы которых отсутствуют, сохраняется прежний снимок; новый снимок для них получить нельзя. При недоступности изображения плагин сообщает об этом и не подставляет чужой ракурс.</p></details>
<details><summary>8. Сохранение работы и большие проекты</summary><p>«Сохранить проверки» записывает правила, результаты, комментарии и снимки в JSON. «Открыть проверки» загружает этот файл для продолжения работы. Геометрия в него не включается: соответствующие модели надо открыть в Топоматик отдельно. Без сохранения в файл работа может быть потеряна при закрытии страницы.</p><p>Общий предел в 6 млн треугольников снят. Сначала строится индекс габаритов; точная геометрия близких пар передаётся в расчёт по мере необходимости в компактном индексированном виде. Расчёт всё ещё ограничен доступной памятью и временем, особенно если один элемент очень крупный или почти все элементы пересекаются. Для управляемых результатов полезно разделять проверки по системам и моделям. В сцене одновременно выводятся до 3000 знаков. При достижении 50 000 результатов расчёт останавливается с сообщением, без замены прежних результатов.</p></details>`, Se = "0.2.2", se = (e) => typeof e == "string" && /^data:image\/(jpeg|png);base64,[A-Za-z0-9+/=]+$/.test(e), X = {
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
  indices: n,
  triangleCount: i,
  closed: a,
  bounds: r,
  ...d
}) => d;
function re(e, t) {
  if (t.exclude.includes(e.id)) return !1;
  if (t.include.includes(e.id)) return !0;
  if (t.manualOnly || t.models.length && !t.models.includes(e.modelId)) return !1;
  const n = (i) => {
    const a = e.properties[i.field], r = (a ?? "").toLocaleLowerCase(), d = i.value.toLocaleLowerCase();
    switch (i.op) {
      case "exists":
        return a !== void 0 && a !== "";
      case "eq":
        return a !== void 0 && r === d;
      case "ne":
        return a !== void 0 && r !== d;
      case "contains":
        return a !== void 0 && r.includes(d);
      case "gt":
        return a !== void 0 && a.trim() !== "" && Number(a.replace(",", ".")) > Number(i.value.replace(",", "."));
      case "lt":
        return a !== void 0 && a.trim() !== "" && Number(a.replace(",", ".")) < Number(i.value.replace(",", "."));
    }
  };
  return !t.conditions.length || (t.mode === "all" ? t.conditions.every(n) : t.conditions.some(n));
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
function Ae(e, t, n) {
  const i = new Map(e.map((r) => [r.id, r])), a = t.map((r) => {
    const d = i.get(r.id);
    return i.delete(r.id), {
      ...r,
      note: d?.note ?? "",
      assignee: d?.assignee ?? "",
      firstSeen: d?.firstSeen ?? n,
      lastSeen: n,
      state: !d || d.state === "resolved" ? "new" : d.state === "new" ? "active" : d.state
    };
  });
  for (const r of i.values())
    a.push({
      ...r,
      state: r.state === "excluded" ? "excluded" : "resolved"
    });
  return a;
}
function Oe(e) {
  const t = JSON.parse(e);
  if (t?.format !== "nashepo.checks" || t.version !== 1 || !Array.isArray(t.checks))
    throw Error("Это не файл проекта проверок НашеПО.");
  const n = /* @__PURE__ */ new Set();
  for (const i of t.checks) {
    if (!i || typeof i.id != "string" || n.has(i.id) || typeof i.name != "string" || !["intersection", "duplicates"].includes(i.type) || !Number.isFinite(i.precision) || i.precision < 1e-3 || i.precision > 100 || !Array.isArray(i.results))
      throw Error("Некорректные параметры проверки.");
    if (n.add(i.id), ![
      "touching",
      "ignoreSameModel",
      "ignoreSameGroup",
      "includeHidden"
    ].every(
      (a) => typeof i[a] == "boolean"
    ) || typeof i.equalProperty != "string" || i.modelsAtRun !== void 0 && (!Array.isArray(i.modelsAtRun) || !i.modelsAtRun.every((a) => typeof a == "string")))
      throw Error("Некорректные правила проверки.");
    for (const a of [i.a, i.b])
      if (!a || a.manualOnly !== void 0 && typeof a.manualOnly != "boolean" || !["all", "any"].includes(a.mode) || ![a.models, a.include, a.exclude].every(
        (r) => Array.isArray(r) && r.every((d) => typeof d == "string")
      ) || !Array.isArray(a.conditions) || !a.conditions.every(
        (r) => r && typeof r.field == "string" && typeof r.value == "string" && ["eq", "ne", "contains", "exists", "gt", "lt"].includes(r.op)
      ))
        throw Error("Некорректная выборка.");
    for (const a of i.results) {
      if (a?.image !== void 0 && !se(a.image))
        throw Error("Некорректный снимок результата.");
      if (!a || typeof a.id != "string" || !Object.hasOwn(X, a.state) || !Array.isArray(a.point) || a.point.length !== 3 || !a.point.every(Number.isFinite))
        throw Error("Некорректный результат.");
      for (const r of [a.a, a.b])
        if (!r || !["id", "name", "model", "modelId", "guid"].every(
          (d) => typeof r[d] == "string"
        ) || !r.properties || typeof r.properties != "object")
          throw Error("Некорректный элемент результата.");
    }
    i.status = "stale", i.warnings = [];
  }
  return t;
}
const U = (e, t) => [e[0] - t[0], e[1] - t[1], e[2] - t[2]], me = (e, t, n = 1) => [
  e[0] + t[0] * n,
  e[1] + t[1] * n,
  e[2] + t[2] * n
], H = (e, t) => e[0] * t[0] + e[1] * t[1] + e[2] * t[2], ie = (e, t) => [
  e[1] * t[2] - e[2] * t[1],
  e[2] * t[0] - e[0] * t[2],
  e[0] * t[1] - e[1] * t[0]
], Z = (e) => Math.hypot(...e), ee = (e) => e.triangleCount ?? (e.indices ? e.indices.length / 3 : e.triangles.length / 9), K = (e, t, n) => e.indices && e.vertices ? e.vertices[e.indices[t * 3 + Math.floor(n / 3)] * 3 + n % 3] : e.triangles[t * 9 + n], ne = (e, t) => [0, 3, 6].map((n) => [
  K(e, t, n),
  K(e, t, n + 1),
  K(e, t, n + 2)
]);
function ve(e) {
  const t = [1 / 0, 1 / 0, 1 / 0], n = [-1 / 0, -1 / 0, -1 / 0];
  for (let i = 0; i < e.length; i++) {
    const a = i % 3;
    t[a] = Math.min(t[a], e[i]), n[a] = Math.max(n[a], e[i]);
  }
  return { min: t, max: n };
}
const ke = (e, t, n) => e.min.every((i, a) => i <= t.max[a] + n && e.max[a] >= t.min[a] - n);
function de(e, t) {
  const n = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const f of t)
    for (let m = 0; m < 9; m++) {
      const u = m % 3, p = K(e, f, m);
      n.min[u] = Math.min(n.min[u], p), n.max[u] = Math.max(n.max[u], p);
    }
  if (t.length <= 12) return { ...n, ids: t };
  const i = n.max.map((f, m) => f - n.min[m]), a = i.indexOf(Math.max(...i)), r = (f) => K(e, f, a) + K(e, f, a + 3) + K(e, f, a + 6);
  t.sort((f, m) => r(f) - r(m));
  const d = t.length >> 1;
  return {
    ...n,
    left: de(e, t.slice(0, d)),
    right: de(e, t.slice(d))
  };
}
function* te(e, t, n) {
  ke(e, t, n) && (e.ids ? yield* e.ids : (yield* te(e.left, t, n), yield* te(e.right, t, n)));
}
function ue(e, t) {
  const n = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const d of t)
    for (let f = 0; f < 3; f++)
      n.min[f] = Math.min(n.min[f], e[d].bounds.min[f]), n.max[f] = Math.max(n.max[f], e[d].bounds.max[f]);
  if (t.length <= 16) return { ...n, ids: t };
  const i = n.max.map((d, f) => d - n.min[f]), a = i.indexOf(Math.max(...i));
  t.sort(
    (d, f) => e[d].bounds.min[a] + e[d].bounds.max[a] - (e[f].bounds.min[a] + e[f].bounds.max[a])
  );
  const r = t.length >> 1;
  return {
    ...n,
    left: ue(e, t.slice(0, r)),
    right: ue(e, t.slice(r))
  };
}
function pe(e, t, n, i) {
  const a = U(t, e), r = U(n[1], n[0]), d = U(n[2], n[0]), f = ie(a, d), m = H(r, f);
  if (Math.abs(m) <= 1e-12 * Z(a) * Z(r) * Z(d)) return;
  const u = 1 / m, p = U(e, n[0]), b = H(p, f) * u, k = ie(p, r), v = H(a, k) * u, I = H(d, k) * u, y = i / Math.max(Z(r), Z(d), i);
  if (b >= -y && v >= -y && b + v <= 1 + y && I >= -y && I <= 1 + y)
    return me(e, a, Math.max(0, Math.min(1, I)));
}
function Le(e, t, n, i) {
  const a = n.map(Math.abs).indexOf(Math.max(...n.map(Math.abs))), r = [0, 1, 2].filter((m) => m !== a), d = (m, u, p) => (u[r[0]] - m[r[0]]) * (p[r[1]] - m[r[1]]) - (u[r[1]] - m[r[1]]) * (p[r[0]] - m[r[0]]), f = (m, u) => {
    const p = u.map((b, k) => d(b, u[(k + 1) % 3], m));
    return p.every((b) => b >= -i * Z(n)) || p.every((b) => b <= i * Z(n));
  };
  for (const m of e) if (f(m, t)) return m;
  for (const m of t) if (f(m, e)) return m;
  for (let m = 0; m < 3; m++)
    for (let u = 0; u < 3; u++) {
      const p = e[m], b = e[(m + 1) % 3], k = t[u], v = t[(u + 1) % 3], I = U(b, p), y = U(v, k), c = I[r[0]] * y[r[1]] - I[r[1]] * y[r[0]];
      if (Math.abs(c) < 1e-18) continue;
      const A = U(k, p), B = (A[r[0]] * y[r[1]] - A[r[1]] * y[r[0]]) / c, O = (A[r[0]] * I[r[1]] - A[r[1]] * I[r[0]]) / c;
      if (B >= 0 && B <= 1 && O >= 0 && O <= 1) return me(p, I, B);
    }
}
function $e(e, t, n, i) {
  const a = ie(U(e[1], e[0]), U(e[2], e[0])), r = ie(U(t[1], t[0]), U(t[2], t[0])), d = Z(a), f = Z(r);
  if (d < 1e-20 || f < 1e-20) return;
  const m = t.map((p) => H(U(p, e[0]), a) / d), u = e.map((p) => H(U(p, t[0]), r) / f);
  if (!(m.every((p) => p > n) || m.every((p) => p < -n) || u.every((p) => p > n) || u.every((p) => p < -n))) {
    if (m.every((p) => Math.abs(p) <= n) && u.every((p) => Math.abs(p) <= n))
      return i ? Le(e, t, a, n) : void 0;
    if (!(!i && (!(Math.min(...m) < -n && Math.max(...m) > n) || !(Math.min(...u) < -n && Math.max(...u) > n))))
      for (let p = 0; p < 3; p++) {
        const b = pe(e[p], e[(p + 1) % 3], t, n);
        if (b) return b;
        const k = pe(t[p], t[(p + 1) % 3], e, n);
        if (k) return k;
      }
  }
}
function Ne(e, t, n) {
  const i = U(t[1], t[0]), a = U(t[2], t[0]), r = ie(i, a), d = Z(r);
  if (d < 1e-20 || Math.abs(H(U(e, t[0]), r)) / d > n) return !1;
  const f = U(e, t[0]), m = H(i, i), u = H(i, a), p = H(a, a), b = H(f, i), k = H(f, a), v = m * p - u * u;
  if (Math.abs(v) < 1e-30) return !1;
  const I = (b * p - k * u) / v, y = (k * m - b * u) / v, c = n / Math.max(Z(i), Z(a), n);
  return I >= -c && y >= -c && I + y <= 1 + c;
}
function le(e, t, n, i) {
  if (!t.closed || e.some((b, k) => b <= t.bounds.min[k] + i || b >= t.bounds.max[k] - i))
    return !1;
  for (const b of te(n, { min: e, max: e }, i))
    if (Ne(e, ne(t, b), i)) return !1;
  const a = [1, 0.371390676, 0.52999894], r = Z(U(t.bounds.max, t.bounds.min)) * 3 + 1, d = me(e, a, r), f = [], m = ve([...e, ...d]);
  for (const b of te(n, m, i)) {
    const k = pe(e, d, ne(t, b), i);
    if (k) {
      const v = Z(U(k, e));
      v > i && f.push(v);
    }
  }
  f.sort((b, k) => b - k);
  let u = 0, p = -1 / 0;
  for (const b of f)
    b - p > i * 2 && (u++, p = b);
  return u % 2 === 1;
}
async function qe(e, t, n, i, a) {
  const r = t.precision / 1e3;
  if (!Number.isFinite(r) || r <= 0)
    throw Error("Точность расчёта должна быть положительным числом.");
  const d = e.filter((g) => t.includeHidden || !g.hidden), f = d.filter((g) => re(g, t.a)), m = d.filter((g) => re(g, t.b));
  if (!f.length || !m.length)
    throw Error("Выборка А или Б пуста. Проверьте модели и условия.");
  let u = performance.now();
  const p = async () => {
    if (i())
      throw Error("Расчёт отменён. Предыдущие результаты сохранены.");
    performance.now() - u > 16 && (await new Promise((g) => setTimeout(g, 0)), u = performance.now());
  }, b = /* @__PURE__ */ new Map(), k = (g) => {
    let E = b.get(g.id);
    return E || (E = de(
      g,
      Array.from({ length: ee(g) }, (C, j) => j)
    ), b.set(g.id, E)), E;
  }, v = /* @__PURE__ */ new Map(), I = async (g) => {
    let E = v.get(g.id);
    if (E !== void 0) return E;
    const C = [];
    for (let j = 0; j < ee(g); j++)
      C.push(
        [0, 3, 6].map(
          (G) => [0, 1, 2].map((L) => Math.round(K(g, j, G + L) / r)).join(",")
        ).sort().join(";")
      ), j % 9e3 === 0 && await p();
    return E = C.sort().join("|"), v.set(g.id, E), E;
  }, y = [], c = new Set(f.map((g) => g.id)), A = new Set(m.map((g) => g.id)), B = ue(
    m,
    m.map((g, E) => E)
  ), O = /* @__PURE__ */ new Map();
  let J = 0;
  const W = (g) => g.triangles.byteLength + (g.vertices?.byteLength || 0) + (g.indices?.byteLength || 0) + ee(g) * 32;
  async function T(g, E) {
    if (!a) return g;
    let C = O.get(g.id);
    if (C)
      return O.delete(g.id), O.set(g.id, C), C;
    for (const [j, G] of O)
      j !== E && J > 96 * 1024 * 1024 && (O.delete(j), J -= W(G), b.delete(j), v.delete(j));
    return C = await a(g.id), O.set(g.id, C), J += W(C), C;
  }
  let V = -1 / 0;
  for (let g = 0; g < f.length; g++) {
    const E = f[g];
    performance.now() - V > 150 && (V = performance.now(), n({
      phase: "Проверка пар",
      done: g,
      total: f.length,
      found: y.length
    }));
    for (const C of te(B, E.bounds, r)) {
      const j = m[C];
      if (await p(), E.id === j.id || !ke(E.bounds, j.bounds, r) || t.ignoreSameModel && E.modelId === j.modelId || t.ignoreSameGroup && E.modelId === j.modelId && E.properties.Объект && E.properties.Объект === j.properties.Объект || t.equalProperty && E.properties[t.equalProperty] !== void 0 && E.properties[t.equalProperty] === j.properties[t.equalProperty] || E.id > j.id && c.has(j.id) && A.has(E.id)) continue;
      const G = Ce(E.id, j.id), L = await T(E), $ = await T(j, E.id);
      let N, z = "surface";
      if (t.type === "duplicates") {
        if (ee(L) !== ee($) || L.bounds.min.some(
          (Q, D) => Math.abs(Q - $.bounds.min[D]) > r || Math.abs(L.bounds.max[D] - $.bounds.max[D]) > r
        ))
          continue;
        await I(L) === await I($) && (N = L.bounds.min.map((Q, D) => (Q + L.bounds.max[D]) / 2), z = "duplicate");
      } else {
        const Q = k(L), D = k($);
        for (let Y = 0; Y < ee(L) && !N; Y++) {
          const R = ne(L, Y), o = ve(R.flat());
          for (const s of te(D, o, r)) {
            if (N = $e(R, ne($, s), r, t.touching), N) break;
            await p();
          }
          await p();
        }
        if (!N && L.closed && $.closed) {
          const Y = L.bounds.min.map(
            (R, o) => (R + L.bounds.max[o]) / 2
          );
          le(Y, L, Q, r) && le(Y, $, D, r) && (N = Y, z = "contained");
        }
        if (!N) {
          for (const [Y, R, o] of [
            [L, $, D],
            [$, L, Q]
          ])
            if (R.closed) {
              for (let s = 0; s < ee(Y) && !N; s++) {
                const l = ne(Y, s), h = l[0].map(
                  (w, M) => (l[0][M] + l[1][M] + l[2][M]) / 3
                );
                for (const w of [l[0], h])
                  if (le(w, R, o, r)) {
                    N = w, z = "contained";
                    break;
                  }
                await p();
              }
              if (N) break;
            }
        }
      }
      if (N && (y.push({
        id: G,
        a: ge(L),
        b: ge($),
        point: N,
        kind: z,
        state: "new",
        note: "",
        assignee: "",
        firstSeen: "",
        lastSeen: ""
      }), y.length >= 5e4))
        throw Error(
          "Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат."
        );
    }
  }
  return n({
    phase: "Готово",
    done: f.length,
    total: f.length,
    found: y.length
  }), y;
}
const Me = `(function(){"use strict";const k=({triangles:t,vertices:n,indices:e,triangleCount:a,closed:o,bounds:i,...u})=>u;function nn(t,n){if(n.exclude.includes(t.id))return!1;if(n.include.includes(t.id))return!0;if(n.manualOnly||n.models.length&&!n.models.includes(t.modelId))return!1;const e=a=>{const o=t.properties[a.field],i=(o??"").toLocaleLowerCase(),u=a.value.toLocaleLowerCase();switch(a.op){case"exists":return o!==void 0&&o!=="";case"eq":return o!==void 0&&i===u;case"ne":return o!==void 0&&i!==u;case"contains":return o!==void 0&&i.includes(u);case"gt":return o!==void 0&&o.trim()!==""&&Number(o.replace(",","."))>Number(a.value.replace(",","."));case"lt":return o!==void 0&&o.trim()!==""&&Number(o.replace(",","."))<Number(a.value.replace(",","."))}};return!n.conditions.length||(n.mode==="all"?n.conditions.every(e):n.conditions.some(e))}const an=(t,n)=>JSON.stringify([t,n].sort()),y=(t,n)=>[t[0]-n[0],t[1]-n[1],t[2]-n[2]],Q=(t,n,e=1)=>[t[0]+n[0]*e,t[1]+n[1]*e,t[2]+n[2]*e],I=(t,n)=>t[0]*n[0]+t[1]*n[1]+t[2]*n[2],A=(t,n)=>[t[1]*n[2]-t[2]*n[1],t[2]*n[0]-t[0]*n[2],t[0]*n[1]-t[1]*n[0]],v=t=>Math.hypot(...t),N=t=>t.triangleCount??(t.indices?t.indices.length/3:t.triangles.length/9),L=(t,n,e)=>t.indices&&t.vertices?t.vertices[t.indices[n*3+Math.floor(e/3)]*3+e%3]:t.triangles[n*9+e],F=(t,n)=>[0,3,6].map(e=>[L(t,n,e),L(t,n,e+1),L(t,n,e+2)]);function tn(t){const n=[1/0,1/0,1/0],e=[-1/0,-1/0,-1/0];for(let a=0;a<t.length;a++){const o=a%3;n[o]=Math.min(n[o],t[a]),e[o]=Math.max(e[o],t[a])}return{min:n,max:e}}const en=(t,n,e)=>t.min.every((a,o)=>a<=n.max[o]+e&&t.max[o]>=n.min[o]-e);function R(t,n){const e={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const r of n)for(let c=0;c<9;c++){const d=c%3,s=L(t,r,c);e.min[d]=Math.min(e.min[d],s),e.max[d]=Math.max(e.max[d],s)}if(n.length<=12)return{...e,ids:n};const a=e.max.map((r,c)=>r-e.min[c]),o=a.indexOf(Math.max(...a)),i=r=>L(t,r,o)+L(t,r,o+3)+L(t,r,o+6);n.sort((r,c)=>i(r)-i(c));const u=n.length>>1;return{...e,left:R(t,n.slice(0,u)),right:R(t,n.slice(u))}}function*C(t,n,e){en(t,n,e)&&(t.ids?yield*t.ids:(yield*C(t.left,n,e),yield*C(t.right,n,e)))}function U(t,n){const e={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const u of n)for(let r=0;r<3;r++)e.min[r]=Math.min(e.min[r],t[u].bounds.min[r]),e.max[r]=Math.max(e.max[r],t[u].bounds.max[r]);if(n.length<=16)return{...e,ids:n};const a=e.max.map((u,r)=>u-e.min[r]),o=a.indexOf(Math.max(...a));n.sort((u,r)=>t[u].bounds.min[o]+t[u].bounds.max[o]-(t[r].bounds.min[o]+t[r].bounds.max[o]));const i=n.length>>1;return{...e,left:U(t,n.slice(0,i)),right:U(t,n.slice(i))}}function V(t,n,e,a){const o=y(n,t),i=y(e[1],e[0]),u=y(e[2],e[0]),r=A(o,u),c=I(i,r);if(Math.abs(c)<=1e-12*v(o)*v(i)*v(u))return;const d=1/c,s=y(t,e[0]),l=I(s,r)*d,h=A(s,i),w=I(o,h)*d,M=I(u,h)*d,x=a/Math.max(v(i),v(u),a);if(l>=-x&&w>=-x&&l+w<=1+x&&M>=-x&&M<=1+x)return Q(t,o,Math.max(0,Math.min(1,M)))}function cn(t,n,e,a){const o=e.map(Math.abs).indexOf(Math.max(...e.map(Math.abs))),i=[0,1,2].filter(c=>c!==o),u=(c,d,s)=>(d[i[0]]-c[i[0]])*(s[i[1]]-c[i[1]])-(d[i[1]]-c[i[1]])*(s[i[0]]-c[i[0]]),r=(c,d)=>{const s=d.map((l,h)=>u(l,d[(h+1)%3],c));return s.every(l=>l>=-a*v(e))||s.every(l=>l<=a*v(e))};for(const c of t)if(r(c,n))return c;for(const c of n)if(r(c,t))return c;for(let c=0;c<3;c++)for(let d=0;d<3;d++){const s=t[c],l=t[(c+1)%3],h=n[d],w=n[(d+1)%3],M=y(l,s),x=y(w,h),S=M[i[0]]*x[i[1]]-M[i[1]]*x[i[0]];if(Math.abs(S)<1e-18)continue;const T=y(h,s),G=(T[i[0]]*x[i[1]]-T[i[1]]*x[i[0]])/S,j=(T[i[0]]*M[i[1]]-T[i[1]]*M[i[0]])/S;if(G>=0&&G<=1&&j>=0&&j<=1)return Q(s,M,G)}}function fn(t,n,e,a){const o=A(y(t[1],t[0]),y(t[2],t[0])),i=A(y(n[1],n[0]),y(n[2],n[0])),u=v(o),r=v(i);if(u<1e-20||r<1e-20)return;const c=n.map(s=>I(y(s,t[0]),o)/u),d=t.map(s=>I(y(s,n[0]),i)/r);if(!(c.every(s=>s>e)||c.every(s=>s<-e)||d.every(s=>s>e)||d.every(s=>s<-e))){if(c.every(s=>Math.abs(s)<=e)&&d.every(s=>Math.abs(s)<=e))return a?cn(t,n,o,e):void 0;if(!(!a&&(!(Math.min(...c)<-e&&Math.max(...c)>e)||!(Math.min(...d)<-e&&Math.max(...d)>e))))for(let s=0;s<3;s++){const l=V(t[s],t[(s+1)%3],n,e);if(l)return l;const h=V(n[s],n[(s+1)%3],t,e);if(h)return h}}}function un(t,n,e){const a=y(n[1],n[0]),o=y(n[2],n[0]),i=A(a,o),u=v(i);if(u<1e-20||Math.abs(I(y(t,n[0]),i))/u>e)return!1;const r=y(t,n[0]),c=I(a,a),d=I(a,o),s=I(o,o),l=I(r,a),h=I(r,o),w=c*s-d*d;if(Math.abs(w)<1e-30)return!1;const M=(l*s-h*d)/w,x=(h*c-l*d)/w,S=e/Math.max(v(a),v(o),e);return M>=-S&&x>=-S&&M+x<=1+S}function W(t,n,e,a){if(!n.closed||t.some((l,h)=>l<=n.bounds.min[h]+a||l>=n.bounds.max[h]-a))return!1;for(const l of C(e,{min:t,max:t},a))if(un(t,F(n,l),a))return!1;const o=[1,.371390676,.52999894],i=v(y(n.bounds.max,n.bounds.min))*3+1,u=Q(t,o,i),r=[],c=tn([...t,...u]);for(const l of C(e,c,a)){const h=V(t,u,F(n,l),a);if(h){const w=v(y(h,t));w>a&&r.push(w)}}r.sort((l,h)=>l-h);let d=0,s=-1/0;for(const l of r)l-s>a*2&&(d++,s=l);return d%2===1}async function dn(t,n,e,a,o){const i=n.precision/1e3;if(!Number.isFinite(i)||i<=0)throw Error("Точность расчёта должна быть положительным числом.");const u=t.filter(f=>n.includeHidden||!f.hidden),r=u.filter(f=>nn(f,n.a)),c=u.filter(f=>nn(f,n.b));if(!r.length||!c.length)throw Error("Выборка А или Б пуста. Проверьте модели и условия.");let d=performance.now();const s=async()=>{if(a())throw Error("Расчёт отменён. Предыдущие результаты сохранены.");performance.now()-d>16&&(await new Promise(f=>setTimeout(f,0)),d=performance.now())},l=new Map,h=f=>{let m=l.get(f.id);return m||(m=R(f,Array.from({length:N(f)},(b,g)=>g)),l.set(f.id,m)),m},w=new Map,M=async f=>{let m=w.get(f.id);if(m!==void 0)return m;const b=[];for(let g=0;g<N(f);g++)b.push([0,3,6].map(H=>[0,1,2].map(p=>Math.round(L(f,g,H+p)/i)).join(",")).sort().join(";")),g%9e3===0&&await s();return m=b.sort().join("|"),w.set(f.id,m),m},x=[],S=new Set(r.map(f=>f.id)),T=new Set(c.map(f=>f.id)),G=U(c,c.map((f,m)=>m)),j=new Map;let Y=0;const on=f=>f.triangles.byteLength+(f.vertices?.byteLength||0)+(f.indices?.byteLength||0)+N(f)*32;async function rn(f,m){if(!o)return f;let b=j.get(f.id);if(b)return j.delete(f.id),j.set(f.id,b),b;for(const[g,H]of j)g!==m&&Y>96*1024*1024&&(j.delete(g),Y-=on(H),l.delete(g),w.delete(g));return b=await o(f.id),j.set(f.id,b),Y+=on(b),b}let sn=-1/0;for(let f=0;f<r.length;f++){const m=r[f];performance.now()-sn>150&&(sn=performance.now(),e({phase:"Проверка пар",done:f,total:r.length,found:x.length}));for(const b of C(G,m.bounds,i)){const g=c[b];if(await s(),m.id===g.id||!en(m.bounds,g.bounds,i)||n.ignoreSameModel&&m.modelId===g.modelId||n.ignoreSameGroup&&m.modelId===g.modelId&&m.properties.Объект&&m.properties.Объект===g.properties.Объект||n.equalProperty&&m.properties[n.equalProperty]!==void 0&&m.properties[n.equalProperty]===g.properties[n.equalProperty]||m.id>g.id&&S.has(g.id)&&T.has(m.id))continue;const H=an(m.id,g.id),p=await rn(m),_=await rn(g,m.id);let q,D="surface";if(n.type==="duplicates"){if(N(p)!==N(_)||p.bounds.min.some((z,E)=>Math.abs(z-_.bounds.min[E])>i||Math.abs(p.bounds.max[E]-_.bounds.max[E])>i))continue;await M(p)===await M(_)&&(q=p.bounds.min.map((z,E)=>(z+p.bounds.max[E])/2),D="duplicate")}else{const z=h(p),E=h(_);for(let P=0;P<N(p)&&!q;P++){const O=F(p,P),J=tn(O.flat());for(const K of C(E,J,i)){if(q=fn(O,F(_,K),i,n.touching),q)break;await s()}await s()}if(!q&&p.closed&&_.closed){const P=p.bounds.min.map((O,J)=>(O+p.bounds.max[J])/2);W(P,p,z,i)&&W(P,_,E,i)&&(q=P,D="contained")}if(!q){for(const[P,O,J]of[[p,_,E],[_,p,z]])if(O.closed){for(let K=0;K<N(P)&&!q;K++){const B=F(P,K),mn=B[0].map((Z,$)=>(B[0][$]+B[1][$]+B[2][$])/3);for(const Z of[B[0],mn])if(W(Z,O,J,i)){q=Z,D="contained";break}await s()}if(q)break}}}if(q&&(x.push({id:H,a:k(p),b:k(_),point:q,kind:D,state:"new",note:"",assignee:"",firstSeen:"",lastSeen:""}),x.length>=5e4))throw Error("Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат.")}}return e({phase:"Готово",done:r.length,total:r.length,found:x.length}),x}let ln=0;const X=new Map;self.onmessage=async t=>{if(t.data.request!==void 0){const n=X.get(t.data.request);X.delete(t.data.request),t.data.error?n?.reject(Error(t.data.error)):n?.resolve(t.data.geometry);return}try{const{elements:n,check:e}=t.data,a=await dn(n,e,o=>self.postMessage({progress:o}),()=>!1,t.data.streaming?o=>new Promise((i,u)=>{const r=ln++;X.set(r,{resolve:i,reject:u}),self.postMessage({load:o,request:r})}):void 0);self.postMessage({results:a})}catch(n){self.postMessage({error:n instanceof Error?n.message:String(n)})}}})();
`, be = typeof self < "u" && self.Blob && new Blob(["(self.URL || self.webkitURL).revokeObjectURL(self.location.href);", Me], { type: "text/javascript;charset=utf-8" });
function ze(e) {
  let t;
  try {
    if (t = be && (self.URL || self.webkitURL).createObjectURL(be), !t) throw "";
    const n = new Worker(t, {
      name: e?.name
    });
    return n.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(t);
    }), n;
  } catch {
    return new Worker(
      "data:text/javascript;charset=utf-8," + encodeURIComponent(Me),
      {
        name: e?.name
      }
    );
  }
}
const q = (e) => String(e ?? "").replace(
  /[&<>"']/g,
  (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[t]
);
function xe(e, t) {
  const n = URL.createObjectURL(
    new Blob([t], {
      type: e.endsWith(".html") ? "text/html;charset=utf-8" : "application/json;charset=utf-8"
    })
  ), i = document.createElement("a");
  i.href = n, i.download = e, i.click(), setTimeout(() => URL.revokeObjectURL(n), 6e4);
}
function Re(e, t) {
  const n = q;
  return `<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${n(e.name)}</title><style>body{font:14px/1.5 system-ui;margin:24px;background:#171c23;color:#e6edf5}h1{margin:0}small{color:#a9b7c8}input,select{padding:10px;margin:15px 8px 15px 0;max-width:100%;background:#242e3b;color:inherit;border:1px solid #506074;border-radius:6px}.wrap{overflow:auto}table{border-collapse:separate;border-spacing:0;width:100%}td,th{padding:10px;border-bottom:1px solid #39475a;min-width:100px;vertical-align:top;overflow-wrap:anywhere}th{background:#253142;position:sticky;top:0;text-align:left;white-space:normal}td{max-width:350px}tr[hidden]{display:none}.shot{display:block;width:260px;border:0;background:transparent;padding:0;cursor:zoom-in}dialog{width:min(94vw,1400px);border:1px solid #506074;background:#20242b;color:white;border-radius:10px}dialog img{max-width:100%;max-height:80vh;display:block;margin:12px auto}dialog::backdrop{background:#000b}.shot img{width:100%;border-radius:6px}.legend{margin:12px 0}.red{color:#ff6161}.blue{color:#65baff}@media print{input,select{display:none}body{background:white;color:black}.wrap{overflow:visible}th{position:static;background:#eee}}</style><h1>${n(e.name)}</h1><small>НашеПО · Проверки коллизий · ${n(e.lastRun || "")} · ${e.status === "stale" ? "Результат устарел" : "Последний завершённый расчёт"}</small><p>${n(e.type === "duplicates" ? "Совпадение треугольной геометрии" : "Пересечения поверхностей и вложенность замкнутых тел")}. Точность: ${n(e.precision)} мм.</p><p class="legend"><span class="red">● Элемент А — красный</span> · <span class="blue">● Элемент Б — синий</span></p><input id="search" type="search" placeholder="Поиск по всему отчёту"><select id="state"><option value="">Все состояния</option>${Object.entries(
    X
  ).map(([i, a]) => `<option value="${i}">${a}</option>`).join(
    ""
  )}</select><span id="count"></span><div class="wrap"><table><thead><tr>${["Снимок", "№", "Состояние", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "X", "Y", "Z", "Назначение", "Комментарий"].map((i) => `<th>${i}</th>`).join("")}</tr></thead><tbody>${t.map((i, a) => `<tr data-state="${i.state}"><td>${se(i.image) ? `<button class="shot" type="button"><img src="${i.image}" alt="Снимок конфликта ${a + 1}" loading="lazy"></button>` : "Снимок отсутствует"}</td>${[a + 1, X[i.state], i.a.name, i.a.model, i.a.guid, i.b.name, i.b.model, i.b.guid, ...i.point.map((r) => r.toFixed(4)), i.assignee, i.note].map((r) => `<td>${n(r)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><dialog id="picture"><button id="close-picture">Закрыть</button><img id="full-picture" alt="Снимок конфликта"></dialog><script>const modal=document.getElementById("picture");document.getElementById("close-picture").onclick=()=>modal.close();for(const b of document.querySelectorAll(".shot"))b.onclick=()=>{document.getElementById("full-picture").src=b.querySelector("img").src;modal.showModal()};const q=document.getElementById('search'),s=document.getElementById('state'),rows=[...document.querySelectorAll('tbody tr')];function filter(){let n=0;for(const r of rows){r.hidden=!!((s.value&&r.dataset.state!==s.value)||!r.textContent.toLowerCase().includes(q.value.toLowerCase()));if(!r.hidden)n++}document.getElementById('count').textContent='Коллизий: '+n}q.oninput=s.onchange=filter;filter()<\/script></html>`;
}
function Ue(e, t) {
  return JSON.stringify(
    {
      version: 1,
      id: e.id,
      name: e.name,
      images: Object.fromEntries(
        t.filter((n) => se(n.image)).map((n) => [n.id + ".jpg", n.image])
      ),
      warnings: e.warnings,
      tests: [
        {
          id: e.id,
          name: e.name,
          clashes: t.map((n, i) => ({
            id: n.id,
            name: `Конфликт ${i + 1}`,
            distance: "",
            date: e.lastRun || "",
            description: e.type === "duplicates" ? "Дублирование" : "По пересечению",
            status: X[n.state],
            group: n.assignee,
            note: n.note,
            point: n.point,
            image: se(n.image) ? n.id + ".jpg" : "",
            enabled: n.state !== "resolved",
            reviewed: n.state === "resolved" || n.state === "reviewed" || n.state === "approved",
            excluded: n.state === "excluded",
            elements: [n.a, n.b].map((a) => ({
              guid: a.guid,
              id: a.id,
              source: a.model,
              name: a.name,
              properties: a.properties
            })),
            properties: { Проверка: e.name, Вид: n.kind }
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
  const n = e.shadowRoot || e.attachShadow({ mode: "open" });
  let i, a = P.checks[0]?.id || "", r = "select", d = "", f = 0, m = !1, u = !1, p, b = !0, k = !1;
  const v = /* @__PURE__ */ new Set();
  let I;
  const y = () => P.checks.find((o) => o.id === a), c = (o) => n.querySelector("#" + o);
  n.innerHTML = `<style>${De}</style><main><header><div class="brand"><img src="${Be}" alt=""><b>НашеПО</b><small>${Se}</small></div><button id="scan">Обновить модели</button><button id="new" class="primary">＋ Проверка</button><button id="open">Открыть проверки</button><button id="save">Сохранить проверки</button><button id="settings">⚙</button><button id="help">Справка</button><span id="dirty"></span></header><div class="notice" id="notice" role="status">Откройте IFC/SMDX в проекте и нажмите «Обновить модели».</div><div class="workspace"><aside><input id="test-search" type="search" placeholder="Поиск проверок"><div id="checks"></div><button id="all">Запустить все</button></aside><section class="main"><div class="test-toolbar"><input id="name" aria-label="Имя проверки" placeholder="Имя проверки"><button id="copy">Копировать</button><button id="delete">Удалить</button><button id="run" class="primary">▶ Запустить</button><button id="cancel" hidden>Остановить</button></div><div id="tabs" class="tabs">${[
    ["rules", "Правила"],
    ["select", "Выбрать"],
    ["results", "Результаты"],
    ["report", "Отчёт"]
  ].map(([o, s]) => `<button data-tab="${o}">${s}</button>`).join(
    ""
  )}</div><div id="content"></div></section></div><footer><span id="model-count">Модели не прочитаны</span><span>Расчёт выполняется на вашем компьютере</span></footer><input id="file" type="file" accept=".json" hidden><dialog id="settings-dialog"><h2>Настройки</h2><label>Дистанция камеры, м<input id="distance" type="number" value="15" min="0.5"></label><p class="links"><a href="https://nashepo.ru/" target="_blank" rel="noopener noreferrer">Сайт НашеПО</a><a href="https://t.me/RoburFan" target="_blank" rel="noopener noreferrer">Telegram</a></p><button data-close="settings-dialog">Закрыть</button></dialog><dialog id="help-dialog">${je}<button data-close="help-dialog">Закрыть</button></dialog></main>`;
  const A = (o, s = !1) => {
    c("notice").textContent = o, c("notice").classList.toggle("error", s);
  }, B = async (o) => {
    try {
      await o();
    } catch (s) {
      A(s instanceof Error ? s.message : String(s), !0);
    }
  }, O = () => {
    k = !0, c("dirty").textContent = "Есть несохранённые изменения";
  }, J = () => {
    const o = y();
    o?.lastRun && (o.status = "stale"), O(), g();
  }, W = () => [
    ...new Set(
      (i?.elements || []).flatMap((o) => Object.keys(o.properties))
    )
  ].sort(), T = (o, s) => o.map(
    (l) => `<option value="${q(l)}" ${l === s ? "selected" : ""}>${q(l)}</option>`
  ).join("");
  function V() {
    const o = y(), s = c("result-search")?.value.toLowerCase() || "", l = c("result-state")?.value || "";
    return (o?.results || []).filter(
      (h) => (!l || h.state === l) && (!s || JSON.stringify({ ...h, image: void 0 }).toLowerCase().includes(s))
    );
  }
  function g() {
    const o = c("test-search").value.toLowerCase();
    c("checks").innerHTML = P.checks.filter((s) => s.name.toLowerCase().includes(o)).map(
      (s) => `<button class="check-item ${s.id === a ? "active" : ""}" data-check="${s.id}"><strong>${q(s.name)}</strong><small>${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[s.status]} · ${s.results.filter((l) => !["resolved", "excluded"].includes(l.state)).length} в работе / ${s.results.length}</small></button>`
    ).join("");
  }
  function E(o, s) {
    const l = i?.elements.filter(
      (h) => (y().includeHidden || !h.hidden) && re(h, o)
    ).length || 0;
    return `<article class="selection" data-side="${s}"><h3>Выбор ${s.toUpperCase()} <span>${l} элементов</span></h3><p class="selection-mode">${o.manualOnly ? "Ручная выборка — только указанные элементы" : "Автоматическая выборка — модели и условия"}</p><label>Модели (Ctrl — несколько; без выбора — все)<select multiple size="8" class="models">${(i?.models || []).map((h) => `<option value="${q(h.id)}" ${o.models.includes(h.id) ? "selected" : ""}>${q(h.name)}</option>`).join("")}</select></label><div class="selection-tools"><button data-selection="show">Показать выборку</button><button data-selection="only">Только выделенные</button><button data-selection="include">＋ Добавить выделенные</button><button data-selection="exclude">− Исключить выделенные</button><button data-selection="reset">Вернуть автоматический выбор</button></div><small>Добавлено вручную: ${o.include.length} · исключено: ${o.exclude.length}</small><label>Условия<select class="mode"><option value="all" ${o.mode === "all" ? "selected" : ""}>Выполнены все (И)</option><option value="any" ${o.mode === "any" ? "selected" : ""}>Выполнено любое (ИЛИ)</option></select></label><div class="conditions">${o.conditions.map(
      (h, w) => `<div class="condition" data-condition="${w}"><input class="field" list="property-fields" value="${q(h.field)}" placeholder="Свойство"><select class="op">${[
        ["eq", "равно"],
        ["contains", "содержит"],
        ["ne", "не равно"],
        ["exists", "существует"],
        ["gt", "больше"],
        ["lt", "меньше"]
      ].map(
        ([M, x]) => `<option value="${M}" ${h.op === M ? "selected" : ""}>${x}</option>`
      ).join(
        ""
      )}</select><input class="value" value="${q(h.value)}" placeholder="Значение" ${h.op === "exists" ? "disabled" : ""}><button data-remove="${w}" aria-label="Удалить условие">×</button></div>`
    ).join(
      ""
    )}</div><button data-selection="add">＋ Условие</button></article>`;
  }
  function C() {
    g();
    const o = y();
    c("name").value = o?.name || "";
    for (const s of ["name", "copy", "delete", "run"])
      c(s).disabled = !o || m;
    for (const s of n.querySelectorAll("[data-tab]"))
      s.classList.toggle("active", s.dataset.tab === r);
    if (!o) {
      c("content").innerHTML = '<div class="empty"><h2>Создайте первую проверку</h2><p>Обновите модели, затем выберите, какие элементы проверять друг с другом.</p></div>';
      return;
    }
    r === "select" && (c("content").innerHTML = `<div class="choose-layout"><div class="parameters"><h3>Параметры проверки</h3><label>Тип<select id="type"><option value="intersection" ${o.type === "intersection" ? "selected" : ""}>По пересечению</option><option value="duplicates" ${o.type === "duplicates" ? "selected" : ""}>Дублирование</option></select></label><label title="Числовая точность; не глубина проникновения">Точность расчёта, мм<input id="precision" type="number" value="${o.precision}" min="0.001" max="100" step="0.1"></label><label class="check"><input id="touching" type="checkbox" ${o.touching ? "checked" : ""} ${o.type === "duplicates" ? "disabled" : ""}>Учитывать касания</label><small>Касание — соприкосновение поверхностей без проникновения. Обычно выключено.</small><p class="legend"><span class="part-a">● А — красный</span><span class="part-b">● Б — синий</span></p></div><div class="selection-grid">${E(o.a, "a")}${E(o.b, "b")}</div></div><datalist id="property-fields">${T(W(), "")}</datalist>`), r === "rules" && (c("content").innerHTML = `<div class="rules"><h3>Исключение пар</h3><p>Элемент сам с собой не проверяется. Пара А/Б учитывается один раз.</p><label class="check"><input id="same-model" type="checkbox" ${o.ignoreSameModel ? "checked" : ""}>Не проверять элементы одной модели</label><label class="check"><input id="same-group" type="checkbox" ${o.ignoreSameGroup ? "checked" : ""}>Не проверять геометрию одного составного объекта</label><label>Не проверять пары с одинаковым значением свойства<input id="equal-property" list="property-fields" value="${q(o.equalProperty)}" placeholder="Без ограничения"></label><label class="check"><input id="hidden" type="checkbox" ${o.includeHidden ? "checked" : ""}>Включать скрытые элементы прочитанных моделей</label><p>Незагруженные подключённые файлы нужно открыть перед расчётом.</p><datalist id="property-fields">${T(W(), "")}</datalist></div>`), r === "results" && (c("content").innerHTML = `<div class="result-tools"><input id="result-search" type="search" placeholder="Поиск по результатам"><select id="result-state"><option value="">Все состояния</option>${Object.entries(
      X
    ).map(([s, l]) => `<option value="${s}">${l}</option>`).join(
      ""
    )}</select><button id="show-markers" role="switch" aria-checked="${b}">${b ? "● Знаки включены" : "○ Знаки выключены"}</button><select id="bulk-state">${Object.entries(
      X
    ).map(([s, l]) => `<option value="${s}">${l}</option>`).join(
      ""
    )}</select><button id="bulk">Применить к выбранным</button></div><div class="result-area"><div class="table-area"><div class="scroll" id="table"></div><div class="pager"><button id="prev-page">←</button><span id="page"></span><button id="next-page">→</button><span id="selection-count"></span></div></div><div class="detail" id="detail"></div></div>`, j(), G()), r === "report" && (c("content").innerHTML = `<div class="report"><h3>${q(o.name)}</h3><p>Результатов: ${o.results.length}. Выбрано: ${v.size}. ${o.status === "stale" ? "Результаты устарели — рекомендуется повторный запуск." : ""}</p><label class="check"><input id="selected-only" type="checkbox" ${v.size ? "checked" : ""}>Только выбранные строки</label><label class="check"><input id="report-images" type="checkbox" checked>Добавить снимки (недостающие будут созданы автоматически)</label><button id="export-html" class="primary">Сформировать HTML-отчёт</button><button id="export-viewer">Сессия для плагина «Коллизии»</button><p>Правила и все результаты сохраняются кнопкой «Сохранить проверки» в верхней панели.</p></div>`), c("content").inert = m;
  }
  function j() {
    const o = V(), s = Math.max(1, Math.ceil(o.length / 50));
    f = Math.max(0, Math.min(f, s - 1));
    const l = o.slice(f * 50, f * 50 + 50);
    c("table").innerHTML = o.length ? `<table><thead><tr><th><input id="check-page" type="checkbox" aria-label="Выбрать страницу" ${l.every((h) => v.has(h.id)) ? "checked" : ""}></th>${["№", "Состояние", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "Комментарий"].map((h) => `<th>${h}</th>`).join("")}</tr></thead><tbody>${l.map((h, w) => `<tr data-result="${q(h.id)}" class="${h.id === d ? "active" : ""}"><td><input type="checkbox" class="row-check" aria-label="Выбрать конфликт" ${v.has(h.id) ? "checked" : ""}></td>${[f * 50 + w + 1, X[h.state], h.a.name, h.a.model, h.a.guid || "—", h.b.name, h.b.model, h.b.guid || "—", h.note].map((M) => `<td title="${q(M)}">${q(M)}</td>`).join("")}</tr>`).join("")}</tbody></table>` : '<div class="empty">Нет результатов. Запустите проверку или измените фильтры.</div>', c("page").textContent = `Страница ${f + 1} из ${s} · ${o.length} результатов`, c("selection-count").textContent = `Выбрано: ${v.size}`, c("prev-page").disabled = f === 0, c("next-page").disabled = f === s - 1;
  }
  function G() {
    const o = y()?.results.find((s) => s.id === d);
    c("detail").innerHTML = o ? `<h3>${q(o.a.name)} × ${q(o.b.name)}</h3><p class="legend"><span class="part-a">● А — красный</span><span class="part-b">● Б — синий</span></p>${o.image ? `<button id="open-image" class="preview"><img src="${q(o.image)}" alt="Снимок коллизии"><span>Открыть крупнее</span></button>` : ""}<button id="capture-image">Сохранить текущий ракурс</button><div class="selection-tools"><button id="focus" class="primary">Перейти в 3D</button><button id="previous">←</button><button id="next">→</button></div><p>${o.point.map((s, l) => `${["X", "Y", "Z"][l]}: ${s.toFixed(4)}`).join(" · ")}</p><label>Состояние<select id="edit-state">${Object.entries(
      X
    ).map(
      ([s, l]) => `<option value="${s}" ${o.state === s ? "selected" : ""}>${l}</option>`
    ).join(
      ""
    )}</select></label><label>Назначение<input id="assignee" value="${q(o.assignee)}"></label><label>Комментарий<textarea id="note" rows="3">${q(o.note)}</textarea></label>${[
      o.a,
      o.b
    ].map(
      (s, l) => `<details><summary>Элемент ${l ? "Б" : "А"} · свойства</summary><dl>${Object.entries(
        s.properties
      ).map(([h, w]) => `<dt>${q(h)}</dt><dd>${q(w)}</dd>`).join("")}</dl></details>`
    ).join("")}` : "<p>Выберите конфликт в таблице.</p>";
  }
  function L() {
    t.markers(
      V(),
      d,
      b,
      (o) => B(() => $(o, !0))
    );
  }
  function $(o, s = !1) {
    if (!m) {
      if (d = o, r === "results") {
        for (const l of n.querySelectorAll("[data-result]"))
          l.classList.toggle("active", l.dataset.result === o);
        G();
      }
      if (L(), s) {
        const l = y()?.results.find((h) => h.id === o);
        l && t.focus(l, Number(c("distance").value));
      }
    }
  }
  async function N() {
    i = await t.scan(A, () => u), c("model-count").textContent = `Моделей: ${i.models.length} · элементов: ${i.elements.length}`;
    for (const o of P.checks)
      o.fingerprint && o.fingerprint !== i.fingerprint && (o.status = "stale");
    C(), A(
      i.warnings.length ? i.warnings.join(" ") : "Модели прочитаны. Настройте выборки и запустите проверку.",
      !!i.warnings.length
    );
  }
  const z = (o) => {
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
      c(s).disabled = o;
    c("cancel").hidden = !o, c("content").inert = o, c("checks").inert = o;
  };
  async function Q(o) {
    const s = (h) => A(`${o.name} · ${h.phase} ${h.done}/${h.total} · найдено ${h.found}`);
    let l;
    try {
      l = new ze();
    } catch {
      return qe(
        i.elements,
        o,
        s,
        () => u,
        (h) => t.geometry(h, () => u)
      );
    }
    return p = l, new Promise((h, w) => {
      const M = () => {
        l.terminate(), p = void 0, I = void 0;
      };
      I = () => {
        M(), w(Error("Расчёт отменён. Предыдущие результаты сохранены."));
      }, l.onmessage = async (x) => {
        if (x.data.load) {
          try {
            const S = await t.geometry(
              x.data.load,
              () => u || p !== l
            );
            if (p !== l) return;
            const F = [
              S.vertices?.buffer,
              S.indices?.buffer
            ].filter(Boolean);
            l.postMessage(
              { request: x.data.request, geometry: S },
              F
            );
          } catch (S) {
            p === l && l.postMessage({
              request: x.data.request,
              error: S instanceof Error ? S.message : String(S)
            });
          }
          return;
        }
        x.data.progress ? s(x.data.progress) : (M(), x.data.error ? w(Error(x.data.error)) : h(x.data.results));
      }, l.onerror = (x) => {
        M(), w(
          Error(
            `Не удалось запустить расчёт в фоновом потоке: ${x.message || "ошибка загрузки"}`
          )
        );
      }, l.postMessage({
        elements: i.elements,
        streaming: typeof t.geometry == "function",
        check: structuredClone({ ...o, results: [], warnings: [] })
      });
    });
  }
  async function D(o = !1) {
    if (m) return;
    const s = o ? [...P.checks] : [y()].filter(Boolean);
    if (!s.length) throw Error("Создайте проверку.");
    u = !1, z(!0);
    try {
      if (await N(), z(!0), i.warnings.length)
        throw Error(
          "Состав моделей прочитан не полностью. " + i.warnings.join(" ")
        );
      for (const l of s) {
        if (u) break;
        for (const x of [l.a, l.b]) {
          if (x.models.some((S) => !i.models.some((F) => F.id === S)))
            throw Error(
              `${l.name}: одна из моделей выборки отсутствует. Исправьте выборку.`
            );
          if (x.include.some((S) => !i.elements.some((F) => F.id === S)))
            throw Error(
              `${l.name}: вручную добавленный элемент отсутствует в модели.`
            );
        }
        const h = Ee(l);
        if (l.configAtRun === h && l.modelsAtRun?.some(
          (x) => !i.models.some((S) => S.id === x)
        ))
          throw Error(
            `${l.name}: состав моделей уменьшился. Подключите прежние модели или создайте копию проверки для нового состава. Прежние результаты сохранены.`
          );
        const w = await Q(l);
        if (u || !t.isCurrent())
          throw Error(
            "Проект изменился или расчёт отменён. Предыдущие результаты сохранены."
          );
        const M = (/* @__PURE__ */ new Date()).toISOString();
        l.results = Ae(
          l.configAtRun === h ? l.results : [],
          w,
          M
        ), l.lastRun = M, l.fingerprint = i.fingerprint, l.configAtRun = h, l.modelsAtRun = i.models.map((x) => x.id), l.status = "done", l.warnings = [], a = l.id, d = l.results[0]?.id || "", v.clear(), O();
      }
      r = "results", C(), L(), A(
        `Проверка завершена. ${y()?.results.length || 0} результатов. Сохраните проверки для продолжения работы.`
      );
    } finally {
      z(!1), C();
    }
  }
  function Y(o) {
    const s = o.closest("[data-side]")?.dataset.side;
    if (!s) return;
    const l = y()[s], h = o.closest("[data-condition]")?.dataset.condition, w = o;
    if (w.classList.contains("models") && (l.manualOnly = !1), w.classList.contains("models") && (l.models = Array.from(o.selectedOptions).map(
      (M) => M.value
    )), w.classList.contains("mode") && (l.mode = w.value), h !== void 0) {
      const M = l.conditions[Number(h)];
      w.classList.contains("field") && (M.field = w.value), w.classList.contains("op") && (M.op = w.value), w.classList.contains("value") && (M.value = w.value);
    }
    J(), C();
  }
  c("new").onclick = () => {
    const o = Ie();
    o.name = `Проверка ${P.checks.length + 1}`, P.checks.push(o), a = o.id, r = "select", d = "", v.clear(), O(), C();
  }, c("scan").onclick = () => B(async () => {
    u = !1, z(!0);
    try {
      await N();
    } finally {
      z(!1), C();
    }
  }), c("run").onclick = () => B(() => D()), c("all").onclick = () => B(() => D(!0)), c("cancel").onclick = () => {
    u = !0, I?.();
  }, c("test-search").oninput = g, c("checks").onclick = (o) => {
    const s = o.target.closest(
      "[data-check]"
    );
    s && !m && (t.clear(), a = s.dataset.check, d = "", v.clear(), f = 0, C());
  }, c("tabs").onclick = (o) => {
    const s = o.target.closest("[data-tab]");
    s && !m && (r = s.dataset.tab, C());
  }, c("name").onchange = () => {
    const o = y();
    o && (o.name = c("name").value.trim() || "Проверка", O(), g());
  }, c("copy").onclick = () => {
    const o = y();
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
    }), P.checks.push(s), a = s.id, d = "", v.clear(), O(), C();
  }, c("delete").onclick = () => {
    y() && confirm(`Удалить проверку «${y().name}» и её результаты?`) && (P.checks = P.checks.filter((o) => o.id !== a), a = P.checks[0]?.id || "", v.clear(), t.clear(), O(), C());
  }, c("save").onclick = () => {
    xe("НашеПО-проверки.json", JSON.stringify(P, null, 2)), k = !1, c("dirty").textContent = "Файл проверок сохранён";
  }, c("open").onclick = () => c("file").click(), c("file").onchange = () => B(async () => {
    const o = c("file").files?.[0];
    if (!o) return;
    const s = Oe(await o.text());
    k && !confirm("Заменить текущие несохранённые проверки данными из файла?") || (P.checks = s.checks, a = P.checks[0]?.id || "", d = "", v.clear(), t.clear(), k = !1, c("dirty").textContent = "Проверки открыты", C(), A("Проверки открыты. Обновите модели перед переходом к элементам."), c("file").value = "");
  });
  for (const o of ["settings", "help"])
    c(o).onclick = () => c(o + "-dialog").showModal();
  for (const o of n.querySelectorAll("[data-close]"))
    o.onclick = () => c(o.dataset.close).close();
  c("content").onchange = (o) => B(() => {
    const s = o.target, l = y();
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
        const w = Number(s.value);
        if (!Number.isFinite(w) || w < 1e-3 || w > 100)
          throw s.value = String(l.precision), Error("Точность должна быть от 0,001 до 100 мм.");
        l.precision = w;
      }
      s.id === "type" && (l.type = s.value), s.id === "touching" && (l.touching = s.checked), s.id === "same-model" && (l.ignoreSameModel = s.checked), s.id === "same-group" && (l.ignoreSameGroup = s.checked), s.id === "hidden" && (l.includeHidden = s.checked), s.id === "equal-property" && (l.equalProperty = s.value), J(), C();
      return;
    }
    if (s.id === "result-state") {
      f = 0, j();
      return;
    }
    if (s.id === "check-page") {
      for (const w of V().slice(f * 50, f * 50 + 50))
        s.checked ? v.add(w.id) : v.delete(w.id);
      j();
      return;
    }
    if (s.classList.contains("row-check")) {
      const w = s.closest("[data-result]").dataset.result;
      s.checked ? v.add(w) : v.delete(w), c("selection-count").textContent = `Выбрано: ${v.size}`;
      return;
    }
    const h = l.results.find((w) => w.id === d);
    h && (s.id === "edit-state" && (h.state = s.value, j(), g(), L()), s.id === "assignee" && (h.assignee = s.value), s.id === "note" && (h.note = s.value, j()), O());
  }), c("content").oninput = (o) => {
    o.target.id === "result-search" && (f = 0, j());
  }, c("content").onclick = (o) => B(async () => {
    const s = o.target, l = s.closest("button"), h = y();
    if (!h) return;
    if (l?.dataset.selection || l?.dataset.remove !== void 0) {
      const M = l.closest("[data-side]").dataset.side, x = h[M];
      if (l.dataset.remove !== void 0)
        x.conditions.splice(Number(l.dataset.remove), 1);
      else
        switch (l.dataset.selection) {
          case "add":
            x.conditions.push({ field: "Имя", op: "contains", value: "" });
            break;
          case "show":
            t.select(
              (i?.elements || []).filter(
                (S) => (h.includeHidden || !S.hidden) && re(S, x)
              ).map((S) => S.id)
            );
            return;
          case "only": {
            const S = t.selected();
            if (!S.length) throw Error("Выделите элементы в 3D-сцене.");
            x.include = S, x.exclude = [], x.manualOnly = !0;
            break;
          }
          case "include": {
            const S = t.selected();
            if (!S.length) throw Error("Выделите элементы в 3D-сцене.");
            x.include = [.../* @__PURE__ */ new Set([...x.include, ...S])], x.exclude = x.exclude.filter((F) => !S.includes(F));
            break;
          }
          case "exclude": {
            const S = t.selected();
            if (!S.length) throw Error("Выделите элементы в 3D-сцене.");
            x.exclude = [.../* @__PURE__ */ new Set([...x.exclude, ...S])], x.include = x.include.filter((F) => !S.includes(F));
            break;
          }
          case "reset":
            x.manualOnly = !1, x.include = [], x.exclude = [];
        }
      J(), C();
      return;
    }
    if (l?.id === "prev-page" && (f--, j()), l?.id === "next-page" && (f++, j()), l?.id === "show-markers" && (b = !b, l.textContent = b ? "● Знаки включены" : "○ Знаки выключены", l.setAttribute("aria-checked", String(b)), L()), l?.id === "bulk") {
      const M = c("bulk-state").value;
      for (const x of h.results) v.has(x.id) && (x.state = M);
      O(), j(), G(), g(), L();
    }
    if (l?.id === "capture-image") {
      const M = h.results.find((x) => x.id === d);
      if (M) {
        u = !1, z(!0);
        try {
          M.image = await t.snapshot(
            M,
            Number(c("distance").value),
            () => u,
            !0
          ), O(), G(), A("Снимок сохранён в результат.");
        } finally {
          z(!1);
        }
      }
      return;
    }
    if (l?.id === "open-image") {
      const M = h.results.find((x) => x.id === d);
      if (M?.image) {
        const x = document.createElement("dialog");
        x.className = "image-dialog", x.innerHTML = '<button>Закрыть</button><img alt="Снимок коллизии">', x.querySelector("img").src = M.image, x.querySelector("button").onclick = () => {
          x.close(), x.remove();
        }, n.append(x), x.showModal();
      }
      return;
    }
    if (l?.id === "focus" && $(d, !0), l?.id === "previous" || l?.id === "next") {
      const M = V(), x = M.findIndex((S) => S.id === d) + (l.id === "next" ? 1 : -1);
      M[x] && (f = Math.floor(x / 50), j(), $(M[x].id, !0));
    }
    if (l?.id === "export-html" || l?.id === "export-viewer") {
      const M = c("selected-only").checked ? h.results.filter((S) => v.has(S.id)) : h.results;
      if (!M.length) throw Error("Нет результатов для отчёта.");
      if (c("report-images").checked) {
        const S = t.view, F = S?.storeView();
        u = !1, z(!0);
        try {
          let oe = 0;
          for (const _ of M) {
            if (u)
              throw Error(
                "Подготовка отчёта отменена. Уже полученные снимки сохранены."
              );
            if (A("Подготовка снимков: " + ++oe + " / " + M.length), !_.image) {
              if (_.state === "resolved" && !t.canLocate(_)) continue;
              _.image = await t.snapshot(
                _,
                Number(c("distance").value),
                () => u
              ), O();
            }
          }
        } finally {
          if (S && t.isCurrent()) {
            const oe = h.results.find((_) => _.id === d);
            if (oe)
              try {
                t.focus(
                  oe,
                  Number(c("distance").value),
                  !1
                );
              } catch {
              }
            F && S.restoreView(F);
          }
          z(!1);
        }
      }
      const x = c("report-images").checked ? M : M.map((S) => ({ ...S, image: void 0 }));
      xe(
        h.name + (l.id === "export-html" ? ".html" : ".collision360.json"),
        l.id === "export-html" ? Re(h, x) : Ue(h, x)
      ), A(
        "Отчёт подготовлен. Результатов: " + M.length + "; со снимками: " + x.filter((S) => S.image).length + "."
      );
    }
    const w = s.closest("[data-result]");
    w && !s.closest("input") && !window.getSelection()?.toString() && $(w.dataset.result);
  }), c("content").ondblclick = (o) => {
    const s = o.target, l = s.closest("[data-result]");
    l && !s.closest("input") && B(() => $(l.dataset.result, !0));
  };
  const R = setInterval(() => {
    if (i && !t.isCurrent()) {
      i = void 0, t.clear();
      for (const o of P.checks) o.lastRun && (o.status = "stale");
      c("model-count").textContent = "Проект изменился", A("Активный проект изменился. Обновите модели."), m || C();
    }
  }, 1500);
  return C(), () => {
    clearInterval(R), u = !0, I?.(), p?.terminate(), t.clear();
  };
}
var fe = /* @__PURE__ */ ((e) => (e.object = "object", e.drawing = "drawing", e.table = "table", e.record = "record", e.textStyle = "textstyle", e.textStyleTable = "textstyles", e.linetype = "linetype", e.linetypeTable = "linetypes", e.layer = "layer", e.layerTable = "layers", e.block = "block", e.blockTable = "blocks", e.layout = "layout", e.layoutTable = "layouts", e.type = "type", e.typeTable = "types", e.material = "material", e.materialTable = "materials", e.geometry = "geometry", e.geometryTable = "geometries", e.group = "group", e.groupTable = "groups", e.attachment = "attachment", e.attachmentTable = "attachments", e.entities = "entities", e.entity = "entity", e.line = "l", e.solid = "s", e.insert = "i", e.polyline = "p", e.circle = "c", e.arc = "a", e.polyline3d = "p3", e.proxy = "x", e.text = "t", e.mtext = "mt", e.wipeout = "w", e.model3d = "g", e.alignment = "al", e))(fe || {});
async function Pe(e, t) {
  if (await new Promise((u) => requestAnimationFrame(() => u())), t()) throw Error("Подготовка снимков отменена.");
  const { width: n, height: i } = e.camera, a = Array.from(document.querySelectorAll("canvas")).filter(
    (u) => {
      const p = u.getBoundingClientRect();
      return p.width > 100 && p.height > 100 && u.width > 0 && u.height > 0 && getComputedStyle(u).visibility !== "hidden" && (Math.abs(p.width - n) < 4 && Math.abs(p.height - i) < 4 || Math.abs(u.width - n) < 4 && Math.abs(u.height - i) < 4);
    }
  );
  if (!a.length)
    throw Error(
      "Снимок 3D-окна недоступен: откройте одно видимое окно модели."
    );
  const r = a[0].getBoundingClientRect();
  if (a.some((u) => {
    const p = u.getBoundingClientRect();
    return Math.abs(p.x - r.x) > 4 || Math.abs(p.y - r.y) > 4;
  }))
    throw Error(
      "Открыто несколько подходящих 3D-окон. Оставьте одно окно для снимка."
    );
  const d = document.createElement("canvas"), f = Math.min(1, 1280 / a[0].width);
  d.width = Math.round(a[0].width * f), d.height = Math.round(a[0].height * f);
  const m = d.getContext("2d");
  m.fillStyle = "#20242b", m.fillRect(0, 0, d.width, d.height), e.repaint();
  for (const u of a)
    m.drawImage(u, 0, 0, d.width, d.height);
  try {
    return d.toDataURL("image/jpeg", 0.82);
  } catch {
    throw Error("Браузер запретил чтение изображения 3D-окна.");
  }
}
const ce = "nashepo.checks.points";
function ye(e) {
  let t = performance.now();
  return async () => {
    if (e()) throw Error("Операция отменена.");
    performance.now() - t >= 16 && (await new Promise((n) => setTimeout(n, 0)), t = performance.now());
  };
}
function ae(e, t, n, i = 0) {
  if (i > 12 || e == null) return;
  if (typeof e != "object") {
    n[t] = String(e);
    return;
  }
  if (Array.isArray(e)) {
    e.forEach((r, d) => ae(r, `${t}[${d}]`, n, i + 1));
    return;
  }
  const a = e;
  if ("$value" in a) {
    ae(a.$value, t, n, i + 1);
    return;
  }
  for (const [r, d] of Object.entries(a))
    r.startsWith("$") || ae(d, t ? `${t}.${r}` : r, n, i + 1);
}
class Ze {
  constructor(t) {
    this.ctx = t;
  }
  ctx;
  metadata = /* @__PURE__ */ new Map();
  refs = /* @__PURE__ */ new Map();
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
  async scan(t, n) {
    const i = this.app, a = this.view, r = i?.model;
    if (!a || !r?.layouts || !r.attachments)
      throw Error(
        "Откройте проект Топоматик 360 с IFC или SMDX и сделайте его 3D-окно активным."
      );
    const d = [], f = [], m = [], u = /* @__PURE__ */ new Map(), p = /* @__PURE__ */ new Set();
    let b = 2166136261;
    const k = ye(
      () => n() || i !== this.app || a !== this.view
    );
    let v = -1 / 0;
    const I = (c) => {
      for (let A = 0; A < c.length; A++)
        b = Math.imul(b ^ c.charCodeAt(A), 16777619);
    }, y = async (c, A, B) => {
      if (p.has(c)) return;
      p.add(c);
      const O = c.layers.layer0?.modelName || A, J = A;
      d.push({ id: J, name: O });
      const W = [];
      c.layouts.model?.walk((g) => (g.type === fe.model3d ? W.push(g) : g.type === fe.insert && f.push(`${O}: вставка блока не включена в расчёт.`), !1));
      const T = /* @__PURE__ */ new Map();
      for (const g of W) {
        const E = JSON.stringify([
          g.layer?.UUID || "",
          g.$id || g.$path
        ]);
        T.set(E, [g]);
      }
      for (const [g, E] of T) {
        if (n()) throw Error("Чтение моделей отменено.");
        if (i !== this.app || a !== this.view)
          throw Error(
            "Активный проект изменился. Запустите чтение моделей заново."
          );
        const C = E[0].layer, j = {};
        try {
          if (C) {
            const R = [];
            let o = C;
            for (; o && R.length < 64; )
              R.unshift(o), o = o.layer;
            for (const s of R)
              ae(s.typedProperties(), "", j), s.typed?.name && (j.Тип = s.typed.name);
          }
        } catch {
          f.push(`${O} / ${g}: часть свойств недоступна.`);
        }
        const G = j["ifc.id"] || Object.entries(j).find(
          ([R]) => /(^|\.)(globalid|ifcguid|guid)$/i.test(R)
        )?.[1] || "", L = C?.name || E[0].$id || "Элемент", $ = JSON.stringify([J, g]);
        Object.assign(j, {
          Модель: O,
          Имя: L,
          GUID: G,
          Объект: C?.UUID || g
        });
        const N = {
          min: [1 / 0, 1 / 0, 1 / 0],
          max: [-1 / 0, -1 / 0, -1 / 0]
        };
        let z = !0, Q = !1, D = 0;
        for (const R of E) {
          z &&= R.isClosed;
          for (const o of Object.values(R.meshes)) {
            const s = o.geometry;
            if (!s || s.indices.length % 3) {
              Q = !0;
              continue;
            }
            z &&= o.isClosed, D += s.indices.length / 3;
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
              for (let w = 0; w < 3; w++)
                N.min[w] = Math.min(N.min[w], h[w]), N.max[w] = Math.max(N.max[w], h[w]);
              if (I(h.join(",")), l % 6e4 === 0 && (performance.now() - v > 200 && (v = performance.now(), t(
                "Индексирование: " + O + " · " + m.length + " элементов"
              )), await k(), n()))
                throw Error("Чтение моделей отменено.");
            }
            for (let l = 0; l < s.indices.length; l++)
              if (b = Math.imul(b ^ s.indices[l], 16777619), l % 15e4 === 0 && (await k(), n()))
                throw Error("Чтение моделей отменено.");
          }
        }
        if (Q || !D) {
          if (f.push(
            O + " / " + L + ": геометрия отсутствует или неполна."
          ), !D) continue;
          z = !1;
        }
        const Y = {
          id: $,
          name: L,
          model: O,
          modelId: J,
          guid: G,
          properties: j,
          hidden: B || !!C?.resolveHidden() || !!C?.resolveDisabled(),
          triangles: new Float64Array(0),
          triangleCount: D,
          closed: z,
          bounds: N
        };
        I(JSON.stringify([$, j, Y.hidden])), m.push(Y), u.set($, E);
      }
      const V = [];
      c.attachments.forEach((g) => {
        V.push(g);
      });
      for (const g of V)
        g.model ? await y(
          g.model,
          `${A}/${g.name || g.uri || g.$id}`,
          B || g.hidden
        ) : f.push(
          `${g.name || g.uri || "Подключённая модель"}: модель не загружена. Откройте её перед расчётом.`
        );
    };
    if (await y(r, r.layers.layer0?.modelName || "Проект", !1), !m.length)
      throw Error(
        "В открытом проекте не найдены 3D-элементы с доступной геометрией."
      );
    return this.clear(), this.refs = u, this.metadata = new Map(m.map((c) => [c.id, c])), this.scannedApp = i, this.scannedView = a, {
      elements: m,
      fingerprint: `${m.length}:${b >>> 0}`,
      warnings: [...new Set(f)],
      models: d
    };
  }
  async geometry(t, n) {
    const i = ye(() => n() || !this.isCurrent());
    if (!this.isCurrent()) throw Error("Активная модель изменилась.");
    const a = this.metadata.get(t), r = this.refs.get(t);
    if (!a || !r) throw Error("Элемент отсутствует.");
    const d = r.flatMap(
      (v) => Object.values(v.meshes).map((I) => ({
        object: v,
        g: I.geometry
      }))
    );
    let f = 0, m = 0;
    for (const { g: v } of d) {
      if (!v) throw Error("Геометрия недоступна.");
      f += v.vertices.length, m += v.indices.length;
    }
    const u = new Float64Array(f), p = new Uint32Array(m);
    let b = 0, k = 0;
    for (const { object: v, g: I } of d) {
      if (!I) throw Error("Геометрия недоступна.");
      for (let y = 0; y < I.vertices.length; y += 3) {
        const c = [I.vertices[y], I.vertices[y + 1], I.vertices[y + 2]];
        if (Math3d.mat4.mulv3(c, v.matrix, c), u.set(c, b + y), y % 6e4 === 0 && (await i(), n() || !this.isCurrent()))
          throw Error("Чтение геометрии отменено.");
      }
      for (let y = 0; y < I.indices.length; y++) {
        if (I.indices[y] >= I.vertices.length / 3)
          throw Error("Некорректный индекс геометрии.");
        if (p[k + y] = b / 3 + I.indices[y], y % 15e4 === 0 && (await i(), n()))
          throw Error("Чтение геометрии отменено.");
      }
      b += I.vertices.length, k += I.indices.length;
    }
    return { ...a, vertices: u, indices: p };
  }
  selected() {
    if (!this.isCurrent())
      throw Error("Сначала обновите модели текущего проекта.");
    const t = new Set(this.view?.layer.selectedObjects());
    return [...this.refs].filter(([, n]) => n.some((i) => t.has(i))).map(([n]) => n);
  }
  select(t) {
    if (!this.isCurrent())
      throw Error("Сначала обновите модели текущего проекта.");
    const n = new Set(t.flatMap((i) => this.refs.get(i) || []));
    this.view.layer.clearSelected(), this.view.layer.selectObjects((i) => n.has(i), !0), this.view.invalidate();
  }
  clear() {
    if (this.pointView) {
      const t = this.pointView.annotations.get(ce);
      t && this.pointView.annotations.release(t), this.pointView.invalidate(), this.pointView = void 0;
    }
  }
  focus(t, n, i = !0) {
    if (!this.isCurrent())
      throw Error("Обновите модели текущего проекта перед переходом.");
    if (!Number.isFinite(n) || n < 0.5)
      throw Error("Дистанция камеры должна быть не менее 0,5 м.");
    if (!this.refs.has(t.a.id) || !this.refs.has(t.b.id))
      throw Error("Один из элементов отсутствует в загруженных моделях.");
    this.view.layer.clearSelected(), this.highlight([t.a.id, t.b.id]);
    const a = t.point, r = this.view;
    r.camera?.id !== "3d" && r.setCameraType("3d");
    const d = [-0.65, 0.65, -0.394], f = Math.hypot(...d);
    d.forEach((m, u) => d[u] = m / f), r.lookAt(
      a.map((m, u) => m - d[u] * n),
      d,
      [0, 0, 1],
      i,
      a
    );
  }
  /**
   * Выделить оба элемента коллизии штатным выделением программы.
   *
   * Раньше вместо этого поверх модели рисовалась перекрашенная копия обоих
   * элементов. При камере с масштабом сдвиг, который убирал мерцание граней,
   * получался не миллиметровым, а заметным, и красная копия оказывалась в
   * стороне от самой коллизии. Штатное выделение такой копии не создаёт.
   */
  highlight(t) {
    const n = this.view;
    if (!n) return;
    const i = new Set(t.flatMap((a) => this.refs.get(a) || []));
    n.layer.clearSelected(), n.layer.selectObjects((a) => i.has(a), !0), n.invalidate();
  }
  async snapshot(t, n, i, a = !1) {
    if (!this.isCurrent())
      throw Error("Обновите модели перед созданием снимков.");
    if (!this.canLocate(t))
      throw Error("Элементы результата отсутствуют в открытых моделях.");
    return a ? (this.view.layer.clearSelected(), this.highlight([t.a.id, t.b.id])) : this.focus(t, n, !1), Pe(this.view, () => i() || !this.isCurrent());
  }
  markers(t, n, i, a) {
    if (!this.isCurrent()) return;
    const r = this.view;
    this.pointView && this.pointView !== r && this.clear();
    const d = r.annotations.get(ce);
    if (d && r.annotations.release(d), this.pointView = r, !i) {
      r.invalidate();
      return;
    }
    const f = r.annotations.create(ce, 1e4), m = t.filter((u) => u.id !== n).concat(t.filter((u) => u.id === n));
    for (const u of m.slice(-3e3)) {
      if (u.state === "resolved") continue;
      const [p, b, k] = u.point, v = u.id === n, I = u.state === "excluded" ? "#78818c" : u.state === "approved" || u.state === "reviewed" ? "#28b94b" : "#e1372d", y = v ? "#f2c94c" : I, c = () => a(u.id), A = [
        { type: "line", a: [p, b, k], b: [p, b, k + 1], color: y, width: 5 },
        {
          type: "polyline",
          points: [
            [p - 0.65, b, k + 1],
            [p + 0.65, b, k + 1],
            [p, b, k + 2.2],
            [p - 0.65, b, k + 1]
          ],
          color: y,
          fillColor: I,
          width: v ? 5 : 2
        },
        {
          type: "line",
          a: [p, b - 0.01, k + 1.85],
          b: [p, b - 0.01, k + 1.4],
          color: "#ffffff",
          width: 4
        },
        {
          type: "line",
          a: [p, b - 0.01, k + 1.22],
          b: [p, b - 0.01, k + 1.27],
          color: "#ffffff",
          width: 4
        }
      ];
      f.add({
        id: u.id,
        type: "shaped",
        shapes: A,
        activeShapes: A,
        activateCommand: c,
        dblCommand: c
      }), v && f.add({
        id: u.id + ":label",
        type: "simple",
        position: [p, b, k + 2.35],
        label: `${u.a.name} × ${u.b.name}`,
        labelBackground: "#f2c94c",
        labelColor: "#171717",
        activateCommand: c
      });
    }
    r.invalidate();
  }
}
let we;
const Ge = {
  open(e) {
    e.manager.revealView("nashepo.collisionfinder360/checks_panel");
  },
  mount(e) {
    const t = e.el;
    if (!t) return;
    we?.();
    const n = document.createElement("div");
    n.style.height = "100%", t.replaceChildren(n), we = Ye(n, new Ze(e));
  }
};
export {
  Ge as default
};
