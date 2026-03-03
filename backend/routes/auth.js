const router = require('express').Router();
const passport = require('passport');
const { generateToken } = require('../config/jwt');


// Auth with Google
router.get('/google', passport.authenticate('google', { 
    scope: ['profile', 'email'] 
}));

// Google auth callback
router.get('/google/callback', 
    passport.authenticate('google', { session: false, failureRedirect: '/login' }),
    (req, res) => {

        const token = generateToken(req.user);
        res.cookie('jwt', token, {
            httpOnly: true,
            secure: true,
            sameSite: "none",
            path: "/"
        });
        
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
