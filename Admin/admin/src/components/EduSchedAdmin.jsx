import { useState } from "react";
import './Edushed.css'

import DashboardPage from "./pages/DashboardPage";
import SubjectsPage from "./pages/SubjectsPage";
import RoomsPage from "./pages/RoomsPage";
import TeachersPage from "./pages/TeachersPage";
import TimetablePage from "./pages/TimetablePage";
import ConflictsPage from "./pages/ConflictsPage";
import { useNavigate } from "react-router-dom";

import {
    IcoDashboard,
    IcoTimetable,
    IcoTeachers,
    IcoSubjects,
    IcoRooms,
    IcoConflicts
} from "./icons/Icons";

const PAGE_TITLE = {
    dashboard: "Dashboard",
    timetable: "Timetable Overview",
    teachers: "Teacher Management",
    subjects: "Subjects Overview",
    rooms: "Rooms Overview",
    conflicts: "Conflict Resolution"
};

export default function EduSchedAdmin() {
  const Navigate  = useNavigate()
    const removeToken = () =>{
        const token = localStorage.removeItem("token")
        setTimeout(() => {
            Navigate("/")
        }, 1000);
    }

    const [page, setPage] = useState("subjects");

    const renderPage = () => {

        switch (page) {

            case "dashboard":
                return <DashboardPage />;

            case "subjects":
                return <SubjectsPage />;

            case "rooms":
                return <RoomsPage />;

            case "teachers":
                return <TeachersPage />;

            case "timetable":
                return <TimetablePage />;

            case "conflicts":
                return <ConflictsPage />;

            case "Logout":
                return "Logout"

            default:
                return null;
        }
    };

    return (

        <div className="app-shell">

            <aside className="sidebar">

                <div className="sidebar-brand">
                    <h1>EduSched Admin</h1>
                    <span>Management System</span>
                </div>

                <nav className="nav">

                    <div
                        className={`nav-item ${page === "dashboard" ? "active" : ""}`}
                        onClick={() => setPage("dashboard")}
                    >
                        <IcoDashboard />
                        Dashboard
                    </div>

                    <div
                        className={`nav-item ${page === "timetable" ? "active" : ""}`}
                        onClick={() => setPage("timetable")}
                    >
                        <IcoTimetable />
                        Timetable
                    </div>

                    <div
                        className={`nav-item ${page === "teachers" ? "active" : ""}`}
                        onClick={() => setPage("teachers")}
                    >
                        <IcoTeachers />
                        Teachers
                    </div>

                    <div
                        className={`nav-item ${page === "subjects" ? "active" : ""}`}
                        onClick={() => setPage("subjects")}
                    >
                        <IcoSubjects />
                        Subjects
                    </div>

                    <div
                        className={`nav-item ${page === "rooms" ? "active" : ""}`}
                        onClick={() => setPage("rooms")}
                    >
                        <IcoRooms />
                        Rooms
                    </div>

                    <div
                        className={`nav-item ${page === "conflicts" ? "active" : ""}`}
                        onClick={() => setPage("conflicts")}
                    >
                        <IcoConflicts />
                        Conflicts
                    </div>
                    <div onClick={removeToken} className="logout">
                        Logout
                    </div>

                </nav>

                <div className="sidebar-footer">

                    <div className="avatar">
                        AD
                    </div>

                    <div>
                        <div className="footer-name">
                            Admin User
                        </div>

                        <div className="footer-email">
                            admin@school.edu
                        </div>
                    </div>

                </div>

            </aside>

            <div className="main">

                <div className="topbar">

                    <h2>
                        {PAGE_TITLE[page]}
                    </h2>

                    <button className="avatar-btn">
                        AD
                    </button>

                </div>

                <div className="content">
                    {renderPage()}
                </div>

            </div>

        </div>
    );
}