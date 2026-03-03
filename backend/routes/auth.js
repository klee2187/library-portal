const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Auth with Google
router.get('/google', passport.authenticate('google', { 
    scope: ['profile', 'email'] 
}));

// Google auth callback
router.get('/google/callback', 
    passport.authenticate (
        'google', { 
        failureRedirect: '/login' 
        }
    ),
    (req, res) => {

        console.log("User in callback:", req.user);
        console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);

        const token = jwt.sign(
            { id: req.user.id },
            process.env.JWT_SECRET,
            { expiresIn: '1h'}
        );

        res.cookie('swagger_token', token, {
            httpOnly: false,
            secure: process.env.NODE_ENV === 'production',
            sameSite: "lax",
        });
        
        res.redirect('/dashboard');

    }
);

// Logout user
router.get('/logout', (req, res) => {
    res.clearCookie('swagger_token', { path: '/' });
    res.redirect('/login');
    });

module.exports = router;
