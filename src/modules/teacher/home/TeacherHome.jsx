import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Calendar,
  Users,
  Clock,
  TrendingUp,
  BookOpen,
  PlusCircle,
  ClipboardCheck,
  ChevronRight,
  Bell,
  X,
  ChevronLeft
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./TeacherHome.css";
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";
import Floating from "../../floatingbutton/Floating.jsx";

const stats = [
  { label: "Total Sessions", value: "24", icon: Clock, color: "#38bdf8" },
  { label: "Students", value: "148", icon: Users, color: "#a855f7" },
  { label: "Avg. Attendance", value: "92%", icon: TrendingUp, color: "#10b981" },
  { label: "Assignments", value: "12", icon: BookOpen, color: "#f59e0b" },
];

const upcomingSessions = [
  { time: "09:00 AM", subject: "Mathematics", class: "Grade 10-A", room: "Room 102" },
  { time: "10:30 AM", subject: "Algebra II", class: "Grade 11-B", room: "Room 205" },
  { time: "01:00 PM", subject: "Geometry", class: "Grade 9-C", room: "Lab 01" },
];

const timetableData = [
  { day: "Mon", sessions: [{ time: "09:00", subject: "Math", duration: "1h", color: "#38bdf8" }, { time: "11:00", subject: "Physics", duration: "1.5h", color: "#818cf8" }] },
  { day: "Tue", sessions: [{ time: "10:30", subject: "Chemistry", duration: "1h", color: "#fb7185" }] },
  { day: "Wed", sessions: [{ time: "09:00", subject: "Math", duration: "1h", color: "#38bdf8" }, { time: "14:00", subject: "Geometry", duration: "1h", color: "#34d399" }] },
  { day: "Thu", sessions: [{ time: "10:30", subject: "Science", duration: "1.5h", color: "#f59e0b" }] },
  { day: "Fri", sessions: [{ time: "12:00", subject: "Math", duration: "1h", color: "#38bdf8" }] },
  { day: "Sat", sessions: [{ time: "10:00", subject: "Weekend Workshop", duration: "2h", color: "#a855f7" }] },
  { day: "Sun", sessions: [{ time: "11:00", subject: "Review Session", duration: "1h", color: "#10b981" }] },
];

// Unused constant removed

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { y: 20, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { type: "spring", stiffness: 300, damping: 24 },
  },
};

