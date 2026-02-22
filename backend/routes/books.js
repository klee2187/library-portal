const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books.js');
const validation = require('../middleware/validate');
const { isAuthenticated } = require('../middleware/auth');
const { isEmployee } = require('../middleware/authorize');

// Public routes
router.get('/', booksController.getAll);
router.get('/:id', booksController.getSingle);

// Employee-only routes
router.post('/', isAuthenticated, isEmployee, validation.saveBook, booksController.addBook);
router.put('/:id', isAuthenticated, isEmployee, validation.saveBook, booksController.updateBook);
router.delete('/:id', isAuthenticated, isEmployee, booksController.deleteBook);

module.exports = router;