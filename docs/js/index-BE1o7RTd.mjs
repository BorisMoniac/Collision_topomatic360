const Re = `<h2>Работа с проверками</h2>
<details open><summary>1. Первая проверка</summary><ol><li>Откройте проект и подключите IFC/SMDX штатными средствами Топоматик 360.</li><li>Откройте нижнюю вкладку «Проверки» и нажмите «Модели».</li><li>Нажмите «＋ Новая проверка» и задайте ей понятное имя.</li><li>Во вкладке «Выбор» оставьте галочки только у нужных файлов в А и Б. «Все модели» включено по умолчанию.</li><li>Выберите «По пересечению» или «Дублирование» и нажмите «Запустить».</li><li>Во вкладке «Результаты» дважды нажмите строку: камера направится к конфликту, элемент А будет выделен красным, элемент Б — синим, и оба элемента станут выделенными в 3D-окне.</li></ol><p>Первое обновление без созданной проверки получает только список файлов. При запуске индексируются модели, отмеченные хотя бы в одной стороне. Файл проекта WDX служит контейнером и в выбор моделей не попадает.</p></details>
<details><summary>2. Выбор моделей и сохранённые наборы</summary><p>Выбор А и выбор Б задают две стороны сравнения. Снимите «Все модели» и отметьте конкретные IFC/SMDX. Для поиска дубликатов внутри одного файла отметьте его с обеих сторон.</p><p>Часто используемый состав можно сохранить как набор моделей, а затем применить в другой проверке. Наборы входят в файл проверок. Состав выборки задаётся галочками моделей и ручным выделением объектов.</p><p>IFC GUID читается из свойства <code>ifc.id</code>; также поддерживаются GlobalId, IfcGuid и GUID.</p></details>
<details><summary>3. Работа с выделением в 3D</summary><p>Сначала выделите элементы штатными средствами в 3D-окне, затем используйте кнопку в нужной стороне:</p><ul><li><b>Показать выбранные элементы</b> — выделяет весь текущий состав.</li><li><b>Только выделенные в 3D</b> — оставляет только выделенные объекты.</li><li><b>＋ Добавить из 3D</b> — добавляет выделенные объекты к моделям.</li><li><b>− Исключить из 3D</b> — исключает выделенные объекты.</li><li><b>Сбросить ручной выбор</b> — снова использует отмеченные модели.</li></ul><p>Ручные идентификаторы могут измениться после замены IFC/SMDX, поэтому такую выборку следует проверить заново.</p></details>
<details><summary>4. Пересечения, глубина, касания и дубликаты</summary><p><b>Пересечение</b> определяется по треугольным поверхностям элементов и вложенности тел. Раздельные сетки сначала проверяются вместе: совпадающие рёбра и разное разбиение швов больше не делают замкнутый элемент «неизмеримым». Признак замкнутости из исходной модели проверяется по граням: сам по себе он не подтверждает внутренний объём. Габаритные коробки отбирают близкие пары; общий габарит также ограничивает область замера глубины. Одна пара элементов формирует один результат.</p><p><b>Толщина перекрытия</b> — локальная оценка пересечения. Для контакта выбираются направления измерения, в том числе по его форме и нормалям граней. По ним измеряется общая часть проекций геометрии в области контакта и выбирается наименьшая пригодная ширина. Если обнаружены отдельные участки перекрытия, для пары сохраняется наибольшая из их глубин.</p><p><b>Заход вдоль оси</b> дополнительно измеряется для распознанной прямой трубы или вытянутого профиля, пересекающего более крупную конструкцию. Ось определяется по геометрии, её пересечения — по граням конструкции. Для круглого кабеля или трубы с поворотами плагин дополнительно распознаёт последовательные поперечные сечения и измеряет путь по их центрам. Соседние участки внутри одной оболочки объединяются в непрерывный заход; выход наружу и вход обратно дают отдельные участки, из которых берётся самый длинный. Такой замер помечается знаком ≈. При частичном заходе измеряется участок от внешней границы до конца профиля; при сквозном — от входа до выхода. Внутренняя пустота колодца входит в этот замер. Раздельные оболочки конструкции измеряются отдельно: расстояние между несвязанными частями не прибавляется. Сам по себе проход оси через габарит не создаёт коллизию: сначала должно быть обнаружено пересечение элементов.</p><p><b>Глубина для отбора</b> — большее из толщины перекрытия и продольного захода. Поэтому труба диаметром 50 мм, заходящая в конструкцию на 1000 мм, проходит порог 80 мм, а стык с заходом 5 мм — нет. Оба замера видны в карточке коллизии и HTML-отчёте, когда продольный заход удалось определить. Для отдельных отводов, фитингов и сопоставимых труб сохраняется локальный расчёт. Это не расстояние перемещения, устраняющего коллизию. Объём пересечения имеет кубические единицы и не заменяет глубину в миллиметрах.</p><p>Если оболочка содержит разрывы, плагин дополнительно определяет внутреннюю область по совокупности окружающих граней — методом обобщённого числа обхода. Когда такая область подтверждается, рассчитывается численная глубина со знаком ≈. Исходная модель при этом не изменяется. Это позволяет проверять трубы, отводы и другие объёмные элементы с дефектами сетки. Одиночная плоская грань не превращается в объёмное тело.</p><p><b>Ограничения метода.</b> Плагин не строит точное тело пересечения. Разделение контактов, выбор направлений и проверка заполнения являются оценкой. Для сложных невыпуклых и составных объектов, криволинейных поверхностей результат может зависеть от сетки и расположения геометрии. Продольный замер применяется к распознанным прямым профилям с длиной не менее четырёх поперечных размеров, когда конструкция шире профиля минимум в 2,5 раза по двум поперечным направлениям. Для изогнутого круглого кабеля или трубы замер по траектории доступен, если сетка содержит распознаваемые поперечные сечения и связи между ними. Если ось восстановить не удалось, остаётся локальный замер. У сложной связной невыпуклой оболочки продольный замер может включать промежутки между её поверхностями. Заданная точность не гарантирует такую же погрешность итоговой глубины. Результаты около принятого допуска следует проверять в 3D.</p><p><b>Столбец глубины:</b></p><ul><li><b>Число</b> — полученная оценка в миллиметрах. Малые положительные значения показываются с дополнительными знаками, чтобы не превратиться в ноль при округлении.</li><li><b>Касание</b> — найден контакт без разрешённого объёмного перекрытия. Такие пары включаются настройкой «Учитывать касания» и могут отсекаться порогом глубины как нулевые.</li><li><b>Не определена</b> — у геометрии не удалось определить внутреннюю область, например у одиночного листа или отдельных граней. Пересечение сохраняется; размер грани не выдаётся за глубину.</li><li><b>Требует уточнения</b> — пересечение найдено, однако его глубина не разрешена текущим расчётом. Причиной может быть неоднозначная геометрия контакта. Само по себе малое вхождение относительно настройки точности больше не является причиной отказа от замера.</li><li><b>≈</b> — приблизительная оценка: внутренняя область восстановлена для оболочки с разрывами, состыкованы немного расходящиеся швы либо при измерении сокращалась выборка или разделение контактов достигло предела. Для числа не гарантируются ни величина, ни направление ошибки.</li></ul><p>«Не определена» и «Требует уточнения» остаются в результатах независимо от минимальной глубины. Числовые оценки, в том числе со знаком ≈, сравниваются с порогом. Знак ≈ сообщает о приближённом расчёте и не отменяет фильтр. Найденное малое пересечение не должно исчезать только из-за отключённого учёта касаний: для определения пересечения и замера используется отдельный численный запас. Настройка точности не округляет малые вхождения до нуля.</p><p><b>Точность расчёта</b> задаётся в миллиметрах и влияет на отбор близких пар, разделение контактов и запас при фильтрации. При восстановлении швов допустимое расхождение ограничено этой величиной и дополнительно 0,01 мм. Приближённое восстановление внутренней области по граням — отдельный метод, его погрешность этой настройкой не гарантируется. <b>Минимальная глубина</b> — порог отбора результатов. Все числовые оценки сравниваются с порогом с запасом на точность: при минимуме 20 мм и точности 0,1 мм результат 19,95 мм остаётся. Этот порядок одинаков в расчёте, таблице и HTML-отчёте. После изменения точности или порога повторно запустите проверку.</p><p>Труба и отвод могут пересекаться в штатном соединении из-за формы исходной сетки. Такие соединения рассматриваются отдельно и при необходимости исключаются правилами.</p><p><b>Дублирование</b> ищет совпадающую треугольную геометрию в мировых координатах с заданной точностью. Геометрически одинаковые тела с разным разбиением поверхности на треугольники могут не считаться дубликатами.</p></details>
<details><summary>Длина бокового контакта</summary><p>Кабель может пересекать стенку боковой поверхностью, хотя его ось проходит снаружи. Для распознанных профилей и трасс отдельно измеряется <b>длина контакта</b>: пересечения фактических треугольных поверхностей проецируются вдоль элемента, и выбирается самый длинный непрерывный участок. Раздельные участки не складываются. Это приблизительный размер со знаком ≈; он доступен в таблице, карточке, HTML-отчёте и сессии.</p><p>Длина не заменяет глубину и не участвует в её пороге. Например, кабель может касаться стенки вдоль 1000 мм с нулевой глубиной или входить в неё на 5 мм вдоль тех же 1000 мм. Чистые касания попадают в результат только при включённом «Учитывать касания». Если профиль не распознан или замер неприменим, в столбце стоит прочерк. Для добавления длины в старые результаты запустите проверку повторно.</p></details>
<details><summary>5. Составные объекты и неполная геометрия</summary><p>Один IFC-объект может состоять из нескольких частей. В новых проверках правило «Не проверять геометрию одного составного объекта» включено по умолчанию. Его можно изменить во вкладке «Правила». Сохранённые проверки сохраняют выбранное ранее значение. Там же можно исключить пары одной модели или одинакового значения свойства.</p><p>Пустые и неполные геометрические части пропускаются, а пригодные части модели продолжают участвовать. Плагин показывает сводное замечание с количеством пропущенных элементов. Незагруженный подключённый файл блокирует расчёт только тогда, когда он входит в выборку.</p></details>
<details><summary>6. Результаты и состояния</summary><p>«Новый» найден впервые, «Активный» найден повторно, «Проверенный» рассмотрен, «Подтверждённый» подтверждён, «Исключённый» исключён из работы. «Исправленный» означает, что пара исчезла при повторном расчёте с теми же правилами; состояние можно изменить вручную.</p><p>В таблице доступны IFC GUID, расчётная глубина, назначение и комментарий. Фильтр «Глубина от» сравнивает порог с большим из доступных замеров: толщиной перекрытия и продольным заходом. Числа со знаком ≈ тоже участвуют в отборе; строки «не определена» и «требует уточнения» сохраняются для просмотра. Галочки меняют состояние сразу у нескольких строк. Значения можно выделять и копировать. При переходе стрелками активная строка автоматически прокручивается в видимую область. Состояние «Устарела» у проверки означает, что после последнего расчёта изменили её тип, выборки, параметры или правила.</p></details>
<details><summary>7. Отчёт и снимки</summary><p>После перехода к коллизии отсутствующий снимок создаётся автоматически, если пользователь задержался на результате. Кадр строится от той же камеры приближения, что и снимки отчёта: ракурс задаёт «Дистанция камеры» в настройках. Если дистанцию изменить, отчёт переснимет прежние кадры под новое значение. Быстрое переключение стрелками отменяет лишние снимки. Во время технической перерисовки поверх 3D-окна сохраняется предыдущий кадр, поэтому модель не должна мигать.</p><p>Кнопка «Снимок пары» сохраняет текущий ракурс только с двумя элементами коллизии: элемент А показан красным, элемент Б — синим. Такой кадр собран вручную, поэтому отчёт его не переснимает. На время подготовки отчёта нижняя панель автоматически уменьшается для широкого 3D-кадра и затем возвращается к прежнему размеру. Файл сессии предназначен для открытия результатов в плагине «НашеПО · Коллизии».</p></details>
<details><summary>8. Проекты, сохранение и очистка</summary><p>В пределах открытой страницы каждый проект получает собственный список проверок. Сворачивание или повторное открытие нижней панели сохраняет проверки, результаты и комментарии в текущей вкладке. При переключении проекта данные предыдущего не подмешиваются. «Очистить проект» удаляет проверки, результаты и наборы только у текущего проекта.</p><p>«Сохранить проверки» записывает правила, наборы моделей, результаты, комментарии и снимки в JSON. «Открыть проверки» загружает этот файл. Геометрия в файл не входит: соответствующие модели надо открыть отдельно. После обновления или закрытия страницы для продолжения работы используйте сохранённый файл.</p></details>
<details><summary>9. Большие проекты</summary><p>Жёсткого предела в 6 млн треугольников нет. При запуске строится индекс только по отмеченным моделям. Точная геометрия передаётся в расчёт по мере появления близких пар в компактном индексированном виде.</p><p>Время и память всё равно зависят от состава выборок и числа потенциальных пар. Разделяйте проверки по моделям и системам. В сцене одновременно показывается до 3000 знаков; при 50 000 результатах расчёт останавливается без замены прежнего результата.</p></details>`;
function Te(t) {
  let e = t.parentElement, n;
  for (; e && !n; )
    n = [...e.children].find(
      (d) => d.classList.contains("resizer-horizontal")
    ), e = e.parentElement;
  if (!n) return () => {
  };
  const s = n, a = t.ownerDocument.defaultView;
  let i;
  const o = () => {
    if (i === void 0) return;
    const d = i;
    i = void 0, s.dispatchEvent(
      new MouseEvent("mouseup", { bubbles: !0, composed: !0 })
    ), s.hasPointerCapture(d) && s.releasePointerCapture(d);
  }, r = (d) => {
    d.button === 0 && (i = d.pointerId, s.setPointerCapture(d.pointerId));
  };
  return s.addEventListener("pointerdown", r), s.addEventListener("pointerup", o), s.addEventListener("pointercancel", o), s.addEventListener("lostpointercapture", o), a.addEventListener("blur", o), () => {
    o(), s.removeEventListener("pointerdown", r), s.removeEventListener("pointerup", o), s.removeEventListener("pointercancel", o), s.removeEventListener("lostpointercapture", o), a.removeEventListener("blur", o);
  };
}
const Ge = "0.9.4", Jt = (t) => typeof t == "string" && /^data:image\/(jpeg|png);base64,[A-Za-z0-9+/=]+$/.test(t), Ct = {
  new: "Новый",
  active: "Активный",
  reviewed: "Проверенный",
  approved: "Подтверждённый",
  resolved: "Исправленный",
  excluded: "Исключённый"
}, Ae = (t, e, n) => t.kind === "duplicate" || t.depth === "unmeasurable" || t.depth === "tolerance" || (t.penetrationMm ?? 0) + n >= e, ge = () => ({
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
  a: ge(),
  b: ge(),
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
}), be = ({
  triangles: t,
  vertices: e,
  indices: n,
  triangleCount: s,
  closed: a,
  bounds: i,
  ...o
}) => o;
function Gt(t, e) {
  return e.exclude.includes(t.id) ? !1 : e.include.includes(t.id) ? !0 : !(e.manualOnly || e.modelsMode === "selected" && !e.models.includes(t.modelId) || e.modelsMode === void 0 && e.models.length && !e.models.includes(t.modelId));
}
function $e(t, e, n) {
  if (!e.manualOnly && e.modelsMode === "selected" && !e.models.length && !e.include.length)
    return "Не отмечены модели. Выберите файлы или включите «Все модели».";
  let s = 0;
  for (const a of t)
    if (Gt(a, e) && (s++, n || !a.hidden))
      return;
  return s ? `Все выбранные элементы (${s}) скрыты. Покажите их в модели или включите «Включать скрытые элементы» на вкладке «Правила».` : e.manualOnly ? "Ручная выборка пуста. Выделите элементы в 3D заново или нажмите «Сбросить ручной выбор»." : e.exclude.length ? "Нет элементов после ручных исключений. Проверьте исключения или нажмите «Сбросить ручной выбор»." : "В выбранных моделях нет доступных элементов. Обновите модели и проверьте состав выборки.";
}
const Ye = (t) => JSON.stringify([
  t.type,
  ...[t.a, t.b].map(
    ({
      models: e,
      modelsMode: n,
      conditions: s,
      mode: a,
      include: i,
      exclude: o,
      manualOnly: r
    }) => ({
      models: e,
      modelsMode: n,
      conditions: s,
      mode: a,
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
]), Ze = (t, e) => JSON.stringify([t, e].sort());
function He(t, e, n) {
  const s = new Map(t.map((i) => [i.id, i])), a = e.map((i) => {
    const o = s.get(i.id);
    return s.delete(i.id), {
      ...i,
      note: o?.note ?? "",
      assignee: o?.assignee ?? "",
      firstSeen: o?.firstSeen ?? n,
      lastSeen: n,
      state: !o || o.state === "resolved" ? "new" : o.state === "new" ? "active" : o.state
    };
  });
  for (const i of s.values())
    a.push({
      ...i,
      state: i.state === "excluded" ? "excluded" : "resolved"
    });
  return a;
}
function ze(t) {
  const e = JSON.parse(t);
  if (e?.format !== "nashepo.checks" || e.version !== 1 || !Array.isArray(e.checks))
    throw Error("Это не файл проекта проверок НашеПО.");
  const n = /* @__PURE__ */ new Set();
  if (e.sets ??= [], !Array.isArray(e.sets) || !e.sets.every(
    (a) => a && typeof a.id == "string" && typeof a.name == "string" && a.selection && Array.isArray(a.selection.models) && a.selection.models.every((i) => typeof i == "string") && (a.selection.modelsMode === void 0 || ["all", "selected"].includes(a.selection.modelsMode)) && Array.isArray(a.selection.conditions) && a.selection.conditions.every(
      (i) => i && typeof i.field == "string" && typeof i.value == "string" && ["eq", "ne", "contains", "exists", "gt", "lt"].includes(
        i.op
      )
    ) && ["all", "any"].includes(a.selection.mode)
  ))
    throw Error("Некорректные наборы моделей.");
  const s = (a) => /\.wdx(?:[?#].*)?$/i.test(a);
  for (const a of e.sets)
    a.selection.models = a.selection.models.filter(
      (i) => !s(i)
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
      (i) => typeof a[i] == "boolean"
    ) || typeof a.equalProperty != "string" || a.warnings !== void 0 && (!Array.isArray(a.warnings) || !a.warnings.every((i) => typeof i == "string")) || a.modelsAtRun !== void 0 && (!Array.isArray(a.modelsAtRun) || !a.modelsAtRun.every((i) => typeof i == "string")))
      throw Error("Некорректные правила проверки.");
    a.warnings ??= [], a.modelsAtRun = a.modelsAtRun?.filter((i) => !s(i));
    for (const i of [a.a, a.b]) {
      if (!i || i.manualOnly !== void 0 && typeof i.manualOnly != "boolean" || i.modelsMode !== void 0 && !["all", "selected"].includes(i.modelsMode) || i.presetId !== void 0 && typeof i.presetId != "string" || !["all", "any"].includes(i.mode) || ![i.models, i.include, i.exclude].every(
        (o) => Array.isArray(o) && o.every((r) => typeof r == "string")
      ) || !Array.isArray(i.conditions) || !i.conditions.every(
        (o) => o && typeof o.field == "string" && typeof o.value == "string" && ["eq", "ne", "contains", "exists", "gt", "lt"].includes(o.op)
      ))
        throw Error("Некорректная выборка.");
      i.modelsMode ??= i.models.length ? "selected" : "all", i.models = i.models.filter((o) => !s(o)), i.conditions = [], i.mode = "all";
    }
    for (const i of a.results) {
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
      for (const o of [i?.overlapThicknessMm, i?.axialPenetrationMm, i?.contactLengthMm])
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
const T = (t, e) => [t[0] - e[0], t[1] - e[1], t[2] - e[2]], jt = (t, e, n = 1) => [
  t[0] + e[0] * n,
  t[1] + e[1] * n,
  t[2] + e[2] * n
], V = (t, e) => t[0] * e[0] + t[1] * e[1] + t[2] * e[2], xt = (t, e) => [
  t[1] * e[2] - t[2] * e[1],
  t[2] * e[0] - t[0] * e[2],
  t[0] * e[1] - t[1] * e[0]
], K = (t) => Math.hypot(...t), Ot = (t) => {
  const e = K(t);
  return e > 1e-20 ? [t[0] / e, t[1] / e, t[2] / e] : void 0;
}, Et = (t) => t.triangleCount ?? (t.indices ? t.indices.length / 3 : t.triangles.length / 9), St = (t, e, n) => t.indices && t.vertices ? t.vertices[t.indices[e * 3 + Math.floor(n / 3)] * 3 + n % 3] : t.triangles[e * 9 + n], gt = (t, e) => [0, 3, 6].map((n) => [
  St(t, e, n),
  St(t, e, n + 1),
  St(t, e, n + 2)
]);
function Bt(t) {
  const e = [1 / 0, 1 / 0, 1 / 0], n = [-1 / 0, -1 / 0, -1 / 0];
  for (let s = 0; s < t.length; s++) {
    const a = s % 3;
    e[a] = Math.min(e[a], t[s]), n[a] = Math.max(n[a], t[s]);
  }
  return { min: e, max: n };
}
const Qt = (t, e, n) => t.min.every((s, a) => s <= e.max[a] + n && t.max[a] >= e.min[a] - n);
function se(t, e) {
  const n = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const r of e)
    for (let d = 0; d < 9; d++) {
      const f = d % 3, c = St(t, r, d);
      n.min[f] = Math.min(n.min[f], c), n.max[f] = Math.max(n.max[f], c);
    }
  if (e.length <= 12) return { ...n, ids: e };
  const s = n.max.map((r, d) => r - n.min[d]), a = s.indexOf(Math.max(...s)), i = (r) => St(t, r, a) + St(t, r, a + 3) + St(t, r, a + 6);
  e.sort((r, d) => i(r) - i(d));
  const o = e.length >> 1;
  return {
    ...n,
    left: se(t, e.slice(0, o)),
    right: se(t, e.slice(o))
  };
}
function* Lt(t, e, n) {
  Qt(t, e, n) && (t.ids ? yield* t.ids : (yield* Lt(t.left, e, n), yield* Lt(t.right, e, n)));
}
function* zt(t, e, n) {
  if (Qt(t, e, n)) {
    if (t.ids && e.ids) {
      for (const s of t.ids) for (const a of e.ids) yield [s, a];
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
  const s = n.max.map((o, r) => o - n.min[r]), a = s.indexOf(Math.max(...s));
  e.sort(
    (o, r) => t[o].bounds.min[a] + t[o].bounds.max[a] - (t[r].bounds.min[a] + t[r].bounds.max[a])
  );
  const i = e.length >> 1;
  return {
    ...n,
    left: Xt(t, e.slice(0, i)),
    right: Xt(t, e.slice(i))
  };
}
function Yt(t, e, n, s) {
  const a = T(e, t), i = T(n[1], n[0]), o = T(n[2], n[0]), r = xt(a, o), d = V(i, r);
  if (Math.abs(d) <= 1e-12 * K(a) * K(i) * K(o)) return;
  const f = 1 / d, c = T(t, n[0]), u = V(c, r) * f, g = xt(c, i), x = V(a, g) * f, M = V(o, g) * f, E = s / Math.max(K(i), K(o), s);
  if (u >= -E && x >= -E && u + x <= 1 + E && M >= -E && M <= 1 + E)
    return jt(t, a, Math.max(0, Math.min(1, M)));
}
function Qe(t, e, n, s) {
  const a = n.map(Math.abs).indexOf(Math.max(...n.map(Math.abs))), i = [0, 1, 2].filter((d) => d !== a), o = (d, f, c) => (f[i[0]] - d[i[0]]) * (c[i[1]] - d[i[1]]) - (f[i[1]] - d[i[1]]) * (c[i[0]] - d[i[0]]), r = (d, f) => {
    const c = f.map((u, g) => o(u, f[(g + 1) % 3], d));
    return c.every((u) => u >= -s * K(n)) || c.every((u) => u <= s * K(n));
  };
  for (const d of t) if (r(d, e)) return d;
  for (const d of e) if (r(d, t)) return d;
  for (let d = 0; d < 3; d++)
    for (let f = 0; f < 3; f++) {
      const c = t[d], u = t[(d + 1) % 3], g = e[f], x = e[(f + 1) % 3], M = T(u, c), E = T(x, g), F = M[i[0]] * E[i[1]] - M[i[1]] * E[i[0]];
      if (Math.abs(F) < 1e-18) continue;
      const D = T(g, c), $ = (D[i[0]] * E[i[1]] - D[i[1]] * E[i[0]]) / F, C = (D[i[0]] * M[i[1]] - D[i[1]] * M[i[0]]) / F;
      if ($ >= 0 && $ <= 1 && C >= 0 && C <= 1) return jt(c, M, $);
    }
}
function Pe(t, e, n, s) {
  for (let a = 0; a < 3; a++) {
    const i = Yt(t[a], t[(a + 1) % 3], e, n);
    i && s.push(i);
    const o = Yt(e[a], e[(a + 1) % 3], t, n);
    o && s.push(o);
  }
}
function Ce(t, e, n, s) {
  const a = xt(T(t[1], t[0]), T(t[2], t[0])), i = xt(T(e[1], e[0]), T(e[2], e[0])), o = K(a), r = K(i);
  if (o < 1e-20 || r < 1e-20) return;
  const d = e.map((c) => V(T(c, t[0]), a) / o), f = t.map((c) => V(T(c, e[0]), i) / r);
  if (!(d.every((c) => c > n) || d.every((c) => c < -n) || f.every((c) => c > n) || f.every((c) => c < -n))) {
    if (d.every((c) => Math.abs(c) <= n) && f.every((c) => Math.abs(c) <= n))
      return s ? Qe(t, e, a, n) : void 0;
    if (!(!s && (!(Math.min(...d) < -n && Math.max(...d) > n) || !(Math.min(...f) < -n && Math.max(...f) > n))))
      for (let c = 0; c < 3; c++) {
        const u = Yt(t[c], t[(c + 1) % 3], e, n);
        if (u) return u;
        const g = Yt(e[c], e[(c + 1) % 3], t, n);
        if (g) return g;
      }
  }
}
class We {
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
    const n = Ot(xt(T(e[1], e[0]), T(e[2], e[0])));
    if (!n) return;
    const a = n[0] < -1e-9 || Math.abs(n[0]) <= 1e-9 && (n[1] < -1e-9 || Math.abs(n[1]) <= 1e-9 && n[2] < 0) ? [-n[0], -n[1], -n[2]] : [n[0], n[1], n[2]], i = this.key(a);
    for (this.items.has(i) || this.items.set(i, a); this.items.size > 512 && this.step > 10; ) {
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
    for (const s of n) this.add(gt(e, s));
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
    const i = [a[0] - e[0], a[1] - e[1], a[2] - e[2]];
    for (let o = 0; o < 3; o++)
      for (let r = 0; r < 3; r++) n[o][r] += i[o] * i[r];
  }
  const s = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ];
  for (let a = 0; a < 12; a++) {
    let i = 0;
    for (let o = 0; o < 3; o++)
      for (let r = o + 1; r < 3; r++) i += n[o][r] * n[o][r];
    if (i <= 1e-30) break;
    for (let o = 0; o < 3; o++)
      for (let r = o + 1; r < 3; r++) {
        if (Math.abs(n[o][r]) <= 1e-30) continue;
        const d = (n[r][r] - n[o][o]) / (2 * n[o][r]), f = (d >= 0 ? 1 : -1) / (Math.abs(d) + Math.sqrt(d * d + 1)), c = 1 / Math.sqrt(f * f + 1), u = f * c;
        for (const g of [n, s])
          for (let x = 0; x < 3; x++) {
            const M = g[x][o], E = g[x][r];
            g[x][o] = c * M - u * E, g[x][r] = u * M + c * E;
          }
        for (let g = 0; g < 3; g++) {
          const x = n[o][g], M = n[r][g];
          n[o][g] = c * x - u * M, n[r][g] = u * x + c * M;
        }
      }
  }
  return [0, 1, 2].sort((a, i) => n[i][i] - n[a][a]).map((a) => Ot([s[0][a], s[1][a], s[2][a]])).filter((a) => !!a);
}
function Ve(t, e, n, s) {
  const a = e.min.map((c, u) => (c + e.max[u]) / 2), i = K(T(e.max, e.min)), o = Math.max(n * 10, i / 50), r = (c) => [0, 1, 2].map(
    (u) => c.reduce((g, x) => g + x[u], 0) / c.length
  );
  let d = [{ hits: t, limits: [] }], f = !1;
  for (let c = 0; c < 12; c++) {
    const u = [];
    let g = !1;
    for (const x of d) {
      if (x.hits.length < 2) {
        u.push(x);
        continue;
      }
      if (u.length + d.length >= 64) {
        f = !0, u.push(x);
        continue;
      }
      const M = r(x.hits), E = [
        M,
        a,
        ...[0, 0.25, 0.5, 0.75].map(
          (y) => x.hits[Math.floor(y * (x.hits.length - 1))]
        )
      ], F = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ], D = Zt(x.hits, M);
      D[0] && F.push(D[0]);
      const $ = (y) => {
        let w = -1 / 0, z = 1 / 0;
        for (const A of x.hits) {
          const G = V(A, y);
          G > w && (w = G), G < z && (z = G);
        }
        return w - z;
      }, C = (y) => Math.max(
        0,
        ...D.filter((w) => Math.abs(V(w, y)) < 0.9).map((w) => $(w))
      ), S = (y) => {
        const w = x.hits.map((A) => V(A, y)).sort((A, G) => A - G), z = [];
        for (let A = 1; A < w.length; A++) {
          const G = w[A] - w[A - 1];
          G > o && z.push({ at: (w[A] + w[A - 1]) / 2, size: G });
        }
        return z.sort((A, G) => G.size - A.size);
      };
      let q, m = 0;
      for (const y of F) {
        const w = S(y);
        !w.length || w[0].size <= m || w[0].size <= C(y) || (m = w[0].size, s(y, w[0].at, E) && (q = { n: y, cuts: [w[0].at] }));
      }
      if (!q) {
        u.push(x);
        continue;
      }
      g = !0;
      const { n: Z, cuts: L } = q, j = Array.from({ length: L.length + 1 }, () => []);
      for (const y of x.hits) {
        const w = V(y, Z);
        let z = 0;
        for (; z < L.length && w >= L[z]; ) z++;
        j[z].push(y);
      }
      j.forEach(
        (y, w) => u.push({
          hits: y,
          limits: [
            ...x.limits,
            {
              n: Z,
              from: w ? L[w - 1] : -1 / 0,
              to: w < L.length ? L[w] : 1 / 0
            }
          ]
        })
      );
    }
    if (d = u, g && c === 11 && (f = !0), !g) break;
  }
  return { zones: d, crowded: f };
}
function xe(t, e, n) {
  return n.every(({ n: s, from: a, to: i }) => {
    let o = 1 / 0, r = -1 / 0;
    for (let d = 0; d < 9; d += 3) {
      const f = St(t, e, d) * s[0] + St(t, e, d + 1) * s[1] + St(t, e, d + 2) * s[2];
      f < o && (o = f), f > r && (r = f);
    }
    return r >= a && o <= i;
  });
}
function ye(t, e, n, s, a, i, o, r, d, f, c, u = !1) {
  let g = !1;
  const x = (L) => {
    let j = -1 / 0, y = 1 / 0;
    const w = (z) => {
      z > j && (j = z), z < y && (y = z);
    };
    for (const z of d) w(V(z, L));
    for (const [z, A, G] of [
      [t, n, 1],
      [e, s, 0]
    ]) {
      const R = Math.max(1, Math.floor(A.length / 32));
      R > 1 && (g = !0);
      for (let v = 0; v < A.length; v += R)
        for (const O of gt(z, A[v])) c(G, O) && w(V(O, L));
    }
    return Number.isFinite(j) && Number.isFinite(y) ? j - y : 0;
  }, M = (L) => {
    let j = 1 / 0, y = -1 / 0;
    for (let w = 0; w < 8; w++) {
      const z = (w & 1 ? o.max[0] : o.min[0]) * L[0] + (w & 2 ? o.max[1] : o.min[1]) * L[1] + (w & 4 ? o.max[2] : o.min[2]) * L[2];
      z < j && (j = z), z > y && (y = z);
    }
    return [j, y];
  }, E = (L, j, y, w, z) => {
    let A = 1 / 0, G = -1 / 0;
    for (const R of j) {
      let v = 1 / 0, O = -1 / 0;
      for (let H = 0; H < 9; H += 3) {
        const W = St(L, R, H) * y[0] + St(L, R, H + 1) * y[1] + St(L, R, H + 2) * y[2];
        W < v && (v = W), W > O && (O = W);
      }
      O < w || v > z || (v < w && (v = w), O > z && (O = z), v < A && (A = v), O > G && (G = O));
    }
    return A === 1 / 0 ? void 0 : [A, G];
  };
  if (o.min.some((L, j) => o.max[j] - L <= 0))
    return { width: 0, thin: !1, approximate: !1 };
  const F = Math.ceil((n.length + s.length) / 4096), D = [
    ...a,
    ...F > 1 ? i.filter((L, j) => j < 3 || j % F === 0) : i
  ];
  F > 1 && D.length < a.length + i.length && (g = !0);
  const $ = (L, j, y, w, z) => {
    const A = (v) => jt(r, y, v - V(r, y));
    if (!j) return c(L, A((w + z) / 2)) ? [w, z] : void 0;
    let [G, R] = j;
    return G > w && c(L, A((w + G) / 2)) && (G = w), R < z && c(L, A((R + z) / 2)) && (R = z), [G, R];
  }, C = (L, j) => L && j ? Math.min(L[1], j[1]) - Math.max(L[0], j[0]) : 0;
  let S = 1 / 0, q = !1, m = !1, Z = 0;
  for (let L = 0; L < D.length; L++) {
    const j = D[L], [y, w] = M(j), z = E(t, n, j, y, w), A = E(e, s, j, y, w);
    let G = C(z, A);
    if (G <= 0 && (Z++ < 32 ? G = C($(0, z, j, y, w), $(1, A, j, y, w)) : g = !0), u && d.length > 1) {
      let R = 1 / 0, v = -1 / 0;
      for (const O of d) {
        const H = V(O, j);
        R = Math.min(R, H), v = Math.max(v, H);
      }
      G = Math.max(G, v - R);
    }
    if (G <= f && (L < a.length && Z < 40 && (Z++, G = x(j)), G <= f)) {
      L < a.length && (m = !0);
      continue;
    }
    q = !0, G < S && (S = G);
  }
  return {
    width: q && Number.isFinite(S) ? S : 0,
    thin: m,
    approximate: g
  };
}
const At = (t) => Math.max(1e-10, Math.max(1, ...t.bounds.min.map(Math.abs), ...t.bounds.max.map(Math.abs)) * Number.EPSILON * 64);
async function Je(t, e, n) {
  const s = At(t), a = Et(t), i = { closed: !1, approximate: !1 }, o = new Uint32Array(a), r = new Uint8Array(a), d = new Uint8Array(a), f = new Uint8Array(a);
  for (let y = 0; y < a; y++) o[y] = y;
  const c = (y) => {
    if (o[y] !== y) {
      const w = o[y];
      o[y] = c(w), d[y] ^= d[w];
    }
    return o[y];
  }, u = (y, w, z) => {
    let A = c(y), G = c(w);
    const R = d[y] ^ d[w] ^ z;
    return A === G ? R === 0 : (r[A] < r[G] && ([A, G] = [G, A]), o[G] = A, d[G] = R, r[A] === r[G] && r[A]++, !0);
  }, g = /* @__PURE__ */ new Map(), x = [], M = /* @__PURE__ */ new Map(), E = a * 3, F = E * E <= Number.MAX_SAFE_INTEGER, D = (y, w) => F ? y * E + w : `${y},${w}`, $ = (y, w) => {
    const z = y.map((G, R) => Math.round((G - t.bounds.min[R]) / s)).join(",");
    let A = g.get(z);
    return A === void 0 && (A = g.size, g.set(z, A), x.push(w)), A;
  };
  for (let y = 0; y < a; y++) {
    y % 2048 === 0 && await e();
    const w = gt(t, y);
    if (K(xt(T(w[1], w[0]), T(w[2], w[0]))) <= s * s) continue;
    const z = w.map((A, G) => $(A, y * 3 + G));
    if (new Set(z).size === 3) {
      f[y] = 1;
      for (let A = 0; A < 3; A++) {
        const G = z[A], R = z[(A + 1) % 3], v = G < R, O = v ? D(G, R) : D(R, G), H = M.get(O);
        if (H === void 0) M.set(O, (y + 1) * (v ? 1 : -1));
        else {
          if (H === 0 || !u(y, Math.abs(H) - 1, +(H > 0 === v))) return i;
          M.set(O, 0);
        }
      }
    }
  }
  const C = (y) => {
    const w = x[y];
    return [0, 1, 2].map((z) => St(t, Math.floor(w / 3), w % 3 * 3 + z));
  }, S = [];
  for (const [y, w] of M) if (w !== 0) {
    const z = typeof y == "number" ? [Math.floor(y / E), y % E] : y.split(",").map(Number), A = C(z[0]), G = C(z[1]);
    S.push({ p: A, q: G, face: w, bounds: Bt([...A, ...G]) }), S.length % 2048 === 0 && await e();
  }
  g.clear(), M.clear(), x.length = 0;
  let q = !1;
  if (S.length) {
    const y = Math.max(s, Math.min(1e-5, n)), w = Xt(S, S.map((z, A) => A));
    for (let z = 0; z < S.length; z++) {
      z % 128 === 0 && await e();
      const A = S[z], G = T(A.q, A.p), R = K(G), v = Ot(G), O = [];
      for (const W of Lt(w, A.bounds, y)) {
        if (z === W) continue;
        const st = S[W], X = T(st.p, A.p), Pt = T(st.q, A.p), Y = V(X, v), Q = V(Pt, v), rt = Math.max(0, Math.min(Y, Q)), lt = Math.min(R, Math.max(Y, Q));
        if (lt - rt <= s) continue;
        const yt = Math.max(K(jt(X, v, -Y)), K(jt(Pt, v, -Q)));
        if (yt > y) continue;
        const at = Q > Y == (A.face > 0 == st.face > 0);
        if (!u(Math.abs(A.face) - 1, Math.abs(st.face) - 1, Number(at))) return i;
        yt > s && (q = !0), O.push([rt, lt]);
      }
      O.sort((W, st) => W[0] - st[0]);
      let H = 0;
      for (const [W, st] of O) {
        if (Math.abs(W - H) > s) return i;
        H = st;
      }
      if (Math.abs(H - R) > s) return i;
    }
  }
  const m = new Float64Array(a), Z = new Float64Array(a), L = t.bounds.min.map((y, w) => (y + t.bounds.max[w]) / 2);
  for (let y = 0; y < a; y++) {
    if (y % 2048 === 0 && await e(), !f[y]) continue;
    const w = c(y), z = gt(t, y);
    m[w] += (d[y] ? -1 : 1) * V(T(z[0], L), xt(T(z[1], L), T(z[2], L))) / 6, Z[w] += K(xt(T(z[1], z[0]), T(z[2], z[0]))) / 2;
  }
  let j = 0;
  for (let y = 0; y < a; y++) {
    if (Z[y] && Math.abs(m[y]) <= s * Z[y]) return i;
    j += Math.abs(m[y]);
  }
  return { closed: j > 0, approximate: q };
}
function Xe(t, e, n) {
  const s = T(e[1], e[0]), a = T(e[2], e[0]), i = xt(s, a), o = K(i);
  if (o < 1e-20 || Math.abs(V(T(t, e[0]), i)) / o > n) return !1;
  const r = T(t, e[0]), d = V(s, s), f = V(s, a), c = V(a, a), u = V(r, s), g = V(r, a), x = d * c - f * f;
  if (Math.abs(x) < 1e-30) return !1;
  const M = (u * c - g * f) / x, E = (g * d - u * f) / x, F = n / Math.max(K(s), K(a), n);
  return M >= -F && E >= -F && M + E <= 1 + F;
}
function Kt(t, e, n, s) {
  for (const a of Lt(n, { min: t, max: t }, s))
    if (Xe(t, gt(e, a), s)) return !0;
  return !1;
}
const qt = (t) => t.closed || t.interior === "winding";
function re(t, e, n, s = !1) {
  const a = (o) => {
    if (o.moment) return o.moment;
    const r = [0, 0, 0];
    if (o.ids)
      for (const d of o.ids) {
        const f = gt(e, d), c = xt(T(f[1], f[0]), T(f[2], f[0]));
        for (let u = 0; u < 3; u++) r[u] += c[u] / 2;
      }
    else {
      const d = a(o.left), f = a(o.right);
      for (let c = 0; c < 3; c++) r[c] = d[c] + f[c];
    }
    return o.moment = r;
  }, i = (o) => {
    const r = o.min.map((g, x) => (g + o.max[x]) / 2), d = T(r, t), f = K(d), c = K(T(o.max, o.min)) / 2;
    if (!s && f > c * 10 && f > 0)
      return V(a(o), d) / (f * f * f);
    if (!o.ids) return i(o.left) + i(o.right);
    let u = 0;
    for (const g of o.ids) {
      const x = gt(e, g), M = T(x[0], t), E = T(x[1], t), F = T(x[2], t), D = K(M), $ = K(E), C = K(F);
      !D || !$ || !C || (u += 2 * Math.atan2(V(M, xt(E, F)), D * $ * C + V(M, E) * C + V(E, F) * D + V(F, M) * $));
    }
    return u;
  };
  return i(n) / (4 * Math.PI);
}
async function Ke(t, e, n) {
  const s = At(t), a = (d) => !Kt(d, t, e, s) && Math.abs(re(d, t, e)) > 0.9, i = t.bounds.min.map((d, f) => (d + t.bounds.max[f]) / 2);
  if (a(i)) return !0;
  const o = Et(t), r = Math.max(1, Math.ceil(o / 32));
  for (let d = 0; d < o; d += r) {
    await n();
    const f = gt(t, d), c = Ot(xt(T(f[1], f[0]), T(f[2], f[0])));
    if (!c) continue;
    const u = [0, 1, 2].map((x) => (f[0][x] + f[1][x] + f[2][x]) / 3), g = Math.max(s * 8, Math.min(K(T(f[0], f[1])), K(T(f[1], f[2])), K(T(f[2], f[0]))) * 0.01);
    if (a(jt(u, c, g)) || a(jt(u, c, -g))) return !0;
  }
  return !1;
}
function Ut(t, e, n, s) {
  if (!qt(e) || t.some((u, g) => u < e.bounds.min[g] - s || u > e.bounds.max[g] + s) || Kt(t, e, n, s)) return !1;
  if (e.interior === "winding") {
    const u = Math.abs(re(t, e, n));
    return Math.abs(u - 0.5) < 0.05 ? Math.abs(re(t, e, n, !0)) > 0.5 : u > 0.5;
  }
  const a = [1, 0.371390676, 0.52999894], i = K(T(e.bounds.max, e.bounds.min)) * 3 + 1, o = jt(t, a, i), r = [], d = Bt([...t, ...o]);
  for (const u of Lt(n, d, s)) {
    const g = Yt(t, o, gt(e, u), s);
    if (g) {
      const x = K(T(g, t));
      x > s && r.push(x);
    }
  }
  r.sort((u, g) => u - g);
  let f = 0, c = -1 / 0;
  for (const u of r)
    u - c > s * 2 && (f++, c = u);
  return f % 2 === 1;
}
const _t = (t) => /отвод|тройник|муфт|фитинг|elbow|fitting|tee\b/i.test(t.name);
async function _e(t, e) {
  if (_t(t)) return;
  const n = Et(t), s = Math.max(1, Math.ceil(n / 4096)), a = t.bounds.min.map((j, y) => (j + t.bounds.max[y]) / 2), i = [], o = [];
  for (let j = 0; j < n; j += s) {
    j % (s * 256) === 0 && await e();
    const y = gt(t, j), w = xt(T(y[1], y[0]), T(y[2], y[0])), z = K(w);
    z && (i.push(...y), o.push({ n: w.map((A) => A / z), area: z }));
  }
  if (i.length < 12) return;
  let r = Zt(i, a)[0];
  const d = o.filter(({ n: j }) => Math.abs(V(j, r)) < 0.2);
  if (d.length < 4) return;
  const f = Zt(d.map(({ n: j }) => j), [0, 0, 0])[2];
  if (Math.abs(V(f, r)) < 0.98) return;
  r = f;
  const c = r.map(Math.abs).indexOf(Math.max(...r.map(Math.abs)));
  r[c] < 0 && (r = r.map((j) => -j));
  const u = Math.abs(r[0]) < 0.7 ? [1, 0, 0] : [0, 1, 0], g = Ot(xt(r, u)), x = xt(r, g), M = [1 / 0, 1 / 0, 1 / 0], E = [-1 / 0, -1 / 0, -1 / 0];
  for (const j of i) for (const [y, w] of [r, g, x].entries()) {
    const z = V(T(j, a), w);
    M[y] = Math.min(M[y], z), E[y] = Math.max(E[y], z);
  }
  const F = E[0] - M[0], D = Math.max(E[1] - M[1], E[2] - M[2]), $ = Math.min(E[1] - M[1], E[2] - M[2]);
  if ($ <= At(t) * 8 || F + At(t) < D * 4 || D > $ * 4) return;
  let C = 0, S = 0;
  const q = /* @__PURE__ */ new Set();
  for (const { n: j, area: y } of o) {
    const w = Math.abs(V(j, r));
    S += y, (w < 0.015 || w > 0.999) && (C += y), w < 0.015 && q.add(j.map((z) => Math.round(z * 100)).join(","));
  }
  if (C < S * 0.995) return;
  const m = [];
  for (let j = 0; j < i.length; j += 3) {
    const y = i.slice(j, j + 3).map((w) => V(T(w, a), r));
    m.push([Math.min(...y), Math.max(...y)]);
  }
  m.sort((j, y) => j[0] - y[0]);
  let Z = M[0];
  for (const [j, y] of m) {
    if (j > Z + At(t) * 4) return;
    Z = Math.max(Z, y);
  }
  const L = jt(jt(a, g, (M[1] + E[1]) / 2), x, (M[2] + E[2]) / 2);
  return {
    axis: r,
    centre: L,
    from: M[0],
    to: E[0],
    width: D,
    round: q.size >= 6 && D < $ * 1.2,
    sampled: s > 1
  };
}
async function tn(t, e) {
  if (_t(t) || !/кабел|труб|cable|pipe/i.test(t.name)) return [];
  const n = At(t), s = [], a = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), o = ($) => {
    const C = $.map((q, m) => Math.round((q - t.bounds.min[m]) / n)).join(",");
    let S = a.get(C);
    return S === void 0 && (S = s.length, s.push($), a.set(C, S)), S;
  };
  for (let $ = 0; $ < Et(t); $++) {
    $ % 1024 === 0 && await e();
    const C = gt(t, $).map(o);
    for (let S = 0; S < 3; S++) {
      const q = Math.min(C[S], C[(S + 1) % 3]), m = Math.max(C[S], C[(S + 1) % 3]);
      q !== m && i.set(`${q},${m}`, [q, m, K(T(s[q], s[m]))]);
    }
  }
  const r = [...i.values()].map(($) => $[2]).filter(($) => $ > n).sort(($, C) => $ - C);
  if (!r.length) return [];
  const d = r[Math.floor(r.length * 0.1)] * 1.25, f = Int32Array.from({ length: s.length }, ($, C) => C), c = ($) => {
    for (; f[$] !== $; )
      f[$] = f[f[$]], $ = f[$];
    return $;
  };
  let u = 0;
  for (const [$, C, S] of i.values())
    ++u % 4096 === 0 && await e(), S <= d && (f[c(C)] = c($));
  const g = /* @__PURE__ */ new Map();
  for (let $ = 0; $ < s.length; $++) {
    const C = c($), S = g.get(C);
    S ? S.push(s[$]) : g.set(C, [s[$]]);
  }
  const x = /* @__PURE__ */ new Map();
  for (const [$, C] of g) {
    if (await e(), C.length < 6 || C.length > 256) continue;
    const S = C[0], q = [0, 1, 2].map((j) => S[j] + C.reduce((y, w) => y + w[j] - S[j], 0) / C.length), m = C.map((j) => K(T(j, q))), Z = Math.max(...m), L = Zt(C, q)[2];
    !L || Z <= n || Math.min(...m) < Z * 0.88 || C.some((j) => Math.abs(V(T(j, q), L)) > Math.max(n * 16, Z * 2e-3)) || x.set($, { centre: q, radius: Z, normal: L });
  }
  const M = /* @__PURE__ */ new Map();
  for (const [$, C] of i.values()) {
    ++u % 4096 === 0 && await e();
    const S = Math.min(c($), c(C)), q = Math.max(c($), c(C));
    if (S === q || !x.has(S) || !x.has(q)) continue;
    const m = `${S},${q}`, Z = M.get(m);
    Z ? Z.count++ : M.set(m, { a: S, b: q, count: 1 });
  }
  const E = /* @__PURE__ */ new Map();
  for (const { a: $, b: C, count: S } of M.values()) {
    const q = x.get($), m = x.get(C), Z = Ot(T(m.centre, q.centre));
    S < 6 || !Z || Math.min(q.radius, m.radius) < Math.max(q.radius, m.radius) * 0.8 || Math.abs(V(Z, q.normal)) < 0.5 || Math.abs(V(Z, m.normal)) < 0.5 || (E.set($, [...E.get($) || [], C]), E.set(C, [...E.get(C) || [], $]));
  }
  const F = /* @__PURE__ */ new Set(), D = [];
  for (const [$, C] of E) {
    if (C.length !== 1 || F.has($)) continue;
    let S = $, q = -1;
    const m = [];
    for (; !F.has(S); ) {
      F.add(S);
      const Z = E.get(S) || [];
      if (Z.length > 2) break;
      const L = Z.find((A) => A !== q);
      if (L === void 0 || F.has(L)) break;
      const j = x.get(S), y = x.get(L), w = T(y.centre, j.centre), z = K(w);
      z > n && m.push({
        axis: w.map((A) => A / z),
        centre: j.centre,
        from: 0,
        to: z,
        width: Math.max(j.radius, y.radius) * 2,
        round: !0,
        sampled: !0
      }), q = S, S = L;
    }
    m.length && D.push(m);
  }
  return D;
}
async function en(t, e) {
  const n = Et(t), s = Int32Array.from({ length: n }, (d, f) => f), a = new Uint8Array(n), i = /* @__PURE__ */ new Map(), o = At(t), r = (d) => {
    for (; s[d] !== d; )
      s[d] = s[s[d]], d = s[d];
    return d;
  };
  for (let d = 0; d < n; d++) {
    d % 2048 === 0 && await e();
    for (const f of gt(t, d)) {
      const c = f.map((M, E) => Math.round((M - t.bounds.min[E]) / o)).join(","), u = i.get(c);
      if (u === void 0) {
        i.set(c, d);
        continue;
      }
      let g = r(d), x = r(u);
      g !== x && (a[g] < a[x] && ([g, x] = [x, g]), s[x] = g, a[g] === a[x] && a[g]++);
    }
  }
  for (let d = 0; d < n; d++) s[d] = r(d);
  return s;
}
async function nn(t, e, n, s, a) {
  const { axis: i, centre: o } = t, r = Math.abs(i[0]) < 0.7 ? [1, 0, 0] : [0, 1, 0], d = Ot(xt(i, r)), f = xt(i, d), c = [1 / 0, 1 / 0, 1 / 0], u = [-1 / 0, -1 / 0, -1 / 0], g = At(e);
  for (let S = 0; S < Et(e); S++) {
    S % 2048 === 0 && await s();
    for (const q of gt(e, S)) for (const [m, Z] of [i, d, f].entries()) {
      const L = V(T(q, o), Z);
      c[m] = Math.min(c[m], L), u[m] = Math.max(u[m], L);
    }
  }
  if (u[1] - c[1] < t.width * 2.5 || u[2] - c[2] < t.width * 2.5) return [];
  const x = Math.max(1, u[0] - c[0]), M = jt(o, i, c[0] - x), E = jt(o, i, u[0] + x), F = [];
  let D = 0;
  for (const S of Lt(n, Bt([...M, ...E]), g)) {
    ++D % 256 === 0 && await s();
    const q = Yt(M, E, gt(e, S), g);
    q && F.push({ triangle: S, at: V(T(q, o), i) });
  }
  if (F.length < 2) return [];
  const $ = await a(), C = /* @__PURE__ */ new Map();
  for (const S of F) {
    const q = $[S.triangle], m = C.get(q);
    m ? (m[0] = Math.min(m[0], S.at), m[1] = Math.max(m[1], S.at)) : C.set(q, [S.at, S.at]);
  }
  return [...C].map(([S, [q, m]]) => ({ part: S, from: Math.max(t.from, q), to: Math.min(t.to, m) })).filter(({ from: S, to: q }) => q - S > g);
}
async function on(t, e, n, s, a) {
  let i = 0;
  const o = At(e);
  for (const r of t) {
    let d = 0;
    const f = /* @__PURE__ */ new Map();
    for (const c of r) {
      await s();
      for (const u of await nn(c, e, n, s, a)) {
        const g = f.get(u.part) || [];
        g.push([d + u.from - c.from, d + u.to - c.from]), f.set(u.part, g);
      }
      d += c.to - c.from;
    }
    for (const c of f.values()) {
      c.sort((x, M) => x[0] - M[0]);
      let u = c[0][0], g = c[0][1];
      for (const [x, M] of c.slice(1))
        x <= g + o * 4 ? g = Math.max(g, M) : (i = Math.max(i, g - u), u = x, g = M);
      i = Math.max(i, g - u);
    }
  }
  return i > o ? i * 1e3 : void 0;
}
function an(t, e, n) {
  const s = Ot(xt(T(e[1], e[0]), T(e[2], e[0])));
  if (!s) return [];
  if (t.some((i) => Math.abs(V(T(i, e[0]), s)) > n)) {
    const i = [];
    return Pe(t, e, n, i), i;
  }
  let a = t;
  for (let i = 0; i < 3 && a.length; i++) {
    const o = e[i], r = T(e[(i + 1) % 3], o), d = Ot(xt(s, r));
    if (!d) return [];
    const f = [];
    for (let c = 0; c < a.length; c++) {
      const u = a[c], g = a[(c + 1) % a.length], x = V(T(u, o), d), M = V(T(g, o), d);
      x >= -n && f.push(u), x >= -n != M >= -n && f.push(jt(u, T(g, u), Math.max(0, Math.min(1, x / (x - M)))));
    }
    a = f;
  }
  return a;
}
async function sn(t, e, n, s, a, i) {
  const o = Math.max(At(e), At(n)), r = t.map(() => []), d = t.map((g) => {
    let x = 0;
    return g.map((M) => {
      const E = { p: M, offset: x };
      return x += M.to - M.from, E;
    });
  }), f = (g, x, M) => {
    let E = 0, F = g.length;
    for (; E < F; ) {
      const $ = E + F >> 1;
      g[$][1] < x - o * 4 ? E = $ + 1 : F = $;
    }
    let D = E;
    for (; D < g.length && g[D][0] <= M + o * 4; )
      x = Math.min(x, g[D][0]), M = Math.max(M, g[D][1]), D++;
    g.splice(E, D - E, [x, M]);
  };
  let c = 0;
  for (const [g, x] of zt(s, a, o)) {
    ++c % 256 === 0 && await i();
    const M = gt(e, g), E = gt(n, x);
    if (!Ce(M, E, o, !0)) continue;
    const F = an(M, E, o);
    if (!(F.length < 2))
      for (let D = 0; D < d.length; D++) for (const { p: $, offset: C } of d[D]) {
        const S = F.map((Z) => V(T(Z, $.centre), $.axis)), q = Math.max($.from, Math.min(...S)), m = Math.min($.to, Math.max(...S));
        m - q <= o || F.some((Z, L) => {
          const j = Math.max($.from, Math.min($.to, S[L]));
          return K(T(Z, jt($.centre, $.axis, j))) <= $.width * 0.7 + o;
        }) && f(r[D], C + q - $.from, C + m - $.from);
      }
  }
  let u = 0;
  for (const g of r) for (const [x, M] of g) u = Math.max(u, M - x);
  return u > o ? u * 1e3 : void 0;
}
async function rn(t, e, n, s, a) {
  const i = e.precision / 1e3;
  if (!Number.isFinite(i) || i <= 0)
    throw Error("Точность расчёта должна быть положительным числом.");
  const o = t.filter((v) => e.includeHidden || !v.hidden), r = o.filter((v) => Gt(v, e.a)), d = o.filter((v) => Gt(v, e.b));
  if (!r.length || !d.length) {
    const v = r.length ? "Б" : "А", O = r.length ? e.b : e.a;
    throw Error(`Выбор ${v}: ${$e(t, O, e.includeHidden)}`);
  }
  let f = performance.now();
  const c = async () => {
    if (s())
      throw Error("Расчёт отменён. Предыдущие результаты сохранены.");
    performance.now() - f > 16 && (await new Promise((v) => setTimeout(v, 0)), f = performance.now());
  }, u = /* @__PURE__ */ new Map(), g = (v) => {
    let O = u.get(v.id);
    return O || (O = se(
      v,
      Array.from({ length: Et(v) }, (H, W) => W)
    ), u.set(v.id, O)), O;
  }, x = /* @__PURE__ */ new Map(), M = /* @__PURE__ */ new Map(), E = /* @__PURE__ */ new Map(), F = async (v) => {
    let O = E.get(v.id);
    return O || (O = await tn(v, c), E.set(v.id, O)), O;
  }, D = /* @__PURE__ */ new Map(), $ = async (v) => {
    let O = D.get(v.id);
    return O || (O = await en(v, c), D.set(v.id, O)), O;
  }, C = async (v) => (M.has(v.id) || M.set(v.id, await _e(v, c)), M.get(v.id)), S = async (v) => {
    if (e.type !== "intersection") return v;
    let O = x.get(v.id);
    return O === void 0 && (O = await Je(v, c, i), !O.closed && await Ke(v, g(v), c) && (O = { closed: !1, approximate: !0, winding: !0 }), x.set(v.id, O)), O.winding ? { ...v, closed: !1, interior: "winding" } : O.closed === v.closed ? v : { ...v, closed: O.closed };
  }, q = /* @__PURE__ */ new Map(), m = async (v) => {
    let O = q.get(v.id);
    if (O !== void 0) return O;
    const H = [];
    for (let W = 0; W < Et(v); W++)
      H.push(
        [0, 3, 6].map(
          (st) => [0, 1, 2].map((X) => Math.round(St(v, W, st + X) / i)).join(",")
        ).sort().join(";")
      ), W % 9e3 === 0 && await c();
    return O = H.sort().join("|"), q.set(v.id, O), O;
  }, Z = [], L = new Set(r.map((v) => v.id)), j = new Set(d.map((v) => v.id)), y = Xt(
    d,
    d.map((v, O) => O)
  ), w = /* @__PURE__ */ new Map();
  let z = 0;
  const A = (v) => v.triangles.byteLength + (v.vertices?.byteLength || 0) + (v.indices?.byteLength || 0) + Et(v) * 32;
  async function G(v, O) {
    if (!a) return v;
    let H = w.get(v.id);
    if (H)
      return w.delete(v.id), w.set(v.id, H), H;
    for (const [W, st] of w)
      W !== O && z > 96 * 1024 * 1024 && (w.delete(W), z -= A(st), u.delete(W), D.delete(W), E.delete(W), q.delete(W));
    return H = await a(v.id), w.set(v.id, H), z += A(H), H;
  }
  let R = -1 / 0;
  for (let v = 0; v < r.length; v++) {
    const O = r[v];
    performance.now() - R > 150 && (R = performance.now(), n({
      phase: "Проверка пар",
      done: v,
      total: r.length,
      found: Z.length
    }));
    const H = [...Lt(y, O.bounds, i)];
    for (let W = 0; W < H.length; W++) {
      const st = H[W];
      performance.now() - R > 150 && (R = performance.now(), n({
        phase: `Проверка пар · A ${v + 1}/${r.length} · кандидаты ${W + 1}/${H.length}`,
        done: v,
        total: r.length,
        found: Z.length
      }));
      const X = d[st];
      if (await c(), O.id === X.id || !Qt(O.bounds, X.bounds, i) || e.ignoreSameModel && O.modelId === X.modelId || e.ignoreSameGroup && O.modelId === X.modelId && O.properties.Объект && O.properties.Объект === X.properties.Объект || e.equalProperty && O.properties[e.equalProperty] !== void 0 && O.properties[e.equalProperty] === X.properties[e.equalProperty] || O.id > X.id && L.has(X.id) && j.has(O.id)) continue;
      const Pt = Ze(O.id, X.id), Y = await S(await G(O)), Q = await S(await G(X, O.id));
      let rt, lt = "surface", yt = 0, at, Dt, ft, vt, ct;
      if (e.type === "duplicates") {
        if (Et(Y) !== Et(Q) || Y.bounds.min.some(
          (bt, ut) => Math.abs(bt - Q.bounds.min[ut]) > i || Math.abs(Y.bounds.max[ut] - Q.bounds.max[ut]) > i
        ))
          continue;
        await m(Y) === await m(Q) && (rt = Y.bounds.min.map((bt, ut) => (bt + Y.bounds.max[ut]) / 2), lt = "duplicate");
      } else {
        const bt = g(Y), ut = g(Q), tt = Math.max(
          1,
          ...Y.bounds.min.map(Math.abs),
          ...Y.bounds.max.map(Math.abs),
          ...Q.bounds.min.map(Math.abs),
          ...Q.bounds.max.map(Math.abs)
        ), it = Math.max(1e-10, tt * Number.EPSILON * 64), nt = {
          min: Y.bounds.min.map(
            (N, k) => Math.max(N, Q.bounds.min[k])
          ),
          max: Y.bounds.max.map(
            (N, k) => Math.min(N, Q.bounds.max[k])
          )
        }, $t = nt.min.map(
          (N, k) => (N + nt.max[k]) / 2
        ), Ft = new We(), l = [];
        let p = 1, b = 0, h = 1 / 0, I = 0;
        for (const [N, k] of zt(bt, ut, i)) {
          const P = gt(Y, N), U = gt(Q, k);
          if (!Qt(Bt(P.flat()), Bt(U.flat()), i)) continue;
          const B = Ce(P, U, it, e.touching);
          if (B) {
            const J = K(T(B, $t));
            if ((!rt || J < h) && (rt = B, h = J), Ft.add(P), Ft.add(U), b++ % p === 0 && (Pe(P, U, it, l), l.length || l.push(B), l.length >= 8192)) {
              for (let _ = 0; _ * 2 < l.length; _++) l[_] = l[_ * 2];
              l.length = Math.ceil(l.length / 2), p *= 2;
            }
          }
          ++I % 256 === 0 && (performance.now() - R > 150 && (R = performance.now(), n({
            phase: `Геометрия пары · A ${v + 1}/${r.length}`,
            done: v,
            total: r.length,
            found: Z.length
          })), await c());
        }
        if (!rt && qt(Y) && qt(Q)) {
          const N = $t;
          Ut(N, Y, bt, it) && Ut(N, Q, ut, it) && (rt = N, lt = "contained");
        }
        if (!rt) {
          for (const [N, k, P] of [
            [Y, Q, ut],
            [Q, Y, bt]
          ])
            if (qt(k)) {
              for (let U = 0; U < Et(N) && !rt; U++) {
                const B = gt(N, U), J = B[0].map(
                  (_, ot) => (B[0][ot] + B[1][ot] + B[2][ot]) / 3
                );
                for (const _ of [B[0], J])
                  if (Ut(_, k, P, it)) {
                    rt = _, lt = "contained";
                    break;
                  }
                await c();
              }
              if (rt) break;
            }
        }
        if (rt) {
          const N = (et, dt) => [...Lt(dt, nt, i)].filter(
            (kt) => Qt(Bt(gt(et, kt).flat()), nt, i)
          ), k = N(Y, bt), P = N(Q, ut);
          lt !== "surface" && (Ft.addFrom(Y, k), Ft.addFrom(Q, P)), await c();
          const U = nt.min.map(
            (et, dt) => (et + nt.max[dt]) / 2
          ), B = (et, dt) => et === 0 ? Ut(dt, Y, bt, it) : Ut(dt, Q, ut, it), J = (et, dt) => et === 0 ? Ut(dt, Y, bt, it) || Kt(dt, Y, bt, it) : Ut(dt, Q, ut, it) || Kt(dt, Q, ut, it);
          if (lt === "contained") {
            const et = Math.max(1, Math.ceil((k.length + P.length) / 4096));
            p = Math.max(p, et);
            const dt = /* @__PURE__ */ new Set();
            for (const [kt, pt, mt] of [[Y, k, 1], [Q, P, 0]]) {
              for (let wt = 0; wt < pt.length; wt += et) {
                wt % (et * 32) === 0 && await c();
                for (const It of gt(kt, pt[wt])) {
                  const Nt = It.join(",");
                  dt.has(Nt) || (dt.add(Nt), J(mt, It) && l.push(It));
                }
              }
              dt.clear();
            }
            if (Y.interior === "winding" || Q.interior === "winding") {
              const kt = (pt, mt) => {
                let wt = 1, It = 0;
                for (; pt; pt = Math.floor(pt / mt))
                  wt /= mt, It += wt * (pt % mt);
                return It;
              };
              for (let pt = 1; pt <= 2048; pt++) {
                pt % 16 === 0 && await c();
                const mt = [2, 3, 5].map((wt, It) => nt.min[It] + kt(pt, wt) * (nt.max[It] - nt.min[It]));
                B(0, mt) && B(1, mt) && l.push(mt);
              }
            }
          }
          const _ = (et, dt, kt) => qt(Y) && qt(Q) && kt.every((pt) => {
            const mt = jt(pt, et, dt - V(pt, et));
            return !J(0, mt) || !J(1, mt);
          }), ot = () => [0, 1, 2].map(
            (et) => l.reduce((dt, kt) => dt + kt[et], 0) / l.length
          ), Wt = lt === "surface" && l.length > 2 ? Zt(l, ot())[2] : void 0, Tt = Wt ? ye(
            Y,
            Q,
            k,
            P,
            [Wt],
            [],
            nt,
            ot(),
            l,
            it,
            B
          ) : void 0, de = !Tt || Tt.width > it, pe = !de && !!Tt?.approximate, fe = !qt(Y) || !qt(Q);
          if (!fe && !de && !pe && (lt = "touch"), lt === "touch" && !e.touching) continue;
          const { zones: De, crowded: Fe } = Ve(l, nt, i, _), Ue = Ft.values();
          let Ht = 0, ue = !pe, me = Fe || p > 1 || !!Tt?.approximate || !!x.get(Y.id)?.approximate || !!x.get(Q.id)?.approximate;
          for (const et of lt === "touch" ? [] : De) {
            const dt = et.limits.length ? k.filter((wt) => xe(Y, wt, et.limits)) : k, kt = et.limits.length ? P.filter((wt) => xe(Q, wt, et.limits)) : P, pt = et.hits.length ? [0, 1, 2].map(
              (wt) => et.hits.reduce((It, Nt) => It + Nt[wt], 0) / et.hits.length
            ) : U, mt = ye(
              Y,
              Q,
              dt,
              kt,
              et.hits.length > 2 ? Zt(et.hits, pt) : [],
              Ue,
              nt,
              pt,
              et.hits,
              it,
              B,
              lt === "contained"
            );
            mt.thin && (ue = !1), mt.approximate && (me = !0), mt.width > Ht && (Ht = mt.width), await c();
          }
          if (Ht *= 1e3, lt === "touch" ? at = void 0 : fe ? at = "unmeasurable" : Ht <= 0 || !ue ? at = "tolerance" : me && (at = "approximate"), yt = lt === "touch" || at === "unmeasurable" || at === "tolerance" ? 0 : Ht, !_t(Y) && !_t(Q)) {
            const et = await C(Y), dt = await C(Q);
            for (const [kt, pt, mt, wt, It] of [[et, Y, Q, dt, ut], [dt, Q, Y, et, bt]]) {
              if (wt?.round && /труб|pipe/i.test(mt.name)) continue;
              const Nt = kt ? [[kt]] : await F(pt);
              if (!Nt.length) continue;
              const he = await sn(Nt, pt, mt, pt === Y ? bt : ut, It, c);
              if (he !== void 0 && (ct = Math.max(ct ?? 0, he)), lt === "touch") continue;
              const ee = await on(Nt, mt, It, c, () => $(mt));
              ee === void 0 || ee <= (ft ?? 0) || (ft = ee, vt = pt.id, kt || (at = at || "approximate"));
            }
            ft !== void 0 && (Dt = at === "unmeasurable" || at === "tolerance" ? void 0 : yt, yt = Math.max(yt, ft), (at === "unmeasurable" || at === "tolerance" || et?.sampled || dt?.sampled) && (at = "approximate"));
          }
          await c();
        }
        if (rt && !Ae({ kind: lt, depth: at, penetrationMm: yt }, e.minPenetration, e.precision))
          continue;
      }
      if (rt && (Z.push({
        id: Pt,
        a: be(Y),
        b: be(Q),
        point: rt,
        kind: lt,
        state: "new",
        note: "",
        assignee: "",
        firstSeen: "",
        lastSeen: "",
        penetrationMm: yt,
        ...ft !== void 0 ? { axialPenetrationMm: ft, axialElementId: vt, overlapThicknessMm: Dt } : {},
        ...ct !== void 0 ? { contactLengthMm: ct } : {},
        ...at ? { depth: at } : {}
      }), Z.length >= 5e4))
        throw Error(
          "Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат."
        );
    }
  }
  return n({
    phase: "Готово",
    done: r.length,
    total: r.length,
    found: Z.length
  }), Z;
}
const Oe = '(function(){"use strict";const rn=(n,t,e)=>n.kind==="duplicate"||n.depth==="unmeasurable"||n.depth==="tolerance"||(n.penetrationMm??0)+e>=t,Wt=({triangles:n,vertices:t,indices:e,triangleCount:l,closed:s,bounds:f,...a})=>a;function Ut(n,t){return t.exclude.includes(n.id)?!1:t.include.includes(n.id)?!0:!(t.manualOnly||t.modelsMode==="selected"&&!t.models.includes(n.modelId)||t.modelsMode===void 0&&t.models.length&&!t.models.includes(n.modelId))}function fn(n,t,e){if(!t.manualOnly&&t.modelsMode==="selected"&&!t.models.length&&!t.include.length)return"Не отмечены модели. Выберите файлы или включите «Все модели».";let l=0;for(const s of n)if(Ut(s,t)&&(l++,e||!s.hidden))return;return l?`Все выбранные элементы (${l}) скрыты. Покажите их в модели или включите «Включать скрытые элементы» на вкладке «Правила».`:t.manualOnly?"Ручная выборка пуста. Выделите элементы в 3D заново или нажмите «Сбросить ручной выбор».":t.exclude.length?"Нет элементов после ручных исключений. Проверьте исключения или нажмите «Сбросить ручной выбор».":"В выбранных моделях нет доступных элементов. Обновите модели и проверьте состав выборки."}const cn=(n,t)=>JSON.stringify([n,t].sort()),q=(n,t)=>[n[0]-t[0],n[1]-t[1],n[2]-t[2]],tt=(n,t,e=1)=>[n[0]+t[0]*e,n[1]+t[1]*e,n[2]+t[2]*e],N=(n,t)=>n[0]*t[0]+n[1]*t[1]+n[2]*t[2],J=(n,t)=>[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]],L=n=>Math.hypot(...n),Mt=n=>{const t=L(n);return t>1e-20?[n[0]/t,n[1]/t,n[2]/t]:void 0},ut=n=>n.triangleCount??(n.indices?n.indices.length/3:n.triangles.length/9),nt=(n,t,e)=>n.indices&&n.vertices?n.vertices[n.indices[t*3+Math.floor(e/3)]*3+e%3]:n.triangles[t*9+e],X=(n,t)=>[0,3,6].map(e=>[nt(n,t,e),nt(n,t,e+1),nt(n,t,e+2)]);function jt(n){const t=[1/0,1/0,1/0],e=[-1/0,-1/0,-1/0];for(let l=0;l<n.length;l++){const s=l%3;t[s]=Math.min(t[s],n[l]),e[s]=Math.max(e[s],n[l])}return{min:t,max:e}}const Et=(n,t,e)=>n.min.every((l,s)=>l<=t.max[s]+e&&n.max[s]>=t.min[s]-e);function Dt(n,t){const e={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const o of t)for(let r=0;r<9;r++){const u=r%3,i=nt(n,o,r);e.min[u]=Math.min(e.min[u],i),e.max[u]=Math.max(e.max[u],i)}if(t.length<=12)return{...e,ids:t};const l=e.max.map((o,r)=>o-e.min[r]),s=l.indexOf(Math.max(...l)),f=o=>nt(n,o,s)+nt(n,o,s+3)+nt(n,o,s+6);t.sort((o,r)=>f(o)-f(r));const a=t.length>>1;return{...e,left:Dt(n,t.slice(0,a)),right:Dt(n,t.slice(a))}}function*xt(n,t,e){Et(n,t,e)&&(n.ids?yield*n.ids:(yield*xt(n.left,t,e),yield*xt(n.right,t,e)))}function*dt(n,t,e){if(Et(n,t,e)){if(n.ids&&t.ids){for(const l of n.ids)for(const s of t.ids)yield[l,s];return}if(n.ids){yield*dt(n,t.left,e),yield*dt(n,t.right,e);return}if(t.ids){yield*dt(n.left,t,e),yield*dt(n.right,t,e);return}yield*dt(n.left,t.left,e),yield*dt(n.left,t.right,e),yield*dt(n.right,t.left,e),yield*dt(n.right,t.right,e)}}function $t(n,t){const e={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const a of t)for(let o=0;o<3;o++)e.min[o]=Math.min(e.min[o],n[a].bounds.min[o]),e.max[o]=Math.max(e.max[o],n[a].bounds.max[o]);if(t.length<=16)return{...e,ids:t};const l=e.max.map((a,o)=>a-e.min[o]),s=l.indexOf(Math.max(...l));t.sort((a,o)=>n[a].bounds.min[s]+n[a].bounds.max[s]-(n[o].bounds.min[s]+n[o].bounds.max[s]));const f=t.length>>1;return{...e,left:$t(n,t.slice(0,f)),right:$t(n,t.slice(f))}}function qt(n,t,e,l){const s=q(t,n),f=q(e[1],e[0]),a=q(e[2],e[0]),o=J(s,a),r=N(f,o);if(Math.abs(r)<=1e-12*L(s)*L(f)*L(a))return;const u=1/r,i=q(n,e[0]),p=N(i,o)*u,h=J(i,f),d=N(s,h)*u,x=N(a,h)*u,I=l/Math.max(L(f),L(a),l);if(p>=-I&&d>=-I&&p+d<=1+I&&x>=-I&&x<=1+I)return tt(n,s,Math.max(0,Math.min(1,x)))}function ln(n,t,e,l){const s=e.map(Math.abs).indexOf(Math.max(...e.map(Math.abs))),f=[0,1,2].filter(r=>r!==s),a=(r,u,i)=>(u[f[0]]-r[f[0]])*(i[f[1]]-r[f[1]])-(u[f[1]]-r[f[1]])*(i[f[0]]-r[f[0]]),o=(r,u)=>{const i=u.map((p,h)=>a(p,u[(h+1)%3],r));return i.every(p=>p>=-l*L(e))||i.every(p=>p<=l*L(e))};for(const r of n)if(o(r,t))return r;for(const r of t)if(o(r,n))return r;for(let r=0;r<3;r++)for(let u=0;u<3;u++){const i=n[r],p=n[(r+1)%3],h=t[u],d=t[(u+1)%3],x=q(p,i),I=q(d,h),O=x[f[0]]*I[f[1]]-x[f[1]]*I[f[0]];if(Math.abs(O)<1e-18)continue;const z=q(h,i),y=(z[f[0]]*I[f[1]]-z[f[1]]*I[f[0]])/O,P=(z[f[0]]*x[f[1]]-z[f[1]]*x[f[0]])/O;if(y>=0&&y<=1&&P>=0&&P<=1)return tt(i,x,y)}}function Xt(n,t,e,l){for(let s=0;s<3;s++){const f=qt(n[s],n[(s+1)%3],t,e);f&&l.push(f);const a=qt(t[s],t[(s+1)%3],n,e);a&&l.push(a)}}function Jt(n,t,e,l){const s=J(q(n[1],n[0]),q(n[2],n[0])),f=J(q(t[1],t[0]),q(t[2],t[0])),a=L(s),o=L(f);if(a<1e-20||o<1e-20)return;const r=t.map(i=>N(q(i,n[0]),s)/a),u=n.map(i=>N(q(i,t[0]),f)/o);if(!(r.every(i=>i>e)||r.every(i=>i<-e)||u.every(i=>i>e)||u.every(i=>i<-e))){if(r.every(i=>Math.abs(i)<=e)&&u.every(i=>Math.abs(i)<=e))return l?ln(n,t,s,e):void 0;if(!(!l&&(!(Math.min(...r)<-e&&Math.max(...r)>e)||!(Math.min(...u)<-e&&Math.max(...u)>e))))for(let i=0;i<3;i++){const p=qt(n[i],n[(i+1)%3],t,e);if(p)return p;const h=qt(t[i],t[(i+1)%3],n,e);if(h)return h}}}class un{world=[[1,0,0],[0,1,0],[0,0,1]];items=new Map;step=1e4;key(t){return t.map(e=>Math.round(e*this.step)).join(",")}add(t){const e=Mt(J(q(t[1],t[0]),q(t[2],t[0])));if(!e)return;const s=e[0]<-1e-9||Math.abs(e[0])<=1e-9&&(e[1]<-1e-9||Math.abs(e[1])<=1e-9&&e[2]<0)?[-e[0],-e[1],-e[2]]:[e[0],e[1],e[2]],f=this.key(s);for(this.items.has(f)||this.items.set(f,s);this.items.size>512&&this.step>10;){this.step/=10;const a=new Map;for(const o of this.items.values()){const r=this.key(o);a.has(r)||a.set(r,o)}this.items=a}}addFrom(t,e){for(const l of e)this.add(X(t,l))}values(){return[...this.world,...[...this.items].sort((t,e)=>t[0]<e[0]?-1:1).map(([,t])=>t)]}}function Pt(n,t){const e=[[0,0,0],[0,0,0],[0,0,0]];for(const s of n){const f=[s[0]-t[0],s[1]-t[1],s[2]-t[2]];for(let a=0;a<3;a++)for(let o=0;o<3;o++)e[a][o]+=f[a]*f[o]}const l=[[1,0,0],[0,1,0],[0,0,1]];for(let s=0;s<12;s++){let f=0;for(let a=0;a<3;a++)for(let o=a+1;o<3;o++)f+=e[a][o]*e[a][o];if(f<=1e-30)break;for(let a=0;a<3;a++)for(let o=a+1;o<3;o++){if(Math.abs(e[a][o])<=1e-30)continue;const r=(e[o][o]-e[a][a])/(2*e[a][o]),u=(r>=0?1:-1)/(Math.abs(r)+Math.sqrt(r*r+1)),i=1/Math.sqrt(u*u+1),p=u*i;for(const h of[e,l])for(let d=0;d<3;d++){const x=h[d][a],I=h[d][o];h[d][a]=i*x-p*I,h[d][o]=p*x+i*I}for(let h=0;h<3;h++){const d=e[a][h],x=e[o][h];e[a][h]=i*d-p*x,e[o][h]=p*d+i*x}}}return[0,1,2].sort((s,f)=>e[f][f]-e[s][s]).map(s=>Mt([l[0][s],l[1][s],l[2][s]])).filter(s=>!!s)}function hn(n,t,e,l){const s=t.min.map((i,p)=>(i+t.max[p])/2),f=L(q(t.max,t.min)),a=Math.max(e*10,f/50),o=i=>[0,1,2].map(p=>i.reduce((h,d)=>h+d[p],0)/i.length);let r=[{hits:n,limits:[]}],u=!1;for(let i=0;i<12;i++){const p=[];let h=!1;for(const d of r){if(d.hits.length<2){p.push(d);continue}if(p.length+r.length>=64){u=!0,p.push(d);continue}const x=o(d.hits),I=[x,s,...[0,.25,.5,.75].map(c=>d.hits[Math.floor(c*(d.hits.length-1))])],O=[[1,0,0],[0,1,0],[0,0,1]],z=Pt(d.hits,x);z[0]&&O.push(z[0]);const y=c=>{let m=-1/0,M=1/0;for(const v of d.hits){const S=N(v,c);S>m&&(m=S),S<M&&(M=S)}return m-M},P=c=>Math.max(0,...z.filter(m=>Math.abs(N(m,c))<.9).map(m=>y(m))),b=c=>{const m=d.hits.map(v=>N(v,c)).sort((v,S)=>v-S),M=[];for(let v=1;v<m.length;v++){const S=m[v]-m[v-1];S>a&&M.push({at:(m[v]+m[v-1])/2,size:S})}return M.sort((v,S)=>S.size-v.size)};let A,_=0;for(const c of O){const m=b(c);!m.length||m[0].size<=_||m[0].size<=P(c)||(_=m[0].size,l(c,m[0].at,I)&&(A={n:c,cuts:[m[0].at]}))}if(!A){p.push(d);continue}h=!0;const{n:$,cuts:E}=A,w=Array.from({length:E.length+1},()=>[]);for(const c of d.hits){const m=N(c,$);let M=0;for(;M<E.length&&m>=E[M];)M++;w[M].push(c)}w.forEach((c,m)=>p.push({hits:c,limits:[...d.limits,{n:$,from:m?E[m-1]:-1/0,to:m<E.length?E[m]:1/0}]}))}if(r=p,h&&i===11&&(u=!0),!h)break}return{zones:r,crowded:u}}function Rt(n,t,e){return e.every(({n:l,from:s,to:f})=>{let a=1/0,o=-1/0;for(let r=0;r<9;r+=3){const u=nt(n,t,r)*l[0]+nt(n,t,r+1)*l[1]+nt(n,t,r+2)*l[2];u<a&&(a=u),u>o&&(o=u)}return o>=s&&a<=f})}function Yt(n,t,e,l,s,f,a,o,r,u,i,p=!1){let h=!1;const d=E=>{let w=-1/0,c=1/0;const m=M=>{M>w&&(w=M),M<c&&(c=M)};for(const M of r)m(N(M,E));for(const[M,v,S]of[[n,e,1],[t,l,0]]){const C=Math.max(1,Math.floor(v.length/32));C>1&&(h=!0);for(let g=0;g<v.length;g+=C)for(const j of X(M,v[g]))i(S,j)&&m(N(j,E))}return Number.isFinite(w)&&Number.isFinite(c)?w-c:0},x=E=>{let w=1/0,c=-1/0;for(let m=0;m<8;m++){const M=(m&1?a.max[0]:a.min[0])*E[0]+(m&2?a.max[1]:a.min[1])*E[1]+(m&4?a.max[2]:a.min[2])*E[2];M<w&&(w=M),M>c&&(c=M)}return[w,c]},I=(E,w,c,m,M)=>{let v=1/0,S=-1/0;for(const C of w){let g=1/0,j=-1/0;for(let U=0;U<9;U+=3){const H=nt(E,C,U)*c[0]+nt(E,C,U+1)*c[1]+nt(E,C,U+2)*c[2];H<g&&(g=H),H>j&&(j=H)}j<m||g>M||(g<m&&(g=m),j>M&&(j=M),g<v&&(v=g),j>S&&(S=j))}return v===1/0?void 0:[v,S]};if(a.min.some((E,w)=>a.max[w]-E<=0))return{width:0,thin:!1,approximate:!1};const O=Math.ceil((e.length+l.length)/4096),z=[...s,...O>1?f.filter((E,w)=>w<3||w%O===0):f];O>1&&z.length<s.length+f.length&&(h=!0);const y=(E,w,c,m,M)=>{const v=g=>tt(o,c,g-N(o,c));if(!w)return i(E,v((m+M)/2))?[m,M]:void 0;let[S,C]=w;return S>m&&i(E,v((m+S)/2))&&(S=m),C<M&&i(E,v((C+M)/2))&&(C=M),[S,C]},P=(E,w)=>E&&w?Math.min(E[1],w[1])-Math.max(E[0],w[0]):0;let b=1/0,A=!1,_=!1,$=0;for(let E=0;E<z.length;E++){const w=z[E],[c,m]=x(w),M=I(n,e,w,c,m),v=I(t,l,w,c,m);let S=P(M,v);if(S<=0&&($++<32?S=P(y(0,M,w,c,m),y(1,v,w,c,m)):h=!0),p&&r.length>1){let C=1/0,g=-1/0;for(const j of r){const U=N(j,w);C=Math.min(C,U),g=Math.max(g,U)}S=Math.max(S,g-C)}if(S<=u&&(E<s.length&&$<40&&($++,S=d(w)),S<=u)){E<s.length&&(_=!0);continue}A=!0,S<b&&(b=S)}return{width:A&&Number.isFinite(b)?b:0,thin:_,approximate:h}}const mt=n=>Math.max(1e-10,Math.max(1,...n.bounds.min.map(Math.abs),...n.bounds.max.map(Math.abs))*Number.EPSILON*64);async function mn(n,t,e){const l=mt(n),s=ut(n),f={closed:!1,approximate:!1},a=new Uint32Array(s),o=new Uint8Array(s),r=new Uint8Array(s),u=new Uint8Array(s);for(let c=0;c<s;c++)a[c]=c;const i=c=>{if(a[c]!==c){const m=a[c];a[c]=i(m),r[c]^=r[m]}return a[c]},p=(c,m,M)=>{let v=i(c),S=i(m);const C=r[c]^r[m]^M;return v===S?C===0:(o[v]<o[S]&&([v,S]=[S,v]),a[S]=v,r[S]=C,o[v]===o[S]&&o[v]++,!0)},h=new Map,d=[],x=new Map,I=s*3,O=I*I<=Number.MAX_SAFE_INTEGER,z=(c,m)=>O?c*I+m:`${c},${m}`,y=(c,m)=>{const M=c.map((S,C)=>Math.round((S-n.bounds.min[C])/l)).join(",");let v=h.get(M);return v===void 0&&(v=h.size,h.set(M,v),d.push(m)),v};for(let c=0;c<s;c++){c%2048===0&&await t();const m=X(n,c);if(L(J(q(m[1],m[0]),q(m[2],m[0])))<=l*l)continue;const M=m.map((v,S)=>y(v,c*3+S));if(new Set(M).size===3){u[c]=1;for(let v=0;v<3;v++){const S=M[v],C=M[(v+1)%3],g=S<C,j=g?z(S,C):z(C,S),U=x.get(j);if(U===void 0)x.set(j,(c+1)*(g?1:-1));else{if(U===0||!p(c,Math.abs(U)-1,+(U>0===g)))return f;x.set(j,0)}}}}const P=c=>{const m=d[c];return[0,1,2].map(M=>nt(n,Math.floor(m/3),m%3*3+M))},b=[];for(const[c,m]of x)if(m!==0){const M=typeof c=="number"?[Math.floor(c/I),c%I]:c.split(",").map(Number),v=P(M[0]),S=P(M[1]);b.push({p:v,q:S,face:m,bounds:jt([...v,...S])}),b.length%2048===0&&await t()}h.clear(),x.clear(),d.length=0;let A=!1;if(b.length){const c=Math.max(l,Math.min(1e-5,e)),m=$t(b,b.map((M,v)=>v));for(let M=0;M<b.length;M++){M%128===0&&await t();const v=b[M],S=q(v.q,v.p),C=L(S),g=Mt(S),j=[];for(const H of xt(m,v.bounds,c)){if(M===H)continue;const rt=b[H],et=q(rt.p,v.p),Tt=q(rt.q,v.p),F=N(et,g),T=N(Tt,g),V=Math.max(0,Math.min(F,T)),R=Math.min(C,Math.max(F,T));if(R-V<=l)continue;const yt=Math.max(L(tt(et,g,-F)),L(tt(Tt,g,-T)));if(yt>c)continue;const Y=T>F==(v.face>0==rt.face>0);if(!p(Math.abs(v.face)-1,Math.abs(rt.face)-1,Number(Y)))return f;yt>l&&(A=!0),j.push([V,R])}j.sort((H,rt)=>H[0]-rt[0]);let U=0;for(const[H,rt]of j){if(Math.abs(H-U)>l)return f;U=rt}if(Math.abs(U-C)>l)return f}}const _=new Float64Array(s),$=new Float64Array(s),E=n.bounds.min.map((c,m)=>(c+n.bounds.max[m])/2);for(let c=0;c<s;c++){if(c%2048===0&&await t(),!u[c])continue;const m=i(c),M=X(n,c);_[m]+=(r[c]?-1:1)*N(q(M[0],E),J(q(M[1],E),q(M[2],E)))/6,$[m]+=L(J(q(M[1],M[0]),q(M[2],M[0])))/2}let w=0;for(let c=0;c<s;c++){if($[c]&&Math.abs(_[c])<=l*$[c])return f;w+=Math.abs(_[c])}return{closed:w>0,approximate:A}}function dn(n,t,e){const l=q(t[1],t[0]),s=q(t[2],t[0]),f=J(l,s),a=L(f);if(a<1e-20||Math.abs(N(q(n,t[0]),f))/a>e)return!1;const o=q(n,t[0]),r=N(l,l),u=N(l,s),i=N(s,s),p=N(o,l),h=N(o,s),d=r*i-u*u;if(Math.abs(d)<1e-30)return!1;const x=(p*i-h*u)/d,I=(h*r-p*u)/d,O=e/Math.max(L(l),L(s),e);return x>=-O&&I>=-O&&x+I<=1+O}function Ot(n,t,e,l){for(const s of xt(e,{min:n,max:n},l))if(dn(n,X(t,s),l))return!0;return!1}const wt=n=>n.closed||n.interior==="winding";function Ht(n,t,e,l=!1){const s=a=>{if(a.moment)return a.moment;const o=[0,0,0];if(a.ids)for(const r of a.ids){const u=X(t,r),i=J(q(u[1],u[0]),q(u[2],u[0]));for(let p=0;p<3;p++)o[p]+=i[p]/2}else{const r=s(a.left),u=s(a.right);for(let i=0;i<3;i++)o[i]=r[i]+u[i]}return a.moment=o},f=a=>{const o=a.min.map((h,d)=>(h+a.max[d])/2),r=q(o,n),u=L(r),i=L(q(a.max,a.min))/2;if(!l&&u>i*10&&u>0)return N(s(a),r)/(u*u*u);if(!a.ids)return f(a.left)+f(a.right);let p=0;for(const h of a.ids){const d=X(t,h),x=q(d[0],n),I=q(d[1],n),O=q(d[2],n),z=L(x),y=L(I),P=L(O);!z||!y||!P||(p+=2*Math.atan2(N(x,J(I,O)),z*y*P+N(x,I)*P+N(I,O)*z+N(O,x)*y))}return p};return f(e)/(4*Math.PI)}async function pn(n,t,e){const l=mt(n),s=r=>!Ot(r,n,t,l)&&Math.abs(Ht(r,n,t))>.9,f=n.bounds.min.map((r,u)=>(r+n.bounds.max[u])/2);if(s(f))return!0;const a=ut(n),o=Math.max(1,Math.ceil(a/32));for(let r=0;r<a;r+=o){await e();const u=X(n,r),i=Mt(J(q(u[1],u[0]),q(u[2],u[0])));if(!i)continue;const p=[0,1,2].map(d=>(u[0][d]+u[1][d]+u[2][d])/3),h=Math.max(l*8,Math.min(L(q(u[0],u[1])),L(q(u[1],u[2])),L(q(u[2],u[0])))*.01);if(s(tt(p,i,h))||s(tt(p,i,-h)))return!0}return!1}function It(n,t,e,l){if(!wt(t)||n.some((p,h)=>p<t.bounds.min[h]-l||p>t.bounds.max[h]+l)||Ot(n,t,e,l))return!1;if(t.interior==="winding"){const p=Math.abs(Ht(n,t,e));return Math.abs(p-.5)<.05?Math.abs(Ht(n,t,e,!0))>.5:p>.5}const s=[1,.371390676,.52999894],f=L(q(t.bounds.max,t.bounds.min))*3+1,a=tt(n,s,f),o=[],r=jt([...n,...a]);for(const p of xt(e,r,l)){const h=qt(n,a,X(t,p),l);if(h){const d=L(q(h,n));d>l&&o.push(d)}}o.sort((p,h)=>p-h);let u=0,i=-1/0;for(const p of o)p-i>l*2&&(u++,i=p);return u%2===1}const Ft=n=>/отвод|тройник|муфт|фитинг|elbow|fitting|tee\\b/i.test(n.name);async function gn(n,t){if(Ft(n))return;const e=ut(n),l=Math.max(1,Math.ceil(e/4096)),s=n.bounds.min.map((w,c)=>(w+n.bounds.max[c])/2),f=[],a=[];for(let w=0;w<e;w+=l){w%(l*256)===0&&await t();const c=X(n,w),m=J(q(c[1],c[0]),q(c[2],c[0])),M=L(m);M&&(f.push(...c),a.push({n:m.map(v=>v/M),area:M}))}if(f.length<12)return;let o=Pt(f,s)[0];const r=a.filter(({n:w})=>Math.abs(N(w,o))<.2);if(r.length<4)return;const u=Pt(r.map(({n:w})=>w),[0,0,0])[2];if(Math.abs(N(u,o))<.98)return;o=u;const i=o.map(Math.abs).indexOf(Math.max(...o.map(Math.abs)));o[i]<0&&(o=o.map(w=>-w));const p=Math.abs(o[0])<.7?[1,0,0]:[0,1,0],h=Mt(J(o,p)),d=J(o,h),x=[1/0,1/0,1/0],I=[-1/0,-1/0,-1/0];for(const w of f)for(const[c,m]of[o,h,d].entries()){const M=N(q(w,s),m);x[c]=Math.min(x[c],M),I[c]=Math.max(I[c],M)}const O=I[0]-x[0],z=Math.max(I[1]-x[1],I[2]-x[2]),y=Math.min(I[1]-x[1],I[2]-x[2]);if(y<=mt(n)*8||O+mt(n)<z*4||z>y*4)return;let P=0,b=0;const A=new Set;for(const{n:w,area:c}of a){const m=Math.abs(N(w,o));b+=c,(m<.015||m>.999)&&(P+=c),m<.015&&A.add(w.map(M=>Math.round(M*100)).join(","))}if(P<b*.995)return;const _=[];for(let w=0;w<f.length;w+=3){const c=f.slice(w,w+3).map(m=>N(q(m,s),o));_.push([Math.min(...c),Math.max(...c)])}_.sort((w,c)=>w[0]-c[0]);let $=x[0];for(const[w,c]of _){if(w>$+mt(n)*4)return;$=Math.max($,c)}const E=tt(tt(s,h,(x[1]+I[1])/2),d,(x[2]+I[2])/2);return{axis:o,centre:E,from:x[0],to:I[0],width:z,round:A.size>=6&&z<y*1.2,sampled:l>1}}async function Mn(n,t){if(Ft(n)||!/кабел|труб|cable|pipe/i.test(n.name))return[];const e=mt(n),l=[],s=new Map,f=new Map,a=y=>{const P=y.map((A,_)=>Math.round((A-n.bounds.min[_])/e)).join(",");let b=s.get(P);return b===void 0&&(b=l.length,l.push(y),s.set(P,b)),b};for(let y=0;y<ut(n);y++){y%1024===0&&await t();const P=X(n,y).map(a);for(let b=0;b<3;b++){const A=Math.min(P[b],P[(b+1)%3]),_=Math.max(P[b],P[(b+1)%3]);A!==_&&f.set(`${A},${_}`,[A,_,L(q(l[A],l[_]))])}}const o=[...f.values()].map(y=>y[2]).filter(y=>y>e).sort((y,P)=>y-P);if(!o.length)return[];const r=o[Math.floor(o.length*.1)]*1.25,u=Int32Array.from({length:l.length},(y,P)=>P),i=y=>{for(;u[y]!==y;)u[y]=u[u[y]],y=u[y];return y};let p=0;for(const[y,P,b]of f.values())++p%4096===0&&await t(),b<=r&&(u[i(P)]=i(y));const h=new Map;for(let y=0;y<l.length;y++){const P=i(y),b=h.get(P);b?b.push(l[y]):h.set(P,[l[y]])}const d=new Map;for(const[y,P]of h){if(await t(),P.length<6||P.length>256)continue;const b=P[0],A=[0,1,2].map(w=>b[w]+P.reduce((c,m)=>c+m[w]-b[w],0)/P.length),_=P.map(w=>L(q(w,A))),$=Math.max(..._),E=Pt(P,A)[2];!E||$<=e||Math.min(..._)<$*.88||P.some(w=>Math.abs(N(q(w,A),E))>Math.max(e*16,$*.002))||d.set(y,{centre:A,radius:$,normal:E})}const x=new Map;for(const[y,P]of f.values()){++p%4096===0&&await t();const b=Math.min(i(y),i(P)),A=Math.max(i(y),i(P));if(b===A||!d.has(b)||!d.has(A))continue;const _=`${b},${A}`,$=x.get(_);$?$.count++:x.set(_,{a:b,b:A,count:1})}const I=new Map;for(const{a:y,b:P,count:b}of x.values()){const A=d.get(y),_=d.get(P),$=Mt(q(_.centre,A.centre));b<6||!$||Math.min(A.radius,_.radius)<Math.max(A.radius,_.radius)*.8||Math.abs(N($,A.normal))<.5||Math.abs(N($,_.normal))<.5||(I.set(y,[...I.get(y)||[],P]),I.set(P,[...I.get(P)||[],y]))}const O=new Set,z=[];for(const[y,P]of I){if(P.length!==1||O.has(y))continue;let b=y,A=-1;const _=[];for(;!O.has(b);){O.add(b);const $=I.get(b)||[];if($.length>2)break;const E=$.find(v=>v!==A);if(E===void 0||O.has(E))break;const w=d.get(b),c=d.get(E),m=q(c.centre,w.centre),M=L(m);M>e&&_.push({axis:m.map(v=>v/M),centre:w.centre,from:0,to:M,width:Math.max(w.radius,c.radius)*2,round:!0,sampled:!0}),A=b,b=E}_.length&&z.push(_)}return z}async function yn(n,t){const e=ut(n),l=Int32Array.from({length:e},(r,u)=>u),s=new Uint8Array(e),f=new Map,a=mt(n),o=r=>{for(;l[r]!==r;)l[r]=l[l[r]],r=l[r];return r};for(let r=0;r<e;r++){r%2048===0&&await t();for(const u of X(n,r)){const i=u.map((x,I)=>Math.round((x-n.bounds.min[I])/a)).join(","),p=f.get(i);if(p===void 0){f.set(i,r);continue}let h=o(r),d=o(p);h!==d&&(s[h]<s[d]&&([h,d]=[d,h]),l[d]=h,s[h]===s[d]&&s[h]++)}}for(let r=0;r<e;r++)l[r]=o(r);return l}async function xn(n,t,e,l,s){const{axis:f,centre:a}=n,o=Math.abs(f[0])<.7?[1,0,0]:[0,1,0],r=Mt(J(f,o)),u=J(f,r),i=[1/0,1/0,1/0],p=[-1/0,-1/0,-1/0],h=mt(t);for(let b=0;b<ut(t);b++){b%2048===0&&await l();for(const A of X(t,b))for(const[_,$]of[f,r,u].entries()){const E=N(q(A,a),$);i[_]=Math.min(i[_],E),p[_]=Math.max(p[_],E)}}if(p[1]-i[1]<n.width*2.5||p[2]-i[2]<n.width*2.5)return[];const d=Math.max(1,p[0]-i[0]),x=tt(a,f,i[0]-d),I=tt(a,f,p[0]+d),O=[];let z=0;for(const b of xt(e,jt([...x,...I]),h)){++z%256===0&&await l();const A=qt(x,I,X(t,b),h);A&&O.push({triangle:b,at:N(q(A,a),f)})}if(O.length<2)return[];const y=await s(),P=new Map;for(const b of O){const A=y[b.triangle],_=P.get(A);_?(_[0]=Math.min(_[0],b.at),_[1]=Math.max(_[1],b.at)):P.set(A,[b.at,b.at])}return[...P].map(([b,[A,_]])=>({part:b,from:Math.max(n.from,A),to:Math.min(n.to,_)})).filter(({from:b,to:A})=>A-b>h)}async function wn(n,t,e,l,s){let f=0;const a=mt(t);for(const o of n){let r=0;const u=new Map;for(const i of o){await l();for(const p of await xn(i,t,e,l,s)){const h=u.get(p.part)||[];h.push([r+p.from-i.from,r+p.to-i.from]),u.set(p.part,h)}r+=i.to-i.from}for(const i of u.values()){i.sort((d,x)=>d[0]-x[0]);let p=i[0][0],h=i[0][1];for(const[d,x]of i.slice(1))d<=h+a*4?h=Math.max(h,x):(f=Math.max(f,h-p),p=d,h=x);f=Math.max(f,h-p)}}return f>a?f*1e3:void 0}function bn(n,t,e){const l=Mt(J(q(t[1],t[0]),q(t[2],t[0])));if(!l)return[];if(n.some(f=>Math.abs(N(q(f,t[0]),l))>e)){const f=[];return Xt(n,t,e,f),f}let s=n;for(let f=0;f<3&&s.length;f++){const a=t[f],o=q(t[(f+1)%3],a),r=Mt(J(l,o));if(!r)return[];const u=[];for(let i=0;i<s.length;i++){const p=s[i],h=s[(i+1)%s.length],d=N(q(p,a),r),x=N(q(h,a),r);d>=-e&&u.push(p),d>=-e!=x>=-e&&u.push(tt(p,q(h,p),Math.max(0,Math.min(1,d/(d-x)))))}s=u}return s}async function vn(n,t,e,l,s,f){const a=Math.max(mt(t),mt(e)),o=n.map(()=>[]),r=n.map(h=>{let d=0;return h.map(x=>{const I={p:x,offset:d};return d+=x.to-x.from,I})}),u=(h,d,x)=>{let I=0,O=h.length;for(;I<O;){const y=I+O>>1;h[y][1]<d-a*4?I=y+1:O=y}let z=I;for(;z<h.length&&h[z][0]<=x+a*4;)d=Math.min(d,h[z][0]),x=Math.max(x,h[z][1]),z++;h.splice(I,z-I,[d,x])};let i=0;for(const[h,d]of dt(l,s,a)){++i%256===0&&await f();const x=X(t,h),I=X(e,d);if(!Jt(x,I,a,!0))continue;const O=bn(x,I,a);if(!(O.length<2))for(let z=0;z<r.length;z++)for(const{p:y,offset:P}of r[z]){const b=O.map($=>N(q($,y.centre),y.axis)),A=Math.max(y.from,Math.min(...b)),_=Math.min(y.to,Math.max(...b));_-A<=a||O.some(($,E)=>{const w=Math.max(y.from,Math.min(y.to,b[E]));return L(q($,tt(y.centre,y.axis,w)))<=y.width*.7+a})&&u(o[z],P+A-y.from,P+_-y.from)}}let p=0;for(const h of o)for(const[d,x]of h)p=Math.max(p,x-d);return p>a?p*1e3:void 0}async function In(n,t,e,l,s){const f=t.precision/1e3;if(!Number.isFinite(f)||f<=0)throw Error("Точность расчёта должна быть положительным числом.");const a=n.filter(g=>t.includeHidden||!g.hidden),o=a.filter(g=>Ut(g,t.a)),r=a.filter(g=>Ut(g,t.b));if(!o.length||!r.length){const g=o.length?"Б":"А",j=o.length?t.b:t.a;throw Error(`Выбор ${g}: ${fn(n,j,t.includeHidden)}`)}let u=performance.now();const i=async()=>{if(l())throw Error("Расчёт отменён. Предыдущие результаты сохранены.");performance.now()-u>16&&(await new Promise(g=>setTimeout(g,0)),u=performance.now())},p=new Map,h=g=>{let j=p.get(g.id);return j||(j=Dt(g,Array.from({length:ut(g)},(U,H)=>H)),p.set(g.id,j)),j},d=new Map,x=new Map,I=new Map,O=async g=>{let j=I.get(g.id);return j||(j=await Mn(g,i),I.set(g.id,j)),j},z=new Map,y=async g=>{let j=z.get(g.id);return j||(j=await yn(g,i),z.set(g.id,j)),j},P=async g=>(x.has(g.id)||x.set(g.id,await gn(g,i)),x.get(g.id)),b=async g=>{if(t.type!=="intersection")return g;let j=d.get(g.id);return j===void 0&&(j=await mn(g,i,f),!j.closed&&await pn(g,h(g),i)&&(j={closed:!1,approximate:!0,winding:!0}),d.set(g.id,j)),j.winding?{...g,closed:!1,interior:"winding"}:j.closed===g.closed?g:{...g,closed:j.closed}},A=new Map,_=async g=>{let j=A.get(g.id);if(j!==void 0)return j;const U=[];for(let H=0;H<ut(g);H++)U.push([0,3,6].map(rt=>[0,1,2].map(et=>Math.round(nt(g,H,rt+et)/f)).join(",")).sort().join(";")),H%9e3===0&&await i();return j=U.sort().join("|"),A.set(g.id,j),j},$=[],E=new Set(o.map(g=>g.id)),w=new Set(r.map(g=>g.id)),c=$t(r,r.map((g,j)=>j)),m=new Map;let M=0;const v=g=>g.triangles.byteLength+(g.vertices?.byteLength||0)+(g.indices?.byteLength||0)+ut(g)*32;async function S(g,j){if(!s)return g;let U=m.get(g.id);if(U)return m.delete(g.id),m.set(g.id,U),U;for(const[H,rt]of m)H!==j&&M>96*1024*1024&&(m.delete(H),M-=v(rt),p.delete(H),z.delete(H),I.delete(H),A.delete(H));return U=await s(g.id),m.set(g.id,U),M+=v(U),U}let C=-1/0;for(let g=0;g<o.length;g++){const j=o[g];performance.now()-C>150&&(C=performance.now(),e({phase:"Проверка пар",done:g,total:o.length,found:$.length}));const U=[...xt(c,j.bounds,f)];for(let H=0;H<U.length;H++){const rt=U[H];performance.now()-C>150&&(C=performance.now(),e({phase:`Проверка пар · A ${g+1}/${o.length} · кандидаты ${H+1}/${U.length}`,done:g,total:o.length,found:$.length}));const et=r[rt];if(await i(),j.id===et.id||!Et(j.bounds,et.bounds,f)||t.ignoreSameModel&&j.modelId===et.modelId||t.ignoreSameGroup&&j.modelId===et.modelId&&j.properties.Объект&&j.properties.Объект===et.properties.Объект||t.equalProperty&&j.properties[t.equalProperty]!==void 0&&j.properties[t.equalProperty]===et.properties[t.equalProperty]||j.id>et.id&&E.has(et.id)&&w.has(j.id))continue;const Tt=cn(j.id,et.id),F=await b(await S(j)),T=await b(await S(et,j.id));let V,R="surface",yt=0,Y,Zt,St,kt,Lt;if(t.type==="duplicates"){if(ut(F)!==ut(T)||F.bounds.min.some((ct,it)=>Math.abs(ct-T.bounds.min[it])>f||Math.abs(F.bounds.max[it]-T.bounds.max[it])>f))continue;await _(F)===await _(T)&&(V=F.bounds.min.map((ct,it)=>(ct+F.bounds.max[it])/2),R="duplicate")}else{const ct=h(F),it=h(T),qn=Math.max(1,...F.bounds.min.map(Math.abs),...F.bounds.max.map(Math.abs),...T.bounds.min.map(Math.abs),...T.bounds.max.map(Math.abs)),ft=Math.max(1e-10,qn*Number.EPSILON*64),ht={min:F.bounds.min.map((k,B)=>Math.max(k,T.bounds.min[B])),max:F.bounds.max.map((k,B)=>Math.min(k,T.bounds.max[B]))},Bt=ht.min.map((k,B)=>(k+ht.max[B])/2),_t=new un,Z=[];let zt=1,Pn=0,Qt=1/0,Sn=0;for(const[k,B]of dt(ct,it,f)){const lt=X(F,k),pt=X(T,B);if(!Et(jt(lt.flat()),jt(pt.flat()),f))continue;const ot=Jt(lt,pt,ft,t.touching);if(ot){const bt=L(q(ot,Bt));if((!V||bt<Qt)&&(V=ot,Qt=bt),_t.add(lt),_t.add(pt),Pn++%zt===0&&(Xt(lt,pt,ft,Z),Z.length||Z.push(ot),Z.length>=8192)){for(let gt=0;gt*2<Z.length;gt++)Z[gt]=Z[gt*2];Z.length=Math.ceil(Z.length/2),zt*=2}}++Sn%256===0&&(performance.now()-C>150&&(C=performance.now(),e({phase:`Геометрия пары · A ${g+1}/${o.length}`,done:g,total:o.length,found:$.length})),await i())}if(!V&&wt(F)&&wt(T)){const k=Bt;It(k,F,ct,ft)&&It(k,T,it,ft)&&(V=k,R="contained")}if(!V){for(const[k,B,lt]of[[F,T,it],[T,F,ct]])if(wt(B)){for(let pt=0;pt<ut(k)&&!V;pt++){const ot=X(k,pt),bt=ot[0].map((gt,At)=>(ot[0][At]+ot[1][At]+ot[2][At])/3);for(const gt of[ot[0],bt])if(It(gt,B,lt,ft)){V=gt,R="contained";break}await i()}if(V)break}}if(V){const k=(D,K)=>[...xt(K,ht,f)].filter(st=>Et(jt(X(D,st).flat()),ht,f)),B=k(F,ct),lt=k(T,it);R!=="surface"&&(_t.addFrom(F,B),_t.addFrom(T,lt)),await i();const pt=ht.min.map((D,K)=>(D+ht.max[K])/2),ot=(D,K)=>D===0?It(K,F,ct,ft):It(K,T,it,ft),bt=(D,K)=>D===0?It(K,F,ct,ft)||Ot(K,F,ct,ft):It(K,T,it,ft)||Ot(K,T,it,ft);if(R==="contained"){const D=Math.max(1,Math.ceil((B.length+lt.length)/4096));zt=Math.max(zt,D);const K=new Set;for(const[st,G,W]of[[F,B,1],[T,lt,0]]){for(let Q=0;Q<G.length;Q+=D){Q%(D*32)===0&&await i();for(const at of X(st,G[Q])){const vt=at.join(",");K.has(vt)||(K.add(vt),bt(W,at)&&Z.push(at))}}K.clear()}if(F.interior==="winding"||T.interior==="winding"){const st=(G,W)=>{let Q=1,at=0;for(;G;G=Math.floor(G/W))Q/=W,at+=Q*(G%W);return at};for(let G=1;G<=2048;G++){G%16===0&&await i();const W=[2,3,5].map((Q,at)=>ht.min[at]+st(G,Q)*(ht.max[at]-ht.min[at]));ot(0,W)&&ot(1,W)&&Z.push(W)}}}const gt=(D,K,st)=>wt(F)&&wt(T)&&st.every(G=>{const W=tt(G,D,K-N(G,D));return!bt(0,W)||!bt(1,W)}),At=()=>[0,1,2].map(D=>Z.reduce((K,st)=>K+st[D],0)/Z.length),Vt=R==="surface"&&Z.length>2?Pt(Z,At())[2]:void 0,Ct=Vt?Yt(F,T,B,lt,[Vt],[],ht,At(),Z,ft,ot):void 0,tn=!Ct||Ct.width>ft,nn=!tn&&!!Ct?.approximate,en=!wt(F)||!wt(T);if(!en&&!tn&&!nn&&(R="touch"),R==="touch"&&!t.touching)continue;const{zones:An,crowded:En}=hn(Z,ht,f,gt),_n=_t.values();let Nt=0,on=!nn,sn=En||zt>1||!!Ct?.approximate||!!d.get(F.id)?.approximate||!!d.get(T.id)?.approximate;for(const D of R==="touch"?[]:An){const K=D.limits.length?B.filter(Q=>Rt(F,Q,D.limits)):B,st=D.limits.length?lt.filter(Q=>Rt(T,Q,D.limits)):lt,G=D.hits.length?[0,1,2].map(Q=>D.hits.reduce((at,vt)=>at+vt[Q],0)/D.hits.length):pt,W=Yt(F,T,K,st,D.hits.length>2?Pt(D.hits,G):[],_n,ht,G,D.hits,ft,ot,R==="contained");W.thin&&(on=!1),W.approximate&&(sn=!0),W.width>Nt&&(Nt=W.width),await i()}if(Nt*=1e3,R==="touch"?Y=void 0:en?Y="unmeasurable":Nt<=0||!on?Y="tolerance":sn&&(Y="approximate"),yt=R==="touch"||Y==="unmeasurable"||Y==="tolerance"?0:Nt,!Ft(F)&&!Ft(T)){const D=await P(F),K=await P(T);for(const[st,G,W,Q,at]of[[D,F,T,K,it],[K,T,F,D,ct]]){if(Q?.round&&/труб|pipe/i.test(W.name))continue;const vt=st?[[st]]:await O(G);if(!vt.length)continue;const an=await vn(vt,G,W,G===F?ct:it,at,i);if(an!==void 0&&(Lt=Math.max(Lt??0,an)),R==="touch")continue;const Gt=await wn(vt,W,at,i,()=>y(W));Gt===void 0||Gt<=(St??0)||(St=Gt,kt=G.id,st||(Y=Y||"approximate"))}St!==void 0&&(Zt=Y==="unmeasurable"||Y==="tolerance"?void 0:yt,yt=Math.max(yt,St),(Y==="unmeasurable"||Y==="tolerance"||D?.sampled||K?.sampled)&&(Y="approximate"))}await i()}if(V&&!rn({kind:R,depth:Y,penetrationMm:yt},t.minPenetration,t.precision))continue}if(V&&($.push({id:Tt,a:Wt(F),b:Wt(T),point:V,kind:R,state:"new",note:"",assignee:"",firstSeen:"",lastSeen:"",penetrationMm:yt,...St!==void 0?{axialPenetrationMm:St,axialElementId:kt,overlapThicknessMm:Zt}:{},...Lt!==void 0?{contactLengthMm:Lt}:{},...Y?{depth:Y}:{}}),$.length>=5e4))throw Error("Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат.")}}return e({phase:"Готово",done:o.length,total:o.length,found:$.length}),$}let jn=0;const Kt=new Map;self.onmessage=async n=>{if(n.data.request!==void 0){const t=Kt.get(n.data.request);Kt.delete(n.data.request),n.data.error?t?.reject(Error(n.data.error)):t?.resolve(n.data.geometry);return}try{const{elements:t,check:e}=n.data,l=await In(t,e,s=>self.postMessage({progress:s}),()=>!1,n.data.streaming?s=>new Promise((f,a)=>{const o=jn++;Kt.set(o,{resolve:f,reject:a}),self.postMessage({load:s,request:o})}):void 0);self.postMessage({results:l})}catch(t){self.postMessage({error:t instanceof Error?t.message:String(t)})}}})();\n', we = typeof self < "u" && self.Blob && new Blob(["(self.URL || self.webkitURL).revokeObjectURL(self.location.href);", Oe], { type: "text/javascript;charset=utf-8" });
function ln(t) {
  let e;
  try {
    if (e = we && (self.URL || self.webkitURL).createObjectURL(we), !e) throw "";
    const n = new Worker(e, {
      name: t?.name
    });
    return n.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(e);
    }), n;
  } catch {
    return new Worker(
      "data:text/javascript;charset=utf-8," + encodeURIComponent(Oe),
      {
        name: t?.name
      }
    );
  }
}
const ht = (t) => String(t ?? "").replace(
  /[&<>"']/g,
  (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[e]
);
function ve(t, e) {
  const n = URL.createObjectURL(
    new Blob([e], {
      type: t.endsWith(".html") ? "text/html;charset=utf-8" : "application/json;charset=utf-8"
    })
  ), s = document.createElement("a");
  s.href = n, s.download = t, s.click(), setTimeout(() => URL.revokeObjectURL(n), 6e4);
}
const Ne = {
  unmeasurable: "не определена",
  tolerance: "требует уточнения",
  approximate: "приблизительная оценка"
}, Mt = (t = 0) => t > 0 && t < 0.1 ? String(Number(t.toPrecision(2))) : t.toFixed(1), te = (t, e) => e === "duplicates" ? "—" : t.kind === "touch" ? "касание" : t.depth === "approximate" ? `≈ ${Mt(t.penetrationMm)}` : t.depth ? Ne[t.depth] : Mt(t.penetrationMm);
function cn(t, e) {
  const n = ht;
  return `<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${n(t.name)}</title><style>body{font:14px/1.5 system-ui;margin:24px;background:#171c23;color:#e6edf5}h1{margin:0}small{color:#a9b7c8}input,select{padding:10px;margin:15px 8px 15px 0;max-width:100%;background:#242e3b;color:inherit;border:1px solid #506074;border-radius:6px}.wrap{overflow:auto}table{border-collapse:separate;border-spacing:0;width:100%}td,th{padding:10px;border-bottom:1px solid #39475a;min-width:100px;vertical-align:top;overflow-wrap:anywhere}th{background:#253142;position:sticky;top:0;text-align:left;white-space:normal}td{max-width:350px}tr[hidden]{display:none}.shot{display:block;width:260px;border:0;background:transparent;padding:0;cursor:zoom-in}dialog{width:min(94vw,1400px);border:1px solid #506074;background:#20242b;color:white;border-radius:10px}dialog img{max-width:100%;max-height:80vh;display:block;margin:12px auto}dialog::backdrop{background:#000b}.shot img{width:100%;border-radius:6px}.legend{margin:12px 0}.red{color:#ff6161}.blue{color:#65baff}@media print{input,select{display:none}body{background:white;color:black}.wrap{overflow:visible}th{position:static;background:#eee}}</style><h1>${n(t.name)}</h1><small>НашеПО · Проверки коллизий · ${n(t.lastRun || "")} · ${t.status === "stale" ? "Результат устарел" : "Последний завершённый расчёт"}</small><p>${n(t.type === "duplicates" ? "Совпадение треугольной геометрии" : "Пересечения поверхностей и вложенность замкнутых тел")}. Точность: ${n(t.precision)} мм${t.type === "intersection" ? `; минимальная глубина: ${n(t.minPenetration)} мм` : ""}. Глубина для отбора — большее из локальной толщины перекрытия и захода вдоль оси распознанного профиля в более крупную конструкцию. Для круглых кабелей и труб с поворотами измеряется самый длинный непрерывный участок восстановленной траектории внутри конструкции; такой замер имеет знак ≈. Продольный замер включает внутреннюю пустоту колодца: до конца профиля при частичном заходе, от входа до выхода при сквозном. Раздельные оболочки измеряются отдельно. Если продольный замер неприменим, используется локальная толщина. Это не расстояние перемещения, устраняющего коллизию. Длина контакта — отдельный приблизительный замер самого длинного непрерывного соприкосновения поверхностей вдоль распознанного профиля или трассы. Он учитывает боковой контакт, даже когда ось проходит снаружи конструкции, но не заменяет глубину и не участвует в её пороге. «Касание» — контакт без разрешённого объёмного перекрытия, с нулевой глубиной. «Не определена» — у геометрии не удалось определить внутреннюю область. «Требует уточнения» — пересечение найдено, но глубина не разрешена. Знак ≈ обозначает восстановление внутренней области повреждённой оболочки, совмещение швов, сокращённую выборку либо неполное разделение контактов. Погрешность оценки не гарантируется. Строки с неопределённой глубиной сохраняются при фильтрации; все числа, включая оценки со знаком ≈, и касания сравниваются с порогом с запасом на точность.</p><p class="legend"><span class="red">● Элемент А выделен красным</span> · <span class="blue">● элемент Б — синим</span></p><input id="search" type="search" placeholder="Поиск по всему отчёту"><select id="state"><option value="">Все состояния</option>${Object.entries(
    Ct
  ).map(([s, a]) => `<option value="${s}">${a}</option>`).join(
    ""
  )}</select>${t.type === "intersection" ? '<input id="depth" type="number" min="0" step="1" placeholder="Глубина от, мм">' : ""}<span id="count"></span><div class="wrap"><table><thead><tr>${["Снимок", "№", "Состояние", "Глубина для отбора, мм", "Толщина перекрытия, мм", "Заход вдоль оси, мм", "Длина контакта, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "X", "Y", "Z", "Назначение", "Комментарий"].map((s) => `<th>${s}</th>`).join("")}</tr></thead><tbody>${e.map((s, a) => `<tr data-state="${s.state}" data-depth="${s.penetrationMm ?? 0}"${(s.depth === "unmeasurable" || s.depth === "tolerance") && s.kind !== "touch" ? ' data-unmeasured="1"' : ""}><td>${Jt(s.image) ? `<button class="shot" type="button"><img src="${s.image}" alt="Снимок конфликта ${a + 1}" loading="lazy"></button>` : "Снимок отсутствует"}</td>${[a + 1, Ct[s.state], te(s, t.type), s.overlapThicknessMm === void 0 ? "—" : Mt(s.overlapThicknessMm), s.axialPenetrationMm === void 0 ? "—" : Mt(s.axialPenetrationMm), s.contactLengthMm === void 0 ? "—" : "≈ " + Mt(s.contactLengthMm), s.a.name, s.a.model, s.a.guid, s.b.name, s.b.model, s.b.guid, ...s.point.map((i) => i.toFixed(4)), s.assignee, s.note].map((i) => `<td>${n(i)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><dialog id="picture"><button id="close-picture">Закрыть</button><img id="full-picture" alt="Снимок конфликта"></dialog><script>const modal=document.getElementById("picture");document.getElementById("close-picture").onclick=()=>modal.close();for(const b of document.querySelectorAll(".shot"))b.onclick=()=>{document.getElementById("full-picture").src=b.querySelector("img").src;modal.showModal()};const PREC=${Number(t.precision) || 0},q=document.getElementById('search'),s=document.getElementById('state'),d=document.getElementById('depth'),rows=[...document.querySelectorAll('tbody tr')];function filter(){let n=0;for(const r of rows){r.hidden=!!((s.value&&r.dataset.state!==s.value)||(d&&!r.dataset.unmeasured&&Number(r.dataset.depth)+PREC<Number(d.value||0))||!r.textContent.toLowerCase().includes(q.value.toLowerCase()));if(!r.hidden)n++}document.getElementById('count').textContent='Коллизий: '+n}q.oninput=s.onchange=filter;if(d)d.oninput=filter;filter()<\/script></html>`;
}
function dn(t, e) {
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
            distance: t.type === "duplicates" ? "" : n.depth || n.kind === "touch" ? te(n, t.type) : `${Mt(n.penetrationMm)} мм`,
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
              "Глубина для отбора, мм": te(n, t.type),
              ...n.contactLengthMm !== void 0 ? { "Длина контакта, мм": "≈ " + Mt(n.contactLengthMm) } : {},
              ...n.axialPenetrationMm !== void 0 ? {
                "Толщина перекрытия, мм": n.overlapThicknessMm === void 0 ? "—" : Mt(n.overlapThicknessMm),
                "Заход вдоль оси, мм": Mt(n.axialPenetrationMm)
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
const pn = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAydpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAzIDc5Ljk2OTBhODdmYywgMjAyNS8wMy8wNi0yMDo1MDoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDZFQkU2NEQ4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDZFQkU2NEM4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI2LjExIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRENDVBNjQzODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRENDVBNjQ0ODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+pHX+ogAAD+lJREFUeNrsnXtwVPUVx2/CZvMgQEhCSAwJJDzDqwgodCq08hAr7wpSo1M6o/5Rq6NUcdqp1XamdjqOY6mvWhWnttZpRRtbaRGpMMKMZlB8gaFaQoQQSEhIQt7hkfTzhY1ulnt37929mw1T7sxls3vv/f3O7/zO43vO7/wucd3d3calI/zDo3927txpnDx5MqaEpKenpyUlJWUlJCQM6+rqSm1vb/fyGRcfH9+dkpLSGRcX13Lq1Knajo6Omvr6+ia+x4zWtLQ0Y86cOee/SAKLiopiyjwYlz5ixIhyPk8PGDBAKnHB6fF4unU9Ly+vDCanxpLeqVOnnuObznj9kJycHFMGwpRrjh8/Xoh0ec6ePWt6z5kzZwxdr62tLcrPz786lvT68ys+1jYEaTJQx+tRT1v3w0QDabweSe0XNjDmDBwyZEh6U1PTPCfPtLS0LOK5QZcYyDF48OAFjY2N6U6eaWhoyIaBc//vGSg1RIXXSC2dHG1tbYbX610dS08cUwYmJiYa2dnZWRMmTFiO9C0Ipw3UfgnoYfHw4cMzYWZscWAEeChj2LBha8CQm+vq6g6D26xnKj5eWC+dZ67l71VI0dxDhw5lYM/C6vvYsWMZzc3Nm4cOHVo7atSot/Hem6DjzRMnTjQGCw4k9RkZGYWYgGtrampeZCKaIuKgOps+fbrj55AgwYmPkabunJyceqThEaQhT4wKJPiyyy4bx/VHgStVQABTnBfpCdjuhp7D9PMw9BQGemnRBc0FXP8tdDaKbhj/Hn+Pdjr2WbNmfYkDw2IgjJgDMdX+A1DEwG8nUEsNYJTUSp98fzIrK6tF16PBuMBT/cCUk/T7Gz5HiI7c3NwxfN8gxgXSweRWcv3KPmOgQG9mZmaz1QAUScDIhvHjx/8Zgmsx9GExAjXrLigo6Ebrw2YkdBwdN26c6GgKNoGYoXoioblRZyAqsoDOWqMlOVJDbKQY10Zf3VJ3feo7Nuvc92hJsqQWJn7DKQNtOxHEfCZw4xVCqRS3PNigQYMEpCv5/BBJfa+zs3MfElyB1D1RWlp6le45fPiwMXv27D2o4p04ikI+p0D4FTiQaXjw3HCdUOCBQxmMxJZgdubhoPa56kRQ2REw8LAbMy3jjRmoxiY9VVhYuABmDRKs6TnGjBlTTNKg1zP6zu83+sMgVHwwTmAhpuIZJKcWxroiibT1OTRluabCqampKajQO5ESBmCWOn6GF7wLdckyi2WZpALOBrPn9TsGv8AMliA52UzIj5iYA+onUloZ778xJ4muMBD1SoGwzyIhiIE3MMCfgNks01AQrLTa1mDt6LruC5JTHEI/D8ppRELvyJEjPxo4cKDXNScyevTomwPVyq668uxmGDg2VNg1ceLEO0JhRF2HiT8M1o76ob8izMO2cNRajoxnV7rqhZFCL7OyzwkhOIcuIMRPmUk70GgCxrvFTrvc18z940O1iekZgH38JbQ7Vd/3oHmA6zAGSbrJrhTidFox8KsCo5IgA93pZJCo6ds8F28nWQFDbka1OxxI34qo4EBmMgGmfBqKCHCiJGS+HQQgdUN175OqOzUNPLfeTjZG9+C8FsPEdhvS9z7SFx81II0UrglmpyCykxn8tl0IhVmYisFvDxP4tsOYqXb7gjkrMStnrNqDcWe5Z4lTIO0onQWQbfAt+lxwyNYRRfzg4MGDW2wmUhOQpGcBsElhAt8kJvNZtWPn/i+++KIE03K31fqPxqXxRS0bIxVmhj62in9xGE9pfcOu6k6aNOnBSMGvnqedB+wmVpVYgM4XrMJBNOxd7GB0VJhI4HtWtgpV2oskpNhcwjRwGt/CVp5yI3JQO7T3TbVr5wCLDiHaOGDlRGDid1yPhQVjWFa8j1jVbFFI4n8Xeck2q0Qqz3tQ78kQOI+k6yLWNOYQUycYLhxqBwncgj3dRV9bSdRuJ0beS6x81izBS98nsdXr8OL/CIyjtVQAU36MOXqttbW1yzUVxjEs1eyYzRoq8XJgSl2xKjnATKR2Cd7ycWZ1H/any40wK1S4qH7UH/0+pv5Fh3+s3UPf2LFj/2nWhnAjaONq1yRQdo2ZvUWzY5LSbyeNvl5runQcx/ciZk+dL2J2Z2PohyEJfbY+cfr0aYOlhTjOSXydBE13oiG12O5Svm9FqnYgnWWiCfru4fpC/u6lCbpGaH0ra887tJgf8ZoI4p6Lei40U01sz9sQlE9m5A6YOB9mToFpHruL5NE+xAzOYfy5FC1ZygSfAf7sxQa+hfS8zue7e/bsmRuo6jD3OmxlJuahLmIVRtRvCfSWwoL8LuDZKpEPN+scq1P04vTOJWo1jkBs60uffTdiFZaU4SCuC5QoPJ9x5MgRgwqqFOMiPDRwLcZxJgsXajxK3Bp+5SOYLgUEfwlrXRj9V6NDMcSrUdG5JoDa6C+1KYYLi/tmBU2Yo4WMfwVOaYj4EdQGqgHdhN6nq2QCyVuB07imoqIiB8N7wUMwtWvmzJmf7Nq1a1qwteCLgXkzZswo271798TAa0ePHs2BiSX4gCqY+CYOpYTvu6hNbOzFcH1ZsmTJdFz/CyQBjuFF7YDXJmZnFHZix8Vk+wJP6H9r8uTJExTDh7oX3KhEaxWQ7vnly5dP7RWJFBcXb3TSMThpr5A/uTmCkPyai5F5ohu4kqcYnr/LnTy7du3ax3slE3ASmU5EH3Uvl+qyenUYULrWt3Z70RyiV3RXV1dX+szXQSfPo85ZvZwIbj3DSQPcXynQqoPsyxuk0H9mNxaN9SE6off+8vLyN3rANzb/iMPxD+vFQBxFooOHJbp1PQU8mkGY+BA29LX+UG4WCpZBZwn0/qrH+Yl+6K5z0g78SurFQJIEHidE0GFbYBBOjfMtGNj/9mcGApw/h85bTcLSNieT788v1+oDCXvqmc1iDHN7f2Se6BJ9otP1AksM6hm7D0j0Ud9ki6zv+xjoO1Sy0Z8O0SO6oG+PxS0pTjYc+fMr3peO73QSBnFkWon8gQMHngcvPR0MvfflITqg53eiywpMczhyovCroxcDYYpTsc6zYpDi5srKynUY69L+wECl6UWPVYZI40CrRjiMpet6MZDA+YRDHDQaMba0uoQ8HaSEbqKepTqWzKP/Y6IDejqDwJoEoEyBQ6mu/ZKBsmm45d8zU6/QYb2dXUtkKwqxKzlG8FWzg2SxYyqFqFopdFSEsI/5jGdkqLZUk0P+sA6k8VeyOF+aA49gCcXepaRzVpMYzeYmbXpZAVPnEThnmG1BIEk5kFT5FMXcweAOkxNTdI3XTQpVHYEETqMwPcFqSxfOp5Y4eDtjKYFxO5iQ4/zWOxsjQypEXn3+eIkE6ktkZoYTbC/C7W/goaGBuI9n5uNItlp5LxHOtaQY5/2SguE70ci5kLzmBdeI88WodYx/G8C7tify8nM81jhQBhem1ezfv/+PMHKnmSfGDi7TaluIiCUxxgxMDCaB0J+EMCwyzLegbSsrK3sJ4N2LeY422ijMQXS3mC2Ys3Aznhm6KtjsMgBvjBnoDSaBmKz5mKlRZhuBEJAtdrBhyEgED/Yvrb4ZF274k/243aoaIU4LD/1YArUUize93Wy1Ea3T/pttrmz1YiG6kgWY7Rbh2zKytWMtJHBAP5FA07UHnODXUM9rLFT7DSTzuCsM9AHQ58xKa/FeiXT2oJkUQrinPzCQifSYSR8e9hcsTXhM6hXlUJ+zsyZsO5mApG0hjf+Z2TVmsRjoM8dEAj3Yz4RYMpD+TRnI0oX2yS03e4Zxfsh4t7u6WxN70MmsPRJYImGcX2CKg9DHkMTEfiiBqpvxBFRTpCJhG8z2GAr3wfCHwcBnXd/uyoz9CWy03+xaVVXVNLK8v/aPjyEkAcZ6YiyBCaLD8CtTwfY9ypq2aY0149sDDt4Ulf3CkkJm817fqt0FL4SAiXejGsV+EpggCQhn4LJRlGC0UjXwAZ9t4e4Hpn+P6OjBpdB3G8y7zWwpFkfJz13rnUif4/3CEJFkhY0Ea1Dx51ixO0bebQcz73Uigb79xN1AiFIkWXt//654GqNOmD56GZO0GkQwG+8YZ3ct2qfCXl858XU8+6QZbPHdq3fUJEatQpWBeKwqVP1PVKQBqblCZWUA1dOh7tfmQhhUxjrzQwxyurygRf9iwnTdR0Bfps2HNnZ8noaWDLLRc4LtMO05abcUtBEXlQpVBnmD3c3SSNIJOlnvA+BmBd1apD4CM5QFmsd9Xoc75b08N1/Pqx2rYgCkuY2NivfzedIO3WoHIVnsOgMlfajmRw4Xrs8VOxp+WxNwNI3sNHqFoszVwIW0SOtr9LzaUXtqV+37lyHTvzY2Ot1o806oOulwtnrd4HSrvl7VxHPa/dh9+eWXf8zmmJtQp5xovSDC53hy6Odm+lMN4Ln+RYcTuu1IoaNtDkhfMrjpAbOUT4istUFx0jnnAlZMIzHhxcNVR6v4Uu3iIGr14jKcRZr6Vf92IwrjqzVfwZ+fI4Vet7wwzim+wwgPh4l5OvNRrefBWeuQjMcJATeRzWl049V78t6oagZ27gaSv3eCAIoinSTalLTEueaF8agFDP6oG0U9vm38hygPfgQH8HUcQqLd/SX+6oqj0j7muXqZBO1VhbOb1DDfl1yB9851dZsD8W4FkrNKdXJIzsBIZlemgOWDfPDZPYDXe4AjBzD+eyBmN5LzKav+lZz1fO9Ags8qq8OZjASnw7g8PrWUcAUqOhNVLVBI5tZLJBEUacX1aEiV60AaBP8OErOGDv5GB143ymz10kfOMXwdg7Ffo8IfGNSFd21BKmU2ZMA82LEkbNMggWjtVXFq1+wcePM2+l/F5H4QtRfv+HY+Lg2281F5VL0nBmhRohmNZSE5/dcRDpbAnPZghfBoVhNwZ6ERxmtP4p0ymxl6Hc+8DMhQH8hcCG7Gtj2Jqs3gvpVI1Sy+/wEC+2zfg+gQw5jAZ5DkK1lUX4lkzdTLKSRlJgmEGuzyYu7bZvTlq5/oeBqz9h9tgYCZzQDZp/htTCA4loPAfk7h+tMY6Dqne4PtnnIi9FNDP0/QT1Fg5YS+Y2sncP1ZvftGu5owSZ/oFVZGX7/6yfiq0jObmb4XIsaGqoURY2F0Nip1K+cWBtMU6Xu0tP1M0Qftbeb8PhqQFSq6EZ1imujWy9PCGbdrDDQiqxLNo8D7Rql9OMyDCfU8vwqpz+3r6tiYM9BfGrBNr4XDQJ570c47GaLNwJi+wVJwhPNls6UCI0SdCuHlpv6wRyXm71DV+ithWKPDdFYN4eEOw7j0ElrFybUsSDliBjBqGwC86RIDjfPbDLAlr9qNh+UwyOy8avXC7pgw0Gwrf18ebNjZijc+EgoK6TrQqZxyvO2xpNe/5O8cxRs3bjT6cme5yVEHJpzBZzbAPAvpSiW3l+j/nxGA75qZ6OMQf4xYvCnGr67/KvK59N9hRHb8T4ABAPaAkPNeKkdCAAAAAElFTkSuQmCC", fn = ":host{display:block;height:100%;color-scheme:dark;font:13px/1.4 Segoe UI,sans-serif;color:#dbe5f0;container-type:size}*{box-sizing:border-box}[hidden]{display:none!important}main{height:100%;min-height:260px;background:#171d25;display:flex;flex-direction:column;overflow:hidden;-webkit-user-select:none;user-select:none}button,input,select,textarea{font:inherit;color:inherit;border:1px solid #425165;border-radius:6px;background:#253140;padding:7px 9px;min-width:0}button{cursor:pointer;white-space:nowrap}button:hover{background:#354459}button:disabled{opacity:.45;cursor:default}.primary{background:#b99a38;border-color:#d0ae46;color:#111820;font-weight:600}.primary:hover{background:#e0bd51}button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid #f2c94c;outline-offset:1px}input,select,textarea{background:#111a24}input,textarea,td,dd{-webkit-user-select:text;user-select:text}input[type=checkbox]{accent-color:#e6c354;width:16px;height:16px}header{display:flex;gap:7px;align-items:center;padding:8px 12px;border-bottom:1px solid #354459;flex-shrink:0;overflow-x:auto}.brand{display:flex;gap:7px;align-items:center;margin-right:8px}.brand img{width:32px;height:32px;object-fit:contain}.brand b{font-size:17px}.brand small{font-size:10px;color:#a6b5c7}#dirty{margin-left:auto;font-size:11px;color:#cabb81;white-space:nowrap}.notice{background:#1c2735;padding:5px 12px;font-size:12px;min-height:27px;max-height:70px;overflow:auto;color:#a7bbd1}.notice.error{color:#ffaaa1;background:#412725}.workspace{display:grid;grid-template-columns:230px minmax(0,1fr);flex:1;min-height:0}aside{padding:10px;display:flex;flex-direction:column;gap:9px;border-right:1px solid #354459;min-height:0}#checks{overflow:auto;flex:1;min-height:0}.check-item{display:flex;flex-direction:column;gap:5px;width:100%;margin-bottom:5px;text-align:left;white-space:normal}.check-item small{color:#a8b7ca}.check-item.active,.tabs .active{border-color:#c7ab56;background:#403b2c;color:#ffe399}.main{display:flex;flex-direction:column;min-width:0;min-height:0}.test-toolbar{display:flex;gap:7px;padding:8px 12px;align-items:center}.test-toolbar input{flex:1;font-weight:600}.tabs{display:flex;gap:7px;border-bottom:1px solid #354459;padding:0 12px 8px}.tabs button{min-width:105px}#content{flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column}.empty{padding:28px;color:#a4b4c9;text-align:center;margin:auto}h2,h3,p{margin:0 0 10px}h2{font-size:20px}h3{font-size:15px}label{display:flex;flex-direction:column;gap:5px;font-size:12px;color:#b8c6d7}.check{flex-direction:row;align-items:center;gap:6px}small{font-size:11px;color:#a8b7c9}.parameters{display:flex;gap:18px;align-items:end;padding:10px 12px}.parameters input{width:140px}.selection-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0 12px 12px}.selection{border:1px solid #39495e;border-radius:8px;padding:12px;background:#1b2633;min-width:0}.selection h3{display:flex;justify-content:space-between}.selection h3 span{color:#92c4b2;font-size:12px}.selection select[multiple]{width:100%;min-height:70px}.selection-tools{display:flex;gap:5px;flex-wrap:wrap;margin:8px 0}.selection-tools button{font-size:11px;padding:5px 7px}.selection>label{margin-bottom:8px}.condition{display:grid;grid-template-columns:minmax(80px,1fr) 100px minmax(70px,1fr) 29px;gap:5px;margin:6px 0}.condition button{padding:3px}.rules,.report{padding:18px;max-width:850px}.rules>label{margin:14px 0}.rules>p,.report>p{color:#a9b8cb}.report>button{margin:12px 8px 14px 0}.result-tools{display:flex;gap:7px;flex-wrap:wrap;padding:8px 12px}.result-tools input{flex:1;min-width:180px}.result-area{display:grid;grid-template-columns:minmax(0,1fr) 300px;flex:1;min-height:0}.table-area{display:flex;flex-direction:column;min-width:0;min-height:0}.scroll{overflow:auto;flex:1;min-height:0}table{border-collapse:separate;border-spacing:0;width:max-content;min-width:100%}th{position:sticky;top:0;background:#2a3748;z-index:1;text-align:left;max-width:240px;white-space:normal}th,td{padding:8px;border-bottom:1px solid #344154;vertical-align:top}td{max-width:320px;min-width:90px;overflow-wrap:anywhere;-webkit-user-select:text;user-select:text}td:first-child{min-width:36px}tr.active td{background:#453e29;color:#fff0b5}tr:hover td{background:#2c3847}.pager{display:flex;gap:10px;align-items:center;justify-content:center;padding:5px;border-top:1px solid #39495e;font-size:11px}.pager button{padding:2px 8px}.detail{border-left:1px solid #354459;padding:10px;overflow:auto}.detail h3{overflow-wrap:anywhere}.detail>label{margin:10px 0}.detail p{font:11px/1.5 Consolas,monospace}.detail details{border-top:1px solid #354459;padding:8px 0}summary{cursor:pointer}dl{font-size:11px;display:grid;grid-template-columns:1fr 1fr;gap:7px}dt,dd{overflow-wrap:anywhere;margin:0}dt{color:#9baec4}footer{border-top:1px solid #354459;padding:4px 12px;display:flex;justify-content:space-between;color:#91a4bb;font-size:11px}dialog{border:1px solid #53647c;border-radius:12px;background:#202c3a;color:#dbe5f0;width:min(700px,92vw);max-height:85vh;padding:20px;box-shadow:0 15px 60px #000a}dialog::backdrop{background:#000a}dialog p{margin:12px 0}dialog a{color:#f2c94c;margin-right:12px}.dialog-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:16px}@container (max-width:950px){.workspace{grid-template-columns:185px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 240px}.selection-grid{grid-template-columns:1fr}.parameters,.test-toolbar{flex-wrap:wrap}.test-toolbar input{flex-basis:100%}}@container (max-height:400px){header{padding:5px 10px}.test-toolbar{padding:5px 10px}.tabs{padding-bottom:5px}.brand img{width:25px;height:25px}footer{display:none}}:host{font-size:12px}.brand img{background:#e1e7ef;border-radius:5px;padding:3px}.selection-tools button{font-size:12px}label{font-size:13px}.choose-layout{display:grid;grid-template-columns:220px minmax(0,1fr);min-height:0;flex:1;overflow:auto}.choose-layout .parameters{display:flex;flex-direction:column;align-items:stretch;gap:15px;border-right:1px solid #354459;justify-content:flex-start}.choose-layout .parameters input{width:100%}.choose-layout .parameters input[type=checkbox]{width:16px}.choose-layout .selection-grid{padding:10px 12px;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start;min-width:0}.selection select[multiple]{height:180px;resize:vertical}.selection-mode{font-size:12px;color:#b6c4d5}.preset-row{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:9px}.preset-row select{flex:1 1 160px}.preset-row button{padding:5px 7px;font-size:12px}.model-list{height:150px;overflow:auto;border:1px solid #425165;border-radius:6px;background:#111a24;padding:5px;margin-bottom:5px}.model-list label{display:flex;flex-direction:row;align-items:center;gap:7px;padding:4px 5px;color:#dbe5f0;overflow-wrap:anywhere}.model-list label:hover{background:#253140}.model-list .model-all{position:sticky;top:-5px;z-index:1;background:#1f2b39;border-bottom:1px solid #425165;font-weight:600}.legend{display:flex;gap:12px;flex-wrap:wrap;font-family:inherit!important}.part-a{color:#ff6161}.part-b{color:#65baff}.preview{display:block;width:100%;padding:5px;margin:8px 0}.preview img{display:block;width:100%;max-height:180px;object-fit:contain}.image-dialog{width:94vw;max-width:1500px}.image-dialog img{display:block;max-width:100%;max-height:75vh;margin:10px auto}#help-dialog{width:min(1000px,94vw);line-height:1.6}#help-dialog details{padding:12px 0;border-bottom:1px solid #425165}#help-dialog summary{font-size:16px;font-weight:600;color:#f0d27a}#help-dialog li{margin:8px 0}@container (max-width:1100px){.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .selection-grid{grid-template-columns:1fr}.condition{grid-template-columns:minmax(60px,1fr) 100px minmax(60px,1fr) 29px}}@container (max-width:700px){.choose-layout{display:block}.choose-layout .parameters{border-right:0;border-bottom:1px solid #354459}.workspace{grid-template-columns:160px minmax(0,1fr)}}button,input,select,textarea{padding:5px 7px;border-radius:5px}button{min-height:27px}input[type=checkbox]{width:14px;height:14px}.commandbar{position:relative;display:flex;gap:8px;min-height:45px;padding:5px 8px;overflow:visible;background:#131b25}.brand{flex:0 0 auto;margin-right:0;gap:5px}.brand img{width:28px;height:28px}.brand b{font-size:14px}.check-heading{display:grid;grid-template-rows:25px 12px;flex:0 1 230px;min-width:145px}.check-heading input{height:25px;border:0;background:transparent;padding:2px 5px;font-weight:600}.check-heading small{padding:0 5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:9px}.tabs{align-self:stretch;align-items:center;flex:0 0 auto;gap:3px;padding:0;border:0}.tabs button{flex:0 0 auto;min-width:0;padding:5px 9px;background:transparent;border-color:transparent}.tabs .active{background:#3e3828;border-color:#b99a38}.header-actions{display:flex;align-items:center;gap:4px;margin-left:auto}#dirty{margin-left:0;width:0;height:0;overflow:visible;font-size:0}#dirty:not(:empty){width:7px;height:7px;border-radius:50%;background:#e5bd43;box-shadow:0 0 0 2px #e5bd4328}.more-menu{position:relative;z-index:20}.more-menu summary{display:grid;place-items:center;width:29px;height:29px;border:1px solid #425165;border-radius:5px;background:#253140;cursor:pointer;list-style:none;font-size:18px}.more-menu summary::-webkit-details-marker{display:none}.more-popover{position:absolute;right:0;top:calc(100% + 5px);display:grid;width:190px;gap:3px;padding:6px;border:1px solid #506176;border-radius:7px;background:#192431;box-shadow:0 12px 35px #000a}.more-popover button{text-align:left}.notice{min-height:23px;max-height:45px;padding:3px 9px;font-size:10px}.run-progress{display:grid;grid-template-columns:minmax(150px,auto) minmax(120px,1fr) auto;align-items:center;gap:8px;min-height:24px;padding:3px 9px;border-bottom:1px solid #425165;background:#202a20;color:#d9e7d2;font-size:10px}.run-bar{width:100%;height:7px;overflow:hidden;border-radius:2px;background:#101810}.run-bar i{display:block;width:0;height:100%;background:#e3bc43}#run-phase,#run-value{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#run-value{text-align:right;color:#b9c9b3}.workspace{grid-template-columns:190px minmax(0,1fr)}aside{gap:6px;padding:7px;background:#141c26}.aside-title{font-weight:600;font-size:12px}.aside-actions{display:grid;gap:5px}.check-item{gap:2px;margin-bottom:3px;padding:6px 7px}.check-item small{font-size:9px}.main{background:#171d25}#content{overflow:hidden}.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .parameters{gap:9px;padding:8px}.choose-layout .selection-grid{gap:8px;padding:8px}.selection{padding:8px}.selection h3,h3{font-size:13px;margin-bottom:6px}label{gap:3px;font-size:11px}small,.selection-tools button,.preset-row button{font-size:10px}.model-list{height:125px}.model-list label{padding:2px 4px}.selection-tools{gap:4px;margin:5px 0}.selection-tools button,.preset-row button{padding:3px 5px;min-height:23px}.result-tools{display:flex;align-items:center;justify-content:space-between;gap:6px;flex-wrap:nowrap;min-height:38px;padding:5px 7px;border-bottom:1px solid #354459;background:#151f2a}.result-filters,.bulk-tools{display:flex;align-items:center;gap:5px;min-width:0}.result-filters{flex:1}.result-filters input[type=search]{flex:1 1 190px;min-width:120px}#result-depth{flex:0 1 125px;min-width:92px}#result-count,#selection-count{color:#9fb0c4;white-space:nowrap;font-size:10px}.bulk-tools select{max-width:125px}.result-area{grid-template-columns:minmax(0,1fr) 310px}th,td{padding:5px 6px;font-size:11px;line-height:1.25}th{max-width:190px}td{max-width:260px;min-width:76px}.pager{justify-content:flex-end;min-height:29px;padding:3px 7px}.pager #selection-count{margin-right:auto}.detail{display:flex;flex-direction:column;min-width:0;padding:0;overflow:hidden;background:#141e29}.detail-head{display:flex;align-items:center;justify-content:space-between;gap:6px;min-height:47px;padding:7px 8px 4px}.detail-head>div:first-child{min-width:0}.detail-head small{color:#8093aa;letter-spacing:.08em}.detail-head h3{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin:0}.detail-nav{display:flex;gap:3px}.detail-nav button{min-width:27px;padding:2px 7px;font-size:17px}.clash-summary{display:flex;gap:5px;padding:0 8px 5px;color:#adbdcf;font-size:9px}.clash-summary span{padding-right:5px;border-right:1px solid #405064}.clash-summary span:last-child{border:0}.detail .legend{margin:0;padding:0 8px 5px;font-size:10px}.preview-slot{height:clamp(92px,18cqh,145px);flex:0 0 auto;margin:0 7px 6px;overflow:hidden;border:1px solid #37475b;border-radius:6px;background:#0e151d}.preview{position:relative;width:100%;height:100%;margin:0;padding:0;border:0;background:transparent}.preview img{width:100%;height:100%;max-height:none;object-fit:contain}.preview span{position:absolute;right:5px;bottom:5px;padding:3px 6px;border-radius:4px;background:#101923db;font-size:9px}.preview-empty,.detail-empty{height:100%;display:grid;place-content:center;justify-items:center;gap:4px;color:#788ba1}.preview-empty>span,.detail-empty>span{font-size:24px}.detail-actions{display:grid;grid-template-columns:1fr 1fr;gap:5px;padding:0 7px 7px}.detail-scroll{flex:1;min-height:0;overflow:auto;padding:7px 8px 12px;border-top:1px solid #354459}.detail-scroll>label{margin:7px 0}.detail p{font:inherit}.coordinates{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;font:9px/1.3 Consolas,monospace;color:#91a3b7}.coordinates span{overflow:hidden;text-overflow:ellipsis}.detail details{padding:6px 0}.detail dl{font-size:10px}.detail-empty{padding:20px;text-align:center}footer{padding:2px 8px;font-size:9px}@container (max-width:1050px){.workspace{grid-template-columns:165px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 270px}.check-heading{flex-basis:185px}.tabs button{padding-inline:6px}#dirty{display:none}}@container (max-width:820px){.brand b,.brand small,#result-count{display:none}.check-heading{flex-basis:155px}.result-tools{overflow-x:auto}.result-area{grid-template-columns:minmax(0,1fr) 245px}}@container (max-height:410px){.notice,footer{display:none}.preview-slot{height:90px}}.depth-breakdown{display:grid;grid-template-columns:1fr auto;gap:4px 8px;margin-bottom:9px;font:inherit}.depth-breakdown small{grid-column:1/-1;color:#adbdcf;font:inherit}", Rt = /* @__PURE__ */ new WeakMap(), qe = "nashepo.collisionfinder360.project.", ne = () => ({
  format: "nashepo.checks",
  version: 1,
  checks: [],
  sets: []
}), Me = (t) => {
  if (!(!t || typeof sessionStorage > "u"))
    try {
      const e = sessionStorage.getItem(qe + t);
      return e ? ze(e) : void 0;
    } catch {
      return;
    }
}, ke = (t, e) => {
  if (!(!t || typeof sessionStorage > "u"))
    try {
      sessionStorage.setItem(
        qe + t,
        JSON.stringify(e, (n, s) => n === "image" ? void 0 : s)
      );
    } catch {
    }
};
function un(t, e) {
  const n = t.shadowRoot || t.attachShadow({ mode: "open" }), s = Te(t);
  let a = e.projectToken(), i = e.projectId(), o = a && (Rt.get(a) || Me(i)) || ne();
  a && Rt.set(a, o);
  let r, d = o.checks[0]?.id || "", f = "select", c = "", u = 0, g = !1, x = !1, M, E = !0, F = !1;
  const D = /* @__PURE__ */ new Set();
  let $, C, S = 0;
  const q = () => o.checks.find((l) => l.id === d), m = (l) => n.querySelector("#" + l);
  n.innerHTML = `<style>${fn}</style><main><header class="commandbar"><div class="brand"><img src="${pn}" alt=""><b>НашеПО</b><small>${Ge}</small></div><div class="check-heading"><input id="name" aria-label="Имя проверки" placeholder="Выберите проверку"><small id="check-summary">Проверка не выбрана</small></div><div id="tabs" class="tabs">${[
    ["select", "Выбор"],
    ["results", "Результаты"],
    ["rules", "Правила"],
    ["report", "Отчёт"]
  ].map(([l, p]) => `<button data-tab="${l}">${p}</button>`).join(
    ""
  )}</div><div class="header-actions"><button id="scan" title="Перечитать список и геометрию выбранных моделей">↻ Модели</button><button id="run" class="primary">▶ Запустить</button><button id="cancel" hidden>Остановить</button><details class="more-menu"><summary title="Другие команды">⋮</summary><div class="more-popover"><button id="open">Открыть проверки</button><button id="save">Сохранить проверки</button><button id="copy">Копировать проверку</button><button id="delete">Удалить проверку</button><button id="settings">Настройки</button><button id="help">Справка</button></div></details></div><span id="dirty"></span></header><div id="run-progress" class="run-progress" hidden><span id="run-phase">Подготовка</span><div id="run-bar" class="run-bar" role="progressbar"><i id="run-fill"></i></div><span id="run-value"></span></div><div class="notice" id="notice" role="status">Откройте IFC/SMDX в проекте и нажмите «Модели».</div><div class="workspace"><aside><div class="aside-title">Проверки</div><input id="test-search" type="search" placeholder="Поиск проверок"><div id="checks"></div><div class="aside-actions"><button id="all">Запустить все</button><button id="new" class="primary">＋ Новая проверка</button></div></aside><section class="main"><div id="content"></div></section></div><footer><span id="model-count">Модели не прочитаны</span><span>Расчёт выполняется на вашем компьютере</span></footer><input id="file" type="file" accept=".json" hidden><dialog id="settings-dialog"><h2>Настройки</h2><label>Дистанция камеры, м<input id="distance" type="number" value="15" min="0.5"></label><p class="links"><a href="https://nashepo.ru/" target="_blank" rel="noopener noreferrer">Сайт НашеПО</a><a href="https://t.me/RoburFan" target="_blank" rel="noopener noreferrer">Telegram</a></p><button data-close="settings-dialog">Закрыть</button></dialog><dialog id="help-dialog">${Re}<button data-close="help-dialog">Закрыть</button></dialog><dialog id="set-dialog"><h2>Сохранить набор моделей</h2><label>Название<input id="set-name" maxlength="120"></label><div class="dialog-actions"><button id="set-cancel">Отмена</button><button id="set-confirm" class="primary">Сохранить</button></div></dialog></main>`;
  const Z = document.createElement("button");
  Z.id = "clear-project", Z.textContent = "Очистить проект", m("save").after(Z), n.querySelector(".more-popover").addEventListener(
    "click",
    () => n.querySelector(".more-menu").removeAttribute("open")
  );
  const L = (l, p = !1) => {
    m("notice").textContent = l, m("notice").classList.toggle("error", p);
  }, j = (l, p, b, h) => {
    const I = m("run-progress"), N = m("run-bar"), k = m("run-fill");
    if (I.hidden = !1, m("notice").hidden = !0, m("run-phase").textContent = l, b && b > 0 && p !== void 0) {
      const P = Math.max(0, Math.min(100, p / b * 100));
      k.style.width = `${P}%`, N.setAttribute("aria-valuemin", "0"), N.setAttribute("aria-valuemax", "100"), N.setAttribute("aria-valuenow", String(Math.round(P))), m("run-value").textContent = `${Math.round(P)}% · ${p}/${b}` + (h === void 0 ? "" : ` · найдено ${h}`);
    } else
      k.style.width = "0", N.removeAttribute("aria-valuenow"), m("run-value").textContent = h === void 0 ? "" : `Найдено ${h}`;
    N.setAttribute("aria-valuetext", m("run-value").textContent || l);
  }, y = () => {
    m("run-progress").hidden = !0, m("notice").hidden = !1;
  }, w = async (l) => {
    try {
      await l();
    } catch (p) {
      L(p instanceof Error ? p.message : String(p), !0);
    }
  }, z = () => new Promise((l) => {
    const p = m("set-dialog"), b = m("set-name");
    let h = !1;
    const I = (N) => {
      h || (h = !0, p.close(), l(N));
    };
    b.value = "Новый набор", m("set-confirm").onclick = () => {
      const N = b.value.trim();
      N ? I(N) : b.focus();
    }, m("set-cancel").onclick = () => I(), p.oncancel = (N) => {
      N.preventDefault(), I();
    }, p.showModal(), b.focus(), b.select();
  }), A = () => {
    F = !0, m("dirty").textContent = "Есть несохранённые изменения", a && Rt.set(a, o), ke(i, o);
  }, G = () => {
    const l = e.projectToken();
    return !l || l === a ? !1 : (!a && (o.checks.length || o.sets.length) ? Rt.set(l, o) : o = Rt.get(l) || Me(e.projectId()) || ne(), Rt.set(l, o), a = l, i = e.projectId(), r = void 0, d = o.checks[0]?.id || "", c = "", D.clear(), u = 0, F = !1, e.clear(), m("dirty").textContent = "", !0);
  }, R = () => {
    const l = q();
    l?.lastRun && (l.status = "stale"), A(), W();
  }, v = () => [
    ...new Set(
      (r?.elements || []).flatMap((l) => Object.keys(l.properties))
    )
  ].sort(), O = (l, p) => l.map(
    (b) => `<option value="${ht(b)}" ${b === p ? "selected" : ""}>${ht(b)}</option>`
  ).join("");
  function H() {
    const l = q(), p = m("result-search")?.value.toLowerCase() || "", b = m("result-state")?.value || "", h = Number(m("result-depth")?.value || 0);
    return (l?.results || []).filter(
      (I) => (!b || I.state === b) && (l?.type === "duplicates" || Ae(I, h, l?.precision ?? 0)) && (!p || JSON.stringify({ ...I, image: void 0 }).toLowerCase().includes(p))
    );
  }
  function W() {
    const l = m("test-search").value.toLowerCase();
    m("checks").innerHTML = o.checks.filter((p) => p.name.toLowerCase().includes(l)).map(
      (p) => `<button class="check-item ${p.id === d ? "active" : ""}" data-check="${p.id}"><strong>${ht(p.name)}</strong><small>${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[p.status]} · ${p.results.filter((b) => !["resolved", "excluded"].includes(b.state)).length} в работе / ${p.results.length}</small></button>`
    ).join("");
  }
  function st(l, p) {
    const b = r?.elements.filter(
      (U) => (q().includeHidden || !U.hidden) && Gt(U, l)
    ).length || 0, h = l.manualOnly ? rt(l) : l.modelsMode === "selected" ? l.models : (r?.models || []).map((U) => U.id), I = r && h.every((U) => r.indexedModelIds.includes(U)) ? `${b} элементов` : "число после запуска", N = r?.models || [], k = l.modelsMode !== "selected", P = o.sets.map(
      (U) => `<option value="${ht(U.id)}" ${l.presetId === U.id ? "selected" : ""}>${ht(U.name)}</option>`
    ).join("");
    return `<article class="selection" data-side="${p}"><h3>Выбор ${p.toUpperCase()} <span data-selection-count>${I}</span></h3>${l.manualOnly ? '<p class="selection-mode">Только элементы, выбранные вручную</p>' : ""}<div class="preset-row"><select class="preset"><option value="">Набор моделей…</option>${P}</select><button data-selection="load-set">Применить</button><button data-selection="save-set">Сохранить набор</button><button data-selection="delete-set" ${l.presetId ? "" : "disabled"}>Удалить</button></div><div class="model-list"><label class="model-all"><input type="checkbox" class="all-models" ${k ? "checked" : ""}> Все модели</label>${N.map((U) => `<label><input type="checkbox" class="model-check" value="${ht(U.id)}" ${k || l.models.includes(U.id) ? "checked" : ""}> ${ht(U.name)}</label>`).join("") || "<small>Нажмите «Модели».</small>"}</div><small>Отметьте файлы, которые должны участвовать в выборе ${p.toUpperCase()}.</small><div class="selection-tools"><button data-selection="show">Показать выбранные элементы</button><button data-selection="only">Только выделенные в 3D</button><button data-selection="include">＋ Добавить из 3D</button><button data-selection="exclude">− Исключить из 3D</button><button data-selection="reset">Сбросить ручной выбор</button></div><small>Добавлено вручную: ${l.include.length} · исключено: ${l.exclude.length}</small></article>`;
  }
  function X() {
    W();
    const l = q();
    m("name").value = l?.name || "", m("check-summary").textContent = l ? `${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[l.status]} · ${l.results.filter((p) => !["resolved", "excluded"].includes(p.state)).length} в работе / ${l.results.length}` : "Проверка не выбрана";
    for (const p of ["name", "copy", "delete", "run"])
      m(p).disabled = !l || g;
    for (const p of n.querySelectorAll("[data-tab]"))
      p.classList.toggle("active", p.dataset.tab === f);
    if (!l) {
      m("content").innerHTML = '<div class="empty"><h2>Создайте первую проверку</h2><p>Обновите модели, затем выберите, какие элементы проверять друг с другом.</p></div>';
      return;
    }
    f === "select" && (m("content").innerHTML = `<div class="choose-layout"><div class="parameters"><h3>Параметры проверки</h3><label>Тип<select id="type"><option value="intersection" ${l.type === "intersection" ? "selected" : ""}>По пересечению</option><option value="duplicates" ${l.type === "duplicates" ? "selected" : ""}>Дублирование</option></select></label><label title="Запас при отборе и фильтрации; не обнуляет малые вхождения и не гарантирует погрешность оценки">Точность расчёта, мм<input id="precision" type="number" value="${l.precision}" min="0.001" max="100" step="0.1"></label><label title="Конфликты с меньшей оценкой глубины не попадут в результат">Минимальная глубина, мм<input id="min-penetration" type="number" value="${l.minPenetration}" min="0" max="100000" step="1" ${l.type === "duplicates" ? "disabled" : ""}></label><label class="check"><input id="touching" type="checkbox" ${l.touching ? "checked" : ""} ${l.type === "duplicates" ? "disabled" : ""}>Учитывать касания</label><small>Для отбора — большее из толщины перекрытия и захода вдоль оси профиля или трассы. Подробнее — в справке.</small><p class="legend"><span class="part-a">● Выбор А</span><span class="part-b">● Выбор Б</span></p></div><div class="selection-grid">${st(l.a, "a")}${st(l.b, "b")}</div></div><datalist id="property-fields">${O(v(), "")}</datalist>`), f === "rules" && (m("content").innerHTML = `<div class="rules"><h3>Исключение пар</h3><p>Элемент сам с собой не проверяется. Пара А/Б учитывается один раз.</p><label class="check"><input id="same-model" type="checkbox" ${l.ignoreSameModel ? "checked" : ""}>Не проверять элементы одной модели</label><label class="check"><input id="same-group" type="checkbox" ${l.ignoreSameGroup ? "checked" : ""}>Не проверять геометрию одного составного объекта</label><label>Не проверять пары с одинаковым значением свойства<input id="equal-property" list="property-fields" value="${ht(l.equalProperty)}" placeholder="Без ограничения"></label><label class="check"><input id="hidden" type="checkbox" ${l.includeHidden ? "checked" : ""}>Включать скрытые элементы прочитанных моделей</label><p>Незагруженные подключённые файлы нужно открыть перед расчётом.</p><datalist id="property-fields">${O(v(), "")}</datalist></div>`), f === "results" && (m("content").innerHTML = `<div class="result-tools"><div class="result-filters"><input id="result-search" type="search" placeholder="Поиск по результатам"><select id="result-state"><option value="">Все состояния</option>${Object.entries(
      Ct
    ).map(([p, b]) => `<option value="${p}">${b}</option>`).join("")}</select>${l.type === "intersection" ? '<input id="result-depth" type="number" min="0" step="1" placeholder="Глубина от, мм">' : ""}<button id="show-markers" role="switch" aria-checked="${E}">${E ? "● Знаки" : "○ Знаки"}</button><span id="result-count"></span></div><div class="bulk-tools"><select id="bulk-state" title="Состояние для выбранных строк">${Object.entries(
      Ct
    ).map(([p, b]) => `<option value="${p}">${b}</option>`).join("")}</select><button id="bulk">Применить</button></div></div><div class="result-area"><div class="table-area"><div class="scroll" id="table"></div><div class="pager"><span id="selection-count"></span><button id="prev-page">←</button><span id="page"></span><button id="next-page">→</button></div></div><div class="detail" id="detail"></div></div>`, Y(), Q()), f === "report" && (m("content").innerHTML = `<div class="report"><h3>${ht(l.name)}</h3><p>Результатов: ${l.results.length}. Выбрано: ${D.size}. ${l.status === "stale" ? "Результаты устарели — рекомендуется повторный запуск." : ""}</p><label class="check"><input id="selected-only" type="checkbox" ${D.size ? "checked" : ""}>Только выбранные строки</label><label class="check"><input id="report-images" type="checkbox" checked>Добавить снимки (недостающие будут созданы автоматически)</label><button id="export-html" class="primary">Сформировать HTML-отчёт</button><button id="export-viewer">Сессия для плагина «Коллизии»</button><p>Правила и все результаты сохраняются кнопкой «Сохранить проверки» в верхней панели.</p></div>`), m("content").inert = g;
  }
  const Pt = (l) => l.axialPenetrationMm !== void 0 ? `Для отбора используется большее значение: толщина ${l.overlapThicknessMm === void 0 ? "не определена" : Mt(l.overlapThicknessMm) + " мм"}; продольный заход ${Mt(l.axialPenetrationMm)} мм` : l.kind === "touch" ? "Тела соприкасаются, общего объёма нет" : l.depth === "unmeasurable" ? "У элемента нет собственного объёма, замер глубины к нему неприменим" : l.depth === "tolerance" ? "Пересечение найдено, но его глубина не разрешена при текущем расчёте" : l.depth === "approximate" ? "Восстановлена внутренняя область оболочки, совмещены швы либо сокращён расчёт; точность числа не гарантируется" : "Оценка локальной толщины перекрытия двух элементов";
  function Y() {
    const l = q(), p = H(), b = Math.max(1, Math.ceil(p.length / 50));
    u = Math.max(0, Math.min(u, b - 1));
    const h = p.slice(u * 50, u * 50 + 50);
    m("table").innerHTML = p.length ? `<table><thead><tr><th><input id="check-page" type="checkbox" aria-label="Выбрать страницу" ${h.every((I) => D.has(I.id)) ? "checked" : ""}></th>${["№", "Состояние", "Глубина, мм", "Длина контакта, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "Комментарий"].map((I) => `<th>${I}</th>`).join("")}</tr></thead><tbody>${h.map((I, N) => `<tr data-result="${ht(I.id)}" class="${I.id === c ? "active" : ""}"><td><input type="checkbox" class="row-check" aria-label="Выбрать конфликт" ${D.has(I.id) ? "checked" : ""}></td>${[u * 50 + N + 1, Ct[I.state], te(I, l.type), I.contactLengthMm === void 0 ? "—" : "≈ " + Mt(I.contactLengthMm), I.a.name, I.a.model, I.a.guid || "—", I.b.name, I.b.model, I.b.guid || "—", I.note].map((k) => `<td title="${ht(k)}">${ht(k)}</td>`).join("")}</tr>`).join("")}</tbody></table>` : '<div class="empty">Нет результатов. Запустите проверку или измените фильтры.</div>', m("page").textContent = `${u + 1} / ${b}`, m("result-count").textContent = `${p.length} результатов`, m("selection-count").textContent = `Выбрано: ${D.size}`, m("prev-page").disabled = u === 0, m("next-page").disabled = u === b - 1;
  }
  function Q() {
    const l = q(), p = H(), b = p.findIndex((I) => I.id === c), h = l?.results.find((I) => I.id === c);
    m("detail").innerHTML = h ? `<div class="detail-head"><div><small>КОЛЛИЗИЯ</small><h3>#${b + 1} ${ht(h.a.name)} × ${ht(h.b.name)}</h3></div><div class="detail-nav"><button id="previous" title="Предыдущая коллизия" ${b <= 0 ? "disabled" : ""}>‹</button><button id="next" title="Следующая коллизия" ${b < 0 || b >= p.length - 1 ? "disabled" : ""}>›</button></div></div><div class="clash-summary"><span>${l?.type === "duplicates" ? "Дублирование" : "Пересечение"}</span><span title="${ht(Pt(h))}">${l?.type === "duplicates" ? "Совпадение геометрии" : h.kind === "touch" ? "Касание" : h.depth ? Ne[h.depth] : `Глубина ${Mt(h.penetrationMm)} мм`}</span><span>${ht(Ct[h.state])}</span></div><p class="legend"><span class="part-a">● Элемент А</span><span class="part-b">● Элемент Б</span></p><div class="preview-slot">${h.image ? `<button id="open-image" class="preview"><img src="${ht(h.image)}" alt="Снимок коллизии"><span>Открыть крупнее</span></button>` : '<div class="preview-empty"><span>◫</span><small>Снимок создастся после перехода в 3D</small></div>'}</div><div class="detail-actions"><button id="focus" class="primary">Перейти в 3D</button><button id="capture-image">▣ Снимок пары</button></div><div class="detail-scroll">${h.axialPenetrationMm !== void 0 ? `<div class="depth-breakdown"><span>Толщина перекрытия</span><b>${h.overlapThicknessMm === void 0 ? "—" : Mt(h.overlapThicknessMm) + " мм"}</b><span>Заход вдоль оси</span><b>${Mt(h.axialPenetrationMm)} мм</b><small>Для фильтра — большее из двух значений. Заход учитывает внутреннее пространство конструкции.</small></div>` : ""}${h.contactLengthMm !== void 0 ? `<div class="depth-breakdown"><span>Длина контакта вдоль элемента</span><b>≈ ${Mt(h.contactLengthMm)} мм</b><small>Непрерывный участок соприкосновения поверхностей. Это длина контакта, а не глубина; порог глубины её не учитывает.</small></div>` : ""}<div class="coordinates">${h.point.map((I, N) => `<span>${["X", "Y", "Z"][N]} ${I.toFixed(3)}</span>`).join("")}</div><label>Состояние<select id="edit-state">${Object.entries(
      Ct
    ).map(
      ([I, N]) => `<option value="${I}" ${h.state === I ? "selected" : ""}>${N}</option>`
    ).join(
      ""
    )}</select></label><label>Назначение<input id="assignee" value="${ht(h.assignee)}"></label><label>Комментарий<textarea id="note" rows="2">${ht(h.note)}</textarea></label>${[
      h.a,
      h.b
    ].map(
      (I, N) => `<details><summary>Элемент ${N ? "Б" : "А"} · свойства</summary><dl>${Object.entries(
        I.properties
      ).map(([k, P]) => `<dt>${ht(k)}</dt><dd>${ht(P)}</dd>`).join("")}</dl></details>`
    ).join("")}</div>` : '<div class="detail-empty"><span>◫</span><p>Выберите коллизию в таблице</p><small>Двойной щелчок сразу перенесёт камеру в 3D.</small></div>';
  }
  const rt = (l) => {
    const p = new Set(
      !l.manualOnly && l.modelsMode === "selected" ? l.models : []
    );
    for (const b of l.include)
      try {
        p.add(String(JSON.parse(b)[0]));
      } catch {
        const h = r?.elements.find(
          (I) => I.id === b
        )?.modelId;
        h && p.add(h);
      }
    return [...p];
  }, lt = (l) => {
    if (!l?.length) return;
    const p = /* @__PURE__ */ new Set();
    for (const b of l)
      for (const h of [b.a, b.b]) {
        if (!h.manualOnly && h.modelsMode !== "selected") return;
        for (const I of rt(h)) p.add(I);
      }
    return p;
  }, yt = (l) => {
    let p = l.trim().replace(/\\/g, "/").toLocaleLowerCase();
    try {
      p = decodeURIComponent(p);
    } catch {
    }
    p = p.replace(/[?#].*$/, "");
    const b = p.split("/").filter(Boolean).at(-1) || p;
    return /* @__PURE__ */ new Set([p, b]);
  }, at = (l) => {
    const p = new Set(l.map((P) => P.id)), b = l.map((P) => ({
      id: P.id,
      aliases: /* @__PURE__ */ new Set([
        ...yt(P.id),
        ...yt(P.name)
      ])
    })), h = (P) => {
      if (p.has(P)) return P;
      const U = yt(P), B = b.filter(
        (J) => [...U].some((_) => J.aliases.has(_))
      );
      return B.length === 1 ? B[0].id : P;
    }, I = (P) => {
      try {
        const U = JSON.parse(P);
        if (!Array.isArray(U) || U.length < 2) return P;
        const B = String(U[0]), J = h(B);
        return J === B ? P : JSON.stringify([J, ...U.slice(1)]);
      } catch {
        return P;
      }
    };
    let N = !1;
    const k = (P) => {
      const U = P.models.map(h), B = P.include.map(I), J = P.exclude.map(I);
      (U.some((_, ot) => _ !== P.models[ot]) || B.some((_, ot) => _ !== P.include[ot]) || J.some((_, ot) => _ !== P.exclude[ot])) && (P.models = [...new Set(U)], P.include = [...new Set(B)], P.exclude = [...new Set(J)], N = !0);
    };
    for (const P of o.checks)
      k(P.a), k(P.b), P.modelsAtRun && (P.modelsAtRun = P.modelsAtRun.map(h));
    for (const P of o.sets) {
      const U = P.selection.models.map(h);
      U.some((B, J) => B !== P.selection.models[J]) && (P.selection.models = [...new Set(U)], N = !0);
    }
    return N && A(), N;
  }, Dt = () => {
    const l = q();
    if (l)
      for (const p of n.querySelectorAll("[data-side]")) {
        const b = p.dataset.side, h = r?.elements.filter(
          (P) => (l.includeHidden || !P.hidden) && Gt(P, l[b])
        ).length || 0, I = l[b].manualOnly ? rt(l[b]) : l[b].modelsMode === "selected" ? l[b].models : (r?.models || []).map((P) => P.id), N = !!r && I.every((P) => r.indexedModelIds.includes(P)), k = p.querySelector(
          "[data-selection-count]"
        );
        k && (k.textContent = N ? `${h} элементов` : "число после запуска");
      }
  };
  function ft() {
    e.markers(
      H(),
      c,
      E,
      (l) => w(() => vt(l, !0))
    );
  }
  function vt(l, p = !1) {
    if (!g) {
      if (c = l, f === "results") {
        const b = H().findIndex((I) => I.id === l), h = b < 0 ? u : Math.floor(b / 50);
        h !== u && (u = h, Y());
        for (const I of n.querySelectorAll("[data-result]"))
          I.classList.toggle("active", I.dataset.result === l);
        Q(), requestAnimationFrame(() => {
          [...n.querySelectorAll("[data-result]")].find(
            (N) => N.dataset.result === l
          )?.scrollIntoView({ block: "nearest", inline: "nearest" });
        });
      }
      if (ft(), p) {
        const b = q()?.results.find((h) => h.id === l);
        b && (e.focus(b, Number(m("distance").value)), ct(b));
      }
    }
  }
  function ct(l) {
    clearTimeout(C);
    const p = ++S, b = Number(m("distance").value);
    l.image && l.imageScope === "pair-ab" && l.imageDistance === b || !e.canLocate(l) || (C = window.setTimeout(async () => {
      if (!(p !== S || g || c !== l.id))
        try {
          const h = await e.snapshot(
            l,
            b,
            () => p !== S || g || c !== l.id,
            !1,
            !1
          );
          if (p !== S || c !== l.id) return;
          l.image = h, l.imageScope = "pair-ab", l.imageDistance = b, A(), f === "results" && Q();
        } catch (h) {
          p === S && c === l.id && L(
            "Не удалось создать снимок выбранной коллизии: " + (h instanceof Error ? h.message : String(h)),
            !0
          );
        }
    }, 500));
  }
  async function bt(l) {
    x = !1, tt(!0), j("Создание снимка пары");
    try {
      const p = Number(m("distance").value);
      l.image = await e.snapshot(l, p, () => x), l.imageScope = "pair-ab", l.imageDistance = p, A(), f === "results" && c === l.id && Q();
    } catch (p) {
      L(
        "Результаты сохранены. Снимок пары не создан: " + (p instanceof Error ? p.message : String(p)),
        !0
      );
    } finally {
      y(), tt(!1);
    }
  }
  async function ut(l, p = !1) {
    G(), j("Подготовка моделей");
    let b = p ? /* @__PURE__ */ new Set() : lt(l);
    if (!p && b?.size) {
      const h = await e.scan(
        (I) => j(I),
        () => x,
        /* @__PURE__ */ new Set()
      );
      r = h, at(h.models) && (b = lt(l));
    }
    r = await e.scan(
      (h) => {
        L(h), j(h);
      },
      () => x,
      b
    ), at(r.models), m("model-count").textContent = `Проиндексировано моделей: ${r.indexedModelIds.length} из ${r.models.length} · элементов: ${r.elements.length}`, X(), L(
      r.blockers.length ? r.blockers.join(" ") : r.warnings.length ? `Модели прочитаны с замечаниями. ${r.warnings.join(" ")}` : "Модели прочитаны. Настройте выборки и запустите проверку.",
      !!r.blockers.length
    );
  }
  const tt = (l) => {
    g = l, l && (clearTimeout(C), S++);
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
  async function it(l) {
    const p = (h) => {
      const I = `${l.name} · ${h.phase}`;
      L(`${I} ${h.done}/${h.total} · найдено ${h.found}`), j(I, h.done, h.total, h.found);
    };
    let b;
    try {
      b = new ln();
    } catch {
      return rn(
        r.elements,
        l,
        p,
        () => x,
        (h) => e.geometry(h, () => x)
      );
    }
    return M = b, new Promise((h, I) => {
      const N = () => {
        b.terminate(), M = void 0, $ = void 0;
      };
      $ = () => {
        N(), I(Error("Расчёт отменён. Предыдущие результаты сохранены."));
      }, b.onmessage = async (k) => {
        if (k.data.load) {
          try {
            const P = await e.geometry(
              k.data.load,
              () => x || M !== b
            );
            if (M !== b) return;
            const U = [
              P.vertices?.buffer,
              P.indices?.buffer
            ].filter(Boolean);
            b.postMessage(
              { request: k.data.request, geometry: P },
              U
            );
          } catch (P) {
            M === b && b.postMessage({
              request: k.data.request,
              error: P instanceof Error ? P.message : String(P)
            });
          }
          return;
        }
        k.data.progress ? p(k.data.progress) : (N(), k.data.error ? I(Error(k.data.error)) : h(k.data.results));
      }, b.onerror = (k) => {
        N(), I(
          Error(
            `Не удалось запустить расчёт в фоновом потоке: ${k.message || "ошибка загрузки"}`
          )
        );
      }, b.postMessage({
        elements: r.elements,
        streaming: typeof e.geometry == "function",
        check: structuredClone({ ...l, results: [], warnings: [] })
      });
    });
  }
  async function nt(l = !1) {
    if (g) return;
    G();
    const p = l ? [...o.checks] : [q()].filter(Boolean);
    if (!p.length) throw Error("Создайте проверку.");
    for (const b of p)
      for (const h of [b.a, b.b])
        h.conditions = [], h.mode = "all";
    x = !1, tt(!0), j("Подготовка моделей");
    try {
      if (await ut(p), tt(!0), r.blockers.length)
        throw Error(
          "Состав моделей прочитан не полностью. " + r.blockers.join(" ")
        );
      for (const h of p) {
        if (x) break;
        for (const P of ["a", "b"]) {
          const U = h[P], B = P === "a" ? "А" : "Б";
          if (U.modelsMode === "selected" && U.models.some((_) => !r.models.some((ot) => ot.id === _)))
            throw Error(
              `${h.name}: одна из моделей выборки отсутствует. Исправьте выборку.`
            );
          if (U.include.some((_) => !r.elements.some((ot) => ot.id === _)))
            throw Error(
              `${h.name}: вручную добавленный элемент отсутствует в модели.`
            );
          const J = $e(r.elements, U, h.includeHidden);
          if (J) throw Error(`${h.name} · выбор ${B}: ${J}`);
        }
        const I = Ye(h);
        if (h.configAtRun === I && h.modelsAtRun?.some(
          (P) => !r.models.some((U) => U.id === P)
        ))
          throw Error(
            `${h.name}: состав моделей уменьшился. Подключите прежние модели или создайте копию проверки для нового состава. Прежние результаты сохранены.`
          );
        const N = await it(h);
        if (x || !e.isCurrent())
          throw Error(
            "Проект изменился или расчёт отменён. Предыдущие результаты сохранены."
          );
        const k = (/* @__PURE__ */ new Date()).toISOString();
        h.results = He(
          h.configAtRun === I ? h.results : [],
          N,
          k
        ), h.lastRun = k, h.fingerprint = r.fingerprint, h.configAtRun = I, h.modelsAtRun = [...r.indexedModelIds], h.status = "done", h.warnings = [...r.warnings], d = h.id, c = h.results[0]?.id || "", D.clear(), A();
      }
      f = "results", X(), ft(), L(
        `Проверка завершена. ${q()?.results.length || 0} результатов. Сохраните проверки для продолжения работы.`
      );
      const b = q()?.results.find((h) => h.id === c);
      b && !x && await bt(b);
    } finally {
      y(), tt(!1), X();
    }
  }
  function $t(l) {
    const p = l.closest("[data-side]")?.dataset.side;
    if (!p) return;
    const b = q()[p], h = l, I = l.closest("[data-side]");
    if (h.classList.contains("preset")) {
      b.presetId = h.value || void 0, I.querySelector(
        '[data-selection="delete-set"]'
      ).disabled = !b.presetId;
      return;
    }
    if (h.classList.contains("all-models")) {
      for (const N of I.querySelectorAll(
        ".model-check"
      ))
        N.checked = h.checked;
      b.modelsMode = h.checked ? "all" : "selected", b.models = [], b.manualOnly = !1, b.presetId = void 0;
    }
    if (h.classList.contains("model-check")) {
      const N = [
        ...I.querySelectorAll(".model-check")
      ], k = N.filter((U) => U.checked).map((U) => U.value), P = N.length > 0 && k.length === N.length;
      I.querySelector(".all-models").checked = P, b.modelsMode = P ? "all" : "selected", b.models = P ? [] : k, b.manualOnly = !1, b.presetId = void 0;
    }
    b.conditions = [], b.mode = "all", R(), Dt();
  }
  m("new").onclick = () => {
    const l = Be();
    l.name = `Проверка ${o.checks.length + 1}`, o.checks.push(l), d = l.id, f = "select", c = "", D.clear(), A(), X();
  }, m("scan").onclick = () => w(async () => {
    x = !1, tt(!0), j("Чтение моделей");
    try {
      const l = q();
      await ut(l ? [l] : void 0, !l);
    } finally {
      y(), tt(!1), X();
    }
  }), m("run").onclick = () => w(() => nt()), m("all").onclick = () => w(() => nt(!0)), m("cancel").onclick = () => {
    x = !0, $?.();
  }, m("test-search").oninput = W, m("checks").onclick = (l) => {
    const p = l.target.closest(
      "[data-check]"
    );
    p && !g && (e.clear(), d = p.dataset.check, c = "", D.clear(), u = 0, X());
  }, m("tabs").onclick = (l) => {
    const p = l.target.closest("[data-tab]");
    p && !g && (f = p.dataset.tab, X());
  }, m("name").onchange = () => {
    const l = q();
    l && (l.name = m("name").value.trim() || "Проверка", A(), W());
  }, m("copy").onclick = () => {
    const l = q();
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
    }), o.checks.push(p), d = p.id, c = "", D.clear(), A(), X();
  }, m("delete").onclick = () => {
    q() && confirm(`Удалить проверку «${q().name}» и её результаты?`) && (o.checks = o.checks.filter((l) => l.id !== d), d = o.checks[0]?.id || "", D.clear(), e.clear(), A(), X());
  }, m("clear-project").onclick = () => {
    !o.checks.length && !o.sets.length || confirm(
      "Очистить проверки, наборы моделей и результаты текущего проекта?"
    ) && (o.checks = [], o.sets = [], r = void 0, d = "", c = "", D.clear(), e.clear(), A(), m("model-count").textContent = "Модели не прочитаны", X(), L("Данные проверок текущего проекта очищены."));
  }, m("save").onclick = () => {
    ve("НашеПО-проверки.json", JSON.stringify(o, null, 2)), F = !1, m("dirty").textContent = "Файл проверок сохранён";
  }, m("open").onclick = () => m("file").click(), m("file").onchange = () => w(async () => {
    const l = m("file").files?.[0];
    if (!l) return;
    const p = ze(await l.text());
    F && !confirm("Заменить текущие несохранённые проверки данными из файла?") || (o = p, r && e.isCurrent() && at(r.models), a && Rt.set(a, o), ke(i, o), d = o.checks[0]?.id || "", c = "", D.clear(), e.clear(), F = !1, m("dirty").textContent = "Проверки открыты", X(), L("Проверки открыты. Обновите модели перед переходом к элементам."), m("file").value = "");
  });
  for (const l of ["settings", "help"])
    m(l).onclick = () => m(l + "-dialog").showModal();
  for (const l of n.querySelectorAll("[data-close]"))
    l.onclick = () => m(l.dataset.close).close();
  m("content").onchange = (l) => w(() => {
    const p = l.target, b = q();
    if (!b) return;
    if (p.closest("[data-side]")) {
      $t(p);
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
        const I = Number(p.value);
        if (!Number.isFinite(I) || I < 1e-3 || I > 100)
          throw p.value = String(b.precision), Error("Точность должна быть от 0,001 до 100 мм.");
        b.precision = I;
      }
      if (p.id === "min-penetration") {
        const I = Number(p.value);
        if (!Number.isFinite(I) || I < 0 || I > 1e5)
          throw p.value = String(b.minPenetration), Error(
            "Минимальная глубина должна быть от 0 до 100 000 мм."
          );
        b.minPenetration = I;
      }
      p.id === "type" && (b.type = p.value), p.id === "touching" && (b.touching = p.checked), p.id === "same-model" && (b.ignoreSameModel = p.checked), p.id === "same-group" && (b.ignoreSameGroup = p.checked), p.id === "hidden" && (b.includeHidden = p.checked), p.id === "equal-property" && (b.equalProperty = p.value), R(), X();
      return;
    }
    if (p.id === "result-state") {
      u = 0, Y();
      return;
    }
    if (p.id === "check-page") {
      for (const I of H().slice(u * 50, u * 50 + 50))
        p.checked ? D.add(I.id) : D.delete(I.id);
      Y();
      return;
    }
    if (p.classList.contains("row-check")) {
      const I = p.closest("[data-result]").dataset.result;
      p.checked ? D.add(I) : D.delete(I), m("selection-count").textContent = `Выбрано: ${D.size}`;
      return;
    }
    const h = b.results.find((I) => I.id === c);
    h && (p.id === "edit-state" && (h.state = p.value, Y(), W(), ft()), p.id === "assignee" && (h.assignee = p.value), p.id === "note" && (h.note = p.value, Y()), A());
  }), m("content").oninput = (l) => {
    const p = l.target;
    (p.id === "result-search" || p.id === "result-depth") && (u = 0, Y());
    const b = q(), h = Number(p.value);
    b && p.id === "precision" && Number.isFinite(h) && h >= 1e-3 && h <= 100 && (b.precision = h, R()), b && p.id === "min-penetration" && Number.isFinite(h) && h >= 0 && h <= 1e5 && (b.minPenetration = h, R());
  }, m("content").onclick = (l) => w(async () => {
    const p = l.target, b = p.closest("button"), h = q();
    if (!h) return;
    if (b?.dataset.selection) {
      const N = b.closest("[data-side]").dataset.side, k = h[N], P = m("content").scrollTop;
      let U = !0;
      switch (b.dataset.selection) {
        case "load-set": {
          const B = o.sets.find((J) => J.id === k.presetId);
          if (!B) throw Error("Выберите сохранённый набор моделей.");
          Object.assign(k, structuredClone(B.selection), {
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
          if (k.manualOnly)
            throw Error(
              "Ручную выборку элементов нельзя сохранить как набор моделей."
            );
          const B = await z();
          if (!B) return;
          const J = {
            id: crypto.randomUUID(),
            name: B,
            selection: {
              models: [...k.models],
              modelsMode: k.modelsMode,
              conditions: [],
              mode: "all"
            }
          };
          o.sets.push(J), k.presetId = J.id, U = !1;
          break;
        }
        case "delete-set": {
          const B = o.sets.find((J) => J.id === k.presetId);
          if (!B) throw Error("Выберите сохранённый набор моделей.");
          if (!confirm(`Удалить набор «${B.name}»?`)) return;
          o.sets = o.sets.filter((J) => J.id !== B.id);
          for (const J of o.checks)
            for (const _ of [J.a, J.b])
              _.presetId === B.id && (_.presetId = void 0);
          U = !1;
          break;
        }
        case "show":
          e.select(
            (r?.elements || []).filter((B) => (h.includeHidden || !B.hidden) && Gt(B, k)).map((B) => B.id)
          );
          return;
        case "only": {
          const B = e.selected();
          if (!B.length) throw Error("Выделите элементы в 3D-сцене.");
          k.include = B, k.exclude = [], k.manualOnly = !0;
          break;
        }
        case "include": {
          const B = e.selected();
          if (!B.length) throw Error("Выделите элементы в 3D-сцене.");
          k.include = [.../* @__PURE__ */ new Set([...k.include, ...B])], k.exclude = k.exclude.filter((J) => !B.includes(J));
          break;
        }
        case "exclude": {
          const B = e.selected();
          if (!B.length) throw Error("Выделите элементы в 3D-сцене.");
          k.exclude = [.../* @__PURE__ */ new Set([...k.exclude, ...B])], k.include = k.include.filter((J) => !B.includes(J));
          break;
        }
        case "reset":
          k.manualOnly = !1, k.include = [], k.exclude = [];
      }
      U ? R() : A(), X(), m("content").scrollTop = P;
      return;
    }
    if (b?.id === "prev-page" && (u--, Y()), b?.id === "next-page" && (u++, Y()), b?.id === "show-markers" && (E = !E, b.textContent = E ? "● Знаки включены" : "○ Знаки выключены", b.setAttribute("aria-checked", String(E)), ft()), b?.id === "bulk") {
      const N = m("bulk-state").value;
      for (const k of h.results) D.has(k.id) && (k.state = N);
      A(), Y(), Q(), W(), ft();
    }
    if (b?.id === "capture-image") {
      const N = h.results.find((k) => k.id === c);
      if (N) {
        x = !1, tt(!0), j("Создание снимка пары");
        try {
          N.image = await e.snapshot(
            N,
            Number(m("distance").value),
            () => x,
            !0
          ), N.imageScope = "pair-ab", N.imageDistance = void 0, A(), Q(), L("Снимок сохранён в результат.");
        } finally {
          y(), tt(!1);
        }
      }
      return;
    }
    if (b?.id === "open-image") {
      const N = h.results.find((k) => k.id === c);
      if (N?.image) {
        const k = document.createElement("dialog");
        k.className = "image-dialog", k.innerHTML = '<button>Закрыть</button><img alt="Снимок коллизии">', k.querySelector("img").src = N.image, k.querySelector("button").onclick = () => {
          k.close(), k.remove();
        }, n.append(k), k.showModal();
      }
      return;
    }
    if (b?.id === "focus" && vt(c, !0), b?.id === "previous" || b?.id === "next") {
      const N = H(), k = N.findIndex((P) => P.id === c) + (b.id === "next" ? 1 : -1);
      N[k] && vt(N[k].id, !0);
    }
    if (b?.id === "export-html" || b?.id === "export-viewer") {
      let N = 0;
      const k = m("selected-only").checked ? h.results.filter((U) => D.has(U.id)) : h.results;
      if (!k.length) throw Error("Нет результатов для отчёта.");
      if (m("report-images").checked) {
        const U = e.view, B = U?.storeView(), J = Number(m("distance").value);
        x = !1, tt(!0), j("Подготовка снимков отчёта", 0, k.length);
        try {
          await e.captureWorkspace(async () => {
            let _ = 0;
            for (const ot of k) {
              if (x)
                throw Error(
                  "Подготовка отчёта отменена. Уже полученные снимки сохранены."
                );
              j(
                "Подготовка снимков отчёта",
                _,
                k.length
              ), L("Подготовка снимков: " + (_ + 1) + " / " + k.length);
              const Wt = ot.imageScope !== "pair-ab" || ot.imageDistance !== void 0 && ot.imageDistance !== J;
              if (!ot.image || Wt) {
                if (ot.state === "resolved" && !e.canLocate(ot)) {
                  _++;
                  continue;
                }
                try {
                  ot.image = await e.snapshot(ot, J, () => x), ot.imageScope = "pair-ab", ot.imageDistance = J, A();
                } catch (Tt) {
                  if (x || !e.isCurrent()) throw Tt;
                  N++;
                }
              }
              _++, j("Подготовка снимков отчёта", _, k.length);
            }
          });
        } finally {
          if (U && e.isCurrent()) {
            const _ = h.results.find((ot) => ot.id === c);
            if (_)
              try {
                e.focus(_, J, !1);
              } catch {
              }
            B && U.restoreView(B);
          }
          y(), tt(!1);
        }
      }
      const P = m("report-images").checked ? k.map(
        (U) => U.imageScope === "pair-ab" ? U : { ...U, image: void 0 }
      ) : k.map((U) => ({ ...U, image: void 0 }));
      ve(
        h.name + (b.id === "export-html" ? ".html" : ".collision360.json"),
        b.id === "export-html" ? cn(h, P) : dn(h, P)
      ), L(
        "Отчёт подготовлен. Результатов: " + k.length + "; со снимками: " + P.filter((U) => U.image).length + "." + (N ? ` Не удалось создать снимков: ${N}; эти строки включены без изображения.` : ""),
        N > 0
      );
    }
    const I = p.closest("[data-result]");
    I && !p.closest("input") && !window.getSelection()?.toString() && vt(I.dataset.result);
  }), m("content").ondblclick = (l) => {
    const p = l.target, b = p.closest("[data-result]");
    b && !p.closest("input") && w(() => vt(b.dataset.result, !0));
  };
  const Ft = setInterval(() => {
    g || (G() ? (m("model-count").textContent = "Модели не прочитаны", L(
      o.checks.length ? "Открыт другой проект. Показаны его проверки; обновите модели." : "Открыт другой проект. Для него ещё нет проверок."
    ), g || X()) : r && !e.isCurrent() && (r = void 0, e.clear(), m("model-count").textContent = "3D-окно изменилось", L("Активное 3D-окно изменилось. Обновите модели."), g || X()));
  }, 1500);
  return X(), () => {
    s(), clearInterval(Ft), clearTimeout(C), S++, x = !0, $?.(), M?.terminate(), e.clear();
  };
}
var le = /* @__PURE__ */ ((t) => (t.object = "object", t.drawing = "drawing", t.table = "table", t.record = "record", t.textStyle = "textstyle", t.textStyleTable = "textstyles", t.linetype = "linetype", t.linetypeTable = "linetypes", t.layer = "layer", t.layerTable = "layers", t.block = "block", t.blockTable = "blocks", t.layout = "layout", t.layoutTable = "layouts", t.type = "type", t.typeTable = "types", t.material = "material", t.materialTable = "materials", t.geometry = "geometry", t.geometryTable = "geometries", t.group = "group", t.groupTable = "groups", t.attachment = "attachment", t.attachmentTable = "attachments", t.entities = "entities", t.entity = "entity", t.line = "l", t.solid = "s", t.insert = "i", t.polyline = "p", t.circle = "c", t.arc = "a", t.polyline3d = "p3", t.proxy = "x", t.text = "t", t.mtext = "mt", t.wipeout = "w", t.model3d = "g", t.alignment = "al", t))(le || {});
const ce = () => new Promise((t) => requestAnimationFrame(() => t()));
function Le(t) {
  const { width: e, height: n } = t.camera, s = Array.from(document.querySelectorAll("canvas")).filter(
    (i) => {
      const o = i.getBoundingClientRect();
      return o.width > 100 && o.height > 100 && i.width > 0 && i.height > 0 && getComputedStyle(i).visibility !== "hidden" && (Math.abs(o.width - e) < 4 && Math.abs(o.height - n) < 4 || Math.abs(i.width - e) < 4 && Math.abs(i.height - n) < 4);
    }
  );
  if (!s.length)
    throw Error(
      "Снимок 3D-окна недоступен: откройте одно видимое окно модели."
    );
  const a = s[0].getBoundingClientRect();
  if (s.some((i) => {
    const o = i.getBoundingClientRect();
    return Math.abs(o.x - a.x) > 4 || Math.abs(o.y - a.y) > 4;
  }))
    throw Error(
      "Открыто несколько подходящих 3D-окон. Оставьте одно окно для снимка."
    );
  return { candidates: s, rect: a };
}
async function mn(t) {
  await ce(), t.repaint();
  const { candidates: e, rect: n } = Le(t), s = document.createElement("canvas");
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
  for (const i of e)
    a.drawImage(i, 0, 0, s.width, s.height);
  return document.body.append(s), async () => {
    t.repaint(), await ce(), s.remove();
  };
}
async function hn(t, e) {
  if (await ce(), e()) throw Error("Подготовка снимков отменена.");
  const { candidates: n } = Le(t), s = document.createElement("canvas"), a = Math.min(1, 1280 / n[0].width);
  s.width = Math.round(n[0].width * a), s.height = Math.round(n[0].height * a);
  const i = s.getContext("2d");
  i.fillStyle = "#20242b", i.fillRect(0, 0, s.width, s.height), t.repaint();
  for (const o of n)
    i.drawImage(o, 0, 0, s.width, s.height);
  try {
    return s.toDataURL("image/jpeg", 0.82);
  } catch {
    throw Error("Браузер запретил чтение изображения 3D-окна.");
  }
}
const ie = "nashepo.checks.points", Ie = "nashepo.checks.highlight";
function Se(t) {
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
    t.forEach((i, o) => Vt(i, `${e}[${o}]`, n, s + 1));
    return;
  }
  const a = t;
  if ("$value" in a) {
    Vt(a.$value, e, n, s + 1);
    return;
  }
  for (const [i, o] of Object.entries(a))
    i.startsWith("$") || Vt(o, e ? `${e}.${i}` : i, n, s + 1);
}
function gn(t) {
  const e = t.vertices.length / 3, n = (o) => Number.isFinite(t.vertices[o * 3]) && Number.isFinite(t.vertices[o * 3 + 1]) && Number.isFinite(t.vertices[o * 3 + 2]), s = (o) => {
    const r = t.indices[o], d = t.indices[o + 1], f = t.indices[o + 2];
    return r < e && d < e && f < e && r !== d && d !== f && f !== r && n(r) && n(d) && n(f);
  };
  let a = 0;
  for (let o = 0; o < t.indices.length; o += 3) s(o) && (a += 3);
  if (a === t.indices.length) return t.indices;
  const i = new Uint32Array(a);
  for (let o = 0, r = 0; o < t.indices.length; o += 3)
    s(o) && (i[r++] = t.indices[o], i[r++] = t.indices[o + 1], i[r++] = t.indices[o + 2]);
  return i;
}
const oe = (t) => /\.wdx(?:[?#].*)?$/i.test(t);
class bn {
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
        const { panel: s, size: a, maximized: i } = this.captureLayout;
        this.captureLayout = void 0, s.size = a, s.maximized = i, await new Promise(
          (o) => requestAnimationFrame(() => requestAnimationFrame(() => o()))
        );
      }
    }
  }
  async scan(e, n, s) {
    const a = this.app, i = this.view, o = a?.model;
    if (!i || !o?.layouts || !o.attachments)
      throw Error(
        "Откройте проект Топоматик 360 с IFC или SMDX и сделайте его 3D-окно активным."
      );
    const r = [], d = /* @__PURE__ */ new Set(), f = [], c = [], u = [], g = /* @__PURE__ */ new Map(), x = /* @__PURE__ */ new Set();
    let M = 2166136261;
    const E = Se(
      () => n() || a !== this.app || i !== this.view
    );
    let F = -1 / 0;
    const D = (C) => {
      for (let S = 0; S < C.length; S++)
        M = Math.imul(M ^ C.charCodeAt(S), 16777619);
    }, $ = async (C, S, q) => {
      if (x.has(C)) return;
      x.add(C);
      const m = C.layers.layer0?.modelName || S, Z = S, L = oe(m) || oe(Z), j = (R, v) => {
        d.has(R) || (d.add(R), r.push({ id: R, name: v }));
      };
      L || j(Z, m);
      const y = !L && (!s || s.has(Z)), w = [];
      (y || L) && C.layouts.model?.walk((R) => (R.type === le.model3d ? w.push(R) : R.type === le.insert && f.push(`${m}: вставка блока не включена в расчёт.`), !1));
      const z = /* @__PURE__ */ new Map();
      for (const R of w) {
        let v = R.layer, O = "";
        for (; v; ) {
          if (v.modelName && !oe(v.modelName)) {
            O = v.modelName;
            break;
          }
          v = v.layer;
        }
        const H = L ? O || "Модель проекта" : m, W = L ? O || `${S}/#model` : Z;
        if (L && j(W, H), s && !s.has(W)) continue;
        const st = JSON.stringify([
          R.layer?.UUID || "",
          R.$id || R.$path
        ]);
        z.set(JSON.stringify([W, st]), {
          key: st,
          objects: [R],
          modelId: W,
          modelName: H
        });
      }
      let A = 0;
      for (const R of z.values()) {
        const { key: v, objects: O, modelId: H, modelName: W } = R;
        if (n()) throw Error("Чтение моделей отменено.");
        if (a !== this.app || i !== this.view)
          throw Error(
            "Активный проект изменился. Запустите чтение моделей заново."
          );
        const st = O[0].layer, X = {};
        try {
          if (st) {
            const ft = [];
            let vt = st;
            for (; vt && ft.length < 64; )
              ft.unshift(vt), vt = vt.layer;
            for (const ct of ft)
              Vt(ct.typedProperties(), "", X), ct.typed?.name && (X.Тип = ct.typed.name);
          }
        } catch {
          f.push(`${W} / ${v}: часть свойств недоступна.`);
        }
        const Pt = X["ifc.id"] || Object.entries(X).find(
          ([ft]) => /(^|\.)(globalid|ifcguid|guid)$/i.test(ft)
        )?.[1] || "", Y = st?.name || O[0].$id || "Элемент", Q = JSON.stringify([H, v]);
        Object.assign(X, {
          Модель: W,
          Имя: Y,
          GUID: Pt,
          Объект: st?.UUID || v
        });
        const rt = {
          min: [1 / 0, 1 / 0, 1 / 0],
          max: [-1 / 0, -1 / 0, -1 / 0]
        };
        let lt = !0, yt = !1, at = 0;
        for (const ft of O) {
          lt &&= ft.isClosed;
          for (const vt of Object.values(ft.meshes)) {
            const ct = vt.geometry;
            if (!ct || ct.indices.length % 3) {
              yt = !0;
              continue;
            }
            lt &&= vt.isClosed;
            for (let tt = 0; tt < ct.vertices.length; tt += 3) {
              const it = [
                ct.vertices[tt],
                ct.vertices[tt + 1],
                ct.vertices[tt + 2]
              ];
              if (Math3d.mat4.mulv3(it, ft.matrix, it), !it.every(Number.isFinite)) {
                yt = !0;
                continue;
              }
              for (let nt = 0; nt < 3; nt++)
                rt.min[nt] = Math.min(rt.min[nt], it[nt]), rt.max[nt] = Math.max(rt.max[nt], it[nt]);
              if (D(it.join(",")), tt % 6e4 === 0 && (performance.now() - F > 200 && (F = performance.now(), e(
                "Индексирование: " + W + " · " + u.length + " элементов"
              )), await E(), n()))
                throw Error("Чтение моделей отменено.");
            }
            const bt = ct.vertices.length / 3, ut = (tt) => Number.isFinite(ct.vertices[tt * 3]) && Number.isFinite(ct.vertices[tt * 3 + 1]) && Number.isFinite(ct.vertices[tt * 3 + 2]);
            for (let tt = 0; tt < ct.indices.length; tt += 3) {
              const it = ct.indices[tt], nt = ct.indices[tt + 1], $t = ct.indices[tt + 2];
              if (M = Math.imul(M ^ it, 16777619), M = Math.imul(M ^ nt, 16777619), M = Math.imul(M ^ $t, 16777619), it < bt && nt < bt && $t < bt && it !== nt && nt !== $t && $t !== it && ut(it) && ut(nt) && ut($t) ? at++ : yt = !0, tt % 15e4 === 0 && (await E(), n()))
                throw Error("Чтение моделей отменено.");
            }
          }
        }
        if (yt || !at) {
          if (at || A++, !at) continue;
          lt = !1;
        }
        const Dt = {
          id: Q,
          name: Y,
          model: W,
          modelId: H,
          guid: Pt,
          properties: X,
          // An IFC layer can be disabled for editing while it is still drawn
          // in the 3D view. Only the visibility flag and a hidden attachment
          // should exclude it from a normal clash check.
          hidden: q || !!st?.resolveHidden(),
          triangles: new Float64Array(0),
          triangleCount: at,
          closed: lt,
          bounds: rt
        };
        D(JSON.stringify([Q, X, Dt.hidden])), u.push(Dt), g.set(Q, O);
      }
      A && f.push(
        `${m}: пропущено элементов без треугольной геометрии — ${A}.`
      );
      const G = [];
      C.attachments.forEach((R) => {
        G.push(R);
      });
      for (const R of G) {
        const v = R.name || R.uri || R.$id, O = v || "Подключённая модель", H = `${S}/${v || "attachment"}`;
        R.model || j(H, O), R.model ? await $(
          R.model,
          H,
          q || R.hidden
        ) : (!s || s.has(H)) && c.push(
          `${O}: модель не загружена. Откройте её перед расчётом.`
        );
      }
    };
    if (await $(o, o.layers.layer0?.modelName || "Проект", !1), !u.length && (!s || s.size > 0)) {
      const C = s ? [...s].filter((S) => !d.has(S)) : [];
      throw Error(
        C.length ? `Сохранённая выборка ссылается на модели, которых нет в текущем составе: ${C.join(", ")}. Обновите список моделей.` : r.length ? "В выбранных моделях не найдены 3D-элементы с доступной геометрией. Проверьте, что модели загружены, и выберите нужные файлы." : "В открытом проекте не обнаружены IFC/SMDX-модели. Проверьте состав подключений проекта."
      );
    }
    return this.clear(), this.refs = g, this.metadata = new Map(u.map((C) => [C.id, C])), this.scannedApp = a, this.scannedView = i, {
      elements: u,
      fingerprint: `${u.length}:${M >>> 0}`,
      warnings: [...new Set(f)],
      blockers: [...new Set(c)],
      models: r,
      indexedModelIds: r.filter((C) => !s || s.has(C.id)).map((C) => C.id)
    };
  }
  async geometry(e, n) {
    const s = Se(() => n() || !this.isCurrent());
    if (!this.isCurrent()) throw Error("Активная модель изменилась.");
    const a = this.metadata.get(e), i = this.refs.get(e);
    if (!a || !i) throw Error("Элемент отсутствует.");
    const o = i.flatMap(
      (x) => Object.values(x.meshes).flatMap((M) => {
        const E = M.geometry;
        if (!E || E.indices.length % 3) return [];
        const F = gn(E);
        return F.length ? [{ object: x, g: E, indices: F }] : [];
      })
    );
    let r = 0, d = 0;
    for (const { g: x, indices: M } of o) {
      if (!x) throw Error("Геометрия недоступна.");
      r += x.vertices.length, d += M.length;
    }
    const f = new Float64Array(r), c = new Uint32Array(d);
    let u = 0, g = 0;
    for (const { object: x, g: M, indices: E } of o) {
      if (!M) throw Error("Геометрия недоступна.");
      for (let F = 0; F < M.vertices.length; F += 3) {
        const D = [M.vertices[F], M.vertices[F + 1], M.vertices[F + 2]];
        if (Math3d.mat4.mulv3(D, x.matrix, D), f.set(D, u + F), F % 6e4 === 0 && (await s(), n() || !this.isCurrent()))
          throw Error("Чтение геометрии отменено.");
      }
      for (let F = 0; F < E.length; F++)
        if (c[g + F] = u / 3 + E[F], F % 15e4 === 0 && (await s(), n()))
          throw Error("Чтение геометрии отменено.");
      u += M.vertices.length, g += E.length;
    }
    return { ...a, vertices: f, indices: c };
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
      const e = this.pointView.annotations.get(ie);
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
    const a = e.point, i = this.view;
    i.camera?.id !== "3d" && i.setCameraType("3d"), i.pauseAnimation?.(), this.highlight(e), this.select([e.a.id, e.b.id]);
    const o = [-0.65, 0.65, -0.394], r = Math.hypot(...o);
    o.forEach((d, f) => o[f] = d / r), i.lookAt(
      a.map((d, f) => d - o[f] * n),
      o,
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
      ({ id: o, color: r }, d) => [...new Set(this.refs.get(o) || [])].flatMap(
        (f) => Object.values(f.meshes).flatMap((c) => {
          const u = c.geometry;
          if (!u) return [];
          const g = {
            // SDK fields may be prototype getters rather than own properties.
            uuid: `${Ie}.${d}.${u.uuid}`,
            vertices: u.vertices,
            indices: u.indices,
            normals: u.normals,
            bounds: u.bounds,
            colors: new Uint32Array(u.vertices.length / 3).fill(r)
          };
          return [{ obj: f, geometry: g, color: r }];
        })
      )
    ), this.overlay) {
      this.overlay.layer.visible = !0, n.invalidate(!0);
      return;
    }
    let a;
    a = {
      id: Ie,
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
          a.visible = !1, this.overlayError = new Error(
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
    }, n.layer.addLayer(a), this.overlay = { view: n, layer: a }, n.invalidate();
  }
  async snapshot(e, n, s, a = !1, i = !0) {
    const o = () => this.snapshotInWorkspace(e, n, s, a);
    return i ? this.captureWorkspace(o) : o();
  }
  async snapshotInWorkspace(e, n, s, a = !1) {
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
      a ? this.highlight(e) : this.focus(e, n, !1), i.pauseAnimation(), c = await mn(i), i.layer.clearSelected(), o.visible = !1, i.annotations.visible = !1, i.invalidate();
      const u = await hn(
        i,
        () => s() || !this.isCurrent()
      );
      if (this.overlayError) throw this.overlayError;
      return u;
    } finally {
      o.visible = r, i.annotations.visible = d, i.layer.clearSelected(), i.layer.selectObjects((u) => f.has(u), !0), i.invalidate(), await c?.();
    }
  }
  markers(e, n, s, a) {
    if (!this.isCurrent()) return;
    const i = this.view;
    this.pointView && this.pointView !== i && this.clear();
    const o = i.annotations.get(ie);
    if (o && i.annotations.release(o), this.pointView = i, !s) {
      i.invalidate();
      return;
    }
    const r = i.annotations.create(ie, 1e4), d = e.filter((f) => f.id !== n).concat(e.filter((f) => f.id === n));
    for (const f of d.slice(-3e3)) {
      if (f.state === "resolved") continue;
      const [c, u, g] = f.point, x = f.id === n, M = f.state === "excluded" ? "#78818c" : f.state === "approved" || f.state === "reviewed" ? "#28b94b" : "#e1372d", E = x ? "#f2c94c" : M, F = () => a(f.id), D = [
        { type: "line", a: [c, u, g], b: [c, u, g + 1], color: E, width: 5 },
        {
          type: "polyline",
          points: [
            [c - 0.65, u, g + 1],
            [c + 0.65, u, g + 1],
            [c, u, g + 2.2],
            [c - 0.65, u, g + 1]
          ],
          color: E,
          fillColor: M,
          width: x ? 5 : 2
        },
        {
          type: "line",
          a: [c, u - 0.01, g + 1.85],
          b: [c, u - 0.01, g + 1.4],
          color: "#ffffff",
          width: 4
        },
        {
          type: "line",
          a: [c, u - 0.01, g + 1.22],
          b: [c, u - 0.01, g + 1.27],
          color: "#ffffff",
          width: 4
        }
      ];
      r.add({
        id: f.id,
        type: "shaped",
        shapes: D,
        activeShapes: D,
        activateCommand: F,
        dblCommand: F
      }), x && r.add({
        id: f.id + ":label",
        type: "simple",
        position: [c, u, g + 2.35],
        label: `${f.a.name} × ${f.b.name}`,
        labelBackground: "#f2c94c",
        labelColor: "#171717",
        activateCommand: F
      });
    }
    i.invalidate();
  }
}
let je, ae, Ee;
const xn = {
  open(t) {
    t.manager.revealView("nashepo.collisionfinder360/checks_panel");
  },
  mount(t) {
    const e = t.el;
    if (!e) return;
    if (ae && Ee === t.manager) {
      e.replaceChildren(ae);
      return;
    }
    je?.();
    const n = document.createElement("div");
    n.style.height = "100%", e.replaceChildren(n), ae = n, Ee = t.manager, je = un(n, new bn(t));
  }
};
export {
  xn as default
};
