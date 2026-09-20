import { mountPanel } from "./panel";
import { ModelHost } from "./host";
let dispose: (() => void) | undefined;
let panel: HTMLDivElement | undefined;
let manager: ApplicationManager | undefined;
export default {
  open(ctx: Context) {
    ctx.manager.revealView("nashepo.collisionfinder360/checks_panel");
  },
  async mount(ctx: Context) {
    const el = ctx.el as HTMLElement;
    if (!el) return;
    if (panel && manager === ctx.manager) {
      el.replaceChildren(panel);
      return;
    }
    dispose?.();
    const container = document.createElement("div");
    container.style.height = "100%";
    el.replaceChildren(container);
    panel = container;
    manager = ctx.manager;
    dispose = await mountPanel(container, new ModelHost(ctx));
  },
};
