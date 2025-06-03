import { POPUP_MIN_HEIGHT, POPUP_MIN_WIDTH } from "@/constants";
import { Theme } from "@/types/theme";
import { Settings } from "@/types/settings";
import { Position } from "@/types/position";
import { Dimensions } from "@/types/dimensions";

const theme = storage.defineItem<Theme>("local:vite-ui-theme", {
  defaultValue: Theme.DEFAULT,
  fallback: Theme.DEFAULT,
  version: 1,
});

const popupPosition = storage.defineItem<Position>("local:vite-popup-position", {
  defaultValue: { x: -POPUP_MIN_WIDTH, y: -POPUP_MIN_HEIGHT },
  fallback: { x: -POPUP_MIN_WIDTH, y: -POPUP_MIN_HEIGHT },
  version: 1,
});

const popupDimensions = storage.defineItem<Dimensions>("local:vite-popup-dimensions", {
  defaultValue: { width: POPUP_MIN_WIDTH, height: POPUP_MIN_HEIGHT },
  fallback: { width: POPUP_MIN_WIDTH, height: POPUP_MIN_HEIGHT },
  version: 1,
});

const settings = storage.defineItem<Settings>("local:vite-settings", {
  defaultValue: { apiKey: "", extensionFramework: "", showFloatingActionButton: true },
  fallback: { apiKey: "", extensionFramework: "", showFloatingActionButton: true },
  version: 1,
});

export const store = {
  theme,
  popupPosition,
  popupDimensions,
  settings,
};
