const routes = require('express').Router();

const books = require('./books');
const users = require('./users');
const swagger = require('./swagger');

routes.use('/books', books);
routes.use('/users', users);
routes.use('/swagger', swagger);

module.exports = routes;
