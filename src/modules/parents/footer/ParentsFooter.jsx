import { useNavigate, useLocation } from "react-router-dom";
import {
  BookOpen,
  Calendar,
  BarChart3,
  CreditCard,
  User
} from "lucide-react";
import "./ParentsFooter.css";

export default function ParentFooter() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const active = (path) => pathname === path;

  return (
    <footer className="parent-footer">
      {/* DIARY */}
      <button
        className={active("/parents/diary") ? "active" : ""}
        onClick={() => navigate("/parents/diary")}
      >
        <BookOpen size={22} />
        <span>Diary</span>
      </button>

      {/* ATTENDANCE */}
      <button
        className={active("/parents/attendance") ? "active" : ""}
        onClick={() => navigate("/parents/attendance")}
      >
        <Calendar size={22} />
        <span>Attendance</span>
      </button>

      {/* REPORTS */}
      <button
        className={active("/parents/reports") ? "active" : ""}
        onClick={() => navigate("/parents/reports")}
      >
        <BarChart3 size={22} />
        <span>Reports</span>
      </button>

      {/* PAYMENTS */}
      <button
        className={active("/parents/payments") ? "active" : ""}
        onClick={() => navigate("/parents/payments")}
      >
        <CreditCard size={22} />
        <span>Fees</span>
      </button>

      {/* PROFILE */}
      <button
        className={active("/parents/profile") ? "active" : ""}
        onClick={() => navigate("/parents/profile")}
      >
        <User size={22} />
        <span>Profile</span>
      </button>
    </footer>
  );
}
