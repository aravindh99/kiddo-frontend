import React from "react";
import { Bell } from "lucide-react";
import { BsMoonStars, BsBrightnessHigh } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();
  const location = useLocation();

  // Theme Sync (Direct DOM manipulation for high performance)
  const toggleTheme = () => {
    const currentTheme = document.documentElement.getAttribute("data-theme") || "dark";
    const newTheme = currentTheme === "light" ? "dark" : "light";
    document.documentElement.setAttribute("data-theme", newTheme);
    localStorage.setItem("theme", newTheme);

    // Support legacy dark class if needed
    if (newTheme === "dark") {
      document.documentElement.classList.add("dark");
      document.body.classList.add("dark-mode");
    } else {
      document.documentElement.classList.remove("dark");
      document.body.classList.remove("dark-mode");
    }
  };

  const isDark = () => document.documentElement.getAttribute("data-theme") === "dark";
  const isLoginPage = location.pathname === "/login";

  return (
    <header className="app-header">
      {/* LEFT BRAND */}
      <div className="header-left">
        <span className="brand-name">Kiddo Shadow</span>
      </div>

      {/* RIGHT ACTIONS */}
      <div className="header-right">
        {/* THEME TOGGLE (SMALL & PROFESSIONAL) */}
        {!isLoginPage && (
          <button
            className="icon-btn theme-fix-btn"
            onClick={toggleTheme}
            aria-label="Toggle Theme"
          >
            {/* Direct icon check via state or simple selector if state not passed */}
            <BsBrightnessHigh className="sun-icon" size={16} />
            <BsMoonStars className="moon-icon" size={16} />
          </button>
        )}

        <button
          className="icon-btn"
          aria-label="Notifications"
          onClick={() => navigate("/students/notifications")}
        >
          <Bell size={18} />
          <span className="dot" />
        </button>
      </div>
    </header>
  );
}
