import React from "react";
import { Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Header.css";

export default function Header() {
  const navigate = useNavigate();

  return (
    <header className="app-header">
      {/* LEFT BRAND */}
      <div className="header-left">
        <span className="brand-name">Kiddo Shadow</span>
      </div>

      {/* RIGHT ACTIONS */}
      <div className="header-right">
        <button
          className="icon-btn"
          aria-label="Notifications"
          onClick={() => navigate("/Notifications")}
        >
          <Bell size={20} />
          <span className="dot" />
        </button>
      </div>
    </header>
  );
}
