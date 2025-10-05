import { dbAll, dbGet, dbRun } from '../config/database.js';

/**
 * Question Model - handles all database operations for questions
 */
class Question {
  
  /**
   * Get random questions by difficulty (5 easy, 5 medium, 5 hard)
   * WITHOUT correct answers - for frontend display
   * @param {number} easyCount - Number of easy questions (default: 5)
   * @param {number} mediumCount - Number of medium questions (default: 5)
   * @param {number} hardCount - Number of hard questions (default: 5)
   * @returns {Promise<Array>} Array of questions without correct answers
   */
  static async getRandomQuestions(easyCount = 5, mediumCount = 5, hardCount = 5) {
    try {
      // Get random easy questions
      const easyQuery = `
        SELECT 
          id, 
          question_text, 
          option_a, 
          option_b, 
          option_c, 
          option_d,
          difficulty,
          category
        FROM questions
        WHERE difficulty = 'easy'
        ORDER BY RANDOM()
        LIMIT ?
      `;
      
      // Get random medium questions
      const mediumQuery = `
        SELECT 
          id, 
          question_text, 
          option_a, 
          option_b, 
          option_c, 
          option_d,
          difficulty,
          category
        FROM questions
        WHERE difficulty = 'medium'
        ORDER BY RANDOM()
        LIMIT ?
      `;
      
      // Get random hard questions
      const hardQuery = `
        SELECT 
          id, 
          question_text, 
          option_a, 
          option_b, 
          option_c, 
          option_d,
          difficulty,
          category
        FROM questions
        WHERE difficulty = 'hard'
        ORDER BY RANDOM()
        LIMIT ?
      `;

      const easyQuestions = await dbAll(easyQuery, [easyCount]);
      const mediumQuestions = await dbAll(mediumQuery, [mediumCount]);
      const hardQuestions = await dbAll(hardQuery, [hardCount]);

      // Combine all questions
      const allQuestions = [...easyQuestions, ...mediumQuestions, ...hardQuestions];

      // Format questions for frontend consumption
      return allQuestions.map(q => ({
        id: q.id,
        questionText: q.question_text,
        options: {
          A: q.option_a,
          B: q.option_b,
          C: q.option_c,
          D: q.option_d
        },
        difficulty: q.difficulty,
        category: q.category
      }));
    } catch (error) {
      throw new Error(`Error fetching random questions: ${error.message}`);
    }
  }

  /**
   * Get specific questions WITH correct answers (for scoring)
   * @param {Array<number>} questionIds - Array of question IDs
   * @returns {Promise<Array>} Array of questions with correct answers
   */
  static async getRandomQuestionsWithAnswers(questionIds) {
    try {
      if (!questionIds || questionIds.length === 0) {
        return [];
      }

      const placeholders = questionIds.map(() => '?').join(',');
      const query = `
        SELECT 
          id, 
          question_text, 
          option_a, 
          option_b, 
          option_c, 
          option_d,
          correct_option,
          difficulty,
          category
        FROM questions
        WHERE id IN (${placeholders})
        ORDER BY id ASC
      `;
      
      const questions = await dbAll(query, questionIds);
      
      return questions.map(q => ({
        id: q.id,
        questionText: q.question_text,
        options: {
          A: q.option_a,
          B: q.option_b,
          C: q.option_c,
          D: q.option_d
        },
        correctOption: q.correct_option,
        difficulty: q.difficulty,
        category: q.category
      }));
    } catch (error) {
      throw new Error(`Error fetching questions with answers: ${error.message}`);
    }
  }

  /**
   * Get all questions without correct answers (for frontend display)
   * DEPRECATED: Use getRandomQuestions() instead for better quiz experience
   */
  static async getAllForQuiz() {
    try {
      const query = `
        SELECT 
          id, 
          question_text, 
          option_a, 
          option_b, 
          option_c, 
          option_d,
          difficulty,
          category
        FROM questions
        ORDER BY id ASC
      `;
      
      const questions = await dbAll(query);
      
      // Format questions for frontend consumption
      return questions.map(q => ({
        id: q.id,
        questionText: q.question_text,
        options: {
          A: q.option_a,
          B: q.option_b,
          C: q.option_c,
          D: q.option_d
        },
        difficulty: q.difficulty,
        category: q.category
      }));
    } catch (error) {
      throw new Error(`Error fetching questions: ${error.message}`);
    }
  }

