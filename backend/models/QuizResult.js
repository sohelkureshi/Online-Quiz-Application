import { dbAll, dbGet, dbRun } from '../config/database.js';

/**
 * QuizResult Model - handles storing and retrieving quiz results
 */
class QuizResult {
  
  /**
   * Save a quiz result
   */
  static async create(resultData) {
    try {
      const query = `
        INSERT INTO quiz_results (
          user_name,
          score,
          total_questions,
          time_taken
        ) VALUES (?, ?, ?, ?)
      `;
      
      const result = await dbRun(query, [
        resultData.userName || 'Anonymous',
        resultData.score,
        resultData.totalQuestions,
        resultData.timeTaken || null
      ]);

      return {
        id: result.id,
        ...resultData
      };
    } catch (error) {
      throw new Error(`Error saving quiz result: ${error.message}`);
    }
  }

  /**
   * Get all quiz results with pagination
   */
  static async getAll(limit = 10, offset = 0) {
    try {
      const query = `
        SELECT 
          id,
          user_name,
          score,
          total_questions,
          time_taken,
          completed_at
        FROM quiz_results
        ORDER BY completed_at DESC
        LIMIT ? OFFSET ?
      `;
      
      const results = await dbAll(query, [limit, offset]);
      
      return results.map(r => ({
        id: r.id,
        userName: r.user_name,
        score: r.score,
        totalQuestions: r.total_questions,
        percentage: ((r.score / r.total_questions) * 100).toFixed(2),
        timeTaken: r.time_taken,
        completedAt: r.completed_at
      }));
    } catch (error) {
      throw new Error(`Error fetching quiz results: ${error.message}`);
    }
  }

  /**
   * Get top scores (leaderboard)
   */
  static async getTopScores(limit = 10) {
    try {
      const query = `
        SELECT 
          user_name,
          score,
          total_questions,
          time_taken,
          completed_at
        FROM quiz_results
        ORDER BY score DESC, time_taken ASC
        LIMIT ?
      `;
      
      const results = await dbAll(query, [limit]);
      
      return results.map(r => ({
        userName: r.user_name,
        score: r.score,
        totalQuestions: r.total_questions,
        percentage: ((r.score / r.total_questions) * 100).toFixed(2),
        timeTaken: r.time_taken,
        completedAt: r.completed_at
      }));
    } catch (error) {
      throw new Error(`Error fetching top scores: ${error.message}`);
    }
  }

  /**
   * Get statistics
   */
  static async getStats() {
    try {
      const query = `
        SELECT 
          COUNT(*) as total_attempts,
          AVG(score) as avg_score,
          MAX(score) as highest_score,
          MIN(score) as lowest_score,
          AVG(time_taken) as avg_time
        FROM quiz_results
      `;
      
      const stats = await dbGet(query);
      
      return {
        totalAttempts: stats.total_attempts,
        averageScore: stats.avg_score ? parseFloat(stats.avg_score.toFixed(2)) : 0,
        highestScore: stats.highest_score || 0,
        lowestScore: stats.lowest_score || 0,
        averageTime: stats.avg_time ? parseInt(stats.avg_time) : 0
      };
    } catch (error) {
      throw new Error(`Error fetching statistics: ${error.message}`);
    }
  }
}

export default QuizResult;
