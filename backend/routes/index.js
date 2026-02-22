const express = require('express');
const routes = require('express').Router();

routes.use('/books', require('./books')); 
routes.use('/users', require('./users')); 
routes.use('/', require('./swagger'));
routes.use('/', require('./auth'));


module.exports = routes;
