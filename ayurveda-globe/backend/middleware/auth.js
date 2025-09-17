const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { createError } = require('../utils/httpErrors');
const logger = require('../config/logger');

// Verify JWT token middleware
const verifyToken = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(createError(401, 'Access denied. No token provided or invalid format.'));
    }
    
    const token = authHeader.substring(7); // Remove 'Bearer ' prefix
    
    if (!token) {
      return next(createError(401, 'Access denied. No token provided.'));
    }
    
    // Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    
    // Get user from database
    const user = await User.findById(decoded.id).select('-password');
    
    if (!user) {
      return next(createError(401, 'Token is valid but user no longer exists.'));
    }
    
    if (!user.isActive) {
      return next(createError(401, 'User account is deactivated.'));
    }
    
    // Add user to request object
    req.user = user;
    next();
    
  } catch (error) {
    logger.error('Auth middleware error:', error);
    
    if (error.name === 'JsonWebTokenError') {
      return next(createError(401, 'Invalid token.'));
    }
    
    if (error.name === 'TokenExpiredError') {
      return next(createError(401, 'Token expired.'));
    }
    
    next(createError(500, 'Token verification failed.'));
  }
};

// Optional auth - doesn't fail if no token provided
const optionalAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return next(); // Continue without user
    }
    
    const token = authHeader.substring(7);
    
    if (!token) {
      return next(); // Continue without user
    }
    
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id).select('-password');
    
    if (user && user.isActive) {
      req.user = user;
    }
    
    next();
    
  } catch (error) {
    // Log error but continue without user
    logger.warn('Optional auth failed:', error.message);
    next();
  }
};

// Role-based authorization middleware
const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(createError(401, 'Authentication required.'));
    }
    
    if (!roles.includes(req.user.role)) {
      return next(createError(403, `Access denied. Required role: ${roles.join(' or ')}.`));
    }
    
    next();
  };
};

// Check if user owns resource or is admin
const authorizeOwnerOrAdmin = (userIdField = 'user') => {
  return (req, res, next) => {
    if (!req.user) {
      return next(createError(401, 'Authentication required.'));
    }
    
    // Admin can access everything
    if (req.user.role === 'admin') {
      return next();
    }
    
    // Check if user owns the resource
    const resourceUserId = req.body[userIdField] || req.params[userIdField] || req.query[userIdField];
    
    if (resourceUserId && resourceUserId.toString() === req.user._id.toString()) {
      return next();
    }
    
    return next(createError(403, 'Access denied. You can only access your own resources.'));
  };
};

// Practitioner authorization - user must be a practitioner or admin
const authorizePractitioner = async (req, res, next) => {
  try {
    if (!req.user) {
      return next(createError(401, 'Authentication required.'));
    }
    
    if (req.user.role === 'admin') {
      return next();
    }
    
    if (req.user.role !== 'practitioner') {
      return next(createError(403, 'Access denied. Practitioner access required.'));
    }
    
    // TODO: Verify practitioner is active and verified
    // const practitioner = await Practitioner.findOne({ user: req.user._id, isActive: true });
    // if (!practitioner) {
    //   return next(createError(403, 'Practitioner profile not found or inactive.'));
    // }
    
    next();
    
  } catch (error) {
    logger.error('Practitioner authorization error:', error);
    next(createError(500, 'Authorization check failed.'));
  }
};

// Rate limiting by user
const userRateLimit = (maxRequests = 100, windowMs = 15 * 60 * 1000) => {
  const requests = new Map();
  
  return (req, res, next) => {
    if (!req.user) {
      return next();
    }
    
    const userId = req.user._id.toString();
    const now = Date.now();
    const windowStart = now - windowMs;
    
    // Get or create user request history
    if (!requests.has(userId)) {
      requests.set(userId, []);
    }
    
    const userRequests = requests.get(userId);
    
    // Remove old requests outside the window
    while (userRequests.length > 0 && userRequests[0] < windowStart) {
      userRequests.shift();
    }
    
    // Check if user exceeded limit
    if (userRequests.length >= maxRequests) {
      return next(createError(429, 'Too many requests. Please try again later.'));
    }
    
    // Add current request
    userRequests.push(now);
    
    next();
  };
};

// Generate JWT token
const generateToken = (userId) => {
  return jwt.sign(
    { id: userId },
    process.env.JWT_SECRET,
    { 
      expiresIn: process.env.JWT_EXPIRES_IN || '7d',
      issuer: 'ayurveda-globe',
      audience: 'ayurveda-globe-users'
    }
  );
};

module.exports = {
  verifyToken,
  optionalAuth,
  authorize,
  authorizeOwnerOrAdmin,
  authorizePractitioner,
  userRateLimit,
  generateToken
};
