const ct = `<h2>Работа с проверками</h2>
<details open><summary>1. Первая проверка</summary><ol><li>Откройте проект и подключите IFC/SMDX штатными средствами Топоматик 360.</li><li>Откройте нижнюю вкладку «Проверки» и нажмите «Модели».</li><li>Нажмите «＋ Новая проверка» и задайте ей понятное имя.</li><li>Во вкладке «Выбор» оставьте галочки только у нужных файлов в А и Б. «Все модели» включено по умолчанию.</li><li>Выберите «По пересечению» или «Дублирование» и нажмите «Запустить».</li><li>Во вкладке «Результаты» дважды нажмите строку: камера направится к конфликту, элемент А будет выделен красным, элемент Б — синим, и оба элемента станут выделенными в 3D-окне.</li></ol><p>Первое обновление без созданной проверки получает только список файлов. При запуске индексируются модели, отмеченные хотя бы в одной стороне. Файл проекта WDX служит контейнером и в выбор моделей не попадает.</p></details>
<details><summary>2. Выбор моделей и сохранённые наборы</summary><p>Выбор А и выбор Б задают две стороны сравнения. Снимите «Все модели» и отметьте конкретные IFC/SMDX. Для поиска дубликатов внутри одного файла отметьте его с обеих сторон.</p><p>Часто используемый состав можно сохранить как набор моделей, а затем применить в другой проверке. Наборы входят в файл проверок. Состав выборки задаётся галочками моделей и ручным выделением объектов.</p><p>IFC GUID читается из свойства <code>ifc.id</code>; также поддерживаются GlobalId, IfcGuid и GUID.</p></details>
<details><summary>3. Работа с выделением в 3D</summary><p>Сначала выделите элементы штатными средствами в 3D-окне, затем используйте кнопку в нужной стороне:</p><ul><li><b>Показать выбранные элементы</b> — выделяет весь текущий состав.</li><li><b>Только выделенные в 3D</b> — оставляет только выделенные объекты.</li><li><b>＋ Добавить из 3D</b> — добавляет выделенные объекты к моделям.</li><li><b>− Исключить из 3D</b> — исключает выделенные объекты.</li><li><b>Сбросить ручной выбор</b> — снова использует отмеченные модели.</li></ul><p>Ручные идентификаторы могут измениться после замены IFC/SMDX, поэтому такую выборку следует проверить заново.</p></details>
<details><summary>4. Пересечения, глубина, касания и дубликаты</summary><p><b>Пересечение</b> рассчитывается по фактическим треугольным поверхностям. Габаритные коробки отбирают близкие пары, а общий габарит пары дополнительно ограничивает область, внутри которой берётся замер глубины.</p><p><b>Расчётная глубина Hard Clash</b> — это толщина самого сильного из отдельных перекрытий пары. Направления для замера берутся от граней, сошедшихся в контакте, плюс три оси координат. Вдоль каждого направления оба тела дают тень; общая часть двух теней показывает, насколько одно тело зашло в другое в этом направлении. Глубиной становится наименьшее значение по всем направлениям. Проецируется только та геометрия, что попала в общий габарит пары, и проекции обрезаются по его границам.</p><p>Направления замера плагин берёт прежде всего у самого контакта: пятно касания лежит в своей плоскости, и нормаль этой плоскости показывает, куда тела давят друг на друга. Такие направления поворачиваются вместе с парой и не зависят от того, на сколько треугольников разбита грань. Нормали граней это направление только уточняют.</p><p>Если пара соприкасается сразу в нескольких местах, они разбираются по отдельности, а в результат идёт самое глубокое. Пустота между двумя контактами не превращается в глубину: разрез принимается только там, где промежуток лежит вне хотя бы одного тела, причём точка на грани пустотой не считается. Труба сквозь две стенки одного элемента даёт толщину стенки, а не расстояние между ними.</p><p>Поэтому значение не зависит ни от густоты сетки, ни от размеров элементов: труба одного диаметра даёт одну и ту же глубину и на грубой, и на подробной модели, а длина стержня, проходящего сквозь плиту, на результат не влияет. Далеко отнесённая часть составного объекта тоже не завышает глубину.</p><p>Это именно перекрытие тел, а не длина перемещения, которое их разведёт: чтобы вынуть стержень из плиты, его надо вытянуть на всю длину, и к тяжести конфликта это отношения не имеет. Объём пересечения вместо глубины не используется: одинаковый объём может означать совсем разные конфликты.</p><p>Одна пара элементов формирует один результат. Точкой коллизии становится контакт, ближайший к середине области перекрытия. Несколько несвязанных областей одной пары отдельно не группируются.</p><p>Если элемент ничего не заключает внутри себя — лист, отдельная грань, незамкнутая оболочка — объёмный замер к нему неприменим. Оболочку, которую не удалось замкнуть, плагин к телам не относит: сумма её треугольников может дать какой-то объём, но значить он не будет ничего. Отдельно считается объём, который ограничивает сетка, в сравнении с площадью поверхности, поэтому наклонный лист распознаётся так же, как лежащий по осям. Такой конфликт остаётся в результате со значением «не определена», и порог минимальной глубины его не отсекает: решение принимает человек.</p><p>Разделение на отдельные перекрытия — обоснованная оценка, а не построение общей области двух тел. За проход разбирается один самый крупный промежуток в зоне, всего до восьми зон на пару, поэтому очень сложное взаимное расположение может остаться неразделённым и дать завышенное число. На очень крупных контактах набор направлений прореживается ради скорости, и оценка тоже становится грубее в большую сторону. Направления, дающие результат мельче заданной точности расчёта, в ответ не идут.</p><p>«Точность расчёта» — геометрическая погрешность, а «Минимальная глубина» — пользовательский допуск для исключения небольших конфликтов. Порог применяется с запасом на точность: при минимуме 20 мм и точности 0,1 мм конфликт глубиной 19,95 мм ещё останется. Одинаково в расчёте, в таблице результатов и в HTML-отчёте, поэтому одно и то же число всюду отбирает одни и те же строки. Нулевую глубину получают только касания двух объёмных тел, и лишь когда включён их учёт. Труба и отвод могут пересекаться в штатном соединении из-за фасеточной аппроксимации круглых поверхностей; такие соединения исключаются правилами. <b>Дублирование</b> ищет совпадающие треугольники в одинаковых мировых координатах.</p></details>
<details><summary>5. Составные объекты и неполная геометрия</summary><p>Один IFC-объект может состоять из нескольких частей. Чтобы не сравнивать его части между собой, включите «Не проверять геометрию одного составного объекта» во вкладке «Правила». Там же можно исключить пары одной модели или одинакового значения свойства.</p><p>Пустые и неполные геометрические части пропускаются, а пригодные части модели продолжают участвовать. Плагин показывает сводное замечание с количеством пропущенных элементов. Незагруженный подключённый файл блокирует расчёт только тогда, когда он входит в выборку.</p></details>
<details><summary>6. Результаты и состояния</summary><p>«Новый» найден впервые, «Активный» найден повторно, «Проверенный» рассмотрен, «Подтверждённый» подтверждён, «Исключённый» исключён из работы. «Исправленный» означает, что пара исчезла при повторном расчёте с теми же правилами; состояние можно изменить вручную.</p><p>В таблице доступны IFC GUID, расчётная глубина, назначение и комментарий. Фильтр «Глубина от» пропускает строки со значением «не определена», чтобы неизмеримый конфликт не исчез молча. Галочки меняют состояние сразу у нескольких строк. Значения можно выделять и копировать. При переходе стрелками активная строка автоматически прокручивается в видимую область. Состояние «Устарела» у проверки означает, что после последнего расчёта изменили её тип, выборки, параметры или правила.</p></details>
<details><summary>7. Отчёт и снимки</summary><p>После перехода к коллизии отсутствующий снимок создаётся автоматически, если пользователь задержался на результате. Кадр строится от той же камеры приближения, что и снимки отчёта: ракурс задаёт «Дистанция камеры» в настройках. Если дистанцию изменить, отчёт переснимет прежние кадры под новое значение. Быстрое переключение стрелками отменяет лишние снимки. Во время технической перерисовки поверх 3D-окна сохраняется предыдущий кадр, поэтому модель не должна мигать.</p><p>Кнопка «Снимок пары» сохраняет текущий ракурс только с двумя элементами коллизии: элемент А показан красным, элемент Б — синим. Такой кадр собран вручную, поэтому отчёт его не переснимает. На время подготовки отчёта нижняя панель автоматически уменьшается для широкого 3D-кадра и затем возвращается к прежнему размеру. Файл сессии предназначен для открытия результатов в плагине «НашеПО · Коллизии».</p></details>
<details><summary>8. Проекты, сохранение и очистка</summary><p>В пределах открытой страницы каждый проект получает собственный список проверок. Сворачивание или повторное открытие нижней панели сохраняет проверки, результаты и комментарии в текущей вкладке. При переключении проекта данные предыдущего не подмешиваются. «Очистить проект» удаляет проверки, результаты и наборы только у текущего проекта.</p><p>«Сохранить проверки» записывает правила, наборы моделей, результаты, комментарии и снимки в JSON. «Открыть проверки» загружает этот файл. Геометрия в файл не входит: соответствующие модели надо открыть отдельно. После обновления или закрытия страницы для продолжения работы используйте сохранённый файл.</p></details>
<details><summary>9. Большие проекты</summary><p>Жёсткого предела в 6 млн треугольников нет. При запуске строится индекс только по отмеченным моделям. Точная геометрия передаётся в расчёт по мере появления близких пар в компактном индексированном виде.</p><p>Время и память всё равно зависят от состава выборок и числа потенциальных пар. Разделяйте проверки по моделям и системам. В сцене одновременно показывается до 3000 знаков; при 50 000 результатах расчёт останавливается без замены прежнего результата.</p></details>`;
function pt(t) {
  let e = t.parentElement, i;
  for (; e && !i; )
    i = [...e.children].find(
      (f) => f.classList.contains("resizer-horizontal")
    ), e = e.parentElement;
  if (!i) return () => {
  };
  const a = i, s = t.ownerDocument.defaultView;
  let n;
  const o = () => {
    if (n === void 0) return;
    const f = n;
    n = void 0, a.dispatchEvent(
      new MouseEvent("mouseup", { bubbles: !0, composed: !0 })
    ), a.hasPointerCapture(f) && a.releasePointerCapture(f);
  }, d = (f) => {
    f.button === 0 && (n = f.pointerId, a.setPointerCapture(f.pointerId));
  };
  return a.addEventListener("pointerdown", d), a.addEventListener("pointerup", o), a.addEventListener("pointercancel", o), a.addEventListener("lostpointercapture", o), s.addEventListener("blur", o), () => {
    o(), a.removeEventListener("pointerdown", d), a.removeEventListener("pointerup", o), a.removeEventListener("pointercancel", o), a.removeEventListener("lostpointercapture", o), s.removeEventListener("blur", o);
  };
}
const ut = "0.6.0", Pe = (t) => typeof t == "string" && /^data:image\/(jpeg|png);base64,[A-Za-z0-9+/=]+$/.test(t), we = {
  new: "Новый",
  active: "Активный",
  reviewed: "Проверенный",
  approved: "Подтверждённый",
  resolved: "Исправленный",
  excluded: "Исключённый"
}, Qe = () => ({
  models: [],
  modelsMode: "all",
  conditions: [],
  mode: "all",
  include: [],
  exclude: []
}), mt = () => ({
  id: crypto.randomUUID(),
  name: "Новая проверка",
  type: "intersection",
  a: Qe(),
  b: Qe(),
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
}), Te = ({
  triangles: t,
  vertices: e,
  indices: i,
  triangleCount: a,
  closed: s,
  bounds: n,
  ...o
}) => o;
function Ce(t, e) {
  return e.exclude.includes(t.id) ? !1 : e.include.includes(t.id) ? !0 : !(e.manualOnly || e.modelsMode === "selected" && !e.models.includes(t.modelId) || e.modelsMode === void 0 && e.models.length && !e.models.includes(t.modelId));
}
const ft = (t) => JSON.stringify([
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
]), ht = (t, e) => JSON.stringify([t, e].sort());
function gt(t, e, i) {
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
function it(t) {
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
      if (n?.image !== void 0 && !Pe(n.image))
        throw Error("Некорректный снимок результата.");
      if (n?.imageScope !== void 0 && n.imageScope !== "pair" && n.imageScope !== "pair-ab")
        throw Error("Некорректный состав снимка результата.");
      if (n?.imageDistance !== void 0 && (!Number.isFinite(n.imageDistance) || n.imageDistance < 0.5))
        throw Error("Некорректная дистанция снимка результата.");
      if (n?.unmeasured !== void 0 && typeof n.unmeasured != "boolean")
        throw Error("Некорректный признак измеримости результата.");
      if (!n || typeof n.id != "string" || !Object.hasOwn(we, n.state) || n.penetrationMm !== void 0 && (!Number.isFinite(n.penetrationMm) || n.penetrationMm < 0) || !Array.isArray(n.point) || n.point.length !== 3 || !n.point.every(Number.isFinite))
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
const J = (t, e) => [t[0] - e[0], t[1] - e[1], t[2] - e[2]], Oe = (t, e, i = 1) => [
  t[0] + e[0] * i,
  t[1] + e[1] * i,
  t[2] + e[2] * i
], ce = (t, e) => t[0] * e[0] + t[1] * e[1] + t[2] * e[2], Me = (t, e) => [
  t[1] * e[2] - t[2] * e[1],
  t[2] * e[0] - t[0] * e[2],
  t[0] * e[1] - t[1] * e[0]
], le = (t) => Math.hypot(...t), nt = (t) => {
  const e = le(t);
  return e > 1e-20 ? [t[0] / e, t[1] / e, t[2] / e] : void 0;
}, Ee = (t) => t.triangleCount ?? (t.indices ? t.indices.length / 3 : t.triangles.length / 9), me = (t, e, i) => t.indices && t.vertices ? t.vertices[t.indices[e * 3 + Math.floor(i / 3)] * 3 + i % 3] : t.triangles[e * 9 + i], ve = (t, e) => [0, 3, 6].map((i) => [
  me(t, e, i),
  me(t, e, i + 1),
  me(t, e, i + 2)
]);
function qe(t) {
  const e = [1 / 0, 1 / 0, 1 / 0], i = [-1 / 0, -1 / 0, -1 / 0];
  for (let a = 0; a < t.length; a++) {
    const s = a % 3;
    e[s] = Math.min(e[s], t[a]), i[s] = Math.max(i[s], t[a]);
  }
  return { min: e, max: i };
}
const $e = (t, e, i) => t.min.every((a, s) => a <= e.max[s] + i && t.max[s] >= e.min[s] - i);
function Ue(t, e) {
  const i = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const d of e)
    for (let f = 0; f < 9; f++) {
      const h = f % 3, m = me(t, d, f);
      i.min[h] = Math.min(i.min[h], m), i.max[h] = Math.max(i.max[h], m);
    }
  if (e.length <= 12) return { ...i, ids: e };
  const a = i.max.map((d, f) => d - i.min[f]), s = a.indexOf(Math.max(...a)), n = (d) => me(t, d, s) + me(t, d, s + 3) + me(t, d, s + 6);
  e.sort((d, f) => n(d) - n(f));
  const o = e.length >> 1;
  return {
    ...i,
    left: Ue(t, e.slice(0, o)),
    right: Ue(t, e.slice(o))
  };
}
function* Ae(t, e, i) {
  $e(t, e, i) && (t.ids ? yield* t.ids : (yield* Ae(t.left, e, i), yield* Ae(t.right, e, i)));
}
function* ye(t, e, i) {
  if ($e(t, e, i)) {
    if (t.ids && e.ids) {
      for (const a of t.ids) for (const s of e.ids) yield [a, s];
      return;
    }
    if (t.ids) {
      yield* ye(t, e.left, i), yield* ye(t, e.right, i);
      return;
    }
    if (e.ids) {
      yield* ye(t.left, e, i), yield* ye(t.right, e, i);
      return;
    }
    yield* ye(t.left, e.left, i), yield* ye(t.left, e.right, i), yield* ye(t.right, e.left, i), yield* ye(t.right, e.right, i);
  }
}
function Be(t, e) {
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
    left: Be(t, e.slice(0, n)),
    right: Be(t, e.slice(n))
  };
}
function ze(t, e, i, a) {
  const s = J(e, t), n = J(i[1], i[0]), o = J(i[2], i[0]), d = Me(s, o), f = ce(n, d);
  if (Math.abs(f) <= 1e-12 * le(s) * le(n) * le(o)) return;
  const h = 1 / f, m = J(t, i[0]), x = ce(m, d) * h, w = Me(m, n), M = ce(s, w) * h, I = ce(o, w) * h, z = a / Math.max(le(n), le(o), a);
  if (x >= -z && M >= -z && x + M <= 1 + z && I >= -z && I <= 1 + z)
    return Oe(t, s, Math.max(0, Math.min(1, I)));
}
function xt(t, e, i, a) {
  const s = i.map(Math.abs).indexOf(Math.max(...i.map(Math.abs))), n = [0, 1, 2].filter((f) => f !== s), o = (f, h, m) => (h[n[0]] - f[n[0]]) * (m[n[1]] - f[n[1]]) - (h[n[1]] - f[n[1]]) * (m[n[0]] - f[n[0]]), d = (f, h) => {
    const m = h.map((x, w) => o(x, h[(w + 1) % 3], f));
    return m.every((x) => x >= -a * le(i)) || m.every((x) => x <= a * le(i));
  };
  for (const f of t) if (d(f, e)) return f;
  for (const f of e) if (d(f, t)) return f;
  for (let f = 0; f < 3; f++)
    for (let h = 0; h < 3; h++) {
      const m = t[f], x = t[(f + 1) % 3], w = e[h], M = e[(h + 1) % 3], I = J(x, m), z = J(M, w), j = I[n[0]] * z[n[1]] - I[n[1]] * z[n[0]];
      if (Math.abs(j) < 1e-18) continue;
      const O = J(w, m), oe = (O[n[0]] * z[n[1]] - O[n[1]] * z[n[0]]) / j, A = (O[n[0]] * I[n[1]] - O[n[1]] * I[n[0]]) / j;
      if (oe >= 0 && oe <= 1 && A >= 0 && A <= 1) return Oe(m, I, oe);
    }
}
function bt(t, e, i, a) {
  for (let s = 0; s < 3; s++) {
    const n = ze(t[s], t[(s + 1) % 3], e, i);
    n && a.push(n);
    const o = ze(e[s], e[(s + 1) % 3], t, i);
    o && a.push(o);
  }
}
function yt(t, e, i, a) {
  const s = Me(J(t[1], t[0]), J(t[2], t[0])), n = Me(J(e[1], e[0]), J(e[2], e[0])), o = le(s), d = le(n);
  if (o < 1e-20 || d < 1e-20) return;
  const f = e.map((m) => ce(J(m, t[0]), s) / o), h = t.map((m) => ce(J(m, e[0]), n) / d);
  if (!(f.every((m) => m > i) || f.every((m) => m < -i) || h.every((m) => m > i) || h.every((m) => m < -i))) {
    if (f.every((m) => Math.abs(m) <= i) && h.every((m) => Math.abs(m) <= i))
      return a ? xt(t, e, s, i) : void 0;
    if (!(!a && (!(Math.min(...f) < -i && Math.max(...f) > i) || !(Math.min(...h) < -i && Math.max(...h) > i))))
      for (let m = 0; m < 3; m++) {
        const x = ze(t[m], t[(m + 1) % 3], e, i);
        if (x) return x;
        const w = ze(e[m], e[(m + 1) % 3], t, i);
        if (w) return w;
      }
  }
}
class wt {
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
    const i = nt(Me(J(e[1], e[0]), J(e[2], e[0])));
    if (!i) return;
    const s = i[0] < -1e-9 || Math.abs(i[0]) <= 1e-9 && (i[1] < -1e-9 || Math.abs(i[1]) <= 1e-9 && i[2] < 0) ? [-i[0], -i[1], -i[2]] : [i[0], i[1], i[2]], n = this.key(s);
    for (this.items.has(n) || this.items.set(n, s); this.items.size > 512 && this.step > 10; ) {
      this.step /= 10;
      const o = /* @__PURE__ */ new Map();
      for (const d of this.items.values()) {
        const f = this.key(d);
        o.has(f) || o.set(f, d);
      }
      this.items = o;
    }
  }
  addFrom(e, i) {
    for (const a of i) this.add(ve(e, a));
  }
  values() {
    return [
      ...this.world,
      ...[...this.items].sort((e, i) => e[0] < i[0] ? -1 : 1).map(([, e]) => e)
    ];
  }
}
function ot(t, e) {
  const i = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
  for (const s of t) {
    const n = [s[0] - e[0], s[1] - e[1], s[2] - e[2]];
    for (let o = 0; o < 3; o++)
      for (let d = 0; d < 3; d++) i[o][d] += n[o] * n[d];
  }
  const a = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ];
  for (let s = 0; s < 12; s++) {
    let n = 0;
    for (let o = 0; o < 3; o++)
      for (let d = o + 1; d < 3; d++) n += i[o][d] * i[o][d];
    if (n <= 1e-30) break;
    for (let o = 0; o < 3; o++)
      for (let d = o + 1; d < 3; d++) {
        if (Math.abs(i[o][d]) <= 1e-30) continue;
        const f = (i[d][d] - i[o][o]) / (2 * i[o][d]), h = (f >= 0 ? 1 : -1) / (Math.abs(f) + Math.sqrt(f * f + 1)), m = 1 / Math.sqrt(h * h + 1), x = h * m;
        for (const w of [i, a])
          for (let M = 0; M < 3; M++) {
            const I = w[M][o], z = w[M][d];
            w[M][o] = m * I - x * z, w[M][d] = x * I + m * z;
          }
        for (let w = 0; w < 3; w++) {
          const M = i[o][w], I = i[d][w];
          i[o][w] = m * M - x * I, i[d][w] = x * M + m * I;
        }
      }
  }
  return [0, 1, 2].sort((s, n) => i[n][n] - i[s][s]).map((s) => nt([a[0][s], a[1][s], a[2][s]])).filter((s) => !!s);
}
function vt(t, e, i, a) {
  const s = e.min.map((h, m) => (h + e.max[m]) / 2), n = le(J(e.max, e.min)), o = Math.max(i * 10, n / 50), d = (h) => [0, 1, 2].map(
    (m) => h.reduce((x, w) => x + w[m], 0) / h.length
  );
  let f = [{ hits: t, limits: [] }];
  for (let h = 0; h < 3; h++) {
    const m = [];
    let x = !1;
    for (const w of f) {
      if (w.hits.length < 2 || m.length + f.length >= 8) {
        m.push(w);
        continue;
      }
      const M = d(w.hits), I = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ], z = ot(w.hits, M)[0];
      z && I.push(z);
      let j;
      for (const A of I) {
        const $ = w.hits.map((E) => ce(E, A)).sort((E, u) => E - u);
        for (let E = 1; E < $.length; E++) {
          const u = $[E] - $[E - 1];
          u > o && (!j || u > j.size) && (j = { n: A, at: ($[E] + $[E - 1]) / 2, size: u });
        }
      }
      if (!j || !a(j.n, j.at, [s, M])) {
        m.push(w);
        continue;
      }
      x = !0;
      const O = [], oe = [];
      for (const A of w.hits)
        (ce(A, j.n) < j.at ? O : oe).push(A);
      m.push({
        hits: O,
        limits: [...w.limits, { n: j.n, from: -1 / 0, to: j.at }]
      }), m.push({
        hits: oe,
        limits: [...w.limits, { n: j.n, from: j.at, to: 1 / 0 }]
      });
    }
    if (f = m, !x) break;
  }
  return f;
}
function He(t, e, i) {
  return i.every(({ n: a, from: s, to: n }) => {
    let o = 1 / 0, d = -1 / 0;
    for (let f = 0; f < 9; f += 3) {
      const h = me(t, e, f) * a[0] + me(t, e, f + 1) * a[1] + me(t, e, f + 2) * a[2];
      h < o && (o = h), h > d && (d = h);
    }
    return d >= s && o <= n;
  });
}
function Mt(t, e, i, a, s, n, o, d, f, h) {
  const m = (A) => {
    let $ = 1 / 0, E = -1 / 0;
    for (let u = 0; u < 8; u++) {
      const Z = (u & 1 ? o.max[0] : o.min[0]) * A[0] + (u & 2 ? o.max[1] : o.min[1]) * A[1] + (u & 4 ? o.max[2] : o.min[2]) * A[2];
      Z < $ && ($ = Z), Z > E && (E = Z);
    }
    return [$, E];
  }, x = (A, $, E, u, Z) => {
    let F = 1 / 0, R = -1 / 0;
    for (const k of $) {
      let C = 1 / 0, T = -1 / 0;
      for (let P = 0; P < 9; P += 3) {
        const de = me(A, k, P) * E[0] + me(A, k, P + 1) * E[1] + me(A, k, P + 2) * E[2];
        de < C && (C = de), de > T && (T = de);
      }
      T < u || C > Z || (C < u && (C = u), T > Z && (T = Z), C < F && (F = C), T > R && (R = T));
    }
    return F === 1 / 0 ? void 0 : [F, R];
  };
  if (o.min.some((A, $) => o.max[$] - A <= 0)) return 0;
  const w = Math.ceil((i.length + a.length) / 4096), M = [
    ...s,
    ...w > 1 ? n.filter((A, $) => $ < 3 || $ % w === 0) : n
  ], I = (A, $, E, u, Z) => {
    const F = (C) => Oe(d, E, C - ce(d, E));
    if (!$) return h(A, F((u + Z) / 2)) ? [u, Z] : void 0;
    let [R, k] = $;
    return R > u && h(A, F((u + R) / 2)) && (R = u), k < Z && h(A, F((k + Z) / 2)) && (k = Z), [R, k];
  }, z = (A, $) => A && $ ? Math.min(A[1], $[1]) - Math.max(A[0], $[0]) : 0;
  let j = 1 / 0, O = !1, oe = 0;
  for (let A = 0; A < M.length; A++) {
    const $ = M[A], [E, u] = m($), Z = x(t, i, $, E, u), F = x(e, a, $, E, u);
    let R = z(Z, F);
    R <= 0 && oe++ < 32 && (R = z(I(0, Z, $, E, u), I(1, F, $, E, u))), !(R <= f) && (O = !0, R < j && (j = R));
  }
  return O && Number.isFinite(j) ? j : 0;
}
function kt(t, e) {
  const i = Ee(t);
  if (!i) return !0;
  const a = [0, 0, 0];
  for (let o = 0; o < i; o++)
    for (let d = 0; d < 9; d += 3)
      for (let f = 0; f < 3; f++) a[f] += me(t, o, d + f);
  for (let o = 0; o < 3; o++) a[o] /= i * 3;
  let s = 0, n = 0;
  for (let o = 0; o < i; o++) {
    const d = ve(t, o), f = J(d[0], a), h = J(d[1], a), m = J(d[2], a);
    s += ce(f, Me(h, m)) / 6, n += le(Me(J(d[1], d[0]), J(d[2], d[0]))) / 2;
  }
  return Math.abs(s) <= e * n;
}
function St(t, e, i) {
  const a = J(e[1], e[0]), s = J(e[2], e[0]), n = Me(a, s), o = le(n);
  if (o < 1e-20 || Math.abs(ce(J(t, e[0]), n)) / o > i) return !1;
  const d = J(t, e[0]), f = ce(a, a), h = ce(a, s), m = ce(s, s), x = ce(d, a), w = ce(d, s), M = f * m - h * h;
  if (Math.abs(M) < 1e-30) return !1;
  const I = (x * m - w * h) / M, z = (w * f - x * h) / M, j = i / Math.max(le(a), le(s), i);
  return I >= -j && z >= -j && I + z <= 1 + j;
}
function Ye(t, e, i, a) {
  for (const s of Ae(i, { min: t, max: t }, a))
    if (St(t, ve(e, s), a)) return !0;
  return !1;
}
function Ie(t, e, i, a) {
  if (!e.closed || t.some((x, w) => x <= e.bounds.min[w] + a || x >= e.bounds.max[w] - a) || Ye(t, e, i, a)) return !1;
  const s = [1, 0.371390676, 0.52999894], n = le(J(e.bounds.max, e.bounds.min)) * 3 + 1, o = Oe(t, s, n), d = [], f = qe([...t, ...o]);
  for (const x of Ae(i, f, a)) {
    const w = ze(t, o, ve(e, x), a);
    if (w) {
      const M = le(J(w, t));
      M > a && d.push(M);
    }
  }
  d.sort((x, w) => x - w);
  let h = 0, m = -1 / 0;
  for (const x of d)
    x - m > a * 2 && (h++, m = x);
  return h % 2 === 1;
}
async function It(t, e, i, a, s) {
  const n = e.precision / 1e3;
  if (!Number.isFinite(n) || n <= 0)
    throw Error("Точность расчёта должна быть положительным числом.");
  const o = t.filter((k) => e.includeHidden || !k.hidden), d = o.filter((k) => Ce(k, e.a)), f = o.filter((k) => Ce(k, e.b));
  if (!d.length || !f.length)
    throw Error(
      "Выборка А или Б не содержит элементов. Отметьте хотя бы одну модель в каждой стороне проверки."
    );
  let h = performance.now();
  const m = async () => {
    if (a())
      throw Error("Расчёт отменён. Предыдущие результаты сохранены.");
    performance.now() - h > 16 && (await new Promise((k) => setTimeout(k, 0)), h = performance.now());
  }, x = /* @__PURE__ */ new Map(), w = (k) => {
    let C = x.get(k.id);
    return C || (C = Ue(
      k,
      Array.from({ length: Ee(k) }, (T, P) => P)
    ), x.set(k.id, C)), C;
  }, M = /* @__PURE__ */ new Map(), I = (k) => {
    let C = M.get(k.id);
    return C === void 0 && (C = !k.closed || kt(k, n), M.set(k.id, C)), C;
  }, z = /* @__PURE__ */ new Map(), j = async (k) => {
    let C = z.get(k.id);
    if (C !== void 0) return C;
    const T = [];
    for (let P = 0; P < Ee(k); P++)
      T.push(
        [0, 3, 6].map(
          (de) => [0, 1, 2].map((N) => Math.round(me(k, P, de + N) / n)).join(",")
        ).sort().join(";")
      ), P % 9e3 === 0 && await m();
    return C = T.sort().join("|"), z.set(k.id, C), C;
  }, O = [], oe = new Set(d.map((k) => k.id)), A = new Set(f.map((k) => k.id)), $ = Be(
    f,
    f.map((k, C) => C)
  ), E = /* @__PURE__ */ new Map();
  let u = 0;
  const Z = (k) => k.triangles.byteLength + (k.vertices?.byteLength || 0) + (k.indices?.byteLength || 0) + Ee(k) * 32;
  async function F(k, C) {
    if (!s) return k;
    let T = E.get(k.id);
    if (T)
      return E.delete(k.id), E.set(k.id, T), T;
    for (const [P, de] of E)
      P !== C && u > 96 * 1024 * 1024 && (E.delete(P), u -= Z(de), x.delete(P), z.delete(P));
    return T = await s(k.id), E.set(k.id, T), u += Z(T), T;
  }
  let R = -1 / 0;
  for (let k = 0; k < d.length; k++) {
    const C = d[k];
    performance.now() - R > 150 && (R = performance.now(), i({
      phase: "Проверка пар",
      done: k,
      total: d.length,
      found: O.length
    }));
    const T = [...Ae($, C.bounds, n)];
    for (let P = 0; P < T.length; P++) {
      const de = T[P];
      performance.now() - R > 150 && (R = performance.now(), i({
        phase: `Проверка пар · A ${k + 1}/${d.length} · кандидаты ${P + 1}/${T.length}`,
        done: k,
        total: d.length,
        found: O.length
      }));
      const N = f[de];
      if (await m(), C.id === N.id || !$e(C.bounds, N.bounds, n) || e.ignoreSameModel && C.modelId === N.modelId || e.ignoreSameGroup && C.modelId === N.modelId && C.properties.Объект && C.properties.Объект === N.properties.Объект || e.equalProperty && C.properties[e.equalProperty] !== void 0 && C.properties[e.equalProperty] === N.properties[e.equalProperty] || C.id > N.id && oe.has(N.id) && A.has(C.id)) continue;
      const te = ht(C.id, N.id), L = await F(C), D = await F(N, C.id);
      let Y, se = "surface", H = 0, xe = !1;
      if (e.type === "duplicates") {
        if (Ee(L) !== Ee(D) || L.bounds.min.some(
          (W, X) => Math.abs(W - D.bounds.min[X]) > n || Math.abs(L.bounds.max[X] - D.bounds.max[X]) > n
        ))
          continue;
        await j(L) === await j(D) && (Y = L.bounds.min.map((W, X) => (W + L.bounds.max[X]) / 2), se = "duplicate");
      } else {
        const W = w(L), X = w(D), ae = {
          min: L.bounds.min.map(
            (K, _) => Math.max(K, D.bounds.min[_])
          ),
          max: L.bounds.max.map(
            (K, _) => Math.min(K, D.bounds.max[_])
          )
        }, be = ae.min.map(
          (K, _) => (K + ae.max[_]) / 2
        ), fe = new wt(), ie = [];
        let ke = 1, he = 0, pe = 1 / 0, V = 0;
        for (const [K, _] of ye(W, X, n)) {
          const B = ve(L, K), U = ve(D, _);
          if (!$e(qe(B.flat()), qe(U.flat()), n)) continue;
          const Q = yt(B, U, n, e.touching);
          if (Q) {
            const ue = le(J(Q, be));
            if ((!Y || ue < pe) && (Y = Q, pe = ue), fe.add(B), fe.add(U), he++ % ke === 0 && (bt(B, U, n, ie), ie.length || ie.push(Q), ie.length >= 8192)) {
              for (let ge = 0; ge * 2 < ie.length; ge++) ie[ge] = ie[ge * 2];
              ie.length = Math.ceil(ie.length / 2), ke *= 2;
            }
          }
          ++V % 256 === 0 && (performance.now() - R > 150 && (R = performance.now(), i({
            phase: `Геометрия пары · A ${k + 1}/${d.length}`,
            done: k,
            total: d.length,
            found: O.length
          })), await m());
        }
        if (!Y && L.closed && D.closed) {
          const K = L.bounds.min.map(
            (_, B) => (_ + L.bounds.max[B]) / 2
          );
          Ie(K, L, W, n) && Ie(K, D, X, n) && (Y = K, se = "contained");
        }
        if (!Y) {
          for (const [K, _, B] of [
            [L, D, X],
            [D, L, W]
          ])
            if (_.closed) {
              for (let U = 0; U < Ee(K) && !Y; U++) {
                const Q = ve(K, U), ue = Q[0].map(
                  (ge, Se) => (Q[0][Se] + Q[1][Se] + Q[2][Se]) / 3
                );
                for (const ge of [Q[0], ue])
                  if (Ie(ge, _, B, n)) {
                    Y = ge, se = "contained";
                    break;
                  }
                await m();
              }
              if (Y) break;
            }
        }
        if (Y) {
          const K = (c, p) => [...Ae(p, ae, n)].filter(
            (g) => $e(qe(ve(c, g).flat()), ae, n)
          ), _ = K(L, W), B = K(D, X);
          se !== "surface" && (fe.addFrom(L, _), fe.addFrom(D, B)), await m();
          const U = ae.min.map(
            (c, p) => (c + ae.max[p]) / 2
          ), Q = (c, p) => c === 0 ? Ie(p, L, W, n) : Ie(p, D, X, n), ue = (c, p) => c === 0 ? Ie(p, L, W, n) || Ye(p, L, W, n) : Ie(p, D, X, n) || Ye(p, D, X, n), Se = vt(ie, ae, n, (c, p, g) => L.closed && D.closed && g.every((v) => {
            const b = Oe(v, c, p - ce(v, c));
            return !ue(0, b) || !ue(1, b);
          })), r = fe.values();
          let l = 0;
          for (const c of Se) {
            const p = c.limits.length ? _.filter((y) => He(L, y, c.limits)) : _, g = c.limits.length ? B.filter((y) => He(D, y, c.limits)) : B, v = c.hits.length ? [0, 1, 2].map(
              (y) => c.hits.reduce((S, q) => S + q[y], 0) / c.hits.length
            ) : U, b = Mt(
              L,
              D,
              p,
              g,
              c.hits.length > 2 ? ot(c.hits, v) : [],
              r,
              ae,
              v,
              n,
              Q
            );
            b > l && (l = b), await m();
          }
          if (l *= 1e3, I(L) || I(D)) xe = !0;
          else if (l <= 0 && !e.touching) continue;
          H = xe ? 0 : e.touching ? l : Math.max(e.precision, l), await m();
        }
        if (Y && !xe && H + e.precision < e.minPenetration)
          continue;
      }
      if (Y && (O.push({
        id: te,
        a: Te(L),
        b: Te(D),
        point: Y,
        kind: se,
        state: "new",
        note: "",
        assignee: "",
        firstSeen: "",
        lastSeen: "",
        penetrationMm: H,
        ...xe ? { unmeasured: !0 } : {}
      }), O.length >= 5e4))
        throw Error(
          "Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат."
        );
    }
  }
  return i({
    phase: "Готово",
    done: d.length,
    total: d.length,
    found: O.length
  }), O;
}
const st = '(function(){"use strict";const vt=({triangles:n,vertices:t,indices:i,triangleCount:a,closed:r,bounds:o,...s})=>s;function bt(n,t){return t.exclude.includes(n.id)?!1:t.include.includes(n.id)?!0:!(t.manualOnly||t.modelsMode==="selected"&&!t.models.includes(n.modelId)||t.modelsMode===void 0&&t.models.length&&!t.models.includes(n.modelId))}const zt=(n,t)=>JSON.stringify([n,t].sort()),w=(n,t)=>[n[0]-t[0],n[1]-t[1],n[2]-t[2]],st=(n,t,i=1)=>[n[0]+t[0]*i,n[1]+t[1]*i,n[2]+t[2]*i],$=(n,t)=>n[0]*t[0]+n[1]*t[1]+n[2]*t[2],V=(n,t)=>[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]],O=n=>Math.hypot(...n),qt=n=>{const t=O(n);return t>1e-20?[n[0]/t,n[1]/t,n[2]/t]:void 0},tt=n=>n.triangleCount??(n.indices?n.indices.length/3:n.triangles.length/9),C=(n,t,i)=>n.indices&&n.vertices?n.vertices[n.indices[t*3+Math.floor(i/3)]*3+i%3]:n.triangles[t*9+i],W=(n,t)=>[0,3,6].map(i=>[C(n,t,i),C(n,t,i+1),C(n,t,i+2)]);function gt(n){const t=[1/0,1/0,1/0],i=[-1/0,-1/0,-1/0];for(let a=0;a<n.length;a++){const r=a%3;t[r]=Math.min(t[r],n[a]),i[r]=Math.max(i[r],n[a])}return{min:t,max:i}}const rt=(n,t,i)=>n.min.every((a,r)=>a<=t.max[r]+i&&n.max[r]>=t.min[r]-i);function pt(n,t){const i={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const e of t)for(let f=0;f<9;f++){const c=f%3,l=C(n,e,f);i.min[c]=Math.min(i.min[c],l),i.max[c]=Math.max(i.max[c],l)}if(t.length<=12)return{...i,ids:t};const a=i.max.map((e,f)=>e-i.min[f]),r=a.indexOf(Math.max(...a)),o=e=>C(n,e,r)+C(n,e,r+3)+C(n,e,r+6);t.sort((e,f)=>o(e)-o(f));const s=t.length>>1;return{...i,left:pt(n,t.slice(0,s)),right:pt(n,t.slice(s))}}function*et(n,t,i){rt(n,t,i)&&(n.ids?yield*n.ids:(yield*et(n.left,t,i),yield*et(n.right,t,i)))}function*R(n,t,i){if(rt(n,t,i)){if(n.ids&&t.ids){for(const a of n.ids)for(const r of t.ids)yield[a,r];return}if(n.ids){yield*R(n,t.left,i),yield*R(n,t.right,i);return}if(t.ids){yield*R(n.left,t,i),yield*R(n.right,t,i);return}yield*R(n.left,t.left,i),yield*R(n.left,t.right,i),yield*R(n.right,t.left,i),yield*R(n.right,t.right,i)}}function xt(n,t){const i={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const s of t)for(let e=0;e<3;e++)i.min[e]=Math.min(i.min[e],n[s].bounds.min[e]),i.max[e]=Math.max(i.max[e],n[s].bounds.max[e]);if(t.length<=16)return{...i,ids:t};const a=i.max.map((s,e)=>s-i.min[e]),r=a.indexOf(Math.max(...a));t.sort((s,e)=>n[s].bounds.min[r]+n[s].bounds.max[r]-(n[e].bounds.min[r]+n[e].bounds.max[r]));const o=t.length>>1;return{...i,left:xt(n,t.slice(0,o)),right:xt(n,t.slice(o))}}function ft(n,t,i,a){const r=w(t,n),o=w(i[1],i[0]),s=w(i[2],i[0]),e=V(r,s),f=$(o,e);if(Math.abs(f)<=1e-12*O(r)*O(o)*O(s))return;const c=1/f,l=w(n,i[0]),h=$(l,e)*c,d=V(l,o),x=$(r,d)*c,v=$(s,d)*c,b=a/Math.max(O(o),O(s),a);if(h>=-b&&x>=-b&&h+x<=1+b&&v>=-b&&v<=1+b)return st(n,r,Math.max(0,Math.min(1,v)))}function Et(n,t,i,a){const r=i.map(Math.abs).indexOf(Math.max(...i.map(Math.abs))),o=[0,1,2].filter(f=>f!==r),s=(f,c,l)=>(c[o[0]]-f[o[0]])*(l[o[1]]-f[o[1]])-(c[o[1]]-f[o[1]])*(l[o[0]]-f[o[0]]),e=(f,c)=>{const l=c.map((h,d)=>s(h,c[(d+1)%3],f));return l.every(h=>h>=-a*O(i))||l.every(h=>h<=a*O(i))};for(const f of n)if(e(f,t))return f;for(const f of t)if(e(f,n))return f;for(let f=0;f<3;f++)for(let c=0;c<3;c++){const l=n[f],h=n[(f+1)%3],d=t[c],x=t[(c+1)%3],v=w(h,l),b=w(x,d),I=v[o[0]]*b[o[1]]-v[o[1]]*b[o[0]];if(Math.abs(I)<1e-18)continue;const T=w(d,l),Z=(T[o[0]]*b[o[1]]-T[o[1]]*b[o[0]])/I,g=(T[o[0]]*v[o[1]]-T[o[1]]*v[o[0]])/I;if(Z>=0&&Z<=1&&g>=0&&g<=1)return st(l,v,Z)}}function Ot(n,t,i,a){for(let r=0;r<3;r++){const o=ft(n[r],n[(r+1)%3],t,i);o&&a.push(o);const s=ft(t[r],t[(r+1)%3],n,i);s&&a.push(s)}}function Tt(n,t,i,a){const r=V(w(n[1],n[0]),w(n[2],n[0])),o=V(w(t[1],t[0]),w(t[2],t[0])),s=O(r),e=O(o);if(s<1e-20||e<1e-20)return;const f=t.map(l=>$(w(l,n[0]),r)/s),c=n.map(l=>$(w(l,t[0]),o)/e);if(!(f.every(l=>l>i)||f.every(l=>l<-i)||c.every(l=>l>i)||c.every(l=>l<-i))){if(f.every(l=>Math.abs(l)<=i)&&c.every(l=>Math.abs(l)<=i))return a?Et(n,t,r,i):void 0;if(!(!a&&(!(Math.min(...f)<-i&&Math.max(...f)>i)||!(Math.min(...c)<-i&&Math.max(...c)>i))))for(let l=0;l<3;l++){const h=ft(n[l],n[(l+1)%3],t,i);if(h)return h;const d=ft(t[l],t[(l+1)%3],n,i);if(d)return d}}}class $t{world=[[1,0,0],[0,1,0],[0,0,1]];items=new Map;step=1e4;key(t){return t.map(i=>Math.round(i*this.step)).join(",")}add(t){const i=qt(V(w(t[1],t[0]),w(t[2],t[0])));if(!i)return;const r=i[0]<-1e-9||Math.abs(i[0])<=1e-9&&(i[1]<-1e-9||Math.abs(i[1])<=1e-9&&i[2]<0)?[-i[0],-i[1],-i[2]]:[i[0],i[1],i[2]],o=this.key(r);for(this.items.has(o)||this.items.set(o,r);this.items.size>512&&this.step>10;){this.step/=10;const s=new Map;for(const e of this.items.values()){const f=this.key(e);s.has(f)||s.set(f,e)}this.items=s}}addFrom(t,i){for(const a of i)this.add(W(t,a))}values(){return[...this.world,...[...this.items].sort((t,i)=>t[0]<i[0]?-1:1).map(([,t])=>t)]}}function _t(n,t){const i=[[0,0,0],[0,0,0],[0,0,0]];for(const r of n){const o=[r[0]-t[0],r[1]-t[1],r[2]-t[2]];for(let s=0;s<3;s++)for(let e=0;e<3;e++)i[s][e]+=o[s]*o[e]}const a=[[1,0,0],[0,1,0],[0,0,1]];for(let r=0;r<12;r++){let o=0;for(let s=0;s<3;s++)for(let e=s+1;e<3;e++)o+=i[s][e]*i[s][e];if(o<=1e-30)break;for(let s=0;s<3;s++)for(let e=s+1;e<3;e++){if(Math.abs(i[s][e])<=1e-30)continue;const f=(i[e][e]-i[s][s])/(2*i[s][e]),c=(f>=0?1:-1)/(Math.abs(f)+Math.sqrt(f*f+1)),l=1/Math.sqrt(c*c+1),h=c*l;for(const d of[i,a])for(let x=0;x<3;x++){const v=d[x][s],b=d[x][e];d[x][s]=l*v-h*b,d[x][e]=h*v+l*b}for(let d=0;d<3;d++){const x=i[s][d],v=i[e][d];i[s][d]=l*x-h*v,i[e][d]=h*x+l*v}}}return[0,1,2].sort((r,o)=>i[o][o]-i[r][r]).map(r=>qt([a[0][r],a[1][r],a[2][r]])).filter(r=>!!r)}function At(n,t,i,a){const r=t.min.map((c,l)=>(c+t.max[l])/2),o=O(w(t.max,t.min)),s=Math.max(i*10,o/50),e=c=>[0,1,2].map(l=>c.reduce((h,d)=>h+d[l],0)/c.length);let f=[{hits:n,limits:[]}];for(let c=0;c<3;c++){const l=[];let h=!1;for(const d of f){if(d.hits.length<2||l.length+f.length>=8){l.push(d);continue}const x=e(d.hits),v=[[1,0,0],[0,1,0],[0,0,1]],b=_t(d.hits,x)[0];b&&v.push(b);let I;for(const g of v){const p=d.hits.map(y=>$(y,g)).sort((y,M)=>y-M);for(let y=1;y<p.length;y++){const M=p[y]-p[y-1];M>s&&(!I||M>I.size)&&(I={n:g,at:(p[y]+p[y-1])/2,size:M})}}if(!I||!a(I.n,I.at,[r,x])){l.push(d);continue}h=!0;const T=[],Z=[];for(const g of d.hits)($(g,I.n)<I.at?T:Z).push(g);l.push({hits:T,limits:[...d.limits,{n:I.n,from:-1/0,to:I.at}]}),l.push({hits:Z,limits:[...d.limits,{n:I.n,from:I.at,to:1/0}]})}if(f=l,!h)break}return f}function jt(n,t,i){return i.every(({n:a,from:r,to:o})=>{let s=1/0,e=-1/0;for(let f=0;f<9;f+=3){const c=C(n,t,f)*a[0]+C(n,t,f+1)*a[1]+C(n,t,f+2)*a[2];c<s&&(s=c),c>e&&(e=c)}return e>=r&&s<=o})}function Ft(n,t,i,a,r,o,s,e,f,c){const l=g=>{let p=1/0,y=-1/0;for(let M=0;M<8;M++){const z=(M&1?s.max[0]:s.min[0])*g[0]+(M&2?s.max[1]:s.min[1])*g[1]+(M&4?s.max[2]:s.min[2])*g[2];z<p&&(p=z),z>y&&(y=z)}return[p,y]},h=(g,p,y,M,z)=>{let N=1/0,S=-1/0;for(const u of p){let m=1/0,_=-1/0;for(let j=0;j<9;j+=3){const B=C(g,u,j)*y[0]+C(g,u,j+1)*y[1]+C(g,u,j+2)*y[2];B<m&&(m=B),B>_&&(_=B)}_<M||m>z||(m<M&&(m=M),_>z&&(_=z),m<N&&(N=m),_>S&&(S=_))}return N===1/0?void 0:[N,S]};if(s.min.some((g,p)=>s.max[p]-g<=0))return 0;const d=Math.ceil((i.length+a.length)/4096),x=[...r,...d>1?o.filter((g,p)=>p<3||p%d===0):o],v=(g,p,y,M,z)=>{const N=m=>st(e,y,m-$(e,y));if(!p)return c(g,N((M+z)/2))?[M,z]:void 0;let[S,u]=p;return S>M&&c(g,N((M+S)/2))&&(S=M),u<z&&c(g,N((u+z)/2))&&(u=z),[S,u]},b=(g,p)=>g&&p?Math.min(g[1],p[1])-Math.max(g[0],p[0]):0;let I=1/0,T=!1,Z=0;for(let g=0;g<x.length;g++){const p=x[g],[y,M]=l(p),z=h(n,i,p,y,M),N=h(t,a,p,y,M);let S=b(z,N);S<=0&&Z++<32&&(S=b(v(0,z,p,y,M),v(1,N,p,y,M))),!(S<=f)&&(T=!0,S<I&&(I=S))}return T&&Number.isFinite(I)?I:0}function Ct(n,t){const i=tt(n);if(!i)return!0;const a=[0,0,0];for(let s=0;s<i;s++)for(let e=0;e<9;e+=3)for(let f=0;f<3;f++)a[f]+=C(n,s,e+f);for(let s=0;s<3;s++)a[s]/=i*3;let r=0,o=0;for(let s=0;s<i;s++){const e=W(n,s),f=w(e[0],a),c=w(e[1],a),l=w(e[2],a);r+=$(f,V(c,l))/6,o+=O(V(w(e[1],e[0]),w(e[2],e[0])))/2}return Math.abs(r)<=t*o}function Lt(n,t,i){const a=w(t[1],t[0]),r=w(t[2],t[0]),o=V(a,r),s=O(o);if(s<1e-20||Math.abs($(w(n,t[0]),o))/s>i)return!1;const e=w(n,t[0]),f=$(a,a),c=$(a,r),l=$(r,r),h=$(e,a),d=$(e,r),x=f*l-c*c;if(Math.abs(x)<1e-30)return!1;const v=(h*l-d*c)/x,b=(d*f-h*c)/x,I=i/Math.max(O(a),O(r),i);return v>=-I&&b>=-I&&v+b<=1+I}function Mt(n,t,i,a){for(const r of et(i,{min:n,max:n},a))if(Lt(n,W(t,r),a))return!0;return!1}function nt(n,t,i,a){if(!t.closed||n.some((h,d)=>h<=t.bounds.min[d]+a||h>=t.bounds.max[d]-a)||Mt(n,t,i,a))return!1;const r=[1,.371390676,.52999894],o=O(w(t.bounds.max,t.bounds.min))*3+1,s=st(n,r,o),e=[],f=gt([...n,...s]);for(const h of et(i,f,a)){const d=ft(n,s,W(t,h),a);if(d){const x=O(w(d,n));x>a&&e.push(x)}}e.sort((h,d)=>h-d);let c=0,l=-1/0;for(const h of e)h-l>a*2&&(c++,l=h);return c%2===1}async function Nt(n,t,i,a,r){const o=t.precision/1e3;if(!Number.isFinite(o)||o<=0)throw Error("Точность расчёта должна быть положительным числом.");const s=n.filter(u=>t.includeHidden||!u.hidden),e=s.filter(u=>bt(u,t.a)),f=s.filter(u=>bt(u,t.b));if(!e.length||!f.length)throw Error("Выборка А или Б не содержит элементов. Отметьте хотя бы одну модель в каждой стороне проверки.");let c=performance.now();const l=async()=>{if(a())throw Error("Расчёт отменён. Предыдущие результаты сохранены.");performance.now()-c>16&&(await new Promise(u=>setTimeout(u,0)),c=performance.now())},h=new Map,d=u=>{let m=h.get(u.id);return m||(m=pt(u,Array.from({length:tt(u)},(_,j)=>j)),h.set(u.id,m)),m},x=new Map,v=u=>{let m=x.get(u.id);return m===void 0&&(m=!u.closed||Ct(u,o),x.set(u.id,m)),m},b=new Map,I=async u=>{let m=b.get(u.id);if(m!==void 0)return m;const _=[];for(let j=0;j<tt(u);j++)_.push([0,3,6].map(B=>[0,1,2].map(J=>Math.round(C(u,j,B+J)/o)).join(",")).sort().join(";")),j%9e3===0&&await l();return m=_.sort().join("|"),b.set(u.id,m),m},T=[],Z=new Set(e.map(u=>u.id)),g=new Set(f.map(u=>u.id)),p=xt(f,f.map((u,m)=>m)),y=new Map;let M=0;const z=u=>u.triangles.byteLength+(u.vertices?.byteLength||0)+(u.indices?.byteLength||0)+tt(u)*32;async function N(u,m){if(!r)return u;let _=y.get(u.id);if(_)return y.delete(u.id),y.set(u.id,_),_;for(const[j,B]of y)j!==m&&M>96*1024*1024&&(y.delete(j),M-=z(B),h.delete(j),b.delete(j));return _=await r(u.id),y.set(u.id,_),M+=z(_),_}let S=-1/0;for(let u=0;u<e.length;u++){const m=e[u];performance.now()-S>150&&(S=performance.now(),i({phase:"Проверка пар",done:u,total:e.length,found:T.length}));const _=[...et(p,m.bounds,o)];for(let j=0;j<_.length;j++){const B=_[j];performance.now()-S>150&&(S=performance.now(),i({phase:`Проверка пар · A ${u+1}/${e.length} · кандидаты ${j+1}/${_.length}`,done:u,total:e.length,found:T.length}));const J=f[B];if(await l(),m.id===J.id||!rt(m.bounds,J.bounds,o)||t.ignoreSameModel&&m.modelId===J.modelId||t.ignoreSameGroup&&m.modelId===J.modelId&&m.properties.Объект&&m.properties.Объект===J.properties.Объект||t.equalProperty&&m.properties[t.equalProperty]!==void 0&&m.properties[t.equalProperty]===J.properties[t.equalProperty]||m.id>J.id&&Z.has(J.id)&&g.has(m.id))continue;const Ht=zt(m.id,J.id),q=await N(m),P=await N(J,m.id);let G,at="surface",It=0,yt=!1;if(t.type==="duplicates"){if(tt(q)!==tt(P)||q.bounds.min.some((Y,H)=>Math.abs(Y-P.bounds.min[H])>o||Math.abs(q.bounds.max[H]-P.bounds.max[H])>o))continue;await I(q)===await I(P)&&(G=q.bounds.min.map((Y,H)=>(Y+q.bounds.max[H])/2),at="duplicate")}else{const Y=d(q),H=d(P),k={min:q.bounds.min.map((A,F)=>Math.max(A,P.bounds.min[F])),max:q.bounds.max.map((A,F)=>Math.min(A,P.bounds.max[F]))},Jt=k.min.map((A,F)=>(A+k.max[F])/2),lt=new $t,D=[];let Pt=1,Kt=0,St=1/0,Xt=0;for(const[A,F]of R(Y,H,o)){const K=W(q,A),Q=W(P,F);if(!rt(gt(K.flat()),gt(Q.flat()),o))continue;const X=Tt(K,Q,o,t.touching);if(X){const it=O(w(X,Jt));if((!G||it<St)&&(G=X,St=it),lt.add(K),lt.add(Q),Kt++%Pt===0&&(Ot(K,Q,o,D),D.length||D.push(X),D.length>=8192)){for(let U=0;U*2<D.length;U++)D[U]=D[U*2];D.length=Math.ceil(D.length/2),Pt*=2}}++Xt%256===0&&(performance.now()-S>150&&(S=performance.now(),i({phase:`Геометрия пары · A ${u+1}/${e.length}`,done:u,total:e.length,found:T.length})),await l())}if(!G&&q.closed&&P.closed){const A=q.bounds.min.map((F,K)=>(F+q.bounds.max[K])/2);nt(A,q,Y,o)&&nt(A,P,H,o)&&(G=A,at="contained")}if(!G){for(const[A,F,K]of[[q,P,H],[P,q,Y]])if(F.closed){for(let Q=0;Q<tt(A)&&!G;Q++){const X=W(A,Q),it=X[0].map((U,ct)=>(X[0][ct]+X[1][ct]+X[2][ct])/3);for(const U of[X[0],it])if(nt(U,F,K,o)){G=U,at="contained";break}await l()}if(G)break}}if(G){const A=(E,L)=>[...et(L,k,o)].filter(ut=>rt(gt(W(E,ut).flat()),k,o)),F=A(q,Y),K=A(P,H);at!=="surface"&&(lt.addFrom(q,F),lt.addFrom(P,K)),await l();const Q=k.min.map((E,L)=>(E+k.max[L])/2),X=(E,L)=>E===0?nt(L,q,Y,o):nt(L,P,H,o),it=(E,L)=>E===0?nt(L,q,Y,o)||Mt(L,q,Y,o):nt(L,P,H,o)||Mt(L,P,H,o),ct=At(D,k,o,(E,L,ut)=>q.closed&&P.closed&&ut.every(dt=>{const mt=st(dt,E,L-$(dt,E));return!it(0,mt)||!it(1,mt)})),Yt=lt.values();let ot=0;for(const E of ct){const L=E.limits.length?F.filter(ht=>jt(q,ht,E.limits)):F,ut=E.limits.length?K.filter(ht=>jt(P,ht,E.limits)):K,dt=E.hits.length?[0,1,2].map(ht=>E.hits.reduce((Zt,Bt)=>Zt+Bt[ht],0)/E.hits.length):Q,mt=Ft(q,P,L,ut,E.hits.length>2?_t(E.hits,dt):[],Yt,k,dt,o,X);mt>ot&&(ot=mt),await l()}if(ot*=1e3,v(q)||v(P))yt=!0;else if(ot<=0&&!t.touching)continue;It=yt?0:t.touching?ot:Math.max(t.precision,ot),await l()}if(G&&!yt&&It+t.precision<t.minPenetration)continue}if(G&&(T.push({id:Ht,a:vt(q),b:vt(P),point:G,kind:at,state:"new",note:"",assignee:"",firstSeen:"",lastSeen:"",penetrationMm:It,...yt?{unmeasured:!0}:{}}),T.length>=5e4))throw Error("Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат.")}}return i({phase:"Готово",done:e.length,total:e.length,found:T.length}),T}let Gt=0;const wt=new Map;self.onmessage=async n=>{if(n.data.request!==void 0){const t=wt.get(n.data.request);wt.delete(n.data.request),n.data.error?t?.reject(Error(n.data.error)):t?.resolve(n.data.geometry);return}try{const{elements:t,check:i}=n.data,a=await Nt(t,i,r=>self.postMessage({progress:r}),()=>!1,n.data.streaming?r=>new Promise((o,s)=>{const e=Gt++;wt.set(e,{resolve:o,reject:s}),self.postMessage({load:r,request:e})}):void 0);self.postMessage({results:a})}catch(t){self.postMessage({error:t instanceof Error?t.message:String(t)})}}})();\n', Je = typeof self < "u" && self.Blob && new Blob(["(self.URL || self.webkitURL).revokeObjectURL(self.location.href);", st], { type: "text/javascript;charset=utf-8" });
function jt(t) {
  let e;
  try {
    if (e = Je && (self.URL || self.webkitURL).createObjectURL(Je), !e) throw "";
    const i = new Worker(e, {
      name: t?.name
    });
    return i.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(e);
    }), i;
  } catch {
    return new Worker(
      "data:text/javascript;charset=utf-8," + encodeURIComponent(st),
      {
        name: t?.name
      }
    );
  }
}
const ee = (t) => String(t ?? "").replace(
  /[&<>"']/g,
  (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[e]
);
function Ve(t, e) {
  const i = URL.createObjectURL(
    new Blob([e], {
      type: t.endsWith(".html") ? "text/html;charset=utf-8" : "application/json;charset=utf-8"
    })
  ), a = document.createElement("a");
  a.href = i, a.download = t, a.click(), setTimeout(() => URL.revokeObjectURL(i), 6e4);
}
function Et(t, e) {
  const i = ee;
  return `<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${i(t.name)}</title><style>body{font:14px/1.5 system-ui;margin:24px;background:#171c23;color:#e6edf5}h1{margin:0}small{color:#a9b7c8}input,select{padding:10px;margin:15px 8px 15px 0;max-width:100%;background:#242e3b;color:inherit;border:1px solid #506074;border-radius:6px}.wrap{overflow:auto}table{border-collapse:separate;border-spacing:0;width:100%}td,th{padding:10px;border-bottom:1px solid #39475a;min-width:100px;vertical-align:top;overflow-wrap:anywhere}th{background:#253142;position:sticky;top:0;text-align:left;white-space:normal}td{max-width:350px}tr[hidden]{display:none}.shot{display:block;width:260px;border:0;background:transparent;padding:0;cursor:zoom-in}dialog{width:min(94vw,1400px);border:1px solid #506074;background:#20242b;color:white;border-radius:10px}dialog img{max-width:100%;max-height:80vh;display:block;margin:12px auto}dialog::backdrop{background:#000b}.shot img{width:100%;border-radius:6px}.legend{margin:12px 0}.red{color:#ff6161}.blue{color:#65baff}@media print{input,select{display:none}body{background:white;color:black}.wrap{overflow:visible}th{position:static;background:#eee}}</style><h1>${i(t.name)}</h1><small>НашеПО · Проверки коллизий · ${i(t.lastRun || "")} · ${t.status === "stale" ? "Результат устарел" : "Последний завершённый расчёт"}</small><p>${i(t.type === "duplicates" ? "Совпадение треугольной геометрии" : "Пересечения поверхностей и вложенность замкнутых тел")}. Точность: ${i(t.precision)} мм${t.type === "intersection" ? `; минимальная глубина: ${i(t.minPenetration)} мм` : ""}. Глубина Hard Clash — толщина самого сильного из отдельных перекрытий пары, замеренная вдоль граней контакта и осей координат. Значение не зависит от густоты треугольной сетки и от размеров элементов. «Не определена» означает, что у одного из элементов нет собственной толщины: конфликт реален, но объёмный замер к нему неприменим, и порог минимальной глубины на такие строки не действует.</p><p class="legend"><span class="red">● Элемент А выделен красным</span> · <span class="blue">● элемент Б — синим</span></p><input id="search" type="search" placeholder="Поиск по всему отчёту"><select id="state"><option value="">Все состояния</option>${Object.entries(
    we
  ).map(([a, s]) => `<option value="${a}">${s}</option>`).join(
    ""
  )}</select>${t.type === "intersection" ? '<input id="depth" type="number" min="0" step="1" placeholder="Глубина от, мм">' : ""}<span id="count"></span><div class="wrap"><table><thead><tr>${["Снимок", "№", "Состояние", "Глубина, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "X", "Y", "Z", "Назначение", "Комментарий"].map((a) => `<th>${a}</th>`).join("")}</tr></thead><tbody>${e.map((a, s) => `<tr data-state="${a.state}" data-depth="${a.penetrationMm ?? 0}"${a.unmeasured ? ' data-unmeasured="1"' : ""}><td>${Pe(a.image) ? `<button class="shot" type="button"><img src="${a.image}" alt="Снимок конфликта ${s + 1}" loading="lazy"></button>` : "Снимок отсутствует"}</td>${[s + 1, we[a.state], t.type === "duplicates" ? "—" : a.unmeasured ? "не определена" : (a.penetrationMm ?? 0).toFixed(1), a.a.name, a.a.model, a.a.guid, a.b.name, a.b.model, a.b.guid, ...a.point.map((n) => n.toFixed(4)), a.assignee, a.note].map((n) => `<td>${i(n)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><dialog id="picture"><button id="close-picture">Закрыть</button><img id="full-picture" alt="Снимок конфликта"></dialog><script>const modal=document.getElementById("picture");document.getElementById("close-picture").onclick=()=>modal.close();for(const b of document.querySelectorAll(".shot"))b.onclick=()=>{document.getElementById("full-picture").src=b.querySelector("img").src;modal.showModal()};const PREC=${Number(t.precision) || 0},q=document.getElementById('search'),s=document.getElementById('state'),d=document.getElementById('depth'),rows=[...document.querySelectorAll('tbody tr')];function filter(){let n=0;for(const r of rows){r.hidden=!!((s.value&&r.dataset.state!==s.value)||(d&&!r.dataset.unmeasured&&Number(r.dataset.depth)+PREC<Number(d.value||0))||!r.textContent.toLowerCase().includes(q.value.toLowerCase()));if(!r.hidden)n++}document.getElementById('count').textContent='Коллизий: '+n}q.oninput=s.onchange=filter;if(d)d.oninput=filter;filter()<\/script></html>`;
}
function At(t, e) {
  return JSON.stringify(
    {
      version: 1,
      id: t.id,
      name: t.name,
      images: Object.fromEntries(
        e.filter((i) => Pe(i.image)).map((i) => [i.id + ".jpg", i.image])
      ),
      warnings: t.warnings,
      tests: [
        {
          id: t.id,
          name: t.name,
          clashes: e.map((i, a) => ({
            id: i.id,
            name: `Конфликт ${a + 1}`,
            distance: t.type === "duplicates" ? "" : i.unmeasured ? "не определена" : `${(i.penetrationMm ?? 0).toFixed(1)} мм`,
            date: t.lastRun || "",
            description: t.type === "duplicates" ? "Дублирование" : "По пересечению",
            status: we[i.state],
            group: i.assignee,
            note: i.note,
            point: i.point,
            image: Pe(i.image) ? i.id + ".jpg" : "",
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
              "Расчётная глубина пересечения, мм": i.unmeasured ? "не определена" : String(i.penetrationMm ?? 0)
            }
          }))
        }
      ]
    },
    null,
    2
  );
}
const Ct = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAydpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAzIDc5Ljk2OTBhODdmYywgMjAyNS8wMy8wNi0yMDo1MDoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDZFQkU2NEQ4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDZFQkU2NEM4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI2LjExIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRENDVBNjQzODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRENDVBNjQ0ODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+pHX+ogAAD+lJREFUeNrsnXtwVPUVx2/CZvMgQEhCSAwJJDzDqwgodCq08hAr7wpSo1M6o/5Rq6NUcdqp1XamdjqOY6mvWhWnttZpRRtbaRGpMMKMZlB8gaFaQoQQSEhIQt7hkfTzhY1ulnt37929mw1T7sxls3vv/f3O7/zO43vO7/wucd3d3calI/zDo3927txpnDx5MqaEpKenpyUlJWUlJCQM6+rqSm1vb/fyGRcfH9+dkpLSGRcX13Lq1Knajo6Omvr6+ia+x4zWtLQ0Y86cOee/SAKLiopiyjwYlz5ixIhyPk8PGDBAKnHB6fF4unU9Ly+vDCanxpLeqVOnnuObznj9kJycHFMGwpRrjh8/Xoh0ec6ePWt6z5kzZwxdr62tLcrPz786lvT68ys+1jYEaTJQx+tRT1v3w0QDabweSe0XNjDmDBwyZEh6U1PTPCfPtLS0LOK5QZcYyDF48OAFjY2N6U6eaWhoyIaBc//vGSg1RIXXSC2dHG1tbYbX610dS08cUwYmJiYa2dnZWRMmTFiO9C0Ipw3UfgnoYfHw4cMzYWZscWAEeChj2LBha8CQm+vq6g6D26xnKj5eWC+dZ67l71VI0dxDhw5lYM/C6vvYsWMZzc3Nm4cOHVo7atSot/Hem6DjzRMnTjQGCw4k9RkZGYWYgGtrampeZCKaIuKgOps+fbrj55AgwYmPkabunJyceqThEaQhT4wKJPiyyy4bx/VHgStVQABTnBfpCdjuhp7D9PMw9BQGemnRBc0FXP8tdDaKbhj/Hn+Pdjr2WbNmfYkDw2IgjJgDMdX+A1DEwG8nUEsNYJTUSp98fzIrK6tF16PBuMBT/cCUk/T7Gz5HiI7c3NwxfN8gxgXSweRWcv3KPmOgQG9mZmaz1QAUScDIhvHjx/8Zgmsx9GExAjXrLigo6Ebrw2YkdBwdN26c6GgKNoGYoXoioblRZyAqsoDOWqMlOVJDbKQY10Zf3VJ3feo7Nuvc92hJsqQWJn7DKQNtOxHEfCZw4xVCqRS3PNigQYMEpCv5/BBJfa+zs3MfElyB1D1RWlp6le45fPiwMXv27D2o4p04ikI+p0D4FTiQaXjw3HCdUOCBQxmMxJZgdubhoPa56kRQ2REw8LAbMy3jjRmoxiY9VVhYuABmDRKs6TnGjBlTTNKg1zP6zu83+sMgVHwwTmAhpuIZJKcWxroiibT1OTRluabCqampKajQO5ESBmCWOn6GF7wLdckyi2WZpALOBrPn9TsGv8AMliA52UzIj5iYA+onUloZ778xJ4muMBD1SoGwzyIhiIE3MMCfgNks01AQrLTa1mDt6LruC5JTHEI/D8ppRELvyJEjPxo4cKDXNScyevTomwPVyq668uxmGDg2VNg1ceLEO0JhRF2HiT8M1o76ob8izMO2cNRajoxnV7rqhZFCL7OyzwkhOIcuIMRPmUk70GgCxrvFTrvc18z940O1iekZgH38JbQ7Vd/3oHmA6zAGSbrJrhTidFox8KsCo5IgA93pZJCo6ds8F28nWQFDbka1OxxI34qo4EBmMgGmfBqKCHCiJGS+HQQgdUN175OqOzUNPLfeTjZG9+C8FsPEdhvS9z7SFx81II0UrglmpyCykxn8tl0IhVmYisFvDxP4tsOYqXb7gjkrMStnrNqDcWe5Z4lTIO0onQWQbfAt+lxwyNYRRfzg4MGDW2wmUhOQpGcBsElhAt8kJvNZtWPn/i+++KIE03K31fqPxqXxRS0bIxVmhj62in9xGE9pfcOu6k6aNOnBSMGvnqedB+wmVpVYgM4XrMJBNOxd7GB0VJhI4HtWtgpV2oskpNhcwjRwGt/CVp5yI3JQO7T3TbVr5wCLDiHaOGDlRGDid1yPhQVjWFa8j1jVbFFI4n8Xeck2q0Qqz3tQ78kQOI+k6yLWNOYQUycYLhxqBwncgj3dRV9bSdRuJ0beS6x81izBS98nsdXr8OL/CIyjtVQAU36MOXqttbW1yzUVxjEs1eyYzRoq8XJgSl2xKjnATKR2Cd7ycWZ1H/any40wK1S4qH7UH/0+pv5Fh3+s3UPf2LFj/2nWhnAjaONq1yRQdo2ZvUWzY5LSbyeNvl5runQcx/ciZk+dL2J2Z2PohyEJfbY+cfr0aYOlhTjOSXydBE13oiG12O5Svm9FqnYgnWWiCfru4fpC/u6lCbpGaH0ra887tJgf8ZoI4p6Lei40U01sz9sQlE9m5A6YOB9mToFpHruL5NE+xAzOYfy5FC1ZygSfAf7sxQa+hfS8zue7e/bsmRuo6jD3OmxlJuahLmIVRtRvCfSWwoL8LuDZKpEPN+scq1P04vTOJWo1jkBs60uffTdiFZaU4SCuC5QoPJ9x5MgRgwqqFOMiPDRwLcZxJgsXajxK3Bp+5SOYLgUEfwlrXRj9V6NDMcSrUdG5JoDa6C+1KYYLi/tmBU2Yo4WMfwVOaYj4EdQGqgHdhN6nq2QCyVuB07imoqIiB8N7wUMwtWvmzJmf7Nq1a1qwteCLgXkzZswo271798TAa0ePHs2BiSX4gCqY+CYOpYTvu6hNbOzFcH1ZsmTJdFz/CyQBjuFF7YDXJmZnFHZix8Vk+wJP6H9r8uTJExTDh7oX3KhEaxWQ7vnly5dP7RWJFBcXb3TSMThpr5A/uTmCkPyai5F5ohu4kqcYnr/LnTy7du3ax3slE3ASmU5EH3Uvl+qyenUYULrWt3Z70RyiV3RXV1dX+szXQSfPo85ZvZwIbj3DSQPcXynQqoPsyxuk0H9mNxaN9SE6off+8vLyN3rANzb/iMPxD+vFQBxFooOHJbp1PQU8mkGY+BA29LX+UG4WCpZBZwn0/qrH+Yl+6K5z0g78SurFQJIEHidE0GFbYBBOjfMtGNj/9mcGApw/h85bTcLSNieT788v1+oDCXvqmc1iDHN7f2Se6BJ9otP1AksM6hm7D0j0Ud9ki6zv+xjoO1Sy0Z8O0SO6oG+PxS0pTjYc+fMr3peO73QSBnFkWon8gQMHngcvPR0MvfflITqg53eiywpMczhyovCroxcDYYpTsc6zYpDi5srKynUY69L+wECl6UWPVYZI40CrRjiMpet6MZDA+YRDHDQaMba0uoQ8HaSEbqKepTqWzKP/Y6IDejqDwJoEoEyBQ6mu/ZKBsmm45d8zU6/QYb2dXUtkKwqxKzlG8FWzg2SxYyqFqFopdFSEsI/5jGdkqLZUk0P+sA6k8VeyOF+aA49gCcXepaRzVpMYzeYmbXpZAVPnEThnmG1BIEk5kFT5FMXcweAOkxNTdI3XTQpVHYEETqMwPcFqSxfOp5Y4eDtjKYFxO5iQ4/zWOxsjQypEXn3+eIkE6ktkZoYTbC/C7W/goaGBuI9n5uNItlp5LxHOtaQY5/2SguE70ci5kLzmBdeI88WodYx/G8C7tify8nM81jhQBhem1ezfv/+PMHKnmSfGDi7TaluIiCUxxgxMDCaB0J+EMCwyzLegbSsrK3sJ4N2LeY422ijMQXS3mC2Ys3Aznhm6KtjsMgBvjBnoDSaBmKz5mKlRZhuBEJAtdrBhyEgED/Yvrb4ZF274k/243aoaIU4LD/1YArUUize93Wy1Ea3T/pttrmz1YiG6kgWY7Rbh2zKytWMtJHBAP5FA07UHnODXUM9rLFT7DSTzuCsM9AHQ58xKa/FeiXT2oJkUQrinPzCQifSYSR8e9hcsTXhM6hXlUJ+zsyZsO5mApG0hjf+Z2TVmsRjoM8dEAj3Yz4RYMpD+TRnI0oX2yS03e4Zxfsh4t7u6WxN70MmsPRJYImGcX2CKg9DHkMTEfiiBqpvxBFRTpCJhG8z2GAr3wfCHwcBnXd/uyoz9CWy03+xaVVXVNLK8v/aPjyEkAcZ6YiyBCaLD8CtTwfY9ypq2aY0149sDDt4Ulf3CkkJm817fqt0FL4SAiXejGsV+EpggCQhn4LJRlGC0UjXwAZ9t4e4Hpn+P6OjBpdB3G8y7zWwpFkfJz13rnUif4/3CEJFkhY0Ea1Dx51ixO0bebQcz73Uigb79xN1AiFIkWXt//654GqNOmD56GZO0GkQwG+8YZ3ct2qfCXl858XU8+6QZbPHdq3fUJEatQpWBeKwqVP1PVKQBqblCZWUA1dOh7tfmQhhUxjrzQwxyurygRf9iwnTdR0Bfps2HNnZ8noaWDLLRc4LtMO05abcUtBEXlQpVBnmD3c3SSNIJOlnvA+BmBd1apD4CM5QFmsd9Xoc75b08N1/Pqx2rYgCkuY2NivfzedIO3WoHIVnsOgMlfajmRw4Xrs8VOxp+WxNwNI3sNHqFoszVwIW0SOtr9LzaUXtqV+37lyHTvzY2Ot1o806oOulwtnrd4HSrvl7VxHPa/dh9+eWXf8zmmJtQp5xovSDC53hy6Odm+lMN4Ln+RYcTuu1IoaNtDkhfMrjpAbOUT4istUFx0jnnAlZMIzHhxcNVR6v4Uu3iIGr14jKcRZr6Vf92IwrjqzVfwZ+fI4Vet7wwzim+wwgPh4l5OvNRrefBWeuQjMcJATeRzWl049V78t6oagZ27gaSv3eCAIoinSTalLTEueaF8agFDP6oG0U9vm38hygPfgQH8HUcQqLd/SX+6oqj0j7muXqZBO1VhbOb1DDfl1yB9851dZsD8W4FkrNKdXJIzsBIZlemgOWDfPDZPYDXe4AjBzD+eyBmN5LzKav+lZz1fO9Ags8qq8OZjASnw7g8PrWUcAUqOhNVLVBI5tZLJBEUacX1aEiV60AaBP8OErOGDv5GB143ymz10kfOMXwdg7Ffo8IfGNSFd21BKmU2ZMA82LEkbNMggWjtVXFq1+wcePM2+l/F5H4QtRfv+HY+Lg2281F5VL0nBmhRohmNZSE5/dcRDpbAnPZghfBoVhNwZ6ERxmtP4p0ymxl6Hc+8DMhQH8hcCG7Gtj2Jqs3gvpVI1Sy+/wEC+2zfg+gQw5jAZ5DkK1lUX4lkzdTLKSRlJgmEGuzyYu7bZvTlq5/oeBqz9h9tgYCZzQDZp/htTCA4loPAfk7h+tMY6Dqne4PtnnIi9FNDP0/QT1Fg5YS+Y2sncP1ZvftGu5owSZ/oFVZGX7/6yfiq0jObmb4XIsaGqoURY2F0Nip1K+cWBtMU6Xu0tP1M0Qftbeb8PhqQFSq6EZ1imujWy9PCGbdrDDQiqxLNo8D7Rql9OMyDCfU8vwqpz+3r6tiYM9BfGrBNr4XDQJ570c47GaLNwJi+wVJwhPNls6UCI0SdCuHlpv6wRyXm71DV+ithWKPDdFYN4eEOw7j0ElrFybUsSDliBjBqGwC86RIDjfPbDLAlr9qNh+UwyOy8avXC7pgw0Gwrf18ebNjZijc+EgoK6TrQqZxyvO2xpNe/5O8cxRs3bjT6cme5yVEHJpzBZzbAPAvpSiW3l+j/nxGA75qZ6OMQf4xYvCnGr67/KvK59N9hRHb8T4ABAPaAkPNeKkdCAAAAAElFTkSuQmCC", $t = ":host{display:block;height:100%;color-scheme:dark;font:13px/1.4 Segoe UI,sans-serif;color:#dbe5f0;container-type:size}*{box-sizing:border-box}[hidden]{display:none!important}main{height:100%;min-height:260px;background:#171d25;display:flex;flex-direction:column;overflow:hidden;-webkit-user-select:none;user-select:none}button,input,select,textarea{font:inherit;color:inherit;border:1px solid #425165;border-radius:6px;background:#253140;padding:7px 9px;min-width:0}button{cursor:pointer;white-space:nowrap}button:hover{background:#354459}button:disabled{opacity:.45;cursor:default}.primary{background:#b99a38;border-color:#d0ae46;color:#111820;font-weight:600}.primary:hover{background:#e0bd51}button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid #f2c94c;outline-offset:1px}input,select,textarea{background:#111a24}input,textarea,td,dd{-webkit-user-select:text;user-select:text}input[type=checkbox]{accent-color:#e6c354;width:16px;height:16px}header{display:flex;gap:7px;align-items:center;padding:8px 12px;border-bottom:1px solid #354459;flex-shrink:0;overflow-x:auto}.brand{display:flex;gap:7px;align-items:center;margin-right:8px}.brand img{width:32px;height:32px;object-fit:contain}.brand b{font-size:17px}.brand small{font-size:10px;color:#a6b5c7}#dirty{margin-left:auto;font-size:11px;color:#cabb81;white-space:nowrap}.notice{background:#1c2735;padding:5px 12px;font-size:12px;min-height:27px;max-height:70px;overflow:auto;color:#a7bbd1}.notice.error{color:#ffaaa1;background:#412725}.workspace{display:grid;grid-template-columns:230px minmax(0,1fr);flex:1;min-height:0}aside{padding:10px;display:flex;flex-direction:column;gap:9px;border-right:1px solid #354459;min-height:0}#checks{overflow:auto;flex:1;min-height:0}.check-item{display:flex;flex-direction:column;gap:5px;width:100%;margin-bottom:5px;text-align:left;white-space:normal}.check-item small{color:#a8b7ca}.check-item.active,.tabs .active{border-color:#c7ab56;background:#403b2c;color:#ffe399}.main{display:flex;flex-direction:column;min-width:0;min-height:0}.test-toolbar{display:flex;gap:7px;padding:8px 12px;align-items:center}.test-toolbar input{flex:1;font-weight:600}.tabs{display:flex;gap:7px;border-bottom:1px solid #354459;padding:0 12px 8px}.tabs button{min-width:105px}#content{flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column}.empty{padding:28px;color:#a4b4c9;text-align:center;margin:auto}h2,h3,p{margin:0 0 10px}h2{font-size:20px}h3{font-size:15px}label{display:flex;flex-direction:column;gap:5px;font-size:12px;color:#b8c6d7}.check{flex-direction:row;align-items:center;gap:6px}small{font-size:11px;color:#a8b7c9}.parameters{display:flex;gap:18px;align-items:end;padding:10px 12px}.parameters input{width:140px}.selection-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0 12px 12px}.selection{border:1px solid #39495e;border-radius:8px;padding:12px;background:#1b2633;min-width:0}.selection h3{display:flex;justify-content:space-between}.selection h3 span{color:#92c4b2;font-size:12px}.selection select[multiple]{width:100%;min-height:70px}.selection-tools{display:flex;gap:5px;flex-wrap:wrap;margin:8px 0}.selection-tools button{font-size:11px;padding:5px 7px}.selection>label{margin-bottom:8px}.condition{display:grid;grid-template-columns:minmax(80px,1fr) 100px minmax(70px,1fr) 29px;gap:5px;margin:6px 0}.condition button{padding:3px}.rules,.report{padding:18px;max-width:850px}.rules>label{margin:14px 0}.rules>p,.report>p{color:#a9b8cb}.report>button{margin:12px 8px 14px 0}.result-tools{display:flex;gap:7px;flex-wrap:wrap;padding:8px 12px}.result-tools input{flex:1;min-width:180px}.result-area{display:grid;grid-template-columns:minmax(0,1fr) 300px;flex:1;min-height:0}.table-area{display:flex;flex-direction:column;min-width:0;min-height:0}.scroll{overflow:auto;flex:1;min-height:0}table{border-collapse:separate;border-spacing:0;width:max-content;min-width:100%}th{position:sticky;top:0;background:#2a3748;z-index:1;text-align:left;max-width:240px;white-space:normal}th,td{padding:8px;border-bottom:1px solid #344154;vertical-align:top}td{max-width:320px;min-width:90px;overflow-wrap:anywhere;-webkit-user-select:text;user-select:text}td:first-child{min-width:36px}tr.active td{background:#453e29;color:#fff0b5}tr:hover td{background:#2c3847}.pager{display:flex;gap:10px;align-items:center;justify-content:center;padding:5px;border-top:1px solid #39495e;font-size:11px}.pager button{padding:2px 8px}.detail{border-left:1px solid #354459;padding:10px;overflow:auto}.detail h3{overflow-wrap:anywhere}.detail>label{margin:10px 0}.detail p{font:11px/1.5 Consolas,monospace}.detail details{border-top:1px solid #354459;padding:8px 0}summary{cursor:pointer}dl{font-size:11px;display:grid;grid-template-columns:1fr 1fr;gap:7px}dt,dd{overflow-wrap:anywhere;margin:0}dt{color:#9baec4}footer{border-top:1px solid #354459;padding:4px 12px;display:flex;justify-content:space-between;color:#91a4bb;font-size:11px}dialog{border:1px solid #53647c;border-radius:12px;background:#202c3a;color:#dbe5f0;width:min(700px,92vw);max-height:85vh;padding:20px;box-shadow:0 15px 60px #000a}dialog::backdrop{background:#000a}dialog p{margin:12px 0}dialog a{color:#f2c94c;margin-right:12px}.dialog-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:16px}@container (max-width:950px){.workspace{grid-template-columns:185px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 240px}.selection-grid{grid-template-columns:1fr}.parameters,.test-toolbar{flex-wrap:wrap}.test-toolbar input{flex-basis:100%}}@container (max-height:400px){header{padding:5px 10px}.test-toolbar{padding:5px 10px}.tabs{padding-bottom:5px}.brand img{width:25px;height:25px}footer{display:none}}:host{font-size:12px}.brand img{background:#e1e7ef;border-radius:5px;padding:3px}.selection-tools button{font-size:12px}label{font-size:13px}.choose-layout{display:grid;grid-template-columns:220px minmax(0,1fr);min-height:0;flex:1;overflow:auto}.choose-layout .parameters{display:flex;flex-direction:column;align-items:stretch;gap:15px;border-right:1px solid #354459;justify-content:flex-start}.choose-layout .parameters input{width:100%}.choose-layout .parameters input[type=checkbox]{width:16px}.choose-layout .selection-grid{padding:10px 12px;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start;min-width:0}.selection select[multiple]{height:180px;resize:vertical}.selection-mode{font-size:12px;color:#b6c4d5}.preset-row{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:9px}.preset-row select{flex:1 1 160px}.preset-row button{padding:5px 7px;font-size:12px}.model-list{height:150px;overflow:auto;border:1px solid #425165;border-radius:6px;background:#111a24;padding:5px;margin-bottom:5px}.model-list label{display:flex;flex-direction:row;align-items:center;gap:7px;padding:4px 5px;color:#dbe5f0;overflow-wrap:anywhere}.model-list label:hover{background:#253140}.model-list .model-all{position:sticky;top:-5px;z-index:1;background:#1f2b39;border-bottom:1px solid #425165;font-weight:600}.legend{display:flex;gap:12px;flex-wrap:wrap;font-family:inherit!important}.part-a{color:#ff6161}.part-b{color:#65baff}.preview{display:block;width:100%;padding:5px;margin:8px 0}.preview img{display:block;width:100%;max-height:180px;object-fit:contain}.image-dialog{width:94vw;max-width:1500px}.image-dialog img{display:block;max-width:100%;max-height:75vh;margin:10px auto}#help-dialog{width:min(1000px,94vw);line-height:1.6}#help-dialog details{padding:12px 0;border-bottom:1px solid #425165}#help-dialog summary{font-size:16px;font-weight:600;color:#f0d27a}#help-dialog li{margin:8px 0}@container (max-width:1100px){.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .selection-grid{grid-template-columns:1fr}.condition{grid-template-columns:minmax(60px,1fr) 100px minmax(60px,1fr) 29px}}@container (max-width:700px){.choose-layout{display:block}.choose-layout .parameters{border-right:0;border-bottom:1px solid #354459}.workspace{grid-template-columns:160px minmax(0,1fr)}}button,input,select,textarea{padding:5px 7px;border-radius:5px}button{min-height:27px}input[type=checkbox]{width:14px;height:14px}.commandbar{position:relative;display:flex;gap:8px;min-height:45px;padding:5px 8px;overflow:visible;background:#131b25}.brand{flex:0 0 auto;margin-right:0;gap:5px}.brand img{width:28px;height:28px}.brand b{font-size:14px}.check-heading{display:grid;grid-template-rows:25px 12px;flex:0 1 230px;min-width:145px}.check-heading input{height:25px;border:0;background:transparent;padding:2px 5px;font-weight:600}.check-heading small{padding:0 5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:9px}.tabs{align-self:stretch;align-items:center;flex:0 0 auto;gap:3px;padding:0;border:0}.tabs button{flex:0 0 auto;min-width:0;padding:5px 9px;background:transparent;border-color:transparent}.tabs .active{background:#3e3828;border-color:#b99a38}.header-actions{display:flex;align-items:center;gap:4px;margin-left:auto}#dirty{margin-left:0;width:0;height:0;overflow:visible;font-size:0}#dirty:not(:empty){width:7px;height:7px;border-radius:50%;background:#e5bd43;box-shadow:0 0 0 2px #e5bd4328}.more-menu{position:relative;z-index:20}.more-menu summary{display:grid;place-items:center;width:29px;height:29px;border:1px solid #425165;border-radius:5px;background:#253140;cursor:pointer;list-style:none;font-size:18px}.more-menu summary::-webkit-details-marker{display:none}.more-popover{position:absolute;right:0;top:calc(100% + 5px);display:grid;width:190px;gap:3px;padding:6px;border:1px solid #506176;border-radius:7px;background:#192431;box-shadow:0 12px 35px #000a}.more-popover button{text-align:left}.notice{min-height:23px;max-height:45px;padding:3px 9px;font-size:10px}.run-progress{display:grid;grid-template-columns:minmax(150px,auto) minmax(120px,1fr) auto;align-items:center;gap:8px;min-height:24px;padding:3px 9px;border-bottom:1px solid #425165;background:#202a20;color:#d9e7d2;font-size:10px}.run-bar{width:100%;height:7px;overflow:hidden;border-radius:2px;background:#101810}.run-bar i{display:block;width:0;height:100%;background:#e3bc43}#run-phase,#run-value{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#run-value{text-align:right;color:#b9c9b3}.workspace{grid-template-columns:190px minmax(0,1fr)}aside{gap:6px;padding:7px;background:#141c26}.aside-title{font-weight:600;font-size:12px}.aside-actions{display:grid;gap:5px}.check-item{gap:2px;margin-bottom:3px;padding:6px 7px}.check-item small{font-size:9px}.main{background:#171d25}#content{overflow:hidden}.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .parameters{gap:9px;padding:8px}.choose-layout .selection-grid{gap:8px;padding:8px}.selection{padding:8px}.selection h3,h3{font-size:13px;margin-bottom:6px}label{gap:3px;font-size:11px}small,.selection-tools button,.preset-row button{font-size:10px}.model-list{height:125px}.model-list label{padding:2px 4px}.selection-tools{gap:4px;margin:5px 0}.selection-tools button,.preset-row button{padding:3px 5px;min-height:23px}.result-tools{display:flex;align-items:center;justify-content:space-between;gap:6px;flex-wrap:nowrap;min-height:38px;padding:5px 7px;border-bottom:1px solid #354459;background:#151f2a}.result-filters,.bulk-tools{display:flex;align-items:center;gap:5px;min-width:0}.result-filters{flex:1}.result-filters input[type=search]{flex:1 1 190px;min-width:120px}#result-depth{flex:0 1 125px;min-width:92px}#result-count,#selection-count{color:#9fb0c4;white-space:nowrap;font-size:10px}.bulk-tools select{max-width:125px}.result-area{grid-template-columns:minmax(0,1fr) 310px}th,td{padding:5px 6px;font-size:11px;line-height:1.25}th{max-width:190px}td{max-width:260px;min-width:76px}.pager{justify-content:flex-end;min-height:29px;padding:3px 7px}.pager #selection-count{margin-right:auto}.detail{display:flex;flex-direction:column;min-width:0;padding:0;overflow:hidden;background:#141e29}.detail-head{display:flex;align-items:center;justify-content:space-between;gap:6px;min-height:47px;padding:7px 8px 4px}.detail-head>div:first-child{min-width:0}.detail-head small{color:#8093aa;letter-spacing:.08em}.detail-head h3{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin:0}.detail-nav{display:flex;gap:3px}.detail-nav button{min-width:27px;padding:2px 7px;font-size:17px}.clash-summary{display:flex;gap:5px;padding:0 8px 5px;color:#adbdcf;font-size:9px}.clash-summary span{padding-right:5px;border-right:1px solid #405064}.clash-summary span:last-child{border:0}.detail .legend{margin:0;padding:0 8px 5px;font-size:10px}.preview-slot{height:clamp(92px,18cqh,145px);flex:0 0 auto;margin:0 7px 6px;overflow:hidden;border:1px solid #37475b;border-radius:6px;background:#0e151d}.preview{position:relative;width:100%;height:100%;margin:0;padding:0;border:0;background:transparent}.preview img{width:100%;height:100%;max-height:none;object-fit:contain}.preview span{position:absolute;right:5px;bottom:5px;padding:3px 6px;border-radius:4px;background:#101923db;font-size:9px}.preview-empty,.detail-empty{height:100%;display:grid;place-content:center;justify-items:center;gap:4px;color:#788ba1}.preview-empty>span,.detail-empty>span{font-size:24px}.detail-actions{display:grid;grid-template-columns:1fr 1fr;gap:5px;padding:0 7px 7px}.detail-scroll{flex:1;min-height:0;overflow:auto;padding:7px 8px 12px;border-top:1px solid #354459}.detail-scroll>label{margin:7px 0}.detail p{font:inherit}.coordinates{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;font:9px/1.3 Consolas,monospace;color:#91a3b7}.coordinates span{overflow:hidden;text-overflow:ellipsis}.detail details{padding:6px 0}.detail dl{font-size:10px}.detail-empty{padding:20px;text-align:center}footer{padding:2px 8px;font-size:9px}@container (max-width:1050px){.workspace{grid-template-columns:165px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 270px}.check-heading{flex-basis:185px}.tabs button{padding-inline:6px}#dirty{display:none}}@container (max-width:820px){.brand b,.brand small,#result-count{display:none}.check-heading{flex-basis:155px}.result-tools{overflow-x:auto}.result-area{grid-template-columns:minmax(0,1fr) 245px}}@container (max-height:410px){.notice,footer{display:none}.preview-slot{height:90px}}", je = /* @__PURE__ */ new WeakMap(), at = "nashepo.collisionfinder360.project.", Le = () => ({
  format: "nashepo.checks",
  version: 1,
  checks: [],
  sets: []
}), We = (t) => {
  if (!(!t || typeof sessionStorage > "u"))
    try {
      const e = sessionStorage.getItem(at + t);
      return e ? it(e) : void 0;
    } catch {
      return;
    }
}, Xe = (t, e) => {
  if (!(!t || typeof sessionStorage > "u"))
    try {
      sessionStorage.setItem(
        at + t,
        JSON.stringify(e, (i, a) => i === "image" ? void 0 : a)
      );
    } catch {
    }
};
function zt(t, e) {
  const i = t.shadowRoot || t.attachShadow({ mode: "open" }), a = pt(t);
  let s = e.projectToken(), n = e.projectId(), o = s && (je.get(s) || We(n)) || Le();
  s && je.set(s, o);
  let d, f = o.checks[0]?.id || "", h = "select", m = "", x = 0, w = !1, M = !1, I, z = !0, j = !1;
  const O = /* @__PURE__ */ new Set();
  let oe, A, $ = 0;
  const E = () => o.checks.find((r) => r.id === f), u = (r) => i.querySelector("#" + r);
  i.innerHTML = `<style>${$t}</style><main><header class="commandbar"><div class="brand"><img src="${Ct}" alt=""><b>НашеПО</b><small>${ut}</small></div><div class="check-heading"><input id="name" aria-label="Имя проверки" placeholder="Выберите проверку"><small id="check-summary">Проверка не выбрана</small></div><div id="tabs" class="tabs">${[
    ["select", "Выбор"],
    ["results", "Результаты"],
    ["rules", "Правила"],
    ["report", "Отчёт"]
  ].map(([r, l]) => `<button data-tab="${r}">${l}</button>`).join(
    ""
  )}</div><div class="header-actions"><button id="scan" title="Перечитать список и геометрию выбранных моделей">↻ Модели</button><button id="run" class="primary">▶ Запустить</button><button id="cancel" hidden>Остановить</button><details class="more-menu"><summary title="Другие команды">⋮</summary><div class="more-popover"><button id="open">Открыть проверки</button><button id="save">Сохранить проверки</button><button id="copy">Копировать проверку</button><button id="delete">Удалить проверку</button><button id="settings">Настройки</button><button id="help">Справка</button></div></details></div><span id="dirty"></span></header><div id="run-progress" class="run-progress" hidden><span id="run-phase">Подготовка</span><div id="run-bar" class="run-bar" role="progressbar"><i id="run-fill"></i></div><span id="run-value"></span></div><div class="notice" id="notice" role="status">Откройте IFC/SMDX в проекте и нажмите «Модели».</div><div class="workspace"><aside><div class="aside-title">Проверки</div><input id="test-search" type="search" placeholder="Поиск проверок"><div id="checks"></div><div class="aside-actions"><button id="all">Запустить все</button><button id="new" class="primary">＋ Новая проверка</button></div></aside><section class="main"><div id="content"></div></section></div><footer><span id="model-count">Модели не прочитаны</span><span>Расчёт выполняется на вашем компьютере</span></footer><input id="file" type="file" accept=".json" hidden><dialog id="settings-dialog"><h2>Настройки</h2><label>Дистанция камеры, м<input id="distance" type="number" value="15" min="0.5"></label><p class="links"><a href="https://nashepo.ru/" target="_blank" rel="noopener noreferrer">Сайт НашеПО</a><a href="https://t.me/RoburFan" target="_blank" rel="noopener noreferrer">Telegram</a></p><button data-close="settings-dialog">Закрыть</button></dialog><dialog id="help-dialog">${ct}<button data-close="help-dialog">Закрыть</button></dialog><dialog id="set-dialog"><h2>Сохранить набор моделей</h2><label>Название<input id="set-name" maxlength="120"></label><div class="dialog-actions"><button id="set-cancel">Отмена</button><button id="set-confirm" class="primary">Сохранить</button></div></dialog></main>`;
  const Z = document.createElement("button");
  Z.id = "clear-project", Z.textContent = "Очистить проект", u("save").after(Z), i.querySelector(".more-popover").addEventListener(
    "click",
    () => i.querySelector(".more-menu").removeAttribute("open")
  );
  const F = (r, l = !1) => {
    u("notice").textContent = r, u("notice").classList.toggle("error", l);
  }, R = (r, l, c, p) => {
    const g = u("run-progress"), v = u("run-bar"), b = u("run-fill");
    if (g.hidden = !1, u("notice").hidden = !0, u("run-phase").textContent = r, c && c > 0 && l !== void 0) {
      const y = Math.max(0, Math.min(100, l / c * 100));
      b.style.width = `${y}%`, v.setAttribute("aria-valuemin", "0"), v.setAttribute("aria-valuemax", "100"), v.setAttribute("aria-valuenow", String(Math.round(y))), u("run-value").textContent = `${Math.round(y)}% · ${l}/${c}` + (p === void 0 ? "" : ` · найдено ${p}`);
    } else
      b.style.width = "0", v.removeAttribute("aria-valuenow"), u("run-value").textContent = p === void 0 ? "" : `Найдено ${p}`;
    v.setAttribute("aria-valuetext", u("run-value").textContent || r);
  }, k = () => {
    u("run-progress").hidden = !0, u("notice").hidden = !1;
  }, C = async (r) => {
    try {
      await r();
    } catch (l) {
      F(l instanceof Error ? l.message : String(l), !0);
    }
  }, T = () => new Promise((r) => {
    const l = u("set-dialog"), c = u("set-name");
    let p = !1;
    const g = (v) => {
      p || (p = !0, l.close(), r(v));
    };
    c.value = "Новый набор", u("set-confirm").onclick = () => {
      const v = c.value.trim();
      v ? g(v) : c.focus();
    }, u("set-cancel").onclick = () => g(), l.oncancel = (v) => {
      v.preventDefault(), g();
    }, l.showModal(), c.focus(), c.select();
  }), P = () => {
    j = !0, u("dirty").textContent = "Есть несохранённые изменения", s && je.set(s, o), Xe(n, o);
  }, de = () => {
    const r = e.projectToken();
    return !r || r === s ? !1 : (!s && (o.checks.length || o.sets.length) ? je.set(r, o) : o = je.get(r) || We(e.projectId()) || Le(), je.set(r, o), s = r, n = e.projectId(), d = void 0, f = o.checks[0]?.id || "", m = "", O.clear(), x = 0, j = !1, e.clear(), u("dirty").textContent = "", !0);
  }, N = () => {
    const r = E();
    r?.lastRun && (r.status = "stale"), P(), Y();
  }, te = () => [
    ...new Set(
      (d?.elements || []).flatMap((r) => Object.keys(r.properties))
    )
  ].sort(), L = (r, l) => r.map(
    (c) => `<option value="${ee(c)}" ${c === l ? "selected" : ""}>${ee(c)}</option>`
  ).join("");
  function D() {
    const r = E(), l = u("result-search")?.value.toLowerCase() || "", c = u("result-state")?.value || "", p = Number(u("result-depth")?.value || 0);
    return (r?.results || []).filter(
      (g) => (!c || g.state === c) && (r?.type === "duplicates" || g.unmeasured || // Same allowance as the calculation itself, so one number typed in
      // three places always selects the same conflicts.
      (g.penetrationMm ?? 0) + (r?.precision ?? 0) >= p) && (!l || JSON.stringify({ ...g, image: void 0 }).toLowerCase().includes(l))
    );
  }
  function Y() {
    const r = u("test-search").value.toLowerCase();
    u("checks").innerHTML = o.checks.filter((l) => l.name.toLowerCase().includes(r)).map(
      (l) => `<button class="check-item ${l.id === f ? "active" : ""}" data-check="${l.id}"><strong>${ee(l.name)}</strong><small>${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[l.status]} · ${l.results.filter((c) => !["resolved", "excluded"].includes(c.state)).length} в работе / ${l.results.length}</small></button>`
    ).join("");
  }
  function se(r, l) {
    const c = d?.elements.filter(
      (S) => (E().includeHidden || !S.hidden) && Ce(S, r)
    ).length || 0, p = r.manualOnly ? ae(r) : r.modelsMode === "selected" ? r.models : (d?.models || []).map((S) => S.id), g = d && p.every((S) => d.indexedModelIds.includes(S)) ? `${c} элементов` : "число после запуска", v = d?.models || [], b = r.modelsMode !== "selected", y = o.sets.map(
      (S) => `<option value="${ee(S.id)}" ${r.presetId === S.id ? "selected" : ""}>${ee(S.name)}</option>`
    ).join("");
    return `<article class="selection" data-side="${l}"><h3>Выбор ${l.toUpperCase()} <span data-selection-count>${g}</span></h3>${r.manualOnly ? '<p class="selection-mode">Только элементы, выбранные вручную</p>' : ""}<div class="preset-row"><select class="preset"><option value="">Набор моделей…</option>${y}</select><button data-selection="load-set">Применить</button><button data-selection="save-set">Сохранить набор</button><button data-selection="delete-set" ${r.presetId ? "" : "disabled"}>Удалить</button></div><div class="model-list"><label class="model-all"><input type="checkbox" class="all-models" ${b ? "checked" : ""}> Все модели</label>${v.map((S) => `<label><input type="checkbox" class="model-check" value="${ee(S.id)}" ${b || r.models.includes(S.id) ? "checked" : ""}> ${ee(S.name)}</label>`).join("") || "<small>Нажмите «Модели».</small>"}</div><small>Отметьте файлы, которые должны участвовать в выборе ${l.toUpperCase()}.</small><div class="selection-tools"><button data-selection="show">Показать выбранные элементы</button><button data-selection="only">Только выделенные в 3D</button><button data-selection="include">＋ Добавить из 3D</button><button data-selection="exclude">− Исключить из 3D</button><button data-selection="reset">Сбросить ручной выбор</button></div><small>Добавлено вручную: ${r.include.length} · исключено: ${r.exclude.length}</small></article>`;
  }
  function H() {
    Y();
    const r = E();
    u("name").value = r?.name || "", u("check-summary").textContent = r ? `${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[r.status]} · ${r.results.filter((l) => !["resolved", "excluded"].includes(l.state)).length} в работе / ${r.results.length}` : "Проверка не выбрана";
    for (const l of ["name", "copy", "delete", "run"])
      u(l).disabled = !r || w;
    for (const l of i.querySelectorAll("[data-tab]"))
      l.classList.toggle("active", l.dataset.tab === h);
    if (!r) {
      u("content").innerHTML = '<div class="empty"><h2>Создайте первую проверку</h2><p>Обновите модели, затем выберите, какие элементы проверять друг с другом.</p></div>';
      return;
    }
    h === "select" && (u("content").innerHTML = `<div class="choose-layout"><div class="parameters"><h3>Параметры проверки</h3><label>Тип<select id="type"><option value="intersection" ${r.type === "intersection" ? "selected" : ""}>По пересечению</option><option value="duplicates" ${r.type === "duplicates" ? "selected" : ""}>Дублирование</option></select></label><label title="Числовая погрешность расчёта">Точность расчёта, мм<input id="precision" type="number" value="${r.precision}" min="0.001" max="100" step="0.1"></label><label title="Конфликты с меньшей оценкой глубины не попадут в результат">Минимальная глубина, мм<input id="min-penetration" type="number" value="${r.minPenetration}" min="0" max="100000" step="1" ${r.type === "duplicates" ? "disabled" : ""}></label><label class="check"><input id="touching" type="checkbox" ${r.touching ? "checked" : ""} ${r.type === "duplicates" ? "disabled" : ""}>Учитывать касания</label><small>Глубина Hard Clash — наименьшая толщина области перекрытия. Она не зависит от густоты сетки и от размеров элементов.</small><p class="legend"><span class="part-a">● Выбор А</span><span class="part-b">● Выбор Б</span></p></div><div class="selection-grid">${se(r.a, "a")}${se(r.b, "b")}</div></div><datalist id="property-fields">${L(te(), "")}</datalist>`), h === "rules" && (u("content").innerHTML = `<div class="rules"><h3>Исключение пар</h3><p>Элемент сам с собой не проверяется. Пара А/Б учитывается один раз.</p><label class="check"><input id="same-model" type="checkbox" ${r.ignoreSameModel ? "checked" : ""}>Не проверять элементы одной модели</label><label class="check"><input id="same-group" type="checkbox" ${r.ignoreSameGroup ? "checked" : ""}>Не проверять геометрию одного составного объекта</label><label>Не проверять пары с одинаковым значением свойства<input id="equal-property" list="property-fields" value="${ee(r.equalProperty)}" placeholder="Без ограничения"></label><label class="check"><input id="hidden" type="checkbox" ${r.includeHidden ? "checked" : ""}>Включать скрытые элементы прочитанных моделей</label><p>Незагруженные подключённые файлы нужно открыть перед расчётом.</p><datalist id="property-fields">${L(te(), "")}</datalist></div>`), h === "results" && (u("content").innerHTML = `<div class="result-tools"><div class="result-filters"><input id="result-search" type="search" placeholder="Поиск по результатам"><select id="result-state"><option value="">Все состояния</option>${Object.entries(
      we
    ).map(([l, c]) => `<option value="${l}">${c}</option>`).join("")}</select>${r.type === "intersection" ? '<input id="result-depth" type="number" min="0" step="1" placeholder="Глубина от, мм">' : ""}<button id="show-markers" role="switch" aria-checked="${z}">${z ? "● Знаки" : "○ Знаки"}</button><span id="result-count"></span></div><div class="bulk-tools"><select id="bulk-state" title="Состояние для выбранных строк">${Object.entries(
      we
    ).map(([l, c]) => `<option value="${l}">${c}</option>`).join("")}</select><button id="bulk">Применить</button></div></div><div class="result-area"><div class="table-area"><div class="scroll" id="table"></div><div class="pager"><span id="selection-count"></span><button id="prev-page">←</button><span id="page"></span><button id="next-page">→</button></div></div><div class="detail" id="detail"></div></div>`, W(), X()), h === "report" && (u("content").innerHTML = `<div class="report"><h3>${ee(r.name)}</h3><p>Результатов: ${r.results.length}. Выбрано: ${O.size}. ${r.status === "stale" ? "Результаты устарели — рекомендуется повторный запуск." : ""}</p><label class="check"><input id="selected-only" type="checkbox" ${O.size ? "checked" : ""}>Только выбранные строки</label><label class="check"><input id="report-images" type="checkbox" checked>Добавить снимки (недостающие будут созданы автоматически)</label><button id="export-html" class="primary">Сформировать HTML-отчёт</button><button id="export-viewer">Сессия для плагина «Коллизии»</button><p>Правила и все результаты сохраняются кнопкой «Сохранить проверки» в верхней панели.</p></div>`), u("content").inert = w;
  }
  const xe = (r, l) => l === "duplicates" ? "—" : r.unmeasured ? "не определена" : (r.penetrationMm ?? 0).toFixed(1);
  function W() {
    const r = E(), l = D(), c = Math.max(1, Math.ceil(l.length / 50));
    x = Math.max(0, Math.min(x, c - 1));
    const p = l.slice(x * 50, x * 50 + 50);
    u("table").innerHTML = l.length ? `<table><thead><tr><th><input id="check-page" type="checkbox" aria-label="Выбрать страницу" ${p.every((g) => O.has(g.id)) ? "checked" : ""}></th>${["№", "Состояние", "Глубина, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "Комментарий"].map((g) => `<th>${g}</th>`).join("")}</tr></thead><tbody>${p.map((g, v) => `<tr data-result="${ee(g.id)}" class="${g.id === m ? "active" : ""}"><td><input type="checkbox" class="row-check" aria-label="Выбрать конфликт" ${O.has(g.id) ? "checked" : ""}></td>${[x * 50 + v + 1, we[g.state], xe(g, r.type), g.a.name, g.a.model, g.a.guid || "—", g.b.name, g.b.model, g.b.guid || "—", g.note].map((b) => `<td title="${ee(b)}">${ee(b)}</td>`).join("")}</tr>`).join("")}</tbody></table>` : '<div class="empty">Нет результатов. Запустите проверку или измените фильтры.</div>', u("page").textContent = `${x + 1} / ${c}`, u("result-count").textContent = `${l.length} результатов`, u("selection-count").textContent = `Выбрано: ${O.size}`, u("prev-page").disabled = x === 0, u("next-page").disabled = x === c - 1;
  }
  function X() {
    const r = E(), l = D(), c = l.findIndex((g) => g.id === m), p = r?.results.find((g) => g.id === m);
    u("detail").innerHTML = p ? `<div class="detail-head"><div><small>КОЛЛИЗИЯ</small><h3>#${c + 1} ${ee(p.a.name)} × ${ee(p.b.name)}</h3></div><div class="detail-nav"><button id="previous" title="Предыдущая коллизия" ${c <= 0 ? "disabled" : ""}>‹</button><button id="next" title="Следующая коллизия" ${c < 0 || c >= l.length - 1 ? "disabled" : ""}>›</button></div></div><div class="clash-summary"><span>${r?.type === "duplicates" ? "Дублирование" : "Пересечение"}</span><span title="${p.unmeasured ? "У элемента нет собственной толщины, объёмный замер невозможен" : "Наименьшая толщина области перекрытия двух элементов"}">${r?.type === "duplicates" ? "Совпадение геометрии" : p.unmeasured ? "Глубина не определена" : `Глубина ${(p.penetrationMm ?? 0).toFixed(1)} мм`}</span><span>${ee(we[p.state])}</span></div><p class="legend"><span class="part-a">● Элемент А</span><span class="part-b">● Элемент Б</span></p><div class="preview-slot">${p.image ? `<button id="open-image" class="preview"><img src="${ee(p.image)}" alt="Снимок коллизии"><span>Открыть крупнее</span></button>` : '<div class="preview-empty"><span>◫</span><small>Снимок создастся после перехода в 3D</small></div>'}</div><div class="detail-actions"><button id="focus" class="primary">Перейти в 3D</button><button id="capture-image">▣ Снимок пары</button></div><div class="detail-scroll"><div class="coordinates">${p.point.map((g, v) => `<span>${["X", "Y", "Z"][v]} ${g.toFixed(3)}</span>`).join("")}</div><label>Состояние<select id="edit-state">${Object.entries(
      we
    ).map(
      ([g, v]) => `<option value="${g}" ${p.state === g ? "selected" : ""}>${v}</option>`
    ).join(
      ""
    )}</select></label><label>Назначение<input id="assignee" value="${ee(p.assignee)}"></label><label>Комментарий<textarea id="note" rows="2">${ee(p.note)}</textarea></label>${[
      p.a,
      p.b
    ].map(
      (g, v) => `<details><summary>Элемент ${v ? "Б" : "А"} · свойства</summary><dl>${Object.entries(
        g.properties
      ).map(([b, y]) => `<dt>${ee(b)}</dt><dd>${ee(y)}</dd>`).join("")}</dl></details>`
    ).join("")}</div>` : '<div class="detail-empty"><span>◫</span><p>Выберите коллизию в таблице</p><small>Двойной щелчок сразу перенесёт камеру в 3D.</small></div>';
  }
  const ae = (r) => {
    const l = new Set(
      !r.manualOnly && r.modelsMode === "selected" ? r.models : []
    );
    for (const c of r.include)
      try {
        l.add(String(JSON.parse(c)[0]));
      } catch {
        const p = d?.elements.find(
          (g) => g.id === c
        )?.modelId;
        p && l.add(p);
      }
    return [...l];
  }, be = () => {
    const r = E();
    if (!(!r || h !== "select"))
      for (const l of i.querySelectorAll("[data-side]")) {
        const c = l.dataset.side, p = [...l.querySelectorAll(".model-check")];
        if (!p.length) continue;
        const g = p.filter((y) => y.checked).map((y) => y.value), v = g.length === p.length, b = r[c];
        b.modelsMode = v ? "all" : "selected", b.models = v ? [] : g, b.conditions = [], b.mode = "all";
      }
  }, fe = (r) => {
    if (!r?.length) return;
    const l = /* @__PURE__ */ new Set();
    for (const c of r)
      for (const p of [c.a, c.b]) {
        if (!p.manualOnly && p.modelsMode !== "selected") return;
        for (const g of ae(p)) l.add(g);
      }
    return l;
  }, ie = (r) => {
    let l = r.trim().replace(/\\/g, "/").toLocaleLowerCase();
    try {
      l = decodeURIComponent(l);
    } catch {
    }
    l = l.replace(/[?#].*$/, "");
    const c = l.split("/").filter(Boolean).at(-1) || l;
    return /* @__PURE__ */ new Set([l, c]);
  }, ke = (r) => {
    const l = new Set(r.map((y) => y.id)), c = r.map((y) => ({
      id: y.id,
      aliases: /* @__PURE__ */ new Set([
        ...ie(y.id),
        ...ie(y.name)
      ])
    })), p = (y) => {
      if (l.has(y)) return y;
      const S = ie(y), q = c.filter(
        (G) => [...S].some((ne) => G.aliases.has(ne))
      );
      return q.length === 1 ? q[0].id : y;
    }, g = (y) => {
      try {
        const S = JSON.parse(y);
        if (!Array.isArray(S) || S.length < 2) return y;
        const q = String(S[0]), G = p(q);
        return G === q ? y : JSON.stringify([G, ...S.slice(1)]);
      } catch {
        return y;
      }
    };
    let v = !1;
    const b = (y) => {
      const S = y.models.map(p), q = y.include.map(g), G = y.exclude.map(g);
      (S.some((ne, re) => ne !== y.models[re]) || q.some((ne, re) => ne !== y.include[re]) || G.some((ne, re) => ne !== y.exclude[re])) && (y.models = [...new Set(S)], y.include = [...new Set(q)], y.exclude = [...new Set(G)], v = !0);
    };
    for (const y of o.checks)
      b(y.a), b(y.b), y.modelsAtRun && (y.modelsAtRun = y.modelsAtRun.map(p));
    for (const y of o.sets) {
      const S = y.selection.models.map(p);
      S.some((q, G) => q !== y.selection.models[G]) && (y.selection.models = [...new Set(S)], v = !0);
    }
    return v && P(), v;
  }, he = () => {
    const r = E();
    if (r)
      for (const l of i.querySelectorAll("[data-side]")) {
        const c = l.dataset.side, p = d?.elements.filter(
          (y) => (r.includeHidden || !y.hidden) && Ce(y, r[c])
        ).length || 0, g = r[c].manualOnly ? ae(r[c]) : r[c].modelsMode === "selected" ? r[c].models : (d?.models || []).map((y) => y.id), v = !!d && g.every((y) => d.indexedModelIds.includes(y)), b = l.querySelector(
          "[data-selection-count]"
        );
        b && (b.textContent = v ? `${p} элементов` : "число после запуска");
      }
  };
  function pe() {
    e.markers(
      D(),
      m,
      z,
      (r) => C(() => V(r, !0))
    );
  }
  function V(r, l = !1) {
    if (!w) {
      if (m = r, h === "results") {
        const c = D().findIndex((g) => g.id === r), p = c < 0 ? x : Math.floor(c / 50);
        p !== x && (x = p, W());
        for (const g of i.querySelectorAll("[data-result]"))
          g.classList.toggle("active", g.dataset.result === r);
        X(), requestAnimationFrame(() => {
          [...i.querySelectorAll("[data-result]")].find(
            (v) => v.dataset.result === r
          )?.scrollIntoView({ block: "nearest", inline: "nearest" });
        });
      }
      if (pe(), l) {
        const c = E()?.results.find((p) => p.id === r);
        c && (e.focus(c, Number(u("distance").value)), K(c));
      }
    }
  }
  function K(r) {
    clearTimeout(A);
    const l = ++$, c = Number(u("distance").value);
    r.image && r.imageScope === "pair-ab" && r.imageDistance === c || !e.canLocate(r) || (A = window.setTimeout(async () => {
      if (!(l !== $ || w || m !== r.id))
        try {
          const p = await e.snapshot(
            r,
            c,
            () => l !== $ || w || m !== r.id,
            !1,
            !1
          );
          if (l !== $ || m !== r.id) return;
          r.image = p, r.imageScope = "pair-ab", r.imageDistance = c, P(), h === "results" && X();
        } catch (p) {
          l === $ && m === r.id && F(
            "Не удалось создать снимок выбранной коллизии: " + (p instanceof Error ? p.message : String(p)),
            !0
          );
        }
    }, 500));
  }
  async function _(r) {
    M = !1, U(!0), R("Создание снимка пары");
    try {
      const l = Number(u("distance").value);
      r.image = await e.snapshot(r, l, () => M), r.imageScope = "pair-ab", r.imageDistance = l, P(), h === "results" && m === r.id && X();
    } catch (l) {
      F(
        "Результаты сохранены. Снимок пары не создан: " + (l instanceof Error ? l.message : String(l)),
        !0
      );
    } finally {
      k(), U(!1);
    }
  }
  async function B(r, l = !1) {
    de(), R("Подготовка моделей");
    let c = l ? /* @__PURE__ */ new Set() : fe(r);
    if (!l && c?.size) {
      const p = await e.scan(
        (g) => R(g),
        () => M,
        /* @__PURE__ */ new Set()
      );
      d = p, ke(p.models) && (c = fe(r));
    }
    d = await e.scan(
      (p) => {
        F(p), R(p);
      },
      () => M,
      c
    ), u("model-count").textContent = `Проиндексировано моделей: ${d.indexedModelIds.length} из ${d.models.length} · элементов: ${d.elements.length}`, H(), F(
      d.blockers.length ? d.blockers.join(" ") : d.warnings.length ? `Модели прочитаны с замечаниями. ${d.warnings.join(" ")}` : "Модели прочитаны. Настройте выборки и запустите проверку.",
      !!d.blockers.length
    );
  }
  const U = (r) => {
    w = r, r && (clearTimeout(A), $++);
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
      u(l).disabled = r;
    u("cancel").hidden = !r, u("content").inert = r, u("checks").inert = r;
  };
  async function Q(r) {
    const l = (p) => {
      const g = `${r.name} · ${p.phase}`;
      F(`${g} ${p.done}/${p.total} · найдено ${p.found}`), R(g, p.done, p.total, p.found);
    };
    let c;
    try {
      c = new jt();
    } catch {
      return It(
        d.elements,
        r,
        l,
        () => M,
        (p) => e.geometry(p, () => M)
      );
    }
    return I = c, new Promise((p, g) => {
      const v = () => {
        c.terminate(), I = void 0, oe = void 0;
      };
      oe = () => {
        v(), g(Error("Расчёт отменён. Предыдущие результаты сохранены."));
      }, c.onmessage = async (b) => {
        if (b.data.load) {
          try {
            const y = await e.geometry(
              b.data.load,
              () => M || I !== c
            );
            if (I !== c) return;
            const S = [
              y.vertices?.buffer,
              y.indices?.buffer
            ].filter(Boolean);
            c.postMessage(
              { request: b.data.request, geometry: y },
              S
            );
          } catch (y) {
            I === c && c.postMessage({
              request: b.data.request,
              error: y instanceof Error ? y.message : String(y)
            });
          }
          return;
        }
        b.data.progress ? l(b.data.progress) : (v(), b.data.error ? g(Error(b.data.error)) : p(b.data.results));
      }, c.onerror = (b) => {
        v(), g(
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
  async function ue(r = !1) {
    if (w) return;
    de(), be();
    const l = r ? [...o.checks] : [E()].filter(Boolean);
    if (!l.length) throw Error("Создайте проверку.");
    for (const c of l)
      for (const p of [c.a, c.b])
        p.conditions = [], p.mode = "all";
    M = !1, U(!0), R("Подготовка моделей");
    try {
      if (await B(l), U(!0), d.blockers.length)
        throw Error(
          "Состав моделей прочитан не полностью. " + d.blockers.join(" ")
        );
      for (const p of l) {
        if (M) break;
        for (const y of [p.a, p.b]) {
          if (y.modelsMode === "selected" && y.models.some((S) => !d.models.some((q) => q.id === S)))
            throw Error(
              `${p.name}: одна из моделей выборки отсутствует. Исправьте выборку.`
            );
          if (y.include.some((S) => !d.elements.some((q) => q.id === S)))
            throw Error(
              `${p.name}: вручную добавленный элемент отсутствует в модели.`
            );
        }
        const g = ft(p);
        if (p.configAtRun === g && p.modelsAtRun?.some(
          (y) => !d.models.some((S) => S.id === y)
        ))
          throw Error(
            `${p.name}: состав моделей уменьшился. Подключите прежние модели или создайте копию проверки для нового состава. Прежние результаты сохранены.`
          );
        const v = await Q(p);
        if (M || !e.isCurrent())
          throw Error(
            "Проект изменился или расчёт отменён. Предыдущие результаты сохранены."
          );
        const b = (/* @__PURE__ */ new Date()).toISOString();
        p.results = gt(
          p.configAtRun === g ? p.results : [],
          v,
          b
        ), p.lastRun = b, p.fingerprint = d.fingerprint, p.configAtRun = g, p.modelsAtRun = [...d.indexedModelIds], p.status = "done", p.warnings = [...d.warnings], f = p.id, m = p.results[0]?.id || "", O.clear(), P();
      }
      h = "results", H(), pe(), F(
        `Проверка завершена. ${E()?.results.length || 0} результатов. Сохраните проверки для продолжения работы.`
      );
      const c = E()?.results.find((p) => p.id === m);
      c && !M && await _(c);
    } finally {
      k(), U(!1), H();
    }
  }
  function ge(r) {
    const l = r.closest("[data-side]")?.dataset.side;
    if (!l) return;
    const c = E()[l], p = r, g = r.closest("[data-side]");
    if (p.classList.contains("preset")) {
      c.presetId = p.value || void 0, g.querySelector(
        '[data-selection="delete-set"]'
      ).disabled = !c.presetId;
      return;
    }
    if (p.classList.contains("all-models")) {
      for (const v of g.querySelectorAll(
        ".model-check"
      ))
        v.checked = p.checked;
      c.modelsMode = p.checked ? "all" : "selected", c.models = [], c.manualOnly = !1, c.presetId = void 0;
    }
    if (p.classList.contains("model-check")) {
      const v = [
        ...g.querySelectorAll(".model-check")
      ], b = v.filter((S) => S.checked).map((S) => S.value), y = v.length > 0 && b.length === v.length;
      g.querySelector(".all-models").checked = y, c.modelsMode = y ? "all" : "selected", c.models = y ? [] : b, c.manualOnly = !1, c.presetId = void 0;
    }
    c.conditions = [], c.mode = "all", N(), he();
  }
  u("new").onclick = () => {
    const r = mt();
    r.name = `Проверка ${o.checks.length + 1}`, o.checks.push(r), f = r.id, h = "select", m = "", O.clear(), P(), H();
  }, u("scan").onclick = () => C(async () => {
    be(), M = !1, U(!0), R("Чтение моделей");
    try {
      const r = E();
      await B(r ? [r] : void 0, !r);
    } finally {
      k(), U(!1), H();
    }
  }), u("run").onclick = () => C(() => ue()), u("all").onclick = () => C(() => ue(!0)), u("cancel").onclick = () => {
    M = !0, oe?.();
  }, u("test-search").oninput = Y, u("checks").onclick = (r) => {
    const l = r.target.closest(
      "[data-check]"
    );
    l && !w && (e.clear(), f = l.dataset.check, m = "", O.clear(), x = 0, H());
  }, u("tabs").onclick = (r) => {
    const l = r.target.closest("[data-tab]");
    l && !w && (h = l.dataset.tab, H());
  }, u("name").onchange = () => {
    const r = E();
    r && (r.name = u("name").value.trim() || "Проверка", P(), Y());
  }, u("copy").onclick = () => {
    const r = E();
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
    }), o.checks.push(l), f = l.id, m = "", O.clear(), P(), H();
  }, u("delete").onclick = () => {
    E() && confirm(`Удалить проверку «${E().name}» и её результаты?`) && (o.checks = o.checks.filter((r) => r.id !== f), f = o.checks[0]?.id || "", O.clear(), e.clear(), P(), H());
  }, u("clear-project").onclick = () => {
    !o.checks.length && !o.sets.length || confirm(
      "Очистить проверки, наборы моделей и результаты текущего проекта?"
    ) && (o.checks = [], o.sets = [], d = void 0, f = "", m = "", O.clear(), e.clear(), P(), u("model-count").textContent = "Модели не прочитаны", H(), F("Данные проверок текущего проекта очищены."));
  }, u("save").onclick = () => {
    Ve("НашеПО-проверки.json", JSON.stringify(o, null, 2)), j = !1, u("dirty").textContent = "Файл проверок сохранён";
  }, u("open").onclick = () => u("file").click(), u("file").onchange = () => C(async () => {
    const r = u("file").files?.[0];
    if (!r) return;
    const l = it(await r.text());
    j && !confirm("Заменить текущие несохранённые проверки данными из файла?") || (o = l, s && je.set(s, o), Xe(n, o), f = o.checks[0]?.id || "", m = "", O.clear(), e.clear(), j = !1, u("dirty").textContent = "Проверки открыты", H(), F("Проверки открыты. Обновите модели перед переходом к элементам."), u("file").value = "");
  });
  for (const r of ["settings", "help"])
    u(r).onclick = () => u(r + "-dialog").showModal();
  for (const r of i.querySelectorAll("[data-close]"))
    r.onclick = () => u(r.dataset.close).close();
  u("content").onchange = (r) => C(() => {
    const l = r.target, c = E();
    if (!c) return;
    if (l.closest("[data-side]")) {
      ge(l);
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
        const g = Number(l.value);
        if (!Number.isFinite(g) || g < 1e-3 || g > 100)
          throw l.value = String(c.precision), Error("Точность должна быть от 0,001 до 100 мм.");
        c.precision = g;
      }
      if (l.id === "min-penetration") {
        const g = Number(l.value);
        if (!Number.isFinite(g) || g < 0 || g > 1e5)
          throw l.value = String(c.minPenetration), Error(
            "Минимальная глубина должна быть от 0 до 100 000 мм."
          );
        c.minPenetration = g;
      }
      l.id === "type" && (c.type = l.value), l.id === "touching" && (c.touching = l.checked), l.id === "same-model" && (c.ignoreSameModel = l.checked), l.id === "same-group" && (c.ignoreSameGroup = l.checked), l.id === "hidden" && (c.includeHidden = l.checked), l.id === "equal-property" && (c.equalProperty = l.value), N(), H();
      return;
    }
    if (l.id === "result-state") {
      x = 0, W();
      return;
    }
    if (l.id === "check-page") {
      for (const g of D().slice(x * 50, x * 50 + 50))
        l.checked ? O.add(g.id) : O.delete(g.id);
      W();
      return;
    }
    if (l.classList.contains("row-check")) {
      const g = l.closest("[data-result]").dataset.result;
      l.checked ? O.add(g) : O.delete(g), u("selection-count").textContent = `Выбрано: ${O.size}`;
      return;
    }
    const p = c.results.find((g) => g.id === m);
    p && (l.id === "edit-state" && (p.state = l.value, W(), Y(), pe()), l.id === "assignee" && (p.assignee = l.value), l.id === "note" && (p.note = l.value, W()), P());
  }), u("content").oninput = (r) => {
    const l = r.target;
    (l.id === "result-search" || l.id === "result-depth") && (x = 0, W());
    const c = E(), p = Number(l.value);
    c && l.id === "precision" && Number.isFinite(p) && p >= 1e-3 && p <= 100 && (c.precision = p, N()), c && l.id === "min-penetration" && Number.isFinite(p) && p >= 0 && p <= 1e5 && (c.minPenetration = p, N());
  }, u("content").onclick = (r) => C(async () => {
    const l = r.target, c = l.closest("button"), p = E();
    if (!p) return;
    if (c?.dataset.selection) {
      const v = c.closest("[data-side]").dataset.side, b = p[v], y = u("content").scrollTop;
      let S = !0;
      switch (c.dataset.selection) {
        case "load-set": {
          const q = o.sets.find((G) => G.id === b.presetId);
          if (!q) throw Error("Выберите сохранённый набор моделей.");
          Object.assign(b, structuredClone(q.selection), {
            conditions: [],
            mode: "all",
            include: [],
            exclude: [],
            manualOnly: !1,
            presetId: q.id
          });
          break;
        }
        case "save-set": {
          if (b.manualOnly)
            throw Error(
              "Ручную выборку элементов нельзя сохранить как набор моделей."
            );
          const q = await T();
          if (!q) return;
          const G = {
            id: crypto.randomUUID(),
            name: q,
            selection: {
              models: [...b.models],
              modelsMode: b.modelsMode,
              conditions: [],
              mode: "all"
            }
          };
          o.sets.push(G), b.presetId = G.id, S = !1;
          break;
        }
        case "delete-set": {
          const q = o.sets.find((G) => G.id === b.presetId);
          if (!q) throw Error("Выберите сохранённый набор моделей.");
          if (!confirm(`Удалить набор «${q.name}»?`)) return;
          o.sets = o.sets.filter((G) => G.id !== q.id);
          for (const G of o.checks)
            for (const ne of [G.a, G.b])
              ne.presetId === q.id && (ne.presetId = void 0);
          S = !1;
          break;
        }
        case "show":
          e.select(
            (d?.elements || []).filter((q) => (p.includeHidden || !q.hidden) && Ce(q, b)).map((q) => q.id)
          );
          return;
        case "only": {
          const q = e.selected();
          if (!q.length) throw Error("Выделите элементы в 3D-сцене.");
          b.include = q, b.exclude = [], b.manualOnly = !0;
          break;
        }
        case "include": {
          const q = e.selected();
          if (!q.length) throw Error("Выделите элементы в 3D-сцене.");
          b.include = [.../* @__PURE__ */ new Set([...b.include, ...q])], b.exclude = b.exclude.filter((G) => !q.includes(G));
          break;
        }
        case "exclude": {
          const q = e.selected();
          if (!q.length) throw Error("Выделите элементы в 3D-сцене.");
          b.exclude = [.../* @__PURE__ */ new Set([...b.exclude, ...q])], b.include = b.include.filter((G) => !q.includes(G));
          break;
        }
        case "reset":
          b.manualOnly = !1, b.include = [], b.exclude = [];
      }
      S ? N() : P(), H(), u("content").scrollTop = y;
      return;
    }
    if (c?.id === "prev-page" && (x--, W()), c?.id === "next-page" && (x++, W()), c?.id === "show-markers" && (z = !z, c.textContent = z ? "● Знаки включены" : "○ Знаки выключены", c.setAttribute("aria-checked", String(z)), pe()), c?.id === "bulk") {
      const v = u("bulk-state").value;
      for (const b of p.results) O.has(b.id) && (b.state = v);
      P(), W(), X(), Y(), pe();
    }
    if (c?.id === "capture-image") {
      const v = p.results.find((b) => b.id === m);
      if (v) {
        M = !1, U(!0), R("Создание снимка пары");
        try {
          v.image = await e.snapshot(
            v,
            Number(u("distance").value),
            () => M,
            !0
          ), v.imageScope = "pair-ab", v.imageDistance = void 0, P(), X(), F("Снимок сохранён в результат.");
        } finally {
          k(), U(!1);
        }
      }
      return;
    }
    if (c?.id === "open-image") {
      const v = p.results.find((b) => b.id === m);
      if (v?.image) {
        const b = document.createElement("dialog");
        b.className = "image-dialog", b.innerHTML = '<button>Закрыть</button><img alt="Снимок коллизии">', b.querySelector("img").src = v.image, b.querySelector("button").onclick = () => {
          b.close(), b.remove();
        }, i.append(b), b.showModal();
      }
      return;
    }
    if (c?.id === "focus" && V(m, !0), c?.id === "previous" || c?.id === "next") {
      const v = D(), b = v.findIndex((y) => y.id === m) + (c.id === "next" ? 1 : -1);
      v[b] && V(v[b].id, !0);
    }
    if (c?.id === "export-html" || c?.id === "export-viewer") {
      let v = 0;
      const b = u("selected-only").checked ? p.results.filter((S) => O.has(S.id)) : p.results;
      if (!b.length) throw Error("Нет результатов для отчёта.");
      if (u("report-images").checked) {
        const S = e.view, q = S?.storeView(), G = Number(u("distance").value);
        M = !1, U(!0), R("Подготовка снимков отчёта", 0, b.length);
        try {
          await e.captureWorkspace(async () => {
            let ne = 0;
            for (const re of b) {
              if (M)
                throw Error(
                  "Подготовка отчёта отменена. Уже полученные снимки сохранены."
                );
              R(
                "Подготовка снимков отчёта",
                ne,
                b.length
              ), F("Подготовка снимков: " + (ne + 1) + " / " + b.length);
              const lt = re.imageScope !== "pair-ab" || re.imageDistance !== void 0 && re.imageDistance !== G;
              if (!re.image || lt) {
                if (re.state === "resolved" && !e.canLocate(re)) {
                  ne++;
                  continue;
                }
                try {
                  re.image = await e.snapshot(re, G, () => M), re.imageScope = "pair-ab", re.imageDistance = G, P();
                } catch (dt) {
                  if (M || !e.isCurrent()) throw dt;
                  v++;
                }
              }
              ne++, R("Подготовка снимков отчёта", ne, b.length);
            }
          });
        } finally {
          if (S && e.isCurrent()) {
            const ne = p.results.find((re) => re.id === m);
            if (ne)
              try {
                e.focus(ne, G, !1);
              } catch {
              }
            q && S.restoreView(q);
          }
          k(), U(!1);
        }
      }
      const y = u("report-images").checked ? b.map(
        (S) => S.imageScope === "pair-ab" ? S : { ...S, image: void 0 }
      ) : b.map((S) => ({ ...S, image: void 0 }));
      Ve(
        p.name + (c.id === "export-html" ? ".html" : ".collision360.json"),
        c.id === "export-html" ? Et(p, y) : At(p, y)
      ), F(
        "Отчёт подготовлен. Результатов: " + b.length + "; со снимками: " + y.filter((S) => S.image).length + "." + (v ? ` Не удалось создать снимков: ${v}; эти строки включены без изображения.` : ""),
        v > 0
      );
    }
    const g = l.closest("[data-result]");
    g && !l.closest("input") && !window.getSelection()?.toString() && V(g.dataset.result);
  }), u("content").ondblclick = (r) => {
    const l = r.target, c = l.closest("[data-result]");
    c && !l.closest("input") && C(() => V(c.dataset.result, !0));
  };
  const Se = setInterval(() => {
    w || (de() ? (u("model-count").textContent = "Модели не прочитаны", F(
      o.checks.length ? "Открыт другой проект. Показаны его проверки; обновите модели." : "Открыт другой проект. Для него ещё нет проверок."
    ), w || H()) : d && !e.isCurrent() && (d = void 0, e.clear(), u("model-count").textContent = "3D-окно изменилось", F("Активное 3D-окно изменилось. Обновите модели."), w || H()));
  }, 1500);
  return H(), () => {
    a(), clearInterval(Se), clearTimeout(A), $++, M = !0, oe?.(), I?.terminate(), e.clear();
  };
}
var Ge = /* @__PURE__ */ ((t) => (t.object = "object", t.drawing = "drawing", t.table = "table", t.record = "record", t.textStyle = "textstyle", t.textStyleTable = "textstyles", t.linetype = "linetype", t.linetypeTable = "linetypes", t.layer = "layer", t.layerTable = "layers", t.block = "block", t.blockTable = "blocks", t.layout = "layout", t.layoutTable = "layouts", t.type = "type", t.typeTable = "types", t.material = "material", t.materialTable = "materials", t.geometry = "geometry", t.geometryTable = "geometries", t.group = "group", t.groupTable = "groups", t.attachment = "attachment", t.attachmentTable = "attachments", t.entities = "entities", t.entity = "entity", t.line = "l", t.solid = "s", t.insert = "i", t.polyline = "p", t.circle = "c", t.arc = "a", t.polyline3d = "p3", t.proxy = "x", t.text = "t", t.mtext = "mt", t.wipeout = "w", t.model3d = "g", t.alignment = "al", t))(Ge || {});
const Ze = () => new Promise((t) => requestAnimationFrame(() => t()));
function rt(t) {
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
async function Ot(t) {
  await Ze(), t.repaint();
  const { candidates: e, rect: i } = rt(t), a = document.createElement("canvas");
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
    t.repaint(), await Ze(), a.remove();
  };
}
async function qt(t, e) {
  if (await Ze(), e()) throw Error("Подготовка снимков отменена.");
  const { candidates: i } = rt(t), a = document.createElement("canvas"), s = Math.min(1, 1280 / i[0].width);
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
const De = "nashepo.checks.points", Ke = "nashepo.checks.highlight";
function _e(t) {
  let e = performance.now();
  return async () => {
    if (t()) throw Error("Операция отменена.");
    performance.now() - e >= 16 && (await new Promise((i) => setTimeout(i, 0)), e = performance.now());
  };
}
function Ne(t, e, i, a = 0) {
  if (a > 12 || t == null) return;
  if (typeof t != "object") {
    i[e] = String(t);
    return;
  }
  if (Array.isArray(t)) {
    t.forEach((n, o) => Ne(n, `${e}[${o}]`, i, a + 1));
    return;
  }
  const s = t;
  if ("$value" in s) {
    Ne(s.$value, e, i, a + 1);
    return;
  }
  for (const [n, o] of Object.entries(s))
    n.startsWith("$") || Ne(o, e ? `${e}.${n}` : n, i, a + 1);
}
function Nt(t) {
  const e = t.vertices.length / 3, i = (o) => Number.isFinite(t.vertices[o * 3]) && Number.isFinite(t.vertices[o * 3 + 1]) && Number.isFinite(t.vertices[o * 3 + 2]), a = (o) => {
    const d = t.indices[o], f = t.indices[o + 1], h = t.indices[o + 2];
    return d < e && f < e && h < e && d !== f && f !== h && h !== d && i(d) && i(f) && i(h);
  };
  let s = 0;
  for (let o = 0; o < t.indices.length; o += 3) a(o) && (s += 3);
  if (s === t.indices.length) return t.indices;
  const n = new Uint32Array(s);
  for (let o = 0, d = 0; o < t.indices.length; o += 3)
    a(o) && (n[d++] = t.indices[o], n[d++] = t.indices[o + 1], n[d++] = t.indices[o + 2]);
  return n;
}
const Re = (t) => /\.wdx(?:[?#].*)?$/i.test(t);
class Pt {
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
    const d = [], f = /* @__PURE__ */ new Set(), h = [], m = [], x = [], w = /* @__PURE__ */ new Map(), M = /* @__PURE__ */ new Set();
    let I = 2166136261;
    const z = _e(
      () => i() || s !== this.app || n !== this.view
    );
    let j = -1 / 0;
    const O = (A) => {
      for (let $ = 0; $ < A.length; $++)
        I = Math.imul(I ^ A.charCodeAt($), 16777619);
    }, oe = async (A, $, E) => {
      if (M.has(A)) return;
      M.add(A);
      const u = A.layers.layer0?.modelName || $, Z = $, F = Re(u) || Re(Z), R = (N, te) => {
        f.has(N) || (f.add(N), d.push({ id: N, name: te }));
      };
      F || R(Z, u);
      const k = !F && (!a || a.has(Z)), C = [];
      (k || F) && A.layouts.model?.walk((N) => (N.type === Ge.model3d ? C.push(N) : N.type === Ge.insert && h.push(`${u}: вставка блока не включена в расчёт.`), !1));
      const T = /* @__PURE__ */ new Map();
      for (const N of C) {
        let te = N.layer, L = "";
        for (; te; ) {
          if (te.modelName && !Re(te.modelName)) {
            L = te.modelName;
            break;
          }
          te = te.layer;
        }
        const D = F ? L || "Модель проекта" : u, Y = F ? L || `${$}/#model` : Z;
        if (F && R(Y, D), a && !a.has(Y)) continue;
        const se = JSON.stringify([
          N.layer?.UUID || "",
          N.$id || N.$path
        ]);
        T.set(JSON.stringify([Y, se]), {
          key: se,
          objects: [N],
          modelId: Y,
          modelName: D
        });
      }
      let P = 0;
      for (const N of T.values()) {
        const { key: te, objects: L, modelId: D, modelName: Y } = N;
        if (i()) throw Error("Чтение моделей отменено.");
        if (s !== this.app || n !== this.view)
          throw Error(
            "Активный проект изменился. Запустите чтение моделей заново."
          );
        const se = L[0].layer, H = {};
        try {
          if (se) {
            const he = [];
            let pe = se;
            for (; pe && he.length < 64; )
              he.unshift(pe), pe = pe.layer;
            for (const V of he)
              Ne(V.typedProperties(), "", H), V.typed?.name && (H.Тип = V.typed.name);
          }
        } catch {
          h.push(`${Y} / ${te}: часть свойств недоступна.`);
        }
        const xe = H["ifc.id"] || Object.entries(H).find(
          ([he]) => /(^|\.)(globalid|ifcguid|guid)$/i.test(he)
        )?.[1] || "", W = se?.name || L[0].$id || "Элемент", X = JSON.stringify([D, te]);
        Object.assign(H, {
          Модель: Y,
          Имя: W,
          GUID: xe,
          Объект: se?.UUID || te
        });
        const ae = {
          min: [1 / 0, 1 / 0, 1 / 0],
          max: [-1 / 0, -1 / 0, -1 / 0]
        };
        let be = !0, fe = !1, ie = 0;
        for (const he of L) {
          be &&= he.isClosed;
          for (const pe of Object.values(he.meshes)) {
            const V = pe.geometry;
            if (!V || V.indices.length % 3) {
              fe = !0;
              continue;
            }
            be &&= pe.isClosed;
            for (let B = 0; B < V.vertices.length; B += 3) {
              const U = [
                V.vertices[B],
                V.vertices[B + 1],
                V.vertices[B + 2]
              ];
              if (Math3d.mat4.mulv3(U, he.matrix, U), !U.every(Number.isFinite)) {
                fe = !0;
                continue;
              }
              for (let Q = 0; Q < 3; Q++)
                ae.min[Q] = Math.min(ae.min[Q], U[Q]), ae.max[Q] = Math.max(ae.max[Q], U[Q]);
              if (O(U.join(",")), B % 6e4 === 0 && (performance.now() - j > 200 && (j = performance.now(), e(
                "Индексирование: " + Y + " · " + x.length + " элементов"
              )), await z(), i()))
                throw Error("Чтение моделей отменено.");
            }
            const K = V.vertices.length / 3, _ = (B) => Number.isFinite(V.vertices[B * 3]) && Number.isFinite(V.vertices[B * 3 + 1]) && Number.isFinite(V.vertices[B * 3 + 2]);
            for (let B = 0; B < V.indices.length; B += 3) {
              const U = V.indices[B], Q = V.indices[B + 1], ue = V.indices[B + 2];
              if (I = Math.imul(I ^ U, 16777619), I = Math.imul(I ^ Q, 16777619), I = Math.imul(I ^ ue, 16777619), U < K && Q < K && ue < K && U !== Q && Q !== ue && ue !== U && _(U) && _(Q) && _(ue) ? ie++ : fe = !0, B % 15e4 === 0 && (await z(), i()))
                throw Error("Чтение моделей отменено.");
            }
          }
        }
        if (fe || !ie) {
          if (ie || P++, !ie) continue;
          be = !1;
        }
        const ke = {
          id: X,
          name: W,
          model: Y,
          modelId: D,
          guid: xe,
          properties: H,
          hidden: E || !!se?.resolveHidden() || !!se?.resolveDisabled(),
          triangles: new Float64Array(0),
          triangleCount: ie,
          closed: be,
          bounds: ae
        };
        O(JSON.stringify([X, H, ke.hidden])), x.push(ke), w.set(X, L);
      }
      P && h.push(
        `${u}: пропущено элементов без треугольной геометрии — ${P}.`
      );
      const de = [];
      A.attachments.forEach((N) => {
        de.push(N);
      });
      for (const N of de) {
        const te = N.name || N.uri || N.$id, L = te || "Подключённая модель", D = `${$}/${te || "attachment"}`;
        N.model || R(D, L), N.model ? await oe(
          N.model,
          D,
          E || N.hidden
        ) : (!a || a.has(D)) && m.push(
          `${L}: модель не загружена. Откройте её перед расчётом.`
        );
      }
    };
    if (await oe(o, o.layers.layer0?.modelName || "Проект", !1), !x.length && (!a || a.size > 0)) {
      const A = a ? [...a].filter(($) => !f.has($)) : [];
      throw Error(
        A.length ? `Сохранённая выборка ссылается на модели, которых нет в текущем составе: ${A.join(", ")}. Обновите список моделей.` : d.length ? "В выбранных моделях не найдены 3D-элементы с доступной геометрией. Проверьте, что модели загружены, и выберите нужные файлы." : "В открытом проекте не обнаружены IFC/SMDX-модели. Проверьте состав подключений проекта."
      );
    }
    return this.clear(), this.refs = w, this.metadata = new Map(x.map((A) => [A.id, A])), this.scannedApp = s, this.scannedView = n, {
      elements: x,
      fingerprint: `${x.length}:${I >>> 0}`,
      warnings: [...new Set(h)],
      blockers: [...new Set(m)],
      models: d,
      indexedModelIds: d.filter((A) => !a || a.has(A.id)).map((A) => A.id)
    };
  }
  async geometry(e, i) {
    const a = _e(() => i() || !this.isCurrent());
    if (!this.isCurrent()) throw Error("Активная модель изменилась.");
    const s = this.metadata.get(e), n = this.refs.get(e);
    if (!s || !n) throw Error("Элемент отсутствует.");
    const o = n.flatMap(
      (M) => Object.values(M.meshes).flatMap((I) => {
        const z = I.geometry;
        if (!z || z.indices.length % 3) return [];
        const j = Nt(z);
        return j.length ? [{ object: M, g: z, indices: j }] : [];
      })
    );
    let d = 0, f = 0;
    for (const { g: M, indices: I } of o) {
      if (!M) throw Error("Геометрия недоступна.");
      d += M.vertices.length, f += I.length;
    }
    const h = new Float64Array(d), m = new Uint32Array(f);
    let x = 0, w = 0;
    for (const { object: M, g: I, indices: z } of o) {
      if (!I) throw Error("Геометрия недоступна.");
      for (let j = 0; j < I.vertices.length; j += 3) {
        const O = [I.vertices[j], I.vertices[j + 1], I.vertices[j + 2]];
        if (Math3d.mat4.mulv3(O, M.matrix, O), h.set(O, x + j), j % 6e4 === 0 && (await a(), i() || !this.isCurrent()))
          throw Error("Чтение геометрии отменено.");
      }
      for (let j = 0; j < z.length; j++)
        if (m[w + j] = x / 3 + z[j], j % 15e4 === 0 && (await a(), i()))
          throw Error("Чтение геометрии отменено.");
      x += I.vertices.length, w += z.length;
    }
    return { ...s, vertices: h, indices: m };
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
    o.forEach((f, h) => o[h] = f / d), n.lookAt(
      s.map((f, h) => f - o[h] * i),
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
      ({ id: o, color: d }, f) => [...new Set(this.refs.get(o) || [])].flatMap(
        (h) => Object.values(h.meshes).flatMap((m) => {
          const x = m.geometry;
          if (!x) return [];
          const w = {
            // SDK fields may be prototype getters rather than own properties.
            uuid: `${Ke}.${f}.${x.uuid}`,
            vertices: x.vertices,
            indices: x.indices,
            normals: x.normals,
            bounds: x.bounds,
            colors: new Uint32Array(x.vertices.length / 3).fill(d)
          };
          return [{ obj: h, geometry: w, color: d }];
        })
      )
    ), this.overlay) {
      this.overlay.layer.visible = !0, i.invalidate(!0);
      return;
    }
    let s;
    s = {
      id: Ke,
      order: 1e4,
      visible: !0,
      paint: () => {
      },
      paint3d: (o) => {
        const d = o.color, f = o.rasterizer.material;
        o.rasterizer.material = void 0;
        try {
          for (const { obj: h, geometry: m, color: x } of this.overlaySurfaces) {
            o.color = x, o.pushMatrix();
            try {
              o.multMatrix(h.matrix), o.mesh(m);
            } finally {
              o.popMatrix();
            }
          }
        } catch (h) {
          s.visible = !1, this.overlayError = new Error(
            "Не удалось отрисовать подсветку пары: " + (h instanceof Error ? h.message : String(h))
          );
        } finally {
          o.color = d, o.rasterizer.material = f;
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
    const d = o.visible, f = n.annotations.visible, h = new Set(n.layer.selectedObjects());
    let m;
    try {
      s ? this.highlight(e) : this.focus(e, i, !1), n.pauseAnimation(), m = await Ot(n), n.layer.clearSelected(), o.visible = !1, n.annotations.visible = !1, n.invalidate();
      const x = await qt(
        n,
        () => a() || !this.isCurrent()
      );
      if (this.overlayError) throw this.overlayError;
      return x;
    } finally {
      o.visible = d, n.annotations.visible = f, n.layer.clearSelected(), n.layer.selectObjects((x) => h.has(x), !0), n.invalidate(), await m?.();
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
    const d = n.annotations.create(De, 1e4), f = e.filter((h) => h.id !== i).concat(e.filter((h) => h.id === i));
    for (const h of f.slice(-3e3)) {
      if (h.state === "resolved") continue;
      const [m, x, w] = h.point, M = h.id === i, I = h.state === "excluded" ? "#78818c" : h.state === "approved" || h.state === "reviewed" ? "#28b94b" : "#e1372d", z = M ? "#f2c94c" : I, j = () => s(h.id), O = [
        { type: "line", a: [m, x, w], b: [m, x, w + 1], color: z, width: 5 },
        {
          type: "polyline",
          points: [
            [m - 0.65, x, w + 1],
            [m + 0.65, x, w + 1],
            [m, x, w + 2.2],
            [m - 0.65, x, w + 1]
          ],
          color: z,
          fillColor: I,
          width: M ? 5 : 2
        },
        {
          type: "line",
          a: [m, x - 0.01, w + 1.85],
          b: [m, x - 0.01, w + 1.4],
          color: "#ffffff",
          width: 4
        },
        {
          type: "line",
          a: [m, x - 0.01, w + 1.22],
          b: [m, x - 0.01, w + 1.27],
          color: "#ffffff",
          width: 4
        }
      ];
      d.add({
        id: h.id,
        type: "shaped",
        shapes: O,
        activeShapes: O,
        activateCommand: j,
        dblCommand: j
      }), M && d.add({
        id: h.id + ":label",
        type: "simple",
        position: [m, x, w + 2.35],
        label: `${h.a.name} × ${h.b.name}`,
        labelBackground: "#f2c94c",
        labelColor: "#171717",
        activateCommand: j
      });
    }
    n.invalidate();
  }
}
let et, Fe, tt;
const Lt = {
  open(t) {
    t.manager.revealView("nashepo.collisionfinder360/checks_panel");
  },
  mount(t) {
    const e = t.el;
    if (!e) return;
    if (Fe && tt === t.manager) {
      e.replaceChildren(Fe);
      return;
    }
    et?.();
    const i = document.createElement("div");
    i.style.height = "100%", e.replaceChildren(i), Fe = i, tt = t.manager, et = zt(i, new Pt(t));
  }
};
export {
  Lt as default
};
