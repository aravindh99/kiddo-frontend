import { useEffect, useRef, useState } from "react";
import "./Profile.css";
import {
  User,
  Globe,
  HelpCircle,
  Info,
  LogOut,
  ChevronRight,
  Award,
  Camera
} from "lucide-react";
import { useNavigate } from "react-router-dom";

import Header from "../header/Header.jsx";
import Footer from "../footer/Footer.jsx";

export default function Profile() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);
  const [profileImage, setProfileImage] = useState(null);

  /* LOGOUT HANDLER */
  const handleLogout = () => {
    localStorage.clear();
    sessionStorage.clear();
    navigate("/", { replace: true });
  };

  /* PHOTO UPLOAD HANDLER */
  const handlePhotoClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfileImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="profile">
      <Header />

      {/* WORLD-CLASS SCROLL AREA */}
      <main className="profile-scroll">

        {/* PREMIUM PROFILE CARD (ARAVIND TEMPLATE STYLE) */}
        <section className="profile-card-premium">
          <div className="p-card-top">
            <div className="p-avatar-insta" onClick={handlePhotoClick}>
              {profileImage ? (
                <img src={profileImage} alt="Profile" className="p-avatar-img" />
              ) : (
                "👨‍🎓"
              )}
              <div className="avatar-action-badge">
                <Camera size={14} />
              </div>
            </div>

            {/* HIDDEN FILE INPUT */}
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              style={{ display: "none" }}
              accept="image/*"
            />

            <div className="p-info">
              <h2>Abirami</h2>
              <p>Class 7A • Section Mathematics</p>
              <div className="p-meta">Roll No: 15 · ID: KS2024015</div>
            </div>
          </div>

          {/* VIBRANT STATS ROW */}
          <div className="p-stats-row">
            <div className="p-stat-item">
              <span className="p-stat-val val-att">92%</span>
              <span className="p-stat-label">Attendance</span>
            </div>
            <div className="p-stat-item">
              <span className="p-stat-val val-score">8.5</span>
              <span className="p-stat-label">Avg Score</span>
            </div>
            <div className="p-stat-item">
              <span className="p-stat-val val-tests">12</span>
              <span className="p-stat-label">Tests</span>
            </div>
          </div>
        </section>

        {/* MODERN SETTINGS & SUPPORT */}
        <section className="settings-section">
          <h3 className="section-title">Settings & Support</h3>

          <div className="settings-row">
            <div className="s-left">
              <div className="s-icon-box purple">
                <User size={20} />
              </div>
              <span className="s-label">My Details</span>
            </div>
            <ChevronRight className="s-arrow" size={20} />
          </div>

          <div className="settings-row">
            <div className="s-left">
              <div className="s-icon-box blue">
                <Globe size={20} />
              </div>
              <span className="s-label">App Language</span>
            </div>
            <ChevronRight className="s-arrow" size={20} />
          </div>

          <div className="settings-row">
            <div className="s-left">
              <div className="s-icon-box rose">
                <HelpCircle size={20} />
              </div>
              <span className="s-label">Help & Support</span>
            </div>
            <ChevronRight className="s-arrow" size={20} />
          </div>

          <div className="settings-row">
            <div className="s-left">
              <div className="s-icon-box green">
                <Info size={20} />
              </div>
              <span className="s-label">About Kiddo Shadow</span>
            </div>
            <ChevronRight className="s-arrow" size={20} />
          </div>

          {/* MAGENTA LOGOUT PILL */}
          <button className="logout-btn-premium" onClick={handleLogout}>
            <LogOut size={18} />
            Logout
          </button>
        </section>

        {/* WORLD-CLASS FOOTER */}
        <div className="profile-footer-branding">
          <div className="v-text">Kiddo Shadow v1.0.0</div>
          <div className="made-with">
            © 2026 • Made with ❤️ for students
          </div>
        </div>


      </main>

      <Footer />
    </div>
  );
}
