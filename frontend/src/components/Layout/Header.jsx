import React from 'react';
import '../../styles/Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-content">
        <div className="logo-section">
          <div className="logo-icon">
            <span className="icon">🎯</span>
          </div>
          <div className="logo-text">
            <h1 className="app-title">QuizMaster</h1>
            <p className="app-subtitle">Test Your Knowledge</p>
          </div>
        </div>
        <div className="header-decoration">
          <div className="pulse-dot"></div>
          <div className="pulse-dot delay-1"></div>
          <div className="pulse-dot delay-2"></div>
        </div>
      </div>
    </header>
  );
};

export default Header;
