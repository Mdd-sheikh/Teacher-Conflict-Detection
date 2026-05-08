import React from "react";
import "./Setting.css";


const Settings = () => {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <h1>Admin Settings</h1>

        <div className="settings-box">
          <label>School Name</label>
          <input type="text" placeholder="Enter school name" />

          <label>Academic Year</label>
          <select>
            <option>2024-2025</option>
            <option>2025-2026</option>
          </select>

          <button>Save Changes</button>
        </div>
      </div>
    </div>
  );
};

export default Settings;