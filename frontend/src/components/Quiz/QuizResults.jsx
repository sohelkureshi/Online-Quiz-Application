import React, { useEffect } from 'react';
import { useQuizContext } from '../../context/QuizContext';
import Card from '../UI/Card';
import Button from '../UI/Button';
import { getResultStatus, calculateStats } from '../../utils/helpers';
import { RESULT_STATUS } from '../../utils/constants';
import '../../styles/QuizResults.css';

const QuizResults = () => {
  const { results, restartQuiz, userName, timeTaken } = useQuizContext();

  // Celebration effect on mount
  useEffect(() => {
    if (results && results.percentage >= 70) {
      // Trigger confetti or celebration animation
      document.body.classList.add('celebrate');
      setTimeout(() => {
        document.body.classList.remove('celebrate');
      }, 3000);
    }
  }, [results]);

  if (!results) {
    return (
      <div className="quiz-results">
        <Card>
          <p>Loading results...</p>
        </Card>
      </div>
    );
  }

  const { score, totalQuestions, percentage, detailedResults } = results;
  const status = getResultStatus(percentage);
  const statusInfo = RESULT_STATUS[status];
  const stats = calculateStats(detailedResults);

  // Format time taken
  const formatTimeTaken = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}m ${secs}s`;
  };

  return (
    <div className="quiz-results">
      {/* Results Header Card */}
      <Card className="results-header-card">
        <div className="results-celebration">
          <div className="celebration-icon">{statusInfo.label.split(' ')[0]}</div>
        </div>
        
        <h2 className="results-title">
          {userName ? `Quiz Completed, ${userName}!` : 'Quiz Completed!'}
        </h2>
        
        <div className="score-display">
          <div className="score-circle" style={{ borderColor: statusInfo.color }}>
            <div className="score-inner">
              <span className="score-value">{score}</span>
              <span className="score-divider">/</span>
              <span className="score-total">{totalQuestions}</span>
            </div>
          </div>
          <div className="percentage-display" style={{ color: statusInfo.color }}>
            {percentage}%
          </div>
          <div className="status-label" style={{ color: statusInfo.color }}>
            {statusInfo.label}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="quick-stats">
          <div className="stat-card">
            <div className="stat-icon correct">✓</div>
            <div className="stat-info">
              <span className="stat-value">{stats.correct}</span>
              <span className="stat-label">Correct</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon incorrect">✗</div>
            <div className="stat-info">
              <span className="stat-value">{stats.incorrect}</span>
              <span className="stat-label">Incorrect</span>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon time">⏱️</div>
            <div className="stat-info">
              <span className="stat-value">{formatTimeTaken(timeTaken)}</span>
              <span className="stat-label">Time Taken</span>
            </div>
          </div>
        </div>
      </Card>

      {/* Detailed Results */}
      <Card className="detailed-results-card">
        <div className="detailed-header">
          <h3 className="detailed-title">📊 Detailed Results</h3>
          <p className="detailed-subtitle">Review your answers</p>
        </div>

        <div className="results-list">
          {detailedResults.map((result, index) => (
            <div 
              key={result.questionId} 
              className={`result-item ${result.isCorrect ? 'correct' : result.isAttempted ? 'incorrect' : 'unattempted'}`}
            >
              <div className="result-header">
                <div className="result-number">
                  <span>Q{index + 1}</span>
                  <div className={`result-status ${result.isCorrect ? 'correct' : 'incorrect'}`}>
                    {result.isCorrect ? '✓' : '✗'}
                  </div>
                </div>
                <div className="result-question">
                  {result.questionText}
                </div>
              </div>

              <div className="result-answers">
                {Object.entries(result.options).map(([key, value]) => {
                  const isCorrect = key === result.correctAnswer;
                  const isUserAnswer = key === result.userAnswer;
                  
                  let className = 'answer-option';
                  if (isCorrect) className += ' correct-answer';
                  if (isUserAnswer && !isCorrect) className += ' wrong-answer';
                  if (isUserAnswer && isCorrect) className += ' user-correct';

                  return (
                    <div key={key} className={className}>
                      <span className="answer-letter">{key}</span>
                      <span className="answer-text">{value}</span>
                      {isCorrect && <span className="answer-badge">Correct</span>}
                      {isUserAnswer && !isCorrect && <span className="answer-badge wrong">Your Answer</span>}
                    </div>
                  );
                })}
                
                {/* Show unattempted badge */}
                {!result.isAttempted && (
                  <div className="unattempted-message">
                    <span className="unattempted-icon">⚠️</span>
                    <span className="unattempted-text">This question was not attempted</span>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

      </Card>

      {/* Action Buttons */}
      <div className="results-actions">
        <Button
          onClick={restartQuiz}
          variant="primary"
          size="large"
          className="restart-button"
        >
          <span className="button-content">
            <span className="button-icon">🔄</span>
            <span>Retake Quiz</span>
          </span>
        </Button>
      </div>

      {/* Motivational Message */}
      <Card className="motivation-card">
        <p className="motivation-text">
          {percentage >= 90 && "Outstanding performance! You're a quiz master! 🌟"}
          {percentage >= 70 && percentage < 90 && "Great work! Keep it up! 💪"}
          {percentage >= 60 && percentage < 70 && "Good job! Practice makes perfect! 📚"}
          {percentage < 60 && "Don't give up! Try again and improve your score! 🚀"}
        </p>
      </Card>
    </div>
  );
};

export default QuizResults;
