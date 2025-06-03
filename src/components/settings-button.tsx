import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useContext } from "react";
import { PortalContext } from "@/context/portal-context";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { ThemeToggle } from "@/components/theme-toggle";

export const SettingsButton = () => {
  const container = useContext(PortalContext);

  return (
    <Popover>
      <PopoverTrigger asChild className="group">
        <Button variant="ghost" size="icon" className="h-8 w-8">
          <Settings className="h-4 w-4 text-primary group-hover:text-[#D97757] dark:group-hover:text-[#D97757]" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 border-2 border-primary shadow-none" container={container}>
        <div className="grid gap-4">
          <div className="space-y-2">
            <div className="flex justify-between items-center">
              <h4 className="leading-none font-medium">Settings</h4>
              <ThemeToggle />
            </div>
            <p className="text-muted-foreground text-sm">Configure the extension.</p>
          </div>
          <div className="grid gap-2">
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="exampleField1">Example Field 1</Label>
              <Input id="exampleField1" className="col-span-2 h-8" />
            </div>
            <div className="grid grid-cols-3 items-center gap-4">
              <Label htmlFor="exampleField2">Example Field 2</Label>
              <Input id="exampleField2" className="col-span-2 h-8" />
            </div>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
};
