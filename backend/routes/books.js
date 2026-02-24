const express = require('express');
const router = express.Router();

const booksController = require('../controllers/books.js');
const validation = require('../middleware/validate');
const { ensureAuth, isAuthenticated } = require('../middleware/auth');
const { isEmployee } = require('../middleware/authorize');

// Public routes
router.get('/', booksController.getAll);
router.get('/:id', booksController.getSingle);

// Employee-only routes
router.post('/', isAuthenticated, isEmployee, validation.saveBook, booksController.addBook);
router.put('/:id', isAuthenticated, isEmployee, validation.saveBook, booksController.updateBook);
router.delete('/:id', isAuthenticated, isEmployee, booksController.deleteBook);

// Single book      GET /
router.get('/:id', ensureAuth, async (req, res) => {
    try{
        const book = await Book.findById(req.params.id).lean();

        if (!book) {
            return res.status(404).send('Book not found');
        }

    res.render('bookDetails',{ book });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error')
    }
});

module.exports = router;