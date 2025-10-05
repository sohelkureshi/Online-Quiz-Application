import { jest } from '@jest/globals';

// Set test environment
process.env.NODE_ENV = 'test';
process.env.DB_PATH = ':memory:'; // Use in-memory database for tests

// Global test timeout
jest.setTimeout(10000);

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn(),
};
