const T = {
  new: "Новый",
  active: "Активный",
  reviewed: "Проверенный",
  approved: "Подтверждённый",
  resolved: "Исправленный",
  excluded: "Исключённый"
}, de = () => ({
  models: [],
  conditions: [],
  mode: "all",
  include: [],
  exclude: []
}), ge = () => ({
  id: crypto.randomUUID(),
  name: "Новая проверка",
  type: "intersection",
  a: de(),
  b: de(),
  precision: 0.1,
  touching: !1,
  ignoreSameModel: !1,
  ignoreSameGroup: !1,
  equalProperty: "",
  includeHidden: !1,
  results: [],
  status: "new",
  warnings: []
}), pe = ({
  triangles: e,
  closed: t,
  bounds: i,
  ...n
}) => n;
function ne(e, t) {
  if (t.exclude.includes(e.id)) return !1;
  if (t.include.includes(e.id)) return !0;
  if (t.models.length && !t.models.includes(e.modelId)) return !1;
  const i = (n) => {
    const s = e.properties[n.field], r = (s ?? "").toLocaleLowerCase(), d = n.value.toLocaleLowerCase();
    switch (n.op) {
      case "exists":
        return s !== void 0 && s !== "";
      case "eq":
        return s !== void 0 && r === d;
      case "ne":
        return s !== void 0 && r !== d;
      case "contains":
        return s !== void 0 && r.includes(d);
      case "gt":
        return s !== void 0 && s.trim() !== "" && Number(s.replace(",", ".")) > Number(n.value.replace(",", "."));
      case "lt":
        return s !== void 0 && s.trim() !== "" && Number(s.replace(",", ".")) < Number(n.value.replace(",", "."));
    }
  };
  return !t.conditions.length || (t.mode === "all" ? t.conditions.every(i) : t.conditions.some(i));
}
const xe = (e) => JSON.stringify([
  e.type,
  e.a,
  e.b,
  e.precision,
  e.touching,
  e.ignoreSameModel,
  e.ignoreSameGroup,
  e.equalProperty,
  e.includeHidden
]), ye = (e, t) => JSON.stringify([e, t].sort());
function ve(e, t, i) {
  const n = new Map(e.map((r) => [r.id, r])), s = t.map((r) => {
    const d = n.get(r.id);
    return n.delete(r.id), {
      ...r,
      note: d?.note ?? "",
      assignee: d?.assignee ?? "",
      firstSeen: d?.firstSeen ?? i,
      lastSeen: i,
      state: !d || d.state === "resolved" ? "new" : d.state === "new" ? "active" : d.state
    };
  });
  for (const r of n.values())
    s.push({
      ...r,
      state: r.state === "excluded" ? "excluded" : "resolved"
    });
  return s;
}
function we(e) {
  const t = JSON.parse(e);
  if (t?.format !== "nashepo.checks" || t.version !== 1 || !Array.isArray(t.checks))
    throw Error("Это не файл проекта проверок НашеПО.");
  const i = /* @__PURE__ */ new Set();
  for (const n of t.checks) {
    if (!n || typeof n.id != "string" || i.has(n.id) || typeof n.name != "string" || !["intersection", "duplicates"].includes(n.type) || !Number.isFinite(n.precision) || n.precision < 1e-3 || n.precision > 100 || !Array.isArray(n.results))
      throw Error("Некорректные параметры проверки.");
    if (i.add(n.id), ![
      "touching",
      "ignoreSameModel",
      "ignoreSameGroup",
      "includeHidden"
    ].every(
      (s) => typeof n[s] == "boolean"
    ) || typeof n.equalProperty != "string" || n.modelsAtRun !== void 0 && (!Array.isArray(n.modelsAtRun) || !n.modelsAtRun.every((s) => typeof s == "string")))
      throw Error("Некорректные правила проверки.");
    for (const s of [n.a, n.b])
      if (!s || !["all", "any"].includes(s.mode) || ![s.models, s.include, s.exclude].every(
        (r) => Array.isArray(r) && r.every((d) => typeof d == "string")
      ) || !Array.isArray(s.conditions) || !s.conditions.every(
        (r) => r && typeof r.field == "string" && typeof r.value == "string" && ["eq", "ne", "contains", "exists", "gt", "lt"].includes(r.op)
      ))
        throw Error("Некорректная выборка.");
    for (const s of n.results) {
      if (!s || typeof s.id != "string" || !Object.hasOwn(T, s.state) || !Array.isArray(s.point) || s.point.length !== 3 || !s.point.every(Number.isFinite))
        throw Error("Некорректный результат.");
      for (const r of [s.a, s.b])
        if (!r || !["id", "name", "model", "modelId", "guid"].every(
          (d) => typeof r[d] == "string"
        ) || !r.properties || typeof r.properties != "object")
          throw Error("Некорректный элемент результата.");
    }
    n.status = "stale", n.warnings = [];
  }
  return t;
}
const q = (e, t) => [e[0] - t[0], e[1] - t[1], e[2] - t[2]], le = (e, t, i = 1) => [
  e[0] + t[0] * i,
  e[1] + t[1] * i,
  e[2] + t[2] * i
], F = (e, t) => e[0] * t[0] + e[1] * t[1] + e[2] * t[2], _ = (e, t) => [
  e[1] * t[2] - e[2] * t[1],
  e[2] * t[0] - e[0] * t[2],
  e[0] * t[1] - e[1] * t[0]
], P = (e) => Math.hypot(...e), K = (e, t) => [0, 3, 6].map((i) => [
  e.triangles[t * 9 + i],
  e.triangles[t * 9 + i + 1],
  e.triangles[t * 9 + i + 2]
]);
function ce(e) {
  const t = [1 / 0, 1 / 0, 1 / 0], i = [-1 / 0, -1 / 0, -1 / 0];
  for (let n = 0; n < e.length; n++) {
    const s = n % 3;
    t[s] = Math.min(t[s], e[n]), i[s] = Math.max(i[s], e[n]);
  }
  return { min: t, max: i };
}
const he = (e, t, i) => e.min.every((n, s) => n <= t.max[s] + i && e.max[s] >= t.min[s] - i);
function se(e, t) {
  const i = {
    min: [1 / 0, 1 / 0, 1 / 0],
    max: [-1 / 0, -1 / 0, -1 / 0]
  };
  for (const h of t)
    for (let u = 0; u < 9; u++) {
      const p = u % 3, m = e.triangles[h * 9 + u];
      i.min[p] = Math.min(i.min[p], m), i.max[p] = Math.max(i.max[p], m);
    }
  if (t.length <= 12) return { ...i, ids: t };
  const n = i.max.map((h, u) => h - i.min[u]), s = n.indexOf(Math.max(...n)), r = (h) => e.triangles[h * 9 + s] + e.triangles[h * 9 + s + 3] + e.triangles[h * 9 + s + 6];
  t.sort((h, u) => r(h) - r(u));
  const d = t.length >> 1;
  return {
    ...i,
    left: se(e, t.slice(0, d)),
    right: se(e, t.slice(d))
  };
}
function* ee(e, t, i) {
  he(e, t, i) && (e.ids ? yield* e.ids : (yield* ee(e.left, t, i), yield* ee(e.right, t, i)));
}
function ae(e, t, i, n) {
  const s = q(t, e), r = q(i[1], i[0]), d = q(i[2], i[0]), h = _(s, d), u = F(r, h);
  if (Math.abs(u) <= 1e-12 * P(s) * P(r) * P(d)) return;
  const p = 1 / u, m = q(e, i[0]), g = F(m, h) * p, x = _(m, r), M = F(s, x) * p, E = F(d, x) * p, v = n / Math.max(P(r), P(d), n);
  if (g >= -v && M >= -v && g + M <= 1 + v && E >= -v && E <= 1 + v)
    return le(e, s, Math.max(0, Math.min(1, E)));
}
function ke(e, t, i, n) {
  const s = i.map(Math.abs).indexOf(Math.max(...i.map(Math.abs))), r = [0, 1, 2].filter((u) => u !== s), d = (u, p, m) => (p[r[0]] - u[r[0]]) * (m[r[1]] - u[r[1]]) - (p[r[1]] - u[r[1]]) * (m[r[0]] - u[r[0]]), h = (u, p) => {
    const m = p.map((g, x) => d(g, p[(x + 1) % 3], u));
    return m.every((g) => g >= -n * P(i)) || m.every((g) => g <= n * P(i));
  };
  for (const u of e) if (h(u, t)) return u;
  for (const u of t) if (h(u, e)) return u;
  for (let u = 0; u < 3; u++)
    for (let p = 0; p < 3; p++) {
      const m = e[u], g = e[(u + 1) % 3], x = t[p], M = t[(p + 1) % 3], E = q(g, m), v = q(M, x), c = E[r[0]] * v[r[1]] - E[r[1]] * v[r[0]];
      if (Math.abs(c) < 1e-18) continue;
      const C = q(x, m), y = (C[r[0]] * v[r[1]] - C[r[1]] * v[r[0]]) / c, b = (C[r[0]] * E[r[1]] - C[r[1]] * E[r[0]]) / c;
      if (y >= 0 && y <= 1 && b >= 0 && b <= 1) return le(m, E, y);
    }
}
function Me(e, t, i, n) {
  const s = _(q(e[1], e[0]), q(e[2], e[0])), r = _(q(t[1], t[0]), q(t[2], t[0])), d = P(s), h = P(r);
  if (d < 1e-20 || h < 1e-20) return;
  const u = t.map((m) => F(q(m, e[0]), s) / d), p = e.map((m) => F(q(m, t[0]), r) / h);
  if (!(u.every((m) => m > i) || u.every((m) => m < -i) || p.every((m) => m > i) || p.every((m) => m < -i))) {
    if (u.every((m) => Math.abs(m) <= i) && p.every((m) => Math.abs(m) <= i))
      return n ? ke(e, t, s, i) : void 0;
    if (!(!n && (!(Math.min(...u) < -i && Math.max(...u) > i) || !(Math.min(...p) < -i && Math.max(...p) > i))))
      for (let m = 0; m < 3; m++) {
        const g = ae(e[m], e[(m + 1) % 3], t, i);
        if (g) return g;
        const x = ae(t[m], t[(m + 1) % 3], e, i);
        if (x) return x;
      }
  }
}
function je(e, t, i) {
  const n = q(t[1], t[0]), s = q(t[2], t[0]), r = _(n, s), d = P(r);
  if (d < 1e-20 || Math.abs(F(q(e, t[0]), r)) / d > i) return !1;
  const h = q(e, t[0]), u = F(n, n), p = F(n, s), m = F(s, s), g = F(h, n), x = F(h, s), M = u * m - p * p;
  if (Math.abs(M) < 1e-30) return !1;
  const E = (g * m - x * p) / M, v = (x * u - g * p) / M, c = i / Math.max(P(n), P(s), i);
  return E >= -c && v >= -c && E + v <= 1 + c;
}
function ie(e, t, i, n) {
  if (!t.closed || e.some((g, x) => g <= t.bounds.min[x] + n || g >= t.bounds.max[x] - n))
    return !1;
  for (const g of ee(i, { min: e, max: e }, n))
    if (je(e, K(t, g), n)) return !1;
  const s = [1, 0.371390676, 0.52999894], r = P(q(t.bounds.max, t.bounds.min)) * 3 + 1, d = le(e, s, r), h = [], u = ce([...e, ...d]);
  for (const g of ee(i, u, n)) {
    const x = ae(e, d, K(t, g), n);
    if (x) {
      const M = P(q(x, e));
      M > n && h.push(M);
    }
  }
  h.sort((g, x) => g - x);
  let p = 0, m = -1 / 0;
  for (const g of h)
    g - m > n * 2 && (p++, m = g);
  return p % 2 === 1;
}
async function Se(e, t, i, n) {
  const s = t.precision / 1e3;
  if (!Number.isFinite(s) || s <= 0)
    throw Error("Точность расчёта должна быть положительным числом.");
  const r = e.filter((y) => t.includeHidden || !y.hidden), d = r.filter((y) => ne(y, t.a)), h = r.filter((y) => ne(y, t.b));
  if (!d.length || !h.length)
    throw Error("Выборка А или Б пуста. Проверьте модели и условия.");
  let u = performance.now();
  const p = async () => {
    if (n())
      throw Error("Расчёт отменён. Предыдущие результаты сохранены.");
    performance.now() - u > 16 && (await new Promise((y) => setTimeout(y, 0)), u = performance.now());
  }, m = /* @__PURE__ */ new Map(), g = (y) => {
    let b = m.get(y.id);
    return b || (b = se(
      y,
      Array.from({ length: y.triangles.length / 9 }, (O, Y) => Y)
    ), m.set(y.id, b)), b;
  }, x = /* @__PURE__ */ new Map(), M = async (y) => {
    let b = x.get(y.id);
    if (b !== void 0) return b;
    const O = [];
    for (let Y = 0; Y < y.triangles.length; Y += 9)
      O.push(
        [0, 3, 6].map(
          (N) => [0, 1, 2].map((j) => Math.round(y.triangles[Y + N + j] / s)).join(",")
        ).sort().join(";")
      ), Y % 9e3 === 0 && await p();
    return b = O.sort().join("|"), x.set(y.id, b), b;
  }, E = [], v = /* @__PURE__ */ new Set(), c = h.slice().sort((y, b) => y.bounds.min[0] - b.bounds.min[0]);
  let C = 0;
  for (let y = 0; y < d.length; y++) {
    const b = d[y];
    i({
      phase: "Проверка пар",
      done: y,
      total: d.length,
      found: E.length
    });
    for (const O of c) {
      if (O.bounds.min[0] > b.bounds.max[0] + s) break;
      if (await p(), b.id === O.id || !he(b.bounds, O.bounds, s) || t.ignoreSameModel && b.modelId === O.modelId || t.ignoreSameGroup && b.modelId === O.modelId && b.properties.Объект && b.properties.Объект === O.properties.Объект || t.equalProperty && b.properties[t.equalProperty] !== void 0 && b.properties[t.equalProperty] === O.properties[t.equalProperty])
        continue;
      const Y = ye(b.id, O.id);
      if (v.has(Y)) continue;
      if (v.add(Y), ++C > 2e6)
        throw Error(
          "Слишком много близких пар. Уточните выборки и запустите проверку снова. Предыдущие результаты сохранены."
        );
      let N, j = "surface";
      if (t.type === "duplicates") {
        if (b.triangles.length !== O.triangles.length || b.bounds.min.some(
          ($, R) => Math.abs($ - O.bounds.min[R]) > s || Math.abs(b.bounds.max[R] - O.bounds.max[R]) > s
        ))
          continue;
        await M(b) === await M(O) && (N = b.bounds.min.map(($, R) => ($ + b.bounds.max[R]) / 2), j = "duplicate");
      } else {
        const $ = g(b), R = g(O);
        for (let A = 0; A < b.triangles.length / 9 && !N; A++) {
          const I = K(b, A), Q = ce(I.flat());
          for (const B of ee(R, Q, s)) {
            if (N = Me(I, K(O, B), s, t.touching), N) break;
            await p();
          }
          await p();
        }
        if (!N && b.closed && O.closed) {
          const A = b.bounds.min.map(
            (I, Q) => (I + b.bounds.max[Q]) / 2
          );
          ie(A, b, $, s) && ie(A, O, R, s) && (N = A, j = "contained");
        }
        if (!N) {
          for (const [A, I, Q] of [
            [b, O, R],
            [O, b, $]
          ])
            if (I.closed) {
              for (let B = 0; B < A.triangles.length / 9 && !N; B++) {
                const z = K(A, B), J = z[0].map(
                  (G, V) => (z[0][V] + z[1][V] + z[2][V]) / 3
                );
                for (const G of [z[0], J])
                  if (ie(G, I, Q, s)) {
                    N = G, j = "contained";
                    break;
                  }
                await p();
              }
              if (N) break;
            }
        }
      }
      if (N && (E.push({
        id: Y,
        a: pe(b),
        b: pe(O),
        point: N,
        kind: j,
        state: "new",
        note: "",
        assignee: "",
        firstSeen: "",
        lastSeen: ""
      }), E.length >= 5e4))
        throw Error(
          "Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат."
        );
    }
  }
  return i({
    phase: "Готово",
    done: d.length,
    total: d.length,
    found: E.length
  }), E;
}
const be = `(function(){"use strict";const D=({triangles:t,closed:n,bounds:e,...i})=>i;function Q(t,n){if(n.exclude.includes(t.id))return!1;if(n.include.includes(t.id))return!0;if(n.models.length&&!n.models.includes(t.modelId))return!1;const e=i=>{const o=t.properties[i.field],a=(o??"").toLocaleLowerCase(),u=i.value.toLocaleLowerCase();switch(i.op){case"exists":return o!==void 0&&o!=="";case"eq":return o!==void 0&&a===u;case"ne":return o!==void 0&&a!==u;case"contains":return o!==void 0&&a.includes(u);case"gt":return o!==void 0&&o.trim()!==""&&Number(o.replace(",","."))>Number(i.value.replace(",","."));case"lt":return o!==void 0&&o.trim()!==""&&Number(o.replace(",","."))<Number(i.value.replace(",","."))}};return!n.conditions.length||(n.mode==="all"?n.conditions.every(e):n.conditions.some(e))}const V=(t,n)=>JSON.stringify([t,n].sort()),y=(t,n)=>[t[0]-n[0],t[1]-n[1],t[2]-n[2]],G=(t,n,e=1)=>[t[0]+n[0]*e,t[1]+n[1]*e,t[2]+n[2]*e],b=(t,n)=>t[0]*n[0]+t[1]*n[1]+t[2]*n[2],L=(t,n)=>[t[1]*n[2]-t[2]*n[1],t[2]*n[0]-t[0]*n[2],t[0]*n[1]-t[1]*n[0]],w=t=>Math.hypot(...t),O=(t,n)=>[0,3,6].map(e=>[t.triangles[n*9+e],t.triangles[n*9+e+1],t.triangles[n*9+e+2]]);function R(t){const n=[1/0,1/0,1/0],e=[-1/0,-1/0,-1/0];for(let i=0;i<t.length;i++){const o=i%3;n[o]=Math.min(n[o],t[i]),e[o]=Math.max(e[o],t[i])}return{min:n,max:e}}const U=(t,n,e)=>t.min.every((i,o)=>i<=n.max[o]+e&&t.max[o]>=n.min[o]-e);function H(t,n){const e={min:[1/0,1/0,1/0],max:[-1/0,-1/0,-1/0]};for(const d of n)for(let s=0;s<9;s++){const c=s%3,r=t.triangles[d*9+s];e.min[c]=Math.min(e.min[c],r),e.max[c]=Math.max(e.max[c],r)}if(n.length<=12)return{...e,ids:n};const i=e.max.map((d,s)=>d-e.min[s]),o=i.indexOf(Math.max(...i)),a=d=>t.triangles[d*9+o]+t.triangles[d*9+o+3]+t.triangles[d*9+o+6];n.sort((d,s)=>a(d)-a(s));const u=n.length>>1;return{...e,left:H(t,n.slice(0,u)),right:H(t,n.slice(u))}}function*T(t,n,e){U(t,n,e)&&(t.ids?yield*t.ids:(yield*T(t.left,n,e),yield*T(t.right,n,e)))}function J(t,n,e,i){const o=y(n,t),a=y(e[1],e[0]),u=y(e[2],e[0]),d=L(o,u),s=b(a,d);if(Math.abs(s)<=1e-12*w(o)*w(a)*w(u))return;const c=1/s,r=y(t,e[0]),l=b(r,d)*c,h=L(r,a),M=b(o,h)*c,x=b(u,h)*c,v=i/Math.max(w(a),w(u),i);if(l>=-v&&M>=-v&&l+M<=1+v&&x>=-v&&x<=1+v)return G(t,o,Math.max(0,Math.min(1,x)))}function W(t,n,e,i){const o=e.map(Math.abs).indexOf(Math.max(...e.map(Math.abs))),a=[0,1,2].filter(s=>s!==o),u=(s,c,r)=>(c[a[0]]-s[a[0]])*(r[a[1]]-s[a[1]])-(c[a[1]]-s[a[1]])*(r[a[0]]-s[a[0]]),d=(s,c)=>{const r=c.map((l,h)=>u(l,c[(h+1)%3],s));return r.every(l=>l>=-i*w(e))||r.every(l=>l<=i*w(e))};for(const s of t)if(d(s,n))return s;for(const s of n)if(d(s,t))return s;for(let s=0;s<3;s++)for(let c=0;c<3;c++){const r=t[s],l=t[(s+1)%3],h=n[c],M=n[(c+1)%3],x=y(l,r),v=y(M,h),_=x[a[0]]*v[a[1]]-x[a[1]]*v[a[0]];if(Math.abs(_)<1e-18)continue;const E=y(h,r),m=(E[a[0]]*v[a[1]]-E[a[1]]*v[a[0]])/_,f=(E[a[0]]*x[a[1]]-E[a[1]]*x[a[0]])/_;if(m>=0&&m<=1&&f>=0&&f<=1)return G(r,x,m)}}function X(t,n,e,i){const o=L(y(t[1],t[0]),y(t[2],t[0])),a=L(y(n[1],n[0]),y(n[2],n[0])),u=w(o),d=w(a);if(u<1e-20||d<1e-20)return;const s=n.map(r=>b(y(r,t[0]),o)/u),c=t.map(r=>b(y(r,n[0]),a)/d);if(!(s.every(r=>r>e)||s.every(r=>r<-e)||c.every(r=>r>e)||c.every(r=>r<-e))){if(s.every(r=>Math.abs(r)<=e)&&c.every(r=>Math.abs(r)<=e))return i?W(t,n,o,e):void 0;if(!(!i&&(!(Math.min(...s)<-e&&Math.max(...s)>e)||!(Math.min(...c)<-e&&Math.max(...c)>e))))for(let r=0;r<3;r++){const l=J(t[r],t[(r+1)%3],n,e);if(l)return l;const h=J(n[r],n[(r+1)%3],t,e);if(h)return h}}}function Y(t,n,e){const i=y(n[1],n[0]),o=y(n[2],n[0]),a=L(i,o),u=w(a);if(u<1e-20||Math.abs(b(y(t,n[0]),a))/u>e)return!1;const d=y(t,n[0]),s=b(i,i),c=b(i,o),r=b(o,o),l=b(d,i),h=b(d,o),M=s*r-c*c;if(Math.abs(M)<1e-30)return!1;const x=(l*r-h*c)/M,v=(h*s-l*c)/M,_=e/Math.max(w(i),w(o),e);return x>=-_&&v>=-_&&x+v<=1+_}function K(t,n,e,i){if(!n.closed||t.some((l,h)=>l<=n.bounds.min[h]+i||l>=n.bounds.max[h]-i))return!1;for(const l of T(e,{min:t,max:t},i))if(Y(t,O(n,l),i))return!1;const o=[1,.371390676,.52999894],a=w(y(n.bounds.max,n.bounds.min))*3+1,u=G(t,o,a),d=[],s=R([...t,...u]);for(const l of T(e,s,i)){const h=J(t,u,O(n,l),i);if(h){const M=w(y(h,t));M>i&&d.push(M)}}d.sort((l,h)=>l-h);let c=0,r=-1/0;for(const l of d)l-r>i*2&&(c++,r=l);return c%2===1}async function Z(t,n,e,i){const o=n.precision/1e3;if(!Number.isFinite(o)||o<=0)throw Error("Точность расчёта должна быть положительным числом.");const a=t.filter(m=>n.includeHidden||!m.hidden),u=a.filter(m=>Q(m,n.a)),d=a.filter(m=>Q(m,n.b));if(!u.length||!d.length)throw Error("Выборка А или Б пуста. Проверьте модели и условия.");let s=performance.now();const c=async()=>{if(i())throw Error("Расчёт отменён. Предыдущие результаты сохранены.");performance.now()-s>16&&(await new Promise(m=>setTimeout(m,0)),s=performance.now())},r=new Map,l=m=>{let f=r.get(m.id);return f||(f=H(m,Array.from({length:m.triangles.length/9},(g,I)=>I)),r.set(m.id,f)),f},h=new Map,M=async m=>{let f=h.get(m.id);if(f!==void 0)return f;const g=[];for(let I=0;I<m.triangles.length;I+=9)g.push([0,3,6].map(p=>[0,1,2].map(N=>Math.round(m.triangles[I+p+N]/o)).join(",")).sort().join(";")),I%9e3===0&&await c();return f=g.sort().join("|"),h.set(m.id,f),f},x=[],v=new Set,_=d.slice().sort((m,f)=>m.bounds.min[0]-f.bounds.min[0]);let E=0;for(let m=0;m<u.length;m++){const f=u[m];e({phase:"Проверка пар",done:m,total:u.length,found:x.length});for(const g of _){if(g.bounds.min[0]>f.bounds.max[0]+o)break;if(await c(),f.id===g.id||!U(f.bounds,g.bounds,o)||n.ignoreSameModel&&f.modelId===g.modelId||n.ignoreSameGroup&&f.modelId===g.modelId&&f.properties.Объект&&f.properties.Объект===g.properties.Объект||n.equalProperty&&f.properties[n.equalProperty]!==void 0&&f.properties[n.equalProperty]===g.properties[n.equalProperty])continue;const I=V(f.id,g.id);if(v.has(I))continue;if(v.add(I),++E>2e6)throw Error("Слишком много близких пар. Уточните выборки и запустите проверку снова. Предыдущие результаты сохранены.");let p,N="surface";if(n.type==="duplicates"){if(f.triangles.length!==g.triangles.length||f.bounds.min.some((P,S)=>Math.abs(P-g.bounds.min[S])>o||Math.abs(f.bounds.max[S]-g.bounds.max[S])>o))continue;await M(f)===await M(g)&&(p=f.bounds.min.map((P,S)=>(P+f.bounds.max[S])/2),N="duplicate")}else{const P=l(f),S=l(g);for(let q=0;q<f.triangles.length/9&&!p;q++){const j=O(f,q),C=R(j.flat());for(const A of T(S,C,o)){if(p=X(j,O(g,A),o,n.touching),p)break;await c()}await c()}if(!p&&f.closed&&g.closed){const q=f.bounds.min.map((j,C)=>(j+f.bounds.max[C])/2);K(q,f,P,o)&&K(q,g,S,o)&&(p=q,N="contained")}if(!p){for(const[q,j,C]of[[f,g,S],[g,f,P]])if(j.closed){for(let A=0;A<q.triangles.length/9&&!p;A++){const F=O(q,A),$=F[0].map((z,B)=>(F[0][B]+F[1][B]+F[2][B])/3);for(const z of[F[0],$])if(K(z,j,C,o)){p=z,N="contained";break}await c()}if(p)break}}}if(p&&(x.push({id:I,a:D(f),b:D(g),point:p,kind:N,state:"new",note:"",assignee:"",firstSeen:"",lastSeen:""}),x.length>=5e4))throw Error("Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат.")}}return e({phase:"Готово",done:u.length,total:u.length,found:x.length}),x}self.onmessage=async t=>{try{const{elements:n,check:e}=t.data,i=await Z(n,e,o=>self.postMessage({progress:o}),()=>!1);self.postMessage({results:i})}catch(n){self.postMessage({error:n instanceof Error?n.message:String(n)})}}})();
`, ue = typeof self < "u" && self.Blob && new Blob(["(self.URL || self.webkitURL).revokeObjectURL(self.location.href);", be], { type: "text/javascript;charset=utf-8" });
function Ae(e) {
  let t;
  try {
    if (t = ue && (self.URL || self.webkitURL).createObjectURL(ue), !t) throw "";
    const i = new Worker(t, {
      name: e?.name
    });
    return i.addEventListener("error", () => {
      (self.URL || self.webkitURL).revokeObjectURL(t);
    }), i;
  } catch {
    return new Worker(
      "data:text/javascript;charset=utf-8," + encodeURIComponent(be),
      {
        name: e?.name
      }
    );
  }
}
const U = (e) => String(e ?? "").replace(
  /[&<>"']/g,
  (t) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[t]
);
function fe(e, t) {
  const i = URL.createObjectURL(
    new Blob([t], {
      type: e.endsWith(".html") ? "text/html;charset=utf-8" : "application/json;charset=utf-8"
    })
  ), n = document.createElement("a");
  n.href = i, n.download = e, n.click(), setTimeout(() => URL.revokeObjectURL(i), 6e4);
}
function Oe(e, t) {
  const i = U;
  return `<!doctype html><html lang="ru"><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><title>${i(e.name)}</title><style>body{font:14px/1.5 system-ui;margin:24px;background:#171c23;color:#e6edf5}h1{margin:0}small{color:#a9b7c8}input,select{padding:10px;margin:15px 8px 15px 0;max-width:100%;background:#242e3b;color:inherit;border:1px solid #506074;border-radius:6px}.wrap{overflow:auto}table{border-collapse:separate;border-spacing:0;width:100%}td,th{padding:10px;border-bottom:1px solid #39475a;min-width:100px;vertical-align:top;overflow-wrap:anywhere}th{background:#253142;position:sticky;top:0;text-align:left;white-space:normal}td{max-width:350px}tr[hidden]{display:none}@media print{input,select{display:none}body{background:white;color:black}.wrap{overflow:visible}th{position:static;background:#eee}}</style><h1>${i(e.name)}</h1><small>НашеПО · Проверки коллизий · ${i(e.lastRun || "")} · ${e.status === "stale" ? "Результат устарел" : "Последний завершённый расчёт"}</small><p>${i(e.type === "duplicates" ? "Совпадение треугольной геометрии" : "Пересечения поверхностей и вложенность замкнутых тел")}. Точность: ${i(e.precision)} мм.</p><input id="search" type="search" placeholder="Поиск по всему отчёту"><select id="state"><option value="">Все состояния</option>${Object.entries(
    T
  ).map(([n, s]) => `<option value="${n}">${s}</option>`).join(
    ""
  )}</select><span id="count"></span><div class="wrap"><table><thead><tr>${["№", "Состояние", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "X", "Y", "Z", "Назначение", "Комментарий"].map((n) => `<th>${n}</th>`).join("")}</tr></thead><tbody>${t.map((n, s) => `<tr data-state="${n.state}">${[s + 1, T[n.state], n.a.name, n.a.model, n.a.guid, n.b.name, n.b.model, n.b.guid, ...n.point.map((r) => r.toFixed(4)), n.assignee, n.note].map((r) => `<td>${i(r)}</td>`).join("")}</tr>`).join("")}</tbody></table></div><script>const q=document.getElementById('search'),s=document.getElementById('state'),rows=[...document.querySelectorAll('tbody tr')];function filter(){let n=0;for(const r of rows){r.hidden=!!((s.value&&r.dataset.state!==s.value)||!r.textContent.toLowerCase().includes(q.value.toLowerCase()));if(!r.hidden)n++}document.getElementById('count').textContent='Коллизий: '+n}q.oninput=s.onchange=filter;filter()<\/script></html>`;
}
function Ee(e, t) {
  return JSON.stringify(
    {
      version: 1,
      id: e.id,
      name: e.name,
      images: {},
      warnings: e.warnings,
      tests: [
        {
          id: e.id,
          name: e.name,
          clashes: t.map((i, n) => ({
            id: i.id,
            name: `Конфликт ${n + 1}`,
            distance: "",
            date: e.lastRun || "",
            description: e.type === "duplicates" ? "Дублирование" : "По пересечению",
            status: T[i.state],
            group: i.assignee,
            note: i.note,
            point: i.point,
            image: "",
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
            properties: { Проверка: e.name, Вид: i.kind }
          }))
        }
      ]
    },
    null,
    2
  );
}
const Ie = "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAFAAAABQCAYAAACOEfKtAAAAGXRFWHRTb2Z0d2FyZQBBZG9iZSBJbWFnZVJlYWR5ccllPAAAAydpVFh0WE1MOmNvbS5hZG9iZS54bXAAAAAAADw/eHBhY2tldCBiZWdpbj0i77u/IiBpZD0iVzVNME1wQ2VoaUh6cmVTek5UY3prYzlkIj8+IDx4OnhtcG1ldGEgeG1sbnM6eD0iYWRvYmU6bnM6bWV0YS8iIHg6eG1wdGs9IkFkb2JlIFhNUCBDb3JlIDkuMS1jMDAzIDc5Ljk2OTBhODdmYywgMjAyNS8wMy8wNi0yMDo1MDoxNiAgICAgICAgIj4gPHJkZjpSREYgeG1sbnM6cmRmPSJodHRwOi8vd3d3LnczLm9yZy8xOTk5LzAyLzIyLXJkZi1zeW50YXgtbnMjIj4gPHJkZjpEZXNjcmlwdGlvbiByZGY6YWJvdXQ9IiIgeG1sbnM6eG1wTU09Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC9tbS8iIHhtbG5zOnN0UmVmPSJodHRwOi8vbnMuYWRvYmUuY29tL3hhcC8xLjAvc1R5cGUvUmVzb3VyY2VSZWYjIiB4bWxuczp4bXA9Imh0dHA6Ly9ucy5hZG9iZS5jb20veGFwLzEuMC8iIHhtcE1NOkRvY3VtZW50SUQ9InhtcC5kaWQ6RDZFQkU2NEQ4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcE1NOkluc3RhbmNlSUQ9InhtcC5paWQ6RDZFQkU2NEM4QUJDMTFGMUE5MjRBM0M2N0UyOTI4NDYiIHhtcDpDcmVhdG9yVG9vbD0iQWRvYmUgUGhvdG9zaG9wIDI2LjExIChXaW5kb3dzKSI+IDx4bXBNTTpEZXJpdmVkRnJvbSBzdFJlZjppbnN0YW5jZUlEPSJ4bXAuaWlkOjRENDVBNjQzODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIiBzdFJlZjpkb2N1bWVudElEPSJ4bXAuZGlkOjRENDVBNjQ0ODQzRDExRjE5MkMwQ0YwNkU2ODQzQTZDIi8+IDwvcmRmOkRlc2NyaXB0aW9uPiA8L3JkZjpSREY+IDwveDp4bXBtZXRhPiA8P3hwYWNrZXQgZW5kPSJyIj8+pHX+ogAAD+lJREFUeNrs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", Ce = ":host{display:block;height:100%;color-scheme:dark;font:13px/1.4 Segoe UI,sans-serif;color:#dbe5f0;container-type:size}*{box-sizing:border-box}[hidden]{display:none!important}main{height:100%;min-height:260px;background:#171d25;display:flex;flex-direction:column;overflow:hidden}button,input,select,textarea{font:inherit;color:inherit;border:1px solid #425165;border-radius:6px;background:#253140;padding:7px 9px;min-width:0}button{cursor:pointer;white-space:nowrap}button:hover{background:#354459}button:disabled{opacity:.45;cursor:default}.primary{background:#b99a38;border-color:#d0ae46;color:#111820;font-weight:600}.primary:hover{background:#e0bd51}button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid #f2c94c;outline-offset:1px}input,select,textarea{background:#111a24}input[type=checkbox]{accent-color:#e6c354;width:16px;height:16px}header{display:flex;gap:7px;align-items:center;padding:8px 12px;border-bottom:1px solid #354459;flex-shrink:0;overflow-x:auto}.brand{display:flex;gap:7px;align-items:center;margin-right:8px}.brand img{width:32px;height:32px;object-fit:contain}.brand b{font-size:17px}.brand small{font-size:10px;color:#a6b5c7}#dirty{margin-left:auto;font-size:11px;color:#cabb81;white-space:nowrap}.notice{background:#1c2735;padding:5px 12px;font-size:12px;min-height:27px;max-height:70px;overflow:auto;color:#a7bbd1}.notice.error{color:#ffaaa1;background:#412725}.workspace{display:grid;grid-template-columns:230px minmax(0,1fr);flex:1;min-height:0}aside{padding:10px;display:flex;flex-direction:column;gap:9px;border-right:1px solid #354459;min-height:0}#checks{overflow:auto;flex:1;min-height:0}.check-item{display:flex;flex-direction:column;gap:5px;width:100%;margin-bottom:5px;text-align:left;white-space:normal}.check-item small{color:#a8b7ca}.check-item.active,.tabs .active{border-color:#c7ab56;background:#403b2c;color:#ffe399}.main{display:flex;flex-direction:column;min-width:0;min-height:0}.test-toolbar{display:flex;gap:7px;padding:8px 12px;align-items:center}.test-toolbar input{flex:1;font-weight:600}.tabs{display:flex;gap:7px;border-bottom:1px solid #354459;padding:0 12px 8px}.tabs button{min-width:105px}#content{flex:1;min-height:0;overflow:auto;display:flex;flex-direction:column}.empty{padding:28px;color:#a4b4c9;text-align:center;margin:auto}h2,h3,p{margin:0 0 10px}h2{font-size:20px}h3{font-size:15px}label{display:flex;flex-direction:column;gap:5px;font-size:12px;color:#b8c6d7}.check{flex-direction:row;align-items:center;gap:6px}small{font-size:11px;color:#a8b7c9}.parameters{display:flex;gap:18px;align-items:end;padding:10px 12px}.parameters input{width:140px}.selection-grid{display:grid;grid-template-columns:1fr 1fr;gap:12px;padding:0 12px 12px}.selection{border:1px solid #39495e;border-radius:8px;padding:12px;background:#1b2633;min-width:0}.selection h3{display:flex;justify-content:space-between}.selection h3 span{color:#92c4b2;font-size:12px}.selection select[multiple]{width:100%;min-height:70px}.selection-tools{display:flex;gap:5px;flex-wrap:wrap;margin:8px 0}.selection-tools button{font-size:11px;padding:5px 7px}.selection>label{margin-bottom:8px}.condition{display:grid;grid-template-columns:minmax(80px,1fr) 100px minmax(70px,1fr) 29px;gap:5px;margin:6px 0}.condition button{padding:3px}.rules,.report{padding:18px;max-width:850px}.rules>label{margin:14px 0}.rules>p,.report>p{color:#a9b8cb}.report>button{margin:12px 8px 14px 0}.result-tools{display:flex;gap:7px;flex-wrap:wrap;padding:8px 12px}.result-tools input{flex:1;min-width:180px}.result-area{display:grid;grid-template-columns:minmax(0,1fr) 300px;flex:1;min-height:0}.table-area{display:flex;flex-direction:column;min-width:0;min-height:0}.scroll{overflow:auto;flex:1;min-height:0}table{border-collapse:separate;border-spacing:0;width:max-content;min-width:100%}th{position:sticky;top:0;background:#2a3748;z-index:1;text-align:left;max-width:240px;white-space:normal}th,td{padding:8px;border-bottom:1px solid #344154;vertical-align:top}td{max-width:320px;min-width:90px;overflow-wrap:anywhere;-webkit-user-select:text;user-select:text}td:first-child{min-width:36px}tr.active td{background:#453e29;color:#fff0b5}tr:hover td{background:#2c3847}.pager{display:flex;gap:10px;align-items:center;justify-content:center;padding:5px;border-top:1px solid #39495e;font-size:11px}.pager button{padding:2px 8px}.detail{border-left:1px solid #354459;padding:10px;overflow:auto}.detail h3{overflow-wrap:anywhere}.detail>label{margin:10px 0}.detail p{font:11px/1.5 Consolas,monospace}.detail details{border-top:1px solid #354459;padding:8px 0}summary{cursor:pointer}dl{font-size:11px;display:grid;grid-template-columns:1fr 1fr;gap:7px}dt,dd{overflow-wrap:anywhere;margin:0}dt{color:#9baec4}footer{border-top:1px solid #354459;padding:4px 12px;display:flex;justify-content:space-between;color:#91a4bb;font-size:11px}dialog{border:1px solid #53647c;border-radius:12px;background:#202c3a;color:#dbe5f0;width:min(700px,92vw);max-height:85vh;padding:20px;box-shadow:0 15px 60px #000a}dialog::backdrop{background:#000a}dialog p{margin:12px 0}dialog a{color:#f2c94c;margin-right:12px}@container (max-width:950px){.workspace{grid-template-columns:185px minmax(0,1fr)}.result-area{grid-template-columns:minmax(0,1fr) 240px}.selection-grid{grid-template-columns:1fr}.parameters,.test-toolbar{flex-wrap:wrap}.test-toolbar input{flex-basis:100%}}@container (max-height:400px){header{padding:5px 10px}.test-toolbar{padding:5px 10px}.tabs{padding-bottom:5px}.brand img{width:25px;height:25px}footer{display:none}}:host{font-size:14px}.brand img{background:#e1e7ef;border-radius:5px;padding:3px}.selection-tools button{font-size:12px}label{font-size:13px}", Z = { format: "nashepo.checks", version: 1, checks: [] };
function Ne(e, t) {
  const i = e.shadowRoot || e.attachShadow({ mode: "open" });
  let n, s = Z.checks[0]?.id || "", r = "select", d = "", h = 0, u = !1, p = !1, m, g = !0, x = !1;
  const M = /* @__PURE__ */ new Set();
  let E;
  const v = () => Z.checks.find((o) => o.id === s), c = (o) => i.querySelector("#" + o);
  i.innerHTML = `<style>${Ce}</style><main><header><div class="brand"><img src="${Ie}" alt=""><b>НашеПО</b><small>0.1.0</small></div><button id="scan">Обновить модели</button><button id="new" class="primary">＋ Проверка</button><button id="open">Открыть проверки</button><button id="save">Сохранить проверки</button><button id="settings">⚙</button><button id="help">Справка</button><span id="dirty"></span></header><div class="notice" id="notice" role="status">Откройте IFC/SMDX в проекте и нажмите «Обновить модели».</div><div class="workspace"><aside><input id="test-search" type="search" placeholder="Поиск проверок"><div id="checks"></div><button id="all">Запустить все</button></aside><section class="main"><div class="test-toolbar"><input id="name" aria-label="Имя проверки" placeholder="Имя проверки"><button id="copy">Копировать</button><button id="delete">Удалить</button><button id="run" class="primary">▶ Запустить</button><button id="cancel" hidden>Остановить</button></div><div id="tabs" class="tabs">${[
    ["rules", "Правила"],
    ["select", "Выбрать"],
    ["results", "Результаты"],
    ["report", "Отчёт"]
  ].map(([o, a]) => `<button data-tab="${o}">${a}</button>`).join(
    ""
  )}</div><div id="content"></div></section></div><footer><span id="model-count">Модели не прочитаны</span><span>Расчёт выполняется на вашем компьютере</span></footer><input id="file" type="file" accept=".json" hidden><dialog id="settings-dialog"><h2>Настройки</h2><label>Дистанция камеры, м<input id="distance" type="number" value="15" min="0.5"></label><p class="links"><a href="https://nashepo.ru/" target="_blank" rel="noopener noreferrer">Сайт НашеПО</a><a href="https://t.me/RoburFan" target="_blank" rel="noopener noreferrer">Telegram</a></p><button data-close="settings-dialog">Закрыть</button></dialog><dialog id="help-dialog"><h2>Проверки коллизий</h2><p>Загрузите модели штатными средствами Топоматик 360. Обновите список моделей, создайте проверку и задайте выборки А и Б. Пустой список моделей в выборке означает «Все прочитанные модели».</p><p>Условия по свойствам автоматически вычисляются перед каждым запуском. Можно добавить выделенные в сцене элементы и исключить отдельные элементы из выборки.</p><p>Пересечения ищутся по треугольным поверхностям. Вложенность дополнительно проверяется для замкнутых тел. «Учитывать касания» добавляет соприкосновения поверхностей. Точность расчёта задаётся в мм; это числовая погрешность, а не фильтр по глубине проникновения.</p><p>Дубликаты — совпадающие мировые треугольники после округления координат с заданной точностью. Разная триангуляция одной формы пока не распознаётся как дубликат. Для проверки модели самой с собой выберите её и в А, и в Б.</p><p>Повторный запуск сохраняет комментарии и назначения. Исчезнувшие конфликты становятся исправленными только при неизменных условиях и полном составе моделей. После изменения условий начинается новый набор результатов, прежние результаты сохраните в файл перед запуском.</p><p>Сохранить проверки — файл правил и результатов для продолжения работы. Отчёт HTML — документ для передачи. Сессия «Коллизии» открывается в плагине просмотра готовых результатов.</p><p>Знаки отображаются для максимум 3000 текущих результатов. В таблице доступны все найденные конфликты. Подсветка и переход относятся к выбранной паре элементов.</p><button data-close="help-dialog">Закрыть</button></dialog></main>`;
  const C = (o, a = !1) => {
    c("notice").textContent = o, c("notice").classList.toggle("error", a);
  }, y = async (o) => {
    try {
      await o();
    } catch (a) {
      C(a instanceof Error ? a.message : String(a), !0);
    }
  }, b = () => {
    x = !0, c("dirty").textContent = "Есть несохранённые изменения";
  }, O = () => {
    const o = v();
    o?.lastRun && (o.status = "stale"), b(), $();
  }, Y = () => [
    ...new Set(
      (n?.elements || []).flatMap((o) => Object.keys(o.properties))
    )
  ].sort(), N = (o, a) => o.map(
    (l) => `<option value="${U(l)}" ${l === a ? "selected" : ""}>${U(l)}</option>`
  ).join("");
  function j() {
    const o = v(), a = c("result-search")?.value.toLowerCase() || "", l = c("result-state")?.value || "";
    return (o?.results || []).filter(
      (f) => (!l || f.state === l) && (!a || JSON.stringify(f).toLowerCase().includes(a))
    );
  }
  function $() {
    const o = c("test-search").value.toLowerCase();
    c("checks").innerHTML = Z.checks.filter((a) => a.name.toLowerCase().includes(o)).map(
      (a) => `<button class="check-item ${a.id === s ? "active" : ""}" data-check="${a.id}"><strong>${U(a.name)}</strong><small>${{ new: "Не выполнена", done: "Выполнена", stale: "Устарела" }[a.status]} · ${a.results.filter((l) => !["resolved", "excluded"].includes(l.state)).length} в работе / ${a.results.length}</small></button>`
    ).join("");
  }
  function R(o, a) {
    const l = n?.elements.filter(
      (f) => (v().includeHidden || !f.hidden) && ne(f, o)
    ).length || 0;
    return `<article class="selection" data-side="${a}"><h3>Выбор ${a.toUpperCase()} <span>${l} элементов</span></h3><label>Модели (без выбора — все)<select multiple size="3" class="models">${(n?.models || []).map((f) => `<option value="${U(f.id)}" ${o.models.includes(f.id) ? "selected" : ""}>${U(f.name)}</option>`).join("")}</select></label><div class="selection-tools"><button data-selection="show">Показать</button><button data-selection="include">＋ Из выделения</button><button data-selection="exclude">− Из выделения</button><button data-selection="reset">Сбросить ручной выбор</button></div><small>Добавлено вручную: ${o.include.length} · исключено: ${o.exclude.length}</small><label>Условия<select class="mode"><option value="all" ${o.mode === "all" ? "selected" : ""}>Выполнены все (И)</option><option value="any" ${o.mode === "any" ? "selected" : ""}>Выполнено любое (ИЛИ)</option></select></label><div class="conditions">${o.conditions.map(
      (f, w) => `<div class="condition" data-condition="${w}"><input class="field" list="property-fields" value="${U(f.field)}" placeholder="Свойство"><select class="op">${[
        ["eq", "равно"],
        ["contains", "содержит"],
        ["ne", "не равно"],
        ["exists", "существует"],
        ["gt", "больше"],
        ["lt", "меньше"]
      ].map(
        ([S, k]) => `<option value="${S}" ${f.op === S ? "selected" : ""}>${k}</option>`
      ).join(
        ""
      )}</select><input class="value" value="${U(f.value)}" placeholder="Значение" ${f.op === "exists" ? "disabled" : ""}><button data-remove="${w}" aria-label="Удалить условие">×</button></div>`
    ).join(
      ""
    )}</div><button data-selection="add">＋ Условие</button></article>`;
  }
  function A() {
    $();
    const o = v();
    c("name").value = o?.name || "";
    for (const a of ["name", "copy", "delete", "run"])
      c(a).disabled = !o || u;
    for (const a of i.querySelectorAll("[data-tab]"))
      a.classList.toggle("active", a.dataset.tab === r);
    if (!o) {
      c("content").innerHTML = '<div class="empty"><h2>Создайте первую проверку</h2><p>Обновите модели, затем выберите, какие элементы проверять друг с другом.</p></div>';
      return;
    }
    r === "select" && (c("content").innerHTML = `<div class="parameters"><label>Тип<select id="type"><option value="intersection" ${o.type === "intersection" ? "selected" : ""}>По пересечению</option><option value="duplicates" ${o.type === "duplicates" ? "selected" : ""}>Дублирование</option></select></label><label title="Числовая точность; не глубина проникновения">Точность расчёта, мм<input id="precision" type="number" value="${o.precision}" min="0.001" max="100" step="0.1"></label><label class="check"><input id="touching" type="checkbox" ${o.touching ? "checked" : ""} ${o.type === "duplicates" ? "disabled" : ""}>Учитывать касания</label></div><div class="selection-grid">${R(o.a, "a")}${R(o.b, "b")}</div><datalist id="property-fields">${N(Y(), "")}</datalist>`), r === "rules" && (c("content").innerHTML = `<div class="rules"><h3>Исключение пар</h3><p>Элемент сам с собой не проверяется. Пара А/Б учитывается один раз.</p><label class="check"><input id="same-model" type="checkbox" ${o.ignoreSameModel ? "checked" : ""}>Не проверять элементы одной модели</label><label class="check"><input id="same-group" type="checkbox" ${o.ignoreSameGroup ? "checked" : ""}>Не проверять геометрию одного составного объекта</label><label>Не проверять пары с одинаковым значением свойства<input id="equal-property" list="property-fields" value="${U(o.equalProperty)}" placeholder="Без ограничения"></label><label class="check"><input id="hidden" type="checkbox" ${o.includeHidden ? "checked" : ""}>Включать скрытые элементы прочитанных моделей</label><p>Незагруженные подключённые файлы нужно открыть перед расчётом.</p><datalist id="property-fields">${N(Y(), "")}</datalist></div>`), r === "results" && (c("content").innerHTML = `<div class="result-tools"><input id="result-search" type="search" placeholder="Поиск по результатам"><select id="result-state"><option value="">Все состояния</option>${Object.entries(
      T
    ).map(([a, l]) => `<option value="${a}">${l}</option>`).join(
      ""
    )}</select><button id="show-markers" role="switch" aria-checked="${g}">${g ? "● Знаки включены" : "○ Знаки выключены"}</button><select id="bulk-state">${Object.entries(
      T
    ).map(([a, l]) => `<option value="${a}">${l}</option>`).join(
      ""
    )}</select><button id="bulk">Применить к выбранным</button></div><div class="result-area"><div class="table-area"><div class="scroll" id="table"></div><div class="pager"><button id="prev-page">←</button><span id="page"></span><button id="next-page">→</button><span id="selection-count"></span></div></div><div class="detail" id="detail"></div></div>`, I(), Q()), r === "report" && (c("content").innerHTML = `<div class="report"><h3>${U(o.name)}</h3><p>Результатов: ${o.results.length}. Выбрано: ${M.size}. ${o.status === "stale" ? "Результаты устарели — рекомендуется повторный запуск." : ""}</p><label class="check"><input id="selected-only" type="checkbox" ${M.size ? "checked" : ""}>Только выбранные строки</label><button id="export-html" class="primary">Сформировать HTML-отчёт</button><button id="export-viewer">Сессия для плагина «Коллизии»</button><p>Правила и все результаты сохраняются кнопкой «Сохранить проверки» в верхней панели.</p></div>`), c("content").inert = u;
  }
  function I() {
    const o = j(), a = Math.max(1, Math.ceil(o.length / 50));
    h = Math.max(0, Math.min(h, a - 1));
    const l = o.slice(h * 50, h * 50 + 50);
    c("table").innerHTML = o.length ? `<table><thead><tr><th><input id="check-page" type="checkbox" aria-label="Выбрать страницу" ${l.every((f) => M.has(f.id)) ? "checked" : ""}></th>${["№", "Состояние", "Элемент А", "Модель А", "GUID А", "Элемент Б", "Модель Б", "GUID Б", "Комментарий"].map((f) => `<th>${f}</th>`).join("")}</tr></thead><tbody>${l.map((f, w) => `<tr data-result="${U(f.id)}" class="${f.id === d ? "active" : ""}"><td><input type="checkbox" class="row-check" aria-label="Выбрать конфликт" ${M.has(f.id) ? "checked" : ""}></td>${[h * 50 + w + 1, T[f.state], f.a.name, f.a.model, f.a.guid || "—", f.b.name, f.b.model, f.b.guid || "—", f.note].map((S) => `<td title="${U(S)}">${U(S)}</td>`).join("")}</tr>`).join("")}</tbody></table>` : '<div class="empty">Нет результатов. Запустите проверку или измените фильтры.</div>', c("page").textContent = `Страница ${h + 1} из ${a} · ${o.length} результатов`, c("selection-count").textContent = `Выбрано: ${M.size}`, c("prev-page").disabled = h === 0, c("next-page").disabled = h === a - 1;
  }
  function Q() {
    const o = v()?.results.find((a) => a.id === d);
    c("detail").innerHTML = o ? `<h3>${U(o.a.name)} × ${U(o.b.name)}</h3><div class="selection-tools"><button id="focus" class="primary">Перейти в 3D</button><button id="previous">←</button><button id="next">→</button></div><p>${o.point.map((a, l) => `${["X", "Y", "Z"][l]}: ${a.toFixed(4)}`).join(" · ")}</p><label>Состояние<select id="edit-state">${Object.entries(
      T
    ).map(
      ([a, l]) => `<option value="${a}" ${o.state === a ? "selected" : ""}>${l}</option>`
    ).join(
      ""
    )}</select></label><label>Назначение<input id="assignee" value="${U(o.assignee)}"></label><label>Комментарий<textarea id="note" rows="3">${U(o.note)}</textarea></label>${[
      o.a,
      o.b
    ].map(
      (a, l) => `<details><summary>Элемент ${l ? "Б" : "А"} · свойства</summary><dl>${Object.entries(
        a.properties
      ).map(([f, w]) => `<dt>${U(f)}</dt><dd>${U(w)}</dd>`).join("")}</dl></details>`
    ).join("")}` : "<p>Выберите конфликт в таблице.</p>";
  }
  function B() {
    t.markers(
      j(),
      d,
      g,
      (o) => y(() => z(o, !0))
    );
  }
  function z(o, a = !1) {
    if (d = o, r === "results") {
      for (const l of i.querySelectorAll("[data-result]"))
        l.classList.toggle("active", l.dataset.result === o);
      Q();
    }
    if (B(), a) {
      const l = v()?.results.find((f) => f.id === o);
      l && t.focus(l, Number(c("distance").value));
    }
  }
  async function J() {
    n = await t.scan(C, () => p), c("model-count").textContent = `Моделей: ${n.models.length} · элементов: ${n.elements.length}`;
    for (const o of Z.checks)
      o.fingerprint && o.fingerprint !== n.fingerprint && (o.status = "stale");
    A(), C(
      n.warnings.length ? n.warnings.join(" ") : "Модели прочитаны. Настройте выборки и запустите проверку.",
      !!n.warnings.length
    );
  }
  const G = (o) => {
    u = o;
    for (const a of [
      "new",
      "scan",
      "open",
      "all",
      "copy",
      "delete",
      "name",
      "run",
      "save"
    ])
      c(a).disabled = o;
    c("cancel").hidden = !o, c("content").inert = o, c("checks").inert = o;
  };
  async function V(o) {
    const a = (f) => C(`${o.name} · ${f.phase} ${f.done}/${f.total} · найдено ${f.found}`);
    let l;
    try {
      l = new Ae();
    } catch {
      return Se(n.elements, o, a, () => p);
    }
    return m = l, new Promise((f, w) => {
      const S = () => {
        l.terminate(), m = void 0, E = void 0;
      };
      E = () => {
        S(), w(Error("Расчёт отменён. Предыдущие результаты сохранены."));
      }, l.onmessage = (k) => {
        k.data.progress ? a(k.data.progress) : (S(), k.data.error ? w(Error(k.data.error)) : f(k.data.results));
      }, l.onerror = (k) => {
        S(), w(
          Error(
            `Не удалось запустить расчёт в фоновом потоке: ${k.message || "ошибка загрузки"}`
          )
        );
      }, l.postMessage({
        elements: n.elements,
        check: structuredClone(o)
      });
    });
  }
  async function D(o = !1) {
    if (u) return;
    const a = o ? [...Z.checks] : [v()].filter(Boolean);
    if (!a.length) throw Error("Создайте проверку.");
    p = !1, G(!0);
    try {
      if (await J(), G(!0), n.warnings.length)
        throw Error(
          "Состав моделей прочитан не полностью. " + n.warnings.join(" ")
        );
      for (const l of a) {
        if (p) break;
        for (const k of [l.a, l.b]) {
          if (k.models.some((L) => !n.models.some((X) => X.id === L)))
            throw Error(
              `${l.name}: одна из моделей выборки отсутствует. Исправьте выборку.`
            );
          if (k.include.some((L) => !n.elements.some((X) => X.id === L)))
            throw Error(
              `${l.name}: вручную добавленный элемент отсутствует в модели.`
            );
        }
        const f = xe(l);
        if (l.configAtRun === f && l.modelsAtRun?.some(
          (k) => !n.models.some((L) => L.id === k)
        ))
          throw Error(
            `${l.name}: состав моделей уменьшился. Подключите прежние модели или создайте копию проверки для нового состава. Прежние результаты сохранены.`
          );
        const w = await V(l);
        if (p || !t.isCurrent())
          throw Error(
            "Проект изменился или расчёт отменён. Предыдущие результаты сохранены."
          );
        const S = (/* @__PURE__ */ new Date()).toISOString();
        l.results = ve(
          l.configAtRun === f ? l.results : [],
          w,
          S
        ), l.lastRun = S, l.fingerprint = n.fingerprint, l.configAtRun = f, l.modelsAtRun = n.models.map((k) => k.id), l.status = "done", l.warnings = [], s = l.id, d = l.results[0]?.id || "", M.clear(), b();
      }
      r = "results", A(), B(), C(
        `Проверка завершена. ${v()?.results.length || 0} результатов. Сохраните проверки для продолжения работы.`
      );
    } finally {
      G(!1), A();
    }
  }
  function H(o) {
    const a = o.closest("[data-side]")?.dataset.side;
    if (!a) return;
    const l = v()[a], f = o.closest("[data-condition]")?.dataset.condition, w = o;
    if (w.classList.contains("models") && (l.models = Array.from(o.selectedOptions).map(
      (S) => S.value
    )), w.classList.contains("mode") && (l.mode = w.value), f !== void 0) {
      const S = l.conditions[Number(f)];
      w.classList.contains("field") && (S.field = w.value), w.classList.contains("op") && (S.op = w.value), w.classList.contains("value") && (S.value = w.value);
    }
    O(), A();
  }
  c("new").onclick = () => {
    const o = ge();
    o.name = `Проверка ${Z.checks.length + 1}`, Z.checks.push(o), s = o.id, r = "select", d = "", M.clear(), b(), A();
  }, c("scan").onclick = () => y(async () => {
    p = !1, G(!0);
    try {
      await J();
    } finally {
      G(!1), A();
    }
  }), c("run").onclick = () => y(() => D()), c("all").onclick = () => y(() => D(!0)), c("cancel").onclick = () => {
    p = !0, E?.();
  }, c("test-search").oninput = $, c("checks").onclick = (o) => {
    const a = o.target.closest(
      "[data-check]"
    );
    a && !u && (t.clear(), s = a.dataset.check, d = "", M.clear(), h = 0, A());
  }, c("tabs").onclick = (o) => {
    const a = o.target.closest("[data-tab]");
    a && !u && (r = a.dataset.tab, A());
  }, c("name").onchange = () => {
    const o = v();
    o && (o.name = c("name").value.trim() || "Проверка", b(), $());
  }, c("copy").onclick = () => {
    const o = v();
    if (!o) return;
    const a = structuredClone(o);
    Object.assign(a, {
      id: crypto.randomUUID(),
      name: o.name + " — копия",
      results: [],
      lastRun: void 0,
      fingerprint: void 0,
      configAtRun: void 0,
      status: "new"
    }), Z.checks.push(a), s = a.id, d = "", M.clear(), b(), A();
  }, c("delete").onclick = () => {
    v() && confirm(`Удалить проверку «${v().name}» и её результаты?`) && (Z.checks = Z.checks.filter((o) => o.id !== s), s = Z.checks[0]?.id || "", M.clear(), t.clear(), b(), A());
  }, c("save").onclick = () => {
    fe("НашеПО-проверки.json", JSON.stringify(Z, null, 2)), x = !1, c("dirty").textContent = "Файл проверок сохранён";
  }, c("open").onclick = () => c("file").click(), c("file").onchange = () => y(async () => {
    const o = c("file").files?.[0];
    if (!o) return;
    const a = we(await o.text());
    x && !confirm("Заменить текущие несохранённые проверки данными из файла?") || (Z.checks = a.checks, s = Z.checks[0]?.id || "", d = "", M.clear(), t.clear(), x = !1, c("dirty").textContent = "Проверки открыты", A(), C("Проверки открыты. Обновите модели перед переходом к элементам."), c("file").value = "");
  });
  for (const o of ["settings", "help"])
    c(o).onclick = () => c(o + "-dialog").showModal();
  for (const o of i.querySelectorAll("[data-close]"))
    o.onclick = () => c(o.dataset.close).close();
  c("content").onchange = (o) => y(() => {
    const a = o.target, l = v();
    if (!l) return;
    if (a.closest("[data-side]")) {
      H(a);
      return;
    }
    if ([
      "type",
      "precision",
      "touching",
      "same-model",
      "same-group",
      "hidden",
      "equal-property"
    ].includes(a.id)) {
      if (a.id === "precision") {
        const w = Number(a.value);
        if (!Number.isFinite(w) || w < 1e-3 || w > 100)
          throw a.value = String(l.precision), Error("Точность должна быть от 0,001 до 100 мм.");
        l.precision = w;
      }
      a.id === "type" && (l.type = a.value), a.id === "touching" && (l.touching = a.checked), a.id === "same-model" && (l.ignoreSameModel = a.checked), a.id === "same-group" && (l.ignoreSameGroup = a.checked), a.id === "hidden" && (l.includeHidden = a.checked), a.id === "equal-property" && (l.equalProperty = a.value), O(), A();
      return;
    }
    if (a.id === "result-state") {
      h = 0, I();
      return;
    }
    if (a.id === "check-page") {
      for (const w of j().slice(h * 50, h * 50 + 50))
        a.checked ? M.add(w.id) : M.delete(w.id);
      I();
      return;
    }
    if (a.classList.contains("row-check")) {
      const w = a.closest("[data-result]").dataset.result;
      a.checked ? M.add(w) : M.delete(w), c("selection-count").textContent = `Выбрано: ${M.size}`;
      return;
    }
    const f = l.results.find((w) => w.id === d);
    f && (a.id === "edit-state" && (f.state = a.value, I(), $(), B()), a.id === "assignee" && (f.assignee = a.value), a.id === "note" && (f.note = a.value, I()), b());
  }), c("content").oninput = (o) => {
    o.target.id === "result-search" && (h = 0, I());
  }, c("content").onclick = (o) => y(() => {
    const a = o.target, l = a.closest("button"), f = v();
    if (!f) return;
    if (l?.dataset.selection || l?.dataset.remove !== void 0) {
      const S = l.closest("[data-side]").dataset.side, k = f[S];
      if (l.dataset.remove !== void 0)
        k.conditions.splice(Number(l.dataset.remove), 1);
      else
        switch (l.dataset.selection) {
          case "add":
            k.conditions.push({ field: "Имя", op: "contains", value: "" });
            break;
          case "show":
            t.select(
              (n?.elements || []).filter(
                (L) => (f.includeHidden || !L.hidden) && ne(L, k)
              ).map((L) => L.id)
            );
            return;
          case "include": {
            const L = t.selected();
            if (!L.length) throw Error("Выделите элементы в 3D-сцене.");
            k.include = [.../* @__PURE__ */ new Set([...k.include, ...L])], k.exclude = k.exclude.filter((X) => !L.includes(X));
            break;
          }
          case "exclude": {
            const L = t.selected();
            if (!L.length) throw Error("Выделите элементы в 3D-сцене.");
            k.exclude = [.../* @__PURE__ */ new Set([...k.exclude, ...L])], k.include = k.include.filter((X) => !L.includes(X));
            break;
          }
          case "reset":
            k.include = [], k.exclude = [];
        }
      O(), A();
      return;
    }
    if (l?.id === "prev-page" && (h--, I()), l?.id === "next-page" && (h++, I()), l?.id === "show-markers" && (g = !g, l.textContent = g ? "● Знаки включены" : "○ Знаки выключены", l.setAttribute("aria-checked", String(g)), B()), l?.id === "bulk") {
      const S = c("bulk-state").value;
      for (const k of f.results) M.has(k.id) && (k.state = S);
      b(), I(), Q(), $(), B();
    }
    if (l?.id === "focus" && z(d, !0), l?.id === "previous" || l?.id === "next") {
      const S = j(), k = S.findIndex((L) => L.id === d) + (l.id === "next" ? 1 : -1);
      S[k] && (h = Math.floor(k / 50), I(), z(S[k].id, !0));
    }
    if (l?.id === "export-html" || l?.id === "export-viewer") {
      const S = c("selected-only").checked ? f.results.filter((k) => M.has(k.id)) : f.results;
      if (!S.length) throw Error("Нет результатов для отчёта.");
      fe(
        f.name + (l.id === "export-html" ? ".html" : ".collision360.json"),
        l.id === "export-html" ? Oe(f, S) : Ee(f, S)
      );
    }
    const w = a.closest("[data-result]");
    w && !a.closest("input") && !window.getSelection()?.toString() && z(w.dataset.result);
  }), c("content").ondblclick = (o) => {
    const a = o.target, l = a.closest("[data-result]");
    l && !a.closest("input") && y(() => z(l.dataset.result, !0));
  };
  const W = setInterval(() => {
    if (n && !t.isCurrent()) {
      n = void 0, t.clear();
      for (const o of Z.checks) o.lastRun && (o.status = "stale");
      c("model-count").textContent = "Проект изменился", C("Активный проект изменился. Обновите модели."), u || A();
    }
  }, 1500);
  return A(), () => {
    clearInterval(W), p = !0, E?.(), m?.terminate(), t.clear();
  };
}
var re = /* @__PURE__ */ ((e) => (e.object = "object", e.drawing = "drawing", e.table = "table", e.record = "record", e.textStyle = "textstyle", e.textStyleTable = "textstyles", e.linetype = "linetype", e.linetypeTable = "linetypes", e.layer = "layer", e.layerTable = "layers", e.block = "block", e.blockTable = "blocks", e.layout = "layout", e.layoutTable = "layouts", e.type = "type", e.typeTable = "types", e.material = "material", e.materialTable = "materials", e.geometry = "geometry", e.geometryTable = "geometries", e.group = "group", e.groupTable = "groups", e.attachment = "attachment", e.attachmentTable = "attachments", e.entities = "entities", e.entity = "entity", e.line = "l", e.solid = "s", e.insert = "i", e.polyline = "p", e.circle = "c", e.arc = "a", e.polyline3d = "p3", e.proxy = "x", e.text = "t", e.mtext = "mt", e.wipeout = "w", e.model3d = "g", e.alignment = "al", e))(re || {});
const oe = "nashepo.checks.points", $e = "nashepo.checks.highlight";
function te(e, t, i, n = 0) {
  if (n > 12 || e == null) return;
  if (typeof e != "object") {
    i[t] = String(e);
    return;
  }
  if (Array.isArray(e)) {
    e.forEach((r, d) => te(r, `${t}[${d}]`, i, n + 1));
    return;
  }
  const s = e;
  if ("$value" in s) {
    te(s.$value, t, i, n + 1);
    return;
  }
  for (const [r, d] of Object.entries(s))
    r.startsWith("$") || te(d, t ? `${t}.${r}` : r, i, n + 1);
}
class Le {
  constructor(t) {
    this.ctx = t;
  }
  ctx;
  refs = /* @__PURE__ */ new Map();
  overlay;
  pointView;
  scannedApp;
  scannedView;
  get view() {
    return this.ctx.manager.activeWindow?.context;
  }
  get app() {
    return this.ctx.manager.activeApp;
  }
  isCurrent() {
    return this.scannedApp === this.app && this.scannedView === this.view;
  }
  async scan(t, i) {
    const n = this.app, s = this.view, r = n?.model;
    if (!s || !r?.layouts || !r.attachments)
      throw Error(
        "Откройте проект Топоматик 360 с IFC или SMDX и сделайте его 3D-окно активным."
      );
    const d = [], h = [], u = [], p = /* @__PURE__ */ new Map(), m = /* @__PURE__ */ new Set();
    let g = 0, x = 2166136261;
    const M = (v) => {
      for (let c = 0; c < v.length; c++)
        x = Math.imul(x ^ v.charCodeAt(c), 16777619);
    }, E = async (v, c, C) => {
      if (m.has(v)) return;
      m.add(v);
      const y = v.layers.layer0?.modelName || c, b = c;
      d.push({ id: b, name: y });
      const O = [];
      v.layouts.model?.walk((j) => (j.type === re.model3d ? O.push(j) : j.type === re.insert && h.push(`${y}: вставка блока не включена в расчёт.`), !1));
      const Y = /* @__PURE__ */ new Map();
      for (const j of O) {
        const $ = JSON.stringify([
          j.layer?.UUID || "",
          j.$id || j.$path
        ]);
        Y.set($, [j]);
      }
      for (const [j, $] of Y) {
        if (i()) throw Error("Чтение моделей отменено.");
        if (n !== this.app || s !== this.view)
          throw Error(
            "Активный проект изменился. Запустите чтение моделей заново."
          );
        const R = $[0].layer, A = {};
        try {
          if (R) {
            const D = [];
            let H = R;
            for (; H && D.length < 64; )
              D.unshift(H), H = H.layer;
            for (const W of D)
              te(W.typedProperties(), "", A), W.typed?.name && (A.Тип = W.typed.name);
          }
        } catch {
          h.push(`${y} / ${j}: часть свойств недоступна.`);
        }
        const I = Object.entries(A).find(
          ([D]) => /(^|\.)(globalid|ifcguid|guid)$/i.test(D)
        )?.[1] || "", Q = R?.name || $[0].$id || "Элемент", B = JSON.stringify([b, j]);
        Object.assign(A, {
          Модель: y,
          Имя: Q,
          GUID: I,
          Объект: R?.UUID || j
        });
        const z = [];
        let J = !0, G = !1;
        for (const D of $) {
          J &&= D.isClosed;
          for (const H of Object.values(D.meshes)) {
            const W = H.geometry;
            if (!W) {
              G = !0;
              continue;
            }
            J &&= H.isClosed;
            const { vertices: o, indices: a } = W;
            if (a.length % 3) {
              G = !0;
              continue;
            }
            for (let l = 0; l < a.length; l += 3) {
              const f = [];
              for (let w = 0; w < 3; w++) {
                const S = a[l + w] * 3, k = [o[S], o[S + 1], o[S + 2]];
                Math3d.mat4.mulv3(k, D.matrix, k), f.push(...k);
              }
              if (f.every(Number.isFinite) ? z.push(...f) : G = !0, l % 3e4 === 0 && (t(
                `Чтение геометрии: ${y} · ${u.length} элементов`
              ), await new Promise((w) => setTimeout(w, 0)), i()))
                throw Error("Чтение моделей отменено.");
            }
          }
        }
        if (G || !z.length) {
          if (h.push(
            `${y} / ${Q}: геометрия отсутствует или неполна.`
          ), !z.length) continue;
          J = !1;
        }
        if (g += z.length, g > 54e6)
          throw Error(
            "Модели содержат более 6 млн треугольников. Откройте меньший состав моделей."
          );
        const V = {
          id: B,
          name: Q,
          model: y,
          modelId: b,
          guid: I,
          properties: A,
          hidden: C || !!R?.resolveHidden() || !!R?.resolveDisabled(),
          triangles: new Float64Array(z),
          closed: J,
          bounds: ce(z)
        };
        M(JSON.stringify([B, A, V.hidden, z])), u.push(V), p.set(B, $);
      }
      const N = [];
      v.attachments.forEach((j) => {
        N.push(j);
      });
      for (const j of N)
        j.model ? await E(
          j.model,
          `${c}/${j.name || j.uri || j.$id}`,
          C || j.hidden
        ) : h.push(
          `${j.name || j.uri || "Подключённая модель"}: модель не загружена. Откройте её перед расчётом.`
        );
    };
    if (await E(r, r.layers.layer0?.modelName || "Проект", !1), !u.length)
      throw Error(
        "В открытом проекте не найдены 3D-элементы с доступной геометрией."
      );
    return this.clear(), this.refs = p, this.scannedApp = n, this.scannedView = s, {
      elements: u,
      fingerprint: `${u.length}:${x >>> 0}`,
      warnings: [...new Set(h)],
      models: d
    };
  }
  selected() {
    if (!this.isCurrent())
      throw Error("Сначала обновите модели текущего проекта.");
    const t = new Set(this.view?.layer.selectedObjects());
    return [...this.refs].filter(([, i]) => i.some((n) => t.has(n))).map(([i]) => i);
  }
  select(t) {
    if (!this.isCurrent())
      throw Error("Сначала обновите модели текущего проекта.");
    const i = new Set(t.flatMap((n) => this.refs.get(n) || []));
    this.view.layer.clearSelected(), this.view.layer.selectObjects((n) => i.has(n), !0), this.view.invalidate();
  }
  clear() {
    if (this.overlay && (this.overlay.view.layer.removeLayer(this.overlay.layer), this.overlay.view.invalidate(), this.overlay = void 0), this.pointView) {
      const t = this.pointView.annotations.get(oe);
      t && this.pointView.annotations.release(t), this.pointView.invalidate(), this.pointView = void 0;
    }
  }
  focus(t, i) {
    if (!this.isCurrent())
      throw Error("Обновите модели текущего проекта перед переходом.");
    if (!Number.isFinite(i) || i < 0.5)
      throw Error("Дистанция камеры должна быть не менее 0,5 м.");
    if (!this.refs.has(t.a.id) || !this.refs.has(t.b.id))
      throw Error("Один из элементов отсутствует в загруженных моделях.");
    this.select([t.a.id, t.b.id]), this.highlight([t.a.id, t.b.id]);
    const n = t.point, s = this.view;
    s.camera?.id !== "3d" && s.setCameraType("3d");
    const r = [-0.65, 0.65, -0.394], d = Math.hypot(...r);
    r.forEach((h, u) => r[u] = h / d), s.lookAt(
      n.map((h, u) => h - r[u] * i),
      r,
      [0, 0, 1],
      !0,
      n
    );
  }
  highlight(t) {
    this.overlay && (this.overlay.view.layer.removeLayer(this.overlay.layer), this.overlay = void 0);
    const i = this.view, n = t.flatMap((d) => this.refs.get(d) || []), r = {
      id: $e,
      order: 1e4,
      visible: !0,
      paint: () => {
      },
      paint3d: (d) => {
        const h = d.color;
        d.color = 4281743103;
        try {
          for (const u of n) {
            d.pushMatrix();
            try {
              d.multMatrix(u.matrix);
              for (const p of Object.values(u.meshes))
                p.geometry && d.mesh(p.geometry);
            } finally {
              d.popMatrix();
            }
          }
        } finally {
          d.color = h;
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
    };
    i.layer.addLayer(r), this.overlay = { view: i, layer: r }, i.invalidate();
  }
  markers(t, i, n, s) {
    if (!this.isCurrent()) return;
    const r = this.view;
    this.pointView && this.pointView !== r && this.clear();
    const d = r.annotations.get(oe);
    if (d && r.annotations.release(d), this.pointView = r, !n) {
      r.invalidate();
      return;
    }
    const h = r.annotations.create(oe, 1e4), u = t.filter((p) => p.id !== i).concat(t.filter((p) => p.id === i));
    for (const p of u.slice(-3e3)) {
      if (p.state === "resolved") continue;
      const [m, g, x] = p.point, M = p.id === i, E = p.state === "excluded" ? "#78818c" : p.state === "approved" || p.state === "reviewed" ? "#28b94b" : "#e1372d", v = M ? "#f2c94c" : E, c = () => s(p.id), C = [
        { type: "line", a: [m, g, x], b: [m, g, x + 1], color: v, width: 5 },
        {
          type: "polyline",
          points: [
            [m - 0.65, g, x + 1],
            [m + 0.65, g, x + 1],
            [m, g, x + 2.2],
            [m - 0.65, g, x + 1]
          ],
          color: v,
          fillColor: E,
          width: M ? 5 : 2
        },
        {
          type: "line",
          a: [m, g - 0.01, x + 1.85],
          b: [m, g - 0.01, x + 1.4],
          color: "#ffffff",
          width: 4
        },
        {
          type: "line",
          a: [m, g - 0.01, x + 1.22],
          b: [m, g - 0.01, x + 1.27],
          color: "#ffffff",
          width: 4
        }
      ];
      h.add({
        id: p.id,
        type: "shaped",
        shapes: C,
        activeShapes: C,
        activateCommand: c,
        dblCommand: c
      }), M && h.add({
        id: p.id + ":label",
        type: "simple",
        position: [m, g, x + 2.35],
        label: `${p.a.name} × ${p.b.name}`,
        labelBackground: "#f2c94c",
        labelColor: "#171717",
        activateCommand: c
      });
    }
    r.invalidate();
  }
}
let me;
const Re = {
  open(e) {
    e.manager.revealView("nashepo.collisionfinder360/checks_panel");
  },
  mount(e) {
    const t = e.el;
    if (!t) return;
    me?.();
    const i = document.createElement("div");
    i.style.height = "100%", t.replaceChildren(i), me = Ne(i, new Le(e));
  }
};
export {
  Re as default
};
