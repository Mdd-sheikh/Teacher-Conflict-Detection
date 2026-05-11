const Modal = ({
  open,
  onClose,
  title,
  children,
  onSubmit,
  submitLabel = "Save"
}) => {

  return (
    <div
      className={`modal-overlay ${open ? "open" : ""}`}
      onClick={(e) =>
        e.target === e.currentTarget && onClose()
      }
    >

      <div className="modal">

        <div className="modal-header">
          <h3>{title}</h3>

          <button
            className="modal-close"
            onClick={onClose}
          >
            ×
          </button>
        </div>

        <div className="modal-body">
          {children}
        </div>

        <div className="modal-footer">

          <button
            className="btn-secondary"
            onClick={onClose}
          >
            Cancel
          </button>

          <button
            className="btn-primary"
            onClick={onSubmit}
          >
            {submitLabel}
          </button>

        </div>

      </div>

    </div>
  );
};

export default Modal;