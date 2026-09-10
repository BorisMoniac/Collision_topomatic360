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
 * Directions worth measuring a contact along: the face normals of the triangles
 * that meet. Opposite normals describe the same direction, so each is folded
 * into one half-space and rounded before it is stored.
 */
class ContactAxes {
  // The shared box bounds the contact along X, Y and Z whatever the shapes are,
  // so those three directions are always worth measuring. They stay first.
  private world: Vec[] = [
    [1, 0, 0],
    [0, 1, 0],
    [0, 0, 1],
  ];
  private items = new Map<string, Vec>();
  private step = 1e4;
  private key(u: Vec) {
    return u.map((v) => Math.round(v * this.step)).join(",");
  }
  add(t: Vec[]) {
    const n = unit(cross(sub(t[1], t[0]), sub(t[2], t[0])));
    if (!n) return;
    const flip =
      n[0] < -1e-9 ||
      (Math.abs(n[0]) <= 1e-9 &&
        (n[1] < -1e-9 || (Math.abs(n[1]) <= 1e-9 && n[2] < 0)));
    const u: Vec = flip ? [-n[0], -n[1], -n[2]] : [n[0], n[1], n[2]];
    const key = this.key(u);
    if (!this.items.has(key)) this.items.set(key, u);
    // Curved geometry can offer thousands of directions. Widening the grid
    // keeps the set bounded by the shape itself rather than by the order the
    // triangles happened to arrive in.
    while (this.items.size > 512 && this.step > 10) {
      this.step /= 10;
      const next = new Map<string, Vec>();
      for (const v of this.items.values()) {
        const k = this.key(v);
        if (!next.has(k)) next.set(k, v);
      }
      this.items = next;
    }
  }
  addFrom(e: GeometryElement, ids: number[]) {
    for (const i of ids) this.add(tri(e, i));
  }
  values(): Vec[] {
    return [
      ...this.world,
      ...[...this.items].sort((a, b) => (a[0] < b[0] ? -1 : 1)).map(([, u]) => u),
    ];
  }
}
type Span = [number, number];
/**
 * Hard Clash depth as the thickness of the worst single interference.
 *
 * Along every candidate direction both bodies cast a shadow; the length the two
 * shadows share is how far one body reaches into the other there, and the
 * smallest of those lengths is the depth. Only geometry inside the contact
 * window is projected, and every projection is clipped to it, so an oversized
 * triangle cannot inflate the value.
 *
 * A pair can meet in several places at once. `keep` carries, for each world
 * axis, the stretches that hold a single interference, and each is measured on
 * its own so the empty space between two contacts is never counted as depth.
 *
 * This is the overlap of the two bodies, not the translation that frees them:
 * pulling a bar out of a slab takes the whole length of the bar, which says
 * nothing about how serious the clash is.
 */
