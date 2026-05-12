import { useState, useEffect, useRef } from "react";
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
    dashboard:  "Dashboard",
    timetable:  "Timetable Overview",
    teachers:   "Teacher Management",
    subjects:   "Subjects Overview",
    rooms:      "Rooms Overview",
    conflicts:  "Conflict Resolution"
};

const NAV_ITEMS = [
    { key: "dashboard", label: "Dashboard", Icon: IcoDashboard },
    { key: "timetable", label: "Timetable",  Icon: IcoTimetable },
    { key: "teachers",  label: "Teachers",   Icon: IcoTeachers  },
    { key: "subjects",  label: "Subjects",   Icon: IcoSubjects  },
    { key: "rooms",     label: "Rooms",      Icon: IcoRooms     },
    { key: "conflicts", label: "Conflicts",  Icon: IcoConflicts },
];

export default function EduSchedAdmin() {
    const navigate      = useNavigate();
    const [page,        setPage]        = useState("subjects");
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const sidebarRef    = useRef(null);

    /* ── Close sidebar on outside click (mobile) ── */
    useEffect(() => {
        const handleOutside = (e) => {
            if (
                sidebarOpen &&
                sidebarRef.current &&
                !sidebarRef.current.contains(e.target)
            ) {
                setSidebarOpen(false);
            }
        };
        document.addEventListener("mousedown", handleOutside);
        document.addEventListener("touchstart", handleOutside);
        return () => {
            document.removeEventListener("mousedown", handleOutside);
            document.removeEventListener("touchstart", handleOutside);
        };
    }, [sidebarOpen]);

    /* ── Close sidebar + scroll lock when it opens on mobile ── */
    useEffect(() => {
        document.body.style.overflow = sidebarOpen ? "hidden" : "";
        return () => { document.body.style.overflow = ""; };
    }, [sidebarOpen]);

    /* ── Close sidebar on Escape key ── */
    useEffect(() => {
        const handleKey = (e) => {
            if (e.key === "Escape") setSidebarOpen(false);
        };
        document.addEventListener("keydown", handleKey);
        return () => document.removeEventListener("keydown", handleKey);
    }, []);

    const handleNavClick = (key) => {
        setPage(key);
        setSidebarOpen(false); // always close on mobile after selection
    };

    const removeToken = () => {
        localStorage.removeItem("token");
        setTimeout(() => navigate("/"), 1000);
    };

    const renderPage = () => {
        switch (page) {
            case "dashboard":  return <DashboardPage />;
            case "subjects":   return <SubjectsPage />;
            case "rooms":      return <RoomsPage />;
            case "teachers":   return <TeachersPage />;
            case "timetable":  return <TimetablePage />;
            case "conflicts":  return <ConflictsPage />;
            default:           return null;
        }
    };

    return (
        <div className={`app-shell ${sidebarOpen ? "sidebar-open" : ""}`}>

            {/* ── SIDEBAR ── */}
            <aside className="sidebar" ref={sidebarRef}>

                <div>
                    <div className="sidebar-brand">
                        <h1>EduSched Admin</h1>
                        <span>Management System</span>
                    </div>

                    <nav className="nav">
                        {NAV_ITEMS.map(({ key, label, Icon }) => (
                            <div
                                key={key}
                                className={`nav-item ${page === key ? "active" : ""}`}
                                onClick={() => handleNavClick(key)}
                                role="button"
                                tabIndex={0}
                                onKeyDown={(e) => e.key === "Enter" && handleNavClick(key)}
                                aria-current={page === key ? "page" : undefined}
                            >
                                <Icon />
                                <span>{label}</span>
                            </div>
                        ))}

                        <button className="logout" onClick={removeToken}>
                            <span>Logout</span>
                        </button>
                    </nav>
                </div>

                <div className="sidebar-footer">
                    <div className="avatar">AD</div>
                    <div>
                        <div className="footer-name">Admin User</div>
                        <div className="footer-email">admin@school.edu</div>
                    </div>
                </div>

            </aside>

            {/* ── MAIN ── */}
            <div className="main">

                <div className="topbar">

                    {/* Hamburger — shown on mobile via CSS */}
                    <button
                        className="menu-toggle"
                        onClick={() => setSidebarOpen((prev) => !prev)}
                        aria-label={sidebarOpen ? "Close menu" : "Open menu"}
                        aria-expanded={sidebarOpen}
                    >
                        {sidebarOpen ? "✕" : "☰"}
                    </button>

                    <h2>{PAGE_TITLE[page] ?? "EduSched"}</h2>

                    <div className="topbar-right">
                        <button className="avatar-btn" aria-label="User profile">
                            AD
                        </button>
                    </div>

                </div>

                <div className="content">
                    {renderPage()}
                </div>

            </div>

        </div>
    );
}