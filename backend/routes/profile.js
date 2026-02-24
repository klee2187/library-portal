const router = require('express').Router();
const { ensureAuth } = require('../middleware/auth');
const User = require('../models/user');

// View profile
router.get('/', ensureAuth, (req, res) => {
    res.render('profile', { user: req.user.toObject() });
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
            { returnDocumant: 'after' }
        ).lean();
        
        // Refresh session so profile shows updated data
        req.user.firstName = updatedUser.firstName;
        req.user.lastName = updatedUser.lastName;
        req.user.email = updatedUser.email;
        req.user.phoneNum = updatedUser.phoneNum;
        req.user.address = updatedUser.address;
        req.user.age = updatedUser.age;
        
        res.redirect('/profile'); 
    } 
    catch (err) { 
        console.error(err); 
        res.status(500).send('Server Error'); 
    } 
});

module.exports = router;
    