function overlapThickness(
  x: GeometryElement,
  y: GeometryElement,
  xIds: number[],
  yIds: number[],
  axes: Vec[],
  window: Box,
  centre: Vec,
  probe: (side: 0 | 1, p: Vec) => boolean,
): number {
  const windowSpan = (n: Vec) => {
    let low = Infinity,
      high = -Infinity;
    for (let corner = 0; corner < 8; corner++) {
      const d =
        (corner & 1 ? window.max[0] : window.min[0]) * n[0] +
        (corner & 2 ? window.max[1] : window.min[1]) * n[1] +
        (corner & 4 ? window.max[2] : window.min[2]) * n[2];
      if (d < low) low = d;
      if (d > high) high = d;
    }
    return [low, high];
  };
  // A triangle reaching into the stretch counts with its ends pulled back to
  // the stretch, so a face far larger than the contact still measures right.
  const shadow = (
    e: GeometryElement,
    ids: number[],
    n: Vec,
    from: number,
    to: number,
  ): Span | undefined => {
    let min = Infinity,
      max = -Infinity;
    for (const i of ids) {
      let low = Infinity,
        high = -Infinity;
      for (let j = 0; j < 9; j += 3) {
        const d =
          coordinate(e, i, j) * n[0] +
          coordinate(e, i, j + 1) * n[1] +
          coordinate(e, i, j + 2) * n[2];
        if (d < low) low = d;
        if (d > high) high = d;
      }
      if (high < from || low > to) continue;
      if (low < from) low = from;
      if (high > to) high = to;
      if (low < min) min = low;
      if (high > max) max = high;
    }
    return min === Infinity ? undefined : [min, max];
  };
  // Sorting every direction over a huge contact is not worth the wait. The
  // three world axes alone still bound the answer from above.
  // A shared box with no extent of its own settles the matter: the bodies meet
  // over nothing. That is a touch, or geometry too flat to hold a volume.
  if (window.min.some((v, k) => window.max[k] - v <= 0)) return 0;
  // Weighing every direction over a huge contact is not worth the wait. The set
  // is thinned by an even step rather than cut short, so what survives still
  // points all over instead of all one way.
  const step = Math.ceil((xIds.length + yIds.length) / 4096),
    list =
      step > 1
        ? axes.filter((_, index) => index < 3 || index % step === 0)
        : axes;
  // A boundary tells where a body ends, never where it continues. The space a
  // surface leaves open is probed, so a solid whose far side lies outside the
  // measured stretch still counts as filling it. Filling only ever widens a
  // shadow, so it is worth doing exactly where a direction came out empty.
  const filled = (
    side: 0 | 1,
    surf: Span | undefined,
    n: Vec,
    from: number,
    to: number,
  ): Span | undefined => {
    const at = (v: number) => add(centre, n, v - dot(centre, n));
    if (!surf) return probe(side, at((from + to) / 2)) ? [from, to] : undefined;
    let [low, high] = surf;
    if (low > from && probe(side, at((from + low) / 2))) low = from;
    if (high < to && probe(side, at((high + to) / 2))) high = to;
    return [low, high];
  };
  const span = (a: Span | undefined, b: Span | undefined) =>
    a && b ? Math.min(a[1], b[1]) - Math.max(a[0], b[0]) : 0;
  let best = Infinity,
    measured = false,
    rescues = 0;
  for (let index = 0; index < list.length; index++) {
    const n = list[index],
      [from, to] = windowSpan(n),
      a = shadow(x, xIds, n, from, to),
      b = shadow(y, yIds, n, from, to);
    let run = span(a, b);
    if (run <= 0 && rescues++ < 32)
      run = span(filled(0, a, n, from, to), filled(1, b, n, from, to));
    // A direction whose surfaces still say nothing is unusable, not an answer.
    // Only when every direction stays silent is the contact really flat.
    if (run <= 0) continue;
    measured = true;
    if (run < best) best = run;
  }
  return measured && Number.isFinite(best) ? best : 0;
}
type Limit = { n: Vec; from: number; to: number };
/** The direction a cloud of contacts spreads along the most. */
function principal(points: Vec[], centre: Vec): Vec | undefined {
  let xx = 0,
    yy = 0,
    zz = 0,
    xy = 0,
    xz = 0,
    yz = 0;
  for (const p of points) {
    const a = p[0] - centre[0],
      b = p[1] - centre[1],
      c = p[2] - centre[2];
    xx += a * a;
    yy += b * b;
    zz += c * c;
    xy += a * b;
    xz += a * c;
    yz += b * c;
  }
  let v: Vec = [1, 1, 1];
  for (let step = 0; step < 24; step++) {
    const next = unit([
      xx * v[0] + xy * v[1] + xz * v[2],
      xy * v[0] + yy * v[1] + yz * v[2],
      xz * v[0] + yz * v[1] + zz * v[2],
    ]);
    if (!next) return;
    v = next;
  }
  return v;
}
/**
 * One pair can interfere in several separate places, and the empty space
 * between two of them is not depth. Contacts are cut apart along the direction
 * they spread the most as well as along the world axes, and a cut is accepted
 * only where the space between the two sides lies outside at least one body.
 * Choosing the direction from the contacts themselves is what keeps the answer
 * the same when the same pair is turned in space.
 */
