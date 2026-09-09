const st = `<h2>Работа с проверками</h2>
<details open><summary>1. Первая проверка</summary><ol><li>Откройте проект и подключите IFC/SMDX штатными средствами Топоматик 360.</li><li>Откройте нижнюю вкладку «Проверки» и нажмите «Модели».</li><li>Нажмите «＋ Новая проверка» и задайте ей понятное имя.</li><li>Во вкладке «Выбор» оставьте галочки только у нужных файлов в А и Б. «Все модели» включено по умолчанию.</li><li>Выберите «По пересечению» или «Дублирование» и нажмите «Запустить».</li><li>Во вкладке «Результаты» дважды нажмите строку: камера направится к конфликту, элемент А будет выделен красным, элемент Б — синим, и оба элемента станут выделенными в 3D-окне.</li></ol><p>Первое обновление без созданной проверки получает только список файлов. При запуске индексируются модели, отмеченные хотя бы в одной стороне. Файл проекта WDX служит контейнером и в выбор моделей не попадает.</p></details>
<details><summary>2. Выбор моделей и сохранённые наборы</summary><p>Выбор А и выбор Б задают две стороны сравнения. Снимите «Все модели» и отметьте конкретные IFC/SMDX. Для поиска дубликатов внутри одного файла отметьте его с обеих сторон.</p><p>Часто используемый состав можно сохранить как набор моделей, а затем применить в другой проверке. Наборы входят в файл проверок. Состав выборки задаётся галочками моделей и ручным выделением объектов.</p><p>IFC GUID читается из свойства <code>ifc.id</code>; также поддерживаются GlobalId, IfcGuid и GUID.</p></details>
<details><summary>3. Работа с выделением в 3D</summary><p>Сначала выделите элементы штатными средствами в 3D-окне, затем используйте кнопку в нужной стороне:</p><ul><li><b>Показать выбранные элементы</b> — выделяет весь текущий состав.</li><li><b>Только выделенные в 3D</b> — оставляет только выделенные объекты.</li><li><b>＋ Добавить из 3D</b> — добавляет выделенные объекты к моделям.</li><li><b>− Исключить из 3D</b> — исключает выделенные объекты.</li><li><b>Сбросить ручной выбор</b> — снова использует отмеченные модели.</li></ul><p>Ручные идентификаторы могут измениться после замены IFC/SMDX, поэтому такую выборку следует проверить заново.</p></details>
<details><summary>4. Пересечения, глубина, касания и дубликаты</summary><p><b>Пересечение</b> рассчитывается по фактическим треугольным поверхностям. Габаритные коробки используются только для быстрого поиска близких пар и не участвуют в определении глубины.</p><p><b>Расчётная глубина Hard Clash</b> определяется комбинированно. Для каждой реально пересекающейся пары треугольников рассчитывается локальное перемещение вдоль нормалей обеих граней, достаточное для разведения этой пары; из двух направлений берётся меньшее значение, а по всем контактам — наибольшее. Для замкнутых тел расчёт дополняется расстоянием от точек одной поверхности, оказавшихся внутри другого тела, до его ближайшей поверхности. Поэтому сквозное пересечение поверхностей больше не получает ноль только из-за отсутствия внутренней вершины в выборке.</p><p>Это устойчивая оценка тяжести Hard Clash, соответствующая обычной логике Hard Clash, но не точный глобальный вектор минимального перемещения двух произвольных невыпуклых тел. Значение также не является длиной захода трубы вдоль оси. Объём пересечения не используется вместо глубины: одинаковый объём может требовать совершенно разного перемещения для устранения конфликта.</p><p>Одна пара элементов пока формирует один результат. Точкой коллизии становится контакт с наибольшей локальной глубиной; несколько несвязанных областей одной пары отдельно не группируются, глобальный вектор раздвижения и объём пересечения не выводятся.</p><p>«Точность расчёта» — геометрическая погрешность, а «Минимальная глубина» — пользовательский допуск для исключения небольших конфликтов. Ноль остаётся только у касания, если пользователь явно включил касания. Труба и отвод могут пересекаться в штатном соединении из-за фасеточной аппроксимации круглых поверхностей; такие соединения исключаются правилами. <b>Дублирование</b> ищет совпадающие треугольники в одинаковых мировых координатах.</p></details>
<details><summary>5. Составные объекты и неполная геометрия</summary><p>Один IFC-объект может состоять из нескольких частей. Чтобы не сравнивать его части между собой, включите «Не проверять геометрию одного составного объекта» во вкладке «Правила». Там же можно исключить пары одной модели или одинакового значения свойства.</p><p>Пустые и неполные геометрические части пропускаются, а пригодные части модели продолжают участвовать. Плагин показывает сводное замечание с количеством пропущенных элементов. Незагруженный подключённый файл блокирует расчёт только тогда, когда он входит в выборку.</p></details>
<details><summary>6. Результаты и состояния</summary><p>«Новый» найден впервые, «Активный» найден повторно, «Проверенный» рассмотрен, «Подтверждённый» подтверждён, «Исключённый» исключён из работы. «Исправленный» означает, что пара исчезла при повторном расчёте с теми же правилами; состояние можно изменить вручную.</p><p>В таблице доступны IFC GUID, расчётная глубина, назначение и комментарий. Галочки меняют состояние сразу у нескольких строк. Значения можно выделять и копировать. При переходе стрелками активная строка автоматически прокручивается в видимую область. Состояние «Устарела» у проверки означает, что после последнего расчёта изменили её тип, выборки, параметры или правила.</p></details>
<details><summary>7. Отчёт и снимки</summary><p>После перехода к коллизии отсутствующий снимок создаётся автоматически, если пользователь задержался на результате. Кадр строится от той же камеры приближения, что и снимки отчёта: ракурс задаёт «Дистанция камеры» в настройках. Если дистанцию изменить, отчёт переснимет прежние кадры под новое значение. Быстрое переключение стрелками отменяет лишние снимки. Во время технической перерисовки поверх 3D-окна сохраняется предыдущий кадр, поэтому модель не должна мигать.</p><p>Кнопка «Снимок пары» сохраняет текущий ракурс только с двумя элементами коллизии: элемент А показан красным, элемент Б — синим. Такой кадр собран вручную, поэтому отчёт его не переснимает. На время подготовки отчёта нижняя панель автоматически уменьшается для широкого 3D-кадра и затем возвращается к прежнему размеру. Файл сессии предназначен для открытия результатов в плагине «НашеПО · Коллизии».</p></details>
<details><summary>8. Проекты, сохранение и очистка</summary><p>В пределах открытой страницы каждый проект получает собственный список проверок. Сворачивание или повторное открытие нижней панели сохраняет проверки, результаты и комментарии в текущей вкладке. При переключении проекта данные предыдущего не подмешиваются. «Очистить проект» удаляет проверки, результаты и наборы только у текущего проекта.</p><p>«Сохранить проверки» записывает правила, наборы моделей, результаты, комментарии и снимки в JSON. «Открыть проверки» загружает этот файл. Геометрия в файл не входит: соответствующие модели надо открыть отдельно. После обновления или закрытия страницы для продолжения работы используйте сохранённый файл.</p></details>
<details><summary>9. Большие проекты</summary><p>Жёсткого предела в 6 млн треугольников нет. При запуске строится индекс только по отмеченным моделям. Точная геометрия передаётся в расчёт по мере появления близких пар в компактном индексированном виде.</p><p>Время и память всё равно зависят от состава выборок и числа потенциальных пар. Разделяйте проверки по моделям и системам. В сцене одновременно показывается до 3000 знаков; при 50 000 результатах расчёт останавливается без замены прежнего результата.</p></details>`;
function lt(t) {
  let e = t.parentElement, i;
  for (; e && !i; )
    i = [...e.children].find(
      (u) => u.classList.contains("resizer-horizontal")
    ), e = e.parentElement;
  if (!i) return () => {
  };
  const a = i, s = t.ownerDocument.defaultView;
  let n;
  const o = () => {
    if (n === void 0) return;
    const u = n;
    n = void 0, a.dispatchEvent(
      new MouseEvent("mouseup", { bubbles: !0, composed: !0 })
    ), a.hasPointerCapture(u) && a.releasePointerCapture(u);
  }, d = (u) => {
    u.button === 0 && (n = u.pointerId, a.setPointerCapture(u.pointerId));
  };
  return a.addEventListener("pointerdown", d), a.addEventListener("pointerup", o), a.addEventListener("pointercancel", o), a.addEventListener("lostpointercapture", o), s.addEventListener("blur", o), () => {
    o(), a.removeEventListener("pointerdown", d), a.removeEventListener("pointerup", o), a.removeEventListener("pointercancel", o), a.removeEventListener("lostpointercapture", o), s.removeEventListener("blur", o);
  };
}
const dt = "0.3.7", $e = (t) => typeof t == "string" && /^data:image\/(jpeg|png);base64,[A-Za-z0-9+/=]+$/.test(t), he = {
  new: "Новый",
  active: "Активный",
  reviewed: "Проверенный",
  approved: "Подтверждённый",
  resolved: "Исправленный",
  excluded: "Исключённый"
}, Ye = () => ({
  models: [],
  modelsMode: "all",
  conditions: [],
  mode: "all",
  include: [],
  exclude: []
}), ct = () => ({
  id: crypto.randomUUID(),
  name: "Новая проверка",
  type: "intersection",
  a: Ye(),
  b: Ye(),
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
}), Ze = ({
  triangles: t,
  vertices: e,
  indices: i,
  triangleCount: a,
  closed: s,
  bounds: n,
  ...o
}) => o;
function je(t, e) {
  return e.exclude.includes(t.id) ? !1 : e.include.includes(t.id) ? !0 : !(e.manualOnly || e.modelsMode === "selected" && !e.models.includes(t.modelId) || e.modelsMode === void 0 && e.models.length && !e.models.includes(t.modelId));
}
const pt = (t) => JSON.stringify([
  t.type,
  ...[t.a, t.b].map(
    ({
      models: e,
      modelsMode: i,
      conditions: a,
      mode: s,
      include: n,
      exclude: o,
      manualOnly: d
    }) => ({
      models: e,
      modelsMode: i,
      conditions: a,
      mode: s,
      include: n,
      exclude: o,
      manualOnly: d
    })
  ),
  t.precision,
  t.minPenetration,
  t.touching,
  t.ignoreSameModel,
  t.ignoreSameGroup,
  t.equalProperty,
  t.includeHidden
]), ut = (t, e) => JSON.stringify([t, e].sort());
function mt(t, e, i) {
  const a = new Map(t.map((n) => [n.id, n])), s = e.map((n) => {
    const o = a.get(n.id);
    return a.delete(n.id), {
      ...n,
      note: o?.note ?? "",
      assignee: o?.assignee ?? "",
      firstSeen: o?.firstSeen ?? i,
      lastSeen: i,
      state: !o || o.state === "resolved" ? "new" : o.state === "new" ? "active" : o.state
    };
  });
  for (const n of a.values())
    s.push({
      ...n,
      state: n.state === "excluded" ? "excluded" : "resolved"
    });
  return s;
}
function et(t) {
  const e = JSON.parse(t);
  if (e?.format !== "nashepo.checks" || e.version !== 1 || !Array.isArray(e.checks))
    throw Error("Это не файл проекта проверок НашеПО.");
  const i = /* @__PURE__ */ new Set();
  if (e.sets ??= [], !Array.isArray(e.sets) || !e.sets.every(
    (s) => s && typeof s.id == "string" && typeof s.name == "string" && s.selection && Array.isArray(s.selection.models) && s.selection.models.every((n) => typeof n == "string") && (s.selection.modelsMode === void 0 || ["all", "selected"].includes(s.selection.modelsMode)) && Array.isArray(s.selection.conditions) && s.selection.conditions.every(
      (n) => n && typeof n.field == "string" && typeof n.value == "string" && ["eq", "ne", "contains", "exists", "gt", "lt"].includes(
        n.op
      )
    ) && ["all", "any"].includes(s.selection.mode)
  ))
    throw Error("Некорректные наборы моделей.");
  const a = (s) => /\.wdx(?:[?#].*)?$/i.test(s);
  for (const s of e.sets)
    s.selection.models = s.selection.models.filter(
      (n) => !a(n)
    ), s.selection.conditions = [], s.selection.mode = "all", s.selection.modelsMode ??= s.selection.models.length ? "selected" : "all";
  for (const s of e.checks) {
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
    s.warnings ??= [], s.modelsAtRun = s.modelsAtRun?.filter((n) => !a(n));
    for (const n of [s.a, s.b]) {
      if (!n || n.manualOnly !== void 0 && typeof n.manualOnly != "boolean" || n.modelsMode !== void 0 && !["all", "selected"].includes(n.modelsMode) || n.presetId !== void 0 && typeof n.presetId != "string" || !["all", "any"].includes(n.mode) || ![n.models, n.include, n.exclude].every(
        (o) => Array.isArray(o) && o.every((d) => typeof d == "string")
      ) || !Array.isArray(n.conditions) || !n.conditions.every(
        (o) => o && typeof o.field == "string" && typeof o.value == "string" && ["eq", "ne", "contains", "exists", "gt", "lt"].includes(o.op)
      ))
        throw Error("Некорректная выборка.");
      n.modelsMode ??= n.models.length ? "selected" : "all", n.models = n.models.filter((o) => !a(o)), n.conditions = [], n.mode = "all";
    }
    for (const n of s.results) {
      if (n?.image !== void 0 && !$e(n.image))
        throw Error("Некорректный снимок результата.");
      if (n?.imageScope !== void 0 && n.imageScope !== "pair" && n.imageScope !== "pair-ab")
        throw Error("Некорректный состав снимка результата.");
      if (n?.imageDistance !== void 0 && (!Number.isFinite(n.imageDistance) || n.imageDistance < 0.5))
        throw Error("Некорректная дистанция снимка результата.");
      if (!n || typeof n.id != "string" || !Object.hasOwn(he, n.state) || n.penetrationMm !== void 0 && (!Number.isFinite(n.penetrationMm) || n.penetrationMm < 0) || !Array.isArray(n.point) || n.point.length !== 3 || !n.point.every(Number.isFinite))
        throw Error("Некорректный результат.");
      for (const o of [n.a, n.b])
        if (!o || !["id", "name", "model", "modelId", "guid"].every(
          (d) => typeof o[d] == "string"
        ) || !o.properties || typeof o.properties != "object")
          throw Error("Некорректный элемент результата.");
    }
  }
  return e;
}
const q = (t, e) => [t[0] - e[0], t[1] - e[1], t[2] - e[2]], Se = (t, e, i = 1) => [
  t[0] + e[0] * i,
  t[1] + e[1] * i,
  t[2] + e[2] * i
], X = (t, e) => t[0] * e[0] + t[1] * e[1] + t[2] * e[2], Me = (t, e) => [
  t[1] * e[2] - t[2] * e[1],
  t[2] * e[0] - t[0] * e[2],
  t[0] * e[1] - t[1] * e[0]
], Q = (t) => Math.hypot(...t), ft = (t) => {
  const e = Q(t);
  return e > 1e-20 ? [t[0] / e, t[1] / e, t[2] / e] : void 0;
}, we = (t) => t.triangleCount ?? (t.indices ? t.indices.length / 3 : t.triangles.length / 9), xe = (t, e, i) => t.indices && t.vertices ? t.vertices[t.indices[e * 3 + Math.floor(i / 3)] * 3 + i % 3] : t.triangles[e * 9 + i], ve = (t, e) => [0, 3, 6].map((i) => [
  xe(t, e, i),
  xe(t, e, i + 1),
  xe(t, e, i + 2)
]);
function Le(t) {
  const e = [1 / 0, 1 / 0, 1 / 0], i = [-1 / 0, -1 / 0, -1 / 0];
  for (let a = 0; a < t.length; a++) {
    const s = a % 3;
    e[s] = Math.min(e[s], t[a]), i[s] = Math.max(i[s], t[a]);
  }
  return { min: e, max: i };
}
const Oe = (t, e, i) => t.min.every((a, s) => a <= e.max[s] + i && t.max[s] >= e.min[s] - i);
function Re(t, e) {
  const i = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const d of e)
    for (let u = 0; u < 9; u++) {
      const m = u % 3, f = xe(t, d, u);
      i.min[m] = Math.min(i.min[m], f), i.max[m] = Math.max(i.max[m], f);
    }
  if (e.length <= 12) return { ...i, ids: e };
  const a = i.max.map((d, u) => d - i.min[u]), s = a.indexOf(Math.max(...a)), n = (d) => xe(t, d, s) + xe(t, d, s + 3) + xe(t, d, s + 6);
  e.sort((d, u) => n(d) - n(u));
  const o = e.length >> 1;
  return {
    ...i,
    left: Re(t, e.slice(0, o)),
    right: Re(t, e.slice(o))
  };
}
function* Ee(t, e, i) {
  Oe(t, e, i) && (t.ids ? yield* t.ids : (yield* Ee(t.left, e, i), yield* Ee(t.right, e, i)));
}
function* fe(t, e, i) {
  if (Oe(t, e, i)) {
    if (t.ids && e.ids) {
      for (const a of t.ids) for (const s of e.ids) yield [a, s];
      return;
    }
    if (t.ids) {
      yield* fe(t, e.left, i), yield* fe(t, e.right, i);
      return;
    }
    if (e.ids) {
      yield* fe(t.left, e, i), yield* fe(t.right, e, i);
      return;
    }
    yield* fe(t.left, e.left, i), yield* fe(t.left, e.right, i), yield* fe(t.right, e.left, i), yield* fe(t.right, e.right, i);
  }
}
function Ue(t, e) {
  const i = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const o of e)
    for (let d = 0; d < 3; d++)
      i.min[d] = Math.min(i.min[d], t[o].bounds.min[d]), i.max[d] = Math.max(i.max[d], t[o].bounds.max[d]);
  if (e.length <= 16) return { ...i, ids: e };
  const a = i.max.map((o, d) => o - i.min[d]), s = a.indexOf(Math.max(...a));
  e.sort(
    (o, d) => t[o].bounds.min[s] + t[o].bounds.max[s] - (t[d].bounds.min[s] + t[d].bounds.max[s])
  );
  const n = e.length >> 1;
  return {
    ...i,
    left: Ue(t, e.slice(0, n)),
    right: Ue(t, e.slice(n))
  };
}
function Fe(t, e, i, a) {
  const s = q(e, t), n = q(i[1], i[0]), o = q(i[2], i[0]), d = Me(s, o), u = X(n, d);
  if (Math.abs(u) <= 1e-12 * Q(s) * Q(n) * Q(o)) return;
  const m = 1 / u, f = q(t, i[0]), g = X(f, d) * m, w = Me(f, n), M = X(s, w) * m, j = X(o, w) * m, A = a / Math.max(Q(n), Q(o), a);
  if (g >= -A && M >= -A && g + M <= 1 + A && j >= -A && j <= 1 + A)
    return Se(t, s, Math.max(0, Math.min(1, j)));
}
function ht(t, e, i, a) {
  const s = i.map(Math.abs).indexOf(Math.max(...i.map(Math.abs))), n = [0, 1, 2].filter((u) => u !== s), o = (u, m, f) => (m[n[0]] - u[n[0]]) * (f[n[1]] - u[n[1]]) - (m[n[1]] - u[n[1]]) * (f[n[0]] - u[n[0]]), d = (u, m) => {
    const f = m.map((g, w) => o(g, m[(w + 1) % 3], u));
    return f.every((g) => g >= -a * Q(i)) || f.every((g) => g <= a * Q(i));
  };
  for (const u of t) if (d(u, e)) return u;
  for (const u of e) if (d(u, t)) return u;
  for (let u = 0; u < 3; u++)
    for (let m = 0; m < 3; m++) {
      const f = t[u], g = t[(u + 1) % 3], w = e[m], M = e[(m + 1) % 3], j = q(g, f), A = q(M, w), C = j[n[0]] * A[n[1]] - j[n[1]] * A[n[0]];
      if (Math.abs(C) < 1e-18) continue;
      const S = q(w, f), ie = (S[n[0]] * A[n[1]] - S[n[1]] * A[n[0]]) / C, z = (S[n[0]] * j[n[1]] - S[n[1]] * j[n[0]]) / C;
      if (ie >= 0 && ie <= 1 && z >= 0 && z <= 1) return Se(f, j, ie);
    }
}
function gt(t, e, i, a) {
  const s = Me(q(t[1], t[0]), q(t[2], t[0])), n = Me(q(e[1], e[0]), q(e[2], e[0])), o = Q(s), d = Q(n);
  if (o < 1e-20 || d < 1e-20) return;
  const u = e.map((f) => X(q(f, t[0]), s) / o), m = t.map((f) => X(q(f, e[0]), n) / d);
  if (!(u.every((f) => f > i) || u.every((f) => f < -i) || m.every((f) => f > i) || m.every((f) => f < -i))) {
    if (u.every((f) => Math.abs(f) <= i) && m.every((f) => Math.abs(f) <= i))
      return a ? ht(t, e, s, i) : void 0;
    if (!(!a && (!(Math.min(...u) < -i && Math.max(...u) > i) || !(Math.min(...m) < -i && Math.max(...m) > i))))
      for (let f = 0; f < 3; f++) {
        const g = Fe(t[f], t[(f + 1) % 3], e, i);
        if (g) return g;
        const w = Fe(e[f], e[(f + 1) % 3], t, i);
        if (w) return w;
      }
  }
}
function Qe(t, e) {
  const i = (a, s) => {
    const n = ft(Me(q(a[1], a[0]), q(a[2], a[0])));
    if (!n) return 1 / 0;
    const o = s.map((m) => X(q(m, a[0]), n)), d = Math.min(...o), u = Math.max(...o);
    return d < 0 && u > 0 ? Math.min(-d, u) : 0;
  };
  return Math.min(i(t, e), i(e, t));
}
function xt(t, e, i) {
  const a = q(e[1], e[0]), s = q(e[2], e[0]), n = Me(a, s), o = Q(n);
  if (o < 1e-20 || Math.abs(X(q(t, e[0]), n)) / o > i) return !1;
  const d = q(t, e[0]), u = X(a, a), m = X(a, s), f = X(s, s), g = X(d, a), w = X(d, s), M = u * f - m * m;
  if (Math.abs(M) < 1e-30) return !1;
  const j = (g * f - w * m) / M, A = (w * u - g * m) / M, C = i / Math.max(Q(a), Q(s), i);
  return j >= -C && A >= -C && j + A <= 1 + C;
}
function Ae(t, e, i, a) {
  if (!e.closed || t.some((g, w) => g <= e.bounds.min[w] + a || g >= e.bounds.max[w] - a))
    return !1;
  for (const g of Ee(i, { min: t, max: t }, a))
    if (xt(t, ve(e, g), a)) return !1;
  const s = [1, 0.371390676, 0.52999894], n = Q(q(e.bounds.max, e.bounds.min)) * 3 + 1, o = Se(t, s, n), d = [], u = Le([...t, ...o]);
  for (const g of Ee(i, u, a)) {
    const w = Fe(t, o, ve(e, g), a);
    if (w) {
      const M = Q(q(w, t));
      M > a && d.push(M);
    }
  }
  d.sort((g, w) => g - w);
  let m = 0, f = -1 / 0;
  for (const g of d)
    g - f > a * 2 && (m++, f = g);
  return m % 2 === 1;
}
function ze(t, e) {
  return Math.hypot(
    ...t.map((i, a) => Math.max(e.min[a] - i, 0, i - e.max[a]))
  );
}
function bt(t, e) {
  const i = q(e[1], e[0]), a = q(e[2], e[0]), s = q(t, e[0]), n = X(i, s), o = X(a, s);
  if (n <= 0 && o <= 0) return Q(s);
  const d = q(t, e[1]), u = X(i, d), m = X(a, d);
  if (u >= 0 && m <= u) return Q(d);
  if (n * m - u * o <= 0 && n >= 0 && u <= 0) {
    const S = n / (n - u);
    return Q(q(t, Se(e[0], i, S)));
  }
  const g = q(t, e[2]), w = X(i, g), M = X(a, g);
  if (M >= 0 && w <= M) return Q(g);
  if (w * o - n * M <= 0 && o >= 0 && M <= 0) {
    const S = o / (o - M);
    return Q(q(t, Se(e[0], a, S)));
  }
  if (u * M - w * m <= 0 && m - u >= 0 && w - M >= 0) {
    const S = q(e[2], e[1]), ie = (m - u) / (m - u + (w - M));
    return Q(q(t, Se(e[1], S, ie)));
  }
  const C = Me(i, a);
  return Math.abs(X(s, C)) / Math.max(Q(C), 1e-30);
}
function yt(t, e, i) {
  let a = 1 / 0;
  const s = (n) => {
    if (ze(t, n) >= a) return;
    if (n.ids) {
      for (const u of n.ids)
        a = Math.min(a, bt(t, ve(e, u)));
      return;
    }
    const o = n.left, d = n.right;
    ze(t, o) < ze(t, d) ? (s(o), s(d)) : (s(d), s(o));
  };
  return s(i), a;
}
async function wt(t, e, i, a, s, n, o, d) {
  let u = n;
  const m = (g, w, M) => {
    Ae(g, w, M, o) && (u = Math.max(u, yt(g, w, M)));
  };
  m(s, t, i), m(s, e, a);
  let f = 0;
  for (const [g, w, M] of [
    [t, e, a],
    [e, t, i]
  ]) {
    const j = we(g), A = Math.max(1, Math.floor(j / 1024));
    for (let C = 0; C < j; C += A) {
      const S = ve(g, C), ie = S[0].map((h, B) => (S[0][B] + S[1][B] + S[2][B]) / 3), z = S[0].map((h, B) => (S[0][B] + S[1][B]) / 2), Y = S[0].map((h, B) => (S[1][B] + S[2][B]) / 2), R = S[0].map((h, B) => (S[2][B] + S[0][B]) / 2);
      for (const h of [S[0], S[1], S[2], z, Y, R, ie])
        m(h, w, M);
      f++ % 32 === 0 && await d();
    }
  }
  return u >= o ? u * 1e3 : 0;
}
async function vt(t, e, i, a, s) {
  const n = e.precision / 1e3;
  if (!Number.isFinite(n) || n <= 0)
    throw Error("Точность расчёта должна быть положительным числом.");
  const o = t.filter((k) => e.includeHidden || !k.hidden), d = o.filter((k) => je(k, e.a)), u = o.filter((k) => je(k, e.b));
  if (!d.length || !u.length)
    throw Error(
      "Выборка А или Б не содержит элементов. Отметьте хотя бы одну модель в каждой стороне проверки."
    );
  let m = performance.now();
  const f = async () => {
    if (a())
      throw Error("Расчёт отменён. Предыдущие результаты сохранены.");
    performance.now() - m > 16 && (await new Promise((k) => setTimeout(k, 0)), m = performance.now());
  }, g = /* @__PURE__ */ new Map(), w = (k) => {
    let $ = g.get(k.id);
    return $ || ($ = Re(
      k,
      Array.from({ length: we(k) }, (Z, G) => G)
    ), g.set(k.id, $)), $;
  }, M = /* @__PURE__ */ new Map(), j = async (k) => {
    let $ = M.get(k.id);
    if ($ !== void 0) return $;
    const Z = [];
    for (let G = 0; G < we(k); G++)
      Z.push(
        [0, 3, 6].map(
          (ue) => [0, 1, 2].map((D) => Math.round(xe(k, G, ue + D) / n)).join(",")
        ).sort().join(";")
      ), G % 9e3 === 0 && await f();
    return $ = Z.sort().join("|"), M.set(k.id, $), $;
  }, A = [], C = new Set(d.map((k) => k.id)), S = new Set(u.map((k) => k.id)), ie = Ue(
    u,
    u.map((k, $) => $)
  ), z = /* @__PURE__ */ new Map();
  let Y = 0;
  const R = (k) => k.triangles.byteLength + (k.vertices?.byteLength || 0) + (k.indices?.byteLength || 0) + we(k) * 32;
  async function h(k, $) {
    if (!s) return k;
    let Z = z.get(k.id);
    if (Z)
      return z.delete(k.id), z.set(k.id, Z), Z;
    for (const [G, ue] of z)
      G !== $ && Y > 96 * 1024 * 1024 && (z.delete(G), Y -= R(ue), g.delete(G), M.delete(G));
    return Z = await s(k.id), z.set(k.id, Z), Y += R(Z), Z;
  }
  let B = -1 / 0;
  for (let k = 0; k < d.length; k++) {
    const $ = d[k];
    performance.now() - B > 150 && (B = performance.now(), i({
      phase: "Проверка пар",
      done: k,
      total: d.length,
      found: A.length
    }));
    const Z = [...Ee(ie, $.bounds, n)];
    for (let G = 0; G < Z.length; G++) {
      const ue = Z[G];
      performance.now() - B > 150 && (B = performance.now(), i({
        phase: `Проверка пар · A ${k + 1}/${d.length} · кандидаты ${G + 1}/${Z.length}`,
        done: k,
        total: d.length,
        found: A.length
      }));
      const D = u[ue];
      if (await f(), $.id === D.id || !Oe($.bounds, D.bounds, n) || e.ignoreSameModel && $.modelId === D.modelId || e.ignoreSameGroup && $.modelId === D.modelId && $.properties.Объект && $.properties.Объект === D.properties.Объект || e.equalProperty && $.properties[e.equalProperty] !== void 0 && $.properties[e.equalProperty] === D.properties[e.equalProperty] || $.id > D.id && C.has(D.id) && S.has($.id)) continue;
      const ge = ut($.id, D.id), E = await h($), P = await h(D, $.id);
      let U, V = "surface", J = 0;
      if (e.type === "duplicates") {
        if (we(E) !== we(P) || E.bounds.min.some(
          (T, N) => Math.abs(T - P.bounds.min[N]) > n || Math.abs(E.bounds.max[N] - P.bounds.max[N]) > n
        ))
          continue;
        await j(E) === await j(P) && (U = E.bounds.min.map((T, N) => (T + E.bounds.max[N]) / 2), V = "duplicate");
      } else {
        const T = w(E), N = w(P);
        let ee = 0, pe = 0;
        for (const [re, de] of fe(T, N, n)) {
          const se = ve(E, re), ne = ve(P, de);
          if (!Oe(Le(se.flat()), Le(ne.flat()), n)) continue;
          const le = gt(se, ne, n, e.touching);
          if (le) {
            const me = e.touching ? Qe(se, ne) : Math.max(Qe(se, ne), n);
            (!U || me > ee) && (U = le), ee = Math.max(ee, me);
          }
          ++pe % 256 === 0 && (performance.now() - B > 150 && (B = performance.now(), i({
            phase: `Геометрия пары · A ${k + 1}/${d.length}`,
            done: k,
            total: d.length,
            found: A.length
          })), await f());
        }
        if (!U && E.closed && P.closed) {
          const re = E.bounds.min.map(
            (de, se) => (de + E.bounds.max[se]) / 2
          );
          Ae(re, E, T, n) && Ae(re, P, N, n) && (U = re, V = "contained");
        }
        if (!U) {
          for (const [re, de, se] of [
            [E, P, N],
            [P, E, T]
          ])
            if (de.closed) {
              for (let ne = 0; ne < we(re) && !U; ne++) {
                const le = ve(re, ne), me = le[0].map(
                  (K, oe) => (le[0][oe] + le[1][oe] + le[2][oe]) / 3
                );
                for (const K of [le[0], me])
                  if (Ae(K, de, se, n)) {
                    U = K, V = "contained";
                    break;
                  }
                await f();
              }
              if (U) break;
            }
        }
        if (U && (J = await wt(
          E,
          P,
          T,
          N,
          U,
          ee,
          n,
          f
        )), U && J + e.precision < e.minPenetration)
          continue;
      }
      if (U && (A.push({
        id: ge,
        a: Ze(E),
        b: Ze(P),
        point: U,
        kind: V,
        state: "new",
        note: "",
        assignee: "",
        firstSeen: "",
        lastSeen: "",
        penetrationMm: J
      }), A.length >= 5e4))
        throw Error(
          "Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат."
        );
    }
  }
  return i({
    phase: "Готово",
    done: d.length,
    total: d.length,
    found: A.length
  }), A;
}
const tt = '(function(){"use strict";const dt=({triangles:n,vertices:t,indices:i,triangleCount:o,closed:a,bounds:e,...c})=>c;function lt(n,t){return t.exclude.includes(n.id)?!1:t.include.includes(n.id)?!0:!(t.manualOnly||t.modelsMode==="selected"&&!t.models.includes(n.modelId)||t.modelsMode===void 0&&t.models.length&&!t.models.includes(n.modelId))}const mt=(n,t)=>JSON.stringify([n,t].sort()),h=(n,t)=>[n[0]-t[0],n[1]-t[1],n[2]-t[2]],B=(n,t,i=1)=>[n[0]+t[0]*i,n[1]+t[1]*i,n[2]+t[2]*i],p=(n,t)=>n[0]*t[0]+n[1]*t[1]+n[2]*t[2],H=(n,t)=>[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]],w=n=>Math.hypot(...n),ht=n=>{const t=w(n);return t>1e-20?[n[0]/t,n[1]/t,n[2]/t]:void 0},J=n=>n.triangleCount??(n.indices?n.indices.length/3:n.triangles.length/9),A=(n,t,i)=>n.indices&&n.vertices?n.vertices[n.indices[t*3+Math.floor(i/3)]*3+i%3]:n.triangles[t*9+i],K=(n,t)=>[0,3,6].map(i=>[A(n,t,i),A(n,t,i+1),A(n,t,i+2)]);function nt(n){const t=[1/0,1/0,1/0],i=[-1/0,-1/0,-1/0];for(let o=0;o<n.length;o++){const a=o%3;t[a]=Math.min(t[a],n[o]),i[a]=Math.max(i[a],n[o])}return{min:t,max:i}}const W=(n,t,i)=>n.min.every((o,a)=>o<=t.max[a]+i&&n.max[a]>=t.min[a]-i);function it(n,t){const i={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const s of t)for(let r=0;r<9;r++){const d=r%3,f=A(n,s,r);i.min[d]=Math.min(i.min[d],f),i.max[d]=Math.max(i.max[d],f)}if(t.length<=12)return{...i,ids:t};const o=i.max.map((s,r)=>s-i.min[r]),a=o.indexOf(Math.max(...o)),e=s=>A(n,s,a)+A(n,s,a+3)+A(n,s,a+6);t.sort((s,r)=>e(s)-e(r));const c=t.length>>1;return{...i,left:it(n,t.slice(0,c)),right:it(n,t.slice(c))}}function*R(n,t,i){W(n,t,i)&&(n.ids?yield*n.ids:(yield*R(n.left,t,i),yield*R(n.right,t,i)))}function*$(n,t,i){if(W(n,t,i)){if(n.ids&&t.ids){for(const o of n.ids)for(const a of t.ids)yield[o,a];return}if(n.ids){yield*$(n,t.left,i),yield*$(n,t.right,i);return}if(t.ids){yield*$(n.left,t,i),yield*$(n.right,t,i);return}yield*$(n.left,t.left,i),yield*$(n.left,t.right,i),yield*$(n.right,t.left,i),yield*$(n.right,t.right,i)}}function et(n,t){const i={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const c of t)for(let s=0;s<3;s++)i.min[s]=Math.min(i.min[s],n[c].bounds.min[s]),i.max[s]=Math.max(i.max[s],n[c].bounds.max[s]);if(t.length<=16)return{...i,ids:t};const o=i.max.map((c,s)=>c-i.min[s]),a=o.indexOf(Math.max(...o));t.sort((c,s)=>n[c].bounds.min[a]+n[c].bounds.max[a]-(n[s].bounds.min[a]+n[s].bounds.max[a]));const e=t.length>>1;return{...i,left:et(n,t.slice(0,e)),right:et(n,t.slice(e))}}function ot(n,t,i,o){const a=h(t,n),e=h(i[1],i[0]),c=h(i[2],i[0]),s=H(a,c),r=p(e,s);if(Math.abs(r)<=1e-12*w(a)*w(e)*w(c))return;const d=1/r,f=h(n,i[0]),u=p(f,s)*d,m=H(f,e),g=p(a,m)*d,v=p(c,m)*d,x=o/Math.max(w(e),w(c),o);if(u>=-x&&g>=-x&&u+g<=1+x&&v>=-x&&v<=1+x)return B(n,a,Math.max(0,Math.min(1,v)))}function gt(n,t,i,o){const a=i.map(Math.abs).indexOf(Math.max(...i.map(Math.abs))),e=[0,1,2].filter(r=>r!==a),c=(r,d,f)=>(d[e[0]]-r[e[0]])*(f[e[1]]-r[e[1]])-(d[e[1]]-r[e[1]])*(f[e[0]]-r[e[0]]),s=(r,d)=>{const f=d.map((u,m)=>c(u,d[(m+1)%3],r));return f.every(u=>u>=-o*w(i))||f.every(u=>u<=o*w(i))};for(const r of n)if(s(r,t))return r;for(const r of t)if(s(r,n))return r;for(let r=0;r<3;r++)for(let d=0;d<3;d++){const f=n[r],u=n[(r+1)%3],m=t[d],g=t[(d+1)%3],v=h(u,f),x=h(g,m),b=v[e[0]]*x[e[1]]-v[e[1]]*x[e[0]];if(Math.abs(b)<1e-18)continue;const y=h(m,f),D=(y[e[0]]*x[e[1]]-y[e[1]]*x[e[0]])/b,O=(y[e[0]]*v[e[1]]-y[e[1]]*v[e[0]])/b;if(D>=0&&D<=1&&O>=0&&O<=1)return B(f,v,D)}}function yt(n,t,i,o){const a=H(h(n[1],n[0]),h(n[2],n[0])),e=H(h(t[1],t[0]),h(t[2],t[0])),c=w(a),s=w(e);if(c<1e-20||s<1e-20)return;const r=t.map(f=>p(h(f,n[0]),a)/c),d=n.map(f=>p(h(f,t[0]),e)/s);if(!(r.every(f=>f>i)||r.every(f=>f<-i)||d.every(f=>f>i)||d.every(f=>f<-i))){if(r.every(f=>Math.abs(f)<=i)&&d.every(f=>Math.abs(f)<=i))return o?gt(n,t,a,i):void 0;if(!(!o&&(!(Math.min(...r)<-i&&Math.max(...r)>i)||!(Math.min(...d)<-i&&Math.max(...d)>i))))for(let f=0;f<3;f++){const u=ot(n[f],n[(f+1)%3],t,i);if(u)return u;const m=ot(t[f],t[(f+1)%3],n,i);if(m)return m}}}function ut(n,t){const i=(o,a)=>{const e=ht(H(h(o[1],o[0]),h(o[2],o[0])));if(!e)return 1/0;const c=a.map(d=>p(h(d,o[0]),e)),s=Math.min(...c),r=Math.max(...c);return s<0&&r>0?Math.min(-s,r):0};return Math.min(i(n,t),i(t,n))}function Mt(n,t,i){const o=h(t[1],t[0]),a=h(t[2],t[0]),e=H(o,a),c=w(e);if(c<1e-20||Math.abs(p(h(n,t[0]),e))/c>i)return!1;const s=h(n,t[0]),r=p(o,o),d=p(o,a),f=p(a,a),u=p(s,o),m=p(s,a),g=r*f-d*d;if(Math.abs(g)<1e-30)return!1;const v=(u*f-m*d)/g,x=(m*r-u*d)/g,b=i/Math.max(w(o),w(a),i);return v>=-b&&x>=-b&&v+x<=1+b}function X(n,t,i,o){if(!t.closed||n.some((u,m)=>u<=t.bounds.min[m]+o||u>=t.bounds.max[m]-o))return!1;for(const u of R(i,{min:n,max:n},o))if(Mt(n,K(t,u),o))return!1;const a=[1,.371390676,.52999894],e=w(h(t.bounds.max,t.bounds.min))*3+1,c=B(n,a,e),s=[],r=nt([...n,...c]);for(const u of R(i,r,o)){const m=ot(n,c,K(t,u),o);if(m){const g=w(h(m,n));g>o&&s.push(g)}}s.sort((u,m)=>u-m);let d=0,f=-1/0;for(const u of s)u-f>o*2&&(d++,f=u);return d%2===1}function rt(n,t){return Math.hypot(...n.map((i,o)=>Math.max(t.min[o]-i,0,i-t.max[o])))}function xt(n,t){const i=h(t[1],t[0]),o=h(t[2],t[0]),a=h(n,t[0]),e=p(i,a),c=p(o,a);if(e<=0&&c<=0)return w(a);const s=h(n,t[1]),r=p(i,s),d=p(o,s);if(r>=0&&d<=r)return w(s);if(e*d-r*c<=0&&e>=0&&r<=0){const y=e/(e-r);return w(h(n,B(t[0],i,y)))}const u=h(n,t[2]),m=p(i,u),g=p(o,u);if(g>=0&&m<=g)return w(u);if(m*c-e*g<=0&&c>=0&&g<=0){const y=c/(c-g);return w(h(n,B(t[0],o,y)))}if(r*g-m*d<=0&&d-r>=0&&m-g>=0){const y=h(t[2],t[1]),D=(d-r)/(d-r+(m-g));return w(h(n,B(t[1],y,D)))}const b=H(i,o);return Math.abs(p(a,b))/Math.max(w(b),1e-30)}function wt(n,t,i){let o=1/0;const a=e=>{if(rt(n,e)>=o)return;if(e.ids){for(const r of e.ids)o=Math.min(o,xt(n,K(t,r)));return}const c=e.left,s=e.right;rt(n,c)<rt(n,s)?(a(c),a(s)):(a(s),a(c))};return a(i),o}async function pt(n,t,i,o,a,e,c,s){let r=e;const d=(u,m,g)=>{X(u,m,g,c)&&(r=Math.max(r,wt(u,m,g)))};d(a,n,i),d(a,t,o);let f=0;for(const[u,m,g]of[[n,t,o],[t,n,i]]){const v=J(u),x=Math.max(1,Math.floor(v/1024));for(let b=0;b<v;b+=x){const y=K(u,b),D=y[0].map((C,I)=>(y[0][I]+y[1][I]+y[2][I])/3),O=y[0].map((C,I)=>(y[0][I]+y[1][I])/2),U=y[0].map((C,I)=>(y[1][I]+y[2][I])/2),Y=y[0].map((C,I)=>(y[2][I]+y[0][I])/2);for(const C of[y[0],y[1],y[2],O,U,Y,D])d(C,m,g);f++%32===0&&await s()}}return r>=c?r*1e3:0}async function vt(n,t,i,o,a){const e=t.precision/1e3;if(!Number.isFinite(e)||e<=0)throw Error("Точность расчёта должна быть положительным числом.");const c=n.filter(l=>t.includeHidden||!l.hidden),s=c.filter(l=>lt(l,t.a)),r=c.filter(l=>lt(l,t.b));if(!s.length||!r.length)throw Error("Выборка А или Б не содержит элементов. Отметьте хотя бы одну модель в каждой стороне проверки.");let d=performance.now();const f=async()=>{if(o())throw Error("Расчёт отменён. Предыдущие результаты сохранены.");performance.now()-d>16&&(await new Promise(l=>setTimeout(l,0)),d=performance.now())},u=new Map,m=l=>{let M=u.get(l.id);return M||(M=it(l,Array.from({length:J(l)},(q,_)=>_)),u.set(l.id,M)),M},g=new Map,v=async l=>{let M=g.get(l.id);if(M!==void 0)return M;const q=[];for(let _=0;_<J(l);_++)q.push([0,3,6].map(V=>[0,1,2].map(E=>Math.round(A(l,_,V+E)/e)).join(",")).sort().join(";")),_%9e3===0&&await f();return M=q.sort().join("|"),g.set(l.id,M),M},x=[],b=new Set(s.map(l=>l.id)),y=new Set(r.map(l=>l.id)),D=et(r,r.map((l,M)=>M)),O=new Map;let U=0;const Y=l=>l.triangles.byteLength+(l.vertices?.byteLength||0)+(l.indices?.byteLength||0)+J(l)*32;async function C(l,M){if(!a)return l;let q=O.get(l.id);if(q)return O.delete(l.id),O.set(l.id,q),q;for(const[_,V]of O)_!==M&&U>96*1024*1024&&(O.delete(_),U-=Y(V),u.delete(_),g.delete(_));return q=await a(l.id),O.set(l.id,q),U+=Y(q),q}let I=-1/0;for(let l=0;l<s.length;l++){const M=s[l];performance.now()-I>150&&(I=performance.now(),i({phase:"Проверка пар",done:l,total:s.length,found:x.length}));const q=[...R(D,M.bounds,e)];for(let _=0;_<q.length;_++){const V=q[_];performance.now()-I>150&&(I=performance.now(),i({phase:`Проверка пар · A ${l+1}/${s.length} · кандидаты ${_+1}/${q.length}`,done:l,total:s.length,found:x.length}));const E=r[V];if(await f(),M.id===E.id||!W(M.bounds,E.bounds,e)||t.ignoreSameModel&&M.modelId===E.modelId||t.ignoreSameGroup&&M.modelId===E.modelId&&M.properties.Объект&&M.properties.Объект===E.properties.Объект||t.equalProperty&&M.properties[t.equalProperty]!==void 0&&M.properties[t.equalProperty]===E.properties[t.equalProperty]||M.id>E.id&&b.has(E.id)&&y.has(M.id))continue;const bt=mt(M.id,E.id),P=await C(M),j=await C(E,M.id);let S,Z="surface",at=0;if(t.type==="duplicates"){if(J(P)!==J(j)||P.bounds.min.some((L,T)=>Math.abs(L-j.bounds.min[T])>e||Math.abs(P.bounds.max[T]-j.bounds.max[T])>e))continue;await v(P)===await v(j)&&(S=P.bounds.min.map((L,T)=>(L+P.bounds.max[T])/2),Z="duplicate")}else{const L=m(P),T=m(j);let k=0,_t=0;for(const[N,Q]of $(L,T,e)){const z=K(P,N),F=K(j,Q);if(!W(nt(z.flat()),nt(F.flat()),e))continue;const G=yt(z,F,e,t.touching);if(G){const tt=t.touching?ut(z,F):Math.max(ut(z,F),e);(!S||tt>k)&&(S=G),k=Math.max(k,tt)}++_t%256===0&&(performance.now()-I>150&&(I=performance.now(),i({phase:`Геометрия пары · A ${l+1}/${s.length}`,done:l,total:s.length,found:x.length})),await f())}if(!S&&P.closed&&j.closed){const N=P.bounds.min.map((Q,z)=>(Q+P.bounds.max[z])/2);X(N,P,L,e)&&X(N,j,T,e)&&(S=N,Z="contained")}if(!S){for(const[N,Q,z]of[[P,j,T],[j,P,L]])if(Q.closed){for(let F=0;F<J(N)&&!S;F++){const G=K(N,F),tt=G[0].map((ft,ct)=>(G[0][ct]+G[1][ct]+G[2][ct])/3);for(const ft of[G[0],tt])if(X(ft,Q,z,e)){S=ft,Z="contained";break}await f()}if(S)break}}if(S&&(at=await pt(P,j,L,T,S,k,e,f)),S&&at+t.precision<t.minPenetration)continue}if(S&&(x.push({id:bt,a:dt(P),b:dt(j),point:S,kind:Z,state:"new",note:"",assignee:"",firstSeen:"",lastSeen:"",penetrationMm:at}),x.length>=5e4))throw Error("Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат.")}}return i({phase:"Готово",done:s.length,total:s.length,found:x.length}),x}let It=0;const st=new Map;self.onmessage=async n=>{if(n.data.request!==void 0){const t=st.get(n.data.request);st.delete(n.data.request),n.data.error?t?.reject(Error(n.data.error)):t?.resolve(n.data.geometry);return}try{const{elements:t,check:i}=n.data,o=await vt(t,i,a=>self.postMessage({progress:a}),()=>!1,n.data.streaming?a=>new Promise((e,c)=>{const s=It++;st.set(s,{resolve:e,reject:c}),self.postMessage({load:a,request:s})}):void 0);self.postMessage({results:o})}catch(t){self.postMessage({error:t instanceof Error?t.message:String(t)})}}})();\n', Ve = typeof self < "u" && self.Blob && new Blob(["(self.URL || self.webkitURL).revokeObjectURL(self.location.href);", tt], { type: "text/javascript;charset=utf-8" });
function Mt(t) {
  let e;
  try {
    if (e = Ve && (self.URL || self.webkitURL).createObjectURL(Ve), !e) throw "";
    const i = new Worker(e, {
      name: t?.name
    });
    return i.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(e);
    }), i;
  } catch {
    return new Worker(
      "data:text/javascript;charset=utf-8," + encodeURIComponent(tt),
      {
        name: t?.name
      }
    );
  }
}
const H = (t) => String(t ?? "").replace(
  /[&<>"']/g,
  (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[e]
);
function Te(t, e) {
  const i = URL.createObjectURL(
    new Blob([e], {
      type: t.endsWith(".html") ? "text/html;charset=utf-8" : "application/json;charset=utf-8"
    })
  ), a = document.createElement("a");
  a.href = i, a.download = t, a.click(), setTimeout(() => URL.revokeObjectURL(i), 6e4);
}
function kt(t, e) {
  const i = H;
  return `<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${i(t.name)}</title><style>body{font:14px/1.5 system-ui;margin:24px;background:#171c23;color:#e6edf5}h1{margin:0}small{color:#a9b7c8}input,select{padding:10px;margin:15px 8px 15px 0;max-width:100%;background:#242e3b;color:inherit;border:1px solid #506074;border-radius:6px}.wrap{overflow:auto}table{border-collapse:separate;border-spacing:0;width:100%}td,th{padding:10px;border-bottom:1px solid #39475a;min-width:100px;vertical-align:top;overflow-wrap:anywhere}th{background:#253142;position:sticky;top:0;text-align:left;white-space:normal}td{max-width:350px}tr[hidden]{display:none}.shot{display:block;width:260px;border:0;background:transparent;padding:0;cursor:zoom-in}dialog{width:min(94vw,1400px);border:1px solid #506074;background:#20242b;color:white;border-radius:10px}dialog img{max-width:100%;max-height:80vh;display:block;margin:12px auto}dialog::backdrop{background:#000b}.shot img{width:100%;border-radius:6px}.legend{margin:12px 0}.red{color:#ff6161}.blue{color:#65baff}@media print{input,select{display:none}body{background:white;color:black}.wrap{overflow:visible}th{position:static;background:#eee}}</style><h1>${i(t.name)}</h1><small>НашеПО · Проверки коллизий · ${i(t.lastRun || "")} · ${t.status === "stale" ? "Результат устарел" : "Последний завершённый расчёт"}</small><p>${i(t.type === "duplicates" ? "Совпадение треугольной геометрии" : "Пересечения поверхностей и вложенность замкнутых тел")}. Точность: ${i(t.precision)} мм${t.type === "intersection" ? `; минимальная глубина: ${i(t.minPenetration)} мм` : ""}. Глубина Hard Clash — максимальная локальная глубина по реально пересекающимся парам треугольников, дополненная расстоянием до ближайшей поверхности при вложении замкнутых тел. Габаритные коробки в расчёте глубины не используются.</p><p class="legend"><span class="red">● Элемент А выделен красным</span> · <span class="blue">● элемент Б — синим</span></p><input id="search" type="search" placeholder="Поиск по всему отчёту"><select id="state"><option value="">Все состояния</option>${Object.entries(
    he
  ).map(([a, s]) => `<option value="${a}">${s}</option>`).join(
    ""
  )}</select>${t.type === "intersection" ? '<input id="depth" type="number" min="0" step="1" placeholder="Глубина от, мм">' : ""}<span id="count"></span><div class="wrap"><table><thead><tr>${["Снимок", "№", "Состояние", "Глубина, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "X", "Y", "Z", "Назначение", "Комментарий"].map((a) => `<th>${a}</th>`).join("")}</tr></thead><tbody>${e.map((a, s) => `<tr data-state="${a.state}" data-depth="${a.penetrationMm ?? 0}"><td>${$e(a.image) ? `<button class="shot" type="button"><img src="${a.image}" alt="Снимок конфликта ${s + 1}" loading="lazy"></button>` : "Снимок отсутствует"}</td>${[s + 1, he[a.state], t.type === "duplicates" ? "—" : (a.penetrationMm ?? 0).toFixed(1), a.a.name, a.a.model, a.a.guid, a.b.name, a.b.model, a.b.guid, ...a.point.map((n) => n.toFixed(4)), a.assignee, a.note].map((n) => `<td>${i(n)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><dialog id="picture"><button id="close-picture">Закрыть</button><img id="full-picture" alt="Снимок конфликта"></dialog><script>const modal=document.getElementById("picture");document.getElementById("close-picture").onclick=()=>modal.close();for(const b of document.querySelectorAll(".shot"))b.onclick=()=>{document.getElementById("full-picture").src=b.querySelector("img").src;modal.showModal()};const q=document.getElementById('search'),s=document.getElementById('state'),d=document.getElementById('depth'),rows=[...document.querySelectorAll('tbody tr')];function filter(){let n=0;for(const r of rows){r.hidden=!!((s.value&&r.dataset.state!==s.value)||(d&&Number(r.dataset.depth)<Number(d.value||0))||!r.textContent.toLowerCase().includes(q.value.toLowerCase()));if(!r.hidden)n++}document.getElementById('count').textContent='Коллизий: '+n}q.oninput=s.onchange=filter;if(d)d.oninput=filter;filter()<\/script></html>`;
}
function St(t, e) {
  return JSON.stringify(
    {
      version: 1,
      id: t.id,
      name: t.name,
      images: Object.fromEntries(
        e.filter((i) => $e(i.image)).map((i) => [i.id + ".jpg", i.image])
      ),
      warnings: t.warnings,
      tests: [
        {
          id: t.id,
          name: t.name,
          clashes: e.map((i, a) => ({
            id: i.id,
            name: `Конфликт ${a + 1}`,
            distance: t.type === "duplicates" ? "" : `${(i.penetrationMm ?? 0).toFixed(1)} мм`,
            date: t.lastRun || "",
            description: t.type === "duplicates" ? "Дублирование" : "По пересечению",
            status: he[i.state],
            group: i.assignee,
            note: i.note,
            point: i.point,
            image: $e(i.image) ? i.id + ".jpg" : "",
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
const It = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAydpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAzIDc5Ljk2OTBhODdmYywgMjAyNS8wMy8wNi0yMDo1MDoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDZFQkU2NEQ4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDZFQkU2NEM4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI2LjExIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRENDVBNjQzODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRENDVBNjQ0ODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+pHX+ogAAD+lJREFUeNrsnXtwVPUVx2/CZvMgQEhCSAwJJDzDqwgodCq08hAr7wpSo1M6o/5Rq6NUcdqp1XamdjqOY6mvWhWnttZpRRtbaRGpMMKMZlB8gaFaQoQQSEhIQt7hkfTzhY1ulnt37929mw1T7sxls3vv/f3O7/zO43vO7/wucd3d3calI/zDo3927txpnDx5MqaEpKenpyUlJWUlJCQM6+rqSm1vb/fyGRcfH9+dkpLSGRcX13Lq1Knajo6Omvr6+ia+x4zWtLQ0Y86cOee/SAKLiopiyjwYlz5ixIhyPk8PGDBAKnHB6fF4unU9Ly+vDCanxpLeqVOnnuObznj9kJycHFMGwpRrjh8/Xoh0ec6ePWt6z5kzZwxdr62tLcrPz786lvT68ys+1jYEaTJQx+tRT1v3w0QDabweSe0XNjDmDBwyZEh6U1PTPCfPtLS0LOK5QZcYyDF48OAFjY2N6U6eaWhoyIaBc//vGSg1RIXXSC2dHG1tbYbX610dS08cUwYmJiYa2dnZWRMmTFiO9C0Ipw3UfgnoYfHw4cMzYWZscWAEeChj2LBha8CQm+vq6g6D26xnKj5eWC+dZ67l71VI0dxDhw5lYM/C6vvYsWMZzc3Nm4cOHVo7atSot/Hem6DjzRMnTjQGCw4k9RkZGYWYgGtrampeZCKaIuKgOps+fbrj55AgwYmPkabunJyceqThEaQhT4wKJPiyyy4bx/VHgStVQABTnBfpCdjuhp7D9PMw9BQGemnRBc0FXP8tdDaKbhj/Hn+Pdjr2WbNmfYkDw2IgjJgDMdX+A1DEwG8nUEsNYJTUSp98fzIrK6tF16PBuMBT/cCUk/T7Gz5HiI7c3NwxfN8gxgXSweRWcv3KPmOgQG9mZmaz1QAUScDIhvHjx/8Zgmsx9GExAjXrLigo6Ebrw2YkdBwdN26c6GgKNoGYoXoioblRZyAqsoDOWqMlOVJDbKQY10Zf3VJ3feo7Nuvc92hJsqQWJn7DKQNtOxHEfCZw4xVCqRS3PNigQYMEpCv5/BBJfa+zs3MfElyB1D1RWlp6le45fPiwMXv27D2o4p04ikI+p0D4FTiQaXjw3HCdUOCBQxmMxJZgdubhoPa56kRQ2REw8LAbMy3jjRmoxiY9VVhYuABmDRKs6TnGjBlTTNKg1zP6zu83+sMgVHwwTmAhpuIZJKcWxroiibT1OTRluabCqampKajQO5ESBmCWOn6GF7wLdckyi2WZpALOBrPn9TsGv8AMliA52UzIj5iYA+onUloZ778xJ4muMBD1SoGwzyIhiIE3MMCfgNks01AQrLTa1mDt6LruC5JTHEI/D8ppRELvyJEjPxo4cKDXNScyevTomwPVyq668uxmGDg2VNg1ceLEO0JhRF2HiT8M1o76ob8izMO2cNRajoxnV7rqhZFCL7OyzwkhOIcuIMRPmUk70GgCxrvFTrvc18z940O1iekZgH38JbQ7Vd/3oHmA6zAGSbrJrhTidFox8KsCo5IgA93pZJCo6ds8F28nWQFDbka1OxxI34qo4EBmMgGmfBqKCHCiJGS+HQQgdUN175OqOzUNPLfeTjZG9+C8FsPEdhvS9z7SFx81II0UrglmpyCykxn8tl0IhVmYisFvDxP4tsOYqXb7gjkrMStnrNqDcWe5Z4lTIO0onQWQbfAt+lxwyNYRRfzg4MGDW2wmUhOQpGcBsElhAt8kJvNZtWPn/i+++KIE03K31fqPxqXxRS0bIxVmhj62in9xGE9pfcOu6k6aNOnBSMGvnqedB+wmVpVYgM4XrMJBNOxd7GB0VJhI4HtWtgpV2oskpNhcwjRwGt/CVp5yI3JQO7T3TbVr5wCLDiHaOGDlRGDid1yPhQVjWFa8j1jVbFFI4n8Xeck2q0Qqz3tQ78kQOI+k6yLWNOYQUycYLhxqBwncgj3dRV9bSdRuJ0beS6x81izBS98nsdXr8OL/CIyjtVQAU36MOXqttbW1yzUVxjEs1eyYzRoq8XJgSl2xKjnATKR2Cd7ycWZ1H/any40wK1S4qH7UH/0+pv5Fh3+s3UPf2LFj/2nWhnAjaONq1yRQdo2ZvUWzY5LSbyeNvl5runQcx/ciZk+dL2J2Z2PohyEJfbY+cfr0aYOlhTjOSXydBE13oiG12O5Svm9FqnYgnWWiCfru4fpC/u6lCbpGaH0ra887tJgf8ZoI4p6Lei40U01sz9sQlE9m5A6YOB9mToFpHruL5NE+xAzOYfy5FC1ZygSfAf7sxQa+hfS8zue7e/bsmRuo6jD3OmxlJuahLmIVRtRvCfSWwoL8LuDZKpEPN+scq1P04vTOJWo1jkBs60uffTdiFZaU4SCuC5QoPJ9x5MgRgwqqFOMiPDRwLcZxJgsXajxK3Bp+5SOYLgUEfwlrXRj9V6NDMcSrUdG5JoDa6C+1KYYLi/tmBU2Yo4WMfwVOaYj4EdQGqgHdhN6nq2QCyVuB07imoqIiB8N7wUMwtWvmzJmf7Nq1a1qwteCLgXkzZswo271798TAa0ePHs2BiSX4gCqY+CYOpYTvu6hNbOzFcH1ZsmTJdFz/CyQBjuFF7YDXJmZnFHZix8Vk+wJP6H9r8uTJExTDh7oX3KhEaxWQ7vnly5dP7RWJFBcXb3TSMThpr5A/uTmCkPyai5F5ohu4kqcYnr/LnTy7du3ax3slE3ASmU5EH3Uvl+qyenUYULrWt3Z70RyiV3RXV1dX+szXQSfPo85ZvZwIbj3DSQPcXynQqoPsyxuk0H9mNxaN9SE6off+8vLyN3rANzb/iMPxD+vFQBxFooOHJbp1PQU8mkGY+BA29LX+UG4WCpZBZwn0/qrH+Yl+6K5z0g78SurFQJIEHidE0GFbYBBOjfMtGNj/9mcGApw/h85bTcLSNieT788v1+oDCXvqmc1iDHN7f2Se6BJ9otP1AksM6hm7D0j0Ud9ki6zv+xjoO1Sy0Z8O0SO6oG+PxS0pTjYc+fMr3peO73QSBnFkWon8gQMHngcvPR0MvfflITqg53eiywpMczhyovCroxcDYYpTsc6zYpDi5srKynUY69L+wECl6UWPVYZI40CrRjiMpet6MZDA+YRDHDQaMba0uoQ8HaSEbqKepTqWzKP/Y6IDejqDwJoEoEyBQ6mu/ZKBsmm45d8zU6/QYb2dXUtkKwqxKzlG8FWzg2SxYyqFqFopdFSEsI/5jGdkqLZUk0P+sA6k8VeyOF+aA49gCcXepaRzVpMYzeYmbXpZAVPnEThnmG1BIEk5kFT5FMXcweAOkxNTdI3XTQpVHYEETqMwPcFqSxfOp5Y4eDtjKYFxO5iQ4/zWOxsjQypEXn3+eIkE6ktkZoYTbC/C7W/goaGBuI9n5uNItlp5LxHOtaQY5/2SguE70ci5kLzmBdeI88WodYx/G8C7tify8nM81jhQBhem1ezfv/+PMHKnmSfGDi7TaluIiCUxxgxMDCaB0J+EMCwyzLegbSsrK3sJ4N2LeY422ijMQXS3mC2Ys3Aznhm6KtjsMgBvjBnoDSaBmKz5mKlRZhuBEJAtdrBhyEgED/Yvrb4ZF274k/243aoaIU4LD/1YArUUize93Wy1Ea3T/pttrmz1YiG6kgWY7Rbh2zKytWMtJHBAP5FA07UHnODXUM9rLFT7DSTzuCsM9AHQ58xKa/FeiXT2oJkUQrinPzCQifSYSR8e9hcsTXhM6hXlUJ+zsyZsO5mApG0hjf+Z2TVmsRjoM8dEAj3Yz4RYMpD+TRnI0oX2yS03e4Zxfsh4t7u6WxN70MmsPRJYImGcX2CKg9DHkMTEfiiBqpvxBFRTpCJhG8z2GAr3wfCHwcBnXd/uyoz9CWy03+xaVVXVNLK8v/aPjyEkAcZ6YiyBCaLD8CtTwfY9ypq2aY0149sDDt4Ulf3CkkJm817fqt0FL4SAiXejGsV+EpggCQhn4LJRlGC0UjXwAZ9t4e4Hpn+P6OjBpdB3G8y7zWwpFkfJz13rnUif4/3CEJFkhY0Ea1Dx51ixO0bebQcz73Uigb79xN1AiFIkWXt//654GqNOmD56GZO0GkQwG+8YZ3ct2qfCXl858XU8+6QZbPHdq3fUJEatQpWBeKwqVP1PVKQBqblCZWUA1dOh7tfmQhhUxjrzQwxyurygRf9iwnTdR0Bfps2HNnZ8noaWDLLRc4LtMO05abcUtBEXlQpVBnmD3c3SSNIJOlnvA+BmBd1apD4CM5QFmsd9Xoc75b08N1/Pqx2rYgCkuY2NivfzedIO3WoHIVnsOgMlfajmRw4Xrs8VOxp+WxNwNI3sNHqFoszVwIW0SOtr9LzaUXtqV+37lyHTvzY2Ot1o806oOulwtnrd4HSrvl7VxHPa/dh9+eWXf8zmmJtQp5xovSDC53hy6Odm+lMN4Ln+RYcTuu1IoaNtDkhfMrjpAbOUT4istUFx0jnnAlZMIzHhxcNVR6v4Uu3iIGr14jKcRZr6Vf92IwrjqzVfwZ+fI4Vet7wwzim+wwgPh4l5OvNRrefBWeuQjMcJATeRzWl049V78t6oagZ27gaSv3eCAIoinSTalLTEueaF8agFDP6oG0U9vm38hygPfgQH8HUcQqLd/SX+6oqj0j7muXqZBO1VhbOb1DDfl1yB9851dZsD8W4FkrNKdXJIzsBIZlemgOWDfPDZPYDXe4AjBzD+eyBmN5LzKav+lZz1fO9Ags8qq8OZjASnw7g8PrWUcAUqOhNVLVBI5tZLJBEUacX1aEiV60AaBP8OErOGDv5GB143ymz10kfOMXwdg7Ffo8IfGNSFd21BKmU2ZMA82LEkbNMggWjtVXFq1+wcePM2+l/F5H4QtRfv+HY+Lg2281F5VL0nBmhRohmNZSE5/dcRDpbAnPZghfBoVhNwZ6ERxmtP4p0ymxl6Hc+8DMhQH8hcCG7Gtj2Jqs3gvpVI1Sy+/wEC+2zfg+gQw5jAZ5DkK1lUX4lkzdTLKSRlJgmEGuzyYu7bZvTlq5/oeBqz9h9tgYCZzQDZp/htTCA4loPAfk7h+tMY6Dqne4PtnnIi9FNDP0/QT1Fg5YS+Y2sncP1ZvftGu5owSZ/oFVZGX7/6yfiq0jObmb4XIsaGqoURY2F0Nip1K+cWBtMU6Xu0tP1M0Qftbeb8PhqQFSq6EZ1imujWy9PCGbdrDDQiqxLNo8D7Rql9OMyDCfU8vwqpz+3r6tiYM9BfGrBNr4XDQJ570c47GaLNwJi+wVJwhPNls6UCI0SdCuHlpv6wRyXm71DV+ithWKPDdFYN4eEOw7j0ElrFybUsSDliBjBqGwC86RIDjfPbDLAlr9qNh+UwyOy8avXC7pgw0Gwrf18ebNjZijc+EgoK6TrQqZxyvO2xpNe/5O8cxRs3bjT6cme5yVEHJpzBZzbAPAvpSiW3l+j/nxGA75qZ6OMQf4xYvCnGr67/KvK59N9hRHb8T4ABAPaAkPNeKkdCAAAAAElFTkSuQmCC", jt = ":host{display:block;height:100%;color-scheme:dark;font:13px/1.4 Segoe UI,sans-serif;color:#dbe5f0;container-type:size}*{box-sizing:border-box}[hidden]{display:none!important}main{height:100%;min-height:260px;background:#171d25;display:flex;flex-direction:column;overflow:hidden;-webkit-user-select:none;user-select:none}button,input,select,textarea{font:inherit;color:inherit;border:1px solid #425165;border-radius:6px;background:#253140;padding:7px 9px;min-width:0}button{cursor:pointer;white-space:nowrap}button:hover{background:#354459}button:disabled{opacity:.45;cursor:default}.primary{background:#b99a38;border-color:#d0ae46;color:#111820;font-weight:600}.primary:hover{background:#e0bd51}button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid #f2c94c;outline-offset:1px}input,select,textarea{background:#111a24}input,textarea,td,dd{-webkit-user-select:text;user-select:text}input[type=checkbox]{accent-color:#e6c354;width:16px;height:16px}header{display:flex;gap:7px;align-items:center;padding:8px 12px;border-bottom:1px solid #354459;flex-shrink:0;overflow-x:auto}.brand{display:flex;gap:7px;align-items:center;margin-right:8px}.brand img{width:32px;height:32px;object-fit:contain}.brand b{font-size:17px}.brand small{font-size:10px;color:#a6b5c7}#dirty{margin-left:auto;font-size:11px;color:#cabb81;white-space:nowrap}.notice{background:#1c2735;padding:5px 12px;font-size:12px;min-height:27px;max-height:70px;overflow:auto;color:#a7bbd1}.notice.error{color:#ffaaa1;background:#412725}.workspace{display:grid;grid-template-columns:230px minmax(0,1fr);flex:1;min-height:0}aside{padding:10px;display:flex;flex-direction:column;gap:9px;border-right:1px solid #354459;min-height:0}#checks{overflow:auto;flex:1;min-height:0}.check-item{display:flex;flex-direction:column;gap:5px;width:100%;margin-bottom:5px;text-align:left;white-space:normal}.check-item small{color:#a8b7ca}.check-item.active,.tabs .active{border-color:#c7ab56;background:#403b2c;color:#ffe399}.main{display:flex;flex-direction:column;min-width:0;min-height:0}.test-toolbar{display:flex;gap:7px;padding:8px 12px;align-items:center}.test-toolbar input{flex:1;font-weight:600}.tabs{display:flex;gap:7px;border-bottom:1px solid #354459;padding:0 12px 8px}.tabs button{min-width:105px}#content{flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column}.empty{padding:28px;color:#a4b4c9;text-align:center;margin:auto}h2,h3,p{margin:0 0 10px}h2{font-size:20px}h3{font-size:15px}label{display:flex;flex-direction:column;gap:5px;font-size:12px;color:#b8c6d7}.check{flex-direction:row;align-items:center;gap:6px}small{font-size:11px;color:#a8b7c9}.parameters{display:flex;gap:18px;align-items:end;padding:10px 12px}.parameters input{width:140px}.selection-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0 12px 12px}.selection{border:1px solid #39495e;border-radius:8px;padding:12px;background:#1b2633;min-width:0}.selection h3{display:flex;justify-content:space-between}.selection h3 span{color:#92c4b2;font-size:12px}.selection select[multiple]{width:100%;min-height:70px}.selection-tools{display:flex;gap:5px;flex-wrap:wrap;margin:8px 0}.selection-tools button{font-size:11px;padding:5px 7px}.selection>label{margin-bottom:8px}.condition{display:grid;grid-template-columns:minmax(80px,1fr) 100px minmax(70px,1fr) 29px;gap:5px;margin:6px 0}.condition button{padding:3px}.rules,.report{padding:18px;max-width:850px}.rules>label{margin:14px 0}.rules>p,.report>p{color:#a9b8cb}.report>button{margin:12px 8px 14px 0}.result-tools{display:flex;gap:7px;flex-wrap:wrap;padding:8px 12px}.result-tools input{flex:1;min-width:180px}.result-area{display:grid;grid-template-columns:minmax(0,1fr) 300px;flex:1;min-height:0}.table-area{display:flex;flex-direction:column;min-width:0;min-height:0}.scroll{overflow:auto;flex:1;min-height:0}table{border-collapse:separate;border-spacing:0;width:max-content;min-width:100%}th{position:sticky;top:0;background:#2a3748;z-index:1;text-align:left;max-width:240px;white-space:normal}th,td{padding:8px;border-bottom:1px solid #344154;vertical-align:top}td{max-width:320px;min-width:90px;overflow-wrap:anywhere;-webkit-user-select:text;user-select:text}td:first-child{min-width:36px}tr.active td{background:#453e29;color:#fff0b5}tr:hover td{background:#2c3847}.pager{display:flex;gap:10px;align-items:center;justify-content:center;padding:5px;border-top:1px solid #39495e;font-size:11px}.pager button{padding:2px 8px}.detail{border-left:1px solid #354459;padding:10px;overflow:auto}.detail h3{overflow-wrap:anywhere}.detail>label{margin:10px 0}.detail p{font:11px/1.5 Consolas,monospace}.detail details{border-top:1px solid #354459;padding:8px 0}summary{cursor:pointer}dl{font-size:11px;display:grid;grid-template-columns:1fr 1fr;gap:7px}dt,dd{overflow-wrap:anywhere;margin:0}dt{color:#9baec4}footer{border-top:1px solid #354459;padding:4px 12px;display:flex;justify-content:space-between;color:#91a4bb;font-size:11px}dialog{border:1px solid #53647c;border-radius:12px;background:#202c3a;color:#dbe5f0;width:min(700px,92vw);max-height:85vh;padding:20px;box-shadow:0 15px 60px #000a}dialog::backdrop{background:#000a}dialog p{margin:12px 0}dialog a{color:#f2c94c;margin-right:12px}.dialog-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:16px}@container (max-width:950px){.workspace{grid-template-columns:185px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 240px}.selection-grid{grid-template-columns:1fr}.parameters,.test-toolbar{flex-wrap:wrap}.test-toolbar input{flex-basis:100%}}@container (max-height:400px){header{padding:5px 10px}.test-toolbar{padding:5px 10px}.tabs{padding-bottom:5px}.brand img{width:25px;height:25px}footer{display:none}}:host{font-size:12px}.brand img{background:#e1e7ef;border-radius:5px;padding:3px}.selection-tools button{font-size:12px}label{font-size:13px}.choose-layout{display:grid;grid-template-columns:220px minmax(0,1fr);min-height:0;flex:1;overflow:auto}.choose-layout .parameters{display:flex;flex-direction:column;align-items:stretch;gap:15px;border-right:1px solid #354459;justify-content:flex-start}.choose-layout .parameters input{width:100%}.choose-layout .parameters input[type=checkbox]{width:16px}.choose-layout .selection-grid{padding:10px 12px;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start;min-width:0}.selection select[multiple]{height:180px;resize:vertical}.selection-mode{font-size:12px;color:#b6c4d5}.preset-row{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:9px}.preset-row select{flex:1 1 160px}.preset-row button{padding:5px 7px;font-size:12px}.model-list{height:150px;overflow:auto;border:1px solid #425165;border-radius:6px;background:#111a24;padding:5px;margin-bottom:5px}.model-list label{display:flex;flex-direction:row;align-items:center;gap:7px;padding:4px 5px;color:#dbe5f0;overflow-wrap:anywhere}.model-list label:hover{background:#253140}.model-list .model-all{position:sticky;top:-5px;z-index:1;background:#1f2b39;border-bottom:1px solid #425165;font-weight:600}.legend{display:flex;gap:12px;flex-wrap:wrap;font-family:inherit!important}.part-a{color:#ff6161}.part-b{color:#65baff}.preview{display:block;width:100%;padding:5px;margin:8px 0}.preview img{display:block;width:100%;max-height:180px;object-fit:contain}.image-dialog{width:94vw;max-width:1500px}.image-dialog img{display:block;max-width:100%;max-height:75vh;margin:10px auto}#help-dialog{width:min(1000px,94vw);line-height:1.6}#help-dialog details{padding:12px 0;border-bottom:1px solid #425165}#help-dialog summary{font-size:16px;font-weight:600;color:#f0d27a}#help-dialog li{margin:8px 0}@container (max-width:1100px){.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .selection-grid{grid-template-columns:1fr}.condition{grid-template-columns:minmax(60px,1fr) 100px minmax(60px,1fr) 29px}}@container (max-width:700px){.choose-layout{display:block}.choose-layout .parameters{border-right:0;border-bottom:1px solid #354459}.workspace{grid-template-columns:160px minmax(0,1fr)}}button,input,select,textarea{padding:5px 7px;border-radius:5px}button{min-height:27px}input[type=checkbox]{width:14px;height:14px}.commandbar{position:relative;display:flex;gap:8px;min-height:45px;padding:5px 8px;overflow:visible;background:#131b25}.brand{flex:0 0 auto;margin-right:0;gap:5px}.brand img{width:28px;height:28px}.brand b{font-size:14px}.check-heading{display:grid;grid-template-rows:25px 12px;flex:0 1 230px;min-width:145px}.check-heading input{height:25px;border:0;background:transparent;padding:2px 5px;font-weight:600}.check-heading small{padding:0 5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:9px}.tabs{align-self:stretch;align-items:center;flex:0 0 auto;gap:3px;padding:0;border:0}.tabs button{flex:0 0 auto;min-width:0;padding:5px 9px;background:transparent;border-color:transparent}.tabs .active{background:#3e3828;border-color:#b99a38}.header-actions{display:flex;align-items:center;gap:4px;margin-left:auto}#dirty{margin-left:0;width:0;height:0;overflow:visible;font-size:0}#dirty:not(:empty){width:7px;height:7px;border-radius:50%;background:#e5bd43;box-shadow:0 0 0 2px #e5bd4328}.more-menu{position:relative;z-index:20}.more-menu summary{display:grid;place-items:center;width:29px;height:29px;border:1px solid #425165;border-radius:5px;background:#253140;cursor:pointer;list-style:none;font-size:18px}.more-menu summary::-webkit-details-marker{display:none}.more-popover{position:absolute;right:0;top:calc(100% + 5px);display:grid;width:190px;gap:3px;padding:6px;border:1px solid #506176;border-radius:7px;background:#192431;box-shadow:0 12px 35px #000a}.more-popover button{text-align:left}.notice{min-height:23px;max-height:45px;padding:3px 9px;font-size:10px}.run-progress{display:grid;grid-template-columns:minmax(150px,auto) minmax(120px,1fr) auto;align-items:center;gap:8px;min-height:24px;padding:3px 9px;border-bottom:1px solid #425165;background:#202a20;color:#d9e7d2;font-size:10px}.run-bar{width:100%;height:7px;overflow:hidden;border-radius:2px;background:#101810}.run-bar i{display:block;width:0;height:100%;background:#e3bc43}#run-phase,#run-value{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#run-value{text-align:right;color:#b9c9b3}.workspace{grid-template-columns:190px minmax(0,1fr)}aside{gap:6px;padding:7px;background:#141c26}.aside-title{font-weight:600;font-size:12px}.aside-actions{display:grid;gap:5px}.check-item{gap:2px;margin-bottom:3px;padding:6px 7px}.check-item small{font-size:9px}.main{background:#171d25}#content{overflow:hidden}.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .parameters{gap:9px;padding:8px}.choose-layout .selection-grid{gap:8px;padding:8px}.selection{padding:8px}.selection h3,h3{font-size:13px;margin-bottom:6px}label{gap:3px;font-size:11px}small,.selection-tools button,.preset-row button{font-size:10px}.model-list{height:125px}.model-list label{padding:2px 4px}.selection-tools{gap:4px;margin:5px 0}.selection-tools button,.preset-row button{padding:3px 5px;min-height:23px}.result-tools{display:flex;align-items:center;justify-content:space-between;gap:6px;flex-wrap:nowrap;min-height:38px;padding:5px 7px;border-bottom:1px solid #354459;background:#151f2a}.result-filters,.bulk-tools{display:flex;align-items:center;gap:5px;min-width:0}.result-filters{flex:1}.result-filters input[type=search]{flex:1 1 190px;min-width:120px}#result-depth{flex:0 1 125px;min-width:92px}#result-count,#selection-count{color:#9fb0c4;white-space:nowrap;font-size:10px}.bulk-tools select{max-width:125px}.result-area{grid-template-columns:minmax(0,1fr) 310px}th,td{padding:5px 6px;font-size:11px;line-height:1.25}th{max-width:190px}td{max-width:260px;min-width:76px}.pager{justify-content:flex-end;min-height:29px;padding:3px 7px}.pager #selection-count{margin-right:auto}.detail{display:flex;flex-direction:column;min-width:0;padding:0;overflow:hidden;background:#141e29}.detail-head{display:flex;align-items:center;justify-content:space-between;gap:6px;min-height:47px;padding:7px 8px 4px}.detail-head>div:first-child{min-width:0}.detail-head small{color:#8093aa;letter-spacing:.08em}.detail-head h3{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin:0}.detail-nav{display:flex;gap:3px}.detail-nav button{min-width:27px;padding:2px 7px;font-size:17px}.clash-summary{display:flex;gap:5px;padding:0 8px 5px;color:#adbdcf;font-size:9px}.clash-summary span{padding-right:5px;border-right:1px solid #405064}.clash-summary span:last-child{border:0}.detail .legend{margin:0;padding:0 8px 5px;font-size:10px}.preview-slot{height:clamp(92px,18cqh,145px);flex:0 0 auto;margin:0 7px 6px;overflow:hidden;border:1px solid #37475b;border-radius:6px;background:#0e151d}.preview{position:relative;width:100%;height:100%;margin:0;padding:0;border:0;background:transparent}.preview img{width:100%;height:100%;max-height:none;object-fit:contain}.preview span{position:absolute;right:5px;bottom:5px;padding:3px 6px;border-radius:4px;background:#101923db;font-size:9px}.preview-empty,.detail-empty{height:100%;display:grid;place-content:center;justify-items:center;gap:4px;color:#788ba1}.preview-empty>span,.detail-empty>span{font-size:24px}.detail-actions{display:grid;grid-template-columns:1fr 1fr;gap:5px;padding:0 7px 7px}.detail-scroll{flex:1;min-height:0;overflow:auto;padding:7px 8px 12px;border-top:1px solid #354459}.detail-scroll>label{margin:7px 0}.detail p{font:inherit}.coordinates{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;font:9px/1.3 Consolas,monospace;color:#91a3b7}.coordinates span{overflow:hidden;text-overflow:ellipsis}.detail details{padding:6px 0}.detail dl{font-size:10px}.detail-empty{padding:20px;text-align:center}footer{padding:2px 8px;font-size:9px}@container (max-width:1050px){.workspace{grid-template-columns:165px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 270px}.check-heading{flex-basis:185px}.tabs button{padding-inline:6px}#dirty{display:none}}@container (max-width:820px){.brand b,.brand small,#result-count{display:none}.check-heading{flex-basis:155px}.result-tools{overflow-x:auto}.result-area{grid-template-columns:minmax(0,1fr) 245px}}@container (max-height:410px){.notice,footer{display:none}.preview-slot{height:90px}}", ye = /* @__PURE__ */ new WeakMap(), it = "nashepo.collisionfinder360.project.", Ne = () => ({
  format: "nashepo.checks",
  version: 1,
  checks: [],
  sets: []
}), He = (t) => {
  if (!(!t || typeof sessionStorage > "u"))
    try {
      const e = sessionStorage.getItem(it + t);
      return e ? et(e) : void 0;
    } catch {
      return;
    }
}, Je = (t, e) => {
  if (!(!t || typeof sessionStorage > "u"))
    try {
      sessionStorage.setItem(
        it + t,
        JSON.stringify(e, (i, a) => i === "image" ? void 0 : a)
      );
    } catch {
    }
};
function Et(t, e) {
  const i = t.shadowRoot || t.attachShadow({ mode: "open" }), a = lt(t);
  let s = e.projectToken(), n = e.projectId(), o = s && (ye.get(s) || He(n)) || Ne();
  s && ye.set(s, o);
  let d, u = o.checks[0]?.id || "", m = "select", f = "", g = 0, w = !1, M = !1, j, A = !0, C = !1;
  const S = /* @__PURE__ */ new Set();
  let ie, z, Y = 0;
  const R = () => o.checks.find((r) => r.id === u), h = (r) => i.querySelector("#" + r);
  i.innerHTML = `<style>${jt}</style><main><header class="commandbar"><div class="brand"><img src="${It}" alt=""><b>НашеПО</b><small>${dt}</small></div><div class="check-heading"><input id="name" aria-label="Имя проверки" placeholder="Выберите проверку"><small id="check-summary">Проверка не выбрана</small></div><div id="tabs" class="tabs">${[
    ["select", "Выбор"],
    ["results", "Результаты"],
    ["rules", "Правила"],
    ["report", "Отчёт"]
  ].map(([r, l]) => `<button data-tab="${r}">${l}</button>`).join(
    ""
  )}</div><div class="header-actions"><button id="scan" title="Перечитать список и геометрию выбранных моделей">↻ Модели</button><button id="run" class="primary">▶ Запустить</button><button id="cancel" hidden>Остановить</button><details class="more-menu"><summary title="Другие команды">⋮</summary><div class="more-popover"><button id="open">Открыть проверки</button><button id="save">Сохранить проверки</button><button id="copy">Копировать проверку</button><button id="delete">Удалить проверку</button><button id="settings">Настройки</button><button id="help">Справка</button></div></details></div><span id="dirty"></span></header><div id="run-progress" class="run-progress" hidden><span id="run-phase">Подготовка</span><div id="run-bar" class="run-bar" role="progressbar"><i id="run-fill"></i></div><span id="run-value"></span></div><div class="notice" id="notice" role="status">Откройте IFC/SMDX в проекте и нажмите «Модели».</div><div class="workspace"><aside><div class="aside-title">Проверки</div><input id="test-search" type="search" placeholder="Поиск проверок"><div id="checks"></div><div class="aside-actions"><button id="all">Запустить все</button><button id="new" class="primary">＋ Новая проверка</button></div></aside><section class="main"><div id="content"></div></section></div><footer><span id="model-count">Модели не прочитаны</span><span>Расчёт выполняется на вашем компьютере</span></footer><input id="file" type="file" accept=".json" hidden><dialog id="settings-dialog"><h2>Настройки</h2><label>Дистанция камеры, м<input id="distance" type="number" value="15" min="0.5"></label><p class="links"><a href="https://nashepo.ru/" target="_blank" rel="noopener noreferrer">Сайт НашеПО</a><a href="https://t.me/RoburFan" target="_blank" rel="noopener noreferrer">Telegram</a></p><button data-close="settings-dialog">Закрыть</button></dialog><dialog id="help-dialog">${st}<button data-close="help-dialog">Закрыть</button></dialog><dialog id="set-dialog"><h2>Сохранить набор моделей</h2><label>Название<input id="set-name" maxlength="120"></label><div class="dialog-actions"><button id="set-cancel">Отмена</button><button id="set-confirm" class="primary">Сохранить</button></div></dialog></main>`;
  const B = document.createElement("button");
  B.id = "clear-project", B.textContent = "Очистить проект", h("save").after(B), i.querySelector(".more-popover").addEventListener(
    "click",
    () => i.querySelector(".more-menu").removeAttribute("open")
  );
  const k = (r, l = !1) => {
    h("notice").textContent = r, h("notice").classList.toggle("error", l);
  }, $ = (r, l, c, p) => {
    const x = h("run-progress"), v = h("run-bar"), b = h("run-fill");
    if (x.hidden = !1, h("notice").hidden = !0, h("run-phase").textContent = r, c && c > 0 && l !== void 0) {
      const y = Math.max(0, Math.min(100, l / c * 100));
      b.style.width = `${y}%`, v.setAttribute("aria-valuemin", "0"), v.setAttribute("aria-valuemax", "100"), v.setAttribute("aria-valuenow", String(Math.round(y))), h("run-value").textContent = `${Math.round(y)}% · ${l}/${c}` + (p === void 0 ? "" : ` · найдено ${p}`);
    } else
      b.style.width = "0", v.removeAttribute("aria-valuenow"), h("run-value").textContent = p === void 0 ? "" : `Найдено ${p}`;
    v.setAttribute("aria-valuetext", h("run-value").textContent || r);
  }, Z = () => {
    h("run-progress").hidden = !0, h("notice").hidden = !1;
  }, G = async (r) => {
    try {
      await r();
    } catch (l) {
      k(l instanceof Error ? l.message : String(l), !0);
    }
  }, ue = () => new Promise((r) => {
    const l = h("set-dialog"), c = h("set-name");
    let p = !1;
    const x = (v) => {
      p || (p = !0, l.close(), r(v));
    };
    c.value = "Новый набор", h("set-confirm").onclick = () => {
      const v = c.value.trim();
      v ? x(v) : c.focus();
    }, h("set-cancel").onclick = () => x(), l.oncancel = (v) => {
      v.preventDefault(), x();
    }, l.showModal(), c.focus(), c.select();
  }), D = () => {
    C = !0, h("dirty").textContent = "Есть несохранённые изменения", s && ye.set(s, o), Je(n, o);
  }, ge = () => {
    const r = e.projectToken();
    return !r || r === s ? !1 : (!s && (o.checks.length || o.sets.length) ? ye.set(r, o) : o = ye.get(r) || He(e.projectId()) || Ne(), ye.set(r, o), s = r, n = e.projectId(), d = void 0, u = o.checks[0]?.id || "", f = "", S.clear(), g = 0, C = !1, e.clear(), h("dirty").textContent = "", !0);
  }, E = () => {
    const r = R();
    r?.lastRun && (r.status = "stale"), D(), J();
  }, P = () => [
    ...new Set(
      (d?.elements || []).flatMap((r) => Object.keys(r.properties))
    )
  ].sort(), U = (r, l) => r.map(
    (c) => `<option value="${H(c)}" ${c === l ? "selected" : ""}>${H(c)}</option>`
  ).join("");
  function V() {
    const r = R(), l = h("result-search")?.value.toLowerCase() || "", c = h("result-state")?.value || "", p = Number(h("result-depth")?.value || 0);
    return (r?.results || []).filter(
      (x) => (!c || x.state === c) && (r?.type === "duplicates" || (x.penetrationMm ?? 0) >= p) && (!l || JSON.stringify({ ...x, image: void 0 }).toLowerCase().includes(l))
    );
  }
  function J() {
    const r = h("test-search").value.toLowerCase();
    h("checks").innerHTML = o.checks.filter((l) => l.name.toLowerCase().includes(r)).map(
      (l) => `<button class="check-item ${l.id === u ? "active" : ""}" data-check="${l.id}"><strong>${H(l.name)}</strong><small>${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[l.status]} · ${l.results.filter((c) => !["resolved", "excluded"].includes(c.state)).length} в работе / ${l.results.length}</small></button>`
    ).join("");
  }
  function T(r, l) {
    const c = d?.elements.filter(
      (I) => (R().includeHidden || !I.hidden) && je(I, r)
    ).length || 0, p = r.manualOnly ? re(r) : r.modelsMode === "selected" ? r.models : (d?.models || []).map((I) => I.id), x = d && p.every((I) => d.indexedModelIds.includes(I)) ? `${c} элементов` : "число после запуска", v = d?.models || [], b = r.modelsMode !== "selected", y = o.sets.map(
      (I) => `<option value="${H(I.id)}" ${r.presetId === I.id ? "selected" : ""}>${H(I.name)}</option>`
    ).join("");
    return `<article class="selection" data-side="${l}"><h3>Выбор ${l.toUpperCase()} <span data-selection-count>${x}</span></h3>${r.manualOnly ? '<p class="selection-mode">Только элементы, выбранные вручную</p>' : ""}<div class="preset-row"><select class="preset"><option value="">Набор моделей…</option>${y}</select><button data-selection="load-set">Применить</button><button data-selection="save-set">Сохранить набор</button><button data-selection="delete-set" ${r.presetId ? "" : "disabled"}>Удалить</button></div><div class="model-list"><label class="model-all"><input type="checkbox" class="all-models" ${b ? "checked" : ""}> Все модели</label>${v.map((I) => `<label><input type="checkbox" class="model-check" value="${H(I.id)}" ${b || r.models.includes(I.id) ? "checked" : ""}> ${H(I.name)}</label>`).join("") || "<small>Нажмите «Модели».</small>"}</div><small>Отметьте файлы, которые должны участвовать в выборе ${l.toUpperCase()}.</small><div class="selection-tools"><button data-selection="show">Показать выбранные элементы</button><button data-selection="only">Только выделенные в 3D</button><button data-selection="include">＋ Добавить из 3D</button><button data-selection="exclude">− Исключить из 3D</button><button data-selection="reset">Сбросить ручной выбор</button></div><small>Добавлено вручную: ${r.include.length} · исключено: ${r.exclude.length}</small></article>`;
  }
  function N() {
    J();
    const r = R();
    h("name").value = r?.name || "", h("check-summary").textContent = r ? `${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[r.status]} · ${r.results.filter((l) => !["resolved", "excluded"].includes(l.state)).length} в работе / ${r.results.length}` : "Проверка не выбрана";
    for (const l of ["name", "copy", "delete", "run"])
      h(l).disabled = !r || w;
    for (const l of i.querySelectorAll("[data-tab]"))
      l.classList.toggle("active", l.dataset.tab === m);
    if (!r) {
      h("content").innerHTML = '<div class="empty"><h2>Создайте первую проверку</h2><p>Обновите модели, затем выберите, какие элементы проверять друг с другом.</p></div>';
      return;
    }
    m === "select" && (h("content").innerHTML = `<div class="choose-layout"><div class="parameters"><h3>Параметры проверки</h3><label>Тип<select id="type"><option value="intersection" ${r.type === "intersection" ? "selected" : ""}>По пересечению</option><option value="duplicates" ${r.type === "duplicates" ? "selected" : ""}>Дублирование</option></select></label><label title="Числовая погрешность расчёта">Точность расчёта, мм<input id="precision" type="number" value="${r.precision}" min="0.001" max="100" step="0.1"></label><label title="Конфликты с меньшей оценкой глубины не попадут в результат">Минимальная глубина, мм<input id="min-penetration" type="number" value="${r.minPenetration}" min="0" max="100000" step="1" ${r.type === "duplicates" ? "disabled" : ""}></label><label class="check"><input id="touching" type="checkbox" ${r.touching ? "checked" : ""} ${r.type === "duplicates" ? "disabled" : ""}>Учитывать касания</label><small>Глубина Hard Clash считается по фактическим пересечениям треугольников и вложенности замкнутых тел. Габариты используются только для быстрого отбора пар.</small><p class="legend"><span class="part-a">● Выбор А</span><span class="part-b">● Выбор Б</span></p></div><div class="selection-grid">${T(r.a, "a")}${T(r.b, "b")}</div></div><datalist id="property-fields">${U(P(), "")}</datalist>`), m === "rules" && (h("content").innerHTML = `<div class="rules"><h3>Исключение пар</h3><p>Элемент сам с собой не проверяется. Пара А/Б учитывается один раз.</p><label class="check"><input id="same-model" type="checkbox" ${r.ignoreSameModel ? "checked" : ""}>Не проверять элементы одной модели</label><label class="check"><input id="same-group" type="checkbox" ${r.ignoreSameGroup ? "checked" : ""}>Не проверять геометрию одного составного объекта</label><label>Не проверять пары с одинаковым значением свойства<input id="equal-property" list="property-fields" value="${H(r.equalProperty)}" placeholder="Без ограничения"></label><label class="check"><input id="hidden" type="checkbox" ${r.includeHidden ? "checked" : ""}>Включать скрытые элементы прочитанных моделей</label><p>Незагруженные подключённые файлы нужно открыть перед расчётом.</p><datalist id="property-fields">${U(P(), "")}</datalist></div>`), m === "results" && (h("content").innerHTML = `<div class="result-tools"><div class="result-filters"><input id="result-search" type="search" placeholder="Поиск по результатам"><select id="result-state"><option value="">Все состояния</option>${Object.entries(
      he
    ).map(([l, c]) => `<option value="${l}">${c}</option>`).join("")}</select>${r.type === "intersection" ? '<input id="result-depth" type="number" min="0" step="1" placeholder="Глубина от, мм">' : ""}<button id="show-markers" role="switch" aria-checked="${A}">${A ? "● Знаки" : "○ Знаки"}</button><span id="result-count"></span></div><div class="bulk-tools"><select id="bulk-state" title="Состояние для выбранных строк">${Object.entries(
      he
    ).map(([l, c]) => `<option value="${l}">${c}</option>`).join("")}</select><button id="bulk">Применить</button></div></div><div class="result-area"><div class="table-area"><div class="scroll" id="table"></div><div class="pager"><span id="selection-count"></span><button id="prev-page">←</button><span id="page"></span><button id="next-page">→</button></div></div><div class="detail" id="detail"></div></div>`, ee(), pe()), m === "report" && (h("content").innerHTML = `<div class="report"><h3>${H(r.name)}</h3><p>Результатов: ${r.results.length}. Выбрано: ${S.size}. ${r.status === "stale" ? "Результаты устарели — рекомендуется повторный запуск." : ""}</p><label class="check"><input id="selected-only" type="checkbox" ${S.size ? "checked" : ""}>Только выбранные строки</label><label class="check"><input id="report-images" type="checkbox" checked>Добавить снимки (недостающие будут созданы автоматически)</label><button id="export-html" class="primary">Сформировать HTML-отчёт</button><button id="export-viewer">Сессия для плагина «Коллизии»</button><p>Правила и все результаты сохраняются кнопкой «Сохранить проверки» в верхней панели.</p></div>`), h("content").inert = w;
  }
  function ee() {
    const r = R(), l = V(), c = Math.max(1, Math.ceil(l.length / 50));
    g = Math.max(0, Math.min(g, c - 1));
    const p = l.slice(g * 50, g * 50 + 50);
    h("table").innerHTML = l.length ? `<table><thead><tr><th><input id="check-page" type="checkbox" aria-label="Выбрать страницу" ${p.every((x) => S.has(x.id)) ? "checked" : ""}></th>${["№", "Состояние", "Глубина, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "Комментарий"].map((x) => `<th>${x}</th>`).join("")}</tr></thead><tbody>${p.map((x, v) => `<tr data-result="${H(x.id)}" class="${x.id === f ? "active" : ""}"><td><input type="checkbox" class="row-check" aria-label="Выбрать конфликт" ${S.has(x.id) ? "checked" : ""}></td>${[g * 50 + v + 1, he[x.state], r.type === "duplicates" ? "—" : (x.penetrationMm ?? 0).toFixed(1), x.a.name, x.a.model, x.a.guid || "—", x.b.name, x.b.model, x.b.guid || "—", x.note].map((b) => `<td title="${H(b)}">${H(b)}</td>`).join("")}</tr>`).join("")}</tbody></table>` : '<div class="empty">Нет результатов. Запустите проверку или измените фильтры.</div>', h("page").textContent = `${g + 1} / ${c}`, h("result-count").textContent = `${l.length} результатов`, h("selection-count").textContent = `Выбрано: ${S.size}`, h("prev-page").disabled = g === 0, h("next-page").disabled = g === c - 1;
  }
  function pe() {
    const r = R(), l = V(), c = l.findIndex((x) => x.id === f), p = r?.results.find((x) => x.id === f);
    h("detail").innerHTML = p ? `<div class="detail-head"><div><small>КОЛЛИЗИЯ</small><h3>#${c + 1} ${H(p.a.name)} × ${H(p.b.name)}</h3></div><div class="detail-nav"><button id="previous" title="Предыдущая коллизия" ${c <= 0 ? "disabled" : ""}>‹</button><button id="next" title="Следующая коллизия" ${c < 0 || c >= l.length - 1 ? "disabled" : ""}>›</button></div></div><div class="clash-summary"><span>${r?.type === "duplicates" ? "Дублирование" : "Пересечение"}</span><span title="Максимальная локальная глубина по пересекающимся парам треугольников и вложенным поверхностям">${r?.type === "duplicates" ? "Совпадение геометрии" : `Глубина ${(p.penetrationMm ?? 0).toFixed(1)} мм`}</span><span>${H(he[p.state])}</span></div><p class="legend"><span class="part-a">● Элемент А</span><span class="part-b">● Элемент Б</span></p><div class="preview-slot">${p.image ? `<button id="open-image" class="preview"><img src="${H(p.image)}" alt="Снимок коллизии"><span>Открыть крупнее</span></button>` : '<div class="preview-empty"><span>◫</span><small>Снимок создастся после перехода в 3D</small></div>'}</div><div class="detail-actions"><button id="focus" class="primary">Перейти в 3D</button><button id="capture-image">▣ Снимок пары</button></div><div class="detail-scroll"><div class="coordinates">${p.point.map((x, v) => `<span>${["X", "Y", "Z"][v]} ${x.toFixed(3)}</span>`).join("")}</div><label>Состояние<select id="edit-state">${Object.entries(
      he
    ).map(
      ([x, v]) => `<option value="${x}" ${p.state === x ? "selected" : ""}>${v}</option>`
    ).join(
      ""
    )}</select></label><label>Назначение<input id="assignee" value="${H(p.assignee)}"></label><label>Комментарий<textarea id="note" rows="2">${H(p.note)}</textarea></label>${[
      p.a,
      p.b
    ].map(
      (x, v) => `<details><summary>Элемент ${v ? "Б" : "А"} · свойства</summary><dl>${Object.entries(
        x.properties
      ).map(([b, y]) => `<dt>${H(b)}</dt><dd>${H(y)}</dd>`).join("")}</dl></details>`
    ).join("")}</div>` : '<div class="detail-empty"><span>◫</span><p>Выберите коллизию в таблице</p><small>Двойной щелчок сразу перенесёт камеру в 3D.</small></div>';
  }
  const re = (r) => {
    const l = new Set(
      !r.manualOnly && r.modelsMode === "selected" ? r.models : []
    );
    for (const c of r.include)
      try {
        l.add(String(JSON.parse(c)[0]));
      } catch {
        const p = d?.elements.find(
          (x) => x.id === c
        )?.modelId;
        p && l.add(p);
      }
    return [...l];
  }, de = () => {
    const r = R();
    if (!(!r || m !== "select"))
      for (const l of i.querySelectorAll("[data-side]")) {
        const c = l.dataset.side, p = [...l.querySelectorAll(".model-check")];
        if (!p.length) continue;
        const x = p.filter((y) => y.checked).map((y) => y.value), v = x.length === p.length, b = r[c];
        b.modelsMode = v ? "all" : "selected", b.models = v ? [] : x, b.conditions = [], b.mode = "all";
      }
  }, se = (r) => {
    if (!r?.length) return;
    const l = /* @__PURE__ */ new Set();
    for (const c of r)
      for (const p of [c.a, c.b]) {
        if (!p.manualOnly && p.modelsMode !== "selected") return;
        for (const x of re(p)) l.add(x);
      }
    return l;
  }, ne = (r) => {
    let l = r.trim().replace(/\\/g, "/").toLocaleLowerCase();
    try {
      l = decodeURIComponent(l);
    } catch {
    }
    l = l.replace(/[?#].*$/, "");
    const c = l.split("/").filter(Boolean).at(-1) || l;
    return /* @__PURE__ */ new Set([l, c]);
  }, le = (r) => {
    const l = new Set(r.map((y) => y.id)), c = r.map((y) => ({
      id: y.id,
      aliases: /* @__PURE__ */ new Set([
        ...ne(y.id),
        ...ne(y.name)
      ])
    })), p = (y) => {
      if (l.has(y)) return y;
      const I = ne(y), O = c.filter(
        (L) => [...I].some((_) => L.aliases.has(_))
      );
      return O.length === 1 ? O[0].id : y;
    }, x = (y) => {
      try {
        const I = JSON.parse(y);
        if (!Array.isArray(I) || I.length < 2) return y;
        const O = String(I[0]), L = p(O);
        return L === O ? y : JSON.stringify([L, ...I.slice(1)]);
      } catch {
        return y;
      }
    };
    let v = !1;
    const b = (y) => {
      const I = y.models.map(p), O = y.include.map(x), L = y.exclude.map(x);
      (I.some((_, te) => _ !== y.models[te]) || O.some((_, te) => _ !== y.include[te]) || L.some((_, te) => _ !== y.exclude[te])) && (y.models = [...new Set(I)], y.include = [...new Set(O)], y.exclude = [...new Set(L)], v = !0);
    };
    for (const y of o.checks)
      b(y.a), b(y.b), y.modelsAtRun && (y.modelsAtRun = y.modelsAtRun.map(p));
    for (const y of o.sets) {
      const I = y.selection.models.map(p);
      I.some((O, L) => O !== y.selection.models[L]) && (y.selection.models = [...new Set(I)], v = !0);
    }
    return v && D(), v;
  }, me = () => {
    const r = R();
    if (r)
      for (const l of i.querySelectorAll("[data-side]")) {
        const c = l.dataset.side, p = d?.elements.filter(
          (y) => (r.includeHidden || !y.hidden) && je(y, r[c])
        ).length || 0, x = r[c].manualOnly ? re(r[c]) : r[c].modelsMode === "selected" ? r[c].models : (d?.models || []).map((y) => y.id), v = !!d && x.every((y) => d.indexedModelIds.includes(y)), b = l.querySelector(
          "[data-selection-count]"
        );
        b && (b.textContent = v ? `${p} элементов` : "число после запуска");
      }
  };
  function K() {
    e.markers(
      V(),
      f,
      A,
      (r) => G(() => oe(r, !0))
    );
  }
  function oe(r, l = !1) {
    if (!w) {
      if (f = r, m === "results") {
        const c = V().findIndex((x) => x.id === r), p = c < 0 ? g : Math.floor(c / 50);
        p !== g && (g = p, ee());
        for (const x of i.querySelectorAll("[data-result]"))
          x.classList.toggle("active", x.dataset.result === r);
        pe(), requestAnimationFrame(() => {
          [...i.querySelectorAll("[data-result]")].find(
            (v) => v.dataset.result === r
          )?.scrollIntoView({ block: "nearest", inline: "nearest" });
        });
      }
      if (K(), l) {
        const c = R()?.results.find((p) => p.id === r);
        c && (e.focus(c, Number(h("distance").value)), W(c));
      }
    }
  }
  function W(r) {
    clearTimeout(z);
    const l = ++Y, c = Number(h("distance").value);
    r.image && r.imageScope === "pair-ab" && r.imageDistance === c || !e.canLocate(r) || (z = window.setTimeout(async () => {
      if (!(l !== Y || w || f !== r.id))
        try {
          const p = await e.snapshot(
            r,
            c,
            () => l !== Y || w || f !== r.id,
            !1,
            !1
          );
          if (l !== Y || f !== r.id) return;
          r.image = p, r.imageScope = "pair-ab", r.imageDistance = c, D(), m === "results" && pe();
        } catch (p) {
          l === Y && f === r.id && k(
            "Не удалось создать снимок выбранной коллизии: " + (p instanceof Error ? p.message : String(p)),
            !0
          );
        }
    }, 500));
  }
  async function Ie(r) {
    M = !1, F(!0), $("Создание снимка пары");
    try {
      const l = Number(h("distance").value);
      r.image = await e.snapshot(r, l, () => M), r.imageScope = "pair-ab", r.imageDistance = l, D(), m === "results" && f === r.id && pe();
    } catch (l) {
      k(
        "Результаты сохранены. Снимок пары не создан: " + (l instanceof Error ? l.message : String(l)),
        !0
      );
    } finally {
      Z(), F(!1);
    }
  }
  async function ke(r, l = !1) {
    ge(), $("Подготовка моделей");
    let c = l ? /* @__PURE__ */ new Set() : se(r);
    if (!l && c?.size) {
      const p = await e.scan(
        (x) => $(x),
        () => M,
        /* @__PURE__ */ new Set()
      );
      d = p, le(p.models) && (c = se(r));
    }
    d = await e.scan(
      (p) => {
        k(p), $(p);
      },
      () => M,
      c
    ), h("model-count").textContent = `Проиндексировано моделей: ${d.indexedModelIds.length} из ${d.models.length} · элементов: ${d.elements.length}`, N(), k(
      d.blockers.length ? d.blockers.join(" ") : d.warnings.length ? `Модели прочитаны с замечаниями. ${d.warnings.join(" ")}` : "Модели прочитаны. Настройте выборки и запустите проверку.",
      !!d.blockers.length
    );
  }
  const F = (r) => {
    w = r, r && (clearTimeout(z), Y++);
    for (const l of [
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
      h(l).disabled = r;
    h("cancel").hidden = !r, h("content").inert = r, h("checks").inert = r;
  };
  async function ce(r) {
    const l = (p) => {
      const x = `${r.name} · ${p.phase}`;
      k(`${x} ${p.done}/${p.total} · найдено ${p.found}`), $(x, p.done, p.total, p.found);
    };
    let c;
    try {
      c = new Mt();
    } catch {
      return vt(
        d.elements,
        r,
        l,
        () => M,
        (p) => e.geometry(p, () => M)
      );
    }
    return j = c, new Promise((p, x) => {
      const v = () => {
        c.terminate(), j = void 0, ie = void 0;
      };
      ie = () => {
        v(), x(Error("Расчёт отменён. Предыдущие результаты сохранены."));
      }, c.onmessage = async (b) => {
        if (b.data.load) {
          try {
            const y = await e.geometry(
              b.data.load,
              () => M || j !== c
            );
            if (j !== c) return;
            const I = [
              y.vertices?.buffer,
              y.indices?.buffer
            ].filter(Boolean);
            c.postMessage(
              { request: b.data.request, geometry: y },
              I
            );
          } catch (y) {
            j === c && c.postMessage({
              request: b.data.request,
              error: y instanceof Error ? y.message : String(y)
            });
          }
          return;
        }
        b.data.progress ? l(b.data.progress) : (v(), b.data.error ? x(Error(b.data.error)) : p(b.data.results));
      }, c.onerror = (b) => {
        v(), x(
          Error(
            `Не удалось запустить расчёт в фоновом потоке: ${b.message || "ошибка загрузки"}`
          )
        );
      }, c.postMessage({
        elements: d.elements,
        streaming: typeof e.geometry == "function",
        check: structuredClone({ ...r, results: [], warnings: [] })
      });
    });
  }
  async function ae(r = !1) {
    if (w) return;
    ge(), de();
    const l = r ? [...o.checks] : [R()].filter(Boolean);
    if (!l.length) throw Error("Создайте проверку.");
    for (const c of l)
      for (const p of [c.a, c.b])
        p.conditions = [], p.mode = "all";
    M = !1, F(!0), $("Подготовка моделей");
    try {
      if (await ke(l), F(!0), d.blockers.length)
        throw Error(
          "Состав моделей прочитан не полностью. " + d.blockers.join(" ")
        );
      for (const p of l) {
        if (M) break;
        for (const y of [p.a, p.b]) {
          if (y.modelsMode === "selected" && y.models.some((I) => !d.models.some((O) => O.id === I)))
            throw Error(
              `${p.name}: одна из моделей выборки отсутствует. Исправьте выборку.`
            );
          if (y.include.some((I) => !d.elements.some((O) => O.id === I)))
            throw Error(
              `${p.name}: вручную добавленный элемент отсутствует в модели.`
            );
        }
        const x = pt(p);
        if (p.configAtRun === x && p.modelsAtRun?.some(
          (y) => !d.models.some((I) => I.id === y)
        ))
          throw Error(
            `${p.name}: состав моделей уменьшился. Подключите прежние модели или создайте копию проверки для нового состава. Прежние результаты сохранены.`
          );
        const v = await ce(p);
        if (M || !e.isCurrent())
          throw Error(
            "Проект изменился или расчёт отменён. Предыдущие результаты сохранены."
          );
        const b = (/* @__PURE__ */ new Date()).toISOString();
        p.results = mt(
          p.configAtRun === x ? p.results : [],
          v,
          b
        ), p.lastRun = b, p.fingerprint = d.fingerprint, p.configAtRun = x, p.modelsAtRun = [...d.indexedModelIds], p.status = "done", p.warnings = [...d.warnings], u = p.id, f = p.results[0]?.id || "", S.clear(), D();
      }
      m = "results", N(), K(), k(
        `Проверка завершена. ${R()?.results.length || 0} результатов. Сохраните проверки для продолжения работы.`
      );
      const c = R()?.results.find((p) => p.id === f);
      c && !M && await Ie(c);
    } finally {
      Z(), F(!1), N();
    }
  }
  function be(r) {
    const l = r.closest("[data-side]")?.dataset.side;
    if (!l) return;
    const c = R()[l], p = r, x = r.closest("[data-side]");
    if (p.classList.contains("preset")) {
      c.presetId = p.value || void 0, x.querySelector(
        '[data-selection="delete-set"]'
      ).disabled = !c.presetId;
      return;
    }
    if (p.classList.contains("all-models")) {
      for (const v of x.querySelectorAll(
        ".model-check"
      ))
        v.checked = p.checked;
      c.modelsMode = p.checked ? "all" : "selected", c.models = [], c.manualOnly = !1, c.presetId = void 0;
    }
    if (p.classList.contains("model-check")) {
      const v = [
        ...x.querySelectorAll(".model-check")
      ], b = v.filter((I) => I.checked).map((I) => I.value), y = v.length > 0 && b.length === v.length;
      x.querySelector(".all-models").checked = y, c.modelsMode = y ? "all" : "selected", c.models = y ? [] : b, c.manualOnly = !1, c.presetId = void 0;
    }
    c.conditions = [], c.mode = "all", E(), me();
  }
  h("new").onclick = () => {
    const r = ct();
    r.name = `Проверка ${o.checks.length + 1}`, o.checks.push(r), u = r.id, m = "select", f = "", S.clear(), D(), N();
  }, h("scan").onclick = () => G(async () => {
    de(), M = !1, F(!0), $("Чтение моделей");
    try {
      const r = R();
      await ke(r ? [r] : void 0, !r);
    } finally {
      Z(), F(!1), N();
    }
  }), h("run").onclick = () => G(() => ae()), h("all").onclick = () => G(() => ae(!0)), h("cancel").onclick = () => {
    M = !0, ie?.();
  }, h("test-search").oninput = J, h("checks").onclick = (r) => {
    const l = r.target.closest(
      "[data-check]"
    );
    l && !w && (e.clear(), u = l.dataset.check, f = "", S.clear(), g = 0, N());
  }, h("tabs").onclick = (r) => {
    const l = r.target.closest("[data-tab]");
    l && !w && (m = l.dataset.tab, N());
  }, h("name").onchange = () => {
    const r = R();
    r && (r.name = h("name").value.trim() || "Проверка", D(), J());
  }, h("copy").onclick = () => {
    const r = R();
    if (!r) return;
    const l = structuredClone(r);
    Object.assign(l, {
      id: crypto.randomUUID(),
      name: r.name + " — копия",
      results: [],
      lastRun: void 0,
      fingerprint: void 0,
      configAtRun: void 0,
      status: "new"
    }), o.checks.push(l), u = l.id, f = "", S.clear(), D(), N();
  }, h("delete").onclick = () => {
    R() && confirm(`Удалить проверку «${R().name}» и её результаты?`) && (o.checks = o.checks.filter((r) => r.id !== u), u = o.checks[0]?.id || "", S.clear(), e.clear(), D(), N());
  }, h("clear-project").onclick = () => {
    !o.checks.length && !o.sets.length || confirm(
      "Очистить проверки, наборы моделей и результаты текущего проекта?"
    ) && (o.checks = [], o.sets = [], d = void 0, u = "", f = "", S.clear(), e.clear(), D(), h("model-count").textContent = "Модели не прочитаны", N(), k("Данные проверок текущего проекта очищены."));
  }, h("save").onclick = () => {
    Te("НашеПО-проверки.json", JSON.stringify(o, null, 2)), C = !1, h("dirty").textContent = "Файл проверок сохранён";
  }, h("open").onclick = () => h("file").click(), h("file").onchange = () => G(async () => {
    const r = h("file").files?.[0];
    if (!r) return;
    const l = et(await r.text());
    C && !confirm("Заменить текущие несохранённые проверки данными из файла?") || (o = l, s && ye.set(s, o), Je(n, o), u = o.checks[0]?.id || "", f = "", S.clear(), e.clear(), C = !1, h("dirty").textContent = "Проверки открыты", N(), k("Проверки открыты. Обновите модели перед переходом к элементам."), h("file").value = "");
  });
  for (const r of ["settings", "help"])
    h(r).onclick = () => h(r + "-dialog").showModal();
  for (const r of i.querySelectorAll("[data-close]"))
    r.onclick = () => h(r.dataset.close).close();
  h("content").onchange = (r) => G(() => {
    const l = r.target, c = R();
    if (!c) return;
    if (l.closest("[data-side]")) {
      be(l);
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
    ].includes(l.id)) {
      if (l.id === "precision") {
        const x = Number(l.value);
        if (!Number.isFinite(x) || x < 1e-3 || x > 100)
          throw l.value = String(c.precision), Error("Точность должна быть от 0,001 до 100 мм.");
        c.precision = x;
      }
      if (l.id === "min-penetration") {
        const x = Number(l.value);
        if (!Number.isFinite(x) || x < 0 || x > 1e5)
          throw l.value = String(c.minPenetration), Error(
            "Минимальная глубина должна быть от 0 до 100 000 мм."
          );
        c.minPenetration = x;
      }
      l.id === "type" && (c.type = l.value), l.id === "touching" && (c.touching = l.checked), l.id === "same-model" && (c.ignoreSameModel = l.checked), l.id === "same-group" && (c.ignoreSameGroup = l.checked), l.id === "hidden" && (c.includeHidden = l.checked), l.id === "equal-property" && (c.equalProperty = l.value), E(), N();
      return;
    }
    if (l.id === "result-state") {
      g = 0, ee();
      return;
    }
    if (l.id === "check-page") {
      for (const x of V().slice(g * 50, g * 50 + 50))
        l.checked ? S.add(x.id) : S.delete(x.id);
      ee();
      return;
    }
    if (l.classList.contains("row-check")) {
      const x = l.closest("[data-result]").dataset.result;
      l.checked ? S.add(x) : S.delete(x), h("selection-count").textContent = `Выбрано: ${S.size}`;
      return;
    }
    const p = c.results.find((x) => x.id === f);
    p && (l.id === "edit-state" && (p.state = l.value, ee(), J(), K()), l.id === "assignee" && (p.assignee = l.value), l.id === "note" && (p.note = l.value, ee()), D());
  }), h("content").oninput = (r) => {
    const l = r.target;
    (l.id === "result-search" || l.id === "result-depth") && (g = 0, ee());
    const c = R(), p = Number(l.value);
    c && l.id === "precision" && Number.isFinite(p) && p >= 1e-3 && p <= 100 && (c.precision = p, E()), c && l.id === "min-penetration" && Number.isFinite(p) && p >= 0 && p <= 1e5 && (c.minPenetration = p, E());
  }, h("content").onclick = (r) => G(async () => {
    const l = r.target, c = l.closest("button"), p = R();
    if (!p) return;
    if (c?.dataset.selection) {
      const v = c.closest("[data-side]").dataset.side, b = p[v], y = h("content").scrollTop;
      let I = !0;
      switch (c.dataset.selection) {
        case "load-set": {
          const O = o.sets.find((L) => L.id === b.presetId);
          if (!O) throw Error("Выберите сохранённый набор моделей.");
          Object.assign(b, structuredClone(O.selection), {
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
          if (b.manualOnly)
            throw Error(
              "Ручную выборку элементов нельзя сохранить как набор моделей."
            );
          const O = await ue();
          if (!O) return;
          const L = {
            id: crypto.randomUUID(),
            name: O,
            selection: {
              models: [...b.models],
              modelsMode: b.modelsMode,
              conditions: [],
              mode: "all"
            }
          };
          o.sets.push(L), b.presetId = L.id, I = !1;
          break;
        }
        case "delete-set": {
          const O = o.sets.find((L) => L.id === b.presetId);
          if (!O) throw Error("Выберите сохранённый набор моделей.");
          if (!confirm(`Удалить набор «${O.name}»?`)) return;
          o.sets = o.sets.filter((L) => L.id !== O.id);
          for (const L of o.checks)
            for (const _ of [L.a, L.b])
              _.presetId === O.id && (_.presetId = void 0);
          I = !1;
          break;
        }
        case "show":
          e.select(
            (d?.elements || []).filter((O) => (p.includeHidden || !O.hidden) && je(O, b)).map((O) => O.id)
          );
          return;
        case "only": {
          const O = e.selected();
          if (!O.length) throw Error("Выделите элементы в 3D-сцене.");
          b.include = O, b.exclude = [], b.manualOnly = !0;
          break;
        }
        case "include": {
          const O = e.selected();
          if (!O.length) throw Error("Выделите элементы в 3D-сцене.");
          b.include = [.../* @__PURE__ */ new Set([...b.include, ...O])], b.exclude = b.exclude.filter((L) => !O.includes(L));
          break;
        }
        case "exclude": {
          const O = e.selected();
          if (!O.length) throw Error("Выделите элементы в 3D-сцене.");
          b.exclude = [.../* @__PURE__ */ new Set([...b.exclude, ...O])], b.include = b.include.filter((L) => !O.includes(L));
          break;
        }
        case "reset":
          b.manualOnly = !1, b.include = [], b.exclude = [];
      }
      I ? E() : D(), N(), h("content").scrollTop = y;
      return;
    }
    if (c?.id === "prev-page" && (g--, ee()), c?.id === "next-page" && (g++, ee()), c?.id === "show-markers" && (A = !A, c.textContent = A ? "● Знаки включены" : "○ Знаки выключены", c.setAttribute("aria-checked", String(A)), K()), c?.id === "bulk") {
      const v = h("bulk-state").value;
      for (const b of p.results) S.has(b.id) && (b.state = v);
      D(), ee(), pe(), J(), K();
    }
    if (c?.id === "capture-image") {
      const v = p.results.find((b) => b.id === f);
      if (v) {
        M = !1, F(!0), $("Создание снимка пары");
        try {
          v.image = await e.snapshot(
            v,
            Number(h("distance").value),
            () => M,
            !0
          ), v.imageScope = "pair-ab", v.imageDistance = void 0, D(), pe(), k("Снимок сохранён в результат.");
        } finally {
          Z(), F(!1);
        }
      }
      return;
    }
    if (c?.id === "open-image") {
      const v = p.results.find((b) => b.id === f);
      if (v?.image) {
        const b = document.createElement("dialog");
        b.className = "image-dialog", b.innerHTML = '<button>Закрыть</button><img alt="Снимок коллизии">', b.querySelector("img").src = v.image, b.querySelector("button").onclick = () => {
          b.close(), b.remove();
        }, i.append(b), b.showModal();
      }
      return;
    }
    if (c?.id === "focus" && oe(f, !0), c?.id === "previous" || c?.id === "next") {
      const v = V(), b = v.findIndex((y) => y.id === f) + (c.id === "next" ? 1 : -1);
      v[b] && oe(v[b].id, !0);
    }
    if (c?.id === "export-html" || c?.id === "export-viewer") {
      let v = 0;
      const b = h("selected-only").checked ? p.results.filter((I) => S.has(I.id)) : p.results;
      if (!b.length) throw Error("Нет результатов для отчёта.");
      if (h("report-images").checked) {
        const I = e.view, O = I?.storeView(), L = Number(h("distance").value);
        M = !1, F(!0), $("Подготовка снимков отчёта", 0, b.length);
        try {
          await e.captureWorkspace(async () => {
            let _ = 0;
            for (const te of b) {
              if (M)
                throw Error(
                  "Подготовка отчёта отменена. Уже полученные снимки сохранены."
                );
              $(
                "Подготовка снимков отчёта",
                _,
                b.length
              ), k("Подготовка снимков: " + (_ + 1) + " / " + b.length);
              const at = te.imageScope !== "pair-ab" || te.imageDistance !== void 0 && te.imageDistance !== L;
              if (!te.image || at) {
                if (te.state === "resolved" && !e.canLocate(te)) {
                  _++;
                  continue;
                }
                try {
                  te.image = await e.snapshot(te, L, () => M), te.imageScope = "pair-ab", te.imageDistance = L, D();
                } catch (rt) {
                  if (M || !e.isCurrent()) throw rt;
                  v++;
                }
              }
              _++, $("Подготовка снимков отчёта", _, b.length);
            }
          });
        } finally {
          if (I && e.isCurrent()) {
            const _ = p.results.find((te) => te.id === f);
            if (_)
              try {
                e.focus(_, L, !1);
              } catch {
              }
            O && I.restoreView(O);
          }
          Z(), F(!1);
        }
      }
      const y = h("report-images").checked ? b.map(
        (I) => I.imageScope === "pair-ab" ? I : { ...I, image: void 0 }
      ) : b.map((I) => ({ ...I, image: void 0 }));
      Te(
        p.name + (c.id === "export-html" ? ".html" : ".collision360.json"),
        c.id === "export-html" ? kt(p, y) : St(p, y)
      ), k(
        "Отчёт подготовлен. Результатов: " + b.length + "; со снимками: " + y.filter((I) => I.image).length + "." + (v ? ` Не удалось создать снимков: ${v}; эти строки включены без изображения.` : ""),
        v > 0
      );
    }
    const x = l.closest("[data-result]");
    x && !l.closest("input") && !window.getSelection()?.toString() && oe(x.dataset.result);
  }), h("content").ondblclick = (r) => {
    const l = r.target, c = l.closest("[data-result]");
    c && !l.closest("input") && G(() => oe(c.dataset.result, !0));
  };
  const ot = setInterval(() => {
    w || (ge() ? (h("model-count").textContent = "Модели не прочитаны", k(
      o.checks.length ? "Открыт другой проект. Показаны его проверки; обновите модели." : "Открыт другой проект. Для него ещё нет проверок."
    ), w || N()) : d && !e.isCurrent() && (d = void 0, e.clear(), h("model-count").textContent = "3D-окно изменилось", k("Активное 3D-окно изменилось. Обновите модели."), w || N()));
  }, 1500);
  return N(), () => {
    a(), clearInterval(ot), clearTimeout(z), Y++, M = !0, ie?.(), j?.terminate(), e.clear();
  };
}
var Be = /* @__PURE__ */ ((t) => (t.object = "object", t.drawing = "drawing", t.table = "table", t.record = "record", t.textStyle = "textstyle", t.textStyleTable = "textstyles", t.linetype = "linetype", t.linetypeTable = "linetypes", t.layer = "layer", t.layerTable = "layers", t.block = "block", t.blockTable = "blocks", t.layout = "layout", t.layoutTable = "layouts", t.type = "type", t.typeTable = "types", t.material = "material", t.materialTable = "materials", t.geometry = "geometry", t.geometryTable = "geometries", t.group = "group", t.groupTable = "groups", t.attachment = "attachment", t.attachmentTable = "attachments", t.entities = "entities", t.entity = "entity", t.line = "l", t.solid = "s", t.insert = "i", t.polyline = "p", t.circle = "c", t.arc = "a", t.polyline3d = "p3", t.proxy = "x", t.text = "t", t.mtext = "mt", t.wipeout = "w", t.model3d = "g", t.alignment = "al", t))(Be || {});
const Ge = () => new Promise((t) => requestAnimationFrame(() => t()));
function nt(t) {
  const { width: e, height: i } = t.camera, a = Array.from(document.querySelectorAll("canvas")).filter(
    (n) => {
      const o = n.getBoundingClientRect();
      return o.width > 100 && o.height > 100 && n.width > 0 && n.height > 0 && getComputedStyle(n).visibility !== "hidden" && (Math.abs(o.width - e) < 4 && Math.abs(o.height - i) < 4 || Math.abs(n.width - e) < 4 && Math.abs(n.height - i) < 4);
    }
  );
  if (!a.length)
    throw Error(
      "Снимок 3D-окна недоступен: откройте одно видимое окно модели."
    );
  const s = a[0].getBoundingClientRect();
  if (a.some((n) => {
    const o = n.getBoundingClientRect();
    return Math.abs(o.x - s.x) > 4 || Math.abs(o.y - s.y) > 4;
  }))
    throw Error(
      "Открыто несколько подходящих 3D-окон. Оставьте одно окно для снимка."
    );
  return { candidates: a, rect: s };
}
async function At(t) {
  await Ge(), t.repaint();
  const { candidates: e, rect: i } = nt(t), a = document.createElement("canvas");
  a.width = Math.max(1, Math.round(i.width * devicePixelRatio)), a.height = Math.max(1, Math.round(i.height * devicePixelRatio)), Object.assign(a.style, {
    position: "fixed",
    left: `${i.left}px`,
    top: `${i.top}px`,
    width: `${i.width}px`,
    height: `${i.height}px`,
    zIndex: "2147483646",
    pointerEvents: "none"
  });
  const s = a.getContext("2d");
  for (const n of e)
    s.drawImage(n, 0, 0, a.width, a.height);
  return document.body.append(a), async () => {
    t.repaint(), await Ge(), a.remove();
  };
}
async function Ct(t, e) {
  if (await Ge(), e()) throw Error("Подготовка снимков отменена.");
  const { candidates: i } = nt(t), a = document.createElement("canvas"), s = Math.min(1, 1280 / i[0].width);
  a.width = Math.round(i[0].width * s), a.height = Math.round(i[0].height * s);
  const n = a.getContext("2d");
  n.fillStyle = "#20242b", n.fillRect(0, 0, a.width, a.height), t.repaint();
  for (const o of i)
    n.drawImage(o, 0, 0, a.width, a.height);
  try {
    return a.toDataURL("image/jpeg", 0.82);
  } catch {
    throw Error("Браузер запретил чтение изображения 3D-окна.");
  }
}
const De = "nashepo.checks.points", We = "nashepo.checks.highlight";
function Xe(t) {
  let e = performance.now();
  return async () => {
    if (t()) throw Error("Операция отменена.");
    performance.now() - e >= 16 && (await new Promise((i) => setTimeout(i, 0)), e = performance.now());
  };
}
function Ce(t, e, i, a = 0) {
  if (a > 12 || t == null) return;
  if (typeof t != "object") {
    i[e] = String(t);
    return;
  }
  if (Array.isArray(t)) {
    t.forEach((n, o) => Ce(n, `${e}[${o}]`, i, a + 1));
    return;
  }
  const s = t;
  if ("$value" in s) {
    Ce(s.$value, e, i, a + 1);
    return;
  }
  for (const [n, o] of Object.entries(s))
    n.startsWith("$") || Ce(o, e ? `${e}.${n}` : n, i, a + 1);
}
function $t(t) {
  const e = t.vertices.length / 3, i = (o) => Number.isFinite(t.vertices[o * 3]) && Number.isFinite(t.vertices[o * 3 + 1]) && Number.isFinite(t.vertices[o * 3 + 2]), a = (o) => {
    const d = t.indices[o], u = t.indices[o + 1], m = t.indices[o + 2];
    return d < e && u < e && m < e && d !== u && u !== m && m !== d && i(d) && i(u) && i(m);
  };
  let s = 0;
  for (let o = 0; o < t.indices.length; o += 3) a(o) && (s += 3);
  if (s === t.indices.length) return t.indices;
  const n = new Uint32Array(s);
  for (let o = 0, d = 0; o < t.indices.length; o += 3)
    a(o) && (n[d++] = t.indices[o], n[d++] = t.indices[o + 1], n[d++] = t.indices[o + 2]);
  return n;
}
const Pe = (t) => /\.wdx(?:[?#].*)?$/i.test(t);
class Ot {
  constructor(e) {
    this.ctx = e;
  }
  ctx;
  metadata = /* @__PURE__ */ new Map();
  refs = /* @__PURE__ */ new Map();
  overlay;
  overlaySurfaces = [];
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
      const a = this.ctx.manager.panelBar;
      a?.visible && (this.captureLayout = {
        panel: a,
        size: a.size,
        maximized: a.maximized
      }, a.maximized = !1, a.size = Math.min(a.size, 120), await new Promise(
        (s) => requestAnimationFrame(() => requestAnimationFrame(() => s()))
      ));
    }
    try {
      return await e();
    } finally {
      if (this.captureDepth--, i && this.captureLayout) {
        const { panel: a, size: s, maximized: n } = this.captureLayout;
        this.captureLayout = void 0, a.size = s, a.maximized = n, await new Promise(
          (o) => requestAnimationFrame(() => requestAnimationFrame(() => o()))
        );
      }
    }
  }
  async scan(e, i, a) {
    const s = this.app, n = this.view, o = s?.model;
    if (!n || !o?.layouts || !o.attachments)
      throw Error(
        "Откройте проект Топоматик 360 с IFC или SMDX и сделайте его 3D-окно активным."
      );
    const d = [], u = /* @__PURE__ */ new Set(), m = [], f = [], g = [], w = /* @__PURE__ */ new Map(), M = /* @__PURE__ */ new Set();
    let j = 2166136261;
    const A = Xe(
      () => i() || s !== this.app || n !== this.view
    );
    let C = -1 / 0;
    const S = (z) => {
      for (let Y = 0; Y < z.length; Y++)
        j = Math.imul(j ^ z.charCodeAt(Y), 16777619);
    }, ie = async (z, Y, R) => {
      if (M.has(z)) return;
      M.add(z);
      const h = z.layers.layer0?.modelName || Y, B = Y, k = Pe(h) || Pe(B), $ = (E, P) => {
        u.has(E) || (u.add(E), d.push({ id: E, name: P }));
      };
      k || $(B, h);
      const Z = !k && (!a || a.has(B)), G = [];
      (Z || k) && z.layouts.model?.walk((E) => (E.type === Be.model3d ? G.push(E) : E.type === Be.insert && m.push(`${h}: вставка блока не включена в расчёт.`), !1));
      const ue = /* @__PURE__ */ new Map();
      for (const E of G) {
        let P = E.layer, U = "";
        for (; P; ) {
          if (P.modelName && !Pe(P.modelName)) {
            U = P.modelName;
            break;
          }
          P = P.layer;
        }
        const V = k ? U || "Модель проекта" : h, J = k ? U || `${Y}/#model` : B;
        if (k && $(J, V), a && !a.has(J)) continue;
        const T = JSON.stringify([
          E.layer?.UUID || "",
          E.$id || E.$path
        ]);
        ue.set(JSON.stringify([J, T]), {
          key: T,
          objects: [E],
          modelId: J,
          modelName: V
        });
      }
      let D = 0;
      for (const E of ue.values()) {
        const { key: P, objects: U, modelId: V, modelName: J } = E;
        if (i()) throw Error("Чтение моделей отменено.");
        if (s !== this.app || n !== this.view)
          throw Error(
            "Активный проект изменился. Запустите чтение моделей заново."
          );
        const T = U[0].layer, N = {};
        try {
          if (T) {
            const K = [];
            let oe = T;
            for (; oe && K.length < 64; )
              K.unshift(oe), oe = oe.layer;
            for (const W of K)
              Ce(W.typedProperties(), "", N), W.typed?.name && (N.Тип = W.typed.name);
          }
        } catch {
          m.push(`${J} / ${P}: часть свойств недоступна.`);
        }
        const ee = N["ifc.id"] || Object.entries(N).find(
          ([K]) => /(^|\.)(globalid|ifcguid|guid)$/i.test(K)
        )?.[1] || "", pe = T?.name || U[0].$id || "Элемент", re = JSON.stringify([V, P]);
        Object.assign(N, {
          Модель: J,
          Имя: pe,
          GUID: ee,
          Объект: T?.UUID || P
        });
        const de = {
          min: [1 / 0, 1 / 0, 1 / 0],
          max: [-1 / 0, -1 / 0, -1 / 0]
        };
        let se = !0, ne = !1, le = 0;
        for (const K of U) {
          se &&= K.isClosed;
          for (const oe of Object.values(K.meshes)) {
            const W = oe.geometry;
            if (!W || W.indices.length % 3) {
              ne = !0;
              continue;
            }
            se &&= oe.isClosed;
            for (let F = 0; F < W.vertices.length; F += 3) {
              const ce = [
                W.vertices[F],
                W.vertices[F + 1],
                W.vertices[F + 2]
              ];
              if (Math3d.mat4.mulv3(ce, K.matrix, ce), !ce.every(Number.isFinite)) {
                ne = !0;
                continue;
              }
              for (let ae = 0; ae < 3; ae++)
                de.min[ae] = Math.min(de.min[ae], ce[ae]), de.max[ae] = Math.max(de.max[ae], ce[ae]);
              if (S(ce.join(",")), F % 6e4 === 0 && (performance.now() - C > 200 && (C = performance.now(), e(
                "Индексирование: " + J + " · " + g.length + " элементов"
              )), await A(), i()))
                throw Error("Чтение моделей отменено.");
            }
            const Ie = W.vertices.length / 3, ke = (F) => Number.isFinite(W.vertices[F * 3]) && Number.isFinite(W.vertices[F * 3 + 1]) && Number.isFinite(W.vertices[F * 3 + 2]);
            for (let F = 0; F < W.indices.length; F += 3) {
              const ce = W.indices[F], ae = W.indices[F + 1], be = W.indices[F + 2];
              if (j = Math.imul(j ^ ce, 16777619), j = Math.imul(j ^ ae, 16777619), j = Math.imul(j ^ be, 16777619), ce < Ie && ae < Ie && be < Ie && ce !== ae && ae !== be && be !== ce && ke(ce) && ke(ae) && ke(be) ? le++ : ne = !0, F % 15e4 === 0 && (await A(), i()))
                throw Error("Чтение моделей отменено.");
            }
          }
        }
        if (ne || !le) {
          if (le || D++, !le) continue;
          se = !1;
        }
        const me = {
          id: re,
          name: pe,
          model: J,
          modelId: V,
          guid: ee,
          properties: N,
          hidden: R || !!T?.resolveHidden() || !!T?.resolveDisabled(),
          triangles: new Float64Array(0),
          triangleCount: le,
          closed: se,
          bounds: de
        };
        S(JSON.stringify([re, N, me.hidden])), g.push(me), w.set(re, U);
      }
      D && m.push(
        `${h}: пропущено элементов без треугольной геометрии — ${D}.`
      );
      const ge = [];
      z.attachments.forEach((E) => {
        ge.push(E);
      });
      for (const E of ge) {
        const P = E.name || E.uri || E.$id, U = P || "Подключённая модель", V = `${Y}/${P || "attachment"}`;
        E.model || $(V, U), E.model ? await ie(
          E.model,
          V,
          R || E.hidden
        ) : (!a || a.has(V)) && f.push(
          `${U}: модель не загружена. Откройте её перед расчётом.`
        );
      }
    };
    if (await ie(o, o.layers.layer0?.modelName || "Проект", !1), !g.length && (!a || a.size > 0)) {
      const z = a ? [...a].filter((Y) => !u.has(Y)) : [];
      throw Error(
        z.length ? `Сохранённая выборка ссылается на модели, которых нет в текущем составе: ${z.join(", ")}. Обновите список моделей.` : d.length ? "В выбранных моделях не найдены 3D-элементы с доступной геометрией. Проверьте, что модели загружены, и выберите нужные файлы." : "В открытом проекте не обнаружены IFC/SMDX-модели. Проверьте состав подключений проекта."
      );
    }
    return this.clear(), this.refs = w, this.metadata = new Map(g.map((z) => [z.id, z])), this.scannedApp = s, this.scannedView = n, {
      elements: g,
      fingerprint: `${g.length}:${j >>> 0}`,
      warnings: [...new Set(m)],
      blockers: [...new Set(f)],
      models: d,
      indexedModelIds: d.filter((z) => !a || a.has(z.id)).map((z) => z.id)
    };
  }
  async geometry(e, i) {
    const a = Xe(() => i() || !this.isCurrent());
    if (!this.isCurrent()) throw Error("Активная модель изменилась.");
    const s = this.metadata.get(e), n = this.refs.get(e);
    if (!s || !n) throw Error("Элемент отсутствует.");
    const o = n.flatMap(
      (M) => Object.values(M.meshes).flatMap((j) => {
        const A = j.geometry;
        if (!A || A.indices.length % 3) return [];
        const C = $t(A);
        return C.length ? [{ object: M, g: A, indices: C }] : [];
      })
    );
    let d = 0, u = 0;
    for (const { g: M, indices: j } of o) {
      if (!M) throw Error("Геометрия недоступна.");
      d += M.vertices.length, u += j.length;
    }
    const m = new Float64Array(d), f = new Uint32Array(u);
    let g = 0, w = 0;
    for (const { object: M, g: j, indices: A } of o) {
      if (!j) throw Error("Геометрия недоступна.");
      for (let C = 0; C < j.vertices.length; C += 3) {
        const S = [j.vertices[C], j.vertices[C + 1], j.vertices[C + 2]];
        if (Math3d.mat4.mulv3(S, M.matrix, S), m.set(S, g + C), C % 6e4 === 0 && (await a(), i() || !this.isCurrent()))
          throw Error("Чтение геометрии отменено.");
      }
      for (let C = 0; C < A.length; C++)
        if (f[w + C] = g / 3 + A[C], C % 15e4 === 0 && (await a(), i()))
          throw Error("Чтение геометрии отменено.");
      g += j.vertices.length, w += A.length;
    }
    return { ...s, vertices: m, indices: f };
  }
  selected() {
    if (!this.isCurrent())
      throw Error("Сначала обновите модели текущего проекта.");
    const e = new Set(this.view?.layer.selectedObjects());
    return [...this.refs].filter(([, i]) => i.some((a) => e.has(a))).map(([i]) => i);
  }
  select(e) {
    if (!this.isCurrent())
      throw Error("Сначала обновите модели текущего проекта.");
    const i = new Set(e.flatMap((a) => this.refs.get(a) || []));
    this.view.layer.clearSelected(), this.view.layer.selectObjects((a) => i.has(a), !0), this.view.invalidate();
  }
  clear() {
    if (this.overlay && (this.overlay.view.layer.removeLayer(this.overlay.layer), this.overlay.view.invalidate(), this.overlay = void 0, this.overlaySurfaces = []), this.pointView) {
      const e = this.pointView.annotations.get(De);
      e && this.pointView.annotations.release(e), this.pointView.invalidate(), this.pointView = void 0;
    }
  }
  focus(e, i, a = !0) {
    if (!this.isCurrent())
      throw Error("Обновите модели текущего проекта перед переходом.");
    if (!Number.isFinite(i) || i < 0.5)
      throw Error("Дистанция камеры должна быть не менее 0,5 м.");
    if (!this.refs.has(e.a.id) || !this.refs.has(e.b.id))
      throw Error("Один из элементов отсутствует в загруженных моделях.");
    const s = e.point, n = this.view;
    n.camera?.id !== "3d" && n.setCameraType("3d"), n.pauseAnimation?.(), this.highlight(e), this.select([e.a.id, e.b.id]);
    const o = [-0.65, 0.65, -0.394], d = Math.hypot(...o);
    o.forEach((u, m) => o[m] = u / d), n.lookAt(
      s.map((u, m) => u - o[m] * i),
      o,
      [0, 0, 1],
      a,
      s
    );
  }
  highlight(e) {
    this.overlayError = void 0;
    const i = this.view;
    this.overlay && this.overlay.view !== i && (this.overlay.view.layer.removeLayer(this.overlay.layer), this.overlay = void 0, this.overlaySurfaces = []);
    const a = [
      { id: e.a.id, color: 4281743103 },
      { id: e.b.id, color: 915144703 }
    ];
    if (this.overlaySurfaces = a.flatMap(
      ({ id: o, color: d }, u) => [...new Set(this.refs.get(o) || [])].flatMap(
        (m) => Object.values(m.meshes).flatMap((f) => {
          const g = f.geometry;
          if (!g) return [];
          const w = {
            // SDK fields may be prototype getters rather than own properties.
            uuid: `${We}.${u}.${g.uuid}`,
            vertices: g.vertices,
            indices: g.indices,
            normals: g.normals,
            bounds: g.bounds,
            colors: new Uint32Array(g.vertices.length / 3).fill(d)
          };
          return [{ obj: m, geometry: w, color: d }];
        })
      )
    ), this.overlay) {
      this.overlay.layer.visible = !0, i.invalidate(!0);
      return;
    }
    let s;
    s = {
      id: We,
      order: 1e4,
      visible: !0,
      paint: () => {
      },
      paint3d: (o) => {
        const d = o.color, u = o.rasterizer.material;
        o.rasterizer.material = void 0;
        try {
          for (const { obj: m, geometry: f, color: g } of this.overlaySurfaces) {
            o.color = g, o.pushMatrix();
            try {
              o.multMatrix(m.matrix), o.mesh(f);
            } finally {
              o.popMatrix();
            }
          }
        } catch (m) {
          s.visible = !1, this.overlayError = new Error(
            "Не удалось отрисовать подсветку пары: " + (m instanceof Error ? m.message : String(m))
          );
        } finally {
          o.color = d, o.rasterizer.material = u;
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
    }, i.layer.addLayer(s), this.overlay = { view: i, layer: s }, i.invalidate();
  }
  async snapshot(e, i, a, s = !1, n = !0) {
    const o = () => this.snapshotInWorkspace(e, i, a, s);
    return n ? this.captureWorkspace(o) : o();
  }
  async snapshotInWorkspace(e, i, a, s = !1) {
    if (!this.isCurrent())
      throw Error("Обновите модели перед созданием снимков.");
    if (!this.canLocate(e))
      throw Error("Элементы результата отсутствуют в открытых моделях.");
    const n = this.view, o = n.layer.drawing;
    if (!o)
      throw Error(
        "Слой моделей недоступен для снимка пары. Откройте 3D-окно проекта."
      );
    const d = o.visible, u = n.annotations.visible, m = new Set(n.layer.selectedObjects());
    let f;
    try {
      s ? this.highlight(e) : this.focus(e, i, !1), n.pauseAnimation(), f = await At(n), n.layer.clearSelected(), o.visible = !1, n.annotations.visible = !1, n.invalidate();
      const g = await Ct(
        n,
        () => a() || !this.isCurrent()
      );
      if (this.overlayError) throw this.overlayError;
      return g;
    } finally {
      o.visible = d, n.annotations.visible = u, n.layer.clearSelected(), n.layer.selectObjects((g) => m.has(g), !0), n.invalidate(), await f?.();
    }
  }
  markers(e, i, a, s) {
    if (!this.isCurrent()) return;
    const n = this.view;
    this.pointView && this.pointView !== n && this.clear();
    const o = n.annotations.get(De);
    if (o && n.annotations.release(o), this.pointView = n, !a) {
      n.invalidate();
      return;
    }
    const d = n.annotations.create(De, 1e4), u = e.filter((m) => m.id !== i).concat(e.filter((m) => m.id === i));
    for (const m of u.slice(-3e3)) {
      if (m.state === "resolved") continue;
      const [f, g, w] = m.point, M = m.id === i, j = m.state === "excluded" ? "#78818c" : m.state === "approved" || m.state === "reviewed" ? "#28b94b" : "#e1372d", A = M ? "#f2c94c" : j, C = () => s(m.id), S = [
        { type: "line", a: [f, g, w], b: [f, g, w + 1], color: A, width: 5 },
        {
          type: "polyline",
          points: [
            [f - 0.65, g, w + 1],
            [f + 0.65, g, w + 1],
            [f, g, w + 2.2],
            [f - 0.65, g, w + 1]
          ],
          color: A,
          fillColor: j,
          width: M ? 5 : 2
        },
        {
          type: "line",
          a: [f, g - 0.01, w + 1.85],
          b: [f, g - 0.01, w + 1.4],
          color: "#ffffff",
          width: 4
        },
        {
          type: "line",
          a: [f, g - 0.01, w + 1.22],
          b: [f, g - 0.01, w + 1.27],
          color: "#ffffff",
          width: 4
        }
      ];
      d.add({
        id: m.id,
        type: "shaped",
        shapes: S,
        activeShapes: S,
        activateCommand: C,
        dblCommand: C
      }), M && d.add({
        id: m.id + ":label",
        type: "simple",
        position: [f, g, w + 2.35],
        label: `${m.a.name} × ${m.b.name}`,
        labelBackground: "#f2c94c",
        labelColor: "#171717",
        activateCommand: C
      });
    }
    n.invalidate();
  }
}
let Ke, qe, _e;
const zt = {
  open(t) {
    t.manager.revealView("nashepo.collisionfinder360/checks_panel");
  },
  mount(t) {
    const e = t.el;
    if (!e) return;
    if (qe && _e === t.manager) {
      e.replaceChildren(qe);
      return;
    }
    Ke?.();
    const i = document.createElement("div");
    i.style.height = "100%", e.replaceChildren(i), qe = i, _e = t.manager, Ke = Et(i, new Ot(t));
  }
};
export {
  zt as default
};
