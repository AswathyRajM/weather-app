import React from 'react';
import './ErrorComponent.css'
function ErrorComponent({ errMsg }) {
  return (
    <div className='error-container'>
      <span>{errMsg}</span>
    </div>
  );
}

export default ErrorComponent;