function contactZones(
  hits: Vec[],
  window: Box,
  eps: number,
  empty: (n: Vec, at: number, anchors: Vec[]) => boolean,
): { hits: Vec[]; limits: Limit[] }[] {
  const middle = window.min.map((v, k) => (v + window.max[k]) / 2) as Vec,
    diagonal = norm(sub(window.max, window.min)),
    least = Math.max(eps * 10, diagonal / 50);
  const centreOf = (list: Vec[]) =>
    [0, 1, 2].map(
      (k) => list.reduce((sum, h) => sum + h[k], 0) / list.length,
    ) as Vec;
  let zones = [{ hits, limits: [] as Limit[] }];
  for (let pass = 0; pass < 3; pass++) {
    const next: typeof zones = [];
    let cut = false;
    for (const zone of zones) {
      if (zone.hits.length < 2 || next.length + zones.length >= 8) {
        next.push(zone);
        continue;
      }
      const centre = centreOf(zone.hits),
        directions: Vec[] = [
          [1, 0, 0],
          [0, 1, 0],
          [0, 0, 1],
        ],
        main = principal(zone.hits, centre);
      if (main) directions.push(main);
      let best: { n: Vec; at: number; size: number } | undefined;
      for (const n of directions) {
        const values = zone.hits.map((h) => dot(h, n)).sort((a, b) => a - b);
        for (let i = 1; i < values.length; i++) {
          const size = values[i] - values[i - 1];
          if (size > least && (!best || size > best.size))
            best = { n, at: (values[i] + values[i - 1]) / 2, size };
        }
      }
      if (!best || !empty(best.n, best.at, [middle, centre])) {
        next.push(zone);
        continue;
      }
      cut = true;
      const low: Vec[] = [],
        high: Vec[] = [];
      for (const h of zone.hits)
        (dot(h, best.n) < best.at ? low : high).push(h);
      next.push({
        hits: low,
        limits: [...zone.limits, { n: best.n, from: -Infinity, to: best.at }],
      });
      next.push({
        hits: high,
        limits: [...zone.limits, { n: best.n, from: best.at, to: Infinity }],
      });
    }
    zones = next;
    if (!cut) break;
  }
  return zones;
}
/** Whether a triangle reaches the part of the contact a zone stands for. */
function withinLimits(e: GeometryElement, i: number, limits: Limit[]): boolean {
  return limits.every(({ n, from, to }) => {
    let low = Infinity,
      high = -Infinity;
    for (let j = 0; j < 9; j += 3) {
      const d =
        coordinate(e, i, j) * n[0] +
        coordinate(e, i, j + 1) * n[1] +
        coordinate(e, i, j + 2) * n[2];
      if (d < low) low = d;
      if (d > high) high = d;
    }
    return high >= from && low <= to;
  });
}
/**
 * Whether a mesh encloses anything at all. A sheet, a single face or a folded
 * surface holds less than a skin of tolerance thickness would, and no volume
 * means no depth to measure. Signed volume is taken about the mesh's own
 * centroid, so the answer is the same however the element is turned, which a
 * test on the world-aligned box could never promise.
 */
