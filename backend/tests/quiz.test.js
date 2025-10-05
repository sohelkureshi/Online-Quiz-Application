import { describe, test, expect, beforeAll } from '@jest/globals';
import { calculateScore, formatTime, shuffleArray } from '../utils/Helpers.js';

/**
 * Test Suite for Quiz Scoring Logic
 */
describe('Quiz Scoring Logic', () => {
  
  // Sample test data
  const sampleQuestions = [
    {
      id: 1,
      questionText: 'What is 2 + 2?',
      options: { A: '3', B: '4', C: '5', D: '6' },
      correctOption: 'B'
    },
    {
      id: 2,
      questionText: 'What is the capital of France?',
      options: { A: 'London', B: 'Berlin', C: 'Paris', D: 'Madrid' },
      correctOption: 'C'
    },
    {
      id: 3,
      questionText: 'What is 10 / 2?',
      options: { A: '3', B: '4', C: '5', D: '6' },
      correctOption: 'C'
    }
  ];

  test('should calculate correct score for all correct answers', () => {
    const userAnswers = [
      { questionId: 1, selectedOption: 'B' },
      { questionId: 2, selectedOption: 'C' },
      { questionId: 3, selectedOption: 'C' }
    ];

    const result = calculateScore(userAnswers, sampleQuestions);

    expect(result.score).toBe(3);
    expect(result.totalQuestions).toBe(3);
    expect(result.percentage).toBe(100);
    expect(result.detailedResults).toHaveLength(3);
    expect(result.detailedResults[0].isCorrect).toBe(true);
  });

  test('should calculate correct score for partial correct answers', () => {
    const userAnswers = [
      { questionId: 1, selectedOption: 'B' }, // Correct
      { questionId: 2, selectedOption: 'A' }, // Wrong
      { questionId: 3, selectedOption: 'C' }  // Correct
    ];

    const result = calculateScore(userAnswers, sampleQuestions);

    expect(result.score).toBe(2);
    expect(result.totalQuestions).toBe(3);
    expect(result.percentage).toBe(66.67);
    expect(result.detailedResults[1].isCorrect).toBe(false);
  });

  test('should calculate score as 0 for all wrong answers', () => {
    const userAnswers = [
      { questionId: 1, selectedOption: 'A' },
      { questionId: 2, selectedOption: 'B' },
      { questionId: 3, selectedOption: 'D' }
    ];

    const result = calculateScore(userAnswers, sampleQuestions);

    expect(result.score).toBe(0);
    expect(result.totalQuestions).toBe(3);
    expect(result.percentage).toBe(0);
  });

  test('should handle empty user answers array', () => {
    const userAnswers = [];
    const result = calculateScore(userAnswers, sampleQuestions);

    expect(result.score).toBe(0);
    expect(result.totalQuestions).toBe(0);
    expect(result.percentage).toBe(0);
    expect(result.detailedResults).toHaveLength(0);
  });

  test('should include detailed results with correct structure', () => {
    const userAnswers = [
      { questionId: 1, selectedOption: 'B' }
    ];

    const result = calculateScore(userAnswers, sampleQuestions);
    const detailedResult = result.detailedResults[0];

    expect(detailedResult).toHaveProperty('questionId');
    expect(detailedResult).toHaveProperty('questionText');
    expect(detailedResult).toHaveProperty('userAnswer');
    expect(detailedResult).toHaveProperty('correctAnswer');
    expect(detailedResult).toHaveProperty('isCorrect');
    expect(detailedResult).toHaveProperty('options');
  });

  test('should calculate percentage correctly for different score combinations', () => {
    const testCases = [
      { correct: 5, total: 10, expected: 50 },
      { correct: 7, total: 10, expected: 70 },
      { correct: 3, total: 15, expected: 20 },
      { correct: 1, total: 3, expected: 33.33 }
    ];

    testCases.forEach(({ correct, total, expected }) => {
      const userAnswers = Array(total).fill(null).map((_, i) => ({
        questionId: i + 1,
        selectedOption: i < correct ? 'A' : 'B'
      }));

      const questions = Array(total).fill(null).map((_, i) => ({
        id: i + 1,
        questionText: `Question ${i + 1}`,
        options: { A: '1', B: '2', C: '3', D: '4' },
        correctOption: 'A'
      }));

      const result = calculateScore(userAnswers, questions);
      expect(result.percentage).toBe(expected);
    });
  });
});

/**
 * Test Suite for Helper Functions
 */
describe('Helper Functions', () => {
  
  describe('formatTime', () => {
    test('should format seconds to MM:SS correctly', () => {
      expect(formatTime(65)).toBe('01:05');
      expect(formatTime(120)).toBe('02:00');
      expect(formatTime(599)).toBe('09:59');
      expect(formatTime(3600)).toBe('60:00');
    });

    test('should handle edge cases', () => {
      expect(formatTime(0)).toBe('00:00');
      expect(formatTime(null)).toBe('00:00');
      expect(formatTime(undefined)).toBe('00:00');
      expect(formatTime(-10)).toBe('00:00');
    });
  });

  describe('shuffleArray', () => {
    test('should return array with same length', () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = shuffleArray(original);
      
      expect(shuffled).toHaveLength(original.length);
    });

    test('should contain all original elements', () => {
      const original = [1, 2, 3, 4, 5];
      const shuffled = shuffleArray(original);
      
      original.forEach(item => {
        expect(shuffled).toContain(item);
      });
    });

    test('should not mutate original array', () => {
      const original = [1, 2, 3, 4, 5];
      const originalCopy = [...original];
      shuffleArray(original);
      
      expect(original).toEqual(originalCopy);
    });
  });
});
