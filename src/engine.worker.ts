import { calculate } from "./geometry";
import type { GeometryElement } from "./domain";
let next = 0;
const requests = new Map<
  number,
  { resolve: (e: GeometryElement) => void; reject: (e: Error) => void }
>();
self.onmessage = async (event) => {
  if (event.data.request !== undefined) {
    const p = requests.get(event.data.request);
    requests.delete(event.data.request);
    if (event.data.error) p?.reject(Error(event.data.error));
    else p?.resolve(event.data.geometry);
    return;
  }
  try {
    const { elements, check } = event.data;
    const results = await calculate(
      elements,
      check,
      (p) => self.postMessage({ progress: p }),
      () => false,
      event.data.streaming
        ? (id: string) =>
            new Promise<GeometryElement>((resolve, reject) => {
              const request = next++;
              requests.set(request, { resolve, reject });
              self.postMessage({ load: id, request });
            })
        : undefined,
    );
    self.postMessage({ results });
  } catch (error) {
    self.postMessage({
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
