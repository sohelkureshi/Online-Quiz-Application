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

  
}

export default QuizResult;
