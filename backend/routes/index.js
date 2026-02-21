const routes = require('express').Router();

//Login/Landing page
routes.get('/', (req, res) => {
    res.render('login')
})

//Dashboard page
routes.get('/dashboard', (req, res) => {
    res.render('dashboard')
})

routes.use('/books', require('./books')); 
routes.use('/users', require('./users')); 
routes.use('/', require('./swagger'));


module.exports = routes;
