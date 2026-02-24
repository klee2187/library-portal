const express = require('express');
const router = express.Router();
const { ensureAuth } = require('../middleware/auth');

const readingListController = require('../controllers/readingList');
const ReadingList = require('../models/readingList');
const { isAuthenticated } = require('../middleware/auth');

// Authenticate user routes
router.get('/:userId/readingList', readingListController.getUserReadingList);
router.post('/:userId/readingList', isAuthenticated, readingListController.addBookToList);
router.delete('/:userId/readingList/:bookId', isAuthenticated, readingListController.removeBookFromList);

// Reading list button route
router.get('/add/:bookId', ensureAuth, async (req, res) => {
    require('../models/readingList');

    await readingListController.create({
        userId: req.user._id,
        bookId: req.params.bookId
    });

    await ReadingList.create({
        userId: req.user._id,
        bookId: req.params.bookId
    });

    res.redirect('/dashboard');
})

module.exports = router;