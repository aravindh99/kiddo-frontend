import { useEffect, useState } from "react";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import "./Notifications.css";

export default function Notifications() {
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    setTimeout(() => setVisible(true), 50);
  }, []);

  return (
    <div className={`notify-page ${visible ? "show" : ""}`}>

      {/* ================= TOP BAR ================= */}
      <div className="notify-topbar">
        <button
          className="back-btn"
          aria-label="Back to Dashboard"
          onClick={() => navigate("/home")}
        >
          <ArrowLeft size={20} />
        </button>

        <div className="notify-title">
          <h1>Notifications</h1>
          <p>All school updates and alerts</p>
        </div>
      </div>

      {/* ================= TODAY ================= */}
      <section className="notify-section">
        <h3>Today</h3>

        <div className="notify-item unread">
          <div className="avatar purple">CS</div>
          <div className="notify-content">
            <p>
              <strong>Class 6A</strong> report card has been generated.
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
              <strong>Student Rahul</strong> was added to Class 8A.
            </p>
            <span>Yesterday</span>
          </div>
        </div>
      </section>
    </div>
  );
}
