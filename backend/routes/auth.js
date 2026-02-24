const router = require('express').Router();
const passport = require('passport');


// Auth with Google
router.get('/google', passport.authenticate('google', { 
    scope: ['profile', 'email'] 
}));

// Google auth callback
router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {
        res.redirect('/dashboard');
    }
);

// Logout user
router.get('/logout', (req, res, next) => {
    req.logout(function(err) {
        if (err) { return next(err); }
        res.redirect('/login');
    });
});

module.exports = router;
