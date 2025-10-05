import Question from '../models/Question.js';
import QuizResult from '../models/QuizResult.js';
import { calculateScore } from '../utils/Helpers.js';

//Get random 15 questions for the quiz (5 easy, 5 medium, 5 hard)
export const getQuizQuestions = async (req, res, next) => {
  try {
    // Get random questions by difficulty
    const questions = await Question.getRandomQuestions(5, 5, 5);
    
    if (questions.length === 0) {
      return res.status(404).json({
        success: false,
        message: 'No questions found. Please seed the database first.'
      });
    }

    res.status(200).json({
      success: true,
      count: questions.length,
      data: questions
    });
  } catch (error) {
    next(error);
  }
};

//Submit quiz answers and get score with detailed results
export const submitQuizAnswers = async (req, res, next) => {
  try {
    const { answers, userName, timeTaken, questionIds } = req.body;

    // Validation: Check if answers array exists
    if (!answers || !Array.isArray(answers)) {
      return res.status(400).json({
        success: false,
        message: 'Answers must be provided as an array'
      });
    }

    // Validation: Check if questionIds array exists
    if (!questionIds || !Array.isArray(questionIds) || questionIds.length === 0) {
      return res.status(400).json({
        success: false,
        message: 'Question IDs must be provided'
      });
    }

    // Get the specific questions that were shown to the user (WITH correct answers)
    const questionsWithAnswers = await Question.getRandomQuestionsWithAnswers(questionIds);

    // Calculate score using helper function (counts ALL questions)
    const result = calculateScore(answers, questionsWithAnswers);

    // Save result to database (optional)
    try {
      await QuizResult.create({
        userName: userName || 'Anonymous',
        score: result.score,
        totalQuestions: result.totalQuestions,
        timeTaken: timeTaken || null
      });
    } catch (dbError) {
      console.error('Error saving result:', dbError);
      // Continue even if saving fails
    }

    // Send response with detailed results
    res.status(200).json({
      success: true,
      data: {
        score: result.score,
        totalQuestions: result.totalQuestions,
        attemptedQuestions: result.attemptedQuestions,
        unattemptedQuestions: result.totalQuestions - result.attemptedQuestions,
        percentage: result.percentage,
        passed: result.percentage >= 60,
        detailedResults: result.detailedResults,
        timeTaken: timeTaken || null
      }
    });
  } catch (error) {
    next(error);
  }
};


// Get quiz statistics (optional endpoint)
export const getQuizStats = async (req, res, next) => {
  try {
    const stats = await QuizResult.getStats();
    const topScores = await QuizResult.getTopScores(5);

    res.status(200).json({
      success: true,
      data: {
        statistics: stats,
        topScores: topScores
      }
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Get leaderboard (optional endpoint)
 */
export const getLeaderboard = async (req, res, next) => {
  try {
    const limit = parseInt(req.query.limit) || 10;
    const leaderboard = await QuizResult.getTopScores(limit);

    res.status(200).json({
      success: true,
      count: leaderboard.length,
      data: leaderboard
    });
  } catch (error) {
    next(error);
  }
};

/**
 * Health check for quiz system
 */
export const checkQuizHealth = async (req, res, next) => {
  try {
    const questionCount = await Question.count();

    res.status(200).json({
      success: true,
      data: {
        questionsAvailable: questionCount,
        status: questionCount >= 60 ? 'ready' : 'needs_more_questions',
        message: questionCount >= 60 
          ? 'Quiz system ready' 
          : `Need ${60 - questionCount} more questions`
      }
    });
  } catch (error) {
    next(error);
  }
};
