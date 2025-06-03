import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useContext, useEffect, useState } from "react";
import { PortalContext } from "@/context/portal-context";
import { Button } from "@/components/ui/button";
import { CheckIcon, ChevronsUpDownIcon, Loader2, Settings } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";
import { store } from "@/lib/storage";
import { useDebouncedCallback } from "use-debounce";
import { cn } from "@/lib/utils";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";

// Define available extension framework options for the combobox
const frameworks = [
  {
    value: "wxt",
    label: "WXT (Web Extension Tools)",
  },
  {
    value: "plasmo",
    label: "Plasmo",
  },
  {
    value: "chrome-extension-cli",
    label: "Chrome Extension CLI",
  },
  {
    value: "crxjs",
    label: "CRXJS Vite Plugin",
  },
  {
    value: "webpack-extension-reloader",
    label: "Webpack Extension Reloader",
  },
  {
    value: "webextension-polyfill",
    label: "WebExtension Polyfill",
  },
];

export const SettingsButton = () => {
  const container = useContext(PortalContext);
  const [settings, setSettings] = useState({ apiKey: "", extensionFramework: "" });
  const [open, setOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    const loadSettings = async () => {
      const savedSettings = await store.settings.getValue();
      if (savedSettings && typeof savedSettings === "object") {
        const settings = savedSettings as Record<string, string>;
        const apiKey = settings.exampleField1 || settings.apiKey || "";
        const extensionFramework = settings.exampleField2 || settings.extensionFramework || "";
        setSettings({ apiKey, extensionFramework });
      } else {
        setSettings({ apiKey: "", extensionFramework: "" });
      }
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
              <Label htmlFor="apiKey">API Key</Label>
              <Input
                id="apiKey"
                type="password"
                className="col-span-2 h-8"
                placeholder="Enter your API key"
                value={settings.apiKey}
                onChange={(e) => handleInputChange("apiKey", e.target.value)}
              />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="extensionFramework">Extension Framework</Label>
              <div className="col-span-2">
                <Popover open={open} onOpenChange={setOpen}>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      role="combobox"
                      aria-expanded={open}
                      className="w-full h-8 justify-between"
                    >
                      {settings.extensionFramework
                        ? frameworks.find(
                            (framework) => framework.value === settings.extensionFramework
                          )?.label
                        : "Select framework..."}
                      <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent
                    className="w-[200px] p-0"
                    side="right"
                    align="start"
                    container={container}
                  >
                    <Command>
                      <CommandInput placeholder="Search framework..." />
                      <CommandList>
                        <CommandEmpty>No framework found.</CommandEmpty>
                        <CommandGroup>
                          {frameworks.map((framework) => (
                            <CommandItem
                              key={framework.value}
                              value={framework.value}
                              onSelect={(currentValue) => {
                                handleInputChange("extensionFramework", currentValue);
                                setOpen(false);
                              }}
                            >
                              <CheckIcon
                                className={cn(
                                  "mr-2 h-4 w-4",
                                  settings.extensionFramework === framework.value
                                    ? "opacity-100"
                                    : "opacity-0"
                                )}
                              />
                              {framework.label}
                            </CommandItem>
                          ))}
                        </CommandGroup>
                      </CommandList>
                    </Command>
                  </PopoverContent>
                </Popover>
              </div>
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
