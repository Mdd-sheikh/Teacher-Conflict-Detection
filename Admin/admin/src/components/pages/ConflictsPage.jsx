// ConflictPage.jsx

import React, { useState } from "react";
import "./ConflictPage.css";

const ConflictsPage = () => {

    const [activeTab, setActiveTab] = useState("teacher");

    const teacherConflicts = [
        {
            id: 1,
            teacher: "Rahul Sharma",
            initials: "RS",
            color: "purple",
            day: "Monday",
            time: "10:00 AM – 11:00 AM",
            type: "DOUBLE BOOKING",
            issue: "Teacher cannot be in two locations at once.",
            sessionA: {
                subject: "Advanced Physics II",
                room: "Room 402, Block B",
            },
            sessionB: {
                subject: "Intro to Quantum",
                room: "Auditorium 1",
            },
        },

        {
            id: 2,
            teacher: "Dr. Anjali Pathak",
            initials: "AP",
            color: "green",
            day: "Tuesday",
            time: "02:00 PM – 03:30 PM",
            type: "OVERLOAD",
            issue: "Meeting overlaps with laboratory session.",
            sessionA: {
                subject: "Organic Chemistry",
                room: "Lab 3, Science Wing",
            },
            sessionB: {
                subject: "Department Meeting",
                room: "Boardroom 2",
            },
        },
    ];

    return (
        <div className="conflict-page">

            {/* HEADER ALERT */}
            <div className="conflict-alert">

                <div className="alert-dot"></div>

                <div>
                    <h2>Critical Overlaps Detected</h2>

                    <p>
                        8 scheduling conflicts require immediate
                        attention before the timetable can be
                        published for the Fall semester.
                    </p>
                </div>

            </div>

            {/* CONTENT */}
            <div className="conflict-layout">

                {/* LEFT SIDE */}
                <div className="conflict-left">

                    {/* TABS */}
                    <div className="conflict-tabs">

                        <button
                            className={
                                activeTab === "teacher"
                                    ? "active"
                                    : ""
                            }
                            onClick={() =>
                                setActiveTab("teacher")
                            }
                        >
                            ● Teacher Conflicts
                        </button>

                        <button>
                            ● Room Conflicts
                        </button>

                        <button>
                            ● Class Conflicts
                        </button>

                    </div>

                    {/* CARDS */}
                    {
                        teacherConflicts.map((item) => (

                            <div
                                className="conflict-card"
                                key={item.id}
                            >

                                {/* TOP */}
                                <div className="conflict-card-top">

                                    <div className="teacher-info">

                                        <div
                                            className={`teacher-avatar ${item.color}`}
                                        >
                                            {item.initials}
                                        </div>

                                        <div>

                                            <h3>
                                                {item.teacher}
                                            </h3>

                                            <p>
                                                📅 {item.day},{" "}
                                                {item.time}
                                            </p>

                                        </div>

                                    </div>

                                    <span className="conflict-type">
                                        {item.type}
                                    </span>

                                </div>

                                {/* SESSIONS */}
                                <div className="session-grid">

                                    {/* SESSION A */}
                                    <div className="session-box">

                                        <span>
                                            SESSION A
                                        </span>

                                        <h4>
                                            {
                                                item.sessionA.subject
                                            }
                                        </h4>

                                        <p>
                                            📍{" "}
                                            {
                                                item.sessionA.room
                                            }
                                        </p>

                                    </div>

                                    {/* SESSION B */}
                                    <div className="session-box">

                                        <span>
                                            SESSION B
                                        </span>

                                        <h4>
                                            {
                                                item.sessionB.subject
                                            }
                                        </h4>

                                        <p>
                                            📍{" "}
                                            {
                                                item.sessionB.room
                                            }
                                        </p>

                                    </div>

                                </div>

                                {/* FOOTER */}
                                <div className="conflict-footer">

                                    <p className="warning-text">
                                        ⚠ {item.issue}
                                    </p>

                                    <div className="conflict-buttons">

                                        <button className="reschedule-btn">
                                            Reschedule
                                        </button>

                                        <button className="resolve-btn">
                                            ✓ Mark Resolved
                                        </button>

                                    </div>

                                </div>

                            </div>

                        ))
                    }

                </div>

                {/* RIGHT SIDE */}
                <div className="conflict-right">

                    {/* SUMMARY */}
                    <div className="summary-card">

                        <h2>Conflict Summary</h2>

                        <div className="summary-item">
                            <span>
                                Teacher Overlaps
                            </span>

                            <div className="summary-badge red">
                                3
                            </div>
                        </div>

                        <div className="summary-item">
                            <span>
                                Room Clashes
                            </span>

                            <div className="summary-badge yellow">
                                2
                            </div>
                        </div>

                        <div className="summary-item">
                            <span>
                                Subject Duplicates
                            </span>

                            <div className="summary-badge orange">
                                3
                            </div>
                        </div>

                        <button className="auto-btn">
                            ✨ Auto–Resolve Minor Clashes
                        </button>

                        <p className="auto-text">
                            Uses AI to shift slots by +30
                            mins where possible
                        </p>

                    </div>

                    {/* CRITICAL CARD */}
                    <div className="critical-card">

                        <div className="critical-left">
                            ⚠ 8 Critical Actions Pending
                        </div>

                        <div className="critical-count">
                            8
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
};

export default ConflictsPage;