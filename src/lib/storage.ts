import { Theme, THEME_DEFAULT } from "@/types/theme";

const theme = storage.defineItem<Theme>("local:vite-ui-theme", {
  defaultValue: THEME_DEFAULT,
  fallback: THEME_DEFAULT,
  version: 1,
});

// Export everything under the store object
export const store = {
  theme,
};
