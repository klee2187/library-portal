const { ensureAuth, isAuthenticated } = require('../middleware/auth');

const ensureEmployee = async (req, res, next) => {
    if (req.isAuthenticated() && req.user.role === 'employee') {
        return next();
    }
    res.redirect('/dashboard');
};

module.exports = { ensureEmployee };