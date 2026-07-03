import "./ErrorMessage.css";

function ErrorMessage({ message, onRetry }) {
  if (!message) return null;

  return (
    <div className="error-container">
      <p><strong>Error:</strong> {message}</p>
      {onRetry && (
        <button onClick={onRetry} className="retry-button">
          Try Again
        </button>
      )}
    </div>
  );
}

export default ErrorMessage;