import {
  Check,
  Clash,
  GeometryElement,
  Vec,
  info,
  matches,
  pairKey,
} from "./domain";
type Box = { min: Vec; max: Vec };
type Node = Box & { left?: Node; right?: Node; ids?: number[] };
const sub = (a: Vec, b: Vec): Vec => [a[0] - b[0], a[1] - b[1], a[2] - b[2]];
const add = (a: Vec, b: Vec, t = 1): Vec => [
  a[0] + b[0] * t,
  a[1] + b[1] * t,
  a[2] + b[2] * t,
];
const dot = (a: Vec, b: Vec) => a[0] * b[0] + a[1] * b[1] + a[2] * b[2];
const cross = (a: Vec, b: Vec): Vec => [
  a[1] * b[2] - a[2] * b[1],
  a[2] * b[0] - a[0] * b[2],
  a[0] * b[1] - a[1] * b[0],
];
const norm = (a: Vec) => Math.hypot(...a);
const tri = (e: GeometryElement, i: number): Vec[] =>
  [0, 3, 6].map((k) => [
    e.triangles[i * 9 + k],
    e.triangles[i * 9 + k + 1],
    e.triangles[i * 9 + k + 2],
  ]);
export function bounds(points: ArrayLike<number>): Box {
  const min: Vec = [Infinity, Infinity, Infinity],
    max: Vec = [-Infinity, -Infinity, -Infinity];
  for (let i = 0; i < points.length; i++) {
    const k = i % 3;
    min[k] = Math.min(min[k], points[i]);
    max[k] = Math.max(max[k], points[i]);
  }
  return { min, max };
}
const overlap = (a: Box, b: Box, eps: number) =>
  a.min.every((v, k) => v <= b.max[k] + eps && a.max[k] >= b.min[k] - eps);
