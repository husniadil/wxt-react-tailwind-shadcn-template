import "@/styles/globals.css";
import { useContext } from "react";
import { PortalContext } from "@/context/portal-context";
import { SettingsPanel } from "@/components/settings/settings-panel";

function App() {
  const container = useContext(PortalContext);

  return (
    <div className="p-4 w-[500px] h-[380px] text-primary bg-background flex flex-col">
      <SettingsPanel container={container} />
    </div>
  );
}

export default App;
