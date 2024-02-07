"use client";

import useHydratedStore from "@/lib/useHydratedStore";
import { useThemeStore, selectors } from "@/stores/theme";
import { useCallback, useEffect, useRef, useState } from "react";
import { Moon, Sun } from "react-feather";

export default function ThemeToggle() {
  const theme = useHydratedStore(useThemeStore, selectors.theme);
  const toggleTheme = useThemeStore(selectors.toggleTheme);
  const [circleOffset, setCircleOffset] = useState<number | null>(null);

  const sunRef = useRef<HTMLDivElement>(null);
  const moonRef = useRef<HTMLDivElement>(null);

  const fill = theme === "light" ? "black" : "white";

  const handleChangeLight = useCallback(() => {
    if (sunRef.current) {
      setCircleOffset(
        sunRef.current?.offsetLeft - sunRef.current?.offsetWidth / 6,
      );
    }
  }, []);

  const handleChangeDark = useCallback(() => {
    if (moonRef.current) {
      setCircleOffset(
        moonRef.current?.offsetLeft - moonRef.current.offsetWidth / 6,
      );
    }
  }, []);

  useEffect(() => {
    if (theme === "light") handleChangeLight();
    if (theme === "dark") handleChangeDark();
  }, [theme, handleChangeLight, handleChangeDark]);

  const onSunClick = (e: any) => {
    e.preventDefault();
    handleChangeLight();
    toggleTheme("light");
  };

  const onMoonClick = (e: any) => {
    e.preventDefault();
    handleChangeDark();
    toggleTheme("dark");
  };

  return (
    <div className="flex flex-col justify-center">
      <div className="relative flex flex-row items-center h-10 gap-5">
        <div
          ref={sunRef}
          className="group relative h-6 w-6 cursor-pointer shrink-0"
          onClick={onSunClick}
        >
          <Sun fill={fill} />
        </div>
        <div
          ref={moonRef}
          className="h-6 w-6 cursor-pointer shrink-0"
          onClick={onMoonClick}
        >
          <Moon fill={fill} />
        </div>
        {circleOffset !== null && (
          <div
            className="circle absolute h-8 w-8 border border-black dark:border-white rounded-full transition-translate duration-200 pointer-events-none"
            style={{ translate: circleOffset }}
          />
        )}
      </div>
    </div>
  );
}
