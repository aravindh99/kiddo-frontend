import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Diary.css";
import {
  Calendar,
  Clock,
  X,
  BookText,
  Megaphone,
  ChevronRight,
  Bell
} from "lucide-react";

import Header from "../header/Header.jsx";
import Footer from "../footer/ParentsFooter.jsx";

export default function Diary() {
  const navigate = useNavigate();
  const students = [
    { id: 1, name: "Abhimanyu", grade: "Grade 4-A", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abhimanyu" },
    { id: 2, name: "Siddharth", grade: "Grade 2-B", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siddharth" },
  ];

  const [selectedStudent, setSelectedStudent] = useState(students[0]);
  const [activeTab, setActiveTab] = useState("diary"); // "diary" or "announcements"

  return (
    <div className="diary">
      <Header
        students={students}
        selectedStudent={selectedStudent}
        onSwitch={setSelectedStudent}
      />

      <main className="diary-scroll">
        {/* ELITE BRAND HEADER */}
        <section className="diary-header-premium">
          <div className="diary-brand-section">
            <div className="diary-icon-orb">
              {activeTab === "diary" ? (
                <BookText size={22} color="#00e5ff" />
              ) : (
                <Megaphone size={22} color="#f472b6" />
              )}
            </div>
            <div className="diary-meta-text">
              <h1>{activeTab === "diary" ? "Parent's Diary" : "Announcements"}</h1>
              <p>
                Academic overview for <strong>{selectedStudent.name}</strong> •
                <span
                  className="timetable-link"
                  onClick={() => navigate("/parents/timetable")}
                  style={{ marginLeft: '4px', color: 'var(--brand-blue)', fontWeight: '700', cursor: 'pointer', textDecoration: 'underline' }}
                >
                  View Schedule
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* PROFESSIONAL TAB SWITCHER */}
        <div className="tab-switcher-container">
          <button
            className={`tab-btn ${activeTab === "diary" ? "active" : ""}`}
            onClick={() => setActiveTab("diary")}
          >
            <BookText size={18} />
            Diary
          </button>
          <button
            className={`tab-btn ${activeTab === "announcements" ? "active pink" : ""}`}
            onClick={() => setActiveTab("announcements")}
          >
            <Bell size={18} />
            Announcements
          </button>
        </div>

        {activeTab === "diary" ? (
          <div className="diary-content-fade">
            {/* TODAY SECTION */}
            <section className="timeline-section">
              <div className="timeline-header">
                <div className="timeline-info">
                  <h2>Today</h2>
                  <p>January 2, 2026</p>
                </div>
                <span className="task-count">3 tasks</span>
              </div>

              <div className="tasks-container">
                <Task
                  subject="Mathematics"
                  teacher="Mrs. Sharma"
                  task="Complete Exercise 3 (Page 45-47)"
                  time="Due 5:00 PM"
                  type="maths"
                />

                <Task
                  subject="Science"
                  teacher="Mr. Kumar"
                  task="Read Chapter 5 - Energy & write summary"
                  time="Due Tomorrow"
                  type="science"
                />

                <Task
                  subject="English"
                  teacher="Ms. Priya"
                  task='Essay: "Impact of Technology" (500 words)'
                  time="Due Tomorrow"
                  type="english"
                />
              </div>
            </section>
          </div>
        ) : (
          <div className="announcements-content-fade">
            {/* ANNOUNCEMENTS FEED */}
            <section className="timeline-section">
              <div className="timeline-header">
                <div className="timeline-info">
                  <h2>Recent Alerts</h2>
                  <p>Important School Updates</p>
                </div>
              </div>

              <div className="announcement-list">
                <Announcement
                  title="Annual Sports Meet 2026"
                  desc="The annual sports meet is scheduled for Jan 15th. Please ensure students are in proper sports uniform."
                  date="Jan 10, 2026"
                  priority="high"
                />
                <Announcement
                  title="Parent-Teacher Meeting"
                  desc="PTM for the second term will be held this Saturday from 9:00 AM to 12:00 PM."
                  date="Jan 08, 2026"
                  priority="normal"
                />
                <Announcement
                  title="New Library Policy"
                  desc="Students can now borrow up to 3 books for a period of 15 days using their ID cards."
                  date="Jan 05, 2026"
                  priority="low"
                />
              </div>
            </section>
          </div>
        )}

        {/* SUPREME CLEARANCE BREAK */}
        <div className="bottom-space" style={{ height: '140px' }} />
      </main>

      <Footer />
    </div>
  );
}

/* ELITE TASK COMPONENT */
function Task({ subject, teacher, task, time, type }) {
  return (
    <div className={`diary-task-card ${type}`}>
      <div className="task-header">
        <span className="subject-name">{subject}</span>
        <span className="teacher-name">{teacher}</span>
      </div>
      <p className="task-desc">{task}</p>
      <div className="task-footer">
        <Clock size={14} />
        <span>{time}</span>
      </div>
    </div>
  );
}

/* ELITE ANNOUNCEMENT COMPONENT */
function Announcement({ title, desc, date, priority }) {
  return (
    <div className={`announcement-card ${priority}`}>
      <div className="a-top">
        <h3>{title}</h3>
        <span className="a-date">{date}</span>
      </div>
      <p className="a-desc">{desc}</p>
      <div className="a-footer">
        <ChevronRight size={16} />
        <span>View Details</span>
      </div>
    </div>
  );
}