function build(e: GeometryElement, ids: number[]): Node {
  const box: Box = {
    min: [Infinity, Infinity, Infinity],
    max: [-Infinity, -Infinity, -Infinity],
  };
  for (const i of ids)
    for (let j = 0; j < 9; j++) {
      const k = j % 3,
        v = e.triangles[i * 9 + j];
      box.min[k] = Math.min(box.min[k], v);
      box.max[k] = Math.max(box.max[k], v);
    }
  if (ids.length <= 12) return { ...box, ids };
  const lengths = box.max.map((v, k) => v - box.min[k]);
  const axis = lengths.indexOf(Math.max(...lengths));
  const center = (i: number) =>
    e.triangles[i * 9 + axis] +
    e.triangles[i * 9 + axis + 3] +
    e.triangles[i * 9 + axis + 6];
  ids.sort((a, b) => center(a) - center(b));
  const mid = ids.length >> 1;
  return {
    ...box,
    left: build(e, ids.slice(0, mid)),
    right: build(e, ids.slice(mid)),
  };
}
function* query(n: Node, box: Box, eps: number): Generator<number> {
  if (!overlap(n, box, eps)) return;
  if (n.ids) yield* n.ids;
  else {
    yield* query(n.left!, box, eps);
    yield* query(n.right!, box, eps);
  }
}
function segmentTriangle(
  a: Vec,
  b: Vec,
  t: Vec[],
  eps: number,
): Vec | undefined {
  const dir = sub(b, a),
    e1 = sub(t[1], t[0]),
    e2 = sub(t[2], t[0]),
    p = cross(dir, e2),
    det = dot(e1, p);
  if (Math.abs(det) <= 1e-12 * norm(dir) * norm(e1) * norm(e2)) return;
  const inv = 1 / det,
    s = sub(a, t[0]),
    u = dot(s, p) * inv,
    q = cross(s, e1),
    v = dot(dir, q) * inv,
    w = dot(e2, q) * inv;
  const tol = eps / Math.max(norm(e1), norm(e2), eps);
  if (u >= -tol && v >= -tol && u + v <= 1 + tol && w >= -tol && w <= 1 + tol)
    return add(a, dir, Math.max(0, Math.min(1, w)));
}
function coplanarPoint(
  a: Vec[],
  b: Vec[],
  normal: Vec,
  eps: number,
): Vec | undefined {
  const axis = normal.map(Math.abs).indexOf(Math.max(...normal.map(Math.abs)));
  const axes = [0, 1, 2].filter((k) => k !== axis);
  const orient = (p: Vec, q: Vec, r: Vec) =>
    (q[axes[0]] - p[axes[0]]) * (r[axes[1]] - p[axes[1]]) -
    (q[axes[1]] - p[axes[1]]) * (r[axes[0]] - p[axes[0]]);
  const inside = (p: Vec, t: Vec[]) => {
    const v = t.map((q, i) => orient(q, t[(i + 1) % 3], p));
    return (
      v.every((x) => x >= -eps * norm(normal)) ||
      v.every((x) => x <= eps * norm(normal))
    );
  };
  for (const p of a) if (inside(p, b)) return p;
  for (const p of b) if (inside(p, a)) return p;
  for (let i = 0; i < 3; i++)
    for (let j = 0; j < 3; j++) {
      const p = a[i],
        q = a[(i + 1) % 3],
        r = b[j],
        s = b[(j + 1) % 3];
      const d = sub(q, p),
        f = sub(s, r);
      const den = d[axes[0]] * f[axes[1]] - d[axes[1]] * f[axes[0]];
      if (Math.abs(den) < 1e-18) continue;
      const v = sub(r, p);
      const u = (v[axes[0]] * f[axes[1]] - v[axes[1]] * f[axes[0]]) / den;
      const w = (v[axes[0]] * d[axes[1]] - v[axes[1]] * d[axes[0]]) / den;
      if (u >= 0 && u <= 1 && w >= 0 && w <= 1) return add(p, d, u);
    }
}
export function trianglesIntersect(
  a: Vec[],
  b: Vec[],
  eps: number,
  touching: boolean,
): Vec | undefined {
  const an = cross(sub(a[1], a[0]), sub(a[2], a[0])),
    bn = cross(sub(b[1], b[0]), sub(b[2], b[0]));
  const al = norm(an),
    bl = norm(bn);
  if (al < 1e-20 || bl < 1e-20) return;
  const ad = b.map((p) => dot(sub(p, a[0]), an) / al),
    bd = a.map((p) => dot(sub(p, b[0]), bn) / bl);
  if (
    ad.every((x) => x > eps) ||
    ad.every((x) => x < -eps) ||
    bd.every((x) => x > eps) ||
    bd.every((x) => x < -eps)
  )
    return;
  if (
    ad.every((x) => Math.abs(x) <= eps) &&
    bd.every((x) => Math.abs(x) <= eps)
  )
    return touching ? coplanarPoint(a, b, an, eps) : undefined;
  if (
    !touching &&
    (!(Math.min(...ad) < -eps && Math.max(...ad) > eps) ||
      !(Math.min(...bd) < -eps && Math.max(...bd) > eps))
  )
    return;
  for (let i = 0; i < 3; i++) {
    const p = segmentTriangle(a[i], a[(i + 1) % 3], b, eps);
    if (p) return p;
    const q = segmentTriangle(b[i], b[(i + 1) % 3], a, eps);
    if (q) return q;
  }
}
function pointOnTriangle(p: Vec, t: Vec[], eps: number): boolean {
  const u = sub(t[1], t[0]),
    v = sub(t[2], t[0]),
    n = cross(u, v),
    len = norm(n);
  if (len < 1e-20 || Math.abs(dot(sub(p, t[0]), n)) / len > eps) return false;
  const w = sub(p, t[0]),
    uu = dot(u, u),
    uv = dot(u, v),
    vv = dot(v, v),
    wu = dot(w, u),
    wv = dot(w, v),
    den = uu * vv - uv * uv;
  if (Math.abs(den) < 1e-30) return false;
  const s = (wu * vv - wv * uv) / den,
    r = (wv * uu - wu * uv) / den,
    tol = eps / Math.max(norm(u), norm(v), eps);
  return s >= -tol && r >= -tol && s + r <= 1 + tol;
}
function inside(p: Vec, e: GeometryElement, tree: Node, eps: number): boolean {
  if (
    !e.closed ||
    p.some((v, k) => v <= e.bounds.min[k] + eps || v >= e.bounds.max[k] - eps)
  )
    return false;
  for (const i of query(tree, { min: p, max: p }, eps))
    if (pointOnTriangle(p, tri(e, i), eps)) return false;
  const direction: Vec = [1, 0.371390676, 0.52999894];
  const extent = norm(sub(e.bounds.max, e.bounds.min)) * 3 + 1;
  const end = add(p, direction, extent),
    hits: number[] = [];
  const box = bounds([...p, ...end]);
  for (const i of query(tree, box, eps)) {
    const hit = segmentTriangle(p, end, tri(e, i), eps);
    if (hit) {
      const d = norm(sub(hit, p));
      if (d > eps) hits.push(d);
    }
  }
  hits.sort((a, b) => a - b);
  let n = 0,
    last = -Infinity;
  for (const d of hits)
    if (d - last > eps * 2) {
      n++;
      last = d;
    }
  return n % 2 === 1;
}
export interface RunProgress {
  phase: string;
  done: number;
  total: number;
  found: number;
}
export async function calculate(
  elements: GeometryElement[],
  check: Check,
  progress: (p: RunProgress) => void,
  aborted: () => boolean,
): Promise<Clash[]> {
  const eps = check.precision / 1000;
  if (!Number.isFinite(eps) || eps <= 0)
    throw Error("Точность расчёта должна быть положительным числом.");
  const chosen = elements.filter((e) => check.includeHidden || !e.hidden),
    a = chosen.filter((e) => matches(e, check.a)),
    b = chosen.filter((e) => matches(e, check.b));
  if (!a.length || !b.length)
    throw Error("Выборка А или Б пуста. Проверьте модели и условия.");
  let tick = performance.now();
  const checkpoint = async () => {
    if (aborted())
      throw Error("Расчёт отменён. Предыдущие результаты сохранены.");
    if (performance.now() - tick > 16) {
      await new Promise((r) => setTimeout(r, 0));
      tick = performance.now();
    }
  };
  const trees = new Map<string, Node>();
  const getTree = (e: GeometryElement) => {
    let n = trees.get(e.id);
    if (!n) {
      n = build(
        e,
        Array.from({ length: e.triangles.length / 9 }, (_, i) => i),
      );
      trees.set(e.id, n);
    }
    return n;
  };
  const signatures = new Map<string, string>();
  const signature = async (e: GeometryElement) => {
    let s = signatures.get(e.id);
    if (s !== undefined) return s;
    const rows: string[] = [];
    for (let i = 0; i < e.triangles.length; i += 9) {
      rows.push(
        [0, 3, 6]
          .map((j) =>
            [0, 1, 2]
              .map((k) => Math.round(e.triangles[i + j + k] / eps))
              .join(","),
          )
          .sort()
          .join(";"),
      );
      if (i % 9000 === 0) await checkpoint();
    }
    s = rows.sort().join("|");
    signatures.set(e.id, s);
    return s;
  };
  const found: Clash[] = [],
    seen = new Set<string>(),
    sorted = b.slice().sort((x, y) => x.bounds.min[0] - y.bounds.min[0]);
  let pairs = 0;
  for (let ai = 0; ai < a.length; ai++) {
    const x = a[ai];
    progress({
      phase: "Проверка пар",
      done: ai,
      total: a.length,
      found: found.length,
    });
    for (const y of sorted) {
      if (y.bounds.min[0] > x.bounds.max[0] + eps) break;
      await checkpoint();
      if (x.id === y.id || !overlap(x.bounds, y.bounds, eps)) continue;
      if (check.ignoreSameModel && x.modelId === y.modelId) continue;
      if (
        check.ignoreSameGroup &&
        x.modelId === y.modelId &&
        x.properties["Объект"] &&
        x.properties["Объект"] === y.properties["Объект"]
      )
        continue;
      if (
        check.equalProperty &&
        x.properties[check.equalProperty] !== undefined &&
        x.properties[check.equalProperty] === y.properties[check.equalProperty]
      )
        continue;
      const id = pairKey(x.id, y.id);
      if (seen.has(id)) continue;
      seen.add(id);
      if (++pairs > 2000000)
        throw Error(
          "Слишком много близких пар. Уточните выборки и запустите проверку снова. Предыдущие результаты сохранены.",
        );
      let point: Vec | undefined,
        kind: Clash["kind"] = "surface";
      if (check.type === "duplicates") {
        if (
          x.triangles.length !== y.triangles.length ||
          x.bounds.min.some(
            (v, k) =>
              Math.abs(v - y.bounds.min[k]) > eps ||
              Math.abs(x.bounds.max[k] - y.bounds.max[k]) > eps,
          )
        )
          continue;
        if ((await signature(x)) === (await signature(y))) {
          point = x.bounds.min.map((v, k) => (v + x.bounds.max[k]) / 2) as Vec;
          kind = "duplicate";
        }
      } else {
        const xt = getTree(x),
          yt = getTree(y);
        for (let i = 0; i < x.triangles.length / 9 && !point; i++) {
          const t = tri(x, i),
            box = bounds(t.flat());
          for (const j of query(yt, box, eps)) {
            point = trianglesIntersect(t, tri(y, j), eps, check.touching);
            if (point) break;
            await checkpoint();
          }
          await checkpoint();
        }
        if (!point && x.closed && y.closed) {
          const center = x.bounds.min.map(
            (v, k) => (v + x.bounds.max[k]) / 2,
          ) as Vec;
          if (inside(center, x, xt, eps) && inside(center, y, yt, eps)) {
            point = center;
            kind = "contained";
          }
        }
        // Closed solids can overlap without a crossing between their boundary triangles.
        if (!point)
          for (const [first, other, tree] of [
            [x, y, yt],
            [y, x, xt],
          ] as const) {
            if (!other.closed) continue;
            for (let i = 0; i < first.triangles.length / 9 && !point; i++) {
              const t = tri(first, i),
                center = t[0].map(
                  (_, k) => (t[0][k] + t[1][k] + t[2][k]) / 3,
                ) as Vec;
              for (const p of [t[0], center])
                if (inside(p, other, tree, eps)) {
                  point = p;
                  kind = "contained";
                  break;
                }
              await checkpoint();
            }
            if (point) break;
          }
      }
      if (point) {
        found.push({
          id,
          a: info(x),
          b: info(y),
          point,
          kind,
          state: "new",
          note: "",
          assignee: "",
          firstSeen: "",
          lastSeen: "",
        });
        if (found.length >= 50000)
          throw Error(
            "Найдено 50 000 конфликтов. Разделите проверку на меньшие наборы. Незавершённый расчёт не заменил прошлый результат.",
          );
      }
    }
  }
  progress({
    phase: "Готово",
    done: a.length,
    total: a.length,
    found: found.length,
  });
  return found;
}
