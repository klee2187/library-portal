const router = require('express').Router();

const readingListController = require('../controllers/readingList');
const ReadingList = require('../models/readingList');
const { ensureAuth, isAuthenticated } = require('../middleware/auth');

// Authenticate user routes
router.get('/:userId/readingList', readingListController.getUserReadingList);
router.post('/:userId/readingList', isAuthenticated, readingListController.addBookToList);
router.delete('/:userId/readingList/:bookId', isAuthenticated, readingListController.removeBookFromList);

// ADD to reading list
router.get('/add/:bookId', ensureAuth, async (req, res) => {
    try {
        const exists = await ReadingList.findOne ({
            userId: req.user._id,
            bookId: req.params.bookId
        });
        if (exists) {
            return res.redirect('/dashboard'); //<-- If on list, redirects back
        }
        await ReadingList.create({
            userId: req.user._id,
            bookId: req.params.bookId
        });

        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

// DELETE from reading list
router.get('/delete/:bookId', ensureAuth, async (req, res) => {
    try {
        await ReadingList.findOneAndDelete({
            userId: req.user._id,
            bookId: req.params.bookId
        });

        res.redirect('/dashboard');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server Error');
    }
});

module.exports = router;