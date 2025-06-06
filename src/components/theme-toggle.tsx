"use client";

import { useTheme } from "@/components/theme-provider";
import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

export function ThemeToggle() {
  const { setTheme, theme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      className="group"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      aria-pressed={theme === "dark"}
      aria-label="Toggle theme"
    >
      <Sun className="h-4 w-4 dark:hidden text-primary group-hover:text-[#D97757] dark:group-hover:text-[#D97757]" />
      <Moon className="hidden h-4 w-4 dark:block text-primary group-hover:text-[#D97757] dark:group-hover:text-[#D97757]" />
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}
