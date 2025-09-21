const express = require('express');
const router = express.Router();

// Booking routes - TODO: Implement controllers
router.get('/', (req, res) => {
  res.json({ message: 'Bookings endpoint - TODO: Implement' });
});

router.post('/', (req, res) => {
  res.json({ message: 'Create booking endpoint - TODO: Implement' });
});

router.get('/:id', (req, res) => {
  res.json({ message: `Booking ${req.params.id} endpoint - TODO: Implement` });
});

module.exports = router;
