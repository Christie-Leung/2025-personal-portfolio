import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";
type AdditionalThemes = "creator" | "developer" | "dreamer";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  setAdditionalThemes: (themes: AdditionalThemes | undefined) => void;
  resetAdditionalThemes: () => void;
};

const initialState: ThemeProviderState = {
  theme: "system",
  setTheme: () => null,
  setAdditionalThemes: () => null,
  resetAdditionalThemes: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

export function ThemeProvider({
  children,
  defaultTheme = "system",
  storageKey = "vite-ui-theme",
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(
    () => (localStorage.getItem(storageKey) as Theme) || defaultTheme
  );

  const [additionalThemes, setAdditionalThemes] = useState<AdditionalThemes | undefined>(
    () => (localStorage.getItem(storageKey) as AdditionalThemes) || ''
  );

  const resetAdditionalThemes = () => {
    const root = window.document.documentElement;
    root.classList.remove("creator", "developer", "dreamer");
    setAdditionalThemes(undefined);
  };

  useEffect(() => {
    const root = window.document.documentElement;
    console.log("running theme effect");

    root.classList.remove("light", "dark");
    root.classList.remove("creator", "developer", "dreamer");

    if (theme === "system") {
      const systemTheme = window.matchMedia("(prefers-color-scheme: dark)")
        .matches
        ? "dark"
        : "light";

      root.classList.add(systemTheme);
      return;
    }

    console.log("Setting theme:", additionalThemes, theme);

    if (additionalThemes) {
      root.classList.add(additionalThemes);
    }

    console.log(root.classList);

    root.classList.add(theme);
  }, [theme, additionalThemes]);

  const value = {
    theme,
    setTheme: (theme: Theme) => {
      localStorage.setItem(storageKey, theme);
      setTheme(theme);
    },
    setAdditionalThemes: (theme: AdditionalThemes | undefined) => {
      localStorage.setItem("vite-ui-additional-themes", theme ?? '');
      if (!theme) {
        resetAdditionalThemes();
      }
      console.log("Setting additional themes:", theme);
      setAdditionalThemes(theme);
    },
    resetAdditionalThemes,
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
