// TeacherDashboard.jsx
import React, { useContext, useState } from "react";
import "./TeacherDashboard.css";
import { Context } from "../context/Context";
import { useNavigate } from "react-router-dom";

const TeacherDashboard = () => {
  const [activeMenu, setActiveMenu] =
    useState("dashboard");

  const { Teacherdata } = useContext(Context);

  const Navigate = useNavigate();

  // logout
  const LogoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("teacher");

    Navigate("/");
  };

  // subjects from backend
  const [subjects, setSubjects] = useState(
    Teacherdata?.subjects?.map((item) => ({
      id: item._id,
      name: item.name,
      class: item.department,
      time: Teacherdata?.timeSlots,
      completed: false,
    })) || []
  );

  // mark complete
  const handleComplete = (id) => {
    const updatedSubjects = subjects.map(
      (subject) =>
        subject.id === id
          ? {
              ...subject,
              completed: true,
            }
          : subject
    );

    setSubjects(updatedSubjects);
  };

  return (
    <div className="dashboard-container">

      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">
          EduSched Admin
        </h2>

        <ul className="menu">
          <li
            className={
              activeMenu === "dashboard"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveMenu("dashboard")
            }
          >
            Dashboard
          </li>

          <li
            className={
              activeMenu === "subjects"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveMenu("subjects")
            }
          >
            Subjects
          </li>

          <li
            className={
              activeMenu === "completed"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveMenu("completed")
            }
          >
            Completed
          </li>

          <li
            className={
              activeMenu === "account"
                ? "active"
                : ""
            }
            onClick={() =>
              setActiveMenu("account")
            }
          >
            Account
          </li>
        </ul>

        <button
          className="logout-btn"
          onClick={LogoutHandler}
        >
          Logout
        </button>
      </aside>

      {/* Main Content */}
      <main className="main-content">

        {/* Header */}
        <div className="topbar">
          <h1>My Classes</h1>

          <div className="teacher-info">
            Welcome, {Teacherdata?.name}
          </div>
        </div>

        {/* Dashboard */}
        {activeMenu === "dashboard" && (
          <>
            <div className="overview">
              <h2>Schedule Overview</h2>

              <p>
                {subjects.length} Classes
                Assigned Today
              </p>
            </div>

            <div className="cards-grid">
              {subjects.map((subject) => (
                <div
                  key={subject.id}
                  className={`subject-card ${
                    subject.completed
                      ? "completed-card"
                      : ""
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
                        handleComplete(
                          subject.id
                        )
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

        {/* Subjects */}
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
                    Status :
                    <strong>
                      {subject.completed
                        ? " Completed"
                        : " Pending"}
                    </strong>
                  </p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Completed */}
        {activeMenu === "completed" && (
          <div>
            <h2 className="section-title">
              Completed Classes
            </h2>

            <div className="cards-grid">
              {subjects
                .filter(
                  (subject) =>
                    subject.completed
                )
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

        {/* Account */}
        {activeMenu === "account" && (
          <div className="account-card">
            <h2>Teacher Account</h2>

            <div className="account-info">
              <p>
                <strong>Name:</strong>
                {Teacherdata?.name}
              </p>

              <p>
                <strong>Email:</strong>
                {Teacherdata?.email}
              </p>

              <p>
                <strong>Phone:</strong>
                {Teacherdata?.phone}
              </p>

              <p>
                <strong>Teacher ID:</strong>
                {Teacherdata?.teacherId}
              </p>

              <p>
                <strong>Time Slot:</strong>
                {Teacherdata?.timeSlots}
              </p>

              {/* Rooms */}
              <div className="room-section">
                <strong>Rooms:</strong>

                {Teacherdata?.rooms?.map(
                  (room) => (
                    <div key={room._id}>
                      Room No :
                      {room.roomNumber}
                    </div>
                  )
                )}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
};

export default TeacherDashboard;