const express = require('express');
const { verifyToken, authorize } = require('../middleware/auth');
const { validateQueryParams, sanitizeInput } = require('../middleware/validate');
const { asyncHandler } = require('../middleware/errorHandler');

const router = express.Router();
router.use(sanitizeInput);

// Public routes
router.get('/', validateQueryParams, asyncHandler(async (req, res) => {
  // TODO: Implement get all treatments with filtering
  res.json({ success: true, message: 'Get treatments - TODO', data: [] });
}));

router.get('/:id', asyncHandler(async (req, res) => {
  // TODO: Implement get treatment by ID
  res.json({ success: true, message: 'Get treatment by ID - TODO', data: {} });
}));

// Protected routes
router.use(verifyToken);

router.post('/', authorize('admin'), asyncHandler(async (req, res) => {
  // TODO: Implement create treatment
  res.json({ success: true, message: 'Create treatment - TODO' });
}));

router.put('/:id', authorize('admin'), asyncHandler(async (req, res) => {
  // TODO: Implement update treatment
  res.json({ success: true, message: 'Update treatment - TODO' });
}));

module.exports = router;
