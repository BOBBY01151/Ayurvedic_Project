const logger = require('../config/logger');

/**
 * Async handler wrapper to catch errors in async route handlers
 * @param {function} fn - Async function to wrap
 * @returns {function} Express middleware function
 */
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};

/**
 * Global error handler middleware
 * @param {Error} err - Error object
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next function
 */
const globalErrorHandler = (err, req, res, next) => {
  let error = { ...err };
  error.message = err.message;

  // Log error
  logger.error('Global Error Handler:', {
    message: err.message,
    stack: err.stack,
    url: req.originalUrl,
    method: req.method,
    ip: req.ip,
    userAgent: req.get('User-Agent')
  });

  // Mongoose bad ObjectId
  if (err.name === 'CastError') {
    const message = 'Resource not found';
    error = createError(404, message, 'RESOURCE_NOT_FOUND');
  }

  // Mongoose duplicate key
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    const message = `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
    error = createError(400, message, 'DUPLICATE_FIELD');
  }

  // Mongoose validation error
  if (err.name === 'ValidationError') {
    const message = Object.values(err.errors).map(val => val.message).join(', ');
    error = createError(400, message, 'VALIDATION_ERROR');
  }

  // JWT errors
  if (err.name === 'JsonWebTokenError') {
    const message = 'Invalid token';
    error = createError(401, message, 'INVALID_TOKEN');
  }

  if (err.name === 'TokenExpiredError') {
    const message = 'Token expired';
    error = createError(401, message, 'TOKEN_EXPIRED');
  }

  // Rate limit error
  if (err.status === 429) {
    const message = 'Too many requests, please try again later';
    error = createError(429, message, 'RATE_LIMIT_EXCEEDED');
  }

  res.status(error.statusCode || 500).json({
    success: false,
    error: {
      message: error.message || 'Server Error',
      statusCode: error.statusCode || 500,
      code: error.code || 'INTERNAL_ERROR',
      timestamp: new Date().toISOString(),
      path: req.originalUrl,
      method: req.method,
      ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
    }
  });
};

/**
 * Create custom error with status code and error code
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {string} code - Error code
 * @returns {Error} Custom error object
 */
const createError = (statusCode, message, code = 'CUSTOM_ERROR') => {
  const error = new Error(message);
  error.statusCode = statusCode;
  error.code = code;
  return error;
};

/**
 * 404 handler for undefined routes
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next function
 */
const notFound = (req, res, next) => {
  const error = createError(404, `Route ${req.originalUrl} not found`, 'ROUTE_NOT_FOUND');
  next(error);
};

/**
 * Validation error handler
 * @param {object} errors - Validation errors object
 * @returns {Error} Formatted validation error
 */
const validationError = (errors) => {
  const error = new Error('Validation failed');
  error.statusCode = 400;
  error.code = 'VALIDATION_ERROR';
  error.errors = errors;
  return error;
};

module.exports = {
  asyncHandler,
  globalErrorHandler,
  createError,
  notFound,
  validationError
};
