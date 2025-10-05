// API Configuration
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

// Quiz Configuration
export const QUIZ_TIME_LIMIT = 600; // 10 minutes in seconds
export const PASSING_PERCENTAGE = 60;

// Animation durations
export const ANIMATION_DURATION = {
  fast: 200,
  normal: 300,
  slow: 500
};

// Quiz difficulty colors
export const DIFFICULTY_COLORS = {
  easy: '#10b981',
  medium: '#f59e0b',
  hard: '#ef4444'
};

// Result status
export const RESULT_STATUS = {
  excellent: { min: 90, color: '#10b981', label: '🎉 Excellent!' },
  good: { min: 70, color: '#3b82f6', label: '👏 Good Job!' },
  pass: { min: 60, color: '#f59e0b', label: '✅ Passed!' },
  fail: { min: 0, color: '#ef4444', label: '❌ Failed' }
};

// Local storage keys
export const STORAGE_KEYS = {
  userName: 'quiz_user_name',
  lastScore: 'quiz_last_score'
};
