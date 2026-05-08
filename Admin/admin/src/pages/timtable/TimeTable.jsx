import React from "react";
import "./TimeTable.css";


const Timetable = () => {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <h1>Timetable Overview</h1>

        <div className="timetable">
          <table>
            <thead>
              <tr>
                <th>Time</th>
                <th>Monday</th>
                <th>Tuesday</th>
                <th>Wednesday</th>
                <th>Thursday</th>
                <th>Friday</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>08:00</td>
                <td>Math</td>
                <td>Physics</td>
                <td>Chemistry</td>
                <td>English</td>
                <td>Biology</td>
              </tr>

              <tr>
                <td>10:00</td>
                <td>CS</td>
                <td>Math</td>
                <td>Physics</td>
                <td>Chemistry</td>
                <td>English</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Timetable;