const router = require('express').Router();
const { ensureAuth, ensureGuest } = require('../middleware/auth');

const Book = require('../models/book')
const ReadingList = require('../models/readingList');

// Login/Landing page       GET /
router.get('/login', ensureGuest, (req, res) => {
    res.render('login', {
        layout: 'login'
    })
})

// Dashboard page         GET /
router.get('/dashboard', ensureAuth, async (req, res) => {
    try {
        const books = await Book.find().lean();

        const readingList = await ReadingList.find({ userId: req.user._id })
        .populate('bookId')
        .lean();

        res.render('dashboard', {
            name: req.user.firstName,
            books,
            readingList
        })
    } catch (err) {
        console.error(err)
        return res.status(500).send('Server Error');
    }
});

router.use('/books', require('./books')); 
router.use('/users', require('./users')); 
router.use('/readingList', require('./readingList'));
router.use('/', require('./swagger'));


module.exports = router;
