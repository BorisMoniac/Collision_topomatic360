const mt = `<h2>Работа с проверками</h2>
<details open><summary>1. Первая проверка</summary><ol><li>Откройте проект и подключите IFC/SMDX штатными средствами Топоматик 360.</li><li>Откройте нижнюю вкладку «Проверки» и нажмите «Модели».</li><li>Нажмите «＋ Новая проверка» и задайте ей понятное имя.</li><li>Во вкладке «Выбор» оставьте галочки только у нужных файлов в А и Б. «Все модели» включено по умолчанию.</li><li>Выберите «По пересечению» или «Дублирование» и нажмите «Запустить».</li><li>Во вкладке «Результаты» дважды нажмите строку: камера направится к конфликту, элемент А будет выделен красным, элемент Б — синим, и оба элемента станут выделенными в 3D-окне.</li></ol><p>Первое обновление без созданной проверки получает только список файлов. При запуске индексируются модели, отмеченные хотя бы в одной стороне. Файл проекта WDX служит контейнером и в выбор моделей не попадает.</p></details>
<details><summary>2. Выбор моделей и сохранённые наборы</summary><p>Выбор А и выбор Б задают две стороны сравнения. Снимите «Все модели» и отметьте конкретные IFC/SMDX. Для поиска дубликатов внутри одного файла отметьте его с обеих сторон.</p><p>Часто используемый состав можно сохранить как набор моделей, а затем применить в другой проверке. Наборы входят в файл проверок. Состав выборки задаётся галочками моделей и ручным выделением объектов.</p><p>IFC GUID читается из свойства <code>ifc.id</code>; также поддерживаются GlobalId, IfcGuid и GUID.</p></details>
<details><summary>3. Работа с выделением в 3D</summary><p>Сначала выделите элементы штатными средствами в 3D-окне, затем используйте кнопку в нужной стороне:</p><ul><li><b>Показать выбранные элементы</b> — выделяет весь текущий состав.</li><li><b>Только выделенные в 3D</b> — оставляет только выделенные объекты.</li><li><b>＋ Добавить из 3D</b> — добавляет выделенные объекты к моделям.</li><li><b>− Исключить из 3D</b> — исключает выделенные объекты.</li><li><b>Сбросить ручной выбор</b> — снова использует отмеченные модели.</li></ul><p>Ручные идентификаторы могут измениться после замены IFC/SMDX, поэтому такую выборку следует проверить заново.</p></details>
<details><summary>4. Пересечения, глубина, касания и дубликаты</summary><p><b>Пересечение</b> рассчитывается по фактическим треугольным поверхностям. Габаритные коробки отбирают близкие пары, а общий габарит пары дополнительно ограничивает область, внутри которой берётся замер глубины.</p><p><b>Расчётная глубина Hard Clash</b> — это толщина самого сильного из отдельных перекрытий пары. Направления для замера берутся от граней, сошедшихся в контакте, плюс три оси координат. Вдоль каждого направления оба тела дают тень; общая часть двух теней показывает, насколько одно тело зашло в другое в этом направлении. Глубиной становится наименьшее значение по всем направлениям. Проецируется только та геометрия, что попала в общий габарит пары, и проекции обрезаются по его границам.</p><p>Направления замера плагин берёт прежде всего у самого контакта: пятно касания лежит в своей плоскости, и нормаль этой плоскости показывает, куда тела давят друг на друга. Такие направления поворачиваются вместе с парой и не зависят от того, на сколько треугольников разбита грань. Нормали граней это направление только уточняют.</p><p>Если пара соприкасается сразу в нескольких местах, они разбираются по отдельности, а в результат идёт самое глубокое. Пустота между двумя контактами не превращается в глубину: разрез принимается только там, где промежуток лежит вне хотя бы одного тела, причём точка на грани пустотой не считается. Труба сквозь две стенки одного элемента даёт толщину стенки, а не расстояние между ними.</p><p>Поэтому значение не зависит ни от густоты сетки, ни от размеров элементов: труба одного диаметра даёт одну и ту же глубину и на грубой, и на подробной модели, а длина стержня, проходящего сквозь плиту, на результат не влияет. Далеко отнесённая часть составного объекта тоже не завышает глубину.</p><p>Это именно перекрытие тел, а не длина перемещения, которое их разведёт: чтобы вынуть стержень из плиты, его надо вытянуть на всю длину, и к тяжести конфликта это отношения не имеет. Объём пересечения вместо глубины не используется: одинаковый объём может означать совсем разные конфликты.</p><p>Одна пара элементов формирует один результат. Точкой коллизии становится контакт, ближайший к середине области перекрытия. Несколько несвязанных областей одной пары отдельно не группируются.</p><p><b>Что стоит в столбце глубины.</b> Число — обычный замер. «Касание» — тела сходятся по поверхности и общего объёма не имеют; такие пары попадают в результат только при включённом учёте касаний. «Не определена» — у элемента нет собственного объёма. «В пределах точности» — перекрытие тоньше заданной точности расчёта; уменьшите точность, чтобы его измерить. «Неполный расчёт» со знаком ≈ — контакт разделён на отдельные места не до конца, и значение может быть завышено. Порог минимальной глубины ни одну из этих строк не отсекает: решение по ним принимает человек.</p><p>Плагин отделяет касание от объёмного пересечения до всякого замера. Он находит плоскость, в которой лежит контакт, и проверяет, выходят ли тела за неё. Если не выходят, это касание с нулевой глубиной, а не конфликт глубиной в размер площадки касания.</p><p>Если элемент ничего не заключает внутри себя — лист, отдельная грань, незамкнутая оболочка — объёмный замер к нему неприменим. Оболочку, которую не удалось замкнуть, плагин к телам не относит: сумма её треугольников может дать какой-то объём, но значить он не будет ничего. Отдельно считается объём, который ограничивает сетка, в сравнении с площадью поверхности, поэтому наклонный лист распознаётся так же, как лежащий по осям. Такой конфликт остаётся в результате со значением «не определена», и порог минимальной глубины его не отсекает: решение принимает человек.</p><p>Разделение на отдельные перекрытия — обоснованная оценка, а не построение общей области двух тел. За проход разбирается один самый крупный промежуток в зоне, и промежуток должен быть шире самого контакта, иначе это не разрыв, а расстояние между точками одного пятна. Если мест оказалось больше, чем плагин успел разобрать, строка помечается как неполный расчёт, а не выдаётся за обычное число. На очень крупных контактах набор направлений прореживается ради скорости, и оценка тоже становится грубее в большую сторону.</p><p>«Точность расчёта» — геометрическая погрешность, а «Минимальная глубина» — пользовательский допуск для исключения небольших конфликтов. Это разные величины: перекрытие тоньше точности расчёта не измеряется вовсе и помечается, а не сравнивается с допуском. Порог применяется с запасом на точность: при минимуме 20 мм и точности 0,1 мм конфликт глубиной 19,95 мм ещё останется. Одинаково в расчёте, в таблице результатов и в HTML-отчёте, поэтому одно и то же число всюду отбирает одни и те же строки. Нулевую глубину получают только касания двух объёмных тел, и лишь когда включён их учёт. Труба и отвод могут пересекаться в штатном соединении из-за фасеточной аппроксимации круглых поверхностей; такие соединения исключаются правилами. <b>Дублирование</b> ищет совпадающие треугольники в одинаковых мировых координатах.</p></details>
<details><summary>5. Составные объекты и неполная геометрия</summary><p>Один IFC-объект может состоять из нескольких частей. Чтобы не сравнивать его части между собой, включите «Не проверять геометрию одного составного объекта» во вкладке «Правила». Там же можно исключить пары одной модели или одинакового значения свойства.</p><p>Пустые и неполные геометрические части пропускаются, а пригодные части модели продолжают участвовать. Плагин показывает сводное замечание с количеством пропущенных элементов. Незагруженный подключённый файл блокирует расчёт только тогда, когда он входит в выборку.</p></details>
<details><summary>6. Результаты и состояния</summary><p>«Новый» найден впервые, «Активный» найден повторно, «Проверенный» рассмотрен, «Подтверждённый» подтверждён, «Исключённый» исключён из работы. «Исправленный» означает, что пара исчезла при повторном расчёте с теми же правилами; состояние можно изменить вручную.</p><p>В таблице доступны IFC GUID, расчётная глубина, назначение и комментарий. Фильтр «Глубина от» пропускает строки со значением «не определена», чтобы неизмеримый конфликт не исчез молча. Галочки меняют состояние сразу у нескольких строк. Значения можно выделять и копировать. При переходе стрелками активная строка автоматически прокручивается в видимую область. Состояние «Устарела» у проверки означает, что после последнего расчёта изменили её тип, выборки, параметры или правила.</p></details>
<details><summary>7. Отчёт и снимки</summary><p>После перехода к коллизии отсутствующий снимок создаётся автоматически, если пользователь задержался на результате. Кадр строится от той же камеры приближения, что и снимки отчёта: ракурс задаёт «Дистанция камеры» в настройках. Если дистанцию изменить, отчёт переснимет прежние кадры под новое значение. Быстрое переключение стрелками отменяет лишние снимки. Во время технической перерисовки поверх 3D-окна сохраняется предыдущий кадр, поэтому модель не должна мигать.</p><p>Кнопка «Снимок пары» сохраняет текущий ракурс только с двумя элементами коллизии: элемент А показан красным, элемент Б — синим. Такой кадр собран вручную, поэтому отчёт его не переснимает. На время подготовки отчёта нижняя панель автоматически уменьшается для широкого 3D-кадра и затем возвращается к прежнему размеру. Файл сессии предназначен для открытия результатов в плагине «НашеПО · Коллизии».</p></details>
<details><summary>8. Проекты, сохранение и очистка</summary><p>В пределах открытой страницы каждый проект получает собственный список проверок. Сворачивание или повторное открытие нижней панели сохраняет проверки, результаты и комментарии в текущей вкладке. При переключении проекта данные предыдущего не подмешиваются. «Очистить проект» удаляет проверки, результаты и наборы только у текущего проекта.</p><p>«Сохранить проверки» записывает правила, наборы моделей, результаты, комментарии и снимки в JSON. «Открыть проверки» загружает этот файл. Геометрия в файл не входит: соответствующие модели надо открыть отдельно. После обновления или закрытия страницы для продолжения работы используйте сохранённый файл.</p></details>
<details><summary>9. Большие проекты</summary><p>Жёсткого предела в 6 млн треугольников нет. При запуске строится индекс только по отмеченным моделям. Точная геометрия передаётся в расчёт по мере появления близких пар в компактном индексированном виде.</p><p>Время и память всё равно зависят от состава выборок и числа потенциальных пар. Разделяйте проверки по моделям и системам. В сцене одновременно показывается до 3000 знаков; при 50 000 результатах расчёт останавливается без замены прежнего результата.</p></details>`;
function ht(t) {
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
const gt = "0.7.0", Le = (t) => typeof t == "string" && /^data:image\/(jpeg|png);base64,[A-Za-z0-9+/=]+$/.test(t), ve = {
  new: "Новый",
  active: "Активный",
  reviewed: "Проверенный",
  approved: "Подтверждённый",
  resolved: "Исправленный",
  excluded: "Исключённый"
}, We = () => ({
  models: [],
  modelsMode: "all",
  conditions: [],
  mode: "all",
  include: [],
  exclude: []
}), bt = () => ({
  id: crypto.randomUUID(),
  name: "Новая проверка",
  type: "intersection",
  a: We(),
  b: We(),
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
}), Xe = ({
  triangles: t,
  vertices: e,
  indices: i,
  triangleCount: r,
  closed: s,
  bounds: n,
  ...o
}) => o;
function ze(t, e) {
  return e.exclude.includes(t.id) ? !1 : e.include.includes(t.id) ? !0 : !(e.manualOnly || e.modelsMode === "selected" && !e.models.includes(t.modelId) || e.modelsMode === void 0 && e.models.length && !e.models.includes(t.modelId));
}
const xt = (t) => JSON.stringify([
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
]), yt = (t, e) => JSON.stringify([t, e].sort());
function wt(t, e, i) {
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
function lt(t) {
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
      if (n?.image !== void 0 && !Le(n.image))
        throw Error("Некорректный снимок результата.");
      if (n?.imageScope !== void 0 && n.imageScope !== "pair" && n.imageScope !== "pair-ab")
        throw Error("Некорректный состав снимка результата.");
      if (n?.imageDistance !== void 0 && (!Number.isFinite(n.imageDistance) || n.imageDistance < 0.5))
        throw Error("Некорректная дистанция снимка результата.");
      if (n?.unmeasured !== void 0 && typeof n.unmeasured != "boolean")
        throw Error("Некорректный признак измеримости результата.");
      if (n?.depth !== void 0 && !["tolerance", "approximate", "unmeasurable"].includes(n.depth))
        throw Error("Некорректная достоверность глубины результата.");
      if (n?.unmeasured && !n.depth && (n.depth = "unmeasurable"), !n || typeof n.id != "string" || !Object.hasOwn(ve, n.state) || n.penetrationMm !== void 0 && (!Number.isFinite(n.penetrationMm) || n.penetrationMm < 0) || !Array.isArray(n.point) || n.point.length !== 3 || !n.point.every(Number.isFinite))
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
const H = (t, e) => [t[0] - e[0], t[1] - e[1], t[2] - e[2]], Oe = (t, e, i = 1) => [
  t[0] + e[0] * i,
  t[1] + e[1] * i,
  t[2] + e[2] * i
], ae = (t, e) => t[0] * e[0] + t[1] * e[1] + t[2] * e[2], Se = (t, e) => [
  t[1] * e[2] - t[2] * e[1],
  t[2] * e[0] - t[0] * e[2],
  t[0] * e[1] - t[1] * e[0]
], de = (t) => Math.hypot(...t), ct = (t) => {
  const e = de(t);
  return e > 1e-20 ? [t[0] / e, t[1] / e, t[2] / e] : void 0;
}, Ee = (t) => t.triangleCount ?? (t.indices ? t.indices.length / 3 : t.triangles.length / 9), me = (t, e, i) => t.indices && t.vertices ? t.vertices[t.indices[e * 3 + Math.floor(i / 3)] * 3 + i % 3] : t.triangles[e * 9 + i], Me = (t, e) => [0, 3, 6].map((i) => [
  me(t, e, i),
  me(t, e, i + 1),
  me(t, e, i + 2)
]);
function Ne(t) {
  const e = [1 / 0, 1 / 0, 1 / 0], i = [-1 / 0, -1 / 0, -1 / 0];
  for (let r = 0; r < t.length; r++) {
    const s = r % 3;
    e[s] = Math.min(e[s], t[r]), i[s] = Math.max(i[s], t[r]);
  }
  return { min: e, max: i };
}
const Ce = (t, e, i) => t.min.every((r, s) => r <= e.max[s] + i && t.max[s] >= e.min[s] - i);
function Ge(t, e) {
  const i = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const l of e)
    for (let m = 0; m < 9; m++) {
      const g = m % 3, f = me(t, l, m);
      i.min[g] = Math.min(i.min[g], f), i.max[g] = Math.max(i.max[g], f);
    }
  if (e.length <= 12) return { ...i, ids: e };
  const r = i.max.map((l, m) => l - i.min[m]), s = r.indexOf(Math.max(...r)), n = (l) => me(t, l, s) + me(t, l, s + 3) + me(t, l, s + 6);
  e.sort((l, m) => n(l) - n(m));
  const o = e.length >> 1;
  return {
    ...i,
    left: Ge(t, e.slice(0, o)),
    right: Ge(t, e.slice(o))
  };
}
function* Ae(t, e, i) {
  Ce(t, e, i) && (t.ids ? yield* t.ids : (yield* Ae(t.left, e, i), yield* Ae(t.right, e, i)));
}
function* we(t, e, i) {
  if (Ce(t, e, i)) {
    if (t.ids && e.ids) {
      for (const r of t.ids) for (const s of e.ids) yield [r, s];
      return;
    }
    if (t.ids) {
      yield* we(t, e.left, i), yield* we(t, e.right, i);
      return;
    }
    if (e.ids) {
      yield* we(t.left, e, i), yield* we(t.right, e, i);
      return;
    }
    yield* we(t.left, e.left, i), yield* we(t.left, e.right, i), yield* we(t.right, e.left, i), yield* we(t.right, e.right, i);
  }
}
function Ze(t, e) {
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
    left: Ze(t, e.slice(0, n)),
    right: Ze(t, e.slice(n))
  };
}
function $e(t, e, i, r) {
  const s = H(e, t), n = H(i[1], i[0]), o = H(i[2], i[0]), l = Se(s, o), m = ae(n, l);
  if (Math.abs(m) <= 1e-12 * de(s) * de(n) * de(o)) return;
  const g = 1 / m, f = H(t, i[0]), b = ae(f, l) * g, k = Se(f, n), M = ae(s, k) * g, E = ae(o, k) * g, N = r / Math.max(de(n), de(o), r);
  if (b >= -N && M >= -N && b + M <= 1 + N && E >= -N && E <= 1 + N)
    return Oe(t, s, Math.max(0, Math.min(1, E)));
}
function vt(t, e, i, r) {
  const s = i.map(Math.abs).indexOf(Math.max(...i.map(Math.abs))), n = [0, 1, 2].filter((m) => m !== s), o = (m, g, f) => (g[n[0]] - m[n[0]]) * (f[n[1]] - m[n[1]]) - (g[n[1]] - m[n[1]]) * (f[n[0]] - m[n[0]]), l = (m, g) => {
    const f = g.map((b, k) => o(b, g[(k + 1) % 3], m));
    return f.every((b) => b >= -r * de(i)) || f.every((b) => b <= r * de(i));
  };
  for (const m of t) if (l(m, e)) return m;
  for (const m of e) if (l(m, t)) return m;
  for (let m = 0; m < 3; m++)
    for (let g = 0; g < 3; g++) {
      const f = t[m], b = t[(m + 1) % 3], k = e[g], M = e[(g + 1) % 3], E = H(b, f), N = H(M, k), L = E[n[0]] * N[n[1]] - E[n[1]] * N[n[0]];
      if (Math.abs(L) < 1e-18) continue;
      const O = H(k, f), re = (O[n[0]] * N[n[1]] - O[n[1]] * N[n[0]]) / L, Y = (O[n[0]] * E[n[1]] - O[n[1]] * E[n[0]]) / L;
      if (re >= 0 && re <= 1 && Y >= 0 && Y <= 1) return Oe(f, E, re);
    }
}
function Mt(t, e, i, r) {
  for (let s = 0; s < 3; s++) {
    const n = $e(t[s], t[(s + 1) % 3], e, i);
    n && r.push(n);
    const o = $e(e[s], e[(s + 1) % 3], t, i);
    o && r.push(o);
  }
}
function kt(t, e, i, r) {
  const s = Se(H(t[1], t[0]), H(t[2], t[0])), n = Se(H(e[1], e[0]), H(e[2], e[0])), o = de(s), l = de(n);
  if (o < 1e-20 || l < 1e-20) return;
  const m = e.map((f) => ae(H(f, t[0]), s) / o), g = t.map((f) => ae(H(f, e[0]), n) / l);
  if (!(m.every((f) => f > i) || m.every((f) => f < -i) || g.every((f) => f > i) || g.every((f) => f < -i))) {
    if (m.every((f) => Math.abs(f) <= i) && g.every((f) => Math.abs(f) <= i))
      return r ? vt(t, e, s, i) : void 0;
    if (!(!r && (!(Math.min(...m) < -i && Math.max(...m) > i) || !(Math.min(...g) < -i && Math.max(...g) > i))))
      for (let f = 0; f < 3; f++) {
        const b = $e(t[f], t[(f + 1) % 3], e, i);
        if (b) return b;
        const k = $e(e[f], e[(f + 1) % 3], t, i);
        if (k) return k;
      }
  }
}
class St {
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
    const i = ct(Se(H(e[1], e[0]), H(e[2], e[0])));
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
    for (const r of i) this.add(Me(e, r));
  }
  values() {
    return [
      ...this.world,
      ...[...this.items].sort((e, i) => e[0] < i[0] ? -1 : 1).map(([, e]) => e)
    ];
  }
}
function Qe(t, e) {
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
        const m = (i[l][l] - i[o][o]) / (2 * i[o][l]), g = (m >= 0 ? 1 : -1) / (Math.abs(m) + Math.sqrt(m * m + 1)), f = 1 / Math.sqrt(g * g + 1), b = g * f;
        for (const k of [i, r])
          for (let M = 0; M < 3; M++) {
            const E = k[M][o], N = k[M][l];
            k[M][o] = f * E - b * N, k[M][l] = b * E + f * N;
          }
        for (let k = 0; k < 3; k++) {
          const M = i[o][k], E = i[l][k];
          i[o][k] = f * M - b * E, i[l][k] = b * M + f * E;
        }
      }
  }
  return [0, 1, 2].sort((s, n) => i[n][n] - i[s][s]).map((s) => ct([r[0][s], r[1][s], r[2][s]])).filter((s) => !!s);
}
function It(t, e, i, r) {
  const s = e.min.map((f, b) => (f + e.max[b]) / 2), n = de(H(e.max, e.min)), o = Math.max(i * 10, n / 50), l = (f) => [0, 1, 2].map(
    (b) => f.reduce((k, M) => k + M[b], 0) / f.length
  );
  let m = [{ hits: t, limits: [] }], g = !1;
  for (let f = 0; f < 12; f++) {
    const b = [];
    let k = !1;
    for (const M of m) {
      if (M.hits.length < 2) {
        b.push(M);
        continue;
      }
      if (b.length + m.length >= 64) {
        g = !0, b.push(M);
        continue;
      }
      const E = l(M.hits), N = [
        E,
        s,
        ...[0, 0.25, 0.5, 0.75].map(
          (y) => M.hits[Math.floor(y * (M.hits.length - 1))]
        )
      ], L = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ], O = Qe(M.hits, E);
      O[0] && L.push(O[0]);
      const re = (y) => {
        let v = -1 / 0, C = 1 / 0;
        for (const j of M.hits) {
          const U = ae(j, y);
          U > v && (v = U), U < C && (C = U);
        }
        return v - C;
      }, Y = (y) => Math.max(
        0,
        ...O.filter((v) => Math.abs(ae(v, y)) < 0.9).map((v) => re(v))
      ), K = (y) => {
        const v = M.hits.map((j) => ae(j, y)).sort((j, U) => j - U), C = [];
        for (let j = 1; j < v.length; j++) {
          const U = v[j] - v[j - 1];
          U > o && C.push({ at: (v[j] + v[j - 1]) / 2, size: U });
        }
        return C.sort((j, U) => U.size - j.size);
      };
      let R, u = 0;
      for (const y of L) {
        const v = K(y);
        !v.length || v[0].size <= u || v[0].size <= Y(y) || (u = v[0].size, r(y, v[0].at, N) && (R = { n: y, cuts: [v[0].at] }));
      }
      if (!R) {
        b.push(M);
        continue;
      }
      k = !0;
      const { n: D, cuts: z } = R, q = Array.from({ length: z.length + 1 }, () => []);
      for (const y of M.hits) {
        const v = ae(y, D);
        let C = 0;
        for (; C < z.length && v >= z[C]; ) C++;
        q[C].push(y);
      }
      q.forEach(
        (y, v) => b.push({
          hits: y,
          limits: [
            ...M.limits,
            {
              n: D,
              from: v ? z[v - 1] : -1 / 0,
              to: v < z.length ? z[v] : 1 / 0
            }
          ]
        })
      );
    }
    if (m = b, !k) break;
  }
  return { zones: m, crowded: g };
}
function Ke(t, e, i) {
  return i.every(({ n: r, from: s, to: n }) => {
    let o = 1 / 0, l = -1 / 0;
    for (let m = 0; m < 9; m += 3) {
      const g = me(t, e, m) * r[0] + me(t, e, m + 1) * r[1] + me(t, e, m + 2) * r[2];
      g < o && (o = g), g > l && (l = g);
    }
    return l >= s && o <= n;
  });
}
function _e(t, e, i, r, s, n, o, l, m, g, f) {
  const b = (u) => {
    let D = -1 / 0, z = 1 / 0;
    const q = (y) => {
      y > D && (D = y), y < z && (z = y);
    };
    for (const y of m) q(ae(y, u));
    for (const [y, v, C] of [
      [t, i, 1],
      [e, r, 0]
    ]) {
      const j = Math.max(1, Math.floor(v.length / 32));
      for (let U = 0; U < v.length; U += j)
        for (const A of Me(y, v[U])) f(C, A) && q(ae(A, u));
    }
    return Number.isFinite(D) && Number.isFinite(z) ? D - z : 0;
  }, k = (u) => {
    let D = 1 / 0, z = -1 / 0;
    for (let q = 0; q < 8; q++) {
      const y = (q & 1 ? o.max[0] : o.min[0]) * u[0] + (q & 2 ? o.max[1] : o.min[1]) * u[1] + (q & 4 ? o.max[2] : o.min[2]) * u[2];
      y < D && (D = y), y > z && (z = y);
    }
    return [D, z];
  }, M = (u, D, z, q, y) => {
    let v = 1 / 0, C = -1 / 0;
    for (const j of D) {
      let U = 1 / 0, A = -1 / 0;
      for (let W = 0; W < 9; W += 3) {
        const P = me(u, j, W) * z[0] + me(u, j, W + 1) * z[1] + me(u, j, W + 2) * z[2];
        P < U && (U = P), P > A && (A = P);
      }
      A < q || U > y || (U < q && (U = q), A > y && (A = y), U < v && (v = U), A > C && (C = A));
    }
    return v === 1 / 0 ? void 0 : [v, C];
  };
  if (o.min.some((u, D) => o.max[D] - u <= 0))
    return { width: 0, thin: !1 };
  const E = Math.ceil((i.length + r.length) / 4096), N = [
    ...s,
    ...E > 1 ? n.filter((u, D) => D < 3 || D % E === 0) : n
  ], L = (u, D, z, q, y) => {
    const v = (U) => Oe(l, z, U - ae(l, z));
    if (!D) return f(u, v((q + y) / 2)) ? [q, y] : void 0;
    let [C, j] = D;
    return C > q && f(u, v((q + C) / 2)) && (C = q), j < y && f(u, v((j + y) / 2)) && (j = y), [C, j];
  }, O = (u, D) => u && D ? Math.min(u[1], D[1]) - Math.max(u[0], D[0]) : 0;
  let re = 1 / 0, Y = !1, K = !1, R = 0;
  for (let u = 0; u < N.length; u++) {
    const D = N[u], [z, q] = k(D), y = M(t, i, D, z, q), v = M(e, r, D, z, q);
    let C = O(y, v);
    if (C <= 0 && R++ < 32 && (C = O(L(0, y, D, z, q), L(1, v, D, z, q))), C <= g && (u < s.length && R < 40 && (R++, C = b(D)), C <= g)) {
      u < s.length && (K = !0);
      continue;
    }
    Y = !0, C < re && (re = C);
  }
  return {
    width: Y && Number.isFinite(re) ? re : 0,
    thin: K
  };
}
function jt(t, e) {
  const i = Ee(t);
  if (!i) return !0;
  const r = [0, 0, 0];
  for (let o = 0; o < i; o++)
    for (let l = 0; l < 9; l += 3)
      for (let m = 0; m < 3; m++) r[m] += me(t, o, l + m);
  for (let o = 0; o < 3; o++) r[o] /= i * 3;
  let s = 0, n = 0;
  for (let o = 0; o < i; o++) {
    const l = Me(t, o), m = H(l[0], r), g = H(l[1], r), f = H(l[2], r);
    s += ae(m, Se(g, f)) / 6, n += de(Se(H(l[1], l[0]), H(l[2], l[0]))) / 2;
  }
  return Math.abs(s) <= e * n;
}
function Et(t, e, i) {
  const r = H(e[1], e[0]), s = H(e[2], e[0]), n = Se(r, s), o = de(n);
  if (o < 1e-20 || Math.abs(ae(H(t, e[0]), n)) / o > i) return !1;
  const l = H(t, e[0]), m = ae(r, r), g = ae(r, s), f = ae(s, s), b = ae(l, r), k = ae(l, s), M = m * f - g * g;
  if (Math.abs(M) < 1e-30) return !1;
  const E = (b * f - k * g) / M, N = (k * m - b * g) / M, L = i / Math.max(de(r), de(s), i);
  return E >= -L && N >= -L && E + N <= 1 + L;
}
function Te(t, e, i, r) {
  for (const s of Ae(i, { min: t, max: t }, r))
    if (Et(t, Me(e, s), r)) return !0;
  return !1;
}
function Ie(t, e, i, r) {
  if (!e.closed || t.some((b, k) => b < e.bounds.min[k] - r || b > e.bounds.max[k] + r) || Te(t, e, i, r)) return !1;
  const s = [1, 0.371390676, 0.52999894], n = de(H(e.bounds.max, e.bounds.min)) * 3 + 1, o = Oe(t, s, n), l = [], m = Ne([...t, ...o]);
  for (const b of Ae(i, m, r)) {
    const k = $e(t, o, Me(e, b), r);
    if (k) {
      const M = de(H(k, t));
      M > r && l.push(M);
    }
  }
  l.sort((b, k) => b - k);
  let g = 0, f = -1 / 0;
  for (const b of l)
    b - f > r * 2 && (g++, f = b);
  return g % 2 === 1;
}
async function At(t, e, i, r, s) {
  const n = e.precision / 1e3;
  if (!Number.isFinite(n) || n <= 0)
    throw Error("Точность расчёта должна быть положительным числом.");
  const o = t.filter((y) => e.includeHidden || !y.hidden), l = o.filter((y) => ze(y, e.a)), m = o.filter((y) => ze(y, e.b));
  if (!l.length || !m.length)
    throw Error(
      "Выборка А или Б не содержит элементов. Отметьте хотя бы одну модель в каждой стороне проверки."
    );
  let g = performance.now();
  const f = async () => {
    if (r())
      throw Error("Расчёт отменён. Предыдущие результаты сохранены.");
    performance.now() - g > 16 && (await new Promise((y) => setTimeout(y, 0)), g = performance.now());
  }, b = /* @__PURE__ */ new Map(), k = (y) => {
    let v = b.get(y.id);
    return v || (v = Ge(
      y,
      Array.from({ length: Ee(y) }, (C, j) => j)
    ), b.set(y.id, v)), v;
  }, M = /* @__PURE__ */ new Map(), E = (y) => {
    let v = M.get(y.id);
    return v === void 0 && (v = !y.closed || jt(y, n), M.set(y.id, v)), v;
  }, N = /* @__PURE__ */ new Map(), L = async (y) => {
    let v = N.get(y.id);
    if (v !== void 0) return v;
    const C = [];
    for (let j = 0; j < Ee(y); j++)
      C.push(
        [0, 3, 6].map(
          (U) => [0, 1, 2].map((A) => Math.round(me(y, j, U + A) / n)).join(",")
        ).sort().join(";")
      ), j % 9e3 === 0 && await f();
    return v = C.sort().join("|"), N.set(y.id, v), v;
  }, O = [], re = new Set(l.map((y) => y.id)), Y = new Set(m.map((y) => y.id)), K = Ze(
    m,
    m.map((y, v) => v)
  ), R = /* @__PURE__ */ new Map();
  let u = 0;
  const D = (y) => y.triangles.byteLength + (y.vertices?.byteLength || 0) + (y.indices?.byteLength || 0) + Ee(y) * 32;
  async function z(y, v) {
    if (!s) return y;
    let C = R.get(y.id);
    if (C)
      return R.delete(y.id), R.set(y.id, C), C;
    for (const [j, U] of R)
      j !== v && u > 96 * 1024 * 1024 && (R.delete(j), u -= D(U), b.delete(j), N.delete(j));
    return C = await s(y.id), R.set(y.id, C), u += D(C), C;
  }
  let q = -1 / 0;
  for (let y = 0; y < l.length; y++) {
    const v = l[y];
    performance.now() - q > 150 && (q = performance.now(), i({
      phase: "Проверка пар",
      done: y,
      total: l.length,
      found: O.length
    }));
    const C = [...Ae(K, v.bounds, n)];
    for (let j = 0; j < C.length; j++) {
      const U = C[j];
      performance.now() - q > 150 && (q = performance.now(), i({
        phase: `Проверка пар · A ${y + 1}/${l.length} · кандидаты ${j + 1}/${C.length}`,
        done: y,
        total: l.length,
        found: O.length
      }));
      const A = m[U];
      if (await f(), v.id === A.id || !Ce(v.bounds, A.bounds, n) || e.ignoreSameModel && v.modelId === A.modelId || e.ignoreSameGroup && v.modelId === A.modelId && v.properties.Объект && v.properties.Объект === A.properties.Объект || e.equalProperty && v.properties[e.equalProperty] !== void 0 && v.properties[e.equalProperty] === A.properties[e.equalProperty] || v.id > A.id && re.has(A.id) && Y.has(v.id)) continue;
      const W = yt(v.id, A.id), P = await z(v), F = await z(A, v.id);
      let Q, ie = "surface", T = 0, ue;
      if (e.type === "duplicates") {
        if (Ee(P) !== Ee(F) || P.bounds.min.some(
          (pe, ce) => Math.abs(pe - F.bounds.min[ce]) > n || Math.abs(P.bounds.max[ce] - F.bounds.max[ce]) > n
        ))
          continue;
        await L(P) === await L(F) && (Q = P.bounds.min.map((pe, ce) => (pe + P.bounds.max[ce]) / 2), ie = "duplicate");
      } else {
        const pe = k(P), ce = k(F), X = {
          min: P.bounds.min.map(
            (V, J) => Math.max(V, F.bounds.min[J])
          ),
          max: P.bounds.max.map(
            (V, J) => Math.min(V, F.bounds.max[J])
          )
        }, ge = X.min.map(
          (V, J) => (V + X.max[J]) / 2
        ), he = new St(), ne = [];
        let ke = 1, fe = 0, be = 1 / 0, oe = 0;
        for (const [V, J] of we(pe, ce, n)) {
          const G = Me(P, V), _ = Me(F, J);
          if (!Ce(Ne(G.flat()), Ne(_.flat()), n)) continue;
          const Z = kt(G, _, n, e.touching);
          if (Z) {
            const ee = de(H(Z, ge));
            if ((!Q || ee < be) && (Q = Z, be = ee), he.add(G), he.add(_), fe++ % ke === 0 && (Mt(G, _, n, ne), ne.length || ne.push(Z), ne.length >= 8192)) {
              for (let xe = 0; xe * 2 < ne.length; xe++) ne[xe] = ne[xe * 2];
              ne.length = Math.ceil(ne.length / 2), ke *= 2;
            }
          }
          ++oe % 256 === 0 && (performance.now() - q > 150 && (q = performance.now(), i({
            phase: `Геометрия пары · A ${y + 1}/${l.length}`,
            done: y,
            total: l.length,
            found: O.length
          })), await f());
        }
        if (!Q && P.closed && F.closed) {
          const V = P.bounds.min.map(
            (J, G) => (J + P.bounds.max[G]) / 2
          );
          Ie(V, P, pe, n) && Ie(V, F, ce, n) && (Q = V, ie = "contained");
        }
        if (!Q) {
          for (const [V, J, G] of [
            [P, F, ce],
            [F, P, pe]
          ])
            if (J.closed) {
              for (let _ = 0; _ < Ee(V) && !Q; _++) {
                const Z = Me(V, _), ee = Z[0].map(
                  (xe, ye) => (Z[0][ye] + Z[1][ye] + Z[2][ye]) / 3
                );
                for (const xe of [Z[0], ee])
                  if (Ie(xe, J, G, n)) {
                    Q = xe, ie = "contained";
                    break;
                  }
                await f();
              }
              if (Q) break;
            }
        }
        if (Q) {
          const V = (h, w) => [...Ae(w, X, n)].filter(
            (I) => Ce(Ne(Me(h, I).flat()), X, n)
          ), J = V(P, pe), G = V(F, ce);
          ie !== "surface" && (he.addFrom(P, J), he.addFrom(F, G)), await f();
          const _ = X.min.map(
            (h, w) => (h + X.max[w]) / 2
          ), Z = (h, w) => h === 0 ? Ie(w, P, pe, n) : Ie(w, F, ce, n), ee = (h, w) => h === 0 ? Ie(w, P, pe, n) || Te(w, P, pe, n) : Ie(w, F, ce, n) || Te(w, F, ce, n), xe = (h, w, I) => P.closed && F.closed && I.every(($) => {
            const B = Oe($, h, w - ae($, h));
            return !ee(0, B) || !ee(1, B);
          }), ye = () => [0, 1, 2].map(
            (h) => ne.reduce((w, I) => w + I[h], 0) / ne.length
          ), qe = ie === "surface" && ne.length > 2 ? Qe(ne, ye())[2] : void 0, De = !qe || _e(
            P,
            F,
            J,
            G,
            [qe],
            [],
            X,
            ye(),
            ne,
            n,
            Z
          ).width > n, a = E(P) || E(F);
          if (!a && !De && (ie = "touch"), ie === "touch" && !e.touching) continue;
          const { zones: c, crowded: d } = It(ne, X, n, xe), p = he.values();
          let x = 0, S = !0;
          for (const h of ie === "touch" ? [] : c) {
            const w = h.limits.length ? J.filter((te) => Ke(P, te, h.limits)) : J, I = h.limits.length ? G.filter((te) => Ke(F, te, h.limits)) : G, $ = h.hits.length ? [0, 1, 2].map(
              (te) => h.hits.reduce((le, Fe) => le + Fe[te], 0) / h.hits.length
            ) : _, B = _e(
              P,
              F,
              w,
              I,
              h.hits.length > 2 ? Qe(h.hits, $) : [],
              p,
              X,
              $,
              h.hits,
              n,
              Z
            );
            B.thin && (S = !1), B.width > x && (x = B.width), await f();
          }
          x *= 1e3, ie === "touch" ? ue = void 0 : a ? ue = "unmeasurable" : x <= 0 || !S ? ue = "tolerance" : d && (ue = "approximate"), T = ie === "touch" || ue === "unmeasurable" || ue === "tolerance" ? 0 : Math.max(e.precision, x), await f();
        }
        if (Q && !ue && T + e.precision < e.minPenetration)
          continue;
      }
      if (Q && (O.push({
        id: W,
        a: Xe(P),
        b: Xe(F),
        point: Q,
        kind: ie,
        state: "new",
        note: "",
        assignee: "",
        firstSeen: "",
        lastSeen: "",
        penetrationMm: T,
        ...ue ? { depth: ue } : {}
      }), O.length >= 5e4))
        throw Error(
          "Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат."
        );
    }
  }
  return i({
    phase: "Готово",
    done: l.length,
    total: l.length,
    found: O.length
  }), O;
}
const dt = '(function(){"use strict";const qt=({triangles:n,vertices:t,indices:e,triangleCount:c,closed:f,bounds:o,...r})=>r;function _t(n,t){return t.exclude.includes(n.id)?!1:t.include.includes(n.id)?!0:!(t.manualOnly||t.modelsMode==="selected"&&!t.models.includes(n.modelId)||t.modelsMode===void 0&&t.models.length&&!t.models.includes(n.modelId))}const Tt=(n,t)=>JSON.stringify([n,t].sort()),q=(n,t)=>[n[0]-t[0],n[1]-t[1],n[2]-t[2]],ct=(n,t,e=1)=>[n[0]+t[0]*e,n[1]+t[1]*e,n[2]+t[2]*e],E=(n,t)=>n[0]*t[0]+n[1]*t[1]+n[2]*t[2],tt=(n,t)=>[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]],F=n=>Math.hypot(...n),jt=n=>{const t=F(n);return t>1e-20?[n[0]/t,n[1]/t,n[2]/t]:void 0},nt=n=>n.triangleCount??(n.indices?n.indices.length/3:n.triangles.length/9),C=(n,t,e)=>n.indices&&n.vertices?n.vertices[n.indices[t*3+Math.floor(e/3)]*3+e%3]:n.triangles[t*9+e],R=(n,t)=>[0,3,6].map(e=>[C(n,t,e),C(n,t,e+1),C(n,t,e+2)]);function pt(n){const t=[1/0,1/0,1/0],e=[-1/0,-1/0,-1/0];for(let c=0;c<n.length;c++){const f=c%3;t[f]=Math.min(t[f],n[c]),e[f]=Math.max(e[f],n[c])}return{min:t,max:e}}const ut=(n,t,e)=>n.min.every((c,f)=>c<=t.max[f]+e&&n.max[f]>=t.min[f]-e);function Mt(n,t){const e={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const i of t)for(let l=0;l<9;l++){const h=l%3,u=C(n,i,l);e.min[h]=Math.min(e.min[h],u),e.max[h]=Math.max(e.max[h],u)}if(t.length<=12)return{...e,ids:t};const c=e.max.map((i,l)=>i-e.min[l]),f=c.indexOf(Math.max(...c)),o=i=>C(n,i,f)+C(n,i,f+3)+C(n,i,f+6);t.sort((i,l)=>o(i)-o(l));const r=t.length>>1;return{...e,left:Mt(n,t.slice(0,r)),right:Mt(n,t.slice(r))}}function*rt(n,t,e){ut(n,t,e)&&(n.ids?yield*n.ids:(yield*rt(n.left,t,e),yield*rt(n.right,t,e)))}function*U(n,t,e){if(ut(n,t,e)){if(n.ids&&t.ids){for(const c of n.ids)for(const f of t.ids)yield[c,f];return}if(n.ids){yield*U(n,t.left,e),yield*U(n,t.right,e);return}if(t.ids){yield*U(n.left,t,e),yield*U(n.right,t,e);return}yield*U(n.left,t.left,e),yield*U(n.left,t.right,e),yield*U(n.right,t.left,e),yield*U(n.right,t.right,e)}}function xt(n,t){const e={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const r of t)for(let i=0;i<3;i++)e.min[i]=Math.min(e.min[i],n[r].bounds.min[i]),e.max[i]=Math.max(e.max[i],n[r].bounds.max[i]);if(t.length<=16)return{...e,ids:t};const c=e.max.map((r,i)=>r-e.min[i]),f=c.indexOf(Math.max(...c));t.sort((r,i)=>n[r].bounds.min[f]+n[r].bounds.max[f]-(n[i].bounds.min[f]+n[i].bounds.max[f]));const o=t.length>>1;return{...e,left:xt(n,t.slice(0,o)),right:xt(n,t.slice(o))}}function ht(n,t,e,c){const f=q(t,n),o=q(e[1],e[0]),r=q(e[2],e[0]),i=tt(f,r),l=E(o,i);if(Math.abs(l)<=1e-12*F(f)*F(o)*F(r))return;const h=1/l,u=q(n,e[0]),d=E(u,i)*h,g=tt(u,o),y=E(f,g)*h,_=E(r,g)*h,j=c/Math.max(F(o),F(r),c);if(d>=-j&&y>=-j&&d+y<=1+j&&_>=-j&&_<=1+j)return ct(n,f,Math.max(0,Math.min(1,_)))}function $t(n,t,e,c){const f=e.map(Math.abs).indexOf(Math.max(...e.map(Math.abs))),o=[0,1,2].filter(l=>l!==f),r=(l,h,u)=>(h[o[0]]-l[o[0]])*(u[o[1]]-l[o[1]])-(h[o[1]]-l[o[1]])*(u[o[0]]-l[o[0]]),i=(l,h)=>{const u=h.map((d,g)=>r(d,h[(g+1)%3],l));return u.every(d=>d>=-c*F(e))||u.every(d=>d<=c*F(e))};for(const l of n)if(i(l,t))return l;for(const l of t)if(i(l,n))return l;for(let l=0;l<3;l++)for(let h=0;h<3;h++){const u=n[l],d=n[(l+1)%3],g=t[h],y=t[(h+1)%3],_=q(d,u),j=q(y,g),N=_[o[0]]*j[o[1]]-_[o[1]]*j[o[0]];if(Math.abs(N)<1e-18)continue;const O=q(g,u),Y=(O[o[0]]*j[o[1]]-O[o[1]]*j[o[0]])/N,V=(O[o[0]]*_[o[1]]-O[o[1]]*_[o[0]])/N;if(Y>=0&&Y<=1&&V>=0&&V<=1)return ct(u,_,Y)}}function Nt(n,t,e,c){for(let f=0;f<3;f++){const o=ht(n[f],n[(f+1)%3],t,e);o&&c.push(o);const r=ht(t[f],t[(f+1)%3],n,e);r&&c.push(r)}}function Ct(n,t,e,c){const f=tt(q(n[1],n[0]),q(n[2],n[0])),o=tt(q(t[1],t[0]),q(t[2],t[0])),r=F(f),i=F(o);if(r<1e-20||i<1e-20)return;const l=t.map(u=>E(q(u,n[0]),f)/r),h=n.map(u=>E(q(u,t[0]),o)/i);if(!(l.every(u=>u>e)||l.every(u=>u<-e)||h.every(u=>u>e)||h.every(u=>u<-e))){if(l.every(u=>Math.abs(u)<=e)&&h.every(u=>Math.abs(u)<=e))return c?$t(n,t,f,e):void 0;if(!(!c&&(!(Math.min(...l)<-e&&Math.max(...l)>e)||!(Math.min(...h)<-e&&Math.max(...h)>e))))for(let u=0;u<3;u++){const d=ht(n[u],n[(u+1)%3],t,e);if(d)return d;const g=ht(t[u],t[(u+1)%3],n,e);if(g)return g}}}class Lt{world=[[1,0,0],[0,1,0],[0,0,1]];items=new Map;step=1e4;key(t){return t.map(e=>Math.round(e*this.step)).join(",")}add(t){const e=jt(tt(q(t[1],t[0]),q(t[2],t[0])));if(!e)return;const f=e[0]<-1e-9||Math.abs(e[0])<=1e-9&&(e[1]<-1e-9||Math.abs(e[1])<=1e-9&&e[2]<0)?[-e[0],-e[1],-e[2]]:[e[0],e[1],e[2]],o=this.key(f);for(this.items.has(o)||this.items.set(o,f);this.items.size>512&&this.step>10;){this.step/=10;const r=new Map;for(const i of this.items.values()){const l=this.key(i);r.has(l)||r.set(l,i)}this.items=r}}addFrom(t,e){for(const c of e)this.add(R(t,c))}values(){return[...this.world,...[...this.items].sort((t,e)=>t[0]<e[0]?-1:1).map(([,t])=>t)]}}function wt(n,t){const e=[[0,0,0],[0,0,0],[0,0,0]];for(const f of n){const o=[f[0]-t[0],f[1]-t[1],f[2]-t[2]];for(let r=0;r<3;r++)for(let i=0;i<3;i++)e[r][i]+=o[r]*o[i]}const c=[[1,0,0],[0,1,0],[0,0,1]];for(let f=0;f<12;f++){let o=0;for(let r=0;r<3;r++)for(let i=r+1;i<3;i++)o+=e[r][i]*e[r][i];if(o<=1e-30)break;for(let r=0;r<3;r++)for(let i=r+1;i<3;i++){if(Math.abs(e[r][i])<=1e-30)continue;const l=(e[i][i]-e[r][r])/(2*e[r][i]),h=(l>=0?1:-1)/(Math.abs(l)+Math.sqrt(l*l+1)),u=1/Math.sqrt(h*h+1),d=h*u;for(const g of[e,c])for(let y=0;y<3;y++){const _=g[y][r],j=g[y][i];g[y][r]=u*_-d*j,g[y][i]=d*_+u*j}for(let g=0;g<3;g++){const y=e[r][g],_=e[i][g];e[r][g]=u*y-d*_,e[i][g]=d*y+u*_}}}return[0,1,2].sort((f,o)=>e[o][o]-e[f][f]).map(f=>jt([c[0][f],c[1][f],c[2][f]])).filter(f=>!!f)}function Ht(n,t,e,c){const f=t.min.map((u,d)=>(u+t.max[d])/2),o=F(q(t.max,t.min)),r=Math.max(e*10,o/50),i=u=>[0,1,2].map(d=>u.reduce((g,y)=>g+y[d],0)/u.length);let l=[{hits:n,limits:[]}],h=!1;for(let u=0;u<12;u++){const d=[];let g=!1;for(const y of l){if(y.hits.length<2){d.push(y);continue}if(d.length+l.length>=64){h=!0,d.push(y);continue}const _=i(y.hits),j=[_,f,...[0,.25,.5,.75].map(s=>y.hits[Math.floor(s*(y.hits.length-1))])],N=[[1,0,0],[0,1,0],[0,0,1]],O=wt(y.hits,_);O[0]&&N.push(O[0]);const Y=s=>{let a=-1/0,m=1/0;for(const p of y.hits){const I=E(p,s);I>a&&(a=I),I<m&&(m=I)}return a-m},V=s=>Math.max(0,...O.filter(a=>Math.abs(E(a,s))<.9).map(a=>Y(a))),ft=s=>{const a=y.hits.map(p=>E(p,s)).sort((p,I)=>p-I),m=[];for(let p=1;p<a.length;p++){const I=a[p]-a[p-1];I>r&&m.push({at:(a[p]+a[p-1])/2,size:I})}return m.sort((p,I)=>I.size-p.size)};let H,x=0;for(const s of N){const a=ft(s);!a.length||a[0].size<=x||a[0].size<=V(s)||(x=a[0].size,c(s,a[0].at,j)&&(H={n:s,cuts:[a[0].at]}))}if(!H){d.push(y);continue}g=!0;const{n:M,cuts:b}=H,w=Array.from({length:b.length+1},()=>[]);for(const s of y.hits){const a=E(s,M);let m=0;for(;m<b.length&&a>=b[m];)m++;w[m].push(s)}w.forEach((s,a)=>d.push({hits:s,limits:[...y.limits,{n:M,from:a?b[a-1]:-1/0,to:a<b.length?b[a]:1/0}]}))}if(l=d,!g)break}return{zones:l,crowded:h}}function zt(n,t,e){return e.every(({n:c,from:f,to:o})=>{let r=1/0,i=-1/0;for(let l=0;l<9;l+=3){const h=C(n,t,l)*c[0]+C(n,t,l+1)*c[1]+C(n,t,l+2)*c[2];h<r&&(r=h),h>i&&(i=h)}return i>=f&&r<=o})}function Pt(n,t,e,c,f,o,r,i,l,h,u){const d=x=>{let M=-1/0,b=1/0;const w=s=>{s>M&&(M=s),s<b&&(b=s)};for(const s of l)w(E(s,x));for(const[s,a,m]of[[n,e,1],[t,c,0]]){const p=Math.max(1,Math.floor(a.length/32));for(let I=0;I<a.length;I+=p)for(const z of R(s,a[I]))u(m,z)&&w(E(z,x))}return Number.isFinite(M)&&Number.isFinite(b)?M-b:0},g=x=>{let M=1/0,b=-1/0;for(let w=0;w<8;w++){const s=(w&1?r.max[0]:r.min[0])*x[0]+(w&2?r.max[1]:r.min[1])*x[1]+(w&4?r.max[2]:r.min[2])*x[2];s<M&&(M=s),s>b&&(b=s)}return[M,b]},y=(x,M,b,w,s)=>{let a=1/0,m=-1/0;for(const p of M){let I=1/0,z=-1/0;for(let it=0;it<9;it+=3){const v=C(x,p,it)*b[0]+C(x,p,it+1)*b[1]+C(x,p,it+2)*b[2];v<I&&(I=v),v>z&&(z=v)}z<w||I>s||(I<w&&(I=w),z>s&&(z=s),I<a&&(a=I),z>m&&(m=z))}return a===1/0?void 0:[a,m]};if(r.min.some((x,M)=>r.max[M]-x<=0))return{width:0,thin:!1};const _=Math.ceil((e.length+c.length)/4096),j=[...f,..._>1?o.filter((x,M)=>M<3||M%_===0):o],N=(x,M,b,w,s)=>{const a=I=>ct(i,b,I-E(i,b));if(!M)return u(x,a((w+s)/2))?[w,s]:void 0;let[m,p]=M;return m>w&&u(x,a((w+m)/2))&&(m=w),p<s&&u(x,a((p+s)/2))&&(p=s),[m,p]},O=(x,M)=>x&&M?Math.min(x[1],M[1])-Math.max(x[0],M[0]):0;let Y=1/0,V=!1,ft=!1,H=0;for(let x=0;x<j.length;x++){const M=j[x],[b,w]=g(M),s=y(n,e,M,b,w),a=y(t,c,M,b,w);let m=O(s,a);if(m<=0&&H++<32&&(m=O(N(0,s,M,b,w),N(1,a,M,b,w))),m<=h&&(x<f.length&&H<40&&(H++,m=d(M)),m<=h)){x<f.length&&(ft=!0);continue}V=!0,m<Y&&(Y=m)}return{width:V&&Number.isFinite(Y)?Y:0,thin:ft}}function Gt(n,t){const e=nt(n);if(!e)return!0;const c=[0,0,0];for(let r=0;r<e;r++)for(let i=0;i<9;i+=3)for(let l=0;l<3;l++)c[l]+=C(n,r,i+l);for(let r=0;r<3;r++)c[r]/=e*3;let f=0,o=0;for(let r=0;r<e;r++){const i=R(n,r),l=q(i[0],c),h=q(i[1],c),u=q(i[2],c);f+=E(l,tt(h,u))/6,o+=F(tt(q(i[1],i[0]),q(i[2],i[0])))/2}return Math.abs(f)<=t*o}function Jt(n,t,e){const c=q(t[1],t[0]),f=q(t[2],t[0]),o=tt(c,f),r=F(o);if(r<1e-20||Math.abs(E(q(n,t[0]),o))/r>e)return!1;const i=q(n,t[0]),l=E(c,c),h=E(c,f),u=E(f,f),d=E(i,c),g=E(i,f),y=l*u-h*h;if(Math.abs(y)<1e-30)return!1;const _=(d*u-g*h)/y,j=(g*l-d*h)/y,N=e/Math.max(F(c),F(f),e);return _>=-N&&j>=-N&&_+j<=1+N}function vt(n,t,e,c){for(const f of rt(e,{min:n,max:n},c))if(Jt(n,R(t,f),c))return!0;return!1}function et(n,t,e,c){if(!t.closed||n.some((d,g)=>d<t.bounds.min[g]-c||d>t.bounds.max[g]+c)||vt(n,t,e,c))return!1;const f=[1,.371390676,.52999894],o=F(q(t.bounds.max,t.bounds.min))*3+1,r=ct(n,f,o),i=[],l=pt([...n,...r]);for(const d of rt(e,l,c)){const g=ht(n,r,R(t,d),c);if(g){const y=F(q(g,n));y>c&&i.push(y)}}i.sort((d,g)=>d-g);let h=0,u=-1/0;for(const d of i)d-u>c*2&&(h++,u=d);return h%2===1}async function Kt(n,t,e,c,f){const o=t.precision/1e3;if(!Number.isFinite(o)||o<=0)throw Error("Точность расчёта должна быть положительным числом.");const r=n.filter(s=>t.includeHidden||!s.hidden),i=r.filter(s=>_t(s,t.a)),l=r.filter(s=>_t(s,t.b));if(!i.length||!l.length)throw Error("Выборка А или Б не содержит элементов. Отметьте хотя бы одну модель в каждой стороне проверки.");let h=performance.now();const u=async()=>{if(c())throw Error("Расчёт отменён. Предыдущие результаты сохранены.");performance.now()-h>16&&(await new Promise(s=>setTimeout(s,0)),h=performance.now())},d=new Map,g=s=>{let a=d.get(s.id);return a||(a=Mt(s,Array.from({length:nt(s)},(m,p)=>p)),d.set(s.id,a)),a},y=new Map,_=s=>{let a=y.get(s.id);return a===void 0&&(a=!s.closed||Gt(s,o),y.set(s.id,a)),a},j=new Map,N=async s=>{let a=j.get(s.id);if(a!==void 0)return a;const m=[];for(let p=0;p<nt(s);p++)m.push([0,3,6].map(I=>[0,1,2].map(z=>Math.round(C(s,p,I+z)/o)).join(",")).sort().join(";")),p%9e3===0&&await u();return a=m.sort().join("|"),j.set(s.id,a),a},O=[],Y=new Set(i.map(s=>s.id)),V=new Set(l.map(s=>s.id)),ft=xt(l,l.map((s,a)=>a)),H=new Map;let x=0;const M=s=>s.triangles.byteLength+(s.vertices?.byteLength||0)+(s.indices?.byteLength||0)+nt(s)*32;async function b(s,a){if(!f)return s;let m=H.get(s.id);if(m)return H.delete(s.id),H.set(s.id,m),m;for(const[p,I]of H)p!==a&&x>96*1024*1024&&(H.delete(p),x-=M(I),d.delete(p),j.delete(p));return m=await f(s.id),H.set(s.id,m),x+=M(m),m}let w=-1/0;for(let s=0;s<i.length;s++){const a=i[s];performance.now()-w>150&&(w=performance.now(),e({phase:"Проверка пар",done:s,total:i.length,found:O.length}));const m=[...rt(ft,a.bounds,o)];for(let p=0;p<m.length;p++){const I=m[p];performance.now()-w>150&&(w=performance.now(),e({phase:`Проверка пар · A ${s+1}/${i.length} · кандидаты ${p+1}/${m.length}`,done:s,total:i.length,found:O.length}));const z=l[I];if(await u(),a.id===z.id||!ut(a.bounds,z.bounds,o)||t.ignoreSameModel&&a.modelId===z.modelId||t.ignoreSameGroup&&a.modelId===z.modelId&&a.properties.Объект&&a.properties.Объект===z.properties.Объект||t.equalProperty&&a.properties[t.equalProperty]!==void 0&&a.properties[t.equalProperty]===z.properties[t.equalProperty]||a.id>z.id&&Y.has(z.id)&&V.has(a.id))continue;const it=Tt(a.id,z.id),v=await b(a),P=await b(z,a.id);let G,Z="surface",bt=0,W;if(t.type==="duplicates"){if(nt(v)!==nt(P)||v.bounds.min.some((B,J)=>Math.abs(B-P.bounds.min[J])>o||Math.abs(v.bounds.max[J]-P.bounds.max[J])>o))continue;await N(v)===await N(P)&&(G=v.bounds.min.map((B,J)=>(B+v.bounds.max[J])/2),Z="duplicate")}else{const B=g(v),J=g(P),k={min:v.bounds.min.map((A,T)=>Math.max(A,P.bounds.min[T])),max:v.bounds.max.map((A,T)=>Math.min(A,P.bounds.max[T]))},Yt=k.min.map((A,T)=>(A+k.max[T])/2),dt=new Lt,L=[];let St=1,Zt=0,Et=1/0,Bt=0;for(const[A,T]of U(B,J,o)){const K=R(v,A),D=R(P,T);if(!ut(pt(K.flat()),pt(D.flat()),o))continue;const X=Ct(K,D,o,t.touching);if(X){const ot=F(q(X,Yt));if((!G||ot<Et)&&(G=X,Et=ot),dt.add(K),dt.add(D),Zt++%St===0&&(Nt(K,D,o,L),L.length||L.push(X),L.length>=8192)){for(let Q=0;Q*2<L.length;Q++)L[Q]=L[Q*2];L.length=Math.ceil(L.length/2),St*=2}}++Bt%256===0&&(performance.now()-w>150&&(w=performance.now(),e({phase:`Геометрия пары · A ${s+1}/${i.length}`,done:s,total:i.length,found:O.length})),await u())}if(!G&&v.closed&&P.closed){const A=v.bounds.min.map((T,K)=>(T+v.bounds.max[K])/2);et(A,v,B,o)&&et(A,P,J,o)&&(G=A,Z="contained")}if(!G){for(const[A,T,K]of[[v,P,J],[P,v,B]])if(T.closed){for(let D=0;D<nt(A)&&!G;D++){const X=R(A,D),ot=X[0].map((Q,at)=>(X[0][at]+X[1][at]+X[2][at])/3);for(const Q of[X[0],ot])if(et(Q,T,K,o)){G=Q,Z="contained";break}await u()}if(G)break}}if(G){const A=(S,$)=>[...rt($,k,o)].filter(st=>ut(pt(R(S,st).flat()),k,o)),T=A(v,B),K=A(P,J);Z!=="surface"&&(dt.addFrom(v,T),dt.addFrom(P,K)),await u();const D=k.min.map((S,$)=>(S+k.max[$])/2),X=(S,$)=>S===0?et($,v,B,o):et($,P,J,o),ot=(S,$)=>S===0?et($,v,B,o)||vt($,v,B,o):et($,P,J,o)||vt($,P,J,o),Q=(S,$,st)=>v.closed&&P.closed&&st.every(gt=>{const lt=ct(gt,S,$-E(gt,S));return!ot(0,lt)||!ot(1,lt)}),at=()=>[0,1,2].map(S=>L.reduce(($,st)=>$+st[S],0)/L.length),Ot=Z==="surface"&&L.length>2?wt(L,at())[2]:void 0,Dt=!Ot||Pt(v,P,T,K,[Ot],[],k,at(),L,o,X).width>o,Ft=_(v)||_(P);if(!Ft&&!Dt&&(Z="touch"),Z==="touch"&&!t.touching)continue;const{zones:Qt,crowded:Rt}=Ht(L,k,o,Q),Ut=dt.values();let mt=0,At=!0;for(const S of Z==="touch"?[]:Qt){const $=S.limits.length?T.filter(yt=>zt(v,yt,S.limits)):T,st=S.limits.length?K.filter(yt=>zt(P,yt,S.limits)):K,gt=S.hits.length?[0,1,2].map(yt=>S.hits.reduce((Vt,Wt)=>Vt+Wt[yt],0)/S.hits.length):D,lt=Pt(v,P,$,st,S.hits.length>2?wt(S.hits,gt):[],Ut,k,gt,S.hits,o,X);lt.thin&&(At=!1),lt.width>mt&&(mt=lt.width),await u()}mt*=1e3,Z==="touch"?W=void 0:Ft?W="unmeasurable":mt<=0||!At?W="tolerance":Rt&&(W="approximate"),bt=Z==="touch"||W==="unmeasurable"||W==="tolerance"?0:Math.max(t.precision,mt),await u()}if(G&&!W&&bt+t.precision<t.minPenetration)continue}if(G&&(O.push({id:it,a:qt(v),b:qt(P),point:G,kind:Z,state:"new",note:"",assignee:"",firstSeen:"",lastSeen:"",penetrationMm:bt,...W?{depth:W}:{}}),O.length>=5e4))throw Error("Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат.")}}return e({phase:"Готово",done:i.length,total:i.length,found:O.length}),O}let Xt=0;const It=new Map;self.onmessage=async n=>{if(n.data.request!==void 0){const t=It.get(n.data.request);It.delete(n.data.request),n.data.error?t?.reject(Error(n.data.error)):t?.resolve(n.data.geometry);return}try{const{elements:t,check:e}=n.data,c=await Kt(t,e,f=>self.postMessage({progress:f}),()=>!1,n.data.streaming?f=>new Promise((o,r)=>{const i=Xt++;It.set(i,{resolve:o,reject:r}),self.postMessage({load:f,request:i})}):void 0);self.postMessage({results:c})}catch(t){self.postMessage({error:t instanceof Error?t.message:String(t)})}}})();\n', et = typeof self < "u" && self.Blob && new Blob(["(self.URL || self.webkitURL).revokeObjectURL(self.location.href);", dt], { type: "text/javascript;charset=utf-8" });
function zt(t) {
  let e;
  try {
    if (e = et && (self.URL || self.webkitURL).createObjectURL(et), !e) throw "";
    const i = new Worker(e, {
      name: t?.name
    });
    return i.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(e);
    }), i;
  } catch {
    return new Worker(
      "data:text/javascript;charset=utf-8," + encodeURIComponent(dt),
      {
        name: t?.name
      }
    );
  }
}
const se = (t) => String(t ?? "").replace(
  /[&<>"']/g,
  (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[e]
);
function tt(t, e) {
  const i = URL.createObjectURL(
    new Blob([e], {
      type: t.endsWith(".html") ? "text/html;charset=utf-8" : "application/json;charset=utf-8"
    })
  ), r = document.createElement("a");
  r.href = i, r.download = t, r.click(), setTimeout(() => URL.revokeObjectURL(i), 6e4);
}
const Ct = {
  unmeasurable: "не определена",
  tolerance: "в пределах точности",
  approximate: "неполный расчёт"
}, He = (t, e) => e === "duplicates" ? "—" : t.kind === "touch" ? "касание" : t.depth === "approximate" ? `≈ ${(t.penetrationMm ?? 0).toFixed(1)}` : t.depth ? Ct[t.depth] : (t.penetrationMm ?? 0).toFixed(1);
function $t(t, e) {
  const i = se;
  return `<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${i(t.name)}</title><style>body{font:14px/1.5 system-ui;margin:24px;background:#171c23;color:#e6edf5}h1{margin:0}small{color:#a9b7c8}input,select{padding:10px;margin:15px 8px 15px 0;max-width:100%;background:#242e3b;color:inherit;border:1px solid #506074;border-radius:6px}.wrap{overflow:auto}table{border-collapse:separate;border-spacing:0;width:100%}td,th{padding:10px;border-bottom:1px solid #39475a;min-width:100px;vertical-align:top;overflow-wrap:anywhere}th{background:#253142;position:sticky;top:0;text-align:left;white-space:normal}td{max-width:350px}tr[hidden]{display:none}.shot{display:block;width:260px;border:0;background:transparent;padding:0;cursor:zoom-in}dialog{width:min(94vw,1400px);border:1px solid #506074;background:#20242b;color:white;border-radius:10px}dialog img{max-width:100%;max-height:80vh;display:block;margin:12px auto}dialog::backdrop{background:#000b}.shot img{width:100%;border-radius:6px}.legend{margin:12px 0}.red{color:#ff6161}.blue{color:#65baff}@media print{input,select{display:none}body{background:white;color:black}.wrap{overflow:visible}th{position:static;background:#eee}}</style><h1>${i(t.name)}</h1><small>НашеПО · Проверки коллизий · ${i(t.lastRun || "")} · ${t.status === "stale" ? "Результат устарел" : "Последний завершённый расчёт"}</small><p>${i(t.type === "duplicates" ? "Совпадение треугольной геометрии" : "Пересечения поверхностей и вложенность замкнутых тел")}. Точность: ${i(t.precision)} мм${t.type === "intersection" ? `; минимальная глубина: ${i(t.minPenetration)} мм` : ""}. Глубина Hard Clash — толщина самого сильного из отдельных перекрытий пары. «Касание» означает, что общего объёма у тел нет. «Не определена» — у элемента нет собственного объёма. «В пределах точности» — перекрытие тоньше заданной точности расчёта. «Неполный расчёт» со знаком ≈ — контакт разделён не полностью и значение может быть завышено. Порог минимальной глубины на все эти строки не действует: решение по ним принимает человек.</p><p class="legend"><span class="red">● Элемент А выделен красным</span> · <span class="blue">● элемент Б — синим</span></p><input id="search" type="search" placeholder="Поиск по всему отчёту"><select id="state"><option value="">Все состояния</option>${Object.entries(
    ve
  ).map(([r, s]) => `<option value="${r}">${s}</option>`).join(
    ""
  )}</select>${t.type === "intersection" ? '<input id="depth" type="number" min="0" step="1" placeholder="Глубина от, мм">' : ""}<span id="count"></span><div class="wrap"><table><thead><tr>${["Снимок", "№", "Состояние", "Глубина, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "X", "Y", "Z", "Назначение", "Комментарий"].map((r) => `<th>${r}</th>`).join("")}</tr></thead><tbody>${e.map((r, s) => `<tr data-state="${r.state}" data-depth="${r.penetrationMm ?? 0}"${r.depth && r.kind !== "touch" ? ' data-unmeasured="1"' : ""}><td>${Le(r.image) ? `<button class="shot" type="button"><img src="${r.image}" alt="Снимок конфликта ${s + 1}" loading="lazy"></button>` : "Снимок отсутствует"}</td>${[s + 1, ve[r.state], He(r, t.type), r.a.name, r.a.model, r.a.guid, r.b.name, r.b.model, r.b.guid, ...r.point.map((n) => n.toFixed(4)), r.assignee, r.note].map((n) => `<td>${i(n)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><dialog id="picture"><button id="close-picture">Закрыть</button><img id="full-picture" alt="Снимок конфликта"></dialog><script>const modal=document.getElementById("picture");document.getElementById("close-picture").onclick=()=>modal.close();for(const b of document.querySelectorAll(".shot"))b.onclick=()=>{document.getElementById("full-picture").src=b.querySelector("img").src;modal.showModal()};const PREC=${Number(t.precision) || 0},q=document.getElementById('search'),s=document.getElementById('state'),d=document.getElementById('depth'),rows=[...document.querySelectorAll('tbody tr')];function filter(){let n=0;for(const r of rows){r.hidden=!!((s.value&&r.dataset.state!==s.value)||(d&&!r.dataset.unmeasured&&Number(r.dataset.depth)+PREC<Number(d.value||0))||!r.textContent.toLowerCase().includes(q.value.toLowerCase()));if(!r.hidden)n++}document.getElementById('count').textContent='Коллизий: '+n}q.oninput=s.onchange=filter;if(d)d.oninput=filter;filter()<\/script></html>`;
}
function Ot(t, e) {
  return JSON.stringify(
    {
      version: 1,
      id: t.id,
      name: t.name,
      images: Object.fromEntries(
        e.filter((i) => Le(i.image)).map((i) => [i.id + ".jpg", i.image])
      ),
      warnings: t.warnings,
      tests: [
        {
          id: t.id,
          name: t.name,
          clashes: e.map((i, r) => ({
            id: i.id,
            name: `Конфликт ${r + 1}`,
            distance: t.type === "duplicates" ? "" : i.depth || i.kind === "touch" ? He(i, t.type) : `${(i.penetrationMm ?? 0).toFixed(1)} мм`,
            date: t.lastRun || "",
            description: t.type === "duplicates" ? "Дублирование" : "По пересечению",
            status: ve[i.state],
            group: i.assignee,
            note: i.note,
            point: i.point,
            image: Le(i.image) ? i.id + ".jpg" : "",
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
              "Расчётная глубина пересечения, мм": He(i, t.type)
            }
          }))
        }
      ]
    },
    null,
    2
  );
}
const qt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAydpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAzIDc5Ljk2OTBhODdmYywgMjAyNS8wMy8wNi0yMDo1MDoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDZFQkU2NEQ4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDZFQkU2NEM4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI2LjExIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRENDVBNjQzODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRENDVBNjQ0ODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+pHX+ogAAD+lJREFUeNrsnXtwVPUVx2/CZvMgQEhCSAwJJDzDqwgodCq08hAr7wpSo1M6o/5Rq6NUcdqp1XamdjqOY6mvWhWnttZpRRtbaRGpMMKMZlB8gaFaQoQQSEhIQt7hkfTzhY1ulnt37929mw1T7sxls3vv/f3O7/zO43vO7/wucd3d3calI/zDo3927txpnDx5MqaEpKenpyUlJWUlJCQM6+rqSm1vb/fyGRcfH9+dkpLSGRcX13Lq1Knajo6Omvr6+ia+x4zWtLQ0Y86cOee/SAKLiopiyjwYlz5ixIhyPk8PGDBAKnHB6fF4unU9Ly+vDCanxpLeqVOnnuObznj9kJycHFMGwpRrjh8/Xoh0ec6ePWt6z5kzZwxdr62tLcrPz786lvT68ys+1jYEaTJQx+tRT1v3w0QDabweSe0XNjDmDBwyZEh6U1PTPCfPtLS0LOK5QZcYyDF48OAFjY2N6U6eaWhoyIaBc//vGSg1RIXXSC2dHG1tbYbX610dS08cUwYmJiYa2dnZWRMmTFiO9C0Ipw3UfgnoYfHw4cMzYWZscWAEeChj2LBha8CQm+vq6g6D26xnKj5eWC+dZ67l71VI0dxDhw5lYM/C6vvYsWMZzc3Nm4cOHVo7atSot/Hem6DjzRMnTjQGCw4k9RkZGYWYgGtrampeZCKaIuKgOps+fbrj55AgwYmPkabunJyceqThEaQhT4wKJPiyyy4bx/VHgStVQABTnBfpCdjuhp7D9PMw9BQGemnRBc0FXP8tdDaKbhj/Hn+Pdjr2WbNmfYkDw2IgjJgDMdX+A1DEwG8nUEsNYJTUSp98fzIrK6tF16PBuMBT/cCUk/T7Gz5HiI7c3NwxfN8gxgXSweRWcv3KPmOgQG9mZmaz1QAUScDIhvHjx/8Zgmsx9GExAjXrLigo6Ebrw2YkdBwdN26c6GgKNoGYoXoioblRZyAqsoDOWqMlOVJDbKQY10Zf3VJ3feo7Nuvc92hJsqQWJn7DKQNtOxHEfCZw4xVCqRS3PNigQYMEpCv5/BBJfa+zs3MfElyB1D1RWlp6le45fPiwMXv27D2o4p04ikI+p0D4FTiQaXjw3HCdUOCBQxmMxJZgdubhoPa56kRQ2REw8LAbMy3jjRmoxiY9VVhYuABmDRKs6TnGjBlTTNKg1zP6zu83+sMgVHwwTmAhpuIZJKcWxroiibT1OTRluabCqampKajQO5ESBmCWOn6GF7wLdckyi2WZpALOBrPn9TsGv8AMliA52UzIj5iYA+onUloZ778xJ4muMBD1SoGwzyIhiIE3MMCfgNks01AQrLTa1mDt6LruC5JTHEI/D8ppRELvyJEjPxo4cKDXNScyevTomwPVyq668uxmGDg2VNg1ceLEO0JhRF2HiT8M1o76ob8izMO2cNRajoxnV7rqhZFCL7OyzwkhOIcuIMRPmUk70GgCxrvFTrvc18z940O1iekZgH38JbQ7Vd/3oHmA6zAGSbrJrhTidFox8KsCo5IgA93pZJCo6ds8F28nWQFDbka1OxxI34qo4EBmMgGmfBqKCHCiJGS+HQQgdUN175OqOzUNPLfeTjZG9+C8FsPEdhvS9z7SFx81II0UrglmpyCykxn8tl0IhVmYisFvDxP4tsOYqXb7gjkrMStnrNqDcWe5Z4lTIO0onQWQbfAt+lxwyNYRRfzg4MGDW2wmUhOQpGcBsElhAt8kJvNZtWPn/i+++KIE03K31fqPxqXxRS0bIxVmhj62in9xGE9pfcOu6k6aNOnBSMGvnqedB+wmVpVYgM4XrMJBNOxd7GB0VJhI4HtWtgpV2oskpNhcwjRwGt/CVp5yI3JQO7T3TbVr5wCLDiHaOGDlRGDid1yPhQVjWFa8j1jVbFFI4n8Xeck2q0Qqz3tQ78kQOI+k6yLWNOYQUycYLhxqBwncgj3dRV9bSdRuJ0beS6x81izBS98nsdXr8OL/CIyjtVQAU36MOXqttbW1yzUVxjEs1eyYzRoq8XJgSl2xKjnATKR2Cd7ycWZ1H/any40wK1S4qH7UH/0+pv5Fh3+s3UPf2LFj/2nWhnAjaONq1yRQdo2ZvUWzY5LSbyeNvl5runQcx/ciZk+dL2J2Z2PohyEJfbY+cfr0aYOlhTjOSXydBE13oiG12O5Svm9FqnYgnWWiCfru4fpC/u6lCbpGaH0ra887tJgf8ZoI4p6Lei40U01sz9sQlE9m5A6YOB9mToFpHruL5NE+xAzOYfy5FC1ZygSfAf7sxQa+hfS8zue7e/bsmRuo6jD3OmxlJuahLmIVRtRvCfSWwoL8LuDZKpEPN+scq1P04vTOJWo1jkBs60uffTdiFZaU4SCuC5QoPJ9x5MgRgwqqFOMiPDRwLcZxJgsXajxK3Bp+5SOYLgUEfwlrXRj9V6NDMcSrUdG5JoDa6C+1KYYLi/tmBU2Yo4WMfwVOaYj4EdQGqgHdhN6nq2QCyVuB07imoqIiB8N7wUMwtWvmzJmf7Nq1a1qwteCLgXkzZswo271798TAa0ePHs2BiSX4gCqY+CYOpYTvu6hNbOzFcH1ZsmTJdFz/CyQBjuFF7YDXJmZnFHZix8Vk+wJP6H9r8uTJExTDh7oX3KhEaxWQ7vnly5dP7RWJFBcXb3TSMThpr5A/uTmCkPyai5F5ohu4kqcYnr/LnTy7du3ax3slE3ASmU5EH3Uvl+qyenUYULrWt3Z70RyiV3RXV1dX+szXQSfPo85ZvZwIbj3DSQPcXynQqoPsyxuk0H9mNxaN9SE6off+8vLyN3rANzb/iMPxD+vFQBxFooOHJbp1PQU8mkGY+BA29LX+UG4WCpZBZwn0/qrH+Yl+6K5z0g78SurFQJIEHidE0GFbYBBOjfMtGNj/9mcGApw/h85bTcLSNieT788v1+oDCXvqmc1iDHN7f2Se6BJ9otP1AksM6hm7D0j0Ud9ki6zv+xjoO1Sy0Z8O0SO6oG+PxS0pTjYc+fMr3peO73QSBnFkWon8gQMHngcvPR0MvfflITqg53eiywpMczhyovCroxcDYYpTsc6zYpDi5srKynUY69L+wECl6UWPVYZI40CrRjiMpet6MZDA+YRDHDQaMba0uoQ8HaSEbqKepTqWzKP/Y6IDejqDwJoEoEyBQ6mu/ZKBsmm45d8zU6/QYb2dXUtkKwqxKzlG8FWzg2SxYyqFqFopdFSEsI/5jGdkqLZUk0P+sA6k8VeyOF+aA49gCcXepaRzVpMYzeYmbXpZAVPnEThnmG1BIEk5kFT5FMXcweAOkxNTdI3XTQpVHYEETqMwPcFqSxfOp5Y4eDtjKYFxO5iQ4/zWOxsjQypEXn3+eIkE6ktkZoYTbC/C7W/goaGBuI9n5uNItlp5LxHOtaQY5/2SguE70ci5kLzmBdeI88WodYx/G8C7tify8nM81jhQBhem1ezfv/+PMHKnmSfGDi7TaluIiCUxxgxMDCaB0J+EMCwyzLegbSsrK3sJ4N2LeY422ijMQXS3mC2Ys3Aznhm6KtjsMgBvjBnoDSaBmKz5mKlRZhuBEJAtdrBhyEgED/Yvrb4ZF274k/243aoaIU4LD/1YArUUize93Wy1Ea3T/pttrmz1YiG6kgWY7Rbh2zKytWMtJHBAP5FA07UHnODXUM9rLFT7DSTzuCsM9AHQ58xKa/FeiXT2oJkUQrinPzCQifSYSR8e9hcsTXhM6hXlUJ+zsyZsO5mApG0hjf+Z2TVmsRjoM8dEAj3Yz4RYMpD+TRnI0oX2yS03e4Zxfsh4t7u6WxN70MmsPRJYImGcX2CKg9DHkMTEfiiBqpvxBFRTpCJhG8z2GAr3wfCHwcBnXd/uyoz9CWy03+xaVVXVNLK8v/aPjyEkAcZ6YiyBCaLD8CtTwfY9ypq2aY0149sDDt4Ulf3CkkJm817fqt0FL4SAiXejGsV+EpggCQhn4LJRlGC0UjXwAZ9t4e4Hpn+P6OjBpdB3G8y7zWwpFkfJz13rnUif4/3CEJFkhY0Ea1Dx51ixO0bebQcz73Uigb79xN1AiFIkWXt//654GqNOmD56GZO0GkQwG+8YZ3ct2qfCXl858XU8+6QZbPHdq3fUJEatQpWBeKwqVP1PVKQBqblCZWUA1dOh7tfmQhhUxjrzQwxyurygRf9iwnTdR0Bfps2HNnZ8noaWDLLRc4LtMO05abcUtBEXlQpVBnmD3c3SSNIJOlnvA+BmBd1apD4CM5QFmsd9Xoc75b08N1/Pqx2rYgCkuY2NivfzedIO3WoHIVnsOgMlfajmRw4Xrs8VOxp+WxNwNI3sNHqFoszVwIW0SOtr9LzaUXtqV+37lyHTvzY2Ot1o806oOulwtnrd4HSrvl7VxHPa/dh9+eWXf8zmmJtQp5xovSDC53hy6Odm+lMN4Ln+RYcTuu1IoaNtDkhfMrjpAbOUT4istUFx0jnnAlZMIzHhxcNVR6v4Uu3iIGr14jKcRZr6Vf92IwrjqzVfwZ+fI4Vet7wwzim+wwgPh4l5OvNRrefBWeuQjMcJATeRzWl049V78t6oagZ27gaSv3eCAIoinSTalLTEueaF8agFDP6oG0U9vm38hygPfgQH8HUcQqLd/SX+6oqj0j7muXqZBO1VhbOb1DDfl1yB9851dZsD8W4FkrNKdXJIzsBIZlemgOWDfPDZPYDXe4AjBzD+eyBmN5LzKav+lZz1fO9Ags8qq8OZjASnw7g8PrWUcAUqOhNVLVBI5tZLJBEUacX1aEiV60AaBP8OErOGDv5GB143ymz10kfOMXwdg7Ffo8IfGNSFd21BKmU2ZMA82LEkbNMggWjtVXFq1+wcePM2+l/F5H4QtRfv+HY+Lg2281F5VL0nBmhRohmNZSE5/dcRDpbAnPZghfBoVhNwZ6ERxmtP4p0ymxl6Hc+8DMhQH8hcCG7Gtj2Jqs3gvpVI1Sy+/wEC+2zfg+gQw5jAZ5DkK1lUX4lkzdTLKSRlJgmEGuzyYu7bZvTlq5/oeBqz9h9tgYCZzQDZp/htTCA4loPAfk7h+tMY6Dqne4PtnnIi9FNDP0/QT1Fg5YS+Y2sncP1ZvftGu5owSZ/oFVZGX7/6yfiq0jObmb4XIsaGqoURY2F0Nip1K+cWBtMU6Xu0tP1M0Qftbeb8PhqQFSq6EZ1imujWy9PCGbdrDDQiqxLNo8D7Rql9OMyDCfU8vwqpz+3r6tiYM9BfGrBNr4XDQJ570c47GaLNwJi+wVJwhPNls6UCI0SdCuHlpv6wRyXm71DV+ithWKPDdFYN4eEOw7j0ElrFybUsSDliBjBqGwC86RIDjfPbDLAlr9qNh+UwyOy8avXC7pgw0Gwrf18ebNjZijc+EgoK6TrQqZxyvO2xpNe/5O8cxRs3bjT6cme5yVEHJpzBZzbAPAvpSiW3l+j/nxGA75qZ6OMQf4xYvCnGr67/KvK59N9hRHb8T4ABAPaAkPNeKkdCAAAAAElFTkSuQmCC", Nt = ":host{display:block;height:100%;color-scheme:dark;font:13px/1.4 Segoe UI,sans-serif;color:#dbe5f0;container-type:size}*{box-sizing:border-box}[hidden]{display:none!important}main{height:100%;min-height:260px;background:#171d25;display:flex;flex-direction:column;overflow:hidden;-webkit-user-select:none;user-select:none}button,input,select,textarea{font:inherit;color:inherit;border:1px solid #425165;border-radius:6px;background:#253140;padding:7px 9px;min-width:0}button{cursor:pointer;white-space:nowrap}button:hover{background:#354459}button:disabled{opacity:.45;cursor:default}.primary{background:#b99a38;border-color:#d0ae46;color:#111820;font-weight:600}.primary:hover{background:#e0bd51}button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid #f2c94c;outline-offset:1px}input,select,textarea{background:#111a24}input,textarea,td,dd{-webkit-user-select:text;user-select:text}input[type=checkbox]{accent-color:#e6c354;width:16px;height:16px}header{display:flex;gap:7px;align-items:center;padding:8px 12px;border-bottom:1px solid #354459;flex-shrink:0;overflow-x:auto}.brand{display:flex;gap:7px;align-items:center;margin-right:8px}.brand img{width:32px;height:32px;object-fit:contain}.brand b{font-size:17px}.brand small{font-size:10px;color:#a6b5c7}#dirty{margin-left:auto;font-size:11px;color:#cabb81;white-space:nowrap}.notice{background:#1c2735;padding:5px 12px;font-size:12px;min-height:27px;max-height:70px;overflow:auto;color:#a7bbd1}.notice.error{color:#ffaaa1;background:#412725}.workspace{display:grid;grid-template-columns:230px minmax(0,1fr);flex:1;min-height:0}aside{padding:10px;display:flex;flex-direction:column;gap:9px;border-right:1px solid #354459;min-height:0}#checks{overflow:auto;flex:1;min-height:0}.check-item{display:flex;flex-direction:column;gap:5px;width:100%;margin-bottom:5px;text-align:left;white-space:normal}.check-item small{color:#a8b7ca}.check-item.active,.tabs .active{border-color:#c7ab56;background:#403b2c;color:#ffe399}.main{display:flex;flex-direction:column;min-width:0;min-height:0}.test-toolbar{display:flex;gap:7px;padding:8px 12px;align-items:center}.test-toolbar input{flex:1;font-weight:600}.tabs{display:flex;gap:7px;border-bottom:1px solid #354459;padding:0 12px 8px}.tabs button{min-width:105px}#content{flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column}.empty{padding:28px;color:#a4b4c9;text-align:center;margin:auto}h2,h3,p{margin:0 0 10px}h2{font-size:20px}h3{font-size:15px}label{display:flex;flex-direction:column;gap:5px;font-size:12px;color:#b8c6d7}.check{flex-direction:row;align-items:center;gap:6px}small{font-size:11px;color:#a8b7c9}.parameters{display:flex;gap:18px;align-items:end;padding:10px 12px}.parameters input{width:140px}.selection-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0 12px 12px}.selection{border:1px solid #39495e;border-radius:8px;padding:12px;background:#1b2633;min-width:0}.selection h3{display:flex;justify-content:space-between}.selection h3 span{color:#92c4b2;font-size:12px}.selection select[multiple]{width:100%;min-height:70px}.selection-tools{display:flex;gap:5px;flex-wrap:wrap;margin:8px 0}.selection-tools button{font-size:11px;padding:5px 7px}.selection>label{margin-bottom:8px}.condition{display:grid;grid-template-columns:minmax(80px,1fr) 100px minmax(70px,1fr) 29px;gap:5px;margin:6px 0}.condition button{padding:3px}.rules,.report{padding:18px;max-width:850px}.rules>label{margin:14px 0}.rules>p,.report>p{color:#a9b8cb}.report>button{margin:12px 8px 14px 0}.result-tools{display:flex;gap:7px;flex-wrap:wrap;padding:8px 12px}.result-tools input{flex:1;min-width:180px}.result-area{display:grid;grid-template-columns:minmax(0,1fr) 300px;flex:1;min-height:0}.table-area{display:flex;flex-direction:column;min-width:0;min-height:0}.scroll{overflow:auto;flex:1;min-height:0}table{border-collapse:separate;border-spacing:0;width:max-content;min-width:100%}th{position:sticky;top:0;background:#2a3748;z-index:1;text-align:left;max-width:240px;white-space:normal}th,td{padding:8px;border-bottom:1px solid #344154;vertical-align:top}td{max-width:320px;min-width:90px;overflow-wrap:anywhere;-webkit-user-select:text;user-select:text}td:first-child{min-width:36px}tr.active td{background:#453e29;color:#fff0b5}tr:hover td{background:#2c3847}.pager{display:flex;gap:10px;align-items:center;justify-content:center;padding:5px;border-top:1px solid #39495e;font-size:11px}.pager button{padding:2px 8px}.detail{border-left:1px solid #354459;padding:10px;overflow:auto}.detail h3{overflow-wrap:anywhere}.detail>label{margin:10px 0}.detail p{font:11px/1.5 Consolas,monospace}.detail details{border-top:1px solid #354459;padding:8px 0}summary{cursor:pointer}dl{font-size:11px;display:grid;grid-template-columns:1fr 1fr;gap:7px}dt,dd{overflow-wrap:anywhere;margin:0}dt{color:#9baec4}footer{border-top:1px solid #354459;padding:4px 12px;display:flex;justify-content:space-between;color:#91a4bb;font-size:11px}dialog{border:1px solid #53647c;border-radius:12px;background:#202c3a;color:#dbe5f0;width:min(700px,92vw);max-height:85vh;padding:20px;box-shadow:0 15px 60px #000a}dialog::backdrop{background:#000a}dialog p{margin:12px 0}dialog a{color:#f2c94c;margin-right:12px}.dialog-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:16px}@container (max-width:950px){.workspace{grid-template-columns:185px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 240px}.selection-grid{grid-template-columns:1fr}.parameters,.test-toolbar{flex-wrap:wrap}.test-toolbar input{flex-basis:100%}}@container (max-height:400px){header{padding:5px 10px}.test-toolbar{padding:5px 10px}.tabs{padding-bottom:5px}.brand img{width:25px;height:25px}footer{display:none}}:host{font-size:12px}.brand img{background:#e1e7ef;border-radius:5px;padding:3px}.selection-tools button{font-size:12px}label{font-size:13px}.choose-layout{display:grid;grid-template-columns:220px minmax(0,1fr);min-height:0;flex:1;overflow:auto}.choose-layout .parameters{display:flex;flex-direction:column;align-items:stretch;gap:15px;border-right:1px solid #354459;justify-content:flex-start}.choose-layout .parameters input{width:100%}.choose-layout .parameters input[type=checkbox]{width:16px}.choose-layout .selection-grid{padding:10px 12px;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start;min-width:0}.selection select[multiple]{height:180px;resize:vertical}.selection-mode{font-size:12px;color:#b6c4d5}.preset-row{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:9px}.preset-row select{flex:1 1 160px}.preset-row button{padding:5px 7px;font-size:12px}.model-list{height:150px;overflow:auto;border:1px solid #425165;border-radius:6px;background:#111a24;padding:5px;margin-bottom:5px}.model-list label{display:flex;flex-direction:row;align-items:center;gap:7px;padding:4px 5px;color:#dbe5f0;overflow-wrap:anywhere}.model-list label:hover{background:#253140}.model-list .model-all{position:sticky;top:-5px;z-index:1;background:#1f2b39;border-bottom:1px solid #425165;font-weight:600}.legend{display:flex;gap:12px;flex-wrap:wrap;font-family:inherit!important}.part-a{color:#ff6161}.part-b{color:#65baff}.preview{display:block;width:100%;padding:5px;margin:8px 0}.preview img{display:block;width:100%;max-height:180px;object-fit:contain}.image-dialog{width:94vw;max-width:1500px}.image-dialog img{display:block;max-width:100%;max-height:75vh;margin:10px auto}#help-dialog{width:min(1000px,94vw);line-height:1.6}#help-dialog details{padding:12px 0;border-bottom:1px solid #425165}#help-dialog summary{font-size:16px;font-weight:600;color:#f0d27a}#help-dialog li{margin:8px 0}@container (max-width:1100px){.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .selection-grid{grid-template-columns:1fr}.condition{grid-template-columns:minmax(60px,1fr) 100px minmax(60px,1fr) 29px}}@container (max-width:700px){.choose-layout{display:block}.choose-layout .parameters{border-right:0;border-bottom:1px solid #354459}.workspace{grid-template-columns:160px minmax(0,1fr)}}button,input,select,textarea{padding:5px 7px;border-radius:5px}button{min-height:27px}input[type=checkbox]{width:14px;height:14px}.commandbar{position:relative;display:flex;gap:8px;min-height:45px;padding:5px 8px;overflow:visible;background:#131b25}.brand{flex:0 0 auto;margin-right:0;gap:5px}.brand img{width:28px;height:28px}.brand b{font-size:14px}.check-heading{display:grid;grid-template-rows:25px 12px;flex:0 1 230px;min-width:145px}.check-heading input{height:25px;border:0;background:transparent;padding:2px 5px;font-weight:600}.check-heading small{padding:0 5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:9px}.tabs{align-self:stretch;align-items:center;flex:0 0 auto;gap:3px;padding:0;border:0}.tabs button{flex:0 0 auto;min-width:0;padding:5px 9px;background:transparent;border-color:transparent}.tabs .active{background:#3e3828;border-color:#b99a38}.header-actions{display:flex;align-items:center;gap:4px;margin-left:auto}#dirty{margin-left:0;width:0;height:0;overflow:visible;font-size:0}#dirty:not(:empty){width:7px;height:7px;border-radius:50%;background:#e5bd43;box-shadow:0 0 0 2px #e5bd4328}.more-menu{position:relative;z-index:20}.more-menu summary{display:grid;place-items:center;width:29px;height:29px;border:1px solid #425165;border-radius:5px;background:#253140;cursor:pointer;list-style:none;font-size:18px}.more-menu summary::-webkit-details-marker{display:none}.more-popover{position:absolute;right:0;top:calc(100% + 5px);display:grid;width:190px;gap:3px;padding:6px;border:1px solid #506176;border-radius:7px;background:#192431;box-shadow:0 12px 35px #000a}.more-popover button{text-align:left}.notice{min-height:23px;max-height:45px;padding:3px 9px;font-size:10px}.run-progress{display:grid;grid-template-columns:minmax(150px,auto) minmax(120px,1fr) auto;align-items:center;gap:8px;min-height:24px;padding:3px 9px;border-bottom:1px solid #425165;background:#202a20;color:#d9e7d2;font-size:10px}.run-bar{width:100%;height:7px;overflow:hidden;border-radius:2px;background:#101810}.run-bar i{display:block;width:0;height:100%;background:#e3bc43}#run-phase,#run-value{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#run-value{text-align:right;color:#b9c9b3}.workspace{grid-template-columns:190px minmax(0,1fr)}aside{gap:6px;padding:7px;background:#141c26}.aside-title{font-weight:600;font-size:12px}.aside-actions{display:grid;gap:5px}.check-item{gap:2px;margin-bottom:3px;padding:6px 7px}.check-item small{font-size:9px}.main{background:#171d25}#content{overflow:hidden}.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .parameters{gap:9px;padding:8px}.choose-layout .selection-grid{gap:8px;padding:8px}.selection{padding:8px}.selection h3,h3{font-size:13px;margin-bottom:6px}label{gap:3px;font-size:11px}small,.selection-tools button,.preset-row button{font-size:10px}.model-list{height:125px}.model-list label{padding:2px 4px}.selection-tools{gap:4px;margin:5px 0}.selection-tools button,.preset-row button{padding:3px 5px;min-height:23px}.result-tools{display:flex;align-items:center;justify-content:space-between;gap:6px;flex-wrap:nowrap;min-height:38px;padding:5px 7px;border-bottom:1px solid #354459;background:#151f2a}.result-filters,.bulk-tools{display:flex;align-items:center;gap:5px;min-width:0}.result-filters{flex:1}.result-filters input[type=search]{flex:1 1 190px;min-width:120px}#result-depth{flex:0 1 125px;min-width:92px}#result-count,#selection-count{color:#9fb0c4;white-space:nowrap;font-size:10px}.bulk-tools select{max-width:125px}.result-area{grid-template-columns:minmax(0,1fr) 310px}th,td{padding:5px 6px;font-size:11px;line-height:1.25}th{max-width:190px}td{max-width:260px;min-width:76px}.pager{justify-content:flex-end;min-height:29px;padding:3px 7px}.pager #selection-count{margin-right:auto}.detail{display:flex;flex-direction:column;min-width:0;padding:0;overflow:hidden;background:#141e29}.detail-head{display:flex;align-items:center;justify-content:space-between;gap:6px;min-height:47px;padding:7px 8px 4px}.detail-head>div:first-child{min-width:0}.detail-head small{color:#8093aa;letter-spacing:.08em}.detail-head h3{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin:0}.detail-nav{display:flex;gap:3px}.detail-nav button{min-width:27px;padding:2px 7px;font-size:17px}.clash-summary{display:flex;gap:5px;padding:0 8px 5px;color:#adbdcf;font-size:9px}.clash-summary span{padding-right:5px;border-right:1px solid #405064}.clash-summary span:last-child{border:0}.detail .legend{margin:0;padding:0 8px 5px;font-size:10px}.preview-slot{height:clamp(92px,18cqh,145px);flex:0 0 auto;margin:0 7px 6px;overflow:hidden;border:1px solid #37475b;border-radius:6px;background:#0e151d}.preview{position:relative;width:100%;height:100%;margin:0;padding:0;border:0;background:transparent}.preview img{width:100%;height:100%;max-height:none;object-fit:contain}.preview span{position:absolute;right:5px;bottom:5px;padding:3px 6px;border-radius:4px;background:#101923db;font-size:9px}.preview-empty,.detail-empty{height:100%;display:grid;place-content:center;justify-items:center;gap:4px;color:#788ba1}.preview-empty>span,.detail-empty>span{font-size:24px}.detail-actions{display:grid;grid-template-columns:1fr 1fr;gap:5px;padding:0 7px 7px}.detail-scroll{flex:1;min-height:0;overflow:auto;padding:7px 8px 12px;border-top:1px solid #354459}.detail-scroll>label{margin:7px 0}.detail p{font:inherit}.coordinates{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;font:9px/1.3 Consolas,monospace;color:#91a3b7}.coordinates span{overflow:hidden;text-overflow:ellipsis}.detail details{padding:6px 0}.detail dl{font-size:10px}.detail-empty{padding:20px;text-align:center}footer{padding:2px 8px;font-size:9px}@container (max-width:1050px){.workspace{grid-template-columns:165px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 270px}.check-heading{flex-basis:185px}.tabs button{padding-inline:6px}#dirty{display:none}}@container (max-width:820px){.brand b,.brand small,#result-count{display:none}.check-heading{flex-basis:155px}.result-tools{overflow-x:auto}.result-area{grid-template-columns:minmax(0,1fr) 245px}}@container (max-height:410px){.notice,footer{display:none}.preview-slot{height:90px}}", je = /* @__PURE__ */ new WeakMap(), pt = "nashepo.collisionfinder360.project.", Re = () => ({
  format: "nashepo.checks",
  version: 1,
  checks: [],
  sets: []
}), it = (t) => {
  if (!(!t || typeof sessionStorage > "u"))
    try {
      const e = sessionStorage.getItem(pt + t);
      return e ? lt(e) : void 0;
    } catch {
      return;
    }
}, nt = (t, e) => {
  if (!(!t || typeof sessionStorage > "u"))
    try {
      sessionStorage.setItem(
        pt + t,
        JSON.stringify(e, (i, r) => i === "image" ? void 0 : r)
      );
    } catch {
    }
};
function Pt(t, e) {
  const i = t.shadowRoot || t.attachShadow({ mode: "open" }), r = ht(t);
  let s = e.projectToken(), n = e.projectId(), o = s && (je.get(s) || it(n)) || Re();
  s && je.set(s, o);
  let l, m = o.checks[0]?.id || "", g = "select", f = "", b = 0, k = !1, M = !1, E, N = !0, L = !1;
  const O = /* @__PURE__ */ new Set();
  let re, Y, K = 0;
  const R = () => o.checks.find((a) => a.id === m), u = (a) => i.querySelector("#" + a);
  i.innerHTML = `<style>${Nt}</style><main><header class="commandbar"><div class="brand"><img src="${qt}" alt=""><b>НашеПО</b><small>${gt}</small></div><div class="check-heading"><input id="name" aria-label="Имя проверки" placeholder="Выберите проверку"><small id="check-summary">Проверка не выбрана</small></div><div id="tabs" class="tabs">${[
    ["select", "Выбор"],
    ["results", "Результаты"],
    ["rules", "Правила"],
    ["report", "Отчёт"]
  ].map(([a, c]) => `<button data-tab="${a}">${c}</button>`).join(
    ""
  )}</div><div class="header-actions"><button id="scan" title="Перечитать список и геометрию выбранных моделей">↻ Модели</button><button id="run" class="primary">▶ Запустить</button><button id="cancel" hidden>Остановить</button><details class="more-menu"><summary title="Другие команды">⋮</summary><div class="more-popover"><button id="open">Открыть проверки</button><button id="save">Сохранить проверки</button><button id="copy">Копировать проверку</button><button id="delete">Удалить проверку</button><button id="settings">Настройки</button><button id="help">Справка</button></div></details></div><span id="dirty"></span></header><div id="run-progress" class="run-progress" hidden><span id="run-phase">Подготовка</span><div id="run-bar" class="run-bar" role="progressbar"><i id="run-fill"></i></div><span id="run-value"></span></div><div class="notice" id="notice" role="status">Откройте IFC/SMDX в проекте и нажмите «Модели».</div><div class="workspace"><aside><div class="aside-title">Проверки</div><input id="test-search" type="search" placeholder="Поиск проверок"><div id="checks"></div><div class="aside-actions"><button id="all">Запустить все</button><button id="new" class="primary">＋ Новая проверка</button></div></aside><section class="main"><div id="content"></div></section></div><footer><span id="model-count">Модели не прочитаны</span><span>Расчёт выполняется на вашем компьютере</span></footer><input id="file" type="file" accept=".json" hidden><dialog id="settings-dialog"><h2>Настройки</h2><label>Дистанция камеры, м<input id="distance" type="number" value="15" min="0.5"></label><p class="links"><a href="https://nashepo.ru/" target="_blank" rel="noopener noreferrer">Сайт НашеПО</a><a href="https://t.me/RoburFan" target="_blank" rel="noopener noreferrer">Telegram</a></p><button data-close="settings-dialog">Закрыть</button></dialog><dialog id="help-dialog">${mt}<button data-close="help-dialog">Закрыть</button></dialog><dialog id="set-dialog"><h2>Сохранить набор моделей</h2><label>Название<input id="set-name" maxlength="120"></label><div class="dialog-actions"><button id="set-cancel">Отмена</button><button id="set-confirm" class="primary">Сохранить</button></div></dialog></main>`;
  const D = document.createElement("button");
  D.id = "clear-project", D.textContent = "Очистить проект", u("save").after(D), i.querySelector(".more-popover").addEventListener(
    "click",
    () => i.querySelector(".more-menu").removeAttribute("open")
  );
  const z = (a, c = !1) => {
    u("notice").textContent = a, u("notice").classList.toggle("error", c);
  }, q = (a, c, d, p) => {
    const x = u("run-progress"), S = u("run-bar"), h = u("run-fill");
    if (x.hidden = !1, u("notice").hidden = !0, u("run-phase").textContent = a, d && d > 0 && c !== void 0) {
      const w = Math.max(0, Math.min(100, c / d * 100));
      h.style.width = `${w}%`, S.setAttribute("aria-valuemin", "0"), S.setAttribute("aria-valuemax", "100"), S.setAttribute("aria-valuenow", String(Math.round(w))), u("run-value").textContent = `${Math.round(w)}% · ${c}/${d}` + (p === void 0 ? "" : ` · найдено ${p}`);
    } else
      h.style.width = "0", S.removeAttribute("aria-valuenow"), u("run-value").textContent = p === void 0 ? "" : `Найдено ${p}`;
    S.setAttribute("aria-valuetext", u("run-value").textContent || a);
  }, y = () => {
    u("run-progress").hidden = !0, u("notice").hidden = !1;
  }, v = async (a) => {
    try {
      await a();
    } catch (c) {
      z(c instanceof Error ? c.message : String(c), !0);
    }
  }, C = () => new Promise((a) => {
    const c = u("set-dialog"), d = u("set-name");
    let p = !1;
    const x = (S) => {
      p || (p = !0, c.close(), a(S));
    };
    d.value = "Новый набор", u("set-confirm").onclick = () => {
      const S = d.value.trim();
      S ? x(S) : d.focus();
    }, u("set-cancel").onclick = () => x(), c.oncancel = (S) => {
      S.preventDefault(), x();
    }, c.showModal(), d.focus(), d.select();
  }), j = () => {
    L = !0, u("dirty").textContent = "Есть несохранённые изменения", s && je.set(s, o), nt(n, o);
  }, U = () => {
    const a = e.projectToken();
    return !a || a === s ? !1 : (!s && (o.checks.length || o.sets.length) ? je.set(a, o) : o = je.get(a) || it(e.projectId()) || Re(), je.set(a, o), s = a, n = e.projectId(), l = void 0, m = o.checks[0]?.id || "", f = "", O.clear(), b = 0, L = !1, e.clear(), u("dirty").textContent = "", !0);
  }, A = () => {
    const a = R();
    a?.lastRun && (a.status = "stale"), j(), Q();
  }, W = () => [
    ...new Set(
      (l?.elements || []).flatMap((a) => Object.keys(a.properties))
    )
  ].sort(), P = (a, c) => a.map(
    (d) => `<option value="${se(d)}" ${d === c ? "selected" : ""}>${se(d)}</option>`
  ).join("");
  function F() {
    const a = R(), c = u("result-search")?.value.toLowerCase() || "", d = u("result-state")?.value || "", p = Number(u("result-depth")?.value || 0);
    return (a?.results || []).filter(
      (x) => (!d || x.state === d) && (a?.type === "duplicates" || // A depth that is not a plain measurement is left to a person, so no
      // threshold hides it. Otherwise the same allowance as the calculation
      // itself, so one number typed in three places selects the same rows.
      x.depth !== void 0 && x.kind !== "touch" || (x.penetrationMm ?? 0) + (a?.precision ?? 0) >= p) && (!c || JSON.stringify({ ...x, image: void 0 }).toLowerCase().includes(c))
    );
  }
  function Q() {
    const a = u("test-search").value.toLowerCase();
    u("checks").innerHTML = o.checks.filter((c) => c.name.toLowerCase().includes(a)).map(
      (c) => `<button class="check-item ${c.id === m ? "active" : ""}" data-check="${c.id}"><strong>${se(c.name)}</strong><small>${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[c.status]} · ${c.results.filter((d) => !["resolved", "excluded"].includes(d.state)).length} в работе / ${c.results.length}</small></button>`
    ).join("");
  }
  function ie(a, c) {
    const d = l?.elements.filter(
      (I) => (R().includeHidden || !I.hidden) && ze(I, a)
    ).length || 0, p = a.manualOnly ? he(a) : a.modelsMode === "selected" ? a.models : (l?.models || []).map((I) => I.id), x = l && p.every((I) => l.indexedModelIds.includes(I)) ? `${d} элементов` : "число после запуска", S = l?.models || [], h = a.modelsMode !== "selected", w = o.sets.map(
      (I) => `<option value="${se(I.id)}" ${a.presetId === I.id ? "selected" : ""}>${se(I.name)}</option>`
    ).join("");
    return `<article class="selection" data-side="${c}"><h3>Выбор ${c.toUpperCase()} <span data-selection-count>${x}</span></h3>${a.manualOnly ? '<p class="selection-mode">Только элементы, выбранные вручную</p>' : ""}<div class="preset-row"><select class="preset"><option value="">Набор моделей…</option>${w}</select><button data-selection="load-set">Применить</button><button data-selection="save-set">Сохранить набор</button><button data-selection="delete-set" ${a.presetId ? "" : "disabled"}>Удалить</button></div><div class="model-list"><label class="model-all"><input type="checkbox" class="all-models" ${h ? "checked" : ""}> Все модели</label>${S.map((I) => `<label><input type="checkbox" class="model-check" value="${se(I.id)}" ${h || a.models.includes(I.id) ? "checked" : ""}> ${se(I.name)}</label>`).join("") || "<small>Нажмите «Модели».</small>"}</div><small>Отметьте файлы, которые должны участвовать в выборе ${c.toUpperCase()}.</small><div class="selection-tools"><button data-selection="show">Показать выбранные элементы</button><button data-selection="only">Только выделенные в 3D</button><button data-selection="include">＋ Добавить из 3D</button><button data-selection="exclude">− Исключить из 3D</button><button data-selection="reset">Сбросить ручной выбор</button></div><small>Добавлено вручную: ${a.include.length} · исключено: ${a.exclude.length}</small></article>`;
  }
  function T() {
    Q();
    const a = R();
    u("name").value = a?.name || "", u("check-summary").textContent = a ? `${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[a.status]} · ${a.results.filter((c) => !["resolved", "excluded"].includes(c.state)).length} в работе / ${a.results.length}` : "Проверка не выбрана";
    for (const c of ["name", "copy", "delete", "run"])
      u(c).disabled = !a || k;
    for (const c of i.querySelectorAll("[data-tab]"))
      c.classList.toggle("active", c.dataset.tab === g);
    if (!a) {
      u("content").innerHTML = '<div class="empty"><h2>Создайте первую проверку</h2><p>Обновите модели, затем выберите, какие элементы проверять друг с другом.</p></div>';
      return;
    }
    g === "select" && (u("content").innerHTML = `<div class="choose-layout"><div class="parameters"><h3>Параметры проверки</h3><label>Тип<select id="type"><option value="intersection" ${a.type === "intersection" ? "selected" : ""}>По пересечению</option><option value="duplicates" ${a.type === "duplicates" ? "selected" : ""}>Дублирование</option></select></label><label title="Числовая погрешность расчёта">Точность расчёта, мм<input id="precision" type="number" value="${a.precision}" min="0.001" max="100" step="0.1"></label><label title="Конфликты с меньшей оценкой глубины не попадут в результат">Минимальная глубина, мм<input id="min-penetration" type="number" value="${a.minPenetration}" min="0" max="100000" step="1" ${a.type === "duplicates" ? "disabled" : ""}></label><label class="check"><input id="touching" type="checkbox" ${a.touching ? "checked" : ""} ${a.type === "duplicates" ? "disabled" : ""}>Учитывать касания</label><small>Глубина Hard Clash — наименьшая толщина области перекрытия. Она не зависит от густоты сетки и от размеров элементов.</small><p class="legend"><span class="part-a">● Выбор А</span><span class="part-b">● Выбор Б</span></p></div><div class="selection-grid">${ie(a.a, "a")}${ie(a.b, "b")}</div></div><datalist id="property-fields">${P(W(), "")}</datalist>`), g === "rules" && (u("content").innerHTML = `<div class="rules"><h3>Исключение пар</h3><p>Элемент сам с собой не проверяется. Пара А/Б учитывается один раз.</p><label class="check"><input id="same-model" type="checkbox" ${a.ignoreSameModel ? "checked" : ""}>Не проверять элементы одной модели</label><label class="check"><input id="same-group" type="checkbox" ${a.ignoreSameGroup ? "checked" : ""}>Не проверять геометрию одного составного объекта</label><label>Не проверять пары с одинаковым значением свойства<input id="equal-property" list="property-fields" value="${se(a.equalProperty)}" placeholder="Без ограничения"></label><label class="check"><input id="hidden" type="checkbox" ${a.includeHidden ? "checked" : ""}>Включать скрытые элементы прочитанных моделей</label><p>Незагруженные подключённые файлы нужно открыть перед расчётом.</p><datalist id="property-fields">${P(W(), "")}</datalist></div>`), g === "results" && (u("content").innerHTML = `<div class="result-tools"><div class="result-filters"><input id="result-search" type="search" placeholder="Поиск по результатам"><select id="result-state"><option value="">Все состояния</option>${Object.entries(
      ve
    ).map(([c, d]) => `<option value="${c}">${d}</option>`).join("")}</select>${a.type === "intersection" ? '<input id="result-depth" type="number" min="0" step="1" placeholder="Глубина от, мм">' : ""}<button id="show-markers" role="switch" aria-checked="${N}">${N ? "● Знаки" : "○ Знаки"}</button><span id="result-count"></span></div><div class="bulk-tools"><select id="bulk-state" title="Состояние для выбранных строк">${Object.entries(
      ve
    ).map(([c, d]) => `<option value="${c}">${d}</option>`).join("")}</select><button id="bulk">Применить</button></div></div><div class="result-area"><div class="table-area"><div class="scroll" id="table"></div><div class="pager"><span id="selection-count"></span><button id="prev-page">←</button><span id="page"></span><button id="next-page">→</button></div></div><div class="detail" id="detail"></div></div>`, X(), ge()), g === "report" && (u("content").innerHTML = `<div class="report"><h3>${se(a.name)}</h3><p>Результатов: ${a.results.length}. Выбрано: ${O.size}. ${a.status === "stale" ? "Результаты устарели — рекомендуется повторный запуск." : ""}</p><label class="check"><input id="selected-only" type="checkbox" ${O.size ? "checked" : ""}>Только выбранные строки</label><label class="check"><input id="report-images" type="checkbox" checked>Добавить снимки (недостающие будут созданы автоматически)</label><button id="export-html" class="primary">Сформировать HTML-отчёт</button><button id="export-viewer">Сессия для плагина «Коллизии»</button><p>Правила и все результаты сохраняются кнопкой «Сохранить проверки» в верхней панели.</p></div>`), u("content").inert = k;
  }
  const ue = {
    unmeasurable: "не определена",
    tolerance: "в пределах точности",
    approximate: "неполный расчёт"
  }, pe = (a, c) => c === "duplicates" ? "—" : a.kind === "touch" ? "касание" : a.depth === "approximate" ? `≈ ${(a.penetrationMm ?? 0).toFixed(1)}` : a.depth ? ue[a.depth] : (a.penetrationMm ?? 0).toFixed(1), ce = (a) => a.kind === "touch" ? "Тела соприкасаются, общего объёма нет" : a.depth === "unmeasurable" ? "У элемента нет собственного объёма, замер глубины к нему неприменим" : a.depth === "tolerance" ? "Перекрытие тоньше заданной точности расчёта" : a.depth === "approximate" ? "Контакт разделён не полностью, значение может быть завышено" : "Наименьшая толщина области перекрытия двух элементов";
  function X() {
    const a = R(), c = F(), d = Math.max(1, Math.ceil(c.length / 50));
    b = Math.max(0, Math.min(b, d - 1));
    const p = c.slice(b * 50, b * 50 + 50);
    u("table").innerHTML = c.length ? `<table><thead><tr><th><input id="check-page" type="checkbox" aria-label="Выбрать страницу" ${p.every((x) => O.has(x.id)) ? "checked" : ""}></th>${["№", "Состояние", "Глубина, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "Комментарий"].map((x) => `<th>${x}</th>`).join("")}</tr></thead><tbody>${p.map((x, S) => `<tr data-result="${se(x.id)}" class="${x.id === f ? "active" : ""}"><td><input type="checkbox" class="row-check" aria-label="Выбрать конфликт" ${O.has(x.id) ? "checked" : ""}></td>${[b * 50 + S + 1, ve[x.state], pe(x, a.type), x.a.name, x.a.model, x.a.guid || "—", x.b.name, x.b.model, x.b.guid || "—", x.note].map((h) => `<td title="${se(h)}">${se(h)}</td>`).join("")}</tr>`).join("")}</tbody></table>` : '<div class="empty">Нет результатов. Запустите проверку или измените фильтры.</div>', u("page").textContent = `${b + 1} / ${d}`, u("result-count").textContent = `${c.length} результатов`, u("selection-count").textContent = `Выбрано: ${O.size}`, u("prev-page").disabled = b === 0, u("next-page").disabled = b === d - 1;
  }
  function ge() {
    const a = R(), c = F(), d = c.findIndex((x) => x.id === f), p = a?.results.find((x) => x.id === f);
    u("detail").innerHTML = p ? `<div class="detail-head"><div><small>КОЛЛИЗИЯ</small><h3>#${d + 1} ${se(p.a.name)} × ${se(p.b.name)}</h3></div><div class="detail-nav"><button id="previous" title="Предыдущая коллизия" ${d <= 0 ? "disabled" : ""}>‹</button><button id="next" title="Следующая коллизия" ${d < 0 || d >= c.length - 1 ? "disabled" : ""}>›</button></div></div><div class="clash-summary"><span>${a?.type === "duplicates" ? "Дублирование" : "Пересечение"}</span><span title="${se(ce(p))}">${a?.type === "duplicates" ? "Совпадение геометрии" : p.kind === "touch" ? "Касание" : p.depth ? ue[p.depth] : `Глубина ${(p.penetrationMm ?? 0).toFixed(1)} мм`}</span><span>${se(ve[p.state])}</span></div><p class="legend"><span class="part-a">● Элемент А</span><span class="part-b">● Элемент Б</span></p><div class="preview-slot">${p.image ? `<button id="open-image" class="preview"><img src="${se(p.image)}" alt="Снимок коллизии"><span>Открыть крупнее</span></button>` : '<div class="preview-empty"><span>◫</span><small>Снимок создастся после перехода в 3D</small></div>'}</div><div class="detail-actions"><button id="focus" class="primary">Перейти в 3D</button><button id="capture-image">▣ Снимок пары</button></div><div class="detail-scroll"><div class="coordinates">${p.point.map((x, S) => `<span>${["X", "Y", "Z"][S]} ${x.toFixed(3)}</span>`).join("")}</div><label>Состояние<select id="edit-state">${Object.entries(
      ve
    ).map(
      ([x, S]) => `<option value="${x}" ${p.state === x ? "selected" : ""}>${S}</option>`
    ).join(
      ""
    )}</select></label><label>Назначение<input id="assignee" value="${se(p.assignee)}"></label><label>Комментарий<textarea id="note" rows="2">${se(p.note)}</textarea></label>${[
      p.a,
      p.b
    ].map(
      (x, S) => `<details><summary>Элемент ${S ? "Б" : "А"} · свойства</summary><dl>${Object.entries(
        x.properties
      ).map(([h, w]) => `<dt>${se(h)}</dt><dd>${se(w)}</dd>`).join("")}</dl></details>`
    ).join("")}</div>` : '<div class="detail-empty"><span>◫</span><p>Выберите коллизию в таблице</p><small>Двойной щелчок сразу перенесёт камеру в 3D.</small></div>';
  }
  const he = (a) => {
    const c = new Set(
      !a.manualOnly && a.modelsMode === "selected" ? a.models : []
    );
    for (const d of a.include)
      try {
        c.add(String(JSON.parse(d)[0]));
      } catch {
        const p = l?.elements.find(
          (x) => x.id === d
        )?.modelId;
        p && c.add(p);
      }
    return [...c];
  }, ne = () => {
    const a = R();
    if (!(!a || g !== "select"))
      for (const c of i.querySelectorAll("[data-side]")) {
        const d = c.dataset.side, p = [...c.querySelectorAll(".model-check")];
        if (!p.length) continue;
        const x = p.filter((w) => w.checked).map((w) => w.value), S = x.length === p.length, h = a[d];
        h.modelsMode = S ? "all" : "selected", h.models = S ? [] : x, h.conditions = [], h.mode = "all";
      }
  }, ke = (a) => {
    if (!a?.length) return;
    const c = /* @__PURE__ */ new Set();
    for (const d of a)
      for (const p of [d.a, d.b]) {
        if (!p.manualOnly && p.modelsMode !== "selected") return;
        for (const x of he(p)) c.add(x);
      }
    return c;
  }, fe = (a) => {
    let c = a.trim().replace(/\\/g, "/").toLocaleLowerCase();
    try {
      c = decodeURIComponent(c);
    } catch {
    }
    c = c.replace(/[?#].*$/, "");
    const d = c.split("/").filter(Boolean).at(-1) || c;
    return /* @__PURE__ */ new Set([c, d]);
  }, be = (a) => {
    const c = new Set(a.map((w) => w.id)), d = a.map((w) => ({
      id: w.id,
      aliases: /* @__PURE__ */ new Set([
        ...fe(w.id),
        ...fe(w.name)
      ])
    })), p = (w) => {
      if (c.has(w)) return w;
      const I = fe(w), $ = d.filter(
        (B) => [...I].some((te) => B.aliases.has(te))
      );
      return $.length === 1 ? $[0].id : w;
    }, x = (w) => {
      try {
        const I = JSON.parse(w);
        if (!Array.isArray(I) || I.length < 2) return w;
        const $ = String(I[0]), B = p($);
        return B === $ ? w : JSON.stringify([B, ...I.slice(1)]);
      } catch {
        return w;
      }
    };
    let S = !1;
    const h = (w) => {
      const I = w.models.map(p), $ = w.include.map(x), B = w.exclude.map(x);
      (I.some((te, le) => te !== w.models[le]) || $.some((te, le) => te !== w.include[le]) || B.some((te, le) => te !== w.exclude[le])) && (w.models = [...new Set(I)], w.include = [...new Set($)], w.exclude = [...new Set(B)], S = !0);
    };
    for (const w of o.checks)
      h(w.a), h(w.b), w.modelsAtRun && (w.modelsAtRun = w.modelsAtRun.map(p));
    for (const w of o.sets) {
      const I = w.selection.models.map(p);
      I.some(($, B) => $ !== w.selection.models[B]) && (w.selection.models = [...new Set(I)], S = !0);
    }
    return S && j(), S;
  }, oe = () => {
    const a = R();
    if (a)
      for (const c of i.querySelectorAll("[data-side]")) {
        const d = c.dataset.side, p = l?.elements.filter(
          (w) => (a.includeHidden || !w.hidden) && ze(w, a[d])
        ).length || 0, x = a[d].manualOnly ? he(a[d]) : a[d].modelsMode === "selected" ? a[d].models : (l?.models || []).map((w) => w.id), S = !!l && x.every((w) => l.indexedModelIds.includes(w)), h = c.querySelector(
          "[data-selection-count]"
        );
        h && (h.textContent = S ? `${p} элементов` : "число после запуска");
      }
  };
  function V() {
    e.markers(
      F(),
      f,
      N,
      (a) => v(() => J(a, !0))
    );
  }
  function J(a, c = !1) {
    if (!k) {
      if (f = a, g === "results") {
        const d = F().findIndex((x) => x.id === a), p = d < 0 ? b : Math.floor(d / 50);
        p !== b && (b = p, X());
        for (const x of i.querySelectorAll("[data-result]"))
          x.classList.toggle("active", x.dataset.result === a);
        ge(), requestAnimationFrame(() => {
          [...i.querySelectorAll("[data-result]")].find(
            (S) => S.dataset.result === a
          )?.scrollIntoView({ block: "nearest", inline: "nearest" });
        });
      }
      if (V(), c) {
        const d = R()?.results.find((p) => p.id === a);
        d && (e.focus(d, Number(u("distance").value)), G(d));
      }
    }
  }
  function G(a) {
    clearTimeout(Y);
    const c = ++K, d = Number(u("distance").value);
    a.image && a.imageScope === "pair-ab" && a.imageDistance === d || !e.canLocate(a) || (Y = window.setTimeout(async () => {
      if (!(c !== K || k || f !== a.id))
        try {
          const p = await e.snapshot(
            a,
            d,
            () => c !== K || k || f !== a.id,
            !1,
            !1
          );
          if (c !== K || f !== a.id) return;
          a.image = p, a.imageScope = "pair-ab", a.imageDistance = d, j(), g === "results" && ge();
        } catch (p) {
          c === K && f === a.id && z(
            "Не удалось создать снимок выбранной коллизии: " + (p instanceof Error ? p.message : String(p)),
            !0
          );
        }
    }, 500));
  }
  async function _(a) {
    M = !1, ee(!0), q("Создание снимка пары");
    try {
      const c = Number(u("distance").value);
      a.image = await e.snapshot(a, c, () => M), a.imageScope = "pair-ab", a.imageDistance = c, j(), g === "results" && f === a.id && ge();
    } catch (c) {
      z(
        "Результаты сохранены. Снимок пары не создан: " + (c instanceof Error ? c.message : String(c)),
        !0
      );
    } finally {
      y(), ee(!1);
    }
  }
  async function Z(a, c = !1) {
    U(), q("Подготовка моделей");
    let d = c ? /* @__PURE__ */ new Set() : ke(a);
    if (!c && d?.size) {
      const p = await e.scan(
        (x) => q(x),
        () => M,
        /* @__PURE__ */ new Set()
      );
      l = p, be(p.models) && (d = ke(a));
    }
    l = await e.scan(
      (p) => {
        z(p), q(p);
      },
      () => M,
      d
    ), u("model-count").textContent = `Проиндексировано моделей: ${l.indexedModelIds.length} из ${l.models.length} · элементов: ${l.elements.length}`, T(), z(
      l.blockers.length ? l.blockers.join(" ") : l.warnings.length ? `Модели прочитаны с замечаниями. ${l.warnings.join(" ")}` : "Модели прочитаны. Настройте выборки и запустите проверку.",
      !!l.blockers.length
    );
  }
  const ee = (a) => {
    k = a, a && (clearTimeout(Y), K++);
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
      u(c).disabled = a;
    u("cancel").hidden = !a, u("content").inert = a, u("checks").inert = a;
  };
  async function xe(a) {
    const c = (p) => {
      const x = `${a.name} · ${p.phase}`;
      z(`${x} ${p.done}/${p.total} · найдено ${p.found}`), q(x, p.done, p.total, p.found);
    };
    let d;
    try {
      d = new zt();
    } catch {
      return At(
        l.elements,
        a,
        c,
        () => M,
        (p) => e.geometry(p, () => M)
      );
    }
    return E = d, new Promise((p, x) => {
      const S = () => {
        d.terminate(), E = void 0, re = void 0;
      };
      re = () => {
        S(), x(Error("Расчёт отменён. Предыдущие результаты сохранены."));
      }, d.onmessage = async (h) => {
        if (h.data.load) {
          try {
            const w = await e.geometry(
              h.data.load,
              () => M || E !== d
            );
            if (E !== d) return;
            const I = [
              w.vertices?.buffer,
              w.indices?.buffer
            ].filter(Boolean);
            d.postMessage(
              { request: h.data.request, geometry: w },
              I
            );
          } catch (w) {
            E === d && d.postMessage({
              request: h.data.request,
              error: w instanceof Error ? w.message : String(w)
            });
          }
          return;
        }
        h.data.progress ? c(h.data.progress) : (S(), h.data.error ? x(Error(h.data.error)) : p(h.data.results));
      }, d.onerror = (h) => {
        S(), x(
          Error(
            `Не удалось запустить расчёт в фоновом потоке: ${h.message || "ошибка загрузки"}`
          )
        );
      }, d.postMessage({
        elements: l.elements,
        streaming: typeof e.geometry == "function",
        check: structuredClone({ ...a, results: [], warnings: [] })
      });
    });
  }
  async function ye(a = !1) {
    if (k) return;
    U(), ne();
    const c = a ? [...o.checks] : [R()].filter(Boolean);
    if (!c.length) throw Error("Создайте проверку.");
    for (const d of c)
      for (const p of [d.a, d.b])
        p.conditions = [], p.mode = "all";
    M = !1, ee(!0), q("Подготовка моделей");
    try {
      if (await Z(c), ee(!0), l.blockers.length)
        throw Error(
          "Состав моделей прочитан не полностью. " + l.blockers.join(" ")
        );
      for (const p of c) {
        if (M) break;
        for (const w of [p.a, p.b]) {
          if (w.modelsMode === "selected" && w.models.some((I) => !l.models.some(($) => $.id === I)))
            throw Error(
              `${p.name}: одна из моделей выборки отсутствует. Исправьте выборку.`
            );
          if (w.include.some((I) => !l.elements.some(($) => $.id === I)))
            throw Error(
              `${p.name}: вручную добавленный элемент отсутствует в модели.`
            );
        }
        const x = xt(p);
        if (p.configAtRun === x && p.modelsAtRun?.some(
          (w) => !l.models.some((I) => I.id === w)
        ))
          throw Error(
            `${p.name}: состав моделей уменьшился. Подключите прежние модели или создайте копию проверки для нового состава. Прежние результаты сохранены.`
          );
        const S = await xe(p);
        if (M || !e.isCurrent())
          throw Error(
            "Проект изменился или расчёт отменён. Предыдущие результаты сохранены."
          );
        const h = (/* @__PURE__ */ new Date()).toISOString();
        p.results = wt(
          p.configAtRun === x ? p.results : [],
          S,
          h
        ), p.lastRun = h, p.fingerprint = l.fingerprint, p.configAtRun = x, p.modelsAtRun = [...l.indexedModelIds], p.status = "done", p.warnings = [...l.warnings], m = p.id, f = p.results[0]?.id || "", O.clear(), j();
      }
      g = "results", T(), V(), z(
        `Проверка завершена. ${R()?.results.length || 0} результатов. Сохраните проверки для продолжения работы.`
      );
      const d = R()?.results.find((p) => p.id === f);
      d && !M && await _(d);
    } finally {
      y(), ee(!1), T();
    }
  }
  function qe(a) {
    const c = a.closest("[data-side]")?.dataset.side;
    if (!c) return;
    const d = R()[c], p = a, x = a.closest("[data-side]");
    if (p.classList.contains("preset")) {
      d.presetId = p.value || void 0, x.querySelector(
        '[data-selection="delete-set"]'
      ).disabled = !d.presetId;
      return;
    }
    if (p.classList.contains("all-models")) {
      for (const S of x.querySelectorAll(
        ".model-check"
      ))
        S.checked = p.checked;
      d.modelsMode = p.checked ? "all" : "selected", d.models = [], d.manualOnly = !1, d.presetId = void 0;
    }
    if (p.classList.contains("model-check")) {
      const S = [
        ...x.querySelectorAll(".model-check")
      ], h = S.filter((I) => I.checked).map((I) => I.value), w = S.length > 0 && h.length === S.length;
      x.querySelector(".all-models").checked = w, d.modelsMode = w ? "all" : "selected", d.models = w ? [] : h, d.manualOnly = !1, d.presetId = void 0;
    }
    d.conditions = [], d.mode = "all", A(), oe();
  }
  u("new").onclick = () => {
    const a = bt();
    a.name = `Проверка ${o.checks.length + 1}`, o.checks.push(a), m = a.id, g = "select", f = "", O.clear(), j(), T();
  }, u("scan").onclick = () => v(async () => {
    ne(), M = !1, ee(!0), q("Чтение моделей");
    try {
      const a = R();
      await Z(a ? [a] : void 0, !a);
    } finally {
      y(), ee(!1), T();
    }
  }), u("run").onclick = () => v(() => ye()), u("all").onclick = () => v(() => ye(!0)), u("cancel").onclick = () => {
    M = !0, re?.();
  }, u("test-search").oninput = Q, u("checks").onclick = (a) => {
    const c = a.target.closest(
      "[data-check]"
    );
    c && !k && (e.clear(), m = c.dataset.check, f = "", O.clear(), b = 0, T());
  }, u("tabs").onclick = (a) => {
    const c = a.target.closest("[data-tab]");
    c && !k && (g = c.dataset.tab, T());
  }, u("name").onchange = () => {
    const a = R();
    a && (a.name = u("name").value.trim() || "Проверка", j(), Q());
  }, u("copy").onclick = () => {
    const a = R();
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
    }), o.checks.push(c), m = c.id, f = "", O.clear(), j(), T();
  }, u("delete").onclick = () => {
    R() && confirm(`Удалить проверку «${R().name}» и её результаты?`) && (o.checks = o.checks.filter((a) => a.id !== m), m = o.checks[0]?.id || "", O.clear(), e.clear(), j(), T());
  }, u("clear-project").onclick = () => {
    !o.checks.length && !o.sets.length || confirm(
      "Очистить проверки, наборы моделей и результаты текущего проекта?"
    ) && (o.checks = [], o.sets = [], l = void 0, m = "", f = "", O.clear(), e.clear(), j(), u("model-count").textContent = "Модели не прочитаны", T(), z("Данные проверок текущего проекта очищены."));
  }, u("save").onclick = () => {
    tt("НашеПО-проверки.json", JSON.stringify(o, null, 2)), L = !1, u("dirty").textContent = "Файл проверок сохранён";
  }, u("open").onclick = () => u("file").click(), u("file").onchange = () => v(async () => {
    const a = u("file").files?.[0];
    if (!a) return;
    const c = lt(await a.text());
    L && !confirm("Заменить текущие несохранённые проверки данными из файла?") || (o = c, s && je.set(s, o), nt(n, o), m = o.checks[0]?.id || "", f = "", O.clear(), e.clear(), L = !1, u("dirty").textContent = "Проверки открыты", T(), z("Проверки открыты. Обновите модели перед переходом к элементам."), u("file").value = "");
  });
  for (const a of ["settings", "help"])
    u(a).onclick = () => u(a + "-dialog").showModal();
  for (const a of i.querySelectorAll("[data-close]"))
    a.onclick = () => u(a.dataset.close).close();
  u("content").onchange = (a) => v(() => {
    const c = a.target, d = R();
    if (!d) return;
    if (c.closest("[data-side]")) {
      qe(c);
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
          throw c.value = String(d.precision), Error("Точность должна быть от 0,001 до 100 мм.");
        d.precision = x;
      }
      if (c.id === "min-penetration") {
        const x = Number(c.value);
        if (!Number.isFinite(x) || x < 0 || x > 1e5)
          throw c.value = String(d.minPenetration), Error(
            "Минимальная глубина должна быть от 0 до 100 000 мм."
          );
        d.minPenetration = x;
      }
      c.id === "type" && (d.type = c.value), c.id === "touching" && (d.touching = c.checked), c.id === "same-model" && (d.ignoreSameModel = c.checked), c.id === "same-group" && (d.ignoreSameGroup = c.checked), c.id === "hidden" && (d.includeHidden = c.checked), c.id === "equal-property" && (d.equalProperty = c.value), A(), T();
      return;
    }
    if (c.id === "result-state") {
      b = 0, X();
      return;
    }
    if (c.id === "check-page") {
      for (const x of F().slice(b * 50, b * 50 + 50))
        c.checked ? O.add(x.id) : O.delete(x.id);
      X();
      return;
    }
    if (c.classList.contains("row-check")) {
      const x = c.closest("[data-result]").dataset.result;
      c.checked ? O.add(x) : O.delete(x), u("selection-count").textContent = `Выбрано: ${O.size}`;
      return;
    }
    const p = d.results.find((x) => x.id === f);
    p && (c.id === "edit-state" && (p.state = c.value, X(), Q(), V()), c.id === "assignee" && (p.assignee = c.value), c.id === "note" && (p.note = c.value, X()), j());
  }), u("content").oninput = (a) => {
    const c = a.target;
    (c.id === "result-search" || c.id === "result-depth") && (b = 0, X());
    const d = R(), p = Number(c.value);
    d && c.id === "precision" && Number.isFinite(p) && p >= 1e-3 && p <= 100 && (d.precision = p, A()), d && c.id === "min-penetration" && Number.isFinite(p) && p >= 0 && p <= 1e5 && (d.minPenetration = p, A());
  }, u("content").onclick = (a) => v(async () => {
    const c = a.target, d = c.closest("button"), p = R();
    if (!p) return;
    if (d?.dataset.selection) {
      const S = d.closest("[data-side]").dataset.side, h = p[S], w = u("content").scrollTop;
      let I = !0;
      switch (d.dataset.selection) {
        case "load-set": {
          const $ = o.sets.find((B) => B.id === h.presetId);
          if (!$) throw Error("Выберите сохранённый набор моделей.");
          Object.assign(h, structuredClone($.selection), {
            conditions: [],
            mode: "all",
            include: [],
            exclude: [],
            manualOnly: !1,
            presetId: $.id
          });
          break;
        }
        case "save-set": {
          if (h.manualOnly)
            throw Error(
              "Ручную выборку элементов нельзя сохранить как набор моделей."
            );
          const $ = await C();
          if (!$) return;
          const B = {
            id: crypto.randomUUID(),
            name: $,
            selection: {
              models: [...h.models],
              modelsMode: h.modelsMode,
              conditions: [],
              mode: "all"
            }
          };
          o.sets.push(B), h.presetId = B.id, I = !1;
          break;
        }
        case "delete-set": {
          const $ = o.sets.find((B) => B.id === h.presetId);
          if (!$) throw Error("Выберите сохранённый набор моделей.");
          if (!confirm(`Удалить набор «${$.name}»?`)) return;
          o.sets = o.sets.filter((B) => B.id !== $.id);
          for (const B of o.checks)
            for (const te of [B.a, B.b])
              te.presetId === $.id && (te.presetId = void 0);
          I = !1;
          break;
        }
        case "show":
          e.select(
            (l?.elements || []).filter(($) => (p.includeHidden || !$.hidden) && ze($, h)).map(($) => $.id)
          );
          return;
        case "only": {
          const $ = e.selected();
          if (!$.length) throw Error("Выделите элементы в 3D-сцене.");
          h.include = $, h.exclude = [], h.manualOnly = !0;
          break;
        }
        case "include": {
          const $ = e.selected();
          if (!$.length) throw Error("Выделите элементы в 3D-сцене.");
          h.include = [.../* @__PURE__ */ new Set([...h.include, ...$])], h.exclude = h.exclude.filter((B) => !$.includes(B));
          break;
        }
        case "exclude": {
          const $ = e.selected();
          if (!$.length) throw Error("Выделите элементы в 3D-сцене.");
          h.exclude = [.../* @__PURE__ */ new Set([...h.exclude, ...$])], h.include = h.include.filter((B) => !$.includes(B));
          break;
        }
        case "reset":
          h.manualOnly = !1, h.include = [], h.exclude = [];
      }
      I ? A() : j(), T(), u("content").scrollTop = w;
      return;
    }
    if (d?.id === "prev-page" && (b--, X()), d?.id === "next-page" && (b++, X()), d?.id === "show-markers" && (N = !N, d.textContent = N ? "● Знаки включены" : "○ Знаки выключены", d.setAttribute("aria-checked", String(N)), V()), d?.id === "bulk") {
      const S = u("bulk-state").value;
      for (const h of p.results) O.has(h.id) && (h.state = S);
      j(), X(), ge(), Q(), V();
    }
    if (d?.id === "capture-image") {
      const S = p.results.find((h) => h.id === f);
      if (S) {
        M = !1, ee(!0), q("Создание снимка пары");
        try {
          S.image = await e.snapshot(
            S,
            Number(u("distance").value),
            () => M,
            !0
          ), S.imageScope = "pair-ab", S.imageDistance = void 0, j(), ge(), z("Снимок сохранён в результат.");
        } finally {
          y(), ee(!1);
        }
      }
      return;
    }
    if (d?.id === "open-image") {
      const S = p.results.find((h) => h.id === f);
      if (S?.image) {
        const h = document.createElement("dialog");
        h.className = "image-dialog", h.innerHTML = '<button>Закрыть</button><img alt="Снимок коллизии">', h.querySelector("img").src = S.image, h.querySelector("button").onclick = () => {
          h.close(), h.remove();
        }, i.append(h), h.showModal();
      }
      return;
    }
    if (d?.id === "focus" && J(f, !0), d?.id === "previous" || d?.id === "next") {
      const S = F(), h = S.findIndex((w) => w.id === f) + (d.id === "next" ? 1 : -1);
      S[h] && J(S[h].id, !0);
    }
    if (d?.id === "export-html" || d?.id === "export-viewer") {
      let S = 0;
      const h = u("selected-only").checked ? p.results.filter((I) => O.has(I.id)) : p.results;
      if (!h.length) throw Error("Нет результатов для отчёта.");
      if (u("report-images").checked) {
        const I = e.view, $ = I?.storeView(), B = Number(u("distance").value);
        M = !1, ee(!0), q("Подготовка снимков отчёта", 0, h.length);
        try {
          await e.captureWorkspace(async () => {
            let te = 0;
            for (const le of h) {
              if (M)
                throw Error(
                  "Подготовка отчёта отменена. Уже полученные снимки сохранены."
                );
              q(
                "Подготовка снимков отчёта",
                te,
                h.length
              ), z("Подготовка снимков: " + (te + 1) + " / " + h.length);
              const Fe = le.imageScope !== "pair-ab" || le.imageDistance !== void 0 && le.imageDistance !== B;
              if (!le.image || Fe) {
                if (le.state === "resolved" && !e.canLocate(le)) {
                  te++;
                  continue;
                }
                try {
                  le.image = await e.snapshot(le, B, () => M), le.imageScope = "pair-ab", le.imageDistance = B, j();
                } catch (ft) {
                  if (M || !e.isCurrent()) throw ft;
                  S++;
                }
              }
              te++, q("Подготовка снимков отчёта", te, h.length);
            }
          });
        } finally {
          if (I && e.isCurrent()) {
            const te = p.results.find((le) => le.id === f);
            if (te)
              try {
                e.focus(te, B, !1);
              } catch {
              }
            $ && I.restoreView($);
          }
          y(), ee(!1);
        }
      }
      const w = u("report-images").checked ? h.map(
        (I) => I.imageScope === "pair-ab" ? I : { ...I, image: void 0 }
      ) : h.map((I) => ({ ...I, image: void 0 }));
      tt(
        p.name + (d.id === "export-html" ? ".html" : ".collision360.json"),
        d.id === "export-html" ? $t(p, w) : Ot(p, w)
      ), z(
        "Отчёт подготовлен. Результатов: " + h.length + "; со снимками: " + w.filter((I) => I.image).length + "." + (S ? ` Не удалось создать снимков: ${S}; эти строки включены без изображения.` : ""),
        S > 0
      );
    }
    const x = c.closest("[data-result]");
    x && !c.closest("input") && !window.getSelection()?.toString() && J(x.dataset.result);
  }), u("content").ondblclick = (a) => {
    const c = a.target, d = c.closest("[data-result]");
    d && !c.closest("input") && v(() => J(d.dataset.result, !0));
  };
  const De = setInterval(() => {
    k || (U() ? (u("model-count").textContent = "Модели не прочитаны", z(
      o.checks.length ? "Открыт другой проект. Показаны его проверки; обновите модели." : "Открыт другой проект. Для него ещё нет проверок."
    ), k || T()) : l && !e.isCurrent() && (l = void 0, e.clear(), u("model-count").textContent = "3D-окно изменилось", z("Активное 3D-окно изменилось. Обновите модели."), k || T()));
  }, 1500);
  return T(), () => {
    r(), clearInterval(De), clearTimeout(Y), K++, M = !0, re?.(), E?.terminate(), e.clear();
  };
}
var Ve = /* @__PURE__ */ ((t) => (t.object = "object", t.drawing = "drawing", t.table = "table", t.record = "record", t.textStyle = "textstyle", t.textStyleTable = "textstyles", t.linetype = "linetype", t.linetypeTable = "linetypes", t.layer = "layer", t.layerTable = "layers", t.block = "block", t.blockTable = "blocks", t.layout = "layout", t.layoutTable = "layouts", t.type = "type", t.typeTable = "types", t.material = "material", t.materialTable = "materials", t.geometry = "geometry", t.geometryTable = "geometries", t.group = "group", t.groupTable = "groups", t.attachment = "attachment", t.attachmentTable = "attachments", t.entities = "entities", t.entity = "entity", t.line = "l", t.solid = "s", t.insert = "i", t.polyline = "p", t.circle = "c", t.arc = "a", t.polyline3d = "p3", t.proxy = "x", t.text = "t", t.mtext = "mt", t.wipeout = "w", t.model3d = "g", t.alignment = "al", t))(Ve || {});
const Je = () => new Promise((t) => requestAnimationFrame(() => t()));
function ut(t) {
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
async function Lt(t) {
  await Je(), t.repaint();
  const { candidates: e, rect: i } = ut(t), r = document.createElement("canvas");
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
    t.repaint(), await Je(), r.remove();
  };
}
async function Dt(t, e) {
  if (await Je(), e()) throw Error("Подготовка снимков отменена.");
  const { candidates: i } = ut(t), r = document.createElement("canvas"), s = Math.min(1, 1280 / i[0].width);
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
const Ue = "nashepo.checks.points", ot = "nashepo.checks.highlight";
function st(t) {
  let e = performance.now();
  return async () => {
    if (t()) throw Error("Операция отменена.");
    performance.now() - e >= 16 && (await new Promise((i) => setTimeout(i, 0)), e = performance.now());
  };
}
function Pe(t, e, i, r = 0) {
  if (r > 12 || t == null) return;
  if (typeof t != "object") {
    i[e] = String(t);
    return;
  }
  if (Array.isArray(t)) {
    t.forEach((n, o) => Pe(n, `${e}[${o}]`, i, r + 1));
    return;
  }
  const s = t;
  if ("$value" in s) {
    Pe(s.$value, e, i, r + 1);
    return;
  }
  for (const [n, o] of Object.entries(s))
    n.startsWith("$") || Pe(o, e ? `${e}.${n}` : n, i, r + 1);
}
function Ft(t) {
  const e = t.vertices.length / 3, i = (o) => Number.isFinite(t.vertices[o * 3]) && Number.isFinite(t.vertices[o * 3 + 1]) && Number.isFinite(t.vertices[o * 3 + 2]), r = (o) => {
    const l = t.indices[o], m = t.indices[o + 1], g = t.indices[o + 2];
    return l < e && m < e && g < e && l !== m && m !== g && g !== l && i(l) && i(m) && i(g);
  };
  let s = 0;
  for (let o = 0; o < t.indices.length; o += 3) r(o) && (s += 3);
  if (s === t.indices.length) return t.indices;
  const n = new Uint32Array(s);
  for (let o = 0, l = 0; o < t.indices.length; o += 3)
    r(o) && (n[l++] = t.indices[o], n[l++] = t.indices[o + 1], n[l++] = t.indices[o + 2]);
  return n;
}
const Be = (t) => /\.wdx(?:[?#].*)?$/i.test(t);
class Rt {
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
    const l = [], m = /* @__PURE__ */ new Set(), g = [], f = [], b = [], k = /* @__PURE__ */ new Map(), M = /* @__PURE__ */ new Set();
    let E = 2166136261;
    const N = st(
      () => i() || s !== this.app || n !== this.view
    );
    let L = -1 / 0;
    const O = (Y) => {
      for (let K = 0; K < Y.length; K++)
        E = Math.imul(E ^ Y.charCodeAt(K), 16777619);
    }, re = async (Y, K, R) => {
      if (M.has(Y)) return;
      M.add(Y);
      const u = Y.layers.layer0?.modelName || K, D = K, z = Be(u) || Be(D), q = (A, W) => {
        m.has(A) || (m.add(A), l.push({ id: A, name: W }));
      };
      z || q(D, u);
      const y = !z && (!r || r.has(D)), v = [];
      (y || z) && Y.layouts.model?.walk((A) => (A.type === Ve.model3d ? v.push(A) : A.type === Ve.insert && g.push(`${u}: вставка блока не включена в расчёт.`), !1));
      const C = /* @__PURE__ */ new Map();
      for (const A of v) {
        let W = A.layer, P = "";
        for (; W; ) {
          if (W.modelName && !Be(W.modelName)) {
            P = W.modelName;
            break;
          }
          W = W.layer;
        }
        const F = z ? P || "Модель проекта" : u, Q = z ? P || `${K}/#model` : D;
        if (z && q(Q, F), r && !r.has(Q)) continue;
        const ie = JSON.stringify([
          A.layer?.UUID || "",
          A.$id || A.$path
        ]);
        C.set(JSON.stringify([Q, ie]), {
          key: ie,
          objects: [A],
          modelId: Q,
          modelName: F
        });
      }
      let j = 0;
      for (const A of C.values()) {
        const { key: W, objects: P, modelId: F, modelName: Q } = A;
        if (i()) throw Error("Чтение моделей отменено.");
        if (s !== this.app || n !== this.view)
          throw Error(
            "Активный проект изменился. Запустите чтение моделей заново."
          );
        const ie = P[0].layer, T = {};
        try {
          if (ie) {
            const fe = [];
            let be = ie;
            for (; be && fe.length < 64; )
              fe.unshift(be), be = be.layer;
            for (const oe of fe)
              Pe(oe.typedProperties(), "", T), oe.typed?.name && (T.Тип = oe.typed.name);
          }
        } catch {
          g.push(`${Q} / ${W}: часть свойств недоступна.`);
        }
        const ue = T["ifc.id"] || Object.entries(T).find(
          ([fe]) => /(^|\.)(globalid|ifcguid|guid)$/i.test(fe)
        )?.[1] || "", pe = ie?.name || P[0].$id || "Элемент", ce = JSON.stringify([F, W]);
        Object.assign(T, {
          Модель: Q,
          Имя: pe,
          GUID: ue,
          Объект: ie?.UUID || W
        });
        const X = {
          min: [1 / 0, 1 / 0, 1 / 0],
          max: [-1 / 0, -1 / 0, -1 / 0]
        };
        let ge = !0, he = !1, ne = 0;
        for (const fe of P) {
          ge &&= fe.isClosed;
          for (const be of Object.values(fe.meshes)) {
            const oe = be.geometry;
            if (!oe || oe.indices.length % 3) {
              he = !0;
              continue;
            }
            ge &&= be.isClosed;
            for (let G = 0; G < oe.vertices.length; G += 3) {
              const _ = [
                oe.vertices[G],
                oe.vertices[G + 1],
                oe.vertices[G + 2]
              ];
              if (Math3d.mat4.mulv3(_, fe.matrix, _), !_.every(Number.isFinite)) {
                he = !0;
                continue;
              }
              for (let Z = 0; Z < 3; Z++)
                X.min[Z] = Math.min(X.min[Z], _[Z]), X.max[Z] = Math.max(X.max[Z], _[Z]);
              if (O(_.join(",")), G % 6e4 === 0 && (performance.now() - L > 200 && (L = performance.now(), e(
                "Индексирование: " + Q + " · " + b.length + " элементов"
              )), await N(), i()))
                throw Error("Чтение моделей отменено.");
            }
            const V = oe.vertices.length / 3, J = (G) => Number.isFinite(oe.vertices[G * 3]) && Number.isFinite(oe.vertices[G * 3 + 1]) && Number.isFinite(oe.vertices[G * 3 + 2]);
            for (let G = 0; G < oe.indices.length; G += 3) {
              const _ = oe.indices[G], Z = oe.indices[G + 1], ee = oe.indices[G + 2];
              if (E = Math.imul(E ^ _, 16777619), E = Math.imul(E ^ Z, 16777619), E = Math.imul(E ^ ee, 16777619), _ < V && Z < V && ee < V && _ !== Z && Z !== ee && ee !== _ && J(_) && J(Z) && J(ee) ? ne++ : he = !0, G % 15e4 === 0 && (await N(), i()))
                throw Error("Чтение моделей отменено.");
            }
          }
        }
        if (he || !ne) {
          if (ne || j++, !ne) continue;
          ge = !1;
        }
        const ke = {
          id: ce,
          name: pe,
          model: Q,
          modelId: F,
          guid: ue,
          properties: T,
          hidden: R || !!ie?.resolveHidden() || !!ie?.resolveDisabled(),
          triangles: new Float64Array(0),
          triangleCount: ne,
          closed: ge,
          bounds: X
        };
        O(JSON.stringify([ce, T, ke.hidden])), b.push(ke), k.set(ce, P);
      }
      j && g.push(
        `${u}: пропущено элементов без треугольной геометрии — ${j}.`
      );
      const U = [];
      Y.attachments.forEach((A) => {
        U.push(A);
      });
      for (const A of U) {
        const W = A.name || A.uri || A.$id, P = W || "Подключённая модель", F = `${K}/${W || "attachment"}`;
        A.model || q(F, P), A.model ? await re(
          A.model,
          F,
          R || A.hidden
        ) : (!r || r.has(F)) && f.push(
          `${P}: модель не загружена. Откройте её перед расчётом.`
        );
      }
    };
    if (await re(o, o.layers.layer0?.modelName || "Проект", !1), !b.length && (!r || r.size > 0)) {
      const Y = r ? [...r].filter((K) => !m.has(K)) : [];
      throw Error(
        Y.length ? `Сохранённая выборка ссылается на модели, которых нет в текущем составе: ${Y.join(", ")}. Обновите список моделей.` : l.length ? "В выбранных моделях не найдены 3D-элементы с доступной геометрией. Проверьте, что модели загружены, и выберите нужные файлы." : "В открытом проекте не обнаружены IFC/SMDX-модели. Проверьте состав подключений проекта."
      );
    }
    return this.clear(), this.refs = k, this.metadata = new Map(b.map((Y) => [Y.id, Y])), this.scannedApp = s, this.scannedView = n, {
      elements: b,
      fingerprint: `${b.length}:${E >>> 0}`,
      warnings: [...new Set(g)],
      blockers: [...new Set(f)],
      models: l,
      indexedModelIds: l.filter((Y) => !r || r.has(Y.id)).map((Y) => Y.id)
    };
  }
  async geometry(e, i) {
    const r = st(() => i() || !this.isCurrent());
    if (!this.isCurrent()) throw Error("Активная модель изменилась.");
    const s = this.metadata.get(e), n = this.refs.get(e);
    if (!s || !n) throw Error("Элемент отсутствует.");
    const o = n.flatMap(
      (M) => Object.values(M.meshes).flatMap((E) => {
        const N = E.geometry;
        if (!N || N.indices.length % 3) return [];
        const L = Ft(N);
        return L.length ? [{ object: M, g: N, indices: L }] : [];
      })
    );
    let l = 0, m = 0;
    for (const { g: M, indices: E } of o) {
      if (!M) throw Error("Геометрия недоступна.");
      l += M.vertices.length, m += E.length;
    }
    const g = new Float64Array(l), f = new Uint32Array(m);
    let b = 0, k = 0;
    for (const { object: M, g: E, indices: N } of o) {
      if (!E) throw Error("Геометрия недоступна.");
      for (let L = 0; L < E.vertices.length; L += 3) {
        const O = [E.vertices[L], E.vertices[L + 1], E.vertices[L + 2]];
        if (Math3d.mat4.mulv3(O, M.matrix, O), g.set(O, b + L), L % 6e4 === 0 && (await r(), i() || !this.isCurrent()))
          throw Error("Чтение геометрии отменено.");
      }
      for (let L = 0; L < N.length; L++)
        if (f[k + L] = b / 3 + N[L], L % 15e4 === 0 && (await r(), i()))
          throw Error("Чтение геометрии отменено.");
      b += E.vertices.length, k += N.length;
    }
    return { ...s, vertices: g, indices: f };
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
      const e = this.pointView.annotations.get(Ue);
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
    o.forEach((m, g) => o[g] = m / l), n.lookAt(
      s.map((m, g) => m - o[g] * i),
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
        (g) => Object.values(g.meshes).flatMap((f) => {
          const b = f.geometry;
          if (!b) return [];
          const k = {
            // SDK fields may be prototype getters rather than own properties.
            uuid: `${ot}.${m}.${b.uuid}`,
            vertices: b.vertices,
            indices: b.indices,
            normals: b.normals,
            bounds: b.bounds,
            colors: new Uint32Array(b.vertices.length / 3).fill(l)
          };
          return [{ obj: g, geometry: k, color: l }];
        })
      )
    ), this.overlay) {
      this.overlay.layer.visible = !0, i.invalidate(!0);
      return;
    }
    let s;
    s = {
      id: ot,
      order: 1e4,
      visible: !0,
      paint: () => {
      },
      paint3d: (o) => {
        const l = o.color, m = o.rasterizer.material;
        o.rasterizer.material = void 0;
        try {
          for (const { obj: g, geometry: f, color: b } of this.overlaySurfaces) {
            o.color = b, o.pushMatrix();
            try {
              o.multMatrix(g.matrix), o.mesh(f);
            } finally {
              o.popMatrix();
            }
          }
        } catch (g) {
          s.visible = !1, this.overlayError = new Error(
            "Не удалось отрисовать подсветку пары: " + (g instanceof Error ? g.message : String(g))
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
    const l = o.visible, m = n.annotations.visible, g = new Set(n.layer.selectedObjects());
    let f;
    try {
      s ? this.highlight(e) : this.focus(e, i, !1), n.pauseAnimation(), f = await Lt(n), n.layer.clearSelected(), o.visible = !1, n.annotations.visible = !1, n.invalidate();
      const b = await Dt(
        n,
        () => r() || !this.isCurrent()
      );
      if (this.overlayError) throw this.overlayError;
      return b;
    } finally {
      o.visible = l, n.annotations.visible = m, n.layer.clearSelected(), n.layer.selectObjects((b) => g.has(b), !0), n.invalidate(), await f?.();
    }
  }
  markers(e, i, r, s) {
    if (!this.isCurrent()) return;
    const n = this.view;
    this.pointView && this.pointView !== n && this.clear();
    const o = n.annotations.get(Ue);
    if (o && n.annotations.release(o), this.pointView = n, !r) {
      n.invalidate();
      return;
    }
    const l = n.annotations.create(Ue, 1e4), m = e.filter((g) => g.id !== i).concat(e.filter((g) => g.id === i));
    for (const g of m.slice(-3e3)) {
      if (g.state === "resolved") continue;
      const [f, b, k] = g.point, M = g.id === i, E = g.state === "excluded" ? "#78818c" : g.state === "approved" || g.state === "reviewed" ? "#28b94b" : "#e1372d", N = M ? "#f2c94c" : E, L = () => s(g.id), O = [
        { type: "line", a: [f, b, k], b: [f, b, k + 1], color: N, width: 5 },
        {
          type: "polyline",
          points: [
            [f - 0.65, b, k + 1],
            [f + 0.65, b, k + 1],
            [f, b, k + 2.2],
            [f - 0.65, b, k + 1]
          ],
          color: N,
          fillColor: E,
          width: M ? 5 : 2
        },
        {
          type: "line",
          a: [f, b - 0.01, k + 1.85],
          b: [f, b - 0.01, k + 1.4],
          color: "#ffffff",
          width: 4
        },
        {
          type: "line",
          a: [f, b - 0.01, k + 1.22],
          b: [f, b - 0.01, k + 1.27],
          color: "#ffffff",
          width: 4
        }
      ];
      l.add({
        id: g.id,
        type: "shaped",
        shapes: O,
        activeShapes: O,
        activateCommand: L,
        dblCommand: L
      }), M && l.add({
        id: g.id + ":label",
        type: "simple",
        position: [f, b, k + 2.35],
        label: `${g.a.name} × ${g.b.name}`,
        labelBackground: "#f2c94c",
        labelColor: "#171717",
        activateCommand: L
      });
    }
    n.invalidate();
  }
}
let at, Ye, rt;
const Ut = {
  open(t) {
    t.manager.revealView("nashepo.collisionfinder360/checks_panel");
  },
  mount(t) {
    const e = t.el;
    if (!e) return;
    if (Ye && rt === t.manager) {
      e.replaceChildren(Ye);
      return;
    }
    at?.();
    const i = document.createElement("div");
    i.style.height = "100%", e.replaceChildren(i), Ye = i, rt = t.manager, at = Pt(i, new Rt(t));
  }
};
export {
  Ut as default
};
