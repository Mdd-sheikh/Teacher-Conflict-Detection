// login.jsx
import React, { useContext, useEffect, useState } from "react";
import "./Auth.css";
import axios from "axios";
import { Navigate, useNavigate } from "react-router-dom";
import { Context } from "../context/Context";

const Auth = () => {
  const [activeTab, setActiveTab] = useState("teacher");
  const [errors, setErrors] = useState({});

  const {
    API_URL,
    Teacherdata,
    setteacherdata,
  } = useContext(Context);
  console.log(Teacherdata);
  

  const navigate = useNavigate();

  // auto login if token exists
  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      navigate("/dashboard");
    }
  }, []);

  const [formData, setFormData] = useState({
    teacherId: "",
    password: "",
    remember: false,
  });

  const [showPassword, setShowPassword] =
    useState(false);

  // Handle Input Change
  const handleChange = (e) => {
    const { name, value, type, checked } =
      e.target;

    setFormData((prev) => ({
      ...prev,
      [name]:
        type === "checkbox" ? checked : value,
    }));
  };

  // Validate Form
  const validateForm = () => {
    let newErrors = {};

    if (!formData.teacherId) {
      newErrors.teacherId =
        "Teacher ID is required";
    }

    if (!formData.password) {
      newErrors.password =
        "Password is required";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validation
    if (!validateForm()) return;

    try {
      const response = await axios.post(
        `${API_URL}/teacher/login/teacherlogin`,
        formData
      );

      console.log(response.data);

      // token
      const token = response?.data?.token;

      // teacher data
      const teacher = response?.data?.teacher;

      // save token
      if (token) {
        localStorage.setItem("token", token);
      }

      // save teacher data
      if (teacher) {
        localStorage.setItem(
          "teacher",
          JSON.stringify(teacher)
        );

        setteacherdata(teacher);
      }

      alert(
        response?.data?.message ||
          "Login Successful"
      );

      navigate("/dashboard");

    } catch (error) {
      console.log(error);

      alert(
        error?.response?.data?.message ||
          "Something went wrong"
      );
    }
  };

  const logoutHandler = () =>{
    const token = localStorage.removeItem("token")
    const teacher = localStorage.removeItem("teacher")
    Navigate("/")
  }

  return (
    <div className="login-container">
      <div className="login-card">

        <div className="logo-box">🎓</div>

        <h1>EduSched Teacher Panel</h1>

        <form onSubmit={handleSubmit}>

          {/* Teacher ID */}
          <div className="input-group">
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

            {errors.teacherId && (
              <span className="error">
                {errors.teacherId}
              </span>
            )}
          </div>

          {/* Password */}
          <div className="input-group">
            <label>Password</label>

            <div className="input-wrapper">
              <span className="icon">🔒</span>

              <input
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
              />

              <button
                type="button"
                className="show-btn"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
                }
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>

            {errors.password && (
              <span className="error">
                {errors.password}
              </span>
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
          <button
          onClick={logoutHandler}
            type="submit"
            className="login-btn"
          >
            Sign In to Dashboard
          </button>
        </form>
      </div>
    </div>
  );
};

export default Auth;