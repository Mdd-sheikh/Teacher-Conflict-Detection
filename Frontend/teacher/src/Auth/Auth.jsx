// login.jsx
import React, { useState } from "react";
import "./Auth.css";
import { Link } from "react-router-dom";
import axios from 'axios'

const Auth = () => {
  const [activeTab, setActiveTab] = useState("admin");
  const [errors, setErrors] = useState({});
  const API_URL = "https://teacher-conflict-detection-2.onrender.com"

  const [formData, setFormData] = useState({

    password: "",
    teacherId: "",
  });


  const [showPassword, setShowPassword] = useState(false);


  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  // Validate Form
  const validateForm = () => {
    let newErrors = {};

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = (e) => {
    e.preventDefault();

    try {
      const response = axios.post(`${API_URL}/teacher/login/teacherlogin`, formData.teacherId, formData.password)
      alert(response?.data?.messege)
      localStorage.setItem("token", token)

    } catch (error) {
      alert("somthing went wrong")

    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        {/* Logo */}
        <div className="logo-box">🎓</div>

        {/* Heading */}
        <h1>EduSched Admin</h1>
        <p className="subtitle">
          Centralized Timetable Management System
        </p>

        {/* Tabs */}
        <div className="tabs">

          <button
            className={activeTab === "teacher" ? "active" : ""}
            onClick={() => setActiveTab("teacher")}
          >
            Teacher Login
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          {/* Email */}
          {activeTab === "admin" ? (
            <div className="input-group">
              <label>Teacher Id</label>

              <div className="input-wrapper">
                <span className="icon">📧</span>

                <input
                  type="text"
                  name="teacherId"
                  placeholder="admin@school.edu"
                  value={formData.teacherId}
                  onChange={handleChange}
                />
              </div>

              {errors.email && (
                <span className="error">{errors.email}</span>
              )}
            </div>
          ) : (
            <div className="teacherid">
              <label>Teacher ID</label>

              <div className="input-wrapper">
                <span className="icon">🆔</span>

                <input
                  type="text"
                  name="teacherId"
                  placeholder="Enter Teacher ID"
                  value={formData.teacherId}
                  onChange={handleChange}
                />
              </div>
            </div>
          )}


          {/* Password */}
          <div className="input-group">
            <label>Password</label>

            <div className="input-wrapper">
              <span className="icon">🔒</span>

              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />

              <button
                type="button"
                className="show-btn"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {errors.password && (
              <span className="error">{errors.password}</span>
            )}
          </div>

          {/* Remember */}
          <div className="remember-row">
            <label>
              <input
                type="checkbox"
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
              />
              Remember me
            </label>
          </div>

          {/* Submit */}
          <button type="submit" className="login-btn">
            Sign In to Dashboard
          </button>
        </form>

        {/* Footer */}
        <div className="forgot-text">
          Forgot Password? <span>Contact Admin</span>
        </div>
      </div>

      {/* Bottom Cards */}
      <div className="bottom-links">
        <div className="bottom-card">🛡️ Support Hub</div>
        <div className="bottom-card">📖 User Manual</div>
      </div>

      <p className="copyright">
        © 2024 EduSched Institutional Systems. All rights reserved.
      </p>
    </div>
  );
};

export default Auth;