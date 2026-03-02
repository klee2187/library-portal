const { body, validationResult } = require('express-validator');
const validator = require('../helpers/validate');

// Validation error middleware
const validate = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(412).json({
      success: false,
      message: 'Validation failed',
      errors: errors.array().map(err => ({
        field:err.path,
        message: err.msg
      }))
    });
  }
  next();;
}

// User validation
const validateUser = [

  body('googleId')
    .trim()
    .notEmpty()
    .withMessage('Google ID is required')
    .isLength({ min: 5, max: 100 })
    .withMessage('Google ID must be between 5 and 100 characters'),

  body('displayName')
    .trim()
    .notEmpty()
    .withMessage('Display name is required')
    .isLength({ min:2, max: 100 })
    .withMessage('Display name must be between 2 and 100 characters'),
    

  body('firstName')
    .trim()
    .notEmpty()
    .withMessage('First name is required')
    .isString()
    .withMessage('First name must be a string')
    .isLength({ min: 2 })
    .withMessage('First name must be at least 2 characters')
    .matches(/^[a-zA-Z\s.'-]+$/)
    .withMessage('Author name can only contain letters, spaces, periods, apostrophes, and hyphens'),
  
  body('lastName')
    .trim()
    .notEmpty()
    .withMessage('Last name is required')
    .isString()
    .withMessage('Last name must be a string')
    .isLength({ min: 2 })
    .withMessage('Last name must be at least 2 characters')
    .matches(/^[a-zA-Z\s.'-]+$/)
    .withMessage('Author name can only contain letters, spaces, periods, apostrophes, and hyphens'),

  body('age')
    .notEmpty()
    .withMessage('Age is required')
    .isInt({ min: 0 })
    .withMessage('Age must be a positive integer')
    .toInt(),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Email must be valid')
    .normalizeEmail(),

  body('phoneNum')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required'),

  body('address')
    .trim()
    .notEmpty()
    .withMessage('Address is required'),

  body('date')
    .trim()
    .notEmpty()
    .withMessage('Date is required')
    .custom((value) => {

      const dateRegex = /^(0[1-9]|1[0-2])\/(0[1-9]|[12][0-9]|3[01])\/\d{4}$/;
      if (!dateRegex.test(value)) {
        throw new Error('Date must match this format: MM/DD/YYYY');
      }

      const [month, day, year] = value.split('/').map(Number);
      const date = new Date(year, month -1, day);

      if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDay() !== day
      ) {
        throw new Error('Date must be in this format: MM/DD/YYYY');
      }

      return true;
    }),

    validate,

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(412).json({
        success: false,
        message: 'Validation failed',
        data: errors.array()
      });
    }
    next();
  }
];

// Book validation
const validateBook = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 2, max: 150 })
    .withMessage('Title must be between 2 and 150 characters'),
  
  body('author')
    .trim()
    .notEmpty()
    .withMessage('Author is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Author name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s.'-]+$/)
    .withMessage('Author name can only contain letters, spaces, periods, apostrophes, and hyphens'),

  body('genre')
    .trim()
    .notEmpty()
    .withMessage('Genre is required'),

  body('year')
    .notEmpty()
    .withMessage('Year is required')
    .isInt({min: 0})
    .withMessage('Year must be a positive integer')
    .toInt(),

  body('publishedBy')
    .trim()
    .notEmpty()
    .withMessage('Publisher is required'),
  
  body('ageGroup')
    .trim()
    .notEmpty()
    .withMessage('Age grooup is required'),

  body('themes')
    .isArray({ min: 1 })
    .withMessage('Themes must be a non-empty array'),

  body('themes.*')
    .isString()
    .withMessage('Each theme must be a string'),

  body('setting')
    .trim()
    .notEmpty()
    .withMessage('Setting is required'),

  body('seriesInfo.series')
    .optional()
    .trim()
    .isString()
    .withMessage('Series name is required'),

  body('seriesInfo.bookNumber')
    .optional()
    .isInt({ min: 0 })
    .withMessage('Book number must be a positive integer')
    .toInt(),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(412).json ({
        success: false,
        message: 'Validation failed',
        data: errors.array()
      });
    }
    next();
  }
]

module.exports = { validate, validateUser, validateBook };