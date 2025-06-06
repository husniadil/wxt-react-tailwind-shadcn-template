import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import { Label } from "@/components/ui/label";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { frameworks } from "@/data/frameworks";
import { cn } from "@/lib/utils";
import { store } from "@/lib/storage";
import { CheckIcon, ChevronsUpDownIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useDebouncedCallback } from "use-debounce";
import { PortalContext } from "@/context/portal-context";
import { useContext } from "react";

interface FrameworkFieldProps {
  onSavingStateChange?: (saving: boolean) => void;
}

export const FrameworkField = ({ onSavingStateChange }: FrameworkFieldProps) => {
  const container = useContext(PortalContext);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);

  useEffect(() => {
    store.settings.getValue().then((settings) => setValue(settings.extensionFramework ?? ""));
    const unwatch = store.settings.watch((settings) => setValue(settings.extensionFramework ?? ""));
    return () => unwatch();
  }, []);

  const debouncedSave = useDebouncedCallback(async (newValue: string) => {
    onSavingStateChange?.(true);

    const settings = (await store.settings.getValue()) || {};
    const updatedSettings = { ...settings, extensionFramework: newValue };
    return store.settings
      .setValue(updatedSettings)
      .catch((error) => {
        console.error("Error saving framework setting:", error);
      })
      .finally(() => {
        setTimeout(() => {
          onSavingStateChange?.(false);
        }, 500);
      });
  }, 500);

  const handleSelect = (currentValue: string) => {
    setValue(currentValue);
    debouncedSave(currentValue);
    setOpen(false);
  };

  return (
    <div
      className="grid grid-cols-3 items-center gap-4"
      role="group"
      aria-labelledby="framework-group"
    >
      <Label htmlFor="extensionFramework" id="framework-group">
        Framework
      </Label>
      <div className="col-span-2 flex items-center gap-2">
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="h-8 justify-between flex-1"
            >
              {value
                ? frameworks.find((framework) => framework.value === value)?.label
                : "Select framework"}
              <ChevronsUpDownIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-[200px] p-0" align="start" side="top" container={container}>
            <Command>
              <CommandInput placeholder="Search framework..." aria-label="Search for a framework" />
              <CommandEmpty aria-live="polite">No framework found.</CommandEmpty>
              <CommandGroup
                className="max-h-[240px] overflow-auto"
                aria-label="Available frameworks"
              >
                {frameworks.map((framework) => (
                  <CommandItem
                    key={framework.value}
                    value={framework.value}
                    onSelect={(currentValue) => handleSelect(currentValue)}
                    aria-selected={value === framework.value}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        value === framework.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {framework.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>
    </div>
  );
};
