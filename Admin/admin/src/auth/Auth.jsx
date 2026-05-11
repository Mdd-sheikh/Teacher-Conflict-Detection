// Auth.jsx
import React, { useContext, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import "./Auth.css";
import {
    User,
    Mail,
    Lock,
    BookOpen,
    LifeBuoy,
} from "lucide-react";
import { Context } from "../context/Context";

const Auth = () => {
    const navigate = useNavigate()
    const [isLogin, setIsLogin] = useState(false);
    const { API_URL } = useContext(Context)

    const [signupData, setSignupData] = useState({
        name: "",
        email: "",
        password: "",
    });

    console.log(signupData);

    const [loginData, setLoginData] = useState({
        email: "",
        password: "",
    });

    // Signup Input Handle
    const handleSignupChange = (e) => {
        const { name, value } = e.target;

        setSignupData({
            ...signupData,
            [name]: value,
        });
    };

    // Login Input Handle
    const handleLoginChange = (e) => {
        const { name, value } = e.target;

        setLoginData({
            ...loginData,
            [name]: value,
        });
    };

    // Signup Submit
    const handleSignupSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${API_URL}/user/register`,
                signupData
            );

            localStorage.setItem("token", response?.data?.token);

            alert(response?.data?.message);

            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);

        } catch (error) {
            console.log(error);

            alert(
                error?.response?.data?.message || "Failed to signup"
            );
        }
    };

    // Login Submit
    const handleLoginSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `${API_URL}/user/login`,
                loginData
            );

            localStorage.setItem(
                "token",
                response?.data?.token
            );

            alert(response?.data?.message);

            setTimeout(() => {
                navigate("/dashboard");
            }, 1000);

        } catch (error) {
            console.log(error);

            alert(
                error?.response?.data?.message ||
                "Failed to login"
            );
        }
    };

    return (
        <div className="auth-container">
            {/* Logo */}
            <div className="logo-box">
                <BookOpen size={28} color="#fff" />
            </div>

            {/* Title */}
            <h1 className="title">EduSched Admin</h1>
            <p className="subtitle">
                Register for Centralized Timetable Management
            </p>

            {/* Card */}
            <div className="auth-card">
                {/* Tabs */}
                <div className="tabs">
                    <button
                        className={!isLogin ? "active-tab" : ""}
                        onClick={() => setIsLogin(false)}
                    >
                        Admin Login
                    </button>
                </div>

                {/* SIGNUP FORM */}
                {!isLogin ? (
                    <form onSubmit={handleSignupSubmit} className="form">
                        <div className="input-group">
                            <label>Full Name</label>

                            <div className="input-box">
                                <User size={18} />
                                <input
                                    type="text"
                                    placeholder="Administrator Name"
                                    name="name"
                                    value={signupData.name}
                                    onChange={handleSignupChange}
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Email Address</label>

                            <div className="input-box">
                                <Mail size={18} />
                                <input
                                    type="email"
                                    placeholder="admin@school.edu"
                                    name="email"
                                    value={signupData.email}
                                    onChange={handleSignupChange}
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Password</label>

                            <div className="input-box">
                                <Lock size={18} />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    name="password"
                                    value={signupData.password}
                                    onChange={handleSignupChange}
                                />
                            </div>
                        </div>

                        <button className="submit-btn">
                            Create Admin Account
                        </button>

                        <p className="switch-text">
                            Already have an account?{" "}
                            <span onClick={() => setIsLogin(true)}>
                                Sign in
                            </span>
                        </p>
                    </form>
                ) : (
                    /* LOGIN FORM */
                    <form onSubmit={handleLoginSubmit} className="form">
                        <div className="input-group">
                            <label>Email Address</label>

                            <div className="input-box">
                                <Mail size={18} />
                                <input
                                    type="email"
                                    placeholder="admin@school.edu"
                                    name="email"
                                    value={loginData.email}
                                    onChange={handleLoginChange}
                                />
                            </div>
                        </div>

                        <div className="input-group">
                            <label>Password</label>

                            <div className="input-box">
                                <Lock size={18} />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    name="password"
                                    value={loginData.password}
                                    onChange={handleLoginChange}
                                />
                            </div>
                        </div>

                        <button className="submit-btn">
                            Sign In
                        </button>

                        <p className="switch-text">
                            Don’t have an account?{" "}
                            <span onClick={() => setIsLogin(false)}>
                                Create Account
                            </span>
                        </p>
                    </form>
                )}

                {/* Bottom */}
                <div className="bottom-box">
                    <p>
                        Already have an account? <span>Sign in</span>
                    </p>
                </div>
            </div>

            {/* Footer Buttons */}
            <div className="footer-buttons">
                <div className="footer-card">
                    <LifeBuoy size={18} />
                    <span>Support Hub</span>
                </div>

                <div className="footer-card">
                    <BookOpen size={18} />
                    <span>User Manual</span>
                </div>
            </div>

            <p className="copyright">
                © 2024 EduSched Institutional Systems.
                All rights reserved.
            </p>
        </div>
    );
};

export default Auth;