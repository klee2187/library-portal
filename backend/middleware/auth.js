const ensureAuth = (req, res, next) => {
        if (req.isAuthenticated && req.isAuthenticated()) {
            return next()
        } else {
            res.redirect('/')
        }
    }
    
const ensureGuest = (req, res, next) => {
        if(req.isAuthenticated && req.isAuthenticated()) {
            res.redirect('/dashboard')
        } else {
            return next()
        }
    }

const isAuthenticated = (req, res, next) => {
    if (req.isAuthenticated && req.isAuthenticated()) {
        return next();
    }
    return res.status(401).json({ success: false, message: 'Unauthorized - please log in' });
}

module.exports = { isAuthenticated, ensureAuth, ensureGuest };