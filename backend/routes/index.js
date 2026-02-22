const router = require('express').Router();

// Login landing page
router.get('/', (req, res) => {
    res.render('login')
})

// Dashboard page
router.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

router.use('/books', require('./books')); 
router.use('/users', require('./users')); 
router.use('/readingList', require('./readingList'));
router.use('/', require('./swagger'));


module.exports = router;
