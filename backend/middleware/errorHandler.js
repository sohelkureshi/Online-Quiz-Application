
// Custom Error Class for operational errors
export class AppError extends Error {
  constructor(message, statusCode) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

//Global Error Handler Middleware
export const errorHandler = (err, req, res, next) => {
  let statusCode = err.statusCode || 500;
  let message = err.message || 'Internal Server Error';

  // Log error details for debugging
  console.error(' Error:', {
    message: err.message,
    stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    url: req.originalUrl,
    method: req.method
  });

  // Handle specific error types
  
  // SQLite constraint errors
  if (err.message.includes('SQLITE_CONSTRAINT')) {
    statusCode = 400;
    message = 'Database constraint violation';
  }

  // SQLite syntax errors
  if (err.message.includes('SQLITE_ERROR')) {
    statusCode = 500;
    message = 'Database query error';
  }

  // Validation errors
  if (err.name === 'ValidationError') {
    statusCode = 400;
    message = err.message;
  }

  // JSON parsing errors
  if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
    statusCode = 400;
    message = 'Invalid JSON in request body';
  }

  // Send error response
  res.status(statusCode).json({
    success: false,
    error: {
      message: message,
      statusCode: statusCode,
      // Include stack trace only in development
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
};


// Async error wrapper to avoid try-catch in every route
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
