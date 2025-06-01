import { APP_NAME } from "@/constants";
import "@/styles/globals.css";
import ReactDOM from "react-dom/client";
import { Container } from "./container";

export default defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: "ui",

  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: APP_NAME,
      position: "inline",
      anchor: "body",
      append: "first",
      onMount: (container) => {
        const app = document.createElement("div");
        app.id = "content-root";
        container.append(app);

        const root = ReactDOM.createRoot(app);
        root.render(<Container />);
        return root;
      },
      onRemove: (root) => {
        root?.unmount();
      },
    });

    ui.mount();
  },
});
