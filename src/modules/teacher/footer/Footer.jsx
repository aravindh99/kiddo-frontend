import { NavLink } from "react-router-dom";
import {
  Home,
  BookOpen,
  ClipboardList,
  CalendarCheck,
  BarChart3,
} from "lucide-react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="teacher-footer">
      <nav className="teacher-footer__nav">
        <NavLink
          to="/teachers/home"
          className={({ isActive }) =>
            isActive ? "footer-link active" : "footer-link"
          }
        >
          <Home />
          <span>Home</span>
        </NavLink>

        <NavLink
          to="/teachers/class"
          className={({ isActive }) =>
            isActive ? "footer-link active" : "footer-link"
          }
        >
          <BookOpen />
          <span>Classes</span>
        </NavLink>

        <NavLink
          to="/teachers/assignments"
          className={({ isActive }) =>
            isActive ? "footer-link active center" : "footer-link center"
          }
        >
          <ClipboardList />
          <span>Tasks</span>
        </NavLink>

        <NavLink
          to="/teachers/attendance"
          className={({ isActive }) =>
            isActive ? "footer-link active" : "footer-link"
          }
        >
          <CalendarCheck />
          <span>Attendance</span>
        </NavLink>

        <NavLink
          to="/teachers/reports"
          className={({ isActive }) =>
            isActive ? "footer-link active" : "footer-link"
          }
        >
          <BarChart3 />
          <span>Reports</span>
        </NavLink>
      </nav>
    </footer>
  );
}
