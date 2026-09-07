import { mountPanel } from "./panel";
import { ModelHost } from "./host";
let dispose: (() => void) | undefined;
export default {
  open(ctx: Context) {
    ctx.manager.revealView("nashepo.collisionfinder360/checks_panel");
  },
  mount(ctx: Context) {
    const el = ctx.el as HTMLElement;
    if (!el) return;
    dispose?.();
    const container = document.createElement("div");
    container.style.height = "100%";
    el.replaceChildren(container);
    dispose = mountPanel(container, new ModelHost(ctx));
  },
};
