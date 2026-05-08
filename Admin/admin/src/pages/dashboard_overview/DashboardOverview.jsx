import React from "react";
import "./DashboardOverview.css";


const Dashboard = () => {
  return (
    <div className="layout">
      <Dashboard/>

      <div className="main">
        <h1>Dashboard Overview</h1>

        <div className="cards">
          <div className="card">
            <h3>Total Teachers</h3>
            <h2>24</h2>
          </div>

          <div className="card">
            <h3>Total Subjects</h3>
            <h2>42</h2>
          </div>

          <div className="card">
            <h3>Total Rooms</h3>
            <h2>18</h2>
          </div>

          <div className="card red">
            <h3>Conflicts</h3>
            <h2>3</h2>
          </div>
        </div>

        <div className="table-box">
          <h2>Recent Activities</h2>

          <table>
            <thead>
              <tr>
                <th>Teacher</th>
                <th>Subject</th>
                <th>Room</th>
              </tr>
            </thead>

            <tbody>
              <tr>
                <td>John Doe</td>
                <td>Math</td>
                <td>101</td>
              </tr>

              <tr>
                <td>Emily</td>
                <td>Physics</td>
                <td>202</td>
              </tr>

              <tr>
                <td>Robert</td>
                <td>Biology</td>
                <td>305</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;