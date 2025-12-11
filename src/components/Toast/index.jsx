import { useState, useEffect } from 'react';
import './Toast.css';

/**
 * Toast notification component
 * @param {Object} props
 * @param {string} props.message - Message to display
 * @param {string} props.type - Type of toast (success, error, info)
 * @param {number} props.duration - Duration in ms (default 3000)
 * @param {function} props.onClose - Callback when toast closes
 */
const Toast = ({ message, type = 'info', duration = 3000, onClose }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false);
      if (onClose) onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  if (!isVisible) return null;

  return (
    <div className={`toast toast-${type}`}>
      <div className="toast-content">
        <i className={`fas ${type === 'success' ? 'fa-check-circle' : type === 'error' ? 'fa-exclamation-circle' : 'fa-info-circle'}`}></i>
        <span>{message}</span>
      </div>
      <button className="toast-close" onClick={() => { setIsVisible(false); if (onClose) onClose(); }}>
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
};

export default Toast;
