const logger = require('../config/logger');

/**
 * Global error handling middleware
 * This should be the last middleware in the application
 */
const errorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error details
  logger.error('Error Handler:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent'),
    user: req.user ? req.user._id : 'Anonymous'
  });

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Invalid ID format';
    error = { statusCode: 400, message };
  }

  // Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const value = err.keyValue[field];
    const message = `${field.charAt(0).toUpperCase() + field.slice(1)} '${value}' already exists`;
    error = { statusCode: 400, message };
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors)
      .map(val => val.message)
      .join(', ');
    error = { statusCode: 400, message };
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    error = { statusCode: 401, message: 'Invalid token' };
  }

  if (err.name === 'TokenExpiredError') {
    error = { statusCode: 401, message: 'Token expired' };
  }

  // Stripe errors
  if (err.type && err.type.startsWith('Stripe')) {
    logger.error('Stripe error:', err);
    error = { 
      statusCode: 400, 
      message: 'Payment processing error',
      code: 'PAYMENT_ERROR'
    };
  }

  // File upload errors
  if (err.code === 'LIMIT_FILE_SIZE') {
    error = { statusCode: 400, message: 'File size too large' };
  }

  if (err.code === 'LIMIT_UNEXPECTED_FILE') {
    error = { statusCode: 400, message: 'Unexpected file field' };
  }

  // Database connection errors
  if (err.name === 'MongoError' || err.name === 'MongooseError') {
    logger.error('Database error:', err);
    error = { 
      statusCode: 503, 
      message: 'Database connection error',
      code: 'DATABASE_ERROR'
    };
  }

  // Rate limiting errors
  if (err.statusCode === 429) {
    error = { 
      statusCode: 429, 
      message: 'Too many requests, please try again later',
      retryAfter: err.retryAfter || 900 // 15 minutes default
    };
  }

  // Default to 500 server error
  const statusCode = error.statusCode || 500;
  const message = error.message || 'Internal Server Error';

  // Prepare error response
  const errorResponse = {
    success: false,
    error: {
      message,
      statusCode,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      method: req.method
    }
  };

  // Add error code if available
  if (error.code) {
    errorResponse.error.code = error.code;
  }

  // Add retry after header for rate limiting
  if (error.retryAfter) {
    res.set('Retry-After', error.retryAfter);
    errorResponse.error.retryAfter = error.retryAfter;
  }

  // Include stack trace in development
  if (process.env.NODE_ENV === 'development') {
    errorResponse.error.stack = err.stack;
    errorResponse.error.details = error;
  }

  // Add request ID for tracking if available
  if (req.requestId) {
    errorResponse.error.requestId = req.requestId;
  }

  // Add validation errors if available
  if (err.details && Array.isArray(err.details)) {
    errorResponse.error.validationErrors = err.details;
  }

  // Set appropriate headers
  res.status(statusCode);

  // Handle different response types
  if (req.accepts('json')) {
    res.json(errorResponse);
  } else if (req.accepts('html')) {
    // For HTML requests, you might want to render an error page
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <title>Error ${statusCode}</title>
        <style>
          body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
          .error-container { max-width: 500px; margin: 0 auto; }
          .error-code { font-size: 72px; color: #e74c3c; margin-bottom: 20px; }
          .error-message { font-size: 24px; color: #333; margin-bottom: 20px; }
          .error-description { color: #666; }
        </style>
      </head>
      <body>
        <div class="error-container">
          <div class="error-code">${statusCode}</div>
          <div class="error-message">${message}</div>
          <div class="error-description">
            ${statusCode === 404 ? 'The page you are looking for does not exist.' : 'An error occurred while processing your request.'}
          </div>
        </div>
      </body>
      </html>
    `);
  } else {
    res.type('text').send(`Error ${statusCode}: ${message}`);
  }
};

/**
 * Async error wrapper to catch async function errors
 * Usage: router.get('/path', asyncHandler(async (req, res) => { ... }))
 */
const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};

/**
 * Development error handler with more detailed information
 */
const developmentErrorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  
  res.status(statusCode).json({
    success: false,
    error: {
      message: err.message,
      statusCode,
      stack: err.stack,
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      method: req.method,
      headers: req.headers,
      body: req.body,
      params: req.params,
      query: req.query,
      user: req.user ? { id: req.user._id, email: req.user.email } : null
    }
  });
};

module.exports = {
  errorHandler,
  asyncHandler,
  developmentErrorHandler
};
