import React from 'react';

import './Error.css';

const Error = () => {
  return (
    <div className="error-indicator">
      <span className="boom">BOOM</span>
      <span>
        Request failed with status code 400
            </span>
      <span>
        (try to refresh page)
            </span>
    </div>
  )
}

export default Error;