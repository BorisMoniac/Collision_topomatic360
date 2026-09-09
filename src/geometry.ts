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
const unit = (a: Vec): Vec | undefined => {
  const length = norm(a);
  return length > 1e-20
    ? [a[0] / length, a[1] / length, a[2] / length]
    : undefined;
};
export const triangleCount = (e: GeometryElement) =>
  e.triangleCount ??
  (e.indices ? e.indices.length / 3 : e.triangles.length / 9);
const coordinate = (e: GeometryElement, i: number, k: number) =>
  e.indices && e.vertices
    ? e.vertices[e.indices[i * 3 + Math.floor(k / 3)] * 3 + (k % 3)]
    : e.triangles[i * 9 + k];
const tri = (e: GeometryElement, i: number): Vec[] =>
  [0, 3, 6].map((k) => [
    coordinate(e, i, k),
    coordinate(e, i, k + 1),
    coordinate(e, i, k + 2),
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
        v = coordinate(e, i, j);
      box.min[k] = Math.min(box.min[k], v);
      box.max[k] = Math.max(box.max[k], v);
    }
  if (ids.length <= 12) return { ...box, ids };
  const lengths = box.max.map((v, k) => v - box.min[k]);
  const axis = lengths.indexOf(Math.max(...lengths));
  const center = (i: number) =>
    coordinate(e, i, axis) +
    coordinate(e, i, axis + 3) +
    coordinate(e, i, axis + 6);
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
function* queryPairs(
  a: Node,
  b: Node,
  eps: number,
): Generator<[number, number]> {
  if (!overlap(a, b, eps)) return;
  if (a.ids && b.ids) {
    for (const ai of a.ids) for (const bi of b.ids) yield [ai, bi];
    return;
  }
  if (a.ids) {
    yield* queryPairs(a, b.left!, eps);
    yield* queryPairs(a, b.right!, eps);
    return;
  }
  if (b.ids) {
    yield* queryPairs(a.left!, b, eps);
    yield* queryPairs(a.right!, b, eps);
    return;
  }
  yield* queryPairs(a.left!, b.left!, eps);
  yield* queryPairs(a.left!, b.right!, eps);
  yield* queryPairs(a.right!, b.left!, eps);
  yield* queryPairs(a.right!, b.right!, eps);
}
function buildElements(elements: GeometryElement[], ids: number[]): Node {
  const box: Box = {
    min: [Infinity, Infinity, Infinity],
    max: [-Infinity, -Infinity, -Infinity],
  };
  for (const id of ids)
    for (let k = 0; k < 3; k++) {
      box.min[k] = Math.min(box.min[k], elements[id].bounds.min[k]);
      box.max[k] = Math.max(box.max[k], elements[id].bounds.max[k]);
    }
  if (ids.length <= 16) return { ...box, ids };
  const spans = box.max.map((v, k) => v - box.min[k]),
    axis = spans.indexOf(Math.max(...spans));
  ids.sort(
    (a, b) =>
      elements[a].bounds.min[axis] +
      elements[a].bounds.max[axis] -
      (elements[b].bounds.min[axis] + elements[b].bounds.max[axis]),
  );
  const mid = ids.length >> 1;
  return {
    ...box,
    left: buildElements(elements, ids.slice(0, mid)),
    right: buildElements(elements, ids.slice(mid)),
  };
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
/**
 * Local triangle-pair penetration used by normal Hard Clash methods.
 * For each triangle plane, move the other triangle to the nearer side of the
 * plane. The smaller of the two face-normal translations is the pair depth.
 * Unlike an AABB overlap, this value follows the actual triangle orientation.
 */
function trianglePairPenetration(a: Vec[], b: Vec[]): number {
  const alongPlane = (plane: Vec[], moving: Vec[]) => {
    const n = unit(cross(sub(plane[1], plane[0]), sub(plane[2], plane[0])));
    if (!n) return Infinity;
    const distances = moving.map((p) => dot(sub(p, plane[0]), n));
    const min = Math.min(...distances),
      max = Math.max(...distances);
    if (!(min < 0 && max > 0)) return 0;
    return Math.min(-min, max);
  };
  return Math.min(alongPlane(a, b), alongPlane(b, a));
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
function boxDistance(p: Vec, box: Box): number {
  return Math.hypot(
    ...p.map((v, k) => Math.max(box.min[k] - v, 0, v - box.max[k])),
  );
}
function pointTriangleDistance(p: Vec, t: Vec[]): number {
  const ab = sub(t[1], t[0]),
    ac = sub(t[2], t[0]),
    ap = sub(p, t[0]);
  const d1 = dot(ab, ap),
    d2 = dot(ac, ap);
  if (d1 <= 0 && d2 <= 0) return norm(ap);
  const bp = sub(p, t[1]),
    d3 = dot(ab, bp),
    d4 = dot(ac, bp);
  if (d3 >= 0 && d4 <= d3) return norm(bp);
  const vc = d1 * d4 - d3 * d2;
  if (vc <= 0 && d1 >= 0 && d3 <= 0) {
    const v = d1 / (d1 - d3);
    return norm(sub(p, add(t[0], ab, v)));
  }
  const cp = sub(p, t[2]),
    d5 = dot(ab, cp),
    d6 = dot(ac, cp);
  if (d6 >= 0 && d5 <= d6) return norm(cp);
  const vb = d5 * d2 - d1 * d6;
  if (vb <= 0 && d2 >= 0 && d6 <= 0) {
    const w = d2 / (d2 - d6);
    return norm(sub(p, add(t[0], ac, w)));
  }
  const va = d3 * d6 - d5 * d4;
  if (va <= 0 && d4 - d3 >= 0 && d5 - d6 >= 0) {
    const edge = sub(t[2], t[1]),
      w = (d4 - d3) / (d4 - d3 + (d5 - d6));
    return norm(sub(p, add(t[1], edge, w)));
  }
  const n = cross(ab, ac);
  return Math.abs(dot(ap, n)) / Math.max(norm(n), 1e-30);
}
function nearestSurface(p: Vec, e: GeometryElement, tree: Node): number {
  let best = Infinity;
  const visit = (node: Node) => {
    if (boxDistance(p, node) >= best) return;
    if (node.ids) {
      for (const id of node.ids)
        best = Math.min(best, pointTriangleDistance(p, tri(e, id)));
      return;
    }
    const left = node.left!,
      right = node.right!;
    if (boxDistance(p, left) < boxDistance(p, right)) {
      visit(left);
      visit(right);
    } else {
      visit(right);
      visit(left);
    }
  };
  visit(tree);
  return best;
}
async function penetrationEstimate(
  x: GeometryElement,
  y: GeometryElement,
  xt: Node,
  yt: Node,
  point: Vec,
  triangleDepth: number,
  eps: number,
  checkpoint: () => Promise<void>,
): Promise<number> {
  let depth = triangleDepth;
  const measure = (p: Vec, other: GeometryElement, tree: Node) => {
    if (inside(p, other, tree, eps))
      depth = Math.max(depth, nearestSurface(p, other, tree));
  };
  measure(point, x, xt);
  measure(point, y, yt);
  let sampled = 0;
  for (const [first, other, tree] of [
    [x, y, yt],
    [y, x, xt],
  ] as const) {
    const count = triangleCount(first),
      step = Math.max(1, Math.floor(count / 1024));
    for (let i = 0; i < count; i += step) {
      const t = tri(first, i),
        center = t[0].map((_, k) => (t[0][k] + t[1][k] + t[2][k]) / 3) as Vec,
        ab = t[0].map((_, k) => (t[0][k] + t[1][k]) / 2) as Vec,
        bc = t[0].map((_, k) => (t[1][k] + t[2][k]) / 2) as Vec,
        ca = t[0].map((_, k) => (t[2][k] + t[0][k]) / 2) as Vec;
      for (const p of [t[0], t[1], t[2], ab, bc, ca, center])
        measure(p, other, tree);
      if (sampled++ % 32 === 0) await checkpoint();
    }
  }
  // AABB overlap is not a penetration depth. For pipes and fittings it often
  // equals a diameter even when only faceted boundary surfaces meet.
  return depth >= eps ? depth * 1000 : 0;
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
  load?: (id: string) => Promise<GeometryElement>,
): Promise<Clash[]> {
  const eps = check.precision / 1000;
  if (!Number.isFinite(eps) || eps <= 0)
    throw Error("Точность расчёта должна быть положительным числом.");
  const chosen = elements.filter((e) => check.includeHidden || !e.hidden),
    a = chosen.filter((e) => matches(e, check.a)),
    b = chosen.filter((e) => matches(e, check.b));
  if (!a.length || !b.length)
    throw Error(
      "Выборка А или Б не содержит элементов. Отметьте хотя бы одну модель в каждой стороне проверки.",
    );
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
        Array.from({ length: triangleCount(e) }, (_, i) => i),
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
    for (let i = 0; i < triangleCount(e); i++) {
      rows.push(
        [0, 3, 6]
          .map((j) =>
            [0, 1, 2]
              .map((k) => Math.round(coordinate(e, i, j + k) / eps))
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
    aIds = new Set(a.map((e) => e.id)),
    bIds = new Set(b.map((e) => e.id)),
    elementTree = buildElements(
      b,
      b.map((_, i) => i),
    );
  const cache = new Map<string, GeometryElement>();
  let bytes = 0;
  const size = (e: GeometryElement) =>
    e.triangles.byteLength +
    (e.vertices?.byteLength || 0) +
    (e.indices?.byteLength || 0) +
    triangleCount(e) * 32;
  async function hydrate(meta: GeometryElement, keep?: string) {
    if (!load) return meta;
    let value = cache.get(meta.id);
    if (value) {
      cache.delete(meta.id);
      cache.set(meta.id, value);
      return value;
    }
    for (const [id, e] of cache) {
      if (id !== keep && bytes > 96 * 1024 * 1024) {
        cache.delete(id);
        bytes -= size(e);
        trees.delete(id);
        signatures.delete(id);
      }
    }
    value = await load(meta.id);
    cache.set(meta.id, value);
    bytes += size(value);
    return value;
  }
  let lastProgress = -Infinity;
  for (let ai = 0; ai < a.length; ai++) {
    const xm = a[ai];
    if (performance.now() - lastProgress > 150) {
      lastProgress = performance.now();
      progress({
        phase: "Проверка пар",
        done: ai,
        total: a.length,
        found: found.length,
      });
    }
    const candidates = [...query(elementTree, xm.bounds, eps)];
    for (let ci = 0; ci < candidates.length; ci++) {
      const bi = candidates[ci];
      if (performance.now() - lastProgress > 150) {
        lastProgress = performance.now();
        progress({
          phase: `Проверка пар · A ${ai + 1}/${a.length} · кандидаты ${ci + 1}/${candidates.length}`,
          done: ai,
          total: a.length,
          found: found.length,
        });
      }
      const ym = b[bi];
      await checkpoint();
      if (xm.id === ym.id || !overlap(xm.bounds, ym.bounds, eps)) continue;
      if (check.ignoreSameModel && xm.modelId === ym.modelId) continue;
      if (
        check.ignoreSameGroup &&
        xm.modelId === ym.modelId &&
        xm.properties["Объект"] &&
        xm.properties["Объект"] === ym.properties["Объект"]
      )
        continue;
      if (
        check.equalProperty &&
        xm.properties[check.equalProperty] !== undefined &&
        xm.properties[check.equalProperty] ===
          ym.properties[check.equalProperty]
      )
        continue;
      if (xm.id > ym.id && aIds.has(ym.id) && bIds.has(xm.id)) continue;
      const id = pairKey(xm.id, ym.id);
      const x = await hydrate(xm),
        y = await hydrate(ym, xm.id);
      let point: Vec | undefined,
        kind: Clash["kind"] = "surface",
        penetrationMm = 0;
      if (check.type === "duplicates") {
        if (
          triangleCount(x) !== triangleCount(y) ||
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
        let triangleDepth = 0,
          testedPairs = 0;
        for (const [i, j] of queryPairs(xt, yt, eps)) {
          const tx = tri(x, i),
            ty = tri(y, j);
          if (!overlap(bounds(tx.flat()), bounds(ty.flat()), eps)) continue;
          const hit = trianglesIntersect(tx, ty, eps, check.touching);
          if (hit) {
            const localDepth = check.touching
              ? trianglePairPenetration(tx, ty)
              : Math.max(trianglePairPenetration(tx, ty), eps);
            if (!point || localDepth > triangleDepth) point = hit;
            triangleDepth = Math.max(triangleDepth, localDepth);
          }
          if (++testedPairs % 256 === 0) {
            if (performance.now() - lastProgress > 150) {
              lastProgress = performance.now();
              progress({
                phase: `Геометрия пары · A ${ai + 1}/${a.length}`,
                done: ai,
                total: a.length,
                found: found.length,
              });
            }
            await checkpoint();
          }
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
            for (let i = 0; i < triangleCount(first) && !point; i++) {
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
        if (point)
          penetrationMm = await penetrationEstimate(
            x,
            y,
            xt,
            yt,
            point,
            triangleDepth,
            eps,
            checkpoint,
          );
        if (point && penetrationMm + check.precision < check.minPenetration)
          continue;
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
          penetrationMm,
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
