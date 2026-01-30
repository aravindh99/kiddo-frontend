import React, { useState } from "react";
import { Bell, ChevronDown, Check } from "lucide-react";
import { BsMoonStars, BsBrightnessHigh } from "react-icons/bs";
import { useLocation, useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header({ students, selectedStudent, onSwitch }) {
  const navigate = useNavigate();
  const location = useLocation();
  const [showDropdown, setShowDropdown] = useState(false);

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
            <BsBrightnessHigh className="sun-icon" size={16} />
            <BsMoonStars className="moon-icon" size={16} />
          </button>
        )}

        {/* PREMIUM STUDENT SWITCHER */}        {/* PREMIUM STUDENT SWITCHER */}
        {students && selectedStudent && (
          <div className="student-switcher-wrapper">
            <button
              className={`header-profile-trigger ${showDropdown ? 'active' : ''}`}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <div className="user-avatar">
                <img src={selectedStudent.image} alt={selectedStudent.name} />
              </div>
            </button>

            {showDropdown && (
              <div className="student-dropdown-menu">
                <div className="dropdown-label">Switch Student</div>
                <div className="dropdown-divider" />
                {students.map((student) => (
                  <button
                    key={student.id}
                    className={`dropdown-item ${selectedStudent.id === student.id ? 'active' : ''}`}
                    onClick={() => {
                      onSwitch(student);
                      setShowDropdown(false);
                    }}
                  >
                    <div className="item-avatar">
                      <img src={student.image} alt={student.name} />
                    </div>
                    <div className="item-info">
                      <span className="name">{student.name}</span>
                      <span className="grade">{student.grade}</span>
                    </div>
                    {selectedStudent.id === student.id && (
                      <Check size={14} className="check-icon" />
                    )}
                  </button>
                ))}
              </div>
            )}

            {showDropdown && <div className="dropdown-overlay" onClick={() => setShowDropdown(false)} />}
          </div>
        )}

        <button
          className="icon-btn"
          aria-label="Notifications"
          onClick={() => navigate("/notifications")}
        >
          <Bell size={20} />
          <span className="dot" />
        </button>
      </div>
    </header>
  );
}
