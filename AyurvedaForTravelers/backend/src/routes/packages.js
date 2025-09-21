const express = require('express');
const router = express.Router();

// Package routes - TODO: Implement controllers
router.get('/', (req, res) => {
  res.json({ message: 'Packages endpoint - TODO: Implement' });
});

router.get('/:id', (req, res) => {
  res.json({ message: `Package ${req.params.id} endpoint - TODO: Implement` });
});

module.exports = router;
