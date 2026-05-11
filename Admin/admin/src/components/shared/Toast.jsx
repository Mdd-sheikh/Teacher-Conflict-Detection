const Toast = ({ msg, type, onClose }) => {
  return (
    <div
      className={`toast ${msg ? "show" : ""} ${type === "error" ? "error" : ""}`}
    >
      <span>{msg}</span>

      <button
        className="toast-close"
        onClick={onClose}
      >
        ×
      </button>
    </div>
  );
};

export default Toast;