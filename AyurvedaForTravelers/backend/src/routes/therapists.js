const express = require('express');
const router = express.Router();

// Therapist routes - TODO: Implement controllers
router.get('/', (req, res) => {
  res.json({ message: 'Therapists endpoint - TODO: Implement' });
});

router.get('/:id', (req, res) => {
  res.json({ message: `Therapist ${req.params.id} endpoint - TODO: Implement` });
});

module.exports = router;
