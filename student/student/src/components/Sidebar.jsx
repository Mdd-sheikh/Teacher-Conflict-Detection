import React from "react";
import "./Sidebar.css";
import {
  CalendarDays,
  ClipboardCheck,
  NotebookPen,
  User,
} from "lucide-react";

import { NavLink } from "react-router-dom";

const Sidebar = () => {
  return (
    <div className="sidebar">
      <NavLink to="/" className="side-link">
        <CalendarDays size={22} />
        <span>Timetable</span>
      </NavLink>

      <NavLink to="/attendence" className="side-link">
        <ClipboardCheck size={22} />
        <span>Attendance</span>
      </NavLink>

      <NavLink to="/notes" className="side-link">
        <NotebookPen size={22} />
        <span>Notes</span>
      </NavLink>

      <NavLink to="/profile" className="side-link">
        <User size={22} />
        <span>Profile</span>
      </NavLink>
    </div>
  );
};

export default Sidebar;