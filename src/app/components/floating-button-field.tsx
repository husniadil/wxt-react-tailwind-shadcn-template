import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { store } from "@/lib/storage";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface FloatingButtonFieldProps {
  onSavingStateChange?: (saving: boolean) => void;
}

export const FloatingButtonField = ({ onSavingStateChange }: FloatingButtonFieldProps) => {
  const [value, setValue] = useState(true);

  useEffect(() => {
    store.settings
      .getValue()
      .then((settings) => setValue(settings.showFloatingActionButton ?? true));
    const unwatch = store.settings.watch((settings) =>
      setValue(settings.showFloatingActionButton ?? true)
    );
    return () => unwatch();
  }, []);

  const debouncedSave = useDebouncedCallback(async (newValue: boolean) => {
    onSavingStateChange?.(true);

    const settings = (await store.settings.getValue()) || {};
    const updatedSettings = { ...settings, showFloatingActionButton: newValue };
    return store.settings
      .setValue(updatedSettings)
      .catch((error) => {
        console.error("Error saving floating button setting:", error);
      })
      .finally(() => {
        setTimeout(() => {
          onSavingStateChange?.(false);
        }, 500);
      });
  }, 500);

  const handleChange = (checked: boolean) => {
    setValue(checked);
    debouncedSave(checked);
  };

  return (
    <div
      className="grid grid-cols-3 items-center gap-4"
      role="group"
      aria-labelledby="floatingButton-group"
    >
      <Label htmlFor="floatingActionButton" id="floatingButton-group">
        Floating Button
      </Label>
      <div className="flex items-center col-span-2">
        <Switch
          id="floatingActionButton"
          checked={value}
          onCheckedChange={handleChange}
          className="mr-2"
          aria-describedby="floatingButton-desc"
        />
        <span className="text-sm text-muted-foreground">{value ? "Enabled" : "Disabled"}</span>
        <div id="floatingButton-desc" className="sr-only">
          Toggle the visibility of the floating action button at the bottom right of the screen
        </div>
      </div>
    </div>
  );
};
