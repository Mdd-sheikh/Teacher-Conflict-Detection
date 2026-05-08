import React from "react";
import "./Subject.css";


const Subjects = () => {
  return (
    <div className="layout">
      <Sidebar />

      <div className="main">
        <div className="top">
          <h1>Subjects Overview</h1>

          <button>Add Subject</button>
        </div>

        <div className="table-box">
          <table>
            <thead>
              <tr>
                <th>Code</th>
                <th>Subject</th>
                <th>Teacher</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>CS-101</td>
                <td>Computer Science</td>
                <td>Dr. Jane</td>
              </tr>

              <tr>
                <td>MATH-202</td>
                <td>Linear Algebra</td>
                <td>Prof. Alan</td>
              </tr>

              <tr>
                <td>PHY-301</td>
                <td>Quantum Physics</td>
                <td>Emily</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Subjects;