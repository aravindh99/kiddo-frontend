import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronDown,
  Calendar,
  Search,
  Filter,
  ArrowRight,
  UserCheck,
  UserX,
  Users,
  CheckCircle2,
  Clock,
  LayoutGrid
} from "lucide-react";
import "./TeacherAttendance.css";
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";
import Floating from "../../floatingbutton/Floating.jsx";

/* =============================
   ANIMATION VARIANTS
============================= */
const containerFade = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true },
  transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] }
};

const cardIn = {
  initial: { opacity: 0, scale: 0.95, y: 20 },
  animate: (i) => ({
    opacity: 1,
    scale: 1,
    y: 0,
    transition: { delay: i * 0.04, duration: 0.5, ease: [0.16, 1, 0.3, 1] }
  })
};

/* =============================
   CUSTOM DROPDOWN COMPONENT
============================= */
const GlassSelect = ({ label, value, options, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  return (
    <div className="glass-select-v3" ref={ref}>
      <label className="select-label">{label}</label>
      <button className={`select-trigger ${isOpen ? 'active' : ''}`} onClick={() => setIsOpen(!isOpen)}>
        <span>{value || `Select ${label}`}</span>
        <ChevronDown size={16} />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="select-dropdown"
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
          >
            {options.map((opt) => (
              <div
                key={opt}
                className={`select-option ${value === opt ? 'selected' : ''}`}
                onClick={() => { onChange(opt); setIsOpen(false); }}
              >
                {opt}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default function TeacherAttendance() {
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [section, setSection] = useState("A");
  const [grade, setGrade] = useState("Grade 6");
  const [showRegistry, setShowRegistry] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const [students, setStudents] = useState([
    { id: 1, name: "Abi Sankar", present: true, roll: "01" },
    { id: 2, name: "Rahul Kumar", present: true, roll: "02" },
    { id: 3, name: "Sneha Kapoor", present: false, roll: "03" },
    { id: 4, name: "Karthik Raja", present: true, roll: "04" },
    { id: 5, name: "Maria Jose", present: true, roll: "05" }
  ]);

  const toggleAttendance = (id) =>
    setStudents((s) =>
      s.map((x) =>
        x.id === id ? { ...x, present: !x.present } : x
      )
    );

  const stats = {
    present: students.filter((s) => s.present).length,
    total: students.length,
    percentage: Math.round((students.filter(s => s.present).length / students.length) * 100)
  };

  const scrollNext = () => {
    setShowRegistry(true);
    setTimeout(() => {
      document
        .getElementById("registry-section")
        ?.scrollIntoView({ behavior: "smooth" });
    }, 100);
  };

  const handleSubmit = () => {
    setIsSubmitted(true);
  };

  return (
    <div className="teacher-attendance-page-v3">
      <Header />

      <main className="attendance-main-v3">
        {/* TOP ADAPTIVE HEADER */}
        <section className="attendance-adaptive-header">
          <motion.div className="header-branding" {...containerFade}>
            <div className="branding-title">
              <h1>Attendance Register</h1>
              <p>OLED Mastery • Term 1 2026</p>
            </div>

            <div className="stats-pill-group">
              <div className="stat-pill present">
                <div className="dot" />
                <span>{stats.present} Present</span>
              </div>
              <div className="stat-pill total">
                <span>{stats.total} total</span>
              </div>
            </div>
          </motion.div>

          {/* CONFIGURATION HUB */}
          <motion.div className="attendance-config-hub" {...containerFade}>
            <div className="hub-grid">
              <GlassSelect label="Grade" value={grade} options={["Grade 6", "Grade 7", "Grade 8"]} onChange={setGrade} />
              <GlassSelect label="Section" value={section} options={["A", "B", "C"]} onChange={setSection} />
              <div className="date-input-block">
                <label className="select-label">Academic Date</label>
                <div className="glass-input-wrapper">
                  <Calendar size={18} />
                  <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
                </div>
              </div>
            </div>

            <div className="hub-footer">
              <div className="selection-badge">
                <LayoutGrid size={14} />
                <span>{grade} - {section} Hub</span>
              </div>
              {!showRegistry && (
                <button className="elite-proceed-btn" onClick={scrollNext}>
                  <span>Load Registry</span>
                  <ArrowRight size={18} />
                </button>
              )}
            </div>
          </motion.div>
        </section>

        {/* REGISTRY SNAP */}
        {showRegistry && (
          <section className="attendance-registry-snap" id="registry-section">
            {isSubmitted ? (
              <motion.div className="registry-success-card" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
                <div className="success-icon-ring"><CheckCircle2 size={48} /></div>
                <h3>Registry Synchronized</h3>
                <p>Register for {grade} Section {section} successfully pushed to co-teachers and admin.</p>
                <button className="elite-btn-tertiary" onClick={() => { setIsSubmitted(false); setShowRegistry(false); }}>
                  Return to Dashboard
                </button>
              </motion.div>
            ) : (
              <>
                <div className="registry-controls-v3">
                  <div className="search-pill-v3">
                    <Search size={18} />
                    <input placeholder="Search records..." />
                    <Filter size={18} />
                  </div>
                </div>

                <div className="student-elite-grid">
                  {students.map((student, i) => (
                    <motion.div
                      key={student.id}
                      className={`student-card-v3 ${student.present ? 'present' : 'absent'}`}
                      custom={i}
                      variants={cardIn}
                      initial="initial"
                      animate="animate"
                      onClick={() => toggleAttendance(student.id)}
                    >
                      <div className="s-card-top">
                        <span className="s-roll">#{student.roll}</span>
                        <div className="s-status-tag">
                          {student.present ? <UserCheck size={14} /> : <UserX size={14} />}
                          <span>{student.present ? 'Present' : 'Absent'}</span>
                        </div>
                      </div>

                      <div className="s-card-body">
                        <div className="s-avatar">
                          {student.name[0]}
                          <div className="s-presence-indicator" />
                        </div>
                        <div className="s-info">
                          <h4>{student.name}</h4>
                          <span className="s-role">General Student</span>
                        </div>
                      </div>

                      <div className="s-card-footer">
                        <div className="s-quick-toggle">
                          <div className={`toggle-track ${student.present ? 'on' : 'off'}`}>
                            <div className="toggle-knob" />
                          </div>
                          <span>Attendance Marker</span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </>
            )}
          </section>
        )}
      </main>

      {/* FIXED ACTION FOOTER */}
      {showRegistry && !isSubmitted && (
        <div className="attendance-footer-pro">
          <button className="pro-dispatch-btn" onClick={handleSubmit}>
            <div className="btn-content">
              <CheckCircle2 size={22} />
              <span>Submit {section} Attendance</span>
            </div>
          </button>
        </div>
      )}

      <Floating />
      <Footer />
    </div>
  );
}
