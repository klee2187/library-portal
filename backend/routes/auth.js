const express = require('express');
const routes = require('express').Router();
const passport = require('passport');

// Auth with Google
routes.use('/google', passport.authenticate('google', {scope: ['profile'] }));

// Google auth callback
routes.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
(req, res) => {
    res.redirect('/dashboard')
})


module.exports = routes;
