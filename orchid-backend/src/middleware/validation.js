const { body, validationResult } = require('express-validator');

// Validation middleware for different endpoints
const validationMiddleware = {
  // Property validation
  validateProperty: [
    body('title')
      .trim()
      .isLength({ min: 3, max: 100 })
      .withMessage('Title must be between 3 and 100 characters'),
    body('location')
      .trim()
      .isLength({ min: 10, max: 200 })
      .withMessage('Location must be between 10 and 200 characters'),
    body('price')
      .trim()
      .isLength({ min: 5, max: 50 })
      .withMessage('Price must be between 5 and 50 characters'),
    body('customInfo')
      .isArray({ min: 1, max: 10 })
      .withMessage('Custom info must be an array with 1-10 items'),
    body('type')
      .trim()
      .isIn(['Apartment', 'Villa', 'Plot', 'Commercial'])
      .withMessage('Type must be one of: Apartment, Villa, Plot, Commercial'),
    body('filterCategory')
      .trim()
      .isIn(['1BHK', '2BHK', '3BHK', '4BHK', '5BHK+'])
      .withMessage('Filter category must be one of: 1BHK, 2BHK, 3BHK, 4BHK, 5BHK+'),
    body('isActive')
      .isBoolean()
      .withMessage('isActive must be a boolean')
  ],

  // Job validation
  validateJob: [
    body('title')
      .trim()
      .isLength({ min: 5, max: 100 })
      .withMessage('Job title must be between 5 and 100 characters'),
    body('department')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Department must be between 2 and 50 characters'),
    body('location')
      .trim()
      .isLength({ min: 5, max: 100 })
      .withMessage('Location must be between 5 and 100 characters'),
    body('type')
      .trim()
      .isIn(['Full-time', 'Part-time', 'Contract', 'Internship'])
      .withMessage('Job type must be one of: Full-time, Part-time, Contract, Internship'),
    body('experience')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Experience must be between 2 and 50 characters'),
    body('salary')
      .trim()
      .isLength({ min: 5, max: 50 })
      .withMessage('Salary must be between 5 and 50 characters'),
    body('description')
      .trim()
      .isLength({ min: 20, max: 1000 })
      .withMessage('Description must be between 20 and 1000 characters'),
    body('requirements')
      .isArray({ min: 1, max: 20 })
      .withMessage('Requirements must be an array with 1-20 items'),
    body('isHiring')
      .isBoolean()
      .withMessage('isHiring must be a boolean')
  ],

  // Executive team validation
  validateExecutive: [
    body('name')
      .trim()
      .isLength({ min: 2, max: 50 })
      .withMessage('Name must be between 2 and 50 characters'),
    body('position')
      .trim()
      .isLength({ min: 5, max: 100 })
      .withMessage('Position must be between 5 and 100 characters'),
    body('bio')
      .trim()
      .isLength({ min: 20, max: 500 })
      .withMessage('Bio must be between 20 and 500 characters'),
    body('image')
      .optional()
      .trim()
      .isURL()
      .withMessage('Image must be a valid URL')
  ],

  // Login validation
  validateLogin: [
    body('username')
      .trim()
      .isLength({ min: 3, max: 50 })
      .withMessage('Username must be between 3 and 50 characters'),
    body('password')
      .isLength({ min: 6, max: 100 })
      .withMessage('Password must be between 6 and 100 characters')
  ],

  // Check for validation errors
  handleValidationErrors: (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        message: 'Validation failed',
        errors: errors.array().map(error => ({
          field: error.path,
          message: error.msg
        }))
      });
    }
    next();
  }
};

module.exports = validationMiddleware;
