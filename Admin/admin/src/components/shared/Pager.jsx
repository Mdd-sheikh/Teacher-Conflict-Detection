const Pager = ({ info }) => {
  return (
    <div className="table-footer">

      <div className="table-info">
        {info}
      </div>

      <div className="pagination">

        <button className="page-btn">
          ‹
        </button>

        <button className="page-btn active">
          1
        </button>

        <button className="page-btn">
          2
        </button>

        <button className="page-btn">
          3
        </button>

        <button className="page-btn">
          ›
        </button>

      </div>

    </div>
  );
};

export default Pager;