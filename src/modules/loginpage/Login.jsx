import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";
import RobotViewer from "./RobotViewer";
import { AiTwotoneMail } from "react-icons/ai";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";

// Simplified login - heading removed for minimal look

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState("Student");
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = () => {
    if (role === "Teacher") navigate("/teachers/home");
    else if (role === "Parent") navigate("/parents/diary");
    else navigate("/students/home");
  };

  return (
    <div className={`login-layout role-${role.toLowerCase()}`}>

      <div className="robot-zone">
        <RobotViewer />
      </div>

      <div className="login-zone">
        <div className="login-content">
          {/* Role selector */}
          <div className="role-row">
            {["Student", "Parent", "Teacher"].map((r) => (
              <button
                key={r}
                className={`role-btn ${role === r ? "active" : ""}`}
                onClick={() => setRole(r)}
              >
                {r}
              </button>
            ))}
          </div>



          <div className="input-group">
            <div className="input-box">
              <input
                placeholder="Enter username"
                autoComplete="username"
              />
              <AiTwotoneMail />
            </div>
          </div>

          <div className="input-group">
            <div className="input-box">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter password"
                autoComplete="current-password"
              />
              <button
                type="button"
                className="eye-btn"
                onClick={(e) => {
                  e.preventDefault();
                  setShowPassword(!showPassword);
                }}
              >
                {showPassword ? <FaRegEyeSlash /> : <FaRegEye />}
              </button>
            </div>
          </div>

          <button className="login-btn" onClick={handleLogin}>
            Login Now
          </button>
        </div>
      </div>
    </div>
  );
}
