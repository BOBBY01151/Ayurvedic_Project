const express = require('express');
const { verifyToken, authorize } = require('../middleware/auth');
const { validateQueryParams, sanitizeInput } = require('../middleware/validate');
const { asyncHandler } = require('../middleware/errorHandler');

const router = express.Router();
router.use(sanitizeInput);

// TODO: Import practitioner controller
// const practitionerController = require('../controllers/practitionerController');

// Public routes
router.get('/', validateQueryParams, asyncHandler(async (req, res) => {
  // TODO: Implement get all practitioners
  res.json({ success: true, message: 'Get practitioners - TODO', data: [] });
}));

router.get('/:id', asyncHandler(async (req, res) => {
  // TODO: Implement get practitioner by ID
  res.json({ success: true, message: 'Get practitioner by ID - TODO', data: {} });
}));

// Protected routes
router.use(verifyToken);

router.post('/', authorize('admin'), asyncHandler(async (req, res) => {
  // TODO: Implement create practitioner
  res.json({ success: true, message: 'Create practitioner - TODO' });
}));

router.put('/:id', authorize('admin', 'practitioner'), asyncHandler(async (req, res) => {
  // TODO: Implement update practitioner
  res.json({ success: true, message: 'Update practitioner - TODO' });
}));

router.delete('/:id', authorize('admin'), asyncHandler(async (req, res) => {
  // TODO: Implement delete practitioner
  res.json({ success: true, message: 'Delete practitioner - TODO' });
}));

module.exports = router;
