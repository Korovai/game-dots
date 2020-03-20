import React from 'react';

import './error-indicator.css';
import iconError from './error.png';

const ErrorIndicator = () => {
  return (
    <div className="wrErrorIndicator">
      <img src={iconError} alt="Icon Error" />
      <span className="boom">Boom!</span>
      <span>something has gone terribli wrong</span>
      <span>(but we are already fixing it)</span>
    </div>
  );
};

export default ErrorIndicator;