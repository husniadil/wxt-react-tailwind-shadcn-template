import App from "@/components/app";
import { ThemeProvider } from "@/components/theme-provider";
import "@/styles/globals.css";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";

export const PortalContext = React.createContext<HTMLElement | null>(null);

const ContentRoot = () => {
  const [portalContainer, setPortalContainer] = useState<HTMLElement | null>(null);

  return (
    <React.StrictMode>
      <PortalContext.Provider value={portalContainer}>
        <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
          <div ref={setPortalContainer} id="content-wrapper">
            <App />
          </div>
        </ThemeProvider>
      </PortalContext.Provider>
    </React.StrictMode>
  );
};

export default defineContentScript({
  matches: ["<all_urls>"],
  cssInjectionMode: "ui",

  async main(ctx) {
    const ui = await createShadowRootUi(ctx, {
      name: "wxt-react-tailwind-shadcn-template",
      position: "inline",
      anchor: "body",
      append: "first",
      onMount: (container) => {
        const app = document.createElement("div");
        app.id = "content-root";
        container.append(app);

        const root = ReactDOM.createRoot(app);
        root.render(<ContentRoot />);
        return root;
      },
      onRemove: (root) => {
        root?.unmount();
      },
    });

    ui.mount();
  },
});
