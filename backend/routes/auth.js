const router = require('express').Router();
const passport = require('passport');
const { generateToken } = require('../config/jwt');


// Auth with Google
router.get('/google', passport.authenticate('google', { 
    scope: ['profile', 'email'] 
}));

// Google auth callback
router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login' }),
    (req, res) => {

        const token = jwt.sign(
            { id: req.user._id },
            process.env.JWT_SECRET,
            { expiresIn: '1h'}
        );

        res.cookie('swagger-token', token, {
            httpOnly: false,
            secure: true,
            sameSite: "lax",
        });
        
        res.redirect('/dashboard');
    }
);

// Logout user
router.get('/logout', (req, res, next) => {
    res.clearCookie('jwt', { path: '/' });
        return res.redirect('/login');
    });

module.exports = router;
