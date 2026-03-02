const jwt = require('jsonwebtoken');

const ensureAuth = (req, res, next) => {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer')) {
            return res.status(401).json({ message: 'Not authorized' });
        }

        try {
            const token = authHeader.split(' ')[1];
            const decoded = jwt.verify(token, process.env,JWT_SECRET);

            req.user = decoded;
            next();
        } catch (err) {
            return res.status(401).json({ message: 'Invalid token' });
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