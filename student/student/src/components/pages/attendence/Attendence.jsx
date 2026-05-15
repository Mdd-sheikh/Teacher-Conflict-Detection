import React from "react";
import "./Attendence.css";
import Sidebar from "../../Sidebar";

const Attendance = () => {
  return (
    <div className="layout">
      <Sidebar />

      <div className="attendance-page">
        <div className="attendance-card">
          <div className="circle">
            <h1>82%</h1>
          </div>

          <div>
            <h2>Attendance Overview</h2>
            <p>
              You have maintained a consistent record this semester.
            </p>
          </div>
        </div>

        <div className="stats">
          <div className="box">
            <h3>120</h3>
            <p>Total Classes</p>
          </div>

          <div className="box">
            <h3>98</h3>
            <p>Attended</p>
          </div>

          <div className="box">
            <h3>22</h3>
            <p>Missed</p>
          </div>
        </div>

        <div className="subjects">
          <h2>Subject Performance</h2>

          <div className="subject">
            <p>Math</p>
            <div className="progress">
              <div className="fill"></div>
            </div>
          </div>

          <div className="subject">
            <p>Science</p>
            <div className="progress">
              <div className="fill second"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Attendance;