import { useEffect, useState } from "react";
import { ArrowLeft, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Notifications.css";
import Header from "../header/Header.jsx";
import Footer from "../footer/ParentsFooter.jsx";

export default function Notifications() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  const students = [
    { id: 1, name: "Abhimanyu", grade: "Grade 4-A", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abhimanyu" },
    { id: 2, name: "Siddharth", grade: "Grade 2-B", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siddharth" },
  ];

  const [selectedStudent, setSelectedStudent] = useState(students[0]);

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
  }, []);

  return (
    <div className={`notify-page ${visible ? "show" : ""}`}>
      <Header
        students={students}
        selectedStudent={selectedStudent}
        onSwitch={setSelectedStudent}
      />

      {/* ================= TOP BAR ================= */}
      <div className="notify-topbar" style={{ marginTop: '70px' }}>
        <button
          className="back-btn"
          aria-label="Back to Dashboard"
          onClick={() => navigate("/parents/diary")}
        >
          <ArrowLeft size={20} />
        </button>

        <div className="notify-title">
          <h1>Notifications</h1>
          <p>Updates for <strong>{selectedStudent.name}</strong></p>
        </div>
      </div>

      <main className="notify-scroll" style={{ paddingBottom: '100px' }}>
        {/* ================= TODAY ================= */}
        <section className="notify-section">
          <h3>Today</h3>

          <div className="notify-item unread">
            <div className="avatar purple">CS</div>
            <div className="notify-content">
              <p>
                <strong>Academic report</strong> for {selectedStudent.name} has been generated.
              </p>
              <span>10 minutes ago</span>
            </div>
            <span className="unread-dot" />
          </div>
        </section>

        {/* ================= YESTERDAY ================= */}
        <section className="notify-section">
          <h3>Yesterday</h3>

          <div className="notify-item">
            <div className="avatar green">ST</div>
            <div className="notify-content">
              <p>
                <strong>Fee reminder</strong> for the month of February.
              </p>
              <span>Yesterday</span>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
}
