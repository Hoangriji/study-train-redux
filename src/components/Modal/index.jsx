import './Modal.css';

/**
 * Generic modal component
 * @param {Object} props
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {string} props.title - Modal title
 * @param {ReactNode} props.children - Modal content
 * @param {function} props.onClose - Callback when modal closes
 */
const Modal = ({ isOpen, title, children, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content modal-large" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>{title}</h3>
          <button className="modal-close" onClick={onClose}>
            <i className="fas fa-times"></i>
          </button>
        </div>
        <div className="modal-body">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;
