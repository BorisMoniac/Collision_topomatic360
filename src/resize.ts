/** Keep the host splitter's mouseup inside its docking area. */
export function guardPanelResize(container: HTMLElement): () => void {
  let ancestor = container.parentElement;
  let splitter: HTMLElement | undefined;
  while (ancestor && !splitter) {
    splitter = [...ancestor.children].find((child) =>
      child.classList.contains("resizer-horizontal"),
    ) as HTMLElement | undefined;
    ancestor = ancestor.parentElement;
  }
  if (!splitter) return () => {};
  const handle = splitter;
  const win = container.ownerDocument.defaultView!;
  let pointer: number | undefined;
  const finish = () => {
    if (pointer === undefined) return;
    const id = pointer;
    pointer = undefined;
    // The host uses mouse events, including when focus leaves the browser.
    handle.dispatchEvent(
      new MouseEvent("mouseup", { bubbles: true, composed: true }),
    );
    if (handle.hasPointerCapture(id)) handle.releasePointerCapture(id);
  };
  const down = (event: PointerEvent) => {
    if (event.button !== 0) return;
    pointer = event.pointerId;
    handle.setPointerCapture(event.pointerId);
  };
  handle.addEventListener("pointerdown", down);
  handle.addEventListener("pointerup", finish);
  handle.addEventListener("pointercancel", finish);
  handle.addEventListener("lostpointercapture", finish);
  win.addEventListener("blur", finish);
  return () => {
    finish();
    handle.removeEventListener("pointerdown", down);
    handle.removeEventListener("pointerup", finish);
    handle.removeEventListener("pointercancel", finish);
    handle.removeEventListener("lostpointercapture", finish);
    win.removeEventListener("blur", finish);
  };
}
