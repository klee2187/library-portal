const ensureEmployee = (req, res, next) => {
    if (req.user && req.user.role === 'employee') {
        return next();
    }
    return res.redirect('/dashboard');
};

module.exports = { ensureEmployee };
