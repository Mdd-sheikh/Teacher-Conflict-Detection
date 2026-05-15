import React from "react";
import "./Notes.css";
import Sidebar from "../../Sidebar";

const Notes = () => {
  return (
    <div className="layout">
      <Sidebar />

      <div className="notes-page">
        <div className="note-card">
          <span>MATHEMATICS</span>

          <h2>Calculus Basics</h2>

          <p>
            This week we explore the theorem of calculus and integration.
          </p>

          <button>View Full Note</button>
        </div>

        <div className="note-card">
          <span>PHYSICS</span>

          <h2>Quantum Mechanics</h2>

          <p>
            Deep dive into wave particle duality and Schrodinger equation.
          </p>

          <button>View Full Note</button>
        </div>
      </div>
    </div>
  );
};

export default Notes;