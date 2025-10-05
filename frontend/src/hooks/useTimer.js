import { useState, useEffect, useRef, useCallback } from 'react';

/**
 * Custom hook for quiz timer functionality
 */
const useTimer = (initialTime = 600, onTimeUp) => {
  const [timeRemaining, setTimeRemaining] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  // Start timer
  const start = useCallback(() => {
    setIsRunning(true);
    setIsPaused(false);
  }, []);

  // Pause timer
  const pause = useCallback(() => {
    setIsPaused(true);
  }, []);

  // Resume timer
  const resume = useCallback(() => {
    setIsPaused(false);
  }, []);

  // Stop timer
  const stop = useCallback(() => {
    setIsRunning(false);
    setIsPaused(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, []);

  // Reset timer
  const reset = useCallback(() => {
    setTimeRemaining(initialTime);
    setIsRunning(false);
    setIsPaused(false);
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }, [initialTime]);

  // Timer effect
  useEffect(() => {
    if (isRunning && !isPaused) {
      intervalRef.current = setInterval(() => {
        setTimeRemaining((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            if (onTimeUp) {
              onTimeUp();
            }
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning, isPaused, onTimeUp]);

  // Format time to MM:SS
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Calculate elapsed time
  const elapsedTime = initialTime - timeRemaining;

  return {
    timeRemaining,
    elapsedTime,
    isRunning,
    isPaused,
    formattedTime: formatTime(timeRemaining),
    start,
    pause,
    resume,
    stop,
    reset
  };
};

export default useTimer;
