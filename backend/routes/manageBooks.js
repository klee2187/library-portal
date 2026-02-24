const router = require('express').Router();
const Book = require('../models/book');
const { ensureAuth } = require('../middleware/auth');
const { ensureEmployee } = require('../middleware/employee');

// Management page
router.get('/', ensureAuth, async (req, res) => {
    const books = await Book.find().lean();
    res.render('manageBooks', { books });
});

// Add new book
router.post('/add', ensureAuth, async (req, res) => {
    try {
        await Book.create({
            title: req.body.author,
            image: req.body.image,
            author: req.body.author,
            genre: req.body.genre,
            year: req.body.year,
            publishedBy: req.body.publishedBy,
            ageGroup: req.body.ageGroup,
            themes: Array.isArray(req.body.themes)
                ? req.body.themes
                : req.body.themes?.split(',').map(t => t.trim()),
            setting: req.body.setting,
            seriesInfo: {
                series: req.body.series,
                bookNumber: req.body.bookNumber
            }
        });

        res.redirect('/manageBooks');
    } catch (err) {
        console.error(err);
        res.status(500).send('Error, book not added');
    }
});

// Delete book
router.get('/delete/:id', ensureAuth, async (req, res) => {
    try {
        await Book.findByIdAndDelete(req.params.id);
        res.redirect('/manageBooks');

    } catch (err) {
        console.error(err);
        res.status(500).send('Error, book could not be deleted');
    }
});

module.exports = router;

