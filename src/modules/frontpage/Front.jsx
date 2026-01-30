import React from "react";
import { useNavigate } from "react-router-dom";
import "./Front.css";

import HERO_IMAGE from "../../assets/images/login image confirm.png";

export default function Front() {
  const navigate = useNavigate();

  return (
    <main className="hero-container">
      {/* BACKGROUND IMAGE */}
      <img
        src={HERO_IMAGE}
        alt="Hero background"
        className="hero-bg"
      />

      {/* OVERLAY */}
      <div className="hero-overlay" />

      {/* CONTENT */}
      <section className="hero-content">
        <h1 className="title">Welcome to <br /> KiddoShadow</h1>
        <button
          className="start-btn"
          onClick={() => navigate("/login")}
        >
          Get start
        </button>
      </section>
    </main>
  );
}
