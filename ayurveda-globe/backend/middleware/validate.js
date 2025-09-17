const Joi = require('joi');
const { createError } = require('../utils/httpErrors');
const logger = require('../config/logger');

// Generic validation middleware
const validate = (schema, source = 'body') => {
  return (req, res, next) => {
    const data = req[source];
    
    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
      convert: true
    });
    
    if (error) {
      const errorMessage = error.details
        .map(detail => detail.message.replace(/"/g, ''))
        .join(', ');
      
      logger.warn('Validation error:', { error: errorMessage, data });
      return next(createError(400, `Validation error: ${errorMessage}`));
    }
    
    // Replace original data with validated and sanitized data
    req[source] = value;
    next();
  };
};

// Common validation schemas
const schemas = {
  // User registration validation
  userRegistration: Joi.object({
    name: Joi.string()
      .trim()
      .min(2)
      .max(100)
      .required()
      .messages({
        'string.min': 'Name must be at least 2 characters long',
        'string.max': 'Name cannot exceed 100 characters',
        'any.required': 'Name is required'
      }),
    
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .lowercase()
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
      }),
    
    password: Joi.string()
      .min(8)
      .max(128)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .required()
      .messages({
        'string.min': 'Password must be at least 8 characters long',
        'string.max': 'Password cannot exceed 128 characters',
        'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character',
        'any.required': 'Password is required'
      }),
    
    phone: Joi.string()
      .pattern(/^\+?[\d\s\-()]+$/)
      .optional()
      .messages({
        'string.pattern.base': 'Please provide a valid phone number'
      }),
    
    country: Joi.string()
      .trim()
      .max(100)
      .optional(),
    
    preferences: Joi.object({
      currency: Joi.string().valid('LKR', 'USD', 'EUR').default('USD'),
      language: Joi.string().valid('en', 'si', 'ta').default('en'),
      notifications: Joi.object({
        email: Joi.boolean().default(true),
        sms: Joi.boolean().default(false)
      }).default({})
    }).default({})
  }),

  // User login validation
  userLogin: Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .lowercase()
      .required()
      .messages({
        'string.email': 'Please provide a valid email address',
        'any.required': 'Email is required'
      }),
    
    password: Joi.string()
      .required()
      .messages({
        'any.required': 'Password is required'
      })
  }),

  // Booking creation validation
  bookingCreation: Joi.object({
    practitioner: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        'string.pattern.base': 'Invalid practitioner ID',
        'any.required': 'Practitioner is required'
      }),
    
    treatment: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        'string.pattern.base': 'Invalid treatment ID',
        'any.required': 'Treatment is required'
      }),
    
    clinic: Joi.string()
      .pattern(/^[0-9a-fA-F]{24}$/)
      .required()
      .messages({
        'string.pattern.base': 'Invalid clinic ID',
        'any.required': 'Clinic is required'
      }),
    
    dateTime: Joi.date()
      .iso()
      .min('now')
      .required()
      .messages({
        'date.min': 'Booking date must be in the future',
        'any.required': 'Booking date and time is required'
      }),
    
    customerInfo: Joi.object({
      name: Joi.string().trim().max(100).required(),
      email: Joi.string().email({ tlds: { allow: false } }).lowercase().required(),
      phone: Joi.string().pattern(/^\+?[\d\s\-()]+$/).required(),
      age: Joi.number().integer().min(1).max(150).optional(),
      gender: Joi.string().valid('male', 'female', 'other', 'prefer_not_to_say').optional(),
      emergencyContact: Joi.object({
        name: Joi.string().trim().max(100).optional(),
        phone: Joi.string().pattern(/^\+?[\d\s\-()]+$/).optional(),
        relationship: Joi.string().trim().max(50).optional()
      }).optional()
    }).required(),
    
    medicalInfo: Joi.object({
      conditions: Joi.array().items(Joi.string().trim().max(200)).default([]),
      medications: Joi.array().items(Joi.object({
        name: Joi.string().trim().max(100).required(),
        dosage: Joi.string().trim().max(50).optional(),
        frequency: Joi.string().trim().max(50).optional()
      })).default([]),
      allergies: Joi.array().items(Joi.string().trim().max(200)).default([]),
      specialRequirements: Joi.string().trim().max(500).optional()
    }).default({}),
    
    notes: Joi.object({
      customerNotes: Joi.string().trim().max(1000).optional()
    }).default({})
  }),

  // Query parameter validation
  queryParams: Joi.object({
    page: Joi.number().integer().min(1).default(1),
    limit: Joi.number().integer().min(1).max(100).default(10),
    sort: Joi.string().valid('createdAt', '-createdAt', 'name', '-name', 'price', '-price', 'rating', '-rating').default('-createdAt'),
    search: Joi.string().trim().max(100).optional(),
    category: Joi.string().trim().max(50).optional(),
    city: Joi.string().trim().max(50).optional(),
    minPrice: Joi.number().min(0).optional(),
    maxPrice: Joi.number().min(0).optional(),
    currency: Joi.string().valid('LKR', 'USD', 'EUR').default('LKR')
  }),

  // MongoDB ObjectId validation
  objectId: Joi.string()
    .pattern(/^[0-9a-fA-F]{24}$/)
    .required()
    .messages({
      'string.pattern.base': 'Invalid ID format',
      'any.required': 'ID is required'
    }),

  // Password reset validation
  passwordReset: Joi.object({
    email: Joi.string()
      .email({ tlds: { allow: false } })
      .lowercase()
      .required()
  }),

  // Password update validation
  passwordUpdate: Joi.object({
    currentPassword: Joi.string().required(),
    newPassword: Joi.string()
      .min(8)
      .max(128)
      .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]/)
      .required()
      .messages({
        'string.min': 'Password must be at least 8 characters long',
        'string.max': 'Password cannot exceed 128 characters',
        'string.pattern.base': 'Password must contain at least one lowercase letter, one uppercase letter, one number, and one special character'
      }),
    confirmPassword: Joi.string()
      .valid(Joi.ref('newPassword'))
      .required()
      .messages({
        'any.only': 'Password confirmation does not match'
      })
  })
};

