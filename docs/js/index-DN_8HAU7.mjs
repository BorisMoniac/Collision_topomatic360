const wt = `<h2>Работа с проверками</h2>
<details open><summary>1. Первая проверка</summary><ol><li>Откройте проект и подключите IFC/SMDX штатными средствами Топоматик 360.</li><li>Откройте нижнюю вкладку «Проверки» и нажмите «Модели».</li><li>Нажмите «＋ Новая проверка» и задайте ей понятное имя.</li><li>Во вкладке «Выбор» оставьте галочки только у нужных файлов в А и Б. «Все модели» включено по умолчанию.</li><li>Выберите «По пересечению» или «Дублирование» и нажмите «Запустить».</li><li>Во вкладке «Результаты» дважды нажмите строку: камера направится к конфликту, элемент А будет выделен красным, элемент Б — синим, и оба элемента станут выделенными в 3D-окне.</li></ol><p>Первое обновление без созданной проверки получает только список файлов. При запуске индексируются модели, отмеченные хотя бы в одной стороне. Файл проекта WDX служит контейнером и в выбор моделей не попадает.</p></details>
<details><summary>2. Выбор моделей и сохранённые наборы</summary><p>Выбор А и выбор Б задают две стороны сравнения. Снимите «Все модели» и отметьте конкретные IFC/SMDX. Для поиска дубликатов внутри одного файла отметьте его с обеих сторон.</p><p>Часто используемый состав можно сохранить как набор моделей, а затем применить в другой проверке. Наборы входят в файл проверок. Состав выборки задаётся галочками моделей и ручным выделением объектов.</p><p>IFC GUID читается из свойства <code>ifc.id</code>; также поддерживаются GlobalId, IfcGuid и GUID.</p></details>
<details><summary>3. Работа с выделением в 3D</summary><p>Сначала выделите элементы штатными средствами в 3D-окне, затем используйте кнопку в нужной стороне:</p><ul><li><b>Показать выбранные элементы</b> — выделяет весь текущий состав.</li><li><b>Только выделенные в 3D</b> — оставляет только выделенные объекты.</li><li><b>＋ Добавить из 3D</b> — добавляет выделенные объекты к моделям.</li><li><b>− Исключить из 3D</b> — исключает выделенные объекты.</li><li><b>Сбросить ручной выбор</b> — снова использует отмеченные модели.</li></ul><p>Ручные идентификаторы могут измениться после замены IFC/SMDX, поэтому такую выборку следует проверить заново.</p></details>
<details><summary>4. Пересечения, глубина, касания и дубликаты</summary><p><b>Пересечение</b> определяется по треугольным поверхностям элементов и вложенности замкнутых тел. Габаритные коробки отбирают близкие пары; общий габарит также ограничивает область замера глубины. Одна пара элементов формирует один результат.</p><p><b>Расчётная глубина</b> — оценка локальной толщины перекрытия. Для контакта выбираются направления измерения, в том числе по его форме и нормалям граней. По ним измеряется общая часть проекций геометрии в области контакта и выбирается наименьшая пригодная ширина. Если обнаружены отдельные участки перекрытия, для пары сохраняется наибольшая из их глубин.</p><p>Это не длина трубы внутри другого элемента и не расстояние, на которое нужно переместить весь объект для устранения пересечения. Например, у длинного стержня сквозь плиту результат может определяться поперечным размером стержня. Объём пересечения — отдельная величина в кубических единицах; его нельзя непосредственно назвать глубиной в миллиметрах.</p><p><b>Ограничения метода.</b> Плагин не строит точное тело пересечения. Разделение контактов, выбор направлений и проверка заполнения являются оценкой. Для сложных невыпуклых и составных объектов, криволинейных поверхностей результат может зависеть от сетки и расположения геометрии. Заданная точность не гарантирует такую же погрешность итоговой глубины. Результаты около принятого допуска следует проверять в 3D.</p><p><b>Столбец глубины:</b></p><ul><li><b>Число</b> — полученная оценка в миллиметрах. Малые положительные значения показываются с дополнительными знаками, чтобы не превратиться в ноль при округлении.</li><li><b>Касание</b> — найден контакт без разрешённого объёмного перекрытия. Такие пары включаются настройкой «Учитывать касания» и могут отсекаться порогом глубины как нулевые.</li><li><b>Не определена</b> — сетка незамкнута либо не задаёт достаточного объёма для замера. Пересечение сохраняется, но глубина ему не приписывается.</li><li><b>Требует уточнения</b> — пересечение найдено, однако его глубина не разрешена текущим расчётом. Причиной может быть малая толщина относительно точности или неоднозначная геометрия контакта. Уменьшение точности иногда позволяет получить число, но не гарантирует этого.</li><li><b>≈</b> — приблизительная оценка: при измерении сокращалась выборка геометрии, точек или направлений либо разделение контактов достигло предела. Для числа не гарантируются ни величина, ни направление ошибки.</li></ul><p>«Не определена», «Требует уточнения» и значения со знаком ≈ остаются в результатах независимо от минимальной глубины. Их оценивает пользователь. Найденное малое пересечение не должно исчезать только из-за отключённого учёта касаний: для геометрических проверок используется отдельный численный запас, а настройка точности определяет разрешение замера.</p><p><b>Точность расчёта</b> задаётся в миллиметрах. <b>Минимальная глубина</b> — порог отбора результатов. Обычные числовые оценки сравниваются с порогом с запасом на точность: при минимуме 20 мм и точности 0,1 мм результат 19,95 мм остаётся. Этот порядок одинаков в расчёте, таблице и HTML-отчёте. После изменения точности или порога повторно запустите проверку.</p><p>Труба и отвод могут пересекаться в штатном соединении из-за формы исходной сетки. Такие соединения рассматриваются отдельно и при необходимости исключаются правилами.</p><p><b>Дублирование</b> ищет совпадающую треугольную геометрию в мировых координатах с заданной точностью. Геометрически одинаковые тела с разным разбиением поверхности на треугольники могут не считаться дубликатами.</p></details>
<details><summary>5. Составные объекты и неполная геометрия</summary><p>Один IFC-объект может состоять из нескольких частей. Чтобы не сравнивать его части между собой, включите «Не проверять геометрию одного составного объекта» во вкладке «Правила». Там же можно исключить пары одной модели или одинакового значения свойства.</p><p>Пустые и неполные геометрические части пропускаются, а пригодные части модели продолжают участвовать. Плагин показывает сводное замечание с количеством пропущенных элементов. Незагруженный подключённый файл блокирует расчёт только тогда, когда он входит в выборку.</p></details>
<details><summary>6. Результаты и состояния</summary><p>«Новый» найден впервые, «Активный» найден повторно, «Проверенный» рассмотрен, «Подтверждённый» подтверждён, «Исключённый» исключён из работы. «Исправленный» означает, что пара исчезла при повторном расчёте с теми же правилами; состояние можно изменить вручную.</p><p>В таблице доступны IFC GUID, расчётная глубина, назначение и комментарий. Фильтр «Глубина от» сохраняет строки «не определена», «требует уточнения» и приблизительные оценки со знаком ≈, чтобы такие конфликты не исчезали по ненадёжному числу. Галочки меняют состояние сразу у нескольких строк. Значения можно выделять и копировать. При переходе стрелками активная строка автоматически прокручивается в видимую область. Состояние «Устарела» у проверки означает, что после последнего расчёта изменили её тип, выборки, параметры или правила.</p></details>
<details><summary>7. Отчёт и снимки</summary><p>После перехода к коллизии отсутствующий снимок создаётся автоматически, если пользователь задержался на результате. Кадр строится от той же камеры приближения, что и снимки отчёта: ракурс задаёт «Дистанция камеры» в настройках. Если дистанцию изменить, отчёт переснимет прежние кадры под новое значение. Быстрое переключение стрелками отменяет лишние снимки. Во время технической перерисовки поверх 3D-окна сохраняется предыдущий кадр, поэтому модель не должна мигать.</p><p>Кнопка «Снимок пары» сохраняет текущий ракурс только с двумя элементами коллизии: элемент А показан красным, элемент Б — синим. Такой кадр собран вручную, поэтому отчёт его не переснимает. На время подготовки отчёта нижняя панель автоматически уменьшается для широкого 3D-кадра и затем возвращается к прежнему размеру. Файл сессии предназначен для открытия результатов в плагине «НашеПО · Коллизии».</p></details>
<details><summary>8. Проекты, сохранение и очистка</summary><p>В пределах открытой страницы каждый проект получает собственный список проверок. Сворачивание или повторное открытие нижней панели сохраняет проверки, результаты и комментарии в текущей вкладке. При переключении проекта данные предыдущего не подмешиваются. «Очистить проект» удаляет проверки, результаты и наборы только у текущего проекта.</p><p>«Сохранить проверки» записывает правила, наборы моделей, результаты, комментарии и снимки в JSON. «Открыть проверки» загружает этот файл. Геометрия в файл не входит: соответствующие модели надо открыть отдельно. После обновления или закрытия страницы для продолжения работы используйте сохранённый файл.</p></details>
<details><summary>9. Большие проекты</summary><p>Жёсткого предела в 6 млн треугольников нет. При запуске строится индекс только по отмеченным моделям. Точная геометрия передаётся в расчёт по мере появления близких пар в компактном индексированном виде.</p><p>Время и память всё равно зависят от состава выборок и числа потенциальных пар. Разделяйте проверки по моделям и системам. В сцене одновременно показывается до 3000 знаков; при 50 000 результатах расчёт останавливается без замены прежнего результата.</p></details>`;
function vt(t) {
  let e = t.parentElement, i;
  for (; e && !i; )
    i = [...e.children].find(
      (m) => m.classList.contains("resizer-horizontal")
    ), e = e.parentElement;
  if (!i) return () => {
  };
  const r = i, s = t.ownerDocument.defaultView;
  let n;
  const o = () => {
    if (n === void 0) return;
    const m = n;
    n = void 0, r.dispatchEvent(
      new MouseEvent("mouseup", { bubbles: !0, composed: !0 })
    ), r.hasPointerCapture(m) && r.releasePointerCapture(m);
  }, l = (m) => {
    m.button === 0 && (n = m.pointerId, r.setPointerCapture(m.pointerId));
  };
  return r.addEventListener("pointerdown", l), r.addEventListener("pointerup", o), r.addEventListener("pointercancel", o), r.addEventListener("lostpointercapture", o), s.addEventListener("blur", o), () => {
    o(), r.removeEventListener("pointerdown", l), r.removeEventListener("pointerup", o), r.removeEventListener("pointercancel", o), r.removeEventListener("lostpointercapture", o), s.removeEventListener("blur", o);
  };
}
const Mt = "0.7.1", Be = (t) => typeof t == "string" && /^data:image\/(jpeg|png);base64,[A-Za-z0-9+/=]+$/.test(t), Me = {
  new: "Новый",
  active: "Активный",
  reviewed: "Проверенный",
  approved: "Подтверждённый",
  resolved: "Исправленный",
  excluded: "Исключённый"
}, et = () => ({
  models: [],
  modelsMode: "all",
  conditions: [],
  mode: "all",
  include: [],
  exclude: []
}), kt = () => ({
  id: crypto.randomUUID(),
  name: "Новая проверка",
  type: "intersection",
  a: et(),
  b: et(),
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
}), tt = ({
  triangles: t,
  vertices: e,
  indices: i,
  triangleCount: r,
  closed: s,
  bounds: n,
  ...o
}) => o;
function Pe(t, e) {
  return e.exclude.includes(t.id) ? !1 : e.include.includes(t.id) ? !0 : !(e.manualOnly || e.modelsMode === "selected" && !e.models.includes(t.modelId) || e.modelsMode === void 0 && e.models.length && !e.models.includes(t.modelId));
}
const St = (t) => JSON.stringify([
  t.type,
  ...[t.a, t.b].map(
    ({
      models: e,
      modelsMode: i,
      conditions: r,
      mode: s,
      include: n,
      exclude: o,
      manualOnly: l
    }) => ({
      models: e,
      modelsMode: i,
      conditions: r,
      mode: s,
      include: n,
      exclude: o,
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
]), It = (t, e) => JSON.stringify([t, e].sort());
function jt(t, e, i) {
  const r = new Map(t.map((n) => [n.id, n])), s = e.map((n) => {
    const o = r.get(n.id);
    return r.delete(n.id), {
      ...n,
      note: o?.note ?? "",
      assignee: o?.assignee ?? "",
      firstSeen: o?.firstSeen ?? i,
      lastSeen: i,
      state: !o || o.state === "resolved" ? "new" : o.state === "new" ? "active" : o.state
    };
  });
  for (const n of r.values())
    s.push({
      ...n,
      state: n.state === "excluded" ? "excluded" : "resolved"
    });
  return s;
}
function ut(t) {
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
  const r = (s) => /\.wdx(?:[?#].*)?$/i.test(s);
  for (const s of e.sets)
    s.selection.models = s.selection.models.filter(
      (n) => !r(n)
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
    s.warnings ??= [], s.modelsAtRun = s.modelsAtRun?.filter((n) => !r(n));
    for (const n of [s.a, s.b]) {
      if (!n || n.manualOnly !== void 0 && typeof n.manualOnly != "boolean" || n.modelsMode !== void 0 && !["all", "selected"].includes(n.modelsMode) || n.presetId !== void 0 && typeof n.presetId != "string" || !["all", "any"].includes(n.mode) || ![n.models, n.include, n.exclude].every(
        (o) => Array.isArray(o) && o.every((l) => typeof l == "string")
      ) || !Array.isArray(n.conditions) || !n.conditions.every(
        (o) => o && typeof o.field == "string" && typeof o.value == "string" && ["eq", "ne", "contains", "exists", "gt", "lt"].includes(o.op)
      ))
        throw Error("Некорректная выборка.");
      n.modelsMode ??= n.models.length ? "selected" : "all", n.models = n.models.filter((o) => !r(o)), n.conditions = [], n.mode = "all";
    }
    for (const n of s.results) {
      if (n?.image !== void 0 && !Be(n.image))
        throw Error("Некорректный снимок результата.");
      if (n?.imageScope !== void 0 && n.imageScope !== "pair" && n.imageScope !== "pair-ab")
        throw Error("Некорректный состав снимка результата.");
      if (n?.imageDistance !== void 0 && (!Number.isFinite(n.imageDistance) || n.imageDistance < 0.5))
        throw Error("Некорректная дистанция снимка результата.");
      if (n?.unmeasured !== void 0 && typeof n.unmeasured != "boolean")
        throw Error("Некорректный признак измеримости результата.");
      if (n?.depth !== void 0 && !["tolerance", "approximate", "unmeasurable"].includes(n.depth))
        throw Error("Некорректная достоверность глубины результата.");
      if (n?.unmeasured && !n.depth && (n.depth = "unmeasurable"), !n || typeof n.id != "string" || !Object.hasOwn(Me, n.state) || n.penetrationMm !== void 0 && (!Number.isFinite(n.penetrationMm) || n.penetrationMm < 0) || !Array.isArray(n.point) || n.point.length !== 3 || !n.point.every(Number.isFinite))
        throw Error("Некорректный результат.");
      for (const o of [n.a, n.b])
        if (!o || !["id", "name", "model", "modelId", "guid"].every(
          (l) => typeof o[l] == "string"
        ) || !o.properties || typeof o.properties != "object")
          throw Error("Некорректный элемент результата.");
    }
  }
  return e;
}
const W = (t, e) => [t[0] - e[0], t[1] - e[1], t[2] - e[2]], Re = (t, e, i = 1) => [
  t[0] + e[0] * i,
  t[1] + e[1] * i,
  t[2] + e[2] * i
], re = (t, e) => t[0] * e[0] + t[1] * e[1] + t[2] * e[2], Ie = (t, e) => [
  t[1] * e[2] - t[2] * e[1],
  t[2] * e[0] - t[0] * e[2],
  t[0] * e[1] - t[1] * e[0]
], pe = (t) => Math.hypot(...t), mt = (t) => {
  const e = pe(t);
  return e > 1e-20 ? [t[0] / e, t[1] / e, t[2] / e] : void 0;
}, $e = (t) => t.triangleCount ?? (t.indices ? t.indices.length / 3 : t.triangles.length / 9), he = (t, e, i) => t.indices && t.vertices ? t.vertices[t.indices[e * 3 + Math.floor(i / 3)] * 3 + i % 3] : t.triangles[e * 9 + i], ke = (t, e) => [0, 3, 6].map((i) => [
  he(t, e, i),
  he(t, e, i + 1),
  he(t, e, i + 2)
]);
function Fe(t) {
  const e = [1 / 0, 1 / 0, 1 / 0], i = [-1 / 0, -1 / 0, -1 / 0];
  for (let r = 0; r < t.length; r++) {
    const s = r % 3;
    e[s] = Math.min(e[s], t[r]), i[s] = Math.max(i[s], t[r]);
  }
  return { min: e, max: i };
}
const Le = (t, e, i) => t.min.every((r, s) => r <= e.max[s] + i && t.max[s] >= e.min[s] - i);
function Je(t, e) {
  const i = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const l of e)
    for (let m = 0; m < 9; m++) {
      const f = m % 3, u = he(t, l, m);
      i.min[f] = Math.min(i.min[f], u), i.max[f] = Math.max(i.max[f], u);
    }
  if (e.length <= 12) return { ...i, ids: e };
  const r = i.max.map((l, m) => l - i.min[m]), s = r.indexOf(Math.max(...r)), n = (l) => he(t, l, s) + he(t, l, s + 3) + he(t, l, s + 6);
  e.sort((l, m) => n(l) - n(m));
  const o = e.length >> 1;
  return {
    ...i,
    left: Je(t, e.slice(0, o)),
    right: Je(t, e.slice(o))
  };
}
function* Oe(t, e, i) {
  Le(t, e, i) && (t.ids ? yield* t.ids : (yield* Oe(t.left, e, i), yield* Oe(t.right, e, i)));
}
function* ve(t, e, i) {
  if (Le(t, e, i)) {
    if (t.ids && e.ids) {
      for (const r of t.ids) for (const s of e.ids) yield [r, s];
      return;
    }
    if (t.ids) {
      yield* ve(t, e.left, i), yield* ve(t, e.right, i);
      return;
    }
    if (e.ids) {
      yield* ve(t.left, e, i), yield* ve(t.right, e, i);
      return;
    }
    yield* ve(t.left, e.left, i), yield* ve(t.left, e.right, i), yield* ve(t.right, e.left, i), yield* ve(t.right, e.right, i);
  }
}
function We(t, e) {
  const i = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const o of e)
    for (let l = 0; l < 3; l++)
      i.min[l] = Math.min(i.min[l], t[o].bounds.min[l]), i.max[l] = Math.max(i.max[l], t[o].bounds.max[l]);
  if (e.length <= 16) return { ...i, ids: e };
  const r = i.max.map((o, l) => o - i.min[l]), s = r.indexOf(Math.max(...r));
  e.sort(
    (o, l) => t[o].bounds.min[s] + t[o].bounds.max[s] - (t[l].bounds.min[s] + t[l].bounds.max[s])
  );
  const n = e.length >> 1;
  return {
    ...i,
    left: We(t, e.slice(0, n)),
    right: We(t, e.slice(n))
  };
}
function De(t, e, i, r) {
  const s = W(e, t), n = W(i[1], i[0]), o = W(i[2], i[0]), l = Ie(s, o), m = re(n, l);
  if (Math.abs(m) <= 1e-12 * pe(s) * pe(n) * pe(o)) return;
  const f = 1 / m, u = W(t, i[0]), h = re(u, l) * f, M = Ie(u, n), k = re(s, M) * f, A = re(o, M) * f, O = r / Math.max(pe(n), pe(o), r);
  if (h >= -O && k >= -O && h + k <= 1 + O && A >= -O && A <= 1 + O)
    return Re(t, s, Math.max(0, Math.min(1, A)));
}
function Et(t, e, i, r) {
  const s = i.map(Math.abs).indexOf(Math.max(...i.map(Math.abs))), n = [0, 1, 2].filter((m) => m !== s), o = (m, f, u) => (f[n[0]] - m[n[0]]) * (u[n[1]] - m[n[1]]) - (f[n[1]] - m[n[1]]) * (u[n[0]] - m[n[0]]), l = (m, f) => {
    const u = f.map((h, M) => o(h, f[(M + 1) % 3], m));
    return u.every((h) => h >= -r * pe(i)) || u.every((h) => h <= r * pe(i));
  };
  for (const m of t) if (l(m, e)) return m;
  for (const m of e) if (l(m, t)) return m;
  for (let m = 0; m < 3; m++)
    for (let f = 0; f < 3; f++) {
      const u = t[m], h = t[(m + 1) % 3], M = e[f], k = e[(f + 1) % 3], A = W(h, u), O = W(k, M), q = A[n[0]] * O[n[1]] - A[n[1]] * O[n[0]];
      if (Math.abs(q) < 1e-18) continue;
      const C = W(M, u), de = (C[n[0]] * O[n[1]] - C[n[1]] * O[n[0]]) / q, Z = (C[n[0]] * A[n[1]] - C[n[1]] * A[n[0]]) / q;
      if (de >= 0 && de <= 1 && Z >= 0 && Z <= 1) return Re(u, A, de);
    }
}
function At(t, e, i, r) {
  for (let s = 0; s < 3; s++) {
    const n = De(t[s], t[(s + 1) % 3], e, i);
    n && r.push(n);
    const o = De(e[s], e[(s + 1) % 3], t, i);
    o && r.push(o);
  }
}
function zt(t, e, i, r) {
  const s = Ie(W(t[1], t[0]), W(t[2], t[0])), n = Ie(W(e[1], e[0]), W(e[2], e[0])), o = pe(s), l = pe(n);
  if (o < 1e-20 || l < 1e-20) return;
  const m = e.map((u) => re(W(u, t[0]), s) / o), f = t.map((u) => re(W(u, e[0]), n) / l);
  if (!(m.every((u) => u > i) || m.every((u) => u < -i) || f.every((u) => u > i) || f.every((u) => u < -i))) {
    if (m.every((u) => Math.abs(u) <= i) && f.every((u) => Math.abs(u) <= i))
      return r ? Et(t, e, s, i) : void 0;
    if (!(!r && (!(Math.min(...m) < -i && Math.max(...m) > i) || !(Math.min(...f) < -i && Math.max(...f) > i))))
      for (let u = 0; u < 3; u++) {
        const h = De(t[u], t[(u + 1) % 3], e, i);
        if (h) return h;
        const M = De(e[u], e[(u + 1) % 3], t, i);
        if (M) return M;
      }
  }
}
class Ct {
  // The shared box bounds the contact along X, Y and Z whatever the shapes are,
  // so those three directions are always worth measuring. They stay first.
  world = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ];
  items = /* @__PURE__ */ new Map();
  step = 1e4;
  key(e) {
    return e.map((i) => Math.round(i * this.step)).join(",");
  }
  add(e) {
    const i = mt(Ie(W(e[1], e[0]), W(e[2], e[0])));
    if (!i) return;
    const s = i[0] < -1e-9 || Math.abs(i[0]) <= 1e-9 && (i[1] < -1e-9 || Math.abs(i[1]) <= 1e-9 && i[2] < 0) ? [-i[0], -i[1], -i[2]] : [i[0], i[1], i[2]], n = this.key(s);
    for (this.items.has(n) || this.items.set(n, s); this.items.size > 512 && this.step > 10; ) {
      this.step /= 10;
      const o = /* @__PURE__ */ new Map();
      for (const l of this.items.values()) {
        const m = this.key(l);
        o.has(m) || o.set(m, l);
      }
      this.items = o;
    }
  }
  addFrom(e, i) {
    for (const r of i) this.add(ke(e, r));
  }
  values() {
    return [
      ...this.world,
      ...[...this.items].sort((e, i) => e[0] < i[0] ? -1 : 1).map(([, e]) => e)
    ];
  }
}
function He(t, e) {
  const i = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
  for (const s of t) {
    const n = [s[0] - e[0], s[1] - e[1], s[2] - e[2]];
    for (let o = 0; o < 3; o++)
      for (let l = 0; l < 3; l++) i[o][l] += n[o] * n[l];
  }
  const r = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ];
  for (let s = 0; s < 12; s++) {
    let n = 0;
    for (let o = 0; o < 3; o++)
      for (let l = o + 1; l < 3; l++) n += i[o][l] * i[o][l];
    if (n <= 1e-30) break;
    for (let o = 0; o < 3; o++)
      for (let l = o + 1; l < 3; l++) {
        if (Math.abs(i[o][l]) <= 1e-30) continue;
        const m = (i[l][l] - i[o][o]) / (2 * i[o][l]), f = (m >= 0 ? 1 : -1) / (Math.abs(m) + Math.sqrt(m * m + 1)), u = 1 / Math.sqrt(f * f + 1), h = f * u;
        for (const M of [i, r])
          for (let k = 0; k < 3; k++) {
            const A = M[k][o], O = M[k][l];
            M[k][o] = u * A - h * O, M[k][l] = h * A + u * O;
          }
        for (let M = 0; M < 3; M++) {
          const k = i[o][M], A = i[l][M];
          i[o][M] = u * k - h * A, i[l][M] = h * k + u * A;
        }
      }
  }
  return [0, 1, 2].sort((s, n) => i[n][n] - i[s][s]).map((s) => mt([r[0][s], r[1][s], r[2][s]])).filter((s) => !!s);
}
function $t(t, e, i, r) {
  const s = e.min.map((u, h) => (u + e.max[h]) / 2), n = pe(W(e.max, e.min)), o = Math.max(i * 10, n / 50), l = (u) => [0, 1, 2].map(
    (h) => u.reduce((M, k) => M + k[h], 0) / u.length
  );
  let m = [{ hits: t, limits: [] }], f = !1;
  for (let u = 0; u < 12; u++) {
    const h = [];
    let M = !1;
    for (const k of m) {
      if (k.hits.length < 2) {
        h.push(k);
        continue;
      }
      if (h.length + m.length >= 64) {
        f = !0, h.push(k);
        continue;
      }
      const A = l(k.hits), O = [
        A,
        s,
        ...[0, 0.25, 0.5, 0.75].map(
          (y) => k.hits[Math.floor(y * (k.hits.length - 1))]
        )
      ], q = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ], C = He(k.hits, A);
      C[0] && q.push(C[0]);
      const de = (y) => {
        let b = -1 / 0, N = 1 / 0;
        for (const I of k.hits) {
          const Y = re(I, y);
          Y > b && (b = Y), Y < N && (N = Y);
        }
        return b - N;
      }, Z = (y) => Math.max(
        0,
        ...C.filter((b) => Math.abs(re(b, y)) < 0.9).map((b) => de(b))
      ), K = (y) => {
        const b = k.hits.map((I) => re(I, y)).sort((I, Y) => I - Y), N = [];
        for (let I = 1; I < b.length; I++) {
          const Y = b[I] - b[I - 1];
          Y > o && N.push({ at: (b[I] + b[I - 1]) / 2, size: Y });
        }
        return N.sort((I, Y) => Y.size - I.size);
      };
      let U, g = 0;
      for (const y of q) {
        const b = K(y);
        !b.length || b[0].size <= g || b[0].size <= Z(y) || (g = b[0].size, r(y, b[0].at, O) && (U = { n: y, cuts: [b[0].at] }));
      }
      if (!U) {
        h.push(k);
        continue;
      }
      M = !0;
      const { n: R, cuts: j } = U, D = Array.from({ length: j.length + 1 }, () => []);
      for (const y of k.hits) {
        const b = re(y, R);
        let N = 0;
        for (; N < j.length && b >= j[N]; ) N++;
        D[N].push(y);
      }
      D.forEach(
        (y, b) => h.push({
          hits: y,
          limits: [
            ...k.limits,
            {
              n: R,
              from: b ? j[b - 1] : -1 / 0,
              to: b < j.length ? j[b] : 1 / 0
            }
          ]
        })
      );
    }
    if (m = h, M && u === 11 && (f = !0), !M) break;
  }
  return { zones: m, crowded: f };
}
function it(t, e, i) {
  return i.every(({ n: r, from: s, to: n }) => {
    let o = 1 / 0, l = -1 / 0;
    for (let m = 0; m < 9; m += 3) {
      const f = he(t, e, m) * r[0] + he(t, e, m + 1) * r[1] + he(t, e, m + 2) * r[2];
      f < o && (o = f), f > l && (l = f);
    }
    return l >= s && o <= n;
  });
}
function nt(t, e, i, r, s, n, o, l, m, f, u) {
  let h = !1;
  const M = (R) => {
    let j = -1 / 0, D = 1 / 0;
    const y = (b) => {
      b > j && (j = b), b < D && (D = b);
    };
    for (const b of m) y(re(b, R));
    for (const [b, N, I] of [
      [t, i, 1],
      [e, r, 0]
    ]) {
      const Y = Math.max(1, Math.floor(N.length / 32));
      Y > 1 && (h = !0);
      for (let z = 0; z < N.length; z += Y)
        for (const Q of ke(b, N[z])) u(I, Q) && y(re(Q, R));
    }
    return Number.isFinite(j) && Number.isFinite(D) ? j - D : 0;
  }, k = (R) => {
    let j = 1 / 0, D = -1 / 0;
    for (let y = 0; y < 8; y++) {
      const b = (y & 1 ? o.max[0] : o.min[0]) * R[0] + (y & 2 ? o.max[1] : o.min[1]) * R[1] + (y & 4 ? o.max[2] : o.min[2]) * R[2];
      b < j && (j = b), b > D && (D = b);
    }
    return [j, D];
  }, A = (R, j, D, y, b) => {
    let N = 1 / 0, I = -1 / 0;
    for (const Y of j) {
      let z = 1 / 0, Q = -1 / 0;
      for (let $ = 0; $ < 9; $ += 3) {
        const P = he(R, Y, $) * D[0] + he(R, Y, $ + 1) * D[1] + he(R, Y, $ + 2) * D[2];
        P < z && (z = P), P > Q && (Q = P);
      }
      Q < y || z > b || (z < y && (z = y), Q > b && (Q = b), z < N && (N = z), Q > I && (I = Q));
    }
    return N === 1 / 0 ? void 0 : [N, I];
  };
  if (o.min.some((R, j) => o.max[j] - R <= 0))
    return { width: 0, thin: !1, approximate: !1 };
  const O = Math.ceil((i.length + r.length) / 4096), q = [
    ...s,
    ...O > 1 ? n.filter((R, j) => j < 3 || j % O === 0) : n
  ];
  O > 1 && q.length < s.length + n.length && (h = !0);
  const C = (R, j, D, y, b) => {
    const N = (z) => Re(l, D, z - re(l, D));
    if (!j) return u(R, N((y + b) / 2)) ? [y, b] : void 0;
    let [I, Y] = j;
    return I > y && u(R, N((y + I) / 2)) && (I = y), Y < b && u(R, N((Y + b) / 2)) && (Y = b), [I, Y];
  }, de = (R, j) => R && j ? Math.min(R[1], j[1]) - Math.max(R[0], j[0]) : 0;
  let Z = 1 / 0, K = !1, U = !1, g = 0;
  for (let R = 0; R < q.length; R++) {
    const j = q[R], [D, y] = k(j), b = A(t, i, j, D, y), N = A(e, r, j, D, y);
    let I = de(b, N);
    if (I <= 0 && (g++ < 32 ? I = de(C(0, b, j, D, y), C(1, N, j, D, y)) : h = !0), I <= f && (R < s.length && g < 40 && (g++, I = M(j)), I <= f)) {
      R < s.length && (U = !0);
      continue;
    }
    K = !0, I < Z && (Z = I);
  }
  return {
    width: K && Number.isFinite(Z) ? Z : 0,
    thin: U,
    approximate: h
  };
}
function Ot(t, e) {
  const i = $e(t);
  if (!i) return !0;
  const r = [0, 0, 0];
  for (let o = 0; o < i; o++)
    for (let l = 0; l < 9; l += 3)
      for (let m = 0; m < 3; m++) r[m] += he(t, o, l + m);
  for (let o = 0; o < 3; o++) r[o] /= i * 3;
  let s = 0, n = 0;
  for (let o = 0; o < i; o++) {
    const l = ke(t, o), m = W(l[0], r), f = W(l[1], r), u = W(l[2], r);
    s += re(m, Ie(f, u)) / 6, n += pe(Ie(W(l[1], l[0]), W(l[2], l[0]))) / 2;
  }
  return Math.abs(s) <= e * n;
}
function Nt(t, e, i) {
  const r = W(e[1], e[0]), s = W(e[2], e[0]), n = Ie(r, s), o = pe(n);
  if (o < 1e-20 || Math.abs(re(W(t, e[0]), n)) / o > i) return !1;
  const l = W(t, e[0]), m = re(r, r), f = re(r, s), u = re(s, s), h = re(l, r), M = re(l, s), k = m * u - f * f;
  if (Math.abs(k) < 1e-30) return !1;
  const A = (h * u - M * f) / k, O = (M * m - h * f) / k, q = i / Math.max(pe(r), pe(s), i);
  return A >= -q && O >= -q && A + O <= 1 + q;
}
function Xe(t, e, i, r) {
  for (const s of Oe(i, { min: t, max: t }, r))
    if (Nt(t, ke(e, s), r)) return !0;
  return !1;
}
function ze(t, e, i, r) {
  if (!e.closed || t.some((h, M) => h < e.bounds.min[M] - r || h > e.bounds.max[M] + r) || Xe(t, e, i, r)) return !1;
  const s = [1, 0.371390676, 0.52999894], n = pe(W(e.bounds.max, e.bounds.min)) * 3 + 1, o = Re(t, s, n), l = [], m = Fe([...t, ...o]);
  for (const h of Oe(i, m, r)) {
    const M = De(t, o, ke(e, h), r);
    if (M) {
      const k = pe(W(M, t));
      k > r && l.push(k);
    }
  }
  l.sort((h, M) => h - M);
  let f = 0, u = -1 / 0;
  for (const h of l)
    h - u > r * 2 && (f++, u = h);
  return f % 2 === 1;
}
async function qt(t, e, i, r, s) {
  const n = e.precision / 1e3;
  if (!Number.isFinite(n) || n <= 0)
    throw Error("Точность расчёта должна быть положительным числом.");
  const o = t.filter((y) => e.includeHidden || !y.hidden), l = o.filter((y) => Pe(y, e.a)), m = o.filter((y) => Pe(y, e.b));
  if (!l.length || !m.length)
    throw Error(
      "Выборка А или Б не содержит элементов. Отметьте хотя бы одну модель в каждой стороне проверки."
    );
  let f = performance.now();
  const u = async () => {
    if (r())
      throw Error("Расчёт отменён. Предыдущие результаты сохранены.");
    performance.now() - f > 16 && (await new Promise((y) => setTimeout(y, 0)), f = performance.now());
  }, h = /* @__PURE__ */ new Map(), M = (y) => {
    let b = h.get(y.id);
    return b || (b = Je(
      y,
      Array.from({ length: $e(y) }, (N, I) => I)
    ), h.set(y.id, b)), b;
  }, k = /* @__PURE__ */ new Map(), A = (y) => {
    let b = k.get(y.id);
    return b === void 0 && (b = !y.closed || Ot(y, n), k.set(y.id, b)), b;
  }, O = /* @__PURE__ */ new Map(), q = async (y) => {
    let b = O.get(y.id);
    if (b !== void 0) return b;
    const N = [];
    for (let I = 0; I < $e(y); I++)
      N.push(
        [0, 3, 6].map(
          (Y) => [0, 1, 2].map((z) => Math.round(he(y, I, Y + z) / n)).join(",")
        ).sort().join(";")
      ), I % 9e3 === 0 && await u();
    return b = N.sort().join("|"), O.set(y.id, b), b;
  }, C = [], de = new Set(l.map((y) => y.id)), Z = new Set(m.map((y) => y.id)), K = We(
    m,
    m.map((y, b) => b)
  ), U = /* @__PURE__ */ new Map();
  let g = 0;
  const R = (y) => y.triangles.byteLength + (y.vertices?.byteLength || 0) + (y.indices?.byteLength || 0) + $e(y) * 32;
  async function j(y, b) {
    if (!s) return y;
    let N = U.get(y.id);
    if (N)
      return U.delete(y.id), U.set(y.id, N), N;
    for (const [I, Y] of U)
      I !== b && g > 96 * 1024 * 1024 && (U.delete(I), g -= R(Y), h.delete(I), O.delete(I));
    return N = await s(y.id), U.set(y.id, N), g += R(N), N;
  }
  let D = -1 / 0;
  for (let y = 0; y < l.length; y++) {
    const b = l[y];
    performance.now() - D > 150 && (D = performance.now(), i({
      phase: "Проверка пар",
      done: y,
      total: l.length,
      found: C.length
    }));
    const N = [...Oe(K, b.bounds, n)];
    for (let I = 0; I < N.length; I++) {
      const Y = N[I];
      performance.now() - D > 150 && (D = performance.now(), i({
        phase: `Проверка пар · A ${y + 1}/${l.length} · кандидаты ${I + 1}/${N.length}`,
        done: y,
        total: l.length,
        found: C.length
      }));
      const z = m[Y];
      if (await u(), b.id === z.id || !Le(b.bounds, z.bounds, n) || e.ignoreSameModel && b.modelId === z.modelId || e.ignoreSameGroup && b.modelId === z.modelId && b.properties.Объект && b.properties.Объект === z.properties.Объект || e.equalProperty && b.properties[e.equalProperty] !== void 0 && b.properties[e.equalProperty] === z.properties[e.equalProperty] || b.id > z.id && de.has(z.id) && Z.has(b.id)) continue;
      const Q = It(b.id, z.id), $ = await j(b), P = await j(z, b.id);
      let T, te = "surface", J = 0, ge;
      if (e.type === "duplicates") {
        if ($e($) !== $e(P) || $.bounds.min.some(
          (_, ie) => Math.abs(_ - P.bounds.min[ie]) > n || Math.abs($.bounds.max[ie] - P.bounds.max[ie]) > n
        ))
          continue;
        await q($) === await q(P) && (T = $.bounds.min.map((_, ie) => (_ + $.bounds.max[ie]) / 2), te = "duplicate");
      } else {
        const _ = M($), ie = M(P), be = Math.max(
          1,
          ...$.bounds.min.map(Math.abs),
          ...$.bounds.max.map(Math.abs),
          ...P.bounds.min.map(Math.abs),
          ...P.bounds.max.map(Math.abs)
        ), se = Math.max(1e-10, be * Number.EPSILON * 64), ue = {
          min: $.bounds.min.map(
            (B, F) => Math.max(B, P.bounds.min[F])
          ),
          max: $.bounds.max.map(
            (B, F) => Math.min(B, P.bounds.max[F])
          )
        }, xe = ue.min.map(
          (B, F) => (B + ue.max[F]) / 2
        ), ye = new Ct(), H = [];
        let me = 1, X = 0, Se = 1 / 0, je = 0;
        for (const [B, F] of ve(_, ie, n)) {
          const V = ke($, B), le = ke(P, F);
          if (!Le(Fe(V.flat()), Fe(le.flat()), n)) continue;
          const fe = zt(V, le, se, e.touching);
          if (fe) {
            const we = pe(W(fe, xe));
            if ((!T || we < Se) && (T = fe, Se = we), ye.add(V), ye.add(le), X++ % me === 0 && (At(V, le, se, H), H.length || H.push(fe), H.length >= 8192)) {
              for (let a = 0; a * 2 < H.length; a++) H[a] = H[a * 2];
              H.length = Math.ceil(H.length / 2), me *= 2;
            }
          }
          ++je % 256 === 0 && (performance.now() - D > 150 && (D = performance.now(), i({
            phase: `Геометрия пары · A ${y + 1}/${l.length}`,
            done: y,
            total: l.length,
            found: C.length
          })), await u());
        }
        if (!T && $.closed && P.closed) {
          const B = $.bounds.min.map(
            (F, V) => (F + $.bounds.max[V]) / 2
          );
          ze(B, $, _, se) && ze(B, P, ie, se) && (T = B, te = "contained");
        }
        if (!T) {
          for (const [B, F, V] of [
            [$, P, ie],
            [P, $, _]
          ])
            if (F.closed) {
              for (let le = 0; le < $e(B) && !T; le++) {
                const fe = ke(B, le), we = fe[0].map(
                  (a, c) => (fe[0][c] + fe[1][c] + fe[2][c]) / 3
                );
                for (const a of [fe[0], we])
                  if (ze(a, F, V, se)) {
                    T = a, te = "contained";
                    break;
                  }
                await u();
              }
              if (T) break;
            }
        }
        if (T) {
          const B = (ee, ce) => [...Oe(ce, ue, n)].filter(
            (Ee) => Le(Fe(ke(ee, Ee).flat()), ue, n)
          ), F = B($, _), V = B(P, ie);
          te !== "surface" && (ye.addFrom($, F), ye.addFrom(P, V)), await u();
          const le = ue.min.map(
            (ee, ce) => (ee + ue.max[ce]) / 2
          ), fe = (ee, ce) => ee === 0 ? ze(ce, $, _, se) : ze(ce, P, ie, se), we = (ee, ce) => ee === 0 ? ze(ce, $, _, se) || Xe(ce, $, _, se) : ze(ce, P, ie, se) || Xe(ce, P, ie, se), a = (ee, ce, Ee) => $.closed && P.closed && Ee.every((Ne) => {
            const Ae = Re(Ne, ee, ce - re(Ne, ee));
            return !we(0, Ae) || !we(1, Ae);
          }), c = () => [0, 1, 2].map(
            (ee) => H.reduce((ce, Ee) => ce + Ee[ee], 0) / H.length
          ), p = te === "surface" && H.length > 2 ? He(H, c())[2] : void 0, d = p ? nt(
            $,
            P,
            F,
            V,
            [p],
            [],
            ue,
            c(),
            H,
            se,
            fe
          ) : void 0, x = !d || d.width > se, S = !x && !!d?.approximate, w = A($) || A(P);
          if (!w && !x && !S && (te = "touch"), te === "touch" && !e.touching) continue;
          const { zones: v, crowded: E } = $t(H, ue, n, a), L = ye.values();
          let G = 0, ne = !S, ae = E || me > 1 || !!d?.approximate;
          for (const ee of te === "touch" ? [] : v) {
            const ce = ee.limits.length ? F.filter((qe) => it($, qe, ee.limits)) : F, Ee = ee.limits.length ? V.filter((qe) => it(P, qe, ee.limits)) : V, Ne = ee.hits.length ? [0, 1, 2].map(
              (qe) => ee.hits.reduce((xt, yt) => xt + yt[qe], 0) / ee.hits.length
            ) : le, Ae = nt(
              $,
              P,
              ce,
              Ee,
              ee.hits.length > 2 ? He(ee.hits, Ne) : [],
              L,
              ue,
              Ne,
              ee.hits,
              n,
              fe
            );
            Ae.thin && (ne = !1), Ae.approximate && (ae = !0), Ae.width > G && (G = Ae.width), await u();
          }
          G *= 1e3, te === "touch" ? ge = void 0 : w ? ge = "unmeasurable" : G <= 0 || !ne ? ge = "tolerance" : ae && (ge = "approximate"), J = te === "touch" || ge === "unmeasurable" || ge === "tolerance" ? 0 : Math.max(e.precision, G), await u();
        }
        if (T && !ge && J + e.precision < e.minPenetration)
          continue;
      }
      if (T && (C.push({
        id: Q,
        a: tt($),
        b: tt(P),
        point: T,
        kind: te,
        state: "new",
        note: "",
        assignee: "",
        firstSeen: "",
        lastSeen: "",
        penetrationMm: J,
        ...ge ? { depth: ge } : {}
      }), C.length >= 5e4))
        throw Error(
          "Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат."
        );
    }
  }
  return i({
    phase: "Готово",
    done: l.length,
    total: l.length,
    found: C.length
  }), C;
}
const ft = '(function(){"use strict";const _t=({triangles:n,vertices:t,indices:e,triangleCount:c,closed:a,bounds:f,...o})=>o;function jt(n,t){return t.exclude.includes(n.id)?!1:t.include.includes(n.id)?!0:!(t.manualOnly||t.modelsMode==="selected"&&!t.models.includes(n.modelId)||t.modelsMode===void 0&&t.models.length&&!t.models.includes(n.modelId))}const Ht=(n,t)=>JSON.stringify([n,t].sort()),q=(n,t)=>[n[0]-t[0],n[1]-t[1],n[2]-t[2]],ut=(n,t,e=1)=>[n[0]+t[0]*e,n[1]+t[1]*e,n[2]+t[2]*e],z=(n,t)=>n[0]*t[0]+n[1]*t[1]+n[2]*t[2],et=(n,t)=>[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]],O=n=>Math.hypot(...n),zt=n=>{const t=O(n);return t>1e-20?[n[0]/t,n[1]/t,n[2]/t]:void 0},it=n=>n.triangleCount??(n.indices?n.indices.length/3:n.triangles.length/9),$=(n,t,e)=>n.indices&&n.vertices?n.vertices[n.indices[t*3+Math.floor(e/3)]*3+e%3]:n.triangles[t*9+e],W=(n,t)=>[0,3,6].map(e=>[$(n,t,e),$(n,t,e+1),$(n,t,e+2)]);function xt(n){const t=[1/0,1/0,1/0],e=[-1/0,-1/0,-1/0];for(let c=0;c<n.length;c++){const a=c%3;t[a]=Math.min(t[a],n[c]),e[a]=Math.max(e[a],n[c])}return{min:t,max:e}}const ht=(n,t,e)=>n.min.every((c,a)=>c<=t.max[a]+e&&n.max[a]>=t.min[a]-e);function wt(n,t){const e={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const i of t)for(let l=0;l<9;l++){const h=l%3,u=$(n,i,l);e.min[h]=Math.min(e.min[h],u),e.max[h]=Math.max(e.max[h],u)}if(t.length<=12)return{...e,ids:t};const c=e.max.map((i,l)=>i-e.min[l]),a=c.indexOf(Math.max(...c)),f=i=>$(n,i,a)+$(n,i,a+3)+$(n,i,a+6);t.sort((i,l)=>f(i)-f(l));const o=t.length>>1;return{...e,left:wt(n,t.slice(0,o)),right:wt(n,t.slice(o))}}function*ft(n,t,e){ht(n,t,e)&&(n.ids?yield*n.ids:(yield*ft(n.left,t,e),yield*ft(n.right,t,e)))}function*k(n,t,e){if(ht(n,t,e)){if(n.ids&&t.ids){for(const c of n.ids)for(const a of t.ids)yield[c,a];return}if(n.ids){yield*k(n,t.left,e),yield*k(n,t.right,e);return}if(t.ids){yield*k(n.left,t,e),yield*k(n.right,t,e);return}yield*k(n.left,t.left,e),yield*k(n.left,t.right,e),yield*k(n.right,t.left,e),yield*k(n.right,t.right,e)}}function vt(n,t){const e={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const o of t)for(let i=0;i<3;i++)e.min[i]=Math.min(e.min[i],n[o].bounds.min[i]),e.max[i]=Math.max(e.max[i],n[o].bounds.max[i]);if(t.length<=16)return{...e,ids:t};const c=e.max.map((o,i)=>o-e.min[i]),a=c.indexOf(Math.max(...c));t.sort((o,i)=>n[o].bounds.min[a]+n[o].bounds.max[a]-(n[i].bounds.min[a]+n[i].bounds.max[a]));const f=t.length>>1;return{...e,left:vt(n,t.slice(0,f)),right:vt(n,t.slice(f))}}function dt(n,t,e,c){const a=q(t,n),f=q(e[1],e[0]),o=q(e[2],e[0]),i=et(a,o),l=z(f,i);if(Math.abs(l)<=1e-12*O(a)*O(f)*O(o))return;const h=1/l,u=q(n,e[0]),d=z(u,i)*h,g=et(u,f),y=z(a,g)*h,P=z(o,g)*h,S=c/Math.max(O(f),O(o),c);if(d>=-S&&y>=-S&&d+y<=1+S&&P>=-S&&P<=1+S)return ut(n,a,Math.max(0,Math.min(1,P)))}function Gt(n,t,e,c){const a=e.map(Math.abs).indexOf(Math.max(...e.map(Math.abs))),f=[0,1,2].filter(l=>l!==a),o=(l,h,u)=>(h[f[0]]-l[f[0]])*(u[f[1]]-l[f[1]])-(h[f[1]]-l[f[1]])*(u[f[0]]-l[f[0]]),i=(l,h)=>{const u=h.map((d,g)=>o(d,h[(g+1)%3],l));return u.every(d=>d>=-c*O(e))||u.every(d=>d<=c*O(e))};for(const l of n)if(i(l,t))return l;for(const l of t)if(i(l,n))return l;for(let l=0;l<3;l++)for(let h=0;h<3;h++){const u=n[l],d=n[(l+1)%3],g=t[h],y=t[(h+1)%3],P=q(d,u),S=q(y,g),F=P[f[0]]*S[f[1]]-P[f[1]]*S[f[0]];if(Math.abs(F)<1e-18)continue;const E=q(g,u),Q=(E[f[0]]*S[f[1]]-E[f[1]]*S[f[0]])/F,Z=(E[f[0]]*P[f[1]]-E[f[1]]*P[f[0]])/F;if(Q>=0&&Q<=1&&Z>=0&&Z<=1)return ut(u,P,Q)}}function Jt(n,t,e,c){for(let a=0;a<3;a++){const f=dt(n[a],n[(a+1)%3],t,e);f&&c.push(f);const o=dt(t[a],t[(a+1)%3],n,e);o&&c.push(o)}}function Kt(n,t,e,c){const a=et(q(n[1],n[0]),q(n[2],n[0])),f=et(q(t[1],t[0]),q(t[2],t[0])),o=O(a),i=O(f);if(o<1e-20||i<1e-20)return;const l=t.map(u=>z(q(u,n[0]),a)/o),h=n.map(u=>z(q(u,t[0]),f)/i);if(!(l.every(u=>u>e)||l.every(u=>u<-e)||h.every(u=>u>e)||h.every(u=>u<-e))){if(l.every(u=>Math.abs(u)<=e)&&h.every(u=>Math.abs(u)<=e))return c?Gt(n,t,a,e):void 0;if(!(!c&&(!(Math.min(...l)<-e&&Math.max(...l)>e)||!(Math.min(...h)<-e&&Math.max(...h)>e))))for(let u=0;u<3;u++){const d=dt(n[u],n[(u+1)%3],t,e);if(d)return d;const g=dt(t[u],t[(u+1)%3],n,e);if(g)return g}}}class Xt{world=[[1,0,0],[0,1,0],[0,0,1]];items=new Map;step=1e4;key(t){return t.map(e=>Math.round(e*this.step)).join(",")}add(t){const e=zt(et(q(t[1],t[0]),q(t[2],t[0])));if(!e)return;const a=e[0]<-1e-9||Math.abs(e[0])<=1e-9&&(e[1]<-1e-9||Math.abs(e[1])<=1e-9&&e[2]<0)?[-e[0],-e[1],-e[2]]:[e[0],e[1],e[2]],f=this.key(a);for(this.items.has(f)||this.items.set(f,a);this.items.size>512&&this.step>10;){this.step/=10;const o=new Map;for(const i of this.items.values()){const l=this.key(i);o.has(l)||o.set(l,i)}this.items=o}}addFrom(t,e){for(const c of e)this.add(W(t,c))}values(){return[...this.world,...[...this.items].sort((t,e)=>t[0]<e[0]?-1:1).map(([,t])=>t)]}}function It(n,t){const e=[[0,0,0],[0,0,0],[0,0,0]];for(const a of n){const f=[a[0]-t[0],a[1]-t[1],a[2]-t[2]];for(let o=0;o<3;o++)for(let i=0;i<3;i++)e[o][i]+=f[o]*f[i]}const c=[[1,0,0],[0,1,0],[0,0,1]];for(let a=0;a<12;a++){let f=0;for(let o=0;o<3;o++)for(let i=o+1;i<3;i++)f+=e[o][i]*e[o][i];if(f<=1e-30)break;for(let o=0;o<3;o++)for(let i=o+1;i<3;i++){if(Math.abs(e[o][i])<=1e-30)continue;const l=(e[i][i]-e[o][o])/(2*e[o][i]),h=(l>=0?1:-1)/(Math.abs(l)+Math.sqrt(l*l+1)),u=1/Math.sqrt(h*h+1),d=h*u;for(const g of[e,c])for(let y=0;y<3;y++){const P=g[y][o],S=g[y][i];g[y][o]=u*P-d*S,g[y][i]=d*P+u*S}for(let g=0;g<3;g++){const y=e[o][g],P=e[i][g];e[o][g]=u*y-d*P,e[i][g]=d*y+u*P}}}return[0,1,2].sort((a,f)=>e[f][f]-e[a][a]).map(a=>zt([c[0][a],c[1][a],c[2][a]])).filter(a=>!!a)}function Yt(n,t,e,c){const a=t.min.map((u,d)=>(u+t.max[d])/2),f=O(q(t.max,t.min)),o=Math.max(e*10,f/50),i=u=>[0,1,2].map(d=>u.reduce((g,y)=>g+y[d],0)/u.length);let l=[{hits:n,limits:[]}],h=!1;for(let u=0;u<12;u++){const d=[];let g=!1;for(const y of l){if(y.hits.length<2){d.push(y);continue}if(d.length+l.length>=64){h=!0,d.push(y);continue}const P=i(y.hits),S=[P,a,...[0,.25,.5,.75].map(s=>y.hits[Math.floor(s*(y.hits.length-1))])],F=[[1,0,0],[0,1,0],[0,0,1]],E=It(y.hits,P);E[0]&&F.push(E[0]);const Q=s=>{let r=-1/0,p=1/0;for(const m of y.hits){const b=z(m,s);b>r&&(r=b),b<p&&(p=b)}return r-p},Z=s=>Math.max(0,...E.filter(r=>Math.abs(z(r,s))<.9).map(r=>Q(r))),lt=s=>{const r=y.hits.map(m=>z(m,s)).sort((m,b)=>m-b),p=[];for(let m=1;m<r.length;m++){const b=r[m]-r[m-1];b>o&&p.push({at:(r[m]+r[m-1])/2,size:b})}return p.sort((m,b)=>b.size-m.size)};let C,R=0;for(const s of F){const r=lt(s);!r.length||r[0].size<=R||r[0].size<=Z(s)||(R=r[0].size,c(s,r[0].at,S)&&(C={n:s,cuts:[r[0].at]}))}if(!C){d.push(y);continue}g=!0;const{n:w,cuts:x}=C,v=Array.from({length:x.length+1},()=>[]);for(const s of y.hits){const r=z(s,w);let p=0;for(;p<x.length&&r>=x[p];)p++;v[p].push(s)}v.forEach((s,r)=>d.push({hits:s,limits:[...y.limits,{n:w,from:r?x[r-1]:-1/0,to:r<x.length?x[r]:1/0}]}))}if(l=d,g&&u===11&&(h=!0),!g)break}return{zones:l,crowded:h}}function Et(n,t,e){return e.every(({n:c,from:a,to:f})=>{let o=1/0,i=-1/0;for(let l=0;l<9;l+=3){const h=$(n,t,l)*c[0]+$(n,t,l+1)*c[1]+$(n,t,l+2)*c[2];h<o&&(o=h),h>i&&(i=h)}return i>=a&&o<=f})}function Ot(n,t,e,c,a,f,o,i,l,h,u){let d=!1;const g=w=>{let x=-1/0,v=1/0;const s=r=>{r>x&&(x=r),r<v&&(v=r)};for(const r of l)s(z(r,w));for(const[r,p,m]of[[n,e,1],[t,c,0]]){const b=Math.max(1,Math.floor(p.length/32));b>1&&(d=!0);for(let _=0;_<p.length;_+=b)for(const Y of W(r,p[_]))u(m,Y)&&s(z(Y,w))}return Number.isFinite(x)&&Number.isFinite(v)?x-v:0},y=w=>{let x=1/0,v=-1/0;for(let s=0;s<8;s++){const r=(s&1?o.max[0]:o.min[0])*w[0]+(s&2?o.max[1]:o.min[1])*w[1]+(s&4?o.max[2]:o.min[2])*w[2];r<x&&(x=r),r>v&&(v=r)}return[x,v]},P=(w,x,v,s,r)=>{let p=1/0,m=-1/0;for(const b of x){let _=1/0,Y=-1/0;for(let M=0;M<9;M+=3){const I=$(w,b,M)*v[0]+$(w,b,M+1)*v[1]+$(w,b,M+2)*v[2];I<_&&(_=I),I>Y&&(Y=I)}Y<s||_>r||(_<s&&(_=s),Y>r&&(Y=r),_<p&&(p=_),Y>m&&(m=Y))}return p===1/0?void 0:[p,m]};if(o.min.some((w,x)=>o.max[x]-w<=0))return{width:0,thin:!1,approximate:!1};const S=Math.ceil((e.length+c.length)/4096),F=[...a,...S>1?f.filter((w,x)=>x<3||x%S===0):f];S>1&&F.length<a.length+f.length&&(d=!0);const E=(w,x,v,s,r)=>{const p=_=>ut(i,v,_-z(i,v));if(!x)return u(w,p((s+r)/2))?[s,r]:void 0;let[m,b]=x;return m>s&&u(w,p((s+m)/2))&&(m=s),b<r&&u(w,p((b+r)/2))&&(b=r),[m,b]},Q=(w,x)=>w&&x?Math.min(w[1],x[1])-Math.max(w[0],x[0]):0;let Z=1/0,lt=!1,C=!1,R=0;for(let w=0;w<F.length;w++){const x=F[w],[v,s]=y(x),r=P(n,e,x,v,s),p=P(t,c,x,v,s);let m=Q(r,p);if(m<=0&&(R++<32?m=Q(E(0,r,x,v,s),E(1,p,x,v,s)):d=!0),m<=h&&(w<a.length&&R<40&&(R++,m=g(x)),m<=h)){w<a.length&&(C=!0);continue}lt=!0,m<Z&&(Z=m)}return{width:lt&&Number.isFinite(Z)?Z:0,thin:C,approximate:d}}function Zt(n,t){const e=it(n);if(!e)return!0;const c=[0,0,0];for(let o=0;o<e;o++)for(let i=0;i<9;i+=3)for(let l=0;l<3;l++)c[l]+=$(n,o,i+l);for(let o=0;o<3;o++)c[o]/=e*3;let a=0,f=0;for(let o=0;o<e;o++){const i=W(n,o),l=q(i[0],c),h=q(i[1],c),u=q(i[2],c);a+=z(l,et(h,u))/6,f+=O(et(q(i[1],i[0]),q(i[2],i[0])))/2}return Math.abs(a)<=t*f}function Bt(n,t,e){const c=q(t[1],t[0]),a=q(t[2],t[0]),f=et(c,a),o=O(f);if(o<1e-20||Math.abs(z(q(n,t[0]),f))/o>e)return!1;const i=q(n,t[0]),l=z(c,c),h=z(c,a),u=z(a,a),d=z(i,c),g=z(i,a),y=l*u-h*h;if(Math.abs(y)<1e-30)return!1;const P=(d*u-g*h)/y,S=(g*l-d*h)/y,F=e/Math.max(O(c),O(a),e);return P>=-F&&S>=-F&&P+S<=1+F}function bt(n,t,e,c){for(const a of ft(e,{min:n,max:n},c))if(Bt(n,W(t,a),c))return!0;return!1}function ot(n,t,e,c){if(!t.closed||n.some((d,g)=>d<t.bounds.min[g]-c||d>t.bounds.max[g]+c)||bt(n,t,e,c))return!1;const a=[1,.371390676,.52999894],f=O(q(t.bounds.max,t.bounds.min))*3+1,o=ut(n,a,f),i=[],l=xt([...n,...o]);for(const d of ft(e,l,c)){const g=dt(n,o,W(t,d),c);if(g){const y=O(q(g,n));y>c&&i.push(y)}}i.sort((d,g)=>d-g);let h=0,u=-1/0;for(const d of i)d-u>c*2&&(h++,u=d);return h%2===1}async function Dt(n,t,e,c,a){const f=t.precision/1e3;if(!Number.isFinite(f)||f<=0)throw Error("Точность расчёта должна быть положительным числом.");const o=n.filter(s=>t.includeHidden||!s.hidden),i=o.filter(s=>jt(s,t.a)),l=o.filter(s=>jt(s,t.b));if(!i.length||!l.length)throw Error("Выборка А или Б не содержит элементов. Отметьте хотя бы одну модель в каждой стороне проверки.");let h=performance.now();const u=async()=>{if(c())throw Error("Расчёт отменён. Предыдущие результаты сохранены.");performance.now()-h>16&&(await new Promise(s=>setTimeout(s,0)),h=performance.now())},d=new Map,g=s=>{let r=d.get(s.id);return r||(r=wt(s,Array.from({length:it(s)},(p,m)=>m)),d.set(s.id,r)),r},y=new Map,P=s=>{let r=y.get(s.id);return r===void 0&&(r=!s.closed||Zt(s,f),y.set(s.id,r)),r},S=new Map,F=async s=>{let r=S.get(s.id);if(r!==void 0)return r;const p=[];for(let m=0;m<it(s);m++)p.push([0,3,6].map(b=>[0,1,2].map(_=>Math.round($(s,m,b+_)/f)).join(",")).sort().join(";")),m%9e3===0&&await u();return r=p.sort().join("|"),S.set(s.id,r),r},E=[],Q=new Set(i.map(s=>s.id)),Z=new Set(l.map(s=>s.id)),lt=vt(l,l.map((s,r)=>r)),C=new Map;let R=0;const w=s=>s.triangles.byteLength+(s.vertices?.byteLength||0)+(s.indices?.byteLength||0)+it(s)*32;async function x(s,r){if(!a)return s;let p=C.get(s.id);if(p)return C.delete(s.id),C.set(s.id,p),p;for(const[m,b]of C)m!==r&&R>96*1024*1024&&(C.delete(m),R-=w(b),d.delete(m),S.delete(m));return p=await a(s.id),C.set(s.id,p),R+=w(p),p}let v=-1/0;for(let s=0;s<i.length;s++){const r=i[s];performance.now()-v>150&&(v=performance.now(),e({phase:"Проверка пар",done:s,total:i.length,found:E.length}));const p=[...ft(lt,r.bounds,f)];for(let m=0;m<p.length;m++){const b=p[m];performance.now()-v>150&&(v=performance.now(),e({phase:`Проверка пар · A ${s+1}/${i.length} · кандидаты ${m+1}/${p.length}`,done:s,total:i.length,found:E.length}));const _=l[b];if(await u(),r.id===_.id||!ht(r.bounds,_.bounds,f)||t.ignoreSameModel&&r.modelId===_.modelId||t.ignoreSameGroup&&r.modelId===_.modelId&&r.properties.Объект&&r.properties.Объект===_.properties.Объект||t.equalProperty&&r.properties[t.equalProperty]!==void 0&&r.properties[t.equalProperty]===_.properties[t.equalProperty]||r.id>_.id&&Q.has(_.id)&&Z.has(r.id))continue;const Y=Ht(r.id,_.id),M=await x(r),I=await x(_,r.id);let H,B="surface",Pt=0,tt;if(t.type==="duplicates"){if(it(M)!==it(I)||M.bounds.min.some((D,G)=>Math.abs(D-I.bounds.min[G])>f||Math.abs(M.bounds.max[G]-I.bounds.max[G])>f))continue;await F(M)===await F(I)&&(H=M.bounds.min.map((D,G)=>(D+M.bounds.max[G])/2),B="duplicate")}else{const D=g(M),G=g(I),Rt=Math.max(1,...M.bounds.min.map(Math.abs),...M.bounds.max.map(Math.abs),...I.bounds.min.map(Math.abs),...I.bounds.max.map(Math.abs)),J=Math.max(1e-10,Rt*Number.EPSILON*64),nt={min:M.bounds.min.map((N,T)=>Math.max(N,I.bounds.min[T])),max:M.bounds.max.map((N,T)=>Math.min(N,I.bounds.max[T]))},Ut=nt.min.map((N,T)=>(N+nt.max[T])/2),mt=new Xt,L=[];let St=1,Vt=0,Ft=1/0,Wt=0;for(const[N,T]of k(D,G,f)){const K=W(M,N),U=W(I,T);if(!ht(xt(K.flat()),xt(U.flat()),f))continue;const X=Kt(K,U,J,t.touching);if(X){const st=O(q(X,Ut));if((!H||st<Ft)&&(H=X,Ft=st),mt.add(K),mt.add(U),Vt++%St===0&&(Jt(K,U,J,L),L.length||L.push(X),L.length>=8192)){for(let V=0;V*2<L.length;V++)L[V]=L[V*2];L.length=Math.ceil(L.length/2),St*=2}}++Wt%256===0&&(performance.now()-v>150&&(v=performance.now(),e({phase:`Геометрия пары · A ${s+1}/${i.length}`,done:s,total:i.length,found:E.length})),await u())}if(!H&&M.closed&&I.closed){const N=M.bounds.min.map((T,K)=>(T+M.bounds.max[K])/2);ot(N,M,D,J)&&ot(N,I,G,J)&&(H=N,B="contained")}if(!H){for(const[N,T,K]of[[M,I,G],[I,M,D]])if(T.closed){for(let U=0;U<it(N)&&!H;U++){const X=W(N,U),st=X[0].map((V,ct)=>(X[0][ct]+X[1][ct]+X[2][ct])/3);for(const V of[X[0],st])if(ot(V,T,K,J)){H=V,B="contained";break}await u()}if(H)break}}if(H){const N=(j,A)=>[...ft(A,nt,f)].filter(rt=>ht(xt(W(j,rt).flat()),nt,f)),T=N(M,D),K=N(I,G);B!=="surface"&&(mt.addFrom(M,T),mt.addFrom(I,K)),await u();const U=nt.min.map((j,A)=>(j+nt.max[A])/2),X=(j,A)=>j===0?ot(A,M,D,J):ot(A,I,G,J),st=(j,A)=>j===0?ot(A,M,D,J)||bt(A,M,D,J):ot(A,I,G,J)||bt(A,I,G,J),V=(j,A,rt)=>M.closed&&I.closed&&rt.every(pt=>{const at=ut(pt,j,A-z(pt,j));return!st(0,at)||!st(1,at)}),ct=()=>[0,1,2].map(j=>L.reduce((A,rt)=>A+rt[j],0)/L.length),Nt=B==="surface"&&L.length>2?It(L,ct())[2]:void 0,Mt=Nt?Ot(M,I,T,K,[Nt],[],nt,ct(),L,J,X):void 0,Tt=!Mt||Mt.width>J,At=!Tt&&!!Mt?.approximate,$t=P(M)||P(I);if(!$t&&!Tt&&!At&&(B="touch"),B==="touch"&&!t.touching)continue;const{zones:kt,crowded:tn}=Yt(L,nt,f,V),nn=mt.values();let gt=0,Lt=!At,Ct=tn||St>1||!!Mt?.approximate;for(const j of B==="touch"?[]:kt){const A=j.limits.length?T.filter(yt=>Et(M,yt,j.limits)):T,rt=j.limits.length?K.filter(yt=>Et(I,yt,j.limits)):K,pt=j.hits.length?[0,1,2].map(yt=>j.hits.reduce((en,on)=>en+on[yt],0)/j.hits.length):U,at=Ot(M,I,A,rt,j.hits.length>2?It(j.hits,pt):[],nn,nt,pt,j.hits,f,X);at.thin&&(Lt=!1),at.approximate&&(Ct=!0),at.width>gt&&(gt=at.width),await u()}gt*=1e3,B==="touch"?tt=void 0:$t?tt="unmeasurable":gt<=0||!Lt?tt="tolerance":Ct&&(tt="approximate"),Pt=B==="touch"||tt==="unmeasurable"||tt==="tolerance"?0:Math.max(t.precision,gt),await u()}if(H&&!tt&&Pt+t.precision<t.minPenetration)continue}if(H&&(E.push({id:Y,a:_t(M),b:_t(I),point:H,kind:B,state:"new",note:"",assignee:"",firstSeen:"",lastSeen:"",penetrationMm:Pt,...tt?{depth:tt}:{}}),E.length>=5e4))throw Error("Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат.")}}return e({phase:"Готово",done:i.length,total:i.length,found:E.length}),E}let Qt=0;const qt=new Map;self.onmessage=async n=>{if(n.data.request!==void 0){const t=qt.get(n.data.request);qt.delete(n.data.request),n.data.error?t?.reject(Error(n.data.error)):t?.resolve(n.data.geometry);return}try{const{elements:t,check:e}=n.data,c=await Dt(t,e,a=>self.postMessage({progress:a}),()=>!1,n.data.streaming?a=>new Promise((f,o)=>{const i=Qt++;qt.set(i,{resolve:f,reject:o}),self.postMessage({load:a,request:i})}):void 0);self.postMessage({results:c})}catch(t){self.postMessage({error:t instanceof Error?t.message:String(t)})}}})();\n', ot = typeof self < "u" && self.Blob && new Blob(["(self.URL || self.webkitURL).revokeObjectURL(self.location.href);", ft], { type: "text/javascript;charset=utf-8" });
function Pt(t) {
  let e;
  try {
    if (e = ot && (self.URL || self.webkitURL).createObjectURL(ot), !e) throw "";
    const i = new Worker(e, {
      name: t?.name
    });
    return i.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(e);
    }), i;
  } catch {
    return new Worker(
      "data:text/javascript;charset=utf-8," + encodeURIComponent(ft),
      {
        name: t?.name
      }
    );
  }
}
const oe = (t) => String(t ?? "").replace(
  /[&<>"']/g,
  (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[e]
);
function st(t, e) {
  const i = URL.createObjectURL(
    new Blob([e], {
      type: t.endsWith(".html") ? "text/html;charset=utf-8" : "application/json;charset=utf-8"
    })
  ), r = document.createElement("a");
  r.href = i, r.download = t, r.click(), setTimeout(() => URL.revokeObjectURL(i), 6e4);
}
const ht = {
  unmeasurable: "не определена",
  tolerance: "требует уточнения",
  approximate: "приблизительная оценка"
}, Ye = (t = 0) => t > 0 && t < 0.1 ? String(Number(t.toPrecision(2))) : t.toFixed(1), Ge = (t, e) => e === "duplicates" ? "—" : t.kind === "touch" ? "касание" : t.depth === "approximate" ? `≈ ${Ye(t.penetrationMm)}` : t.depth ? ht[t.depth] : Ye(t.penetrationMm);
function Lt(t, e) {
  const i = oe;
  return `<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${i(t.name)}</title><style>body{font:14px/1.5 system-ui;margin:24px;background:#171c23;color:#e6edf5}h1{margin:0}small{color:#a9b7c8}input,select{padding:10px;margin:15px 8px 15px 0;max-width:100%;background:#242e3b;color:inherit;border:1px solid #506074;border-radius:6px}.wrap{overflow:auto}table{border-collapse:separate;border-spacing:0;width:100%}td,th{padding:10px;border-bottom:1px solid #39475a;min-width:100px;vertical-align:top;overflow-wrap:anywhere}th{background:#253142;position:sticky;top:0;text-align:left;white-space:normal}td{max-width:350px}tr[hidden]{display:none}.shot{display:block;width:260px;border:0;background:transparent;padding:0;cursor:zoom-in}dialog{width:min(94vw,1400px);border:1px solid #506074;background:#20242b;color:white;border-radius:10px}dialog img{max-width:100%;max-height:80vh;display:block;margin:12px auto}dialog::backdrop{background:#000b}.shot img{width:100%;border-radius:6px}.legend{margin:12px 0}.red{color:#ff6161}.blue{color:#65baff}@media print{input,select{display:none}body{background:white;color:black}.wrap{overflow:visible}th{position:static;background:#eee}}</style><h1>${i(t.name)}</h1><small>НашеПО · Проверки коллизий · ${i(t.lastRun || "")} · ${t.status === "stale" ? "Результат устарел" : "Последний завершённый расчёт"}</small><p>${i(t.type === "duplicates" ? "Совпадение треугольной геометрии" : "Пересечения поверхностей и вложенность замкнутых тел")}. Точность: ${i(t.precision)} мм${t.type === "intersection" ? `; минимальная глубина: ${i(t.minPenetration)} мм` : ""}. Глубина — оценка локальной толщины перекрытия, а не длина объекта внутри другого или перемещение для устранения коллизии. «Касание» — контакт без разрешённого объёмного перекрытия, с нулевой глубиной. «Не определена» — геометрия не позволяет объёмный замер. «Требует уточнения» — пересечение найдено, но глубина не разрешена. Знак ≈ обозначает сокращённую выборку при измерении либо неполное разделение контактов. Погрешность оценки не гарантируется. Строки с неопределённой глубиной и знаком ≈ сохраняются при фильтрации по глубине; обычные числа и касания сравниваются с порогом с запасом на точность.</p><p class="legend"><span class="red">● Элемент А выделен красным</span> · <span class="blue">● элемент Б — синим</span></p><input id="search" type="search" placeholder="Поиск по всему отчёту"><select id="state"><option value="">Все состояния</option>${Object.entries(
    Me
  ).map(([r, s]) => `<option value="${r}">${s}</option>`).join(
    ""
  )}</select>${t.type === "intersection" ? '<input id="depth" type="number" min="0" step="1" placeholder="Глубина от, мм">' : ""}<span id="count"></span><div class="wrap"><table><thead><tr>${["Снимок", "№", "Состояние", "Глубина, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "X", "Y", "Z", "Назначение", "Комментарий"].map((r) => `<th>${r}</th>`).join("")}</tr></thead><tbody>${e.map((r, s) => `<tr data-state="${r.state}" data-depth="${r.penetrationMm ?? 0}"${r.depth && r.kind !== "touch" ? ' data-unmeasured="1"' : ""}><td>${Be(r.image) ? `<button class="shot" type="button"><img src="${r.image}" alt="Снимок конфликта ${s + 1}" loading="lazy"></button>` : "Снимок отсутствует"}</td>${[s + 1, Me[r.state], Ge(r, t.type), r.a.name, r.a.model, r.a.guid, r.b.name, r.b.model, r.b.guid, ...r.point.map((n) => n.toFixed(4)), r.assignee, r.note].map((n) => `<td>${i(n)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><dialog id="picture"><button id="close-picture">Закрыть</button><img id="full-picture" alt="Снимок конфликта"></dialog><script>const modal=document.getElementById("picture");document.getElementById("close-picture").onclick=()=>modal.close();for(const b of document.querySelectorAll(".shot"))b.onclick=()=>{document.getElementById("full-picture").src=b.querySelector("img").src;modal.showModal()};const PREC=${Number(t.precision) || 0},q=document.getElementById('search'),s=document.getElementById('state'),d=document.getElementById('depth'),rows=[...document.querySelectorAll('tbody tr')];function filter(){let n=0;for(const r of rows){r.hidden=!!((s.value&&r.dataset.state!==s.value)||(d&&!r.dataset.unmeasured&&Number(r.dataset.depth)+PREC<Number(d.value||0))||!r.textContent.toLowerCase().includes(q.value.toLowerCase()));if(!r.hidden)n++}document.getElementById('count').textContent='Коллизий: '+n}q.oninput=s.onchange=filter;if(d)d.oninput=filter;filter()<\/script></html>`;
}
function Dt(t, e) {
  return JSON.stringify(
    {
      version: 1,
      id: t.id,
      name: t.name,
      images: Object.fromEntries(
        e.filter((i) => Be(i.image)).map((i) => [i.id + ".jpg", i.image])
      ),
      warnings: t.warnings,
      tests: [
        {
          id: t.id,
          name: t.name,
          clashes: e.map((i, r) => ({
            id: i.id,
            name: `Конфликт ${r + 1}`,
            distance: t.type === "duplicates" ? "" : i.depth || i.kind === "touch" ? Ge(i, t.type) : `${Ye(i.penetrationMm)} мм`,
            date: t.lastRun || "",
            description: t.type === "duplicates" ? "Дублирование" : "По пересечению",
            status: Me[i.state],
            group: i.assignee,
            note: i.note,
            point: i.point,
            image: Be(i.image) ? i.id + ".jpg" : "",
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
              "Расчётная глубина пересечения, мм": Ge(i, t.type)
            }
          }))
        }
      ]
    },
    null,
    2
  );
}
const Rt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAydpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAzIDc5Ljk2OTBhODdmYywgMjAyNS8wMy8wNi0yMDo1MDoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDZFQkU2NEQ4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDZFQkU2NEM4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI2LjExIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRENDVBNjQzODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRENDVBNjQ0ODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+pHX+ogAAD+lJREFUeNrsnXtwVPUVx2/CZvMgQEhCSAwJJDzDqwgodCq08hAr7wpSo1M6o/5Rq6NUcdqp1XamdjqOY6mvWhWnttZpRRtbaRGpMMKMZlB8gaFaQoQQSEhIQt7hkfTzhY1ulnt37929mw1T7sxls3vv/f3O7/zO43vO7/wucd3d3calI/zDo3927txpnDx5MqaEpKenpyUlJWUlJCQM6+rqSm1vb/fyGRcfH9+dkpLSGRcX13Lq1Knajo6Omvr6+ia+x4zWtLQ0Y86cOee/SAKLiopiyjwYlz5ixIhyPk8PGDBAKnHB6fF4unU9Ly+vDCanxpLeqVOnnuObznj9kJycHFMGwpRrjh8/Xoh0ec6ePWt6z5kzZwxdr62tLcrPz786lvT68ys+1jYEaTJQx+tRT1v3w0QDabweSe0XNjDmDBwyZEh6U1PTPCfPtLS0LOK5QZcYyDF48OAFjY2N6U6eaWhoyIaBc//vGSg1RIXXSC2dHG1tbYbX610dS08cUwYmJiYa2dnZWRMmTFiO9C0Ipw3UfgnoYfHw4cMzYWZscWAEeChj2LBha8CQm+vq6g6D26xnKj5eWC+dZ67l71VI0dxDhw5lYM/C6vvYsWMZzc3Nm4cOHVo7atSot/Hem6DjzRMnTjQGCw4k9RkZGYWYgGtrampeZCKaIuKgOps+fbrj55AgwYmPkabunJyceqThEaQhT4wKJPiyyy4bx/VHgStVQABTnBfpCdjuhp7D9PMw9BQGemnRBc0FXP8tdDaKbhj/Hn+Pdjr2WbNmfYkDw2IgjJgDMdX+A1DEwG8nUEsNYJTUSp98fzIrK6tF16PBuMBT/cCUk/T7Gz5HiI7c3NwxfN8gxgXSweRWcv3KPmOgQG9mZmaz1QAUScDIhvHjx/8Zgmsx9GExAjXrLigo6Ebrw2YkdBwdN26c6GgKNoGYoXoioblRZyAqsoDOWqMlOVJDbKQY10Zf3VJ3feo7Nuvc92hJsqQWJn7DKQNtOxHEfCZw4xVCqRS3PNigQYMEpCv5/BBJfa+zs3MfElyB1D1RWlp6le45fPiwMXv27D2o4p04ikI+p0D4FTiQaXjw3HCdUOCBQxmMxJZgdubhoPa56kRQ2REw8LAbMy3jjRmoxiY9VVhYuABmDRKs6TnGjBlTTNKg1zP6zu83+sMgVHwwTmAhpuIZJKcWxroiibT1OTRluabCqampKajQO5ESBmCWOn6GF7wLdckyi2WZpALOBrPn9TsGv8AMliA52UzIj5iYA+onUloZ778xJ4muMBD1SoGwzyIhiIE3MMCfgNks01AQrLTa1mDt6LruC5JTHEI/D8ppRELvyJEjPxo4cKDXNScyevTomwPVyq668uxmGDg2VNg1ceLEO0JhRF2HiT8M1o76ob8izMO2cNRajoxnV7rqhZFCL7OyzwkhOIcuIMRPmUk70GgCxrvFTrvc18z940O1iekZgH38JbQ7Vd/3oHmA6zAGSbrJrhTidFox8KsCo5IgA93pZJCo6ds8F28nWQFDbka1OxxI34qo4EBmMgGmfBqKCHCiJGS+HQQgdUN175OqOzUNPLfeTjZG9+C8FsPEdhvS9z7SFx81II0UrglmpyCykxn8tl0IhVmYisFvDxP4tsOYqXb7gjkrMStnrNqDcWe5Z4lTIO0onQWQbfAt+lxwyNYRRfzg4MGDW2wmUhOQpGcBsElhAt8kJvNZtWPn/i+++KIE03K31fqPxqXxRS0bIxVmhj62in9xGE9pfcOu6k6aNOnBSMGvnqedB+wmVpVYgM4XrMJBNOxd7GB0VJhI4HtWtgpV2oskpNhcwjRwGt/CVp5yI3JQO7T3TbVr5wCLDiHaOGDlRGDid1yPhQVjWFa8j1jVbFFI4n8Xeck2q0Qqz3tQ78kQOI+k6yLWNOYQUycYLhxqBwncgj3dRV9bSdRuJ0beS6x81izBS98nsdXr8OL/CIyjtVQAU36MOXqttbW1yzUVxjEs1eyYzRoq8XJgSl2xKjnATKR2Cd7ycWZ1H/any40wK1S4qH7UH/0+pv5Fh3+s3UPf2LFj/2nWhnAjaONq1yRQdo2ZvUWzY5LSbyeNvl5runQcx/ciZk+dL2J2Z2PohyEJfbY+cfr0aYOlhTjOSXydBE13oiG12O5Svm9FqnYgnWWiCfru4fpC/u6lCbpGaH0ra887tJgf8ZoI4p6Lei40U01sz9sQlE9m5A6YOB9mToFpHruL5NE+xAzOYfy5FC1ZygSfAf7sxQa+hfS8zue7e/bsmRuo6jD3OmxlJuahLmIVRtRvCfSWwoL8LuDZKpEPN+scq1P04vTOJWo1jkBs60uffTdiFZaU4SCuC5QoPJ9x5MgRgwqqFOMiPDRwLcZxJgsXajxK3Bp+5SOYLgUEfwlrXRj9V6NDMcSrUdG5JoDa6C+1KYYLi/tmBU2Yo4WMfwVOaYj4EdQGqgHdhN6nq2QCyVuB07imoqIiB8N7wUMwtWvmzJmf7Nq1a1qwteCLgXkzZswo271798TAa0ePHs2BiSX4gCqY+CYOpYTvu6hNbOzFcH1ZsmTJdFz/CyQBjuFF7YDXJmZnFHZix8Vk+wJP6H9r8uTJExTDh7oX3KhEaxWQ7vnly5dP7RWJFBcXb3TSMThpr5A/uTmCkPyai5F5ohu4kqcYnr/LnTy7du3ax3slE3ASmU5EH3Uvl+qyenUYULrWt3Z70RyiV3RXV1dX+szXQSfPo85ZvZwIbj3DSQPcXynQqoPsyxuk0H9mNxaN9SE6off+8vLyN3rANzb/iMPxD+vFQBxFooOHJbp1PQU8mkGY+BA29LX+UG4WCpZBZwn0/qrH+Yl+6K5z0g78SurFQJIEHidE0GFbYBBOjfMtGNj/9mcGApw/h85bTcLSNieT788v1+oDCXvqmc1iDHN7f2Se6BJ9otP1AksM6hm7D0j0Ud9ki6zv+xjoO1Sy0Z8O0SO6oG+PxS0pTjYc+fMr3peO73QSBnFkWon8gQMHngcvPR0MvfflITqg53eiywpMczhyovCroxcDYYpTsc6zYpDi5srKynUY69L+wECl6UWPVYZI40CrRjiMpet6MZDA+YRDHDQaMba0uoQ8HaSEbqKepTqWzKP/Y6IDejqDwJoEoEyBQ6mu/ZKBsmm45d8zU6/QYb2dXUtkKwqxKzlG8FWzg2SxYyqFqFopdFSEsI/5jGdkqLZUk0P+sA6k8VeyOF+aA49gCcXepaRzVpMYzeYmbXpZAVPnEThnmG1BIEk5kFT5FMXcweAOkxNTdI3XTQpVHYEETqMwPcFqSxfOp5Y4eDtjKYFxO5iQ4/zWOxsjQypEXn3+eIkE6ktkZoYTbC/C7W/goaGBuI9n5uNItlp5LxHOtaQY5/2SguE70ci5kLzmBdeI88WodYx/G8C7tify8nM81jhQBhem1ezfv/+PMHKnmSfGDi7TaluIiCUxxgxMDCaB0J+EMCwyzLegbSsrK3sJ4N2LeY422ijMQXS3mC2Ys3Aznhm6KtjsMgBvjBnoDSaBmKz5mKlRZhuBEJAtdrBhyEgED/Yvrb4ZF274k/243aoaIU4LD/1YArUUize93Wy1Ea3T/pttrmz1YiG6kgWY7Rbh2zKytWMtJHBAP5FA07UHnODXUM9rLFT7DSTzuCsM9AHQ58xKa/FeiXT2oJkUQrinPzCQifSYSR8e9hcsTXhM6hXlUJ+zsyZsO5mApG0hjf+Z2TVmsRjoM8dEAj3Yz4RYMpD+TRnI0oX2yS03e4Zxfsh4t7u6WxN70MmsPRJYImGcX2CKg9DHkMTEfiiBqpvxBFRTpCJhG8z2GAr3wfCHwcBnXd/uyoz9CWy03+xaVVXVNLK8v/aPjyEkAcZ6YiyBCaLD8CtTwfY9ypq2aY0149sDDt4Ulf3CkkJm817fqt0FL4SAiXejGsV+EpggCQhn4LJRlGC0UjXwAZ9t4e4Hpn+P6OjBpdB3G8y7zWwpFkfJz13rnUif4/3CEJFkhY0Ea1Dx51ixO0bebQcz73Uigb79xN1AiFIkWXt//654GqNOmD56GZO0GkQwG+8YZ3ct2qfCXl858XU8+6QZbPHdq3fUJEatQpWBeKwqVP1PVKQBqblCZWUA1dOh7tfmQhhUxjrzQwxyurygRf9iwnTdR0Bfps2HNnZ8noaWDLLRc4LtMO05abcUtBEXlQpVBnmD3c3SSNIJOlnvA+BmBd1apD4CM5QFmsd9Xoc75b08N1/Pqx2rYgCkuY2NivfzedIO3WoHIVnsOgMlfajmRw4Xrs8VOxp+WxNwNI3sNHqFoszVwIW0SOtr9LzaUXtqV+37lyHTvzY2Ot1o806oOulwtnrd4HSrvl7VxHPa/dh9+eWXf8zmmJtQp5xovSDC53hy6Odm+lMN4Ln+RYcTuu1IoaNtDkhfMrjpAbOUT4istUFx0jnnAlZMIzHhxcNVR6v4Uu3iIGr14jKcRZr6Vf92IwrjqzVfwZ+fI4Vet7wwzim+wwgPh4l5OvNRrefBWeuQjMcJATeRzWl049V78t6oagZ27gaSv3eCAIoinSTalLTEueaF8agFDP6oG0U9vm38hygPfgQH8HUcQqLd/SX+6oqj0j7muXqZBO1VhbOb1DDfl1yB9851dZsD8W4FkrNKdXJIzsBIZlemgOWDfPDZPYDXe4AjBzD+eyBmN5LzKav+lZz1fO9Ags8qq8OZjASnw7g8PrWUcAUqOhNVLVBI5tZLJBEUacX1aEiV60AaBP8OErOGDv5GB143ymz10kfOMXwdg7Ffo8IfGNSFd21BKmU2ZMA82LEkbNMggWjtVXFq1+wcePM2+l/F5H4QtRfv+HY+Lg2281F5VL0nBmhRohmNZSE5/dcRDpbAnPZghfBoVhNwZ6ERxmtP4p0ymxl6Hc+8DMhQH8hcCG7Gtj2Jqs3gvpVI1Sy+/wEC+2zfg+gQw5jAZ5DkK1lUX4lkzdTLKSRlJgmEGuzyYu7bZvTlq5/oeBqz9h9tgYCZzQDZp/htTCA4loPAfk7h+tMY6Dqne4PtnnIi9FNDP0/QT1Fg5YS+Y2sncP1ZvftGu5owSZ/oFVZGX7/6yfiq0jObmb4XIsaGqoURY2F0Nip1K+cWBtMU6Xu0tP1M0Qftbeb8PhqQFSq6EZ1imujWy9PCGbdrDDQiqxLNo8D7Rql9OMyDCfU8vwqpz+3r6tiYM9BfGrBNr4XDQJ570c47GaLNwJi+wVJwhPNls6UCI0SdCuHlpv6wRyXm71DV+ithWKPDdFYN4eEOw7j0ElrFybUsSDliBjBqGwC86RIDjfPbDLAlr9qNh+UwyOy8avXC7pgw0Gwrf18ebNjZijc+EgoK6TrQqZxyvO2xpNe/5O8cxRs3bjT6cme5yVEHJpzBZzbAPAvpSiW3l+j/nxGA75qZ6OMQf4xYvCnGr67/KvK59N9hRHb8T4ABAPaAkPNeKkdCAAAAAElFTkSuQmCC", Ft = ":host{display:block;height:100%;color-scheme:dark;font:13px/1.4 Segoe UI,sans-serif;color:#dbe5f0;container-type:size}*{box-sizing:border-box}[hidden]{display:none!important}main{height:100%;min-height:260px;background:#171d25;display:flex;flex-direction:column;overflow:hidden;-webkit-user-select:none;user-select:none}button,input,select,textarea{font:inherit;color:inherit;border:1px solid #425165;border-radius:6px;background:#253140;padding:7px 9px;min-width:0}button{cursor:pointer;white-space:nowrap}button:hover{background:#354459}button:disabled{opacity:.45;cursor:default}.primary{background:#b99a38;border-color:#d0ae46;color:#111820;font-weight:600}.primary:hover{background:#e0bd51}button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid #f2c94c;outline-offset:1px}input,select,textarea{background:#111a24}input,textarea,td,dd{-webkit-user-select:text;user-select:text}input[type=checkbox]{accent-color:#e6c354;width:16px;height:16px}header{display:flex;gap:7px;align-items:center;padding:8px 12px;border-bottom:1px solid #354459;flex-shrink:0;overflow-x:auto}.brand{display:flex;gap:7px;align-items:center;margin-right:8px}.brand img{width:32px;height:32px;object-fit:contain}.brand b{font-size:17px}.brand small{font-size:10px;color:#a6b5c7}#dirty{margin-left:auto;font-size:11px;color:#cabb81;white-space:nowrap}.notice{background:#1c2735;padding:5px 12px;font-size:12px;min-height:27px;max-height:70px;overflow:auto;color:#a7bbd1}.notice.error{color:#ffaaa1;background:#412725}.workspace{display:grid;grid-template-columns:230px minmax(0,1fr);flex:1;min-height:0}aside{padding:10px;display:flex;flex-direction:column;gap:9px;border-right:1px solid #354459;min-height:0}#checks{overflow:auto;flex:1;min-height:0}.check-item{display:flex;flex-direction:column;gap:5px;width:100%;margin-bottom:5px;text-align:left;white-space:normal}.check-item small{color:#a8b7ca}.check-item.active,.tabs .active{border-color:#c7ab56;background:#403b2c;color:#ffe399}.main{display:flex;flex-direction:column;min-width:0;min-height:0}.test-toolbar{display:flex;gap:7px;padding:8px 12px;align-items:center}.test-toolbar input{flex:1;font-weight:600}.tabs{display:flex;gap:7px;border-bottom:1px solid #354459;padding:0 12px 8px}.tabs button{min-width:105px}#content{flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column}.empty{padding:28px;color:#a4b4c9;text-align:center;margin:auto}h2,h3,p{margin:0 0 10px}h2{font-size:20px}h3{font-size:15px}label{display:flex;flex-direction:column;gap:5px;font-size:12px;color:#b8c6d7}.check{flex-direction:row;align-items:center;gap:6px}small{font-size:11px;color:#a8b7c9}.parameters{display:flex;gap:18px;align-items:end;padding:10px 12px}.parameters input{width:140px}.selection-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0 12px 12px}.selection{border:1px solid #39495e;border-radius:8px;padding:12px;background:#1b2633;min-width:0}.selection h3{display:flex;justify-content:space-between}.selection h3 span{color:#92c4b2;font-size:12px}.selection select[multiple]{width:100%;min-height:70px}.selection-tools{display:flex;gap:5px;flex-wrap:wrap;margin:8px 0}.selection-tools button{font-size:11px;padding:5px 7px}.selection>label{margin-bottom:8px}.condition{display:grid;grid-template-columns:minmax(80px,1fr) 100px minmax(70px,1fr) 29px;gap:5px;margin:6px 0}.condition button{padding:3px}.rules,.report{padding:18px;max-width:850px}.rules>label{margin:14px 0}.rules>p,.report>p{color:#a9b8cb}.report>button{margin:12px 8px 14px 0}.result-tools{display:flex;gap:7px;flex-wrap:wrap;padding:8px 12px}.result-tools input{flex:1;min-width:180px}.result-area{display:grid;grid-template-columns:minmax(0,1fr) 300px;flex:1;min-height:0}.table-area{display:flex;flex-direction:column;min-width:0;min-height:0}.scroll{overflow:auto;flex:1;min-height:0}table{border-collapse:separate;border-spacing:0;width:max-content;min-width:100%}th{position:sticky;top:0;background:#2a3748;z-index:1;text-align:left;max-width:240px;white-space:normal}th,td{padding:8px;border-bottom:1px solid #344154;vertical-align:top}td{max-width:320px;min-width:90px;overflow-wrap:anywhere;-webkit-user-select:text;user-select:text}td:first-child{min-width:36px}tr.active td{background:#453e29;color:#fff0b5}tr:hover td{background:#2c3847}.pager{display:flex;gap:10px;align-items:center;justify-content:center;padding:5px;border-top:1px solid #39495e;font-size:11px}.pager button{padding:2px 8px}.detail{border-left:1px solid #354459;padding:10px;overflow:auto}.detail h3{overflow-wrap:anywhere}.detail>label{margin:10px 0}.detail p{font:11px/1.5 Consolas,monospace}.detail details{border-top:1px solid #354459;padding:8px 0}summary{cursor:pointer}dl{font-size:11px;display:grid;grid-template-columns:1fr 1fr;gap:7px}dt,dd{overflow-wrap:anywhere;margin:0}dt{color:#9baec4}footer{border-top:1px solid #354459;padding:4px 12px;display:flex;justify-content:space-between;color:#91a4bb;font-size:11px}dialog{border:1px solid #53647c;border-radius:12px;background:#202c3a;color:#dbe5f0;width:min(700px,92vw);max-height:85vh;padding:20px;box-shadow:0 15px 60px #000a}dialog::backdrop{background:#000a}dialog p{margin:12px 0}dialog a{color:#f2c94c;margin-right:12px}.dialog-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:16px}@container (max-width:950px){.workspace{grid-template-columns:185px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 240px}.selection-grid{grid-template-columns:1fr}.parameters,.test-toolbar{flex-wrap:wrap}.test-toolbar input{flex-basis:100%}}@container (max-height:400px){header{padding:5px 10px}.test-toolbar{padding:5px 10px}.tabs{padding-bottom:5px}.brand img{width:25px;height:25px}footer{display:none}}:host{font-size:12px}.brand img{background:#e1e7ef;border-radius:5px;padding:3px}.selection-tools button{font-size:12px}label{font-size:13px}.choose-layout{display:grid;grid-template-columns:220px minmax(0,1fr);min-height:0;flex:1;overflow:auto}.choose-layout .parameters{display:flex;flex-direction:column;align-items:stretch;gap:15px;border-right:1px solid #354459;justify-content:flex-start}.choose-layout .parameters input{width:100%}.choose-layout .parameters input[type=checkbox]{width:16px}.choose-layout .selection-grid{padding:10px 12px;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start;min-width:0}.selection select[multiple]{height:180px;resize:vertical}.selection-mode{font-size:12px;color:#b6c4d5}.preset-row{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:9px}.preset-row select{flex:1 1 160px}.preset-row button{padding:5px 7px;font-size:12px}.model-list{height:150px;overflow:auto;border:1px solid #425165;border-radius:6px;background:#111a24;padding:5px;margin-bottom:5px}.model-list label{display:flex;flex-direction:row;align-items:center;gap:7px;padding:4px 5px;color:#dbe5f0;overflow-wrap:anywhere}.model-list label:hover{background:#253140}.model-list .model-all{position:sticky;top:-5px;z-index:1;background:#1f2b39;border-bottom:1px solid #425165;font-weight:600}.legend{display:flex;gap:12px;flex-wrap:wrap;font-family:inherit!important}.part-a{color:#ff6161}.part-b{color:#65baff}.preview{display:block;width:100%;padding:5px;margin:8px 0}.preview img{display:block;width:100%;max-height:180px;object-fit:contain}.image-dialog{width:94vw;max-width:1500px}.image-dialog img{display:block;max-width:100%;max-height:75vh;margin:10px auto}#help-dialog{width:min(1000px,94vw);line-height:1.6}#help-dialog details{padding:12px 0;border-bottom:1px solid #425165}#help-dialog summary{font-size:16px;font-weight:600;color:#f0d27a}#help-dialog li{margin:8px 0}@container (max-width:1100px){.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .selection-grid{grid-template-columns:1fr}.condition{grid-template-columns:minmax(60px,1fr) 100px minmax(60px,1fr) 29px}}@container (max-width:700px){.choose-layout{display:block}.choose-layout .parameters{border-right:0;border-bottom:1px solid #354459}.workspace{grid-template-columns:160px minmax(0,1fr)}}button,input,select,textarea{padding:5px 7px;border-radius:5px}button{min-height:27px}input[type=checkbox]{width:14px;height:14px}.commandbar{position:relative;display:flex;gap:8px;min-height:45px;padding:5px 8px;overflow:visible;background:#131b25}.brand{flex:0 0 auto;margin-right:0;gap:5px}.brand img{width:28px;height:28px}.brand b{font-size:14px}.check-heading{display:grid;grid-template-rows:25px 12px;flex:0 1 230px;min-width:145px}.check-heading input{height:25px;border:0;background:transparent;padding:2px 5px;font-weight:600}.check-heading small{padding:0 5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:9px}.tabs{align-self:stretch;align-items:center;flex:0 0 auto;gap:3px;padding:0;border:0}.tabs button{flex:0 0 auto;min-width:0;padding:5px 9px;background:transparent;border-color:transparent}.tabs .active{background:#3e3828;border-color:#b99a38}.header-actions{display:flex;align-items:center;gap:4px;margin-left:auto}#dirty{margin-left:0;width:0;height:0;overflow:visible;font-size:0}#dirty:not(:empty){width:7px;height:7px;border-radius:50%;background:#e5bd43;box-shadow:0 0 0 2px #e5bd4328}.more-menu{position:relative;z-index:20}.more-menu summary{display:grid;place-items:center;width:29px;height:29px;border:1px solid #425165;border-radius:5px;background:#253140;cursor:pointer;list-style:none;font-size:18px}.more-menu summary::-webkit-details-marker{display:none}.more-popover{position:absolute;right:0;top:calc(100% + 5px);display:grid;width:190px;gap:3px;padding:6px;border:1px solid #506176;border-radius:7px;background:#192431;box-shadow:0 12px 35px #000a}.more-popover button{text-align:left}.notice{min-height:23px;max-height:45px;padding:3px 9px;font-size:10px}.run-progress{display:grid;grid-template-columns:minmax(150px,auto) minmax(120px,1fr) auto;align-items:center;gap:8px;min-height:24px;padding:3px 9px;border-bottom:1px solid #425165;background:#202a20;color:#d9e7d2;font-size:10px}.run-bar{width:100%;height:7px;overflow:hidden;border-radius:2px;background:#101810}.run-bar i{display:block;width:0;height:100%;background:#e3bc43}#run-phase,#run-value{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#run-value{text-align:right;color:#b9c9b3}.workspace{grid-template-columns:190px minmax(0,1fr)}aside{gap:6px;padding:7px;background:#141c26}.aside-title{font-weight:600;font-size:12px}.aside-actions{display:grid;gap:5px}.check-item{gap:2px;margin-bottom:3px;padding:6px 7px}.check-item small{font-size:9px}.main{background:#171d25}#content{overflow:hidden}.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .parameters{gap:9px;padding:8px}.choose-layout .selection-grid{gap:8px;padding:8px}.selection{padding:8px}.selection h3,h3{font-size:13px;margin-bottom:6px}label{gap:3px;font-size:11px}small,.selection-tools button,.preset-row button{font-size:10px}.model-list{height:125px}.model-list label{padding:2px 4px}.selection-tools{gap:4px;margin:5px 0}.selection-tools button,.preset-row button{padding:3px 5px;min-height:23px}.result-tools{display:flex;align-items:center;justify-content:space-between;gap:6px;flex-wrap:nowrap;min-height:38px;padding:5px 7px;border-bottom:1px solid #354459;background:#151f2a}.result-filters,.bulk-tools{display:flex;align-items:center;gap:5px;min-width:0}.result-filters{flex:1}.result-filters input[type=search]{flex:1 1 190px;min-width:120px}#result-depth{flex:0 1 125px;min-width:92px}#result-count,#selection-count{color:#9fb0c4;white-space:nowrap;font-size:10px}.bulk-tools select{max-width:125px}.result-area{grid-template-columns:minmax(0,1fr) 310px}th,td{padding:5px 6px;font-size:11px;line-height:1.25}th{max-width:190px}td{max-width:260px;min-width:76px}.pager{justify-content:flex-end;min-height:29px;padding:3px 7px}.pager #selection-count{margin-right:auto}.detail{display:flex;flex-direction:column;min-width:0;padding:0;overflow:hidden;background:#141e29}.detail-head{display:flex;align-items:center;justify-content:space-between;gap:6px;min-height:47px;padding:7px 8px 4px}.detail-head>div:first-child{min-width:0}.detail-head small{color:#8093aa;letter-spacing:.08em}.detail-head h3{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin:0}.detail-nav{display:flex;gap:3px}.detail-nav button{min-width:27px;padding:2px 7px;font-size:17px}.clash-summary{display:flex;gap:5px;padding:0 8px 5px;color:#adbdcf;font-size:9px}.clash-summary span{padding-right:5px;border-right:1px solid #405064}.clash-summary span:last-child{border:0}.detail .legend{margin:0;padding:0 8px 5px;font-size:10px}.preview-slot{height:clamp(92px,18cqh,145px);flex:0 0 auto;margin:0 7px 6px;overflow:hidden;border:1px solid #37475b;border-radius:6px;background:#0e151d}.preview{position:relative;width:100%;height:100%;margin:0;padding:0;border:0;background:transparent}.preview img{width:100%;height:100%;max-height:none;object-fit:contain}.preview span{position:absolute;right:5px;bottom:5px;padding:3px 6px;border-radius:4px;background:#101923db;font-size:9px}.preview-empty,.detail-empty{height:100%;display:grid;place-content:center;justify-items:center;gap:4px;color:#788ba1}.preview-empty>span,.detail-empty>span{font-size:24px}.detail-actions{display:grid;grid-template-columns:1fr 1fr;gap:5px;padding:0 7px 7px}.detail-scroll{flex:1;min-height:0;overflow:auto;padding:7px 8px 12px;border-top:1px solid #354459}.detail-scroll>label{margin:7px 0}.detail p{font:inherit}.coordinates{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;font:9px/1.3 Consolas,monospace;color:#91a3b7}.coordinates span{overflow:hidden;text-overflow:ellipsis}.detail details{padding:6px 0}.detail dl{font-size:10px}.detail-empty{padding:20px;text-align:center}footer{padding:2px 8px;font-size:9px}@container (max-width:1050px){.workspace{grid-template-columns:165px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 270px}.check-heading{flex-basis:185px}.tabs button{padding-inline:6px}#dirty{display:none}}@container (max-width:820px){.brand b,.brand small,#result-count{display:none}.check-heading{flex-basis:155px}.result-tools{overflow-x:auto}.result-area{grid-template-columns:minmax(0,1fr) 245px}}@container (max-height:410px){.notice,footer{display:none}.preview-slot{height:90px}}", Ce = /* @__PURE__ */ new WeakMap(), gt = "nashepo.collisionfinder360.project.", Ze = () => ({
  format: "nashepo.checks",
  version: 1,
  checks: [],
  sets: []
}), at = (t) => {
  if (!(!t || typeof sessionStorage > "u"))
    try {
      const e = sessionStorage.getItem(gt + t);
      return e ? ut(e) : void 0;
    } catch {
      return;
    }
}, rt = (t, e) => {
  if (!(!t || typeof sessionStorage > "u"))
    try {
      sessionStorage.setItem(
        gt + t,
        JSON.stringify(e, (i, r) => i === "image" ? void 0 : r)
      );
    } catch {
    }
};
function Ut(t, e) {
  const i = t.shadowRoot || t.attachShadow({ mode: "open" }), r = vt(t);
  let s = e.projectToken(), n = e.projectId(), o = s && (Ce.get(s) || at(n)) || Ze();
  s && Ce.set(s, o);
  let l, m = o.checks[0]?.id || "", f = "select", u = "", h = 0, M = !1, k = !1, A, O = !0, q = !1;
  const C = /* @__PURE__ */ new Set();
  let de, Z, K = 0;
  const U = () => o.checks.find((a) => a.id === m), g = (a) => i.querySelector("#" + a);
  i.innerHTML = `<style>${Ft}</style><main><header class="commandbar"><div class="brand"><img src="${Rt}" alt=""><b>НашеПО</b><small>${Mt}</small></div><div class="check-heading"><input id="name" aria-label="Имя проверки" placeholder="Выберите проверку"><small id="check-summary">Проверка не выбрана</small></div><div id="tabs" class="tabs">${[
    ["select", "Выбор"],
    ["results", "Результаты"],
    ["rules", "Правила"],
    ["report", "Отчёт"]
  ].map(([a, c]) => `<button data-tab="${a}">${c}</button>`).join(
    ""
  )}</div><div class="header-actions"><button id="scan" title="Перечитать список и геометрию выбранных моделей">↻ Модели</button><button id="run" class="primary">▶ Запустить</button><button id="cancel" hidden>Остановить</button><details class="more-menu"><summary title="Другие команды">⋮</summary><div class="more-popover"><button id="open">Открыть проверки</button><button id="save">Сохранить проверки</button><button id="copy">Копировать проверку</button><button id="delete">Удалить проверку</button><button id="settings">Настройки</button><button id="help">Справка</button></div></details></div><span id="dirty"></span></header><div id="run-progress" class="run-progress" hidden><span id="run-phase">Подготовка</span><div id="run-bar" class="run-bar" role="progressbar"><i id="run-fill"></i></div><span id="run-value"></span></div><div class="notice" id="notice" role="status">Откройте IFC/SMDX в проекте и нажмите «Модели».</div><div class="workspace"><aside><div class="aside-title">Проверки</div><input id="test-search" type="search" placeholder="Поиск проверок"><div id="checks"></div><div class="aside-actions"><button id="all">Запустить все</button><button id="new" class="primary">＋ Новая проверка</button></div></aside><section class="main"><div id="content"></div></section></div><footer><span id="model-count">Модели не прочитаны</span><span>Расчёт выполняется на вашем компьютере</span></footer><input id="file" type="file" accept=".json" hidden><dialog id="settings-dialog"><h2>Настройки</h2><label>Дистанция камеры, м<input id="distance" type="number" value="15" min="0.5"></label><p class="links"><a href="https://nashepo.ru/" target="_blank" rel="noopener noreferrer">Сайт НашеПО</a><a href="https://t.me/RoburFan" target="_blank" rel="noopener noreferrer">Telegram</a></p><button data-close="settings-dialog">Закрыть</button></dialog><dialog id="help-dialog">${wt}<button data-close="help-dialog">Закрыть</button></dialog><dialog id="set-dialog"><h2>Сохранить набор моделей</h2><label>Название<input id="set-name" maxlength="120"></label><div class="dialog-actions"><button id="set-cancel">Отмена</button><button id="set-confirm" class="primary">Сохранить</button></div></dialog></main>`;
  const R = document.createElement("button");
  R.id = "clear-project", R.textContent = "Очистить проект", g("save").after(R), i.querySelector(".more-popover").addEventListener(
    "click",
    () => i.querySelector(".more-menu").removeAttribute("open")
  );
  const j = (a, c = !1) => {
    g("notice").textContent = a, g("notice").classList.toggle("error", c);
  }, D = (a, c, p, d) => {
    const x = g("run-progress"), S = g("run-bar"), w = g("run-fill");
    if (x.hidden = !1, g("notice").hidden = !0, g("run-phase").textContent = a, p && p > 0 && c !== void 0) {
      const v = Math.max(0, Math.min(100, c / p * 100));
      w.style.width = `${v}%`, S.setAttribute("aria-valuemin", "0"), S.setAttribute("aria-valuemax", "100"), S.setAttribute("aria-valuenow", String(Math.round(v))), g("run-value").textContent = `${Math.round(v)}% · ${c}/${p}` + (d === void 0 ? "" : ` · найдено ${d}`);
    } else
      w.style.width = "0", S.removeAttribute("aria-valuenow"), g("run-value").textContent = d === void 0 ? "" : `Найдено ${d}`;
    S.setAttribute("aria-valuetext", g("run-value").textContent || a);
  }, y = () => {
    g("run-progress").hidden = !0, g("notice").hidden = !1;
  }, b = async (a) => {
    try {
      await a();
    } catch (c) {
      j(c instanceof Error ? c.message : String(c), !0);
    }
  }, N = () => new Promise((a) => {
    const c = g("set-dialog"), p = g("set-name");
    let d = !1;
    const x = (S) => {
      d || (d = !0, c.close(), a(S));
    };
    p.value = "Новый набор", g("set-confirm").onclick = () => {
      const S = p.value.trim();
      S ? x(S) : p.focus();
    }, g("set-cancel").onclick = () => x(), c.oncancel = (S) => {
      S.preventDefault(), x();
    }, c.showModal(), p.focus(), p.select();
  }), I = () => {
    q = !0, g("dirty").textContent = "Есть несохранённые изменения", s && Ce.set(s, o), rt(n, o);
  }, Y = () => {
    const a = e.projectToken();
    return !a || a === s ? !1 : (!s && (o.checks.length || o.sets.length) ? Ce.set(a, o) : o = Ce.get(a) || at(e.projectId()) || Ze(), Ce.set(a, o), s = a, n = e.projectId(), l = void 0, m = o.checks[0]?.id || "", u = "", C.clear(), h = 0, q = !1, e.clear(), g("dirty").textContent = "", !0);
  }, z = () => {
    const a = U();
    a?.lastRun && (a.status = "stale"), I(), T();
  }, Q = () => [
    ...new Set(
      (l?.elements || []).flatMap((a) => Object.keys(a.properties))
    )
  ].sort(), $ = (a, c) => a.map(
    (p) => `<option value="${oe(p)}" ${p === c ? "selected" : ""}>${oe(p)}</option>`
  ).join("");
  function P() {
    const a = U(), c = g("result-search")?.value.toLowerCase() || "", p = g("result-state")?.value || "", d = Number(g("result-depth")?.value || 0);
    return (a?.results || []).filter(
      (x) => (!p || x.state === p) && (a?.type === "duplicates" || // A depth that is not a plain measurement is left to a person, so no
      // threshold hides it. Otherwise the same allowance as the calculation
      // itself, so one number typed in three places selects the same rows.
      x.depth !== void 0 && x.kind !== "touch" || (x.penetrationMm ?? 0) + (a?.precision ?? 0) >= d) && (!c || JSON.stringify({ ...x, image: void 0 }).toLowerCase().includes(c))
    );
  }
  function T() {
    const a = g("test-search").value.toLowerCase();
    g("checks").innerHTML = o.checks.filter((c) => c.name.toLowerCase().includes(a)).map(
      (c) => `<button class="check-item ${c.id === m ? "active" : ""}" data-check="${c.id}"><strong>${oe(c.name)}</strong><small>${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[c.status]} · ${c.results.filter((p) => !["resolved", "excluded"].includes(p.state)).length} в работе / ${c.results.length}</small></button>`
    ).join("");
  }
  function te(a, c) {
    const p = l?.elements.filter(
      (E) => (U().includeHidden || !E.hidden) && Pe(E, a)
    ).length || 0, d = a.manualOnly ? be(a) : a.modelsMode === "selected" ? a.models : (l?.models || []).map((E) => E.id), x = l && d.every((E) => l.indexedModelIds.includes(E)) ? `${p} элементов` : "число после запуска", S = l?.models || [], w = a.modelsMode !== "selected", v = o.sets.map(
      (E) => `<option value="${oe(E.id)}" ${a.presetId === E.id ? "selected" : ""}>${oe(E.name)}</option>`
    ).join("");
    return `<article class="selection" data-side="${c}"><h3>Выбор ${c.toUpperCase()} <span data-selection-count>${x}</span></h3>${a.manualOnly ? '<p class="selection-mode">Только элементы, выбранные вручную</p>' : ""}<div class="preset-row"><select class="preset"><option value="">Набор моделей…</option>${v}</select><button data-selection="load-set">Применить</button><button data-selection="save-set">Сохранить набор</button><button data-selection="delete-set" ${a.presetId ? "" : "disabled"}>Удалить</button></div><div class="model-list"><label class="model-all"><input type="checkbox" class="all-models" ${w ? "checked" : ""}> Все модели</label>${S.map((E) => `<label><input type="checkbox" class="model-check" value="${oe(E.id)}" ${w || a.models.includes(E.id) ? "checked" : ""}> ${oe(E.name)}</label>`).join("") || "<small>Нажмите «Модели».</small>"}</div><small>Отметьте файлы, которые должны участвовать в выборе ${c.toUpperCase()}.</small><div class="selection-tools"><button data-selection="show">Показать выбранные элементы</button><button data-selection="only">Только выделенные в 3D</button><button data-selection="include">＋ Добавить из 3D</button><button data-selection="exclude">− Исключить из 3D</button><button data-selection="reset">Сбросить ручной выбор</button></div><small>Добавлено вручную: ${a.include.length} · исключено: ${a.exclude.length}</small></article>`;
  }
  function J() {
    T();
    const a = U();
    g("name").value = a?.name || "", g("check-summary").textContent = a ? `${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[a.status]} · ${a.results.filter((c) => !["resolved", "excluded"].includes(c.state)).length} в работе / ${a.results.length}` : "Проверка не выбрана";
    for (const c of ["name", "copy", "delete", "run"])
      g(c).disabled = !a || M;
    for (const c of i.querySelectorAll("[data-tab]"))
      c.classList.toggle("active", c.dataset.tab === f);
    if (!a) {
      g("content").innerHTML = '<div class="empty"><h2>Создайте первую проверку</h2><p>Обновите модели, затем выберите, какие элементы проверять друг с другом.</p></div>';
      return;
    }
    f === "select" && (g("content").innerHTML = `<div class="choose-layout"><div class="parameters"><h3>Параметры проверки</h3><label>Тип<select id="type"><option value="intersection" ${a.type === "intersection" ? "selected" : ""}>По пересечению</option><option value="duplicates" ${a.type === "duplicates" ? "selected" : ""}>Дублирование</option></select></label><label title="Разрешение замера глубины; не гарантирует погрешность итоговой оценки">Точность расчёта, мм<input id="precision" type="number" value="${a.precision}" min="0.001" max="100" step="0.1"></label><label title="Конфликты с меньшей оценкой глубины не попадут в результат">Минимальная глубина, мм<input id="min-penetration" type="number" value="${a.minPenetration}" min="0" max="100000" step="1" ${a.type === "duplicates" ? "disabled" : ""}></label><label class="check"><input id="touching" type="checkbox" ${a.touching ? "checked" : ""} ${a.type === "duplicates" ? "disabled" : ""}>Учитывать касания</label><small>Глубина — оценка локальной толщины перекрытия. Пояснения к расчёту и его ограничениям — в справке.</small><p class="legend"><span class="part-a">● Выбор А</span><span class="part-b">● Выбор Б</span></p></div><div class="selection-grid">${te(a.a, "a")}${te(a.b, "b")}</div></div><datalist id="property-fields">${$(Q(), "")}</datalist>`), f === "rules" && (g("content").innerHTML = `<div class="rules"><h3>Исключение пар</h3><p>Элемент сам с собой не проверяется. Пара А/Б учитывается один раз.</p><label class="check"><input id="same-model" type="checkbox" ${a.ignoreSameModel ? "checked" : ""}>Не проверять элементы одной модели</label><label class="check"><input id="same-group" type="checkbox" ${a.ignoreSameGroup ? "checked" : ""}>Не проверять геометрию одного составного объекта</label><label>Не проверять пары с одинаковым значением свойства<input id="equal-property" list="property-fields" value="${oe(a.equalProperty)}" placeholder="Без ограничения"></label><label class="check"><input id="hidden" type="checkbox" ${a.includeHidden ? "checked" : ""}>Включать скрытые элементы прочитанных моделей</label><p>Незагруженные подключённые файлы нужно открыть перед расчётом.</p><datalist id="property-fields">${$(Q(), "")}</datalist></div>`), f === "results" && (g("content").innerHTML = `<div class="result-tools"><div class="result-filters"><input id="result-search" type="search" placeholder="Поиск по результатам"><select id="result-state"><option value="">Все состояния</option>${Object.entries(
      Me
    ).map(([c, p]) => `<option value="${c}">${p}</option>`).join("")}</select>${a.type === "intersection" ? '<input id="result-depth" type="number" min="0" step="1" placeholder="Глубина от, мм">' : ""}<button id="show-markers" role="switch" aria-checked="${O}">${O ? "● Знаки" : "○ Знаки"}</button><span id="result-count"></span></div><div class="bulk-tools"><select id="bulk-state" title="Состояние для выбранных строк">${Object.entries(
      Me
    ).map(([c, p]) => `<option value="${c}">${p}</option>`).join("")}</select><button id="bulk">Применить</button></div></div><div class="result-area"><div class="table-area"><div class="scroll" id="table"></div><div class="pager"><span id="selection-count"></span><button id="prev-page">←</button><span id="page"></span><button id="next-page">→</button></div></div><div class="detail" id="detail"></div></div>`, _(), ie()), f === "report" && (g("content").innerHTML = `<div class="report"><h3>${oe(a.name)}</h3><p>Результатов: ${a.results.length}. Выбрано: ${C.size}. ${a.status === "stale" ? "Результаты устарели — рекомендуется повторный запуск." : ""}</p><label class="check"><input id="selected-only" type="checkbox" ${C.size ? "checked" : ""}>Только выбранные строки</label><label class="check"><input id="report-images" type="checkbox" checked>Добавить снимки (недостающие будут созданы автоматически)</label><button id="export-html" class="primary">Сформировать HTML-отчёт</button><button id="export-viewer">Сессия для плагина «Коллизии»</button><p>Правила и все результаты сохраняются кнопкой «Сохранить проверки» в верхней панели.</p></div>`), g("content").inert = M;
  }
  const ge = (a) => a.kind === "touch" ? "Тела соприкасаются, общего объёма нет" : a.depth === "unmeasurable" ? "У элемента нет собственного объёма, замер глубины к нему неприменим" : a.depth === "tolerance" ? "Пересечение найдено, но его глубина не разрешена при текущем расчёте" : a.depth === "approximate" ? "При разделении контакта или измерении использовалась сокращённая выборка; точность числа не гарантируется" : "Оценка локальной толщины перекрытия двух элементов";
  function _() {
    const a = U(), c = P(), p = Math.max(1, Math.ceil(c.length / 50));
    h = Math.max(0, Math.min(h, p - 1));
    const d = c.slice(h * 50, h * 50 + 50);
    g("table").innerHTML = c.length ? `<table><thead><tr><th><input id="check-page" type="checkbox" aria-label="Выбрать страницу" ${d.every((x) => C.has(x.id)) ? "checked" : ""}></th>${["№", "Состояние", "Глубина, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "Комментарий"].map((x) => `<th>${x}</th>`).join("")}</tr></thead><tbody>${d.map((x, S) => `<tr data-result="${oe(x.id)}" class="${x.id === u ? "active" : ""}"><td><input type="checkbox" class="row-check" aria-label="Выбрать конфликт" ${C.has(x.id) ? "checked" : ""}></td>${[h * 50 + S + 1, Me[x.state], Ge(x, a.type), x.a.name, x.a.model, x.a.guid || "—", x.b.name, x.b.model, x.b.guid || "—", x.note].map((w) => `<td title="${oe(w)}">${oe(w)}</td>`).join("")}</tr>`).join("")}</tbody></table>` : '<div class="empty">Нет результатов. Запустите проверку или измените фильтры.</div>', g("page").textContent = `${h + 1} / ${p}`, g("result-count").textContent = `${c.length} результатов`, g("selection-count").textContent = `Выбрано: ${C.size}`, g("prev-page").disabled = h === 0, g("next-page").disabled = h === p - 1;
  }
  function ie() {
    const a = U(), c = P(), p = c.findIndex((x) => x.id === u), d = a?.results.find((x) => x.id === u);
    g("detail").innerHTML = d ? `<div class="detail-head"><div><small>КОЛЛИЗИЯ</small><h3>#${p + 1} ${oe(d.a.name)} × ${oe(d.b.name)}</h3></div><div class="detail-nav"><button id="previous" title="Предыдущая коллизия" ${p <= 0 ? "disabled" : ""}>‹</button><button id="next" title="Следующая коллизия" ${p < 0 || p >= c.length - 1 ? "disabled" : ""}>›</button></div></div><div class="clash-summary"><span>${a?.type === "duplicates" ? "Дублирование" : "Пересечение"}</span><span title="${oe(ge(d))}">${a?.type === "duplicates" ? "Совпадение геометрии" : d.kind === "touch" ? "Касание" : d.depth ? ht[d.depth] : `Глубина ${Ye(d.penetrationMm)} мм`}</span><span>${oe(Me[d.state])}</span></div><p class="legend"><span class="part-a">● Элемент А</span><span class="part-b">● Элемент Б</span></p><div class="preview-slot">${d.image ? `<button id="open-image" class="preview"><img src="${oe(d.image)}" alt="Снимок коллизии"><span>Открыть крупнее</span></button>` : '<div class="preview-empty"><span>◫</span><small>Снимок создастся после перехода в 3D</small></div>'}</div><div class="detail-actions"><button id="focus" class="primary">Перейти в 3D</button><button id="capture-image">▣ Снимок пары</button></div><div class="detail-scroll"><div class="coordinates">${d.point.map((x, S) => `<span>${["X", "Y", "Z"][S]} ${x.toFixed(3)}</span>`).join("")}</div><label>Состояние<select id="edit-state">${Object.entries(
      Me
    ).map(
      ([x, S]) => `<option value="${x}" ${d.state === x ? "selected" : ""}>${S}</option>`
    ).join(
      ""
    )}</select></label><label>Назначение<input id="assignee" value="${oe(d.assignee)}"></label><label>Комментарий<textarea id="note" rows="2">${oe(d.note)}</textarea></label>${[
      d.a,
      d.b
    ].map(
      (x, S) => `<details><summary>Элемент ${S ? "Б" : "А"} · свойства</summary><dl>${Object.entries(
        x.properties
      ).map(([w, v]) => `<dt>${oe(w)}</dt><dd>${oe(v)}</dd>`).join("")}</dl></details>`
    ).join("")}</div>` : '<div class="detail-empty"><span>◫</span><p>Выберите коллизию в таблице</p><small>Двойной щелчок сразу перенесёт камеру в 3D.</small></div>';
  }
  const be = (a) => {
    const c = new Set(
      !a.manualOnly && a.modelsMode === "selected" ? a.models : []
    );
    for (const p of a.include)
      try {
        c.add(String(JSON.parse(p)[0]));
      } catch {
        const d = l?.elements.find(
          (x) => x.id === p
        )?.modelId;
        d && c.add(d);
      }
    return [...c];
  }, se = () => {
    const a = U();
    if (!(!a || f !== "select"))
      for (const c of i.querySelectorAll("[data-side]")) {
        const p = c.dataset.side, d = [...c.querySelectorAll(".model-check")];
        if (!d.length) continue;
        const x = d.filter((v) => v.checked).map((v) => v.value), S = x.length === d.length, w = a[p];
        w.modelsMode = S ? "all" : "selected", w.models = S ? [] : x, w.conditions = [], w.mode = "all";
      }
  }, ue = (a) => {
    if (!a?.length) return;
    const c = /* @__PURE__ */ new Set();
    for (const p of a)
      for (const d of [p.a, p.b]) {
        if (!d.manualOnly && d.modelsMode !== "selected") return;
        for (const x of be(d)) c.add(x);
      }
    return c;
  }, xe = (a) => {
    let c = a.trim().replace(/\\/g, "/").toLocaleLowerCase();
    try {
      c = decodeURIComponent(c);
    } catch {
    }
    c = c.replace(/[?#].*$/, "");
    const p = c.split("/").filter(Boolean).at(-1) || c;
    return /* @__PURE__ */ new Set([c, p]);
  }, ye = (a) => {
    const c = new Set(a.map((v) => v.id)), p = a.map((v) => ({
      id: v.id,
      aliases: /* @__PURE__ */ new Set([
        ...xe(v.id),
        ...xe(v.name)
      ])
    })), d = (v) => {
      if (c.has(v)) return v;
      const E = xe(v), L = p.filter(
        (G) => [...E].some((ne) => G.aliases.has(ne))
      );
      return L.length === 1 ? L[0].id : v;
    }, x = (v) => {
      try {
        const E = JSON.parse(v);
        if (!Array.isArray(E) || E.length < 2) return v;
        const L = String(E[0]), G = d(L);
        return G === L ? v : JSON.stringify([G, ...E.slice(1)]);
      } catch {
        return v;
      }
    };
    let S = !1;
    const w = (v) => {
      const E = v.models.map(d), L = v.include.map(x), G = v.exclude.map(x);
      (E.some((ne, ae) => ne !== v.models[ae]) || L.some((ne, ae) => ne !== v.include[ae]) || G.some((ne, ae) => ne !== v.exclude[ae])) && (v.models = [...new Set(E)], v.include = [...new Set(L)], v.exclude = [...new Set(G)], S = !0);
    };
    for (const v of o.checks)
      w(v.a), w(v.b), v.modelsAtRun && (v.modelsAtRun = v.modelsAtRun.map(d));
    for (const v of o.sets) {
      const E = v.selection.models.map(d);
      E.some((L, G) => L !== v.selection.models[G]) && (v.selection.models = [...new Set(E)], S = !0);
    }
    return S && I(), S;
  }, H = () => {
    const a = U();
    if (a)
      for (const c of i.querySelectorAll("[data-side]")) {
        const p = c.dataset.side, d = l?.elements.filter(
          (v) => (a.includeHidden || !v.hidden) && Pe(v, a[p])
        ).length || 0, x = a[p].manualOnly ? be(a[p]) : a[p].modelsMode === "selected" ? a[p].models : (l?.models || []).map((v) => v.id), S = !!l && x.every((v) => l.indexedModelIds.includes(v)), w = c.querySelector(
          "[data-selection-count]"
        );
        w && (w.textContent = S ? `${d} элементов` : "число после запуска");
      }
  };
  function me() {
    e.markers(
      P(),
      u,
      O,
      (a) => b(() => X(a, !0))
    );
  }
  function X(a, c = !1) {
    if (!M) {
      if (u = a, f === "results") {
        const p = P().findIndex((x) => x.id === a), d = p < 0 ? h : Math.floor(p / 50);
        d !== h && (h = d, _());
        for (const x of i.querySelectorAll("[data-result]"))
          x.classList.toggle("active", x.dataset.result === a);
        ie(), requestAnimationFrame(() => {
          [...i.querySelectorAll("[data-result]")].find(
            (S) => S.dataset.result === a
          )?.scrollIntoView({ block: "nearest", inline: "nearest" });
        });
      }
      if (me(), c) {
        const p = U()?.results.find((d) => d.id === a);
        p && (e.focus(p, Number(g("distance").value)), Se(p));
      }
    }
  }
  function Se(a) {
    clearTimeout(Z);
    const c = ++K, p = Number(g("distance").value);
    a.image && a.imageScope === "pair-ab" && a.imageDistance === p || !e.canLocate(a) || (Z = window.setTimeout(async () => {
      if (!(c !== K || M || u !== a.id))
        try {
          const d = await e.snapshot(
            a,
            p,
            () => c !== K || M || u !== a.id,
            !1,
            !1
          );
          if (c !== K || u !== a.id) return;
          a.image = d, a.imageScope = "pair-ab", a.imageDistance = p, I(), f === "results" && ie();
        } catch (d) {
          c === K && u === a.id && j(
            "Не удалось создать снимок выбранной коллизии: " + (d instanceof Error ? d.message : String(d)),
            !0
          );
        }
    }, 500));
  }
  async function je(a) {
    k = !1, F(!0), D("Создание снимка пары");
    try {
      const c = Number(g("distance").value);
      a.image = await e.snapshot(a, c, () => k), a.imageScope = "pair-ab", a.imageDistance = c, I(), f === "results" && u === a.id && ie();
    } catch (c) {
      j(
        "Результаты сохранены. Снимок пары не создан: " + (c instanceof Error ? c.message : String(c)),
        !0
      );
    } finally {
      y(), F(!1);
    }
  }
  async function B(a, c = !1) {
    Y(), D("Подготовка моделей");
    let p = c ? /* @__PURE__ */ new Set() : ue(a);
    if (!c && p?.size) {
      const d = await e.scan(
        (x) => D(x),
        () => k,
        /* @__PURE__ */ new Set()
      );
      l = d, ye(d.models) && (p = ue(a));
    }
    l = await e.scan(
      (d) => {
        j(d), D(d);
      },
      () => k,
      p
    ), g("model-count").textContent = `Проиндексировано моделей: ${l.indexedModelIds.length} из ${l.models.length} · элементов: ${l.elements.length}`, J(), j(
      l.blockers.length ? l.blockers.join(" ") : l.warnings.length ? `Модели прочитаны с замечаниями. ${l.warnings.join(" ")}` : "Модели прочитаны. Настройте выборки и запустите проверку.",
      !!l.blockers.length
    );
  }
  const F = (a) => {
    M = a, a && (clearTimeout(Z), K++);
    for (const c of [
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
      g(c).disabled = a;
    g("cancel").hidden = !a, g("content").inert = a, g("checks").inert = a;
  };
  async function V(a) {
    const c = (d) => {
      const x = `${a.name} · ${d.phase}`;
      j(`${x} ${d.done}/${d.total} · найдено ${d.found}`), D(x, d.done, d.total, d.found);
    };
    let p;
    try {
      p = new Pt();
    } catch {
      return qt(
        l.elements,
        a,
        c,
        () => k,
        (d) => e.geometry(d, () => k)
      );
    }
    return A = p, new Promise((d, x) => {
      const S = () => {
        p.terminate(), A = void 0, de = void 0;
      };
      de = () => {
        S(), x(Error("Расчёт отменён. Предыдущие результаты сохранены."));
      }, p.onmessage = async (w) => {
        if (w.data.load) {
          try {
            const v = await e.geometry(
              w.data.load,
              () => k || A !== p
            );
            if (A !== p) return;
            const E = [
              v.vertices?.buffer,
              v.indices?.buffer
            ].filter(Boolean);
            p.postMessage(
              { request: w.data.request, geometry: v },
              E
            );
          } catch (v) {
            A === p && p.postMessage({
              request: w.data.request,
              error: v instanceof Error ? v.message : String(v)
            });
          }
          return;
        }
        w.data.progress ? c(w.data.progress) : (S(), w.data.error ? x(Error(w.data.error)) : d(w.data.results));
      }, p.onerror = (w) => {
        S(), x(
          Error(
            `Не удалось запустить расчёт в фоновом потоке: ${w.message || "ошибка загрузки"}`
          )
        );
      }, p.postMessage({
        elements: l.elements,
        streaming: typeof e.geometry == "function",
        check: structuredClone({ ...a, results: [], warnings: [] })
      });
    });
  }
  async function le(a = !1) {
    if (M) return;
    Y(), se();
    const c = a ? [...o.checks] : [U()].filter(Boolean);
    if (!c.length) throw Error("Создайте проверку.");
    for (const p of c)
      for (const d of [p.a, p.b])
        d.conditions = [], d.mode = "all";
    k = !1, F(!0), D("Подготовка моделей");
    try {
      if (await B(c), F(!0), l.blockers.length)
        throw Error(
          "Состав моделей прочитан не полностью. " + l.blockers.join(" ")
        );
      for (const d of c) {
        if (k) break;
        for (const v of [d.a, d.b]) {
          if (v.modelsMode === "selected" && v.models.some((E) => !l.models.some((L) => L.id === E)))
            throw Error(
              `${d.name}: одна из моделей выборки отсутствует. Исправьте выборку.`
            );
          if (v.include.some((E) => !l.elements.some((L) => L.id === E)))
            throw Error(
              `${d.name}: вручную добавленный элемент отсутствует в модели.`
            );
        }
        const x = St(d);
        if (d.configAtRun === x && d.modelsAtRun?.some(
          (v) => !l.models.some((E) => E.id === v)
        ))
          throw Error(
            `${d.name}: состав моделей уменьшился. Подключите прежние модели или создайте копию проверки для нового состава. Прежние результаты сохранены.`
          );
        const S = await V(d);
        if (k || !e.isCurrent())
          throw Error(
            "Проект изменился или расчёт отменён. Предыдущие результаты сохранены."
          );
        const w = (/* @__PURE__ */ new Date()).toISOString();
        d.results = jt(
          d.configAtRun === x ? d.results : [],
          S,
          w
        ), d.lastRun = w, d.fingerprint = l.fingerprint, d.configAtRun = x, d.modelsAtRun = [...l.indexedModelIds], d.status = "done", d.warnings = [...l.warnings], m = d.id, u = d.results[0]?.id || "", C.clear(), I();
      }
      f = "results", J(), me(), j(
        `Проверка завершена. ${U()?.results.length || 0} результатов. Сохраните проверки для продолжения работы.`
      );
      const p = U()?.results.find((d) => d.id === u);
      p && !k && await je(p);
    } finally {
      y(), F(!1), J();
    }
  }
  function fe(a) {
    const c = a.closest("[data-side]")?.dataset.side;
    if (!c) return;
    const p = U()[c], d = a, x = a.closest("[data-side]");
    if (d.classList.contains("preset")) {
      p.presetId = d.value || void 0, x.querySelector(
        '[data-selection="delete-set"]'
      ).disabled = !p.presetId;
      return;
    }
    if (d.classList.contains("all-models")) {
      for (const S of x.querySelectorAll(
        ".model-check"
      ))
        S.checked = d.checked;
      p.modelsMode = d.checked ? "all" : "selected", p.models = [], p.manualOnly = !1, p.presetId = void 0;
    }
    if (d.classList.contains("model-check")) {
      const S = [
        ...x.querySelectorAll(".model-check")
      ], w = S.filter((E) => E.checked).map((E) => E.value), v = S.length > 0 && w.length === S.length;
      x.querySelector(".all-models").checked = v, p.modelsMode = v ? "all" : "selected", p.models = v ? [] : w, p.manualOnly = !1, p.presetId = void 0;
    }
    p.conditions = [], p.mode = "all", z(), H();
  }
  g("new").onclick = () => {
    const a = kt();
    a.name = `Проверка ${o.checks.length + 1}`, o.checks.push(a), m = a.id, f = "select", u = "", C.clear(), I(), J();
  }, g("scan").onclick = () => b(async () => {
    se(), k = !1, F(!0), D("Чтение моделей");
    try {
      const a = U();
      await B(a ? [a] : void 0, !a);
    } finally {
      y(), F(!1), J();
    }
  }), g("run").onclick = () => b(() => le()), g("all").onclick = () => b(() => le(!0)), g("cancel").onclick = () => {
    k = !0, de?.();
  }, g("test-search").oninput = T, g("checks").onclick = (a) => {
    const c = a.target.closest(
      "[data-check]"
    );
    c && !M && (e.clear(), m = c.dataset.check, u = "", C.clear(), h = 0, J());
  }, g("tabs").onclick = (a) => {
    const c = a.target.closest("[data-tab]");
    c && !M && (f = c.dataset.tab, J());
  }, g("name").onchange = () => {
    const a = U();
    a && (a.name = g("name").value.trim() || "Проверка", I(), T());
  }, g("copy").onclick = () => {
    const a = U();
    if (!a) return;
    const c = structuredClone(a);
    Object.assign(c, {
      id: crypto.randomUUID(),
      name: a.name + " — копия",
      results: [],
      lastRun: void 0,
      fingerprint: void 0,
      configAtRun: void 0,
      status: "new"
    }), o.checks.push(c), m = c.id, u = "", C.clear(), I(), J();
  }, g("delete").onclick = () => {
    U() && confirm(`Удалить проверку «${U().name}» и её результаты?`) && (o.checks = o.checks.filter((a) => a.id !== m), m = o.checks[0]?.id || "", C.clear(), e.clear(), I(), J());
  }, g("clear-project").onclick = () => {
    !o.checks.length && !o.sets.length || confirm(
      "Очистить проверки, наборы моделей и результаты текущего проекта?"
    ) && (o.checks = [], o.sets = [], l = void 0, m = "", u = "", C.clear(), e.clear(), I(), g("model-count").textContent = "Модели не прочитаны", J(), j("Данные проверок текущего проекта очищены."));
  }, g("save").onclick = () => {
    st("НашеПО-проверки.json", JSON.stringify(o, null, 2)), q = !1, g("dirty").textContent = "Файл проверок сохранён";
  }, g("open").onclick = () => g("file").click(), g("file").onchange = () => b(async () => {
    const a = g("file").files?.[0];
    if (!a) return;
    const c = ut(await a.text());
    q && !confirm("Заменить текущие несохранённые проверки данными из файла?") || (o = c, s && Ce.set(s, o), rt(n, o), m = o.checks[0]?.id || "", u = "", C.clear(), e.clear(), q = !1, g("dirty").textContent = "Проверки открыты", J(), j("Проверки открыты. Обновите модели перед переходом к элементам."), g("file").value = "");
  });
  for (const a of ["settings", "help"])
    g(a).onclick = () => g(a + "-dialog").showModal();
  for (const a of i.querySelectorAll("[data-close]"))
    a.onclick = () => g(a.dataset.close).close();
  g("content").onchange = (a) => b(() => {
    const c = a.target, p = U();
    if (!p) return;
    if (c.closest("[data-side]")) {
      fe(c);
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
    ].includes(c.id)) {
      if (c.id === "precision") {
        const x = Number(c.value);
        if (!Number.isFinite(x) || x < 1e-3 || x > 100)
          throw c.value = String(p.precision), Error("Точность должна быть от 0,001 до 100 мм.");
        p.precision = x;
      }
      if (c.id === "min-penetration") {
        const x = Number(c.value);
        if (!Number.isFinite(x) || x < 0 || x > 1e5)
          throw c.value = String(p.minPenetration), Error(
            "Минимальная глубина должна быть от 0 до 100 000 мм."
          );
        p.minPenetration = x;
      }
      c.id === "type" && (p.type = c.value), c.id === "touching" && (p.touching = c.checked), c.id === "same-model" && (p.ignoreSameModel = c.checked), c.id === "same-group" && (p.ignoreSameGroup = c.checked), c.id === "hidden" && (p.includeHidden = c.checked), c.id === "equal-property" && (p.equalProperty = c.value), z(), J();
      return;
    }
    if (c.id === "result-state") {
      h = 0, _();
      return;
    }
    if (c.id === "check-page") {
      for (const x of P().slice(h * 50, h * 50 + 50))
        c.checked ? C.add(x.id) : C.delete(x.id);
      _();
      return;
    }
    if (c.classList.contains("row-check")) {
      const x = c.closest("[data-result]").dataset.result;
      c.checked ? C.add(x) : C.delete(x), g("selection-count").textContent = `Выбрано: ${C.size}`;
      return;
    }
    const d = p.results.find((x) => x.id === u);
    d && (c.id === "edit-state" && (d.state = c.value, _(), T(), me()), c.id === "assignee" && (d.assignee = c.value), c.id === "note" && (d.note = c.value, _()), I());
  }), g("content").oninput = (a) => {
    const c = a.target;
    (c.id === "result-search" || c.id === "result-depth") && (h = 0, _());
    const p = U(), d = Number(c.value);
    p && c.id === "precision" && Number.isFinite(d) && d >= 1e-3 && d <= 100 && (p.precision = d, z()), p && c.id === "min-penetration" && Number.isFinite(d) && d >= 0 && d <= 1e5 && (p.minPenetration = d, z());
  }, g("content").onclick = (a) => b(async () => {
    const c = a.target, p = c.closest("button"), d = U();
    if (!d) return;
    if (p?.dataset.selection) {
      const S = p.closest("[data-side]").dataset.side, w = d[S], v = g("content").scrollTop;
      let E = !0;
      switch (p.dataset.selection) {
        case "load-set": {
          const L = o.sets.find((G) => G.id === w.presetId);
          if (!L) throw Error("Выберите сохранённый набор моделей.");
          Object.assign(w, structuredClone(L.selection), {
            conditions: [],
            mode: "all",
            include: [],
            exclude: [],
            manualOnly: !1,
            presetId: L.id
          });
          break;
        }
        case "save-set": {
          if (w.manualOnly)
            throw Error(
              "Ручную выборку элементов нельзя сохранить как набор моделей."
            );
          const L = await N();
          if (!L) return;
          const G = {
            id: crypto.randomUUID(),
            name: L,
            selection: {
              models: [...w.models],
              modelsMode: w.modelsMode,
              conditions: [],
              mode: "all"
            }
          };
          o.sets.push(G), w.presetId = G.id, E = !1;
          break;
        }
        case "delete-set": {
          const L = o.sets.find((G) => G.id === w.presetId);
          if (!L) throw Error("Выберите сохранённый набор моделей.");
          if (!confirm(`Удалить набор «${L.name}»?`)) return;
          o.sets = o.sets.filter((G) => G.id !== L.id);
          for (const G of o.checks)
            for (const ne of [G.a, G.b])
              ne.presetId === L.id && (ne.presetId = void 0);
          E = !1;
          break;
        }
        case "show":
          e.select(
            (l?.elements || []).filter((L) => (d.includeHidden || !L.hidden) && Pe(L, w)).map((L) => L.id)
          );
          return;
        case "only": {
          const L = e.selected();
          if (!L.length) throw Error("Выделите элементы в 3D-сцене.");
          w.include = L, w.exclude = [], w.manualOnly = !0;
          break;
        }
        case "include": {
          const L = e.selected();
          if (!L.length) throw Error("Выделите элементы в 3D-сцене.");
          w.include = [.../* @__PURE__ */ new Set([...w.include, ...L])], w.exclude = w.exclude.filter((G) => !L.includes(G));
          break;
        }
        case "exclude": {
          const L = e.selected();
          if (!L.length) throw Error("Выделите элементы в 3D-сцене.");
          w.exclude = [.../* @__PURE__ */ new Set([...w.exclude, ...L])], w.include = w.include.filter((G) => !L.includes(G));
          break;
        }
        case "reset":
          w.manualOnly = !1, w.include = [], w.exclude = [];
      }
      E ? z() : I(), J(), g("content").scrollTop = v;
      return;
    }
    if (p?.id === "prev-page" && (h--, _()), p?.id === "next-page" && (h++, _()), p?.id === "show-markers" && (O = !O, p.textContent = O ? "● Знаки включены" : "○ Знаки выключены", p.setAttribute("aria-checked", String(O)), me()), p?.id === "bulk") {
      const S = g("bulk-state").value;
      for (const w of d.results) C.has(w.id) && (w.state = S);
      I(), _(), ie(), T(), me();
    }
    if (p?.id === "capture-image") {
      const S = d.results.find((w) => w.id === u);
      if (S) {
        k = !1, F(!0), D("Создание снимка пары");
        try {
          S.image = await e.snapshot(
            S,
            Number(g("distance").value),
            () => k,
            !0
          ), S.imageScope = "pair-ab", S.imageDistance = void 0, I(), ie(), j("Снимок сохранён в результат.");
        } finally {
          y(), F(!1);
        }
      }
      return;
    }
    if (p?.id === "open-image") {
      const S = d.results.find((w) => w.id === u);
      if (S?.image) {
        const w = document.createElement("dialog");
        w.className = "image-dialog", w.innerHTML = '<button>Закрыть</button><img alt="Снимок коллизии">', w.querySelector("img").src = S.image, w.querySelector("button").onclick = () => {
          w.close(), w.remove();
        }, i.append(w), w.showModal();
      }
      return;
    }
    if (p?.id === "focus" && X(u, !0), p?.id === "previous" || p?.id === "next") {
      const S = P(), w = S.findIndex((v) => v.id === u) + (p.id === "next" ? 1 : -1);
      S[w] && X(S[w].id, !0);
    }
    if (p?.id === "export-html" || p?.id === "export-viewer") {
      let S = 0;
      const w = g("selected-only").checked ? d.results.filter((E) => C.has(E.id)) : d.results;
      if (!w.length) throw Error("Нет результатов для отчёта.");
      if (g("report-images").checked) {
        const E = e.view, L = E?.storeView(), G = Number(g("distance").value);
        k = !1, F(!0), D("Подготовка снимков отчёта", 0, w.length);
        try {
          await e.captureWorkspace(async () => {
            let ne = 0;
            for (const ae of w) {
              if (k)
                throw Error(
                  "Подготовка отчёта отменена. Уже полученные снимки сохранены."
                );
              D(
                "Подготовка снимков отчёта",
                ne,
                w.length
              ), j("Подготовка снимков: " + (ne + 1) + " / " + w.length);
              const ee = ae.imageScope !== "pair-ab" || ae.imageDistance !== void 0 && ae.imageDistance !== G;
              if (!ae.image || ee) {
                if (ae.state === "resolved" && !e.canLocate(ae)) {
                  ne++;
                  continue;
                }
                try {
                  ae.image = await e.snapshot(ae, G, () => k), ae.imageScope = "pair-ab", ae.imageDistance = G, I();
                } catch (ce) {
                  if (k || !e.isCurrent()) throw ce;
                  S++;
                }
              }
              ne++, D("Подготовка снимков отчёта", ne, w.length);
            }
          });
        } finally {
          if (E && e.isCurrent()) {
            const ne = d.results.find((ae) => ae.id === u);
            if (ne)
              try {
                e.focus(ne, G, !1);
              } catch {
              }
            L && E.restoreView(L);
          }
          y(), F(!1);
        }
      }
      const v = g("report-images").checked ? w.map(
        (E) => E.imageScope === "pair-ab" ? E : { ...E, image: void 0 }
      ) : w.map((E) => ({ ...E, image: void 0 }));
      st(
        d.name + (p.id === "export-html" ? ".html" : ".collision360.json"),
        p.id === "export-html" ? Lt(d, v) : Dt(d, v)
      ), j(
        "Отчёт подготовлен. Результатов: " + w.length + "; со снимками: " + v.filter((E) => E.image).length + "." + (S ? ` Не удалось создать снимков: ${S}; эти строки включены без изображения.` : ""),
        S > 0
      );
    }
    const x = c.closest("[data-result]");
    x && !c.closest("input") && !window.getSelection()?.toString() && X(x.dataset.result);
  }), g("content").ondblclick = (a) => {
    const c = a.target, p = c.closest("[data-result]");
    p && !c.closest("input") && b(() => X(p.dataset.result, !0));
  };
  const we = setInterval(() => {
    M || (Y() ? (g("model-count").textContent = "Модели не прочитаны", j(
      o.checks.length ? "Открыт другой проект. Показаны его проверки; обновите модели." : "Открыт другой проект. Для него ещё нет проверок."
    ), M || J()) : l && !e.isCurrent() && (l = void 0, e.clear(), g("model-count").textContent = "3D-окно изменилось", j("Активное 3D-окно изменилось. Обновите модели."), M || J()));
  }, 1500);
  return J(), () => {
    r(), clearInterval(we), clearTimeout(Z), K++, k = !0, de?.(), A?.terminate(), e.clear();
  };
}
var Ke = /* @__PURE__ */ ((t) => (t.object = "object", t.drawing = "drawing", t.table = "table", t.record = "record", t.textStyle = "textstyle", t.textStyleTable = "textstyles", t.linetype = "linetype", t.linetypeTable = "linetypes", t.layer = "layer", t.layerTable = "layers", t.block = "block", t.blockTable = "blocks", t.layout = "layout", t.layoutTable = "layouts", t.type = "type", t.typeTable = "types", t.material = "material", t.materialTable = "materials", t.geometry = "geometry", t.geometryTable = "geometries", t.group = "group", t.groupTable = "groups", t.attachment = "attachment", t.attachmentTable = "attachments", t.entities = "entities", t.entity = "entity", t.line = "l", t.solid = "s", t.insert = "i", t.polyline = "p", t.circle = "c", t.arc = "a", t.polyline3d = "p3", t.proxy = "x", t.text = "t", t.mtext = "mt", t.wipeout = "w", t.model3d = "g", t.alignment = "al", t))(Ke || {});
const _e = () => new Promise((t) => requestAnimationFrame(() => t()));
function bt(t) {
  const { width: e, height: i } = t.camera, r = Array.from(document.querySelectorAll("canvas")).filter(
    (n) => {
      const o = n.getBoundingClientRect();
      return o.width > 100 && o.height > 100 && n.width > 0 && n.height > 0 && getComputedStyle(n).visibility !== "hidden" && (Math.abs(o.width - e) < 4 && Math.abs(o.height - i) < 4 || Math.abs(n.width - e) < 4 && Math.abs(n.height - i) < 4);
    }
  );
  if (!r.length)
    throw Error(
      "Снимок 3D-окна недоступен: откройте одно видимое окно модели."
    );
  const s = r[0].getBoundingClientRect();
  if (r.some((n) => {
    const o = n.getBoundingClientRect();
    return Math.abs(o.x - s.x) > 4 || Math.abs(o.y - s.y) > 4;
  }))
    throw Error(
      "Открыто несколько подходящих 3D-окон. Оставьте одно окно для снимка."
    );
  return { candidates: r, rect: s };
}
async function Bt(t) {
  await _e(), t.repaint();
  const { candidates: e, rect: i } = bt(t), r = document.createElement("canvas");
  r.width = Math.max(1, Math.round(i.width * devicePixelRatio)), r.height = Math.max(1, Math.round(i.height * devicePixelRatio)), Object.assign(r.style, {
    position: "fixed",
    left: `${i.left}px`,
    top: `${i.top}px`,
    width: `${i.width}px`,
    height: `${i.height}px`,
    zIndex: "2147483646",
    pointerEvents: "none"
  });
  const s = r.getContext("2d");
  for (const n of e)
    s.drawImage(n, 0, 0, r.width, r.height);
  return document.body.append(r), async () => {
    t.repaint(), await _e(), r.remove();
  };
}
async function Yt(t, e) {
  if (await _e(), e()) throw Error("Подготовка снимков отменена.");
  const { candidates: i } = bt(t), r = document.createElement("canvas"), s = Math.min(1, 1280 / i[0].width);
  r.width = Math.round(i[0].width * s), r.height = Math.round(i[0].height * s);
  const n = r.getContext("2d");
  n.fillStyle = "#20242b", n.fillRect(0, 0, r.width, r.height), t.repaint();
  for (const o of i)
    n.drawImage(o, 0, 0, r.width, r.height);
  try {
    return r.toDataURL("image/jpeg", 0.82);
  } catch {
    throw Error("Браузер запретил чтение изображения 3D-окна.");
  }
}
const Qe = "nashepo.checks.points", lt = "nashepo.checks.highlight";
function ct(t) {
  let e = performance.now();
  return async () => {
    if (t()) throw Error("Операция отменена.");
    performance.now() - e >= 16 && (await new Promise((i) => setTimeout(i, 0)), e = performance.now());
  };
}
function Ue(t, e, i, r = 0) {
  if (r > 12 || t == null) return;
  if (typeof t != "object") {
    i[e] = String(t);
    return;
  }
  if (Array.isArray(t)) {
    t.forEach((n, o) => Ue(n, `${e}[${o}]`, i, r + 1));
    return;
  }
  const s = t;
  if ("$value" in s) {
    Ue(s.$value, e, i, r + 1);
    return;
  }
  for (const [n, o] of Object.entries(s))
    n.startsWith("$") || Ue(o, e ? `${e}.${n}` : n, i, r + 1);
}
function Gt(t) {
  const e = t.vertices.length / 3, i = (o) => Number.isFinite(t.vertices[o * 3]) && Number.isFinite(t.vertices[o * 3 + 1]) && Number.isFinite(t.vertices[o * 3 + 2]), r = (o) => {
    const l = t.indices[o], m = t.indices[o + 1], f = t.indices[o + 2];
    return l < e && m < e && f < e && l !== m && m !== f && f !== l && i(l) && i(m) && i(f);
  };
  let s = 0;
  for (let o = 0; o < t.indices.length; o += 3) r(o) && (s += 3);
  if (s === t.indices.length) return t.indices;
  const n = new Uint32Array(s);
  for (let o = 0, l = 0; o < t.indices.length; o += 3)
    r(o) && (n[l++] = t.indices[o], n[l++] = t.indices[o + 1], n[l++] = t.indices[o + 2]);
  return n;
}
const Te = (t) => /\.wdx(?:[?#].*)?$/i.test(t);
class Zt {
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
      const r = this.ctx.manager.panelBar;
      r?.visible && (this.captureLayout = {
        panel: r,
        size: r.size,
        maximized: r.maximized
      }, r.maximized = !1, r.size = Math.min(r.size, 120), await new Promise(
        (s) => requestAnimationFrame(() => requestAnimationFrame(() => s()))
      ));
    }
    try {
      return await e();
    } finally {
      if (this.captureDepth--, i && this.captureLayout) {
        const { panel: r, size: s, maximized: n } = this.captureLayout;
        this.captureLayout = void 0, r.size = s, r.maximized = n, await new Promise(
          (o) => requestAnimationFrame(() => requestAnimationFrame(() => o()))
        );
      }
    }
  }
  async scan(e, i, r) {
    const s = this.app, n = this.view, o = s?.model;
    if (!n || !o?.layouts || !o.attachments)
      throw Error(
        "Откройте проект Топоматик 360 с IFC или SMDX и сделайте его 3D-окно активным."
      );
    const l = [], m = /* @__PURE__ */ new Set(), f = [], u = [], h = [], M = /* @__PURE__ */ new Map(), k = /* @__PURE__ */ new Set();
    let A = 2166136261;
    const O = ct(
      () => i() || s !== this.app || n !== this.view
    );
    let q = -1 / 0;
    const C = (Z) => {
      for (let K = 0; K < Z.length; K++)
        A = Math.imul(A ^ Z.charCodeAt(K), 16777619);
    }, de = async (Z, K, U) => {
      if (k.has(Z)) return;
      k.add(Z);
      const g = Z.layers.layer0?.modelName || K, R = K, j = Te(g) || Te(R), D = (z, Q) => {
        m.has(z) || (m.add(z), l.push({ id: z, name: Q }));
      };
      j || D(R, g);
      const y = !j && (!r || r.has(R)), b = [];
      (y || j) && Z.layouts.model?.walk((z) => (z.type === Ke.model3d ? b.push(z) : z.type === Ke.insert && f.push(`${g}: вставка блока не включена в расчёт.`), !1));
      const N = /* @__PURE__ */ new Map();
      for (const z of b) {
        let Q = z.layer, $ = "";
        for (; Q; ) {
          if (Q.modelName && !Te(Q.modelName)) {
            $ = Q.modelName;
            break;
          }
          Q = Q.layer;
        }
        const P = j ? $ || "Модель проекта" : g, T = j ? $ || `${K}/#model` : R;
        if (j && D(T, P), r && !r.has(T)) continue;
        const te = JSON.stringify([
          z.layer?.UUID || "",
          z.$id || z.$path
        ]);
        N.set(JSON.stringify([T, te]), {
          key: te,
          objects: [z],
          modelId: T,
          modelName: P
        });
      }
      let I = 0;
      for (const z of N.values()) {
        const { key: Q, objects: $, modelId: P, modelName: T } = z;
        if (i()) throw Error("Чтение моделей отменено.");
        if (s !== this.app || n !== this.view)
          throw Error(
            "Активный проект изменился. Запустите чтение моделей заново."
          );
        const te = $[0].layer, J = {};
        try {
          if (te) {
            const H = [];
            let me = te;
            for (; me && H.length < 64; )
              H.unshift(me), me = me.layer;
            for (const X of H)
              Ue(X.typedProperties(), "", J), X.typed?.name && (J.Тип = X.typed.name);
          }
        } catch {
          f.push(`${T} / ${Q}: часть свойств недоступна.`);
        }
        const ge = J["ifc.id"] || Object.entries(J).find(
          ([H]) => /(^|\.)(globalid|ifcguid|guid)$/i.test(H)
        )?.[1] || "", _ = te?.name || $[0].$id || "Элемент", ie = JSON.stringify([P, Q]);
        Object.assign(J, {
          Модель: T,
          Имя: _,
          GUID: ge,
          Объект: te?.UUID || Q
        });
        const be = {
          min: [1 / 0, 1 / 0, 1 / 0],
          max: [-1 / 0, -1 / 0, -1 / 0]
        };
        let se = !0, ue = !1, xe = 0;
        for (const H of $) {
          se &&= H.isClosed;
          for (const me of Object.values(H.meshes)) {
            const X = me.geometry;
            if (!X || X.indices.length % 3) {
              ue = !0;
              continue;
            }
            se &&= me.isClosed;
            for (let B = 0; B < X.vertices.length; B += 3) {
              const F = [
                X.vertices[B],
                X.vertices[B + 1],
                X.vertices[B + 2]
              ];
              if (Math3d.mat4.mulv3(F, H.matrix, F), !F.every(Number.isFinite)) {
                ue = !0;
                continue;
              }
              for (let V = 0; V < 3; V++)
                be.min[V] = Math.min(be.min[V], F[V]), be.max[V] = Math.max(be.max[V], F[V]);
              if (C(F.join(",")), B % 6e4 === 0 && (performance.now() - q > 200 && (q = performance.now(), e(
                "Индексирование: " + T + " · " + h.length + " элементов"
              )), await O(), i()))
                throw Error("Чтение моделей отменено.");
            }
            const Se = X.vertices.length / 3, je = (B) => Number.isFinite(X.vertices[B * 3]) && Number.isFinite(X.vertices[B * 3 + 1]) && Number.isFinite(X.vertices[B * 3 + 2]);
            for (let B = 0; B < X.indices.length; B += 3) {
              const F = X.indices[B], V = X.indices[B + 1], le = X.indices[B + 2];
              if (A = Math.imul(A ^ F, 16777619), A = Math.imul(A ^ V, 16777619), A = Math.imul(A ^ le, 16777619), F < Se && V < Se && le < Se && F !== V && V !== le && le !== F && je(F) && je(V) && je(le) ? xe++ : ue = !0, B % 15e4 === 0 && (await O(), i()))
                throw Error("Чтение моделей отменено.");
            }
          }
        }
        if (ue || !xe) {
          if (xe || I++, !xe) continue;
          se = !1;
        }
        const ye = {
          id: ie,
          name: _,
          model: T,
          modelId: P,
          guid: ge,
          properties: J,
          hidden: U || !!te?.resolveHidden() || !!te?.resolveDisabled(),
          triangles: new Float64Array(0),
          triangleCount: xe,
          closed: se,
          bounds: be
        };
        C(JSON.stringify([ie, J, ye.hidden])), h.push(ye), M.set(ie, $);
      }
      I && f.push(
        `${g}: пропущено элементов без треугольной геометрии — ${I}.`
      );
      const Y = [];
      Z.attachments.forEach((z) => {
        Y.push(z);
      });
      for (const z of Y) {
        const Q = z.name || z.uri || z.$id, $ = Q || "Подключённая модель", P = `${K}/${Q || "attachment"}`;
        z.model || D(P, $), z.model ? await de(
          z.model,
          P,
          U || z.hidden
        ) : (!r || r.has(P)) && u.push(
          `${$}: модель не загружена. Откройте её перед расчётом.`
        );
      }
    };
    if (await de(o, o.layers.layer0?.modelName || "Проект", !1), !h.length && (!r || r.size > 0)) {
      const Z = r ? [...r].filter((K) => !m.has(K)) : [];
      throw Error(
        Z.length ? `Сохранённая выборка ссылается на модели, которых нет в текущем составе: ${Z.join(", ")}. Обновите список моделей.` : l.length ? "В выбранных моделях не найдены 3D-элементы с доступной геометрией. Проверьте, что модели загружены, и выберите нужные файлы." : "В открытом проекте не обнаружены IFC/SMDX-модели. Проверьте состав подключений проекта."
      );
    }
    return this.clear(), this.refs = M, this.metadata = new Map(h.map((Z) => [Z.id, Z])), this.scannedApp = s, this.scannedView = n, {
      elements: h,
      fingerprint: `${h.length}:${A >>> 0}`,
      warnings: [...new Set(f)],
      blockers: [...new Set(u)],
      models: l,
      indexedModelIds: l.filter((Z) => !r || r.has(Z.id)).map((Z) => Z.id)
    };
  }
  async geometry(e, i) {
    const r = ct(() => i() || !this.isCurrent());
    if (!this.isCurrent()) throw Error("Активная модель изменилась.");
    const s = this.metadata.get(e), n = this.refs.get(e);
    if (!s || !n) throw Error("Элемент отсутствует.");
    const o = n.flatMap(
      (k) => Object.values(k.meshes).flatMap((A) => {
        const O = A.geometry;
        if (!O || O.indices.length % 3) return [];
        const q = Gt(O);
        return q.length ? [{ object: k, g: O, indices: q }] : [];
      })
    );
    let l = 0, m = 0;
    for (const { g: k, indices: A } of o) {
      if (!k) throw Error("Геометрия недоступна.");
      l += k.vertices.length, m += A.length;
    }
    const f = new Float64Array(l), u = new Uint32Array(m);
    let h = 0, M = 0;
    for (const { object: k, g: A, indices: O } of o) {
      if (!A) throw Error("Геометрия недоступна.");
      for (let q = 0; q < A.vertices.length; q += 3) {
        const C = [A.vertices[q], A.vertices[q + 1], A.vertices[q + 2]];
        if (Math3d.mat4.mulv3(C, k.matrix, C), f.set(C, h + q), q % 6e4 === 0 && (await r(), i() || !this.isCurrent()))
          throw Error("Чтение геометрии отменено.");
      }
      for (let q = 0; q < O.length; q++)
        if (u[M + q] = h / 3 + O[q], q % 15e4 === 0 && (await r(), i()))
          throw Error("Чтение геометрии отменено.");
      h += A.vertices.length, M += O.length;
    }
    return { ...s, vertices: f, indices: u };
  }
  selected() {
    if (!this.isCurrent())
      throw Error("Сначала обновите модели текущего проекта.");
    const e = new Set(this.view?.layer.selectedObjects());
    return [...this.refs].filter(([, i]) => i.some((r) => e.has(r))).map(([i]) => i);
  }
  select(e) {
    if (!this.isCurrent())
      throw Error("Сначала обновите модели текущего проекта.");
    const i = new Set(e.flatMap((r) => this.refs.get(r) || []));
    this.view.layer.clearSelected(), this.view.layer.selectObjects((r) => i.has(r), !0), this.view.invalidate();
  }
  clear() {
    if (this.overlay && (this.overlay.view.layer.removeLayer(this.overlay.layer), this.overlay.view.invalidate(), this.overlay = void 0, this.overlaySurfaces = []), this.pointView) {
      const e = this.pointView.annotations.get(Qe);
      e && this.pointView.annotations.release(e), this.pointView.invalidate(), this.pointView = void 0;
    }
  }
  focus(e, i, r = !0) {
    if (!this.isCurrent())
      throw Error("Обновите модели текущего проекта перед переходом.");
    if (!Number.isFinite(i) || i < 0.5)
      throw Error("Дистанция камеры должна быть не менее 0,5 м.");
    if (!this.refs.has(e.a.id) || !this.refs.has(e.b.id))
      throw Error("Один из элементов отсутствует в загруженных моделях.");
    const s = e.point, n = this.view;
    n.camera?.id !== "3d" && n.setCameraType("3d"), n.pauseAnimation?.(), this.highlight(e), this.select([e.a.id, e.b.id]);
    const o = [-0.65, 0.65, -0.394], l = Math.hypot(...o);
    o.forEach((m, f) => o[f] = m / l), n.lookAt(
      s.map((m, f) => m - o[f] * i),
      o,
      [0, 0, 1],
      r,
      s
    );
  }
  highlight(e) {
    this.overlayError = void 0;
    const i = this.view;
    this.overlay && this.overlay.view !== i && (this.overlay.view.layer.removeLayer(this.overlay.layer), this.overlay = void 0, this.overlaySurfaces = []);
    const r = [
      { id: e.a.id, color: 4281743103 },
      { id: e.b.id, color: 915144703 }
    ];
    if (this.overlaySurfaces = r.flatMap(
      ({ id: o, color: l }, m) => [...new Set(this.refs.get(o) || [])].flatMap(
        (f) => Object.values(f.meshes).flatMap((u) => {
          const h = u.geometry;
          if (!h) return [];
          const M = {
            // SDK fields may be prototype getters rather than own properties.
            uuid: `${lt}.${m}.${h.uuid}`,
            vertices: h.vertices,
            indices: h.indices,
            normals: h.normals,
            bounds: h.bounds,
            colors: new Uint32Array(h.vertices.length / 3).fill(l)
          };
          return [{ obj: f, geometry: M, color: l }];
        })
      )
    ), this.overlay) {
      this.overlay.layer.visible = !0, i.invalidate(!0);
      return;
    }
    let s;
    s = {
      id: lt,
      order: 1e4,
      visible: !0,
      paint: () => {
      },
      paint3d: (o) => {
        const l = o.color, m = o.rasterizer.material;
        o.rasterizer.material = void 0;
        try {
          for (const { obj: f, geometry: u, color: h } of this.overlaySurfaces) {
            o.color = h, o.pushMatrix();
            try {
              o.multMatrix(f.matrix), o.mesh(u);
            } finally {
              o.popMatrix();
            }
          }
        } catch (f) {
          s.visible = !1, this.overlayError = new Error(
            "Не удалось отрисовать подсветку пары: " + (f instanceof Error ? f.message : String(f))
          );
        } finally {
          o.color = l, o.rasterizer.material = m;
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
  async snapshot(e, i, r, s = !1, n = !0) {
    const o = () => this.snapshotInWorkspace(e, i, r, s);
    return n ? this.captureWorkspace(o) : o();
  }
  async snapshotInWorkspace(e, i, r, s = !1) {
    if (!this.isCurrent())
      throw Error("Обновите модели перед созданием снимков.");
    if (!this.canLocate(e))
      throw Error("Элементы результата отсутствуют в открытых моделях.");
    const n = this.view, o = n.layer.drawing;
    if (!o)
      throw Error(
        "Слой моделей недоступен для снимка пары. Откройте 3D-окно проекта."
      );
    const l = o.visible, m = n.annotations.visible, f = new Set(n.layer.selectedObjects());
    let u;
    try {
      s ? this.highlight(e) : this.focus(e, i, !1), n.pauseAnimation(), u = await Bt(n), n.layer.clearSelected(), o.visible = !1, n.annotations.visible = !1, n.invalidate();
      const h = await Yt(
        n,
        () => r() || !this.isCurrent()
      );
      if (this.overlayError) throw this.overlayError;
      return h;
    } finally {
      o.visible = l, n.annotations.visible = m, n.layer.clearSelected(), n.layer.selectObjects((h) => f.has(h), !0), n.invalidate(), await u?.();
    }
  }
  markers(e, i, r, s) {
    if (!this.isCurrent()) return;
    const n = this.view;
    this.pointView && this.pointView !== n && this.clear();
    const o = n.annotations.get(Qe);
    if (o && n.annotations.release(o), this.pointView = n, !r) {
      n.invalidate();
      return;
    }
    const l = n.annotations.create(Qe, 1e4), m = e.filter((f) => f.id !== i).concat(e.filter((f) => f.id === i));
    for (const f of m.slice(-3e3)) {
      if (f.state === "resolved") continue;
      const [u, h, M] = f.point, k = f.id === i, A = f.state === "excluded" ? "#78818c" : f.state === "approved" || f.state === "reviewed" ? "#28b94b" : "#e1372d", O = k ? "#f2c94c" : A, q = () => s(f.id), C = [
        { type: "line", a: [u, h, M], b: [u, h, M + 1], color: O, width: 5 },
        {
          type: "polyline",
          points: [
            [u - 0.65, h, M + 1],
            [u + 0.65, h, M + 1],
            [u, h, M + 2.2],
            [u - 0.65, h, M + 1]
          ],
          color: O,
          fillColor: A,
          width: k ? 5 : 2
        },
        {
          type: "line",
          a: [u, h - 0.01, M + 1.85],
          b: [u, h - 0.01, M + 1.4],
          color: "#ffffff",
          width: 4
        },
        {
          type: "line",
          a: [u, h - 0.01, M + 1.22],
          b: [u, h - 0.01, M + 1.27],
          color: "#ffffff",
          width: 4
        }
      ];
      l.add({
        id: f.id,
        type: "shaped",
        shapes: C,
        activeShapes: C,
        activateCommand: q,
        dblCommand: q
      }), k && l.add({
        id: f.id + ":label",
        type: "simple",
        position: [u, h, M + 2.35],
        label: `${f.a.name} × ${f.b.name}`,
        labelBackground: "#f2c94c",
        labelColor: "#171717",
        activateCommand: q
      });
    }
    n.invalidate();
  }
}
let dt, Ve, pt;
const Qt = {
  open(t) {
    t.manager.revealView("nashepo.collisionfinder360/checks_panel");
  },
  mount(t) {
    const e = t.el;
    if (!e) return;
    if (Ve && pt === t.manager) {
      e.replaceChildren(Ve);
      return;
    }
    dt?.();
    const i = document.createElement("div");
    i.style.height = "100%", e.replaceChildren(i), Ve = i, pt = t.manager, dt = Ut(i, new Zt(t));
  }
};
export {
  Qt as default
};
