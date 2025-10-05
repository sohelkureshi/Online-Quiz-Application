import React from 'react';
import '../../styles/Loader.css';

const Loader = ({ size = 'medium', text = '' }) => {
  return (
    <div className={`loader-container ${size}`}>
      <div className="loader">
        <div className="loader-circle"></div>
        <div className="loader-circle"></div>
        <div className="loader-circle"></div>
      </div>
      {text && <p className="loader-text">{text}</p>}
    </div>
  );
};

export default Loader;
