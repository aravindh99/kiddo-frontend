import { useState } from "react";
import "./Profile.css";
import {
  User,
  Globe,
  HelpCircle,
  Info,
  LogOut,
  ChevronRight,
  ChevronDown,
  Check,
  Plus
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Header from "../header/Header.jsx";
import Footer from "../footer/ParentsFooter.jsx";

export default function Profile() {
  const navigate = useNavigate();

  const students = [
    { id: 1, name: "Abhimanyu", grade: "Grade 4-A", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Abhimanyu" },
    { id: 2, name: "Siddharth", grade: "Grade 2-B", image: "https://api.dicebear.com/7.x/avataaars/svg?seed=Siddharth" },
  ];

  const [selectedStudent, setSelectedStudent] = useState(students[0]);

  // CHILDREN DETAILS MAPPING (to stay consistent with card content)
  const childrenDetails = {
    1: {
      id: "KS2026001", name: "Abhimanyu", roll: "12", class: "4A", section: "Primary", avatar: "👨‍🎓",
      attendance: "95%", avgScore: "9.1", tests: "15", bgGradient: "linear-gradient(135deg, #2563eb, #3b82f6)",
      dob: "12 May 2016", bloodGroup: "O+", busRoute: "Route 12 (Yellow)", teacher: "Ms. Sharma",
      guardian: "Sanjay Kumar", phone: "+91 98765 43210", email: "sanjay@example.com", address: "HSR Layout, Bangalore"
    },
    2: {
      id: "KS2026002", name: "Siddharth", roll: "24", class: "2B", section: "Primary", avatar: "🧒",
      attendance: "89%", avgScore: "8.8", tests: "12", bgGradient: "linear-gradient(135deg, #059669, #10b981)",
      dob: "05 Aug 2018", bloodGroup: "A+", busRoute: "Route 4 (Green)", teacher: "Mr. Gupta",
      guardian: "Sanjay Kumar", phone: "+91 98765 43210", email: "sanjay@example.com", address: "HSR Layout, Bangalore"
    }
  };

  const activeChild = childrenDetails[selectedStudent.id];

  /* LOGOUT HANDLER */
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/", { replace: true });
  };

  return (
    <div className="profile">
      <Header
        students={students}
        selectedStudent={selectedStudent}
        onSwitch={setSelectedStudent}
      />

      {/* WORLD-CLASS SCROLL AREA */}
      <main className="profile-scroll">

        {/* PREMIUM PAGE TITLE */}
        <div className="inst-profile-header">
          <h1 className="inst-name">Student Account</h1>
        </div>

        {/* PREMIUM PROFILE CARD (STUDENT SYNC) */}
        <section className="profile-card-premium">
          <div className="p-card-top">
            <div className="p-avatar-insta" style={{ background: activeChild.bgGradient }}>
              {activeChild.avatar}
              <div className="avatar-active-badge" />
            </div>

            <div className="p-info">
              <h2>{activeChild.name}</h2>
              <p>Class {activeChild.class} • {activeChild.section}</p>
              <div className="p-meta">Roll No: {activeChild.roll} · ID: {activeChild.id}</div>
            </div>
          </div>

          {/* VIBRANT STATS ROW */}
          <div className="p-stats-row">
            <div className="p-stat-item">
              <span className="p-stat-val val-att">{activeChild.attendance}</span>
              <span className="p-stat-label">Attendance</span>
            </div>
            <div className="p-stat-item">
              <span className="p-stat-val val-score">{activeChild.avgScore}</span>
              <span className="p-stat-label">Avg Score</span>
            </div>
            <div className="p-stat-item">
              <span className="p-stat-val val-tests">{activeChild.tests}</span>
              <span className="p-stat-label">Tests</span>
            </div>
          </div>
        </section>

        {/* PROFESSIONAL CORE DETAILS */}
        <div className="profile-details-grid">
          <section className="details-card">
            <h3 className="card-title">STUDENT BIO</h3>
            <div className="detail-item">
              <span className="label">DOB</span>
              <span className="value">{activeChild.dob}</span>
            </div>
            <div className="detail-item">
              <span className="label">Blood Group</span>
              <span className="value">{activeChild.bloodGroup}</span>
            </div>
            <div className="detail-item">
              <span className="label">Bus Route</span>
              <span className="value">{activeChild.busRoute}</span>
            </div>
            <div className="detail-item">
              <span className="label">Class Teacher</span>
              <span className="value">{activeChild.teacher}</span>
            </div>
          </section>

          <section className="details-card">
            <h3 className="card-title">GUARDIAN PROFILE</h3>
            <div className="detail-item">
              <span className="label">Primary Guardian</span>
              <span className="value">{activeChild.guardian}</span>
            </div>
            <div className="detail-item">
              <span className="label">Mobile</span>
              <span className="value">{activeChild.phone}</span>
            </div>
            <div className="detail-item">
              <span className="label">Email</span>
              <span className="value">{activeChild.email}</span>
            </div>
            <div className="detail-item">
              <span className="label">Address</span>
              <span className="value address">{activeChild.address}</span>
            </div>
          </section>
        </div>

        {/* MODERN SETTINGS & SUPPORT */}
        <section className="settings-section">
          <h3 className="section-title">Account & Support</h3>

          <div className="settings-row-grid">
            <div className="settings-pill">
              <div className="s-icon-box blue">
                <Globe size={16} />
              </div>
              <span className="s-label">Language</span>
            </div>
            <div className="settings-pill">
              <div className="s-icon-box rose">
                <HelpCircle size={16} />
              </div>
              <span className="s-label">Support</span>
            </div>
            <div className="settings-pill">
              <div className="s-icon-box green">
                <Info size={16} />
              </div>
              <span className="s-label">About App</span>
            </div>
          </div>

          <button className="logout-btn-premium" onClick={handleLogout}>
            <LogOut size={16} />
            Sign Out
          </button>
        </section>

        {/* WORLD-CLASS FOOTER */}
        <div className="profile-footer-branding">
          <div className="v-text">Kiddo Shadow v1.0.0</div>
          <div className="made-with">
            © 2026 • Made with ❤️ for Parents
          </div>
        </div>

        <div className="bottom-space" />
      </main>

      <Footer />
    </div>
  );
}
