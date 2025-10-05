import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 10 seconds timeout
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`📤 API Request: ${config.method.toUpperCase()} ${config.url}`);
    return config;
  },
  (error) => {
    console.error('❌ API Request Error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for error handling
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Response Error:', error);
    
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || error.response.data?.error?.message || 'Server error occurred';
      throw new Error(message);
    } else if (error.request) {
      // Request made but no response received
      throw new Error('Unable to connect to server. Please check your connection.');
    } else {
      // Something else happened
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
);

/**
 * Fetch all quiz questions
 */
export const fetchQuestions = async () => {
  try {
    const response = await api.get('/quiz/questions');
    return response.data.data; // Return questions array
  } catch (error) {
    throw error;
  }
};

/**
 * Submit quiz answers and get results
 */
export const submitAnswers = async (submissionData) => {
  try {
    const response = await api.post('/quiz/submit', submissionData);
    return response.data.data; // Return results object
  } catch (error) {
    throw error;
  }
};

/**
 * Get quiz statistics (optional)
 */
export const fetchQuizStats = async () => {
  try {
    const response = await api.get('/quiz/stats');
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

/**
 * Get leaderboard (optional)
 */
export const fetchLeaderboard = async (limit = 10) => {
  try {
    const response = await api.get(`/quiz/leaderboard?limit=${limit}`);
    return response.data.data;
  } catch (error) {
    throw error;
  }
};

export default api;
