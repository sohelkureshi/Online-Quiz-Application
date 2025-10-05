import React, { useEffect } from 'react';
import useTimer from '../../hooks/useTimer';
import { useQuizContext } from '../../context/QuizContext';
import { QUIZ_TIME_LIMIT } from '../../utils/constants';
import '../../styles/QuizTimer.css';

const QuizTimer = () => {
  const { submitQuiz } = useQuizContext();
  const { timeRemaining, formattedTime, start } = useTimer(
    QUIZ_TIME_LIMIT,
    () => submitQuiz(0) // Time up: 0 seconds remaining
  );

  // Start timer when component mounts
  useEffect(() => {
    start();
  }, [start]);

  // Calculate percentage for visual indicator
  const percentage = (timeRemaining / QUIZ_TIME_LIMIT) * 100;
  
  // Determine color based on time remaining
  let timerColor = '#10b981'; // green
  if (percentage < 20) {
    timerColor = '#ef4444'; // red
  } else if (percentage < 50) {
    timerColor = '#f59e0b'; // orange
  }

  return (
    <div className="quiz-timer">
      <div className="timer-container">
        <div className="timer-icon">⏱️</div>
        <div className="timer-display">
          <span className="timer-value" style={{ color: timerColor }}>
            {formattedTime}
          </span>
          <span className="timer-label">remaining</span>
        </div>
        <div 
          className="timer-bar" 
          style={{ 
            width: `${percentage}%`,
            backgroundColor: timerColor 
          }}
        />
      </div>
      {percentage < 20 && (
        <div className="timer-warning pulse">
          ⚠️ Time is running out!
        </div>
      )}
    </div>
  );
};

export default QuizTimer;
