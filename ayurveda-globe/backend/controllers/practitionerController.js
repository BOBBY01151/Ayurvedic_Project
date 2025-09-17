// TODO: Implement practitioner controller
// const Practitioner = require('../models/Practitioner');
// const { asyncHandler } = require('../middleware/errorHandler');
// const { createError } = require('../utils/httpErrors');

module.exports = {
  // TODO: Implement CRUD operations for practitioners
  getAllPractitioners: async (req, res, next) => {
    res.json({ message: 'Get all practitioners - TODO' });
  },
  getPractitionerById: async (req, res, next) => {
    res.json({ message: 'Get practitioner by ID - TODO' });
  },
  createPractitioner: async (req, res, next) => {
    res.json({ message: 'Create practitioner - TODO' });
  },
  updatePractitioner: async (req, res, next) => {
    res.json({ message: 'Update practitioner - TODO' });
  },
  deletePractitioner: async (req, res, next) => {
    res.json({ message: 'Delete practitioner - TODO' });
  }
};