function volumeless(e: GeometryElement, eps: number): boolean {
  const count = triangleCount(e);
  if (!count) return true;
  const centre: Vec = [0, 0, 0];
  for (let i = 0; i < count; i++)
    for (let j = 0; j < 9; j += 3)
      for (let k = 0; k < 3; k++) centre[k] += coordinate(e, i, j + k);
  for (let k = 0; k < 3; k++) centre[k] /= count * 3;
  let volume = 0,
    area = 0;
  for (let i = 0; i < count; i++) {
    const t = tri(e, i),
      a = sub(t[0], centre),
      b = sub(t[1], centre),
      c = sub(t[2], centre);
    volume += dot(a, cross(b, c)) / 6;
    area += norm(cross(sub(t[1], t[0]), sub(t[2], t[0]))) / 2;
  }
  return Math.abs(volume) <= eps * area;
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
  const hollows = new Map<string, boolean>();
  const hollow = (e: GeometryElement) => {
    let value = hollows.get(e.id);
    if (value === undefined) {
      value = volumeless(e, eps);
      hollows.set(e.id, value);
    }
    return value;
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
        penetrationMm = 0,
        unmeasured = false;
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
        // The region both bodies share. Everything the depth is measured from
        // lives inside it, so a far away part of a composite element is out.
        const window: Box = {
          min: x.bounds.min.map((v, k) =>
            Math.max(v, y.bounds.min[k]),
          ) as Vec,
          max: x.bounds.max.map((v, k) =>
            Math.min(v, y.bounds.max[k]),
          ) as Vec,
        };
        const middle = window.min.map(
          (v, k) => (v + window.max[k]) / 2,
        ) as Vec;
        const axes = new ContactAxes();
        // Where the pair touches, kept thinned out so a huge contact stays
        // affordable while the large scale picture survives.
        const hits: Vec[] = [];
        let stride = 1,
          seen = 0,
          closest = Infinity,
          testedPairs = 0;
        for (const [i, j] of queryPairs(xt, yt, eps)) {
          const tx = tri(x, i),
            ty = tri(y, j);
          if (!overlap(bounds(tx.flat()), bounds(ty.flat()), eps)) continue;
          const hit = trianglesIntersect(tx, ty, eps, check.touching);
          if (hit) {
            // The marker belongs in the middle of the contact, not on whichever
            // triangle happened to be tested first or happened to be largest.
            const offset = norm(sub(hit, middle));
            if (!point || offset < closest) {
              point = hit;
              closest = offset;
            }
            axes.add(tx);
            axes.add(ty);
            if (seen++ % stride === 0) {
              hits.push(hit);
              if (hits.length >= 8192) {
                for (let k = 0; k * 2 < hits.length; k++) hits[k] = hits[k * 2];
                hits.length = Math.ceil(hits.length / 2);
                stride *= 2;
              }
            }
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
        if (point) {
          // A tree leaf answers for its whole box, so each triangle is tested
          // against the window before it is allowed into the measurement.
          const reaching = (e: GeometryElement, tree: Node) =>
            [...query(tree, window, eps)].filter((i) =>
              overlap(bounds(tri(e, i).flat()), window, eps),
            );
          const baseX = reaching(x, xt),
            baseY = reaching(y, yt);
          // A nested body never crosses a boundary, so it contributes no
          // contact normals. Its own faces near the window take their place.
          if (kind !== "surface") {
            axes.addFrom(x, baseX);
            axes.addFrom(y, baseY);
          }
          await checkpoint();
          const middle = window.min.map(
            (v, k) => (v + window.max[k]) / 2,
          ) as Vec;
          const probe = (side: 0 | 1, p: Vec) =>
            side === 0 ? inside(p, x, xt, eps) : inside(p, y, yt, eps);
          // Only a gap that every anchor calls empty is really a gap. Split one
          // contact in half and the reported depth halves with it.
          const empty = (n: Vec, at: number, anchors: Vec[]) =>
            x.closed &&
            y.closed &&
            anchors.every((anchor) => {
              const p = add(anchor, n, at - dot(anchor, n));
              return !probe(0, p) || !probe(1, p);
            });
          const zones = contactZones(hits, window, eps, empty),
            list = axes.values();
          let thickness = 0;
          for (const zone of zones) {
            const xIds = zone.limits.length
                ? baseX.filter((i) => withinLimits(x, i, zone.limits))
                : baseX,
              yIds = zone.limits.length
                ? baseY.filter((i) => withinLimits(y, i, zone.limits))
                : baseY,
              anchor = zone.hits.length
                ? ([0, 1, 2].map(
                    (k) =>
                      zone.hits.reduce((sum, h) => sum + h[k], 0) /
                      zone.hits.length,
                  ) as Vec)
                : middle;
            const deep = overlapThickness(
              x,
              y,
              xIds,
              yIds,
              list,
              window,
              anchor,
              probe,
            );
            if (deep > thickness) thickness = deep;
            await checkpoint();
          }
          thickness *= 1000;
          // A body that encloses nothing can never give a volumetric reading.
          // Its clash is real all the same, so only bodies that do hold a
          // volume are allowed to fall out of the result as a touch.
          if (hollow(x) || hollow(y)) unmeasured = true;
          else if (thickness <= 0 && !check.touching) continue;
          penetrationMm = unmeasured
            ? 0
            : check.touching
              ? thickness
              : Math.max(check.precision, thickness);
          await checkpoint();
        }
        // An unmeasured conflict must never disappear behind a depth filter.
        if (
          point &&
          !unmeasured &&
          penetrationMm + check.precision < check.minPenetration
        )
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
          ...(unmeasured ? { unmeasured: true } : {}),
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
