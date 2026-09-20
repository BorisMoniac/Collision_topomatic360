const Ze = `<h2>Работа с проверками</h2>
<details open><summary>1. Первая проверка</summary><ol><li>Откройте проект и подключите IFC/SMDX штатными средствами Топоматик 360.</li><li>Откройте нижнюю вкладку «Проверки» и нажмите «Модели».</li><li>Нажмите «＋ Новая проверка» и задайте ей понятное имя.</li><li>Во вкладке «Выбор» оставьте галочки только у нужных файлов в А и Б. «Все модели» включено по умолчанию.</li><li>Выберите «По пересечению» или «Дублирование» и нажмите «Запустить».</li><li>Во вкладке «Результаты» дважды нажмите строку: камера направится к конфликту, элемент А будет выделен красным, элемент Б — синим, и оба элемента станут выделенными в 3D-окне.</li></ol><p>Первое обновление без созданной проверки получает только список файлов. При запуске индексируются модели, отмеченные хотя бы в одной стороне. Файл проекта WDX служит контейнером и в выбор моделей не попадает.</p></details>
<details><summary>2. Выбор моделей и сохранённые наборы</summary><p>Выбор А и выбор Б задают две стороны сравнения. Снимите «Все модели» и отметьте конкретные IFC/SMDX. Для поиска дубликатов внутри одного файла отметьте его с обеих сторон.</p><p>Часто используемый состав можно сохранить как набор моделей, а затем применить в другой проверке. Наборы входят в файл проверок. Состав выборки задаётся галочками моделей и ручным выделением объектов.</p><p>IFC GUID читается из свойства <code>ifc.id</code>; также поддерживаются GlobalId, IfcGuid и GUID.</p></details>
<details><summary>3. Работа с выделением в 3D</summary><p>Сначала выделите элементы штатными средствами в 3D-окне, затем используйте кнопку в нужной стороне:</p><ul><li><b>Показать выбранные элементы</b> — выделяет весь текущий состав.</li><li><b>Только выделенные в 3D</b> — оставляет только выделенные объекты.</li><li><b>＋ Добавить из 3D</b> — добавляет выделенные объекты к моделям.</li><li><b>− Исключить из 3D</b> — исключает выделенные объекты.</li><li><b>Сбросить ручной выбор</b> — снова использует отмеченные модели.</li></ul><p>Ручные идентификаторы могут измениться после замены IFC/SMDX, поэтому такую выборку следует проверить заново.</p></details>
<details><summary>4. Пересечения, глубина, касания и дубликаты</summary><p><b>Пересечение</b> определяется по треугольным поверхностям элементов и вложенности тел. Раздельные сетки сначала проверяются вместе: совпадающие рёбра и разное разбиение швов больше не делают замкнутый элемент «неизмеримым». Признак замкнутости из исходной модели проверяется по граням: сам по себе он не подтверждает внутренний объём. Габаритные коробки отбирают близкие пары; общий габарит также ограничивает область замера глубины. Одна пара элементов формирует один результат.</p><p><b>Толщина перекрытия</b> — локальная оценка пересечения. Для контакта выбираются направления измерения, в том числе по его форме и нормалям граней. По ним измеряется общая часть проекций геометрии в области контакта и выбирается наименьшая пригодная ширина. Если обнаружены отдельные участки перекрытия, для пары сохраняется наибольшая из их глубин.</p><p><b>Заход вдоль оси</b> дополнительно измеряется для распознанной прямой трубы или вытянутого профиля, пересекающего более крупную конструкцию. Ось определяется по геометрии, её пересечения — по граням конструкции. Для круглого кабеля или трубы с поворотами плагин дополнительно распознаёт последовательные поперечные сечения и измеряет путь по их центрам. Соседние участки внутри одной оболочки объединяются в непрерывный заход; выход наружу и вход обратно дают отдельные участки, из которых берётся самый длинный. Такой замер помечается знаком ≈. При частичном заходе измеряется участок от внешней границы до конца профиля; при сквозном — от входа до выхода. Внутренняя пустота колодца входит в этот замер. Раздельные оболочки конструкции измеряются отдельно: расстояние между несвязанными частями не прибавляется. Сам по себе проход оси через габарит не создаёт коллизию: сначала должно быть обнаружено пересечение элементов.</p><p><b>Глубина для отбора</b> — большее из толщины перекрытия и продольного захода. Поэтому труба диаметром 50 мм, заходящая в конструкцию на 1000 мм, проходит порог 80 мм, а стык с заходом 5 мм — нет. Оба замера видны в карточке коллизии и HTML-отчёте, когда продольный заход удалось определить. Для отдельных отводов, фитингов и сопоставимых труб сохраняется локальный расчёт. Это не расстояние перемещения, устраняющего коллизию. Объём пересечения имеет кубические единицы и не заменяет глубину в миллиметрах.</p><p>Если оболочка содержит разрывы, плагин дополнительно определяет внутреннюю область по совокупности окружающих граней — методом обобщённого числа обхода. Когда такая область подтверждается, рассчитывается численная глубина со знаком ≈. Исходная модель при этом не изменяется. Это позволяет проверять трубы, отводы и другие объёмные элементы с дефектами сетки. Одиночная плоская грань не превращается в объёмное тело.</p><p><b>Ограничения метода.</b> Плагин не строит точное тело пересечения. Разделение контактов, выбор направлений и проверка заполнения являются оценкой. Для сложных невыпуклых и составных объектов, криволинейных поверхностей результат может зависеть от сетки и расположения геометрии. Продольный замер применяется к распознанным прямым профилям с длиной не менее четырёх поперечных размеров, когда конструкция шире профиля минимум в 2,5 раза по двум поперечным направлениям. Для изогнутого круглого кабеля или трубы замер по траектории доступен, если сетка содержит распознаваемые поперечные сечения и связи между ними. Если ось восстановить не удалось, остаётся локальный замер. У сложной связной невыпуклой оболочки продольный замер может включать промежутки между её поверхностями. Заданная точность не гарантирует такую же погрешность итоговой глубины. Результаты около принятого допуска следует проверять в 3D.</p><p><b>Столбец глубины:</b></p><ul><li><b>Число</b> — полученная оценка в миллиметрах. Малые положительные значения показываются с дополнительными знаками, чтобы не превратиться в ноль при округлении.</li><li><b>Касание</b> — найден контакт без разрешённого объёмного перекрытия. Такие пары включаются настройкой «Учитывать касания» и могут отсекаться порогом глубины как нулевые.</li><li><b>Не определена</b> — у геометрии не удалось определить внутреннюю область, например у одиночного листа или отдельных граней. Пересечение сохраняется; размер грани не выдаётся за глубину.</li><li><b>Требует уточнения</b> — пересечение найдено, однако его глубина не разрешена текущим расчётом. Причиной может быть неоднозначная геометрия контакта. Само по себе малое вхождение относительно настройки точности больше не является причиной отказа от замера.</li><li><b>≈</b> — приблизительная оценка: внутренняя область восстановлена для оболочки с разрывами, состыкованы немного расходящиеся швы либо при измерении сокращалась выборка или разделение контактов достигло предела. Для числа не гарантируются ни величина, ни направление ошибки.</li></ul><p>«Не определена» и «Требует уточнения» остаются в результатах независимо от минимальной глубины. Числовые оценки, в том числе со знаком ≈, сравниваются с порогом. Знак ≈ сообщает о приближённом расчёте и не отменяет фильтр. Найденное малое пересечение не должно исчезать только из-за отключённого учёта касаний: для определения пересечения и замера используется отдельный численный запас. Настройка точности не округляет малые вхождения до нуля.</p><p><b>Точность расчёта</b> задаётся в миллиметрах и влияет на отбор близких пар, разделение контактов и запас при фильтрации. При восстановлении швов допустимое расхождение ограничено этой величиной и дополнительно 0,01 мм. Приближённое восстановление внутренней области по граням — отдельный метод, его погрешность этой настройкой не гарантируется. <b>Минимальная глубина</b> — порог отбора результатов. Все числовые оценки сравниваются с порогом с запасом на точность: при минимуме 20 мм и точности 0,1 мм результат 19,95 мм остаётся. Этот порядок одинаков в расчёте, таблице и HTML-отчёте. После изменения точности или порога повторно запустите проверку.</p><p>Труба и отвод могут пересекаться в штатном соединении из-за формы исходной сетки. Такие соединения рассматриваются отдельно и при необходимости исключаются правилами.</p><p><b>Дублирование</b> ищет совпадающую треугольную геометрию в мировых координатах с заданной точностью. Геометрически одинаковые тела с разным разбиением поверхности на треугольники могут не считаться дубликатами.</p></details>
<details><summary>Длина бокового контакта</summary><p>Кабель может пересекать стенку боковой поверхностью, хотя его ось проходит снаружи. Для распознанных профилей и трасс отдельно измеряется <b>длина контакта</b>: пересечения фактических треугольных поверхностей проецируются вдоль элемента, и выбирается самый длинный непрерывный участок. Раздельные участки не складываются. Это приблизительный размер со знаком ≈; он доступен в таблице, карточке, HTML-отчёте и сессии.</p><p>Длина не заменяет глубину и не участвует в её пороге. Например, кабель может касаться стенки вдоль 1000 мм с нулевой глубиной или входить в неё на 5 мм вдоль тех же 1000 мм. Чистые касания попадают в результат только при включённом «Учитывать касания». Если профиль не распознан или замер неприменим, в столбце стоит прочерк. Для добавления длины в старые результаты запустите проверку повторно.</p></details>
<details><summary>5. Составные объекты и неполная геометрия</summary><p>Один IFC-объект может состоять из нескольких частей. В новых проверках правило «Не проверять геометрию одного составного объекта» включено по умолчанию. Его можно изменить во вкладке «Правила». Сохранённые проверки сохраняют выбранное ранее значение. Там же можно исключить пары одной модели или одинакового значения свойства.</p><p>Пустые и неполные геометрические части пропускаются, а пригодные части модели продолжают участвовать. Плагин показывает сводное замечание с количеством пропущенных элементов. Незагруженный подключённый файл блокирует расчёт только тогда, когда он входит в выборку.</p></details>
<details><summary>6. Результаты и состояния</summary><p>«Новый» найден впервые, «Активный» найден повторно, «Проверенный» рассмотрен, «Подтверждённый» подтверждён, «Исключённый» исключён из работы. «Исправленный» означает, что пара исчезла при повторном расчёте с теми же правилами; состояние можно изменить вручную.</p><p>В таблице доступны IFC GUID, расчётная глубина, назначение и комментарий. Фильтр «Глубина от» сравнивает порог с большим из доступных замеров: толщиной перекрытия и продольным заходом. Числа со знаком ≈ тоже участвуют в отборе; строки «не определена» и «требует уточнения» сохраняются для просмотра. Галочки меняют состояние сразу у нескольких строк. Значения можно выделять и копировать. При переходе стрелками активная строка автоматически прокручивается в видимую область. Состояние «Устарела» у проверки означает, что после последнего расчёта изменили её тип, выборки, параметры или правила.</p></details>
<details><summary>7. Отчёт и снимки</summary><p>После перехода к коллизии отсутствующий снимок создаётся автоматически, если пользователь задержался на результате. Кадр строится от той же камеры приближения, что и снимки отчёта: ракурс задаёт «Дистанция камеры» в настройках. Если дистанцию изменить, отчёт переснимет прежние кадры под новое значение. Быстрое переключение стрелками отменяет лишние снимки. Во время технической перерисовки поверх 3D-окна сохраняется предыдущий кадр, поэтому модель не должна мигать.</p><p>Кнопка «Снимок пары» сохраняет текущий ракурс только с двумя элементами коллизии: элемент А показан красным, элемент Б — синим. Такой кадр собран вручную, поэтому отчёт его не переснимает. На время подготовки отчёта нижняя панель автоматически уменьшается для широкого 3D-кадра и затем возвращается к прежнему размеру.</p><p>«Сформировать пакет отчёта» создаёт единый ZIP-архив. Его можно открыть напрямую в плагине Топоматик 360 «НашеПО · Коллизии». Для Robur распакуйте архив целиком и откройте находящийся в корне табличный HTML; рядом останется связанная папка JPEG/PNG. В архив также входят <code>manifest.json</code> и <code>review.json</code> со стабильными идентификаторами проверки и коллизий. Они предназначены для дальнейшего двустороннего обмена статусами и комментариями. В отчёт входят название проверки и конфликта, статус, отрицательное расстояние в метрах по правилам отчёта Navisworks, описание, дата, координаты, назначение, комментарий, расчётные размеры, данные обоих элементов, модели и IFC GUID.</p></details>
<details><summary>8. Проекты, сохранение и очистка</summary><p>В пределах открытой страницы каждый проект получает собственный список проверок. Сворачивание или повторное открытие нижней панели сохраняет проверки, результаты и комментарии в текущей вкладке. При переключении проекта данные предыдущего не подмешиваются. «Очистить проект» удаляет проверки, результаты и наборы только у текущего проекта.</p><p>«Сохранить проверки» записывает правила, наборы моделей, результаты, комментарии и снимки в JSON. «Открыть проверки» загружает этот файл. Геометрия в файл не входит: соответствующие модели надо открыть отдельно. После обновления или закрытия страницы для продолжения работы используйте сохранённый файл.</p></details>
<details><summary>9. Большие проекты</summary><p>Жёсткого предела в 6 млн треугольников нет. При запуске строится индекс только по отмеченным моделям. Точная геометрия передаётся в расчёт по мере появления близких пар в компактном индексированном виде.</p><p>Время и память всё равно зависят от состава выборок и числа потенциальных пар. Разделяйте проверки по моделям и системам. В сцене одновременно показывается до 3000 знаков; при 50 000 результатах расчёт останавливается без замены прежнего результата.</p></details>`;
function We(t) {
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
const Ce = "0.9.6", Ne = (t) => typeof t == "string" && /^data:image\/(jpeg|png);base64,[A-Za-z0-9+/=]+$/.test(t), Ht = {
  new: "Новый",
  active: "Активный",
  reviewed: "Проверенный",
  approved: "Подтверждённый",
  resolved: "Исправленный",
  excluded: "Исключённый"
}, Oe = (t, e, n) => t.kind === "duplicate" || t.depth === "unmeasurable" || t.depth === "tolerance" || (t.penetrationMm ?? 0) + n >= e, xe = () => ({
  models: [],
  modelsMode: "all",
  conditions: [],
  mode: "all",
  include: [],
  exclude: []
}), Qe = () => ({
  id: crypto.randomUUID(),
  name: "Новая проверка",
  type: "intersection",
  a: xe(),
  b: xe(),
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
}), ye = ({
  triangles: t,
  vertices: e,
  indices: n,
  triangleCount: s,
  closed: a,
  bounds: i,
  ...o
}) => o;
function Yt(t, e) {
  return e.exclude.includes(t.id) ? !1 : e.include.includes(t.id) ? !0 : !(e.manualOnly || e.modelsMode === "selected" && !e.models.includes(t.modelId) || e.modelsMode === void 0 && e.models.length && !e.models.includes(t.modelId));
}
function Pe(t, e, n) {
  if (!e.manualOnly && e.modelsMode === "selected" && !e.models.length && !e.include.length)
    return "Не отмечены модели. Выберите файлы или включите «Все модели».";
  let s = 0;
  for (const a of t)
    if (Yt(a, e) && (s++, n || !a.hidden))
      return;
  return s ? `Все выбранные элементы (${s}) скрыты. Покажите их в модели или включите «Включать скрытые элементы» на вкладке «Правила».` : e.manualOnly ? "Ручная выборка пуста. Выделите элементы в 3D заново или нажмите «Сбросить ручной выбор»." : e.exclude.length ? "Нет элементов после ручных исключений. Проверьте исключения или нажмите «Сбросить ручной выбор»." : "В выбранных моделях нет доступных элементов. Обновите модели и проверьте состав выборки.";
}
const Ve = (t) => JSON.stringify([
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
]), Je = (t, e) => JSON.stringify([t, e].sort());
function Xe(t, e, n) {
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
function qe(t) {
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
      if (i?.image !== void 0 && !Ne(i.image))
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
      if (!i || typeof i.id != "string" || !Object.hasOwn(Ht, i.state) || i.penetrationMm !== void 0 && (!Number.isFinite(i.penetrationMm) || i.penetrationMm < 0) || !Array.isArray(i.point) || i.point.length !== 3 || !i.point.every(Number.isFinite))
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
const T = (t, e) => [t[0] - e[0], t[1] - e[1], t[2] - e[2]], At = (t, e, n = 1) => [
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
}, Et = (t) => t.triangleCount ?? (t.indices ? t.indices.length / 3 : t.triangles.length / 9), jt = (t, e, n) => t.indices && t.vertices ? t.vertices[t.indices[e * 3 + Math.floor(n / 3)] * 3 + n % 3] : t.triangles[e * 9 + n], gt = (t, e) => [0, 3, 6].map((n) => [
  jt(t, e, n),
  jt(t, e, n + 1),
  jt(t, e, n + 2)
]);
function Bt(t) {
  const e = [1 / 0, 1 / 0, 1 / 0], n = [-1 / 0, -1 / 0, -1 / 0];
  for (let s = 0; s < t.length; s++) {
    const a = s % 3;
    e[a] = Math.min(e[a], t[s]), n[a] = Math.max(n[a], t[s]);
  }
  return { min: e, max: n };
}
const Vt = (t, e, n) => t.min.every((s, a) => s <= e.max[a] + n && t.max[a] >= e.min[a] - n);
function le(t, e) {
  const n = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const r of e)
    for (let d = 0; d < 9; d++) {
      const f = d % 3, c = jt(t, r, d);
      n.min[f] = Math.min(n.min[f], c), n.max[f] = Math.max(n.max[f], c);
    }
  if (e.length <= 12) return { ...n, ids: e };
  const s = n.max.map((r, d) => r - n.min[d]), a = s.indexOf(Math.max(...s)), i = (r) => jt(t, r, a) + jt(t, r, a + 3) + jt(t, r, a + 6);
  e.sort((r, d) => i(r) - i(d));
  const o = e.length >> 1;
  return {
    ...n,
    left: le(t, e.slice(0, o)),
    right: le(t, e.slice(o))
  };
}
function* Ut(t, e, n) {
  Vt(t, e, n) && (t.ids ? yield* t.ids : (yield* Ut(t.left, e, n), yield* Ut(t.right, e, n)));
}
function* Ct(t, e, n) {
  if (Vt(t, e, n)) {
    if (t.ids && e.ids) {
      for (const s of t.ids) for (const a of e.ids) yield [s, a];
      return;
    }
    if (t.ids) {
      yield* Ct(t, e.left, n), yield* Ct(t, e.right, n);
      return;
    }
    if (e.ids) {
      yield* Ct(t.left, e, n), yield* Ct(t.right, e, n);
      return;
    }
    yield* Ct(t.left, e.left, n), yield* Ct(t.left, e.right, n), yield* Ct(t.right, e.left, n), yield* Ct(t.right, e.right, n);
  }
}
function Kt(t, e) {
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
    left: Kt(t, e.slice(0, i)),
    right: Kt(t, e.slice(i))
  };
}
function Zt(t, e, n, s) {
  const a = T(e, t), i = T(n[1], n[0]), o = T(n[2], n[0]), r = xt(a, o), d = V(i, r);
  if (Math.abs(d) <= 1e-12 * K(a) * K(i) * K(o)) return;
  const f = 1 / d, c = T(t, n[0]), u = V(c, r) * f, h = xt(c, i), x = V(a, h) * f, b = V(o, h) * f, A = s / Math.max(K(i), K(o), s);
  if (u >= -A && x >= -A && u + x <= 1 + A && b >= -A && b <= 1 + A)
    return At(t, a, Math.max(0, Math.min(1, b)));
}
function Ke(t, e, n, s) {
  const a = n.map(Math.abs).indexOf(Math.max(...n.map(Math.abs))), i = [0, 1, 2].filter((d) => d !== a), o = (d, f, c) => (f[i[0]] - d[i[0]]) * (c[i[1]] - d[i[1]]) - (f[i[1]] - d[i[1]]) * (c[i[0]] - d[i[0]]), r = (d, f) => {
    const c = f.map((u, h) => o(u, f[(h + 1) % 3], d));
    return c.every((u) => u >= -s * K(n)) || c.every((u) => u <= s * K(n));
  };
  for (const d of t) if (r(d, e)) return d;
  for (const d of e) if (r(d, t)) return d;
  for (let d = 0; d < 3; d++)
    for (let f = 0; f < 3; f++) {
      const c = t[d], u = t[(d + 1) % 3], h = e[f], x = e[(f + 1) % 3], b = T(u, c), A = T(x, h), k = b[i[0]] * A[i[1]] - b[i[1]] * A[i[0]];
      if (Math.abs(k) < 1e-18) continue;
      const q = T(h, c), E = (q[i[0]] * A[i[1]] - q[i[1]] * A[i[0]]) / k, z = (q[i[0]] * b[i[1]] - q[i[1]] * b[i[0]]) / k;
      if (E >= 0 && E <= 1 && z >= 0 && z <= 1) return At(c, b, E);
    }
}
function Ue(t, e, n, s) {
  for (let a = 0; a < 3; a++) {
    const i = Zt(t[a], t[(a + 1) % 3], e, n);
    i && s.push(i);
    const o = Zt(e[a], e[(a + 1) % 3], t, n);
    o && s.push(o);
  }
}
function Le(t, e, n, s) {
  const a = xt(T(t[1], t[0]), T(t[2], t[0])), i = xt(T(e[1], e[0]), T(e[2], e[0])), o = K(a), r = K(i);
  if (o < 1e-20 || r < 1e-20) return;
  const d = e.map((c) => V(T(c, t[0]), a) / o), f = t.map((c) => V(T(c, e[0]), i) / r);
  if (!(d.every((c) => c > n) || d.every((c) => c < -n) || f.every((c) => c > n) || f.every((c) => c < -n))) {
    if (d.every((c) => Math.abs(c) <= n) && f.every((c) => Math.abs(c) <= n))
      return s ? Ke(t, e, a, n) : void 0;
    if (!(!s && (!(Math.min(...d) < -n && Math.max(...d) > n) || !(Math.min(...f) < -n && Math.max(...f) > n))))
      for (let c = 0; c < 3; c++) {
        const u = Zt(t[c], t[(c + 1) % 3], e, n);
        if (u) return u;
        const h = Zt(e[c], e[(c + 1) % 3], t, n);
        if (h) return h;
      }
  }
}
class _e {
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
function Wt(t, e) {
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
        for (const h of [n, s])
          for (let x = 0; x < 3; x++) {
            const b = h[x][o], A = h[x][r];
            h[x][o] = c * b - u * A, h[x][r] = u * b + c * A;
          }
        for (let h = 0; h < 3; h++) {
          const x = n[o][h], b = n[r][h];
          n[o][h] = c * x - u * b, n[r][h] = u * x + c * b;
        }
      }
  }
  return [0, 1, 2].sort((a, i) => n[i][i] - n[a][a]).map((a) => Ot([s[0][a], s[1][a], s[2][a]])).filter((a) => !!a);
}
function tn(t, e, n, s) {
  const a = e.min.map((c, u) => (c + e.max[u]) / 2), i = K(T(e.max, e.min)), o = Math.max(n * 10, i / 50), r = (c) => [0, 1, 2].map(
    (u) => c.reduce((h, x) => h + x[u], 0) / c.length
  );
  let d = [{ hits: t, limits: [] }], f = !1;
  for (let c = 0; c < 12; c++) {
    const u = [];
    let h = !1;
    for (const x of d) {
      if (x.hits.length < 2) {
        u.push(x);
        continue;
      }
      if (u.length + d.length >= 64) {
        f = !0, u.push(x);
        continue;
      }
      const b = r(x.hits), A = [
        b,
        a,
        ...[0, 0.25, 0.5, 0.75].map(
          (w) => x.hits[Math.floor(w * (x.hits.length - 1))]
        )
      ], k = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ], q = Wt(x.hits, b);
      q[0] && k.push(q[0]);
      const E = (w) => {
        let v = -1 / 0, N = 1 / 0;
        for (const C of x.hits) {
          const H = V(C, w);
          H > v && (v = H), H < N && (N = H);
        }
        return v - N;
      }, z = (w) => Math.max(
        0,
        ...q.filter((v) => Math.abs(V(v, w)) < 0.9).map((v) => E(v))
      ), S = (w) => {
        const v = x.hits.map((C) => V(C, w)).sort((C, H) => C - H), N = [];
        for (let C = 1; C < v.length; C++) {
          const H = v[C] - v[C - 1];
          H > o && N.push({ at: (v[C] + v[C - 1]) / 2, size: H });
        }
        return N.sort((C, H) => H.size - C.size);
      };
      let P, m = 0;
      for (const w of k) {
        const v = S(w);
        !v.length || v[0].size <= m || v[0].size <= z(w) || (m = v[0].size, s(w, v[0].at, A) && (P = { n: w, cuts: [v[0].at] }));
      }
      if (!P) {
        u.push(x);
        continue;
      }
      h = !0;
      const { n: B, cuts: D } = P, $ = Array.from({ length: D.length + 1 }, () => []);
      for (const w of x.hits) {
        const v = V(w, B);
        let N = 0;
        for (; N < D.length && v >= D[N]; ) N++;
        $[N].push(w);
      }
      $.forEach(
        (w, v) => u.push({
          hits: w,
          limits: [
            ...x.limits,
            {
              n: B,
              from: v ? D[v - 1] : -1 / 0,
              to: v < D.length ? D[v] : 1 / 0
            }
          ]
        })
      );
    }
    if (d = u, h && c === 11 && (f = !0), !h) break;
  }
  return { zones: d, crowded: f };
}
function we(t, e, n) {
  return n.every(({ n: s, from: a, to: i }) => {
    let o = 1 / 0, r = -1 / 0;
    for (let d = 0; d < 9; d += 3) {
      const f = jt(t, e, d) * s[0] + jt(t, e, d + 1) * s[1] + jt(t, e, d + 2) * s[2];
      f < o && (o = f), f > r && (r = f);
    }
    return r >= a && o <= i;
  });
}
function ve(t, e, n, s, a, i, o, r, d, f, c, u = !1) {
  let h = !1;
  const x = (D) => {
    let $ = -1 / 0, w = 1 / 0;
    const v = (N) => {
      N > $ && ($ = N), N < w && (w = N);
    };
    for (const N of d) v(V(N, D));
    for (const [N, C, H] of [
      [t, n, 1],
      [e, s, 0]
    ]) {
      const R = Math.max(1, Math.floor(C.length / 32));
      R > 1 && (h = !0);
      for (let M = 0; M < C.length; M += R)
        for (const U of gt(N, C[M])) c(H, U) && v(V(U, D));
    }
    return Number.isFinite($) && Number.isFinite(w) ? $ - w : 0;
  }, b = (D) => {
    let $ = 1 / 0, w = -1 / 0;
    for (let v = 0; v < 8; v++) {
      const N = (v & 1 ? o.max[0] : o.min[0]) * D[0] + (v & 2 ? o.max[1] : o.min[1]) * D[1] + (v & 4 ? o.max[2] : o.min[2]) * D[2];
      N < $ && ($ = N), N > w && (w = N);
    }
    return [$, w];
  }, A = (D, $, w, v, N) => {
    let C = 1 / 0, H = -1 / 0;
    for (const R of $) {
      let M = 1 / 0, U = -1 / 0;
      for (let Z = 0; Z < 9; Z += 3) {
        const Q = jt(D, R, Z) * w[0] + jt(D, R, Z + 1) * w[1] + jt(D, R, Z + 2) * w[2];
        Q < M && (M = Q), Q > U && (U = Q);
      }
      U < v || M > N || (M < v && (M = v), U > N && (U = N), M < C && (C = M), U > H && (H = U));
    }
    return C === 1 / 0 ? void 0 : [C, H];
  };
  if (o.min.some((D, $) => o.max[$] - D <= 0))
    return { width: 0, thin: !1, approximate: !1 };
  const k = Math.ceil((n.length + s.length) / 4096), q = [
    ...a,
    ...k > 1 ? i.filter((D, $) => $ < 3 || $ % k === 0) : i
  ];
  k > 1 && q.length < a.length + i.length && (h = !0);
  const E = (D, $, w, v, N) => {
    const C = (M) => At(r, w, M - V(r, w));
    if (!$) return c(D, C((v + N) / 2)) ? [v, N] : void 0;
    let [H, R] = $;
    return H > v && c(D, C((v + H) / 2)) && (H = v), R < N && c(D, C((R + N) / 2)) && (R = N), [H, R];
  }, z = (D, $) => D && $ ? Math.min(D[1], $[1]) - Math.max(D[0], $[0]) : 0;
  let S = 1 / 0, P = !1, m = !1, B = 0;
  for (let D = 0; D < q.length; D++) {
    const $ = q[D], [w, v] = b($), N = A(t, n, $, w, v), C = A(e, s, $, w, v);
    let H = z(N, C);
    if (H <= 0 && (B++ < 32 ? H = z(E(0, N, $, w, v), E(1, C, $, w, v)) : h = !0), u && d.length > 1) {
      let R = 1 / 0, M = -1 / 0;
      for (const U of d) {
        const Z = V(U, $);
        R = Math.min(R, Z), M = Math.max(M, Z);
      }
      H = Math.max(H, M - R);
    }
    if (H <= f && (D < a.length && B < 40 && (B++, H = x($)), H <= f)) {
      D < a.length && (m = !0);
      continue;
    }
    P = !0, H < S && (S = H);
  }
  return {
    width: P && Number.isFinite(S) ? S : 0,
    thin: m,
    approximate: h
  };
}
const $t = (t) => Math.max(1e-10, Math.max(1, ...t.bounds.min.map(Math.abs), ...t.bounds.max.map(Math.abs)) * Number.EPSILON * 64);
async function en(t, e, n) {
  const s = $t(t), a = Et(t), i = { closed: !1, approximate: !1 }, o = new Uint32Array(a), r = new Uint8Array(a), d = new Uint8Array(a), f = new Uint8Array(a);
  for (let w = 0; w < a; w++) o[w] = w;
  const c = (w) => {
    if (o[w] !== w) {
      const v = o[w];
      o[w] = c(v), d[w] ^= d[v];
    }
    return o[w];
  }, u = (w, v, N) => {
    let C = c(w), H = c(v);
    const R = d[w] ^ d[v] ^ N;
    return C === H ? R === 0 : (r[C] < r[H] && ([C, H] = [H, C]), o[H] = C, d[H] = R, r[C] === r[H] && r[C]++, !0);
  }, h = /* @__PURE__ */ new Map(), x = [], b = /* @__PURE__ */ new Map(), A = a * 3, k = A * A <= Number.MAX_SAFE_INTEGER, q = (w, v) => k ? w * A + v : `${w},${v}`, E = (w, v) => {
    const N = w.map((H, R) => Math.round((H - t.bounds.min[R]) / s)).join(",");
    let C = h.get(N);
    return C === void 0 && (C = h.size, h.set(N, C), x.push(v)), C;
  };
  for (let w = 0; w < a; w++) {
    w % 2048 === 0 && await e();
    const v = gt(t, w);
    if (K(xt(T(v[1], v[0]), T(v[2], v[0]))) <= s * s) continue;
    const N = v.map((C, H) => E(C, w * 3 + H));
    if (new Set(N).size === 3) {
      f[w] = 1;
      for (let C = 0; C < 3; C++) {
        const H = N[C], R = N[(C + 1) % 3], M = H < R, U = M ? q(H, R) : q(R, H), Z = b.get(U);
        if (Z === void 0) b.set(U, (w + 1) * (M ? 1 : -1));
        else {
          if (Z === 0 || !u(w, Math.abs(Z) - 1, +(Z > 0 === M))) return i;
          b.set(U, 0);
        }
      }
    }
  }
  const z = (w) => {
    const v = x[w];
    return [0, 1, 2].map((N) => jt(t, Math.floor(v / 3), v % 3 * 3 + N));
  }, S = [];
  for (const [w, v] of b) if (v !== 0) {
    const N = typeof w == "number" ? [Math.floor(w / A), w % A] : w.split(",").map(Number), C = z(N[0]), H = z(N[1]);
    S.push({ p: C, q: H, face: v, bounds: Bt([...C, ...H]) }), S.length % 2048 === 0 && await e();
  }
  h.clear(), b.clear(), x.length = 0;
  let P = !1;
  if (S.length) {
    const w = Math.max(s, Math.min(1e-5, n)), v = Kt(S, S.map((N, C) => C));
    for (let N = 0; N < S.length; N++) {
      N % 128 === 0 && await e();
      const C = S[N], H = T(C.q, C.p), R = K(H), M = Ot(H), U = [];
      for (const Q of Ut(v, C.bounds, w)) {
        if (N === Q) continue;
        const st = S[Q], J = T(st.p, C.p), Nt = T(st.q, C.p), Y = V(J, M), W = V(Nt, M), rt = Math.max(0, Math.min(Y, W)), lt = Math.min(R, Math.max(Y, W));
        if (lt - rt <= s) continue;
        const yt = Math.max(K(At(J, M, -Y)), K(At(Nt, M, -W)));
        if (yt > w) continue;
        const at = W > Y == (C.face > 0 == st.face > 0);
        if (!u(Math.abs(C.face) - 1, Math.abs(st.face) - 1, Number(at))) return i;
        yt > s && (P = !0), U.push([rt, lt]);
      }
      U.sort((Q, st) => Q[0] - st[0]);
      let Z = 0;
      for (const [Q, st] of U) {
        if (Math.abs(Q - Z) > s) return i;
        Z = st;
      }
      if (Math.abs(Z - R) > s) return i;
    }
  }
  const m = new Float64Array(a), B = new Float64Array(a), D = t.bounds.min.map((w, v) => (w + t.bounds.max[v]) / 2);
  for (let w = 0; w < a; w++) {
    if (w % 2048 === 0 && await e(), !f[w]) continue;
    const v = c(w), N = gt(t, w);
    m[v] += (d[w] ? -1 : 1) * V(T(N[0], D), xt(T(N[1], D), T(N[2], D))) / 6, B[v] += K(xt(T(N[1], N[0]), T(N[2], N[0]))) / 2;
  }
  let $ = 0;
  for (let w = 0; w < a; w++) {
    if (B[w] && Math.abs(m[w]) <= s * B[w]) return i;
    $ += Math.abs(m[w]);
  }
  return { closed: $ > 0, approximate: P };
}
function nn(t, e, n) {
  const s = T(e[1], e[0]), a = T(e[2], e[0]), i = xt(s, a), o = K(i);
  if (o < 1e-20 || Math.abs(V(T(t, e[0]), i)) / o > n) return !1;
  const r = T(t, e[0]), d = V(s, s), f = V(s, a), c = V(a, a), u = V(r, s), h = V(r, a), x = d * c - f * f;
  if (Math.abs(x) < 1e-30) return !1;
  const b = (u * c - h * f) / x, A = (h * d - u * f) / x, k = n / Math.max(K(s), K(a), n);
  return b >= -k && A >= -k && b + A <= 1 + k;
}
function _t(t, e, n, s) {
  for (const a of Ut(n, { min: t, max: t }, s))
    if (nn(t, gt(e, a), s)) return !0;
  return !1;
}
const qt = (t) => t.closed || t.interior === "winding";
function ce(t, e, n, s = !1) {
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
    const r = o.min.map((h, x) => (h + o.max[x]) / 2), d = T(r, t), f = K(d), c = K(T(o.max, o.min)) / 2;
    if (!s && f > c * 10 && f > 0)
      return V(a(o), d) / (f * f * f);
    if (!o.ids) return i(o.left) + i(o.right);
    let u = 0;
    for (const h of o.ids) {
      const x = gt(e, h), b = T(x[0], t), A = T(x[1], t), k = T(x[2], t), q = K(b), E = K(A), z = K(k);
      !q || !E || !z || (u += 2 * Math.atan2(V(b, xt(A, k)), q * E * z + V(b, A) * z + V(A, k) * q + V(k, b) * E));
    }
    return u;
  };
  return i(n) / (4 * Math.PI);
}
async function on(t, e, n) {
  const s = $t(t), a = (d) => !_t(d, t, e, s) && Math.abs(ce(d, t, e)) > 0.9, i = t.bounds.min.map((d, f) => (d + t.bounds.max[f]) / 2);
  if (a(i)) return !0;
  const o = Et(t), r = Math.max(1, Math.ceil(o / 32));
  for (let d = 0; d < o; d += r) {
    await n();
    const f = gt(t, d), c = Ot(xt(T(f[1], f[0]), T(f[2], f[0])));
    if (!c) continue;
    const u = [0, 1, 2].map((x) => (f[0][x] + f[1][x] + f[2][x]) / 3), h = Math.max(s * 8, Math.min(K(T(f[0], f[1])), K(T(f[1], f[2])), K(T(f[2], f[0]))) * 0.01);
    if (a(At(u, c, h)) || a(At(u, c, -h))) return !0;
  }
  return !1;
}
function Ft(t, e, n, s) {
  if (!qt(e) || t.some((u, h) => u < e.bounds.min[h] - s || u > e.bounds.max[h] + s) || _t(t, e, n, s)) return !1;
  if (e.interior === "winding") {
    const u = Math.abs(ce(t, e, n));
    return Math.abs(u - 0.5) < 0.05 ? Math.abs(ce(t, e, n, !0)) > 0.5 : u > 0.5;
  }
  const a = [1, 0.371390676, 0.52999894], i = K(T(e.bounds.max, e.bounds.min)) * 3 + 1, o = At(t, a, i), r = [], d = Bt([...t, ...o]);
  for (const u of Ut(n, d, s)) {
    const h = Zt(t, o, gt(e, u), s);
    if (h) {
      const x = K(T(h, t));
      x > s && r.push(x);
    }
  }
  r.sort((u, h) => u - h);
  let f = 0, c = -1 / 0;
  for (const u of r)
    u - c > s * 2 && (f++, c = u);
  return f % 2 === 1;
}
const te = (t) => /отвод|тройник|муфт|фитинг|elbow|fitting|tee\b/i.test(t.name);
async function an(t, e) {
  if (te(t)) return;
  const n = Et(t), s = Math.max(1, Math.ceil(n / 4096)), a = t.bounds.min.map(($, w) => ($ + t.bounds.max[w]) / 2), i = [], o = [];
  for (let $ = 0; $ < n; $ += s) {
    $ % (s * 256) === 0 && await e();
    const w = gt(t, $), v = xt(T(w[1], w[0]), T(w[2], w[0])), N = K(v);
    N && (i.push(...w), o.push({ n: v.map((C) => C / N), area: N }));
  }
  if (i.length < 12) return;
  let r = Wt(i, a)[0];
  const d = o.filter(({ n: $ }) => Math.abs(V($, r)) < 0.2);
  if (d.length < 4) return;
  const f = Wt(d.map(({ n: $ }) => $), [0, 0, 0])[2];
  if (Math.abs(V(f, r)) < 0.98) return;
  r = f;
  const c = r.map(Math.abs).indexOf(Math.max(...r.map(Math.abs)));
  r[c] < 0 && (r = r.map(($) => -$));
  const u = Math.abs(r[0]) < 0.7 ? [1, 0, 0] : [0, 1, 0], h = Ot(xt(r, u)), x = xt(r, h), b = [1 / 0, 1 / 0, 1 / 0], A = [-1 / 0, -1 / 0, -1 / 0];
  for (const $ of i) for (const [w, v] of [r, h, x].entries()) {
    const N = V(T($, a), v);
    b[w] = Math.min(b[w], N), A[w] = Math.max(A[w], N);
  }
  const k = A[0] - b[0], q = Math.max(A[1] - b[1], A[2] - b[2]), E = Math.min(A[1] - b[1], A[2] - b[2]);
  if (E <= $t(t) * 8 || k + $t(t) < q * 4 || q > E * 4) return;
  let z = 0, S = 0;
  const P = /* @__PURE__ */ new Set();
  for (const { n: $, area: w } of o) {
    const v = Math.abs(V($, r));
    S += w, (v < 0.015 || v > 0.999) && (z += w), v < 0.015 && P.add($.map((N) => Math.round(N * 100)).join(","));
  }
  if (z < S * 0.995) return;
  const m = [];
  for (let $ = 0; $ < i.length; $ += 3) {
    const w = i.slice($, $ + 3).map((v) => V(T(v, a), r));
    m.push([Math.min(...w), Math.max(...w)]);
  }
  m.sort(($, w) => $[0] - w[0]);
  let B = b[0];
  for (const [$, w] of m) {
    if ($ > B + $t(t) * 4) return;
    B = Math.max(B, w);
  }
  const D = At(At(a, h, (b[1] + A[1]) / 2), x, (b[2] + A[2]) / 2);
  return {
    axis: r,
    centre: D,
    from: b[0],
    to: A[0],
    width: q,
    round: P.size >= 6 && q < E * 1.2,
    sampled: s > 1
  };
}
async function sn(t, e) {
  if (te(t) || !/кабел|труб|cable|pipe/i.test(t.name)) return [];
  const n = $t(t), s = [], a = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), o = (E) => {
    const z = E.map((P, m) => Math.round((P - t.bounds.min[m]) / n)).join(",");
    let S = a.get(z);
    return S === void 0 && (S = s.length, s.push(E), a.set(z, S)), S;
  };
  for (let E = 0; E < Et(t); E++) {
    E % 1024 === 0 && await e();
    const z = gt(t, E).map(o);
    for (let S = 0; S < 3; S++) {
      const P = Math.min(z[S], z[(S + 1) % 3]), m = Math.max(z[S], z[(S + 1) % 3]);
      P !== m && i.set(`${P},${m}`, [P, m, K(T(s[P], s[m]))]);
    }
  }
  const r = [...i.values()].map((E) => E[2]).filter((E) => E > n).sort((E, z) => E - z);
  if (!r.length) return [];
  const d = r[Math.floor(r.length * 0.1)] * 1.25, f = Int32Array.from({ length: s.length }, (E, z) => z), c = (E) => {
    for (; f[E] !== E; )
      f[E] = f[f[E]], E = f[E];
    return E;
  };
  let u = 0;
  for (const [E, z, S] of i.values())
    ++u % 4096 === 0 && await e(), S <= d && (f[c(z)] = c(E));
  const h = /* @__PURE__ */ new Map();
  for (let E = 0; E < s.length; E++) {
    const z = c(E), S = h.get(z);
    S ? S.push(s[E]) : h.set(z, [s[E]]);
  }
  const x = /* @__PURE__ */ new Map();
  for (const [E, z] of h) {
    if (await e(), z.length < 6 || z.length > 256) continue;
    const S = z[0], P = [0, 1, 2].map(($) => S[$] + z.reduce((w, v) => w + v[$] - S[$], 0) / z.length), m = z.map(($) => K(T($, P))), B = Math.max(...m), D = Wt(z, P)[2];
    !D || B <= n || Math.min(...m) < B * 0.88 || z.some(($) => Math.abs(V(T($, P), D)) > Math.max(n * 16, B * 2e-3)) || x.set(E, { centre: P, radius: B, normal: D });
  }
  const b = /* @__PURE__ */ new Map();
  for (const [E, z] of i.values()) {
    ++u % 4096 === 0 && await e();
    const S = Math.min(c(E), c(z)), P = Math.max(c(E), c(z));
    if (S === P || !x.has(S) || !x.has(P)) continue;
    const m = `${S},${P}`, B = b.get(m);
    B ? B.count++ : b.set(m, { a: S, b: P, count: 1 });
  }
  const A = /* @__PURE__ */ new Map();
  for (const { a: E, b: z, count: S } of b.values()) {
    const P = x.get(E), m = x.get(z), B = Ot(T(m.centre, P.centre));
    S < 6 || !B || Math.min(P.radius, m.radius) < Math.max(P.radius, m.radius) * 0.8 || Math.abs(V(B, P.normal)) < 0.5 || Math.abs(V(B, m.normal)) < 0.5 || (A.set(E, [...A.get(E) || [], z]), A.set(z, [...A.get(z) || [], E]));
  }
  const k = /* @__PURE__ */ new Set(), q = [];
  for (const [E, z] of A) {
    if (z.length !== 1 || k.has(E)) continue;
    let S = E, P = -1;
    const m = [];
    for (; !k.has(S); ) {
      k.add(S);
      const B = A.get(S) || [];
      if (B.length > 2) break;
      const D = B.find((C) => C !== P);
      if (D === void 0 || k.has(D)) break;
      const $ = x.get(S), w = x.get(D), v = T(w.centre, $.centre), N = K(v);
      N > n && m.push({
        axis: v.map((C) => C / N),
        centre: $.centre,
        from: 0,
        to: N,
        width: Math.max($.radius, w.radius) * 2,
        round: !0,
        sampled: !0
      }), P = S, S = D;
    }
    m.length && q.push(m);
  }
  return q;
}
async function rn(t, e) {
  const n = Et(t), s = Int32Array.from({ length: n }, (d, f) => f), a = new Uint8Array(n), i = /* @__PURE__ */ new Map(), o = $t(t), r = (d) => {
    for (; s[d] !== d; )
      s[d] = s[s[d]], d = s[d];
    return d;
  };
  for (let d = 0; d < n; d++) {
    d % 2048 === 0 && await e();
    for (const f of gt(t, d)) {
      const c = f.map((b, A) => Math.round((b - t.bounds.min[A]) / o)).join(","), u = i.get(c);
      if (u === void 0) {
        i.set(c, d);
        continue;
      }
      let h = r(d), x = r(u);
      h !== x && (a[h] < a[x] && ([h, x] = [x, h]), s[x] = h, a[h] === a[x] && a[h]++);
    }
  }
  for (let d = 0; d < n; d++) s[d] = r(d);
  return s;
}
async function ln(t, e, n, s, a) {
  const { axis: i, centre: o } = t, r = Math.abs(i[0]) < 0.7 ? [1, 0, 0] : [0, 1, 0], d = Ot(xt(i, r)), f = xt(i, d), c = [1 / 0, 1 / 0, 1 / 0], u = [-1 / 0, -1 / 0, -1 / 0], h = $t(e);
  for (let S = 0; S < Et(e); S++) {
    S % 2048 === 0 && await s();
    for (const P of gt(e, S)) for (const [m, B] of [i, d, f].entries()) {
      const D = V(T(P, o), B);
      c[m] = Math.min(c[m], D), u[m] = Math.max(u[m], D);
    }
  }
  if (u[1] - c[1] < t.width * 2.5 || u[2] - c[2] < t.width * 2.5) return [];
  const x = Math.max(1, u[0] - c[0]), b = At(o, i, c[0] - x), A = At(o, i, u[0] + x), k = [];
  let q = 0;
  for (const S of Ut(n, Bt([...b, ...A]), h)) {
    ++q % 256 === 0 && await s();
    const P = Zt(b, A, gt(e, S), h);
    P && k.push({ triangle: S, at: V(T(P, o), i) });
  }
  if (k.length < 2) return [];
  const E = await a(), z = /* @__PURE__ */ new Map();
  for (const S of k) {
    const P = E[S.triangle], m = z.get(P);
    m ? (m[0] = Math.min(m[0], S.at), m[1] = Math.max(m[1], S.at)) : z.set(P, [S.at, S.at]);
  }
  return [...z].map(([S, [P, m]]) => ({ part: S, from: Math.max(t.from, P), to: Math.min(t.to, m) })).filter(({ from: S, to: P }) => P - S > h);
}
async function cn(t, e, n, s, a) {
  let i = 0;
  const o = $t(e);
  for (const r of t) {
    let d = 0;
    const f = /* @__PURE__ */ new Map();
    for (const c of r) {
      await s();
      for (const u of await ln(c, e, n, s, a)) {
        const h = f.get(u.part) || [];
        h.push([d + u.from - c.from, d + u.to - c.from]), f.set(u.part, h);
      }
      d += c.to - c.from;
    }
    for (const c of f.values()) {
      c.sort((x, b) => x[0] - b[0]);
      let u = c[0][0], h = c[0][1];
      for (const [x, b] of c.slice(1))
        x <= h + o * 4 ? h = Math.max(h, b) : (i = Math.max(i, h - u), u = x, h = b);
      i = Math.max(i, h - u);
    }
  }
  return i > o ? i * 1e3 : void 0;
}
function dn(t, e, n) {
  const s = Ot(xt(T(e[1], e[0]), T(e[2], e[0])));
  if (!s) return [];
  if (t.some((i) => Math.abs(V(T(i, e[0]), s)) > n)) {
    const i = [];
    return Ue(t, e, n, i), i;
  }
  let a = t;
  for (let i = 0; i < 3 && a.length; i++) {
    const o = e[i], r = T(e[(i + 1) % 3], o), d = Ot(xt(s, r));
    if (!d) return [];
    const f = [];
    for (let c = 0; c < a.length; c++) {
      const u = a[c], h = a[(c + 1) % a.length], x = V(T(u, o), d), b = V(T(h, o), d);
      x >= -n && f.push(u), x >= -n != b >= -n && f.push(At(u, T(h, u), Math.max(0, Math.min(1, x / (x - b)))));
    }
    a = f;
  }
  return a;
}
async function fn(t, e, n, s, a, i) {
  const o = Math.max($t(e), $t(n)), r = t.map(() => []), d = t.map((h) => {
    let x = 0;
    return h.map((b) => {
      const A = { p: b, offset: x };
      return x += b.to - b.from, A;
    });
  }), f = (h, x, b) => {
    let A = 0, k = h.length;
    for (; A < k; ) {
      const E = A + k >> 1;
      h[E][1] < x - o * 4 ? A = E + 1 : k = E;
    }
    let q = A;
    for (; q < h.length && h[q][0] <= b + o * 4; )
      x = Math.min(x, h[q][0]), b = Math.max(b, h[q][1]), q++;
    h.splice(A, q - A, [x, b]);
  };
  let c = 0;
  for (const [h, x] of Ct(s, a, o)) {
    ++c % 256 === 0 && await i();
    const b = gt(e, h), A = gt(n, x);
    if (!Le(b, A, o, !0)) continue;
    const k = dn(b, A, o);
    if (!(k.length < 2))
      for (let q = 0; q < d.length; q++) for (const { p: E, offset: z } of d[q]) {
        const S = k.map((B) => V(T(B, E.centre), E.axis)), P = Math.max(E.from, Math.min(...S)), m = Math.min(E.to, Math.max(...S));
        m - P <= o || k.some((B, D) => {
          const $ = Math.max(E.from, Math.min(E.to, S[D]));
          return K(T(B, At(E.centre, E.axis, $))) <= E.width * 0.7 + o;
        }) && f(r[q], z + P - E.from, z + m - E.from);
      }
  }
  let u = 0;
  for (const h of r) for (const [x, b] of h) u = Math.max(u, b - x);
  return u > o ? u * 1e3 : void 0;
}
async function pn(t, e, n, s, a) {
  const i = e.precision / 1e3;
  if (!Number.isFinite(i) || i <= 0)
    throw Error("Точность расчёта должна быть положительным числом.");
  const o = t.filter((M) => e.includeHidden || !M.hidden), r = o.filter((M) => Yt(M, e.a)), d = o.filter((M) => Yt(M, e.b));
  if (!r.length || !d.length) {
    const M = r.length ? "Б" : "А", U = r.length ? e.b : e.a;
    throw Error(`Выбор ${M}: ${Pe(t, U, e.includeHidden)}`);
  }
  let f = performance.now();
  const c = async () => {
    if (s())
      throw Error("Расчёт отменён. Предыдущие результаты сохранены.");
    performance.now() - f > 16 && (await new Promise((M) => setTimeout(M, 0)), f = performance.now());
  }, u = /* @__PURE__ */ new Map(), h = (M) => {
    let U = u.get(M.id);
    return U || (U = le(
      M,
      Array.from({ length: Et(M) }, (Z, Q) => Q)
    ), u.set(M.id, U)), U;
  }, x = /* @__PURE__ */ new Map(), b = /* @__PURE__ */ new Map(), A = /* @__PURE__ */ new Map(), k = async (M) => {
    let U = A.get(M.id);
    return U || (U = await sn(M, c), A.set(M.id, U)), U;
  }, q = /* @__PURE__ */ new Map(), E = async (M) => {
    let U = q.get(M.id);
    return U || (U = await rn(M, c), q.set(M.id, U)), U;
  }, z = async (M) => (b.has(M.id) || b.set(M.id, await an(M, c)), b.get(M.id)), S = async (M) => {
    if (e.type !== "intersection") return M;
    let U = x.get(M.id);
    return U === void 0 && (U = await en(M, c, i), !U.closed && await on(M, h(M), c) && (U = { closed: !1, approximate: !0, winding: !0 }), x.set(M.id, U)), U.winding ? { ...M, closed: !1, interior: "winding" } : U.closed === M.closed ? M : { ...M, closed: U.closed };
  }, P = /* @__PURE__ */ new Map(), m = async (M) => {
    let U = P.get(M.id);
    if (U !== void 0) return U;
    const Z = [];
    for (let Q = 0; Q < Et(M); Q++)
      Z.push(
        [0, 3, 6].map(
          (st) => [0, 1, 2].map((J) => Math.round(jt(M, Q, st + J) / i)).join(",")
        ).sort().join(";")
      ), Q % 9e3 === 0 && await c();
    return U = Z.sort().join("|"), P.set(M.id, U), U;
  }, B = [], D = new Set(r.map((M) => M.id)), $ = new Set(d.map((M) => M.id)), w = Kt(
    d,
    d.map((M, U) => U)
  ), v = /* @__PURE__ */ new Map();
  let N = 0;
  const C = (M) => M.triangles.byteLength + (M.vertices?.byteLength || 0) + (M.indices?.byteLength || 0) + Et(M) * 32;
  async function H(M, U) {
    if (!a) return M;
    let Z = v.get(M.id);
    if (Z)
      return v.delete(M.id), v.set(M.id, Z), Z;
    for (const [Q, st] of v)
      Q !== U && N > 96 * 1024 * 1024 && (v.delete(Q), N -= C(st), u.delete(Q), q.delete(Q), A.delete(Q), P.delete(Q));
    return Z = await a(M.id), v.set(M.id, Z), N += C(Z), Z;
  }
  let R = -1 / 0;
  for (let M = 0; M < r.length; M++) {
    const U = r[M];
    performance.now() - R > 150 && (R = performance.now(), n({
      phase: "Проверка пар",
      done: M,
      total: r.length,
      found: B.length
    }));
    const Z = [...Ut(w, U.bounds, i)];
    for (let Q = 0; Q < Z.length; Q++) {
      const st = Z[Q];
      performance.now() - R > 150 && (R = performance.now(), n({
        phase: `Проверка пар · A ${M + 1}/${r.length} · кандидаты ${Q + 1}/${Z.length}`,
        done: M,
        total: r.length,
        found: B.length
      }));
      const J = d[st];
      if (await c(), U.id === J.id || !Vt(U.bounds, J.bounds, i) || e.ignoreSameModel && U.modelId === J.modelId || e.ignoreSameGroup && U.modelId === J.modelId && U.properties.Объект && U.properties.Объект === J.properties.Объект || e.equalProperty && U.properties[e.equalProperty] !== void 0 && U.properties[e.equalProperty] === J.properties[e.equalProperty] || U.id > J.id && D.has(J.id) && $.has(U.id)) continue;
      const Nt = Je(U.id, J.id), Y = await S(await H(U)), W = await S(await H(J, U.id));
      let rt, lt = "surface", yt = 0, at, Lt, ut, vt, ct;
      if (e.type === "duplicates") {
        if (Et(Y) !== Et(W) || Y.bounds.min.some(
          (bt, mt) => Math.abs(bt - W.bounds.min[mt]) > i || Math.abs(Y.bounds.max[mt] - W.bounds.max[mt]) > i
        ))
          continue;
        await m(Y) === await m(W) && (rt = Y.bounds.min.map((bt, mt) => (bt + Y.bounds.max[mt]) / 2), lt = "duplicate");
      } else {
        const bt = h(Y), mt = h(W), _ = Math.max(
          1,
          ...Y.bounds.min.map(Math.abs),
          ...Y.bounds.max.map(Math.abs),
          ...W.bounds.min.map(Math.abs),
          ...W.bounds.max.map(Math.abs)
        ), ot = Math.max(1e-10, _ * Number.EPSILON * 64), et = {
          min: Y.bounds.min.map(
            (L, I) => Math.max(L, W.bounds.min[I])
          ),
          max: Y.bounds.max.map(
            (L, I) => Math.min(L, W.bounds.max[I])
          )
        }, zt = et.min.map(
          (L, I) => (L + et.max[I]) / 2
        ), Dt = new _e(), l = [];
        let p = 1, y = 0, g = 1 / 0, j = 0;
        for (const [L, I] of Ct(bt, mt, i)) {
          const O = gt(Y, L), G = gt(W, I);
          if (!Vt(Bt(O.flat()), Bt(G.flat()), i)) continue;
          const F = Le(O, G, ot, e.touching);
          if (F) {
            const X = K(T(F, zt));
            if ((!rt || X < g) && (rt = F, g = X), Dt.add(O), Dt.add(G), y++ % p === 0 && (Ue(O, G, ot, l), l.length || l.push(F), l.length >= 8192)) {
              for (let nt = 0; nt * 2 < l.length; nt++) l[nt] = l[nt * 2];
              l.length = Math.ceil(l.length / 2), p *= 2;
            }
          }
          ++j % 256 === 0 && (performance.now() - R > 150 && (R = performance.now(), n({
            phase: `Геометрия пары · A ${M + 1}/${r.length}`,
            done: M,
            total: r.length,
            found: B.length
          })), await c());
        }
        if (!rt && qt(Y) && qt(W)) {
          const L = zt;
          Ft(L, Y, bt, ot) && Ft(L, W, mt, ot) && (rt = L, lt = "contained");
        }
        if (!rt) {
          for (const [L, I, O] of [
            [Y, W, mt],
            [W, Y, bt]
          ])
            if (qt(I)) {
              for (let G = 0; G < Et(L) && !rt; G++) {
                const F = gt(L, G), X = F[0].map(
                  (nt, dt) => (F[0][dt] + F[1][dt] + F[2][dt]) / 3
                );
                for (const nt of [F[0], X])
                  if (Ft(nt, I, O, ot)) {
                    rt = nt, lt = "contained";
                    break;
                  }
                await c();
              }
              if (rt) break;
            }
        }
        if (rt) {
          const L = (tt, ft) => [...Ut(ft, et, i)].filter(
            (It) => Vt(Bt(gt(tt, It).flat()), et, i)
          ), I = L(Y, bt), O = L(W, mt);
          lt !== "surface" && (Dt.addFrom(Y, I), Dt.addFrom(W, O)), await c();
          const G = et.min.map(
            (tt, ft) => (tt + et.max[ft]) / 2
          ), F = (tt, ft) => tt === 0 ? Ft(ft, Y, bt, ot) : Ft(ft, W, mt, ot), X = (tt, ft) => tt === 0 ? Ft(ft, Y, bt, ot) || _t(ft, Y, bt, ot) : Ft(ft, W, mt, ot) || _t(ft, W, mt, ot);
          if (lt === "contained") {
            const tt = Math.max(1, Math.ceil((I.length + O.length) / 4096));
            p = Math.max(p, tt);
            const ft = /* @__PURE__ */ new Set();
            for (const [It, pt, ht] of [[Y, I, 1], [W, O, 0]]) {
              for (let wt = 0; wt < pt.length; wt += tt) {
                wt % (tt * 32) === 0 && await c();
                for (const St of gt(It, pt[wt])) {
                  const Pt = St.join(",");
                  ft.has(Pt) || (ft.add(Pt), X(ht, St) && l.push(St));
                }
              }
              ft.clear();
            }
            if (Y.interior === "winding" || W.interior === "winding") {
              const It = (pt, ht) => {
                let wt = 1, St = 0;
                for (; pt; pt = Math.floor(pt / ht))
                  wt /= ht, St += wt * (pt % ht);
                return St;
              };
              for (let pt = 1; pt <= 2048; pt++) {
                pt % 16 === 0 && await c();
                const ht = [2, 3, 5].map((wt, St) => et.min[St] + It(pt, wt) * (et.max[St] - et.min[St]));
                F(0, ht) && F(1, ht) && l.push(ht);
              }
            }
          }
          const nt = (tt, ft, It) => qt(Y) && qt(W) && It.every((pt) => {
            const ht = At(pt, tt, ft - V(pt, tt));
            return !X(0, ht) || !X(1, ht);
          }), dt = () => [0, 1, 2].map(
            (tt) => l.reduce((ft, It) => ft + It[tt], 0) / l.length
          ), kt = lt === "surface" && l.length > 2 ? Wt(l, dt())[2] : void 0, Gt = kt ? ve(
            Y,
            W,
            I,
            O,
            [kt],
            [],
            et,
            dt(),
            l,
            ot,
            F
          ) : void 0, Jt = !Gt || Gt.width > ot, ue = !Jt && !!Gt?.approximate, me = !qt(Y) || !qt(W);
          if (!me && !Jt && !ue && (lt = "touch"), lt === "touch" && !e.touching) continue;
          const { zones: Ge, crowded: Ye } = tn(l, et, i, nt), Be = Dt.values();
          let Qt = 0, he = !ue, ge = Ye || p > 1 || !!Gt?.approximate || !!x.get(Y.id)?.approximate || !!x.get(W.id)?.approximate;
          for (const tt of lt === "touch" ? [] : Ge) {
            const ft = tt.limits.length ? I.filter((wt) => we(Y, wt, tt.limits)) : I, It = tt.limits.length ? O.filter((wt) => we(W, wt, tt.limits)) : O, pt = tt.hits.length ? [0, 1, 2].map(
              (wt) => tt.hits.reduce((St, Pt) => St + Pt[wt], 0) / tt.hits.length
            ) : G, ht = ve(
              Y,
              W,
              ft,
              It,
              tt.hits.length > 2 ? Wt(tt.hits, pt) : [],
              Be,
              et,
              pt,
              tt.hits,
              ot,
              F,
              lt === "contained"
            );
            ht.thin && (he = !1), ht.approximate && (ge = !0), ht.width > Qt && (Qt = ht.width), await c();
          }
          if (Qt *= 1e3, lt === "touch" ? at = void 0 : me ? at = "unmeasurable" : Qt <= 0 || !he ? at = "tolerance" : ge && (at = "approximate"), yt = lt === "touch" || at === "unmeasurable" || at === "tolerance" ? 0 : Qt, !te(Y) && !te(W)) {
            const tt = await z(Y), ft = await z(W);
            for (const [It, pt, ht, wt, St] of [[tt, Y, W, ft, mt], [ft, W, Y, tt, bt]]) {
              if (wt?.round && /труб|pipe/i.test(ht.name)) continue;
              const Pt = It ? [[It]] : await k(pt);
              if (!Pt.length) continue;
              const be = await fn(Pt, pt, ht, pt === Y ? bt : mt, St, c);
              if (be !== void 0 && (ct = Math.max(ct ?? 0, be)), lt === "touch") continue;
              const ee = await cn(Pt, ht, St, c, () => E(ht));
              ee === void 0 || ee <= (ut ?? 0) || (ut = ee, vt = pt.id, It || (at = at || "approximate"));
            }
            ut !== void 0 && (Lt = at === "unmeasurable" || at === "tolerance" ? void 0 : yt, yt = Math.max(yt, ut), (at === "unmeasurable" || at === "tolerance" || tt?.sampled || ft?.sampled) && (at = "approximate"));
          }
          await c();
        }
        if (rt && !Oe({ kind: lt, depth: at, penetrationMm: yt }, e.minPenetration, e.precision))
          continue;
      }
      if (rt && (B.push({
        id: Nt,
        a: ye(Y),
        b: ye(W),
        point: rt,
        kind: lt,
        state: "new",
        note: "",
        assignee: "",
        firstSeen: "",
        lastSeen: "",
        penetrationMm: yt,
        ...ut !== void 0 ? { axialPenetrationMm: ut, axialElementId: vt, overlapThicknessMm: Lt } : {},
        ...ct !== void 0 ? { contactLengthMm: ct } : {},
        ...at ? { depth: at } : {}
      }), B.length >= 5e4))
        throw Error(
          "Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат."
        );
    }
  }
  return n({
    phase: "Готово",
    done: r.length,
    total: r.length,
    found: B.length
  }), B;
}
const De = '(function(){"use strict";const rn=(n,t,e)=>n.kind==="duplicate"||n.depth==="unmeasurable"||n.depth==="tolerance"||(n.penetrationMm??0)+e>=t,Wt=({triangles:n,vertices:t,indices:e,triangleCount:l,closed:s,bounds:f,...a})=>a;function Ut(n,t){return t.exclude.includes(n.id)?!1:t.include.includes(n.id)?!0:!(t.manualOnly||t.modelsMode==="selected"&&!t.models.includes(n.modelId)||t.modelsMode===void 0&&t.models.length&&!t.models.includes(n.modelId))}function fn(n,t,e){if(!t.manualOnly&&t.modelsMode==="selected"&&!t.models.length&&!t.include.length)return"Не отмечены модели. Выберите файлы или включите «Все модели».";let l=0;for(const s of n)if(Ut(s,t)&&(l++,e||!s.hidden))return;return l?`Все выбранные элементы (${l}) скрыты. Покажите их в модели или включите «Включать скрытые элементы» на вкладке «Правила».`:t.manualOnly?"Ручная выборка пуста. Выделите элементы в 3D заново или нажмите «Сбросить ручной выбор».":t.exclude.length?"Нет элементов после ручных исключений. Проверьте исключения или нажмите «Сбросить ручной выбор».":"В выбранных моделях нет доступных элементов. Обновите модели и проверьте состав выборки."}const cn=(n,t)=>JSON.stringify([n,t].sort()),q=(n,t)=>[n[0]-t[0],n[1]-t[1],n[2]-t[2]],tt=(n,t,e=1)=>[n[0]+t[0]*e,n[1]+t[1]*e,n[2]+t[2]*e],N=(n,t)=>n[0]*t[0]+n[1]*t[1]+n[2]*t[2],J=(n,t)=>[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]],L=n=>Math.hypot(...n),Mt=n=>{const t=L(n);return t>1e-20?[n[0]/t,n[1]/t,n[2]/t]:void 0},ut=n=>n.triangleCount??(n.indices?n.indices.length/3:n.triangles.length/9),nt=(n,t,e)=>n.indices&&n.vertices?n.vertices[n.indices[t*3+Math.floor(e/3)]*3+e%3]:n.triangles[t*9+e],X=(n,t)=>[0,3,6].map(e=>[nt(n,t,e),nt(n,t,e+1),nt(n,t,e+2)]);function jt(n){const t=[1/0,1/0,1/0],e=[-1/0,-1/0,-1/0];for(let l=0;l<n.length;l++){const s=l%3;t[s]=Math.min(t[s],n[l]),e[s]=Math.max(e[s],n[l])}return{min:t,max:e}}const Et=(n,t,e)=>n.min.every((l,s)=>l<=t.max[s]+e&&n.max[s]>=t.min[s]-e);function Dt(n,t){const e={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const o of t)for(let r=0;r<9;r++){const u=r%3,i=nt(n,o,r);e.min[u]=Math.min(e.min[u],i),e.max[u]=Math.max(e.max[u],i)}if(t.length<=12)return{...e,ids:t};const l=e.max.map((o,r)=>o-e.min[r]),s=l.indexOf(Math.max(...l)),f=o=>nt(n,o,s)+nt(n,o,s+3)+nt(n,o,s+6);t.sort((o,r)=>f(o)-f(r));const a=t.length>>1;return{...e,left:Dt(n,t.slice(0,a)),right:Dt(n,t.slice(a))}}function*xt(n,t,e){Et(n,t,e)&&(n.ids?yield*n.ids:(yield*xt(n.left,t,e),yield*xt(n.right,t,e)))}function*dt(n,t,e){if(Et(n,t,e)){if(n.ids&&t.ids){for(const l of n.ids)for(const s of t.ids)yield[l,s];return}if(n.ids){yield*dt(n,t.left,e),yield*dt(n,t.right,e);return}if(t.ids){yield*dt(n.left,t,e),yield*dt(n.right,t,e);return}yield*dt(n.left,t.left,e),yield*dt(n.left,t.right,e),yield*dt(n.right,t.left,e),yield*dt(n.right,t.right,e)}}function $t(n,t){const e={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const a of t)for(let o=0;o<3;o++)e.min[o]=Math.min(e.min[o],n[a].bounds.min[o]),e.max[o]=Math.max(e.max[o],n[a].bounds.max[o]);if(t.length<=16)return{...e,ids:t};const l=e.max.map((a,o)=>a-e.min[o]),s=l.indexOf(Math.max(...l));t.sort((a,o)=>n[a].bounds.min[s]+n[a].bounds.max[s]-(n[o].bounds.min[s]+n[o].bounds.max[s]));const f=t.length>>1;return{...e,left:$t(n,t.slice(0,f)),right:$t(n,t.slice(f))}}function qt(n,t,e,l){const s=q(t,n),f=q(e[1],e[0]),a=q(e[2],e[0]),o=J(s,a),r=N(f,o);if(Math.abs(r)<=1e-12*L(s)*L(f)*L(a))return;const u=1/r,i=q(n,e[0]),p=N(i,o)*u,h=J(i,f),d=N(s,h)*u,x=N(a,h)*u,I=l/Math.max(L(f),L(a),l);if(p>=-I&&d>=-I&&p+d<=1+I&&x>=-I&&x<=1+I)return tt(n,s,Math.max(0,Math.min(1,x)))}function ln(n,t,e,l){const s=e.map(Math.abs).indexOf(Math.max(...e.map(Math.abs))),f=[0,1,2].filter(r=>r!==s),a=(r,u,i)=>(u[f[0]]-r[f[0]])*(i[f[1]]-r[f[1]])-(u[f[1]]-r[f[1]])*(i[f[0]]-r[f[0]]),o=(r,u)=>{const i=u.map((p,h)=>a(p,u[(h+1)%3],r));return i.every(p=>p>=-l*L(e))||i.every(p=>p<=l*L(e))};for(const r of n)if(o(r,t))return r;for(const r of t)if(o(r,n))return r;for(let r=0;r<3;r++)for(let u=0;u<3;u++){const i=n[r],p=n[(r+1)%3],h=t[u],d=t[(u+1)%3],x=q(p,i),I=q(d,h),O=x[f[0]]*I[f[1]]-x[f[1]]*I[f[0]];if(Math.abs(O)<1e-18)continue;const z=q(h,i),y=(z[f[0]]*I[f[1]]-z[f[1]]*I[f[0]])/O,P=(z[f[0]]*x[f[1]]-z[f[1]]*x[f[0]])/O;if(y>=0&&y<=1&&P>=0&&P<=1)return tt(i,x,y)}}function Xt(n,t,e,l){for(let s=0;s<3;s++){const f=qt(n[s],n[(s+1)%3],t,e);f&&l.push(f);const a=qt(t[s],t[(s+1)%3],n,e);a&&l.push(a)}}function Jt(n,t,e,l){const s=J(q(n[1],n[0]),q(n[2],n[0])),f=J(q(t[1],t[0]),q(t[2],t[0])),a=L(s),o=L(f);if(a<1e-20||o<1e-20)return;const r=t.map(i=>N(q(i,n[0]),s)/a),u=n.map(i=>N(q(i,t[0]),f)/o);if(!(r.every(i=>i>e)||r.every(i=>i<-e)||u.every(i=>i>e)||u.every(i=>i<-e))){if(r.every(i=>Math.abs(i)<=e)&&u.every(i=>Math.abs(i)<=e))return l?ln(n,t,s,e):void 0;if(!(!l&&(!(Math.min(...r)<-e&&Math.max(...r)>e)||!(Math.min(...u)<-e&&Math.max(...u)>e))))for(let i=0;i<3;i++){const p=qt(n[i],n[(i+1)%3],t,e);if(p)return p;const h=qt(t[i],t[(i+1)%3],n,e);if(h)return h}}}class un{world=[[1,0,0],[0,1,0],[0,0,1]];items=new Map;step=1e4;key(t){return t.map(e=>Math.round(e*this.step)).join(",")}add(t){const e=Mt(J(q(t[1],t[0]),q(t[2],t[0])));if(!e)return;const s=e[0]<-1e-9||Math.abs(e[0])<=1e-9&&(e[1]<-1e-9||Math.abs(e[1])<=1e-9&&e[2]<0)?[-e[0],-e[1],-e[2]]:[e[0],e[1],e[2]],f=this.key(s);for(this.items.has(f)||this.items.set(f,s);this.items.size>512&&this.step>10;){this.step/=10;const a=new Map;for(const o of this.items.values()){const r=this.key(o);a.has(r)||a.set(r,o)}this.items=a}}addFrom(t,e){for(const l of e)this.add(X(t,l))}values(){return[...this.world,...[...this.items].sort((t,e)=>t[0]<e[0]?-1:1).map(([,t])=>t)]}}function Pt(n,t){const e=[[0,0,0],[0,0,0],[0,0,0]];for(const s of n){const f=[s[0]-t[0],s[1]-t[1],s[2]-t[2]];for(let a=0;a<3;a++)for(let o=0;o<3;o++)e[a][o]+=f[a]*f[o]}const l=[[1,0,0],[0,1,0],[0,0,1]];for(let s=0;s<12;s++){let f=0;for(let a=0;a<3;a++)for(let o=a+1;o<3;o++)f+=e[a][o]*e[a][o];if(f<=1e-30)break;for(let a=0;a<3;a++)for(let o=a+1;o<3;o++){if(Math.abs(e[a][o])<=1e-30)continue;const r=(e[o][o]-e[a][a])/(2*e[a][o]),u=(r>=0?1:-1)/(Math.abs(r)+Math.sqrt(r*r+1)),i=1/Math.sqrt(u*u+1),p=u*i;for(const h of[e,l])for(let d=0;d<3;d++){const x=h[d][a],I=h[d][o];h[d][a]=i*x-p*I,h[d][o]=p*x+i*I}for(let h=0;h<3;h++){const d=e[a][h],x=e[o][h];e[a][h]=i*d-p*x,e[o][h]=p*d+i*x}}}return[0,1,2].sort((s,f)=>e[f][f]-e[s][s]).map(s=>Mt([l[0][s],l[1][s],l[2][s]])).filter(s=>!!s)}function hn(n,t,e,l){const s=t.min.map((i,p)=>(i+t.max[p])/2),f=L(q(t.max,t.min)),a=Math.max(e*10,f/50),o=i=>[0,1,2].map(p=>i.reduce((h,d)=>h+d[p],0)/i.length);let r=[{hits:n,limits:[]}],u=!1;for(let i=0;i<12;i++){const p=[];let h=!1;for(const d of r){if(d.hits.length<2){p.push(d);continue}if(p.length+r.length>=64){u=!0,p.push(d);continue}const x=o(d.hits),I=[x,s,...[0,.25,.5,.75].map(c=>d.hits[Math.floor(c*(d.hits.length-1))])],O=[[1,0,0],[0,1,0],[0,0,1]],z=Pt(d.hits,x);z[0]&&O.push(z[0]);const y=c=>{let m=-1/0,M=1/0;for(const v of d.hits){const S=N(v,c);S>m&&(m=S),S<M&&(M=S)}return m-M},P=c=>Math.max(0,...z.filter(m=>Math.abs(N(m,c))<.9).map(m=>y(m))),b=c=>{const m=d.hits.map(v=>N(v,c)).sort((v,S)=>v-S),M=[];for(let v=1;v<m.length;v++){const S=m[v]-m[v-1];S>a&&M.push({at:(m[v]+m[v-1])/2,size:S})}return M.sort((v,S)=>S.size-v.size)};let A,_=0;for(const c of O){const m=b(c);!m.length||m[0].size<=_||m[0].size<=P(c)||(_=m[0].size,l(c,m[0].at,I)&&(A={n:c,cuts:[m[0].at]}))}if(!A){p.push(d);continue}h=!0;const{n:$,cuts:E}=A,w=Array.from({length:E.length+1},()=>[]);for(const c of d.hits){const m=N(c,$);let M=0;for(;M<E.length&&m>=E[M];)M++;w[M].push(c)}w.forEach((c,m)=>p.push({hits:c,limits:[...d.limits,{n:$,from:m?E[m-1]:-1/0,to:m<E.length?E[m]:1/0}]}))}if(r=p,h&&i===11&&(u=!0),!h)break}return{zones:r,crowded:u}}function Rt(n,t,e){return e.every(({n:l,from:s,to:f})=>{let a=1/0,o=-1/0;for(let r=0;r<9;r+=3){const u=nt(n,t,r)*l[0]+nt(n,t,r+1)*l[1]+nt(n,t,r+2)*l[2];u<a&&(a=u),u>o&&(o=u)}return o>=s&&a<=f})}function Yt(n,t,e,l,s,f,a,o,r,u,i,p=!1){let h=!1;const d=E=>{let w=-1/0,c=1/0;const m=M=>{M>w&&(w=M),M<c&&(c=M)};for(const M of r)m(N(M,E));for(const[M,v,S]of[[n,e,1],[t,l,0]]){const C=Math.max(1,Math.floor(v.length/32));C>1&&(h=!0);for(let g=0;g<v.length;g+=C)for(const j of X(M,v[g]))i(S,j)&&m(N(j,E))}return Number.isFinite(w)&&Number.isFinite(c)?w-c:0},x=E=>{let w=1/0,c=-1/0;for(let m=0;m<8;m++){const M=(m&1?a.max[0]:a.min[0])*E[0]+(m&2?a.max[1]:a.min[1])*E[1]+(m&4?a.max[2]:a.min[2])*E[2];M<w&&(w=M),M>c&&(c=M)}return[w,c]},I=(E,w,c,m,M)=>{let v=1/0,S=-1/0;for(const C of w){let g=1/0,j=-1/0;for(let U=0;U<9;U+=3){const H=nt(E,C,U)*c[0]+nt(E,C,U+1)*c[1]+nt(E,C,U+2)*c[2];H<g&&(g=H),H>j&&(j=H)}j<m||g>M||(g<m&&(g=m),j>M&&(j=M),g<v&&(v=g),j>S&&(S=j))}return v===1/0?void 0:[v,S]};if(a.min.some((E,w)=>a.max[w]-E<=0))return{width:0,thin:!1,approximate:!1};const O=Math.ceil((e.length+l.length)/4096),z=[...s,...O>1?f.filter((E,w)=>w<3||w%O===0):f];O>1&&z.length<s.length+f.length&&(h=!0);const y=(E,w,c,m,M)=>{const v=g=>tt(o,c,g-N(o,c));if(!w)return i(E,v((m+M)/2))?[m,M]:void 0;let[S,C]=w;return S>m&&i(E,v((m+S)/2))&&(S=m),C<M&&i(E,v((C+M)/2))&&(C=M),[S,C]},P=(E,w)=>E&&w?Math.min(E[1],w[1])-Math.max(E[0],w[0]):0;let b=1/0,A=!1,_=!1,$=0;for(let E=0;E<z.length;E++){const w=z[E],[c,m]=x(w),M=I(n,e,w,c,m),v=I(t,l,w,c,m);let S=P(M,v);if(S<=0&&($++<32?S=P(y(0,M,w,c,m),y(1,v,w,c,m)):h=!0),p&&r.length>1){let C=1/0,g=-1/0;for(const j of r){const U=N(j,w);C=Math.min(C,U),g=Math.max(g,U)}S=Math.max(S,g-C)}if(S<=u&&(E<s.length&&$<40&&($++,S=d(w)),S<=u)){E<s.length&&(_=!0);continue}A=!0,S<b&&(b=S)}return{width:A&&Number.isFinite(b)?b:0,thin:_,approximate:h}}const mt=n=>Math.max(1e-10,Math.max(1,...n.bounds.min.map(Math.abs),...n.bounds.max.map(Math.abs))*Number.EPSILON*64);async function mn(n,t,e){const l=mt(n),s=ut(n),f={closed:!1,approximate:!1},a=new Uint32Array(s),o=new Uint8Array(s),r=new Uint8Array(s),u=new Uint8Array(s);for(let c=0;c<s;c++)a[c]=c;const i=c=>{if(a[c]!==c){const m=a[c];a[c]=i(m),r[c]^=r[m]}return a[c]},p=(c,m,M)=>{let v=i(c),S=i(m);const C=r[c]^r[m]^M;return v===S?C===0:(o[v]<o[S]&&([v,S]=[S,v]),a[S]=v,r[S]=C,o[v]===o[S]&&o[v]++,!0)},h=new Map,d=[],x=new Map,I=s*3,O=I*I<=Number.MAX_SAFE_INTEGER,z=(c,m)=>O?c*I+m:`${c},${m}`,y=(c,m)=>{const M=c.map((S,C)=>Math.round((S-n.bounds.min[C])/l)).join(",");let v=h.get(M);return v===void 0&&(v=h.size,h.set(M,v),d.push(m)),v};for(let c=0;c<s;c++){c%2048===0&&await t();const m=X(n,c);if(L(J(q(m[1],m[0]),q(m[2],m[0])))<=l*l)continue;const M=m.map((v,S)=>y(v,c*3+S));if(new Set(M).size===3){u[c]=1;for(let v=0;v<3;v++){const S=M[v],C=M[(v+1)%3],g=S<C,j=g?z(S,C):z(C,S),U=x.get(j);if(U===void 0)x.set(j,(c+1)*(g?1:-1));else{if(U===0||!p(c,Math.abs(U)-1,+(U>0===g)))return f;x.set(j,0)}}}}const P=c=>{const m=d[c];return[0,1,2].map(M=>nt(n,Math.floor(m/3),m%3*3+M))},b=[];for(const[c,m]of x)if(m!==0){const M=typeof c=="number"?[Math.floor(c/I),c%I]:c.split(",").map(Number),v=P(M[0]),S=P(M[1]);b.push({p:v,q:S,face:m,bounds:jt([...v,...S])}),b.length%2048===0&&await t()}h.clear(),x.clear(),d.length=0;let A=!1;if(b.length){const c=Math.max(l,Math.min(1e-5,e)),m=$t(b,b.map((M,v)=>v));for(let M=0;M<b.length;M++){M%128===0&&await t();const v=b[M],S=q(v.q,v.p),C=L(S),g=Mt(S),j=[];for(const H of xt(m,v.bounds,c)){if(M===H)continue;const rt=b[H],et=q(rt.p,v.p),Tt=q(rt.q,v.p),F=N(et,g),T=N(Tt,g),V=Math.max(0,Math.min(F,T)),R=Math.min(C,Math.max(F,T));if(R-V<=l)continue;const yt=Math.max(L(tt(et,g,-F)),L(tt(Tt,g,-T)));if(yt>c)continue;const Y=T>F==(v.face>0==rt.face>0);if(!p(Math.abs(v.face)-1,Math.abs(rt.face)-1,Number(Y)))return f;yt>l&&(A=!0),j.push([V,R])}j.sort((H,rt)=>H[0]-rt[0]);let U=0;for(const[H,rt]of j){if(Math.abs(H-U)>l)return f;U=rt}if(Math.abs(U-C)>l)return f}}const _=new Float64Array(s),$=new Float64Array(s),E=n.bounds.min.map((c,m)=>(c+n.bounds.max[m])/2);for(let c=0;c<s;c++){if(c%2048===0&&await t(),!u[c])continue;const m=i(c),M=X(n,c);_[m]+=(r[c]?-1:1)*N(q(M[0],E),J(q(M[1],E),q(M[2],E)))/6,$[m]+=L(J(q(M[1],M[0]),q(M[2],M[0])))/2}let w=0;for(let c=0;c<s;c++){if($[c]&&Math.abs(_[c])<=l*$[c])return f;w+=Math.abs(_[c])}return{closed:w>0,approximate:A}}function dn(n,t,e){const l=q(t[1],t[0]),s=q(t[2],t[0]),f=J(l,s),a=L(f);if(a<1e-20||Math.abs(N(q(n,t[0]),f))/a>e)return!1;const o=q(n,t[0]),r=N(l,l),u=N(l,s),i=N(s,s),p=N(o,l),h=N(o,s),d=r*i-u*u;if(Math.abs(d)<1e-30)return!1;const x=(p*i-h*u)/d,I=(h*r-p*u)/d,O=e/Math.max(L(l),L(s),e);return x>=-O&&I>=-O&&x+I<=1+O}function Ot(n,t,e,l){for(const s of xt(e,{min:n,max:n},l))if(dn(n,X(t,s),l))return!0;return!1}const wt=n=>n.closed||n.interior==="winding";function Ht(n,t,e,l=!1){const s=a=>{if(a.moment)return a.moment;const o=[0,0,0];if(a.ids)for(const r of a.ids){const u=X(t,r),i=J(q(u[1],u[0]),q(u[2],u[0]));for(let p=0;p<3;p++)o[p]+=i[p]/2}else{const r=s(a.left),u=s(a.right);for(let i=0;i<3;i++)o[i]=r[i]+u[i]}return a.moment=o},f=a=>{const o=a.min.map((h,d)=>(h+a.max[d])/2),r=q(o,n),u=L(r),i=L(q(a.max,a.min))/2;if(!l&&u>i*10&&u>0)return N(s(a),r)/(u*u*u);if(!a.ids)return f(a.left)+f(a.right);let p=0;for(const h of a.ids){const d=X(t,h),x=q(d[0],n),I=q(d[1],n),O=q(d[2],n),z=L(x),y=L(I),P=L(O);!z||!y||!P||(p+=2*Math.atan2(N(x,J(I,O)),z*y*P+N(x,I)*P+N(I,O)*z+N(O,x)*y))}return p};return f(e)/(4*Math.PI)}async function pn(n,t,e){const l=mt(n),s=r=>!Ot(r,n,t,l)&&Math.abs(Ht(r,n,t))>.9,f=n.bounds.min.map((r,u)=>(r+n.bounds.max[u])/2);if(s(f))return!0;const a=ut(n),o=Math.max(1,Math.ceil(a/32));for(let r=0;r<a;r+=o){await e();const u=X(n,r),i=Mt(J(q(u[1],u[0]),q(u[2],u[0])));if(!i)continue;const p=[0,1,2].map(d=>(u[0][d]+u[1][d]+u[2][d])/3),h=Math.max(l*8,Math.min(L(q(u[0],u[1])),L(q(u[1],u[2])),L(q(u[2],u[0])))*.01);if(s(tt(p,i,h))||s(tt(p,i,-h)))return!0}return!1}function It(n,t,e,l){if(!wt(t)||n.some((p,h)=>p<t.bounds.min[h]-l||p>t.bounds.max[h]+l)||Ot(n,t,e,l))return!1;if(t.interior==="winding"){const p=Math.abs(Ht(n,t,e));return Math.abs(p-.5)<.05?Math.abs(Ht(n,t,e,!0))>.5:p>.5}const s=[1,.371390676,.52999894],f=L(q(t.bounds.max,t.bounds.min))*3+1,a=tt(n,s,f),o=[],r=jt([...n,...a]);for(const p of xt(e,r,l)){const h=qt(n,a,X(t,p),l);if(h){const d=L(q(h,n));d>l&&o.push(d)}}o.sort((p,h)=>p-h);let u=0,i=-1/0;for(const p of o)p-i>l*2&&(u++,i=p);return u%2===1}const Ft=n=>/отвод|тройник|муфт|фитинг|elbow|fitting|tee\\b/i.test(n.name);async function gn(n,t){if(Ft(n))return;const e=ut(n),l=Math.max(1,Math.ceil(e/4096)),s=n.bounds.min.map((w,c)=>(w+n.bounds.max[c])/2),f=[],a=[];for(let w=0;w<e;w+=l){w%(l*256)===0&&await t();const c=X(n,w),m=J(q(c[1],c[0]),q(c[2],c[0])),M=L(m);M&&(f.push(...c),a.push({n:m.map(v=>v/M),area:M}))}if(f.length<12)return;let o=Pt(f,s)[0];const r=a.filter(({n:w})=>Math.abs(N(w,o))<.2);if(r.length<4)return;const u=Pt(r.map(({n:w})=>w),[0,0,0])[2];if(Math.abs(N(u,o))<.98)return;o=u;const i=o.map(Math.abs).indexOf(Math.max(...o.map(Math.abs)));o[i]<0&&(o=o.map(w=>-w));const p=Math.abs(o[0])<.7?[1,0,0]:[0,1,0],h=Mt(J(o,p)),d=J(o,h),x=[1/0,1/0,1/0],I=[-1/0,-1/0,-1/0];for(const w of f)for(const[c,m]of[o,h,d].entries()){const M=N(q(w,s),m);x[c]=Math.min(x[c],M),I[c]=Math.max(I[c],M)}const O=I[0]-x[0],z=Math.max(I[1]-x[1],I[2]-x[2]),y=Math.min(I[1]-x[1],I[2]-x[2]);if(y<=mt(n)*8||O+mt(n)<z*4||z>y*4)return;let P=0,b=0;const A=new Set;for(const{n:w,area:c}of a){const m=Math.abs(N(w,o));b+=c,(m<.015||m>.999)&&(P+=c),m<.015&&A.add(w.map(M=>Math.round(M*100)).join(","))}if(P<b*.995)return;const _=[];for(let w=0;w<f.length;w+=3){const c=f.slice(w,w+3).map(m=>N(q(m,s),o));_.push([Math.min(...c),Math.max(...c)])}_.sort((w,c)=>w[0]-c[0]);let $=x[0];for(const[w,c]of _){if(w>$+mt(n)*4)return;$=Math.max($,c)}const E=tt(tt(s,h,(x[1]+I[1])/2),d,(x[2]+I[2])/2);return{axis:o,centre:E,from:x[0],to:I[0],width:z,round:A.size>=6&&z<y*1.2,sampled:l>1}}async function Mn(n,t){if(Ft(n)||!/кабел|труб|cable|pipe/i.test(n.name))return[];const e=mt(n),l=[],s=new Map,f=new Map,a=y=>{const P=y.map((A,_)=>Math.round((A-n.bounds.min[_])/e)).join(",");let b=s.get(P);return b===void 0&&(b=l.length,l.push(y),s.set(P,b)),b};for(let y=0;y<ut(n);y++){y%1024===0&&await t();const P=X(n,y).map(a);for(let b=0;b<3;b++){const A=Math.min(P[b],P[(b+1)%3]),_=Math.max(P[b],P[(b+1)%3]);A!==_&&f.set(`${A},${_}`,[A,_,L(q(l[A],l[_]))])}}const o=[...f.values()].map(y=>y[2]).filter(y=>y>e).sort((y,P)=>y-P);if(!o.length)return[];const r=o[Math.floor(o.length*.1)]*1.25,u=Int32Array.from({length:l.length},(y,P)=>P),i=y=>{for(;u[y]!==y;)u[y]=u[u[y]],y=u[y];return y};let p=0;for(const[y,P,b]of f.values())++p%4096===0&&await t(),b<=r&&(u[i(P)]=i(y));const h=new Map;for(let y=0;y<l.length;y++){const P=i(y),b=h.get(P);b?b.push(l[y]):h.set(P,[l[y]])}const d=new Map;for(const[y,P]of h){if(await t(),P.length<6||P.length>256)continue;const b=P[0],A=[0,1,2].map(w=>b[w]+P.reduce((c,m)=>c+m[w]-b[w],0)/P.length),_=P.map(w=>L(q(w,A))),$=Math.max(..._),E=Pt(P,A)[2];!E||$<=e||Math.min(..._)<$*.88||P.some(w=>Math.abs(N(q(w,A),E))>Math.max(e*16,$*.002))||d.set(y,{centre:A,radius:$,normal:E})}const x=new Map;for(const[y,P]of f.values()){++p%4096===0&&await t();const b=Math.min(i(y),i(P)),A=Math.max(i(y),i(P));if(b===A||!d.has(b)||!d.has(A))continue;const _=`${b},${A}`,$=x.get(_);$?$.count++:x.set(_,{a:b,b:A,count:1})}const I=new Map;for(const{a:y,b:P,count:b}of x.values()){const A=d.get(y),_=d.get(P),$=Mt(q(_.centre,A.centre));b<6||!$||Math.min(A.radius,_.radius)<Math.max(A.radius,_.radius)*.8||Math.abs(N($,A.normal))<.5||Math.abs(N($,_.normal))<.5||(I.set(y,[...I.get(y)||[],P]),I.set(P,[...I.get(P)||[],y]))}const O=new Set,z=[];for(const[y,P]of I){if(P.length!==1||O.has(y))continue;let b=y,A=-1;const _=[];for(;!O.has(b);){O.add(b);const $=I.get(b)||[];if($.length>2)break;const E=$.find(v=>v!==A);if(E===void 0||O.has(E))break;const w=d.get(b),c=d.get(E),m=q(c.centre,w.centre),M=L(m);M>e&&_.push({axis:m.map(v=>v/M),centre:w.centre,from:0,to:M,width:Math.max(w.radius,c.radius)*2,round:!0,sampled:!0}),A=b,b=E}_.length&&z.push(_)}return z}async function yn(n,t){const e=ut(n),l=Int32Array.from({length:e},(r,u)=>u),s=new Uint8Array(e),f=new Map,a=mt(n),o=r=>{for(;l[r]!==r;)l[r]=l[l[r]],r=l[r];return r};for(let r=0;r<e;r++){r%2048===0&&await t();for(const u of X(n,r)){const i=u.map((x,I)=>Math.round((x-n.bounds.min[I])/a)).join(","),p=f.get(i);if(p===void 0){f.set(i,r);continue}let h=o(r),d=o(p);h!==d&&(s[h]<s[d]&&([h,d]=[d,h]),l[d]=h,s[h]===s[d]&&s[h]++)}}for(let r=0;r<e;r++)l[r]=o(r);return l}async function xn(n,t,e,l,s){const{axis:f,centre:a}=n,o=Math.abs(f[0])<.7?[1,0,0]:[0,1,0],r=Mt(J(f,o)),u=J(f,r),i=[1/0,1/0,1/0],p=[-1/0,-1/0,-1/0],h=mt(t);for(let b=0;b<ut(t);b++){b%2048===0&&await l();for(const A of X(t,b))for(const[_,$]of[f,r,u].entries()){const E=N(q(A,a),$);i[_]=Math.min(i[_],E),p[_]=Math.max(p[_],E)}}if(p[1]-i[1]<n.width*2.5||p[2]-i[2]<n.width*2.5)return[];const d=Math.max(1,p[0]-i[0]),x=tt(a,f,i[0]-d),I=tt(a,f,p[0]+d),O=[];let z=0;for(const b of xt(e,jt([...x,...I]),h)){++z%256===0&&await l();const A=qt(x,I,X(t,b),h);A&&O.push({triangle:b,at:N(q(A,a),f)})}if(O.length<2)return[];const y=await s(),P=new Map;for(const b of O){const A=y[b.triangle],_=P.get(A);_?(_[0]=Math.min(_[0],b.at),_[1]=Math.max(_[1],b.at)):P.set(A,[b.at,b.at])}return[...P].map(([b,[A,_]])=>({part:b,from:Math.max(n.from,A),to:Math.min(n.to,_)})).filter(({from:b,to:A})=>A-b>h)}async function wn(n,t,e,l,s){let f=0;const a=mt(t);for(const o of n){let r=0;const u=new Map;for(const i of o){await l();for(const p of await xn(i,t,e,l,s)){const h=u.get(p.part)||[];h.push([r+p.from-i.from,r+p.to-i.from]),u.set(p.part,h)}r+=i.to-i.from}for(const i of u.values()){i.sort((d,x)=>d[0]-x[0]);let p=i[0][0],h=i[0][1];for(const[d,x]of i.slice(1))d<=h+a*4?h=Math.max(h,x):(f=Math.max(f,h-p),p=d,h=x);f=Math.max(f,h-p)}}return f>a?f*1e3:void 0}function bn(n,t,e){const l=Mt(J(q(t[1],t[0]),q(t[2],t[0])));if(!l)return[];if(n.some(f=>Math.abs(N(q(f,t[0]),l))>e)){const f=[];return Xt(n,t,e,f),f}let s=n;for(let f=0;f<3&&s.length;f++){const a=t[f],o=q(t[(f+1)%3],a),r=Mt(J(l,o));if(!r)return[];const u=[];for(let i=0;i<s.length;i++){const p=s[i],h=s[(i+1)%s.length],d=N(q(p,a),r),x=N(q(h,a),r);d>=-e&&u.push(p),d>=-e!=x>=-e&&u.push(tt(p,q(h,p),Math.max(0,Math.min(1,d/(d-x)))))}s=u}return s}async function vn(n,t,e,l,s,f){const a=Math.max(mt(t),mt(e)),o=n.map(()=>[]),r=n.map(h=>{let d=0;return h.map(x=>{const I={p:x,offset:d};return d+=x.to-x.from,I})}),u=(h,d,x)=>{let I=0,O=h.length;for(;I<O;){const y=I+O>>1;h[y][1]<d-a*4?I=y+1:O=y}let z=I;for(;z<h.length&&h[z][0]<=x+a*4;)d=Math.min(d,h[z][0]),x=Math.max(x,h[z][1]),z++;h.splice(I,z-I,[d,x])};let i=0;for(const[h,d]of dt(l,s,a)){++i%256===0&&await f();const x=X(t,h),I=X(e,d);if(!Jt(x,I,a,!0))continue;const O=bn(x,I,a);if(!(O.length<2))for(let z=0;z<r.length;z++)for(const{p:y,offset:P}of r[z]){const b=O.map($=>N(q($,y.centre),y.axis)),A=Math.max(y.from,Math.min(...b)),_=Math.min(y.to,Math.max(...b));_-A<=a||O.some(($,E)=>{const w=Math.max(y.from,Math.min(y.to,b[E]));return L(q($,tt(y.centre,y.axis,w)))<=y.width*.7+a})&&u(o[z],P+A-y.from,P+_-y.from)}}let p=0;for(const h of o)for(const[d,x]of h)p=Math.max(p,x-d);return p>a?p*1e3:void 0}async function In(n,t,e,l,s){const f=t.precision/1e3;if(!Number.isFinite(f)||f<=0)throw Error("Точность расчёта должна быть положительным числом.");const a=n.filter(g=>t.includeHidden||!g.hidden),o=a.filter(g=>Ut(g,t.a)),r=a.filter(g=>Ut(g,t.b));if(!o.length||!r.length){const g=o.length?"Б":"А",j=o.length?t.b:t.a;throw Error(`Выбор ${g}: ${fn(n,j,t.includeHidden)}`)}let u=performance.now();const i=async()=>{if(l())throw Error("Расчёт отменён. Предыдущие результаты сохранены.");performance.now()-u>16&&(await new Promise(g=>setTimeout(g,0)),u=performance.now())},p=new Map,h=g=>{let j=p.get(g.id);return j||(j=Dt(g,Array.from({length:ut(g)},(U,H)=>H)),p.set(g.id,j)),j},d=new Map,x=new Map,I=new Map,O=async g=>{let j=I.get(g.id);return j||(j=await Mn(g,i),I.set(g.id,j)),j},z=new Map,y=async g=>{let j=z.get(g.id);return j||(j=await yn(g,i),z.set(g.id,j)),j},P=async g=>(x.has(g.id)||x.set(g.id,await gn(g,i)),x.get(g.id)),b=async g=>{if(t.type!=="intersection")return g;let j=d.get(g.id);return j===void 0&&(j=await mn(g,i,f),!j.closed&&await pn(g,h(g),i)&&(j={closed:!1,approximate:!0,winding:!0}),d.set(g.id,j)),j.winding?{...g,closed:!1,interior:"winding"}:j.closed===g.closed?g:{...g,closed:j.closed}},A=new Map,_=async g=>{let j=A.get(g.id);if(j!==void 0)return j;const U=[];for(let H=0;H<ut(g);H++)U.push([0,3,6].map(rt=>[0,1,2].map(et=>Math.round(nt(g,H,rt+et)/f)).join(",")).sort().join(";")),H%9e3===0&&await i();return j=U.sort().join("|"),A.set(g.id,j),j},$=[],E=new Set(o.map(g=>g.id)),w=new Set(r.map(g=>g.id)),c=$t(r,r.map((g,j)=>j)),m=new Map;let M=0;const v=g=>g.triangles.byteLength+(g.vertices?.byteLength||0)+(g.indices?.byteLength||0)+ut(g)*32;async function S(g,j){if(!s)return g;let U=m.get(g.id);if(U)return m.delete(g.id),m.set(g.id,U),U;for(const[H,rt]of m)H!==j&&M>96*1024*1024&&(m.delete(H),M-=v(rt),p.delete(H),z.delete(H),I.delete(H),A.delete(H));return U=await s(g.id),m.set(g.id,U),M+=v(U),U}let C=-1/0;for(let g=0;g<o.length;g++){const j=o[g];performance.now()-C>150&&(C=performance.now(),e({phase:"Проверка пар",done:g,total:o.length,found:$.length}));const U=[...xt(c,j.bounds,f)];for(let H=0;H<U.length;H++){const rt=U[H];performance.now()-C>150&&(C=performance.now(),e({phase:`Проверка пар · A ${g+1}/${o.length} · кандидаты ${H+1}/${U.length}`,done:g,total:o.length,found:$.length}));const et=r[rt];if(await i(),j.id===et.id||!Et(j.bounds,et.bounds,f)||t.ignoreSameModel&&j.modelId===et.modelId||t.ignoreSameGroup&&j.modelId===et.modelId&&j.properties.Объект&&j.properties.Объект===et.properties.Объект||t.equalProperty&&j.properties[t.equalProperty]!==void 0&&j.properties[t.equalProperty]===et.properties[t.equalProperty]||j.id>et.id&&E.has(et.id)&&w.has(j.id))continue;const Tt=cn(j.id,et.id),F=await b(await S(j)),T=await b(await S(et,j.id));let V,R="surface",yt=0,Y,Zt,St,kt,Lt;if(t.type==="duplicates"){if(ut(F)!==ut(T)||F.bounds.min.some((ct,it)=>Math.abs(ct-T.bounds.min[it])>f||Math.abs(F.bounds.max[it]-T.bounds.max[it])>f))continue;await _(F)===await _(T)&&(V=F.bounds.min.map((ct,it)=>(ct+F.bounds.max[it])/2),R="duplicate")}else{const ct=h(F),it=h(T),qn=Math.max(1,...F.bounds.min.map(Math.abs),...F.bounds.max.map(Math.abs),...T.bounds.min.map(Math.abs),...T.bounds.max.map(Math.abs)),ft=Math.max(1e-10,qn*Number.EPSILON*64),ht={min:F.bounds.min.map((k,B)=>Math.max(k,T.bounds.min[B])),max:F.bounds.max.map((k,B)=>Math.min(k,T.bounds.max[B]))},Bt=ht.min.map((k,B)=>(k+ht.max[B])/2),_t=new un,Z=[];let zt=1,Pn=0,Qt=1/0,Sn=0;for(const[k,B]of dt(ct,it,f)){const lt=X(F,k),pt=X(T,B);if(!Et(jt(lt.flat()),jt(pt.flat()),f))continue;const ot=Jt(lt,pt,ft,t.touching);if(ot){const bt=L(q(ot,Bt));if((!V||bt<Qt)&&(V=ot,Qt=bt),_t.add(lt),_t.add(pt),Pn++%zt===0&&(Xt(lt,pt,ft,Z),Z.length||Z.push(ot),Z.length>=8192)){for(let gt=0;gt*2<Z.length;gt++)Z[gt]=Z[gt*2];Z.length=Math.ceil(Z.length/2),zt*=2}}++Sn%256===0&&(performance.now()-C>150&&(C=performance.now(),e({phase:`Геометрия пары · A ${g+1}/${o.length}`,done:g,total:o.length,found:$.length})),await i())}if(!V&&wt(F)&&wt(T)){const k=Bt;It(k,F,ct,ft)&&It(k,T,it,ft)&&(V=k,R="contained")}if(!V){for(const[k,B,lt]of[[F,T,it],[T,F,ct]])if(wt(B)){for(let pt=0;pt<ut(k)&&!V;pt++){const ot=X(k,pt),bt=ot[0].map((gt,At)=>(ot[0][At]+ot[1][At]+ot[2][At])/3);for(const gt of[ot[0],bt])if(It(gt,B,lt,ft)){V=gt,R="contained";break}await i()}if(V)break}}if(V){const k=(D,K)=>[...xt(K,ht,f)].filter(st=>Et(jt(X(D,st).flat()),ht,f)),B=k(F,ct),lt=k(T,it);R!=="surface"&&(_t.addFrom(F,B),_t.addFrom(T,lt)),await i();const pt=ht.min.map((D,K)=>(D+ht.max[K])/2),ot=(D,K)=>D===0?It(K,F,ct,ft):It(K,T,it,ft),bt=(D,K)=>D===0?It(K,F,ct,ft)||Ot(K,F,ct,ft):It(K,T,it,ft)||Ot(K,T,it,ft);if(R==="contained"){const D=Math.max(1,Math.ceil((B.length+lt.length)/4096));zt=Math.max(zt,D);const K=new Set;for(const[st,G,W]of[[F,B,1],[T,lt,0]]){for(let Q=0;Q<G.length;Q+=D){Q%(D*32)===0&&await i();for(const at of X(st,G[Q])){const vt=at.join(",");K.has(vt)||(K.add(vt),bt(W,at)&&Z.push(at))}}K.clear()}if(F.interior==="winding"||T.interior==="winding"){const st=(G,W)=>{let Q=1,at=0;for(;G;G=Math.floor(G/W))Q/=W,at+=Q*(G%W);return at};for(let G=1;G<=2048;G++){G%16===0&&await i();const W=[2,3,5].map((Q,at)=>ht.min[at]+st(G,Q)*(ht.max[at]-ht.min[at]));ot(0,W)&&ot(1,W)&&Z.push(W)}}}const gt=(D,K,st)=>wt(F)&&wt(T)&&st.every(G=>{const W=tt(G,D,K-N(G,D));return!bt(0,W)||!bt(1,W)}),At=()=>[0,1,2].map(D=>Z.reduce((K,st)=>K+st[D],0)/Z.length),Vt=R==="surface"&&Z.length>2?Pt(Z,At())[2]:void 0,Ct=Vt?Yt(F,T,B,lt,[Vt],[],ht,At(),Z,ft,ot):void 0,tn=!Ct||Ct.width>ft,nn=!tn&&!!Ct?.approximate,en=!wt(F)||!wt(T);if(!en&&!tn&&!nn&&(R="touch"),R==="touch"&&!t.touching)continue;const{zones:An,crowded:En}=hn(Z,ht,f,gt),_n=_t.values();let Nt=0,on=!nn,sn=En||zt>1||!!Ct?.approximate||!!d.get(F.id)?.approximate||!!d.get(T.id)?.approximate;for(const D of R==="touch"?[]:An){const K=D.limits.length?B.filter(Q=>Rt(F,Q,D.limits)):B,st=D.limits.length?lt.filter(Q=>Rt(T,Q,D.limits)):lt,G=D.hits.length?[0,1,2].map(Q=>D.hits.reduce((at,vt)=>at+vt[Q],0)/D.hits.length):pt,W=Yt(F,T,K,st,D.hits.length>2?Pt(D.hits,G):[],_n,ht,G,D.hits,ft,ot,R==="contained");W.thin&&(on=!1),W.approximate&&(sn=!0),W.width>Nt&&(Nt=W.width),await i()}if(Nt*=1e3,R==="touch"?Y=void 0:en?Y="unmeasurable":Nt<=0||!on?Y="tolerance":sn&&(Y="approximate"),yt=R==="touch"||Y==="unmeasurable"||Y==="tolerance"?0:Nt,!Ft(F)&&!Ft(T)){const D=await P(F),K=await P(T);for(const[st,G,W,Q,at]of[[D,F,T,K,it],[K,T,F,D,ct]]){if(Q?.round&&/труб|pipe/i.test(W.name))continue;const vt=st?[[st]]:await O(G);if(!vt.length)continue;const an=await vn(vt,G,W,G===F?ct:it,at,i);if(an!==void 0&&(Lt=Math.max(Lt??0,an)),R==="touch")continue;const Gt=await wn(vt,W,at,i,()=>y(W));Gt===void 0||Gt<=(St??0)||(St=Gt,kt=G.id,st||(Y=Y||"approximate"))}St!==void 0&&(Zt=Y==="unmeasurable"||Y==="tolerance"?void 0:yt,yt=Math.max(yt,St),(Y==="unmeasurable"||Y==="tolerance"||D?.sampled||K?.sampled)&&(Y="approximate"))}await i()}if(V&&!rn({kind:R,depth:Y,penetrationMm:yt},t.minPenetration,t.precision))continue}if(V&&($.push({id:Tt,a:Wt(F),b:Wt(T),point:V,kind:R,state:"new",note:"",assignee:"",firstSeen:"",lastSeen:"",penetrationMm:yt,...St!==void 0?{axialPenetrationMm:St,axialElementId:kt,overlapThicknessMm:Zt}:{},...Lt!==void 0?{contactLengthMm:Lt}:{},...Y?{depth:Y}:{}}),$.length>=5e4))throw Error("Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат.")}}return e({phase:"Готово",done:o.length,total:o.length,found:$.length}),$}let jn=0;const Kt=new Map;self.onmessage=async n=>{if(n.data.request!==void 0){const t=Kt.get(n.data.request);Kt.delete(n.data.request),n.data.error?t?.reject(Error(n.data.error)):t?.resolve(n.data.geometry);return}try{const{elements:t,check:e}=n.data,l=await In(t,e,s=>self.postMessage({progress:s}),()=>!1,n.data.streaming?s=>new Promise((f,a)=>{const o=jn++;Kt.set(o,{resolve:f,reject:a}),self.postMessage({load:s,request:o})}):void 0);self.postMessage({results:l})}catch(t){self.postMessage({error:t instanceof Error?t.message:String(t)})}}})();\n', Me = typeof self < "u" && self.Blob && new Blob(["(self.URL || self.webkitURL).revokeObjectURL(self.location.href);", De], { type: "text/javascript;charset=utf-8" });
function un(t) {
  let e;
  try {
    if (e = Me && (self.URL || self.webkitURL).createObjectURL(Me), !e) throw "";
    const n = new Worker(e, {
      name: t?.name
    });
    return n.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(e);
    }), n;
  } catch {
    return new Worker(
      "data:text/javascript;charset=utf-8," + encodeURIComponent(De),
      {
        name: t?.name
      }
    );
  }
}
const Fe = new TextEncoder(), mn = (() => {
  const t = new Uint32Array(256);
  for (let e = 0; e < t.length; e++) {
    let n = e;
    for (let s = 0; s < 8; s++)
      n = n & 1 ? 3988292384 ^ n >>> 1 : n >>> 1;
    t[e] = n >>> 0;
  }
  return t;
})(), hn = (t) => {
  let e = 4294967295;
  for (const n of t) e = mn[(e ^ n) & 255] ^ e >>> 8;
  return (e ^ 4294967295) >>> 0;
}, gn = (t) => t.getHours() << 11 | t.getMinutes() << 5 | t.getSeconds() >> 1, bn = (t) => Math.max(1980, t.getFullYear()) - 1980 << 9 | t.getMonth() + 1 << 5 | t.getDate(), xn = (t) => {
  const e = new Uint8Array(t.reduce((s, a) => s + a.length, 0));
  let n = 0;
  for (const s of t)
    e.set(s, n), n += s.length;
  return e;
}, ne = (t, e) => {
  const n = new Uint8Array(t);
  return e(new DataView(n.buffer)), n;
};
function yn(t, e = /* @__PURE__ */ new Date()) {
  const n = [], s = [];
  let a = 0;
  for (const r of t) {
    const d = Fe.encode(r.name.replaceAll("\\", "/")), f = hn(r.data), c = gn(e), u = bn(e), h = ne(30, (b) => {
      b.setUint32(0, 67324752, !0), b.setUint16(4, 20, !0), b.setUint16(6, 2048, !0), b.setUint16(8, 0, !0), b.setUint16(10, c, !0), b.setUint16(12, u, !0), b.setUint32(14, f, !0), b.setUint32(18, r.data.length, !0), b.setUint32(22, r.data.length, !0), b.setUint16(26, d.length, !0);
    });
    n.push(h, d, r.data);
    const x = ne(46, (b) => {
      b.setUint32(0, 33639248, !0), b.setUint16(4, 20, !0), b.setUint16(6, 20, !0), b.setUint16(8, 2048, !0), b.setUint16(10, 0, !0), b.setUint16(12, c, !0), b.setUint16(14, u, !0), b.setUint32(16, f, !0), b.setUint32(20, r.data.length, !0), b.setUint32(24, r.data.length, !0), b.setUint16(28, d.length, !0), b.setUint32(42, a, !0);
    });
    s.push(x, d), a += h.length + d.length + r.data.length;
  }
  const i = s.reduce((r, d) => r + d.length, 0), o = ne(22, (r) => {
    r.setUint32(0, 101010256, !0), r.setUint16(8, t.length, !0), r.setUint16(10, t.length, !0), r.setUint32(12, i, !0), r.setUint32(16, a, !0);
  });
  return xn([...n, ...s, o]);
}
const ie = (t) => Fe.encode(t), it = (t) => String(t ?? "").replace(
  /[&<>"']/g,
  (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[e]
);
function ke(t, e) {
  const n = URL.createObjectURL(
    e instanceof Blob ? e : new Blob([e], {
      type: t.endsWith(".html") ? "text/html;charset=utf-8" : "application/json;charset=utf-8"
    })
  ), s = document.createElement("a");
  s.href = n, s.download = t, s.click(), setTimeout(() => URL.revokeObjectURL(n), 6e4);
}
const wn = (t) => (t || "Отчёт о конфликтах").replace(/[<>:"/\\|?*\u0000-\u001f]/g, "_").replace(/[. ]+$/g, "").slice(0, 100) || "Отчёт о конфликтах", vn = (t) => {
  const e = t.indexOf(","), n = atob(t.slice(e + 1)), s = new Uint8Array(n.length);
  for (let a = 0; a < n.length; a++) s[a] = n.charCodeAt(a);
  return s;
}, Mn = {
  new: "Новый",
  active: "Активн.",
  reviewed: "Проверен",
  approved: "Утвержден",
  resolved: "Исправлен",
  excluded: "Исключен"
}, Rt = (t, ...e) => {
  const n = (i) => i.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ""), s = new Set(e.map(n));
  return Object.entries(t.properties || {}).find(([i]) => s.has(n(i)))?.[1] || "";
}, kn = (t, e) => t.type === "duplicates" || e.kind === "touch" ? "0.000" : e.penetrationMm === void 0 || e.depth === "unmeasurable" || e.depth === "tolerance" ? "" : (-e.penetrationMm / 1e3).toFixed(3), In = (t, e) => t.type === "duplicates" ? "Дублирование" : e.kind === "touch" ? "Касание" : e.axialPenetrationMm !== void 0 ? "По пересечению · продольный заход" : "По пересечению", Ie = (t) => [
  `ID объекта: ${t.id}`,
  Rt(t, "Слой", "Layer"),
  t.model,
  Rt(t, "Объект Id", "Object Id", "Id") || t.id,
  Rt(t, "IfcName", "ifc.name") || t.name,
  t.guid,
  Rt(t, "Категория", "Category"),
  Rt(t, "Семейство", "Family"),
  Rt(t, "Объект Тип", "Тип", "Type"),
  Rt(t, "IfcClass", "ifc.class", "Класс IFC")
];
function Sn(t, e) {
  const n = wn(t.name), s = `${n}_files`, a = [], i = /* @__PURE__ */ new Map();
  for (let k = 0; k < e.length; k++) {
    const q = e[k].image;
    if (!Ne(q)) continue;
    const E = q.startsWith("data:image/png") ? "png" : "jpg", z = `cd${String(k + 1).padStart(6, "0")}.${E}`;
    i.set(e[k].id, z), a.push({ name: `${s}/${z}`, data: vn(q) });
  }
  const o = ["Изображение", "Наименование конфликта", "Статус", "Расстояние", "Расположение сетки", "Описание:", "Дата обнаружения", "Точка конфликта", "Назначение", "Комментарий", "Толщина перекрытия, мм", "Заход вдоль оси, мм", "Длина контакта, мм"], r = ["Идентификатор элемента", "Слой", "Элемент Файл источника", "Объект Id", "Объект IfcName", "Объект IfcGUID", "Объект Категория", "Объект Семейство", "Объект Тип", "Объект IfcClass"], d = o.map((k) => `<td class="generalHeader">${it(k)}</td>`).join("") + r.map((k) => `<td class="item1Header">${it(k)}</td>`).join("") + r.map((k) => `<td class="item2Header">${it(k)}</td>`).join(""), f = e.map((k, q) => {
    const E = i.get(k.id), z = E ? `${encodeURIComponent(s)}/${E}` : "", S = [
      E ? `<a target="_blank" href="${z}"><img border="0" width="160" src="${z}" alt="Снимок конфликта ${q + 1}"></a>` : "Снимок отсутствует",
      `Конфликт${q + 1}`,
      Mn[k.state],
      kn(t, k),
      "",
      In(t, k),
      k.firstSeen || t.lastRun || "",
      `X:${k.point[0].toFixed(4)}, Y:${k.point[1].toFixed(4)}, Z:${k.point[2].toFixed(4)}`,
      k.assignee,
      k.note,
      k.overlapThicknessMm === void 0 ? "" : Mt(k.overlapThicknessMm),
      k.axialPenetrationMm === void 0 ? "" : Mt(k.axialPenetrationMm),
      k.contactLengthMm === void 0 ? "" : `≈ ${Mt(k.contactLengthMm)}`
    ];
    return `<tr class="contentRow" data-check-id="${it(t.id)}" data-clash-id="${it(k.id)}">${S.map((P, m) => `<td class="contentCell">${m ? it(P) : P}</td>`).join("")}${Ie(k.a).map((P) => `<td class="item1Content">${it(P)}</td>`).join("")}${Ie(k.b).map((P) => `<td class="item2Content">${it(P)}</td>`).join("")}</tr>`;
  }).join(""), c = `<!doctype html><html><head><meta charset="utf-8"><title>Отчет о конфликтах</title><style>body,table{font-family:Calibri,Tahoma,Verdana,Arial,sans-serif}table{border-collapse:collapse}.titleTable{margin-bottom:16px}.headerCell{font-size:18pt;font-weight:bold}.testSummaryTable{border:3px solid #222;background:#eee;margin-bottom:16px}.testName{font-size:16pt;font-weight:bold;padding:12px}.mainTable td{border:1px solid #999;padding:6px;vertical-align:middle;min-width:90px}.headerRow{font-weight:bold}.generalHeader{background:#eee}.item1Header{background:#9cf}.item2Header{background:#fcc}.item1Content{background:#def}.item2Content{background:#fee}.contentRow{height:100px}</style></head><body><table class="titleTable"><tr class="headerRow"><td class="headerCell">Отчет о конфликтах</td></tr></table><table class="testSummaryTable"><tr class="headerRow"><td class="testName">${it(t.name)}</td></tr></table><table class="mainTable"><tr class="headerRow"><td colspan="${o.length}" class="generalHeader"></td><td colspan="${r.length}" class="item1Header">Элемент 1</td><td colspan="${r.length}" class="item2Header">Элемент 2</td></tr><tr class="headerRow">${d}</tr>${f}</table></body></html>`, u = `${n}.html`, h = jn(
    t,
    e,
    (k) => {
      const q = i.get(k.id);
      return q ? `${s}/${q}` : "";
    },
    {}
  ), x = {
    format: "nashepo.clash-package",
    version: 1,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    producer: {
      name: "nashepo.collisionfinder360",
      version: Ce
    },
    check: {
      id: t.id,
      name: t.name,
      type: t.type,
      status: t.status,
      lastRun: t.lastRun || "",
      models: t.modelsAtRun || []
    },
    files: {
      report: u,
      review: "review.json",
      images: s
    }
  };
  a.unshift(
    { name: u, data: ie(c) },
    { name: "review.json", data: ie(JSON.stringify(h, null, 2)) },
    { name: "manifest.json", data: ie(JSON.stringify(x, null, 2)) }
  );
  const b = yn(a), A = b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength);
  return {
    archiveName: `${n}.zip`,
    htmlName: u,
    imageCount: i.size,
    blob: new Blob([A], { type: "application/zip" })
  };
}
const Re = {
  unmeasurable: "не определена",
  tolerance: "требует уточнения",
  approximate: "приблизительная оценка"
}, Mt = (t = 0) => t > 0 && t < 0.1 ? String(Number(t.toPrecision(2))) : t.toFixed(1), de = (t, e) => e === "duplicates" ? "—" : t.kind === "touch" ? "касание" : t.depth === "approximate" ? `≈ ${Mt(t.penetrationMm)}` : t.depth ? Re[t.depth] : Mt(t.penetrationMm);
function jn(t, e, n, s) {
  return {
    version: 1,
    id: t.id,
    name: t.name,
    images: s,
    warnings: t.warnings,
    tests: [
      {
        id: t.id,
        name: t.name,
        clashes: e.map((a, i) => ({
          id: a.id,
          name: `Конфликт ${i + 1}`,
          distance: t.type === "duplicates" ? "" : a.depth || a.kind === "touch" ? de(a, t.type) : `${Mt(a.penetrationMm)} мм`,
          date: t.lastRun || "",
          description: t.type === "duplicates" ? "Дублирование" : a.axialPenetrationMm !== void 0 ? "По пересечению · продольный заход" : "По пересечению",
          status: Ht[a.state],
          group: a.assignee,
          note: a.note,
          point: a.point,
          image: n(a),
          enabled: a.state !== "resolved",
          reviewed: a.state === "resolved" || a.state === "reviewed" || a.state === "approved",
          excluded: a.state === "excluded",
          elements: [a.a, a.b].map((o) => ({
            guid: o.guid,
            id: o.id,
            source: o.model,
            name: o.name,
            properties: o.properties
          })),
          properties: {
            Проверка: t.name,
            Вид: a.kind,
            "Глубина для отбора, мм": de(a, t.type),
            ...a.contactLengthMm !== void 0 ? { "Длина контакта, мм": "≈ " + Mt(a.contactLengthMm) } : {},
            ...a.axialPenetrationMm !== void 0 ? {
              "Толщина перекрытия, мм": a.overlapThicknessMm === void 0 ? "—" : Mt(a.overlapThicknessMm),
              "Заход вдоль оси, мм": Mt(a.axialPenetrationMm)
            } : {}
          }
        }))
      }
    ]
  };
}
const An = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAydpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAzIDc5Ljk2OTBhODdmYywgMjAyNS8wMy8wNi0yMDo1MDoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDZFQkU2NEQ4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDZFQkU2NEM4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI2LjExIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRENDVBNjQzODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRENDVBNjQ0ODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+pHX+ogAAD+lJREFUeNrsnXtwVPUVx2/CZvMgQEhCSAwJJDzDqwgodCq08hAr7wpSo1M6o/5Rq6NUcdqp1XamdjqOY6mvWhWnttZpRRtbaRGpMMKMZlB8gaFaQoQQSEhIQt7hkfTzhY1ulnt37929mw1T7sxls3vv/f3O7/zO43vO7/wucd3d3calI/zDo3927txpnDx5MqaEpKenpyUlJWUlJCQM6+rqSm1vb/fyGRcfH9+dkpLSGRcX13Lq1Knajo6Omvr6+ia+x4zWtLQ0Y86cOee/SAKLiopiyjwYlz5ixIhyPk8PGDBAKnHB6fF4unU9Ly+vDCanxpLeqVOnnuObznj9kJycHFMGwpRrjh8/Xoh0ec6ePWt6z5kzZwxdr62tLcrPz786lvT68ys+1jYEaTJQx+tRT1v3w0QDabweSe0XNjDmDBwyZEh6U1PTPCfPtLS0LOK5QZcYyDF48OAFjY2N6U6eaWhoyIaBc//vGSg1RIXXSC2dHG1tbYbX610dS08cUwYmJiYa2dnZWRMmTFiO9C0Ipw3UfgnoYfHw4cMzYWZscWAEeChj2LBha8CQm+vq6g6D26xnKj5eWC+dZ67l71VI0dxDhw5lYM/C6vvYsWMZzc3Nm4cOHVo7atSot/Hem6DjzRMnTjQGCw4k9RkZGYWYgGtrampeZCKaIuKgOps+fbrj55AgwYmPkabunJyceqThEaQhT4wKJPiyyy4bx/VHgStVQABTnBfpCdjuhp7D9PMw9BQGemnRBc0FXP8tdDaKbhj/Hn+Pdjr2WbNmfYkDw2IgjJgDMdX+A1DEwG8nUEsNYJTUSp98fzIrK6tF16PBuMBT/cCUk/T7Gz5HiI7c3NwxfN8gxgXSweRWcv3KPmOgQG9mZmaz1QAUScDIhvHjx/8Zgmsx9GExAjXrLigo6Ebrw2YkdBwdN26c6GgKNoGYoXoioblRZyAqsoDOWqMlOVJDbKQY10Zf3VJ3feo7Nuvc92hJsqQWJn7DKQNtOxHEfCZw4xVCqRS3PNigQYMEpCv5/BBJfa+zs3MfElyB1D1RWlp6le45fPiwMXv27D2o4p04ikI+p0D4FTiQaXjw3HCdUOCBQxmMxJZgdubhoPa56kRQ2REw8LAbMy3jjRmoxiY9VVhYuABmDRKs6TnGjBlTTNKg1zP6zu83+sMgVHwwTmAhpuIZJKcWxroiibT1OTRluabCqampKajQO5ESBmCWOn6GF7wLdckyi2WZpALOBrPn9TsGv8AMliA52UzIj5iYA+onUloZ778xJ4muMBD1SoGwzyIhiIE3MMCfgNks01AQrLTa1mDt6LruC5JTHEI/D8ppRELvyJEjPxo4cKDXNScyevTomwPVyq668uxmGDg2VNg1ceLEO0JhRF2HiT8M1o76ob8izMO2cNRajoxnV7rqhZFCL7OyzwkhOIcuIMRPmUk70GgCxrvFTrvc18z940O1iekZgH38JbQ7Vd/3oHmA6zAGSbrJrhTidFox8KsCo5IgA93pZJCo6ds8F28nWQFDbka1OxxI34qo4EBmMgGmfBqKCHCiJGS+HQQgdUN175OqOzUNPLfeTjZG9+C8FsPEdhvS9z7SFx81II0UrglmpyCykxn8tl0IhVmYisFvDxP4tsOYqXb7gjkrMStnrNqDcWe5Z4lTIO0onQWQbfAt+lxwyNYRRfzg4MGDW2wmUhOQpGcBsElhAt8kJvNZtWPn/i+++KIE03K31fqPxqXxRS0bIxVmhj62in9xGE9pfcOu6k6aNOnBSMGvnqedB+wmVpVYgM4XrMJBNOxd7GB0VJhI4HtWtgpV2oskpNhcwjRwGt/CVp5yI3JQO7T3TbVr5wCLDiHaOGDlRGDid1yPhQVjWFa8j1jVbFFI4n8Xeck2q0Qqz3tQ78kQOI+k6yLWNOYQUycYLhxqBwncgj3dRV9bSdRuJ0beS6x81izBS98nsdXr8OL/CIyjtVQAU36MOXqttbW1yzUVxjEs1eyYzRoq8XJgSl2xKjnATKR2Cd7ycWZ1H/any40wK1S4qH7UH/0+pv5Fh3+s3UPf2LFj/2nWhnAjaONq1yRQdo2ZvUWzY5LSbyeNvl5runQcx/ciZk+dL2J2Z2PohyEJfbY+cfr0aYOlhTjOSXydBE13oiG12O5Svm9FqnYgnWWiCfru4fpC/u6lCbpGaH0ra887tJgf8ZoI4p6Lei40U01sz9sQlE9m5A6YOB9mToFpHruL5NE+xAzOYfy5FC1ZygSfAf7sxQa+hfS8zue7e/bsmRuo6jD3OmxlJuahLmIVRtRvCfSWwoL8LuDZKpEPN+scq1P04vTOJWo1jkBs60uffTdiFZaU4SCuC5QoPJ9x5MgRgwqqFOMiPDRwLcZxJgsXajxK3Bp+5SOYLgUEfwlrXRj9V6NDMcSrUdG5JoDa6C+1KYYLi/tmBU2Yo4WMfwVOaYj4EdQGqgHdhN6nq2QCyVuB07imoqIiB8N7wUMwtWvmzJmf7Nq1a1qwteCLgXkzZswo271798TAa0ePHs2BiSX4gCqY+CYOpYTvu6hNbOzFcH1ZsmTJdFz/CyQBjuFF7YDXJmZnFHZix8Vk+wJP6H9r8uTJExTDh7oX3KhEaxWQ7vnly5dP7RWJFBcXb3TSMThpr5A/uTmCkPyai5F5ohu4kqcYnr/LnTy7du3ax3slE3ASmU5EH3Uvl+qyenUYULrWt3Z70RyiV3RXV1dX+szXQSfPo85ZvZwIbj3DSQPcXynQqoPsyxuk0H9mNxaN9SE6off+8vLyN3rANzb/iMPxD+vFQBxFooOHJbp1PQU8mkGY+BA29LX+UG4WCpZBZwn0/qrH+Yl+6K5z0g78SurFQJIEHidE0GFbYBBOjfMtGNj/9mcGApw/h85bTcLSNieT788v1+oDCXvqmc1iDHN7f2Se6BJ9otP1AksM6hm7D0j0Ud9ki6zv+xjoO1Sy0Z8O0SO6oG+PxS0pTjYc+fMr3peO73QSBnFkWon8gQMHngcvPR0MvfflITqg53eiywpMczhyovCroxcDYYpTsc6zYpDi5srKynUY69L+wECl6UWPVYZI40CrRjiMpet6MZDA+YRDHDQaMba0uoQ8HaSEbqKepTqWzKP/Y6IDejqDwJoEoEyBQ6mu/ZKBsmm45d8zU6/QYb2dXUtkKwqxKzlG8FWzg2SxYyqFqFopdFSEsI/5jGdkqLZUk0P+sA6k8VeyOF+aA49gCcXepaRzVpMYzeYmbXpZAVPnEThnmG1BIEk5kFT5FMXcweAOkxNTdI3XTQpVHYEETqMwPcFqSxfOp5Y4eDtjKYFxO5iQ4/zWOxsjQypEXn3+eIkE6ktkZoYTbC/C7W/goaGBuI9n5uNItlp5LxHOtaQY5/2SguE70ci5kLzmBdeI88WodYx/G8C7tify8nM81jhQBhem1ezfv/+PMHKnmSfGDi7TaluIiCUxxgxMDCaB0J+EMCwyzLegbSsrK3sJ4N2LeY422ijMQXS3mC2Ys3Aznhm6KtjsMgBvjBnoDSaBmKz5mKlRZhuBEJAtdrBhyEgED/Yvrb4ZF274k/243aoaIU4LD/1YArUUize93Wy1Ea3T/pttrmz1YiG6kgWY7Rbh2zKytWMtJHBAP5FA07UHnODXUM9rLFT7DSTzuCsM9AHQ58xKa/FeiXT2oJkUQrinPzCQifSYSR8e9hcsTXhM6hXlUJ+zsyZsO5mApG0hjf+Z2TVmsRjoM8dEAj3Yz4RYMpD+TRnI0oX2yS03e4Zxfsh4t7u6WxN70MmsPRJYImGcX2CKg9DHkMTEfiiBqpvxBFRTpCJhG8z2GAr3wfCHwcBnXd/uyoz9CWy03+xaVVXVNLK8v/aPjyEkAcZ6YiyBCaLD8CtTwfY9ypq2aY0149sDDt4Ulf3CkkJm817fqt0FL4SAiXejGsV+EpggCQhn4LJRlGC0UjXwAZ9t4e4Hpn+P6OjBpdB3G8y7zWwpFkfJz13rnUif4/3CEJFkhY0Ea1Dx51ixO0bebQcz73Uigb79xN1AiFIkWXt//654GqNOmD56GZO0GkQwG+8YZ3ct2qfCXl858XU8+6QZbPHdq3fUJEatQpWBeKwqVP1PVKQBqblCZWUA1dOh7tfmQhhUxjrzQwxyurygRf9iwnTdR0Bfps2HNnZ8noaWDLLRc4LtMO05abcUtBEXlQpVBnmD3c3SSNIJOlnvA+BmBd1apD4CM5QFmsd9Xoc75b08N1/Pqx2rYgCkuY2NivfzedIO3WoHIVnsOgMlfajmRw4Xrs8VOxp+WxNwNI3sNHqFoszVwIW0SOtr9LzaUXtqV+37lyHTvzY2Ot1o806oOulwtnrd4HSrvl7VxHPa/dh9+eWXf8zmmJtQp5xovSDC53hy6Odm+lMN4Ln+RYcTuu1IoaNtDkhfMrjpAbOUT4istUFx0jnnAlZMIzHhxcNVR6v4Uu3iIGr14jKcRZr6Vf92IwrjqzVfwZ+fI4Vet7wwzim+wwgPh4l5OvNRrefBWeuQjMcJATeRzWl049V78t6oagZ27gaSv3eCAIoinSTalLTEueaF8agFDP6oG0U9vm38hygPfgQH8HUcQqLd/SX+6oqj0j7muXqZBO1VhbOb1DDfl1yB9851dZsD8W4FkrNKdXJIzsBIZlemgOWDfPDZPYDXe4AjBzD+eyBmN5LzKav+lZz1fO9Ags8qq8OZjASnw7g8PrWUcAUqOhNVLVBI5tZLJBEUacX1aEiV60AaBP8OErOGDv5GB143ymz10kfOMXwdg7Ffo8IfGNSFd21BKmU2ZMA82LEkbNMggWjtVXFq1+wcePM2+l/F5H4QtRfv+HY+Lg2281F5VL0nBmhRohmNZSE5/dcRDpbAnPZghfBoVhNwZ6ERxmtP4p0ymxl6Hc+8DMhQH8hcCG7Gtj2Jqs3gvpVI1Sy+/wEC+2zfg+gQw5jAZ5DkK1lUX4lkzdTLKSRlJgmEGuzyYu7bZvTlq5/oeBqz9h9tgYCZzQDZp/htTCA4loPAfk7h+tMY6Dqne4PtnnIi9FNDP0/QT1Fg5YS+Y2sncP1ZvftGu5owSZ/oFVZGX7/6yfiq0jObmb4XIsaGqoURY2F0Nip1K+cWBtMU6Xu0tP1M0Qftbeb8PhqQFSq6EZ1imujWy9PCGbdrDDQiqxLNo8D7Rql9OMyDCfU8vwqpz+3r6tiYM9BfGrBNr4XDQJ570c47GaLNwJi+wVJwhPNls6UCI0SdCuHlpv6wRyXm71DV+ithWKPDdFYN4eEOw7j0ElrFybUsSDliBjBqGwC86RIDjfPbDLAlr9qNh+UwyOy8avXC7pgw0Gwrf18ebNjZijc+EgoK6TrQqZxyvO2xpNe/5O8cxRs3bjT6cme5yVEHJpzBZzbAPAvpSiW3l+j/nxGA75qZ6OMQf4xYvCnGr67/KvK59N9hRHb8T4ABAPaAkPNeKkdCAAAAAElFTkSuQmCC", En = ":host{display:block;height:100%;color-scheme:dark;font:13px/1.4 Segoe UI,sans-serif;color:#dbe5f0;container-type:size}*{box-sizing:border-box}[hidden]{display:none!important}main{height:100%;min-height:260px;background:#171d25;display:flex;flex-direction:column;overflow:hidden;-webkit-user-select:none;user-select:none}button,input,select,textarea{font:inherit;color:inherit;border:1px solid #425165;border-radius:6px;background:#253140;padding:7px 9px;min-width:0}button{cursor:pointer;white-space:nowrap}button:hover{background:#354459}button:disabled{opacity:.45;cursor:default}.primary{background:#b99a38;border-color:#d0ae46;color:#111820;font-weight:600}.primary:hover{background:#e0bd51}button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid #f2c94c;outline-offset:1px}input,select,textarea{background:#111a24}input,textarea,td,dd{-webkit-user-select:text;user-select:text}input[type=checkbox]{accent-color:#e6c354;width:16px;height:16px}header{display:flex;gap:7px;align-items:center;padding:8px 12px;border-bottom:1px solid #354459;flex-shrink:0;overflow-x:auto}.brand{display:flex;gap:7px;align-items:center;margin-right:8px}.brand img{width:32px;height:32px;object-fit:contain}.brand b{font-size:17px}.brand small{font-size:10px;color:#a6b5c7}#dirty{margin-left:auto;font-size:11px;color:#cabb81;white-space:nowrap}.notice{background:#1c2735;padding:5px 12px;font-size:12px;min-height:27px;max-height:70px;overflow:auto;color:#a7bbd1}.notice.error{color:#ffaaa1;background:#412725}.workspace{display:grid;grid-template-columns:230px minmax(0,1fr);flex:1;min-height:0}aside{padding:10px;display:flex;flex-direction:column;gap:9px;border-right:1px solid #354459;min-height:0}#checks{overflow:auto;flex:1;min-height:0}.check-item{display:flex;flex-direction:column;gap:5px;width:100%;margin-bottom:5px;text-align:left;white-space:normal}.check-item small{color:#a8b7ca}.check-item.active,.tabs .active{border-color:#c7ab56;background:#403b2c;color:#ffe399}.main{display:flex;flex-direction:column;min-width:0;min-height:0}.test-toolbar{display:flex;gap:7px;padding:8px 12px;align-items:center}.test-toolbar input{flex:1;font-weight:600}.tabs{display:flex;gap:7px;border-bottom:1px solid #354459;padding:0 12px 8px}.tabs button{min-width:105px}#content{flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column}.empty{padding:28px;color:#a4b4c9;text-align:center;margin:auto}h2,h3,p{margin:0 0 10px}h2{font-size:20px}h3{font-size:15px}label{display:flex;flex-direction:column;gap:5px;font-size:12px;color:#b8c6d7}.check{flex-direction:row;align-items:center;gap:6px}small{font-size:11px;color:#a8b7c9}.parameters{display:flex;gap:18px;align-items:end;padding:10px 12px}.parameters input{width:140px}.selection-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0 12px 12px}.selection{border:1px solid #39495e;border-radius:8px;padding:12px;background:#1b2633;min-width:0}.selection h3{display:flex;justify-content:space-between}.selection h3 span{color:#92c4b2;font-size:12px}.selection select[multiple]{width:100%;min-height:70px}.selection-tools{display:flex;gap:5px;flex-wrap:wrap;margin:8px 0}.selection-tools button{font-size:11px;padding:5px 7px}.selection>label{margin-bottom:8px}.condition{display:grid;grid-template-columns:minmax(80px,1fr) 100px minmax(70px,1fr) 29px;gap:5px;margin:6px 0}.condition button{padding:3px}.rules,.report{padding:18px;max-width:850px}.rules>label{margin:14px 0}.rules>p,.report>p{color:#a9b8cb}.report>button{margin:12px 8px 14px 0}.result-tools{display:flex;gap:7px;flex-wrap:wrap;padding:8px 12px}.result-tools input{flex:1;min-width:180px}.result-area{display:grid;grid-template-columns:minmax(0,1fr) 300px;flex:1;min-height:0}.table-area{display:flex;flex-direction:column;min-width:0;min-height:0}.scroll{overflow:auto;flex:1;min-height:0}table{border-collapse:separate;border-spacing:0;width:max-content;min-width:100%}th{position:sticky;top:0;background:#2a3748;z-index:1;text-align:left;max-width:240px;white-space:normal}th,td{padding:8px;border-bottom:1px solid #344154;vertical-align:top}td{max-width:320px;min-width:90px;overflow-wrap:anywhere;-webkit-user-select:text;user-select:text}td:first-child{min-width:36px}tr.active td{background:#453e29;color:#fff0b5}tr:hover td{background:#2c3847}.pager{display:flex;gap:10px;align-items:center;justify-content:center;padding:5px;border-top:1px solid #39495e;font-size:11px}.pager button{padding:2px 8px}.detail{border-left:1px solid #354459;padding:10px;overflow:auto}.detail h3{overflow-wrap:anywhere}.detail>label{margin:10px 0}.detail p{font:11px/1.5 Consolas,monospace}.detail details{border-top:1px solid #354459;padding:8px 0}summary{cursor:pointer}dl{font-size:11px;display:grid;grid-template-columns:1fr 1fr;gap:7px}dt,dd{overflow-wrap:anywhere;margin:0}dt{color:#9baec4}footer{border-top:1px solid #354459;padding:4px 12px;display:flex;justify-content:space-between;color:#91a4bb;font-size:11px}dialog{border:1px solid #53647c;border-radius:12px;background:#202c3a;color:#dbe5f0;width:min(700px,92vw);max-height:85vh;padding:20px;box-shadow:0 15px 60px #000a}dialog::backdrop{background:#000a}dialog p{margin:12px 0}dialog a{color:#f2c94c;margin-right:12px}.dialog-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:16px}@container (max-width:950px){.workspace{grid-template-columns:185px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 240px}.selection-grid{grid-template-columns:1fr}.parameters,.test-toolbar{flex-wrap:wrap}.test-toolbar input{flex-basis:100%}}@container (max-height:400px){header{padding:5px 10px}.test-toolbar{padding:5px 10px}.tabs{padding-bottom:5px}.brand img{width:25px;height:25px}footer{display:none}}:host{font-size:12px}.brand img{background:#e1e7ef;border-radius:5px;padding:3px}.selection-tools button{font-size:12px}label{font-size:13px}.choose-layout{display:grid;grid-template-columns:220px minmax(0,1fr);min-height:0;flex:1;overflow:auto}.choose-layout .parameters{display:flex;flex-direction:column;align-items:stretch;gap:15px;border-right:1px solid #354459;justify-content:flex-start}.choose-layout .parameters input{width:100%}.choose-layout .parameters input[type=checkbox]{width:16px}.choose-layout .selection-grid{padding:10px 12px;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start;min-width:0}.selection select[multiple]{height:180px;resize:vertical}.selection-mode{font-size:12px;color:#b6c4d5}.preset-row{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:9px}.preset-row select{flex:1 1 160px}.preset-row button{padding:5px 7px;font-size:12px}.model-list{height:150px;overflow:auto;border:1px solid #425165;border-radius:6px;background:#111a24;padding:5px;margin-bottom:5px}.model-list label{display:flex;flex-direction:row;align-items:center;gap:7px;padding:4px 5px;color:#dbe5f0;overflow-wrap:anywhere}.model-list label:hover{background:#253140}.model-list .model-all{position:sticky;top:-5px;z-index:1;background:#1f2b39;border-bottom:1px solid #425165;font-weight:600}.legend{display:flex;gap:12px;flex-wrap:wrap;font-family:inherit!important}.part-a{color:#ff6161}.part-b{color:#65baff}.preview{display:block;width:100%;padding:5px;margin:8px 0}.preview img{display:block;width:100%;max-height:180px;object-fit:contain}.image-dialog{width:94vw;max-width:1500px}.image-dialog img{display:block;max-width:100%;max-height:75vh;margin:10px auto}#help-dialog{width:min(1000px,94vw);line-height:1.6}#help-dialog details{padding:12px 0;border-bottom:1px solid #425165}#help-dialog summary{font-size:16px;font-weight:600;color:#f0d27a}#help-dialog li{margin:8px 0}@container (max-width:1100px){.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .selection-grid{grid-template-columns:1fr}.condition{grid-template-columns:minmax(60px,1fr) 100px minmax(60px,1fr) 29px}}@container (max-width:700px){.choose-layout{display:block}.choose-layout .parameters{border-right:0;border-bottom:1px solid #354459}.workspace{grid-template-columns:160px minmax(0,1fr)}}button,input,select,textarea{padding:5px 7px;border-radius:5px}button{min-height:27px}input[type=checkbox]{width:14px;height:14px}.commandbar{position:relative;display:flex;gap:8px;min-height:45px;padding:5px 8px;overflow:visible;background:#131b25}.brand{flex:0 0 auto;margin-right:0;gap:5px}.brand img{width:28px;height:28px}.brand b{font-size:14px}.check-heading{display:grid;grid-template-rows:25px 12px;flex:0 1 230px;min-width:145px}.check-heading input{height:25px;border:0;background:transparent;padding:2px 5px;font-weight:600}.check-heading small{padding:0 5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:9px}.tabs{align-self:stretch;align-items:center;flex:0 0 auto;gap:3px;padding:0;border:0}.tabs button{flex:0 0 auto;min-width:0;padding:5px 9px;background:transparent;border-color:transparent}.tabs .active{background:#3e3828;border-color:#b99a38}.header-actions{display:flex;align-items:center;gap:4px;margin-left:auto}#dirty{margin-left:0;width:0;height:0;overflow:visible;font-size:0}#dirty:not(:empty){width:7px;height:7px;border-radius:50%;background:#e5bd43;box-shadow:0 0 0 2px #e5bd4328}.more-menu{position:relative;z-index:20}.more-menu summary{display:grid;place-items:center;width:29px;height:29px;border:1px solid #425165;border-radius:5px;background:#253140;cursor:pointer;list-style:none;font-size:18px}.more-menu summary::-webkit-details-marker{display:none}.more-popover{position:absolute;right:0;top:calc(100% + 5px);display:grid;width:190px;gap:3px;padding:6px;border:1px solid #506176;border-radius:7px;background:#192431;box-shadow:0 12px 35px #000a}.more-popover button{text-align:left}.notice{min-height:23px;max-height:45px;padding:3px 9px;font-size:10px}.run-progress{display:grid;grid-template-columns:minmax(150px,auto) minmax(120px,1fr) auto;align-items:center;gap:8px;min-height:24px;padding:3px 9px;border-bottom:1px solid #425165;background:#202a20;color:#d9e7d2;font-size:10px}.run-bar{width:100%;height:7px;overflow:hidden;border-radius:2px;background:#101810}.run-bar i{display:block;width:0;height:100%;background:#e3bc43}#run-phase,#run-value{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#run-value{text-align:right;color:#b9c9b3}.workspace{grid-template-columns:190px minmax(0,1fr)}aside{gap:6px;padding:7px;background:#141c26}.aside-title{font-weight:600;font-size:12px}.aside-actions{display:grid;gap:5px}.check-item{gap:2px;margin-bottom:3px;padding:6px 7px}.check-item small{font-size:9px}.main{background:#171d25}#content{overflow:hidden}.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .parameters{gap:9px;padding:8px}.choose-layout .selection-grid{gap:8px;padding:8px}.selection{padding:8px}.selection h3,h3{font-size:13px;margin-bottom:6px}label{gap:3px;font-size:11px}small,.selection-tools button,.preset-row button{font-size:10px}.model-list{height:125px}.model-list label{padding:2px 4px}.selection-tools{gap:4px;margin:5px 0}.selection-tools button,.preset-row button{padding:3px 5px;min-height:23px}.result-tools{display:flex;align-items:center;justify-content:space-between;gap:6px;flex-wrap:nowrap;min-height:38px;padding:5px 7px;border-bottom:1px solid #354459;background:#151f2a}.result-filters,.bulk-tools{display:flex;align-items:center;gap:5px;min-width:0}.result-filters{flex:1}.result-filters input[type=search]{flex:1 1 190px;min-width:120px}#result-depth{flex:0 1 125px;min-width:92px}#result-count,#selection-count{color:#9fb0c4;white-space:nowrap;font-size:10px}.bulk-tools select{max-width:125px}.result-area{grid-template-columns:minmax(0,1fr) 310px}th,td{padding:5px 6px;font-size:11px;line-height:1.25}th{max-width:190px}td{max-width:260px;min-width:76px}.pager{justify-content:flex-end;min-height:29px;padding:3px 7px}.pager #selection-count{margin-right:auto}.detail{display:flex;flex-direction:column;min-width:0;padding:0;overflow:hidden;background:#141e29}.detail-head{display:flex;align-items:center;justify-content:space-between;gap:6px;min-height:47px;padding:7px 8px 4px}.detail-head>div:first-child{min-width:0}.detail-head small{color:#8093aa;letter-spacing:.08em}.detail-head h3{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin:0}.detail-nav{display:flex;gap:3px}.detail-nav button{min-width:27px;padding:2px 7px;font-size:17px}.clash-summary{display:flex;gap:5px;padding:0 8px 5px;color:#adbdcf;font-size:9px}.clash-summary span{padding-right:5px;border-right:1px solid #405064}.clash-summary span:last-child{border:0}.detail .legend{margin:0;padding:0 8px 5px;font-size:10px}.preview-slot{height:clamp(92px,18cqh,145px);flex:0 0 auto;margin:0 7px 6px;overflow:hidden;border:1px solid #37475b;border-radius:6px;background:#0e151d}.preview{position:relative;width:100%;height:100%;margin:0;padding:0;border:0;background:transparent}.preview img{width:100%;height:100%;max-height:none;object-fit:contain}.preview span{position:absolute;right:5px;bottom:5px;padding:3px 6px;border-radius:4px;background:#101923db;font-size:9px}.preview-empty,.detail-empty{height:100%;display:grid;place-content:center;justify-items:center;gap:4px;color:#788ba1}.preview-empty>span,.detail-empty>span{font-size:24px}.detail-actions{display:grid;grid-template-columns:1fr 1fr;gap:5px;padding:0 7px 7px}.detail-scroll{flex:1;min-height:0;overflow:auto;padding:7px 8px 12px;border-top:1px solid #354459}.detail-scroll>label{margin:7px 0}.detail p{font:inherit}.coordinates{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;font:9px/1.3 Consolas,monospace;color:#91a3b7}.coordinates span{overflow:hidden;text-overflow:ellipsis}.detail details{padding:6px 0}.detail dl{font-size:10px}.detail-empty{padding:20px;text-align:center}footer{padding:2px 8px;font-size:9px}@container (max-width:1050px){.workspace{grid-template-columns:165px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 270px}.check-heading{flex-basis:185px}.tabs button{padding-inline:6px}#dirty{display:none}}@container (max-width:820px){.brand b,.brand small,#result-count{display:none}.check-heading{flex-basis:155px}.result-tools{overflow-x:auto}.result-area{grid-template-columns:minmax(0,1fr) 245px}}@container (max-height:410px){.notice,footer{display:none}.preview-slot{height:90px}}.depth-breakdown{display:grid;grid-template-columns:1fr auto;gap:4px 8px;margin-bottom:9px;font:inherit}.depth-breakdown small{grid-column:1/-1;color:#adbdcf;font:inherit}", Tt = /* @__PURE__ */ new WeakMap(), Te = "nashepo.collisionfinder360.project.", oe = () => ({
  format: "nashepo.checks",
  version: 1,
  checks: [],
  sets: []
}), Se = (t) => {
  if (!(!t || typeof sessionStorage > "u"))
    try {
      const e = sessionStorage.getItem(Te + t);
      return e ? qe(e) : void 0;
    } catch {
      return;
    }
}, je = (t, e) => {
  if (!(!t || typeof sessionStorage > "u"))
    try {
      sessionStorage.setItem(
        Te + t,
        JSON.stringify(e, (n, s) => n === "image" ? void 0 : s)
      );
    } catch {
    }
};
function $n(t, e) {
  const n = t.shadowRoot || t.attachShadow({ mode: "open" }), s = We(t);
  let a = e.projectToken(), i = e.projectId(), o = a && (Tt.get(a) || Se(i)) || oe();
  a && Tt.set(a, o);
  let r, d = o.checks[0]?.id || "", f = "select", c = "", u = 0, h = !1, x = !1, b, A = !0, k = !1;
  const q = /* @__PURE__ */ new Set();
  let E, z, S = 0;
  const P = () => o.checks.find((l) => l.id === d), m = (l) => n.querySelector("#" + l);
  n.innerHTML = `<style>${En}</style><main><header class="commandbar"><div class="brand"><img src="${An}" alt=""><b>НашеПО</b><small>${Ce}</small></div><div class="check-heading"><input id="name" aria-label="Имя проверки" placeholder="Выберите проверку"><small id="check-summary">Проверка не выбрана</small></div><div id="tabs" class="tabs">${[
    ["select", "Выбор"],
    ["results", "Результаты"],
    ["rules", "Правила"],
    ["report", "Отчёт"]
  ].map(([l, p]) => `<button data-tab="${l}">${p}</button>`).join(
    ""
  )}</div><div class="header-actions"><button id="scan" title="Перечитать список и геометрию выбранных моделей">↻ Модели</button><button id="run" class="primary">▶ Запустить</button><button id="cancel" hidden>Остановить</button><details class="more-menu"><summary title="Другие команды">⋮</summary><div class="more-popover"><button id="open">Открыть проверки</button><button id="save">Сохранить проверки</button><button id="copy">Копировать проверку</button><button id="delete">Удалить проверку</button><button id="settings">Настройки</button><button id="help">Справка</button></div></details></div><span id="dirty"></span></header><div id="run-progress" class="run-progress" hidden><span id="run-phase">Подготовка</span><div id="run-bar" class="run-bar" role="progressbar"><i id="run-fill"></i></div><span id="run-value"></span></div><div class="notice" id="notice" role="status">Откройте IFC/SMDX в проекте и нажмите «Модели».</div><div class="workspace"><aside><div class="aside-title">Проверки</div><input id="test-search" type="search" placeholder="Поиск проверок"><div id="checks"></div><div class="aside-actions"><button id="all">Запустить все</button><button id="new" class="primary">＋ Новая проверка</button></div></aside><section class="main"><div id="content"></div></section></div><footer><span id="model-count">Модели не прочитаны</span><span>Расчёт выполняется на вашем компьютере</span></footer><input id="file" type="file" accept=".json" hidden><dialog id="settings-dialog"><h2>Настройки</h2><label>Дистанция камеры, м<input id="distance" type="number" value="15" min="0.5"></label><p class="links"><a href="https://nashepo.ru/" target="_blank" rel="noopener noreferrer">Сайт НашеПО</a><a href="https://t.me/RoburFan" target="_blank" rel="noopener noreferrer">Telegram</a></p><button data-close="settings-dialog">Закрыть</button></dialog><dialog id="help-dialog">${Ze}<button data-close="help-dialog">Закрыть</button></dialog><dialog id="set-dialog"><h2>Сохранить набор моделей</h2><label>Название<input id="set-name" maxlength="120"></label><div class="dialog-actions"><button id="set-cancel">Отмена</button><button id="set-confirm" class="primary">Сохранить</button></div></dialog></main>`;
  const B = document.createElement("button");
  B.id = "clear-project", B.textContent = "Очистить проект", m("save").after(B), n.querySelector(".more-popover").addEventListener(
    "click",
    () => n.querySelector(".more-menu").removeAttribute("open")
  );
  const D = (l, p = !1) => {
    m("notice").textContent = l, m("notice").classList.toggle("error", p);
  }, $ = (l, p, y, g) => {
    const j = m("run-progress"), L = m("run-bar"), I = m("run-fill");
    if (j.hidden = !1, m("notice").hidden = !0, m("run-phase").textContent = l, y && y > 0 && p !== void 0) {
      const O = Math.max(0, Math.min(100, p / y * 100));
      I.style.width = `${O}%`, L.setAttribute("aria-valuemin", "0"), L.setAttribute("aria-valuemax", "100"), L.setAttribute("aria-valuenow", String(Math.round(O))), m("run-value").textContent = `${Math.round(O)}% · ${p}/${y}` + (g === void 0 ? "" : ` · найдено ${g}`);
    } else
      I.style.width = "0", L.removeAttribute("aria-valuenow"), m("run-value").textContent = g === void 0 ? "" : `Найдено ${g}`;
    L.setAttribute("aria-valuetext", m("run-value").textContent || l);
  }, w = () => {
    m("run-progress").hidden = !0, m("notice").hidden = !1;
  }, v = async (l) => {
    try {
      await l();
    } catch (p) {
      D(p instanceof Error ? p.message : String(p), !0);
    }
  }, N = () => new Promise((l) => {
    const p = m("set-dialog"), y = m("set-name");
    let g = !1;
    const j = (L) => {
      g || (g = !0, p.close(), l(L));
    };
    y.value = "Новый набор", m("set-confirm").onclick = () => {
      const L = y.value.trim();
      L ? j(L) : y.focus();
    }, m("set-cancel").onclick = () => j(), p.oncancel = (L) => {
      L.preventDefault(), j();
    }, p.showModal(), y.focus(), y.select();
  }), C = () => {
    k = !0, m("dirty").textContent = "Есть несохранённые изменения", a && Tt.set(a, o), je(i, o);
  }, H = () => {
    const l = e.projectToken();
    return !l || l === a ? !1 : (!a && (o.checks.length || o.sets.length) ? Tt.set(l, o) : o = Tt.get(l) || Se(e.projectId()) || oe(), Tt.set(l, o), a = l, i = e.projectId(), r = void 0, d = o.checks[0]?.id || "", c = "", q.clear(), u = 0, k = !1, e.clear(), m("dirty").textContent = "", !0);
  }, R = () => {
    const l = P();
    l?.lastRun && (l.status = "stale"), C(), Q();
  }, M = () => [
    ...new Set(
      (r?.elements || []).flatMap((l) => Object.keys(l.properties))
    )
  ].sort(), U = (l, p) => l.map(
    (y) => `<option value="${it(y)}" ${y === p ? "selected" : ""}>${it(y)}</option>`
  ).join("");
  function Z() {
    const l = P(), p = m("result-search")?.value.toLowerCase() || "", y = m("result-state")?.value || "", g = Number(m("result-depth")?.value || 0);
    return (l?.results || []).filter(
      (j) => (!y || j.state === y) && (l?.type === "duplicates" || Oe(j, g, l?.precision ?? 0)) && (!p || JSON.stringify({ ...j, image: void 0 }).toLowerCase().includes(p))
    );
  }
  function Q() {
    const l = m("test-search").value.toLowerCase();
    m("checks").innerHTML = o.checks.filter((p) => p.name.toLowerCase().includes(l)).map(
      (p) => `<button class="check-item ${p.id === d ? "active" : ""}" data-check="${p.id}"><strong>${it(p.name)}</strong><small>${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[p.status]} · ${p.results.filter((y) => !["resolved", "excluded"].includes(y.state)).length} в работе / ${p.results.length}</small></button>`
    ).join("");
  }
  function st(l, p) {
    const y = r?.elements.filter(
      (G) => (P().includeHidden || !G.hidden) && Yt(G, l)
    ).length || 0, g = l.manualOnly ? rt(l) : l.modelsMode === "selected" ? l.models : (r?.models || []).map((G) => G.id), j = r && g.every((G) => r.indexedModelIds.includes(G)) ? `${y} элементов` : "число после запуска", L = r?.models || [], I = l.modelsMode !== "selected", O = o.sets.map(
      (G) => `<option value="${it(G.id)}" ${l.presetId === G.id ? "selected" : ""}>${it(G.name)}</option>`
    ).join("");
    return `<article class="selection" data-side="${p}"><h3>Выбор ${p.toUpperCase()} <span data-selection-count>${j}</span></h3>${l.manualOnly ? '<p class="selection-mode">Только элементы, выбранные вручную</p>' : ""}<div class="preset-row"><select class="preset"><option value="">Набор моделей…</option>${O}</select><button data-selection="load-set">Применить</button><button data-selection="save-set">Сохранить набор</button><button data-selection="delete-set" ${l.presetId ? "" : "disabled"}>Удалить</button></div><div class="model-list"><label class="model-all"><input type="checkbox" class="all-models" ${I ? "checked" : ""}> Все модели</label>${L.map((G) => `<label><input type="checkbox" class="model-check" value="${it(G.id)}" ${I || l.models.includes(G.id) ? "checked" : ""}> ${it(G.name)}</label>`).join("") || "<small>Нажмите «Модели».</small>"}</div><small>Отметьте файлы, которые должны участвовать в выборе ${p.toUpperCase()}.</small><div class="selection-tools"><button data-selection="show">Показать выбранные элементы</button><button data-selection="only">Только выделенные в 3D</button><button data-selection="include">＋ Добавить из 3D</button><button data-selection="exclude">− Исключить из 3D</button><button data-selection="reset">Сбросить ручной выбор</button></div><small>Добавлено вручную: ${l.include.length} · исключено: ${l.exclude.length}</small></article>`;
  }
  function J() {
    Q();
    const l = P();
    m("name").value = l?.name || "", m("check-summary").textContent = l ? `${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[l.status]} · ${l.results.filter((p) => !["resolved", "excluded"].includes(p.state)).length} в работе / ${l.results.length}` : "Проверка не выбрана";
    for (const p of ["name", "copy", "delete", "run"])
      m(p).disabled = !l || h;
    for (const p of n.querySelectorAll("[data-tab]"))
      p.classList.toggle("active", p.dataset.tab === f);
    if (!l) {
      m("content").innerHTML = '<div class="empty"><h2>Создайте первую проверку</h2><p>Обновите модели, затем выберите, какие элементы проверять друг с другом.</p></div>';
      return;
    }
    f === "select" && (m("content").innerHTML = `<div class="choose-layout"><div class="parameters"><h3>Параметры проверки</h3><label>Тип<select id="type"><option value="intersection" ${l.type === "intersection" ? "selected" : ""}>По пересечению</option><option value="duplicates" ${l.type === "duplicates" ? "selected" : ""}>Дублирование</option></select></label><label title="Запас при отборе и фильтрации; не обнуляет малые вхождения и не гарантирует погрешность оценки">Точность расчёта, мм<input id="precision" type="number" value="${l.precision}" min="0.001" max="100" step="0.1"></label><label title="Конфликты с меньшей оценкой глубины не попадут в результат">Минимальная глубина, мм<input id="min-penetration" type="number" value="${l.minPenetration}" min="0" max="100000" step="1" ${l.type === "duplicates" ? "disabled" : ""}></label><label class="check"><input id="touching" type="checkbox" ${l.touching ? "checked" : ""} ${l.type === "duplicates" ? "disabled" : ""}>Учитывать касания</label><small>Для отбора — большее из толщины перекрытия и захода вдоль оси профиля или трассы. Подробнее — в справке.</small><p class="legend"><span class="part-a">● Выбор А</span><span class="part-b">● Выбор Б</span></p></div><div class="selection-grid">${st(l.a, "a")}${st(l.b, "b")}</div></div><datalist id="property-fields">${U(M(), "")}</datalist>`), f === "rules" && (m("content").innerHTML = `<div class="rules"><h3>Исключение пар</h3><p>Элемент сам с собой не проверяется. Пара А/Б учитывается один раз.</p><label class="check"><input id="same-model" type="checkbox" ${l.ignoreSameModel ? "checked" : ""}>Не проверять элементы одной модели</label><label class="check"><input id="same-group" type="checkbox" ${l.ignoreSameGroup ? "checked" : ""}>Не проверять геометрию одного составного объекта</label><label>Не проверять пары с одинаковым значением свойства<input id="equal-property" list="property-fields" value="${it(l.equalProperty)}" placeholder="Без ограничения"></label><label class="check"><input id="hidden" type="checkbox" ${l.includeHidden ? "checked" : ""}>Включать скрытые элементы прочитанных моделей</label><p>Незагруженные подключённые файлы нужно открыть перед расчётом.</p><datalist id="property-fields">${U(M(), "")}</datalist></div>`), f === "results" && (m("content").innerHTML = `<div class="result-tools"><div class="result-filters"><input id="result-search" type="search" placeholder="Поиск по результатам"><select id="result-state"><option value="">Все состояния</option>${Object.entries(
      Ht
    ).map(([p, y]) => `<option value="${p}">${y}</option>`).join("")}</select>${l.type === "intersection" ? '<input id="result-depth" type="number" min="0" step="1" placeholder="Глубина от, мм">' : ""}<button id="show-markers" role="switch" aria-checked="${A}">${A ? "● Знаки" : "○ Знаки"}</button><span id="result-count"></span></div><div class="bulk-tools"><select id="bulk-state" title="Состояние для выбранных строк">${Object.entries(
      Ht
    ).map(([p, y]) => `<option value="${p}">${y}</option>`).join("")}</select><button id="bulk">Применить</button></div></div><div class="result-area"><div class="table-area"><div class="scroll" id="table"></div><div class="pager"><span id="selection-count"></span><button id="prev-page">←</button><span id="page"></span><button id="next-page">→</button></div></div><div class="detail" id="detail"></div></div>`, Y(), W()), f === "report" && (m("content").innerHTML = `<div class="report"><h3>${it(l.name)}</h3><p>Результатов: ${l.results.length}. Выбрано: ${q.size}. ${l.status === "stale" ? "Результаты устарели — рекомендуется повторный запуск." : ""}</p><label class="check"><input id="selected-only" type="checkbox" ${q.size ? "checked" : ""}>Только выбранные строки</label><label class="check"><input id="report-images" type="checkbox" checked>Добавить снимки (недостающие будут созданы автоматически)</label><button id="export-html" class="primary">Сформировать пакет отчёта (.zip)</button><p>Один архив открывается напрямую в плагине Топоматик 360 «Коллизии». Для Robur распакуйте архив и откройте HTML: папка снимков уже связана с ним. Внутри также находятся manifest.json и review.json для сохранения идентификаторов и дальнейшего обмена статусами.</p><p>Правила и все результаты сохраняются кнопкой «Сохранить проверки» в верхней панели.</p></div>`), m("content").inert = h;
  }
  const Nt = (l) => l.axialPenetrationMm !== void 0 ? `Для отбора используется большее значение: толщина ${l.overlapThicknessMm === void 0 ? "не определена" : Mt(l.overlapThicknessMm) + " мм"}; продольный заход ${Mt(l.axialPenetrationMm)} мм` : l.kind === "touch" ? "Тела соприкасаются, общего объёма нет" : l.depth === "unmeasurable" ? "У элемента нет собственного объёма, замер глубины к нему неприменим" : l.depth === "tolerance" ? "Пересечение найдено, но его глубина не разрешена при текущем расчёте" : l.depth === "approximate" ? "Восстановлена внутренняя область оболочки, совмещены швы либо сокращён расчёт; точность числа не гарантируется" : "Оценка локальной толщины перекрытия двух элементов";
  function Y() {
    const l = P(), p = Z(), y = Math.max(1, Math.ceil(p.length / 50));
    u = Math.max(0, Math.min(u, y - 1));
    const g = p.slice(u * 50, u * 50 + 50);
    m("table").innerHTML = p.length ? `<table><thead><tr><th><input id="check-page" type="checkbox" aria-label="Выбрать страницу" ${g.every((j) => q.has(j.id)) ? "checked" : ""}></th>${["№", "Состояние", "Глубина, мм", "Длина контакта, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "Комментарий"].map((j) => `<th>${j}</th>`).join("")}</tr></thead><tbody>${g.map((j, L) => `<tr data-result="${it(j.id)}" class="${j.id === c ? "active" : ""}"><td><input type="checkbox" class="row-check" aria-label="Выбрать конфликт" ${q.has(j.id) ? "checked" : ""}></td>${[u * 50 + L + 1, Ht[j.state], de(j, l.type), j.contactLengthMm === void 0 ? "—" : "≈ " + Mt(j.contactLengthMm), j.a.name, j.a.model, j.a.guid || "—", j.b.name, j.b.model, j.b.guid || "—", j.note].map((I) => `<td title="${it(I)}">${it(I)}</td>`).join("")}</tr>`).join("")}</tbody></table>` : '<div class="empty">Нет результатов. Запустите проверку или измените фильтры.</div>', m("page").textContent = `${u + 1} / ${y}`, m("result-count").textContent = `${p.length} результатов`, m("selection-count").textContent = `Выбрано: ${q.size}`, m("prev-page").disabled = u === 0, m("next-page").disabled = u === y - 1;
  }
  function W() {
    const l = P(), p = Z(), y = p.findIndex((j) => j.id === c), g = l?.results.find((j) => j.id === c);
    m("detail").innerHTML = g ? `<div class="detail-head"><div><small>КОЛЛИЗИЯ</small><h3>#${y + 1} ${it(g.a.name)} × ${it(g.b.name)}</h3></div><div class="detail-nav"><button id="previous" title="Предыдущая коллизия" ${y <= 0 ? "disabled" : ""}>‹</button><button id="next" title="Следующая коллизия" ${y < 0 || y >= p.length - 1 ? "disabled" : ""}>›</button></div></div><div class="clash-summary"><span>${l?.type === "duplicates" ? "Дублирование" : "Пересечение"}</span><span title="${it(Nt(g))}">${l?.type === "duplicates" ? "Совпадение геометрии" : g.kind === "touch" ? "Касание" : g.depth ? Re[g.depth] : `Глубина ${Mt(g.penetrationMm)} мм`}</span><span>${it(Ht[g.state])}</span></div><p class="legend"><span class="part-a">● Элемент А</span><span class="part-b">● Элемент Б</span></p><div class="preview-slot">${g.image ? `<button id="open-image" class="preview"><img src="${it(g.image)}" alt="Снимок коллизии"><span>Открыть крупнее</span></button>` : '<div class="preview-empty"><span>◫</span><small>Снимок создастся после перехода в 3D</small></div>'}</div><div class="detail-actions"><button id="focus" class="primary">Перейти в 3D</button><button id="capture-image">▣ Снимок пары</button></div><div class="detail-scroll">${g.axialPenetrationMm !== void 0 ? `<div class="depth-breakdown"><span>Толщина перекрытия</span><b>${g.overlapThicknessMm === void 0 ? "—" : Mt(g.overlapThicknessMm) + " мм"}</b><span>Заход вдоль оси</span><b>${Mt(g.axialPenetrationMm)} мм</b><small>Для фильтра — большее из двух значений. Заход учитывает внутреннее пространство конструкции.</small></div>` : ""}${g.contactLengthMm !== void 0 ? `<div class="depth-breakdown"><span>Длина контакта вдоль элемента</span><b>≈ ${Mt(g.contactLengthMm)} мм</b><small>Непрерывный участок соприкосновения поверхностей. Это длина контакта, а не глубина; порог глубины её не учитывает.</small></div>` : ""}<div class="coordinates">${g.point.map((j, L) => `<span>${["X", "Y", "Z"][L]} ${j.toFixed(3)}</span>`).join("")}</div><label>Состояние<select id="edit-state">${Object.entries(
      Ht
    ).map(
      ([j, L]) => `<option value="${j}" ${g.state === j ? "selected" : ""}>${L}</option>`
    ).join(
      ""
    )}</select></label><label>Назначение<input id="assignee" value="${it(g.assignee)}"></label><label>Комментарий<textarea id="note" rows="2">${it(g.note)}</textarea></label>${[
      g.a,
      g.b
    ].map(
      (j, L) => `<details><summary>Элемент ${L ? "Б" : "А"} · свойства</summary><dl>${Object.entries(
        j.properties
      ).map(([I, O]) => `<dt>${it(I)}</dt><dd>${it(O)}</dd>`).join("")}</dl></details>`
    ).join("")}</div>` : '<div class="detail-empty"><span>◫</span><p>Выберите коллизию в таблице</p><small>Двойной щелчок сразу перенесёт камеру в 3D.</small></div>';
  }
  const rt = (l) => {
    const p = new Set(
      !l.manualOnly && l.modelsMode === "selected" ? l.models : []
    );
    for (const y of l.include)
      try {
        p.add(String(JSON.parse(y)[0]));
      } catch {
        const g = r?.elements.find(
          (j) => j.id === y
        )?.modelId;
        g && p.add(g);
      }
    return [...p];
  }, lt = (l) => {
    if (!l?.length) return;
    const p = /* @__PURE__ */ new Set();
    for (const y of l)
      for (const g of [y.a, y.b]) {
        if (!g.manualOnly && g.modelsMode !== "selected") return;
        for (const j of rt(g)) p.add(j);
      }
    return p;
  }, yt = (l) => {
    let p = l.trim().replace(/\\/g, "/").toLocaleLowerCase();
    try {
      p = decodeURIComponent(p);
    } catch {
    }
    p = p.replace(/[?#].*$/, "");
    const y = p.split("/").filter(Boolean).at(-1) || p;
    return /* @__PURE__ */ new Set([p, y]);
  }, at = (l) => {
    const p = new Set(l.map((O) => O.id)), y = l.map((O) => ({
      id: O.id,
      aliases: /* @__PURE__ */ new Set([
        ...yt(O.id),
        ...yt(O.name)
      ])
    })), g = (O) => {
      if (p.has(O)) return O;
      const G = yt(O), F = y.filter(
        (X) => [...G].some((nt) => X.aliases.has(nt))
      );
      return F.length === 1 ? F[0].id : O;
    }, j = (O) => {
      try {
        const G = JSON.parse(O);
        if (!Array.isArray(G) || G.length < 2) return O;
        const F = String(G[0]), X = g(F);
        return X === F ? O : JSON.stringify([X, ...G.slice(1)]);
      } catch {
        return O;
      }
    };
    let L = !1;
    const I = (O) => {
      const G = O.models.map(g), F = O.include.map(j), X = O.exclude.map(j);
      (G.some((nt, dt) => nt !== O.models[dt]) || F.some((nt, dt) => nt !== O.include[dt]) || X.some((nt, dt) => nt !== O.exclude[dt])) && (O.models = [...new Set(G)], O.include = [...new Set(F)], O.exclude = [...new Set(X)], L = !0);
    };
    for (const O of o.checks)
      I(O.a), I(O.b), O.modelsAtRun && (O.modelsAtRun = O.modelsAtRun.map(g));
    for (const O of o.sets) {
      const G = O.selection.models.map(g);
      G.some((F, X) => F !== O.selection.models[X]) && (O.selection.models = [...new Set(G)], L = !0);
    }
    return L && C(), L;
  }, Lt = () => {
    const l = P();
    if (l)
      for (const p of n.querySelectorAll("[data-side]")) {
        const y = p.dataset.side, g = r?.elements.filter(
          (O) => (l.includeHidden || !O.hidden) && Yt(O, l[y])
        ).length || 0, j = l[y].manualOnly ? rt(l[y]) : l[y].modelsMode === "selected" ? l[y].models : (r?.models || []).map((O) => O.id), L = !!r && j.every((O) => r.indexedModelIds.includes(O)), I = p.querySelector(
          "[data-selection-count]"
        );
        I && (I.textContent = L ? `${g} элементов` : "число после запуска");
      }
  };
  function ut() {
    e.markers(
      Z(),
      c,
      A,
      (l) => v(() => vt(l, !0))
    );
  }
  function vt(l, p = !1) {
    if (!h) {
      if (c = l, f === "results") {
        const y = Z().findIndex((j) => j.id === l), g = y < 0 ? u : Math.floor(y / 50);
        g !== u && (u = g, Y());
        for (const j of n.querySelectorAll("[data-result]"))
          j.classList.toggle("active", j.dataset.result === l);
        W(), requestAnimationFrame(() => {
          [...n.querySelectorAll("[data-result]")].find(
            (L) => L.dataset.result === l
          )?.scrollIntoView({ block: "nearest", inline: "nearest" });
        });
      }
      if (ut(), p) {
        const y = P()?.results.find((g) => g.id === l);
        y && (e.focus(y, Number(m("distance").value)), ct(y));
      }
    }
  }
  function ct(l) {
    clearTimeout(z);
    const p = ++S, y = Number(m("distance").value);
    l.image && l.imageScope === "pair-ab" && l.imageDistance === y || !e.canLocate(l) || (z = window.setTimeout(async () => {
      if (!(p !== S || h || c !== l.id))
        try {
          const g = await e.snapshot(
            l,
            y,
            () => p !== S || h || c !== l.id,
            !1,
            !1
          );
          if (p !== S || c !== l.id) return;
          l.image = g, l.imageScope = "pair-ab", l.imageDistance = y, C(), f === "results" && W();
        } catch (g) {
          p === S && c === l.id && D(
            "Не удалось создать снимок выбранной коллизии: " + (g instanceof Error ? g.message : String(g)),
            !0
          );
        }
    }, 500));
  }
  async function bt(l) {
    x = !1, _(!0), $("Создание снимка пары");
    try {
      const p = Number(m("distance").value);
      l.image = await e.snapshot(l, p, () => x), l.imageScope = "pair-ab", l.imageDistance = p, C(), f === "results" && c === l.id && W();
    } catch (p) {
      D(
        "Результаты сохранены. Снимок пары не создан: " + (p instanceof Error ? p.message : String(p)),
        !0
      );
    } finally {
      w(), _(!1);
    }
  }
  async function mt(l, p = !1) {
    H(), $("Подготовка моделей");
    let y = p ? /* @__PURE__ */ new Set() : lt(l);
    if (!p && y?.size) {
      const g = await e.scan(
        (j) => $(j),
        () => x,
        /* @__PURE__ */ new Set()
      );
      r = g, at(g.models) && (y = lt(l));
    }
    r = await e.scan(
      (g) => {
        D(g), $(g);
      },
      () => x,
      y
    ), at(r.models), m("model-count").textContent = `Проиндексировано моделей: ${r.indexedModelIds.length} из ${r.models.length} · элементов: ${r.elements.length}`, J(), D(
      r.blockers.length ? r.blockers.join(" ") : r.warnings.length ? `Модели прочитаны с замечаниями. ${r.warnings.join(" ")}` : "Модели прочитаны. Настройте выборки и запустите проверку.",
      !!r.blockers.length
    );
  }
  const _ = (l) => {
    h = l, l && (clearTimeout(z), S++);
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
    const p = (g) => {
      const j = `${l.name} · ${g.phase}`;
      D(`${j} ${g.done}/${g.total} · найдено ${g.found}`), $(j, g.done, g.total, g.found);
    };
    let y;
    try {
      y = new un();
    } catch {
      return pn(
        r.elements,
        l,
        p,
        () => x,
        (g) => e.geometry(g, () => x)
      );
    }
    return b = y, new Promise((g, j) => {
      const L = () => {
        y.terminate(), b = void 0, E = void 0;
      };
      E = () => {
        L(), j(Error("Расчёт отменён. Предыдущие результаты сохранены."));
      }, y.onmessage = async (I) => {
        if (I.data.load) {
          try {
            const O = await e.geometry(
              I.data.load,
              () => x || b !== y
            );
            if (b !== y) return;
            const G = [
              O.vertices?.buffer,
              O.indices?.buffer
            ].filter(Boolean);
            y.postMessage(
              { request: I.data.request, geometry: O },
              G
            );
          } catch (O) {
            b === y && y.postMessage({
              request: I.data.request,
              error: O instanceof Error ? O.message : String(O)
            });
          }
          return;
        }
        I.data.progress ? p(I.data.progress) : (L(), I.data.error ? j(Error(I.data.error)) : g(I.data.results));
      }, y.onerror = (I) => {
        L(), j(
          Error(
            `Не удалось запустить расчёт в фоновом потоке: ${I.message || "ошибка загрузки"}`
          )
        );
      }, y.postMessage({
        elements: r.elements,
        streaming: typeof e.geometry == "function",
        check: structuredClone({ ...l, results: [], warnings: [] })
      });
    });
  }
  async function et(l = !1) {
    if (h) return;
    H();
    const p = l ? [...o.checks] : [P()].filter(Boolean);
    if (!p.length) throw Error("Создайте проверку.");
    for (const y of p)
      for (const g of [y.a, y.b])
        g.conditions = [], g.mode = "all";
    x = !1, _(!0), $("Подготовка моделей");
    try {
      if (await mt(p), _(!0), r.blockers.length)
        throw Error(
          "Состав моделей прочитан не полностью. " + r.blockers.join(" ")
        );
      for (const g of p) {
        if (x) break;
        for (const O of ["a", "b"]) {
          const G = g[O], F = O === "a" ? "А" : "Б";
          if (G.modelsMode === "selected" && G.models.some((nt) => !r.models.some((dt) => dt.id === nt)))
            throw Error(
              `${g.name}: одна из моделей выборки отсутствует. Исправьте выборку.`
            );
          if (G.include.some((nt) => !r.elements.some((dt) => dt.id === nt)))
            throw Error(
              `${g.name}: вручную добавленный элемент отсутствует в модели.`
            );
          const X = Pe(r.elements, G, g.includeHidden);
          if (X) throw Error(`${g.name} · выбор ${F}: ${X}`);
        }
        const j = Ve(g);
        if (g.configAtRun === j && g.modelsAtRun?.some(
          (O) => !r.models.some((G) => G.id === O)
        ))
          throw Error(
            `${g.name}: состав моделей уменьшился. Подключите прежние модели или создайте копию проверки для нового состава. Прежние результаты сохранены.`
          );
        const L = await ot(g);
        if (x || !e.isCurrent())
          throw Error(
            "Проект изменился или расчёт отменён. Предыдущие результаты сохранены."
          );
        const I = (/* @__PURE__ */ new Date()).toISOString();
        g.results = Xe(
          g.configAtRun === j ? g.results : [],
          L,
          I
        ), g.lastRun = I, g.fingerprint = r.fingerprint, g.configAtRun = j, g.modelsAtRun = [...r.indexedModelIds], g.status = "done", g.warnings = [...r.warnings], d = g.id, c = g.results[0]?.id || "", q.clear(), C();
      }
      f = "results", J(), ut(), D(
        `Проверка завершена. ${P()?.results.length || 0} результатов. Сохраните проверки для продолжения работы.`
      );
      const y = P()?.results.find((g) => g.id === c);
      y && !x && await bt(y);
    } finally {
      w(), _(!1), J();
    }
  }
  function zt(l) {
    const p = l.closest("[data-side]")?.dataset.side;
    if (!p) return;
    const y = P()[p], g = l, j = l.closest("[data-side]");
    if (g.classList.contains("preset")) {
      y.presetId = g.value || void 0, j.querySelector(
        '[data-selection="delete-set"]'
      ).disabled = !y.presetId;
      return;
    }
    if (g.classList.contains("all-models")) {
      for (const L of j.querySelectorAll(
        ".model-check"
      ))
        L.checked = g.checked;
      y.modelsMode = g.checked ? "all" : "selected", y.models = [], y.manualOnly = !1, y.presetId = void 0;
    }
    if (g.classList.contains("model-check")) {
      const L = [
        ...j.querySelectorAll(".model-check")
      ], I = L.filter((G) => G.checked).map((G) => G.value), O = L.length > 0 && I.length === L.length;
      j.querySelector(".all-models").checked = O, y.modelsMode = O ? "all" : "selected", y.models = O ? [] : I, y.manualOnly = !1, y.presetId = void 0;
    }
    y.conditions = [], y.mode = "all", R(), Lt();
  }
  m("new").onclick = () => {
    const l = Qe();
    l.name = `Проверка ${o.checks.length + 1}`, o.checks.push(l), d = l.id, f = "select", c = "", q.clear(), C(), J();
  }, m("scan").onclick = () => v(async () => {
    x = !1, _(!0), $("Чтение моделей");
    try {
      const l = P();
      await mt(l ? [l] : void 0, !l);
    } finally {
      w(), _(!1), J();
    }
  }), m("run").onclick = () => v(() => et()), m("all").onclick = () => v(() => et(!0)), m("cancel").onclick = () => {
    x = !0, E?.();
  }, m("test-search").oninput = Q, m("checks").onclick = (l) => {
    const p = l.target.closest(
      "[data-check]"
    );
    p && !h && (e.clear(), d = p.dataset.check, c = "", q.clear(), u = 0, J());
  }, m("tabs").onclick = (l) => {
    const p = l.target.closest("[data-tab]");
    p && !h && (f = p.dataset.tab, J());
  }, m("name").onchange = () => {
    const l = P();
    l && (l.name = m("name").value.trim() || "Проверка", C(), Q());
  }, m("copy").onclick = () => {
    const l = P();
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
    }), o.checks.push(p), d = p.id, c = "", q.clear(), C(), J();
  }, m("delete").onclick = () => {
    P() && confirm(`Удалить проверку «${P().name}» и её результаты?`) && (o.checks = o.checks.filter((l) => l.id !== d), d = o.checks[0]?.id || "", q.clear(), e.clear(), C(), J());
  }, m("clear-project").onclick = () => {
    !o.checks.length && !o.sets.length || confirm(
      "Очистить проверки, наборы моделей и результаты текущего проекта?"
    ) && (o.checks = [], o.sets = [], r = void 0, d = "", c = "", q.clear(), e.clear(), C(), m("model-count").textContent = "Модели не прочитаны", J(), D("Данные проверок текущего проекта очищены."));
  }, m("save").onclick = () => {
    ke("НашеПО-проверки.json", JSON.stringify(o, null, 2)), k = !1, m("dirty").textContent = "Файл проверок сохранён";
  }, m("open").onclick = () => m("file").click(), m("file").onchange = () => v(async () => {
    const l = m("file").files?.[0];
    if (!l) return;
    const p = qe(await l.text());
    k && !confirm("Заменить текущие несохранённые проверки данными из файла?") || (o = p, r && e.isCurrent() && at(r.models), a && Tt.set(a, o), je(i, o), d = o.checks[0]?.id || "", c = "", q.clear(), e.clear(), k = !1, m("dirty").textContent = "Проверки открыты", J(), D("Проверки открыты. Обновите модели перед переходом к элементам."), m("file").value = "");
  });
  for (const l of ["settings", "help"])
    m(l).onclick = () => m(l + "-dialog").showModal();
  for (const l of n.querySelectorAll("[data-close]"))
    l.onclick = () => m(l.dataset.close).close();
  m("content").onchange = (l) => v(() => {
    const p = l.target, y = P();
    if (!y) return;
    if (p.closest("[data-side]")) {
      zt(p);
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
        const j = Number(p.value);
        if (!Number.isFinite(j) || j < 1e-3 || j > 100)
          throw p.value = String(y.precision), Error("Точность должна быть от 0,001 до 100 мм.");
        y.precision = j;
      }
      if (p.id === "min-penetration") {
        const j = Number(p.value);
        if (!Number.isFinite(j) || j < 0 || j > 1e5)
          throw p.value = String(y.minPenetration), Error(
            "Минимальная глубина должна быть от 0 до 100 000 мм."
          );
        y.minPenetration = j;
      }
      p.id === "type" && (y.type = p.value), p.id === "touching" && (y.touching = p.checked), p.id === "same-model" && (y.ignoreSameModel = p.checked), p.id === "same-group" && (y.ignoreSameGroup = p.checked), p.id === "hidden" && (y.includeHidden = p.checked), p.id === "equal-property" && (y.equalProperty = p.value), R(), J();
      return;
    }
    if (p.id === "result-state") {
      u = 0, Y();
      return;
    }
    if (p.id === "check-page") {
      for (const j of Z().slice(u * 50, u * 50 + 50))
        p.checked ? q.add(j.id) : q.delete(j.id);
      Y();
      return;
    }
    if (p.classList.contains("row-check")) {
      const j = p.closest("[data-result]").dataset.result;
      p.checked ? q.add(j) : q.delete(j), m("selection-count").textContent = `Выбрано: ${q.size}`;
      return;
    }
    const g = y.results.find((j) => j.id === c);
    g && (p.id === "edit-state" && (g.state = p.value, Y(), Q(), ut()), p.id === "assignee" && (g.assignee = p.value), p.id === "note" && (g.note = p.value, Y()), C());
  }), m("content").oninput = (l) => {
    const p = l.target;
    (p.id === "result-search" || p.id === "result-depth") && (u = 0, Y());
    const y = P(), g = Number(p.value);
    y && p.id === "precision" && Number.isFinite(g) && g >= 1e-3 && g <= 100 && (y.precision = g, R()), y && p.id === "min-penetration" && Number.isFinite(g) && g >= 0 && g <= 1e5 && (y.minPenetration = g, R());
  }, m("content").onclick = (l) => v(async () => {
    const p = l.target, y = p.closest("button"), g = P();
    if (!g) return;
    if (y?.dataset.selection) {
      const L = y.closest("[data-side]").dataset.side, I = g[L], O = m("content").scrollTop;
      let G = !0;
      switch (y.dataset.selection) {
        case "load-set": {
          const F = o.sets.find((X) => X.id === I.presetId);
          if (!F) throw Error("Выберите сохранённый набор моделей.");
          Object.assign(I, structuredClone(F.selection), {
            conditions: [],
            mode: "all",
            include: [],
            exclude: [],
            manualOnly: !1,
            presetId: F.id
          });
          break;
        }
        case "save-set": {
          if (I.manualOnly)
            throw Error(
              "Ручную выборку элементов нельзя сохранить как набор моделей."
            );
          const F = await N();
          if (!F) return;
          const X = {
            id: crypto.randomUUID(),
            name: F,
            selection: {
              models: [...I.models],
              modelsMode: I.modelsMode,
              conditions: [],
              mode: "all"
            }
          };
          o.sets.push(X), I.presetId = X.id, G = !1;
          break;
        }
        case "delete-set": {
          const F = o.sets.find((X) => X.id === I.presetId);
          if (!F) throw Error("Выберите сохранённый набор моделей.");
          if (!confirm(`Удалить набор «${F.name}»?`)) return;
          o.sets = o.sets.filter((X) => X.id !== F.id);
          for (const X of o.checks)
            for (const nt of [X.a, X.b])
              nt.presetId === F.id && (nt.presetId = void 0);
          G = !1;
          break;
        }
        case "show":
          e.select(
            (r?.elements || []).filter((F) => (g.includeHidden || !F.hidden) && Yt(F, I)).map((F) => F.id)
          );
          return;
        case "only": {
          const F = e.selected();
          if (!F.length) throw Error("Выделите элементы в 3D-сцене.");
          I.include = F, I.exclude = [], I.manualOnly = !0;
          break;
        }
        case "include": {
          const F = e.selected();
          if (!F.length) throw Error("Выделите элементы в 3D-сцене.");
          I.include = [.../* @__PURE__ */ new Set([...I.include, ...F])], I.exclude = I.exclude.filter((X) => !F.includes(X));
          break;
        }
        case "exclude": {
          const F = e.selected();
          if (!F.length) throw Error("Выделите элементы в 3D-сцене.");
          I.exclude = [.../* @__PURE__ */ new Set([...I.exclude, ...F])], I.include = I.include.filter((X) => !F.includes(X));
          break;
        }
        case "reset":
          I.manualOnly = !1, I.include = [], I.exclude = [];
      }
      G ? R() : C(), J(), m("content").scrollTop = O;
      return;
    }
    if (y?.id === "prev-page" && (u--, Y()), y?.id === "next-page" && (u++, Y()), y?.id === "show-markers" && (A = !A, y.textContent = A ? "● Знаки включены" : "○ Знаки выключены", y.setAttribute("aria-checked", String(A)), ut()), y?.id === "bulk") {
      const L = m("bulk-state").value;
      for (const I of g.results) q.has(I.id) && (I.state = L);
      C(), Y(), W(), Q(), ut();
    }
    if (y?.id === "capture-image") {
      const L = g.results.find((I) => I.id === c);
      if (L) {
        x = !1, _(!0), $("Создание снимка пары");
        try {
          L.image = await e.snapshot(
            L,
            Number(m("distance").value),
            () => x,
            !0
          ), L.imageScope = "pair-ab", L.imageDistance = void 0, C(), W(), D("Снимок сохранён в результат.");
        } finally {
          w(), _(!1);
        }
      }
      return;
    }
    if (y?.id === "open-image") {
      const L = g.results.find((I) => I.id === c);
      if (L?.image) {
        const I = document.createElement("dialog");
        I.className = "image-dialog", I.innerHTML = '<button>Закрыть</button><img alt="Снимок коллизии">', I.querySelector("img").src = L.image, I.querySelector("button").onclick = () => {
          I.close(), I.remove();
        }, n.append(I), I.showModal();
      }
      return;
    }
    if (y?.id === "focus" && vt(c, !0), y?.id === "previous" || y?.id === "next") {
      const L = Z(), I = L.findIndex((O) => O.id === c) + (y.id === "next" ? 1 : -1);
      L[I] && vt(L[I].id, !0);
    }
    if (y?.id === "export-html") {
      let L = 0;
      const I = m("selected-only").checked ? g.results.filter((F) => q.has(F.id)) : g.results;
      if (!I.length) throw Error("Нет результатов для отчёта.");
      if (m("report-images").checked) {
        const F = e.view, X = F?.storeView(), nt = Number(m("distance").value);
        x = !1, _(!0), $("Подготовка снимков отчёта", 0, I.length);
        try {
          await e.captureWorkspace(async () => {
            let dt = 0;
            for (const kt of I) {
              if (x)
                throw Error(
                  "Подготовка отчёта отменена. Уже полученные снимки сохранены."
                );
              $(
                "Подготовка снимков отчёта",
                dt,
                I.length
              ), D("Подготовка снимков: " + (dt + 1) + " / " + I.length);
              const Gt = kt.imageScope !== "pair-ab" || kt.imageDistance !== void 0 && kt.imageDistance !== nt;
              if (!kt.image || Gt) {
                if (kt.state === "resolved" && !e.canLocate(kt)) {
                  dt++;
                  continue;
                }
                try {
                  kt.image = await e.snapshot(kt, nt, () => x), kt.imageScope = "pair-ab", kt.imageDistance = nt, C();
                } catch (Jt) {
                  if (x || !e.isCurrent()) throw Jt;
                  L++;
                }
              }
              dt++, $("Подготовка снимков отчёта", dt, I.length);
            }
          });
        } finally {
          if (F && e.isCurrent()) {
            const dt = g.results.find((kt) => kt.id === c);
            if (dt)
              try {
                e.focus(dt, nt, !1);
              } catch {
              }
            X && F.restoreView(X);
          }
          w(), _(!1);
        }
      }
      const O = m("report-images").checked ? I.map(
        (F) => F.imageScope === "pair-ab" ? F : { ...F, image: void 0 }
      ) : I.map((F) => ({ ...F, image: void 0 })), G = Sn(g, O);
      ke(G.archiveName, G.blob), D(
        "Отчёт подготовлен. Результатов: " + I.length + "; со снимками: " + O.filter((F) => F.image).length + "." + (L ? ` Не удалось создать снимков: ${L}; эти строки включены без изображения.` : ""),
        L > 0
      );
    }
    const j = p.closest("[data-result]");
    j && !p.closest("input") && !window.getSelection()?.toString() && vt(j.dataset.result);
  }), m("content").ondblclick = (l) => {
    const p = l.target, y = p.closest("[data-result]");
    y && !p.closest("input") && v(() => vt(y.dataset.result, !0));
  };
  const Dt = setInterval(() => {
    h || (H() ? (m("model-count").textContent = "Модели не прочитаны", D(
      o.checks.length ? "Открыт другой проект. Показаны его проверки; обновите модели." : "Открыт другой проект. Для него ещё нет проверок."
    ), h || J()) : r && !e.isCurrent() && (r = void 0, e.clear(), m("model-count").textContent = "3D-окно изменилось", D("Активное 3D-окно изменилось. Обновите модели."), h || J()));
  }, 1500);
  return J(), () => {
    s(), clearInterval(Dt), clearTimeout(z), S++, x = !0, E?.(), b?.terminate(), e.clear();
  };
}
var fe = /* @__PURE__ */ ((t) => (t.object = "object", t.drawing = "drawing", t.table = "table", t.record = "record", t.textStyle = "textstyle", t.textStyleTable = "textstyles", t.linetype = "linetype", t.linetypeTable = "linetypes", t.layer = "layer", t.layerTable = "layers", t.block = "block", t.blockTable = "blocks", t.layout = "layout", t.layoutTable = "layouts", t.type = "type", t.typeTable = "types", t.material = "material", t.materialTable = "materials", t.geometry = "geometry", t.geometryTable = "geometries", t.group = "group", t.groupTable = "groups", t.attachment = "attachment", t.attachmentTable = "attachments", t.entities = "entities", t.entity = "entity", t.line = "l", t.solid = "s", t.insert = "i", t.polyline = "p", t.circle = "c", t.arc = "a", t.polyline3d = "p3", t.proxy = "x", t.text = "t", t.mtext = "mt", t.wipeout = "w", t.model3d = "g", t.alignment = "al", t))(fe || {});
const pe = () => new Promise((t) => requestAnimationFrame(() => t()));
function He(t) {
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
async function zn(t) {
  await pe(), t.repaint();
  const { candidates: e, rect: n } = He(t), s = document.createElement("canvas");
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
    t.repaint(), await pe(), s.remove();
  };
}
async function Cn(t, e) {
  if (await pe(), e()) throw Error("Подготовка снимков отменена.");
  const { candidates: n } = He(t), s = document.createElement("canvas"), a = Math.min(1, 1280 / n[0].width);
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
const ae = "nashepo.checks.points", Ae = "nashepo.checks.highlight";
function Ee(t) {
  let e = performance.now();
  return async () => {
    if (t()) throw Error("Операция отменена.");
    performance.now() - e >= 16 && (await new Promise((n) => setTimeout(n, 0)), e = performance.now());
  };
}
function Xt(t, e, n, s = 0) {
  if (s > 12 || t == null) return;
  if (typeof t != "object") {
    n[e] = String(t);
    return;
  }
  if (Array.isArray(t)) {
    t.forEach((i, o) => Xt(i, `${e}[${o}]`, n, s + 1));
    return;
  }
  const a = t;
  if ("$value" in a) {
    Xt(a.$value, e, n, s + 1);
    return;
  }
  for (const [i, o] of Object.entries(a))
    i.startsWith("$") || Xt(o, e ? `${e}.${i}` : i, n, s + 1);
}
function Nn(t) {
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
const se = (t) => /\.wdx(?:[?#].*)?$/i.test(t);
class On {
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
    const r = [], d = /* @__PURE__ */ new Set(), f = [], c = [], u = [], h = /* @__PURE__ */ new Map(), x = /* @__PURE__ */ new Set();
    let b = 2166136261;
    const A = Ee(
      () => n() || a !== this.app || i !== this.view
    );
    let k = -1 / 0;
    const q = (z) => {
      for (let S = 0; S < z.length; S++)
        b = Math.imul(b ^ z.charCodeAt(S), 16777619);
    }, E = async (z, S, P) => {
      if (x.has(z)) return;
      x.add(z);
      const m = z.layers.layer0?.modelName || S, B = S, D = se(m) || se(B), $ = (R, M) => {
        d.has(R) || (d.add(R), r.push({ id: R, name: M }));
      };
      D || $(B, m);
      const w = !D && (!s || s.has(B)), v = [];
      (w || D) && z.layouts.model?.walk((R) => (R.type === fe.model3d ? v.push(R) : R.type === fe.insert && f.push(`${m}: вставка блока не включена в расчёт.`), !1));
      const N = /* @__PURE__ */ new Map();
      for (const R of v) {
        let M = R.layer, U = "";
        for (; M; ) {
          if (M.modelName && !se(M.modelName)) {
            U = M.modelName;
            break;
          }
          M = M.layer;
        }
        const Z = D ? U || "Модель проекта" : m, Q = D ? U || `${S}/#model` : B;
        if (D && $(Q, Z), s && !s.has(Q)) continue;
        const st = JSON.stringify([
          R.layer?.UUID || "",
          R.$id || R.$path
        ]);
        N.set(JSON.stringify([Q, st]), {
          key: st,
          objects: [R],
          modelId: Q,
          modelName: Z
        });
      }
      let C = 0;
      for (const R of N.values()) {
        const { key: M, objects: U, modelId: Z, modelName: Q } = R;
        if (n()) throw Error("Чтение моделей отменено.");
        if (a !== this.app || i !== this.view)
          throw Error(
            "Активный проект изменился. Запустите чтение моделей заново."
          );
        const st = U[0].layer, J = {};
        try {
          if (st) {
            const ut = [];
            let vt = st;
            for (; vt && ut.length < 64; )
              ut.unshift(vt), vt = vt.layer;
            for (const ct of ut)
              Xt(ct.typedProperties(), "", J), ct.typed?.name && (J.Тип = ct.typed.name);
          }
        } catch {
          f.push(`${Q} / ${M}: часть свойств недоступна.`);
        }
        const Nt = J["ifc.id"] || Object.entries(J).find(
          ([ut]) => /(^|\.)(globalid|ifcguid|guid)$/i.test(ut)
        )?.[1] || "", Y = st?.name || U[0].$id || "Элемент", W = JSON.stringify([Z, M]);
        Object.assign(J, {
          Модель: Q,
          Имя: Y,
          GUID: Nt,
          Объект: st?.UUID || M
        });
        const rt = {
          min: [1 / 0, 1 / 0, 1 / 0],
          max: [-1 / 0, -1 / 0, -1 / 0]
        };
        let lt = !0, yt = !1, at = 0;
        for (const ut of U) {
          lt &&= ut.isClosed;
          for (const vt of Object.values(ut.meshes)) {
            const ct = vt.geometry;
            if (!ct || ct.indices.length % 3) {
              yt = !0;
              continue;
            }
            lt &&= vt.isClosed;
            for (let _ = 0; _ < ct.vertices.length; _ += 3) {
              const ot = [
                ct.vertices[_],
                ct.vertices[_ + 1],
                ct.vertices[_ + 2]
              ];
              if (Math3d.mat4.mulv3(ot, ut.matrix, ot), !ot.every(Number.isFinite)) {
                yt = !0;
                continue;
              }
              for (let et = 0; et < 3; et++)
                rt.min[et] = Math.min(rt.min[et], ot[et]), rt.max[et] = Math.max(rt.max[et], ot[et]);
              if (q(ot.join(",")), _ % 6e4 === 0 && (performance.now() - k > 200 && (k = performance.now(), e(
                "Индексирование: " + Q + " · " + u.length + " элементов"
              )), await A(), n()))
                throw Error("Чтение моделей отменено.");
            }
            const bt = ct.vertices.length / 3, mt = (_) => Number.isFinite(ct.vertices[_ * 3]) && Number.isFinite(ct.vertices[_ * 3 + 1]) && Number.isFinite(ct.vertices[_ * 3 + 2]);
            for (let _ = 0; _ < ct.indices.length; _ += 3) {
              const ot = ct.indices[_], et = ct.indices[_ + 1], zt = ct.indices[_ + 2];
              if (b = Math.imul(b ^ ot, 16777619), b = Math.imul(b ^ et, 16777619), b = Math.imul(b ^ zt, 16777619), ot < bt && et < bt && zt < bt && ot !== et && et !== zt && zt !== ot && mt(ot) && mt(et) && mt(zt) ? at++ : yt = !0, _ % 15e4 === 0 && (await A(), n()))
                throw Error("Чтение моделей отменено.");
            }
          }
        }
        if (yt || !at) {
          if (at || C++, !at) continue;
          lt = !1;
        }
        const Lt = {
          id: W,
          name: Y,
          model: Q,
          modelId: Z,
          guid: Nt,
          properties: J,
          // An IFC layer can be disabled for editing while it is still drawn
          // in the 3D view. Only the visibility flag and a hidden attachment
          // should exclude it from a normal clash check.
          hidden: P || !!st?.resolveHidden(),
          triangles: new Float64Array(0),
          triangleCount: at,
          closed: lt,
          bounds: rt
        };
        q(JSON.stringify([W, J, Lt.hidden])), u.push(Lt), h.set(W, U);
      }
      C && f.push(
        `${m}: пропущено элементов без треугольной геометрии — ${C}.`
      );
      const H = [];
      z.attachments.forEach((R) => {
        H.push(R);
      });
      for (const R of H) {
        const M = R.name || R.uri || R.$id, U = M || "Подключённая модель", Z = `${S}/${M || "attachment"}`;
        R.model || $(Z, U), R.model ? await E(
          R.model,
          Z,
          P || R.hidden
        ) : (!s || s.has(Z)) && c.push(
          `${U}: модель не загружена. Откройте её перед расчётом.`
        );
      }
    };
    if (await E(o, o.layers.layer0?.modelName || "Проект", !1), !u.length && (!s || s.size > 0)) {
      const z = s ? [...s].filter((S) => !d.has(S)) : [];
      throw Error(
        z.length ? `Сохранённая выборка ссылается на модели, которых нет в текущем составе: ${z.join(", ")}. Обновите список моделей.` : r.length ? "В выбранных моделях не найдены 3D-элементы с доступной геометрией. Проверьте, что модели загружены, и выберите нужные файлы." : "В открытом проекте не обнаружены IFC/SMDX-модели. Проверьте состав подключений проекта."
      );
    }
    return this.clear(), this.refs = h, this.metadata = new Map(u.map((z) => [z.id, z])), this.scannedApp = a, this.scannedView = i, {
      elements: u,
      fingerprint: `${u.length}:${b >>> 0}`,
      warnings: [...new Set(f)],
      blockers: [...new Set(c)],
      models: r,
      indexedModelIds: r.filter((z) => !s || s.has(z.id)).map((z) => z.id)
    };
  }
  async geometry(e, n) {
    const s = Ee(() => n() || !this.isCurrent());
    if (!this.isCurrent()) throw Error("Активная модель изменилась.");
    const a = this.metadata.get(e), i = this.refs.get(e);
    if (!a || !i) throw Error("Элемент отсутствует.");
    const o = i.flatMap(
      (x) => Object.values(x.meshes).flatMap((b) => {
        const A = b.geometry;
        if (!A || A.indices.length % 3) return [];
        const k = Nn(A);
        return k.length ? [{ object: x, g: A, indices: k }] : [];
      })
    );
    let r = 0, d = 0;
    for (const { g: x, indices: b } of o) {
      if (!x) throw Error("Геометрия недоступна.");
      r += x.vertices.length, d += b.length;
    }
    const f = new Float64Array(r), c = new Uint32Array(d);
    let u = 0, h = 0;
    for (const { object: x, g: b, indices: A } of o) {
      if (!b) throw Error("Геометрия недоступна.");
      for (let k = 0; k < b.vertices.length; k += 3) {
        const q = [b.vertices[k], b.vertices[k + 1], b.vertices[k + 2]];
        if (Math3d.mat4.mulv3(q, x.matrix, q), f.set(q, u + k), k % 6e4 === 0 && (await s(), n() || !this.isCurrent()))
          throw Error("Чтение геометрии отменено.");
      }
      for (let k = 0; k < A.length; k++)
        if (c[h + k] = u / 3 + A[k], k % 15e4 === 0 && (await s(), n()))
          throw Error("Чтение геометрии отменено.");
      u += b.vertices.length, h += A.length;
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
      const e = this.pointView.annotations.get(ae);
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
          const h = {
            // SDK fields may be prototype getters rather than own properties.
            uuid: `${Ae}.${d}.${u.uuid}`,
            vertices: u.vertices,
            indices: u.indices,
            normals: u.normals,
            bounds: u.bounds,
            colors: new Uint32Array(u.vertices.length / 3).fill(r)
          };
          return [{ obj: f, geometry: h, color: r }];
        })
      )
    ), this.overlay) {
      this.overlay.layer.visible = !0, n.invalidate(!0);
      return;
    }
    let a;
    a = {
      id: Ae,
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
      a ? this.highlight(e) : this.focus(e, n, !1), i.pauseAnimation(), c = await zn(i), i.layer.clearSelected(), o.visible = !1, i.annotations.visible = !1, i.invalidate();
      const u = await Cn(
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
    const o = i.annotations.get(ae);
    if (o && i.annotations.release(o), this.pointView = i, !s) {
      i.invalidate();
      return;
    }
    const r = i.annotations.create(ae, 1e4), d = e.filter((f) => f.id !== n).concat(e.filter((f) => f.id === n));
    for (const f of d.slice(-3e3)) {
      if (f.state === "resolved") continue;
      const [c, u, h] = f.point, x = f.id === n, b = f.state === "excluded" ? "#78818c" : f.state === "approved" || f.state === "reviewed" ? "#28b94b" : "#e1372d", A = x ? "#f2c94c" : b, k = () => a(f.id), q = [
        { type: "line", a: [c, u, h], b: [c, u, h + 1], color: A, width: 5 },
        {
          type: "polyline",
          points: [
            [c - 0.65, u, h + 1],
            [c + 0.65, u, h + 1],
            [c, u, h + 2.2],
            [c - 0.65, u, h + 1]
          ],
          color: A,
          fillColor: b,
          width: x ? 5 : 2
        },
        {
          type: "line",
          a: [c, u - 0.01, h + 1.85],
          b: [c, u - 0.01, h + 1.4],
          color: "#ffffff",
          width: 4
        },
        {
          type: "line",
          a: [c, u - 0.01, h + 1.22],
          b: [c, u - 0.01, h + 1.27],
          color: "#ffffff",
          width: 4
        }
      ];
      r.add({
        id: f.id,
        type: "shaped",
        shapes: q,
        activeShapes: q,
        activateCommand: k,
        dblCommand: k
      }), x && r.add({
        id: f.id + ":label",
        type: "simple",
        position: [c, u, h + 2.35],
        label: `${f.a.name} × ${f.b.name}`,
        labelBackground: "#f2c94c",
        labelColor: "#171717",
        activateCommand: k
      });
    }
    i.invalidate();
  }
}
let $e, re, ze;
const Pn = {
  open(t) {
    t.manager.revealView("nashepo.collisionfinder360/checks_panel");
  },
  mount(t) {
    const e = t.el;
    if (!e) return;
    if (re && ze === t.manager) {
      e.replaceChildren(re);
      return;
    }
    $e?.();
    const n = document.createElement("div");
    n.style.height = "100%", e.replaceChildren(n), re = n, ze = t.manager, $e = $n(n, new On(t));
  }
};
export {
  Pn as default
};
