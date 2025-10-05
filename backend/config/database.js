import sqlite3 from 'sqlite3';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import fs from 'fs';

// Get current directory path (ES module equivalent of __dirname)
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Database path from environment or default
const DB_PATH = process.env.DB_PATH || join(__dirname, '../database/quiz.db');

// Ensure database directory exists
const dbDir = dirname(DB_PATH);
if (!fs.existsSync(dbDir)) {
  fs.mkdirSync(dbDir, { recursive: true });
}

// Create SQLite database connection with verbose mode for debugging
const db = new sqlite3.Database(DB_PATH, (err) => {
  if (err) {
    console.error('❌ Error connecting to database:', err.message);
  } else {
    console.log('✅ Connected to SQLite database');
  }
});

// Enable foreign keys
db.run('PRAGMA foreign_keys = ON');

/**
 * Initialize database tables
 */
export const initializeDatabase = () => {
  return new Promise((resolve, reject) => {
    // Create questions table
    const createQuestionsTable = `
      CREATE TABLE IF NOT EXISTS questions (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        question_text TEXT NOT NULL,
        option_a TEXT NOT NULL,
        option_b TEXT NOT NULL,
        option_c TEXT NOT NULL,
        option_d TEXT NOT NULL,
        correct_option TEXT NOT NULL CHECK(correct_option IN ('A', 'B', 'C', 'D')),
        difficulty TEXT DEFAULT 'medium' CHECK(difficulty IN ('easy', 'medium', 'hard')),
        category TEXT DEFAULT 'general',
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Create quiz_results table (optional - for storing user results)
    const createResultsTable = `
      CREATE TABLE IF NOT EXISTS quiz_results (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        user_name TEXT,
        score INTEGER NOT NULL,
        total_questions INTEGER NOT NULL,
        time_taken INTEGER,
        completed_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `;

    // Execute table creation
    db.serialize(() => {
      db.run(createQuestionsTable, (err) => {
        if (err) {
          reject(err);
        }
      });

      db.run(createResultsTable, (err) => {
        if (err) {
          reject(err);
        } else {
          console.log('✅ Database tables initialized');
          resolve();
        }
      });
    });
  });
};

/**
 * Promisify database operations for async/await usage
 */
export const dbAll = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.all(query, params, (err, rows) => {
      if (err) reject(err);
      else resolve(rows);
    });
  });
};

export const dbGet = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.get(query, params, (err, row) => {
      if (err) reject(err);
      else resolve(row);
    });
  });
};

export const dbRun = (query, params = []) => {
  return new Promise((resolve, reject) => {
    db.run(query, params, function(err) {
      if (err) reject(err);
      else resolve({ id: this.lastID, changes: this.changes });
    });
  });
};

export default db;
