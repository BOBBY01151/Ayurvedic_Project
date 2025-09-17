const User = require('../models/User');
const { generateToken } = require('../middleware/auth');
const { createError } = require('../utils/httpErrors');
const { asyncHandler } = require('../middleware/errorHandler');
const logger = require('../config/logger');

/**
 * @desc    Register a new user
 * @route   POST /api/v1/auth/register
 * @access  Public
 */
const register = asyncHandler(async (req, res, next) => {
  const { name, email, password, phone, country, preferences } = req.body;

  // Check if user already exists
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return next(createError(400, 'User already exists with this email', 'USER_EXISTS'));
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    phone,
    country,
    preferences
  });

  // Generate JWT token
  const token = generateToken(user._id);

  // Update last login
  await user.updateLastLogin();

  logger.info('User registered successfully:', { userId: user._id, email });

  res.status(201).json({
    success: true,
    message: 'User registered successfully',
    data: {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        preferences: user.preferences,
        isEmailVerified: user.isEmailVerified,
        profileCompletion: user.profileCompletion
      }
    }
  });
});

/**
 * @desc    Login user
 * @route   POST /api/v1/auth/login
 * @access  Public
 */
const login = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;

  // Find user and include password for comparison
  const user = await User.findOne({ email }).select('+password');

  if (!user) {
    return next(createError(401, 'Invalid email or password', 'INVALID_CREDENTIALS'));
  }

  // Check if user is active
  if (!user.isActive) {
    return next(createError(401, 'Account is deactivated. Please contact support.', 'ACCOUNT_DEACTIVATED'));
  }

  // Check password
  const isPasswordValid = await user.comparePassword(password);
  if (!isPasswordValid) {
    return next(createError(401, 'Invalid email or password', 'INVALID_CREDENTIALS'));
  }

  // Generate JWT token
  const token = generateToken(user._id);

  // Update last login
  await user.updateLastLogin();

  logger.info('User logged in successfully:', { userId: user._id, email });

  res.json({
    success: true,
    message: 'Login successful',
    data: {
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        preferences: user.preferences,
        isEmailVerified: user.isEmailVerified,
        profileCompletion: user.profileCompletion,
        lastLogin: user.lastLogin
      }
    }
  });
});

/**
 * @desc    Get current user profile
 * @route   GET /api/v1/auth/me
 * @access  Private
 */
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  res.json({
    success: true,
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        country: user.country,
        preferences: user.preferences,
        isEmailVerified: user.isEmailVerified,
        profileCompletion: user.profileCompletion,
        lastLogin: user.lastLogin,
        createdAt: user.createdAt
      }
    }
  });
});

/**
 * @desc    Update user profile
 * @route   PUT /api/v1/auth/profile
 * @access  Private
 */
const updateProfile = asyncHandler(async (req, res, next) => {
  const allowedFields = ['name', 'phone', 'country', 'preferences'];
  const updates = {};

  // Filter allowed fields
  allowedFields.forEach(field => {
    if (req.body[field] !== undefined) {
      updates[field] = req.body[field];
    }
  });

  if (Object.keys(updates).length === 0) {
    return next(createError(400, 'No valid fields provided for update', 'NO_UPDATES'));
  }

  const user = await User.findByIdAndUpdate(
    req.user._id,
    updates,
    { new: true, runValidators: true }
  );

  logger.info('User profile updated:', { userId: user._id, updates: Object.keys(updates) });

  res.json({
    success: true,
    message: 'Profile updated successfully',
    data: {
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
        phone: user.phone,
        country: user.country,
        preferences: user.preferences,
        profileCompletion: user.profileCompletion
      }
    }
  });
});

/**
 * @desc    Change password
 * @route   PUT /api/v1/auth/password
 * @access  Private
 */
const changePassword = asyncHandler(async (req, res, next) => {
  const { currentPassword, newPassword } = req.body;

  // Get user with password
  const user = await User.findById(req.user._id).select('+password');

  // Check current password
  const isCurrentPasswordValid = await user.comparePassword(currentPassword);
  if (!isCurrentPasswordValid) {
    return next(createError(400, 'Current password is incorrect', 'INVALID_CURRENT_PASSWORD'));
  }

  // Update password
  user.password = newPassword;
  await user.save();

  logger.info('Password changed successfully:', { userId: user._id });

  res.json({
    success: true,
    message: 'Password changed successfully'
  });
});

/**
 * @desc    Request password reset
 * @route   POST /api/v1/auth/forgot-password
 * @access  Public
 */
const forgotPassword = asyncHandler(async (req, res, next) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return next(createError(404, 'No user found with this email address', 'USER_NOT_FOUND'));
  }

  // TODO: Generate reset token and send email
  // For now, just log the request
  logger.info('Password reset requested:', { email, userId: user._id });

  res.json({
    success: true,
    message: 'Password reset instructions sent to your email'
  });
});

/**
 * @desc    Logout user (client-side token removal)
 * @route   POST /api/v1/auth/logout
 * @access  Private
 */
const logout = asyncHandler(async (req, res) => {
  logger.info('User logged out:', { userId: req.user._id });

  res.json({
    success: true,
    message: 'Logged out successfully'
  });
});

/**
 * @desc    Refresh token (placeholder)
 * @route   POST /api/v1/auth/refresh
 * @access  Private
 */
const refreshToken = asyncHandler(async (req, res) => {
  // Generate new token
  const token = generateToken(req.user._id);

  res.json({
    success: true,
    message: 'Token refreshed successfully',
    data: { token }
  });
});

module.exports = {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  logout,
  refreshToken
};