export default function TeacherHome() {
  const navigate = useNavigate();
  const [showTimetable, setShowTimetable] = useState(false);
  const [showAddSession, setShowAddSession] = useState(false);

  const [personalSessions, setPersonalSessions] = useState(timetableData);

  const [newSession, setNewSession] = useState({
    day: "Mon",
    subject: "",
    time: "09:00 AM",
    duration: "1h",
    color: "#a855f7",
  });

  const handleAddSession = (e) => {
    e.preventDefault();
    const updatedPersonal = [...personalSessions];
    const dayIndex = updatedPersonal.findIndex((d) => d.day === newSession.day);
    if (dayIndex >= 0) {
      updatedPersonal[dayIndex].sessions.push({
        time: newSession.time,
        subject: newSession.subject,
        duration: newSession.duration,
        color: newSession.color,
      });
      setPersonalSessions(updatedPersonal);
    }
    setShowAddSession(false);
    setNewSession({ ...newSession, subject: "" });
  };

  // Removed unused handleGridEdit and renderSchoolGrid functions

  const getGreeting = () => {
    const hour = new Date().getHours();
    if (hour >= 5 && hour < 12) return "Good Morning";
    if (hour >= 12 && hour < 17) return "Good Afternoon";
    return "Good Evening";
  };

  const currentDate = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="teacher-home-page scroll-container">
      <Header />

      <motion.main
        className="teacher-home-content"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        {/* HERO SECTION */}
        <motion.section className="hero-section snap-item" variants={itemVariants}>
          <div className="hero-text">
            <h1>{getGreeting()}, <span className="highlight">Teacher</span></h1>
            <p>3 sessions scheduled today</p>
          </div>
        </motion.section>


        {/* STATS GRID */}
        <section className="stats-grid snap-item">
          {stats.map((stat, idx) => (
            <motion.div
              key={idx}
              className="stat-card"
              variants={itemVariants}
              whileHover={{ y: -5 }}
            >
              <div className="stat-icon" style={{ backgroundColor: `${stat.color}20`, color: stat.color }}>
                <stat.icon size={22} />
              </div>
              <div className="stat-info">
                <h3>{stat.value}</h3>
                <p>{stat.label}</p>
              </div>
            </motion.div>
          ))}
        </section>

        <div className="main-grid snap-item">
          {/* TODAY'S SCHEDULE - DYNAMIC PREVIEW */}
          <motion.section className="dashboard-section today-schedule" variants={itemVariants}>
            <div className="section-header">
              <h2>Today's Schedule</h2>
              <div className="header-actions">
                <button className="add-session-inline" onClick={() => setShowAddSession(true)}>
                  <PlusCircle size={18} />
                  <span>Add New</span>
                </button>
                <button className="text-link" onClick={() => navigate("/teachers/timetable")}>
                  View All <ChevronRight size={16} />
                </button>
              </div>
            </div>

            <div className="sessions-list">
              {(() => {
                const dayName = new Date().toLocaleDateString("en-US", { weekday: "short" });
                const todayPersonal = personalSessions.find(d => d.day === dayName)?.sessions || [];
                const allToday = todayPersonal.map(s => ({ ...s, type: 'personal' }))
                  .sort((a, b) => a.time.localeCompare(b.time));

                if (allToday.length > 0) {
                  return allToday.map((session, idx) => (
                    <div key={idx} className={`session-item ${session.type}`}>
                      <div className="session-time">
                        <span className="time">{session.time}</span>
                        <div className="indicator" style={{ backgroundColor: session.color }}></div>
                      </div>
                      <div className="session-details">
                        <h4>{session.subject}</h4>
                        <p>{session.duration} • <span className="type-badge">{session.type === 'personal' ? 'My Schedule' : 'School Official'}</span></p>
                      </div>
                      <button className="session-start shadow-glow">Start</button>
                    </div>
                  ));
                }
                return (
                  <div className="empty-schedule">
                    <Calendar size={32} />
                    <p>No sessions scheduled for today.</p>
                  </div>
                );
              })()}
            </div>
          </motion.section>

          {/* RECENT ACTIVITY */}
          <motion.section className="dashboard-section recent-activity" variants={itemVariants}>
            <div className="section-header">
              <h2>Recent Activity</h2>
            </div>
            <div className="activity-placeholder">
              <div className="empty-state">
                <BookOpen size={40} className="empty-icon" />
                <p>No recent submissions yet.</p>
                <span>Assignments usually appear here.</span>
              </div>
            </div>
          </motion.section>
        </div>
      </motion.main>

      {/* CALENDAR MODAL */}
      <AnimatePresence>
        {showTimetable && (
          <div className="calendar-modal-container">
            <motion.div
              className="calendar-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowTimetable(false)}
            />
            <motion.div
              className="calendar-popup"
              initial={{ y: "100%", opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: "100%", opacity: 0 }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="calendar-header">
                <div className="header-top">
                  <button className="back-btn" onClick={() => setShowTimetable(false)}><ChevronLeft size={24} /></button>
                  <div className="modal-title">
                    <h2>My Schedule</h2>
                  </div>
                  <div className="header-actions">
                    <button className="close-btn-circle" onClick={() => setShowTimetable(false)}><X size={20} /></button>
                  </div>
                </div>
                <div className="week-selector">
                  <span>January 2026 - Week 4</span>
                </div>
              </div>

              <div className="calendar-body">
                {personalSessions.map((dayData, idx) => (
                  <div key={idx} className="calendar-day-row">
                    <div className="day-label">
                      <span className="day-name">{dayData.day}</span>
                      <span className="day-date">{20 + idx}</span>
                    </div>
                    <div className="day-events">
                      {dayData.sessions.length > 0 ? (
                        dayData.sessions.map((session, sIdx) => (
                          <div key={sIdx} className="calendar-event-card" style={{ borderColor: session.color }}>
                            <div className="event-time">{session.time}</div>
                            <div className="event-info">
                              <span className="event-title">{session.subject}</span>
                              <span className="event-duration">{session.duration}</span>
                            </div>
                            <div className="event-indicator" style={{ backgroundColor: session.color }}></div>
                          </div>
                        ))
                      ) : (
                        <div className="no-events">No sessions for {dayData.day}</div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADD SESSION FORM - PROFESSIONAL BOTTOM DRAWER */}
      <AnimatePresence>
        {showAddSession && (
          <div className="form-modal-container">
            <motion.div
              className="form-overlay"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAddSession(false)}
            />
            <motion.div
              className="add-session-form"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
            >
              <div className="form-header">
                <div className="drag-handle"></div>
                <h3>New Session</h3>
                <p>Add a professional session to the timetable</p>
              </div>

              <form onSubmit={handleAddSession}>
                <div className="form-group">
                  <label>Day</label>
                  <select
                    value={newSession.day}
                    onChange={(e) => setNewSession({ ...newSession, day: e.target.value })}
                  >
                    {personalSessions.map(d => <option key={d.day} value={d.day}>{d.day}</option>)}
                  </select>
                </div>

                <div className="form-group">
                  <label>Subject / Topic</label>
                  <input
                    type="text"
                    placeholder="e.g. Advanced Calculus"
                    required
                    value={newSession.subject}
                    onChange={(e) => setNewSession({ ...newSession, subject: e.target.value })}
                  />
                </div>

                <div className="form-row">
                  <div className="form-group">
                    <label>Start Time</label>
                    <input
                      type="text"
                      placeholder="09:00 AM"
                      value={newSession.time}
                      onChange={(e) => setNewSession({ ...newSession, time: e.target.value })}
                    />
                  </div>
                  <div className="form-group">
                    <label>Duration</label>
                    <input
                      type="text"
                      placeholder="1.5h"
                      value={newSession.duration}
                      onChange={(e) => setNewSession({ ...newSession, duration: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button type="button" className="cancel-btn" onClick={() => setShowAddSession(false)}>Cancel</button>
                  <button type="submit" className="submit-btn shadow-glow">Create Session</button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Floating />
      <Footer />
    </div>
  );
}
