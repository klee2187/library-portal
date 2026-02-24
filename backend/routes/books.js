const express = require('express');
const router = express.Router();

const Book = require('../models/book');
const ReadingList = require('../models/readingList');

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

        // Check if book is already on list
        const inList = await ReadingList.findOne({
            userId: req.user._id,
            bookId: req.params.id
        }).lean();

    res.render('bookDetails',{ book, inList });
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error')
    }
});

module.exports = router;