"use client";

import React, { createContext, useState, useEffect, useContext } from "react";
import { searchEngineConfig } from "@/../devsmith.config";

interface ThemeContextType {
  theme: "dark" | "light";
  toggleTheme: () => void;
}

export const ThemeContext = createContext<ThemeContextType>({
  theme: searchEngineConfig.theme.default,
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }: { children: React.ReactNode }) => {
  const [theme, setTheme] = useState<"dark" | "light">(searchEngineConfig.theme.default);

  useEffect(() => {
    const localTheme = localStorage.getItem(searchEngineConfig.theme.storageKey) as "dark" | "light" | null;
    setTheme(localTheme || searchEngineConfig.theme.default);
  }, []);

  const toggleTheme = () => {
    setTheme((prev) => (prev === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    if (theme) {
      localStorage.setItem(searchEngineConfig.theme.storageKey, theme);
      document.documentElement.setAttribute("data-theme", theme);
    }
  }, [theme]);

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
