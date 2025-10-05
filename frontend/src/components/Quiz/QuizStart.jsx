import React, { useState } from 'react';
import { useQuizContext } from '../../context/QuizContext';
import Button from '../UI/Button';
import Card from '../UI/Card';
import Loader from '../UI/Loader';
import { getFromLocalStorage, saveToLocalStorage } from '../../utils/helpers';
import { STORAGE_KEYS } from '../../utils/constants';
import '../../styles/QuizStart.css';

const QuizStart = () => {
  const { startQuiz, loading, error } = useQuizContext();
  const [name, setName] = useState(getFromLocalStorage(STORAGE_KEYS.userName, ''));
  const [showInstructions, setShowInstructions] = useState(true);

const handleStartQuiz = () => {
  if (name.trim()) {
    saveToLocalStorage(STORAGE_KEYS.userName, name.trim());
  }
  // Track quiz start time for elapsed calculation
  sessionStorage.setItem('quizStartTime', Date.now().toString());
  startQuiz(name.trim() || 'Anonymous');
};


  if (loading) {
    return (
      <div className="quiz-start">
        <Card className="start-card loading-card">
          <Loader />
          <p className="loading-text">Loading questions...</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="quiz-start">
      <Card className="start-card">
        {/* Hero Section */}
        <div className="hero-section">
          <div className="hero-icon">🚀</div>
          <h2 className="hero-title">Welcome to QuizMaster</h2>
          <p className="hero-description">
            Challenge yourself with our curated questions and test your knowledge!
          </p>
        </div>

        {/* Name Input Section */}
        <div className="name-section">
          <label htmlFor="userName" className="input-label">
            What's Your Name? <span className="optional">(Optional)</span>
          </label>
          <input
            type="text"
            id="userName"
            className="name-input"
            placeholder="Enter Your Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            maxLength={30}
            onKeyPress={(e) => e.key === 'Enter' && handleStartQuiz()}
          />
        </div>

        {/* Instructions Section */}
        {showInstructions && (
          <div className="instructions-section">
            <div className="instructions-header">
              <h3 className="instructions-title">📋 Instructions</h3>
              <button 
                className="close-instructions"
                onClick={() => setShowInstructions(false)}
              >
                ×
              </button>
            </div>
            <ul className="instructions-list">
              <li>⏱️ Complete the quiz within the time limit</li>
              <li>🎯 Choose one answer for each question</li>
              <li>↔️ Navigate between questions anytime</li>
              <li>📊 Review your performance at the end</li>
              <li>🔄 You can retake the quiz anytime</li>
            </ul>
          </div>
        )}

        {/* Features Grid */}
        <div className="features-grid">
          <div className="feature-item">
            <span className="feature-icon">⚡</span>
            <span className="feature-text">Quick & Fun</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🎓</span>
            <span className="feature-text">Learn & Improve</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🏆</span>
            <span className="feature-text">Track Progress</span>
          </div>
        </div>

        {/* Error Display */}
        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <span>{error}</span>
          </div>
        )}

        {/* Start Button */}
        <Button 
          onClick={handleStartQuiz}
          variant="primary"
          size="large"
          className="start-button"
          disabled={loading}
        >
          <span className="button-content">
            <span className="button-icon">🎯</span>
            <span>Start Quiz</span>
          </span>
        </Button>

        {/* Stats Preview (Optional) */}
        <div className="stats-preview">
          <div className="stat-item">
            <span className="stat-value">15</span>
            <span className="stat-label">Questions</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-value">10</span>
            <span className="stat-label">Minutes</span>
          </div>
          <div className="stat-divider"></div>
          <div className="stat-item">
            <span className="stat-value">60%</span>
            <span className="stat-label">To Pass</span>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default QuizStart;
