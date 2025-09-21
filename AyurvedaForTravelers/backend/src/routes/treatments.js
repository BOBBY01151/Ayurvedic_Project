const express = require('express');
const router = express.Router();

// Treatment routes - TODO: Implement controllers
router.get('/', (req, res) => {
  res.json({ message: 'Treatments endpoint - TODO: Implement' });
});

router.get('/:id', (req, res) => {
  res.json({ message: `Treatment ${req.params.id} endpoint - TODO: Implement` });
});

module.exports = router;
