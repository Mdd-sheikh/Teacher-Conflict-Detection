const DashboardPage = () => {

  return (
    <>

      <div className="stat-grid">

        <div className="stat-card">
          <div className="stat-label">
            Total Teachers
          </div>

          <div className="stat-value">
            124
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">
            Total Subjects
          </div>

          <div className="stat-value">
            42
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-label">
            Total Rooms
          </div>

          <div className="stat-value">
            42
          </div>
        </div>

        <div className="stat-card danger">
          <div className="stat-label">
            Conflicts Detected
          </div>

          <div className="stat-value">
            3
          </div>
        </div>

      </div>

    </>
  );
};

export default DashboardPage;