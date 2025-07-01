import { Persona, Theme } from "@/types/types";
import { createContext, useContext, useEffect, useState } from "react";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: string;
  fast: Boolean;
  additionalThemes: Persona | undefined;
  setFast: (fast: Boolean) => void;
  setTheme: (theme: Theme) => void;
  setAdditionalThemes: (themes: Persona | undefined) => void;
  resetAdditionalThemes: () => void;
};

const initialState: ThemeProviderState = {
  theme: Theme.SYSTEM,
  fast: true,
  additionalThemes: undefined,
  setFast: () => null,
  setTheme: () => null,
  setAdditionalThemes: () => null,
  resetAdditionalThemes: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const defaultTheme = window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  const [additionalThemes, setAdditionalThemes] = useState<Persona | undefined>(
    () => (localStorage.getItem("vite-ui-additional-theme") as Persona) || ''
  );

  const [fast, setFast] = useState<Boolean>(
    () => localStorage.getItem("vite-ui-fast") === "false" || false
  );

  const resetAdditionalThemes = () => {
    const root = window.document.documentElement;
    root.classList.remove("creator", "developer", "dreamer");
    setAdditionalThemes(undefined);
  };

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove("light", "dark");
    root.classList.remove("creator", "developer", "dreamer");
    root.classList.remove("fast");

    if (theme) {
      root.classList.add(theme);
    }

    if (additionalThemes) {
      root.classList.add(additionalThemes);
    }

    if (fast) {
      root.classList.add("fast");
    }
    
  }, [theme, additionalThemes, fast]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    additionalThemes,
    setAdditionalThemes: (theme: Persona | undefined) => {
      localStorage.setItem("vite-ui-additional-theme", theme ?? '');
      if (!theme) {
        resetAdditionalThemes();
      }
      setAdditionalThemes(theme);
    },
    resetAdditionalThemes,
    fast,
    setFast: (fast: Boolean) => {
      localStorage.setItem("vite-ui-fast", fast ? "true" : "false");
      setFast(fast);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error("useTheme must be used within a ThemeProvider");

  return context;
};
