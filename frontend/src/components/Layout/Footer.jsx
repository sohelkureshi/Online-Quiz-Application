import React from 'react';
import '../../styles/Footer.css';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <p className="footer-text">
            Made with <span className="heart">❤️</span> by <strong>Sohel Kureshi</strong>
          </p>
        </div>
        <div className="footer-section">
          <p className="footer-copyright">
            © {currentYear} QuizMaster. All rights reserved.
          </p>
        </div>
        <div className="footer-section social-links">
          <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <span>GitHub</span>
          </a>
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="social-link">
            <span>LinkedIn</span>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
