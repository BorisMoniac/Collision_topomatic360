import { calculate } from "./geometry";
self.onmessage = async (event) => {
  try {
    const { elements, check } = event.data;
    const results = await calculate(
      elements,
      check,
      (p) => self.postMessage({ progress: p }),
      () => false,
    );
    self.postMessage({ results });
  } catch (error) {
    self.postMessage({
      error: error instanceof Error ? error.message : String(error),
    });
  }
};
