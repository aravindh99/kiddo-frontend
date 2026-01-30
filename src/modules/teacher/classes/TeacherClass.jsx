import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Book,
  MessageSquare,
  Plus,
  Send,
  X,
  FileText,
  Users,
  Search,
  Calendar,
  MoreVertical,
  Paperclip,
  Trash2,
  Filter,
  ArrowRight,
  Info
} from "lucide-react";
import "./TeacherClass.css";
import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";
import Floating from "../../floatingbutton/Floating.jsx";

/* =============================
   ANIMATION VARIANTS
============================= */
const fadeInUp = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] }
};

const drawerVariants = {
  hidden: { y: "100%", opacity: 0 },
  visible: { y: 0, opacity: 1, transition: { type: "spring", damping: 30, stiffness: 300 } },
  exit: { y: "100%", opacity: 0, transition: { duration: 0.3 } }
};

const overlayVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
  exit: { opacity: 0 }
};

/* =============================
   PREMIUM CREATION DRAWER
============================= */
const CreationDrawer = ({ isOpen, onClose, type, onAdd }) => {
  const [formData, setFormData] = useState({ title: "", author: "", due: "", desc: "" });

  useEffect(() => {
    if (isOpen) setFormData({ title: "", author: "", due: "", desc: "" });
  }, [isOpen, type]);

  const handleSubmit = (e) => {
    e.preventDefault();
    onAdd(formData);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="creation-drawer-overlay">
          <motion.div className="drawer-backdrop" variants={overlayVariants} initial="hidden" animate="visible" exit="exit" onClick={onClose} />
          <motion.div className={`creation-drawer theme-${type === 'book' ? 'books' : 'assignments'}`} variants={drawerVariants} initial="hidden" animate="visible" exit="exit">
            <div className="drawer-handle" />
            <div className="drawer-header">
              <div className="header-icon">
                {type === 'book' ? <Book size={24} /> : <FileText size={24} />}
              </div>
              <div className="header-text">
                <h3>{type === 'book' ? 'Add New Resource' : 'Create Assignment'}</h3>
                <p>{type === 'book' ? 'Publish a book or syllabus to the class library' : 'Schedule a new task and instructions for students'}</p>
              </div>
              <button className="drawer-close" onClick={onClose}><X size={20} /></button>
            </div>

            <form className="drawer-form" onSubmit={handleSubmit}>
              <div className="form-sections">
                <div className="form-section">
                  <label className="section-label">General Information</label>
                  <div className="input-field-v3">
                    <label>{type === 'book' ? 'Book Title' : 'Assignment Topic'}</label>
                    <input
                      type="text" placeholder={type === 'book' ? "e.g. Pure Mathematics Vol 1" : "e.g. Chapter 4: Statistics"}
                      value={formData.title} required
                      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    />
                  </div>
                  <div className="input-field-v3">
                    <label>{type === 'book' ? 'Author / Publisher' : 'Submission Deadline'}</label>
                    <input
                      type={type === 'book' ? "text" : "date"}
                      placeholder={type === 'book' ? "e.g. Cambridge University Press" : ""}
                      value={type === 'book' ? formData.author : formData.due} required
                      onChange={(e) => setFormData({ ...formData, [type === 'book' ? 'author' : 'due']: e.target.value })}
                    />
                  </div>
                </div>

                <div className="form-section">
                  <label className="section-label">Additional Context</label>
                  <div className="input-field-v3">
                    <label>Description & Instructions</label>
                    <textarea
                      placeholder="Add specific details or reading guidelines..."
                      value={formData.desc}
                      onChange={(e) => setFormData({ ...formData, desc: e.target.value })}
                    />
                  </div>
                </div>
              </div>

              <div className="drawer-actions">
                <button type="button" className="action-btn cancel" onClick={onClose}>Discard</button>
                <button type="submit" className="action-btn submit">
                  <span>{type === 'book' ? 'Add to Library' : 'Publish to Students'}</span>
                  <ArrowRight size={18} />
                </button>
              </div>
            </form>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

/* =============================
   SUB-COMPONENTS
============================= */

// 1. BOOKS MANAGEMENT
const BooksView = ({ books, onAdd, onDelete, onOpenCreate }) => {
  return (
    <motion.div className="books-view" initial="initial" animate="animate">
      <div className="section-header-v3">
        <div className="title-group">
          <h4>Class Resources</h4>
          <span className="count-badge">{books.length} Items</span>
        </div>
        <button className="pro-add-btn books" onClick={onOpenCreate}>
          <span>Add Resource</span>
          <Plus size={18} />
        </button>
      </div>

      <div className="books-grid">
        {books.map((book) => (
          <motion.div key={book.id} className="book-item-v3" variants={fadeInUp}>
            <div className="book-visual">
              <Book size={28} />
            </div>
            <div className="book-meta">
              <h5>{book.title}</h5>
              <p>{book.author || "Digital Resource"}</p>
            </div>
            <div className="book-actions">
              <button className="book-delete" onClick={() => onDelete(book.id)}><Trash2 size={16} /></button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// 2. ASSIGNMENTS MANAGEMENT
const AssignmentsView = ({ assignments, onAdd, onOpenCreate }) => {
  return (
    <motion.div className="assignments-view" initial="initial" animate="animate">
      <div className="section-header-v3">
        <div className="title-group">
          <h4>Advanced Assignments</h4>
          <span className="count-badge">{assignments.length} Active</span>
        </div>
        <button className="pro-add-btn assignments" onClick={onOpenCreate}>
          <span>Create Task</span>
          <Plus size={18} />
        </button>
      </div>

      <div className="assignments-list-v3">
        {assignments.map((asgn) => (
          <motion.div key={asgn.id} className="assignment-item-v3-card" variants={fadeInUp}>
            <div className="card-top">
              <div className="asgn-primary-info">
                <div className="type-icon"><FileText size={22} /></div>
                <div>
                  <h6>{asgn.title}</h6>
                  <div className="meta-stats">
                    <span className="stat-pill"><Calendar size={13} /> {asgn.due}</span>
                    <span className="stat-pill"><Users size={13} /> {asgn.submissions} Submissions Received</span>
                  </div>
                </div>
              </div>
              <button className="pro-details-btn">View Full Details</button>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
};

// 3. CHAT INTERFACE


/* =============================
   MAIN COMPONENT
============================= */
export default function TeacherClasses() {
  const [activeTab, setActiveTab] = useState('books');
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [creationType, setCreationType] = useState('book'); // 'book' or 'assignment'

  const [classData, setClassData] = useState({
    books: [
      { id: 1, title: "Pure Mathematics Vol 1", author: "Dr. Smith" },
      { id: 2, title: "NCERT Biology Grade 10", author: "NCERT" },
    ],
    assignments: [
      { id: 101, title: "Statistics Quiz II", due: "2026-01-29", submissions: 30 },
    ],
    messages: [
      { id: 1, sender: "Teacher", text: "Welcome students to your digital portal.", time: "08:00 AM" },
    ]
  });

  const handlers = {
    add: (data) => {
      if (creationType === 'book') {
        setClassData(prev => ({ ...prev, books: [...prev.books, { ...data, id: Date.now() }] }));
      } else {
        setClassData(prev => ({ ...prev, assignments: [...prev.assignments, { ...data, id: Date.now(), submissions: 0 }] }));
      }
    },
    deleteBook: (id) => setClassData(prev => ({ ...prev, books: prev.books.filter(b => b.id !== id) }))
  };

  const openCreate = (type) => {
    setCreationType(type);
    setIsDrawerOpen(true);
  };

  return (
    <div className={`teacher-classes-page theme-${activeTab}`}>
      <Header />

      <main className="classes-main-content">
        <section className="snap-section">
          <motion.div className="teacher-classes-header" {...fadeInUp}>
            <h1>Teacher Dashboard</h1>
            <p>Professional resource management and communication hub</p>
          </motion.div>

          <div className="main-management-card">
            <div className="detail-tabs">
              {[
                { id: 'books', icon: <Book />, label: 'Library' },
                { id: 'assignments', icon: <FileText />, label: 'Tasks' }
              ].map(tab => (
                <button
                  key={tab.id}
                  className={`tab-btn tab-${tab.id} ${activeTab === tab.id ? 'active' : ''}`}
                  onClick={() => setActiveTab(tab.id)}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>

            <div className="tab-content">
              <AnimatePresence mode="wait">
                {activeTab === 'books' && (
                  <BooksView
                    key="books"
                    books={classData.books}
                    onDelete={handlers.deleteBook}
                    onOpenCreate={() => openCreate('book')}
                  />
                )}
                {activeTab === 'assignments' && (
                  <AssignmentsView
                    key="assignments"
                    assignments={classData.assignments}
                    onOpenCreate={() => openCreate('assignment')}
                  />
                )}

              </AnimatePresence>
            </div>
          </div>
        </section>

        {/* ANALYTICS SNAP */}
        <section className="snap-section">
          <div className="section-header-v3">
            <h4>Executive Insights</h4>
          </div>
          <div className="insights-container">
            <div className="insight-card glass-card">
              <div className="insight-icon"><Users size={24} /></div>
              <div>
                <h5>Class Engagement</h5>
                <p>94% Active Participation</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* CREATION DRAWER */}
      <CreationDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
        type={creationType}
        onAdd={handlers.add}
      />

      <Floating />
      <Footer />
    </div>
  );
}
