import React from 'react';
import '../../styles/ProgressBar.css';

const ProgressBar = ({ progress = 0, showLabel = false, height = '8px' }) => {
  const clampedProgress = Math.min(Math.max(progress, 0), 100);

  return (
    <div className="progress-bar-container" style={{ height }}>
      <div 
        className="progress-bar-fill"
        style={{ width: `${clampedProgress}%` }}
      >
        {showLabel && (
          <span className="progress-label">{Math.round(clampedProgress)}%</span>
        )}
      </div>
    </div>
  );
};

export default ProgressBar;
