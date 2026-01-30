import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

/* COMMON */
import Front from "../modules/frontpage/Front.jsx";
import Login from "../modules/loginpage/Login.jsx";

/* STUDENTS */
import Home from "../modules/students/homepage/Home.jsx";
import Class from "../modules/students/classpage/Class.jsx";
import Diary from "../modules/students/diarypage/Diary.jsx";
import Robot from "../modules/students/robotpage/Robot.jsx";
import Profile from "../modules/students/profilepage/Profile.jsx";
import Notifications from "../modules/students/notifications/Notifications.jsx";
import StudentTimetable from "../modules/students/timetable/StudentTimetable.jsx";

/* PARENTS */
import ParentDiary from "../modules/parents/diarypage/Diary.jsx";
import ParentProfile from "../modules/parents/profilepage/Profile.jsx";
import Attendance from "../modules/parents/attendancepage/Attendance.jsx";
import ParentNotifications from "../modules/parents/notifications/Notifications.jsx";
import ParentReport from "../modules/parents/reportspage/Report.jsx";
import ParentPayments from "../modules/parents/payments/Payments.jsx";
import ParentTimetable from "../modules/parents/timetable/Parentstimetable.jsx";

/* TEACHERS */
import TeacherHome from "../modules/teacher/home/TeacherHome.jsx";
import TeacherClasses from "../modules/teacher/classes/TeacherClass.jsx";
import TeacherAttendance from "../modules/teacher/attendance/TeacherAttendance.jsx";
import TeacherReports from "../modules/teacher/reports/TeacherReports.jsx";
import TeacherRobot from "../modules/teacher/robot/TeacherRobot.jsx";
import TeacherProfile from "../modules/teacher/profile/TeacherProfile.jsx";
import TeacherTimetable from "../modules/teacher/timetable/TeacherTimetable.jsx";

export default function AppNavigator() {
  return (
    <Routes>
      {/* PUBLIC */}
      <Route path="/" element={<Front />} />
      <Route path="/login" element={<Login />} />

      {/* STUDENTS */}
      <Route path="/students/home" element={<Home />} />
      <Route path="/students/class" element={<Class />} />
      <Route path="/students/diary" element={<Diary />} />
      <Route path="/students/robot" element={<Robot />} />
      <Route path="/students/profile" element={<Profile />} />
      <Route path="/students/notifications" element={<Notifications />} />
      <Route path="/students/timetable" element={<StudentTimetable />} />

      {/* PARENTS */}
      <Route path="/parents/diary" element={<ParentDiary />} />
      <Route path="/parents/profile" element={<ParentProfile />} />
      <Route path="/parents/attendance" element={<Attendance />} />
      <Route path="/parents/notifications" element={<ParentNotifications />} />
      <Route path="/parents/reports" element={<ParentReport />} />
      <Route path="/parents/payments" element={<ParentPayments />} />
      <Route path="/parents/timetable" element={<ParentTimetable />} />

      {/* {Teachers} */}
      <Route path="/teachers/home" element={<TeacherHome />} />
      <Route path="/teachers/class" element={<TeacherClasses />} />
      <Route path="/teachers/attendance" element={<TeacherAttendance />} />
      <Route path="/teachers/reports" element={<TeacherReports />} />
      <Route path="/teachers/assignments" element={<TeacherReports />} />
      <Route path="/teachers/robot" element={<TeacherRobot />} />
      <Route path="/teachers/profile" element={<TeacherProfile />} />
      <Route path="/teachers/timetable" element={<TeacherTimetable />} />
    </Routes>
  );
}
