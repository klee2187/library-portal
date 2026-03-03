const router = require('express').Router();
const { ensureAuth } = require('../middleware/auth');
const User = require('../models/user');

// View profile
router.get('/', ensureAuth, (req, res) => {
    res.render('profile', { user: req.user });
});

// Edit profile
router.get('/edit', ensureAuth, (req, res) => {
    res.render('editProfile', { user: req.user });
});

//update profile
router.post('/edit', ensureAuth, async (req, res) => { 
    try { 
        const updatedUser = await User.findByIdAndUpdate(
            req.user._id, 
            { 
                firstName: req.body.firstName, 
                lastName: req.body.lastName, 
                email: req.body.email,
                phoneNum: req.body.phoneNum, 
                address: req.body.address, 
                age: req.body.age 
            },
            { new: true }
        ).lean();
        
        // Refresh session so profile shows updated data
        Object.assign(req.user, updatedUser);
        
        res.redirect('/profile'); 
    } 
    catch (err) { 
        console.error(err); 
        res.status(500).send('Server Error'); 
    } 
});

module.exports = router;
    