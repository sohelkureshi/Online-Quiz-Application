/**
 * Calculate quiz score based on user answers and correct answers
 * NOW: Count all questions, unattempted = wrong
 */
export const calculateScore = (userAnswers, allQuestions) => {
  let correctCount = 0;
  const detailedResults = [];

  // Create a map of question IDs to correct options for O(1) lookup
  const answerMap = new Map();
  allQuestions.forEach(question => {
    answerMap.set(question.id, {
      correctOption: question.correctOption,
      questionText: question.questionText,
      options: question.options,
      difficulty: question.difficulty,
      category: question.category
    });
  });

  // Create a map of user answers for quick lookup
  const userAnswerMap = new Map();
  userAnswers.forEach(answer => {
    userAnswerMap.set(answer.questionId, answer.selectedOption);
  });

  // Check EACH question (including unattempted ones)
  allQuestions.forEach(question => {
    const questionData = answerMap.get(question.id);
    const userAnswer = userAnswerMap.get(question.id);
    
    // Check if question was attempted
    const isAttempted = userAnswer !== undefined;
    const isCorrect = isAttempted && userAnswer === questionData.correctOption;
    
    if (isCorrect) {
      correctCount++;
    }

    // Build detailed result for this question
    detailedResults.push({
      questionId: question.id,
      questionText: questionData.questionText,
      userAnswer: userAnswer || null, // null if not attempted
      correctAnswer: questionData.correctOption,
      isCorrect: isCorrect,
      isAttempted: isAttempted,
      options: questionData.options,
      difficulty: questionData.difficulty,
      category: questionData.category
    });
  });

  const totalQuestions = allQuestions.length; // Always use total questions, not just attempted
  const percentage = totalQuestions > 0 
    ? parseFloat(((correctCount / totalQuestions) * 100).toFixed(2))
    : 0;

  return {
    score: correctCount,
    totalQuestions: totalQuestions,
    attemptedQuestions: userAnswers.length,
    percentage: percentage,
    detailedResults: detailedResults
  };
};

/**
 * Format time in seconds to MM:SS format
 */
export const formatTime = (seconds) => {
  if (!seconds || seconds < 0) return '00:00';
  
  const minutes = Math.floor(seconds / 60);
  const secs = seconds % 60;
  
  return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
};

/**
 * Generate a random quiz ID
 */
export const generateQuizId = () => {
  return `quiz_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

/**
 * Shuffle array using Fisher-Yates algorithm
 */
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};
