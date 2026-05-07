// TeacherDashboard.jsx
import React, { useState } from "react";
import "./TeacherDashboard.css";

const TeacherDashboard = () => {
  const [activeMenu, setActiveMenu] = useState("dashboard");

  const [subjects, setSubjects] = useState([
    {
      id: 1,
      name: "Advanced Physics",
      class: "11-B",
      time: "08:00 AM - 09:30 AM",
      completed: true,
    },
    {
      id: 2,
      name: "Quantum Mechanics",
      class: "10-A",
      time: "10:00 AM - 11:30 AM",
      completed: false,
    },
    {
      id: 3,
      name: "Thermodynamics",
      class: "12-C",
      time: "01:00 PM - 02:30 PM",
      completed: false,
    },
    {
      id: 4,
      name: "Electromagnetism",
      class: "11-B",
      time: "03:00 PM - 04:30 PM",
      completed: true,
    },
  ]);

  // Mark Subject Completed
  const handleComplete = (id) => {
    const updatedSubjects = subjects.map((subject) =>
      subject.id === id
        ? { ...subject, completed: true }
        : subject
    );

    setSubjects(updatedSubjects);
  };

  // Logout Button
  const handleLogout = () => {
    alert("Logged Out Successfully");
  };

  // Teacher Data
  const teacher = {
    name: "Dr. Aris",
    email: "aris@school.edu",
    phone: "+1 987 654 3210",
  };

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">EduSched Admin</h2>

        <ul className="menu">
          <li
            className={activeMenu === "dashboard" ? "active" : ""}
            onClick={() => setActiveMenu("dashboard")}
          >
            Dashboard
          </li>

          <li
            className={activeMenu === "subjects" ? "active" : ""}
            onClick={() => setActiveMenu("subjects")}
          >
            Subjects
          </li>

          <li
            className={activeMenu === "completed" ? "active" : ""}
            onClick={() => setActiveMenu("completed")}
          >
            Completed
          </li>

          <li
            className={activeMenu === "account" ? "active" : ""}
            onClick={() => setActiveMenu("account")}
          >
            Account
          </li>
        </ul>

        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">

        {/* Header */}
        <div className="topbar">
          <h1>My Classes</h1>

          <div className="teacher-info">
            Welcome, {teacher.name}
          </div>
        </div>

        {/* Dashboard */}
        {activeMenu === "dashboard" && (
          <>
            <div className="overview">
              <h2>Schedule Overview</h2>
              <p>4 Classes Assigned Today</p>
            </div>

            <div className="cards-grid">
              {subjects.map((subject) => (
                <div
                  key={subject.id}
                  className={`subject-card ${
                    subject.completed ? "completed-card" : ""
                  }`}
                >
                  <span className="class-badge">
                    {subject.class}
                  </span>

                  <h3>{subject.name}</h3>

                  <p>{subject.time}</p>

                  {subject.completed ? (
                    <button className="done-btn">
                      Completed
                    </button>
                  ) : (
                    <button
                      className="mark-btn"
                      onClick={() =>
                        handleComplete(subject.id)
                      }
                    >
                      Mark as Completed
                    </button>
                  )}
                </div>
              ))}
            </div>
          </>
        )}

        {/* Subjects Page */}
        {activeMenu === "subjects" && (
          <div>
            <h2 className="section-title">
              All Subjects
            </h2>

            <div className="cards-grid">
              {subjects.map((subject) => (
                <div
                  key={subject.id}
                  className="subject-card"
                >
                  <span className="class-badge">
                    {subject.class}
                  </span>

                  <h3>{subject.name}</h3>

                  <p>{subject.time}</p>

                  <p>
                    Status:{" "}
                    <strong>
                      {subject.completed
                        ? "Completed"
                        : "Pending"}
                    </strong>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed Subjects */}
        {activeMenu === "completed" && (
          <div>
            <h2 className="section-title">
              Completed Classes
            </h2>

            <div className="cards-grid">
              {subjects
                .filter((subject) => subject.completed)
                .map((subject) => (
                  <div
                    key={subject.id}
                    className="subject-card completed-card"
                  >
                    <span className="class-badge">
                      {subject.class}
                    </span>

                    <h3>{subject.name}</h3>

                    <p>{subject.time}</p>

                    <button className="done-btn">
                      Completed
                    </button>
                  </div>
                ))}
            </div>
          </div>
        )}

        {/* Account Page */}
        {activeMenu === "account" && (
          <div className="account-card">
            <h2>Teacher Account</h2>

            <div className="account-info">
              <p>
                <strong>Name:</strong>{" "}
                {teacher.name}
              </p>

              <p>
                <strong>Email:</strong>{" "}
                {teacher.email}
              </p>

              <p>
                <strong>Phone:</strong>{" "}
                {teacher.phone}
              </p>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TeacherDashboard;