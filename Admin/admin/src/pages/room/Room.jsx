import React from "react";
import "./Room.css";


const Room = () => {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <div className="top">
          <h1>Rooms Overview</h1>

          <button>Add Room</button>
        </div>

        <div className="cards">
          <div className="card">
            <h3>Total Rooms</h3>
            <h2>42</h2>
          </div>

          <div className="card">
            <h3>Labs</h3>
            <h2>12</h2>
          </div>

          <div className="card">
            <h3>Classrooms</h3>
            <h2>28</h2>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Room;