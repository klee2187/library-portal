const router = require('express').Router();
const passport = require('passport');


// Auth with Google
router.get('/auth/google', passport.authenticate('google', { scope: ['profile', 'email'] })

);

// Google auth callback
router.get('/auth/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/dashboard');
    }
);

module.exports = router;
