import { faSun, faMoon } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { useState, useEffect } from "react";

export default function ThemeButton() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  let classes = isDarkMode
    ? "bg-slate-700 text-yellow-200"
    : "bg-slate-200 hover:text-yellow-300";

  classes +=
    " absolute -top-4 right-10 my-10 w-11 h-11 rounded-xl duration-200";

  useEffect(() => {
    if (
      localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
    ) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDarkMode(true);
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, []);

  function handleToggleTheme() {
    setIsDarkMode((prevIsDarkMode) => {
      if (prevIsDarkMode) {
        document.documentElement.classList.remove("dark");
        localStorage.setItem("theme", "light");
      } else {
        document.documentElement.classList.add("dark");
        localStorage.setItem("theme", "dark");
      }
      return !prevIsDarkMode;
    });
  }

  return (
    <button onClick={handleToggleTheme} className={classes}>
      <FontAwesomeIcon icon={isDarkMode ? faSun : faMoon} size="xl" />
    </button>
  );
}
