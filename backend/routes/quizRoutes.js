import express from 'express';
import {
  getQuizQuestions,
  submitQuizAnswers,
  getQuizStats,
  getLeaderboard,
  checkQuizHealth
} from '../controllers/quizController.js';
import { validateAnswers } from '../middleware/validator.js';

const router = express.Router();

/**
 * @route   GET /api/quiz/questions
 * @desc    Get all quiz questions (without correct answers)
 * @access  Public
 */
router.get('/questions', getQuizQuestions);

/**
 * @route   POST /api/quiz/submit
 * @desc    Submit quiz answers and get score with detailed results
 * @access  Public
 * @body    { answers: [{ questionId: 1, selectedOption: 'A' }], userName: 'John', timeTaken: 300 }
 */
router.post('/submit', validateAnswers, submitQuizAnswers);

/**
 * @route   GET /api/quiz/stats
 * @desc    Get quiz statistics and top scores
 * @access  Public
 */
router.get('/stats', getQuizStats);

/**
 * @route   GET /api/quiz/leaderboard
 * @desc    Get leaderboard (top scores)
 * @access  Public
 * @query   limit (optional) - number of results to return
 */
router.get('/leaderboard', getLeaderboard);

/**
 * @route   GET /api/quiz/health
 * @desc    Check if quiz system is ready
 * @access  Public
 */
router.get('/health', checkQuizHealth);

export default router;
