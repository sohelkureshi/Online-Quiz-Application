/**
 * Format time in seconds to MM:SS
 */
export const formatTime = (seconds) => {
  if (!seconds || seconds < 0) return '00:00';
  
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

/**
 * Get result status based on percentage
 */
export const getResultStatus = (percentage) => {
  if (percentage >= 90) return 'excellent';
  if (percentage >= 70) return 'good';
  if (percentage >= 60) return 'pass';
  return 'fail';
};

/**
 * Calculate statistics from detailed results
 */
export const calculateStats = (detailedResults) => {
  const total = detailedResults.length;
  const correct = detailedResults.filter(r => r.isCorrect).length;
  const incorrect = total - correct;
  const accuracy = total > 0 ? ((correct / total) * 100).toFixed(1) : 0;

  return {
    total,
    correct,
    incorrect,
    accuracy
  };
};

/**
 * Save data to localStorage
 */
export const saveToLocalStorage = (key, value) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
};

/**
 * Get data from localStorage
 */
export const getFromLocalStorage = (key, defaultValue = null) => {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : defaultValue;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return defaultValue;
  }
};

/**
 * Shuffle array (for randomizing questions - optional feature)
 */
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

/**
 * Debounce function for performance optimization
 */
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};
