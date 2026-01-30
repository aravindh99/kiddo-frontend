import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FileText,
  ChevronDown,
  Plus,
  Trash2,
  Send,
  CheckCircle2,
  Pencil,
  Award,
  TrendingUp,
  X,
  AlertCircle,
  Save,
  ArrowRight,
  MoreVertical,
  Search,
  Filter
} from "lucide-react";
import "./TeacherReports.css";
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";
import Floating from "../../floatingbutton/Floating.jsx";

/* =============================
   CUSTOM DROPDOWN COMPONENT
============================= */
const GlassSelect = ({ label, value, options, onChange, variant = "default" }) => {
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
    <div className={`glass-select-v3 variant-${variant}`} ref={ref}>
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

export default function TeacherReports() {
  const [grade, setGrade] = useState("Grade 7");
  const [section, setSection] = useState("A");
  const [activeCategory, setActiveCategory] = useState("tests");
  const [isSuccess, setIsSuccess] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // MANAGEMENT STATES
  const [editingTest, setEditingTest] = useState(null);
  const [deletingTest, setDeletingTest] = useState(null);

  const [tests, setTests] = useState([
    { id: 1, subject: "Mathematics", date: "15 Jan 2026", score: "45/50", grade: "A+", perc: "90%" },
    { id: 2, subject: "Science", date: "12 Jan 2026", score: "42/50", grade: "A", perc: "84%" }
  ]);

  const handleUpdate = (e) => {
    e.preventDefault();
    setTests(tests.map(t => t.id === editingTest.id ? editingTest : t));
    setEditingTest(null);
  };

  const confirmDelete = () => {
    setTests(tests.filter(t => t.id !== deletingTest.id));
    setDeletingTest(null);
  };

  const handleSendResults = () => {
    setIsSuccess(true);
    setTimeout(() => setIsSuccess(false), 3000);
  };

  return (
    <div className="teacher-reports-page-premium">
      <Header />

      <main className="reports-container">
        {/* TOP ADAPTIVE BAR */}
        <section className="adaptive-management-bar">
          <div className="category-pill-switcher">
            <button
              className={`switcher-tab ${activeCategory === 'major' ? 'active' : ''}`}
              onClick={() => setActiveCategory('major')}
            >
              <Award size={16} />
              <span>Major</span>
            </button>
            <button
              className={`switcher-tab ${activeCategory === 'tests' ? 'active' : ''}`}
              onClick={() => setActiveCategory('tests')}
            >
              <TrendingUp size={16} />
              <span>Tests</span>
            </button>
          </div>

          <button className="elite-upload-btn">
            <Plus size={18} />
            <span className="btn-lbl">New Record</span>
          </button>
        </section>

        {/* REFINED SELECTION HUB */}
        <section className="refined-selectors">
          <div className="selector-group">
            <GlassSelect label="Grade" value={grade} options={["Grade 6", "Grade 7", "Grade 8"]} onChange={setGrade} />
            <GlassSelect label="Section" value={section} options={["A", "B", "C"]} onChange={setSection} />
          </div>
        </section>

        {/* PREMIUM SEARCH PILL */}
        <section className="reports-search-hub">
          <div className="search-pill-v3">
            <Search size={18} />
            <input
              placeholder="Search records..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <Filter size={18} />
          </div>
        </section>

        {/* ELITE REPORTS LIST */}
        <div className="elite-reports-list">
          {tests.map((test) => (
            <motion.div
              key={test.id}
              className="elite-report-card"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <div className="card-primary-block">
                <div className="card-visual-icon">
                  <FileText size={22} />
                  <div className="glow-ring" />
                </div>

                <div className="card-textual-info">
                  <span className="card-date-stamp">{test.date}</span>
                  <h3>{test.subject}</h3>
                </div>

                <div className="card-quick-actions">
                  <button className="action-dot-btn" onClick={() => setEditingTest(test)}>
                    <Pencil size={14} />
                  </button>
                  <button className="action-dot-btn danger" onClick={() => setDeletingTest(test)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>

              <div className="card-detailed-stats">
                <div className="stat-unit">
                  <span className="v-lbl">Performance</span>
                  <div className="v-val-group">
                    <span className="v-score">{test.score}</span>
                    <span className={`v-grade grade-${test.grade.replace('+', 'plus')}`}>
                      {test.grade}
                    </span>
                  </div>
                </div>

                <div className="stat-separator" />

                <div className="stat-unit align-right">
                  <span className="v-lbl">Efficiency</span>
                  <div className="v-perc-glow">{test.perc}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* DISPATCH RESULTS SECTION */}
        <div className="reports-footer-pro">
          <button
            className={`pro-dispatch-btn ${isSuccess ? 'success' : ''}`}
            onClick={handleSendResults}
          >
            {isSuccess ? (
              <><CheckCircle2 size={22} /><span>Results Synchronized</span></>
            ) : (
              <><Send size={22} /><span>Dispatch Results</span></>
            )}
          </button>
        </div>
      </main>


      {/* EDIT DRAWER */}
      <AnimatePresence>
        {editingTest && (
          <div className="elite-drawer-wrapper">
            <motion.div className="drawer-scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setEditingTest(null)} />
            <motion.div
              className="elite-drawer"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="drawer-pill-handle" />
              <div className="drawer-header-elite">
                <div className="drawer-icon-box"><Pencil size={24} /></div>
                <div className="drawer-title-box">
                  <h4>Edit Record</h4>
                  <p>Modify examination data for {editingTest.subject}</p>
                </div>
                <button className="drawer-close-btn" onClick={() => setEditingTest(null)}><X size={20} /></button>
              </div>

              <form className="drawer-elite-form" onSubmit={handleUpdate}>
                <div className="elite-input-field">
                  <label>Subject Name</label>
                  <input type="text" value={editingTest.subject} onChange={e => setEditingTest({ ...editingTest, subject: e.target.value })} placeholder="Subject Title..." />
                </div>
                <div className="elite-input-grid">
                  <div className="elite-input-field">
                    <label>Exam Date</label>
                    <input type="text" value={editingTest.date} onChange={e => setEditingTest({ ...editingTest, date: e.target.value })} placeholder="DD MMM YYYY" />
                  </div>
                  <div className="elite-input-field">
                    <label>Total Score</label>
                    <input type="text" value={editingTest.score} onChange={e => setEditingTest({ ...editingTest, score: e.target.value })} placeholder="XX/YY" />
                  </div>
                </div>
                <div className="drawer-elite-actions">
                  <button type="button" className="elite-btn tertiary" onClick={() => setEditingTest(null)}>Cancel</button>
                  <button type="submit" className="elite-btn primary">
                    <Save size={18} />
                    <span>Confirm Changes</span>
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* DELETE DIALOG */}
      <AnimatePresence>
        {deletingTest && (
          <div className="elite-dialog-wrapper">
            <motion.div className="dialog-scrim" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setDeletingTest(null)} />
            <motion.div
              className="elite-dialog"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
            >
              <div className="dialog-alert-header">
                <div className="alert-icon-ring"><AlertCircle size={32} /></div>
                <h3>Permanent Deletion</h3>
                <p>Are you sure you want to remove the record for <strong>{deletingTest.subject}</strong>? This action is irreversible.</p>
              </div>
              <div className="dialog-elite-actions">
                <button className="elite-btn tertiary" onClick={() => setDeletingTest(null)}>Retain Record</button>
                <button className="elite-btn danger" onClick={confirmDelete}>
                  <span>Execute Purge</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Floating />
      <Footer />
    </div>
  );
}
