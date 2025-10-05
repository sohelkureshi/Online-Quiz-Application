import React, { useState } from 'react';
import { useQuizContext } from '../../context/QuizContext';
import { QUIZ_TIME_LIMIT } from '../../utils/constants';
import Button from '../UI/Button';
import '../../styles/QuizNavigation.css';

const QuizNavigation = ({ isLastQuestion }) => {
  const {
    currentQuestionIndex,
    previousQuestion,
    nextQuestion,
    skipQuestion,
    submitQuiz,
    isCurrentQuestionAnswered,
    userAnswers,
    questions
  } = useQuizContext();

  const [showConfirmModal, setShowConfirmModal] = useState(false);

  const handleSubmit = () => {
    setShowConfirmModal(true);
  };

  const confirmSubmit = () => {
    setShowConfirmModal(false);
    
    // Calculate time remaining when user manually submits
    const now = Date.now();
    const startTime = sessionStorage.getItem('quizStartTime');
    let timeRemaining = 0;
    
    if (startTime) {
      const elapsed = Math.floor((now - parseInt(startTime)) / 1000);
      timeRemaining = Math.max(0, QUIZ_TIME_LIMIT - elapsed);
    }
    
    submitQuiz(timeRemaining);
  };

  const answeredCount = Object.keys(userAnswers).length;
  const totalQuestions = questions.length;
  const unansweredCount = totalQuestions - answeredCount;

  return (
    <>
      <div className="quiz-navigation">
        <div className="navigation-info">
          <span className="answered-count">
            ✓ {answeredCount} answered
          </span>
          <span className="unanswered-count">
            ⚠️ {unansweredCount} unanswered
          </span>
        </div>

        <div className="navigation-buttons">
          {/* Previous Button */}
          <Button
            onClick={previousQuestion}
            variant="secondary"
            disabled={currentQuestionIndex === 0}
            className="nav-button prev-button"
          >
            <span className="button-content">
              <span className="button-icon">←</span>
              <span>Previous</span>
            </span>
          </Button>

          {/* Middle Buttons - Skip or Next */}
          {!isLastQuestion && (
            <>
              {/* Next Button - Always enabled now */}
              <Button
                onClick={nextQuestion}
                variant="primary"
                className="nav-button next-button"
              >
                <span className="button-content">
                  <span>Next</span>
                  <span className="button-icon">→</span>
                </span>
              </Button>

              {/* Skip Button - Only show if not answered */}
              {!isCurrentQuestionAnswered && (
                <Button
                  onClick={skipQuestion}
                  variant="secondary"
                  className="nav-button skip-button"
                >
                  <span className="button-content">
                    <span className="button-icon">⏭️</span>
                    <span>Skip</span>
                  </span>
                </Button>
              )}
            </>
          )}

          {/* Submit Button - Last Question */}
          {isLastQuestion && (
            <>
              <Button
                onClick={handleSubmit}
                variant="primary"
                className="nav-button submit-button"
              >
                <span className="button-content">
                  <span>Submit Quiz</span>
                  <span className="button-icon">✓</span>
                </span>
              </Button>

              {/* Skip to Submit - If not answered */}
              {!isCurrentQuestionAnswered && (
                <Button
                  onClick={handleSubmit}
                  variant="secondary"
                  className="nav-button skip-submit-button"
                >
                  <span className="button-content">
                    <span className="button-icon">⏭️</span>
                    <span>Skip & Submit</span>
                  </span>
                </Button>
              )}
            </>
          )}
        </div>
      </div>

      {/* Confirmation Modal */}
      {showConfirmModal && (
        <div className="modal-overlay" onClick={() => setShowConfirmModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <div className="modal-header">
              <h3>Submit Quiz?</h3>
              <button 
                className="modal-close"
                onClick={() => setShowConfirmModal(false)}
              >
                ×
              </button>
            </div>
            <div className="modal-body">
              <div className="modal-stats">
                <div className="modal-stat success">
                  <span className="stat-icon">✓</span>
                  <span className="stat-number">{answeredCount}</span>
                  <span className="stat-label">Answered</span>
                </div>
                <div className="modal-stat warning">
                  <span className="stat-icon">⚠️</span>
                  <span className="stat-number">{unansweredCount}</span>
                  <span className="stat-label">Unanswered</span>
                </div>
              </div>
              {unansweredCount > 0 && (
                <p className="warning-text">
                  ⚠️ <strong>{unansweredCount}</strong> question(s) are unanswered and will be marked as incorrect.
                </p>
              )}
              <p className="confirm-text">Are you sure you want to submit?</p>
            </div>
            <div className="modal-actions">
              <Button
                onClick={() => setShowConfirmModal(false)}
                variant="secondary"
              >
                Cancel
              </Button>
              <Button
                onClick={confirmSubmit}
                variant="primary"
              >
                Yes, Submit
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default QuizNavigation;
