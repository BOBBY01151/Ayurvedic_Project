const express = require('express');
const {
  register,
  login,
  getProfile,
  updateProfile,
  changePassword,
  forgotPassword,
  logout,
  refreshToken
} = require('../controllers/authController');
const { verifyToken } = require('../middleware/auth');
const {
  validateUserRegistration,
  validateUserLogin,
  validatePasswordReset,
  validatePasswordUpdate,
  sanitizeInput
} = require('../middleware/validate');

const router = express.Router();

// Apply input sanitization to all routes
router.use(sanitizeInput);

// Public routes
router.post('/register', validateUserRegistration, register);
router.post('/login', validateUserLogin, login);
router.post('/forgot-password', validatePasswordReset, forgotPassword);

// Protected routes
router.use(verifyToken); // Apply auth middleware to all routes below

router.get('/me', getProfile);
router.put('/profile', updateProfile);
router.put('/password', validatePasswordUpdate, changePassword);
router.post('/logout', logout);
router.post('/refresh', refreshToken);

module.exports = router;
