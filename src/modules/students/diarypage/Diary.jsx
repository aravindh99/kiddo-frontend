import { useState, useEffect } from "react";
import "./Diary.css";
import { Calendar, Clock, X, BookText, Loader2 } from "lucide-react";

import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";
import { fetchHomework, submitHomework } from "./Diary.js";

export default function Diary() {
  const [homeworkList, setHomeworkList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const loadHomeworkData = async () => {
    try {
      setLoading(true);
      const data = await fetchHomework();
      setHomeworkList(data);
      setError(null);
    } catch (err) {
      setError("Failed to load diary tasks. Please try again later.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadHomeworkData();
  }, []);

  const handleComplete = async (homeworkId) => {
    try {
      await submitHomework(homeworkId, { is_completed: true });
      // Refresh data to show updated state
      await loadHomeworkData();
    } catch (err) {
      alert("Failed to update task. Please try again.");
    }
  };

  // Grouping homework by date
  const groupedHomework = homeworkList.reduce((acc, hw) => {
    const date = hw.homework_date;
    if (!acc[date]) acc[date] = [];
    acc[date].push(hw);
    return acc;
  }, {});

  const formatDateLabel = (dateStr) => {
    const today = new Date().toISOString().split('T')[0];
    const tomorrow = new Date(Date.now() + 86400000).toISOString().split('T')[0];

    if (dateStr === today) return "Today";
    if (dateStr === tomorrow) return "Tomorrow";

    return new Date(dateStr).toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="diary">
      <Header />

      <main className="diary-scroll">
        <section className="diary-header-premium">
          <div className="diary-brand-section">
            <div className="diary-icon-orb">
              <BookText size={22} color="#00e5ff" />
            </div>
            <div className="diary-meta-text">
              <h1>Student Diary</h1>
              <p>Your daily tasks & homework</p>
            </div>
          </div>
        </section>

        {loading ? (
          <div className="diary-loader">
            <Loader2 className="animate-spin" size={32} />
            <p>Scanning assignments...</p>
          </div>
        ) : error ? (
          <div className="diary-error">
            <p>{error}</p>
          </div>
        ) : Object.keys(groupedHomework).length === 0 ? (
          <div className="diary-empty">
            <p>No tasks found in your diary. Enjoy your day!</p>
          </div>
        ) : (
          Object.keys(groupedHomework).sort((a, b) => b.localeCompare(a)).map((date) => (
            <section className="timeline-section" key={date}>
              <div className="timeline-header">
                <div className="timeline-info">
                  <h2>{formatDateLabel(date)}</h2>
                  <p>{new Date(date).toLocaleDateString() === formatDateLabel(date) ? "" : date}</p>
                </div>
                <span className="task-count">{groupedHomework[date].length} tasks</span>
              </div>

              <div className="tasks-container">
                {groupedHomework[date].map((hw) => {
                  const submission = hw.homework_submissions?.[0];
                  return (
                    <Task
                      key={hw.id}
                      id={hw.id}
                      subject={hw.subject?.name || "General"}
                      teacher={hw.creator?.full_name || "School Office"}
                      task={hw.description}
                      time={hw.homework_date}
                      type={hw.subject?.name?.toLowerCase() || "other"}
                      isCompleted={submission?.is_completed}
                      onComplete={() => handleComplete(hw.id)}
                    />
                  );
                })}
              </div>
            </section>
          ))
        )}

        <div className="bottom-space" style={{ height: '140px' }} />
      </main>

      <Footer />
    </div>
  );
}

function Task({ id, subject, teacher, task, time, type, isCompleted, onComplete }) {
  // Map subjects to styles
  const typeClass = ["maths", "science", "english", "social", "hindi"].includes(type) ? type : "other";

  return (
    <div className={`diary-task-card ${typeClass} ${isCompleted ? 'completed' : ''}`}>
      <div className="task-header">
        <div className="subject-meta">
          <span className="subject-name">{subject}</span>
          <span className="teacher-name">{teacher}</span>
        </div>
        {isCompleted ? (
          <span className="status-badge done">Done</span>
        ) : (
          <button className="complete-btn" onClick={onComplete}>Complete</button>
        )}
      </div>
      <p className="task-desc">{task}</p>
      <div className="task-footer">
        <Clock size={14} />
        <span>{time}</span>
      </div>
    </div>
  );
}
