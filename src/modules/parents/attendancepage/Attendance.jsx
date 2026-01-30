import React, { useState } from "react";
import "./Attendance.css";
import Header from "../header/Header.jsx";
import Footer from "../footer/ParentsFooter.jsx";
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon, X } from "lucide-react";

export default function Attendance() {
  const students = [
    { id: 1, name: "Abhimanyu", grade: "Grade 4-A", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abhimanyu" },
    { id: 2, name: "Siddharth", grade: "Grade 2-B", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siddharth" },
  ];

  const [selectedStudent, setSelectedStudent] = useState(students[0]);
  const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0, 1)); // Jan 2026
  const [showModal, setShowModal] = useState(false);

  // Mock absent dates for demonstration
  const absentDates = [3, 12, 15, 28];

  const summary = {
    total: 22,
    present: 19,
    absent: 4,
    percentage: "82%",
  };

  const months = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const daysInMonth = (month, year) => new Date(year, month + 1, 0).getDate();
  const firstDayOfMonth = (month, year) => new Date(year, month, 1).getDay();

  const renderCalendar = () => {
    const month = currentMonth.getMonth();
    const year = currentMonth.getFullYear();
    const totalDays = daysInMonth(month, year);
    const startDay = firstDayOfMonth(month, year);
    const blanks = Array(startDay).fill(null);
    const days = Array.from({ length: totalDays }, (_, i) => i + 1);

    return (
      <div className="calendar-grid">
        {["S", "M", "T", "W", "T", "F", "S"].map((d, i) => (
          <div key={i} className="calendar-weekday">{d}</div>
        ))}
        {blanks.map((_, i) => <div key={`b-${i}`} className="calendar-day empty"></div>)}
        {days.map(day => {
          const isAbsent = absentDates.includes(day);
          return (
            <div key={day} className={`calendar-day ${isAbsent ? 'absent' : 'present'}`}>
              <span className="day-number">{day}</span>
              {isAbsent && <div className="absent-marker" />}
            </div>
          );
        })}
      </div>
    );
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const openPopup = () => {
    setShowModal(true);
  };

  const closePopup = () => {
    setShowModal(false);
  };

  return (
    <div className="attendance-page">
      <Header
        students={students}
        selectedStudent={selectedStudent}
        onSwitch={setSelectedStudent}
      />

      <main className="attendance-content">
        {/* PREMIUM PAGE HEADER */}
        <section className="attendance-header">
          <div className="h-top">
            <h1>Attendance</h1>
            <div className="h-icon-box">
              <CalendarIcon size={20} color="#00e5ff" />
            </div>
          </div>
          <p>Detailed month-wise presence tracking</p>
        </section>

        {/* SUMMARY TILES */}
        <section className="attendance-summary">
          <div className="summary-card present">
            <h3>{summary.present}</h3>
            <span>Present</span>
          </div>

          <div className="summary-card absent" onClick={openPopup}>
            <h3>{summary.absent}</h3>
            <span>Absent</span>
          </div>

          <div className="summary-card total">
            <h3>{summary.percentage}</h3>
            <span>Overall</span>
          </div>
        </section>

        {/* CALENDAR POPUP MODAL */}
        {showModal && (
          <div className="attendance-modal-overlay">
            <div className="attendance-modal-content">
              <div className="modal-header">
                <h2>Attendance History</h2>
                <button onClick={closePopup} className="close-btn">
                  <X size={24} />
                </button>
              </div>

              <section className="calendar-card-premium modal-calendar">
                <div className="calendar-nav">
                  <button onClick={handlePrevMonth} className="nav-btn">
                    <ChevronLeft size={20} />
                  </button>
                  <h3>{months[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
                  <button onClick={handleNextMonth} className="nav-btn">
                    <ChevronRight size={20} />
                  </button>
                </div>

                <div className="calendar-body">
                  {renderCalendar()}
                </div>

                <div className="calendar-legend">
                  <div className="legend-item">
                    <div className="dot present" />
                    <span>Present</span>
                  </div>
                  <div className="legend-item">
                    <div className="dot absent" />
                    <span>Absent / Leave</span>
                  </div>
                </div>
              </section>
            </div>
          </div>
        )}

        <div className="bottom-space" />
      </main>

      <Footer />
    </div>
  );
}
