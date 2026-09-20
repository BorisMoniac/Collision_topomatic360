var Ut = Uint8Array, ae = Uint16Array, Cn = Int32Array, pn = new Ut([
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  0,
  1,
  1,
  1,
  1,
  2,
  2,
  2,
  2,
  3,
  3,
  3,
  3,
  4,
  4,
  4,
  4,
  5,
  5,
  5,
  5,
  0,
  /* unused */
  0,
  0,
  /* impossible */
  0
]), un = new Ut([
  0,
  0,
  0,
  0,
  1,
  1,
  2,
  2,
  3,
  3,
  4,
  4,
  5,
  5,
  6,
  6,
  7,
  7,
  8,
  8,
  9,
  9,
  10,
  10,
  11,
  11,
  12,
  12,
  13,
  13,
  /* unused */
  0,
  0
]), zn = new Ut([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]), mn = function(t, e) {
  for (var n = new ae(31), a = 0; a < 31; ++a)
    n[a] = e += 1 << t[a - 1];
  for (var o = new Cn(n[30]), a = 1; a < 30; ++a)
    for (var i = n[a]; i < n[a + 1]; ++i)
      o[i] = i - n[a] << 5 | a;
  return { b: n, r: o };
}, hn = mn(pn, 2), gn = hn.b, Pn = hn.r;
gn[28] = 258, Pn[258] = 28;
var Nn = mn(un, 0), On = Nn.b, qe = new ae(32768);
for (var ht = 0; ht < 32768; ++ht) {
  var Xt = (ht & 43690) >> 1 | (ht & 21845) << 1;
  Xt = (Xt & 52428) >> 2 | (Xt & 13107) << 2, Xt = (Xt & 61680) >> 4 | (Xt & 3855) << 4, qe[ht] = ((Xt & 65280) >> 8 | (Xt & 255) << 8) >> 1;
}
var ue = (function(t, e, n) {
  for (var a = t.length, o = 0, i = new ae(e); o < a; ++o)
    t[o] && ++i[t[o] - 1];
  var r = new ae(e);
  for (o = 1; o < e; ++o)
    r[o] = r[o - 1] + i[o - 1] << 1;
  var l;
  if (n) {
    l = new ae(1 << e);
    var s = 15 - e;
    for (o = 0; o < a; ++o)
      if (t[o])
        for (var c = o << 4 | t[o], f = e - t[o], u = r[t[o] - 1]++ << f, m = u | (1 << f) - 1; u <= m; ++u)
          l[qe[u] >> s] = c;
  } else
    for (l = new ae(a), o = 0; o < a; ++o)
      t[o] && (l[o] = qe[r[t[o] - 1]++] >> 15 - t[o]);
  return l;
}), he = new Ut(288);
for (var ht = 0; ht < 144; ++ht)
  he[ht] = 8;
for (var ht = 144; ht < 256; ++ht)
  he[ht] = 9;
for (var ht = 256; ht < 280; ++ht)
  he[ht] = 7;
for (var ht = 280; ht < 288; ++ht)
  he[ht] = 8;
var xn = new Ut(32);
for (var ht = 0; ht < 32; ++ht)
  xn[ht] = 5;
