import { DwgType } from "albatros/enums";
import { Clash, GeometryElement, Vec } from "./domain";
import { bounds } from "./geometry";
import { captureViewport } from "./snapshot";
export interface Snapshot {
  elements: GeometryElement[];
  fingerprint: string;
  warnings: string[];
  blockers: string[];
  models: { id: string; name: string }[];
  indexedModelIds: string[];
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
function usableGeometryIndices(g: DwgGeometry3d): GeometryIndices {
  const vertexCount = g.vertices.length / 3,
    finiteVertex = (index: number) =>
      Number.isFinite(g.vertices[index * 3]) &&
      Number.isFinite(g.vertices[index * 3 + 1]) &&
      Number.isFinite(g.vertices[index * 3 + 2]),
    valid = (k: number) => {
      const a = g.indices[k],
        b = g.indices[k + 1],
        c = g.indices[k + 2];
      return (
        a < vertexCount &&
        b < vertexCount &&
        c < vertexCount &&
        a !== b &&
        b !== c &&
        c !== a &&
        finiteVertex(a) &&
        finiteVertex(b) &&
        finiteVertex(c)
      );
    };
  let count = 0;
  for (let k = 0; k < g.indices.length; k += 3) if (valid(k)) count += 3;
  if (count === g.indices.length) return g.indices;
  const result = new Uint32Array(count);
  for (let k = 0, offset = 0; k < g.indices.length; k += 3)
    if (valid(k)) {
      result[offset++] = g.indices[k];
      result[offset++] = g.indices[k + 1];
      result[offset++] = g.indices[k + 2];
    }
  return result;
}
const isProjectContainer = (name: string) => /\.wdx(?:[?#].*)?$/i.test(name);
export class ModelHost {
  private metadata = new Map<string, GeometryElement>();
  private refs = new Map<string, DwgModel3d[]>();
  private overlay?: { view: CadViewContext; layer: CadViewLayer };
  private overlayError?: Error;
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
  projectToken() {
    return this.app as object | undefined;
  }
  async scan(
    status: (s: string) => void,
    aborted: () => boolean,
    selectedModels?: Set<string>,
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
      blockers: string[] = [],
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
      const projectContainer =
        isProjectContainer(modelName) || isProjectContainer(modelId);
      if (!projectContainer) models.push({ id: modelId, name: modelName });
      const includeModel =
        !projectContainer && (!selectedModels || selectedModels.has(modelId));
      const entities: DwgModel3d[] = [];
      if (includeModel)
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
      let skippedGeometry = 0;
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
            const vertexCount = g.vertices.length / 3;
            const finiteVertex = (index: number) =>
              Number.isFinite(g.vertices[index * 3]) &&
              Number.isFinite(g.vertices[index * 3 + 1]) &&
              Number.isFinite(g.vertices[index * 3 + 2]);
            for (let k = 0; k < g.indices.length; k += 3) {
              const a = g.indices[k],
                b = g.indices[k + 1],
                c = g.indices[k + 2];
              hash = Math.imul(hash ^ a, 16777619);
              hash = Math.imul(hash ^ b, 16777619);
              hash = Math.imul(hash ^ c, 16777619);
              if (
                a < vertexCount &&
                b < vertexCount &&
                c < vertexCount &&
                a !== b &&
                b !== c &&
                c !== a &&
                finiteVertex(a) &&
                finiteVertex(b) &&
                finiteVertex(c)
              )
                triangleCount++;
              else invalid = true;
              if (k % 150000 === 0) {
                await yieldWork();
                if (aborted()) throw Error("Чтение моделей отменено.");
              }
            }
          }
        }
        if (invalid || !triangleCount) {
          if (!triangleCount) skippedGeometry++;
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
      if (skippedGeometry)
        warnings.push(
          `${modelName}: пропущено элементов без треугольной геометрии — ${skippedGeometry}.`,
        );
      const attachments: DwgAttachment[] = [];
      d.attachments.forEach((a) => {
        attachments.push(a);
      });
      for (const attachment of attachments) {
        const attachmentSource = `${source}/${attachment.name || attachment.uri || attachment.$id}`;
        if (attachment.model)
          await visit(
            attachment.model,
            attachmentSource,
            hidden || attachment.hidden,
          );
        else if (!selectedModels || selectedModels.has(attachmentSource))
          blockers.push(
            `${attachment.name || attachment.uri || "Подключённая модель"}: модель не загружена. Откройте её перед расчётом.`,
          );
      }
    };
    await visit(drawing, drawing.layers.layer0?.modelName || "Проект", false);
    if (!elements.length && (!selectedModels || selectedModels.size > 0))
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
      blockers: [...new Set(blockers)],
      models,
      indexedModelIds: models
        .filter((model) => !selectedModels || selectedModels.has(model.id))
        .map((model) => model.id),
    };
  }
  async geometry(id: string, aborted: () => boolean): Promise<GeometryElement> {
    const yieldWork = checkpoint(() => aborted() || !this.isCurrent());
    if (!this.isCurrent()) throw Error("Активная модель изменилась.");
    const meta = this.metadata.get(id),
      objects = this.refs.get(id);
    if (!meta || !objects) throw Error("Элемент отсутствует.");
    const chunks = objects.flatMap((object) =>
      Object.values(object.meshes).flatMap((mesh) => {
        const g = mesh.geometry;
        if (!g || g.indices.length % 3) return [];
        const indices = usableGeometryIndices(g);
        return indices.length ? [{ object, g, indices }] : [];
      }),
    );
    let vertexLength = 0,
      indexLength = 0;
    for (const { g, indices: chunkIndices } of chunks) {
      if (!g) throw Error("Геометрия недоступна.");
      vertexLength += g.vertices.length;
      indexLength += chunkIndices.length;
    }
    const vertices = new Float64Array(vertexLength),
      indices = new Uint32Array(indexLength);
    let vo = 0,
      io = 0;
    for (const { object, g, indices: chunkIndices } of chunks) {
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
      for (let k = 0; k < chunkIndices.length; k++) {
        indices[io + k] = vo / 3 + chunkIndices[k];
        if (k % 150000 === 0) {
          await yieldWork();
          if (aborted()) throw Error("Чтение геометрии отменено.");
        }
      }
      vo += g.vertices.length;
      io += chunkIndices.length;
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
    this.select([clash.a.id, clash.b.id]);
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
    this.overlayError = undefined;
    if (this.overlay) {
      this.overlay.view.layer.removeLayer(this.overlay.layer);
      this.overlay = undefined;
    }
    const view = this.view!,
      objects = [...new Set(ids.flatMap((id) => this.refs.get(id) || []))];
    const color = 0xff3636ff;
    const surfaces = objects.flatMap((obj) =>
      Object.values(obj.meshes).flatMap((mesh) => {
        const source = mesh.geometry;
        if (!source) return [];
        const geometry: UuidGeometry3d = {
          // SDK fields may be prototype getters rather than own properties.
          uuid: overlayId + "." + source.uuid,
          vertices: source.vertices,
          indices: source.indices,
          normals: source.normals,
          bounds: source.bounds,
          colors: new Uint32Array(source.vertices.length / 3).fill(color),
        };
        return [{ obj, geometry }];
      }),
    );
    const paint = (dc: DeviceContext) => {
      const old = dc.color,
        material = dc.rasterizer.material;
      dc.color = color;
      dc.rasterizer.material = undefined;
      try {
        for (const { obj, geometry } of surfaces) {
          dc.pushMatrix();
          try {
            dc.multMatrix(obj.matrix);
            dc.mesh(geometry);
          } finally {
            dc.popMatrix();
          }
        }
      } catch (error) {
        // A plugin overlay must never break the host's frame loop.
        layer.visible = false;
        this.overlayError = new Error(
          "Не удалось отрисовать подсветку пары: " +
            (error instanceof Error ? error.message : String(error)),
        );
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
    const view = this.view!,
      drawing = view.layer.drawing;
    if (!drawing)
      throw Error(
        "Слой моделей недоступен для снимка пары. Откройте 3D-окно проекта.",
      );
    const drawingVisible = drawing.visible,
      annotationsVisible = view.annotations.visible,
      previousSelection = new Set(view.layer.selectedObjects());
    try {
      if (!current) this.focus(clash, distance, false);
      else this.highlight([clash.a.id, clash.b.id]);
      view.pauseAnimation();
      view.layer.clearSelected();
      // Keep the pair overlay, hide the source drawing and all issue markers.
      drawing.visible = false;
      view.annotations.visible = false;
      view.invalidate();
      const image = await captureViewport(
        view,
        () => aborted() || !this.isCurrent(),
      );
      if (this.overlayError) throw this.overlayError;
      return image;
    } finally {
      drawing.visible = drawingVisible;
      view.annotations.visible = annotationsVisible;
      view.layer.clearSelected();
      view.layer.selectObjects((obj) => previousSelection.has(obj), true);
      view.invalidate();
    }
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
