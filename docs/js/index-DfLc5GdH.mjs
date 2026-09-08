const Ue = `<h2>Работа с проверками</h2>
<details open><summary>1. Первая проверка</summary><ol><li>Откройте проект и подключите IFC/SMDX штатными средствами Топоматик 360.</li><li>Откройте нижнюю вкладку «Проверки» и нажмите «Обновить модели».</li><li>Нажмите «＋ Проверка» и задайте ей понятное имя.</li><li>Во вкладке «Выбрать» оставьте галочки только у нужных файлов в А и Б. «Все модели» включено по умолчанию.</li><li>Выберите «По пересечению» или «Дублирование» и нажмите «Запустить».</li><li>Во вкладке «Результаты» дважды нажмите строку: камера направится к конфликту, элемент А будет красным, элемент Б — синим.</li></ol><p>Первое обновление без созданной проверки получает только список файлов. При запуске индексируются модели, отмеченные хотя бы в одной стороне. После создания проверки кнопка «Обновить модели» обновляет её выбранный состав.</p></details>
<details><summary>2. Выборки по параметрам и сохранённые наборы</summary><p>Галочки моделей и условия <code>Параметр = значение</code> действуют вместе. Например, в А можно отметить файл инженерных сетей и условие «Система содержит ВК», а в Б — модель здания. Режим «И» требует все условия, режим «ИЛИ» — любое. После выбора файлов нажмите «Обновить модели»: в полях появятся доступные свойства и их значения только из выбранного состава.</p><p>Чтобы повторно использовать такую выборку, настройте модели и условия и нажмите «Сохранить как набор». В другой проверке или стороне выберите набор и нажмите «Применить». Так сохранённый набор параметров можно сравнить с конкретной моделью, другим набором или той же моделью. Наборы входят в файл проверок.</p><p>IFC GUID читается из свойства <code>ifc.id</code>; также поддерживаются GlobalId, IfcGuid и GUID.</p></details>
<details><summary>3. Работа с выделением в 3D</summary><p>Сначала выделите элементы штатными средствами в 3D-окне, затем используйте кнопку в нужной стороне:</p><ul><li><b>Показать выборку</b> — выделяет весь текущий состав.</li><li><b>Только выделенные</b> — создаёт ручную выборку только из выделенных объектов.</li><li><b>＋ Добавить выделенные</b> — добавляет объекты сверх автоматических условий.</li><li><b>− Исключить выделенные</b> — исключает объекты из выборки.</li><li><b>Вернуть автоматический выбор</b> — снова использует модели и параметры.</li></ul><p>Ручные идентификаторы могут измениться после замены IFC/SMDX, поэтому такую выборку следует проверить заново.</p></details>
<details><summary>4. Пересечения, вхождение, касания и дубликаты</summary><p><b>Пересечение</b> фиксирует пересечение поверхностей или вложенность замкнутых тел. <b>Расчётное вхождение</b> — оценка глубины проникновения в миллиметрах. Поле «Минимальное вхождение» отсекает меньшие результаты, например значение 20 оставляет конфликты от 20 мм.</p><p>Для открытой или неполной поверхности надёжно определить глубину нельзя; такой результат получает нулевую оценку. «Точность расчёта» задаёт числовую погрешность. <b>Касание</b> — соприкосновение без проникновения; переключатель включает такие пары.</p><p><b>Дублирование</b> ищет совпадающие треугольники в одинаковых мировых координатах. Для дубликатов внутри файла отметьте его и в А, и в Б. Порядок вершин не важен; разная триангуляция одинаковой формы пока не сопоставляется.</p></details>
<details><summary>5. Составные объекты и неполная геометрия</summary><p>Один IFC-объект может состоять из нескольких частей. Чтобы не сравнивать его части между собой, включите «Не проверять геометрию одного составного объекта» во вкладке «Правила». Там же можно исключить пары одной модели или одинакового значения свойства.</p><p>Пустые и неполные геометрические части пропускаются, а пригодные части модели продолжают участвовать. Плагин показывает сводное замечание с количеством пропущенных элементов. Незагруженный подключённый файл блокирует расчёт только тогда, когда он входит в выборку.</p></details>
<details><summary>6. Результаты и состояния</summary><p>«Новый» найден впервые, «Активный» найден повторно, «Проверенный» рассмотрен, «Подтверждённый» подтверждён, «Исключённый» исключён из работы. «Исправленный» означает, что пара исчезла при повторном расчёте с теми же правилами; состояние можно изменить вручную.</p><p>В таблице доступны IFC GUID, расчётное вхождение, назначение и комментарий. Галочки меняют состояние сразу у нескольких строк. Значения можно выделять и копировать. Состояние «Устарела» у проверки означает, что после последнего расчёта изменили её тип, выборки, параметры или правила. Результаты сохраняются до нового успешного запуска.</p></details>
<details><summary>7. Отчёт и снимки</summary><p>В карточке результата можно сохранить текущий ракурс и открыть снимок крупнее. При формировании HTML недостающие снимки создаются автоматически. В результатах и готовом отчёте доступны поиск, фильтр состояний и фильтр минимального вхождения.</p><p>Файл сессии предназначен для открытия результатов в плагине «НашеПО · Коллизии». Исправленным парам с отсутствующими элементами сохраняется прежний снимок.</p></details>
<details><summary>8. Проекты, сохранение и очистка</summary><p>В пределах открытой страницы каждый проект получает собственный список проверок. При переключении проекта данные предыдущего не подмешиваются. «Очистить проект» удаляет проверки, результаты и наборы только у текущего проекта.</p><p>«Сохранить проверки» записывает правила, наборы, результаты, комментарии и снимки в JSON. «Открыть проверки» загружает этот файл. Геометрия в файл не входит: соответствующие модели надо открыть отдельно. После закрытия или обновления страницы продолжение работы возможно из сохранённого файла.</p></details>
<details><summary>9. Большие проекты</summary><p>Жёсткого предела в 6 млн треугольников нет. При запуске строится индекс только по отмеченным моделям. Точная геометрия передаётся в расчёт по мере появления близких пар в компактном индексированном виде.</p><p>Время и память всё равно зависят от состава выборок и числа потенциальных пар. Разделяйте проверки по моделям, системам и параметрам. В сцене одновременно показывается до 3000 знаков; при 50 000 результатах расчёт останавливается без замены прежнего результата.</p></details>`, De = "0.3.0", xe = (e) => typeof e == "string" && /^data:image\/(jpeg|png);base64,[A-Za-z0-9+/=]+$/.test(e), re = {
  new: "Новый",
  active: "Активный",
  reviewed: "Проверенный",
  approved: "Подтверждённый",
  resolved: "Исправленный",
  excluded: "Исключённый"
}, Ee = () => ({
  models: [],
  modelsMode: "all",
  conditions: [],
  mode: "all",
  include: [],
  exclude: []
}), Be = () => ({
  id: crypto.randomUUID(),
  name: "Новая проверка",
  type: "intersection",
  a: Ee(),
  b: Ee(),
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
}), Ce = ({
  triangles: e,
  vertices: t,
  indices: n,
  triangleCount: o,
  closed: i,
  bounds: a,
  ...c
}) => c;
function be(e, t) {
  if (t.exclude.includes(e.id)) return !1;
  if (t.include.includes(e.id)) return !0;
  if (t.manualOnly || t.modelsMode === "selected" && !t.models.includes(e.modelId) || t.modelsMode === void 0 && t.models.length && !t.models.includes(e.modelId))
    return !1;
  const n = (o) => {
    const i = e.properties[o.field], a = (i ?? "").toLocaleLowerCase(), c = o.value.toLocaleLowerCase();
    switch (o.op) {
      case "exists":
        return i !== void 0 && i !== "";
      case "eq":
        return i !== void 0 && a === c;
      case "ne":
        return i !== void 0 && a !== c;
      case "contains":
        return i !== void 0 && a.includes(c);
      case "gt":
        return i !== void 0 && i.trim() !== "" && Number(i.replace(",", ".")) > Number(o.value.replace(",", "."));
      case "lt":
        return i !== void 0 && i.trim() !== "" && Number(i.replace(",", ".")) < Number(o.value.replace(",", "."));
    }
  };
  return !t.conditions.length || (t.mode === "all" ? t.conditions.every(n) : t.conditions.some(n));
}
const Fe = (e) => JSON.stringify([
  e.type,
  ...[e.a, e.b].map(
    ({
      models: t,
      modelsMode: n,
      conditions: o,
      mode: i,
      include: a,
      exclude: c,
      manualOnly: d
    }) => ({
      models: t,
      modelsMode: n,
      conditions: o,
      mode: i,
      include: a,
      exclude: c,
      manualOnly: d
    })
  ),
  e.precision,
  e.minPenetration,
  e.touching,
  e.ignoreSameModel,
  e.ignoreSameGroup,
  e.equalProperty,
  e.includeHidden
]), Ge = (e, t) => JSON.stringify([e, t].sort());
function Ye(e, t, n) {
  const o = new Map(e.map((a) => [a.id, a])), i = t.map((a) => {
    const c = o.get(a.id);
    return o.delete(a.id), {
      ...a,
      note: c?.note ?? "",
      assignee: c?.assignee ?? "",
      firstSeen: c?.firstSeen ?? n,
      lastSeen: n,
      state: !c || c.state === "resolved" ? "new" : c.state === "new" ? "active" : c.state
    };
  });
  for (const a of o.values())
    i.push({
      ...a,
      state: a.state === "excluded" ? "excluded" : "resolved"
    });
  return i;
}
function Ze(e) {
  const t = JSON.parse(e);
  if (t?.format !== "nashepo.checks" || t.version !== 1 || !Array.isArray(t.checks))
    throw Error("Это не файл проекта проверок НашеПО.");
  const n = /* @__PURE__ */ new Set();
  if (t.sets ??= [], !Array.isArray(t.sets) || !t.sets.every(
    (o) => o && typeof o.id == "string" && typeof o.name == "string" && o.selection && Array.isArray(o.selection.models) && o.selection.models.every((i) => typeof i == "string") && (o.selection.modelsMode === void 0 || ["all", "selected"].includes(o.selection.modelsMode)) && Array.isArray(o.selection.conditions) && o.selection.conditions.every(
      (i) => i && typeof i.field == "string" && typeof i.value == "string" && ["eq", "ne", "contains", "exists", "gt", "lt"].includes(
        i.op
      )
    ) && ["all", "any"].includes(o.selection.mode)
  ))
    throw Error("Некорректные наборы параметров.");
  for (const o of t.sets)
    o.selection.modelsMode ??= o.selection.models.length ? "selected" : "all";
  for (const o of t.checks) {
    if (!o || typeof o.id != "string" || n.has(o.id) || typeof o.name != "string" || !["intersection", "duplicates"].includes(o.type) || !["new", "done", "stale"].includes(o.status) || !Number.isFinite(o.precision) || o.precision < 1e-3 || o.precision > 100 || o.minPenetration !== void 0 && (!Number.isFinite(o.minPenetration) || o.minPenetration < 0 || o.minPenetration > 1e5) || !Array.isArray(o.results))
      throw Error("Некорректные параметры проверки.");
    if (n.add(o.id), o.minPenetration ??= 0, ![
      "touching",
      "ignoreSameModel",
      "ignoreSameGroup",
      "includeHidden"
    ].every(
      (i) => typeof o[i] == "boolean"
    ) || typeof o.equalProperty != "string" || o.warnings !== void 0 && (!Array.isArray(o.warnings) || !o.warnings.every((i) => typeof i == "string")) || o.modelsAtRun !== void 0 && (!Array.isArray(o.modelsAtRun) || !o.modelsAtRun.every((i) => typeof i == "string")))
      throw Error("Некорректные правила проверки.");
    o.warnings ??= [];
    for (const i of [o.a, o.b]) {
      if (!i || i.manualOnly !== void 0 && typeof i.manualOnly != "boolean" || i.modelsMode !== void 0 && !["all", "selected"].includes(i.modelsMode) || i.presetId !== void 0 && typeof i.presetId != "string" || !["all", "any"].includes(i.mode) || ![i.models, i.include, i.exclude].every(
        (a) => Array.isArray(a) && a.every((c) => typeof c == "string")
      ) || !Array.isArray(i.conditions) || !i.conditions.every(
        (a) => a && typeof a.field == "string" && typeof a.value == "string" && ["eq", "ne", "contains", "exists", "gt", "lt"].includes(a.op)
      ))
        throw Error("Некорректная выборка.");
      i.modelsMode ??= i.models.length ? "selected" : "all";
    }
    for (const i of o.results) {
      if (i?.image !== void 0 && !xe(i.image))
        throw Error("Некорректный снимок результата.");
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
const L = (e, t) => [e[0] - t[0], e[1] - t[1], e[2] - t[2]], pe = (e, t, n = 1) => [
  e[0] + t[0] * n,
  e[1] + t[1] * n,
  e[2] + t[2] * n
], W = (e, t) => e[0] * t[0] + e[1] * t[1] + e[2] * t[2], me = (e, t) => [
  e[1] * t[2] - e[2] * t[1],
  e[2] * t[0] - e[0] * t[2],
  e[0] * t[1] - e[1] * t[0]
], Q = (e) => Math.hypot(...e), ae = (e) => e.triangleCount ?? (e.indices ? e.indices.length / 3 : e.triangles.length / 9), le = (e, t, n) => e.indices && e.vertices ? e.vertices[e.indices[t * 3 + Math.floor(n / 3)] * 3 + n % 3] : e.triangles[t * 9 + n], de = (e, t) => [0, 3, 6].map((n) => [
  le(e, t, n),
  le(e, t, n + 1),
  le(e, t, n + 2)
]);
function Le(e) {
  const t = [1 / 0, 1 / 0, 1 / 0], n = [-1 / 0, -1 / 0, -1 / 0];
  for (let o = 0; o < e.length; o++) {
    const i = o % 3;
    t[i] = Math.min(t[i], e[o]), n[i] = Math.max(n[i], e[o]);
  }
  return { min: t, max: n };
}
const ze = (e, t, n) => e.min.every((o, i) => o <= t.max[i] + n && e.max[i] >= t.min[i] - n);
function ke(e, t) {
  const n = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const d of t)
    for (let p = 0; p < 9; p++) {
      const u = p % 3, m = le(e, d, p);
      n.min[u] = Math.min(n.min[u], m), n.max[u] = Math.max(n.max[u], m);
    }
  if (t.length <= 12) return { ...n, ids: t };
  const o = n.max.map((d, p) => d - n.min[p]), i = o.indexOf(Math.max(...o)), a = (d) => le(e, d, i) + le(e, d, i + 3) + le(e, d, i + 6);
  t.sort((d, p) => a(d) - a(p));
  const c = t.length >> 1;
  return {
    ...n,
    left: ke(e, t.slice(0, c)),
    right: ke(e, t.slice(c))
  };
}
function* fe(e, t, n) {
  ze(e, t, n) && (e.ids ? yield* e.ids : (yield* fe(e.left, t, n), yield* fe(e.right, t, n)));
}
function je(e, t) {
  const n = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const c of t)
    for (let d = 0; d < 3; d++)
      n.min[d] = Math.min(n.min[d], e[c].bounds.min[d]), n.max[d] = Math.max(n.max[d], e[c].bounds.max[d]);
  if (t.length <= 16) return { ...n, ids: t };
  const o = n.max.map((c, d) => c - n.min[d]), i = o.indexOf(Math.max(...o));
  t.sort(
    (c, d) => e[c].bounds.min[i] + e[c].bounds.max[i] - (e[d].bounds.min[i] + e[d].bounds.max[i])
  );
  const a = t.length >> 1;
  return {
    ...n,
    left: je(e, t.slice(0, a)),
    right: je(e, t.slice(a))
  };
}
function Ie(e, t, n, o) {
  const i = L(t, e), a = L(n[1], n[0]), c = L(n[2], n[0]), d = me(i, c), p = W(a, d);
  if (Math.abs(p) <= 1e-12 * Q(i) * Q(a) * Q(c)) return;
  const u = 1 / p, m = L(e, n[0]), h = W(m, d) * u, x = me(m, a), v = W(i, x) * u, S = W(c, x) * u, y = o / Math.max(Q(a), Q(c), o);
  if (h >= -y && v >= -y && h + v <= 1 + y && S >= -y && S <= 1 + y)
    return pe(e, i, Math.max(0, Math.min(1, S)));
}
function Qe(e, t, n, o) {
  const i = n.map(Math.abs).indexOf(Math.max(...n.map(Math.abs))), a = [0, 1, 2].filter((p) => p !== i), c = (p, u, m) => (u[a[0]] - p[a[0]]) * (m[a[1]] - p[a[1]]) - (u[a[1]] - p[a[1]]) * (m[a[0]] - p[a[0]]), d = (p, u) => {
    const m = u.map((h, x) => c(h, u[(x + 1) % 3], p));
    return m.every((h) => h >= -o * Q(n)) || m.every((h) => h <= o * Q(n));
  };
  for (const p of e) if (d(p, t)) return p;
  for (const p of t) if (d(p, e)) return p;
  for (let p = 0; p < 3; p++)
    for (let u = 0; u < 3; u++) {
      const m = e[p], h = e[(p + 1) % 3], x = t[u], v = t[(u + 1) % 3], S = L(h, m), y = L(v, x), M = S[a[0]] * y[a[1]] - S[a[1]] * y[a[0]];
      if (Math.abs(M) < 1e-18) continue;
      const k = L(x, m), f = (k[a[0]] * y[a[1]] - k[a[1]] * y[a[0]]) / M, F = (k[a[0]] * S[a[1]] - k[a[1]] * S[a[0]]) / M;
      if (f >= 0 && f <= 1 && F >= 0 && F <= 1) return pe(m, S, f);
    }
}
function Ve(e, t, n, o) {
  const i = me(L(e[1], e[0]), L(e[2], e[0])), a = me(L(t[1], t[0]), L(t[2], t[0])), c = Q(i), d = Q(a);
  if (c < 1e-20 || d < 1e-20) return;
  const p = t.map((m) => W(L(m, e[0]), i) / c), u = e.map((m) => W(L(m, t[0]), a) / d);
  if (!(p.every((m) => m > n) || p.every((m) => m < -n) || u.every((m) => m > n) || u.every((m) => m < -n))) {
    if (p.every((m) => Math.abs(m) <= n) && u.every((m) => Math.abs(m) <= n))
      return o ? Qe(e, t, i, n) : void 0;
    if (!(!o && (!(Math.min(...p) < -n && Math.max(...p) > n) || !(Math.min(...u) < -n && Math.max(...u) > n))))
      for (let m = 0; m < 3; m++) {
        const h = Ie(e[m], e[(m + 1) % 3], t, n);
        if (h) return h;
        const x = Ie(t[m], t[(m + 1) % 3], e, n);
        if (x) return x;
      }
  }
}
function He(e, t, n) {
  const o = L(t[1], t[0]), i = L(t[2], t[0]), a = me(o, i), c = Q(a);
  if (c < 1e-20 || Math.abs(W(L(e, t[0]), a)) / c > n) return !1;
  const d = L(e, t[0]), p = W(o, o), u = W(o, i), m = W(i, i), h = W(d, o), x = W(d, i), v = p * m - u * u;
  if (Math.abs(v) < 1e-30) return !1;
  const S = (h * m - x * u) / v, y = (x * p - h * u) / v, M = n / Math.max(Q(o), Q(i), n);
  return S >= -M && y >= -M && S + y <= 1 + M;
}
function ge(e, t, n, o) {
  if (!t.closed || e.some((h, x) => h <= t.bounds.min[x] + o || h >= t.bounds.max[x] - o))
    return !1;
  for (const h of fe(n, { min: e, max: e }, o))
    if (He(e, de(t, h), o)) return !1;
  const i = [1, 0.371390676, 0.52999894], a = Q(L(t.bounds.max, t.bounds.min)) * 3 + 1, c = pe(e, i, a), d = [], p = Le([...e, ...c]);
  for (const h of fe(n, p, o)) {
    const x = Ie(e, c, de(t, h), o);
    if (x) {
      const v = Q(L(x, e));
      v > o && d.push(v);
    }
  }
  d.sort((h, x) => h - x);
  let u = 0, m = -1 / 0;
  for (const h of d)
    h - m > o * 2 && (u++, m = h);
  return u % 2 === 1;
}
function ve(e, t) {
  return Math.hypot(
    ...e.map((n, o) => Math.max(t.min[o] - n, 0, n - t.max[o]))
  );
}
function Je(e, t) {
  const n = L(t[1], t[0]), o = L(t[2], t[0]), i = L(e, t[0]), a = W(n, i), c = W(o, i);
  if (a <= 0 && c <= 0) return Q(i);
  const d = L(e, t[1]), p = W(n, d), u = W(o, d);
  if (p >= 0 && u <= p) return Q(d);
  if (a * u - p * c <= 0 && a >= 0 && p <= 0) {
    const k = a / (a - p);
    return Q(L(e, pe(t[0], n, k)));
  }
  const h = L(e, t[2]), x = W(n, h), v = W(o, h);
  if (v >= 0 && x <= v) return Q(h);
  if (x * c - a * v <= 0 && c >= 0 && v <= 0) {
    const k = c / (c - v);
    return Q(L(e, pe(t[0], o, k)));
  }
  if (p * v - x * u <= 0 && u - p >= 0 && x - v >= 0) {
    const k = L(t[2], t[1]), f = (u - p) / (u - p + (x - v));
    return Q(L(e, pe(t[1], k, f)));
  }
  const M = me(n, o);
  return Math.abs(W(i, M)) / Math.max(Q(M), 1e-30);
}
function Te(e, t, n) {
  let o = 1 / 0;
  const i = (a) => {
    if (ve(e, a) >= o) return;
    if (a.ids) {
      for (const p of a.ids)
        o = Math.min(o, Je(e, de(t, p)));
      return;
    }
    const c = a.left, d = a.right;
    ve(e, c) < ve(e, d) ? (i(c), i(d)) : (i(d), i(c));
  };
  return i(n), o;
}
async function We(e, t, n, o, i, a, c) {
  if (!e.closed || !t.closed) return 0;
  let d = 0;
  const p = (m, h, x) => {
    ge(m, h, x, a) && (d = Math.max(d, Te(m, h, x)));
  };
  p(i, e, n), p(i, t, o);
  let u = 0;
  for (const [m, h, x] of [
    [e, t, o],
    [t, e, n]
  ]) {
    const v = ae(m), S = Math.max(1, Math.floor(v / 1024));
    for (let y = 0; y < v; y += S) {
      const M = de(m, y), k = M[0].map((P, G) => (M[0][G] + M[1][G] + M[2][G]) / 3), f = M[0].map((P, G) => (M[0][G] + M[1][G]) / 2), F = M[0].map((P, G) => (M[1][G] + M[2][G]) / 2), Z = M[0].map((P, G) => (M[2][G] + M[0][G]) / 2);
      for (const P of [M[0], M[1], M[2], f, F, Z, k])
        p(P, h, x);
      u++ % 32 === 0 && await c();
    }
  }
  if (d <= a) {
    const m = e.bounds.min.map(
      (h, x) => Math.min(e.bounds.max[x], t.bounds.max[x]) - Math.max(h, t.bounds.min[x])
    );
    d = Math.max(0, Math.min(...m));
  }
  return d * 1e3;
}
async function Xe(e, t, n, o, i) {
  const a = t.precision / 1e3;
  if (!Number.isFinite(a) || a <= 0)
    throw Error("Точность расчёта должна быть положительным числом.");
  const c = e.filter((j) => t.includeHidden || !j.hidden), d = c.filter((j) => be(j, t.a)), p = c.filter((j) => be(j, t.b));
  if (!d.length || !p.length)
    throw Error("Выборка А или Б пуста. Проверьте модели и условия.");
  let u = performance.now();
  const m = async () => {
    if (o())
      throw Error("Расчёт отменён. Предыдущие результаты сохранены.");
    performance.now() - u > 16 && (await new Promise((j) => setTimeout(j, 0)), u = performance.now());
  }, h = /* @__PURE__ */ new Map(), x = (j) => {
    let A = h.get(j.id);
    return A || (A = ke(
      j,
      Array.from({ length: ae(j) }, (V, q) => q)
    ), h.set(j.id, A)), A;
  }, v = /* @__PURE__ */ new Map(), S = async (j) => {
    let A = v.get(j.id);
    if (A !== void 0) return A;
    const V = [];
    for (let q = 0; q < ae(j); q++)
      V.push(
        [0, 3, 6].map(
          (N) => [0, 1, 2].map(($) => Math.round(le(j, q, N + $) / a)).join(",")
        ).sort().join(";")
      ), q % 9e3 === 0 && await m();
    return A = V.sort().join("|"), v.set(j.id, A), A;
  }, y = [], M = new Set(d.map((j) => j.id)), k = new Set(p.map((j) => j.id)), f = je(
    p,
    p.map((j, A) => A)
  ), F = /* @__PURE__ */ new Map();
  let Z = 0;
  const P = (j) => j.triangles.byteLength + (j.vertices?.byteLength || 0) + (j.indices?.byteLength || 0) + ae(j) * 32;
  async function G(j, A) {
    if (!i) return j;
    let V = F.get(j.id);
    if (V)
      return F.delete(j.id), F.set(j.id, V), V;
    for (const [q, N] of F)
      q !== A && Z > 96 * 1024 * 1024 && (F.delete(q), Z -= P(N), h.delete(q), v.delete(q));
    return V = await i(j.id), F.set(j.id, V), Z += P(V), V;
  }
  let K = -1 / 0;
  for (let j = 0; j < d.length; j++) {
    const A = d[j];
    performance.now() - K > 150 && (K = performance.now(), n({
      phase: "Проверка пар",
      done: j,
      total: d.length,
      found: y.length
    }));
    for (const V of fe(f, A.bounds, a)) {
      const q = p[V];
      if (await m(), A.id === q.id || !ze(A.bounds, q.bounds, a) || t.ignoreSameModel && A.modelId === q.modelId || t.ignoreSameGroup && A.modelId === q.modelId && A.properties.Объект && A.properties.Объект === q.properties.Объект || t.equalProperty && A.properties[t.equalProperty] !== void 0 && A.properties[t.equalProperty] === q.properties[t.equalProperty] || A.id > q.id && M.has(q.id) && k.has(A.id)) continue;
      const N = Ge(A.id, q.id), $ = await G(A), Y = await G(q, A.id);
      let z, U = "surface", _ = 0;
      if (t.type === "duplicates") {
        if (ae($) !== ae(Y) || $.bounds.min.some(
          (ne, H) => Math.abs(ne - Y.bounds.min[H]) > a || Math.abs($.bounds.max[H] - Y.bounds.max[H]) > a
        ))
          continue;
        await S($) === await S(Y) && (z = $.bounds.min.map((ne, H) => (ne + $.bounds.max[H]) / 2), U = "duplicate");
      } else {
        const ne = x($), H = x(Y);
        for (let ee = 0; ee < ae($) && !z; ee++) {
          const ie = de($, ee), te = Le(ie.flat());
          for (const oe of fe(H, te, a)) {
            if (z = Ve(ie, de(Y, oe), a, t.touching), z) break;
            await m();
          }
          await m();
        }
        if (!z && $.closed && Y.closed) {
          const ee = $.bounds.min.map(
            (ie, te) => (ie + $.bounds.max[te]) / 2
          );
          ge(ee, $, ne, a) && ge(ee, Y, H, a) && (z = ee, U = "contained");
        }
        if (!z) {
          for (const [ee, ie, te] of [
            [$, Y, H],
            [Y, $, ne]
          ])
            if (ie.closed) {
              for (let oe = 0; oe < ae(ee) && !z; oe++) {
                const X = de(ee, oe), J = X[0].map(
                  (D, se) => (X[0][se] + X[1][se] + X[2][se]) / 3
                );
                for (const D of [X[0], J])
                  if (ge(D, ie, te, a)) {
                    z = D, U = "contained";
                    break;
                  }
                await m();
              }
              if (z) break;
            }
        }
        if (z && (_ = await We(
          $,
          Y,
          ne,
          H,
          z,
          a,
          m
        )), z && _ + t.precision < t.minPenetration)
          continue;
      }
      if (z && (y.push({
        id: N,
        a: Ce($),
        b: Ce(Y),
        point: z,
        kind: U,
        state: "new",
        note: "",
        assignee: "",
        firstSeen: "",
        lastSeen: "",
        penetrationMm: _
      }), y.length >= 5e4))
        throw Error(
          "Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат."
        );
    }
  }
  return n({
    phase: "Готово",
    done: d.length,
    total: d.length,
    found: y.length
  }), y;
}
const Pe = `(function(){"use strict";const on=({triangles:t,vertices:n,indices:e,triangleCount:r,closed:o,bounds:i,...f})=>f;function rn(t,n){if(n.exclude.includes(t.id))return!1;if(n.include.includes(t.id))return!0;if(n.manualOnly||n.modelsMode==="selected"&&!n.models.includes(t.modelId)||n.modelsMode===void 0&&n.models.length&&!n.models.includes(t.modelId))return!1;const e=r=>{const o=t.properties[r.field],i=(o??"").toLocaleLowerCase(),f=r.value.toLocaleLowerCase();switch(r.op){case"exists":return o!==void 0&&o!=="";case"eq":return o!==void 0&&i===f;case"ne":return o!==void 0&&i!==f;case"contains":return o!==void 0&&i.includes(f);case"gt":return o!==void 0&&o.trim()!==""&&Number(o.replace(",","."))>Number(r.value.replace(",","."));case"lt":return o!==void 0&&o.trim()!==""&&Number(o.replace(",","."))<Number(r.value.replace(",","."))}};return!n.conditions.length||(n.mode==="all"?n.conditions.every(e):n.conditions.some(e))}const fn=(t,n)=>JSON.stringify([t,n].sort()),y=(t,n)=>[t[0]-n[0],t[1]-n[1],t[2]-n[2]],G=(t,n,e=1)=>[t[0]+n[0]*e,t[1]+n[1]*e,t[2]+n[2]*e],v=(t,n)=>t[0]*n[0]+t[1]*n[1]+t[2]*n[2],H=(t,n)=>[t[1]*n[2]-t[2]*n[1],t[2]*n[0]-t[0]*n[2],t[0]*n[1]-t[1]*n[0]],b=t=>Math.hypot(...t),T=t=>t.triangleCount??(t.indices?t.indices.length/3:t.triangles.length/9),C=(t,n,e)=>t.indices&&t.vertices?t.vertices[t.indices[n*3+Math.floor(e/3)]*3+e%3]:t.triangles[n*9+e],z=(t,n)=>[0,3,6].map(e=>[C(t,n,e),C(t,n,e+1),C(t,n,e+2)]);function sn(t){const n=[1/0,1/0,1/0],e=[-1/0,-1/0,-1/0];for(let r=0;r<t.length;r++){const o=r%3;n[o]=Math.min(n[o],t[r]),e[o]=Math.max(e[o],t[r])}return{min:n,max:e}}const an=(t,n,e)=>t.min.every((r,o)=>r<=n.max[o]+e&&t.max[o]>=n.min[o]-e);function X(t,n){const e={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const s of n)for(let a=0;a<9;a++){const u=a%3,c=C(t,s,a);e.min[u]=Math.min(e.min[u],c),e.max[u]=Math.max(e.max[u],c)}if(n.length<=12)return{...e,ids:n};const r=e.max.map((s,a)=>s-e.min[a]),o=r.indexOf(Math.max(...r)),i=s=>C(t,s,o)+C(t,s,o+3)+C(t,s,o+6);n.sort((s,a)=>i(s)-i(a));const f=n.length>>1;return{...e,left:X(t,n.slice(0,f)),right:X(t,n.slice(f))}}function*J(t,n,e){an(t,n,e)&&(t.ids?yield*t.ids:(yield*J(t.left,n,e),yield*J(t.right,n,e)))}function Y(t,n){const e={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const f of n)for(let s=0;s<3;s++)e.min[s]=Math.min(e.min[s],t[f].bounds.min[s]),e.max[s]=Math.max(e.max[s],t[f].bounds.max[s]);if(n.length<=16)return{...e,ids:n};const r=e.max.map((f,s)=>f-e.min[s]),o=r.indexOf(Math.max(...r));n.sort((f,s)=>t[f].bounds.min[o]+t[f].bounds.max[o]-(t[s].bounds.min[o]+t[s].bounds.max[o]));const i=n.length>>1;return{...e,left:Y(t,n.slice(0,i)),right:Y(t,n.slice(i))}}function Z(t,n,e,r){const o=y(n,t),i=y(e[1],e[0]),f=y(e[2],e[0]),s=H(o,f),a=v(i,s);if(Math.abs(a)<=1e-12*b(o)*b(i)*b(f))return;const u=1/a,c=y(t,e[0]),d=v(c,s)*u,l=H(c,i),M=v(o,l)*u,I=v(f,l)*u,x=r/Math.max(b(i),b(f),r);if(d>=-x&&M>=-x&&d+M<=1+x&&I>=-x&&I<=1+x)return G(t,o,Math.max(0,Math.min(1,I)))}function un(t,n,e,r){const o=e.map(Math.abs).indexOf(Math.max(...e.map(Math.abs))),i=[0,1,2].filter(a=>a!==o),f=(a,u,c)=>(u[i[0]]-a[i[0]])*(c[i[1]]-a[i[1]])-(u[i[1]]-a[i[1]])*(c[i[0]]-a[i[0]]),s=(a,u)=>{const c=u.map((d,l)=>f(d,u[(l+1)%3],a));return c.every(d=>d>=-r*b(e))||c.every(d=>d<=r*b(e))};for(const a of t)if(s(a,n))return a;for(const a of n)if(s(a,t))return a;for(let a=0;a<3;a++)for(let u=0;u<3;u++){const c=t[a],d=t[(a+1)%3],l=n[u],M=n[(u+1)%3],I=y(d,c),x=y(M,l),h=I[i[0]]*x[i[1]]-I[i[1]]*x[i[0]];if(Math.abs(h)<1e-18)continue;const P=y(l,c),O=(P[i[0]]*x[i[1]]-P[i[1]]*x[i[0]])/h,j=(P[i[0]]*I[i[1]]-P[i[1]]*I[i[0]])/h;if(O>=0&&O<=1&&j>=0&&j<=1)return G(c,I,O)}}function dn(t,n,e,r){const o=H(y(t[1],t[0]),y(t[2],t[0])),i=H(y(n[1],n[0]),y(n[2],n[0])),f=b(o),s=b(i);if(f<1e-20||s<1e-20)return;const a=n.map(c=>v(y(c,t[0]),o)/f),u=t.map(c=>v(y(c,n[0]),i)/s);if(!(a.every(c=>c>e)||a.every(c=>c<-e)||u.every(c=>c>e)||u.every(c=>c<-e))){if(a.every(c=>Math.abs(c)<=e)&&u.every(c=>Math.abs(c)<=e))return r?un(t,n,o,e):void 0;if(!(!r&&(!(Math.min(...a)<-e&&Math.max(...a)>e)||!(Math.min(...u)<-e&&Math.max(...u)>e))))for(let c=0;c<3;c++){const d=Z(t[c],t[(c+1)%3],n,e);if(d)return d;const l=Z(n[c],n[(c+1)%3],t,e);if(l)return l}}}function ln(t,n,e){const r=y(n[1],n[0]),o=y(n[2],n[0]),i=H(r,o),f=b(i);if(f<1e-20||Math.abs(v(y(t,n[0]),i))/f>e)return!1;const s=y(t,n[0]),a=v(r,r),u=v(r,o),c=v(o,o),d=v(s,r),l=v(s,o),M=a*c-u*u;if(Math.abs(M)<1e-30)return!1;const I=(d*c-l*u)/M,x=(l*a-d*u)/M,h=e/Math.max(b(r),b(o),e);return I>=-h&&x>=-h&&I+x<=1+h}function V(t,n,e,r){if(!n.closed||t.some((d,l)=>d<=n.bounds.min[l]+r||d>=n.bounds.max[l]-r))return!1;for(const d of J(e,{min:t,max:t},r))if(ln(t,z(n,d),r))return!1;const o=[1,.371390676,.52999894],i=b(y(n.bounds.max,n.bounds.min))*3+1,f=G(t,o,i),s=[],a=sn([...t,...f]);for(const d of J(e,a,r)){const l=Z(t,f,z(n,d),r);if(l){const M=b(y(l,t));M>r&&s.push(M)}}s.sort((d,l)=>d-l);let u=0,c=-1/0;for(const d of s)d-c>r*2&&(u++,c=d);return u%2===1}function $(t,n){return Math.hypot(...t.map((e,r)=>Math.max(n.min[r]-e,0,e-n.max[r])))}function mn(t,n){const e=y(n[1],n[0]),r=y(n[2],n[0]),o=y(t,n[0]),i=v(e,o),f=v(r,o);if(i<=0&&f<=0)return b(o);const s=y(t,n[1]),a=v(e,s),u=v(r,s);if(a>=0&&u<=a)return b(s);if(i*u-a*f<=0&&i>=0&&a<=0){const P=i/(i-a);return b(y(t,G(n[0],e,P)))}const d=y(t,n[2]),l=v(e,d),M=v(r,d);if(M>=0&&l<=M)return b(d);if(l*f-i*M<=0&&f>=0&&M<=0){const P=f/(f-M);return b(y(t,G(n[0],r,P)))}if(a*M-l*u<=0&&u-a>=0&&l-M>=0){const P=y(n[2],n[1]),O=(u-a)/(u-a+(l-M));return b(y(t,G(n[1],P,O)))}const h=H(e,r);return Math.abs(v(o,h))/Math.max(b(h),1e-30)}function hn(t,n,e){let r=1/0;const o=i=>{if($(t,i)>=r)return;if(i.ids){for(const a of i.ids)r=Math.min(r,mn(t,z(n,a)));return}const f=i.left,s=i.right;$(t,f)<$(t,s)?(o(f),o(s)):(o(s),o(f))};return o(e),r}async function gn(t,n,e,r,o,i,f){if(!t.closed||!n.closed)return 0;let s=0;const a=(c,d,l)=>{V(c,d,l,i)&&(s=Math.max(s,hn(c,d,l)))};a(o,t,e),a(o,n,r);let u=0;for(const[c,d,l]of[[t,n,r],[n,t,e]]){const M=T(c),I=Math.max(1,Math.floor(M/1024));for(let x=0;x<M;x+=I){const h=z(c,x),P=h[0].map((D,_)=>(h[0][_]+h[1][_]+h[2][_])/3),O=h[0].map((D,_)=>(h[0][_]+h[1][_])/2),j=h[0].map((D,_)=>(h[1][_]+h[2][_])/2),K=h[0].map((D,_)=>(h[2][_]+h[0][_])/2);for(const D of[h[0],h[1],h[2],O,j,K,P])a(D,d,l);u++%32===0&&await f()}}if(s<=i){const c=t.bounds.min.map((d,l)=>Math.min(t.bounds.max[l],n.bounds.max[l])-Math.max(d,n.bounds.min[l]));s=Math.max(0,Math.min(...c))}return s*1e3}async function yn(t,n,e,r,o){const i=n.precision/1e3;if(!Number.isFinite(i)||i<=0)throw Error("Точность расчёта должна быть положительным числом.");const f=t.filter(m=>n.includeHidden||!m.hidden),s=f.filter(m=>rn(m,n.a)),a=f.filter(m=>rn(m,n.b));if(!s.length||!a.length)throw Error("Выборка А или Б пуста. Проверьте модели и условия.");let u=performance.now();const c=async()=>{if(r())throw Error("Расчёт отменён. Предыдущие результаты сохранены.");performance.now()-u>16&&(await new Promise(m=>setTimeout(m,0)),u=performance.now())},d=new Map,l=m=>{let g=d.get(m.id);return g||(g=X(m,Array.from({length:T(m)},(S,p)=>p)),d.set(m.id,g)),g},M=new Map,I=async m=>{let g=M.get(m.id);if(g!==void 0)return g;const S=[];for(let p=0;p<T(m);p++)S.push([0,3,6].map(B=>[0,1,2].map(w=>Math.round(C(m,p,B+w)/i)).join(",")).sort().join(";")),p%9e3===0&&await c();return g=S.sort().join("|"),M.set(m.id,g),g},x=[],h=new Set(s.map(m=>m.id)),P=new Set(a.map(m=>m.id)),O=Y(a,a.map((m,g)=>g)),j=new Map;let K=0;const D=m=>m.triangles.byteLength+(m.vertices?.byteLength||0)+(m.indices?.byteLength||0)+T(m)*32;async function _(m,g){if(!o)return m;let S=j.get(m.id);if(S)return j.delete(m.id),j.set(m.id,S),S;for(const[p,B]of j)p!==g&&K>96*1024*1024&&(j.delete(p),K-=D(B),d.delete(p),M.delete(p));return S=await o(m.id),j.set(m.id,S),K+=D(S),S}let cn=-1/0;for(let m=0;m<s.length;m++){const g=s[m];performance.now()-cn>150&&(cn=performance.now(),e({phase:"Проверка пар",done:m,total:s.length,found:x.length}));for(const S of J(O,g.bounds,i)){const p=a[S];if(await c(),g.id===p.id||!an(g.bounds,p.bounds,i)||n.ignoreSameModel&&g.modelId===p.modelId||n.ignoreSameGroup&&g.modelId===p.modelId&&g.properties.Объект&&g.properties.Объект===p.properties.Объект||n.equalProperty&&g.properties[n.equalProperty]!==void 0&&g.properties[n.equalProperty]===p.properties[n.equalProperty]||g.id>p.id&&h.has(p.id)&&P.has(g.id))continue;const B=fn(g.id,p.id),w=await _(g),E=await _(p,g.id);let q,W="surface",nn=0;if(n.type==="duplicates"){if(T(w)!==T(E)||w.bounds.min.some((A,L)=>Math.abs(A-E.bounds.min[L])>i||Math.abs(w.bounds.max[L]-E.bounds.max[L])>i))continue;await I(w)===await I(E)&&(q=w.bounds.min.map((A,L)=>(A+w.bounds.max[L])/2),W="duplicate")}else{const A=l(w),L=l(E);for(let N=0;N<T(w)&&!q;N++){const F=z(w,N),Q=sn(F.flat());for(const R of J(L,Q,i)){if(q=dn(F,z(E,R),i,n.touching),q)break;await c()}await c()}if(!q&&w.closed&&E.closed){const N=w.bounds.min.map((F,Q)=>(F+w.bounds.max[Q])/2);V(N,w,A,i)&&V(N,E,L,i)&&(q=N,W="contained")}if(!q){for(const[N,F,Q]of[[w,E,L],[E,w,A]])if(F.closed){for(let R=0;R<T(N)&&!q;R++){const U=z(N,R),xn=U[0].map((tn,en)=>(U[0][en]+U[1][en]+U[2][en])/3);for(const tn of[U[0],xn])if(V(tn,F,Q,i)){q=tn,W="contained";break}await c()}if(q)break}}if(q&&(nn=await gn(w,E,A,L,q,i,c)),q&&nn+n.precision<n.minPenetration)continue}if(q&&(x.push({id:B,a:on(w),b:on(E),point:q,kind:W,state:"new",note:"",assignee:"",firstSeen:"",lastSeen:"",penetrationMm:nn}),x.length>=5e4))throw Error("Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат.")}}return e({phase:"Готово",done:s.length,total:s.length,found:x.length}),x}let Mn=0;const k=new Map;self.onmessage=async t=>{if(t.data.request!==void 0){const n=k.get(t.data.request);k.delete(t.data.request),t.data.error?n?.reject(Error(t.data.error)):n?.resolve(t.data.geometry);return}try{const{elements:n,check:e}=t.data,r=await yn(n,e,o=>self.postMessage({progress:o}),()=>!1,t.data.streaming?o=>new Promise((i,f)=>{const s=Mn++;k.set(s,{resolve:i,reject:f}),self.postMessage({load:o,request:s})}):void 0);self.postMessage({results:r})}catch(n){self.postMessage({error:n instanceof Error?n.message:String(n)})}}})();
`, Ae = typeof self < "u" && self.Blob && new Blob(["(self.URL || self.webkitURL).revokeObjectURL(self.location.href);", Pe], { type: "text/javascript;charset=utf-8" });
function Ke(e) {
  let t;
  try {
    if (t = Ae && (self.URL || self.webkitURL).createObjectURL(Ae), !t) throw "";
    const n = new Worker(t, {
      name: e?.name
    });
    return n.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(t);
    }), n;
  } catch {
    return new Worker(
      "data:text/javascript;charset=utf-8," + encodeURIComponent(Pe),
      {
        name: e?.name
      }
    );
  }
}
const B = (e) => String(e ?? "").replace(
  /[&<>"']/g,
  (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[t]
);
function Oe(e, t) {
  const n = URL.createObjectURL(
    new Blob([t], {
      type: e.endsWith(".html") ? "text/html;charset=utf-8" : "application/json;charset=utf-8"
    })
  ), o = document.createElement("a");
  o.href = n, o.download = e, o.click(), setTimeout(() => URL.revokeObjectURL(n), 6e4);
}
function _e(e, t) {
  const n = B;
  return `<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${n(e.name)}</title><style>body{font:14px/1.5 system-ui;margin:24px;background:#171c23;color:#e6edf5}h1{margin:0}small{color:#a9b7c8}input,select{padding:10px;margin:15px 8px 15px 0;max-width:100%;background:#242e3b;color:inherit;border:1px solid #506074;border-radius:6px}.wrap{overflow:auto}table{border-collapse:separate;border-spacing:0;width:100%}td,th{padding:10px;border-bottom:1px solid #39475a;min-width:100px;vertical-align:top;overflow-wrap:anywhere}th{background:#253142;position:sticky;top:0;text-align:left;white-space:normal}td{max-width:350px}tr[hidden]{display:none}.shot{display:block;width:260px;border:0;background:transparent;padding:0;cursor:zoom-in}dialog{width:min(94vw,1400px);border:1px solid #506074;background:#20242b;color:white;border-radius:10px}dialog img{max-width:100%;max-height:80vh;display:block;margin:12px auto}dialog::backdrop{background:#000b}.shot img{width:100%;border-radius:6px}.legend{margin:12px 0}.red{color:#ff6161}.blue{color:#65baff}@media print{input,select{display:none}body{background:white;color:black}.wrap{overflow:visible}th{position:static;background:#eee}}</style><h1>${n(e.name)}</h1><small>НашеПО · Проверки коллизий · ${n(e.lastRun || "")} · ${e.status === "stale" ? "Результат устарел" : "Последний завершённый расчёт"}</small><p>${n(e.type === "duplicates" ? "Совпадение треугольной геометрии" : "Пересечения поверхностей и вложенность замкнутых тел")}. Точность: ${n(e.precision)} мм${e.type === "intersection" ? `; минимальное расчётное вхождение: ${n(e.minPenetration)} мм` : ""}.</p><p class="legend"><span class="red">● Элемент А — красный</span> · <span class="blue">● Элемент Б — синий</span></p><input id="search" type="search" placeholder="Поиск по всему отчёту"><select id="state"><option value="">Все состояния</option>${Object.entries(
    re
  ).map(([o, i]) => `<option value="${o}">${i}</option>`).join(
    ""
  )}</select>${e.type === "intersection" ? '<input id="depth" type="number" min="0" step="1" placeholder="Вхождение от, мм">' : ""}<span id="count"></span><div class="wrap"><table><thead><tr>${["Снимок", "№", "Состояние", "Вхождение, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "X", "Y", "Z", "Назначение", "Комментарий"].map((o) => `<th>${o}</th>`).join("")}</tr></thead><tbody>${t.map((o, i) => `<tr data-state="${o.state}" data-depth="${o.penetrationMm ?? 0}"><td>${xe(o.image) ? `<button class="shot" type="button"><img src="${o.image}" alt="Снимок конфликта ${i + 1}" loading="lazy"></button>` : "Снимок отсутствует"}</td>${[i + 1, re[o.state], e.type === "duplicates" ? "—" : (o.penetrationMm ?? 0).toFixed(1), o.a.name, o.a.model, o.a.guid, o.b.name, o.b.model, o.b.guid, ...o.point.map((a) => a.toFixed(4)), o.assignee, o.note].map((a) => `<td>${n(a)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><dialog id="picture"><button id="close-picture">Закрыть</button><img id="full-picture" alt="Снимок конфликта"></dialog><script>const modal=document.getElementById("picture");document.getElementById("close-picture").onclick=()=>modal.close();for(const b of document.querySelectorAll(".shot"))b.onclick=()=>{document.getElementById("full-picture").src=b.querySelector("img").src;modal.showModal()};const q=document.getElementById('search'),s=document.getElementById('state'),d=document.getElementById('depth'),rows=[...document.querySelectorAll('tbody tr')];function filter(){let n=0;for(const r of rows){r.hidden=!!((s.value&&r.dataset.state!==s.value)||(d&&Number(r.dataset.depth)<Number(d.value||0))||!r.textContent.toLowerCase().includes(q.value.toLowerCase()));if(!r.hidden)n++}document.getElementById('count').textContent='Коллизий: '+n}q.oninput=s.onchange=filter;if(d)d.oninput=filter;filter()<\/script></html>`;
}
function et(e, t) {
  return JSON.stringify(
    {
      version: 1,
      id: e.id,
      name: e.name,
      images: Object.fromEntries(
        t.filter((n) => xe(n.image)).map((n) => [n.id + ".jpg", n.image])
      ),
      warnings: e.warnings,
      tests: [
        {
          id: e.id,
          name: e.name,
          clashes: t.map((n, o) => ({
            id: n.id,
            name: `Конфликт ${o + 1}`,
            distance: e.type === "duplicates" ? "" : `${(n.penetrationMm ?? 0).toFixed(1)} мм`,
            date: e.lastRun || "",
            description: e.type === "duplicates" ? "Дублирование" : "По пересечению",
            status: re[n.state],
            group: n.assignee,
            note: n.note,
            point: n.point,
            image: xe(n.image) ? n.id + ".jpg" : "",
            enabled: n.state !== "resolved",
            reviewed: n.state === "resolved" || n.state === "reviewed" || n.state === "approved",
            excluded: n.state === "excluded",
            elements: [n.a, n.b].map((i) => ({
              guid: i.guid,
              id: i.id,
              source: i.model,
              name: i.name,
              properties: i.properties
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
const tt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAydpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAzIDc5Ljk2OTBhODdmYywgMjAyNS8wMy8wNi0yMDo1MDoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDZFQkU2NEQ4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDZFQkU2NEM4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI2LjExIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRENDVBNjQzODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRENDVBNjQ0ODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+pHX+ogAAD+lJREFUeNrsnXtwVPUVx2/CZvMgQEhCSAwJJDzDqwgodCq08hAr7wpSo1M6o/5Rq6NUcdqp1XamdjqOY6mvWhWnttZpRRtbaRGpMMKMZlB8gaFaQoQQSEhIQt7hkfTzhY1ulnt37929mw1T7sxls3vv/f3O7/zO43vO7/wucd3d3calI/zDo3927txpnDx5MqaEpKenpyUlJWUlJCQM6+rqSm1vb/fyGRcfH9+dkpLSGRcX13Lq1Knajo6Omvr6+ia+x4zWtLQ0Y86cOee/SAKLiopiyjwYlz5ixIhyPk8PGDBAKnHB6fF4unU9Ly+vDCanxpLeqVOnnuObznj9kJycHFMGwpRrjh8/Xoh0ec6ePWt6z5kzZwxdr62tLcrPz786lvT68ys+1jYEaTJQx+tRT1v3w0QDabweSe0XNjDmDBwyZEh6U1PTPCfPtLS0LOK5QZcYyDF48OAFjY2N6U6eaWhoyIaBc//vGSg1RIXXSC2dHG1tbYbX610dS08cUwYmJiYa2dnZWRMmTFiO9C0Ipw3UfgnoYfHw4cMzYWZscWAEeChj2LBha8CQm+vq6g6D26xnKj5eWC+dZ67l71VI0dxDhw5lYM/C6vvYsWMZzc3Nm4cOHVo7atSot/Hem6DjzRMnTjQGCw4k9RkZGYWYgGtrampeZCKaIuKgOps+fbrj55AgwYmPkabunJyceqThEaQhT4wKJPiyyy4bx/VHgStVQABTnBfpCdjuhp7D9PMw9BQGemnRBc0FXP8tdDaKbhj/Hn+Pdjr2WbNmfYkDw2IgjJgDMdX+A1DEwG8nUEsNYJTUSp98fzIrK6tF16PBuMBT/cCUk/T7Gz5HiI7c3NwxfN8gxgXSweRWcv3KPmOgQG9mZmaz1QAUScDIhvHjx/8Zgmsx9GExAjXrLigo6Ebrw2YkdBwdN26c6GgKNoGYoXoioblRZyAqsoDOWqMlOVJDbKQY10Zf3VJ3feo7Nuvc92hJsqQWJn7DKQNtOxHEfCZw4xVCqRS3PNigQYMEpCv5/BBJfa+zs3MfElyB1D1RWlp6le45fPiwMXv27D2o4p04ikI+p0D4FTiQaXjw3HCdUOCBQxmMxJZgdubhoPa56kRQ2REw8LAbMy3jjRmoxiY9VVhYuABmDRKs6TnGjBlTTNKg1zP6zu83+sMgVHwwTmAhpuIZJKcWxroiibT1OTRluabCqampKajQO5ESBmCWOn6GF7wLdckyi2WZpALOBrPn9TsGv8AMliA52UzIj5iYA+onUloZ778xJ4muMBD1SoGwzyIhiIE3MMCfgNks01AQrLTa1mDt6LruC5JTHEI/D8ppRELvyJEjPxo4cKDXNScyevTomwPVyq668uxmGDg2VNg1ceLEO0JhRF2HiT8M1o76ob8izMO2cNRajoxnV7rqhZFCL7OyzwkhOIcuIMRPmUk70GgCxrvFTrvc18z940O1iekZgH38JbQ7Vd/3oHmA6zAGSbrJrhTidFox8KsCo5IgA93pZJCo6ds8F28nWQFDbka1OxxI34qo4EBmMgGmfBqKCHCiJGS+HQQgdUN175OqOzUNPLfeTjZG9+C8FsPEdhvS9z7SFx81II0UrglmpyCykxn8tl0IhVmYisFvDxP4tsOYqXb7gjkrMStnrNqDcWe5Z4lTIO0onQWQbfAt+lxwyNYRRfzg4MGDW2wmUhOQpGcBsElhAt8kJvNZtWPn/i+++KIE03K31fqPxqXxRS0bIxVmhj62in9xGE9pfcOu6k6aNOnBSMGvnqedB+wmVpVYgM4XrMJBNOxd7GB0VJhI4HtWtgpV2oskpNhcwjRwGt/CVp5yI3JQO7T3TbVr5wCLDiHaOGDlRGDid1yPhQVjWFa8j1jVbFFI4n8Xeck2q0Qqz3tQ78kQOI+k6yLWNOYQUycYLhxqBwncgj3dRV9bSdRuJ0beS6x81izBS98nsdXr8OL/CIyjtVQAU36MOXqttbW1yzUVxjEs1eyYzRoq8XJgSl2xKjnATKR2Cd7ycWZ1H/any40wK1S4qH7UH/0+pv5Fh3+s3UPf2LFj/2nWhnAjaONq1yRQdo2ZvUWzY5LSbyeNvl5runQcx/ciZk+dL2J2Z2PohyEJfbY+cfr0aYOlhTjOSXydBE13oiG12O5Svm9FqnYgnWWiCfru4fpC/u6lCbpGaH0ra887tJgf8ZoI4p6Lei40U01sz9sQlE9m5A6YOB9mToFpHruL5NE+xAzOYfy5FC1ZygSfAf7sxQa+hfS8zue7e/bsmRuo6jD3OmxlJuahLmIVRtRvCfSWwoL8LuDZKpEPN+scq1P04vTOJWo1jkBs60uffTdiFZaU4SCuC5QoPJ9x5MgRgwqqFOMiPDRwLcZxJgsXajxK3Bp+5SOYLgUEfwlrXRj9V6NDMcSrUdG5JoDa6C+1KYYLi/tmBU2Yo4WMfwVOaYj4EdQGqgHdhN6nq2QCyVuB07imoqIiB8N7wUMwtWvmzJmf7Nq1a1qwteCLgXkzZswo271798TAa0ePHs2BiSX4gCqY+CYOpYTvu6hNbOzFcH1ZsmTJdFz/CyQBjuFF7YDXJmZnFHZix8Vk+wJP6H9r8uTJExTDh7oX3KhEaxWQ7vnly5dP7RWJFBcXb3TSMThpr5A/uTmCkPyai5F5ohu4kqcYnr/LnTy7du3ax3slE3ASmU5EH3Uvl+qyenUYULrWt3Z70RyiV3RXV1dX+szXQSfPo85ZvZwIbj3DSQPcXynQqoPsyxuk0H9mNxaN9SE6off+8vLyN3rANzb/iMPxD+vFQBxFooOHJbp1PQU8mkGY+BA29LX+UG4WCpZBZwn0/qrH+Yl+6K5z0g78SurFQJIEHidE0GFbYBBOjfMtGNj/9mcGApw/h85bTcLSNieT788v1+oDCXvqmc1iDHN7f2Se6BJ9otP1AksM6hm7D0j0Ud9ki6zv+xjoO1Sy0Z8O0SO6oG+PxS0pTjYc+fMr3peO73QSBnFkWon8gQMHngcvPR0MvfflITqg53eiywpMczhyovCroxcDYYpTsc6zYpDi5srKynUY69L+wECl6UWPVYZI40CrRjiMpet6MZDA+YRDHDQaMba0uoQ8HaSEbqKepTqWzKP/Y6IDejqDwJoEoEyBQ6mu/ZKBsmm45d8zU6/QYb2dXUtkKwqxKzlG8FWzg2SxYyqFqFopdFSEsI/5jGdkqLZUk0P+sA6k8VeyOF+aA49gCcXepaRzVpMYzeYmbXpZAVPnEThnmG1BIEk5kFT5FMXcweAOkxNTdI3XTQpVHYEETqMwPcFqSxfOp5Y4eDtjKYFxO5iQ4/zWOxsjQypEXn3+eIkE6ktkZoYTbC/C7W/goaGBuI9n5uNItlp5LxHOtaQY5/2SguE70ci5kLzmBdeI88WodYx/G8C7tify8nM81jhQBhem1ezfv/+PMHKnmSfGDi7TaluIiCUxxgxMDCaB0J+EMCwyzLegbSsrK3sJ4N2LeY422ijMQXS3mC2Ys3Aznhm6KtjsMgBvjBnoDSaBmKz5mKlRZhuBEJAtdrBhyEgED/Yvrb4ZF274k/243aoaIU4LD/1YArUUize93Wy1Ea3T/pttrmz1YiG6kgWY7Rbh2zKytWMtJHBAP5FA07UHnODXUM9rLFT7DSTzuCsM9AHQ58xKa/FeiXT2oJkUQrinPzCQifSYSR8e9hcsTXhM6hXlUJ+zsyZsO5mApG0hjf+Z2TVmsRjoM8dEAj3Yz4RYMpD+TRnI0oX2yS03e4Zxfsh4t7u6WxN70MmsPRJYImGcX2CKg9DHkMTEfiiBqpvxBFRTpCJhG8z2GAr3wfCHwcBnXd/uyoz9CWy03+xaVVXVNLK8v/aPjyEkAcZ6YiyBCaLD8CtTwfY9ypq2aY0149sDDt4Ulf3CkkJm817fqt0FL4SAiXejGsV+EpggCQhn4LJRlGC0UjXwAZ9t4e4Hpn+P6OjBpdB3G8y7zWwpFkfJz13rnUif4/3CEJFkhY0Ea1Dx51ixO0bebQcz73Uigb79xN1AiFIkWXt//654GqNOmD56GZO0GkQwG+8YZ3ct2qfCXl858XU8+6QZbPHdq3fUJEatQpWBeKwqVP1PVKQBqblCZWUA1dOh7tfmQhhUxjrzQwxyurygRf9iwnTdR0Bfps2HNnZ8noaWDLLRc4LtMO05abcUtBEXlQpVBnmD3c3SSNIJOlnvA+BmBd1apD4CM5QFmsd9Xoc75b08N1/Pqx2rYgCkuY2NivfzedIO3WoHIVnsOgMlfajmRw4Xrs8VOxp+WxNwNI3sNHqFoszVwIW0SOtr9LzaUXtqV+37lyHTvzY2Ot1o806oOulwtnrd4HSrvl7VxHPa/dh9+eWXf8zmmJtQp5xovSDC53hy6Odm+lMN4Ln+RYcTuu1IoaNtDkhfMrjpAbOUT4istUFx0jnnAlZMIzHhxcNVR6v4Uu3iIGr14jKcRZr6Vf92IwrjqzVfwZ+fI4Vet7wwzim+wwgPh4l5OvNRrefBWeuQjMcJATeRzWl049V78t6oagZ27gaSv3eCAIoinSTalLTEueaF8agFDP6oG0U9vm38hygPfgQH8HUcQqLd/SX+6oqj0j7muXqZBO1VhbOb1DDfl1yB9851dZsD8W4FkrNKdXJIzsBIZlemgOWDfPDZPYDXe4AjBzD+eyBmN5LzKav+lZz1fO9Ags8qq8OZjASnw7g8PrWUcAUqOhNVLVBI5tZLJBEUacX1aEiV60AaBP8OErOGDv5GB143ymz10kfOMXwdg7Ffo8IfGNSFd21BKmU2ZMA82LEkbNMggWjtVXFq1+wcePM2+l/F5H4QtRfv+HY+Lg2281F5VL0nBmhRohmNZSE5/dcRDpbAnPZghfBoVhNwZ6ERxmtP4p0ymxl6Hc+8DMhQH8hcCG7Gtj2Jqs3gvpVI1Sy+/wEC+2zfg+gQw5jAZ5DkK1lUX4lkzdTLKSRlJgmEGuzyYu7bZvTlq5/oeBqz9h9tgYCZzQDZp/htTCA4loPAfk7h+tMY6Dqne4PtnnIi9FNDP0/QT1Fg5YS+Y2sncP1ZvftGu5owSZ/oFVZGX7/6yfiq0jObmb4XIsaGqoURY2F0Nip1K+cWBtMU6Xu0tP1M0Qftbeb8PhqQFSq6EZ1imujWy9PCGbdrDDQiqxLNo8D7Rql9OMyDCfU8vwqpz+3r6tiYM9BfGrBNr4XDQJ570c47GaLNwJi+wVJwhPNls6UCI0SdCuHlpv6wRyXm71DV+ithWKPDdFYN4eEOw7j0ElrFybUsSDliBjBqGwC86RIDjfPbDLAlr9qNh+UwyOy8avXC7pgw0Gwrf18ebNjZijc+EgoK6TrQqZxyvO2xpNe/5O8cxRs3bjT6cme5yVEHJpzBZzbAPAvpSiW3l+j/nxGA75qZ6OMQf4xYvCnGr67/KvK59N9hRHb8T4ABAPaAkPNeKkdCAAAAAElFTkSuQmCC", nt = ":host{display:block;height:100%;color-scheme:dark;font:13px/1.4 Segoe UI,sans-serif;color:#dbe5f0;container-type:size}*{box-sizing:border-box}[hidden]{display:none!important}main{height:100%;min-height:260px;background:#171d25;display:flex;flex-direction:column;overflow:hidden}button,input,select,textarea{font:inherit;color:inherit;border:1px solid #425165;border-radius:6px;background:#253140;padding:7px 9px;min-width:0}button{cursor:pointer;white-space:nowrap}button:hover{background:#354459}button:disabled{opacity:.45;cursor:default}.primary{background:#b99a38;border-color:#d0ae46;color:#111820;font-weight:600}.primary:hover{background:#e0bd51}button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid #f2c94c;outline-offset:1px}input,select,textarea{background:#111a24}input[type=checkbox]{accent-color:#e6c354;width:16px;height:16px}header{display:flex;gap:7px;align-items:center;padding:8px 12px;border-bottom:1px solid #354459;flex-shrink:0;overflow-x:auto}.brand{display:flex;gap:7px;align-items:center;margin-right:8px}.brand img{width:32px;height:32px;object-fit:contain}.brand b{font-size:17px}.brand small{font-size:10px;color:#a6b5c7}#dirty{margin-left:auto;font-size:11px;color:#cabb81;white-space:nowrap}.notice{background:#1c2735;padding:5px 12px;font-size:12px;min-height:27px;max-height:70px;overflow:auto;color:#a7bbd1}.notice.error{color:#ffaaa1;background:#412725}.workspace{display:grid;grid-template-columns:230px minmax(0,1fr);flex:1;min-height:0}aside{padding:10px;display:flex;flex-direction:column;gap:9px;border-right:1px solid #354459;min-height:0}#checks{overflow:auto;flex:1;min-height:0}.check-item{display:flex;flex-direction:column;gap:5px;width:100%;margin-bottom:5px;text-align:left;white-space:normal}.check-item small{color:#a8b7ca}.check-item.active,.tabs .active{border-color:#c7ab56;background:#403b2c;color:#ffe399}.main{display:flex;flex-direction:column;min-width:0;min-height:0}.test-toolbar{display:flex;gap:7px;padding:8px 12px;align-items:center}.test-toolbar input{flex:1;font-weight:600}.tabs{display:flex;gap:7px;border-bottom:1px solid #354459;padding:0 12px 8px}.tabs button{min-width:105px}#content{flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column}.empty{padding:28px;color:#a4b4c9;text-align:center;margin:auto}h2,h3,p{margin:0 0 10px}h2{font-size:20px}h3{font-size:15px}label{display:flex;flex-direction:column;gap:5px;font-size:12px;color:#b8c6d7}.check{flex-direction:row;align-items:center;gap:6px}small{font-size:11px;color:#a8b7c9}.parameters{display:flex;gap:18px;align-items:end;padding:10px 12px}.parameters input{width:140px}.selection-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0 12px 12px}.selection{border:1px solid #39495e;border-radius:8px;padding:12px;background:#1b2633;min-width:0}.selection h3{display:flex;justify-content:space-between}.selection h3 span{color:#92c4b2;font-size:12px}.selection select[multiple]{width:100%;min-height:70px}.selection-tools{display:flex;gap:5px;flex-wrap:wrap;margin:8px 0}.selection-tools button{font-size:11px;padding:5px 7px}.selection>label{margin-bottom:8px}.condition{display:grid;grid-template-columns:minmax(80px,1fr) 100px minmax(70px,1fr) 29px;gap:5px;margin:6px 0}.condition button{padding:3px}.rules,.report{padding:18px;max-width:850px}.rules>label{margin:14px 0}.rules>p,.report>p{color:#a9b8cb}.report>button{margin:12px 8px 14px 0}.result-tools{display:flex;gap:7px;flex-wrap:wrap;padding:8px 12px}.result-tools input{flex:1;min-width:180px}.result-area{display:grid;grid-template-columns:minmax(0,1fr) 300px;flex:1;min-height:0}.table-area{display:flex;flex-direction:column;min-width:0;min-height:0}.scroll{overflow:auto;flex:1;min-height:0}table{border-collapse:separate;border-spacing:0;width:max-content;min-width:100%}th{position:sticky;top:0;background:#2a3748;z-index:1;text-align:left;max-width:240px;white-space:normal}th,td{padding:8px;border-bottom:1px solid #344154;vertical-align:top}td{max-width:320px;min-width:90px;overflow-wrap:anywhere;-webkit-user-select:text;user-select:text}td:first-child{min-width:36px}tr.active td{background:#453e29;color:#fff0b5}tr:hover td{background:#2c3847}.pager{display:flex;gap:10px;align-items:center;justify-content:center;padding:5px;border-top:1px solid #39495e;font-size:11px}.pager button{padding:2px 8px}.detail{border-left:1px solid #354459;padding:10px;overflow:auto}.detail h3{overflow-wrap:anywhere}.detail>label{margin:10px 0}.detail p{font:11px/1.5 Consolas,monospace}.detail details{border-top:1px solid #354459;padding:8px 0}summary{cursor:pointer}dl{font-size:11px;display:grid;grid-template-columns:1fr 1fr;gap:7px}dt,dd{overflow-wrap:anywhere;margin:0}dt{color:#9baec4}footer{border-top:1px solid #354459;padding:4px 12px;display:flex;justify-content:space-between;color:#91a4bb;font-size:11px}dialog{border:1px solid #53647c;border-radius:12px;background:#202c3a;color:#dbe5f0;width:min(700px,92vw);max-height:85vh;padding:20px;box-shadow:0 15px 60px #000a}dialog::backdrop{background:#000a}dialog p{margin:12px 0}dialog a{color:#f2c94c;margin-right:12px}.dialog-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:16px}@container (max-width:950px){.workspace{grid-template-columns:185px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 240px}.selection-grid{grid-template-columns:1fr}.parameters,.test-toolbar{flex-wrap:wrap}.test-toolbar input{flex-basis:100%}}@container (max-height:400px){header{padding:5px 10px}.test-toolbar{padding:5px 10px}.tabs{padding-bottom:5px}.brand img{width:25px;height:25px}footer{display:none}}:host{font-size:14px}.brand img{background:#e1e7ef;border-radius:5px;padding:3px}.selection-tools button{font-size:12px}label{font-size:13px}.choose-layout{display:grid;grid-template-columns:220px minmax(0,1fr);min-height:0;flex:1;overflow:auto}.choose-layout .parameters{display:flex;flex-direction:column;align-items:stretch;gap:15px;border-right:1px solid #354459;justify-content:flex-start}.choose-layout .parameters input{width:100%}.choose-layout .parameters input[type=checkbox]{width:16px}.choose-layout .selection-grid{padding:10px 12px;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start;min-width:0}.selection select[multiple]{height:180px;resize:vertical}.selection-mode{font-size:12px;color:#b6c4d5}.preset-row{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:9px}.preset-row select{flex:1 1 160px}.preset-row button{padding:5px 7px;font-size:12px}.model-list{height:150px;overflow:auto;border:1px solid #425165;border-radius:6px;background:#111a24;padding:5px;margin-bottom:5px}.model-list label{display:flex;flex-direction:row;align-items:center;gap:7px;padding:4px 5px;color:#dbe5f0;overflow-wrap:anywhere}.model-list label:hover{background:#253140}.model-list .model-all{position:sticky;top:-5px;z-index:1;background:#1f2b39;border-bottom:1px solid #425165;font-weight:600}.legend{display:flex;gap:12px;flex-wrap:wrap;font-family:inherit!important}.part-a{color:#ff6161}.part-b{color:#65baff}.preview{display:block;width:100%;padding:5px;margin:8px 0}.preview img{display:block;width:100%;max-height:180px;object-fit:contain}.image-dialog{width:94vw;max-width:1500px}.image-dialog img{display:block;max-width:100%;max-height:75vh;margin:10px auto}#help-dialog{width:min(1000px,94vw);line-height:1.6}#help-dialog details{padding:12px 0;border-bottom:1px solid #425165}#help-dialog summary{font-size:16px;font-weight:600;color:#f0d27a}#help-dialog li{margin:8px 0}@container (max-width:1100px){.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .selection-grid{grid-template-columns:1fr}.condition{grid-template-columns:minmax(60px,1fr) 100px minmax(60px,1fr) 29px}}@container (max-width:700px){.choose-layout{display:block}.choose-layout .parameters{border-right:0;border-bottom:1px solid #354459}.workspace{grid-template-columns:160px minmax(0,1fr)}}", ue = /* @__PURE__ */ new WeakMap(), we = () => ({
  format: "nashepo.checks",
  version: 1,
  checks: [],
  sets: []
});
function it(e, t) {
  const n = e.shadowRoot || e.attachShadow({ mode: "open" });
  let o = t.projectToken(), i = o && ue.get(o) || we();
  o && ue.set(o, i);
  let a, c = i.checks[0]?.id || "", d = "select", p = "", u = 0, m = !1, h = !1, x, v = !0, S = !1;
  const y = /* @__PURE__ */ new Set();
  let M;
  const k = () => i.checks.find((s) => s.id === c), f = (s) => n.querySelector("#" + s);
  n.innerHTML = `<style>${nt}</style><main><header><div class="brand"><img src="${tt}" alt=""><b>НашеПО</b><small>${De}</small></div><button id="scan">Обновить модели</button><button id="new" class="primary">＋ Проверка</button><button id="open">Открыть проверки</button><button id="save">Сохранить проверки</button><button id="settings">⚙</button><button id="help">Справка</button><span id="dirty"></span></header><div class="notice" id="notice" role="status">Откройте IFC/SMDX в проекте и нажмите «Обновить модели».</div><div class="workspace"><aside><input id="test-search" type="search" placeholder="Поиск проверок"><div id="checks"></div><button id="all">Запустить все</button></aside><section class="main"><div class="test-toolbar"><input id="name" aria-label="Имя проверки" placeholder="Имя проверки"><button id="copy">Копировать</button><button id="delete">Удалить</button><button id="run" class="primary">▶ Запустить</button><button id="cancel" hidden>Остановить</button></div><div id="tabs" class="tabs">${[
    ["rules", "Правила"],
    ["select", "Выбрать"],
    ["results", "Результаты"],
    ["report", "Отчёт"]
  ].map(([s, r]) => `<button data-tab="${s}">${r}</button>`).join(
    ""
  )}</div><div id="content"></div></section></div><footer><span id="model-count">Модели не прочитаны</span><span>Расчёт выполняется на вашем компьютере</span></footer><input id="file" type="file" accept=".json" hidden><dialog id="settings-dialog"><h2>Настройки</h2><label>Дистанция камеры, м<input id="distance" type="number" value="15" min="0.5"></label><p class="links"><a href="https://nashepo.ru/" target="_blank" rel="noopener noreferrer">Сайт НашеПО</a><a href="https://t.me/RoburFan" target="_blank" rel="noopener noreferrer">Telegram</a></p><button data-close="settings-dialog">Закрыть</button></dialog><dialog id="help-dialog">${Ue}<button data-close="help-dialog">Закрыть</button></dialog><dialog id="set-dialog"><h2>Сохранить набор параметров</h2><label>Название<input id="set-name" maxlength="120"></label><div class="dialog-actions"><button id="set-cancel">Отмена</button><button id="set-confirm" class="primary">Сохранить</button></div></dialog></main>`;
  const F = document.createElement("button");
  F.id = "clear-project", F.textContent = "Очистить проект", f("save").after(F);
  const Z = (s, r = !1) => {
    f("notice").textContent = s, f("notice").classList.toggle("error", r);
  }, P = async (s) => {
    try {
      await s();
    } catch (r) {
      Z(r instanceof Error ? r.message : String(r), !0);
    }
  }, G = () => new Promise((s) => {
    const r = f("set-dialog"), l = f("set-name");
    let w = !1;
    const g = (I) => {
      w || (w = !0, r.close(), s(I));
    };
    l.value = "Новый набор", f("set-confirm").onclick = () => {
      const I = l.value.trim();
      I ? g(I) : l.focus();
    }, f("set-cancel").onclick = () => g(), r.oncancel = (I) => {
      I.preventDefault(), g();
    }, r.showModal(), l.focus(), l.select();
  }), K = () => {
    S = !0, f("dirty").textContent = "Есть несохранённые изменения";
  }, j = () => {
    const s = t.projectToken();
    return !s || s === o ? !1 : (!o && (i.checks.length || i.sets.length) ? ue.set(s, i) : i = ue.get(s) || we(), ue.set(s, i), o = s, a = void 0, c = i.checks[0]?.id || "", p = "", y.clear(), u = 0, S = !1, t.clear(), f("dirty").textContent = "", !0);
  }, A = () => {
    const s = k();
    s?.lastRun && (s.status = "stale"), K(), $();
  }, V = () => [
    ...new Set(
      (a?.elements || []).flatMap((s) => Object.keys(s.properties))
    )
  ].sort(), q = (s, r) => s.map(
    (l) => `<option value="${B(l)}" ${l === r ? "selected" : ""}>${B(l)}</option>`
  ).join("");
  function N() {
    const s = k(), r = f("result-search")?.value.toLowerCase() || "", l = f("result-state")?.value || "", w = Number(f("result-depth")?.value || 0);
    return (s?.results || []).filter(
      (g) => (!l || g.state === l) && (s?.type === "duplicates" || (g.penetrationMm ?? 0) >= w) && (!r || JSON.stringify({ ...g, image: void 0 }).toLowerCase().includes(r))
    );
  }
  function $() {
    const s = f("test-search").value.toLowerCase();
    f("checks").innerHTML = i.checks.filter((r) => r.name.toLowerCase().includes(s)).map(
      (r) => `<button class="check-item ${r.id === c ? "active" : ""}" data-check="${r.id}"><strong>${B(r.name)}</strong><small>${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[r.status]} · ${r.results.filter((l) => !["resolved", "excluded"].includes(l.state)).length} в работе / ${r.results.length}</small></button>`
    ).join("");
  }
  function Y(s, r) {
    return [
      ...new Set(
        (a?.elements || []).filter(
          (l) => s.modelsMode !== "selected" || s.models.includes(l.modelId)
        ).map((l) => l.properties[r]).filter((l) => l !== void 0)
      )
    ].sort().slice(0, 500);
  }
  function z(s, r) {
    const l = a?.elements.filter(
      (O) => (k().includeHidden || !O.hidden) && be(O, s)
    ).length || 0, w = s.manualOnly ? H(s) : s.modelsMode === "selected" ? s.models : (a?.models || []).map((O) => O.id), g = a && w.every((O) => a.indexedModelIds.includes(O)) ? `${l} элементов` : "число после запуска", I = a?.models || [], b = s.modelsMode !== "selected", E = i.sets.map(
      (O) => `<option value="${B(O.id)}" ${s.presetId === O.id ? "selected" : ""}>${B(O.name)}</option>`
    ).join("");
    return `<article class="selection" data-side="${r}"><h3>Выбор ${r.toUpperCase()} <span data-selection-count>${g}</span></h3><p class="selection-mode">${s.manualOnly ? "Ручная выборка — только указанные элементы" : "Автоматическая выборка — модели и условия"}</p><div class="preset-row"><select class="preset"><option value="">Набор параметров…</option>${E}</select><button data-selection="load-set">Применить</button><button data-selection="save-set">Сохранить как набор</button><button data-selection="delete-set" ${s.presetId ? "" : "disabled"}>Удалить</button></div><div class="model-list"><label class="model-all"><input type="checkbox" class="all-models" ${b ? "checked" : ""}> Все модели</label>${I.map((O) => `<label><input type="checkbox" class="model-check" value="${B(O.id)}" ${b || s.models.includes(O.id) ? "checked" : ""}> ${B(O.name)}</label>`).join("") || "<small>Нажмите «Обновить модели».</small>"}</div><small>Отмеченные файлы участвуют в этой стороне проверки. После выбора нажмите «Обновить модели», чтобы получить свойства и точное количество, либо сразу запустите проверку.</small><div class="selection-tools"><button data-selection="show">Показать выборку</button><button data-selection="only">Только выделенные</button><button data-selection="include">＋ Добавить выделенные</button><button data-selection="exclude">− Исключить выделенные</button><button data-selection="reset">Вернуть автоматический выбор</button></div><small>Добавлено вручную: ${s.include.length} · исключено: ${s.exclude.length}</small><label>Условия<select class="mode"><option value="all" ${s.mode === "all" ? "selected" : ""}>Выполнены все (И)</option><option value="any" ${s.mode === "any" ? "selected" : ""}>Выполнено любое (ИЛИ)</option></select></label><div class="conditions">${s.conditions.map((O, C) => {
      const R = Y(s, O.field);
      return `<div class="condition" data-condition="${C}"><input class="field" list="property-fields" value="${B(O.field)}" placeholder="Свойство"><select class="op">${[
        ["eq", "равно"],
        ["contains", "содержит"],
        ["ne", "не равно"],
        ["exists", "существует"],
        ["gt", "больше"],
        ["lt", "меньше"]
      ].map(
        ([ce, Re]) => `<option value="${ce}" ${O.op === ce ? "selected" : ""}>${Re}</option>`
      ).join(
        ""
      )}</select><input class="value" list="values-${r}-${C}" value="${B(O.value)}" placeholder="Значение" ${O.op === "exists" ? "disabled" : ""}><datalist id="values-${r}-${C}">${R.map((ce) => `<option value="${B(ce)}"></option>`).join("")}</datalist><button data-remove="${C}" aria-label="Удалить условие">×</button></div>`;
    }).join(
      ""
    )}</div><button data-selection="add">＋ Условие</button></article>`;
  }
  function U() {
    $();
    const s = k();
    f("name").value = s?.name || "";
    for (const r of ["name", "copy", "delete", "run"])
      f(r).disabled = !s || m;
    for (const r of n.querySelectorAll("[data-tab]"))
      r.classList.toggle("active", r.dataset.tab === d);
    if (!s) {
      f("content").innerHTML = '<div class="empty"><h2>Создайте первую проверку</h2><p>Обновите модели, затем выберите, какие элементы проверять друг с другом.</p></div>';
      return;
    }
    d === "select" && (f("content").innerHTML = `<div class="choose-layout"><div class="parameters"><h3>Параметры проверки</h3><label>Тип<select id="type"><option value="intersection" ${s.type === "intersection" ? "selected" : ""}>По пересечению</option><option value="duplicates" ${s.type === "duplicates" ? "selected" : ""}>Дублирование</option></select></label><label title="Числовая погрешность расчёта">Точность расчёта, мм<input id="precision" type="number" value="${s.precision}" min="0.001" max="100" step="0.1"></label><label title="Конфликты с меньшим расчётным вхождением не попадут в результат">Минимальное вхождение, мм<input id="min-penetration" type="number" value="${s.minPenetration}" min="0" max="100000" step="1" ${s.type === "duplicates" ? "disabled" : ""}></label><label class="check"><input id="touching" type="checkbox" ${s.touching ? "checked" : ""} ${s.type === "duplicates" ? "disabled" : ""}>Учитывать касания</label><small>Касание — соприкосновение поверхностей без проникновения. Обычно выключено. Вхождение для произвольной IFC-геометрии является расчётной оценкой.</small><p class="legend"><span class="part-a">● А — красный</span><span class="part-b">● Б — синий</span></p></div><div class="selection-grid">${z(s.a, "a")}${z(s.b, "b")}</div></div><datalist id="property-fields">${q(V(), "")}</datalist>`), d === "rules" && (f("content").innerHTML = `<div class="rules"><h3>Исключение пар</h3><p>Элемент сам с собой не проверяется. Пара А/Б учитывается один раз.</p><label class="check"><input id="same-model" type="checkbox" ${s.ignoreSameModel ? "checked" : ""}>Не проверять элементы одной модели</label><label class="check"><input id="same-group" type="checkbox" ${s.ignoreSameGroup ? "checked" : ""}>Не проверять геометрию одного составного объекта</label><label>Не проверять пары с одинаковым значением свойства<input id="equal-property" list="property-fields" value="${B(s.equalProperty)}" placeholder="Без ограничения"></label><label class="check"><input id="hidden" type="checkbox" ${s.includeHidden ? "checked" : ""}>Включать скрытые элементы прочитанных моделей</label><p>Незагруженные подключённые файлы нужно открыть перед расчётом.</p><datalist id="property-fields">${q(V(), "")}</datalist></div>`), d === "results" && (f("content").innerHTML = `<div class="result-tools"><input id="result-search" type="search" placeholder="Поиск по результатам"><select id="result-state"><option value="">Все состояния</option>${Object.entries(
      re
    ).map(([r, l]) => `<option value="${r}">${l}</option>`).join(
      ""
    )}</select>${s.type === "intersection" ? '<input id="result-depth" type="number" min="0" step="1" placeholder="Вхождение от, мм">' : ""}<button id="show-markers" role="switch" aria-checked="${v}">${v ? "● Знаки включены" : "○ Знаки выключены"}</button><select id="bulk-state">${Object.entries(
      re
    ).map(([r, l]) => `<option value="${r}">${l}</option>`).join(
      ""
    )}</select><button id="bulk">Применить к выбранным</button></div><div class="result-area"><div class="table-area"><div class="scroll" id="table"></div><div class="pager"><button id="prev-page">←</button><span id="page"></span><button id="next-page">→</button><span id="selection-count"></span></div></div><div class="detail" id="detail"></div></div>`, _(), ne()), d === "report" && (f("content").innerHTML = `<div class="report"><h3>${B(s.name)}</h3><p>Результатов: ${s.results.length}. Выбрано: ${y.size}. ${s.status === "stale" ? "Результаты устарели — рекомендуется повторный запуск." : ""}</p><label class="check"><input id="selected-only" type="checkbox" ${y.size ? "checked" : ""}>Только выбранные строки</label><label class="check"><input id="report-images" type="checkbox" checked>Добавить снимки (недостающие будут созданы автоматически)</label><button id="export-html" class="primary">Сформировать HTML-отчёт</button><button id="export-viewer">Сессия для плагина «Коллизии»</button><p>Правила и все результаты сохраняются кнопкой «Сохранить проверки» в верхней панели.</p></div>`), f("content").inert = m;
  }
  function _() {
    const s = k(), r = N(), l = Math.max(1, Math.ceil(r.length / 50));
    u = Math.max(0, Math.min(u, l - 1));
    const w = r.slice(u * 50, u * 50 + 50);
    f("table").innerHTML = r.length ? `<table><thead><tr><th><input id="check-page" type="checkbox" aria-label="Выбрать страницу" ${w.every((g) => y.has(g.id)) ? "checked" : ""}></th>${["№", "Состояние", "Вхождение, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "Комментарий"].map((g) => `<th>${g}</th>`).join("")}</tr></thead><tbody>${w.map((g, I) => `<tr data-result="${B(g.id)}" class="${g.id === p ? "active" : ""}"><td><input type="checkbox" class="row-check" aria-label="Выбрать конфликт" ${y.has(g.id) ? "checked" : ""}></td>${[u * 50 + I + 1, re[g.state], s.type === "duplicates" ? "—" : (g.penetrationMm ?? 0).toFixed(1), g.a.name, g.a.model, g.a.guid || "—", g.b.name, g.b.model, g.b.guid || "—", g.note].map((b) => `<td title="${B(b)}">${B(b)}</td>`).join("")}</tr>`).join("")}</tbody></table>` : '<div class="empty">Нет результатов. Запустите проверку или измените фильтры.</div>', f("page").textContent = `Страница ${u + 1} из ${l} · ${r.length} результатов`, f("selection-count").textContent = `Выбрано: ${y.size}`, f("prev-page").disabled = u === 0, f("next-page").disabled = u === l - 1;
  }
  function ne() {
    const s = k()?.results.find((r) => r.id === p);
    f("detail").innerHTML = s ? `<h3>${B(s.a.name)} × ${B(s.b.name)}</h3><p class="legend"><span class="part-a">● А — красный</span><span class="part-b">● Б — синий</span></p><p>${k()?.type === "duplicates" ? "Дублирование" : `Расчётное вхождение: ${(s.penetrationMm ?? 0).toFixed(1)} мм`}</p>${s.image ? `<button id="open-image" class="preview"><img src="${B(s.image)}" alt="Снимок коллизии"><span>Открыть крупнее</span></button>` : ""}<button id="capture-image">Сохранить текущий ракурс</button><div class="selection-tools"><button id="focus" class="primary">Перейти в 3D</button><button id="previous">←</button><button id="next">→</button></div><p>${s.point.map((r, l) => `${["X", "Y", "Z"][l]}: ${r.toFixed(4)}`).join(" · ")}</p><label>Состояние<select id="edit-state">${Object.entries(
      re
    ).map(
      ([r, l]) => `<option value="${r}" ${s.state === r ? "selected" : ""}>${l}</option>`
    ).join(
      ""
    )}</select></label><label>Назначение<input id="assignee" value="${B(s.assignee)}"></label><label>Комментарий<textarea id="note" rows="3">${B(s.note)}</textarea></label>${[
      s.a,
      s.b
    ].map(
      (r, l) => `<details><summary>Элемент ${l ? "Б" : "А"} · свойства</summary><dl>${Object.entries(
        r.properties
      ).map(([w, g]) => `<dt>${B(w)}</dt><dd>${B(g)}</dd>`).join("")}</dl></details>`
    ).join("")}` : "<p>Выберите конфликт в таблице.</p>";
  }
  const H = (s) => {
    const r = new Set(
      !s.manualOnly && s.modelsMode === "selected" ? s.models : []
    );
    for (const l of s.include)
      try {
        r.add(String(JSON.parse(l)[0]));
      } catch {
        const w = a?.elements.find(
          (g) => g.id === l
        )?.modelId;
        w && r.add(w);
      }
    return [...r];
  }, ee = (s) => {
    if (!s?.length) return;
    const r = /* @__PURE__ */ new Set();
    for (const l of s)
      for (const w of [l.a, l.b]) {
        if (!w.manualOnly && w.modelsMode !== "selected") return;
        for (const g of H(w)) r.add(g);
      }
    return r;
  }, ie = () => {
    const s = k();
    if (s)
      for (const r of n.querySelectorAll("[data-side]")) {
        const l = r.dataset.side, w = a?.elements.filter(
          (E) => (s.includeHidden || !E.hidden) && be(E, s[l])
        ).length || 0, g = s[l].manualOnly ? H(s[l]) : s[l].modelsMode === "selected" ? s[l].models : (a?.models || []).map((E) => E.id), I = !!a && g.every((E) => a.indexedModelIds.includes(E)), b = r.querySelector(
          "[data-selection-count]"
        );
        b && (b.textContent = I ? `${w} элементов` : "число после запуска");
      }
  };
  function te() {
    t.markers(
      N(),
      p,
      v,
      (s) => P(() => oe(s, !0))
    );
  }
  function oe(s, r = !1) {
    if (!m) {
      if (p = s, d === "results") {
        for (const l of n.querySelectorAll("[data-result]"))
          l.classList.toggle("active", l.dataset.result === s);
        ne();
      }
      if (te(), r) {
        const l = k()?.results.find((w) => w.id === s);
        l && t.focus(l, Number(f("distance").value));
      }
    }
  }
  async function X(s, r = !1) {
    j();
    const l = r ? /* @__PURE__ */ new Set() : ee(s);
    a = await t.scan(Z, () => h, l), f("model-count").textContent = `Проиндексировано моделей: ${a.indexedModelIds.length} из ${a.models.length} · элементов: ${a.elements.length}`, U(), Z(
      a.blockers.length ? a.blockers.join(" ") : a.warnings.length ? `Модели прочитаны с замечаниями. ${a.warnings.join(" ")}` : "Модели прочитаны. Настройте выборки и запустите проверку.",
      !!a.blockers.length
    );
  }
  const J = (s) => {
    m = s;
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
      f(r).disabled = s;
    f("cancel").hidden = !s, f("content").inert = s, f("checks").inert = s;
  };
  async function D(s) {
    const r = (w) => Z(`${s.name} · ${w.phase} ${w.done}/${w.total} · найдено ${w.found}`);
    let l;
    try {
      l = new Ke();
    } catch {
      return Xe(
        a.elements,
        s,
        r,
        () => h,
        (w) => t.geometry(w, () => h)
      );
    }
    return x = l, new Promise((w, g) => {
      const I = () => {
        l.terminate(), x = void 0, M = void 0;
      };
      M = () => {
        I(), g(Error("Расчёт отменён. Предыдущие результаты сохранены."));
      }, l.onmessage = async (b) => {
        if (b.data.load) {
          try {
            const E = await t.geometry(
              b.data.load,
              () => h || x !== l
            );
            if (x !== l) return;
            const O = [
              E.vertices?.buffer,
              E.indices?.buffer
            ].filter(Boolean);
            l.postMessage(
              { request: b.data.request, geometry: E },
              O
            );
          } catch (E) {
            x === l && l.postMessage({
              request: b.data.request,
              error: E instanceof Error ? E.message : String(E)
            });
          }
          return;
        }
        b.data.progress ? r(b.data.progress) : (I(), b.data.error ? g(Error(b.data.error)) : w(b.data.results));
      }, l.onerror = (b) => {
        I(), g(
          Error(
            `Не удалось запустить расчёт в фоновом потоке: ${b.message || "ошибка загрузки"}`
          )
        );
      }, l.postMessage({
        elements: a.elements,
        streaming: typeof t.geometry == "function",
        check: structuredClone({ ...s, results: [], warnings: [] })
      });
    });
  }
  async function se(s = !1) {
    if (m) return;
    j();
    const r = s ? [...i.checks] : [k()].filter(Boolean);
    if (!r.length) throw Error("Создайте проверку.");
    h = !1, J(!0);
    try {
      if (await X(r), J(!0), a.blockers.length)
        throw Error(
          "Состав моделей прочитан не полностью. " + a.blockers.join(" ")
        );
      for (const l of r) {
        if (h) break;
        for (const b of [l.a, l.b]) {
          if (b.modelsMode === "selected" && b.models.some((E) => !a.models.some((O) => O.id === E)))
            throw Error(
              `${l.name}: одна из моделей выборки отсутствует. Исправьте выборку.`
            );
          if (b.include.some((E) => !a.elements.some((O) => O.id === E)))
            throw Error(
              `${l.name}: вручную добавленный элемент отсутствует в модели.`
            );
        }
        const w = Fe(l);
        if (l.configAtRun === w && l.modelsAtRun?.some(
          (b) => !a.models.some((E) => E.id === b)
        ))
          throw Error(
            `${l.name}: состав моделей уменьшился. Подключите прежние модели или создайте копию проверки для нового состава. Прежние результаты сохранены.`
          );
        const g = await D(l);
        if (h || !t.isCurrent())
          throw Error(
            "Проект изменился или расчёт отменён. Предыдущие результаты сохранены."
          );
        const I = (/* @__PURE__ */ new Date()).toISOString();
        l.results = Ye(
          l.configAtRun === w ? l.results : [],
          g,
          I
        ), l.lastRun = I, l.fingerprint = a.fingerprint, l.configAtRun = w, l.modelsAtRun = [...a.indexedModelIds], l.status = "done", l.warnings = [...a.warnings], c = l.id, p = l.results[0]?.id || "", y.clear(), K();
      }
      d = "results", U(), te(), Z(
        `Проверка завершена. ${k()?.results.length || 0} результатов. Сохраните проверки для продолжения работы.`
      );
    } finally {
      J(!1), U();
    }
  }
  function he(s) {
    const r = s.closest("[data-side]")?.dataset.side;
    if (!r) return;
    const l = k()[r], w = s.closest("[data-condition]")?.dataset.condition, g = s, I = s.closest("[data-side]");
    if (g.classList.contains("preset")) {
      l.presetId = g.value || void 0, I.querySelector(
        '[data-selection="delete-set"]'
      ).disabled = !l.presetId;
      return;
    }
    if (g.classList.contains("all-models")) {
      for (const b of I.querySelectorAll(
        ".model-check"
      ))
        b.checked = g.checked;
      l.modelsMode = g.checked ? "all" : "selected", l.models = [], l.manualOnly = !1, l.presetId = void 0;
    }
    if (g.classList.contains("model-check")) {
      const b = [
        ...I.querySelectorAll(".model-check")
      ], E = b.filter((C) => C.checked).map((C) => C.value), O = b.length > 0 && E.length === b.length;
      I.querySelector(".all-models").checked = O, l.modelsMode = O ? "all" : "selected", l.models = O ? [] : E, l.manualOnly = !1, l.presetId = void 0;
    }
    if (g.classList.contains("mode") && (l.mode = g.value, l.presetId = void 0), w !== void 0) {
      const b = l.conditions[Number(w)];
      if (g.classList.contains("field") && (b.field = g.value, g.closest(".condition").querySelector("datalist").innerHTML = Y(l, b.field).map((E) => `<option value="${B(E)}"></option>`).join("")), g.classList.contains("op")) {
        b.op = g.value;
        const E = g.closest(".condition").querySelector(".value");
        E.disabled = b.op === "exists";
      }
      g.classList.contains("value") && (b.value = g.value), l.presetId = void 0;
    }
    A(), ie();
  }
  f("new").onclick = () => {
    const s = Be();
    s.name = `Проверка ${i.checks.length + 1}`, i.checks.push(s), c = s.id, d = "select", p = "", y.clear(), K(), U();
  }, f("scan").onclick = () => P(async () => {
    h = !1, J(!0);
    try {
      const s = k();
      await X(s ? [s] : void 0, !s);
    } finally {
      J(!1), U();
    }
  }), f("run").onclick = () => P(() => se()), f("all").onclick = () => P(() => se(!0)), f("cancel").onclick = () => {
    h = !0, M?.();
  }, f("test-search").oninput = $, f("checks").onclick = (s) => {
    const r = s.target.closest(
      "[data-check]"
    );
    r && !m && (t.clear(), c = r.dataset.check, p = "", y.clear(), u = 0, U());
  }, f("tabs").onclick = (s) => {
    const r = s.target.closest("[data-tab]");
    r && !m && (d = r.dataset.tab, U());
  }, f("name").onchange = () => {
    const s = k();
    s && (s.name = f("name").value.trim() || "Проверка", K(), $());
  }, f("copy").onclick = () => {
    const s = k();
    if (!s) return;
    const r = structuredClone(s);
    Object.assign(r, {
      id: crypto.randomUUID(),
      name: s.name + " — копия",
      results: [],
      lastRun: void 0,
      fingerprint: void 0,
      configAtRun: void 0,
      status: "new"
    }), i.checks.push(r), c = r.id, p = "", y.clear(), K(), U();
  }, f("delete").onclick = () => {
    k() && confirm(`Удалить проверку «${k().name}» и её результаты?`) && (i.checks = i.checks.filter((s) => s.id !== c), c = i.checks[0]?.id || "", y.clear(), t.clear(), K(), U());
  }, f("clear-project").onclick = () => {
    !i.checks.length && !i.sets.length || confirm(
      "Очистить проверки, наборы параметров и результаты текущего проекта?"
    ) && (i.checks = [], i.sets = [], a = void 0, c = "", p = "", y.clear(), t.clear(), K(), f("model-count").textContent = "Модели не прочитаны", U(), Z("Данные проверок текущего проекта очищены."));
  }, f("save").onclick = () => {
    Oe("НашеПО-проверки.json", JSON.stringify(i, null, 2)), S = !1, f("dirty").textContent = "Файл проверок сохранён";
  }, f("open").onclick = () => f("file").click(), f("file").onchange = () => P(async () => {
    const s = f("file").files?.[0];
    if (!s) return;
    const r = Ze(await s.text());
    S && !confirm("Заменить текущие несохранённые проверки данными из файла?") || (i = r, o && ue.set(o, i), c = i.checks[0]?.id || "", p = "", y.clear(), t.clear(), S = !1, f("dirty").textContent = "Проверки открыты", U(), Z("Проверки открыты. Обновите модели перед переходом к элементам."), f("file").value = "");
  });
  for (const s of ["settings", "help"])
    f(s).onclick = () => f(s + "-dialog").showModal();
  for (const s of n.querySelectorAll("[data-close]"))
    s.onclick = () => f(s.dataset.close).close();
  f("content").onchange = (s) => P(() => {
    const r = s.target, l = k();
    if (!l) return;
    if (r.closest("[data-side]")) {
      he(r);
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
        const g = Number(r.value);
        if (!Number.isFinite(g) || g < 1e-3 || g > 100)
          throw r.value = String(l.precision), Error("Точность должна быть от 0,001 до 100 мм.");
        l.precision = g;
      }
      if (r.id === "min-penetration") {
        const g = Number(r.value);
        if (!Number.isFinite(g) || g < 0 || g > 1e5)
          throw r.value = String(l.minPenetration), Error(
            "Минимальное вхождение должно быть от 0 до 100 000 мм."
          );
        l.minPenetration = g;
      }
      r.id === "type" && (l.type = r.value), r.id === "touching" && (l.touching = r.checked), r.id === "same-model" && (l.ignoreSameModel = r.checked), r.id === "same-group" && (l.ignoreSameGroup = r.checked), r.id === "hidden" && (l.includeHidden = r.checked), r.id === "equal-property" && (l.equalProperty = r.value), A(), U();
      return;
    }
    if (r.id === "result-state") {
      u = 0, _();
      return;
    }
    if (r.id === "check-page") {
      for (const g of N().slice(u * 50, u * 50 + 50))
        r.checked ? y.add(g.id) : y.delete(g.id);
      _();
      return;
    }
    if (r.classList.contains("row-check")) {
      const g = r.closest("[data-result]").dataset.result;
      r.checked ? y.add(g) : y.delete(g), f("selection-count").textContent = `Выбрано: ${y.size}`;
      return;
    }
    const w = l.results.find((g) => g.id === p);
    w && (r.id === "edit-state" && (w.state = r.value, _(), $(), te()), r.id === "assignee" && (w.assignee = r.value), r.id === "note" && (w.note = r.value, _()), K());
  }), f("content").oninput = (s) => {
    const r = s.target;
    (r.id === "result-search" || r.id === "result-depth") && (u = 0, _());
    const l = k(), w = Number(r.value);
    l && r.id === "precision" && Number.isFinite(w) && w >= 1e-3 && w <= 100 && (l.precision = w, A()), l && r.id === "min-penetration" && Number.isFinite(w) && w >= 0 && w <= 1e5 && (l.minPenetration = w, A());
  }, f("content").onclick = (s) => P(async () => {
    const r = s.target, l = r.closest("button"), w = k();
    if (!w) return;
    if (l?.dataset.selection || l?.dataset.remove !== void 0) {
      const I = l.closest("[data-side]").dataset.side, b = w[I], E = f("content").scrollTop;
      let O = !0;
      if (l.dataset.remove !== void 0)
        b.conditions.splice(Number(l.dataset.remove), 1);
      else
        switch (l.dataset.selection) {
          case "load-set": {
            const C = i.sets.find((R) => R.id === b.presetId);
            if (!C) throw Error("Выберите сохранённый набор параметров.");
            Object.assign(b, structuredClone(C.selection), {
              include: [],
              exclude: [],
              manualOnly: !1,
              presetId: C.id
            });
            break;
          }
          case "save-set": {
            if (b.manualOnly)
              throw Error(
                "Ручную выборку элементов нельзя сохранить как набор параметров."
              );
            const C = await G();
            if (!C) return;
            const R = {
              id: crypto.randomUUID(),
              name: C,
              selection: {
                models: [...b.models],
                modelsMode: b.modelsMode,
                conditions: structuredClone(b.conditions),
                mode: b.mode
              }
            };
            i.sets.push(R), b.presetId = R.id, O = !1;
            break;
          }
          case "delete-set": {
            const C = i.sets.find((R) => R.id === b.presetId);
            if (!C) throw Error("Выберите сохранённый набор параметров.");
            if (!confirm(`Удалить набор «${C.name}»?`)) return;
            i.sets = i.sets.filter((R) => R.id !== C.id);
            for (const R of i.checks)
              for (const ce of [R.a, R.b])
                ce.presetId === C.id && (ce.presetId = void 0);
            O = !1;
            break;
          }
          case "add":
            b.conditions.push({ field: "Имя", op: "contains", value: "" });
            break;
          case "show":
            t.select(
              (a?.elements || []).filter(
                (C) => (w.includeHidden || !C.hidden) && be(C, b)
              ).map((C) => C.id)
            );
            return;
          case "only": {
            const C = t.selected();
            if (!C.length) throw Error("Выделите элементы в 3D-сцене.");
            b.include = C, b.exclude = [], b.manualOnly = !0;
            break;
          }
          case "include": {
            const C = t.selected();
            if (!C.length) throw Error("Выделите элементы в 3D-сцене.");
            b.include = [.../* @__PURE__ */ new Set([...b.include, ...C])], b.exclude = b.exclude.filter((R) => !C.includes(R));
            break;
          }
          case "exclude": {
            const C = t.selected();
            if (!C.length) throw Error("Выделите элементы в 3D-сцене.");
            b.exclude = [.../* @__PURE__ */ new Set([...b.exclude, ...C])], b.include = b.include.filter((R) => !C.includes(R));
            break;
          }
          case "reset":
            b.manualOnly = !1, b.include = [], b.exclude = [];
        }
      O ? A() : K(), U(), f("content").scrollTop = E;
      return;
    }
    if (l?.id === "prev-page" && (u--, _()), l?.id === "next-page" && (u++, _()), l?.id === "show-markers" && (v = !v, l.textContent = v ? "● Знаки включены" : "○ Знаки выключены", l.setAttribute("aria-checked", String(v)), te()), l?.id === "bulk") {
      const I = f("bulk-state").value;
      for (const b of w.results) y.has(b.id) && (b.state = I);
      K(), _(), ne(), $(), te();
    }
    if (l?.id === "capture-image") {
      const I = w.results.find((b) => b.id === p);
      if (I) {
        h = !1, J(!0);
        try {
          I.image = await t.snapshot(
            I,
            Number(f("distance").value),
            () => h,
            !0
          ), K(), ne(), Z("Снимок сохранён в результат.");
        } finally {
          J(!1);
        }
      }
      return;
    }
    if (l?.id === "open-image") {
      const I = w.results.find((b) => b.id === p);
      if (I?.image) {
        const b = document.createElement("dialog");
        b.className = "image-dialog", b.innerHTML = '<button>Закрыть</button><img alt="Снимок коллизии">', b.querySelector("img").src = I.image, b.querySelector("button").onclick = () => {
          b.close(), b.remove();
        }, n.append(b), b.showModal();
      }
      return;
    }
    if (l?.id === "focus" && oe(p, !0), l?.id === "previous" || l?.id === "next") {
      const I = N(), b = I.findIndex((E) => E.id === p) + (l.id === "next" ? 1 : -1);
      I[b] && (u = Math.floor(b / 50), _(), oe(I[b].id, !0));
    }
    if (l?.id === "export-html" || l?.id === "export-viewer") {
      const I = f("selected-only").checked ? w.results.filter((E) => y.has(E.id)) : w.results;
      if (!I.length) throw Error("Нет результатов для отчёта.");
      if (f("report-images").checked) {
        const E = t.view, O = E?.storeView();
        h = !1, J(!0);
        try {
          let C = 0;
          for (const R of I) {
            if (h)
              throw Error(
                "Подготовка отчёта отменена. Уже полученные снимки сохранены."
              );
            if (Z("Подготовка снимков: " + ++C + " / " + I.length), !R.image) {
              if (R.state === "resolved" && !t.canLocate(R)) continue;
              R.image = await t.snapshot(
                R,
                Number(f("distance").value),
                () => h
              ), K();
            }
          }
        } finally {
          if (E && t.isCurrent()) {
            const C = w.results.find((R) => R.id === p);
            if (C)
              try {
                t.focus(
                  C,
                  Number(f("distance").value),
                  !1
                );
              } catch {
              }
            O && E.restoreView(O);
          }
          J(!1);
        }
      }
      const b = f("report-images").checked ? I : I.map((E) => ({ ...E, image: void 0 }));
      Oe(
        w.name + (l.id === "export-html" ? ".html" : ".collision360.json"),
        l.id === "export-html" ? _e(w, b) : et(w, b)
      ), Z(
        "Отчёт подготовлен. Результатов: " + I.length + "; со снимками: " + b.filter((E) => E.image).length + "."
      );
    }
    const g = r.closest("[data-result]");
    g && !r.closest("input") && !window.getSelection()?.toString() && oe(g.dataset.result);
  }), f("content").ondblclick = (s) => {
    const r = s.target, l = r.closest("[data-result]");
    l && !r.closest("input") && P(() => oe(l.dataset.result, !0));
  };
  const T = setInterval(() => {
    m || (j() ? (f("model-count").textContent = "Модели не прочитаны", Z(
      i.checks.length ? "Открыт другой проект. Показаны его проверки; обновите модели." : "Открыт другой проект. Для него ещё нет проверок."
    ), m || U()) : a && !t.isCurrent() && (a = void 0, t.clear(), f("model-count").textContent = "3D-окно изменилось", Z("Активное 3D-окно изменилось. Обновите модели."), m || U()));
  }, 1500);
  return U(), () => {
    clearInterval(T), h = !0, M?.(), x?.terminate(), t.clear();
  };
}
var Se = /* @__PURE__ */ ((e) => (e.object = "object", e.drawing = "drawing", e.table = "table", e.record = "record", e.textStyle = "textstyle", e.textStyleTable = "textstyles", e.linetype = "linetype", e.linetypeTable = "linetypes", e.layer = "layer", e.layerTable = "layers", e.block = "block", e.blockTable = "blocks", e.layout = "layout", e.layoutTable = "layouts", e.type = "type", e.typeTable = "types", e.material = "material", e.materialTable = "materials", e.geometry = "geometry", e.geometryTable = "geometries", e.group = "group", e.groupTable = "groups", e.attachment = "attachment", e.attachmentTable = "attachments", e.entities = "entities", e.entity = "entity", e.line = "l", e.solid = "s", e.insert = "i", e.polyline = "p", e.circle = "c", e.arc = "a", e.polyline3d = "p3", e.proxy = "x", e.text = "t", e.mtext = "mt", e.wipeout = "w", e.model3d = "g", e.alignment = "al", e))(Se || {});
async function ot(e, t) {
  if (await new Promise((u) => requestAnimationFrame(() => u())), t()) throw Error("Подготовка снимков отменена.");
  const { width: n, height: o } = e.camera, i = Array.from(document.querySelectorAll("canvas")).filter(
    (u) => {
      const m = u.getBoundingClientRect();
      return m.width > 100 && m.height > 100 && u.width > 0 && u.height > 0 && getComputedStyle(u).visibility !== "hidden" && (Math.abs(m.width - n) < 4 && Math.abs(m.height - o) < 4 || Math.abs(u.width - n) < 4 && Math.abs(u.height - o) < 4);
    }
  );
  if (!i.length)
    throw Error(
      "Снимок 3D-окна недоступен: откройте одно видимое окно модели."
    );
  const a = i[0].getBoundingClientRect();
  if (i.some((u) => {
    const m = u.getBoundingClientRect();
    return Math.abs(m.x - a.x) > 4 || Math.abs(m.y - a.y) > 4;
  }))
    throw Error(
      "Открыто несколько подходящих 3D-окон. Оставьте одно окно для снимка."
    );
  const c = document.createElement("canvas"), d = Math.min(1, 1280 / i[0].width);
  c.width = Math.round(i[0].width * d), c.height = Math.round(i[0].height * d);
  const p = c.getContext("2d");
  p.fillStyle = "#20242b", p.fillRect(0, 0, c.width, c.height), e.repaint();
  for (const u of i)
    p.drawImage(u, 0, 0, c.width, c.height);
  try {
    return c.toDataURL("image/jpeg", 0.82);
  } catch {
    throw Error("Браузер запретил чтение изображения 3D-окна.");
  }
}
const Me = "nashepo.checks.points", st = "nashepo.checks.highlight";
function $e(e) {
  let t = performance.now();
  return async () => {
    if (e()) throw Error("Операция отменена.");
    performance.now() - t >= 16 && (await new Promise((n) => setTimeout(n, 0)), t = performance.now());
  };
}
function ye(e, t, n, o = 0) {
  if (o > 12 || e == null) return;
  if (typeof e != "object") {
    n[t] = String(e);
    return;
  }
  if (Array.isArray(e)) {
    e.forEach((a, c) => ye(a, `${t}[${c}]`, n, o + 1));
    return;
  }
  const i = e;
  if ("$value" in i) {
    ye(i.$value, t, n, o + 1);
    return;
  }
  for (const [a, c] of Object.entries(i))
    a.startsWith("$") || ye(c, t ? `${t}.${a}` : a, n, o + 1);
}
function Ne(e) {
  const t = e.vertices.length / 3, n = (c) => Number.isFinite(e.vertices[c * 3]) && Number.isFinite(e.vertices[c * 3 + 1]) && Number.isFinite(e.vertices[c * 3 + 2]), o = (c) => {
    const d = e.indices[c], p = e.indices[c + 1], u = e.indices[c + 2];
    return d < t && p < t && u < t && d !== p && p !== u && u !== d && n(d) && n(p) && n(u);
  };
  let i = 0;
  for (let c = 0; c < e.indices.length; c += 3) o(c) && (i += 3);
  if (i === e.indices.length) return e.indices;
  const a = new Uint32Array(i);
  for (let c = 0, d = 0; c < e.indices.length; c += 3)
    o(c) && (a[d++] = e.indices[c], a[d++] = e.indices[c + 1], a[d++] = e.indices[c + 2]);
  return a;
}
class at {
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
  async scan(t, n, o) {
    const i = this.app, a = this.view, c = i?.model;
    if (!a || !c?.layouts || !c.attachments)
      throw Error(
        "Откройте проект Топоматик 360 с IFC или SMDX и сделайте его 3D-окно активным."
      );
    const d = [], p = [], u = [], m = [], h = /* @__PURE__ */ new Map(), x = /* @__PURE__ */ new Set();
    let v = 2166136261;
    const S = $e(
      () => n() || i !== this.app || a !== this.view
    );
    let y = -1 / 0;
    const M = (f) => {
      for (let F = 0; F < f.length; F++)
        v = Math.imul(v ^ f.charCodeAt(F), 16777619);
    }, k = async (f, F, Z) => {
      if (x.has(f)) return;
      x.add(f);
      const P = f.layers.layer0?.modelName || F, G = F;
      d.push({ id: G, name: P });
      const K = !o || o.has(G), j = [];
      K && f.layouts.model?.walk((N) => (N.type === Se.model3d ? j.push(N) : N.type === Se.insert && p.push(`${P}: вставка блока не включена в расчёт.`), !1));
      const A = /* @__PURE__ */ new Map();
      for (const N of j) {
        const $ = JSON.stringify([
          N.layer?.UUID || "",
          N.$id || N.$path
        ]);
        A.set($, [N]);
      }
      let V = 0;
      for (const [N, $] of A) {
        if (n()) throw Error("Чтение моделей отменено.");
        if (i !== this.app || a !== this.view)
          throw Error(
            "Активный проект изменился. Запустите чтение моделей заново."
          );
        const Y = $[0].layer, z = {};
        try {
          if (Y) {
            const X = [];
            let J = Y;
            for (; J && X.length < 64; )
              X.unshift(J), J = J.layer;
            for (const D of X)
              ye(D.typedProperties(), "", z), D.typed?.name && (z.Тип = D.typed.name);
          }
        } catch {
          p.push(`${P} / ${N}: часть свойств недоступна.`);
        }
        const U = z["ifc.id"] || Object.entries(z).find(
          ([X]) => /(^|\.)(globalid|ifcguid|guid)$/i.test(X)
        )?.[1] || "", _ = Y?.name || $[0].$id || "Элемент", ne = JSON.stringify([G, N]);
        Object.assign(z, {
          Модель: P,
          Имя: _,
          GUID: U,
          Объект: Y?.UUID || N
        });
        const H = {
          min: [1 / 0, 1 / 0, 1 / 0],
          max: [-1 / 0, -1 / 0, -1 / 0]
        };
        let ee = !0, ie = !1, te = 0;
        for (const X of $) {
          ee &&= X.isClosed;
          for (const J of Object.values(X.meshes)) {
            const D = J.geometry;
            if (!D || D.indices.length % 3) {
              ie = !0;
              continue;
            }
            ee &&= J.isClosed;
            for (let T = 0; T < D.vertices.length; T += 3) {
              const s = [
                D.vertices[T],
                D.vertices[T + 1],
                D.vertices[T + 2]
              ];
              if (Math3d.mat4.mulv3(s, X.matrix, s), !s.every(Number.isFinite)) {
                ie = !0;
                continue;
              }
              for (let r = 0; r < 3; r++)
                H.min[r] = Math.min(H.min[r], s[r]), H.max[r] = Math.max(H.max[r], s[r]);
              if (M(s.join(",")), T % 6e4 === 0 && (performance.now() - y > 200 && (y = performance.now(), t(
                "Индексирование: " + P + " · " + m.length + " элементов"
              )), await S(), n()))
                throw Error("Чтение моделей отменено.");
            }
            const se = D.vertices.length / 3, he = (T) => Number.isFinite(D.vertices[T * 3]) && Number.isFinite(D.vertices[T * 3 + 1]) && Number.isFinite(D.vertices[T * 3 + 2]);
            for (let T = 0; T < D.indices.length; T += 3) {
              const s = D.indices[T], r = D.indices[T + 1], l = D.indices[T + 2];
              if (v = Math.imul(v ^ s, 16777619), v = Math.imul(v ^ r, 16777619), v = Math.imul(v ^ l, 16777619), s < se && r < se && l < se && s !== r && r !== l && l !== s && he(s) && he(r) && he(l) ? te++ : ie = !0, T % 15e4 === 0 && (await S(), n()))
                throw Error("Чтение моделей отменено.");
            }
          }
        }
        if (ie || !te) {
          if (te || V++, !te) continue;
          ee = !1;
        }
        const oe = {
          id: ne,
          name: _,
          model: P,
          modelId: G,
          guid: U,
          properties: z,
          hidden: Z || !!Y?.resolveHidden() || !!Y?.resolveDisabled(),
          triangles: new Float64Array(0),
          triangleCount: te,
          closed: ee,
          bounds: H
        };
        M(JSON.stringify([ne, z, oe.hidden])), m.push(oe), h.set(ne, $);
      }
      V && p.push(
        `${P}: пропущено элементов без треугольной геометрии — ${V}.`
      );
      const q = [];
      f.attachments.forEach((N) => {
        q.push(N);
      });
      for (const N of q) {
        const $ = `${F}/${N.name || N.uri || N.$id}`;
        N.model ? await k(
          N.model,
          $,
          Z || N.hidden
        ) : (!o || o.has($)) && u.push(
          `${N.name || N.uri || "Подключённая модель"}: модель не загружена. Откройте её перед расчётом.`
        );
      }
    };
    if (await k(c, c.layers.layer0?.modelName || "Проект", !1), !m.length && (!o || o.size > 0))
      throw Error(
        "В открытом проекте не найдены 3D-элементы с доступной геометрией."
      );
    return this.clear(), this.refs = h, this.metadata = new Map(m.map((f) => [f.id, f])), this.scannedApp = i, this.scannedView = a, {
      elements: m,
      fingerprint: `${m.length}:${v >>> 0}`,
      warnings: [...new Set(p)],
      blockers: [...new Set(u)],
      models: d,
      indexedModelIds: d.filter((f) => !o || o.has(f.id)).map((f) => f.id)
    };
  }
  async geometry(t, n) {
    const o = $e(() => n() || !this.isCurrent());
    if (!this.isCurrent()) throw Error("Активная модель изменилась.");
    const i = this.metadata.get(t), a = this.refs.get(t);
    if (!i || !a) throw Error("Элемент отсутствует.");
    const c = a.flatMap(
      (v) => Object.values(v.meshes).flatMap((S) => {
        const y = S.geometry;
        if (!y || y.indices.length % 3) return [];
        const M = Ne(y);
        return M.length ? [{ object: v, g: y, indices: M }] : [];
      })
    );
    let d = 0, p = 0;
    for (const { g: v, indices: S } of c) {
      if (!v) throw Error("Геометрия недоступна.");
      d += v.vertices.length, p += S.length;
    }
    const u = new Float64Array(d), m = new Uint32Array(p);
    let h = 0, x = 0;
    for (const { object: v, g: S, indices: y } of c) {
      if (!S) throw Error("Геометрия недоступна.");
      for (let M = 0; M < S.vertices.length; M += 3) {
        const k = [S.vertices[M], S.vertices[M + 1], S.vertices[M + 2]];
        if (Math3d.mat4.mulv3(k, v.matrix, k), u.set(k, h + M), M % 6e4 === 0 && (await o(), n() || !this.isCurrent()))
          throw Error("Чтение геометрии отменено.");
      }
      for (let M = 0; M < y.length; M++)
        if (m[x + M] = h / 3 + y[M], M % 15e4 === 0 && (await o(), n()))
          throw Error("Чтение геометрии отменено.");
      h += S.vertices.length, x += y.length;
    }
    return { ...i, vertices: u, indices: m };
  }
  selected() {
    if (!this.isCurrent())
      throw Error("Сначала обновите модели текущего проекта.");
    const t = new Set(this.view?.layer.selectedObjects());
    return [...this.refs].filter(([, n]) => n.some((o) => t.has(o))).map(([n]) => n);
  }
  select(t) {
    if (!this.isCurrent())
      throw Error("Сначала обновите модели текущего проекта.");
    const n = new Set(t.flatMap((o) => this.refs.get(o) || []));
    this.view.layer.clearSelected(), this.view.layer.selectObjects((o) => n.has(o), !0), this.view.invalidate();
  }
  clear() {
    if (this.overlay && (this.overlay.view.layer.removeLayer(this.overlay.layer), this.overlay.view.invalidate(), this.overlay = void 0), this.pointView) {
      const t = this.pointView.annotations.get(Me);
      t && this.pointView.annotations.release(t), this.pointView.invalidate(), this.pointView = void 0;
    }
  }
  focus(t, n, o = !0) {
    if (!this.isCurrent())
      throw Error("Обновите модели текущего проекта перед переходом.");
    if (!Number.isFinite(n) || n < 0.5)
      throw Error("Дистанция камеры должна быть не менее 0,5 м.");
    if (!this.refs.has(t.a.id) || !this.refs.has(t.b.id))
      throw Error("Один из элементов отсутствует в загруженных моделях.");
    this.view.layer.clearSelected(), this.highlight([t.a.id, t.b.id]);
    const i = t.point, a = this.view;
    a.camera?.id !== "3d" && a.setCameraType("3d");
    const c = [-0.65, 0.65, -0.394], d = Math.hypot(...c);
    c.forEach((p, u) => c[u] = p / d), a.lookAt(
      i.map((p, u) => p - c[u] * n),
      c,
      [0, 0, 1],
      o,
      i
    );
  }
  highlight(t) {
    this.overlay && (this.overlay.view.layer.removeLayer(this.overlay.layer), this.overlay = void 0);
    const n = this.view, i = t.flatMap(
      (d, p) => (this.refs.get(d) || []).map((u) => ({ obj: u, side: p }))
    ).flatMap(
      ({ obj: d, side: p }) => Object.values(d.meshes).flatMap((u) => {
        const m = u.geometry;
        if (!m || m.indices.length % 3) return [];
        const h = Ne(m);
        if (!h.length) return [];
        const x = p === 0 ? 4281743103 : 4294941995, v = new Uint32Array(h.length * 2);
        v.set(h);
        for (let y = 0; y < h.length; y += 3)
          v[h.length + y] = h[y], v[h.length + y + 1] = h[y + 2], v[h.length + y + 2] = h[y + 1];
        const S = {
          uuid: "nashepo.checks." + p + "." + m.uuid,
          vertices: m.vertices,
          normals: m.normals,
          bounds: m.bounds,
          indices: v,
          colors: new Uint32Array(m.vertices.length / 3).fill(x)
        };
        return [{ obj: d, geometry: S, color: x }];
      })
    ), c = {
      id: st,
      order: 1e4,
      visible: !0,
      paint: () => {
      },
      paint3d: (d, p) => {
        const u = d.color, m = d.rasterizer.material, h = Math3d.mat4.inverse(Math3d.mat4.alloc(), p.view);
        d.rasterizer.material = void 0;
        try {
          for (const { obj: x, geometry: v, color: S } of i) {
            d.color = S, d.pushMatrix();
            try {
              const y = Math3d.mat4.alloc();
              for (let k = 0; k < 16; k++) y[k] = x.matrix[k];
              const M = 2e-4;
              y[12] += h[8] * M, y[13] += h[9] * M, y[14] += h[10] * M, d.multMatrix(y), d.mesh(v);
            } finally {
              d.popMatrix();
            }
          }
        } finally {
          d.color = u, d.rasterizer.material = m;
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
    n.layer.clearSelected(), n.layer.addLayer(c), this.overlay = { view: n, layer: c }, n.invalidate();
  }
  async snapshot(t, n, o, i = !1) {
    if (!this.isCurrent())
      throw Error("Обновите модели перед созданием снимков.");
    if (!this.canLocate(t))
      throw Error("Элементы результата отсутствуют в открытых моделях.");
    return i ? (this.view.layer.clearSelected(), this.highlight([t.a.id, t.b.id])) : this.focus(t, n, !1), ot(this.view, () => o() || !this.isCurrent());
  }
  markers(t, n, o, i) {
    if (!this.isCurrent()) return;
    const a = this.view;
    this.pointView && this.pointView !== a && this.clear();
    const c = a.annotations.get(Me);
    if (c && a.annotations.release(c), this.pointView = a, !o) {
      a.invalidate();
      return;
    }
    const d = a.annotations.create(Me, 1e4), p = t.filter((u) => u.id !== n).concat(t.filter((u) => u.id === n));
    for (const u of p.slice(-3e3)) {
      if (u.state === "resolved") continue;
      const [m, h, x] = u.point, v = u.id === n, S = u.state === "excluded" ? "#78818c" : u.state === "approved" || u.state === "reviewed" ? "#28b94b" : "#e1372d", y = v ? "#f2c94c" : S, M = () => i(u.id), k = [
        { type: "line", a: [m, h, x], b: [m, h, x + 1], color: y, width: 5 },
        {
          type: "polyline",
          points: [
            [m - 0.65, h, x + 1],
            [m + 0.65, h, x + 1],
            [m, h, x + 2.2],
            [m - 0.65, h, x + 1]
          ],
          color: y,
          fillColor: S,
          width: v ? 5 : 2
        },
        {
          type: "line",
          a: [m, h - 0.01, x + 1.85],
          b: [m, h - 0.01, x + 1.4],
          color: "#ffffff",
          width: 4
        },
        {
          type: "line",
          a: [m, h - 0.01, x + 1.22],
          b: [m, h - 0.01, x + 1.27],
          color: "#ffffff",
          width: 4
        }
      ];
      d.add({
        id: u.id,
        type: "shaped",
        shapes: k,
        activeShapes: k,
        activateCommand: M,
        dblCommand: M
      }), v && d.add({
        id: u.id + ":label",
        type: "simple",
        position: [m, h, x + 2.35],
        label: `${u.a.name} × ${u.b.name}`,
        labelBackground: "#f2c94c",
        labelColor: "#171717",
        activateCommand: M
      });
    }
    a.invalidate();
  }
}
let qe;
const rt = {
  open(e) {
    e.manager.revealView("nashepo.collisionfinder360/checks_panel");
  },
  mount(e) {
    const t = e.el;
    if (!t) return;
    qe?.();
    const n = document.createElement("div");
    n.style.height = "100%", t.replaceChildren(n), qe = it(n, new at(e));
  }
};
export {
  rt as default
};
