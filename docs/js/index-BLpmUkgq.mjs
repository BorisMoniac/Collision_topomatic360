const rt = `<h2>Работа с проверками</h2>
<details open><summary>1. Первая проверка</summary><ol><li>Откройте проект и подключите IFC/SMDX штатными средствами Топоматик 360.</li><li>Откройте нижнюю вкладку «Проверки» и нажмите «Модели».</li><li>Нажмите «＋ Новая проверка» и задайте ей понятное имя.</li><li>Во вкладке «Выбор» оставьте галочки только у нужных файлов в А и Б. «Все модели» включено по умолчанию.</li><li>Выберите «По пересечению» или «Дублирование» и нажмите «Запустить».</li><li>Во вкладке «Результаты» дважды нажмите строку: камера направится к конфликту, элемент А будет выделен красным, элемент Б — синим, и оба элемента станут выделенными в 3D-окне.</li></ol><p>Первое обновление без созданной проверки получает только список файлов. При запуске индексируются модели, отмеченные хотя бы в одной стороне. Файл проекта WDX служит контейнером и в выбор моделей не попадает.</p></details>
<details><summary>2. Выбор моделей и сохранённые наборы</summary><p>Выбор А и выбор Б задают две стороны сравнения. Снимите «Все модели» и отметьте конкретные IFC/SMDX. Для поиска дубликатов внутри одного файла отметьте его с обеих сторон.</p><p>Часто используемый состав можно сохранить как набор моделей, а затем применить в другой проверке. Наборы входят в файл проверок. Состав выборки задаётся галочками моделей и ручным выделением объектов.</p><p>IFC GUID читается из свойства <code>ifc.id</code>; также поддерживаются GlobalId, IfcGuid и GUID.</p></details>
<details><summary>3. Работа с выделением в 3D</summary><p>Сначала выделите элементы штатными средствами в 3D-окне, затем используйте кнопку в нужной стороне:</p><ul><li><b>Показать выбранные элементы</b> — выделяет весь текущий состав.</li><li><b>Только выделенные в 3D</b> — оставляет только выделенные объекты.</li><li><b>＋ Добавить из 3D</b> — добавляет выделенные объекты к моделям.</li><li><b>− Исключить из 3D</b> — исключает выделенные объекты.</li><li><b>Сбросить ручной выбор</b> — снова использует отмеченные модели.</li></ul><p>Ручные идентификаторы могут измениться после замены IFC/SMDX, поэтому такую выборку следует проверить заново.</p></details>
<details><summary>4. Пересечения, глубина, касания и дубликаты</summary><p><b>Пересечение</b> рассчитывается по фактическим треугольным поверхностям. Габаритные коробки отбирают близкие пары, а общий габарит пары дополнительно ограничивает область, внутри которой берётся замер глубины.</p><p><b>Расчётная глубина Hard Clash</b> — это толщина самого сильного из отдельных перекрытий пары. Направления для замера берутся от граней, сошедшихся в контакте, плюс три оси координат. Вдоль каждого направления оба тела дают тень; общая часть двух теней показывает, насколько одно тело зашло в другое в этом направлении. Глубиной становится наименьшее значение по всем направлениям. Проецируется только та геометрия, что попала в общий габарит пары, и проекции обрезаются по его границам.</p><p>Если пара соприкасается сразу в нескольких местах, они разбираются по отдельности, а в результат идёт самое глубокое. Пустота между двумя контактами не превращается в глубину: плагин проверяет, лежит ли промежуток внутри обоих тел, и разрезает замер только там, где промежуток пуст. Труба сквозь две стенки одного элемента даёт толщину стенки, а не расстояние между ними.</p><p>Поэтому значение не зависит ни от густоты сетки, ни от размеров элементов: труба одного диаметра даёт одну и ту же глубину и на грубой, и на подробной модели, а длина стержня, проходящего сквозь плиту, на результат не влияет. Далеко отнесённая часть составного объекта тоже не завышает глубину.</p><p>Это именно перекрытие тел, а не длина перемещения, которое их разведёт: чтобы вынуть стержень из плиты, его надо вытянуть на всю длину, и к тяжести конфликта это отношения не имеет. Объём пересечения вместо глубины не используется: одинаковый объём может означать совсем разные конфликты.</p><p>Одна пара элементов формирует один результат. Точкой коллизии становится контакт, ближайший к середине области перекрытия. Несколько несвязанных областей одной пары отдельно не группируются.</p><p>Если один из элементов — плоский лист без собственной толщины, объёмный замер к нему неприменим. Такой конфликт остаётся в результате со значением «не определена», и порог минимальной глубины его не отсекает: решение по нему принимает человек. Разрезание на отдельные перекрытия работает по трём осям координат, поэтому два контакта, разнесённые вдоль наклонного направления, ещё могут объединиться.</p><p>«Точность расчёта» — геометрическая погрешность, а «Минимальная глубина» — пользовательский допуск для исключения небольших конфликтов. Порог применяется с запасом на точность: при минимуме 20 мм и точности 0,1 мм конфликт глубиной 19,95 мм ещё останется. Нулевую глубину получают только касания двух объёмных тел, и лишь когда включён их учёт. Труба и отвод могут пересекаться в штатном соединении из-за фасеточной аппроксимации круглых поверхностей; такие соединения исключаются правилами. <b>Дублирование</b> ищет совпадающие треугольники в одинаковых мировых координатах.</p></details>
<details><summary>5. Составные объекты и неполная геометрия</summary><p>Один IFC-объект может состоять из нескольких частей. Чтобы не сравнивать его части между собой, включите «Не проверять геометрию одного составного объекта» во вкладке «Правила». Там же можно исключить пары одной модели или одинакового значения свойства.</p><p>Пустые и неполные геометрические части пропускаются, а пригодные части модели продолжают участвовать. Плагин показывает сводное замечание с количеством пропущенных элементов. Незагруженный подключённый файл блокирует расчёт только тогда, когда он входит в выборку.</p></details>
<details><summary>6. Результаты и состояния</summary><p>«Новый» найден впервые, «Активный» найден повторно, «Проверенный» рассмотрен, «Подтверждённый» подтверждён, «Исключённый» исключён из работы. «Исправленный» означает, что пара исчезла при повторном расчёте с теми же правилами; состояние можно изменить вручную.</p><p>В таблице доступны IFC GUID, расчётная глубина, назначение и комментарий. Фильтр «Глубина от» пропускает строки со значением «не определена», чтобы неизмеримый конфликт не исчез молча. Галочки меняют состояние сразу у нескольких строк. Значения можно выделять и копировать. При переходе стрелками активная строка автоматически прокручивается в видимую область. Состояние «Устарела» у проверки означает, что после последнего расчёта изменили её тип, выборки, параметры или правила.</p></details>
<details><summary>7. Отчёт и снимки</summary><p>После перехода к коллизии отсутствующий снимок создаётся автоматически, если пользователь задержался на результате. Кадр строится от той же камеры приближения, что и снимки отчёта: ракурс задаёт «Дистанция камеры» в настройках. Если дистанцию изменить, отчёт переснимет прежние кадры под новое значение. Быстрое переключение стрелками отменяет лишние снимки. Во время технической перерисовки поверх 3D-окна сохраняется предыдущий кадр, поэтому модель не должна мигать.</p><p>Кнопка «Снимок пары» сохраняет текущий ракурс только с двумя элементами коллизии: элемент А показан красным, элемент Б — синим. Такой кадр собран вручную, поэтому отчёт его не переснимает. На время подготовки отчёта нижняя панель автоматически уменьшается для широкого 3D-кадра и затем возвращается к прежнему размеру. Файл сессии предназначен для открытия результатов в плагине «НашеПО · Коллизии».</p></details>
<details><summary>8. Проекты, сохранение и очистка</summary><p>В пределах открытой страницы каждый проект получает собственный список проверок. Сворачивание или повторное открытие нижней панели сохраняет проверки, результаты и комментарии в текущей вкладке. При переключении проекта данные предыдущего не подмешиваются. «Очистить проект» удаляет проверки, результаты и наборы только у текущего проекта.</p><p>«Сохранить проверки» записывает правила, наборы моделей, результаты, комментарии и снимки в JSON. «Открыть проверки» загружает этот файл. Геометрия в файл не входит: соответствующие модели надо открыть отдельно. После обновления или закрытия страницы для продолжения работы используйте сохранённый файл.</p></details>
<details><summary>9. Большие проекты</summary><p>Жёсткого предела в 6 млн треугольников нет. При запуске строится индекс только по отмеченным моделям. Точная геометрия передаётся в расчёт по мере появления близких пар в компактном индексированном виде.</p><p>Время и память всё равно зависят от состава выборок и числа потенциальных пар. Разделяйте проверки по моделям и системам. В сцене одновременно показывается до 3000 знаков; при 50 000 результатах расчёт останавливается без замены прежнего результата.</p></details>`;
function lt(t) {
  let e = t.parentElement, i;
  for (; e && !i; )
    i = [...e.children].find(
      (h) => h.classList.contains("resizer-horizontal")
    ), e = e.parentElement;
  if (!i) return () => {
  };
  const s = i, r = t.ownerDocument.defaultView;
  let n;
  const a = () => {
    if (n === void 0) return;
    const h = n;
    n = void 0, s.dispatchEvent(
      new MouseEvent("mouseup", { bubbles: !0, composed: !0 })
    ), s.hasPointerCapture(h) && s.releasePointerCapture(h);
  }, p = (h) => {
    h.button === 0 && (n = h.pointerId, s.setPointerCapture(h.pointerId));
  };
  return s.addEventListener("pointerdown", p), s.addEventListener("pointerup", a), s.addEventListener("pointercancel", a), s.addEventListener("lostpointercapture", a), r.addEventListener("blur", a), () => {
    a(), s.removeEventListener("pointerdown", p), s.removeEventListener("pointerup", a), s.removeEventListener("pointercancel", a), s.removeEventListener("lostpointercapture", a), r.removeEventListener("blur", a);
  };
}
const dt = "0.5.0", Ne = (t) => typeof t == "string" && /^data:image\/(jpeg|png);base64,[A-Za-z0-9+/=]+$/.test(t), we = {
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
}), ct = () => ({
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
  triangleCount: s,
  closed: r,
  bounds: n,
  ...a
}) => a;
function Ce(t, e) {
  return e.exclude.includes(t.id) ? !1 : e.include.includes(t.id) ? !0 : !(e.manualOnly || e.modelsMode === "selected" && !e.models.includes(t.modelId) || e.modelsMode === void 0 && e.models.length && !e.models.includes(t.modelId));
}
const pt = (t) => JSON.stringify([
  t.type,
  ...[t.a, t.b].map(
    ({
      models: e,
      modelsMode: i,
      conditions: s,
      mode: r,
      include: n,
      exclude: a,
      manualOnly: p
    }) => ({
      models: e,
      modelsMode: i,
      conditions: s,
      mode: r,
      include: n,
      exclude: a,
      manualOnly: p
    })
  ),
  t.precision,
  t.minPenetration,
  t.touching,
  t.ignoreSameModel,
  t.ignoreSameGroup,
  t.equalProperty,
  t.includeHidden
]), ut = (t, e) => JSON.stringify([t, e].sort());
function mt(t, e, i) {
  const s = new Map(t.map((n) => [n.id, n])), r = e.map((n) => {
    const a = s.get(n.id);
    return s.delete(n.id), {
      ...n,
      note: a?.note ?? "",
      assignee: a?.assignee ?? "",
      firstSeen: a?.firstSeen ?? i,
      lastSeen: i,
      state: !a || a.state === "resolved" ? "new" : a.state === "new" ? "active" : a.state
    };
  });
  for (const n of s.values())
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
  const s = (r) => /\.wdx(?:[?#].*)?$/i.test(r);
  for (const r of e.sets)
    r.selection.models = r.selection.models.filter(
      (n) => !s(n)
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
    r.warnings ??= [], r.modelsAtRun = r.modelsAtRun?.filter((n) => !s(n));
    for (const n of [r.a, r.b]) {
      if (!n || n.manualOnly !== void 0 && typeof n.manualOnly != "boolean" || n.modelsMode !== void 0 && !["all", "selected"].includes(n.modelsMode) || n.presetId !== void 0 && typeof n.presetId != "string" || !["all", "any"].includes(n.mode) || ![n.models, n.include, n.exclude].every(
        (a) => Array.isArray(a) && a.every((p) => typeof p == "string")
      ) || !Array.isArray(n.conditions) || !n.conditions.every(
        (a) => a && typeof a.field == "string" && typeof a.value == "string" && ["eq", "ne", "contains", "exists", "gt", "lt"].includes(a.op)
      ))
        throw Error("Некорректная выборка.");
      n.modelsMode ??= n.models.length ? "selected" : "all", n.models = n.models.filter((a) => !s(a)), n.conditions = [], n.mode = "all";
    }
    for (const n of r.results) {
      if (n?.image !== void 0 && !Ne(n.image))
        throw Error("Некорректный снимок результата.");
      if (n?.imageScope !== void 0 && n.imageScope !== "pair" && n.imageScope !== "pair-ab")
        throw Error("Некорректный состав снимка результата.");
      if (n?.imageDistance !== void 0 && (!Number.isFinite(n.imageDistance) || n.imageDistance < 0.5))
        throw Error("Некорректная дистанция снимка результата.");
      if (n?.unmeasured !== void 0 && typeof n.unmeasured != "boolean")
        throw Error("Некорректный признак измеримости результата.");
      if (!n || typeof n.id != "string" || !Object.hasOwn(we, n.state) || n.penetrationMm !== void 0 && (!Number.isFinite(n.penetrationMm) || n.penetrationMm < 0) || !Array.isArray(n.point) || n.point.length !== 3 || !n.point.every(Number.isFinite))
        throw Error("Некорректный результат.");
      for (const a of [n.a, n.b])
        if (!a || !["id", "name", "model", "modelId", "guid"].every(
          (p) => typeof a[p] == "string"
        ) || !a.properties || typeof a.properties != "object")
          throw Error("Некорректный элемент результата.");
    }
  }
  return e;
}
const X = (t, e) => [t[0] - e[0], t[1] - e[1], t[2] - e[2]], Ye = (t, e, i = 1) => [
  t[0] + e[0] * i,
  t[1] + e[1] * i,
  t[2] + e[2] * i
], fe = (t, e) => t[0] * e[0] + t[1] * e[1] + t[2] * e[2], je = (t, e) => [
  t[1] * e[2] - t[2] * e[1],
  t[2] * e[0] - t[0] * e[2],
  t[0] * e[1] - t[1] * e[0]
], ce = (t) => Math.hypot(...t), ft = (t) => {
  const e = ce(t);
  return e > 1e-20 ? [t[0] / e, t[1] / e, t[2] / e] : void 0;
}, Ie = (t) => t.triangleCount ?? (t.indices ? t.indices.length / 3 : t.triangles.length / 9), ge = (t, e, i) => t.indices && t.vertices ? t.vertices[t.indices[e * 3 + Math.floor(i / 3)] * 3 + i % 3] : t.triangles[e * 9 + i], Se = (t, e) => [0, 3, 6].map((i) => [
  ge(t, e, i),
  ge(t, e, i + 1),
  ge(t, e, i + 2)
]);
function Oe(t) {
  const e = [1 / 0, 1 / 0, 1 / 0], i = [-1 / 0, -1 / 0, -1 / 0];
  for (let s = 0; s < t.length; s++) {
    const r = s % 3;
    e[r] = Math.min(e[r], t[s]), i[r] = Math.max(i[r], t[s]);
  }
  return { min: e, max: i };
}
const $e = (t, e, i) => t.min.every((s, r) => s <= e.max[r] + i && t.max[r] >= e.min[r] - i);
function Re(t, e) {
  const i = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const p of e)
    for (let h = 0; h < 9; h++) {
      const x = h % 3, m = ge(t, p, h);
      i.min[x] = Math.min(i.min[x], m), i.max[x] = Math.max(i.max[x], m);
    }
  if (e.length <= 12) return { ...i, ids: e };
  const s = i.max.map((p, h) => p - i.min[h]), r = s.indexOf(Math.max(...s)), n = (p) => ge(t, p, r) + ge(t, p, r + 3) + ge(t, p, r + 6);
  e.sort((p, h) => n(p) - n(h));
  const a = e.length >> 1;
  return {
    ...i,
    left: Re(t, e.slice(0, a)),
    right: Re(t, e.slice(a))
  };
}
function* Ee(t, e, i) {
  $e(t, e, i) && (t.ids ? yield* t.ids : (yield* Ee(t.left, e, i), yield* Ee(t.right, e, i)));
}
function* ye(t, e, i) {
  if ($e(t, e, i)) {
    if (t.ids && e.ids) {
      for (const s of t.ids) for (const r of e.ids) yield [s, r];
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
function Fe(t, e) {
  const i = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const a of e)
    for (let p = 0; p < 3; p++)
      i.min[p] = Math.min(i.min[p], t[a].bounds.min[p]), i.max[p] = Math.max(i.max[p], t[a].bounds.max[p]);
  if (e.length <= 16) return { ...i, ids: e };
  const s = i.max.map((a, p) => a - i.min[p]), r = s.indexOf(Math.max(...s));
  e.sort(
    (a, p) => t[a].bounds.min[r] + t[a].bounds.max[r] - (t[p].bounds.min[r] + t[p].bounds.max[r])
  );
  const n = e.length >> 1;
  return {
    ...i,
    left: Fe(t, e.slice(0, n)),
    right: Fe(t, e.slice(n))
  };
}
function Ue(t, e, i, s) {
  const r = X(e, t), n = X(i[1], i[0]), a = X(i[2], i[0]), p = je(r, a), h = fe(n, p);
  if (Math.abs(h) <= 1e-12 * ce(r) * ce(n) * ce(a)) return;
  const x = 1 / h, m = X(t, i[0]), b = fe(m, p) * x, M = je(m, n), j = fe(r, M) * x, O = fe(a, M) * x, k = s / Math.max(ce(n), ce(a), s);
  if (b >= -k && j >= -k && b + j <= 1 + k && O >= -k && O <= 1 + k)
    return Ye(t, r, Math.max(0, Math.min(1, O)));
}
function ht(t, e, i, s) {
  const r = i.map(Math.abs).indexOf(Math.max(...i.map(Math.abs))), n = [0, 1, 2].filter((h) => h !== r), a = (h, x, m) => (x[n[0]] - h[n[0]]) * (m[n[1]] - h[n[1]]) - (x[n[1]] - h[n[1]]) * (m[n[0]] - h[n[0]]), p = (h, x) => {
    const m = x.map((b, M) => a(b, x[(M + 1) % 3], h));
    return m.every((b) => b >= -s * ce(i)) || m.every((b) => b <= s * ce(i));
  };
  for (const h of t) if (p(h, e)) return h;
  for (const h of e) if (p(h, t)) return h;
  for (let h = 0; h < 3; h++)
    for (let x = 0; x < 3; x++) {
      const m = t[h], b = t[(h + 1) % 3], M = e[x], j = e[(x + 1) % 3], O = X(b, m), k = X(j, M), A = O[n[0]] * k[n[1]] - O[n[1]] * k[n[0]];
      if (Math.abs(A) < 1e-18) continue;
      const C = X(M, m), G = (C[n[0]] * k[n[1]] - C[n[1]] * k[n[0]]) / A, $ = (C[n[0]] * O[n[1]] - C[n[1]] * O[n[0]]) / A;
      if (G >= 0 && G <= 1 && $ >= 0 && $ <= 1) return Ye(m, O, G);
    }
}
function gt(t, e, i, s) {
  const r = je(X(t[1], t[0]), X(t[2], t[0])), n = je(X(e[1], e[0]), X(e[2], e[0])), a = ce(r), p = ce(n);
  if (a < 1e-20 || p < 1e-20) return;
  const h = e.map((m) => fe(X(m, t[0]), r) / a), x = t.map((m) => fe(X(m, e[0]), n) / p);
  if (!(h.every((m) => m > i) || h.every((m) => m < -i) || x.every((m) => m > i) || x.every((m) => m < -i))) {
    if (h.every((m) => Math.abs(m) <= i) && x.every((m) => Math.abs(m) <= i))
      return s ? ht(t, e, r, i) : void 0;
    if (!(!s && (!(Math.min(...h) < -i && Math.max(...h) > i) || !(Math.min(...x) < -i && Math.max(...x) > i))))
      for (let m = 0; m < 3; m++) {
        const b = Ue(t[m], t[(m + 1) % 3], e, i);
        if (b) return b;
        const M = Ue(e[m], e[(m + 1) % 3], t, i);
        if (M) return M;
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
    const i = ft(je(X(e[1], e[0]), X(e[2], e[0])));
    if (!i) return;
    const r = i[0] < -1e-9 || Math.abs(i[0]) <= 1e-9 && (i[1] < -1e-9 || Math.abs(i[1]) <= 1e-9 && i[2] < 0) ? [-i[0], -i[1], -i[2]] : [i[0], i[1], i[2]], n = this.key(r);
    for (this.items.has(n) || this.items.set(n, r); this.items.size > 512 && this.step > 10; ) {
      this.step /= 10;
      const a = /* @__PURE__ */ new Map();
      for (const p of this.items.values()) {
        const h = this.key(p);
        a.has(h) || a.set(h, p);
      }
      this.items = a;
    }
  }
  addFrom(e, i) {
    for (const s of i) this.add(Se(e, s));
  }
  values() {
    return [
      ...this.world,
      ...[...this.items].sort((e, i) => e[0] < i[0] ? -1 : 1).map(([, e]) => e)
    ];
  }
}
function bt(t, e, i, s, r, n, a, p, h) {
  const x = (k) => {
    let A = 1 / 0, C = -1 / 0;
    for (let G = 0; G < 8; G++) {
      const $ = (G & 1 ? n.max[0] : n.min[0]) * k[0] + (G & 2 ? n.max[1] : n.min[1]) * k[1] + (G & 4 ? n.max[2] : n.min[2]) * k[2];
      $ < A && (A = $), $ > C && (C = $);
    }
    return [A, C];
  }, m = (k, A, C, G, $) => {
    let D = 1 / 0, N = -1 / 0;
    for (const u of A) {
      let Q = 1 / 0, v = -1 / 0;
      for (let I = 0; I < 9; I += 3) {
        const Y = ge(k, u, I) * C[0] + ge(k, u, I + 1) * C[1] + ge(k, u, I + 2) * C[2];
        Y < Q && (Q = Y), Y > v && (v = Y);
      }
      v < G || Q > $ || (Q < G && (Q = G), v > $ && (v = $), Q < D && (D = Q), v > N && (N = v));
    }
    return D === 1 / 0 ? void 0 : [D, N];
  };
  if (n.min.some((k, A) => n.max[A] - k <= 0)) return 0;
  const b = i.length + s.length > 4096 ? r.slice(0, 16) : r, M = (k, A, C, G, $) => {
    const D = [...p];
    if (!A)
      return D[C] = (G + $) / 2, h(k, D) ? [G, $] : void 0;
    let [N, u] = A;
    return N > G && (D[C] = (G + N) / 2, h(k, D) && (N = G)), u < $ && (D[C] = (u + $) / 2, h(k, D) && (u = $)), [N, u];
  };
  let j = 1 / 0, O = !1;
  for (let k = 0; k < b.length; k++) {
    const A = b[k], [C, G] = x(A), $ = k < 3, D = $ && a[k] || [[C, G]];
    let N = 0;
    for (const [u, Q] of D) {
      let v = m(t, i, A, u, Q), I = m(e, s, A, u, Q);
      if ($ && (v = M(0, v, k, u, Q), I = M(1, I, k, u, Q)), !v || !I) continue;
      const Y = Math.min(v[1], I[1]) - Math.max(v[0], I[0]);
      Y > N && (N = Y);
    }
    N <= 0 || (O = !0, N < j && (j = N));
  }
  return O && Number.isFinite(j) ? j : 0;
}
const Te = (t, e) => t.bounds.min.some((i, s) => t.bounds.max[s] - i <= e);
function yt(t, e, i) {
  const s = X(e[1], e[0]), r = X(e[2], e[0]), n = je(s, r), a = ce(n);
  if (a < 1e-20 || Math.abs(fe(X(t, e[0]), n)) / a > i) return !1;
  const p = X(t, e[0]), h = fe(s, s), x = fe(s, r), m = fe(r, r), b = fe(p, s), M = fe(p, r), j = h * m - x * x;
  if (Math.abs(j) < 1e-30) return !1;
  const O = (b * m - M * x) / j, k = (M * h - b * x) / j, A = i / Math.max(ce(s), ce(r), i);
  return O >= -A && k >= -A && O + k <= 1 + A;
}
function Ae(t, e, i, s) {
  if (!e.closed || t.some((b, M) => b <= e.bounds.min[M] + s || b >= e.bounds.max[M] - s))
    return !1;
  for (const b of Ee(i, { min: t, max: t }, s))
    if (yt(t, Se(e, b), s)) return !1;
  const r = [1, 0.371390676, 0.52999894], n = ce(X(e.bounds.max, e.bounds.min)) * 3 + 1, a = Ye(t, r, n), p = [], h = Oe([...t, ...a]);
  for (const b of Ee(i, h, s)) {
    const M = Ue(t, a, Se(e, b), s);
    if (M) {
      const j = ce(X(M, t));
      j > s && p.push(j);
    }
  }
  p.sort((b, M) => b - M);
  let x = 0, m = -1 / 0;
  for (const b of p)
    b - m > s * 2 && (x++, m = b);
  return x % 2 === 1;
}
async function wt(t, e, i, s, r) {
  const n = e.precision / 1e3;
  if (!Number.isFinite(n) || n <= 0)
    throw Error("Точность расчёта должна быть положительным числом.");
  const a = t.filter((v) => e.includeHidden || !v.hidden), p = a.filter((v) => Ce(v, e.a)), h = a.filter((v) => Ce(v, e.b));
  if (!p.length || !h.length)
    throw Error(
      "Выборка А или Б не содержит элементов. Отметьте хотя бы одну модель в каждой стороне проверки."
    );
  let x = performance.now();
  const m = async () => {
    if (s())
      throw Error("Расчёт отменён. Предыдущие результаты сохранены.");
    performance.now() - x > 16 && (await new Promise((v) => setTimeout(v, 0)), x = performance.now());
  }, b = /* @__PURE__ */ new Map(), M = (v) => {
    let I = b.get(v.id);
    return I || (I = Re(
      v,
      Array.from({ length: Ie(v) }, (Y, T) => T)
    ), b.set(v.id, I)), I;
  }, j = /* @__PURE__ */ new Map(), O = async (v) => {
    let I = j.get(v.id);
    if (I !== void 0) return I;
    const Y = [];
    for (let T = 0; T < Ie(v); T++)
      Y.push(
        [0, 3, 6].map(
          (xe) => [0, 1, 2].map((U) => Math.round(ge(v, T, xe + U) / n)).join(",")
        ).sort().join(";")
      ), T % 9e3 === 0 && await m();
    return I = Y.sort().join("|"), j.set(v.id, I), I;
  }, k = [], A = new Set(p.map((v) => v.id)), C = new Set(h.map((v) => v.id)), G = Fe(
    h,
    h.map((v, I) => I)
  ), $ = /* @__PURE__ */ new Map();
  let D = 0;
  const N = (v) => v.triangles.byteLength + (v.vertices?.byteLength || 0) + (v.indices?.byteLength || 0) + Ie(v) * 32;
  async function u(v, I) {
    if (!r) return v;
    let Y = $.get(v.id);
    if (Y)
      return $.delete(v.id), $.set(v.id, Y), Y;
    for (const [T, xe] of $)
      T !== I && D > 96 * 1024 * 1024 && ($.delete(T), D -= N(xe), b.delete(T), j.delete(T));
    return Y = await r(v.id), $.set(v.id, Y), D += N(Y), Y;
  }
  let Q = -1 / 0;
  for (let v = 0; v < p.length; v++) {
    const I = p[v];
    performance.now() - Q > 150 && (Q = performance.now(), i({
      phase: "Проверка пар",
      done: v,
      total: p.length,
      found: k.length
    }));
    const Y = [...Ee(G, I.bounds, n)];
    for (let T = 0; T < Y.length; T++) {
      const xe = Y[T];
      performance.now() - Q > 150 && (Q = performance.now(), i({
        phase: `Проверка пар · A ${v + 1}/${p.length} · кандидаты ${T + 1}/${Y.length}`,
        done: v,
        total: p.length,
        found: k.length
      }));
      const U = h[xe];
      if (await m(), I.id === U.id || !$e(I.bounds, U.bounds, n) || e.ignoreSameModel && I.modelId === U.modelId || e.ignoreSameGroup && I.modelId === U.modelId && I.properties.Объект && I.properties.Объект === U.properties.Объект || e.equalProperty && I.properties[e.equalProperty] !== void 0 && I.properties[e.equalProperty] === U.properties[e.equalProperty] || I.id > U.id && A.has(U.id) && C.has(I.id)) continue;
      const ve = ut(I.id, U.id), E = await u(I), P = await u(U, I.id);
      let J, W = "surface", _ = 0, ne = !1;
      if (e.type === "duplicates") {
        if (Ie(E) !== Ie(P) || E.bounds.min.some(
          (R, oe) => Math.abs(R - P.bounds.min[oe]) > n || Math.abs(E.bounds.max[oe] - P.bounds.max[oe]) > n
        ))
          continue;
        await O(E) === await O(P) && (J = E.bounds.min.map((R, oe) => (R + E.bounds.max[oe]) / 2), W = "duplicate");
      } else {
        const R = M(E), oe = M(P), H = {
          min: E.bounds.min.map(
            (Z, q) => Math.max(Z, P.bounds.min[q])
          ),
          max: E.bounds.max.map(
            (Z, q) => Math.min(Z, P.bounds.max[q])
          )
        }, me = H.min.map(
          (Z, q) => (Z + H.max[q]) / 2
        ), pe = new xt(), ee = [];
        let be = 1, he = 0, ke = 1 / 0, ue = 0;
        for (const [Z, q] of ye(R, oe, n)) {
          const ae = Se(E, Z), se = Se(P, q);
          if (!$e(Oe(ae.flat()), Oe(se.flat()), n)) continue;
          const L = gt(ae, se, n, e.touching);
          if (L) {
            const B = ce(X(L, me));
            if ((!J || B < ke) && (J = L, ke = B), pe.add(ae), pe.add(se), he++ % be === 0 && (ee.push(L), ee.length >= 8192)) {
              for (let V = 0; V * 2 < ee.length; V++) ee[V] = ee[V * 2];
              ee.length = Math.ceil(ee.length / 2), be *= 2;
            }
          }
          ++ue % 256 === 0 && (performance.now() - Q > 150 && (Q = performance.now(), i({
            phase: `Геометрия пары · A ${v + 1}/${p.length}`,
            done: v,
            total: p.length,
            found: k.length
          })), await m());
        }
        if (!J && E.closed && P.closed) {
          const Z = E.bounds.min.map(
            (q, ae) => (q + E.bounds.max[ae]) / 2
          );
          Ae(Z, E, R, n) && Ae(Z, P, oe, n) && (J = Z, W = "contained");
        }
        if (!J) {
          for (const [Z, q, ae] of [
            [E, P, oe],
            [P, E, R]
          ])
            if (q.closed) {
              for (let se = 0; se < Ie(Z) && !J; se++) {
                const L = Se(Z, se), B = L[0].map(
                  (V, re) => (L[0][re] + L[1][re] + L[2][re]) / 3
                );
                for (const V of [L[0], B])
                  if (Ae(V, q, ae, n)) {
                    J = V, W = "contained";
                    break;
                  }
                await m();
              }
              if (J) break;
            }
        }
        if (J) {
          const Z = (le, de) => [...Ee(de, H, n)].filter(
            (o) => $e(Oe(Se(le, o).flat()), H, n)
          ), q = Z(E, R), ae = Z(P, oe);
          W !== "surface" && (pe.addFrom(E, q), pe.addFrom(P, ae)), await m();
          const se = H.min.map(
            (le, de) => (le + H.max[de]) / 2
          ), L = (le, de) => le === 0 ? Ae(de, E, R, n) : Ae(de, P, oe, n), B = [se];
          ee.length && B.push([0, 1, 2].map(
            (le) => ee.reduce((de, o) => de + o[le], 0) / ee.length
          ));
          const V = [0, 1, 2].map((le) => {
            if (!E.closed || !P.closed || ee.length < 2) return;
            const de = ee.map((y) => y[le]).sort((y, g) => y - g), o = Math.max(n * 10, (H.max[le] - H.min[le]) / 50), l = [];
            for (let y = 1; y < de.length; y++)
              de[y] - de[y - 1] > o && l.push([de[y - 1], de[y]]);
            l.sort((y, g) => g[1] - g[0] - (y[1] - y[0]));
            const d = [];
            for (const [y, g] of l.slice(0, 4)) {
              const w = (y + g) / 2;
              B.every((z) => {
                const F = [...z];
                return F[le] = w, !L(0, F) || !L(1, F);
              }) && d.push(w);
            }
            if (!d.length) return;
            d.sort((y, g) => y - g);
            const c = [];
            let f = H.min[le];
            for (const y of d)
              c.push([f, y]), f = y;
            return c.push([f, H.max[le]]), c;
          });
          await m();
          const re = bt(
            E,
            P,
            q,
            ae,
            pe.values(),
            H,
            V,
            se,
            L
          ) * 1e3;
          if (Te(E, n) || Te(P, n)) ne = !0;
          else if (re <= 0 && !e.touching) continue;
          _ = ne ? 0 : e.touching ? re : Math.max(e.precision, re), await m();
        }
        if (J && !ne && _ + e.precision < e.minPenetration)
          continue;
      }
      if (J && (k.push({
        id: ve,
        a: Qe(E),
        b: Qe(P),
        point: J,
        kind: W,
        state: "new",
        note: "",
        assignee: "",
        firstSeen: "",
        lastSeen: "",
        penetrationMm: _,
        ...ne ? { unmeasured: !0 } : {}
      }), k.length >= 5e4))
        throw Error(
          "Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат."
        );
    }
  }
  return i({
    phase: "Готово",
    done: p.length,
    total: p.length,
    found: k.length
  }), k;
}
const it = '(function(){"use strict";const vt=({triangles:n,vertices:t,indices:i,triangleCount:f,closed:c,bounds:e,...u})=>u;function bt(n,t){return t.exclude.includes(n.id)?!1:t.include.includes(n.id)?!0:!(t.manualOnly||t.modelsMode==="selected"&&!t.models.includes(n.modelId)||t.modelsMode===void 0&&t.models.length&&!t.models.includes(n.modelId))}const St=(n,t)=>JSON.stringify([n,t].sort()),I=(n,t)=>[n[0]-t[0],n[1]-t[1],n[2]-t[2]],ut=(n,t,i=1)=>[n[0]+t[0]*i,n[1]+t[1]*i,n[2]+t[2]*i],G=(n,t)=>n[0]*t[0]+n[1]*t[1]+n[2]*t[2],tt=(n,t)=>[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]],O=n=>Math.hypot(...n),Et=n=>{const t=O(n);return t>1e-20?[n[0]/t,n[1]/t,n[2]/t]:void 0},nt=n=>n.triangleCount??(n.indices?n.indices.length/3:n.triangles.length/9),K=(n,t,i)=>n.indices&&n.vertices?n.vertices[n.indices[t*3+Math.floor(i/3)]*3+i%3]:n.triangles[t*9+i],Y=(n,t)=>[0,3,6].map(i=>[K(n,t,i),K(n,t,i+1),K(n,t,i+2)]);function ct(n){const t=[1/0,1/0,1/0],i=[-1/0,-1/0,-1/0];for(let f=0;f<n.length;f++){const c=f%3;t[c]=Math.min(t[c],n[f]),i[c]=Math.max(i[c],n[f])}return{min:t,max:i}}const et=(n,t,i)=>n.min.every((f,c)=>f<=t.max[c]+i&&n.max[c]>=t.min[c]-i);function mt(n,t){const i={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const o of t)for(let r=0;r<9;r++){const m=r%3,a=K(n,o,r);i.min[m]=Math.min(i.min[m],a),i.max[m]=Math.max(i.max[m],a)}if(t.length<=12)return{...i,ids:t};const f=i.max.map((o,r)=>o-i.min[r]),c=f.indexOf(Math.max(...f)),e=o=>K(n,o,c)+K(n,o,c+3)+K(n,o,c+6);t.sort((o,r)=>e(o)-e(r));const u=t.length>>1;return{...i,left:mt(n,t.slice(0,u)),right:mt(n,t.slice(u))}}function*it(n,t,i){et(n,t,i)&&(n.ids?yield*n.ids:(yield*it(n.left,t,i),yield*it(n.right,t,i)))}function*V(n,t,i){if(et(n,t,i)){if(n.ids&&t.ids){for(const f of n.ids)for(const c of t.ids)yield[f,c];return}if(n.ids){yield*V(n,t.left,i),yield*V(n,t.right,i);return}if(t.ids){yield*V(n.left,t,i),yield*V(n.right,t,i);return}yield*V(n.left,t.left,i),yield*V(n.left,t.right,i),yield*V(n.right,t.left,i),yield*V(n.right,t.right,i)}}function ht(n,t){const i={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const u of t)for(let o=0;o<3;o++)i.min[o]=Math.min(i.min[o],n[u].bounds.min[o]),i.max[o]=Math.max(i.max[o],n[u].bounds.max[o]);if(t.length<=16)return{...i,ids:t};const f=i.max.map((u,o)=>u-i.min[o]),c=f.indexOf(Math.max(...f));t.sort((u,o)=>n[u].bounds.min[c]+n[u].bounds.max[c]-(n[o].bounds.min[c]+n[o].bounds.max[c]));const e=t.length>>1;return{...i,left:ht(n,t.slice(0,e)),right:ht(n,t.slice(e))}}function gt(n,t,i,f){const c=I(t,n),e=I(i[1],i[0]),u=I(i[2],i[0]),o=tt(c,u),r=G(e,o);if(Math.abs(r)<=1e-12*O(c)*O(e)*O(u))return;const m=1/r,a=I(n,i[0]),h=G(a,o)*m,g=tt(a,e),v=G(c,g)*m,j=G(u,g)*m,l=f/Math.max(O(e),O(u),f);if(h>=-l&&v>=-l&&h+v<=1+l&&j>=-l&&j<=1+l)return ut(n,c,Math.max(0,Math.min(1,j)))}function Ft(n,t,i,f){const c=i.map(Math.abs).indexOf(Math.max(...i.map(Math.abs))),e=[0,1,2].filter(r=>r!==c),u=(r,m,a)=>(m[e[0]]-r[e[0]])*(a[e[1]]-r[e[1]])-(m[e[1]]-r[e[1]])*(a[e[0]]-r[e[0]]),o=(r,m)=>{const a=m.map((h,g)=>u(h,m[(g+1)%3],r));return a.every(h=>h>=-f*O(i))||a.every(h=>h<=f*O(i))};for(const r of n)if(o(r,t))return r;for(const r of t)if(o(r,n))return r;for(let r=0;r<3;r++)for(let m=0;m<3;m++){const a=n[r],h=n[(r+1)%3],g=t[m],v=t[(m+1)%3],j=I(h,a),l=I(v,g),x=j[e[0]]*l[e[1]]-j[e[1]]*l[e[0]];if(Math.abs(x)<1e-18)continue;const b=I(g,a),p=(b[e[0]]*l[e[1]]-b[e[1]]*l[e[0]])/x,y=(b[e[0]]*j[e[1]]-b[e[1]]*j[e[0]])/x;if(p>=0&&p<=1&&y>=0&&y<=1)return ut(a,j,p)}}function Ot(n,t,i,f){const c=tt(I(n[1],n[0]),I(n[2],n[0])),e=tt(I(t[1],t[0]),I(t[2],t[0])),u=O(c),o=O(e);if(u<1e-20||o<1e-20)return;const r=t.map(a=>G(I(a,n[0]),c)/u),m=n.map(a=>G(I(a,t[0]),e)/o);if(!(r.every(a=>a>i)||r.every(a=>a<-i)||m.every(a=>a>i)||m.every(a=>a<-i))){if(r.every(a=>Math.abs(a)<=i)&&m.every(a=>Math.abs(a)<=i))return f?Ft(n,t,c,i):void 0;if(!(!f&&(!(Math.min(...r)<-i&&Math.max(...r)>i)||!(Math.min(...m)<-i&&Math.max(...m)>i))))for(let a=0;a<3;a++){const h=gt(n[a],n[(a+1)%3],t,i);if(h)return h;const g=gt(t[a],t[(a+1)%3],n,i);if(g)return g}}}class Tt{world=[[1,0,0],[0,1,0],[0,0,1]];items=new Map;step=1e4;key(t){return t.map(i=>Math.round(i*this.step)).join(",")}add(t){const i=Et(tt(I(t[1],t[0]),I(t[2],t[0])));if(!i)return;const c=i[0]<-1e-9||Math.abs(i[0])<=1e-9&&(i[1]<-1e-9||Math.abs(i[1])<=1e-9&&i[2]<0)?[-i[0],-i[1],-i[2]]:[i[0],i[1],i[2]],e=this.key(c);for(this.items.has(e)||this.items.set(e,c);this.items.size>512&&this.step>10;){this.step/=10;const u=new Map;for(const o of this.items.values()){const r=this.key(o);u.has(r)||u.set(r,o)}this.items=u}}addFrom(t,i){for(const f of i)this.add(Y(t,f))}values(){return[...this.world,...[...this.items].sort((t,i)=>t[0]<i[0]?-1:1).map(([,t])=>t)]}}function $t(n,t,i,f,c,e,u,o,r){const m=l=>{let x=1/0,b=-1/0;for(let p=0;p<8;p++){const y=(p&1?e.max[0]:e.min[0])*l[0]+(p&2?e.max[1]:e.min[1])*l[1]+(p&4?e.max[2]:e.min[2])*l[2];y<x&&(x=y),y>b&&(b=y)}return[x,b]},a=(l,x,b,p,y)=>{let S=1/0,E=-1/0;for(const T of x){let _=1/0,s=-1/0;for(let d=0;d<9;d+=3){const M=K(l,T,d)*b[0]+K(l,T,d+1)*b[1]+K(l,T,d+2)*b[2];M<_&&(_=M),M>s&&(s=M)}s<p||_>y||(_<p&&(_=p),s>y&&(s=y),_<S&&(S=_),s>E&&(E=s))}return S===1/0?void 0:[S,E]};if(e.min.some((l,x)=>e.max[x]-l<=0))return 0;const h=i.length+f.length>4096?c.slice(0,16):c,g=(l,x,b,p,y)=>{const S=[...o];if(!x)return S[b]=(p+y)/2,r(l,S)?[p,y]:void 0;let[E,T]=x;return E>p&&(S[b]=(p+E)/2,r(l,S)&&(E=p)),T<y&&(S[b]=(T+y)/2,r(l,S)&&(T=y)),[E,T]};let v=1/0,j=!1;for(let l=0;l<h.length;l++){const x=h[l],[b,p]=m(x),y=l<3,S=y&&u[l]||[[b,p]];let E=0;for(const[T,_]of S){let s=a(n,i,x,T,_),d=a(t,f,x,T,_);if(y&&(s=g(0,s,l,T,_),d=g(1,d,l,T,_)),!s||!d)continue;const M=Math.min(s[1],d[1])-Math.max(s[0],d[0]);M>E&&(E=M)}E<=0||(j=!0,E<v&&(v=E))}return j&&Number.isFinite(v)?v:0}const qt=(n,t)=>n.bounds.min.some((i,f)=>n.bounds.max[f]-i<=t);function At(n,t,i){const f=I(t[1],t[0]),c=I(t[2],t[0]),e=tt(f,c),u=O(e);if(u<1e-20||Math.abs(G(I(n,t[0]),e))/u>i)return!1;const o=I(n,t[0]),r=G(f,f),m=G(f,c),a=G(c,c),h=G(o,f),g=G(o,c),v=r*a-m*m;if(Math.abs(v)<1e-30)return!1;const j=(h*a-g*m)/v,l=(g*r-h*m)/v,x=i/Math.max(O(f),O(c),i);return j>=-x&&l>=-x&&j+l<=1+x}function ot(n,t,i,f){if(!t.closed||n.some((h,g)=>h<=t.bounds.min[g]+f||h>=t.bounds.max[g]-f))return!1;for(const h of it(i,{min:n,max:n},f))if(At(n,Y(t,h),f))return!1;const c=[1,.371390676,.52999894],e=O(I(t.bounds.max,t.bounds.min))*3+1,u=ut(n,c,e),o=[],r=ct([...n,...u]);for(const h of it(i,r,f)){const g=gt(n,u,Y(t,h),f);if(g){const v=O(I(g,n));v>f&&o.push(v)}}o.sort((h,g)=>h-g);let m=0,a=-1/0;for(const h of o)h-a>f*2&&(m++,a=h);return m%2===1}async function Ct(n,t,i,f,c){const e=t.precision/1e3;if(!Number.isFinite(e)||e<=0)throw Error("Точность расчёта должна быть положительным числом.");const u=n.filter(s=>t.includeHidden||!s.hidden),o=u.filter(s=>bt(s,t.a)),r=u.filter(s=>bt(s,t.b));if(!o.length||!r.length)throw Error("Выборка А или Б не содержит элементов. Отметьте хотя бы одну модель в каждой стороне проверки.");let m=performance.now();const a=async()=>{if(f())throw Error("Расчёт отменён. Предыдущие результаты сохранены.");performance.now()-m>16&&(await new Promise(s=>setTimeout(s,0)),m=performance.now())},h=new Map,g=s=>{let d=h.get(s.id);return d||(d=mt(s,Array.from({length:nt(s)},(M,$)=>$)),h.set(s.id,d)),d},v=new Map,j=async s=>{let d=v.get(s.id);if(d!==void 0)return d;const M=[];for(let $=0;$<nt(s);$++)M.push([0,3,6].map(st=>[0,1,2].map(H=>Math.round(K(s,$,st+H)/e)).join(",")).sort().join(";")),$%9e3===0&&await a();return d=M.sort().join("|"),v.set(s.id,d),d},l=[],x=new Set(o.map(s=>s.id)),b=new Set(r.map(s=>s.id)),p=ht(r,r.map((s,d)=>d)),y=new Map;let S=0;const E=s=>s.triangles.byteLength+(s.vertices?.byteLength||0)+(s.indices?.byteLength||0)+nt(s)*32;async function T(s,d){if(!c)return s;let M=y.get(s.id);if(M)return y.delete(s.id),y.set(s.id,M),M;for(const[$,st]of y)$!==d&&S>96*1024*1024&&(y.delete($),S-=E(st),h.delete($),v.delete($));return M=await c(s.id),y.set(s.id,M),S+=E(M),M}let _=-1/0;for(let s=0;s<o.length;s++){const d=o[s];performance.now()-_>150&&(_=performance.now(),i({phase:"Проверка пар",done:s,total:o.length,found:l.length}));const M=[...it(p,d.bounds,e)];for(let $=0;$<M.length;$++){const st=M[$];performance.now()-_>150&&(_=performance.now(),i({phase:`Проверка пар · A ${s+1}/${o.length} · кандидаты ${$+1}/${M.length}`,done:s,total:o.length,found:l.length}));const H=r[st];if(await a(),d.id===H.id||!et(d.bounds,H.bounds,e)||t.ignoreSameModel&&d.modelId===H.modelId||t.ignoreSameGroup&&d.modelId===H.modelId&&d.properties.Объект&&d.properties.Объект===H.properties.Объект||t.equalProperty&&d.properties[t.equalProperty]!==void 0&&d.properties[t.equalProperty]===H.properties[t.equalProperty]||d.id>H.id&&x.has(H.id)&&b.has(d.id))continue;const Nt=St(d.id,H.id),w=await T(d),P=await T(H,d.id);let z,rt="surface",xt=0,lt=!1;if(t.type==="duplicates"){if(nt(w)!==nt(P)||w.bounds.min.some((W,B)=>Math.abs(W-P.bounds.min[B])>e||Math.abs(w.bounds.max[B]-P.bounds.max[B])>e))continue;await j(w)===await j(P)&&(z=w.bounds.min.map((W,B)=>(W+w.bounds.max[B])/2),rt="duplicate")}else{const W=g(w),B=g(P),D={min:w.bounds.min.map((F,A)=>Math.max(F,P.bounds.min[A])),max:w.bounds.max.map((F,A)=>Math.min(F,P.bounds.max[A]))},zt=D.min.map((F,A)=>(F+D.max[A])/2),at=new Tt,J=[];let _t=1,Gt=0,Pt=1/0,Ht=0;for(const[F,A]of V(W,B,e)){const Q=Y(w,F),R=Y(P,A);if(!et(ct(Q.flat()),ct(R.flat()),e))continue;const C=Ot(Q,R,e,t.touching);if(C){const Z=O(I(C,zt));if((!z||Z<Pt)&&(z=C,Pt=Z),at.add(Q),at.add(R),Gt++%_t===0&&(J.push(C),J.length>=8192)){for(let U=0;U*2<J.length;U++)J[U]=J[U*2];J.length=Math.ceil(J.length/2),_t*=2}}++Ht%256===0&&(performance.now()-_>150&&(_=performance.now(),i({phase:`Геометрия пары · A ${s+1}/${o.length}`,done:s,total:o.length,found:l.length})),await a())}if(!z&&w.closed&&P.closed){const F=w.bounds.min.map((A,Q)=>(A+w.bounds.max[Q])/2);ot(F,w,W,e)&&ot(F,P,B,e)&&(z=F,rt="contained")}if(!z){for(const[F,A,Q]of[[w,P,B],[P,w,W]])if(A.closed){for(let R=0;R<nt(F)&&!z;R++){const C=Y(F,R),Z=C[0].map((U,k)=>(C[0][k]+C[1][k]+C[2][k])/3);for(const U of[C[0],Z])if(ot(U,A,Q,e)){z=U,rt="contained";break}await a()}if(z)break}}if(z){const F=(L,N)=>[...it(N,D,e)].filter(ft=>et(ct(Y(L,ft).flat()),D,e)),A=F(w,W),Q=F(P,B);rt!=="surface"&&(at.addFrom(w,A),at.addFrom(P,Q)),await a();const R=D.min.map((L,N)=>(L+D.max[N])/2),C=(L,N)=>L===0?ot(N,w,W,e):ot(N,P,B,e),Z=[R];J.length&&Z.push([0,1,2].map(L=>J.reduce((N,ft)=>N+ft[L],0)/J.length));const U=[0,1,2].map(L=>{if(!w.closed||!P.closed||J.length<2)return;const N=J.map(q=>q[L]).sort((q,X)=>q-X),ft=Math.max(e*10,(D.max[L]-D.min[L])/50),pt=[];for(let q=1;q<N.length;q++)N[q]-N[q-1]>ft&&pt.push([N[q-1],N[q]]);pt.sort((q,X)=>X[1]-X[0]-(q[1]-q[0]));const dt=[];for(const[q,X]of pt.slice(0,4)){const jt=(q+X)/2;Z.every(Jt=>{const It=[...Jt];return It[L]=jt,!C(0,It)||!C(1,It)})&&dt.push(jt)}if(!dt.length)return;dt.sort((q,X)=>q-X);const Mt=[];let wt=D.min[L];for(const q of dt)Mt.push([wt,q]),wt=q;return Mt.push([wt,D.max[L]]),Mt});await a();const k=$t(w,P,A,Q,at.values(),D,U,R,C)*1e3;if(qt(w,e)||qt(P,e))lt=!0;else if(k<=0&&!t.touching)continue;xt=lt?0:t.touching?k:Math.max(t.precision,k),await a()}if(z&&!lt&&xt+t.precision<t.minPenetration)continue}if(z&&(l.push({id:Nt,a:vt(w),b:vt(P),point:z,kind:rt,state:"new",note:"",assignee:"",firstSeen:"",lastSeen:"",penetrationMm:xt,...lt?{unmeasured:!0}:{}}),l.length>=5e4))throw Error("Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат.")}}return i({phase:"Готово",done:o.length,total:o.length,found:l.length}),l}let Lt=0;const yt=new Map;self.onmessage=async n=>{if(n.data.request!==void 0){const t=yt.get(n.data.request);yt.delete(n.data.request),n.data.error?t?.reject(Error(n.data.error)):t?.resolve(n.data.geometry);return}try{const{elements:t,check:i}=n.data,f=await Ct(t,i,c=>self.postMessage({progress:c}),()=>!1,n.data.streaming?c=>new Promise((e,u)=>{const o=Lt++;yt.set(o,{resolve:e,reject:u}),self.postMessage({load:c,request:o})}):void 0);self.postMessage({results:f})}catch(t){self.postMessage({error:t instanceof Error?t.message:String(t)})}}})();\n', Je = typeof self < "u" && self.Blob && new Blob(["(self.URL || self.webkitURL).revokeObjectURL(self.location.href);", it], { type: "text/javascript;charset=utf-8" });
function vt(t) {
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
      "data:text/javascript;charset=utf-8," + encodeURIComponent(it),
      {
        name: t?.name
      }
    );
  }
}
const K = (t) => String(t ?? "").replace(
  /[&<>"']/g,
  (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[e]
);
function Ve(t, e) {
  const i = URL.createObjectURL(
    new Blob([e], {
      type: t.endsWith(".html") ? "text/html;charset=utf-8" : "application/json;charset=utf-8"
    })
  ), s = document.createElement("a");
  s.href = i, s.download = t, s.click(), setTimeout(() => URL.revokeObjectURL(i), 6e4);
}
function kt(t, e) {
  const i = K;
  return `<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${i(t.name)}</title><style>body{font:14px/1.5 system-ui;margin:24px;background:#171c23;color:#e6edf5}h1{margin:0}small{color:#a9b7c8}input,select{padding:10px;margin:15px 8px 15px 0;max-width:100%;background:#242e3b;color:inherit;border:1px solid #506074;border-radius:6px}.wrap{overflow:auto}table{border-collapse:separate;border-spacing:0;width:100%}td,th{padding:10px;border-bottom:1px solid #39475a;min-width:100px;vertical-align:top;overflow-wrap:anywhere}th{background:#253142;position:sticky;top:0;text-align:left;white-space:normal}td{max-width:350px}tr[hidden]{display:none}.shot{display:block;width:260px;border:0;background:transparent;padding:0;cursor:zoom-in}dialog{width:min(94vw,1400px);border:1px solid #506074;background:#20242b;color:white;border-radius:10px}dialog img{max-width:100%;max-height:80vh;display:block;margin:12px auto}dialog::backdrop{background:#000b}.shot img{width:100%;border-radius:6px}.legend{margin:12px 0}.red{color:#ff6161}.blue{color:#65baff}@media print{input,select{display:none}body{background:white;color:black}.wrap{overflow:visible}th{position:static;background:#eee}}</style><h1>${i(t.name)}</h1><small>НашеПО · Проверки коллизий · ${i(t.lastRun || "")} · ${t.status === "stale" ? "Результат устарел" : "Последний завершённый расчёт"}</small><p>${i(t.type === "duplicates" ? "Совпадение треугольной геометрии" : "Пересечения поверхностей и вложенность замкнутых тел")}. Точность: ${i(t.precision)} мм${t.type === "intersection" ? `; минимальная глубина: ${i(t.minPenetration)} мм` : ""}. Глубина Hard Clash — толщина самого сильного из отдельных перекрытий пары, замеренная вдоль граней контакта и осей координат. Значение не зависит от густоты треугольной сетки и от размеров элементов. «Не определена» означает, что у одного из элементов нет собственной толщины: конфликт реален, но объёмный замер к нему неприменим, и порог минимальной глубины на такие строки не действует.</p><p class="legend"><span class="red">● Элемент А выделен красным</span> · <span class="blue">● элемент Б — синим</span></p><input id="search" type="search" placeholder="Поиск по всему отчёту"><select id="state"><option value="">Все состояния</option>${Object.entries(
    we
  ).map(([s, r]) => `<option value="${s}">${r}</option>`).join(
    ""
  )}</select>${t.type === "intersection" ? '<input id="depth" type="number" min="0" step="1" placeholder="Глубина от, мм">' : ""}<span id="count"></span><div class="wrap"><table><thead><tr>${["Снимок", "№", "Состояние", "Глубина, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "X", "Y", "Z", "Назначение", "Комментарий"].map((s) => `<th>${s}</th>`).join("")}</tr></thead><tbody>${e.map((s, r) => `<tr data-state="${s.state}" data-depth="${s.penetrationMm ?? 0}"${s.unmeasured ? ' data-unmeasured="1"' : ""}><td>${Ne(s.image) ? `<button class="shot" type="button"><img src="${s.image}" alt="Снимок конфликта ${r + 1}" loading="lazy"></button>` : "Снимок отсутствует"}</td>${[r + 1, we[s.state], t.type === "duplicates" ? "—" : s.unmeasured ? "не определена" : (s.penetrationMm ?? 0).toFixed(1), s.a.name, s.a.model, s.a.guid, s.b.name, s.b.model, s.b.guid, ...s.point.map((n) => n.toFixed(4)), s.assignee, s.note].map((n) => `<td>${i(n)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><dialog id="picture"><button id="close-picture">Закрыть</button><img id="full-picture" alt="Снимок конфликта"></dialog><script>const modal=document.getElementById("picture");document.getElementById("close-picture").onclick=()=>modal.close();for(const b of document.querySelectorAll(".shot"))b.onclick=()=>{document.getElementById("full-picture").src=b.querySelector("img").src;modal.showModal()};const q=document.getElementById('search'),s=document.getElementById('state'),d=document.getElementById('depth'),rows=[...document.querySelectorAll('tbody tr')];function filter(){let n=0;for(const r of rows){r.hidden=!!((s.value&&r.dataset.state!==s.value)||(d&&!r.dataset.unmeasured&&Number(r.dataset.depth)<Number(d.value||0))||!r.textContent.toLowerCase().includes(q.value.toLowerCase()));if(!r.hidden)n++}document.getElementById('count').textContent='Коллизий: '+n}q.oninput=s.onchange=filter;if(d)d.oninput=filter;filter()<\/script></html>`;
}
function Mt(t, e) {
  return JSON.stringify(
    {
      version: 1,
      id: t.id,
      name: t.name,
      images: Object.fromEntries(
        e.filter((i) => Ne(i.image)).map((i) => [i.id + ".jpg", i.image])
      ),
      warnings: t.warnings,
      tests: [
        {
          id: t.id,
          name: t.name,
          clashes: e.map((i, s) => ({
            id: i.id,
            name: `Конфликт ${s + 1}`,
            distance: t.type === "duplicates" ? "" : i.unmeasured ? "не определена" : `${(i.penetrationMm ?? 0).toFixed(1)} мм`,
            date: t.lastRun || "",
            description: t.type === "duplicates" ? "Дублирование" : "По пересечению",
            status: we[i.state],
            group: i.assignee,
            note: i.note,
            point: i.point,
            image: Ne(i.image) ? i.id + ".jpg" : "",
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
const St = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAydpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAzIDc5Ljk2OTBhODdmYywgMjAyNS8wMy8wNi0yMDo1MDoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDZFQkU2NEQ4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDZFQkU2NEM4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI2LjExIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRENDVBNjQzODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRENDVBNjQ0ODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+pHX+ogAAD+lJREFUeNrsnXtwVPUVx2/CZvMgQEhCSAwJJDzDqwgodCq08hAr7wpSo1M6o/5Rq6NUcdqp1XamdjqOY6mvWhWnttZpRRtbaRGpMMKMZlB8gaFaQoQQSEhIQt7hkfTzhY1ulnt37929mw1T7sxls3vv/f3O7/zO43vO7/wucd3d3calI/zDo3927txpnDx5MqaEpKenpyUlJWUlJCQM6+rqSm1vb/fyGRcfH9+dkpLSGRcX13Lq1Knajo6Omvr6+ia+x4zWtLQ0Y86cOee/SAKLiopiyjwYlz5ixIhyPk8PGDBAKnHB6fF4unU9Ly+vDCanxpLeqVOnnuObznj9kJycHFMGwpRrjh8/Xoh0ec6ePWt6z5kzZwxdr62tLcrPz786lvT68ys+1jYEaTJQx+tRT1v3w0QDabweSe0XNjDmDBwyZEh6U1PTPCfPtLS0LOK5QZcYyDF48OAFjY2N6U6eaWhoyIaBc//vGSg1RIXXSC2dHG1tbYbX610dS08cUwYmJiYa2dnZWRMmTFiO9C0Ipw3UfgnoYfHw4cMzYWZscWAEeChj2LBha8CQm+vq6g6D26xnKj5eWC+dZ67l71VI0dxDhw5lYM/C6vvYsWMZzc3Nm4cOHVo7atSot/Hem6DjzRMnTjQGCw4k9RkZGYWYgGtrampeZCKaIuKgOps+fbrj55AgwYmPkabunJyceqThEaQhT4wKJPiyyy4bx/VHgStVQABTnBfpCdjuhp7D9PMw9BQGemnRBc0FXP8tdDaKbhj/Hn+Pdjr2WbNmfYkDw2IgjJgDMdX+A1DEwG8nUEsNYJTUSp98fzIrK6tF16PBuMBT/cCUk/T7Gz5HiI7c3NwxfN8gxgXSweRWcv3KPmOgQG9mZmaz1QAUScDIhvHjx/8Zgmsx9GExAjXrLigo6Ebrw2YkdBwdN26c6GgKNoGYoXoioblRZyAqsoDOWqMlOVJDbKQY10Zf3VJ3feo7Nuvc92hJsqQWJn7DKQNtOxHEfCZw4xVCqRS3PNigQYMEpCv5/BBJfa+zs3MfElyB1D1RWlp6le45fPiwMXv27D2o4p04ikI+p0D4FTiQaXjw3HCdUOCBQxmMxJZgdubhoPa56kRQ2REw8LAbMy3jjRmoxiY9VVhYuABmDRKs6TnGjBlTTNKg1zP6zu83+sMgVHwwTmAhpuIZJKcWxroiibT1OTRluabCqampKajQO5ESBmCWOn6GF7wLdckyi2WZpALOBrPn9TsGv8AMliA52UzIj5iYA+onUloZ778xJ4muMBD1SoGwzyIhiIE3MMCfgNks01AQrLTa1mDt6LruC5JTHEI/D8ppRELvyJEjPxo4cKDXNScyevTomwPVyq668uxmGDg2VNg1ceLEO0JhRF2HiT8M1o76ob8izMO2cNRajoxnV7rqhZFCL7OyzwkhOIcuIMRPmUk70GgCxrvFTrvc18z940O1iekZgH38JbQ7Vd/3oHmA6zAGSbrJrhTidFox8KsCo5IgA93pZJCo6ds8F28nWQFDbka1OxxI34qo4EBmMgGmfBqKCHCiJGS+HQQgdUN175OqOzUNPLfeTjZG9+C8FsPEdhvS9z7SFx81II0UrglmpyCykxn8tl0IhVmYisFvDxP4tsOYqXb7gjkrMStnrNqDcWe5Z4lTIO0onQWQbfAt+lxwyNYRRfzg4MGDW2wmUhOQpGcBsElhAt8kJvNZtWPn/i+++KIE03K31fqPxqXxRS0bIxVmhj62in9xGE9pfcOu6k6aNOnBSMGvnqedB+wmVpVYgM4XrMJBNOxd7GB0VJhI4HtWtgpV2oskpNhcwjRwGt/CVp5yI3JQO7T3TbVr5wCLDiHaOGDlRGDid1yPhQVjWFa8j1jVbFFI4n8Xeck2q0Qqz3tQ78kQOI+k6yLWNOYQUycYLhxqBwncgj3dRV9bSdRuJ0beS6x81izBS98nsdXr8OL/CIyjtVQAU36MOXqttbW1yzUVxjEs1eyYzRoq8XJgSl2xKjnATKR2Cd7ycWZ1H/any40wK1S4qH7UH/0+pv5Fh3+s3UPf2LFj/2nWhnAjaONq1yRQdo2ZvUWzY5LSbyeNvl5runQcx/ciZk+dL2J2Z2PohyEJfbY+cfr0aYOlhTjOSXydBE13oiG12O5Svm9FqnYgnWWiCfru4fpC/u6lCbpGaH0ra887tJgf8ZoI4p6Lei40U01sz9sQlE9m5A6YOB9mToFpHruL5NE+xAzOYfy5FC1ZygSfAf7sxQa+hfS8zue7e/bsmRuo6jD3OmxlJuahLmIVRtRvCfSWwoL8LuDZKpEPN+scq1P04vTOJWo1jkBs60uffTdiFZaU4SCuC5QoPJ9x5MgRgwqqFOMiPDRwLcZxJgsXajxK3Bp+5SOYLgUEfwlrXRj9V6NDMcSrUdG5JoDa6C+1KYYLi/tmBU2Yo4WMfwVOaYj4EdQGqgHdhN6nq2QCyVuB07imoqIiB8N7wUMwtWvmzJmf7Nq1a1qwteCLgXkzZswo271798TAa0ePHs2BiSX4gCqY+CYOpYTvu6hNbOzFcH1ZsmTJdFz/CyQBjuFF7YDXJmZnFHZix8Vk+wJP6H9r8uTJExTDh7oX3KhEaxWQ7vnly5dP7RWJFBcXb3TSMThpr5A/uTmCkPyai5F5ohu4kqcYnr/LnTy7du3ax3slE3ASmU5EH3Uvl+qyenUYULrWt3Z70RyiV3RXV1dX+szXQSfPo85ZvZwIbj3DSQPcXynQqoPsyxuk0H9mNxaN9SE6off+8vLyN3rANzb/iMPxD+vFQBxFooOHJbp1PQU8mkGY+BA29LX+UG4WCpZBZwn0/qrH+Yl+6K5z0g78SurFQJIEHidE0GFbYBBOjfMtGNj/9mcGApw/h85bTcLSNieT788v1+oDCXvqmc1iDHN7f2Se6BJ9otP1AksM6hm7D0j0Ud9ki6zv+xjoO1Sy0Z8O0SO6oG+PxS0pTjYc+fMr3peO73QSBnFkWon8gQMHngcvPR0MvfflITqg53eiywpMczhyovCroxcDYYpTsc6zYpDi5srKynUY69L+wECl6UWPVYZI40CrRjiMpet6MZDA+YRDHDQaMba0uoQ8HaSEbqKepTqWzKP/Y6IDejqDwJoEoEyBQ6mu/ZKBsmm45d8zU6/QYb2dXUtkKwqxKzlG8FWzg2SxYyqFqFopdFSEsI/5jGdkqLZUk0P+sA6k8VeyOF+aA49gCcXepaRzVpMYzeYmbXpZAVPnEThnmG1BIEk5kFT5FMXcweAOkxNTdI3XTQpVHYEETqMwPcFqSxfOp5Y4eDtjKYFxO5iQ4/zWOxsjQypEXn3+eIkE6ktkZoYTbC/C7W/goaGBuI9n5uNItlp5LxHOtaQY5/2SguE70ci5kLzmBdeI88WodYx/G8C7tify8nM81jhQBhem1ezfv/+PMHKnmSfGDi7TaluIiCUxxgxMDCaB0J+EMCwyzLegbSsrK3sJ4N2LeY422ijMQXS3mC2Ys3Aznhm6KtjsMgBvjBnoDSaBmKz5mKlRZhuBEJAtdrBhyEgED/Yvrb4ZF274k/243aoaIU4LD/1YArUUize93Wy1Ea3T/pttrmz1YiG6kgWY7Rbh2zKytWMtJHBAP5FA07UHnODXUM9rLFT7DSTzuCsM9AHQ58xKa/FeiXT2oJkUQrinPzCQifSYSR8e9hcsTXhM6hXlUJ+zsyZsO5mApG0hjf+Z2TVmsRjoM8dEAj3Yz4RYMpD+TRnI0oX2yS03e4Zxfsh4t7u6WxN70MmsPRJYImGcX2CKg9DHkMTEfiiBqpvxBFRTpCJhG8z2GAr3wfCHwcBnXd/uyoz9CWy03+xaVVXVNLK8v/aPjyEkAcZ6YiyBCaLD8CtTwfY9ypq2aY0149sDDt4Ulf3CkkJm817fqt0FL4SAiXejGsV+EpggCQhn4LJRlGC0UjXwAZ9t4e4Hpn+P6OjBpdB3G8y7zWwpFkfJz13rnUif4/3CEJFkhY0Ea1Dx51ixO0bebQcz73Uigb79xN1AiFIkWXt//654GqNOmD56GZO0GkQwG+8YZ3ct2qfCXl858XU8+6QZbPHdq3fUJEatQpWBeKwqVP1PVKQBqblCZWUA1dOh7tfmQhhUxjrzQwxyurygRf9iwnTdR0Bfps2HNnZ8noaWDLLRc4LtMO05abcUtBEXlQpVBnmD3c3SSNIJOlnvA+BmBd1apD4CM5QFmsd9Xoc75b08N1/Pqx2rYgCkuY2NivfzedIO3WoHIVnsOgMlfajmRw4Xrs8VOxp+WxNwNI3sNHqFoszVwIW0SOtr9LzaUXtqV+37lyHTvzY2Ot1o806oOulwtnrd4HSrvl7VxHPa/dh9+eWXf8zmmJtQp5xovSDC53hy6Odm+lMN4Ln+RYcTuu1IoaNtDkhfMrjpAbOUT4istUFx0jnnAlZMIzHhxcNVR6v4Uu3iIGr14jKcRZr6Vf92IwrjqzVfwZ+fI4Vet7wwzim+wwgPh4l5OvNRrefBWeuQjMcJATeRzWl049V78t6oagZ27gaSv3eCAIoinSTalLTEueaF8agFDP6oG0U9vm38hygPfgQH8HUcQqLd/SX+6oqj0j7muXqZBO1VhbOb1DDfl1yB9851dZsD8W4FkrNKdXJIzsBIZlemgOWDfPDZPYDXe4AjBzD+eyBmN5LzKav+lZz1fO9Ags8qq8OZjASnw7g8PrWUcAUqOhNVLVBI5tZLJBEUacX1aEiV60AaBP8OErOGDv5GB143ymz10kfOMXwdg7Ffo8IfGNSFd21BKmU2ZMA82LEkbNMggWjtVXFq1+wcePM2+l/F5H4QtRfv+HY+Lg2281F5VL0nBmhRohmNZSE5/dcRDpbAnPZghfBoVhNwZ6ERxmtP4p0ymxl6Hc+8DMhQH8hcCG7Gtj2Jqs3gvpVI1Sy+/wEC+2zfg+gQw5jAZ5DkK1lUX4lkzdTLKSRlJgmEGuzyYu7bZvTlq5/oeBqz9h9tgYCZzQDZp/htTCA4loPAfk7h+tMY6Dqne4PtnnIi9FNDP0/QT1Fg5YS+Y2sncP1ZvftGu5owSZ/oFVZGX7/6yfiq0jObmb4XIsaGqoURY2F0Nip1K+cWBtMU6Xu0tP1M0Qftbeb8PhqQFSq6EZ1imujWy9PCGbdrDDQiqxLNo8D7Rql9OMyDCfU8vwqpz+3r6tiYM9BfGrBNr4XDQJ570c47GaLNwJi+wVJwhPNls6UCI0SdCuHlpv6wRyXm71DV+ithWKPDdFYN4eEOw7j0ElrFybUsSDliBjBqGwC86RIDjfPbDLAlr9qNh+UwyOy8avXC7pgw0Gwrf18ebNjZijc+EgoK6TrQqZxyvO2xpNe/5O8cxRs3bjT6cme5yVEHJpzBZzbAPAvpSiW3l+j/nxGA75qZ6OMQf4xYvCnGr67/KvK59N9hRHb8T4ABAPaAkPNeKkdCAAAAAElFTkSuQmCC", It = ":host{display:block;height:100%;color-scheme:dark;font:13px/1.4 Segoe UI,sans-serif;color:#dbe5f0;container-type:size}*{box-sizing:border-box}[hidden]{display:none!important}main{height:100%;min-height:260px;background:#171d25;display:flex;flex-direction:column;overflow:hidden;-webkit-user-select:none;user-select:none}button,input,select,textarea{font:inherit;color:inherit;border:1px solid #425165;border-radius:6px;background:#253140;padding:7px 9px;min-width:0}button{cursor:pointer;white-space:nowrap}button:hover{background:#354459}button:disabled{opacity:.45;cursor:default}.primary{background:#b99a38;border-color:#d0ae46;color:#111820;font-weight:600}.primary:hover{background:#e0bd51}button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid #f2c94c;outline-offset:1px}input,select,textarea{background:#111a24}input,textarea,td,dd{-webkit-user-select:text;user-select:text}input[type=checkbox]{accent-color:#e6c354;width:16px;height:16px}header{display:flex;gap:7px;align-items:center;padding:8px 12px;border-bottom:1px solid #354459;flex-shrink:0;overflow-x:auto}.brand{display:flex;gap:7px;align-items:center;margin-right:8px}.brand img{width:32px;height:32px;object-fit:contain}.brand b{font-size:17px}.brand small{font-size:10px;color:#a6b5c7}#dirty{margin-left:auto;font-size:11px;color:#cabb81;white-space:nowrap}.notice{background:#1c2735;padding:5px 12px;font-size:12px;min-height:27px;max-height:70px;overflow:auto;color:#a7bbd1}.notice.error{color:#ffaaa1;background:#412725}.workspace{display:grid;grid-template-columns:230px minmax(0,1fr);flex:1;min-height:0}aside{padding:10px;display:flex;flex-direction:column;gap:9px;border-right:1px solid #354459;min-height:0}#checks{overflow:auto;flex:1;min-height:0}.check-item{display:flex;flex-direction:column;gap:5px;width:100%;margin-bottom:5px;text-align:left;white-space:normal}.check-item small{color:#a8b7ca}.check-item.active,.tabs .active{border-color:#c7ab56;background:#403b2c;color:#ffe399}.main{display:flex;flex-direction:column;min-width:0;min-height:0}.test-toolbar{display:flex;gap:7px;padding:8px 12px;align-items:center}.test-toolbar input{flex:1;font-weight:600}.tabs{display:flex;gap:7px;border-bottom:1px solid #354459;padding:0 12px 8px}.tabs button{min-width:105px}#content{flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column}.empty{padding:28px;color:#a4b4c9;text-align:center;margin:auto}h2,h3,p{margin:0 0 10px}h2{font-size:20px}h3{font-size:15px}label{display:flex;flex-direction:column;gap:5px;font-size:12px;color:#b8c6d7}.check{flex-direction:row;align-items:center;gap:6px}small{font-size:11px;color:#a8b7c9}.parameters{display:flex;gap:18px;align-items:end;padding:10px 12px}.parameters input{width:140px}.selection-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0 12px 12px}.selection{border:1px solid #39495e;border-radius:8px;padding:12px;background:#1b2633;min-width:0}.selection h3{display:flex;justify-content:space-between}.selection h3 span{color:#92c4b2;font-size:12px}.selection select[multiple]{width:100%;min-height:70px}.selection-tools{display:flex;gap:5px;flex-wrap:wrap;margin:8px 0}.selection-tools button{font-size:11px;padding:5px 7px}.selection>label{margin-bottom:8px}.condition{display:grid;grid-template-columns:minmax(80px,1fr) 100px minmax(70px,1fr) 29px;gap:5px;margin:6px 0}.condition button{padding:3px}.rules,.report{padding:18px;max-width:850px}.rules>label{margin:14px 0}.rules>p,.report>p{color:#a9b8cb}.report>button{margin:12px 8px 14px 0}.result-tools{display:flex;gap:7px;flex-wrap:wrap;padding:8px 12px}.result-tools input{flex:1;min-width:180px}.result-area{display:grid;grid-template-columns:minmax(0,1fr) 300px;flex:1;min-height:0}.table-area{display:flex;flex-direction:column;min-width:0;min-height:0}.scroll{overflow:auto;flex:1;min-height:0}table{border-collapse:separate;border-spacing:0;width:max-content;min-width:100%}th{position:sticky;top:0;background:#2a3748;z-index:1;text-align:left;max-width:240px;white-space:normal}th,td{padding:8px;border-bottom:1px solid #344154;vertical-align:top}td{max-width:320px;min-width:90px;overflow-wrap:anywhere;-webkit-user-select:text;user-select:text}td:first-child{min-width:36px}tr.active td{background:#453e29;color:#fff0b5}tr:hover td{background:#2c3847}.pager{display:flex;gap:10px;align-items:center;justify-content:center;padding:5px;border-top:1px solid #39495e;font-size:11px}.pager button{padding:2px 8px}.detail{border-left:1px solid #354459;padding:10px;overflow:auto}.detail h3{overflow-wrap:anywhere}.detail>label{margin:10px 0}.detail p{font:11px/1.5 Consolas,monospace}.detail details{border-top:1px solid #354459;padding:8px 0}summary{cursor:pointer}dl{font-size:11px;display:grid;grid-template-columns:1fr 1fr;gap:7px}dt,dd{overflow-wrap:anywhere;margin:0}dt{color:#9baec4}footer{border-top:1px solid #354459;padding:4px 12px;display:flex;justify-content:space-between;color:#91a4bb;font-size:11px}dialog{border:1px solid #53647c;border-radius:12px;background:#202c3a;color:#dbe5f0;width:min(700px,92vw);max-height:85vh;padding:20px;box-shadow:0 15px 60px #000a}dialog::backdrop{background:#000a}dialog p{margin:12px 0}dialog a{color:#f2c94c;margin-right:12px}.dialog-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:16px}@container (max-width:950px){.workspace{grid-template-columns:185px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 240px}.selection-grid{grid-template-columns:1fr}.parameters,.test-toolbar{flex-wrap:wrap}.test-toolbar input{flex-basis:100%}}@container (max-height:400px){header{padding:5px 10px}.test-toolbar{padding:5px 10px}.tabs{padding-bottom:5px}.brand img{width:25px;height:25px}footer{display:none}}:host{font-size:12px}.brand img{background:#e1e7ef;border-radius:5px;padding:3px}.selection-tools button{font-size:12px}label{font-size:13px}.choose-layout{display:grid;grid-template-columns:220px minmax(0,1fr);min-height:0;flex:1;overflow:auto}.choose-layout .parameters{display:flex;flex-direction:column;align-items:stretch;gap:15px;border-right:1px solid #354459;justify-content:flex-start}.choose-layout .parameters input{width:100%}.choose-layout .parameters input[type=checkbox]{width:16px}.choose-layout .selection-grid{padding:10px 12px;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start;min-width:0}.selection select[multiple]{height:180px;resize:vertical}.selection-mode{font-size:12px;color:#b6c4d5}.preset-row{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:9px}.preset-row select{flex:1 1 160px}.preset-row button{padding:5px 7px;font-size:12px}.model-list{height:150px;overflow:auto;border:1px solid #425165;border-radius:6px;background:#111a24;padding:5px;margin-bottom:5px}.model-list label{display:flex;flex-direction:row;align-items:center;gap:7px;padding:4px 5px;color:#dbe5f0;overflow-wrap:anywhere}.model-list label:hover{background:#253140}.model-list .model-all{position:sticky;top:-5px;z-index:1;background:#1f2b39;border-bottom:1px solid #425165;font-weight:600}.legend{display:flex;gap:12px;flex-wrap:wrap;font-family:inherit!important}.part-a{color:#ff6161}.part-b{color:#65baff}.preview{display:block;width:100%;padding:5px;margin:8px 0}.preview img{display:block;width:100%;max-height:180px;object-fit:contain}.image-dialog{width:94vw;max-width:1500px}.image-dialog img{display:block;max-width:100%;max-height:75vh;margin:10px auto}#help-dialog{width:min(1000px,94vw);line-height:1.6}#help-dialog details{padding:12px 0;border-bottom:1px solid #425165}#help-dialog summary{font-size:16px;font-weight:600;color:#f0d27a}#help-dialog li{margin:8px 0}@container (max-width:1100px){.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .selection-grid{grid-template-columns:1fr}.condition{grid-template-columns:minmax(60px,1fr) 100px minmax(60px,1fr) 29px}}@container (max-width:700px){.choose-layout{display:block}.choose-layout .parameters{border-right:0;border-bottom:1px solid #354459}.workspace{grid-template-columns:160px minmax(0,1fr)}}button,input,select,textarea{padding:5px 7px;border-radius:5px}button{min-height:27px}input[type=checkbox]{width:14px;height:14px}.commandbar{position:relative;display:flex;gap:8px;min-height:45px;padding:5px 8px;overflow:visible;background:#131b25}.brand{flex:0 0 auto;margin-right:0;gap:5px}.brand img{width:28px;height:28px}.brand b{font-size:14px}.check-heading{display:grid;grid-template-rows:25px 12px;flex:0 1 230px;min-width:145px}.check-heading input{height:25px;border:0;background:transparent;padding:2px 5px;font-weight:600}.check-heading small{padding:0 5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:9px}.tabs{align-self:stretch;align-items:center;flex:0 0 auto;gap:3px;padding:0;border:0}.tabs button{flex:0 0 auto;min-width:0;padding:5px 9px;background:transparent;border-color:transparent}.tabs .active{background:#3e3828;border-color:#b99a38}.header-actions{display:flex;align-items:center;gap:4px;margin-left:auto}#dirty{margin-left:0;width:0;height:0;overflow:visible;font-size:0}#dirty:not(:empty){width:7px;height:7px;border-radius:50%;background:#e5bd43;box-shadow:0 0 0 2px #e5bd4328}.more-menu{position:relative;z-index:20}.more-menu summary{display:grid;place-items:center;width:29px;height:29px;border:1px solid #425165;border-radius:5px;background:#253140;cursor:pointer;list-style:none;font-size:18px}.more-menu summary::-webkit-details-marker{display:none}.more-popover{position:absolute;right:0;top:calc(100% + 5px);display:grid;width:190px;gap:3px;padding:6px;border:1px solid #506176;border-radius:7px;background:#192431;box-shadow:0 12px 35px #000a}.more-popover button{text-align:left}.notice{min-height:23px;max-height:45px;padding:3px 9px;font-size:10px}.run-progress{display:grid;grid-template-columns:minmax(150px,auto) minmax(120px,1fr) auto;align-items:center;gap:8px;min-height:24px;padding:3px 9px;border-bottom:1px solid #425165;background:#202a20;color:#d9e7d2;font-size:10px}.run-bar{width:100%;height:7px;overflow:hidden;border-radius:2px;background:#101810}.run-bar i{display:block;width:0;height:100%;background:#e3bc43}#run-phase,#run-value{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#run-value{text-align:right;color:#b9c9b3}.workspace{grid-template-columns:190px minmax(0,1fr)}aside{gap:6px;padding:7px;background:#141c26}.aside-title{font-weight:600;font-size:12px}.aside-actions{display:grid;gap:5px}.check-item{gap:2px;margin-bottom:3px;padding:6px 7px}.check-item small{font-size:9px}.main{background:#171d25}#content{overflow:hidden}.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .parameters{gap:9px;padding:8px}.choose-layout .selection-grid{gap:8px;padding:8px}.selection{padding:8px}.selection h3,h3{font-size:13px;margin-bottom:6px}label{gap:3px;font-size:11px}small,.selection-tools button,.preset-row button{font-size:10px}.model-list{height:125px}.model-list label{padding:2px 4px}.selection-tools{gap:4px;margin:5px 0}.selection-tools button,.preset-row button{padding:3px 5px;min-height:23px}.result-tools{display:flex;align-items:center;justify-content:space-between;gap:6px;flex-wrap:nowrap;min-height:38px;padding:5px 7px;border-bottom:1px solid #354459;background:#151f2a}.result-filters,.bulk-tools{display:flex;align-items:center;gap:5px;min-width:0}.result-filters{flex:1}.result-filters input[type=search]{flex:1 1 190px;min-width:120px}#result-depth{flex:0 1 125px;min-width:92px}#result-count,#selection-count{color:#9fb0c4;white-space:nowrap;font-size:10px}.bulk-tools select{max-width:125px}.result-area{grid-template-columns:minmax(0,1fr) 310px}th,td{padding:5px 6px;font-size:11px;line-height:1.25}th{max-width:190px}td{max-width:260px;min-width:76px}.pager{justify-content:flex-end;min-height:29px;padding:3px 7px}.pager #selection-count{margin-right:auto}.detail{display:flex;flex-direction:column;min-width:0;padding:0;overflow:hidden;background:#141e29}.detail-head{display:flex;align-items:center;justify-content:space-between;gap:6px;min-height:47px;padding:7px 8px 4px}.detail-head>div:first-child{min-width:0}.detail-head small{color:#8093aa;letter-spacing:.08em}.detail-head h3{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin:0}.detail-nav{display:flex;gap:3px}.detail-nav button{min-width:27px;padding:2px 7px;font-size:17px}.clash-summary{display:flex;gap:5px;padding:0 8px 5px;color:#adbdcf;font-size:9px}.clash-summary span{padding-right:5px;border-right:1px solid #405064}.clash-summary span:last-child{border:0}.detail .legend{margin:0;padding:0 8px 5px;font-size:10px}.preview-slot{height:clamp(92px,18cqh,145px);flex:0 0 auto;margin:0 7px 6px;overflow:hidden;border:1px solid #37475b;border-radius:6px;background:#0e151d}.preview{position:relative;width:100%;height:100%;margin:0;padding:0;border:0;background:transparent}.preview img{width:100%;height:100%;max-height:none;object-fit:contain}.preview span{position:absolute;right:5px;bottom:5px;padding:3px 6px;border-radius:4px;background:#101923db;font-size:9px}.preview-empty,.detail-empty{height:100%;display:grid;place-content:center;justify-items:center;gap:4px;color:#788ba1}.preview-empty>span,.detail-empty>span{font-size:24px}.detail-actions{display:grid;grid-template-columns:1fr 1fr;gap:5px;padding:0 7px 7px}.detail-scroll{flex:1;min-height:0;overflow:auto;padding:7px 8px 12px;border-top:1px solid #354459}.detail-scroll>label{margin:7px 0}.detail p{font:inherit}.coordinates{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;font:9px/1.3 Consolas,monospace;color:#91a3b7}.coordinates span{overflow:hidden;text-overflow:ellipsis}.detail details{padding:6px 0}.detail dl{font-size:10px}.detail-empty{padding:20px;text-align:center}footer{padding:2px 8px;font-size:9px}@container (max-width:1050px){.workspace{grid-template-columns:165px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 270px}.check-heading{flex-basis:185px}.tabs button{padding-inline:6px}#dirty{display:none}}@container (max-width:820px){.brand b,.brand small,#result-count{display:none}.check-heading{flex-basis:155px}.result-tools{overflow-x:auto}.result-area{grid-template-columns:minmax(0,1fr) 245px}}@container (max-height:410px){.notice,footer{display:none}.preview-slot{height:90px}}", Me = /* @__PURE__ */ new WeakMap(), nt = "nashepo.collisionfinder360.project.", qe = () => ({
  format: "nashepo.checks",
  version: 1,
  checks: [],
  sets: []
}), He = (t) => {
  if (!(!t || typeof sessionStorage > "u"))
    try {
      const e = sessionStorage.getItem(nt + t);
      return e ? tt(e) : void 0;
    } catch {
      return;
    }
}, We = (t, e) => {
  if (!(!t || typeof sessionStorage > "u"))
    try {
      sessionStorage.setItem(
        nt + t,
        JSON.stringify(e, (i, s) => i === "image" ? void 0 : s)
      );
    } catch {
    }
};
function jt(t, e) {
  const i = t.shadowRoot || t.attachShadow({ mode: "open" }), s = lt(t);
  let r = e.projectToken(), n = e.projectId(), a = r && (Me.get(r) || He(n)) || qe();
  r && Me.set(r, a);
  let p, h = a.checks[0]?.id || "", x = "select", m = "", b = 0, M = !1, j = !1, O, k = !0, A = !1;
  const C = /* @__PURE__ */ new Set();
  let G, $, D = 0;
  const N = () => a.checks.find((o) => o.id === h), u = (o) => i.querySelector("#" + o);
  i.innerHTML = `<style>${It}</style><main><header class="commandbar"><div class="brand"><img src="${St}" alt=""><b>НашеПО</b><small>${dt}</small></div><div class="check-heading"><input id="name" aria-label="Имя проверки" placeholder="Выберите проверку"><small id="check-summary">Проверка не выбрана</small></div><div id="tabs" class="tabs">${[
    ["select", "Выбор"],
    ["results", "Результаты"],
    ["rules", "Правила"],
    ["report", "Отчёт"]
  ].map(([o, l]) => `<button data-tab="${o}">${l}</button>`).join(
    ""
  )}</div><div class="header-actions"><button id="scan" title="Перечитать список и геометрию выбранных моделей">↻ Модели</button><button id="run" class="primary">▶ Запустить</button><button id="cancel" hidden>Остановить</button><details class="more-menu"><summary title="Другие команды">⋮</summary><div class="more-popover"><button id="open">Открыть проверки</button><button id="save">Сохранить проверки</button><button id="copy">Копировать проверку</button><button id="delete">Удалить проверку</button><button id="settings">Настройки</button><button id="help">Справка</button></div></details></div><span id="dirty"></span></header><div id="run-progress" class="run-progress" hidden><span id="run-phase">Подготовка</span><div id="run-bar" class="run-bar" role="progressbar"><i id="run-fill"></i></div><span id="run-value"></span></div><div class="notice" id="notice" role="status">Откройте IFC/SMDX в проекте и нажмите «Модели».</div><div class="workspace"><aside><div class="aside-title">Проверки</div><input id="test-search" type="search" placeholder="Поиск проверок"><div id="checks"></div><div class="aside-actions"><button id="all">Запустить все</button><button id="new" class="primary">＋ Новая проверка</button></div></aside><section class="main"><div id="content"></div></section></div><footer><span id="model-count">Модели не прочитаны</span><span>Расчёт выполняется на вашем компьютере</span></footer><input id="file" type="file" accept=".json" hidden><dialog id="settings-dialog"><h2>Настройки</h2><label>Дистанция камеры, м<input id="distance" type="number" value="15" min="0.5"></label><p class="links"><a href="https://nashepo.ru/" target="_blank" rel="noopener noreferrer">Сайт НашеПО</a><a href="https://t.me/RoburFan" target="_blank" rel="noopener noreferrer">Telegram</a></p><button data-close="settings-dialog">Закрыть</button></dialog><dialog id="help-dialog">${rt}<button data-close="help-dialog">Закрыть</button></dialog><dialog id="set-dialog"><h2>Сохранить набор моделей</h2><label>Название<input id="set-name" maxlength="120"></label><div class="dialog-actions"><button id="set-cancel">Отмена</button><button id="set-confirm" class="primary">Сохранить</button></div></dialog></main>`;
  const Q = document.createElement("button");
  Q.id = "clear-project", Q.textContent = "Очистить проект", u("save").after(Q), i.querySelector(".more-popover").addEventListener(
    "click",
    () => i.querySelector(".more-menu").removeAttribute("open")
  );
  const v = (o, l = !1) => {
    u("notice").textContent = o, u("notice").classList.toggle("error", l);
  }, I = (o, l, d, c) => {
    const f = u("run-progress"), y = u("run-bar"), g = u("run-fill");
    if (f.hidden = !1, u("notice").hidden = !0, u("run-phase").textContent = o, d && d > 0 && l !== void 0) {
      const w = Math.max(0, Math.min(100, l / d * 100));
      g.style.width = `${w}%`, y.setAttribute("aria-valuemin", "0"), y.setAttribute("aria-valuemax", "100"), y.setAttribute("aria-valuenow", String(Math.round(w))), u("run-value").textContent = `${Math.round(w)}% · ${l}/${d}` + (c === void 0 ? "" : ` · найдено ${c}`);
    } else
      g.style.width = "0", y.removeAttribute("aria-valuenow"), u("run-value").textContent = c === void 0 ? "" : `Найдено ${c}`;
    y.setAttribute("aria-valuetext", u("run-value").textContent || o);
  }, Y = () => {
    u("run-progress").hidden = !0, u("notice").hidden = !1;
  }, T = async (o) => {
    try {
      await o();
    } catch (l) {
      v(l instanceof Error ? l.message : String(l), !0);
    }
  }, xe = () => new Promise((o) => {
    const l = u("set-dialog"), d = u("set-name");
    let c = !1;
    const f = (y) => {
      c || (c = !0, l.close(), o(y));
    };
    d.value = "Новый набор", u("set-confirm").onclick = () => {
      const y = d.value.trim();
      y ? f(y) : d.focus();
    }, u("set-cancel").onclick = () => f(), l.oncancel = (y) => {
      y.preventDefault(), f();
    }, l.showModal(), d.focus(), d.select();
  }), U = () => {
    A = !0, u("dirty").textContent = "Есть несохранённые изменения", r && Me.set(r, a), We(n, a);
  }, ve = () => {
    const o = e.projectToken();
    return !o || o === r ? !1 : (!r && (a.checks.length || a.sets.length) ? Me.set(o, a) : a = Me.get(o) || He(e.projectId()) || qe(), Me.set(o, a), r = o, n = e.projectId(), p = void 0, h = a.checks[0]?.id || "", m = "", C.clear(), b = 0, A = !1, e.clear(), u("dirty").textContent = "", !0);
  }, E = () => {
    const o = N();
    o?.lastRun && (o.status = "stale"), U(), _();
  }, P = () => [
    ...new Set(
      (p?.elements || []).flatMap((o) => Object.keys(o.properties))
    )
  ].sort(), J = (o, l) => o.map(
    (d) => `<option value="${K(d)}" ${d === l ? "selected" : ""}>${K(d)}</option>`
  ).join("");
  function W() {
    const o = N(), l = u("result-search")?.value.toLowerCase() || "", d = u("result-state")?.value || "", c = Number(u("result-depth")?.value || 0);
    return (o?.results || []).filter(
      (f) => (!d || f.state === d) && (o?.type === "duplicates" || f.unmeasured || (f.penetrationMm ?? 0) >= c) && (!l || JSON.stringify({ ...f, image: void 0 }).toLowerCase().includes(l))
    );
  }
  function _() {
    const o = u("test-search").value.toLowerCase();
    u("checks").innerHTML = a.checks.filter((l) => l.name.toLowerCase().includes(o)).map(
      (l) => `<button class="check-item ${l.id === h ? "active" : ""}" data-check="${l.id}"><strong>${K(l.name)}</strong><small>${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[l.status]} · ${l.results.filter((d) => !["resolved", "excluded"].includes(d.state)).length} в работе / ${l.results.length}</small></button>`
    ).join("");
  }
  function ne(o, l) {
    const d = p?.elements.filter(
      (S) => (N().includeHidden || !S.hidden) && Ce(S, o)
    ).length || 0, c = o.manualOnly ? pe(o) : o.modelsMode === "selected" ? o.models : (p?.models || []).map((S) => S.id), f = p && c.every((S) => p.indexedModelIds.includes(S)) ? `${d} элементов` : "число после запуска", y = p?.models || [], g = o.modelsMode !== "selected", w = a.sets.map(
      (S) => `<option value="${K(S.id)}" ${o.presetId === S.id ? "selected" : ""}>${K(S.name)}</option>`
    ).join("");
    return `<article class="selection" data-side="${l}"><h3>Выбор ${l.toUpperCase()} <span data-selection-count>${f}</span></h3>${o.manualOnly ? '<p class="selection-mode">Только элементы, выбранные вручную</p>' : ""}<div class="preset-row"><select class="preset"><option value="">Набор моделей…</option>${w}</select><button data-selection="load-set">Применить</button><button data-selection="save-set">Сохранить набор</button><button data-selection="delete-set" ${o.presetId ? "" : "disabled"}>Удалить</button></div><div class="model-list"><label class="model-all"><input type="checkbox" class="all-models" ${g ? "checked" : ""}> Все модели</label>${y.map((S) => `<label><input type="checkbox" class="model-check" value="${K(S.id)}" ${g || o.models.includes(S.id) ? "checked" : ""}> ${K(S.name)}</label>`).join("") || "<small>Нажмите «Модели».</small>"}</div><small>Отметьте файлы, которые должны участвовать в выборе ${l.toUpperCase()}.</small><div class="selection-tools"><button data-selection="show">Показать выбранные элементы</button><button data-selection="only">Только выделенные в 3D</button><button data-selection="include">＋ Добавить из 3D</button><button data-selection="exclude">− Исключить из 3D</button><button data-selection="reset">Сбросить ручной выбор</button></div><small>Добавлено вручную: ${o.include.length} · исключено: ${o.exclude.length}</small></article>`;
  }
  function R() {
    _();
    const o = N();
    u("name").value = o?.name || "", u("check-summary").textContent = o ? `${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[o.status]} · ${o.results.filter((l) => !["resolved", "excluded"].includes(l.state)).length} в работе / ${o.results.length}` : "Проверка не выбрана";
    for (const l of ["name", "copy", "delete", "run"])
      u(l).disabled = !o || M;
    for (const l of i.querySelectorAll("[data-tab]"))
      l.classList.toggle("active", l.dataset.tab === x);
    if (!o) {
      u("content").innerHTML = '<div class="empty"><h2>Создайте первую проверку</h2><p>Обновите модели, затем выберите, какие элементы проверять друг с другом.</p></div>';
      return;
    }
    x === "select" && (u("content").innerHTML = `<div class="choose-layout"><div class="parameters"><h3>Параметры проверки</h3><label>Тип<select id="type"><option value="intersection" ${o.type === "intersection" ? "selected" : ""}>По пересечению</option><option value="duplicates" ${o.type === "duplicates" ? "selected" : ""}>Дублирование</option></select></label><label title="Числовая погрешность расчёта">Точность расчёта, мм<input id="precision" type="number" value="${o.precision}" min="0.001" max="100" step="0.1"></label><label title="Конфликты с меньшей оценкой глубины не попадут в результат">Минимальная глубина, мм<input id="min-penetration" type="number" value="${o.minPenetration}" min="0" max="100000" step="1" ${o.type === "duplicates" ? "disabled" : ""}></label><label class="check"><input id="touching" type="checkbox" ${o.touching ? "checked" : ""} ${o.type === "duplicates" ? "disabled" : ""}>Учитывать касания</label><small>Глубина Hard Clash — наименьшая толщина области перекрытия. Она не зависит от густоты сетки и от размеров элементов.</small><p class="legend"><span class="part-a">● Выбор А</span><span class="part-b">● Выбор Б</span></p></div><div class="selection-grid">${ne(o.a, "a")}${ne(o.b, "b")}</div></div><datalist id="property-fields">${J(P(), "")}</datalist>`), x === "rules" && (u("content").innerHTML = `<div class="rules"><h3>Исключение пар</h3><p>Элемент сам с собой не проверяется. Пара А/Б учитывается один раз.</p><label class="check"><input id="same-model" type="checkbox" ${o.ignoreSameModel ? "checked" : ""}>Не проверять элементы одной модели</label><label class="check"><input id="same-group" type="checkbox" ${o.ignoreSameGroup ? "checked" : ""}>Не проверять геометрию одного составного объекта</label><label>Не проверять пары с одинаковым значением свойства<input id="equal-property" list="property-fields" value="${K(o.equalProperty)}" placeholder="Без ограничения"></label><label class="check"><input id="hidden" type="checkbox" ${o.includeHidden ? "checked" : ""}>Включать скрытые элементы прочитанных моделей</label><p>Незагруженные подключённые файлы нужно открыть перед расчётом.</p><datalist id="property-fields">${J(P(), "")}</datalist></div>`), x === "results" && (u("content").innerHTML = `<div class="result-tools"><div class="result-filters"><input id="result-search" type="search" placeholder="Поиск по результатам"><select id="result-state"><option value="">Все состояния</option>${Object.entries(
      we
    ).map(([l, d]) => `<option value="${l}">${d}</option>`).join("")}</select>${o.type === "intersection" ? '<input id="result-depth" type="number" min="0" step="1" placeholder="Глубина от, мм">' : ""}<button id="show-markers" role="switch" aria-checked="${k}">${k ? "● Знаки" : "○ Знаки"}</button><span id="result-count"></span></div><div class="bulk-tools"><select id="bulk-state" title="Состояние для выбранных строк">${Object.entries(
      we
    ).map(([l, d]) => `<option value="${l}">${d}</option>`).join("")}</select><button id="bulk">Применить</button></div></div><div class="result-area"><div class="table-area"><div class="scroll" id="table"></div><div class="pager"><span id="selection-count"></span><button id="prev-page">←</button><span id="page"></span><button id="next-page">→</button></div></div><div class="detail" id="detail"></div></div>`, H(), me()), x === "report" && (u("content").innerHTML = `<div class="report"><h3>${K(o.name)}</h3><p>Результатов: ${o.results.length}. Выбрано: ${C.size}. ${o.status === "stale" ? "Результаты устарели — рекомендуется повторный запуск." : ""}</p><label class="check"><input id="selected-only" type="checkbox" ${C.size ? "checked" : ""}>Только выбранные строки</label><label class="check"><input id="report-images" type="checkbox" checked>Добавить снимки (недостающие будут созданы автоматически)</label><button id="export-html" class="primary">Сформировать HTML-отчёт</button><button id="export-viewer">Сессия для плагина «Коллизии»</button><p>Правила и все результаты сохраняются кнопкой «Сохранить проверки» в верхней панели.</p></div>`), u("content").inert = M;
  }
  const oe = (o, l) => l === "duplicates" ? "—" : o.unmeasured ? "не определена" : (o.penetrationMm ?? 0).toFixed(1);
  function H() {
    const o = N(), l = W(), d = Math.max(1, Math.ceil(l.length / 50));
    b = Math.max(0, Math.min(b, d - 1));
    const c = l.slice(b * 50, b * 50 + 50);
    u("table").innerHTML = l.length ? `<table><thead><tr><th><input id="check-page" type="checkbox" aria-label="Выбрать страницу" ${c.every((f) => C.has(f.id)) ? "checked" : ""}></th>${["№", "Состояние", "Глубина, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "Комментарий"].map((f) => `<th>${f}</th>`).join("")}</tr></thead><tbody>${c.map((f, y) => `<tr data-result="${K(f.id)}" class="${f.id === m ? "active" : ""}"><td><input type="checkbox" class="row-check" aria-label="Выбрать конфликт" ${C.has(f.id) ? "checked" : ""}></td>${[b * 50 + y + 1, we[f.state], oe(f, o.type), f.a.name, f.a.model, f.a.guid || "—", f.b.name, f.b.model, f.b.guid || "—", f.note].map((g) => `<td title="${K(g)}">${K(g)}</td>`).join("")}</tr>`).join("")}</tbody></table>` : '<div class="empty">Нет результатов. Запустите проверку или измените фильтры.</div>', u("page").textContent = `${b + 1} / ${d}`, u("result-count").textContent = `${l.length} результатов`, u("selection-count").textContent = `Выбрано: ${C.size}`, u("prev-page").disabled = b === 0, u("next-page").disabled = b === d - 1;
  }
  function me() {
    const o = N(), l = W(), d = l.findIndex((f) => f.id === m), c = o?.results.find((f) => f.id === m);
    u("detail").innerHTML = c ? `<div class="detail-head"><div><small>КОЛЛИЗИЯ</small><h3>#${d + 1} ${K(c.a.name)} × ${K(c.b.name)}</h3></div><div class="detail-nav"><button id="previous" title="Предыдущая коллизия" ${d <= 0 ? "disabled" : ""}>‹</button><button id="next" title="Следующая коллизия" ${d < 0 || d >= l.length - 1 ? "disabled" : ""}>›</button></div></div><div class="clash-summary"><span>${o?.type === "duplicates" ? "Дублирование" : "Пересечение"}</span><span title="${c.unmeasured ? "У элемента нет собственной толщины, объёмный замер невозможен" : "Наименьшая толщина области перекрытия двух элементов"}">${o?.type === "duplicates" ? "Совпадение геометрии" : c.unmeasured ? "Глубина не определена" : `Глубина ${(c.penetrationMm ?? 0).toFixed(1)} мм`}</span><span>${K(we[c.state])}</span></div><p class="legend"><span class="part-a">● Элемент А</span><span class="part-b">● Элемент Б</span></p><div class="preview-slot">${c.image ? `<button id="open-image" class="preview"><img src="${K(c.image)}" alt="Снимок коллизии"><span>Открыть крупнее</span></button>` : '<div class="preview-empty"><span>◫</span><small>Снимок создастся после перехода в 3D</small></div>'}</div><div class="detail-actions"><button id="focus" class="primary">Перейти в 3D</button><button id="capture-image">▣ Снимок пары</button></div><div class="detail-scroll"><div class="coordinates">${c.point.map((f, y) => `<span>${["X", "Y", "Z"][y]} ${f.toFixed(3)}</span>`).join("")}</div><label>Состояние<select id="edit-state">${Object.entries(
      we
    ).map(
      ([f, y]) => `<option value="${f}" ${c.state === f ? "selected" : ""}>${y}</option>`
    ).join(
      ""
    )}</select></label><label>Назначение<input id="assignee" value="${K(c.assignee)}"></label><label>Комментарий<textarea id="note" rows="2">${K(c.note)}</textarea></label>${[
      c.a,
      c.b
    ].map(
      (f, y) => `<details><summary>Элемент ${y ? "Б" : "А"} · свойства</summary><dl>${Object.entries(
        f.properties
      ).map(([g, w]) => `<dt>${K(g)}</dt><dd>${K(w)}</dd>`).join("")}</dl></details>`
    ).join("")}</div>` : '<div class="detail-empty"><span>◫</span><p>Выберите коллизию в таблице</p><small>Двойной щелчок сразу перенесёт камеру в 3D.</small></div>';
  }
  const pe = (o) => {
    const l = new Set(
      !o.manualOnly && o.modelsMode === "selected" ? o.models : []
    );
    for (const d of o.include)
      try {
        l.add(String(JSON.parse(d)[0]));
      } catch {
        const c = p?.elements.find(
          (f) => f.id === d
        )?.modelId;
        c && l.add(c);
      }
    return [...l];
  }, ee = () => {
    const o = N();
    if (!(!o || x !== "select"))
      for (const l of i.querySelectorAll("[data-side]")) {
        const d = l.dataset.side, c = [...l.querySelectorAll(".model-check")];
        if (!c.length) continue;
        const f = c.filter((w) => w.checked).map((w) => w.value), y = f.length === c.length, g = o[d];
        g.modelsMode = y ? "all" : "selected", g.models = y ? [] : f, g.conditions = [], g.mode = "all";
      }
  }, be = (o) => {
    if (!o?.length) return;
    const l = /* @__PURE__ */ new Set();
    for (const d of o)
      for (const c of [d.a, d.b]) {
        if (!c.manualOnly && c.modelsMode !== "selected") return;
        for (const f of pe(c)) l.add(f);
      }
    return l;
  }, he = (o) => {
    let l = o.trim().replace(/\\/g, "/").toLocaleLowerCase();
    try {
      l = decodeURIComponent(l);
    } catch {
    }
    l = l.replace(/[?#].*$/, "");
    const d = l.split("/").filter(Boolean).at(-1) || l;
    return /* @__PURE__ */ new Set([l, d]);
  }, ke = (o) => {
    const l = new Set(o.map((w) => w.id)), d = o.map((w) => ({
      id: w.id,
      aliases: /* @__PURE__ */ new Set([
        ...he(w.id),
        ...he(w.name)
      ])
    })), c = (w) => {
      if (l.has(w)) return w;
      const S = he(w), z = d.filter(
        (F) => [...S].some((te) => F.aliases.has(te))
      );
      return z.length === 1 ? z[0].id : w;
    }, f = (w) => {
      try {
        const S = JSON.parse(w);
        if (!Array.isArray(S) || S.length < 2) return w;
        const z = String(S[0]), F = c(z);
        return F === z ? w : JSON.stringify([F, ...S.slice(1)]);
      } catch {
        return w;
      }
    };
    let y = !1;
    const g = (w) => {
      const S = w.models.map(c), z = w.include.map(f), F = w.exclude.map(f);
      (S.some((te, ie) => te !== w.models[ie]) || z.some((te, ie) => te !== w.include[ie]) || F.some((te, ie) => te !== w.exclude[ie])) && (w.models = [...new Set(S)], w.include = [...new Set(z)], w.exclude = [...new Set(F)], y = !0);
    };
    for (const w of a.checks)
      g(w.a), g(w.b), w.modelsAtRun && (w.modelsAtRun = w.modelsAtRun.map(c));
    for (const w of a.sets) {
      const S = w.selection.models.map(c);
      S.some((z, F) => z !== w.selection.models[F]) && (w.selection.models = [...new Set(S)], y = !0);
    }
    return y && U(), y;
  }, ue = () => {
    const o = N();
    if (o)
      for (const l of i.querySelectorAll("[data-side]")) {
        const d = l.dataset.side, c = p?.elements.filter(
          (w) => (o.includeHidden || !w.hidden) && Ce(w, o[d])
        ).length || 0, f = o[d].manualOnly ? pe(o[d]) : o[d].modelsMode === "selected" ? o[d].models : (p?.models || []).map((w) => w.id), y = !!p && f.every((w) => p.indexedModelIds.includes(w)), g = l.querySelector(
          "[data-selection-count]"
        );
        g && (g.textContent = y ? `${c} элементов` : "число после запуска");
      }
  };
  function Z() {
    e.markers(
      W(),
      m,
      k,
      (o) => T(() => q(o, !0))
    );
  }
  function q(o, l = !1) {
    if (!M) {
      if (m = o, x === "results") {
        const d = W().findIndex((f) => f.id === o), c = d < 0 ? b : Math.floor(d / 50);
        c !== b && (b = c, H());
        for (const f of i.querySelectorAll("[data-result]"))
          f.classList.toggle("active", f.dataset.result === o);
        me(), requestAnimationFrame(() => {
          [...i.querySelectorAll("[data-result]")].find(
            (y) => y.dataset.result === o
          )?.scrollIntoView({ block: "nearest", inline: "nearest" });
        });
      }
      if (Z(), l) {
        const d = N()?.results.find((c) => c.id === o);
        d && (e.focus(d, Number(u("distance").value)), ae(d));
      }
    }
  }
  function ae(o) {
    clearTimeout($);
    const l = ++D, d = Number(u("distance").value);
    o.image && o.imageScope === "pair-ab" && o.imageDistance === d || !e.canLocate(o) || ($ = window.setTimeout(async () => {
      if (!(l !== D || M || m !== o.id))
        try {
          const c = await e.snapshot(
            o,
            d,
            () => l !== D || M || m !== o.id,
            !1,
            !1
          );
          if (l !== D || m !== o.id) return;
          o.image = c, o.imageScope = "pair-ab", o.imageDistance = d, U(), x === "results" && me();
        } catch (c) {
          l === D && m === o.id && v(
            "Не удалось создать снимок выбранной коллизии: " + (c instanceof Error ? c.message : String(c)),
            !0
          );
        }
    }, 500));
  }
  async function se(o) {
    j = !1, B(!0), I("Создание снимка пары");
    try {
      const l = Number(u("distance").value);
      o.image = await e.snapshot(o, l, () => j), o.imageScope = "pair-ab", o.imageDistance = l, U(), x === "results" && m === o.id && me();
    } catch (l) {
      v(
        "Результаты сохранены. Снимок пары не создан: " + (l instanceof Error ? l.message : String(l)),
        !0
      );
    } finally {
      Y(), B(!1);
    }
  }
  async function L(o, l = !1) {
    ve(), I("Подготовка моделей");
    let d = l ? /* @__PURE__ */ new Set() : be(o);
    if (!l && d?.size) {
      const c = await e.scan(
        (f) => I(f),
        () => j,
        /* @__PURE__ */ new Set()
      );
      p = c, ke(c.models) && (d = be(o));
    }
    p = await e.scan(
      (c) => {
        v(c), I(c);
      },
      () => j,
      d
    ), u("model-count").textContent = `Проиндексировано моделей: ${p.indexedModelIds.length} из ${p.models.length} · элементов: ${p.elements.length}`, R(), v(
      p.blockers.length ? p.blockers.join(" ") : p.warnings.length ? `Модели прочитаны с замечаниями. ${p.warnings.join(" ")}` : "Модели прочитаны. Настройте выборки и запустите проверку.",
      !!p.blockers.length
    );
  }
  const B = (o) => {
    M = o, o && (clearTimeout($), D++);
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
      u(l).disabled = o;
    u("cancel").hidden = !o, u("content").inert = o, u("checks").inert = o;
  };
  async function V(o) {
    const l = (c) => {
      const f = `${o.name} · ${c.phase}`;
      v(`${f} ${c.done}/${c.total} · найдено ${c.found}`), I(f, c.done, c.total, c.found);
    };
    let d;
    try {
      d = new vt();
    } catch {
      return wt(
        p.elements,
        o,
        l,
        () => j,
        (c) => e.geometry(c, () => j)
      );
    }
    return O = d, new Promise((c, f) => {
      const y = () => {
        d.terminate(), O = void 0, G = void 0;
      };
      G = () => {
        y(), f(Error("Расчёт отменён. Предыдущие результаты сохранены."));
      }, d.onmessage = async (g) => {
        if (g.data.load) {
          try {
            const w = await e.geometry(
              g.data.load,
              () => j || O !== d
            );
            if (O !== d) return;
            const S = [
              w.vertices?.buffer,
              w.indices?.buffer
            ].filter(Boolean);
            d.postMessage(
              { request: g.data.request, geometry: w },
              S
            );
          } catch (w) {
            O === d && d.postMessage({
              request: g.data.request,
              error: w instanceof Error ? w.message : String(w)
            });
          }
          return;
        }
        g.data.progress ? l(g.data.progress) : (y(), g.data.error ? f(Error(g.data.error)) : c(g.data.results));
      }, d.onerror = (g) => {
        y(), f(
          Error(
            `Не удалось запустить расчёт в фоновом потоке: ${g.message || "ошибка загрузки"}`
          )
        );
      }, d.postMessage({
        elements: p.elements,
        streaming: typeof e.geometry == "function",
        check: structuredClone({ ...o, results: [], warnings: [] })
      });
    });
  }
  async function re(o = !1) {
    if (M) return;
    ve(), ee();
    const l = o ? [...a.checks] : [N()].filter(Boolean);
    if (!l.length) throw Error("Создайте проверку.");
    for (const d of l)
      for (const c of [d.a, d.b])
        c.conditions = [], c.mode = "all";
    j = !1, B(!0), I("Подготовка моделей");
    try {
      if (await L(l), B(!0), p.blockers.length)
        throw Error(
          "Состав моделей прочитан не полностью. " + p.blockers.join(" ")
        );
      for (const c of l) {
        if (j) break;
        for (const w of [c.a, c.b]) {
          if (w.modelsMode === "selected" && w.models.some((S) => !p.models.some((z) => z.id === S)))
            throw Error(
              `${c.name}: одна из моделей выборки отсутствует. Исправьте выборку.`
            );
          if (w.include.some((S) => !p.elements.some((z) => z.id === S)))
            throw Error(
              `${c.name}: вручную добавленный элемент отсутствует в модели.`
            );
        }
        const f = pt(c);
        if (c.configAtRun === f && c.modelsAtRun?.some(
          (w) => !p.models.some((S) => S.id === w)
        ))
          throw Error(
            `${c.name}: состав моделей уменьшился. Подключите прежние модели или создайте копию проверки для нового состава. Прежние результаты сохранены.`
          );
        const y = await V(c);
        if (j || !e.isCurrent())
          throw Error(
            "Проект изменился или расчёт отменён. Предыдущие результаты сохранены."
          );
        const g = (/* @__PURE__ */ new Date()).toISOString();
        c.results = mt(
          c.configAtRun === f ? c.results : [],
          y,
          g
        ), c.lastRun = g, c.fingerprint = p.fingerprint, c.configAtRun = f, c.modelsAtRun = [...p.indexedModelIds], c.status = "done", c.warnings = [...p.warnings], h = c.id, m = c.results[0]?.id || "", C.clear(), U();
      }
      x = "results", R(), Z(), v(
        `Проверка завершена. ${N()?.results.length || 0} результатов. Сохраните проверки для продолжения работы.`
      );
      const d = N()?.results.find((c) => c.id === m);
      d && !j && await se(d);
    } finally {
      Y(), B(!1), R();
    }
  }
  function le(o) {
    const l = o.closest("[data-side]")?.dataset.side;
    if (!l) return;
    const d = N()[l], c = o, f = o.closest("[data-side]");
    if (c.classList.contains("preset")) {
      d.presetId = c.value || void 0, f.querySelector(
        '[data-selection="delete-set"]'
      ).disabled = !d.presetId;
      return;
    }
    if (c.classList.contains("all-models")) {
      for (const y of f.querySelectorAll(
        ".model-check"
      ))
        y.checked = c.checked;
      d.modelsMode = c.checked ? "all" : "selected", d.models = [], d.manualOnly = !1, d.presetId = void 0;
    }
    if (c.classList.contains("model-check")) {
      const y = [
        ...f.querySelectorAll(".model-check")
      ], g = y.filter((S) => S.checked).map((S) => S.value), w = y.length > 0 && g.length === y.length;
      f.querySelector(".all-models").checked = w, d.modelsMode = w ? "all" : "selected", d.models = w ? [] : g, d.manualOnly = !1, d.presetId = void 0;
    }
    d.conditions = [], d.mode = "all", E(), ue();
  }
  u("new").onclick = () => {
    const o = ct();
    o.name = `Проверка ${a.checks.length + 1}`, a.checks.push(o), h = o.id, x = "select", m = "", C.clear(), U(), R();
  }, u("scan").onclick = () => T(async () => {
    ee(), j = !1, B(!0), I("Чтение моделей");
    try {
      const o = N();
      await L(o ? [o] : void 0, !o);
    } finally {
      Y(), B(!1), R();
    }
  }), u("run").onclick = () => T(() => re()), u("all").onclick = () => T(() => re(!0)), u("cancel").onclick = () => {
    j = !0, G?.();
  }, u("test-search").oninput = _, u("checks").onclick = (o) => {
    const l = o.target.closest(
      "[data-check]"
    );
    l && !M && (e.clear(), h = l.dataset.check, m = "", C.clear(), b = 0, R());
  }, u("tabs").onclick = (o) => {
    const l = o.target.closest("[data-tab]");
    l && !M && (x = l.dataset.tab, R());
  }, u("name").onchange = () => {
    const o = N();
    o && (o.name = u("name").value.trim() || "Проверка", U(), _());
  }, u("copy").onclick = () => {
    const o = N();
    if (!o) return;
    const l = structuredClone(o);
    Object.assign(l, {
      id: crypto.randomUUID(),
      name: o.name + " — копия",
      results: [],
      lastRun: void 0,
      fingerprint: void 0,
      configAtRun: void 0,
      status: "new"
    }), a.checks.push(l), h = l.id, m = "", C.clear(), U(), R();
  }, u("delete").onclick = () => {
    N() && confirm(`Удалить проверку «${N().name}» и её результаты?`) && (a.checks = a.checks.filter((o) => o.id !== h), h = a.checks[0]?.id || "", C.clear(), e.clear(), U(), R());
  }, u("clear-project").onclick = () => {
    !a.checks.length && !a.sets.length || confirm(
      "Очистить проверки, наборы моделей и результаты текущего проекта?"
    ) && (a.checks = [], a.sets = [], p = void 0, h = "", m = "", C.clear(), e.clear(), U(), u("model-count").textContent = "Модели не прочитаны", R(), v("Данные проверок текущего проекта очищены."));
  }, u("save").onclick = () => {
    Ve("НашеПО-проверки.json", JSON.stringify(a, null, 2)), A = !1, u("dirty").textContent = "Файл проверок сохранён";
  }, u("open").onclick = () => u("file").click(), u("file").onchange = () => T(async () => {
    const o = u("file").files?.[0];
    if (!o) return;
    const l = tt(await o.text());
    A && !confirm("Заменить текущие несохранённые проверки данными из файла?") || (a = l, r && Me.set(r, a), We(n, a), h = a.checks[0]?.id || "", m = "", C.clear(), e.clear(), A = !1, u("dirty").textContent = "Проверки открыты", R(), v("Проверки открыты. Обновите модели перед переходом к элементам."), u("file").value = "");
  });
  for (const o of ["settings", "help"])
    u(o).onclick = () => u(o + "-dialog").showModal();
  for (const o of i.querySelectorAll("[data-close]"))
    o.onclick = () => u(o.dataset.close).close();
  u("content").onchange = (o) => T(() => {
    const l = o.target, d = N();
    if (!d) return;
    if (l.closest("[data-side]")) {
      le(l);
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
        const f = Number(l.value);
        if (!Number.isFinite(f) || f < 1e-3 || f > 100)
          throw l.value = String(d.precision), Error("Точность должна быть от 0,001 до 100 мм.");
        d.precision = f;
      }
      if (l.id === "min-penetration") {
        const f = Number(l.value);
        if (!Number.isFinite(f) || f < 0 || f > 1e5)
          throw l.value = String(d.minPenetration), Error(
            "Минимальная глубина должна быть от 0 до 100 000 мм."
          );
        d.minPenetration = f;
      }
      l.id === "type" && (d.type = l.value), l.id === "touching" && (d.touching = l.checked), l.id === "same-model" && (d.ignoreSameModel = l.checked), l.id === "same-group" && (d.ignoreSameGroup = l.checked), l.id === "hidden" && (d.includeHidden = l.checked), l.id === "equal-property" && (d.equalProperty = l.value), E(), R();
      return;
    }
    if (l.id === "result-state") {
      b = 0, H();
      return;
    }
    if (l.id === "check-page") {
      for (const f of W().slice(b * 50, b * 50 + 50))
        l.checked ? C.add(f.id) : C.delete(f.id);
      H();
      return;
    }
    if (l.classList.contains("row-check")) {
      const f = l.closest("[data-result]").dataset.result;
      l.checked ? C.add(f) : C.delete(f), u("selection-count").textContent = `Выбрано: ${C.size}`;
      return;
    }
    const c = d.results.find((f) => f.id === m);
    c && (l.id === "edit-state" && (c.state = l.value, H(), _(), Z()), l.id === "assignee" && (c.assignee = l.value), l.id === "note" && (c.note = l.value, H()), U());
  }), u("content").oninput = (o) => {
    const l = o.target;
    (l.id === "result-search" || l.id === "result-depth") && (b = 0, H());
    const d = N(), c = Number(l.value);
    d && l.id === "precision" && Number.isFinite(c) && c >= 1e-3 && c <= 100 && (d.precision = c, E()), d && l.id === "min-penetration" && Number.isFinite(c) && c >= 0 && c <= 1e5 && (d.minPenetration = c, E());
  }, u("content").onclick = (o) => T(async () => {
    const l = o.target, d = l.closest("button"), c = N();
    if (!c) return;
    if (d?.dataset.selection) {
      const y = d.closest("[data-side]").dataset.side, g = c[y], w = u("content").scrollTop;
      let S = !0;
      switch (d.dataset.selection) {
        case "load-set": {
          const z = a.sets.find((F) => F.id === g.presetId);
          if (!z) throw Error("Выберите сохранённый набор моделей.");
          Object.assign(g, structuredClone(z.selection), {
            conditions: [],
            mode: "all",
            include: [],
            exclude: [],
            manualOnly: !1,
            presetId: z.id
          });
          break;
        }
        case "save-set": {
          if (g.manualOnly)
            throw Error(
              "Ручную выборку элементов нельзя сохранить как набор моделей."
            );
          const z = await xe();
          if (!z) return;
          const F = {
            id: crypto.randomUUID(),
            name: z,
            selection: {
              models: [...g.models],
              modelsMode: g.modelsMode,
              conditions: [],
              mode: "all"
            }
          };
          a.sets.push(F), g.presetId = F.id, S = !1;
          break;
        }
        case "delete-set": {
          const z = a.sets.find((F) => F.id === g.presetId);
          if (!z) throw Error("Выберите сохранённый набор моделей.");
          if (!confirm(`Удалить набор «${z.name}»?`)) return;
          a.sets = a.sets.filter((F) => F.id !== z.id);
          for (const F of a.checks)
            for (const te of [F.a, F.b])
              te.presetId === z.id && (te.presetId = void 0);
          S = !1;
          break;
        }
        case "show":
          e.select(
            (p?.elements || []).filter((z) => (c.includeHidden || !z.hidden) && Ce(z, g)).map((z) => z.id)
          );
          return;
        case "only": {
          const z = e.selected();
          if (!z.length) throw Error("Выделите элементы в 3D-сцене.");
          g.include = z, g.exclude = [], g.manualOnly = !0;
          break;
        }
        case "include": {
          const z = e.selected();
          if (!z.length) throw Error("Выделите элементы в 3D-сцене.");
          g.include = [.../* @__PURE__ */ new Set([...g.include, ...z])], g.exclude = g.exclude.filter((F) => !z.includes(F));
          break;
        }
        case "exclude": {
          const z = e.selected();
          if (!z.length) throw Error("Выделите элементы в 3D-сцене.");
          g.exclude = [.../* @__PURE__ */ new Set([...g.exclude, ...z])], g.include = g.include.filter((F) => !z.includes(F));
          break;
        }
        case "reset":
          g.manualOnly = !1, g.include = [], g.exclude = [];
      }
      S ? E() : U(), R(), u("content").scrollTop = w;
      return;
    }
    if (d?.id === "prev-page" && (b--, H()), d?.id === "next-page" && (b++, H()), d?.id === "show-markers" && (k = !k, d.textContent = k ? "● Знаки включены" : "○ Знаки выключены", d.setAttribute("aria-checked", String(k)), Z()), d?.id === "bulk") {
      const y = u("bulk-state").value;
      for (const g of c.results) C.has(g.id) && (g.state = y);
      U(), H(), me(), _(), Z();
    }
    if (d?.id === "capture-image") {
      const y = c.results.find((g) => g.id === m);
      if (y) {
        j = !1, B(!0), I("Создание снимка пары");
        try {
          y.image = await e.snapshot(
            y,
            Number(u("distance").value),
            () => j,
            !0
          ), y.imageScope = "pair-ab", y.imageDistance = void 0, U(), me(), v("Снимок сохранён в результат.");
        } finally {
          Y(), B(!1);
        }
      }
      return;
    }
    if (d?.id === "open-image") {
      const y = c.results.find((g) => g.id === m);
      if (y?.image) {
        const g = document.createElement("dialog");
        g.className = "image-dialog", g.innerHTML = '<button>Закрыть</button><img alt="Снимок коллизии">', g.querySelector("img").src = y.image, g.querySelector("button").onclick = () => {
          g.close(), g.remove();
        }, i.append(g), g.showModal();
      }
      return;
    }
    if (d?.id === "focus" && q(m, !0), d?.id === "previous" || d?.id === "next") {
      const y = W(), g = y.findIndex((w) => w.id === m) + (d.id === "next" ? 1 : -1);
      y[g] && q(y[g].id, !0);
    }
    if (d?.id === "export-html" || d?.id === "export-viewer") {
      let y = 0;
      const g = u("selected-only").checked ? c.results.filter((S) => C.has(S.id)) : c.results;
      if (!g.length) throw Error("Нет результатов для отчёта.");
      if (u("report-images").checked) {
        const S = e.view, z = S?.storeView(), F = Number(u("distance").value);
        j = !1, B(!0), I("Подготовка снимков отчёта", 0, g.length);
        try {
          await e.captureWorkspace(async () => {
            let te = 0;
            for (const ie of g) {
              if (j)
                throw Error(
                  "Подготовка отчёта отменена. Уже полученные снимки сохранены."
                );
              I(
                "Подготовка снимков отчёта",
                te,
                g.length
              ), v("Подготовка снимков: " + (te + 1) + " / " + g.length);
              const at = ie.imageScope !== "pair-ab" || ie.imageDistance !== void 0 && ie.imageDistance !== F;
              if (!ie.image || at) {
                if (ie.state === "resolved" && !e.canLocate(ie)) {
                  te++;
                  continue;
                }
                try {
                  ie.image = await e.snapshot(ie, F, () => j), ie.imageScope = "pair-ab", ie.imageDistance = F, U();
                } catch (st) {
                  if (j || !e.isCurrent()) throw st;
                  y++;
                }
              }
              te++, I("Подготовка снимков отчёта", te, g.length);
            }
          });
        } finally {
          if (S && e.isCurrent()) {
            const te = c.results.find((ie) => ie.id === m);
            if (te)
              try {
                e.focus(te, F, !1);
              } catch {
              }
            z && S.restoreView(z);
          }
          Y(), B(!1);
        }
      }
      const w = u("report-images").checked ? g.map(
        (S) => S.imageScope === "pair-ab" ? S : { ...S, image: void 0 }
      ) : g.map((S) => ({ ...S, image: void 0 }));
      Ve(
        c.name + (d.id === "export-html" ? ".html" : ".collision360.json"),
        d.id === "export-html" ? kt(c, w) : Mt(c, w)
      ), v(
        "Отчёт подготовлен. Результатов: " + g.length + "; со снимками: " + w.filter((S) => S.image).length + "." + (y ? ` Не удалось создать снимков: ${y}; эти строки включены без изображения.` : ""),
        y > 0
      );
    }
    const f = l.closest("[data-result]");
    f && !l.closest("input") && !window.getSelection()?.toString() && q(f.dataset.result);
  }), u("content").ondblclick = (o) => {
    const l = o.target, d = l.closest("[data-result]");
    d && !l.closest("input") && T(() => q(d.dataset.result, !0));
  };
  const de = setInterval(() => {
    M || (ve() ? (u("model-count").textContent = "Модели не прочитаны", v(
      a.checks.length ? "Открыт другой проект. Показаны его проверки; обновите модели." : "Открыт другой проект. Для него ещё нет проверок."
    ), M || R()) : p && !e.isCurrent() && (p = void 0, e.clear(), u("model-count").textContent = "3D-окно изменилось", v("Активное 3D-окно изменилось. Обновите модели."), M || R()));
  }, 1500);
  return R(), () => {
    s(), clearInterval(de), clearTimeout($), D++, j = !0, G?.(), O?.terminate(), e.clear();
  };
}
var Be = /* @__PURE__ */ ((t) => (t.object = "object", t.drawing = "drawing", t.table = "table", t.record = "record", t.textStyle = "textstyle", t.textStyleTable = "textstyles", t.linetype = "linetype", t.linetypeTable = "linetypes", t.layer = "layer", t.layerTable = "layers", t.block = "block", t.blockTable = "blocks", t.layout = "layout", t.layoutTable = "layouts", t.type = "type", t.typeTable = "types", t.material = "material", t.materialTable = "materials", t.geometry = "geometry", t.geometryTable = "geometries", t.group = "group", t.groupTable = "groups", t.attachment = "attachment", t.attachmentTable = "attachments", t.entities = "entities", t.entity = "entity", t.line = "l", t.solid = "s", t.insert = "i", t.polyline = "p", t.circle = "c", t.arc = "a", t.polyline3d = "p3", t.proxy = "x", t.text = "t", t.mtext = "mt", t.wipeout = "w", t.model3d = "g", t.alignment = "al", t))(Be || {});
const Ge = () => new Promise((t) => requestAnimationFrame(() => t()));
function ot(t) {
  const { width: e, height: i } = t.camera, s = Array.from(document.querySelectorAll("canvas")).filter(
    (n) => {
      const a = n.getBoundingClientRect();
      return a.width > 100 && a.height > 100 && n.width > 0 && n.height > 0 && getComputedStyle(n).visibility !== "hidden" && (Math.abs(a.width - e) < 4 && Math.abs(a.height - i) < 4 || Math.abs(n.width - e) < 4 && Math.abs(n.height - i) < 4);
    }
  );
  if (!s.length)
    throw Error(
      "Снимок 3D-окна недоступен: откройте одно видимое окно модели."
    );
  const r = s[0].getBoundingClientRect();
  if (s.some((n) => {
    const a = n.getBoundingClientRect();
    return Math.abs(a.x - r.x) > 4 || Math.abs(a.y - r.y) > 4;
  }))
    throw Error(
      "Открыто несколько подходящих 3D-окон. Оставьте одно окно для снимка."
    );
  return { candidates: s, rect: r };
}
async function Et(t) {
  await Ge(), t.repaint();
  const { candidates: e, rect: i } = ot(t), s = document.createElement("canvas");
  s.width = Math.max(1, Math.round(i.width * devicePixelRatio)), s.height = Math.max(1, Math.round(i.height * devicePixelRatio)), Object.assign(s.style, {
    position: "fixed",
    left: `${i.left}px`,
    top: `${i.top}px`,
    width: `${i.width}px`,
    height: `${i.height}px`,
    zIndex: "2147483646",
    pointerEvents: "none"
  });
  const r = s.getContext("2d");
  for (const n of e)
    r.drawImage(n, 0, 0, s.width, s.height);
  return document.body.append(s), async () => {
    t.repaint(), await Ge(), s.remove();
  };
}
async function At(t, e) {
  if (await Ge(), e()) throw Error("Подготовка снимков отменена.");
  const { candidates: i } = ot(t), s = document.createElement("canvas"), r = Math.min(1, 1280 / i[0].width);
  s.width = Math.round(i[0].width * r), s.height = Math.round(i[0].height * r);
  const n = s.getContext("2d");
  n.fillStyle = "#20242b", n.fillRect(0, 0, s.width, s.height), t.repaint();
  for (const a of i)
    n.drawImage(a, 0, 0, s.width, s.height);
  try {
    return s.toDataURL("image/jpeg", 0.82);
  } catch {
    throw Error("Браузер запретил чтение изображения 3D-окна.");
  }
}
const Pe = "nashepo.checks.points", Xe = "nashepo.checks.highlight";
function Ke(t) {
  let e = performance.now();
  return async () => {
    if (t()) throw Error("Операция отменена.");
    performance.now() - e >= 16 && (await new Promise((i) => setTimeout(i, 0)), e = performance.now());
  };
}
function ze(t, e, i, s = 0) {
  if (s > 12 || t == null) return;
  if (typeof t != "object") {
    i[e] = String(t);
    return;
  }
  if (Array.isArray(t)) {
    t.forEach((n, a) => ze(n, `${e}[${a}]`, i, s + 1));
    return;
  }
  const r = t;
  if ("$value" in r) {
    ze(r.$value, e, i, s + 1);
    return;
  }
  for (const [n, a] of Object.entries(r))
    n.startsWith("$") || ze(a, e ? `${e}.${n}` : n, i, s + 1);
}
function Ct(t) {
  const e = t.vertices.length / 3, i = (a) => Number.isFinite(t.vertices[a * 3]) && Number.isFinite(t.vertices[a * 3 + 1]) && Number.isFinite(t.vertices[a * 3 + 2]), s = (a) => {
    const p = t.indices[a], h = t.indices[a + 1], x = t.indices[a + 2];
    return p < e && h < e && x < e && p !== h && h !== x && x !== p && i(p) && i(h) && i(x);
  };
  let r = 0;
  for (let a = 0; a < t.indices.length; a += 3) s(a) && (r += 3);
  if (r === t.indices.length) return t.indices;
  const n = new Uint32Array(r);
  for (let a = 0, p = 0; a < t.indices.length; a += 3)
    s(a) && (n[p++] = t.indices[a], n[p++] = t.indices[a + 1], n[p++] = t.indices[a + 2]);
  return n;
}
const De = (t) => /\.wdx(?:[?#].*)?$/i.test(t);
class $t {
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
        (r) => requestAnimationFrame(() => requestAnimationFrame(() => r()))
      ));
    }
    try {
      return await e();
    } finally {
      if (this.captureDepth--, i && this.captureLayout) {
        const { panel: s, size: r, maximized: n } = this.captureLayout;
        this.captureLayout = void 0, s.size = r, s.maximized = n, await new Promise(
          (a) => requestAnimationFrame(() => requestAnimationFrame(() => a()))
        );
      }
    }
  }
  async scan(e, i, s) {
    const r = this.app, n = this.view, a = r?.model;
    if (!n || !a?.layouts || !a.attachments)
      throw Error(
        "Откройте проект Топоматик 360 с IFC или SMDX и сделайте его 3D-окно активным."
      );
    const p = [], h = /* @__PURE__ */ new Set(), x = [], m = [], b = [], M = /* @__PURE__ */ new Map(), j = /* @__PURE__ */ new Set();
    let O = 2166136261;
    const k = Ke(
      () => i() || r !== this.app || n !== this.view
    );
    let A = -1 / 0;
    const C = ($) => {
      for (let D = 0; D < $.length; D++)
        O = Math.imul(O ^ $.charCodeAt(D), 16777619);
    }, G = async ($, D, N) => {
      if (j.has($)) return;
      j.add($);
      const u = $.layers.layer0?.modelName || D, Q = D, v = De(u) || De(Q), I = (E, P) => {
        h.has(E) || (h.add(E), p.push({ id: E, name: P }));
      };
      v || I(Q, u);
      const Y = !v && (!s || s.has(Q)), T = [];
      (Y || v) && $.layouts.model?.walk((E) => (E.type === Be.model3d ? T.push(E) : E.type === Be.insert && x.push(`${u}: вставка блока не включена в расчёт.`), !1));
      const xe = /* @__PURE__ */ new Map();
      for (const E of T) {
        let P = E.layer, J = "";
        for (; P; ) {
          if (P.modelName && !De(P.modelName)) {
            J = P.modelName;
            break;
          }
          P = P.layer;
        }
        const W = v ? J || "Модель проекта" : u, _ = v ? J || `${D}/#model` : Q;
        if (v && I(_, W), s && !s.has(_)) continue;
        const ne = JSON.stringify([
          E.layer?.UUID || "",
          E.$id || E.$path
        ]);
        xe.set(JSON.stringify([_, ne]), {
          key: ne,
          objects: [E],
          modelId: _,
          modelName: W
        });
      }
      let U = 0;
      for (const E of xe.values()) {
        const { key: P, objects: J, modelId: W, modelName: _ } = E;
        if (i()) throw Error("Чтение моделей отменено.");
        if (r !== this.app || n !== this.view)
          throw Error(
            "Активный проект изменился. Запустите чтение моделей заново."
          );
        const ne = J[0].layer, R = {};
        try {
          if (ne) {
            const ue = [];
            let Z = ne;
            for (; Z && ue.length < 64; )
              ue.unshift(Z), Z = Z.layer;
            for (const q of ue)
              ze(q.typedProperties(), "", R), q.typed?.name && (R.Тип = q.typed.name);
          }
        } catch {
          x.push(`${_} / ${P}: часть свойств недоступна.`);
        }
        const oe = R["ifc.id"] || Object.entries(R).find(
          ([ue]) => /(^|\.)(globalid|ifcguid|guid)$/i.test(ue)
        )?.[1] || "", H = ne?.name || J[0].$id || "Элемент", me = JSON.stringify([W, P]);
        Object.assign(R, {
          Модель: _,
          Имя: H,
          GUID: oe,
          Объект: ne?.UUID || P
        });
        const pe = {
          min: [1 / 0, 1 / 0, 1 / 0],
          max: [-1 / 0, -1 / 0, -1 / 0]
        };
        let ee = !0, be = !1, he = 0;
        for (const ue of J) {
          ee &&= ue.isClosed;
          for (const Z of Object.values(ue.meshes)) {
            const q = Z.geometry;
            if (!q || q.indices.length % 3) {
              be = !0;
              continue;
            }
            ee &&= Z.isClosed;
            for (let L = 0; L < q.vertices.length; L += 3) {
              const B = [
                q.vertices[L],
                q.vertices[L + 1],
                q.vertices[L + 2]
              ];
              if (Math3d.mat4.mulv3(B, ue.matrix, B), !B.every(Number.isFinite)) {
                be = !0;
                continue;
              }
              for (let V = 0; V < 3; V++)
                pe.min[V] = Math.min(pe.min[V], B[V]), pe.max[V] = Math.max(pe.max[V], B[V]);
              if (C(B.join(",")), L % 6e4 === 0 && (performance.now() - A > 200 && (A = performance.now(), e(
                "Индексирование: " + _ + " · " + b.length + " элементов"
              )), await k(), i()))
                throw Error("Чтение моделей отменено.");
            }
            const ae = q.vertices.length / 3, se = (L) => Number.isFinite(q.vertices[L * 3]) && Number.isFinite(q.vertices[L * 3 + 1]) && Number.isFinite(q.vertices[L * 3 + 2]);
            for (let L = 0; L < q.indices.length; L += 3) {
              const B = q.indices[L], V = q.indices[L + 1], re = q.indices[L + 2];
              if (O = Math.imul(O ^ B, 16777619), O = Math.imul(O ^ V, 16777619), O = Math.imul(O ^ re, 16777619), B < ae && V < ae && re < ae && B !== V && V !== re && re !== B && se(B) && se(V) && se(re) ? he++ : be = !0, L % 15e4 === 0 && (await k(), i()))
                throw Error("Чтение моделей отменено.");
            }
          }
        }
        if (be || !he) {
          if (he || U++, !he) continue;
          ee = !1;
        }
        const ke = {
          id: me,
          name: H,
          model: _,
          modelId: W,
          guid: oe,
          properties: R,
          hidden: N || !!ne?.resolveHidden() || !!ne?.resolveDisabled(),
          triangles: new Float64Array(0),
          triangleCount: he,
          closed: ee,
          bounds: pe
        };
        C(JSON.stringify([me, R, ke.hidden])), b.push(ke), M.set(me, J);
      }
      U && x.push(
        `${u}: пропущено элементов без треугольной геометрии — ${U}.`
      );
      const ve = [];
      $.attachments.forEach((E) => {
        ve.push(E);
      });
      for (const E of ve) {
        const P = E.name || E.uri || E.$id, J = P || "Подключённая модель", W = `${D}/${P || "attachment"}`;
        E.model || I(W, J), E.model ? await G(
          E.model,
          W,
          N || E.hidden
        ) : (!s || s.has(W)) && m.push(
          `${J}: модель не загружена. Откройте её перед расчётом.`
        );
      }
    };
    if (await G(a, a.layers.layer0?.modelName || "Проект", !1), !b.length && (!s || s.size > 0)) {
      const $ = s ? [...s].filter((D) => !h.has(D)) : [];
      throw Error(
        $.length ? `Сохранённая выборка ссылается на модели, которых нет в текущем составе: ${$.join(", ")}. Обновите список моделей.` : p.length ? "В выбранных моделях не найдены 3D-элементы с доступной геометрией. Проверьте, что модели загружены, и выберите нужные файлы." : "В открытом проекте не обнаружены IFC/SMDX-модели. Проверьте состав подключений проекта."
      );
    }
    return this.clear(), this.refs = M, this.metadata = new Map(b.map(($) => [$.id, $])), this.scannedApp = r, this.scannedView = n, {
      elements: b,
      fingerprint: `${b.length}:${O >>> 0}`,
      warnings: [...new Set(x)],
      blockers: [...new Set(m)],
      models: p,
      indexedModelIds: p.filter(($) => !s || s.has($.id)).map(($) => $.id)
    };
  }
  async geometry(e, i) {
    const s = Ke(() => i() || !this.isCurrent());
    if (!this.isCurrent()) throw Error("Активная модель изменилась.");
    const r = this.metadata.get(e), n = this.refs.get(e);
    if (!r || !n) throw Error("Элемент отсутствует.");
    const a = n.flatMap(
      (j) => Object.values(j.meshes).flatMap((O) => {
        const k = O.geometry;
        if (!k || k.indices.length % 3) return [];
        const A = Ct(k);
        return A.length ? [{ object: j, g: k, indices: A }] : [];
      })
    );
    let p = 0, h = 0;
    for (const { g: j, indices: O } of a) {
      if (!j) throw Error("Геометрия недоступна.");
      p += j.vertices.length, h += O.length;
    }
    const x = new Float64Array(p), m = new Uint32Array(h);
    let b = 0, M = 0;
    for (const { object: j, g: O, indices: k } of a) {
      if (!O) throw Error("Геометрия недоступна.");
      for (let A = 0; A < O.vertices.length; A += 3) {
        const C = [O.vertices[A], O.vertices[A + 1], O.vertices[A + 2]];
        if (Math3d.mat4.mulv3(C, j.matrix, C), x.set(C, b + A), A % 6e4 === 0 && (await s(), i() || !this.isCurrent()))
          throw Error("Чтение геометрии отменено.");
      }
      for (let A = 0; A < k.length; A++)
        if (m[M + A] = b / 3 + k[A], A % 15e4 === 0 && (await s(), i()))
          throw Error("Чтение геометрии отменено.");
      b += O.vertices.length, M += k.length;
    }
    return { ...r, vertices: x, indices: m };
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
      const e = this.pointView.annotations.get(Pe);
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
    const r = e.point, n = this.view;
    n.camera?.id !== "3d" && n.setCameraType("3d"), n.pauseAnimation?.(), this.highlight(e), this.select([e.a.id, e.b.id]);
    const a = [-0.65, 0.65, -0.394], p = Math.hypot(...a);
    a.forEach((h, x) => a[x] = h / p), n.lookAt(
      r.map((h, x) => h - a[x] * i),
      a,
      [0, 0, 1],
      s,
      r
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
      ({ id: a, color: p }, h) => [...new Set(this.refs.get(a) || [])].flatMap(
        (x) => Object.values(x.meshes).flatMap((m) => {
          const b = m.geometry;
          if (!b) return [];
          const M = {
            // SDK fields may be prototype getters rather than own properties.
            uuid: `${Xe}.${h}.${b.uuid}`,
            vertices: b.vertices,
            indices: b.indices,
            normals: b.normals,
            bounds: b.bounds,
            colors: new Uint32Array(b.vertices.length / 3).fill(p)
          };
          return [{ obj: x, geometry: M, color: p }];
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
      paint3d: (a) => {
        const p = a.color, h = a.rasterizer.material;
        a.rasterizer.material = void 0;
        try {
          for (const { obj: x, geometry: m, color: b } of this.overlaySurfaces) {
            a.color = b, a.pushMatrix();
            try {
              a.multMatrix(x.matrix), a.mesh(m);
            } finally {
              a.popMatrix();
            }
          }
        } catch (x) {
          r.visible = !1, this.overlayError = new Error(
            "Не удалось отрисовать подсветку пары: " + (x instanceof Error ? x.message : String(x))
          );
        } finally {
          a.color = p, a.rasterizer.material = h;
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
  async snapshot(e, i, s, r = !1, n = !0) {
    const a = () => this.snapshotInWorkspace(e, i, s, r);
    return n ? this.captureWorkspace(a) : a();
  }
  async snapshotInWorkspace(e, i, s, r = !1) {
    if (!this.isCurrent())
      throw Error("Обновите модели перед созданием снимков.");
    if (!this.canLocate(e))
      throw Error("Элементы результата отсутствуют в открытых моделях.");
    const n = this.view, a = n.layer.drawing;
    if (!a)
      throw Error(
        "Слой моделей недоступен для снимка пары. Откройте 3D-окно проекта."
      );
    const p = a.visible, h = n.annotations.visible, x = new Set(n.layer.selectedObjects());
    let m;
    try {
      r ? this.highlight(e) : this.focus(e, i, !1), n.pauseAnimation(), m = await Et(n), n.layer.clearSelected(), a.visible = !1, n.annotations.visible = !1, n.invalidate();
      const b = await At(
        n,
        () => s() || !this.isCurrent()
      );
      if (this.overlayError) throw this.overlayError;
      return b;
    } finally {
      a.visible = p, n.annotations.visible = h, n.layer.clearSelected(), n.layer.selectObjects((b) => x.has(b), !0), n.invalidate(), await m?.();
    }
  }
  markers(e, i, s, r) {
    if (!this.isCurrent()) return;
    const n = this.view;
    this.pointView && this.pointView !== n && this.clear();
    const a = n.annotations.get(Pe);
    if (a && n.annotations.release(a), this.pointView = n, !s) {
      n.invalidate();
      return;
    }
    const p = n.annotations.create(Pe, 1e4), h = e.filter((x) => x.id !== i).concat(e.filter((x) => x.id === i));
    for (const x of h.slice(-3e3)) {
      if (x.state === "resolved") continue;
      const [m, b, M] = x.point, j = x.id === i, O = x.state === "excluded" ? "#78818c" : x.state === "approved" || x.state === "reviewed" ? "#28b94b" : "#e1372d", k = j ? "#f2c94c" : O, A = () => r(x.id), C = [
        { type: "line", a: [m, b, M], b: [m, b, M + 1], color: k, width: 5 },
        {
          type: "polyline",
          points: [
            [m - 0.65, b, M + 1],
            [m + 0.65, b, M + 1],
            [m, b, M + 2.2],
            [m - 0.65, b, M + 1]
          ],
          color: k,
          fillColor: O,
          width: j ? 5 : 2
        },
        {
          type: "line",
          a: [m, b - 0.01, M + 1.85],
          b: [m, b - 0.01, M + 1.4],
          color: "#ffffff",
          width: 4
        },
        {
          type: "line",
          a: [m, b - 0.01, M + 1.22],
          b: [m, b - 0.01, M + 1.27],
          color: "#ffffff",
          width: 4
        }
      ];
      p.add({
        id: x.id,
        type: "shaped",
        shapes: C,
        activeShapes: C,
        activateCommand: A,
        dblCommand: A
      }), j && p.add({
        id: x.id + ":label",
        type: "simple",
        position: [m, b, M + 2.35],
        label: `${x.a.name} × ${x.b.name}`,
        labelBackground: "#f2c94c",
        labelColor: "#171717",
        activateCommand: A
      });
    }
    n.invalidate();
  }
}
let _e, Le, et;
const Ot = {
  open(t) {
    t.manager.revealView("nashepo.collisionfinder360/checks_panel");
  },
  mount(t) {
    const e = t.el;
    if (!e) return;
    if (Le && et === t.manager) {
      e.replaceChildren(Le);
      return;
    }
    _e?.();
    const i = document.createElement("div");
    i.style.height = "100%", e.replaceChildren(i), Le = i, et = t.manager, _e = jt(i, new $t(t));
  }
};
export {
  Ot as default
};
