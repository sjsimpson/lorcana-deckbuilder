import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ThemeState {
  theme: "dark" | "light";
  toggleTheme: (theme: ThemeState["theme"]) => void;
}

export const useThemeStore = create<ThemeState>()(
  persist(
    (set, get) => ({
      theme: "light",
      toggleTheme: (theme: ThemeState["theme"]) =>
        set({
          theme,
        }),
    }),
    {
      name: "theme-storage",
    },
  ),
);

export const selectors = {
  theme: (state: ThemeState) => state.theme,
  toggleTheme: (state: ThemeState) => state.toggleTheme,
};
