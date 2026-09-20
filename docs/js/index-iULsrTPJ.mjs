const Ke = `<h2>Работа с проверками</h2>
<details open><summary>1. Первая проверка</summary><ol><li>Откройте проект и подключите IFC/SMDX штатными средствами Топоматик 360.</li><li>Откройте нижнюю вкладку «Проверки» и нажмите «Модели».</li><li>Нажмите «＋ Новая проверка» и задайте ей понятное имя.</li><li>Во вкладке «Выбор» оставьте галочки только у нужных файлов в А и Б. «Все модели» включено по умолчанию.</li><li>Выберите «По пересечению» или «Дублирование» и нажмите «Запустить».</li><li>Во вкладке «Результаты» дважды нажмите строку: камера направится к конфликту, элемент А будет выделен красным, элемент Б — синим, и оба элемента станут выделенными в 3D-окне.</li></ol><p>Первое обновление без созданной проверки получает только список файлов. При запуске индексируются модели, отмеченные хотя бы в одной стороне. Файл проекта WDX служит контейнером и в выбор моделей не попадает.</p></details>
<details><summary>2. Выбор моделей и сохранённые наборы</summary><p>Выбор А и выбор Б задают две стороны сравнения. Снимите «Все модели» и отметьте конкретные IFC/SMDX. Для поиска дубликатов внутри одного файла отметьте его с обеих сторон.</p><p>Часто используемый состав можно сохранить как набор моделей, а затем применить в другой проверке. Наборы входят в файл проверок. Состав выборки задаётся галочками моделей и ручным выделением объектов.</p><p>IFC GUID читается из свойства <code>ifc.id</code>; также поддерживаются GlobalId, IfcGuid и GUID.</p></details>
<details><summary>3. Работа с выделением в 3D</summary><p>Сначала выделите элементы штатными средствами в 3D-окне, затем используйте кнопку в нужной стороне:</p><ul><li><b>Показать выбранные элементы</b> — выделяет весь текущий состав.</li><li><b>Только выделенные в 3D</b> — оставляет только выделенные объекты.</li><li><b>＋ Добавить из 3D</b> — добавляет выделенные объекты к моделям.</li><li><b>− Исключить из 3D</b> — исключает выделенные объекты.</li><li><b>Сбросить ручной выбор</b> — снова использует отмеченные модели.</li></ul><p>Ручные идентификаторы могут измениться после замены IFC/SMDX, поэтому такую выборку следует проверить заново.</p></details>
<details><summary>4. Пересечения, глубина, касания и дубликаты</summary><p><b>Пересечение</b> определяется по треугольным поверхностям элементов и вложенности тел. Раздельные сетки сначала проверяются вместе: совпадающие рёбра и разное разбиение швов больше не делают замкнутый элемент «неизмеримым». Признак замкнутости из исходной модели проверяется по граням: сам по себе он не подтверждает внутренний объём. Габаритные коробки отбирают близкие пары; общий габарит также ограничивает область замера глубины. Одна пара элементов формирует один результат.</p><p><b>Толщина перекрытия</b> — локальная оценка пересечения. Для контакта выбираются направления измерения, в том числе по его форме и нормалям граней. По ним измеряется общая часть проекций геометрии в области контакта и выбирается наименьшая пригодная ширина. Если обнаружены отдельные участки перекрытия, для пары сохраняется наибольшая из их глубин.</p><p><b>Заход вдоль оси</b> дополнительно измеряется для распознанной прямой трубы или вытянутого профиля, пересекающего более крупную конструкцию. Ось определяется по геометрии, её пересечения — по граням конструкции. Для круглого кабеля или трубы с поворотами плагин дополнительно распознаёт последовательные поперечные сечения и измеряет путь по их центрам. Соседние участки внутри одной оболочки объединяются в непрерывный заход; выход наружу и вход обратно дают отдельные участки, из которых берётся самый длинный. Такой замер помечается знаком ≈. При частичном заходе измеряется участок от внешней границы до конца профиля; при сквозном — от входа до выхода. Внутренняя пустота колодца входит в этот замер. Раздельные оболочки конструкции измеряются отдельно: расстояние между несвязанными частями не прибавляется. Сам по себе проход оси через габарит не создаёт коллизию: сначала должно быть обнаружено пересечение элементов.</p><p><b>Глубина для отбора</b> — большее из толщины перекрытия и продольного захода. Поэтому труба диаметром 50 мм, заходящая в конструкцию на 1000 мм, проходит порог 80 мм, а стык с заходом 5 мм — нет. Оба замера видны в карточке коллизии и HTML-отчёте, когда продольный заход удалось определить. Для отдельных отводов, фитингов и сопоставимых труб сохраняется локальный расчёт. Это не расстояние перемещения, устраняющего коллизию. Объём пересечения имеет кубические единицы и не заменяет глубину в миллиметрах.</p><p>Если оболочка содержит разрывы, плагин дополнительно определяет внутреннюю область по совокупности окружающих граней — методом обобщённого числа обхода. Когда такая область подтверждается, рассчитывается численная глубина со знаком ≈. Исходная модель при этом не изменяется. Это позволяет проверять трубы, отводы и другие объёмные элементы с дефектами сетки. Одиночная плоская грань не превращается в объёмное тело.</p><p><b>Ограничения метода.</b> Плагин не строит точное тело пересечения. Разделение контактов, выбор направлений и проверка заполнения являются оценкой. Для сложных невыпуклых и составных объектов, криволинейных поверхностей результат может зависеть от сетки и расположения геометрии. Продольный замер применяется к распознанным прямым профилям с длиной не менее четырёх поперечных размеров, когда конструкция шире профиля минимум в 2,5 раза по двум поперечным направлениям. Для изогнутого круглого кабеля или трубы замер по траектории доступен, если сетка содержит распознаваемые поперечные сечения и связи между ними. Если ось восстановить не удалось, остаётся локальный замер. У сложной связной невыпуклой оболочки продольный замер может включать промежутки между её поверхностями. Заданная точность не гарантирует такую же погрешность итоговой глубины. Результаты около принятого допуска следует проверять в 3D.</p><p><b>Столбец глубины:</b></p><ul><li><b>Число</b> — полученная оценка в миллиметрах. Малые положительные значения показываются с дополнительными знаками, чтобы не превратиться в ноль при округлении.</li><li><b>Касание</b> — найден контакт без разрешённого объёмного перекрытия. Такие пары включаются настройкой «Учитывать касания» и могут отсекаться порогом глубины как нулевые.</li><li><b>Не определена</b> — у геометрии не удалось определить внутреннюю область, например у одиночного листа или отдельных граней. Пересечение сохраняется; размер грани не выдаётся за глубину.</li><li><b>Требует уточнения</b> — пересечение найдено, однако его глубина не разрешена текущим расчётом. Причиной может быть неоднозначная геометрия контакта. Само по себе малое вхождение относительно настройки точности больше не является причиной отказа от замера.</li><li><b>≈</b> — приблизительная оценка: внутренняя область восстановлена для оболочки с разрывами, состыкованы немного расходящиеся швы либо при измерении сокращалась выборка или разделение контактов достигло предела. Для числа не гарантируются ни величина, ни направление ошибки.</li></ul><p>«Не определена» и «Требует уточнения» остаются в результатах независимо от минимальной глубины. Числовые оценки, в том числе со знаком ≈, сравниваются с порогом. Знак ≈ сообщает о приближённом расчёте и не отменяет фильтр. Найденное малое пересечение не должно исчезать только из-за отключённого учёта касаний: для определения пересечения и замера используется отдельный численный запас. Настройка точности не округляет малые вхождения до нуля.</p><p><b>Точность расчёта</b> задаётся в миллиметрах и влияет на отбор близких пар, разделение контактов и запас при фильтрации. При восстановлении швов допустимое расхождение ограничено этой величиной и дополнительно 0,01 мм. Приближённое восстановление внутренней области по граням — отдельный метод, его погрешность этой настройкой не гарантируется. <b>Минимальная глубина</b> — порог отбора результатов. Все числовые оценки сравниваются с порогом с запасом на точность: при минимуме 20 мм и точности 0,1 мм результат 19,95 мм остаётся. Этот порядок одинаков в расчёте, таблице и HTML-отчёте. После изменения точности или порога повторно запустите проверку.</p><p>Труба и отвод могут пересекаться в штатном соединении из-за формы исходной сетки. Такие соединения рассматриваются отдельно и при необходимости исключаются правилами.</p><p><b>Дублирование</b> ищет совпадающую треугольную геометрию в мировых координатах с заданной точностью. Геометрически одинаковые тела с разным разбиением поверхности на треугольники могут не считаться дубликатами.</p></details>
<details><summary>Длина бокового контакта</summary><p>Кабель может пересекать стенку боковой поверхностью, хотя его ось проходит снаружи. Для распознанных профилей и трасс отдельно измеряется <b>длина контакта</b>: пересечения фактических треугольных поверхностей проецируются вдоль элемента, и выбирается самый длинный непрерывный участок. Раздельные участки не складываются. Это приблизительный размер со знаком ≈; он доступен в таблице, карточке, HTML-отчёте и сессии.</p><p>Длина не заменяет глубину и не участвует в её пороге. Например, кабель может касаться стенки вдоль 1000 мм с нулевой глубиной или входить в неё на 5 мм вдоль тех же 1000 мм. Чистые касания попадают в результат только при включённом «Учитывать касания». Если профиль не распознан или замер неприменим, в столбце стоит прочерк. Для добавления длины в старые результаты запустите проверку повторно.</p></details>
<details><summary>5. Составные объекты и неполная геометрия</summary><p>Один IFC-объект может состоять из нескольких частей. В новых проверках правило «Не проверять геометрию одного составного объекта» включено по умолчанию. Его можно изменить во вкладке «Правила». Сохранённые проверки сохраняют выбранное ранее значение. Там же можно исключить пары одной модели или одинакового значения свойства.</p><p>Пустые и неполные геометрические части пропускаются, а пригодные части модели продолжают участвовать. Плагин показывает сводное замечание с количеством пропущенных элементов. Незагруженный подключённый файл блокирует расчёт только тогда, когда он входит в выборку.</p></details>
<details><summary>6. Результаты и состояния</summary><p>«Новый» найден впервые, «Активный» найден повторно, «Проверенный» рассмотрен, «Подтверждённый» подтверждён, «Исключённый» исключён из работы. «Исправленный» означает, что пара исчезла при повторном расчёте с теми же правилами; состояние можно изменить вручную.</p><p>В таблице доступны IFC GUID, расчётная глубина, назначение и комментарий. Фильтр «Глубина от» сравнивает порог с большим из доступных замеров: толщиной перекрытия и продольным заходом. Числа со знаком ≈ тоже участвуют в отборе; строки «не определена» и «требует уточнения» сохраняются для просмотра. Галочки меняют состояние сразу у нескольких строк. Значения можно выделять и копировать. При переходе стрелками активная строка автоматически прокручивается в видимую область. Состояние «Устарела» у проверки означает, что после последнего расчёта изменили её тип, выборки, параметры или правила.</p></details>
<details><summary>7. Отчёт и снимки</summary><p>После перехода к коллизии отсутствующий снимок создаётся автоматически, если пользователь задержался на результате. Кадр строится от той же камеры приближения, что и снимки отчёта: ракурс задаёт «Дистанция камеры» в настройках. Если дистанцию изменить, отчёт переснимет прежние кадры под новое значение. Быстрое переключение стрелками отменяет лишние снимки. Во время технической перерисовки поверх 3D-окна сохраняется предыдущий кадр, поэтому модель не должна мигать.</p><p>Кнопка «Снимок пары» сохраняет текущий ракурс только с двумя элементами коллизии: элемент А показан красным, элемент Б — синим. Такой кадр собран вручную, поэтому отчёт его не переснимает. На время подготовки отчёта нижняя панель автоматически уменьшается для широкого 3D-кадра и затем возвращается к прежнему размеру.</p><p>«Сформировать пакет отчёта» создаёт единый ZIP-архив. Его можно открыть напрямую в плагине Топоматик 360 «НашеПО · Коллизии». Для Robur распакуйте архив целиком и откройте находящийся в корне табличный HTML; рядом останется связанная папка JPEG/PNG. В архив также входят <code>manifest.json</code> и <code>review.json</code> со стабильными идентификаторами проверки и коллизий. Они предназначены для дальнейшего двустороннего обмена статусами и комментариями. В отчёт входят название проверки и конфликта, статус, отрицательное расстояние в метрах по правилам отчёта Navisworks, описание, дата, координаты, назначение, комментарий, расчётные размеры, данные обоих элементов, модели и IFC GUID.</p></details>
<details><summary>8. Папка проекта проверок</summary><p>В стандартном проекте WDX проверки сохраняются в служебной папке <code>nashepo.collisionfinder360</code> внутри проекта. У быстрого проекта перед первым запуском расчёта выберите отдельную папку на диске. Её можно подключить заранее через меню ⋮ → «Папка проверок…». Если папка содержит проверки, плагин предложит открыть их вместо текущих.</p><p>В папке хранятся <code>project.json</code> с правилами, наборами, результатами, статусами и комментариями, предыдущая копия <code>project.previous.json</code>, а в <code>images</code> — отдельные снимки. Изменения сохраняются автоматически; надпись «Сохранено в папке проекта» подтверждает запись. При ошибке записи сообщение остаётся на панели.</p><p>Для продолжения в другой день откройте соответствующие модели и ту же папку проверок. Стандартный проект подхватывает свою папку автоматически. Быстрый проект нужно снова связать командой «Папка проверок…». IFC/SMDX не копируются в папку проверок; модели открываются средствами Топоматик 360. При передаче перенесите всю служебную папку со снимками.</p><p>«Сохранить проверки» выгружает отдельную переносимую копию JSON; «Открыть проверки» заменяет текущие проверки данными из неё. «Очистить проект» очищает текущие проверки, наборы и результаты; исходные модели остаются в проекте. Предыдущая копия не является журналом истории. Полная история запусков и приём ответов исполнителя будут отдельным этапом.</p><p>При переключении между «Коллизии» и «Проверки» таблицы сохраняются в пределах открытого приложения; знаки показывает активная панель. После перезапуска «Коллизии» отчёт или сессию нужно открыть заново.</p></details>
<details><summary>9. Большие проекты</summary><p>Жёсткого предела в 6 млн треугольников нет. При запуске строится индекс только по отмеченным моделям. Точная геометрия передаётся в расчёт по мере появления близких пар в компактном индексированном виде.</p><p>Время и память всё равно зависят от состава выборок и числа потенциальных пар. Разделяйте проверки по моделям и системам. В сцене одновременно показывается до 3000 знаков; при 50 000 результатах расчёт останавливается без замены прежнего результата.</p></details>`;
function _e(t) {
  let e = t.parentElement, n;
  for (; e && !n; )
    n = [...e.children].find(
      (r) => r.classList.contains("resizer-horizontal")
    ), e = e.parentElement;
  if (!n) return () => {
  };
  const s = n, o = t.ownerDocument.defaultView;
  let i;
  const a = () => {
    if (i === void 0) return;
    const r = i;
    i = void 0, s.dispatchEvent(
      new MouseEvent("mouseup", { bubbles: !0, composed: !0 })
    ), s.hasPointerCapture(r) && s.releasePointerCapture(r);
  }, f = (r) => {
    r.button === 0 && (i = r.pointerId, s.setPointerCapture(r.pointerId));
  };
  return s.addEventListener("pointerdown", f), s.addEventListener("pointerup", a), s.addEventListener("pointercancel", a), s.addEventListener("lostpointercapture", a), o.addEventListener("blur", a), () => {
    a(), s.removeEventListener("pointerdown", f), s.removeEventListener("pointerup", a), s.removeEventListener("pointercancel", a), s.removeEventListener("lostpointercapture", a), o.removeEventListener("blur", a);
  };
}
const Ge = "0.9.7", Ie = (t) => typeof t == "string" && /^data:image\/(jpeg|png);base64,[A-Za-z0-9+/=]+$/.test(t), Vt = {
  new: "Новый",
  active: "Активный",
  reviewed: "Проверенный",
  approved: "Подтверждённый",
  resolved: "Исправленный",
  excluded: "Исключённый"
}, Be = (t, e, n) => t.kind === "duplicate" || t.depth === "unmeasurable" || t.depth === "tolerance" || (t.penetrationMm ?? 0) + n >= e, Ae = () => ({
  models: [],
  modelsMode: "all",
  conditions: [],
  mode: "all",
  include: [],
  exclude: []
}), tn = () => ({
  id: crypto.randomUUID(),
  name: "Новая проверка",
  type: "intersection",
  a: Ae(),
  b: Ae(),
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
}), $e = ({
  triangles: t,
  vertices: e,
  indices: n,
  triangleCount: s,
  closed: o,
  bounds: i,
  ...a
}) => a;
function Kt(t, e) {
  return e.exclude.includes(t.id) ? !1 : e.include.includes(t.id) ? !0 : !(e.manualOnly || e.modelsMode === "selected" && !e.models.includes(t.modelId) || e.modelsMode === void 0 && e.models.length && !e.models.includes(t.modelId));
}
function We(t, e, n) {
  if (!e.manualOnly && e.modelsMode === "selected" && !e.models.length && !e.include.length)
    return "Не отмечены модели. Выберите файлы или включите «Все модели».";
  let s = 0;
  for (const o of t)
    if (Kt(o, e) && (s++, n || !o.hidden))
      return;
  return s ? `Все выбранные элементы (${s}) скрыты. Покажите их в модели или включите «Включать скрытые элементы» на вкладке «Правила».` : e.manualOnly ? "Ручная выборка пуста. Выделите элементы в 3D заново или нажмите «Сбросить ручной выбор»." : e.exclude.length ? "Нет элементов после ручных исключений. Проверьте исключения или нажмите «Сбросить ручной выбор»." : "В выбранных моделях нет доступных элементов. Обновите модели и проверьте состав выборки.";
}
const en = (t) => JSON.stringify([
  t.type,
  ...[t.a, t.b].map(
    ({
      models: e,
      modelsMode: n,
      conditions: s,
      mode: o,
      include: i,
      exclude: a,
      manualOnly: f
    }) => ({
      models: e,
      modelsMode: n,
      conditions: s,
      mode: o,
      include: i,
      exclude: a,
      manualOnly: f
    })
  ),
  t.precision,
  t.minPenetration,
  t.touching,
  t.ignoreSameModel,
  t.ignoreSameGroup,
  t.equalProperty,
  t.includeHidden
]), nn = (t, e) => JSON.stringify([t, e].sort());
function on(t, e, n) {
  const s = new Map(t.map((i) => [i.id, i])), o = e.map((i) => {
    const a = s.get(i.id);
    return s.delete(i.id), {
      ...i,
      note: a?.note ?? "",
      assignee: a?.assignee ?? "",
      firstSeen: a?.firstSeen ?? n,
      lastSeen: n,
      state: !a || a.state === "resolved" ? "new" : a.state === "new" ? "active" : a.state
    };
  });
  for (const i of s.values())
    o.push({
      ...i,
      state: i.state === "excluded" ? "excluded" : "resolved"
    });
  return o;
}
function Se(t) {
  const e = JSON.parse(t);
  if (e?.format !== "nashepo.checks" || e.version !== 1 || !Array.isArray(e.checks))
    throw Error("Это не файл проекта проверок НашеПО.");
  const n = /* @__PURE__ */ new Set();
  if (e.sets ??= [], !Array.isArray(e.sets) || !e.sets.every(
    (o) => o && typeof o.id == "string" && typeof o.name == "string" && o.selection && Array.isArray(o.selection.models) && o.selection.models.every((i) => typeof i == "string") && (o.selection.modelsMode === void 0 || ["all", "selected"].includes(o.selection.modelsMode)) && Array.isArray(o.selection.conditions) && o.selection.conditions.every(
      (i) => i && typeof i.field == "string" && typeof i.value == "string" && ["eq", "ne", "contains", "exists", "gt", "lt"].includes(
        i.op
      )
    ) && ["all", "any"].includes(o.selection.mode)
  ))
    throw Error("Некорректные наборы моделей.");
  const s = (o) => /\.wdx(?:[?#].*)?$/i.test(o);
  for (const o of e.sets)
    o.selection.models = o.selection.models.filter(
      (i) => !s(i)
    ), o.selection.conditions = [], o.selection.mode = "all", o.selection.modelsMode ??= o.selection.models.length ? "selected" : "all";
  for (const o of e.checks) {
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
    o.warnings ??= [], o.modelsAtRun = o.modelsAtRun?.filter((i) => !s(i));
    for (const i of [o.a, o.b]) {
      if (!i || i.manualOnly !== void 0 && typeof i.manualOnly != "boolean" || i.modelsMode !== void 0 && !["all", "selected"].includes(i.modelsMode) || i.presetId !== void 0 && typeof i.presetId != "string" || !["all", "any"].includes(i.mode) || ![i.models, i.include, i.exclude].every(
        (a) => Array.isArray(a) && a.every((f) => typeof f == "string")
      ) || !Array.isArray(i.conditions) || !i.conditions.every(
        (a) => a && typeof a.field == "string" && typeof a.value == "string" && ["eq", "ne", "contains", "exists", "gt", "lt"].includes(a.op)
      ))
        throw Error("Некорректная выборка.");
      i.modelsMode ??= i.models.length ? "selected" : "all", i.models = i.models.filter((a) => !s(a)), i.conditions = [], i.mode = "all";
    }
    for (const i of o.results) {
      if (i?.image !== void 0 && !Ie(i.image))
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
      for (const a of [i?.overlapThicknessMm, i?.axialPenetrationMm, i?.contactLengthMm])
        if (a !== void 0 && (!Number.isFinite(a) || a < 0))
          throw Error("Некорректный размер пересечения.");
      if (i?.axialElementId !== void 0 && (typeof i.axialElementId != "string" || ![i.a?.id, i.b?.id].includes(i.axialElementId)))
        throw Error("Некорректный элемент продольного замера.");
      if (!i || typeof i.id != "string" || !Object.hasOwn(Vt, i.state) || i.penetrationMm !== void 0 && (!Number.isFinite(i.penetrationMm) || i.penetrationMm < 0) || !Array.isArray(i.point) || i.point.length !== 3 || !i.point.every(Number.isFinite))
        throw Error("Некорректный результат.");
      for (const a of [i.a, i.b])
        if (!a || !["id", "name", "model", "modelId", "guid"].every(
          (f) => typeof a[f] == "string"
        ) || !a.properties || typeof a.properties != "object")
          throw Error("Некорректный элемент результата.");
    }
  }
  return e;
}
const R = (t, e) => [t[0] - e[0], t[1] - e[1], t[2] - e[2]], At = (t, e, n = 1) => [
  t[0] + e[0] * n,
  t[1] + e[1] * n,
  t[2] + e[2] * n
], V = (t, e) => t[0] * e[0] + t[1] * e[1] + t[2] * e[2], wt = (t, e) => [
  t[1] * e[2] - t[2] * e[1],
  t[2] * e[0] - t[0] * e[2],
  t[0] * e[1] - t[1] * e[0]
], _ = (t) => Math.hypot(...t), Tt = (t) => {
  const e = _(t);
  return e > 1e-20 ? [t[0] / e, t[1] / e, t[2] / e] : void 0;
}, Ut = (t) => t.triangleCount ?? (t.indices ? t.indices.length / 3 : t.triangles.length / 9), Et = (t, e, n) => t.indices && t.vertices ? t.vertices[t.indices[e * 3 + Math.floor(n / 3)] * 3 + n % 3] : t.triangles[e * 9 + n], gt = (t, e) => [0, 3, 6].map((n) => [
  Et(t, e, n),
  Et(t, e, n + 1),
  Et(t, e, n + 2)
]);
function _t(t) {
  const e = [1 / 0, 1 / 0, 1 / 0], n = [-1 / 0, -1 / 0, -1 / 0];
  for (let s = 0; s < t.length; s++) {
    const o = s % 3;
    e[o] = Math.min(e[o], t[s]), n[o] = Math.max(n[o], t[s]);
  }
  return { min: e, max: n };
}
const oe = (t, e, n) => t.min.every((s, o) => s <= e.max[o] + n && t.max[o] >= e.min[o] - n);
function we(t, e) {
  const n = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const f of e)
    for (let r = 0; r < 9; r++) {
      const c = r % 3, p = Et(t, f, r);
      n.min[c] = Math.min(n.min[c], p), n.max[c] = Math.max(n.max[c], p);
    }
  if (e.length <= 12) return { ...n, ids: e };
  const s = n.max.map((f, r) => f - n.min[r]), o = s.indexOf(Math.max(...s)), i = (f) => Et(t, f, o) + Et(t, f, o + 3) + Et(t, f, o + 6);
  e.sort((f, r) => i(f) - i(r));
  const a = e.length >> 1;
  return {
    ...n,
    left: we(t, e.slice(0, a)),
    right: we(t, e.slice(a))
  };
}
function* Wt(t, e, n) {
  oe(t, e, n) && (t.ids ? yield* t.ids : (yield* Wt(t.left, e, n), yield* Wt(t.right, e, n)));
}
function* Dt(t, e, n) {
  if (oe(t, e, n)) {
    if (t.ids && e.ids) {
      for (const s of t.ids) for (const o of e.ids) yield [s, o];
      return;
    }
    if (t.ids) {
      yield* Dt(t, e.left, n), yield* Dt(t, e.right, n);
      return;
    }
    if (e.ids) {
      yield* Dt(t.left, e, n), yield* Dt(t.right, e, n);
      return;
    }
    yield* Dt(t.left, e.left, n), yield* Dt(t.left, e.right, n), yield* Dt(t.right, e.left, n), yield* Dt(t.right, e.right, n);
  }
}
function le(t, e) {
  const n = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const a of e)
    for (let f = 0; f < 3; f++)
      n.min[f] = Math.min(n.min[f], t[a].bounds.min[f]), n.max[f] = Math.max(n.max[f], t[a].bounds.max[f]);
  if (e.length <= 16) return { ...n, ids: e };
  const s = n.max.map((a, f) => a - n.min[f]), o = s.indexOf(Math.max(...s));
  e.sort(
    (a, f) => t[a].bounds.min[o] + t[a].bounds.max[o] - (t[f].bounds.min[o] + t[f].bounds.max[o])
  );
  const i = e.length >> 1;
  return {
    ...n,
    left: le(t, e.slice(0, i)),
    right: le(t, e.slice(i))
  };
}
function ee(t, e, n, s) {
  const o = R(e, t), i = R(n[1], n[0]), a = R(n[2], n[0]), f = wt(o, a), r = V(i, f);
  if (Math.abs(r) <= 1e-12 * _(o) * _(i) * _(a)) return;
  const c = 1 / r, p = R(t, n[0]), h = V(p, f) * c, m = wt(p, i), x = V(o, m) * c, g = V(a, m) * c, v = s / Math.max(_(i), _(a), s);
  if (h >= -v && x >= -v && h + x <= 1 + v && g >= -v && g <= 1 + v)
    return At(t, o, Math.max(0, Math.min(1, g)));
}
function an(t, e, n, s) {
  const o = n.map(Math.abs).indexOf(Math.max(...n.map(Math.abs))), i = [0, 1, 2].filter((r) => r !== o), a = (r, c, p) => (c[i[0]] - r[i[0]]) * (p[i[1]] - r[i[1]]) - (c[i[1]] - r[i[1]]) * (p[i[0]] - r[i[0]]), f = (r, c) => {
    const p = c.map((h, m) => a(h, c[(m + 1) % 3], r));
    return p.every((h) => h >= -s * _(n)) || p.every((h) => h <= s * _(n));
  };
  for (const r of t) if (f(r, e)) return r;
  for (const r of e) if (f(r, t)) return r;
  for (let r = 0; r < 3; r++)
    for (let c = 0; c < 3; c++) {
      const p = t[r], h = t[(r + 1) % 3], m = e[c], x = e[(c + 1) % 3], g = R(h, p), v = R(x, m), q = g[i[0]] * v[i[1]] - g[i[1]] * v[i[0]];
      if (Math.abs(q) < 1e-18) continue;
      const E = R(m, p), k = (E[i[0]] * v[i[1]] - E[i[1]] * v[i[0]]) / q, A = (E[i[0]] * g[i[1]] - E[i[1]] * g[i[0]]) / q;
      if (k >= 0 && k <= 1 && A >= 0 && A <= 1) return At(p, g, k);
    }
}
function Ye(t, e, n, s) {
  for (let o = 0; o < 3; o++) {
    const i = ee(t[o], t[(o + 1) % 3], e, n);
    i && s.push(i);
    const a = ee(e[o], e[(o + 1) % 3], t, n);
    a && s.push(a);
  }
}
function Ze(t, e, n, s) {
  const o = wt(R(t[1], t[0]), R(t[2], t[0])), i = wt(R(e[1], e[0]), R(e[2], e[0])), a = _(o), f = _(i);
  if (a < 1e-20 || f < 1e-20) return;
  const r = e.map((p) => V(R(p, t[0]), o) / a), c = t.map((p) => V(R(p, e[0]), i) / f);
  if (!(r.every((p) => p > n) || r.every((p) => p < -n) || c.every((p) => p > n) || c.every((p) => p < -n))) {
    if (r.every((p) => Math.abs(p) <= n) && c.every((p) => Math.abs(p) <= n))
      return s ? an(t, e, o, n) : void 0;
    if (!(!s && (!(Math.min(...r) < -n && Math.max(...r) > n) || !(Math.min(...c) < -n && Math.max(...c) > n))))
      for (let p = 0; p < 3; p++) {
        const h = ee(t[p], t[(p + 1) % 3], e, n);
        if (h) return h;
        const m = ee(e[p], e[(p + 1) % 3], t, n);
        if (m) return m;
      }
  }
}
class sn {
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
    const n = Tt(wt(R(e[1], e[0]), R(e[2], e[0])));
    if (!n) return;
    const o = n[0] < -1e-9 || Math.abs(n[0]) <= 1e-9 && (n[1] < -1e-9 || Math.abs(n[1]) <= 1e-9 && n[2] < 0) ? [-n[0], -n[1], -n[2]] : [n[0], n[1], n[2]], i = this.key(o);
    for (this.items.has(i) || this.items.set(i, o); this.items.size > 512 && this.step > 10; ) {
      this.step /= 10;
      const a = /* @__PURE__ */ new Map();
      for (const f of this.items.values()) {
        const r = this.key(f);
        a.has(r) || a.set(r, f);
      }
      this.items = a;
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
function ne(t, e) {
  const n = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
  for (const o of t) {
    const i = [o[0] - e[0], o[1] - e[1], o[2] - e[2]];
    for (let a = 0; a < 3; a++)
      for (let f = 0; f < 3; f++) n[a][f] += i[a] * i[f];
  }
  const s = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ];
  for (let o = 0; o < 12; o++) {
    let i = 0;
    for (let a = 0; a < 3; a++)
      for (let f = a + 1; f < 3; f++) i += n[a][f] * n[a][f];
    if (i <= 1e-30) break;
    for (let a = 0; a < 3; a++)
      for (let f = a + 1; f < 3; f++) {
        if (Math.abs(n[a][f]) <= 1e-30) continue;
        const r = (n[f][f] - n[a][a]) / (2 * n[a][f]), c = (r >= 0 ? 1 : -1) / (Math.abs(r) + Math.sqrt(r * r + 1)), p = 1 / Math.sqrt(c * c + 1), h = c * p;
        for (const m of [n, s])
          for (let x = 0; x < 3; x++) {
            const g = m[x][a], v = m[x][f];
            m[x][a] = p * g - h * v, m[x][f] = h * g + p * v;
          }
        for (let m = 0; m < 3; m++) {
          const x = n[a][m], g = n[f][m];
          n[a][m] = p * x - h * g, n[f][m] = h * x + p * g;
        }
      }
  }
  return [0, 1, 2].sort((o, i) => n[i][i] - n[o][o]).map((o) => Tt([s[0][o], s[1][o], s[2][o]])).filter((o) => !!o);
}
function rn(t, e, n, s) {
  const o = e.min.map((p, h) => (p + e.max[h]) / 2), i = _(R(e.max, e.min)), a = Math.max(n * 10, i / 50), f = (p) => [0, 1, 2].map(
    (h) => p.reduce((m, x) => m + x[h], 0) / p.length
  );
  let r = [{ hits: t, limits: [] }], c = !1;
  for (let p = 0; p < 12; p++) {
    const h = [];
    let m = !1;
    for (const x of r) {
      if (x.hits.length < 2) {
        h.push(x);
        continue;
      }
      if (h.length + r.length >= 64) {
        c = !0, h.push(x);
        continue;
      }
      const g = f(x.hits), v = [
        g,
        o,
        ...[0, 0.25, 0.5, 0.75].map(
          (l) => x.hits[Math.floor(l * (x.hits.length - 1))]
        )
      ], q = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ], E = ne(x.hits, g);
      E[0] && q.push(E[0]);
      const k = (l) => {
        let M = -1 / 0, $ = 1 / 0;
        for (const O of x.hits) {
          const T = V(O, l);
          T > M && (M = T), T < $ && ($ = T);
        }
        return M - $;
      }, A = (l) => Math.max(
        0,
        ...E.filter((M) => Math.abs(V(M, l)) < 0.9).map((M) => k(M))
      ), S = (l) => {
        const M = x.hits.map((O) => V(O, l)).sort((O, T) => O - T), $ = [];
        for (let O = 1; O < M.length; O++) {
          const T = M[O] - M[O - 1];
          T > a && $.push({ at: (M[O] + M[O - 1]) / 2, size: T });
        }
        return $.sort((O, T) => T.size - O.size);
      };
      let N, L = 0;
      for (const l of q) {
        const M = S(l);
        !M.length || M[0].size <= L || M[0].size <= A(l) || (L = M[0].size, s(l, M[0].at, v) && (N = { n: l, cuts: [M[0].at] }));
      }
      if (!N) {
        h.push(x);
        continue;
      }
      m = !0;
      const { n: B, cuts: D } = N, j = Array.from({ length: D.length + 1 }, () => []);
      for (const l of x.hits) {
        const M = V(l, B);
        let $ = 0;
        for (; $ < D.length && M >= D[$]; ) $++;
        j[$].push(l);
      }
      j.forEach(
        (l, M) => h.push({
          hits: l,
          limits: [
            ...x.limits,
            {
              n: B,
              from: M ? D[M - 1] : -1 / 0,
              to: M < D.length ? D[M] : 1 / 0
            }
          ]
        })
      );
    }
    if (r = h, m && p === 11 && (c = !0), !m) break;
  }
  return { zones: r, crowded: c };
}
function Ce(t, e, n) {
  return n.every(({ n: s, from: o, to: i }) => {
    let a = 1 / 0, f = -1 / 0;
    for (let r = 0; r < 9; r += 3) {
      const c = Et(t, e, r) * s[0] + Et(t, e, r + 1) * s[1] + Et(t, e, r + 2) * s[2];
      c < a && (a = c), c > f && (f = c);
    }
    return f >= o && a <= i;
  });
}
function ze(t, e, n, s, o, i, a, f, r, c, p, h = !1) {
  let m = !1;
  const x = (D) => {
    let j = -1 / 0, l = 1 / 0;
    const M = ($) => {
      $ > j && (j = $), $ < l && (l = $);
    };
    for (const $ of r) M(V($, D));
    for (const [$, O, T] of [
      [t, n, 1],
      [e, s, 0]
    ]) {
      const P = Math.max(1, Math.floor(O.length / 32));
      P > 1 && (m = !0);
      for (let w = 0; w < O.length; w += P)
        for (const C of gt($, O[w])) p(T, C) && M(V(C, D));
    }
    return Number.isFinite(j) && Number.isFinite(l) ? j - l : 0;
  }, g = (D) => {
    let j = 1 / 0, l = -1 / 0;
    for (let M = 0; M < 8; M++) {
      const $ = (M & 1 ? a.max[0] : a.min[0]) * D[0] + (M & 2 ? a.max[1] : a.min[1]) * D[1] + (M & 4 ? a.max[2] : a.min[2]) * D[2];
      $ < j && (j = $), $ > l && (l = $);
    }
    return [j, l];
  }, v = (D, j, l, M, $) => {
    let O = 1 / 0, T = -1 / 0;
    for (const P of j) {
      let w = 1 / 0, C = -1 / 0;
      for (let W = 0; W < 9; W += 3) {
        const X = Et(D, P, W) * l[0] + Et(D, P, W + 1) * l[1] + Et(D, P, W + 2) * l[2];
        X < w && (w = X), X > C && (C = X);
      }
      C < M || w > $ || (w < M && (w = M), C > $ && (C = $), w < O && (O = w), C > T && (T = C));
    }
    return O === 1 / 0 ? void 0 : [O, T];
  };
  if (a.min.some((D, j) => a.max[j] - D <= 0))
    return { width: 0, thin: !1, approximate: !1 };
  const q = Math.ceil((n.length + s.length) / 4096), E = [
    ...o,
    ...q > 1 ? i.filter((D, j) => j < 3 || j % q === 0) : i
  ];
  q > 1 && E.length < o.length + i.length && (m = !0);
  const k = (D, j, l, M, $) => {
    const O = (w) => At(f, l, w - V(f, l));
    if (!j) return p(D, O((M + $) / 2)) ? [M, $] : void 0;
    let [T, P] = j;
    return T > M && p(D, O((M + T) / 2)) && (T = M), P < $ && p(D, O((P + $) / 2)) && (P = $), [T, P];
  }, A = (D, j) => D && j ? Math.min(D[1], j[1]) - Math.max(D[0], j[0]) : 0;
  let S = 1 / 0, N = !1, L = !1, B = 0;
  for (let D = 0; D < E.length; D++) {
    const j = E[D], [l, M] = g(j), $ = v(t, n, j, l, M), O = v(e, s, j, l, M);
    let T = A($, O);
    if (T <= 0 && (B++ < 32 ? T = A(k(0, $, j, l, M), k(1, O, j, l, M)) : m = !0), h && r.length > 1) {
      let P = 1 / 0, w = -1 / 0;
      for (const C of r) {
        const W = V(C, j);
        P = Math.min(P, W), w = Math.max(w, W);
      }
      T = Math.max(T, w - P);
    }
    if (T <= c && (D < o.length && B < 40 && (B++, T = x(j)), T <= c)) {
      D < o.length && (L = !0);
      continue;
    }
    N = !0, T < S && (S = T);
  }
  return {
    width: N && Number.isFinite(S) ? S : 0,
    thin: L,
    approximate: m
  };
}
const Lt = (t) => Math.max(1e-10, Math.max(1, ...t.bounds.min.map(Math.abs), ...t.bounds.max.map(Math.abs)) * Number.EPSILON * 64);
async function ln(t, e, n) {
  const s = Lt(t), o = Ut(t), i = { closed: !1, approximate: !1 }, a = new Uint32Array(o), f = new Uint8Array(o), r = new Uint8Array(o), c = new Uint8Array(o);
  for (let l = 0; l < o; l++) a[l] = l;
  const p = (l) => {
    if (a[l] !== l) {
      const M = a[l];
      a[l] = p(M), r[l] ^= r[M];
    }
    return a[l];
  }, h = (l, M, $) => {
    let O = p(l), T = p(M);
    const P = r[l] ^ r[M] ^ $;
    return O === T ? P === 0 : (f[O] < f[T] && ([O, T] = [T, O]), a[T] = O, r[T] = P, f[O] === f[T] && f[O]++, !0);
  }, m = /* @__PURE__ */ new Map(), x = [], g = /* @__PURE__ */ new Map(), v = o * 3, q = v * v <= Number.MAX_SAFE_INTEGER, E = (l, M) => q ? l * v + M : `${l},${M}`, k = (l, M) => {
    const $ = l.map((T, P) => Math.round((T - t.bounds.min[P]) / s)).join(",");
    let O = m.get($);
    return O === void 0 && (O = m.size, m.set($, O), x.push(M)), O;
  };
  for (let l = 0; l < o; l++) {
    l % 2048 === 0 && await e();
    const M = gt(t, l);
    if (_(wt(R(M[1], M[0]), R(M[2], M[0]))) <= s * s) continue;
    const $ = M.map((O, T) => k(O, l * 3 + T));
    if (new Set($).size === 3) {
      c[l] = 1;
      for (let O = 0; O < 3; O++) {
        const T = $[O], P = $[(O + 1) % 3], w = T < P, C = w ? E(T, P) : E(P, T), W = g.get(C);
        if (W === void 0) g.set(C, (l + 1) * (w ? 1 : -1));
        else {
          if (W === 0 || !h(l, Math.abs(W) - 1, +(W > 0 === w))) return i;
          g.set(C, 0);
        }
      }
    }
  }
  const A = (l) => {
    const M = x[l];
    return [0, 1, 2].map(($) => Et(t, Math.floor(M / 3), M % 3 * 3 + $));
  }, S = [];
  for (const [l, M] of g) if (M !== 0) {
    const $ = typeof l == "number" ? [Math.floor(l / v), l % v] : l.split(",").map(Number), O = A($[0]), T = A($[1]);
    S.push({ p: O, q: T, face: M, bounds: _t([...O, ...T]) }), S.length % 2048 === 0 && await e();
  }
  m.clear(), g.clear(), x.length = 0;
  let N = !1;
  if (S.length) {
    const l = Math.max(s, Math.min(1e-5, n)), M = le(S, S.map(($, O) => O));
    for (let $ = 0; $ < S.length; $++) {
      $ % 128 === 0 && await e();
      const O = S[$], T = R(O.q, O.p), P = _(T), w = Tt(T), C = [];
      for (const X of Wt(M, O.bounds, l)) {
        if ($ === X) continue;
        const lt = S[X], nt = R(lt.p, O.p), Ft = R(lt.q, O.p), H = V(nt, w), J = V(Ft, w), pt = Math.max(0, Math.min(H, J)), rt = Math.min(P, Math.max(H, J));
        if (rt - pt <= s) continue;
        const vt = Math.max(_(At(nt, w, -H)), _(At(Ft, w, -J)));
        if (vt > l) continue;
        const dt = J > H == (O.face > 0 == lt.face > 0);
        if (!h(Math.abs(O.face) - 1, Math.abs(lt.face) - 1, Number(dt))) return i;
        vt > s && (N = !0), C.push([pt, rt]);
      }
      C.sort((X, lt) => X[0] - lt[0]);
      let W = 0;
      for (const [X, lt] of C) {
        if (Math.abs(X - W) > s) return i;
        W = lt;
      }
      if (Math.abs(W - P) > s) return i;
    }
  }
  const L = new Float64Array(o), B = new Float64Array(o), D = t.bounds.min.map((l, M) => (l + t.bounds.max[M]) / 2);
  for (let l = 0; l < o; l++) {
    if (l % 2048 === 0 && await e(), !c[l]) continue;
    const M = p(l), $ = gt(t, l);
    L[M] += (r[l] ? -1 : 1) * V(R($[0], D), wt(R($[1], D), R($[2], D))) / 6, B[M] += _(wt(R($[1], $[0]), R($[2], $[0]))) / 2;
  }
  let j = 0;
  for (let l = 0; l < o; l++) {
    if (B[l] && Math.abs(L[l]) <= s * B[l]) return i;
    j += Math.abs(L[l]);
  }
  return { closed: j > 0, approximate: N };
}
function cn(t, e, n) {
  const s = R(e[1], e[0]), o = R(e[2], e[0]), i = wt(s, o), a = _(i);
  if (a < 1e-20 || Math.abs(V(R(t, e[0]), i)) / a > n) return !1;
  const f = R(t, e[0]), r = V(s, s), c = V(s, o), p = V(o, o), h = V(f, s), m = V(f, o), x = r * p - c * c;
  if (Math.abs(x) < 1e-30) return !1;
  const g = (h * p - m * c) / x, v = (m * r - h * c) / x, q = n / Math.max(_(s), _(o), n);
  return g >= -q && v >= -q && g + v <= 1 + q;
}
function ce(t, e, n, s) {
  for (const o of Wt(n, { min: t, max: t }, s))
    if (cn(t, gt(e, o), s)) return !0;
  return !1;
}
const Bt = (t) => t.closed || t.interior === "winding";
function ve(t, e, n, s = !1) {
  const o = (a) => {
    if (a.moment) return a.moment;
    const f = [0, 0, 0];
    if (a.ids)
      for (const r of a.ids) {
        const c = gt(e, r), p = wt(R(c[1], c[0]), R(c[2], c[0]));
        for (let h = 0; h < 3; h++) f[h] += p[h] / 2;
      }
    else {
      const r = o(a.left), c = o(a.right);
      for (let p = 0; p < 3; p++) f[p] = r[p] + c[p];
    }
    return a.moment = f;
  }, i = (a) => {
    const f = a.min.map((m, x) => (m + a.max[x]) / 2), r = R(f, t), c = _(r), p = _(R(a.max, a.min)) / 2;
    if (!s && c > p * 10 && c > 0)
      return V(o(a), r) / (c * c * c);
    if (!a.ids) return i(a.left) + i(a.right);
    let h = 0;
    for (const m of a.ids) {
      const x = gt(e, m), g = R(x[0], t), v = R(x[1], t), q = R(x[2], t), E = _(g), k = _(v), A = _(q);
      !E || !k || !A || (h += 2 * Math.atan2(V(g, wt(v, q)), E * k * A + V(g, v) * A + V(v, q) * E + V(q, g) * k));
    }
    return h;
  };
  return i(n) / (4 * Math.PI);
}
async function dn(t, e, n) {
  const s = Lt(t), o = (r) => !ce(r, t, e, s) && Math.abs(ve(r, t, e)) > 0.9, i = t.bounds.min.map((r, c) => (r + t.bounds.max[c]) / 2);
  if (o(i)) return !0;
  const a = Ut(t), f = Math.max(1, Math.ceil(a / 32));
  for (let r = 0; r < a; r += f) {
    await n();
    const c = gt(t, r), p = Tt(wt(R(c[1], c[0]), R(c[2], c[0])));
    if (!p) continue;
    const h = [0, 1, 2].map((x) => (c[0][x] + c[1][x] + c[2][x]) / 3), m = Math.max(s * 8, Math.min(_(R(c[0], c[1])), _(R(c[1], c[2])), _(R(c[2], c[0]))) * 0.01);
    if (o(At(h, p, m)) || o(At(h, p, -m))) return !0;
  }
  return !1;
}
function Zt(t, e, n, s) {
  if (!Bt(e) || t.some((h, m) => h < e.bounds.min[m] - s || h > e.bounds.max[m] + s) || ce(t, e, n, s)) return !1;
  if (e.interior === "winding") {
    const h = Math.abs(ve(t, e, n));
    return Math.abs(h - 0.5) < 0.05 ? Math.abs(ve(t, e, n, !0)) > 0.5 : h > 0.5;
  }
  const o = [1, 0.371390676, 0.52999894], i = _(R(e.bounds.max, e.bounds.min)) * 3 + 1, a = At(t, o, i), f = [], r = _t([...t, ...a]);
  for (const h of Wt(n, r, s)) {
    const m = ee(t, a, gt(e, h), s);
    if (m) {
      const x = _(R(m, t));
      x > s && f.push(x);
    }
  }
  f.sort((h, m) => h - m);
  let c = 0, p = -1 / 0;
  for (const h of f)
    h - p > s * 2 && (c++, p = h);
  return c % 2 === 1;
}
const de = (t) => /отвод|тройник|муфт|фитинг|elbow|fitting|tee\b/i.test(t.name);
async function fn(t, e) {
  if (de(t)) return;
  const n = Ut(t), s = Math.max(1, Math.ceil(n / 4096)), o = t.bounds.min.map((j, l) => (j + t.bounds.max[l]) / 2), i = [], a = [];
  for (let j = 0; j < n; j += s) {
    j % (s * 256) === 0 && await e();
    const l = gt(t, j), M = wt(R(l[1], l[0]), R(l[2], l[0])), $ = _(M);
    $ && (i.push(...l), a.push({ n: M.map((O) => O / $), area: $ }));
  }
  if (i.length < 12) return;
  let f = ne(i, o)[0];
  const r = a.filter(({ n: j }) => Math.abs(V(j, f)) < 0.2);
  if (r.length < 4) return;
  const c = ne(r.map(({ n: j }) => j), [0, 0, 0])[2];
  if (Math.abs(V(c, f)) < 0.98) return;
  f = c;
  const p = f.map(Math.abs).indexOf(Math.max(...f.map(Math.abs)));
  f[p] < 0 && (f = f.map((j) => -j));
  const h = Math.abs(f[0]) < 0.7 ? [1, 0, 0] : [0, 1, 0], m = Tt(wt(f, h)), x = wt(f, m), g = [1 / 0, 1 / 0, 1 / 0], v = [-1 / 0, -1 / 0, -1 / 0];
  for (const j of i) for (const [l, M] of [f, m, x].entries()) {
    const $ = V(R(j, o), M);
    g[l] = Math.min(g[l], $), v[l] = Math.max(v[l], $);
  }
  const q = v[0] - g[0], E = Math.max(v[1] - g[1], v[2] - g[2]), k = Math.min(v[1] - g[1], v[2] - g[2]);
  if (k <= Lt(t) * 8 || q + Lt(t) < E * 4 || E > k * 4) return;
  let A = 0, S = 0;
  const N = /* @__PURE__ */ new Set();
  for (const { n: j, area: l } of a) {
    const M = Math.abs(V(j, f));
    S += l, (M < 0.015 || M > 0.999) && (A += l), M < 0.015 && N.add(j.map(($) => Math.round($ * 100)).join(","));
  }
  if (A < S * 0.995) return;
  const L = [];
  for (let j = 0; j < i.length; j += 3) {
    const l = i.slice(j, j + 3).map((M) => V(R(M, o), f));
    L.push([Math.min(...l), Math.max(...l)]);
  }
  L.sort((j, l) => j[0] - l[0]);
  let B = g[0];
  for (const [j, l] of L) {
    if (j > B + Lt(t) * 4) return;
    B = Math.max(B, l);
  }
  const D = At(At(o, m, (g[1] + v[1]) / 2), x, (g[2] + v[2]) / 2);
  return {
    axis: f,
    centre: D,
    from: g[0],
    to: v[0],
    width: E,
    round: N.size >= 6 && E < k * 1.2,
    sampled: s > 1
  };
}
async function pn(t, e) {
  if (de(t) || !/кабел|труб|cable|pipe/i.test(t.name)) return [];
  const n = Lt(t), s = [], o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), a = (k) => {
    const A = k.map((N, L) => Math.round((N - t.bounds.min[L]) / n)).join(",");
    let S = o.get(A);
    return S === void 0 && (S = s.length, s.push(k), o.set(A, S)), S;
  };
  for (let k = 0; k < Ut(t); k++) {
    k % 1024 === 0 && await e();
    const A = gt(t, k).map(a);
    for (let S = 0; S < 3; S++) {
      const N = Math.min(A[S], A[(S + 1) % 3]), L = Math.max(A[S], A[(S + 1) % 3]);
      N !== L && i.set(`${N},${L}`, [N, L, _(R(s[N], s[L]))]);
    }
  }
  const f = [...i.values()].map((k) => k[2]).filter((k) => k > n).sort((k, A) => k - A);
  if (!f.length) return [];
  const r = f[Math.floor(f.length * 0.1)] * 1.25, c = Int32Array.from({ length: s.length }, (k, A) => A), p = (k) => {
    for (; c[k] !== k; )
      c[k] = c[c[k]], k = c[k];
    return k;
  };
  let h = 0;
  for (const [k, A, S] of i.values())
    ++h % 4096 === 0 && await e(), S <= r && (c[p(A)] = p(k));
  const m = /* @__PURE__ */ new Map();
  for (let k = 0; k < s.length; k++) {
    const A = p(k), S = m.get(A);
    S ? S.push(s[k]) : m.set(A, [s[k]]);
  }
  const x = /* @__PURE__ */ new Map();
  for (const [k, A] of m) {
    if (await e(), A.length < 6 || A.length > 256) continue;
    const S = A[0], N = [0, 1, 2].map((j) => S[j] + A.reduce((l, M) => l + M[j] - S[j], 0) / A.length), L = A.map((j) => _(R(j, N))), B = Math.max(...L), D = ne(A, N)[2];
    !D || B <= n || Math.min(...L) < B * 0.88 || A.some((j) => Math.abs(V(R(j, N), D)) > Math.max(n * 16, B * 2e-3)) || x.set(k, { centre: N, radius: B, normal: D });
  }
  const g = /* @__PURE__ */ new Map();
  for (const [k, A] of i.values()) {
    ++h % 4096 === 0 && await e();
    const S = Math.min(p(k), p(A)), N = Math.max(p(k), p(A));
    if (S === N || !x.has(S) || !x.has(N)) continue;
    const L = `${S},${N}`, B = g.get(L);
    B ? B.count++ : g.set(L, { a: S, b: N, count: 1 });
  }
  const v = /* @__PURE__ */ new Map();
  for (const { a: k, b: A, count: S } of g.values()) {
    const N = x.get(k), L = x.get(A), B = Tt(R(L.centre, N.centre));
    S < 6 || !B || Math.min(N.radius, L.radius) < Math.max(N.radius, L.radius) * 0.8 || Math.abs(V(B, N.normal)) < 0.5 || Math.abs(V(B, L.normal)) < 0.5 || (v.set(k, [...v.get(k) || [], A]), v.set(A, [...v.get(A) || [], k]));
  }
  const q = /* @__PURE__ */ new Set(), E = [];
  for (const [k, A] of v) {
    if (A.length !== 1 || q.has(k)) continue;
    let S = k, N = -1;
    const L = [];
    for (; !q.has(S); ) {
      q.add(S);
      const B = v.get(S) || [];
      if (B.length > 2) break;
      const D = B.find((O) => O !== N);
      if (D === void 0 || q.has(D)) break;
      const j = x.get(S), l = x.get(D), M = R(l.centre, j.centre), $ = _(M);
      $ > n && L.push({
        axis: M.map((O) => O / $),
        centre: j.centre,
        from: 0,
        to: $,
        width: Math.max(j.radius, l.radius) * 2,
        round: !0,
        sampled: !0
      }), N = S, S = D;
    }
    L.length && E.push(L);
  }
  return E;
}
async function un(t, e) {
  const n = Ut(t), s = Int32Array.from({ length: n }, (r, c) => c), o = new Uint8Array(n), i = /* @__PURE__ */ new Map(), a = Lt(t), f = (r) => {
    for (; s[r] !== r; )
      s[r] = s[s[r]], r = s[r];
    return r;
  };
  for (let r = 0; r < n; r++) {
    r % 2048 === 0 && await e();
    for (const c of gt(t, r)) {
      const p = c.map((g, v) => Math.round((g - t.bounds.min[v]) / a)).join(","), h = i.get(p);
      if (h === void 0) {
        i.set(p, r);
        continue;
      }
      let m = f(r), x = f(h);
      m !== x && (o[m] < o[x] && ([m, x] = [x, m]), s[x] = m, o[m] === o[x] && o[m]++);
    }
  }
  for (let r = 0; r < n; r++) s[r] = f(r);
  return s;
}
async function mn(t, e, n, s, o) {
  const { axis: i, centre: a } = t, f = Math.abs(i[0]) < 0.7 ? [1, 0, 0] : [0, 1, 0], r = Tt(wt(i, f)), c = wt(i, r), p = [1 / 0, 1 / 0, 1 / 0], h = [-1 / 0, -1 / 0, -1 / 0], m = Lt(e);
  for (let S = 0; S < Ut(e); S++) {
    S % 2048 === 0 && await s();
    for (const N of gt(e, S)) for (const [L, B] of [i, r, c].entries()) {
      const D = V(R(N, a), B);
      p[L] = Math.min(p[L], D), h[L] = Math.max(h[L], D);
    }
  }
  if (h[1] - p[1] < t.width * 2.5 || h[2] - p[2] < t.width * 2.5) return [];
  const x = Math.max(1, h[0] - p[0]), g = At(a, i, p[0] - x), v = At(a, i, h[0] + x), q = [];
  let E = 0;
  for (const S of Wt(n, _t([...g, ...v]), m)) {
    ++E % 256 === 0 && await s();
    const N = ee(g, v, gt(e, S), m);
    N && q.push({ triangle: S, at: V(R(N, a), i) });
  }
  if (q.length < 2) return [];
  const k = await o(), A = /* @__PURE__ */ new Map();
  for (const S of q) {
    const N = k[S.triangle], L = A.get(N);
    L ? (L[0] = Math.min(L[0], S.at), L[1] = Math.max(L[1], S.at)) : A.set(N, [S.at, S.at]);
  }
  return [...A].map(([S, [N, L]]) => ({ part: S, from: Math.max(t.from, N), to: Math.min(t.to, L) })).filter(({ from: S, to: N }) => N - S > m);
}
async function hn(t, e, n, s, o) {
  let i = 0;
  const a = Lt(e);
  for (const f of t) {
    let r = 0;
    const c = /* @__PURE__ */ new Map();
    for (const p of f) {
      await s();
      for (const h of await mn(p, e, n, s, o)) {
        const m = c.get(h.part) || [];
        m.push([r + h.from - p.from, r + h.to - p.from]), c.set(h.part, m);
      }
      r += p.to - p.from;
    }
    for (const p of c.values()) {
      p.sort((x, g) => x[0] - g[0]);
      let h = p[0][0], m = p[0][1];
      for (const [x, g] of p.slice(1))
        x <= m + a * 4 ? m = Math.max(m, g) : (i = Math.max(i, m - h), h = x, m = g);
      i = Math.max(i, m - h);
    }
  }
  return i > a ? i * 1e3 : void 0;
}
function gn(t, e, n) {
  const s = Tt(wt(R(e[1], e[0]), R(e[2], e[0])));
  if (!s) return [];
  if (t.some((i) => Math.abs(V(R(i, e[0]), s)) > n)) {
    const i = [];
    return Ye(t, e, n, i), i;
  }
  let o = t;
  for (let i = 0; i < 3 && o.length; i++) {
    const a = e[i], f = R(e[(i + 1) % 3], a), r = Tt(wt(s, f));
    if (!r) return [];
    const c = [];
    for (let p = 0; p < o.length; p++) {
      const h = o[p], m = o[(p + 1) % o.length], x = V(R(h, a), r), g = V(R(m, a), r);
      x >= -n && c.push(h), x >= -n != g >= -n && c.push(At(h, R(m, h), Math.max(0, Math.min(1, x / (x - g)))));
    }
    o = c;
  }
  return o;
}
async function bn(t, e, n, s, o, i) {
  const a = Math.max(Lt(e), Lt(n)), f = t.map(() => []), r = t.map((m) => {
    let x = 0;
    return m.map((g) => {
      const v = { p: g, offset: x };
      return x += g.to - g.from, v;
    });
  }), c = (m, x, g) => {
    let v = 0, q = m.length;
    for (; v < q; ) {
      const k = v + q >> 1;
      m[k][1] < x - a * 4 ? v = k + 1 : q = k;
    }
    let E = v;
    for (; E < m.length && m[E][0] <= g + a * 4; )
      x = Math.min(x, m[E][0]), g = Math.max(g, m[E][1]), E++;
    m.splice(v, E - v, [x, g]);
  };
  let p = 0;
  for (const [m, x] of Dt(s, o, a)) {
    ++p % 256 === 0 && await i();
    const g = gt(e, m), v = gt(n, x);
    if (!Ze(g, v, a, !0)) continue;
    const q = gn(g, v, a);
    if (!(q.length < 2))
      for (let E = 0; E < r.length; E++) for (const { p: k, offset: A } of r[E]) {
        const S = q.map((B) => V(R(B, k.centre), k.axis)), N = Math.max(k.from, Math.min(...S)), L = Math.min(k.to, Math.max(...S));
        L - N <= a || q.some((B, D) => {
          const j = Math.max(k.from, Math.min(k.to, S[D]));
          return _(R(B, At(k.centre, k.axis, j))) <= k.width * 0.7 + a;
        }) && c(f[E], A + N - k.from, A + L - k.from);
      }
  }
  let h = 0;
  for (const m of f) for (const [x, g] of m) h = Math.max(h, g - x);
  return h > a ? h * 1e3 : void 0;
}
async function xn(t, e, n, s, o) {
  const i = e.precision / 1e3;
  if (!Number.isFinite(i) || i <= 0)
    throw Error("Точность расчёта должна быть положительным числом.");
  const a = t.filter((w) => e.includeHidden || !w.hidden), f = a.filter((w) => Kt(w, e.a)), r = a.filter((w) => Kt(w, e.b));
  if (!f.length || !r.length) {
    const w = f.length ? "Б" : "А", C = f.length ? e.b : e.a;
    throw Error(`Выбор ${w}: ${We(t, C, e.includeHidden)}`);
  }
  let c = performance.now();
  const p = async () => {
    if (s())
      throw Error("Расчёт отменён. Предыдущие результаты сохранены.");
    performance.now() - c > 16 && (await new Promise((w) => setTimeout(w, 0)), c = performance.now());
  }, h = /* @__PURE__ */ new Map(), m = (w) => {
    let C = h.get(w.id);
    return C || (C = we(
      w,
      Array.from({ length: Ut(w) }, (W, X) => X)
    ), h.set(w.id, C)), C;
  }, x = /* @__PURE__ */ new Map(), g = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new Map(), q = async (w) => {
    let C = v.get(w.id);
    return C || (C = await pn(w, p), v.set(w.id, C)), C;
  }, E = /* @__PURE__ */ new Map(), k = async (w) => {
    let C = E.get(w.id);
    return C || (C = await un(w, p), E.set(w.id, C)), C;
  }, A = async (w) => (g.has(w.id) || g.set(w.id, await fn(w, p)), g.get(w.id)), S = async (w) => {
    if (e.type !== "intersection") return w;
    let C = x.get(w.id);
    return C === void 0 && (C = await ln(w, p, i), !C.closed && await dn(w, m(w), p) && (C = { closed: !1, approximate: !0, winding: !0 }), x.set(w.id, C)), C.winding ? { ...w, closed: !1, interior: "winding" } : C.closed === w.closed ? w : { ...w, closed: C.closed };
  }, N = /* @__PURE__ */ new Map(), L = async (w) => {
    let C = N.get(w.id);
    if (C !== void 0) return C;
    const W = [];
    for (let X = 0; X < Ut(w); X++)
      W.push(
        [0, 3, 6].map(
          (lt) => [0, 1, 2].map((nt) => Math.round(Et(w, X, lt + nt) / i)).join(",")
        ).sort().join(";")
      ), X % 9e3 === 0 && await p();
    return C = W.sort().join("|"), N.set(w.id, C), C;
  }, B = [], D = new Set(f.map((w) => w.id)), j = new Set(r.map((w) => w.id)), l = le(
    r,
    r.map((w, C) => C)
  ), M = /* @__PURE__ */ new Map();
  let $ = 0;
  const O = (w) => w.triangles.byteLength + (w.vertices?.byteLength || 0) + (w.indices?.byteLength || 0) + Ut(w) * 32;
  async function T(w, C) {
    if (!o) return w;
    let W = M.get(w.id);
    if (W)
      return M.delete(w.id), M.set(w.id, W), W;
    for (const [X, lt] of M)
      X !== C && $ > 96 * 1024 * 1024 && (M.delete(X), $ -= O(lt), h.delete(X), E.delete(X), v.delete(X), N.delete(X));
    return W = await o(w.id), M.set(w.id, W), $ += O(W), W;
  }
  let P = -1 / 0;
  for (let w = 0; w < f.length; w++) {
    const C = f[w];
    performance.now() - P > 150 && (P = performance.now(), n({
      phase: "Проверка пар",
      done: w,
      total: f.length,
      found: B.length
    }));
    const W = [...Wt(l, C.bounds, i)];
    for (let X = 0; X < W.length; X++) {
      const lt = W[X];
      performance.now() - P > 150 && (P = performance.now(), n({
        phase: `Проверка пар · A ${w + 1}/${f.length} · кандидаты ${X + 1}/${W.length}`,
        done: w,
        total: f.length,
        found: B.length
      }));
      const nt = r[lt];
      if (await p(), C.id === nt.id || !oe(C.bounds, nt.bounds, i) || e.ignoreSameModel && C.modelId === nt.modelId || e.ignoreSameGroup && C.modelId === nt.modelId && C.properties.Объект && C.properties.Объект === nt.properties.Объект || e.equalProperty && C.properties[e.equalProperty] !== void 0 && C.properties[e.equalProperty] === nt.properties[e.equalProperty] || C.id > nt.id && D.has(nt.id) && j.has(C.id)) continue;
      const Ft = nn(C.id, nt.id), H = await S(await T(C)), J = await S(await T(nt, C.id));
      let pt, rt = "surface", vt = 0, dt, zt, ht, $t, K;
      if (e.type === "duplicates") {
        if (Ut(H) !== Ut(J) || H.bounds.min.some(
          (xt, ot) => Math.abs(xt - J.bounds.min[ot]) > i || Math.abs(H.bounds.max[ot] - J.bounds.max[ot]) > i
        ))
          continue;
        await L(H) === await L(J) && (pt = H.bounds.min.map((xt, ot) => (xt + H.bounds.max[ot]) / 2), rt = "duplicate");
      } else {
        const xt = m(H), ot = m(J), ft = Math.max(
          1,
          ...H.bounds.min.map(Math.abs),
          ...H.bounds.max.map(Math.abs),
          ...J.bounds.min.map(Math.abs),
          ...J.bounds.max.map(Math.abs)
        ), it = Math.max(1e-10, ft * Number.EPSILON * 64), at = {
          min: H.bounds.min.map(
            (bt, et) => Math.max(bt, J.bounds.min[et])
          ),
          max: H.bounds.max.map(
            (bt, et) => Math.min(bt, J.bounds.max[et])
          )
        }, Nt = at.min.map(
          (bt, et) => (bt + at.max[et]) / 2
        ), Rt = new sn(), yt = [];
        let Ot = 1, Yt = 0, ae = 1 / 0, pe = 0;
        for (const [bt, et] of Dt(xt, ot, i)) {
          const It = gt(H, bt), Ct = gt(J, et);
          if (!oe(_t(It.flat()), _t(Ct.flat()), i)) continue;
          const Mt = Ze(It, Ct, it, e.touching);
          if (Mt) {
            const Pt = _(R(Mt, Nt));
            if ((!pt || Pt < ae) && (pt = Mt, ae = Pt), Rt.add(It), Rt.add(Ct), Yt++ % Ot === 0 && (Ye(It, Ct, it, yt), yt.length || yt.push(Mt), yt.length >= 8192)) {
              for (let qt = 0; qt * 2 < yt.length; qt++) yt[qt] = yt[qt * 2];
              yt.length = Math.ceil(yt.length / 2), Ot *= 2;
            }
          }
          ++pe % 256 === 0 && (performance.now() - P > 150 && (P = performance.now(), n({
            phase: `Геометрия пары · A ${w + 1}/${f.length}`,
            done: w,
            total: f.length,
            found: B.length
          })), await p());
        }
        if (!pt && Bt(H) && Bt(J)) {
          const bt = Nt;
          Zt(bt, H, xt, it) && Zt(bt, J, ot, it) && (pt = bt, rt = "contained");
        }
        if (!pt) {
          for (const [bt, et, It] of [
            [H, J, ot],
            [J, H, xt]
          ])
            if (Bt(et)) {
              for (let Ct = 0; Ct < Ut(bt) && !pt; Ct++) {
                const Mt = gt(bt, Ct), Pt = Mt[0].map(
                  (qt, Ht) => (Mt[0][Ht] + Mt[1][Ht] + Mt[2][Ht]) / 3
                );
                for (const qt of [Mt[0], Pt])
                  if (Zt(qt, et, It, it)) {
                    pt = qt, rt = "contained";
                    break;
                  }
                await p();
              }
              if (pt) break;
            }
        }
        if (pt) {
          const bt = (Z, Q) => [...Wt(Q, at, i)].filter(
            (ct) => oe(_t(gt(Z, ct).flat()), at, i)
          ), et = bt(H, xt), It = bt(J, ot);
          rt !== "surface" && (Rt.addFrom(H, et), Rt.addFrom(J, It)), await p();
          const Ct = at.min.map(
            (Z, Q) => (Z + at.max[Q]) / 2
          ), Mt = (Z, Q) => Z === 0 ? Zt(Q, H, xt, it) : Zt(Q, J, ot, it), Pt = (Z, Q) => Z === 0 ? Zt(Q, H, xt, it) || ce(Q, H, xt, it) : Zt(Q, J, ot, it) || ce(Q, J, ot, it);
          if (rt === "contained") {
            const Z = Math.max(1, Math.ceil((et.length + It.length) / 4096));
            Ot = Math.max(Ot, Z);
            const Q = /* @__PURE__ */ new Set();
            for (const [ct, ut, mt] of [[H, et, 1], [J, It, 0]]) {
              for (let kt = 0; kt < ut.length; kt += Z) {
                kt % (Z * 32) === 0 && await p();
                for (const St of gt(ct, ut[kt])) {
                  const Gt = St.join(",");
                  Q.has(Gt) || (Q.add(Gt), Pt(mt, St) && yt.push(St));
                }
              }
              Q.clear();
            }
            if (H.interior === "winding" || J.interior === "winding") {
              const ct = (ut, mt) => {
                let kt = 1, St = 0;
                for (; ut; ut = Math.floor(ut / mt))
                  kt /= mt, St += kt * (ut % mt);
                return St;
              };
              for (let ut = 1; ut <= 2048; ut++) {
                ut % 16 === 0 && await p();
                const mt = [2, 3, 5].map((kt, St) => at.min[St] + ct(ut, kt) * (at.max[St] - at.min[St]));
                Mt(0, mt) && Mt(1, mt) && yt.push(mt);
              }
            }
          }
          const qt = (Z, Q, ct) => Bt(H) && Bt(J) && ct.every((ut) => {
            const mt = At(ut, Z, Q - V(ut, Z));
            return !Pt(0, mt) || !Pt(1, mt);
          }), Ht = () => [0, 1, 2].map(
            (Z) => yt.reduce((Q, ct) => Q + ct[Z], 0) / yt.length
          ), d = rt === "surface" && yt.length > 2 ? ne(yt, Ht())[2] : void 0, u = d ? ze(
            H,
            J,
            et,
            It,
            [d],
            [],
            at,
            Ht(),
            yt,
            it,
            Mt
          ) : void 0, b = !u || u.width > it, y = !b && !!u?.approximate, I = !Bt(H) || !Bt(J);
          if (!I && !b && !y && (rt = "touch"), rt === "touch" && !e.touching) continue;
          const { zones: F, crowded: z } = rn(yt, at, i, qt), U = Rt.values();
          let Y = 0, G = !y, tt = z || Ot > 1 || !!u?.approximate || !!x.get(H.id)?.approximate || !!x.get(J.id)?.approximate;
          for (const Z of rt === "touch" ? [] : F) {
            const Q = Z.limits.length ? et.filter((kt) => Ce(H, kt, Z.limits)) : et, ct = Z.limits.length ? It.filter((kt) => Ce(J, kt, Z.limits)) : It, ut = Z.hits.length ? [0, 1, 2].map(
              (kt) => Z.hits.reduce((St, Gt) => St + Gt[kt], 0) / Z.hits.length
            ) : Ct, mt = ze(
              H,
              J,
              Q,
              ct,
              Z.hits.length > 2 ? ne(Z.hits, ut) : [],
              U,
              at,
              ut,
              Z.hits,
              it,
              Mt,
              rt === "contained"
            );
            mt.thin && (G = !1), mt.approximate && (tt = !0), mt.width > Y && (Y = mt.width), await p();
          }
          if (Y *= 1e3, rt === "touch" ? dt = void 0 : I ? dt = "unmeasurable" : Y <= 0 || !G ? dt = "tolerance" : tt && (dt = "approximate"), vt = rt === "touch" || dt === "unmeasurable" || dt === "tolerance" ? 0 : Y, !de(H) && !de(J)) {
            const Z = await A(H), Q = await A(J);
            for (const [ct, ut, mt, kt, St] of [[Z, H, J, Q, ot], [Q, J, H, Z, xt]]) {
              if (kt?.round && /труб|pipe/i.test(mt.name)) continue;
              const Gt = ct ? [[ct]] : await q(ut);
              if (!Gt.length) continue;
              const Ee = await bn(Gt, ut, mt, ut === H ? xt : ot, St, p);
              if (Ee !== void 0 && (K = Math.max(K ?? 0, Ee)), rt === "touch") continue;
              const ue = await hn(Gt, mt, St, p, () => k(mt));
              ue === void 0 || ue <= (ht ?? 0) || (ht = ue, $t = ut.id, ct || (dt = dt || "approximate"));
            }
            ht !== void 0 && (zt = dt === "unmeasurable" || dt === "tolerance" ? void 0 : vt, vt = Math.max(vt, ht), (dt === "unmeasurable" || dt === "tolerance" || Z?.sampled || Q?.sampled) && (dt = "approximate"));
          }
          await p();
        }
        if (pt && !Be({ kind: rt, depth: dt, penetrationMm: vt }, e.minPenetration, e.precision))
          continue;
      }
      if (pt && (B.push({
        id: Ft,
        a: $e(H),
        b: $e(J),
        point: pt,
        kind: rt,
        state: "new",
        note: "",
        assignee: "",
        firstSeen: "",
        lastSeen: "",
        penetrationMm: vt,
        ...ht !== void 0 ? { axialPenetrationMm: ht, axialElementId: $t, overlapThicknessMm: zt } : {},
        ...K !== void 0 ? { contactLengthMm: K } : {},
        ...dt ? { depth: dt } : {}
      }), B.length >= 5e4))
        throw Error(
          "Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат."
        );
    }
  }
  return n({
    phase: "Готово",
    done: f.length,
    total: f.length,
    found: B.length
  }), B;
}
const Je = '(function(){"use strict";const rn=(n,t,e)=>n.kind==="duplicate"||n.depth==="unmeasurable"||n.depth==="tolerance"||(n.penetrationMm??0)+e>=t,Wt=({triangles:n,vertices:t,indices:e,triangleCount:l,closed:s,bounds:f,...a})=>a;function Ut(n,t){return t.exclude.includes(n.id)?!1:t.include.includes(n.id)?!0:!(t.manualOnly||t.modelsMode==="selected"&&!t.models.includes(n.modelId)||t.modelsMode===void 0&&t.models.length&&!t.models.includes(n.modelId))}function fn(n,t,e){if(!t.manualOnly&&t.modelsMode==="selected"&&!t.models.length&&!t.include.length)return"Не отмечены модели. Выберите файлы или включите «Все модели».";let l=0;for(const s of n)if(Ut(s,t)&&(l++,e||!s.hidden))return;return l?`Все выбранные элементы (${l}) скрыты. Покажите их в модели или включите «Включать скрытые элементы» на вкладке «Правила».`:t.manualOnly?"Ручная выборка пуста. Выделите элементы в 3D заново или нажмите «Сбросить ручной выбор».":t.exclude.length?"Нет элементов после ручных исключений. Проверьте исключения или нажмите «Сбросить ручной выбор».":"В выбранных моделях нет доступных элементов. Обновите модели и проверьте состав выборки."}const cn=(n,t)=>JSON.stringify([n,t].sort()),q=(n,t)=>[n[0]-t[0],n[1]-t[1],n[2]-t[2]],tt=(n,t,e=1)=>[n[0]+t[0]*e,n[1]+t[1]*e,n[2]+t[2]*e],N=(n,t)=>n[0]*t[0]+n[1]*t[1]+n[2]*t[2],J=(n,t)=>[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]],L=n=>Math.hypot(...n),Mt=n=>{const t=L(n);return t>1e-20?[n[0]/t,n[1]/t,n[2]/t]:void 0},ut=n=>n.triangleCount??(n.indices?n.indices.length/3:n.triangles.length/9),nt=(n,t,e)=>n.indices&&n.vertices?n.vertices[n.indices[t*3+Math.floor(e/3)]*3+e%3]:n.triangles[t*9+e],X=(n,t)=>[0,3,6].map(e=>[nt(n,t,e),nt(n,t,e+1),nt(n,t,e+2)]);function jt(n){const t=[1/0,1/0,1/0],e=[-1/0,-1/0,-1/0];for(let l=0;l<n.length;l++){const s=l%3;t[s]=Math.min(t[s],n[l]),e[s]=Math.max(e[s],n[l])}return{min:t,max:e}}const Et=(n,t,e)=>n.min.every((l,s)=>l<=t.max[s]+e&&n.max[s]>=t.min[s]-e);function Dt(n,t){const e={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const o of t)for(let r=0;r<9;r++){const u=r%3,i=nt(n,o,r);e.min[u]=Math.min(e.min[u],i),e.max[u]=Math.max(e.max[u],i)}if(t.length<=12)return{...e,ids:t};const l=e.max.map((o,r)=>o-e.min[r]),s=l.indexOf(Math.max(...l)),f=o=>nt(n,o,s)+nt(n,o,s+3)+nt(n,o,s+6);t.sort((o,r)=>f(o)-f(r));const a=t.length>>1;return{...e,left:Dt(n,t.slice(0,a)),right:Dt(n,t.slice(a))}}function*xt(n,t,e){Et(n,t,e)&&(n.ids?yield*n.ids:(yield*xt(n.left,t,e),yield*xt(n.right,t,e)))}function*dt(n,t,e){if(Et(n,t,e)){if(n.ids&&t.ids){for(const l of n.ids)for(const s of t.ids)yield[l,s];return}if(n.ids){yield*dt(n,t.left,e),yield*dt(n,t.right,e);return}if(t.ids){yield*dt(n.left,t,e),yield*dt(n.right,t,e);return}yield*dt(n.left,t.left,e),yield*dt(n.left,t.right,e),yield*dt(n.right,t.left,e),yield*dt(n.right,t.right,e)}}function $t(n,t){const e={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const a of t)for(let o=0;o<3;o++)e.min[o]=Math.min(e.min[o],n[a].bounds.min[o]),e.max[o]=Math.max(e.max[o],n[a].bounds.max[o]);if(t.length<=16)return{...e,ids:t};const l=e.max.map((a,o)=>a-e.min[o]),s=l.indexOf(Math.max(...l));t.sort((a,o)=>n[a].bounds.min[s]+n[a].bounds.max[s]-(n[o].bounds.min[s]+n[o].bounds.max[s]));const f=t.length>>1;return{...e,left:$t(n,t.slice(0,f)),right:$t(n,t.slice(f))}}function qt(n,t,e,l){const s=q(t,n),f=q(e[1],e[0]),a=q(e[2],e[0]),o=J(s,a),r=N(f,o);if(Math.abs(r)<=1e-12*L(s)*L(f)*L(a))return;const u=1/r,i=q(n,e[0]),p=N(i,o)*u,h=J(i,f),d=N(s,h)*u,x=N(a,h)*u,I=l/Math.max(L(f),L(a),l);if(p>=-I&&d>=-I&&p+d<=1+I&&x>=-I&&x<=1+I)return tt(n,s,Math.max(0,Math.min(1,x)))}function ln(n,t,e,l){const s=e.map(Math.abs).indexOf(Math.max(...e.map(Math.abs))),f=[0,1,2].filter(r=>r!==s),a=(r,u,i)=>(u[f[0]]-r[f[0]])*(i[f[1]]-r[f[1]])-(u[f[1]]-r[f[1]])*(i[f[0]]-r[f[0]]),o=(r,u)=>{const i=u.map((p,h)=>a(p,u[(h+1)%3],r));return i.every(p=>p>=-l*L(e))||i.every(p=>p<=l*L(e))};for(const r of n)if(o(r,t))return r;for(const r of t)if(o(r,n))return r;for(let r=0;r<3;r++)for(let u=0;u<3;u++){const i=n[r],p=n[(r+1)%3],h=t[u],d=t[(u+1)%3],x=q(p,i),I=q(d,h),O=x[f[0]]*I[f[1]]-x[f[1]]*I[f[0]];if(Math.abs(O)<1e-18)continue;const z=q(h,i),y=(z[f[0]]*I[f[1]]-z[f[1]]*I[f[0]])/O,P=(z[f[0]]*x[f[1]]-z[f[1]]*x[f[0]])/O;if(y>=0&&y<=1&&P>=0&&P<=1)return tt(i,x,y)}}function Xt(n,t,e,l){for(let s=0;s<3;s++){const f=qt(n[s],n[(s+1)%3],t,e);f&&l.push(f);const a=qt(t[s],t[(s+1)%3],n,e);a&&l.push(a)}}function Jt(n,t,e,l){const s=J(q(n[1],n[0]),q(n[2],n[0])),f=J(q(t[1],t[0]),q(t[2],t[0])),a=L(s),o=L(f);if(a<1e-20||o<1e-20)return;const r=t.map(i=>N(q(i,n[0]),s)/a),u=n.map(i=>N(q(i,t[0]),f)/o);if(!(r.every(i=>i>e)||r.every(i=>i<-e)||u.every(i=>i>e)||u.every(i=>i<-e))){if(r.every(i=>Math.abs(i)<=e)&&u.every(i=>Math.abs(i)<=e))return l?ln(n,t,s,e):void 0;if(!(!l&&(!(Math.min(...r)<-e&&Math.max(...r)>e)||!(Math.min(...u)<-e&&Math.max(...u)>e))))for(let i=0;i<3;i++){const p=qt(n[i],n[(i+1)%3],t,e);if(p)return p;const h=qt(t[i],t[(i+1)%3],n,e);if(h)return h}}}class un{world=[[1,0,0],[0,1,0],[0,0,1]];items=new Map;step=1e4;key(t){return t.map(e=>Math.round(e*this.step)).join(",")}add(t){const e=Mt(J(q(t[1],t[0]),q(t[2],t[0])));if(!e)return;const s=e[0]<-1e-9||Math.abs(e[0])<=1e-9&&(e[1]<-1e-9||Math.abs(e[1])<=1e-9&&e[2]<0)?[-e[0],-e[1],-e[2]]:[e[0],e[1],e[2]],f=this.key(s);for(this.items.has(f)||this.items.set(f,s);this.items.size>512&&this.step>10;){this.step/=10;const a=new Map;for(const o of this.items.values()){const r=this.key(o);a.has(r)||a.set(r,o)}this.items=a}}addFrom(t,e){for(const l of e)this.add(X(t,l))}values(){return[...this.world,...[...this.items].sort((t,e)=>t[0]<e[0]?-1:1).map(([,t])=>t)]}}function Pt(n,t){const e=[[0,0,0],[0,0,0],[0,0,0]];for(const s of n){const f=[s[0]-t[0],s[1]-t[1],s[2]-t[2]];for(let a=0;a<3;a++)for(let o=0;o<3;o++)e[a][o]+=f[a]*f[o]}const l=[[1,0,0],[0,1,0],[0,0,1]];for(let s=0;s<12;s++){let f=0;for(let a=0;a<3;a++)for(let o=a+1;o<3;o++)f+=e[a][o]*e[a][o];if(f<=1e-30)break;for(let a=0;a<3;a++)for(let o=a+1;o<3;o++){if(Math.abs(e[a][o])<=1e-30)continue;const r=(e[o][o]-e[a][a])/(2*e[a][o]),u=(r>=0?1:-1)/(Math.abs(r)+Math.sqrt(r*r+1)),i=1/Math.sqrt(u*u+1),p=u*i;for(const h of[e,l])for(let d=0;d<3;d++){const x=h[d][a],I=h[d][o];h[d][a]=i*x-p*I,h[d][o]=p*x+i*I}for(let h=0;h<3;h++){const d=e[a][h],x=e[o][h];e[a][h]=i*d-p*x,e[o][h]=p*d+i*x}}}return[0,1,2].sort((s,f)=>e[f][f]-e[s][s]).map(s=>Mt([l[0][s],l[1][s],l[2][s]])).filter(s=>!!s)}function hn(n,t,e,l){const s=t.min.map((i,p)=>(i+t.max[p])/2),f=L(q(t.max,t.min)),a=Math.max(e*10,f/50),o=i=>[0,1,2].map(p=>i.reduce((h,d)=>h+d[p],0)/i.length);let r=[{hits:n,limits:[]}],u=!1;for(let i=0;i<12;i++){const p=[];let h=!1;for(const d of r){if(d.hits.length<2){p.push(d);continue}if(p.length+r.length>=64){u=!0,p.push(d);continue}const x=o(d.hits),I=[x,s,...[0,.25,.5,.75].map(c=>d.hits[Math.floor(c*(d.hits.length-1))])],O=[[1,0,0],[0,1,0],[0,0,1]],z=Pt(d.hits,x);z[0]&&O.push(z[0]);const y=c=>{let m=-1/0,M=1/0;for(const v of d.hits){const S=N(v,c);S>m&&(m=S),S<M&&(M=S)}return m-M},P=c=>Math.max(0,...z.filter(m=>Math.abs(N(m,c))<.9).map(m=>y(m))),b=c=>{const m=d.hits.map(v=>N(v,c)).sort((v,S)=>v-S),M=[];for(let v=1;v<m.length;v++){const S=m[v]-m[v-1];S>a&&M.push({at:(m[v]+m[v-1])/2,size:S})}return M.sort((v,S)=>S.size-v.size)};let A,_=0;for(const c of O){const m=b(c);!m.length||m[0].size<=_||m[0].size<=P(c)||(_=m[0].size,l(c,m[0].at,I)&&(A={n:c,cuts:[m[0].at]}))}if(!A){p.push(d);continue}h=!0;const{n:$,cuts:E}=A,w=Array.from({length:E.length+1},()=>[]);for(const c of d.hits){const m=N(c,$);let M=0;for(;M<E.length&&m>=E[M];)M++;w[M].push(c)}w.forEach((c,m)=>p.push({hits:c,limits:[...d.limits,{n:$,from:m?E[m-1]:-1/0,to:m<E.length?E[m]:1/0}]}))}if(r=p,h&&i===11&&(u=!0),!h)break}return{zones:r,crowded:u}}function Rt(n,t,e){return e.every(({n:l,from:s,to:f})=>{let a=1/0,o=-1/0;for(let r=0;r<9;r+=3){const u=nt(n,t,r)*l[0]+nt(n,t,r+1)*l[1]+nt(n,t,r+2)*l[2];u<a&&(a=u),u>o&&(o=u)}return o>=s&&a<=f})}function Yt(n,t,e,l,s,f,a,o,r,u,i,p=!1){let h=!1;const d=E=>{let w=-1/0,c=1/0;const m=M=>{M>w&&(w=M),M<c&&(c=M)};for(const M of r)m(N(M,E));for(const[M,v,S]of[[n,e,1],[t,l,0]]){const C=Math.max(1,Math.floor(v.length/32));C>1&&(h=!0);for(let g=0;g<v.length;g+=C)for(const j of X(M,v[g]))i(S,j)&&m(N(j,E))}return Number.isFinite(w)&&Number.isFinite(c)?w-c:0},x=E=>{let w=1/0,c=-1/0;for(let m=0;m<8;m++){const M=(m&1?a.max[0]:a.min[0])*E[0]+(m&2?a.max[1]:a.min[1])*E[1]+(m&4?a.max[2]:a.min[2])*E[2];M<w&&(w=M),M>c&&(c=M)}return[w,c]},I=(E,w,c,m,M)=>{let v=1/0,S=-1/0;for(const C of w){let g=1/0,j=-1/0;for(let U=0;U<9;U+=3){const H=nt(E,C,U)*c[0]+nt(E,C,U+1)*c[1]+nt(E,C,U+2)*c[2];H<g&&(g=H),H>j&&(j=H)}j<m||g>M||(g<m&&(g=m),j>M&&(j=M),g<v&&(v=g),j>S&&(S=j))}return v===1/0?void 0:[v,S]};if(a.min.some((E,w)=>a.max[w]-E<=0))return{width:0,thin:!1,approximate:!1};const O=Math.ceil((e.length+l.length)/4096),z=[...s,...O>1?f.filter((E,w)=>w<3||w%O===0):f];O>1&&z.length<s.length+f.length&&(h=!0);const y=(E,w,c,m,M)=>{const v=g=>tt(o,c,g-N(o,c));if(!w)return i(E,v((m+M)/2))?[m,M]:void 0;let[S,C]=w;return S>m&&i(E,v((m+S)/2))&&(S=m),C<M&&i(E,v((C+M)/2))&&(C=M),[S,C]},P=(E,w)=>E&&w?Math.min(E[1],w[1])-Math.max(E[0],w[0]):0;let b=1/0,A=!1,_=!1,$=0;for(let E=0;E<z.length;E++){const w=z[E],[c,m]=x(w),M=I(n,e,w,c,m),v=I(t,l,w,c,m);let S=P(M,v);if(S<=0&&($++<32?S=P(y(0,M,w,c,m),y(1,v,w,c,m)):h=!0),p&&r.length>1){let C=1/0,g=-1/0;for(const j of r){const U=N(j,w);C=Math.min(C,U),g=Math.max(g,U)}S=Math.max(S,g-C)}if(S<=u&&(E<s.length&&$<40&&($++,S=d(w)),S<=u)){E<s.length&&(_=!0);continue}A=!0,S<b&&(b=S)}return{width:A&&Number.isFinite(b)?b:0,thin:_,approximate:h}}const mt=n=>Math.max(1e-10,Math.max(1,...n.bounds.min.map(Math.abs),...n.bounds.max.map(Math.abs))*Number.EPSILON*64);async function mn(n,t,e){const l=mt(n),s=ut(n),f={closed:!1,approximate:!1},a=new Uint32Array(s),o=new Uint8Array(s),r=new Uint8Array(s),u=new Uint8Array(s);for(let c=0;c<s;c++)a[c]=c;const i=c=>{if(a[c]!==c){const m=a[c];a[c]=i(m),r[c]^=r[m]}return a[c]},p=(c,m,M)=>{let v=i(c),S=i(m);const C=r[c]^r[m]^M;return v===S?C===0:(o[v]<o[S]&&([v,S]=[S,v]),a[S]=v,r[S]=C,o[v]===o[S]&&o[v]++,!0)},h=new Map,d=[],x=new Map,I=s*3,O=I*I<=Number.MAX_SAFE_INTEGER,z=(c,m)=>O?c*I+m:`${c},${m}`,y=(c,m)=>{const M=c.map((S,C)=>Math.round((S-n.bounds.min[C])/l)).join(",");let v=h.get(M);return v===void 0&&(v=h.size,h.set(M,v),d.push(m)),v};for(let c=0;c<s;c++){c%2048===0&&await t();const m=X(n,c);if(L(J(q(m[1],m[0]),q(m[2],m[0])))<=l*l)continue;const M=m.map((v,S)=>y(v,c*3+S));if(new Set(M).size===3){u[c]=1;for(let v=0;v<3;v++){const S=M[v],C=M[(v+1)%3],g=S<C,j=g?z(S,C):z(C,S),U=x.get(j);if(U===void 0)x.set(j,(c+1)*(g?1:-1));else{if(U===0||!p(c,Math.abs(U)-1,+(U>0===g)))return f;x.set(j,0)}}}}const P=c=>{const m=d[c];return[0,1,2].map(M=>nt(n,Math.floor(m/3),m%3*3+M))},b=[];for(const[c,m]of x)if(m!==0){const M=typeof c=="number"?[Math.floor(c/I),c%I]:c.split(",").map(Number),v=P(M[0]),S=P(M[1]);b.push({p:v,q:S,face:m,bounds:jt([...v,...S])}),b.length%2048===0&&await t()}h.clear(),x.clear(),d.length=0;let A=!1;if(b.length){const c=Math.max(l,Math.min(1e-5,e)),m=$t(b,b.map((M,v)=>v));for(let M=0;M<b.length;M++){M%128===0&&await t();const v=b[M],S=q(v.q,v.p),C=L(S),g=Mt(S),j=[];for(const H of xt(m,v.bounds,c)){if(M===H)continue;const rt=b[H],et=q(rt.p,v.p),Tt=q(rt.q,v.p),F=N(et,g),T=N(Tt,g),V=Math.max(0,Math.min(F,T)),R=Math.min(C,Math.max(F,T));if(R-V<=l)continue;const yt=Math.max(L(tt(et,g,-F)),L(tt(Tt,g,-T)));if(yt>c)continue;const Y=T>F==(v.face>0==rt.face>0);if(!p(Math.abs(v.face)-1,Math.abs(rt.face)-1,Number(Y)))return f;yt>l&&(A=!0),j.push([V,R])}j.sort((H,rt)=>H[0]-rt[0]);let U=0;for(const[H,rt]of j){if(Math.abs(H-U)>l)return f;U=rt}if(Math.abs(U-C)>l)return f}}const _=new Float64Array(s),$=new Float64Array(s),E=n.bounds.min.map((c,m)=>(c+n.bounds.max[m])/2);for(let c=0;c<s;c++){if(c%2048===0&&await t(),!u[c])continue;const m=i(c),M=X(n,c);_[m]+=(r[c]?-1:1)*N(q(M[0],E),J(q(M[1],E),q(M[2],E)))/6,$[m]+=L(J(q(M[1],M[0]),q(M[2],M[0])))/2}let w=0;for(let c=0;c<s;c++){if($[c]&&Math.abs(_[c])<=l*$[c])return f;w+=Math.abs(_[c])}return{closed:w>0,approximate:A}}function dn(n,t,e){const l=q(t[1],t[0]),s=q(t[2],t[0]),f=J(l,s),a=L(f);if(a<1e-20||Math.abs(N(q(n,t[0]),f))/a>e)return!1;const o=q(n,t[0]),r=N(l,l),u=N(l,s),i=N(s,s),p=N(o,l),h=N(o,s),d=r*i-u*u;if(Math.abs(d)<1e-30)return!1;const x=(p*i-h*u)/d,I=(h*r-p*u)/d,O=e/Math.max(L(l),L(s),e);return x>=-O&&I>=-O&&x+I<=1+O}function Ot(n,t,e,l){for(const s of xt(e,{min:n,max:n},l))if(dn(n,X(t,s),l))return!0;return!1}const wt=n=>n.closed||n.interior==="winding";function Ht(n,t,e,l=!1){const s=a=>{if(a.moment)return a.moment;const o=[0,0,0];if(a.ids)for(const r of a.ids){const u=X(t,r),i=J(q(u[1],u[0]),q(u[2],u[0]));for(let p=0;p<3;p++)o[p]+=i[p]/2}else{const r=s(a.left),u=s(a.right);for(let i=0;i<3;i++)o[i]=r[i]+u[i]}return a.moment=o},f=a=>{const o=a.min.map((h,d)=>(h+a.max[d])/2),r=q(o,n),u=L(r),i=L(q(a.max,a.min))/2;if(!l&&u>i*10&&u>0)return N(s(a),r)/(u*u*u);if(!a.ids)return f(a.left)+f(a.right);let p=0;for(const h of a.ids){const d=X(t,h),x=q(d[0],n),I=q(d[1],n),O=q(d[2],n),z=L(x),y=L(I),P=L(O);!z||!y||!P||(p+=2*Math.atan2(N(x,J(I,O)),z*y*P+N(x,I)*P+N(I,O)*z+N(O,x)*y))}return p};return f(e)/(4*Math.PI)}async function pn(n,t,e){const l=mt(n),s=r=>!Ot(r,n,t,l)&&Math.abs(Ht(r,n,t))>.9,f=n.bounds.min.map((r,u)=>(r+n.bounds.max[u])/2);if(s(f))return!0;const a=ut(n),o=Math.max(1,Math.ceil(a/32));for(let r=0;r<a;r+=o){await e();const u=X(n,r),i=Mt(J(q(u[1],u[0]),q(u[2],u[0])));if(!i)continue;const p=[0,1,2].map(d=>(u[0][d]+u[1][d]+u[2][d])/3),h=Math.max(l*8,Math.min(L(q(u[0],u[1])),L(q(u[1],u[2])),L(q(u[2],u[0])))*.01);if(s(tt(p,i,h))||s(tt(p,i,-h)))return!0}return!1}function It(n,t,e,l){if(!wt(t)||n.some((p,h)=>p<t.bounds.min[h]-l||p>t.bounds.max[h]+l)||Ot(n,t,e,l))return!1;if(t.interior==="winding"){const p=Math.abs(Ht(n,t,e));return Math.abs(p-.5)<.05?Math.abs(Ht(n,t,e,!0))>.5:p>.5}const s=[1,.371390676,.52999894],f=L(q(t.bounds.max,t.bounds.min))*3+1,a=tt(n,s,f),o=[],r=jt([...n,...a]);for(const p of xt(e,r,l)){const h=qt(n,a,X(t,p),l);if(h){const d=L(q(h,n));d>l&&o.push(d)}}o.sort((p,h)=>p-h);let u=0,i=-1/0;for(const p of o)p-i>l*2&&(u++,i=p);return u%2===1}const Ft=n=>/отвод|тройник|муфт|фитинг|elbow|fitting|tee\\b/i.test(n.name);async function gn(n,t){if(Ft(n))return;const e=ut(n),l=Math.max(1,Math.ceil(e/4096)),s=n.bounds.min.map((w,c)=>(w+n.bounds.max[c])/2),f=[],a=[];for(let w=0;w<e;w+=l){w%(l*256)===0&&await t();const c=X(n,w),m=J(q(c[1],c[0]),q(c[2],c[0])),M=L(m);M&&(f.push(...c),a.push({n:m.map(v=>v/M),area:M}))}if(f.length<12)return;let o=Pt(f,s)[0];const r=a.filter(({n:w})=>Math.abs(N(w,o))<.2);if(r.length<4)return;const u=Pt(r.map(({n:w})=>w),[0,0,0])[2];if(Math.abs(N(u,o))<.98)return;o=u;const i=o.map(Math.abs).indexOf(Math.max(...o.map(Math.abs)));o[i]<0&&(o=o.map(w=>-w));const p=Math.abs(o[0])<.7?[1,0,0]:[0,1,0],h=Mt(J(o,p)),d=J(o,h),x=[1/0,1/0,1/0],I=[-1/0,-1/0,-1/0];for(const w of f)for(const[c,m]of[o,h,d].entries()){const M=N(q(w,s),m);x[c]=Math.min(x[c],M),I[c]=Math.max(I[c],M)}const O=I[0]-x[0],z=Math.max(I[1]-x[1],I[2]-x[2]),y=Math.min(I[1]-x[1],I[2]-x[2]);if(y<=mt(n)*8||O+mt(n)<z*4||z>y*4)return;let P=0,b=0;const A=new Set;for(const{n:w,area:c}of a){const m=Math.abs(N(w,o));b+=c,(m<.015||m>.999)&&(P+=c),m<.015&&A.add(w.map(M=>Math.round(M*100)).join(","))}if(P<b*.995)return;const _=[];for(let w=0;w<f.length;w+=3){const c=f.slice(w,w+3).map(m=>N(q(m,s),o));_.push([Math.min(...c),Math.max(...c)])}_.sort((w,c)=>w[0]-c[0]);let $=x[0];for(const[w,c]of _){if(w>$+mt(n)*4)return;$=Math.max($,c)}const E=tt(tt(s,h,(x[1]+I[1])/2),d,(x[2]+I[2])/2);return{axis:o,centre:E,from:x[0],to:I[0],width:z,round:A.size>=6&&z<y*1.2,sampled:l>1}}async function Mn(n,t){if(Ft(n)||!/кабел|труб|cable|pipe/i.test(n.name))return[];const e=mt(n),l=[],s=new Map,f=new Map,a=y=>{const P=y.map((A,_)=>Math.round((A-n.bounds.min[_])/e)).join(",");let b=s.get(P);return b===void 0&&(b=l.length,l.push(y),s.set(P,b)),b};for(let y=0;y<ut(n);y++){y%1024===0&&await t();const P=X(n,y).map(a);for(let b=0;b<3;b++){const A=Math.min(P[b],P[(b+1)%3]),_=Math.max(P[b],P[(b+1)%3]);A!==_&&f.set(`${A},${_}`,[A,_,L(q(l[A],l[_]))])}}const o=[...f.values()].map(y=>y[2]).filter(y=>y>e).sort((y,P)=>y-P);if(!o.length)return[];const r=o[Math.floor(o.length*.1)]*1.25,u=Int32Array.from({length:l.length},(y,P)=>P),i=y=>{for(;u[y]!==y;)u[y]=u[u[y]],y=u[y];return y};let p=0;for(const[y,P,b]of f.values())++p%4096===0&&await t(),b<=r&&(u[i(P)]=i(y));const h=new Map;for(let y=0;y<l.length;y++){const P=i(y),b=h.get(P);b?b.push(l[y]):h.set(P,[l[y]])}const d=new Map;for(const[y,P]of h){if(await t(),P.length<6||P.length>256)continue;const b=P[0],A=[0,1,2].map(w=>b[w]+P.reduce((c,m)=>c+m[w]-b[w],0)/P.length),_=P.map(w=>L(q(w,A))),$=Math.max(..._),E=Pt(P,A)[2];!E||$<=e||Math.min(..._)<$*.88||P.some(w=>Math.abs(N(q(w,A),E))>Math.max(e*16,$*.002))||d.set(y,{centre:A,radius:$,normal:E})}const x=new Map;for(const[y,P]of f.values()){++p%4096===0&&await t();const b=Math.min(i(y),i(P)),A=Math.max(i(y),i(P));if(b===A||!d.has(b)||!d.has(A))continue;const _=`${b},${A}`,$=x.get(_);$?$.count++:x.set(_,{a:b,b:A,count:1})}const I=new Map;for(const{a:y,b:P,count:b}of x.values()){const A=d.get(y),_=d.get(P),$=Mt(q(_.centre,A.centre));b<6||!$||Math.min(A.radius,_.radius)<Math.max(A.radius,_.radius)*.8||Math.abs(N($,A.normal))<.5||Math.abs(N($,_.normal))<.5||(I.set(y,[...I.get(y)||[],P]),I.set(P,[...I.get(P)||[],y]))}const O=new Set,z=[];for(const[y,P]of I){if(P.length!==1||O.has(y))continue;let b=y,A=-1;const _=[];for(;!O.has(b);){O.add(b);const $=I.get(b)||[];if($.length>2)break;const E=$.find(v=>v!==A);if(E===void 0||O.has(E))break;const w=d.get(b),c=d.get(E),m=q(c.centre,w.centre),M=L(m);M>e&&_.push({axis:m.map(v=>v/M),centre:w.centre,from:0,to:M,width:Math.max(w.radius,c.radius)*2,round:!0,sampled:!0}),A=b,b=E}_.length&&z.push(_)}return z}async function yn(n,t){const e=ut(n),l=Int32Array.from({length:e},(r,u)=>u),s=new Uint8Array(e),f=new Map,a=mt(n),o=r=>{for(;l[r]!==r;)l[r]=l[l[r]],r=l[r];return r};for(let r=0;r<e;r++){r%2048===0&&await t();for(const u of X(n,r)){const i=u.map((x,I)=>Math.round((x-n.bounds.min[I])/a)).join(","),p=f.get(i);if(p===void 0){f.set(i,r);continue}let h=o(r),d=o(p);h!==d&&(s[h]<s[d]&&([h,d]=[d,h]),l[d]=h,s[h]===s[d]&&s[h]++)}}for(let r=0;r<e;r++)l[r]=o(r);return l}async function xn(n,t,e,l,s){const{axis:f,centre:a}=n,o=Math.abs(f[0])<.7?[1,0,0]:[0,1,0],r=Mt(J(f,o)),u=J(f,r),i=[1/0,1/0,1/0],p=[-1/0,-1/0,-1/0],h=mt(t);for(let b=0;b<ut(t);b++){b%2048===0&&await l();for(const A of X(t,b))for(const[_,$]of[f,r,u].entries()){const E=N(q(A,a),$);i[_]=Math.min(i[_],E),p[_]=Math.max(p[_],E)}}if(p[1]-i[1]<n.width*2.5||p[2]-i[2]<n.width*2.5)return[];const d=Math.max(1,p[0]-i[0]),x=tt(a,f,i[0]-d),I=tt(a,f,p[0]+d),O=[];let z=0;for(const b of xt(e,jt([...x,...I]),h)){++z%256===0&&await l();const A=qt(x,I,X(t,b),h);A&&O.push({triangle:b,at:N(q(A,a),f)})}if(O.length<2)return[];const y=await s(),P=new Map;for(const b of O){const A=y[b.triangle],_=P.get(A);_?(_[0]=Math.min(_[0],b.at),_[1]=Math.max(_[1],b.at)):P.set(A,[b.at,b.at])}return[...P].map(([b,[A,_]])=>({part:b,from:Math.max(n.from,A),to:Math.min(n.to,_)})).filter(({from:b,to:A})=>A-b>h)}async function wn(n,t,e,l,s){let f=0;const a=mt(t);for(const o of n){let r=0;const u=new Map;for(const i of o){await l();for(const p of await xn(i,t,e,l,s)){const h=u.get(p.part)||[];h.push([r+p.from-i.from,r+p.to-i.from]),u.set(p.part,h)}r+=i.to-i.from}for(const i of u.values()){i.sort((d,x)=>d[0]-x[0]);let p=i[0][0],h=i[0][1];for(const[d,x]of i.slice(1))d<=h+a*4?h=Math.max(h,x):(f=Math.max(f,h-p),p=d,h=x);f=Math.max(f,h-p)}}return f>a?f*1e3:void 0}function bn(n,t,e){const l=Mt(J(q(t[1],t[0]),q(t[2],t[0])));if(!l)return[];if(n.some(f=>Math.abs(N(q(f,t[0]),l))>e)){const f=[];return Xt(n,t,e,f),f}let s=n;for(let f=0;f<3&&s.length;f++){const a=t[f],o=q(t[(f+1)%3],a),r=Mt(J(l,o));if(!r)return[];const u=[];for(let i=0;i<s.length;i++){const p=s[i],h=s[(i+1)%s.length],d=N(q(p,a),r),x=N(q(h,a),r);d>=-e&&u.push(p),d>=-e!=x>=-e&&u.push(tt(p,q(h,p),Math.max(0,Math.min(1,d/(d-x)))))}s=u}return s}async function vn(n,t,e,l,s,f){const a=Math.max(mt(t),mt(e)),o=n.map(()=>[]),r=n.map(h=>{let d=0;return h.map(x=>{const I={p:x,offset:d};return d+=x.to-x.from,I})}),u=(h,d,x)=>{let I=0,O=h.length;for(;I<O;){const y=I+O>>1;h[y][1]<d-a*4?I=y+1:O=y}let z=I;for(;z<h.length&&h[z][0]<=x+a*4;)d=Math.min(d,h[z][0]),x=Math.max(x,h[z][1]),z++;h.splice(I,z-I,[d,x])};let i=0;for(const[h,d]of dt(l,s,a)){++i%256===0&&await f();const x=X(t,h),I=X(e,d);if(!Jt(x,I,a,!0))continue;const O=bn(x,I,a);if(!(O.length<2))for(let z=0;z<r.length;z++)for(const{p:y,offset:P}of r[z]){const b=O.map($=>N(q($,y.centre),y.axis)),A=Math.max(y.from,Math.min(...b)),_=Math.min(y.to,Math.max(...b));_-A<=a||O.some(($,E)=>{const w=Math.max(y.from,Math.min(y.to,b[E]));return L(q($,tt(y.centre,y.axis,w)))<=y.width*.7+a})&&u(o[z],P+A-y.from,P+_-y.from)}}let p=0;for(const h of o)for(const[d,x]of h)p=Math.max(p,x-d);return p>a?p*1e3:void 0}async function In(n,t,e,l,s){const f=t.precision/1e3;if(!Number.isFinite(f)||f<=0)throw Error("Точность расчёта должна быть положительным числом.");const a=n.filter(g=>t.includeHidden||!g.hidden),o=a.filter(g=>Ut(g,t.a)),r=a.filter(g=>Ut(g,t.b));if(!o.length||!r.length){const g=o.length?"Б":"А",j=o.length?t.b:t.a;throw Error(`Выбор ${g}: ${fn(n,j,t.includeHidden)}`)}let u=performance.now();const i=async()=>{if(l())throw Error("Расчёт отменён. Предыдущие результаты сохранены.");performance.now()-u>16&&(await new Promise(g=>setTimeout(g,0)),u=performance.now())},p=new Map,h=g=>{let j=p.get(g.id);return j||(j=Dt(g,Array.from({length:ut(g)},(U,H)=>H)),p.set(g.id,j)),j},d=new Map,x=new Map,I=new Map,O=async g=>{let j=I.get(g.id);return j||(j=await Mn(g,i),I.set(g.id,j)),j},z=new Map,y=async g=>{let j=z.get(g.id);return j||(j=await yn(g,i),z.set(g.id,j)),j},P=async g=>(x.has(g.id)||x.set(g.id,await gn(g,i)),x.get(g.id)),b=async g=>{if(t.type!=="intersection")return g;let j=d.get(g.id);return j===void 0&&(j=await mn(g,i,f),!j.closed&&await pn(g,h(g),i)&&(j={closed:!1,approximate:!0,winding:!0}),d.set(g.id,j)),j.winding?{...g,closed:!1,interior:"winding"}:j.closed===g.closed?g:{...g,closed:j.closed}},A=new Map,_=async g=>{let j=A.get(g.id);if(j!==void 0)return j;const U=[];for(let H=0;H<ut(g);H++)U.push([0,3,6].map(rt=>[0,1,2].map(et=>Math.round(nt(g,H,rt+et)/f)).join(",")).sort().join(";")),H%9e3===0&&await i();return j=U.sort().join("|"),A.set(g.id,j),j},$=[],E=new Set(o.map(g=>g.id)),w=new Set(r.map(g=>g.id)),c=$t(r,r.map((g,j)=>j)),m=new Map;let M=0;const v=g=>g.triangles.byteLength+(g.vertices?.byteLength||0)+(g.indices?.byteLength||0)+ut(g)*32;async function S(g,j){if(!s)return g;let U=m.get(g.id);if(U)return m.delete(g.id),m.set(g.id,U),U;for(const[H,rt]of m)H!==j&&M>96*1024*1024&&(m.delete(H),M-=v(rt),p.delete(H),z.delete(H),I.delete(H),A.delete(H));return U=await s(g.id),m.set(g.id,U),M+=v(U),U}let C=-1/0;for(let g=0;g<o.length;g++){const j=o[g];performance.now()-C>150&&(C=performance.now(),e({phase:"Проверка пар",done:g,total:o.length,found:$.length}));const U=[...xt(c,j.bounds,f)];for(let H=0;H<U.length;H++){const rt=U[H];performance.now()-C>150&&(C=performance.now(),e({phase:`Проверка пар · A ${g+1}/${o.length} · кандидаты ${H+1}/${U.length}`,done:g,total:o.length,found:$.length}));const et=r[rt];if(await i(),j.id===et.id||!Et(j.bounds,et.bounds,f)||t.ignoreSameModel&&j.modelId===et.modelId||t.ignoreSameGroup&&j.modelId===et.modelId&&j.properties.Объект&&j.properties.Объект===et.properties.Объект||t.equalProperty&&j.properties[t.equalProperty]!==void 0&&j.properties[t.equalProperty]===et.properties[t.equalProperty]||j.id>et.id&&E.has(et.id)&&w.has(j.id))continue;const Tt=cn(j.id,et.id),F=await b(await S(j)),T=await b(await S(et,j.id));let V,R="surface",yt=0,Y,Zt,St,kt,Lt;if(t.type==="duplicates"){if(ut(F)!==ut(T)||F.bounds.min.some((ct,it)=>Math.abs(ct-T.bounds.min[it])>f||Math.abs(F.bounds.max[it]-T.bounds.max[it])>f))continue;await _(F)===await _(T)&&(V=F.bounds.min.map((ct,it)=>(ct+F.bounds.max[it])/2),R="duplicate")}else{const ct=h(F),it=h(T),qn=Math.max(1,...F.bounds.min.map(Math.abs),...F.bounds.max.map(Math.abs),...T.bounds.min.map(Math.abs),...T.bounds.max.map(Math.abs)),ft=Math.max(1e-10,qn*Number.EPSILON*64),ht={min:F.bounds.min.map((k,B)=>Math.max(k,T.bounds.min[B])),max:F.bounds.max.map((k,B)=>Math.min(k,T.bounds.max[B]))},Bt=ht.min.map((k,B)=>(k+ht.max[B])/2),_t=new un,Z=[];let zt=1,Pn=0,Qt=1/0,Sn=0;for(const[k,B]of dt(ct,it,f)){const lt=X(F,k),pt=X(T,B);if(!Et(jt(lt.flat()),jt(pt.flat()),f))continue;const ot=Jt(lt,pt,ft,t.touching);if(ot){const bt=L(q(ot,Bt));if((!V||bt<Qt)&&(V=ot,Qt=bt),_t.add(lt),_t.add(pt),Pn++%zt===0&&(Xt(lt,pt,ft,Z),Z.length||Z.push(ot),Z.length>=8192)){for(let gt=0;gt*2<Z.length;gt++)Z[gt]=Z[gt*2];Z.length=Math.ceil(Z.length/2),zt*=2}}++Sn%256===0&&(performance.now()-C>150&&(C=performance.now(),e({phase:`Геометрия пары · A ${g+1}/${o.length}`,done:g,total:o.length,found:$.length})),await i())}if(!V&&wt(F)&&wt(T)){const k=Bt;It(k,F,ct,ft)&&It(k,T,it,ft)&&(V=k,R="contained")}if(!V){for(const[k,B,lt]of[[F,T,it],[T,F,ct]])if(wt(B)){for(let pt=0;pt<ut(k)&&!V;pt++){const ot=X(k,pt),bt=ot[0].map((gt,At)=>(ot[0][At]+ot[1][At]+ot[2][At])/3);for(const gt of[ot[0],bt])if(It(gt,B,lt,ft)){V=gt,R="contained";break}await i()}if(V)break}}if(V){const k=(D,K)=>[...xt(K,ht,f)].filter(st=>Et(jt(X(D,st).flat()),ht,f)),B=k(F,ct),lt=k(T,it);R!=="surface"&&(_t.addFrom(F,B),_t.addFrom(T,lt)),await i();const pt=ht.min.map((D,K)=>(D+ht.max[K])/2),ot=(D,K)=>D===0?It(K,F,ct,ft):It(K,T,it,ft),bt=(D,K)=>D===0?It(K,F,ct,ft)||Ot(K,F,ct,ft):It(K,T,it,ft)||Ot(K,T,it,ft);if(R==="contained"){const D=Math.max(1,Math.ceil((B.length+lt.length)/4096));zt=Math.max(zt,D);const K=new Set;for(const[st,G,W]of[[F,B,1],[T,lt,0]]){for(let Q=0;Q<G.length;Q+=D){Q%(D*32)===0&&await i();for(const at of X(st,G[Q])){const vt=at.join(",");K.has(vt)||(K.add(vt),bt(W,at)&&Z.push(at))}}K.clear()}if(F.interior==="winding"||T.interior==="winding"){const st=(G,W)=>{let Q=1,at=0;for(;G;G=Math.floor(G/W))Q/=W,at+=Q*(G%W);return at};for(let G=1;G<=2048;G++){G%16===0&&await i();const W=[2,3,5].map((Q,at)=>ht.min[at]+st(G,Q)*(ht.max[at]-ht.min[at]));ot(0,W)&&ot(1,W)&&Z.push(W)}}}const gt=(D,K,st)=>wt(F)&&wt(T)&&st.every(G=>{const W=tt(G,D,K-N(G,D));return!bt(0,W)||!bt(1,W)}),At=()=>[0,1,2].map(D=>Z.reduce((K,st)=>K+st[D],0)/Z.length),Vt=R==="surface"&&Z.length>2?Pt(Z,At())[2]:void 0,Ct=Vt?Yt(F,T,B,lt,[Vt],[],ht,At(),Z,ft,ot):void 0,tn=!Ct||Ct.width>ft,nn=!tn&&!!Ct?.approximate,en=!wt(F)||!wt(T);if(!en&&!tn&&!nn&&(R="touch"),R==="touch"&&!t.touching)continue;const{zones:An,crowded:En}=hn(Z,ht,f,gt),_n=_t.values();let Nt=0,on=!nn,sn=En||zt>1||!!Ct?.approximate||!!d.get(F.id)?.approximate||!!d.get(T.id)?.approximate;for(const D of R==="touch"?[]:An){const K=D.limits.length?B.filter(Q=>Rt(F,Q,D.limits)):B,st=D.limits.length?lt.filter(Q=>Rt(T,Q,D.limits)):lt,G=D.hits.length?[0,1,2].map(Q=>D.hits.reduce((at,vt)=>at+vt[Q],0)/D.hits.length):pt,W=Yt(F,T,K,st,D.hits.length>2?Pt(D.hits,G):[],_n,ht,G,D.hits,ft,ot,R==="contained");W.thin&&(on=!1),W.approximate&&(sn=!0),W.width>Nt&&(Nt=W.width),await i()}if(Nt*=1e3,R==="touch"?Y=void 0:en?Y="unmeasurable":Nt<=0||!on?Y="tolerance":sn&&(Y="approximate"),yt=R==="touch"||Y==="unmeasurable"||Y==="tolerance"?0:Nt,!Ft(F)&&!Ft(T)){const D=await P(F),K=await P(T);for(const[st,G,W,Q,at]of[[D,F,T,K,it],[K,T,F,D,ct]]){if(Q?.round&&/труб|pipe/i.test(W.name))continue;const vt=st?[[st]]:await O(G);if(!vt.length)continue;const an=await vn(vt,G,W,G===F?ct:it,at,i);if(an!==void 0&&(Lt=Math.max(Lt??0,an)),R==="touch")continue;const Gt=await wn(vt,W,at,i,()=>y(W));Gt===void 0||Gt<=(St??0)||(St=Gt,kt=G.id,st||(Y=Y||"approximate"))}St!==void 0&&(Zt=Y==="unmeasurable"||Y==="tolerance"?void 0:yt,yt=Math.max(yt,St),(Y==="unmeasurable"||Y==="tolerance"||D?.sampled||K?.sampled)&&(Y="approximate"))}await i()}if(V&&!rn({kind:R,depth:Y,penetrationMm:yt},t.minPenetration,t.precision))continue}if(V&&($.push({id:Tt,a:Wt(F),b:Wt(T),point:V,kind:R,state:"new",note:"",assignee:"",firstSeen:"",lastSeen:"",penetrationMm:yt,...St!==void 0?{axialPenetrationMm:St,axialElementId:kt,overlapThicknessMm:Zt}:{},...Lt!==void 0?{contactLengthMm:Lt}:{},...Y?{depth:Y}:{}}),$.length>=5e4))throw Error("Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат.")}}return e({phase:"Готово",done:o.length,total:o.length,found:$.length}),$}let jn=0;const Kt=new Map;self.onmessage=async n=>{if(n.data.request!==void 0){const t=Kt.get(n.data.request);Kt.delete(n.data.request),n.data.error?t?.reject(Error(n.data.error)):t?.resolve(n.data.geometry);return}try{const{elements:t,check:e}=n.data,l=await In(t,e,s=>self.postMessage({progress:s}),()=>!1,n.data.streaming?s=>new Promise((f,a)=>{const o=jn++;Kt.set(o,{resolve:f,reject:a}),self.postMessage({load:s,request:o})}):void 0);self.postMessage({results:l})}catch(t){self.postMessage({error:t instanceof Error?t.message:String(t)})}}})();\n', Ne = typeof self < "u" && self.Blob && new Blob(["(self.URL || self.webkitURL).revokeObjectURL(self.location.href);", Je], { type: "text/javascript;charset=utf-8" });
function yn(t) {
  let e;
  try {
    if (e = Ne && (self.URL || self.webkitURL).createObjectURL(Ne), !e) throw "";
    const n = new Worker(e, {
      name: t?.name
    });
    return n.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(e);
    }), n;
  } catch {
    return new Worker(
      "data:text/javascript;charset=utf-8," + encodeURIComponent(Je),
      {
        name: t?.name
      }
    );
  }
}
const Qe = new TextEncoder(), wn = (() => {
  const t = new Uint32Array(256);
  for (let e = 0; e < t.length; e++) {
    let n = e;
    for (let s = 0; s < 8; s++)
      n = n & 1 ? 3988292384 ^ n >>> 1 : n >>> 1;
    t[e] = n >>> 0;
  }
  return t;
})(), vn = (t) => {
  let e = 4294967295;
  for (const n of t) e = wn[(e ^ n) & 255] ^ e >>> 8;
  return (e ^ 4294967295) >>> 0;
}, Mn = (t) => t.getHours() << 11 | t.getMinutes() << 5 | t.getSeconds() >> 1, kn = (t) => Math.max(1980, t.getFullYear()) - 1980 << 9 | t.getMonth() + 1 << 5 | t.getDate(), jn = (t) => {
  const e = new Uint8Array(t.reduce((s, o) => s + o.length, 0));
  let n = 0;
  for (const s of t)
    e.set(s, n), n += s.length;
  return e;
}, me = (t, e) => {
  const n = new Uint8Array(t);
  return e(new DataView(n.buffer)), n;
};
function In(t, e = /* @__PURE__ */ new Date()) {
  const n = [], s = [];
  let o = 0;
  for (const f of t) {
    const r = Qe.encode(f.name.replaceAll("\\", "/")), c = vn(f.data), p = Mn(e), h = kn(e), m = me(30, (g) => {
      g.setUint32(0, 67324752, !0), g.setUint16(4, 20, !0), g.setUint16(6, 2048, !0), g.setUint16(8, 0, !0), g.setUint16(10, p, !0), g.setUint16(12, h, !0), g.setUint32(14, c, !0), g.setUint32(18, f.data.length, !0), g.setUint32(22, f.data.length, !0), g.setUint16(26, r.length, !0);
    });
    n.push(m, r, f.data);
    const x = me(46, (g) => {
      g.setUint32(0, 33639248, !0), g.setUint16(4, 20, !0), g.setUint16(6, 20, !0), g.setUint16(8, 2048, !0), g.setUint16(10, 0, !0), g.setUint16(12, p, !0), g.setUint16(14, h, !0), g.setUint32(16, c, !0), g.setUint32(20, f.data.length, !0), g.setUint32(24, f.data.length, !0), g.setUint16(28, r.length, !0), g.setUint32(42, o, !0);
    });
    s.push(x, r), o += m.length + r.length + f.data.length;
  }
  const i = s.reduce((f, r) => f + r.length, 0), a = me(22, (f) => {
    f.setUint32(0, 101010256, !0), f.setUint16(8, t.length, !0), f.setUint16(10, t.length, !0), f.setUint32(12, i, !0), f.setUint32(16, o, !0);
  });
  return jn([...n, ...s, a]);
}
const he = (t) => Qe.encode(t), st = (t) => String(t ?? "").replace(
  /[&<>"']/g,
  (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[e]
);
function Oe(t, e) {
  const n = URL.createObjectURL(
    e instanceof Blob ? e : new Blob([e], {
      type: t.endsWith(".html") ? "text/html;charset=utf-8" : "application/json;charset=utf-8"
    })
  ), s = document.createElement("a");
  s.href = n, s.download = t, s.click(), setTimeout(() => URL.revokeObjectURL(n), 6e4);
}
const Sn = (t) => (t || "Отчёт о конфликтах").replace(/[<>:"/\\|?*\u0000-\u001f]/g, "_").replace(/[. ]+$/g, "").slice(0, 100) || "Отчёт о конфликтах", En = (t) => {
  const e = t.indexOf(","), n = atob(t.slice(e + 1)), s = new Uint8Array(n.length);
  for (let o = 0; o < n.length; o++) s[o] = n.charCodeAt(o);
  return s;
}, An = {
  new: "Новый",
  active: "Активн.",
  reviewed: "Проверен",
  approved: "Утвержден",
  resolved: "Исправлен",
  excluded: "Исключен"
}, Jt = (t, ...e) => {
  const n = (i) => i.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ""), s = new Set(e.map(n));
  return Object.entries(t.properties || {}).find(([i]) => s.has(n(i)))?.[1] || "";
}, $n = (t, e) => t.type === "duplicates" || e.kind === "touch" ? "0.000" : e.penetrationMm === void 0 || e.depth === "unmeasurable" || e.depth === "tolerance" ? "" : (-e.penetrationMm / 1e3).toFixed(3), Cn = (t, e) => t.type === "duplicates" ? "Дублирование" : e.kind === "touch" ? "Касание" : e.axialPenetrationMm !== void 0 ? "По пересечению · продольный заход" : "По пересечению", Pe = (t) => [
  `ID объекта: ${t.id}`,
  Jt(t, "Слой", "Layer"),
  t.model,
  Jt(t, "Объект Id", "Object Id", "Id") || t.id,
  Jt(t, "IfcName", "ifc.name") || t.name,
  t.guid,
  Jt(t, "Категория", "Category"),
  Jt(t, "Семейство", "Family"),
  Jt(t, "Объект Тип", "Тип", "Type"),
  Jt(t, "IfcClass", "ifc.class", "Класс IFC")
];
function zn(t, e, n) {
  const s = Sn(t.name), o = `${s}_files`, i = [], a = /* @__PURE__ */ new Map();
  for (let E = 0; E < e.length; E++) {
    const k = e[E].image;
    if (!Ie(k)) continue;
    const A = k.startsWith("data:image/png") ? "png" : "jpg", S = `cd${String(E + 1).padStart(6, "0")}.${A}`;
    a.set(e[E].id, S), i.push({ name: `${o}/${S}`, data: En(k) });
  }
  const f = ["Изображение", "Наименование конфликта", "Статус", "Расстояние", "Расположение сетки", "Описание:", "Дата обнаружения", "Точка конфликта", "Назначение", "Комментарий", "Толщина перекрытия, мм", "Заход вдоль оси, мм", "Длина контакта, мм"], r = ["Идентификатор элемента", "Слой", "Элемент Файл источника", "Объект Id", "Объект IfcName", "Объект IfcGUID", "Объект Категория", "Объект Семейство", "Объект Тип", "Объект IfcClass"], c = f.map((E) => `<td class="generalHeader">${st(E)}</td>`).join("") + r.map((E) => `<td class="item1Header">${st(E)}</td>`).join("") + r.map((E) => `<td class="item2Header">${st(E)}</td>`).join(""), p = e.map((E, k) => {
    const A = a.get(E.id), S = A ? `${encodeURIComponent(o)}/${A}` : "", N = [
      A ? `<a target="_blank" href="${S}"><img border="0" width="160" src="${S}" alt="Снимок конфликта ${k + 1}"></a>` : "Снимок отсутствует",
      `Конфликт${k + 1}`,
      An[E.state],
      $n(t, E),
      "",
      Cn(t, E),
      E.firstSeen || t.lastRun || "",
      `X:${E.point[0].toFixed(4)}, Y:${E.point[1].toFixed(4)}, Z:${E.point[2].toFixed(4)}`,
      E.assignee,
      E.note,
      E.overlapThicknessMm === void 0 ? "" : jt(E.overlapThicknessMm),
      E.axialPenetrationMm === void 0 ? "" : jt(E.axialPenetrationMm),
      E.contactLengthMm === void 0 ? "" : `≈ ${jt(E.contactLengthMm)}`
    ];
    return `<tr class="contentRow" data-check-id="${st(t.id)}" data-clash-id="${st(E.id)}">${N.map((L, B) => `<td class="contentCell">${B ? st(L) : L}</td>`).join("")}${Pe(E.a).map((L) => `<td class="item1Content">${st(L)}</td>`).join("")}${Pe(E.b).map((L) => `<td class="item2Content">${st(L)}</td>`).join("")}</tr>`;
  }).join(""), h = `<!doctype html><html><head><meta charset="utf-8"><title>Отчет о конфликтах</title><style>body,table{font-family:Calibri,Tahoma,Verdana,Arial,sans-serif}table{border-collapse:collapse}.titleTable{margin-bottom:16px}.headerCell{font-size:18pt;font-weight:bold}.testSummaryTable{border:3px solid #222;background:#eee;margin-bottom:16px}.testName{font-size:16pt;font-weight:bold;padding:12px}.mainTable td{border:1px solid #999;padding:6px;vertical-align:middle;min-width:90px}.headerRow{font-weight:bold}.generalHeader{background:#eee}.item1Header{background:#9cf}.item2Header{background:#fcc}.item1Content{background:#def}.item2Content{background:#fee}.contentRow{height:100px}</style></head><body><table class="titleTable"><tr class="headerRow"><td class="headerCell">Отчет о конфликтах</td></tr></table><table class="testSummaryTable"><tr class="headerRow"><td class="testName">${st(t.name)}</td></tr></table><table class="mainTable"><tr class="headerRow"><td colspan="${f.length}" class="generalHeader"></td><td colspan="${r.length}" class="item1Header">Элемент 1</td><td colspan="${r.length}" class="item2Header">Элемент 2</td></tr><tr class="headerRow">${c}</tr>${p}</table></body></html>`, m = `${s}.html`, x = Nn(
    t,
    e,
    (E) => {
      const k = a.get(E.id);
      return k ? `${o}/${k}` : "";
    },
    {}
  ), g = {
    format: "nashepo.clash-package",
    version: 1,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    project: n ? { id: n } : void 0,
    producer: {
      name: "nashepo.collisionfinder360",
      version: Ge
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
      report: m,
      review: "review.json",
      images: o
    }
  };
  i.unshift(
    { name: m, data: he(h) },
    { name: "review.json", data: he(JSON.stringify(x, null, 2)) },
    { name: "manifest.json", data: he(JSON.stringify(g, null, 2)) }
  );
  const v = In(i), q = v.buffer.slice(v.byteOffset, v.byteOffset + v.byteLength);
  return {
    archiveName: `${s}.zip`,
    htmlName: m,
    imageCount: a.size,
    blob: new Blob([q], { type: "application/zip" })
  };
}
const Ve = {
  unmeasurable: "не определена",
  tolerance: "требует уточнения",
  approximate: "приблизительная оценка"
}, jt = (t = 0) => t > 0 && t < 0.1 ? String(Number(t.toPrecision(2))) : t.toFixed(1), Me = (t, e) => e === "duplicates" ? "—" : t.kind === "touch" ? "касание" : t.depth === "approximate" ? `≈ ${jt(t.penetrationMm)}` : t.depth ? Ve[t.depth] : jt(t.penetrationMm);
function Nn(t, e, n, s) {
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
        clashes: e.map((o, i) => ({
          id: o.id,
          name: `Конфликт ${i + 1}`,
          distance: t.type === "duplicates" ? "" : o.depth || o.kind === "touch" ? Me(o, t.type) : `${jt(o.penetrationMm)} мм`,
          date: t.lastRun || "",
          description: t.type === "duplicates" ? "Дублирование" : o.axialPenetrationMm !== void 0 ? "По пересечению · продольный заход" : "По пересечению",
          status: Vt[o.state],
          group: o.assignee,
          note: o.note,
          point: o.point,
          image: n(o),
          enabled: o.state !== "resolved",
          reviewed: o.state === "resolved" || o.state === "reviewed" || o.state === "approved",
          excluded: o.state === "excluded",
          elements: [o.a, o.b].map((a) => ({
            guid: a.guid,
            id: a.id,
            source: a.model,
            name: a.name,
            properties: a.properties
          })),
          properties: {
            Проверка: t.name,
            Вид: o.kind,
            "Глубина для отбора, мм": Me(o, t.type),
            ...o.contactLengthMm !== void 0 ? { "Длина контакта, мм": "≈ " + jt(o.contactLengthMm) } : {},
            ...o.axialPenetrationMm !== void 0 ? {
              "Толщина перекрытия, мм": o.overlapThicknessMm === void 0 ? "—" : jt(o.overlapThicknessMm),
              "Заход вдоль оси, мм": jt(o.axialPenetrationMm)
            } : {}
          }
        }))
      }
    ]
  };
}
const On = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAydpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAzIDc5Ljk2OTBhODdmYywgMjAyNS8wMy8wNi0yMDo1MDoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDZFQkU2NEQ4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDZFQkU2NEM4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI2LjExIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRENDVBNjQzODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRENDVBNjQ0ODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+pHX+ogAAD+lJREFUeNrsnXtwVPUVx2/CZvMgQEhCSAwJJDzDqwgodCq08hAr7wpSo1M6o/5Rq6NUcdqp1XamdjqOY6mvWhWnttZpRRtbaRGpMMKMZlB8gaFaQoQQSEhIQt7hkfTzhY1ulnt37929mw1T7sxls3vv/f3O7/zO43vO7/wucd3d3calI/zDo3927txpnDx5MqaEpKenpyUlJWUlJCQM6+rqSm1vb/fyGRcfH9+dkpLSGRcX13Lq1Knajo6Omvr6+ia+x4zWtLQ0Y86cOee/SAKLiopiyjwYlz5ixIhyPk8PGDBAKnHB6fF4unU9Ly+vDCanxpLeqVOnnuObznj9kJycHFMGwpRrjh8/Xoh0ec6ePWt6z5kzZwxdr62tLcrPz786lvT68ys+1jYEaTJQx+tRT1v3w0QDabweSe0XNjDmDBwyZEh6U1PTPCfPtLS0LOK5QZcYyDF48OAFjY2N6U6eaWhoyIaBc//vGSg1RIXXSC2dHG1tbYbX610dS08cUwYmJiYa2dnZWRMmTFiO9C0Ipw3UfgnoYfHw4cMzYWZscWAEeChj2LBha8CQm+vq6g6D26xnKj5eWC+dZ67l71VI0dxDhw5lYM/C6vvYsWMZzc3Nm4cOHVo7atSot/Hem6DjzRMnTjQGCw4k9RkZGYWYgGtrampeZCKaIuKgOps+fbrj55AgwYmPkabunJyceqThEaQhT4wKJPiyyy4bx/VHgStVQABTnBfpCdjuhp7D9PMw9BQGemnRBc0FXP8tdDaKbhj/Hn+Pdjr2WbNmfYkDw2IgjJgDMdX+A1DEwG8nUEsNYJTUSp98fzIrK6tF16PBuMBT/cCUk/T7Gz5HiI7c3NwxfN8gxgXSweRWcv3KPmOgQG9mZmaz1QAUScDIhvHjx/8Zgmsx9GExAjXrLigo6Ebrw2YkdBwdN26c6GgKNoGYoXoioblRZyAqsoDOWqMlOVJDbKQY10Zf3VJ3feo7Nuvc92hJsqQWJn7DKQNtOxHEfCZw4xVCqRS3PNigQYMEpCv5/BBJfa+zs3MfElyB1D1RWlp6le45fPiwMXv27D2o4p04ikI+p0D4FTiQaXjw3HCdUOCBQxmMxJZgdubhoPa56kRQ2REw8LAbMy3jjRmoxiY9VVhYuABmDRKs6TnGjBlTTNKg1zP6zu83+sMgVHwwTmAhpuIZJKcWxroiibT1OTRluabCqampKajQO5ESBmCWOn6GF7wLdckyi2WZpALOBrPn9TsGv8AMliA52UzIj5iYA+onUloZ778xJ4muMBD1SoGwzyIhiIE3MMCfgNks01AQrLTa1mDt6LruC5JTHEI/D8ppRELvyJEjPxo4cKDXNScyevTomwPVyq668uxmGDg2VNg1ceLEO0JhRF2HiT8M1o76ob8izMO2cNRajoxnV7rqhZFCL7OyzwkhOIcuIMRPmUk70GgCxrvFTrvc18z940O1iekZgH38JbQ7Vd/3oHmA6zAGSbrJrhTidFox8KsCo5IgA93pZJCo6ds8F28nWQFDbka1OxxI34qo4EBmMgGmfBqKCHCiJGS+HQQgdUN175OqOzUNPLfeTjZG9+C8FsPEdhvS9z7SFx81II0UrglmpyCykxn8tl0IhVmYisFvDxP4tsOYqXb7gjkrMStnrNqDcWe5Z4lTIO0onQWQbfAt+lxwyNYRRfzg4MGDW2wmUhOQpGcBsElhAt8kJvNZtWPn/i+++KIE03K31fqPxqXxRS0bIxVmhj62in9xGE9pfcOu6k6aNOnBSMGvnqedB+wmVpVYgM4XrMJBNOxd7GB0VJhI4HtWtgpV2oskpNhcwjRwGt/CVp5yI3JQO7T3TbVr5wCLDiHaOGDlRGDid1yPhQVjWFa8j1jVbFFI4n8Xeck2q0Qqz3tQ78kQOI+k6yLWNOYQUycYLhxqBwncgj3dRV9bSdRuJ0beS6x81izBS98nsdXr8OL/CIyjtVQAU36MOXqttbW1yzUVxjEs1eyYzRoq8XJgSl2xKjnATKR2Cd7ycWZ1H/any40wK1S4qH7UH/0+pv5Fh3+s3UPf2LFj/2nWhnAjaONq1yRQdo2ZvUWzY5LSbyeNvl5runQcx/ciZk+dL2J2Z2PohyEJfbY+cfr0aYOlhTjOSXydBE13oiG12O5Svm9FqnYgnWWiCfru4fpC/u6lCbpGaH0ra887tJgf8ZoI4p6Lei40U01sz9sQlE9m5A6YOB9mToFpHruL5NE+xAzOYfy5FC1ZygSfAf7sxQa+hfS8zue7e/bsmRuo6jD3OmxlJuahLmIVRtRvCfSWwoL8LuDZKpEPN+scq1P04vTOJWo1jkBs60uffTdiFZaU4SCuC5QoPJ9x5MgRgwqqFOMiPDRwLcZxJgsXajxK3Bp+5SOYLgUEfwlrXRj9V6NDMcSrUdG5JoDa6C+1KYYLi/tmBU2Yo4WMfwVOaYj4EdQGqgHdhN6nq2QCyVuB07imoqIiB8N7wUMwtWvmzJmf7Nq1a1qwteCLgXkzZswo271798TAa0ePHs2BiSX4gCqY+CYOpYTvu6hNbOzFcH1ZsmTJdFz/CyQBjuFF7YDXJmZnFHZix8Vk+wJP6H9r8uTJExTDh7oX3KhEaxWQ7vnly5dP7RWJFBcXb3TSMThpr5A/uTmCkPyai5F5ohu4kqcYnr/LnTy7du3ax3slE3ASmU5EH3Uvl+qyenUYULrWt3Z70RyiV3RXV1dX+szXQSfPo85ZvZwIbj3DSQPcXynQqoPsyxuk0H9mNxaN9SE6off+8vLyN3rANzb/iMPxD+vFQBxFooOHJbp1PQU8mkGY+BA29LX+UG4WCpZBZwn0/qrH+Yl+6K5z0g78SurFQJIEHidE0GFbYBBOjfMtGNj/9mcGApw/h85bTcLSNieT788v1+oDCXvqmc1iDHN7f2Se6BJ9otP1AksM6hm7D0j0Ud9ki6zv+xjoO1Sy0Z8O0SO6oG+PxS0pTjYc+fMr3peO73QSBnFkWon8gQMHngcvPR0MvfflITqg53eiywpMczhyovCroxcDYYpTsc6zYpDi5srKynUY69L+wECl6UWPVYZI40CrRjiMpet6MZDA+YRDHDQaMba0uoQ8HaSEbqKepTqWzKP/Y6IDejqDwJoEoEyBQ6mu/ZKBsmm45d8zU6/QYb2dXUtkKwqxKzlG8FWzg2SxYyqFqFopdFSEsI/5jGdkqLZUk0P+sA6k8VeyOF+aA49gCcXepaRzVpMYzeYmbXpZAVPnEThnmG1BIEk5kFT5FMXcweAOkxNTdI3XTQpVHYEETqMwPcFqSxfOp5Y4eDtjKYFxO5iQ4/zWOxsjQypEXn3+eIkE6ktkZoYTbC/C7W/goaGBuI9n5uNItlp5LxHOtaQY5/2SguE70ci5kLzmBdeI88WodYx/G8C7tify8nM81jhQBhem1ezfv/+PMHKnmSfGDi7TaluIiCUxxgxMDCaB0J+EMCwyzLegbSsrK3sJ4N2LeY422ijMQXS3mC2Ys3Aznhm6KtjsMgBvjBnoDSaBmKz5mKlRZhuBEJAtdrBhyEgED/Yvrb4ZF274k/243aoaIU4LD/1YArUUize93Wy1Ea3T/pttrmz1YiG6kgWY7Rbh2zKytWMtJHBAP5FA07UHnODXUM9rLFT7DSTzuCsM9AHQ58xKa/FeiXT2oJkUQrinPzCQifSYSR8e9hcsTXhM6hXlUJ+zsyZsO5mApG0hjf+Z2TVmsRjoM8dEAj3Yz4RYMpD+TRnI0oX2yS03e4Zxfsh4t7u6WxN70MmsPRJYImGcX2CKg9DHkMTEfiiBqpvxBFRTpCJhG8z2GAr3wfCHwcBnXd/uyoz9CWy03+xaVVXVNLK8v/aPjyEkAcZ6YiyBCaLD8CtTwfY9ypq2aY0149sDDt4Ulf3CkkJm817fqt0FL4SAiXejGsV+EpggCQhn4LJRlGC0UjXwAZ9t4e4Hpn+P6OjBpdB3G8y7zWwpFkfJz13rnUif4/3CEJFkhY0Ea1Dx51ixO0bebQcz73Uigb79xN1AiFIkWXt//654GqNOmD56GZO0GkQwG+8YZ3ct2qfCXl858XU8+6QZbPHdq3fUJEatQpWBeKwqVP1PVKQBqblCZWUA1dOh7tfmQhhUxjrzQwxyurygRf9iwnTdR0Bfps2HNnZ8noaWDLLRc4LtMO05abcUtBEXlQpVBnmD3c3SSNIJOlnvA+BmBd1apD4CM5QFmsd9Xoc75b08N1/Pqx2rYgCkuY2NivfzedIO3WoHIVnsOgMlfajmRw4Xrs8VOxp+WxNwNI3sNHqFoszVwIW0SOtr9LzaUXtqV+37lyHTvzY2Ot1o806oOulwtnrd4HSrvl7VxHPa/dh9+eWXf8zmmJtQp5xovSDC53hy6Odm+lMN4Ln+RYcTuu1IoaNtDkhfMrjpAbOUT4istUFx0jnnAlZMIzHhxcNVR6v4Uu3iIGr14jKcRZr6Vf92IwrjqzVfwZ+fI4Vet7wwzim+wwgPh4l5OvNRrefBWeuQjMcJATeRzWl049V78t6oagZ27gaSv3eCAIoinSTalLTEueaF8agFDP6oG0U9vm38hygPfgQH8HUcQqLd/SX+6oqj0j7muXqZBO1VhbOb1DDfl1yB9851dZsD8W4FkrNKdXJIzsBIZlemgOWDfPDZPYDXe4AjBzD+eyBmN5LzKav+lZz1fO9Ags8qq8OZjASnw7g8PrWUcAUqOhNVLVBI5tZLJBEUacX1aEiV60AaBP8OErOGDv5GB143ymz10kfOMXwdg7Ffo8IfGNSFd21BKmU2ZMA82LEkbNMggWjtVXFq1+wcePM2+l/F5H4QtRfv+HY+Lg2281F5VL0nBmhRohmNZSE5/dcRDpbAnPZghfBoVhNwZ6ERxmtP4p0ymxl6Hc+8DMhQH8hcCG7Gtj2Jqs3gvpVI1Sy+/wEC+2zfg+gQw5jAZ5DkK1lUX4lkzdTLKSRlJgmEGuzyYu7bZvTlq5/oeBqz9h9tgYCZzQDZp/htTCA4loPAfk7h+tMY6Dqne4PtnnIi9FNDP0/QT1Fg5YS+Y2sncP1ZvftGu5owSZ/oFVZGX7/6yfiq0jObmb4XIsaGqoURY2F0Nip1K+cWBtMU6Xu0tP1M0Qftbeb8PhqQFSq6EZ1imujWy9PCGbdrDDQiqxLNo8D7Rql9OMyDCfU8vwqpz+3r6tiYM9BfGrBNr4XDQJ570c47GaLNwJi+wVJwhPNls6UCI0SdCuHlpv6wRyXm71DV+ithWKPDdFYN4eEOw7j0ElrFybUsSDliBjBqGwC86RIDjfPbDLAlr9qNh+UwyOy8avXC7pgw0Gwrf18ebNjZijc+EgoK6TrQqZxyvO2xpNe/5O8cxRs3bjT6cme5yVEHJpzBZzbAPAvpSiW3l+j/nxGA75qZ6OMQf4xYvCnGr67/KvK59N9hRHb8T4ABAPaAkPNeKkdCAAAAAElFTkSuQmCC", fe = "application/vnd.folder", se = "nashepo.collisionfinder360", Pn = new TextEncoder(), qn = new TextDecoder(), Xt = async (t, e) => (await t.propfind()).find((n) => n.title === e);
async function qe(t, e) {
  const n = await Xt(t, e);
  if (n && n.mimeType !== fe)
    throw Error(`«${e}» должен быть папкой.`);
  return n || t.mkcol(e, fe);
}
async function Ue(t, e, n, s = "application/json") {
  const o = await Xt(t, e);
  o ? await o.put(n) : await t.mkcol(e, s, n);
}
function Le(t) {
  const e = JSON.parse(qn.decode(t));
  if (e?.format !== "nashepo.checks.workspace" || e.version !== 1 || typeof e.projectId != "string" || !e.projectId || typeof e.revision != "string" || !Array.isArray(e.images))
    throw Error("Неизвестный формат хранилища проверок.");
  Se(JSON.stringify(e.project));
  for (const n of e.images)
    if (!n || typeof n.checkId != "string" || typeof n.clashId != "string" || typeof n.file != "string" || !/^[a-f0-9]{64}\.(jpg|png)$/.test(n.file))
      throw Error("Некорректная ссылка на снимок в хранилище проверок.");
  return e;
}
function Un(t) {
  const e = atob(t.slice(t.indexOf(",") + 1));
  return Uint8Array.from(e, (n) => n.charCodeAt(0));
}
function Ln(t, e) {
  let n = "";
  for (let s = 0; s < e.length; s += 32768)
    n += String.fromCharCode(...e.subarray(s, s + 32768));
  return `data:image/${t.endsWith(".png") ? "png" : "jpeg"};base64,${btoa(n)}`;
}
class te {
  constructor(e, n, s, o) {
    this.workspace = e, this.directory = n, this.loaded = s, this.projectId = o?.projectId || crypto.randomUUID(), this.revision = o?.revision, this.label = `${e.root.title}/${se}`;
  }
  workspace;
  directory;
  loaded;
  projectId;
  label;
  revision;
  queue = Promise.resolve();
  images = /* @__PURE__ */ new Map();
  static async open(e) {
    if (e.inmemory || e.root.mimeType !== fe)
      throw Error("Выберите доступную для записи папку на диске.");
    const n = await Xt(e.root, se);
    if (n && n.mimeType !== fe)
      throw Error(`«${se}» должен быть папкой.`);
    const s = n && await Xt(n, "project.json");
    if (!s) return new te(e, n, void 0);
    const o = Le(await s.get()), i = Se(JSON.stringify(o.project)), a = n && await Xt(n, "images"), f = new Map((a ? await a.propfind() : []).map((c) => [c.title, c])), r = new Map(i.checks.flatMap((c) => c.results.map((p) => [JSON.stringify([c.id, p.id]), p])));
    for (const c of o.images) {
      const p = r.get(JSON.stringify([c.checkId, c.clashId])), h = f.get(c.file);
      if (p && h)
        try {
          p.image = Ln(c.file, await h.get());
        } catch {
        }
    }
    return new te(e, n, i, o);
  }
  save(e) {
    const n = structuredClone(e), s = this.queue.catch(() => {
    }).then(() => this.saveNow(n));
    return this.queue = s, s;
  }
  async saveNow(e) {
    await this.workspace.requestWritePermissions?.();
    const n = this.directory || await qe(this.workspace.root, se);
    this.directory = n;
    const s = await Xt(n, "project.json"), o = s && await s.get(), i = o && Le(o);
    if (i?.revision !== this.revision || i && i.projectId !== this.projectId)
      throw Error("Папка проверок изменена в другом окне. Откройте её заново перед сохранением; текущую работу можно выгрузить в JSON.");
    const a = [];
    let f, r;
    for (const p of e.checks) for (const h of p.results) {
      const m = h.image;
      if (delete h.image, !Ie(m)) continue;
      f ||= await qe(n, "images"), r ||= new Set((await f.propfind()).map((g) => g.title));
      let x = this.images.get(m);
      if (!x) {
        const g = Un(m);
        x = [...new Uint8Array(await crypto.subtle.digest("SHA-256", g))].map((q) => q.toString(16).padStart(2, "0")).join("") + (m.startsWith("data:image/png") ? ".png" : ".jpg"), r.has(x) || (await f.mkcol(x, m.startsWith("data:image/png") ? "image/png" : "image/jpeg", g), r.add(x)), this.images.set(m, x);
      }
      a.push({ checkId: p.id, clashId: h.id, file: x });
    }
    const c = {
      format: "nashepo.checks.workspace",
      version: 1,
      projectId: this.projectId,
      revision: crypto.randomUUID(),
      savedAt: (/* @__PURE__ */ new Date()).toISOString(),
      project: e,
      images: a
    };
    o && await Ue(n, "project.previous.json", o), await Ue(n, "project.json", Pn.encode(JSON.stringify(c))), await this.workspace.flush(), this.revision = c.revision;
  }
}
const ge = "nashepo:clash-scene-owner";
function Dn(t, e, n) {
  const s = crypto.randomUUID();
  let o = !1, i = !1;
  const a = () => {
    i && (i = !1, n());
  }, f = () => {
    !o || i || (window.dispatchEvent(new CustomEvent(ge, { detail: s })), i = !0, e());
  }, r = () => {
    const m = t.isConnected && t.getClientRects().length > 0 && getComputedStyle(t).visibility !== "hidden";
    m !== o && (o = m, m ? f() : a());
  }, c = (m) => {
    m.detail !== s && a();
  };
  window.addEventListener(ge, c), t.addEventListener("pointerdown", f);
  const p = new ResizeObserver(r);
  p.observe(t);
  const h = window.setInterval(r, 200);
  return r(), () => {
    p.disconnect(), clearInterval(h), window.removeEventListener(ge, c), t.removeEventListener("pointerdown", f), a();
  };
}
const Fn = ":host{display:block;height:100%;color-scheme:dark;font:13px/1.4 Segoe UI,sans-serif;color:#dbe5f0;container-type:size}*{box-sizing:border-box}[hidden]{display:none!important}main{height:100%;min-height:260px;background:#171d25;display:flex;flex-direction:column;overflow:hidden;-webkit-user-select:none;user-select:none}button,input,select,textarea{font:inherit;color:inherit;border:1px solid #425165;border-radius:6px;background:#253140;padding:7px 9px;min-width:0}button{cursor:pointer;white-space:nowrap}button:hover{background:#354459}button:disabled{opacity:.45;cursor:default}.primary{background:#b99a38;border-color:#d0ae46;color:#111820;font-weight:600}.primary:hover{background:#e0bd51}button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid #f2c94c;outline-offset:1px}input,select,textarea{background:#111a24}input,textarea,td,dd{-webkit-user-select:text;user-select:text}input[type=checkbox]{accent-color:#e6c354;width:16px;height:16px}header{display:flex;gap:7px;align-items:center;padding:8px 12px;border-bottom:1px solid #354459;flex-shrink:0;overflow-x:auto}.brand{display:flex;gap:7px;align-items:center;margin-right:8px}.brand img{width:32px;height:32px;object-fit:contain}.brand b{font-size:17px}.brand small{font-size:10px;color:#a6b5c7}#dirty{margin-left:auto;font-size:11px;color:#cabb81;white-space:nowrap}.notice{background:#1c2735;padding:5px 12px;font-size:12px;min-height:27px;max-height:70px;overflow:auto;color:#a7bbd1}.notice.error{color:#ffaaa1;background:#412725}.workspace{display:grid;grid-template-columns:230px minmax(0,1fr);flex:1;min-height:0}aside{padding:10px;display:flex;flex-direction:column;gap:9px;border-right:1px solid #354459;min-height:0}#checks{overflow:auto;flex:1;min-height:0}.check-item{display:flex;flex-direction:column;gap:5px;width:100%;margin-bottom:5px;text-align:left;white-space:normal}.check-item small{color:#a8b7ca}.check-item.active,.tabs .active{border-color:#c7ab56;background:#403b2c;color:#ffe399}.main{display:flex;flex-direction:column;min-width:0;min-height:0}.test-toolbar{display:flex;gap:7px;padding:8px 12px;align-items:center}.test-toolbar input{flex:1;font-weight:600}.tabs{display:flex;gap:7px;border-bottom:1px solid #354459;padding:0 12px 8px}.tabs button{min-width:105px}#content{flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column}.empty{padding:28px;color:#a4b4c9;text-align:center;margin:auto}h2,h3,p{margin:0 0 10px}h2{font-size:20px}h3{font-size:15px}label{display:flex;flex-direction:column;gap:5px;font-size:12px;color:#b8c6d7}.check{flex-direction:row;align-items:center;gap:6px}small{font-size:11px;color:#a8b7c9}.parameters{display:flex;gap:18px;align-items:end;padding:10px 12px}.parameters input{width:140px}.selection-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0 12px 12px}.selection{border:1px solid #39495e;border-radius:8px;padding:12px;background:#1b2633;min-width:0}.selection h3{display:flex;justify-content:space-between}.selection h3 span{color:#92c4b2;font-size:12px}.selection select[multiple]{width:100%;min-height:70px}.selection-tools{display:flex;gap:5px;flex-wrap:wrap;margin:8px 0}.selection-tools button{font-size:11px;padding:5px 7px}.selection>label{margin-bottom:8px}.condition{display:grid;grid-template-columns:minmax(80px,1fr) 100px minmax(70px,1fr) 29px;gap:5px;margin:6px 0}.condition button{padding:3px}.rules,.report{padding:18px;max-width:850px}.rules>label{margin:14px 0}.rules>p,.report>p{color:#a9b8cb}.report>button{margin:12px 8px 14px 0}.result-tools{display:flex;gap:7px;flex-wrap:wrap;padding:8px 12px}.result-tools input{flex:1;min-width:180px}.result-area{display:grid;grid-template-columns:minmax(0,1fr) 300px;flex:1;min-height:0}.table-area{display:flex;flex-direction:column;min-width:0;min-height:0}.scroll{overflow:auto;flex:1;min-height:0}table{border-collapse:separate;border-spacing:0;width:max-content;min-width:100%}th{position:sticky;top:0;background:#2a3748;z-index:1;text-align:left;max-width:240px;white-space:normal}th,td{padding:8px;border-bottom:1px solid #344154;vertical-align:top}td{max-width:320px;min-width:90px;overflow-wrap:anywhere;-webkit-user-select:text;user-select:text}td:first-child{min-width:36px}tr.active td{background:#453e29;color:#fff0b5}tr:hover td{background:#2c3847}.pager{display:flex;gap:10px;align-items:center;justify-content:center;padding:5px;border-top:1px solid #39495e;font-size:11px}.pager button{padding:2px 8px}.detail{border-left:1px solid #354459;padding:10px;overflow:auto}.detail h3{overflow-wrap:anywhere}.detail>label{margin:10px 0}.detail p{font:11px/1.5 Consolas,monospace}.detail details{border-top:1px solid #354459;padding:8px 0}summary{cursor:pointer}dl{font-size:11px;display:grid;grid-template-columns:1fr 1fr;gap:7px}dt,dd{overflow-wrap:anywhere;margin:0}dt{color:#9baec4}footer{border-top:1px solid #354459;padding:4px 12px;display:flex;justify-content:space-between;color:#91a4bb;font-size:11px}dialog{border:1px solid #53647c;border-radius:12px;background:#202c3a;color:#dbe5f0;width:min(700px,92vw);max-height:85vh;padding:20px;box-shadow:0 15px 60px #000a}dialog::backdrop{background:#000a}dialog p{margin:12px 0}dialog a{color:#f2c94c;margin-right:12px}.dialog-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:16px}@container (max-width:950px){.workspace{grid-template-columns:185px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 240px}.selection-grid{grid-template-columns:1fr}.parameters,.test-toolbar{flex-wrap:wrap}.test-toolbar input{flex-basis:100%}}@container (max-height:400px){header{padding:5px 10px}.test-toolbar{padding:5px 10px}.tabs{padding-bottom:5px}.brand img{width:25px;height:25px}footer{display:none}}:host{font-size:12px}.brand img{background:#e1e7ef;border-radius:5px;padding:3px}.selection-tools button{font-size:12px}label{font-size:13px}.choose-layout{display:grid;grid-template-columns:220px minmax(0,1fr);min-height:0;flex:1;overflow:auto}.choose-layout .parameters{display:flex;flex-direction:column;align-items:stretch;gap:15px;border-right:1px solid #354459;justify-content:flex-start}.choose-layout .parameters input{width:100%}.choose-layout .parameters input[type=checkbox]{width:16px}.choose-layout .selection-grid{padding:10px 12px;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start;min-width:0}.selection select[multiple]{height:180px;resize:vertical}.selection-mode{font-size:12px;color:#b6c4d5}.preset-row{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:9px}.preset-row select{flex:1 1 160px}.preset-row button{padding:5px 7px;font-size:12px}.model-list{height:150px;overflow:auto;border:1px solid #425165;border-radius:6px;background:#111a24;padding:5px;margin-bottom:5px}.model-list label{display:flex;flex-direction:row;align-items:center;gap:7px;padding:4px 5px;color:#dbe5f0;overflow-wrap:anywhere}.model-list label:hover{background:#253140}.model-list .model-all{position:sticky;top:-5px;z-index:1;background:#1f2b39;border-bottom:1px solid #425165;font-weight:600}.legend{display:flex;gap:12px;flex-wrap:wrap;font-family:inherit!important}.part-a{color:#ff6161}.part-b{color:#65baff}.preview{display:block;width:100%;padding:5px;margin:8px 0}.preview img{display:block;width:100%;max-height:180px;object-fit:contain}.image-dialog{width:94vw;max-width:1500px}.image-dialog img{display:block;max-width:100%;max-height:75vh;margin:10px auto}#help-dialog{width:min(1000px,94vw);line-height:1.6}#help-dialog details{padding:12px 0;border-bottom:1px solid #425165}#help-dialog summary{font-size:16px;font-weight:600;color:#f0d27a}#help-dialog li{margin:8px 0}@container (max-width:1100px){.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .selection-grid{grid-template-columns:1fr}.condition{grid-template-columns:minmax(60px,1fr) 100px minmax(60px,1fr) 29px}}@container (max-width:700px){.choose-layout{display:block}.choose-layout .parameters{border-right:0;border-bottom:1px solid #354459}.workspace{grid-template-columns:160px minmax(0,1fr)}}button,input,select,textarea{padding:5px 7px;border-radius:5px}button{min-height:27px}input[type=checkbox]{width:14px;height:14px}.commandbar{position:relative;display:flex;gap:8px;min-height:45px;padding:5px 8px;overflow:visible;background:#131b25}.brand{flex:0 0 auto;margin-right:0;gap:5px}.brand img{width:28px;height:28px}.brand b{font-size:14px}.check-heading{display:grid;grid-template-rows:25px 12px;flex:0 1 230px;min-width:145px}.check-heading input{height:25px;border:0;background:transparent;padding:2px 5px;font-weight:600}.check-heading small{padding:0 5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:9px}.tabs{align-self:stretch;align-items:center;flex:0 0 auto;gap:3px;padding:0;border:0}.tabs button{flex:0 0 auto;min-width:0;padding:5px 9px;background:transparent;border-color:transparent}.tabs .active{background:#3e3828;border-color:#b99a38}.header-actions{display:flex;align-items:center;gap:4px;margin-left:auto}#dirty{margin-left:0;width:0;height:0;overflow:visible;font-size:0}#dirty:not(:empty){width:7px;height:7px;border-radius:50%;background:#e5bd43;box-shadow:0 0 0 2px #e5bd4328}.more-menu{position:relative;z-index:20}.more-menu summary{display:grid;place-items:center;width:29px;height:29px;border:1px solid #425165;border-radius:5px;background:#253140;cursor:pointer;list-style:none;font-size:18px}.more-menu summary::-webkit-details-marker{display:none}.more-popover{position:absolute;right:0;top:calc(100% + 5px);display:grid;width:190px;gap:3px;padding:6px;border:1px solid #506176;border-radius:7px;background:#192431;box-shadow:0 12px 35px #000a}.more-popover button{text-align:left}.notice{min-height:23px;max-height:45px;padding:3px 9px;font-size:10px}.run-progress{display:grid;grid-template-columns:minmax(150px,auto) minmax(120px,1fr) auto;align-items:center;gap:8px;min-height:24px;padding:3px 9px;border-bottom:1px solid #425165;background:#202a20;color:#d9e7d2;font-size:10px}.run-bar{width:100%;height:7px;overflow:hidden;border-radius:2px;background:#101810}.run-bar i{display:block;width:0;height:100%;background:#e3bc43}#run-phase,#run-value{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#run-value{text-align:right;color:#b9c9b3}.workspace{grid-template-columns:190px minmax(0,1fr)}aside{gap:6px;padding:7px;background:#141c26}.aside-title{font-weight:600;font-size:12px}.aside-actions{display:grid;gap:5px}.check-item{gap:2px;margin-bottom:3px;padding:6px 7px}.check-item small{font-size:9px}.main{background:#171d25}#content{overflow:hidden}.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .parameters{gap:9px;padding:8px}.choose-layout .selection-grid{gap:8px;padding:8px}.selection{padding:8px}.selection h3,h3{font-size:13px;margin-bottom:6px}label{gap:3px;font-size:11px}small,.selection-tools button,.preset-row button{font-size:10px}.model-list{height:125px}.model-list label{padding:2px 4px}.selection-tools{gap:4px;margin:5px 0}.selection-tools button,.preset-row button{padding:3px 5px;min-height:23px}.result-tools{display:flex;align-items:center;justify-content:space-between;gap:6px;flex-wrap:nowrap;min-height:38px;padding:5px 7px;border-bottom:1px solid #354459;background:#151f2a}.result-filters,.bulk-tools{display:flex;align-items:center;gap:5px;min-width:0}.result-filters{flex:1}.result-filters input[type=search]{flex:1 1 190px;min-width:120px}#result-depth{flex:0 1 125px;min-width:92px}#result-count,#selection-count{color:#9fb0c4;white-space:nowrap;font-size:10px}.bulk-tools select{max-width:125px}.result-area{grid-template-columns:minmax(0,1fr) 310px}th,td{padding:5px 6px;font-size:11px;line-height:1.25}th{max-width:190px}td{max-width:260px;min-width:76px}.pager{justify-content:flex-end;min-height:29px;padding:3px 7px}.pager #selection-count{margin-right:auto}.detail{display:flex;flex-direction:column;min-width:0;padding:0;overflow:hidden;background:#141e29}.detail-head{display:flex;align-items:center;justify-content:space-between;gap:6px;min-height:47px;padding:7px 8px 4px}.detail-head>div:first-child{min-width:0}.detail-head small{color:#8093aa;letter-spacing:.08em}.detail-head h3{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin:0}.detail-nav{display:flex;gap:3px}.detail-nav button{min-width:27px;padding:2px 7px;font-size:17px}.clash-summary{display:flex;gap:5px;padding:0 8px 5px;color:#adbdcf;font-size:9px}.clash-summary span{padding-right:5px;border-right:1px solid #405064}.clash-summary span:last-child{border:0}.detail .legend{margin:0;padding:0 8px 5px;font-size:10px}.preview-slot{height:clamp(92px,18cqh,145px);flex:0 0 auto;margin:0 7px 6px;overflow:hidden;border:1px solid #37475b;border-radius:6px;background:#0e151d}.preview{position:relative;width:100%;height:100%;margin:0;padding:0;border:0;background:transparent}.preview img{width:100%;height:100%;max-height:none;object-fit:contain}.preview span{position:absolute;right:5px;bottom:5px;padding:3px 6px;border-radius:4px;background:#101923db;font-size:9px}.preview-empty,.detail-empty{height:100%;display:grid;place-content:center;justify-items:center;gap:4px;color:#788ba1}.preview-empty>span,.detail-empty>span{font-size:24px}.detail-actions{display:grid;grid-template-columns:1fr 1fr;gap:5px;padding:0 7px 7px}.detail-scroll{flex:1;min-height:0;overflow:auto;padding:7px 8px 12px;border-top:1px solid #354459}.detail-scroll>label{margin:7px 0}.detail p{font:inherit}.coordinates{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;font:9px/1.3 Consolas,monospace;color:#91a3b7}.coordinates span{overflow:hidden;text-overflow:ellipsis}.detail details{padding:6px 0}.detail dl{font-size:10px}.detail-empty{padding:20px;text-align:center}footer{padding:2px 8px;font-size:9px}#project-storage{min-width:0;max-width:42%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}@container (max-width:1050px){.workspace{grid-template-columns:165px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 270px}.check-heading{flex-basis:185px}.tabs button{padding-inline:6px}#dirty{display:none}}@container (max-width:820px){.brand b,.brand small,#result-count{display:none}.check-heading{flex-basis:155px}.result-tools{overflow-x:auto}.result-area{grid-template-columns:minmax(0,1fr) 245px}}@container (max-height:410px){.notice,footer{display:none}.preview-slot{height:90px}}.depth-breakdown{display:grid;grid-template-columns:1fr auto;gap:4px 8px;margin-bottom:9px;font:inherit}.depth-breakdown small{grid-column:1/-1;color:#adbdcf;font:inherit}", Qt = /* @__PURE__ */ new WeakMap(), ie = /* @__PURE__ */ new WeakMap(), De = () => ({
  format: "nashepo.checks",
  version: 1,
  checks: [],
  sets: []
});
async function Rn(t, e) {
  const n = t.shadowRoot || t.attachShadow({ mode: "open" }), s = _e(t);
  let o = e.projectToken(), i = o ? ie.get(o) : void 0, a = "";
  if (!i && e.projectWorkspace?.())
    try {
      i = await te.open(e.projectWorkspace());
    } catch (d) {
      a = String(d);
    }
  i && o && ie.set(o, i);
  let r = (o ? Qt.get(o) : void 0) || i?.loaded || De();
  o && Qt.set(o, r);
  let c, p = r.checks[0]?.id || "", h = "select", m = "", x = 0, g = !1, v = !1, q, E = !0, k = !1, A, S = !1;
  const N = /* @__PURE__ */ new Set();
  let L, B, D = 0;
  const j = () => r.checks.find((d) => d.id === p), l = (d) => n.querySelector("#" + d);
  n.innerHTML = `<style>${Fn}</style><main><header class="commandbar"><div class="brand"><img src="${On}" alt=""><b>НашеПО</b><small>${Ge}</small></div><div class="check-heading"><input id="name" aria-label="Имя проверки" placeholder="Выберите проверку"><small id="check-summary">Проверка не выбрана</small></div><div id="tabs" class="tabs">${[
    ["select", "Выбор"],
    ["results", "Результаты"],
    ["rules", "Правила"],
    ["report", "Отчёт"]
  ].map(([d, u]) => `<button data-tab="${d}">${u}</button>`).join(
    ""
  )}</div><div class="header-actions"><button id="scan" title="Перечитать список и геометрию выбранных моделей">↻ Модели</button><button id="run" class="primary">▶ Запустить</button><button id="cancel" hidden>Остановить</button><details class="more-menu"><summary title="Другие команды">⋮</summary><div class="more-popover"><button id="open">Открыть проверки</button><button id="save">Сохранить проверки</button><button id="copy">Копировать проверку</button><button id="delete">Удалить проверку</button><button id="settings">Настройки</button><button id="help">Справка</button></div></details></div><span id="dirty"></span></header><div id="run-progress" class="run-progress" hidden><span id="run-phase">Подготовка</span><div id="run-bar" class="run-bar" role="progressbar"><i id="run-fill"></i></div><span id="run-value"></span></div><div class="notice" id="notice" role="status">Откройте IFC/SMDX в проекте и нажмите «Модели».</div><div class="workspace"><aside><div class="aside-title">Проверки</div><input id="test-search" type="search" placeholder="Поиск проверок"><div id="checks"></div><div class="aside-actions"><button id="all">Запустить все</button><button id="new" class="primary">＋ Новая проверка</button></div></aside><section class="main"><div id="content"></div></section></div><footer><span id="model-count">Модели не прочитаны</span><span>Расчёт выполняется на вашем компьютере</span></footer><input id="file" type="file" accept=".json" hidden><dialog id="settings-dialog"><h2>Настройки</h2><label>Дистанция камеры, м<input id="distance" type="number" value="15" min="0.5"></label><p class="links"><a href="https://nashepo.ru/" target="_blank" rel="noopener noreferrer">Сайт НашеПО</a><a href="https://t.me/RoburFan" target="_blank" rel="noopener noreferrer">Telegram</a></p><button data-close="settings-dialog">Закрыть</button></dialog><dialog id="help-dialog">${Ke}<button data-close="help-dialog">Закрыть</button></dialog><dialog id="set-dialog"><h2>Сохранить набор моделей</h2><label>Название<input id="set-name" maxlength="120"></label><div class="dialog-actions"><button id="set-cancel">Отмена</button><button id="set-confirm" class="primary">Сохранить</button></div></dialog></main>`;
  const M = document.createElement("button");
  M.id = "clear-project", M.textContent = "Очистить проект", l("save").after(M);
  const $ = document.createElement("button");
  $.id = "project-folder", $.textContent = "Папка проверок…", l("open").before($);
  const O = document.createElement("span");
  O.id = "project-storage", n.querySelector("footer").prepend(O);
  const T = () => {
    O.textContent = i ? `Папка: ${i.label}` : "Папка проверок не выбрана", O.title = a || O.textContent;
  };
  T(), n.querySelector(".more-popover").addEventListener(
    "click",
    () => n.querySelector(".more-menu").removeAttribute("open")
  );
  const P = (d, u = !1) => {
    l("notice").textContent = d, l("notice").classList.toggle("error", u);
  }, w = (d, u, b, y) => {
    const I = l("run-progress"), F = l("run-bar"), z = l("run-fill");
    if (I.hidden = !1, l("notice").hidden = !0, l("run-phase").textContent = d, b && b > 0 && u !== void 0) {
      const U = Math.max(0, Math.min(100, u / b * 100));
      z.style.width = `${U}%`, F.setAttribute("aria-valuemin", "0"), F.setAttribute("aria-valuemax", "100"), F.setAttribute("aria-valuenow", String(Math.round(U))), l("run-value").textContent = `${Math.round(U)}% · ${u}/${b}` + (y === void 0 ? "" : ` · найдено ${y}`);
    } else
      z.style.width = "0", F.removeAttribute("aria-valuenow"), l("run-value").textContent = y === void 0 ? "" : `Найдено ${y}`;
    F.setAttribute("aria-valuetext", l("run-value").textContent || d);
  }, C = () => {
    l("run-progress").hidden = !0, l("notice").hidden = !1;
  }, W = async (d) => {
    try {
      await d();
    } catch (u) {
      P(u instanceof Error ? u.message : String(u), !0);
    }
  }, X = () => new Promise((d) => {
    const u = l("set-dialog"), b = l("set-name");
    let y = !1;
    const I = (F) => {
      y || (y = !0, u.close(), d(F));
    };
    b.value = "Новый набор", l("set-confirm").onclick = () => {
      const F = b.value.trim();
      F ? I(F) : b.focus();
    }, l("set-cancel").onclick = () => I(), u.oncancel = (F) => {
      F.preventDefault(), I();
    }, u.showModal(), b.focus(), b.select();
  });
  let lt = 0;
  const nt = async (d = i, u = r, b = o, y = lt) => {
    try {
      return d ? (await d.save(u), u === r && b === o && y === lt && (k = !1, l("dirty").textContent = "Сохранено в папке проекта"), !0) : !1;
    } catch (I) {
      return b === o && (l("dirty").textContent = "Не удалось сохранить в папку", P(I instanceof Error ? I.message : String(I), !0)), !1;
    }
  }, Ft = (d = 750) => {
    clearTimeout(A);
    const u = i, b = r, y = o, I = lt;
    A = window.setTimeout(async () => {
      await nt(u, b, y, I);
    }, d);
  }, H = () => {
    k = !0, lt++, l("dirty").textContent = "Есть несохранённые изменения", o && Qt.set(o, r), Ft();
  }, J = async () => {
    const d = e.projectToken();
    if (d === o) return !1;
    clearTimeout(A), k && await nt();
    let u = d ? ie.get(d) : void 0;
    if (a = "", !u && e.projectWorkspace?.())
      try {
        u = await te.open(e.projectWorkspace());
      } catch (b) {
        a = String(b);
      }
    return d !== e.projectToken() ? !1 : (r = (d ? Qt.get(d) : void 0) || u?.loaded || De(), i = u, d && (Qt.set(d, r), u && ie.set(d, u)), o = d, c = void 0, p = r.checks[0]?.id || "", m = "", N.clear(), x = 0, k = !1, e.clear(), l("dirty").textContent = "", T(), !0);
  }, pt = async () => {
    if (k && i && !await nt()) return !1;
    const d = o, u = await e.chooseProjectFolder();
    if (!u) return !1;
    const b = await te.open(u);
    if (d !== e.projectToken()) throw Error("Активный проект изменился. Выберите папку повторно.");
    if (b.loaded) {
      if ((r.checks.length || r.sets.length) && !confirm("В папке уже есть проверки. Открыть их вместо текущих? Текущие проверки можно заранее сохранить в JSON.")) return !1;
      r = b.loaded, p = r.checks[0]?.id || "", m = "", N.clear(), c = void 0, e.clear();
    }
    if (clearTimeout(A), i = b, d && (ie.set(d, b), Qt.set(d, r)), a = "", T(), K(), b.loaded)
      k = !1, l("dirty").textContent = "Проверки открыты из папки";
    else if (!await nt()) return !1;
    return P("Папка проверок подключена. Правила, результаты, статусы, комментарии и снимки сохраняются в неё автоматически."), !0;
  };
  $.onclick = () => W(async () => {
    if (!g) {
      et(!0);
      try {
        await pt();
      } finally {
        et(!1);
      }
    }
  });
  const rt = () => {
    const d = j();
    d?.lastRun && (d.status = "stale"), H(), ht();
  }, vt = () => [
    ...new Set(
      (c?.elements || []).flatMap((d) => Object.keys(d.properties))
    )
  ].sort(), dt = (d, u) => d.map(
    (b) => `<option value="${st(b)}" ${b === u ? "selected" : ""}>${st(b)}</option>`
  ).join("");
  function zt() {
    const d = j(), u = l("result-search")?.value.toLowerCase() || "", b = l("result-state")?.value || "", y = Number(l("result-depth")?.value || 0);
    return (d?.results || []).filter(
      (I) => (!b || I.state === b) && (d?.type === "duplicates" || Be(I, y, d?.precision ?? 0)) && (!u || JSON.stringify({ ...I, image: void 0 }).toLowerCase().includes(u))
    );
  }
  function ht() {
    const d = l("test-search").value.toLowerCase();
    l("checks").innerHTML = r.checks.filter((u) => u.name.toLowerCase().includes(d)).map(
      (u) => `<button class="check-item ${u.id === p ? "active" : ""}" data-check="${u.id}"><strong>${st(u.name)}</strong><small>${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[u.status]} · ${u.results.filter((b) => !["resolved", "excluded"].includes(b.state)).length} в работе / ${u.results.length}</small></button>`
    ).join("");
  }
  function $t(d, u) {
    const b = c?.elements.filter(
      (Y) => (j().includeHidden || !Y.hidden) && Kt(Y, d)
    ).length || 0, y = d.manualOnly ? it(d) : d.modelsMode === "selected" ? d.models : (c?.models || []).map((Y) => Y.id), I = c && y.every((Y) => c.indexedModelIds.includes(Y)) ? `${b} элементов` : "число после запуска", F = c?.models || [], z = d.modelsMode !== "selected", U = r.sets.map(
      (Y) => `<option value="${st(Y.id)}" ${d.presetId === Y.id ? "selected" : ""}>${st(Y.name)}</option>`
    ).join("");
    return `<article class="selection" data-side="${u}"><h3>Выбор ${u.toUpperCase()} <span data-selection-count>${I}</span></h3>${d.manualOnly ? '<p class="selection-mode">Только элементы, выбранные вручную</p>' : ""}<div class="preset-row"><select class="preset"><option value="">Набор моделей…</option>${U}</select><button data-selection="load-set">Применить</button><button data-selection="save-set">Сохранить набор</button><button data-selection="delete-set" ${d.presetId ? "" : "disabled"}>Удалить</button></div><div class="model-list"><label class="model-all"><input type="checkbox" class="all-models" ${z ? "checked" : ""}> Все модели</label>${F.map((Y) => `<label><input type="checkbox" class="model-check" value="${st(Y.id)}" ${z || d.models.includes(Y.id) ? "checked" : ""}> ${st(Y.name)}</label>`).join("") || "<small>Нажмите «Модели».</small>"}</div><small>Отметьте файлы, которые должны участвовать в выборе ${u.toUpperCase()}.</small><div class="selection-tools"><button data-selection="show">Показать выбранные элементы</button><button data-selection="only">Только выделенные в 3D</button><button data-selection="include">＋ Добавить из 3D</button><button data-selection="exclude">− Исключить из 3D</button><button data-selection="reset">Сбросить ручной выбор</button></div><small>Добавлено вручную: ${d.include.length} · исключено: ${d.exclude.length}</small></article>`;
  }
  function K() {
    ht();
    const d = j();
    l("name").value = d?.name || "", l("check-summary").textContent = d ? `${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[d.status]} · ${d.results.filter((u) => !["resolved", "excluded"].includes(u.state)).length} в работе / ${d.results.length}` : "Проверка не выбрана";
    for (const u of ["name", "copy", "delete", "run"])
      l(u).disabled = !d || g;
    for (const u of n.querySelectorAll("[data-tab]"))
      u.classList.toggle("active", u.dataset.tab === h);
    if (!d) {
      l("content").innerHTML = '<div class="empty"><h2>Создайте первую проверку</h2><p>Обновите модели, затем выберите, какие элементы проверять друг с другом.</p></div>';
      return;
    }
    h === "select" && (l("content").innerHTML = `<div class="choose-layout"><div class="parameters"><h3>Параметры проверки</h3><label>Тип<select id="type"><option value="intersection" ${d.type === "intersection" ? "selected" : ""}>По пересечению</option><option value="duplicates" ${d.type === "duplicates" ? "selected" : ""}>Дублирование</option></select></label><label title="Запас при отборе и фильтрации; не обнуляет малые вхождения и не гарантирует погрешность оценки">Точность расчёта, мм<input id="precision" type="number" value="${d.precision}" min="0.001" max="100" step="0.1"></label><label title="Конфликты с меньшей оценкой глубины не попадут в результат">Минимальная глубина, мм<input id="min-penetration" type="number" value="${d.minPenetration}" min="0" max="100000" step="1" ${d.type === "duplicates" ? "disabled" : ""}></label><label class="check"><input id="touching" type="checkbox" ${d.touching ? "checked" : ""} ${d.type === "duplicates" ? "disabled" : ""}>Учитывать касания</label><small>Для отбора — большее из толщины перекрытия и захода вдоль оси профиля или трассы. Подробнее — в справке.</small><p class="legend"><span class="part-a">● Выбор А</span><span class="part-b">● Выбор Б</span></p></div><div class="selection-grid">${$t(d.a, "a")}${$t(d.b, "b")}</div></div><datalist id="property-fields">${dt(vt(), "")}</datalist>`), h === "rules" && (l("content").innerHTML = `<div class="rules"><h3>Исключение пар</h3><p>Элемент сам с собой не проверяется. Пара А/Б учитывается один раз.</p><label class="check"><input id="same-model" type="checkbox" ${d.ignoreSameModel ? "checked" : ""}>Не проверять элементы одной модели</label><label class="check"><input id="same-group" type="checkbox" ${d.ignoreSameGroup ? "checked" : ""}>Не проверять геометрию одного составного объекта</label><label>Не проверять пары с одинаковым значением свойства<input id="equal-property" list="property-fields" value="${st(d.equalProperty)}" placeholder="Без ограничения"></label><label class="check"><input id="hidden" type="checkbox" ${d.includeHidden ? "checked" : ""}>Включать скрытые элементы прочитанных моделей</label><p>Незагруженные подключённые файлы нужно открыть перед расчётом.</p><datalist id="property-fields">${dt(vt(), "")}</datalist></div>`), h === "results" && (l("content").innerHTML = `<div class="result-tools"><div class="result-filters"><input id="result-search" type="search" placeholder="Поиск по результатам"><select id="result-state"><option value="">Все состояния</option>${Object.entries(
      Vt
    ).map(([u, b]) => `<option value="${u}">${b}</option>`).join("")}</select>${d.type === "intersection" ? '<input id="result-depth" type="number" min="0" step="1" placeholder="Глубина от, мм">' : ""}<button id="show-markers" role="switch" aria-checked="${E}">${E ? "● Знаки" : "○ Знаки"}</button><span id="result-count"></span></div><div class="bulk-tools"><select id="bulk-state" title="Состояние для выбранных строк">${Object.entries(
      Vt
    ).map(([u, b]) => `<option value="${u}">${b}</option>`).join("")}</select><button id="bulk">Применить</button></div></div><div class="result-area"><div class="table-area"><div class="scroll" id="table"></div><div class="pager"><span id="selection-count"></span><button id="prev-page">←</button><span id="page"></span><button id="next-page">→</button></div></div><div class="detail" id="detail"></div></div>`, ot(), ft()), h === "report" && (l("content").innerHTML = `<div class="report"><h3>${st(d.name)}</h3><p>Результатов: ${d.results.length}. Выбрано: ${N.size}. ${d.status === "stale" ? "Результаты устарели — рекомендуется повторный запуск." : ""}</p><label class="check"><input id="selected-only" type="checkbox" ${N.size ? "checked" : ""}>Только выбранные строки</label><label class="check"><input id="report-images" type="checkbox" checked>Добавить снимки (недостающие будут созданы автоматически)</label><button id="export-html" class="primary">Сформировать пакет отчёта (.zip)</button><p>Один архив открывается напрямую в плагине Топоматик 360 «Коллизии». Для Robur распакуйте архив и откройте HTML: папка снимков уже связана с ним. Внутри также находятся manifest.json и review.json для сохранения идентификаторов и дальнейшего обмена статусами.</p><p>Правила и все результаты сохраняются кнопкой «Сохранить проверки» в верхней панели.</p></div>`), l("content").inert = g;
  }
  const xt = (d) => d.axialPenetrationMm !== void 0 ? `Для отбора используется большее значение: толщина ${d.overlapThicknessMm === void 0 ? "не определена" : jt(d.overlapThicknessMm) + " мм"}; продольный заход ${jt(d.axialPenetrationMm)} мм` : d.kind === "touch" ? "Тела соприкасаются, общего объёма нет" : d.depth === "unmeasurable" ? "У элемента нет собственного объёма, замер глубины к нему неприменим" : d.depth === "tolerance" ? "Пересечение найдено, но его глубина не разрешена при текущем расчёте" : d.depth === "approximate" ? "Восстановлена внутренняя область оболочки, совмещены швы либо сокращён расчёт; точность числа не гарантируется" : "Оценка локальной толщины перекрытия двух элементов";
  function ot() {
    const d = j(), u = zt(), b = Math.max(1, Math.ceil(u.length / 50));
    x = Math.max(0, Math.min(x, b - 1));
    const y = u.slice(x * 50, x * 50 + 50);
    l("table").innerHTML = u.length ? `<table><thead><tr><th><input id="check-page" type="checkbox" aria-label="Выбрать страницу" ${y.every((I) => N.has(I.id)) ? "checked" : ""}></th>${["№", "Состояние", "Глубина, мм", "Длина контакта, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "Комментарий"].map((I) => `<th>${I}</th>`).join("")}</tr></thead><tbody>${y.map((I, F) => `<tr data-result="${st(I.id)}" class="${I.id === m ? "active" : ""}"><td><input type="checkbox" class="row-check" aria-label="Выбрать конфликт" ${N.has(I.id) ? "checked" : ""}></td>${[x * 50 + F + 1, Vt[I.state], Me(I, d.type), I.contactLengthMm === void 0 ? "—" : "≈ " + jt(I.contactLengthMm), I.a.name, I.a.model, I.a.guid || "—", I.b.name, I.b.model, I.b.guid || "—", I.note].map((z) => `<td title="${st(z)}">${st(z)}</td>`).join("")}</tr>`).join("")}</tbody></table>` : '<div class="empty">Нет результатов. Запустите проверку или измените фильтры.</div>', l("page").textContent = `${x + 1} / ${b}`, l("result-count").textContent = `${u.length} результатов`, l("selection-count").textContent = `Выбрано: ${N.size}`, l("prev-page").disabled = x === 0, l("next-page").disabled = x === b - 1;
  }
  function ft() {
    const d = j(), u = zt(), b = u.findIndex((I) => I.id === m), y = d?.results.find((I) => I.id === m);
    l("detail").innerHTML = y ? `<div class="detail-head"><div><small>КОЛЛИЗИЯ</small><h3>#${b + 1} ${st(y.a.name)} × ${st(y.b.name)}</h3></div><div class="detail-nav"><button id="previous" title="Предыдущая коллизия" ${b <= 0 ? "disabled" : ""}>‹</button><button id="next" title="Следующая коллизия" ${b < 0 || b >= u.length - 1 ? "disabled" : ""}>›</button></div></div><div class="clash-summary"><span>${d?.type === "duplicates" ? "Дублирование" : "Пересечение"}</span><span title="${st(xt(y))}">${d?.type === "duplicates" ? "Совпадение геометрии" : y.kind === "touch" ? "Касание" : y.depth ? Ve[y.depth] : `Глубина ${jt(y.penetrationMm)} мм`}</span><span>${st(Vt[y.state])}</span></div><p class="legend"><span class="part-a">● Элемент А</span><span class="part-b">● Элемент Б</span></p><div class="preview-slot">${y.image ? `<button id="open-image" class="preview"><img src="${st(y.image)}" alt="Снимок коллизии"><span>Открыть крупнее</span></button>` : '<div class="preview-empty"><span>◫</span><small>Снимок создастся после перехода в 3D</small></div>'}</div><div class="detail-actions"><button id="focus" class="primary">Перейти в 3D</button><button id="capture-image">▣ Снимок пары</button></div><div class="detail-scroll">${y.axialPenetrationMm !== void 0 ? `<div class="depth-breakdown"><span>Толщина перекрытия</span><b>${y.overlapThicknessMm === void 0 ? "—" : jt(y.overlapThicknessMm) + " мм"}</b><span>Заход вдоль оси</span><b>${jt(y.axialPenetrationMm)} мм</b><small>Для фильтра — большее из двух значений. Заход учитывает внутреннее пространство конструкции.</small></div>` : ""}${y.contactLengthMm !== void 0 ? `<div class="depth-breakdown"><span>Длина контакта вдоль элемента</span><b>≈ ${jt(y.contactLengthMm)} мм</b><small>Непрерывный участок соприкосновения поверхностей. Это длина контакта, а не глубина; порог глубины её не учитывает.</small></div>` : ""}<div class="coordinates">${y.point.map((I, F) => `<span>${["X", "Y", "Z"][F]} ${I.toFixed(3)}</span>`).join("")}</div><label>Состояние<select id="edit-state">${Object.entries(
      Vt
    ).map(
      ([I, F]) => `<option value="${I}" ${y.state === I ? "selected" : ""}>${F}</option>`
    ).join(
      ""
    )}</select></label><label>Назначение<input id="assignee" value="${st(y.assignee)}"></label><label>Комментарий<textarea id="note" rows="2">${st(y.note)}</textarea></label>${[
      y.a,
      y.b
    ].map(
      (I, F) => `<details><summary>Элемент ${F ? "Б" : "А"} · свойства</summary><dl>${Object.entries(
        I.properties
      ).map(([z, U]) => `<dt>${st(z)}</dt><dd>${st(U)}</dd>`).join("")}</dl></details>`
    ).join("")}</div>` : '<div class="detail-empty"><span>◫</span><p>Выберите коллизию в таблице</p><small>Двойной щелчок сразу перенесёт камеру в 3D.</small></div>';
  }
  const it = (d) => {
    const u = new Set(
      !d.manualOnly && d.modelsMode === "selected" ? d.models : []
    );
    for (const b of d.include)
      try {
        u.add(String(JSON.parse(b)[0]));
      } catch {
        const y = c?.elements.find(
          (I) => I.id === b
        )?.modelId;
        y && u.add(y);
      }
    return [...u];
  }, at = (d) => {
    if (!d?.length) return;
    const u = /* @__PURE__ */ new Set();
    for (const b of d)
      for (const y of [b.a, b.b]) {
        if (!y.manualOnly && y.modelsMode !== "selected") return;
        for (const I of it(y)) u.add(I);
      }
    return u;
  }, Nt = (d) => {
    let u = d.trim().replace(/\\/g, "/").toLocaleLowerCase();
    try {
      u = decodeURIComponent(u);
    } catch {
    }
    u = u.replace(/[?#].*$/, "");
    const b = u.split("/").filter(Boolean).at(-1) || u;
    return /* @__PURE__ */ new Set([u, b]);
  }, Rt = (d) => {
    const u = new Set(d.map((U) => U.id)), b = d.map((U) => ({
      id: U.id,
      aliases: /* @__PURE__ */ new Set([
        ...Nt(U.id),
        ...Nt(U.name)
      ])
    })), y = (U) => {
      if (u.has(U)) return U;
      const Y = Nt(U), G = b.filter(
        (tt) => [...Y].some((Z) => tt.aliases.has(Z))
      );
      return G.length === 1 ? G[0].id : U;
    }, I = (U) => {
      try {
        const Y = JSON.parse(U);
        if (!Array.isArray(Y) || Y.length < 2) return U;
        const G = String(Y[0]), tt = y(G);
        return tt === G ? U : JSON.stringify([tt, ...Y.slice(1)]);
      } catch {
        return U;
      }
    };
    let F = !1;
    const z = (U) => {
      const Y = U.models.map(y), G = U.include.map(I), tt = U.exclude.map(I);
      (Y.some((Z, Q) => Z !== U.models[Q]) || G.some((Z, Q) => Z !== U.include[Q]) || tt.some((Z, Q) => Z !== U.exclude[Q])) && (U.models = [...new Set(Y)], U.include = [...new Set(G)], U.exclude = [...new Set(tt)], F = !0);
    };
    for (const U of r.checks)
      z(U.a), z(U.b), U.modelsAtRun && (U.modelsAtRun = U.modelsAtRun.map(y));
    for (const U of r.sets) {
      const Y = U.selection.models.map(y);
      Y.some((G, tt) => G !== U.selection.models[tt]) && (U.selection.models = [...new Set(Y)], F = !0);
    }
    return F && H(), F;
  }, yt = () => {
    const d = j();
    if (d)
      for (const u of n.querySelectorAll("[data-side]")) {
        const b = u.dataset.side, y = c?.elements.filter(
          (U) => (d.includeHidden || !U.hidden) && Kt(U, d[b])
        ).length || 0, I = d[b].manualOnly ? it(d[b]) : d[b].modelsMode === "selected" ? d[b].models : (c?.models || []).map((U) => U.id), F = !!c && I.every((U) => c.indexedModelIds.includes(U)), z = u.querySelector(
          "[data-selection-count]"
        );
        z && (z.textContent = F ? `${y} элементов` : "число после запуска");
      }
  };
  function Ot() {
    S && e.markers(
      zt(),
      m,
      E,
      (d) => W(() => Yt(d, !0))
    );
  }
  function Yt(d, u = !1) {
    if (!g) {
      if (m = d, h === "results") {
        const b = zt().findIndex((I) => I.id === d), y = b < 0 ? x : Math.floor(b / 50);
        y !== x && (x = y, ot());
        for (const I of n.querySelectorAll("[data-result]"))
          I.classList.toggle("active", I.dataset.result === d);
        ft(), requestAnimationFrame(() => {
          [...n.querySelectorAll("[data-result]")].find(
            (F) => F.dataset.result === d
          )?.scrollIntoView({ block: "nearest", inline: "nearest" });
        });
      }
      if (Ot(), u && S) {
        const b = j()?.results.find((y) => y.id === d);
        b && (e.focus(b, Number(l("distance").value)), ae(b));
      }
    }
  }
  function ae(d) {
    clearTimeout(B);
    const u = ++D, b = Number(l("distance").value);
    d.image && d.imageScope === "pair-ab" && d.imageDistance === b || !e.canLocate(d) || (B = window.setTimeout(async () => {
      if (!(!S || u !== D || g || m !== d.id))
        try {
          const y = await e.snapshot(
            d,
            b,
            () => u !== D || g || m !== d.id,
            !1,
            !1
          );
          if (u !== D || m !== d.id) return;
          d.image = y, d.imageScope = "pair-ab", d.imageDistance = b, H(), h === "results" && ft();
        } catch (y) {
          u === D && m === d.id && P(
            "Не удалось создать снимок выбранной коллизии: " + (y instanceof Error ? y.message : String(y)),
            !0
          );
        }
    }, 500));
  }
  async function pe(d) {
    v = !1, et(!0), w("Создание снимка пары");
    try {
      const u = Number(l("distance").value);
      d.image = await e.snapshot(d, u, () => v || !S), d.imageScope = "pair-ab", d.imageDistance = u, H(), h === "results" && m === d.id && ft();
    } catch (u) {
      P(
        "Результаты сохранены. Снимок пары не создан: " + (u instanceof Error ? u.message : String(u)),
        !0
      );
    } finally {
      C(), et(!1);
    }
  }
  async function bt(d, u = !1) {
    await J(), w("Подготовка моделей");
    let b = u ? /* @__PURE__ */ new Set() : at(d);
    if (!u && b?.size) {
      const y = await e.scan(
        (I) => w(I),
        () => v,
        /* @__PURE__ */ new Set()
      );
      c = y, Rt(y.models) && (b = at(d));
    }
    c = await e.scan(
      (y) => {
        P(y), w(y);
      },
      () => v,
      b
    ), Rt(c.models), l("model-count").textContent = `Проиндексировано моделей: ${c.indexedModelIds.length} из ${c.models.length} · элементов: ${c.elements.length}`, K(), P(
      c.blockers.length ? c.blockers.join(" ") : c.warnings.length ? `Модели прочитаны с замечаниями. ${c.warnings.join(" ")}` : "Модели прочитаны. Настройте выборки и запустите проверку.",
      !!c.blockers.length
    );
  }
  const et = (d) => {
    g = d, d && (clearTimeout(B), D++);
    for (const u of [
      "new",
      "scan",
      "open",
      "all",
      "copy",
      "delete",
      "name",
      "run",
      "save",
      "clear-project",
      "project-folder"
    ])
      l(u).disabled = d;
    l("cancel").hidden = !d, l("content").inert = d, l("checks").inert = d;
  };
  async function It(d) {
    const u = (y) => {
      const I = `${d.name} · ${y.phase}`;
      P(`${I} ${y.done}/${y.total} · найдено ${y.found}`), w(I, y.done, y.total, y.found);
    };
    let b;
    try {
      b = new yn();
    } catch {
      return xn(
        c.elements,
        d,
        u,
        () => v,
        (y) => e.geometry(y, () => v)
      );
    }
    return q = b, new Promise((y, I) => {
      const F = () => {
        b.terminate(), q = void 0, L = void 0;
      };
      L = () => {
        F(), I(Error("Расчёт отменён. Предыдущие результаты сохранены."));
      }, b.onmessage = async (z) => {
        if (z.data.load) {
          try {
            const U = await e.geometry(
              z.data.load,
              () => v || q !== b
            );
            if (q !== b) return;
            const Y = [
              U.vertices?.buffer,
              U.indices?.buffer
            ].filter(Boolean);
            b.postMessage(
              { request: z.data.request, geometry: U },
              Y
            );
          } catch (U) {
            q === b && b.postMessage({
              request: z.data.request,
              error: U instanceof Error ? U.message : String(U)
            });
          }
          return;
        }
        z.data.progress ? u(z.data.progress) : (F(), z.data.error ? I(Error(z.data.error)) : y(z.data.results));
      }, b.onerror = (z) => {
        F(), I(
          Error(
            `Не удалось запустить расчёт в фоновом потоке: ${z.message || "ошибка загрузки"}`
          )
        );
      }, b.postMessage({
        elements: c.elements,
        streaming: typeof e.geometry == "function",
        check: structuredClone({ ...d, results: [], warnings: [] })
      });
    });
  }
  async function Ct(d = !1) {
    if (!g) {
      et(!0);
      try {
        if (await J(), !o) throw Error("Сначала откройте модели в Топоматик 360.");
        if (a) throw Error("Не удалось открыть хранилище проверок. Выберите исправную папку через «Папка проверок…». " + a);
        if (!i && !await pt())
          return;
        if (!await nt()) throw Error("Проверка не запущена: сначала восстановите запись в папку проекта.");
        const u = d ? [...r.checks] : [j()].filter(Boolean);
        if (!u.length) throw Error("Создайте проверку.");
        for (const b of u)
          for (const y of [b.a, b.b])
            y.conditions = [], y.mode = "all";
        v = !1, et(!0), w("Подготовка моделей");
        try {
          if (await bt(u), et(!0), c.blockers.length)
            throw Error(
              "Состав моделей прочитан не полностью. " + c.blockers.join(" ")
            );
          for (const y of u) {
            if (v) break;
            for (const U of ["a", "b"]) {
              const Y = y[U], G = U === "a" ? "А" : "Б";
              if (Y.modelsMode === "selected" && Y.models.some((Z) => !c.models.some((Q) => Q.id === Z)))
                throw Error(
                  `${y.name}: одна из моделей выборки отсутствует. Исправьте выборку.`
                );
              if (Y.include.some((Z) => !c.elements.some((Q) => Q.id === Z)))
                throw Error(
                  `${y.name}: вручную добавленный элемент отсутствует в модели.`
                );
              const tt = We(c.elements, Y, y.includeHidden);
              if (tt) throw Error(`${y.name} · выбор ${G}: ${tt}`);
            }
            const I = en(y);
            if (y.configAtRun === I && y.modelsAtRun?.some(
              (U) => !c.models.some((Y) => Y.id === U)
            ))
              throw Error(
                `${y.name}: состав моделей уменьшился. Подключите прежние модели или создайте копию проверки для нового состава. Прежние результаты сохранены.`
              );
            const F = await It(y);
            if (v || !e.isCurrent())
              throw Error(
                "Проект изменился или расчёт отменён. Предыдущие результаты сохранены."
              );
            const z = (/* @__PURE__ */ new Date()).toISOString();
            y.results = on(
              y.configAtRun === I ? y.results : [],
              F,
              z
            ), y.lastRun = z, y.fingerprint = c.fingerprint, y.configAtRun = I, y.modelsAtRun = [...c.indexedModelIds], y.status = "done", y.warnings = [...c.warnings], p = y.id, m = y.results[0]?.id || "", N.clear(), H();
          }
          h = "results", K(), Ot(), P(
            `Проверка завершена. ${j()?.results.length || 0} результатов.`
          );
          const b = j()?.results.find((y) => y.id === m);
          b && !v && S && await pe(b), clearTimeout(A), await nt();
        } finally {
          C(), et(!1), K();
        }
      } finally {
        et(!1);
      }
    }
  }
  function Mt(d) {
    const u = d.closest("[data-side]")?.dataset.side;
    if (!u) return;
    const b = j()[u], y = d, I = d.closest("[data-side]");
    if (y.classList.contains("preset")) {
      b.presetId = y.value || void 0, I.querySelector(
        '[data-selection="delete-set"]'
      ).disabled = !b.presetId;
      return;
    }
    if (y.classList.contains("all-models")) {
      for (const F of I.querySelectorAll(
        ".model-check"
      ))
        F.checked = y.checked;
      b.modelsMode = y.checked ? "all" : "selected", b.models = [], b.manualOnly = !1, b.presetId = void 0;
    }
    if (y.classList.contains("model-check")) {
      const F = [
        ...I.querySelectorAll(".model-check")
      ], z = F.filter((Y) => Y.checked).map((Y) => Y.value), U = F.length > 0 && z.length === F.length;
      I.querySelector(".all-models").checked = U, b.modelsMode = U ? "all" : "selected", b.models = U ? [] : z, b.manualOnly = !1, b.presetId = void 0;
    }
    b.conditions = [], b.mode = "all", rt(), yt();
  }
  l("new").onclick = () => {
    const d = tn();
    d.name = `Проверка ${r.checks.length + 1}`, r.checks.push(d), p = d.id, h = "select", m = "", N.clear(), H(), K();
  }, l("scan").onclick = () => W(async () => {
    v = !1, et(!0), w("Чтение моделей");
    try {
      const d = j();
      await bt(d ? [d] : void 0, !d);
    } finally {
      C(), et(!1), K();
    }
  }), l("run").onclick = () => W(() => Ct()), l("all").onclick = () => W(() => Ct(!0)), l("cancel").onclick = () => {
    v = !0, L?.();
  }, l("test-search").oninput = ht, l("checks").onclick = (d) => {
    const u = d.target.closest(
      "[data-check]"
    );
    u && !g && (e.clear(), p = u.dataset.check, m = "", N.clear(), x = 0, K());
  }, l("tabs").onclick = (d) => {
    const u = d.target.closest("[data-tab]");
    u && !g && (h = u.dataset.tab, K());
  }, l("name").onchange = () => {
    const d = j();
    d && (d.name = l("name").value.trim() || "Проверка", H(), ht());
  }, l("copy").onclick = () => {
    const d = j();
    if (!d) return;
    const u = structuredClone(d);
    Object.assign(u, {
      id: crypto.randomUUID(),
      name: d.name + " — копия",
      results: [],
      lastRun: void 0,
      fingerprint: void 0,
      configAtRun: void 0,
      status: "new"
    }), r.checks.push(u), p = u.id, m = "", N.clear(), H(), K();
  }, l("delete").onclick = () => {
    j() && confirm(`Удалить проверку «${j().name}» и её результаты?`) && (r.checks = r.checks.filter((d) => d.id !== p), p = r.checks[0]?.id || "", N.clear(), e.clear(), H(), K());
  }, l("clear-project").onclick = () => {
    !r.checks.length && !r.sets.length || confirm(
      "Очистить проверки, наборы моделей и результаты текущего проекта?"
    ) && (r.checks = [], r.sets = [], c = void 0, p = "", m = "", N.clear(), e.clear(), H(), l("model-count").textContent = "Модели не прочитаны", K(), P("Данные проверок текущего проекта очищены."));
  }, l("save").onclick = () => {
    Oe("НашеПО-проверки.json", JSON.stringify(r, null, 2)), l("dirty").textContent = "Копия JSON подготовлена";
  }, l("open").onclick = () => l("file").click(), l("file").onchange = () => W(async () => {
    const d = l("file").files?.[0];
    if (!d) return;
    const u = Se(await d.text());
    k && !confirm("Заменить текущие несохранённые проверки данными из файла?") || (r = u, c && e.isCurrent() && Rt(c.models), o && Qt.set(o, r), H(), p = r.checks[0]?.id || "", m = "", N.clear(), e.clear(), l("dirty").textContent = "Проверки открыты; сохранение в папку…", K(), P("Проверки открыты. Обновите модели перед переходом к элементам."), l("file").value = "");
  });
  for (const d of ["settings", "help"])
    l(d).onclick = () => l(d + "-dialog").showModal();
  for (const d of n.querySelectorAll("[data-close]"))
    d.onclick = () => l(d.dataset.close).close();
  l("content").onchange = (d) => W(() => {
    const u = d.target, b = j();
    if (!b) return;
    if (u.closest("[data-side]")) {
      Mt(u);
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
    ].includes(u.id)) {
      if (u.id === "precision") {
        const I = Number(u.value);
        if (!Number.isFinite(I) || I < 1e-3 || I > 100)
          throw u.value = String(b.precision), Error("Точность должна быть от 0,001 до 100 мм.");
        b.precision = I;
      }
      if (u.id === "min-penetration") {
        const I = Number(u.value);
        if (!Number.isFinite(I) || I < 0 || I > 1e5)
          throw u.value = String(b.minPenetration), Error(
            "Минимальная глубина должна быть от 0 до 100 000 мм."
          );
        b.minPenetration = I;
      }
      u.id === "type" && (b.type = u.value), u.id === "touching" && (b.touching = u.checked), u.id === "same-model" && (b.ignoreSameModel = u.checked), u.id === "same-group" && (b.ignoreSameGroup = u.checked), u.id === "hidden" && (b.includeHidden = u.checked), u.id === "equal-property" && (b.equalProperty = u.value), rt(), K();
      return;
    }
    if (u.id === "result-state") {
      x = 0, ot();
      return;
    }
    if (u.id === "check-page") {
      for (const I of zt().slice(x * 50, x * 50 + 50))
        u.checked ? N.add(I.id) : N.delete(I.id);
      ot();
      return;
    }
    if (u.classList.contains("row-check")) {
      const I = u.closest("[data-result]").dataset.result;
      u.checked ? N.add(I) : N.delete(I), l("selection-count").textContent = `Выбрано: ${N.size}`;
      return;
    }
    const y = b.results.find((I) => I.id === m);
    y && (u.id === "edit-state" && (y.state = u.value, ot(), ht(), Ot()), u.id === "assignee" && (y.assignee = u.value), u.id === "note" && (y.note = u.value, ot()), H());
  }), l("content").oninput = (d) => {
    const u = d.target;
    (u.id === "result-search" || u.id === "result-depth") && (x = 0, ot());
    const b = j(), y = Number(u.value);
    b && u.id === "precision" && Number.isFinite(y) && y >= 1e-3 && y <= 100 && (b.precision = y, rt()), b && u.id === "min-penetration" && Number.isFinite(y) && y >= 0 && y <= 1e5 && (b.minPenetration = y, rt());
  }, l("content").onclick = (d) => W(async () => {
    const u = d.target, b = u.closest("button"), y = j();
    if (!y) return;
    if (b?.dataset.selection) {
      const F = b.closest("[data-side]").dataset.side, z = y[F], U = l("content").scrollTop;
      let Y = !0;
      switch (b.dataset.selection) {
        case "load-set": {
          const G = r.sets.find((tt) => tt.id === z.presetId);
          if (!G) throw Error("Выберите сохранённый набор моделей.");
          Object.assign(z, structuredClone(G.selection), {
            conditions: [],
            mode: "all",
            include: [],
            exclude: [],
            manualOnly: !1,
            presetId: G.id
          });
          break;
        }
        case "save-set": {
          if (z.manualOnly)
            throw Error(
              "Ручную выборку элементов нельзя сохранить как набор моделей."
            );
          const G = await X();
          if (!G) return;
          const tt = {
            id: crypto.randomUUID(),
            name: G,
            selection: {
              models: [...z.models],
              modelsMode: z.modelsMode,
              conditions: [],
              mode: "all"
            }
          };
          r.sets.push(tt), z.presetId = tt.id, Y = !1;
          break;
        }
        case "delete-set": {
          const G = r.sets.find((tt) => tt.id === z.presetId);
          if (!G) throw Error("Выберите сохранённый набор моделей.");
          if (!confirm(`Удалить набор «${G.name}»?`)) return;
          r.sets = r.sets.filter((tt) => tt.id !== G.id);
          for (const tt of r.checks)
            for (const Z of [tt.a, tt.b])
              Z.presetId === G.id && (Z.presetId = void 0);
          Y = !1;
          break;
        }
        case "show":
          e.select(
            (c?.elements || []).filter((G) => (y.includeHidden || !G.hidden) && Kt(G, z)).map((G) => G.id)
          );
          return;
        case "only": {
          const G = e.selected();
          if (!G.length) throw Error("Выделите элементы в 3D-сцене.");
          z.include = G, z.exclude = [], z.manualOnly = !0;
          break;
        }
        case "include": {
          const G = e.selected();
          if (!G.length) throw Error("Выделите элементы в 3D-сцене.");
          z.include = [.../* @__PURE__ */ new Set([...z.include, ...G])], z.exclude = z.exclude.filter((tt) => !G.includes(tt));
          break;
        }
        case "exclude": {
          const G = e.selected();
          if (!G.length) throw Error("Выделите элементы в 3D-сцене.");
          z.exclude = [.../* @__PURE__ */ new Set([...z.exclude, ...G])], z.include = z.include.filter((tt) => !G.includes(tt));
          break;
        }
        case "reset":
          z.manualOnly = !1, z.include = [], z.exclude = [];
      }
      Y ? rt() : H(), K(), l("content").scrollTop = U;
      return;
    }
    if (b?.id === "prev-page" && (x--, ot()), b?.id === "next-page" && (x++, ot()), b?.id === "show-markers" && (E = !E, b.textContent = E ? "● Знаки включены" : "○ Знаки выключены", b.setAttribute("aria-checked", String(E)), Ot()), b?.id === "bulk") {
      const F = l("bulk-state").value;
      for (const z of y.results) N.has(z.id) && (z.state = F);
      H(), ot(), ft(), ht(), Ot();
    }
    if (b?.id === "capture-image") {
      const F = y.results.find((z) => z.id === m);
      if (F) {
        v = !1, et(!0), w("Создание снимка пары");
        try {
          F.image = await e.snapshot(
            F,
            Number(l("distance").value),
            () => v,
            !0
          ), F.imageScope = "pair-ab", F.imageDistance = void 0, H(), ft(), P("Снимок сохранён в результат.");
        } finally {
          C(), et(!1);
        }
      }
      return;
    }
    if (b?.id === "open-image") {
      const F = y.results.find((z) => z.id === m);
      if (F?.image) {
        const z = document.createElement("dialog");
        z.className = "image-dialog", z.innerHTML = '<button>Закрыть</button><img alt="Снимок коллизии">', z.querySelector("img").src = F.image, z.querySelector("button").onclick = () => {
          z.close(), z.remove();
        }, n.append(z), z.showModal();
      }
      return;
    }
    if (b?.id === "focus" && Yt(m, !0), b?.id === "previous" || b?.id === "next") {
      const F = zt(), z = F.findIndex((U) => U.id === m) + (b.id === "next" ? 1 : -1);
      F[z] && Yt(F[z].id, !0);
    }
    if (b?.id === "export-html") {
      let F = 0;
      const z = l("selected-only").checked ? y.results.filter((G) => N.has(G.id)) : y.results;
      if (!z.length) throw Error("Нет результатов для отчёта.");
      if (l("report-images").checked) {
        const G = e.view, tt = G?.storeView(), Z = Number(l("distance").value);
        v = !1, et(!0), w("Подготовка снимков отчёта", 0, z.length);
        try {
          await e.captureWorkspace(async () => {
            let Q = 0;
            for (const ct of z) {
              if (v)
                throw Error(
                  "Подготовка отчёта отменена. Уже полученные снимки сохранены."
                );
              w(
                "Подготовка снимков отчёта",
                Q,
                z.length
              ), P("Подготовка снимков: " + (Q + 1) + " / " + z.length);
              const ut = ct.imageScope !== "pair-ab" || ct.imageDistance !== void 0 && ct.imageDistance !== Z;
              if (!ct.image || ut) {
                if (ct.state === "resolved" && !e.canLocate(ct)) {
                  Q++;
                  continue;
                }
                try {
                  ct.image = await e.snapshot(ct, Z, () => v), ct.imageScope = "pair-ab", ct.imageDistance = Z, H();
                } catch (mt) {
                  if (v || !e.isCurrent()) throw mt;
                  F++;
                }
              }
              Q++, w("Подготовка снимков отчёта", Q, z.length);
            }
          });
        } finally {
          if (G && e.isCurrent()) {
            const Q = y.results.find((ct) => ct.id === m);
            if (Q)
              try {
                e.focus(Q, Z, !1);
              } catch {
              }
            tt && G.restoreView(tt);
          }
          C(), et(!1);
        }
      }
      const U = l("report-images").checked ? z.map(
        (G) => G.imageScope === "pair-ab" ? G : { ...G, image: void 0 }
      ) : z.map((G) => ({ ...G, image: void 0 })), Y = zn(y, U, i?.projectId);
      Oe(Y.archiveName, Y.blob), P(
        "Отчёт подготовлен. Результатов: " + z.length + "; со снимками: " + U.filter((G) => G.image).length + "." + (F ? ` Не удалось создать снимков: ${F}; эти строки включены без изображения.` : ""),
        F > 0
      );
    }
    const I = u.closest("[data-result]");
    I && !u.closest("input") && !window.getSelection()?.toString() && Yt(I.dataset.result);
  }), l("content").ondblclick = (d) => {
    const u = d.target, b = u.closest("[data-result]");
    b && !u.closest("input") && W(() => Yt(b.dataset.result, !0));
  };
  let Pt = !1;
  const qt = setInterval(async () => {
    if (!(g || Pt)) {
      Pt = !0;
      try {
        await J() ? (l("model-count").textContent = "Модели не прочитаны", P(
          r.checks.length ? "Открыт другой проект. Показаны его проверки; обновите модели." : "Открыт другой проект. Для него ещё нет проверок."
        ), g || K()) : c && !e.isCurrent() && (c = void 0, e.clear(), l("model-count").textContent = "3D-окно изменилось", P("Активное 3D-окно изменилось. Обновите модели."), g || K());
      } finally {
        Pt = !1;
      }
    }
  }, 1500);
  K(), a && P("Не удалось открыть папку проверок: " + a, !0);
  const Ht = Dn(t, () => {
    S = !0, e.isCurrent() && Ot();
  }, () => {
    S = !1, clearTimeout(B), D++, e.clear();
  });
  return () => {
    Ht(), s(), clearInterval(qt), clearTimeout(A), k && nt(), clearTimeout(B), D++, v = !0, L?.(), q?.terminate(), e.clear();
  };
}
var ke = /* @__PURE__ */ ((t) => (t.object = "object", t.drawing = "drawing", t.table = "table", t.record = "record", t.textStyle = "textstyle", t.textStyleTable = "textstyles", t.linetype = "linetype", t.linetypeTable = "linetypes", t.layer = "layer", t.layerTable = "layers", t.block = "block", t.blockTable = "blocks", t.layout = "layout", t.layoutTable = "layouts", t.type = "type", t.typeTable = "types", t.material = "material", t.materialTable = "materials", t.geometry = "geometry", t.geometryTable = "geometries", t.group = "group", t.groupTable = "groups", t.attachment = "attachment", t.attachmentTable = "attachments", t.entities = "entities", t.entity = "entity", t.line = "l", t.solid = "s", t.insert = "i", t.polyline = "p", t.circle = "c", t.arc = "a", t.polyline3d = "p3", t.proxy = "x", t.text = "t", t.mtext = "mt", t.wipeout = "w", t.model3d = "g", t.alignment = "al", t))(ke || {});
const je = () => new Promise((t) => requestAnimationFrame(() => t()));
function Xe(t) {
  const { width: e, height: n } = t.camera, s = Array.from(document.querySelectorAll("canvas")).filter(
    (i) => {
      const a = i.getBoundingClientRect();
      return a.width > 100 && a.height > 100 && i.width > 0 && i.height > 0 && getComputedStyle(i).visibility !== "hidden" && (Math.abs(a.width - e) < 4 && Math.abs(a.height - n) < 4 || Math.abs(i.width - e) < 4 && Math.abs(i.height - n) < 4);
    }
  );
  if (!s.length)
    throw Error(
      "Снимок 3D-окна недоступен: откройте одно видимое окно модели."
    );
  const o = s[0].getBoundingClientRect();
  if (s.some((i) => {
    const a = i.getBoundingClientRect();
    return Math.abs(a.x - o.x) > 4 || Math.abs(a.y - o.y) > 4;
  }))
    throw Error(
      "Открыто несколько подходящих 3D-окон. Оставьте одно окно для снимка."
    );
  return { candidates: s, rect: o };
}
async function Tn(t) {
  await je(), t.repaint();
  const { candidates: e, rect: n } = Xe(t), s = document.createElement("canvas");
  s.width = Math.max(1, Math.round(n.width * devicePixelRatio)), s.height = Math.max(1, Math.round(n.height * devicePixelRatio)), Object.assign(s.style, {
    position: "fixed",
    left: `${n.left}px`,
    top: `${n.top}px`,
    width: `${n.width}px`,
    height: `${n.height}px`,
    zIndex: "2147483646",
    pointerEvents: "none"
  });
  const o = s.getContext("2d");
  for (const i of e)
    o.drawImage(i, 0, 0, s.width, s.height);
  return document.body.append(s), async () => {
    t.repaint(), await je(), s.remove();
  };
}
async function Hn(t, e) {
  if (await je(), e()) throw Error("Подготовка снимков отменена.");
  const { candidates: n } = Xe(t), s = document.createElement("canvas"), o = Math.min(1, 1280 / n[0].width);
  s.width = Math.round(n[0].width * o), s.height = Math.round(n[0].height * o);
  const i = s.getContext("2d");
  i.fillStyle = "#20242b", i.fillRect(0, 0, s.width, s.height), t.repaint();
  for (const a of n)
    i.drawImage(a, 0, 0, s.width, s.height);
  try {
    return s.toDataURL("image/jpeg", 0.82);
  } catch {
    throw Error("Браузер запретил чтение изображения 3D-окна.");
  }
}
const be = "nashepo.checks.points", Fe = "nashepo.checks.highlight";
function Re(t) {
  let e = performance.now();
  return async () => {
    if (t()) throw Error("Операция отменена.");
    performance.now() - e >= 16 && (await new Promise((n) => setTimeout(n, 0)), e = performance.now());
  };
}
function re(t, e, n, s = 0) {
  if (s > 12 || t == null) return;
  if (typeof t != "object") {
    n[e] = String(t);
    return;
  }
  if (Array.isArray(t)) {
    t.forEach((i, a) => re(i, `${e}[${a}]`, n, s + 1));
    return;
  }
  const o = t;
  if ("$value" in o) {
    re(o.$value, e, n, s + 1);
    return;
  }
  for (const [i, a] of Object.entries(o))
    i.startsWith("$") || re(a, e ? `${e}.${i}` : i, n, s + 1);
}
function Gn(t) {
  const e = t.vertices.length / 3, n = (a) => Number.isFinite(t.vertices[a * 3]) && Number.isFinite(t.vertices[a * 3 + 1]) && Number.isFinite(t.vertices[a * 3 + 2]), s = (a) => {
    const f = t.indices[a], r = t.indices[a + 1], c = t.indices[a + 2];
    return f < e && r < e && c < e && f !== r && r !== c && c !== f && n(f) && n(r) && n(c);
  };
  let o = 0;
  for (let a = 0; a < t.indices.length; a += 3) s(a) && (o += 3);
  if (o === t.indices.length) return t.indices;
  const i = new Uint32Array(o);
  for (let a = 0, f = 0; a < t.indices.length; a += 3)
    s(a) && (i[f++] = t.indices[a], i[f++] = t.indices[a + 1], i[f++] = t.indices[a + 2]);
  return i;
}
const xe = (t) => /\.wdx(?:[?#].*)?$/i.test(t);
class Bn {
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
  projectWorkspace() {
    const e = this.app?.workspace;
    return e && !e.inmemory && e.root.mimeType === "application/vnd.folder" && /\.wdx$/i.test(e.root.title) ? e : void 0;
  }
  async chooseProjectFolder() {
    return this.ctx.openFolderDialog({
      message: "Выберите папку проекта проверок: новую или с сохранёнными проверками",
      buttonLabel: "Открыть папку проверок"
    });
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
        (o) => requestAnimationFrame(() => requestAnimationFrame(() => o()))
      ));
    }
    try {
      return await e();
    } finally {
      if (this.captureDepth--, n && this.captureLayout) {
        const { panel: s, size: o, maximized: i } = this.captureLayout;
        this.captureLayout = void 0, s.size = o, s.maximized = i, await new Promise(
          (a) => requestAnimationFrame(() => requestAnimationFrame(() => a()))
        );
      }
    }
  }
  async scan(e, n, s) {
    const o = this.app, i = this.view, a = o?.model;
    if (!i || !a?.layouts || !a.attachments)
      throw Error(
        "Откройте проект Топоматик 360 с IFC или SMDX и сделайте его 3D-окно активным."
      );
    const f = [], r = /* @__PURE__ */ new Set(), c = [], p = [], h = [], m = /* @__PURE__ */ new Map(), x = /* @__PURE__ */ new Set();
    let g = 2166136261;
    const v = Re(
      () => n() || o !== this.app || i !== this.view
    );
    let q = -1 / 0;
    const E = (A) => {
      for (let S = 0; S < A.length; S++)
        g = Math.imul(g ^ A.charCodeAt(S), 16777619);
    }, k = async (A, S, N) => {
      if (x.has(A)) return;
      x.add(A);
      const L = A.layers.layer0?.modelName || S, B = S, D = xe(L) || xe(B), j = (P, w) => {
        r.has(P) || (r.add(P), f.push({ id: P, name: w }));
      };
      D || j(B, L);
      const l = !D && (!s || s.has(B)), M = [];
      (l || D) && A.layouts.model?.walk((P) => (P.type === ke.model3d ? M.push(P) : P.type === ke.insert && c.push(`${L}: вставка блока не включена в расчёт.`), !1));
      const $ = /* @__PURE__ */ new Map();
      for (const P of M) {
        let w = P.layer, C = "";
        for (; w; ) {
          if (w.modelName && !xe(w.modelName)) {
            C = w.modelName;
            break;
          }
          w = w.layer;
        }
        const W = D ? C || "Модель проекта" : L, X = D ? C || `${S}/#model` : B;
        if (D && j(X, W), s && !s.has(X)) continue;
        const lt = JSON.stringify([
          P.layer?.UUID || "",
          P.$id || P.$path
        ]);
        $.set(JSON.stringify([X, lt]), {
          key: lt,
          objects: [P],
          modelId: X,
          modelName: W
        });
      }
      let O = 0;
      for (const P of $.values()) {
        const { key: w, objects: C, modelId: W, modelName: X } = P;
        if (n()) throw Error("Чтение моделей отменено.");
        if (o !== this.app || i !== this.view)
          throw Error(
            "Активный проект изменился. Запустите чтение моделей заново."
          );
        const lt = C[0].layer, nt = {};
        try {
          if (lt) {
            const ht = [];
            let $t = lt;
            for (; $t && ht.length < 64; )
              ht.unshift($t), $t = $t.layer;
            for (const K of ht)
              re(K.typedProperties(), "", nt), K.typed?.name && (nt.Тип = K.typed.name);
          }
        } catch {
          c.push(`${X} / ${w}: часть свойств недоступна.`);
        }
        const Ft = nt["ifc.id"] || Object.entries(nt).find(
          ([ht]) => /(^|\.)(globalid|ifcguid|guid)$/i.test(ht)
        )?.[1] || "", H = lt?.name || C[0].$id || "Элемент", J = JSON.stringify([W, w]);
        Object.assign(nt, {
          Модель: X,
          Имя: H,
          GUID: Ft,
          Объект: lt?.UUID || w
        });
        const pt = {
          min: [1 / 0, 1 / 0, 1 / 0],
          max: [-1 / 0, -1 / 0, -1 / 0]
        };
        let rt = !0, vt = !1, dt = 0;
        for (const ht of C) {
          rt &&= ht.isClosed;
          for (const $t of Object.values(ht.meshes)) {
            const K = $t.geometry;
            if (!K || K.indices.length % 3) {
              vt = !0;
              continue;
            }
            rt &&= $t.isClosed;
            for (let ft = 0; ft < K.vertices.length; ft += 3) {
              const it = [
                K.vertices[ft],
                K.vertices[ft + 1],
                K.vertices[ft + 2]
              ];
              if (Math3d.mat4.mulv3(it, ht.matrix, it), !it.every(Number.isFinite)) {
                vt = !0;
                continue;
              }
              for (let at = 0; at < 3; at++)
                pt.min[at] = Math.min(pt.min[at], it[at]), pt.max[at] = Math.max(pt.max[at], it[at]);
              if (E(it.join(",")), ft % 6e4 === 0 && (performance.now() - q > 200 && (q = performance.now(), e(
                "Индексирование: " + X + " · " + h.length + " элементов"
              )), await v(), n()))
                throw Error("Чтение моделей отменено.");
            }
            const xt = K.vertices.length / 3, ot = (ft) => Number.isFinite(K.vertices[ft * 3]) && Number.isFinite(K.vertices[ft * 3 + 1]) && Number.isFinite(K.vertices[ft * 3 + 2]);
            for (let ft = 0; ft < K.indices.length; ft += 3) {
              const it = K.indices[ft], at = K.indices[ft + 1], Nt = K.indices[ft + 2];
              if (g = Math.imul(g ^ it, 16777619), g = Math.imul(g ^ at, 16777619), g = Math.imul(g ^ Nt, 16777619), it < xt && at < xt && Nt < xt && it !== at && at !== Nt && Nt !== it && ot(it) && ot(at) && ot(Nt) ? dt++ : vt = !0, ft % 15e4 === 0 && (await v(), n()))
                throw Error("Чтение моделей отменено.");
            }
          }
        }
        if (vt || !dt) {
          if (dt || O++, !dt) continue;
          rt = !1;
        }
        const zt = {
          id: J,
          name: H,
          model: X,
          modelId: W,
          guid: Ft,
          properties: nt,
          // An IFC layer can be disabled for editing while it is still drawn
          // in the 3D view. Only the visibility flag and a hidden attachment
          // should exclude it from a normal clash check.
          hidden: N || !!lt?.resolveHidden(),
          triangles: new Float64Array(0),
          triangleCount: dt,
          closed: rt,
          bounds: pt
        };
        E(JSON.stringify([J, nt, zt.hidden])), h.push(zt), m.set(J, C);
      }
      O && c.push(
        `${L}: пропущено элементов без треугольной геометрии — ${O}.`
      );
      const T = [];
      A.attachments.forEach((P) => {
        T.push(P);
      });
      for (const P of T) {
        const w = P.name || P.uri || P.$id, C = w || "Подключённая модель", W = `${S}/${w || "attachment"}`;
        P.model || j(W, C), P.model ? await k(
          P.model,
          W,
          N || P.hidden
        ) : (!s || s.has(W)) && p.push(
          `${C}: модель не загружена. Откройте её перед расчётом.`
        );
      }
    };
    if (await k(a, a.layers.layer0?.modelName || "Проект", !1), !h.length && (!s || s.size > 0)) {
      const A = s ? [...s].filter((S) => !r.has(S)) : [];
      throw Error(
        A.length ? `Сохранённая выборка ссылается на модели, которых нет в текущем составе: ${A.join(", ")}. Обновите список моделей.` : f.length ? "В выбранных моделях не найдены 3D-элементы с доступной геометрией. Проверьте, что модели загружены, и выберите нужные файлы." : "В открытом проекте не обнаружены IFC/SMDX-модели. Проверьте состав подключений проекта."
      );
    }
    return this.clear(), this.refs = m, this.metadata = new Map(h.map((A) => [A.id, A])), this.scannedApp = o, this.scannedView = i, {
      elements: h,
      fingerprint: `${h.length}:${g >>> 0}`,
      warnings: [...new Set(c)],
      blockers: [...new Set(p)],
      models: f,
      indexedModelIds: f.filter((A) => !s || s.has(A.id)).map((A) => A.id)
    };
  }
  async geometry(e, n) {
    const s = Re(() => n() || !this.isCurrent());
    if (!this.isCurrent()) throw Error("Активная модель изменилась.");
    const o = this.metadata.get(e), i = this.refs.get(e);
    if (!o || !i) throw Error("Элемент отсутствует.");
    const a = i.flatMap(
      (x) => Object.values(x.meshes).flatMap((g) => {
        const v = g.geometry;
        if (!v || v.indices.length % 3) return [];
        const q = Gn(v);
        return q.length ? [{ object: x, g: v, indices: q }] : [];
      })
    );
    let f = 0, r = 0;
    for (const { g: x, indices: g } of a) {
      if (!x) throw Error("Геометрия недоступна.");
      f += x.vertices.length, r += g.length;
    }
    const c = new Float64Array(f), p = new Uint32Array(r);
    let h = 0, m = 0;
    for (const { object: x, g, indices: v } of a) {
      if (!g) throw Error("Геометрия недоступна.");
      for (let q = 0; q < g.vertices.length; q += 3) {
        const E = [g.vertices[q], g.vertices[q + 1], g.vertices[q + 2]];
        if (Math3d.mat4.mulv3(E, x.matrix, E), c.set(E, h + q), q % 6e4 === 0 && (await s(), n() || !this.isCurrent()))
          throw Error("Чтение геометрии отменено.");
      }
      for (let q = 0; q < v.length; q++)
        if (p[m + q] = h / 3 + v[q], q % 15e4 === 0 && (await s(), n()))
          throw Error("Чтение геометрии отменено.");
      h += g.vertices.length, m += v.length;
    }
    return { ...o, vertices: c, indices: p };
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
      const e = this.pointView.annotations.get(be);
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
    const o = e.point, i = this.view;
    i.camera?.id !== "3d" && i.setCameraType("3d"), i.pauseAnimation?.(), this.highlight(e), this.select([e.a.id, e.b.id]);
    const a = [-0.65, 0.65, -0.394], f = Math.hypot(...a);
    a.forEach((r, c) => a[c] = r / f), i.lookAt(
      o.map((r, c) => r - a[c] * n),
      a,
      [0, 0, 1],
      s,
      o
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
      ({ id: a, color: f }, r) => [...new Set(this.refs.get(a) || [])].flatMap(
        (c) => Object.values(c.meshes).flatMap((p) => {
          const h = p.geometry;
          if (!h) return [];
          const m = {
            // SDK fields may be prototype getters rather than own properties.
            uuid: `${Fe}.${r}.${h.uuid}`,
            vertices: h.vertices,
            indices: h.indices,
            normals: h.normals,
            bounds: h.bounds,
            colors: new Uint32Array(h.vertices.length / 3).fill(f)
          };
          return [{ obj: c, geometry: m, color: f }];
        })
      )
    ), this.overlay) {
      this.overlay.layer.visible = !0, n.invalidate(!0);
      return;
    }
    let o;
    o = {
      id: Fe,
      order: 1e4,
      visible: !0,
      paint: () => {
      },
      paint3d: (a) => {
        const f = a.color, r = a.rasterizer.material;
        a.rasterizer.material = void 0;
        try {
          for (const { obj: c, geometry: p, color: h } of this.overlaySurfaces) {
            a.color = h, a.pushMatrix();
            try {
              a.multMatrix(c.matrix), a.mesh(p);
            } finally {
              a.popMatrix();
            }
          }
        } catch (c) {
          o.visible = !1, this.overlayError = new Error(
            "Не удалось отрисовать подсветку пары: " + (c instanceof Error ? c.message : String(c))
          );
        } finally {
          a.color = f, a.rasterizer.material = r;
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
    }, n.layer.addLayer(o), this.overlay = { view: n, layer: o }, n.invalidate();
  }
  async snapshot(e, n, s, o = !1, i = !0) {
    const a = () => this.snapshotInWorkspace(e, n, s, o);
    return i ? this.captureWorkspace(a) : a();
  }
  async snapshotInWorkspace(e, n, s, o = !1) {
    if (!this.isCurrent())
      throw Error("Обновите модели перед созданием снимков.");
    if (!this.canLocate(e))
      throw Error("Элементы результата отсутствуют в открытых моделях.");
    const i = this.view, a = i.layer.drawing;
    if (!a)
      throw Error(
        "Слой моделей недоступен для снимка пары. Откройте 3D-окно проекта."
      );
    const f = a.visible, r = i.annotations.visible, c = new Set(i.layer.selectedObjects());
    let p;
    try {
      o ? this.highlight(e) : this.focus(e, n, !1), i.pauseAnimation(), p = await Tn(i), i.layer.clearSelected(), a.visible = !1, i.annotations.visible = !1, i.invalidate();
      const h = await Hn(
        i,
        () => s() || !this.isCurrent()
      );
      if (this.overlayError) throw this.overlayError;
      return h;
    } finally {
      a.visible = f, i.annotations.visible = r, i.layer.clearSelected(), i.layer.selectObjects((h) => c.has(h), !0), i.invalidate(), await p?.();
    }
  }
  markers(e, n, s, o) {
    if (!this.isCurrent()) return;
    const i = this.view;
    this.pointView && this.pointView !== i && this.clear();
    const a = i.annotations.get(be);
    if (a && i.annotations.release(a), this.pointView = i, !s) {
      i.invalidate();
      return;
    }
    const f = i.annotations.create(be, 1e4), r = e.filter((c) => c.id !== n).concat(e.filter((c) => c.id === n));
    for (const c of r.slice(-3e3)) {
      if (c.state === "resolved") continue;
      const [p, h, m] = c.point, x = c.id === n, g = c.state === "excluded" ? "#78818c" : c.state === "approved" || c.state === "reviewed" ? "#28b94b" : "#e1372d", v = x ? "#f2c94c" : g, q = () => o(c.id), E = [
        { type: "line", a: [p, h, m], b: [p, h, m + 1], color: v, width: 5 },
        {
          type: "polyline",
          points: [
            [p - 0.65, h, m + 1],
            [p + 0.65, h, m + 1],
            [p, h, m + 2.2],
            [p - 0.65, h, m + 1]
          ],
          color: v,
          fillColor: g,
          width: x ? 5 : 2
        },
        {
          type: "line",
          a: [p, h - 0.01, m + 1.85],
          b: [p, h - 0.01, m + 1.4],
          color: "#ffffff",
          width: 4
        },
        {
          type: "line",
          a: [p, h - 0.01, m + 1.22],
          b: [p, h - 0.01, m + 1.27],
          color: "#ffffff",
          width: 4
        }
      ];
      f.add({
        id: c.id,
        type: "shaped",
        shapes: E,
        activeShapes: E,
        activateCommand: q,
        dblCommand: q
      }), x && f.add({
        id: c.id + ":label",
        type: "simple",
        position: [p, h, m + 2.35],
        label: `${c.a.name} × ${c.b.name}`,
        labelBackground: "#f2c94c",
        labelColor: "#171717",
        activateCommand: q
      });
    }
    i.invalidate();
  }
}
let Te, ye, He;
const Wn = {
  open(t) {
    t.manager.revealView("nashepo.collisionfinder360/checks_panel");
  },
  async mount(t) {
    const e = t.el;
    if (!e) return;
    if (ye && He === t.manager) {
      e.replaceChildren(ye);
      return;
    }
    Te?.();
    const n = document.createElement("div");
    n.style.height = "100%", e.replaceChildren(n), ye = n, He = t.manager, Te = await Rn(n, new Bn(t));
  }
};
export {
  Wn as default
};
