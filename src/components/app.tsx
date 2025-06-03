import reactLogo from "@/assets/react.svg";
import wxtLogo from "@/assets/wxt.svg";
import { FloatingActionButton } from "@/components/floating-action-button";
import { PopupPanel } from "@/components/popup-panel";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { APP_NAME } from "@/constants";
import { store } from "@/lib/storage";
import "@/styles/globals.css";
import { useEffect, useState, useContext } from "react";
import { Trigger } from "@/types/trigger";
import { PortalContext } from "@/context/portal-context";
import { SettingsPanel } from "@/components/settings/settings-panel";

interface AppProps {
  trigger: Trigger;
}

const Content = () => {
  const [count, setCount] = useState(0);

  return (
    <Card className="w-full h-full border-2 rounded-sm shadow-none gap-0">
      <CardHeader className="flex flex-col items-center justify-center">
        <div className="flex gap-2">
          <h1 className="text-lg font-bold text-primary">{APP_NAME}</h1>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        <div className="flex gap-2">
          <a
            href="https://wxt.dev"
            target="_blank"
            rel="noreferrer"
            className="relative group block rounded-full"
          >
            <div className="absolute inset-0 rounded-full transition-all duration-300 group-hover:bg-[#54bc4a]/30 dark:group-hover:bg-[#54bc4a]/40 blur-md"></div>
            <img
              src={wxtLogo}
              className="h-24 p-3 inline-block relative transition-all duration-300"
              alt="WXT logo"
            />
          </a>
          <a
            href="https://react.dev"
            target="_blank"
            rel="noreferrer"
            className="group relative block rounded-full"
          >
            <div className="absolute inset-0 rounded-full transition-all duration-300 group-hover:bg-[#61dafb]/30 dark:group-hover:bg-[#61dafb]/40 blur-md"></div>
            <img
              src={reactLogo}
              className="h-24 p-3 inline-block relative transition-all duration-300 group-[.group]:animate-[spin_20s_linear_infinite]"
              alt="React logo"
            />
          </a>
        </div>
        <div className="py-2">
          <Button onClick={() => setCount((count) => count + 1)} size="sm">
            count is {count}
          </Button>
        </div>
      </CardContent>
      <CardFooter className="mt-auto flex flex-col items-center">
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Edit{" "}
          <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">src/app.tsx</code>{" "}
          and save to test HMR
        </p>
        <p className="text-xs text-gray-500 dark:text-gray-400">
          Click on the WXT and React logos to learn more
        </p>
      </CardFooter>
    </Card>
  );
};

function App({ trigger }: AppProps) {
  const [isVisible, setIsVisible] = useState(trigger === Trigger.POPUP);
  const [showFloatingButton, setShowFloatingButton] = useState(true);
  const container = useContext(PortalContext);

  useEffect(() => {
    store.settings
      .getValue()
      .then((settings) => setShowFloatingButton(settings.showFloatingActionButton ?? true));
    const unwatch = store.settings.watch((settings) =>
      setShowFloatingButton(settings.showFloatingActionButton ?? true)
    );
    return () => unwatch();
  }, []);

  const toggleVisibility = () => {
    if (trigger === Trigger.POPUP) {
      window.close();
    } else {
      setIsVisible((prev) => !prev);
    }
  };

  if (trigger === Trigger.POPUP) {
    return (
      <div className="p-4 w-[500px] h-[380px] text-primary bg-background flex flex-col">
        <SettingsPanel container={container} />
      </div>
    );
  }

  return (
    <>
      {showFloatingButton && <FloatingActionButton onClick={toggleVisibility} />}
      <PopupPanel isVisible={isVisible} onClose={toggleVisibility} trigger={trigger}>
        <Content />
      </PopupPanel>
    </>
  );
}

export default App;
