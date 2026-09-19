const De = `<h2>Работа с проверками</h2>
<details open><summary>1. Первая проверка</summary><ol><li>Откройте проект и подключите IFC/SMDX штатными средствами Топоматик 360.</li><li>Откройте нижнюю вкладку «Проверки» и нажмите «Модели».</li><li>Нажмите «＋ Новая проверка» и задайте ей понятное имя.</li><li>Во вкладке «Выбор» оставьте галочки только у нужных файлов в А и Б. «Все модели» включено по умолчанию.</li><li>Выберите «По пересечению» или «Дублирование» и нажмите «Запустить».</li><li>Во вкладке «Результаты» дважды нажмите строку: камера направится к конфликту, элемент А будет выделен красным, элемент Б — синим, и оба элемента станут выделенными в 3D-окне.</li></ol><p>Первое обновление без созданной проверки получает только список файлов. При запуске индексируются модели, отмеченные хотя бы в одной стороне. Файл проекта WDX служит контейнером и в выбор моделей не попадает.</p></details>
<details><summary>2. Выбор моделей и сохранённые наборы</summary><p>Выбор А и выбор Б задают две стороны сравнения. Снимите «Все модели» и отметьте конкретные IFC/SMDX. Для поиска дубликатов внутри одного файла отметьте его с обеих сторон.</p><p>Часто используемый состав можно сохранить как набор моделей, а затем применить в другой проверке. Наборы входят в файл проверок. Состав выборки задаётся галочками моделей и ручным выделением объектов.</p><p>IFC GUID читается из свойства <code>ifc.id</code>; также поддерживаются GlobalId, IfcGuid и GUID.</p></details>
<details><summary>3. Работа с выделением в 3D</summary><p>Сначала выделите элементы штатными средствами в 3D-окне, затем используйте кнопку в нужной стороне:</p><ul><li><b>Показать выбранные элементы</b> — выделяет весь текущий состав.</li><li><b>Только выделенные в 3D</b> — оставляет только выделенные объекты.</li><li><b>＋ Добавить из 3D</b> — добавляет выделенные объекты к моделям.</li><li><b>− Исключить из 3D</b> — исключает выделенные объекты.</li><li><b>Сбросить ручной выбор</b> — снова использует отмеченные модели.</li></ul><p>Ручные идентификаторы могут измениться после замены IFC/SMDX, поэтому такую выборку следует проверить заново.</p></details>
<details><summary>4. Пересечения, глубина, касания и дубликаты</summary><p><b>Пересечение</b> определяется по треугольным поверхностям элементов и вложенности тел. Раздельные сетки сначала проверяются вместе: совпадающие рёбра и разное разбиение швов больше не делают замкнутый элемент «неизмеримым». Признак замкнутости из исходной модели проверяется по граням: сам по себе он не подтверждает внутренний объём. Габаритные коробки отбирают близкие пары; общий габарит также ограничивает область замера глубины. Одна пара элементов формирует один результат.</p><p><b>Толщина перекрытия</b> — локальная оценка пересечения. Для контакта выбираются направления измерения, в том числе по его форме и нормалям граней. По ним измеряется общая часть проекций геометрии в области контакта и выбирается наименьшая пригодная ширина. Если обнаружены отдельные участки перекрытия, для пары сохраняется наибольшая из их глубин.</p><p><b>Заход вдоль оси</b> дополнительно измеряется для распознанной прямой трубы или вытянутого профиля, пересекающего более крупную конструкцию. Ось определяется по геометрии, её пересечения — по граням конструкции. Для круглого кабеля или трубы с поворотами плагин дополнительно распознаёт последовательные поперечные сечения и измеряет путь по их центрам. Соседние участки внутри одной оболочки объединяются в непрерывный заход; выход наружу и вход обратно дают отдельные участки, из которых берётся самый длинный. Такой замер помечается знаком ≈. При частичном заходе измеряется участок от внешней границы до конца профиля; при сквозном — от входа до выхода. Внутренняя пустота колодца входит в этот замер. Раздельные оболочки конструкции измеряются отдельно: расстояние между несвязанными частями не прибавляется. Сам по себе проход оси через габарит не создаёт коллизию: сначала должно быть обнаружено пересечение элементов.</p><p><b>Глубина для отбора</b> — большее из толщины перекрытия и продольного захода. Поэтому труба диаметром 50 мм, заходящая в конструкцию на 1000 мм, проходит порог 80 мм, а стык с заходом 5 мм — нет. Оба замера видны в карточке коллизии и HTML-отчёте, когда продольный заход удалось определить. Для отдельных отводов, фитингов и сопоставимых труб сохраняется локальный расчёт. Это не расстояние перемещения, устраняющего коллизию. Объём пересечения имеет кубические единицы и не заменяет глубину в миллиметрах.</p><p>Если оболочка содержит разрывы, плагин дополнительно определяет внутреннюю область по совокупности окружающих граней — методом обобщённого числа обхода. Когда такая область подтверждается, рассчитывается численная глубина со знаком ≈. Исходная модель при этом не изменяется. Это позволяет проверять трубы, отводы и другие объёмные элементы с дефектами сетки. Одиночная плоская грань не превращается в объёмное тело.</p><p><b>Ограничения метода.</b> Плагин не строит точное тело пересечения. Разделение контактов, выбор направлений и проверка заполнения являются оценкой. Для сложных невыпуклых и составных объектов, криволинейных поверхностей результат может зависеть от сетки и расположения геометрии. Продольный замер применяется к распознанным прямым профилям с длиной не менее четырёх поперечных размеров, когда конструкция шире профиля минимум в 2,5 раза по двум поперечным направлениям. Для изогнутого круглого кабеля или трубы замер по траектории доступен, если сетка содержит распознаваемые поперечные сечения и связи между ними. Если ось восстановить не удалось, остаётся локальный замер. У сложной связной невыпуклой оболочки продольный замер может включать промежутки между её поверхностями. Заданная точность не гарантирует такую же погрешность итоговой глубины. Результаты около принятого допуска следует проверять в 3D.</p><p><b>Столбец глубины:</b></p><ul><li><b>Число</b> — полученная оценка в миллиметрах. Малые положительные значения показываются с дополнительными знаками, чтобы не превратиться в ноль при округлении.</li><li><b>Касание</b> — найден контакт без разрешённого объёмного перекрытия. Такие пары включаются настройкой «Учитывать касания» и могут отсекаться порогом глубины как нулевые.</li><li><b>Не определена</b> — у геометрии не удалось определить внутреннюю область, например у одиночного листа или отдельных граней. Пересечение сохраняется; размер грани не выдаётся за глубину.</li><li><b>Требует уточнения</b> — пересечение найдено, однако его глубина не разрешена текущим расчётом. Причиной может быть неоднозначная геометрия контакта. Само по себе малое вхождение относительно настройки точности больше не является причиной отказа от замера.</li><li><b>≈</b> — приблизительная оценка: внутренняя область восстановлена для оболочки с разрывами, состыкованы немного расходящиеся швы либо при измерении сокращалась выборка или разделение контактов достигло предела. Для числа не гарантируются ни величина, ни направление ошибки.</li></ul><p>«Не определена» и «Требует уточнения» остаются в результатах независимо от минимальной глубины. Числовые оценки, в том числе со знаком ≈, сравниваются с порогом. Знак ≈ сообщает о приближённом расчёте и не отменяет фильтр. Найденное малое пересечение не должно исчезать только из-за отключённого учёта касаний: для определения пересечения и замера используется отдельный численный запас. Настройка точности не округляет малые вхождения до нуля.</p><p><b>Точность расчёта</b> задаётся в миллиметрах и влияет на отбор близких пар, разделение контактов и запас при фильтрации. При восстановлении швов допустимое расхождение ограничено этой величиной и дополнительно 0,01 мм. Приближённое восстановление внутренней области по граням — отдельный метод, его погрешность этой настройкой не гарантируется. <b>Минимальная глубина</b> — порог отбора результатов. Все числовые оценки сравниваются с порогом с запасом на точность: при минимуме 20 мм и точности 0,1 мм результат 19,95 мм остаётся. Этот порядок одинаков в расчёте, таблице и HTML-отчёте. После изменения точности или порога повторно запустите проверку.</p><p>Труба и отвод могут пересекаться в штатном соединении из-за формы исходной сетки. Такие соединения рассматриваются отдельно и при необходимости исключаются правилами.</p><p><b>Дублирование</b> ищет совпадающую треугольную геометрию в мировых координатах с заданной точностью. Геометрически одинаковые тела с разным разбиением поверхности на треугольники могут не считаться дубликатами.</p></details>
<details><summary>5. Составные объекты и неполная геометрия</summary><p>Один IFC-объект может состоять из нескольких частей. В новых проверках правило «Не проверять геометрию одного составного объекта» включено по умолчанию. Его можно изменить во вкладке «Правила». Сохранённые проверки сохраняют выбранное ранее значение. Там же можно исключить пары одной модели или одинакового значения свойства.</p><p>Пустые и неполные геометрические части пропускаются, а пригодные части модели продолжают участвовать. Плагин показывает сводное замечание с количеством пропущенных элементов. Незагруженный подключённый файл блокирует расчёт только тогда, когда он входит в выборку.</p></details>
<details><summary>6. Результаты и состояния</summary><p>«Новый» найден впервые, «Активный» найден повторно, «Проверенный» рассмотрен, «Подтверждённый» подтверждён, «Исключённый» исключён из работы. «Исправленный» означает, что пара исчезла при повторном расчёте с теми же правилами; состояние можно изменить вручную.</p><p>В таблице доступны IFC GUID, расчётная глубина, назначение и комментарий. Фильтр «Глубина от» сравнивает порог с большим из доступных замеров: толщиной перекрытия и продольным заходом. Числа со знаком ≈ тоже участвуют в отборе; строки «не определена» и «требует уточнения» сохраняются для просмотра. Галочки меняют состояние сразу у нескольких строк. Значения можно выделять и копировать. При переходе стрелками активная строка автоматически прокручивается в видимую область. Состояние «Устарела» у проверки означает, что после последнего расчёта изменили её тип, выборки, параметры или правила.</p></details>
<details><summary>7. Отчёт и снимки</summary><p>После перехода к коллизии отсутствующий снимок создаётся автоматически, если пользователь задержался на результате. Кадр строится от той же камеры приближения, что и снимки отчёта: ракурс задаёт «Дистанция камеры» в настройках. Если дистанцию изменить, отчёт переснимет прежние кадры под новое значение. Быстрое переключение стрелками отменяет лишние снимки. Во время технической перерисовки поверх 3D-окна сохраняется предыдущий кадр, поэтому модель не должна мигать.</p><p>Кнопка «Снимок пары» сохраняет текущий ракурс только с двумя элементами коллизии: элемент А показан красным, элемент Б — синим. Такой кадр собран вручную, поэтому отчёт его не переснимает. На время подготовки отчёта нижняя панель автоматически уменьшается для широкого 3D-кадра и затем возвращается к прежнему размеру. Файл сессии предназначен для открытия результатов в плагине «НашеПО · Коллизии».</p></details>
<details><summary>8. Проекты, сохранение и очистка</summary><p>В пределах открытой страницы каждый проект получает собственный список проверок. Сворачивание или повторное открытие нижней панели сохраняет проверки, результаты и комментарии в текущей вкладке. При переключении проекта данные предыдущего не подмешиваются. «Очистить проект» удаляет проверки, результаты и наборы только у текущего проекта.</p><p>«Сохранить проверки» записывает правила, наборы моделей, результаты, комментарии и снимки в JSON. «Открыть проверки» загружает этот файл. Геометрия в файл не входит: соответствующие модели надо открыть отдельно. После обновления или закрытия страницы для продолжения работы используйте сохранённый файл.</p></details>
<details><summary>9. Большие проекты</summary><p>Жёсткого предела в 6 млн треугольников нет. При запуске строится индекс только по отмеченным моделям. Точная геометрия передаётся в расчёт по мере появления близких пар в компактном индексированном виде.</p><p>Время и память всё равно зависят от состава выборок и числа потенциальных пар. Разделяйте проверки по моделям и системам. В сцене одновременно показывается до 3000 знаков; при 50 000 результатах расчёт останавливается без замены прежнего результата.</p></details>`;
function Le(t) {
  let e = t.parentElement, n;
  for (; e && !n; )
    n = [...e.children].find(
      (d) => d.classList.contains("resizer-horizontal")
    ), e = e.parentElement;
  if (!n) return () => {
  };
  const a = n, s = t.ownerDocument.defaultView;
  let i;
  const o = () => {
    if (i === void 0) return;
    const d = i;
    i = void 0, a.dispatchEvent(
      new MouseEvent("mouseup", { bubbles: !0, composed: !0 })
    ), a.hasPointerCapture(d) && a.releasePointerCapture(d);
  }, r = (d) => {
    d.button === 0 && (i = d.pointerId, a.setPointerCapture(d.pointerId));
  };
  return a.addEventListener("pointerdown", r), a.addEventListener("pointerup", o), a.addEventListener("pointercancel", o), a.addEventListener("lostpointercapture", o), s.addEventListener("blur", o), () => {
    o(), a.removeEventListener("pointerdown", r), a.removeEventListener("pointerup", o), a.removeEventListener("pointercancel", o), a.removeEventListener("lostpointercapture", o), s.removeEventListener("blur", o);
  };
}
const Ue = "0.9.3", Jt = (t) => typeof t == "string" && /^data:image\/(jpeg|png);base64,[A-Za-z0-9+/=]+$/.test(t), Ct = {
  new: "Новый",
  active: "Активный",
  reviewed: "Проверенный",
  approved: "Подтверждённый",
  resolved: "Исправленный",
  excluded: "Исключённый"
}, je = (t, e, n) => t.kind === "duplicate" || t.depth === "unmeasurable" || t.depth === "tolerance" || (t.penetrationMm ?? 0) + n >= e, me = () => ({
  models: [],
  modelsMode: "all",
  conditions: [],
  mode: "all",
  include: [],
  exclude: []
}), Fe = () => ({
  id: crypto.randomUUID(),
  name: "Новая проверка",
  type: "intersection",
  a: me(),
  b: me(),
  precision: 0.1,
  minPenetration: 0,
  touching: !1,
  ignoreSameModel: !1,
  ignoreSameGroup: !0,
  equalProperty: "",
  includeHidden: !1,
  results: [],
  status: "new",
  warnings: []
}), he = ({
  triangles: t,
  vertices: e,
  indices: n,
  triangleCount: a,
  closed: s,
  bounds: i,
  ...o
}) => o;
function Bt(t, e) {
  return e.exclude.includes(t.id) ? !1 : e.include.includes(t.id) ? !0 : !(e.manualOnly || e.modelsMode === "selected" && !e.models.includes(t.modelId) || e.modelsMode === void 0 && e.models.length && !e.models.includes(t.modelId));
}
function Ee(t, e, n) {
  if (!e.manualOnly && e.modelsMode === "selected" && !e.models.length && !e.include.length)
    return "Не отмечены модели. Выберите файлы или включите «Все модели».";
  let a = 0;
  for (const s of t)
    if (Bt(s, e) && (a++, n || !s.hidden))
      return;
  return a ? `Все выбранные элементы (${a}) скрыты. Покажите их в модели или включите «Включать скрытые элементы» на вкладке «Правила».` : e.manualOnly ? "Ручная выборка пуста. Выделите элементы в 3D заново или нажмите «Сбросить ручной выбор»." : e.exclude.length ? "Нет элементов после ручных исключений. Проверьте исключения или нажмите «Сбросить ручной выбор»." : "В выбранных моделях нет доступных элементов. Обновите модели и проверьте состав выборки.";
}
const Re = (t) => JSON.stringify([
  t.type,
  ...[t.a, t.b].map(
    ({
      models: e,
      modelsMode: n,
      conditions: a,
      mode: s,
      include: i,
      exclude: o,
      manualOnly: r
    }) => ({
      models: e,
      modelsMode: n,
      conditions: a,
      mode: s,
      include: i,
      exclude: o,
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
]), Te = (t, e) => JSON.stringify([t, e].sort());
function Be(t, e, n) {
  const a = new Map(t.map((i) => [i.id, i])), s = e.map((i) => {
    const o = a.get(i.id);
    return a.delete(i.id), {
      ...i,
      note: o?.note ?? "",
      assignee: o?.assignee ?? "",
      firstSeen: o?.firstSeen ?? n,
      lastSeen: n,
      state: !o || o.state === "resolved" ? "new" : o.state === "new" ? "active" : o.state
    };
  });
  for (const i of a.values())
    s.push({
      ...i,
      state: i.state === "excluded" ? "excluded" : "resolved"
    });
  return s;
}
function Ae(t) {
  const e = JSON.parse(t);
  if (e?.format !== "nashepo.checks" || e.version !== 1 || !Array.isArray(e.checks))
    throw Error("Это не файл проекта проверок НашеПО.");
  const n = /* @__PURE__ */ new Set();
  if (e.sets ??= [], !Array.isArray(e.sets) || !e.sets.every(
    (s) => s && typeof s.id == "string" && typeof s.name == "string" && s.selection && Array.isArray(s.selection.models) && s.selection.models.every((i) => typeof i == "string") && (s.selection.modelsMode === void 0 || ["all", "selected"].includes(s.selection.modelsMode)) && Array.isArray(s.selection.conditions) && s.selection.conditions.every(
      (i) => i && typeof i.field == "string" && typeof i.value == "string" && ["eq", "ne", "contains", "exists", "gt", "lt"].includes(
        i.op
      )
    ) && ["all", "any"].includes(s.selection.mode)
  ))
    throw Error("Некорректные наборы моделей.");
  const a = (s) => /\.wdx(?:[?#].*)?$/i.test(s);
  for (const s of e.sets)
    s.selection.models = s.selection.models.filter(
      (i) => !a(i)
    ), s.selection.conditions = [], s.selection.mode = "all", s.selection.modelsMode ??= s.selection.models.length ? "selected" : "all";
  for (const s of e.checks) {
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
    s.warnings ??= [], s.modelsAtRun = s.modelsAtRun?.filter((i) => !a(i));
    for (const i of [s.a, s.b]) {
      if (!i || i.manualOnly !== void 0 && typeof i.manualOnly != "boolean" || i.modelsMode !== void 0 && !["all", "selected"].includes(i.modelsMode) || i.presetId !== void 0 && typeof i.presetId != "string" || !["all", "any"].includes(i.mode) || ![i.models, i.include, i.exclude].every(
        (o) => Array.isArray(o) && o.every((r) => typeof r == "string")
      ) || !Array.isArray(i.conditions) || !i.conditions.every(
        (o) => o && typeof o.field == "string" && typeof o.value == "string" && ["eq", "ne", "contains", "exists", "gt", "lt"].includes(o.op)
      ))
        throw Error("Некорректная выборка.");
      i.modelsMode ??= i.models.length ? "selected" : "all", i.models = i.models.filter((o) => !a(o)), i.conditions = [], i.mode = "all";
    }
    for (const i of s.results) {
      if (i?.image !== void 0 && !Jt(i.image))
        throw Error("Некорректный снимок результата.");
      if (i?.imageScope !== void 0 && i.imageScope !== "pair" && i.imageScope !== "pair-ab")
        throw Error("Некорректный состав снимка результата.");
      if (i?.imageDistance !== void 0 && (!Number.isFinite(i.imageDistance) || i.imageDistance < 0.5))
        throw Error("Некорректная дистанция снимка результата.");
      if (i?.unmeasured !== void 0 && typeof i.unmeasured != "boolean")
        throw Error("Некорректный признак измеримости результата.");
      if (i?.depth !== void 0 && !["tolerance", "approximate", "unmeasurable"].includes(i.depth))
        throw Error("Некорректная достоверность глубины результата.");
      i?.unmeasured && !i.depth && (i.depth = "unmeasurable");
      for (const o of [i?.overlapThicknessMm, i?.axialPenetrationMm])
        if (o !== void 0 && (!Number.isFinite(o) || o < 0))
          throw Error("Некорректный размер пересечения.");
      if (i?.axialElementId !== void 0 && (typeof i.axialElementId != "string" || ![i.a?.id, i.b?.id].includes(i.axialElementId)))
        throw Error("Некорректный элемент продольного замера.");
      if (!i || typeof i.id != "string" || !Object.hasOwn(Ct, i.state) || i.penetrationMm !== void 0 && (!Number.isFinite(i.penetrationMm) || i.penetrationMm < 0) || !Array.isArray(i.point) || i.point.length !== 3 || !i.point.every(Number.isFinite))
        throw Error("Некорректный результат.");
      for (const o of [i.a, i.b])
        if (!o || !["id", "name", "model", "modelId", "guid"].every(
          (r) => typeof o[r] == "string"
        ) || !o.properties || typeof o.properties != "object")
          throw Error("Некорректный элемент результата.");
    }
  }
  return e;
}
const B = (t, e) => [t[0] - e[0], t[1] - e[1], t[2] - e[2]], jt = (t, e, n = 1) => [
  t[0] + e[0] * n,
  t[1] + e[1] * n,
  t[2] + e[2] * n
], K = (t, e) => t[0] * e[0] + t[1] * e[1] + t[2] * e[2], wt = (t, e) => [
  t[1] * e[2] - t[2] * e[1],
  t[2] * e[0] - t[0] * e[2],
  t[0] * e[1] - t[1] * e[0]
], _ = (t) => Math.hypot(...t), Rt = (t) => {
  const e = _(t);
  return e > 1e-20 ? [t[0] / e, t[1] / e, t[2] / e] : void 0;
}, Et = (t) => t.triangleCount ?? (t.indices ? t.indices.length / 3 : t.triangles.length / 9), kt = (t, e, n) => t.indices && t.vertices ? t.vertices[t.indices[e * 3 + Math.floor(n / 3)] * 3 + n % 3] : t.triangles[e * 9 + n], bt = (t, e) => [0, 3, 6].map((n) => [
  kt(t, e, n),
  kt(t, e, n + 1),
  kt(t, e, n + 2)
]);
function Gt(t) {
  const e = [1 / 0, 1 / 0, 1 / 0], n = [-1 / 0, -1 / 0, -1 / 0];
  for (let a = 0; a < t.length; a++) {
    const s = a % 3;
    e[s] = Math.min(e[s], t[a]), n[s] = Math.max(n[s], t[a]);
  }
  return { min: e, max: n };
}
const Qt = (t, e, n) => t.min.every((a, s) => a <= e.max[s] + n && t.max[s] >= e.min[s] - n);
function se(t, e) {
  const n = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const r of e)
    for (let d = 0; d < 9; d++) {
      const f = d % 3, c = kt(t, r, d);
      n.min[f] = Math.min(n.min[f], c), n.max[f] = Math.max(n.max[f], c);
    }
  if (e.length <= 12) return { ...n, ids: e };
  const a = n.max.map((r, d) => r - n.min[d]), s = a.indexOf(Math.max(...a)), i = (r) => kt(t, r, s) + kt(t, r, s + 3) + kt(t, r, s + 6);
  e.sort((r, d) => i(r) - i(d));
  const o = e.length >> 1;
  return {
    ...n,
    left: se(t, e.slice(0, o)),
    right: se(t, e.slice(o))
  };
}
function* qt(t, e, n) {
  Qt(t, e, n) && (t.ids ? yield* t.ids : (yield* qt(t.left, e, n), yield* qt(t.right, e, n)));
}
function* zt(t, e, n) {
  if (Qt(t, e, n)) {
    if (t.ids && e.ids) {
      for (const a of t.ids) for (const s of e.ids) yield [a, s];
      return;
    }
    if (t.ids) {
      yield* zt(t, e.left, n), yield* zt(t, e.right, n);
      return;
    }
    if (e.ids) {
      yield* zt(t.left, e, n), yield* zt(t.right, e, n);
      return;
    }
    yield* zt(t.left, e.left, n), yield* zt(t.left, e.right, n), yield* zt(t.right, e.left, n), yield* zt(t.right, e.right, n);
  }
}
function Xt(t, e) {
  const n = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const o of e)
    for (let r = 0; r < 3; r++)
      n.min[r] = Math.min(n.min[r], t[o].bounds.min[r]), n.max[r] = Math.max(n.max[r], t[o].bounds.max[r]);
  if (e.length <= 16) return { ...n, ids: e };
  const a = n.max.map((o, r) => o - n.min[r]), s = a.indexOf(Math.max(...a));
  e.sort(
    (o, r) => t[o].bounds.min[s] + t[o].bounds.max[s] - (t[r].bounds.min[s] + t[r].bounds.max[s])
  );
  const i = e.length >> 1;
  return {
    ...n,
    left: Xt(t, e.slice(0, i)),
    right: Xt(t, e.slice(i))
  };
}
function Yt(t, e, n, a) {
  const s = B(e, t), i = B(n[1], n[0]), o = B(n[2], n[0]), r = wt(s, o), d = K(i, r);
  if (Math.abs(d) <= 1e-12 * _(s) * _(i) * _(o)) return;
  const f = 1 / d, c = B(t, n[0]), u = K(c, r) * f, x = wt(c, i), y = K(s, x) * f, I = K(o, x) * f, P = a / Math.max(_(i), _(o), a);
  if (u >= -P && y >= -P && u + y <= 1 + P && I >= -P && I <= 1 + P)
    return jt(t, s, Math.max(0, Math.min(1, I)));
}
function Ge(t, e, n, a) {
  const s = n.map(Math.abs).indexOf(Math.max(...n.map(Math.abs))), i = [0, 1, 2].filter((d) => d !== s), o = (d, f, c) => (f[i[0]] - d[i[0]]) * (c[i[1]] - d[i[1]]) - (f[i[1]] - d[i[1]]) * (c[i[0]] - d[i[0]]), r = (d, f) => {
    const c = f.map((u, x) => o(u, f[(x + 1) % 3], d));
    return c.every((u) => u >= -a * _(n)) || c.every((u) => u <= a * _(n));
  };
  for (const d of t) if (r(d, e)) return d;
  for (const d of e) if (r(d, t)) return d;
  for (let d = 0; d < 3; d++)
    for (let f = 0; f < 3; f++) {
      const c = t[d], u = t[(d + 1) % 3], x = e[f], y = e[(f + 1) % 3], I = B(u, c), P = B(y, x), F = I[i[0]] * P[i[1]] - I[i[1]] * P[i[0]];
      if (Math.abs(F) < 1e-18) continue;
      const R = B(x, c), D = (R[i[0]] * P[i[1]] - R[i[1]] * P[i[0]]) / F, C = (R[i[0]] * I[i[1]] - R[i[1]] * I[i[0]]) / F;
      if (D >= 0 && D <= 1 && C >= 0 && C <= 1) return jt(c, I, D);
    }
}
function Ye(t, e, n, a) {
  for (let s = 0; s < 3; s++) {
    const i = Yt(t[s], t[(s + 1) % 3], e, n);
    i && a.push(i);
    const o = Yt(e[s], e[(s + 1) % 3], t, n);
    o && a.push(o);
  }
}
function Ze(t, e, n, a) {
  const s = wt(B(t[1], t[0]), B(t[2], t[0])), i = wt(B(e[1], e[0]), B(e[2], e[0])), o = _(s), r = _(i);
  if (o < 1e-20 || r < 1e-20) return;
  const d = e.map((c) => K(B(c, t[0]), s) / o), f = t.map((c) => K(B(c, e[0]), i) / r);
  if (!(d.every((c) => c > n) || d.every((c) => c < -n) || f.every((c) => c > n) || f.every((c) => c < -n))) {
    if (d.every((c) => Math.abs(c) <= n) && f.every((c) => Math.abs(c) <= n))
      return a ? Ge(t, e, s, n) : void 0;
    if (!(!a && (!(Math.min(...d) < -n && Math.max(...d) > n) || !(Math.min(...f) < -n && Math.max(...f) > n))))
      for (let c = 0; c < 3; c++) {
        const u = Yt(t[c], t[(c + 1) % 3], e, n);
        if (u) return u;
        const x = Yt(e[c], e[(c + 1) % 3], t, n);
        if (x) return x;
      }
  }
}
class He {
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
    const n = Rt(wt(B(e[1], e[0]), B(e[2], e[0])));
    if (!n) return;
    const s = n[0] < -1e-9 || Math.abs(n[0]) <= 1e-9 && (n[1] < -1e-9 || Math.abs(n[1]) <= 1e-9 && n[2] < 0) ? [-n[0], -n[1], -n[2]] : [n[0], n[1], n[2]], i = this.key(s);
    for (this.items.has(i) || this.items.set(i, s); this.items.size > 512 && this.step > 10; ) {
      this.step /= 10;
      const o = /* @__PURE__ */ new Map();
      for (const r of this.items.values()) {
        const d = this.key(r);
        o.has(d) || o.set(d, r);
      }
      this.items = o;
    }
  }
  addFrom(e, n) {
    for (const a of n) this.add(bt(e, a));
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
  for (const s of t) {
    const i = [s[0] - e[0], s[1] - e[1], s[2] - e[2]];
    for (let o = 0; o < 3; o++)
      for (let r = 0; r < 3; r++) n[o][r] += i[o] * i[r];
  }
  const a = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ];
  for (let s = 0; s < 12; s++) {
    let i = 0;
    for (let o = 0; o < 3; o++)
      for (let r = o + 1; r < 3; r++) i += n[o][r] * n[o][r];
    if (i <= 1e-30) break;
    for (let o = 0; o < 3; o++)
      for (let r = o + 1; r < 3; r++) {
        if (Math.abs(n[o][r]) <= 1e-30) continue;
        const d = (n[r][r] - n[o][o]) / (2 * n[o][r]), f = (d >= 0 ? 1 : -1) / (Math.abs(d) + Math.sqrt(d * d + 1)), c = 1 / Math.sqrt(f * f + 1), u = f * c;
        for (const x of [n, a])
          for (let y = 0; y < 3; y++) {
            const I = x[y][o], P = x[y][r];
            x[y][o] = c * I - u * P, x[y][r] = u * I + c * P;
          }
        for (let x = 0; x < 3; x++) {
          const y = n[o][x], I = n[r][x];
          n[o][x] = c * y - u * I, n[r][x] = u * y + c * I;
        }
      }
  }
  return [0, 1, 2].sort((s, i) => n[i][i] - n[s][s]).map((s) => Rt([a[0][s], a[1][s], a[2][s]])).filter((s) => !!s);
}
function Qe(t, e, n, a) {
  const s = e.min.map((c, u) => (c + e.max[u]) / 2), i = _(B(e.max, e.min)), o = Math.max(n * 10, i / 50), r = (c) => [0, 1, 2].map(
    (u) => c.reduce((x, y) => x + y[u], 0) / c.length
  );
  let d = [{ hits: t, limits: [] }], f = !1;
  for (let c = 0; c < 12; c++) {
    const u = [];
    let x = !1;
    for (const y of d) {
      if (y.hits.length < 2) {
        u.push(y);
        continue;
      }
      if (u.length + d.length >= 64) {
        f = !0, u.push(y);
        continue;
      }
      const I = r(y.hits), P = [
        I,
        s,
        ...[0, 0.25, 0.5, 0.75].map(
          (b) => y.hits[Math.floor(b * (y.hits.length - 1))]
        )
      ], F = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ], R = Zt(y.hits, I);
      R[0] && F.push(R[0]);
      const D = (b) => {
        let w = -1 / 0, A = 1 / 0;
        for (const E of y.hits) {
          const T = K(E, b);
          T > w && (w = T), T < A && (A = T);
        }
        return w - A;
      }, C = (b) => Math.max(
        0,
        ...R.filter((w) => Math.abs(K(w, b)) < 0.9).map((w) => D(w))
      ), j = (b) => {
        const w = y.hits.map((E) => K(E, b)).sort((E, T) => E - T), A = [];
        for (let E = 1; E < w.length; E++) {
          const T = w[E] - w[E - 1];
          T > o && A.push({ at: (w[E] + w[E - 1]) / 2, size: T });
        }
        return A.sort((E, T) => T.size - E.size);
      };
      let N, m = 0;
      for (const b of F) {
        const w = j(b);
        !w.length || w[0].size <= m || w[0].size <= C(b) || (m = w[0].size, a(b, w[0].at, P) && (N = { n: b, cuts: [w[0].at] }));
      }
      if (!N) {
        u.push(y);
        continue;
      }
      x = !0;
      const { n: H, cuts: q } = N, S = Array.from({ length: q.length + 1 }, () => []);
      for (const b of y.hits) {
        const w = K(b, H);
        let A = 0;
        for (; A < q.length && w >= q[A]; ) A++;
        S[A].push(b);
      }
      S.forEach(
        (b, w) => u.push({
          hits: b,
          limits: [
            ...y.limits,
            {
              n: H,
              from: w ? q[w - 1] : -1 / 0,
              to: w < q.length ? q[w] : 1 / 0
            }
          ]
        })
      );
    }
    if (d = u, x && c === 11 && (f = !0), !x) break;
  }
  return { zones: d, crowded: f };
}
function ge(t, e, n) {
  return n.every(({ n: a, from: s, to: i }) => {
    let o = 1 / 0, r = -1 / 0;
    for (let d = 0; d < 9; d += 3) {
      const f = kt(t, e, d) * a[0] + kt(t, e, d + 1) * a[1] + kt(t, e, d + 2) * a[2];
      f < o && (o = f), f > r && (r = f);
    }
    return r >= s && o <= i;
  });
}
function be(t, e, n, a, s, i, o, r, d, f, c, u = !1) {
  let x = !1;
  const y = (q) => {
    let S = -1 / 0, b = 1 / 0;
    const w = (A) => {
      A > S && (S = A), A < b && (b = A);
    };
    for (const A of d) w(K(A, q));
    for (const [A, E, T] of [
      [t, n, 1],
      [e, a, 0]
    ]) {
      const U = Math.max(1, Math.floor(E.length / 32));
      U > 1 && (x = !0);
      for (let v = 0; v < E.length; v += U)
        for (const $ of bt(A, E[v])) c(T, $) && w(K($, q));
    }
    return Number.isFinite(S) && Number.isFinite(b) ? S - b : 0;
  }, I = (q) => {
    let S = 1 / 0, b = -1 / 0;
    for (let w = 0; w < 8; w++) {
      const A = (w & 1 ? o.max[0] : o.min[0]) * q[0] + (w & 2 ? o.max[1] : o.min[1]) * q[1] + (w & 4 ? o.max[2] : o.min[2]) * q[2];
      A < S && (S = A), A > b && (b = A);
    }
    return [S, b];
  }, P = (q, S, b, w, A) => {
    let E = 1 / 0, T = -1 / 0;
    for (const U of S) {
      let v = 1 / 0, $ = -1 / 0;
      for (let Z = 0; Z < 9; Z += 3) {
        const W = kt(q, U, Z) * b[0] + kt(q, U, Z + 1) * b[1] + kt(q, U, Z + 2) * b[2];
        W < v && (v = W), W > $ && ($ = W);
      }
      $ < w || v > A || (v < w && (v = w), $ > A && ($ = A), v < E && (E = v), $ > T && (T = $));
    }
    return E === 1 / 0 ? void 0 : [E, T];
  };
  if (o.min.some((q, S) => o.max[S] - q <= 0))
    return { width: 0, thin: !1, approximate: !1 };
  const F = Math.ceil((n.length + a.length) / 4096), R = [
    ...s,
    ...F > 1 ? i.filter((q, S) => S < 3 || S % F === 0) : i
  ];
  F > 1 && R.length < s.length + i.length && (x = !0);
  const D = (q, S, b, w, A) => {
    const E = (v) => jt(r, b, v - K(r, b));
    if (!S) return c(q, E((w + A) / 2)) ? [w, A] : void 0;
    let [T, U] = S;
    return T > w && c(q, E((w + T) / 2)) && (T = w), U < A && c(q, E((U + A) / 2)) && (U = A), [T, U];
  }, C = (q, S) => q && S ? Math.min(q[1], S[1]) - Math.max(q[0], S[0]) : 0;
  let j = 1 / 0, N = !1, m = !1, H = 0;
  for (let q = 0; q < R.length; q++) {
    const S = R[q], [b, w] = I(S), A = P(t, n, S, b, w), E = P(e, a, S, b, w);
    let T = C(A, E);
    if (T <= 0 && (H++ < 32 ? T = C(D(0, A, S, b, w), D(1, E, S, b, w)) : x = !0), u && d.length > 1) {
      let U = 1 / 0, v = -1 / 0;
      for (const $ of d) {
        const Z = K($, S);
        U = Math.min(U, Z), v = Math.max(v, Z);
      }
      T = Math.max(T, v - U);
    }
    if (T <= f && (q < s.length && H < 40 && (H++, T = y(S)), T <= f)) {
      q < s.length && (m = !0);
      continue;
    }
    N = !0, T < j && (j = T);
  }
  return {
    width: N && Number.isFinite(j) ? j : 0,
    thin: m,
    approximate: x
  };
}
const Ot = (t) => Math.max(1e-10, Math.max(1, ...t.bounds.min.map(Math.abs), ...t.bounds.max.map(Math.abs)) * Number.EPSILON * 64);
async function We(t, e, n) {
  const a = Ot(t), s = Et(t), i = { closed: !1, approximate: !1 }, o = new Uint32Array(s), r = new Uint8Array(s), d = new Uint8Array(s), f = new Uint8Array(s);
  for (let b = 0; b < s; b++) o[b] = b;
  const c = (b) => {
    if (o[b] !== b) {
      const w = o[b];
      o[b] = c(w), d[b] ^= d[w];
    }
    return o[b];
  }, u = (b, w, A) => {
    let E = c(b), T = c(w);
    const U = d[b] ^ d[w] ^ A;
    return E === T ? U === 0 : (r[E] < r[T] && ([E, T] = [T, E]), o[T] = E, d[T] = U, r[E] === r[T] && r[E]++, !0);
  }, x = /* @__PURE__ */ new Map(), y = [], I = /* @__PURE__ */ new Map(), P = s * 3, F = P * P <= Number.MAX_SAFE_INTEGER, R = (b, w) => F ? b * P + w : `${b},${w}`, D = (b, w) => {
    const A = b.map((T, U) => Math.round((T - t.bounds.min[U]) / a)).join(",");
    let E = x.get(A);
    return E === void 0 && (E = x.size, x.set(A, E), y.push(w)), E;
  };
  for (let b = 0; b < s; b++) {
    b % 2048 === 0 && await e();
    const w = bt(t, b);
    if (_(wt(B(w[1], w[0]), B(w[2], w[0]))) <= a * a) continue;
    const A = w.map((E, T) => D(E, b * 3 + T));
    if (new Set(A).size === 3) {
      f[b] = 1;
      for (let E = 0; E < 3; E++) {
        const T = A[E], U = A[(E + 1) % 3], v = T < U, $ = v ? R(T, U) : R(U, T), Z = I.get($);
        if (Z === void 0) I.set($, (b + 1) * (v ? 1 : -1));
        else {
          if (Z === 0 || !u(b, Math.abs(Z) - 1, +(Z > 0 === v))) return i;
          I.set($, 0);
        }
      }
    }
  }
  const C = (b) => {
    const w = y[b];
    return [0, 1, 2].map((A) => kt(t, Math.floor(w / 3), w % 3 * 3 + A));
  }, j = [];
  for (const [b, w] of I) if (w !== 0) {
    const A = typeof b == "number" ? [Math.floor(b / P), b % P] : b.split(",").map(Number), E = C(A[0]), T = C(A[1]);
    j.push({ p: E, q: T, face: w, bounds: Gt([...E, ...T]) }), j.length % 2048 === 0 && await e();
  }
  x.clear(), I.clear(), y.length = 0;
  let N = !1;
  if (j.length) {
    const b = Math.max(a, Math.min(1e-5, n)), w = Xt(j, j.map((A, E) => E));
    for (let A = 0; A < j.length; A++) {
      A % 128 === 0 && await e();
      const E = j[A], T = B(E.q, E.p), U = _(T), v = Rt(T), $ = [];
      for (const W of qt(w, E.bounds, b)) {
        if (A === W) continue;
        const at = j[W], X = B(at.p, E.p), $t = B(at.q, E.p), G = K(X, v), Q = K($t, v), st = Math.max(0, Math.min(G, Q)), rt = Math.min(U, Math.max(G, Q));
        if (rt - st <= a) continue;
        const xt = Math.max(_(jt(X, v, -G)), _(jt($t, v, -Q)));
        if (xt > b) continue;
        const it = Q > G == (E.face > 0 == at.face > 0);
        if (!u(Math.abs(E.face) - 1, Math.abs(at.face) - 1, Number(it))) return i;
        xt > a && (N = !0), $.push([st, rt]);
      }
      $.sort((W, at) => W[0] - at[0]);
      let Z = 0;
      for (const [W, at] of $) {
        if (Math.abs(W - Z) > a) return i;
        Z = at;
      }
      if (Math.abs(Z - U) > a) return i;
    }
  }
  const m = new Float64Array(s), H = new Float64Array(s), q = t.bounds.min.map((b, w) => (b + t.bounds.max[w]) / 2);
  for (let b = 0; b < s; b++) {
    if (b % 2048 === 0 && await e(), !f[b]) continue;
    const w = c(b), A = bt(t, b);
    m[w] += (d[b] ? -1 : 1) * K(B(A[0], q), wt(B(A[1], q), B(A[2], q))) / 6, H[w] += _(wt(B(A[1], A[0]), B(A[2], A[0]))) / 2;
  }
  let S = 0;
  for (let b = 0; b < s; b++) {
    if (H[b] && Math.abs(m[b]) <= a * H[b]) return i;
    S += Math.abs(m[b]);
  }
  return { closed: S > 0, approximate: N };
}
function Ve(t, e, n) {
  const a = B(e[1], e[0]), s = B(e[2], e[0]), i = wt(a, s), o = _(i);
  if (o < 1e-20 || Math.abs(K(B(t, e[0]), i)) / o > n) return !1;
  const r = B(t, e[0]), d = K(a, a), f = K(a, s), c = K(s, s), u = K(r, a), x = K(r, s), y = d * c - f * f;
  if (Math.abs(y) < 1e-30) return !1;
  const I = (u * c - x * f) / y, P = (x * d - u * f) / y, F = n / Math.max(_(a), _(s), n);
  return I >= -F && P >= -F && I + P <= 1 + F;
}
function Kt(t, e, n, a) {
  for (const s of qt(n, { min: t, max: t }, a))
    if (Ve(t, bt(e, s), a)) return !0;
  return !1;
}
const Nt = (t) => t.closed || t.interior === "winding";
function re(t, e, n, a = !1) {
  const s = (o) => {
    if (o.moment) return o.moment;
    const r = [0, 0, 0];
    if (o.ids)
      for (const d of o.ids) {
        const f = bt(e, d), c = wt(B(f[1], f[0]), B(f[2], f[0]));
        for (let u = 0; u < 3; u++) r[u] += c[u] / 2;
      }
    else {
      const d = s(o.left), f = s(o.right);
      for (let c = 0; c < 3; c++) r[c] = d[c] + f[c];
    }
    return o.moment = r;
  }, i = (o) => {
    const r = o.min.map((x, y) => (x + o.max[y]) / 2), d = B(r, t), f = _(d), c = _(B(o.max, o.min)) / 2;
    if (!a && f > c * 10 && f > 0)
      return K(s(o), d) / (f * f * f);
    if (!o.ids) return i(o.left) + i(o.right);
    let u = 0;
    for (const x of o.ids) {
      const y = bt(e, x), I = B(y[0], t), P = B(y[1], t), F = B(y[2], t), R = _(I), D = _(P), C = _(F);
      !R || !D || !C || (u += 2 * Math.atan2(K(I, wt(P, F)), R * D * C + K(I, P) * C + K(P, F) * R + K(F, I) * D));
    }
    return u;
  };
  return i(n) / (4 * Math.PI);
}
async function Je(t, e, n) {
  const a = Ot(t), s = (d) => !Kt(d, t, e, a) && Math.abs(re(d, t, e)) > 0.9, i = t.bounds.min.map((d, f) => (d + t.bounds.max[f]) / 2);
  if (s(i)) return !0;
  const o = Et(t), r = Math.max(1, Math.ceil(o / 32));
  for (let d = 0; d < o; d += r) {
    await n();
    const f = bt(t, d), c = Rt(wt(B(f[1], f[0]), B(f[2], f[0])));
    if (!c) continue;
    const u = [0, 1, 2].map((y) => (f[0][y] + f[1][y] + f[2][y]) / 3), x = Math.max(a * 8, Math.min(_(B(f[0], f[1])), _(B(f[1], f[2])), _(B(f[2], f[0]))) * 0.01);
    if (s(jt(u, c, x)) || s(jt(u, c, -x))) return !0;
  }
  return !1;
}
function Ut(t, e, n, a) {
  if (!Nt(e) || t.some((u, x) => u < e.bounds.min[x] - a || u > e.bounds.max[x] + a) || Kt(t, e, n, a)) return !1;
  if (e.interior === "winding") {
    const u = Math.abs(re(t, e, n));
    return Math.abs(u - 0.5) < 0.05 ? Math.abs(re(t, e, n, !0)) > 0.5 : u > 0.5;
  }
  const s = [1, 0.371390676, 0.52999894], i = _(B(e.bounds.max, e.bounds.min)) * 3 + 1, o = jt(t, s, i), r = [], d = Gt([...t, ...o]);
  for (const u of qt(n, d, a)) {
    const x = Yt(t, o, bt(e, u), a);
    if (x) {
      const y = _(B(x, t));
      y > a && r.push(y);
    }
  }
  r.sort((u, x) => u - x);
  let f = 0, c = -1 / 0;
  for (const u of r)
    u - c > a * 2 && (f++, c = u);
  return f % 2 === 1;
}
const _t = (t) => /отвод|тройник|муфт|фитинг|elbow|fitting|tee\b/i.test(t.name);
async function Xe(t, e) {
  if (_t(t)) return;
  const n = Et(t), a = Math.max(1, Math.ceil(n / 4096)), s = t.bounds.min.map((S, b) => (S + t.bounds.max[b]) / 2), i = [], o = [];
  for (let S = 0; S < n; S += a) {
    S % (a * 256) === 0 && await e();
    const b = bt(t, S), w = wt(B(b[1], b[0]), B(b[2], b[0])), A = _(w);
    A && (i.push(...b), o.push({ n: w.map((E) => E / A), area: A }));
  }
  if (i.length < 12) return;
  let r = Zt(i, s)[0];
  const d = o.filter(({ n: S }) => Math.abs(K(S, r)) < 0.2);
  if (d.length < 4) return;
  const f = Zt(d.map(({ n: S }) => S), [0, 0, 0])[2];
  if (Math.abs(K(f, r)) < 0.98) return;
  r = f;
  const c = r.map(Math.abs).indexOf(Math.max(...r.map(Math.abs)));
  r[c] < 0 && (r = r.map((S) => -S));
  const u = Math.abs(r[0]) < 0.7 ? [1, 0, 0] : [0, 1, 0], x = Rt(wt(r, u)), y = wt(r, x), I = [1 / 0, 1 / 0, 1 / 0], P = [-1 / 0, -1 / 0, -1 / 0];
  for (const S of i) for (const [b, w] of [r, x, y].entries()) {
    const A = K(B(S, s), w);
    I[b] = Math.min(I[b], A), P[b] = Math.max(P[b], A);
  }
  const F = P[0] - I[0], R = Math.max(P[1] - I[1], P[2] - I[2]), D = Math.min(P[1] - I[1], P[2] - I[2]);
  if (D <= Ot(t) * 8 || F + Ot(t) < R * 4 || R > D * 4) return;
  let C = 0, j = 0;
  const N = /* @__PURE__ */ new Set();
  for (const { n: S, area: b } of o) {
    const w = Math.abs(K(S, r));
    j += b, (w < 0.015 || w > 0.999) && (C += b), w < 0.015 && N.add(S.map((A) => Math.round(A * 100)).join(","));
  }
  if (C < j * 0.995) return;
  const m = [];
  for (let S = 0; S < i.length; S += 3) {
    const b = i.slice(S, S + 3).map((w) => K(B(w, s), r));
    m.push([Math.min(...b), Math.max(...b)]);
  }
  m.sort((S, b) => S[0] - b[0]);
  let H = I[0];
  for (const [S, b] of m) {
    if (S > H + Ot(t) * 4) return;
    H = Math.max(H, b);
  }
  const q = jt(jt(s, x, (I[1] + P[1]) / 2), y, (I[2] + P[2]) / 2);
  return {
    axis: r,
    centre: q,
    from: I[0],
    to: P[0],
    width: R,
    round: N.size >= 6 && R < D * 1.2,
    sampled: a > 1
  };
}
async function Ke(t, e) {
  if (_t(t) || !/кабел|труб|cable|pipe/i.test(t.name)) return [];
  const n = Ot(t), a = [], s = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), o = (D) => {
    const C = D.map((N, m) => Math.round((N - t.bounds.min[m]) / n)).join(",");
    let j = s.get(C);
    return j === void 0 && (j = a.length, a.push(D), s.set(C, j)), j;
  };
  for (let D = 0; D < Et(t); D++) {
    D % 1024 === 0 && await e();
    const C = bt(t, D).map(o);
    for (let j = 0; j < 3; j++) {
      const N = Math.min(C[j], C[(j + 1) % 3]), m = Math.max(C[j], C[(j + 1) % 3]);
      N !== m && i.set(`${N},${m}`, [N, m, _(B(a[N], a[m]))]);
    }
  }
  const r = [...i.values()].map((D) => D[2]).filter((D) => D > n).sort((D, C) => D - C);
  if (!r.length) return [];
  const d = r[Math.floor(r.length * 0.1)] * 1.25, f = Int32Array.from({ length: a.length }, (D, C) => C), c = (D) => {
    for (; f[D] !== D; )
      f[D] = f[f[D]], D = f[D];
    return D;
  };
  let u = 0;
  for (const [D, C, j] of i.values())
    ++u % 4096 === 0 && await e(), j <= d && (f[c(C)] = c(D));
  const x = /* @__PURE__ */ new Map();
  for (let D = 0; D < a.length; D++) {
    const C = c(D), j = x.get(C);
    j ? j.push(a[D]) : x.set(C, [a[D]]);
  }
  const y = /* @__PURE__ */ new Map();
  for (const [D, C] of x) {
    if (await e(), C.length < 6 || C.length > 256) continue;
    const j = C[0], N = [0, 1, 2].map((S) => j[S] + C.reduce((b, w) => b + w[S] - j[S], 0) / C.length), m = C.map((S) => _(B(S, N))), H = Math.max(...m), q = Zt(C, N)[2];
    !q || H <= n || Math.min(...m) < H * 0.88 || C.some((S) => Math.abs(K(B(S, N), q)) > Math.max(n * 16, H * 2e-3)) || y.set(D, { centre: N, radius: H, normal: q });
  }
  const I = /* @__PURE__ */ new Map();
  for (const [D, C] of i.values()) {
    ++u % 4096 === 0 && await e();
    const j = Math.min(c(D), c(C)), N = Math.max(c(D), c(C));
    if (j === N || !y.has(j) || !y.has(N)) continue;
    const m = `${j},${N}`, H = I.get(m);
    H ? H.count++ : I.set(m, { a: j, b: N, count: 1 });
  }
  const P = /* @__PURE__ */ new Map();
  for (const { a: D, b: C, count: j } of I.values()) {
    const N = y.get(D), m = y.get(C), H = Rt(B(m.centre, N.centre));
    j < 6 || !H || Math.min(N.radius, m.radius) < Math.max(N.radius, m.radius) * 0.8 || Math.abs(K(H, N.normal)) < 0.5 || Math.abs(K(H, m.normal)) < 0.5 || (P.set(D, [...P.get(D) || [], C]), P.set(C, [...P.get(C) || [], D]));
  }
  const F = /* @__PURE__ */ new Set(), R = [];
  for (const [D, C] of P) {
    if (C.length !== 1 || F.has(D)) continue;
    let j = D, N = -1;
    const m = [];
    for (; !F.has(j); ) {
      F.add(j);
      const H = P.get(j) || [];
      if (H.length > 2) break;
      const q = H.find((E) => E !== N);
      if (q === void 0 || F.has(q)) break;
      const S = y.get(j), b = y.get(q), w = B(b.centre, S.centre), A = _(w);
      A > n && m.push({
        axis: w.map((E) => E / A),
        centre: S.centre,
        from: 0,
        to: A,
        width: Math.max(S.radius, b.radius) * 2,
        round: !0,
        sampled: !0
      }), N = j, j = q;
    }
    m.length && R.push(m);
  }
  return R;
}
async function _e(t, e) {
  const n = Et(t), a = Int32Array.from({ length: n }, (d, f) => f), s = new Uint8Array(n), i = /* @__PURE__ */ new Map(), o = Ot(t), r = (d) => {
    for (; a[d] !== d; )
      a[d] = a[a[d]], d = a[d];
    return d;
  };
  for (let d = 0; d < n; d++) {
    d % 2048 === 0 && await e();
    for (const f of bt(t, d)) {
      const c = f.map((I, P) => Math.round((I - t.bounds.min[P]) / o)).join(","), u = i.get(c);
      if (u === void 0) {
        i.set(c, d);
        continue;
      }
      let x = r(d), y = r(u);
      x !== y && (s[x] < s[y] && ([x, y] = [y, x]), a[y] = x, s[x] === s[y] && s[x]++);
    }
  }
  for (let d = 0; d < n; d++) a[d] = r(d);
  return a;
}
async function tn(t, e, n, a, s) {
  const { axis: i, centre: o } = t, r = Math.abs(i[0]) < 0.7 ? [1, 0, 0] : [0, 1, 0], d = Rt(wt(i, r)), f = wt(i, d), c = [1 / 0, 1 / 0, 1 / 0], u = [-1 / 0, -1 / 0, -1 / 0], x = Ot(e);
  for (let j = 0; j < Et(e); j++) {
    j % 2048 === 0 && await a();
    for (const N of bt(e, j)) for (const [m, H] of [i, d, f].entries()) {
      const q = K(B(N, o), H);
      c[m] = Math.min(c[m], q), u[m] = Math.max(u[m], q);
    }
  }
  if (u[1] - c[1] < t.width * 2.5 || u[2] - c[2] < t.width * 2.5) return [];
  const y = Math.max(1, u[0] - c[0]), I = jt(o, i, c[0] - y), P = jt(o, i, u[0] + y), F = [];
  let R = 0;
  for (const j of qt(n, Gt([...I, ...P]), x)) {
    ++R % 256 === 0 && await a();
    const N = Yt(I, P, bt(e, j), x);
    N && F.push({ triangle: j, at: K(B(N, o), i) });
  }
  if (F.length < 2) return [];
  const D = await s(), C = /* @__PURE__ */ new Map();
  for (const j of F) {
    const N = D[j.triangle], m = C.get(N);
    m ? (m[0] = Math.min(m[0], j.at), m[1] = Math.max(m[1], j.at)) : C.set(N, [j.at, j.at]);
  }
  return [...C].map(([j, [N, m]]) => ({ part: j, from: Math.max(t.from, N), to: Math.min(t.to, m) })).filter(({ from: j, to: N }) => N - j > x);
}
async function en(t, e, n, a, s) {
  let i = 0;
  const o = Ot(e);
  for (const r of t) {
    let d = 0;
    const f = /* @__PURE__ */ new Map();
    for (const c of r) {
      await a();
      for (const u of await tn(c, e, n, a, s)) {
        const x = f.get(u.part) || [];
        x.push([d + u.from - c.from, d + u.to - c.from]), f.set(u.part, x);
      }
      d += c.to - c.from;
    }
    for (const c of f.values()) {
      c.sort((y, I) => y[0] - I[0]);
      let u = c[0][0], x = c[0][1];
      for (const [y, I] of c.slice(1))
        y <= x + o * 4 ? x = Math.max(x, I) : (i = Math.max(i, x - u), u = y, x = I);
      i = Math.max(i, x - u);
    }
  }
  return i > o ? i * 1e3 : void 0;
}
async function nn(t, e, n, a, s) {
  const i = e.precision / 1e3;
  if (!Number.isFinite(i) || i <= 0)
    throw Error("Точность расчёта должна быть положительным числом.");
  const o = t.filter((v) => e.includeHidden || !v.hidden), r = o.filter((v) => Bt(v, e.a)), d = o.filter((v) => Bt(v, e.b));
  if (!r.length || !d.length) {
    const v = r.length ? "Б" : "А", $ = r.length ? e.b : e.a;
    throw Error(`Выбор ${v}: ${Ee(t, $, e.includeHidden)}`);
  }
  let f = performance.now();
  const c = async () => {
    if (a())
      throw Error("Расчёт отменён. Предыдущие результаты сохранены.");
    performance.now() - f > 16 && (await new Promise((v) => setTimeout(v, 0)), f = performance.now());
  }, u = /* @__PURE__ */ new Map(), x = (v) => {
    let $ = u.get(v.id);
    return $ || ($ = se(
      v,
      Array.from({ length: Et(v) }, (Z, W) => W)
    ), u.set(v.id, $)), $;
  }, y = /* @__PURE__ */ new Map(), I = /* @__PURE__ */ new Map(), P = /* @__PURE__ */ new Map(), F = async (v) => {
    let $ = P.get(v.id);
    return $ || ($ = await Ke(v, c), P.set(v.id, $)), $;
  }, R = /* @__PURE__ */ new Map(), D = async (v) => {
    let $ = R.get(v.id);
    return $ || ($ = await _e(v, c), R.set(v.id, $)), $;
  }, C = async (v) => (I.has(v.id) || I.set(v.id, await Xe(v, c)), I.get(v.id)), j = async (v) => {
    if (e.type !== "intersection") return v;
    let $ = y.get(v.id);
    return $ === void 0 && ($ = await We(v, c, i), !$.closed && await Je(v, x(v), c) && ($ = { closed: !1, approximate: !0, winding: !0 }), y.set(v.id, $)), $.winding ? { ...v, closed: !1, interior: "winding" } : $.closed === v.closed ? v : { ...v, closed: $.closed };
  }, N = /* @__PURE__ */ new Map(), m = async (v) => {
    let $ = N.get(v.id);
    if ($ !== void 0) return $;
    const Z = [];
    for (let W = 0; W < Et(v); W++)
      Z.push(
        [0, 3, 6].map(
          (at) => [0, 1, 2].map((X) => Math.round(kt(v, W, at + X) / i)).join(",")
        ).sort().join(";")
      ), W % 9e3 === 0 && await c();
    return $ = Z.sort().join("|"), N.set(v.id, $), $;
  }, H = [], q = new Set(r.map((v) => v.id)), S = new Set(d.map((v) => v.id)), b = Xt(
    d,
    d.map((v, $) => $)
  ), w = /* @__PURE__ */ new Map();
  let A = 0;
  const E = (v) => v.triangles.byteLength + (v.vertices?.byteLength || 0) + (v.indices?.byteLength || 0) + Et(v) * 32;
  async function T(v, $) {
    if (!s) return v;
    let Z = w.get(v.id);
    if (Z)
      return w.delete(v.id), w.set(v.id, Z), Z;
    for (const [W, at] of w)
      W !== $ && A > 96 * 1024 * 1024 && (w.delete(W), A -= E(at), u.delete(W), R.delete(W), P.delete(W), N.delete(W));
    return Z = await s(v.id), w.set(v.id, Z), A += E(Z), Z;
  }
  let U = -1 / 0;
  for (let v = 0; v < r.length; v++) {
    const $ = r[v];
    performance.now() - U > 150 && (U = performance.now(), n({
      phase: "Проверка пар",
      done: v,
      total: r.length,
      found: H.length
    }));
    const Z = [...qt(b, $.bounds, i)];
    for (let W = 0; W < Z.length; W++) {
      const at = Z[W];
      performance.now() - U > 150 && (U = performance.now(), n({
        phase: `Проверка пар · A ${v + 1}/${r.length} · кандидаты ${W + 1}/${Z.length}`,
        done: v,
        total: r.length,
        found: H.length
      }));
      const X = d[at];
      if (await c(), $.id === X.id || !Qt($.bounds, X.bounds, i) || e.ignoreSameModel && $.modelId === X.modelId || e.ignoreSameGroup && $.modelId === X.modelId && $.properties.Объект && $.properties.Объект === X.properties.Объект || e.equalProperty && $.properties[e.equalProperty] !== void 0 && $.properties[e.equalProperty] === X.properties[e.equalProperty] || $.id > X.id && q.has(X.id) && S.has($.id)) continue;
      const $t = Te($.id, X.id), G = await j(await T($)), Q = await j(await T(X, $.id));
      let st, rt = "surface", xt = 0, it, Dt, dt, vt;
      if (e.type === "duplicates") {
        if (Et(G) !== Et(Q) || G.bounds.min.some(
          (tt, mt) => Math.abs(tt - Q.bounds.min[mt]) > i || Math.abs(G.bounds.max[mt] - Q.bounds.max[mt]) > i
        ))
          continue;
        await m(G) === await m(Q) && (st = G.bounds.min.map((tt, mt) => (tt + G.bounds.max[mt]) / 2), rt = "duplicate");
      } else {
        const tt = x(G), mt = x(Q), Pt = Math.max(
          1,
          ...G.bounds.min.map(Math.abs),
          ...G.bounds.max.map(Math.abs),
          ...Q.bounds.min.map(Math.abs),
          ...Q.bounds.max.map(Math.abs)
        ), V = Math.max(1e-10, Pt * Number.EPSILON * 64), ot = {
          min: G.bounds.min.map(
            (M, O) => Math.max(M, Q.bounds.min[O])
          ),
          max: G.bounds.max.map(
            (M, O) => Math.min(M, Q.bounds.max[O])
          )
        }, ht = ot.min.map(
          (M, O) => (M + ot.max[O]) / 2
        ), St = new He(), gt = [];
        let l = 1, p = 0, g = 1 / 0, h = 0;
        for (const [M, O] of zt(tt, mt, i)) {
          const k = bt(G, M), z = bt(Q, O);
          if (!Qt(Gt(k.flat()), Gt(z.flat()), i)) continue;
          const L = Ze(k, z, V, e.touching);
          if (L) {
            const Y = _(B(L, ht));
            if ((!st || Y < g) && (st = L, g = Y), St.add(k), St.add(z), p++ % l === 0 && (Ye(k, z, V, gt), gt.length || gt.push(L), gt.length >= 8192)) {
              for (let J = 0; J * 2 < gt.length; J++) gt[J] = gt[J * 2];
              gt.length = Math.ceil(gt.length / 2), l *= 2;
            }
          }
          ++h % 256 === 0 && (performance.now() - U > 150 && (U = performance.now(), n({
            phase: `Геометрия пары · A ${v + 1}/${r.length}`,
            done: v,
            total: r.length,
            found: H.length
          })), await c());
        }
        if (!st && Nt(G) && Nt(Q)) {
          const M = ht;
          Ut(M, G, tt, V) && Ut(M, Q, mt, V) && (st = M, rt = "contained");
        }
        if (!st) {
          for (const [M, O, k] of [
            [G, Q, mt],
            [Q, G, tt]
          ])
            if (Nt(O)) {
              for (let z = 0; z < Et(M) && !st; z++) {
                const L = bt(M, z), Y = L[0].map(
                  (J, nt) => (L[0][nt] + L[1][nt] + L[2][nt]) / 3
                );
                for (const J of [L[0], Y])
                  if (Ut(J, O, k, V)) {
                    st = J, rt = "contained";
                    break;
                  }
                await c();
              }
              if (st) break;
            }
        }
        if (st) {
          const M = (et, ct) => [...qt(ct, ot, i)].filter(
            (Mt) => Qt(Gt(bt(et, Mt).flat()), ot, i)
          ), O = M(G, tt), k = M(Q, mt);
          rt !== "surface" && (St.addFrom(G, O), St.addFrom(Q, k)), await c();
          const z = ot.min.map(
            (et, ct) => (et + ot.max[ct]) / 2
          ), L = (et, ct) => et === 0 ? Ut(ct, G, tt, V) : Ut(ct, Q, mt, V), Y = (et, ct) => et === 0 ? Ut(ct, G, tt, V) || Kt(ct, G, tt, V) : Ut(ct, Q, mt, V) || Kt(ct, Q, mt, V);
          if (rt === "contained") {
            const et = Math.max(1, Math.ceil((O.length + k.length) / 4096));
            l = Math.max(l, et);
            const ct = /* @__PURE__ */ new Set();
            for (const [Mt, ft, ut] of [[G, O, 1], [Q, k, 0]]) {
              for (let yt = 0; yt < ft.length; yt += et) {
                yt % (et * 32) === 0 && await c();
                for (const It of bt(Mt, ft[yt])) {
                  const Lt = It.join(",");
                  ct.has(Lt) || (ct.add(Lt), Y(ut, It) && gt.push(It));
                }
              }
              ct.clear();
            }
            if (G.interior === "winding" || Q.interior === "winding") {
              const Mt = (ft, ut) => {
                let yt = 1, It = 0;
                for (; ft; ft = Math.floor(ft / ut))
                  yt /= ut, It += yt * (ft % ut);
                return It;
              };
              for (let ft = 1; ft <= 2048; ft++) {
                ft % 16 === 0 && await c();
                const ut = [2, 3, 5].map((yt, It) => ot.min[It] + Mt(ft, yt) * (ot.max[It] - ot.min[It]));
                L(0, ut) && L(1, ut) && gt.push(ut);
              }
            }
          }
          const J = (et, ct, Mt) => Nt(G) && Nt(Q) && Mt.every((ft) => {
            const ut = jt(ft, et, ct - K(ft, et));
            return !Y(0, ut) || !Y(1, ut);
          }), nt = () => [0, 1, 2].map(
            (et) => gt.reduce((ct, Mt) => ct + Mt[et], 0) / gt.length
          ), lt = rt === "surface" && gt.length > 2 ? Zt(gt, nt())[2] : void 0, Tt = lt ? be(
            G,
            Q,
            O,
            k,
            [lt],
            [],
            ot,
            nt(),
            gt,
            V,
            L
          ) : void 0, Wt = !Tt || Tt.width > V, de = !Wt && !!Tt?.approximate, pe = !Nt(G) || !Nt(Q);
          if (!pe && !Wt && !de && (rt = "touch"), rt === "touch" && !e.touching) continue;
          const { zones: Pe, crowded: Ne } = Qe(gt, ot, i, J), qe = St.values();
          let Ht = 0, fe = !de, ue = Ne || l > 1 || !!Tt?.approximate || !!y.get(G.id)?.approximate || !!y.get(Q.id)?.approximate;
          for (const et of rt === "touch" ? [] : Pe) {
            const ct = et.limits.length ? O.filter((yt) => ge(G, yt, et.limits)) : O, Mt = et.limits.length ? k.filter((yt) => ge(Q, yt, et.limits)) : k, ft = et.hits.length ? [0, 1, 2].map(
              (yt) => et.hits.reduce((It, Lt) => It + Lt[yt], 0) / et.hits.length
            ) : z, ut = be(
              G,
              Q,
              ct,
              Mt,
              et.hits.length > 2 ? Zt(et.hits, ft) : [],
              qe,
              ot,
              ft,
              et.hits,
              V,
              L,
              rt === "contained"
            );
            ut.thin && (fe = !1), ut.approximate && (ue = !0), ut.width > Ht && (Ht = ut.width), await c();
          }
          if (Ht *= 1e3, rt === "touch" ? it = void 0 : pe ? it = "unmeasurable" : Ht <= 0 || !fe ? it = "tolerance" : ue && (it = "approximate"), xt = rt === "touch" || it === "unmeasurable" || it === "tolerance" ? 0 : Ht, rt !== "touch" && !_t(G) && !_t(Q)) {
            const et = await C(G), ct = await C(Q);
            for (const [Mt, ft, ut, yt, It] of [[et, G, Q, ct, mt], [ct, Q, G, et, tt]]) {
              if (yt?.round && /труб|pipe/i.test(ut.name)) continue;
              const Lt = Mt ? [[Mt]] : await F(ft);
              if (!Lt.length) continue;
              const ee = await en(Lt, ut, It, c, () => D(ut));
              ee === void 0 || ee <= (dt ?? 0) || (dt = ee, vt = ft.id, Mt || (it = it || "approximate"));
            }
            dt !== void 0 && (Dt = it === "unmeasurable" || it === "tolerance" ? void 0 : xt, xt = Math.max(xt, dt), (it === "unmeasurable" || it === "tolerance" || et?.sampled || ct?.sampled) && (it = "approximate"));
          }
          await c();
        }
        if (st && !je({ kind: rt, depth: it, penetrationMm: xt }, e.minPenetration, e.precision))
          continue;
      }
      if (st && (H.push({
        id: $t,
        a: he(G),
        b: he(Q),
        point: st,
        kind: rt,
        state: "new",
        note: "",
        assignee: "",
        firstSeen: "",
        lastSeen: "",
        penetrationMm: xt,
        ...dt !== void 0 ? { axialPenetrationMm: dt, axialElementId: vt, overlapThicknessMm: Dt } : {},
        ...it ? { depth: it } : {}
      }), H.length >= 5e4))
        throw Error(
          "Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат."
        );
    }
  }
  return n({
    phase: "Готово",
    done: r.length,
    total: r.length,
    found: H.length
  }), H;
}
const $e = '(function(){"use strict";const en=(t,n,e)=>t.kind==="duplicate"||t.depth==="unmeasurable"||t.depth==="tolerance"||(t.penetrationMm??0)+e>=n,Gt=({triangles:t,vertices:n,indices:e,triangleCount:l,closed:a,bounds:c,...f})=>f;function Lt(t,n){return n.exclude.includes(t.id)?!1:n.include.includes(t.id)?!0:!(n.manualOnly||n.modelsMode==="selected"&&!n.models.includes(t.modelId)||n.modelsMode===void 0&&n.models.length&&!n.models.includes(t.modelId))}function on(t,n,e){if(!n.manualOnly&&n.modelsMode==="selected"&&!n.models.length&&!n.include.length)return"Не отмечены модели. Выберите файлы или включите «Все модели».";let l=0;for(const a of t)if(Lt(a,n)&&(l++,e||!a.hidden))return;return l?`Все выбранные элементы (${l}) скрыты. Покажите их в модели или включите «Включать скрытые элементы» на вкладке «Правила».`:n.manualOnly?"Ручная выборка пуста. Выделите элементы в 3D заново или нажмите «Сбросить ручной выбор».":n.exclude.length?"Нет элементов после ручных исключений. Проверьте исключения или нажмите «Сбросить ручной выбор».":"В выбранных моделях нет доступных элементов. Обновите модели и проверьте состав выборки."}const sn=(t,n)=>JSON.stringify([t,n].sort()),P=(t,n)=>[t[0]-n[0],t[1]-n[1],t[2]-n[2]],ft=(t,n,e=1)=>[t[0]+n[0]*e,t[1]+n[1]*e,t[2]+n[2]*e],z=(t,n)=>t[0]*n[0]+t[1]*n[1]+t[2]*n[2],Y=(t,n)=>[t[1]*n[2]-t[2]*n[1],t[2]*n[0]-t[0]*n[2],t[0]*n[1]-t[1]*n[0]],F=t=>Math.hypot(...t),bt=t=>{const n=F(t);return n>1e-20?[t[0]/n,t[1]/n,t[2]/n]:void 0},lt=t=>t.triangleCount??(t.indices?t.indices.length/3:t.triangles.length/9),tt=(t,n,e)=>t.indices&&t.vertices?t.vertices[t.indices[n*3+Math.floor(e/3)]*3+e%3]:t.triangles[n*9+e],X=(t,n)=>[0,3,6].map(e=>[tt(t,n,e),tt(t,n,e+1),tt(t,n,e+2)]);function jt(t){const n=[1/0,1/0,1/0],e=[-1/0,-1/0,-1/0];for(let l=0;l<t.length;l++){const a=l%3;n[a]=Math.min(n[a],t[l]),e[a]=Math.max(e[a],t[l])}return{min:n,max:e}}const Et=(t,n,e)=>t.min.every((l,a)=>l<=n.max[a]+e&&t.max[a]>=n.min[a]-e);function Ut(t,n){const e={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const i of n)for(let s=0;s<9;s++){const u=s%3,o=tt(t,i,s);e.min[u]=Math.min(e.min[u],o),e.max[u]=Math.max(e.max[u],o)}if(n.length<=12)return{...e,ids:n};const l=e.max.map((i,s)=>i-e.min[s]),a=l.indexOf(Math.max(...l)),c=i=>tt(t,i,a)+tt(t,i,a+3)+tt(t,i,a+6);n.sort((i,s)=>c(i)-c(s));const f=n.length>>1;return{...e,left:Ut(t,n.slice(0,f)),right:Ut(t,n.slice(f))}}function*yt(t,n,e){Et(t,n,e)&&(t.ids?yield*t.ids:(yield*yt(t.left,n,e),yield*yt(t.right,n,e)))}function*pt(t,n,e){if(Et(t,n,e)){if(t.ids&&n.ids){for(const l of t.ids)for(const a of n.ids)yield[l,a];return}if(t.ids){yield*pt(t,n.left,e),yield*pt(t,n.right,e);return}if(n.ids){yield*pt(t.left,n,e),yield*pt(t.right,n,e);return}yield*pt(t.left,n.left,e),yield*pt(t.left,n.right,e),yield*pt(t.right,n.left,e),yield*pt(t.right,n.right,e)}}function $t(t,n){const e={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const f of n)for(let i=0;i<3;i++)e.min[i]=Math.min(e.min[i],t[f].bounds.min[i]),e.max[i]=Math.max(e.max[i],t[f].bounds.max[i]);if(n.length<=16)return{...e,ids:n};const l=e.max.map((f,i)=>f-e.min[i]),a=l.indexOf(Math.max(...l));n.sort((f,i)=>t[f].bounds.min[a]+t[f].bounds.max[a]-(t[i].bounds.min[a]+t[i].bounds.max[a]));const c=n.length>>1;return{...e,left:$t(t,n.slice(0,c)),right:$t(t,n.slice(c))}}function qt(t,n,e,l){const a=P(n,t),c=P(e[1],e[0]),f=P(e[2],e[0]),i=Y(a,f),s=z(c,i);if(Math.abs(s)<=1e-12*F(a)*F(c)*F(f))return;const u=1/s,o=P(t,e[0]),p=z(o,i)*u,d=Y(o,c),M=z(a,d)*u,I=z(f,d)*u,q=l/Math.max(F(c),F(f),l);if(p>=-q&&M>=-q&&p+M<=1+q&&I>=-q&&I<=1+q)return ft(t,a,Math.max(0,Math.min(1,I)))}function an(t,n,e,l){const a=e.map(Math.abs).indexOf(Math.max(...e.map(Math.abs))),c=[0,1,2].filter(s=>s!==a),f=(s,u,o)=>(u[c[0]]-s[c[0]])*(o[c[1]]-s[c[1]])-(u[c[1]]-s[c[1]])*(o[c[0]]-s[c[0]]),i=(s,u)=>{const o=u.map((p,d)=>f(p,u[(d+1)%3],s));return o.every(p=>p>=-l*F(e))||o.every(p=>p<=l*F(e))};for(const s of t)if(i(s,n))return s;for(const s of n)if(i(s,t))return s;for(let s=0;s<3;s++)for(let u=0;u<3;u++){const o=t[s],p=t[(s+1)%3],d=n[u],M=n[(u+1)%3],I=P(p,o),q=P(M,d),T=I[c[0]]*q[c[1]]-I[c[1]]*q[c[0]];if(Math.abs(T)<1e-18)continue;const L=P(d,o),v=(L[c[0]]*q[c[1]]-L[c[1]]*q[c[0]])/T,j=(L[c[0]]*I[c[1]]-L[c[1]]*I[c[0]])/T;if(v>=0&&v<=1&&j>=0&&j<=1)return ft(o,I,v)}}function rn(t,n,e,l){for(let a=0;a<3;a++){const c=qt(t[a],t[(a+1)%3],n,e);c&&l.push(c);const f=qt(n[a],n[(a+1)%3],t,e);f&&l.push(f)}}function fn(t,n,e,l){const a=Y(P(t[1],t[0]),P(t[2],t[0])),c=Y(P(n[1],n[0]),P(n[2],n[0])),f=F(a),i=F(c);if(f<1e-20||i<1e-20)return;const s=n.map(o=>z(P(o,t[0]),a)/f),u=t.map(o=>z(P(o,n[0]),c)/i);if(!(s.every(o=>o>e)||s.every(o=>o<-e)||u.every(o=>o>e)||u.every(o=>o<-e))){if(s.every(o=>Math.abs(o)<=e)&&u.every(o=>Math.abs(o)<=e))return l?an(t,n,a,e):void 0;if(!(!l&&(!(Math.min(...s)<-e&&Math.max(...s)>e)||!(Math.min(...u)<-e&&Math.max(...u)>e))))for(let o=0;o<3;o++){const p=qt(t[o],t[(o+1)%3],n,e);if(p)return p;const d=qt(n[o],n[(o+1)%3],t,e);if(d)return d}}}class cn{world=[[1,0,0],[0,1,0],[0,0,1]];items=new Map;step=1e4;key(n){return n.map(e=>Math.round(e*this.step)).join(",")}add(n){const e=bt(Y(P(n[1],n[0]),P(n[2],n[0])));if(!e)return;const a=e[0]<-1e-9||Math.abs(e[0])<=1e-9&&(e[1]<-1e-9||Math.abs(e[1])<=1e-9&&e[2]<0)?[-e[0],-e[1],-e[2]]:[e[0],e[1],e[2]],c=this.key(a);for(this.items.has(c)||this.items.set(c,a);this.items.size>512&&this.step>10;){this.step/=10;const f=new Map;for(const i of this.items.values()){const s=this.key(i);f.has(s)||f.set(s,i)}this.items=f}}addFrom(n,e){for(const l of e)this.add(X(n,l))}values(){return[...this.world,...[...this.items].sort((n,e)=>n[0]<e[0]?-1:1).map(([,n])=>n)]}}function St(t,n){const e=[[0,0,0],[0,0,0],[0,0,0]];for(const a of t){const c=[a[0]-n[0],a[1]-n[1],a[2]-n[2]];for(let f=0;f<3;f++)for(let i=0;i<3;i++)e[f][i]+=c[f]*c[i]}const l=[[1,0,0],[0,1,0],[0,0,1]];for(let a=0;a<12;a++){let c=0;for(let f=0;f<3;f++)for(let i=f+1;i<3;i++)c+=e[f][i]*e[f][i];if(c<=1e-30)break;for(let f=0;f<3;f++)for(let i=f+1;i<3;i++){if(Math.abs(e[f][i])<=1e-30)continue;const s=(e[i][i]-e[f][f])/(2*e[f][i]),u=(s>=0?1:-1)/(Math.abs(s)+Math.sqrt(s*s+1)),o=1/Math.sqrt(u*u+1),p=u*o;for(const d of[e,l])for(let M=0;M<3;M++){const I=d[M][f],q=d[M][i];d[M][f]=o*I-p*q,d[M][i]=p*I+o*q}for(let d=0;d<3;d++){const M=e[f][d],I=e[i][d];e[f][d]=o*M-p*I,e[i][d]=p*M+o*I}}}return[0,1,2].sort((a,c)=>e[c][c]-e[a][a]).map(a=>bt([l[0][a],l[1][a],l[2][a]])).filter(a=>!!a)}function ln(t,n,e,l){const a=n.min.map((o,p)=>(o+n.max[p])/2),c=F(P(n.max,n.min)),f=Math.max(e*10,c/50),i=o=>[0,1,2].map(p=>o.reduce((d,M)=>d+M[p],0)/o.length);let s=[{hits:t,limits:[]}],u=!1;for(let o=0;o<12;o++){const p=[];let d=!1;for(const M of s){if(M.hits.length<2){p.push(M);continue}if(p.length+s.length>=64){u=!0,p.push(M);continue}const I=i(M.hits),q=[I,a,...[0,.25,.5,.75].map(r=>M.hits[Math.floor(r*(M.hits.length-1))])],T=[[1,0,0],[0,1,0],[0,0,1]],L=St(M.hits,I);L[0]&&T.push(L[0]);const v=r=>{let h=-1/0,g=1/0;for(const w of M.hits){const S=z(w,r);S>h&&(h=S),S<g&&(g=S)}return h-g},j=r=>Math.max(0,...L.filter(h=>Math.abs(z(h,r))<.9).map(h=>v(h))),x=r=>{const h=M.hits.map(w=>z(w,r)).sort((w,S)=>w-S),g=[];for(let w=1;w<h.length;w++){const S=h[w]-h[w-1];S>f&&g.push({at:(h[w]+h[w-1])/2,size:S})}return g.sort((w,S)=>S.size-w.size)};let E,_=0;for(const r of T){const h=x(r);!h.length||h[0].size<=_||h[0].size<=j(r)||(_=h[0].size,l(r,h[0].at,q)&&(E={n:r,cuts:[h[0].at]}))}if(!E){p.push(M);continue}d=!0;const{n:N,cuts:A}=E,y=Array.from({length:A.length+1},()=>[]);for(const r of M.hits){const h=z(r,N);let g=0;for(;g<A.length&&h>=A[g];)g++;y[g].push(r)}y.forEach((r,h)=>p.push({hits:r,limits:[...M.limits,{n:N,from:h?A[h-1]:-1/0,to:h<A.length?A[h]:1/0}]}))}if(s=p,d&&o===11&&(u=!0),!d)break}return{zones:s,crowded:u}}function Wt(t,n,e){return e.every(({n:l,from:a,to:c})=>{let f=1/0,i=-1/0;for(let s=0;s<9;s+=3){const u=tt(t,n,s)*l[0]+tt(t,n,s+1)*l[1]+tt(t,n,s+2)*l[2];u<f&&(f=u),u>i&&(i=u)}return i>=a&&f<=c})}function Xt(t,n,e,l,a,c,f,i,s,u,o,p=!1){let d=!1;const M=A=>{let y=-1/0,r=1/0;const h=g=>{g>y&&(y=g),g<r&&(r=g)};for(const g of s)h(z(g,A));for(const[g,w,S]of[[t,e,1],[n,l,0]]){const C=Math.max(1,Math.floor(w.length/32));C>1&&(d=!0);for(let m=0;m<w.length;m+=C)for(const b of X(g,w[m]))o(S,b)&&h(z(b,A))}return Number.isFinite(y)&&Number.isFinite(r)?y-r:0},I=A=>{let y=1/0,r=-1/0;for(let h=0;h<8;h++){const g=(h&1?f.max[0]:f.min[0])*A[0]+(h&2?f.max[1]:f.min[1])*A[1]+(h&4?f.max[2]:f.min[2])*A[2];g<y&&(y=g),g>r&&(r=g)}return[y,r]},q=(A,y,r,h,g)=>{let w=1/0,S=-1/0;for(const C of y){let m=1/0,b=-1/0;for(let U=0;U<9;U+=3){const H=tt(A,C,U)*r[0]+tt(A,C,U+1)*r[1]+tt(A,C,U+2)*r[2];H<m&&(m=H),H>b&&(b=H)}b<h||m>g||(m<h&&(m=h),b>g&&(b=g),m<w&&(w=m),b>S&&(S=b))}return w===1/0?void 0:[w,S]};if(f.min.some((A,y)=>f.max[y]-A<=0))return{width:0,thin:!1,approximate:!1};const T=Math.ceil((e.length+l.length)/4096),L=[...a,...T>1?c.filter((A,y)=>y<3||y%T===0):c];T>1&&L.length<a.length+c.length&&(d=!0);const v=(A,y,r,h,g)=>{const w=m=>ft(i,r,m-z(i,r));if(!y)return o(A,w((h+g)/2))?[h,g]:void 0;let[S,C]=y;return S>h&&o(A,w((h+S)/2))&&(S=h),C<g&&o(A,w((C+g)/2))&&(C=g),[S,C]},j=(A,y)=>A&&y?Math.min(A[1],y[1])-Math.max(A[0],y[0]):0;let x=1/0,E=!1,_=!1,N=0;for(let A=0;A<L.length;A++){const y=L[A],[r,h]=I(y),g=q(t,e,y,r,h),w=q(n,l,y,r,h);let S=j(g,w);if(S<=0&&(N++<32?S=j(v(0,g,y,r,h),v(1,w,y,r,h)):d=!0),p&&s.length>1){let C=1/0,m=-1/0;for(const b of s){const U=z(b,y);C=Math.min(C,U),m=Math.max(m,U)}S=Math.max(S,m-C)}if(S<=u&&(A<a.length&&N<40&&(N++,S=M(y)),S<=u)){A<a.length&&(_=!0);continue}E=!0,S<x&&(x=S)}return{width:E&&Number.isFinite(x)?x:0,thin:_,approximate:d}}const gt=t=>Math.max(1e-10,Math.max(1,...t.bounds.min.map(Math.abs),...t.bounds.max.map(Math.abs))*Number.EPSILON*64);async function un(t,n,e){const l=gt(t),a=lt(t),c={closed:!1,approximate:!1},f=new Uint32Array(a),i=new Uint8Array(a),s=new Uint8Array(a),u=new Uint8Array(a);for(let r=0;r<a;r++)f[r]=r;const o=r=>{if(f[r]!==r){const h=f[r];f[r]=o(h),s[r]^=s[h]}return f[r]},p=(r,h,g)=>{let w=o(r),S=o(h);const C=s[r]^s[h]^g;return w===S?C===0:(i[w]<i[S]&&([w,S]=[S,w]),f[S]=w,s[S]=C,i[w]===i[S]&&i[w]++,!0)},d=new Map,M=[],I=new Map,q=a*3,T=q*q<=Number.MAX_SAFE_INTEGER,L=(r,h)=>T?r*q+h:`${r},${h}`,v=(r,h)=>{const g=r.map((S,C)=>Math.round((S-t.bounds.min[C])/l)).join(",");let w=d.get(g);return w===void 0&&(w=d.size,d.set(g,w),M.push(h)),w};for(let r=0;r<a;r++){r%2048===0&&await n();const h=X(t,r);if(F(Y(P(h[1],h[0]),P(h[2],h[0])))<=l*l)continue;const g=h.map((w,S)=>v(w,r*3+S));if(new Set(g).size===3){u[r]=1;for(let w=0;w<3;w++){const S=g[w],C=g[(w+1)%3],m=S<C,b=m?L(S,C):L(C,S),U=I.get(b);if(U===void 0)I.set(b,(r+1)*(m?1:-1));else{if(U===0||!p(r,Math.abs(U)-1,+(U>0===m)))return c;I.set(b,0)}}}}const j=r=>{const h=M[r];return[0,1,2].map(g=>tt(t,Math.floor(h/3),h%3*3+g))},x=[];for(const[r,h]of I)if(h!==0){const g=typeof r=="number"?[Math.floor(r/q),r%q]:r.split(",").map(Number),w=j(g[0]),S=j(g[1]);x.push({p:w,q:S,face:h,bounds:jt([...w,...S])}),x.length%2048===0&&await n()}d.clear(),I.clear(),M.length=0;let E=!1;if(x.length){const r=Math.max(l,Math.min(1e-5,e)),h=$t(x,x.map((g,w)=>w));for(let g=0;g<x.length;g++){g%128===0&&await n();const w=x[g],S=P(w.q,w.p),C=F(S),m=bt(S),b=[];for(const H of yt(h,w.bounds,r)){if(g===H)continue;const ot=x[H],nt=P(ot.p,w.p),Tt=P(ot.q,w.p),$=z(nt,m),O=z(Tt,m),k=Math.max(0,Math.min($,O)),J=Math.min(C,Math.max($,O));if(J-k<=l)continue;const Mt=Math.max(F(ft(nt,m,-$)),F(ft(Tt,m,-O)));if(Mt>r)continue;const R=O>$==(w.face>0==ot.face>0);if(!p(Math.abs(w.face)-1,Math.abs(ot.face)-1,Number(R)))return c;Mt>l&&(E=!0),b.push([k,J])}b.sort((H,ot)=>H[0]-ot[0]);let U=0;for(const[H,ot]of b){if(Math.abs(H-U)>l)return c;U=ot}if(Math.abs(U-C)>l)return c}}const _=new Float64Array(a),N=new Float64Array(a),A=t.bounds.min.map((r,h)=>(r+t.bounds.max[h])/2);for(let r=0;r<a;r++){if(r%2048===0&&await n(),!u[r])continue;const h=o(r),g=X(t,r);_[h]+=(s[r]?-1:1)*z(P(g[0],A),Y(P(g[1],A),P(g[2],A)))/6,N[h]+=F(Y(P(g[1],g[0]),P(g[2],g[0])))/2}let y=0;for(let r=0;r<a;r++){if(N[r]&&Math.abs(_[r])<=l*N[r])return c;y+=Math.abs(_[r])}return{closed:y>0,approximate:E}}function hn(t,n,e){const l=P(n[1],n[0]),a=P(n[2],n[0]),c=Y(l,a),f=F(c);if(f<1e-20||Math.abs(z(P(t,n[0]),c))/f>e)return!1;const i=P(t,n[0]),s=z(l,l),u=z(l,a),o=z(a,a),p=z(i,l),d=z(i,a),M=s*o-u*u;if(Math.abs(M)<1e-30)return!1;const I=(p*o-d*u)/M,q=(d*s-p*u)/M,T=e/Math.max(F(l),F(a),e);return I>=-T&&q>=-T&&I+q<=1+T}function Ot(t,n,e,l){for(const a of yt(e,{min:t,max:t},l))if(hn(t,X(n,a),l))return!0;return!1}const xt=t=>t.closed||t.interior==="winding";function Dt(t,n,e,l=!1){const a=f=>{if(f.moment)return f.moment;const i=[0,0,0];if(f.ids)for(const s of f.ids){const u=X(n,s),o=Y(P(u[1],u[0]),P(u[2],u[0]));for(let p=0;p<3;p++)i[p]+=o[p]/2}else{const s=a(f.left),u=a(f.right);for(let o=0;o<3;o++)i[o]=s[o]+u[o]}return f.moment=i},c=f=>{const i=f.min.map((d,M)=>(d+f.max[M])/2),s=P(i,t),u=F(s),o=F(P(f.max,f.min))/2;if(!l&&u>o*10&&u>0)return z(a(f),s)/(u*u*u);if(!f.ids)return c(f.left)+c(f.right);let p=0;for(const d of f.ids){const M=X(n,d),I=P(M[0],t),q=P(M[1],t),T=P(M[2],t),L=F(I),v=F(q),j=F(T);!L||!v||!j||(p+=2*Math.atan2(z(I,Y(q,T)),L*v*j+z(I,q)*j+z(q,T)*L+z(T,I)*v))}return p};return c(e)/(4*Math.PI)}async function mn(t,n,e){const l=gt(t),a=s=>!Ot(s,t,n,l)&&Math.abs(Dt(s,t,n))>.9,c=t.bounds.min.map((s,u)=>(s+t.bounds.max[u])/2);if(a(c))return!0;const f=lt(t),i=Math.max(1,Math.ceil(f/32));for(let s=0;s<f;s+=i){await e();const u=X(t,s),o=bt(Y(P(u[1],u[0]),P(u[2],u[0])));if(!o)continue;const p=[0,1,2].map(M=>(u[0][M]+u[1][M]+u[2][M])/3),d=Math.max(l*8,Math.min(F(P(u[0],u[1])),F(P(u[1],u[2])),F(P(u[2],u[0])))*.01);if(a(ft(p,o,d))||a(ft(p,o,-d)))return!0}return!1}function vt(t,n,e,l){if(!xt(n)||t.some((p,d)=>p<n.bounds.min[d]-l||p>n.bounds.max[d]+l)||Ot(t,n,e,l))return!1;if(n.interior==="winding"){const p=Math.abs(Dt(t,n,e));return Math.abs(p-.5)<.05?Math.abs(Dt(t,n,e,!0))>.5:p>.5}const a=[1,.371390676,.52999894],c=F(P(n.bounds.max,n.bounds.min))*3+1,f=ft(t,a,c),i=[],s=jt([...t,...f]);for(const p of yt(e,s,l)){const d=qt(t,f,X(n,p),l);if(d){const M=F(P(d,t));M>l&&i.push(M)}}i.sort((p,d)=>p-d);let u=0,o=-1/0;for(const p of i)p-o>l*2&&(u++,o=p);return u%2===1}const Ft=t=>/отвод|тройник|муфт|фитинг|elbow|fitting|tee\\b/i.test(t.name);async function dn(t,n){if(Ft(t))return;const e=lt(t),l=Math.max(1,Math.ceil(e/4096)),a=t.bounds.min.map((y,r)=>(y+t.bounds.max[r])/2),c=[],f=[];for(let y=0;y<e;y+=l){y%(l*256)===0&&await n();const r=X(t,y),h=Y(P(r[1],r[0]),P(r[2],r[0])),g=F(h);g&&(c.push(...r),f.push({n:h.map(w=>w/g),area:g}))}if(c.length<12)return;let i=St(c,a)[0];const s=f.filter(({n:y})=>Math.abs(z(y,i))<.2);if(s.length<4)return;const u=St(s.map(({n:y})=>y),[0,0,0])[2];if(Math.abs(z(u,i))<.98)return;i=u;const o=i.map(Math.abs).indexOf(Math.max(...i.map(Math.abs)));i[o]<0&&(i=i.map(y=>-y));const p=Math.abs(i[0])<.7?[1,0,0]:[0,1,0],d=bt(Y(i,p)),M=Y(i,d),I=[1/0,1/0,1/0],q=[-1/0,-1/0,-1/0];for(const y of c)for(const[r,h]of[i,d,M].entries()){const g=z(P(y,a),h);I[r]=Math.min(I[r],g),q[r]=Math.max(q[r],g)}const T=q[0]-I[0],L=Math.max(q[1]-I[1],q[2]-I[2]),v=Math.min(q[1]-I[1],q[2]-I[2]);if(v<=gt(t)*8||T+gt(t)<L*4||L>v*4)return;let j=0,x=0;const E=new Set;for(const{n:y,area:r}of f){const h=Math.abs(z(y,i));x+=r,(h<.015||h>.999)&&(j+=r),h<.015&&E.add(y.map(g=>Math.round(g*100)).join(","))}if(j<x*.995)return;const _=[];for(let y=0;y<c.length;y+=3){const r=c.slice(y,y+3).map(h=>z(P(h,a),i));_.push([Math.min(...r),Math.max(...r)])}_.sort((y,r)=>y[0]-r[0]);let N=I[0];for(const[y,r]of _){if(y>N+gt(t)*4)return;N=Math.max(N,r)}const A=ft(ft(a,d,(I[1]+q[1])/2),M,(I[2]+q[2])/2);return{axis:i,centre:A,from:I[0],to:q[0],width:L,round:E.size>=6&&L<v*1.2,sampled:l>1}}async function pn(t,n){if(Ft(t)||!/кабел|труб|cable|pipe/i.test(t.name))return[];const e=gt(t),l=[],a=new Map,c=new Map,f=v=>{const j=v.map((E,_)=>Math.round((E-t.bounds.min[_])/e)).join(",");let x=a.get(j);return x===void 0&&(x=l.length,l.push(v),a.set(j,x)),x};for(let v=0;v<lt(t);v++){v%1024===0&&await n();const j=X(t,v).map(f);for(let x=0;x<3;x++){const E=Math.min(j[x],j[(x+1)%3]),_=Math.max(j[x],j[(x+1)%3]);E!==_&&c.set(`${E},${_}`,[E,_,F(P(l[E],l[_]))])}}const i=[...c.values()].map(v=>v[2]).filter(v=>v>e).sort((v,j)=>v-j);if(!i.length)return[];const s=i[Math.floor(i.length*.1)]*1.25,u=Int32Array.from({length:l.length},(v,j)=>j),o=v=>{for(;u[v]!==v;)u[v]=u[u[v]],v=u[v];return v};let p=0;for(const[v,j,x]of c.values())++p%4096===0&&await n(),x<=s&&(u[o(j)]=o(v));const d=new Map;for(let v=0;v<l.length;v++){const j=o(v),x=d.get(j);x?x.push(l[v]):d.set(j,[l[v]])}const M=new Map;for(const[v,j]of d){if(await n(),j.length<6||j.length>256)continue;const x=j[0],E=[0,1,2].map(y=>x[y]+j.reduce((r,h)=>r+h[y]-x[y],0)/j.length),_=j.map(y=>F(P(y,E))),N=Math.max(..._),A=St(j,E)[2];!A||N<=e||Math.min(..._)<N*.88||j.some(y=>Math.abs(z(P(y,E),A))>Math.max(e*16,N*.002))||M.set(v,{centre:E,radius:N,normal:A})}const I=new Map;for(const[v,j]of c.values()){++p%4096===0&&await n();const x=Math.min(o(v),o(j)),E=Math.max(o(v),o(j));if(x===E||!M.has(x)||!M.has(E))continue;const _=`${x},${E}`,N=I.get(_);N?N.count++:I.set(_,{a:x,b:E,count:1})}const q=new Map;for(const{a:v,b:j,count:x}of I.values()){const E=M.get(v),_=M.get(j),N=bt(P(_.centre,E.centre));x<6||!N||Math.min(E.radius,_.radius)<Math.max(E.radius,_.radius)*.8||Math.abs(z(N,E.normal))<.5||Math.abs(z(N,_.normal))<.5||(q.set(v,[...q.get(v)||[],j]),q.set(j,[...q.get(j)||[],v]))}const T=new Set,L=[];for(const[v,j]of q){if(j.length!==1||T.has(v))continue;let x=v,E=-1;const _=[];for(;!T.has(x);){T.add(x);const N=q.get(x)||[];if(N.length>2)break;const A=N.find(w=>w!==E);if(A===void 0||T.has(A))break;const y=M.get(x),r=M.get(A),h=P(r.centre,y.centre),g=F(h);g>e&&_.push({axis:h.map(w=>w/g),centre:y.centre,from:0,to:g,width:Math.max(y.radius,r.radius)*2,round:!0,sampled:!0}),E=x,x=A}_.length&&L.push(_)}return L}async function gn(t,n){const e=lt(t),l=Int32Array.from({length:e},(s,u)=>u),a=new Uint8Array(e),c=new Map,f=gt(t),i=s=>{for(;l[s]!==s;)l[s]=l[l[s]],s=l[s];return s};for(let s=0;s<e;s++){s%2048===0&&await n();for(const u of X(t,s)){const o=u.map((I,q)=>Math.round((I-t.bounds.min[q])/f)).join(","),p=c.get(o);if(p===void 0){c.set(o,s);continue}let d=i(s),M=i(p);d!==M&&(a[d]<a[M]&&([d,M]=[M,d]),l[M]=d,a[d]===a[M]&&a[d]++)}}for(let s=0;s<e;s++)l[s]=i(s);return l}async function Mn(t,n,e,l,a){const{axis:c,centre:f}=t,i=Math.abs(c[0])<.7?[1,0,0]:[0,1,0],s=bt(Y(c,i)),u=Y(c,s),o=[1/0,1/0,1/0],p=[-1/0,-1/0,-1/0],d=gt(n);for(let x=0;x<lt(n);x++){x%2048===0&&await l();for(const E of X(n,x))for(const[_,N]of[c,s,u].entries()){const A=z(P(E,f),N);o[_]=Math.min(o[_],A),p[_]=Math.max(p[_],A)}}if(p[1]-o[1]<t.width*2.5||p[2]-o[2]<t.width*2.5)return[];const M=Math.max(1,p[0]-o[0]),I=ft(f,c,o[0]-M),q=ft(f,c,p[0]+M),T=[];let L=0;for(const x of yt(e,jt([...I,...q]),d)){++L%256===0&&await l();const E=qt(I,q,X(n,x),d);E&&T.push({triangle:x,at:z(P(E,f),c)})}if(T.length<2)return[];const v=await a(),j=new Map;for(const x of T){const E=v[x.triangle],_=j.get(E);_?(_[0]=Math.min(_[0],x.at),_[1]=Math.max(_[1],x.at)):j.set(E,[x.at,x.at])}return[...j].map(([x,[E,_]])=>({part:x,from:Math.max(t.from,E),to:Math.min(t.to,_)})).filter(({from:x,to:E})=>E-x>d)}async function yn(t,n,e,l,a){let c=0;const f=gt(n);for(const i of t){let s=0;const u=new Map;for(const o of i){await l();for(const p of await Mn(o,n,e,l,a)){const d=u.get(p.part)||[];d.push([s+p.from-o.from,s+p.to-o.from]),u.set(p.part,d)}s+=o.to-o.from}for(const o of u.values()){o.sort((M,I)=>M[0]-I[0]);let p=o[0][0],d=o[0][1];for(const[M,I]of o.slice(1))M<=d+f*4?d=Math.max(d,I):(c=Math.max(c,d-p),p=M,d=I);c=Math.max(c,d-p)}}return c>f?c*1e3:void 0}async function xn(t,n,e,l,a){const c=n.precision/1e3;if(!Number.isFinite(c)||c<=0)throw Error("Точность расчёта должна быть положительным числом.");const f=t.filter(m=>n.includeHidden||!m.hidden),i=f.filter(m=>Lt(m,n.a)),s=f.filter(m=>Lt(m,n.b));if(!i.length||!s.length){const m=i.length?"Б":"А",b=i.length?n.b:n.a;throw Error(`Выбор ${m}: ${on(t,b,n.includeHidden)}`)}let u=performance.now();const o=async()=>{if(l())throw Error("Расчёт отменён. Предыдущие результаты сохранены.");performance.now()-u>16&&(await new Promise(m=>setTimeout(m,0)),u=performance.now())},p=new Map,d=m=>{let b=p.get(m.id);return b||(b=Ut(m,Array.from({length:lt(m)},(U,H)=>H)),p.set(m.id,b)),b},M=new Map,I=new Map,q=new Map,T=async m=>{let b=q.get(m.id);return b||(b=await pn(m,o),q.set(m.id,b)),b},L=new Map,v=async m=>{let b=L.get(m.id);return b||(b=await gn(m,o),L.set(m.id,b)),b},j=async m=>(I.has(m.id)||I.set(m.id,await dn(m,o)),I.get(m.id)),x=async m=>{if(n.type!=="intersection")return m;let b=M.get(m.id);return b===void 0&&(b=await un(m,o,c),!b.closed&&await mn(m,d(m),o)&&(b={closed:!1,approximate:!0,winding:!0}),M.set(m.id,b)),b.winding?{...m,closed:!1,interior:"winding"}:b.closed===m.closed?m:{...m,closed:b.closed}},E=new Map,_=async m=>{let b=E.get(m.id);if(b!==void 0)return b;const U=[];for(let H=0;H<lt(m);H++)U.push([0,3,6].map(ot=>[0,1,2].map(nt=>Math.round(tt(m,H,ot+nt)/c)).join(",")).sort().join(";")),H%9e3===0&&await o();return b=U.sort().join("|"),E.set(m.id,b),b},N=[],A=new Set(i.map(m=>m.id)),y=new Set(s.map(m=>m.id)),r=$t(s,s.map((m,b)=>b)),h=new Map;let g=0;const w=m=>m.triangles.byteLength+(m.vertices?.byteLength||0)+(m.indices?.byteLength||0)+lt(m)*32;async function S(m,b){if(!a)return m;let U=h.get(m.id);if(U)return h.delete(m.id),h.set(m.id,U),U;for(const[H,ot]of h)H!==b&&g>96*1024*1024&&(h.delete(H),g-=w(ot),p.delete(H),L.delete(H),q.delete(H),E.delete(H));return U=await a(m.id),h.set(m.id,U),g+=w(U),U}let C=-1/0;for(let m=0;m<i.length;m++){const b=i[m];performance.now()-C>150&&(C=performance.now(),e({phase:"Проверка пар",done:m,total:i.length,found:N.length}));const U=[...yt(r,b.bounds,c)];for(let H=0;H<U.length;H++){const ot=U[H];performance.now()-C>150&&(C=performance.now(),e({phase:`Проверка пар · A ${m+1}/${i.length} · кандидаты ${H+1}/${U.length}`,done:m,total:i.length,found:N.length}));const nt=s[ot];if(await o(),b.id===nt.id||!Et(b.bounds,nt.bounds,c)||n.ignoreSameModel&&b.modelId===nt.modelId||n.ignoreSameGroup&&b.modelId===nt.modelId&&b.properties.Объект&&b.properties.Объект===nt.properties.Объект||n.equalProperty&&b.properties[n.equalProperty]!==void 0&&b.properties[n.equalProperty]===nt.properties[n.equalProperty]||b.id>nt.id&&A.has(nt.id)&&y.has(b.id))continue;const Tt=sn(b.id,nt.id),$=await x(await S(b)),O=await x(await S(nt,b.id));let k,J="surface",Mt=0,R,Jt,Pt,Rt;if(n.type==="duplicates"){if(lt($)!==lt(O)||$.bounds.min.some((ut,st)=>Math.abs(ut-O.bounds.min[st])>c||Math.abs($.bounds.max[st]-O.bounds.max[st])>c))continue;await _($)===await _(O)&&(k=$.bounds.min.map((ut,st)=>(ut+$.bounds.max[st])/2),J="duplicate")}else{const ut=d($),st=d(O),bn=Math.max(1,...$.bounds.min.map(Math.abs),...$.bounds.max.map(Math.abs),...O.bounds.min.map(Math.abs),...O.bounds.max.map(Math.abs)),at=Math.max(1e-10,bn*Number.EPSILON*64),ht={min:$.bounds.min.map((B,Q)=>Math.max(B,O.bounds.min[Q])),max:$.bounds.max.map((B,Q)=>Math.min(B,O.bounds.max[Q]))},Yt=ht.min.map((B,Q)=>(B+ht.max[Q])/2),_t=new cn,Z=[];let zt=1,vn=0,Zt=1/0,In=0;for(const[B,Q]of pt(ut,st,c)){const ct=X($,B),mt=X(O,Q);if(!Et(jt(ct.flat()),jt(mt.flat()),c))continue;const et=fn(ct,mt,at,n.touching);if(et){const wt=F(P(et,Yt));if((!k||wt<Zt)&&(k=et,Zt=wt),_t.add(ct),_t.add(mt),vn++%zt===0&&(rn(ct,mt,at,Z),Z.length||Z.push(et),Z.length>=8192)){for(let dt=0;dt*2<Z.length;dt++)Z[dt]=Z[dt*2];Z.length=Math.ceil(Z.length/2),zt*=2}}++In%256===0&&(performance.now()-C>150&&(C=performance.now(),e({phase:`Геометрия пары · A ${m+1}/${i.length}`,done:m,total:i.length,found:N.length})),await o())}if(!k&&xt($)&&xt(O)){const B=Yt;vt(B,$,ut,at)&&vt(B,O,st,at)&&(k=B,J="contained")}if(!k){for(const[B,Q,ct]of[[$,O,st],[O,$,ut]])if(xt(Q)){for(let mt=0;mt<lt(B)&&!k;mt++){const et=X(B,mt),wt=et[0].map((dt,At)=>(et[0][At]+et[1][At]+et[2][At])/3);for(const dt of[et[0],wt])if(vt(dt,Q,ct,at)){k=dt,J="contained";break}await o()}if(k)break}}if(k){const B=(D,K)=>[...yt(K,ht,c)].filter(it=>Et(jt(X(D,it).flat()),ht,c)),Q=B($,ut),ct=B(O,st);J!=="surface"&&(_t.addFrom($,Q),_t.addFrom(O,ct)),await o();const mt=ht.min.map((D,K)=>(D+ht.max[K])/2),et=(D,K)=>D===0?vt(K,$,ut,at):vt(K,O,st,at),wt=(D,K)=>D===0?vt(K,$,ut,at)||Ot(K,$,ut,at):vt(K,O,st,at)||Ot(K,O,st,at);if(J==="contained"){const D=Math.max(1,Math.ceil((Q.length+ct.length)/4096));zt=Math.max(zt,D);const K=new Set;for(const[it,G,W]of[[$,Q,1],[O,ct,0]]){for(let V=0;V<G.length;V+=D){V%(D*32)===0&&await o();for(const rt of X(it,G[V])){const It=rt.join(",");K.has(It)||(K.add(It),wt(W,rt)&&Z.push(rt))}}K.clear()}if($.interior==="winding"||O.interior==="winding"){const it=(G,W)=>{let V=1,rt=0;for(;G;G=Math.floor(G/W))V/=W,rt+=V*(G%W);return rt};for(let G=1;G<=2048;G++){G%16===0&&await o();const W=[2,3,5].map((V,rt)=>ht.min[rt]+it(G,V)*(ht.max[rt]-ht.min[rt]));et(0,W)&&et(1,W)&&Z.push(W)}}}const dt=(D,K,it)=>xt($)&&xt(O)&&it.every(G=>{const W=ft(G,D,K-z(G,D));return!wt(0,W)||!wt(1,W)}),At=()=>[0,1,2].map(D=>Z.reduce((K,it)=>K+it[D],0)/Z.length),Bt=J==="surface"&&Z.length>2?St(Z,At())[2]:void 0,Ct=Bt?Xt($,O,Q,ct,[Bt],[],ht,At(),Z,at,et):void 0,Qt=!Ct||Ct.width>at,Vt=!Qt&&!!Ct?.approximate,kt=!xt($)||!xt(O);if(!kt&&!Qt&&!Vt&&(J="touch"),J==="touch"&&!n.touching)continue;const{zones:jn,crowded:qn}=ln(Z,ht,c,dt),Sn=_t.values();let Nt=0,tn=!Vt,nn=qn||zt>1||!!Ct?.approximate||!!M.get($.id)?.approximate||!!M.get(O.id)?.approximate;for(const D of J==="touch"?[]:jn){const K=D.limits.length?Q.filter(V=>Wt($,V,D.limits)):Q,it=D.limits.length?ct.filter(V=>Wt(O,V,D.limits)):ct,G=D.hits.length?[0,1,2].map(V=>D.hits.reduce((rt,It)=>rt+It[V],0)/D.hits.length):mt,W=Xt($,O,K,it,D.hits.length>2?St(D.hits,G):[],Sn,ht,G,D.hits,at,et,J==="contained");W.thin&&(tn=!1),W.approximate&&(nn=!0),W.width>Nt&&(Nt=W.width),await o()}if(Nt*=1e3,J==="touch"?R=void 0:kt?R="unmeasurable":Nt<=0||!tn?R="tolerance":nn&&(R="approximate"),Mt=J==="touch"||R==="unmeasurable"||R==="tolerance"?0:Nt,J!=="touch"&&!Ft($)&&!Ft(O)){const D=await j($),K=await j(O);for(const[it,G,W,V,rt]of[[D,$,O,K,st],[K,O,$,D,ut]]){if(V?.round&&/труб|pipe/i.test(W.name))continue;const It=it?[[it]]:await T(G);if(!It.length)continue;const Kt=await yn(It,W,rt,o,()=>v(W));Kt===void 0||Kt<=(Pt??0)||(Pt=Kt,Rt=G.id,it||(R=R||"approximate"))}Pt!==void 0&&(Jt=R==="unmeasurable"||R==="tolerance"?void 0:Mt,Mt=Math.max(Mt,Pt),(R==="unmeasurable"||R==="tolerance"||D?.sampled||K?.sampled)&&(R="approximate"))}await o()}if(k&&!en({kind:J,depth:R,penetrationMm:Mt},n.minPenetration,n.precision))continue}if(k&&(N.push({id:Tt,a:Gt($),b:Gt(O),point:k,kind:J,state:"new",note:"",assignee:"",firstSeen:"",lastSeen:"",penetrationMm:Mt,...Pt!==void 0?{axialPenetrationMm:Pt,axialElementId:Rt,overlapThicknessMm:Jt}:{},...R?{depth:R}:{}}),N.length>=5e4))throw Error("Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат.")}}return e({phase:"Готово",done:i.length,total:i.length,found:N.length}),N}let wn=0;const Ht=new Map;self.onmessage=async t=>{if(t.data.request!==void 0){const n=Ht.get(t.data.request);Ht.delete(t.data.request),t.data.error?n?.reject(Error(t.data.error)):n?.resolve(t.data.geometry);return}try{const{elements:n,check:e}=t.data,l=await xn(n,e,a=>self.postMessage({progress:a}),()=>!1,t.data.streaming?a=>new Promise((c,f)=>{const i=wn++;Ht.set(i,{resolve:c,reject:f}),self.postMessage({load:a,request:i})}):void 0);self.postMessage({results:l})}catch(n){self.postMessage({error:n instanceof Error?n.message:String(n)})}}})();\n', xe = typeof self < "u" && self.Blob && new Blob(["(self.URL || self.webkitURL).revokeObjectURL(self.location.href);", $e], { type: "text/javascript;charset=utf-8" });
function on(t) {
  let e;
  try {
    if (e = xe && (self.URL || self.webkitURL).createObjectURL(xe), !e) throw "";
    const n = new Worker(e, {
      name: t?.name
    });
    return n.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(e);
    }), n;
  } catch {
    return new Worker(
      "data:text/javascript;charset=utf-8," + encodeURIComponent($e),
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
function ye(t, e) {
  const n = URL.createObjectURL(
    new Blob([e], {
      type: t.endsWith(".html") ? "text/html;charset=utf-8" : "application/json;charset=utf-8"
    })
  ), a = document.createElement("a");
  a.href = n, a.download = t, a.click(), setTimeout(() => URL.revokeObjectURL(n), 6e4);
}
const ze = {
  unmeasurable: "не определена",
  tolerance: "требует уточнения",
  approximate: "приблизительная оценка"
}, At = (t = 0) => t > 0 && t < 0.1 ? String(Number(t.toPrecision(2))) : t.toFixed(1), te = (t, e) => e === "duplicates" ? "—" : t.kind === "touch" ? "касание" : t.depth === "approximate" ? `≈ ${At(t.penetrationMm)}` : t.depth ? ze[t.depth] : At(t.penetrationMm);
function an(t, e) {
  const n = pt;
  return `<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${n(t.name)}</title><style>body{font:14px/1.5 system-ui;margin:24px;background:#171c23;color:#e6edf5}h1{margin:0}small{color:#a9b7c8}input,select{padding:10px;margin:15px 8px 15px 0;max-width:100%;background:#242e3b;color:inherit;border:1px solid #506074;border-radius:6px}.wrap{overflow:auto}table{border-collapse:separate;border-spacing:0;width:100%}td,th{padding:10px;border-bottom:1px solid #39475a;min-width:100px;vertical-align:top;overflow-wrap:anywhere}th{background:#253142;position:sticky;top:0;text-align:left;white-space:normal}td{max-width:350px}tr[hidden]{display:none}.shot{display:block;width:260px;border:0;background:transparent;padding:0;cursor:zoom-in}dialog{width:min(94vw,1400px);border:1px solid #506074;background:#20242b;color:white;border-radius:10px}dialog img{max-width:100%;max-height:80vh;display:block;margin:12px auto}dialog::backdrop{background:#000b}.shot img{width:100%;border-radius:6px}.legend{margin:12px 0}.red{color:#ff6161}.blue{color:#65baff}@media print{input,select{display:none}body{background:white;color:black}.wrap{overflow:visible}th{position:static;background:#eee}}</style><h1>${n(t.name)}</h1><small>НашеПО · Проверки коллизий · ${n(t.lastRun || "")} · ${t.status === "stale" ? "Результат устарел" : "Последний завершённый расчёт"}</small><p>${n(t.type === "duplicates" ? "Совпадение треугольной геометрии" : "Пересечения поверхностей и вложенность замкнутых тел")}. Точность: ${n(t.precision)} мм${t.type === "intersection" ? `; минимальная глубина: ${n(t.minPenetration)} мм` : ""}. Глубина для отбора — большее из локальной толщины перекрытия и захода вдоль оси распознанного профиля в более крупную конструкцию. Для круглых кабелей и труб с поворотами измеряется самый длинный непрерывный участок восстановленной траектории внутри конструкции; такой замер имеет знак ≈. Продольный замер включает внутреннюю пустоту колодца: до конца профиля при частичном заходе, от входа до выхода при сквозном. Раздельные оболочки измеряются отдельно. Если продольный замер неприменим, используется локальная толщина. Это не расстояние перемещения, устраняющего коллизию. «Касание» — контакт без разрешённого объёмного перекрытия, с нулевой глубиной. «Не определена» — у геометрии не удалось определить внутреннюю область. «Требует уточнения» — пересечение найдено, но глубина не разрешена. Знак ≈ обозначает восстановление внутренней области повреждённой оболочки, совмещение швов, сокращённую выборку либо неполное разделение контактов. Погрешность оценки не гарантируется. Строки с неопределённой глубиной сохраняются при фильтрации; все числа, включая оценки со знаком ≈, и касания сравниваются с порогом с запасом на точность.</p><p class="legend"><span class="red">● Элемент А выделен красным</span> · <span class="blue">● элемент Б — синим</span></p><input id="search" type="search" placeholder="Поиск по всему отчёту"><select id="state"><option value="">Все состояния</option>${Object.entries(
    Ct
  ).map(([a, s]) => `<option value="${a}">${s}</option>`).join(
    ""
  )}</select>${t.type === "intersection" ? '<input id="depth" type="number" min="0" step="1" placeholder="Глубина от, мм">' : ""}<span id="count"></span><div class="wrap"><table><thead><tr>${["Снимок", "№", "Состояние", "Глубина для отбора, мм", "Толщина перекрытия, мм", "Заход вдоль оси, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "X", "Y", "Z", "Назначение", "Комментарий"].map((a) => `<th>${a}</th>`).join("")}</tr></thead><tbody>${e.map((a, s) => `<tr data-state="${a.state}" data-depth="${a.penetrationMm ?? 0}"${(a.depth === "unmeasurable" || a.depth === "tolerance") && a.kind !== "touch" ? ' data-unmeasured="1"' : ""}><td>${Jt(a.image) ? `<button class="shot" type="button"><img src="${a.image}" alt="Снимок конфликта ${s + 1}" loading="lazy"></button>` : "Снимок отсутствует"}</td>${[s + 1, Ct[a.state], te(a, t.type), a.overlapThicknessMm === void 0 ? "—" : At(a.overlapThicknessMm), a.axialPenetrationMm === void 0 ? "—" : At(a.axialPenetrationMm), a.a.name, a.a.model, a.a.guid, a.b.name, a.b.model, a.b.guid, ...a.point.map((i) => i.toFixed(4)), a.assignee, a.note].map((i) => `<td>${n(i)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><dialog id="picture"><button id="close-picture">Закрыть</button><img id="full-picture" alt="Снимок конфликта"></dialog><script>const modal=document.getElementById("picture");document.getElementById("close-picture").onclick=()=>modal.close();for(const b of document.querySelectorAll(".shot"))b.onclick=()=>{document.getElementById("full-picture").src=b.querySelector("img").src;modal.showModal()};const PREC=${Number(t.precision) || 0},q=document.getElementById('search'),s=document.getElementById('state'),d=document.getElementById('depth'),rows=[...document.querySelectorAll('tbody tr')];function filter(){let n=0;for(const r of rows){r.hidden=!!((s.value&&r.dataset.state!==s.value)||(d&&!r.dataset.unmeasured&&Number(r.dataset.depth)+PREC<Number(d.value||0))||!r.textContent.toLowerCase().includes(q.value.toLowerCase()));if(!r.hidden)n++}document.getElementById('count').textContent='Коллизий: '+n}q.oninput=s.onchange=filter;if(d)d.oninput=filter;filter()<\/script></html>`;
}
function sn(t, e) {
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
          clashes: e.map((n, a) => ({
            id: n.id,
            name: `Конфликт ${a + 1}`,
            distance: t.type === "duplicates" ? "" : n.depth || n.kind === "touch" ? te(n, t.type) : `${At(n.penetrationMm)} мм`,
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
            elements: [n.a, n.b].map((s) => ({
              guid: s.guid,
              id: s.id,
              source: s.model,
              name: s.name,
              properties: s.properties
            })),
            properties: {
              Проверка: t.name,
              Вид: n.kind,
              "Глубина для отбора, мм": te(n, t.type),
              ...n.axialPenetrationMm !== void 0 ? {
                "Толщина перекрытия, мм": n.overlapThicknessMm === void 0 ? "—" : At(n.overlapThicknessMm),
                "Заход вдоль оси, мм": At(n.axialPenetrationMm)
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
const rn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAydpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAzIDc5Ljk2OTBhODdmYywgMjAyNS8wMy8wNi0yMDo1MDoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDZFQkU2NEQ4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDZFQkU2NEM4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI2LjExIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRENDVBNjQzODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRENDVBNjQ0ODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+pHX+ogAAD+lJREFUeNrsnXtwVPUVx2/CZvMgQEhCSAwJJDzDqwgodCq08hAr7wpSo1M6o/5Rq6NUcdqp1XamdjqOY6mvWhWnttZpRRtbaRGpMMKMZlB8gaFaQoQQSEhIQt7hkfTzhY1ulnt37929mw1T7sxls3vv/f3O7/zO43vO7/wucd3d3calI/zDo3927txpnDx5MqaEpKenpyUlJWUlJCQM6+rqSm1vb/fyGRcfH9+dkpLSGRcX13Lq1Knajo6Omvr6+ia+x4zWtLQ0Y86cOee/SAKLiopiyjwYlz5ixIhyPk8PGDBAKnHB6fF4unU9Ly+vDCanxpLeqVOnnuObznj9kJycHFMGwpRrjh8/Xoh0ec6ePWt6z5kzZwxdr62tLcrPz786lvT68ys+1jYEaTJQx+tRT1v3w0QDabweSe0XNjDmDBwyZEh6U1PTPCfPtLS0LOK5QZcYyDF48OAFjY2N6U6eaWhoyIaBc//vGSg1RIXXSC2dHG1tbYbX610dS08cUwYmJiYa2dnZWRMmTFiO9C0Ipw3UfgnoYfHw4cMzYWZscWAEeChj2LBha8CQm+vq6g6D26xnKj5eWC+dZ67l71VI0dxDhw5lYM/C6vvYsWMZzc3Nm4cOHVo7atSot/Hem6DjzRMnTjQGCw4k9RkZGYWYgGtrampeZCKaIuKgOps+fbrj55AgwYmPkabunJyceqThEaQhT4wKJPiyyy4bx/VHgStVQABTnBfpCdjuhp7D9PMw9BQGemnRBc0FXP8tdDaKbhj/Hn+Pdjr2WbNmfYkDw2IgjJgDMdX+A1DEwG8nUEsNYJTUSp98fzIrK6tF16PBuMBT/cCUk/T7Gz5HiI7c3NwxfN8gxgXSweRWcv3KPmOgQG9mZmaz1QAUScDIhvHjx/8Zgmsx9GExAjXrLigo6Ebrw2YkdBwdN26c6GgKNoGYoXoioblRZyAqsoDOWqMlOVJDbKQY10Zf3VJ3feo7Nuvc92hJsqQWJn7DKQNtOxHEfCZw4xVCqRS3PNigQYMEpCv5/BBJfa+zs3MfElyB1D1RWlp6le45fPiwMXv27D2o4p04ikI+p0D4FTiQaXjw3HCdUOCBQxmMxJZgdubhoPa56kRQ2REw8LAbMy3jjRmoxiY9VVhYuABmDRKs6TnGjBlTTNKg1zP6zu83+sMgVHwwTmAhpuIZJKcWxroiibT1OTRluabCqampKajQO5ESBmCWOn6GF7wLdckyi2WZpALOBrPn9TsGv8AMliA52UzIj5iYA+onUloZ778xJ4muMBD1SoGwzyIhiIE3MMCfgNks01AQrLTa1mDt6LruC5JTHEI/D8ppRELvyJEjPxo4cKDXNScyevTomwPVyq668uxmGDg2VNg1ceLEO0JhRF2HiT8M1o76ob8izMO2cNRajoxnV7rqhZFCL7OyzwkhOIcuIMRPmUk70GgCxrvFTrvc18z940O1iekZgH38JbQ7Vd/3oHmA6zAGSbrJrhTidFox8KsCo5IgA93pZJCo6ds8F28nWQFDbka1OxxI34qo4EBmMgGmfBqKCHCiJGS+HQQgdUN175OqOzUNPLfeTjZG9+C8FsPEdhvS9z7SFx81II0UrglmpyCykxn8tl0IhVmYisFvDxP4tsOYqXb7gjkrMStnrNqDcWe5Z4lTIO0onQWQbfAt+lxwyNYRRfzg4MGDW2wmUhOQpGcBsElhAt8kJvNZtWPn/i+++KIE03K31fqPxqXxRS0bIxVmhj62in9xGE9pfcOu6k6aNOnBSMGvnqedB+wmVpVYgM4XrMJBNOxd7GB0VJhI4HtWtgpV2oskpNhcwjRwGt/CVp5yI3JQO7T3TbVr5wCLDiHaOGDlRGDid1yPhQVjWFa8j1jVbFFI4n8Xeck2q0Qqz3tQ78kQOI+k6yLWNOYQUycYLhxqBwncgj3dRV9bSdRuJ0beS6x81izBS98nsdXr8OL/CIyjtVQAU36MOXqttbW1yzUVxjEs1eyYzRoq8XJgSl2xKjnATKR2Cd7ycWZ1H/any40wK1S4qH7UH/0+pv5Fh3+s3UPf2LFj/2nWhnAjaONq1yRQdo2ZvUWzY5LSbyeNvl5runQcx/ciZk+dL2J2Z2PohyEJfbY+cfr0aYOlhTjOSXydBE13oiG12O5Svm9FqnYgnWWiCfru4fpC/u6lCbpGaH0ra887tJgf8ZoI4p6Lei40U01sz9sQlE9m5A6YOB9mToFpHruL5NE+xAzOYfy5FC1ZygSfAf7sxQa+hfS8zue7e/bsmRuo6jD3OmxlJuahLmIVRtRvCfSWwoL8LuDZKpEPN+scq1P04vTOJWo1jkBs60uffTdiFZaU4SCuC5QoPJ9x5MgRgwqqFOMiPDRwLcZxJgsXajxK3Bp+5SOYLgUEfwlrXRj9V6NDMcSrUdG5JoDa6C+1KYYLi/tmBU2Yo4WMfwVOaYj4EdQGqgHdhN6nq2QCyVuB07imoqIiB8N7wUMwtWvmzJmf7Nq1a1qwteCLgXkzZswo271798TAa0ePHs2BiSX4gCqY+CYOpYTvu6hNbOzFcH1ZsmTJdFz/CyQBjuFF7YDXJmZnFHZix8Vk+wJP6H9r8uTJExTDh7oX3KhEaxWQ7vnly5dP7RWJFBcXb3TSMThpr5A/uTmCkPyai5F5ohu4kqcYnr/LnTy7du3ax3slE3ASmU5EH3Uvl+qyenUYULrWt3Z70RyiV3RXV1dX+szXQSfPo85ZvZwIbj3DSQPcXynQqoPsyxuk0H9mNxaN9SE6off+8vLyN3rANzb/iMPxD+vFQBxFooOHJbp1PQU8mkGY+BA29LX+UG4WCpZBZwn0/qrH+Yl+6K5z0g78SurFQJIEHidE0GFbYBBOjfMtGNj/9mcGApw/h85bTcLSNieT788v1+oDCXvqmc1iDHN7f2Se6BJ9otP1AksM6hm7D0j0Ud9ki6zv+xjoO1Sy0Z8O0SO6oG+PxS0pTjYc+fMr3peO73QSBnFkWon8gQMHngcvPR0MvfflITqg53eiywpMczhyovCroxcDYYpTsc6zYpDi5srKynUY69L+wECl6UWPVYZI40CrRjiMpet6MZDA+YRDHDQaMba0uoQ8HaSEbqKepTqWzKP/Y6IDejqDwJoEoEyBQ6mu/ZKBsmm45d8zU6/QYb2dXUtkKwqxKzlG8FWzg2SxYyqFqFopdFSEsI/5jGdkqLZUk0P+sA6k8VeyOF+aA49gCcXepaRzVpMYzeYmbXpZAVPnEThnmG1BIEk5kFT5FMXcweAOkxNTdI3XTQpVHYEETqMwPcFqSxfOp5Y4eDtjKYFxO5iQ4/zWOxsjQypEXn3+eIkE6ktkZoYTbC/C7W/goaGBuI9n5uNItlp5LxHOtaQY5/2SguE70ci5kLzmBdeI88WodYx/G8C7tify8nM81jhQBhem1ezfv/+PMHKnmSfGDi7TaluIiCUxxgxMDCaB0J+EMCwyzLegbSsrK3sJ4N2LeY422ijMQXS3mC2Ys3Aznhm6KtjsMgBvjBnoDSaBmKz5mKlRZhuBEJAtdrBhyEgED/Yvrb4ZF274k/243aoaIU4LD/1YArUUize93Wy1Ea3T/pttrmz1YiG6kgWY7Rbh2zKytWMtJHBAP5FA07UHnODXUM9rLFT7DSTzuCsM9AHQ58xKa/FeiXT2oJkUQrinPzCQifSYSR8e9hcsTXhM6hXlUJ+zsyZsO5mApG0hjf+Z2TVmsRjoM8dEAj3Yz4RYMpD+TRnI0oX2yS03e4Zxfsh4t7u6WxN70MmsPRJYImGcX2CKg9DHkMTEfiiBqpvxBFRTpCJhG8z2GAr3wfCHwcBnXd/uyoz9CWy03+xaVVXVNLK8v/aPjyEkAcZ6YiyBCaLD8CtTwfY9ypq2aY0149sDDt4Ulf3CkkJm817fqt0FL4SAiXejGsV+EpggCQhn4LJRlGC0UjXwAZ9t4e4Hpn+P6OjBpdB3G8y7zWwpFkfJz13rnUif4/3CEJFkhY0Ea1Dx51ixO0bebQcz73Uigb79xN1AiFIkWXt//654GqNOmD56GZO0GkQwG+8YZ3ct2qfCXl858XU8+6QZbPHdq3fUJEatQpWBeKwqVP1PVKQBqblCZWUA1dOh7tfmQhhUxjrzQwxyurygRf9iwnTdR0Bfps2HNnZ8noaWDLLRc4LtMO05abcUtBEXlQpVBnmD3c3SSNIJOlnvA+BmBd1apD4CM5QFmsd9Xoc75b08N1/Pqx2rYgCkuY2NivfzedIO3WoHIVnsOgMlfajmRw4Xrs8VOxp+WxNwNI3sNHqFoszVwIW0SOtr9LzaUXtqV+37lyHTvzY2Ot1o806oOulwtnrd4HSrvl7VxHPa/dh9+eWXf8zmmJtQp5xovSDC53hy6Odm+lMN4Ln+RYcTuu1IoaNtDkhfMrjpAbOUT4istUFx0jnnAlZMIzHhxcNVR6v4Uu3iIGr14jKcRZr6Vf92IwrjqzVfwZ+fI4Vet7wwzim+wwgPh4l5OvNRrefBWeuQjMcJATeRzWl049V78t6oagZ27gaSv3eCAIoinSTalLTEueaF8agFDP6oG0U9vm38hygPfgQH8HUcQqLd/SX+6oqj0j7muXqZBO1VhbOb1DDfl1yB9851dZsD8W4FkrNKdXJIzsBIZlemgOWDfPDZPYDXe4AjBzD+eyBmN5LzKav+lZz1fO9Ags8qq8OZjASnw7g8PrWUcAUqOhNVLVBI5tZLJBEUacX1aEiV60AaBP8OErOGDv5GB143ymz10kfOMXwdg7Ffo8IfGNSFd21BKmU2ZMA82LEkbNMggWjtVXFq1+wcePM2+l/F5H4QtRfv+HY+Lg2281F5VL0nBmhRohmNZSE5/dcRDpbAnPZghfBoVhNwZ6ERxmtP4p0ymxl6Hc+8DMhQH8hcCG7Gtj2Jqs3gvpVI1Sy+/wEC+2zfg+gQw5jAZ5DkK1lUX4lkzdTLKSRlJgmEGuzyYu7bZvTlq5/oeBqz9h9tgYCZzQDZp/htTCA4loPAfk7h+tMY6Dqne4PtnnIi9FNDP0/QT1Fg5YS+Y2sncP1ZvftGu5owSZ/oFVZGX7/6yfiq0jObmb4XIsaGqoURY2F0Nip1K+cWBtMU6Xu0tP1M0Qftbeb8PhqQFSq6EZ1imujWy9PCGbdrDDQiqxLNo8D7Rql9OMyDCfU8vwqpz+3r6tiYM9BfGrBNr4XDQJ570c47GaLNwJi+wVJwhPNls6UCI0SdCuHlpv6wRyXm71DV+ithWKPDdFYN4eEOw7j0ElrFybUsSDliBjBqGwC86RIDjfPbDLAlr9qNh+UwyOy8avXC7pgw0Gwrf18ebNjZijc+EgoK6TrQqZxyvO2xpNe/5O8cxRs3bjT6cme5yVEHJpzBZzbAPAvpSiW3l+j/nxGA75qZ6OMQf4xYvCnGr67/KvK59N9hRHb8T4ABAPaAkPNeKkdCAAAAAElFTkSuQmCC", ln = ":host{display:block;height:100%;color-scheme:dark;font:13px/1.4 Segoe UI,sans-serif;color:#dbe5f0;container-type:size}*{box-sizing:border-box}[hidden]{display:none!important}main{height:100%;min-height:260px;background:#171d25;display:flex;flex-direction:column;overflow:hidden;-webkit-user-select:none;user-select:none}button,input,select,textarea{font:inherit;color:inherit;border:1px solid #425165;border-radius:6px;background:#253140;padding:7px 9px;min-width:0}button{cursor:pointer;white-space:nowrap}button:hover{background:#354459}button:disabled{opacity:.45;cursor:default}.primary{background:#b99a38;border-color:#d0ae46;color:#111820;font-weight:600}.primary:hover{background:#e0bd51}button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid #f2c94c;outline-offset:1px}input,select,textarea{background:#111a24}input,textarea,td,dd{-webkit-user-select:text;user-select:text}input[type=checkbox]{accent-color:#e6c354;width:16px;height:16px}header{display:flex;gap:7px;align-items:center;padding:8px 12px;border-bottom:1px solid #354459;flex-shrink:0;overflow-x:auto}.brand{display:flex;gap:7px;align-items:center;margin-right:8px}.brand img{width:32px;height:32px;object-fit:contain}.brand b{font-size:17px}.brand small{font-size:10px;color:#a6b5c7}#dirty{margin-left:auto;font-size:11px;color:#cabb81;white-space:nowrap}.notice{background:#1c2735;padding:5px 12px;font-size:12px;min-height:27px;max-height:70px;overflow:auto;color:#a7bbd1}.notice.error{color:#ffaaa1;background:#412725}.workspace{display:grid;grid-template-columns:230px minmax(0,1fr);flex:1;min-height:0}aside{padding:10px;display:flex;flex-direction:column;gap:9px;border-right:1px solid #354459;min-height:0}#checks{overflow:auto;flex:1;min-height:0}.check-item{display:flex;flex-direction:column;gap:5px;width:100%;margin-bottom:5px;text-align:left;white-space:normal}.check-item small{color:#a8b7ca}.check-item.active,.tabs .active{border-color:#c7ab56;background:#403b2c;color:#ffe399}.main{display:flex;flex-direction:column;min-width:0;min-height:0}.test-toolbar{display:flex;gap:7px;padding:8px 12px;align-items:center}.test-toolbar input{flex:1;font-weight:600}.tabs{display:flex;gap:7px;border-bottom:1px solid #354459;padding:0 12px 8px}.tabs button{min-width:105px}#content{flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column}.empty{padding:28px;color:#a4b4c9;text-align:center;margin:auto}h2,h3,p{margin:0 0 10px}h2{font-size:20px}h3{font-size:15px}label{display:flex;flex-direction:column;gap:5px;font-size:12px;color:#b8c6d7}.check{flex-direction:row;align-items:center;gap:6px}small{font-size:11px;color:#a8b7c9}.parameters{display:flex;gap:18px;align-items:end;padding:10px 12px}.parameters input{width:140px}.selection-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0 12px 12px}.selection{border:1px solid #39495e;border-radius:8px;padding:12px;background:#1b2633;min-width:0}.selection h3{display:flex;justify-content:space-between}.selection h3 span{color:#92c4b2;font-size:12px}.selection select[multiple]{width:100%;min-height:70px}.selection-tools{display:flex;gap:5px;flex-wrap:wrap;margin:8px 0}.selection-tools button{font-size:11px;padding:5px 7px}.selection>label{margin-bottom:8px}.condition{display:grid;grid-template-columns:minmax(80px,1fr) 100px minmax(70px,1fr) 29px;gap:5px;margin:6px 0}.condition button{padding:3px}.rules,.report{padding:18px;max-width:850px}.rules>label{margin:14px 0}.rules>p,.report>p{color:#a9b8cb}.report>button{margin:12px 8px 14px 0}.result-tools{display:flex;gap:7px;flex-wrap:wrap;padding:8px 12px}.result-tools input{flex:1;min-width:180px}.result-area{display:grid;grid-template-columns:minmax(0,1fr) 300px;flex:1;min-height:0}.table-area{display:flex;flex-direction:column;min-width:0;min-height:0}.scroll{overflow:auto;flex:1;min-height:0}table{border-collapse:separate;border-spacing:0;width:max-content;min-width:100%}th{position:sticky;top:0;background:#2a3748;z-index:1;text-align:left;max-width:240px;white-space:normal}th,td{padding:8px;border-bottom:1px solid #344154;vertical-align:top}td{max-width:320px;min-width:90px;overflow-wrap:anywhere;-webkit-user-select:text;user-select:text}td:first-child{min-width:36px}tr.active td{background:#453e29;color:#fff0b5}tr:hover td{background:#2c3847}.pager{display:flex;gap:10px;align-items:center;justify-content:center;padding:5px;border-top:1px solid #39495e;font-size:11px}.pager button{padding:2px 8px}.detail{border-left:1px solid #354459;padding:10px;overflow:auto}.detail h3{overflow-wrap:anywhere}.detail>label{margin:10px 0}.detail p{font:11px/1.5 Consolas,monospace}.detail details{border-top:1px solid #354459;padding:8px 0}summary{cursor:pointer}dl{font-size:11px;display:grid;grid-template-columns:1fr 1fr;gap:7px}dt,dd{overflow-wrap:anywhere;margin:0}dt{color:#9baec4}footer{border-top:1px solid #354459;padding:4px 12px;display:flex;justify-content:space-between;color:#91a4bb;font-size:11px}dialog{border:1px solid #53647c;border-radius:12px;background:#202c3a;color:#dbe5f0;width:min(700px,92vw);max-height:85vh;padding:20px;box-shadow:0 15px 60px #000a}dialog::backdrop{background:#000a}dialog p{margin:12px 0}dialog a{color:#f2c94c;margin-right:12px}.dialog-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:16px}@container (max-width:950px){.workspace{grid-template-columns:185px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 240px}.selection-grid{grid-template-columns:1fr}.parameters,.test-toolbar{flex-wrap:wrap}.test-toolbar input{flex-basis:100%}}@container (max-height:400px){header{padding:5px 10px}.test-toolbar{padding:5px 10px}.tabs{padding-bottom:5px}.brand img{width:25px;height:25px}footer{display:none}}:host{font-size:12px}.brand img{background:#e1e7ef;border-radius:5px;padding:3px}.selection-tools button{font-size:12px}label{font-size:13px}.choose-layout{display:grid;grid-template-columns:220px minmax(0,1fr);min-height:0;flex:1;overflow:auto}.choose-layout .parameters{display:flex;flex-direction:column;align-items:stretch;gap:15px;border-right:1px solid #354459;justify-content:flex-start}.choose-layout .parameters input{width:100%}.choose-layout .parameters input[type=checkbox]{width:16px}.choose-layout .selection-grid{padding:10px 12px;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start;min-width:0}.selection select[multiple]{height:180px;resize:vertical}.selection-mode{font-size:12px;color:#b6c4d5}.preset-row{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:9px}.preset-row select{flex:1 1 160px}.preset-row button{padding:5px 7px;font-size:12px}.model-list{height:150px;overflow:auto;border:1px solid #425165;border-radius:6px;background:#111a24;padding:5px;margin-bottom:5px}.model-list label{display:flex;flex-direction:row;align-items:center;gap:7px;padding:4px 5px;color:#dbe5f0;overflow-wrap:anywhere}.model-list label:hover{background:#253140}.model-list .model-all{position:sticky;top:-5px;z-index:1;background:#1f2b39;border-bottom:1px solid #425165;font-weight:600}.legend{display:flex;gap:12px;flex-wrap:wrap;font-family:inherit!important}.part-a{color:#ff6161}.part-b{color:#65baff}.preview{display:block;width:100%;padding:5px;margin:8px 0}.preview img{display:block;width:100%;max-height:180px;object-fit:contain}.image-dialog{width:94vw;max-width:1500px}.image-dialog img{display:block;max-width:100%;max-height:75vh;margin:10px auto}#help-dialog{width:min(1000px,94vw);line-height:1.6}#help-dialog details{padding:12px 0;border-bottom:1px solid #425165}#help-dialog summary{font-size:16px;font-weight:600;color:#f0d27a}#help-dialog li{margin:8px 0}@container (max-width:1100px){.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .selection-grid{grid-template-columns:1fr}.condition{grid-template-columns:minmax(60px,1fr) 100px minmax(60px,1fr) 29px}}@container (max-width:700px){.choose-layout{display:block}.choose-layout .parameters{border-right:0;border-bottom:1px solid #354459}.workspace{grid-template-columns:160px minmax(0,1fr)}}button,input,select,textarea{padding:5px 7px;border-radius:5px}button{min-height:27px}input[type=checkbox]{width:14px;height:14px}.commandbar{position:relative;display:flex;gap:8px;min-height:45px;padding:5px 8px;overflow:visible;background:#131b25}.brand{flex:0 0 auto;margin-right:0;gap:5px}.brand img{width:28px;height:28px}.brand b{font-size:14px}.check-heading{display:grid;grid-template-rows:25px 12px;flex:0 1 230px;min-width:145px}.check-heading input{height:25px;border:0;background:transparent;padding:2px 5px;font-weight:600}.check-heading small{padding:0 5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:9px}.tabs{align-self:stretch;align-items:center;flex:0 0 auto;gap:3px;padding:0;border:0}.tabs button{flex:0 0 auto;min-width:0;padding:5px 9px;background:transparent;border-color:transparent}.tabs .active{background:#3e3828;border-color:#b99a38}.header-actions{display:flex;align-items:center;gap:4px;margin-left:auto}#dirty{margin-left:0;width:0;height:0;overflow:visible;font-size:0}#dirty:not(:empty){width:7px;height:7px;border-radius:50%;background:#e5bd43;box-shadow:0 0 0 2px #e5bd4328}.more-menu{position:relative;z-index:20}.more-menu summary{display:grid;place-items:center;width:29px;height:29px;border:1px solid #425165;border-radius:5px;background:#253140;cursor:pointer;list-style:none;font-size:18px}.more-menu summary::-webkit-details-marker{display:none}.more-popover{position:absolute;right:0;top:calc(100% + 5px);display:grid;width:190px;gap:3px;padding:6px;border:1px solid #506176;border-radius:7px;background:#192431;box-shadow:0 12px 35px #000a}.more-popover button{text-align:left}.notice{min-height:23px;max-height:45px;padding:3px 9px;font-size:10px}.run-progress{display:grid;grid-template-columns:minmax(150px,auto) minmax(120px,1fr) auto;align-items:center;gap:8px;min-height:24px;padding:3px 9px;border-bottom:1px solid #425165;background:#202a20;color:#d9e7d2;font-size:10px}.run-bar{width:100%;height:7px;overflow:hidden;border-radius:2px;background:#101810}.run-bar i{display:block;width:0;height:100%;background:#e3bc43}#run-phase,#run-value{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#run-value{text-align:right;color:#b9c9b3}.workspace{grid-template-columns:190px minmax(0,1fr)}aside{gap:6px;padding:7px;background:#141c26}.aside-title{font-weight:600;font-size:12px}.aside-actions{display:grid;gap:5px}.check-item{gap:2px;margin-bottom:3px;padding:6px 7px}.check-item small{font-size:9px}.main{background:#171d25}#content{overflow:hidden}.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .parameters{gap:9px;padding:8px}.choose-layout .selection-grid{gap:8px;padding:8px}.selection{padding:8px}.selection h3,h3{font-size:13px;margin-bottom:6px}label{gap:3px;font-size:11px}small,.selection-tools button,.preset-row button{font-size:10px}.model-list{height:125px}.model-list label{padding:2px 4px}.selection-tools{gap:4px;margin:5px 0}.selection-tools button,.preset-row button{padding:3px 5px;min-height:23px}.result-tools{display:flex;align-items:center;justify-content:space-between;gap:6px;flex-wrap:nowrap;min-height:38px;padding:5px 7px;border-bottom:1px solid #354459;background:#151f2a}.result-filters,.bulk-tools{display:flex;align-items:center;gap:5px;min-width:0}.result-filters{flex:1}.result-filters input[type=search]{flex:1 1 190px;min-width:120px}#result-depth{flex:0 1 125px;min-width:92px}#result-count,#selection-count{color:#9fb0c4;white-space:nowrap;font-size:10px}.bulk-tools select{max-width:125px}.result-area{grid-template-columns:minmax(0,1fr) 310px}th,td{padding:5px 6px;font-size:11px;line-height:1.25}th{max-width:190px}td{max-width:260px;min-width:76px}.pager{justify-content:flex-end;min-height:29px;padding:3px 7px}.pager #selection-count{margin-right:auto}.detail{display:flex;flex-direction:column;min-width:0;padding:0;overflow:hidden;background:#141e29}.detail-head{display:flex;align-items:center;justify-content:space-between;gap:6px;min-height:47px;padding:7px 8px 4px}.detail-head>div:first-child{min-width:0}.detail-head small{color:#8093aa;letter-spacing:.08em}.detail-head h3{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin:0}.detail-nav{display:flex;gap:3px}.detail-nav button{min-width:27px;padding:2px 7px;font-size:17px}.clash-summary{display:flex;gap:5px;padding:0 8px 5px;color:#adbdcf;font-size:9px}.clash-summary span{padding-right:5px;border-right:1px solid #405064}.clash-summary span:last-child{border:0}.detail .legend{margin:0;padding:0 8px 5px;font-size:10px}.preview-slot{height:clamp(92px,18cqh,145px);flex:0 0 auto;margin:0 7px 6px;overflow:hidden;border:1px solid #37475b;border-radius:6px;background:#0e151d}.preview{position:relative;width:100%;height:100%;margin:0;padding:0;border:0;background:transparent}.preview img{width:100%;height:100%;max-height:none;object-fit:contain}.preview span{position:absolute;right:5px;bottom:5px;padding:3px 6px;border-radius:4px;background:#101923db;font-size:9px}.preview-empty,.detail-empty{height:100%;display:grid;place-content:center;justify-items:center;gap:4px;color:#788ba1}.preview-empty>span,.detail-empty>span{font-size:24px}.detail-actions{display:grid;grid-template-columns:1fr 1fr;gap:5px;padding:0 7px 7px}.detail-scroll{flex:1;min-height:0;overflow:auto;padding:7px 8px 12px;border-top:1px solid #354459}.detail-scroll>label{margin:7px 0}.detail p{font:inherit}.coordinates{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;font:9px/1.3 Consolas,monospace;color:#91a3b7}.coordinates span{overflow:hidden;text-overflow:ellipsis}.detail details{padding:6px 0}.detail dl{font-size:10px}.detail-empty{padding:20px;text-align:center}footer{padding:2px 8px;font-size:9px}@container (max-width:1050px){.workspace{grid-template-columns:165px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 270px}.check-heading{flex-basis:185px}.tabs button{padding-inline:6px}#dirty{display:none}}@container (max-width:820px){.brand b,.brand small,#result-count{display:none}.check-heading{flex-basis:155px}.result-tools{overflow-x:auto}.result-area{grid-template-columns:minmax(0,1fr) 245px}}@container (max-height:410px){.notice,footer{display:none}.preview-slot{height:90px}}.depth-breakdown{display:grid;grid-template-columns:1fr auto;gap:4px 8px;margin-bottom:9px;font:inherit}.depth-breakdown small{grid-column:1/-1;color:#adbdcf;font:inherit}", Ft = /* @__PURE__ */ new WeakMap(), Ce = "nashepo.collisionfinder360.project.", ne = () => ({
  format: "nashepo.checks",
  version: 1,
  checks: [],
  sets: []
}), we = (t) => {
  if (!(!t || typeof sessionStorage > "u"))
    try {
      const e = sessionStorage.getItem(Ce + t);
      return e ? Ae(e) : void 0;
    } catch {
      return;
    }
}, ve = (t, e) => {
  if (!(!t || typeof sessionStorage > "u"))
    try {
      sessionStorage.setItem(
        Ce + t,
        JSON.stringify(e, (n, a) => n === "image" ? void 0 : a)
      );
    } catch {
    }
};
function cn(t, e) {
  const n = t.shadowRoot || t.attachShadow({ mode: "open" }), a = Le(t);
  let s = e.projectToken(), i = e.projectId(), o = s && (Ft.get(s) || we(i)) || ne();
  s && Ft.set(s, o);
  let r, d = o.checks[0]?.id || "", f = "select", c = "", u = 0, x = !1, y = !1, I, P = !0, F = !1;
  const R = /* @__PURE__ */ new Set();
  let D, C, j = 0;
  const N = () => o.checks.find((l) => l.id === d), m = (l) => n.querySelector("#" + l);
  n.innerHTML = `<style>${ln}</style><main><header class="commandbar"><div class="brand"><img src="${rn}" alt=""><b>НашеПО</b><small>${Ue}</small></div><div class="check-heading"><input id="name" aria-label="Имя проверки" placeholder="Выберите проверку"><small id="check-summary">Проверка не выбрана</small></div><div id="tabs" class="tabs">${[
    ["select", "Выбор"],
    ["results", "Результаты"],
    ["rules", "Правила"],
    ["report", "Отчёт"]
  ].map(([l, p]) => `<button data-tab="${l}">${p}</button>`).join(
    ""
  )}</div><div class="header-actions"><button id="scan" title="Перечитать список и геометрию выбранных моделей">↻ Модели</button><button id="run" class="primary">▶ Запустить</button><button id="cancel" hidden>Остановить</button><details class="more-menu"><summary title="Другие команды">⋮</summary><div class="more-popover"><button id="open">Открыть проверки</button><button id="save">Сохранить проверки</button><button id="copy">Копировать проверку</button><button id="delete">Удалить проверку</button><button id="settings">Настройки</button><button id="help">Справка</button></div></details></div><span id="dirty"></span></header><div id="run-progress" class="run-progress" hidden><span id="run-phase">Подготовка</span><div id="run-bar" class="run-bar" role="progressbar"><i id="run-fill"></i></div><span id="run-value"></span></div><div class="notice" id="notice" role="status">Откройте IFC/SMDX в проекте и нажмите «Модели».</div><div class="workspace"><aside><div class="aside-title">Проверки</div><input id="test-search" type="search" placeholder="Поиск проверок"><div id="checks"></div><div class="aside-actions"><button id="all">Запустить все</button><button id="new" class="primary">＋ Новая проверка</button></div></aside><section class="main"><div id="content"></div></section></div><footer><span id="model-count">Модели не прочитаны</span><span>Расчёт выполняется на вашем компьютере</span></footer><input id="file" type="file" accept=".json" hidden><dialog id="settings-dialog"><h2>Настройки</h2><label>Дистанция камеры, м<input id="distance" type="number" value="15" min="0.5"></label><p class="links"><a href="https://nashepo.ru/" target="_blank" rel="noopener noreferrer">Сайт НашеПО</a><a href="https://t.me/RoburFan" target="_blank" rel="noopener noreferrer">Telegram</a></p><button data-close="settings-dialog">Закрыть</button></dialog><dialog id="help-dialog">${De}<button data-close="help-dialog">Закрыть</button></dialog><dialog id="set-dialog"><h2>Сохранить набор моделей</h2><label>Название<input id="set-name" maxlength="120"></label><div class="dialog-actions"><button id="set-cancel">Отмена</button><button id="set-confirm" class="primary">Сохранить</button></div></dialog></main>`;
  const H = document.createElement("button");
  H.id = "clear-project", H.textContent = "Очистить проект", m("save").after(H), n.querySelector(".more-popover").addEventListener(
    "click",
    () => n.querySelector(".more-menu").removeAttribute("open")
  );
  const q = (l, p = !1) => {
    m("notice").textContent = l, m("notice").classList.toggle("error", p);
  }, S = (l, p, g, h) => {
    const M = m("run-progress"), O = m("run-bar"), k = m("run-fill");
    if (M.hidden = !1, m("notice").hidden = !0, m("run-phase").textContent = l, g && g > 0 && p !== void 0) {
      const z = Math.max(0, Math.min(100, p / g * 100));
      k.style.width = `${z}%`, O.setAttribute("aria-valuemin", "0"), O.setAttribute("aria-valuemax", "100"), O.setAttribute("aria-valuenow", String(Math.round(z))), m("run-value").textContent = `${Math.round(z)}% · ${p}/${g}` + (h === void 0 ? "" : ` · найдено ${h}`);
    } else
      k.style.width = "0", O.removeAttribute("aria-valuenow"), m("run-value").textContent = h === void 0 ? "" : `Найдено ${h}`;
    O.setAttribute("aria-valuetext", m("run-value").textContent || l);
  }, b = () => {
    m("run-progress").hidden = !0, m("notice").hidden = !1;
  }, w = async (l) => {
    try {
      await l();
    } catch (p) {
      q(p instanceof Error ? p.message : String(p), !0);
    }
  }, A = () => new Promise((l) => {
    const p = m("set-dialog"), g = m("set-name");
    let h = !1;
    const M = (O) => {
      h || (h = !0, p.close(), l(O));
    };
    g.value = "Новый набор", m("set-confirm").onclick = () => {
      const O = g.value.trim();
      O ? M(O) : g.focus();
    }, m("set-cancel").onclick = () => M(), p.oncancel = (O) => {
      O.preventDefault(), M();
    }, p.showModal(), g.focus(), g.select();
  }), E = () => {
    F = !0, m("dirty").textContent = "Есть несохранённые изменения", s && Ft.set(s, o), ve(i, o);
  }, T = () => {
    const l = e.projectToken();
    return !l || l === s ? !1 : (!s && (o.checks.length || o.sets.length) ? Ft.set(l, o) : o = Ft.get(l) || we(e.projectId()) || ne(), Ft.set(l, o), s = l, i = e.projectId(), r = void 0, d = o.checks[0]?.id || "", c = "", R.clear(), u = 0, F = !1, e.clear(), m("dirty").textContent = "", !0);
  }, U = () => {
    const l = N();
    l?.lastRun && (l.status = "stale"), E(), W();
  }, v = () => [
    ...new Set(
      (r?.elements || []).flatMap((l) => Object.keys(l.properties))
    )
  ].sort(), $ = (l, p) => l.map(
    (g) => `<option value="${pt(g)}" ${g === p ? "selected" : ""}>${pt(g)}</option>`
  ).join("");
  function Z() {
    const l = N(), p = m("result-search")?.value.toLowerCase() || "", g = m("result-state")?.value || "", h = Number(m("result-depth")?.value || 0);
    return (l?.results || []).filter(
      (M) => (!g || M.state === g) && (l?.type === "duplicates" || je(M, h, l?.precision ?? 0)) && (!p || JSON.stringify({ ...M, image: void 0 }).toLowerCase().includes(p))
    );
  }
  function W() {
    const l = m("test-search").value.toLowerCase();
    m("checks").innerHTML = o.checks.filter((p) => p.name.toLowerCase().includes(l)).map(
      (p) => `<button class="check-item ${p.id === d ? "active" : ""}" data-check="${p.id}"><strong>${pt(p.name)}</strong><small>${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[p.status]} · ${p.results.filter((g) => !["resolved", "excluded"].includes(g.state)).length} в работе / ${p.results.length}</small></button>`
    ).join("");
  }
  function at(l, p) {
    const g = r?.elements.filter(
      (L) => (N().includeHidden || !L.hidden) && Bt(L, l)
    ).length || 0, h = l.manualOnly ? st(l) : l.modelsMode === "selected" ? l.models : (r?.models || []).map((L) => L.id), M = r && h.every((L) => r.indexedModelIds.includes(L)) ? `${g} элементов` : "число после запуска", O = r?.models || [], k = l.modelsMode !== "selected", z = o.sets.map(
      (L) => `<option value="${pt(L.id)}" ${l.presetId === L.id ? "selected" : ""}>${pt(L.name)}</option>`
    ).join("");
    return `<article class="selection" data-side="${p}"><h3>Выбор ${p.toUpperCase()} <span data-selection-count>${M}</span></h3>${l.manualOnly ? '<p class="selection-mode">Только элементы, выбранные вручную</p>' : ""}<div class="preset-row"><select class="preset"><option value="">Набор моделей…</option>${z}</select><button data-selection="load-set">Применить</button><button data-selection="save-set">Сохранить набор</button><button data-selection="delete-set" ${l.presetId ? "" : "disabled"}>Удалить</button></div><div class="model-list"><label class="model-all"><input type="checkbox" class="all-models" ${k ? "checked" : ""}> Все модели</label>${O.map((L) => `<label><input type="checkbox" class="model-check" value="${pt(L.id)}" ${k || l.models.includes(L.id) ? "checked" : ""}> ${pt(L.name)}</label>`).join("") || "<small>Нажмите «Модели».</small>"}</div><small>Отметьте файлы, которые должны участвовать в выборе ${p.toUpperCase()}.</small><div class="selection-tools"><button data-selection="show">Показать выбранные элементы</button><button data-selection="only">Только выделенные в 3D</button><button data-selection="include">＋ Добавить из 3D</button><button data-selection="exclude">− Исключить из 3D</button><button data-selection="reset">Сбросить ручной выбор</button></div><small>Добавлено вручную: ${l.include.length} · исключено: ${l.exclude.length}</small></article>`;
  }
  function X() {
    W();
    const l = N();
    m("name").value = l?.name || "", m("check-summary").textContent = l ? `${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[l.status]} · ${l.results.filter((p) => !["resolved", "excluded"].includes(p.state)).length} в работе / ${l.results.length}` : "Проверка не выбрана";
    for (const p of ["name", "copy", "delete", "run"])
      m(p).disabled = !l || x;
    for (const p of n.querySelectorAll("[data-tab]"))
      p.classList.toggle("active", p.dataset.tab === f);
    if (!l) {
      m("content").innerHTML = '<div class="empty"><h2>Создайте первую проверку</h2><p>Обновите модели, затем выберите, какие элементы проверять друг с другом.</p></div>';
      return;
    }
    f === "select" && (m("content").innerHTML = `<div class="choose-layout"><div class="parameters"><h3>Параметры проверки</h3><label>Тип<select id="type"><option value="intersection" ${l.type === "intersection" ? "selected" : ""}>По пересечению</option><option value="duplicates" ${l.type === "duplicates" ? "selected" : ""}>Дублирование</option></select></label><label title="Запас при отборе и фильтрации; не обнуляет малые вхождения и не гарантирует погрешность оценки">Точность расчёта, мм<input id="precision" type="number" value="${l.precision}" min="0.001" max="100" step="0.1"></label><label title="Конфликты с меньшей оценкой глубины не попадут в результат">Минимальная глубина, мм<input id="min-penetration" type="number" value="${l.minPenetration}" min="0" max="100000" step="1" ${l.type === "duplicates" ? "disabled" : ""}></label><label class="check"><input id="touching" type="checkbox" ${l.touching ? "checked" : ""} ${l.type === "duplicates" ? "disabled" : ""}>Учитывать касания</label><small>Для отбора — большее из толщины перекрытия и захода вдоль оси профиля или трассы. Подробнее — в справке.</small><p class="legend"><span class="part-a">● Выбор А</span><span class="part-b">● Выбор Б</span></p></div><div class="selection-grid">${at(l.a, "a")}${at(l.b, "b")}</div></div><datalist id="property-fields">${$(v(), "")}</datalist>`), f === "rules" && (m("content").innerHTML = `<div class="rules"><h3>Исключение пар</h3><p>Элемент сам с собой не проверяется. Пара А/Б учитывается один раз.</p><label class="check"><input id="same-model" type="checkbox" ${l.ignoreSameModel ? "checked" : ""}>Не проверять элементы одной модели</label><label class="check"><input id="same-group" type="checkbox" ${l.ignoreSameGroup ? "checked" : ""}>Не проверять геометрию одного составного объекта</label><label>Не проверять пары с одинаковым значением свойства<input id="equal-property" list="property-fields" value="${pt(l.equalProperty)}" placeholder="Без ограничения"></label><label class="check"><input id="hidden" type="checkbox" ${l.includeHidden ? "checked" : ""}>Включать скрытые элементы прочитанных моделей</label><p>Незагруженные подключённые файлы нужно открыть перед расчётом.</p><datalist id="property-fields">${$(v(), "")}</datalist></div>`), f === "results" && (m("content").innerHTML = `<div class="result-tools"><div class="result-filters"><input id="result-search" type="search" placeholder="Поиск по результатам"><select id="result-state"><option value="">Все состояния</option>${Object.entries(
      Ct
    ).map(([p, g]) => `<option value="${p}">${g}</option>`).join("")}</select>${l.type === "intersection" ? '<input id="result-depth" type="number" min="0" step="1" placeholder="Глубина от, мм">' : ""}<button id="show-markers" role="switch" aria-checked="${P}">${P ? "● Знаки" : "○ Знаки"}</button><span id="result-count"></span></div><div class="bulk-tools"><select id="bulk-state" title="Состояние для выбранных строк">${Object.entries(
      Ct
    ).map(([p, g]) => `<option value="${p}">${g}</option>`).join("")}</select><button id="bulk">Применить</button></div></div><div class="result-area"><div class="table-area"><div class="scroll" id="table"></div><div class="pager"><span id="selection-count"></span><button id="prev-page">←</button><span id="page"></span><button id="next-page">→</button></div></div><div class="detail" id="detail"></div></div>`, G(), Q()), f === "report" && (m("content").innerHTML = `<div class="report"><h3>${pt(l.name)}</h3><p>Результатов: ${l.results.length}. Выбрано: ${R.size}. ${l.status === "stale" ? "Результаты устарели — рекомендуется повторный запуск." : ""}</p><label class="check"><input id="selected-only" type="checkbox" ${R.size ? "checked" : ""}>Только выбранные строки</label><label class="check"><input id="report-images" type="checkbox" checked>Добавить снимки (недостающие будут созданы автоматически)</label><button id="export-html" class="primary">Сформировать HTML-отчёт</button><button id="export-viewer">Сессия для плагина «Коллизии»</button><p>Правила и все результаты сохраняются кнопкой «Сохранить проверки» в верхней панели.</p></div>`), m("content").inert = x;
  }
  const $t = (l) => l.axialPenetrationMm !== void 0 ? `Для отбора используется большее значение: толщина ${l.overlapThicknessMm === void 0 ? "не определена" : At(l.overlapThicknessMm) + " мм"}; продольный заход ${At(l.axialPenetrationMm)} мм` : l.kind === "touch" ? "Тела соприкасаются, общего объёма нет" : l.depth === "unmeasurable" ? "У элемента нет собственного объёма, замер глубины к нему неприменим" : l.depth === "tolerance" ? "Пересечение найдено, но его глубина не разрешена при текущем расчёте" : l.depth === "approximate" ? "Восстановлена внутренняя область оболочки, совмещены швы либо сокращён расчёт; точность числа не гарантируется" : "Оценка локальной толщины перекрытия двух элементов";
  function G() {
    const l = N(), p = Z(), g = Math.max(1, Math.ceil(p.length / 50));
    u = Math.max(0, Math.min(u, g - 1));
    const h = p.slice(u * 50, u * 50 + 50);
    m("table").innerHTML = p.length ? `<table><thead><tr><th><input id="check-page" type="checkbox" aria-label="Выбрать страницу" ${h.every((M) => R.has(M.id)) ? "checked" : ""}></th>${["№", "Состояние", "Глубина, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "Комментарий"].map((M) => `<th>${M}</th>`).join("")}</tr></thead><tbody>${h.map((M, O) => `<tr data-result="${pt(M.id)}" class="${M.id === c ? "active" : ""}"><td><input type="checkbox" class="row-check" aria-label="Выбрать конфликт" ${R.has(M.id) ? "checked" : ""}></td>${[u * 50 + O + 1, Ct[M.state], te(M, l.type), M.a.name, M.a.model, M.a.guid || "—", M.b.name, M.b.model, M.b.guid || "—", M.note].map((k) => `<td title="${pt(k)}">${pt(k)}</td>`).join("")}</tr>`).join("")}</tbody></table>` : '<div class="empty">Нет результатов. Запустите проверку или измените фильтры.</div>', m("page").textContent = `${u + 1} / ${g}`, m("result-count").textContent = `${p.length} результатов`, m("selection-count").textContent = `Выбрано: ${R.size}`, m("prev-page").disabled = u === 0, m("next-page").disabled = u === g - 1;
  }
  function Q() {
    const l = N(), p = Z(), g = p.findIndex((M) => M.id === c), h = l?.results.find((M) => M.id === c);
    m("detail").innerHTML = h ? `<div class="detail-head"><div><small>КОЛЛИЗИЯ</small><h3>#${g + 1} ${pt(h.a.name)} × ${pt(h.b.name)}</h3></div><div class="detail-nav"><button id="previous" title="Предыдущая коллизия" ${g <= 0 ? "disabled" : ""}>‹</button><button id="next" title="Следующая коллизия" ${g < 0 || g >= p.length - 1 ? "disabled" : ""}>›</button></div></div><div class="clash-summary"><span>${l?.type === "duplicates" ? "Дублирование" : "Пересечение"}</span><span title="${pt($t(h))}">${l?.type === "duplicates" ? "Совпадение геометрии" : h.kind === "touch" ? "Касание" : h.depth ? ze[h.depth] : `Глубина ${At(h.penetrationMm)} мм`}</span><span>${pt(Ct[h.state])}</span></div><p class="legend"><span class="part-a">● Элемент А</span><span class="part-b">● Элемент Б</span></p><div class="preview-slot">${h.image ? `<button id="open-image" class="preview"><img src="${pt(h.image)}" alt="Снимок коллизии"><span>Открыть крупнее</span></button>` : '<div class="preview-empty"><span>◫</span><small>Снимок создастся после перехода в 3D</small></div>'}</div><div class="detail-actions"><button id="focus" class="primary">Перейти в 3D</button><button id="capture-image">▣ Снимок пары</button></div><div class="detail-scroll">${h.axialPenetrationMm !== void 0 ? `<div class="depth-breakdown"><span>Толщина перекрытия</span><b>${h.overlapThicknessMm === void 0 ? "—" : At(h.overlapThicknessMm) + " мм"}</b><span>Заход вдоль оси</span><b>${At(h.axialPenetrationMm)} мм</b><small>Для фильтра — большее из двух значений. Заход учитывает внутреннее пространство конструкции.</small></div>` : ""}<div class="coordinates">${h.point.map((M, O) => `<span>${["X", "Y", "Z"][O]} ${M.toFixed(3)}</span>`).join("")}</div><label>Состояние<select id="edit-state">${Object.entries(
      Ct
    ).map(
      ([M, O]) => `<option value="${M}" ${h.state === M ? "selected" : ""}>${O}</option>`
    ).join(
      ""
    )}</select></label><label>Назначение<input id="assignee" value="${pt(h.assignee)}"></label><label>Комментарий<textarea id="note" rows="2">${pt(h.note)}</textarea></label>${[
      h.a,
      h.b
    ].map(
      (M, O) => `<details><summary>Элемент ${O ? "Б" : "А"} · свойства</summary><dl>${Object.entries(
        M.properties
      ).map(([k, z]) => `<dt>${pt(k)}</dt><dd>${pt(z)}</dd>`).join("")}</dl></details>`
    ).join("")}</div>` : '<div class="detail-empty"><span>◫</span><p>Выберите коллизию в таблице</p><small>Двойной щелчок сразу перенесёт камеру в 3D.</small></div>';
  }
  const st = (l) => {
    const p = new Set(
      !l.manualOnly && l.modelsMode === "selected" ? l.models : []
    );
    for (const g of l.include)
      try {
        p.add(String(JSON.parse(g)[0]));
      } catch {
        const h = r?.elements.find(
          (M) => M.id === g
        )?.modelId;
        h && p.add(h);
      }
    return [...p];
  }, rt = (l) => {
    if (!l?.length) return;
    const p = /* @__PURE__ */ new Set();
    for (const g of l)
      for (const h of [g.a, g.b]) {
        if (!h.manualOnly && h.modelsMode !== "selected") return;
        for (const M of st(h)) p.add(M);
      }
    return p;
  }, xt = (l) => {
    let p = l.trim().replace(/\\/g, "/").toLocaleLowerCase();
    try {
      p = decodeURIComponent(p);
    } catch {
    }
    p = p.replace(/[?#].*$/, "");
    const g = p.split("/").filter(Boolean).at(-1) || p;
    return /* @__PURE__ */ new Set([p, g]);
  }, it = (l) => {
    const p = new Set(l.map((z) => z.id)), g = l.map((z) => ({
      id: z.id,
      aliases: /* @__PURE__ */ new Set([
        ...xt(z.id),
        ...xt(z.name)
      ])
    })), h = (z) => {
      if (p.has(z)) return z;
      const L = xt(z), Y = g.filter(
        (J) => [...L].some((nt) => J.aliases.has(nt))
      );
      return Y.length === 1 ? Y[0].id : z;
    }, M = (z) => {
      try {
        const L = JSON.parse(z);
        if (!Array.isArray(L) || L.length < 2) return z;
        const Y = String(L[0]), J = h(Y);
        return J === Y ? z : JSON.stringify([J, ...L.slice(1)]);
      } catch {
        return z;
      }
    };
    let O = !1;
    const k = (z) => {
      const L = z.models.map(h), Y = z.include.map(M), J = z.exclude.map(M);
      (L.some((nt, lt) => nt !== z.models[lt]) || Y.some((nt, lt) => nt !== z.include[lt]) || J.some((nt, lt) => nt !== z.exclude[lt])) && (z.models = [...new Set(L)], z.include = [...new Set(Y)], z.exclude = [...new Set(J)], O = !0);
    };
    for (const z of o.checks)
      k(z.a), k(z.b), z.modelsAtRun && (z.modelsAtRun = z.modelsAtRun.map(h));
    for (const z of o.sets) {
      const L = z.selection.models.map(h);
      L.some((Y, J) => Y !== z.selection.models[J]) && (z.selection.models = [...new Set(L)], O = !0);
    }
    return O && E(), O;
  }, Dt = () => {
    const l = N();
    if (l)
      for (const p of n.querySelectorAll("[data-side]")) {
        const g = p.dataset.side, h = r?.elements.filter(
          (z) => (l.includeHidden || !z.hidden) && Bt(z, l[g])
        ).length || 0, M = l[g].manualOnly ? st(l[g]) : l[g].modelsMode === "selected" ? l[g].models : (r?.models || []).map((z) => z.id), O = !!r && M.every((z) => r.indexedModelIds.includes(z)), k = p.querySelector(
          "[data-selection-count]"
        );
        k && (k.textContent = O ? `${h} элементов` : "число после запуска");
      }
  };
  function dt() {
    e.markers(
      Z(),
      c,
      P,
      (l) => w(() => vt(l, !0))
    );
  }
  function vt(l, p = !1) {
    if (!x) {
      if (c = l, f === "results") {
        const g = Z().findIndex((M) => M.id === l), h = g < 0 ? u : Math.floor(g / 50);
        h !== u && (u = h, G());
        for (const M of n.querySelectorAll("[data-result]"))
          M.classList.toggle("active", M.dataset.result === l);
        Q(), requestAnimationFrame(() => {
          [...n.querySelectorAll("[data-result]")].find(
            (O) => O.dataset.result === l
          )?.scrollIntoView({ block: "nearest", inline: "nearest" });
        });
      }
      if (dt(), p) {
        const g = N()?.results.find((h) => h.id === l);
        g && (e.focus(g, Number(m("distance").value)), tt(g));
      }
    }
  }
  function tt(l) {
    clearTimeout(C);
    const p = ++j, g = Number(m("distance").value);
    l.image && l.imageScope === "pair-ab" && l.imageDistance === g || !e.canLocate(l) || (C = window.setTimeout(async () => {
      if (!(p !== j || x || c !== l.id))
        try {
          const h = await e.snapshot(
            l,
            g,
            () => p !== j || x || c !== l.id,
            !1,
            !1
          );
          if (p !== j || c !== l.id) return;
          l.image = h, l.imageScope = "pair-ab", l.imageDistance = g, E(), f === "results" && Q();
        } catch (h) {
          p === j && c === l.id && q(
            "Не удалось создать снимок выбранной коллизии: " + (h instanceof Error ? h.message : String(h)),
            !0
          );
        }
    }, 500));
  }
  async function mt(l) {
    y = !1, V(!0), S("Создание снимка пары");
    try {
      const p = Number(m("distance").value);
      l.image = await e.snapshot(l, p, () => y), l.imageScope = "pair-ab", l.imageDistance = p, E(), f === "results" && c === l.id && Q();
    } catch (p) {
      q(
        "Результаты сохранены. Снимок пары не создан: " + (p instanceof Error ? p.message : String(p)),
        !0
      );
    } finally {
      b(), V(!1);
    }
  }
  async function Pt(l, p = !1) {
    T(), S("Подготовка моделей");
    let g = p ? /* @__PURE__ */ new Set() : rt(l);
    if (!p && g?.size) {
      const h = await e.scan(
        (M) => S(M),
        () => y,
        /* @__PURE__ */ new Set()
      );
      r = h, it(h.models) && (g = rt(l));
    }
    r = await e.scan(
      (h) => {
        q(h), S(h);
      },
      () => y,
      g
    ), it(r.models), m("model-count").textContent = `Проиндексировано моделей: ${r.indexedModelIds.length} из ${r.models.length} · элементов: ${r.elements.length}`, X(), q(
      r.blockers.length ? r.blockers.join(" ") : r.warnings.length ? `Модели прочитаны с замечаниями. ${r.warnings.join(" ")}` : "Модели прочитаны. Настройте выборки и запустите проверку.",
      !!r.blockers.length
    );
  }
  const V = (l) => {
    x = l, l && (clearTimeout(C), j++);
    for (const p of [
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
      m(p).disabled = l;
    m("cancel").hidden = !l, m("content").inert = l, m("checks").inert = l;
  };
  async function ot(l) {
    const p = (h) => {
      const M = `${l.name} · ${h.phase}`;
      q(`${M} ${h.done}/${h.total} · найдено ${h.found}`), S(M, h.done, h.total, h.found);
    };
    let g;
    try {
      g = new on();
    } catch {
      return nn(
        r.elements,
        l,
        p,
        () => y,
        (h) => e.geometry(h, () => y)
      );
    }
    return I = g, new Promise((h, M) => {
      const O = () => {
        g.terminate(), I = void 0, D = void 0;
      };
      D = () => {
        O(), M(Error("Расчёт отменён. Предыдущие результаты сохранены."));
      }, g.onmessage = async (k) => {
        if (k.data.load) {
          try {
            const z = await e.geometry(
              k.data.load,
              () => y || I !== g
            );
            if (I !== g) return;
            const L = [
              z.vertices?.buffer,
              z.indices?.buffer
            ].filter(Boolean);
            g.postMessage(
              { request: k.data.request, geometry: z },
              L
            );
          } catch (z) {
            I === g && g.postMessage({
              request: k.data.request,
              error: z instanceof Error ? z.message : String(z)
            });
          }
          return;
        }
        k.data.progress ? p(k.data.progress) : (O(), k.data.error ? M(Error(k.data.error)) : h(k.data.results));
      }, g.onerror = (k) => {
        O(), M(
          Error(
            `Не удалось запустить расчёт в фоновом потоке: ${k.message || "ошибка загрузки"}`
          )
        );
      }, g.postMessage({
        elements: r.elements,
        streaming: typeof e.geometry == "function",
        check: structuredClone({ ...l, results: [], warnings: [] })
      });
    });
  }
  async function ht(l = !1) {
    if (x) return;
    T();
    const p = l ? [...o.checks] : [N()].filter(Boolean);
    if (!p.length) throw Error("Создайте проверку.");
    for (const g of p)
      for (const h of [g.a, g.b])
        h.conditions = [], h.mode = "all";
    y = !1, V(!0), S("Подготовка моделей");
    try {
      if (await Pt(p), V(!0), r.blockers.length)
        throw Error(
          "Состав моделей прочитан не полностью. " + r.blockers.join(" ")
        );
      for (const h of p) {
        if (y) break;
        for (const z of ["a", "b"]) {
          const L = h[z], Y = z === "a" ? "А" : "Б";
          if (L.modelsMode === "selected" && L.models.some((nt) => !r.models.some((lt) => lt.id === nt)))
            throw Error(
              `${h.name}: одна из моделей выборки отсутствует. Исправьте выборку.`
            );
          if (L.include.some((nt) => !r.elements.some((lt) => lt.id === nt)))
            throw Error(
              `${h.name}: вручную добавленный элемент отсутствует в модели.`
            );
          const J = Ee(r.elements, L, h.includeHidden);
          if (J) throw Error(`${h.name} · выбор ${Y}: ${J}`);
        }
        const M = Re(h);
        if (h.configAtRun === M && h.modelsAtRun?.some(
          (z) => !r.models.some((L) => L.id === z)
        ))
          throw Error(
            `${h.name}: состав моделей уменьшился. Подключите прежние модели или создайте копию проверки для нового состава. Прежние результаты сохранены.`
          );
        const O = await ot(h);
        if (y || !e.isCurrent())
          throw Error(
            "Проект изменился или расчёт отменён. Предыдущие результаты сохранены."
          );
        const k = (/* @__PURE__ */ new Date()).toISOString();
        h.results = Be(
          h.configAtRun === M ? h.results : [],
          O,
          k
        ), h.lastRun = k, h.fingerprint = r.fingerprint, h.configAtRun = M, h.modelsAtRun = [...r.indexedModelIds], h.status = "done", h.warnings = [...r.warnings], d = h.id, c = h.results[0]?.id || "", R.clear(), E();
      }
      f = "results", X(), dt(), q(
        `Проверка завершена. ${N()?.results.length || 0} результатов. Сохраните проверки для продолжения работы.`
      );
      const g = N()?.results.find((h) => h.id === c);
      g && !y && await mt(g);
    } finally {
      b(), V(!1), X();
    }
  }
  function St(l) {
    const p = l.closest("[data-side]")?.dataset.side;
    if (!p) return;
    const g = N()[p], h = l, M = l.closest("[data-side]");
    if (h.classList.contains("preset")) {
      g.presetId = h.value || void 0, M.querySelector(
        '[data-selection="delete-set"]'
      ).disabled = !g.presetId;
      return;
    }
    if (h.classList.contains("all-models")) {
      for (const O of M.querySelectorAll(
        ".model-check"
      ))
        O.checked = h.checked;
      g.modelsMode = h.checked ? "all" : "selected", g.models = [], g.manualOnly = !1, g.presetId = void 0;
    }
    if (h.classList.contains("model-check")) {
      const O = [
        ...M.querySelectorAll(".model-check")
      ], k = O.filter((L) => L.checked).map((L) => L.value), z = O.length > 0 && k.length === O.length;
      M.querySelector(".all-models").checked = z, g.modelsMode = z ? "all" : "selected", g.models = z ? [] : k, g.manualOnly = !1, g.presetId = void 0;
    }
    g.conditions = [], g.mode = "all", U(), Dt();
  }
  m("new").onclick = () => {
    const l = Fe();
    l.name = `Проверка ${o.checks.length + 1}`, o.checks.push(l), d = l.id, f = "select", c = "", R.clear(), E(), X();
  }, m("scan").onclick = () => w(async () => {
    y = !1, V(!0), S("Чтение моделей");
    try {
      const l = N();
      await Pt(l ? [l] : void 0, !l);
    } finally {
      b(), V(!1), X();
    }
  }), m("run").onclick = () => w(() => ht()), m("all").onclick = () => w(() => ht(!0)), m("cancel").onclick = () => {
    y = !0, D?.();
  }, m("test-search").oninput = W, m("checks").onclick = (l) => {
    const p = l.target.closest(
      "[data-check]"
    );
    p && !x && (e.clear(), d = p.dataset.check, c = "", R.clear(), u = 0, X());
  }, m("tabs").onclick = (l) => {
    const p = l.target.closest("[data-tab]");
    p && !x && (f = p.dataset.tab, X());
  }, m("name").onchange = () => {
    const l = N();
    l && (l.name = m("name").value.trim() || "Проверка", E(), W());
  }, m("copy").onclick = () => {
    const l = N();
    if (!l) return;
    const p = structuredClone(l);
    Object.assign(p, {
      id: crypto.randomUUID(),
      name: l.name + " — копия",
      results: [],
      lastRun: void 0,
      fingerprint: void 0,
      configAtRun: void 0,
      status: "new"
    }), o.checks.push(p), d = p.id, c = "", R.clear(), E(), X();
  }, m("delete").onclick = () => {
    N() && confirm(`Удалить проверку «${N().name}» и её результаты?`) && (o.checks = o.checks.filter((l) => l.id !== d), d = o.checks[0]?.id || "", R.clear(), e.clear(), E(), X());
  }, m("clear-project").onclick = () => {
    !o.checks.length && !o.sets.length || confirm(
      "Очистить проверки, наборы моделей и результаты текущего проекта?"
    ) && (o.checks = [], o.sets = [], r = void 0, d = "", c = "", R.clear(), e.clear(), E(), m("model-count").textContent = "Модели не прочитаны", X(), q("Данные проверок текущего проекта очищены."));
  }, m("save").onclick = () => {
    ye("НашеПО-проверки.json", JSON.stringify(o, null, 2)), F = !1, m("dirty").textContent = "Файл проверок сохранён";
  }, m("open").onclick = () => m("file").click(), m("file").onchange = () => w(async () => {
    const l = m("file").files?.[0];
    if (!l) return;
    const p = Ae(await l.text());
    F && !confirm("Заменить текущие несохранённые проверки данными из файла?") || (o = p, r && e.isCurrent() && it(r.models), s && Ft.set(s, o), ve(i, o), d = o.checks[0]?.id || "", c = "", R.clear(), e.clear(), F = !1, m("dirty").textContent = "Проверки открыты", X(), q("Проверки открыты. Обновите модели перед переходом к элементам."), m("file").value = "");
  });
  for (const l of ["settings", "help"])
    m(l).onclick = () => m(l + "-dialog").showModal();
  for (const l of n.querySelectorAll("[data-close]"))
    l.onclick = () => m(l.dataset.close).close();
  m("content").onchange = (l) => w(() => {
    const p = l.target, g = N();
    if (!g) return;
    if (p.closest("[data-side]")) {
      St(p);
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
    ].includes(p.id)) {
      if (p.id === "precision") {
        const M = Number(p.value);
        if (!Number.isFinite(M) || M < 1e-3 || M > 100)
          throw p.value = String(g.precision), Error("Точность должна быть от 0,001 до 100 мм.");
        g.precision = M;
      }
      if (p.id === "min-penetration") {
        const M = Number(p.value);
        if (!Number.isFinite(M) || M < 0 || M > 1e5)
          throw p.value = String(g.minPenetration), Error(
            "Минимальная глубина должна быть от 0 до 100 000 мм."
          );
        g.minPenetration = M;
      }
      p.id === "type" && (g.type = p.value), p.id === "touching" && (g.touching = p.checked), p.id === "same-model" && (g.ignoreSameModel = p.checked), p.id === "same-group" && (g.ignoreSameGroup = p.checked), p.id === "hidden" && (g.includeHidden = p.checked), p.id === "equal-property" && (g.equalProperty = p.value), U(), X();
      return;
    }
    if (p.id === "result-state") {
      u = 0, G();
      return;
    }
    if (p.id === "check-page") {
      for (const M of Z().slice(u * 50, u * 50 + 50))
        p.checked ? R.add(M.id) : R.delete(M.id);
      G();
      return;
    }
    if (p.classList.contains("row-check")) {
      const M = p.closest("[data-result]").dataset.result;
      p.checked ? R.add(M) : R.delete(M), m("selection-count").textContent = `Выбрано: ${R.size}`;
      return;
    }
    const h = g.results.find((M) => M.id === c);
    h && (p.id === "edit-state" && (h.state = p.value, G(), W(), dt()), p.id === "assignee" && (h.assignee = p.value), p.id === "note" && (h.note = p.value, G()), E());
  }), m("content").oninput = (l) => {
    const p = l.target;
    (p.id === "result-search" || p.id === "result-depth") && (u = 0, G());
    const g = N(), h = Number(p.value);
    g && p.id === "precision" && Number.isFinite(h) && h >= 1e-3 && h <= 100 && (g.precision = h, U()), g && p.id === "min-penetration" && Number.isFinite(h) && h >= 0 && h <= 1e5 && (g.minPenetration = h, U());
  }, m("content").onclick = (l) => w(async () => {
    const p = l.target, g = p.closest("button"), h = N();
    if (!h) return;
    if (g?.dataset.selection) {
      const O = g.closest("[data-side]").dataset.side, k = h[O], z = m("content").scrollTop;
      let L = !0;
      switch (g.dataset.selection) {
        case "load-set": {
          const Y = o.sets.find((J) => J.id === k.presetId);
          if (!Y) throw Error("Выберите сохранённый набор моделей.");
          Object.assign(k, structuredClone(Y.selection), {
            conditions: [],
            mode: "all",
            include: [],
            exclude: [],
            manualOnly: !1,
            presetId: Y.id
          });
          break;
        }
        case "save-set": {
          if (k.manualOnly)
            throw Error(
              "Ручную выборку элементов нельзя сохранить как набор моделей."
            );
          const Y = await A();
          if (!Y) return;
          const J = {
            id: crypto.randomUUID(),
            name: Y,
            selection: {
              models: [...k.models],
              modelsMode: k.modelsMode,
              conditions: [],
              mode: "all"
            }
          };
          o.sets.push(J), k.presetId = J.id, L = !1;
          break;
        }
        case "delete-set": {
          const Y = o.sets.find((J) => J.id === k.presetId);
          if (!Y) throw Error("Выберите сохранённый набор моделей.");
          if (!confirm(`Удалить набор «${Y.name}»?`)) return;
          o.sets = o.sets.filter((J) => J.id !== Y.id);
          for (const J of o.checks)
            for (const nt of [J.a, J.b])
              nt.presetId === Y.id && (nt.presetId = void 0);
          L = !1;
          break;
        }
        case "show":
          e.select(
            (r?.elements || []).filter((Y) => (h.includeHidden || !Y.hidden) && Bt(Y, k)).map((Y) => Y.id)
          );
          return;
        case "only": {
          const Y = e.selected();
          if (!Y.length) throw Error("Выделите элементы в 3D-сцене.");
          k.include = Y, k.exclude = [], k.manualOnly = !0;
          break;
        }
        case "include": {
          const Y = e.selected();
          if (!Y.length) throw Error("Выделите элементы в 3D-сцене.");
          k.include = [.../* @__PURE__ */ new Set([...k.include, ...Y])], k.exclude = k.exclude.filter((J) => !Y.includes(J));
          break;
        }
        case "exclude": {
          const Y = e.selected();
          if (!Y.length) throw Error("Выделите элементы в 3D-сцене.");
          k.exclude = [.../* @__PURE__ */ new Set([...k.exclude, ...Y])], k.include = k.include.filter((J) => !Y.includes(J));
          break;
        }
        case "reset":
          k.manualOnly = !1, k.include = [], k.exclude = [];
      }
      L ? U() : E(), X(), m("content").scrollTop = z;
      return;
    }
    if (g?.id === "prev-page" && (u--, G()), g?.id === "next-page" && (u++, G()), g?.id === "show-markers" && (P = !P, g.textContent = P ? "● Знаки включены" : "○ Знаки выключены", g.setAttribute("aria-checked", String(P)), dt()), g?.id === "bulk") {
      const O = m("bulk-state").value;
      for (const k of h.results) R.has(k.id) && (k.state = O);
      E(), G(), Q(), W(), dt();
    }
    if (g?.id === "capture-image") {
      const O = h.results.find((k) => k.id === c);
      if (O) {
        y = !1, V(!0), S("Создание снимка пары");
        try {
          O.image = await e.snapshot(
            O,
            Number(m("distance").value),
            () => y,
            !0
          ), O.imageScope = "pair-ab", O.imageDistance = void 0, E(), Q(), q("Снимок сохранён в результат.");
        } finally {
          b(), V(!1);
        }
      }
      return;
    }
    if (g?.id === "open-image") {
      const O = h.results.find((k) => k.id === c);
      if (O?.image) {
        const k = document.createElement("dialog");
        k.className = "image-dialog", k.innerHTML = '<button>Закрыть</button><img alt="Снимок коллизии">', k.querySelector("img").src = O.image, k.querySelector("button").onclick = () => {
          k.close(), k.remove();
        }, n.append(k), k.showModal();
      }
      return;
    }
    if (g?.id === "focus" && vt(c, !0), g?.id === "previous" || g?.id === "next") {
      const O = Z(), k = O.findIndex((z) => z.id === c) + (g.id === "next" ? 1 : -1);
      O[k] && vt(O[k].id, !0);
    }
    if (g?.id === "export-html" || g?.id === "export-viewer") {
      let O = 0;
      const k = m("selected-only").checked ? h.results.filter((L) => R.has(L.id)) : h.results;
      if (!k.length) throw Error("Нет результатов для отчёта.");
      if (m("report-images").checked) {
        const L = e.view, Y = L?.storeView(), J = Number(m("distance").value);
        y = !1, V(!0), S("Подготовка снимков отчёта", 0, k.length);
        try {
          await e.captureWorkspace(async () => {
            let nt = 0;
            for (const lt of k) {
              if (y)
                throw Error(
                  "Подготовка отчёта отменена. Уже полученные снимки сохранены."
                );
              S(
                "Подготовка снимков отчёта",
                nt,
                k.length
              ), q("Подготовка снимков: " + (nt + 1) + " / " + k.length);
              const Tt = lt.imageScope !== "pair-ab" || lt.imageDistance !== void 0 && lt.imageDistance !== J;
              if (!lt.image || Tt) {
                if (lt.state === "resolved" && !e.canLocate(lt)) {
                  nt++;
                  continue;
                }
                try {
                  lt.image = await e.snapshot(lt, J, () => y), lt.imageScope = "pair-ab", lt.imageDistance = J, E();
                } catch (Wt) {
                  if (y || !e.isCurrent()) throw Wt;
                  O++;
                }
              }
              nt++, S("Подготовка снимков отчёта", nt, k.length);
            }
          });
        } finally {
          if (L && e.isCurrent()) {
            const nt = h.results.find((lt) => lt.id === c);
            if (nt)
              try {
                e.focus(nt, J, !1);
              } catch {
              }
            Y && L.restoreView(Y);
          }
          b(), V(!1);
        }
      }
      const z = m("report-images").checked ? k.map(
        (L) => L.imageScope === "pair-ab" ? L : { ...L, image: void 0 }
      ) : k.map((L) => ({ ...L, image: void 0 }));
      ye(
        h.name + (g.id === "export-html" ? ".html" : ".collision360.json"),
        g.id === "export-html" ? an(h, z) : sn(h, z)
      ), q(
        "Отчёт подготовлен. Результатов: " + k.length + "; со снимками: " + z.filter((L) => L.image).length + "." + (O ? ` Не удалось создать снимков: ${O}; эти строки включены без изображения.` : ""),
        O > 0
      );
    }
    const M = p.closest("[data-result]");
    M && !p.closest("input") && !window.getSelection()?.toString() && vt(M.dataset.result);
  }), m("content").ondblclick = (l) => {
    const p = l.target, g = p.closest("[data-result]");
    g && !p.closest("input") && w(() => vt(g.dataset.result, !0));
  };
  const gt = setInterval(() => {
    x || (T() ? (m("model-count").textContent = "Модели не прочитаны", q(
      o.checks.length ? "Открыт другой проект. Показаны его проверки; обновите модели." : "Открыт другой проект. Для него ещё нет проверок."
    ), x || X()) : r && !e.isCurrent() && (r = void 0, e.clear(), m("model-count").textContent = "3D-окно изменилось", q("Активное 3D-окно изменилось. Обновите модели."), x || X()));
  }, 1500);
  return X(), () => {
    a(), clearInterval(gt), clearTimeout(C), j++, y = !0, D?.(), I?.terminate(), e.clear();
  };
}
var le = /* @__PURE__ */ ((t) => (t.object = "object", t.drawing = "drawing", t.table = "table", t.record = "record", t.textStyle = "textstyle", t.textStyleTable = "textstyles", t.linetype = "linetype", t.linetypeTable = "linetypes", t.layer = "layer", t.layerTable = "layers", t.block = "block", t.blockTable = "blocks", t.layout = "layout", t.layoutTable = "layouts", t.type = "type", t.typeTable = "types", t.material = "material", t.materialTable = "materials", t.geometry = "geometry", t.geometryTable = "geometries", t.group = "group", t.groupTable = "groups", t.attachment = "attachment", t.attachmentTable = "attachments", t.entities = "entities", t.entity = "entity", t.line = "l", t.solid = "s", t.insert = "i", t.polyline = "p", t.circle = "c", t.arc = "a", t.polyline3d = "p3", t.proxy = "x", t.text = "t", t.mtext = "mt", t.wipeout = "w", t.model3d = "g", t.alignment = "al", t))(le || {});
const ce = () => new Promise((t) => requestAnimationFrame(() => t()));
function Oe(t) {
  const { width: e, height: n } = t.camera, a = Array.from(document.querySelectorAll("canvas")).filter(
    (i) => {
      const o = i.getBoundingClientRect();
      return o.width > 100 && o.height > 100 && i.width > 0 && i.height > 0 && getComputedStyle(i).visibility !== "hidden" && (Math.abs(o.width - e) < 4 && Math.abs(o.height - n) < 4 || Math.abs(i.width - e) < 4 && Math.abs(i.height - n) < 4);
    }
  );
  if (!a.length)
    throw Error(
      "Снимок 3D-окна недоступен: откройте одно видимое окно модели."
    );
  const s = a[0].getBoundingClientRect();
  if (a.some((i) => {
    const o = i.getBoundingClientRect();
    return Math.abs(o.x - s.x) > 4 || Math.abs(o.y - s.y) > 4;
  }))
    throw Error(
      "Открыто несколько подходящих 3D-окон. Оставьте одно окно для снимка."
    );
  return { candidates: a, rect: s };
}
async function dn(t) {
  await ce(), t.repaint();
  const { candidates: e, rect: n } = Oe(t), a = document.createElement("canvas");
  a.width = Math.max(1, Math.round(n.width * devicePixelRatio)), a.height = Math.max(1, Math.round(n.height * devicePixelRatio)), Object.assign(a.style, {
    position: "fixed",
    left: `${n.left}px`,
    top: `${n.top}px`,
    width: `${n.width}px`,
    height: `${n.height}px`,
    zIndex: "2147483646",
    pointerEvents: "none"
  });
  const s = a.getContext("2d");
  for (const i of e)
    s.drawImage(i, 0, 0, a.width, a.height);
  return document.body.append(a), async () => {
    t.repaint(), await ce(), a.remove();
  };
}
async function pn(t, e) {
  if (await ce(), e()) throw Error("Подготовка снимков отменена.");
  const { candidates: n } = Oe(t), a = document.createElement("canvas"), s = Math.min(1, 1280 / n[0].width);
  a.width = Math.round(n[0].width * s), a.height = Math.round(n[0].height * s);
  const i = a.getContext("2d");
  i.fillStyle = "#20242b", i.fillRect(0, 0, a.width, a.height), t.repaint();
  for (const o of n)
    i.drawImage(o, 0, 0, a.width, a.height);
  try {
    return a.toDataURL("image/jpeg", 0.82);
  } catch {
    throw Error("Браузер запретил чтение изображения 3D-окна.");
  }
}
const ie = "nashepo.checks.points", Me = "nashepo.checks.highlight";
function ke(t) {
  let e = performance.now();
  return async () => {
    if (t()) throw Error("Операция отменена.");
    performance.now() - e >= 16 && (await new Promise((n) => setTimeout(n, 0)), e = performance.now());
  };
}
function Vt(t, e, n, a = 0) {
  if (a > 12 || t == null) return;
  if (typeof t != "object") {
    n[e] = String(t);
    return;
  }
  if (Array.isArray(t)) {
    t.forEach((i, o) => Vt(i, `${e}[${o}]`, n, a + 1));
    return;
  }
  const s = t;
  if ("$value" in s) {
    Vt(s.$value, e, n, a + 1);
    return;
  }
  for (const [i, o] of Object.entries(s))
    i.startsWith("$") || Vt(o, e ? `${e}.${i}` : i, n, a + 1);
}
function fn(t) {
  const e = t.vertices.length / 3, n = (o) => Number.isFinite(t.vertices[o * 3]) && Number.isFinite(t.vertices[o * 3 + 1]) && Number.isFinite(t.vertices[o * 3 + 2]), a = (o) => {
    const r = t.indices[o], d = t.indices[o + 1], f = t.indices[o + 2];
    return r < e && d < e && f < e && r !== d && d !== f && f !== r && n(r) && n(d) && n(f);
  };
  let s = 0;
  for (let o = 0; o < t.indices.length; o += 3) a(o) && (s += 3);
  if (s === t.indices.length) return t.indices;
  const i = new Uint32Array(s);
  for (let o = 0, r = 0; o < t.indices.length; o += 3)
    a(o) && (i[r++] = t.indices[o], i[r++] = t.indices[o + 1], i[r++] = t.indices[o + 2]);
  return i;
}
const oe = (t) => /\.wdx(?:[?#].*)?$/i.test(t);
class un {
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
      if (this.captureDepth--, n && this.captureLayout) {
        const { panel: a, size: s, maximized: i } = this.captureLayout;
        this.captureLayout = void 0, a.size = s, a.maximized = i, await new Promise(
          (o) => requestAnimationFrame(() => requestAnimationFrame(() => o()))
        );
      }
    }
  }
  async scan(e, n, a) {
    const s = this.app, i = this.view, o = s?.model;
    if (!i || !o?.layouts || !o.attachments)
      throw Error(
        "Откройте проект Топоматик 360 с IFC или SMDX и сделайте его 3D-окно активным."
      );
    const r = [], d = /* @__PURE__ */ new Set(), f = [], c = [], u = [], x = /* @__PURE__ */ new Map(), y = /* @__PURE__ */ new Set();
    let I = 2166136261;
    const P = ke(
      () => n() || s !== this.app || i !== this.view
    );
    let F = -1 / 0;
    const R = (C) => {
      for (let j = 0; j < C.length; j++)
        I = Math.imul(I ^ C.charCodeAt(j), 16777619);
    }, D = async (C, j, N) => {
      if (y.has(C)) return;
      y.add(C);
      const m = C.layers.layer0?.modelName || j, H = j, q = oe(m) || oe(H), S = (U, v) => {
        d.has(U) || (d.add(U), r.push({ id: U, name: v }));
      };
      q || S(H, m);
      const b = !q && (!a || a.has(H)), w = [];
      (b || q) && C.layouts.model?.walk((U) => (U.type === le.model3d ? w.push(U) : U.type === le.insert && f.push(`${m}: вставка блока не включена в расчёт.`), !1));
      const A = /* @__PURE__ */ new Map();
      for (const U of w) {
        let v = U.layer, $ = "";
        for (; v; ) {
          if (v.modelName && !oe(v.modelName)) {
            $ = v.modelName;
            break;
          }
          v = v.layer;
        }
        const Z = q ? $ || "Модель проекта" : m, W = q ? $ || `${j}/#model` : H;
        if (q && S(W, Z), a && !a.has(W)) continue;
        const at = JSON.stringify([
          U.layer?.UUID || "",
          U.$id || U.$path
        ]);
        A.set(JSON.stringify([W, at]), {
          key: at,
          objects: [U],
          modelId: W,
          modelName: Z
        });
      }
      let E = 0;
      for (const U of A.values()) {
        const { key: v, objects: $, modelId: Z, modelName: W } = U;
        if (n()) throw Error("Чтение моделей отменено.");
        if (s !== this.app || i !== this.view)
          throw Error(
            "Активный проект изменился. Запустите чтение моделей заново."
          );
        const at = $[0].layer, X = {};
        try {
          if (at) {
            const dt = [];
            let vt = at;
            for (; vt && dt.length < 64; )
              dt.unshift(vt), vt = vt.layer;
            for (const tt of dt)
              Vt(tt.typedProperties(), "", X), tt.typed?.name && (X.Тип = tt.typed.name);
          }
        } catch {
          f.push(`${W} / ${v}: часть свойств недоступна.`);
        }
        const $t = X["ifc.id"] || Object.entries(X).find(
          ([dt]) => /(^|\.)(globalid|ifcguid|guid)$/i.test(dt)
        )?.[1] || "", G = at?.name || $[0].$id || "Элемент", Q = JSON.stringify([Z, v]);
        Object.assign(X, {
          Модель: W,
          Имя: G,
          GUID: $t,
          Объект: at?.UUID || v
        });
        const st = {
          min: [1 / 0, 1 / 0, 1 / 0],
          max: [-1 / 0, -1 / 0, -1 / 0]
        };
        let rt = !0, xt = !1, it = 0;
        for (const dt of $) {
          rt &&= dt.isClosed;
          for (const vt of Object.values(dt.meshes)) {
            const tt = vt.geometry;
            if (!tt || tt.indices.length % 3) {
              xt = !0;
              continue;
            }
            rt &&= vt.isClosed;
            for (let V = 0; V < tt.vertices.length; V += 3) {
              const ot = [
                tt.vertices[V],
                tt.vertices[V + 1],
                tt.vertices[V + 2]
              ];
              if (Math3d.mat4.mulv3(ot, dt.matrix, ot), !ot.every(Number.isFinite)) {
                xt = !0;
                continue;
              }
              for (let ht = 0; ht < 3; ht++)
                st.min[ht] = Math.min(st.min[ht], ot[ht]), st.max[ht] = Math.max(st.max[ht], ot[ht]);
              if (R(ot.join(",")), V % 6e4 === 0 && (performance.now() - F > 200 && (F = performance.now(), e(
                "Индексирование: " + W + " · " + u.length + " элементов"
              )), await P(), n()))
                throw Error("Чтение моделей отменено.");
            }
            const mt = tt.vertices.length / 3, Pt = (V) => Number.isFinite(tt.vertices[V * 3]) && Number.isFinite(tt.vertices[V * 3 + 1]) && Number.isFinite(tt.vertices[V * 3 + 2]);
            for (let V = 0; V < tt.indices.length; V += 3) {
              const ot = tt.indices[V], ht = tt.indices[V + 1], St = tt.indices[V + 2];
              if (I = Math.imul(I ^ ot, 16777619), I = Math.imul(I ^ ht, 16777619), I = Math.imul(I ^ St, 16777619), ot < mt && ht < mt && St < mt && ot !== ht && ht !== St && St !== ot && Pt(ot) && Pt(ht) && Pt(St) ? it++ : xt = !0, V % 15e4 === 0 && (await P(), n()))
                throw Error("Чтение моделей отменено.");
            }
          }
        }
        if (xt || !it) {
          if (it || E++, !it) continue;
          rt = !1;
        }
        const Dt = {
          id: Q,
          name: G,
          model: W,
          modelId: Z,
          guid: $t,
          properties: X,
          // An IFC layer can be disabled for editing while it is still drawn
          // in the 3D view. Only the visibility flag and a hidden attachment
          // should exclude it from a normal clash check.
          hidden: N || !!at?.resolveHidden(),
          triangles: new Float64Array(0),
          triangleCount: it,
          closed: rt,
          bounds: st
        };
        R(JSON.stringify([Q, X, Dt.hidden])), u.push(Dt), x.set(Q, $);
      }
      E && f.push(
        `${m}: пропущено элементов без треугольной геометрии — ${E}.`
      );
      const T = [];
      C.attachments.forEach((U) => {
        T.push(U);
      });
      for (const U of T) {
        const v = U.name || U.uri || U.$id, $ = v || "Подключённая модель", Z = `${j}/${v || "attachment"}`;
        U.model || S(Z, $), U.model ? await D(
          U.model,
          Z,
          N || U.hidden
        ) : (!a || a.has(Z)) && c.push(
          `${$}: модель не загружена. Откройте её перед расчётом.`
        );
      }
    };
    if (await D(o, o.layers.layer0?.modelName || "Проект", !1), !u.length && (!a || a.size > 0)) {
      const C = a ? [...a].filter((j) => !d.has(j)) : [];
      throw Error(
        C.length ? `Сохранённая выборка ссылается на модели, которых нет в текущем составе: ${C.join(", ")}. Обновите список моделей.` : r.length ? "В выбранных моделях не найдены 3D-элементы с доступной геометрией. Проверьте, что модели загружены, и выберите нужные файлы." : "В открытом проекте не обнаружены IFC/SMDX-модели. Проверьте состав подключений проекта."
      );
    }
    return this.clear(), this.refs = x, this.metadata = new Map(u.map((C) => [C.id, C])), this.scannedApp = s, this.scannedView = i, {
      elements: u,
      fingerprint: `${u.length}:${I >>> 0}`,
      warnings: [...new Set(f)],
      blockers: [...new Set(c)],
      models: r,
      indexedModelIds: r.filter((C) => !a || a.has(C.id)).map((C) => C.id)
    };
  }
  async geometry(e, n) {
    const a = ke(() => n() || !this.isCurrent());
    if (!this.isCurrent()) throw Error("Активная модель изменилась.");
    const s = this.metadata.get(e), i = this.refs.get(e);
    if (!s || !i) throw Error("Элемент отсутствует.");
    const o = i.flatMap(
      (y) => Object.values(y.meshes).flatMap((I) => {
        const P = I.geometry;
        if (!P || P.indices.length % 3) return [];
        const F = fn(P);
        return F.length ? [{ object: y, g: P, indices: F }] : [];
      })
    );
    let r = 0, d = 0;
    for (const { g: y, indices: I } of o) {
      if (!y) throw Error("Геометрия недоступна.");
      r += y.vertices.length, d += I.length;
    }
    const f = new Float64Array(r), c = new Uint32Array(d);
    let u = 0, x = 0;
    for (const { object: y, g: I, indices: P } of o) {
      if (!I) throw Error("Геометрия недоступна.");
      for (let F = 0; F < I.vertices.length; F += 3) {
        const R = [I.vertices[F], I.vertices[F + 1], I.vertices[F + 2]];
        if (Math3d.mat4.mulv3(R, y.matrix, R), f.set(R, u + F), F % 6e4 === 0 && (await a(), n() || !this.isCurrent()))
          throw Error("Чтение геометрии отменено.");
      }
      for (let F = 0; F < P.length; F++)
        if (c[x + F] = u / 3 + P[F], F % 15e4 === 0 && (await a(), n()))
          throw Error("Чтение геометрии отменено.");
      u += I.vertices.length, x += P.length;
    }
    return { ...s, vertices: f, indices: c };
  }
  selected() {
    if (!this.isCurrent())
      throw Error("Сначала обновите модели текущего проекта.");
    const e = new Set(this.view?.layer.selectedObjects());
    return [...this.refs].filter(([, n]) => n.some((a) => e.has(a))).map(([n]) => n);
  }
  select(e) {
    if (!this.isCurrent())
      throw Error("Сначала обновите модели текущего проекта.");
    const n = new Set(e.flatMap((a) => this.refs.get(a) || []));
    this.view.layer.clearSelected(), this.view.layer.selectObjects((a) => n.has(a), !0), this.view.invalidate();
  }
  clear() {
    if (this.overlay && (this.overlay.view.layer.removeLayer(this.overlay.layer), this.overlay.view.invalidate(), this.overlay = void 0, this.overlaySurfaces = []), this.pointView) {
      const e = this.pointView.annotations.get(ie);
      e && this.pointView.annotations.release(e), this.pointView.invalidate(), this.pointView = void 0;
    }
  }
  focus(e, n, a = !0) {
    if (!this.isCurrent())
      throw Error("Обновите модели текущего проекта перед переходом.");
    if (!Number.isFinite(n) || n < 0.5)
      throw Error("Дистанция камеры должна быть не менее 0,5 м.");
    if (!this.refs.has(e.a.id) || !this.refs.has(e.b.id))
      throw Error("Один из элементов отсутствует в загруженных моделях.");
    const s = e.point, i = this.view;
    i.camera?.id !== "3d" && i.setCameraType("3d"), i.pauseAnimation?.(), this.highlight(e), this.select([e.a.id, e.b.id]);
    const o = [-0.65, 0.65, -0.394], r = Math.hypot(...o);
    o.forEach((d, f) => o[f] = d / r), i.lookAt(
      s.map((d, f) => d - o[f] * n),
      o,
      [0, 0, 1],
      a,
      s
    );
  }
  highlight(e) {
    this.overlayError = void 0;
    const n = this.view;
    this.overlay && this.overlay.view !== n && (this.overlay.view.layer.removeLayer(this.overlay.layer), this.overlay = void 0, this.overlaySurfaces = []);
    const a = [
      { id: e.a.id, color: 4281743103 },
      { id: e.b.id, color: 915144703 }
    ];
    if (this.overlaySurfaces = a.flatMap(
      ({ id: o, color: r }, d) => [...new Set(this.refs.get(o) || [])].flatMap(
        (f) => Object.values(f.meshes).flatMap((c) => {
          const u = c.geometry;
          if (!u) return [];
          const x = {
            // SDK fields may be prototype getters rather than own properties.
            uuid: `${Me}.${d}.${u.uuid}`,
            vertices: u.vertices,
            indices: u.indices,
            normals: u.normals,
            bounds: u.bounds,
            colors: new Uint32Array(u.vertices.length / 3).fill(r)
          };
          return [{ obj: f, geometry: x, color: r }];
        })
      )
    ), this.overlay) {
      this.overlay.layer.visible = !0, n.invalidate(!0);
      return;
    }
    let s;
    s = {
      id: Me,
      order: 1e4,
      visible: !0,
      paint: () => {
      },
      paint3d: (o) => {
        const r = o.color, d = o.rasterizer.material;
        o.rasterizer.material = void 0;
        try {
          for (const { obj: f, geometry: c, color: u } of this.overlaySurfaces) {
            o.color = u, o.pushMatrix();
            try {
              o.multMatrix(f.matrix), o.mesh(c);
            } finally {
              o.popMatrix();
            }
          }
        } catch (f) {
          s.visible = !1, this.overlayError = new Error(
            "Не удалось отрисовать подсветку пары: " + (f instanceof Error ? f.message : String(f))
          );
        } finally {
          o.color = r, o.rasterizer.material = d;
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
    }, n.layer.addLayer(s), this.overlay = { view: n, layer: s }, n.invalidate();
  }
  async snapshot(e, n, a, s = !1, i = !0) {
    const o = () => this.snapshotInWorkspace(e, n, a, s);
    return i ? this.captureWorkspace(o) : o();
  }
  async snapshotInWorkspace(e, n, a, s = !1) {
    if (!this.isCurrent())
      throw Error("Обновите модели перед созданием снимков.");
    if (!this.canLocate(e))
      throw Error("Элементы результата отсутствуют в открытых моделях.");
    const i = this.view, o = i.layer.drawing;
    if (!o)
      throw Error(
        "Слой моделей недоступен для снимка пары. Откройте 3D-окно проекта."
      );
    const r = o.visible, d = i.annotations.visible, f = new Set(i.layer.selectedObjects());
    let c;
    try {
      s ? this.highlight(e) : this.focus(e, n, !1), i.pauseAnimation(), c = await dn(i), i.layer.clearSelected(), o.visible = !1, i.annotations.visible = !1, i.invalidate();
      const u = await pn(
        i,
        () => a() || !this.isCurrent()
      );
      if (this.overlayError) throw this.overlayError;
      return u;
    } finally {
      o.visible = r, i.annotations.visible = d, i.layer.clearSelected(), i.layer.selectObjects((u) => f.has(u), !0), i.invalidate(), await c?.();
    }
  }
  markers(e, n, a, s) {
    if (!this.isCurrent()) return;
    const i = this.view;
    this.pointView && this.pointView !== i && this.clear();
    const o = i.annotations.get(ie);
    if (o && i.annotations.release(o), this.pointView = i, !a) {
      i.invalidate();
      return;
    }
    const r = i.annotations.create(ie, 1e4), d = e.filter((f) => f.id !== n).concat(e.filter((f) => f.id === n));
    for (const f of d.slice(-3e3)) {
      if (f.state === "resolved") continue;
      const [c, u, x] = f.point, y = f.id === n, I = f.state === "excluded" ? "#78818c" : f.state === "approved" || f.state === "reviewed" ? "#28b94b" : "#e1372d", P = y ? "#f2c94c" : I, F = () => s(f.id), R = [
        { type: "line", a: [c, u, x], b: [c, u, x + 1], color: P, width: 5 },
        {
          type: "polyline",
          points: [
            [c - 0.65, u, x + 1],
            [c + 0.65, u, x + 1],
            [c, u, x + 2.2],
            [c - 0.65, u, x + 1]
          ],
          color: P,
          fillColor: I,
          width: y ? 5 : 2
        },
        {
          type: "line",
          a: [c, u - 0.01, x + 1.85],
          b: [c, u - 0.01, x + 1.4],
          color: "#ffffff",
          width: 4
        },
        {
          type: "line",
          a: [c, u - 0.01, x + 1.22],
          b: [c, u - 0.01, x + 1.27],
          color: "#ffffff",
          width: 4
        }
      ];
      r.add({
        id: f.id,
        type: "shaped",
        shapes: R,
        activeShapes: R,
        activateCommand: F,
        dblCommand: F
      }), y && r.add({
        id: f.id + ":label",
        type: "simple",
        position: [c, u, x + 2.35],
        label: `${f.a.name} × ${f.b.name}`,
        labelBackground: "#f2c94c",
        labelColor: "#171717",
        activateCommand: F
      });
    }
    i.invalidate();
  }
}
let Ie, ae, Se;
const mn = {
  open(t) {
    t.manager.revealView("nashepo.collisionfinder360/checks_panel");
  },
  mount(t) {
    const e = t.el;
    if (!e) return;
    if (ae && Se === t.manager) {
      e.replaceChildren(ae);
      return;
    }
    Ie?.();
    const n = document.createElement("div");
    n.style.height = "100%", e.replaceChildren(n), ae = n, Se = t.manager, Ie = cn(n, new un(t));
  }
};
export {
  mn as default
};
