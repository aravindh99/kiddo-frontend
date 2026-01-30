import { useNavigate, useLocation } from "react-router-dom";
import {
  Home,
  BookOpen,
  MessageSquare,
  User,
  Bot
} from "lucide-react";
import "./Footer.css";

export default function StudentFooter() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const active = (path) => pathname === path;

  return (
    <footer className="student-footer">
      <button className={active("/students/home") ? "active" : ""} onClick={() => navigate("/students/home")}>
        <Home size={22} />
        <span>Home</span>
      </button>

      <button className={active("/students/diary") ? "active" : ""} onClick={() => navigate("/students/diary")}>
        <BookOpen size={22} />
        <span>Diary</span>
      </button>

      <button className={`center-btn ${active("/students/robot") ? "active" : ""}`} onClick={() => navigate("/students/robot")}>
        <div className="center-icon-bg">
          <Bot size={28} color="white" />
        </div>
      </button>

      <button className={active("/students/class") ? "active" : ""} onClick={() => navigate("/students/class")}>
        <MessageSquare size={22} />
        <span>GroupChat</span>
      </button>

      <button className={active("/students/profile") ? "active" : ""} onClick={() => navigate("/students/profile")}>
        <User size={22} />
        <span>Profile</span>
      </button>
    </footer>
  );
}
