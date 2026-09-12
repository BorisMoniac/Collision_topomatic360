const Ne = `<h2>Работа с проверками</h2>
<details open><summary>1. Первая проверка</summary><ol><li>Откройте проект и подключите IFC/SMDX штатными средствами Топоматик 360.</li><li>Откройте нижнюю вкладку «Проверки» и нажмите «Модели».</li><li>Нажмите «＋ Новая проверка» и задайте ей понятное имя.</li><li>Во вкладке «Выбор» оставьте галочки только у нужных файлов в А и Б. «Все модели» включено по умолчанию.</li><li>Выберите «По пересечению» или «Дублирование» и нажмите «Запустить».</li><li>Во вкладке «Результаты» дважды нажмите строку: камера направится к конфликту, элемент А будет выделен красным, элемент Б — синим, и оба элемента станут выделенными в 3D-окне.</li></ol><p>Первое обновление без созданной проверки получает только список файлов. При запуске индексируются модели, отмеченные хотя бы в одной стороне. Файл проекта WDX служит контейнером и в выбор моделей не попадает.</p></details>
<details><summary>2. Выбор моделей и сохранённые наборы</summary><p>Выбор А и выбор Б задают две стороны сравнения. Снимите «Все модели» и отметьте конкретные IFC/SMDX. Для поиска дубликатов внутри одного файла отметьте его с обеих сторон.</p><p>Часто используемый состав можно сохранить как набор моделей, а затем применить в другой проверке. Наборы входят в файл проверок. Состав выборки задаётся галочками моделей и ручным выделением объектов.</p><p>IFC GUID читается из свойства <code>ifc.id</code>; также поддерживаются GlobalId, IfcGuid и GUID.</p></details>
<details><summary>3. Работа с выделением в 3D</summary><p>Сначала выделите элементы штатными средствами в 3D-окне, затем используйте кнопку в нужной стороне:</p><ul><li><b>Показать выбранные элементы</b> — выделяет весь текущий состав.</li><li><b>Только выделенные в 3D</b> — оставляет только выделенные объекты.</li><li><b>＋ Добавить из 3D</b> — добавляет выделенные объекты к моделям.</li><li><b>− Исключить из 3D</b> — исключает выделенные объекты.</li><li><b>Сбросить ручной выбор</b> — снова использует отмеченные модели.</li></ul><p>Ручные идентификаторы могут измениться после замены IFC/SMDX, поэтому такую выборку следует проверить заново.</p></details>
<details><summary>4. Пересечения, глубина, касания и дубликаты</summary><p><b>Пересечение</b> определяется по треугольным поверхностям элементов и вложенности тел. Раздельные сетки сначала проверяются вместе: совпадающие рёбра и разное разбиение швов больше не делают замкнутый элемент «неизмеримым». Габаритные коробки отбирают близкие пары; общий габарит также ограничивает область замера глубины. Одна пара элементов формирует один результат.</p><p><b>Толщина перекрытия</b> — локальная оценка пересечения. Для контакта выбираются направления измерения, в том числе по его форме и нормалям граней. По ним измеряется общая часть проекций геометрии в области контакта и выбирается наименьшая пригодная ширина. Если обнаружены отдельные участки перекрытия, для пары сохраняется наибольшая из их глубин.</p><p><b>Заход вдоль оси</b> дополнительно измеряется для распознанной прямой трубы или вытянутого профиля, пересекающего более крупную конструкцию. Ось определяется по геометрии, её пересечения — по граням конструкции. При частичном заходе измеряется участок от внешней границы до конца профиля; при сквозном — от входа до выхода. Внутренняя пустота колодца входит в этот замер. Раздельные оболочки конструкции измеряются отдельно: расстояние между несвязанными частями не прибавляется. Сам по себе проход оси через габарит не создаёт коллизию: сначала должно быть обнаружено пересечение элементов.</p><p><b>Глубина для отбора</b> — большее из толщины перекрытия и продольного захода. Поэтому труба диаметром 50 мм, заходящая в конструкцию на 1000 мм, проходит порог 80 мм, а стык с заходом 5 мм — нет. Оба замера видны в карточке коллизии и HTML-отчёте, когда продольный заход удалось определить. Для отводов, фитингов и сопоставимых труб сохраняется локальный расчёт. Это не расстояние перемещения, устраняющего коллизию. Объём пересечения имеет кубические единицы и не заменяет глубину в миллиметрах.</p><p>Если оболочка содержит разрывы, плагин дополнительно определяет внутреннюю область по совокупности окружающих граней — методом обобщённого числа обхода. Когда такая область подтверждается, рассчитывается численная глубина со знаком ≈. Исходная модель при этом не изменяется. Это позволяет проверять трубы, отводы и другие объёмные элементы с дефектами сетки. Одиночная плоская грань не превращается в объёмное тело.</p><p><b>Ограничения метода.</b> Плагин не строит точное тело пересечения. Разделение контактов, выбор направлений и проверка заполнения являются оценкой. Для сложных невыпуклых и составных объектов, криволинейных поверхностей результат может зависеть от сетки и расположения геометрии. Продольный замер применяется к распознанным прямым профилям с длиной не менее четырёх поперечных размеров, когда конструкция шире профиля минимум в 2,5 раза по двум поперечным направлениям. Изогнутые трассы и неоднозначные составные профили измеряются прежним локальным методом. У сложной связной невыпуклой оболочки продольный замер может включать промежутки между её поверхностями. Заданная точность не гарантирует такую же погрешность итоговой глубины. Результаты около принятого допуска следует проверять в 3D.</p><p><b>Столбец глубины:</b></p><ul><li><b>Число</b> — полученная оценка в миллиметрах. Малые положительные значения показываются с дополнительными знаками, чтобы не превратиться в ноль при округлении.</li><li><b>Касание</b> — найден контакт без разрешённого объёмного перекрытия. Такие пары включаются настройкой «Учитывать касания» и могут отсекаться порогом глубины как нулевые.</li><li><b>Не определена</b> — у геометрии не удалось определить внутреннюю область, например у одиночного листа или отдельных граней. Пересечение сохраняется; размер грани не выдаётся за глубину.</li><li><b>Требует уточнения</b> — пересечение найдено, однако его глубина не разрешена текущим расчётом. Причиной может быть неоднозначная геометрия контакта. Само по себе малое вхождение относительно настройки точности больше не является причиной отказа от замера.</li><li><b>≈</b> — приблизительная оценка: внутренняя область восстановлена для оболочки с разрывами, состыкованы немного расходящиеся швы либо при измерении сокращалась выборка или разделение контактов достигло предела. Для числа не гарантируются ни величина, ни направление ошибки.</li></ul><p>«Не определена» и «Требует уточнения» остаются в результатах независимо от минимальной глубины. Числовые оценки, в том числе со знаком ≈, сравниваются с порогом. Знак ≈ сообщает о приближённом расчёте и не отменяет фильтр. Найденное малое пересечение не должно исчезать только из-за отключённого учёта касаний: для определения пересечения и замера используется отдельный численный запас. Настройка точности не округляет малые вхождения до нуля.</p><p><b>Точность расчёта</b> задаётся в миллиметрах и влияет на отбор близких пар, разделение контактов и запас при фильтрации. При восстановлении швов допустимое расхождение ограничено этой величиной и дополнительно 0,01 мм. Приближённое восстановление внутренней области по граням — отдельный метод, его погрешность этой настройкой не гарантируется. <b>Минимальная глубина</b> — порог отбора результатов. Все числовые оценки сравниваются с порогом с запасом на точность: при минимуме 20 мм и точности 0,1 мм результат 19,95 мм остаётся. Этот порядок одинаков в расчёте, таблице и HTML-отчёте. После изменения точности или порога повторно запустите проверку.</p><p>Труба и отвод могут пересекаться в штатном соединении из-за формы исходной сетки. Такие соединения рассматриваются отдельно и при необходимости исключаются правилами.</p><p><b>Дублирование</b> ищет совпадающую треугольную геометрию в мировых координатах с заданной точностью. Геометрически одинаковые тела с разным разбиением поверхности на треугольники могут не считаться дубликатами.</p></details>
<details><summary>5. Составные объекты и неполная геометрия</summary><p>Один IFC-объект может состоять из нескольких частей. Чтобы не сравнивать его части между собой, включите «Не проверять геометрию одного составного объекта» во вкладке «Правила». Там же можно исключить пары одной модели или одинакового значения свойства.</p><p>Пустые и неполные геометрические части пропускаются, а пригодные части модели продолжают участвовать. Плагин показывает сводное замечание с количеством пропущенных элементов. Незагруженный подключённый файл блокирует расчёт только тогда, когда он входит в выборку.</p></details>
<details><summary>6. Результаты и состояния</summary><p>«Новый» найден впервые, «Активный» найден повторно, «Проверенный» рассмотрен, «Подтверждённый» подтверждён, «Исключённый» исключён из работы. «Исправленный» означает, что пара исчезла при повторном расчёте с теми же правилами; состояние можно изменить вручную.</p><p>В таблице доступны IFC GUID, расчётная глубина, назначение и комментарий. Фильтр «Глубина от» сравнивает порог с большим из доступных замеров: толщиной перекрытия и продольным заходом. Числа со знаком ≈ тоже участвуют в отборе; строки «не определена» и «требует уточнения» сохраняются для просмотра. Галочки меняют состояние сразу у нескольких строк. Значения можно выделять и копировать. При переходе стрелками активная строка автоматически прокручивается в видимую область. Состояние «Устарела» у проверки означает, что после последнего расчёта изменили её тип, выборки, параметры или правила.</p></details>
<details><summary>7. Отчёт и снимки</summary><p>После перехода к коллизии отсутствующий снимок создаётся автоматически, если пользователь задержался на результате. Кадр строится от той же камеры приближения, что и снимки отчёта: ракурс задаёт «Дистанция камеры» в настройках. Если дистанцию изменить, отчёт переснимет прежние кадры под новое значение. Быстрое переключение стрелками отменяет лишние снимки. Во время технической перерисовки поверх 3D-окна сохраняется предыдущий кадр, поэтому модель не должна мигать.</p><p>Кнопка «Снимок пары» сохраняет текущий ракурс только с двумя элементами коллизии: элемент А показан красным, элемент Б — синим. Такой кадр собран вручную, поэтому отчёт его не переснимает. На время подготовки отчёта нижняя панель автоматически уменьшается для широкого 3D-кадра и затем возвращается к прежнему размеру. Файл сессии предназначен для открытия результатов в плагине «НашеПО · Коллизии».</p></details>
<details><summary>8. Проекты, сохранение и очистка</summary><p>В пределах открытой страницы каждый проект получает собственный список проверок. Сворачивание или повторное открытие нижней панели сохраняет проверки, результаты и комментарии в текущей вкладке. При переключении проекта данные предыдущего не подмешиваются. «Очистить проект» удаляет проверки, результаты и наборы только у текущего проекта.</p><p>«Сохранить проверки» записывает правила, наборы моделей, результаты, комментарии и снимки в JSON. «Открыть проверки» загружает этот файл. Геометрия в файл не входит: соответствующие модели надо открыть отдельно. После обновления или закрытия страницы для продолжения работы используйте сохранённый файл.</p></details>
<details><summary>9. Большие проекты</summary><p>Жёсткого предела в 6 млн треугольников нет. При запуске строится индекс только по отмеченным моделям. Точная геометрия передаётся в расчёт по мере появления близких пар в компактном индексированном виде.</p><p>Время и память всё равно зависят от состава выборок и числа потенциальных пар. Разделяйте проверки по моделям и системам. В сцене одновременно показывается до 3000 знаков; при 50 000 результатах расчёт останавливается без замены прежнего результата.</p></details>`;
function Oe(t) {
  let e = t.parentElement, n;
  for (; e && !n; )
    n = [...e.children].find(
      (d) => d.classList.contains("resizer-horizontal")
    ), e = e.parentElement;
  if (!n) return () => {
  };
  const s = n, a = t.ownerDocument.defaultView;
  let o;
  const i = () => {
    if (o === void 0) return;
    const d = o;
    o = void 0, s.dispatchEvent(
      new MouseEvent("mouseup", { bubbles: !0, composed: !0 })
    ), s.hasPointerCapture(d) && s.releasePointerCapture(d);
  }, r = (d) => {
    d.button === 0 && (o = d.pointerId, s.setPointerCapture(d.pointerId));
  };
  return s.addEventListener("pointerdown", r), s.addEventListener("pointerup", i), s.addEventListener("pointercancel", i), s.addEventListener("lostpointercapture", i), a.addEventListener("blur", i), () => {
    i(), s.removeEventListener("pointerdown", r), s.removeEventListener("pointerup", i), s.removeEventListener("pointercancel", i), s.removeEventListener("lostpointercapture", i), a.removeEventListener("blur", i);
  };
}
const Pe = "0.9.0", Jt = (t) => typeof t == "string" && /^data:image\/(jpeg|png);base64,[A-Za-z0-9+/=]+$/.test(t), Ct = {
  new: "Новый",
  active: "Активный",
  reviewed: "Проверенный",
  approved: "Подтверждённый",
  resolved: "Исправленный",
  excluded: "Исключённый"
}, Ie = (t, e, n) => t.kind === "duplicate" || t.depth === "unmeasurable" || t.depth === "tolerance" || (t.penetrationMm ?? 0) + n >= e, fe = () => ({
  models: [],
  modelsMode: "all",
  conditions: [],
  mode: "all",
  include: [],
  exclude: []
}), qe = () => ({
  id: crypto.randomUUID(),
  name: "Новая проверка",
  type: "intersection",
  a: fe(),
  b: fe(),
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
}), ue = ({
  triangles: t,
  vertices: e,
  indices: n,
  triangleCount: s,
  closed: a,
  bounds: o,
  ...i
}) => i;
function Gt(t, e) {
  return e.exclude.includes(t.id) ? !1 : e.include.includes(t.id) ? !0 : !(e.manualOnly || e.modelsMode === "selected" && !e.models.includes(t.modelId) || e.modelsMode === void 0 && e.models.length && !e.models.includes(t.modelId));
}
const Le = (t) => JSON.stringify([
  t.type,
  ...[t.a, t.b].map(
    ({
      models: e,
      modelsMode: n,
      conditions: s,
      mode: a,
      include: o,
      exclude: i,
      manualOnly: r
    }) => ({
      models: e,
      modelsMode: n,
      conditions: s,
      mode: a,
      include: o,
      exclude: i,
      manualOnly: r
    })
  ),
  t.precision,
  t.minPenetration,
  t.touching,
  t.ignoreSameModel,
  t.ignoreSameGroup,
  t.equalProperty,
  t.includeHidden
]), De = (t, e) => JSON.stringify([t, e].sort());
function Fe(t, e, n) {
  const s = new Map(t.map((o) => [o.id, o])), a = e.map((o) => {
    const i = s.get(o.id);
    return s.delete(o.id), {
      ...o,
      note: i?.note ?? "",
      assignee: i?.assignee ?? "",
      firstSeen: i?.firstSeen ?? n,
      lastSeen: n,
      state: !i || i.state === "resolved" ? "new" : i.state === "new" ? "active" : i.state
    };
  });
  for (const o of s.values())
    a.push({
      ...o,
      state: o.state === "excluded" ? "excluded" : "resolved"
    });
  return a;
}
function Se(t) {
  const e = JSON.parse(t);
  if (e?.format !== "nashepo.checks" || e.version !== 1 || !Array.isArray(e.checks))
    throw Error("Это не файл проекта проверок НашеПО.");
  const n = /* @__PURE__ */ new Set();
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
    if (!a || typeof a.id != "string" || n.has(a.id) || typeof a.name != "string" || !["intersection", "duplicates"].includes(a.type) || !["new", "done", "stale"].includes(a.status) || !Number.isFinite(a.precision) || a.precision < 1e-3 || a.precision > 100 || a.minPenetration !== void 0 && (!Number.isFinite(a.minPenetration) || a.minPenetration < 0 || a.minPenetration > 1e5) || !Array.isArray(a.results))
      throw Error("Некорректные параметры проверки.");
    if (n.add(a.id), a.minPenetration ??= 0, ![
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
        (i) => Array.isArray(i) && i.every((r) => typeof r == "string")
      ) || !Array.isArray(o.conditions) || !o.conditions.every(
        (i) => i && typeof i.field == "string" && typeof i.value == "string" && ["eq", "ne", "contains", "exists", "gt", "lt"].includes(i.op)
      ))
        throw Error("Некорректная выборка.");
      o.modelsMode ??= o.models.length ? "selected" : "all", o.models = o.models.filter((i) => !s(i)), o.conditions = [], o.mode = "all";
    }
    for (const o of a.results) {
      if (o?.image !== void 0 && !Jt(o.image))
        throw Error("Некорректный снимок результата.");
      if (o?.imageScope !== void 0 && o.imageScope !== "pair" && o.imageScope !== "pair-ab")
        throw Error("Некорректный состав снимка результата.");
      if (o?.imageDistance !== void 0 && (!Number.isFinite(o.imageDistance) || o.imageDistance < 0.5))
        throw Error("Некорректная дистанция снимка результата.");
      if (o?.unmeasured !== void 0 && typeof o.unmeasured != "boolean")
        throw Error("Некорректный признак измеримости результата.");
      if (o?.depth !== void 0 && !["tolerance", "approximate", "unmeasurable"].includes(o.depth))
        throw Error("Некорректная достоверность глубины результата.");
      o?.unmeasured && !o.depth && (o.depth = "unmeasurable");
      for (const i of [o?.overlapThicknessMm, o?.axialPenetrationMm])
        if (i !== void 0 && (!Number.isFinite(i) || i < 0))
          throw Error("Некорректный размер пересечения.");
      if (o?.axialElementId !== void 0 && (typeof o.axialElementId != "string" || ![o.a?.id, o.b?.id].includes(o.axialElementId)))
        throw Error("Некорректный элемент продольного замера.");
      if (!o || typeof o.id != "string" || !Object.hasOwn(Ct, o.state) || o.penetrationMm !== void 0 && (!Number.isFinite(o.penetrationMm) || o.penetrationMm < 0) || !Array.isArray(o.point) || o.point.length !== 3 || !o.point.every(Number.isFinite))
        throw Error("Некорректный результат.");
      for (const i of [o.a, o.b])
        if (!i || !["id", "name", "model", "modelId", "guid"].every(
          (r) => typeof i[r] == "string"
        ) || !i.properties || typeof i.properties != "object")
          throw Error("Некорректный элемент результата.");
    }
  }
  return e;
}
const U = (t, e) => [t[0] - e[0], t[1] - e[1], t[2] - e[2]], Et = (t, e, n = 1) => [
  t[0] + e[0] * n,
  t[1] + e[1] * n,
  t[2] + e[2] * n
], W = (t, e) => t[0] * e[0] + t[1] * e[1] + t[2] * e[2], xt = (t, e) => [
  t[1] * e[2] - t[2] * e[1],
  t[2] * e[0] - t[0] * e[2],
  t[0] * e[1] - t[1] * e[0]
], K = (t) => Math.hypot(...t), Tt = (t) => {
  const e = K(t);
  return e > 1e-20 ? [t[0] / e, t[1] / e, t[2] / e] : void 0;
}, At = (t) => t.triangleCount ?? (t.indices ? t.indices.length / 3 : t.triangles.length / 9), Mt = (t, e, n) => t.indices && t.vertices ? t.vertices[t.indices[e * 3 + Math.floor(n / 3)] * 3 + n % 3] : t.triangles[e * 9 + n], bt = (t, e) => [0, 3, 6].map((n) => [
  Mt(t, e, n),
  Mt(t, e, n + 1),
  Mt(t, e, n + 2)
]);
function Ut(t) {
  const e = [1 / 0, 1 / 0, 1 / 0], n = [-1 / 0, -1 / 0, -1 / 0];
  for (let s = 0; s < t.length; s++) {
    const a = s % 3;
    e[a] = Math.min(e[a], t[s]), n[a] = Math.max(n[a], t[s]);
  }
  return { min: e, max: n };
}
const Yt = (t, e, n) => t.min.every((s, a) => s <= e.max[a] + n && t.max[a] >= e.min[a] - n);
function ae(t, e) {
  const n = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const r of e)
    for (let d = 0; d < 9; d++) {
      const m = d % 3, p = Mt(t, r, d);
      n.min[m] = Math.min(n.min[m], p), n.max[m] = Math.max(n.max[m], p);
    }
  if (e.length <= 12) return { ...n, ids: e };
  const s = n.max.map((r, d) => r - n.min[d]), a = s.indexOf(Math.max(...s)), o = (r) => Mt(t, r, a) + Mt(t, r, a + 3) + Mt(t, r, a + 6);
  e.sort((r, d) => o(r) - o(d));
  const i = e.length >> 1;
  return {
    ...n,
    left: ae(t, e.slice(0, i)),
    right: ae(t, e.slice(i))
  };
}
function* Pt(t, e, n) {
  Yt(t, e, n) && (t.ids ? yield* t.ids : (yield* Pt(t.left, e, n), yield* Pt(t.right, e, n)));
}
function* $t(t, e, n) {
  if (Yt(t, e, n)) {
    if (t.ids && e.ids) {
      for (const s of t.ids) for (const a of e.ids) yield [s, a];
      return;
    }
    if (t.ids) {
      yield* $t(t, e.left, n), yield* $t(t, e.right, n);
      return;
    }
    if (e.ids) {
      yield* $t(t.left, e, n), yield* $t(t.right, e, n);
      return;
    }
    yield* $t(t.left, e.left, n), yield* $t(t.left, e.right, n), yield* $t(t.right, e.left, n), yield* $t(t.right, e.right, n);
  }
}
function Ht(t, e) {
  const n = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const i of e)
    for (let r = 0; r < 3; r++)
      n.min[r] = Math.min(n.min[r], t[i].bounds.min[r]), n.max[r] = Math.max(n.max[r], t[i].bounds.max[r]);
  if (e.length <= 16) return { ...n, ids: e };
  const s = n.max.map((i, r) => i - n.min[r]), a = s.indexOf(Math.max(...s));
  e.sort(
    (i, r) => t[i].bounds.min[a] + t[i].bounds.max[a] - (t[r].bounds.min[a] + t[r].bounds.max[a])
  );
  const o = e.length >> 1;
  return {
    ...n,
    left: Ht(t, e.slice(0, o)),
    right: Ht(t, e.slice(o))
  };
}
function Rt(t, e, n, s) {
  const a = U(e, t), o = U(n[1], n[0]), i = U(n[2], n[0]), r = xt(a, i), d = W(o, r);
  if (Math.abs(d) <= 1e-12 * K(a) * K(o) * K(i)) return;
  const m = 1 / d, p = U(t, n[0]), h = W(p, r) * m, y = xt(p, o), M = W(a, y) * m, A = W(i, y) * m, C = s / Math.max(K(o), K(i), s);
  if (h >= -C && M >= -C && h + M <= 1 + C && A >= -C && A <= 1 + C)
    return Et(t, a, Math.max(0, Math.min(1, A)));
}
function Ue(t, e, n, s) {
  const a = n.map(Math.abs).indexOf(Math.max(...n.map(Math.abs))), o = [0, 1, 2].filter((d) => d !== a), i = (d, m, p) => (m[o[0]] - d[o[0]]) * (p[o[1]] - d[o[1]]) - (m[o[1]] - d[o[1]]) * (p[o[0]] - d[o[0]]), r = (d, m) => {
    const p = m.map((h, y) => i(h, m[(y + 1) % 3], d));
    return p.every((h) => h >= -s * K(n)) || p.every((h) => h <= s * K(n));
  };
  for (const d of t) if (r(d, e)) return d;
  for (const d of e) if (r(d, t)) return d;
  for (let d = 0; d < 3; d++)
    for (let m = 0; m < 3; m++) {
      const p = t[d], h = t[(d + 1) % 3], y = e[m], M = e[(m + 1) % 3], A = U(h, p), C = U(M, y), F = A[o[0]] * C[o[1]] - A[o[1]] * C[o[0]];
      if (Math.abs(F) < 1e-18) continue;
      const D = U(y, p), _ = (D[o[0]] * C[o[1]] - D[o[1]] * C[o[0]]) / F, T = (D[o[0]] * A[o[1]] - D[o[1]] * A[o[0]]) / F;
      if (_ >= 0 && _ <= 1 && T >= 0 && T <= 1) return Et(p, A, _);
    }
}
function Re(t, e, n, s) {
  for (let a = 0; a < 3; a++) {
    const o = Rt(t[a], t[(a + 1) % 3], e, n);
    o && s.push(o);
    const i = Rt(e[a], e[(a + 1) % 3], t, n);
    i && s.push(i);
  }
}
function Te(t, e, n, s) {
  const a = xt(U(t[1], t[0]), U(t[2], t[0])), o = xt(U(e[1], e[0]), U(e[2], e[0])), i = K(a), r = K(o);
  if (i < 1e-20 || r < 1e-20) return;
  const d = e.map((p) => W(U(p, t[0]), a) / i), m = t.map((p) => W(U(p, e[0]), o) / r);
  if (!(d.every((p) => p > n) || d.every((p) => p < -n) || m.every((p) => p > n) || m.every((p) => p < -n))) {
    if (d.every((p) => Math.abs(p) <= n) && m.every((p) => Math.abs(p) <= n))
      return s ? Ue(t, e, a, n) : void 0;
    if (!(!s && (!(Math.min(...d) < -n && Math.max(...d) > n) || !(Math.min(...m) < -n && Math.max(...m) > n))))
      for (let p = 0; p < 3; p++) {
        const h = Rt(t[p], t[(p + 1) % 3], e, n);
        if (h) return h;
        const y = Rt(e[p], e[(p + 1) % 3], t, n);
        if (y) return y;
      }
  }
}
class Be {
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
    return e.map((n) => Math.round(n * this.step)).join(",");
  }
  add(e) {
    const n = Tt(xt(U(e[1], e[0]), U(e[2], e[0])));
    if (!n) return;
    const a = n[0] < -1e-9 || Math.abs(n[0]) <= 1e-9 && (n[1] < -1e-9 || Math.abs(n[1]) <= 1e-9 && n[2] < 0) ? [-n[0], -n[1], -n[2]] : [n[0], n[1], n[2]], o = this.key(a);
    for (this.items.has(o) || this.items.set(o, a); this.items.size > 512 && this.step > 10; ) {
      this.step /= 10;
      const i = /* @__PURE__ */ new Map();
      for (const r of this.items.values()) {
        const d = this.key(r);
        i.has(d) || i.set(d, r);
      }
      this.items = i;
    }
  }
  addFrom(e, n) {
    for (const s of n) this.add(bt(e, s));
  }
  values() {
    return [
      ...this.world,
      ...[...this.items].sort((e, n) => e[0] < n[0] ? -1 : 1).map(([, e]) => e)
    ];
  }
}
function Zt(t, e) {
  const n = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
  for (const a of t) {
    const o = [a[0] - e[0], a[1] - e[1], a[2] - e[2]];
    for (let i = 0; i < 3; i++)
      for (let r = 0; r < 3; r++) n[i][r] += o[i] * o[r];
  }
  const s = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ];
  for (let a = 0; a < 12; a++) {
    let o = 0;
    for (let i = 0; i < 3; i++)
      for (let r = i + 1; r < 3; r++) o += n[i][r] * n[i][r];
    if (o <= 1e-30) break;
    for (let i = 0; i < 3; i++)
      for (let r = i + 1; r < 3; r++) {
        if (Math.abs(n[i][r]) <= 1e-30) continue;
        const d = (n[r][r] - n[i][i]) / (2 * n[i][r]), m = (d >= 0 ? 1 : -1) / (Math.abs(d) + Math.sqrt(d * d + 1)), p = 1 / Math.sqrt(m * m + 1), h = m * p;
        for (const y of [n, s])
          for (let M = 0; M < 3; M++) {
            const A = y[M][i], C = y[M][r];
            y[M][i] = p * A - h * C, y[M][r] = h * A + p * C;
          }
        for (let y = 0; y < 3; y++) {
          const M = n[i][y], A = n[r][y];
          n[i][y] = p * M - h * A, n[r][y] = h * M + p * A;
        }
      }
  }
  return [0, 1, 2].sort((a, o) => n[o][o] - n[a][a]).map((a) => Tt([s[0][a], s[1][a], s[2][a]])).filter((a) => !!a);
}
function Ge(t, e, n, s) {
  const a = e.min.map((p, h) => (p + e.max[h]) / 2), o = K(U(e.max, e.min)), i = Math.max(n * 10, o / 50), r = (p) => [0, 1, 2].map(
    (h) => p.reduce((y, M) => y + M[h], 0) / p.length
  );
  let d = [{ hits: t, limits: [] }], m = !1;
  for (let p = 0; p < 12; p++) {
    const h = [];
    let y = !1;
    for (const M of d) {
      if (M.hits.length < 2) {
        h.push(M);
        continue;
      }
      if (h.length + d.length >= 64) {
        m = !0, h.push(M);
        continue;
      }
      const A = r(M.hits), C = [
        A,
        a,
        ...[0, 0.25, 0.5, 0.75].map(
          (g) => M.hits[Math.floor(g * (M.hits.length - 1))]
        )
      ], F = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ], D = Zt(M.hits, A);
      D[0] && F.push(D[0]);
      const _ = (g) => {
        let w = -1 / 0, z = 1 / 0;
        for (const S of M.hits) {
          const b = W(S, g);
          b > w && (w = b), b < z && (z = b);
        }
        return w - z;
      }, T = (g) => Math.max(
        0,
        ...D.filter((w) => Math.abs(W(w, g)) < 0.9).map((w) => _(w))
      ), G = (g) => {
        const w = M.hits.map((S) => W(S, g)).sort((S, b) => S - b), z = [];
        for (let S = 1; S < w.length; S++) {
          const b = w[S] - w[S - 1];
          b > i && z.push({ at: (w[S] + w[S - 1]) / 2, size: b });
        }
        return z.sort((S, b) => b.size - S.size);
      };
      let P, x = 0;
      for (const g of F) {
        const w = G(g);
        !w.length || w[0].size <= x || w[0].size <= T(g) || (x = w[0].size, s(g, w[0].at, C) && (P = { n: g, cuts: [w[0].at] }));
      }
      if (!P) {
        h.push(M);
        continue;
      }
      y = !0;
      const { n: V, cuts: N } = P, E = Array.from({ length: N.length + 1 }, () => []);
      for (const g of M.hits) {
        const w = W(g, V);
        let z = 0;
        for (; z < N.length && w >= N[z]; ) z++;
        E[z].push(g);
      }
      E.forEach(
        (g, w) => h.push({
          hits: g,
          limits: [
            ...M.limits,
            {
              n: V,
              from: w ? N[w - 1] : -1 / 0,
              to: w < N.length ? N[w] : 1 / 0
            }
          ]
        })
      );
    }
    if (d = h, y && p === 11 && (m = !0), !y) break;
  }
  return { zones: d, crowded: m };
}
function me(t, e, n) {
  return n.every(({ n: s, from: a, to: o }) => {
    let i = 1 / 0, r = -1 / 0;
    for (let d = 0; d < 9; d += 3) {
      const m = Mt(t, e, d) * s[0] + Mt(t, e, d + 1) * s[1] + Mt(t, e, d + 2) * s[2];
      m < i && (i = m), m > r && (r = m);
    }
    return r >= a && i <= o;
  });
}
function he(t, e, n, s, a, o, i, r, d, m, p, h = !1) {
  let y = !1;
  const M = (N) => {
    let E = -1 / 0, g = 1 / 0;
    const w = (z) => {
      z > E && (E = z), z < g && (g = z);
    };
    for (const z of d) w(W(z, N));
    for (const [z, S, b] of [
      [t, n, 1],
      [e, s, 0]
    ]) {
      const k = Math.max(1, Math.floor(S.length / 32));
      k > 1 && (y = !0);
      for (let L = 0; L < S.length; L += k)
        for (const R of bt(z, S[L])) p(b, R) && w(W(R, N));
    }
    return Number.isFinite(E) && Number.isFinite(g) ? E - g : 0;
  }, A = (N) => {
    let E = 1 / 0, g = -1 / 0;
    for (let w = 0; w < 8; w++) {
      const z = (w & 1 ? i.max[0] : i.min[0]) * N[0] + (w & 2 ? i.max[1] : i.min[1]) * N[1] + (w & 4 ? i.max[2] : i.min[2]) * N[2];
      z < E && (E = z), z > g && (g = z);
    }
    return [E, g];
  }, C = (N, E, g, w, z) => {
    let S = 1 / 0, b = -1 / 0;
    for (const k of E) {
      let L = 1 / 0, R = -1 / 0;
      for (let Z = 0; Z < 9; Z += 3) {
        const Y = Mt(N, k, Z) * g[0] + Mt(N, k, Z + 1) * g[1] + Mt(N, k, Z + 2) * g[2];
        Y < L && (L = Y), Y > R && (R = Y);
      }
      R < w || L > z || (L < w && (L = w), R > z && (R = z), L < S && (S = L), R > b && (b = R));
    }
    return S === 1 / 0 ? void 0 : [S, b];
  };
  if (i.min.some((N, E) => i.max[E] - N <= 0))
    return { width: 0, thin: !1, approximate: !1 };
  const F = Math.ceil((n.length + s.length) / 4096), D = [
    ...a,
    ...F > 1 ? o.filter((N, E) => E < 3 || E % F === 0) : o
  ];
  F > 1 && D.length < a.length + o.length && (y = !0);
  const _ = (N, E, g, w, z) => {
    const S = (L) => Et(r, g, L - W(r, g));
    if (!E) return p(N, S((w + z) / 2)) ? [w, z] : void 0;
    let [b, k] = E;
    return b > w && p(N, S((w + b) / 2)) && (b = w), k < z && p(N, S((k + z) / 2)) && (k = z), [b, k];
  }, T = (N, E) => N && E ? Math.min(N[1], E[1]) - Math.max(N[0], E[0]) : 0;
  let G = 1 / 0, P = !1, x = !1, V = 0;
  for (let N = 0; N < D.length; N++) {
    const E = D[N], [g, w] = A(E), z = C(t, n, E, g, w), S = C(e, s, E, g, w);
    let b = T(z, S);
    if (b <= 0 && (V++ < 32 ? b = T(_(0, z, E, g, w), _(1, S, E, g, w)) : y = !0), h && d.length > 1) {
      let k = 1 / 0, L = -1 / 0;
      for (const R of d) {
        const Z = W(R, E);
        k = Math.min(k, Z), L = Math.max(L, Z);
      }
      b = Math.max(b, L - k);
    }
    if (b <= m && (N < a.length && V < 40 && (V++, b = M(E)), b <= m)) {
      N < a.length && (x = !0);
      continue;
    }
    P = !0, b < G && (G = b);
  }
  return {
    width: P && Number.isFinite(G) ? G : 0,
    thin: x,
    approximate: y
  };
}
function Ye(t, e) {
  const n = At(t);
  if (!n) return !0;
  const s = [0, 0, 0];
  for (let i = 0; i < n; i++)
    for (let r = 0; r < 9; r += 3)
      for (let d = 0; d < 3; d++) s[d] += Mt(t, i, r + d);
  for (let i = 0; i < 3; i++) s[i] /= n * 3;
  let a = 0, o = 0;
  for (let i = 0; i < n; i++) {
    const r = bt(t, i), d = U(r[0], s), m = U(r[1], s), p = U(r[2], s);
    a += W(d, xt(m, p)) / 6, o += K(xt(U(r[1], r[0]), U(r[2], r[0]))) / 2;
  }
  return Math.abs(a) <= e * o;
}
const Ft = (t) => Math.max(1e-10, Math.max(1, ...t.bounds.min.map(Math.abs), ...t.bounds.max.map(Math.abs)) * Number.EPSILON * 64);
async function Ze(t, e, n) {
  const s = Ft(t), a = At(t), o = { closed: !1, approximate: !1 };
  if (t.closed && !Ye(t, s)) return { closed: !0, approximate: !1 };
  const i = new Uint32Array(a), r = new Uint8Array(a), d = new Uint8Array(a), m = new Uint8Array(a);
  for (let g = 0; g < a; g++) i[g] = g;
  const p = (g) => {
    if (i[g] !== g) {
      const w = i[g];
      i[g] = p(w), d[g] ^= d[w];
    }
    return i[g];
  }, h = (g, w, z) => {
    let S = p(g), b = p(w);
    const k = d[g] ^ d[w] ^ z;
    return S === b ? k === 0 : (r[S] < r[b] && ([S, b] = [b, S]), i[b] = S, d[b] = k, r[S] === r[b] && r[S]++, !0);
  }, y = /* @__PURE__ */ new Map(), M = [], A = /* @__PURE__ */ new Map(), C = a * 3, F = C * C <= Number.MAX_SAFE_INTEGER, D = (g, w) => F ? g * C + w : `${g},${w}`, _ = (g, w) => {
    const z = g.map((b, k) => Math.round((b - t.bounds.min[k]) / s)).join(",");
    let S = y.get(z);
    return S === void 0 && (S = y.size, y.set(z, S), M.push(w)), S;
  };
  for (let g = 0; g < a; g++) {
    g % 2048 === 0 && await e();
    const w = bt(t, g);
    if (K(xt(U(w[1], w[0]), U(w[2], w[0]))) <= s * s) continue;
    const z = w.map((S, b) => _(S, g * 3 + b));
    if (new Set(z).size === 3) {
      m[g] = 1;
      for (let S = 0; S < 3; S++) {
        const b = z[S], k = z[(S + 1) % 3], L = b < k, R = L ? D(b, k) : D(k, b), Z = A.get(R);
        if (Z === void 0) A.set(R, (g + 1) * (L ? 1 : -1));
        else {
          if (Z === 0 || !h(g, Math.abs(Z) - 1, +(Z > 0 === L))) return o;
          A.set(R, 0);
        }
      }
    }
  }
  const T = (g) => {
    const w = M[g];
    return [0, 1, 2].map((z) => Mt(t, Math.floor(w / 3), w % 3 * 3 + z));
  }, G = [];
  for (const [g, w] of A) if (w !== 0) {
    const z = typeof g == "number" ? [Math.floor(g / C), g % C] : g.split(",").map(Number), S = T(z[0]), b = T(z[1]);
    G.push({ p: S, q: b, face: w, bounds: Ut([...S, ...b]) }), G.length % 2048 === 0 && await e();
  }
  y.clear(), A.clear(), M.length = 0;
  let P = !1;
  if (G.length) {
    const g = Math.max(s, Math.min(1e-5, n)), w = Ht(G, G.map((z, S) => S));
    for (let z = 0; z < G.length; z++) {
      z % 128 === 0 && await e();
      const S = G[z], b = U(S.q, S.p), k = K(b), L = Tt(b), R = [];
      for (const Y of Pt(w, S.bounds, g)) {
        if (z === Y) continue;
        const lt = G[Y], q = U(lt.p, S.p), Q = U(lt.q, S.p), X = W(q, L), tt = W(Q, L), gt = Math.max(0, Math.min(X, tt)), at = Math.min(k, Math.max(X, tt));
        if (at - gt <= s) continue;
        const jt = Math.max(K(Et(q, L, -X)), K(Et(Q, L, -tt)));
        if (jt > g) continue;
        const yt = tt > X == (S.face > 0 == lt.face > 0);
        if (!h(Math.abs(S.face) - 1, Math.abs(lt.face) - 1, Number(yt))) return o;
        jt > s && (P = !0), R.push([gt, at]);
      }
      R.sort((Y, lt) => Y[0] - lt[0]);
      let Z = 0;
      for (const [Y, lt] of R) {
        if (Math.abs(Y - Z) > s) return o;
        Z = lt;
      }
      if (Math.abs(Z - k) > s) return o;
    }
  }
  const x = new Float64Array(a), V = new Float64Array(a), N = t.bounds.min.map((g, w) => (g + t.bounds.max[w]) / 2);
  for (let g = 0; g < a; g++) {
    if (g % 2048 === 0 && await e(), !m[g]) continue;
    const w = p(g), z = bt(t, g);
    x[w] += (d[g] ? -1 : 1) * W(U(z[0], N), xt(U(z[1], N), U(z[2], N))) / 6, V[w] += K(xt(U(z[1], z[0]), U(z[2], z[0]))) / 2;
  }
  let E = 0;
  for (let g = 0; g < a; g++) {
    if (V[g] && Math.abs(x[g]) <= s * V[g]) return o;
    E += Math.abs(x[g]);
  }
  return { closed: E > 0, approximate: P };
}
function Qe(t, e, n) {
  const s = U(e[1], e[0]), a = U(e[2], e[0]), o = xt(s, a), i = K(o);
  if (i < 1e-20 || Math.abs(W(U(t, e[0]), o)) / i > n) return !1;
  const r = U(t, e[0]), d = W(s, s), m = W(s, a), p = W(a, a), h = W(r, s), y = W(r, a), M = d * p - m * m;
  if (Math.abs(M) < 1e-30) return !1;
  const A = (h * p - y * m) / M, C = (y * d - h * m) / M, F = n / Math.max(K(s), K(a), n);
  return A >= -F && C >= -F && A + C <= 1 + F;
}
function Xt(t, e, n, s) {
  for (const a of Pt(n, { min: t, max: t }, s))
    if (Qe(t, bt(e, a), s)) return !0;
  return !1;
}
const Ot = (t) => t.closed || t.interior === "winding";
function se(t, e, n, s = !1) {
  const a = (i) => {
    if (i.moment) return i.moment;
    const r = [0, 0, 0];
    if (i.ids)
      for (const d of i.ids) {
        const m = bt(e, d), p = xt(U(m[1], m[0]), U(m[2], m[0]));
        for (let h = 0; h < 3; h++) r[h] += p[h] / 2;
      }
    else {
      const d = a(i.left), m = a(i.right);
      for (let p = 0; p < 3; p++) r[p] = d[p] + m[p];
    }
    return i.moment = r;
  }, o = (i) => {
    const r = i.min.map((y, M) => (y + i.max[M]) / 2), d = U(r, t), m = K(d), p = K(U(i.max, i.min)) / 2;
    if (!s && m > p * 10 && m > 0)
      return W(a(i), d) / (m * m * m);
    if (!i.ids) return o(i.left) + o(i.right);
    let h = 0;
    for (const y of i.ids) {
      const M = bt(e, y), A = U(M[0], t), C = U(M[1], t), F = U(M[2], t), D = K(A), _ = K(C), T = K(F);
      !D || !_ || !T || (h += 2 * Math.atan2(W(A, xt(C, F)), D * _ * T + W(A, C) * T + W(C, F) * D + W(F, A) * _));
    }
    return h;
  };
  return o(n) / (4 * Math.PI);
}
async function We(t, e, n) {
  const s = Ft(t), a = (d) => !Xt(d, t, e, s) && Math.abs(se(d, t, e)) > 0.9, o = t.bounds.min.map((d, m) => (d + t.bounds.max[m]) / 2);
  if (a(o)) return !0;
  const i = At(t), r = Math.max(1, Math.ceil(i / 32));
  for (let d = 0; d < i; d += r) {
    await n();
    const m = bt(t, d), p = Tt(xt(U(m[1], m[0]), U(m[2], m[0])));
    if (!p) continue;
    const h = [0, 1, 2].map((M) => (m[0][M] + m[1][M] + m[2][M]) / 3), y = Math.max(s * 8, Math.min(K(U(m[0], m[1])), K(U(m[1], m[2])), K(U(m[2], m[0]))) * 0.01);
    if (a(Et(h, p, y)) || a(Et(h, p, -y))) return !0;
  }
  return !1;
}
function Lt(t, e, n, s) {
  if (!Ot(e) || t.some((h, y) => h < e.bounds.min[y] - s || h > e.bounds.max[y] + s) || Xt(t, e, n, s)) return !1;
  if (e.interior === "winding") {
    const h = Math.abs(se(t, e, n));
    return Math.abs(h - 0.5) < 0.05 ? Math.abs(se(t, e, n, !0)) > 0.5 : h > 0.5;
  }
  const a = [1, 0.371390676, 0.52999894], o = K(U(e.bounds.max, e.bounds.min)) * 3 + 1, i = Et(t, a, o), r = [], d = Ut([...t, ...i]);
  for (const h of Pt(n, d, s)) {
    const y = Rt(t, i, bt(e, h), s);
    if (y) {
      const M = K(U(y, t));
      M > s && r.push(M);
    }
  }
  r.sort((h, y) => h - y);
  let m = 0, p = -1 / 0;
  for (const h of r)
    h - p > s * 2 && (m++, p = h);
  return m % 2 === 1;
}
const re = (t) => /отвод|тройник|муфт|фитинг|elbow|fitting|tee\b/i.test(t.name);
async function Ve(t, e) {
  if (re(t)) return;
  const n = At(t), s = Math.max(1, Math.ceil(n / 4096)), a = t.bounds.min.map((E, g) => (E + t.bounds.max[g]) / 2), o = [], i = [];
  for (let E = 0; E < n; E += s) {
    E % (s * 256) === 0 && await e();
    const g = bt(t, E), w = xt(U(g[1], g[0]), U(g[2], g[0])), z = K(w);
    z && (o.push(...g), i.push({ n: w.map((S) => S / z), area: z }));
  }
  if (o.length < 12) return;
  let r = Zt(o, a)[0];
  const d = i.filter(({ n: E }) => Math.abs(W(E, r)) < 0.2);
  if (d.length < 4) return;
  const m = Zt(d.map(({ n: E }) => E), [0, 0, 0])[2];
  if (Math.abs(W(m, r)) < 0.98) return;
  r = m;
  const p = r.map(Math.abs).indexOf(Math.max(...r.map(Math.abs)));
  r[p] < 0 && (r = r.map((E) => -E));
  const h = Math.abs(r[0]) < 0.7 ? [1, 0, 0] : [0, 1, 0], y = Tt(xt(r, h)), M = xt(r, y), A = [1 / 0, 1 / 0, 1 / 0], C = [-1 / 0, -1 / 0, -1 / 0];
  for (const E of o) for (const [g, w] of [r, y, M].entries()) {
    const z = W(U(E, a), w);
    A[g] = Math.min(A[g], z), C[g] = Math.max(C[g], z);
  }
  const F = C[0] - A[0], D = Math.max(C[1] - A[1], C[2] - A[2]), _ = Math.min(C[1] - A[1], C[2] - A[2]);
  if (_ <= Ft(t) * 8 || F + Ft(t) < D * 4 || D > _ * 4) return;
  let T = 0, G = 0;
  const P = /* @__PURE__ */ new Set();
  for (const { n: E, area: g } of i) {
    const w = Math.abs(W(E, r));
    G += g, (w < 0.015 || w > 0.999) && (T += g), w < 0.015 && P.add(E.map((z) => Math.round(z * 100)).join(","));
  }
  if (T < G * 0.995) return;
  const x = [];
  for (let E = 0; E < o.length; E += 3) {
    const g = o.slice(E, E + 3).map((w) => W(U(w, a), r));
    x.push([Math.min(...g), Math.max(...g)]);
  }
  x.sort((E, g) => E[0] - g[0]);
  let V = A[0];
  for (const [E, g] of x) {
    if (E > V + Ft(t) * 4) return;
    V = Math.max(V, g);
  }
  const N = Et(Et(a, y, (A[1] + C[1]) / 2), M, (A[2] + C[2]) / 2);
  return {
    axis: r,
    centre: N,
    from: A[0],
    to: C[0],
    width: D,
    round: P.size >= 6 && D < _ * 1.2,
    sampled: s > 1
  };
}
async function Je(t, e) {
  const n = At(t), s = Int32Array.from({ length: n }, (d, m) => m), a = new Uint8Array(n), o = /* @__PURE__ */ new Map(), i = Ft(t), r = (d) => {
    for (; s[d] !== d; )
      s[d] = s[s[d]], d = s[d];
    return d;
  };
  for (let d = 0; d < n; d++) {
    d % 2048 === 0 && await e();
    for (const m of bt(t, d)) {
      const p = m.map((A, C) => Math.round((A - t.bounds.min[C]) / i)).join(","), h = o.get(p);
      if (h === void 0) {
        o.set(p, d);
        continue;
      }
      let y = r(d), M = r(h);
      y !== M && (a[y] < a[M] && ([y, M] = [M, y]), s[M] = y, a[y] === a[M] && a[y]++);
    }
  }
  for (let d = 0; d < n; d++) s[d] = r(d);
  return s;
}
async function He(t, e, n, s, a) {
  const { axis: o, centre: i } = t, r = Math.abs(o[0]) < 0.7 ? [1, 0, 0] : [0, 1, 0], d = Tt(xt(o, r)), m = xt(o, d), p = [1 / 0, 1 / 0, 1 / 0], h = [-1 / 0, -1 / 0, -1 / 0], y = Ft(e);
  for (let P = 0; P < At(e); P++) {
    P % 2048 === 0 && await s();
    for (const x of bt(e, P)) for (const [V, N] of [o, d, m].entries()) {
      const E = W(U(x, i), N);
      p[V] = Math.min(p[V], E), h[V] = Math.max(h[V], E);
    }
  }
  if (h[1] - p[1] < t.width * 2.5 || h[2] - p[2] < t.width * 2.5) return;
  const M = Math.max(1, h[0] - p[0]), A = Et(i, o, p[0] - M), C = Et(i, o, h[0] + M), F = [];
  let D = 0;
  for (const P of Pt(n, Ut([...A, ...C]), y)) {
    ++D % 256 === 0 && await s();
    const x = Rt(A, C, bt(e, P), y);
    x && F.push({ triangle: P, at: W(U(x, i), o) });
  }
  if (F.length < 2) return;
  const _ = await a(), T = /* @__PURE__ */ new Map();
  for (const P of F) {
    const x = _[P.triangle], V = T.get(x);
    V ? (V[0] = Math.min(V[0], P.at), V[1] = Math.max(V[1], P.at)) : T.set(x, [P.at, P.at]);
  }
  let G = 0;
  for (const [P, x] of T.values())
    x - P > y && (G = Math.max(G, Math.min(t.to, x) - Math.max(t.from, P)));
  return G > y ? G * 1e3 : void 0;
}
async function Xe(t, e, n, s, a) {
  const o = e.precision / 1e3;
  if (!Number.isFinite(o) || o <= 0)
    throw Error("Точность расчёта должна быть положительным числом.");
  const i = t.filter((b) => e.includeHidden || !b.hidden), r = i.filter((b) => Gt(b, e.a)), d = i.filter((b) => Gt(b, e.b));
  if (!r.length || !d.length)
    throw Error(
      "Выборка А или Б не содержит элементов. Отметьте хотя бы одну модель в каждой стороне проверки."
    );
  let m = performance.now();
  const p = async () => {
    if (s())
      throw Error("Расчёт отменён. Предыдущие результаты сохранены.");
    performance.now() - m > 16 && (await new Promise((b) => setTimeout(b, 0)), m = performance.now());
  }, h = /* @__PURE__ */ new Map(), y = (b) => {
    let k = h.get(b.id);
    return k || (k = ae(
      b,
      Array.from({ length: At(b) }, (L, R) => R)
    ), h.set(b.id, k)), k;
  }, M = /* @__PURE__ */ new Map(), A = /* @__PURE__ */ new Map(), C = /* @__PURE__ */ new Map(), F = async (b) => {
    let k = C.get(b.id);
    return k || (k = await Je(b, p), C.set(b.id, k)), k;
  }, D = async (b) => (A.has(b.id) || A.set(b.id, await Ve(b, p)), A.get(b.id)), _ = async (b) => {
    if (e.type !== "intersection") return b;
    let k = M.get(b.id);
    return k === void 0 && (k = await Ze(b, p, o), !k.closed && await We(b, y(b), p) && (k = { closed: !1, approximate: !0, winding: !0 }), M.set(b.id, k)), k.winding ? { ...b, closed: !1, interior: "winding" } : k.closed === b.closed ? b : { ...b, closed: k.closed };
  }, T = /* @__PURE__ */ new Map(), G = async (b) => {
    let k = T.get(b.id);
    if (k !== void 0) return k;
    const L = [];
    for (let R = 0; R < At(b); R++)
      L.push(
        [0, 3, 6].map(
          (Z) => [0, 1, 2].map((Y) => Math.round(Mt(b, R, Z + Y) / o)).join(",")
        ).sort().join(";")
      ), R % 9e3 === 0 && await p();
    return k = L.sort().join("|"), T.set(b.id, k), k;
  }, P = [], x = new Set(r.map((b) => b.id)), V = new Set(d.map((b) => b.id)), N = Ht(
    d,
    d.map((b, k) => k)
  ), E = /* @__PURE__ */ new Map();
  let g = 0;
  const w = (b) => b.triangles.byteLength + (b.vertices?.byteLength || 0) + (b.indices?.byteLength || 0) + At(b) * 32;
  async function z(b, k) {
    if (!a) return b;
    let L = E.get(b.id);
    if (L)
      return E.delete(b.id), E.set(b.id, L), L;
    for (const [R, Z] of E)
      R !== k && g > 96 * 1024 * 1024 && (E.delete(R), g -= w(Z), h.delete(R), C.delete(R), T.delete(R));
    return L = await a(b.id), E.set(b.id, L), g += w(L), L;
  }
  let S = -1 / 0;
  for (let b = 0; b < r.length; b++) {
    const k = r[b];
    performance.now() - S > 150 && (S = performance.now(), n({
      phase: "Проверка пар",
      done: b,
      total: r.length,
      found: P.length
    }));
    const L = [...Pt(N, k.bounds, o)];
    for (let R = 0; R < L.length; R++) {
      const Z = L[R];
      performance.now() - S > 150 && (S = performance.now(), n({
        phase: `Проверка пар · A ${b + 1}/${r.length} · кандидаты ${R + 1}/${L.length}`,
        done: b,
        total: r.length,
        found: P.length
      }));
      const Y = d[Z];
      if (await p(), k.id === Y.id || !Yt(k.bounds, Y.bounds, o) || e.ignoreSameModel && k.modelId === Y.modelId || e.ignoreSameGroup && k.modelId === Y.modelId && k.properties.Объект && k.properties.Объект === Y.properties.Объект || e.equalProperty && k.properties[e.equalProperty] !== void 0 && k.properties[e.equalProperty] === Y.properties[e.equalProperty] || k.id > Y.id && x.has(Y.id) && V.has(k.id)) continue;
      const lt = De(k.id, Y.id), q = await _(await z(k)), Q = await _(await z(Y, k.id));
      let X, tt = "surface", gt = 0, at, jt, yt, qt;
      if (e.type === "duplicates") {
        if (At(q) !== At(Q) || q.bounds.min.some(
          (rt, it) => Math.abs(rt - Q.bounds.min[it]) > o || Math.abs(q.bounds.max[it] - Q.bounds.max[it]) > o
        ))
          continue;
        await G(q) === await G(Q) && (X = q.bounds.min.map((rt, it) => (rt + q.bounds.max[it]) / 2), tt = "duplicate");
      } else {
        const rt = y(q), it = y(Q), ot = Math.max(
          1,
          ...q.bounds.min.map(Math.abs),
          ...q.bounds.max.map(Math.abs),
          ...Q.bounds.min.map(Math.abs),
          ...Q.bounds.max.map(Math.abs)
        ), mt = Math.max(1e-10, ot * Number.EPSILON * 64), wt = {
          min: q.bounds.min.map(
            (c, f) => Math.max(c, Q.bounds.min[f])
          ),
          max: q.bounds.max.map(
            (c, f) => Math.min(c, Q.bounds.max[f])
          )
        }, ct = wt.min.map(
          (c, f) => (c + wt.max[f]) / 2
        ), nt = new Be(), H = [];
        let kt = 1, _t = 0, Qt = 1 / 0, l = 0;
        for (const [c, f] of $t(rt, it, o)) {
          const u = bt(q, c), v = bt(Q, f);
          if (!Yt(Ut(u.flat()), Ut(v.flat()), o)) continue;
          const $ = Te(u, v, mt, e.touching);
          if ($) {
            const I = K(U($, ct));
            if ((!X || I < Qt) && (X = $, Qt = I), nt.add(u), nt.add(v), _t++ % kt === 0 && (Re(u, v, mt, H), H.length || H.push($), H.length >= 8192)) {
              for (let j = 0; j * 2 < H.length; j++) H[j] = H[j * 2];
              H.length = Math.ceil(H.length / 2), kt *= 2;
            }
          }
          ++l % 256 === 0 && (performance.now() - S > 150 && (S = performance.now(), n({
            phase: `Геометрия пары · A ${b + 1}/${r.length}`,
            done: b,
            total: r.length,
            found: P.length
          })), await p());
        }
        if (!X && Ot(q) && Ot(Q)) {
          const c = ct;
          Lt(c, q, rt, mt) && Lt(c, Q, it, mt) && (X = c, tt = "contained");
        }
        if (!X) {
          for (const [c, f, u] of [
            [q, Q, it],
            [Q, q, rt]
          ])
            if (Ot(f)) {
              for (let v = 0; v < At(c) && !X; v++) {
                const $ = bt(c, v), I = $[0].map(
                  (j, O) => ($[0][O] + $[1][O] + $[2][O]) / 3
                );
                for (const j of [$[0], I])
                  if (Lt(j, f, u, mt)) {
                    X = j, tt = "contained";
                    break;
                  }
                await p();
              }
              if (X) break;
            }
        }
        if (X) {
          const c = (et, st) => [...Pt(st, wt, o)].filter(
            (It) => Yt(Ut(bt(et, It).flat()), wt, o)
          ), f = c(q, rt), u = c(Q, it);
          tt !== "surface" && (nt.addFrom(q, f), nt.addFrom(Q, u)), await p();
          const v = wt.min.map(
            (et, st) => (et + wt.max[st]) / 2
          ), $ = (et, st) => et === 0 ? Lt(st, q, rt, mt) : Lt(st, Q, it, mt), I = (et, st) => et === 0 ? Lt(st, q, rt, mt) || Xt(st, q, rt, mt) : Lt(st, Q, it, mt) || Xt(st, Q, it, mt);
          if (tt === "contained") {
            const et = Math.max(1, Math.ceil((f.length + u.length) / 4096));
            kt = Math.max(kt, et);
            const st = /* @__PURE__ */ new Set();
            for (const [It, ht, ut] of [[q, f, 1], [Q, u, 0]]) {
              for (let vt = 0; vt < ht.length; vt += et) {
                vt % (et * 32) === 0 && await p();
                for (const St of bt(It, ht[vt])) {
                  const Nt = St.join(",");
                  st.has(Nt) || (st.add(Nt), I(ut, St) && H.push(St));
                }
              }
              st.clear();
            }
            if (q.interior === "winding" || Q.interior === "winding") {
              const It = (ht, ut) => {
                let vt = 1, St = 0;
                for (; ht; ht = Math.floor(ht / ut))
                  vt /= ut, St += vt * (ht % ut);
                return St;
              };
              for (let ht = 1; ht <= 2048; ht++) {
                ht % 16 === 0 && await p();
                const ut = [2, 3, 5].map((vt, St) => wt.min[St] + It(ht, vt) * (wt.max[St] - wt.min[St]));
                $(0, ut) && $(1, ut) && H.push(ut);
              }
            }
          }
          const j = (et, st, It) => Ot(q) && Ot(Q) && It.every((ht) => {
            const ut = Et(ht, et, st - W(ht, et));
            return !I(0, ut) || !I(1, ut);
          }), O = () => [0, 1, 2].map(
            (et) => H.reduce((st, It) => st + It[et], 0) / H.length
          ), B = tt === "surface" && H.length > 2 ? Zt(H, O())[2] : void 0, J = B ? he(
            q,
            Q,
            f,
            u,
            [B],
            [],
            wt,
            O(),
            H,
            mt,
            $
          ) : void 0, dt = !J || J.width > mt, ft = !dt && !!J?.approximate, Wt = !Ot(q) || !Ot(Q);
          if (!Wt && !dt && !ft && (tt = "touch"), tt === "touch" && !e.touching) continue;
          const { zones: te, crowded: $e } = Ge(H, wt, o, j), Ce = nt.values();
          let Bt = 0, de = !ft, pe = $e || kt > 1 || !!J?.approximate || !!M.get(q.id)?.approximate || !!M.get(Q.id)?.approximate;
          for (const et of tt === "touch" ? [] : te) {
            const st = et.limits.length ? f.filter((vt) => me(q, vt, et.limits)) : f, It = et.limits.length ? u.filter((vt) => me(Q, vt, et.limits)) : u, ht = et.hits.length ? [0, 1, 2].map(
              (vt) => et.hits.reduce((St, Nt) => St + Nt[vt], 0) / et.hits.length
            ) : v, ut = he(
              q,
              Q,
              st,
              It,
              et.hits.length > 2 ? Zt(et.hits, ht) : [],
              Ce,
              wt,
              ht,
              et.hits,
              mt,
              $,
              tt === "contained"
            );
            ut.thin && (de = !1), ut.approximate && (pe = !0), ut.width > Bt && (Bt = ut.width), await p();
          }
          if (Bt *= 1e3, tt === "touch" ? at = void 0 : Wt ? at = "unmeasurable" : Bt <= 0 || !de ? at = "tolerance" : pe && (at = "approximate"), gt = tt === "touch" || at === "unmeasurable" || at === "tolerance" ? 0 : Bt, tt !== "touch" && !re(q) && !re(Q)) {
            const et = await D(q), st = await D(Q);
            for (const [It, ht, ut, vt, St] of [[et, q, Q, st, it], [st, Q, q, et, rt]]) {
              if (!It || vt?.round && /труб|pipe/i.test(ut.name)) continue;
              const Nt = await He(It, ut, St, p, () => F(ut));
              Nt === void 0 || Nt <= (yt ?? 0) || (yt = Nt, qt = ht.id);
            }
            yt !== void 0 && (jt = at === "unmeasurable" || at === "tolerance" ? void 0 : gt, gt = Math.max(gt, yt), (at === "unmeasurable" || at === "tolerance" || et?.sampled || st?.sampled) && (at = "approximate"));
          }
          await p();
        }
        if (X && !Ie({ kind: tt, depth: at, penetrationMm: gt }, e.minPenetration, e.precision))
          continue;
      }
      if (X && (P.push({
        id: lt,
        a: ue(q),
        b: ue(Q),
        point: X,
        kind: tt,
        state: "new",
        note: "",
        assignee: "",
        firstSeen: "",
        lastSeen: "",
        penetrationMm: gt,
        ...yt !== void 0 ? { axialPenetrationMm: yt, axialElementId: qt, overlapThicknessMm: jt } : {},
        ...at ? { depth: at } : {}
      }), P.length >= 5e4))
        throw Error(
          "Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат."
        );
    }
  }
  return n({
    phase: "Готово",
    done: r.length,
    total: r.length,
    found: P.length
  }), P;
}
const je = '(function(){"use strict";const Vt=(t,n,i)=>t.kind==="duplicate"||t.depth==="unmeasurable"||t.depth==="tolerance"||(t.penetrationMm??0)+i>=n,Kt=({triangles:t,vertices:n,indices:i,triangleCount:u,closed:a,bounds:c,...o})=>o;function kt(t,n){return n.exclude.includes(t.id)?!1:n.include.includes(t.id)?!0:!(n.manualOnly||n.modelsMode==="selected"&&!n.models.includes(t.modelId)||n.modelsMode===void 0&&n.models.length&&!n.models.includes(t.modelId))}const tn=(t,n)=>JSON.stringify([t,n].sort()),b=(t,n)=>[t[0]-n[0],t[1]-n[1],t[2]-n[2]],rt=(t,n,i=1)=>[t[0]+n[0]*i,t[1]+n[1]*i,t[2]+n[2]*i],E=(t,n)=>t[0]*n[0]+t[1]*n[1]+t[2]*n[2],X=(t,n)=>[t[1]*n[2]-t[2]*n[1],t[2]*n[0]-t[0]*n[2],t[0]*n[1]-t[1]*n[0]],z=t=>Math.hypot(...t),It=t=>{const n=z(t);return n>1e-20?[t[0]/n,t[1]/n,t[2]/n]:void 0},ft=t=>t.triangleCount??(t.indices?t.indices.length/3:t.triangles.length/9),tt=(t,n,i)=>t.indices&&t.vertices?t.vertices[t.indices[n*3+Math.floor(i/3)]*3+i%3]:t.triangles[n*9+i],J=(t,n)=>[0,3,6].map(i=>[tt(t,n,i),tt(t,n,i+1),tt(t,n,i+2)]);function jt(t){const n=[1/0,1/0,1/0],i=[-1/0,-1/0,-1/0];for(let u=0;u<t.length;u++){const a=u%3;n[a]=Math.min(n[a],t[u]),i[a]=Math.max(i[a],t[u])}return{min:n,max:i}}const Et=(t,n,i)=>t.min.every((u,a)=>u<=n.max[a]+i&&t.max[a]>=n.min[a]-i);function $t(t,n){const i={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const e of n)for(let s=0;s<9;s++){const h=s%3,l=tt(t,e,s);i.min[h]=Math.min(i.min[h],l),i.max[h]=Math.max(i.max[h],l)}if(n.length<=12)return{...i,ids:n};const u=i.max.map((e,s)=>e-i.min[s]),a=u.indexOf(Math.max(...u)),c=e=>tt(t,e,a)+tt(t,e,a+3)+tt(t,e,a+6);n.sort((e,s)=>c(e)-c(s));const o=n.length>>1;return{...i,left:$t(t,n.slice(0,o)),right:$t(t,n.slice(o))}}function*gt(t,n,i){Et(t,n,i)&&(t.ids?yield*t.ids:(yield*gt(t.left,n,i),yield*gt(t.right,n,i)))}function*dt(t,n,i){if(Et(t,n,i)){if(t.ids&&n.ids){for(const u of t.ids)for(const a of n.ids)yield[u,a];return}if(t.ids){yield*dt(t,n.left,i),yield*dt(t,n.right,i);return}if(n.ids){yield*dt(t.left,n,i),yield*dt(t.right,n,i);return}yield*dt(t.left,n.left,i),yield*dt(t.left,n.right,i),yield*dt(t.right,n.left,i),yield*dt(t.right,n.right,i)}}function Ot(t,n){const i={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const o of n)for(let e=0;e<3;e++)i.min[e]=Math.min(i.min[e],t[o].bounds.min[e]),i.max[e]=Math.max(i.max[e],t[o].bounds.max[e]);if(n.length<=16)return{...i,ids:n};const u=i.max.map((o,e)=>o-i.min[e]),a=u.indexOf(Math.max(...u));n.sort((o,e)=>t[o].bounds.min[a]+t[o].bounds.max[a]-(t[e].bounds.min[a]+t[e].bounds.max[a]));const c=n.length>>1;return{...i,left:Ot(t,n.slice(0,c)),right:Ot(t,n.slice(c))}}function qt(t,n,i,u){const a=b(n,t),c=b(i[1],i[0]),o=b(i[2],i[0]),e=X(a,o),s=E(c,e);if(Math.abs(s)<=1e-12*z(a)*z(c)*z(o))return;const h=1/s,l=b(t,i[0]),p=E(l,e)*h,g=X(l,c),w=E(a,g)*h,v=E(o,g)*h,I=u/Math.max(z(c),z(o),u);if(p>=-I&&w>=-I&&p+w<=1+I&&v>=-I&&v<=1+I)return rt(t,a,Math.max(0,Math.min(1,v)))}function nn(t,n,i,u){const a=i.map(Math.abs).indexOf(Math.max(...i.map(Math.abs))),c=[0,1,2].filter(s=>s!==a),o=(s,h,l)=>(h[c[0]]-s[c[0]])*(l[c[1]]-s[c[1]])-(h[c[1]]-s[c[1]])*(l[c[0]]-s[c[0]]),e=(s,h)=>{const l=h.map((p,g)=>o(p,h[(g+1)%3],s));return l.every(p=>p>=-u*z(i))||l.every(p=>p<=u*z(i))};for(const s of t)if(e(s,n))return s;for(const s of n)if(e(s,t))return s;for(let s=0;s<3;s++)for(let h=0;h<3;h++){const l=t[s],p=t[(s+1)%3],g=n[h],w=n[(h+1)%3],v=b(p,l),I=b(w,g),O=v[c[0]]*I[c[1]]-v[c[1]]*I[c[0]];if(Math.abs(O)<1e-18)continue;const F=b(g,l),k=(F[c[0]]*I[c[1]]-F[c[1]]*I[c[0]])/O,L=(F[c[0]]*v[c[1]]-F[c[1]]*v[c[0]])/O;if(k>=0&&k<=1&&L>=0&&L<=1)return rt(l,v,k)}}function en(t,n,i,u){for(let a=0;a<3;a++){const c=qt(t[a],t[(a+1)%3],n,i);c&&u.push(c);const o=qt(n[a],n[(a+1)%3],t,i);o&&u.push(o)}}function on(t,n,i,u){const a=X(b(t[1],t[0]),b(t[2],t[0])),c=X(b(n[1],n[0]),b(n[2],n[0])),o=z(a),e=z(c);if(o<1e-20||e<1e-20)return;const s=n.map(l=>E(b(l,t[0]),a)/o),h=t.map(l=>E(b(l,n[0]),c)/e);if(!(s.every(l=>l>i)||s.every(l=>l<-i)||h.every(l=>l>i)||h.every(l=>l<-i))){if(s.every(l=>Math.abs(l)<=i)&&h.every(l=>Math.abs(l)<=i))return u?nn(t,n,a,i):void 0;if(!(!u&&(!(Math.min(...s)<-i&&Math.max(...s)>i)||!(Math.min(...h)<-i&&Math.max(...h)>i))))for(let l=0;l<3;l++){const p=qt(t[l],t[(l+1)%3],n,i);if(p)return p;const g=qt(n[l],n[(l+1)%3],t,i);if(g)return g}}}class sn{world=[[1,0,0],[0,1,0],[0,0,1]];items=new Map;step=1e4;key(n){return n.map(i=>Math.round(i*this.step)).join(",")}add(n){const i=It(X(b(n[1],n[0]),b(n[2],n[0])));if(!i)return;const a=i[0]<-1e-9||Math.abs(i[0])<=1e-9&&(i[1]<-1e-9||Math.abs(i[1])<=1e-9&&i[2]<0)?[-i[0],-i[1],-i[2]]:[i[0],i[1],i[2]],c=this.key(a);for(this.items.has(c)||this.items.set(c,a);this.items.size>512&&this.step>10;){this.step/=10;const o=new Map;for(const e of this.items.values()){const s=this.key(e);o.has(s)||o.set(s,e)}this.items=o}}addFrom(n,i){for(const u of i)this.add(J(n,u))}values(){return[...this.world,...[...this.items].sort((n,i)=>n[0]<i[0]?-1:1).map(([,n])=>n)]}}function Pt(t,n){const i=[[0,0,0],[0,0,0],[0,0,0]];for(const a of t){const c=[a[0]-n[0],a[1]-n[1],a[2]-n[2]];for(let o=0;o<3;o++)for(let e=0;e<3;e++)i[o][e]+=c[o]*c[e]}const u=[[1,0,0],[0,1,0],[0,0,1]];for(let a=0;a<12;a++){let c=0;for(let o=0;o<3;o++)for(let e=o+1;e<3;e++)c+=i[o][e]*i[o][e];if(c<=1e-30)break;for(let o=0;o<3;o++)for(let e=o+1;e<3;e++){if(Math.abs(i[o][e])<=1e-30)continue;const s=(i[e][e]-i[o][o])/(2*i[o][e]),h=(s>=0?1:-1)/(Math.abs(s)+Math.sqrt(s*s+1)),l=1/Math.sqrt(h*h+1),p=h*l;for(const g of[i,u])for(let w=0;w<3;w++){const v=g[w][o],I=g[w][e];g[w][o]=l*v-p*I,g[w][e]=p*v+l*I}for(let g=0;g<3;g++){const w=i[o][g],v=i[e][g];i[o][g]=l*w-p*v,i[e][g]=p*w+l*v}}}return[0,1,2].sort((a,c)=>i[c][c]-i[a][a]).map(a=>It([u[0][a],u[1][a],u[2][a]])).filter(a=>!!a)}function rn(t,n,i,u){const a=n.min.map((l,p)=>(l+n.max[p])/2),c=z(b(n.max,n.min)),o=Math.max(i*10,c/50),e=l=>[0,1,2].map(p=>l.reduce((g,w)=>g+w[p],0)/l.length);let s=[{hits:t,limits:[]}],h=!1;for(let l=0;l<12;l++){const p=[];let g=!1;for(const w of s){if(w.hits.length<2){p.push(w);continue}if(p.length+s.length>=64){h=!0,p.push(w);continue}const v=e(w.hits),I=[v,a,...[0,.25,.5,.75].map(r=>w.hits[Math.floor(r*(w.hits.length-1))])],O=[[1,0,0],[0,1,0],[0,0,1]],F=Pt(w.hits,v);F[0]&&O.push(F[0]);const k=r=>{let m=-1/0,d=1/0;for(const y of w.hits){const f=E(y,r);f>m&&(m=f),f<d&&(d=f)}return m-d},L=r=>Math.max(0,...F.filter(m=>Math.abs(E(m,r))<.9).map(m=>k(m))),$=r=>{const m=w.hits.map(y=>E(y,r)).sort((y,f)=>y-f),d=[];for(let y=1;y<m.length;y++){const f=m[y]-m[y-1];f>o&&d.push({at:(m[y]+m[y-1])/2,size:f})}return d.sort((y,f)=>f.size-y.size)};let P,C=0;for(const r of O){const m=$(r);!m.length||m[0].size<=C||m[0].size<=L(r)||(C=m[0].size,u(r,m[0].at,I)&&(P={n:r,cuts:[m[0].at]}))}if(!P){p.push(w);continue}g=!0;const{n:T,cuts:j}=P,M=Array.from({length:j.length+1},()=>[]);for(const r of w.hits){const m=E(r,T);let d=0;for(;d<j.length&&m>=j[d];)d++;M[d].push(r)}M.forEach((r,m)=>p.push({hits:r,limits:[...w.limits,{n:T,from:m?j[m-1]:-1/0,to:m<j.length?j[m]:1/0}]}))}if(s=p,g&&l===11&&(h=!0),!g)break}return{zones:s,crowded:h}}function Dt(t,n,i){return i.every(({n:u,from:a,to:c})=>{let o=1/0,e=-1/0;for(let s=0;s<9;s+=3){const h=tt(t,n,s)*u[0]+tt(t,n,s+1)*u[1]+tt(t,n,s+2)*u[2];h<o&&(o=h),h>e&&(e=h)}return e>=a&&o<=c})}function Gt(t,n,i,u,a,c,o,e,s,h,l,p=!1){let g=!1;const w=j=>{let M=-1/0,r=1/0;const m=d=>{d>M&&(M=d),d<r&&(r=d)};for(const d of s)m(E(d,j));for(const[d,y,f]of[[t,i,1],[n,u,0]]){const x=Math.max(1,Math.floor(y.length/32));x>1&&(g=!0);for(let q=0;q<y.length;q+=x)for(const S of J(d,y[q]))l(f,S)&&m(E(S,j))}return Number.isFinite(M)&&Number.isFinite(r)?M-r:0},v=j=>{let M=1/0,r=-1/0;for(let m=0;m<8;m++){const d=(m&1?o.max[0]:o.min[0])*j[0]+(m&2?o.max[1]:o.min[1])*j[1]+(m&4?o.max[2]:o.min[2])*j[2];d<M&&(M=d),d>r&&(r=d)}return[M,r]},I=(j,M,r,m,d)=>{let y=1/0,f=-1/0;for(const x of M){let q=1/0,S=-1/0;for(let D=0;D<9;D+=3){const K=tt(j,x,D)*r[0]+tt(j,x,D+1)*r[1]+tt(j,x,D+2)*r[2];K<q&&(q=K),K>S&&(S=K)}S<m||q>d||(q<m&&(q=m),S>d&&(S=d),q<y&&(y=q),S>f&&(f=S))}return y===1/0?void 0:[y,f]};if(o.min.some((j,M)=>o.max[M]-j<=0))return{width:0,thin:!1,approximate:!1};const O=Math.ceil((i.length+u.length)/4096),F=[...a,...O>1?c.filter((j,M)=>M<3||M%O===0):c];O>1&&F.length<a.length+c.length&&(g=!0);const k=(j,M,r,m,d)=>{const y=q=>rt(e,r,q-E(e,r));if(!M)return l(j,y((m+d)/2))?[m,d]:void 0;let[f,x]=M;return f>m&&l(j,y((m+f)/2))&&(f=m),x<d&&l(j,y((x+d)/2))&&(x=d),[f,x]},L=(j,M)=>j&&M?Math.min(j[1],M[1])-Math.max(j[0],M[0]):0;let $=1/0,P=!1,C=!1,T=0;for(let j=0;j<F.length;j++){const M=F[j],[r,m]=v(M),d=I(t,i,M,r,m),y=I(n,u,M,r,m);let f=L(d,y);if(f<=0&&(T++<32?f=L(k(0,d,M,r,m),k(1,y,M,r,m)):g=!0),p&&s.length>1){let x=1/0,q=-1/0;for(const S of s){const D=E(S,M);x=Math.min(x,D),q=Math.max(q,D)}f=Math.max(f,q-x)}if(f<=h&&(j<a.length&&T<40&&(T++,f=w(M)),f<=h)){j<a.length&&(C=!0);continue}P=!0,f<$&&($=f)}return{width:P&&Number.isFinite($)?$:0,thin:C,approximate:g}}function an(t,n){const i=ft(t);if(!i)return!0;const u=[0,0,0];for(let o=0;o<i;o++)for(let e=0;e<9;e+=3)for(let s=0;s<3;s++)u[s]+=tt(t,o,e+s);for(let o=0;o<3;o++)u[o]/=i*3;let a=0,c=0;for(let o=0;o<i;o++){const e=J(t,o),s=b(e[0],u),h=b(e[1],u),l=b(e[2],u);a+=E(s,X(h,l))/6,c+=z(X(b(e[1],e[0]),b(e[2],e[0])))/2}return Math.abs(a)<=n*c}const bt=t=>Math.max(1e-10,Math.max(1,...t.bounds.min.map(Math.abs),...t.bounds.max.map(Math.abs))*Number.EPSILON*64);async function fn(t,n,i){const u=bt(t),a=ft(t),c={closed:!1,approximate:!1};if(t.closed&&!an(t,u))return{closed:!0,approximate:!1};const o=new Uint32Array(a),e=new Uint8Array(a),s=new Uint8Array(a),h=new Uint8Array(a);for(let r=0;r<a;r++)o[r]=r;const l=r=>{if(o[r]!==r){const m=o[r];o[r]=l(m),s[r]^=s[m]}return o[r]},p=(r,m,d)=>{let y=l(r),f=l(m);const x=s[r]^s[m]^d;return y===f?x===0:(e[y]<e[f]&&([y,f]=[f,y]),o[f]=y,s[f]=x,e[y]===e[f]&&e[y]++,!0)},g=new Map,w=[],v=new Map,I=a*3,O=I*I<=Number.MAX_SAFE_INTEGER,F=(r,m)=>O?r*I+m:`${r},${m}`,k=(r,m)=>{const d=r.map((f,x)=>Math.round((f-t.bounds.min[x])/u)).join(",");let y=g.get(d);return y===void 0&&(y=g.size,g.set(d,y),w.push(m)),y};for(let r=0;r<a;r++){r%2048===0&&await n();const m=J(t,r);if(z(X(b(m[1],m[0]),b(m[2],m[0])))<=u*u)continue;const d=m.map((y,f)=>k(y,r*3+f));if(new Set(d).size===3){h[r]=1;for(let y=0;y<3;y++){const f=d[y],x=d[(y+1)%3],q=f<x,S=q?F(f,x):F(x,f),D=v.get(S);if(D===void 0)v.set(S,(r+1)*(q?1:-1));else{if(D===0||!p(r,Math.abs(D)-1,+(D>0===q)))return c;v.set(S,0)}}}}const L=r=>{const m=w[r];return[0,1,2].map(d=>tt(t,Math.floor(m/3),m%3*3+d))},$=[];for(const[r,m]of v)if(m!==0){const d=typeof r=="number"?[Math.floor(r/I),r%I]:r.split(",").map(Number),y=L(d[0]),f=L(d[1]);$.push({p:y,q:f,face:m,bounds:jt([...y,...f])}),$.length%2048===0&&await n()}g.clear(),v.clear(),w.length=0;let P=!1;if($.length){const r=Math.max(u,Math.min(1e-5,i)),m=Ot($,$.map((d,y)=>y));for(let d=0;d<$.length;d++){d%128===0&&await n();const y=$[d],f=b(y.q,y.p),x=z(f),q=It(f),S=[];for(const K of gt(m,y.bounds,r)){if(d===K)continue;const ut=$[K],A=b(ut.p,y.p),_=b(ut.q,y.p),R=E(A,q),H=E(_,q),pt=Math.max(0,Math.min(R,H)),Y=Math.min(x,Math.max(R,H));if(Y-pt<=u)continue;const At=Math.max(z(rt(A,q,-R)),z(rt(_,q,-H)));if(At>r)continue;const yt=H>R==(y.face>0==ut.face>0);if(!p(Math.abs(y.face)-1,Math.abs(ut.face)-1,Number(yt)))return c;At>u&&(P=!0),S.push([pt,Y])}S.sort((K,ut)=>K[0]-ut[0]);let D=0;for(const[K,ut]of S){if(Math.abs(K-D)>u)return c;D=ut}if(Math.abs(D-x)>u)return c}}const C=new Float64Array(a),T=new Float64Array(a),j=t.bounds.min.map((r,m)=>(r+t.bounds.max[m])/2);for(let r=0;r<a;r++){if(r%2048===0&&await n(),!h[r])continue;const m=l(r),d=J(t,r);C[m]+=(s[r]?-1:1)*E(b(d[0],j),X(b(d[1],j),b(d[2],j)))/6,T[m]+=z(X(b(d[1],d[0]),b(d[2],d[0])))/2}let M=0;for(let r=0;r<a;r++){if(T[r]&&Math.abs(C[r])<=u*T[r])return c;M+=Math.abs(C[r])}return{closed:M>0,approximate:P}}function cn(t,n,i){const u=b(n[1],n[0]),a=b(n[2],n[0]),c=X(u,a),o=z(c);if(o<1e-20||Math.abs(E(b(t,n[0]),c))/o>i)return!1;const e=b(t,n[0]),s=E(u,u),h=E(u,a),l=E(a,a),p=E(e,u),g=E(e,a),w=s*l-h*h;if(Math.abs(w)<1e-30)return!1;const v=(p*l-g*h)/w,I=(g*s-p*h)/w,O=i/Math.max(z(u),z(a),i);return v>=-O&&I>=-O&&v+I<=1+O}function Ft(t,n,i,u){for(const a of gt(i,{min:t,max:t},u))if(cn(t,J(n,a),u))return!0;return!1}const Mt=t=>t.closed||t.interior==="winding";function Ct(t,n,i,u=!1){const a=o=>{if(o.moment)return o.moment;const e=[0,0,0];if(o.ids)for(const s of o.ids){const h=J(n,s),l=X(b(h[1],h[0]),b(h[2],h[0]));for(let p=0;p<3;p++)e[p]+=l[p]/2}else{const s=a(o.left),h=a(o.right);for(let l=0;l<3;l++)e[l]=s[l]+h[l]}return o.moment=e},c=o=>{const e=o.min.map((g,w)=>(g+o.max[w])/2),s=b(e,t),h=z(s),l=z(b(o.max,o.min))/2;if(!u&&h>l*10&&h>0)return E(a(o),s)/(h*h*h);if(!o.ids)return c(o.left)+c(o.right);let p=0;for(const g of o.ids){const w=J(n,g),v=b(w[0],t),I=b(w[1],t),O=b(w[2],t),F=z(v),k=z(I),L=z(O);!F||!k||!L||(p+=2*Math.atan2(E(v,X(I,O)),F*k*L+E(v,I)*L+E(I,O)*F+E(O,v)*k))}return p};return c(i)/(4*Math.PI)}async function ln(t,n,i){const u=bt(t),a=s=>!Ft(s,t,n,u)&&Math.abs(Ct(s,t,n))>.9,c=t.bounds.min.map((s,h)=>(s+t.bounds.max[h])/2);if(a(c))return!0;const o=ft(t),e=Math.max(1,Math.ceil(o/32));for(let s=0;s<o;s+=e){await i();const h=J(t,s),l=It(X(b(h[1],h[0]),b(h[2],h[0])));if(!l)continue;const p=[0,1,2].map(w=>(h[0][w]+h[1][w]+h[2][w])/3),g=Math.max(u*8,Math.min(z(b(h[0],h[1])),z(b(h[1],h[2])),z(b(h[2],h[0])))*.01);if(a(rt(p,l,g))||a(rt(p,l,-g)))return!0}return!1}function vt(t,n,i,u){if(!Mt(n)||t.some((p,g)=>p<n.bounds.min[g]-u||p>n.bounds.max[g]+u)||Ft(t,n,i,u))return!1;if(n.interior==="winding"){const p=Math.abs(Ct(t,n,i));return Math.abs(p-.5)<.05?Math.abs(Ct(t,n,i,!0))>.5:p>.5}const a=[1,.371390676,.52999894],c=z(b(n.bounds.max,n.bounds.min))*3+1,o=rt(t,a,c),e=[],s=jt([...t,...o]);for(const p of gt(i,s,u)){const g=qt(t,o,J(n,p),u);if(g){const w=z(b(g,t));w>u&&e.push(w)}}e.sort((p,g)=>p-g);let h=0,l=-1/0;for(const p of e)p-l>u*2&&(h++,l=p);return h%2===1}const Lt=t=>/отвод|тройник|муфт|фитинг|elbow|fitting|tee\\b/i.test(t.name);async function un(t,n){if(Lt(t))return;const i=ft(t),u=Math.max(1,Math.ceil(i/4096)),a=t.bounds.min.map((M,r)=>(M+t.bounds.max[r])/2),c=[],o=[];for(let M=0;M<i;M+=u){M%(u*256)===0&&await n();const r=J(t,M),m=X(b(r[1],r[0]),b(r[2],r[0])),d=z(m);d&&(c.push(...r),o.push({n:m.map(y=>y/d),area:d}))}if(c.length<12)return;let e=Pt(c,a)[0];const s=o.filter(({n:M})=>Math.abs(E(M,e))<.2);if(s.length<4)return;const h=Pt(s.map(({n:M})=>M),[0,0,0])[2];if(Math.abs(E(h,e))<.98)return;e=h;const l=e.map(Math.abs).indexOf(Math.max(...e.map(Math.abs)));e[l]<0&&(e=e.map(M=>-M));const p=Math.abs(e[0])<.7?[1,0,0]:[0,1,0],g=It(X(e,p)),w=X(e,g),v=[1/0,1/0,1/0],I=[-1/0,-1/0,-1/0];for(const M of c)for(const[r,m]of[e,g,w].entries()){const d=E(b(M,a),m);v[r]=Math.min(v[r],d),I[r]=Math.max(I[r],d)}const O=I[0]-v[0],F=Math.max(I[1]-v[1],I[2]-v[2]),k=Math.min(I[1]-v[1],I[2]-v[2]);if(k<=bt(t)*8||O+bt(t)<F*4||F>k*4)return;let L=0,$=0;const P=new Set;for(const{n:M,area:r}of o){const m=Math.abs(E(M,e));$+=r,(m<.015||m>.999)&&(L+=r),m<.015&&P.add(M.map(d=>Math.round(d*100)).join(","))}if(L<$*.995)return;const C=[];for(let M=0;M<c.length;M+=3){const r=c.slice(M,M+3).map(m=>E(b(m,a),e));C.push([Math.min(...r),Math.max(...r)])}C.sort((M,r)=>M[0]-r[0]);let T=v[0];for(const[M,r]of C){if(M>T+bt(t)*4)return;T=Math.max(T,r)}const j=rt(rt(a,g,(v[1]+I[1])/2),w,(v[2]+I[2])/2);return{axis:e,centre:j,from:v[0],to:I[0],width:F,round:P.size>=6&&F<k*1.2,sampled:u>1}}async function hn(t,n){const i=ft(t),u=Int32Array.from({length:i},(s,h)=>h),a=new Uint8Array(i),c=new Map,o=bt(t),e=s=>{for(;u[s]!==s;)u[s]=u[u[s]],s=u[s];return s};for(let s=0;s<i;s++){s%2048===0&&await n();for(const h of J(t,s)){const l=h.map((v,I)=>Math.round((v-t.bounds.min[I])/o)).join(","),p=c.get(l);if(p===void 0){c.set(l,s);continue}let g=e(s),w=e(p);g!==w&&(a[g]<a[w]&&([g,w]=[w,g]),u[w]=g,a[g]===a[w]&&a[g]++)}}for(let s=0;s<i;s++)u[s]=e(s);return u}async function mn(t,n,i,u,a){const{axis:c,centre:o}=t,e=Math.abs(c[0])<.7?[1,0,0]:[0,1,0],s=It(X(c,e)),h=X(c,s),l=[1/0,1/0,1/0],p=[-1/0,-1/0,-1/0],g=bt(n);for(let P=0;P<ft(n);P++){P%2048===0&&await u();for(const C of J(n,P))for(const[T,j]of[c,s,h].entries()){const M=E(b(C,o),j);l[T]=Math.min(l[T],M),p[T]=Math.max(p[T],M)}}if(p[1]-l[1]<t.width*2.5||p[2]-l[2]<t.width*2.5)return;const w=Math.max(1,p[0]-l[0]),v=rt(o,c,l[0]-w),I=rt(o,c,p[0]+w),O=[];let F=0;for(const P of gt(i,jt([...v,...I]),g)){++F%256===0&&await u();const C=qt(v,I,J(n,P),g);C&&O.push({triangle:P,at:E(b(C,o),c)})}if(O.length<2)return;const k=await a(),L=new Map;for(const P of O){const C=k[P.triangle],T=L.get(C);T?(T[0]=Math.min(T[0],P.at),T[1]=Math.max(T[1],P.at)):L.set(C,[P.at,P.at])}let $=0;for(const[P,C]of L.values())C-P>g&&($=Math.max($,Math.min(t.to,C)-Math.max(t.from,P)));return $>g?$*1e3:void 0}async function dn(t,n,i,u,a){const c=n.precision/1e3;if(!Number.isFinite(c)||c<=0)throw Error("Точность расчёта должна быть положительным числом.");const o=t.filter(f=>n.includeHidden||!f.hidden),e=o.filter(f=>kt(f,n.a)),s=o.filter(f=>kt(f,n.b));if(!e.length||!s.length)throw Error("Выборка А или Б не содержит элементов. Отметьте хотя бы одну модель в каждой стороне проверки.");let h=performance.now();const l=async()=>{if(u())throw Error("Расчёт отменён. Предыдущие результаты сохранены.");performance.now()-h>16&&(await new Promise(f=>setTimeout(f,0)),h=performance.now())},p=new Map,g=f=>{let x=p.get(f.id);return x||(x=$t(f,Array.from({length:ft(f)},(q,S)=>S)),p.set(f.id,x)),x},w=new Map,v=new Map,I=new Map,O=async f=>{let x=I.get(f.id);return x||(x=await hn(f,l),I.set(f.id,x)),x},F=async f=>(v.has(f.id)||v.set(f.id,await un(f,l)),v.get(f.id)),k=async f=>{if(n.type!=="intersection")return f;let x=w.get(f.id);return x===void 0&&(x=await fn(f,l,c),!x.closed&&await ln(f,g(f),l)&&(x={closed:!1,approximate:!0,winding:!0}),w.set(f.id,x)),x.winding?{...f,closed:!1,interior:"winding"}:x.closed===f.closed?f:{...f,closed:x.closed}},L=new Map,$=async f=>{let x=L.get(f.id);if(x!==void 0)return x;const q=[];for(let S=0;S<ft(f);S++)q.push([0,3,6].map(D=>[0,1,2].map(K=>Math.round(tt(f,S,D+K)/c)).join(",")).sort().join(";")),S%9e3===0&&await l();return x=q.sort().join("|"),L.set(f.id,x),x},P=[],C=new Set(e.map(f=>f.id)),T=new Set(s.map(f=>f.id)),j=Ot(s,s.map((f,x)=>x)),M=new Map;let r=0;const m=f=>f.triangles.byteLength+(f.vertices?.byteLength||0)+(f.indices?.byteLength||0)+ft(f)*32;async function d(f,x){if(!a)return f;let q=M.get(f.id);if(q)return M.delete(f.id),M.set(f.id,q),q;for(const[S,D]of M)S!==x&&r>96*1024*1024&&(M.delete(S),r-=m(D),p.delete(S),I.delete(S),L.delete(S));return q=await a(f.id),M.set(f.id,q),r+=m(q),q}let y=-1/0;for(let f=0;f<e.length;f++){const x=e[f];performance.now()-y>150&&(y=performance.now(),i({phase:"Проверка пар",done:f,total:e.length,found:P.length}));const q=[...gt(j,x.bounds,c)];for(let S=0;S<q.length;S++){const D=q[S];performance.now()-y>150&&(y=performance.now(),i({phase:`Проверка пар · A ${f+1}/${e.length} · кандидаты ${S+1}/${q.length}`,done:f,total:e.length,found:P.length}));const K=s[D];if(await l(),x.id===K.id||!Et(x.bounds,K.bounds,c)||n.ignoreSameModel&&x.modelId===K.modelId||n.ignoreSameGroup&&x.modelId===K.modelId&&x.properties.Объект&&x.properties.Объект===K.properties.Объект||n.equalProperty&&x.properties[n.equalProperty]!==void 0&&x.properties[n.equalProperty]===K.properties[n.equalProperty]||x.id>K.id&&C.has(K.id)&&T.has(x.id))continue;const ut=tn(x.id,K.id),A=await k(await d(x)),_=await k(await d(K,x.id));let R,H="surface",pt=0,Y,At,yt,Ht;if(n.type==="duplicates"){if(ft(A)!==ft(_)||A.bounds.min.some((ct,it)=>Math.abs(ct-_.bounds.min[it])>c||Math.abs(A.bounds.max[it]-_.bounds.max[it])>c))continue;await $(A)===await $(_)&&(R=A.bounds.min.map((ct,it)=>(ct+A.bounds.max[it])/2),H="duplicate")}else{const ct=g(A),it=g(_),gn=Math.max(1,...A.bounds.min.map(Math.abs),...A.bounds.max.map(Math.abs),..._.bounds.min.map(Math.abs),..._.bounds.max.map(Math.abs)),et=Math.max(1e-10,gn*Number.EPSILON*64),lt={min:A.bounds.min.map((B,Q)=>Math.max(B,_.bounds.min[Q])),max:A.bounds.max.map((B,Q)=>Math.min(B,_.bounds.max[Q]))},Wt=lt.min.map((B,Q)=>(B+lt.max[Q])/2),_t=new sn,Z=[];let zt=1,Mn=0,Xt=1/0,yn=0;for(const[B,Q]of dt(ct,it,c)){const at=J(A,B),ht=J(_,Q);if(!Et(jt(at.flat()),jt(ht.flat()),c))continue;const nt=on(at,ht,et,n.touching);if(nt){const xt=z(b(nt,Wt));if((!R||xt<Xt)&&(R=nt,Xt=xt),_t.add(at),_t.add(ht),Mn++%zt===0&&(en(at,ht,et,Z),Z.length||Z.push(nt),Z.length>=8192)){for(let mt=0;mt*2<Z.length;mt++)Z[mt]=Z[mt*2];Z.length=Math.ceil(Z.length/2),zt*=2}}++yn%256===0&&(performance.now()-y>150&&(y=performance.now(),i({phase:`Геометрия пары · A ${f+1}/${e.length}`,done:f,total:e.length,found:P.length})),await l())}if(!R&&Mt(A)&&Mt(_)){const B=Wt;vt(B,A,ct,et)&&vt(B,_,it,et)&&(R=B,H="contained")}if(!R){for(const[B,Q,at]of[[A,_,it],[_,A,ct]])if(Mt(Q)){for(let ht=0;ht<ft(B)&&!R;ht++){const nt=J(B,ht),xt=nt[0].map((mt,St)=>(nt[0][St]+nt[1][St]+nt[2][St])/3);for(const mt of[nt[0],xt])if(vt(mt,Q,at,et)){R=mt,H="contained";break}await l()}if(R)break}}if(R){const B=(N,U)=>[...gt(U,lt,c)].filter(ot=>Et(jt(J(N,ot).flat()),lt,c)),Q=B(A,ct),at=B(_,it);H!=="surface"&&(_t.addFrom(A,Q),_t.addFrom(_,at)),await l();const ht=lt.min.map((N,U)=>(N+lt.max[U])/2),nt=(N,U)=>N===0?vt(U,A,ct,et):vt(U,_,it,et),xt=(N,U)=>N===0?vt(U,A,ct,et)||Ft(U,A,ct,et):vt(U,_,it,et)||Ft(U,_,it,et);if(H==="contained"){const N=Math.max(1,Math.ceil((Q.length+at.length)/4096));zt=Math.max(zt,N);const U=new Set;for(const[ot,W,G]of[[A,Q,1],[_,at,0]]){for(let V=0;V<W.length;V+=N){V%(N*32)===0&&await l();for(const st of J(ot,W[V])){const wt=st.join(",");U.has(wt)||(U.add(wt),xt(G,st)&&Z.push(st))}}U.clear()}if(A.interior==="winding"||_.interior==="winding"){const ot=(W,G)=>{let V=1,st=0;for(;W;W=Math.floor(W/G))V/=G,st+=V*(W%G);return st};for(let W=1;W<=2048;W++){W%16===0&&await l();const G=[2,3,5].map((V,st)=>lt.min[st]+ot(W,V)*(lt.max[st]-lt.min[st]));nt(0,G)&&nt(1,G)&&Z.push(G)}}}const mt=(N,U,ot)=>Mt(A)&&Mt(_)&&ot.every(W=>{const G=rt(W,N,U-E(W,N));return!xt(0,G)||!xt(1,G)}),St=()=>[0,1,2].map(N=>Z.reduce((U,ot)=>U+ot[N],0)/Z.length),Jt=H==="surface"&&Z.length>2?Pt(Z,St())[2]:void 0,Tt=Jt?Gt(A,_,Q,at,[Jt],[],lt,St(),Z,et,nt):void 0,Rt=!Tt||Tt.width>et,Yt=!Rt&&!!Tt?.approximate,Zt=!Mt(A)||!Mt(_);if(!Zt&&!Rt&&!Yt&&(H="touch"),H==="touch"&&!n.touching)continue;const{zones:xn,crowded:wn}=rn(Z,lt,c,mt),bn=_t.values();let Nt=0,Bt=!Yt,Qt=wn||zt>1||!!Tt?.approximate||!!w.get(A.id)?.approximate||!!w.get(_.id)?.approximate;for(const N of H==="touch"?[]:xn){const U=N.limits.length?Q.filter(V=>Dt(A,V,N.limits)):Q,ot=N.limits.length?at.filter(V=>Dt(_,V,N.limits)):at,W=N.hits.length?[0,1,2].map(V=>N.hits.reduce((st,wt)=>st+wt[V],0)/N.hits.length):ht,G=Gt(A,_,U,ot,N.hits.length>2?Pt(N.hits,W):[],bn,lt,W,N.hits,et,nt,H==="contained");G.thin&&(Bt=!1),G.approximate&&(Qt=!0),G.width>Nt&&(Nt=G.width),await l()}if(Nt*=1e3,H==="touch"?Y=void 0:Zt?Y="unmeasurable":Nt<=0||!Bt?Y="tolerance":Qt&&(Y="approximate"),pt=H==="touch"||Y==="unmeasurable"||Y==="tolerance"?0:Nt,H!=="touch"&&!Lt(A)&&!Lt(_)){const N=await F(A),U=await F(_);for(const[ot,W,G,V,st]of[[N,A,_,U,it],[U,_,A,N,ct]]){if(!ot||V?.round&&/труб|pipe/i.test(G.name))continue;const wt=await mn(ot,G,st,l,()=>O(G));wt===void 0||wt<=(yt??0)||(yt=wt,Ht=W.id)}yt!==void 0&&(At=Y==="unmeasurable"||Y==="tolerance"?void 0:pt,pt=Math.max(pt,yt),(Y==="unmeasurable"||Y==="tolerance"||N?.sampled||U?.sampled)&&(Y="approximate"))}await l()}if(R&&!Vt({kind:H,depth:Y,penetrationMm:pt},n.minPenetration,n.precision))continue}if(R&&(P.push({id:ut,a:Kt(A),b:Kt(_),point:R,kind:H,state:"new",note:"",assignee:"",firstSeen:"",lastSeen:"",penetrationMm:pt,...yt!==void 0?{axialPenetrationMm:yt,axialElementId:Ht,overlapThicknessMm:At}:{},...Y?{depth:Y}:{}}),P.length>=5e4))throw Error("Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат.")}}return i({phase:"Готово",done:e.length,total:e.length,found:P.length}),P}let pn=0;const Ut=new Map;self.onmessage=async t=>{if(t.data.request!==void 0){const n=Ut.get(t.data.request);Ut.delete(t.data.request),t.data.error?n?.reject(Error(t.data.error)):n?.resolve(t.data.geometry);return}try{const{elements:n,check:i}=t.data,u=await dn(n,i,a=>self.postMessage({progress:a}),()=>!1,t.data.streaming?a=>new Promise((c,o)=>{const e=pn++;Ut.set(e,{resolve:c,reject:o}),self.postMessage({load:a,request:e})}):void 0);self.postMessage({results:u})}catch(n){self.postMessage({error:n instanceof Error?n.message:String(n)})}}})();\n', ge = typeof self < "u" && self.Blob && new Blob(["(self.URL || self.webkitURL).revokeObjectURL(self.location.href);", je], { type: "text/javascript;charset=utf-8" });
function Ke(t) {
  let e;
  try {
    if (e = ge && (self.URL || self.webkitURL).createObjectURL(ge), !e) throw "";
    const n = new Worker(e, {
      name: t?.name
    });
    return n.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(e);
    }), n;
  } catch {
    return new Worker(
      "data:text/javascript;charset=utf-8," + encodeURIComponent(je),
      {
        name: t?.name
      }
    );
  }
}
const pt = (t) => String(t ?? "").replace(
  /[&<>"']/g,
  (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[e]
);
function be(t, e) {
  const n = URL.createObjectURL(
    new Blob([e], {
      type: t.endsWith(".html") ? "text/html;charset=utf-8" : "application/json;charset=utf-8"
    })
  ), s = document.createElement("a");
  s.href = n, s.download = t, s.click(), setTimeout(() => URL.revokeObjectURL(n), 6e4);
}
const Ee = {
  unmeasurable: "не определена",
  tolerance: "требует уточнения",
  approximate: "приблизительная оценка"
}, zt = (t = 0) => t > 0 && t < 0.1 ? String(Number(t.toPrecision(2))) : t.toFixed(1), Kt = (t, e) => e === "duplicates" ? "—" : t.kind === "touch" ? "касание" : t.depth === "approximate" ? `≈ ${zt(t.penetrationMm)}` : t.depth ? Ee[t.depth] : zt(t.penetrationMm);
function _e(t, e) {
  const n = pt;
  return `<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${n(t.name)}</title><style>body{font:14px/1.5 system-ui;margin:24px;background:#171c23;color:#e6edf5}h1{margin:0}small{color:#a9b7c8}input,select{padding:10px;margin:15px 8px 15px 0;max-width:100%;background:#242e3b;color:inherit;border:1px solid #506074;border-radius:6px}.wrap{overflow:auto}table{border-collapse:separate;border-spacing:0;width:100%}td,th{padding:10px;border-bottom:1px solid #39475a;min-width:100px;vertical-align:top;overflow-wrap:anywhere}th{background:#253142;position:sticky;top:0;text-align:left;white-space:normal}td{max-width:350px}tr[hidden]{display:none}.shot{display:block;width:260px;border:0;background:transparent;padding:0;cursor:zoom-in}dialog{width:min(94vw,1400px);border:1px solid #506074;background:#20242b;color:white;border-radius:10px}dialog img{max-width:100%;max-height:80vh;display:block;margin:12px auto}dialog::backdrop{background:#000b}.shot img{width:100%;border-radius:6px}.legend{margin:12px 0}.red{color:#ff6161}.blue{color:#65baff}@media print{input,select{display:none}body{background:white;color:black}.wrap{overflow:visible}th{position:static;background:#eee}}</style><h1>${n(t.name)}</h1><small>НашеПО · Проверки коллизий · ${n(t.lastRun || "")} · ${t.status === "stale" ? "Результат устарел" : "Последний завершённый расчёт"}</small><p>${n(t.type === "duplicates" ? "Совпадение треугольной геометрии" : "Пересечения поверхностей и вложенность замкнутых тел")}. Точность: ${n(t.precision)} мм${t.type === "intersection" ? `; минимальная глубина: ${n(t.minPenetration)} мм` : ""}. Глубина для отбора — большее из локальной толщины перекрытия и захода вдоль оси распознанного прямого профиля в более крупную конструкцию. Продольный замер включает внутреннюю пустоту колодца: до конца профиля при частичном заходе, от входа до выхода при сквозном. Раздельные оболочки измеряются отдельно. Если продольный замер неприменим, используется локальная толщина. Это не расстояние перемещения, устраняющего коллизию. «Касание» — контакт без разрешённого объёмного перекрытия, с нулевой глубиной. «Не определена» — у геометрии не удалось определить внутреннюю область. «Требует уточнения» — пересечение найдено, но глубина не разрешена. Знак ≈ обозначает восстановление внутренней области повреждённой оболочки, совмещение швов, сокращённую выборку либо неполное разделение контактов. Погрешность оценки не гарантируется. Строки с неопределённой глубиной сохраняются при фильтрации; все числа, включая оценки со знаком ≈, и касания сравниваются с порогом с запасом на точность.</p><p class="legend"><span class="red">● Элемент А выделен красным</span> · <span class="blue">● элемент Б — синим</span></p><input id="search" type="search" placeholder="Поиск по всему отчёту"><select id="state"><option value="">Все состояния</option>${Object.entries(
    Ct
  ).map(([s, a]) => `<option value="${s}">${a}</option>`).join(
    ""
  )}</select>${t.type === "intersection" ? '<input id="depth" type="number" min="0" step="1" placeholder="Глубина от, мм">' : ""}<span id="count"></span><div class="wrap"><table><thead><tr>${["Снимок", "№", "Состояние", "Глубина для отбора, мм", "Толщина перекрытия, мм", "Заход вдоль оси, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "X", "Y", "Z", "Назначение", "Комментарий"].map((s) => `<th>${s}</th>`).join("")}</tr></thead><tbody>${e.map((s, a) => `<tr data-state="${s.state}" data-depth="${s.penetrationMm ?? 0}"${(s.depth === "unmeasurable" || s.depth === "tolerance") && s.kind !== "touch" ? ' data-unmeasured="1"' : ""}><td>${Jt(s.image) ? `<button class="shot" type="button"><img src="${s.image}" alt="Снимок конфликта ${a + 1}" loading="lazy"></button>` : "Снимок отсутствует"}</td>${[a + 1, Ct[s.state], Kt(s, t.type), s.overlapThicknessMm === void 0 ? "—" : zt(s.overlapThicknessMm), s.axialPenetrationMm === void 0 ? "—" : zt(s.axialPenetrationMm), s.a.name, s.a.model, s.a.guid, s.b.name, s.b.model, s.b.guid, ...s.point.map((o) => o.toFixed(4)), s.assignee, s.note].map((o) => `<td>${n(o)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><dialog id="picture"><button id="close-picture">Закрыть</button><img id="full-picture" alt="Снимок конфликта"></dialog><script>const modal=document.getElementById("picture");document.getElementById("close-picture").onclick=()=>modal.close();for(const b of document.querySelectorAll(".shot"))b.onclick=()=>{document.getElementById("full-picture").src=b.querySelector("img").src;modal.showModal()};const PREC=${Number(t.precision) || 0},q=document.getElementById('search'),s=document.getElementById('state'),d=document.getElementById('depth'),rows=[...document.querySelectorAll('tbody tr')];function filter(){let n=0;for(const r of rows){r.hidden=!!((s.value&&r.dataset.state!==s.value)||(d&&!r.dataset.unmeasured&&Number(r.dataset.depth)+PREC<Number(d.value||0))||!r.textContent.toLowerCase().includes(q.value.toLowerCase()));if(!r.hidden)n++}document.getElementById('count').textContent='Коллизий: '+n}q.oninput=s.onchange=filter;if(d)d.oninput=filter;filter()<\/script></html>`;
}
function tn(t, e) {
  return JSON.stringify(
    {
      version: 1,
      id: t.id,
      name: t.name,
      images: Object.fromEntries(
        e.filter((n) => Jt(n.image)).map((n) => [n.id + ".jpg", n.image])
      ),
      warnings: t.warnings,
      tests: [
        {
          id: t.id,
          name: t.name,
          clashes: e.map((n, s) => ({
            id: n.id,
            name: `Конфликт ${s + 1}`,
            distance: t.type === "duplicates" ? "" : n.depth || n.kind === "touch" ? Kt(n, t.type) : `${zt(n.penetrationMm)} мм`,
            date: t.lastRun || "",
            description: t.type === "duplicates" ? "Дублирование" : n.axialPenetrationMm !== void 0 ? "По пересечению · продольный заход" : "По пересечению",
            status: Ct[n.state],
            group: n.assignee,
            note: n.note,
            point: n.point,
            image: Jt(n.image) ? n.id + ".jpg" : "",
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
            properties: {
              Проверка: t.name,
              Вид: n.kind,
              "Глубина для отбора, мм": Kt(n, t.type),
              ...n.axialPenetrationMm !== void 0 ? {
                "Толщина перекрытия, мм": n.overlapThicknessMm === void 0 ? "—" : zt(n.overlapThicknessMm),
                "Заход вдоль оси, мм": zt(n.axialPenetrationMm)
              } : {}
            }
          }))
        }
      ]
    },
    null,
    2
  );
}
const en = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAydpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAzIDc5Ljk2OTBhODdmYywgMjAyNS8wMy8wNi0yMDo1MDoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDZFQkU2NEQ4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDZFQkU2NEM4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI2LjExIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRENDVBNjQzODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRENDVBNjQ0ODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+pHX+ogAAD+lJREFUeNrsnXtwVPUVx2/CZvMgQEhCSAwJJDzDqwgodCq08hAr7wpSo1M6o/5Rq6NUcdqp1XamdjqOY6mvWhWnttZpRRtbaRGpMMKMZlB8gaFaQoQQSEhIQt7hkfTzhY1ulnt37929mw1T7sxls3vv/f3O7/zO43vO7/wucd3d3calI/zDo3927txpnDx5MqaEpKenpyUlJWUlJCQM6+rqSm1vb/fyGRcfH9+dkpLSGRcX13Lq1Knajo6Omvr6+ia+x4zWtLQ0Y86cOee/SAKLiopiyjwYlz5ixIhyPk8PGDBAKnHB6fF4unU9Ly+vDCanxpLeqVOnnuObznj9kJycHFMGwpRrjh8/Xoh0ec6ePWt6z5kzZwxdr62tLcrPz786lvT68ys+1jYEaTJQx+tRT1v3w0QDabweSe0XNjDmDBwyZEh6U1PTPCfPtLS0LOK5QZcYyDF48OAFjY2N6U6eaWhoyIaBc//vGSg1RIXXSC2dHG1tbYbX610dS08cUwYmJiYa2dnZWRMmTFiO9C0Ipw3UfgnoYfHw4cMzYWZscWAEeChj2LBha8CQm+vq6g6D26xnKj5eWC+dZ67l71VI0dxDhw5lYM/C6vvYsWMZzc3Nm4cOHVo7atSot/Hem6DjzRMnTjQGCw4k9RkZGYWYgGtrampeZCKaIuKgOps+fbrj55AgwYmPkabunJyceqThEaQhT4wKJPiyyy4bx/VHgStVQABTnBfpCdjuhp7D9PMw9BQGemnRBc0FXP8tdDaKbhj/Hn+Pdjr2WbNmfYkDw2IgjJgDMdX+A1DEwG8nUEsNYJTUSp98fzIrK6tF16PBuMBT/cCUk/T7Gz5HiI7c3NwxfN8gxgXSweRWcv3KPmOgQG9mZmaz1QAUScDIhvHjx/8Zgmsx9GExAjXrLigo6Ebrw2YkdBwdN26c6GgKNoGYoXoioblRZyAqsoDOWqMlOVJDbKQY10Zf3VJ3feo7Nuvc92hJsqQWJn7DKQNtOxHEfCZw4xVCqRS3PNigQYMEpCv5/BBJfa+zs3MfElyB1D1RWlp6le45fPiwMXv27D2o4p04ikI+p0D4FTiQaXjw3HCdUOCBQxmMxJZgdubhoPa56kRQ2REw8LAbMy3jjRmoxiY9VVhYuABmDRKs6TnGjBlTTNKg1zP6zu83+sMgVHwwTmAhpuIZJKcWxroiibT1OTRluabCqampKajQO5ESBmCWOn6GF7wLdckyi2WZpALOBrPn9TsGv8AMliA52UzIj5iYA+onUloZ778xJ4muMBD1SoGwzyIhiIE3MMCfgNks01AQrLTa1mDt6LruC5JTHEI/D8ppRELvyJEjPxo4cKDXNScyevTomwPVyq668uxmGDg2VNg1ceLEO0JhRF2HiT8M1o76ob8izMO2cNRajoxnV7rqhZFCL7OyzwkhOIcuIMRPmUk70GgCxrvFTrvc18z940O1iekZgH38JbQ7Vd/3oHmA6zAGSbrJrhTidFox8KsCo5IgA93pZJCo6ds8F28nWQFDbka1OxxI34qo4EBmMgGmfBqKCHCiJGS+HQQgdUN175OqOzUNPLfeTjZG9+C8FsPEdhvS9z7SFx81II0UrglmpyCykxn8tl0IhVmYisFvDxP4tsOYqXb7gjkrMStnrNqDcWe5Z4lTIO0onQWQbfAt+lxwyNYRRfzg4MGDW2wmUhOQpGcBsElhAt8kJvNZtWPn/i+++KIE03K31fqPxqXxRS0bIxVmhj62in9xGE9pfcOu6k6aNOnBSMGvnqedB+wmVpVYgM4XrMJBNOxd7GB0VJhI4HtWtgpV2oskpNhcwjRwGt/CVp5yI3JQO7T3TbVr5wCLDiHaOGDlRGDid1yPhQVjWFa8j1jVbFFI4n8Xeck2q0Qqz3tQ78kQOI+k6yLWNOYQUycYLhxqBwncgj3dRV9bSdRuJ0beS6x81izBS98nsdXr8OL/CIyjtVQAU36MOXqttbW1yzUVxjEs1eyYzRoq8XJgSl2xKjnATKR2Cd7ycWZ1H/any40wK1S4qH7UH/0+pv5Fh3+s3UPf2LFj/2nWhnAjaONq1yRQdo2ZvUWzY5LSbyeNvl5runQcx/ciZk+dL2J2Z2PohyEJfbY+cfr0aYOlhTjOSXydBE13oiG12O5Svm9FqnYgnWWiCfru4fpC/u6lCbpGaH0ra887tJgf8ZoI4p6Lei40U01sz9sQlE9m5A6YOB9mToFpHruL5NE+xAzOYfy5FC1ZygSfAf7sxQa+hfS8zue7e/bsmRuo6jD3OmxlJuahLmIVRtRvCfSWwoL8LuDZKpEPN+scq1P04vTOJWo1jkBs60uffTdiFZaU4SCuC5QoPJ9x5MgRgwqqFOMiPDRwLcZxJgsXajxK3Bp+5SOYLgUEfwlrXRj9V6NDMcSrUdG5JoDa6C+1KYYLi/tmBU2Yo4WMfwVOaYj4EdQGqgHdhN6nq2QCyVuB07imoqIiB8N7wUMwtWvmzJmf7Nq1a1qwteCLgXkzZswo271798TAa0ePHs2BiSX4gCqY+CYOpYTvu6hNbOzFcH1ZsmTJdFz/CyQBjuFF7YDXJmZnFHZix8Vk+wJP6H9r8uTJExTDh7oX3KhEaxWQ7vnly5dP7RWJFBcXb3TSMThpr5A/uTmCkPyai5F5ohu4kqcYnr/LnTy7du3ax3slE3ASmU5EH3Uvl+qyenUYULrWt3Z70RyiV3RXV1dX+szXQSfPo85ZvZwIbj3DSQPcXynQqoPsyxuk0H9mNxaN9SE6off+8vLyN3rANzb/iMPxD+vFQBxFooOHJbp1PQU8mkGY+BA29LX+UG4WCpZBZwn0/qrH+Yl+6K5z0g78SurFQJIEHidE0GFbYBBOjfMtGNj/9mcGApw/h85bTcLSNieT788v1+oDCXvqmc1iDHN7f2Se6BJ9otP1AksM6hm7D0j0Ud9ki6zv+xjoO1Sy0Z8O0SO6oG+PxS0pTjYc+fMr3peO73QSBnFkWon8gQMHngcvPR0MvfflITqg53eiywpMczhyovCroxcDYYpTsc6zYpDi5srKynUY69L+wECl6UWPVYZI40CrRjiMpet6MZDA+YRDHDQaMba0uoQ8HaSEbqKepTqWzKP/Y6IDejqDwJoEoEyBQ6mu/ZKBsmm45d8zU6/QYb2dXUtkKwqxKzlG8FWzg2SxYyqFqFopdFSEsI/5jGdkqLZUk0P+sA6k8VeyOF+aA49gCcXepaRzVpMYzeYmbXpZAVPnEThnmG1BIEk5kFT5FMXcweAOkxNTdI3XTQpVHYEETqMwPcFqSxfOp5Y4eDtjKYFxO5iQ4/zWOxsjQypEXn3+eIkE6ktkZoYTbC/C7W/goaGBuI9n5uNItlp5LxHOtaQY5/2SguE70ci5kLzmBdeI88WodYx/G8C7tify8nM81jhQBhem1ezfv/+PMHKnmSfGDi7TaluIiCUxxgxMDCaB0J+EMCwyzLegbSsrK3sJ4N2LeY422ijMQXS3mC2Ys3Aznhm6KtjsMgBvjBnoDSaBmKz5mKlRZhuBEJAtdrBhyEgED/Yvrb4ZF274k/243aoaIU4LD/1YArUUize93Wy1Ea3T/pttrmz1YiG6kgWY7Rbh2zKytWMtJHBAP5FA07UHnODXUM9rLFT7DSTzuCsM9AHQ58xKa/FeiXT2oJkUQrinPzCQifSYSR8e9hcsTXhM6hXlUJ+zsyZsO5mApG0hjf+Z2TVmsRjoM8dEAj3Yz4RYMpD+TRnI0oX2yS03e4Zxfsh4t7u6WxN70MmsPRJYImGcX2CKg9DHkMTEfiiBqpvxBFRTpCJhG8z2GAr3wfCHwcBnXd/uyoz9CWy03+xaVVXVNLK8v/aPjyEkAcZ6YiyBCaLD8CtTwfY9ypq2aY0149sDDt4Ulf3CkkJm817fqt0FL4SAiXejGsV+EpggCQhn4LJRlGC0UjXwAZ9t4e4Hpn+P6OjBpdB3G8y7zWwpFkfJz13rnUif4/3CEJFkhY0Ea1Dx51ixO0bebQcz73Uigb79xN1AiFIkWXt//654GqNOmD56GZO0GkQwG+8YZ3ct2qfCXl858XU8+6QZbPHdq3fUJEatQpWBeKwqVP1PVKQBqblCZWUA1dOh7tfmQhhUxjrzQwxyurygRf9iwnTdR0Bfps2HNnZ8noaWDLLRc4LtMO05abcUtBEXlQpVBnmD3c3SSNIJOlnvA+BmBd1apD4CM5QFmsd9Xoc75b08N1/Pqx2rYgCkuY2NivfzedIO3WoHIVnsOgMlfajmRw4Xrs8VOxp+WxNwNI3sNHqFoszVwIW0SOtr9LzaUXtqV+37lyHTvzY2Ot1o806oOulwtnrd4HSrvl7VxHPa/dh9+eWXf8zmmJtQp5xovSDC53hy6Odm+lMN4Ln+RYcTuu1IoaNtDkhfMrjpAbOUT4istUFx0jnnAlZMIzHhxcNVR6v4Uu3iIGr14jKcRZr6Vf92IwrjqzVfwZ+fI4Vet7wwzim+wwgPh4l5OvNRrefBWeuQjMcJATeRzWl049V78t6oagZ27gaSv3eCAIoinSTalLTEueaF8agFDP6oG0U9vm38hygPfgQH8HUcQqLd/SX+6oqj0j7muXqZBO1VhbOb1DDfl1yB9851dZsD8W4FkrNKdXJIzsBIZlemgOWDfPDZPYDXe4AjBzD+eyBmN5LzKav+lZz1fO9Ags8qq8OZjASnw7g8PrWUcAUqOhNVLVBI5tZLJBEUacX1aEiV60AaBP8OErOGDv5GB143ymz10kfOMXwdg7Ffo8IfGNSFd21BKmU2ZMA82LEkbNMggWjtVXFq1+wcePM2+l/F5H4QtRfv+HY+Lg2281F5VL0nBmhRohmNZSE5/dcRDpbAnPZghfBoVhNwZ6ERxmtP4p0ymxl6Hc+8DMhQH8hcCG7Gtj2Jqs3gvpVI1Sy+/wEC+2zfg+gQw5jAZ5DkK1lUX4lkzdTLKSRlJgmEGuzyYu7bZvTlq5/oeBqz9h9tgYCZzQDZp/htTCA4loPAfk7h+tMY6Dqne4PtnnIi9FNDP0/QT1Fg5YS+Y2sncP1ZvftGu5owSZ/oFVZGX7/6yfiq0jObmb4XIsaGqoURY2F0Nip1K+cWBtMU6Xu0tP1M0Qftbeb8PhqQFSq6EZ1imujWy9PCGbdrDDQiqxLNo8D7Rql9OMyDCfU8vwqpz+3r6tiYM9BfGrBNr4XDQJ570c47GaLNwJi+wVJwhPNls6UCI0SdCuHlpv6wRyXm71DV+ithWKPDdFYN4eEOw7j0ElrFybUsSDliBjBqGwC86RIDjfPbDLAlr9qNh+UwyOy8avXC7pgw0Gwrf18ebNjZijc+EgoK6TrQqZxyvO2xpNe/5O8cxRs3bjT6cme5yVEHJpzBZzbAPAvpSiW3l+j/nxGA75qZ6OMQf4xYvCnGr67/KvK59N9hRHb8T4ABAPaAkPNeKkdCAAAAAElFTkSuQmCC", nn = ":host{display:block;height:100%;color-scheme:dark;font:13px/1.4 Segoe UI,sans-serif;color:#dbe5f0;container-type:size}*{box-sizing:border-box}[hidden]{display:none!important}main{height:100%;min-height:260px;background:#171d25;display:flex;flex-direction:column;overflow:hidden;-webkit-user-select:none;user-select:none}button,input,select,textarea{font:inherit;color:inherit;border:1px solid #425165;border-radius:6px;background:#253140;padding:7px 9px;min-width:0}button{cursor:pointer;white-space:nowrap}button:hover{background:#354459}button:disabled{opacity:.45;cursor:default}.primary{background:#b99a38;border-color:#d0ae46;color:#111820;font-weight:600}.primary:hover{background:#e0bd51}button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid #f2c94c;outline-offset:1px}input,select,textarea{background:#111a24}input,textarea,td,dd{-webkit-user-select:text;user-select:text}input[type=checkbox]{accent-color:#e6c354;width:16px;height:16px}header{display:flex;gap:7px;align-items:center;padding:8px 12px;border-bottom:1px solid #354459;flex-shrink:0;overflow-x:auto}.brand{display:flex;gap:7px;align-items:center;margin-right:8px}.brand img{width:32px;height:32px;object-fit:contain}.brand b{font-size:17px}.brand small{font-size:10px;color:#a6b5c7}#dirty{margin-left:auto;font-size:11px;color:#cabb81;white-space:nowrap}.notice{background:#1c2735;padding:5px 12px;font-size:12px;min-height:27px;max-height:70px;overflow:auto;color:#a7bbd1}.notice.error{color:#ffaaa1;background:#412725}.workspace{display:grid;grid-template-columns:230px minmax(0,1fr);flex:1;min-height:0}aside{padding:10px;display:flex;flex-direction:column;gap:9px;border-right:1px solid #354459;min-height:0}#checks{overflow:auto;flex:1;min-height:0}.check-item{display:flex;flex-direction:column;gap:5px;width:100%;margin-bottom:5px;text-align:left;white-space:normal}.check-item small{color:#a8b7ca}.check-item.active,.tabs .active{border-color:#c7ab56;background:#403b2c;color:#ffe399}.main{display:flex;flex-direction:column;min-width:0;min-height:0}.test-toolbar{display:flex;gap:7px;padding:8px 12px;align-items:center}.test-toolbar input{flex:1;font-weight:600}.tabs{display:flex;gap:7px;border-bottom:1px solid #354459;padding:0 12px 8px}.tabs button{min-width:105px}#content{flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column}.empty{padding:28px;color:#a4b4c9;text-align:center;margin:auto}h2,h3,p{margin:0 0 10px}h2{font-size:20px}h3{font-size:15px}label{display:flex;flex-direction:column;gap:5px;font-size:12px;color:#b8c6d7}.check{flex-direction:row;align-items:center;gap:6px}small{font-size:11px;color:#a8b7c9}.parameters{display:flex;gap:18px;align-items:end;padding:10px 12px}.parameters input{width:140px}.selection-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0 12px 12px}.selection{border:1px solid #39495e;border-radius:8px;padding:12px;background:#1b2633;min-width:0}.selection h3{display:flex;justify-content:space-between}.selection h3 span{color:#92c4b2;font-size:12px}.selection select[multiple]{width:100%;min-height:70px}.selection-tools{display:flex;gap:5px;flex-wrap:wrap;margin:8px 0}.selection-tools button{font-size:11px;padding:5px 7px}.selection>label{margin-bottom:8px}.condition{display:grid;grid-template-columns:minmax(80px,1fr) 100px minmax(70px,1fr) 29px;gap:5px;margin:6px 0}.condition button{padding:3px}.rules,.report{padding:18px;max-width:850px}.rules>label{margin:14px 0}.rules>p,.report>p{color:#a9b8cb}.report>button{margin:12px 8px 14px 0}.result-tools{display:flex;gap:7px;flex-wrap:wrap;padding:8px 12px}.result-tools input{flex:1;min-width:180px}.result-area{display:grid;grid-template-columns:minmax(0,1fr) 300px;flex:1;min-height:0}.table-area{display:flex;flex-direction:column;min-width:0;min-height:0}.scroll{overflow:auto;flex:1;min-height:0}table{border-collapse:separate;border-spacing:0;width:max-content;min-width:100%}th{position:sticky;top:0;background:#2a3748;z-index:1;text-align:left;max-width:240px;white-space:normal}th,td{padding:8px;border-bottom:1px solid #344154;vertical-align:top}td{max-width:320px;min-width:90px;overflow-wrap:anywhere;-webkit-user-select:text;user-select:text}td:first-child{min-width:36px}tr.active td{background:#453e29;color:#fff0b5}tr:hover td{background:#2c3847}.pager{display:flex;gap:10px;align-items:center;justify-content:center;padding:5px;border-top:1px solid #39495e;font-size:11px}.pager button{padding:2px 8px}.detail{border-left:1px solid #354459;padding:10px;overflow:auto}.detail h3{overflow-wrap:anywhere}.detail>label{margin:10px 0}.detail p{font:11px/1.5 Consolas,monospace}.detail details{border-top:1px solid #354459;padding:8px 0}summary{cursor:pointer}dl{font-size:11px;display:grid;grid-template-columns:1fr 1fr;gap:7px}dt,dd{overflow-wrap:anywhere;margin:0}dt{color:#9baec4}footer{border-top:1px solid #354459;padding:4px 12px;display:flex;justify-content:space-between;color:#91a4bb;font-size:11px}dialog{border:1px solid #53647c;border-radius:12px;background:#202c3a;color:#dbe5f0;width:min(700px,92vw);max-height:85vh;padding:20px;box-shadow:0 15px 60px #000a}dialog::backdrop{background:#000a}dialog p{margin:12px 0}dialog a{color:#f2c94c;margin-right:12px}.dialog-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:16px}@container (max-width:950px){.workspace{grid-template-columns:185px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 240px}.selection-grid{grid-template-columns:1fr}.parameters,.test-toolbar{flex-wrap:wrap}.test-toolbar input{flex-basis:100%}}@container (max-height:400px){header{padding:5px 10px}.test-toolbar{padding:5px 10px}.tabs{padding-bottom:5px}.brand img{width:25px;height:25px}footer{display:none}}:host{font-size:12px}.brand img{background:#e1e7ef;border-radius:5px;padding:3px}.selection-tools button{font-size:12px}label{font-size:13px}.choose-layout{display:grid;grid-template-columns:220px minmax(0,1fr);min-height:0;flex:1;overflow:auto}.choose-layout .parameters{display:flex;flex-direction:column;align-items:stretch;gap:15px;border-right:1px solid #354459;justify-content:flex-start}.choose-layout .parameters input{width:100%}.choose-layout .parameters input[type=checkbox]{width:16px}.choose-layout .selection-grid{padding:10px 12px;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start;min-width:0}.selection select[multiple]{height:180px;resize:vertical}.selection-mode{font-size:12px;color:#b6c4d5}.preset-row{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:9px}.preset-row select{flex:1 1 160px}.preset-row button{padding:5px 7px;font-size:12px}.model-list{height:150px;overflow:auto;border:1px solid #425165;border-radius:6px;background:#111a24;padding:5px;margin-bottom:5px}.model-list label{display:flex;flex-direction:row;align-items:center;gap:7px;padding:4px 5px;color:#dbe5f0;overflow-wrap:anywhere}.model-list label:hover{background:#253140}.model-list .model-all{position:sticky;top:-5px;z-index:1;background:#1f2b39;border-bottom:1px solid #425165;font-weight:600}.legend{display:flex;gap:12px;flex-wrap:wrap;font-family:inherit!important}.part-a{color:#ff6161}.part-b{color:#65baff}.preview{display:block;width:100%;padding:5px;margin:8px 0}.preview img{display:block;width:100%;max-height:180px;object-fit:contain}.image-dialog{width:94vw;max-width:1500px}.image-dialog img{display:block;max-width:100%;max-height:75vh;margin:10px auto}#help-dialog{width:min(1000px,94vw);line-height:1.6}#help-dialog details{padding:12px 0;border-bottom:1px solid #425165}#help-dialog summary{font-size:16px;font-weight:600;color:#f0d27a}#help-dialog li{margin:8px 0}@container (max-width:1100px){.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .selection-grid{grid-template-columns:1fr}.condition{grid-template-columns:minmax(60px,1fr) 100px minmax(60px,1fr) 29px}}@container (max-width:700px){.choose-layout{display:block}.choose-layout .parameters{border-right:0;border-bottom:1px solid #354459}.workspace{grid-template-columns:160px minmax(0,1fr)}}button,input,select,textarea{padding:5px 7px;border-radius:5px}button{min-height:27px}input[type=checkbox]{width:14px;height:14px}.commandbar{position:relative;display:flex;gap:8px;min-height:45px;padding:5px 8px;overflow:visible;background:#131b25}.brand{flex:0 0 auto;margin-right:0;gap:5px}.brand img{width:28px;height:28px}.brand b{font-size:14px}.check-heading{display:grid;grid-template-rows:25px 12px;flex:0 1 230px;min-width:145px}.check-heading input{height:25px;border:0;background:transparent;padding:2px 5px;font-weight:600}.check-heading small{padding:0 5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:9px}.tabs{align-self:stretch;align-items:center;flex:0 0 auto;gap:3px;padding:0;border:0}.tabs button{flex:0 0 auto;min-width:0;padding:5px 9px;background:transparent;border-color:transparent}.tabs .active{background:#3e3828;border-color:#b99a38}.header-actions{display:flex;align-items:center;gap:4px;margin-left:auto}#dirty{margin-left:0;width:0;height:0;overflow:visible;font-size:0}#dirty:not(:empty){width:7px;height:7px;border-radius:50%;background:#e5bd43;box-shadow:0 0 0 2px #e5bd4328}.more-menu{position:relative;z-index:20}.more-menu summary{display:grid;place-items:center;width:29px;height:29px;border:1px solid #425165;border-radius:5px;background:#253140;cursor:pointer;list-style:none;font-size:18px}.more-menu summary::-webkit-details-marker{display:none}.more-popover{position:absolute;right:0;top:calc(100% + 5px);display:grid;width:190px;gap:3px;padding:6px;border:1px solid #506176;border-radius:7px;background:#192431;box-shadow:0 12px 35px #000a}.more-popover button{text-align:left}.notice{min-height:23px;max-height:45px;padding:3px 9px;font-size:10px}.run-progress{display:grid;grid-template-columns:minmax(150px,auto) minmax(120px,1fr) auto;align-items:center;gap:8px;min-height:24px;padding:3px 9px;border-bottom:1px solid #425165;background:#202a20;color:#d9e7d2;font-size:10px}.run-bar{width:100%;height:7px;overflow:hidden;border-radius:2px;background:#101810}.run-bar i{display:block;width:0;height:100%;background:#e3bc43}#run-phase,#run-value{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#run-value{text-align:right;color:#b9c9b3}.workspace{grid-template-columns:190px minmax(0,1fr)}aside{gap:6px;padding:7px;background:#141c26}.aside-title{font-weight:600;font-size:12px}.aside-actions{display:grid;gap:5px}.check-item{gap:2px;margin-bottom:3px;padding:6px 7px}.check-item small{font-size:9px}.main{background:#171d25}#content{overflow:hidden}.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .parameters{gap:9px;padding:8px}.choose-layout .selection-grid{gap:8px;padding:8px}.selection{padding:8px}.selection h3,h3{font-size:13px;margin-bottom:6px}label{gap:3px;font-size:11px}small,.selection-tools button,.preset-row button{font-size:10px}.model-list{height:125px}.model-list label{padding:2px 4px}.selection-tools{gap:4px;margin:5px 0}.selection-tools button,.preset-row button{padding:3px 5px;min-height:23px}.result-tools{display:flex;align-items:center;justify-content:space-between;gap:6px;flex-wrap:nowrap;min-height:38px;padding:5px 7px;border-bottom:1px solid #354459;background:#151f2a}.result-filters,.bulk-tools{display:flex;align-items:center;gap:5px;min-width:0}.result-filters{flex:1}.result-filters input[type=search]{flex:1 1 190px;min-width:120px}#result-depth{flex:0 1 125px;min-width:92px}#result-count,#selection-count{color:#9fb0c4;white-space:nowrap;font-size:10px}.bulk-tools select{max-width:125px}.result-area{grid-template-columns:minmax(0,1fr) 310px}th,td{padding:5px 6px;font-size:11px;line-height:1.25}th{max-width:190px}td{max-width:260px;min-width:76px}.pager{justify-content:flex-end;min-height:29px;padding:3px 7px}.pager #selection-count{margin-right:auto}.detail{display:flex;flex-direction:column;min-width:0;padding:0;overflow:hidden;background:#141e29}.detail-head{display:flex;align-items:center;justify-content:space-between;gap:6px;min-height:47px;padding:7px 8px 4px}.detail-head>div:first-child{min-width:0}.detail-head small{color:#8093aa;letter-spacing:.08em}.detail-head h3{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin:0}.detail-nav{display:flex;gap:3px}.detail-nav button{min-width:27px;padding:2px 7px;font-size:17px}.clash-summary{display:flex;gap:5px;padding:0 8px 5px;color:#adbdcf;font-size:9px}.clash-summary span{padding-right:5px;border-right:1px solid #405064}.clash-summary span:last-child{border:0}.detail .legend{margin:0;padding:0 8px 5px;font-size:10px}.preview-slot{height:clamp(92px,18cqh,145px);flex:0 0 auto;margin:0 7px 6px;overflow:hidden;border:1px solid #37475b;border-radius:6px;background:#0e151d}.preview{position:relative;width:100%;height:100%;margin:0;padding:0;border:0;background:transparent}.preview img{width:100%;height:100%;max-height:none;object-fit:contain}.preview span{position:absolute;right:5px;bottom:5px;padding:3px 6px;border-radius:4px;background:#101923db;font-size:9px}.preview-empty,.detail-empty{height:100%;display:grid;place-content:center;justify-items:center;gap:4px;color:#788ba1}.preview-empty>span,.detail-empty>span{font-size:24px}.detail-actions{display:grid;grid-template-columns:1fr 1fr;gap:5px;padding:0 7px 7px}.detail-scroll{flex:1;min-height:0;overflow:auto;padding:7px 8px 12px;border-top:1px solid #354459}.detail-scroll>label{margin:7px 0}.detail p{font:inherit}.coordinates{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;font:9px/1.3 Consolas,monospace;color:#91a3b7}.coordinates span{overflow:hidden;text-overflow:ellipsis}.detail details{padding:6px 0}.detail dl{font-size:10px}.detail-empty{padding:20px;text-align:center}footer{padding:2px 8px;font-size:9px}@container (max-width:1050px){.workspace{grid-template-columns:165px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 270px}.check-heading{flex-basis:185px}.tabs button{padding-inline:6px}#dirty{display:none}}@container (max-width:820px){.brand b,.brand small,#result-count{display:none}.check-heading{flex-basis:155px}.result-tools{overflow-x:auto}.result-area{grid-template-columns:minmax(0,1fr) 245px}}@container (max-height:410px){.notice,footer{display:none}.preview-slot{height:90px}}.depth-breakdown{display:grid;grid-template-columns:1fr auto;gap:4px 8px;margin-bottom:9px;font:inherit}.depth-breakdown small{grid-column:1/-1;color:#adbdcf;font:inherit}", Dt = /* @__PURE__ */ new WeakMap(), Ae = "nashepo.collisionfinder360.project.", ee = () => ({
  format: "nashepo.checks",
  version: 1,
  checks: [],
  sets: []
}), xe = (t) => {
  if (!(!t || typeof sessionStorage > "u"))
    try {
      const e = sessionStorage.getItem(Ae + t);
      return e ? Se(e) : void 0;
    } catch {
      return;
    }
}, ye = (t, e) => {
  if (!(!t || typeof sessionStorage > "u"))
    try {
      sessionStorage.setItem(
        Ae + t,
        JSON.stringify(e, (n, s) => n === "image" ? void 0 : s)
      );
    } catch {
    }
};
function on(t, e) {
  const n = t.shadowRoot || t.attachShadow({ mode: "open" }), s = Oe(t);
  let a = e.projectToken(), o = e.projectId(), i = a && (Dt.get(a) || xe(o)) || ee();
  a && Dt.set(a, i);
  let r, d = i.checks[0]?.id || "", m = "select", p = "", h = 0, y = !1, M = !1, A, C = !0, F = !1;
  const D = /* @__PURE__ */ new Set();
  let _, T, G = 0;
  const P = () => i.checks.find((l) => l.id === d), x = (l) => n.querySelector("#" + l);
  n.innerHTML = `<style>${nn}</style><main><header class="commandbar"><div class="brand"><img src="${en}" alt=""><b>НашеПО</b><small>${Pe}</small></div><div class="check-heading"><input id="name" aria-label="Имя проверки" placeholder="Выберите проверку"><small id="check-summary">Проверка не выбрана</small></div><div id="tabs" class="tabs">${[
    ["select", "Выбор"],
    ["results", "Результаты"],
    ["rules", "Правила"],
    ["report", "Отчёт"]
  ].map(([l, c]) => `<button data-tab="${l}">${c}</button>`).join(
    ""
  )}</div><div class="header-actions"><button id="scan" title="Перечитать список и геометрию выбранных моделей">↻ Модели</button><button id="run" class="primary">▶ Запустить</button><button id="cancel" hidden>Остановить</button><details class="more-menu"><summary title="Другие команды">⋮</summary><div class="more-popover"><button id="open">Открыть проверки</button><button id="save">Сохранить проверки</button><button id="copy">Копировать проверку</button><button id="delete">Удалить проверку</button><button id="settings">Настройки</button><button id="help">Справка</button></div></details></div><span id="dirty"></span></header><div id="run-progress" class="run-progress" hidden><span id="run-phase">Подготовка</span><div id="run-bar" class="run-bar" role="progressbar"><i id="run-fill"></i></div><span id="run-value"></span></div><div class="notice" id="notice" role="status">Откройте IFC/SMDX в проекте и нажмите «Модели».</div><div class="workspace"><aside><div class="aside-title">Проверки</div><input id="test-search" type="search" placeholder="Поиск проверок"><div id="checks"></div><div class="aside-actions"><button id="all">Запустить все</button><button id="new" class="primary">＋ Новая проверка</button></div></aside><section class="main"><div id="content"></div></section></div><footer><span id="model-count">Модели не прочитаны</span><span>Расчёт выполняется на вашем компьютере</span></footer><input id="file" type="file" accept=".json" hidden><dialog id="settings-dialog"><h2>Настройки</h2><label>Дистанция камеры, м<input id="distance" type="number" value="15" min="0.5"></label><p class="links"><a href="https://nashepo.ru/" target="_blank" rel="noopener noreferrer">Сайт НашеПО</a><a href="https://t.me/RoburFan" target="_blank" rel="noopener noreferrer">Telegram</a></p><button data-close="settings-dialog">Закрыть</button></dialog><dialog id="help-dialog">${Ne}<button data-close="help-dialog">Закрыть</button></dialog><dialog id="set-dialog"><h2>Сохранить набор моделей</h2><label>Название<input id="set-name" maxlength="120"></label><div class="dialog-actions"><button id="set-cancel">Отмена</button><button id="set-confirm" class="primary">Сохранить</button></div></dialog></main>`;
  const V = document.createElement("button");
  V.id = "clear-project", V.textContent = "Очистить проект", x("save").after(V), n.querySelector(".more-popover").addEventListener(
    "click",
    () => n.querySelector(".more-menu").removeAttribute("open")
  );
  const N = (l, c = !1) => {
    x("notice").textContent = l, x("notice").classList.toggle("error", c);
  }, E = (l, c, f, u) => {
    const v = x("run-progress"), $ = x("run-bar"), I = x("run-fill");
    if (v.hidden = !1, x("notice").hidden = !0, x("run-phase").textContent = l, f && f > 0 && c !== void 0) {
      const j = Math.max(0, Math.min(100, c / f * 100));
      I.style.width = `${j}%`, $.setAttribute("aria-valuemin", "0"), $.setAttribute("aria-valuemax", "100"), $.setAttribute("aria-valuenow", String(Math.round(j))), x("run-value").textContent = `${Math.round(j)}% · ${c}/${f}` + (u === void 0 ? "" : ` · найдено ${u}`);
    } else
      I.style.width = "0", $.removeAttribute("aria-valuenow"), x("run-value").textContent = u === void 0 ? "" : `Найдено ${u}`;
    $.setAttribute("aria-valuetext", x("run-value").textContent || l);
  }, g = () => {
    x("run-progress").hidden = !0, x("notice").hidden = !1;
  }, w = async (l) => {
    try {
      await l();
    } catch (c) {
      N(c instanceof Error ? c.message : String(c), !0);
    }
  }, z = () => new Promise((l) => {
    const c = x("set-dialog"), f = x("set-name");
    let u = !1;
    const v = ($) => {
      u || (u = !0, c.close(), l($));
    };
    f.value = "Новый набор", x("set-confirm").onclick = () => {
      const $ = f.value.trim();
      $ ? v($) : f.focus();
    }, x("set-cancel").onclick = () => v(), c.oncancel = ($) => {
      $.preventDefault(), v();
    }, c.showModal(), f.focus(), f.select();
  }), S = () => {
    F = !0, x("dirty").textContent = "Есть несохранённые изменения", a && Dt.set(a, i), ye(o, i);
  }, b = () => {
    const l = e.projectToken();
    return !l || l === a ? !1 : (!a && (i.checks.length || i.sets.length) ? Dt.set(l, i) : i = Dt.get(l) || xe(e.projectId()) || ee(), Dt.set(l, i), a = l, o = e.projectId(), r = void 0, d = i.checks[0]?.id || "", p = "", D.clear(), h = 0, F = !1, e.clear(), x("dirty").textContent = "", !0);
  }, k = () => {
    const l = P();
    l?.lastRun && (l.status = "stale"), S(), Y();
  }, L = () => [
    ...new Set(
      (r?.elements || []).flatMap((l) => Object.keys(l.properties))
    )
  ].sort(), R = (l, c) => l.map(
    (f) => `<option value="${pt(f)}" ${f === c ? "selected" : ""}>${pt(f)}</option>`
  ).join("");
  function Z() {
    const l = P(), c = x("result-search")?.value.toLowerCase() || "", f = x("result-state")?.value || "", u = Number(x("result-depth")?.value || 0);
    return (l?.results || []).filter(
      (v) => (!f || v.state === f) && (l?.type === "duplicates" || Ie(v, u, l?.precision ?? 0)) && (!c || JSON.stringify({ ...v, image: void 0 }).toLowerCase().includes(c))
    );
  }
  function Y() {
    const l = x("test-search").value.toLowerCase();
    x("checks").innerHTML = i.checks.filter((c) => c.name.toLowerCase().includes(l)).map(
      (c) => `<button class="check-item ${c.id === d ? "active" : ""}" data-check="${c.id}"><strong>${pt(c.name)}</strong><small>${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[c.status]} · ${c.results.filter((f) => !["resolved", "excluded"].includes(f.state)).length} в работе / ${c.results.length}</small></button>`
    ).join("");
  }
  function lt(l, c) {
    const f = r?.elements.filter(
      (O) => (P().includeHidden || !O.hidden) && Gt(O, l)
    ).length || 0, u = l.manualOnly ? gt(l) : l.modelsMode === "selected" ? l.models : (r?.models || []).map((O) => O.id), v = r && u.every((O) => r.indexedModelIds.includes(O)) ? `${f} элементов` : "число после запуска", $ = r?.models || [], I = l.modelsMode !== "selected", j = i.sets.map(
      (O) => `<option value="${pt(O.id)}" ${l.presetId === O.id ? "selected" : ""}>${pt(O.name)}</option>`
    ).join("");
    return `<article class="selection" data-side="${c}"><h3>Выбор ${c.toUpperCase()} <span data-selection-count>${v}</span></h3>${l.manualOnly ? '<p class="selection-mode">Только элементы, выбранные вручную</p>' : ""}<div class="preset-row"><select class="preset"><option value="">Набор моделей…</option>${j}</select><button data-selection="load-set">Применить</button><button data-selection="save-set">Сохранить набор</button><button data-selection="delete-set" ${l.presetId ? "" : "disabled"}>Удалить</button></div><div class="model-list"><label class="model-all"><input type="checkbox" class="all-models" ${I ? "checked" : ""}> Все модели</label>${$.map((O) => `<label><input type="checkbox" class="model-check" value="${pt(O.id)}" ${I || l.models.includes(O.id) ? "checked" : ""}> ${pt(O.name)}</label>`).join("") || "<small>Нажмите «Модели».</small>"}</div><small>Отметьте файлы, которые должны участвовать в выборе ${c.toUpperCase()}.</small><div class="selection-tools"><button data-selection="show">Показать выбранные элементы</button><button data-selection="only">Только выделенные в 3D</button><button data-selection="include">＋ Добавить из 3D</button><button data-selection="exclude">− Исключить из 3D</button><button data-selection="reset">Сбросить ручной выбор</button></div><small>Добавлено вручную: ${l.include.length} · исключено: ${l.exclude.length}</small></article>`;
  }
  function q() {
    Y();
    const l = P();
    x("name").value = l?.name || "", x("check-summary").textContent = l ? `${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[l.status]} · ${l.results.filter((c) => !["resolved", "excluded"].includes(c.state)).length} в работе / ${l.results.length}` : "Проверка не выбрана";
    for (const c of ["name", "copy", "delete", "run"])
      x(c).disabled = !l || y;
    for (const c of n.querySelectorAll("[data-tab]"))
      c.classList.toggle("active", c.dataset.tab === m);
    if (!l) {
      x("content").innerHTML = '<div class="empty"><h2>Создайте первую проверку</h2><p>Обновите модели, затем выберите, какие элементы проверять друг с другом.</p></div>';
      return;
    }
    m === "select" && (x("content").innerHTML = `<div class="choose-layout"><div class="parameters"><h3>Параметры проверки</h3><label>Тип<select id="type"><option value="intersection" ${l.type === "intersection" ? "selected" : ""}>По пересечению</option><option value="duplicates" ${l.type === "duplicates" ? "selected" : ""}>Дублирование</option></select></label><label title="Запас при отборе и фильтрации; не обнуляет малые вхождения и не гарантирует погрешность оценки">Точность расчёта, мм<input id="precision" type="number" value="${l.precision}" min="0.001" max="100" step="0.1"></label><label title="Конфликты с меньшей оценкой глубины не попадут в результат">Минимальная глубина, мм<input id="min-penetration" type="number" value="${l.minPenetration}" min="0" max="100000" step="1" ${l.type === "duplicates" ? "disabled" : ""}></label><label class="check"><input id="touching" type="checkbox" ${l.touching ? "checked" : ""} ${l.type === "duplicates" ? "disabled" : ""}>Учитывать касания</label><small>Для отбора — большее из толщины перекрытия и захода прямого профиля вдоль оси. Подробнее — в справке.</small><p class="legend"><span class="part-a">● Выбор А</span><span class="part-b">● Выбор Б</span></p></div><div class="selection-grid">${lt(l.a, "a")}${lt(l.b, "b")}</div></div><datalist id="property-fields">${R(L(), "")}</datalist>`), m === "rules" && (x("content").innerHTML = `<div class="rules"><h3>Исключение пар</h3><p>Элемент сам с собой не проверяется. Пара А/Б учитывается один раз.</p><label class="check"><input id="same-model" type="checkbox" ${l.ignoreSameModel ? "checked" : ""}>Не проверять элементы одной модели</label><label class="check"><input id="same-group" type="checkbox" ${l.ignoreSameGroup ? "checked" : ""}>Не проверять геометрию одного составного объекта</label><label>Не проверять пары с одинаковым значением свойства<input id="equal-property" list="property-fields" value="${pt(l.equalProperty)}" placeholder="Без ограничения"></label><label class="check"><input id="hidden" type="checkbox" ${l.includeHidden ? "checked" : ""}>Включать скрытые элементы прочитанных моделей</label><p>Незагруженные подключённые файлы нужно открыть перед расчётом.</p><datalist id="property-fields">${R(L(), "")}</datalist></div>`), m === "results" && (x("content").innerHTML = `<div class="result-tools"><div class="result-filters"><input id="result-search" type="search" placeholder="Поиск по результатам"><select id="result-state"><option value="">Все состояния</option>${Object.entries(
      Ct
    ).map(([c, f]) => `<option value="${c}">${f}</option>`).join("")}</select>${l.type === "intersection" ? '<input id="result-depth" type="number" min="0" step="1" placeholder="Глубина от, мм">' : ""}<button id="show-markers" role="switch" aria-checked="${C}">${C ? "● Знаки" : "○ Знаки"}</button><span id="result-count"></span></div><div class="bulk-tools"><select id="bulk-state" title="Состояние для выбранных строк">${Object.entries(
      Ct
    ).map(([c, f]) => `<option value="${c}">${f}</option>`).join("")}</select><button id="bulk">Применить</button></div></div><div class="result-area"><div class="table-area"><div class="scroll" id="table"></div><div class="pager"><span id="selection-count"></span><button id="prev-page">←</button><span id="page"></span><button id="next-page">→</button></div></div><div class="detail" id="detail"></div></div>`, X(), tt()), m === "report" && (x("content").innerHTML = `<div class="report"><h3>${pt(l.name)}</h3><p>Результатов: ${l.results.length}. Выбрано: ${D.size}. ${l.status === "stale" ? "Результаты устарели — рекомендуется повторный запуск." : ""}</p><label class="check"><input id="selected-only" type="checkbox" ${D.size ? "checked" : ""}>Только выбранные строки</label><label class="check"><input id="report-images" type="checkbox" checked>Добавить снимки (недостающие будут созданы автоматически)</label><button id="export-html" class="primary">Сформировать HTML-отчёт</button><button id="export-viewer">Сессия для плагина «Коллизии»</button><p>Правила и все результаты сохраняются кнопкой «Сохранить проверки» в верхней панели.</p></div>`), x("content").inert = y;
  }
  const Q = (l) => l.axialPenetrationMm !== void 0 ? `Для отбора используется большее значение: толщина ${l.overlapThicknessMm === void 0 ? "не определена" : zt(l.overlapThicknessMm) + " мм"}; продольный заход ${zt(l.axialPenetrationMm)} мм` : l.kind === "touch" ? "Тела соприкасаются, общего объёма нет" : l.depth === "unmeasurable" ? "У элемента нет собственного объёма, замер глубины к нему неприменим" : l.depth === "tolerance" ? "Пересечение найдено, но его глубина не разрешена при текущем расчёте" : l.depth === "approximate" ? "Восстановлена внутренняя область оболочки, совмещены швы либо сокращён расчёт; точность числа не гарантируется" : "Оценка локальной толщины перекрытия двух элементов";
  function X() {
    const l = P(), c = Z(), f = Math.max(1, Math.ceil(c.length / 50));
    h = Math.max(0, Math.min(h, f - 1));
    const u = c.slice(h * 50, h * 50 + 50);
    x("table").innerHTML = c.length ? `<table><thead><tr><th><input id="check-page" type="checkbox" aria-label="Выбрать страницу" ${u.every((v) => D.has(v.id)) ? "checked" : ""}></th>${["№", "Состояние", "Глубина, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "Комментарий"].map((v) => `<th>${v}</th>`).join("")}</tr></thead><tbody>${u.map((v, $) => `<tr data-result="${pt(v.id)}" class="${v.id === p ? "active" : ""}"><td><input type="checkbox" class="row-check" aria-label="Выбрать конфликт" ${D.has(v.id) ? "checked" : ""}></td>${[h * 50 + $ + 1, Ct[v.state], Kt(v, l.type), v.a.name, v.a.model, v.a.guid || "—", v.b.name, v.b.model, v.b.guid || "—", v.note].map((I) => `<td title="${pt(I)}">${pt(I)}</td>`).join("")}</tr>`).join("")}</tbody></table>` : '<div class="empty">Нет результатов. Запустите проверку или измените фильтры.</div>', x("page").textContent = `${h + 1} / ${f}`, x("result-count").textContent = `${c.length} результатов`, x("selection-count").textContent = `Выбрано: ${D.size}`, x("prev-page").disabled = h === 0, x("next-page").disabled = h === f - 1;
  }
  function tt() {
    const l = P(), c = Z(), f = c.findIndex((v) => v.id === p), u = l?.results.find((v) => v.id === p);
    x("detail").innerHTML = u ? `<div class="detail-head"><div><small>КОЛЛИЗИЯ</small><h3>#${f + 1} ${pt(u.a.name)} × ${pt(u.b.name)}</h3></div><div class="detail-nav"><button id="previous" title="Предыдущая коллизия" ${f <= 0 ? "disabled" : ""}>‹</button><button id="next" title="Следующая коллизия" ${f < 0 || f >= c.length - 1 ? "disabled" : ""}>›</button></div></div><div class="clash-summary"><span>${l?.type === "duplicates" ? "Дублирование" : "Пересечение"}</span><span title="${pt(Q(u))}">${l?.type === "duplicates" ? "Совпадение геометрии" : u.kind === "touch" ? "Касание" : u.depth ? Ee[u.depth] : `Глубина ${zt(u.penetrationMm)} мм`}</span><span>${pt(Ct[u.state])}</span></div><p class="legend"><span class="part-a">● Элемент А</span><span class="part-b">● Элемент Б</span></p><div class="preview-slot">${u.image ? `<button id="open-image" class="preview"><img src="${pt(u.image)}" alt="Снимок коллизии"><span>Открыть крупнее</span></button>` : '<div class="preview-empty"><span>◫</span><small>Снимок создастся после перехода в 3D</small></div>'}</div><div class="detail-actions"><button id="focus" class="primary">Перейти в 3D</button><button id="capture-image">▣ Снимок пары</button></div><div class="detail-scroll">${u.axialPenetrationMm !== void 0 ? `<div class="depth-breakdown"><span>Толщина перекрытия</span><b>${u.overlapThicknessMm === void 0 ? "—" : zt(u.overlapThicknessMm) + " мм"}</b><span>Заход вдоль оси</span><b>${zt(u.axialPenetrationMm)} мм</b><small>Для фильтра — большее из двух значений. Заход учитывает внутреннее пространство конструкции.</small></div>` : ""}<div class="coordinates">${u.point.map((v, $) => `<span>${["X", "Y", "Z"][$]} ${v.toFixed(3)}</span>`).join("")}</div><label>Состояние<select id="edit-state">${Object.entries(
      Ct
    ).map(
      ([v, $]) => `<option value="${v}" ${u.state === v ? "selected" : ""}>${$}</option>`
    ).join(
      ""
    )}</select></label><label>Назначение<input id="assignee" value="${pt(u.assignee)}"></label><label>Комментарий<textarea id="note" rows="2">${pt(u.note)}</textarea></label>${[
      u.a,
      u.b
    ].map(
      (v, $) => `<details><summary>Элемент ${$ ? "Б" : "А"} · свойства</summary><dl>${Object.entries(
        v.properties
      ).map(([I, j]) => `<dt>${pt(I)}</dt><dd>${pt(j)}</dd>`).join("")}</dl></details>`
    ).join("")}</div>` : '<div class="detail-empty"><span>◫</span><p>Выберите коллизию в таблице</p><small>Двойной щелчок сразу перенесёт камеру в 3D.</small></div>';
  }
  const gt = (l) => {
    const c = new Set(
      !l.manualOnly && l.modelsMode === "selected" ? l.models : []
    );
    for (const f of l.include)
      try {
        c.add(String(JSON.parse(f)[0]));
      } catch {
        const u = r?.elements.find(
          (v) => v.id === f
        )?.modelId;
        u && c.add(u);
      }
    return [...c];
  }, at = () => {
    const l = P();
    if (!(!l || m !== "select"))
      for (const c of n.querySelectorAll("[data-side]")) {
        const f = c.dataset.side, u = [...c.querySelectorAll(".model-check")];
        if (!u.length) continue;
        const v = u.filter((j) => j.checked).map((j) => j.value), $ = v.length === u.length, I = l[f];
        I.modelsMode = $ ? "all" : "selected", I.models = $ ? [] : v, I.conditions = [], I.mode = "all";
      }
  }, jt = (l) => {
    if (!l?.length) return;
    const c = /* @__PURE__ */ new Set();
    for (const f of l)
      for (const u of [f.a, f.b]) {
        if (!u.manualOnly && u.modelsMode !== "selected") return;
        for (const v of gt(u)) c.add(v);
      }
    return c;
  }, yt = (l) => {
    let c = l.trim().replace(/\\/g, "/").toLocaleLowerCase();
    try {
      c = decodeURIComponent(c);
    } catch {
    }
    c = c.replace(/[?#].*$/, "");
    const f = c.split("/").filter(Boolean).at(-1) || c;
    return /* @__PURE__ */ new Set([c, f]);
  }, qt = (l) => {
    const c = new Set(l.map((j) => j.id)), f = l.map((j) => ({
      id: j.id,
      aliases: /* @__PURE__ */ new Set([
        ...yt(j.id),
        ...yt(j.name)
      ])
    })), u = (j) => {
      if (c.has(j)) return j;
      const O = yt(j), B = f.filter(
        (J) => [...O].some((dt) => J.aliases.has(dt))
      );
      return B.length === 1 ? B[0].id : j;
    }, v = (j) => {
      try {
        const O = JSON.parse(j);
        if (!Array.isArray(O) || O.length < 2) return j;
        const B = String(O[0]), J = u(B);
        return J === B ? j : JSON.stringify([J, ...O.slice(1)]);
      } catch {
        return j;
      }
    };
    let $ = !1;
    const I = (j) => {
      const O = j.models.map(u), B = j.include.map(v), J = j.exclude.map(v);
      (O.some((dt, ft) => dt !== j.models[ft]) || B.some((dt, ft) => dt !== j.include[ft]) || J.some((dt, ft) => dt !== j.exclude[ft])) && (j.models = [...new Set(O)], j.include = [...new Set(B)], j.exclude = [...new Set(J)], $ = !0);
    };
    for (const j of i.checks)
      I(j.a), I(j.b), j.modelsAtRun && (j.modelsAtRun = j.modelsAtRun.map(u));
    for (const j of i.sets) {
      const O = j.selection.models.map(u);
      O.some((B, J) => B !== j.selection.models[J]) && (j.selection.models = [...new Set(O)], $ = !0);
    }
    return $ && S(), $;
  }, rt = () => {
    const l = P();
    if (l)
      for (const c of n.querySelectorAll("[data-side]")) {
        const f = c.dataset.side, u = r?.elements.filter(
          (j) => (l.includeHidden || !j.hidden) && Gt(j, l[f])
        ).length || 0, v = l[f].manualOnly ? gt(l[f]) : l[f].modelsMode === "selected" ? l[f].models : (r?.models || []).map((j) => j.id), $ = !!r && v.every((j) => r.indexedModelIds.includes(j)), I = c.querySelector(
          "[data-selection-count]"
        );
        I && (I.textContent = $ ? `${u} элементов` : "число после запуска");
      }
  };
  function it() {
    e.markers(
      Z(),
      p,
      C,
      (l) => w(() => ot(l, !0))
    );
  }
  function ot(l, c = !1) {
    if (!y) {
      if (p = l, m === "results") {
        const f = Z().findIndex((v) => v.id === l), u = f < 0 ? h : Math.floor(f / 50);
        u !== h && (h = u, X());
        for (const v of n.querySelectorAll("[data-result]"))
          v.classList.toggle("active", v.dataset.result === l);
        tt(), requestAnimationFrame(() => {
          [...n.querySelectorAll("[data-result]")].find(
            ($) => $.dataset.result === l
          )?.scrollIntoView({ block: "nearest", inline: "nearest" });
        });
      }
      if (it(), c) {
        const f = P()?.results.find((u) => u.id === l);
        f && (e.focus(f, Number(x("distance").value)), mt(f));
      }
    }
  }
  function mt(l) {
    clearTimeout(T);
    const c = ++G, f = Number(x("distance").value);
    l.image && l.imageScope === "pair-ab" && l.imageDistance === f || !e.canLocate(l) || (T = window.setTimeout(async () => {
      if (!(c !== G || y || p !== l.id))
        try {
          const u = await e.snapshot(
            l,
            f,
            () => c !== G || y || p !== l.id,
            !1,
            !1
          );
          if (c !== G || p !== l.id) return;
          l.image = u, l.imageScope = "pair-ab", l.imageDistance = f, S(), m === "results" && tt();
        } catch (u) {
          c === G && p === l.id && N(
            "Не удалось создать снимок выбранной коллизии: " + (u instanceof Error ? u.message : String(u)),
            !0
          );
        }
    }, 500));
  }
  async function wt(l) {
    M = !1, nt(!0), E("Создание снимка пары");
    try {
      const c = Number(x("distance").value);
      l.image = await e.snapshot(l, c, () => M), l.imageScope = "pair-ab", l.imageDistance = c, S(), m === "results" && p === l.id && tt();
    } catch (c) {
      N(
        "Результаты сохранены. Снимок пары не создан: " + (c instanceof Error ? c.message : String(c)),
        !0
      );
    } finally {
      g(), nt(!1);
    }
  }
  async function ct(l, c = !1) {
    b(), E("Подготовка моделей");
    let f = c ? /* @__PURE__ */ new Set() : jt(l);
    if (!c && f?.size) {
      const u = await e.scan(
        (v) => E(v),
        () => M,
        /* @__PURE__ */ new Set()
      );
      r = u, qt(u.models) && (f = jt(l));
    }
    r = await e.scan(
      (u) => {
        N(u), E(u);
      },
      () => M,
      f
    ), x("model-count").textContent = `Проиндексировано моделей: ${r.indexedModelIds.length} из ${r.models.length} · элементов: ${r.elements.length}`, q(), N(
      r.blockers.length ? r.blockers.join(" ") : r.warnings.length ? `Модели прочитаны с замечаниями. ${r.warnings.join(" ")}` : "Модели прочитаны. Настройте выборки и запустите проверку.",
      !!r.blockers.length
    );
  }
  const nt = (l) => {
    y = l, l && (clearTimeout(T), G++);
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
      x(c).disabled = l;
    x("cancel").hidden = !l, x("content").inert = l, x("checks").inert = l;
  };
  async function H(l) {
    const c = (u) => {
      const v = `${l.name} · ${u.phase}`;
      N(`${v} ${u.done}/${u.total} · найдено ${u.found}`), E(v, u.done, u.total, u.found);
    };
    let f;
    try {
      f = new Ke();
    } catch {
      return Xe(
        r.elements,
        l,
        c,
        () => M,
        (u) => e.geometry(u, () => M)
      );
    }
    return A = f, new Promise((u, v) => {
      const $ = () => {
        f.terminate(), A = void 0, _ = void 0;
      };
      _ = () => {
        $(), v(Error("Расчёт отменён. Предыдущие результаты сохранены."));
      }, f.onmessage = async (I) => {
        if (I.data.load) {
          try {
            const j = await e.geometry(
              I.data.load,
              () => M || A !== f
            );
            if (A !== f) return;
            const O = [
              j.vertices?.buffer,
              j.indices?.buffer
            ].filter(Boolean);
            f.postMessage(
              { request: I.data.request, geometry: j },
              O
            );
          } catch (j) {
            A === f && f.postMessage({
              request: I.data.request,
              error: j instanceof Error ? j.message : String(j)
            });
          }
          return;
        }
        I.data.progress ? c(I.data.progress) : ($(), I.data.error ? v(Error(I.data.error)) : u(I.data.results));
      }, f.onerror = (I) => {
        $(), v(
          Error(
            `Не удалось запустить расчёт в фоновом потоке: ${I.message || "ошибка загрузки"}`
          )
        );
      }, f.postMessage({
        elements: r.elements,
        streaming: typeof e.geometry == "function",
        check: structuredClone({ ...l, results: [], warnings: [] })
      });
    });
  }
  async function kt(l = !1) {
    if (y) return;
    b(), at();
    const c = l ? [...i.checks] : [P()].filter(Boolean);
    if (!c.length) throw Error("Создайте проверку.");
    for (const f of c)
      for (const u of [f.a, f.b])
        u.conditions = [], u.mode = "all";
    M = !1, nt(!0), E("Подготовка моделей");
    try {
      if (await ct(c), nt(!0), r.blockers.length)
        throw Error(
          "Состав моделей прочитан не полностью. " + r.blockers.join(" ")
        );
      for (const u of c) {
        if (M) break;
        for (const j of [u.a, u.b]) {
          if (j.modelsMode === "selected" && j.models.some((O) => !r.models.some((B) => B.id === O)))
            throw Error(
              `${u.name}: одна из моделей выборки отсутствует. Исправьте выборку.`
            );
          if (j.include.some((O) => !r.elements.some((B) => B.id === O)))
            throw Error(
              `${u.name}: вручную добавленный элемент отсутствует в модели.`
            );
        }
        const v = Le(u);
        if (u.configAtRun === v && u.modelsAtRun?.some(
          (j) => !r.models.some((O) => O.id === j)
        ))
          throw Error(
            `${u.name}: состав моделей уменьшился. Подключите прежние модели или создайте копию проверки для нового состава. Прежние результаты сохранены.`
          );
        const $ = await H(u);
        if (M || !e.isCurrent())
          throw Error(
            "Проект изменился или расчёт отменён. Предыдущие результаты сохранены."
          );
        const I = (/* @__PURE__ */ new Date()).toISOString();
        u.results = Fe(
          u.configAtRun === v ? u.results : [],
          $,
          I
        ), u.lastRun = I, u.fingerprint = r.fingerprint, u.configAtRun = v, u.modelsAtRun = [...r.indexedModelIds], u.status = "done", u.warnings = [...r.warnings], d = u.id, p = u.results[0]?.id || "", D.clear(), S();
      }
      m = "results", q(), it(), N(
        `Проверка завершена. ${P()?.results.length || 0} результатов. Сохраните проверки для продолжения работы.`
      );
      const f = P()?.results.find((u) => u.id === p);
      f && !M && await wt(f);
    } finally {
      g(), nt(!1), q();
    }
  }
  function _t(l) {
    const c = l.closest("[data-side]")?.dataset.side;
    if (!c) return;
    const f = P()[c], u = l, v = l.closest("[data-side]");
    if (u.classList.contains("preset")) {
      f.presetId = u.value || void 0, v.querySelector(
        '[data-selection="delete-set"]'
      ).disabled = !f.presetId;
      return;
    }
    if (u.classList.contains("all-models")) {
      for (const $ of v.querySelectorAll(
        ".model-check"
      ))
        $.checked = u.checked;
      f.modelsMode = u.checked ? "all" : "selected", f.models = [], f.manualOnly = !1, f.presetId = void 0;
    }
    if (u.classList.contains("model-check")) {
      const $ = [
        ...v.querySelectorAll(".model-check")
      ], I = $.filter((O) => O.checked).map((O) => O.value), j = $.length > 0 && I.length === $.length;
      v.querySelector(".all-models").checked = j, f.modelsMode = j ? "all" : "selected", f.models = j ? [] : I, f.manualOnly = !1, f.presetId = void 0;
    }
    f.conditions = [], f.mode = "all", k(), rt();
  }
  x("new").onclick = () => {
    const l = qe();
    l.name = `Проверка ${i.checks.length + 1}`, i.checks.push(l), d = l.id, m = "select", p = "", D.clear(), S(), q();
  }, x("scan").onclick = () => w(async () => {
    at(), M = !1, nt(!0), E("Чтение моделей");
    try {
      const l = P();
      await ct(l ? [l] : void 0, !l);
    } finally {
      g(), nt(!1), q();
    }
  }), x("run").onclick = () => w(() => kt()), x("all").onclick = () => w(() => kt(!0)), x("cancel").onclick = () => {
    M = !0, _?.();
  }, x("test-search").oninput = Y, x("checks").onclick = (l) => {
    const c = l.target.closest(
      "[data-check]"
    );
    c && !y && (e.clear(), d = c.dataset.check, p = "", D.clear(), h = 0, q());
  }, x("tabs").onclick = (l) => {
    const c = l.target.closest("[data-tab]");
    c && !y && (m = c.dataset.tab, q());
  }, x("name").onchange = () => {
    const l = P();
    l && (l.name = x("name").value.trim() || "Проверка", S(), Y());
  }, x("copy").onclick = () => {
    const l = P();
    if (!l) return;
    const c = structuredClone(l);
    Object.assign(c, {
      id: crypto.randomUUID(),
      name: l.name + " — копия",
      results: [],
      lastRun: void 0,
      fingerprint: void 0,
      configAtRun: void 0,
      status: "new"
    }), i.checks.push(c), d = c.id, p = "", D.clear(), S(), q();
  }, x("delete").onclick = () => {
    P() && confirm(`Удалить проверку «${P().name}» и её результаты?`) && (i.checks = i.checks.filter((l) => l.id !== d), d = i.checks[0]?.id || "", D.clear(), e.clear(), S(), q());
  }, x("clear-project").onclick = () => {
    !i.checks.length && !i.sets.length || confirm(
      "Очистить проверки, наборы моделей и результаты текущего проекта?"
    ) && (i.checks = [], i.sets = [], r = void 0, d = "", p = "", D.clear(), e.clear(), S(), x("model-count").textContent = "Модели не прочитаны", q(), N("Данные проверок текущего проекта очищены."));
  }, x("save").onclick = () => {
    be("НашеПО-проверки.json", JSON.stringify(i, null, 2)), F = !1, x("dirty").textContent = "Файл проверок сохранён";
  }, x("open").onclick = () => x("file").click(), x("file").onchange = () => w(async () => {
    const l = x("file").files?.[0];
    if (!l) return;
    const c = Se(await l.text());
    F && !confirm("Заменить текущие несохранённые проверки данными из файла?") || (i = c, a && Dt.set(a, i), ye(o, i), d = i.checks[0]?.id || "", p = "", D.clear(), e.clear(), F = !1, x("dirty").textContent = "Проверки открыты", q(), N("Проверки открыты. Обновите модели перед переходом к элементам."), x("file").value = "");
  });
  for (const l of ["settings", "help"])
    x(l).onclick = () => x(l + "-dialog").showModal();
  for (const l of n.querySelectorAll("[data-close]"))
    l.onclick = () => x(l.dataset.close).close();
  x("content").onchange = (l) => w(() => {
    const c = l.target, f = P();
    if (!f) return;
    if (c.closest("[data-side]")) {
      _t(c);
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
        const v = Number(c.value);
        if (!Number.isFinite(v) || v < 1e-3 || v > 100)
          throw c.value = String(f.precision), Error("Точность должна быть от 0,001 до 100 мм.");
        f.precision = v;
      }
      if (c.id === "min-penetration") {
        const v = Number(c.value);
        if (!Number.isFinite(v) || v < 0 || v > 1e5)
          throw c.value = String(f.minPenetration), Error(
            "Минимальная глубина должна быть от 0 до 100 000 мм."
          );
        f.minPenetration = v;
      }
      c.id === "type" && (f.type = c.value), c.id === "touching" && (f.touching = c.checked), c.id === "same-model" && (f.ignoreSameModel = c.checked), c.id === "same-group" && (f.ignoreSameGroup = c.checked), c.id === "hidden" && (f.includeHidden = c.checked), c.id === "equal-property" && (f.equalProperty = c.value), k(), q();
      return;
    }
    if (c.id === "result-state") {
      h = 0, X();
      return;
    }
    if (c.id === "check-page") {
      for (const v of Z().slice(h * 50, h * 50 + 50))
        c.checked ? D.add(v.id) : D.delete(v.id);
      X();
      return;
    }
    if (c.classList.contains("row-check")) {
      const v = c.closest("[data-result]").dataset.result;
      c.checked ? D.add(v) : D.delete(v), x("selection-count").textContent = `Выбрано: ${D.size}`;
      return;
    }
    const u = f.results.find((v) => v.id === p);
    u && (c.id === "edit-state" && (u.state = c.value, X(), Y(), it()), c.id === "assignee" && (u.assignee = c.value), c.id === "note" && (u.note = c.value, X()), S());
  }), x("content").oninput = (l) => {
    const c = l.target;
    (c.id === "result-search" || c.id === "result-depth") && (h = 0, X());
    const f = P(), u = Number(c.value);
    f && c.id === "precision" && Number.isFinite(u) && u >= 1e-3 && u <= 100 && (f.precision = u, k()), f && c.id === "min-penetration" && Number.isFinite(u) && u >= 0 && u <= 1e5 && (f.minPenetration = u, k());
  }, x("content").onclick = (l) => w(async () => {
    const c = l.target, f = c.closest("button"), u = P();
    if (!u) return;
    if (f?.dataset.selection) {
      const $ = f.closest("[data-side]").dataset.side, I = u[$], j = x("content").scrollTop;
      let O = !0;
      switch (f.dataset.selection) {
        case "load-set": {
          const B = i.sets.find((J) => J.id === I.presetId);
          if (!B) throw Error("Выберите сохранённый набор моделей.");
          Object.assign(I, structuredClone(B.selection), {
            conditions: [],
            mode: "all",
            include: [],
            exclude: [],
            manualOnly: !1,
            presetId: B.id
          });
          break;
        }
        case "save-set": {
          if (I.manualOnly)
            throw Error(
              "Ручную выборку элементов нельзя сохранить как набор моделей."
            );
          const B = await z();
          if (!B) return;
          const J = {
            id: crypto.randomUUID(),
            name: B,
            selection: {
              models: [...I.models],
              modelsMode: I.modelsMode,
              conditions: [],
              mode: "all"
            }
          };
          i.sets.push(J), I.presetId = J.id, O = !1;
          break;
        }
        case "delete-set": {
          const B = i.sets.find((J) => J.id === I.presetId);
          if (!B) throw Error("Выберите сохранённый набор моделей.");
          if (!confirm(`Удалить набор «${B.name}»?`)) return;
          i.sets = i.sets.filter((J) => J.id !== B.id);
          for (const J of i.checks)
            for (const dt of [J.a, J.b])
              dt.presetId === B.id && (dt.presetId = void 0);
          O = !1;
          break;
        }
        case "show":
          e.select(
            (r?.elements || []).filter((B) => (u.includeHidden || !B.hidden) && Gt(B, I)).map((B) => B.id)
          );
          return;
        case "only": {
          const B = e.selected();
          if (!B.length) throw Error("Выделите элементы в 3D-сцене.");
          I.include = B, I.exclude = [], I.manualOnly = !0;
          break;
        }
        case "include": {
          const B = e.selected();
          if (!B.length) throw Error("Выделите элементы в 3D-сцене.");
          I.include = [.../* @__PURE__ */ new Set([...I.include, ...B])], I.exclude = I.exclude.filter((J) => !B.includes(J));
          break;
        }
        case "exclude": {
          const B = e.selected();
          if (!B.length) throw Error("Выделите элементы в 3D-сцене.");
          I.exclude = [.../* @__PURE__ */ new Set([...I.exclude, ...B])], I.include = I.include.filter((J) => !B.includes(J));
          break;
        }
        case "reset":
          I.manualOnly = !1, I.include = [], I.exclude = [];
      }
      O ? k() : S(), q(), x("content").scrollTop = j;
      return;
    }
    if (f?.id === "prev-page" && (h--, X()), f?.id === "next-page" && (h++, X()), f?.id === "show-markers" && (C = !C, f.textContent = C ? "● Знаки включены" : "○ Знаки выключены", f.setAttribute("aria-checked", String(C)), it()), f?.id === "bulk") {
      const $ = x("bulk-state").value;
      for (const I of u.results) D.has(I.id) && (I.state = $);
      S(), X(), tt(), Y(), it();
    }
    if (f?.id === "capture-image") {
      const $ = u.results.find((I) => I.id === p);
      if ($) {
        M = !1, nt(!0), E("Создание снимка пары");
        try {
          $.image = await e.snapshot(
            $,
            Number(x("distance").value),
            () => M,
            !0
          ), $.imageScope = "pair-ab", $.imageDistance = void 0, S(), tt(), N("Снимок сохранён в результат.");
        } finally {
          g(), nt(!1);
        }
      }
      return;
    }
    if (f?.id === "open-image") {
      const $ = u.results.find((I) => I.id === p);
      if ($?.image) {
        const I = document.createElement("dialog");
        I.className = "image-dialog", I.innerHTML = '<button>Закрыть</button><img alt="Снимок коллизии">', I.querySelector("img").src = $.image, I.querySelector("button").onclick = () => {
          I.close(), I.remove();
        }, n.append(I), I.showModal();
      }
      return;
    }
    if (f?.id === "focus" && ot(p, !0), f?.id === "previous" || f?.id === "next") {
      const $ = Z(), I = $.findIndex((j) => j.id === p) + (f.id === "next" ? 1 : -1);
      $[I] && ot($[I].id, !0);
    }
    if (f?.id === "export-html" || f?.id === "export-viewer") {
      let $ = 0;
      const I = x("selected-only").checked ? u.results.filter((O) => D.has(O.id)) : u.results;
      if (!I.length) throw Error("Нет результатов для отчёта.");
      if (x("report-images").checked) {
        const O = e.view, B = O?.storeView(), J = Number(x("distance").value);
        M = !1, nt(!0), E("Подготовка снимков отчёта", 0, I.length);
        try {
          await e.captureWorkspace(async () => {
            let dt = 0;
            for (const ft of I) {
              if (M)
                throw Error(
                  "Подготовка отчёта отменена. Уже полученные снимки сохранены."
                );
              E(
                "Подготовка снимков отчёта",
                dt,
                I.length
              ), N("Подготовка снимков: " + (dt + 1) + " / " + I.length);
              const Wt = ft.imageScope !== "pair-ab" || ft.imageDistance !== void 0 && ft.imageDistance !== J;
              if (!ft.image || Wt) {
                if (ft.state === "resolved" && !e.canLocate(ft)) {
                  dt++;
                  continue;
                }
                try {
                  ft.image = await e.snapshot(ft, J, () => M), ft.imageScope = "pair-ab", ft.imageDistance = J, S();
                } catch (te) {
                  if (M || !e.isCurrent()) throw te;
                  $++;
                }
              }
              dt++, E("Подготовка снимков отчёта", dt, I.length);
            }
          });
        } finally {
          if (O && e.isCurrent()) {
            const dt = u.results.find((ft) => ft.id === p);
            if (dt)
              try {
                e.focus(dt, J, !1);
              } catch {
              }
            B && O.restoreView(B);
          }
          g(), nt(!1);
        }
      }
      const j = x("report-images").checked ? I.map(
        (O) => O.imageScope === "pair-ab" ? O : { ...O, image: void 0 }
      ) : I.map((O) => ({ ...O, image: void 0 }));
      be(
        u.name + (f.id === "export-html" ? ".html" : ".collision360.json"),
        f.id === "export-html" ? _e(u, j) : tn(u, j)
      ), N(
        "Отчёт подготовлен. Результатов: " + I.length + "; со снимками: " + j.filter((O) => O.image).length + "." + ($ ? ` Не удалось создать снимков: ${$}; эти строки включены без изображения.` : ""),
        $ > 0
      );
    }
    const v = c.closest("[data-result]");
    v && !c.closest("input") && !window.getSelection()?.toString() && ot(v.dataset.result);
  }), x("content").ondblclick = (l) => {
    const c = l.target, f = c.closest("[data-result]");
    f && !c.closest("input") && w(() => ot(f.dataset.result, !0));
  };
  const Qt = setInterval(() => {
    y || (b() ? (x("model-count").textContent = "Модели не прочитаны", N(
      i.checks.length ? "Открыт другой проект. Показаны его проверки; обновите модели." : "Открыт другой проект. Для него ещё нет проверок."
    ), y || q()) : r && !e.isCurrent() && (r = void 0, e.clear(), x("model-count").textContent = "3D-окно изменилось", N("Активное 3D-окно изменилось. Обновите модели."), y || q()));
  }, 1500);
  return q(), () => {
    s(), clearInterval(Qt), clearTimeout(T), G++, M = !0, _?.(), A?.terminate(), e.clear();
  };
}
var le = /* @__PURE__ */ ((t) => (t.object = "object", t.drawing = "drawing", t.table = "table", t.record = "record", t.textStyle = "textstyle", t.textStyleTable = "textstyles", t.linetype = "linetype", t.linetypeTable = "linetypes", t.layer = "layer", t.layerTable = "layers", t.block = "block", t.blockTable = "blocks", t.layout = "layout", t.layoutTable = "layouts", t.type = "type", t.typeTable = "types", t.material = "material", t.materialTable = "materials", t.geometry = "geometry", t.geometryTable = "geometries", t.group = "group", t.groupTable = "groups", t.attachment = "attachment", t.attachmentTable = "attachments", t.entities = "entities", t.entity = "entity", t.line = "l", t.solid = "s", t.insert = "i", t.polyline = "p", t.circle = "c", t.arc = "a", t.polyline3d = "p3", t.proxy = "x", t.text = "t", t.mtext = "mt", t.wipeout = "w", t.model3d = "g", t.alignment = "al", t))(le || {});
const ce = () => new Promise((t) => requestAnimationFrame(() => t()));
function ze(t) {
  const { width: e, height: n } = t.camera, s = Array.from(document.querySelectorAll("canvas")).filter(
    (o) => {
      const i = o.getBoundingClientRect();
      return i.width > 100 && i.height > 100 && o.width > 0 && o.height > 0 && getComputedStyle(o).visibility !== "hidden" && (Math.abs(i.width - e) < 4 && Math.abs(i.height - n) < 4 || Math.abs(o.width - e) < 4 && Math.abs(o.height - n) < 4);
    }
  );
  if (!s.length)
    throw Error(
      "Снимок 3D-окна недоступен: откройте одно видимое окно модели."
    );
  const a = s[0].getBoundingClientRect();
  if (s.some((o) => {
    const i = o.getBoundingClientRect();
    return Math.abs(i.x - a.x) > 4 || Math.abs(i.y - a.y) > 4;
  }))
    throw Error(
      "Открыто несколько подходящих 3D-окон. Оставьте одно окно для снимка."
    );
  return { candidates: s, rect: a };
}
async function an(t) {
  await ce(), t.repaint();
  const { candidates: e, rect: n } = ze(t), s = document.createElement("canvas");
  s.width = Math.max(1, Math.round(n.width * devicePixelRatio)), s.height = Math.max(1, Math.round(n.height * devicePixelRatio)), Object.assign(s.style, {
    position: "fixed",
    left: `${n.left}px`,
    top: `${n.top}px`,
    width: `${n.width}px`,
    height: `${n.height}px`,
    zIndex: "2147483646",
    pointerEvents: "none"
  });
  const a = s.getContext("2d");
  for (const o of e)
    a.drawImage(o, 0, 0, s.width, s.height);
  return document.body.append(s), async () => {
    t.repaint(), await ce(), s.remove();
  };
}
async function sn(t, e) {
  if (await ce(), e()) throw Error("Подготовка снимков отменена.");
  const { candidates: n } = ze(t), s = document.createElement("canvas"), a = Math.min(1, 1280 / n[0].width);
  s.width = Math.round(n[0].width * a), s.height = Math.round(n[0].height * a);
  const o = s.getContext("2d");
  o.fillStyle = "#20242b", o.fillRect(0, 0, s.width, s.height), t.repaint();
  for (const i of n)
    o.drawImage(i, 0, 0, s.width, s.height);
  try {
    return s.toDataURL("image/jpeg", 0.82);
  } catch {
    throw Error("Браузер запретил чтение изображения 3D-окна.");
  }
}
const ne = "nashepo.checks.points", we = "nashepo.checks.highlight";
function ve(t) {
  let e = performance.now();
  return async () => {
    if (t()) throw Error("Операция отменена.");
    performance.now() - e >= 16 && (await new Promise((n) => setTimeout(n, 0)), e = performance.now());
  };
}
function Vt(t, e, n, s = 0) {
  if (s > 12 || t == null) return;
  if (typeof t != "object") {
    n[e] = String(t);
    return;
  }
  if (Array.isArray(t)) {
    t.forEach((o, i) => Vt(o, `${e}[${i}]`, n, s + 1));
    return;
  }
  const a = t;
  if ("$value" in a) {
    Vt(a.$value, e, n, s + 1);
    return;
  }
  for (const [o, i] of Object.entries(a))
    o.startsWith("$") || Vt(i, e ? `${e}.${o}` : o, n, s + 1);
}
function rn(t) {
  const e = t.vertices.length / 3, n = (i) => Number.isFinite(t.vertices[i * 3]) && Number.isFinite(t.vertices[i * 3 + 1]) && Number.isFinite(t.vertices[i * 3 + 2]), s = (i) => {
    const r = t.indices[i], d = t.indices[i + 1], m = t.indices[i + 2];
    return r < e && d < e && m < e && r !== d && d !== m && m !== r && n(r) && n(d) && n(m);
  };
  let a = 0;
  for (let i = 0; i < t.indices.length; i += 3) s(i) && (a += 3);
  if (a === t.indices.length) return t.indices;
  const o = new Uint32Array(a);
  for (let i = 0, r = 0; i < t.indices.length; i += 3)
    s(i) && (o[r++] = t.indices[i], o[r++] = t.indices[i + 1], o[r++] = t.indices[i + 2]);
  return o;
}
const ie = (t) => /\.wdx(?:[?#].*)?$/i.test(t);
class ln {
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
    const n = this.captureDepth++ === 0;
    if (n) {
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
      if (this.captureDepth--, n && this.captureLayout) {
        const { panel: s, size: a, maximized: o } = this.captureLayout;
        this.captureLayout = void 0, s.size = a, s.maximized = o, await new Promise(
          (i) => requestAnimationFrame(() => requestAnimationFrame(() => i()))
        );
      }
    }
  }
  async scan(e, n, s) {
    const a = this.app, o = this.view, i = a?.model;
    if (!o || !i?.layouts || !i.attachments)
      throw Error(
        "Откройте проект Топоматик 360 с IFC или SMDX и сделайте его 3D-окно активным."
      );
    const r = [], d = /* @__PURE__ */ new Set(), m = [], p = [], h = [], y = /* @__PURE__ */ new Map(), M = /* @__PURE__ */ new Set();
    let A = 2166136261;
    const C = ve(
      () => n() || a !== this.app || o !== this.view
    );
    let F = -1 / 0;
    const D = (T) => {
      for (let G = 0; G < T.length; G++)
        A = Math.imul(A ^ T.charCodeAt(G), 16777619);
    }, _ = async (T, G, P) => {
      if (M.has(T)) return;
      M.add(T);
      const x = T.layers.layer0?.modelName || G, V = G, N = ie(x) || ie(V), E = (k, L) => {
        d.has(k) || (d.add(k), r.push({ id: k, name: L }));
      };
      N || E(V, x);
      const g = !N && (!s || s.has(V)), w = [];
      (g || N) && T.layouts.model?.walk((k) => (k.type === le.model3d ? w.push(k) : k.type === le.insert && m.push(`${x}: вставка блока не включена в расчёт.`), !1));
      const z = /* @__PURE__ */ new Map();
      for (const k of w) {
        let L = k.layer, R = "";
        for (; L; ) {
          if (L.modelName && !ie(L.modelName)) {
            R = L.modelName;
            break;
          }
          L = L.layer;
        }
        const Z = N ? R || "Модель проекта" : x, Y = N ? R || `${G}/#model` : V;
        if (N && E(Y, Z), s && !s.has(Y)) continue;
        const lt = JSON.stringify([
          k.layer?.UUID || "",
          k.$id || k.$path
        ]);
        z.set(JSON.stringify([Y, lt]), {
          key: lt,
          objects: [k],
          modelId: Y,
          modelName: Z
        });
      }
      let S = 0;
      for (const k of z.values()) {
        const { key: L, objects: R, modelId: Z, modelName: Y } = k;
        if (n()) throw Error("Чтение моделей отменено.");
        if (a !== this.app || o !== this.view)
          throw Error(
            "Активный проект изменился. Запустите чтение моделей заново."
          );
        const lt = R[0].layer, q = {};
        try {
          if (lt) {
            const rt = [];
            let it = lt;
            for (; it && rt.length < 64; )
              rt.unshift(it), it = it.layer;
            for (const ot of rt)
              Vt(ot.typedProperties(), "", q), ot.typed?.name && (q.Тип = ot.typed.name);
          }
        } catch {
          m.push(`${Y} / ${L}: часть свойств недоступна.`);
        }
        const Q = q["ifc.id"] || Object.entries(q).find(
          ([rt]) => /(^|\.)(globalid|ifcguid|guid)$/i.test(rt)
        )?.[1] || "", X = lt?.name || R[0].$id || "Элемент", tt = JSON.stringify([Z, L]);
        Object.assign(q, {
          Модель: Y,
          Имя: X,
          GUID: Q,
          Объект: lt?.UUID || L
        });
        const gt = {
          min: [1 / 0, 1 / 0, 1 / 0],
          max: [-1 / 0, -1 / 0, -1 / 0]
        };
        let at = !0, jt = !1, yt = 0;
        for (const rt of R) {
          at &&= rt.isClosed;
          for (const it of Object.values(rt.meshes)) {
            const ot = it.geometry;
            if (!ot || ot.indices.length % 3) {
              jt = !0;
              continue;
            }
            at &&= it.isClosed;
            for (let ct = 0; ct < ot.vertices.length; ct += 3) {
              const nt = [
                ot.vertices[ct],
                ot.vertices[ct + 1],
                ot.vertices[ct + 2]
              ];
              if (Math3d.mat4.mulv3(nt, rt.matrix, nt), !nt.every(Number.isFinite)) {
                jt = !0;
                continue;
              }
              for (let H = 0; H < 3; H++)
                gt.min[H] = Math.min(gt.min[H], nt[H]), gt.max[H] = Math.max(gt.max[H], nt[H]);
              if (D(nt.join(",")), ct % 6e4 === 0 && (performance.now() - F > 200 && (F = performance.now(), e(
                "Индексирование: " + Y + " · " + h.length + " элементов"
              )), await C(), n()))
                throw Error("Чтение моделей отменено.");
            }
            const mt = ot.vertices.length / 3, wt = (ct) => Number.isFinite(ot.vertices[ct * 3]) && Number.isFinite(ot.vertices[ct * 3 + 1]) && Number.isFinite(ot.vertices[ct * 3 + 2]);
            for (let ct = 0; ct < ot.indices.length; ct += 3) {
              const nt = ot.indices[ct], H = ot.indices[ct + 1], kt = ot.indices[ct + 2];
              if (A = Math.imul(A ^ nt, 16777619), A = Math.imul(A ^ H, 16777619), A = Math.imul(A ^ kt, 16777619), nt < mt && H < mt && kt < mt && nt !== H && H !== kt && kt !== nt && wt(nt) && wt(H) && wt(kt) ? yt++ : jt = !0, ct % 15e4 === 0 && (await C(), n()))
                throw Error("Чтение моделей отменено.");
            }
          }
        }
        if (jt || !yt) {
          if (yt || S++, !yt) continue;
          at = !1;
        }
        const qt = {
          id: tt,
          name: X,
          model: Y,
          modelId: Z,
          guid: Q,
          properties: q,
          hidden: P || !!lt?.resolveHidden() || !!lt?.resolveDisabled(),
          triangles: new Float64Array(0),
          triangleCount: yt,
          closed: at,
          bounds: gt
        };
        D(JSON.stringify([tt, q, qt.hidden])), h.push(qt), y.set(tt, R);
      }
      S && m.push(
        `${x}: пропущено элементов без треугольной геометрии — ${S}.`
      );
      const b = [];
      T.attachments.forEach((k) => {
        b.push(k);
      });
      for (const k of b) {
        const L = k.name || k.uri || k.$id, R = L || "Подключённая модель", Z = `${G}/${L || "attachment"}`;
        k.model || E(Z, R), k.model ? await _(
          k.model,
          Z,
          P || k.hidden
        ) : (!s || s.has(Z)) && p.push(
          `${R}: модель не загружена. Откройте её перед расчётом.`
        );
      }
    };
    if (await _(i, i.layers.layer0?.modelName || "Проект", !1), !h.length && (!s || s.size > 0)) {
      const T = s ? [...s].filter((G) => !d.has(G)) : [];
      throw Error(
        T.length ? `Сохранённая выборка ссылается на модели, которых нет в текущем составе: ${T.join(", ")}. Обновите список моделей.` : r.length ? "В выбранных моделях не найдены 3D-элементы с доступной геометрией. Проверьте, что модели загружены, и выберите нужные файлы." : "В открытом проекте не обнаружены IFC/SMDX-модели. Проверьте состав подключений проекта."
      );
    }
    return this.clear(), this.refs = y, this.metadata = new Map(h.map((T) => [T.id, T])), this.scannedApp = a, this.scannedView = o, {
      elements: h,
      fingerprint: `${h.length}:${A >>> 0}`,
      warnings: [...new Set(m)],
      blockers: [...new Set(p)],
      models: r,
      indexedModelIds: r.filter((T) => !s || s.has(T.id)).map((T) => T.id)
    };
  }
  async geometry(e, n) {
    const s = ve(() => n() || !this.isCurrent());
    if (!this.isCurrent()) throw Error("Активная модель изменилась.");
    const a = this.metadata.get(e), o = this.refs.get(e);
    if (!a || !o) throw Error("Элемент отсутствует.");
    const i = o.flatMap(
      (M) => Object.values(M.meshes).flatMap((A) => {
        const C = A.geometry;
        if (!C || C.indices.length % 3) return [];
        const F = rn(C);
        return F.length ? [{ object: M, g: C, indices: F }] : [];
      })
    );
    let r = 0, d = 0;
    for (const { g: M, indices: A } of i) {
      if (!M) throw Error("Геометрия недоступна.");
      r += M.vertices.length, d += A.length;
    }
    const m = new Float64Array(r), p = new Uint32Array(d);
    let h = 0, y = 0;
    for (const { object: M, g: A, indices: C } of i) {
      if (!A) throw Error("Геометрия недоступна.");
      for (let F = 0; F < A.vertices.length; F += 3) {
        const D = [A.vertices[F], A.vertices[F + 1], A.vertices[F + 2]];
        if (Math3d.mat4.mulv3(D, M.matrix, D), m.set(D, h + F), F % 6e4 === 0 && (await s(), n() || !this.isCurrent()))
          throw Error("Чтение геометрии отменено.");
      }
      for (let F = 0; F < C.length; F++)
        if (p[y + F] = h / 3 + C[F], F % 15e4 === 0 && (await s(), n()))
          throw Error("Чтение геометрии отменено.");
      h += A.vertices.length, y += C.length;
    }
    return { ...a, vertices: m, indices: p };
  }
  selected() {
    if (!this.isCurrent())
      throw Error("Сначала обновите модели текущего проекта.");
    const e = new Set(this.view?.layer.selectedObjects());
    return [...this.refs].filter(([, n]) => n.some((s) => e.has(s))).map(([n]) => n);
  }
  select(e) {
    if (!this.isCurrent())
      throw Error("Сначала обновите модели текущего проекта.");
    const n = new Set(e.flatMap((s) => this.refs.get(s) || []));
    this.view.layer.clearSelected(), this.view.layer.selectObjects((s) => n.has(s), !0), this.view.invalidate();
  }
  clear() {
    if (this.overlay && (this.overlay.view.layer.removeLayer(this.overlay.layer), this.overlay.view.invalidate(), this.overlay = void 0, this.overlaySurfaces = []), this.pointView) {
      const e = this.pointView.annotations.get(ne);
      e && this.pointView.annotations.release(e), this.pointView.invalidate(), this.pointView = void 0;
    }
  }
  focus(e, n, s = !0) {
    if (!this.isCurrent())
      throw Error("Обновите модели текущего проекта перед переходом.");
    if (!Number.isFinite(n) || n < 0.5)
      throw Error("Дистанция камеры должна быть не менее 0,5 м.");
    if (!this.refs.has(e.a.id) || !this.refs.has(e.b.id))
      throw Error("Один из элементов отсутствует в загруженных моделях.");
    const a = e.point, o = this.view;
    o.camera?.id !== "3d" && o.setCameraType("3d"), o.pauseAnimation?.(), this.highlight(e), this.select([e.a.id, e.b.id]);
    const i = [-0.65, 0.65, -0.394], r = Math.hypot(...i);
    i.forEach((d, m) => i[m] = d / r), o.lookAt(
      a.map((d, m) => d - i[m] * n),
      i,
      [0, 0, 1],
      s,
      a
    );
  }
  highlight(e) {
    this.overlayError = void 0;
    const n = this.view;
    this.overlay && this.overlay.view !== n && (this.overlay.view.layer.removeLayer(this.overlay.layer), this.overlay = void 0, this.overlaySurfaces = []);
    const s = [
      { id: e.a.id, color: 4281743103 },
      { id: e.b.id, color: 915144703 }
    ];
    if (this.overlaySurfaces = s.flatMap(
      ({ id: i, color: r }, d) => [...new Set(this.refs.get(i) || [])].flatMap(
        (m) => Object.values(m.meshes).flatMap((p) => {
          const h = p.geometry;
          if (!h) return [];
          const y = {
            // SDK fields may be prototype getters rather than own properties.
            uuid: `${we}.${d}.${h.uuid}`,
            vertices: h.vertices,
            indices: h.indices,
            normals: h.normals,
            bounds: h.bounds,
            colors: new Uint32Array(h.vertices.length / 3).fill(r)
          };
          return [{ obj: m, geometry: y, color: r }];
        })
      )
    ), this.overlay) {
      this.overlay.layer.visible = !0, n.invalidate(!0);
      return;
    }
    let a;
    a = {
      id: we,
      order: 1e4,
      visible: !0,
      paint: () => {
      },
      paint3d: (i) => {
        const r = i.color, d = i.rasterizer.material;
        i.rasterizer.material = void 0;
        try {
          for (const { obj: m, geometry: p, color: h } of this.overlaySurfaces) {
            i.color = h, i.pushMatrix();
            try {
              i.multMatrix(m.matrix), i.mesh(p);
            } finally {
              i.popMatrix();
            }
          }
        } catch (m) {
          a.visible = !1, this.overlayError = new Error(
            "Не удалось отрисовать подсветку пары: " + (m instanceof Error ? m.message : String(m))
          );
        } finally {
          i.color = r, i.rasterizer.material = d;
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
    }, n.layer.addLayer(a), this.overlay = { view: n, layer: a }, n.invalidate();
  }
  async snapshot(e, n, s, a = !1, o = !0) {
    const i = () => this.snapshotInWorkspace(e, n, s, a);
    return o ? this.captureWorkspace(i) : i();
  }
  async snapshotInWorkspace(e, n, s, a = !1) {
    if (!this.isCurrent())
      throw Error("Обновите модели перед созданием снимков.");
    if (!this.canLocate(e))
      throw Error("Элементы результата отсутствуют в открытых моделях.");
    const o = this.view, i = o.layer.drawing;
    if (!i)
      throw Error(
        "Слой моделей недоступен для снимка пары. Откройте 3D-окно проекта."
      );
    const r = i.visible, d = o.annotations.visible, m = new Set(o.layer.selectedObjects());
    let p;
    try {
      a ? this.highlight(e) : this.focus(e, n, !1), o.pauseAnimation(), p = await an(o), o.layer.clearSelected(), i.visible = !1, o.annotations.visible = !1, o.invalidate();
      const h = await sn(
        o,
        () => s() || !this.isCurrent()
      );
      if (this.overlayError) throw this.overlayError;
      return h;
    } finally {
      i.visible = r, o.annotations.visible = d, o.layer.clearSelected(), o.layer.selectObjects((h) => m.has(h), !0), o.invalidate(), await p?.();
    }
  }
  markers(e, n, s, a) {
    if (!this.isCurrent()) return;
    const o = this.view;
    this.pointView && this.pointView !== o && this.clear();
    const i = o.annotations.get(ne);
    if (i && o.annotations.release(i), this.pointView = o, !s) {
      o.invalidate();
      return;
    }
    const r = o.annotations.create(ne, 1e4), d = e.filter((m) => m.id !== n).concat(e.filter((m) => m.id === n));
    for (const m of d.slice(-3e3)) {
      if (m.state === "resolved") continue;
      const [p, h, y] = m.point, M = m.id === n, A = m.state === "excluded" ? "#78818c" : m.state === "approved" || m.state === "reviewed" ? "#28b94b" : "#e1372d", C = M ? "#f2c94c" : A, F = () => a(m.id), D = [
        { type: "line", a: [p, h, y], b: [p, h, y + 1], color: C, width: 5 },
        {
          type: "polyline",
          points: [
            [p - 0.65, h, y + 1],
            [p + 0.65, h, y + 1],
            [p, h, y + 2.2],
            [p - 0.65, h, y + 1]
          ],
          color: C,
          fillColor: A,
          width: M ? 5 : 2
        },
        {
          type: "line",
          a: [p, h - 0.01, y + 1.85],
          b: [p, h - 0.01, y + 1.4],
          color: "#ffffff",
          width: 4
        },
        {
          type: "line",
          a: [p, h - 0.01, y + 1.22],
          b: [p, h - 0.01, y + 1.27],
          color: "#ffffff",
          width: 4
        }
      ];
      r.add({
        id: m.id,
        type: "shaped",
        shapes: D,
        activeShapes: D,
        activateCommand: F,
        dblCommand: F
      }), M && r.add({
        id: m.id + ":label",
        type: "simple",
        position: [p, h, y + 2.35],
        label: `${m.a.name} × ${m.b.name}`,
        labelBackground: "#f2c94c",
        labelColor: "#171717",
        activateCommand: F
      });
    }
    o.invalidate();
  }
}
let Me, oe, ke;
const cn = {
  open(t) {
    t.manager.revealView("nashepo.collisionfinder360/checks_panel");
  },
  mount(t) {
    const e = t.el;
    if (!e) return;
    if (oe && ke === t.manager) {
      e.replaceChildren(oe);
      return;
    }
    Me?.();
    const n = document.createElement("div");
    n.style.height = "100%", e.replaceChildren(n), oe = n, ke = t.manager, Me = on(n, new ln(t));
  }
};
export {
  cn as default
};
