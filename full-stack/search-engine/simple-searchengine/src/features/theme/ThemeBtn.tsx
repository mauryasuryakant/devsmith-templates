"use client";

import { BsMoon, BsSun } from "react-icons/bs";
import { useTheme } from "@/context/ThemeContext";

export default function ThemeBtn() {
  const { toggleTheme, theme } = useTheme();

  return (
    <button
      onClick={toggleTheme}
      className="flex items-center gap-2 px-3 py-2 rounded-lg bg-muted hover:bg-accent transition-colors text-sm text-muted-foreground hover:text-foreground"
      aria-label="Toggle theme"
    >
      {theme === "light" ? <BsMoon className="text-base" /> : <BsSun className="text-base" />}
      <span>{theme === "light" ? "Dark" : "Light"} Theme</span>
    </button>
  );
}
