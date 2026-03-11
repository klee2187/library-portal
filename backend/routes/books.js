const router = require('express').Router();
const Book = require('../models/book');
const ReadingList = require('../models/readingList');
const { ensureAuth } = require('../middleware/auth');

// Render book details page
router.get('/:id', ensureAuth, async (req, res) => {
    const book = await Book.findById(req.params.id).lean();
    const inList = await ReadingList.findOne({
        userId: req.user._id,
        bookId: req.params.id
    }).lean();

    res.render('bookDetails', { book, inList });
});



// Render book details page
router.get('/', async (req, res) => {
    const book = await Book.find().lean();

    res.send(book);
});

module.exports = router;