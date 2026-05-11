const FGroup = ({ label, children }) => {
  return (
    <div className="form-group">

      <label className="form-label">
        {label}
      </label>

      {children}

    </div>
  );
};

export default FGroup;