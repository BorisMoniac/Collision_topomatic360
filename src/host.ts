import { DwgType } from "albatros/enums";
import { Clash, GeometryElement, Vec } from "./domain";
import { bounds } from "./geometry";
export interface Snapshot {
  elements: GeometryElement[];
  fingerprint: string;
  warnings: string[];
  models: { id: string; name: string }[];
}
const markerLayer = "nashepo.checks.points";
const overlayId = "nashepo.checks.highlight";
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
    let verticesTotal = 0,
      hash = 2166136261;
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
          Object.entries(props).find(([k]) =>
            /(^|\.)(globalid|ifcguid|guid)$/i.test(k),
          )?.[1] || "";
        const name = layer?.name || objects[0].$id || "Элемент";
        const id = JSON.stringify([modelId, key]);
        Object.assign(props, {
          Модель: modelName,
          Имя: name,
          GUID: guid,
          Объект: layer?.UUID || key,
        });
        const coords: number[] = [];
        let closed = true,
          invalid = false;
        for (const object of objects) {
          closed &&= object.isClosed;
          for (const mesh of Object.values(object.meshes)) {
            const g = mesh.geometry;
            if (!g) {
              invalid = true;
              continue;
            }
            closed &&= mesh.isClosed;
            const { vertices, indices } = g;
            if (indices.length % 3) {
              invalid = true;
              continue;
            }
            for (let i = 0; i < indices.length; i += 3) {
              const triangle: number[] = [];
              for (let j = 0; j < 3; j++) {
                const k = indices[i + j] * 3;
                const p: Vec = [vertices[k], vertices[k + 1], vertices[k + 2]];
                Math3d.mat4.mulv3(p, object.matrix, p);
                triangle.push(...p);
              }
              if (triangle.every(Number.isFinite)) coords.push(...triangle);
              else invalid = true;
              if (i % 30000 === 0) {
                status(
                  `Чтение геометрии: ${modelName} · ${elements.length} элементов`,
                );
                await new Promise((r) => setTimeout(r, 0));
                if (aborted()) throw Error("Чтение моделей отменено.");
              }
            }
          }
        }
        if (invalid || !coords.length) {
          warnings.push(
            `${modelName} / ${name}: геометрия отсутствует или неполна.`,
          );
          if (!coords.length) continue;
          closed = false;
        }
        verticesTotal += coords.length;
        if (verticesTotal > 54000000)
          throw Error(
            "Модели содержат более 6 млн треугольников. Откройте меньший состав моделей.",
          );
        const e: GeometryElement = {
          id,
          name,
          model: modelName,
          modelId,
          guid,
          properties: props,
          hidden:
            hidden || !!layer?.resolveHidden() || !!layer?.resolveDisabled(),
          triangles: new Float64Array(coords),
          closed,
          bounds: bounds(coords),
        };
        hashText(JSON.stringify([id, props, e.hidden, coords]));
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
    this.scannedApp = app;
    this.scannedView = view;
    return {
      elements,
      fingerprint: `${elements.length}:${hash >>> 0}`,
      warnings: [...new Set(warnings)],
      models,
    };
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
  focus(clash: Clash, distance: number) {
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
      true,
      p,
    );
  }
  private highlight(ids: string[]) {
    if (this.overlay) {
      this.overlay.view.layer.removeLayer(this.overlay.layer);
      this.overlay = undefined;
    }
    const view = this.view!,
      objects = ids.flatMap((id) => this.refs.get(id) || []);
    const paint = (dc: DeviceContext) => {
      const old = dc.color;
      dc.color = 0xff3636ff;
      try {
        for (const obj of objects) {
          dc.pushMatrix();
          try {
            dc.multMatrix(obj.matrix);
            for (const mesh of Object.values(obj.meshes))
              if (mesh.geometry) dc.mesh(mesh.geometry);
          } finally {
            dc.popMatrix();
          }
        }
      } finally {
        dc.color = old;
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
