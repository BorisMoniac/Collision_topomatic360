const frame = () =>
  new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
function viewportCanvases(view: CadViewContext) {
  const { width, height } = view.camera;
  const candidates = Array.from(document.querySelectorAll("canvas")).filter(
    (canvas) => {
      const r = canvas.getBoundingClientRect();
      return (
        r.width > 100 &&
        r.height > 100 &&
        canvas.width > 0 &&
        canvas.height > 0 &&
        getComputedStyle(canvas).visibility !== "hidden" &&
        ((Math.abs(r.width - width) < 4 && Math.abs(r.height - height) < 4) ||
          (Math.abs(canvas.width - width) < 4 &&
            Math.abs(canvas.height - height) < 4))
      );
    },
  );
  if (!candidates.length)
    throw Error(
      "Снимок 3D-окна недоступен: откройте одно видимое окно модели.",
    );
  const rect = candidates[0].getBoundingClientRect();
  if (
    candidates.some((c) => {
      const r = c.getBoundingClientRect();
      return Math.abs(r.x - rect.x) > 4 || Math.abs(r.y - rect.y) > 4;
    })
  )
    throw Error(
      "Открыто несколько подходящих 3D-окон. Оставьте одно окно для снимка.",
    );
  return { candidates, rect };
}
/** Keep the last visible frame above the CAD canvases during pair-only capture. */
export async function freezeViewport(view: CadViewContext) {
  await frame();
  view.repaint();
  const { candidates, rect } = viewportCanvases(view),
    cover = document.createElement("canvas");
  cover.width = Math.max(1, Math.round(rect.width * devicePixelRatio));
  cover.height = Math.max(1, Math.round(rect.height * devicePixelRatio));
  Object.assign(cover.style, {
    position: "fixed",
    left: `${rect.left}px`,
    top: `${rect.top}px`,
    width: `${rect.width}px`,
    height: `${rect.height}px`,
    zIndex: "2147483646",
    pointerEvents: "none",
  });
  const dc = cover.getContext("2d")!;
  for (const canvas of candidates)
    dc.drawImage(canvas, 0, 0, cover.width, cover.height);
  document.body.append(cover);
  return async () => {
    view.repaint();
    await frame();
    cover.remove();
  };
}
/** Capture only canvases that match the active CAD viewport. */
export async function captureViewport(
  view: CadViewContext,
  aborted: () => boolean,
): Promise<string> {
  await frame();
  if (aborted()) throw Error("Подготовка снимков отменена.");
  const { candidates } = viewportCanvases(view);
  const result = document.createElement("canvas"),
    scale = Math.min(1, 1280 / candidates[0].width);
  result.width = Math.round(candidates[0].width * scale);
  result.height = Math.round(candidates[0].height * scale);
  const dc = result.getContext("2d")!;
  dc.fillStyle = "#20242b";
  dc.fillRect(0, 0, result.width, result.height);
  view.repaint();
  for (const canvas of candidates)
    dc.drawImage(canvas, 0, 0, result.width, result.height);
  try {
    return result.toDataURL("image/jpeg", 0.82);
  } catch {
    throw Error("Браузер запретил чтение изображения 3D-окна.");
  }
}
