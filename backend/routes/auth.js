const express = require('express');
const router = require('express').Router();
const passport = require('passport');

// Auth with Google
router.use('/google', passport.authenticate('google', {scope: ['profile'] }));

// Google auth callback
router.get('/google/callback', passport.authenticate('google', { failureRedirect: '/' }),
(req, res) => {
    res.redirect('/dashboard')
})


module.exports = router;
