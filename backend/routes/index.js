const router = require('express').Router();

// Login/Landing page       GET /
router.get('/login', (req, res) => {
    res.render('login', {
        layout: 'login'
    })
})

// Dashboard page         GET /
router.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

router.use('/books', require('./books')); 
router.use('/users', require('./users')); 
router.use('/readingList', require('./readingList'));
router.use('/', require('./swagger'));


module.exports = router;
