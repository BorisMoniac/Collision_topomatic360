const ke = `<h2>Работа с проверками</h2>
<details open><summary>1. Первая проверка</summary><ol><li>Откройте проект и подключите IFC/SMDX штатными средствами Топоматик 360.</li><li>Откройте нижнюю вкладку «Проверки» и нажмите «Модели».</li><li>Нажмите «＋ Новая проверка» и задайте ей понятное имя.</li><li>Во вкладке «Выбор» оставьте галочки только у нужных файлов в А и Б. «Все модели» включено по умолчанию.</li><li>Выберите «По пересечению» или «Дублирование» и нажмите «Запустить».</li><li>Во вкладке «Результаты» дважды нажмите строку: камера направится к конфликту, элемент А будет выделен красным, элемент Б — синим, и оба элемента станут выделенными в 3D-окне.</li></ol><p>Первое обновление без созданной проверки получает только список файлов. При запуске индексируются модели, отмеченные хотя бы в одной стороне. Файл проекта WDX служит контейнером и в выбор моделей не попадает.</p></details>
<details><summary>2. Выбор моделей и сохранённые наборы</summary><p>Выбор А и выбор Б задают две стороны сравнения. Снимите «Все модели» и отметьте конкретные IFC/SMDX. Для поиска дубликатов внутри одного файла отметьте его с обеих сторон.</p><p>Часто используемый состав можно сохранить как набор моделей, а затем применить в другой проверке. Наборы входят в файл проверок. Состав выборки задаётся галочками моделей и ручным выделением объектов.</p><p>IFC GUID читается из свойства <code>ifc.id</code>; также поддерживаются GlobalId, IfcGuid и GUID.</p></details>
<details><summary>3. Работа с выделением в 3D</summary><p>Сначала выделите элементы штатными средствами в 3D-окне, затем используйте кнопку в нужной стороне:</p><ul><li><b>Показать выбранные элементы</b> — выделяет весь текущий состав.</li><li><b>Только выделенные в 3D</b> — оставляет только выделенные объекты.</li><li><b>＋ Добавить из 3D</b> — добавляет выделенные объекты к моделям.</li><li><b>− Исключить из 3D</b> — исключает выделенные объекты.</li><li><b>Сбросить ручной выбор</b> — снова использует отмеченные модели.</li></ul><p>Ручные идентификаторы могут измениться после замены IFC/SMDX, поэтому такую выборку следует проверить заново.</p></details>
<details><summary>4. Пересечения, глубина, касания и дубликаты</summary><p><b>Пересечение</b> определяется по треугольным поверхностям элементов и вложенности тел. Раздельные сетки сначала проверяются вместе: совпадающие рёбра и разное разбиение швов больше не делают замкнутый элемент «неизмеримым». Габаритные коробки отбирают близкие пары; общий габарит также ограничивает область замера глубины. Одна пара элементов формирует один результат.</p><p><b>Расчётная глубина</b> — оценка локальной толщины перекрытия. Для контакта выбираются направления измерения, в том числе по его форме и нормалям граней. По ним измеряется общая часть проекций геометрии в области контакта и выбирается наименьшая пригодная ширина. Если обнаружены отдельные участки перекрытия, для пары сохраняется наибольшая из их глубин.</p><p>Это не длина трубы внутри другого элемента и не расстояние, на которое нужно переместить весь объект для устранения пересечения. Например, у длинного стержня сквозь плиту результат может определяться поперечным размером стержня. Объём пересечения — отдельная величина в кубических единицах; его нельзя непосредственно назвать глубиной в миллиметрах.</p><p>Если оболочка содержит разрывы, плагин дополнительно определяет внутреннюю область по совокупности окружающих граней — методом обобщённого числа обхода. Когда такая область подтверждается, рассчитывается численная глубина со знаком ≈. Исходная модель при этом не изменяется. Это позволяет проверять трубы, отводы и другие объёмные элементы с дефектами сетки. Одиночная плоская грань не превращается в объёмное тело.</p><p><b>Ограничения метода.</b> Плагин не строит точное тело пересечения. Разделение контактов, выбор направлений и проверка заполнения являются оценкой. Для сложных невыпуклых и составных объектов, криволинейных поверхностей результат может зависеть от сетки и расположения геометрии. Заданная точность не гарантирует такую же погрешность итоговой глубины. Результаты около принятого допуска следует проверять в 3D.</p><p><b>Столбец глубины:</b></p><ul><li><b>Число</b> — полученная оценка в миллиметрах. Малые положительные значения показываются с дополнительными знаками, чтобы не превратиться в ноль при округлении.</li><li><b>Касание</b> — найден контакт без разрешённого объёмного перекрытия. Такие пары включаются настройкой «Учитывать касания» и могут отсекаться порогом глубины как нулевые.</li><li><b>Не определена</b> — у геометрии не удалось определить внутреннюю область, например у одиночного листа или отдельных граней. Пересечение сохраняется; размер грани не выдаётся за глубину.</li><li><b>Требует уточнения</b> — пересечение найдено, однако его глубина не разрешена текущим расчётом. Причиной может быть неоднозначная геометрия контакта. Само по себе малое вхождение относительно настройки точности больше не является причиной отказа от замера.</li><li><b>≈</b> — приблизительная оценка: внутренняя область восстановлена для оболочки с разрывами, состыкованы немного расходящиеся швы либо при измерении сокращалась выборка или разделение контактов достигло предела. Для числа не гарантируются ни величина, ни направление ошибки.</li></ul><p>«Не определена», «Требует уточнения» и значения со знаком ≈ остаются в результатах независимо от минимальной глубины. Их оценивает пользователь. Найденное малое пересечение не должно исчезать только из-за отключённого учёта касаний: для определения пересечения и замера используется отдельный численный запас. Настройка точности не округляет малые вхождения до нуля.</p><p><b>Точность расчёта</b> задаётся в миллиметрах и влияет на отбор близких пар, разделение контактов и запас при фильтрации. При восстановлении швов допустимое расхождение ограничено этой величиной и дополнительно 0,01 мм. Приближённое восстановление внутренней области по граням — отдельный метод, его погрешность этой настройкой не гарантируется. <b>Минимальная глубина</b> — порог отбора результатов. Обычные числовые оценки сравниваются с порогом с запасом на точность: при минимуме 20 мм и точности 0,1 мм результат 19,95 мм остаётся. Этот порядок одинаков в расчёте, таблице и HTML-отчёте. После изменения точности или порога повторно запустите проверку.</p><p>Труба и отвод могут пересекаться в штатном соединении из-за формы исходной сетки. Такие соединения рассматриваются отдельно и при необходимости исключаются правилами.</p><p><b>Дублирование</b> ищет совпадающую треугольную геометрию в мировых координатах с заданной точностью. Геометрически одинаковые тела с разным разбиением поверхности на треугольники могут не считаться дубликатами.</p></details>
<details><summary>5. Составные объекты и неполная геометрия</summary><p>Один IFC-объект может состоять из нескольких частей. Чтобы не сравнивать его части между собой, включите «Не проверять геометрию одного составного объекта» во вкладке «Правила». Там же можно исключить пары одной модели или одинакового значения свойства.</p><p>Пустые и неполные геометрические части пропускаются, а пригодные части модели продолжают участвовать. Плагин показывает сводное замечание с количеством пропущенных элементов. Незагруженный подключённый файл блокирует расчёт только тогда, когда он входит в выборку.</p></details>
<details><summary>6. Результаты и состояния</summary><p>«Новый» найден впервые, «Активный» найден повторно, «Проверенный» рассмотрен, «Подтверждённый» подтверждён, «Исключённый» исключён из работы. «Исправленный» означает, что пара исчезла при повторном расчёте с теми же правилами; состояние можно изменить вручную.</p><p>В таблице доступны IFC GUID, расчётная глубина, назначение и комментарий. Фильтр «Глубина от» сохраняет строки «не определена», «требует уточнения» и приблизительные оценки со знаком ≈, чтобы такие конфликты не исчезали по ненадёжному числу. Галочки меняют состояние сразу у нескольких строк. Значения можно выделять и копировать. При переходе стрелками активная строка автоматически прокручивается в видимую область. Состояние «Устарела» у проверки означает, что после последнего расчёта изменили её тип, выборки, параметры или правила.</p></details>
<details><summary>7. Отчёт и снимки</summary><p>После перехода к коллизии отсутствующий снимок создаётся автоматически, если пользователь задержался на результате. Кадр строится от той же камеры приближения, что и снимки отчёта: ракурс задаёт «Дистанция камеры» в настройках. Если дистанцию изменить, отчёт переснимет прежние кадры под новое значение. Быстрое переключение стрелками отменяет лишние снимки. Во время технической перерисовки поверх 3D-окна сохраняется предыдущий кадр, поэтому модель не должна мигать.</p><p>Кнопка «Снимок пары» сохраняет текущий ракурс только с двумя элементами коллизии: элемент А показан красным, элемент Б — синим. Такой кадр собран вручную, поэтому отчёт его не переснимает. На время подготовки отчёта нижняя панель автоматически уменьшается для широкого 3D-кадра и затем возвращается к прежнему размеру. Файл сессии предназначен для открытия результатов в плагине «НашеПО · Коллизии».</p></details>
<details><summary>8. Проекты, сохранение и очистка</summary><p>В пределах открытой страницы каждый проект получает собственный список проверок. Сворачивание или повторное открытие нижней панели сохраняет проверки, результаты и комментарии в текущей вкладке. При переключении проекта данные предыдущего не подмешиваются. «Очистить проект» удаляет проверки, результаты и наборы только у текущего проекта.</p><p>«Сохранить проверки» записывает правила, наборы моделей, результаты, комментарии и снимки в JSON. «Открыть проверки» загружает этот файл. Геометрия в файл не входит: соответствующие модели надо открыть отдельно. После обновления или закрытия страницы для продолжения работы используйте сохранённый файл.</p></details>
<details><summary>9. Большие проекты</summary><p>Жёсткого предела в 6 млн треугольников нет. При запуске строится индекс только по отмеченным моделям. Точная геометрия передаётся в расчёт по мере появления близких пар в компактном индексированном виде.</p><p>Время и память всё равно зависят от состава выборок и числа потенциальных пар. Разделяйте проверки по моделям и системам. В сцене одновременно показывается до 3000 знаков; при 50 000 результатах расчёт останавливается без замены прежнего результата.</p></details>`;
function Se(t) {
  let e = t.parentElement, i;
  for (; e && !i; )
    i = [...e.children].find(
      (u) => u.classList.contains("resizer-horizontal")
    ), e = e.parentElement;
  if (!i) return () => {
  };
  const s = i, a = t.ownerDocument.defaultView;
  let o;
  const n = () => {
    if (o === void 0) return;
    const u = o;
    o = void 0, s.dispatchEvent(
      new MouseEvent("mouseup", { bubbles: !0, composed: !0 })
    ), s.hasPointerCapture(u) && s.releasePointerCapture(u);
  }, l = (u) => {
    u.button === 0 && (o = u.pointerId, s.setPointerCapture(u.pointerId));
  };
  return s.addEventListener("pointerdown", l), s.addEventListener("pointerup", n), s.addEventListener("pointercancel", n), s.addEventListener("lostpointercapture", n), a.addEventListener("blur", n), () => {
    n(), s.removeEventListener("pointerdown", l), s.removeEventListener("pointerup", n), s.removeEventListener("pointercancel", n), s.removeEventListener("lostpointercapture", n), a.removeEventListener("blur", n);
  };
}
const Ie = "0.8.0", Zt = (t) => typeof t == "string" && /^data:image\/(jpeg|png);base64,[A-Za-z0-9+/=]+$/.test(t), $t = {
  new: "Новый",
  active: "Активный",
  reviewed: "Проверенный",
  approved: "Подтверждённый",
  resolved: "Исправленный",
  excluded: "Исключённый"
}, ae = () => ({
  models: [],
  modelsMode: "all",
  conditions: [],
  mode: "all",
  include: [],
  exclude: []
}), je = () => ({
  id: crypto.randomUUID(),
  name: "Новая проверка",
  type: "intersection",
  a: ae(),
  b: ae(),
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
}), se = ({
  triangles: t,
  vertices: e,
  indices: i,
  triangleCount: s,
  closed: a,
  bounds: o,
  ...n
}) => n;
function Ft(t, e) {
  return e.exclude.includes(t.id) ? !1 : e.include.includes(t.id) ? !0 : !(e.manualOnly || e.modelsMode === "selected" && !e.models.includes(t.modelId) || e.modelsMode === void 0 && e.models.length && !e.models.includes(t.modelId));
}
const Ee = (t) => JSON.stringify([
  t.type,
  ...[t.a, t.b].map(
    ({
      models: e,
      modelsMode: i,
      conditions: s,
      mode: a,
      include: o,
      exclude: n,
      manualOnly: l
    }) => ({
      models: e,
      modelsMode: i,
      conditions: s,
      mode: a,
      include: o,
      exclude: n,
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
]), Ae = (t, e) => JSON.stringify([t, e].sort());
function ze(t, e, i) {
  const s = new Map(t.map((o) => [o.id, o])), a = e.map((o) => {
    const n = s.get(o.id);
    return s.delete(o.id), {
      ...o,
      note: n?.note ?? "",
      assignee: n?.assignee ?? "",
      firstSeen: n?.firstSeen ?? i,
      lastSeen: i,
      state: !n || n.state === "resolved" ? "new" : n.state === "new" ? "active" : n.state
    };
  });
  for (const o of s.values())
    a.push({
      ...o,
      state: o.state === "excluded" ? "excluded" : "resolved"
    });
  return a;
}
function be(t) {
  const e = JSON.parse(t);
  if (e?.format !== "nashepo.checks" || e.version !== 1 || !Array.isArray(e.checks))
    throw Error("Это не файл проекта проверок НашеПО.");
  const i = /* @__PURE__ */ new Set();
  if (e.sets ??= [], !Array.isArray(e.sets) || !e.sets.every(
    (a) => a && typeof a.id == "string" && typeof a.name == "string" && a.selection && Array.isArray(a.selection.models) && a.selection.models.every((o) => typeof o == "string") && (a.selection.modelsMode === void 0 || ["all", "selected"].includes(a.selection.modelsMode)) && Array.isArray(a.selection.conditions) && a.selection.conditions.every(
      (o) => o && typeof o.field == "string" && typeof o.value == "string" && ["eq", "ne", "contains", "exists", "gt", "lt"].includes(
        o.op
      )
    ) && ["all", "any"].includes(a.selection.mode)
  ))
    throw Error("Некорректные наборы моделей.");
  const s = (a) => /\.wdx(?:[?#].*)?$/i.test(a);
  for (const a of e.sets)
    a.selection.models = a.selection.models.filter(
      (o) => !s(o)
    ), a.selection.conditions = [], a.selection.mode = "all", a.selection.modelsMode ??= a.selection.models.length ? "selected" : "all";
  for (const a of e.checks) {
    if (!a || typeof a.id != "string" || i.has(a.id) || typeof a.name != "string" || !["intersection", "duplicates"].includes(a.type) || !["new", "done", "stale"].includes(a.status) || !Number.isFinite(a.precision) || a.precision < 1e-3 || a.precision > 100 || a.minPenetration !== void 0 && (!Number.isFinite(a.minPenetration) || a.minPenetration < 0 || a.minPenetration > 1e5) || !Array.isArray(a.results))
      throw Error("Некорректные параметры проверки.");
    if (i.add(a.id), a.minPenetration ??= 0, ![
      "touching",
      "ignoreSameModel",
      "ignoreSameGroup",
      "includeHidden"
    ].every(
      (o) => typeof a[o] == "boolean"
    ) || typeof a.equalProperty != "string" || a.warnings !== void 0 && (!Array.isArray(a.warnings) || !a.warnings.every((o) => typeof o == "string")) || a.modelsAtRun !== void 0 && (!Array.isArray(a.modelsAtRun) || !a.modelsAtRun.every((o) => typeof o == "string")))
      throw Error("Некорректные правила проверки.");
    a.warnings ??= [], a.modelsAtRun = a.modelsAtRun?.filter((o) => !s(o));
    for (const o of [a.a, a.b]) {
      if (!o || o.manualOnly !== void 0 && typeof o.manualOnly != "boolean" || o.modelsMode !== void 0 && !["all", "selected"].includes(o.modelsMode) || o.presetId !== void 0 && typeof o.presetId != "string" || !["all", "any"].includes(o.mode) || ![o.models, o.include, o.exclude].every(
        (n) => Array.isArray(n) && n.every((l) => typeof l == "string")
      ) || !Array.isArray(o.conditions) || !o.conditions.every(
        (n) => n && typeof n.field == "string" && typeof n.value == "string" && ["eq", "ne", "contains", "exists", "gt", "lt"].includes(n.op)
      ))
        throw Error("Некорректная выборка.");
      o.modelsMode ??= o.models.length ? "selected" : "all", o.models = o.models.filter((n) => !s(n)), o.conditions = [], o.mode = "all";
    }
    for (const o of a.results) {
      if (o?.image !== void 0 && !Zt(o.image))
        throw Error("Некорректный снимок результата.");
      if (o?.imageScope !== void 0 && o.imageScope !== "pair" && o.imageScope !== "pair-ab")
        throw Error("Некорректный состав снимка результата.");
      if (o?.imageDistance !== void 0 && (!Number.isFinite(o.imageDistance) || o.imageDistance < 0.5))
        throw Error("Некорректная дистанция снимка результата.");
      if (o?.unmeasured !== void 0 && typeof o.unmeasured != "boolean")
        throw Error("Некорректный признак измеримости результата.");
      if (o?.depth !== void 0 && !["tolerance", "approximate", "unmeasurable"].includes(o.depth))
        throw Error("Некорректная достоверность глубины результата.");
      if (o?.unmeasured && !o.depth && (o.depth = "unmeasurable"), !o || typeof o.id != "string" || !Object.hasOwn($t, o.state) || o.penetrationMm !== void 0 && (!Number.isFinite(o.penetrationMm) || o.penetrationMm < 0) || !Array.isArray(o.point) || o.point.length !== 3 || !o.point.every(Number.isFinite))
        throw Error("Некорректный результат.");
      for (const n of [o.a, o.b])
        if (!n || !["id", "name", "model", "modelId", "guid"].every(
          (l) => typeof n[l] == "string"
        ) || !n.properties || typeof n.properties != "object")
          throw Error("Некорректный элемент результата.");
    }
  }
  return e;
}
const F = (t, e) => [t[0] - e[0], t[1] - e[1], t[2] - e[2]], Ct = (t, e, i = 1) => [
  t[0] + e[0] * i,
  t[1] + e[1] * i,
  t[2] + e[2] * i
], _ = (t, e) => t[0] * e[0] + t[1] * e[1] + t[2] * e[2], kt = (t, e) => [
  t[1] * e[2] - t[2] * e[1],
  t[2] * e[0] - t[0] * e[2],
  t[0] * e[1] - t[1] * e[0]
], H = (t) => Math.hypot(...t), Jt = (t) => {
  const e = H(t);
  return e > 1e-20 ? [t[0] / e, t[1] / e, t[2] / e] : void 0;
}, zt = (t) => t.triangleCount ?? (t.indices ? t.indices.length / 3 : t.triangles.length / 9), xt = (t, e, i) => t.indices && t.vertices ? t.vertices[t.indices[e * 3 + Math.floor(i / 3)] * 3 + i % 3] : t.triangles[e * 9 + i], wt = (t, e) => [0, 3, 6].map((i) => [
  xt(t, e, i),
  xt(t, e, i + 1),
  xt(t, e, i + 2)
]);
function Rt(t) {
  const e = [1 / 0, 1 / 0, 1 / 0], i = [-1 / 0, -1 / 0, -1 / 0];
  for (let s = 0; s < t.length; s++) {
    const a = s % 3;
    e[a] = Math.min(e[a], t[s]), i[a] = Math.max(i[a], t[s]);
  }
  return { min: e, max: i };
}
const Ut = (t, e, i) => t.min.every((s, a) => s <= e.max[a] + i && t.max[a] >= e.min[a] - i);
function te(t, e) {
  const i = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const l of e)
    for (let u = 0; u < 9; u++) {
      const m = u % 3, p = xt(t, l, u);
      i.min[m] = Math.min(i.min[m], p), i.max[m] = Math.max(i.max[m], p);
    }
  if (e.length <= 12) return { ...i, ids: e };
  const s = i.max.map((l, u) => l - i.min[u]), a = s.indexOf(Math.max(...s)), o = (l) => xt(t, l, a) + xt(t, l, a + 3) + xt(t, l, a + 6);
  e.sort((l, u) => o(l) - o(u));
  const n = e.length >> 1;
  return {
    ...i,
    left: te(t, e.slice(0, n)),
    right: te(t, e.slice(n))
  };
}
function* Dt(t, e, i) {
  Ut(t, e, i) && (t.ids ? yield* t.ids : (yield* Dt(t.left, e, i), yield* Dt(t.right, e, i)));
}
function* At(t, e, i) {
  if (Ut(t, e, i)) {
    if (t.ids && e.ids) {
      for (const s of t.ids) for (const a of e.ids) yield [s, a];
      return;
    }
    if (t.ids) {
      yield* At(t, e.left, i), yield* At(t, e.right, i);
      return;
    }
    if (e.ids) {
      yield* At(t.left, e, i), yield* At(t.right, e, i);
      return;
    }
    yield* At(t.left, e.left, i), yield* At(t.left, e.right, i), yield* At(t.right, e.left, i), yield* At(t.right, e.right, i);
  }
}
function Qt(t, e) {
  const i = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const n of e)
    for (let l = 0; l < 3; l++)
      i.min[l] = Math.min(i.min[l], t[n].bounds.min[l]), i.max[l] = Math.max(i.max[l], t[n].bounds.max[l]);
  if (e.length <= 16) return { ...i, ids: e };
  const s = i.max.map((n, l) => n - i.min[l]), a = s.indexOf(Math.max(...s));
  e.sort(
    (n, l) => t[n].bounds.min[a] + t[n].bounds.max[a] - (t[l].bounds.min[a] + t[l].bounds.max[a])
  );
  const o = e.length >> 1;
  return {
    ...i,
    left: Qt(t, e.slice(0, o)),
    right: Qt(t, e.slice(o))
  };
}
function Bt(t, e, i, s) {
  const a = F(e, t), o = F(i[1], i[0]), n = F(i[2], i[0]), l = kt(a, n), u = _(o, l);
  if (Math.abs(u) <= 1e-12 * H(a) * H(o) * H(n)) return;
  const m = 1 / u, p = F(t, i[0]), b = _(p, l) * m, M = kt(p, o), k = _(a, M) * m, A = _(n, M) * m, O = s / Math.max(H(o), H(n), s);
  if (b >= -O && k >= -O && b + k <= 1 + O && A >= -O && A <= 1 + O)
    return Ct(t, a, Math.max(0, Math.min(1, A)));
}
function $e(t, e, i, s) {
  const a = i.map(Math.abs).indexOf(Math.max(...i.map(Math.abs))), o = [0, 1, 2].filter((u) => u !== a), n = (u, m, p) => (m[o[0]] - u[o[0]]) * (p[o[1]] - u[o[1]]) - (m[o[1]] - u[o[1]]) * (p[o[0]] - u[o[0]]), l = (u, m) => {
    const p = m.map((b, M) => n(b, m[(M + 1) % 3], u));
    return p.every((b) => b >= -s * H(i)) || p.every((b) => b <= s * H(i));
  };
  for (const u of t) if (l(u, e)) return u;
  for (const u of e) if (l(u, t)) return u;
  for (let u = 0; u < 3; u++)
    for (let m = 0; m < 3; m++) {
      const p = t[u], b = t[(u + 1) % 3], M = e[m], k = e[(m + 1) % 3], A = F(b, p), O = F(k, M), D = A[o[0]] * O[o[1]] - A[o[1]] * O[o[0]];
      if (Math.abs(D) < 1e-18) continue;
      const L = F(M, p), at = (L[o[0]] * O[o[1]] - L[o[1]] * O[o[0]]) / D, Z = (L[o[0]] * A[o[1]] - L[o[1]] * A[o[0]]) / D;
      if (at >= 0 && at <= 1 && Z >= 0 && Z <= 1) return Ct(p, A, at);
    }
}
function Ce(t, e, i, s) {
  for (let a = 0; a < 3; a++) {
    const o = Bt(t[a], t[(a + 1) % 3], e, i);
    o && s.push(o);
    const n = Bt(e[a], e[(a + 1) % 3], t, i);
    n && s.push(n);
  }
}
function Ne(t, e, i, s) {
  const a = kt(F(t[1], t[0]), F(t[2], t[0])), o = kt(F(e[1], e[0]), F(e[2], e[0])), n = H(a), l = H(o);
  if (n < 1e-20 || l < 1e-20) return;
  const u = e.map((p) => _(F(p, t[0]), a) / n), m = t.map((p) => _(F(p, e[0]), o) / l);
  if (!(u.every((p) => p > i) || u.every((p) => p < -i) || m.every((p) => p > i) || m.every((p) => p < -i))) {
    if (u.every((p) => Math.abs(p) <= i) && m.every((p) => Math.abs(p) <= i))
      return s ? $e(t, e, a, i) : void 0;
    if (!(!s && (!(Math.min(...u) < -i && Math.max(...u) > i) || !(Math.min(...m) < -i && Math.max(...m) > i))))
      for (let p = 0; p < 3; p++) {
        const b = Bt(t[p], t[(p + 1) % 3], e, i);
        if (b) return b;
        const M = Bt(e[p], e[(p + 1) % 3], t, i);
        if (M) return M;
      }
  }
}
class Oe {
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
    const i = Jt(kt(F(e[1], e[0]), F(e[2], e[0])));
    if (!i) return;
    const a = i[0] < -1e-9 || Math.abs(i[0]) <= 1e-9 && (i[1] < -1e-9 || Math.abs(i[1]) <= 1e-9 && i[2] < 0) ? [-i[0], -i[1], -i[2]] : [i[0], i[1], i[2]], o = this.key(a);
    for (this.items.has(o) || this.items.set(o, a); this.items.size > 512 && this.step > 10; ) {
      this.step /= 10;
      const n = /* @__PURE__ */ new Map();
      for (const l of this.items.values()) {
        const u = this.key(l);
        n.has(u) || n.set(u, l);
      }
      this.items = n;
    }
  }
  addFrom(e, i) {
    for (const s of i) this.add(wt(e, s));
  }
  values() {
    return [
      ...this.world,
      ...[...this.items].sort((e, i) => e[0] < i[0] ? -1 : 1).map(([, e]) => e)
    ];
  }
}
function ee(t, e) {
  const i = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
  for (const a of t) {
    const o = [a[0] - e[0], a[1] - e[1], a[2] - e[2]];
    for (let n = 0; n < 3; n++)
      for (let l = 0; l < 3; l++) i[n][l] += o[n] * o[l];
  }
  const s = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ];
  for (let a = 0; a < 12; a++) {
    let o = 0;
    for (let n = 0; n < 3; n++)
      for (let l = n + 1; l < 3; l++) o += i[n][l] * i[n][l];
    if (o <= 1e-30) break;
    for (let n = 0; n < 3; n++)
      for (let l = n + 1; l < 3; l++) {
        if (Math.abs(i[n][l]) <= 1e-30) continue;
        const u = (i[l][l] - i[n][n]) / (2 * i[n][l]), m = (u >= 0 ? 1 : -1) / (Math.abs(u) + Math.sqrt(u * u + 1)), p = 1 / Math.sqrt(m * m + 1), b = m * p;
        for (const M of [i, s])
          for (let k = 0; k < 3; k++) {
            const A = M[k][n], O = M[k][l];
            M[k][n] = p * A - b * O, M[k][l] = b * A + p * O;
          }
        for (let M = 0; M < 3; M++) {
          const k = i[n][M], A = i[l][M];
          i[n][M] = p * k - b * A, i[l][M] = b * k + p * A;
        }
      }
  }
  return [0, 1, 2].sort((a, o) => i[o][o] - i[a][a]).map((a) => Jt([s[0][a], s[1][a], s[2][a]])).filter((a) => !!a);
}
function qe(t, e, i, s) {
  const a = e.min.map((p, b) => (p + e.max[b]) / 2), o = H(F(e.max, e.min)), n = Math.max(i * 10, o / 50), l = (p) => [0, 1, 2].map(
    (b) => p.reduce((M, k) => M + k[b], 0) / p.length
  );
  let u = [{ hits: t, limits: [] }], m = !1;
  for (let p = 0; p < 12; p++) {
    const b = [];
    let M = !1;
    for (const k of u) {
      if (k.hits.length < 2) {
        b.push(k);
        continue;
      }
      if (b.length + u.length >= 64) {
        m = !0, b.push(k);
        continue;
      }
      const A = l(k.hits), O = [
        A,
        a,
        ...[0, 0.25, 0.5, 0.75].map(
          (d) => k.hits[Math.floor(d * (k.hits.length - 1))]
        )
      ], D = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ], L = ee(k.hits, A);
      L[0] && D.push(L[0]);
      const at = (d) => {
        let g = -1 / 0, S = 1 / 0;
        for (const w of k.hits) {
          const z = _(w, d);
          z > g && (g = z), z < S && (S = z);
        }
        return g - S;
      }, Z = (d) => Math.max(
        0,
        ...L.filter((g) => Math.abs(_(g, d)) < 0.9).map((g) => at(g))
      ), T = (d) => {
        const g = k.hits.map((w) => _(w, d)).sort((w, z) => w - z), S = [];
        for (let w = 1; w < g.length; w++) {
          const z = g[w] - g[w - 1];
          z > n && S.push({ at: (g[w] + g[w - 1]) / 2, size: z });
        }
        return S.sort((w, z) => z.size - w.size);
      };
      let Y, x = 0;
      for (const d of D) {
        const g = T(d);
        !g.length || g[0].size <= x || g[0].size <= Z(d) || (x = g[0].size, s(d, g[0].at, O) && (Y = { n: d, cuts: [g[0].at] }));
      }
      if (!Y) {
        b.push(k);
        continue;
      }
      M = !0;
      const { n: lt, cuts: C } = Y, q = Array.from({ length: C.length + 1 }, () => []);
      for (const d of k.hits) {
        const g = _(d, lt);
        let S = 0;
        for (; S < C.length && g >= C[S]; ) S++;
        q[S].push(d);
      }
      q.forEach(
        (d, g) => b.push({
          hits: d,
          limits: [
            ...k.limits,
            {
              n: lt,
              from: g ? C[g - 1] : -1 / 0,
              to: g < C.length ? C[g] : 1 / 0
            }
          ]
        })
      );
    }
    if (u = b, M && p === 11 && (m = !0), !M) break;
  }
  return { zones: u, crowded: m };
}
function re(t, e, i) {
  return i.every(({ n: s, from: a, to: o }) => {
    let n = 1 / 0, l = -1 / 0;
    for (let u = 0; u < 9; u += 3) {
      const m = xt(t, e, u) * s[0] + xt(t, e, u + 1) * s[1] + xt(t, e, u + 2) * s[2];
      m < n && (n = m), m > l && (l = m);
    }
    return l >= a && n <= o;
  });
}
function le(t, e, i, s, a, o, n, l, u, m, p, b = !1) {
  let M = !1;
  const k = (C) => {
    let q = -1 / 0, d = 1 / 0;
    const g = (S) => {
      S > q && (q = S), S < d && (d = S);
    };
    for (const S of u) g(_(S, C));
    for (const [S, w, z] of [
      [t, i, 1],
      [e, s, 0]
    ]) {
      const j = Math.max(1, Math.floor(w.length / 32));
      j > 1 && (M = !0);
      for (let R = 0; R < w.length; R += j)
        for (const $ of wt(S, w[R])) p(z, $) && g(_($, C));
    }
    return Number.isFinite(q) && Number.isFinite(d) ? q - d : 0;
  }, A = (C) => {
    let q = 1 / 0, d = -1 / 0;
    for (let g = 0; g < 8; g++) {
      const S = (g & 1 ? n.max[0] : n.min[0]) * C[0] + (g & 2 ? n.max[1] : n.min[1]) * C[1] + (g & 4 ? n.max[2] : n.min[2]) * C[2];
      S < q && (q = S), S > d && (d = S);
    }
    return [q, d];
  }, O = (C, q, d, g, S) => {
    let w = 1 / 0, z = -1 / 0;
    for (const j of q) {
      let R = 1 / 0, $ = -1 / 0;
      for (let N = 0; N < 9; N += 3) {
        const B = xt(C, j, N) * d[0] + xt(C, j, N + 1) * d[1] + xt(C, j, N + 2) * d[2];
        B < R && (R = B), B > $ && ($ = B);
      }
      $ < g || R > S || (R < g && (R = g), $ > S && ($ = S), R < w && (w = R), $ > z && (z = $));
    }
    return w === 1 / 0 ? void 0 : [w, z];
  };
  if (n.min.some((C, q) => n.max[q] - C <= 0))
    return { width: 0, thin: !1, approximate: !1 };
  const D = Math.ceil((i.length + s.length) / 4096), L = [
    ...a,
    ...D > 1 ? o.filter((C, q) => q < 3 || q % D === 0) : o
  ];
  D > 1 && L.length < a.length + o.length && (M = !0);
  const at = (C, q, d, g, S) => {
    const w = (R) => Ct(l, d, R - _(l, d));
    if (!q) return p(C, w((g + S) / 2)) ? [g, S] : void 0;
    let [z, j] = q;
    return z > g && p(C, w((g + z) / 2)) && (z = g), j < S && p(C, w((j + S) / 2)) && (j = S), [z, j];
  }, Z = (C, q) => C && q ? Math.min(C[1], q[1]) - Math.max(C[0], q[0]) : 0;
  let T = 1 / 0, Y = !1, x = !1, lt = 0;
  for (let C = 0; C < L.length; C++) {
    const q = L[C], [d, g] = A(q), S = O(t, i, q, d, g), w = O(e, s, q, d, g);
    let z = Z(S, w);
    if (z <= 0 && (lt++ < 32 ? z = Z(at(0, S, q, d, g), at(1, w, q, d, g)) : M = !0), b && u.length > 1) {
      let j = 1 / 0, R = -1 / 0;
      for (const $ of u) {
        const N = _($, q);
        j = Math.min(j, N), R = Math.max(R, N);
      }
      z = Math.max(z, R - j);
    }
    if (z <= m && (C < a.length && lt < 40 && (lt++, z = k(q)), z <= m)) {
      C < a.length && (x = !0);
      continue;
    }
    Y = !0, z < T && (T = z);
  }
  return {
    width: Y && Number.isFinite(T) ? T : 0,
    thin: x,
    approximate: M
  };
}
function Pe(t, e) {
  const i = zt(t);
  if (!i) return !0;
  const s = [0, 0, 0];
  for (let n = 0; n < i; n++)
    for (let l = 0; l < 9; l += 3)
      for (let u = 0; u < 3; u++) s[u] += xt(t, n, l + u);
  for (let n = 0; n < 3; n++) s[n] /= i * 3;
  let a = 0, o = 0;
  for (let n = 0; n < i; n++) {
    const l = wt(t, n), u = F(l[0], s), m = F(l[1], s), p = F(l[2], s);
    a += _(u, kt(m, p)) / 6, o += H(kt(F(l[1], l[0]), F(l[2], l[0]))) / 2;
  }
  return Math.abs(a) <= e * o;
}
const xe = (t) => Math.max(1e-10, Math.max(1, ...t.bounds.min.map(Math.abs), ...t.bounds.max.map(Math.abs)) * Number.EPSILON * 64);
async function Le(t, e, i) {
  const s = xe(t), a = zt(t), o = { closed: !1, approximate: !1 };
  if (t.closed && !Pe(t, s)) return { closed: !0, approximate: !1 };
  const n = new Uint32Array(a), l = new Uint8Array(a), u = new Uint8Array(a), m = new Uint8Array(a);
  for (let d = 0; d < a; d++) n[d] = d;
  const p = (d) => {
    if (n[d] !== d) {
      const g = n[d];
      n[d] = p(g), u[d] ^= u[g];
    }
    return n[d];
  }, b = (d, g, S) => {
    let w = p(d), z = p(g);
    const j = u[d] ^ u[g] ^ S;
    return w === z ? j === 0 : (l[w] < l[z] && ([w, z] = [z, w]), n[z] = w, u[z] = j, l[w] === l[z] && l[w]++, !0);
  }, M = /* @__PURE__ */ new Map(), k = [], A = /* @__PURE__ */ new Map(), O = a * 3, D = O * O <= Number.MAX_SAFE_INTEGER, L = (d, g) => D ? d * O + g : `${d},${g}`, at = (d, g) => {
    const S = d.map((z, j) => Math.round((z - t.bounds.min[j]) / s)).join(",");
    let w = M.get(S);
    return w === void 0 && (w = M.size, M.set(S, w), k.push(g)), w;
  };
  for (let d = 0; d < a; d++) {
    d % 2048 === 0 && await e();
    const g = wt(t, d);
    if (H(kt(F(g[1], g[0]), F(g[2], g[0]))) <= s * s) continue;
    const S = g.map((w, z) => at(w, d * 3 + z));
    if (new Set(S).size === 3) {
      m[d] = 1;
      for (let w = 0; w < 3; w++) {
        const z = S[w], j = S[(w + 1) % 3], R = z < j, $ = R ? L(z, j) : L(j, z), N = A.get($);
        if (N === void 0) A.set($, (d + 1) * (R ? 1 : -1));
        else {
          if (N === 0 || !b(d, Math.abs(N) - 1, +(N > 0 === R))) return o;
          A.set($, 0);
        }
      }
    }
  }
  const Z = (d) => {
    const g = k[d];
    return [0, 1, 2].map((S) => xt(t, Math.floor(g / 3), g % 3 * 3 + S));
  }, T = [];
  for (const [d, g] of A) if (g !== 0) {
    const S = typeof d == "number" ? [Math.floor(d / O), d % O] : d.split(",").map(Number), w = Z(S[0]), z = Z(S[1]);
    T.push({ p: w, q: z, face: g, bounds: Rt([...w, ...z]) }), T.length % 2048 === 0 && await e();
  }
  M.clear(), A.clear(), k.length = 0;
  let Y = !1;
  if (T.length) {
    const d = Math.max(s, Math.min(1e-5, i)), g = Qt(T, T.map((S, w) => w));
    for (let S = 0; S < T.length; S++) {
      S % 128 === 0 && await e();
      const w = T[S], z = F(w.q, w.p), j = H(z), R = Jt(z), $ = [];
      for (const B of Dt(g, w.bounds, d)) {
        if (S === B) continue;
        const W = T[B], J = F(W.p, w.p), ht = F(W.q, w.p), X = _(J, R), tt = _(ht, R), vt = Math.max(0, Math.min(X, tt)), ot = Math.min(j, Math.max(X, tt));
        if (ot - vt <= s) continue;
        const st = Math.max(H(Ct(J, R, -X)), H(Ct(ht, R, -tt)));
        if (st > d) continue;
        const Mt = tt > X == (w.face > 0 == W.face > 0);
        if (!b(Math.abs(w.face) - 1, Math.abs(W.face) - 1, Number(Mt))) return o;
        st > s && (Y = !0), $.push([vt, ot]);
      }
      $.sort((B, W) => B[0] - W[0]);
      let N = 0;
      for (const [B, W] of $) {
        if (Math.abs(B - N) > s) return o;
        N = W;
      }
      if (Math.abs(N - j) > s) return o;
    }
  }
  const x = new Float64Array(a), lt = new Float64Array(a), C = t.bounds.min.map((d, g) => (d + t.bounds.max[g]) / 2);
  for (let d = 0; d < a; d++) {
    if (d % 2048 === 0 && await e(), !m[d]) continue;
    const g = p(d), S = wt(t, d);
    x[g] += (u[d] ? -1 : 1) * _(F(S[0], C), kt(F(S[1], C), F(S[2], C))) / 6, lt[g] += H(kt(F(S[1], S[0]), F(S[2], S[0]))) / 2;
  }
  let q = 0;
  for (let d = 0; d < a; d++) {
    if (lt[d] && Math.abs(x[d]) <= s * lt[d]) return o;
    q += Math.abs(x[d]);
  }
  return { closed: q > 0, approximate: Y };
}
function De(t, e, i) {
  const s = F(e[1], e[0]), a = F(e[2], e[0]), o = kt(s, a), n = H(o);
  if (n < 1e-20 || Math.abs(_(F(t, e[0]), o)) / n > i) return !1;
  const l = F(t, e[0]), u = _(s, s), m = _(s, a), p = _(a, a), b = _(l, s), M = _(l, a), k = u * p - m * m;
  if (Math.abs(k) < 1e-30) return !1;
  const A = (b * p - M * m) / k, O = (M * u - b * m) / k, D = i / Math.max(H(s), H(a), i);
  return A >= -D && O >= -D && A + O <= 1 + D;
}
function Tt(t, e, i, s) {
  for (const a of Dt(i, { min: t, max: t }, s))
    if (De(t, wt(e, a), s)) return !0;
  return !1;
}
const Ot = (t) => t.closed || t.interior === "winding";
function ie(t, e, i, s = !1) {
  const a = (n) => {
    if (n.moment) return n.moment;
    const l = [0, 0, 0];
    if (n.ids)
      for (const u of n.ids) {
        const m = wt(e, u), p = kt(F(m[1], m[0]), F(m[2], m[0]));
        for (let b = 0; b < 3; b++) l[b] += p[b] / 2;
      }
    else {
      const u = a(n.left), m = a(n.right);
      for (let p = 0; p < 3; p++) l[p] = u[p] + m[p];
    }
    return n.moment = l;
  }, o = (n) => {
    const l = n.min.map((M, k) => (M + n.max[k]) / 2), u = F(l, t), m = H(u), p = H(F(n.max, n.min)) / 2;
    if (!s && m > p * 10 && m > 0)
      return _(a(n), u) / (m * m * m);
    if (!n.ids) return o(n.left) + o(n.right);
    let b = 0;
    for (const M of n.ids) {
      const k = wt(e, M), A = F(k[0], t), O = F(k[1], t), D = F(k[2], t), L = H(A), at = H(O), Z = H(D);
      !L || !at || !Z || (b += 2 * Math.atan2(_(A, kt(O, D)), L * at * Z + _(A, O) * Z + _(O, D) * L + _(D, A) * at));
    }
    return b;
  };
  return o(i) / (4 * Math.PI);
}
async function Fe(t, e, i) {
  const s = xe(t), a = (u) => !Tt(u, t, e, s) && Math.abs(ie(u, t, e)) > 0.9, o = t.bounds.min.map((u, m) => (u + t.bounds.max[m]) / 2);
  if (a(o)) return !0;
  const n = zt(t), l = Math.max(1, Math.ceil(n / 32));
  for (let u = 0; u < n; u += l) {
    await i();
    const m = wt(t, u), p = Jt(kt(F(m[1], m[0]), F(m[2], m[0])));
    if (!p) continue;
    const b = [0, 1, 2].map((k) => (m[0][k] + m[1][k] + m[2][k]) / 3), M = Math.max(s * 8, Math.min(H(F(m[0], m[1])), H(F(m[1], m[2])), H(F(m[2], m[0]))) * 0.01);
    if (a(Ct(b, p, M)) || a(Ct(b, p, -M))) return !0;
  }
  return !1;
}
function Pt(t, e, i, s) {
  if (!Ot(e) || t.some((b, M) => b < e.bounds.min[M] - s || b > e.bounds.max[M] + s) || Tt(t, e, i, s)) return !1;
  if (e.interior === "winding") {
    const b = Math.abs(ie(t, e, i));
    return Math.abs(b - 0.5) < 0.05 ? Math.abs(ie(t, e, i, !0)) > 0.5 : b > 0.5;
  }
  const a = [1, 0.371390676, 0.52999894], o = H(F(e.bounds.max, e.bounds.min)) * 3 + 1, n = Ct(t, a, o), l = [], u = Rt([...t, ...n]);
  for (const b of Dt(i, u, s)) {
    const M = Bt(t, n, wt(e, b), s);
    if (M) {
      const k = H(F(M, t));
      k > s && l.push(k);
    }
  }
  l.sort((b, M) => b - M);
  let m = 0, p = -1 / 0;
  for (const b of l)
    b - p > s * 2 && (m++, p = b);
  return m % 2 === 1;
}
async function Re(t, e, i, s, a) {
  const o = e.precision / 1e3;
  if (!Number.isFinite(o) || o <= 0)
    throw Error("Точность расчёта должна быть положительным числом.");
  const n = t.filter((d) => e.includeHidden || !d.hidden), l = n.filter((d) => Ft(d, e.a)), u = n.filter((d) => Ft(d, e.b));
  if (!l.length || !u.length)
    throw Error(
      "Выборка А или Б не содержит элементов. Отметьте хотя бы одну модель в каждой стороне проверки."
    );
  let m = performance.now();
  const p = async () => {
    if (s())
      throw Error("Расчёт отменён. Предыдущие результаты сохранены.");
    performance.now() - m > 16 && (await new Promise((d) => setTimeout(d, 0)), m = performance.now());
  }, b = /* @__PURE__ */ new Map(), M = (d) => {
    let g = b.get(d.id);
    return g || (g = te(
      d,
      Array.from({ length: zt(d) }, (S, w) => w)
    ), b.set(d.id, g)), g;
  }, k = /* @__PURE__ */ new Map(), A = async (d) => {
    if (e.type !== "intersection") return d;
    let g = k.get(d.id);
    return g === void 0 && (g = await Le(d, p, o), !g.closed && await Fe(d, M(d), p) && (g = { closed: !1, approximate: !0, winding: !0 }), k.set(d.id, g)), g.winding ? { ...d, closed: !1, interior: "winding" } : g.closed === d.closed ? d : { ...d, closed: g.closed };
  }, O = /* @__PURE__ */ new Map(), D = async (d) => {
    let g = O.get(d.id);
    if (g !== void 0) return g;
    const S = [];
    for (let w = 0; w < zt(d); w++)
      S.push(
        [0, 3, 6].map(
          (z) => [0, 1, 2].map((j) => Math.round(xt(d, w, z + j) / o)).join(",")
        ).sort().join(";")
      ), w % 9e3 === 0 && await p();
    return g = S.sort().join("|"), O.set(d.id, g), g;
  }, L = [], at = new Set(l.map((d) => d.id)), Z = new Set(u.map((d) => d.id)), T = Qt(
    u,
    u.map((d, g) => g)
  ), Y = /* @__PURE__ */ new Map();
  let x = 0;
  const lt = (d) => d.triangles.byteLength + (d.vertices?.byteLength || 0) + (d.indices?.byteLength || 0) + zt(d) * 32;
  async function C(d, g) {
    if (!a) return d;
    let S = Y.get(d.id);
    if (S)
      return Y.delete(d.id), Y.set(d.id, S), S;
    for (const [w, z] of Y)
      w !== g && x > 96 * 1024 * 1024 && (Y.delete(w), x -= lt(z), b.delete(w), O.delete(w));
    return S = await a(d.id), Y.set(d.id, S), x += lt(S), S;
  }
  let q = -1 / 0;
  for (let d = 0; d < l.length; d++) {
    const g = l[d];
    performance.now() - q > 150 && (q = performance.now(), i({
      phase: "Проверка пар",
      done: d,
      total: l.length,
      found: L.length
    }));
    const S = [...Dt(T, g.bounds, o)];
    for (let w = 0; w < S.length; w++) {
      const z = S[w];
      performance.now() - q > 150 && (q = performance.now(), i({
        phase: `Проверка пар · A ${d + 1}/${l.length} · кандидаты ${w + 1}/${S.length}`,
        done: d,
        total: l.length,
        found: L.length
      }));
      const j = u[z];
      if (await p(), g.id === j.id || !Ut(g.bounds, j.bounds, o) || e.ignoreSameModel && g.modelId === j.modelId || e.ignoreSameGroup && g.modelId === j.modelId && g.properties.Объект && g.properties.Объект === j.properties.Объект || e.equalProperty && g.properties[e.equalProperty] !== void 0 && g.properties[e.equalProperty] === j.properties[e.equalProperty] || g.id > j.id && at.has(j.id) && Z.has(g.id)) continue;
      const R = Ae(g.id, j.id), $ = await A(await C(g)), N = await A(await C(j, g.id));
      let B, W = "surface", J = 0, ht;
      if (e.type === "duplicates") {
        if (zt($) !== zt(N) || $.bounds.min.some(
          (X, tt) => Math.abs(X - N.bounds.min[tt]) > o || Math.abs($.bounds.max[tt] - N.bounds.max[tt]) > o
        ))
          continue;
        await D($) === await D(N) && (B = $.bounds.min.map((X, tt) => (X + $.bounds.max[tt]) / 2), W = "duplicate");
      } else {
        const X = M($), tt = M(N), vt = Math.max(
          1,
          ...$.bounds.min.map(Math.abs),
          ...$.bounds.max.map(Math.abs),
          ...N.bounds.min.map(Math.abs),
          ...N.bounds.max.map(Math.abs)
        ), ot = Math.max(1e-10, vt * Number.EPSILON * 64), st = {
          min: $.bounds.min.map(
            (Q, G) => Math.max(Q, N.bounds.min[G])
          ),
          max: $.bounds.max.map(
            (Q, G) => Math.min(Q, N.bounds.max[G])
          )
        }, Mt = st.min.map(
          (Q, G) => (Q + st.max[G]) / 2
        ), jt = new Oe(), et = [];
        let ut = 1, nt = 0, Nt = 1 / 0, qt = 0;
        for (const [Q, G] of At(X, tt, o)) {
          const K = wt($, Q), ft = wt(N, G);
          if (!Ut(Rt(K.flat()), Rt(ft.flat()), o)) continue;
          const gt = Ne(K, ft, ot, e.touching);
          if (gt) {
            const Et = H(F(gt, Mt));
            if ((!B || Et < Nt) && (B = gt, Nt = Et), jt.add(K), jt.add(ft), nt++ % ut === 0 && (Ce(K, ft, ot, et), et.length || et.push(gt), et.length >= 8192)) {
              for (let r = 0; r * 2 < et.length; r++) et[r] = et[r * 2];
              et.length = Math.ceil(et.length / 2), ut *= 2;
            }
          }
          ++qt % 256 === 0 && (performance.now() - q > 150 && (q = performance.now(), i({
            phase: `Геометрия пары · A ${d + 1}/${l.length}`,
            done: d,
            total: l.length,
            found: L.length
          })), await p());
        }
        if (!B && Ot($) && Ot(N)) {
          const Q = Mt;
          Pt(Q, $, X, ot) && Pt(Q, N, tt, ot) && (B = Q, W = "contained");
        }
        if (!B) {
          for (const [Q, G, K] of [
            [$, N, tt],
            [N, $, X]
          ])
            if (Ot(G)) {
              for (let ft = 0; ft < zt(Q) && !B; ft++) {
                const gt = wt(Q, ft), Et = gt[0].map(
                  (r, c) => (gt[0][c] + gt[1][c] + gt[2][c]) / 3
                );
                for (const r of [gt[0], Et])
                  if (Pt(r, G, K, ot)) {
                    B = r, W = "contained";
                    break;
                  }
                await p();
              }
              if (B) break;
            }
        }
        if (B) {
          const Q = (it, rt) => [...Dt(rt, st, o)].filter(
            (It) => Ut(Rt(wt(it, It).flat()), st, o)
          ), G = Q($, X), K = Q(N, tt);
          W !== "surface" && (jt.addFrom($, G), jt.addFrom(N, K)), await p();
          const ft = st.min.map(
            (it, rt) => (it + st.max[rt]) / 2
          ), gt = (it, rt) => it === 0 ? Pt(rt, $, X, ot) : Pt(rt, N, tt, ot), Et = (it, rt) => it === 0 ? Pt(rt, $, X, ot) || Tt(rt, $, X, ot) : Pt(rt, N, tt, ot) || Tt(rt, N, tt, ot);
          if (W === "contained") {
            const it = Math.max(1, Math.ceil((G.length + K.length) / 4096));
            ut = Math.max(ut, it);
            const rt = /* @__PURE__ */ new Set();
            for (const [It, mt, bt] of [[$, G, 1], [N, K, 0]]) {
              for (let yt = 0; yt < mt.length; yt += it) {
                yt % (it * 32) === 0 && await p();
                for (const St of wt(It, mt[yt])) {
                  const Gt = St.join(",");
                  rt.has(Gt) || (rt.add(Gt), Et(bt, St) && et.push(St));
                }
              }
              rt.clear();
            }
            if ($.interior === "winding" || N.interior === "winding") {
              const It = (mt, bt) => {
                let yt = 1, St = 0;
                for (; mt; mt = Math.floor(mt / bt))
                  yt /= bt, St += yt * (mt % bt);
                return St;
              };
              for (let mt = 1; mt <= 2048; mt++) {
                mt % 16 === 0 && await p();
                const bt = [2, 3, 5].map((yt, St) => st.min[St] + It(mt, yt) * (st.max[St] - st.min[St]));
                gt(0, bt) && gt(1, bt) && et.push(bt);
              }
            }
          }
          const r = (it, rt, It) => Ot($) && Ot(N) && It.every((mt) => {
            const bt = Ct(mt, it, rt - _(mt, it));
            return !Et(0, bt) || !Et(1, bt);
          }), c = () => [0, 1, 2].map(
            (it) => et.reduce((rt, It) => rt + It[it], 0) / et.length
          ), h = W === "surface" && et.length > 2 ? ee(et, c())[2] : void 0, f = h ? le(
            $,
            N,
            G,
            K,
            [h],
            [],
            st,
            c(),
            et,
            ot,
            gt
          ) : void 0, y = !f || f.width > ot, E = !y && !!f?.approximate, v = !Ot($) || !Ot(N);
          if (!v && !y && !E && (W = "touch"), W === "touch" && !e.touching) continue;
          const { zones: I, crowded: P } = qe(et, st, o, r), U = jt.values();
          let V = 0, ct = !E, pt = P || ut > 1 || !!f?.approximate || !!k.get($.id)?.approximate || !!k.get(N.id)?.approximate;
          for (const it of W === "touch" ? [] : I) {
            const rt = it.limits.length ? G.filter((yt) => re($, yt, it.limits)) : G, It = it.limits.length ? K.filter((yt) => re(N, yt, it.limits)) : K, mt = it.hits.length ? [0, 1, 2].map(
              (yt) => it.hits.reduce((St, Gt) => St + Gt[yt], 0) / it.hits.length
            ) : ft, bt = le(
              $,
              N,
              rt,
              It,
              it.hits.length > 2 ? ee(it.hits, mt) : [],
              U,
              st,
              mt,
              it.hits,
              ot,
              gt,
              W === "contained"
            );
            bt.thin && (ct = !1), bt.approximate && (pt = !0), bt.width > V && (V = bt.width), await p();
          }
          V *= 1e3, W === "touch" ? ht = void 0 : v ? ht = "unmeasurable" : V <= 0 || !ct ? ht = "tolerance" : pt && (ht = "approximate"), J = W === "touch" || ht === "unmeasurable" || ht === "tolerance" ? 0 : V, await p();
        }
        if (B && !ht && J + e.precision < e.minPenetration)
          continue;
      }
      if (B && (L.push({
        id: R,
        a: se($),
        b: se(N),
        point: B,
        kind: W,
        state: "new",
        note: "",
        assignee: "",
        firstSeen: "",
        lastSeen: "",
        penetrationMm: J,
        ...ht ? { depth: ht } : {}
      }), L.length >= 5e4))
        throw Error(
          "Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат."
        );
    }
  }
  return i({
    phase: "Готово",
    done: l.length,
    total: l.length,
    found: L.length
  }), L;
}
const ye = '(function(){"use strict";const Ot=({triangles:n,vertices:t,indices:i,triangleCount:u,closed:a,bounds:l,...s})=>s;function Tt(n,t){return t.exclude.includes(n.id)?!1:t.include.includes(n.id)?!0:!(t.manualOnly||t.modelsMode==="selected"&&!t.models.includes(n.modelId)||t.modelsMode===void 0&&t.models.length&&!t.models.includes(n.modelId))}const Rt=(n,t)=>JSON.stringify([n,t].sort()),w=(n,t)=>[n[0]-t[0],n[1]-t[1],n[2]-t[2]],ft=(n,t,i=1)=>[n[0]+t[0]*i,n[1]+t[1]*i,n[2]+t[2]*i],_=(n,t)=>n[0]*t[0]+n[1]*t[1]+n[2]*t[2],k=(n,t)=>[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]],E=n=>Math.hypot(...n),It=n=>{const t=E(n);return t>1e-20?[n[0]/t,n[1]/t,n[2]/t]:void 0},ct=n=>n.triangleCount??(n.indices?n.indices.length/3:n.triangles.length/9),D=(n,t,i)=>n.indices&&n.vertices?n.vertices[n.indices[t*3+Math.floor(i/3)]*3+i%3]:n.triangles[t*9+i],Z=(n,t)=>[0,3,6].map(i=>[D(n,t,i),D(n,t,i+1),D(n,t,i+2)]);function yt(n){const t=[1/0,1/0,1/0],i=[-1/0,-1/0,-1/0];for(let u=0;u<n.length;u++){const a=u%3;t[a]=Math.min(t[a],n[u]),i[a]=Math.max(i[a],n[u])}return{min:t,max:i}}const Mt=(n,t,i)=>n.min.every((u,a)=>u<=t.max[a]+i&&n.max[a]>=t.min[a]-i);function Nt(n,t){const i={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const r of t)for(let f=0;f<9;f++){const h=f%3,c=D(n,r,f);i.min[h]=Math.min(i.min[h],c),i.max[h]=Math.max(i.max[h],c)}if(t.length<=12)return{...i,ids:t};const u=i.max.map((r,f)=>r-i.min[f]),a=u.indexOf(Math.max(...u)),l=r=>D(n,r,a)+D(n,r,a+3)+D(n,r,a+6);t.sort((r,f)=>l(r)-l(f));const s=t.length>>1;return{...i,left:Nt(n,t.slice(0,s)),right:Nt(n,t.slice(s))}}function*mt(n,t,i){Mt(n,t,i)&&(n.ids?yield*n.ids:(yield*mt(n.left,t,i),yield*mt(n.right,t,i)))}function*lt(n,t,i){if(Mt(n,t,i)){if(n.ids&&t.ids){for(const u of n.ids)for(const a of t.ids)yield[u,a];return}if(n.ids){yield*lt(n,t.left,i),yield*lt(n,t.right,i);return}if(t.ids){yield*lt(n.left,t,i),yield*lt(n.right,t,i);return}yield*lt(n.left,t.left,i),yield*lt(n.left,t.right,i),yield*lt(n.right,t.left,i),yield*lt(n.right,t.right,i)}}function qt(n,t){const i={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const s of t)for(let r=0;r<3;r++)i.min[r]=Math.min(i.min[r],n[s].bounds.min[r]),i.max[r]=Math.max(i.max[r],n[s].bounds.max[r]);if(t.length<=16)return{...i,ids:t};const u=i.max.map((s,r)=>s-i.min[r]),a=u.indexOf(Math.max(...u));t.sort((s,r)=>n[s].bounds.min[a]+n[s].bounds.max[a]-(n[r].bounds.min[a]+n[r].bounds.max[a]));const l=t.length>>1;return{...i,left:qt(n,t.slice(0,l)),right:qt(n,t.slice(l))}}function xt(n,t,i,u){const a=w(t,n),l=w(i[1],i[0]),s=w(i[2],i[0]),r=k(a,s),f=_(l,r);if(Math.abs(f)<=1e-12*E(a)*E(l)*E(s))return;const h=1/f,c=w(n,i[0]),g=_(c,r)*h,p=k(c,l),M=_(a,p)*h,S=_(s,p)*h,j=u/Math.max(E(l),E(s),u);if(g>=-j&&M>=-j&&g+M<=1+j&&S>=-j&&S<=1+j)return ft(n,a,Math.max(0,Math.min(1,S)))}function Wt(n,t,i,u){const a=i.map(Math.abs).indexOf(Math.max(...i.map(Math.abs))),l=[0,1,2].filter(f=>f!==a),s=(f,h,c)=>(h[l[0]]-f[l[0]])*(c[l[1]]-f[l[1]])-(h[l[1]]-f[l[1]])*(c[l[0]]-f[l[0]]),r=(f,h)=>{const c=h.map((g,p)=>s(g,h[(p+1)%3],f));return c.every(g=>g>=-u*E(i))||c.every(g=>g<=u*E(i))};for(const f of n)if(r(f,t))return f;for(const f of t)if(r(f,n))return f;for(let f=0;f<3;f++)for(let h=0;h<3;h++){const c=n[f],g=n[(f+1)%3],p=t[h],M=t[(h+1)%3],S=w(g,c),j=w(M,p),F=S[l[0]]*j[l[1]]-S[l[1]]*j[l[0]];if(Math.abs(F)<1e-18)continue;const N=w(p,c),J=(N[l[0]]*j[l[1]]-N[l[1]]*j[l[0]])/F,R=(N[l[0]]*S[l[1]]-N[l[1]]*S[l[0]])/F;if(J>=0&&J<=1&&R>=0&&R<=1)return ft(c,S,J)}}function Yt(n,t,i,u){for(let a=0;a<3;a++){const l=xt(n[a],n[(a+1)%3],t,i);l&&u.push(l);const s=xt(t[a],t[(a+1)%3],n,i);s&&u.push(s)}}function Zt(n,t,i,u){const a=k(w(n[1],n[0]),w(n[2],n[0])),l=k(w(t[1],t[0]),w(t[2],t[0])),s=E(a),r=E(l);if(s<1e-20||r<1e-20)return;const f=t.map(c=>_(w(c,n[0]),a)/s),h=n.map(c=>_(w(c,t[0]),l)/r);if(!(f.every(c=>c>i)||f.every(c=>c<-i)||h.every(c=>c>i)||h.every(c=>c<-i))){if(f.every(c=>Math.abs(c)<=i)&&h.every(c=>Math.abs(c)<=i))return u?Wt(n,t,a,i):void 0;if(!(!u&&(!(Math.min(...f)<-i&&Math.max(...f)>i)||!(Math.min(...h)<-i&&Math.max(...h)>i))))for(let c=0;c<3;c++){const g=xt(n[c],n[(c+1)%3],t,i);if(g)return g;const p=xt(t[c],t[(c+1)%3],n,i);if(p)return p}}}class Bt{world=[[1,0,0],[0,1,0],[0,0,1]];items=new Map;step=1e4;key(t){return t.map(i=>Math.round(i*this.step)).join(",")}add(t){const i=It(k(w(t[1],t[0]),w(t[2],t[0])));if(!i)return;const a=i[0]<-1e-9||Math.abs(i[0])<=1e-9&&(i[1]<-1e-9||Math.abs(i[1])<=1e-9&&i[2]<0)?[-i[0],-i[1],-i[2]]:[i[0],i[1],i[2]],l=this.key(a);for(this.items.has(l)||this.items.set(l,a);this.items.size>512&&this.step>10;){this.step/=10;const s=new Map;for(const r of this.items.values()){const f=this.key(r);s.has(f)||s.set(f,r)}this.items=s}}addFrom(t,i){for(const u of i)this.add(Z(t,u))}values(){return[...this.world,...[...this.items].sort((t,i)=>t[0]<i[0]?-1:1).map(([,t])=>t)]}}function Pt(n,t){const i=[[0,0,0],[0,0,0],[0,0,0]];for(const a of n){const l=[a[0]-t[0],a[1]-t[1],a[2]-t[2]];for(let s=0;s<3;s++)for(let r=0;r<3;r++)i[s][r]+=l[s]*l[r]}const u=[[1,0,0],[0,1,0],[0,0,1]];for(let a=0;a<12;a++){let l=0;for(let s=0;s<3;s++)for(let r=s+1;r<3;r++)l+=i[s][r]*i[s][r];if(l<=1e-30)break;for(let s=0;s<3;s++)for(let r=s+1;r<3;r++){if(Math.abs(i[s][r])<=1e-30)continue;const f=(i[r][r]-i[s][s])/(2*i[s][r]),h=(f>=0?1:-1)/(Math.abs(f)+Math.sqrt(f*f+1)),c=1/Math.sqrt(h*h+1),g=h*c;for(const p of[i,u])for(let M=0;M<3;M++){const S=p[M][s],j=p[M][r];p[M][s]=c*S-g*j,p[M][r]=g*S+c*j}for(let p=0;p<3;p++){const M=i[s][p],S=i[r][p];i[s][p]=c*M-g*S,i[r][p]=g*M+c*S}}}return[0,1,2].sort((a,l)=>i[l][l]-i[a][a]).map(a=>It([u[0][a],u[1][a],u[2][a]])).filter(a=>!!a)}function Qt(n,t,i,u){const a=t.min.map((c,g)=>(c+t.max[g])/2),l=E(w(t.max,t.min)),s=Math.max(i*10,l/50),r=c=>[0,1,2].map(g=>c.reduce((p,M)=>p+M[g],0)/c.length);let f=[{hits:n,limits:[]}],h=!1;for(let c=0;c<12;c++){const g=[];let p=!1;for(const M of f){if(M.hits.length<2){g.push(M);continue}if(g.length+f.length>=64){h=!0,g.push(M);continue}const S=r(M.hits),j=[S,a,...[0,.25,.5,.75].map(e=>M.hits[Math.floor(e*(M.hits.length-1))])],F=[[1,0,0],[0,1,0],[0,0,1]],N=Pt(M.hits,S);N[0]&&F.push(N[0]);const J=e=>{let o=-1/0,m=1/0;for(const d of M.hits){const y=_(d,e);y>o&&(o=y),y<m&&(m=y)}return o-m},R=e=>Math.max(0,...N.filter(o=>Math.abs(_(o,e))<.9).map(o=>J(o))),C=e=>{const o=M.hits.map(d=>_(d,e)).sort((d,y)=>d-y),m=[];for(let d=1;d<o.length;d++){const y=o[d]-o[d-1];y>s&&m.push({at:(o[d]+o[d-1])/2,size:y})}return m.sort((d,y)=>y.size-d.size)};let W,tt=0;for(const e of F){const o=C(e);!o.length||o[0].size<=tt||o[0].size<=R(e)||(tt=o[0].size,u(e,o[0].at,j)&&(W={n:e,cuts:[o[0].at]}))}if(!W){g.push(M);continue}p=!0;const{n:nt,cuts:I}=W,v=Array.from({length:I.length+1},()=>[]);for(const e of M.hits){const o=_(e,nt);let m=0;for(;m<I.length&&o>=I[m];)m++;v[m].push(e)}v.forEach((e,o)=>g.push({hits:e,limits:[...M.limits,{n:nt,from:o?I[o-1]:-1/0,to:o<I.length?I[o]:1/0}]}))}if(f=g,p&&c===11&&(h=!0),!p)break}return{zones:f,crowded:h}}function $t(n,t,i){return i.every(({n:u,from:a,to:l})=>{let s=1/0,r=-1/0;for(let f=0;f<9;f+=3){const h=D(n,t,f)*u[0]+D(n,t,f+1)*u[1]+D(n,t,f+2)*u[2];h<s&&(s=h),h>r&&(r=h)}return r>=a&&s<=l})}function Lt(n,t,i,u,a,l,s,r,f,h,c,g=!1){let p=!1;const M=I=>{let v=-1/0,e=1/0;const o=m=>{m>v&&(v=m),m<e&&(e=m)};for(const m of f)o(_(m,I));for(const[m,d,y]of[[n,i,1],[t,u,0]]){const q=Math.max(1,Math.floor(d.length/32));q>1&&(p=!0);for(let A=0;A<d.length;A+=q)for(const x of Z(m,d[A]))c(y,x)&&o(_(x,I))}return Number.isFinite(v)&&Number.isFinite(e)?v-e:0},S=I=>{let v=1/0,e=-1/0;for(let o=0;o<8;o++){const m=(o&1?s.max[0]:s.min[0])*I[0]+(o&2?s.max[1]:s.min[1])*I[1]+(o&4?s.max[2]:s.min[2])*I[2];m<v&&(v=m),m>e&&(e=m)}return[v,e]},j=(I,v,e,o,m)=>{let d=1/0,y=-1/0;for(const q of v){let A=1/0,x=-1/0;for(let b=0;b<9;b+=3){const z=D(I,q,b)*e[0]+D(I,q,b+1)*e[1]+D(I,q,b+2)*e[2];z<A&&(A=z),z>x&&(x=z)}x<o||A>m||(A<o&&(A=o),x>m&&(x=m),A<d&&(d=A),x>y&&(y=x))}return d===1/0?void 0:[d,y]};if(s.min.some((I,v)=>s.max[v]-I<=0))return{width:0,thin:!1,approximate:!1};const F=Math.ceil((i.length+u.length)/4096),N=[...a,...F>1?l.filter((I,v)=>v<3||v%F===0):l];F>1&&N.length<a.length+l.length&&(p=!0);const J=(I,v,e,o,m)=>{const d=A=>ft(r,e,A-_(r,e));if(!v)return c(I,d((o+m)/2))?[o,m]:void 0;let[y,q]=v;return y>o&&c(I,d((o+y)/2))&&(y=o),q<m&&c(I,d((q+m)/2))&&(q=m),[y,q]},R=(I,v)=>I&&v?Math.min(I[1],v[1])-Math.max(I[0],v[0]):0;let C=1/0,W=!1,tt=!1,nt=0;for(let I=0;I<N.length;I++){const v=N[I],[e,o]=S(v),m=j(n,i,v,e,o),d=j(t,u,v,e,o);let y=R(m,d);if(y<=0&&(nt++<32?y=R(J(0,m,v,e,o),J(1,d,v,e,o)):p=!0),g&&f.length>1){let q=1/0,A=-1/0;for(const x of f){const b=_(x,v);q=Math.min(q,b),A=Math.max(A,b)}y=Math.max(y,A-q)}if(y<=h&&(I<a.length&&nt<40&&(nt++,y=M(v)),y<=h)){I<a.length&&(tt=!0);continue}W=!0,y<C&&(C=y)}return{width:W&&Number.isFinite(C)?C:0,thin:tt,approximate:p}}function Vt(n,t){const i=ct(n);if(!i)return!0;const u=[0,0,0];for(let s=0;s<i;s++)for(let r=0;r<9;r+=3)for(let f=0;f<3;f++)u[f]+=D(n,s,r+f);for(let s=0;s<3;s++)u[s]/=i*3;let a=0,l=0;for(let s=0;s<i;s++){const r=Z(n,s),f=w(r[0],u),h=w(r[1],u),c=w(r[2],u);a+=_(f,k(h,c))/6,l+=E(k(w(r[1],r[0]),w(r[2],r[0])))/2}return Math.abs(a)<=t*l}const Ct=n=>Math.max(1e-10,Math.max(1,...n.bounds.min.map(Math.abs),...n.bounds.max.map(Math.abs))*Number.EPSILON*64);async function kt(n,t,i){const u=Ct(n),a=ct(n),l={closed:!1,approximate:!1};if(n.closed&&!Vt(n,u))return{closed:!0,approximate:!1};const s=new Uint32Array(a),r=new Uint8Array(a),f=new Uint8Array(a),h=new Uint8Array(a);for(let e=0;e<a;e++)s[e]=e;const c=e=>{if(s[e]!==e){const o=s[e];s[e]=c(o),f[e]^=f[o]}return s[e]},g=(e,o,m)=>{let d=c(e),y=c(o);const q=f[e]^f[o]^m;return d===y?q===0:(r[d]<r[y]&&([d,y]=[y,d]),s[y]=d,f[y]=q,r[d]===r[y]&&r[d]++,!0)},p=new Map,M=[],S=new Map,j=a*3,F=j*j<=Number.MAX_SAFE_INTEGER,N=(e,o)=>F?e*j+o:`${e},${o}`,J=(e,o)=>{const m=e.map((y,q)=>Math.round((y-n.bounds.min[q])/u)).join(",");let d=p.get(m);return d===void 0&&(d=p.size,p.set(m,d),M.push(o)),d};for(let e=0;e<a;e++){e%2048===0&&await t();const o=Z(n,e);if(E(k(w(o[1],o[0]),w(o[2],o[0])))<=u*u)continue;const m=o.map((d,y)=>J(d,e*3+y));if(new Set(m).size===3){h[e]=1;for(let d=0;d<3;d++){const y=m[d],q=m[(d+1)%3],A=y<q,x=A?N(y,q):N(q,y),b=S.get(x);if(b===void 0)S.set(x,(e+1)*(A?1:-1));else{if(b===0||!g(e,Math.abs(b)-1,+(b>0===A)))return l;S.set(x,0)}}}}const R=e=>{const o=M[e];return[0,1,2].map(m=>D(n,Math.floor(o/3),o%3*3+m))},C=[];for(const[e,o]of S)if(o!==0){const m=typeof e=="number"?[Math.floor(e/j),e%j]:e.split(",").map(Number),d=R(m[0]),y=R(m[1]);C.push({p:d,q:y,face:o,bounds:yt([...d,...y])}),C.length%2048===0&&await t()}p.clear(),S.clear(),M.length=0;let W=!1;if(C.length){const e=Math.max(u,Math.min(1e-5,i)),o=qt(C,C.map((m,d)=>d));for(let m=0;m<C.length;m++){m%128===0&&await t();const d=C[m],y=w(d.q,d.p),q=E(y),A=It(y),x=[];for(const z of mt(o,d.bounds,e)){if(m===z)continue;const O=C[z],gt=w(O.p,d.p),et=w(O.q,d.p),Y=_(gt,A),$=_(et,A),jt=Math.max(0,Math.min(Y,$)),U=Math.min(q,Math.max(Y,$));if(U-jt<=u)continue;const B=Math.max(E(ft(gt,A,-Y)),E(ft(et,A,-$)));if(B>e)continue;const Et=$>Y==(d.face>0==O.face>0);if(!g(Math.abs(d.face)-1,Math.abs(O.face)-1,Number(Et)))return l;B>u&&(W=!0),x.push([jt,U])}x.sort((z,O)=>z[0]-O[0]);let b=0;for(const[z,O]of x){if(Math.abs(z-b)>u)return l;b=O}if(Math.abs(b-q)>u)return l}}const tt=new Float64Array(a),nt=new Float64Array(a),I=n.bounds.min.map((e,o)=>(e+n.bounds.max[o])/2);for(let e=0;e<a;e++){if(e%2048===0&&await t(),!h[e])continue;const o=c(e),m=Z(n,e);tt[o]+=(f[e]?-1:1)*_(w(m[0],I),k(w(m[1],I),w(m[2],I)))/6,nt[o]+=E(k(w(m[1],m[0]),w(m[2],m[0])))/2}let v=0;for(let e=0;e<a;e++){if(nt[e]&&Math.abs(tt[e])<=u*nt[e])return l;v+=Math.abs(tt[e])}return{closed:v>0,approximate:W}}function tn(n,t,i){const u=w(t[1],t[0]),a=w(t[2],t[0]),l=k(u,a),s=E(l);if(s<1e-20||Math.abs(_(w(n,t[0]),l))/s>i)return!1;const r=w(n,t[0]),f=_(u,u),h=_(u,a),c=_(a,a),g=_(r,u),p=_(r,a),M=f*c-h*h;if(Math.abs(M)<1e-30)return!1;const S=(g*c-p*h)/M,j=(p*f-g*h)/M,F=i/Math.max(E(u),E(a),i);return S>=-F&&j>=-F&&S+j<=1+F}function St(n,t,i,u){for(const a of mt(i,{min:n,max:n},u))if(tn(n,Z(t,a),u))return!0;return!1}const ut=n=>n.closed||n.interior==="winding";function zt(n,t,i,u=!1){const a=s=>{if(s.moment)return s.moment;const r=[0,0,0];if(s.ids)for(const f of s.ids){const h=Z(t,f),c=k(w(h[1],h[0]),w(h[2],h[0]));for(let g=0;g<3;g++)r[g]+=c[g]/2}else{const f=a(s.left),h=a(s.right);for(let c=0;c<3;c++)r[c]=f[c]+h[c]}return s.moment=r},l=s=>{const r=s.min.map((p,M)=>(p+s.max[M])/2),f=w(r,n),h=E(f),c=E(w(s.max,s.min))/2;if(!u&&h>c*10&&h>0)return _(a(s),f)/(h*h*h);if(!s.ids)return l(s.left)+l(s.right);let g=0;for(const p of s.ids){const M=Z(t,p),S=w(M[0],n),j=w(M[1],n),F=w(M[2],n),N=E(S),J=E(j),R=E(F);!N||!J||!R||(g+=2*Math.atan2(_(S,k(j,F)),N*J*R+_(S,j)*R+_(j,F)*N+_(F,S)*J))}return g};return l(i)/(4*Math.PI)}async function nn(n,t,i){const u=Ct(n),a=f=>!St(f,n,t,u)&&Math.abs(zt(f,n,t))>.9,l=n.bounds.min.map((f,h)=>(f+n.bounds.max[h])/2);if(a(l))return!0;const s=ct(n),r=Math.max(1,Math.ceil(s/32));for(let f=0;f<s;f+=r){await i();const h=Z(n,f),c=It(k(w(h[1],h[0]),w(h[2],h[0])));if(!c)continue;const g=[0,1,2].map(M=>(h[0][M]+h[1][M]+h[2][M])/3),p=Math.max(u*8,Math.min(E(w(h[0],h[1])),E(w(h[1],h[2])),E(w(h[2],h[0])))*.01);if(a(ft(g,c,p))||a(ft(g,c,-p)))return!0}return!1}function dt(n,t,i,u){if(!ut(t)||n.some((g,p)=>g<t.bounds.min[p]-u||g>t.bounds.max[p]+u)||St(n,t,i,u))return!1;if(t.interior==="winding"){const g=Math.abs(zt(n,t,i));return Math.abs(g-.5)<.05?Math.abs(zt(n,t,i,!0))>.5:g>.5}const a=[1,.371390676,.52999894],l=E(w(t.bounds.max,t.bounds.min))*3+1,s=ft(n,a,l),r=[],f=yt([...n,...s]);for(const g of mt(i,f,u)){const p=xt(n,s,Z(t,g),u);if(p){const M=E(w(p,n));M>u&&r.push(M)}}r.sort((g,p)=>g-p);let h=0,c=-1/0;for(const g of r)g-c>u*2&&(h++,c=g);return h%2===1}async function en(n,t,i,u,a){const l=t.precision/1e3;if(!Number.isFinite(l)||l<=0)throw Error("Точность расчёта должна быть положительным числом.");const s=n.filter(e=>t.includeHidden||!e.hidden),r=s.filter(e=>Tt(e,t.a)),f=s.filter(e=>Tt(e,t.b));if(!r.length||!f.length)throw Error("Выборка А или Б не содержит элементов. Отметьте хотя бы одну модель в каждой стороне проверки.");let h=performance.now();const c=async()=>{if(u())throw Error("Расчёт отменён. Предыдущие результаты сохранены.");performance.now()-h>16&&(await new Promise(e=>setTimeout(e,0)),h=performance.now())},g=new Map,p=e=>{let o=g.get(e.id);return o||(o=Nt(e,Array.from({length:ct(e)},(m,d)=>d)),g.set(e.id,o)),o},M=new Map,S=async e=>{if(t.type!=="intersection")return e;let o=M.get(e.id);return o===void 0&&(o=await kt(e,c,l),!o.closed&&await nn(e,p(e),c)&&(o={closed:!1,approximate:!0,winding:!0}),M.set(e.id,o)),o.winding?{...e,closed:!1,interior:"winding"}:o.closed===e.closed?e:{...e,closed:o.closed}},j=new Map,F=async e=>{let o=j.get(e.id);if(o!==void 0)return o;const m=[];for(let d=0;d<ct(e);d++)m.push([0,3,6].map(y=>[0,1,2].map(q=>Math.round(D(e,d,y+q)/l)).join(",")).sort().join(";")),d%9e3===0&&await c();return o=m.sort().join("|"),j.set(e.id,o),o},N=[],J=new Set(r.map(e=>e.id)),R=new Set(f.map(e=>e.id)),C=qt(f,f.map((e,o)=>o)),W=new Map;let tt=0;const nt=e=>e.triangles.byteLength+(e.vertices?.byteLength||0)+(e.indices?.byteLength||0)+ct(e)*32;async function I(e,o){if(!a)return e;let m=W.get(e.id);if(m)return W.delete(e.id),W.set(e.id,m),m;for(const[d,y]of W)d!==o&&tt>96*1024*1024&&(W.delete(d),tt-=nt(y),g.delete(d),j.delete(d));return m=await a(e.id),W.set(e.id,m),tt+=nt(m),m}let v=-1/0;for(let e=0;e<r.length;e++){const o=r[e];performance.now()-v>150&&(v=performance.now(),i({phase:"Проверка пар",done:e,total:r.length,found:N.length}));const m=[...mt(C,o.bounds,l)];for(let d=0;d<m.length;d++){const y=m[d];performance.now()-v>150&&(v=performance.now(),i({phase:`Проверка пар · A ${e+1}/${r.length} · кандидаты ${d+1}/${m.length}`,done:e,total:r.length,found:N.length}));const q=f[y];if(await c(),o.id===q.id||!Mt(o.bounds,q.bounds,l)||t.ignoreSameModel&&o.modelId===q.modelId||t.ignoreSameGroup&&o.modelId===q.modelId&&o.properties.Объект&&o.properties.Объект===q.properties.Объект||t.equalProperty&&o.properties[t.equalProperty]!==void 0&&o.properties[t.equalProperty]===q.properties[t.equalProperty]||o.id>q.id&&J.has(q.id)&&R.has(o.id))continue;const A=Rt(o.id,q.id),x=await S(await I(o)),b=await S(await I(q,o.id));let z,O="surface",gt=0,et;if(t.type==="duplicates"){if(ct(x)!==ct(b)||x.bounds.min.some((Y,$)=>Math.abs(Y-b.bounds.min[$])>l||Math.abs(x.bounds.max[$]-b.bounds.max[$])>l))continue;await F(x)===await F(b)&&(z=x.bounds.min.map((Y,$)=>(Y+x.bounds.max[$])/2),O="duplicate")}else{const Y=p(x),$=p(b),jt=Math.max(1,...x.bounds.min.map(Math.abs),...x.bounds.max.map(Math.abs),...b.bounds.min.map(Math.abs),...b.bounds.max.map(Math.abs)),U=Math.max(1e-10,jt*Number.EPSILON*64),B={min:x.bounds.min.map((G,H)=>Math.max(G,b.bounds.min[H])),max:x.bounds.max.map((G,H)=>Math.min(G,b.bounds.max[H]))},Et=B.min.map((G,H)=>(G+B.max[H])/2),wt=new Bt,K=[];let bt=1,sn=0,Ut=1/0,rn=0;for(const[G,H]of lt(Y,$,l)){const it=Z(x,G),rt=Z(b,H);if(!Mt(yt(it.flat()),yt(rt.flat()),l))continue;const Q=Zt(it,rt,U,t.touching);if(Q){const ht=E(w(Q,Et));if((!z||ht<Ut)&&(z=Q,Ut=ht),wt.add(it),wt.add(rt),sn++%bt===0&&(Yt(it,rt,U,K),K.length||K.push(Q),K.length>=8192)){for(let at=0;at*2<K.length;at++)K[at]=K[at*2];K.length=Math.ceil(K.length/2),bt*=2}}++rn%256===0&&(performance.now()-v>150&&(v=performance.now(),i({phase:`Геометрия пары · A ${e+1}/${r.length}`,done:e,total:r.length,found:N.length})),await c())}if(!z&&ut(x)&&ut(b)){const G=Et;dt(G,x,Y,U)&&dt(G,b,$,U)&&(z=G,O="contained")}if(!z){for(const[G,H,it]of[[x,b,$],[b,x,Y]])if(ut(H)){for(let rt=0;rt<ct(G)&&!z;rt++){const Q=Z(G,rt),ht=Q[0].map((at,pt)=>(Q[0][pt]+Q[1][pt]+Q[2][pt])/3);for(const at of[Q[0],ht])if(dt(at,H,it,U)){z=at,O="contained";break}await c()}if(z)break}}if(z){const G=(P,T)=>[...mt(T,B,l)].filter(st=>Mt(yt(Z(P,st).flat()),B,l)),H=G(x,Y),it=G(b,$);O!=="surface"&&(wt.addFrom(x,H),wt.addFrom(b,it)),await c();const rt=B.min.map((P,T)=>(P+B.max[T])/2),Q=(P,T)=>P===0?dt(T,x,Y,U):dt(T,b,$,U),ht=(P,T)=>P===0?dt(T,x,Y,U)||St(T,x,Y,U):dt(T,b,$,U)||St(T,b,$,U);if(O==="contained"){const P=Math.max(1,Math.ceil((H.length+it.length)/4096));bt=Math.max(bt,P);const T=new Set;for(const[st,L,X]of[[x,H,1],[b,it,0]]){for(let V=0;V<L.length;V+=P){V%(P*32)===0&&await c();for(const ot of Z(st,L[V])){const At=ot.join(",");T.has(At)||(T.add(At),ht(X,ot)&&K.push(ot))}}T.clear()}if(x.interior==="winding"||b.interior==="winding"){const st=(L,X)=>{let V=1,ot=0;for(;L;L=Math.floor(L/X))V/=X,ot+=V*(L%X);return ot};for(let L=1;L<=2048;L++){L%16===0&&await c();const X=[2,3,5].map((V,ot)=>B.min[ot]+st(L,V)*(B.max[ot]-B.min[ot]));Q(0,X)&&Q(1,X)&&K.push(X)}}}const at=(P,T,st)=>ut(x)&&ut(b)&&st.every(L=>{const X=ft(L,P,T-_(L,P));return!ht(0,X)||!ht(1,X)}),pt=()=>[0,1,2].map(P=>K.reduce((T,st)=>T+st[P],0)/K.length),Kt=O==="surface"&&K.length>2?Pt(K,pt())[2]:void 0,_t=Kt?Lt(x,b,H,it,[Kt],[],B,pt(),K,U,Q):void 0,Gt=!_t||_t.width>U,Ht=!Gt&&!!_t?.approximate,Xt=!ut(x)||!ut(b);if(!Xt&&!Gt&&!Ht&&(O="touch"),O==="touch"&&!t.touching)continue;const{zones:an,crowded:fn}=Qt(K,B,l,at),cn=wt.values();let vt=0,Dt=!Ht,Jt=fn||bt>1||!!_t?.approximate||!!M.get(x.id)?.approximate||!!M.get(b.id)?.approximate;for(const P of O==="touch"?[]:an){const T=P.limits.length?H.filter(V=>$t(x,V,P.limits)):H,st=P.limits.length?it.filter(V=>$t(b,V,P.limits)):it,L=P.hits.length?[0,1,2].map(V=>P.hits.reduce((ot,At)=>ot+At[V],0)/P.hits.length):rt,X=Lt(x,b,T,st,P.hits.length>2?Pt(P.hits,L):[],cn,B,L,P.hits,U,Q,O==="contained");X.thin&&(Dt=!1),X.approximate&&(Jt=!0),X.width>vt&&(vt=X.width),await c()}vt*=1e3,O==="touch"?et=void 0:Xt?et="unmeasurable":vt<=0||!Dt?et="tolerance":Jt&&(et="approximate"),gt=O==="touch"||et==="unmeasurable"||et==="tolerance"?0:vt,await c()}if(z&&!et&&gt+t.precision<t.minPenetration)continue}if(z&&(N.push({id:A,a:Ot(x),b:Ot(b),point:z,kind:O,state:"new",note:"",assignee:"",firstSeen:"",lastSeen:"",penetrationMm:gt,...et?{depth:et}:{}}),N.length>=5e4))throw Error("Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат.")}}return i({phase:"Готово",done:r.length,total:r.length,found:N.length}),N}let on=0;const Ft=new Map;self.onmessage=async n=>{if(n.data.request!==void 0){const t=Ft.get(n.data.request);Ft.delete(n.data.request),n.data.error?t?.reject(Error(n.data.error)):t?.resolve(n.data.geometry);return}try{const{elements:t,check:i}=n.data,u=await en(t,i,a=>self.postMessage({progress:a}),()=>!1,n.data.streaming?a=>new Promise((l,s)=>{const r=on++;Ft.set(r,{resolve:l,reject:s}),self.postMessage({load:a,request:r})}):void 0);self.postMessage({results:u})}catch(t){self.postMessage({error:t instanceof Error?t.message:String(t)})}}})();\n', ce = typeof self < "u" && self.Blob && new Blob(["(self.URL || self.webkitURL).revokeObjectURL(self.location.href);", ye], { type: "text/javascript;charset=utf-8" });
function Ue(t) {
  let e;
  try {
    if (e = ce && (self.URL || self.webkitURL).createObjectURL(ce), !e) throw "";
    const i = new Worker(e, {
      name: t?.name
    });
    return i.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(e);
    }), i;
  } catch {
    return new Worker(
      "data:text/javascript;charset=utf-8," + encodeURIComponent(ye),
      {
        name: t?.name
      }
    );
  }
}
const dt = (t) => String(t ?? "").replace(
  /[&<>"']/g,
  (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[e]
);
function de(t, e) {
  const i = URL.createObjectURL(
    new Blob([e], {
      type: t.endsWith(".html") ? "text/html;charset=utf-8" : "application/json;charset=utf-8"
    })
  ), s = document.createElement("a");
  s.href = i, s.download = t, s.click(), setTimeout(() => URL.revokeObjectURL(i), 6e4);
}
const we = {
  unmeasurable: "не определена",
  tolerance: "требует уточнения",
  approximate: "приблизительная оценка"
}, Vt = (t = 0) => t > 0 && t < 0.1 ? String(Number(t.toPrecision(2))) : t.toFixed(1), Wt = (t, e) => e === "duplicates" ? "—" : t.kind === "touch" ? "касание" : t.depth === "approximate" ? `≈ ${Vt(t.penetrationMm)}` : t.depth ? we[t.depth] : Vt(t.penetrationMm);
function Be(t, e) {
  const i = dt;
  return `<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${i(t.name)}</title><style>body{font:14px/1.5 system-ui;margin:24px;background:#171c23;color:#e6edf5}h1{margin:0}small{color:#a9b7c8}input,select{padding:10px;margin:15px 8px 15px 0;max-width:100%;background:#242e3b;color:inherit;border:1px solid #506074;border-radius:6px}.wrap{overflow:auto}table{border-collapse:separate;border-spacing:0;width:100%}td,th{padding:10px;border-bottom:1px solid #39475a;min-width:100px;vertical-align:top;overflow-wrap:anywhere}th{background:#253142;position:sticky;top:0;text-align:left;white-space:normal}td{max-width:350px}tr[hidden]{display:none}.shot{display:block;width:260px;border:0;background:transparent;padding:0;cursor:zoom-in}dialog{width:min(94vw,1400px);border:1px solid #506074;background:#20242b;color:white;border-radius:10px}dialog img{max-width:100%;max-height:80vh;display:block;margin:12px auto}dialog::backdrop{background:#000b}.shot img{width:100%;border-radius:6px}.legend{margin:12px 0}.red{color:#ff6161}.blue{color:#65baff}@media print{input,select{display:none}body{background:white;color:black}.wrap{overflow:visible}th{position:static;background:#eee}}</style><h1>${i(t.name)}</h1><small>НашеПО · Проверки коллизий · ${i(t.lastRun || "")} · ${t.status === "stale" ? "Результат устарел" : "Последний завершённый расчёт"}</small><p>${i(t.type === "duplicates" ? "Совпадение треугольной геометрии" : "Пересечения поверхностей и вложенность замкнутых тел")}. Точность: ${i(t.precision)} мм${t.type === "intersection" ? `; минимальная глубина: ${i(t.minPenetration)} мм` : ""}. Глубина — оценка локальной толщины перекрытия, а не длина объекта внутри другого или перемещение для устранения коллизии. «Касание» — контакт без разрешённого объёмного перекрытия, с нулевой глубиной. «Не определена» — у геометрии не удалось определить внутреннюю область. «Требует уточнения» — пересечение найдено, но глубина не разрешена. Знак ≈ обозначает восстановление внутренней области повреждённой оболочки, совмещение швов, сокращённую выборку либо неполное разделение контактов. Погрешность оценки не гарантируется. Строки с неопределённой глубиной и знаком ≈ сохраняются при фильтрации по глубине; обычные числа и касания сравниваются с порогом с запасом на точность.</p><p class="legend"><span class="red">● Элемент А выделен красным</span> · <span class="blue">● элемент Б — синим</span></p><input id="search" type="search" placeholder="Поиск по всему отчёту"><select id="state"><option value="">Все состояния</option>${Object.entries(
    $t
  ).map(([s, a]) => `<option value="${s}">${a}</option>`).join(
    ""
  )}</select>${t.type === "intersection" ? '<input id="depth" type="number" min="0" step="1" placeholder="Глубина от, мм">' : ""}<span id="count"></span><div class="wrap"><table><thead><tr>${["Снимок", "№", "Состояние", "Глубина, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "X", "Y", "Z", "Назначение", "Комментарий"].map((s) => `<th>${s}</th>`).join("")}</tr></thead><tbody>${e.map((s, a) => `<tr data-state="${s.state}" data-depth="${s.penetrationMm ?? 0}"${s.depth && s.kind !== "touch" ? ' data-unmeasured="1"' : ""}><td>${Zt(s.image) ? `<button class="shot" type="button"><img src="${s.image}" alt="Снимок конфликта ${a + 1}" loading="lazy"></button>` : "Снимок отсутствует"}</td>${[a + 1, $t[s.state], Wt(s, t.type), s.a.name, s.a.model, s.a.guid, s.b.name, s.b.model, s.b.guid, ...s.point.map((o) => o.toFixed(4)), s.assignee, s.note].map((o) => `<td>${i(o)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><dialog id="picture"><button id="close-picture">Закрыть</button><img id="full-picture" alt="Снимок конфликта"></dialog><script>const modal=document.getElementById("picture");document.getElementById("close-picture").onclick=()=>modal.close();for(const b of document.querySelectorAll(".shot"))b.onclick=()=>{document.getElementById("full-picture").src=b.querySelector("img").src;modal.showModal()};const PREC=${Number(t.precision) || 0},q=document.getElementById('search'),s=document.getElementById('state'),d=document.getElementById('depth'),rows=[...document.querySelectorAll('tbody tr')];function filter(){let n=0;for(const r of rows){r.hidden=!!((s.value&&r.dataset.state!==s.value)||(d&&!r.dataset.unmeasured&&Number(r.dataset.depth)+PREC<Number(d.value||0))||!r.textContent.toLowerCase().includes(q.value.toLowerCase()));if(!r.hidden)n++}document.getElementById('count').textContent='Коллизий: '+n}q.oninput=s.onchange=filter;if(d)d.oninput=filter;filter()<\/script></html>`;
}
function Ge(t, e) {
  return JSON.stringify(
    {
      version: 1,
      id: t.id,
      name: t.name,
      images: Object.fromEntries(
        e.filter((i) => Zt(i.image)).map((i) => [i.id + ".jpg", i.image])
      ),
      warnings: t.warnings,
      tests: [
        {
          id: t.id,
          name: t.name,
          clashes: e.map((i, s) => ({
            id: i.id,
            name: `Конфликт ${s + 1}`,
            distance: t.type === "duplicates" ? "" : i.depth || i.kind === "touch" ? Wt(i, t.type) : `${Vt(i.penetrationMm)} мм`,
            date: t.lastRun || "",
            description: t.type === "duplicates" ? "Дублирование" : "По пересечению",
            status: $t[i.state],
            group: i.assignee,
            note: i.note,
            point: i.point,
            image: Zt(i.image) ? i.id + ".jpg" : "",
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
            properties: {
              Проверка: t.name,
              Вид: i.kind,
              "Расчётная глубина пересечения, мм": Wt(i, t.type)
            }
          }))
        }
      ]
    },
    null,
    2
  );
}
const Ye = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAydpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAzIDc5Ljk2OTBhODdmYywgMjAyNS8wMy8wNi0yMDo1MDoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDZFQkU2NEQ4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDZFQkU2NEM4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI2LjExIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRENDVBNjQzODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRENDVBNjQ0ODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+pHX+ogAAD+lJREFUeNrsnXtwVPUVx2/CZvMgQEhCSAwJJDzDqwgodCq08hAr7wpSo1M6o/5Rq6NUcdqp1XamdjqOY6mvWhWnttZpRRtbaRGpMMKMZlB8gaFaQoQQSEhIQt7hkfTzhY1ulnt37929mw1T7sxls3vv/f3O7/zO43vO7/wucd3d3calI/zDo3927txpnDx5MqaEpKenpyUlJWUlJCQM6+rqSm1vb/fyGRcfH9+dkpLSGRcX13Lq1Knajo6Omvr6+ia+x4zWtLQ0Y86cOee/SAKLiopiyjwYlz5ixIhyPk8PGDBAKnHB6fF4unU9Ly+vDCanxpLeqVOnnuObznj9kJycHFMGwpRrjh8/Xoh0ec6ePWt6z5kzZwxdr62tLcrPz786lvT68ys+1jYEaTJQx+tRT1v3w0QDabweSe0XNjDmDBwyZEh6U1PTPCfPtLS0LOK5QZcYyDF48OAFjY2N6U6eaWhoyIaBc//vGSg1RIXXSC2dHG1tbYbX610dS08cUwYmJiYa2dnZWRMmTFiO9C0Ipw3UfgnoYfHw4cMzYWZscWAEeChj2LBha8CQm+vq6g6D26xnKj5eWC+dZ67l71VI0dxDhw5lYM/C6vvYsWMZzc3Nm4cOHVo7atSot/Hem6DjzRMnTjQGCw4k9RkZGYWYgGtrampeZCKaIuKgOps+fbrj55AgwYmPkabunJyceqThEaQhT4wKJPiyyy4bx/VHgStVQABTnBfpCdjuhp7D9PMw9BQGemnRBc0FXP8tdDaKbhj/Hn+Pdjr2WbNmfYkDw2IgjJgDMdX+A1DEwG8nUEsNYJTUSp98fzIrK6tF16PBuMBT/cCUk/T7Gz5HiI7c3NwxfN8gxgXSweRWcv3KPmOgQG9mZmaz1QAUScDIhvHjx/8Zgmsx9GExAjXrLigo6Ebrw2YkdBwdN26c6GgKNoGYoXoioblRZyAqsoDOWqMlOVJDbKQY10Zf3VJ3feo7Nuvc92hJsqQWJn7DKQNtOxHEfCZw4xVCqRS3PNigQYMEpCv5/BBJfa+zs3MfElyB1D1RWlp6le45fPiwMXv27D2o4p04ikI+p0D4FTiQaXjw3HCdUOCBQxmMxJZgdubhoPa56kRQ2REw8LAbMy3jjRmoxiY9VVhYuABmDRKs6TnGjBlTTNKg1zP6zu83+sMgVHwwTmAhpuIZJKcWxroiibT1OTRluabCqampKajQO5ESBmCWOn6GF7wLdckyi2WZpALOBrPn9TsGv8AMliA52UzIj5iYA+onUloZ778xJ4muMBD1SoGwzyIhiIE3MMCfgNks01AQrLTa1mDt6LruC5JTHEI/D8ppRELvyJEjPxo4cKDXNScyevTomwPVyq668uxmGDg2VNg1ceLEO0JhRF2HiT8M1o76ob8izMO2cNRajoxnV7rqhZFCL7OyzwkhOIcuIMRPmUk70GgCxrvFTrvc18z940O1iekZgH38JbQ7Vd/3oHmA6zAGSbrJrhTidFox8KsCo5IgA93pZJCo6ds8F28nWQFDbka1OxxI34qo4EBmMgGmfBqKCHCiJGS+HQQgdUN175OqOzUNPLfeTjZG9+C8FsPEdhvS9z7SFx81II0UrglmpyCykxn8tl0IhVmYisFvDxP4tsOYqXb7gjkrMStnrNqDcWe5Z4lTIO0onQWQbfAt+lxwyNYRRfzg4MGDW2wmUhOQpGcBsElhAt8kJvNZtWPn/i+++KIE03K31fqPxqXxRS0bIxVmhj62in9xGE9pfcOu6k6aNOnBSMGvnqedB+wmVpVYgM4XrMJBNOxd7GB0VJhI4HtWtgpV2oskpNhcwjRwGt/CVp5yI3JQO7T3TbVr5wCLDiHaOGDlRGDid1yPhQVjWFa8j1jVbFFI4n8Xeck2q0Qqz3tQ78kQOI+k6yLWNOYQUycYLhxqBwncgj3dRV9bSdRuJ0beS6x81izBS98nsdXr8OL/CIyjtVQAU36MOXqttbW1yzUVxjEs1eyYzRoq8XJgSl2xKjnATKR2Cd7ycWZ1H/any40wK1S4qH7UH/0+pv5Fh3+s3UPf2LFj/2nWhnAjaONq1yRQdo2ZvUWzY5LSbyeNvl5runQcx/ciZk+dL2J2Z2PohyEJfbY+cfr0aYOlhTjOSXydBE13oiG12O5Svm9FqnYgnWWiCfru4fpC/u6lCbpGaH0ra887tJgf8ZoI4p6Lei40U01sz9sQlE9m5A6YOB9mToFpHruL5NE+xAzOYfy5FC1ZygSfAf7sxQa+hfS8zue7e/bsmRuo6jD3OmxlJuahLmIVRtRvCfSWwoL8LuDZKpEPN+scq1P04vTOJWo1jkBs60uffTdiFZaU4SCuC5QoPJ9x5MgRgwqqFOMiPDRwLcZxJgsXajxK3Bp+5SOYLgUEfwlrXRj9V6NDMcSrUdG5JoDa6C+1KYYLi/tmBU2Yo4WMfwVOaYj4EdQGqgHdhN6nq2QCyVuB07imoqIiB8N7wUMwtWvmzJmf7Nq1a1qwteCLgXkzZswo271798TAa0ePHs2BiSX4gCqY+CYOpYTvu6hNbOzFcH1ZsmTJdFz/CyQBjuFF7YDXJmZnFHZix8Vk+wJP6H9r8uTJExTDh7oX3KhEaxWQ7vnly5dP7RWJFBcXb3TSMThpr5A/uTmCkPyai5F5ohu4kqcYnr/LnTy7du3ax3slE3ASmU5EH3Uvl+qyenUYULrWt3Z70RyiV3RXV1dX+szXQSfPo85ZvZwIbj3DSQPcXynQqoPsyxuk0H9mNxaN9SE6off+8vLyN3rANzb/iMPxD+vFQBxFooOHJbp1PQU8mkGY+BA29LX+UG4WCpZBZwn0/qrH+Yl+6K5z0g78SurFQJIEHidE0GFbYBBOjfMtGNj/9mcGApw/h85bTcLSNieT788v1+oDCXvqmc1iDHN7f2Se6BJ9otP1AksM6hm7D0j0Ud9ki6zv+xjoO1Sy0Z8O0SO6oG+PxS0pTjYc+fMr3peO73QSBnFkWon8gQMHngcvPR0MvfflITqg53eiywpMczhyovCroxcDYYpTsc6zYpDi5srKynUY69L+wECl6UWPVYZI40CrRjiMpet6MZDA+YRDHDQaMba0uoQ8HaSEbqKepTqWzKP/Y6IDejqDwJoEoEyBQ6mu/ZKBsmm45d8zU6/QYb2dXUtkKwqxKzlG8FWzg2SxYyqFqFopdFSEsI/5jGdkqLZUk0P+sA6k8VeyOF+aA49gCcXepaRzVpMYzeYmbXpZAVPnEThnmG1BIEk5kFT5FMXcweAOkxNTdI3XTQpVHYEETqMwPcFqSxfOp5Y4eDtjKYFxO5iQ4/zWOxsjQypEXn3+eIkE6ktkZoYTbC/C7W/goaGBuI9n5uNItlp5LxHOtaQY5/2SguE70ci5kLzmBdeI88WodYx/G8C7tify8nM81jhQBhem1ezfv/+PMHKnmSfGDi7TaluIiCUxxgxMDCaB0J+EMCwyzLegbSsrK3sJ4N2LeY422ijMQXS3mC2Ys3Aznhm6KtjsMgBvjBnoDSaBmKz5mKlRZhuBEJAtdrBhyEgED/Yvrb4ZF274k/243aoaIU4LD/1YArUUize93Wy1Ea3T/pttrmz1YiG6kgWY7Rbh2zKytWMtJHBAP5FA07UHnODXUM9rLFT7DSTzuCsM9AHQ58xKa/FeiXT2oJkUQrinPzCQifSYSR8e9hcsTXhM6hXlUJ+zsyZsO5mApG0hjf+Z2TVmsRjoM8dEAj3Yz4RYMpD+TRnI0oX2yS03e4Zxfsh4t7u6WxN70MmsPRJYImGcX2CKg9DHkMTEfiiBqpvxBFRTpCJhG8z2GAr3wfCHwcBnXd/uyoz9CWy03+xaVVXVNLK8v/aPjyEkAcZ6YiyBCaLD8CtTwfY9ypq2aY0149sDDt4Ulf3CkkJm817fqt0FL4SAiXejGsV+EpggCQhn4LJRlGC0UjXwAZ9t4e4Hpn+P6OjBpdB3G8y7zWwpFkfJz13rnUif4/3CEJFkhY0Ea1Dx51ixO0bebQcz73Uigb79xN1AiFIkWXt//654GqNOmD56GZO0GkQwG+8YZ3ct2qfCXl858XU8+6QZbPHdq3fUJEatQpWBeKwqVP1PVKQBqblCZWUA1dOh7tfmQhhUxjrzQwxyurygRf9iwnTdR0Bfps2HNnZ8noaWDLLRc4LtMO05abcUtBEXlQpVBnmD3c3SSNIJOlnvA+BmBd1apD4CM5QFmsd9Xoc75b08N1/Pqx2rYgCkuY2NivfzedIO3WoHIVnsOgMlfajmRw4Xrs8VOxp+WxNwNI3sNHqFoszVwIW0SOtr9LzaUXtqV+37lyHTvzY2Ot1o806oOulwtnrd4HSrvl7VxHPa/dh9+eWXf8zmmJtQp5xovSDC53hy6Odm+lMN4Ln+RYcTuu1IoaNtDkhfMrjpAbOUT4istUFx0jnnAlZMIzHhxcNVR6v4Uu3iIGr14jKcRZr6Vf92IwrjqzVfwZ+fI4Vet7wwzim+wwgPh4l5OvNRrefBWeuQjMcJATeRzWl049V78t6oagZ27gaSv3eCAIoinSTalLTEueaF8agFDP6oG0U9vm38hygPfgQH8HUcQqLd/SX+6oqj0j7muXqZBO1VhbOb1DDfl1yB9851dZsD8W4FkrNKdXJIzsBIZlemgOWDfPDZPYDXe4AjBzD+eyBmN5LzKav+lZz1fO9Ags8qq8OZjASnw7g8PrWUcAUqOhNVLVBI5tZLJBEUacX1aEiV60AaBP8OErOGDv5GB143ymz10kfOMXwdg7Ffo8IfGNSFd21BKmU2ZMA82LEkbNMggWjtVXFq1+wcePM2+l/F5H4QtRfv+HY+Lg2281F5VL0nBmhRohmNZSE5/dcRDpbAnPZghfBoVhNwZ6ERxmtP4p0ymxl6Hc+8DMhQH8hcCG7Gtj2Jqs3gvpVI1Sy+/wEC+2zfg+gQw5jAZ5DkK1lUX4lkzdTLKSRlJgmEGuzyYu7bZvTlq5/oeBqz9h9tgYCZzQDZp/htTCA4loPAfk7h+tMY6Dqne4PtnnIi9FNDP0/QT1Fg5YS+Y2sncP1ZvftGu5owSZ/oFVZGX7/6yfiq0jObmb4XIsaGqoURY2F0Nip1K+cWBtMU6Xu0tP1M0Qftbeb8PhqQFSq6EZ1imujWy9PCGbdrDDQiqxLNo8D7Rql9OMyDCfU8vwqpz+3r6tiYM9BfGrBNr4XDQJ570c47GaLNwJi+wVJwhPNls6UCI0SdCuHlpv6wRyXm71DV+ithWKPDdFYN4eEOw7j0ElrFybUsSDliBjBqGwC86RIDjfPbDLAlr9qNh+UwyOy8avXC7pgw0Gwrf18ebNjZijc+EgoK6TrQqZxyvO2xpNe/5O8cxRs3bjT6cme5yVEHJpzBZzbAPAvpSiW3l+j/nxGA75qZ6OMQf4xYvCnGr67/KvK59N9hRHb8T4ABAPaAkPNeKkdCAAAAAElFTkSuQmCC", Ze = ":host{display:block;height:100%;color-scheme:dark;font:13px/1.4 Segoe UI,sans-serif;color:#dbe5f0;container-type:size}*{box-sizing:border-box}[hidden]{display:none!important}main{height:100%;min-height:260px;background:#171d25;display:flex;flex-direction:column;overflow:hidden;-webkit-user-select:none;user-select:none}button,input,select,textarea{font:inherit;color:inherit;border:1px solid #425165;border-radius:6px;background:#253140;padding:7px 9px;min-width:0}button{cursor:pointer;white-space:nowrap}button:hover{background:#354459}button:disabled{opacity:.45;cursor:default}.primary{background:#b99a38;border-color:#d0ae46;color:#111820;font-weight:600}.primary:hover{background:#e0bd51}button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid #f2c94c;outline-offset:1px}input,select,textarea{background:#111a24}input,textarea,td,dd{-webkit-user-select:text;user-select:text}input[type=checkbox]{accent-color:#e6c354;width:16px;height:16px}header{display:flex;gap:7px;align-items:center;padding:8px 12px;border-bottom:1px solid #354459;flex-shrink:0;overflow-x:auto}.brand{display:flex;gap:7px;align-items:center;margin-right:8px}.brand img{width:32px;height:32px;object-fit:contain}.brand b{font-size:17px}.brand small{font-size:10px;color:#a6b5c7}#dirty{margin-left:auto;font-size:11px;color:#cabb81;white-space:nowrap}.notice{background:#1c2735;padding:5px 12px;font-size:12px;min-height:27px;max-height:70px;overflow:auto;color:#a7bbd1}.notice.error{color:#ffaaa1;background:#412725}.workspace{display:grid;grid-template-columns:230px minmax(0,1fr);flex:1;min-height:0}aside{padding:10px;display:flex;flex-direction:column;gap:9px;border-right:1px solid #354459;min-height:0}#checks{overflow:auto;flex:1;min-height:0}.check-item{display:flex;flex-direction:column;gap:5px;width:100%;margin-bottom:5px;text-align:left;white-space:normal}.check-item small{color:#a8b7ca}.check-item.active,.tabs .active{border-color:#c7ab56;background:#403b2c;color:#ffe399}.main{display:flex;flex-direction:column;min-width:0;min-height:0}.test-toolbar{display:flex;gap:7px;padding:8px 12px;align-items:center}.test-toolbar input{flex:1;font-weight:600}.tabs{display:flex;gap:7px;border-bottom:1px solid #354459;padding:0 12px 8px}.tabs button{min-width:105px}#content{flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column}.empty{padding:28px;color:#a4b4c9;text-align:center;margin:auto}h2,h3,p{margin:0 0 10px}h2{font-size:20px}h3{font-size:15px}label{display:flex;flex-direction:column;gap:5px;font-size:12px;color:#b8c6d7}.check{flex-direction:row;align-items:center;gap:6px}small{font-size:11px;color:#a8b7c9}.parameters{display:flex;gap:18px;align-items:end;padding:10px 12px}.parameters input{width:140px}.selection-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0 12px 12px}.selection{border:1px solid #39495e;border-radius:8px;padding:12px;background:#1b2633;min-width:0}.selection h3{display:flex;justify-content:space-between}.selection h3 span{color:#92c4b2;font-size:12px}.selection select[multiple]{width:100%;min-height:70px}.selection-tools{display:flex;gap:5px;flex-wrap:wrap;margin:8px 0}.selection-tools button{font-size:11px;padding:5px 7px}.selection>label{margin-bottom:8px}.condition{display:grid;grid-template-columns:minmax(80px,1fr) 100px minmax(70px,1fr) 29px;gap:5px;margin:6px 0}.condition button{padding:3px}.rules,.report{padding:18px;max-width:850px}.rules>label{margin:14px 0}.rules>p,.report>p{color:#a9b8cb}.report>button{margin:12px 8px 14px 0}.result-tools{display:flex;gap:7px;flex-wrap:wrap;padding:8px 12px}.result-tools input{flex:1;min-width:180px}.result-area{display:grid;grid-template-columns:minmax(0,1fr) 300px;flex:1;min-height:0}.table-area{display:flex;flex-direction:column;min-width:0;min-height:0}.scroll{overflow:auto;flex:1;min-height:0}table{border-collapse:separate;border-spacing:0;width:max-content;min-width:100%}th{position:sticky;top:0;background:#2a3748;z-index:1;text-align:left;max-width:240px;white-space:normal}th,td{padding:8px;border-bottom:1px solid #344154;vertical-align:top}td{max-width:320px;min-width:90px;overflow-wrap:anywhere;-webkit-user-select:text;user-select:text}td:first-child{min-width:36px}tr.active td{background:#453e29;color:#fff0b5}tr:hover td{background:#2c3847}.pager{display:flex;gap:10px;align-items:center;justify-content:center;padding:5px;border-top:1px solid #39495e;font-size:11px}.pager button{padding:2px 8px}.detail{border-left:1px solid #354459;padding:10px;overflow:auto}.detail h3{overflow-wrap:anywhere}.detail>label{margin:10px 0}.detail p{font:11px/1.5 Consolas,monospace}.detail details{border-top:1px solid #354459;padding:8px 0}summary{cursor:pointer}dl{font-size:11px;display:grid;grid-template-columns:1fr 1fr;gap:7px}dt,dd{overflow-wrap:anywhere;margin:0}dt{color:#9baec4}footer{border-top:1px solid #354459;padding:4px 12px;display:flex;justify-content:space-between;color:#91a4bb;font-size:11px}dialog{border:1px solid #53647c;border-radius:12px;background:#202c3a;color:#dbe5f0;width:min(700px,92vw);max-height:85vh;padding:20px;box-shadow:0 15px 60px #000a}dialog::backdrop{background:#000a}dialog p{margin:12px 0}dialog a{color:#f2c94c;margin-right:12px}.dialog-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:16px}@container (max-width:950px){.workspace{grid-template-columns:185px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 240px}.selection-grid{grid-template-columns:1fr}.parameters,.test-toolbar{flex-wrap:wrap}.test-toolbar input{flex-basis:100%}}@container (max-height:400px){header{padding:5px 10px}.test-toolbar{padding:5px 10px}.tabs{padding-bottom:5px}.brand img{width:25px;height:25px}footer{display:none}}:host{font-size:12px}.brand img{background:#e1e7ef;border-radius:5px;padding:3px}.selection-tools button{font-size:12px}label{font-size:13px}.choose-layout{display:grid;grid-template-columns:220px minmax(0,1fr);min-height:0;flex:1;overflow:auto}.choose-layout .parameters{display:flex;flex-direction:column;align-items:stretch;gap:15px;border-right:1px solid #354459;justify-content:flex-start}.choose-layout .parameters input{width:100%}.choose-layout .parameters input[type=checkbox]{width:16px}.choose-layout .selection-grid{padding:10px 12px;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start;min-width:0}.selection select[multiple]{height:180px;resize:vertical}.selection-mode{font-size:12px;color:#b6c4d5}.preset-row{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:9px}.preset-row select{flex:1 1 160px}.preset-row button{padding:5px 7px;font-size:12px}.model-list{height:150px;overflow:auto;border:1px solid #425165;border-radius:6px;background:#111a24;padding:5px;margin-bottom:5px}.model-list label{display:flex;flex-direction:row;align-items:center;gap:7px;padding:4px 5px;color:#dbe5f0;overflow-wrap:anywhere}.model-list label:hover{background:#253140}.model-list .model-all{position:sticky;top:-5px;z-index:1;background:#1f2b39;border-bottom:1px solid #425165;font-weight:600}.legend{display:flex;gap:12px;flex-wrap:wrap;font-family:inherit!important}.part-a{color:#ff6161}.part-b{color:#65baff}.preview{display:block;width:100%;padding:5px;margin:8px 0}.preview img{display:block;width:100%;max-height:180px;object-fit:contain}.image-dialog{width:94vw;max-width:1500px}.image-dialog img{display:block;max-width:100%;max-height:75vh;margin:10px auto}#help-dialog{width:min(1000px,94vw);line-height:1.6}#help-dialog details{padding:12px 0;border-bottom:1px solid #425165}#help-dialog summary{font-size:16px;font-weight:600;color:#f0d27a}#help-dialog li{margin:8px 0}@container (max-width:1100px){.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .selection-grid{grid-template-columns:1fr}.condition{grid-template-columns:minmax(60px,1fr) 100px minmax(60px,1fr) 29px}}@container (max-width:700px){.choose-layout{display:block}.choose-layout .parameters{border-right:0;border-bottom:1px solid #354459}.workspace{grid-template-columns:160px minmax(0,1fr)}}button,input,select,textarea{padding:5px 7px;border-radius:5px}button{min-height:27px}input[type=checkbox]{width:14px;height:14px}.commandbar{position:relative;display:flex;gap:8px;min-height:45px;padding:5px 8px;overflow:visible;background:#131b25}.brand{flex:0 0 auto;margin-right:0;gap:5px}.brand img{width:28px;height:28px}.brand b{font-size:14px}.check-heading{display:grid;grid-template-rows:25px 12px;flex:0 1 230px;min-width:145px}.check-heading input{height:25px;border:0;background:transparent;padding:2px 5px;font-weight:600}.check-heading small{padding:0 5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:9px}.tabs{align-self:stretch;align-items:center;flex:0 0 auto;gap:3px;padding:0;border:0}.tabs button{flex:0 0 auto;min-width:0;padding:5px 9px;background:transparent;border-color:transparent}.tabs .active{background:#3e3828;border-color:#b99a38}.header-actions{display:flex;align-items:center;gap:4px;margin-left:auto}#dirty{margin-left:0;width:0;height:0;overflow:visible;font-size:0}#dirty:not(:empty){width:7px;height:7px;border-radius:50%;background:#e5bd43;box-shadow:0 0 0 2px #e5bd4328}.more-menu{position:relative;z-index:20}.more-menu summary{display:grid;place-items:center;width:29px;height:29px;border:1px solid #425165;border-radius:5px;background:#253140;cursor:pointer;list-style:none;font-size:18px}.more-menu summary::-webkit-details-marker{display:none}.more-popover{position:absolute;right:0;top:calc(100% + 5px);display:grid;width:190px;gap:3px;padding:6px;border:1px solid #506176;border-radius:7px;background:#192431;box-shadow:0 12px 35px #000a}.more-popover button{text-align:left}.notice{min-height:23px;max-height:45px;padding:3px 9px;font-size:10px}.run-progress{display:grid;grid-template-columns:minmax(150px,auto) minmax(120px,1fr) auto;align-items:center;gap:8px;min-height:24px;padding:3px 9px;border-bottom:1px solid #425165;background:#202a20;color:#d9e7d2;font-size:10px}.run-bar{width:100%;height:7px;overflow:hidden;border-radius:2px;background:#101810}.run-bar i{display:block;width:0;height:100%;background:#e3bc43}#run-phase,#run-value{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#run-value{text-align:right;color:#b9c9b3}.workspace{grid-template-columns:190px minmax(0,1fr)}aside{gap:6px;padding:7px;background:#141c26}.aside-title{font-weight:600;font-size:12px}.aside-actions{display:grid;gap:5px}.check-item{gap:2px;margin-bottom:3px;padding:6px 7px}.check-item small{font-size:9px}.main{background:#171d25}#content{overflow:hidden}.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .parameters{gap:9px;padding:8px}.choose-layout .selection-grid{gap:8px;padding:8px}.selection{padding:8px}.selection h3,h3{font-size:13px;margin-bottom:6px}label{gap:3px;font-size:11px}small,.selection-tools button,.preset-row button{font-size:10px}.model-list{height:125px}.model-list label{padding:2px 4px}.selection-tools{gap:4px;margin:5px 0}.selection-tools button,.preset-row button{padding:3px 5px;min-height:23px}.result-tools{display:flex;align-items:center;justify-content:space-between;gap:6px;flex-wrap:nowrap;min-height:38px;padding:5px 7px;border-bottom:1px solid #354459;background:#151f2a}.result-filters,.bulk-tools{display:flex;align-items:center;gap:5px;min-width:0}.result-filters{flex:1}.result-filters input[type=search]{flex:1 1 190px;min-width:120px}#result-depth{flex:0 1 125px;min-width:92px}#result-count,#selection-count{color:#9fb0c4;white-space:nowrap;font-size:10px}.bulk-tools select{max-width:125px}.result-area{grid-template-columns:minmax(0,1fr) 310px}th,td{padding:5px 6px;font-size:11px;line-height:1.25}th{max-width:190px}td{max-width:260px;min-width:76px}.pager{justify-content:flex-end;min-height:29px;padding:3px 7px}.pager #selection-count{margin-right:auto}.detail{display:flex;flex-direction:column;min-width:0;padding:0;overflow:hidden;background:#141e29}.detail-head{display:flex;align-items:center;justify-content:space-between;gap:6px;min-height:47px;padding:7px 8px 4px}.detail-head>div:first-child{min-width:0}.detail-head small{color:#8093aa;letter-spacing:.08em}.detail-head h3{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin:0}.detail-nav{display:flex;gap:3px}.detail-nav button{min-width:27px;padding:2px 7px;font-size:17px}.clash-summary{display:flex;gap:5px;padding:0 8px 5px;color:#adbdcf;font-size:9px}.clash-summary span{padding-right:5px;border-right:1px solid #405064}.clash-summary span:last-child{border:0}.detail .legend{margin:0;padding:0 8px 5px;font-size:10px}.preview-slot{height:clamp(92px,18cqh,145px);flex:0 0 auto;margin:0 7px 6px;overflow:hidden;border:1px solid #37475b;border-radius:6px;background:#0e151d}.preview{position:relative;width:100%;height:100%;margin:0;padding:0;border:0;background:transparent}.preview img{width:100%;height:100%;max-height:none;object-fit:contain}.preview span{position:absolute;right:5px;bottom:5px;padding:3px 6px;border-radius:4px;background:#101923db;font-size:9px}.preview-empty,.detail-empty{height:100%;display:grid;place-content:center;justify-items:center;gap:4px;color:#788ba1}.preview-empty>span,.detail-empty>span{font-size:24px}.detail-actions{display:grid;grid-template-columns:1fr 1fr;gap:5px;padding:0 7px 7px}.detail-scroll{flex:1;min-height:0;overflow:auto;padding:7px 8px 12px;border-top:1px solid #354459}.detail-scroll>label{margin:7px 0}.detail p{font:inherit}.coordinates{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;font:9px/1.3 Consolas,monospace;color:#91a3b7}.coordinates span{overflow:hidden;text-overflow:ellipsis}.detail details{padding:6px 0}.detail dl{font-size:10px}.detail-empty{padding:20px;text-align:center}footer{padding:2px 8px;font-size:9px}@container (max-width:1050px){.workspace{grid-template-columns:165px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 270px}.check-heading{flex-basis:185px}.tabs button{padding-inline:6px}#dirty{display:none}}@container (max-width:820px){.brand b,.brand small,#result-count{display:none}.check-heading{flex-basis:155px}.result-tools{overflow-x:auto}.result-area{grid-template-columns:minmax(0,1fr) 245px}}@container (max-height:410px){.notice,footer{display:none}.preview-slot{height:90px}}", Lt = /* @__PURE__ */ new WeakMap(), ve = "nashepo.collisionfinder360.project.", Ht = () => ({
  format: "nashepo.checks",
  version: 1,
  checks: [],
  sets: []
}), pe = (t) => {
  if (!(!t || typeof sessionStorage > "u"))
    try {
      const e = sessionStorage.getItem(ve + t);
      return e ? be(e) : void 0;
    } catch {
      return;
    }
}, ue = (t, e) => {
  if (!(!t || typeof sessionStorage > "u"))
    try {
      sessionStorage.setItem(
        ve + t,
        JSON.stringify(e, (i, s) => i === "image" ? void 0 : s)
      );
    } catch {
    }
};
function Qe(t, e) {
  const i = t.shadowRoot || t.attachShadow({ mode: "open" }), s = Se(t);
  let a = e.projectToken(), o = e.projectId(), n = a && (Lt.get(a) || pe(o)) || Ht();
  a && Lt.set(a, n);
  let l, u = n.checks[0]?.id || "", m = "select", p = "", b = 0, M = !1, k = !1, A, O = !0, D = !1;
  const L = /* @__PURE__ */ new Set();
  let at, Z, T = 0;
  const Y = () => n.checks.find((r) => r.id === u), x = (r) => i.querySelector("#" + r);
  i.innerHTML = `<style>${Ze}</style><main><header class="commandbar"><div class="brand"><img src="${Ye}" alt=""><b>НашеПО</b><small>${Ie}</small></div><div class="check-heading"><input id="name" aria-label="Имя проверки" placeholder="Выберите проверку"><small id="check-summary">Проверка не выбрана</small></div><div id="tabs" class="tabs">${[
    ["select", "Выбор"],
    ["results", "Результаты"],
    ["rules", "Правила"],
    ["report", "Отчёт"]
  ].map(([r, c]) => `<button data-tab="${r}">${c}</button>`).join(
    ""
  )}</div><div class="header-actions"><button id="scan" title="Перечитать список и геометрию выбранных моделей">↻ Модели</button><button id="run" class="primary">▶ Запустить</button><button id="cancel" hidden>Остановить</button><details class="more-menu"><summary title="Другие команды">⋮</summary><div class="more-popover"><button id="open">Открыть проверки</button><button id="save">Сохранить проверки</button><button id="copy">Копировать проверку</button><button id="delete">Удалить проверку</button><button id="settings">Настройки</button><button id="help">Справка</button></div></details></div><span id="dirty"></span></header><div id="run-progress" class="run-progress" hidden><span id="run-phase">Подготовка</span><div id="run-bar" class="run-bar" role="progressbar"><i id="run-fill"></i></div><span id="run-value"></span></div><div class="notice" id="notice" role="status">Откройте IFC/SMDX в проекте и нажмите «Модели».</div><div class="workspace"><aside><div class="aside-title">Проверки</div><input id="test-search" type="search" placeholder="Поиск проверок"><div id="checks"></div><div class="aside-actions"><button id="all">Запустить все</button><button id="new" class="primary">＋ Новая проверка</button></div></aside><section class="main"><div id="content"></div></section></div><footer><span id="model-count">Модели не прочитаны</span><span>Расчёт выполняется на вашем компьютере</span></footer><input id="file" type="file" accept=".json" hidden><dialog id="settings-dialog"><h2>Настройки</h2><label>Дистанция камеры, м<input id="distance" type="number" value="15" min="0.5"></label><p class="links"><a href="https://nashepo.ru/" target="_blank" rel="noopener noreferrer">Сайт НашеПО</a><a href="https://t.me/RoburFan" target="_blank" rel="noopener noreferrer">Telegram</a></p><button data-close="settings-dialog">Закрыть</button></dialog><dialog id="help-dialog">${ke}<button data-close="help-dialog">Закрыть</button></dialog><dialog id="set-dialog"><h2>Сохранить набор моделей</h2><label>Название<input id="set-name" maxlength="120"></label><div class="dialog-actions"><button id="set-cancel">Отмена</button><button id="set-confirm" class="primary">Сохранить</button></div></dialog></main>`;
  const lt = document.createElement("button");
  lt.id = "clear-project", lt.textContent = "Очистить проект", x("save").after(lt), i.querySelector(".more-popover").addEventListener(
    "click",
    () => i.querySelector(".more-menu").removeAttribute("open")
  );
  const C = (r, c = !1) => {
    x("notice").textContent = r, x("notice").classList.toggle("error", c);
  }, q = (r, c, h, f) => {
    const y = x("run-progress"), E = x("run-bar"), v = x("run-fill");
    if (y.hidden = !1, x("notice").hidden = !0, x("run-phase").textContent = r, h && h > 0 && c !== void 0) {
      const I = Math.max(0, Math.min(100, c / h * 100));
      v.style.width = `${I}%`, E.setAttribute("aria-valuemin", "0"), E.setAttribute("aria-valuemax", "100"), E.setAttribute("aria-valuenow", String(Math.round(I))), x("run-value").textContent = `${Math.round(I)}% · ${c}/${h}` + (f === void 0 ? "" : ` · найдено ${f}`);
    } else
      v.style.width = "0", E.removeAttribute("aria-valuenow"), x("run-value").textContent = f === void 0 ? "" : `Найдено ${f}`;
    E.setAttribute("aria-valuetext", x("run-value").textContent || r);
  }, d = () => {
    x("run-progress").hidden = !0, x("notice").hidden = !1;
  }, g = async (r) => {
    try {
      await r();
    } catch (c) {
      C(c instanceof Error ? c.message : String(c), !0);
    }
  }, S = () => new Promise((r) => {
    const c = x("set-dialog"), h = x("set-name");
    let f = !1;
    const y = (E) => {
      f || (f = !0, c.close(), r(E));
    };
    h.value = "Новый набор", x("set-confirm").onclick = () => {
      const E = h.value.trim();
      E ? y(E) : h.focus();
    }, x("set-cancel").onclick = () => y(), c.oncancel = (E) => {
      E.preventDefault(), y();
    }, c.showModal(), h.focus(), h.select();
  }), w = () => {
    D = !0, x("dirty").textContent = "Есть несохранённые изменения", a && Lt.set(a, n), ue(o, n);
  }, z = () => {
    const r = e.projectToken();
    return !r || r === a ? !1 : (!a && (n.checks.length || n.sets.length) ? Lt.set(r, n) : n = Lt.get(r) || pe(e.projectId()) || Ht(), Lt.set(r, n), a = r, o = e.projectId(), l = void 0, u = n.checks[0]?.id || "", p = "", L.clear(), b = 0, D = !1, e.clear(), x("dirty").textContent = "", !0);
  }, j = () => {
    const r = Y();
    r?.lastRun && (r.status = "stale"), w(), B();
  }, R = () => [
    ...new Set(
      (l?.elements || []).flatMap((r) => Object.keys(r.properties))
    )
  ].sort(), $ = (r, c) => r.map(
    (h) => `<option value="${dt(h)}" ${h === c ? "selected" : ""}>${dt(h)}</option>`
  ).join("");
  function N() {
    const r = Y(), c = x("result-search")?.value.toLowerCase() || "", h = x("result-state")?.value || "", f = Number(x("result-depth")?.value || 0);
    return (r?.results || []).filter(
      (y) => (!h || y.state === h) && (r?.type === "duplicates" || // A depth that is not a plain measurement is left to a person, so no
      // threshold hides it. Otherwise the same allowance as the calculation
      // itself, so one number typed in three places selects the same rows.
      y.depth !== void 0 && y.kind !== "touch" || (y.penetrationMm ?? 0) + (r?.precision ?? 0) >= f) && (!c || JSON.stringify({ ...y, image: void 0 }).toLowerCase().includes(c))
    );
  }
  function B() {
    const r = x("test-search").value.toLowerCase();
    x("checks").innerHTML = n.checks.filter((c) => c.name.toLowerCase().includes(r)).map(
      (c) => `<button class="check-item ${c.id === u ? "active" : ""}" data-check="${c.id}"><strong>${dt(c.name)}</strong><small>${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[c.status]} · ${c.results.filter((h) => !["resolved", "excluded"].includes(h.state)).length} в работе / ${c.results.length}</small></button>`
    ).join("");
  }
  function W(r, c) {
    const h = l?.elements.filter(
      (P) => (Y().includeHidden || !P.hidden) && Ft(P, r)
    ).length || 0, f = r.manualOnly ? vt(r) : r.modelsMode === "selected" ? r.models : (l?.models || []).map((P) => P.id), y = l && f.every((P) => l.indexedModelIds.includes(P)) ? `${h} элементов` : "число после запуска", E = l?.models || [], v = r.modelsMode !== "selected", I = n.sets.map(
      (P) => `<option value="${dt(P.id)}" ${r.presetId === P.id ? "selected" : ""}>${dt(P.name)}</option>`
    ).join("");
    return `<article class="selection" data-side="${c}"><h3>Выбор ${c.toUpperCase()} <span data-selection-count>${y}</span></h3>${r.manualOnly ? '<p class="selection-mode">Только элементы, выбранные вручную</p>' : ""}<div class="preset-row"><select class="preset"><option value="">Набор моделей…</option>${I}</select><button data-selection="load-set">Применить</button><button data-selection="save-set">Сохранить набор</button><button data-selection="delete-set" ${r.presetId ? "" : "disabled"}>Удалить</button></div><div class="model-list"><label class="model-all"><input type="checkbox" class="all-models" ${v ? "checked" : ""}> Все модели</label>${E.map((P) => `<label><input type="checkbox" class="model-check" value="${dt(P.id)}" ${v || r.models.includes(P.id) ? "checked" : ""}> ${dt(P.name)}</label>`).join("") || "<small>Нажмите «Модели».</small>"}</div><small>Отметьте файлы, которые должны участвовать в выборе ${c.toUpperCase()}.</small><div class="selection-tools"><button data-selection="show">Показать выбранные элементы</button><button data-selection="only">Только выделенные в 3D</button><button data-selection="include">＋ Добавить из 3D</button><button data-selection="exclude">− Исключить из 3D</button><button data-selection="reset">Сбросить ручной выбор</button></div><small>Добавлено вручную: ${r.include.length} · исключено: ${r.exclude.length}</small></article>`;
  }
  function J() {
    B();
    const r = Y();
    x("name").value = r?.name || "", x("check-summary").textContent = r ? `${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[r.status]} · ${r.results.filter((c) => !["resolved", "excluded"].includes(c.state)).length} в работе / ${r.results.length}` : "Проверка не выбрана";
    for (const c of ["name", "copy", "delete", "run"])
      x(c).disabled = !r || M;
    for (const c of i.querySelectorAll("[data-tab]"))
      c.classList.toggle("active", c.dataset.tab === m);
    if (!r) {
      x("content").innerHTML = '<div class="empty"><h2>Создайте первую проверку</h2><p>Обновите модели, затем выберите, какие элементы проверять друг с другом.</p></div>';
      return;
    }
    m === "select" && (x("content").innerHTML = `<div class="choose-layout"><div class="parameters"><h3>Параметры проверки</h3><label>Тип<select id="type"><option value="intersection" ${r.type === "intersection" ? "selected" : ""}>По пересечению</option><option value="duplicates" ${r.type === "duplicates" ? "selected" : ""}>Дублирование</option></select></label><label title="Запас при отборе и фильтрации; не обнуляет малые вхождения и не гарантирует погрешность оценки">Точность расчёта, мм<input id="precision" type="number" value="${r.precision}" min="0.001" max="100" step="0.1"></label><label title="Конфликты с меньшей оценкой глубины не попадут в результат">Минимальная глубина, мм<input id="min-penetration" type="number" value="${r.minPenetration}" min="0" max="100000" step="1" ${r.type === "duplicates" ? "disabled" : ""}></label><label class="check"><input id="touching" type="checkbox" ${r.touching ? "checked" : ""} ${r.type === "duplicates" ? "disabled" : ""}>Учитывать касания</label><small>Глубина — оценка локальной толщины перекрытия. Пояснения к расчёту и его ограничениям — в справке.</small><p class="legend"><span class="part-a">● Выбор А</span><span class="part-b">● Выбор Б</span></p></div><div class="selection-grid">${W(r.a, "a")}${W(r.b, "b")}</div></div><datalist id="property-fields">${$(R(), "")}</datalist>`), m === "rules" && (x("content").innerHTML = `<div class="rules"><h3>Исключение пар</h3><p>Элемент сам с собой не проверяется. Пара А/Б учитывается один раз.</p><label class="check"><input id="same-model" type="checkbox" ${r.ignoreSameModel ? "checked" : ""}>Не проверять элементы одной модели</label><label class="check"><input id="same-group" type="checkbox" ${r.ignoreSameGroup ? "checked" : ""}>Не проверять геометрию одного составного объекта</label><label>Не проверять пары с одинаковым значением свойства<input id="equal-property" list="property-fields" value="${dt(r.equalProperty)}" placeholder="Без ограничения"></label><label class="check"><input id="hidden" type="checkbox" ${r.includeHidden ? "checked" : ""}>Включать скрытые элементы прочитанных моделей</label><p>Незагруженные подключённые файлы нужно открыть перед расчётом.</p><datalist id="property-fields">${$(R(), "")}</datalist></div>`), m === "results" && (x("content").innerHTML = `<div class="result-tools"><div class="result-filters"><input id="result-search" type="search" placeholder="Поиск по результатам"><select id="result-state"><option value="">Все состояния</option>${Object.entries(
      $t
    ).map(([c, h]) => `<option value="${c}">${h}</option>`).join("")}</select>${r.type === "intersection" ? '<input id="result-depth" type="number" min="0" step="1" placeholder="Глубина от, мм">' : ""}<button id="show-markers" role="switch" aria-checked="${O}">${O ? "● Знаки" : "○ Знаки"}</button><span id="result-count"></span></div><div class="bulk-tools"><select id="bulk-state" title="Состояние для выбранных строк">${Object.entries(
      $t
    ).map(([c, h]) => `<option value="${c}">${h}</option>`).join("")}</select><button id="bulk">Применить</button></div></div><div class="result-area"><div class="table-area"><div class="scroll" id="table"></div><div class="pager"><span id="selection-count"></span><button id="prev-page">←</button><span id="page"></span><button id="next-page">→</button></div></div><div class="detail" id="detail"></div></div>`, X(), tt()), m === "report" && (x("content").innerHTML = `<div class="report"><h3>${dt(r.name)}</h3><p>Результатов: ${r.results.length}. Выбрано: ${L.size}. ${r.status === "stale" ? "Результаты устарели — рекомендуется повторный запуск." : ""}</p><label class="check"><input id="selected-only" type="checkbox" ${L.size ? "checked" : ""}>Только выбранные строки</label><label class="check"><input id="report-images" type="checkbox" checked>Добавить снимки (недостающие будут созданы автоматически)</label><button id="export-html" class="primary">Сформировать HTML-отчёт</button><button id="export-viewer">Сессия для плагина «Коллизии»</button><p>Правила и все результаты сохраняются кнопкой «Сохранить проверки» в верхней панели.</p></div>`), x("content").inert = M;
  }
  const ht = (r) => r.kind === "touch" ? "Тела соприкасаются, общего объёма нет" : r.depth === "unmeasurable" ? "У элемента нет собственного объёма, замер глубины к нему неприменим" : r.depth === "tolerance" ? "Пересечение найдено, но его глубина не разрешена при текущем расчёте" : r.depth === "approximate" ? "Восстановлена внутренняя область оболочки, совмещены швы либо сокращён расчёт; точность числа не гарантируется" : "Оценка локальной толщины перекрытия двух элементов";
  function X() {
    const r = Y(), c = N(), h = Math.max(1, Math.ceil(c.length / 50));
    b = Math.max(0, Math.min(b, h - 1));
    const f = c.slice(b * 50, b * 50 + 50);
    x("table").innerHTML = c.length ? `<table><thead><tr><th><input id="check-page" type="checkbox" aria-label="Выбрать страницу" ${f.every((y) => L.has(y.id)) ? "checked" : ""}></th>${["№", "Состояние", "Глубина, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "Комментарий"].map((y) => `<th>${y}</th>`).join("")}</tr></thead><tbody>${f.map((y, E) => `<tr data-result="${dt(y.id)}" class="${y.id === p ? "active" : ""}"><td><input type="checkbox" class="row-check" aria-label="Выбрать конфликт" ${L.has(y.id) ? "checked" : ""}></td>${[b * 50 + E + 1, $t[y.state], Wt(y, r.type), y.a.name, y.a.model, y.a.guid || "—", y.b.name, y.b.model, y.b.guid || "—", y.note].map((v) => `<td title="${dt(v)}">${dt(v)}</td>`).join("")}</tr>`).join("")}</tbody></table>` : '<div class="empty">Нет результатов. Запустите проверку или измените фильтры.</div>', x("page").textContent = `${b + 1} / ${h}`, x("result-count").textContent = `${c.length} результатов`, x("selection-count").textContent = `Выбрано: ${L.size}`, x("prev-page").disabled = b === 0, x("next-page").disabled = b === h - 1;
  }
  function tt() {
    const r = Y(), c = N(), h = c.findIndex((y) => y.id === p), f = r?.results.find((y) => y.id === p);
    x("detail").innerHTML = f ? `<div class="detail-head"><div><small>КОЛЛИЗИЯ</small><h3>#${h + 1} ${dt(f.a.name)} × ${dt(f.b.name)}</h3></div><div class="detail-nav"><button id="previous" title="Предыдущая коллизия" ${h <= 0 ? "disabled" : ""}>‹</button><button id="next" title="Следующая коллизия" ${h < 0 || h >= c.length - 1 ? "disabled" : ""}>›</button></div></div><div class="clash-summary"><span>${r?.type === "duplicates" ? "Дублирование" : "Пересечение"}</span><span title="${dt(ht(f))}">${r?.type === "duplicates" ? "Совпадение геометрии" : f.kind === "touch" ? "Касание" : f.depth ? we[f.depth] : `Глубина ${Vt(f.penetrationMm)} мм`}</span><span>${dt($t[f.state])}</span></div><p class="legend"><span class="part-a">● Элемент А</span><span class="part-b">● Элемент Б</span></p><div class="preview-slot">${f.image ? `<button id="open-image" class="preview"><img src="${dt(f.image)}" alt="Снимок коллизии"><span>Открыть крупнее</span></button>` : '<div class="preview-empty"><span>◫</span><small>Снимок создастся после перехода в 3D</small></div>'}</div><div class="detail-actions"><button id="focus" class="primary">Перейти в 3D</button><button id="capture-image">▣ Снимок пары</button></div><div class="detail-scroll"><div class="coordinates">${f.point.map((y, E) => `<span>${["X", "Y", "Z"][E]} ${y.toFixed(3)}</span>`).join("")}</div><label>Состояние<select id="edit-state">${Object.entries(
      $t
    ).map(
      ([y, E]) => `<option value="${y}" ${f.state === y ? "selected" : ""}>${E}</option>`
    ).join(
      ""
    )}</select></label><label>Назначение<input id="assignee" value="${dt(f.assignee)}"></label><label>Комментарий<textarea id="note" rows="2">${dt(f.note)}</textarea></label>${[
      f.a,
      f.b
    ].map(
      (y, E) => `<details><summary>Элемент ${E ? "Б" : "А"} · свойства</summary><dl>${Object.entries(
        y.properties
      ).map(([v, I]) => `<dt>${dt(v)}</dt><dd>${dt(I)}</dd>`).join("")}</dl></details>`
    ).join("")}</div>` : '<div class="detail-empty"><span>◫</span><p>Выберите коллизию в таблице</p><small>Двойной щелчок сразу перенесёт камеру в 3D.</small></div>';
  }
  const vt = (r) => {
    const c = new Set(
      !r.manualOnly && r.modelsMode === "selected" ? r.models : []
    );
    for (const h of r.include)
      try {
        c.add(String(JSON.parse(h)[0]));
      } catch {
        const f = l?.elements.find(
          (y) => y.id === h
        )?.modelId;
        f && c.add(f);
      }
    return [...c];
  }, ot = () => {
    const r = Y();
    if (!(!r || m !== "select"))
      for (const c of i.querySelectorAll("[data-side]")) {
        const h = c.dataset.side, f = [...c.querySelectorAll(".model-check")];
        if (!f.length) continue;
        const y = f.filter((I) => I.checked).map((I) => I.value), E = y.length === f.length, v = r[h];
        v.modelsMode = E ? "all" : "selected", v.models = E ? [] : y, v.conditions = [], v.mode = "all";
      }
  }, st = (r) => {
    if (!r?.length) return;
    const c = /* @__PURE__ */ new Set();
    for (const h of r)
      for (const f of [h.a, h.b]) {
        if (!f.manualOnly && f.modelsMode !== "selected") return;
        for (const y of vt(f)) c.add(y);
      }
    return c;
  }, Mt = (r) => {
    let c = r.trim().replace(/\\/g, "/").toLocaleLowerCase();
    try {
      c = decodeURIComponent(c);
    } catch {
    }
    c = c.replace(/[?#].*$/, "");
    const h = c.split("/").filter(Boolean).at(-1) || c;
    return /* @__PURE__ */ new Set([c, h]);
  }, jt = (r) => {
    const c = new Set(r.map((I) => I.id)), h = r.map((I) => ({
      id: I.id,
      aliases: /* @__PURE__ */ new Set([
        ...Mt(I.id),
        ...Mt(I.name)
      ])
    })), f = (I) => {
      if (c.has(I)) return I;
      const P = Mt(I), U = h.filter(
        (V) => [...P].some((ct) => V.aliases.has(ct))
      );
      return U.length === 1 ? U[0].id : I;
    }, y = (I) => {
      try {
        const P = JSON.parse(I);
        if (!Array.isArray(P) || P.length < 2) return I;
        const U = String(P[0]), V = f(U);
        return V === U ? I : JSON.stringify([V, ...P.slice(1)]);
      } catch {
        return I;
      }
    };
    let E = !1;
    const v = (I) => {
      const P = I.models.map(f), U = I.include.map(y), V = I.exclude.map(y);
      (P.some((ct, pt) => ct !== I.models[pt]) || U.some((ct, pt) => ct !== I.include[pt]) || V.some((ct, pt) => ct !== I.exclude[pt])) && (I.models = [...new Set(P)], I.include = [...new Set(U)], I.exclude = [...new Set(V)], E = !0);
    };
    for (const I of n.checks)
      v(I.a), v(I.b), I.modelsAtRun && (I.modelsAtRun = I.modelsAtRun.map(f));
    for (const I of n.sets) {
      const P = I.selection.models.map(f);
      P.some((U, V) => U !== I.selection.models[V]) && (I.selection.models = [...new Set(P)], E = !0);
    }
    return E && w(), E;
  }, et = () => {
    const r = Y();
    if (r)
      for (const c of i.querySelectorAll("[data-side]")) {
        const h = c.dataset.side, f = l?.elements.filter(
          (I) => (r.includeHidden || !I.hidden) && Ft(I, r[h])
        ).length || 0, y = r[h].manualOnly ? vt(r[h]) : r[h].modelsMode === "selected" ? r[h].models : (l?.models || []).map((I) => I.id), E = !!l && y.every((I) => l.indexedModelIds.includes(I)), v = c.querySelector(
          "[data-selection-count]"
        );
        v && (v.textContent = E ? `${f} элементов` : "число после запуска");
      }
  };
  function ut() {
    e.markers(
      N(),
      p,
      O,
      (r) => g(() => nt(r, !0))
    );
  }
  function nt(r, c = !1) {
    if (!M) {
      if (p = r, m === "results") {
        const h = N().findIndex((y) => y.id === r), f = h < 0 ? b : Math.floor(h / 50);
        f !== b && (b = f, X());
        for (const y of i.querySelectorAll("[data-result]"))
          y.classList.toggle("active", y.dataset.result === r);
        tt(), requestAnimationFrame(() => {
          [...i.querySelectorAll("[data-result]")].find(
            (E) => E.dataset.result === r
          )?.scrollIntoView({ block: "nearest", inline: "nearest" });
        });
      }
      if (ut(), c) {
        const h = Y()?.results.find((f) => f.id === r);
        h && (e.focus(h, Number(x("distance").value)), Nt(h));
      }
    }
  }
  function Nt(r) {
    clearTimeout(Z);
    const c = ++T, h = Number(x("distance").value);
    r.image && r.imageScope === "pair-ab" && r.imageDistance === h || !e.canLocate(r) || (Z = window.setTimeout(async () => {
      if (!(c !== T || M || p !== r.id))
        try {
          const f = await e.snapshot(
            r,
            h,
            () => c !== T || M || p !== r.id,
            !1,
            !1
          );
          if (c !== T || p !== r.id) return;
          r.image = f, r.imageScope = "pair-ab", r.imageDistance = h, w(), m === "results" && tt();
        } catch (f) {
          c === T && p === r.id && C(
            "Не удалось создать снимок выбранной коллизии: " + (f instanceof Error ? f.message : String(f)),
            !0
          );
        }
    }, 500));
  }
  async function qt(r) {
    k = !1, G(!0), q("Создание снимка пары");
    try {
      const c = Number(x("distance").value);
      r.image = await e.snapshot(r, c, () => k), r.imageScope = "pair-ab", r.imageDistance = c, w(), m === "results" && p === r.id && tt();
    } catch (c) {
      C(
        "Результаты сохранены. Снимок пары не создан: " + (c instanceof Error ? c.message : String(c)),
        !0
      );
    } finally {
      d(), G(!1);
    }
  }
  async function Q(r, c = !1) {
    z(), q("Подготовка моделей");
    let h = c ? /* @__PURE__ */ new Set() : st(r);
    if (!c && h?.size) {
      const f = await e.scan(
        (y) => q(y),
        () => k,
        /* @__PURE__ */ new Set()
      );
      l = f, jt(f.models) && (h = st(r));
    }
    l = await e.scan(
      (f) => {
        C(f), q(f);
      },
      () => k,
      h
    ), x("model-count").textContent = `Проиндексировано моделей: ${l.indexedModelIds.length} из ${l.models.length} · элементов: ${l.elements.length}`, J(), C(
      l.blockers.length ? l.blockers.join(" ") : l.warnings.length ? `Модели прочитаны с замечаниями. ${l.warnings.join(" ")}` : "Модели прочитаны. Настройте выборки и запустите проверку.",
      !!l.blockers.length
    );
  }
  const G = (r) => {
    M = r, r && (clearTimeout(Z), T++);
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
      x(c).disabled = r;
    x("cancel").hidden = !r, x("content").inert = r, x("checks").inert = r;
  };
  async function K(r) {
    const c = (f) => {
      const y = `${r.name} · ${f.phase}`;
      C(`${y} ${f.done}/${f.total} · найдено ${f.found}`), q(y, f.done, f.total, f.found);
    };
    let h;
    try {
      h = new Ue();
    } catch {
      return Re(
        l.elements,
        r,
        c,
        () => k,
        (f) => e.geometry(f, () => k)
      );
    }
    return A = h, new Promise((f, y) => {
      const E = () => {
        h.terminate(), A = void 0, at = void 0;
      };
      at = () => {
        E(), y(Error("Расчёт отменён. Предыдущие результаты сохранены."));
      }, h.onmessage = async (v) => {
        if (v.data.load) {
          try {
            const I = await e.geometry(
              v.data.load,
              () => k || A !== h
            );
            if (A !== h) return;
            const P = [
              I.vertices?.buffer,
              I.indices?.buffer
            ].filter(Boolean);
            h.postMessage(
              { request: v.data.request, geometry: I },
              P
            );
          } catch (I) {
            A === h && h.postMessage({
              request: v.data.request,
              error: I instanceof Error ? I.message : String(I)
            });
          }
          return;
        }
        v.data.progress ? c(v.data.progress) : (E(), v.data.error ? y(Error(v.data.error)) : f(v.data.results));
      }, h.onerror = (v) => {
        E(), y(
          Error(
            `Не удалось запустить расчёт в фоновом потоке: ${v.message || "ошибка загрузки"}`
          )
        );
      }, h.postMessage({
        elements: l.elements,
        streaming: typeof e.geometry == "function",
        check: structuredClone({ ...r, results: [], warnings: [] })
      });
    });
  }
  async function ft(r = !1) {
    if (M) return;
    z(), ot();
    const c = r ? [...n.checks] : [Y()].filter(Boolean);
    if (!c.length) throw Error("Создайте проверку.");
    for (const h of c)
      for (const f of [h.a, h.b])
        f.conditions = [], f.mode = "all";
    k = !1, G(!0), q("Подготовка моделей");
    try {
      if (await Q(c), G(!0), l.blockers.length)
        throw Error(
          "Состав моделей прочитан не полностью. " + l.blockers.join(" ")
        );
      for (const f of c) {
        if (k) break;
        for (const I of [f.a, f.b]) {
          if (I.modelsMode === "selected" && I.models.some((P) => !l.models.some((U) => U.id === P)))
            throw Error(
              `${f.name}: одна из моделей выборки отсутствует. Исправьте выборку.`
            );
          if (I.include.some((P) => !l.elements.some((U) => U.id === P)))
            throw Error(
              `${f.name}: вручную добавленный элемент отсутствует в модели.`
            );
        }
        const y = Ee(f);
        if (f.configAtRun === y && f.modelsAtRun?.some(
          (I) => !l.models.some((P) => P.id === I)
        ))
          throw Error(
            `${f.name}: состав моделей уменьшился. Подключите прежние модели или создайте копию проверки для нового состава. Прежние результаты сохранены.`
          );
        const E = await K(f);
        if (k || !e.isCurrent())
          throw Error(
            "Проект изменился или расчёт отменён. Предыдущие результаты сохранены."
          );
        const v = (/* @__PURE__ */ new Date()).toISOString();
        f.results = ze(
          f.configAtRun === y ? f.results : [],
          E,
          v
        ), f.lastRun = v, f.fingerprint = l.fingerprint, f.configAtRun = y, f.modelsAtRun = [...l.indexedModelIds], f.status = "done", f.warnings = [...l.warnings], u = f.id, p = f.results[0]?.id || "", L.clear(), w();
      }
      m = "results", J(), ut(), C(
        `Проверка завершена. ${Y()?.results.length || 0} результатов. Сохраните проверки для продолжения работы.`
      );
      const h = Y()?.results.find((f) => f.id === p);
      h && !k && await qt(h);
    } finally {
      d(), G(!1), J();
    }
  }
  function gt(r) {
    const c = r.closest("[data-side]")?.dataset.side;
    if (!c) return;
    const h = Y()[c], f = r, y = r.closest("[data-side]");
    if (f.classList.contains("preset")) {
      h.presetId = f.value || void 0, y.querySelector(
        '[data-selection="delete-set"]'
      ).disabled = !h.presetId;
      return;
    }
    if (f.classList.contains("all-models")) {
      for (const E of y.querySelectorAll(
        ".model-check"
      ))
        E.checked = f.checked;
      h.modelsMode = f.checked ? "all" : "selected", h.models = [], h.manualOnly = !1, h.presetId = void 0;
    }
    if (f.classList.contains("model-check")) {
      const E = [
        ...y.querySelectorAll(".model-check")
      ], v = E.filter((P) => P.checked).map((P) => P.value), I = E.length > 0 && v.length === E.length;
      y.querySelector(".all-models").checked = I, h.modelsMode = I ? "all" : "selected", h.models = I ? [] : v, h.manualOnly = !1, h.presetId = void 0;
    }
    h.conditions = [], h.mode = "all", j(), et();
  }
  x("new").onclick = () => {
    const r = je();
    r.name = `Проверка ${n.checks.length + 1}`, n.checks.push(r), u = r.id, m = "select", p = "", L.clear(), w(), J();
  }, x("scan").onclick = () => g(async () => {
    ot(), k = !1, G(!0), q("Чтение моделей");
    try {
      const r = Y();
      await Q(r ? [r] : void 0, !r);
    } finally {
      d(), G(!1), J();
    }
  }), x("run").onclick = () => g(() => ft()), x("all").onclick = () => g(() => ft(!0)), x("cancel").onclick = () => {
    k = !0, at?.();
  }, x("test-search").oninput = B, x("checks").onclick = (r) => {
    const c = r.target.closest(
      "[data-check]"
    );
    c && !M && (e.clear(), u = c.dataset.check, p = "", L.clear(), b = 0, J());
  }, x("tabs").onclick = (r) => {
    const c = r.target.closest("[data-tab]");
    c && !M && (m = c.dataset.tab, J());
  }, x("name").onchange = () => {
    const r = Y();
    r && (r.name = x("name").value.trim() || "Проверка", w(), B());
  }, x("copy").onclick = () => {
    const r = Y();
    if (!r) return;
    const c = structuredClone(r);
    Object.assign(c, {
      id: crypto.randomUUID(),
      name: r.name + " — копия",
      results: [],
      lastRun: void 0,
      fingerprint: void 0,
      configAtRun: void 0,
      status: "new"
    }), n.checks.push(c), u = c.id, p = "", L.clear(), w(), J();
  }, x("delete").onclick = () => {
    Y() && confirm(`Удалить проверку «${Y().name}» и её результаты?`) && (n.checks = n.checks.filter((r) => r.id !== u), u = n.checks[0]?.id || "", L.clear(), e.clear(), w(), J());
  }, x("clear-project").onclick = () => {
    !n.checks.length && !n.sets.length || confirm(
      "Очистить проверки, наборы моделей и результаты текущего проекта?"
    ) && (n.checks = [], n.sets = [], l = void 0, u = "", p = "", L.clear(), e.clear(), w(), x("model-count").textContent = "Модели не прочитаны", J(), C("Данные проверок текущего проекта очищены."));
  }, x("save").onclick = () => {
    de("НашеПО-проверки.json", JSON.stringify(n, null, 2)), D = !1, x("dirty").textContent = "Файл проверок сохранён";
  }, x("open").onclick = () => x("file").click(), x("file").onchange = () => g(async () => {
    const r = x("file").files?.[0];
    if (!r) return;
    const c = be(await r.text());
    D && !confirm("Заменить текущие несохранённые проверки данными из файла?") || (n = c, a && Lt.set(a, n), ue(o, n), u = n.checks[0]?.id || "", p = "", L.clear(), e.clear(), D = !1, x("dirty").textContent = "Проверки открыты", J(), C("Проверки открыты. Обновите модели перед переходом к элементам."), x("file").value = "");
  });
  for (const r of ["settings", "help"])
    x(r).onclick = () => x(r + "-dialog").showModal();
  for (const r of i.querySelectorAll("[data-close]"))
    r.onclick = () => x(r.dataset.close).close();
  x("content").onchange = (r) => g(() => {
    const c = r.target, h = Y();
    if (!h) return;
    if (c.closest("[data-side]")) {
      gt(c);
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
        const y = Number(c.value);
        if (!Number.isFinite(y) || y < 1e-3 || y > 100)
          throw c.value = String(h.precision), Error("Точность должна быть от 0,001 до 100 мм.");
        h.precision = y;
      }
      if (c.id === "min-penetration") {
        const y = Number(c.value);
        if (!Number.isFinite(y) || y < 0 || y > 1e5)
          throw c.value = String(h.minPenetration), Error(
            "Минимальная глубина должна быть от 0 до 100 000 мм."
          );
        h.minPenetration = y;
      }
      c.id === "type" && (h.type = c.value), c.id === "touching" && (h.touching = c.checked), c.id === "same-model" && (h.ignoreSameModel = c.checked), c.id === "same-group" && (h.ignoreSameGroup = c.checked), c.id === "hidden" && (h.includeHidden = c.checked), c.id === "equal-property" && (h.equalProperty = c.value), j(), J();
      return;
    }
    if (c.id === "result-state") {
      b = 0, X();
      return;
    }
    if (c.id === "check-page") {
      for (const y of N().slice(b * 50, b * 50 + 50))
        c.checked ? L.add(y.id) : L.delete(y.id);
      X();
      return;
    }
    if (c.classList.contains("row-check")) {
      const y = c.closest("[data-result]").dataset.result;
      c.checked ? L.add(y) : L.delete(y), x("selection-count").textContent = `Выбрано: ${L.size}`;
      return;
    }
    const f = h.results.find((y) => y.id === p);
    f && (c.id === "edit-state" && (f.state = c.value, X(), B(), ut()), c.id === "assignee" && (f.assignee = c.value), c.id === "note" && (f.note = c.value, X()), w());
  }), x("content").oninput = (r) => {
    const c = r.target;
    (c.id === "result-search" || c.id === "result-depth") && (b = 0, X());
    const h = Y(), f = Number(c.value);
    h && c.id === "precision" && Number.isFinite(f) && f >= 1e-3 && f <= 100 && (h.precision = f, j()), h && c.id === "min-penetration" && Number.isFinite(f) && f >= 0 && f <= 1e5 && (h.minPenetration = f, j());
  }, x("content").onclick = (r) => g(async () => {
    const c = r.target, h = c.closest("button"), f = Y();
    if (!f) return;
    if (h?.dataset.selection) {
      const E = h.closest("[data-side]").dataset.side, v = f[E], I = x("content").scrollTop;
      let P = !0;
      switch (h.dataset.selection) {
        case "load-set": {
          const U = n.sets.find((V) => V.id === v.presetId);
          if (!U) throw Error("Выберите сохранённый набор моделей.");
          Object.assign(v, structuredClone(U.selection), {
            conditions: [],
            mode: "all",
            include: [],
            exclude: [],
            manualOnly: !1,
            presetId: U.id
          });
          break;
        }
        case "save-set": {
          if (v.manualOnly)
            throw Error(
              "Ручную выборку элементов нельзя сохранить как набор моделей."
            );
          const U = await S();
          if (!U) return;
          const V = {
            id: crypto.randomUUID(),
            name: U,
            selection: {
              models: [...v.models],
              modelsMode: v.modelsMode,
              conditions: [],
              mode: "all"
            }
          };
          n.sets.push(V), v.presetId = V.id, P = !1;
          break;
        }
        case "delete-set": {
          const U = n.sets.find((V) => V.id === v.presetId);
          if (!U) throw Error("Выберите сохранённый набор моделей.");
          if (!confirm(`Удалить набор «${U.name}»?`)) return;
          n.sets = n.sets.filter((V) => V.id !== U.id);
          for (const V of n.checks)
            for (const ct of [V.a, V.b])
              ct.presetId === U.id && (ct.presetId = void 0);
          P = !1;
          break;
        }
        case "show":
          e.select(
            (l?.elements || []).filter((U) => (f.includeHidden || !U.hidden) && Ft(U, v)).map((U) => U.id)
          );
          return;
        case "only": {
          const U = e.selected();
          if (!U.length) throw Error("Выделите элементы в 3D-сцене.");
          v.include = U, v.exclude = [], v.manualOnly = !0;
          break;
        }
        case "include": {
          const U = e.selected();
          if (!U.length) throw Error("Выделите элементы в 3D-сцене.");
          v.include = [.../* @__PURE__ */ new Set([...v.include, ...U])], v.exclude = v.exclude.filter((V) => !U.includes(V));
          break;
        }
        case "exclude": {
          const U = e.selected();
          if (!U.length) throw Error("Выделите элементы в 3D-сцене.");
          v.exclude = [.../* @__PURE__ */ new Set([...v.exclude, ...U])], v.include = v.include.filter((V) => !U.includes(V));
          break;
        }
        case "reset":
          v.manualOnly = !1, v.include = [], v.exclude = [];
      }
      P ? j() : w(), J(), x("content").scrollTop = I;
      return;
    }
    if (h?.id === "prev-page" && (b--, X()), h?.id === "next-page" && (b++, X()), h?.id === "show-markers" && (O = !O, h.textContent = O ? "● Знаки включены" : "○ Знаки выключены", h.setAttribute("aria-checked", String(O)), ut()), h?.id === "bulk") {
      const E = x("bulk-state").value;
      for (const v of f.results) L.has(v.id) && (v.state = E);
      w(), X(), tt(), B(), ut();
    }
    if (h?.id === "capture-image") {
      const E = f.results.find((v) => v.id === p);
      if (E) {
        k = !1, G(!0), q("Создание снимка пары");
        try {
          E.image = await e.snapshot(
            E,
            Number(x("distance").value),
            () => k,
            !0
          ), E.imageScope = "pair-ab", E.imageDistance = void 0, w(), tt(), C("Снимок сохранён в результат.");
        } finally {
          d(), G(!1);
        }
      }
      return;
    }
    if (h?.id === "open-image") {
      const E = f.results.find((v) => v.id === p);
      if (E?.image) {
        const v = document.createElement("dialog");
        v.className = "image-dialog", v.innerHTML = '<button>Закрыть</button><img alt="Снимок коллизии">', v.querySelector("img").src = E.image, v.querySelector("button").onclick = () => {
          v.close(), v.remove();
        }, i.append(v), v.showModal();
      }
      return;
    }
    if (h?.id === "focus" && nt(p, !0), h?.id === "previous" || h?.id === "next") {
      const E = N(), v = E.findIndex((I) => I.id === p) + (h.id === "next" ? 1 : -1);
      E[v] && nt(E[v].id, !0);
    }
    if (h?.id === "export-html" || h?.id === "export-viewer") {
      let E = 0;
      const v = x("selected-only").checked ? f.results.filter((P) => L.has(P.id)) : f.results;
      if (!v.length) throw Error("Нет результатов для отчёта.");
      if (x("report-images").checked) {
        const P = e.view, U = P?.storeView(), V = Number(x("distance").value);
        k = !1, G(!0), q("Подготовка снимков отчёта", 0, v.length);
        try {
          await e.captureWorkspace(async () => {
            let ct = 0;
            for (const pt of v) {
              if (k)
                throw Error(
                  "Подготовка отчёта отменена. Уже полученные снимки сохранены."
                );
              q(
                "Подготовка снимков отчёта",
                ct,
                v.length
              ), C("Подготовка снимков: " + (ct + 1) + " / " + v.length);
              const it = pt.imageScope !== "pair-ab" || pt.imageDistance !== void 0 && pt.imageDistance !== V;
              if (!pt.image || it) {
                if (pt.state === "resolved" && !e.canLocate(pt)) {
                  ct++;
                  continue;
                }
                try {
                  pt.image = await e.snapshot(pt, V, () => k), pt.imageScope = "pair-ab", pt.imageDistance = V, w();
                } catch (rt) {
                  if (k || !e.isCurrent()) throw rt;
                  E++;
                }
              }
              ct++, q("Подготовка снимков отчёта", ct, v.length);
            }
          });
        } finally {
          if (P && e.isCurrent()) {
            const ct = f.results.find((pt) => pt.id === p);
            if (ct)
              try {
                e.focus(ct, V, !1);
              } catch {
              }
            U && P.restoreView(U);
          }
          d(), G(!1);
        }
      }
      const I = x("report-images").checked ? v.map(
        (P) => P.imageScope === "pair-ab" ? P : { ...P, image: void 0 }
      ) : v.map((P) => ({ ...P, image: void 0 }));
      de(
        f.name + (h.id === "export-html" ? ".html" : ".collision360.json"),
        h.id === "export-html" ? Be(f, I) : Ge(f, I)
      ), C(
        "Отчёт подготовлен. Результатов: " + v.length + "; со снимками: " + I.filter((P) => P.image).length + "." + (E ? ` Не удалось создать снимков: ${E}; эти строки включены без изображения.` : ""),
        E > 0
      );
    }
    const y = c.closest("[data-result]");
    y && !c.closest("input") && !window.getSelection()?.toString() && nt(y.dataset.result);
  }), x("content").ondblclick = (r) => {
    const c = r.target, h = c.closest("[data-result]");
    h && !c.closest("input") && g(() => nt(h.dataset.result, !0));
  };
  const Et = setInterval(() => {
    M || (z() ? (x("model-count").textContent = "Модели не прочитаны", C(
      n.checks.length ? "Открыт другой проект. Показаны его проверки; обновите модели." : "Открыт другой проект. Для него ещё нет проверок."
    ), M || J()) : l && !e.isCurrent() && (l = void 0, e.clear(), x("model-count").textContent = "3D-окно изменилось", C("Активное 3D-окно изменилось. Обновите модели."), M || J()));
  }, 1500);
  return J(), () => {
    s(), clearInterval(Et), clearTimeout(Z), T++, k = !0, at?.(), A?.terminate(), e.clear();
  };
}
var ne = /* @__PURE__ */ ((t) => (t.object = "object", t.drawing = "drawing", t.table = "table", t.record = "record", t.textStyle = "textstyle", t.textStyleTable = "textstyles", t.linetype = "linetype", t.linetypeTable = "linetypes", t.layer = "layer", t.layerTable = "layers", t.block = "block", t.blockTable = "blocks", t.layout = "layout", t.layoutTable = "layouts", t.type = "type", t.typeTable = "types", t.material = "material", t.materialTable = "materials", t.geometry = "geometry", t.geometryTable = "geometries", t.group = "group", t.groupTable = "groups", t.attachment = "attachment", t.attachmentTable = "attachments", t.entities = "entities", t.entity = "entity", t.line = "l", t.solid = "s", t.insert = "i", t.polyline = "p", t.circle = "c", t.arc = "a", t.polyline3d = "p3", t.proxy = "x", t.text = "t", t.mtext = "mt", t.wipeout = "w", t.model3d = "g", t.alignment = "al", t))(ne || {});
const oe = () => new Promise((t) => requestAnimationFrame(() => t()));
function Me(t) {
  const { width: e, height: i } = t.camera, s = Array.from(document.querySelectorAll("canvas")).filter(
    (o) => {
      const n = o.getBoundingClientRect();
      return n.width > 100 && n.height > 100 && o.width > 0 && o.height > 0 && getComputedStyle(o).visibility !== "hidden" && (Math.abs(n.width - e) < 4 && Math.abs(n.height - i) < 4 || Math.abs(o.width - e) < 4 && Math.abs(o.height - i) < 4);
    }
  );
  if (!s.length)
    throw Error(
      "Снимок 3D-окна недоступен: откройте одно видимое окно модели."
    );
  const a = s[0].getBoundingClientRect();
  if (s.some((o) => {
    const n = o.getBoundingClientRect();
    return Math.abs(n.x - a.x) > 4 || Math.abs(n.y - a.y) > 4;
  }))
    throw Error(
      "Открыто несколько подходящих 3D-окон. Оставьте одно окно для снимка."
    );
  return { candidates: s, rect: a };
}
async function Te(t) {
  await oe(), t.repaint();
  const { candidates: e, rect: i } = Me(t), s = document.createElement("canvas");
  s.width = Math.max(1, Math.round(i.width * devicePixelRatio)), s.height = Math.max(1, Math.round(i.height * devicePixelRatio)), Object.assign(s.style, {
    position: "fixed",
    left: `${i.left}px`,
    top: `${i.top}px`,
    width: `${i.width}px`,
    height: `${i.height}px`,
    zIndex: "2147483646",
    pointerEvents: "none"
  });
  const a = s.getContext("2d");
  for (const o of e)
    a.drawImage(o, 0, 0, s.width, s.height);
  return document.body.append(s), async () => {
    t.repaint(), await oe(), s.remove();
  };
}
async function Ve(t, e) {
  if (await oe(), e()) throw Error("Подготовка снимков отменена.");
  const { candidates: i } = Me(t), s = document.createElement("canvas"), a = Math.min(1, 1280 / i[0].width);
  s.width = Math.round(i[0].width * a), s.height = Math.round(i[0].height * a);
  const o = s.getContext("2d");
  o.fillStyle = "#20242b", o.fillRect(0, 0, s.width, s.height), t.repaint();
  for (const n of i)
    o.drawImage(n, 0, 0, s.width, s.height);
  try {
    return s.toDataURL("image/jpeg", 0.82);
  } catch {
    throw Error("Браузер запретил чтение изображения 3D-окна.");
  }
}
const Xt = "nashepo.checks.points", fe = "nashepo.checks.highlight";
function me(t) {
  let e = performance.now();
  return async () => {
    if (t()) throw Error("Операция отменена.");
    performance.now() - e >= 16 && (await new Promise((i) => setTimeout(i, 0)), e = performance.now());
  };
}
function Yt(t, e, i, s = 0) {
  if (s > 12 || t == null) return;
  if (typeof t != "object") {
    i[e] = String(t);
    return;
  }
  if (Array.isArray(t)) {
    t.forEach((o, n) => Yt(o, `${e}[${n}]`, i, s + 1));
    return;
  }
  const a = t;
  if ("$value" in a) {
    Yt(a.$value, e, i, s + 1);
    return;
  }
  for (const [o, n] of Object.entries(a))
    o.startsWith("$") || Yt(n, e ? `${e}.${o}` : o, i, s + 1);
}
function We(t) {
  const e = t.vertices.length / 3, i = (n) => Number.isFinite(t.vertices[n * 3]) && Number.isFinite(t.vertices[n * 3 + 1]) && Number.isFinite(t.vertices[n * 3 + 2]), s = (n) => {
    const l = t.indices[n], u = t.indices[n + 1], m = t.indices[n + 2];
    return l < e && u < e && m < e && l !== u && u !== m && m !== l && i(l) && i(u) && i(m);
  };
  let a = 0;
  for (let n = 0; n < t.indices.length; n += 3) s(n) && (a += 3);
  if (a === t.indices.length) return t.indices;
  const o = new Uint32Array(a);
  for (let n = 0, l = 0; n < t.indices.length; n += 3)
    s(n) && (o[l++] = t.indices[n], o[l++] = t.indices[n + 1], o[l++] = t.indices[n + 2]);
  return o;
}
const Kt = (t) => /\.wdx(?:[?#].*)?$/i.test(t);
class Je {
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
      const s = this.ctx.manager.panelBar;
      s?.visible && (this.captureLayout = {
        panel: s,
        size: s.size,
        maximized: s.maximized
      }, s.maximized = !1, s.size = Math.min(s.size, 120), await new Promise(
        (a) => requestAnimationFrame(() => requestAnimationFrame(() => a()))
      ));
    }
    try {
      return await e();
    } finally {
      if (this.captureDepth--, i && this.captureLayout) {
        const { panel: s, size: a, maximized: o } = this.captureLayout;
        this.captureLayout = void 0, s.size = a, s.maximized = o, await new Promise(
          (n) => requestAnimationFrame(() => requestAnimationFrame(() => n()))
        );
      }
    }
  }
  async scan(e, i, s) {
    const a = this.app, o = this.view, n = a?.model;
    if (!o || !n?.layouts || !n.attachments)
      throw Error(
        "Откройте проект Топоматик 360 с IFC или SMDX и сделайте его 3D-окно активным."
      );
    const l = [], u = /* @__PURE__ */ new Set(), m = [], p = [], b = [], M = /* @__PURE__ */ new Map(), k = /* @__PURE__ */ new Set();
    let A = 2166136261;
    const O = me(
      () => i() || a !== this.app || o !== this.view
    );
    let D = -1 / 0;
    const L = (Z) => {
      for (let T = 0; T < Z.length; T++)
        A = Math.imul(A ^ Z.charCodeAt(T), 16777619);
    }, at = async (Z, T, Y) => {
      if (k.has(Z)) return;
      k.add(Z);
      const x = Z.layers.layer0?.modelName || T, lt = T, C = Kt(x) || Kt(lt), q = (j, R) => {
        u.has(j) || (u.add(j), l.push({ id: j, name: R }));
      };
      C || q(lt, x);
      const d = !C && (!s || s.has(lt)), g = [];
      (d || C) && Z.layouts.model?.walk((j) => (j.type === ne.model3d ? g.push(j) : j.type === ne.insert && m.push(`${x}: вставка блока не включена в расчёт.`), !1));
      const S = /* @__PURE__ */ new Map();
      for (const j of g) {
        let R = j.layer, $ = "";
        for (; R; ) {
          if (R.modelName && !Kt(R.modelName)) {
            $ = R.modelName;
            break;
          }
          R = R.layer;
        }
        const N = C ? $ || "Модель проекта" : x, B = C ? $ || `${T}/#model` : lt;
        if (C && q(B, N), s && !s.has(B)) continue;
        const W = JSON.stringify([
          j.layer?.UUID || "",
          j.$id || j.$path
        ]);
        S.set(JSON.stringify([B, W]), {
          key: W,
          objects: [j],
          modelId: B,
          modelName: N
        });
      }
      let w = 0;
      for (const j of S.values()) {
        const { key: R, objects: $, modelId: N, modelName: B } = j;
        if (i()) throw Error("Чтение моделей отменено.");
        if (a !== this.app || o !== this.view)
          throw Error(
            "Активный проект изменился. Запустите чтение моделей заново."
          );
        const W = $[0].layer, J = {};
        try {
          if (W) {
            const et = [];
            let ut = W;
            for (; ut && et.length < 64; )
              et.unshift(ut), ut = ut.layer;
            for (const nt of et)
              Yt(nt.typedProperties(), "", J), nt.typed?.name && (J.Тип = nt.typed.name);
          }
        } catch {
          m.push(`${B} / ${R}: часть свойств недоступна.`);
        }
        const ht = J["ifc.id"] || Object.entries(J).find(
          ([et]) => /(^|\.)(globalid|ifcguid|guid)$/i.test(et)
        )?.[1] || "", X = W?.name || $[0].$id || "Элемент", tt = JSON.stringify([N, R]);
        Object.assign(J, {
          Модель: B,
          Имя: X,
          GUID: ht,
          Объект: W?.UUID || R
        });
        const vt = {
          min: [1 / 0, 1 / 0, 1 / 0],
          max: [-1 / 0, -1 / 0, -1 / 0]
        };
        let ot = !0, st = !1, Mt = 0;
        for (const et of $) {
          ot &&= et.isClosed;
          for (const ut of Object.values(et.meshes)) {
            const nt = ut.geometry;
            if (!nt || nt.indices.length % 3) {
              st = !0;
              continue;
            }
            ot &&= ut.isClosed;
            for (let Q = 0; Q < nt.vertices.length; Q += 3) {
              const G = [
                nt.vertices[Q],
                nt.vertices[Q + 1],
                nt.vertices[Q + 2]
              ];
              if (Math3d.mat4.mulv3(G, et.matrix, G), !G.every(Number.isFinite)) {
                st = !0;
                continue;
              }
              for (let K = 0; K < 3; K++)
                vt.min[K] = Math.min(vt.min[K], G[K]), vt.max[K] = Math.max(vt.max[K], G[K]);
              if (L(G.join(",")), Q % 6e4 === 0 && (performance.now() - D > 200 && (D = performance.now(), e(
                "Индексирование: " + B + " · " + b.length + " элементов"
              )), await O(), i()))
                throw Error("Чтение моделей отменено.");
            }
            const Nt = nt.vertices.length / 3, qt = (Q) => Number.isFinite(nt.vertices[Q * 3]) && Number.isFinite(nt.vertices[Q * 3 + 1]) && Number.isFinite(nt.vertices[Q * 3 + 2]);
            for (let Q = 0; Q < nt.indices.length; Q += 3) {
              const G = nt.indices[Q], K = nt.indices[Q + 1], ft = nt.indices[Q + 2];
              if (A = Math.imul(A ^ G, 16777619), A = Math.imul(A ^ K, 16777619), A = Math.imul(A ^ ft, 16777619), G < Nt && K < Nt && ft < Nt && G !== K && K !== ft && ft !== G && qt(G) && qt(K) && qt(ft) ? Mt++ : st = !0, Q % 15e4 === 0 && (await O(), i()))
                throw Error("Чтение моделей отменено.");
            }
          }
        }
        if (st || !Mt) {
          if (Mt || w++, !Mt) continue;
          ot = !1;
        }
        const jt = {
          id: tt,
          name: X,
          model: B,
          modelId: N,
          guid: ht,
          properties: J,
          hidden: Y || !!W?.resolveHidden() || !!W?.resolveDisabled(),
          triangles: new Float64Array(0),
          triangleCount: Mt,
          closed: ot,
          bounds: vt
        };
        L(JSON.stringify([tt, J, jt.hidden])), b.push(jt), M.set(tt, $);
      }
      w && m.push(
        `${x}: пропущено элементов без треугольной геометрии — ${w}.`
      );
      const z = [];
      Z.attachments.forEach((j) => {
        z.push(j);
      });
      for (const j of z) {
        const R = j.name || j.uri || j.$id, $ = R || "Подключённая модель", N = `${T}/${R || "attachment"}`;
        j.model || q(N, $), j.model ? await at(
          j.model,
          N,
          Y || j.hidden
        ) : (!s || s.has(N)) && p.push(
          `${$}: модель не загружена. Откройте её перед расчётом.`
        );
      }
    };
    if (await at(n, n.layers.layer0?.modelName || "Проект", !1), !b.length && (!s || s.size > 0)) {
      const Z = s ? [...s].filter((T) => !u.has(T)) : [];
      throw Error(
        Z.length ? `Сохранённая выборка ссылается на модели, которых нет в текущем составе: ${Z.join(", ")}. Обновите список моделей.` : l.length ? "В выбранных моделях не найдены 3D-элементы с доступной геометрией. Проверьте, что модели загружены, и выберите нужные файлы." : "В открытом проекте не обнаружены IFC/SMDX-модели. Проверьте состав подключений проекта."
      );
    }
    return this.clear(), this.refs = M, this.metadata = new Map(b.map((Z) => [Z.id, Z])), this.scannedApp = a, this.scannedView = o, {
      elements: b,
      fingerprint: `${b.length}:${A >>> 0}`,
      warnings: [...new Set(m)],
      blockers: [...new Set(p)],
      models: l,
      indexedModelIds: l.filter((Z) => !s || s.has(Z.id)).map((Z) => Z.id)
    };
  }
  async geometry(e, i) {
    const s = me(() => i() || !this.isCurrent());
    if (!this.isCurrent()) throw Error("Активная модель изменилась.");
    const a = this.metadata.get(e), o = this.refs.get(e);
    if (!a || !o) throw Error("Элемент отсутствует.");
    const n = o.flatMap(
      (k) => Object.values(k.meshes).flatMap((A) => {
        const O = A.geometry;
        if (!O || O.indices.length % 3) return [];
        const D = We(O);
        return D.length ? [{ object: k, g: O, indices: D }] : [];
      })
    );
    let l = 0, u = 0;
    for (const { g: k, indices: A } of n) {
      if (!k) throw Error("Геометрия недоступна.");
      l += k.vertices.length, u += A.length;
    }
    const m = new Float64Array(l), p = new Uint32Array(u);
    let b = 0, M = 0;
    for (const { object: k, g: A, indices: O } of n) {
      if (!A) throw Error("Геометрия недоступна.");
      for (let D = 0; D < A.vertices.length; D += 3) {
        const L = [A.vertices[D], A.vertices[D + 1], A.vertices[D + 2]];
        if (Math3d.mat4.mulv3(L, k.matrix, L), m.set(L, b + D), D % 6e4 === 0 && (await s(), i() || !this.isCurrent()))
          throw Error("Чтение геометрии отменено.");
      }
      for (let D = 0; D < O.length; D++)
        if (p[M + D] = b / 3 + O[D], D % 15e4 === 0 && (await s(), i()))
          throw Error("Чтение геометрии отменено.");
      b += A.vertices.length, M += O.length;
    }
    return { ...a, vertices: m, indices: p };
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
    if (this.overlay && (this.overlay.view.layer.removeLayer(this.overlay.layer), this.overlay.view.invalidate(), this.overlay = void 0, this.overlaySurfaces = []), this.pointView) {
      const e = this.pointView.annotations.get(Xt);
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
    const a = e.point, o = this.view;
    o.camera?.id !== "3d" && o.setCameraType("3d"), o.pauseAnimation?.(), this.highlight(e), this.select([e.a.id, e.b.id]);
    const n = [-0.65, 0.65, -0.394], l = Math.hypot(...n);
    n.forEach((u, m) => n[m] = u / l), o.lookAt(
      a.map((u, m) => u - n[m] * i),
      n,
      [0, 0, 1],
      s,
      a
    );
  }
  highlight(e) {
    this.overlayError = void 0;
    const i = this.view;
    this.overlay && this.overlay.view !== i && (this.overlay.view.layer.removeLayer(this.overlay.layer), this.overlay = void 0, this.overlaySurfaces = []);
    const s = [
      { id: e.a.id, color: 4281743103 },
      { id: e.b.id, color: 915144703 }
    ];
    if (this.overlaySurfaces = s.flatMap(
      ({ id: n, color: l }, u) => [...new Set(this.refs.get(n) || [])].flatMap(
        (m) => Object.values(m.meshes).flatMap((p) => {
          const b = p.geometry;
          if (!b) return [];
          const M = {
            // SDK fields may be prototype getters rather than own properties.
            uuid: `${fe}.${u}.${b.uuid}`,
            vertices: b.vertices,
            indices: b.indices,
            normals: b.normals,
            bounds: b.bounds,
            colors: new Uint32Array(b.vertices.length / 3).fill(l)
          };
          return [{ obj: m, geometry: M, color: l }];
        })
      )
    ), this.overlay) {
      this.overlay.layer.visible = !0, i.invalidate(!0);
      return;
    }
    let a;
    a = {
      id: fe,
      order: 1e4,
      visible: !0,
      paint: () => {
      },
      paint3d: (n) => {
        const l = n.color, u = n.rasterizer.material;
        n.rasterizer.material = void 0;
        try {
          for (const { obj: m, geometry: p, color: b } of this.overlaySurfaces) {
            n.color = b, n.pushMatrix();
            try {
              n.multMatrix(m.matrix), n.mesh(p);
            } finally {
              n.popMatrix();
            }
          }
        } catch (m) {
          a.visible = !1, this.overlayError = new Error(
            "Не удалось отрисовать подсветку пары: " + (m instanceof Error ? m.message : String(m))
          );
        } finally {
          n.color = l, n.rasterizer.material = u;
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
    }, i.layer.addLayer(a), this.overlay = { view: i, layer: a }, i.invalidate();
  }
  async snapshot(e, i, s, a = !1, o = !0) {
    const n = () => this.snapshotInWorkspace(e, i, s, a);
    return o ? this.captureWorkspace(n) : n();
  }
  async snapshotInWorkspace(e, i, s, a = !1) {
    if (!this.isCurrent())
      throw Error("Обновите модели перед созданием снимков.");
    if (!this.canLocate(e))
      throw Error("Элементы результата отсутствуют в открытых моделях.");
    const o = this.view, n = o.layer.drawing;
    if (!n)
      throw Error(
        "Слой моделей недоступен для снимка пары. Откройте 3D-окно проекта."
      );
    const l = n.visible, u = o.annotations.visible, m = new Set(o.layer.selectedObjects());
    let p;
    try {
      a ? this.highlight(e) : this.focus(e, i, !1), o.pauseAnimation(), p = await Te(o), o.layer.clearSelected(), n.visible = !1, o.annotations.visible = !1, o.invalidate();
      const b = await Ve(
        o,
        () => s() || !this.isCurrent()
      );
      if (this.overlayError) throw this.overlayError;
      return b;
    } finally {
      n.visible = l, o.annotations.visible = u, o.layer.clearSelected(), o.layer.selectObjects((b) => m.has(b), !0), o.invalidate(), await p?.();
    }
  }
  markers(e, i, s, a) {
    if (!this.isCurrent()) return;
    const o = this.view;
    this.pointView && this.pointView !== o && this.clear();
    const n = o.annotations.get(Xt);
    if (n && o.annotations.release(n), this.pointView = o, !s) {
      o.invalidate();
      return;
    }
    const l = o.annotations.create(Xt, 1e4), u = e.filter((m) => m.id !== i).concat(e.filter((m) => m.id === i));
    for (const m of u.slice(-3e3)) {
      if (m.state === "resolved") continue;
      const [p, b, M] = m.point, k = m.id === i, A = m.state === "excluded" ? "#78818c" : m.state === "approved" || m.state === "reviewed" ? "#28b94b" : "#e1372d", O = k ? "#f2c94c" : A, D = () => a(m.id), L = [
        { type: "line", a: [p, b, M], b: [p, b, M + 1], color: O, width: 5 },
        {
          type: "polyline",
          points: [
            [p - 0.65, b, M + 1],
            [p + 0.65, b, M + 1],
            [p, b, M + 2.2],
            [p - 0.65, b, M + 1]
          ],
          color: O,
          fillColor: A,
          width: k ? 5 : 2
        },
        {
          type: "line",
          a: [p, b - 0.01, M + 1.85],
          b: [p, b - 0.01, M + 1.4],
          color: "#ffffff",
          width: 4
        },
        {
          type: "line",
          a: [p, b - 0.01, M + 1.22],
          b: [p, b - 0.01, M + 1.27],
          color: "#ffffff",
          width: 4
        }
      ];
      l.add({
        id: m.id,
        type: "shaped",
        shapes: L,
        activeShapes: L,
        activateCommand: D,
        dblCommand: D
      }), k && l.add({
        id: m.id + ":label",
        type: "simple",
        position: [p, b, M + 2.35],
        label: `${m.a.name} × ${m.b.name}`,
        labelBackground: "#f2c94c",
        labelColor: "#171717",
        activateCommand: D
      });
    }
    o.invalidate();
  }
}
let he, _t, ge;
const He = {
  open(t) {
    t.manager.revealView("nashepo.collisionfinder360/checks_panel");
  },
  mount(t) {
    const e = t.el;
    if (!e) return;
    if (_t && ge === t.manager) {
      e.replaceChildren(_t);
      return;
    }
    he?.();
    const i = document.createElement("div");
    i.style.height = "100%", e.replaceChildren(i), _t = i, ge = t.manager, he = Qe(i, new Je(t));
  }
};
export {
  He as default
};
