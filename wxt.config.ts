import { defineConfig } from "wxt";
import { APP_NAME } from "./src/constants";

// See https://wxt.dev/api/config.html
export default defineConfig({
  modules: ["@wxt-dev/module-react"],
  srcDir: "./src",
  manifest: {
    name: APP_NAME,
    version: "0.1.1",
    description: "manifest.json description",
    permissions: ["activeTab", "storage", "scripting"],
  },
});
