import React, { useEffect } from 'react';
import { useQuizContext } from '../../context/QuizContext';
import Card from '../UI/Card';
import Button from '../UI/Button';
import ProgressBar from '../UI/ProgressBar';
import QuizTimer from './QuizTimer';
import QuizNavigation from './QuizNavigation';
import '../../styles/QuizQuestion.css';

const QuizQuestion = () => {
  const {
    currentQuestion,
    currentQuestionIndex,
    questions,
    userAnswers,
    answerQuestion,
    clearAnswer,
    progressPercentage
  } = useQuizContext();

  // Auto-scroll to top when question changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentQuestionIndex]);

  if (!currentQuestion) {
    return (
      <div className="quiz-question">
        <Card>
          <p>Loading question...</p>
        </Card>
      </div>
    );
  }

  const handleOptionSelect = (option) => {
    answerQuestion(currentQuestion.id, option);
  };

  const handleClearAnswer = () => {
    clearAnswer(currentQuestion.id);
  };

  const selectedOption = userAnswers[currentQuestion.id];
  const isLastQuestion = currentQuestionIndex === questions.length - 1;

  return (
    <div className="quiz-question">
      {/* Top Bar with Progress and Timer */}
      <div className="quiz-top-bar">
        <div className="progress-section">
          <div className="progress-info">
            <span className="question-counter">
              Question {currentQuestionIndex + 1} of {questions.length}
            </span>
            <span className="progress-percentage">
              {Math.round(progressPercentage)}%
            </span>
          </div>
          <ProgressBar progress={progressPercentage} />
        </div>
        <QuizTimer />
      </div>

      {/* Question Card */}
      <Card className="question-card">
        {/* Question Header */}
        <div className="question-header">
          <div className="question-number">Q{currentQuestionIndex + 1}</div>
          {currentQuestion.difficulty && (
            <span className={`difficulty-badge ${currentQuestion.difficulty}`}>
              {currentQuestion.difficulty}
            </span>
          )}
          {currentQuestion.category && (
            <span className="category-badge">
              {currentQuestion.category}
            </span>
          )}
          
          {/* Clear Answer Button - Shows only when answer is selected */}
          {selectedOption && (
            <button 
              className="clear-answer-button"
              onClick={handleClearAnswer}
              title="Clear selected answer"
            >
              <span className="clear-icon">×</span>
              <span className="clear-text">Clear Answer</span>
            </button>
          )}
        </div>

        {/* Question Text */}
        <h2 className="question-text">
          {currentQuestion.questionText}
        </h2>

        {/* Options */}
        <div className="options-container">
          {Object.entries(currentQuestion.options).map(([key, value]) => (
            <button
              key={key}
              className={`option-button ${selectedOption === key ? 'selected' : ''}`}
              onClick={() => handleOptionSelect(key)}
            >
              <div className="option-indicator">
                <span className="option-letter">{key}</span>
              </div>
              <span className="option-text">{value}</span>
              {selectedOption === key && (
                <div className="selected-check">✓</div>
              )}
            </button>
          ))}
        </div>

        {/* Answer Status */}
        {selectedOption ? (
          <div className="answer-status answered">
            <span className="status-icon">✓</span>
            <span className="status-text">Answer selected</span>
          </div>
        ) : (
          <div className="answer-status unanswered">
            <span className="status-icon">⚠️</span>
            <span className="status-text">No answer selected - You can skip this question</span>
          </div>
        )}
      </Card>

      {/* Navigation */}
      <QuizNavigation isLastQuestion={isLastQuestion} />
    </div>
  );
};

export default QuizQuestion;
