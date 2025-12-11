import './ErrorPage.css';

/**
 * Error page component displayed when API fails
 * @param {Object} props
 * @param {string} props.error - Error message
 * @param {function} props.onRetry - Callback to retry
 */
const ErrorPage = ({ error, onRetry }) => {
  return (
    <div className="error-page">
      <div className="error-content">
        <i className="fas fa-exclamation-triangle error-icon"></i>
        <h2>Oops! Something went wrong</h2>
        <p className="error-message">{error || 'Failed to load data'}</p>
        <button className="btn btn-primary" onClick={onRetry}>
          <i className="fas fa-redo"></i> Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorPage;