var qn = /* @__PURE__ */ ue(he, 9, 1), Un = /* @__PURE__ */ ue(xn, 5, 1), Se = function(t) {
  for (var e = t[0], n = 1; n < t.length; ++n)
    t[n] > e && (e = t[n]);
  return e;
}, Ht = function(t, e, n) {
  var a = e / 8 | 0;
  return (t[a] | t[a + 1] << 8) >> (e & 7) & n;
}, Ae = function(t, e) {
  var n = e / 8 | 0;
  return (t[n] | t[n + 1] << 8 | t[n + 2] << 16) >> (e & 7);
}, Dn = function(t) {
  return (t + 7) / 8 | 0;
}, He = function(t, e, n) {
  return (e == null || e < 0) && (e = 0), (n == null || n > t.length) && (n = t.length), new Ut(t.subarray(e, n));
}, Ln = [
  "unexpected EOF",
  "invalid block type",
  "invalid length/literal",
  "invalid distance",
  "stream finished",
  "no stream handler",
  ,
  // determined by compression function
  "no callback",
  "invalid UTF-8 data",
  "extra field too long",
  "date not in range 1980-2099",
  "filename too long",
  "stream finishing",
  "invalid zip data"
  // determined by unknown compression method
], qt = function(t, e, n) {
  var a = new Error(e || Ln[t]);
  if (a.code = t, Error.captureStackTrace && Error.captureStackTrace(a, qt), !n)
    throw a;
  return a;
}, Fn = function(t, e, n, a) {
  var o = t.length, i = a ? a.length : 0;
  if (!o || e.f && !e.l)
    return n || new Ut(0);
  var r = !n, l = r || e.i != 2, s = e.i;
  r && (n = new Ut(o * 3));
  var c = function(jt) {
    var V = n.length;
    if (jt > V) {
      var xt = new Ut(Math.max(V * 2, jt));
      xt.set(n), n = xt;
    }
  }, f = e.f || 0, u = e.p || 0, m = e.b || 0, b = e.l, x = e.d, M = e.m, N = e.n, S = o * 8;
  do {
    if (!b) {
      f = Ht(t, u, 1);
      var I = Ht(t, u + 1, 3);
      if (u += 3, I)
        if (I == 1)
          b = qn, x = Un, M = 9, N = 5;
        else if (I == 2) {
          var L = Ht(t, u, 31) + 257, B = Ht(t, u + 10, 15) + 4, F = L + Ht(t, u + 5, 31) + 1;
          u += 14;
          for (var k = new Ut(F), d = new Ut(19), v = 0; v < B; ++v)
            d[zn[v]] = Ht(t, u + v * 3, 7);
          u += B * 3;
          for (var C = Se(d), O = (1 << C) - 1, T = ue(d, C, 1), v = 0; v < F; ) {
            var U = T[Ht(t, u, O)];
            u += U & 15;
            var A = U >> 4;
            if (A < 16)
              k[v++] = A;
            else {
              var w = 0, z = 0;
              for (A == 16 ? (z = 3 + Ht(t, u, 3), u += 2, w = k[v - 1]) : A == 17 ? (z = 3 + Ht(t, u, 7), u += 3) : A == 18 && (z = 11 + Ht(t, u, 127), u += 7); z--; )
                k[v++] = w;
            }
          }
          var Z = k.subarray(0, L), Y = k.subarray(L);
          M = Se(Z), N = Se(Y), b = ue(Z, M, 1), x = ue(Y, N, 1);
        } else
          qt(1);
      else {
        var A = Dn(u) + 4, $ = t[A - 4] | t[A - 3] << 8, P = A + $;
        if (P > o) {
          s && qt(0);
          break;
        }
        l && c(m + $), n.set(t.subarray(A, P), m), e.b = m += $, e.p = u = P * 8, e.f = f;
        continue;
      }
      if (u > S) {
        s && qt(0);
        break;
      }
    }
    l && c(m + 131072);
    for (var lt = (1 << M) - 1, et = (1 << N) - 1, Pt = u; ; Pt = u) {
      var w = b[Ae(t, u) & lt], R = w >> 4;
      if (u += w & 15, u > S) {
        s && qt(0);
        break;
      }
      if (w || qt(2), R < 256)
        n[m++] = R;
      else if (R == 256) {
        Pt = u, b = null;
        break;
      } else {
        var Q = R - 254;
        if (R > 264) {
          var v = R - 257, at = pn[v];
          Q = Ht(t, u, (1 << at) - 1) + gn[v], u += at;
        }
        var it = x[Ae(t, u) & et], bt = it >> 4;
        it || qt(3), u += it & 15;
        var Y = On[bt];
        if (bt > 3) {
          var at = un[bt];
          Y += Ae(t, u) & (1 << at) - 1, u += at;
        }
        if (u > S) {
          s && qt(0);
          break;
        }
        l && c(m + 131072);
        var ct = m + Q;
        if (m < Y) {
          var At = i - Y, ut = Math.min(Y, ct);
          for (At + m < 0 && qt(3); m < ut; ++m)
            n[m] = a[At + m];
        }
        for (; m < ct; ++m)
          n[m] = n[m - Y];
      }
    }
    e.l = b, e.p = Pt, e.b = m, e.f = f, b && (f = 1, e.m = M, e.d = x, e.n = N);
  } while (!f);
  return m != n.length && r ? He(n, 0, m) : n.subarray(0, m);
}, Rn = /* @__PURE__ */ new Ut(0), Zt = function(t, e) {
  return t[e] | t[e + 1] << 8;
}, Rt = function(t, e) {
  return (t[e] | t[e + 1] << 8 | t[e + 2] << 16 | t[e + 3] << 24) >>> 0;
}, $e = function(t, e) {
  return Rt(t, e) + Rt(t, e + 4) * 4294967296;
};
function Tn(t, e) {
  return Fn(t, { i: 2 }, e && e.out, e && e.dictionary);
}
var Ue = typeof TextDecoder < "u" && /* @__PURE__ */ new TextDecoder(), Hn = 0;
try {
  Ue.decode(Rn, { stream: !0 }), Hn = 1;
} catch {
}
var Gn = function(t) {
  for (var e = "", n = 0; ; ) {
    var a = t[n++], o = (a > 127) + (a > 223) + (a > 239);
    if (n + o > t.length)
      return { s: e, r: He(t, n - 1) };
    o ? o == 3 ? (a = ((a & 15) << 18 | (t[n++] & 63) << 12 | (t[n++] & 63) << 6 | t[n++] & 63) - 65536, e += String.fromCharCode(55296 | a >> 10, 56320 | a & 1023)) : o & 1 ? e += String.fromCharCode((a & 31) << 6 | t[n++] & 63) : e += String.fromCharCode((a & 15) << 12 | (t[n++] & 63) << 6 | t[n++] & 63) : e += String.fromCharCode(a);
  }
};
function bn(t, e) {
  if (e) {
    for (var n = "", a = 0; a < t.length; a += 16384)
      n += String.fromCharCode.apply(null, t.subarray(a, a + 16384));
    return n;
  } else {
    if (Ue)
      return Ue.decode(t);
    var o = Gn(t), i = o.s, n = o.r;
    return n.length && qt(8), i;
  }
}
var Bn = function(t, e) {
  return e + 30 + Zt(t, e + 26) + Zt(t, e + 28);
}, Zn = function(t, e, n) {
  var a = Zt(t, e + 28), o = Zt(t, e + 30), i = bn(t.subarray(e + 46, e + 46 + a), !(Zt(t, e + 8) & 2048)), r = e + 46 + a, l = Wn(t, r, o, n, Rt(t, e + 20), Rt(t, e + 24), Rt(t, e + 42)), s = l[0], c = l[1], f = l[2];
  return [Zt(t, e + 10), s, c, i, r + o + Zt(t, e + 32), f];
}, Wn = function(t, e, n, a, o, i, r) {
  var l = o == 4294967295, s = i == 4294967295, c = r == 4294967295, f = e + n, u = l + s + c;
  if (a && u) {
    for (; e + 4 < f; e += 4 + Zt(t, e + 2))
      if (Zt(t, e) == 1)
        return [
          l ? $e(t, e + 4 + 8 * s) : o,
          s ? $e(t, e + 4) : i,
          c ? $e(t, e + 4 + 8 * (s + l)) : r,
          1
        ];
    a < 2 && qt(13);
  }
  return [o, i, r, 0];
};
function Yn(t, e) {
  for (var n = {}, a = t.length - 22; Rt(t, a) != 101010256; --a)
    (!a || t.length - a > 65558) && qt(13);
  var o = Zt(t, a + 8);
  if (!o)
    return {};
  var i = Rt(t, a + 16), r = Rt(t, a - 20) == 117853008;
  if (r) {
    var l = Rt(t, a - 12);
    r = Rt(t, l) == 101075792, r && (o = Rt(t, l + 32), i = Rt(t, l + 48));
  }
  for (var s = e && e.filter, c = 0; c < o; ++c) {
    var f = Zn(t, i, r), u = f[0], m = f[1], b = f[2], x = f[3], M = f[4], N = f[5], S = Bn(t, N);
    i = M, (!s || s({
      name: x,
      size: m,
      originalSize: b,
      compression: u
    })) && (u ? u == 8 ? n[x] = Tn(t.subarray(S, S + m), { out: new Ut(b) }) : qt(14, "unknown compression type " + u) : n[x] = He(t, S, S + m));
  }
  return n;
}
const Yt = (t, e = 2048) => typeof t == "string" && t.length <= e, Ye = (t) => Yt(t, 80) && Number.isFinite(Date.parse(t)), Jn = (t) => Array.isArray(t) && t.length === 3 && t.every(Number.isFinite), Je = (t) => t && Yt(t.id) && Yt(t.guid) && Yt(t.source) && !!(t.guid || t.id);
function Qe(t) {
  const e = JSON.parse(t);
  if (e?.format !== "nashepo.clash-response" || e.version !== 1 || !Yt(e.responseId) || !e.responseId || !Ye(e.createdAt) || !Yt(e.author, 200) || !e.author.trim() || !Array.isArray(e.changes) || e.changes.length > 5e4)
    throw Error("Это не поддерживаемый отчёт исполнителя НашеПО.");
  const n = /* @__PURE__ */ new Set();
  for (const a of e.changes) {
    if (!a || ![a.changeId, a.checkId, a.clashId].every((o) => Yt(o) && !!o) || n.has(a.changeId) || ![a.projectId, a.exportId, a.baseRun].every((o) => Yt(o)) || !["fixed", "excluded", "active"].includes(a.state) || !Yt(a.comment, 2e4) || !Ye(a.modifiedAt) || !Je(a.a) || !Je(a.b) || !Jn(a.point))
      throw Error("Некорректная или повторяющаяся запись ответа исполнителя.");
    n.add(a.changeId);
  }
  return e;
}
async function Qn(t) {
  if (t.size > 1024 * 1024 * 1024) throw Error("Архив ответа превышает 1 ГБ.");
  if (!/\.zip$/i.test(t.name)) {
    if (t.size > 64 * 1024 * 1024) throw Error("Файл ответа превышает 64 МБ.");
    return Qe(await t.text());
  }
  let e = !1;
  const n = Yn(new Uint8Array(await t.arrayBuffer()), { filter: (a) => {
    if (a.name !== "response.json") return !1;
    if (e || a.originalSize > 64 * 1024 * 1024) throw Error("Некорректный размер или повтор response.json.");
    return e = !0, !0;
  } });
  if (!n["response.json"]) throw Error("В архиве нет response.json. Нужен ответ исполнителя из РОБУР, а не исходный пакет проверки.");
  return Qe(bn(n["response.json"]));
}
const Ge = { fixed: "Исправленный", excluded: "Исключённый", active: "В работе" }, yn = { pending: "Ожидает решения", accepted: "Принято", rejected: "Отклонено" }, xe = (t, e) => t.model === e.source && (t.guid && e.guid ? t.guid === e.guid : t.id === e.id);
function wn(t, e, n) {
  const a = new Map(t.checks.map((i) => [i.id, i])), o = new Map(t.checks.flatMap((i) => i.results.flatMap((r) => (r.workReplies || []).map((l) => [l.changeId, { reply: l, checkId: i.id, clashId: r.id }]))));
  return n.changes.map((i) => {
    const r = { change: i, legacy: !i.projectId };
    if (i.projectId && i.projectId !== e)
      return { ...r, reason: "Другая папка проекта. Откройте исходный проект проверок." };
    const l = a.get(i.checkId), s = l?.results.find((u) => u.id === i.clashId);
    if (!l || !s) return { ...r, reason: "Исходная проверка или коллизия не найдена." };
    if (!(xe(s.a, i.a) && xe(s.b, i.b) || xe(s.a, i.b) && xe(s.b, i.a)))
      return { ...r, reason: "Не совпадают GUID / идентификаторы или модели пары." };
    const c = o.get(i.changeId), f = c?.reply;
    return f ? c.checkId !== i.checkId || c.clashId !== i.clashId || f.state !== i.state || f.comment !== i.comment || f.author !== n.author || f.modifiedAt !== i.modifiedAt || f.baseRun !== i.baseRun || f.point.some((u, m) => u !== i.point[m]) ? { ...r, reason: "Идентификатор изменения уже существует с другим содержимым." } : { ...r, check: l, clash: s, duplicate: !0 } : {
      ...r,
      check: l,
      clash: s,
      stale: !i.baseRun || i.baseRun !== (l.lastRun || "") || Math.hypot(...s.point.map((u, m) => u - i.point[m])) > 1e-3
    };
  });
}
function Vn(t, e, n) {
  let a = 0;
  for (const o of wn(t, e, n)) {
    if (!o.clash || o.reason || o.duplicate) continue;
    const i = o.change;
    (o.clash.workReplies ??= []).push({
      changeId: i.changeId,
      responseId: n.responseId,
      author: n.author,
      state: i.state,
      comment: i.comment,
      modifiedAt: i.modifiedAt,
      baseRun: i.baseRun,
      exportId: i.exportId,
      point: [...i.point],
      importedAt: (/* @__PURE__ */ new Date()).toISOString(),
      decision: "pending",
      stale: !!o.stale,
      legacy: !!o.legacy
    }), a++;
  }
  return a;
}
function Xn(t, e, n) {
  if (!t.workReplies?.includes(e) || e.decision !== "pending") throw Error("Решение по этому ответу уже принято.");
  e.decision = n, e.decidedAt = (/* @__PURE__ */ new Date()).toISOString(), n === "accepted" && (t.state = e.state === "fixed" ? "resolved" : e.state === "excluded" ? "excluded" : "active", e.state === "excluded" ? t.exclusionPoint = [...t.point] : delete t.exclusionPoint);
}
function Kn(t) {
  const e = t.workReplies || [], n = e.filter((o) => o.decision === "pending").length, a = e[e.length - 1];
  return n ? `${n} · ожидает решения` : a ? `${a.stale ? "Ранее: " : ""}${Ge[a.state]} · ${yn[a.decision]}` : "—";
}
const Be = (t) => typeof t == "string" && /^data:image\/(jpeg|png);base64,[A-Za-z0-9+/=]+$/.test(t), oe = {
  new: "Новый",
  active: "Активный",
  reviewed: "Проверенный",
  approved: "Подтверждённый",
  resolved: "Исправленный",
  excluded: "Исключённый"
}, vn = (t, e, n) => t.kind === "duplicate" || t.depth === "unmeasurable" || t.depth === "tolerance" || (t.penetrationMm ?? 0) + n >= e, Ve = () => ({
  models: [],
  modelsMode: "all",
  conditions: [],
  mode: "all",
  include: [],
  exclude: []
}), _n = () => ({
  id: crypto.randomUUID(),
  name: "Новая проверка",
  type: "intersection",
  a: Ve(),
  b: Ve(),
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
}), Xe = ({
  triangles: t,
  vertices: e,
  indices: n,
  triangleCount: a,
  closed: o,
  bounds: i,
  ...r
}) => r;
function se(t, e) {
  return e.exclude.includes(t.id) ? !1 : e.include.includes(t.id) ? !0 : !(e.manualOnly || e.modelsMode === "selected" && !e.models.includes(t.modelId) || e.modelsMode === void 0 && e.models.length && !e.models.includes(t.modelId));
}
function Mn(t, e, n) {
  if (!e.manualOnly && e.modelsMode === "selected" && !e.models.length && !e.include.length)
    return "Не отмечены модели. Выберите файлы или включите «Все модели».";
  let a = 0;
  for (const o of t)
    if (se(o, e) && (a++, n || !o.hidden))
      return;
  return a ? `Все выбранные элементы (${a}) скрыты. Покажите их в модели или включите «Включать скрытые элементы» на вкладке «Правила».` : e.manualOnly ? "Ручная выборка пуста. Выделите элементы в 3D заново или нажмите «Сбросить ручной выбор»." : e.exclude.length ? "Нет элементов после ручных исключений. Проверьте исключения или нажмите «Сбросить ручной выбор»." : "В выбранных моделях нет доступных элементов. Обновите модели и проверьте состав выборки.";
}
const ti = (t) => JSON.stringify([
  t.type,
  ...[t.a, t.b].map(
    ({
      models: e,
      modelsMode: n,
      conditions: a,
      mode: o,
      include: i,
      exclude: r,
      manualOnly: l
    }) => ({
      models: e,
      modelsMode: n,
      conditions: a,
      mode: o,
      include: i,
      exclude: r,
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
]), ei = (t, e) => JSON.stringify([t, e].sort());
function ni(t, e, n) {
  const a = new Map(t.map((i) => [i.id, i])), o = e.map((i) => {
    const r = a.get(i.id);
    return a.delete(i.id), {
      ...i,
      workReplies: r?.workReplies?.map((l) => ({ ...l, stale: !0 })),
      exclusionPoint: r?.exclusionPoint,
      note: r?.note ?? "",
      assignee: r?.assignee ?? "",
      firstSeen: r?.firstSeen ?? n,
      lastSeen: n,
      state: !r || r.state === "resolved" || r.state === "excluded" && r.exclusionPoint && Math.hypot(...i.point.map((l, s) => l - r.exclusionPoint[s])) > 1e-3 ? "new" : r.state === "new" ? "active" : r.state
    };
  });
  for (const i of a.values())
    o.push({
      ...i,
      workReplies: i.workReplies?.map((r) => ({ ...r, stale: !0 })),
      state: i.state === "excluded" ? "excluded" : "resolved"
    });
  return o;
}
function Ze(t) {
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
  const a = (o) => /\.wdx(?:[?#].*)?$/i.test(o);
  for (const o of e.sets)
    o.selection.models = o.selection.models.filter(
      (i) => !a(i)
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
    o.warnings ??= [], o.modelsAtRun = o.modelsAtRun?.filter((i) => !a(i));
    for (const i of [o.a, o.b]) {
      if (!i || i.manualOnly !== void 0 && typeof i.manualOnly != "boolean" || i.modelsMode !== void 0 && !["all", "selected"].includes(i.modelsMode) || i.presetId !== void 0 && typeof i.presetId != "string" || !["all", "any"].includes(i.mode) || ![i.models, i.include, i.exclude].every(
        (r) => Array.isArray(r) && r.every((l) => typeof l == "string")
      ) || !Array.isArray(i.conditions) || !i.conditions.every(
        (r) => r && typeof r.field == "string" && typeof r.value == "string" && ["eq", "ne", "contains", "exists", "gt", "lt"].includes(r.op)
      ))
        throw Error("Некорректная выборка.");
      i.modelsMode ??= i.models.length ? "selected" : "all", i.models = i.models.filter((r) => !a(r)), i.conditions = [], i.mode = "all";
    }
    for (const i of o.results) {
      if (i?.workReplies !== void 0 && (!Array.isArray(i.workReplies) || !i.workReplies.every((r) => r && [r.changeId, r.responseId, r.author, r.comment, r.modifiedAt, r.importedAt, r.baseRun, r.exportId].every((l) => typeof l == "string") && ["fixed", "excluded", "active"].includes(r.state) && ["pending", "accepted", "rejected"].includes(r.decision) && Array.isArray(r.point) && r.point.length === 3 && r.point.every(Number.isFinite) && typeof r.stale == "boolean" && typeof r.legacy == "boolean")))
        throw Error("Некорректная история ответов исполнителя.");
      if (i?.exclusionPoint !== void 0 && (!Array.isArray(i.exclusionPoint) || i.exclusionPoint.length !== 3 || !i.exclusionPoint.every(Number.isFinite)))
        throw Error("Некорректная точка исключения.");
      if (i?.image !== void 0 && !Be(i.image))
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
      for (const r of [i?.overlapThicknessMm, i?.axialPenetrationMm, i?.contactLengthMm])
        if (r !== void 0 && (!Number.isFinite(r) || r < 0))
          throw Error("Некорректный размер пересечения.");
      if (i?.axialElementId !== void 0 && (typeof i.axialElementId != "string" || ![i.a?.id, i.b?.id].includes(i.axialElementId)))
        throw Error("Некорректный элемент продольного замера.");
      if (!i || typeof i.id != "string" || !Object.hasOwn(oe, i.state) || i.penetrationMm !== void 0 && (!Number.isFinite(i.penetrationMm) || i.penetrationMm < 0) || !Array.isArray(i.point) || i.point.length !== 3 || !i.point.every(Number.isFinite))
        throw Error("Некорректный результат.");
      for (const r of [i.a, i.b])
        if (!r || !["id", "name", "model", "modelId", "guid"].every(
          (l) => typeof r[l] == "string"
        ) || !r.properties || typeof r.properties != "object")
          throw Error("Некорректный элемент результата.");
    }
  }
  return e;
}
const kn = new TextEncoder(), ii = (() => {
  const t = new Uint32Array(256);
  for (let e = 0; e < t.length; e++) {
    let n = e;
    for (let a = 0; a < 8; a++)
      n = n & 1 ? 3988292384 ^ n >>> 1 : n >>> 1;
    t[e] = n >>> 0;
  }
  return t;
})(), oi = (t) => {
  let e = 4294967295;
  for (const n of t) e = ii[(e ^ n) & 255] ^ e >>> 8;
  return (e ^ 4294967295) >>> 0;
}, ai = (t) => t.getHours() << 11 | t.getMinutes() << 5 | t.getSeconds() >> 1, ri = (t) => Math.max(1980, t.getFullYear()) - 1980 << 9 | t.getMonth() + 1 << 5 | t.getDate(), si = (t) => {
  const e = new Uint8Array(t.reduce((a, o) => a + o.length, 0));
  let n = 0;
  for (const a of t)
    e.set(a, n), n += a.length;
  return e;
}, Ee = (t, e) => {
  const n = new Uint8Array(t);
  return e(new DataView(n.buffer)), n;
};
function li(t, e = /* @__PURE__ */ new Date()) {
  const n = [], a = [];
  let o = 0;
  for (const l of t) {
    const s = kn.encode(l.name.replaceAll("\\", "/")), c = oi(l.data), f = ai(e), u = ri(e), m = Ee(30, (x) => {
      x.setUint32(0, 67324752, !0), x.setUint16(4, 20, !0), x.setUint16(6, 2048, !0), x.setUint16(8, 0, !0), x.setUint16(10, f, !0), x.setUint16(12, u, !0), x.setUint32(14, c, !0), x.setUint32(18, l.data.length, !0), x.setUint32(22, l.data.length, !0), x.setUint16(26, s.length, !0);
    });
    n.push(m, s, l.data);
    const b = Ee(46, (x) => {
      x.setUint32(0, 33639248, !0), x.setUint16(4, 20, !0), x.setUint16(6, 20, !0), x.setUint16(8, 2048, !0), x.setUint16(10, 0, !0), x.setUint16(12, f, !0), x.setUint16(14, u, !0), x.setUint32(16, c, !0), x.setUint32(20, l.data.length, !0), x.setUint32(24, l.data.length, !0), x.setUint16(28, s.length, !0), x.setUint32(42, o, !0);
    });
    a.push(b, s), o += m.length + s.length + l.data.length;
  }
  const i = a.reduce((l, s) => l + s.length, 0), r = Ee(22, (l) => {
    l.setUint32(0, 101010256, !0), l.setUint16(8, t.length, !0), l.setUint16(10, t.length, !0), l.setUint32(12, i, !0), l.setUint32(16, o, !0);
  });
  return si([...n, ...a, r]);
}
const Ce = (t) => kn.encode(t), In = "0.10.0", K = (t) => String(t ?? "").replace(
  /[&<>"']/g,
  (e) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[e]
);
function Ke(t, e) {
  const n = URL.createObjectURL(
    e instanceof Blob ? e : new Blob([e], {
      type: t.endsWith(".html") ? "text/html;charset=utf-8" : "application/json;charset=utf-8"
    })
  ), a = document.createElement("a");
  a.href = n, a.download = t, a.click(), setTimeout(() => URL.revokeObjectURL(n), 6e4);
}
const ci = (t) => (t || "Отчёт о конфликтах").replace(/[<>:"/\\|?*\u0000-\u001f]/g, "_").replace(/[. ]+$/g, "").slice(0, 100) || "Отчёт о конфликтах", di = (t) => {
  const e = t.indexOf(","), n = atob(t.slice(e + 1)), a = new Uint8Array(n.length);
  for (let o = 0; o < n.length; o++) a[o] = n.charCodeAt(o);
  return a;
}, fi = {
  new: "Новый",
  active: "Активн.",
  reviewed: "Проверен",
  approved: "Утвержден",
  resolved: "Исправлен",
  excluded: "Исключен"
}, ee = (t, ...e) => {
  const n = (i) => i.toLowerCase().replace(/[^\p{L}\p{N}]+/gu, ""), a = new Set(e.map(n));
  return Object.entries(t.properties || {}).find(([i]) => a.has(n(i)))?.[1] || "";
}, pi = (t, e) => t.type === "duplicates" || e.kind === "touch" ? "0.000" : e.penetrationMm === void 0 || e.depth === "unmeasurable" || e.depth === "tolerance" ? "" : (-e.penetrationMm / 1e3).toFixed(3), ui = (t, e) => t.type === "duplicates" ? "Дублирование" : e.kind === "touch" ? "Касание" : e.axialPenetrationMm !== void 0 ? "По пересечению · продольный заход" : "По пересечению", _e = (t) => [
  `ID объекта: ${t.id}`,
  ee(t, "Слой", "Layer"),
  t.model,
  ee(t, "Объект Id", "Object Id", "Id") || t.id,
  ee(t, "IfcName", "ifc.name") || t.name,
  t.guid,
  ee(t, "Категория", "Category"),
  ee(t, "Семейство", "Family"),
  ee(t, "Объект Тип", "Тип", "Type"),
  ee(t, "IfcClass", "ifc.class", "Класс IFC")
];
function mi(t, e, n) {
  const a = ci(t.name), o = `${a}_files`, i = [], r = /* @__PURE__ */ new Map();
  for (let S = 0; S < e.length; S++) {
    const I = e[S].image;
    if (!Be(I)) continue;
    const A = I.startsWith("data:image/png") ? "png" : "jpg", $ = `cd${String(S + 1).padStart(6, "0")}.${A}`;
    r.set(e[S].id, $), i.push({ name: `${o}/${$}`, data: di(I) });
  }
  const l = ["Изображение", "Наименование конфликта", "Статус", "Расстояние", "Расположение сетки", "Описание:", "Дата обнаружения", "Точка конфликта", "Назначение", "Комментарий", "Толщина перекрытия, мм", "Заход вдоль оси, мм", "Длина контакта, мм"], s = ["Идентификатор элемента", "Слой", "Элемент Файл источника", "Объект Id", "Объект IfcName", "Объект IfcGUID", "Объект Категория", "Объект Семейство", "Объект Тип", "Объект IfcClass"], c = l.map((S) => `<td class="generalHeader">${K(S)}</td>`).join("") + s.map((S) => `<td class="item1Header">${K(S)}</td>`).join("") + s.map((S) => `<td class="item2Header">${K(S)}</td>`).join(""), f = e.map((S, I) => {
    const A = r.get(S.id), $ = A ? `${encodeURIComponent(o)}/${A}` : "", P = [
      A ? `<a target="_blank" href="${$}"><img border="0" width="160" src="${$}" alt="Снимок конфликта ${I + 1}"></a>` : "Снимок отсутствует",
      `Конфликт${I + 1}`,
      fi[S.state],
      pi(t, S),
      "",
      ui(t, S),
      S.firstSeen || t.lastRun || "",
      `X:${S.point[0].toFixed(4)}, Y:${S.point[1].toFixed(4)}, Z:${S.point[2].toFixed(4)}`,
      S.assignee,
      S.note,
      S.overlapThicknessMm === void 0 ? "" : St(S.overlapThicknessMm),
      S.axialPenetrationMm === void 0 ? "" : St(S.axialPenetrationMm),
      S.contactLengthMm === void 0 ? "" : `≈ ${St(S.contactLengthMm)}`
    ];
    return `<tr class="contentRow" data-check-id="${K(t.id)}" data-clash-id="${K(S.id)}">${P.map((L, B) => `<td class="contentCell">${B ? K(L) : L}</td>`).join("")}${_e(S.a).map((L) => `<td class="item1Content">${K(L)}</td>`).join("")}${_e(S.b).map((L) => `<td class="item2Content">${K(L)}</td>`).join("")}</tr>`;
  }).join(""), u = `<!doctype html><html><head><meta charset="utf-8"><title>Отчет о конфликтах</title><style>body,table{font-family:Calibri,Tahoma,Verdana,Arial,sans-serif}table{border-collapse:collapse}.titleTable{margin-bottom:16px}.headerCell{font-size:18pt;font-weight:bold}.testSummaryTable{border:3px solid #222;background:#eee;margin-bottom:16px}.testName{font-size:16pt;font-weight:bold;padding:12px}.mainTable td{border:1px solid #999;padding:6px;vertical-align:middle;min-width:90px}.headerRow{font-weight:bold}.generalHeader{background:#eee}.item1Header{background:#9cf}.item2Header{background:#fcc}.item1Content{background:#def}.item2Content{background:#fee}.contentRow{height:100px}</style></head><body><table class="titleTable"><tr class="headerRow"><td class="headerCell">Отчет о конфликтах</td></tr></table><table class="testSummaryTable"><tr class="headerRow"><td class="testName">${K(t.name)}</td></tr></table><table class="mainTable"><tr class="headerRow"><td colspan="${l.length}" class="generalHeader"></td><td colspan="${s.length}" class="item1Header">Элемент 1</td><td colspan="${s.length}" class="item2Header">Элемент 2</td></tr><tr class="headerRow">${c}</tr>${f}</table></body></html>`, m = `${a}.html`, b = hi(
    t,
    e,
    (S) => {
      const I = r.get(S.id);
      return I ? `${o}/${I}` : "";
    },
    {}
  ), x = {
    format: "nashepo.clash-package",
    exportId: crypto.randomUUID(),
    version: 1,
    createdAt: (/* @__PURE__ */ new Date()).toISOString(),
    project: n ? { id: n } : void 0,
    producer: {
      name: "nashepo.collisionfinder360",
      version: In
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
    { name: m, data: Ce(u) },
    { name: "review.json", data: Ce(JSON.stringify(b, null, 2)) },
    { name: "manifest.json", data: Ce(JSON.stringify(x, null, 2)) }
  );
  const M = li(i), N = M.buffer.slice(M.byteOffset, M.byteOffset + M.byteLength);
  return {
    archiveName: `${a}.zip`,
    htmlName: m,
    imageCount: r.size,
    blob: new Blob([N], { type: "application/zip" })
  };
}
const jn = {
  unmeasurable: "не определена",
  tolerance: "требует уточнения",
  approximate: "приблизительная оценка"
}, St = (t = 0) => t > 0 && t < 0.1 ? String(Number(t.toPrecision(2))) : t.toFixed(1), De = (t, e) => e === "duplicates" ? "—" : t.kind === "touch" ? "касание" : t.depth === "approximate" ? `≈ ${St(t.penetrationMm)}` : t.depth ? jn[t.depth] : St(t.penetrationMm);
function hi(t, e, n, a) {
  return {
    version: 1,
    id: t.id,
    name: t.name,
    images: a,
    warnings: t.warnings,
    tests: [
      {
        id: t.id,
        name: t.name,
        clashes: e.map((o, i) => ({
          id: o.id,
          name: `Конфликт ${i + 1}`,
          distance: t.type === "duplicates" ? "" : o.depth || o.kind === "touch" ? De(o, t.type) : `${St(o.penetrationMm)} мм`,
          date: t.lastRun || "",
          description: t.type === "duplicates" ? "Дублирование" : o.axialPenetrationMm !== void 0 ? "По пересечению · продольный заход" : "По пересечению",
          status: oe[o.state],
          group: o.assignee,
          note: o.note,
          point: o.point,
          image: n(o),
          enabled: o.state !== "resolved",
          reviewed: o.state === "resolved" || o.state === "reviewed" || o.state === "approved",
          excluded: o.state === "excluded",
          elements: [o.a, o.b].map((r) => ({
            guid: r.guid,
            id: r.id,
            source: r.model,
            name: r.name,
            properties: r.properties
          })),
          properties: {
            Проверка: t.name,
            Вид: o.kind,
            "Глубина для отбора, мм": De(o, t.type),
            ...o.contactLengthMm !== void 0 ? { "Длина контакта, мм": "≈ " + St(o.contactLengthMm) } : {},
            ...o.axialPenetrationMm !== void 0 ? {
              "Толщина перекрытия, мм": o.overlapThicknessMm === void 0 ? "—" : St(o.overlapThicknessMm),
              "Заход вдоль оси, мм": St(o.axialPenetrationMm)
            } : {}
          }
        }))
      }
    ]
  };
}
function gi(t, e, n) {
  const a = n.filter((l) => l.clash && !l.reason && !l.duplicate), o = n.filter((l) => l.duplicate).length, i = n.filter((l) => l.reason).length, r = document.createElement("dialog");
  return r.className = "response-dialog", r.innerHTML = `<h2>Ответ исполнителя · ${K(e.author)}</h2>
    <p>Новых отметок: <b>${a.length}</b> · Уже загружено: ${o} · Не сопоставлено: ${i}</p>
    <p>Комментарии сохранятся в истории. Текущие состояния коллизий изменятся только после вашего решения в карточке результата.</p>
    ${a.some((l) => l.stale) ? '<p class="response-warning">Есть ответы по прежнему запуску или изменённым координатам. Сверьте их с актуальными моделями.</p>' : ""}
    ${a.some((l) => l.legacy) ? '<p class="response-warning">У части исходных пакетов нет идентификатора проекта. Сопоставление выполнено по точным ID проверки и коллизии, GUID и моделям пары.</p>' : ""}
    <div class="response-list"><table><thead><tr><th>Проверка / коллизия</th><th>Ответ</th><th>Комментарий</th><th>Сопоставление</th></tr></thead><tbody>${n.slice(0, 200).map((l) => `<tr><td>${K(l.check?.name || l.change.checkId)}<br>${K(l.clash ? l.clash.a.name + " × " + l.clash.b.name : l.change.clashId)}</td><td>${K(Ge[l.change.state])}</td><td>${K(l.change.comment)}</td><td>${K(l.reason || (l.duplicate ? "Уже загружено" : l.stale ? "Требует сверки с новым запуском" : "Готово к загрузке"))}</td></tr>`).join("")}</tbody></table></div>
    ${n.length > 200 ? `<p>Показаны первые 200 из ${n.length} записей; будут загружены все ${a.length} сопоставленных отметок.</p>` : ""}
    <div class="dialog-actions"><button data-cancel>Закрыть</button><button data-apply class="primary" ${a.length ? "" : "disabled"}>Загрузить ${a.length} отметок</button></div>`, t.append(r), new Promise((l) => {
    let s = !1;
    r.querySelector("[data-cancel]").onclick = () => r.close(), r.querySelector("[data-apply]").onclick = () => {
      s = !0, r.close();
    }, r.onclose = () => {
      r.remove(), l(s);
    }, r.showModal();
  });
}
function xi(t) {
  return t.workReplies?.length ? `<details class="work-replies" open><summary>Ответы исполнителей · ${t.workReplies.length}</summary>${[...t.workReplies].reverse().map((e) => `<article><b>${K(e.author)} · ${K(Ge[e.state])}</b><small>${K(e.modifiedAt)} · ${K(yn[e.decision])}</small><p>${K(e.comment || "Без комментария")}</p>
    ${e.stale ? '<small class="response-warning">Ответ относится к предыдущему запуску или другим координатам. Состояние текущей коллизии показано отдельно.</small>' : ""}
    ${e.decision === "pending" ? `<div class="dialog-actions"><button data-reply="${K(e.changeId)}" data-decision="accepted">${e.state === "fixed" ? "Подтвердить исправление" : e.state === "excluded" ? "Принять исключение" : "Вернуть в работу"}</button><button data-reply="${K(e.changeId)}" data-decision="rejected">Отклонить</button></div>` : `<small>Решение: ${K(e.decidedAt || "")}</small>`}</article>`).join("")}</details>` : "";
}
const bi = `<h2>Работа с проверками</h2>
<details open><summary>1. Первая проверка</summary><ol><li>Откройте проект и подключите IFC/SMDX штатными средствами Топоматик 360.</li><li>Откройте нижнюю вкладку «Проверки» и нажмите «Модели».</li><li>Нажмите «＋ Новая проверка» и задайте ей понятное имя.</li><li>Во вкладке «Выбор» оставьте галочки только у нужных файлов в А и Б. «Все модели» включено по умолчанию.</li><li>Выберите «По пересечению» или «Дублирование» и нажмите «Запустить».</li><li>Во вкладке «Результаты» дважды нажмите строку: камера направится к конфликту, элемент А будет выделен красным, элемент Б — синим, и оба элемента станут выделенными в 3D-окне.</li></ol><p>Первое обновление без созданной проверки получает только список файлов. При запуске индексируются модели, отмеченные хотя бы в одной стороне. Файл проекта WDX служит контейнером и в выбор моделей не попадает.</p></details>
<details><summary>2. Выбор моделей и сохранённые наборы</summary><p>Выбор А и выбор Б задают две стороны сравнения. Снимите «Все модели» и отметьте конкретные IFC/SMDX. Для поиска дубликатов внутри одного файла отметьте его с обеих сторон.</p><p>Часто используемый состав можно сохранить как набор моделей, а затем применить в другой проверке. Наборы входят в файл проверок. Состав выборки задаётся галочками моделей и ручным выделением объектов.</p><p>IFC GUID читается из свойства <code>ifc.id</code>; также поддерживаются GlobalId, IfcGuid и GUID.</p></details>
<details><summary>3. Работа с выделением в 3D</summary><p>Сначала выделите элементы штатными средствами в 3D-окне, затем используйте кнопку в нужной стороне:</p><ul><li><b>Показать выбранные элементы</b> — выделяет весь текущий состав.</li><li><b>Только выделенные в 3D</b> — оставляет только выделенные объекты.</li><li><b>＋ Добавить из 3D</b> — добавляет выделенные объекты к моделям.</li><li><b>− Исключить из 3D</b> — исключает выделенные объекты.</li><li><b>Сбросить ручной выбор</b> — снова использует отмеченные модели.</li></ul><p>Ручные идентификаторы могут измениться после замены IFC/SMDX, поэтому такую выборку следует проверить заново.</p></details>
<details><summary>4. Пересечения, глубина, касания и дубликаты</summary><p><b>Пересечение</b> определяется по треугольным поверхностям элементов и вложенности тел. Раздельные сетки сначала проверяются вместе: совпадающие рёбра и разное разбиение швов больше не делают замкнутый элемент «неизмеримым». Признак замкнутости из исходной модели проверяется по граням: сам по себе он не подтверждает внутренний объём. Габаритные коробки отбирают близкие пары; общий габарит также ограничивает область замера глубины. Одна пара элементов формирует один результат.</p><p><b>Толщина перекрытия</b> — локальная оценка пересечения. Для контакта выбираются направления измерения, в том числе по его форме и нормалям граней. По ним измеряется общая часть проекций геометрии в области контакта и выбирается наименьшая пригодная ширина. Если обнаружены отдельные участки перекрытия, для пары сохраняется наибольшая из их глубин.</p><p><b>Заход вдоль оси</b> дополнительно измеряется для распознанной прямой трубы или вытянутого профиля, пересекающего более крупную конструкцию. Ось определяется по геометрии, её пересечения — по граням конструкции. Для круглого кабеля или трубы с поворотами плагин дополнительно распознаёт последовательные поперечные сечения и измеряет путь по их центрам. Соседние участки внутри одной оболочки объединяются в непрерывный заход; выход наружу и вход обратно дают отдельные участки, из которых берётся самый длинный. Такой замер помечается знаком ≈. При частичном заходе измеряется участок от внешней границы до конца профиля; при сквозном — от входа до выхода. Внутренняя пустота колодца входит в этот замер. Раздельные оболочки конструкции измеряются отдельно: расстояние между несвязанными частями не прибавляется. Сам по себе проход оси через габарит не создаёт коллизию: сначала должно быть обнаружено пересечение элементов.</p><p><b>Глубина для отбора</b> — большее из толщины перекрытия и продольного захода. Поэтому труба диаметром 50 мм, заходящая в конструкцию на 1000 мм, проходит порог 80 мм, а стык с заходом 5 мм — нет. Оба замера видны в карточке коллизии и HTML-отчёте, когда продольный заход удалось определить. Для отдельных отводов, фитингов и сопоставимых труб сохраняется локальный расчёт. Это не расстояние перемещения, устраняющего коллизию. Объём пересечения имеет кубические единицы и не заменяет глубину в миллиметрах.</p><p>Если оболочка содержит разрывы, плагин дополнительно определяет внутреннюю область по совокупности окружающих граней — методом обобщённого числа обхода. Когда такая область подтверждается, рассчитывается численная глубина со знаком ≈. Исходная модель при этом не изменяется. Это позволяет проверять трубы, отводы и другие объёмные элементы с дефектами сетки. Одиночная плоская грань не превращается в объёмное тело.</p><p><b>Ограничения метода.</b> Плагин не строит точное тело пересечения. Разделение контактов, выбор направлений и проверка заполнения являются оценкой. Для сложных невыпуклых и составных объектов, криволинейных поверхностей результат может зависеть от сетки и расположения геометрии. Продольный замер применяется к распознанным прямым профилям с длиной не менее четырёх поперечных размеров, когда конструкция шире профиля минимум в 2,5 раза по двум поперечным направлениям. Для изогнутого круглого кабеля или трубы замер по траектории доступен, если сетка содержит распознаваемые поперечные сечения и связи между ними. Если ось восстановить не удалось, остаётся локальный замер. У сложной связной невыпуклой оболочки продольный замер может включать промежутки между её поверхностями. Заданная точность не гарантирует такую же погрешность итоговой глубины. Результаты около принятого допуска следует проверять в 3D.</p><p><b>Столбец глубины:</b></p><ul><li><b>Число</b> — полученная оценка в миллиметрах. Малые положительные значения показываются с дополнительными знаками, чтобы не превратиться в ноль при округлении.</li><li><b>Касание</b> — найден контакт без разрешённого объёмного перекрытия. Такие пары включаются настройкой «Учитывать касания» и могут отсекаться порогом глубины как нулевые.</li><li><b>Не определена</b> — у геометрии не удалось определить внутреннюю область, например у одиночного листа или отдельных граней. Пересечение сохраняется; размер грани не выдаётся за глубину.</li><li><b>Требует уточнения</b> — пересечение найдено, однако его глубина не разрешена текущим расчётом. Причиной может быть неоднозначная геометрия контакта. Само по себе малое вхождение относительно настройки точности больше не является причиной отказа от замера.</li><li><b>≈</b> — приблизительная оценка: внутренняя область восстановлена для оболочки с разрывами, состыкованы немного расходящиеся швы либо при измерении сокращалась выборка или разделение контактов достигло предела. Для числа не гарантируются ни величина, ни направление ошибки.</li></ul><p>«Не определена» и «Требует уточнения» остаются в результатах независимо от минимальной глубины. Числовые оценки, в том числе со знаком ≈, сравниваются с порогом. Знак ≈ сообщает о приближённом расчёте и не отменяет фильтр. Найденное малое пересечение не должно исчезать только из-за отключённого учёта касаний: для определения пересечения и замера используется отдельный численный запас. Настройка точности не округляет малые вхождения до нуля.</p><p><b>Точность расчёта</b> задаётся в миллиметрах и влияет на отбор близких пар, разделение контактов и запас при фильтрации. При восстановлении швов допустимое расхождение ограничено этой величиной и дополнительно 0,01 мм. Приближённое восстановление внутренней области по граням — отдельный метод, его погрешность этой настройкой не гарантируется. <b>Минимальная глубина</b> — порог отбора результатов. Все числовые оценки сравниваются с порогом с запасом на точность: при минимуме 20 мм и точности 0,1 мм результат 19,95 мм остаётся. Этот порядок одинаков в расчёте, таблице и HTML-отчёте. После изменения точности или порога повторно запустите проверку.</p><p>Труба и отвод могут пересекаться в штатном соединении из-за формы исходной сетки. Такие соединения рассматриваются отдельно и при необходимости исключаются правилами.</p><p><b>Дублирование</b> ищет совпадающую треугольную геометрию в мировых координатах с заданной точностью. Геометрически одинаковые тела с разным разбиением поверхности на треугольники могут не считаться дубликатами.</p></details>
<details><summary>Длина бокового контакта</summary><p>Кабель может пересекать стенку боковой поверхностью, хотя его ось проходит снаружи. Для распознанных профилей и трасс отдельно измеряется <b>длина контакта</b>: пересечения фактических треугольных поверхностей проецируются вдоль элемента, и выбирается самый длинный непрерывный участок. Раздельные участки не складываются. Это приблизительный размер со знаком ≈; он доступен в таблице, карточке, HTML-отчёте и сессии.</p><p>Длина не заменяет глубину и не участвует в её пороге. Например, кабель может касаться стенки вдоль 1000 мм с нулевой глубиной или входить в неё на 5 мм вдоль тех же 1000 мм. Чистые касания попадают в результат только при включённом «Учитывать касания». Если профиль не распознан или замер неприменим, в столбце стоит прочерк. Для добавления длины в старые результаты запустите проверку повторно.</p></details>
<details><summary>5. Составные объекты и неполная геометрия</summary><p>Один IFC-объект может состоять из нескольких частей. В новых проверках правило «Не проверять геометрию одного составного объекта» включено по умолчанию. Его можно изменить во вкладке «Правила». Сохранённые проверки сохраняют выбранное ранее значение. Там же можно исключить пары одной модели или одинакового значения свойства.</p><p>Пустые и неполные геометрические части пропускаются, а пригодные части модели продолжают участвовать. Плагин показывает сводное замечание с количеством пропущенных элементов. Незагруженный подключённый файл блокирует расчёт только тогда, когда он входит в выборку.</p></details>
<details><summary>6. Результаты и состояния</summary><p>«Новый» найден впервые, «Активный» найден повторно, «Проверенный» рассмотрен, «Подтверждённый» подтверждён, «Исключённый» исключён из работы. «Исправленный» означает, что пара исчезла при повторном расчёте с теми же правилами; состояние можно изменить вручную.</p><p>В таблице доступны IFC GUID, расчётная глубина, назначение и комментарий. Фильтр «Глубина от» сравнивает порог с большим из доступных замеров: толщиной перекрытия и продольным заходом. Числа со знаком ≈ тоже участвуют в отборе; строки «не определена» и «требует уточнения» сохраняются для просмотра. Галочки меняют состояние сразу у нескольких строк. Значения можно выделять и копировать. При переходе стрелками активная строка автоматически прокручивается в видимую область. Состояние «Устарела» у проверки означает, что после последнего расчёта изменили её тип, выборки, параметры или правила.</p></details>
<details><summary>7. Отчёт и снимки</summary><p>После перехода к коллизии отсутствующий снимок создаётся автоматически, если пользователь задержался на результате. Кадр строится от той же камеры приближения, что и снимки отчёта: ракурс задаёт «Дистанция камеры» в настройках. Если дистанцию изменить, отчёт переснимет прежние кадры под новое значение. Быстрое переключение стрелками отменяет лишние снимки. Во время технической перерисовки поверх 3D-окна сохраняется предыдущий кадр, поэтому модель не должна мигать.</p><p>Кнопка «Снимок пары» сохраняет текущий ракурс только с двумя элементами коллизии: элемент А показан красным, элемент Б — синим. Такой кадр собран вручную, поэтому отчёт его не переснимает. На время подготовки отчёта нижняя панель автоматически уменьшается для широкого 3D-кадра и затем возвращается к прежнему размеру.</p><p>«Сформировать пакет отчёта» создаёт единый ZIP-архив. Его можно открыть напрямую в плагине Топоматик 360 «НашеПО · Коллизии». В РОБУР 0.12.0 и новее откройте ZIP кнопкой «Отчёт», без распаковки. Можно выбрать несколько пакетов сразу. В прежних версиях распакуйте архив целиком и откройте HTML рядом с папкой JPEG/PNG. В архив также входят <code>manifest.json</code> и <code>review.json</code> со стабильными идентификаторами проверки и коллизий. Они обеспечивают точную связь ответа исполнителя с исходной проверкой. В отчёт входят название проверки и конфликта, статус, отрицательное расстояние в метрах по правилам отчёта Navisworks, описание, дата, координаты, назначение, комментарий, расчётные размеры, данные обоих элементов, модели и IFC GUID.</p></details>
<details><summary>8. Папка проекта проверок</summary><p>В стандартном проекте WDX проверки сохраняются в служебной папке <code>nashepo.collisionfinder360</code> внутри проекта. У быстрого проекта перед первым запуском расчёта выберите отдельную папку на диске. Её можно подключить заранее через меню ⋮ → «Папка проверок…». Если папка содержит проверки, плагин предложит открыть их вместо текущих.</p><p>В папке хранятся <code>project.json</code> с правилами, наборами, результатами, статусами и комментариями, предыдущая копия <code>project.previous.json</code>, а в <code>images</code> — отдельные снимки. Изменения сохраняются автоматически; надпись «Сохранено в папке проекта» подтверждает запись. При ошибке записи сообщение остаётся на панели.</p><p>Для продолжения в другой день откройте соответствующие модели и ту же папку проверок. Стандартный проект подхватывает свою папку автоматически. Быстрый проект нужно снова связать командой «Папка проверок…». IFC/SMDX не копируются в папку проверок; модели открываются средствами Топоматик 360. При передаче перенесите всю служебную папку со снимками.</p><p>«Сохранить проверки» выгружает отдельную переносимую копию JSON; «Открыть проверки» заменяет текущие проверки данными из неё. «Очистить проект» очищает текущие проверки, наборы и результаты; исходные модели остаются в проекте. Предыдущая копия не является журналом истории. Ответы исполнителей и решения по ним хранятся в результатах проекта. Это история работы с коллизиями; полный архив всех снимков геометрии и запусков в неё не входит.</p><p>При переключении между «Коллизии» и «Проверки» таблицы сохраняются в пределах открытого приложения; знаки показывает активная панель. После перезапуска «Коллизии» отчёт или сессию нужно открыть заново.</p></details>
<details><summary>9. Ответ исполнителя из РОБУР</summary><p>Сформируйте ZIP на вкладке «Отчёт» и передайте исполнителю. В РОБУР он загружает ZIP, выделяет строки через Ctrl / Shift (Ctrl+A — все строки таблицы), выбирает «Исправленный», «Исключённый» или «Вернуть в работу» и добавляет комментарии. «Исключённый» означает предложение исключить конкретную коллизию; укажите причину. Скрытие знака не является исключением.</p><p>Кнопка «Создать отчёт» в РОБУР сохраняет изменённые строки в ZIP с читаемым HTML, исходными снимками и <code>response.json</code>. Исполнитель указывает имя и передаёт ответ вместе с обновлёнными моделями. Снимки в этом ответе взяты из исходного отчёта и сами по себе не доказывают исправление.</p><p>Откройте исходную папку проверок и выберите ⋮ → «Ответ исполнителя…». Перед загрузкой показываются совпадения, уже принятые записи и строки, которые не удалось сопоставить. Программа проверяет проект, ID проверки и коллизии, GUID/идентификаторы и модели обоих элементов. Она не сопоставляет строки только по названию или номеру. Пакеты ранних версий без ID проекта допускаются при точном совпадении остальных идентификаторов, с предупреждением.</p><p>Новые ответы появляются в столбце «Ответ исполнителя». Фильтр «Ожидают решения» оставляет неподтверждённые ответы. В карточке видны автор, время, комментарий и история. «Подтвердить исправление» / «Принять исключение» меняют состояние коллизии; «Отклонить» сохраняет комментарий и текущее состояние. Плагин не изменяет модель и не подтверждает исправление автоматически — сначала сверьте актуальные модели, при необходимости повторите расчёт.</p><p>Ответ по старому запуску или изменённой точке отмечается для сверки. Повторный импорт одного изменения не создаёт дубликаты, даже при повторной выгрузке отчёта. Чужие и несопоставленные записи не применяются. После принятого исключения отметка сохраняется в той же точке; при смещении расчётной точки более 1 мм коллизия снова становится новой. Пары продолжают пересчитываться для обнаружения изменений. Повторно найденная исправленная коллизия также возвращается в новые. История ответов сохраняется.</p><p><code>manifest.json</code> — паспорт исходного пакета и пути к файлам. <code>review.json</code> — исходные коллизии, их GUID, координаты, состояния и ссылки на снимки. <code>response.json</code> — только изменения исполнителя, автор и время; это не файл сессии «Коллизий». Ответ загружается именно в «Проверки». Обычный HTML без устойчивых идентификаторов можно просматривать и комментировать в РОБУР, но его ответ требует ручного сопоставления.</p></details>
<details><summary>10. Большие проекты</summary><p>Жёсткого предела в 6 млн треугольников нет. При запуске строится индекс только по отмеченным моделям. Точная геометрия передаётся в расчёт по мере появления близких пар в компактном индексированном виде.</p><p>Время и память всё равно зависят от состава выборок и числа потенциальных пар. Разделяйте проверки по моделям и системам. В сцене одновременно показывается до 3000 знаков; при 50 000 результатах расчёт останавливается без замены прежнего результата.</p></details>`;
function yi(t) {
  let e = t.parentElement, n;
  for (; e && !n; )
    n = [...e.children].find(
      (s) => s.classList.contains("resizer-horizontal")
    ), e = e.parentElement;
  if (!n) return () => {
  };
  const a = n, o = t.ownerDocument.defaultView;
  let i;
  const r = () => {
    if (i === void 0) return;
    const s = i;
    i = void 0, a.dispatchEvent(
      new MouseEvent("mouseup", { bubbles: !0, composed: !0 })
    ), a.hasPointerCapture(s) && a.releasePointerCapture(s);
  }, l = (s) => {
    s.button === 0 && (i = s.pointerId, a.setPointerCapture(s.pointerId));
  };
  return a.addEventListener("pointerdown", l), a.addEventListener("pointerup", r), a.addEventListener("pointercancel", r), a.addEventListener("lostpointercapture", r), o.addEventListener("blur", r), () => {
    r(), a.removeEventListener("pointerdown", l), a.removeEventListener("pointerup", r), a.removeEventListener("pointercancel", r), a.removeEventListener("lostpointercapture", r), o.removeEventListener("blur", r);
  };
}
const H = (t, e) => [t[0] - e[0], t[1] - e[1], t[2] - e[2]], zt = (t, e, n = 1) => [
  t[0] + e[0] * n,
  t[1] + e[1] * n,
  t[2] + e[2] * n
], _ = (t, e) => t[0] * e[0] + t[1] * e[1] + t[2] * e[2], Mt = (t, e) => [
  t[1] * e[2] - t[2] * e[1],
  t[2] * e[0] - t[0] * e[2],
  t[0] * e[1] - t[1] * e[0]
], tt = (t) => Math.hypot(...t), Jt = (t) => {
  const e = tt(t);
  return e > 1e-20 ? [t[0] / e, t[1] / e, t[2] / e] : void 0;
}, Tt = (t) => t.triangleCount ?? (t.indices ? t.indices.length / 3 : t.triangles.length / 9), Ct = (t, e, n) => t.indices && t.vertices ? t.vertices[t.indices[e * 3 + Math.floor(n / 3)] * 3 + n % 3] : t.triangles[e * 9 + n], yt = (t, e) => [0, 3, 6].map((n) => [
  Ct(t, e, n),
  Ct(t, e, n + 1),
  Ct(t, e, n + 2)
]);
function le(t) {
  const e = [1 / 0, 1 / 0, 1 / 0], n = [-1 / 0, -1 / 0, -1 / 0];
  for (let a = 0; a < t.length; a++) {
    const o = a % 3;
    e[o] = Math.min(e[o], t[a]), n[o] = Math.max(n[o], t[a]);
  }
  return { min: e, max: n };
}
const me = (t, e, n) => t.min.every((a, o) => a <= e.max[o] + n && t.max[o] >= e.min[o] - n);
function Le(t, e) {
  const n = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const l of e)
    for (let s = 0; s < 9; s++) {
      const c = s % 3, f = Ct(t, l, s);
      n.min[c] = Math.min(n.min[c], f), n.max[c] = Math.max(n.max[c], f);
    }
  if (e.length <= 12) return { ...n, ids: e };
  const a = n.max.map((l, s) => l - n.min[s]), o = a.indexOf(Math.max(...a)), i = (l) => Ct(t, l, o) + Ct(t, l, o + 3) + Ct(t, l, o + 6);
  e.sort((l, s) => i(l) - i(s));
  const r = e.length >> 1;
  return {
    ...n,
    left: Le(t, e.slice(0, r)),
    right: Le(t, e.slice(r))
  };
}
function* _t(t, e, n) {
  me(t, e, n) && (t.ids ? yield* t.ids : (yield* _t(t.left, e, n), yield* _t(t.right, e, n)));
}
function* Bt(t, e, n) {
  if (me(t, e, n)) {
    if (t.ids && e.ids) {
      for (const a of t.ids) for (const o of e.ids) yield [a, o];
      return;
    }
    if (t.ids) {
      yield* Bt(t, e.left, n), yield* Bt(t, e.right, n);
      return;
    }
    if (e.ids) {
      yield* Bt(t.left, e, n), yield* Bt(t.right, e, n);
      return;
    }
    yield* Bt(t.left, e.left, n), yield* Bt(t.left, e.right, n), yield* Bt(t.right, e.left, n), yield* Bt(t.right, e.right, n);
  }
}
function we(t, e) {
  const n = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const r of e)
    for (let l = 0; l < 3; l++)
      n.min[l] = Math.min(n.min[l], t[r].bounds.min[l]), n.max[l] = Math.max(n.max[l], t[r].bounds.max[l]);
  if (e.length <= 16) return { ...n, ids: e };
  const a = n.max.map((r, l) => r - n.min[l]), o = a.indexOf(Math.max(...a));
  e.sort(
    (r, l) => t[r].bounds.min[o] + t[r].bounds.max[o] - (t[l].bounds.min[o] + t[l].bounds.max[o])
  );
  const i = e.length >> 1;
  return {
    ...n,
    left: we(t, e.slice(0, i)),
    right: we(t, e.slice(i))
  };
}
function de(t, e, n, a) {
  const o = H(e, t), i = H(n[1], n[0]), r = H(n[2], n[0]), l = Mt(o, r), s = _(i, l);
  if (Math.abs(s) <= 1e-12 * tt(o) * tt(i) * tt(r)) return;
  const c = 1 / s, f = H(t, n[0]), u = _(f, l) * c, m = Mt(f, i), b = _(o, m) * c, x = _(r, m) * c, M = a / Math.max(tt(i), tt(r), a);
  if (u >= -M && b >= -M && u + b <= 1 + M && x >= -M && x <= 1 + M)
    return zt(t, o, Math.max(0, Math.min(1, x)));
}
function wi(t, e, n, a) {
  const o = n.map(Math.abs).indexOf(Math.max(...n.map(Math.abs))), i = [0, 1, 2].filter((s) => s !== o), r = (s, c, f) => (c[i[0]] - s[i[0]]) * (f[i[1]] - s[i[1]]) - (c[i[1]] - s[i[1]]) * (f[i[0]] - s[i[0]]), l = (s, c) => {
    const f = c.map((u, m) => r(u, c[(m + 1) % 3], s));
    return f.every((u) => u >= -a * tt(n)) || f.every((u) => u <= a * tt(n));
  };
  for (const s of t) if (l(s, e)) return s;
  for (const s of e) if (l(s, t)) return s;
  for (let s = 0; s < 3; s++)
    for (let c = 0; c < 3; c++) {
      const f = t[s], u = t[(s + 1) % 3], m = e[c], b = e[(c + 1) % 3], x = H(u, f), M = H(b, m), N = x[i[0]] * M[i[1]] - x[i[1]] * M[i[0]];
      if (Math.abs(N) < 1e-18) continue;
      const S = H(m, f), I = (S[i[0]] * M[i[1]] - S[i[1]] * M[i[0]]) / N, A = (S[i[0]] * x[i[1]] - S[i[1]] * x[i[0]]) / N;
      if (I >= 0 && I <= 1 && A >= 0 && A <= 1) return zt(f, x, I);
    }
}
function Sn(t, e, n, a) {
  for (let o = 0; o < 3; o++) {
    const i = de(t[o], t[(o + 1) % 3], e, n);
    i && a.push(i);
    const r = de(e[o], e[(o + 1) % 3], t, n);
    r && a.push(r);
  }
}
function An(t, e, n, a) {
  const o = Mt(H(t[1], t[0]), H(t[2], t[0])), i = Mt(H(e[1], e[0]), H(e[2], e[0])), r = tt(o), l = tt(i);
  if (r < 1e-20 || l < 1e-20) return;
  const s = e.map((f) => _(H(f, t[0]), o) / r), c = t.map((f) => _(H(f, e[0]), i) / l);
  if (!(s.every((f) => f > n) || s.every((f) => f < -n) || c.every((f) => f > n) || c.every((f) => f < -n))) {
    if (s.every((f) => Math.abs(f) <= n) && c.every((f) => Math.abs(f) <= n))
      return a ? wi(t, e, o, n) : void 0;
    if (!(!a && (!(Math.min(...s) < -n && Math.max(...s) > n) || !(Math.min(...c) < -n && Math.max(...c) > n))))
      for (let f = 0; f < 3; f++) {
        const u = de(t[f], t[(f + 1) % 3], e, n);
        if (u) return u;
        const m = de(e[f], e[(f + 1) % 3], t, n);
        if (m) return m;
      }
  }
}
class vi {
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
    const n = Jt(Mt(H(e[1], e[0]), H(e[2], e[0])));
    if (!n) return;
    const o = n[0] < -1e-9 || Math.abs(n[0]) <= 1e-9 && (n[1] < -1e-9 || Math.abs(n[1]) <= 1e-9 && n[2] < 0) ? [-n[0], -n[1], -n[2]] : [n[0], n[1], n[2]], i = this.key(o);
    for (this.items.has(i) || this.items.set(i, o); this.items.size > 512 && this.step > 10; ) {
      this.step /= 10;
      const r = /* @__PURE__ */ new Map();
      for (const l of this.items.values()) {
        const s = this.key(l);
        r.has(s) || r.set(s, l);
      }
      this.items = r;
    }
  }
  addFrom(e, n) {
    for (const a of n) this.add(yt(e, a));
  }
  values() {
    return [
      ...this.world,
      ...[...this.items].sort((e, n) => e[0] < n[0] ? -1 : 1).map(([, e]) => e)
    ];
  }
}
function fe(t, e) {
  const n = [
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0]
  ];
  for (const o of t) {
    const i = [o[0] - e[0], o[1] - e[1], o[2] - e[2]];
    for (let r = 0; r < 3; r++)
      for (let l = 0; l < 3; l++) n[r][l] += i[r] * i[l];
  }
  const a = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1]
  ];
  for (let o = 0; o < 12; o++) {
    let i = 0;
    for (let r = 0; r < 3; r++)
      for (let l = r + 1; l < 3; l++) i += n[r][l] * n[r][l];
    if (i <= 1e-30) break;
    for (let r = 0; r < 3; r++)
      for (let l = r + 1; l < 3; l++) {
        if (Math.abs(n[r][l]) <= 1e-30) continue;
        const s = (n[l][l] - n[r][r]) / (2 * n[r][l]), c = (s >= 0 ? 1 : -1) / (Math.abs(s) + Math.sqrt(s * s + 1)), f = 1 / Math.sqrt(c * c + 1), u = c * f;
        for (const m of [n, a])
          for (let b = 0; b < 3; b++) {
            const x = m[b][r], M = m[b][l];
            m[b][r] = f * x - u * M, m[b][l] = u * x + f * M;
          }
        for (let m = 0; m < 3; m++) {
          const b = n[r][m], x = n[l][m];
          n[r][m] = f * b - u * x, n[l][m] = u * b + f * x;
        }
      }
  }
  return [0, 1, 2].sort((o, i) => n[i][i] - n[o][o]).map((o) => Jt([a[0][o], a[1][o], a[2][o]])).filter((o) => !!o);
}
function Mi(t, e, n, a) {
  const o = e.min.map((f, u) => (f + e.max[u]) / 2), i = tt(H(e.max, e.min)), r = Math.max(n * 10, i / 50), l = (f) => [0, 1, 2].map(
    (u) => f.reduce((m, b) => m + b[u], 0) / f.length
  );
  let s = [{ hits: t, limits: [] }], c = !1;
  for (let f = 0; f < 12; f++) {
    const u = [];
    let m = !1;
    for (const b of s) {
      if (b.hits.length < 2) {
        u.push(b);
        continue;
      }
      if (u.length + s.length >= 64) {
        c = !0, u.push(b);
        continue;
      }
      const x = l(b.hits), M = [
        x,
        o,
        ...[0, 0.25, 0.5, 0.75].map(
          (d) => b.hits[Math.floor(d * (b.hits.length - 1))]
        )
      ], N = [
        [1, 0, 0],
        [0, 1, 0],
        [0, 0, 1]
      ], S = fe(b.hits, x);
      S[0] && N.push(S[0]);
      const I = (d) => {
        let v = -1 / 0, C = 1 / 0;
        for (const O of b.hits) {
          const T = _(O, d);
          T > v && (v = T), T < C && (C = T);
        }
        return v - C;
      }, A = (d) => Math.max(
        0,
        ...S.filter((v) => Math.abs(_(v, d)) < 0.9).map((v) => I(v))
      ), $ = (d) => {
        const v = b.hits.map((O) => _(O, d)).sort((O, T) => O - T), C = [];
        for (let O = 1; O < v.length; O++) {
          const T = v[O] - v[O - 1];
          T > r && C.push({ at: (v[O] + v[O - 1]) / 2, size: T });
        }
        return C.sort((O, T) => T.size - O.size);
      };
      let P, L = 0;
      for (const d of N) {
        const v = $(d);
        !v.length || v[0].size <= L || v[0].size <= A(d) || (L = v[0].size, a(d, v[0].at, M) && (P = { n: d, cuts: [v[0].at] }));
      }
      if (!P) {
        u.push(b);
        continue;
      }
      m = !0;
      const { n: B, cuts: F } = P, k = Array.from({ length: F.length + 1 }, () => []);
      for (const d of b.hits) {
        const v = _(d, B);
        let C = 0;
        for (; C < F.length && v >= F[C]; ) C++;
        k[C].push(d);
      }
      k.forEach(
        (d, v) => u.push({
          hits: d,
          limits: [
            ...b.limits,
            {
              n: B,
              from: v ? F[v - 1] : -1 / 0,
              to: v < F.length ? F[v] : 1 / 0
            }
          ]
        })
      );
    }
    if (s = u, m && f === 11 && (c = !0), !m) break;
  }
  return { zones: s, crowded: c };
}
function tn(t, e, n) {
  return n.every(({ n: a, from: o, to: i }) => {
    let r = 1 / 0, l = -1 / 0;
    for (let s = 0; s < 9; s += 3) {
      const c = Ct(t, e, s) * a[0] + Ct(t, e, s + 1) * a[1] + Ct(t, e, s + 2) * a[2];
      c < r && (r = c), c > l && (l = c);
    }
    return l >= o && r <= i;
  });
}
function en(t, e, n, a, o, i, r, l, s, c, f, u = !1) {
  let m = !1;
  const b = (F) => {
    let k = -1 / 0, d = 1 / 0;
    const v = (C) => {
      C > k && (k = C), C < d && (d = C);
    };
    for (const C of s) v(_(C, F));
    for (const [C, O, T] of [
      [t, n, 1],
      [e, a, 0]
    ]) {
      const U = Math.max(1, Math.floor(O.length / 32));
      U > 1 && (m = !0);
      for (let w = 0; w < O.length; w += U)
        for (const z of yt(C, O[w])) f(T, z) && v(_(z, F));
    }
    return Number.isFinite(k) && Number.isFinite(d) ? k - d : 0;
  }, x = (F) => {
    let k = 1 / 0, d = -1 / 0;
    for (let v = 0; v < 8; v++) {
      const C = (v & 1 ? r.max[0] : r.min[0]) * F[0] + (v & 2 ? r.max[1] : r.min[1]) * F[1] + (v & 4 ? r.max[2] : r.min[2]) * F[2];
      C < k && (k = C), C > d && (d = C);
    }
    return [k, d];
  }, M = (F, k, d, v, C) => {
    let O = 1 / 0, T = -1 / 0;
    for (const U of k) {
      let w = 1 / 0, z = -1 / 0;
      for (let Z = 0; Z < 9; Z += 3) {
        const Y = Ct(F, U, Z) * d[0] + Ct(F, U, Z + 1) * d[1] + Ct(F, U, Z + 2) * d[2];
        Y < w && (w = Y), Y > z && (z = Y);
      }
      z < v || w > C || (w < v && (w = v), z > C && (z = C), w < O && (O = w), z > T && (T = z));
    }
    return O === 1 / 0 ? void 0 : [O, T];
  };
  if (r.min.some((F, k) => r.max[k] - F <= 0))
    return { width: 0, thin: !1, approximate: !1 };
  const N = Math.ceil((n.length + a.length) / 4096), S = [
    ...o,
    ...N > 1 ? i.filter((F, k) => k < 3 || k % N === 0) : i
  ];
  N > 1 && S.length < o.length + i.length && (m = !0);
  const I = (F, k, d, v, C) => {
    const O = (w) => zt(l, d, w - _(l, d));
    if (!k) return f(F, O((v + C) / 2)) ? [v, C] : void 0;
    let [T, U] = k;
    return T > v && f(F, O((v + T) / 2)) && (T = v), U < C && f(F, O((U + C) / 2)) && (U = C), [T, U];
  }, A = (F, k) => F && k ? Math.min(F[1], k[1]) - Math.max(F[0], k[0]) : 0;
  let $ = 1 / 0, P = !1, L = !1, B = 0;
  for (let F = 0; F < S.length; F++) {
    const k = S[F], [d, v] = x(k), C = M(t, n, k, d, v), O = M(e, a, k, d, v);
    let T = A(C, O);
    if (T <= 0 && (B++ < 32 ? T = A(I(0, C, k, d, v), I(1, O, k, d, v)) : m = !0), u && s.length > 1) {
      let U = 1 / 0, w = -1 / 0;
      for (const z of s) {
        const Z = _(z, k);
        U = Math.min(U, Z), w = Math.max(w, Z);
      }
      T = Math.max(T, w - U);
    }
    if (T <= c && (F < o.length && B < 40 && (B++, T = b(k)), T <= c)) {
      F < o.length && (L = !0);
      continue;
    }
    P = !0, T < $ && ($ = T);
  }
  return {
    width: P && Number.isFinite($) ? $ : 0,
    thin: L,
    approximate: m
  };
}
const Gt = (t) => Math.max(1e-10, Math.max(1, ...t.bounds.min.map(Math.abs), ...t.bounds.max.map(Math.abs)) * Number.EPSILON * 64);
async function ki(t, e, n) {
  const a = Gt(t), o = Tt(t), i = { closed: !1, approximate: !1 }, r = new Uint32Array(o), l = new Uint8Array(o), s = new Uint8Array(o), c = new Uint8Array(o);
  for (let d = 0; d < o; d++) r[d] = d;
  const f = (d) => {
    if (r[d] !== d) {
      const v = r[d];
      r[d] = f(v), s[d] ^= s[v];
    }
    return r[d];
  }, u = (d, v, C) => {
    let O = f(d), T = f(v);
    const U = s[d] ^ s[v] ^ C;
    return O === T ? U === 0 : (l[O] < l[T] && ([O, T] = [T, O]), r[T] = O, s[T] = U, l[O] === l[T] && l[O]++, !0);
  }, m = /* @__PURE__ */ new Map(), b = [], x = /* @__PURE__ */ new Map(), M = o * 3, N = M * M <= Number.MAX_SAFE_INTEGER, S = (d, v) => N ? d * M + v : `${d},${v}`, I = (d, v) => {
    const C = d.map((T, U) => Math.round((T - t.bounds.min[U]) / a)).join(",");
    let O = m.get(C);
    return O === void 0 && (O = m.size, m.set(C, O), b.push(v)), O;
  };
  for (let d = 0; d < o; d++) {
    d % 2048 === 0 && await e();
    const v = yt(t, d);
    if (tt(Mt(H(v[1], v[0]), H(v[2], v[0]))) <= a * a) continue;
    const C = v.map((O, T) => I(O, d * 3 + T));
    if (new Set(C).size === 3) {
      c[d] = 1;
      for (let O = 0; O < 3; O++) {
        const T = C[O], U = C[(O + 1) % 3], w = T < U, z = w ? S(T, U) : S(U, T), Z = x.get(z);
        if (Z === void 0) x.set(z, (d + 1) * (w ? 1 : -1));
        else {
          if (Z === 0 || !u(d, Math.abs(Z) - 1, +(Z > 0 === w))) return i;
          x.set(z, 0);
        }
      }
    }
  }
  const A = (d) => {
    const v = b[d];
    return [0, 1, 2].map((C) => Ct(t, Math.floor(v / 3), v % 3 * 3 + C));
  }, $ = [];
  for (const [d, v] of x) if (v !== 0) {
    const C = typeof d == "number" ? [Math.floor(d / M), d % M] : d.split(",").map(Number), O = A(C[0]), T = A(C[1]);
    $.push({ p: O, q: T, face: v, bounds: le([...O, ...T]) }), $.length % 2048 === 0 && await e();
  }
  m.clear(), x.clear(), b.length = 0;
  let P = !1;
  if ($.length) {
    const d = Math.max(a, Math.min(1e-5, n)), v = we($, $.map((C, O) => O));
    for (let C = 0; C < $.length; C++) {
      C % 128 === 0 && await e();
      const O = $[C], T = H(O.q, O.p), U = tt(T), w = Jt(T), z = [];
      for (const Y of _t(v, O.bounds, d)) {
        if (C === Y) continue;
        const lt = $[Y], et = H(lt.p, O.p), Pt = H(lt.q, O.p), R = _(et, w), Q = _(Pt, w), at = Math.max(0, Math.min(R, Q)), it = Math.min(U, Math.max(R, Q));
        if (it - at <= a) continue;
        const bt = Math.max(tt(zt(et, w, -R)), tt(zt(Pt, w, -Q)));
        if (bt > d) continue;
        const ct = Q > R == (O.face > 0 == lt.face > 0);
        if (!u(Math.abs(O.face) - 1, Math.abs(lt.face) - 1, Number(ct))) return i;
        bt > a && (P = !0), z.push([at, it]);
      }
      z.sort((Y, lt) => Y[0] - lt[0]);
      let Z = 0;
      for (const [Y, lt] of z) {
        if (Math.abs(Y - Z) > a) return i;
        Z = lt;
      }
      if (Math.abs(Z - U) > a) return i;
    }
  }
  const L = new Float64Array(o), B = new Float64Array(o), F = t.bounds.min.map((d, v) => (d + t.bounds.max[v]) / 2);
  for (let d = 0; d < o; d++) {
    if (d % 2048 === 0 && await e(), !c[d]) continue;
    const v = f(d), C = yt(t, d);
    L[v] += (s[d] ? -1 : 1) * _(H(C[0], F), Mt(H(C[1], F), H(C[2], F))) / 6, B[v] += tt(Mt(H(C[1], C[0]), H(C[2], C[0]))) / 2;
  }
  let k = 0;
  for (let d = 0; d < o; d++) {
    if (B[d] && Math.abs(L[d]) <= a * B[d]) return i;
    k += Math.abs(L[d]);
  }
  return { closed: k > 0, approximate: P };
}
function Ii(t, e, n) {
  const a = H(e[1], e[0]), o = H(e[2], e[0]), i = Mt(a, o), r = tt(i);
  if (r < 1e-20 || Math.abs(_(H(t, e[0]), i)) / r > n) return !1;
  const l = H(t, e[0]), s = _(a, a), c = _(a, o), f = _(o, o), u = _(l, a), m = _(l, o), b = s * f - c * c;
  if (Math.abs(b) < 1e-30) return !1;
  const x = (u * f - m * c) / b, M = (m * s - u * c) / b, N = n / Math.max(tt(a), tt(o), n);
  return x >= -N && M >= -N && x + M <= 1 + N;
}
function ve(t, e, n, a) {
  for (const o of _t(n, { min: t, max: t }, a))
    if (Ii(t, yt(e, o), a)) return !0;
  return !1;
}
const Kt = (t) => t.closed || t.interior === "winding";
function Fe(t, e, n, a = !1) {
  const o = (r) => {
    if (r.moment) return r.moment;
    const l = [0, 0, 0];
    if (r.ids)
      for (const s of r.ids) {
        const c = yt(e, s), f = Mt(H(c[1], c[0]), H(c[2], c[0]));
        for (let u = 0; u < 3; u++) l[u] += f[u] / 2;
      }
    else {
      const s = o(r.left), c = o(r.right);
      for (let f = 0; f < 3; f++) l[f] = s[f] + c[f];
    }
    return r.moment = l;
  }, i = (r) => {
    const l = r.min.map((m, b) => (m + r.max[b]) / 2), s = H(l, t), c = tt(s), f = tt(H(r.max, r.min)) / 2;
    if (!a && c > f * 10 && c > 0)
      return _(o(r), s) / (c * c * c);
    if (!r.ids) return i(r.left) + i(r.right);
    let u = 0;
    for (const m of r.ids) {
      const b = yt(e, m), x = H(b[0], t), M = H(b[1], t), N = H(b[2], t), S = tt(x), I = tt(M), A = tt(N);
      !S || !I || !A || (u += 2 * Math.atan2(_(x, Mt(M, N)), S * I * A + _(x, M) * A + _(M, N) * S + _(N, x) * I));
    }
    return u;
  };
  return i(n) / (4 * Math.PI);
}
async function ji(t, e, n) {
  const a = Gt(t), o = (s) => !ve(s, t, e, a) && Math.abs(Fe(s, t, e)) > 0.9, i = t.bounds.min.map((s, c) => (s + t.bounds.max[c]) / 2);
  if (o(i)) return !0;
  const r = Tt(t), l = Math.max(1, Math.ceil(r / 32));
  for (let s = 0; s < r; s += l) {
    await n();
    const c = yt(t, s), f = Jt(Mt(H(c[1], c[0]), H(c[2], c[0])));
    if (!f) continue;
    const u = [0, 1, 2].map((b) => (c[0][b] + c[1][b] + c[2][b]) / 3), m = Math.max(a * 8, Math.min(tt(H(c[0], c[1])), tt(H(c[1], c[2])), tt(H(c[2], c[0]))) * 0.01);
    if (o(zt(u, f, m)) || o(zt(u, f, -m))) return !0;
  }
  return !1;
}
function ne(t, e, n, a) {
  if (!Kt(e) || t.some((u, m) => u < e.bounds.min[m] - a || u > e.bounds.max[m] + a) || ve(t, e, n, a)) return !1;
  if (e.interior === "winding") {
    const u = Math.abs(Fe(t, e, n));
    return Math.abs(u - 0.5) < 0.05 ? Math.abs(Fe(t, e, n, !0)) > 0.5 : u > 0.5;
  }
  const o = [1, 0.371390676, 0.52999894], i = tt(H(e.bounds.max, e.bounds.min)) * 3 + 1, r = zt(t, o, i), l = [], s = le([...t, ...r]);
  for (const u of _t(n, s, a)) {
    const m = de(t, r, yt(e, u), a);
    if (m) {
      const b = tt(H(m, t));
      b > a && l.push(b);
    }
  }
  l.sort((u, m) => u - m);
  let c = 0, f = -1 / 0;
  for (const u of l)
    u - f > a * 2 && (c++, f = u);
  return c % 2 === 1;
}
const Me = (t) => /отвод|тройник|муфт|фитинг|elbow|fitting|tee\b/i.test(t.name);
async function Si(t, e) {
  if (Me(t)) return;
  const n = Tt(t), a = Math.max(1, Math.ceil(n / 4096)), o = t.bounds.min.map((k, d) => (k + t.bounds.max[d]) / 2), i = [], r = [];
  for (let k = 0; k < n; k += a) {
    k % (a * 256) === 0 && await e();
    const d = yt(t, k), v = Mt(H(d[1], d[0]), H(d[2], d[0])), C = tt(v);
    C && (i.push(...d), r.push({ n: v.map((O) => O / C), area: C }));
  }
  if (i.length < 12) return;
  let l = fe(i, o)[0];
  const s = r.filter(({ n: k }) => Math.abs(_(k, l)) < 0.2);
  if (s.length < 4) return;
  const c = fe(s.map(({ n: k }) => k), [0, 0, 0])[2];
  if (Math.abs(_(c, l)) < 0.98) return;
  l = c;
  const f = l.map(Math.abs).indexOf(Math.max(...l.map(Math.abs)));
  l[f] < 0 && (l = l.map((k) => -k));
  const u = Math.abs(l[0]) < 0.7 ? [1, 0, 0] : [0, 1, 0], m = Jt(Mt(l, u)), b = Mt(l, m), x = [1 / 0, 1 / 0, 1 / 0], M = [-1 / 0, -1 / 0, -1 / 0];
  for (const k of i) for (const [d, v] of [l, m, b].entries()) {
    const C = _(H(k, o), v);
    x[d] = Math.min(x[d], C), M[d] = Math.max(M[d], C);
  }
  const N = M[0] - x[0], S = Math.max(M[1] - x[1], M[2] - x[2]), I = Math.min(M[1] - x[1], M[2] - x[2]);
  if (I <= Gt(t) * 8 || N + Gt(t) < S * 4 || S > I * 4) return;
  let A = 0, $ = 0;
  const P = /* @__PURE__ */ new Set();
  for (const { n: k, area: d } of r) {
    const v = Math.abs(_(k, l));
    $ += d, (v < 0.015 || v > 0.999) && (A += d), v < 0.015 && P.add(k.map((C) => Math.round(C * 100)).join(","));
  }
  if (A < $ * 0.995) return;
  const L = [];
  for (let k = 0; k < i.length; k += 3) {
    const d = i.slice(k, k + 3).map((v) => _(H(v, o), l));
    L.push([Math.min(...d), Math.max(...d)]);
  }
  L.sort((k, d) => k[0] - d[0]);
  let B = x[0];
  for (const [k, d] of L) {
    if (k > B + Gt(t) * 4) return;
    B = Math.max(B, d);
  }
  const F = zt(zt(o, m, (x[1] + M[1]) / 2), b, (x[2] + M[2]) / 2);
  return {
    axis: l,
    centre: F,
    from: x[0],
    to: M[0],
    width: S,
    round: P.size >= 6 && S < I * 1.2,
    sampled: a > 1
  };
}
async function Ai(t, e) {
  if (Me(t) || !/кабел|труб|cable|pipe/i.test(t.name)) return [];
  const n = Gt(t), a = [], o = /* @__PURE__ */ new Map(), i = /* @__PURE__ */ new Map(), r = (I) => {
    const A = I.map((P, L) => Math.round((P - t.bounds.min[L]) / n)).join(",");
    let $ = o.get(A);
    return $ === void 0 && ($ = a.length, a.push(I), o.set(A, $)), $;
  };
  for (let I = 0; I < Tt(t); I++) {
    I % 1024 === 0 && await e();
    const A = yt(t, I).map(r);
    for (let $ = 0; $ < 3; $++) {
      const P = Math.min(A[$], A[($ + 1) % 3]), L = Math.max(A[$], A[($ + 1) % 3]);
      P !== L && i.set(`${P},${L}`, [P, L, tt(H(a[P], a[L]))]);
    }
  }
  const l = [...i.values()].map((I) => I[2]).filter((I) => I > n).sort((I, A) => I - A);
  if (!l.length) return [];
  const s = l[Math.floor(l.length * 0.1)] * 1.25, c = Int32Array.from({ length: a.length }, (I, A) => A), f = (I) => {
    for (; c[I] !== I; )
      c[I] = c[c[I]], I = c[I];
    return I;
  };
  let u = 0;
  for (const [I, A, $] of i.values())
    ++u % 4096 === 0 && await e(), $ <= s && (c[f(A)] = f(I));
  const m = /* @__PURE__ */ new Map();
  for (let I = 0; I < a.length; I++) {
    const A = f(I), $ = m.get(A);
    $ ? $.push(a[I]) : m.set(A, [a[I]]);
  }
  const b = /* @__PURE__ */ new Map();
  for (const [I, A] of m) {
    if (await e(), A.length < 6 || A.length > 256) continue;
    const $ = A[0], P = [0, 1, 2].map((k) => $[k] + A.reduce((d, v) => d + v[k] - $[k], 0) / A.length), L = A.map((k) => tt(H(k, P))), B = Math.max(...L), F = fe(A, P)[2];
    !F || B <= n || Math.min(...L) < B * 0.88 || A.some((k) => Math.abs(_(H(k, P), F)) > Math.max(n * 16, B * 2e-3)) || b.set(I, { centre: P, radius: B, normal: F });
  }
  const x = /* @__PURE__ */ new Map();
  for (const [I, A] of i.values()) {
    ++u % 4096 === 0 && await e();
    const $ = Math.min(f(I), f(A)), P = Math.max(f(I), f(A));
    if ($ === P || !b.has($) || !b.has(P)) continue;
    const L = `${$},${P}`, B = x.get(L);
    B ? B.count++ : x.set(L, { a: $, b: P, count: 1 });
  }
  const M = /* @__PURE__ */ new Map();
  for (const { a: I, b: A, count: $ } of x.values()) {
    const P = b.get(I), L = b.get(A), B = Jt(H(L.centre, P.centre));
    $ < 6 || !B || Math.min(P.radius, L.radius) < Math.max(P.radius, L.radius) * 0.8 || Math.abs(_(B, P.normal)) < 0.5 || Math.abs(_(B, L.normal)) < 0.5 || (M.set(I, [...M.get(I) || [], A]), M.set(A, [...M.get(A) || [], I]));
  }
  const N = /* @__PURE__ */ new Set(), S = [];
  for (const [I, A] of M) {
    if (A.length !== 1 || N.has(I)) continue;
    let $ = I, P = -1;
    const L = [];
    for (; !N.has($); ) {
      N.add($);
      const B = M.get($) || [];
      if (B.length > 2) break;
      const F = B.find((O) => O !== P);
      if (F === void 0 || N.has(F)) break;
      const k = b.get($), d = b.get(F), v = H(d.centre, k.centre), C = tt(v);
      C > n && L.push({
        axis: v.map((O) => O / C),
        centre: k.centre,
        from: 0,
        to: C,
        width: Math.max(k.radius, d.radius) * 2,
        round: !0,
        sampled: !0
      }), P = $, $ = F;
    }
    L.length && S.push(L);
  }
  return S;
}
async function $i(t, e) {
  const n = Tt(t), a = Int32Array.from({ length: n }, (s, c) => c), o = new Uint8Array(n), i = /* @__PURE__ */ new Map(), r = Gt(t), l = (s) => {
    for (; a[s] !== s; )
      a[s] = a[a[s]], s = a[s];
    return s;
  };
  for (let s = 0; s < n; s++) {
    s % 2048 === 0 && await e();
    for (const c of yt(t, s)) {
      const f = c.map((x, M) => Math.round((x - t.bounds.min[M]) / r)).join(","), u = i.get(f);
      if (u === void 0) {
        i.set(f, s);
        continue;
      }
      let m = l(s), b = l(u);
      m !== b && (o[m] < o[b] && ([m, b] = [b, m]), a[b] = m, o[m] === o[b] && o[m]++);
    }
  }
  for (let s = 0; s < n; s++) a[s] = l(s);
  return a;
}
async function Ei(t, e, n, a, o) {
  const { axis: i, centre: r } = t, l = Math.abs(i[0]) < 0.7 ? [1, 0, 0] : [0, 1, 0], s = Jt(Mt(i, l)), c = Mt(i, s), f = [1 / 0, 1 / 0, 1 / 0], u = [-1 / 0, -1 / 0, -1 / 0], m = Gt(e);
  for (let $ = 0; $ < Tt(e); $++) {
    $ % 2048 === 0 && await a();
    for (const P of yt(e, $)) for (const [L, B] of [i, s, c].entries()) {
      const F = _(H(P, r), B);
      f[L] = Math.min(f[L], F), u[L] = Math.max(u[L], F);
    }
  }
  if (u[1] - f[1] < t.width * 2.5 || u[2] - f[2] < t.width * 2.5) return [];
  const b = Math.max(1, u[0] - f[0]), x = zt(r, i, f[0] - b), M = zt(r, i, u[0] + b), N = [];
  let S = 0;
  for (const $ of _t(n, le([...x, ...M]), m)) {
    ++S % 256 === 0 && await a();
    const P = de(x, M, yt(e, $), m);
    P && N.push({ triangle: $, at: _(H(P, r), i) });
  }
  if (N.length < 2) return [];
  const I = await o(), A = /* @__PURE__ */ new Map();
  for (const $ of N) {
    const P = I[$.triangle], L = A.get(P);
    L ? (L[0] = Math.min(L[0], $.at), L[1] = Math.max(L[1], $.at)) : A.set(P, [$.at, $.at]);
  }
  return [...A].map(([$, [P, L]]) => ({ part: $, from: Math.max(t.from, P), to: Math.min(t.to, L) })).filter(({ from: $, to: P }) => P - $ > m);
}
async function Ci(t, e, n, a, o) {
  let i = 0;
  const r = Gt(e);
  for (const l of t) {
    let s = 0;
    const c = /* @__PURE__ */ new Map();
    for (const f of l) {
      await a();
      for (const u of await Ei(f, e, n, a, o)) {
        const m = c.get(u.part) || [];
        m.push([s + u.from - f.from, s + u.to - f.from]), c.set(u.part, m);
      }
      s += f.to - f.from;
    }
    for (const f of c.values()) {
      f.sort((b, x) => b[0] - x[0]);
      let u = f[0][0], m = f[0][1];
      for (const [b, x] of f.slice(1))
        b <= m + r * 4 ? m = Math.max(m, x) : (i = Math.max(i, m - u), u = b, m = x);
      i = Math.max(i, m - u);
    }
  }
  return i > r ? i * 1e3 : void 0;
}
function zi(t, e, n) {
  const a = Jt(Mt(H(e[1], e[0]), H(e[2], e[0])));
  if (!a) return [];
  if (t.some((i) => Math.abs(_(H(i, e[0]), a)) > n)) {
    const i = [];
    return Sn(t, e, n, i), i;
  }
  let o = t;
  for (let i = 0; i < 3 && o.length; i++) {
    const r = e[i], l = H(e[(i + 1) % 3], r), s = Jt(Mt(a, l));
    if (!s) return [];
    const c = [];
    for (let f = 0; f < o.length; f++) {
      const u = o[f], m = o[(f + 1) % o.length], b = _(H(u, r), s), x = _(H(m, r), s);
      b >= -n && c.push(u), b >= -n != x >= -n && c.push(zt(u, H(m, u), Math.max(0, Math.min(1, b / (b - x)))));
    }
    o = c;
  }
  return o;
}
async function Pi(t, e, n, a, o, i) {
  const r = Math.max(Gt(e), Gt(n)), l = t.map(() => []), s = t.map((m) => {
    let b = 0;
    return m.map((x) => {
      const M = { p: x, offset: b };
      return b += x.to - x.from, M;
    });
  }), c = (m, b, x) => {
    let M = 0, N = m.length;
    for (; M < N; ) {
      const I = M + N >> 1;
      m[I][1] < b - r * 4 ? M = I + 1 : N = I;
    }
    let S = M;
    for (; S < m.length && m[S][0] <= x + r * 4; )
      b = Math.min(b, m[S][0]), x = Math.max(x, m[S][1]), S++;
    m.splice(M, S - M, [b, x]);
  };
  let f = 0;
  for (const [m, b] of Bt(a, o, r)) {
    ++f % 256 === 0 && await i();
    const x = yt(e, m), M = yt(n, b);
    if (!An(x, M, r, !0)) continue;
    const N = zi(x, M, r);
    if (!(N.length < 2))
      for (let S = 0; S < s.length; S++) for (const { p: I, offset: A } of s[S]) {
        const $ = N.map((B) => _(H(B, I.centre), I.axis)), P = Math.max(I.from, Math.min(...$)), L = Math.min(I.to, Math.max(...$));
        L - P <= r || N.some((B, F) => {
          const k = Math.max(I.from, Math.min(I.to, $[F]));
          return tt(H(B, zt(I.centre, I.axis, k))) <= I.width * 0.7 + r;
        }) && c(l[S], A + P - I.from, A + L - I.from);
      }
  }
  let u = 0;
  for (const m of l) for (const [b, x] of m) u = Math.max(u, x - b);
  return u > r ? u * 1e3 : void 0;
}
async function Ni(t, e, n, a, o) {
  const i = e.precision / 1e3;
  if (!Number.isFinite(i) || i <= 0)
    throw Error("Точность расчёта должна быть положительным числом.");
  const r = t.filter((w) => e.includeHidden || !w.hidden), l = r.filter((w) => se(w, e.a)), s = r.filter((w) => se(w, e.b));
  if (!l.length || !s.length) {
    const w = l.length ? "Б" : "А", z = l.length ? e.b : e.a;
    throw Error(`Выбор ${w}: ${Mn(t, z, e.includeHidden)}`);
  }
  let c = performance.now();
  const f = async () => {
    if (a())
      throw Error("Расчёт отменён. Предыдущие результаты сохранены.");
    performance.now() - c > 16 && (await new Promise((w) => setTimeout(w, 0)), c = performance.now());
  }, u = /* @__PURE__ */ new Map(), m = (w) => {
    let z = u.get(w.id);
    return z || (z = Le(
      w,
      Array.from({ length: Tt(w) }, (Z, Y) => Y)
    ), u.set(w.id, z)), z;
  }, b = /* @__PURE__ */ new Map(), x = /* @__PURE__ */ new Map(), M = /* @__PURE__ */ new Map(), N = async (w) => {
    let z = M.get(w.id);
    return z || (z = await Ai(w, f), M.set(w.id, z)), z;
  }, S = /* @__PURE__ */ new Map(), I = async (w) => {
    let z = S.get(w.id);
    return z || (z = await $i(w, f), S.set(w.id, z)), z;
  }, A = async (w) => (x.has(w.id) || x.set(w.id, await Si(w, f)), x.get(w.id)), $ = async (w) => {
    if (e.type !== "intersection") return w;
    let z = b.get(w.id);
    return z === void 0 && (z = await ki(w, f, i), !z.closed && await ji(w, m(w), f) && (z = { closed: !1, approximate: !0, winding: !0 }), b.set(w.id, z)), z.winding ? { ...w, closed: !1, interior: "winding" } : z.closed === w.closed ? w : { ...w, closed: z.closed };
  }, P = /* @__PURE__ */ new Map(), L = async (w) => {
    let z = P.get(w.id);
    if (z !== void 0) return z;
    const Z = [];
    for (let Y = 0; Y < Tt(w); Y++)
      Z.push(
        [0, 3, 6].map(
          (lt) => [0, 1, 2].map((et) => Math.round(Ct(w, Y, lt + et) / i)).join(",")
        ).sort().join(";")
      ), Y % 9e3 === 0 && await f();
    return z = Z.sort().join("|"), P.set(w.id, z), z;
  }, B = [], F = new Set(l.map((w) => w.id)), k = new Set(s.map((w) => w.id)), d = we(
    s,
    s.map((w, z) => z)
  ), v = /* @__PURE__ */ new Map();
  let C = 0;
  const O = (w) => w.triangles.byteLength + (w.vertices?.byteLength || 0) + (w.indices?.byteLength || 0) + Tt(w) * 32;
  async function T(w, z) {
    if (!o) return w;
    let Z = v.get(w.id);
    if (Z)
      return v.delete(w.id), v.set(w.id, Z), Z;
    for (const [Y, lt] of v)
      Y !== z && C > 96 * 1024 * 1024 && (v.delete(Y), C -= O(lt), u.delete(Y), S.delete(Y), M.delete(Y), P.delete(Y));
    return Z = await o(w.id), v.set(w.id, Z), C += O(Z), Z;
  }
  let U = -1 / 0;
  for (let w = 0; w < l.length; w++) {
    const z = l[w];
    performance.now() - U > 150 && (U = performance.now(), n({
      phase: "Проверка пар",
      done: w,
      total: l.length,
      found: B.length
    }));
    const Z = [..._t(d, z.bounds, i)];
    for (let Y = 0; Y < Z.length; Y++) {
      const lt = Z[Y];
      performance.now() - U > 150 && (U = performance.now(), n({
        phase: `Проверка пар · A ${w + 1}/${l.length} · кандидаты ${Y + 1}/${Z.length}`,
        done: w,
        total: l.length,
        found: B.length
      }));
      const et = s[lt];
      if (await f(), z.id === et.id || !me(z.bounds, et.bounds, i) || e.ignoreSameModel && z.modelId === et.modelId || e.ignoreSameGroup && z.modelId === et.modelId && z.properties.Объект && z.properties.Объект === et.properties.Объект || e.equalProperty && z.properties[e.equalProperty] !== void 0 && z.properties[e.equalProperty] === et.properties[e.equalProperty] || z.id > et.id && F.has(et.id) && k.has(z.id)) continue;
      const Pt = ei(z.id, et.id), R = await $(await T(z)), Q = await $(await T(et, z.id));
      let at, it = "surface", bt = 0, ct, At, ut, jt, V;
      if (e.type === "duplicates") {
        if (Tt(R) !== Tt(Q) || R.bounds.min.some(
          (xt, rt) => Math.abs(xt - Q.bounds.min[rt]) > i || Math.abs(R.bounds.max[rt] - Q.bounds.max[rt]) > i
        ))
          continue;
        await L(R) === await L(Q) && (at = R.bounds.min.map((xt, rt) => (xt + R.bounds.max[rt]) / 2), it = "duplicate");
      } else {
        const xt = m(R), rt = m(Q), pt = Math.max(
          1,
          ...R.bounds.min.map(Math.abs),
          ...R.bounds.max.map(Math.abs),
          ...Q.bounds.min.map(Math.abs),
          ...Q.bounds.max.map(Math.abs)
        ), st = Math.max(1e-10, pt * Number.EPSILON * 64), dt = {
          min: R.bounds.min.map(
            (wt, ot) => Math.max(wt, Q.bounds.min[ot])
          ),
          max: R.bounds.max.map(
            (wt, ot) => Math.min(wt, Q.bounds.max[ot])
          )
        }, Dt = dt.min.map(
          (wt, ot) => (wt + dt.max[ot]) / 2
        ), Wt = new vi(), vt = [];
        let Nt = 1, te = 0, ge = 1 / 0, Ie = 0;
        for (const [wt, ot] of Bt(xt, rt, i)) {
          const $t = yt(R, wt), Ot = yt(Q, ot);
          if (!me(le($t.flat()), le(Ot.flat()), i)) continue;
          const kt = An($t, Ot, st, e.touching);
          if (kt) {
            const Lt = tt(H(kt, Dt));
            if ((!at || Lt < ge) && (at = kt, ge = Lt), Wt.add($t), Wt.add(Ot), te++ % Nt === 0 && (Sn($t, Ot, st, vt), vt.length || vt.push(kt), vt.length >= 8192)) {
              for (let Ft = 0; Ft * 2 < vt.length; Ft++) vt[Ft] = vt[Ft * 2];
              vt.length = Math.ceil(vt.length / 2), Nt *= 2;
            }
          }
          ++Ie % 256 === 0 && (performance.now() - U > 150 && (U = performance.now(), n({
            phase: `Геометрия пары · A ${w + 1}/${l.length}`,
            done: w,
            total: l.length,
            found: B.length
          })), await f());
        }
        if (!at && Kt(R) && Kt(Q)) {
          const wt = Dt;
          ne(wt, R, xt, st) && ne(wt, Q, rt, st) && (at = wt, it = "contained");
        }
        if (!at) {
          for (const [wt, ot, $t] of [
            [R, Q, rt],
            [Q, R, xt]
          ])
            if (Kt(ot)) {
              for (let Ot = 0; Ot < Tt(wt) && !at; Ot++) {
                const kt = yt(wt, Ot), Lt = kt[0].map(
                  (Ft, Qt) => (kt[0][Qt] + kt[1][Qt] + kt[2][Qt]) / 3
                );
                for (const Ft of [kt[0], Lt])
                  if (ne(Ft, ot, $t, st)) {
                    at = Ft, it = "contained";
                    break;
                  }
                await f();
              }
              if (at) break;
            }
        }
        if (at) {
          const wt = (J, X) => [..._t(X, dt, i)].filter(
            (ft) => me(le(yt(J, ft).flat()), dt, i)
          ), ot = wt(R, xt), $t = wt(Q, rt);
          it !== "surface" && (Wt.addFrom(R, ot), Wt.addFrom(Q, $t)), await f();
          const Ot = dt.min.map(
            (J, X) => (J + dt.max[X]) / 2
          ), kt = (J, X) => J === 0 ? ne(X, R, xt, st) : ne(X, Q, rt, st), Lt = (J, X) => J === 0 ? ne(X, R, xt, st) || ve(X, R, xt, st) : ne(X, Q, rt, st) || ve(X, Q, rt, st);
          if (it === "contained") {
            const J = Math.max(1, Math.ceil((ot.length + $t.length) / 4096));
            Nt = Math.max(Nt, J);
            const X = /* @__PURE__ */ new Set();
            for (const [ft, mt, gt] of [[R, ot, 1], [Q, $t, 0]]) {
              for (let It = 0; It < mt.length; It += J) {
                It % (J * 32) === 0 && await f();
                for (const Et of yt(ft, mt[It])) {
                  const Vt = Et.join(",");
                  X.has(Vt) || (X.add(Vt), Lt(gt, Et) && vt.push(Et));
                }
              }
              X.clear();
            }
            if (R.interior === "winding" || Q.interior === "winding") {
              const ft = (mt, gt) => {
                let It = 1, Et = 0;
                for (; mt; mt = Math.floor(mt / gt))
                  It /= gt, Et += It * (mt % gt);
                return Et;
              };
              for (let mt = 1; mt <= 2048; mt++) {
                mt % 16 === 0 && await f();
                const gt = [2, 3, 5].map((It, Et) => dt.min[Et] + ft(mt, It) * (dt.max[Et] - dt.min[Et]));
                kt(0, gt) && kt(1, gt) && vt.push(gt);
              }
            }
          }
          const Ft = (J, X, ft) => Kt(R) && Kt(Q) && ft.every((mt) => {
            const gt = zt(mt, J, X - _(mt, J));
            return !Lt(0, gt) || !Lt(1, gt);
          }), Qt = () => [0, 1, 2].map(
            (J) => vt.reduce((X, ft) => X + ft[J], 0) / vt.length
          ), p = it === "surface" && vt.length > 2 ? fe(vt, Qt())[2] : void 0, h = p ? en(
            R,
            Q,
            ot,
            $t,
            [p],
            [],
            dt,
            Qt(),
            vt,
            st,
            kt
          ) : void 0, g = !h || h.width > st, y = !g && !!h?.approximate, j = !Kt(R) || !Kt(Q);
          if (!j && !g && !y && (it = "touch"), it === "touch" && !e.touching) continue;
          const { zones: D, crowded: E } = Mi(vt, dt, i, Ft), q = Wt.values();
          let G = 0, W = !y, nt = E || Nt > 1 || !!h?.approximate || !!b.get(R.id)?.approximate || !!b.get(Q.id)?.approximate;
          for (const J of it === "touch" ? [] : D) {
            const X = J.limits.length ? ot.filter((It) => tn(R, It, J.limits)) : ot, ft = J.limits.length ? $t.filter((It) => tn(Q, It, J.limits)) : $t, mt = J.hits.length ? [0, 1, 2].map(
              (It) => J.hits.reduce((Et, Vt) => Et + Vt[It], 0) / J.hits.length
            ) : Ot, gt = en(
              R,
              Q,
              X,
              ft,
              J.hits.length > 2 ? fe(J.hits, mt) : [],
              q,
              dt,
              mt,
              J.hits,
              st,
              kt,
              it === "contained"
            );
            gt.thin && (W = !1), gt.approximate && (nt = !0), gt.width > G && (G = gt.width), await f();
          }
          if (G *= 1e3, it === "touch" ? ct = void 0 : j ? ct = "unmeasurable" : G <= 0 || !W ? ct = "tolerance" : nt && (ct = "approximate"), bt = it === "touch" || ct === "unmeasurable" || ct === "tolerance" ? 0 : G, !Me(R) && !Me(Q)) {
            const J = await A(R), X = await A(Q);
            for (const [ft, mt, gt, It, Et] of [[J, R, Q, X, rt], [X, Q, R, J, xt]]) {
              if (It?.round && /труб|pipe/i.test(gt.name)) continue;
              const Vt = ft ? [[ft]] : await N(mt);
              if (!Vt.length) continue;
              const We = await Pi(Vt, mt, gt, mt === R ? xt : rt, Et, f);
              if (We !== void 0 && (V = Math.max(V ?? 0, We)), it === "touch") continue;
              const je = await Ci(Vt, gt, Et, f, () => I(gt));
              je === void 0 || je <= (ut ?? 0) || (ut = je, jt = mt.id, ft || (ct = ct || "approximate"));
            }
            ut !== void 0 && (At = ct === "unmeasurable" || ct === "tolerance" ? void 0 : bt, bt = Math.max(bt, ut), (ct === "unmeasurable" || ct === "tolerance" || J?.sampled || X?.sampled) && (ct = "approximate"));
          }
          await f();
        }
        if (at && !vn({ kind: it, depth: ct, penetrationMm: bt }, e.minPenetration, e.precision))
          continue;
      }
      if (at && (B.push({
        id: Pt,
        a: Xe(R),
        b: Xe(Q),
        point: at,
        kind: it,
        state: "new",
        note: "",
        assignee: "",
        firstSeen: "",
        lastSeen: "",
        penetrationMm: bt,
        ...ut !== void 0 ? { axialPenetrationMm: ut, axialElementId: jt, overlapThicknessMm: At } : {},
        ...V !== void 0 ? { contactLengthMm: V } : {},
        ...ct ? { depth: ct } : {}
      }), B.length >= 5e4))
        throw Error(
          "Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат."
        );
    }
  }
  return n({
    phase: "Готово",
    done: l.length,
    total: l.length,
    found: B.length
  }), B;
}
const $n = '(function(){"use strict";const rn=(n,t,e)=>n.kind==="duplicate"||n.depth==="unmeasurable"||n.depth==="tolerance"||(n.penetrationMm??0)+e>=t,Wt=({triangles:n,vertices:t,indices:e,triangleCount:l,closed:s,bounds:f,...a})=>a;function Ut(n,t){return t.exclude.includes(n.id)?!1:t.include.includes(n.id)?!0:!(t.manualOnly||t.modelsMode==="selected"&&!t.models.includes(n.modelId)||t.modelsMode===void 0&&t.models.length&&!t.models.includes(n.modelId))}function fn(n,t,e){if(!t.manualOnly&&t.modelsMode==="selected"&&!t.models.length&&!t.include.length)return"Не отмечены модели. Выберите файлы или включите «Все модели».";let l=0;for(const s of n)if(Ut(s,t)&&(l++,e||!s.hidden))return;return l?`Все выбранные элементы (${l}) скрыты. Покажите их в модели или включите «Включать скрытые элементы» на вкладке «Правила».`:t.manualOnly?"Ручная выборка пуста. Выделите элементы в 3D заново или нажмите «Сбросить ручной выбор».":t.exclude.length?"Нет элементов после ручных исключений. Проверьте исключения или нажмите «Сбросить ручной выбор».":"В выбранных моделях нет доступных элементов. Обновите модели и проверьте состав выборки."}const cn=(n,t)=>JSON.stringify([n,t].sort()),q=(n,t)=>[n[0]-t[0],n[1]-t[1],n[2]-t[2]],tt=(n,t,e=1)=>[n[0]+t[0]*e,n[1]+t[1]*e,n[2]+t[2]*e],N=(n,t)=>n[0]*t[0]+n[1]*t[1]+n[2]*t[2],J=(n,t)=>[n[1]*t[2]-n[2]*t[1],n[2]*t[0]-n[0]*t[2],n[0]*t[1]-n[1]*t[0]],L=n=>Math.hypot(...n),Mt=n=>{const t=L(n);return t>1e-20?[n[0]/t,n[1]/t,n[2]/t]:void 0},ut=n=>n.triangleCount??(n.indices?n.indices.length/3:n.triangles.length/9),nt=(n,t,e)=>n.indices&&n.vertices?n.vertices[n.indices[t*3+Math.floor(e/3)]*3+e%3]:n.triangles[t*9+e],X=(n,t)=>[0,3,6].map(e=>[nt(n,t,e),nt(n,t,e+1),nt(n,t,e+2)]);function jt(n){const t=[1/0,1/0,1/0],e=[-1/0,-1/0,-1/0];for(let l=0;l<n.length;l++){const s=l%3;t[s]=Math.min(t[s],n[l]),e[s]=Math.max(e[s],n[l])}return{min:t,max:e}}const Et=(n,t,e)=>n.min.every((l,s)=>l<=t.max[s]+e&&n.max[s]>=t.min[s]-e);function Dt(n,t){const e={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const o of t)for(let r=0;r<9;r++){const u=r%3,i=nt(n,o,r);e.min[u]=Math.min(e.min[u],i),e.max[u]=Math.max(e.max[u],i)}if(t.length<=12)return{...e,ids:t};const l=e.max.map((o,r)=>o-e.min[r]),s=l.indexOf(Math.max(...l)),f=o=>nt(n,o,s)+nt(n,o,s+3)+nt(n,o,s+6);t.sort((o,r)=>f(o)-f(r));const a=t.length>>1;return{...e,left:Dt(n,t.slice(0,a)),right:Dt(n,t.slice(a))}}function*xt(n,t,e){Et(n,t,e)&&(n.ids?yield*n.ids:(yield*xt(n.left,t,e),yield*xt(n.right,t,e)))}function*dt(n,t,e){if(Et(n,t,e)){if(n.ids&&t.ids){for(const l of n.ids)for(const s of t.ids)yield[l,s];return}if(n.ids){yield*dt(n,t.left,e),yield*dt(n,t.right,e);return}if(t.ids){yield*dt(n.left,t,e),yield*dt(n.right,t,e);return}yield*dt(n.left,t.left,e),yield*dt(n.left,t.right,e),yield*dt(n.right,t.left,e),yield*dt(n.right,t.right,e)}}function $t(n,t){const e={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const a of t)for(let o=0;o<3;o++)e.min[o]=Math.min(e.min[o],n[a].bounds.min[o]),e.max[o]=Math.max(e.max[o],n[a].bounds.max[o]);if(t.length<=16)return{...e,ids:t};const l=e.max.map((a,o)=>a-e.min[o]),s=l.indexOf(Math.max(...l));t.sort((a,o)=>n[a].bounds.min[s]+n[a].bounds.max[s]-(n[o].bounds.min[s]+n[o].bounds.max[s]));const f=t.length>>1;return{...e,left:$t(n,t.slice(0,f)),right:$t(n,t.slice(f))}}function qt(n,t,e,l){const s=q(t,n),f=q(e[1],e[0]),a=q(e[2],e[0]),o=J(s,a),r=N(f,o);if(Math.abs(r)<=1e-12*L(s)*L(f)*L(a))return;const u=1/r,i=q(n,e[0]),p=N(i,o)*u,h=J(i,f),d=N(s,h)*u,x=N(a,h)*u,I=l/Math.max(L(f),L(a),l);if(p>=-I&&d>=-I&&p+d<=1+I&&x>=-I&&x<=1+I)return tt(n,s,Math.max(0,Math.min(1,x)))}function ln(n,t,e,l){const s=e.map(Math.abs).indexOf(Math.max(...e.map(Math.abs))),f=[0,1,2].filter(r=>r!==s),a=(r,u,i)=>(u[f[0]]-r[f[0]])*(i[f[1]]-r[f[1]])-(u[f[1]]-r[f[1]])*(i[f[0]]-r[f[0]]),o=(r,u)=>{const i=u.map((p,h)=>a(p,u[(h+1)%3],r));return i.every(p=>p>=-l*L(e))||i.every(p=>p<=l*L(e))};for(const r of n)if(o(r,t))return r;for(const r of t)if(o(r,n))return r;for(let r=0;r<3;r++)for(let u=0;u<3;u++){const i=n[r],p=n[(r+1)%3],h=t[u],d=t[(u+1)%3],x=q(p,i),I=q(d,h),O=x[f[0]]*I[f[1]]-x[f[1]]*I[f[0]];if(Math.abs(O)<1e-18)continue;const z=q(h,i),y=(z[f[0]]*I[f[1]]-z[f[1]]*I[f[0]])/O,P=(z[f[0]]*x[f[1]]-z[f[1]]*x[f[0]])/O;if(y>=0&&y<=1&&P>=0&&P<=1)return tt(i,x,y)}}function Xt(n,t,e,l){for(let s=0;s<3;s++){const f=qt(n[s],n[(s+1)%3],t,e);f&&l.push(f);const a=qt(t[s],t[(s+1)%3],n,e);a&&l.push(a)}}function Jt(n,t,e,l){const s=J(q(n[1],n[0]),q(n[2],n[0])),f=J(q(t[1],t[0]),q(t[2],t[0])),a=L(s),o=L(f);if(a<1e-20||o<1e-20)return;const r=t.map(i=>N(q(i,n[0]),s)/a),u=n.map(i=>N(q(i,t[0]),f)/o);if(!(r.every(i=>i>e)||r.every(i=>i<-e)||u.every(i=>i>e)||u.every(i=>i<-e))){if(r.every(i=>Math.abs(i)<=e)&&u.every(i=>Math.abs(i)<=e))return l?ln(n,t,s,e):void 0;if(!(!l&&(!(Math.min(...r)<-e&&Math.max(...r)>e)||!(Math.min(...u)<-e&&Math.max(...u)>e))))for(let i=0;i<3;i++){const p=qt(n[i],n[(i+1)%3],t,e);if(p)return p;const h=qt(t[i],t[(i+1)%3],n,e);if(h)return h}}}class un{world=[[1,0,0],[0,1,0],[0,0,1]];items=new Map;step=1e4;key(t){return t.map(e=>Math.round(e*this.step)).join(",")}add(t){const e=Mt(J(q(t[1],t[0]),q(t[2],t[0])));if(!e)return;const s=e[0]<-1e-9||Math.abs(e[0])<=1e-9&&(e[1]<-1e-9||Math.abs(e[1])<=1e-9&&e[2]<0)?[-e[0],-e[1],-e[2]]:[e[0],e[1],e[2]],f=this.key(s);for(this.items.has(f)||this.items.set(f,s);this.items.size>512&&this.step>10;){this.step/=10;const a=new Map;for(const o of this.items.values()){const r=this.key(o);a.has(r)||a.set(r,o)}this.items=a}}addFrom(t,e){for(const l of e)this.add(X(t,l))}values(){return[...this.world,...[...this.items].sort((t,e)=>t[0]<e[0]?-1:1).map(([,t])=>t)]}}function Pt(n,t){const e=[[0,0,0],[0,0,0],[0,0,0]];for(const s of n){const f=[s[0]-t[0],s[1]-t[1],s[2]-t[2]];for(let a=0;a<3;a++)for(let o=0;o<3;o++)e[a][o]+=f[a]*f[o]}const l=[[1,0,0],[0,1,0],[0,0,1]];for(let s=0;s<12;s++){let f=0;for(let a=0;a<3;a++)for(let o=a+1;o<3;o++)f+=e[a][o]*e[a][o];if(f<=1e-30)break;for(let a=0;a<3;a++)for(let o=a+1;o<3;o++){if(Math.abs(e[a][o])<=1e-30)continue;const r=(e[o][o]-e[a][a])/(2*e[a][o]),u=(r>=0?1:-1)/(Math.abs(r)+Math.sqrt(r*r+1)),i=1/Math.sqrt(u*u+1),p=u*i;for(const h of[e,l])for(let d=0;d<3;d++){const x=h[d][a],I=h[d][o];h[d][a]=i*x-p*I,h[d][o]=p*x+i*I}for(let h=0;h<3;h++){const d=e[a][h],x=e[o][h];e[a][h]=i*d-p*x,e[o][h]=p*d+i*x}}}return[0,1,2].sort((s,f)=>e[f][f]-e[s][s]).map(s=>Mt([l[0][s],l[1][s],l[2][s]])).filter(s=>!!s)}function hn(n,t,e,l){const s=t.min.map((i,p)=>(i+t.max[p])/2),f=L(q(t.max,t.min)),a=Math.max(e*10,f/50),o=i=>[0,1,2].map(p=>i.reduce((h,d)=>h+d[p],0)/i.length);let r=[{hits:n,limits:[]}],u=!1;for(let i=0;i<12;i++){const p=[];let h=!1;for(const d of r){if(d.hits.length<2){p.push(d);continue}if(p.length+r.length>=64){u=!0,p.push(d);continue}const x=o(d.hits),I=[x,s,...[0,.25,.5,.75].map(c=>d.hits[Math.floor(c*(d.hits.length-1))])],O=[[1,0,0],[0,1,0],[0,0,1]],z=Pt(d.hits,x);z[0]&&O.push(z[0]);const y=c=>{let m=-1/0,M=1/0;for(const v of d.hits){const S=N(v,c);S>m&&(m=S),S<M&&(M=S)}return m-M},P=c=>Math.max(0,...z.filter(m=>Math.abs(N(m,c))<.9).map(m=>y(m))),b=c=>{const m=d.hits.map(v=>N(v,c)).sort((v,S)=>v-S),M=[];for(let v=1;v<m.length;v++){const S=m[v]-m[v-1];S>a&&M.push({at:(m[v]+m[v-1])/2,size:S})}return M.sort((v,S)=>S.size-v.size)};let A,_=0;for(const c of O){const m=b(c);!m.length||m[0].size<=_||m[0].size<=P(c)||(_=m[0].size,l(c,m[0].at,I)&&(A={n:c,cuts:[m[0].at]}))}if(!A){p.push(d);continue}h=!0;const{n:$,cuts:E}=A,w=Array.from({length:E.length+1},()=>[]);for(const c of d.hits){const m=N(c,$);let M=0;for(;M<E.length&&m>=E[M];)M++;w[M].push(c)}w.forEach((c,m)=>p.push({hits:c,limits:[...d.limits,{n:$,from:m?E[m-1]:-1/0,to:m<E.length?E[m]:1/0}]}))}if(r=p,h&&i===11&&(u=!0),!h)break}return{zones:r,crowded:u}}function Rt(n,t,e){return e.every(({n:l,from:s,to:f})=>{let a=1/0,o=-1/0;for(let r=0;r<9;r+=3){const u=nt(n,t,r)*l[0]+nt(n,t,r+1)*l[1]+nt(n,t,r+2)*l[2];u<a&&(a=u),u>o&&(o=u)}return o>=s&&a<=f})}function Yt(n,t,e,l,s,f,a,o,r,u,i,p=!1){let h=!1;const d=E=>{let w=-1/0,c=1/0;const m=M=>{M>w&&(w=M),M<c&&(c=M)};for(const M of r)m(N(M,E));for(const[M,v,S]of[[n,e,1],[t,l,0]]){const C=Math.max(1,Math.floor(v.length/32));C>1&&(h=!0);for(let g=0;g<v.length;g+=C)for(const j of X(M,v[g]))i(S,j)&&m(N(j,E))}return Number.isFinite(w)&&Number.isFinite(c)?w-c:0},x=E=>{let w=1/0,c=-1/0;for(let m=0;m<8;m++){const M=(m&1?a.max[0]:a.min[0])*E[0]+(m&2?a.max[1]:a.min[1])*E[1]+(m&4?a.max[2]:a.min[2])*E[2];M<w&&(w=M),M>c&&(c=M)}return[w,c]},I=(E,w,c,m,M)=>{let v=1/0,S=-1/0;for(const C of w){let g=1/0,j=-1/0;for(let U=0;U<9;U+=3){const H=nt(E,C,U)*c[0]+nt(E,C,U+1)*c[1]+nt(E,C,U+2)*c[2];H<g&&(g=H),H>j&&(j=H)}j<m||g>M||(g<m&&(g=m),j>M&&(j=M),g<v&&(v=g),j>S&&(S=j))}return v===1/0?void 0:[v,S]};if(a.min.some((E,w)=>a.max[w]-E<=0))return{width:0,thin:!1,approximate:!1};const O=Math.ceil((e.length+l.length)/4096),z=[...s,...O>1?f.filter((E,w)=>w<3||w%O===0):f];O>1&&z.length<s.length+f.length&&(h=!0);const y=(E,w,c,m,M)=>{const v=g=>tt(o,c,g-N(o,c));if(!w)return i(E,v((m+M)/2))?[m,M]:void 0;let[S,C]=w;return S>m&&i(E,v((m+S)/2))&&(S=m),C<M&&i(E,v((C+M)/2))&&(C=M),[S,C]},P=(E,w)=>E&&w?Math.min(E[1],w[1])-Math.max(E[0],w[0]):0;let b=1/0,A=!1,_=!1,$=0;for(let E=0;E<z.length;E++){const w=z[E],[c,m]=x(w),M=I(n,e,w,c,m),v=I(t,l,w,c,m);let S=P(M,v);if(S<=0&&($++<32?S=P(y(0,M,w,c,m),y(1,v,w,c,m)):h=!0),p&&r.length>1){let C=1/0,g=-1/0;for(const j of r){const U=N(j,w);C=Math.min(C,U),g=Math.max(g,U)}S=Math.max(S,g-C)}if(S<=u&&(E<s.length&&$<40&&($++,S=d(w)),S<=u)){E<s.length&&(_=!0);continue}A=!0,S<b&&(b=S)}return{width:A&&Number.isFinite(b)?b:0,thin:_,approximate:h}}const mt=n=>Math.max(1e-10,Math.max(1,...n.bounds.min.map(Math.abs),...n.bounds.max.map(Math.abs))*Number.EPSILON*64);async function mn(n,t,e){const l=mt(n),s=ut(n),f={closed:!1,approximate:!1},a=new Uint32Array(s),o=new Uint8Array(s),r=new Uint8Array(s),u=new Uint8Array(s);for(let c=0;c<s;c++)a[c]=c;const i=c=>{if(a[c]!==c){const m=a[c];a[c]=i(m),r[c]^=r[m]}return a[c]},p=(c,m,M)=>{let v=i(c),S=i(m);const C=r[c]^r[m]^M;return v===S?C===0:(o[v]<o[S]&&([v,S]=[S,v]),a[S]=v,r[S]=C,o[v]===o[S]&&o[v]++,!0)},h=new Map,d=[],x=new Map,I=s*3,O=I*I<=Number.MAX_SAFE_INTEGER,z=(c,m)=>O?c*I+m:`${c},${m}`,y=(c,m)=>{const M=c.map((S,C)=>Math.round((S-n.bounds.min[C])/l)).join(",");let v=h.get(M);return v===void 0&&(v=h.size,h.set(M,v),d.push(m)),v};for(let c=0;c<s;c++){c%2048===0&&await t();const m=X(n,c);if(L(J(q(m[1],m[0]),q(m[2],m[0])))<=l*l)continue;const M=m.map((v,S)=>y(v,c*3+S));if(new Set(M).size===3){u[c]=1;for(let v=0;v<3;v++){const S=M[v],C=M[(v+1)%3],g=S<C,j=g?z(S,C):z(C,S),U=x.get(j);if(U===void 0)x.set(j,(c+1)*(g?1:-1));else{if(U===0||!p(c,Math.abs(U)-1,+(U>0===g)))return f;x.set(j,0)}}}}const P=c=>{const m=d[c];return[0,1,2].map(M=>nt(n,Math.floor(m/3),m%3*3+M))},b=[];for(const[c,m]of x)if(m!==0){const M=typeof c=="number"?[Math.floor(c/I),c%I]:c.split(",").map(Number),v=P(M[0]),S=P(M[1]);b.push({p:v,q:S,face:m,bounds:jt([...v,...S])}),b.length%2048===0&&await t()}h.clear(),x.clear(),d.length=0;let A=!1;if(b.length){const c=Math.max(l,Math.min(1e-5,e)),m=$t(b,b.map((M,v)=>v));for(let M=0;M<b.length;M++){M%128===0&&await t();const v=b[M],S=q(v.q,v.p),C=L(S),g=Mt(S),j=[];for(const H of xt(m,v.bounds,c)){if(M===H)continue;const rt=b[H],et=q(rt.p,v.p),Tt=q(rt.q,v.p),F=N(et,g),T=N(Tt,g),V=Math.max(0,Math.min(F,T)),R=Math.min(C,Math.max(F,T));if(R-V<=l)continue;const yt=Math.max(L(tt(et,g,-F)),L(tt(Tt,g,-T)));if(yt>c)continue;const Y=T>F==(v.face>0==rt.face>0);if(!p(Math.abs(v.face)-1,Math.abs(rt.face)-1,Number(Y)))return f;yt>l&&(A=!0),j.push([V,R])}j.sort((H,rt)=>H[0]-rt[0]);let U=0;for(const[H,rt]of j){if(Math.abs(H-U)>l)return f;U=rt}if(Math.abs(U-C)>l)return f}}const _=new Float64Array(s),$=new Float64Array(s),E=n.bounds.min.map((c,m)=>(c+n.bounds.max[m])/2);for(let c=0;c<s;c++){if(c%2048===0&&await t(),!u[c])continue;const m=i(c),M=X(n,c);_[m]+=(r[c]?-1:1)*N(q(M[0],E),J(q(M[1],E),q(M[2],E)))/6,$[m]+=L(J(q(M[1],M[0]),q(M[2],M[0])))/2}let w=0;for(let c=0;c<s;c++){if($[c]&&Math.abs(_[c])<=l*$[c])return f;w+=Math.abs(_[c])}return{closed:w>0,approximate:A}}function dn(n,t,e){const l=q(t[1],t[0]),s=q(t[2],t[0]),f=J(l,s),a=L(f);if(a<1e-20||Math.abs(N(q(n,t[0]),f))/a>e)return!1;const o=q(n,t[0]),r=N(l,l),u=N(l,s),i=N(s,s),p=N(o,l),h=N(o,s),d=r*i-u*u;if(Math.abs(d)<1e-30)return!1;const x=(p*i-h*u)/d,I=(h*r-p*u)/d,O=e/Math.max(L(l),L(s),e);return x>=-O&&I>=-O&&x+I<=1+O}function Ot(n,t,e,l){for(const s of xt(e,{min:n,max:n},l))if(dn(n,X(t,s),l))return!0;return!1}const wt=n=>n.closed||n.interior==="winding";function Ht(n,t,e,l=!1){const s=a=>{if(a.moment)return a.moment;const o=[0,0,0];if(a.ids)for(const r of a.ids){const u=X(t,r),i=J(q(u[1],u[0]),q(u[2],u[0]));for(let p=0;p<3;p++)o[p]+=i[p]/2}else{const r=s(a.left),u=s(a.right);for(let i=0;i<3;i++)o[i]=r[i]+u[i]}return a.moment=o},f=a=>{const o=a.min.map((h,d)=>(h+a.max[d])/2),r=q(o,n),u=L(r),i=L(q(a.max,a.min))/2;if(!l&&u>i*10&&u>0)return N(s(a),r)/(u*u*u);if(!a.ids)return f(a.left)+f(a.right);let p=0;for(const h of a.ids){const d=X(t,h),x=q(d[0],n),I=q(d[1],n),O=q(d[2],n),z=L(x),y=L(I),P=L(O);!z||!y||!P||(p+=2*Math.atan2(N(x,J(I,O)),z*y*P+N(x,I)*P+N(I,O)*z+N(O,x)*y))}return p};return f(e)/(4*Math.PI)}async function pn(n,t,e){const l=mt(n),s=r=>!Ot(r,n,t,l)&&Math.abs(Ht(r,n,t))>.9,f=n.bounds.min.map((r,u)=>(r+n.bounds.max[u])/2);if(s(f))return!0;const a=ut(n),o=Math.max(1,Math.ceil(a/32));for(let r=0;r<a;r+=o){await e();const u=X(n,r),i=Mt(J(q(u[1],u[0]),q(u[2],u[0])));if(!i)continue;const p=[0,1,2].map(d=>(u[0][d]+u[1][d]+u[2][d])/3),h=Math.max(l*8,Math.min(L(q(u[0],u[1])),L(q(u[1],u[2])),L(q(u[2],u[0])))*.01);if(s(tt(p,i,h))||s(tt(p,i,-h)))return!0}return!1}function It(n,t,e,l){if(!wt(t)||n.some((p,h)=>p<t.bounds.min[h]-l||p>t.bounds.max[h]+l)||Ot(n,t,e,l))return!1;if(t.interior==="winding"){const p=Math.abs(Ht(n,t,e));return Math.abs(p-.5)<.05?Math.abs(Ht(n,t,e,!0))>.5:p>.5}const s=[1,.371390676,.52999894],f=L(q(t.bounds.max,t.bounds.min))*3+1,a=tt(n,s,f),o=[],r=jt([...n,...a]);for(const p of xt(e,r,l)){const h=qt(n,a,X(t,p),l);if(h){const d=L(q(h,n));d>l&&o.push(d)}}o.sort((p,h)=>p-h);let u=0,i=-1/0;for(const p of o)p-i>l*2&&(u++,i=p);return u%2===1}const Ft=n=>/отвод|тройник|муфт|фитинг|elbow|fitting|tee\\b/i.test(n.name);async function gn(n,t){if(Ft(n))return;const e=ut(n),l=Math.max(1,Math.ceil(e/4096)),s=n.bounds.min.map((w,c)=>(w+n.bounds.max[c])/2),f=[],a=[];for(let w=0;w<e;w+=l){w%(l*256)===0&&await t();const c=X(n,w),m=J(q(c[1],c[0]),q(c[2],c[0])),M=L(m);M&&(f.push(...c),a.push({n:m.map(v=>v/M),area:M}))}if(f.length<12)return;let o=Pt(f,s)[0];const r=a.filter(({n:w})=>Math.abs(N(w,o))<.2);if(r.length<4)return;const u=Pt(r.map(({n:w})=>w),[0,0,0])[2];if(Math.abs(N(u,o))<.98)return;o=u;const i=o.map(Math.abs).indexOf(Math.max(...o.map(Math.abs)));o[i]<0&&(o=o.map(w=>-w));const p=Math.abs(o[0])<.7?[1,0,0]:[0,1,0],h=Mt(J(o,p)),d=J(o,h),x=[1/0,1/0,1/0],I=[-1/0,-1/0,-1/0];for(const w of f)for(const[c,m]of[o,h,d].entries()){const M=N(q(w,s),m);x[c]=Math.min(x[c],M),I[c]=Math.max(I[c],M)}const O=I[0]-x[0],z=Math.max(I[1]-x[1],I[2]-x[2]),y=Math.min(I[1]-x[1],I[2]-x[2]);if(y<=mt(n)*8||O+mt(n)<z*4||z>y*4)return;let P=0,b=0;const A=new Set;for(const{n:w,area:c}of a){const m=Math.abs(N(w,o));b+=c,(m<.015||m>.999)&&(P+=c),m<.015&&A.add(w.map(M=>Math.round(M*100)).join(","))}if(P<b*.995)return;const _=[];for(let w=0;w<f.length;w+=3){const c=f.slice(w,w+3).map(m=>N(q(m,s),o));_.push([Math.min(...c),Math.max(...c)])}_.sort((w,c)=>w[0]-c[0]);let $=x[0];for(const[w,c]of _){if(w>$+mt(n)*4)return;$=Math.max($,c)}const E=tt(tt(s,h,(x[1]+I[1])/2),d,(x[2]+I[2])/2);return{axis:o,centre:E,from:x[0],to:I[0],width:z,round:A.size>=6&&z<y*1.2,sampled:l>1}}async function Mn(n,t){if(Ft(n)||!/кабел|труб|cable|pipe/i.test(n.name))return[];const e=mt(n),l=[],s=new Map,f=new Map,a=y=>{const P=y.map((A,_)=>Math.round((A-n.bounds.min[_])/e)).join(",");let b=s.get(P);return b===void 0&&(b=l.length,l.push(y),s.set(P,b)),b};for(let y=0;y<ut(n);y++){y%1024===0&&await t();const P=X(n,y).map(a);for(let b=0;b<3;b++){const A=Math.min(P[b],P[(b+1)%3]),_=Math.max(P[b],P[(b+1)%3]);A!==_&&f.set(`${A},${_}`,[A,_,L(q(l[A],l[_]))])}}const o=[...f.values()].map(y=>y[2]).filter(y=>y>e).sort((y,P)=>y-P);if(!o.length)return[];const r=o[Math.floor(o.length*.1)]*1.25,u=Int32Array.from({length:l.length},(y,P)=>P),i=y=>{for(;u[y]!==y;)u[y]=u[u[y]],y=u[y];return y};let p=0;for(const[y,P,b]of f.values())++p%4096===0&&await t(),b<=r&&(u[i(P)]=i(y));const h=new Map;for(let y=0;y<l.length;y++){const P=i(y),b=h.get(P);b?b.push(l[y]):h.set(P,[l[y]])}const d=new Map;for(const[y,P]of h){if(await t(),P.length<6||P.length>256)continue;const b=P[0],A=[0,1,2].map(w=>b[w]+P.reduce((c,m)=>c+m[w]-b[w],0)/P.length),_=P.map(w=>L(q(w,A))),$=Math.max(..._),E=Pt(P,A)[2];!E||$<=e||Math.min(..._)<$*.88||P.some(w=>Math.abs(N(q(w,A),E))>Math.max(e*16,$*.002))||d.set(y,{centre:A,radius:$,normal:E})}const x=new Map;for(const[y,P]of f.values()){++p%4096===0&&await t();const b=Math.min(i(y),i(P)),A=Math.max(i(y),i(P));if(b===A||!d.has(b)||!d.has(A))continue;const _=`${b},${A}`,$=x.get(_);$?$.count++:x.set(_,{a:b,b:A,count:1})}const I=new Map;for(const{a:y,b:P,count:b}of x.values()){const A=d.get(y),_=d.get(P),$=Mt(q(_.centre,A.centre));b<6||!$||Math.min(A.radius,_.radius)<Math.max(A.radius,_.radius)*.8||Math.abs(N($,A.normal))<.5||Math.abs(N($,_.normal))<.5||(I.set(y,[...I.get(y)||[],P]),I.set(P,[...I.get(P)||[],y]))}const O=new Set,z=[];for(const[y,P]of I){if(P.length!==1||O.has(y))continue;let b=y,A=-1;const _=[];for(;!O.has(b);){O.add(b);const $=I.get(b)||[];if($.length>2)break;const E=$.find(v=>v!==A);if(E===void 0||O.has(E))break;const w=d.get(b),c=d.get(E),m=q(c.centre,w.centre),M=L(m);M>e&&_.push({axis:m.map(v=>v/M),centre:w.centre,from:0,to:M,width:Math.max(w.radius,c.radius)*2,round:!0,sampled:!0}),A=b,b=E}_.length&&z.push(_)}return z}async function yn(n,t){const e=ut(n),l=Int32Array.from({length:e},(r,u)=>u),s=new Uint8Array(e),f=new Map,a=mt(n),o=r=>{for(;l[r]!==r;)l[r]=l[l[r]],r=l[r];return r};for(let r=0;r<e;r++){r%2048===0&&await t();for(const u of X(n,r)){const i=u.map((x,I)=>Math.round((x-n.bounds.min[I])/a)).join(","),p=f.get(i);if(p===void 0){f.set(i,r);continue}let h=o(r),d=o(p);h!==d&&(s[h]<s[d]&&([h,d]=[d,h]),l[d]=h,s[h]===s[d]&&s[h]++)}}for(let r=0;r<e;r++)l[r]=o(r);return l}async function xn(n,t,e,l,s){const{axis:f,centre:a}=n,o=Math.abs(f[0])<.7?[1,0,0]:[0,1,0],r=Mt(J(f,o)),u=J(f,r),i=[1/0,1/0,1/0],p=[-1/0,-1/0,-1/0],h=mt(t);for(let b=0;b<ut(t);b++){b%2048===0&&await l();for(const A of X(t,b))for(const[_,$]of[f,r,u].entries()){const E=N(q(A,a),$);i[_]=Math.min(i[_],E),p[_]=Math.max(p[_],E)}}if(p[1]-i[1]<n.width*2.5||p[2]-i[2]<n.width*2.5)return[];const d=Math.max(1,p[0]-i[0]),x=tt(a,f,i[0]-d),I=tt(a,f,p[0]+d),O=[];let z=0;for(const b of xt(e,jt([...x,...I]),h)){++z%256===0&&await l();const A=qt(x,I,X(t,b),h);A&&O.push({triangle:b,at:N(q(A,a),f)})}if(O.length<2)return[];const y=await s(),P=new Map;for(const b of O){const A=y[b.triangle],_=P.get(A);_?(_[0]=Math.min(_[0],b.at),_[1]=Math.max(_[1],b.at)):P.set(A,[b.at,b.at])}return[...P].map(([b,[A,_]])=>({part:b,from:Math.max(n.from,A),to:Math.min(n.to,_)})).filter(({from:b,to:A})=>A-b>h)}async function wn(n,t,e,l,s){let f=0;const a=mt(t);for(const o of n){let r=0;const u=new Map;for(const i of o){await l();for(const p of await xn(i,t,e,l,s)){const h=u.get(p.part)||[];h.push([r+p.from-i.from,r+p.to-i.from]),u.set(p.part,h)}r+=i.to-i.from}for(const i of u.values()){i.sort((d,x)=>d[0]-x[0]);let p=i[0][0],h=i[0][1];for(const[d,x]of i.slice(1))d<=h+a*4?h=Math.max(h,x):(f=Math.max(f,h-p),p=d,h=x);f=Math.max(f,h-p)}}return f>a?f*1e3:void 0}function bn(n,t,e){const l=Mt(J(q(t[1],t[0]),q(t[2],t[0])));if(!l)return[];if(n.some(f=>Math.abs(N(q(f,t[0]),l))>e)){const f=[];return Xt(n,t,e,f),f}let s=n;for(let f=0;f<3&&s.length;f++){const a=t[f],o=q(t[(f+1)%3],a),r=Mt(J(l,o));if(!r)return[];const u=[];for(let i=0;i<s.length;i++){const p=s[i],h=s[(i+1)%s.length],d=N(q(p,a),r),x=N(q(h,a),r);d>=-e&&u.push(p),d>=-e!=x>=-e&&u.push(tt(p,q(h,p),Math.max(0,Math.min(1,d/(d-x)))))}s=u}return s}async function vn(n,t,e,l,s,f){const a=Math.max(mt(t),mt(e)),o=n.map(()=>[]),r=n.map(h=>{let d=0;return h.map(x=>{const I={p:x,offset:d};return d+=x.to-x.from,I})}),u=(h,d,x)=>{let I=0,O=h.length;for(;I<O;){const y=I+O>>1;h[y][1]<d-a*4?I=y+1:O=y}let z=I;for(;z<h.length&&h[z][0]<=x+a*4;)d=Math.min(d,h[z][0]),x=Math.max(x,h[z][1]),z++;h.splice(I,z-I,[d,x])};let i=0;for(const[h,d]of dt(l,s,a)){++i%256===0&&await f();const x=X(t,h),I=X(e,d);if(!Jt(x,I,a,!0))continue;const O=bn(x,I,a);if(!(O.length<2))for(let z=0;z<r.length;z++)for(const{p:y,offset:P}of r[z]){const b=O.map($=>N(q($,y.centre),y.axis)),A=Math.max(y.from,Math.min(...b)),_=Math.min(y.to,Math.max(...b));_-A<=a||O.some(($,E)=>{const w=Math.max(y.from,Math.min(y.to,b[E]));return L(q($,tt(y.centre,y.axis,w)))<=y.width*.7+a})&&u(o[z],P+A-y.from,P+_-y.from)}}let p=0;for(const h of o)for(const[d,x]of h)p=Math.max(p,x-d);return p>a?p*1e3:void 0}async function In(n,t,e,l,s){const f=t.precision/1e3;if(!Number.isFinite(f)||f<=0)throw Error("Точность расчёта должна быть положительным числом.");const a=n.filter(g=>t.includeHidden||!g.hidden),o=a.filter(g=>Ut(g,t.a)),r=a.filter(g=>Ut(g,t.b));if(!o.length||!r.length){const g=o.length?"Б":"А",j=o.length?t.b:t.a;throw Error(`Выбор ${g}: ${fn(n,j,t.includeHidden)}`)}let u=performance.now();const i=async()=>{if(l())throw Error("Расчёт отменён. Предыдущие результаты сохранены.");performance.now()-u>16&&(await new Promise(g=>setTimeout(g,0)),u=performance.now())},p=new Map,h=g=>{let j=p.get(g.id);return j||(j=Dt(g,Array.from({length:ut(g)},(U,H)=>H)),p.set(g.id,j)),j},d=new Map,x=new Map,I=new Map,O=async g=>{let j=I.get(g.id);return j||(j=await Mn(g,i),I.set(g.id,j)),j},z=new Map,y=async g=>{let j=z.get(g.id);return j||(j=await yn(g,i),z.set(g.id,j)),j},P=async g=>(x.has(g.id)||x.set(g.id,await gn(g,i)),x.get(g.id)),b=async g=>{if(t.type!=="intersection")return g;let j=d.get(g.id);return j===void 0&&(j=await mn(g,i,f),!j.closed&&await pn(g,h(g),i)&&(j={closed:!1,approximate:!0,winding:!0}),d.set(g.id,j)),j.winding?{...g,closed:!1,interior:"winding"}:j.closed===g.closed?g:{...g,closed:j.closed}},A=new Map,_=async g=>{let j=A.get(g.id);if(j!==void 0)return j;const U=[];for(let H=0;H<ut(g);H++)U.push([0,3,6].map(rt=>[0,1,2].map(et=>Math.round(nt(g,H,rt+et)/f)).join(",")).sort().join(";")),H%9e3===0&&await i();return j=U.sort().join("|"),A.set(g.id,j),j},$=[],E=new Set(o.map(g=>g.id)),w=new Set(r.map(g=>g.id)),c=$t(r,r.map((g,j)=>j)),m=new Map;let M=0;const v=g=>g.triangles.byteLength+(g.vertices?.byteLength||0)+(g.indices?.byteLength||0)+ut(g)*32;async function S(g,j){if(!s)return g;let U=m.get(g.id);if(U)return m.delete(g.id),m.set(g.id,U),U;for(const[H,rt]of m)H!==j&&M>96*1024*1024&&(m.delete(H),M-=v(rt),p.delete(H),z.delete(H),I.delete(H),A.delete(H));return U=await s(g.id),m.set(g.id,U),M+=v(U),U}let C=-1/0;for(let g=0;g<o.length;g++){const j=o[g];performance.now()-C>150&&(C=performance.now(),e({phase:"Проверка пар",done:g,total:o.length,found:$.length}));const U=[...xt(c,j.bounds,f)];for(let H=0;H<U.length;H++){const rt=U[H];performance.now()-C>150&&(C=performance.now(),e({phase:`Проверка пар · A ${g+1}/${o.length} · кандидаты ${H+1}/${U.length}`,done:g,total:o.length,found:$.length}));const et=r[rt];if(await i(),j.id===et.id||!Et(j.bounds,et.bounds,f)||t.ignoreSameModel&&j.modelId===et.modelId||t.ignoreSameGroup&&j.modelId===et.modelId&&j.properties.Объект&&j.properties.Объект===et.properties.Объект||t.equalProperty&&j.properties[t.equalProperty]!==void 0&&j.properties[t.equalProperty]===et.properties[t.equalProperty]||j.id>et.id&&E.has(et.id)&&w.has(j.id))continue;const Tt=cn(j.id,et.id),F=await b(await S(j)),T=await b(await S(et,j.id));let V,R="surface",yt=0,Y,Zt,St,kt,Lt;if(t.type==="duplicates"){if(ut(F)!==ut(T)||F.bounds.min.some((ct,it)=>Math.abs(ct-T.bounds.min[it])>f||Math.abs(F.bounds.max[it]-T.bounds.max[it])>f))continue;await _(F)===await _(T)&&(V=F.bounds.min.map((ct,it)=>(ct+F.bounds.max[it])/2),R="duplicate")}else{const ct=h(F),it=h(T),qn=Math.max(1,...F.bounds.min.map(Math.abs),...F.bounds.max.map(Math.abs),...T.bounds.min.map(Math.abs),...T.bounds.max.map(Math.abs)),ft=Math.max(1e-10,qn*Number.EPSILON*64),ht={min:F.bounds.min.map((k,B)=>Math.max(k,T.bounds.min[B])),max:F.bounds.max.map((k,B)=>Math.min(k,T.bounds.max[B]))},Bt=ht.min.map((k,B)=>(k+ht.max[B])/2),_t=new un,Z=[];let zt=1,Pn=0,Qt=1/0,Sn=0;for(const[k,B]of dt(ct,it,f)){const lt=X(F,k),pt=X(T,B);if(!Et(jt(lt.flat()),jt(pt.flat()),f))continue;const ot=Jt(lt,pt,ft,t.touching);if(ot){const bt=L(q(ot,Bt));if((!V||bt<Qt)&&(V=ot,Qt=bt),_t.add(lt),_t.add(pt),Pn++%zt===0&&(Xt(lt,pt,ft,Z),Z.length||Z.push(ot),Z.length>=8192)){for(let gt=0;gt*2<Z.length;gt++)Z[gt]=Z[gt*2];Z.length=Math.ceil(Z.length/2),zt*=2}}++Sn%256===0&&(performance.now()-C>150&&(C=performance.now(),e({phase:`Геометрия пары · A ${g+1}/${o.length}`,done:g,total:o.length,found:$.length})),await i())}if(!V&&wt(F)&&wt(T)){const k=Bt;It(k,F,ct,ft)&&It(k,T,it,ft)&&(V=k,R="contained")}if(!V){for(const[k,B,lt]of[[F,T,it],[T,F,ct]])if(wt(B)){for(let pt=0;pt<ut(k)&&!V;pt++){const ot=X(k,pt),bt=ot[0].map((gt,At)=>(ot[0][At]+ot[1][At]+ot[2][At])/3);for(const gt of[ot[0],bt])if(It(gt,B,lt,ft)){V=gt,R="contained";break}await i()}if(V)break}}if(V){const k=(D,K)=>[...xt(K,ht,f)].filter(st=>Et(jt(X(D,st).flat()),ht,f)),B=k(F,ct),lt=k(T,it);R!=="surface"&&(_t.addFrom(F,B),_t.addFrom(T,lt)),await i();const pt=ht.min.map((D,K)=>(D+ht.max[K])/2),ot=(D,K)=>D===0?It(K,F,ct,ft):It(K,T,it,ft),bt=(D,K)=>D===0?It(K,F,ct,ft)||Ot(K,F,ct,ft):It(K,T,it,ft)||Ot(K,T,it,ft);if(R==="contained"){const D=Math.max(1,Math.ceil((B.length+lt.length)/4096));zt=Math.max(zt,D);const K=new Set;for(const[st,G,W]of[[F,B,1],[T,lt,0]]){for(let Q=0;Q<G.length;Q+=D){Q%(D*32)===0&&await i();for(const at of X(st,G[Q])){const vt=at.join(",");K.has(vt)||(K.add(vt),bt(W,at)&&Z.push(at))}}K.clear()}if(F.interior==="winding"||T.interior==="winding"){const st=(G,W)=>{let Q=1,at=0;for(;G;G=Math.floor(G/W))Q/=W,at+=Q*(G%W);return at};for(let G=1;G<=2048;G++){G%16===0&&await i();const W=[2,3,5].map((Q,at)=>ht.min[at]+st(G,Q)*(ht.max[at]-ht.min[at]));ot(0,W)&&ot(1,W)&&Z.push(W)}}}const gt=(D,K,st)=>wt(F)&&wt(T)&&st.every(G=>{const W=tt(G,D,K-N(G,D));return!bt(0,W)||!bt(1,W)}),At=()=>[0,1,2].map(D=>Z.reduce((K,st)=>K+st[D],0)/Z.length),Vt=R==="surface"&&Z.length>2?Pt(Z,At())[2]:void 0,Ct=Vt?Yt(F,T,B,lt,[Vt],[],ht,At(),Z,ft,ot):void 0,tn=!Ct||Ct.width>ft,nn=!tn&&!!Ct?.approximate,en=!wt(F)||!wt(T);if(!en&&!tn&&!nn&&(R="touch"),R==="touch"&&!t.touching)continue;const{zones:An,crowded:En}=hn(Z,ht,f,gt),_n=_t.values();let Nt=0,on=!nn,sn=En||zt>1||!!Ct?.approximate||!!d.get(F.id)?.approximate||!!d.get(T.id)?.approximate;for(const D of R==="touch"?[]:An){const K=D.limits.length?B.filter(Q=>Rt(F,Q,D.limits)):B,st=D.limits.length?lt.filter(Q=>Rt(T,Q,D.limits)):lt,G=D.hits.length?[0,1,2].map(Q=>D.hits.reduce((at,vt)=>at+vt[Q],0)/D.hits.length):pt,W=Yt(F,T,K,st,D.hits.length>2?Pt(D.hits,G):[],_n,ht,G,D.hits,ft,ot,R==="contained");W.thin&&(on=!1),W.approximate&&(sn=!0),W.width>Nt&&(Nt=W.width),await i()}if(Nt*=1e3,R==="touch"?Y=void 0:en?Y="unmeasurable":Nt<=0||!on?Y="tolerance":sn&&(Y="approximate"),yt=R==="touch"||Y==="unmeasurable"||Y==="tolerance"?0:Nt,!Ft(F)&&!Ft(T)){const D=await P(F),K=await P(T);for(const[st,G,W,Q,at]of[[D,F,T,K,it],[K,T,F,D,ct]]){if(Q?.round&&/труб|pipe/i.test(W.name))continue;const vt=st?[[st]]:await O(G);if(!vt.length)continue;const an=await vn(vt,G,W,G===F?ct:it,at,i);if(an!==void 0&&(Lt=Math.max(Lt??0,an)),R==="touch")continue;const Gt=await wn(vt,W,at,i,()=>y(W));Gt===void 0||Gt<=(St??0)||(St=Gt,kt=G.id,st||(Y=Y||"approximate"))}St!==void 0&&(Zt=Y==="unmeasurable"||Y==="tolerance"?void 0:yt,yt=Math.max(yt,St),(Y==="unmeasurable"||Y==="tolerance"||D?.sampled||K?.sampled)&&(Y="approximate"))}await i()}if(V&&!rn({kind:R,depth:Y,penetrationMm:yt},t.minPenetration,t.precision))continue}if(V&&($.push({id:Tt,a:Wt(F),b:Wt(T),point:V,kind:R,state:"new",note:"",assignee:"",firstSeen:"",lastSeen:"",penetrationMm:yt,...St!==void 0?{axialPenetrationMm:St,axialElementId:kt,overlapThicknessMm:Zt}:{},...Lt!==void 0?{contactLengthMm:Lt}:{},...Y?{depth:Y}:{}}),$.length>=5e4))throw Error("Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат.")}}return e({phase:"Готово",done:o.length,total:o.length,found:$.length}),$}let jn=0;const Kt=new Map;self.onmessage=async n=>{if(n.data.request!==void 0){const t=Kt.get(n.data.request);Kt.delete(n.data.request),n.data.error?t?.reject(Error(n.data.error)):t?.resolve(n.data.geometry);return}try{const{elements:t,check:e}=n.data,l=await In(t,e,s=>self.postMessage({progress:s}),()=>!1,n.data.streaming?s=>new Promise((f,a)=>{const o=jn++;Kt.set(o,{resolve:f,reject:a}),self.postMessage({load:s,request:o})}):void 0);self.postMessage({results:l})}catch(t){self.postMessage({error:t instanceof Error?t.message:String(t)})}}})();\n', nn = typeof self < "u" && self.Blob && new Blob(["(self.URL || self.webkitURL).revokeObjectURL(self.location.href);", $n], { type: "text/javascript;charset=utf-8" });
function Oi(t) {
  let e;
  try {
    if (e = nn && (self.URL || self.webkitURL).createObjectURL(nn), !e) throw "";
    const n = new Worker(e, {
      name: t?.name
    });
    return n.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(e);
    }), n;
  } catch {
    return new Worker(
      "data:text/javascript;charset=utf-8," + encodeURIComponent($n),
      {
        name: t?.name
      }
    );
  }
}
const qi = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAydpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAzIDc5Ljk2OTBhODdmYywgMjAyNS8wMy8wNi0yMDo1MDoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDZFQkU2NEQ4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDZFQkU2NEM4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI2LjExIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRENDVBNjQzODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRENDVBNjQ0ODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+pHX+ogAAD+lJREFUeNrsnXtwVPUVx2/CZvMgQEhCSAwJJDzDqwgodCq08hAr7wpSo1M6o/5Rq6NUcdqp1XamdjqOY6mvWhWnttZpRRtbaRGpMMKMZlB8gaFaQoQQSEhIQt7hkfTzhY1ulnt37929mw1T7sxls3vv/f3O7/zO43vO7/wucd3d3calI/zDo3927txpnDx5MqaEpKenpyUlJWUlJCQM6+rqSm1vb/fyGRcfH9+dkpLSGRcX13Lq1Knajo6Omvr6+ia+x4zWtLQ0Y86cOee/SAKLiopiyjwYlz5ixIhyPk8PGDBAKnHB6fF4unU9Ly+vDCanxpLeqVOnnuObznj9kJycHFMGwpRrjh8/Xoh0ec6ePWt6z5kzZwxdr62tLcrPz786lvT68ys+1jYEaTJQx+tRT1v3w0QDabweSe0XNjDmDBwyZEh6U1PTPCfPtLS0LOK5QZcYyDF48OAFjY2N6U6eaWhoyIaBc//vGSg1RIXXSC2dHG1tbYbX610dS08cUwYmJiYa2dnZWRMmTFiO9C0Ipw3UfgnoYfHw4cMzYWZscWAEeChj2LBha8CQm+vq6g6D26xnKj5eWC+dZ67l71VI0dxDhw5lYM/C6vvYsWMZzc3Nm4cOHVo7atSot/Hem6DjzRMnTjQGCw4k9RkZGYWYgGtrampeZCKaIuKgOps+fbrj55AgwYmPkabunJyceqThEaQhT4wKJPiyyy4bx/VHgStVQABTnBfpCdjuhp7D9PMw9BQGemnRBc0FXP8tdDaKbhj/Hn+Pdjr2WbNmfYkDw2IgjJgDMdX+A1DEwG8nUEsNYJTUSp98fzIrK6tF16PBuMBT/cCUk/T7Gz5HiI7c3NwxfN8gxgXSweRWcv3KPmOgQG9mZmaz1QAUScDIhvHjx/8Zgmsx9GExAjXrLigo6Ebrw2YkdBwdN26c6GgKNoGYoXoioblRZyAqsoDOWqMlOVJDbKQY10Zf3VJ3feo7Nuvc92hJsqQWJn7DKQNtOxHEfCZw4xVCqRS3PNigQYMEpCv5/BBJfa+zs3MfElyB1D1RWlp6le45fPiwMXv27D2o4p04ikI+p0D4FTiQaXjw3HCdUOCBQxmMxJZgdubhoPa56kRQ2REw8LAbMy3jjRmoxiY9VVhYuABmDRKs6TnGjBlTTNKg1zP6zu83+sMgVHwwTmAhpuIZJKcWxroiibT1OTRluabCqampKajQO5ESBmCWOn6GF7wLdckyi2WZpALOBrPn9TsGv8AMliA52UzIj5iYA+onUloZ778xJ4muMBD1SoGwzyIhiIE3MMCfgNks01AQrLTa1mDt6LruC5JTHEI/D8ppRELvyJEjPxo4cKDXNScyevTomwPVyq668uxmGDg2VNg1ceLEO0JhRF2HiT8M1o76ob8izMO2cNRajoxnV7rqhZFCL7OyzwkhOIcuIMRPmUk70GgCxrvFTrvc18z940O1iekZgH38JbQ7Vd/3oHmA6zAGSbrJrhTidFox8KsCo5IgA93pZJCo6ds8F28nWQFDbka1OxxI34qo4EBmMgGmfBqKCHCiJGS+HQQgdUN175OqOzUNPLfeTjZG9+C8FsPEdhvS9z7SFx81II0UrglmpyCykxn8tl0IhVmYisFvDxP4tsOYqXb7gjkrMStnrNqDcWe5Z4lTIO0onQWQbfAt+lxwyNYRRfzg4MGDW2wmUhOQpGcBsElhAt8kJvNZtWPn/i+++KIE03K31fqPxqXxRS0bIxVmhj62in9xGE9pfcOu6k6aNOnBSMGvnqedB+wmVpVYgM4XrMJBNOxd7GB0VJhI4HtWtgpV2oskpNhcwjRwGt/CVp5yI3JQO7T3TbVr5wCLDiHaOGDlRGDid1yPhQVjWFa8j1jVbFFI4n8Xeck2q0Qqz3tQ78kQOI+k6yLWNOYQUycYLhxqBwncgj3dRV9bSdRuJ0beS6x81izBS98nsdXr8OL/CIyjtVQAU36MOXqttbW1yzUVxjEs1eyYzRoq8XJgSl2xKjnATKR2Cd7ycWZ1H/any40wK1S4qH7UH/0+pv5Fh3+s3UPf2LFj/2nWhnAjaONq1yRQdo2ZvUWzY5LSbyeNvl5runQcx/ciZk+dL2J2Z2PohyEJfbY+cfr0aYOlhTjOSXydBE13oiG12O5Svm9FqnYgnWWiCfru4fpC/u6lCbpGaH0ra887tJgf8ZoI4p6Lei40U01sz9sQlE9m5A6YOB9mToFpHruL5NE+xAzOYfy5FC1ZygSfAf7sxQa+hfS8zue7e/bsmRuo6jD3OmxlJuahLmIVRtRvCfSWwoL8LuDZKpEPN+scq1P04vTOJWo1jkBs60uffTdiFZaU4SCuC5QoPJ9x5MgRgwqqFOMiPDRwLcZxJgsXajxK3Bp+5SOYLgUEfwlrXRj9V6NDMcSrUdG5JoDa6C+1KYYLi/tmBU2Yo4WMfwVOaYj4EdQGqgHdhN6nq2QCyVuB07imoqIiB8N7wUMwtWvmzJmf7Nq1a1qwteCLgXkzZswo271798TAa0ePHs2BiSX4gCqY+CYOpYTvu6hNbOzFcH1ZsmTJdFz/CyQBjuFF7YDXJmZnFHZix8Vk+wJP6H9r8uTJExTDh7oX3KhEaxWQ7vnly5dP7RWJFBcXb3TSMThpr5A/uTmCkPyai5F5ohu4kqcYnr/LnTy7du3ax3slE3ASmU5EH3Uvl+qyenUYULrWt3Z70RyiV3RXV1dX+szXQSfPo85ZvZwIbj3DSQPcXynQqoPsyxuk0H9mNxaN9SE6off+8vLyN3rANzb/iMPxD+vFQBxFooOHJbp1PQU8mkGY+BA29LX+UG4WCpZBZwn0/qrH+Yl+6K5z0g78SurFQJIEHidE0GFbYBBOjfMtGNj/9mcGApw/h85bTcLSNieT788v1+oDCXvqmc1iDHN7f2Se6BJ9otP1AksM6hm7D0j0Ud9ki6zv+xjoO1Sy0Z8O0SO6oG+PxS0pTjYc+fMr3peO73QSBnFkWon8gQMHngcvPR0MvfflITqg53eiywpMczhyovCroxcDYYpTsc6zYpDi5srKynUY69L+wECl6UWPVYZI40CrRjiMpet6MZDA+YRDHDQaMba0uoQ8HaSEbqKepTqWzKP/Y6IDejqDwJoEoEyBQ6mu/ZKBsmm45d8zU6/QYb2dXUtkKwqxKzlG8FWzg2SxYyqFqFopdFSEsI/5jGdkqLZUk0P+sA6k8VeyOF+aA49gCcXepaRzVpMYzeYmbXpZAVPnEThnmG1BIEk5kFT5FMXcweAOkxNTdI3XTQpVHYEETqMwPcFqSxfOp5Y4eDtjKYFxO5iQ4/zWOxsjQypEXn3+eIkE6ktkZoYTbC/C7W/goaGBuI9n5uNItlp5LxHOtaQY5/2SguE70ci5kLzmBdeI88WodYx/G8C7tify8nM81jhQBhem1ezfv/+PMHKnmSfGDi7TaluIiCUxxgxMDCaB0J+EMCwyzLegbSsrK3sJ4N2LeY422ijMQXS3mC2Ys3Aznhm6KtjsMgBvjBnoDSaBmKz5mKlRZhuBEJAtdrBhyEgED/Yvrb4ZF274k/243aoaIU4LD/1YArUUize93Wy1Ea3T/pttrmz1YiG6kgWY7Rbh2zKytWMtJHBAP5FA07UHnODXUM9rLFT7DSTzuCsM9AHQ58xKa/FeiXT2oJkUQrinPzCQifSYSR8e9hcsTXhM6hXlUJ+zsyZsO5mApG0hjf+Z2TVmsRjoM8dEAj3Yz4RYMpD+TRnI0oX2yS03e4Zxfsh4t7u6WxN70MmsPRJYImGcX2CKg9DHkMTEfiiBqpvxBFRTpCJhG8z2GAr3wfCHwcBnXd/uyoz9CWy03+xaVVXVNLK8v/aPjyEkAcZ6YiyBCaLD8CtTwfY9ypq2aY0149sDDt4Ulf3CkkJm817fqt0FL4SAiXejGsV+EpggCQhn4LJRlGC0UjXwAZ9t4e4Hpn+P6OjBpdB3G8y7zWwpFkfJz13rnUif4/3CEJFkhY0Ea1Dx51ixO0bebQcz73Uigb79xN1AiFIkWXt//654GqNOmD56GZO0GkQwG+8YZ3ct2qfCXl858XU8+6QZbPHdq3fUJEatQpWBeKwqVP1PVKQBqblCZWUA1dOh7tfmQhhUxjrzQwxyurygRf9iwnTdR0Bfps2HNnZ8noaWDLLRc4LtMO05abcUtBEXlQpVBnmD3c3SSNIJOlnvA+BmBd1apD4CM5QFmsd9Xoc75b08N1/Pqx2rYgCkuY2NivfzedIO3WoHIVnsOgMlfajmRw4Xrs8VOxp+WxNwNI3sNHqFoszVwIW0SOtr9LzaUXtqV+37lyHTvzY2Ot1o806oOulwtnrd4HSrvl7VxHPa/dh9+eWXf8zmmJtQp5xovSDC53hy6Odm+lMN4Ln+RYcTuu1IoaNtDkhfMrjpAbOUT4istUFx0jnnAlZMIzHhxcNVR6v4Uu3iIGr14jKcRZr6Vf92IwrjqzVfwZ+fI4Vet7wwzim+wwgPh4l5OvNRrefBWeuQjMcJATeRzWl049V78t6oagZ27gaSv3eCAIoinSTalLTEueaF8agFDP6oG0U9vm38hygPfgQH8HUcQqLd/SX+6oqj0j7muXqZBO1VhbOb1DDfl1yB9851dZsD8W4FkrNKdXJIzsBIZlemgOWDfPDZPYDXe4AjBzD+eyBmN5LzKav+lZz1fO9Ags8qq8OZjASnw7g8PrWUcAUqOhNVLVBI5tZLJBEUacX1aEiV60AaBP8OErOGDv5GB143ymz10kfOMXwdg7Ffo8IfGNSFd21BKmU2ZMA82LEkbNMggWjtVXFq1+wcePM2+l/F5H4QtRfv+HY+Lg2281F5VL0nBmhRohmNZSE5/dcRDpbAnPZghfBoVhNwZ6ERxmtP4p0ymxl6Hc+8DMhQH8hcCG7Gtj2Jqs3gvpVI1Sy+/wEC+2zfg+gQw5jAZ5DkK1lUX4lkzdTLKSRlJgmEGuzyYu7bZvTlq5/oeBqz9h9tgYCZzQDZp/htTCA4loPAfk7h+tMY6Dqne4PtnnIi9FNDP0/QT1Fg5YS+Y2sncP1ZvftGu5owSZ/oFVZGX7/6yfiq0jObmb4XIsaGqoURY2F0Nip1K+cWBtMU6Xu0tP1M0Qftbeb8PhqQFSq6EZ1imujWy9PCGbdrDDQiqxLNo8D7Rql9OMyDCfU8vwqpz+3r6tiYM9BfGrBNr4XDQJ570c47GaLNwJi+wVJwhPNls6UCI0SdCuHlpv6wRyXm71DV+ithWKPDdFYN4eEOw7j0ElrFybUsSDliBjBqGwC86RIDjfPbDLAlr9qNh+UwyOy8avXC7pgw0Gwrf18ebNjZijc+EgoK6TrQqZxyvO2xpNe/5O8cxRs3bjT6cme5yVEHJpzBZzbAPAvpSiW3l+j/nxGA75qZ6OMQf4xYvCnGr67/KvK59N9hRHb8T4ABAPaAkPNeKkdCAAAAAElFTkSuQmCC", ke = "application/vnd.folder", be = "nashepo.collisionfinder360", Ui = new TextEncoder(), Di = new TextDecoder(), re = async (t, e) => (await t.propfind()).find((n) => n.title === e);
async function on(t, e) {
  const n = await re(t, e);
  if (n && n.mimeType !== ke)
    throw Error(`«${e}» должен быть папкой.`);
  return n || t.mkcol(e, ke);
}
async function an(t, e, n, a = "application/json") {
  const o = await re(t, e);
  o ? await o.put(n) : await t.mkcol(e, a, n);
}
function rn(t) {
  const e = JSON.parse(Di.decode(t));
  if (e?.format !== "nashepo.checks.workspace" || e.version !== 1 || typeof e.projectId != "string" || !e.projectId || typeof e.revision != "string" || !Array.isArray(e.images))
    throw Error("Неизвестный формат хранилища проверок.");
  Ze(JSON.stringify(e.project));
  for (const n of e.images)
    if (!n || typeof n.checkId != "string" || typeof n.clashId != "string" || typeof n.file != "string" || !/^[a-f0-9]{64}\.(jpg|png)$/.test(n.file))
      throw Error("Некорректная ссылка на снимок в хранилище проверок.");
  return e;
}
function Li(t) {
  const e = atob(t.slice(t.indexOf(",") + 1));
  return Uint8Array.from(e, (n) => n.charCodeAt(0));
}
function Fi(t, e) {
  let n = "";
  for (let a = 0; a < e.length; a += 32768)
    n += String.fromCharCode(...e.subarray(a, a + 32768));
  return `data:image/${t.endsWith(".png") ? "png" : "jpeg"};base64,${btoa(n)}`;
}
class ce {
  constructor(e, n, a, o) {
    this.workspace = e, this.directory = n, this.loaded = a, this.projectId = o?.projectId || crypto.randomUUID(), this.revision = o?.revision, this.label = `${e.root.title}/${be}`;
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
    if (e.inmemory || e.root.mimeType !== ke)
      throw Error("Выберите доступную для записи папку на диске.");
    const n = await re(e.root, be);
    if (n && n.mimeType !== ke)
      throw Error(`«${be}» должен быть папкой.`);
    const a = n && await re(n, "project.json");
    if (!a) return new ce(e, n, void 0);
    const o = rn(await a.get()), i = Ze(JSON.stringify(o.project)), r = n && await re(n, "images"), l = new Map((r ? await r.propfind() : []).map((c) => [c.title, c])), s = new Map(i.checks.flatMap((c) => c.results.map((f) => [JSON.stringify([c.id, f.id]), f])));
    for (const c of o.images) {
      const f = s.get(JSON.stringify([c.checkId, c.clashId])), u = l.get(c.file);
      if (f && u)
        try {
          f.image = Fi(c.file, await u.get());
        } catch {
        }
    }
    return new ce(e, n, i, o);
  }
  save(e) {
    const n = structuredClone(e), a = this.queue.catch(() => {
    }).then(() => this.saveNow(n));
    return this.queue = a, a;
  }
  async saveNow(e) {
    await this.workspace.requestWritePermissions?.();
    const n = this.directory || await on(this.workspace.root, be);
    this.directory = n;
    const a = await re(n, "project.json"), o = a && await a.get(), i = o && rn(o);
    if (i?.revision !== this.revision || i && i.projectId !== this.projectId)
      throw Error("Папка проверок изменена в другом окне. Откройте её заново перед сохранением; текущую работу можно выгрузить в JSON.");
    const r = [];
    let l, s;
    for (const f of e.checks) for (const u of f.results) {
      const m = u.image;
      if (delete u.image, !Be(m)) continue;
      l ||= await on(n, "images"), s ||= new Set((await l.propfind()).map((x) => x.title));
      let b = this.images.get(m);
      if (!b) {
        const x = Li(m);
        b = [...new Uint8Array(await crypto.subtle.digest("SHA-256", x))].map((N) => N.toString(16).padStart(2, "0")).join("") + (m.startsWith("data:image/png") ? ".png" : ".jpg"), s.has(b) || (await l.mkcol(b, m.startsWith("data:image/png") ? "image/png" : "image/jpeg", x), s.add(b)), this.images.set(m, b);
      }
      r.push({ checkId: f.id, clashId: u.id, file: b });
    }
    const c = {
      format: "nashepo.checks.workspace",
      version: 1,
      projectId: this.projectId,
      revision: crypto.randomUUID(),
      savedAt: (/* @__PURE__ */ new Date()).toISOString(),
      project: e,
      images: r
    };
    o && await an(n, "project.previous.json", o), await an(n, "project.json", Ui.encode(JSON.stringify(c))), await this.workspace.flush(), this.revision = c.revision;
  }
}
const ze = "nashepo:clash-scene-owner";
function Ri(t, e, n) {
  const a = crypto.randomUUID();
  let o = !1, i = !1;
  const r = () => {
    i && (i = !1, n());
  }, l = () => {
    !o || i || (window.dispatchEvent(new CustomEvent(ze, { detail: a })), i = !0, e());
  }, s = () => {
    const m = t.isConnected && t.getClientRects().length > 0 && getComputedStyle(t).visibility !== "hidden";
    m !== o && (o = m, m ? l() : r());
  }, c = (m) => {
    m.detail !== a && r();
  };
  window.addEventListener(ze, c), t.addEventListener("pointerdown", l);
  const f = new ResizeObserver(s);
  f.observe(t);
  const u = window.setInterval(s, 200);
  return s(), () => {
    f.disconnect(), clearInterval(u), window.removeEventListener(ze, c), t.removeEventListener("pointerdown", l), r();
  };
}
const Ti = ":host{display:block;height:100%;color-scheme:dark;font:13px/1.4 Segoe UI,sans-serif;color:#dbe5f0;container-type:size}*{box-sizing:border-box}[hidden]{display:none!important}main{height:100%;min-height:260px;background:#171d25;display:flex;flex-direction:column;overflow:hidden;-webkit-user-select:none;user-select:none}button,input,select,textarea{font:inherit;color:inherit;border:1px solid #425165;border-radius:6px;background:#253140;padding:7px 9px;min-width:0}button{cursor:pointer;white-space:nowrap}button:hover{background:#354459}button:disabled{opacity:.45;cursor:default}.primary{background:#b99a38;border-color:#d0ae46;color:#111820;font-weight:600}.primary:hover{background:#e0bd51}button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid #f2c94c;outline-offset:1px}input,select,textarea{background:#111a24}input,textarea,td,dd{-webkit-user-select:text;user-select:text}input[type=checkbox]{accent-color:#e6c354;width:16px;height:16px}header{display:flex;gap:7px;align-items:center;padding:8px 12px;border-bottom:1px solid #354459;flex-shrink:0;overflow-x:auto}.brand{display:flex;gap:7px;align-items:center;margin-right:8px}.brand img{width:32px;height:32px;object-fit:contain}.brand b{font-size:17px}.brand small{font-size:10px;color:#a6b5c7}#dirty{margin-left:auto;font-size:11px;color:#cabb81;white-space:nowrap}.notice{background:#1c2735;padding:5px 12px;font-size:12px;min-height:27px;max-height:70px;overflow:auto;color:#a7bbd1}.notice.error{color:#ffaaa1;background:#412725}.workspace{display:grid;grid-template-columns:230px minmax(0,1fr);flex:1;min-height:0}aside{padding:10px;display:flex;flex-direction:column;gap:9px;border-right:1px solid #354459;min-height:0}#checks{overflow:auto;flex:1;min-height:0}.check-item{display:flex;flex-direction:column;gap:5px;width:100%;margin-bottom:5px;text-align:left;white-space:normal}.check-item small{color:#a8b7ca}.check-item.active,.tabs .active{border-color:#c7ab56;background:#403b2c;color:#ffe399}.main{display:flex;flex-direction:column;min-width:0;min-height:0}.test-toolbar{display:flex;gap:7px;padding:8px 12px;align-items:center}.test-toolbar input{flex:1;font-weight:600}.tabs{display:flex;gap:7px;border-bottom:1px solid #354459;padding:0 12px 8px}.tabs button{min-width:105px}#content{flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column}.empty{padding:28px;color:#a4b4c9;text-align:center;margin:auto}h2,h3,p{margin:0 0 10px}h2{font-size:20px}h3{font-size:15px}label{display:flex;flex-direction:column;gap:5px;font-size:12px;color:#b8c6d7}.check{flex-direction:row;align-items:center;gap:6px}small{font-size:11px;color:#a8b7c9}.parameters{display:flex;gap:18px;align-items:end;padding:10px 12px}.parameters input{width:140px}.selection-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0 12px 12px}.selection{border:1px solid #39495e;border-radius:8px;padding:12px;background:#1b2633;min-width:0}.selection h3{display:flex;justify-content:space-between}.selection h3 span{color:#92c4b2;font-size:12px}.selection select[multiple]{width:100%;min-height:70px}.selection-tools{display:flex;gap:5px;flex-wrap:wrap;margin:8px 0}.selection-tools button{font-size:11px;padding:5px 7px}.selection>label{margin-bottom:8px}.condition{display:grid;grid-template-columns:minmax(80px,1fr) 100px minmax(70px,1fr) 29px;gap:5px;margin:6px 0}.condition button{padding:3px}.rules,.report{padding:18px;max-width:850px}.rules>label{margin:14px 0}.rules>p,.report>p{color:#a9b8cb}.report>button{margin:12px 8px 14px 0}.result-tools{display:flex;gap:7px;flex-wrap:wrap;padding:8px 12px}.result-tools input{flex:1;min-width:180px}.result-area{display:grid;grid-template-columns:minmax(0,1fr) 300px;flex:1;min-height:0}.table-area{display:flex;flex-direction:column;min-width:0;min-height:0}.scroll{overflow:auto;flex:1;min-height:0}table{border-collapse:separate;border-spacing:0;width:max-content;min-width:100%}th{position:sticky;top:0;background:#2a3748;z-index:1;text-align:left;max-width:240px;white-space:normal}th,td{padding:8px;border-bottom:1px solid #344154;vertical-align:top}td{max-width:320px;min-width:90px;overflow-wrap:anywhere;-webkit-user-select:text;user-select:text}td:first-child{min-width:36px}tr.active td{background:#453e29;color:#fff0b5}tr:hover td{background:#2c3847}.pager{display:flex;gap:10px;align-items:center;justify-content:center;padding:5px;border-top:1px solid #39495e;font-size:11px}.pager button{padding:2px 8px}.detail{border-left:1px solid #354459;padding:10px;overflow:auto}.detail h3{overflow-wrap:anywhere}.detail>label{margin:10px 0}.detail p{font:11px/1.5 Consolas,monospace}.detail details{border-top:1px solid #354459;padding:8px 0}summary{cursor:pointer}dl{font-size:11px;display:grid;grid-template-columns:1fr 1fr;gap:7px}dt,dd{overflow-wrap:anywhere;margin:0}dt{color:#9baec4}footer{border-top:1px solid #354459;padding:4px 12px;display:flex;justify-content:space-between;color:#91a4bb;font-size:11px}dialog{border:1px solid #53647c;border-radius:12px;background:#202c3a;color:#dbe5f0;width:min(700px,92vw);max-height:85vh;padding:20px;box-shadow:0 15px 60px #000a}dialog::backdrop{background:#000a}dialog p{margin:12px 0}dialog a{color:#f2c94c;margin-right:12px}.dialog-actions{display:flex;justify-content:flex-end;gap:8px;margin-top:16px}@container (max-width:950px){.workspace{grid-template-columns:185px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 240px}.selection-grid{grid-template-columns:1fr}.parameters,.test-toolbar{flex-wrap:wrap}.test-toolbar input{flex-basis:100%}}@container (max-height:400px){header{padding:5px 10px}.test-toolbar{padding:5px 10px}.tabs{padding-bottom:5px}.brand img{width:25px;height:25px}footer{display:none}}:host{font-size:12px}.brand img{background:#e1e7ef;border-radius:5px;padding:3px}.selection-tools button{font-size:12px}label{font-size:13px}.choose-layout{display:grid;grid-template-columns:220px minmax(0,1fr);min-height:0;flex:1;overflow:auto}.choose-layout .parameters{display:flex;flex-direction:column;align-items:stretch;gap:15px;border-right:1px solid #354459;justify-content:flex-start}.choose-layout .parameters input{width:100%}.choose-layout .parameters input[type=checkbox]{width:16px}.choose-layout .selection-grid{padding:10px 12px;grid-template-columns:minmax(0,1fr) minmax(0,1fr);align-items:start;min-width:0}.selection select[multiple]{height:180px;resize:vertical}.selection-mode{font-size:12px;color:#b6c4d5}.preset-row{display:flex;flex-wrap:wrap;gap:5px;margin-bottom:9px}.preset-row select{flex:1 1 160px}.preset-row button{padding:5px 7px;font-size:12px}.model-list{height:150px;overflow:auto;border:1px solid #425165;border-radius:6px;background:#111a24;padding:5px;margin-bottom:5px}.model-list label{display:flex;flex-direction:row;align-items:center;gap:7px;padding:4px 5px;color:#dbe5f0;overflow-wrap:anywhere}.model-list label:hover{background:#253140}.model-list .model-all{position:sticky;top:-5px;z-index:1;background:#1f2b39;border-bottom:1px solid #425165;font-weight:600}.legend{display:flex;gap:12px;flex-wrap:wrap;font-family:inherit!important}.part-a{color:#ff6161}.part-b{color:#65baff}.preview{display:block;width:100%;padding:5px;margin:8px 0}.preview img{display:block;width:100%;max-height:180px;object-fit:contain}.image-dialog{width:94vw;max-width:1500px}.image-dialog img{display:block;max-width:100%;max-height:75vh;margin:10px auto}#help-dialog{width:min(1000px,94vw);line-height:1.6}#help-dialog details{padding:12px 0;border-bottom:1px solid #425165}#help-dialog summary{font-size:16px;font-weight:600;color:#f0d27a}#help-dialog li{margin:8px 0}@container (max-width:1100px){.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .selection-grid{grid-template-columns:1fr}.condition{grid-template-columns:minmax(60px,1fr) 100px minmax(60px,1fr) 29px}}@container (max-width:700px){.choose-layout{display:block}.choose-layout .parameters{border-right:0;border-bottom:1px solid #354459}.workspace{grid-template-columns:160px minmax(0,1fr)}}button,input,select,textarea{padding:5px 7px;border-radius:5px}button{min-height:27px}input[type=checkbox]{width:14px;height:14px}.commandbar{position:relative;display:flex;gap:8px;min-height:45px;padding:5px 8px;overflow:visible;background:#131b25}.brand{flex:0 0 auto;margin-right:0;gap:5px}.brand img{width:28px;height:28px}.brand b{font-size:14px}.check-heading{display:grid;grid-template-rows:25px 12px;flex:0 1 230px;min-width:145px}.check-heading input{height:25px;border:0;background:transparent;padding:2px 5px;font-weight:600}.check-heading small{padding:0 5px;overflow:hidden;text-overflow:ellipsis;white-space:nowrap;font-size:9px}.tabs{align-self:stretch;align-items:center;flex:0 0 auto;gap:3px;padding:0;border:0}.tabs button{flex:0 0 auto;min-width:0;padding:5px 9px;background:transparent;border-color:transparent}.tabs .active{background:#3e3828;border-color:#b99a38}.header-actions{display:flex;align-items:center;gap:4px;margin-left:auto}#dirty{margin-left:0;width:0;height:0;overflow:visible;font-size:0}#dirty:not(:empty){width:7px;height:7px;border-radius:50%;background:#e5bd43;box-shadow:0 0 0 2px #e5bd4328}.more-menu{position:relative;z-index:20}.more-menu summary{display:grid;place-items:center;width:29px;height:29px;border:1px solid #425165;border-radius:5px;background:#253140;cursor:pointer;list-style:none;font-size:18px}.more-menu summary::-webkit-details-marker{display:none}.more-popover{position:absolute;right:0;top:calc(100% + 5px);display:grid;width:190px;gap:3px;padding:6px;border:1px solid #506176;border-radius:7px;background:#192431;box-shadow:0 12px 35px #000a}.more-popover button{text-align:left}.notice{min-height:23px;max-height:45px;padding:3px 9px;font-size:10px}.run-progress{display:grid;grid-template-columns:minmax(150px,auto) minmax(120px,1fr) auto;align-items:center;gap:8px;min-height:24px;padding:3px 9px;border-bottom:1px solid #425165;background:#202a20;color:#d9e7d2;font-size:10px}.run-bar{width:100%;height:7px;overflow:hidden;border-radius:2px;background:#101810}.run-bar i{display:block;width:0;height:100%;background:#e3bc43}#run-phase,#run-value{overflow:hidden;text-overflow:ellipsis;white-space:nowrap}#run-value{text-align:right;color:#b9c9b3}.workspace{grid-template-columns:190px minmax(0,1fr)}aside{gap:6px;padding:7px;background:#141c26}.aside-title{font-weight:600;font-size:12px}.aside-actions{display:grid;gap:5px}.check-item{gap:2px;margin-bottom:3px;padding:6px 7px}.check-item small{font-size:9px}.main{background:#171d25}#content{overflow:hidden}.choose-layout{grid-template-columns:180px minmax(0,1fr)}.choose-layout .parameters{gap:9px;padding:8px}.choose-layout .selection-grid{gap:8px;padding:8px}.selection{padding:8px}.selection h3,h3{font-size:13px;margin-bottom:6px}label{gap:3px;font-size:11px}small,.selection-tools button,.preset-row button{font-size:10px}.model-list{height:125px}.model-list label{padding:2px 4px}.selection-tools{gap:4px;margin:5px 0}.selection-tools button,.preset-row button{padding:3px 5px;min-height:23px}.result-tools{display:flex;align-items:center;justify-content:space-between;gap:6px;flex-wrap:nowrap;min-height:38px;padding:5px 7px;border-bottom:1px solid #354459;background:#151f2a}.result-filters,.bulk-tools{display:flex;align-items:center;gap:5px;min-width:0}.result-filters{flex:1}.result-filters input[type=search]{flex:1 1 190px;min-width:120px}#result-depth{flex:0 1 125px;min-width:92px}#result-count,#selection-count{color:#9fb0c4;white-space:nowrap;font-size:10px}.bulk-tools select{max-width:125px}.result-area{grid-template-columns:minmax(0,1fr) 310px}th,td{padding:5px 6px;font-size:11px;line-height:1.25}th{max-width:190px}td{max-width:260px;min-width:76px}.pager{justify-content:flex-end;min-height:29px;padding:3px 7px}.pager #selection-count{margin-right:auto}.detail{display:flex;flex-direction:column;min-width:0;padding:0;overflow:hidden;background:#141e29}.detail-head{display:flex;align-items:center;justify-content:space-between;gap:6px;min-height:47px;padding:7px 8px 4px}.detail-head>div:first-child{min-width:0}.detail-head small{color:#8093aa;letter-spacing:.08em}.detail-head h3{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;margin:0}.detail-nav{display:flex;gap:3px}.detail-nav button{min-width:27px;padding:2px 7px;font-size:17px}.clash-summary{display:flex;gap:5px;padding:0 8px 5px;color:#adbdcf;font-size:9px}.clash-summary span{padding-right:5px;border-right:1px solid #405064}.clash-summary span:last-child{border:0}.detail .legend{margin:0;padding:0 8px 5px;font-size:10px}.preview-slot{height:clamp(92px,18cqh,145px);flex:0 0 auto;margin:0 7px 6px;overflow:hidden;border:1px solid #37475b;border-radius:6px;background:#0e151d}.preview{position:relative;width:100%;height:100%;margin:0;padding:0;border:0;background:transparent}.preview img{width:100%;height:100%;max-height:none;object-fit:contain}.preview span{position:absolute;right:5px;bottom:5px;padding:3px 6px;border-radius:4px;background:#101923db;font-size:9px}.preview-empty,.detail-empty{height:100%;display:grid;place-content:center;justify-items:center;gap:4px;color:#788ba1}.preview-empty>span,.detail-empty>span{font-size:24px}.detail-actions{display:grid;grid-template-columns:1fr 1fr;gap:5px;padding:0 7px 7px}.detail-scroll{flex:1;min-height:0;overflow:auto;padding:7px 8px 12px;border-top:1px solid #354459}.detail-scroll>label{margin:7px 0}.detail p{font:inherit}.coordinates{display:grid;grid-template-columns:repeat(3,1fr);gap:3px;font:9px/1.3 Consolas,monospace;color:#91a3b7}.coordinates span{overflow:hidden;text-overflow:ellipsis}.detail details{padding:6px 0}.detail dl{font-size:10px}.detail-empty{padding:20px;text-align:center}footer{padding:2px 8px;font-size:9px}#project-storage{min-width:0;max-width:42%;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}@container (max-width:1050px){.workspace{grid-template-columns:165px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 270px}.check-heading{flex-basis:185px}.tabs button{padding-inline:6px}#dirty{display:none}}@container (max-width:820px){.brand b,.brand small,#result-count{display:none}.check-heading{flex-basis:155px}.result-tools{overflow-x:auto}.result-area{grid-template-columns:minmax(0,1fr) 245px}}@container (max-height:410px){.notice,footer{display:none}.preview-slot{height:90px}}.depth-breakdown{display:grid;grid-template-columns:1fr auto;gap:4px 8px;margin-bottom:9px;font:inherit}.depth-breakdown small{grid-column:1/-1;color:#adbdcf;font:inherit}.response-dialog{width:min(1000px,90vw);max-height:85vh}.response-list{overflow:auto;max-height:48vh}.response-list td{white-space:pre-wrap;max-width:320px;overflow-wrap:anywhere}.response-warning{color:#f8cb67}.work-replies article{padding:8px 0;border-bottom:1px solid #41526a}.work-replies article small{display:block;margin:5px 0}.work-replies article p{white-space:pre-wrap;overflow-wrap:anywhere}", ie = /* @__PURE__ */ new WeakMap(), pe = /* @__PURE__ */ new WeakMap(), sn = () => ({
  format: "nashepo.checks",
  version: 1,
  checks: [],
  sets: []
});
async function Hi(t, e) {
  const n = t.shadowRoot || t.attachShadow({ mode: "open" }), a = yi(t);
  let o = e.projectToken(), i = o ? pe.get(o) : void 0, r = "";
  if (!i && e.projectWorkspace?.())
    try {
      i = await ce.open(e.projectWorkspace());
    } catch (p) {
      r = String(p);
    }
  i && o && pe.set(o, i);
  let s = (o ? ie.get(o) : void 0) || i?.loaded || sn();
  o && ie.set(o, s);
  let c, f = s.checks[0]?.id || "", u = "select", m = "", b = 0, x = !1, M = !1, N, S = !0, I = !1, A, $ = !1;
  const P = /* @__PURE__ */ new Set();
  let L, B, F = 0;
  const k = () => s.checks.find((p) => p.id === f), d = (p) => n.querySelector("#" + p);
  n.innerHTML = `<style>${Ti}</style><main><header class="commandbar"><div class="brand"><img src="${qi}" alt=""><b>НашеПО</b><small>${In}</small></div><div class="check-heading"><input id="name" aria-label="Имя проверки" placeholder="Выберите проверку"><small id="check-summary">Проверка не выбрана</small></div><div id="tabs" class="tabs">${[
    ["select", "Выбор"],
    ["results", "Результаты"],
    ["rules", "Правила"],
    ["report", "Отчёт"]
  ].map(([p, h]) => `<button data-tab="${p}">${h}</button>`).join(
    ""
  )}</div><div class="header-actions"><button id="scan" title="Перечитать список и геометрию выбранных моделей">↻ Модели</button><button id="run" class="primary">▶ Запустить</button><button id="cancel" hidden>Остановить</button><details class="more-menu"><summary title="Другие команды">⋮</summary><div class="more-popover"><button id="open">Открыть проверки</button><button id="save">Сохранить проверки</button><button id="import-response">Ответ исполнителя…</button><button id="copy">Копировать проверку</button><button id="delete">Удалить проверку</button><button id="settings">Настройки</button><button id="help">Справка</button></div></details></div><span id="dirty"></span></header><div id="run-progress" class="run-progress" hidden><span id="run-phase">Подготовка</span><div id="run-bar" class="run-bar" role="progressbar"><i id="run-fill"></i></div><span id="run-value"></span></div><div class="notice" id="notice" role="status">Откройте IFC/SMDX в проекте и нажмите «Модели».</div><div class="workspace"><aside><div class="aside-title">Проверки</div><input id="test-search" type="search" placeholder="Поиск проверок"><div id="checks"></div><div class="aside-actions"><button id="all">Запустить все</button><button id="new" class="primary">＋ Новая проверка</button></div></aside><section class="main"><div id="content"></div></section></div><footer><span id="model-count">Модели не прочитаны</span><span>Расчёт выполняется на вашем компьютере</span></footer><input id="file" type="file" accept=".json" hidden><input id="response-file" type="file" accept=".zip,.json" hidden><dialog id="settings-dialog"><h2>Настройки</h2><label>Дистанция камеры, м<input id="distance" type="number" value="15" min="0.5"></label><p class="links"><a href="https://nashepo.ru/" target="_blank" rel="noopener noreferrer">Сайт НашеПО</a><a href="https://t.me/RoburFan" target="_blank" rel="noopener noreferrer">Telegram</a></p><button data-close="settings-dialog">Закрыть</button></dialog><dialog id="help-dialog">${bi}<button data-close="help-dialog">Закрыть</button></dialog><dialog id="set-dialog"><h2>Сохранить набор моделей</h2><label>Название<input id="set-name" maxlength="120"></label><div class="dialog-actions"><button id="set-cancel">Отмена</button><button id="set-confirm" class="primary">Сохранить</button></div></dialog></main>`;
  const v = document.createElement("button");
  v.id = "clear-project", v.textContent = "Очистить проект", d("save").after(v);
  const C = document.createElement("button");
  C.id = "project-folder", C.textContent = "Папка проверок…", d("open").before(C);
  const O = document.createElement("span");
  O.id = "project-storage", n.querySelector("footer").prepend(O);
  const T = () => {
    O.textContent = i ? `Папка: ${i.label}` : "Папка проверок не выбрана", O.title = r || O.textContent;
  };
  T(), n.querySelector(".more-popover").addEventListener(
    "click",
    () => n.querySelector(".more-menu").removeAttribute("open")
  );
  const U = (p, h = !1) => {
    d("notice").textContent = p, d("notice").classList.toggle("error", h);
  }, w = (p, h, g, y) => {
    const j = d("run-progress"), D = d("run-bar"), E = d("run-fill");
    if (j.hidden = !1, d("notice").hidden = !0, d("run-phase").textContent = p, g && g > 0 && h !== void 0) {
      const q = Math.max(0, Math.min(100, h / g * 100));
      E.style.width = `${q}%`, D.setAttribute("aria-valuemin", "0"), D.setAttribute("aria-valuemax", "100"), D.setAttribute("aria-valuenow", String(Math.round(q))), d("run-value").textContent = `${Math.round(q)}% · ${h}/${g}` + (y === void 0 ? "" : ` · найдено ${y}`);
    } else
      E.style.width = "0", D.removeAttribute("aria-valuenow"), d("run-value").textContent = y === void 0 ? "" : `Найдено ${y}`;
    D.setAttribute("aria-valuetext", d("run-value").textContent || p);
  }, z = () => {
    d("run-progress").hidden = !0, d("notice").hidden = !1;
  }, Z = async (p) => {
    try {
      await p();
    } catch (h) {
      U(h instanceof Error ? h.message : String(h), !0);
    }
  }, Y = () => new Promise((p) => {
    const h = d("set-dialog"), g = d("set-name");
    let y = !1;
    const j = (D) => {
      y || (y = !0, h.close(), p(D));
    };
    g.value = "Новый набор", d("set-confirm").onclick = () => {
      const D = g.value.trim();
      D ? j(D) : g.focus();
    }, d("set-cancel").onclick = () => j(), h.oncancel = (D) => {
      D.preventDefault(), j();
    }, h.showModal(), g.focus(), g.select();
  });
  let lt = 0;
  const et = async (p = i, h = s, g = o, y = lt) => {
    try {
      return p ? (await p.save(h), h === s && g === o && y === lt && (I = !1, d("dirty").textContent = "Сохранено в папке проекта"), !0) : !1;
    } catch (j) {
      return g === o && (d("dirty").textContent = "Не удалось сохранить в папку", U(j instanceof Error ? j.message : String(j), !0)), !1;
    }
  }, Pt = (p = 750) => {
    clearTimeout(A);
    const h = i, g = s, y = o, j = lt;
    A = window.setTimeout(async () => {
      await et(h, g, y, j);
    }, p);
  }, R = () => {
    I = !0, lt++, d("dirty").textContent = "Есть несохранённые изменения", o && ie.set(o, s), Pt();
  }, Q = async () => {
    const p = e.projectToken();
    if (p === o) return !1;
    clearTimeout(A), I && await et();
    let h = p ? pe.get(p) : void 0;
    if (r = "", !h && e.projectWorkspace?.())
      try {
        h = await ce.open(e.projectWorkspace());
      } catch (g) {
        r = String(g);
      }
    return p !== e.projectToken() ? !1 : (s = (p ? ie.get(p) : void 0) || h?.loaded || sn(), i = h, p && (ie.set(p, s), h && pe.set(p, h)), o = p, c = void 0, f = s.checks[0]?.id || "", m = "", P.clear(), b = 0, I = !1, e.clear(), d("dirty").textContent = "", T(), !0);
  }, at = async () => {
    if (I && i && !await et()) return !1;
    const p = o, h = await e.chooseProjectFolder();
    if (!h) return !1;
    const g = await ce.open(h);
    if (p !== e.projectToken()) throw Error("Активный проект изменился. Выберите папку повторно.");
    if (g.loaded) {
      if ((s.checks.length || s.sets.length) && !confirm("В папке уже есть проверки. Открыть их вместо текущих? Текущие проверки можно заранее сохранить в JSON.")) return !1;
      s = g.loaded, f = s.checks[0]?.id || "", m = "", P.clear(), c = void 0, e.clear();
    }
    if (clearTimeout(A), i = g, p && (pe.set(p, g), ie.set(p, s)), r = "", T(), V(), g.loaded)
      I = !1, d("dirty").textContent = "Проверки открыты из папки";
    else if (!await et()) return !1;
    return U("Папка проверок подключена. Правила, результаты, статусы, комментарии и снимки сохраняются в неё автоматически."), !0;
  };
  C.onclick = () => Z(async () => {
    if (!x) {
      ot(!0);
      try {
        await at();
      } finally {
        ot(!1);
      }
    }
  });
  const it = () => {
    const p = k();
    p?.lastRun && (p.status = "stale"), R(), ut();
  }, bt = () => [
    ...new Set(
      (c?.elements || []).flatMap((p) => Object.keys(p.properties))
    )
  ].sort(), ct = (p, h) => p.map(
    (g) => `<option value="${K(g)}" ${g === h ? "selected" : ""}>${K(g)}</option>`
  ).join("");
  function At() {
    const p = k(), h = d("result-search")?.value.toLowerCase() || "", g = d("result-state")?.value || "", y = d("result-replies")?.value || "", j = Number(d("result-depth")?.value || 0);
    return (p?.results || []).filter(
      (D) => (!g || D.state === g) && (!y || (D.workReplies || []).some((E) => y === "all" || E.decision === "pending")) && (p?.type === "duplicates" || vn(D, j, p?.precision ?? 0)) && (!h || JSON.stringify({ ...D, image: void 0 }).toLowerCase().includes(h))
    );
  }
  function ut() {
    const p = k();
    p && (d("check-summary").textContent = `${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[p.status]} · ${p.results.filter((g) => !["resolved", "excluded"].includes(g.state)).length} в работе / ${p.results.length}`);
    const h = d("test-search").value.toLowerCase();
    d("checks").innerHTML = s.checks.filter((g) => g.name.toLowerCase().includes(h)).map(
      (g) => `<button class="check-item ${g.id === f ? "active" : ""}" data-check="${g.id}"><strong>${K(g.name)}</strong><small>${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[g.status]} · ${g.results.filter((y) => !["resolved", "excluded"].includes(y.state)).length} в работе / ${g.results.length}</small></button>`
    ).join("");
  }
  function jt(p, h) {
    const g = c?.elements.filter(
      (G) => (k().includeHidden || !G.hidden) && se(G, p)
    ).length || 0, y = p.manualOnly ? st(p) : p.modelsMode === "selected" ? p.models : (c?.models || []).map((G) => G.id), j = c && y.every((G) => c.indexedModelIds.includes(G)) ? `${g} элементов` : "число после запуска", D = c?.models || [], E = p.modelsMode !== "selected", q = s.sets.map(
      (G) => `<option value="${K(G.id)}" ${p.presetId === G.id ? "selected" : ""}>${K(G.name)}</option>`
    ).join("");
    return `<article class="selection" data-side="${h}"><h3>Выбор ${h.toUpperCase()} <span data-selection-count>${j}</span></h3>${p.manualOnly ? '<p class="selection-mode">Только элементы, выбранные вручную</p>' : ""}<div class="preset-row"><select class="preset"><option value="">Набор моделей…</option>${q}</select><button data-selection="load-set">Применить</button><button data-selection="save-set">Сохранить набор</button><button data-selection="delete-set" ${p.presetId ? "" : "disabled"}>Удалить</button></div><div class="model-list"><label class="model-all"><input type="checkbox" class="all-models" ${E ? "checked" : ""}> Все модели</label>${D.map((G) => `<label><input type="checkbox" class="model-check" value="${K(G.id)}" ${E || p.models.includes(G.id) ? "checked" : ""}> ${K(G.name)}</label>`).join("") || "<small>Нажмите «Модели».</small>"}</div><small>Отметьте файлы, которые должны участвовать в выборе ${h.toUpperCase()}.</small><div class="selection-tools"><button data-selection="show">Показать выбранные элементы</button><button data-selection="only">Только выделенные в 3D</button><button data-selection="include">＋ Добавить из 3D</button><button data-selection="exclude">− Исключить из 3D</button><button data-selection="reset">Сбросить ручной выбор</button></div><small>Добавлено вручную: ${p.include.length} · исключено: ${p.exclude.length}</small></article>`;
  }
  function V() {
    ut();
    const p = k();
    d("name").value = p?.name || "", d("check-summary").textContent = p ? `${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[p.status]} · ${p.results.filter((h) => !["resolved", "excluded"].includes(h.state)).length} в работе / ${p.results.length}` : "Проверка не выбрана";
    for (const h of ["name", "copy", "delete", "run"])
      d(h).disabled = !p || x;
    for (const h of n.querySelectorAll("[data-tab]"))
      h.classList.toggle("active", h.dataset.tab === u);
    if (!p) {
      d("content").innerHTML = '<div class="empty"><h2>Создайте первую проверку</h2><p>Обновите модели, затем выберите, какие элементы проверять друг с другом.</p></div>';
      return;
    }
    u === "select" && (d("content").innerHTML = `<div class="choose-layout"><div class="parameters"><h3>Параметры проверки</h3><label>Тип<select id="type"><option value="intersection" ${p.type === "intersection" ? "selected" : ""}>По пересечению</option><option value="duplicates" ${p.type === "duplicates" ? "selected" : ""}>Дублирование</option></select></label><label title="Запас при отборе и фильтрации; не обнуляет малые вхождения и не гарантирует погрешность оценки">Точность расчёта, мм<input id="precision" type="number" value="${p.precision}" min="0.001" max="100" step="0.1"></label><label title="Конфликты с меньшей оценкой глубины не попадут в результат">Минимальная глубина, мм<input id="min-penetration" type="number" value="${p.minPenetration}" min="0" max="100000" step="1" ${p.type === "duplicates" ? "disabled" : ""}></label><label class="check"><input id="touching" type="checkbox" ${p.touching ? "checked" : ""} ${p.type === "duplicates" ? "disabled" : ""}>Учитывать касания</label><small>Для отбора — большее из толщины перекрытия и захода вдоль оси профиля или трассы. Подробнее — в справке.</small><p class="legend"><span class="part-a">● Выбор А</span><span class="part-b">● Выбор Б</span></p></div><div class="selection-grid">${jt(p.a, "a")}${jt(p.b, "b")}</div></div><datalist id="property-fields">${ct(bt(), "")}</datalist>`), u === "rules" && (d("content").innerHTML = `<div class="rules"><h3>Исключение пар</h3><p>Элемент сам с собой не проверяется. Пара А/Б учитывается один раз.</p><label class="check"><input id="same-model" type="checkbox" ${p.ignoreSameModel ? "checked" : ""}>Не проверять элементы одной модели</label><label class="check"><input id="same-group" type="checkbox" ${p.ignoreSameGroup ? "checked" : ""}>Не проверять геометрию одного составного объекта</label><label>Не проверять пары с одинаковым значением свойства<input id="equal-property" list="property-fields" value="${K(p.equalProperty)}" placeholder="Без ограничения"></label><label class="check"><input id="hidden" type="checkbox" ${p.includeHidden ? "checked" : ""}>Включать скрытые элементы прочитанных моделей</label><p>Незагруженные подключённые файлы нужно открыть перед расчётом.</p><datalist id="property-fields">${ct(bt(), "")}</datalist></div>`), u === "results" && (d("content").innerHTML = `<div class="result-tools"><div class="result-filters"><input id="result-search" type="search" placeholder="Поиск по результатам"><select id="result-state"><option value="">Все состояния</option>${Object.entries(
      oe
    ).map(([h, g]) => `<option value="${h}">${g}</option>`).join("")}</select><select id="result-replies" aria-label="Ответы исполнителей"><option value="">Все результаты</option><option value="pending">Ожидают решения</option><option value="all">С ответами исполнителя</option></select>${p.type === "intersection" ? '<input id="result-depth" type="number" min="0" step="1" placeholder="Глубина от, мм">' : ""}<button id="show-markers" role="switch" aria-checked="${S}">${S ? "● Знаки" : "○ Знаки"}</button><span id="result-count"></span></div><div class="bulk-tools"><select id="bulk-state" title="Состояние для выбранных строк">${Object.entries(
      oe
    ).map(([h, g]) => `<option value="${h}">${g}</option>`).join("")}</select><button id="bulk">Применить</button></div></div><div class="result-area"><div class="table-area"><div class="scroll" id="table"></div><div class="pager"><span id="selection-count"></span><button id="prev-page">←</button><span id="page"></span><button id="next-page">→</button></div></div><div class="detail" id="detail"></div></div>`, rt(), pt()), u === "report" && (d("content").innerHTML = `<div class="report"><h3>${K(p.name)}</h3><p>Результатов: ${p.results.length}. Выбрано: ${P.size}. ${p.status === "stale" ? "Результаты устарели — рекомендуется повторный запуск." : ""}</p><label class="check"><input id="selected-only" type="checkbox" ${P.size ? "checked" : ""}>Только выбранные строки</label><label class="check"><input id="report-images" type="checkbox" checked>Добавить снимки (недостающие будут созданы автоматически)</label><button id="export-html" class="primary">Сформировать пакет отчёта (.zip)</button><p>Один архив открывается напрямую в плагине Топоматик 360 «Коллизии». РОБУР 0.12.0 и новее открывает этот ZIP напрямую: коллизии и снимки загрузятся вместе. Ответ исполнителя загружайте здесь через меню ⋮ → «Ответ исполнителя…». Внутри также находятся manifest.json и review.json для сохранения идентификаторов и дальнейшего обмена статусами.</p><p>Правила и все результаты сохраняются кнопкой «Сохранить проверки» в верхней панели.</p></div>`), d("content").inert = x;
  }
  const xt = (p) => p.axialPenetrationMm !== void 0 ? `Для отбора используется большее значение: толщина ${p.overlapThicknessMm === void 0 ? "не определена" : St(p.overlapThicknessMm) + " мм"}; продольный заход ${St(p.axialPenetrationMm)} мм` : p.kind === "touch" ? "Тела соприкасаются, общего объёма нет" : p.depth === "unmeasurable" ? "У элемента нет собственного объёма, замер глубины к нему неприменим" : p.depth === "tolerance" ? "Пересечение найдено, но его глубина не разрешена при текущем расчёте" : p.depth === "approximate" ? "Восстановлена внутренняя область оболочки, совмещены швы либо сокращён расчёт; точность числа не гарантируется" : "Оценка локальной толщины перекрытия двух элементов";
  function rt() {
    const p = k(), h = At(), g = Math.max(1, Math.ceil(h.length / 50));
    b = Math.max(0, Math.min(b, g - 1));
    const y = h.slice(b * 50, b * 50 + 50);
    d("table").innerHTML = h.length ? `<table><thead><tr><th><input id="check-page" type="checkbox" aria-label="Выбрать страницу" ${y.every((j) => P.has(j.id)) ? "checked" : ""}></th>${["№", "Состояние", "Ответ исполнителя", "Глубина, мм", "Длина контакта, мм", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "Комментарий"].map((j) => `<th>${j}</th>`).join("")}</tr></thead><tbody>${y.map((j, D) => `<tr data-result="${K(j.id)}" class="${j.id === m ? "active" : ""}"><td><input type="checkbox" class="row-check" aria-label="Выбрать конфликт" ${P.has(j.id) ? "checked" : ""}></td>${[b * 50 + D + 1, oe[j.state], Kn(j), De(j, p.type), j.contactLengthMm === void 0 ? "—" : "≈ " + St(j.contactLengthMm), j.a.name, j.a.model, j.a.guid || "—", j.b.name, j.b.model, j.b.guid || "—", j.note].map((E) => `<td title="${K(E)}">${K(E)}</td>`).join("")}</tr>`).join("")}</tbody></table>` : '<div class="empty">Нет результатов. Запустите проверку или измените фильтры.</div>', d("page").textContent = `${b + 1} / ${g}`, d("result-count").textContent = `${h.length} результатов`, d("selection-count").textContent = `Выбрано: ${P.size}`, d("prev-page").disabled = b === 0, d("next-page").disabled = b === g - 1;
  }
  function pt() {
    const p = k(), h = At(), g = h.findIndex((j) => j.id === m), y = p?.results.find((j) => j.id === m);
    d("detail").innerHTML = y ? `<div class="detail-head"><div><small>КОЛЛИЗИЯ</small><h3>#${g + 1} ${K(y.a.name)} × ${K(y.b.name)}</h3></div><div class="detail-nav"><button id="previous" title="Предыдущая коллизия" ${g <= 0 ? "disabled" : ""}>‹</button><button id="next" title="Следующая коллизия" ${g < 0 || g >= h.length - 1 ? "disabled" : ""}>›</button></div></div><div class="clash-summary"><span>${p?.type === "duplicates" ? "Дублирование" : "Пересечение"}</span><span title="${K(xt(y))}">${p?.type === "duplicates" ? "Совпадение геометрии" : y.kind === "touch" ? "Касание" : y.depth ? jn[y.depth] : `Глубина ${St(y.penetrationMm)} мм`}</span><span>${K(oe[y.state])}</span></div><p class="legend"><span class="part-a">● Элемент А</span><span class="part-b">● Элемент Б</span></p><div class="preview-slot">${y.image ? `<button id="open-image" class="preview"><img src="${K(y.image)}" alt="Снимок коллизии"><span>Открыть крупнее</span></button>` : '<div class="preview-empty"><span>◫</span><small>Снимок создастся после перехода в 3D</small></div>'}</div><div class="detail-actions"><button id="focus" class="primary">Перейти в 3D</button><button id="capture-image">▣ Снимок пары</button></div><div class="detail-scroll">${xi(y)}${y.axialPenetrationMm !== void 0 ? `<div class="depth-breakdown"><span>Толщина перекрытия</span><b>${y.overlapThicknessMm === void 0 ? "—" : St(y.overlapThicknessMm) + " мм"}</b><span>Заход вдоль оси</span><b>${St(y.axialPenetrationMm)} мм</b><small>Для фильтра — большее из двух значений. Заход учитывает внутреннее пространство конструкции.</small></div>` : ""}${y.contactLengthMm !== void 0 ? `<div class="depth-breakdown"><span>Длина контакта вдоль элемента</span><b>≈ ${St(y.contactLengthMm)} мм</b><small>Непрерывный участок соприкосновения поверхностей. Это длина контакта, а не глубина; порог глубины её не учитывает.</small></div>` : ""}<div class="coordinates">${y.point.map((j, D) => `<span>${["X", "Y", "Z"][D]} ${j.toFixed(3)}</span>`).join("")}</div><label>Состояние<select id="edit-state">${Object.entries(
      oe
    ).map(
      ([j, D]) => `<option value="${j}" ${y.state === j ? "selected" : ""}>${D}</option>`
    ).join(
      ""
    )}</select></label><label>Назначение<input id="assignee" value="${K(y.assignee)}"></label><label>Комментарий<textarea id="note" rows="2">${K(y.note)}</textarea></label>${[
      y.a,
      y.b
    ].map(
      (j, D) => `<details><summary>Элемент ${D ? "Б" : "А"} · свойства</summary><dl>${Object.entries(
        j.properties
      ).map(([E, q]) => `<dt>${K(E)}</dt><dd>${K(q)}</dd>`).join("")}</dl></details>`
    ).join("")}</div>` : '<div class="detail-empty"><span>◫</span><p>Выберите коллизию в таблице</p><small>Двойной щелчок сразу перенесёт камеру в 3D.</small></div>';
  }
  const st = (p) => {
    const h = new Set(
      !p.manualOnly && p.modelsMode === "selected" ? p.models : []
    );
    for (const g of p.include)
      try {
        h.add(String(JSON.parse(g)[0]));
      } catch {
        const y = c?.elements.find(
          (j) => j.id === g
        )?.modelId;
        y && h.add(y);
      }
    return [...h];
  }, dt = (p) => {
    if (!p?.length) return;
    const h = /* @__PURE__ */ new Set();
    for (const g of p)
      for (const y of [g.a, g.b]) {
        if (!y.manualOnly && y.modelsMode !== "selected") return;
        for (const j of st(y)) h.add(j);
      }
    return h;
  }, Dt = (p) => {
    let h = p.trim().replace(/\\/g, "/").toLocaleLowerCase();
    try {
      h = decodeURIComponent(h);
    } catch {
    }
    h = h.replace(/[?#].*$/, "");
    const g = h.split("/").filter(Boolean).at(-1) || h;
    return /* @__PURE__ */ new Set([h, g]);
  }, Wt = (p) => {
    const h = new Set(p.map((q) => q.id)), g = p.map((q) => ({
      id: q.id,
      aliases: /* @__PURE__ */ new Set([
        ...Dt(q.id),
        ...Dt(q.name)
      ])
    })), y = (q) => {
      if (h.has(q)) return q;
      const G = Dt(q), W = g.filter(
        (nt) => [...G].some((J) => nt.aliases.has(J))
      );
      return W.length === 1 ? W[0].id : q;
    }, j = (q) => {
      try {
        const G = JSON.parse(q);
        if (!Array.isArray(G) || G.length < 2) return q;
        const W = String(G[0]), nt = y(W);
        return nt === W ? q : JSON.stringify([nt, ...G.slice(1)]);
      } catch {
        return q;
      }
    };
    let D = !1;
    const E = (q) => {
      const G = q.models.map(y), W = q.include.map(j), nt = q.exclude.map(j);
      (G.some((J, X) => J !== q.models[X]) || W.some((J, X) => J !== q.include[X]) || nt.some((J, X) => J !== q.exclude[X])) && (q.models = [...new Set(G)], q.include = [...new Set(W)], q.exclude = [...new Set(nt)], D = !0);
    };
    for (const q of s.checks)
      E(q.a), E(q.b), q.modelsAtRun && (q.modelsAtRun = q.modelsAtRun.map(y));
    for (const q of s.sets) {
      const G = q.selection.models.map(y);
      G.some((W, nt) => W !== q.selection.models[nt]) && (q.selection.models = [...new Set(G)], D = !0);
    }
    return D && R(), D;
  }, vt = () => {
    const p = k();
    if (p)
      for (const h of n.querySelectorAll("[data-side]")) {
        const g = h.dataset.side, y = c?.elements.filter(
          (q) => (p.includeHidden || !q.hidden) && se(q, p[g])
        ).length || 0, j = p[g].manualOnly ? st(p[g]) : p[g].modelsMode === "selected" ? p[g].models : (c?.models || []).map((q) => q.id), D = !!c && j.every((q) => c.indexedModelIds.includes(q)), E = h.querySelector(
          "[data-selection-count]"
        );
        E && (E.textContent = D ? `${y} элементов` : "число после запуска");
      }
  };
  function Nt() {
    $ && e.markers(
      At(),
      m,
      S,
      (p) => Z(() => te(p, !0))
    );
  }
  function te(p, h = !1) {
    if (!x) {
      if (m = p, u === "results") {
        const g = At().findIndex((j) => j.id === p), y = g < 0 ? b : Math.floor(g / 50);
        y !== b && (b = y, rt());
        for (const j of n.querySelectorAll("[data-result]"))
          j.classList.toggle("active", j.dataset.result === p);
        pt(), requestAnimationFrame(() => {
          [...n.querySelectorAll("[data-result]")].find(
            (D) => D.dataset.result === p
          )?.scrollIntoView({ block: "nearest", inline: "nearest" });
        });
      }
      if (Nt(), h && $) {
        const g = k()?.results.find((y) => y.id === p);
        g && (e.focus(g, Number(d("distance").value)), ge(g));
      }
    }
  }
  function ge(p) {
    clearTimeout(B);
    const h = ++F, g = Number(d("distance").value);
    p.image && p.imageScope === "pair-ab" && p.imageDistance === g || !e.canLocate(p) || (B = window.setTimeout(async () => {
      if (!(!$ || h !== F || x || m !== p.id))
        try {
          const y = await e.snapshot(
            p,
            g,
            () => h !== F || x || m !== p.id,
            !1,
            !1
          );
          if (h !== F || m !== p.id) return;
          p.image = y, p.imageScope = "pair-ab", p.imageDistance = g, R(), u === "results" && pt();
        } catch (y) {
          h === F && m === p.id && U(
            "Не удалось создать снимок выбранной коллизии: " + (y instanceof Error ? y.message : String(y)),
            !0
          );
        }
    }, 500));
  }
  async function Ie(p) {
    M = !1, ot(!0), w("Создание снимка пары");
    try {
      const h = Number(d("distance").value);
      p.image = await e.snapshot(p, h, () => M || !$), p.imageScope = "pair-ab", p.imageDistance = h, R(), u === "results" && m === p.id && pt();
    } catch (h) {
      U(
        "Результаты сохранены. Снимок пары не создан: " + (h instanceof Error ? h.message : String(h)),
        !0
      );
    } finally {
      z(), ot(!1);
    }
  }
  async function wt(p, h = !1) {
    await Q(), w("Подготовка моделей");
    let g = h ? /* @__PURE__ */ new Set() : dt(p);
    if (!h && g?.size) {
      const y = await e.scan(
        (j) => w(j),
        () => M,
        /* @__PURE__ */ new Set()
      );
      c = y, Wt(y.models) && (g = dt(p));
    }
    c = await e.scan(
      (y) => {
        U(y), w(y);
      },
      () => M,
      g
    ), Wt(c.models), d("model-count").textContent = `Проиндексировано моделей: ${c.indexedModelIds.length} из ${c.models.length} · элементов: ${c.elements.length}`, V(), U(
      c.blockers.length ? c.blockers.join(" ") : c.warnings.length ? `Модели прочитаны с замечаниями. ${c.warnings.join(" ")}` : "Модели прочитаны. Настройте выборки и запустите проверку.",
      !!c.blockers.length
    );
  }
  const ot = (p) => {
    x = p, p && (clearTimeout(B), F++);
    for (const h of [
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
      "project-folder",
      "import-response"
    ])
      d(h).disabled = p;
    d("cancel").hidden = !p, d("content").inert = p, d("checks").inert = p;
  };
  async function $t(p) {
    const h = (y) => {
      const j = `${p.name} · ${y.phase}`;
      U(`${j} ${y.done}/${y.total} · найдено ${y.found}`), w(j, y.done, y.total, y.found);
    };
    let g;
    try {
      g = new Oi();
    } catch {
      return Ni(
        c.elements,
        p,
        h,
        () => M,
        (y) => e.geometry(y, () => M)
      );
    }
    return N = g, new Promise((y, j) => {
      const D = () => {
        g.terminate(), N = void 0, L = void 0;
      };
      L = () => {
        D(), j(Error("Расчёт отменён. Предыдущие результаты сохранены."));
      }, g.onmessage = async (E) => {
        if (E.data.load) {
          try {
            const q = await e.geometry(
              E.data.load,
              () => M || N !== g
            );
            if (N !== g) return;
            const G = [
              q.vertices?.buffer,
              q.indices?.buffer
            ].filter(Boolean);
            g.postMessage(
              { request: E.data.request, geometry: q },
              G
            );
          } catch (q) {
            N === g && g.postMessage({
              request: E.data.request,
              error: q instanceof Error ? q.message : String(q)
            });
          }
          return;
        }
        E.data.progress ? h(E.data.progress) : (D(), E.data.error ? j(Error(E.data.error)) : y(E.data.results));
      }, g.onerror = (E) => {
        D(), j(
          Error(
            `Не удалось запустить расчёт в фоновом потоке: ${E.message || "ошибка загрузки"}`
          )
        );
      }, g.postMessage({
        elements: c.elements,
        streaming: typeof e.geometry == "function",
        check: structuredClone({ ...p, results: [], warnings: [] })
      });
    });
  }
  async function Ot(p = !1) {
    if (!x) {
      ot(!0);
      try {
        if (await Q(), !o) throw Error("Сначала откройте модели в Топоматик 360.");
        if (r) throw Error("Не удалось открыть хранилище проверок. Выберите исправную папку через «Папка проверок…». " + r);
        if (!i && !await at())
          return;
        if (!await et()) throw Error("Проверка не запущена: сначала восстановите запись в папку проекта.");
        const h = p ? [...s.checks] : [k()].filter(Boolean);
        if (!h.length) throw Error("Создайте проверку.");
        for (const g of h)
          for (const y of [g.a, g.b])
            y.conditions = [], y.mode = "all";
        M = !1, ot(!0), w("Подготовка моделей");
        try {
          if (await wt(h), ot(!0), c.blockers.length)
            throw Error(
              "Состав моделей прочитан не полностью. " + c.blockers.join(" ")
            );
          for (const y of h) {
            if (M) break;
            for (const q of ["a", "b"]) {
              const G = y[q], W = q === "a" ? "А" : "Б";
              if (G.modelsMode === "selected" && G.models.some((J) => !c.models.some((X) => X.id === J)))
                throw Error(
                  `${y.name}: одна из моделей выборки отсутствует. Исправьте выборку.`
                );
              if (G.include.some((J) => !c.elements.some((X) => X.id === J)))
                throw Error(
                  `${y.name}: вручную добавленный элемент отсутствует в модели.`
                );
              const nt = Mn(c.elements, G, y.includeHidden);
              if (nt) throw Error(`${y.name} · выбор ${W}: ${nt}`);
            }
            const j = ti(y);
            if (y.configAtRun === j && y.modelsAtRun?.some(
              (q) => !c.models.some((G) => G.id === q)
            ))
              throw Error(
                `${y.name}: состав моделей уменьшился. Подключите прежние модели или создайте копию проверки для нового состава. Прежние результаты сохранены.`
              );
            const D = await $t(y);
            if (M || !e.isCurrent())
              throw Error(
                "Проект изменился или расчёт отменён. Предыдущие результаты сохранены."
              );
            const E = (/* @__PURE__ */ new Date()).toISOString();
            y.results = ni(
              y.configAtRun === j ? y.results : [],
              D,
              E
            ), y.lastRun = E, y.fingerprint = c.fingerprint, y.configAtRun = j, y.modelsAtRun = [...c.indexedModelIds], y.status = "done", y.warnings = [...c.warnings], f = y.id, m = y.results[0]?.id || "", P.clear(), R();
          }
          u = "results", V(), Nt(), U(
            `Проверка завершена. ${k()?.results.length || 0} результатов.`
          );
          const g = k()?.results.find((y) => y.id === m);
          g && !M && $ && await Ie(g), clearTimeout(A), await et();
        } finally {
          z(), ot(!1), V();
        }
      } finally {
        ot(!1);
      }
    }
  }
  function kt(p) {
    const h = p.closest("[data-side]")?.dataset.side;
    if (!h) return;
    const g = k()[h], y = p, j = p.closest("[data-side]");
    if (y.classList.contains("preset")) {
      g.presetId = y.value || void 0, j.querySelector(
        '[data-selection="delete-set"]'
      ).disabled = !g.presetId;
      return;
    }
    if (y.classList.contains("all-models")) {
      for (const D of j.querySelectorAll(
        ".model-check"
      ))
        D.checked = y.checked;
      g.modelsMode = y.checked ? "all" : "selected", g.models = [], g.manualOnly = !1, g.presetId = void 0;
    }
    if (y.classList.contains("model-check")) {
      const D = [
        ...j.querySelectorAll(".model-check")
      ], E = D.filter((G) => G.checked).map((G) => G.value), q = D.length > 0 && E.length === D.length;
      j.querySelector(".all-models").checked = q, g.modelsMode = q ? "all" : "selected", g.models = q ? [] : E, g.manualOnly = !1, g.presetId = void 0;
    }
    g.conditions = [], g.mode = "all", it(), vt();
  }
  d("new").onclick = () => {
    const p = _n();
    p.name = `Проверка ${s.checks.length + 1}`, s.checks.push(p), f = p.id, u = "select", m = "", P.clear(), R(), V();
  }, d("scan").onclick = () => Z(async () => {
    M = !1, ot(!0), w("Чтение моделей");
    try {
      const p = k();
      await wt(p ? [p] : void 0, !p);
    } finally {
      z(), ot(!1), V();
    }
  }), d("run").onclick = () => Z(() => Ot()), d("all").onclick = () => Z(() => Ot(!0)), d("cancel").onclick = () => {
    M = !0, L?.();
  }, d("test-search").oninput = ut, d("checks").onclick = (p) => {
    const h = p.target.closest(
      "[data-check]"
    );
    h && !x && (e.clear(), f = h.dataset.check, m = "", P.clear(), b = 0, V());
  }, d("tabs").onclick = (p) => {
    const h = p.target.closest("[data-tab]");
    h && !x && (u = h.dataset.tab, V());
  }, d("name").onchange = () => {
    const p = k();
    p && (p.name = d("name").value.trim() || "Проверка", R(), ut());
  }, d("copy").onclick = () => {
    const p = k();
    if (!p) return;
    const h = structuredClone(p);
    Object.assign(h, {
      id: crypto.randomUUID(),
      name: p.name + " — копия",
      results: [],
      lastRun: void 0,
      fingerprint: void 0,
      configAtRun: void 0,
      status: "new"
    }), s.checks.push(h), f = h.id, m = "", P.clear(), R(), V();
  }, d("delete").onclick = () => {
    k() && confirm(`Удалить проверку «${k().name}» и её результаты?`) && (s.checks = s.checks.filter((p) => p.id !== f), f = s.checks[0]?.id || "", P.clear(), e.clear(), R(), V());
  }, d("clear-project").onclick = () => {
    !s.checks.length && !s.sets.length || confirm(
      "Очистить проверки, наборы моделей и результаты текущего проекта?"
    ) && (s.checks = [], s.sets = [], c = void 0, f = "", m = "", P.clear(), e.clear(), R(), d("model-count").textContent = "Модели не прочитаны", V(), U("Данные проверок текущего проекта очищены."));
  }, d("save").onclick = () => {
    Ke("НашеПО-проверки.json", JSON.stringify(s, null, 2)), d("dirty").textContent = "Копия JSON подготовлена";
  }, d("import-response").onclick = () => {
    x || d("response-file").click();
  }, d("response-file").onchange = () => Z(async () => {
    const p = d("response-file"), h = p.files?.[0];
    if (p.value = "", !h || x) return;
    const g = s, y = i, j = await Qn(h);
    if (g !== s || y !== i) throw Error("Проект изменился во время чтения ответа. Откройте файл ещё раз.");
    const D = wn(s, i?.projectId, j);
    if (!await gi(n, j, D)) return;
    if (g !== s || y !== i || x) throw Error("Проект изменился. Повторите загрузку ответа.");
    const E = Vn(s, i?.projectId, j);
    if (E) {
      const q = D.find((G) => G.clash && !G.reason && !G.duplicate);
      if (f = q.check.id, m = q.clash.id, u = "results", b = Math.floor(q.check.results.indexOf(q.clash) / 50), R(), V(), i && !await et()) {
        U("Ответ загружен в открытое окно, но не сохранён в папку. Сохраните проверки в JSON или восстановите запись в папку проекта.", !0);
        return;
      }
    }
    U(`Загружено отметок: ${E}. Они ожидают решения в карточках результатов.${i ? "" : " Сохраните проверки или подключите папку проекта, чтобы сохранить историю."}`);
  }), d("open").onclick = () => d("file").click(), d("file").onchange = () => Z(async () => {
    const p = d("file").files?.[0];
    if (!p) return;
    const h = Ze(await p.text());
    I && !confirm("Заменить текущие несохранённые проверки данными из файла?") || (s = h, c && e.isCurrent() && Wt(c.models), o && ie.set(o, s), R(), f = s.checks[0]?.id || "", m = "", P.clear(), e.clear(), d("dirty").textContent = "Проверки открыты; сохранение в папку…", V(), U("Проверки открыты. Обновите модели перед переходом к элементам."), d("file").value = "");
  });
  for (const p of ["settings", "help"])
    d(p).onclick = () => d(p + "-dialog").showModal();
  for (const p of n.querySelectorAll("[data-close]"))
    p.onclick = () => d(p.dataset.close).close();
  d("content").onchange = (p) => Z(() => {
    const h = p.target, g = k();
    if (!g) return;
    if (h.closest("[data-side]")) {
      kt(h);
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
    ].includes(h.id)) {
      if (h.id === "precision") {
        const j = Number(h.value);
        if (!Number.isFinite(j) || j < 1e-3 || j > 100)
          throw h.value = String(g.precision), Error("Точность должна быть от 0,001 до 100 мм.");
        g.precision = j;
      }
      if (h.id === "min-penetration") {
        const j = Number(h.value);
        if (!Number.isFinite(j) || j < 0 || j > 1e5)
          throw h.value = String(g.minPenetration), Error(
            "Минимальная глубина должна быть от 0 до 100 000 мм."
          );
        g.minPenetration = j;
      }
      h.id === "type" && (g.type = h.value), h.id === "touching" && (g.touching = h.checked), h.id === "same-model" && (g.ignoreSameModel = h.checked), h.id === "same-group" && (g.ignoreSameGroup = h.checked), h.id === "hidden" && (g.includeHidden = h.checked), h.id === "equal-property" && (g.equalProperty = h.value), it(), V();
      return;
    }
    if (h.id === "result-state" || h.id === "result-replies") {
      b = 0, rt();
      return;
    }
    if (h.id === "check-page") {
      for (const j of At().slice(b * 50, b * 50 + 50))
        h.checked ? P.add(j.id) : P.delete(j.id);
      rt();
      return;
    }
    if (h.classList.contains("row-check")) {
      const j = h.closest("[data-result]").dataset.result;
      h.checked ? P.add(j) : P.delete(j), d("selection-count").textContent = `Выбрано: ${P.size}`;
      return;
    }
    const y = g.results.find((j) => j.id === m);
    y && (h.id === "edit-state" && (y.state = h.value, rt(), ut(), Nt()), h.id === "assignee" && (y.assignee = h.value), h.id === "note" && (y.note = h.value, rt()), R());
  }), d("content").oninput = (p) => {
    const h = p.target;
    (h.id === "result-search" || h.id === "result-depth") && (b = 0, rt());
    const g = k(), y = Number(h.value);
    g && h.id === "precision" && Number.isFinite(y) && y >= 1e-3 && y <= 100 && (g.precision = y, it()), g && h.id === "min-penetration" && Number.isFinite(y) && y >= 0 && y <= 1e5 && (g.minPenetration = y, it());
  }, d("content").onclick = (p) => Z(async () => {
    const h = p.target, g = h.closest("button"), y = k();
    if (!y) return;
    if (g?.dataset.reply) {
      const D = y.results.find((G) => G.id === m), E = D?.workReplies?.find((G) => G.changeId === g.dataset.reply);
      if (!D || !E) return;
      const q = g.dataset.decision;
      if (q === "accepted" && !window.confirm(E.state === "fixed" ? "Вы проверили исправление по актуальным моделям? Статус коллизии станет «Исправленный»." : E.state === "excluded" ? "Принять исключение этой коллизии? Оно относится к этой паре и текущей точке, а не ко всем пересечениям элементов." : "Вернуть коллизию в работу по ответу исполнителя?")) return;
      Xn(D, E, q), R(), rt(), pt(), ut(), Nt();
      return;
    }
    if (g?.dataset.selection) {
      const D = g.closest("[data-side]").dataset.side, E = y[D], q = d("content").scrollTop;
      let G = !0;
      switch (g.dataset.selection) {
        case "load-set": {
          const W = s.sets.find((nt) => nt.id === E.presetId);
          if (!W) throw Error("Выберите сохранённый набор моделей.");
          Object.assign(E, structuredClone(W.selection), {
            conditions: [],
            mode: "all",
            include: [],
            exclude: [],
            manualOnly: !1,
            presetId: W.id
          });
          break;
        }
        case "save-set": {
          if (E.manualOnly)
            throw Error(
              "Ручную выборку элементов нельзя сохранить как набор моделей."
            );
          const W = await Y();
          if (!W) return;
          const nt = {
            id: crypto.randomUUID(),
            name: W,
            selection: {
              models: [...E.models],
              modelsMode: E.modelsMode,
              conditions: [],
              mode: "all"
            }
          };
          s.sets.push(nt), E.presetId = nt.id, G = !1;
          break;
        }
        case "delete-set": {
          const W = s.sets.find((nt) => nt.id === E.presetId);
          if (!W) throw Error("Выберите сохранённый набор моделей.");
          if (!confirm(`Удалить набор «${W.name}»?`)) return;
          s.sets = s.sets.filter((nt) => nt.id !== W.id);
          for (const nt of s.checks)
            for (const J of [nt.a, nt.b])
              J.presetId === W.id && (J.presetId = void 0);
          G = !1;
          break;
        }
        case "show":
          e.select(
            (c?.elements || []).filter((W) => (y.includeHidden || !W.hidden) && se(W, E)).map((W) => W.id)
          );
          return;
        case "only": {
          const W = e.selected();
          if (!W.length) throw Error("Выделите элементы в 3D-сцене.");
          E.include = W, E.exclude = [], E.manualOnly = !0;
          break;
        }
        case "include": {
          const W = e.selected();
          if (!W.length) throw Error("Выделите элементы в 3D-сцене.");
          E.include = [.../* @__PURE__ */ new Set([...E.include, ...W])], E.exclude = E.exclude.filter((nt) => !W.includes(nt));
          break;
        }
        case "exclude": {
          const W = e.selected();
          if (!W.length) throw Error("Выделите элементы в 3D-сцене.");
          E.exclude = [.../* @__PURE__ */ new Set([...E.exclude, ...W])], E.include = E.include.filter((nt) => !W.includes(nt));
          break;
        }
        case "reset":
          E.manualOnly = !1, E.include = [], E.exclude = [];
      }
      G ? it() : R(), V(), d("content").scrollTop = q;
      return;
    }
    if (g?.id === "prev-page" && (b--, rt()), g?.id === "next-page" && (b++, rt()), g?.id === "show-markers" && (S = !S, g.textContent = S ? "● Знаки включены" : "○ Знаки выключены", g.setAttribute("aria-checked", String(S)), Nt()), g?.id === "bulk") {
      const D = d("bulk-state").value;
      for (const E of y.results) P.has(E.id) && (E.state = D);
      R(), rt(), pt(), ut(), Nt();
    }
    if (g?.id === "capture-image") {
      const D = y.results.find((E) => E.id === m);
      if (D) {
        M = !1, ot(!0), w("Создание снимка пары");
        try {
          D.image = await e.snapshot(
            D,
            Number(d("distance").value),
            () => M,
            !0
          ), D.imageScope = "pair-ab", D.imageDistance = void 0, R(), pt(), U("Снимок сохранён в результат.");
        } finally {
          z(), ot(!1);
        }
      }
      return;
    }
    if (g?.id === "open-image") {
      const D = y.results.find((E) => E.id === m);
      if (D?.image) {
        const E = document.createElement("dialog");
        E.className = "image-dialog", E.innerHTML = '<button>Закрыть</button><img alt="Снимок коллизии">', E.querySelector("img").src = D.image, E.querySelector("button").onclick = () => {
          E.close(), E.remove();
        }, n.append(E), E.showModal();
      }
      return;
    }
    if (g?.id === "focus" && te(m, !0), g?.id === "previous" || g?.id === "next") {
      const D = At(), E = D.findIndex((q) => q.id === m) + (g.id === "next" ? 1 : -1);
      D[E] && te(D[E].id, !0);
    }
    if (g?.id === "export-html") {
      let D = 0;
      const E = d("selected-only").checked ? y.results.filter((W) => P.has(W.id)) : y.results;
      if (!E.length) throw Error("Нет результатов для отчёта.");
      if (d("report-images").checked) {
        const W = e.view, nt = W?.storeView(), J = Number(d("distance").value);
        M = !1, ot(!0), w("Подготовка снимков отчёта", 0, E.length);
        try {
          await e.captureWorkspace(async () => {
            let X = 0;
            for (const ft of E) {
              if (M)
                throw Error(
                  "Подготовка отчёта отменена. Уже полученные снимки сохранены."
                );
              w(
                "Подготовка снимков отчёта",
                X,
                E.length
              ), U("Подготовка снимков: " + (X + 1) + " / " + E.length);
              const mt = ft.imageScope !== "pair-ab" || ft.imageDistance !== void 0 && ft.imageDistance !== J;
              if (!ft.image || mt) {
                if (ft.state === "resolved" && !e.canLocate(ft)) {
                  X++;
                  continue;
                }
                try {
                  ft.image = await e.snapshot(ft, J, () => M), ft.imageScope = "pair-ab", ft.imageDistance = J, R();
                } catch (gt) {
                  if (M || !e.isCurrent()) throw gt;
                  D++;
                }
              }
              X++, w("Подготовка снимков отчёта", X, E.length);
            }
          });
        } finally {
          if (W && e.isCurrent()) {
            const X = y.results.find((ft) => ft.id === m);
            if (X)
              try {
                e.focus(X, J, !1);
              } catch {
              }
            nt && W.restoreView(nt);
          }
          z(), ot(!1);
        }
      }
      const q = d("report-images").checked ? E.map(
        (W) => W.imageScope === "pair-ab" ? W : { ...W, image: void 0 }
      ) : E.map((W) => ({ ...W, image: void 0 })), G = mi(y, q, i?.projectId);
      Ke(G.archiveName, G.blob), U(
        "Отчёт подготовлен. Результатов: " + E.length + "; со снимками: " + q.filter((W) => W.image).length + "." + (D ? ` Не удалось создать снимков: ${D}; эти строки включены без изображения.` : ""),
        D > 0
      );
    }
    const j = h.closest("[data-result]");
    j && !h.closest("input") && !window.getSelection()?.toString() && te(j.dataset.result);
  }), d("content").ondblclick = (p) => {
    const h = p.target, g = h.closest("[data-result]");
    g && !h.closest("input") && Z(() => te(g.dataset.result, !0));
  };
  let Lt = !1;
  const Ft = setInterval(async () => {
    if (!(x || Lt)) {
      Lt = !0;
      try {
        await Q() ? (d("model-count").textContent = "Модели не прочитаны", U(
          s.checks.length ? "Открыт другой проект. Показаны его проверки; обновите модели." : "Открыт другой проект. Для него ещё нет проверок."
        ), x || V()) : c && !e.isCurrent() && (c = void 0, e.clear(), d("model-count").textContent = "3D-окно изменилось", U("Активное 3D-окно изменилось. Обновите модели."), x || V());
      } finally {
        Lt = !1;
      }
    }
  }, 1500);
  V(), r && U("Не удалось открыть папку проверок: " + r, !0);
  const Qt = Ri(t, () => {
    $ = !0, e.isCurrent() && Nt();
  }, () => {
    $ = !1, clearTimeout(B), F++, e.clear();
  });
  return () => {
    Qt(), a(), clearInterval(Ft), clearTimeout(A), I && et(), clearTimeout(B), F++, M = !0, L?.(), N?.terminate(), e.clear();
  };
}
var Re = /* @__PURE__ */ ((t) => (t.object = "object", t.drawing = "drawing", t.table = "table", t.record = "record", t.textStyle = "textstyle", t.textStyleTable = "textstyles", t.linetype = "linetype", t.linetypeTable = "linetypes", t.layer = "layer", t.layerTable = "layers", t.block = "block", t.blockTable = "blocks", t.layout = "layout", t.layoutTable = "layouts", t.type = "type", t.typeTable = "types", t.material = "material", t.materialTable = "materials", t.geometry = "geometry", t.geometryTable = "geometries", t.group = "group", t.groupTable = "groups", t.attachment = "attachment", t.attachmentTable = "attachments", t.entities = "entities", t.entity = "entity", t.line = "l", t.solid = "s", t.insert = "i", t.polyline = "p", t.circle = "c", t.arc = "a", t.polyline3d = "p3", t.proxy = "x", t.text = "t", t.mtext = "mt", t.wipeout = "w", t.model3d = "g", t.alignment = "al", t))(Re || {});
const Te = () => new Promise((t) => requestAnimationFrame(() => t()));
function En(t) {
  const { width: e, height: n } = t.camera, a = Array.from(document.querySelectorAll("canvas")).filter(
    (i) => {
      const r = i.getBoundingClientRect();
      return r.width > 100 && r.height > 100 && i.width > 0 && i.height > 0 && getComputedStyle(i).visibility !== "hidden" && (Math.abs(r.width - e) < 4 && Math.abs(r.height - n) < 4 || Math.abs(i.width - e) < 4 && Math.abs(i.height - n) < 4);
    }
  );
  if (!a.length)
    throw Error(
      "Снимок 3D-окна недоступен: откройте одно видимое окно модели."
    );
  const o = a[0].getBoundingClientRect();
  if (a.some((i) => {
    const r = i.getBoundingClientRect();
    return Math.abs(r.x - o.x) > 4 || Math.abs(r.y - o.y) > 4;
  }))
    throw Error(
      "Открыто несколько подходящих 3D-окон. Оставьте одно окно для снимка."
    );
  return { candidates: a, rect: o };
}
async function Gi(t) {
  await Te(), t.repaint();
  const { candidates: e, rect: n } = En(t), a = document.createElement("canvas");
  a.width = Math.max(1, Math.round(n.width * devicePixelRatio)), a.height = Math.max(1, Math.round(n.height * devicePixelRatio)), Object.assign(a.style, {
    position: "fixed",
    left: `${n.left}px`,
    top: `${n.top}px`,
    width: `${n.width}px`,
    height: `${n.height}px`,
    zIndex: "2147483646",
    pointerEvents: "none"
  });
  const o = a.getContext("2d");
  for (const i of e)
    o.drawImage(i, 0, 0, a.width, a.height);
  return document.body.append(a), async () => {
    t.repaint(), await Te(), a.remove();
  };
}
async function Bi(t, e) {
  if (await Te(), e()) throw Error("Подготовка снимков отменена.");
  const { candidates: n } = En(t), a = document.createElement("canvas"), o = Math.min(1, 1280 / n[0].width);
  a.width = Math.round(n[0].width * o), a.height = Math.round(n[0].height * o);
  const i = a.getContext("2d");
  i.fillStyle = "#20242b", i.fillRect(0, 0, a.width, a.height), t.repaint();
  for (const r of n)
    i.drawImage(r, 0, 0, a.width, a.height);
  try {
    return a.toDataURL("image/jpeg", 0.82);
  } catch {
    throw Error("Браузер запретил чтение изображения 3D-окна.");
  }
}
const Pe = "nashepo.checks.points", ln = "nashepo.checks.highlight";
function cn(t) {
  let e = performance.now();
  return async () => {
    if (t()) throw Error("Операция отменена.");
    performance.now() - e >= 16 && (await new Promise((n) => setTimeout(n, 0)), e = performance.now());
  };
}
function ye(t, e, n, a = 0) {
  if (a > 12 || t == null) return;
  if (typeof t != "object") {
    n[e] = String(t);
    return;
  }
  if (Array.isArray(t)) {
    t.forEach((i, r) => ye(i, `${e}[${r}]`, n, a + 1));
    return;
  }
  const o = t;
  if ("$value" in o) {
    ye(o.$value, e, n, a + 1);
    return;
  }
  for (const [i, r] of Object.entries(o))
    i.startsWith("$") || ye(r, e ? `${e}.${i}` : i, n, a + 1);
}
function Zi(t) {
  const e = t.vertices.length / 3, n = (r) => Number.isFinite(t.vertices[r * 3]) && Number.isFinite(t.vertices[r * 3 + 1]) && Number.isFinite(t.vertices[r * 3 + 2]), a = (r) => {
    const l = t.indices[r], s = t.indices[r + 1], c = t.indices[r + 2];
    return l < e && s < e && c < e && l !== s && s !== c && c !== l && n(l) && n(s) && n(c);
  };
  let o = 0;
  for (let r = 0; r < t.indices.length; r += 3) a(r) && (o += 3);
  if (o === t.indices.length) return t.indices;
  const i = new Uint32Array(o);
  for (let r = 0, l = 0; r < t.indices.length; r += 3)
    a(r) && (i[l++] = t.indices[r], i[l++] = t.indices[r + 1], i[l++] = t.indices[r + 2]);
  return i;
}
const Ne = (t) => /\.wdx(?:[?#].*)?$/i.test(t);
class Wi {
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
      const a = this.ctx.manager.panelBar;
      a?.visible && (this.captureLayout = {
        panel: a,
        size: a.size,
        maximized: a.maximized
      }, a.maximized = !1, a.size = Math.min(a.size, 120), await new Promise(
        (o) => requestAnimationFrame(() => requestAnimationFrame(() => o()))
      ));
    }
    try {
      return await e();
    } finally {
      if (this.captureDepth--, n && this.captureLayout) {
        const { panel: a, size: o, maximized: i } = this.captureLayout;
        this.captureLayout = void 0, a.size = o, a.maximized = i, await new Promise(
          (r) => requestAnimationFrame(() => requestAnimationFrame(() => r()))
        );
      }
    }
  }
  async scan(e, n, a) {
    const o = this.app, i = this.view, r = o?.model;
    if (!i || !r?.layouts || !r.attachments)
      throw Error(
        "Откройте проект Топоматик 360 с IFC или SMDX и сделайте его 3D-окно активным."
      );
    const l = [], s = /* @__PURE__ */ new Set(), c = [], f = [], u = [], m = /* @__PURE__ */ new Map(), b = /* @__PURE__ */ new Set();
    let x = 2166136261;
    const M = cn(
      () => n() || o !== this.app || i !== this.view
    );
    let N = -1 / 0;
    const S = (A) => {
      for (let $ = 0; $ < A.length; $++)
        x = Math.imul(x ^ A.charCodeAt($), 16777619);
    }, I = async (A, $, P) => {
      if (b.has(A)) return;
      b.add(A);
      const L = A.layers.layer0?.modelName || $, B = $, F = Ne(L) || Ne(B), k = (U, w) => {
        s.has(U) || (s.add(U), l.push({ id: U, name: w }));
      };
      F || k(B, L);
      const d = !F && (!a || a.has(B)), v = [];
      (d || F) && A.layouts.model?.walk((U) => (U.type === Re.model3d ? v.push(U) : U.type === Re.insert && c.push(`${L}: вставка блока не включена в расчёт.`), !1));
      const C = /* @__PURE__ */ new Map();
      for (const U of v) {
        let w = U.layer, z = "";
        for (; w; ) {
          if (w.modelName && !Ne(w.modelName)) {
            z = w.modelName;
            break;
          }
          w = w.layer;
        }
        const Z = F ? z || "Модель проекта" : L, Y = F ? z || `${$}/#model` : B;
        if (F && k(Y, Z), a && !a.has(Y)) continue;
        const lt = JSON.stringify([
          U.layer?.UUID || "",
          U.$id || U.$path
        ]);
        C.set(JSON.stringify([Y, lt]), {
          key: lt,
          objects: [U],
          modelId: Y,
          modelName: Z
        });
      }
      let O = 0;
      for (const U of C.values()) {
        const { key: w, objects: z, modelId: Z, modelName: Y } = U;
        if (n()) throw Error("Чтение моделей отменено.");
        if (o !== this.app || i !== this.view)
          throw Error(
            "Активный проект изменился. Запустите чтение моделей заново."
          );
        const lt = z[0].layer, et = {};
        try {
          if (lt) {
            const ut = [];
            let jt = lt;
            for (; jt && ut.length < 64; )
              ut.unshift(jt), jt = jt.layer;
            for (const V of ut)
              ye(V.typedProperties(), "", et), V.typed?.name && (et.Тип = V.typed.name);
          }
        } catch {
          c.push(`${Y} / ${w}: часть свойств недоступна.`);
        }
        const Pt = et["ifc.id"] || Object.entries(et).find(
          ([ut]) => /(^|\.)(globalid|ifcguid|guid)$/i.test(ut)
        )?.[1] || "", R = lt?.name || z[0].$id || "Элемент", Q = JSON.stringify([Z, w]);
        Object.assign(et, {
          Модель: Y,
          Имя: R,
          GUID: Pt,
          Объект: lt?.UUID || w
        });
        const at = {
          min: [1 / 0, 1 / 0, 1 / 0],
          max: [-1 / 0, -1 / 0, -1 / 0]
        };
        let it = !0, bt = !1, ct = 0;
        for (const ut of z) {
          it &&= ut.isClosed;
          for (const jt of Object.values(ut.meshes)) {
            const V = jt.geometry;
            if (!V || V.indices.length % 3) {
              bt = !0;
              continue;
            }
            it &&= jt.isClosed;
            for (let pt = 0; pt < V.vertices.length; pt += 3) {
              const st = [
                V.vertices[pt],
                V.vertices[pt + 1],
                V.vertices[pt + 2]
              ];
              if (Math3d.mat4.mulv3(st, ut.matrix, st), !st.every(Number.isFinite)) {
                bt = !0;
                continue;
              }
              for (let dt = 0; dt < 3; dt++)
                at.min[dt] = Math.min(at.min[dt], st[dt]), at.max[dt] = Math.max(at.max[dt], st[dt]);
              if (S(st.join(",")), pt % 6e4 === 0 && (performance.now() - N > 200 && (N = performance.now(), e(
                "Индексирование: " + Y + " · " + u.length + " элементов"
              )), await M(), n()))
                throw Error("Чтение моделей отменено.");
            }
            const xt = V.vertices.length / 3, rt = (pt) => Number.isFinite(V.vertices[pt * 3]) && Number.isFinite(V.vertices[pt * 3 + 1]) && Number.isFinite(V.vertices[pt * 3 + 2]);
            for (let pt = 0; pt < V.indices.length; pt += 3) {
              const st = V.indices[pt], dt = V.indices[pt + 1], Dt = V.indices[pt + 2];
              if (x = Math.imul(x ^ st, 16777619), x = Math.imul(x ^ dt, 16777619), x = Math.imul(x ^ Dt, 16777619), st < xt && dt < xt && Dt < xt && st !== dt && dt !== Dt && Dt !== st && rt(st) && rt(dt) && rt(Dt) ? ct++ : bt = !0, pt % 15e4 === 0 && (await M(), n()))
                throw Error("Чтение моделей отменено.");
            }
          }
        }
        if (bt || !ct) {
          if (ct || O++, !ct) continue;
          it = !1;
        }
        const At = {
          id: Q,
          name: R,
          model: Y,
          modelId: Z,
          guid: Pt,
          properties: et,
          // An IFC layer can be disabled for editing while it is still drawn
          // in the 3D view. Only the visibility flag and a hidden attachment
          // should exclude it from a normal clash check.
          hidden: P || !!lt?.resolveHidden(),
          triangles: new Float64Array(0),
          triangleCount: ct,
          closed: it,
          bounds: at
        };
        S(JSON.stringify([Q, et, At.hidden])), u.push(At), m.set(Q, z);
      }
      O && c.push(
        `${L}: пропущено элементов без треугольной геометрии — ${O}.`
      );
      const T = [];
      A.attachments.forEach((U) => {
        T.push(U);
      });
      for (const U of T) {
        const w = U.name || U.uri || U.$id, z = w || "Подключённая модель", Z = `${$}/${w || "attachment"}`;
        U.model || k(Z, z), U.model ? await I(
          U.model,
          Z,
          P || U.hidden
        ) : (!a || a.has(Z)) && f.push(
          `${z}: модель не загружена. Откройте её перед расчётом.`
        );
      }
    };
    if (await I(r, r.layers.layer0?.modelName || "Проект", !1), !u.length && (!a || a.size > 0)) {
      const A = a ? [...a].filter(($) => !s.has($)) : [];
      throw Error(
        A.length ? `Сохранённая выборка ссылается на модели, которых нет в текущем составе: ${A.join(", ")}. Обновите список моделей.` : l.length ? "В выбранных моделях не найдены 3D-элементы с доступной геометрией. Проверьте, что модели загружены, и выберите нужные файлы." : "В открытом проекте не обнаружены IFC/SMDX-модели. Проверьте состав подключений проекта."
      );
    }
    return this.clear(), this.refs = m, this.metadata = new Map(u.map((A) => [A.id, A])), this.scannedApp = o, this.scannedView = i, {
      elements: u,
      fingerprint: `${u.length}:${x >>> 0}`,
      warnings: [...new Set(c)],
      blockers: [...new Set(f)],
      models: l,
      indexedModelIds: l.filter((A) => !a || a.has(A.id)).map((A) => A.id)
    };
  }
  async geometry(e, n) {
    const a = cn(() => n() || !this.isCurrent());
    if (!this.isCurrent()) throw Error("Активная модель изменилась.");
    const o = this.metadata.get(e), i = this.refs.get(e);
    if (!o || !i) throw Error("Элемент отсутствует.");
    const r = i.flatMap(
      (b) => Object.values(b.meshes).flatMap((x) => {
        const M = x.geometry;
        if (!M || M.indices.length % 3) return [];
        const N = Zi(M);
        return N.length ? [{ object: b, g: M, indices: N }] : [];
      })
    );
    let l = 0, s = 0;
    for (const { g: b, indices: x } of r) {
      if (!b) throw Error("Геометрия недоступна.");
      l += b.vertices.length, s += x.length;
    }
    const c = new Float64Array(l), f = new Uint32Array(s);
    let u = 0, m = 0;
    for (const { object: b, g: x, indices: M } of r) {
      if (!x) throw Error("Геометрия недоступна.");
      for (let N = 0; N < x.vertices.length; N += 3) {
        const S = [x.vertices[N], x.vertices[N + 1], x.vertices[N + 2]];
        if (Math3d.mat4.mulv3(S, b.matrix, S), c.set(S, u + N), N % 6e4 === 0 && (await a(), n() || !this.isCurrent()))
          throw Error("Чтение геометрии отменено.");
      }
      for (let N = 0; N < M.length; N++)
        if (f[m + N] = u / 3 + M[N], N % 15e4 === 0 && (await a(), n()))
          throw Error("Чтение геометрии отменено.");
      u += x.vertices.length, m += M.length;
    }
    return { ...o, vertices: c, indices: f };
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
      const e = this.pointView.annotations.get(Pe);
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
    const o = e.point, i = this.view;
    i.camera?.id !== "3d" && i.setCameraType("3d"), i.pauseAnimation?.(), this.highlight(e), this.select([e.a.id, e.b.id]);
    const r = [-0.65, 0.65, -0.394], l = Math.hypot(...r);
    r.forEach((s, c) => r[c] = s / l), i.lookAt(
      o.map((s, c) => s - r[c] * n),
      r,
      [0, 0, 1],
      a,
      o
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
      ({ id: r, color: l }, s) => [...new Set(this.refs.get(r) || [])].flatMap(
        (c) => Object.values(c.meshes).flatMap((f) => {
          const u = f.geometry;
          if (!u) return [];
          const m = {
            // SDK fields may be prototype getters rather than own properties.
            uuid: `${ln}.${s}.${u.uuid}`,
            vertices: u.vertices,
            indices: u.indices,
            normals: u.normals,
            bounds: u.bounds,
            colors: new Uint32Array(u.vertices.length / 3).fill(l)
          };
          return [{ obj: c, geometry: m, color: l }];
        })
      )
    ), this.overlay) {
      this.overlay.layer.visible = !0, n.invalidate(!0);
      return;
    }
    let o;
    o = {
      id: ln,
      order: 1e4,
      visible: !0,
      paint: () => {
      },
      paint3d: (r) => {
        const l = r.color, s = r.rasterizer.material;
        r.rasterizer.material = void 0;
        try {
          for (const { obj: c, geometry: f, color: u } of this.overlaySurfaces) {
            r.color = u, r.pushMatrix();
            try {
              r.multMatrix(c.matrix), r.mesh(f);
            } finally {
              r.popMatrix();
            }
          }
        } catch (c) {
          o.visible = !1, this.overlayError = new Error(
            "Не удалось отрисовать подсветку пары: " + (c instanceof Error ? c.message : String(c))
          );
        } finally {
          r.color = l, r.rasterizer.material = s;
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
  async snapshot(e, n, a, o = !1, i = !0) {
    const r = () => this.snapshotInWorkspace(e, n, a, o);
    return i ? this.captureWorkspace(r) : r();
  }
  async snapshotInWorkspace(e, n, a, o = !1) {
    if (!this.isCurrent())
      throw Error("Обновите модели перед созданием снимков.");
    if (!this.canLocate(e))
      throw Error("Элементы результата отсутствуют в открытых моделях.");
    const i = this.view, r = i.layer.drawing;
    if (!r)
      throw Error(
        "Слой моделей недоступен для снимка пары. Откройте 3D-окно проекта."
      );
    const l = r.visible, s = i.annotations.visible, c = new Set(i.layer.selectedObjects());
    let f;
    try {
      o ? this.highlight(e) : this.focus(e, n, !1), i.pauseAnimation(), f = await Gi(i), i.layer.clearSelected(), r.visible = !1, i.annotations.visible = !1, i.invalidate();
      const u = await Bi(
        i,
        () => a() || !this.isCurrent()
      );
      if (this.overlayError) throw this.overlayError;
      return u;
    } finally {
      r.visible = l, i.annotations.visible = s, i.layer.clearSelected(), i.layer.selectObjects((u) => c.has(u), !0), i.invalidate(), await f?.();
    }
  }
  markers(e, n, a, o) {
    if (!this.isCurrent()) return;
    const i = this.view;
    this.pointView && this.pointView !== i && this.clear();
    const r = i.annotations.get(Pe);
    if (r && i.annotations.release(r), this.pointView = i, !a) {
      i.invalidate();
      return;
    }
    const l = i.annotations.create(Pe, 1e4), s = e.filter((c) => c.id !== n).concat(e.filter((c) => c.id === n));
    for (const c of s.slice(-3e3)) {
      if (c.state === "resolved") continue;
      const [f, u, m] = c.point, b = c.id === n, x = c.state === "excluded" ? "#78818c" : c.state === "approved" || c.state === "reviewed" ? "#28b94b" : "#e1372d", M = b ? "#f2c94c" : x, N = () => o(c.id), S = [
        { type: "line", a: [f, u, m], b: [f, u, m + 1], color: M, width: 5 },
        {
          type: "polyline",
          points: [
            [f - 0.65, u, m + 1],
            [f + 0.65, u, m + 1],
            [f, u, m + 2.2],
            [f - 0.65, u, m + 1]
          ],
          color: M,
          fillColor: x,
          width: b ? 5 : 2
        },
        {
          type: "line",
          a: [f, u - 0.01, m + 1.85],
          b: [f, u - 0.01, m + 1.4],
          color: "#ffffff",
          width: 4
        },
        {
          type: "line",
          a: [f, u - 0.01, m + 1.22],
          b: [f, u - 0.01, m + 1.27],
          color: "#ffffff",
          width: 4
        }
      ];
      l.add({
        id: c.id,
        type: "shaped",
        shapes: S,
        activeShapes: S,
        activateCommand: N,
        dblCommand: N
      }), b && l.add({
        id: c.id + ":label",
        type: "simple",
        position: [f, u, m + 2.35],
        label: `${c.a.name} × ${c.b.name}`,
        labelBackground: "#f2c94c",
        labelColor: "#171717",
        activateCommand: N
      });
    }
    i.invalidate();
  }
}
let dn, Oe, fn;
const Yi = {
  open(t) {
    t.manager.revealView("nashepo.collisionfinder360/checks_panel");
  },
  async mount(t) {
    const e = t.el;
    if (!e) return;
    if (Oe && fn === t.manager) {
      e.replaceChildren(Oe);
      return;
    }
    dn?.();
    const n = document.createElement("div");
    n.style.height = "100%", e.replaceChildren(n), Oe = n, fn = t.manager, dn = await Hi(n, new Wi(t));
  }
};
export {
  Yi as default
};
