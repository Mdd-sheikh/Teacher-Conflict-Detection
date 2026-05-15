import React from "react";
import "./Timetable.css";
import Sidebar from "../../Sidebar";

const Timetable = () => {
    return (
        <div className="layout">
            <Sidebar />

            <div className="dashboard">
                <div className="top-bar">
                    <div>
                        <h2>Good Morning, Alex</h2>
                        <p>Computer Science • Year 3</p>
                    </div>
                </div>

                <h1 className="title">Weekly Schedule</h1>

                <div className="schedule-card active">
                    <div>
                        <h3>09:00 - 10:00</h3>
                        <h2>Advanced Mathematics</h2>
                        <p>Dr. Smith</p>
                        <p>Room 302</p>
                    </div>

                    <span className="badge">COMP SCI</span>
                </div>

                <div className="schedule-card">
                    <div>
                        <h3>10:00 - 11:00</h3>
                        <h2>Physics</h2>
                        <p>Prof. Ray</p>
                        <p>Lab 104</p>
                    </div>

                    <span className="badge blue">CORE</span>
                </div>

                <div className="assignment">
                    <h2>Assignment Due Today</h2>
                    <p>
                        Algorithms Mid-term Project must be submitted before 23:59 PM
                        tonight.
                    </p>

                    <button>SUBMIT NOW</button>
                </div>
            </div>
        </div>
    );
};

export default Timetable;