import { useEffect, useState } from "react";
import AppNavigator from "./Navigation/AppNavigator";
import "./index.css";   // theme variables live here
import "./App.css";     // layout only (optional)

import { BsMoonStars, BsBrightnessHigh } from "react-icons/bs";

import { motion } from "framer-motion";
import { useLocation } from "react-router-dom";

function App() {
  const location = useLocation();

  // 1️⃣ Single source of truth for theme
  const [theme, setTheme] = useState(() => {
    return localStorage.getItem("theme") || "dark";
  });

  // 2️⃣ Apply theme to <html> (NOT body, NOT components)
  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    // Also apply a class for legacy CSS selectors if any
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark-mode");
    }
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 3️⃣ Optional: system theme on first load
  useEffect(() => {
    if (!localStorage.getItem("theme")) {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setTheme(prefersDark ? "dark" : "light");
    }
  }, []);

  const toggleTheme = () => {
    setTheme(prev => prev === "light" ? "dark" : "light");
  };

  const isFrontPage = location.pathname === "/";
  const isLoginPage = location.pathname === "/login";

  return (
    <div className="app">


      {/* Pass toggle only if needed */}
      <AppNavigator theme={theme} setTheme={setTheme} />
    </div>
  );
}

export default App;
