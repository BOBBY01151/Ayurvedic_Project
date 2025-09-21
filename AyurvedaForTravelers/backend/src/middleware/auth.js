const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { createError } = require('../utils/httpErrors');
const logger = require('../config/logger');

/**
 * Generate JWT token
 * @param {string} userId - User ID
 * @returns {string} JWT token
 */
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRE || '7d',
  });
};

/**
 * Verify JWT token
 * @param {string} token - JWT token
 * @returns {object} Decoded token payload
 */
const verifyToken = (token) => {
  try {
    return jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw createError(401, 'Invalid token', 'INVALID_TOKEN');
  }
};

/**
 * Authentication middleware
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next function
 */
const authenticate = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check for token in cookies
    if (!token && req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (!token) {
      return next(createError(401, 'Access denied. No token provided.', 'NO_TOKEN'));
    }

    // Verify token
    const decoded = verifyToken(token);

    // Get user from database
    const user = await User.findById(decoded.userId);
    if (!user) {
      return next(createError(401, 'Token is valid but user no longer exists', 'USER_NOT_FOUND'));
    }

    // Check if user is active
    if (!user.isActive) {
      return next(createError(401, 'Account is deactivated', 'ACCOUNT_DEACTIVATED'));
    }

    // Add user to request object
    req.user = user;
    next();
  } catch (error) {
    logger.error('Authentication error:', error);
    next(createError(401, 'Access denied. Invalid token.', 'INVALID_TOKEN'));
  }
};

/**
 * Authorization middleware for specific roles
 * @param {string|array} roles - Allowed roles
 * @returns {function} Express middleware function
 */
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(createError(401, 'Access denied. Please authenticate first.', 'NO_AUTH'));
    }

    if (!roles.includes(req.user.role)) {
      return next(createError(403, `Access denied. Required role: ${roles.join(' or ')}`, 'INSUFFICIENT_PERMISSIONS'));
    }

    next();
  };
};

/**
 * Optional authentication middleware (doesn't fail if no token)
 * @param {object} req - Express request object
 * @param {object} res - Express response object
 * @param {function} next - Express next function
 */
const optionalAuth = async (req, res, next) => {
  try {
    let token;

    // Check for token in Authorization header
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
      token = req.headers.authorization.split(' ')[1];
    }

    // Check for token in cookies
    if (!token && req.cookies && req.cookies.token) {
      token = req.cookies.token;
    }

    if (token) {
      try {
        const decoded = verifyToken(token);
        const user = await User.findById(decoded.userId);
        
        if (user && user.isActive) {
          req.user = user;
        }
      } catch (error) {
        // Token is invalid, but we don't fail the request
        logger.warn('Invalid token in optional auth:', error.message);
      }
    }

    next();
  } catch (error) {
    logger.error('Optional authentication error:', error);
    next();
  }
};

/**
 * Check if user owns resource or is admin
 * @param {string} resourceUserId - User ID who owns the resource
 * @returns {function} Express middleware function
 */
const checkOwnershipOrAdmin = (resourceUserId) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(createError(401, 'Access denied. Please authenticate first.', 'NO_AUTH'));
    }

    // Admin can access any resource
    if (req.user.role === 'admin') {
      return next();
    }

    // Check if user owns the resource
    const resourceId = req.params[resourceUserId] || req.body[resourceUserId];
    if (resourceId && req.user._id.toString() === resourceId.toString()) {
      return next();
    }

    return next(createError(403, 'Access denied. You can only access your own resources.', 'OWNERSHIP_REQUIRED'));
  };
};

module.exports = {
  generateToken,
  verifyToken,
  authenticate,
  authorize,
  optionalAuth,
  checkOwnershipOrAdmin
};
