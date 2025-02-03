"use client";

import { useTheme } from "next-themes";

import { Switch } from "@/components/shadcn-ui/switch";

export function ThemeSwitcher() {
  const { setTheme } = useTheme();
  const currentTheme = useTheme().theme;

  const handleTheme = () => {
    setTheme(currentTheme === "light" ? "dark" : "light");
  };

  return (
    <div className="flex items-center space-x-2">
      <Switch onClick={handleTheme} id="airplane-mode" />
    </div>
  );
}