// Validation middleware functions
const validateUserRegistration = validate(schemas.userRegistration);
const validateUserLogin = validate(schemas.userLogin);
const validateBookingCreation = validate(schemas.bookingCreation);
const validateQueryParams = validate(schemas.queryParams, 'query');
const validateObjectId = (paramName = 'id') => validate(schemas.objectId, 'params');
const validatePasswordReset = validate(schemas.passwordReset);
const validatePasswordUpdate = validate(schemas.passwordUpdate);

// Custom validation for file uploads
const validateFileUpload = (options = {}) => {
  const {
    maxSize = 5 * 1024 * 1024, // 5MB default
    allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
    required = false
  } = options;

  return (req, res, next) => {
    const files = req.files;
    
    if (!files && required) {
      return next(createError(400, 'File upload is required'));
    }
    
    if (!files) {
      return next();
    }
    
    // Validate each file
    for (const file of Object.values(files)) {
      if (file.size > maxSize) {
        return next(createError(400, `File size too large. Maximum size: ${maxSize / (1024 * 1024)}MB`));
      }
      
      if (!allowedTypes.includes(file.mimetype)) {
        return next(createError(400, `Invalid file type. Allowed types: ${allowedTypes.join(', ')}`));
      }
    }
    
    next();
  };
};

// Sanitize input to prevent XSS
const sanitizeInput = (req, res, next) => {
  const sanitize = (obj) => {
    if (typeof obj === 'string') {
      return obj.replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '');
    }
    
    if (typeof obj === 'object' && obj !== null) {
      for (const key in obj) {
        obj[key] = sanitize(obj[key]);
      }
    }
    
    return obj;
  };
  
  if (req.body) req.body = sanitize(req.body);
  if (req.query) req.query = sanitize(req.query);
  if (req.params) req.params = sanitize(req.params);
  
  next();
};

module.exports = {
  validate,
  schemas,
  validateUserRegistration,
  validateUserLogin,
  validateBookingCreation,
  validateQueryParams,
  validateObjectId,
  validatePasswordReset,
  validatePasswordUpdate,
  validateFileUpload,
  sanitizeInput
};
