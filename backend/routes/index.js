const routes = require('express').Router();

const  books = require('./books');
const users = require('./users');

routes.use('/books', books);
routes.use('/users', users);

module.exports = routes;
