const router = require('express').Router();
const passport = require('passport');
const jwt = require('jsonwebtoken');

// Auth with Google
router.get('/google', passport.authenticate('google', { 
    scope: ['profile', 'email'] 
}));

// Google auth callback
router.get('/google/callback', 
    passport.authenticate ('google', { failureRedirect: '/login' }),
    async (req, res) => {
        try {
            console.log("User in callback:", req.user);
            console.log("JWT_SECRET exists:", !!process.env.JWT_SECRET);

            if(!req.user) {
                throw new Error('Paasport did not provide req.user');
            }

            const token = jwt.sign(
                { _id: req.user._id },
                process.env.JWT_SECRET,
                { expiresIn: '1h'}
            );

            res.cookie('swagger_token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === 'production',
                sameSite: process.env.NODE_ENV === 'production' ? "none" : "lax",
        });
        
        res.redirect('/dashboard');

        } catch (err) {
            console.error('Google OAuth callback error:', err);
            res.status(500).send('OAuth callback failed');
        }
    }
);

// Logout user
router.get('/logout', (req, res) => {
    res.clearCookie('swagger_token', { path: '/' });
    res.redirect('/login');
    });

module.exports = router;
