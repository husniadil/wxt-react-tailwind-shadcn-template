import "@/styles/globals.css";
import { SettingsPanel } from "@/components/settings-panel";

function AppWrapper() {
  return (
    <div
      className="p-4 w-[500px] h-[400px] text-primary bg-background flex flex-col overflow-auto"
      role="dialog"
      aria-label="Settings popup"
    >
      <SettingsPanel />
    </div>
  );
}

export default AppWrapper;
