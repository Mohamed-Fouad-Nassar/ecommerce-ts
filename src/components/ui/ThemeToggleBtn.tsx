import { useEffect } from "react";

import { toggleTheme } from "@store/theme/themeSlice";
import { useAppDispatch, useAppSelector } from "@store/hooks";

import SunIcon from "@assets/svg/sun.svg?react";
import MoonIcon from "@assets/svg/moon.svg?react";

import styles from "./themeToggleBtn.module.css";

export default function ThemeToggleBtn() {
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isDarkMode) document.body.setAttribute("data-bs-theme", "light");
    else document.body.setAttribute("data-bs-theme", "dark");
  }, [isDarkMode]);

  return (
    <button
      onClick={() => dispatch(toggleTheme())}
      className={styles["theme-toggle"]}
    >
      {isDarkMode ? (
        <MoonIcon title="dark mode icon" />
      ) : (
        <SunIcon title="light mode icon" />
      )}
      {/* ☀️ */}
    </button>
  );
}
