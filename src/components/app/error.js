import React from 'react';
import { FaTimes } from 'react-icons/fa';

const Error = ({ noteError, dismissError }) => {
  if (!noteError) {
    return null;
  }

  return (
    <div className="error">
      <button type="button" className="error-dismiss" onClick={dismissError}>
        <FaTimes />
      </button>
      <div>
        {' '}
        <i className="fa fa-exclamation-circle" /> {noteError}
      </div>
    </div>
  );
};

export default Error;
