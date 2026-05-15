import { useState } from "react";
import "./TimetablePage.css";

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const TIME_SLOTS = [
  "08:00", "09:00", "10:00", "11:00", "12:00",
  "13:00", "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00",
];

const SUBJECTS = [
  { label: "DM", color: "subject-math" },
  { label: "Android", color: "subject-science" },
  { label: "English", color: "subject-english" },
  { label: "History", color: "subject-history" },
  { label: "PE", color: "subject-pe" },
  { label: "Art", color: "subject-art" },
];

export default function TimetablePage() {
  const [selected, setSelected] = useState({});
  const [activeSubject, setActiveSubject] = useState(SUBJECTS[0]);
  const [isDragging, setIsDragging] = useState(false);
  const [dragMode, setDragMode] = useState(null); // "select" | "deselect"

  const cellKey = (day, time) => `${day}-${time}`;

  const toggleCell = (day, time) => {
    const key = cellKey(day, time);
    setSelected((prev) => {
      const exists = prev[key];
      if (exists) {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      return { ...prev, [key]: activeSubject };
    });
  };

  const handleMouseDown = (day, time) => {
    const key = cellKey(day, time);
    const isCurrentlySelected = !!selected[key];
    const mode = isCurrentlySelected ? "deselect" : "select";
    setDragMode(mode);
    setIsDragging(true);

    setSelected((prev) => {
      if (mode === "deselect") {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      return { ...prev, [key]: activeSubject };
    });
  };

  const handleMouseEnter = (day, time) => {
    if (!isDragging) return;
    const key = cellKey(day, time);
    setSelected((prev) => {
      if (dragMode === "deselect") {
        const next = { ...prev };
        delete next[key];
        return next;
      }
      return { ...prev, [key]: activeSubject };
    });
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setDragMode(null);
  };

  const clearAll = () => setSelected({});

  const totalSelected = Object.keys(selected).length;

  return (
    <div
      className="tt-page"
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
    >
      <header className="tt-header">
        <div className="tt-header-left">
          <span className="tt-logo-dot" />
          <h1 className="tt-title">Weekly Timetable</h1>
        </div>
        <div className="tt-header-right">
          {totalSelected > 0 && (
            <span className="tt-count">{totalSelected} slot{totalSelected !== 1 ? "s" : ""} selected</span>
          )}
          <button className="tt-clear-btn" onClick={clearAll}>
            Clear all
          </button>
        </div>
      </header>

      <div className="tt-subject-bar">
        <span className="tt-subject-label">Subject</span>
        {SUBJECTS.map((s) => (
          <button
            key={s.label}
            className={`tt-subject-chip ${s.color} ${activeSubject.label === s.label ? "active" : ""}`}
            onClick={() => setActiveSubject(s)}
          >
            {activeSubject.label === s.label && (
              <span className="tt-chip-check">✓</span>
            )}
            {s.label}
          </button>
        ))}
      </div>

      <div className="tt-scroll-wrapper">
        <div className="tt-grid-container">
          <div className="tt-grid" style={{ "--day-count": DAYS.length }}>
            {/* Corner */}
            <div className="tt-corner" />

            {/* Day headers */}
            {DAYS.map((day) => (
              <div key={day} className="tt-day-header">
                {day}
              </div>
            ))}

            {/* Time rows */}
            {TIME_SLOTS.map((time) => (
              <>
                <div key={`time-${time}`} className="tt-time-label">
                  {time}
                </div>
                {DAYS.map((day) => {
                  const key = cellKey(day, time);
                  const sel = selected[key];
                  return (
                    <div
                      key={key}
                      className={`tt-cell ${sel ? `selected ${sel.color}` : ""}`}
                      onMouseDown={() => handleMouseDown(day, time)}
                      onMouseEnter={() => handleMouseEnter(day, time)}
                    >
                      {sel && (
                        <span className="tt-cell-label">{sel.label}</span>
                      )}
                    </div>
                  );
                })}
              </>
            ))}
          </div>
        </div>
      </div>

      <footer className="tt-footer">
        <span>Click or drag to select · Click selected cell to deselect</span>
      </footer>
    </div>
  );
}