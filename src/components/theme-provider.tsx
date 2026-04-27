import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light" | "system";

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeContextValue = {
  theme: Theme;
  resolvedTheme: "dark" | "light";
  setTheme: (theme: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined);

export function ThemeProvider({
  children,
  defaultTheme = "dark",
  storageKey = "intelliforge-theme",
}: ThemeProviderProps) {
  const [theme, setThemeState] = useState<Theme>(defaultTheme);
  const [resolvedTheme, setResolvedTheme] = useState<"dark" | "light">("dark");

  useEffect(() => {
    const stored = (typeof window !== "undefined"
      ? (localStorage.getItem(storageKey) as Theme | null)
      : null) ?? defaultTheme;
    setThemeState(stored);
  }, [defaultTheme, storageKey]);

  useEffect(() => {
    const root = document.documentElement;
    const sysDark = window.matchMedia("(prefers-color-scheme: dark)").matches;
    const next = theme === "system" ? (sysDark ? "dark" : "light") : theme;
    root.classList.remove("light", "dark");
    root.classList.add(next);
    setResolvedTheme(next);
  }, [theme]);

  const setTheme = (t: Theme) => {
    if (typeof window !== "undefined") localStorage.setItem(storageKey, t);
    setThemeState(t);
  };

  return (
    <ThemeContext.Provider value={{ theme, resolvedTheme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeProvider");
  return ctx;
}
