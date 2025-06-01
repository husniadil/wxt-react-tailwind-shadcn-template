import reactLogo from "@/assets/react.svg";
import { ThemeToggle } from "@/components/theme-toggle";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import wxtLogo from "/wxt.svg";

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <div className="max-w-[1280px] mx-auto p-8 text-center">
        <ThemeToggle />
        <div className="flex gap-4">
          <a href="https://wxt.dev" target="_blank" rel="noreferrer">
            <img
              src={wxtLogo}
              className="h-24 p-6 inline-block transition-[filter] duration-300 hover:drop-shadow-[0_0_2em_#54bc4ae0]"
              alt="WXT logo"
            />
          </a>
          <a href="https://react.dev" target="_blank" rel="noreferrer" className="group">
            <img
              src={reactLogo}
              className="h-24 p-6 inline-block transition-[filter] duration-300 hover:drop-shadow-[0_0_2em_#61dafbaa] group-first-of-type:animate-[spin_20s_linear_infinite]"
              alt="React logo"
            />
          </a>
        </div>
        <h1 className="text-2xl font-bold">WXT + React</h1>
        <div className="p-8">
          <Button onClick={() => setCount((count) => count + 1)}>count is {count}</Button>
          <p className="mt-4">
            Edit{" "}
            <code className="font-mono bg-gray-100 dark:bg-gray-800 px-1 rounded">src/App.tsx</code>{" "}
            and save to test HMR
          </p>
        </div>
        <p className="text-gray-400 dark:text-gray-500">
          Click on the WXT and React logos to learn more
        </p>
      </div>
    </>
  );
}

export default App;
