const { createError } = require('../utils/httpErrors');

/**
 * 404 Not Found middleware
 * This middleware is used to handle requests to undefined routes
 */
const notFound = (req, res, next) => {
  const error = createError(404, `Route ${req.originalUrl} not found`);
  
  // Add additional context for debugging
  error.method = req.method;
  error.url = req.originalUrl;
  error.timestamp = new Date().toISOString();
  
  next(error);
};

module.exports = notFound;
