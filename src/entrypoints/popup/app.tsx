import "@/styles/globals.css";
import { SettingsPanel } from "@/components/settings/settings-panel";

function App() {
  return (
    <div className="p-4 w-[500px] h-[380px] text-primary bg-background flex flex-col">
      <SettingsPanel />
    </div>
  );
}

export default App;
