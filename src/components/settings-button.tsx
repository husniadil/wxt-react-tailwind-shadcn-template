import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useContext, useEffect, useState } from "react";
import { PortalContext } from "@/context/portal-context";
import { Button } from "@/components/ui/button";
import { Loader2, Settings } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { store } from "@/lib/storage";
import { useDebouncedCallback } from "use-debounce";

export const SettingsButton = () => {
  const container = useContext(PortalContext);
  const [settings, setSettings] = useState({ exampleField1: "", exampleField2: "" });
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      const savedSettings = await store.settings.getValue();
      setSettings(savedSettings);
    };
    loadSettings();
  }, []);

  const debouncedSaveSettings = useDebouncedCallback(async (newSettings) => {
    setIsSaving(true);
    return store.settings
      .setValue(newSettings)
      .catch((error) => {
        console.error("Error saving settings:", error);
      })
      .finally(() => setTimeout(() => setIsSaving(false), 500));
  }, 500);

  const handleInputChange = (field: string, value: string) => {
    const newSettings = { ...settings, [field]: value };
    setSettings(newSettings);
    debouncedSaveSettings(newSettings);
  };

  return (
    <Popover>
      <PopoverTrigger asChild className="group">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Settings className="h-4 w-4 text-primary group-hover:text-[#D97757] dark:group-hover:text-[#D97757]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent
        className="w-80 border-2 border-[#E5E5E5] dark:border-[#262626] shadow-none"
        container={container}
      >
        <div className="grid gap-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="leading-none font-bold">Settings</h4>
              <div className="flex items-center gap-2">
                {isSaving && <Loader2 className="h-4 w-4 text-primary animate-spin" />}
                <ThemeToggle />
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="exampleField1">Example Field 1</Label>
              <Input
                id="exampleField1"
                className="col-span-2 h-8"
                value={settings.exampleField1}
                onChange={(e) => handleInputChange("exampleField1", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="exampleField2">Example Field 2</Label>
              <Input
                id="exampleField2"
                className="col-span-2 h-8"
                value={settings.exampleField2}
                onChange={(e) => handleInputChange("exampleField2", e.target.value)}
              />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
