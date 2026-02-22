const isEmployee = (req, res, next) => {
    if (!req.user) {
        return res.status(401).json({ success: false, message: 'Unauthorized - please log in '});
    }
    if (req.user.role !== 'employee') {
        return res.status(403).json({ success: false, message: 'Forbidden - employee access only' });
    }
    next();
}

module.exports = { isEmployee };