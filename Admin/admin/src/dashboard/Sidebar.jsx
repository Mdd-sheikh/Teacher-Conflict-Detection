import React from "react";
import "./Sidebar.css";

import {
    FaChalkboardTeacher,
    FaBookOpen,
    FaDoorOpen,
    FaUsers,
    FaExclamationCircle,
    FaClipboardList,
    FaBell,
    FaPlus,
    FaThLarge,
    FaCalendarAlt,
    FaUser,
    FaMapMarkerAlt,
    FaExclamationTriangle,
} from "react-icons/fa";

import { Link, useLocation } from "react-router-dom";

const Sidebar = () => {
    const location = useLocation();

    return (
        <div className="sidebar">
            <div>
                <h1 className="logo">EduSched Admin</h1>

                <ul className="sidebar-menu">
                    <li className="active">
                        <FaThLarge />
                        Dashboard
                    </li>

                    <li>
                        <FaCalendarAlt />
                        Timetable
                    </li>

                    <li>
                        <FaUser />
                        Teachers
                    </li>

                    <li>
                        <FaBookOpen />
                        Subjects
                    </li>

                    <li>
                        <FaMapMarkerAlt />
                        Rooms
                    </li>

                    <li>
                        <FaExclamationTriangle />
                        Conflicts
                    </li>
                </ul>
            </div>

            {/* User Card */}
            <div className="user-card">
                <div className="avatar">JD</div>

                <div>
                    <h4>John Doe</h4>
                    <p>SUPER ADMIN</p>
                </div>
            </div>
        </div>
    );
};

export default Sidebar;