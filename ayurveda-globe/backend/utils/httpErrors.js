/**
 * HTTP Error utility functions
 * Creates standardized error objects for consistent error handling
 */

class HttpError extends Error {
  constructor(statusCode, message, code = null) {
    super(message);
    this.statusCode = statusCode;
    this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
    this.isOperational = true;
    this.code = code;
    this.timestamp = new Date().toISOString();

    Error.captureStackTrace(this, this.constructor);
  }
}

/**
 * Create a new HTTP error
 * @param {number} statusCode - HTTP status code
 * @param {string} message - Error message
 * @param {string} code - Optional error code for client handling
 * @returns {HttpError} HTTP error object
 */
const createError = (statusCode, message, code = null) => {
  return new HttpError(statusCode, message, code);
};

/**
 * Predefined error creators for common HTTP errors
 */

// 400 Bad Request
const badRequest = (message = 'Bad Request', code = 'BAD_REQUEST') => {
  return createError(400, message, code);
};

// 401 Unauthorized
const unauthorized = (message = 'Unauthorized', code = 'UNAUTHORIZED') => {
  return createError(401, message, code);
};

// 403 Forbidden
const forbidden = (message = 'Forbidden', code = 'FORBIDDEN') => {
  return createError(403, message, code);
};

// 404 Not Found
const notFound = (message = 'Not Found', code = 'NOT_FOUND') => {
  return createError(404, message, code);
};

// 409 Conflict
const conflict = (message = 'Conflict', code = 'CONFLICT') => {
  return createError(409, message, code);
};

// 422 Unprocessable Entity
const unprocessableEntity = (message = 'Unprocessable Entity', code = 'UNPROCESSABLE_ENTITY') => {
  return createError(422, message, code);
};

// 429 Too Many Requests
const tooManyRequests = (message = 'Too Many Requests', code = 'TOO_MANY_REQUESTS') => {
  return createError(429, message, code);
};

// 500 Internal Server Error
const internalServerError = (message = 'Internal Server Error', code = 'INTERNAL_SERVER_ERROR') => {
  return createError(500, message, code);
};

// 502 Bad Gateway
const badGateway = (message = 'Bad Gateway', code = 'BAD_GATEWAY') => {
  return createError(502, message, code);
};

// 503 Service Unavailable
const serviceUnavailable = (message = 'Service Unavailable', code = 'SERVICE_UNAVAILABLE') => {
  return createError(503, message, code);
};

/**
 * Domain-specific error creators
 */

// Authentication errors
const invalidCredentials = () => {
  return unauthorized('Invalid email or password', 'INVALID_CREDENTIALS');
};

const tokenExpired = () => {
  return unauthorized('Token has expired', 'TOKEN_EXPIRED');
};

const tokenInvalid = () => {
  return unauthorized('Invalid token', 'TOKEN_INVALID');
};

// Authorization errors
const insufficientPermissions = (resource = 'resource') => {
  return forbidden(`Insufficient permissions to access ${resource}`, 'INSUFFICIENT_PERMISSIONS');
};

// Resource errors
const resourceNotFound = (resource = 'Resource') => {
  return notFound(`${resource} not found`, 'RESOURCE_NOT_FOUND');
};

const resourceAlreadyExists = (resource = 'Resource') => {
  return conflict(`${resource} already exists`, 'RESOURCE_EXISTS');
};

// Validation errors
const validationError = (message, details = null) => {
  const error = badRequest(message, 'VALIDATION_ERROR');
  if (details) {
    error.details = details;
  }
  return error;
};

// Business logic errors
const businessRuleViolation = (message, code = 'BUSINESS_RULE_VIOLATION') => {
  return unprocessableEntity(message, code);
};

// Payment errors
const paymentRequired = (message = 'Payment Required') => {
  return createError(402, message, 'PAYMENT_REQUIRED');
};

const paymentFailed = (message = 'Payment Failed') => {
  return badRequest(message, 'PAYMENT_FAILED');
};

// Booking specific errors
const bookingConflict = (message = 'Booking time slot is not available') => {
  return conflict(message, 'BOOKING_CONFLICT');
};

const bookingNotCancellable = (message = 'Booking cannot be cancelled') => {
  return badRequest(message, 'BOOKING_NOT_CANCELLABLE');
};

// Rate limiting
const rateLimitExceeded = (message = 'Rate limit exceeded', retryAfter = 900) => {
  const error = tooManyRequests(message, 'RATE_LIMIT_EXCEEDED');
  error.retryAfter = retryAfter;
  return error;
};

// File upload errors
const fileTooLarge = (maxSize = '5MB') => {
  return badRequest(`File size exceeds the maximum allowed size of ${maxSize}`, 'FILE_TOO_LARGE');
};

const invalidFileType = (allowedTypes = []) => {
  const message = allowedTypes.length > 0 
    ? `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`
    : 'Invalid file type';
  return badRequest(message, 'INVALID_FILE_TYPE');
};

// Database errors
const databaseError = (message = 'Database operation failed') => {
  return internalServerError(message, 'DATABASE_ERROR');
};

// External service errors
const externalServiceError = (service = 'External service', message = null) => {
  const errorMessage = message || `${service} is currently unavailable`;
  return serviceUnavailable(errorMessage, 'EXTERNAL_SERVICE_ERROR');
};

/**
 * Error response formatter
 * @param {Error} error - Error object
 * @param {Object} req - Express request object
 * @returns {Object} Formatted error response
 */
const formatErrorResponse = (error, req = null) => {
  const response = {
    success: false,
    error: {
      message: error.message,
      code: error.code || 'UNKNOWN_ERROR',
      statusCode: error.statusCode || 500,
      timestamp: error.timestamp || new Date().toISOString()
    }
  };

  // Add request context if available
  if (req) {
    response.error.path = req.originalUrl;
    response.error.method = req.method;
  }

  // Add additional details in development
  if (process.env.NODE_ENV === 'development') {
    response.error.stack = error.stack;
  }

  // Add validation details if available
  if (error.details) {
    response.error.details = error.details;
  }

  // Add retry information for rate limiting
  if (error.retryAfter) {
    response.error.retryAfter = error.retryAfter;
  }

  return response;
};

module.exports = {
  HttpError,
  createError,
  badRequest,
  unauthorized,
  forbidden,
  notFound,
  conflict,
  unprocessableEntity,
  tooManyRequests,
  internalServerError,
  badGateway,
  serviceUnavailable,
  invalidCredentials,
  tokenExpired,
  tokenInvalid,
  insufficientPermissions,
  resourceNotFound,
  resourceAlreadyExists,
  validationError,
  businessRuleViolation,
  paymentRequired,
  paymentFailed,
  bookingConflict,
  bookingNotCancellable,
  rateLimitExceeded,
  fileTooLarge,
  invalidFileType,
  databaseError,
  externalServiceError,
  formatErrorResponse
};
