const at = `<h2>Работа с проверками</h2>
<details open><summary>1. Первая проверка</summary><ol><li>Откройте проект и подключите IFC/SMDX штатными средствами Топоматик 360.</li><li>Откройте нижнюю вкладку «Проверки» и нажмите «Модели».</li><li>Нажмите «＋ Новая проверка» и задайте ей понятное имя.</li><li>Во вкладке «Выбор» оставьте галочки только у нужных файлов в А и Б. «Все модели» включено по умолчанию.</li><li>Выберите «По пересечению» или «Дублирование» и нажмите «Запустить».</li><li>Во вкладке «Результаты» дважды нажмите строку: камера направится к конфликту, элемент А будет выделен красным, элемент Б — синим, и оба элемента станут выделенными в 3D-окне.</li></ol><p>Первое обновление без созданной проверки получает только список файлов. При запуске индексируются модели, отмеченные хотя бы в одной стороне. Файл проекта WDX служит контейнером и в выбор моделей не попадает.</p></details>
<details><summary>2. Выбор моделей и сохранённые наборы</summary><p>Выбор А и выбор Б задают две стороны сравнения. Снимите «Все модели» и отметьте конкретные IFC/SMDX. Для поиска дубликатов внутри одного файла отметьте его с обеих сторон.</p><p>Часто используемый состав можно сохранить как набор моделей, а затем применить в другой проверке. Наборы входят в файл проверок. Состав выборки задаётся галочками моделей и ручным выделением объектов.</p><p>IFC GUID читается из свойства <code>ifc.id</code>; также поддерживаются GlobalId, IfcGuid и GUID.</p></details>
<details><summary>3. Работа с выделением в 3D</summary><p>Сначала выделите элементы штатными средствами в 3D-окне, затем используйте кнопку в нужной стороне:</p><ul><li><b>Показать выбранные элементы</b> — выделяет весь текущий состав.</li><li><b>Только выделенные в 3D</b> — оставляет только выделенные объекты.</li><li><b>＋ Добавить из 3D</b> — добавляет выделенные объекты к моделям.</li><li><b>− Исключить из 3D</b> — исключает выделенные объекты.</li><li><b>Сбросить ручной выбор</b> — снова использует отмеченные модели.</li></ul><p>Ручные идентификаторы могут измениться после замены IFC/SMDX, поэтому такую выборку следует проверить заново.</p></details>
<details><summary>4. Пересечения, глубина, касания и дубликаты</summary><p><b>Пересечение</b> рассчитывается по фактическим треугольным поверхностям. Габаритные коробки отбирают близкие пары, а общий габарит пары дополнительно ограничивает область, внутри которой берётся замер глубины.</p><p><b>Расчётная глубина Hard Clash</b> — это наименьшая толщина области перекрытия. Направления для замера берутся от граней, сошедшихся в контакте, плюс три оси координат. Вдоль каждого направления оба тела дают тень; общая часть двух теней показывает, насколько одно тело зашло в другое в этом направлении. Глубиной становится наименьшее значение по всем направлениям. Проецируется только геометрия, попавшая в общий габарит пары, и проекции обрезаются по его границам.</p><p>Поэтому значение не зависит ни от густоты сетки, ни от размеров элементов: труба одного диаметра даёт одну и ту же глубину и на грубой, и на подробной модели, а длина стержня, проходящего сквозь плиту, на результат не влияет. Далеко отнесённая часть составного объекта тоже не завышает глубину.</p><p>Это именно перекрытие тел, а не длина перемещения, которое их разведёт: чтобы вынуть стержень из плиты, его надо вытянуть на всю длину, и к тяжести конфликта это отношения не имеет. Объём пересечения вместо глубины не используется: одинаковый объём может означать совсем разные конфликты.</p><p>Одна пара элементов формирует один результат. Точкой коллизии становится контакт, ближайший к середине области перекрытия. Несколько несвязанных областей одной пары отдельно не группируются.</p><p>«Точность расчёта» — геометрическая погрешность, а «Минимальная глубина» — пользовательский допуск для исключения небольших конфликтов. Нулевую глубину получают только касания, и лишь когда включён их учёт: без этого касание в результат не попадает вовсе. Труба и отвод могут пересекаться в штатном соединении из-за фасеточной аппроксимации круглых поверхностей; такие соединения исключаются правилами. <b>Дублирование</b> ищет совпадающие треугольники в одинаковых мировых координатах.</p></details>
<details><summary>5. Составные объекты и неполная геометрия</summary><p>Один IFC-объект может состоять из нескольких частей. Чтобы не сравнивать его части между собой, включите «Не проверять геометрию одного составного объекта» во вкладке «Правила». Там же можно исключить пары одной модели или одинакового значения свойства.</p><p>Пустые и неполные геометрические части пропускаются, а пригодные части модели продолжают участвовать. Плагин показывает сводное замечание с количеством пропущенных элементов. Незагруженный подключённый файл блокирует расчёт только тогда, когда он входит в выборку.</p></details>
<details><summary>6. Результаты и состояния</summary><p>«Новый» найден впервые, «Активный» найден повторно, «Проверенный» рассмотрен, «Подтверждённый» подтверждён, «Исключённый» исключён из работы. «Исправленный» означает, что пара исчезла при повторном расчёте с теми же правилами; состояние можно изменить вручную.</p><p>В таблице доступны IFC GUID, расчётная глубина, назначение и комментарий. Галочки меняют состояние сразу у нескольких строк. Значения можно выделять и копировать. При переходе стрелками активная строка автоматически прокручивается в видимую область. Состояние «Устарела» у проверки означает, что после последнего расчёта изменили её тип, выборки, параметры или правила.</p></details>
<details><summary>7. Отчёт и снимки</summary><p>После перехода к коллизии отсутствующий снимок создаётся автоматически, если пользователь задержался на результате. Кадр строится от той же камеры приближения, что и снимки отчёта: ракурс задаёт «Дистанция камеры» в настройках. Если дистанцию изменить, отчёт переснимет прежние кадры под новое значение. Быстрое переключение стрелками отменяет лишние снимки. Во время технической перерисовки поверх 3D-окна сохраняется предыдущий кадр, поэтому модель не должна мигать.</p><p>Кнопка «Снимок пары» сохраняет текущий ракурс только с двумя элементами коллизии: элемент А показан красным, элемент Б — синим. Такой кадр собран вручную, поэтому отчёт его не переснимает. На время подготовки отчёта нижняя панель автоматически уменьшается для широкого 3D-кадра и затем возвращается к прежнему размеру. Файл сессии предназначен для открытия результатов в плагине «НашеПО · Коллизии».</p></details>
<details><summary>8. Проекты, сохранение и очистка</summary><p>В пределах открытой страницы каждый проект получает собственный список проверок. Сворачивание или повторное открытие нижней панели сохраняет проверки, результаты и комментарии в текущей вкладке. При переключении проекта данные предыдущего не подмешиваются. «Очистить проект» удаляет проверки, результаты и наборы только у текущего проекта.</p><p>«Сохранить проверки» записывает правила, наборы моделей, результаты, комментарии и снимки в JSON. «Открыть проверки» загружает этот файл. Геометрия в файл не входит: соответствующие модели надо открыть отдельно. После обновления или закрытия страницы для продолжения работы используйте сохранённый файл.</p></details>
<details><summary>9. Большие проекты</summary><p>Жёсткого предела в 6 млн треугольников нет. При запуске строится индекс только по отмеченным моделям. Точная геометрия передаётся в расчёт по мере появления близких пар в компактном индексированном виде.</p><p>Время и память всё равно зависят от состава выборок и числа потенциальных пар. Разделяйте проверки по моделям и системам. В сцене одновременно показывается до 3000 знаков; при 50 000 результатах расчёт останавливается без замены прежнего результата.</p></details>`;
function st(t) {
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
const rt = "0.4.0", Ae = (t) => typeof t == "string" && /^data:image\/(jpeg|png);base64,[A-Za-z0-9+/=]+$/.test(t), be = {
  new: "Новый",
  active: "Активный",
  reviewed: "Проверенный",
  approved: "Подтверждённый",
  resolved: "Исправленный",
  excluded: "Исключённый"
}, Ge = () => ({
  models: [],
  modelsMode: "all",
  conditions: [],
  mode: "all",
  include: [],
  exclude: []
}), lt = () => ({
  id: crypto.randomUUID(),
  name: "Новая проверка",
  type: "intersection",
  a: Ge(),
  b: Ge(),
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
}), Ye = ({
  triangles: t,
  vertices: e,
  indices: i,
  triangleCount: s,
  closed: r,
  bounds: n,
  ...a
}) => a;
function je(t, e) {
  return e.exclude.includes(t.id) ? !1 : e.include.includes(t.id) ? !0 : !(e.manualOnly || e.modelsMode === "selected" && !e.models.includes(t.modelId) || e.modelsMode === void 0 && e.models.length && !e.models.includes(t.modelId));
}
const dt = (t) => JSON.stringify([
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
]), ct = (t, e) => JSON.stringify([t, e].sort());
function pt(t, e, i) {
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
function Ke(t) {
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
      if (n?.image !== void 0 && !Ae(n.image))
        throw Error("Некорректный снимок результата.");
      if (n?.imageScope !== void 0 && n.imageScope !== "pair" && n.imageScope !== "pair-ab")
        throw Error("Некорректный состав снимка результата.");
      if (n?.imageDistance !== void 0 && (!Number.isFinite(n.imageDistance) || n.imageDistance < 0.5))
        throw Error("Некорректная дистанция снимка результата.");
      if (!n || typeof n.id != "string" || !Object.hasOwn(be, n.state) || n.penetrationMm !== void 0 && (!Number.isFinite(n.penetrationMm) || n.penetrationMm < 0) || !Array.isArray(n.point) || n.point.length !== 3 || !n.point.every(Number.isFinite))
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
const W = (t, e) => [t[0] - e[0], t[1] - e[1], t[2] - e[2]], Be = (t, e, i = 1) => [
  t[0] + e[0] * i,
  t[1] + e[1] * i,
  t[2] + e[2] * i
], de = (t, e) => t[0] * e[0] + t[1] * e[1] + t[2] * e[2], Ie = (t, e) => [
  t[1] * e[2] - t[2] * e[1],
  t[2] * e[0] - t[0] * e[2],
  t[0] * e[1] - t[1] * e[0]
], ae = (t) => Math.hypot(...t), ut = (t) => {
  const e = ae(t);
  return e > 1e-20 ? [t[0] / e, t[1] / e, t[2] / e] : void 0;
}, Me = (t) => t.triangleCount ?? (t.indices ? t.indices.length / 3 : t.triangles.length / 9), ue = (t, e, i) => t.indices && t.vertices ? t.vertices[t.indices[e * 3 + Math.floor(i / 3)] * 3 + i % 3] : t.triangles[e * 9 + i], Se = (t, e) => [0, 3, 6].map((i) => [
  ue(t, e, i),
  ue(t, e, i + 1),
  ue(t, e, i + 2)
]);
function De(t) {
  const e = [1 / 0, 1 / 0, 1 / 0], i = [-1 / 0, -1 / 0, -1 / 0];
  for (let s = 0; s < t.length; s++) {
    const r = s % 3;
    e[r] = Math.min(e[r], t[s]), i[r] = Math.max(i[r], t[s]);
  }
  return { min: e, max: i };
}
const Ce = (t, e, i) => t.min.every((s, r) => s <= e.max[r] + i && t.max[r] >= e.min[r] - i);
function Pe(t, e) {
  const i = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const p of e)
    for (let h = 0; h < 9; h++) {
      const m = h % 3, u = ue(t, p, h);
      i.min[m] = Math.min(i.min[m], u), i.max[m] = Math.max(i.max[m], u);
    }
  if (e.length <= 12) return { ...i, ids: e };
  const s = i.max.map((p, h) => p - i.min[h]), r = s.indexOf(Math.max(...s)), n = (p) => ue(t, p, r) + ue(t, p, r + 3) + ue(t, p, r + 6);
  e.sort((p, h) => n(p) - n(h));
  const a = e.length >> 1;
  return {
    ...i,
    left: Pe(t, e.slice(0, a)),
    right: Pe(t, e.slice(a))
  };
}
function* ke(t, e, i) {
  Ce(t, e, i) && (t.ids ? yield* t.ids : (yield* ke(t.left, e, i), yield* ke(t.right, e, i)));
}
function* xe(t, e, i) {
  if (Ce(t, e, i)) {
    if (t.ids && e.ids) {
      for (const s of t.ids) for (const r of e.ids) yield [s, r];
      return;
    }
    if (t.ids) {
      yield* xe(t, e.left, i), yield* xe(t, e.right, i);
      return;
    }
    if (e.ids) {
      yield* xe(t.left, e, i), yield* xe(t.right, e, i);
      return;
    }
    yield* xe(t.left, e.left, i), yield* xe(t.left, e.right, i), yield* xe(t.right, e.left, i), yield* xe(t.right, e.right, i);
  }
}
function Le(t, e) {
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
    left: Le(t, e.slice(0, n)),
    right: Le(t, e.slice(n))
  };
}
function Re(t, e, i, s) {
  const r = W(e, t), n = W(i[1], i[0]), a = W(i[2], i[0]), p = Ie(r, a), h = de(n, p);
  if (Math.abs(h) <= 1e-12 * ae(r) * ae(n) * ae(a)) return;
  const m = 1 / h, u = W(t, i[0]), f = de(u, p) * m, w = Ie(u, n), M = de(r, w) * m, I = de(a, w) * m, E = s / Math.max(ae(n), ae(a), s);
  if (f >= -E && M >= -E && f + M <= 1 + E && I >= -E && I <= 1 + E)
    return Be(t, r, Math.max(0, Math.min(1, I)));
}
function mt(t, e, i, s) {
  const r = i.map(Math.abs).indexOf(Math.max(...i.map(Math.abs))), n = [0, 1, 2].filter((h) => h !== r), a = (h, m, u) => (m[n[0]] - h[n[0]]) * (u[n[1]] - h[n[1]]) - (m[n[1]] - h[n[1]]) * (u[n[0]] - h[n[0]]), p = (h, m) => {
    const u = m.map((f, w) => a(f, m[(w + 1) % 3], h));
    return u.every((f) => f >= -s * ae(i)) || u.every((f) => f <= s * ae(i));
  };
  for (const h of t) if (p(h, e)) return h;
  for (const h of e) if (p(h, t)) return h;
  for (let h = 0; h < 3; h++)
    for (let m = 0; m < 3; m++) {
      const u = t[h], f = t[(h + 1) % 3], w = e[m], M = e[(m + 1) % 3], I = W(f, u), E = W(M, w), $ = I[n[0]] * E[n[1]] - I[n[1]] * E[n[0]];
      if (Math.abs($) < 1e-18) continue;
      const O = W(w, u), ie = (O[n[0]] * E[n[1]] - O[n[1]] * E[n[0]]) / $, z = (O[n[0]] * I[n[1]] - O[n[1]] * I[n[0]]) / $;
      if (ie >= 0 && ie <= 1 && z >= 0 && z <= 1) return Be(u, I, ie);
    }
}
function ft(t, e, i, s) {
  const r = Ie(W(t[1], t[0]), W(t[2], t[0])), n = Ie(W(e[1], e[0]), W(e[2], e[0])), a = ae(r), p = ae(n);
  if (a < 1e-20 || p < 1e-20) return;
  const h = e.map((u) => de(W(u, t[0]), r) / a), m = t.map((u) => de(W(u, e[0]), n) / p);
  if (!(h.every((u) => u > i) || h.every((u) => u < -i) || m.every((u) => u > i) || m.every((u) => u < -i))) {
    if (h.every((u) => Math.abs(u) <= i) && m.every((u) => Math.abs(u) <= i))
      return s ? mt(t, e, r, i) : void 0;
    if (!(!s && (!(Math.min(...h) < -i && Math.max(...h) > i) || !(Math.min(...m) < -i && Math.max(...m) > i))))
      for (let u = 0; u < 3; u++) {
        const f = Re(t[u], t[(u + 1) % 3], e, i);
        if (f) return f;
        const w = Re(e[u], e[(u + 1) % 3], t, i);
        if (w) return w;
      }
  }
}
class ht {
  // The shared box bounds the contact along X, Y and Z whatever the shapes are,
  // so those three directions are always worth measuring.
  items = /* @__PURE__ */ new Map([
    ["10000,0,0", [1, 0, 0]],
    ["0,10000,0", [0, 1, 0]],
    ["0,0,10000", [0, 0, 1]]
  ]);
  add(e) {
    if (this.items.size >= 256) return;
    const i = ut(Ie(W(e[1], e[0]), W(e[2], e[0])));
    if (!i) return;
    const r = i[0] < -1e-9 || Math.abs(i[0]) <= 1e-9 && (i[1] < -1e-9 || Math.abs(i[1]) <= 1e-9 && i[2] < 0) ? [-i[0], -i[1], -i[2]] : [i[0], i[1], i[2]];
    this.items.set(r.map((n) => Math.round(n * 1e4)).join(","), r);
  }
  addFrom(e, i) {
    for (const s of i) this.add(Se(e, s));
  }
  values() {
    return [...this.items.values()];
  }
}
function gt(t, e, i, s, r, n) {
  const a = (m) => {
    let u = 1 / 0, f = -1 / 0;
    for (let w = 0; w < 8; w++) {
      const M = (w & 1 ? n.max[0] : n.min[0]) * m[0] + (w & 2 ? n.max[1] : n.min[1]) * m[1] + (w & 4 ? n.max[2] : n.min[2]) * m[2];
      M < u && (u = M), M > f && (f = M);
    }
    return [u, f];
  }, p = (m, u, f, w, M) => {
    let I = 1 / 0, E = -1 / 0;
    for (const $ of u)
      for (let O = 0; O < 9; O += 3) {
        const ie = ue(m, $, O) * f[0] + ue(m, $, O + 1) * f[1] + ue(m, $, O + 2) * f[2], z = ie < w ? w : ie > M ? M : ie;
        z < I && (I = z), z > E && (E = z);
      }
    return I === 1 / 0 ? [w, M] : [I, E];
  };
  let h = 1 / 0;
  for (const m of r) {
    const [u, f] = a(m), w = p(t, i, m, u, f), M = p(e, s, m, u, f), I = Math.min(w[1], M[1]) - Math.max(w[0], M[0]);
    if (I <= 0) return 0;
    I < h && (h = I);
  }
  return Number.isFinite(h) ? h : 0;
}
function xt(t, e, i) {
  const s = W(e[1], e[0]), r = W(e[2], e[0]), n = Ie(s, r), a = ae(n);
  if (a < 1e-20 || Math.abs(de(W(t, e[0]), n)) / a > i) return !1;
  const p = W(t, e[0]), h = de(s, s), m = de(s, r), u = de(r, r), f = de(p, s), w = de(p, r), M = h * u - m * m;
  if (Math.abs(M) < 1e-30) return !1;
  const I = (f * u - w * m) / M, E = (w * h - f * m) / M, $ = i / Math.max(ae(s), ae(r), i);
  return I >= -$ && E >= -$ && I + E <= 1 + $;
}
function $e(t, e, i, s) {
  if (!e.closed || t.some((f, w) => f <= e.bounds.min[w] + s || f >= e.bounds.max[w] - s))
    return !1;
  for (const f of ke(i, { min: t, max: t }, s))
    if (xt(t, Se(e, f), s)) return !1;
  const r = [1, 0.371390676, 0.52999894], n = ae(W(e.bounds.max, e.bounds.min)) * 3 + 1, a = Be(t, r, n), p = [], h = De([...t, ...a]);
  for (const f of ke(i, h, s)) {
    const w = Re(t, a, Se(e, f), s);
    if (w) {
      const M = ae(W(w, t));
      M > s && p.push(M);
    }
  }
  p.sort((f, w) => f - w);
  let m = 0, u = -1 / 0;
  for (const f of p)
    f - u > s * 2 && (m++, u = f);
  return m % 2 === 1;
}
async function bt(t, e, i, s, r) {
  const n = e.precision / 1e3;
  if (!Number.isFinite(n) || n <= 0)
    throw Error("Точность расчёта должна быть положительным числом.");
  const a = t.filter((k) => e.includeHidden || !k.hidden), p = a.filter((k) => je(k, e.a)), h = a.filter((k) => je(k, e.b));
  if (!p.length || !h.length)
    throw Error(
      "Выборка А или Б не содержит элементов. Отметьте хотя бы одну модель в каждой стороне проверки."
    );
  let m = performance.now();
  const u = async () => {
    if (s())
      throw Error("Расчёт отменён. Предыдущие результаты сохранены.");
    performance.now() - m > 16 && (await new Promise((k) => setTimeout(k, 0)), m = performance.now());
  }, f = /* @__PURE__ */ new Map(), w = (k) => {
    let A = f.get(k.id);
    return A || (A = Pe(
      k,
      Array.from({ length: Me(k) }, (Y, R) => R)
    ), f.set(k.id, A)), A;
  }, M = /* @__PURE__ */ new Map(), I = async (k) => {
    let A = M.get(k.id);
    if (A !== void 0) return A;
    const Y = [];
    for (let R = 0; R < Me(k); R++)
      Y.push(
        [0, 3, 6].map(
          (me) => [0, 1, 2].map((D) => Math.round(ue(k, R, me + D) / n)).join(",")
        ).sort().join(";")
      ), R % 9e3 === 0 && await u();
    return A = Y.sort().join("|"), M.set(k.id, A), A;
  }, E = [], $ = new Set(p.map((k) => k.id)), O = new Set(h.map((k) => k.id)), ie = Le(
    h,
    h.map((k, A) => A)
  ), z = /* @__PURE__ */ new Map();
  let V = 0;
  const U = (k) => k.triangles.byteLength + (k.vertices?.byteLength || 0) + (k.indices?.byteLength || 0) + Me(k) * 32;
  async function g(k, A) {
    if (!r) return k;
    let Y = z.get(k.id);
    if (Y)
      return z.delete(k.id), z.set(k.id, Y), Y;
    for (const [R, me] of z)
      R !== A && V > 96 * 1024 * 1024 && (z.delete(R), V -= U(me), f.delete(R), M.delete(R));
    return Y = await r(k.id), z.set(k.id, Y), V += U(Y), Y;
  }
  let se = -1 / 0;
  for (let k = 0; k < p.length; k++) {
    const A = p[k];
    performance.now() - se > 150 && (se = performance.now(), i({
      phase: "Проверка пар",
      done: k,
      total: p.length,
      found: E.length
    }));
    const Y = [...ke(ie, A.bounds, n)];
    for (let R = 0; R < Y.length; R++) {
      const me = Y[R];
      performance.now() - se > 150 && (se = performance.now(), i({
        phase: `Проверка пар · A ${k + 1}/${p.length} · кандидаты ${R + 1}/${Y.length}`,
        done: k,
        total: p.length,
        found: E.length
      }));
      const D = h[me];
      if (await u(), A.id === D.id || !Ce(A.bounds, D.bounds, n) || e.ignoreSameModel && A.modelId === D.modelId || e.ignoreSameGroup && A.modelId === D.modelId && A.properties.Объект && A.properties.Объект === D.properties.Объект || e.equalProperty && A.properties[e.equalProperty] !== void 0 && A.properties[e.equalProperty] === D.properties[e.equalProperty] || A.id > D.id && $.has(D.id) && O.has(A.id)) continue;
      const ye = ct(A.id, D.id), j = await g(A), q = await g(D, A.id);
      let F, J = "surface", K = 0;
      if (e.type === "duplicates") {
        if (Me(j) !== Me(q) || j.bounds.min.some(
          (H, N) => Math.abs(H - q.bounds.min[N]) > n || Math.abs(j.bounds.max[N] - q.bounds.max[N]) > n
        ))
          continue;
        await I(j) === await I(q) && (F = j.bounds.min.map((H, N) => (H + j.bounds.max[N]) / 2), J = "duplicate");
      } else {
        const H = w(j), N = w(q), _ = {
          min: j.bounds.min.map(
            (B, Z) => Math.max(B, q.bounds.min[Z])
          ),
          max: j.bounds.max.map(
            (B, Z) => Math.min(B, q.bounds.max[Z])
          )
        }, ce = _.min.map(
          (B, Z) => (B + _.max[Z]) / 2
        ), le = new ht();
        let pe = 1 / 0, he = 0;
        for (const [B, Z] of xe(H, N, n)) {
          const oe = Se(j, B), Q = Se(q, Z);
          if (!Ce(De(oe.flat()), De(Q.flat()), n)) continue;
          const T = ft(oe, Q, n, e.touching);
          if (T) {
            const G = ae(W(T, ce));
            (!F || G < pe) && (F = T, pe = G), le.add(oe), le.add(Q);
          }
          ++he % 256 === 0 && (performance.now() - se > 150 && (se = performance.now(), i({
            phase: `Геометрия пары · A ${k + 1}/${p.length}`,
            done: k,
            total: p.length,
            found: E.length
          })), await u());
        }
        if (!F && j.closed && q.closed) {
          const B = j.bounds.min.map(
            (Z, oe) => (Z + j.bounds.max[oe]) / 2
          );
          $e(B, j, H, n) && $e(B, q, N, n) && (F = B, J = "contained");
        }
        if (!F) {
          for (const [B, Z, oe] of [
            [j, q, N],
            [q, j, H]
          ])
            if (Z.closed) {
              for (let Q = 0; Q < Me(B) && !F; Q++) {
                const T = Se(B, Q), G = T[0].map(
                  (ge, fe) => (T[0][fe] + T[1][fe] + T[2][fe]) / 3
                );
                for (const ge of [T[0], G])
                  if ($e(ge, Z, oe, n)) {
                    F = ge, J = "contained";
                    break;
                  }
                await u();
              }
              if (F) break;
            }
        }
        if (F) {
          const B = [...ke(H, _, n)], Z = [...ke(N, _, n)];
          J !== "surface" && (le.addFrom(j, B), le.addFrom(q, Z)), await u();
          const oe = gt(j, q, B, Z, le.values(), _) * 1e3;
          if (oe <= 0 && !e.touching) continue;
          K = e.touching ? oe : Math.max(e.precision, oe), await u();
        }
        if (F && K + e.precision < e.minPenetration)
          continue;
      }
      if (F && (E.push({
        id: ye,
        a: Ye(j),
        b: Ye(q),
        point: F,
        kind: J,
        state: "new",
        note: "",
        assignee: "",
        firstSeen: "",
        lastSeen: "",
        penetrationMm: K
      }), E.length >= 5e4))
        throw Error(
          "Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат."
        );
    }
  }
  return i({
    phase: "Готово",
    done: p.length,
    total: p.length,
    found: E.length
  }), E;
}
const _e = '(function(){"use strict";const cn=({triangles:t,vertices:n,indices:i,triangleCount:f,closed:a,bounds:e,...m})=>m;function dn(t,n){return n.exclude.includes(t.id)?!1:n.include.includes(t.id)?!0:!(n.manualOnly||n.modelsMode==="selected"&&!n.models.includes(t.modelId)||n.modelsMode===void 0&&n.models.length&&!n.models.includes(t.modelId))}const hn=(t,n)=>JSON.stringify([t,n].sort()),M=(t,n)=>[t[0]-n[0],t[1]-n[1],t[2]-n[2]],Y=(t,n,i=1)=>[t[0]+n[0]*i,t[1]+n[1]*i,t[2]+n[2]*i],E=(t,n)=>t[0]*n[0]+t[1]*n[1]+t[2]*n[2],J=(t,n)=>[t[1]*n[2]-t[2]*n[1],t[2]*n[0]-t[0]*n[2],t[0]*n[1]-t[1]*n[0]],I=t=>Math.hypot(...t),yn=t=>{const n=I(t);return n>1e-20?[t[0]/n,t[1]/n,t[2]/n]:void 0},K=t=>t.triangleCount??(t.indices?t.indices.length/3:t.triangles.length/9),$=(t,n,i)=>t.indices&&t.vertices?t.vertices[t.indices[n*3+Math.floor(i/3)]*3+i%3]:t.triangles[n*9+i],B=(t,n)=>[0,3,6].map(i=>[$(t,n,i),$(t,n,i+1),$(t,n,i+2)]);function Z(t){const n=[1/0,1/0,1/0],i=[-1/0,-1/0,-1/0];for(let f=0;f<t.length;f++){const a=f%3;n[a]=Math.min(n[a],t[f]),i[a]=Math.max(i[a],t[f])}return{min:n,max:i}}const W=(t,n,i)=>t.min.every((f,a)=>f<=n.max[a]+i&&t.max[a]>=n.min[a]-i);function k(t,n){const i={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const r of n)for(let s=0;s<9;s++){const c=s%3,o=$(t,r,s);i.min[c]=Math.min(i.min[c],o),i.max[c]=Math.max(i.max[c],o)}if(n.length<=12)return{...i,ids:n};const f=i.max.map((r,s)=>r-i.min[s]),a=f.indexOf(Math.max(...f)),e=r=>$(t,r,a)+$(t,r,a+3)+$(t,r,a+6);n.sort((r,s)=>e(r)-e(s));const m=n.length>>1;return{...i,left:k(t,n.slice(0,m)),right:k(t,n.slice(m))}}function*G(t,n,i){W(t,n,i)&&(t.ids?yield*t.ids:(yield*G(t.left,n,i),yield*G(t.right,n,i)))}function*C(t,n,i){if(W(t,n,i)){if(t.ids&&n.ids){for(const f of t.ids)for(const a of n.ids)yield[f,a];return}if(t.ids){yield*C(t,n.left,i),yield*C(t,n.right,i);return}if(n.ids){yield*C(t.left,n,i),yield*C(t.right,n,i);return}yield*C(t.left,n.left,i),yield*C(t.left,n.right,i),yield*C(t.right,n.left,i),yield*C(t.right,n.right,i)}}function nn(t,n){const i={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const m of n)for(let r=0;r<3;r++)i.min[r]=Math.min(i.min[r],t[m].bounds.min[r]),i.max[r]=Math.max(i.max[r],t[m].bounds.max[r]);if(n.length<=16)return{...i,ids:n};const f=i.max.map((m,r)=>m-i.min[r]),a=f.indexOf(Math.max(...f));n.sort((m,r)=>t[m].bounds.min[a]+t[m].bounds.max[a]-(t[r].bounds.min[a]+t[r].bounds.max[a]));const e=n.length>>1;return{...i,left:nn(t,n.slice(0,e)),right:nn(t,n.slice(e))}}function tn(t,n,i,f){const a=M(n,t),e=M(i[1],i[0]),m=M(i[2],i[0]),r=J(a,m),s=E(e,r);if(Math.abs(s)<=1e-12*I(a)*I(e)*I(m))return;const c=1/s,o=M(t,i[0]),d=E(o,r)*c,u=J(o,e),y=E(a,u)*c,x=E(m,u)*c,g=f/Math.max(I(e),I(m),f);if(d>=-g&&y>=-g&&d+y<=1+g&&x>=-g&&x<=1+g)return Y(t,a,Math.max(0,Math.min(1,x)))}function gn(t,n,i,f){const a=i.map(Math.abs).indexOf(Math.max(...i.map(Math.abs))),e=[0,1,2].filter(s=>s!==a),m=(s,c,o)=>(c[e[0]]-s[e[0]])*(o[e[1]]-s[e[1]])-(c[e[1]]-s[e[1]])*(o[e[0]]-s[e[0]]),r=(s,c)=>{const o=c.map((d,u)=>m(d,c[(u+1)%3],s));return o.every(d=>d>=-f*I(i))||o.every(d=>d<=f*I(i))};for(const s of t)if(r(s,n))return s;for(const s of n)if(r(s,t))return s;for(let s=0;s<3;s++)for(let c=0;c<3;c++){const o=t[s],d=t[(s+1)%3],u=n[c],y=n[(c+1)%3],x=M(d,o),g=M(y,u),j=x[e[0]]*g[e[1]]-x[e[1]]*g[e[0]];if(Math.abs(j)<1e-18)continue;const O=M(u,o),L=(O[e[0]]*g[e[1]]-O[e[1]]*g[e[0]])/j,P=(O[e[0]]*x[e[1]]-O[e[1]]*x[e[0]])/j;if(L>=0&&L<=1&&P>=0&&P<=1)return Y(o,x,L)}}function xn(t,n,i,f){const a=J(M(t[1],t[0]),M(t[2],t[0])),e=J(M(n[1],n[0]),M(n[2],n[0])),m=I(a),r=I(e);if(m<1e-20||r<1e-20)return;const s=n.map(o=>E(M(o,t[0]),a)/m),c=t.map(o=>E(M(o,n[0]),e)/r);if(!(s.every(o=>o>i)||s.every(o=>o<-i)||c.every(o=>o>i)||c.every(o=>o<-i))){if(s.every(o=>Math.abs(o)<=i)&&c.every(o=>Math.abs(o)<=i))return f?gn(t,n,a,i):void 0;if(!(!f&&(!(Math.min(...s)<-i&&Math.max(...s)>i)||!(Math.min(...c)<-i&&Math.max(...c)>i))))for(let o=0;o<3;o++){const d=tn(t[o],t[(o+1)%3],n,i);if(d)return d;const u=tn(n[o],n[(o+1)%3],t,i);if(u)return u}}}class Mn{items=new Map([["10000,0,0",[1,0,0]],["0,10000,0",[0,1,0]],["0,0,10000",[0,0,1]]]);add(n){if(this.items.size>=256)return;const i=yn(J(M(n[1],n[0]),M(n[2],n[0])));if(!i)return;const a=i[0]<-1e-9||Math.abs(i[0])<=1e-9&&(i[1]<-1e-9||Math.abs(i[1])<=1e-9&&i[2]<0)?[-i[0],-i[1],-i[2]]:[i[0],i[1],i[2]];this.items.set(a.map(e=>Math.round(e*1e4)).join(","),a)}addFrom(n,i){for(const f of i)this.add(B(n,f))}values(){return[...this.items.values()]}}function pn(t,n,i,f,a,e){const m=c=>{let o=1/0,d=-1/0;for(let u=0;u<8;u++){const y=(u&1?e.max[0]:e.min[0])*c[0]+(u&2?e.max[1]:e.min[1])*c[1]+(u&4?e.max[2]:e.min[2])*c[2];y<o&&(o=y),y>d&&(d=y)}return[o,d]},r=(c,o,d,u,y)=>{let x=1/0,g=-1/0;for(const j of o)for(let O=0;O<9;O+=3){const L=$(c,j,O)*d[0]+$(c,j,O+1)*d[1]+$(c,j,O+2)*d[2],P=L<u?u:L>y?y:L;P<x&&(x=P),P>g&&(g=P)}return x===1/0?[u,y]:[x,g]};let s=1/0;for(const c of a){const[o,d]=m(c),u=r(t,i,c,o,d),y=r(n,f,c,o,d),x=Math.min(u[1],y[1])-Math.max(u[0],y[0]);if(x<=0)return 0;x<s&&(s=x)}return Number.isFinite(s)?s:0}function wn(t,n,i){const f=M(n[1],n[0]),a=M(n[2],n[0]),e=J(f,a),m=I(e);if(m<1e-20||Math.abs(E(M(t,n[0]),e))/m>i)return!1;const r=M(t,n[0]),s=E(f,f),c=E(f,a),o=E(a,a),d=E(r,f),u=E(r,a),y=s*o-c*c;if(Math.abs(y)<1e-30)return!1;const x=(d*o-u*c)/y,g=(u*s-d*c)/y,j=i/Math.max(I(f),I(a),i);return x>=-j&&g>=-j&&x+g<=1+j}function en(t,n,i,f){if(!n.closed||t.some((d,u)=>d<=n.bounds.min[u]+f||d>=n.bounds.max[u]-f))return!1;for(const d of G(i,{min:t,max:t},f))if(wn(t,B(n,d),f))return!1;const a=[1,.371390676,.52999894],e=I(M(n.bounds.max,n.bounds.min))*3+1,m=Y(t,a,e),r=[],s=Z([...t,...m]);for(const d of G(i,s,f)){const u=tn(t,m,B(n,d),f);if(u){const y=I(M(u,t));y>f&&r.push(y)}}r.sort((d,u)=>d-u);let c=0,o=-1/0;for(const d of r)d-o>f*2&&(c++,o=d);return c%2===1}async function In(t,n,i,f,a){const e=n.precision/1e3;if(!Number.isFinite(e)||e<=0)throw Error("Точность расчёта должна быть положительным числом.");const m=t.filter(l=>n.includeHidden||!l.hidden),r=m.filter(l=>dn(l,n.a)),s=m.filter(l=>dn(l,n.b));if(!r.length||!s.length)throw Error("Выборка А или Б не содержит элементов. Отметьте хотя бы одну модель в каждой стороне проверки.");let c=performance.now();const o=async()=>{if(f())throw Error("Расчёт отменён. Предыдущие результаты сохранены.");performance.now()-c>16&&(await new Promise(l=>setTimeout(l,0)),c=performance.now())},d=new Map,u=l=>{let h=d.get(l.id);return h||(h=k(l,Array.from({length:K(l)},(b,v)=>v)),d.set(l.id,h)),h},y=new Map,x=async l=>{let h=y.get(l.id);if(h!==void 0)return h;const b=[];for(let v=0;v<K(l);v++)b.push([0,3,6].map(Q=>[0,1,2].map(T=>Math.round($(l,v,Q+T)/e)).join(",")).sort().join(";")),v%9e3===0&&await o();return h=b.sort().join("|"),y.set(l.id,h),h},g=[],j=new Set(r.map(l=>l.id)),O=new Set(s.map(l=>l.id)),L=nn(s,s.map((l,h)=>h)),P=new Map;let rn=0;const ln=l=>l.triangles.byteLength+(l.vertices?.byteLength||0)+(l.indices?.byteLength||0)+K(l)*32;async function un(l,h){if(!a)return l;let b=P.get(l.id);if(b)return P.delete(l.id),P.set(l.id,b),b;for(const[v,Q]of P)v!==h&&rn>96*1024*1024&&(P.delete(v),rn-=ln(Q),d.delete(v),y.delete(v));return b=await a(l.id),P.set(l.id,b),rn+=ln(b),b}let D=-1/0;for(let l=0;l<r.length;l++){const h=r[l];performance.now()-D>150&&(D=performance.now(),i({phase:"Проверка пар",done:l,total:r.length,found:g.length}));const b=[...G(L,h.bounds,e)];for(let v=0;v<b.length;v++){const Q=b[v];performance.now()-D>150&&(D=performance.now(),i({phase:`Проверка пар · A ${l+1}/${r.length} · кандидаты ${v+1}/${b.length}`,done:l,total:r.length,found:g.length}));const T=s[Q];if(await o(),h.id===T.id||!W(h.bounds,T.bounds,e)||n.ignoreSameModel&&h.modelId===T.modelId||n.ignoreSameGroup&&h.modelId===T.modelId&&h.properties.Объект&&h.properties.Объект===T.properties.Объект||n.equalProperty&&h.properties[n.equalProperty]!==void 0&&h.properties[n.equalProperty]===T.properties[n.equalProperty]||h.id>T.id&&j.has(T.id)&&O.has(h.id))continue;const bn=hn(h.id,T.id),p=await un(h),q=await un(T,h.id);let S,R="surface",sn=0;if(n.type==="duplicates"){if(K(p)!==K(q)||p.bounds.min.some((z,A)=>Math.abs(z-q.bounds.min[A])>e||Math.abs(p.bounds.max[A]-q.bounds.max[A])>e))continue;await x(p)===await x(q)&&(S=p.bounds.min.map((z,A)=>(z+p.bounds.max[A])/2),R="duplicate")}else{const z=u(p),A=u(q),U={min:p.bounds.min.map((w,_)=>Math.max(w,q.bounds.min[_])),max:p.bounds.max.map((w,_)=>Math.min(w,q.bounds.max[_]))},qn=U.min.map((w,_)=>(w+U.max[_])/2),V=new Mn;let mn=1/0,_n=0;for(const[w,_]of C(z,A,e)){const F=B(p,w),H=B(q,_);if(!W(Z(F.flat()),Z(H.flat()),e))continue;const N=xn(F,H,e,n.touching);if(N){const X=I(M(N,qn));(!S||X<mn)&&(S=N,mn=X),V.add(F),V.add(H)}++_n%256===0&&(performance.now()-D>150&&(D=performance.now(),i({phase:`Геометрия пары · A ${l+1}/${r.length}`,done:l,total:r.length,found:g.length})),await o())}if(!S&&p.closed&&q.closed){const w=p.bounds.min.map((_,F)=>(_+p.bounds.max[F])/2);en(w,p,z,e)&&en(w,q,A,e)&&(S=w,R="contained")}if(!S){for(const[w,_,F]of[[p,q,A],[q,p,z]])if(_.closed){for(let H=0;H<K(w)&&!S;H++){const N=B(w,H),X=N[0].map((an,fn)=>(N[0][fn]+N[1][fn]+N[2][fn])/3);for(const an of[N[0],X])if(en(an,_,F,e)){S=an,R="contained";break}await o()}if(S)break}}if(S){const w=[...G(z,U,e)],_=[...G(A,U,e)];R!=="surface"&&(V.addFrom(p,w),V.addFrom(q,_)),await o();const F=pn(p,q,w,_,V.values(),U)*1e3;if(F<=0&&!n.touching)continue;sn=n.touching?F:Math.max(n.precision,F),await o()}if(S&&sn+n.precision<n.minPenetration)continue}if(S&&(g.push({id:bn,a:cn(p),b:cn(q),point:S,kind:R,state:"new",note:"",assignee:"",firstSeen:"",lastSeen:"",penetrationMm:sn}),g.length>=5e4))throw Error("Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат.")}}return i({phase:"Готово",done:r.length,total:r.length,found:g.length}),g}let vn=0;const on=new Map;self.onmessage=async t=>{if(t.data.request!==void 0){const n=on.get(t.data.request);on.delete(t.data.request),t.data.error?n?.reject(Error(t.data.error)):n?.resolve(t.data.geometry);return}try{const{elements:n,check:i}=t.data,f=await In(n,i,a=>self.postMessage({progress:a}),()=>!1,t.data.streaming?a=>new Promise((e,m)=>{const r=vn++;on.set(r,{resolve:e,reject:m}),self.postMessage({load:a,request:r})}):void 0);self.postMessage({results:f})}catch(n){self.postMessage({error:n instanceof Error?n.message:String(n)})}}})();\n', Ze = typeof self < "u" && self.Blob && new Blob(["(self.URL || self.webkitURL).revokeObjectURL(self.location.href);", _e], { type: "text/javascript;charset=utf-8" });
function yt(t) {
  let e;
  try {
    if (e = Ze && (self.URL || self.webkitURL).createObjectURL(Ze), !e) throw "";
    const i = new Worker(e, {
      name: t?.name
    });
    return i.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(e);
    }), i;
  } catch {
    return new Worker(
      "data:text/javascript;charset=utf-8," + encodeURIComponent(_e),
      {
        name: t?.name
      }
    );
  }
}
const X = (t) => String(t ?? "").replace(
  /[&<>"']/g,
  (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[e]
);
function Qe(t, e) {
  const i = URL.createObjectURL(
    new Blob([e], {
      type: t.endsWith(".html") ? "text/html;charset=utf-8" : "application/json;charset=utf-8"
    })
  ), s = document.createElement("a");
  s.href = i, s.download = t, s.click(), setTimeout(() => URL.revokeObjectURL(i), 6e4);
}
function wt(t, e) {
  const i = X;
  return `<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${i(t.name)}</title><style>body{font:14px/1.5 system-ui;margin:24px;background:#171c23;color:#e6edf5}h1{margin:0}small{color:#a9b7c8}input,select{padding:10px;margin:15px 8px 15px 0;max-width:100%;background:#242e3b;color:inherit;border:1px solid #506074;border-radius:6px}.wrap{overflow:auto}table{border-collapse:separate;border-spacing:0;width:100%}td,th{padding:10px;border-bottom:1px solid #39475a;min-width:100px;vertical-align:top;overflow-wrap:anywhere}th{background:#253142;position:sticky;top:0;text-align:left;white-space:normal}td{max-width:350px}tr[hidden]{display:none}.shot{display:block;width:260px;border:0;background:transparent;padding:0;cursor:zoom-in}dialog{width:min(94vw,1400px);border:1px solid #506074;background:#20242b;color:white;border-radius:10px}dialog img{max-width:100%;max-height:80vh;display:block;margin:12px auto}dialog::backdrop{background:#000b}.shot img{width:100%;border-radius:6px}.legend{margin:12px 0}.red{color:#ff6161}.blue{color:#65baff}@media print{input,select{display:none}body{background:white;color:black}.wrap{overflow:visible}th{position:static;background:#eee}}</style><h1>${i(t.name)}</h1><small>НашеПО · Проверки коллизий · ${i(t.lastRun || "")} · ${t.status === "stale" ? "Результат устарел" : "Последний завершённый расчёт"}</small><p>${i(t.type === "duplicates" ? "Совпадение треугольной геометрии" : "Пересечения поверхностей и вложенность замкнутых тел")}. Точность: ${i(t.precision)} мм${t.type === "intersection" ? `; минимальная глубина: ${i(t.minPenetration)} мм` : ""}. Глубина Hard Clash — наименьшая толщина области перекрытия, замеренная вдоль граней контакта и осей координат. Значение не зависит от густоты треугольной сетки и от размеров элементов.</p><p class="legend"><span class="red">● Элемент А выделен красным</span> · <span class="blue">● элемент Б — синим</span></p><input id="search" type="search" placeholder="Поиск по всему отчёту"><select id="state"><option value="">Все состояния</option>${Object.entries(
    be
  ).map(([s, r]) => `<option value="${s}">${r}</option>`).join(
    ""
  )}</select>${t.type === "intersection" ? '<input id="depth" type="number" min="0" step="1" placeholder="Глубина от, мм">' : ""}<span id="count"></span><div class="wrap"><table><thead><tr>${["Снимок", "№", "Состояние", "Глубина, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "X", "Y", "Z", "Назначение", "Комментарий"].map((s) => `<th>${s}</th>`).join("")}</tr></thead><tbody>${e.map((s, r) => `<tr data-state="${s.state}" data-depth="${s.penetrationMm ?? 0}"><td>${Ae(s.image) ? `<button class="shot" type="button"><img src="${s.image}" alt="Снимок конфликта ${r + 1}" loading="lazy"></button>` : "Снимок отсутствует"}</td>${[r + 1, be[s.state], t.type === "duplicates" ? "—" : (s.penetrationMm ?? 0).toFixed(1), s.a.name, s.a.model, s.a.guid, s.b.name, s.b.model, s.b.guid, ...s.point.map((n) => n.toFixed(4)), s.assignee, s.note].map((n) => `<td>${i(n)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><dialog id="picture"><button id="close-picture">Закрыть</button><img id="full-picture" alt="Снимок конфликта"></dialog><script>const modal=document.getElementById("picture");document.getElementById("close-picture").onclick=()=>modal.close();for(const b of document.querySelectorAll(".shot"))b.onclick=()=>{document.getElementById("full-picture").src=b.querySelector("img").src;modal.showModal()};const q=document.getElementById('search'),s=document.getElementById('state'),d=document.getElementById('depth'),rows=[...document.querySelectorAll('tbody tr')];function filter(){let n=0;for(const r of rows){r.hidden=!!((s.value&&r.dataset.state!==s.value)||(d&&Number(r.dataset.depth)<Number(d.value||0))||!r.textContent.toLowerCase().includes(q.value.toLowerCase()));if(!r.hidden)n++}document.getElementById('count').textContent='Коллизий: '+n}q.oninput=s.onchange=filter;if(d)d.oninput=filter;filter()<\/script></html>`;
}
function vt(t, e) {
  return JSON.stringify(
    {
      version: 1,
      id: t.id,
      name: t.name,
      images: Object.fromEntries(
        e.filter((i) => Ae(i.image)).map((i) => [i.id + ".jpg", i.image])
      ),
      warnings: t.warnings,
      tests: [
        {
          id: t.id,
          name: t.name,
          clashes: e.map((i, s) => ({
            id: i.id,
            name: `Конфликт ${s + 1}`,
            distance: t.type === "duplicates" ? "" : `${(i.penetrationMm ?? 0).toFixed(1)} мм`,
            date: t.lastRun || "",
            description: t.type === "duplicates" ? "Дублирование" : "По пересечению",
            status: be[i.state],
            group: i.assignee,
            note: i.note,
            point: i.point,
            image: Ae(i.image) ? i.id + ".jpg" : "",
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
              "Расчётная глубина пересечения, мм": String(i.penetrationMm ?? 0)
            }
          }))
        }
      ]
    },
    null,
    2
  );
}
const kt = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAydpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAzIDc5Ljk2OTBhODdmYywgMjAyNS8wMy8wNi0yMDo1MDoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDZFQkU2NEQ4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDZFQkU2NEM4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI2LjExIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRENDVBNjQzODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRENDVBNjQ0ODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+pHX+ogAAD+lJREFUeNrs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", Mt = ":host{display:block;height:100%;color-scheme:dark;font:13px/1.4 Segoe UI,sans-serif;color:#dbe5f0;container-type:size}*{box-sizing:border-box}[hidden]{display:none!important}main{height:100%;min-height:260px;background:#171d25;display:flex;flex-direction:column;overflow:hidden;-webkit-user-select:none;user-select:none}button,input,select,textarea{font:inherit;color:inherit;border:1px solid #425165;border-radius:6px;background:#253140;padding:7px 9px;min-width:0}button{cursor:pointer;white-space:nowrap}button:hover{background:#354459}button:disabled{opacity:.45;cursor:default}.primary{background:#b99a38;border-color:#d0ae46;color:#111820;font-weight:600}.primary:hover{background:#e0bd51}button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid #f2c94c;outline-offset:1px}input,select,textarea{background:#111a24}input,textarea,td,dd{-webkit-user-select:text;user-select:text}input[type=checkbox]{accent-color:#e6c354;width:16px;height:16px}header{display:flex;gap:7px;align-items:center;padding:8px 12px;border-bottom:1px solid #354459;flex-shrink:0;overflow-x:auto}.brand{display:flex;gap:7px;align-items:center;margin-right:8px}.brand img{width:32px;height:32px;object-fit:contain}.brand b{font-size:17px}.brand small{font-size:10px;color:#a6b5c7}#dirty{margin-left:auto;font-size:11px;color:#cabb81;white-space:nowrap}.notice{background:#1c2735;padding:5px 12px;font-size:12px;min-height:27px;max-height:70px;overflow:auto;color:#a7bbd1}.notice.error{color:#ffaaa1;background:#412725}.workspace{display:grid;grid-template-columns:230px minmax(0,1fr);flex:1;min-height:0}aside{padding:10px;display:flex;flex-direction:column;gap:9px;border-right:1px solid #354459;min-height:0}#checks{overflow:auto;flex:1;min-height:0}.check-item{display:flex;flex-direction:column;gap:5px;width:100%;margin-bottom:5px;text-align:left;white-space:normal}.check-item small{color:#a8b7ca}.check-item.active,.tabs .active{border-color:#c7ab56;background:#403b2c;color:#ffe399}.main{display:flex;flex-direction:column;min-width:0;min-height:0}.test-toolbar{display:flex;gap:7px;padding:8px 12px;align-items:center}.test-toolbar input{flex:1;font-weight:600}.tabs{display:flex;gap:7px;border-bottom:1px solid #354459;padding:0 12px 8px}.tabs button{min-width:105px}#content{flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column}.empty{padding:28px;color:#a4b4c9;text-align:center;margin:auto}h2,h3,p{margin:0 0 10px}h2{font-size:20px}h3{font-size:15px}label{display:flex;flex-direction:column;gap:5px;font-size:12px;color:#b8c6d7}.check{flex-direction:row;align-items:center;gap:6px}small{font-size:11px;color:#a8b7c9}.parameters{display:flex;gap:18px;align-items:end;padding:10px 12px}.parameters input{width:140px}.selection-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0 12px 12px}.selection{border:1px solid #39495e;border-radius:8px;padding:12px;background:#1b2633;min-width:0}.selection h3{display:flex;justify-content:space-between}.selection h3 span{color:#92c4b2;font-size:12px}.selection select[multiple]{width:100%;min-height:70px}.selection-tools{display:flex;gap:5px;flex-wrap:wrap;margin:8px 0}.selection-tools button{font-size:11px;padding:5px 7px}.selection>label{margin-bottom:8px}.condition{display:grid;grid-template-columns:minmax(80px,1fr) 100px minmax(70px,1fr) 29px;gap:5px;margin:6px 0}.condition button{padding:3px}.rules,.report{padding:18px;max-width:850px}.rules>label{margin:14px 0}.rules>p,.report>p{color:#a9b8cb}.report>button{margin:12px 8px 14px 0}.result-tools{display:flex;gap:7px;flex-wrap:wrap;padding:8px 12px}.result-tools input{flex:1;min-width:180px}.result-area{display:grid;grid-template-columns:minmax(0,1fr) 300px;flex:1;min-height:0}.table-area{display:flex;flex-direction:column;min-width:0;min-height:0}.scroll{overflow:auto;flex:1;min-height:0}table{border-collapse:separate;border-spacing:0;width:max-content;min-width:100%}th{position:sticky;top:0;background:#2a3748;z-index:1;text-align:left;max-width:240px;white-space:normal}th,td{padding:8px;border-bottom:1px solid #344154;vertical-align:top}td{max-width:320px;min-width:90px;overflow-wrap:anywhere;-webkit-user-select:text;user-select:text}td:first-child{min-width:36px}tr.active td{background:#453e29;color:#fff0b5}tr:hover td{background:#2c3847}.pager{display:flex;gap:10px;align-items:center;justify-content:center;padding:5px;border-top:1px solid #39495e;font-size:11px}.pager button{padding:2px 8px}.detail{border-left:1px solid #354459;padding:10px;overflow:auto}.detail h3{overflow-wrap:anywhere}.detail>label{margin:10px 0}.detail p{font:11px/1.5 Consolas,monospace}.detail details{border-top:1px solid #354459;padding:8px 0}summary{cursor:pointer}dl{font-size:11px;display:grid;grid-template-columns:1fr 1fr;gap:7px}dt,dd{overflow-wrap:anywhere;margin:0}dt{color:#9baec4}footer{border-top:1px solid #354459;padding:4px 12px;display:flex;justify-content:space-between;color:#91a4bb;font-size:11px}dialog{border:1px solid #53647c;border-radius:12px;background:#202c3a;color:#dbe5f0;width:min(700px,92vw);max-height:85vh;padding:20px;box-shadow:0 15px 60px #000a}dialog::backdrop{background:#000a}dialog p{margin:12px 0}dialog a{color:#f2c94c;margin-right:12px}.dialog-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:16px}@container (max-width:950px){.workspace{grid-template-columns:185px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 240px}.selection-grid{grid-template-columns:1fr}.parameters,.test-toolbar{flex-wrap:wrap}.test-toolbar input{flex-basis:100%}}@container (max-height:400px){header{padding:5px 10px}.test-toolbar{padding:5px 10px}.tabs{padding-bottom:5px}.brand img{width:25px;height:25px}footer{display:none}}:host{font-size:12px}.brand img{background:#e1e7ef;border-radius:5px;padding:3px}.selection-tools button{font-size:12px}label{font-size:13px}.choose-layout{display:grid;grid-template-columns:220px minmax(0,1fr);min-height:0;flex:1;overflow:auto}.choose-layout .parameters{display:flex;flex-direction:column;align-items:stretch;gap:15px;border-right:1px solid #354459;justify-content:flex-start}.choose-layout .parameters input{width:100%}.choose-layout .parameters input[type=checkbox]{width:16px}.choose-layout .selection-grid{padding:10px 12px;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start;min-width:0}.selection select[multiple]{height:180px;resize:vertical}.selection-mode{font-size:12px;color:#b6c4d5}.preset-row{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:9px}.preset-row select{flex:1 1 160px}.preset-row button{padding:5px 7px;font-size:12px}.model-list{height:150px;overflow:auto;border:1px solid #425165;border-radius:6px;background:#111a24;padding:5px;margin-bottom:5px}.model-list label{display:flex;flex-direction:row;align-items:center;gap:7px;padding:4px 5px;color:#dbe5f0;overflow-wrap:anywhere}.model-list label:hover{background:#253140}.model-list .model-all{position:sticky;top:-5px;z-index:1;background:#1f2b39;border-bottom:1px solid #425165;font-weight:600}.legend{display:flex;gap:12px;flex-wrap:wrap;font-family:inherit!important}.part-a{color:#ff6161}.part-b{color:#65baff}.preview{display:block;width:100%;padding:5px;margin:8px 0}.preview img{display:block;width:100%;max-height:180px;object-fit:contain}.image-dialog{width:94vw;max-width:1500px}.image-dialog img{display:block;max-width:100%;max-height:75vh;margin:10px auto}#help-dialog{width:min(1000px,94vw);line-height:1.6}#help-dialog details{padding:12px 0;border-bottom:1px solid #425165}#help-dialog summary{font-size:16px;font-weight:600;color:#f0d27a}#help-dialog li{margin:8px 0}@container (max-width:1100px){.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .selection-grid{grid-template-columns:1fr}.condition{grid-template-columns:minmax(60px,1fr) 100px minmax(60px,1fr) 29px}}@container (max-width:700px){.choose-layout{display:block}.choose-layout .parameters{border-right:0;border-bottom:1px solid #354459}.workspace{grid-template-columns:160px minmax(0,1fr)}}button,input,select,textarea{padding:5px 7px;border-radius:5px}button{min-height:27px}input[type=checkbox]{width:14px;height:14px}.commandbar{position:relative;display:flex;gap:8px;min-height:45px;padding:5px 8px;overflow:visible;background:#131b25}.brand{flex:0 0 auto;margin-right:0;gap:5px}.brand img{width:28px;height:28px}.brand b{font-size:14px}.check-heading{display:grid;grid-template-rows:25px 12px;flex:0 1 230px;min-width:145px}.check-heading input{height:25px;border:0;background:transparent;padding:2px 5px;font-weight:600}.check-heading small{padding:0 5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:9px}.tabs{align-self:stretch;align-items:center;flex:0 0 auto;gap:3px;padding:0;border:0}.tabs button{flex:0 0 auto;min-width:0;padding:5px 9px;background:transparent;border-color:transparent}.tabs .active{background:#3e3828;border-color:#b99a38}.header-actions{display:flex;align-items:center;gap:4px;margin-left:auto}#dirty{margin-left:0;width:0;height:0;overflow:visible;font-size:0}#dirty:not(:empty){width:7px;height:7px;border-radius:50%;background:#e5bd43;box-shadow:0 0 0 2px #e5bd4328}.more-menu{position:relative;z-index:20}.more-menu summary{display:grid;place-items:center;width:29px;height:29px;border:1px solid #425165;border-radius:5px;background:#253140;cursor:pointer;list-style:none;font-size:18px}.more-menu summary::-webkit-details-marker{display:none}.more-popover{position:absolute;right:0;top:calc(100% + 5px);display:grid;width:190px;gap:3px;padding:6px;border:1px solid #506176;border-radius:7px;background:#192431;box-shadow:0 12px 35px #000a}.more-popover button{text-align:left}.notice{min-height:23px;max-height:45px;padding:3px 9px;font-size:10px}.run-progress{display:grid;grid-template-columns:minmax(150px,auto) minmax(120px,1fr) auto;align-items:center;gap:8px;min-height:24px;padding:3px 9px;border-bottom:1px solid #425165;background:#202a20;color:#d9e7d2;font-size:10px}.run-bar{width:100%;height:7px;overflow:hidden;border-radius:2px;background:#101810}.run-bar i{display:block;width:0;height:100%;background:#e3bc43}#run-phase,#run-value{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#run-value{text-align:right;color:#b9c9b3}.workspace{grid-template-columns:190px minmax(0,1fr)}aside{gap:6px;padding:7px;background:#141c26}.aside-title{font-weight:600;font-size:12px}.aside-actions{display:grid;gap:5px}.check-item{gap:2px;margin-bottom:3px;padding:6px 7px}.check-item small{font-size:9px}.main{background:#171d25}#content{overflow:hidden}.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .parameters{gap:9px;padding:8px}.choose-layout .selection-grid{gap:8px;padding:8px}.selection{padding:8px}.selection h3,h3{font-size:13px;margin-bottom:6px}label{gap:3px;font-size:11px}small,.selection-tools button,.preset-row button{font-size:10px}.model-list{height:125px}.model-list label{padding:2px 4px}.selection-tools{gap:4px;margin:5px 0}.selection-tools button,.preset-row button{padding:3px 5px;min-height:23px}.result-tools{display:flex;align-items:center;justify-content:space-between;gap:6px;flex-wrap:nowrap;min-height:38px;padding:5px 7px;border-bottom:1px solid #354459;background:#151f2a}.result-filters,.bulk-tools{display:flex;align-items:center;gap:5px;min-width:0}.result-filters{flex:1}.result-filters input[type=search]{flex:1 1 190px;min-width:120px}#result-depth{flex:0 1 125px;min-width:92px}#result-count,#selection-count{color:#9fb0c4;white-space:nowrap;font-size:10px}.bulk-tools select{max-width:125px}.result-area{grid-template-columns:minmax(0,1fr) 310px}th,td{padding:5px 6px;font-size:11px;line-height:1.25}th{max-width:190px}td{max-width:260px;min-width:76px}.pager{justify-content:flex-end;min-height:29px;padding:3px 7px}.pager #selection-count{margin-right:auto}.detail{display:flex;flex-direction:column;min-width:0;padding:0;overflow:hidden;background:#141e29}.detail-head{display:flex;align-items:center;justify-content:space-between;gap:6px;min-height:47px;padding:7px 8px 4px}.detail-head>div:first-child{min-width:0}.detail-head small{color:#8093aa;letter-spacing:.08em}.detail-head h3{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin:0}.detail-nav{display:flex;gap:3px}.detail-nav button{min-width:27px;padding:2px 7px;font-size:17px}.clash-summary{display:flex;gap:5px;padding:0 8px 5px;color:#adbdcf;font-size:9px}.clash-summary span{padding-right:5px;border-right:1px solid #405064}.clash-summary span:last-child{border:0}.detail .legend{margin:0;padding:0 8px 5px;font-size:10px}.preview-slot{height:clamp(92px,18cqh,145px);flex:0 0 auto;margin:0 7px 6px;overflow:hidden;border:1px solid #37475b;border-radius:6px;background:#0e151d}.preview{position:relative;width:100%;height:100%;margin:0;padding:0;border:0;background:transparent}.preview img{width:100%;height:100%;max-height:none;object-fit:contain}.preview span{position:absolute;right:5px;bottom:5px;padding:3px 6px;border-radius:4px;background:#101923db;font-size:9px}.preview-empty,.detail-empty{height:100%;display:grid;place-content:center;justify-items:center;gap:4px;color:#788ba1}.preview-empty>span,.detail-empty>span{font-size:24px}.detail-actions{display:grid;grid-template-columns:1fr 1fr;gap:5px;padding:0 7px 7px}.detail-scroll{flex:1;min-height:0;overflow:auto;padding:7px 8px 12px;border-top:1px solid #354459}.detail-scroll>label{margin:7px 0}.detail p{font:inherit}.coordinates{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;font:9px/1.3 Consolas,monospace;color:#91a3b7}.coordinates span{overflow:hidden;text-overflow:ellipsis}.detail details{padding:6px 0}.detail dl{font-size:10px}.detail-empty{padding:20px;text-align:center}footer{padding:2px 8px;font-size:9px}@container (max-width:1050px){.workspace{grid-template-columns:165px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 270px}.check-heading{flex-basis:185px}.tabs button{padding-inline:6px}#dirty{display:none}}@container (max-width:820px){.brand b,.brand small,#result-count{display:none}.check-heading{flex-basis:155px}.result-tools{overflow-x:auto}.result-area{grid-template-columns:minmax(0,1fr) 245px}}@container (max-height:410px){.notice,footer{display:none}.preview-slot{height:90px}}", ve = /* @__PURE__ */ new WeakMap(), et = "nashepo.collisionfinder360.project.", Oe = () => ({
  format: "nashepo.checks",
  version: 1,
  checks: [],
  sets: []
}), Te = (t) => {
  if (!(!t || typeof sessionStorage > "u"))
    try {
      const e = sessionStorage.getItem(et + t);
      return e ? Ke(e) : void 0;
    } catch {
      return;
    }
}, Ve = (t, e) => {
  if (!(!t || typeof sessionStorage > "u"))
    try {
      sessionStorage.setItem(
        et + t,
        JSON.stringify(e, (i, s) => i === "image" ? void 0 : s)
      );
    } catch {
    }
};
function St(t, e) {
  const i = t.shadowRoot || t.attachShadow({ mode: "open" }), s = st(t);
  let r = e.projectToken(), n = e.projectId(), a = r && (ve.get(r) || Te(n)) || Oe();
  r && ve.set(r, a);
  let p, h = a.checks[0]?.id || "", m = "select", u = "", f = 0, w = !1, M = !1, I, E = !0, $ = !1;
  const O = /* @__PURE__ */ new Set();
  let ie, z, V = 0;
  const U = () => a.checks.find((o) => o.id === h), g = (o) => i.querySelector("#" + o);
  i.innerHTML = `<style>${Mt}</style><main><header class="commandbar"><div class="brand"><img src="${kt}" alt=""><b>НашеПО</b><small>${rt}</small></div><div class="check-heading"><input id="name" aria-label="Имя проверки" placeholder="Выберите проверку"><small id="check-summary">Проверка не выбрана</small></div><div id="tabs" class="tabs">${[
    ["select", "Выбор"],
    ["results", "Результаты"],
    ["rules", "Правила"],
    ["report", "Отчёт"]
  ].map(([o, l]) => `<button data-tab="${o}">${l}</button>`).join(
    ""
  )}</div><div class="header-actions"><button id="scan" title="Перечитать список и геометрию выбранных моделей">↻ Модели</button><button id="run" class="primary">▶ Запустить</button><button id="cancel" hidden>Остановить</button><details class="more-menu"><summary title="Другие команды">⋮</summary><div class="more-popover"><button id="open">Открыть проверки</button><button id="save">Сохранить проверки</button><button id="copy">Копировать проверку</button><button id="delete">Удалить проверку</button><button id="settings">Настройки</button><button id="help">Справка</button></div></details></div><span id="dirty"></span></header><div id="run-progress" class="run-progress" hidden><span id="run-phase">Подготовка</span><div id="run-bar" class="run-bar" role="progressbar"><i id="run-fill"></i></div><span id="run-value"></span></div><div class="notice" id="notice" role="status">Откройте IFC/SMDX в проекте и нажмите «Модели».</div><div class="workspace"><aside><div class="aside-title">Проверки</div><input id="test-search" type="search" placeholder="Поиск проверок"><div id="checks"></div><div class="aside-actions"><button id="all">Запустить все</button><button id="new" class="primary">＋ Новая проверка</button></div></aside><section class="main"><div id="content"></div></section></div><footer><span id="model-count">Модели не прочитаны</span><span>Расчёт выполняется на вашем компьютере</span></footer><input id="file" type="file" accept=".json" hidden><dialog id="settings-dialog"><h2>Настройки</h2><label>Дистанция камеры, м<input id="distance" type="number" value="15" min="0.5"></label><p class="links"><a href="https://nashepo.ru/" target="_blank" rel="noopener noreferrer">Сайт НашеПО</a><a href="https://t.me/RoburFan" target="_blank" rel="noopener noreferrer">Telegram</a></p><button data-close="settings-dialog">Закрыть</button></dialog><dialog id="help-dialog">${at}<button data-close="help-dialog">Закрыть</button></dialog><dialog id="set-dialog"><h2>Сохранить набор моделей</h2><label>Название<input id="set-name" maxlength="120"></label><div class="dialog-actions"><button id="set-cancel">Отмена</button><button id="set-confirm" class="primary">Сохранить</button></div></dialog></main>`;
  const se = document.createElement("button");
  se.id = "clear-project", se.textContent = "Очистить проект", g("save").after(se), i.querySelector(".more-popover").addEventListener(
    "click",
    () => i.querySelector(".more-menu").removeAttribute("open")
  );
  const k = (o, l = !1) => {
    g("notice").textContent = o, g("notice").classList.toggle("error", l);
  }, A = (o, l, d, c) => {
    const x = g("run-progress"), v = g("run-bar"), b = g("run-fill");
    if (x.hidden = !1, g("notice").hidden = !0, g("run-phase").textContent = o, d && d > 0 && l !== void 0) {
      const y = Math.max(0, Math.min(100, l / d * 100));
      b.style.width = `${y}%`, v.setAttribute("aria-valuemin", "0"), v.setAttribute("aria-valuemax", "100"), v.setAttribute("aria-valuenow", String(Math.round(y))), g("run-value").textContent = `${Math.round(y)}% · ${l}/${d}` + (c === void 0 ? "" : ` · найдено ${c}`);
    } else
      b.style.width = "0", v.removeAttribute("aria-valuenow"), g("run-value").textContent = c === void 0 ? "" : `Найдено ${c}`;
    v.setAttribute("aria-valuetext", g("run-value").textContent || o);
  }, Y = () => {
    g("run-progress").hidden = !0, g("notice").hidden = !1;
  }, R = async (o) => {
    try {
      await o();
    } catch (l) {
      k(l instanceof Error ? l.message : String(l), !0);
    }
  }, me = () => new Promise((o) => {
    const l = g("set-dialog"), d = g("set-name");
    let c = !1;
    const x = (v) => {
      c || (c = !0, l.close(), o(v));
    };
    d.value = "Новый набор", g("set-confirm").onclick = () => {
      const v = d.value.trim();
      v ? x(v) : d.focus();
    }, g("set-cancel").onclick = () => x(), l.oncancel = (v) => {
      v.preventDefault(), x();
    }, l.showModal(), d.focus(), d.select();
  }), D = () => {
    $ = !0, g("dirty").textContent = "Есть несохранённые изменения", r && ve.set(r, a), Ve(n, a);
  }, ye = () => {
    const o = e.projectToken();
    return !o || o === r ? !1 : (!r && (a.checks.length || a.sets.length) ? ve.set(o, a) : a = ve.get(o) || Te(e.projectId()) || Oe(), ve.set(o, a), r = o, n = e.projectId(), p = void 0, h = a.checks[0]?.id || "", u = "", O.clear(), f = 0, $ = !1, e.clear(), g("dirty").textContent = "", !0);
  }, j = () => {
    const o = U();
    o?.lastRun && (o.status = "stale"), D(), K();
  }, q = () => [
    ...new Set(
      (p?.elements || []).flatMap((o) => Object.keys(o.properties))
    )
  ].sort(), F = (o, l) => o.map(
    (d) => `<option value="${X(d)}" ${d === l ? "selected" : ""}>${X(d)}</option>`
  ).join("");
  function J() {
    const o = U(), l = g("result-search")?.value.toLowerCase() || "", d = g("result-state")?.value || "", c = Number(g("result-depth")?.value || 0);
    return (o?.results || []).filter(
      (x) => (!d || x.state === d) && (o?.type === "duplicates" || (x.penetrationMm ?? 0) >= c) && (!l || JSON.stringify({ ...x, image: void 0 }).toLowerCase().includes(l))
    );
  }
  function K() {
    const o = g("test-search").value.toLowerCase();
    g("checks").innerHTML = a.checks.filter((l) => l.name.toLowerCase().includes(o)).map(
      (l) => `<button class="check-item ${l.id === h ? "active" : ""}" data-check="${l.id}"><strong>${X(l.name)}</strong><small>${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[l.status]} · ${l.results.filter((d) => !["resolved", "excluded"].includes(d.state)).length} в работе / ${l.results.length}</small></button>`
    ).join("");
  }
  function H(o, l) {
    const d = p?.elements.filter(
      (S) => (U().includeHidden || !S.hidden) && je(S, o)
    ).length || 0, c = o.manualOnly ? le(o) : o.modelsMode === "selected" ? o.models : (p?.models || []).map((S) => S.id), x = p && c.every((S) => p.indexedModelIds.includes(S)) ? `${d} элементов` : "число после запуска", v = p?.models || [], b = o.modelsMode !== "selected", y = a.sets.map(
      (S) => `<option value="${X(S.id)}" ${o.presetId === S.id ? "selected" : ""}>${X(S.name)}</option>`
    ).join("");
    return `<article class="selection" data-side="${l}"><h3>Выбор ${l.toUpperCase()} <span data-selection-count>${x}</span></h3>${o.manualOnly ? '<p class="selection-mode">Только элементы, выбранные вручную</p>' : ""}<div class="preset-row"><select class="preset"><option value="">Набор моделей…</option>${y}</select><button data-selection="load-set">Применить</button><button data-selection="save-set">Сохранить набор</button><button data-selection="delete-set" ${o.presetId ? "" : "disabled"}>Удалить</button></div><div class="model-list"><label class="model-all"><input type="checkbox" class="all-models" ${b ? "checked" : ""}> Все модели</label>${v.map((S) => `<label><input type="checkbox" class="model-check" value="${X(S.id)}" ${b || o.models.includes(S.id) ? "checked" : ""}> ${X(S.name)}</label>`).join("") || "<small>Нажмите «Модели».</small>"}</div><small>Отметьте файлы, которые должны участвовать в выборе ${l.toUpperCase()}.</small><div class="selection-tools"><button data-selection="show">Показать выбранные элементы</button><button data-selection="only">Только выделенные в 3D</button><button data-selection="include">＋ Добавить из 3D</button><button data-selection="exclude">− Исключить из 3D</button><button data-selection="reset">Сбросить ручной выбор</button></div><small>Добавлено вручную: ${o.include.length} · исключено: ${o.exclude.length}</small></article>`;
  }
  function N() {
    K();
    const o = U();
    g("name").value = o?.name || "", g("check-summary").textContent = o ? `${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[o.status]} · ${o.results.filter((l) => !["resolved", "excluded"].includes(l.state)).length} в работе / ${o.results.length}` : "Проверка не выбрана";
    for (const l of ["name", "copy", "delete", "run"])
      g(l).disabled = !o || w;
    for (const l of i.querySelectorAll("[data-tab]"))
      l.classList.toggle("active", l.dataset.tab === m);
    if (!o) {
      g("content").innerHTML = '<div class="empty"><h2>Создайте первую проверку</h2><p>Обновите модели, затем выберите, какие элементы проверять друг с другом.</p></div>';
      return;
    }
    m === "select" && (g("content").innerHTML = `<div class="choose-layout"><div class="parameters"><h3>Параметры проверки</h3><label>Тип<select id="type"><option value="intersection" ${o.type === "intersection" ? "selected" : ""}>По пересечению</option><option value="duplicates" ${o.type === "duplicates" ? "selected" : ""}>Дублирование</option></select></label><label title="Числовая погрешность расчёта">Точность расчёта, мм<input id="precision" type="number" value="${o.precision}" min="0.001" max="100" step="0.1"></label><label title="Конфликты с меньшей оценкой глубины не попадут в результат">Минимальная глубина, мм<input id="min-penetration" type="number" value="${o.minPenetration}" min="0" max="100000" step="1" ${o.type === "duplicates" ? "disabled" : ""}></label><label class="check"><input id="touching" type="checkbox" ${o.touching ? "checked" : ""} ${o.type === "duplicates" ? "disabled" : ""}>Учитывать касания</label><small>Глубина Hard Clash — наименьшая толщина области перекрытия. Она не зависит от густоты сетки и от размеров элементов.</small><p class="legend"><span class="part-a">● Выбор А</span><span class="part-b">● Выбор Б</span></p></div><div class="selection-grid">${H(o.a, "a")}${H(o.b, "b")}</div></div><datalist id="property-fields">${F(q(), "")}</datalist>`), m === "rules" && (g("content").innerHTML = `<div class="rules"><h3>Исключение пар</h3><p>Элемент сам с собой не проверяется. Пара А/Б учитывается один раз.</p><label class="check"><input id="same-model" type="checkbox" ${o.ignoreSameModel ? "checked" : ""}>Не проверять элементы одной модели</label><label class="check"><input id="same-group" type="checkbox" ${o.ignoreSameGroup ? "checked" : ""}>Не проверять геометрию одного составного объекта</label><label>Не проверять пары с одинаковым значением свойства<input id="equal-property" list="property-fields" value="${X(o.equalProperty)}" placeholder="Без ограничения"></label><label class="check"><input id="hidden" type="checkbox" ${o.includeHidden ? "checked" : ""}>Включать скрытые элементы прочитанных моделей</label><p>Незагруженные подключённые файлы нужно открыть перед расчётом.</p><datalist id="property-fields">${F(q(), "")}</datalist></div>`), m === "results" && (g("content").innerHTML = `<div class="result-tools"><div class="result-filters"><input id="result-search" type="search" placeholder="Поиск по результатам"><select id="result-state"><option value="">Все состояния</option>${Object.entries(
      be
    ).map(([l, d]) => `<option value="${l}">${d}</option>`).join("")}</select>${o.type === "intersection" ? '<input id="result-depth" type="number" min="0" step="1" placeholder="Глубина от, мм">' : ""}<button id="show-markers" role="switch" aria-checked="${E}">${E ? "● Знаки" : "○ Знаки"}</button><span id="result-count"></span></div><div class="bulk-tools"><select id="bulk-state" title="Состояние для выбранных строк">${Object.entries(
      be
    ).map(([l, d]) => `<option value="${l}">${d}</option>`).join("")}</select><button id="bulk">Применить</button></div></div><div class="result-area"><div class="table-area"><div class="scroll" id="table"></div><div class="pager"><span id="selection-count"></span><button id="prev-page">←</button><span id="page"></span><button id="next-page">→</button></div></div><div class="detail" id="detail"></div></div>`, _(), ce()), m === "report" && (g("content").innerHTML = `<div class="report"><h3>${X(o.name)}</h3><p>Результатов: ${o.results.length}. Выбрано: ${O.size}. ${o.status === "stale" ? "Результаты устарели — рекомендуется повторный запуск." : ""}</p><label class="check"><input id="selected-only" type="checkbox" ${O.size ? "checked" : ""}>Только выбранные строки</label><label class="check"><input id="report-images" type="checkbox" checked>Добавить снимки (недостающие будут созданы автоматически)</label><button id="export-html" class="primary">Сформировать HTML-отчёт</button><button id="export-viewer">Сессия для плагина «Коллизии»</button><p>Правила и все результаты сохраняются кнопкой «Сохранить проверки» в верхней панели.</p></div>`), g("content").inert = w;
  }
  function _() {
    const o = U(), l = J(), d = Math.max(1, Math.ceil(l.length / 50));
    f = Math.max(0, Math.min(f, d - 1));
    const c = l.slice(f * 50, f * 50 + 50);
    g("table").innerHTML = l.length ? `<table><thead><tr><th><input id="check-page" type="checkbox" aria-label="Выбрать страницу" ${c.every((x) => O.has(x.id)) ? "checked" : ""}></th>${["№", "Состояние", "Глубина, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "Комментарий"].map((x) => `<th>${x}</th>`).join("")}</tr></thead><tbody>${c.map((x, v) => `<tr data-result="${X(x.id)}" class="${x.id === u ? "active" : ""}"><td><input type="checkbox" class="row-check" aria-label="Выбрать конфликт" ${O.has(x.id) ? "checked" : ""}></td>${[f * 50 + v + 1, be[x.state], o.type === "duplicates" ? "—" : (x.penetrationMm ?? 0).toFixed(1), x.a.name, x.a.model, x.a.guid || "—", x.b.name, x.b.model, x.b.guid || "—", x.note].map((b) => `<td title="${X(b)}">${X(b)}</td>`).join("")}</tr>`).join("")}</tbody></table>` : '<div class="empty">Нет результатов. Запустите проверку или измените фильтры.</div>', g("page").textContent = `${f + 1} / ${d}`, g("result-count").textContent = `${l.length} результатов`, g("selection-count").textContent = `Выбрано: ${O.size}`, g("prev-page").disabled = f === 0, g("next-page").disabled = f === d - 1;
  }
  function ce() {
    const o = U(), l = J(), d = l.findIndex((x) => x.id === u), c = o?.results.find((x) => x.id === u);
    g("detail").innerHTML = c ? `<div class="detail-head"><div><small>КОЛЛИЗИЯ</small><h3>#${d + 1} ${X(c.a.name)} × ${X(c.b.name)}</h3></div><div class="detail-nav"><button id="previous" title="Предыдущая коллизия" ${d <= 0 ? "disabled" : ""}>‹</button><button id="next" title="Следующая коллизия" ${d < 0 || d >= l.length - 1 ? "disabled" : ""}>›</button></div></div><div class="clash-summary"><span>${o?.type === "duplicates" ? "Дублирование" : "Пересечение"}</span><span title="Наименьшая толщина области перекрытия двух элементов">${o?.type === "duplicates" ? "Совпадение геометрии" : `Глубина ${(c.penetrationMm ?? 0).toFixed(1)} мм`}</span><span>${X(be[c.state])}</span></div><p class="legend"><span class="part-a">● Элемент А</span><span class="part-b">● Элемент Б</span></p><div class="preview-slot">${c.image ? `<button id="open-image" class="preview"><img src="${X(c.image)}" alt="Снимок коллизии"><span>Открыть крупнее</span></button>` : '<div class="preview-empty"><span>◫</span><small>Снимок создастся после перехода в 3D</small></div>'}</div><div class="detail-actions"><button id="focus" class="primary">Перейти в 3D</button><button id="capture-image">▣ Снимок пары</button></div><div class="detail-scroll"><div class="coordinates">${c.point.map((x, v) => `<span>${["X", "Y", "Z"][v]} ${x.toFixed(3)}</span>`).join("")}</div><label>Состояние<select id="edit-state">${Object.entries(
      be
    ).map(
      ([x, v]) => `<option value="${x}" ${c.state === x ? "selected" : ""}>${v}</option>`
    ).join(
      ""
    )}</select></label><label>Назначение<input id="assignee" value="${X(c.assignee)}"></label><label>Комментарий<textarea id="note" rows="2">${X(c.note)}</textarea></label>${[
      c.a,
      c.b
    ].map(
      (x, v) => `<details><summary>Элемент ${v ? "Б" : "А"} · свойства</summary><dl>${Object.entries(
        x.properties
      ).map(([b, y]) => `<dt>${X(b)}</dt><dd>${X(y)}</dd>`).join("")}</dl></details>`
    ).join("")}</div>` : '<div class="detail-empty"><span>◫</span><p>Выберите коллизию в таблице</p><small>Двойной щелчок сразу перенесёт камеру в 3D.</small></div>';
  }
  const le = (o) => {
    const l = new Set(
      !o.manualOnly && o.modelsMode === "selected" ? o.models : []
    );
    for (const d of o.include)
      try {
        l.add(String(JSON.parse(d)[0]));
      } catch {
        const c = p?.elements.find(
          (x) => x.id === d
        )?.modelId;
        c && l.add(c);
      }
    return [...l];
  }, pe = () => {
    const o = U();
    if (!(!o || m !== "select"))
      for (const l of i.querySelectorAll("[data-side]")) {
        const d = l.dataset.side, c = [...l.querySelectorAll(".model-check")];
        if (!c.length) continue;
        const x = c.filter((y) => y.checked).map((y) => y.value), v = x.length === c.length, b = o[d];
        b.modelsMode = v ? "all" : "selected", b.models = v ? [] : x, b.conditions = [], b.mode = "all";
      }
  }, he = (o) => {
    if (!o?.length) return;
    const l = /* @__PURE__ */ new Set();
    for (const d of o)
      for (const c of [d.a, d.b]) {
        if (!c.manualOnly && c.modelsMode !== "selected") return;
        for (const x of le(c)) l.add(x);
      }
    return l;
  }, B = (o) => {
    let l = o.trim().replace(/\\/g, "/").toLocaleLowerCase();
    try {
      l = decodeURIComponent(l);
    } catch {
    }
    l = l.replace(/[?#].*$/, "");
    const d = l.split("/").filter(Boolean).at(-1) || l;
    return /* @__PURE__ */ new Set([l, d]);
  }, Z = (o) => {
    const l = new Set(o.map((y) => y.id)), d = o.map((y) => ({
      id: y.id,
      aliases: /* @__PURE__ */ new Set([
        ...B(y.id),
        ...B(y.name)
      ])
    })), c = (y) => {
      if (l.has(y)) return y;
      const S = B(y), C = d.filter(
        (P) => [...S].some((ee) => P.aliases.has(ee))
      );
      return C.length === 1 ? C[0].id : y;
    }, x = (y) => {
      try {
        const S = JSON.parse(y);
        if (!Array.isArray(S) || S.length < 2) return y;
        const C = String(S[0]), P = c(C);
        return P === C ? y : JSON.stringify([P, ...S.slice(1)]);
      } catch {
        return y;
      }
    };
    let v = !1;
    const b = (y) => {
      const S = y.models.map(c), C = y.include.map(x), P = y.exclude.map(x);
      (S.some((ee, te) => ee !== y.models[te]) || C.some((ee, te) => ee !== y.include[te]) || P.some((ee, te) => ee !== y.exclude[te])) && (y.models = [...new Set(S)], y.include = [...new Set(C)], y.exclude = [...new Set(P)], v = !0);
    };
    for (const y of a.checks)
      b(y.a), b(y.b), y.modelsAtRun && (y.modelsAtRun = y.modelsAtRun.map(c));
    for (const y of a.sets) {
      const S = y.selection.models.map(c);
      S.some((C, P) => C !== y.selection.models[P]) && (y.selection.models = [...new Set(S)], v = !0);
    }
    return v && D(), v;
  }, oe = () => {
    const o = U();
    if (o)
      for (const l of i.querySelectorAll("[data-side]")) {
        const d = l.dataset.side, c = p?.elements.filter(
          (y) => (o.includeHidden || !y.hidden) && je(y, o[d])
        ).length || 0, x = o[d].manualOnly ? le(o[d]) : o[d].modelsMode === "selected" ? o[d].models : (p?.models || []).map((y) => y.id), v = !!p && x.every((y) => p.indexedModelIds.includes(y)), b = l.querySelector(
          "[data-selection-count]"
        );
        b && (b.textContent = v ? `${c} элементов` : "число после запуска");
      }
  };
  function Q() {
    e.markers(
      J(),
      u,
      E,
      (o) => R(() => T(o, !0))
    );
  }
  function T(o, l = !1) {
    if (!w) {
      if (u = o, m === "results") {
        const d = J().findIndex((x) => x.id === o), c = d < 0 ? f : Math.floor(d / 50);
        c !== f && (f = c, _());
        for (const x of i.querySelectorAll("[data-result]"))
          x.classList.toggle("active", x.dataset.result === o);
        ce(), requestAnimationFrame(() => {
          [...i.querySelectorAll("[data-result]")].find(
            (v) => v.dataset.result === o
          )?.scrollIntoView({ block: "nearest", inline: "nearest" });
        });
      }
      if (Q(), l) {
        const d = U()?.results.find((c) => c.id === o);
        d && (e.focus(d, Number(g("distance").value)), G(d));
      }
    }
  }
  function G(o) {
    clearTimeout(z);
    const l = ++V, d = Number(g("distance").value);
    o.image && o.imageScope === "pair-ab" && o.imageDistance === d || !e.canLocate(o) || (z = window.setTimeout(async () => {
      if (!(l !== V || w || u !== o.id))
        try {
          const c = await e.snapshot(
            o,
            d,
            () => l !== V || w || u !== o.id,
            !1,
            !1
          );
          if (l !== V || u !== o.id) return;
          o.image = c, o.imageScope = "pair-ab", o.imageDistance = d, D(), m === "results" && ce();
        } catch (c) {
          l === V && u === o.id && k(
            "Не удалось создать снимок выбранной коллизии: " + (c instanceof Error ? c.message : String(c)),
            !0
          );
        }
    }, 500));
  }
  async function ge(o) {
    M = !1, L(!0), A("Создание снимка пары");
    try {
      const l = Number(g("distance").value);
      o.image = await e.snapshot(o, l, () => M), o.imageScope = "pair-ab", o.imageDistance = l, D(), m === "results" && u === o.id && ce();
    } catch (l) {
      k(
        "Результаты сохранены. Снимок пары не создан: " + (l instanceof Error ? l.message : String(l)),
        !0
      );
    } finally {
      Y(), L(!1);
    }
  }
  async function fe(o, l = !1) {
    ye(), A("Подготовка моделей");
    let d = l ? /* @__PURE__ */ new Set() : he(o);
    if (!l && d?.size) {
      const c = await e.scan(
        (x) => A(x),
        () => M,
        /* @__PURE__ */ new Set()
      );
      p = c, Z(c.models) && (d = he(o));
    }
    p = await e.scan(
      (c) => {
        k(c), A(c);
      },
      () => M,
      d
    ), g("model-count").textContent = `Проиндексировано моделей: ${p.indexedModelIds.length} из ${p.models.length} · элементов: ${p.elements.length}`, N(), k(
      p.blockers.length ? p.blockers.join(" ") : p.warnings.length ? `Модели прочитаны с замечаниями. ${p.warnings.join(" ")}` : "Модели прочитаны. Настройте выборки и запустите проверку.",
      !!p.blockers.length
    );
  }
  const L = (o) => {
    w = o, o && (clearTimeout(z), V++);
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
      g(l).disabled = o;
    g("cancel").hidden = !o, g("content").inert = o, g("checks").inert = o;
  };
  async function re(o) {
    const l = (c) => {
      const x = `${o.name} · ${c.phase}`;
      k(`${x} ${c.done}/${c.total} · найдено ${c.found}`), A(x, c.done, c.total, c.found);
    };
    let d;
    try {
      d = new yt();
    } catch {
      return bt(
        p.elements,
        o,
        l,
        () => M,
        (c) => e.geometry(c, () => M)
      );
    }
    return I = d, new Promise((c, x) => {
      const v = () => {
        d.terminate(), I = void 0, ie = void 0;
      };
      ie = () => {
        v(), x(Error("Расчёт отменён. Предыдущие результаты сохранены."));
      }, d.onmessage = async (b) => {
        if (b.data.load) {
          try {
            const y = await e.geometry(
              b.data.load,
              () => M || I !== d
            );
            if (I !== d) return;
            const S = [
              y.vertices?.buffer,
              y.indices?.buffer
            ].filter(Boolean);
            d.postMessage(
              { request: b.data.request, geometry: y },
              S
            );
          } catch (y) {
            I === d && d.postMessage({
              request: b.data.request,
              error: y instanceof Error ? y.message : String(y)
            });
          }
          return;
        }
        b.data.progress ? l(b.data.progress) : (v(), b.data.error ? x(Error(b.data.error)) : c(b.data.results));
      }, d.onerror = (b) => {
        v(), x(
          Error(
            `Не удалось запустить расчёт в фоновом потоке: ${b.message || "ошибка загрузки"}`
          )
        );
      }, d.postMessage({
        elements: p.elements,
        streaming: typeof e.geometry == "function",
        check: structuredClone({ ...o, results: [], warnings: [] })
      });
    });
  }
  async function ne(o = !1) {
    if (w) return;
    ye(), pe();
    const l = o ? [...a.checks] : [U()].filter(Boolean);
    if (!l.length) throw Error("Создайте проверку.");
    for (const d of l)
      for (const c of [d.a, d.b])
        c.conditions = [], c.mode = "all";
    M = !1, L(!0), A("Подготовка моделей");
    try {
      if (await fe(l), L(!0), p.blockers.length)
        throw Error(
          "Состав моделей прочитан не полностью. " + p.blockers.join(" ")
        );
      for (const c of l) {
        if (M) break;
        for (const y of [c.a, c.b]) {
          if (y.modelsMode === "selected" && y.models.some((S) => !p.models.some((C) => C.id === S)))
            throw Error(
              `${c.name}: одна из моделей выборки отсутствует. Исправьте выборку.`
            );
          if (y.include.some((S) => !p.elements.some((C) => C.id === S)))
            throw Error(
              `${c.name}: вручную добавленный элемент отсутствует в модели.`
            );
        }
        const x = dt(c);
        if (c.configAtRun === x && c.modelsAtRun?.some(
          (y) => !p.models.some((S) => S.id === y)
        ))
          throw Error(
            `${c.name}: состав моделей уменьшился. Подключите прежние модели или создайте копию проверки для нового состава. Прежние результаты сохранены.`
          );
        const v = await re(c);
        if (M || !e.isCurrent())
          throw Error(
            "Проект изменился или расчёт отменён. Предыдущие результаты сохранены."
          );
        const b = (/* @__PURE__ */ new Date()).toISOString();
        c.results = pt(
          c.configAtRun === x ? c.results : [],
          v,
          b
        ), c.lastRun = b, c.fingerprint = p.fingerprint, c.configAtRun = x, c.modelsAtRun = [...p.indexedModelIds], c.status = "done", c.warnings = [...p.warnings], h = c.id, u = c.results[0]?.id || "", O.clear(), D();
      }
      m = "results", N(), Q(), k(
        `Проверка завершена. ${U()?.results.length || 0} результатов. Сохраните проверки для продолжения работы.`
      );
      const d = U()?.results.find((c) => c.id === u);
      d && !M && await ge(d);
    } finally {
      Y(), L(!1), N();
    }
  }
  function we(o) {
    const l = o.closest("[data-side]")?.dataset.side;
    if (!l) return;
    const d = U()[l], c = o, x = o.closest("[data-side]");
    if (c.classList.contains("preset")) {
      d.presetId = c.value || void 0, x.querySelector(
        '[data-selection="delete-set"]'
      ).disabled = !d.presetId;
      return;
    }
    if (c.classList.contains("all-models")) {
      for (const v of x.querySelectorAll(
        ".model-check"
      ))
        v.checked = c.checked;
      d.modelsMode = c.checked ? "all" : "selected", d.models = [], d.manualOnly = !1, d.presetId = void 0;
    }
    if (c.classList.contains("model-check")) {
      const v = [
        ...x.querySelectorAll(".model-check")
      ], b = v.filter((S) => S.checked).map((S) => S.value), y = v.length > 0 && b.length === v.length;
      x.querySelector(".all-models").checked = y, d.modelsMode = y ? "all" : "selected", d.models = y ? [] : b, d.manualOnly = !1, d.presetId = void 0;
    }
    d.conditions = [], d.mode = "all", j(), oe();
  }
  g("new").onclick = () => {
    const o = lt();
    o.name = `Проверка ${a.checks.length + 1}`, a.checks.push(o), h = o.id, m = "select", u = "", O.clear(), D(), N();
  }, g("scan").onclick = () => R(async () => {
    pe(), M = !1, L(!0), A("Чтение моделей");
    try {
      const o = U();
      await fe(o ? [o] : void 0, !o);
    } finally {
      Y(), L(!1), N();
    }
  }), g("run").onclick = () => R(() => ne()), g("all").onclick = () => R(() => ne(!0)), g("cancel").onclick = () => {
    M = !0, ie?.();
  }, g("test-search").oninput = K, g("checks").onclick = (o) => {
    const l = o.target.closest(
      "[data-check]"
    );
    l && !w && (e.clear(), h = l.dataset.check, u = "", O.clear(), f = 0, N());
  }, g("tabs").onclick = (o) => {
    const l = o.target.closest("[data-tab]");
    l && !w && (m = l.dataset.tab, N());
  }, g("name").onchange = () => {
    const o = U();
    o && (o.name = g("name").value.trim() || "Проверка", D(), K());
  }, g("copy").onclick = () => {
    const o = U();
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
    }), a.checks.push(l), h = l.id, u = "", O.clear(), D(), N();
  }, g("delete").onclick = () => {
    U() && confirm(`Удалить проверку «${U().name}» и её результаты?`) && (a.checks = a.checks.filter((o) => o.id !== h), h = a.checks[0]?.id || "", O.clear(), e.clear(), D(), N());
  }, g("clear-project").onclick = () => {
    !a.checks.length && !a.sets.length || confirm(
      "Очистить проверки, наборы моделей и результаты текущего проекта?"
    ) && (a.checks = [], a.sets = [], p = void 0, h = "", u = "", O.clear(), e.clear(), D(), g("model-count").textContent = "Модели не прочитаны", N(), k("Данные проверок текущего проекта очищены."));
  }, g("save").onclick = () => {
    Qe("НашеПО-проверки.json", JSON.stringify(a, null, 2)), $ = !1, g("dirty").textContent = "Файл проверок сохранён";
  }, g("open").onclick = () => g("file").click(), g("file").onchange = () => R(async () => {
    const o = g("file").files?.[0];
    if (!o) return;
    const l = Ke(await o.text());
    $ && !confirm("Заменить текущие несохранённые проверки данными из файла?") || (a = l, r && ve.set(r, a), Ve(n, a), h = a.checks[0]?.id || "", u = "", O.clear(), e.clear(), $ = !1, g("dirty").textContent = "Проверки открыты", N(), k("Проверки открыты. Обновите модели перед переходом к элементам."), g("file").value = "");
  });
  for (const o of ["settings", "help"])
    g(o).onclick = () => g(o + "-dialog").showModal();
  for (const o of i.querySelectorAll("[data-close]"))
    o.onclick = () => g(o.dataset.close).close();
  g("content").onchange = (o) => R(() => {
    const l = o.target, d = U();
    if (!d) return;
    if (l.closest("[data-side]")) {
      we(l);
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
          throw l.value = String(d.precision), Error("Точность должна быть от 0,001 до 100 мм.");
        d.precision = x;
      }
      if (l.id === "min-penetration") {
        const x = Number(l.value);
        if (!Number.isFinite(x) || x < 0 || x > 1e5)
          throw l.value = String(d.minPenetration), Error(
            "Минимальная глубина должна быть от 0 до 100 000 мм."
          );
        d.minPenetration = x;
      }
      l.id === "type" && (d.type = l.value), l.id === "touching" && (d.touching = l.checked), l.id === "same-model" && (d.ignoreSameModel = l.checked), l.id === "same-group" && (d.ignoreSameGroup = l.checked), l.id === "hidden" && (d.includeHidden = l.checked), l.id === "equal-property" && (d.equalProperty = l.value), j(), N();
      return;
    }
    if (l.id === "result-state") {
      f = 0, _();
      return;
    }
    if (l.id === "check-page") {
      for (const x of J().slice(f * 50, f * 50 + 50))
        l.checked ? O.add(x.id) : O.delete(x.id);
      _();
      return;
    }
    if (l.classList.contains("row-check")) {
      const x = l.closest("[data-result]").dataset.result;
      l.checked ? O.add(x) : O.delete(x), g("selection-count").textContent = `Выбрано: ${O.size}`;
      return;
    }
    const c = d.results.find((x) => x.id === u);
    c && (l.id === "edit-state" && (c.state = l.value, _(), K(), Q()), l.id === "assignee" && (c.assignee = l.value), l.id === "note" && (c.note = l.value, _()), D());
  }), g("content").oninput = (o) => {
    const l = o.target;
    (l.id === "result-search" || l.id === "result-depth") && (f = 0, _());
    const d = U(), c = Number(l.value);
    d && l.id === "precision" && Number.isFinite(c) && c >= 1e-3 && c <= 100 && (d.precision = c, j()), d && l.id === "min-penetration" && Number.isFinite(c) && c >= 0 && c <= 1e5 && (d.minPenetration = c, j());
  }, g("content").onclick = (o) => R(async () => {
    const l = o.target, d = l.closest("button"), c = U();
    if (!c) return;
    if (d?.dataset.selection) {
      const v = d.closest("[data-side]").dataset.side, b = c[v], y = g("content").scrollTop;
      let S = !0;
      switch (d.dataset.selection) {
        case "load-set": {
          const C = a.sets.find((P) => P.id === b.presetId);
          if (!C) throw Error("Выберите сохранённый набор моделей.");
          Object.assign(b, structuredClone(C.selection), {
            conditions: [],
            mode: "all",
            include: [],
            exclude: [],
            manualOnly: !1,
            presetId: C.id
          });
          break;
        }
        case "save-set": {
          if (b.manualOnly)
            throw Error(
              "Ручную выборку элементов нельзя сохранить как набор моделей."
            );
          const C = await me();
          if (!C) return;
          const P = {
            id: crypto.randomUUID(),
            name: C,
            selection: {
              models: [...b.models],
              modelsMode: b.modelsMode,
              conditions: [],
              mode: "all"
            }
          };
          a.sets.push(P), b.presetId = P.id, S = !1;
          break;
        }
        case "delete-set": {
          const C = a.sets.find((P) => P.id === b.presetId);
          if (!C) throw Error("Выберите сохранённый набор моделей.");
          if (!confirm(`Удалить набор «${C.name}»?`)) return;
          a.sets = a.sets.filter((P) => P.id !== C.id);
          for (const P of a.checks)
            for (const ee of [P.a, P.b])
              ee.presetId === C.id && (ee.presetId = void 0);
          S = !1;
          break;
        }
        case "show":
          e.select(
            (p?.elements || []).filter((C) => (c.includeHidden || !C.hidden) && je(C, b)).map((C) => C.id)
          );
          return;
        case "only": {
          const C = e.selected();
          if (!C.length) throw Error("Выделите элементы в 3D-сцене.");
          b.include = C, b.exclude = [], b.manualOnly = !0;
          break;
        }
        case "include": {
          const C = e.selected();
          if (!C.length) throw Error("Выделите элементы в 3D-сцене.");
          b.include = [.../* @__PURE__ */ new Set([...b.include, ...C])], b.exclude = b.exclude.filter((P) => !C.includes(P));
          break;
        }
        case "exclude": {
          const C = e.selected();
          if (!C.length) throw Error("Выделите элементы в 3D-сцене.");
          b.exclude = [.../* @__PURE__ */ new Set([...b.exclude, ...C])], b.include = b.include.filter((P) => !C.includes(P));
          break;
        }
        case "reset":
          b.manualOnly = !1, b.include = [], b.exclude = [];
      }
      S ? j() : D(), N(), g("content").scrollTop = y;
      return;
    }
    if (d?.id === "prev-page" && (f--, _()), d?.id === "next-page" && (f++, _()), d?.id === "show-markers" && (E = !E, d.textContent = E ? "● Знаки включены" : "○ Знаки выключены", d.setAttribute("aria-checked", String(E)), Q()), d?.id === "bulk") {
      const v = g("bulk-state").value;
      for (const b of c.results) O.has(b.id) && (b.state = v);
      D(), _(), ce(), K(), Q();
    }
    if (d?.id === "capture-image") {
      const v = c.results.find((b) => b.id === u);
      if (v) {
        M = !1, L(!0), A("Создание снимка пары");
        try {
          v.image = await e.snapshot(
            v,
            Number(g("distance").value),
            () => M,
            !0
          ), v.imageScope = "pair-ab", v.imageDistance = void 0, D(), ce(), k("Снимок сохранён в результат.");
        } finally {
          Y(), L(!1);
        }
      }
      return;
    }
    if (d?.id === "open-image") {
      const v = c.results.find((b) => b.id === u);
      if (v?.image) {
        const b = document.createElement("dialog");
        b.className = "image-dialog", b.innerHTML = '<button>Закрыть</button><img alt="Снимок коллизии">', b.querySelector("img").src = v.image, b.querySelector("button").onclick = () => {
          b.close(), b.remove();
        }, i.append(b), b.showModal();
      }
      return;
    }
    if (d?.id === "focus" && T(u, !0), d?.id === "previous" || d?.id === "next") {
      const v = J(), b = v.findIndex((y) => y.id === u) + (d.id === "next" ? 1 : -1);
      v[b] && T(v[b].id, !0);
    }
    if (d?.id === "export-html" || d?.id === "export-viewer") {
      let v = 0;
      const b = g("selected-only").checked ? c.results.filter((S) => O.has(S.id)) : c.results;
      if (!b.length) throw Error("Нет результатов для отчёта.");
      if (g("report-images").checked) {
        const S = e.view, C = S?.storeView(), P = Number(g("distance").value);
        M = !1, L(!0), A("Подготовка снимков отчёта", 0, b.length);
        try {
          await e.captureWorkspace(async () => {
            let ee = 0;
            for (const te of b) {
              if (M)
                throw Error(
                  "Подготовка отчёта отменена. Уже полученные снимки сохранены."
                );
              A(
                "Подготовка снимков отчёта",
                ee,
                b.length
              ), k("Подготовка снимков: " + (ee + 1) + " / " + b.length);
              const nt = te.imageScope !== "pair-ab" || te.imageDistance !== void 0 && te.imageDistance !== P;
              if (!te.image || nt) {
                if (te.state === "resolved" && !e.canLocate(te)) {
                  ee++;
                  continue;
                }
                try {
                  te.image = await e.snapshot(te, P, () => M), te.imageScope = "pair-ab", te.imageDistance = P, D();
                } catch (ot) {
                  if (M || !e.isCurrent()) throw ot;
                  v++;
                }
              }
              ee++, A("Подготовка снимков отчёта", ee, b.length);
            }
          });
        } finally {
          if (S && e.isCurrent()) {
            const ee = c.results.find((te) => te.id === u);
            if (ee)
              try {
                e.focus(ee, P, !1);
              } catch {
              }
            C && S.restoreView(C);
          }
          Y(), L(!1);
        }
      }
      const y = g("report-images").checked ? b.map(
        (S) => S.imageScope === "pair-ab" ? S : { ...S, image: void 0 }
      ) : b.map((S) => ({ ...S, image: void 0 }));
      Qe(
        c.name + (d.id === "export-html" ? ".html" : ".collision360.json"),
        d.id === "export-html" ? wt(c, y) : vt(c, y)
      ), k(
        "Отчёт подготовлен. Результатов: " + b.length + "; со снимками: " + y.filter((S) => S.image).length + "." + (v ? ` Не удалось создать снимков: ${v}; эти строки включены без изображения.` : ""),
        v > 0
      );
    }
    const x = l.closest("[data-result]");
    x && !l.closest("input") && !window.getSelection()?.toString() && T(x.dataset.result);
  }), g("content").ondblclick = (o) => {
    const l = o.target, d = l.closest("[data-result]");
    d && !l.closest("input") && R(() => T(d.dataset.result, !0));
  };
  const it = setInterval(() => {
    w || (ye() ? (g("model-count").textContent = "Модели не прочитаны", k(
      a.checks.length ? "Открыт другой проект. Показаны его проверки; обновите модели." : "Открыт другой проект. Для него ещё нет проверок."
    ), w || N()) : p && !e.isCurrent() && (p = void 0, e.clear(), g("model-count").textContent = "3D-окно изменилось", k("Активное 3D-окно изменилось. Обновите модели."), w || N()));
  }, 1500);
  return N(), () => {
    s(), clearInterval(it), clearTimeout(z), V++, M = !0, ie?.(), I?.terminate(), e.clear();
  };
}
var Fe = /* @__PURE__ */ ((t) => (t.object = "object", t.drawing = "drawing", t.table = "table", t.record = "record", t.textStyle = "textstyle", t.textStyleTable = "textstyles", t.linetype = "linetype", t.linetypeTable = "linetypes", t.layer = "layer", t.layerTable = "layers", t.block = "block", t.blockTable = "blocks", t.layout = "layout", t.layoutTable = "layouts", t.type = "type", t.typeTable = "types", t.material = "material", t.materialTable = "materials", t.geometry = "geometry", t.geometryTable = "geometries", t.group = "group", t.groupTable = "groups", t.attachment = "attachment", t.attachmentTable = "attachments", t.entities = "entities", t.entity = "entity", t.line = "l", t.solid = "s", t.insert = "i", t.polyline = "p", t.circle = "c", t.arc = "a", t.polyline3d = "p3", t.proxy = "x", t.text = "t", t.mtext = "mt", t.wipeout = "w", t.model3d = "g", t.alignment = "al", t))(Fe || {});
const Ue = () => new Promise((t) => requestAnimationFrame(() => t()));
function tt(t) {
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
async function It(t) {
  await Ue(), t.repaint();
  const { candidates: e, rect: i } = tt(t), s = document.createElement("canvas");
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
    t.repaint(), await Ue(), s.remove();
  };
}
async function jt(t, e) {
  if (await Ue(), e()) throw Error("Подготовка снимков отменена.");
  const { candidates: i } = tt(t), s = document.createElement("canvas"), r = Math.min(1, 1280 / i[0].width);
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
const ze = "nashepo.checks.points", Je = "nashepo.checks.highlight";
function We(t) {
  let e = performance.now();
  return async () => {
    if (t()) throw Error("Операция отменена.");
    performance.now() - e >= 16 && (await new Promise((i) => setTimeout(i, 0)), e = performance.now());
  };
}
function Ee(t, e, i, s = 0) {
  if (s > 12 || t == null) return;
  if (typeof t != "object") {
    i[e] = String(t);
    return;
  }
  if (Array.isArray(t)) {
    t.forEach((n, a) => Ee(n, `${e}[${a}]`, i, s + 1));
    return;
  }
  const r = t;
  if ("$value" in r) {
    Ee(r.$value, e, i, s + 1);
    return;
  }
  for (const [n, a] of Object.entries(r))
    n.startsWith("$") || Ee(a, e ? `${e}.${n}` : n, i, s + 1);
}
function Et(t) {
  const e = t.vertices.length / 3, i = (a) => Number.isFinite(t.vertices[a * 3]) && Number.isFinite(t.vertices[a * 3 + 1]) && Number.isFinite(t.vertices[a * 3 + 2]), s = (a) => {
    const p = t.indices[a], h = t.indices[a + 1], m = t.indices[a + 2];
    return p < e && h < e && m < e && p !== h && h !== m && m !== p && i(p) && i(h) && i(m);
  };
  let r = 0;
  for (let a = 0; a < t.indices.length; a += 3) s(a) && (r += 3);
  if (r === t.indices.length) return t.indices;
  const n = new Uint32Array(r);
  for (let a = 0, p = 0; a < t.indices.length; a += 3)
    s(a) && (n[p++] = t.indices[a], n[p++] = t.indices[a + 1], n[p++] = t.indices[a + 2]);
  return n;
}
const Ne = (t) => /\.wdx(?:[?#].*)?$/i.test(t);
class At {
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
    const p = [], h = /* @__PURE__ */ new Set(), m = [], u = [], f = [], w = /* @__PURE__ */ new Map(), M = /* @__PURE__ */ new Set();
    let I = 2166136261;
    const E = We(
      () => i() || r !== this.app || n !== this.view
    );
    let $ = -1 / 0;
    const O = (z) => {
      for (let V = 0; V < z.length; V++)
        I = Math.imul(I ^ z.charCodeAt(V), 16777619);
    }, ie = async (z, V, U) => {
      if (M.has(z)) return;
      M.add(z);
      const g = z.layers.layer0?.modelName || V, se = V, k = Ne(g) || Ne(se), A = (j, q) => {
        h.has(j) || (h.add(j), p.push({ id: j, name: q }));
      };
      k || A(se, g);
      const Y = !k && (!s || s.has(se)), R = [];
      (Y || k) && z.layouts.model?.walk((j) => (j.type === Fe.model3d ? R.push(j) : j.type === Fe.insert && m.push(`${g}: вставка блока не включена в расчёт.`), !1));
      const me = /* @__PURE__ */ new Map();
      for (const j of R) {
        let q = j.layer, F = "";
        for (; q; ) {
          if (q.modelName && !Ne(q.modelName)) {
            F = q.modelName;
            break;
          }
          q = q.layer;
        }
        const J = k ? F || "Модель проекта" : g, K = k ? F || `${V}/#model` : se;
        if (k && A(K, J), s && !s.has(K)) continue;
        const H = JSON.stringify([
          j.layer?.UUID || "",
          j.$id || j.$path
        ]);
        me.set(JSON.stringify([K, H]), {
          key: H,
          objects: [j],
          modelId: K,
          modelName: J
        });
      }
      let D = 0;
      for (const j of me.values()) {
        const { key: q, objects: F, modelId: J, modelName: K } = j;
        if (i()) throw Error("Чтение моделей отменено.");
        if (r !== this.app || n !== this.view)
          throw Error(
            "Активный проект изменился. Запустите чтение моделей заново."
          );
        const H = F[0].layer, N = {};
        try {
          if (H) {
            const Q = [];
            let T = H;
            for (; T && Q.length < 64; )
              Q.unshift(T), T = T.layer;
            for (const G of Q)
              Ee(G.typedProperties(), "", N), G.typed?.name && (N.Тип = G.typed.name);
          }
        } catch {
          m.push(`${K} / ${q}: часть свойств недоступна.`);
        }
        const _ = N["ifc.id"] || Object.entries(N).find(
          ([Q]) => /(^|\.)(globalid|ifcguid|guid)$/i.test(Q)
        )?.[1] || "", ce = H?.name || F[0].$id || "Элемент", le = JSON.stringify([J, q]);
        Object.assign(N, {
          Модель: K,
          Имя: ce,
          GUID: _,
          Объект: H?.UUID || q
        });
        const pe = {
          min: [1 / 0, 1 / 0, 1 / 0],
          max: [-1 / 0, -1 / 0, -1 / 0]
        };
        let he = !0, B = !1, Z = 0;
        for (const Q of F) {
          he &&= Q.isClosed;
          for (const T of Object.values(Q.meshes)) {
            const G = T.geometry;
            if (!G || G.indices.length % 3) {
              B = !0;
              continue;
            }
            he &&= T.isClosed;
            for (let L = 0; L < G.vertices.length; L += 3) {
              const re = [
                G.vertices[L],
                G.vertices[L + 1],
                G.vertices[L + 2]
              ];
              if (Math3d.mat4.mulv3(re, Q.matrix, re), !re.every(Number.isFinite)) {
                B = !0;
                continue;
              }
              for (let ne = 0; ne < 3; ne++)
                pe.min[ne] = Math.min(pe.min[ne], re[ne]), pe.max[ne] = Math.max(pe.max[ne], re[ne]);
              if (O(re.join(",")), L % 6e4 === 0 && (performance.now() - $ > 200 && ($ = performance.now(), e(
                "Индексирование: " + K + " · " + f.length + " элементов"
              )), await E(), i()))
                throw Error("Чтение моделей отменено.");
            }
            const ge = G.vertices.length / 3, fe = (L) => Number.isFinite(G.vertices[L * 3]) && Number.isFinite(G.vertices[L * 3 + 1]) && Number.isFinite(G.vertices[L * 3 + 2]);
            for (let L = 0; L < G.indices.length; L += 3) {
              const re = G.indices[L], ne = G.indices[L + 1], we = G.indices[L + 2];
              if (I = Math.imul(I ^ re, 16777619), I = Math.imul(I ^ ne, 16777619), I = Math.imul(I ^ we, 16777619), re < ge && ne < ge && we < ge && re !== ne && ne !== we && we !== re && fe(re) && fe(ne) && fe(we) ? Z++ : B = !0, L % 15e4 === 0 && (await E(), i()))
                throw Error("Чтение моделей отменено.");
            }
          }
        }
        if (B || !Z) {
          if (Z || D++, !Z) continue;
          he = !1;
        }
        const oe = {
          id: le,
          name: ce,
          model: K,
          modelId: J,
          guid: _,
          properties: N,
          hidden: U || !!H?.resolveHidden() || !!H?.resolveDisabled(),
          triangles: new Float64Array(0),
          triangleCount: Z,
          closed: he,
          bounds: pe
        };
        O(JSON.stringify([le, N, oe.hidden])), f.push(oe), w.set(le, F);
      }
      D && m.push(
        `${g}: пропущено элементов без треугольной геометрии — ${D}.`
      );
      const ye = [];
      z.attachments.forEach((j) => {
        ye.push(j);
      });
      for (const j of ye) {
        const q = j.name || j.uri || j.$id, F = q || "Подключённая модель", J = `${V}/${q || "attachment"}`;
        j.model || A(J, F), j.model ? await ie(
          j.model,
          J,
          U || j.hidden
        ) : (!s || s.has(J)) && u.push(
          `${F}: модель не загружена. Откройте её перед расчётом.`
        );
      }
    };
    if (await ie(a, a.layers.layer0?.modelName || "Проект", !1), !f.length && (!s || s.size > 0)) {
      const z = s ? [...s].filter((V) => !h.has(V)) : [];
      throw Error(
        z.length ? `Сохранённая выборка ссылается на модели, которых нет в текущем составе: ${z.join(", ")}. Обновите список моделей.` : p.length ? "В выбранных моделях не найдены 3D-элементы с доступной геометрией. Проверьте, что модели загружены, и выберите нужные файлы." : "В открытом проекте не обнаружены IFC/SMDX-модели. Проверьте состав подключений проекта."
      );
    }
    return this.clear(), this.refs = w, this.metadata = new Map(f.map((z) => [z.id, z])), this.scannedApp = r, this.scannedView = n, {
      elements: f,
      fingerprint: `${f.length}:${I >>> 0}`,
      warnings: [...new Set(m)],
      blockers: [...new Set(u)],
      models: p,
      indexedModelIds: p.filter((z) => !s || s.has(z.id)).map((z) => z.id)
    };
  }
  async geometry(e, i) {
    const s = We(() => i() || !this.isCurrent());
    if (!this.isCurrent()) throw Error("Активная модель изменилась.");
    const r = this.metadata.get(e), n = this.refs.get(e);
    if (!r || !n) throw Error("Элемент отсутствует.");
    const a = n.flatMap(
      (M) => Object.values(M.meshes).flatMap((I) => {
        const E = I.geometry;
        if (!E || E.indices.length % 3) return [];
        const $ = Et(E);
        return $.length ? [{ object: M, g: E, indices: $ }] : [];
      })
    );
    let p = 0, h = 0;
    for (const { g: M, indices: I } of a) {
      if (!M) throw Error("Геометрия недоступна.");
      p += M.vertices.length, h += I.length;
    }
    const m = new Float64Array(p), u = new Uint32Array(h);
    let f = 0, w = 0;
    for (const { object: M, g: I, indices: E } of a) {
      if (!I) throw Error("Геометрия недоступна.");
      for (let $ = 0; $ < I.vertices.length; $ += 3) {
        const O = [I.vertices[$], I.vertices[$ + 1], I.vertices[$ + 2]];
        if (Math3d.mat4.mulv3(O, M.matrix, O), m.set(O, f + $), $ % 6e4 === 0 && (await s(), i() || !this.isCurrent()))
          throw Error("Чтение геометрии отменено.");
      }
      for (let $ = 0; $ < E.length; $++)
        if (u[w + $] = f / 3 + E[$], $ % 15e4 === 0 && (await s(), i()))
          throw Error("Чтение геометрии отменено.");
      f += I.vertices.length, w += E.length;
    }
    return { ...r, vertices: m, indices: u };
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
      const e = this.pointView.annotations.get(ze);
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
    a.forEach((h, m) => a[m] = h / p), n.lookAt(
      r.map((h, m) => h - a[m] * i),
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
        (m) => Object.values(m.meshes).flatMap((u) => {
          const f = u.geometry;
          if (!f) return [];
          const w = {
            // SDK fields may be prototype getters rather than own properties.
            uuid: `${Je}.${h}.${f.uuid}`,
            vertices: f.vertices,
            indices: f.indices,
            normals: f.normals,
            bounds: f.bounds,
            colors: new Uint32Array(f.vertices.length / 3).fill(p)
          };
          return [{ obj: m, geometry: w, color: p }];
        })
      )
    ), this.overlay) {
      this.overlay.layer.visible = !0, i.invalidate(!0);
      return;
    }
    let r;
    r = {
      id: Je,
      order: 1e4,
      visible: !0,
      paint: () => {
      },
      paint3d: (a) => {
        const p = a.color, h = a.rasterizer.material;
        a.rasterizer.material = void 0;
        try {
          for (const { obj: m, geometry: u, color: f } of this.overlaySurfaces) {
            a.color = f, a.pushMatrix();
            try {
              a.multMatrix(m.matrix), a.mesh(u);
            } finally {
              a.popMatrix();
            }
          }
        } catch (m) {
          r.visible = !1, this.overlayError = new Error(
            "Не удалось отрисовать подсветку пары: " + (m instanceof Error ? m.message : String(m))
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
    const p = a.visible, h = n.annotations.visible, m = new Set(n.layer.selectedObjects());
    let u;
    try {
      r ? this.highlight(e) : this.focus(e, i, !1), n.pauseAnimation(), u = await It(n), n.layer.clearSelected(), a.visible = !1, n.annotations.visible = !1, n.invalidate();
      const f = await jt(
        n,
        () => s() || !this.isCurrent()
      );
      if (this.overlayError) throw this.overlayError;
      return f;
    } finally {
      a.visible = p, n.annotations.visible = h, n.layer.clearSelected(), n.layer.selectObjects((f) => m.has(f), !0), n.invalidate(), await u?.();
    }
  }
  markers(e, i, s, r) {
    if (!this.isCurrent()) return;
    const n = this.view;
    this.pointView && this.pointView !== n && this.clear();
    const a = n.annotations.get(ze);
    if (a && n.annotations.release(a), this.pointView = n, !s) {
      n.invalidate();
      return;
    }
    const p = n.annotations.create(ze, 1e4), h = e.filter((m) => m.id !== i).concat(e.filter((m) => m.id === i));
    for (const m of h.slice(-3e3)) {
      if (m.state === "resolved") continue;
      const [u, f, w] = m.point, M = m.id === i, I = m.state === "excluded" ? "#78818c" : m.state === "approved" || m.state === "reviewed" ? "#28b94b" : "#e1372d", E = M ? "#f2c94c" : I, $ = () => r(m.id), O = [
        { type: "line", a: [u, f, w], b: [u, f, w + 1], color: E, width: 5 },
        {
          type: "polyline",
          points: [
            [u - 0.65, f, w + 1],
            [u + 0.65, f, w + 1],
            [u, f, w + 2.2],
            [u - 0.65, f, w + 1]
          ],
          color: E,
          fillColor: I,
          width: M ? 5 : 2
        },
        {
          type: "line",
          a: [u, f - 0.01, w + 1.85],
          b: [u, f - 0.01, w + 1.4],
          color: "#ffffff",
          width: 4
        },
        {
          type: "line",
          a: [u, f - 0.01, w + 1.22],
          b: [u, f - 0.01, w + 1.27],
          color: "#ffffff",
          width: 4
        }
      ];
      p.add({
        id: m.id,
        type: "shaped",
        shapes: O,
        activeShapes: O,
        activateCommand: $,
        dblCommand: $
      }), M && p.add({
        id: m.id + ":label",
        type: "simple",
        position: [u, f, w + 2.35],
        label: `${m.a.name} × ${m.b.name}`,
        labelBackground: "#f2c94c",
        labelColor: "#171717",
        activateCommand: $
      });
    }
    n.invalidate();
  }
}
let He, qe, Xe;
const Ct = {
  open(t) {
    t.manager.revealView("nashepo.collisionfinder360/checks_panel");
  },
  mount(t) {
    const e = t.el;
    if (!e) return;
    if (qe && Xe === t.manager) {
      e.replaceChildren(qe);
      return;
    }
    He?.();
    const i = document.createElement("div");
    i.style.height = "100%", e.replaceChildren(i), qe = i, Xe = t.manager, He = St(i, new At(t));
  }
};
export {
  Ct as default
};
