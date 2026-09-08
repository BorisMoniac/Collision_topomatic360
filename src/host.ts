import { DwgType } from "albatros/enums";
import { Clash, GeometryElement, Vec } from "./domain";
import { bounds } from "./geometry";
import { captureViewport } from "./snapshot";
export interface Snapshot {
  elements: GeometryElement[];
  fingerprint: string;
  warnings: string[];
  models: { id: string; name: string }[];
}
const markerLayer = "nashepo.checks.points";
const overlayId = "nashepo.checks.highlight";
function checkpoint(aborted: () => boolean) {
  let tick = performance.now();
  return async () => {
    if (aborted()) throw Error("Операция отменена.");
    if (performance.now() - tick >= 16) {
      await new Promise((r) => setTimeout(r, 0));
      tick = performance.now();
    }
  };
}
function flatten(
  value: unknown,
  prefix: string,
  out: Record<string, string>,
  depth = 0,
): void {
  if (depth > 12 || value == null) return;
  if (typeof value !== "object") {
    out[prefix] = String(value);
    return;
  }
  if (Array.isArray(value)) {
    value.forEach((v, i) => flatten(v, `${prefix}[${i}]`, out, depth + 1));
    return;
  }
  const obj = value as Record<string, unknown>;
  if ("$value" in obj) {
    flatten(obj.$value, prefix, out, depth + 1);
    return;
  }
  for (const [key, v] of Object.entries(obj))
    if (!key.startsWith("$"))
      flatten(v, prefix ? `${prefix}.${key}` : key, out, depth + 1);
}
export class ModelHost {
  private metadata = new Map<string, GeometryElement>();
  private refs = new Map<string, DwgModel3d[]>();
  private overlay?: { view: CadViewContext; layer: CadViewLayer };
  private pointView?: CadViewContext;
  private scannedApp?: Application;
  private scannedView?: CadViewContext;
  constructor(private ctx: Context) {}
  get view() {
    return (this.ctx.manager.activeWindow as CadViewDocumentWindow | undefined)
      ?.context;
  }
  get app() {
    return this.ctx.manager.activeApp;
  }
  isCurrent() {
    return this.scannedApp === this.app && this.scannedView === this.view;
  }
  canLocate(clash: Clash) {
    return (
      this.isCurrent() && this.refs.has(clash.a.id) && this.refs.has(clash.b.id)
    );
  }
  async scan(
    status: (s: string) => void,
    aborted: () => boolean,
  ): Promise<Snapshot> {
    const app = this.app,
      view = this.view,
      drawing = app?.model as Drawing | undefined;
    if (!view || !drawing?.layouts || !drawing.attachments)
      throw Error(
        "Откройте проект Топоматик 360 с IFC или SMDX и сделайте его 3D-окно активным.",
      );
    const models: Snapshot["models"] = [],
      warnings: string[] = [],
      elements: GeometryElement[] = [],
      refs = new Map<string, DwgModel3d[]>();
    const visited = new Set<Drawing>();
    let hash = 2166136261;
    const yieldWork = checkpoint(
      () => aborted() || app !== this.app || view !== this.view,
    );
    let lastStatus = -Infinity;
    const hashText = (s: string) => {
      for (let i = 0; i < s.length; i++)
        hash = Math.imul(hash ^ s.charCodeAt(i), 16777619);
    };
    const visit = async (d: Drawing, source: string, hidden: boolean) => {
      if (visited.has(d)) return;
      visited.add(d);
      const modelName = d.layers.layer0?.modelName || source;
      const modelId = source;
      models.push({ id: modelId, name: modelName });
      const entities: DwgModel3d[] = [];
      d.layouts.model?.walk((e) => {
        if (e.type === DwgType.model3d) entities.push(e as DwgModel3d);
        else if (e.type === DwgType.insert)
          warnings.push(`${modelName}: вставка блока не включена в расчёт.`);
        return false;
      });
      const groups = new Map<string, DwgModel3d[]>();
      for (const obj of entities) {
        const key = JSON.stringify([
          obj.layer?.UUID || "",
          obj.$id || obj.$path,
        ]);
        groups.set(key, [obj]);
      }
      for (const [key, objects] of groups) {
        if (aborted()) throw Error("Чтение моделей отменено.");
        if (app !== this.app || view !== this.view)
          throw Error(
            "Активный проект изменился. Запустите чтение моделей заново.",
          );
        const layer = objects[0].layer,
          props: Record<string, string> = {};
        try {
          if (layer) {
            const chain: DwgLayer[] = [];
            let parent: DwgLayer | undefined = layer;
            while (parent && chain.length < 64) {
              chain.unshift(parent);
              parent = parent.layer;
            }
            for (const l of chain) {
              flatten(l.typedProperties(), "", props);
              if (l.typed?.name) props["Тип"] = l.typed.name;
            }
          }
        } catch {
          warnings.push(`${modelName} / ${key}: часть свойств недоступна.`);
        }
        const guid =
          props["ifc.id"] ||
          Object.entries(props).find(([k]) =>
            /(^|\.)(globalid|ifcguid|guid)$/i.test(k),
          )?.[1] ||
          "";
        const name = layer?.name || objects[0].$id || "Элемент";
        const id = JSON.stringify([modelId, key]);
        Object.assign(props, {
          Модель: modelName,
          Имя: name,
          GUID: guid,
          Объект: layer?.UUID || key,
        });
        const box = {
          min: [Infinity, Infinity, Infinity] as Vec,
          max: [-Infinity, -Infinity, -Infinity] as Vec,
        };
        let closed = true,
          invalid = false,
          triangleCount = 0;
        for (const object of objects) {
          closed &&= object.isClosed;
          for (const mesh of Object.values(object.meshes)) {
            const g = mesh.geometry;
            if (!g || g.indices.length % 3) {
              invalid = true;
              continue;
            }
            closed &&= mesh.isClosed;
            triangleCount += g.indices.length / 3;
            for (let k = 0; k < g.vertices.length; k += 3) {
              const p: Vec = [
                g.vertices[k],
                g.vertices[k + 1],
                g.vertices[k + 2],
              ];
              Math3d.mat4.mulv3(p, object.matrix, p);
              if (!p.every(Number.isFinite)) {
                invalid = true;
                continue;
              }
              for (let a = 0; a < 3; a++) {
                box.min[a] = Math.min(box.min[a], p[a]);
                box.max[a] = Math.max(box.max[a], p[a]);
              }
              hashText(p.join(","));
              if (k % 60000 === 0) {
                if (performance.now() - lastStatus > 200) {
                  lastStatus = performance.now();
                  status(
                    "Индексирование: " +
                      modelName +
                      " · " +
                      elements.length +
                      " элементов",
                  );
                }
                await yieldWork();
                if (aborted()) throw Error("Чтение моделей отменено.");
              }
            }
            for (let k = 0; k < g.indices.length; k++) {
              hash = Math.imul(hash ^ g.indices[k], 16777619);
              if (k % 150000 === 0) {
                await yieldWork();
                if (aborted()) throw Error("Чтение моделей отменено.");
              }
            }
          }
        }
        if (invalid || !triangleCount) {
          warnings.push(
            modelName + " / " + name + ": геометрия отсутствует или неполна.",
          );
          if (!triangleCount) continue;
          closed = false;
        }
        const e: GeometryElement = {
          id,
          name,
          model: modelName,
          modelId,
          guid,
          properties: props,
          hidden:
            hidden || !!layer?.resolveHidden() || !!layer?.resolveDisabled(),
          triangles: new Float64Array(0),
          triangleCount,
          closed,
          bounds: box,
        };
        hashText(JSON.stringify([id, props, e.hidden]));
        elements.push(e);
        refs.set(id, objects);
      }
      const attachments: DwgAttachment[] = [];
      d.attachments.forEach((a) => {
        attachments.push(a);
      });
      for (const attachment of attachments) {
        if (attachment.model)
          await visit(
            attachment.model,
            `${source}/${attachment.name || attachment.uri || attachment.$id}`,
            hidden || attachment.hidden,
          );
        else
          warnings.push(
            `${attachment.name || attachment.uri || "Подключённая модель"}: модель не загружена. Откройте её перед расчётом.`,
          );
      }
    };
    await visit(drawing, drawing.layers.layer0?.modelName || "Проект", false);
    if (!elements.length)
      throw Error(
        "В открытом проекте не найдены 3D-элементы с доступной геометрией.",
      );
    this.clear();
    this.refs = refs;
    this.metadata = new Map(elements.map((e) => [e.id, e]));
    this.scannedApp = app;
    this.scannedView = view;
    return {
      elements,
      fingerprint: `${elements.length}:${hash >>> 0}`,
      warnings: [...new Set(warnings)],
      models,
    };
  }
  async geometry(id: string, aborted: () => boolean): Promise<GeometryElement> {
    const yieldWork = checkpoint(() => aborted() || !this.isCurrent());
    if (!this.isCurrent()) throw Error("Активная модель изменилась.");
    const meta = this.metadata.get(id),
      objects = this.refs.get(id);
    if (!meta || !objects) throw Error("Элемент отсутствует.");
    const chunks = objects.flatMap((object) =>
      Object.values(object.meshes).map((mesh) => ({
        object,
        g: mesh.geometry,
      })),
    );
    let vertexLength = 0,
      indexLength = 0;
    for (const { g } of chunks) {
      if (!g) throw Error("Геометрия недоступна.");
      vertexLength += g.vertices.length;
      indexLength += g.indices.length;
    }
    const vertices = new Float64Array(vertexLength),
      indices = new Uint32Array(indexLength);
    let vo = 0,
      io = 0;
    for (const { object, g } of chunks) {
      if (!g) throw Error("Геометрия недоступна.");
      for (let k = 0; k < g.vertices.length; k += 3) {
        const p: Vec = [g.vertices[k], g.vertices[k + 1], g.vertices[k + 2]];
        Math3d.mat4.mulv3(p, object.matrix, p);
        vertices.set(p, vo + k);
        if (k % 60000 === 0) {
          await yieldWork();
          if (aborted() || !this.isCurrent())
            throw Error("Чтение геометрии отменено.");
        }
      }
      for (let k = 0; k < g.indices.length; k++) {
        if (g.indices[k] >= g.vertices.length / 3)
          throw Error("Некорректный индекс геометрии.");
        indices[io + k] = vo / 3 + g.indices[k];
        if (k % 150000 === 0) {
          await yieldWork();
          if (aborted()) throw Error("Чтение геометрии отменено.");
        }
      }
      vo += g.vertices.length;
      io += g.indices.length;
    }
    return { ...meta, vertices, indices };
  }
  selected(): string[] {
    if (!this.isCurrent())
      throw Error("Сначала обновите модели текущего проекта.");
    const selected = new Set(this.view?.layer.selectedObjects());
    return [...this.refs]
      .filter(([, objs]) => objs.some((o) => selected.has(o)))
      .map(([id]) => id);
  }
  select(ids: string[]) {
    if (!this.isCurrent())
      throw Error("Сначала обновите модели текущего проекта.");
    const selected = new Set(ids.flatMap((id) => this.refs.get(id) || []));
    this.view!.layer.clearSelected();
    this.view!.layer.selectObjects((o) => selected.has(o), true);
    this.view!.invalidate();
  }
  clear() {
    if (this.overlay) {
      this.overlay.view.layer.removeLayer(this.overlay.layer);
      this.overlay.view.invalidate();
      this.overlay = undefined;
    }
    if (this.pointView) {
      const l = this.pointView.annotations.get(markerLayer);
      if (l) this.pointView.annotations.release(l);
      this.pointView.invalidate();
      this.pointView = undefined;
    }
  }
  focus(clash: Clash, distance: number, animate = true) {
    if (!this.isCurrent())
      throw Error("Обновите модели текущего проекта перед переходом.");
    if (!Number.isFinite(distance) || distance < 0.5)
      throw Error("Дистанция камеры должна быть не менее 0,5 м.");
    if (!this.refs.has(clash.a.id) || !this.refs.has(clash.b.id))
      throw Error("Один из элементов отсутствует в загруженных моделях.");
    this.view!.layer.clearSelected();
    this.highlight([clash.a.id, clash.b.id]);
    const p = clash.point,
      v = this.view!;
    if (v.camera?.id !== "3d") v.setCameraType("3d");
    const dir: Vec = [-0.65, 0.65, -0.394];
    const len = Math.hypot(...dir);
    dir.forEach((x, i) => (dir[i] = x / len));
    v.lookAt(
      p.map((x, i) => x - dir[i] * distance) as Vec,
      dir,
      [0, 0, 1],
      animate,
      p,
    );
  }
  private highlight(ids: string[]) {
    if (this.overlay) {
      this.overlay.view.layer.removeLayer(this.overlay.layer);
      this.overlay = undefined;
    }
    const view = this.view!,
      objects = ids.flatMap((id, side) =>
        (this.refs.get(id) || []).map((obj) => ({ obj, side })),
      );
    const surfaces = objects.flatMap(({ obj, side }) =>
      Object.values(obj.meshes).flatMap((mesh) => {
        const g = mesh.geometry;
        if (!g) return [];
        const color = side === 0 ? 0xff3636ff : 0xffff9d2b;
        const indices = new Uint32Array(g.indices.length * 2);
        indices.set(g.indices);
        for (let i = 0; i < g.indices.length; i += 3) {
          indices[g.indices.length + i] = g.indices[i];
          indices[g.indices.length + i + 1] = g.indices[i + 2];
          indices[g.indices.length + i + 2] = g.indices[i + 1];
        }
        const geometry: UuidGeometry3d = {
          uuid: "nashepo.checks." + side + "." + g.uuid,
          vertices: g.vertices,
          normals: g.normals,
          bounds: g.bounds,
          indices,
          colors: new Uint32Array(g.vertices.length / 3).fill(color),
        };
        return [{ obj, geometry, color }];
      }),
    );
    const paint = (dc: DeviceContext, camera: Camera) => {
      const old = dc.color,
        material = dc.rasterizer.material;
      dc.rasterizer.material = undefined;
      const inverse = Math3d.mat4.inverse(Math3d.mat4.alloc(), camera.view);
      try {
        for (const { obj, geometry, color } of surfaces) {
          dc.color = color;
          dc.pushMatrix();
          try {
            const matrix = Math3d.mat4.alloc();
            for (let i = 0; i < 16; i++) matrix[i] = obj.matrix[i];
            // A small view-facing offset avoids fighting the original surface's depth.
            const offset = 0.001;
            matrix[12] += inverse[8] * offset;
            matrix[13] += inverse[9] * offset;
            matrix[14] += inverse[10] * offset;
            dc.multMatrix(matrix);
            dc.mesh(geometry);
          } finally {
            dc.popMatrix();
          }
        }
      } finally {
        dc.color = old;
        dc.rasterizer.material = material;
      }
    };
    const layer: CadViewLayer = {
      id: overlayId,
      order: 10000,
      visible: true,
      paint: () => {},
      paint3d: paint,
      paintObject: () => {},
      paintSelected: () => {},
      release: () => {},
      bounds: () => undefined,
      *objectsAt() {},
      *selectableObjects() {},
      *selectedObjects() {},
      selectObject: () => {},
      selectObjects: () => {},
      isSelectedObject: () => false,
      clearSelected: () => {},
      owned: () => false,
      regenCadView: () => {},
      hasSelected: () => false,
      *osnap() {},
    };
    view.layer.addLayer(layer);
    this.overlay = { view, layer };
    view.invalidate();
  }
  async snapshot(
    clash: Clash,
    distance: number,
    aborted: () => boolean,
    current = false,
  ): Promise<string> {
    if (!this.isCurrent())
      throw Error("Обновите модели перед созданием снимков.");
    if (!this.canLocate(clash))
      throw Error("Элементы результата отсутствуют в открытых моделях.");
    if (!current) this.focus(clash, distance, false);
    else {
      this.view!.layer.clearSelected();
      this.highlight([clash.a.id, clash.b.id]);
    }
    return captureViewport(this.view!, () => aborted() || !this.isCurrent());
  }
  markers(
    results: Clash[],
    selected: string,
    show: boolean,
    onPick: (id: string) => void,
  ) {
    if (!this.isCurrent()) return;
    const view = this.view!;
    if (this.pointView && this.pointView !== view) this.clear();
    const old = view.annotations.get(markerLayer);
    if (old) view.annotations.release(old);
    this.pointView = view;
    if (!show) {
      view.invalidate();
      return;
    }
    const layer = view.annotations.create(markerLayer, 10000);
    const ordered = results
      .filter((r) => r.id !== selected)
      .concat(results.filter((r) => r.id === selected));
    for (const r of ordered.slice(-3000)) {
      if (r.state === "resolved") continue;
      const [x, y, z] = r.point,
        active = r.id === selected,
        c =
          r.state === "excluded"
            ? "#78818c"
            : r.state === "approved" || r.state === "reviewed"
              ? "#28b94b"
              : "#e1372d",
        edge = active ? "#f2c94c" : c;
      const activate = () => onPick(r.id);
      const shapes: AnnotationShape[] = [
        { type: "line", a: [x, y, z], b: [x, y, z + 1], color: edge, width: 5 },
        {
          type: "polyline",
          points: [
            [x - 0.65, y, z + 1],
            [x + 0.65, y, z + 1],
            [x, y, z + 2.2],
            [x - 0.65, y, z + 1],
          ],
          color: edge,
          fillColor: c,
          width: active ? 5 : 2,
        },
        {
          type: "line",
          a: [x, y - 0.01, z + 1.85],
          b: [x, y - 0.01, z + 1.4],
          color: "#ffffff",
          width: 4,
        },
        {
          type: "line",
          a: [x, y - 0.01, z + 1.22],
          b: [x, y - 0.01, z + 1.27],
          color: "#ffffff",
          width: 4,
        },
      ];
      layer.add<AnnotationShaped>({
        id: r.id,
        type: "shaped",
        shapes,
        activeShapes: shapes,
        activateCommand: activate,
        dblCommand: activate,
      });
      if (active)
        layer.add<AnnotationSimple>({
          id: r.id + ":label",
          type: "simple",
          position: [x, y, z + 2.35],
          label: `${r.a.name} × ${r.b.name}`,
          labelBackground: "#f2c94c",
          labelColor: "#171717",
          activateCommand: activate,
        });
    }
    view.invalidate();
  }
}