  /**
   * Get all questions with correct answers (for scoring)
   * DEPRECATED: Use getRandomQuestionsWithAnswers() instead
   */
  static async getAllWithAnswers() {
    try {
      const query = `
        SELECT 
          id, 
          question_text, 
          option_a, 
          option_b, 
          option_c, 
          option_d,
          correct_option,
          difficulty,
          category
        FROM questions
        ORDER BY id ASC
      `;
      
      const questions = await dbAll(query);
      
      return questions.map(q => ({
        id: q.id,
        questionText: q.question_text,
        options: {
          A: q.option_a,
          B: q.option_b,
          C: q.option_c,
          D: q.option_d
        },
        correctOption: q.correct_option,
        difficulty: q.difficulty,
        category: q.category
      }));
    } catch (error) {
      throw new Error(`Error fetching questions with answers: ${error.message}`);
    }
  }

  /**
   * Get a single question by ID
   * @param {number} id - Question ID
   * @returns {Promise<Object|null>} Question object or null if not found
   */
  static async getById(id) {
    try {
      const query = `
        SELECT * FROM questions WHERE id = ?
      `;
      
      const question = await dbGet(query, [id]);
      
      if (!question) {
        return null;
      }

      return {
        id: question.id,
        questionText: question.question_text,
        options: {
          A: question.option_a,
          B: question.option_b,
          C: question.option_c,
          D: question.option_d
        },
        correctOption: question.correct_option,
        difficulty: question.difficulty,
        category: question.category
      };
    } catch (error) {
      throw new Error(`Error fetching question by ID: ${error.message}`);
    }
  }

  /**
   * Create a new question
   * @param {Object} questionData - Question data object
   * @returns {Promise<Object>} Created question with ID
   */
  static async create(questionData) {
    try {
      const query = `
        INSERT INTO questions (
          question_text, 
          option_a, 
          option_b, 
          option_c, 
          option_d, 
          correct_option,
          difficulty,
          category
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;
      
      const result = await dbRun(query, [
        questionData.questionText,
        questionData.options.A,
        questionData.options.B,
        questionData.options.C,
        questionData.options.D,
        questionData.correctOption,
        questionData.difficulty || 'medium',
        questionData.category || 'general'
      ]);

      return { id: result.id, ...questionData };
    } catch (error) {
      throw new Error(`Error creating question: ${error.message}`);
    }
  }

  /**
   * Count total questions in database
   * @returns {Promise<number>} Total number of questions
   */
  static async count() {
    try {
      const query = 'SELECT COUNT(*) as count FROM questions';
      const result = await dbGet(query);
      return result.count;
    } catch (error) {
      throw new Error(`Error counting questions: ${error.message}`);
    }
  }

  /**
   * Count questions by difficulty
   * @returns {Promise<Object>} Object with counts for each difficulty level
   */
  static async countByDifficulty() {
    try {
      const query = `
        SELECT 
          difficulty,
          COUNT(*) as count
        FROM questions
        GROUP BY difficulty
      `;
      const results = await dbAll(query);
      
      const counts = {
        easy: 0,
        medium: 0,
        hard: 0
      };
      
      results.forEach(row => {
        counts[row.difficulty] = row.count;
      });
      
      return counts;
    } catch (error) {
      throw new Error(`Error counting questions by difficulty: ${error.message}`);
    }
  }

  /**
   * Delete all questions (useful for testing/seeding)
   * @returns {Promise<Object>} Success message
   */
  static async deleteAll() {
    try {
      const query = 'DELETE FROM questions';
      await dbRun(query);
      return { message: 'All questions deleted' };
    } catch (error) {
      throw new Error(`Error deleting questions: ${error.message}`);
    }
  }

  /**
   * Delete a single question by ID
   * @param {number} id - Question ID to delete
   * @returns {Promise<Object>} Success message
   */
  static async deleteById(id) {
    try {
      const query = 'DELETE FROM questions WHERE id = ?';
      const result = await dbRun(query, [id]);
      
      if (result.changes === 0) {
        throw new Error('Question not found');
      }
      
      return { message: 'Question deleted successfully' };
    } catch (error) {
      throw new Error(`Error deleting question: ${error.message}`);
    }
  }

  /**
   * Update a question by ID
   * @param {number} id - Question ID to update
   * @param {Object} questionData - Updated question data
   * @returns {Promise<Object>} Updated question
   */
  static async update(id, questionData) {
    try {
      const query = `
        UPDATE questions 
        SET 
          question_text = ?, 
          option_a = ?, 
          option_b = ?, 
          option_c = ?, 
          option_d = ?, 
          correct_option = ?,
          difficulty = ?,
          category = ?
        WHERE id = ?
      `;
      
      const result = await dbRun(query, [
        questionData.questionText,
        questionData.options.A,
        questionData.options.B,
        questionData.options.C,
        questionData.options.D,
        questionData.correctOption,
        questionData.difficulty || 'medium',
        questionData.category || 'general',
        id
      ]);

      if (result.changes === 0) {
        throw new Error('Question not found');
      }

      return { id, ...questionData };
    } catch (error) {
      throw new Error(`Error updating question: ${error.message}`);
    }
  }
}

export default Question;
