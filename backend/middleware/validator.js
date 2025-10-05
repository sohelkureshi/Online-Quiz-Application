
// Validation middleware for quiz answers submission
export const validateAnswers = (req, res, next) => {
  const { answers } = req.body;

  // Check if answers exist
  if (!answers) {
    return res.status(400).json({
      success: false,
      message: 'Answers are required'
    });
  }

  // Check if answers is an array
  if (!Array.isArray(answers)) {
    return res.status(400).json({
      success: false,
      message: 'Answers must be an array'
    });
  }

  // Check if answers array is not empty
  if (answers.length === 0) {
    return res.status(400).json({
      success: false,
      message: 'At least one answer must be provided'
    });
  }

  // Validate each answer object
  for (let i = 0; i < answers.length; i++) {
    const answer = answers[i];

    // Check if answer has required fields
    if (!answer.questionId || !answer.selectedOption) {
      return res.status(400).json({
        success: false,
        message: `Answer at index ${i} must have questionId and selectedOption`
      });
    }

    // Check if questionId is a number
    if (typeof answer.questionId !== 'number') {
      return res.status(400).json({
        success: false,
        message: `questionId at index ${i} must be a number`
      });
    }

    // Check if selectedOption is valid (A, B, C, or D)
    if (!['A', 'B', 'C', 'D'].includes(answer.selectedOption)) {
      return res.status(400).json({
        success: false,
        message: `selectedOption at index ${i} must be A, B, C, or D`
      });
    }
  }

  // Validation passed, proceed to next middleware
  next();
};


// Validate query parameters for pagination
export const validatePagination = (req, res, next) => {
  const { limit, offset } = req.query;

  // Validate limit
  if (limit && (isNaN(limit) || parseInt(limit) < 1)) {
    return res.status(400).json({
      success: false,
      message: 'Limit must be a positive number'
    });
  }

  // Validate offset
  if (offset && (isNaN(offset) || parseInt(offset) < 0)) {
    return res.status(400).json({
      success: false,
      message: 'Offset must be a non-negative number'
    });
  }

  next();
};
