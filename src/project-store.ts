import { Project, readProject, isSnapshot } from "./domain";

const folderMime = "application/vnd.folder";
const storageName = "nashepo.collisionfinder360";
const encoder = new TextEncoder();
const decoder = new TextDecoder();
interface RecordFile {
  format: "nashepo.checks.workspace";
  version: 1;
  projectId: string;
  revision: string;
  savedAt: string;
  project: Project;
  images: { checkId: string; clashId: string; file: string }[];
}
const find = async (parent: WorkspaceItem, name: string) =>
  (await parent.propfind()).find(item => item.title === name);
async function folder(parent: WorkspaceItem, name: string) {
  const existing = await find(parent, name);
  if (existing && existing.mimeType !== folderMime)
    throw Error(`«${name}» должен быть папкой.`);
  return existing || parent.mkcol(name, folderMime);
}
async function write(parent: WorkspaceItem, name: string, bytes: Uint8Array, mime = "application/json") {
  const item = await find(parent, name);
  if (item) await item.put(bytes);
  else await parent.mkcol(name, mime, bytes);
}
function decode(bytes: Uint8Array): RecordFile {
  const data = JSON.parse(decoder.decode(bytes)) as RecordFile;
  if (data?.format !== "nashepo.checks.workspace" || data.version !== 1 ||
      typeof data.projectId !== "string" || !data.projectId ||
      typeof data.revision !== "string" || !Array.isArray(data.images))
    throw Error("Неизвестный формат хранилища проверок.");
  readProject(JSON.stringify(data.project));
  for (const image of data.images)
    if (!image || typeof image.checkId !== "string" || typeof image.clashId !== "string" ||
        typeof image.file !== "string" || !/^[a-f0-9]{64}\.(jpg|png)$/.test(image.file))
      throw Error("Некорректная ссылка на снимок в хранилище проверок.");
  return data;
}
function imageData(image: string) {
  const binary = atob(image.slice(image.indexOf(",") + 1));
  return Uint8Array.from(binary, value => value.charCodeAt(0));
}
function imageUrl(file: string, bytes: Uint8Array) {
  let value = "";
  for (let i = 0; i < bytes.length; i += 32768)
    value += String.fromCharCode(...bytes.subarray(i, i + 32768));
  return `data:image/${file.endsWith(".png") ? "png" : "jpeg"};base64,${btoa(value)}`;
}

/** Portable project data accessed only through the host's filesystem API. */
export class ProjectStore {
  readonly projectId: string;
  readonly label: string;
  private revision?: string;
  private queue: Promise<unknown> = Promise.resolve();
  private images = new Map<string, string>();
  private constructor(private workspace: Workspace, private directory: WorkspaceItem | undefined,
    public readonly loaded: Project | undefined, record?: RecordFile) {
    this.projectId = record?.projectId || crypto.randomUUID();
    this.revision = record?.revision;
    this.label = `${workspace.root.title}/${storageName}`;
  }
  static async open(workspace: Workspace): Promise<ProjectStore> {
    if (workspace.inmemory || workspace.root.mimeType !== folderMime)
      throw Error("Выберите доступную для записи папку на диске.");
    const directory = await find(workspace.root, storageName);
    if (directory && directory.mimeType !== folderMime)
      throw Error(`«${storageName}» должен быть папкой.`);
    const item = directory && await find(directory, "project.json");
    if (!item) return new ProjectStore(workspace, directory, undefined);
    const record = decode(await item.get());
    const project = readProject(JSON.stringify(record.project));
    const images = directory && await find(directory, "images");
    const files = new Map((images ? await images.propfind() : []).map(file => [file.title, file]));
    const results = new Map(project.checks.flatMap(c => c.results.map(r => [JSON.stringify([c.id,r.id]), r] as const)));
    for (const ref of record.images) {
      const result = results.get(JSON.stringify([ref.checkId,ref.clashId]));
      const file = files.get(ref.file);
      if (result && file) {
        try { result.image = imageUrl(ref.file, await file.get()); }
        catch { /* Missing snapshots can be rebuilt without losing review data. */ }
      }
    }
    return new ProjectStore(workspace, directory, project, record);
  }
  save(project: Project): Promise<void> {
    const snapshot = structuredClone(project);
    const next = this.queue.catch(() => undefined).then(() => this.saveNow(snapshot));
    this.queue = next;
    return next;
  }
  private async saveNow(project: Project) {
    await this.workspace.requestWritePermissions?.();
    const directory = this.directory || await folder(this.workspace.root, storageName);
    this.directory = directory;
    const current = await find(directory, "project.json");
    const previousBytes = current && await current.get();
    const previous = previousBytes && decode(previousBytes);
    if (previous?.revision !== this.revision || (previous && previous.projectId !== this.projectId))
      throw Error("Папка проверок изменена в другом окне. Откройте её заново перед сохранением; текущую работу можно выгрузить в JSON.");
    const refs: RecordFile["images"] = [];
    let images: WorkspaceItem | undefined;
    let existingImages: Set<string> | undefined;
    for (const check of project.checks) for (const clash of check.results) {
      const image = clash.image;
      delete clash.image;
      if (!isSnapshot(image)) continue;
      images ||= await folder(directory, "images");
      existingImages ||= new Set((await images.propfind()).map(file => file.title));
      let name = this.images.get(image);
      if (!name) {
        const bytes = imageData(image);
        const hash = new Uint8Array(await crypto.subtle.digest("SHA-256", bytes));
        name = [...hash].map(x => x.toString(16).padStart(2,"0")).join("") +
          (image.startsWith("data:image/png") ? ".png" : ".jpg");
        if (!existingImages.has(name)) {
          await images.mkcol(name, image.startsWith("data:image/png") ? "image/png" : "image/jpeg", bytes);
          existingImages.add(name);
        }
        this.images.set(image, name);
      }
      refs.push({checkId: check.id, clashId: clash.id, file: name});
    }
    const record: RecordFile = {format: "nashepo.checks.workspace", version: 1,
      projectId: this.projectId, revision: crypto.randomUUID(), savedAt: new Date().toISOString(), project, images: refs};
    // Preserve the last complete record; immutable image names keep it usable.
    if (previousBytes) await write(directory, "project.previous.json", previousBytes);
    await write(directory, "project.json", encoder.encode(JSON.stringify(record)));
    await this.workspace.flush();
    this.revision = record.revision;
  }
}
