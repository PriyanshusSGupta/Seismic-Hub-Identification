import React from 'react';
import './Loading.css';

const Loading = ({ size = 'medium', className = '' }) => {
  return (
    <div className={`loading-wrapper ${className}`}>
      <div className={`loading-spinner loading-${size}`}></div>
    </div>
  );
};

export default Loading;