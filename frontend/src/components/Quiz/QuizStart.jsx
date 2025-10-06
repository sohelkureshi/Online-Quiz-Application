import React, { useState } from 'react';
import { useQuizContext } from '../../context/QuizContext';
import Button from '../UI/Button';
import Card from '../UI/Card';
import Loader from '../UI/Loader';
import '../../styles/QuizStart.css';

const QuizStart = () => {
  const { startQuiz, loading, error } = useQuizContext();
  const [name, setName] = useState('');

  const handleStartQuiz = () => {
    sessionStorage.setItem('quizStartTime', Date.now().toString());
    startQuiz(name.trim() || 'Anonymous');
  };

  if (loading) {
    return (
      <div className="quiz-start">
        <Card className="start-card loading-card">
          <Loader />
          <div className="loading-messages">
            <p className="loading-text primary">Loading questions...</p>
            <p className="loading-text secondary">
              If this is taking longer than usual, our server might be waking up.
            </p>
            <p className="loading-text secondary">
              This usually takes about 30 seconds on the first visit.
            </p>
          </div>
        </Card>
      </div>
    );
  }

  return (
    <div className="quiz-start">
      <Card className="start-card">
        <div className="hero-section">
          <div className="hero-icon">🚀</div>
          <h2 className="hero-title">Welcome to QuizMaster</h2>
          <p className="hero-description">
            Challenge yourself with our curated questions and test your knowledge!
          </p>
        </div>

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

        <div className="instructions-section">
          <div className="instructions-header">
            <h3 className="instructions-title">📋 Instructions</h3>
          </div>
          <ul className="instructions-list">
            <li>⏱️ Complete the quiz within 10 minutes time limit</li>
            <li>🎯 Choose one answer for each question</li>
            <li>↔️ Navigate between questions anytime</li>
            <li>⏭️ You can skip questions and come back later</li>
            <li>🔄 Clear your answer if you change your mind</li>
            <li>❌ No negative marking - unanswered questions are simply marked incorrect</li>
            <li>📊 Review your detailed performance at the end</li>
            <li>🔁 You can retake the quiz anytime</li>
          </ul>
        </div>

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

        {error && (
          <div className="error-message">
            <span className="error-icon">⚠️</span>
            <div className="error-content">
              <span className="error-text">{error}</span>
              {error.includes('starting up') && (
                <span className="error-hint">
                  Our free server takes about 30 seconds to wake up. Please try again.
                </span>
              )}
            </div>
          </div>
        )}

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

        {/* Server status note */}
        <div className="server-note">
          <p className="note-text">
            Note: First load may take 10 seconds as our server wakes up (free hosting limitation).
          </p>
        </div>
      </Card>
    </div>
  );
};

export default QuizStart;
