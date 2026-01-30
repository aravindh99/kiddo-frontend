import "./Home.css";
import {
  BookOpen,
  Notebook,
  Library,
  BarChart3,
  CalendarDays,
  HelpCircle,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";
import Floating from "../../floatingbutton/Floating.jsx";

import aiImage from "../../../assets/images/login image 2.png";

export default function Home() {
  const navigate = useNavigate();
  const [showMore, setShowMore] = useState(false);

  return (
    <div className="home">
      <Header />

      <main className="home-scroll">
        {/* GREETING */}
        <section className="home-header">
          <h1>Hey Abi</h1>
        </section>

        {/* AI */}
        <section className="ai-section">
          <div className="ai-orb" onClick={() => navigate("/students/robot")} role="button">
            <div className="ai-avatar">
              <img src={aiImage} alt="AI Assistant" className="zoom-ani" />
            </div>
            <span className="ai-cta">Tap to chat</span>
          </div>
        </section>

        {/* QUICK ACTIONS */}
        <section className="section">
          <div className="section-header">
            <h2>Quick Actions</h2>
          </div>

          <div className="grid">
            <div
              className="card"
              role="button"
              onClick={() => navigate("/students/diary")}
            >
              <BookOpen />
              <span>Diary</span>
            </div>

            <div
              className="card"
              role="button"
              onClick={() => navigate("/students/timetable")}
            >
              <CalendarDays />
              <span>Timetable</span>
            </div>
          </div>
        </section>

        {/* TODAY */}
        <section className="section">
          <div className="section-header">
            <h2>Today</h2>
          </div>

          <div className="list">
            <div className="list-item">
              <div className="list-text">
                <h4>Maths – Class Test</h4>
                <p>Chapter 3: Algebra</p>
              </div>
              <span className="badge">10:00 AM</span>
            </div>

            <div className="list-item">
              <div className="list-text">
                <h4>Science – Notes Added</h4>
                <p>Chapter 5: Energy</p>
              </div>
              <span className="badge new">Just now</span>
            </div>
          </div>
        </section>

        {/* PROGRESS */}
        <section className="progress">
          <div className="progress-card">
            <h3>8.5</h3>
            <p>Avg Score</p>
          </div>
          <div className="progress-card">
            <h3>12</h3>
            <p>Tests Done</p>
          </div>
        </section>
      </main>

      {/* FLOATING ACTION BUTTON */}
      <Floating />

      <Footer />
    </div>
  );
}
