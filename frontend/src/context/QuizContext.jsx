import React, { createContext, useContext, useState, useCallback } from 'react';
import { fetchQuestions, submitAnswers, wakeUpServer } from '../services/api';
import { QUIZ_TIME_LIMIT } from '../utils/constants';

// Create Context
const QuizContext = createContext();

// Custom hook to use Quiz Context
export const useQuizContext = () => {
  const context = useContext(QuizContext);
  if (!context) {
    throw new Error('useQuizContext must be used within QuizProvider');
  }
  return context;
};

// Quiz Provider Component
export const QuizProvider = ({ children }) => {
  // State management for quiz flow
  const [quizState, setQuizState] = useState('start'); // start, quiz, results
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [userName, setUserName] = useState('');
  const [timeTaken, setTimeTaken] = useState(0);



  // Start the quiz - fetch questions from API
const startQuiz = useCallback(async (name) => {
  try {
    setLoading(true);
    setError(null);
    setUserName(name);
    
    // First, wake up the server if it's sleeping
    console.log('🔄 Checking server status...');
    await wakeUpServer();
    
    // Small delay to ensure server is fully ready
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Now fetch questions
    console.log('📥 Fetching questions...');
    const data = await fetchQuestions();
    
    setQuestions(data);
    setQuizState('quiz');
    setCurrentQuestionIndex(0);
    setUserAnswers({});
  } catch (err) {
    console.error('Error starting quiz:', err);
    setError(err.message || 'Failed to load questions. The server might be starting up. Please try again in a moment.');
  } finally {
    setLoading(false);
  }
}, []);

  // Answer current question
  const answerQuestion = useCallback((questionId, selectedOption) => {
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: selectedOption
    }));
  }, []);

  // Clear answer for current question (NEW)
  const clearAnswer = useCallback((questionId) => {
    setUserAnswers(prev => {
      const newAnswers = { ...prev };
      delete newAnswers[questionId];
      return newAnswers;
    });
  }, []);

  // Navigate to next question
  const nextQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuestionIndex, questions.length]);

  // Navigate to previous question
  const previousQuestion = useCallback(() => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    }
  }, [currentQuestionIndex]);

  // Skip to next question without answering (NEW)
  const skipQuestion = useCallback(() => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
    }
  }, [currentQuestionIndex, questions.length]);

  // Submit quiz and get results
  const submitQuiz = useCallback(async (timeRemaining) => {
    try {
      setLoading(true);
      setError(null);
      
      // Calculate elapsed time correctly
      const elapsedTime = QUIZ_TIME_LIMIT - (timeRemaining || 0);
      setTimeTaken(elapsedTime);

      // Format answers for API
      const formattedAnswers = Object.entries(userAnswers).map(([questionId, selectedOption]) => ({
        questionId: parseInt(questionId),
        selectedOption
      }));

      // Get all question IDs (to fetch correct answers from backend)
      const questionIds = questions.map(q => q.id);

      const resultData = await submitAnswers({
        answers: formattedAnswers,
        questionIds: questionIds,
        userName: userName || 'Anonymous',
        timeTaken: elapsedTime
      });

      setResults(resultData);
      setQuizState('results');
    } catch (err) {
      setError(err.message || 'Failed to submit quiz');
    } finally {
      setLoading(false);
    }
  }, [userAnswers, userName, questions]);

  // Restart quiz
  const restartQuiz = useCallback(() => {
    setQuizState('start');
    setQuestions([]);
    setCurrentQuestionIndex(0);
    setUserAnswers({});
    setResults(null);
    setUserName('');
    setTimeTaken(0);
    setError(null);
  }, []);

  // Get current question
  const currentQuestion = questions[currentQuestionIndex];

  // Check if current question is answered
  const isCurrentQuestionAnswered = currentQuestion 
    ? userAnswers[currentQuestion.id] !== undefined 
    : false;

  // Calculate progress percentage
  const progressPercentage = questions.length > 0 
    ? ((currentQuestionIndex + 1) / questions.length) * 100 
    : 0;

  const value = {
    // State
    quizState,
    questions,
    currentQuestionIndex,
    currentQuestion,
    userAnswers,
    results,
    loading,
    error,
    userName,
    timeTaken,
    isCurrentQuestionAnswered,
    progressPercentage,

    // Actions
    startQuiz,
    answerQuestion,
    clearAnswer,        // NEW
    nextQuestion,
    previousQuestion,
    skipQuestion,       // NEW
    submitQuiz,
    restartQuiz
  };

  return (
    <QuizContext.Provider value={value}>
      {children}
    </QuizContext.Provider>
  );
};
