import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 60000, // Increased to 60 seconds for cold starts
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

// Response interceptor for error handling with retry
api.interceptors.response.use(
  (response) => {
    console.log(`✅ API Response: ${response.status} ${response.config.url}`);
    return response;
  },
  async (error) => {
    console.error('❌ API Response Error:', error);
    
    const originalRequest = error.config;
    
    // Check if this is a timeout or network error (server waking up)
    const isServerWakingUp = 
      error.code === 'ECONNABORTED' || 
      error.code === 'ERR_NETWORK' ||
      !error.response;
    
    // Retry logic for cold starts (only retry once)
    if (isServerWakingUp && !originalRequest._retry) {
      originalRequest._retry = true;
      originalRequest.timeout = 60000; // Increase timeout for retry
      
      console.log('⏳ Server might be waking up, retrying...');
      
      // Wait 5 seconds before retry
      await new Promise(resolve => setTimeout(resolve, 5000));
      
      return api(originalRequest);
    }
    
    // Handle different error scenarios
    if (error.response) {
      // Server responded with error status
      const message = error.response.data?.message || 
                     error.response.data?.error?.message || 
                     'Server error occurred';
      throw new Error(message);
    } else if (error.request) {
      // Request made but no response received (likely cold start)
      throw new Error('Server is starting up. Please wait a moment and try again.');
    } else {
      // Something else happened
      throw new Error(error.message || 'An unexpected error occurred');
    }
  }
);

/**
 * Wake up the server (ping health endpoint)
 * Call this before making actual API requests after inactivity
 */
export const wakeUpServer = async () => {
  try {
    console.log('⏰ Waking up server...');
    const response = await axios.get(`${API_BASE_URL}/health`, {
      timeout: 60000 // 60 seconds timeout
    });
    console.log('✅ Server is awake');
    return response.data;
  } catch (error) {
    console.warn('⚠️ Server wake-up check failed, but continuing...', error.message);
    // Don't throw error, just log it
    return null;
  }
};

/**
 * Fetch all quiz questions with automatic wake-up
 */
export const fetchQuestions = async () => {
  try {
    const response = await api.get('/quiz/questions');
    return response.data.data;
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
    return response.data.data;
  } catch (error) {
    throw error;
  }
};





export default api;
