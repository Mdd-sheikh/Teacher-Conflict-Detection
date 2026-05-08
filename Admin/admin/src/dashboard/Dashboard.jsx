import React from "react";
import "./Dashboard.css";

import {
    LayoutDashboard,
    CalendarDays,
    BookOpen,
    MapPin,
    Settings,
} from "lucide-react";

import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
    const location = useLocation();

    return (
        <div className="sidebar">
            <h2>EduSched Admin</h2>

            <Link
                to="/"
                className={location.pathname === "/" ? "active" : ""}
            >
                <LayoutDashboard size={18} />
                Dashboard
            </Link>

            <Link
                to="/timetable"
                className={
                    location.pathname === "/timetable" ? "active" : ""
                }
            >
                <CalendarDays size={18} />
                Timetable
            </Link>

            <Link
                to="/subjects"
                className={
                    location.pathname === "/subjects" ? "active" : ""
                }
            >
                <BookOpen size={18} />
                Subjects
            </Link>

            <Link
                to="/rooms"
                className={location.pathname === "/rooms" ? "active" : ""}
            >
                <MapPin size={18} />
                Rooms
            </Link>

            <Link
                to="/settings"
                className={
                    location.pathname === "/settings" ? "active" : ""
                }
            >
                <Settings size={18} />
                Settings
            </Link>
        </div>
    );
};

export default Sidebar;