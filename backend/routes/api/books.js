const router = require('express').Router();
const booksController = require('../../controllers/books');
const validation = require('../../middleware/validate');
const { ensureAuth, isAuthenticated } = require('../../middleware/auth');
const { isEmployee } = require('../../middleware/authorize');

// API: Get all books
router.get('/', ensureAuth, booksController.getAll);

// API: Get single book
router.get('/:id', ensureAuth, booksController.getSingle);

// API: Employee-only CRUD
router.post('/', isAuthenticated, isEmployee, validation.validateBook, booksController.addBook);
router.put('/:id', isAuthenticated, isEmployee, validation.validateBook, booksController.updateBook);
router.delete('/:id', isAuthenticated, isEmployee, booksController.deleteBook);

module.exports = router;
