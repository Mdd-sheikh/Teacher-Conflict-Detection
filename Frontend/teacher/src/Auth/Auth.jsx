// login.jsx
import React, { useState } from "react";
import "./Auth.css";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("admin");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] = useState(false);

  const [errors, setErrors] = useState({});

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

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (
      !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email)
    ) {
      newErrors.email = "Invalid email address";
    }

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

    if (validateForm()) {
      alert(
        `${activeTab === "admin" ? "Admin" : "Teacher"} Login Successful`
      );

      console.log("Login Data:", formData);

      // Reset form
      setFormData({
        email: "",
        password: "",
        remember: false,
      });
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
            className={activeTab === "admin" ? "active" : ""}
            onClick={() => setActiveTab("admin")}
          >
            Admin Login
          </button>

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
          <div className="input-group">
            <label>Email Address</label>

            <div className="input-wrapper">
              <span className="icon">✉️</span>

              <input
                type="email"
                name="email"
                placeholder="admin@school.edu"
                value={formData.email}
                onChange={handleChange}
              />
            </div>

            {errors.email && (
              <span className="error">{errors.email}</span>
            )}
          </div>

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