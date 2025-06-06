import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { store } from "@/lib/storage";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

interface ApiKeyFieldProps {
  onSavingStateChange?: (saving: boolean) => void;
}

export const ApiKeyField = ({ onSavingStateChange }: ApiKeyFieldProps) => {
  const [value, setValue] = useState("");

  useEffect(() => {
    store.settings.getValue().then((settings) => setValue(settings.apiKey ?? ""));
    const unwatch = store.settings.watch((settings) => setValue(settings.apiKey ?? ""));
    return () => unwatch();
  }, []);

  const debouncedSave = useDebouncedCallback(async (newValue: string) => {
    onSavingStateChange?.(true);

    const settings = (await store.settings.getValue()) || {};
    const updatedSettings = { ...settings, apiKey: newValue };
    return store.settings
      .setValue(updatedSettings)
      .catch((error) => {
        console.error("Error saving API key:", error);
      })
      .finally(() => {
        setTimeout(() => {
          onSavingStateChange?.(false);
        }, 500);
      });
  }, 500);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setValue(newValue);
    debouncedSave(newValue);
  };

  return (
    <div
      className="grid grid-cols-3 items-center gap-4"
      role="group"
      aria-labelledby="apiKey-group"
    >
      <Label htmlFor="apiKey" id="apiKey-group">
        API Key
      </Label>
      <div className="col-span-2">
        <Input
          id="apiKey"
          type="password"
          className="h-8 w-full"
          placeholder="Enter your API key"
          aria-describedby="apiKey-desc"
          autoComplete="off"
          value={value}
          onChange={handleChange}
        />
        <div id="apiKey-desc" className="sr-only">
          Your private API key used for authentication with external services
        </div>
      </div>
    </div>
  );
};
