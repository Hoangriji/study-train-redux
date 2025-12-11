import './ConfirmDialog.css';

/**
 * Confirmation dialog component
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether dialog is open
 * @param {string} props.title - Dialog title
 * @param {string} props.message - Dialog message
 * @param {function} props.onConfirm - Callback when confirmed
 * @param {function} props.onCancel - Callback when cancelled
 */
const ConfirmDialog = ({ isOpen, title, message, onConfirm, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content confirm-dialog" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onCancel}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-body">
          <p>{message}</p>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={onCancel}>
            <i className="fas fa-times"></i> Cancel
          </button>
          <button className="btn btn-danger" onClick={onConfirm}>
            <i className="fas fa-check"></i> Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmDialog;
