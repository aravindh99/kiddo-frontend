import React, { useState } from "react";
import "./Report.css";
import Header from "../header/Header.jsx";
import Footer from "../footer/ParentsFooter.jsx";
import { FileText, TrendingUp, Award, ChevronRight, X } from "lucide-react";

export default function ReportCard() {
  const students = [
    { id: 1, name: "Abhimanyu", grade: "Grade 4-A", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abhimanyu" },
    { id: 2, name: "Siddharth", grade: "Grade 2-B", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siddharth" },
  ];

  const [selectedStudent, setSelectedStudent] = useState(students[0]);
  const [activeCategory, setActiveCategory] = useState("major");
  const [selectedExam, setSelectedExam] = useState(null);

  const studentDetails = {
    1: { name: "Abhimanyu", class: "4A", rollNo: "12", academicYear: "2025 - 2026" },
    2: { name: "Siddharth", class: "2B", rollNo: "24", academicYear: "2025 - 2026" }
  };

  const activeStudent = studentDetails[selectedStudent.id];

  // MAJOR EXAMS DATA
  const majorExams = [
    {
      id: 1,
      name: "Half Yearly Examination",
      date: "December 2025",
      totalMarks: 414,
      percentage: 82.8,
      result: "PASS",
      subjects: [
        { name: "English", marks: 78, grade: "B+" },
        { name: "Mathematics", marks: 92, grade: "A+" },
        { name: "Science", marks: 88, grade: "A" },
        { name: "Social Science", marks: 81, grade: "A" },
        { name: "Tamil", marks: 75, grade: "B+" },
      ]
    },
    {
      id: 2,
      name: "Quarterly Examination",
      date: "September 2025",
      totalMarks: 395,
      percentage: 79.0,
      result: "PASS",
      subjects: [
        { name: "English", marks: 75, grade: "B+" },
        { name: "Mathematics", marks: 88, grade: "A" },
        { name: "Science", marks: 82, grade: "A" },
        { name: "Social Science", marks: 78, grade: "B+" },
        { name: "Tamil", marks: 72, grade: "B" },
      ]
    },
    {
      id: 3,
      name: "Final Examination",
      date: "March 2026",
      totalMarks: null,
      percentage: null,
      result: "Pending",
      subjects: []
    }
  ];

  // CLASS TESTS DATA
  const classTests = [
    {
      id: 1,
      subject: "Mathematics",
      date: "15 Jan 2026",
      marks: 45,
      total: 50,
      percentage: 90,
      grade: "A+"
    },
    {
      id: 2,
      subject: "Science",
      date: "12 Jan 2026",
      marks: 42,
      total: 50,
      percentage: 84,
      grade: "A"
    },
    {
      id: 3,
      subject: "English",
      date: "10 Jan 2026",
      marks: 38,
      total: 50,
      percentage: 76,
      grade: "B+"
    },
    {
      id: 4,
      subject: "Social Science",
      date: "8 Jan 2026",
      marks: 40,
      total: 50,
      percentage: 80,
      grade: "A"
    }
  ];

  const openExamDetails = (exam) => {
    if (exam.subjects.length > 0) {
      setSelectedExam(exam);
    }
  };

  const closeModal = () => {
    setSelectedExam(null);
  };

  return (
    <div className="report-page">
      <Header
        students={students}
        selectedStudent={selectedStudent}
        onSwitch={setSelectedStudent}
      />

      <main className="report-content">
        {/* PREMIUM PAGE HEADER */}
        <section className="report-header-premium">
          <div className="h-top">
            <h1>Academic Reports</h1>
            <div className="h-icon-box">
              <FileText size={20} color="#00e5ff" />
            </div>
          </div>
          <p>Comprehensive performance tracking</p>
        </section>

        {/* STUDENT INFO CARD */}
        <section className="student-info-premium">
          <div className="info-row">
            <span className="info-label">Student</span>
            <span className="info-value">{activeStudent.name}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Class</span>
            <span className="info-value">{activeStudent.class}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Roll No</span>
            <span className="info-value">{activeStudent.rollNo}</span>
          </div>
          <div className="info-row">
            <span className="info-label">Academic Year</span>
            <span className="info-value">{activeStudent.academicYear}</span>
          </div>
        </section>

        {/* CATEGORY SWITCHER */}
        <section className="category-switcher">
          <button
            className={`cat-btn ${activeCategory === "major" ? "active" : ""}`}
            onClick={() => setActiveCategory("major")}
          >
            <Award size={18} />
            <span>Major Exams</span>
          </button>
          <button
            className={`cat-btn ${activeCategory === "tests" ? "active" : ""}`}
            onClick={() => setActiveCategory("tests")}
          >
            <TrendingUp size={18} />
            <span>Class Tests</span>
          </button>
        </section>

        {/* MAJOR EXAMS VIEW - SUMMARY ONLY */}
        {activeCategory === "major" && (
          <div className="exams-list">
            {majorExams.map((exam) => (
              <div
                key={exam.id}
                className={`exam-card-summary ${exam.subjects.length > 0 ? 'clickable' : ''}`}
                onClick={() => openExamDetails(exam)}
              >
                <div className="exam-summary-left">
                  <div className="exam-icon-circle">
                    <Award size={22} />
                  </div>
                  <div className="exam-info">
                    <h3>{exam.name}</h3>
                    <span className="exam-date">{exam.date}</span>
                  </div>
                </div>

                <div className="exam-summary-right">
                  {exam.percentage !== null ? (
                    <div className="summary-stats">
                      <span className="perc-large">{exam.percentage}%</span>
                      <span className={`result-badge ${exam.result.toLowerCase()}`}>
                        {exam.result}
                      </span>
                    </div>
                  ) : (
                    <span className="pending-badge">Upcoming</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* CLASS TESTS VIEW */}
        {activeCategory === "tests" && (
          <div className="tests-list">
            {classTests.map((test) => (
              <div key={test.id} className="test-card-premium">
                <div className="test-left">
                  <div className="test-icon-box">
                    <FileText size={20} />
                  </div>
                  <div className="test-info">
                    <h4>{test.subject}</h4>
                    <span className="test-date">{test.date}</span>
                  </div>
                </div>
                <div className="test-right">
                  <div className="test-score">
                    <span className="score-value">{test.marks}/{test.total}</span>
                    <span className={`grade-mini grade-${test.grade.replace("+", "plus")}`}>
                      {test.grade}
                    </span>
                  </div>
                  <div className="test-percentage">{test.percentage}%</div>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="bottom-space" />
      </main>

      {/* EXAM DETAILS MODAL */}
      {selectedExam && (
        <div className="exam-modal-overlay" onClick={closeModal}>
          <div className="exam-modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="modal-handle" />

            <div className="modal-header">
              <div className="modal-title-section">
                <h2>{selectedExam.name}</h2>
                <span className="modal-date">{selectedExam.date}</span>
              </div>
              <button onClick={closeModal} className="modal-close-btn">
                <X size={24} />
              </button>
            </div>

            <div className="modal-summary-row">
              <div className="modal-stat">
                <span className="stat-label">Total Marks</span>
                <span className="stat-value">{selectedExam.totalMarks}/500</span>
              </div>
              <div className="modal-stat">
                <span className="stat-label">Percentage</span>
                <span className="stat-value highlight">{selectedExam.percentage}%</span>
              </div>
              <div className="modal-stat">
                <span className="stat-label">Result</span>
                <span className={`stat-badge ${selectedExam.result.toLowerCase()}`}>
                  {selectedExam.result}
                </span>
              </div>
            </div>

            <div className="modal-subjects-section">
              <h3 className="section-heading">Subject-wise Breakdown</h3>
              <div className="subjects-table-modal">
                <div className="table-header">
                  <span>Subject</span>
                  <span>Marks</span>
                  <span>Grade</span>
                </div>
                {selectedExam.subjects.map((sub, idx) => (
                  <div key={idx} className="table-row">
                    <span className="subject-name">{sub.name}</span>
                    <span className="marks-value">{sub.marks}/100</span>
                    <span className={`grade-badge grade-${sub.grade.replace("+", "plus")}`}>
                      {sub.grade}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
}
