const lt = `<h2>Работа с проверками</h2>
<details open><summary>1. Первая проверка</summary><ol><li>Откройте проект и подключите IFC/SMDX штатными средствами Топоматик 360.</li><li>Откройте нижнюю вкладку «Проверки» и нажмите «Модели».</li><li>Нажмите «＋ Новая проверка» и задайте ей понятное имя.</li><li>Во вкладке «Выбор» оставьте галочки только у нужных файлов в А и Б. «Все модели» включено по умолчанию.</li><li>Выберите «По пересечению» или «Дублирование» и нажмите «Запустить».</li><li>Во вкладке «Результаты» дважды нажмите строку: камера направится к конфликту, элемент А будет выделен красным, элемент Б — синим, и оба элемента станут выделенными в 3D-окне.</li></ol><p>Первое обновление без созданной проверки получает только список файлов. При запуске индексируются модели, отмеченные хотя бы в одной стороне. Файл проекта WDX служит контейнером и в выбор моделей не попадает.</p></details>
<details><summary>2. Выбор моделей и сохранённые наборы</summary><p>Выбор А и выбор Б задают две стороны сравнения. Снимите «Все модели» и отметьте конкретные IFC/SMDX. Для поиска дубликатов внутри одного файла отметьте его с обеих сторон.</p><p>Часто используемый состав можно сохранить как набор моделей, а затем применить в другой проверке. Наборы входят в файл проверок. Состав выборки задаётся галочками моделей и ручным выделением объектов.</p><p>IFC GUID читается из свойства <code>ifc.id</code>; также поддерживаются GlobalId, IfcGuid и GUID.</p></details>
<details><summary>3. Работа с выделением в 3D</summary><p>Сначала выделите элементы штатными средствами в 3D-окне, затем используйте кнопку в нужной стороне:</p><ul><li><b>Показать выбранные элементы</b> — выделяет весь текущий состав.</li><li><b>Только выделенные в 3D</b> — оставляет только выделенные объекты.</li><li><b>＋ Добавить из 3D</b> — добавляет выделенные объекты к моделям.</li><li><b>− Исключить из 3D</b> — исключает выделенные объекты.</li><li><b>Сбросить ручной выбор</b> — снова использует отмеченные модели.</li></ul><p>Ручные идентификаторы могут измениться после замены IFC/SMDX, поэтому такую выборку следует проверить заново.</p></details>
<details><summary>4. Пересечения, глубина, касания и дубликаты</summary><p><b>Пересечение</b> рассчитывается по фактическим треугольным поверхностям. Габаритные коробки отбирают близкие пары, а общий габарит пары дополнительно ограничивает область, внутри которой берётся замер глубины.</p><p><b>Расчётная глубина Hard Clash</b> — это толщина самого сильного из отдельных перекрытий пары. Направления для замера берутся от граней, сошедшихся в контакте, плюс три оси координат. Вдоль каждого направления оба тела дают тень; общая часть двух теней показывает, насколько одно тело зашло в другое в этом направлении. Глубиной становится наименьшее значение по всем направлениям. Проецируется только та геометрия, что попала в общий габарит пары, и проекции обрезаются по его границам.</p><p>Если пара соприкасается сразу в нескольких местах, они разбираются по отдельности, а в результат идёт самое глубокое. Пустота между двумя контактами не превращается в глубину: направление разреза берётся из того, как разбросаны сами точки контакта, а разрез принимается только там, где промежуток лежит вне хотя бы одного тела. Труба сквозь две стенки одного элемента даёт толщину стенки, а не расстояние между ними, и это не зависит от того, как пара повёрнута в пространстве.</p><p>Поэтому значение не зависит ни от густоты сетки, ни от размеров элементов: труба одного диаметра даёт одну и ту же глубину и на грубой, и на подробной модели, а длина стержня, проходящего сквозь плиту, на результат не влияет. Далеко отнесённая часть составного объекта тоже не завышает глубину.</p><p>Это именно перекрытие тел, а не длина перемещения, которое их разведёт: чтобы вынуть стержень из плиты, его надо вытянуть на всю длину, и к тяжести конфликта это отношения не имеет. Объём пересечения вместо глубины не используется: одинаковый объём может означать совсем разные конфликты.</p><p>Одна пара элементов формирует один результат. Точкой коллизии становится контакт, ближайший к середине области перекрытия. Несколько несвязанных областей одной пары отдельно не группируются.</p><p>Если элемент ничего не заключает внутри себя — лист, отдельная грань, незамкнутая оболочка — объёмный замер к нему неприменим. Плагин считает объём, который ограничивает сетка, и сравнивает его с площадью поверхности, поэтому наклонный лист распознаётся так же, как лежащий по осям. Такой конфликт остаётся в результате со значением «не определена», и порог минимальной глубины его не отсекает: решение принимает человек.</p><p>Разделение на отдельные перекрытия — обоснованная оценка, а не построение общей области двух тел. Оно проверяет до восьми зон на пару и до четырёх пробных промежутков за проход, поэтому очень сложное взаимное расположение может остаться неразделённым и дать завышенное число. На очень крупных контактах набор направлений прореживается ради скорости, и оценка тоже становится грубее в большую сторону.</p><p>«Точность расчёта» — геометрическая погрешность, а «Минимальная глубина» — пользовательский допуск для исключения небольших конфликтов. Порог применяется с запасом на точность: при минимуме 20 мм и точности 0,1 мм конфликт глубиной 19,95 мм ещё останется. Одинаково в расчёте, в таблице результатов и в HTML-отчёте, поэтому одно и то же число всюду отбирает одни и те же строки. Нулевую глубину получают только касания двух объёмных тел, и лишь когда включён их учёт. Труба и отвод могут пересекаться в штатном соединении из-за фасеточной аппроксимации круглых поверхностей; такие соединения исключаются правилами. <b>Дублирование</b> ищет совпадающие треугольники в одинаковых мировых координатах.</p></details>
<details><summary>5. Составные объекты и неполная геометрия</summary><p>Один IFC-объект может состоять из нескольких частей. Чтобы не сравнивать его части между собой, включите «Не проверять геометрию одного составного объекта» во вкладке «Правила». Там же можно исключить пары одной модели или одинакового значения свойства.</p><p>Пустые и неполные геометрические части пропускаются, а пригодные части модели продолжают участвовать. Плагин показывает сводное замечание с количеством пропущенных элементов. Незагруженный подключённый файл блокирует расчёт только тогда, когда он входит в выборку.</p></details>
<details><summary>6. Результаты и состояния</summary><p>«Новый» найден впервые, «Активный» найден повторно, «Проверенный» рассмотрен, «Подтверждённый» подтверждён, «Исключённый» исключён из работы. «Исправленный» означает, что пара исчезла при повторном расчёте с теми же правилами; состояние можно изменить вручную.</p><p>В таблице доступны IFC GUID, расчётная глубина, назначение и комментарий. Фильтр «Глубина от» пропускает строки со значением «не определена», чтобы неизмеримый конфликт не исчез молча. Галочки меняют состояние сразу у нескольких строк. Значения можно выделять и копировать. При переходе стрелками активная строка автоматически прокручивается в видимую область. Состояние «Устарела» у проверки означает, что после последнего расчёта изменили её тип, выборки, параметры или правила.</p></details>
<details><summary>7. Отчёт и снимки</summary><p>После перехода к коллизии отсутствующий снимок создаётся автоматически, если пользователь задержался на результате. Кадр строится от той же камеры приближения, что и снимки отчёта: ракурс задаёт «Дистанция камеры» в настройках. Если дистанцию изменить, отчёт переснимет прежние кадры под новое значение. Быстрое переключение стрелками отменяет лишние снимки. Во время технической перерисовки поверх 3D-окна сохраняется предыдущий кадр, поэтому модель не должна мигать.</p><p>Кнопка «Снимок пары» сохраняет текущий ракурс только с двумя элементами коллизии: элемент А показан красным, элемент Б — синим. Такой кадр собран вручную, поэтому отчёт его не переснимает. На время подготовки отчёта нижняя панель автоматически уменьшается для широкого 3D-кадра и затем возвращается к прежнему размеру. Файл сессии предназначен для открытия результатов в плагине «НашеПО · Коллизии».</p></details>
<details><summary>8. Проекты, сохранение и очистка</summary><p>В пределах открытой страницы каждый проект получает собственный список проверок. Сворачивание или повторное открытие нижней панели сохраняет проверки, результаты и комментарии в текущей вкладке. При переключении проекта данные предыдущего не подмешиваются. «Очистить проект» удаляет проверки, результаты и наборы только у текущего проекта.</p><p>«Сохранить проверки» записывает правила, наборы моделей, результаты, комментарии и снимки в JSON. «Открыть проверки» загружает этот файл. Геометрия в файл не входит: соответствующие модели надо открыть отдельно. После обновления или закрытия страницы для продолжения работы используйте сохранённый файл.</p></details>
<details><summary>9. Большие проекты</summary><p>Жёсткого предела в 6 млн треугольников нет. При запуске строится индекс только по отмеченным моделям. Точная геометрия передаётся в расчёт по мере появления близких пар в компактном индексированном виде.</p><p>Время и память всё равно зависят от состава выборок и числа потенциальных пар. Разделяйте проверки по моделям и системам. В сцене одновременно показывается до 3000 знаков; при 50 000 результатах расчёт останавливается без замены прежнего результата.</p></details>`;
function dt(t) {
  let e = t.parentElement, i;
  for (; e && !i; )
    i = [...e.children].find(
      (u) => u.classList.contains("resizer-horizontal")
    ), e = e.parentElement;
  if (!i) return () => {
  };
  const a = i, r = t.ownerDocument.defaultView;
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
  return a.addEventListener("pointerdown", d), a.addEventListener("pointerup", o), a.addEventListener("pointercancel", o), a.addEventListener("lostpointercapture", o), r.addEventListener("blur", o), () => {
    o(), a.removeEventListener("pointerdown", d), a.removeEventListener("pointerup", o), a.removeEventListener("pointercancel", o), a.removeEventListener("lostpointercapture", o), r.removeEventListener("blur", o);
  };
}
const ct = "0.5.1", qe = (t) => typeof t == "string" && /^data:image\/(jpeg|png);base64,[A-Za-z0-9+/=]+$/.test(t), we = {
  new: "Новый",
  active: "Активный",
  reviewed: "Проверенный",
  approved: "Подтверждённый",
  resolved: "Исправленный",
  excluded: "Исключённый"
}, Ze = () => ({
  models: [],
  modelsMode: "all",
  conditions: [],
  mode: "all",
  include: [],
  exclude: []
}), pt = () => ({
  id: crypto.randomUUID(),
  name: "Новая проверка",
  type: "intersection",
  a: Ze(),
  b: Ze(),
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
}), Qe = ({
  triangles: t,
  vertices: e,
  indices: i,
  triangleCount: a,
  closed: r,
  bounds: n,
  ...o
}) => o;
function Ce(t, e) {
  return e.exclude.includes(t.id) ? !1 : e.include.includes(t.id) ? !0 : !(e.manualOnly || e.modelsMode === "selected" && !e.models.includes(t.modelId) || e.modelsMode === void 0 && e.models.length && !e.models.includes(t.modelId));
}
const ut = (t) => JSON.stringify([
  t.type,
  ...[t.a, t.b].map(
    ({
      models: e,
      modelsMode: i,
      conditions: a,
      mode: r,
      include: n,
      exclude: o,
      manualOnly: d
    }) => ({
      models: e,
      modelsMode: i,
      conditions: a,
      mode: r,
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
]), mt = (t, e) => JSON.stringify([t, e].sort());
function ft(t, e, i) {
  const a = new Map(t.map((n) => [n.id, n])), r = e.map((n) => {
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
    r.push({
      ...n,
      state: n.state === "excluded" ? "excluded" : "resolved"
    });
  return r;
}
function tt(t) {
  const e = JSON.parse(t);
  if (e?.format !== "nashepo.checks" || e.version !== 1 || !Array.isArray(e.checks))
    throw Error("Это не файл проекта проверок НашеПО.");
  const i = /* @__PURE__ */ new Set();
  if (e.sets ??= [], !Array.isArray(e.sets) || !e.sets.every(
    (r) => r && typeof r.id == "string" && typeof r.name == "string" && r.selection && Array.isArray(r.selection.models) && r.selection.models.every((n) => typeof n == "string") && (r.selection.modelsMode === void 0 || ["all", "selected"].includes(r.selection.modelsMode)) && Array.isArray(r.selection.conditions) && r.selection.conditions.every(
      (n) => n && typeof n.field == "string" && typeof n.value == "string" && ["eq", "ne", "contains", "exists", "gt", "lt"].includes(
        n.op
      )
    ) && ["all", "any"].includes(r.selection.mode)
  ))
    throw Error("Некорректные наборы моделей.");
  const a = (r) => /\.wdx(?:[?#].*)?$/i.test(r);
  for (const r of e.sets)
    r.selection.models = r.selection.models.filter(
      (n) => !a(n)
    ), r.selection.conditions = [], r.selection.mode = "all", r.selection.modelsMode ??= r.selection.models.length ? "selected" : "all";
  for (const r of e.checks) {
    if (!r || typeof r.id != "string" || i.has(r.id) || typeof r.name != "string" || !["intersection", "duplicates"].includes(r.type) || !["new", "done", "stale"].includes(r.status) || !Number.isFinite(r.precision) || r.precision < 1e-3 || r.precision > 100 || r.minPenetration !== void 0 && (!Number.isFinite(r.minPenetration) || r.minPenetration < 0 || r.minPenetration > 1e5) || !Array.isArray(r.results))
      throw Error("Некорректные параметры проверки.");
    if (i.add(r.id), r.minPenetration ??= 0, ![
      "touching",
      "ignoreSameModel",
      "ignoreSameGroup",
      "includeHidden"
    ].every(
      (n) => typeof r[n] == "boolean"
    ) || typeof r.equalProperty != "string" || r.warnings !== void 0 && (!Array.isArray(r.warnings) || !r.warnings.every((n) => typeof n == "string")) || r.modelsAtRun !== void 0 && (!Array.isArray(r.modelsAtRun) || !r.modelsAtRun.every((n) => typeof n == "string")))
      throw Error("Некорректные правила проверки.");
    r.warnings ??= [], r.modelsAtRun = r.modelsAtRun?.filter((n) => !a(n));
    for (const n of [r.a, r.b]) {
      if (!n || n.manualOnly !== void 0 && typeof n.manualOnly != "boolean" || n.modelsMode !== void 0 && !["all", "selected"].includes(n.modelsMode) || n.presetId !== void 0 && typeof n.presetId != "string" || !["all", "any"].includes(n.mode) || ![n.models, n.include, n.exclude].every(
        (o) => Array.isArray(o) && o.every((d) => typeof d == "string")
      ) || !Array.isArray(n.conditions) || !n.conditions.every(
        (o) => o && typeof o.field == "string" && typeof o.value == "string" && ["eq", "ne", "contains", "exists", "gt", "lt"].includes(o.op)
      ))
        throw Error("Некорректная выборка.");
      n.modelsMode ??= n.models.length ? "selected" : "all", n.models = n.models.filter((o) => !a(o)), n.conditions = [], n.mode = "all";
    }
    for (const n of r.results) {
      if (n?.image !== void 0 && !qe(n.image))
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
const H = (t, e) => [t[0] - e[0], t[1] - e[1], t[2] - e[2]], $e = (t, e, i = 1) => [
  t[0] + e[0] * i,
  t[1] + e[1] * i,
  t[2] + e[2] * i
], de = (t, e) => t[0] * e[0] + t[1] * e[1] + t[2] * e[2], ke = (t, e) => [
  t[1] * e[2] - t[2] * e[1],
  t[2] * e[0] - t[0] * e[2],
  t[0] * e[1] - t[1] * e[0]
], le = (t) => Math.hypot(...t), it = (t) => {
  const e = le(t);
  return e > 1e-20 ? [t[0] / e, t[1] / e, t[2] / e] : void 0;
}, je = (t) => t.triangleCount ?? (t.indices ? t.indices.length / 3 : t.triangles.length / 9), pe = (t, e, i) => t.indices && t.vertices ? t.vertices[t.indices[e * 3 + Math.floor(i / 3)] * 3 + i % 3] : t.triangles[e * 9 + i], ve = (t, e) => [0, 3, 6].map((i) => [
  pe(t, e, i),
  pe(t, e, i + 1),
  pe(t, e, i + 2)
]);
function Oe(t) {
  const e = [1 / 0, 1 / 0, 1 / 0], i = [-1 / 0, -1 / 0, -1 / 0];
  for (let a = 0; a < t.length; a++) {
    const r = a % 3;
    e[r] = Math.min(e[r], t[a]), i[r] = Math.max(i[r], t[a]);
  }
  return { min: e, max: i };
}
const ze = (t, e, i) => t.min.every((a, r) => a <= e.max[r] + i && t.max[r] >= e.min[r] - i);
function Fe(t, e) {
  const i = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const d of e)
    for (let u = 0; u < 9; u++) {
      const f = u % 3, m = pe(t, d, u);
      i.min[f] = Math.min(i.min[f], m), i.max[f] = Math.max(i.max[f], m);
    }
  if (e.length <= 12) return { ...i, ids: e };
  const a = i.max.map((d, u) => d - i.min[u]), r = a.indexOf(Math.max(...a)), n = (d) => pe(t, d, r) + pe(t, d, r + 3) + pe(t, d, r + 6);
  e.sort((d, u) => n(d) - n(u));
  const o = e.length >> 1;
  return {
    ...i,
    left: Fe(t, e.slice(0, o)),
    right: Fe(t, e.slice(o))
  };
}
function* Ee(t, e, i) {
  ze(t, e, i) && (t.ids ? yield* t.ids : (yield* Ee(t.left, e, i), yield* Ee(t.right, e, i)));
}
function* ye(t, e, i) {
  if (ze(t, e, i)) {
    if (t.ids && e.ids) {
      for (const a of t.ids) for (const r of e.ids) yield [a, r];
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
function Ue(t, e) {
  const i = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const o of e)
    for (let d = 0; d < 3; d++)
      i.min[d] = Math.min(i.min[d], t[o].bounds.min[d]), i.max[d] = Math.max(i.max[d], t[o].bounds.max[d]);
  if (e.length <= 16) return { ...i, ids: e };
  const a = i.max.map((o, d) => o - i.min[d]), r = a.indexOf(Math.max(...a));
  e.sort(
    (o, d) => t[o].bounds.min[r] + t[o].bounds.max[r] - (t[d].bounds.min[r] + t[d].bounds.max[r])
  );
  const n = e.length >> 1;
  return {
    ...i,
    left: Ue(t, e.slice(0, n)),
    right: Ue(t, e.slice(n))
  };
}
function Be(t, e, i, a) {
  const r = H(e, t), n = H(i[1], i[0]), o = H(i[2], i[0]), d = ke(r, o), u = de(n, d);
  if (Math.abs(u) <= 1e-12 * le(r) * le(n) * le(o)) return;
  const f = 1 / u, m = H(t, i[0]), g = de(m, d) * f, w = ke(m, n), j = de(r, w) * f, A = de(o, w) * f, O = a / Math.max(le(n), le(o), a);
  if (g >= -O && j >= -O && g + j <= 1 + O && A >= -O && A <= 1 + O)
    return $e(t, r, Math.max(0, Math.min(1, A)));
}
function ht(t, e, i, a) {
  const r = i.map(Math.abs).indexOf(Math.max(...i.map(Math.abs))), n = [0, 1, 2].filter((u) => u !== r), o = (u, f, m) => (f[n[0]] - u[n[0]]) * (m[n[1]] - u[n[1]]) - (f[n[1]] - u[n[1]]) * (m[n[0]] - u[n[0]]), d = (u, f) => {
    const m = f.map((g, w) => o(g, f[(w + 1) % 3], u));
    return m.every((g) => g >= -a * le(i)) || m.every((g) => g <= a * le(i));
  };
  for (const u of t) if (d(u, e)) return u;
  for (const u of e) if (d(u, t)) return u;
  for (let u = 0; u < 3; u++)
    for (let f = 0; f < 3; f++) {
      const m = t[u], g = t[(u + 1) % 3], w = e[f], j = e[(f + 1) % 3], A = H(g, m), O = H(j, w), E = A[n[0]] * O[n[1]] - A[n[1]] * O[n[0]];
      if (Math.abs(E) < 1e-18) continue;
      const k = H(w, m), P = (k[n[0]] * O[n[1]] - k[n[1]] * O[n[0]]) / E, z = (k[n[0]] * A[n[1]] - k[n[1]] * A[n[0]]) / E;
      if (P >= 0 && P <= 1 && z >= 0 && z <= 1) return $e(m, A, P);
    }
}
function gt(t, e, i, a) {
  const r = ke(H(t[1], t[0]), H(t[2], t[0])), n = ke(H(e[1], e[0]), H(e[2], e[0])), o = le(r), d = le(n);
  if (o < 1e-20 || d < 1e-20) return;
  const u = e.map((m) => de(H(m, t[0]), r) / o), f = t.map((m) => de(H(m, e[0]), n) / d);
  if (!(u.every((m) => m > i) || u.every((m) => m < -i) || f.every((m) => m > i) || f.every((m) => m < -i))) {
    if (u.every((m) => Math.abs(m) <= i) && f.every((m) => Math.abs(m) <= i))
      return a ? ht(t, e, r, i) : void 0;
    if (!(!a && (!(Math.min(...u) < -i && Math.max(...u) > i) || !(Math.min(...f) < -i && Math.max(...f) > i))))
      for (let m = 0; m < 3; m++) {
        const g = Be(t[m], t[(m + 1) % 3], e, i);
        if (g) return g;
        const w = Be(e[m], e[(m + 1) % 3], t, i);
        if (w) return w;
      }
  }
}
class xt {
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
    const i = it(ke(H(e[1], e[0]), H(e[2], e[0])));
    if (!i) return;
    const r = i[0] < -1e-9 || Math.abs(i[0]) <= 1e-9 && (i[1] < -1e-9 || Math.abs(i[1]) <= 1e-9 && i[2] < 0) ? [-i[0], -i[1], -i[2]] : [i[0], i[1], i[2]], n = this.key(r);
    for (this.items.has(n) || this.items.set(n, r); this.items.size > 512 && this.step > 10; ) {
      this.step /= 10;
      const o = /* @__PURE__ */ new Map();
      for (const d of this.items.values()) {
        const u = this.key(d);
        o.has(u) || o.set(u, d);
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
function bt(t, e, i, a, r, n, o, d) {
  const u = (k) => {
    let P = 1 / 0, z = -1 / 0;
    for (let $ = 0; $ < 8; $++) {
      const S = ($ & 1 ? n.max[0] : n.min[0]) * k[0] + ($ & 2 ? n.max[1] : n.min[1]) * k[1] + ($ & 4 ? n.max[2] : n.min[2]) * k[2];
      S < P && (P = S), S > z && (z = S);
    }
    return [P, z];
  }, f = (k, P, z, $, S) => {
    let h = 1 / 0, J = -1 / 0;
    for (const U of P) {
      let B = 1 / 0, M = -1 / 0;
      for (let C = 0; C < 9; C += 3) {
        const W = pe(k, U, C) * z[0] + pe(k, U, C + 1) * z[1] + pe(k, U, C + 2) * z[2];
        W < B && (B = W), W > M && (M = W);
      }
      M < $ || B > S || (B < $ && (B = $), M > S && (M = S), B < h && (h = B), M > J && (J = M));
    }
    return h === 1 / 0 ? void 0 : [h, J];
  };
  if (n.min.some((k, P) => n.max[P] - k <= 0)) return 0;
  const m = Math.ceil((i.length + a.length) / 4096), g = m > 1 ? r.filter((k, P) => P < 3 || P % m === 0) : r, w = (k, P, z, $, S) => {
    const h = (B) => $e(o, z, B - de(o, z));
    if (!P) return d(k, h(($ + S) / 2)) ? [$, S] : void 0;
    let [J, U] = P;
    return J > $ && d(k, h(($ + J) / 2)) && (J = $), U < S && d(k, h((U + S) / 2)) && (U = S), [J, U];
  }, j = (k, P) => k && P ? Math.min(k[1], P[1]) - Math.max(k[0], P[0]) : 0;
  let A = 1 / 0, O = !1, E = 0;
  for (let k = 0; k < g.length; k++) {
    const P = g[k], [z, $] = u(P), S = f(t, i, P, z, $), h = f(e, a, P, z, $);
    let J = j(S, h);
    J <= 0 && E++ < 32 && (J = j(w(0, S, P, z, $), w(1, h, P, z, $))), !(J <= 0) && (O = !0, J < A && (A = J));
  }
  return O && Number.isFinite(A) ? A : 0;
}
function yt(t, e) {
  let i = 0, a = 0, r = 0, n = 0, o = 0, d = 0;
  for (const f of t) {
    const m = f[0] - e[0], g = f[1] - e[1], w = f[2] - e[2];
    i += m * m, a += g * g, r += w * w, n += m * g, o += m * w, d += g * w;
  }
  let u = [1, 1, 1];
  for (let f = 0; f < 24; f++) {
    const m = it([
      i * u[0] + n * u[1] + o * u[2],
      n * u[0] + a * u[1] + d * u[2],
      o * u[0] + d * u[1] + r * u[2]
    ]);
    if (!m) return;
    u = m;
  }
  return u;
}
function wt(t, e, i, a) {
  const r = e.min.map((f, m) => (f + e.max[m]) / 2), n = le(H(e.max, e.min)), o = Math.max(i * 10, n / 50), d = (f) => [0, 1, 2].map(
    (m) => f.reduce((g, w) => g + w[m], 0) / f.length
  );
  let u = [{ hits: t, limits: [] }];
  for (let f = 0; f < 3; f++) {
    const m = [];
    let g = !1;
    for (const w of u) {
      if (w.hits.length < 2 || m.length + u.length >= 8) {
        m.push(w);
        continue;
      }
      const j = d(w.hits), A = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ], O = yt(w.hits, j);
      O && A.push(O);
      let E;
      for (const z of A) {
        const $ = w.hits.map((S) => de(S, z)).sort((S, h) => S - h);
        for (let S = 1; S < $.length; S++) {
          const h = $[S] - $[S - 1];
          h > o && (!E || h > E.size) && (E = { n: z, at: ($[S] + $[S - 1]) / 2, size: h });
        }
      }
      if (!E || !a(E.n, E.at, [r, j])) {
        m.push(w);
        continue;
      }
      g = !0;
      const k = [], P = [];
      for (const z of w.hits)
        (de(z, E.n) < E.at ? k : P).push(z);
      m.push({
        hits: k,
        limits: [...w.limits, { n: E.n, from: -1 / 0, to: E.at }]
      }), m.push({
        hits: P,
        limits: [...w.limits, { n: E.n, from: E.at, to: 1 / 0 }]
      });
    }
    if (u = m, !g) break;
  }
  return u;
}
function Te(t, e, i) {
  return i.every(({ n: a, from: r, to: n }) => {
    let o = 1 / 0, d = -1 / 0;
    for (let u = 0; u < 9; u += 3) {
      const f = pe(t, e, u) * a[0] + pe(t, e, u + 1) * a[1] + pe(t, e, u + 2) * a[2];
      f < o && (o = f), f > d && (d = f);
    }
    return d >= r && o <= n;
  });
}
function vt(t, e) {
  const i = je(t);
  if (!i) return !0;
  const a = [0, 0, 0];
  for (let o = 0; o < i; o++)
    for (let d = 0; d < 9; d += 3)
      for (let u = 0; u < 3; u++) a[u] += pe(t, o, d + u);
  for (let o = 0; o < 3; o++) a[o] /= i * 3;
  let r = 0, n = 0;
  for (let o = 0; o < i; o++) {
    const d = ve(t, o), u = H(d[0], a), f = H(d[1], a), m = H(d[2], a);
    r += de(u, ke(f, m)) / 6, n += le(ke(H(d[1], d[0]), H(d[2], d[0]))) / 2;
  }
  return Math.abs(r) <= e * n;
}
function kt(t, e, i) {
  const a = H(e[1], e[0]), r = H(e[2], e[0]), n = ke(a, r), o = le(n);
  if (o < 1e-20 || Math.abs(de(H(t, e[0]), n)) / o > i) return !1;
  const d = H(t, e[0]), u = de(a, a), f = de(a, r), m = de(r, r), g = de(d, a), w = de(d, r), j = u * m - f * f;
  if (Math.abs(j) < 1e-30) return !1;
  const A = (g * m - w * f) / j, O = (w * u - g * f) / j, E = i / Math.max(le(a), le(r), i);
  return A >= -E && O >= -E && A + O <= 1 + E;
}
function Ae(t, e, i, a) {
  if (!e.closed || t.some((g, w) => g <= e.bounds.min[w] + a || g >= e.bounds.max[w] - a))
    return !1;
  for (const g of Ee(i, { min: t, max: t }, a))
    if (kt(t, ve(e, g), a)) return !1;
  const r = [1, 0.371390676, 0.52999894], n = le(H(e.bounds.max, e.bounds.min)) * 3 + 1, o = $e(t, r, n), d = [], u = Oe([...t, ...o]);
  for (const g of Ee(i, u, a)) {
    const w = Be(t, o, ve(e, g), a);
    if (w) {
      const j = le(H(w, t));
      j > a && d.push(j);
    }
  }
  d.sort((g, w) => g - w);
  let f = 0, m = -1 / 0;
  for (const g of d)
    g - m > a * 2 && (f++, m = g);
  return f % 2 === 1;
}
async function Mt(t, e, i, a, r) {
  const n = e.precision / 1e3;
  if (!Number.isFinite(n) || n <= 0)
    throw Error("Точность расчёта должна быть положительным числом.");
  const o = t.filter((M) => e.includeHidden || !M.hidden), d = o.filter((M) => Ce(M, e.a)), u = o.filter((M) => Ce(M, e.b));
  if (!d.length || !u.length)
    throw Error(
      "Выборка А или Б не содержит элементов. Отметьте хотя бы одну модель в каждой стороне проверки."
    );
  let f = performance.now();
  const m = async () => {
    if (a())
      throw Error("Расчёт отменён. Предыдущие результаты сохранены.");
    performance.now() - f > 16 && (await new Promise((M) => setTimeout(M, 0)), f = performance.now());
  }, g = /* @__PURE__ */ new Map(), w = (M) => {
    let C = g.get(M.id);
    return C || (C = Fe(
      M,
      Array.from({ length: je(M) }, (W, R) => R)
    ), g.set(M.id, C)), C;
  }, j = /* @__PURE__ */ new Map(), A = (M) => {
    let C = j.get(M.id);
    return C === void 0 && (C = vt(M, n), j.set(M.id, C)), C;
  }, O = /* @__PURE__ */ new Map(), E = async (M) => {
    let C = O.get(M.id);
    if (C !== void 0) return C;
    const W = [];
    for (let R = 0; R < je(M); R++)
      W.push(
        [0, 3, 6].map(
          (he) => [0, 1, 2].map((q) => Math.round(pe(M, R, he + q) / n)).join(",")
        ).sort().join(";")
      ), R % 9e3 === 0 && await m();
    return C = W.sort().join("|"), O.set(M.id, C), C;
  }, k = [], P = new Set(d.map((M) => M.id)), z = new Set(u.map((M) => M.id)), $ = Ue(
    u,
    u.map((M, C) => C)
  ), S = /* @__PURE__ */ new Map();
  let h = 0;
  const J = (M) => M.triangles.byteLength + (M.vertices?.byteLength || 0) + (M.indices?.byteLength || 0) + je(M) * 32;
  async function U(M, C) {
    if (!r) return M;
    let W = S.get(M.id);
    if (W)
      return S.delete(M.id), S.set(M.id, W), W;
    for (const [R, he] of S)
      R !== C && h > 96 * 1024 * 1024 && (S.delete(R), h -= J(he), g.delete(R), O.delete(R));
    return W = await r(M.id), S.set(M.id, W), h += J(W), W;
  }
  let B = -1 / 0;
  for (let M = 0; M < d.length; M++) {
    const C = d[M];
    performance.now() - B > 150 && (B = performance.now(), i({
      phase: "Проверка пар",
      done: M,
      total: d.length,
      found: k.length
    }));
    const W = [...Ee($, C.bounds, n)];
    for (let R = 0; R < W.length; R++) {
      const he = W[R];
      performance.now() - B > 150 && (B = performance.now(), i({
        phase: `Проверка пар · A ${M + 1}/${d.length} · кандидаты ${R + 1}/${W.length}`,
        done: M,
        total: d.length,
        found: k.length
      }));
      const q = u[he];
      if (await m(), C.id === q.id || !ze(C.bounds, q.bounds, n) || e.ignoreSameModel && C.modelId === q.modelId || e.ignoreSameGroup && C.modelId === q.modelId && C.properties.Объект && C.properties.Объект === q.properties.Объект || e.equalProperty && C.properties[e.equalProperty] !== void 0 && C.properties[e.equalProperty] === q.properties[e.equalProperty] || C.id > q.id && P.has(q.id) && z.has(C.id)) continue;
      const ie = mt(C.id, q.id), L = await U(C), D = await U(q, C.id);
      let Z, oe = "surface", T = 0, xe = !1;
      if (e.type === "duplicates") {
        if (je(L) !== je(D) || L.bounds.min.some(
          (X, _) => Math.abs(X - D.bounds.min[_]) > n || Math.abs(L.bounds.max[_] - D.bounds.max[_]) > n
        ))
          continue;
        await E(L) === await E(D) && (Z = L.bounds.min.map((X, _) => (X + L.bounds.max[_]) / 2), oe = "duplicate");
      } else {
        const X = w(L), _ = w(D), se = {
          min: L.bounds.min.map(
            (K, ee) => Math.max(K, D.bounds.min[ee])
          ),
          max: L.bounds.max.map(
            (K, ee) => Math.min(K, D.bounds.max[ee])
          )
        }, be = se.min.map(
          (K, ee) => (K + se.max[ee]) / 2
        ), me = new xt(), ae = [];
        let Me = 1, fe = 0, ce = 1 / 0, V = 0;
        for (const [K, ee] of ye(X, _, n)) {
          const G = ve(L, K), F = ve(D, ee);
          if (!ze(Oe(G.flat()), Oe(F.flat()), n)) continue;
          const Y = gt(G, F, n, e.touching);
          if (Y) {
            const ue = le(H(Y, be));
            if ((!Z || ue < ce) && (Z = Y, ce = ue), me.add(G), me.add(F), fe++ % Me === 0 && (ae.push(Y), ae.length >= 8192)) {
              for (let ge = 0; ge * 2 < ae.length; ge++) ae[ge] = ae[ge * 2];
              ae.length = Math.ceil(ae.length / 2), Me *= 2;
            }
          }
          ++V % 256 === 0 && (performance.now() - B > 150 && (B = performance.now(), i({
            phase: `Геометрия пары · A ${M + 1}/${d.length}`,
            done: M,
            total: d.length,
            found: k.length
          })), await m());
        }
        if (!Z && L.closed && D.closed) {
          const K = L.bounds.min.map(
            (ee, G) => (ee + L.bounds.max[G]) / 2
          );
          Ae(K, L, X, n) && Ae(K, D, _, n) && (Z = K, oe = "contained");
        }
        if (!Z) {
          for (const [K, ee, G] of [
            [L, D, _],
            [D, L, X]
          ])
            if (ee.closed) {
              for (let F = 0; F < je(K) && !Z; F++) {
                const Y = ve(K, F), ue = Y[0].map(
                  (ge, Se) => (Y[0][Se] + Y[1][Se] + Y[2][Se]) / 3
                );
                for (const ge of [Y[0], ue])
                  if (Ae(ge, ee, G, n)) {
                    Z = ge, oe = "contained";
                    break;
                  }
                await m();
              }
              if (Z) break;
            }
        }
        if (Z) {
          const K = (l, c) => [...Ee(c, se, n)].filter(
            (p) => ze(Oe(ve(l, p).flat()), se, n)
          ), ee = K(L, X), G = K(D, _);
          oe !== "surface" && (me.addFrom(L, ee), me.addFrom(D, G)), await m();
          const F = se.min.map(
            (l, c) => (l + se.max[c]) / 2
          ), Y = (l, c) => l === 0 ? Ae(c, L, X, n) : Ae(c, D, _, n), ge = wt(ae, se, n, (l, c, p) => L.closed && D.closed && p.every((x) => {
            const v = $e(x, l, c - de(x, l));
            return !Y(0, v) || !Y(1, v);
          })), Se = me.values();
          let s = 0;
          for (const l of ge) {
            const c = l.limits.length ? ee.filter((b) => Te(L, b, l.limits)) : ee, p = l.limits.length ? G.filter((b) => Te(D, b, l.limits)) : G, x = l.hits.length ? [0, 1, 2].map(
              (b) => l.hits.reduce((y, I) => y + I[b], 0) / l.hits.length
            ) : F, v = bt(
              L,
              D,
              c,
              p,
              Se,
              se,
              x,
              Y
            );
            v > s && (s = v), await m();
          }
          if (s *= 1e3, A(L) || A(D)) xe = !0;
          else if (s <= 0 && !e.touching) continue;
          T = xe ? 0 : e.touching ? s : Math.max(e.precision, s), await m();
        }
        if (Z && !xe && T + e.precision < e.minPenetration)
          continue;
      }
      if (Z && (k.push({
        id: ie,
        a: Qe(L),
        b: Qe(D),
        point: Z,
        kind: oe,
        state: "new",
        note: "",
        assignee: "",
        firstSeen: "",
        lastSeen: "",
        penetrationMm: T,
        ...xe ? { unmeasured: !0 } : {}
      }), k.length >= 5e4))
        throw Error(
          "Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат."
        );
    }
  }
  return i({
    phase: "Готово",
    done: d.length,
    total: d.length,
    found: k.length
  }), k;
}
const nt = '(function(){"use strict";const It=({triangles:n,vertices:t,indices:i,triangleCount:a,closed:f,bounds:e,...l})=>l;function vt(n,t){return t.exclude.includes(n.id)?!1:t.include.includes(n.id)?!0:!(t.manualOnly||t.modelsMode==="selected"&&!t.models.includes(n.modelId)||t.modelsMode===void 0&&t.models.length&&!t.models.includes(n.modelId))}const jt=(n,t)=>JSON.stringify([n,t].sort()),p=(n,t)=>[n[0]-t[0],n[1]-t[1],n[2]-t[2]],it=(n,t,i=1)=>[n[0]+t[0]*i,n[1]+t[1]*i,n[2]+t[2]*i],E=(n,t)=>n[0]*t[0]+n[1]*t[1]+n[2]*t[2],R=(n,t)=>[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]],S=n=>Math.hypot(...n),bt=n=>{const t=S(n);return t>1e-20?[n[0]/t,n[1]/t,n[2]/t]:void 0},k=n=>n.triangleCount??(n.indices?n.indices.length/3:n.triangles.length/9),L=(n,t,i)=>n.indices&&n.vertices?n.vertices[n.indices[t*3+Math.floor(i/3)]*3+i%3]:n.triangles[t*9+i],U=(n,t)=>[0,3,6].map(i=>[L(n,t,i),L(n,t,i+1),L(n,t,i+2)]);function mt(n){const t=[1/0,1/0,1/0],i=[-1/0,-1/0,-1/0];for(let a=0;a<n.length;a++){const f=a%3;t[f]=Math.min(t[f],n[a]),i[f]=Math.max(i[f],n[a])}return{min:t,max:i}}const et=(n,t,i)=>n.min.every((a,f)=>a<=t.max[f]+i&&n.max[f]>=t.min[f]-i);function yt(n,t){const i={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const o of t)for(let s=0;s<9;s++){const c=s%3,r=L(n,o,s);i.min[c]=Math.min(i.min[c],r),i.max[c]=Math.max(i.max[c],r)}if(t.length<=12)return{...i,ids:t};const a=i.max.map((o,s)=>o-i.min[s]),f=a.indexOf(Math.max(...a)),e=o=>L(n,o,f)+L(n,o,f+3)+L(n,o,f+6);t.sort((o,s)=>e(o)-e(s));const l=t.length>>1;return{...i,left:yt(n,t.slice(0,l)),right:yt(n,t.slice(l))}}function*tt(n,t,i){et(n,t,i)&&(n.ids?yield*n.ids:(yield*tt(n.left,t,i),yield*tt(n.right,t,i)))}function*B(n,t,i){if(et(n,t,i)){if(n.ids&&t.ids){for(const a of n.ids)for(const f of t.ids)yield[a,f];return}if(n.ids){yield*B(n,t.left,i),yield*B(n,t.right,i);return}if(t.ids){yield*B(n.left,t,i),yield*B(n.right,t,i);return}yield*B(n.left,t.left,i),yield*B(n.left,t.right,i),yield*B(n.right,t.left,i),yield*B(n.right,t.right,i)}}function xt(n,t){const i={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const l of t)for(let o=0;o<3;o++)i.min[o]=Math.min(i.min[o],n[l].bounds.min[o]),i.max[o]=Math.max(i.max[o],n[l].bounds.max[o]);if(t.length<=16)return{...i,ids:t};const a=i.max.map((l,o)=>l-i.min[o]),f=a.indexOf(Math.max(...a));t.sort((l,o)=>n[l].bounds.min[f]+n[l].bounds.max[f]-(n[o].bounds.min[f]+n[o].bounds.max[f]));const e=t.length>>1;return{...i,left:xt(n,t.slice(0,e)),right:xt(n,t.slice(e))}}function pt(n,t,i,a){const f=p(t,n),e=p(i[1],i[0]),l=p(i[2],i[0]),o=R(f,l),s=E(e,o);if(Math.abs(s)<=1e-12*S(f)*S(e)*S(l))return;const c=1/s,r=p(n,i[0]),d=E(r,o)*c,m=R(r,e),z=E(f,m)*c,b=E(l,m)*c,q=a/Math.max(S(e),S(l),a);if(d>=-q&&z>=-q&&d+z<=1+q&&b>=-q&&b<=1+q)return it(n,f,Math.max(0,Math.min(1,b)))}function Pt(n,t,i,a){const f=i.map(Math.abs).indexOf(Math.max(...i.map(Math.abs))),e=[0,1,2].filter(s=>s!==f),l=(s,c,r)=>(c[e[0]]-s[e[0]])*(r[e[1]]-s[e[1]])-(c[e[1]]-s[e[1]])*(r[e[0]]-s[e[0]]),o=(s,c)=>{const r=c.map((d,m)=>l(d,c[(m+1)%3],s));return r.every(d=>d>=-a*S(i))||r.every(d=>d<=a*S(i))};for(const s of n)if(o(s,t))return s;for(const s of t)if(o(s,n))return s;for(let s=0;s<3;s++)for(let c=0;c<3;c++){const r=n[s],d=n[(s+1)%3],m=t[c],z=t[(c+1)%3],b=p(d,r),q=p(z,m),I=b[e[0]]*q[e[1]]-b[e[1]]*q[e[0]];if(Math.abs(I)<1e-18)continue;const g=p(m,r),x=(g[e[0]]*q[e[1]]-g[e[1]]*q[e[0]])/I,w=(g[e[0]]*b[e[1]]-g[e[1]]*b[e[0]])/I;if(x>=0&&x<=1&&w>=0&&w<=1)return it(r,b,x)}}function St(n,t,i,a){const f=R(p(n[1],n[0]),p(n[2],n[0])),e=R(p(t[1],t[0]),p(t[2],t[0])),l=S(f),o=S(e);if(l<1e-20||o<1e-20)return;const s=t.map(r=>E(p(r,n[0]),f)/l),c=n.map(r=>E(p(r,t[0]),e)/o);if(!(s.every(r=>r>i)||s.every(r=>r<-i)||c.every(r=>r>i)||c.every(r=>r<-i))){if(s.every(r=>Math.abs(r)<=i)&&c.every(r=>Math.abs(r)<=i))return a?Pt(n,t,f,i):void 0;if(!(!a&&(!(Math.min(...s)<-i&&Math.max(...s)>i)||!(Math.min(...c)<-i&&Math.max(...c)>i))))for(let r=0;r<3;r++){const d=pt(n[r],n[(r+1)%3],t,i);if(d)return d;const m=pt(t[r],t[(r+1)%3],n,i);if(m)return m}}}class Et{world=[[1,0,0],[0,1,0],[0,0,1]];items=new Map;step=1e4;key(t){return t.map(i=>Math.round(i*this.step)).join(",")}add(t){const i=bt(R(p(t[1],t[0]),p(t[2],t[0])));if(!i)return;const f=i[0]<-1e-9||Math.abs(i[0])<=1e-9&&(i[1]<-1e-9||Math.abs(i[1])<=1e-9&&i[2]<0)?[-i[0],-i[1],-i[2]]:[i[0],i[1],i[2]],e=this.key(f);for(this.items.has(e)||this.items.set(e,f);this.items.size>512&&this.step>10;){this.step/=10;const l=new Map;for(const o of this.items.values()){const s=this.key(o);l.has(s)||l.set(s,o)}this.items=l}}addFrom(t,i){for(const a of i)this.add(U(t,a))}values(){return[...this.world,...[...this.items].sort((t,i)=>t[0]<i[0]?-1:1).map(([,t])=>t)]}}function Ot(n,t,i,a,f,e,l,o){const s=g=>{let x=1/0,w=-1/0;for(let M=0;M<8;M++){const y=(M&1?e.max[0]:e.min[0])*g[0]+(M&2?e.max[1]:e.min[1])*g[1]+(M&4?e.max[2]:e.min[2])*g[2];y<x&&(x=y),y>w&&(w=y)}return[x,w]},c=(g,x,w,M,y)=>{let _=1/0,O=-1/0;for(const J of x){let $=1/0,u=-1/0;for(let h=0;h<9;h+=3){const j=L(g,J,h)*w[0]+L(g,J,h+1)*w[1]+L(g,J,h+2)*w[2];j<$&&($=j),j>u&&(u=j)}u<M||$>y||($<M&&($=M),u>y&&(u=y),$<_&&(_=$),u>O&&(O=u))}return _===1/0?void 0:[_,O]};if(e.min.some((g,x)=>e.max[x]-g<=0))return 0;const r=Math.ceil((i.length+a.length)/4096),d=r>1?f.filter((g,x)=>x<3||x%r===0):f,m=(g,x,w,M,y)=>{const _=$=>it(l,w,$-E(l,w));if(!x)return o(g,_((M+y)/2))?[M,y]:void 0;let[O,J]=x;return O>M&&o(g,_((M+O)/2))&&(O=M),J<y&&o(g,_((J+y)/2))&&(J=y),[O,J]},z=(g,x)=>g&&x?Math.min(g[1],x[1])-Math.max(g[0],x[0]):0;let b=1/0,q=!1,I=0;for(let g=0;g<d.length;g++){const x=d[g],[w,M]=s(x),y=c(n,i,x,w,M),_=c(t,a,x,w,M);let O=z(y,_);O<=0&&I++<32&&(O=z(m(0,y,x,w,M),m(1,_,x,w,M))),!(O<=0)&&(q=!0,O<b&&(b=O))}return q&&Number.isFinite(b)?b:0}function Tt(n,t){let i=0,a=0,f=0,e=0,l=0,o=0;for(const c of n){const r=c[0]-t[0],d=c[1]-t[1],m=c[2]-t[2];i+=r*r,a+=d*d,f+=m*m,e+=r*d,l+=r*m,o+=d*m}let s=[1,1,1];for(let c=0;c<24;c++){const r=bt([i*s[0]+e*s[1]+l*s[2],e*s[0]+a*s[1]+o*s[2],l*s[0]+o*s[1]+f*s[2]]);if(!r)return;s=r}return s}function $t(n,t,i,a){const f=t.min.map((c,r)=>(c+t.max[r])/2),e=S(p(t.max,t.min)),l=Math.max(i*10,e/50),o=c=>[0,1,2].map(r=>c.reduce((d,m)=>d+m[r],0)/c.length);let s=[{hits:n,limits:[]}];for(let c=0;c<3;c++){const r=[];let d=!1;for(const m of s){if(m.hits.length<2||r.length+s.length>=8){r.push(m);continue}const z=o(m.hits),b=[[1,0,0],[0,1,0],[0,0,1]],q=Tt(m.hits,z);q&&b.push(q);let I;for(const w of b){const M=m.hits.map(y=>E(y,w)).sort((y,_)=>y-_);for(let y=1;y<M.length;y++){const _=M[y]-M[y-1];_>l&&(!I||_>I.size)&&(I={n:w,at:(M[y]+M[y-1])/2,size:_})}}if(!I||!a(I.n,I.at,[f,z])){r.push(m);continue}d=!0;const g=[],x=[];for(const w of m.hits)(E(w,I.n)<I.at?g:x).push(w);r.push({hits:g,limits:[...m.limits,{n:I.n,from:-1/0,to:I.at}]}),r.push({hits:x,limits:[...m.limits,{n:I.n,from:I.at,to:1/0}]})}if(s=r,!d)break}return s}function qt(n,t,i){return i.every(({n:a,from:f,to:e})=>{let l=1/0,o=-1/0;for(let s=0;s<9;s+=3){const c=L(n,t,s)*a[0]+L(n,t,s+1)*a[1]+L(n,t,s+2)*a[2];c<l&&(l=c),c>o&&(o=c)}return o>=f&&l<=e})}function Ft(n,t){const i=k(n);if(!i)return!0;const a=[0,0,0];for(let l=0;l<i;l++)for(let o=0;o<9;o+=3)for(let s=0;s<3;s++)a[s]+=L(n,l,o+s);for(let l=0;l<3;l++)a[l]/=i*3;let f=0,e=0;for(let l=0;l<i;l++){const o=U(n,l),s=p(o[0],a),c=p(o[1],a),r=p(o[2],a);f+=E(s,R(c,r))/6,e+=S(R(p(o[1],o[0]),p(o[2],o[0])))/2}return Math.abs(f)<=t*e}function At(n,t,i){const a=p(t[1],t[0]),f=p(t[2],t[0]),e=R(a,f),l=S(e);if(l<1e-20||Math.abs(E(p(n,t[0]),e))/l>i)return!1;const o=p(n,t[0]),s=E(a,a),c=E(a,f),r=E(f,f),d=E(o,a),m=E(o,f),z=s*r-c*c;if(Math.abs(z)<1e-30)return!1;const b=(d*r-m*c)/z,q=(m*s-d*c)/z,I=i/Math.max(S(a),S(f),i);return b>=-I&&q>=-I&&b+q<=1+I}function ot(n,t,i,a){if(!t.closed||n.some((d,m)=>d<=t.bounds.min[m]+a||d>=t.bounds.max[m]-a))return!1;for(const d of tt(i,{min:n,max:n},a))if(At(n,U(t,d),a))return!1;const f=[1,.371390676,.52999894],e=S(p(t.bounds.max,t.bounds.min))*3+1,l=it(n,f,e),o=[],s=mt([...n,...l]);for(const d of tt(i,s,a)){const m=pt(n,l,U(t,d),a);if(m){const z=S(p(m,n));z>a&&o.push(z)}}o.sort((d,m)=>d-m);let c=0,r=-1/0;for(const d of o)d-r>a*2&&(c++,r=d);return c%2===1}async function Ct(n,t,i,a,f){const e=t.precision/1e3;if(!Number.isFinite(e)||e<=0)throw Error("Точность расчёта должна быть положительным числом.");const l=n.filter(u=>t.includeHidden||!u.hidden),o=l.filter(u=>vt(u,t.a)),s=l.filter(u=>vt(u,t.b));if(!o.length||!s.length)throw Error("Выборка А или Б не содержит элементов. Отметьте хотя бы одну модель в каждой стороне проверки.");let c=performance.now();const r=async()=>{if(a())throw Error("Расчёт отменён. Предыдущие результаты сохранены.");performance.now()-c>16&&(await new Promise(u=>setTimeout(u,0)),c=performance.now())},d=new Map,m=u=>{let h=d.get(u.id);return h||(h=yt(u,Array.from({length:k(u)},(j,F)=>F)),d.set(u.id,h)),h},z=new Map,b=u=>{let h=z.get(u.id);return h===void 0&&(h=Ft(u,e),z.set(u.id,h)),h},q=new Map,I=async u=>{let h=q.get(u.id);if(h!==void 0)return h;const j=[];for(let F=0;F<k(u);F++)j.push([0,3,6].map(st=>[0,1,2].map(H=>Math.round(L(u,F,st+H)/e)).join(",")).sort().join(";")),F%9e3===0&&await r();return h=j.sort().join("|"),q.set(u.id,h),h},g=[],x=new Set(o.map(u=>u.id)),w=new Set(s.map(u=>u.id)),M=xt(s,s.map((u,h)=>h)),y=new Map;let _=0;const O=u=>u.triangles.byteLength+(u.vertices?.byteLength||0)+(u.indices?.byteLength||0)+k(u)*32;async function J(u,h){if(!f)return u;let j=y.get(u.id);if(j)return y.delete(u.id),y.set(u.id,j),j;for(const[F,st]of y)F!==h&&_>96*1024*1024&&(y.delete(F),_-=O(st),d.delete(F),q.delete(F));return j=await f(u.id),y.set(u.id,j),_+=O(j),j}let $=-1/0;for(let u=0;u<o.length;u++){const h=o[u];performance.now()-$>150&&($=performance.now(),i({phase:"Проверка пар",done:u,total:o.length,found:g.length}));const j=[...tt(M,h.bounds,e)];for(let F=0;F<j.length;F++){const st=j[F];performance.now()-$>150&&($=performance.now(),i({phase:`Проверка пар · A ${u+1}/${o.length} · кандидаты ${F+1}/${j.length}`,done:u,total:o.length,found:g.length}));const H=s[st];if(await r(),h.id===H.id||!et(h.bounds,H.bounds,e)||t.ignoreSameModel&&h.modelId===H.modelId||t.ignoreSameGroup&&h.modelId===H.modelId&&h.properties.Объект&&h.properties.Объект===H.properties.Объект||t.equalProperty&&h.properties[t.equalProperty]!==void 0&&h.properties[t.equalProperty]===H.properties[t.equalProperty]||h.id>H.id&&x.has(H.id)&&w.has(h.id))continue;const Nt=jt(h.id,H.id),v=await J(h),P=await J(H,h.id);let G,rt="surface",wt=0,ht=!1;if(t.type==="duplicates"){if(k(v)!==k(P)||v.bounds.min.some((D,K)=>Math.abs(D-P.bounds.min[K])>e||Math.abs(v.bounds.max[K]-P.bounds.max[K])>e))continue;await I(v)===await I(P)&&(G=v.bounds.min.map((D,K)=>(D+v.bounds.max[K])/2),rt="duplicate")}else{const D=m(v),K=m(P),V={min:v.bounds.min.map((T,A)=>Math.max(T,P.bounds.min[A])),max:v.bounds.max.map((T,A)=>Math.min(T,P.bounds.max[A]))},Gt=V.min.map((T,A)=>(T+V.max[A])/2),at=new Et,W=[];let _t=1,Ht=0,zt=1/0,Jt=0;for(const[T,A]of B(D,K,e)){const X=U(v,T),Q=U(P,A);if(!et(mt(X.flat()),mt(Q.flat()),e))continue;const N=St(X,Q,e,t.touching);if(N){const ft=S(p(N,Gt));if((!G||ft<zt)&&(G=N,zt=ft),at.add(X),at.add(Q),Ht++%_t===0&&(W.push(N),W.length>=8192)){for(let Y=0;Y*2<W.length;Y++)W[Y]=W[Y*2];W.length=Math.ceil(W.length/2),_t*=2}}++Jt%256===0&&(performance.now()-$>150&&($=performance.now(),i({phase:`Геометрия пары · A ${u+1}/${o.length}`,done:u,total:o.length,found:g.length})),await r())}if(!G&&v.closed&&P.closed){const T=v.bounds.min.map((A,X)=>(A+v.bounds.max[X])/2);ot(T,v,D,e)&&ot(T,P,K,e)&&(G=T,rt="contained")}if(!G){for(const[T,A,X]of[[v,P,K],[P,v,D]])if(A.closed){for(let Q=0;Q<k(T)&&!G;Q++){const N=U(T,Q),ft=N[0].map((Y,lt)=>(N[0][lt]+N[1][lt]+N[2][lt])/3);for(const Y of[N[0],ft])if(ot(Y,A,X,e)){G=Y,rt="contained";break}await r()}if(G)break}}if(G){const T=(C,Z)=>[...tt(Z,V,e)].filter(ct=>et(mt(U(C,ct).flat()),V,e)),A=T(v,D),X=T(P,K);rt!=="surface"&&(at.addFrom(v,A),at.addFrom(P,X)),await r();const Q=V.min.map((C,Z)=>(C+V.max[Z])/2),N=(C,Z)=>C===0?ot(Z,v,D,e):ot(Z,P,K,e),Y=$t(W,V,e,(C,Z,ct)=>v.closed&&P.closed&&ct.every(gt=>{const ut=it(gt,C,Z-E(gt,C));return!N(0,ut)||!N(1,ut)})),lt=at.values();let nt=0;for(const C of Y){const Z=C.limits.length?A.filter(dt=>qt(v,dt,C.limits)):A,ct=C.limits.length?X.filter(dt=>qt(P,dt,C.limits)):X,gt=C.hits.length?[0,1,2].map(dt=>C.hits.reduce((Kt,Xt)=>Kt+Xt[dt],0)/C.hits.length):Q,ut=Ot(v,P,Z,ct,lt,V,gt,N);ut>nt&&(nt=ut),await r()}if(nt*=1e3,b(v)||b(P))ht=!0;else if(nt<=0&&!t.touching)continue;wt=ht?0:t.touching?nt:Math.max(t.precision,nt),await r()}if(G&&!ht&&wt+t.precision<t.minPenetration)continue}if(G&&(g.push({id:Nt,a:It(v),b:It(P),point:G,kind:rt,state:"new",note:"",assignee:"",firstSeen:"",lastSeen:"",penetrationMm:wt,...ht?{unmeasured:!0}:{}}),g.length>=5e4))throw Error("Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат.")}}return i({phase:"Готово",done:o.length,total:o.length,found:g.length}),g}let Lt=0;const Mt=new Map;self.onmessage=async n=>{if(n.data.request!==void 0){const t=Mt.get(n.data.request);Mt.delete(n.data.request),n.data.error?t?.reject(Error(n.data.error)):t?.resolve(n.data.geometry);return}try{const{elements:t,check:i}=n.data,a=await Ct(t,i,f=>self.postMessage({progress:f}),()=>!1,n.data.streaming?f=>new Promise((e,l)=>{const o=Lt++;Mt.set(o,{resolve:e,reject:l}),self.postMessage({load:f,request:o})}):void 0);self.postMessage({results:a})}catch(t){self.postMessage({error:t instanceof Error?t.message:String(t)})}}})();\n', He = typeof self < "u" && self.Blob && new Blob(["(self.URL || self.webkitURL).revokeObjectURL(self.location.href);", nt], { type: "text/javascript;charset=utf-8" });
function St(t) {
  let e;
  try {
    if (e = He && (self.URL || self.webkitURL).createObjectURL(He), !e) throw "";
    const i = new Worker(e, {
      name: t?.name
    });
    return i.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(e);
    }), i;
  } catch {
    return new Worker(
      "data:text/javascript;charset=utf-8," + encodeURIComponent(nt),
      {
        name: t?.name
      }
    );
  }
}
const te = (t) => String(t ?? "").replace(
  /[&<>"']/g,
  (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[e]
);
function Je(t, e) {
  const i = URL.createObjectURL(
    new Blob([e], {
      type: t.endsWith(".html") ? "text/html;charset=utf-8" : "application/json;charset=utf-8"
    })
  ), a = document.createElement("a");
  a.href = i, a.download = t, a.click(), setTimeout(() => URL.revokeObjectURL(i), 6e4);
}
function It(t, e) {
  const i = te;
  return `<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${i(t.name)}</title><style>body{font:14px/1.5 system-ui;margin:24px;background:#171c23;color:#e6edf5}h1{margin:0}small{color:#a9b7c8}input,select{padding:10px;margin:15px 8px 15px 0;max-width:100%;background:#242e3b;color:inherit;border:1px solid #506074;border-radius:6px}.wrap{overflow:auto}table{border-collapse:separate;border-spacing:0;width:100%}td,th{padding:10px;border-bottom:1px solid #39475a;min-width:100px;vertical-align:top;overflow-wrap:anywhere}th{background:#253142;position:sticky;top:0;text-align:left;white-space:normal}td{max-width:350px}tr[hidden]{display:none}.shot{display:block;width:260px;border:0;background:transparent;padding:0;cursor:zoom-in}dialog{width:min(94vw,1400px);border:1px solid #506074;background:#20242b;color:white;border-radius:10px}dialog img{max-width:100%;max-height:80vh;display:block;margin:12px auto}dialog::backdrop{background:#000b}.shot img{width:100%;border-radius:6px}.legend{margin:12px 0}.red{color:#ff6161}.blue{color:#65baff}@media print{input,select{display:none}body{background:white;color:black}.wrap{overflow:visible}th{position:static;background:#eee}}</style><h1>${i(t.name)}</h1><small>НашеПО · Проверки коллизий · ${i(t.lastRun || "")} · ${t.status === "stale" ? "Результат устарел" : "Последний завершённый расчёт"}</small><p>${i(t.type === "duplicates" ? "Совпадение треугольной геометрии" : "Пересечения поверхностей и вложенность замкнутых тел")}. Точность: ${i(t.precision)} мм${t.type === "intersection" ? `; минимальная глубина: ${i(t.minPenetration)} мм` : ""}. Глубина Hard Clash — толщина самого сильного из отдельных перекрытий пары, замеренная вдоль граней контакта и осей координат. Значение не зависит от густоты треугольной сетки и от размеров элементов. «Не определена» означает, что у одного из элементов нет собственной толщины: конфликт реален, но объёмный замер к нему неприменим, и порог минимальной глубины на такие строки не действует.</p><p class="legend"><span class="red">● Элемент А выделен красным</span> · <span class="blue">● элемент Б — синим</span></p><input id="search" type="search" placeholder="Поиск по всему отчёту"><select id="state"><option value="">Все состояния</option>${Object.entries(
    we
  ).map(([a, r]) => `<option value="${a}">${r}</option>`).join(
    ""
  )}</select>${t.type === "intersection" ? '<input id="depth" type="number" min="0" step="1" placeholder="Глубина от, мм">' : ""}<span id="count"></span><div class="wrap"><table><thead><tr>${["Снимок", "№", "Состояние", "Глубина, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "X", "Y", "Z", "Назначение", "Комментарий"].map((a) => `<th>${a}</th>`).join("")}</tr></thead><tbody>${e.map((a, r) => `<tr data-state="${a.state}" data-depth="${a.penetrationMm ?? 0}"${a.unmeasured ? ' data-unmeasured="1"' : ""}><td>${qe(a.image) ? `<button class="shot" type="button"><img src="${a.image}" alt="Снимок конфликта ${r + 1}" loading="lazy"></button>` : "Снимок отсутствует"}</td>${[r + 1, we[a.state], t.type === "duplicates" ? "—" : a.unmeasured ? "не определена" : (a.penetrationMm ?? 0).toFixed(1), a.a.name, a.a.model, a.a.guid, a.b.name, a.b.model, a.b.guid, ...a.point.map((n) => n.toFixed(4)), a.assignee, a.note].map((n) => `<td>${i(n)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><dialog id="picture"><button id="close-picture">Закрыть</button><img id="full-picture" alt="Снимок конфликта"></dialog><script>const modal=document.getElementById("picture");document.getElementById("close-picture").onclick=()=>modal.close();for(const b of document.querySelectorAll(".shot"))b.onclick=()=>{document.getElementById("full-picture").src=b.querySelector("img").src;modal.showModal()};const PREC=${Number(t.precision) || 0},q=document.getElementById('search'),s=document.getElementById('state'),d=document.getElementById('depth'),rows=[...document.querySelectorAll('tbody tr')];function filter(){let n=0;for(const r of rows){r.hidden=!!((s.value&&r.dataset.state!==s.value)||(d&&!r.dataset.unmeasured&&Number(r.dataset.depth)+PREC<Number(d.value||0))||!r.textContent.toLowerCase().includes(q.value.toLowerCase()));if(!r.hidden)n++}document.getElementById('count').textContent='Коллизий: '+n}q.oninput=s.onchange=filter;if(d)d.oninput=filter;filter()<\/script></html>`;
}
function jt(t, e) {
  return JSON.stringify(
    {
      version: 1,
      id: t.id,
      name: t.name,
      images: Object.fromEntries(
        e.filter((i) => qe(i.image)).map((i) => [i.id + ".jpg", i.image])
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
            image: qe(i.image) ? i.id + ".jpg" : "",
            enabled: i.state !== "resolved",
            reviewed: i.state === "resolved" || i.state === "reviewed" || i.state === "approved",
            excluded: i.state === "excluded",
            elements: [i.a, i.b].map((r) => ({
              guid: r.guid,
              id: r.id,
              source: r.model,
              name: r.name,
              properties: r.properties
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
const Et = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAydpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAzIDc5Ljk2OTBhODdmYywgMjAyNS8wMy8wNi0yMDo1MDoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDZFQkU2NEQ4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDZFQkU2NEM4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI2LjExIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRENDVBNjQzODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRENDVBNjQ0ODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+pHX+ogAAD+lJREFUeNrsnXtwVPUVx2/CZvMgQEhCSAwJJDzDqwgodCq08hAr7wpSo1M6o/5Rq6NUcdqp1XamdjqOY6mvWhWnttZpRRtbaRGpMMKMZlB8gaFaQoQQSEhIQt7hkfTzhY1ulnt37929mw1T7sxls3vv/f3O7/zO43vO7/wucd3d3calI/zDo3927txpnDx5MqaEpKenpyUlJWUlJCQM6+rqSm1vb/fyGRcfH9+dkpLSGRcX13Lq1Knajo6Omvr6+ia+x4zWtLQ0Y86cOee/SAKLiopiyjwYlz5ixIhyPk8PGDBAKnHB6fF4unU9Ly+vDCanxpLeqVOnnuObznj9kJycHFMGwpRrjh8/Xoh0ec6ePWt6z5kzZwxdr62tLcrPz786lvT68ys+1jYEaTJQx+tRT1v3w0QDabweSe0XNjDmDBwyZEh6U1PTPCfPtLS0LOK5QZcYyDF48OAFjY2N6U6eaWhoyIaBc//vGSg1RIXXSC2dHG1tbYbX610dS08cUwYmJiYa2dnZWRMmTFiO9C0Ipw3UfgnoYfHw4cMzYWZscWAEeChj2LBha8CQm+vq6g6D26xnKj5eWC+dZ67l71VI0dxDhw5lYM/C6vvYsWMZzc3Nm4cOHVo7atSot/Hem6DjzRMnTjQGCw4k9RkZGYWYgGtrampeZCKaIuKgOps+fbrj55AgwYmPkabunJyceqThEaQhT4wKJPiyyy4bx/VHgStVQABTnBfpCdjuhp7D9PMw9BQGemnRBc0FXP8tdDaKbhj/Hn+Pdjr2WbNmfYkDw2IgjJgDMdX+A1DEwG8nUEsNYJTUSp98fzIrK6tF16PBuMBT/cCUk/T7Gz5HiI7c3NwxfN8gxgXSweRWcv3KPmOgQG9mZmaz1QAUScDIhvHjx/8Zgmsx9GExAjXrLigo6Ebrw2YkdBwdN26c6GgKNoGYoXoioblRZyAqsoDOWqMlOVJDbKQY10Zf3VJ3feo7Nuvc92hJsqQWJn7DKQNtOxHEfCZw4xVCqRS3PNigQYMEpCv5/BBJfa+zs3MfElyB1D1RWlp6le45fPiwMXv27D2o4p04ikI+p0D4FTiQaXjw3HCdUOCBQxmMxJZgdubhoPa56kRQ2REw8LAbMy3jjRmoxiY9VVhYuABmDRKs6TnGjBlTTNKg1zP6zu83+sMgVHwwTmAhpuIZJKcWxroiibT1OTRluabCqampKajQO5ESBmCWOn6GF7wLdckyi2WZpALOBrPn9TsGv8AMliA52UzIj5iYA+onUloZ778xJ4muMBD1SoGwzyIhiIE3MMCfgNks01AQrLTa1mDt6LruC5JTHEI/D8ppRELvyJEjPxo4cKDXNScyevTomwPVyq668uxmGDg2VNg1ceLEO0JhRF2HiT8M1o76ob8izMO2cNRajoxnV7rqhZFCL7OyzwkhOIcuIMRPmUk70GgCxrvFTrvc18z940O1iekZgH38JbQ7Vd/3oHmA6zAGSbrJrhTidFox8KsCo5IgA93pZJCo6ds8F28nWQFDbka1OxxI34qo4EBmMgGmfBqKCHCiJGS+HQQgdUN175OqOzUNPLfeTjZG9+C8FsPEdhvS9z7SFx81II0UrglmpyCykxn8tl0IhVmYisFvDxP4tsOYqXb7gjkrMStnrNqDcWe5Z4lTIO0onQWQbfAt+lxwyNYRRfzg4MGDW2wmUhOQpGcBsElhAt8kJvNZtWPn/i+++KIE03K31fqPxqXxRS0bIxVmhj62in9xGE9pfcOu6k6aNOnBSMGvnqedB+wmVpVYgM4XrMJBNOxd7GB0VJhI4HtWtgpV2oskpNhcwjRwGt/CVp5yI3JQO7T3TbVr5wCLDiHaOGDlRGDid1yPhQVjWFa8j1jVbFFI4n8Xeck2q0Qqz3tQ78kQOI+k6yLWNOYQUycYLhxqBwncgj3dRV9bSdRuJ0beS6x81izBS98nsdXr8OL/CIyjtVQAU36MOXqttbW1yzUVxjEs1eyYzRoq8XJgSl2xKjnATKR2Cd7ycWZ1H/any40wK1S4qH7UH/0+pv5Fh3+s3UPf2LFj/2nWhnAjaONq1yRQdo2ZvUWzY5LSbyeNvl5runQcx/ciZk+dL2J2Z2PohyEJfbY+cfr0aYOlhTjOSXydBE13oiG12O5Svm9FqnYgnWWiCfru4fpC/u6lCbpGaH0ra887tJgf8ZoI4p6Lei40U01sz9sQlE9m5A6YOB9mToFpHruL5NE+xAzOYfy5FC1ZygSfAf7sxQa+hfS8zue7e/bsmRuo6jD3OmxlJuahLmIVRtRvCfSWwoL8LuDZKpEPN+scq1P04vTOJWo1jkBs60uffTdiFZaU4SCuC5QoPJ9x5MgRgwqqFOMiPDRwLcZxJgsXajxK3Bp+5SOYLgUEfwlrXRj9V6NDMcSrUdG5JoDa6C+1KYYLi/tmBU2Yo4WMfwVOaYj4EdQGqgHdhN6nq2QCyVuB07imoqIiB8N7wUMwtWvmzJmf7Nq1a1qwteCLgXkzZswo271798TAa0ePHs2BiSX4gCqY+CYOpYTvu6hNbOzFcH1ZsmTJdFz/CyQBjuFF7YDXJmZnFHZix8Vk+wJP6H9r8uTJExTDh7oX3KhEaxWQ7vnly5dP7RWJFBcXb3TSMThpr5A/uTmCkPyai5F5ohu4kqcYnr/LnTy7du3ax3slE3ASmU5EH3Uvl+qyenUYULrWt3Z70RyiV3RXV1dX+szXQSfPo85ZvZwIbj3DSQPcXynQqoPsyxuk0H9mNxaN9SE6off+8vLyN3rANzb/iMPxD+vFQBxFooOHJbp1PQU8mkGY+BA29LX+UG4WCpZBZwn0/qrH+Yl+6K5z0g78SurFQJIEHidE0GFbYBBOjfMtGNj/9mcGApw/h85bTcLSNieT788v1+oDCXvqmc1iDHN7f2Se6BJ9otP1AksM6hm7D0j0Ud9ki6zv+xjoO1Sy0Z8O0SO6oG+PxS0pTjYc+fMr3peO73QSBnFkWon8gQMHngcvPR0MvfflITqg53eiywpMczhyovCroxcDYYpTsc6zYpDi5srKynUY69L+wECl6UWPVYZI40CrRjiMpet6MZDA+YRDHDQaMba0uoQ8HaSEbqKepTqWzKP/Y6IDejqDwJoEoEyBQ6mu/ZKBsmm45d8zU6/QYb2dXUtkKwqxKzlG8FWzg2SxYyqFqFopdFSEsI/5jGdkqLZUk0P+sA6k8VeyOF+aA49gCcXepaRzVpMYzeYmbXpZAVPnEThnmG1BIEk5kFT5FMXcweAOkxNTdI3XTQpVHYEETqMwPcFqSxfOp5Y4eDtjKYFxO5iQ4/zWOxsjQypEXn3+eIkE6ktkZoYTbC/C7W/goaGBuI9n5uNItlp5LxHOtaQY5/2SguE70ci5kLzmBdeI88WodYx/G8C7tify8nM81jhQBhem1ezfv/+PMHKnmSfGDi7TaluIiCUxxgxMDCaB0J+EMCwyzLegbSsrK3sJ4N2LeY422ijMQXS3mC2Ys3Aznhm6KtjsMgBvjBnoDSaBmKz5mKlRZhuBEJAtdrBhyEgED/Yvrb4ZF274k/243aoaIU4LD/1YArUUize93Wy1Ea3T/pttrmz1YiG6kgWY7Rbh2zKytWMtJHBAP5FA07UHnODXUM9rLFT7DSTzuCsM9AHQ58xKa/FeiXT2oJkUQrinPzCQifSYSR8e9hcsTXhM6hXlUJ+zsyZsO5mApG0hjf+Z2TVmsRjoM8dEAj3Yz4RYMpD+TRnI0oX2yS03e4Zxfsh4t7u6WxN70MmsPRJYImGcX2CKg9DHkMTEfiiBqpvxBFRTpCJhG8z2GAr3wfCHwcBnXd/uyoz9CWy03+xaVVXVNLK8v/aPjyEkAcZ6YiyBCaLD8CtTwfY9ypq2aY0149sDDt4Ulf3CkkJm817fqt0FL4SAiXejGsV+EpggCQhn4LJRlGC0UjXwAZ9t4e4Hpn+P6OjBpdB3G8y7zWwpFkfJz13rnUif4/3CEJFkhY0Ea1Dx51ixO0bebQcz73Uigb79xN1AiFIkWXt//654GqNOmD56GZO0GkQwG+8YZ3ct2qfCXl858XU8+6QZbPHdq3fUJEatQpWBeKwqVP1PVKQBqblCZWUA1dOh7tfmQhhUxjrzQwxyurygRf9iwnTdR0Bfps2HNnZ8noaWDLLRc4LtMO05abcUtBEXlQpVBnmD3c3SSNIJOlnvA+BmBd1apD4CM5QFmsd9Xoc75b08N1/Pqx2rYgCkuY2NivfzedIO3WoHIVnsOgMlfajmRw4Xrs8VOxp+WxNwNI3sNHqFoszVwIW0SOtr9LzaUXtqV+37lyHTvzY2Ot1o806oOulwtnrd4HSrvl7VxHPa/dh9+eWXf8zmmJtQp5xovSDC53hy6Odm+lMN4Ln+RYcTuu1IoaNtDkhfMrjpAbOUT4istUFx0jnnAlZMIzHhxcNVR6v4Uu3iIGr14jKcRZr6Vf92IwrjqzVfwZ+fI4Vet7wwzim+wwgPh4l5OvNRrefBWeuQjMcJATeRzWl049V78t6oagZ27gaSv3eCAIoinSTalLTEueaF8agFDP6oG0U9vm38hygPfgQH8HUcQqLd/SX+6oqj0j7muXqZBO1VhbOb1DDfl1yB9851dZsD8W4FkrNKdXJIzsBIZlemgOWDfPDZPYDXe4AjBzD+eyBmN5LzKav+lZz1fO9Ags8qq8OZjASnw7g8PrWUcAUqOhNVLVBI5tZLJBEUacX1aEiV60AaBP8OErOGDv5GB143ymz10kfOMXwdg7Ffo8IfGNSFd21BKmU2ZMA82LEkbNMggWjtVXFq1+wcePM2+l/F5H4QtRfv+HY+Lg2281F5VL0nBmhRohmNZSE5/dcRDpbAnPZghfBoVhNwZ6ERxmtP4p0ymxl6Hc+8DMhQH8hcCG7Gtj2Jqs3gvpVI1Sy+/wEC+2zfg+gQw5jAZ5DkK1lUX4lkzdTLKSRlJgmEGuzyYu7bZvTlq5/oeBqz9h9tgYCZzQDZp/htTCA4loPAfk7h+tMY6Dqne4PtnnIi9FNDP0/QT1Fg5YS+Y2sncP1ZvftGu5owSZ/oFVZGX7/6yfiq0jObmb4XIsaGqoURY2F0Nip1K+cWBtMU6Xu0tP1M0Qftbeb8PhqQFSq6EZ1imujWy9PCGbdrDDQiqxLNo8D7Rql9OMyDCfU8vwqpz+3r6tiYM9BfGrBNr4XDQJ570c47GaLNwJi+wVJwhPNls6UCI0SdCuHlpv6wRyXm71DV+ithWKPDdFYN4eEOw7j0ElrFybUsSDliBjBqGwC86RIDjfPbDLAlr9qNh+UwyOy8avXC7pgw0Gwrf18ebNjZijc+EgoK6TrQqZxyvO2xpNe/5O8cxRs3bjT6cme5yVEHJpzBZzbAPAvpSiW3l+j/nxGA75qZ6OMQf4xYvCnGr67/KvK59N9hRHb8T4ABAPaAkPNeKkdCAAAAAElFTkSuQmCC", At = ":host{display:block;height:100%;color-scheme:dark;font:13px/1.4 Segoe UI,sans-serif;color:#dbe5f0;container-type:size}*{box-sizing:border-box}[hidden]{display:none!important}main{height:100%;min-height:260px;background:#171d25;display:flex;flex-direction:column;overflow:hidden;-webkit-user-select:none;user-select:none}button,input,select,textarea{font:inherit;color:inherit;border:1px solid #425165;border-radius:6px;background:#253140;padding:7px 9px;min-width:0}button{cursor:pointer;white-space:nowrap}button:hover{background:#354459}button:disabled{opacity:.45;cursor:default}.primary{background:#b99a38;border-color:#d0ae46;color:#111820;font-weight:600}.primary:hover{background:#e0bd51}button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid #f2c94c;outline-offset:1px}input,select,textarea{background:#111a24}input,textarea,td,dd{-webkit-user-select:text;user-select:text}input[type=checkbox]{accent-color:#e6c354;width:16px;height:16px}header{display:flex;gap:7px;align-items:center;padding:8px 12px;border-bottom:1px solid #354459;flex-shrink:0;overflow-x:auto}.brand{display:flex;gap:7px;align-items:center;margin-right:8px}.brand img{width:32px;height:32px;object-fit:contain}.brand b{font-size:17px}.brand small{font-size:10px;color:#a6b5c7}#dirty{margin-left:auto;font-size:11px;color:#cabb81;white-space:nowrap}.notice{background:#1c2735;padding:5px 12px;font-size:12px;min-height:27px;max-height:70px;overflow:auto;color:#a7bbd1}.notice.error{color:#ffaaa1;background:#412725}.workspace{display:grid;grid-template-columns:230px minmax(0,1fr);flex:1;min-height:0}aside{padding:10px;display:flex;flex-direction:column;gap:9px;border-right:1px solid #354459;min-height:0}#checks{overflow:auto;flex:1;min-height:0}.check-item{display:flex;flex-direction:column;gap:5px;width:100%;margin-bottom:5px;text-align:left;white-space:normal}.check-item small{color:#a8b7ca}.check-item.active,.tabs .active{border-color:#c7ab56;background:#403b2c;color:#ffe399}.main{display:flex;flex-direction:column;min-width:0;min-height:0}.test-toolbar{display:flex;gap:7px;padding:8px 12px;align-items:center}.test-toolbar input{flex:1;font-weight:600}.tabs{display:flex;gap:7px;border-bottom:1px solid #354459;padding:0 12px 8px}.tabs button{min-width:105px}#content{flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column}.empty{padding:28px;color:#a4b4c9;text-align:center;margin:auto}h2,h3,p{margin:0 0 10px}h2{font-size:20px}h3{font-size:15px}label{display:flex;flex-direction:column;gap:5px;font-size:12px;color:#b8c6d7}.check{flex-direction:row;align-items:center;gap:6px}small{font-size:11px;color:#a8b7c9}.parameters{display:flex;gap:18px;align-items:end;padding:10px 12px}.parameters input{width:140px}.selection-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0 12px 12px}.selection{border:1px solid #39495e;border-radius:8px;padding:12px;background:#1b2633;min-width:0}.selection h3{display:flex;justify-content:space-between}.selection h3 span{color:#92c4b2;font-size:12px}.selection select[multiple]{width:100%;min-height:70px}.selection-tools{display:flex;gap:5px;flex-wrap:wrap;margin:8px 0}.selection-tools button{font-size:11px;padding:5px 7px}.selection>label{margin-bottom:8px}.condition{display:grid;grid-template-columns:minmax(80px,1fr) 100px minmax(70px,1fr) 29px;gap:5px;margin:6px 0}.condition button{padding:3px}.rules,.report{padding:18px;max-width:850px}.rules>label{margin:14px 0}.rules>p,.report>p{color:#a9b8cb}.report>button{margin:12px 8px 14px 0}.result-tools{display:flex;gap:7px;flex-wrap:wrap;padding:8px 12px}.result-tools input{flex:1;min-width:180px}.result-area{display:grid;grid-template-columns:minmax(0,1fr) 300px;flex:1;min-height:0}.table-area{display:flex;flex-direction:column;min-width:0;min-height:0}.scroll{overflow:auto;flex:1;min-height:0}table{border-collapse:separate;border-spacing:0;width:max-content;min-width:100%}th{position:sticky;top:0;background:#2a3748;z-index:1;text-align:left;max-width:240px;white-space:normal}th,td{padding:8px;border-bottom:1px solid #344154;vertical-align:top}td{max-width:320px;min-width:90px;overflow-wrap:anywhere;-webkit-user-select:text;user-select:text}td:first-child{min-width:36px}tr.active td{background:#453e29;color:#fff0b5}tr:hover td{background:#2c3847}.pager{display:flex;gap:10px;align-items:center;justify-content:center;padding:5px;border-top:1px solid #39495e;font-size:11px}.pager button{padding:2px 8px}.detail{border-left:1px solid #354459;padding:10px;overflow:auto}.detail h3{overflow-wrap:anywhere}.detail>label{margin:10px 0}.detail p{font:11px/1.5 Consolas,monospace}.detail details{border-top:1px solid #354459;padding:8px 0}summary{cursor:pointer}dl{font-size:11px;display:grid;grid-template-columns:1fr 1fr;gap:7px}dt,dd{overflow-wrap:anywhere;margin:0}dt{color:#9baec4}footer{border-top:1px solid #354459;padding:4px 12px;display:flex;justify-content:space-between;color:#91a4bb;font-size:11px}dialog{border:1px solid #53647c;border-radius:12px;background:#202c3a;color:#dbe5f0;width:min(700px,92vw);max-height:85vh;padding:20px;box-shadow:0 15px 60px #000a}dialog::backdrop{background:#000a}dialog p{margin:12px 0}dialog a{color:#f2c94c;margin-right:12px}.dialog-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:16px}@container (max-width:950px){.workspace{grid-template-columns:185px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 240px}.selection-grid{grid-template-columns:1fr}.parameters,.test-toolbar{flex-wrap:wrap}.test-toolbar input{flex-basis:100%}}@container (max-height:400px){header{padding:5px 10px}.test-toolbar{padding:5px 10px}.tabs{padding-bottom:5px}.brand img{width:25px;height:25px}footer{display:none}}:host{font-size:12px}.brand img{background:#e1e7ef;border-radius:5px;padding:3px}.selection-tools button{font-size:12px}label{font-size:13px}.choose-layout{display:grid;grid-template-columns:220px minmax(0,1fr);min-height:0;flex:1;overflow:auto}.choose-layout .parameters{display:flex;flex-direction:column;align-items:stretch;gap:15px;border-right:1px solid #354459;justify-content:flex-start}.choose-layout .parameters input{width:100%}.choose-layout .parameters input[type=checkbox]{width:16px}.choose-layout .selection-grid{padding:10px 12px;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start;min-width:0}.selection select[multiple]{height:180px;resize:vertical}.selection-mode{font-size:12px;color:#b6c4d5}.preset-row{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:9px}.preset-row select{flex:1 1 160px}.preset-row button{padding:5px 7px;font-size:12px}.model-list{height:150px;overflow:auto;border:1px solid #425165;border-radius:6px;background:#111a24;padding:5px;margin-bottom:5px}.model-list label{display:flex;flex-direction:row;align-items:center;gap:7px;padding:4px 5px;color:#dbe5f0;overflow-wrap:anywhere}.model-list label:hover{background:#253140}.model-list .model-all{position:sticky;top:-5px;z-index:1;background:#1f2b39;border-bottom:1px solid #425165;font-weight:600}.legend{display:flex;gap:12px;flex-wrap:wrap;font-family:inherit!important}.part-a{color:#ff6161}.part-b{color:#65baff}.preview{display:block;width:100%;padding:5px;margin:8px 0}.preview img{display:block;width:100%;max-height:180px;object-fit:contain}.image-dialog{width:94vw;max-width:1500px}.image-dialog img{display:block;max-width:100%;max-height:75vh;margin:10px auto}#help-dialog{width:min(1000px,94vw);line-height:1.6}#help-dialog details{padding:12px 0;border-bottom:1px solid #425165}#help-dialog summary{font-size:16px;font-weight:600;color:#f0d27a}#help-dialog li{margin:8px 0}@container (max-width:1100px){.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .selection-grid{grid-template-columns:1fr}.condition{grid-template-columns:minmax(60px,1fr) 100px minmax(60px,1fr) 29px}}@container (max-width:700px){.choose-layout{display:block}.choose-layout .parameters{border-right:0;border-bottom:1px solid #354459}.workspace{grid-template-columns:160px minmax(0,1fr)}}button,input,select,textarea{padding:5px 7px;border-radius:5px}button{min-height:27px}input[type=checkbox]{width:14px;height:14px}.commandbar{position:relative;display:flex;gap:8px;min-height:45px;padding:5px 8px;overflow:visible;background:#131b25}.brand{flex:0 0 auto;margin-right:0;gap:5px}.brand img{width:28px;height:28px}.brand b{font-size:14px}.check-heading{display:grid;grid-template-rows:25px 12px;flex:0 1 230px;min-width:145px}.check-heading input{height:25px;border:0;background:transparent;padding:2px 5px;font-weight:600}.check-heading small{padding:0 5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:9px}.tabs{align-self:stretch;align-items:center;flex:0 0 auto;gap:3px;padding:0;border:0}.tabs button{flex:0 0 auto;min-width:0;padding:5px 9px;background:transparent;border-color:transparent}.tabs .active{background:#3e3828;border-color:#b99a38}.header-actions{display:flex;align-items:center;gap:4px;margin-left:auto}#dirty{margin-left:0;width:0;height:0;overflow:visible;font-size:0}#dirty:not(:empty){width:7px;height:7px;border-radius:50%;background:#e5bd43;box-shadow:0 0 0 2px #e5bd4328}.more-menu{position:relative;z-index:20}.more-menu summary{display:grid;place-items:center;width:29px;height:29px;border:1px solid #425165;border-radius:5px;background:#253140;cursor:pointer;list-style:none;font-size:18px}.more-menu summary::-webkit-details-marker{display:none}.more-popover{position:absolute;right:0;top:calc(100% + 5px);display:grid;width:190px;gap:3px;padding:6px;border:1px solid #506176;border-radius:7px;background:#192431;box-shadow:0 12px 35px #000a}.more-popover button{text-align:left}.notice{min-height:23px;max-height:45px;padding:3px 9px;font-size:10px}.run-progress{display:grid;grid-template-columns:minmax(150px,auto) minmax(120px,1fr) auto;align-items:center;gap:8px;min-height:24px;padding:3px 9px;border-bottom:1px solid #425165;background:#202a20;color:#d9e7d2;font-size:10px}.run-bar{width:100%;height:7px;overflow:hidden;border-radius:2px;background:#101810}.run-bar i{display:block;width:0;height:100%;background:#e3bc43}#run-phase,#run-value{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#run-value{text-align:right;color:#b9c9b3}.workspace{grid-template-columns:190px minmax(0,1fr)}aside{gap:6px;padding:7px;background:#141c26}.aside-title{font-weight:600;font-size:12px}.aside-actions{display:grid;gap:5px}.check-item{gap:2px;margin-bottom:3px;padding:6px 7px}.check-item small{font-size:9px}.main{background:#171d25}#content{overflow:hidden}.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .parameters{gap:9px;padding:8px}.choose-layout .selection-grid{gap:8px;padding:8px}.selection{padding:8px}.selection h3,h3{font-size:13px;margin-bottom:6px}label{gap:3px;font-size:11px}small,.selection-tools button,.preset-row button{font-size:10px}.model-list{height:125px}.model-list label{padding:2px 4px}.selection-tools{gap:4px;margin:5px 0}.selection-tools button,.preset-row button{padding:3px 5px;min-height:23px}.result-tools{display:flex;align-items:center;justify-content:space-between;gap:6px;flex-wrap:nowrap;min-height:38px;padding:5px 7px;border-bottom:1px solid #354459;background:#151f2a}.result-filters,.bulk-tools{display:flex;align-items:center;gap:5px;min-width:0}.result-filters{flex:1}.result-filters input[type=search]{flex:1 1 190px;min-width:120px}#result-depth{flex:0 1 125px;min-width:92px}#result-count,#selection-count{color:#9fb0c4;white-space:nowrap;font-size:10px}.bulk-tools select{max-width:125px}.result-area{grid-template-columns:minmax(0,1fr) 310px}th,td{padding:5px 6px;font-size:11px;line-height:1.25}th{max-width:190px}td{max-width:260px;min-width:76px}.pager{justify-content:flex-end;min-height:29px;padding:3px 7px}.pager #selection-count{margin-right:auto}.detail{display:flex;flex-direction:column;min-width:0;padding:0;overflow:hidden;background:#141e29}.detail-head{display:flex;align-items:center;justify-content:space-between;gap:6px;min-height:47px;padding:7px 8px 4px}.detail-head>div:first-child{min-width:0}.detail-head small{color:#8093aa;letter-spacing:.08em}.detail-head h3{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin:0}.detail-nav{display:flex;gap:3px}.detail-nav button{min-width:27px;padding:2px 7px;font-size:17px}.clash-summary{display:flex;gap:5px;padding:0 8px 5px;color:#adbdcf;font-size:9px}.clash-summary span{padding-right:5px;border-right:1px solid #405064}.clash-summary span:last-child{border:0}.detail .legend{margin:0;padding:0 8px 5px;font-size:10px}.preview-slot{height:clamp(92px,18cqh,145px);flex:0 0 auto;margin:0 7px 6px;overflow:hidden;border:1px solid #37475b;border-radius:6px;background:#0e151d}.preview{position:relative;width:100%;height:100%;margin:0;padding:0;border:0;background:transparent}.preview img{width:100%;height:100%;max-height:none;object-fit:contain}.preview span{position:absolute;right:5px;bottom:5px;padding:3px 6px;border-radius:4px;background:#101923db;font-size:9px}.preview-empty,.detail-empty{height:100%;display:grid;place-content:center;justify-items:center;gap:4px;color:#788ba1}.preview-empty>span,.detail-empty>span{font-size:24px}.detail-actions{display:grid;grid-template-columns:1fr 1fr;gap:5px;padding:0 7px 7px}.detail-scroll{flex:1;min-height:0;overflow:auto;padding:7px 8px 12px;border-top:1px solid #354459}.detail-scroll>label{margin:7px 0}.detail p{font:inherit}.coordinates{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;font:9px/1.3 Consolas,monospace;color:#91a3b7}.coordinates span{overflow:hidden;text-overflow:ellipsis}.detail details{padding:6px 0}.detail dl{font-size:10px}.detail-empty{padding:20px;text-align:center}footer{padding:2px 8px;font-size:9px}@container (max-width:1050px){.workspace{grid-template-columns:165px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 270px}.check-heading{flex-basis:185px}.tabs button{padding-inline:6px}#dirty{display:none}}@container (max-width:820px){.brand b,.brand small,#result-count{display:none}.check-heading{flex-basis:155px}.result-tools{overflow-x:auto}.result-area{grid-template-columns:minmax(0,1fr) 245px}}@container (max-height:410px){.notice,footer{display:none}.preview-slot{height:90px}}", Ie = /* @__PURE__ */ new WeakMap(), ot = "nashepo.collisionfinder360.project.", Pe = () => ({
  format: "nashepo.checks",
  version: 1,
  checks: [],
  sets: []
}), Ve = (t) => {
  if (!(!t || typeof sessionStorage > "u"))
    try {
      const e = sessionStorage.getItem(ot + t);
      return e ? tt(e) : void 0;
    } catch {
      return;
    }
}, We = (t, e) => {
  if (!(!t || typeof sessionStorage > "u"))
    try {
      sessionStorage.setItem(
        ot + t,
        JSON.stringify(e, (i, a) => i === "image" ? void 0 : a)
      );
    } catch {
    }
};
function Ct(t, e) {
  const i = t.shadowRoot || t.attachShadow({ mode: "open" }), a = dt(t);
  let r = e.projectToken(), n = e.projectId(), o = r && (Ie.get(r) || Ve(n)) || Pe();
  r && Ie.set(r, o);
  let d, u = o.checks[0]?.id || "", f = "select", m = "", g = 0, w = !1, j = !1, A, O = !0, E = !1;
  const k = /* @__PURE__ */ new Set();
  let P, z, $ = 0;
  const S = () => o.checks.find((s) => s.id === u), h = (s) => i.querySelector("#" + s);
  i.innerHTML = `<style>${At}</style><main><header class="commandbar"><div class="brand"><img src="${Et}" alt=""><b>НашеПО</b><small>${ct}</small></div><div class="check-heading"><input id="name" aria-label="Имя проверки" placeholder="Выберите проверку"><small id="check-summary">Проверка не выбрана</small></div><div id="tabs" class="tabs">${[
    ["select", "Выбор"],
    ["results", "Результаты"],
    ["rules", "Правила"],
    ["report", "Отчёт"]
  ].map(([s, l]) => `<button data-tab="${s}">${l}</button>`).join(
    ""
  )}</div><div class="header-actions"><button id="scan" title="Перечитать список и геометрию выбранных моделей">↻ Модели</button><button id="run" class="primary">▶ Запустить</button><button id="cancel" hidden>Остановить</button><details class="more-menu"><summary title="Другие команды">⋮</summary><div class="more-popover"><button id="open">Открыть проверки</button><button id="save">Сохранить проверки</button><button id="copy">Копировать проверку</button><button id="delete">Удалить проверку</button><button id="settings">Настройки</button><button id="help">Справка</button></div></details></div><span id="dirty"></span></header><div id="run-progress" class="run-progress" hidden><span id="run-phase">Подготовка</span><div id="run-bar" class="run-bar" role="progressbar"><i id="run-fill"></i></div><span id="run-value"></span></div><div class="notice" id="notice" role="status">Откройте IFC/SMDX в проекте и нажмите «Модели».</div><div class="workspace"><aside><div class="aside-title">Проверки</div><input id="test-search" type="search" placeholder="Поиск проверок"><div id="checks"></div><div class="aside-actions"><button id="all">Запустить все</button><button id="new" class="primary">＋ Новая проверка</button></div></aside><section class="main"><div id="content"></div></section></div><footer><span id="model-count">Модели не прочитаны</span><span>Расчёт выполняется на вашем компьютере</span></footer><input id="file" type="file" accept=".json" hidden><dialog id="settings-dialog"><h2>Настройки</h2><label>Дистанция камеры, м<input id="distance" type="number" value="15" min="0.5"></label><p class="links"><a href="https://nashepo.ru/" target="_blank" rel="noopener noreferrer">Сайт НашеПО</a><a href="https://t.me/RoburFan" target="_blank" rel="noopener noreferrer">Telegram</a></p><button data-close="settings-dialog">Закрыть</button></dialog><dialog id="help-dialog">${lt}<button data-close="help-dialog">Закрыть</button></dialog><dialog id="set-dialog"><h2>Сохранить набор моделей</h2><label>Название<input id="set-name" maxlength="120"></label><div class="dialog-actions"><button id="set-cancel">Отмена</button><button id="set-confirm" class="primary">Сохранить</button></div></dialog></main>`;
  const J = document.createElement("button");
  J.id = "clear-project", J.textContent = "Очистить проект", h("save").after(J), i.querySelector(".more-popover").addEventListener(
    "click",
    () => i.querySelector(".more-menu").removeAttribute("open")
  );
  const U = (s, l = !1) => {
    h("notice").textContent = s, h("notice").classList.toggle("error", l);
  }, B = (s, l, c, p) => {
    const x = h("run-progress"), v = h("run-bar"), b = h("run-fill");
    if (x.hidden = !1, h("notice").hidden = !0, h("run-phase").textContent = s, c && c > 0 && l !== void 0) {
      const y = Math.max(0, Math.min(100, l / c * 100));
      b.style.width = `${y}%`, v.setAttribute("aria-valuemin", "0"), v.setAttribute("aria-valuemax", "100"), v.setAttribute("aria-valuenow", String(Math.round(y))), h("run-value").textContent = `${Math.round(y)}% · ${l}/${c}` + (p === void 0 ? "" : ` · найдено ${p}`);
    } else
      b.style.width = "0", v.removeAttribute("aria-valuenow"), h("run-value").textContent = p === void 0 ? "" : `Найдено ${p}`;
    v.setAttribute("aria-valuetext", h("run-value").textContent || s);
  }, M = () => {
    h("run-progress").hidden = !0, h("notice").hidden = !1;
  }, C = async (s) => {
    try {
      await s();
    } catch (l) {
      U(l instanceof Error ? l.message : String(l), !0);
    }
  }, W = () => new Promise((s) => {
    const l = h("set-dialog"), c = h("set-name");
    let p = !1;
    const x = (v) => {
      p || (p = !0, l.close(), s(v));
    };
    c.value = "Новый набор", h("set-confirm").onclick = () => {
      const v = c.value.trim();
      v ? x(v) : c.focus();
    }, h("set-cancel").onclick = () => x(), l.oncancel = (v) => {
      v.preventDefault(), x();
    }, l.showModal(), c.focus(), c.select();
  }), R = () => {
    E = !0, h("dirty").textContent = "Есть несохранённые изменения", r && Ie.set(r, o), We(n, o);
  }, he = () => {
    const s = e.projectToken();
    return !s || s === r ? !1 : (!r && (o.checks.length || o.sets.length) ? Ie.set(s, o) : o = Ie.get(s) || Ve(e.projectId()) || Pe(), Ie.set(s, o), r = s, n = e.projectId(), d = void 0, u = o.checks[0]?.id || "", m = "", k.clear(), g = 0, E = !1, e.clear(), h("dirty").textContent = "", !0);
  }, q = () => {
    const s = S();
    s?.lastRun && (s.status = "stale"), R(), Z();
  }, ie = () => [
    ...new Set(
      (d?.elements || []).flatMap((s) => Object.keys(s.properties))
    )
  ].sort(), L = (s, l) => s.map(
    (c) => `<option value="${te(c)}" ${c === l ? "selected" : ""}>${te(c)}</option>`
  ).join("");
  function D() {
    const s = S(), l = h("result-search")?.value.toLowerCase() || "", c = h("result-state")?.value || "", p = Number(h("result-depth")?.value || 0);
    return (s?.results || []).filter(
      (x) => (!c || x.state === c) && (s?.type === "duplicates" || x.unmeasured || // Same allowance as the calculation itself, so one number typed in
      // three places always selects the same conflicts.
      (x.penetrationMm ?? 0) + (s?.precision ?? 0) >= p) && (!l || JSON.stringify({ ...x, image: void 0 }).toLowerCase().includes(l))
    );
  }
  function Z() {
    const s = h("test-search").value.toLowerCase();
    h("checks").innerHTML = o.checks.filter((l) => l.name.toLowerCase().includes(s)).map(
      (l) => `<button class="check-item ${l.id === u ? "active" : ""}" data-check="${l.id}"><strong>${te(l.name)}</strong><small>${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[l.status]} · ${l.results.filter((c) => !["resolved", "excluded"].includes(c.state)).length} в работе / ${l.results.length}</small></button>`
    ).join("");
  }
  function oe(s, l) {
    const c = d?.elements.filter(
      (I) => (S().includeHidden || !I.hidden) && Ce(I, s)
    ).length || 0, p = s.manualOnly ? se(s) : s.modelsMode === "selected" ? s.models : (d?.models || []).map((I) => I.id), x = d && p.every((I) => d.indexedModelIds.includes(I)) ? `${c} элементов` : "число после запуска", v = d?.models || [], b = s.modelsMode !== "selected", y = o.sets.map(
      (I) => `<option value="${te(I.id)}" ${s.presetId === I.id ? "selected" : ""}>${te(I.name)}</option>`
    ).join("");
    return `<article class="selection" data-side="${l}"><h3>Выбор ${l.toUpperCase()} <span data-selection-count>${x}</span></h3>${s.manualOnly ? '<p class="selection-mode">Только элементы, выбранные вручную</p>' : ""}<div class="preset-row"><select class="preset"><option value="">Набор моделей…</option>${y}</select><button data-selection="load-set">Применить</button><button data-selection="save-set">Сохранить набор</button><button data-selection="delete-set" ${s.presetId ? "" : "disabled"}>Удалить</button></div><div class="model-list"><label class="model-all"><input type="checkbox" class="all-models" ${b ? "checked" : ""}> Все модели</label>${v.map((I) => `<label><input type="checkbox" class="model-check" value="${te(I.id)}" ${b || s.models.includes(I.id) ? "checked" : ""}> ${te(I.name)}</label>`).join("") || "<small>Нажмите «Модели».</small>"}</div><small>Отметьте файлы, которые должны участвовать в выборе ${l.toUpperCase()}.</small><div class="selection-tools"><button data-selection="show">Показать выбранные элементы</button><button data-selection="only">Только выделенные в 3D</button><button data-selection="include">＋ Добавить из 3D</button><button data-selection="exclude">− Исключить из 3D</button><button data-selection="reset">Сбросить ручной выбор</button></div><small>Добавлено вручную: ${s.include.length} · исключено: ${s.exclude.length}</small></article>`;
  }
  function T() {
    Z();
    const s = S();
    h("name").value = s?.name || "", h("check-summary").textContent = s ? `${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[s.status]} · ${s.results.filter((l) => !["resolved", "excluded"].includes(l.state)).length} в работе / ${s.results.length}` : "Проверка не выбрана";
    for (const l of ["name", "copy", "delete", "run"])
      h(l).disabled = !s || w;
    for (const l of i.querySelectorAll("[data-tab]"))
      l.classList.toggle("active", l.dataset.tab === f);
    if (!s) {
      h("content").innerHTML = '<div class="empty"><h2>Создайте первую проверку</h2><p>Обновите модели, затем выберите, какие элементы проверять друг с другом.</p></div>';
      return;
    }
    f === "select" && (h("content").innerHTML = `<div class="choose-layout"><div class="parameters"><h3>Параметры проверки</h3><label>Тип<select id="type"><option value="intersection" ${s.type === "intersection" ? "selected" : ""}>По пересечению</option><option value="duplicates" ${s.type === "duplicates" ? "selected" : ""}>Дублирование</option></select></label><label title="Числовая погрешность расчёта">Точность расчёта, мм<input id="precision" type="number" value="${s.precision}" min="0.001" max="100" step="0.1"></label><label title="Конфликты с меньшей оценкой глубины не попадут в результат">Минимальная глубина, мм<input id="min-penetration" type="number" value="${s.minPenetration}" min="0" max="100000" step="1" ${s.type === "duplicates" ? "disabled" : ""}></label><label class="check"><input id="touching" type="checkbox" ${s.touching ? "checked" : ""} ${s.type === "duplicates" ? "disabled" : ""}>Учитывать касания</label><small>Глубина Hard Clash — наименьшая толщина области перекрытия. Она не зависит от густоты сетки и от размеров элементов.</small><p class="legend"><span class="part-a">● Выбор А</span><span class="part-b">● Выбор Б</span></p></div><div class="selection-grid">${oe(s.a, "a")}${oe(s.b, "b")}</div></div><datalist id="property-fields">${L(ie(), "")}</datalist>`), f === "rules" && (h("content").innerHTML = `<div class="rules"><h3>Исключение пар</h3><p>Элемент сам с собой не проверяется. Пара А/Б учитывается один раз.</p><label class="check"><input id="same-model" type="checkbox" ${s.ignoreSameModel ? "checked" : ""}>Не проверять элементы одной модели</label><label class="check"><input id="same-group" type="checkbox" ${s.ignoreSameGroup ? "checked" : ""}>Не проверять геометрию одного составного объекта</label><label>Не проверять пары с одинаковым значением свойства<input id="equal-property" list="property-fields" value="${te(s.equalProperty)}" placeholder="Без ограничения"></label><label class="check"><input id="hidden" type="checkbox" ${s.includeHidden ? "checked" : ""}>Включать скрытые элементы прочитанных моделей</label><p>Незагруженные подключённые файлы нужно открыть перед расчётом.</p><datalist id="property-fields">${L(ie(), "")}</datalist></div>`), f === "results" && (h("content").innerHTML = `<div class="result-tools"><div class="result-filters"><input id="result-search" type="search" placeholder="Поиск по результатам"><select id="result-state"><option value="">Все состояния</option>${Object.entries(
      we
    ).map(([l, c]) => `<option value="${l}">${c}</option>`).join("")}</select>${s.type === "intersection" ? '<input id="result-depth" type="number" min="0" step="1" placeholder="Глубина от, мм">' : ""}<button id="show-markers" role="switch" aria-checked="${O}">${O ? "● Знаки" : "○ Знаки"}</button><span id="result-count"></span></div><div class="bulk-tools"><select id="bulk-state" title="Состояние для выбранных строк">${Object.entries(
      we
    ).map(([l, c]) => `<option value="${l}">${c}</option>`).join("")}</select><button id="bulk">Применить</button></div></div><div class="result-area"><div class="table-area"><div class="scroll" id="table"></div><div class="pager"><span id="selection-count"></span><button id="prev-page">←</button><span id="page"></span><button id="next-page">→</button></div></div><div class="detail" id="detail"></div></div>`, X(), _()), f === "report" && (h("content").innerHTML = `<div class="report"><h3>${te(s.name)}</h3><p>Результатов: ${s.results.length}. Выбрано: ${k.size}. ${s.status === "stale" ? "Результаты устарели — рекомендуется повторный запуск." : ""}</p><label class="check"><input id="selected-only" type="checkbox" ${k.size ? "checked" : ""}>Только выбранные строки</label><label class="check"><input id="report-images" type="checkbox" checked>Добавить снимки (недостающие будут созданы автоматически)</label><button id="export-html" class="primary">Сформировать HTML-отчёт</button><button id="export-viewer">Сессия для плагина «Коллизии»</button><p>Правила и все результаты сохраняются кнопкой «Сохранить проверки» в верхней панели.</p></div>`), h("content").inert = w;
  }
  const xe = (s, l) => l === "duplicates" ? "—" : s.unmeasured ? "не определена" : (s.penetrationMm ?? 0).toFixed(1);
  function X() {
    const s = S(), l = D(), c = Math.max(1, Math.ceil(l.length / 50));
    g = Math.max(0, Math.min(g, c - 1));
    const p = l.slice(g * 50, g * 50 + 50);
    h("table").innerHTML = l.length ? `<table><thead><tr><th><input id="check-page" type="checkbox" aria-label="Выбрать страницу" ${p.every((x) => k.has(x.id)) ? "checked" : ""}></th>${["№", "Состояние", "Глубина, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "Комментарий"].map((x) => `<th>${x}</th>`).join("")}</tr></thead><tbody>${p.map((x, v) => `<tr data-result="${te(x.id)}" class="${x.id === m ? "active" : ""}"><td><input type="checkbox" class="row-check" aria-label="Выбрать конфликт" ${k.has(x.id) ? "checked" : ""}></td>${[g * 50 + v + 1, we[x.state], xe(x, s.type), x.a.name, x.a.model, x.a.guid || "—", x.b.name, x.b.model, x.b.guid || "—", x.note].map((b) => `<td title="${te(b)}">${te(b)}</td>`).join("")}</tr>`).join("")}</tbody></table>` : '<div class="empty">Нет результатов. Запустите проверку или измените фильтры.</div>', h("page").textContent = `${g + 1} / ${c}`, h("result-count").textContent = `${l.length} результатов`, h("selection-count").textContent = `Выбрано: ${k.size}`, h("prev-page").disabled = g === 0, h("next-page").disabled = g === c - 1;
  }
  function _() {
    const s = S(), l = D(), c = l.findIndex((x) => x.id === m), p = s?.results.find((x) => x.id === m);
    h("detail").innerHTML = p ? `<div class="detail-head"><div><small>КОЛЛИЗИЯ</small><h3>#${c + 1} ${te(p.a.name)} × ${te(p.b.name)}</h3></div><div class="detail-nav"><button id="previous" title="Предыдущая коллизия" ${c <= 0 ? "disabled" : ""}>‹</button><button id="next" title="Следующая коллизия" ${c < 0 || c >= l.length - 1 ? "disabled" : ""}>›</button></div></div><div class="clash-summary"><span>${s?.type === "duplicates" ? "Дублирование" : "Пересечение"}</span><span title="${p.unmeasured ? "У элемента нет собственной толщины, объёмный замер невозможен" : "Наименьшая толщина области перекрытия двух элементов"}">${s?.type === "duplicates" ? "Совпадение геометрии" : p.unmeasured ? "Глубина не определена" : `Глубина ${(p.penetrationMm ?? 0).toFixed(1)} мм`}</span><span>${te(we[p.state])}</span></div><p class="legend"><span class="part-a">● Элемент А</span><span class="part-b">● Элемент Б</span></p><div class="preview-slot">${p.image ? `<button id="open-image" class="preview"><img src="${te(p.image)}" alt="Снимок коллизии"><span>Открыть крупнее</span></button>` : '<div class="preview-empty"><span>◫</span><small>Снимок создастся после перехода в 3D</small></div>'}</div><div class="detail-actions"><button id="focus" class="primary">Перейти в 3D</button><button id="capture-image">▣ Снимок пары</button></div><div class="detail-scroll"><div class="coordinates">${p.point.map((x, v) => `<span>${["X", "Y", "Z"][v]} ${x.toFixed(3)}</span>`).join("")}</div><label>Состояние<select id="edit-state">${Object.entries(
      we
    ).map(
      ([x, v]) => `<option value="${x}" ${p.state === x ? "selected" : ""}>${v}</option>`
    ).join(
      ""
    )}</select></label><label>Назначение<input id="assignee" value="${te(p.assignee)}"></label><label>Комментарий<textarea id="note" rows="2">${te(p.note)}</textarea></label>${[
      p.a,
      p.b
    ].map(
      (x, v) => `<details><summary>Элемент ${v ? "Б" : "А"} · свойства</summary><dl>${Object.entries(
        x.properties
      ).map(([b, y]) => `<dt>${te(b)}</dt><dd>${te(y)}</dd>`).join("")}</dl></details>`
    ).join("")}</div>` : '<div class="detail-empty"><span>◫</span><p>Выберите коллизию в таблице</p><small>Двойной щелчок сразу перенесёт камеру в 3D.</small></div>';
  }
  const se = (s) => {
    const l = new Set(
      !s.manualOnly && s.modelsMode === "selected" ? s.models : []
    );
    for (const c of s.include)
      try {
        l.add(String(JSON.parse(c)[0]));
      } catch {
        const p = d?.elements.find(
          (x) => x.id === c
        )?.modelId;
        p && l.add(p);
      }
    return [...l];
  }, be = () => {
    const s = S();
    if (!(!s || f !== "select"))
      for (const l of i.querySelectorAll("[data-side]")) {
        const c = l.dataset.side, p = [...l.querySelectorAll(".model-check")];
        if (!p.length) continue;
        const x = p.filter((y) => y.checked).map((y) => y.value), v = x.length === p.length, b = s[c];
        b.modelsMode = v ? "all" : "selected", b.models = v ? [] : x, b.conditions = [], b.mode = "all";
      }
  }, me = (s) => {
    if (!s?.length) return;
    const l = /* @__PURE__ */ new Set();
    for (const c of s)
      for (const p of [c.a, c.b]) {
        if (!p.manualOnly && p.modelsMode !== "selected") return;
        for (const x of se(p)) l.add(x);
      }
    return l;
  }, ae = (s) => {
    let l = s.trim().replace(/\\/g, "/").toLocaleLowerCase();
    try {
      l = decodeURIComponent(l);
    } catch {
    }
    l = l.replace(/[?#].*$/, "");
    const c = l.split("/").filter(Boolean).at(-1) || l;
    return /* @__PURE__ */ new Set([l, c]);
  }, Me = (s) => {
    const l = new Set(s.map((y) => y.id)), c = s.map((y) => ({
      id: y.id,
      aliases: /* @__PURE__ */ new Set([
        ...ae(y.id),
        ...ae(y.name)
      ])
    })), p = (y) => {
      if (l.has(y)) return y;
      const I = ae(y), N = c.filter(
        (Q) => [...I].some((ne) => Q.aliases.has(ne))
      );
      return N.length === 1 ? N[0].id : y;
    }, x = (y) => {
      try {
        const I = JSON.parse(y);
        if (!Array.isArray(I) || I.length < 2) return y;
        const N = String(I[0]), Q = p(N);
        return Q === N ? y : JSON.stringify([Q, ...I.slice(1)]);
      } catch {
        return y;
      }
    };
    let v = !1;
    const b = (y) => {
      const I = y.models.map(p), N = y.include.map(x), Q = y.exclude.map(x);
      (I.some((ne, re) => ne !== y.models[re]) || N.some((ne, re) => ne !== y.include[re]) || Q.some((ne, re) => ne !== y.exclude[re])) && (y.models = [...new Set(I)], y.include = [...new Set(N)], y.exclude = [...new Set(Q)], v = !0);
    };
    for (const y of o.checks)
      b(y.a), b(y.b), y.modelsAtRun && (y.modelsAtRun = y.modelsAtRun.map(p));
    for (const y of o.sets) {
      const I = y.selection.models.map(p);
      I.some((N, Q) => N !== y.selection.models[Q]) && (y.selection.models = [...new Set(I)], v = !0);
    }
    return v && R(), v;
  }, fe = () => {
    const s = S();
    if (s)
      for (const l of i.querySelectorAll("[data-side]")) {
        const c = l.dataset.side, p = d?.elements.filter(
          (y) => (s.includeHidden || !y.hidden) && Ce(y, s[c])
        ).length || 0, x = s[c].manualOnly ? se(s[c]) : s[c].modelsMode === "selected" ? s[c].models : (d?.models || []).map((y) => y.id), v = !!d && x.every((y) => d.indexedModelIds.includes(y)), b = l.querySelector(
          "[data-selection-count]"
        );
        b && (b.textContent = v ? `${p} элементов` : "число после запуска");
      }
  };
  function ce() {
    e.markers(
      D(),
      m,
      O,
      (s) => C(() => V(s, !0))
    );
  }
  function V(s, l = !1) {
    if (!w) {
      if (m = s, f === "results") {
        const c = D().findIndex((x) => x.id === s), p = c < 0 ? g : Math.floor(c / 50);
        p !== g && (g = p, X());
        for (const x of i.querySelectorAll("[data-result]"))
          x.classList.toggle("active", x.dataset.result === s);
        _(), requestAnimationFrame(() => {
          [...i.querySelectorAll("[data-result]")].find(
            (v) => v.dataset.result === s
          )?.scrollIntoView({ block: "nearest", inline: "nearest" });
        });
      }
      if (ce(), l) {
        const c = S()?.results.find((p) => p.id === s);
        c && (e.focus(c, Number(h("distance").value)), K(c));
      }
    }
  }
  function K(s) {
    clearTimeout(z);
    const l = ++$, c = Number(h("distance").value);
    s.image && s.imageScope === "pair-ab" && s.imageDistance === c || !e.canLocate(s) || (z = window.setTimeout(async () => {
      if (!(l !== $ || w || m !== s.id))
        try {
          const p = await e.snapshot(
            s,
            c,
            () => l !== $ || w || m !== s.id,
            !1,
            !1
          );
          if (l !== $ || m !== s.id) return;
          s.image = p, s.imageScope = "pair-ab", s.imageDistance = c, R(), f === "results" && _();
        } catch (p) {
          l === $ && m === s.id && U(
            "Не удалось создать снимок выбранной коллизии: " + (p instanceof Error ? p.message : String(p)),
            !0
          );
        }
    }, 500));
  }
  async function ee(s) {
    j = !1, F(!0), B("Создание снимка пары");
    try {
      const l = Number(h("distance").value);
      s.image = await e.snapshot(s, l, () => j), s.imageScope = "pair-ab", s.imageDistance = l, R(), f === "results" && m === s.id && _();
    } catch (l) {
      U(
        "Результаты сохранены. Снимок пары не создан: " + (l instanceof Error ? l.message : String(l)),
        !0
      );
    } finally {
      M(), F(!1);
    }
  }
  async function G(s, l = !1) {
    he(), B("Подготовка моделей");
    let c = l ? /* @__PURE__ */ new Set() : me(s);
    if (!l && c?.size) {
      const p = await e.scan(
        (x) => B(x),
        () => j,
        /* @__PURE__ */ new Set()
      );
      d = p, Me(p.models) && (c = me(s));
    }
    d = await e.scan(
      (p) => {
        U(p), B(p);
      },
      () => j,
      c
    ), h("model-count").textContent = `Проиндексировано моделей: ${d.indexedModelIds.length} из ${d.models.length} · элементов: ${d.elements.length}`, T(), U(
      d.blockers.length ? d.blockers.join(" ") : d.warnings.length ? `Модели прочитаны с замечаниями. ${d.warnings.join(" ")}` : "Модели прочитаны. Настройте выборки и запустите проверку.",
      !!d.blockers.length
    );
  }
  const F = (s) => {
    w = s, s && (clearTimeout(z), $++);
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
      h(l).disabled = s;
    h("cancel").hidden = !s, h("content").inert = s, h("checks").inert = s;
  };
  async function Y(s) {
    const l = (p) => {
      const x = `${s.name} · ${p.phase}`;
      U(`${x} ${p.done}/${p.total} · найдено ${p.found}`), B(x, p.done, p.total, p.found);
    };
    let c;
    try {
      c = new St();
    } catch {
      return Mt(
        d.elements,
        s,
        l,
        () => j,
        (p) => e.geometry(p, () => j)
      );
    }
    return A = c, new Promise((p, x) => {
      const v = () => {
        c.terminate(), A = void 0, P = void 0;
      };
      P = () => {
        v(), x(Error("Расчёт отменён. Предыдущие результаты сохранены."));
      }, c.onmessage = async (b) => {
        if (b.data.load) {
          try {
            const y = await e.geometry(
              b.data.load,
              () => j || A !== c
            );
            if (A !== c) return;
            const I = [
              y.vertices?.buffer,
              y.indices?.buffer
            ].filter(Boolean);
            c.postMessage(
              { request: b.data.request, geometry: y },
              I
            );
          } catch (y) {
            A === c && c.postMessage({
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
        check: structuredClone({ ...s, results: [], warnings: [] })
      });
    });
  }
  async function ue(s = !1) {
    if (w) return;
    he(), be();
    const l = s ? [...o.checks] : [S()].filter(Boolean);
    if (!l.length) throw Error("Создайте проверку.");
    for (const c of l)
      for (const p of [c.a, c.b])
        p.conditions = [], p.mode = "all";
    j = !1, F(!0), B("Подготовка моделей");
    try {
      if (await G(l), F(!0), d.blockers.length)
        throw Error(
          "Состав моделей прочитан не полностью. " + d.blockers.join(" ")
        );
      for (const p of l) {
        if (j) break;
        for (const y of [p.a, p.b]) {
          if (y.modelsMode === "selected" && y.models.some((I) => !d.models.some((N) => N.id === I)))
            throw Error(
              `${p.name}: одна из моделей выборки отсутствует. Исправьте выборку.`
            );
          if (y.include.some((I) => !d.elements.some((N) => N.id === I)))
            throw Error(
              `${p.name}: вручную добавленный элемент отсутствует в модели.`
            );
        }
        const x = ut(p);
        if (p.configAtRun === x && p.modelsAtRun?.some(
          (y) => !d.models.some((I) => I.id === y)
        ))
          throw Error(
            `${p.name}: состав моделей уменьшился. Подключите прежние модели или создайте копию проверки для нового состава. Прежние результаты сохранены.`
          );
        const v = await Y(p);
        if (j || !e.isCurrent())
          throw Error(
            "Проект изменился или расчёт отменён. Предыдущие результаты сохранены."
          );
        const b = (/* @__PURE__ */ new Date()).toISOString();
        p.results = ft(
          p.configAtRun === x ? p.results : [],
          v,
          b
        ), p.lastRun = b, p.fingerprint = d.fingerprint, p.configAtRun = x, p.modelsAtRun = [...d.indexedModelIds], p.status = "done", p.warnings = [...d.warnings], u = p.id, m = p.results[0]?.id || "", k.clear(), R();
      }
      f = "results", T(), ce(), U(
        `Проверка завершена. ${S()?.results.length || 0} результатов. Сохраните проверки для продолжения работы.`
      );
      const c = S()?.results.find((p) => p.id === m);
      c && !j && await ee(c);
    } finally {
      M(), F(!1), T();
    }
  }
  function ge(s) {
    const l = s.closest("[data-side]")?.dataset.side;
    if (!l) return;
    const c = S()[l], p = s, x = s.closest("[data-side]");
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
    c.conditions = [], c.mode = "all", q(), fe();
  }
  h("new").onclick = () => {
    const s = pt();
    s.name = `Проверка ${o.checks.length + 1}`, o.checks.push(s), u = s.id, f = "select", m = "", k.clear(), R(), T();
  }, h("scan").onclick = () => C(async () => {
    be(), j = !1, F(!0), B("Чтение моделей");
    try {
      const s = S();
      await G(s ? [s] : void 0, !s);
    } finally {
      M(), F(!1), T();
    }
  }), h("run").onclick = () => C(() => ue()), h("all").onclick = () => C(() => ue(!0)), h("cancel").onclick = () => {
    j = !0, P?.();
  }, h("test-search").oninput = Z, h("checks").onclick = (s) => {
    const l = s.target.closest(
      "[data-check]"
    );
    l && !w && (e.clear(), u = l.dataset.check, m = "", k.clear(), g = 0, T());
  }, h("tabs").onclick = (s) => {
    const l = s.target.closest("[data-tab]");
    l && !w && (f = l.dataset.tab, T());
  }, h("name").onchange = () => {
    const s = S();
    s && (s.name = h("name").value.trim() || "Проверка", R(), Z());
  }, h("copy").onclick = () => {
    const s = S();
    if (!s) return;
    const l = structuredClone(s);
    Object.assign(l, {
      id: crypto.randomUUID(),
      name: s.name + " — копия",
      results: [],
      lastRun: void 0,
      fingerprint: void 0,
      configAtRun: void 0,
      status: "new"
    }), o.checks.push(l), u = l.id, m = "", k.clear(), R(), T();
  }, h("delete").onclick = () => {
    S() && confirm(`Удалить проверку «${S().name}» и её результаты?`) && (o.checks = o.checks.filter((s) => s.id !== u), u = o.checks[0]?.id || "", k.clear(), e.clear(), R(), T());
  }, h("clear-project").onclick = () => {
    !o.checks.length && !o.sets.length || confirm(
      "Очистить проверки, наборы моделей и результаты текущего проекта?"
    ) && (o.checks = [], o.sets = [], d = void 0, u = "", m = "", k.clear(), e.clear(), R(), h("model-count").textContent = "Модели не прочитаны", T(), U("Данные проверок текущего проекта очищены."));
  }, h("save").onclick = () => {
    Je("НашеПО-проверки.json", JSON.stringify(o, null, 2)), E = !1, h("dirty").textContent = "Файл проверок сохранён";
  }, h("open").onclick = () => h("file").click(), h("file").onchange = () => C(async () => {
    const s = h("file").files?.[0];
    if (!s) return;
    const l = tt(await s.text());
    E && !confirm("Заменить текущие несохранённые проверки данными из файла?") || (o = l, r && Ie.set(r, o), We(n, o), u = o.checks[0]?.id || "", m = "", k.clear(), e.clear(), E = !1, h("dirty").textContent = "Проверки открыты", T(), U("Проверки открыты. Обновите модели перед переходом к элементам."), h("file").value = "");
  });
  for (const s of ["settings", "help"])
    h(s).onclick = () => h(s + "-dialog").showModal();
  for (const s of i.querySelectorAll("[data-close]"))
    s.onclick = () => h(s.dataset.close).close();
  h("content").onchange = (s) => C(() => {
    const l = s.target, c = S();
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
      l.id === "type" && (c.type = l.value), l.id === "touching" && (c.touching = l.checked), l.id === "same-model" && (c.ignoreSameModel = l.checked), l.id === "same-group" && (c.ignoreSameGroup = l.checked), l.id === "hidden" && (c.includeHidden = l.checked), l.id === "equal-property" && (c.equalProperty = l.value), q(), T();
      return;
    }
    if (l.id === "result-state") {
      g = 0, X();
      return;
    }
    if (l.id === "check-page") {
      for (const x of D().slice(g * 50, g * 50 + 50))
        l.checked ? k.add(x.id) : k.delete(x.id);
      X();
      return;
    }
    if (l.classList.contains("row-check")) {
      const x = l.closest("[data-result]").dataset.result;
      l.checked ? k.add(x) : k.delete(x), h("selection-count").textContent = `Выбрано: ${k.size}`;
      return;
    }
    const p = c.results.find((x) => x.id === m);
    p && (l.id === "edit-state" && (p.state = l.value, X(), Z(), ce()), l.id === "assignee" && (p.assignee = l.value), l.id === "note" && (p.note = l.value, X()), R());
  }), h("content").oninput = (s) => {
    const l = s.target;
    (l.id === "result-search" || l.id === "result-depth") && (g = 0, X());
    const c = S(), p = Number(l.value);
    c && l.id === "precision" && Number.isFinite(p) && p >= 1e-3 && p <= 100 && (c.precision = p, q()), c && l.id === "min-penetration" && Number.isFinite(p) && p >= 0 && p <= 1e5 && (c.minPenetration = p, q());
  }, h("content").onclick = (s) => C(async () => {
    const l = s.target, c = l.closest("button"), p = S();
    if (!p) return;
    if (c?.dataset.selection) {
      const v = c.closest("[data-side]").dataset.side, b = p[v], y = h("content").scrollTop;
      let I = !0;
      switch (c.dataset.selection) {
        case "load-set": {
          const N = o.sets.find((Q) => Q.id === b.presetId);
          if (!N) throw Error("Выберите сохранённый набор моделей.");
          Object.assign(b, structuredClone(N.selection), {
            conditions: [],
            mode: "all",
            include: [],
            exclude: [],
            manualOnly: !1,
            presetId: N.id
          });
          break;
        }
        case "save-set": {
          if (b.manualOnly)
            throw Error(
              "Ручную выборку элементов нельзя сохранить как набор моделей."
            );
          const N = await W();
          if (!N) return;
          const Q = {
            id: crypto.randomUUID(),
            name: N,
            selection: {
              models: [...b.models],
              modelsMode: b.modelsMode,
              conditions: [],
              mode: "all"
            }
          };
          o.sets.push(Q), b.presetId = Q.id, I = !1;
          break;
        }
        case "delete-set": {
          const N = o.sets.find((Q) => Q.id === b.presetId);
          if (!N) throw Error("Выберите сохранённый набор моделей.");
          if (!confirm(`Удалить набор «${N.name}»?`)) return;
          o.sets = o.sets.filter((Q) => Q.id !== N.id);
          for (const Q of o.checks)
            for (const ne of [Q.a, Q.b])
              ne.presetId === N.id && (ne.presetId = void 0);
          I = !1;
          break;
        }
        case "show":
          e.select(
            (d?.elements || []).filter((N) => (p.includeHidden || !N.hidden) && Ce(N, b)).map((N) => N.id)
          );
          return;
        case "only": {
          const N = e.selected();
          if (!N.length) throw Error("Выделите элементы в 3D-сцене.");
          b.include = N, b.exclude = [], b.manualOnly = !0;
          break;
        }
        case "include": {
          const N = e.selected();
          if (!N.length) throw Error("Выделите элементы в 3D-сцене.");
          b.include = [.../* @__PURE__ */ new Set([...b.include, ...N])], b.exclude = b.exclude.filter((Q) => !N.includes(Q));
          break;
        }
        case "exclude": {
          const N = e.selected();
          if (!N.length) throw Error("Выделите элементы в 3D-сцене.");
          b.exclude = [.../* @__PURE__ */ new Set([...b.exclude, ...N])], b.include = b.include.filter((Q) => !N.includes(Q));
          break;
        }
        case "reset":
          b.manualOnly = !1, b.include = [], b.exclude = [];
      }
      I ? q() : R(), T(), h("content").scrollTop = y;
      return;
    }
    if (c?.id === "prev-page" && (g--, X()), c?.id === "next-page" && (g++, X()), c?.id === "show-markers" && (O = !O, c.textContent = O ? "● Знаки включены" : "○ Знаки выключены", c.setAttribute("aria-checked", String(O)), ce()), c?.id === "bulk") {
      const v = h("bulk-state").value;
      for (const b of p.results) k.has(b.id) && (b.state = v);
      R(), X(), _(), Z(), ce();
    }
    if (c?.id === "capture-image") {
      const v = p.results.find((b) => b.id === m);
      if (v) {
        j = !1, F(!0), B("Создание снимка пары");
        try {
          v.image = await e.snapshot(
            v,
            Number(h("distance").value),
            () => j,
            !0
          ), v.imageScope = "pair-ab", v.imageDistance = void 0, R(), _(), U("Снимок сохранён в результат.");
        } finally {
          M(), F(!1);
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
      const b = h("selected-only").checked ? p.results.filter((I) => k.has(I.id)) : p.results;
      if (!b.length) throw Error("Нет результатов для отчёта.");
      if (h("report-images").checked) {
        const I = e.view, N = I?.storeView(), Q = Number(h("distance").value);
        j = !1, F(!0), B("Подготовка снимков отчёта", 0, b.length);
        try {
          await e.captureWorkspace(async () => {
            let ne = 0;
            for (const re of b) {
              if (j)
                throw Error(
                  "Подготовка отчёта отменена. Уже полученные снимки сохранены."
                );
              B(
                "Подготовка снимков отчёта",
                ne,
                b.length
              ), U("Подготовка снимков: " + (ne + 1) + " / " + b.length);
              const at = re.imageScope !== "pair-ab" || re.imageDistance !== void 0 && re.imageDistance !== Q;
              if (!re.image || at) {
                if (re.state === "resolved" && !e.canLocate(re)) {
                  ne++;
                  continue;
                }
                try {
                  re.image = await e.snapshot(re, Q, () => j), re.imageScope = "pair-ab", re.imageDistance = Q, R();
                } catch (rt) {
                  if (j || !e.isCurrent()) throw rt;
                  v++;
                }
              }
              ne++, B("Подготовка снимков отчёта", ne, b.length);
            }
          });
        } finally {
          if (I && e.isCurrent()) {
            const ne = p.results.find((re) => re.id === m);
            if (ne)
              try {
                e.focus(ne, Q, !1);
              } catch {
              }
            N && I.restoreView(N);
          }
          M(), F(!1);
        }
      }
      const y = h("report-images").checked ? b.map(
        (I) => I.imageScope === "pair-ab" ? I : { ...I, image: void 0 }
      ) : b.map((I) => ({ ...I, image: void 0 }));
      Je(
        p.name + (c.id === "export-html" ? ".html" : ".collision360.json"),
        c.id === "export-html" ? It(p, y) : jt(p, y)
      ), U(
        "Отчёт подготовлен. Результатов: " + b.length + "; со снимками: " + y.filter((I) => I.image).length + "." + (v ? ` Не удалось создать снимков: ${v}; эти строки включены без изображения.` : ""),
        v > 0
      );
    }
    const x = l.closest("[data-result]");
    x && !l.closest("input") && !window.getSelection()?.toString() && V(x.dataset.result);
  }), h("content").ondblclick = (s) => {
    const l = s.target, c = l.closest("[data-result]");
    c && !l.closest("input") && C(() => V(c.dataset.result, !0));
  };
  const Se = setInterval(() => {
    w || (he() ? (h("model-count").textContent = "Модели не прочитаны", U(
      o.checks.length ? "Открыт другой проект. Показаны его проверки; обновите модели." : "Открыт другой проект. Для него ещё нет проверок."
    ), w || T()) : d && !e.isCurrent() && (d = void 0, e.clear(), h("model-count").textContent = "3D-окно изменилось", U("Активное 3D-окно изменилось. Обновите модели."), w || T()));
  }, 1500);
  return T(), () => {
    a(), clearInterval(Se), clearTimeout(z), $++, j = !0, P?.(), A?.terminate(), e.clear();
  };
}
var Ge = /* @__PURE__ */ ((t) => (t.object = "object", t.drawing = "drawing", t.table = "table", t.record = "record", t.textStyle = "textstyle", t.textStyleTable = "textstyles", t.linetype = "linetype", t.linetypeTable = "linetypes", t.layer = "layer", t.layerTable = "layers", t.block = "block", t.blockTable = "blocks", t.layout = "layout", t.layoutTable = "layouts", t.type = "type", t.typeTable = "types", t.material = "material", t.materialTable = "materials", t.geometry = "geometry", t.geometryTable = "geometries", t.group = "group", t.groupTable = "groups", t.attachment = "attachment", t.attachmentTable = "attachments", t.entities = "entities", t.entity = "entity", t.line = "l", t.solid = "s", t.insert = "i", t.polyline = "p", t.circle = "c", t.arc = "a", t.polyline3d = "p3", t.proxy = "x", t.text = "t", t.mtext = "mt", t.wipeout = "w", t.model3d = "g", t.alignment = "al", t))(Ge || {});
const Ye = () => new Promise((t) => requestAnimationFrame(() => t()));
function st(t) {
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
  const r = a[0].getBoundingClientRect();
  if (a.some((n) => {
    const o = n.getBoundingClientRect();
    return Math.abs(o.x - r.x) > 4 || Math.abs(o.y - r.y) > 4;
  }))
    throw Error(
      "Открыто несколько подходящих 3D-окон. Оставьте одно окно для снимка."
    );
  return { candidates: a, rect: r };
}
async function zt(t) {
  await Ye(), t.repaint();
  const { candidates: e, rect: i } = st(t), a = document.createElement("canvas");
  a.width = Math.max(1, Math.round(i.width * devicePixelRatio)), a.height = Math.max(1, Math.round(i.height * devicePixelRatio)), Object.assign(a.style, {
    position: "fixed",
    left: `${i.left}px`,
    top: `${i.top}px`,
    width: `${i.width}px`,
    height: `${i.height}px`,
    zIndex: "2147483646",
    pointerEvents: "none"
  });
  const r = a.getContext("2d");
  for (const n of e)
    r.drawImage(n, 0, 0, a.width, a.height);
  return document.body.append(a), async () => {
    t.repaint(), await Ye(), a.remove();
  };
}
async function $t(t, e) {
  if (await Ye(), e()) throw Error("Подготовка снимков отменена.");
  const { candidates: i } = st(t), a = document.createElement("canvas"), r = Math.min(1, 1280 / i[0].width);
  a.width = Math.round(i[0].width * r), a.height = Math.round(i[0].height * r);
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
const Le = "nashepo.checks.points", Xe = "nashepo.checks.highlight";
function Ke(t) {
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
  const r = t;
  if ("$value" in r) {
    Ne(r.$value, e, i, a + 1);
    return;
  }
  for (const [n, o] of Object.entries(r))
    n.startsWith("$") || Ne(o, e ? `${e}.${n}` : n, i, a + 1);
}
function Ot(t) {
  const e = t.vertices.length / 3, i = (o) => Number.isFinite(t.vertices[o * 3]) && Number.isFinite(t.vertices[o * 3 + 1]) && Number.isFinite(t.vertices[o * 3 + 2]), a = (o) => {
    const d = t.indices[o], u = t.indices[o + 1], f = t.indices[o + 2];
    return d < e && u < e && f < e && d !== u && u !== f && f !== d && i(d) && i(u) && i(f);
  };
  let r = 0;
  for (let o = 0; o < t.indices.length; o += 3) a(o) && (r += 3);
  if (r === t.indices.length) return t.indices;
  const n = new Uint32Array(r);
  for (let o = 0, d = 0; o < t.indices.length; o += 3)
    a(o) && (n[d++] = t.indices[o], n[d++] = t.indices[o + 1], n[d++] = t.indices[o + 2]);
  return n;
}
const De = (t) => /\.wdx(?:[?#].*)?$/i.test(t);
class Nt {
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
        (r) => requestAnimationFrame(() => requestAnimationFrame(() => r()))
      ));
    }
    try {
      return await e();
    } finally {
      if (this.captureDepth--, i && this.captureLayout) {
        const { panel: a, size: r, maximized: n } = this.captureLayout;
        this.captureLayout = void 0, a.size = r, a.maximized = n, await new Promise(
          (o) => requestAnimationFrame(() => requestAnimationFrame(() => o()))
        );
      }
    }
  }
  async scan(e, i, a) {
    const r = this.app, n = this.view, o = r?.model;
    if (!n || !o?.layouts || !o.attachments)
      throw Error(
        "Откройте проект Топоматик 360 с IFC или SMDX и сделайте его 3D-окно активным."
      );
    const d = [], u = /* @__PURE__ */ new Set(), f = [], m = [], g = [], w = /* @__PURE__ */ new Map(), j = /* @__PURE__ */ new Set();
    let A = 2166136261;
    const O = Ke(
      () => i() || r !== this.app || n !== this.view
    );
    let E = -1 / 0;
    const k = (z) => {
      for (let $ = 0; $ < z.length; $++)
        A = Math.imul(A ^ z.charCodeAt($), 16777619);
    }, P = async (z, $, S) => {
      if (j.has(z)) return;
      j.add(z);
      const h = z.layers.layer0?.modelName || $, J = $, U = De(h) || De(J), B = (q, ie) => {
        u.has(q) || (u.add(q), d.push({ id: q, name: ie }));
      };
      U || B(J, h);
      const M = !U && (!a || a.has(J)), C = [];
      (M || U) && z.layouts.model?.walk((q) => (q.type === Ge.model3d ? C.push(q) : q.type === Ge.insert && f.push(`${h}: вставка блока не включена в расчёт.`), !1));
      const W = /* @__PURE__ */ new Map();
      for (const q of C) {
        let ie = q.layer, L = "";
        for (; ie; ) {
          if (ie.modelName && !De(ie.modelName)) {
            L = ie.modelName;
            break;
          }
          ie = ie.layer;
        }
        const D = U ? L || "Модель проекта" : h, Z = U ? L || `${$}/#model` : J;
        if (U && B(Z, D), a && !a.has(Z)) continue;
        const oe = JSON.stringify([
          q.layer?.UUID || "",
          q.$id || q.$path
        ]);
        W.set(JSON.stringify([Z, oe]), {
          key: oe,
          objects: [q],
          modelId: Z,
          modelName: D
        });
      }
      let R = 0;
      for (const q of W.values()) {
        const { key: ie, objects: L, modelId: D, modelName: Z } = q;
        if (i()) throw Error("Чтение моделей отменено.");
        if (r !== this.app || n !== this.view)
          throw Error(
            "Активный проект изменился. Запустите чтение моделей заново."
          );
        const oe = L[0].layer, T = {};
        try {
          if (oe) {
            const fe = [];
            let ce = oe;
            for (; ce && fe.length < 64; )
              fe.unshift(ce), ce = ce.layer;
            for (const V of fe)
              Ne(V.typedProperties(), "", T), V.typed?.name && (T.Тип = V.typed.name);
          }
        } catch {
          f.push(`${Z} / ${ie}: часть свойств недоступна.`);
        }
        const xe = T["ifc.id"] || Object.entries(T).find(
          ([fe]) => /(^|\.)(globalid|ifcguid|guid)$/i.test(fe)
        )?.[1] || "", X = oe?.name || L[0].$id || "Элемент", _ = JSON.stringify([D, ie]);
        Object.assign(T, {
          Модель: Z,
          Имя: X,
          GUID: xe,
          Объект: oe?.UUID || ie
        });
        const se = {
          min: [1 / 0, 1 / 0, 1 / 0],
          max: [-1 / 0, -1 / 0, -1 / 0]
        };
        let be = !0, me = !1, ae = 0;
        for (const fe of L) {
          be &&= fe.isClosed;
          for (const ce of Object.values(fe.meshes)) {
            const V = ce.geometry;
            if (!V || V.indices.length % 3) {
              me = !0;
              continue;
            }
            be &&= ce.isClosed;
            for (let G = 0; G < V.vertices.length; G += 3) {
              const F = [
                V.vertices[G],
                V.vertices[G + 1],
                V.vertices[G + 2]
              ];
              if (Math3d.mat4.mulv3(F, fe.matrix, F), !F.every(Number.isFinite)) {
                me = !0;
                continue;
              }
              for (let Y = 0; Y < 3; Y++)
                se.min[Y] = Math.min(se.min[Y], F[Y]), se.max[Y] = Math.max(se.max[Y], F[Y]);
              if (k(F.join(",")), G % 6e4 === 0 && (performance.now() - E > 200 && (E = performance.now(), e(
                "Индексирование: " + Z + " · " + g.length + " элементов"
              )), await O(), i()))
                throw Error("Чтение моделей отменено.");
            }
            const K = V.vertices.length / 3, ee = (G) => Number.isFinite(V.vertices[G * 3]) && Number.isFinite(V.vertices[G * 3 + 1]) && Number.isFinite(V.vertices[G * 3 + 2]);
            for (let G = 0; G < V.indices.length; G += 3) {
              const F = V.indices[G], Y = V.indices[G + 1], ue = V.indices[G + 2];
              if (A = Math.imul(A ^ F, 16777619), A = Math.imul(A ^ Y, 16777619), A = Math.imul(A ^ ue, 16777619), F < K && Y < K && ue < K && F !== Y && Y !== ue && ue !== F && ee(F) && ee(Y) && ee(ue) ? ae++ : me = !0, G % 15e4 === 0 && (await O(), i()))
                throw Error("Чтение моделей отменено.");
            }
          }
        }
        if (me || !ae) {
          if (ae || R++, !ae) continue;
          be = !1;
        }
        const Me = {
          id: _,
          name: X,
          model: Z,
          modelId: D,
          guid: xe,
          properties: T,
          hidden: S || !!oe?.resolveHidden() || !!oe?.resolveDisabled(),
          triangles: new Float64Array(0),
          triangleCount: ae,
          closed: be,
          bounds: se
        };
        k(JSON.stringify([_, T, Me.hidden])), g.push(Me), w.set(_, L);
      }
      R && f.push(
        `${h}: пропущено элементов без треугольной геометрии — ${R}.`
      );
      const he = [];
      z.attachments.forEach((q) => {
        he.push(q);
      });
      for (const q of he) {
        const ie = q.name || q.uri || q.$id, L = ie || "Подключённая модель", D = `${$}/${ie || "attachment"}`;
        q.model || B(D, L), q.model ? await P(
          q.model,
          D,
          S || q.hidden
        ) : (!a || a.has(D)) && m.push(
          `${L}: модель не загружена. Откройте её перед расчётом.`
        );
      }
    };
    if (await P(o, o.layers.layer0?.modelName || "Проект", !1), !g.length && (!a || a.size > 0)) {
      const z = a ? [...a].filter(($) => !u.has($)) : [];
      throw Error(
        z.length ? `Сохранённая выборка ссылается на модели, которых нет в текущем составе: ${z.join(", ")}. Обновите список моделей.` : d.length ? "В выбранных моделях не найдены 3D-элементы с доступной геометрией. Проверьте, что модели загружены, и выберите нужные файлы." : "В открытом проекте не обнаружены IFC/SMDX-модели. Проверьте состав подключений проекта."
      );
    }
    return this.clear(), this.refs = w, this.metadata = new Map(g.map((z) => [z.id, z])), this.scannedApp = r, this.scannedView = n, {
      elements: g,
      fingerprint: `${g.length}:${A >>> 0}`,
      warnings: [...new Set(f)],
      blockers: [...new Set(m)],
      models: d,
      indexedModelIds: d.filter((z) => !a || a.has(z.id)).map((z) => z.id)
    };
  }
  async geometry(e, i) {
    const a = Ke(() => i() || !this.isCurrent());
    if (!this.isCurrent()) throw Error("Активная модель изменилась.");
    const r = this.metadata.get(e), n = this.refs.get(e);
    if (!r || !n) throw Error("Элемент отсутствует.");
    const o = n.flatMap(
      (j) => Object.values(j.meshes).flatMap((A) => {
        const O = A.geometry;
        if (!O || O.indices.length % 3) return [];
        const E = Ot(O);
        return E.length ? [{ object: j, g: O, indices: E }] : [];
      })
    );
    let d = 0, u = 0;
    for (const { g: j, indices: A } of o) {
      if (!j) throw Error("Геометрия недоступна.");
      d += j.vertices.length, u += A.length;
    }
    const f = new Float64Array(d), m = new Uint32Array(u);
    let g = 0, w = 0;
    for (const { object: j, g: A, indices: O } of o) {
      if (!A) throw Error("Геометрия недоступна.");
      for (let E = 0; E < A.vertices.length; E += 3) {
        const k = [A.vertices[E], A.vertices[E + 1], A.vertices[E + 2]];
        if (Math3d.mat4.mulv3(k, j.matrix, k), f.set(k, g + E), E % 6e4 === 0 && (await a(), i() || !this.isCurrent()))
          throw Error("Чтение геометрии отменено.");
      }
      for (let E = 0; E < O.length; E++)
        if (m[w + E] = g / 3 + O[E], E % 15e4 === 0 && (await a(), i()))
          throw Error("Чтение геометрии отменено.");
      g += A.vertices.length, w += O.length;
    }
    return { ...r, vertices: f, indices: m };
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
      const e = this.pointView.annotations.get(Le);
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
    const r = e.point, n = this.view;
    n.camera?.id !== "3d" && n.setCameraType("3d"), n.pauseAnimation?.(), this.highlight(e), this.select([e.a.id, e.b.id]);
    const o = [-0.65, 0.65, -0.394], d = Math.hypot(...o);
    o.forEach((u, f) => o[f] = u / d), n.lookAt(
      r.map((u, f) => u - o[f] * i),
      o,
      [0, 0, 1],
      a,
      r
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
        (f) => Object.values(f.meshes).flatMap((m) => {
          const g = m.geometry;
          if (!g) return [];
          const w = {
            // SDK fields may be prototype getters rather than own properties.
            uuid: `${Xe}.${u}.${g.uuid}`,
            vertices: g.vertices,
            indices: g.indices,
            normals: g.normals,
            bounds: g.bounds,
            colors: new Uint32Array(g.vertices.length / 3).fill(d)
          };
          return [{ obj: f, geometry: w, color: d }];
        })
      )
    ), this.overlay) {
      this.overlay.layer.visible = !0, i.invalidate(!0);
      return;
    }
    let r;
    r = {
      id: Xe,
      order: 1e4,
      visible: !0,
      paint: () => {
      },
      paint3d: (o) => {
        const d = o.color, u = o.rasterizer.material;
        o.rasterizer.material = void 0;
        try {
          for (const { obj: f, geometry: m, color: g } of this.overlaySurfaces) {
            o.color = g, o.pushMatrix();
            try {
              o.multMatrix(f.matrix), o.mesh(m);
            } finally {
              o.popMatrix();
            }
          }
        } catch (f) {
          r.visible = !1, this.overlayError = new Error(
            "Не удалось отрисовать подсветку пары: " + (f instanceof Error ? f.message : String(f))
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
    }, i.layer.addLayer(r), this.overlay = { view: i, layer: r }, i.invalidate();
  }
  async snapshot(e, i, a, r = !1, n = !0) {
    const o = () => this.snapshotInWorkspace(e, i, a, r);
    return n ? this.captureWorkspace(o) : o();
  }
  async snapshotInWorkspace(e, i, a, r = !1) {
    if (!this.isCurrent())
      throw Error("Обновите модели перед созданием снимков.");
    if (!this.canLocate(e))
      throw Error("Элементы результата отсутствуют в открытых моделях.");
    const n = this.view, o = n.layer.drawing;
    if (!o)
      throw Error(
        "Слой моделей недоступен для снимка пары. Откройте 3D-окно проекта."
      );
    const d = o.visible, u = n.annotations.visible, f = new Set(n.layer.selectedObjects());
    let m;
    try {
      r ? this.highlight(e) : this.focus(e, i, !1), n.pauseAnimation(), m = await zt(n), n.layer.clearSelected(), o.visible = !1, n.annotations.visible = !1, n.invalidate();
      const g = await $t(
        n,
        () => a() || !this.isCurrent()
      );
      if (this.overlayError) throw this.overlayError;
      return g;
    } finally {
      o.visible = d, n.annotations.visible = u, n.layer.clearSelected(), n.layer.selectObjects((g) => f.has(g), !0), n.invalidate(), await m?.();
    }
  }
  markers(e, i, a, r) {
    if (!this.isCurrent()) return;
    const n = this.view;
    this.pointView && this.pointView !== n && this.clear();
    const o = n.annotations.get(Le);
    if (o && n.annotations.release(o), this.pointView = n, !a) {
      n.invalidate();
      return;
    }
    const d = n.annotations.create(Le, 1e4), u = e.filter((f) => f.id !== i).concat(e.filter((f) => f.id === i));
    for (const f of u.slice(-3e3)) {
      if (f.state === "resolved") continue;
      const [m, g, w] = f.point, j = f.id === i, A = f.state === "excluded" ? "#78818c" : f.state === "approved" || f.state === "reviewed" ? "#28b94b" : "#e1372d", O = j ? "#f2c94c" : A, E = () => r(f.id), k = [
        { type: "line", a: [m, g, w], b: [m, g, w + 1], color: O, width: 5 },
        {
          type: "polyline",
          points: [
            [m - 0.65, g, w + 1],
            [m + 0.65, g, w + 1],
            [m, g, w + 2.2],
            [m - 0.65, g, w + 1]
          ],
          color: O,
          fillColor: A,
          width: j ? 5 : 2
        },
        {
          type: "line",
          a: [m, g - 0.01, w + 1.85],
          b: [m, g - 0.01, w + 1.4],
          color: "#ffffff",
          width: 4
        },
        {
          type: "line",
          a: [m, g - 0.01, w + 1.22],
          b: [m, g - 0.01, w + 1.27],
          color: "#ffffff",
          width: 4
        }
      ];
      d.add({
        id: f.id,
        type: "shaped",
        shapes: k,
        activeShapes: k,
        activateCommand: E,
        dblCommand: E
      }), j && d.add({
        id: f.id + ":label",
        type: "simple",
        position: [m, g, w + 2.35],
        label: `${f.a.name} × ${f.b.name}`,
        labelBackground: "#f2c94c",
        labelColor: "#171717",
        activateCommand: E
      });
    }
    n.invalidate();
  }
}
let _e, Re, et;
const qt = {
  open(t) {
    t.manager.revealView("nashepo.collisionfinder360/checks_panel");
  },
  mount(t) {
    const e = t.el;
    if (!e) return;
    if (Re && et === t.manager) {
      e.replaceChildren(Re);
      return;
    }
    _e?.();
    const i = document.createElement("div");
    i.style.height = "100%", e.replaceChildren(i), Re = i, et = t.manager, _e = Ct(i, new Nt(t));
  }
};
export {
  qt as default
};
