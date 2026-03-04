const jwt = require('jsonwebtoken');

const ensureAuth = (req, res, next) => {
  let token;

  // Swagger
  const authHeader = req.headers.authorization;
  if (authHeader?.startsWith('Bearer ')) {
    token = authHeader.split(' ')[1];
  }

  // Browser
  if (!token && req.cookies?.swagger_token) {
    token = req.cookies.swagger_token;
  }

  if (!token) {
    return res.redirect('/login');
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch {
    return res.redirect('/login');
  }
};

// Guest-only routes (login page)
const ensureGuest = (req, res, next) => {
  if (req.cookies?.swagger_token) {
    return res.redirect('/dashboard');
  }
  return next();
};

// API-only auth check
const isAuthenticated = (req, res, next) => {
  let token = null;

  // Swagger
  if (req.headers.authorization?.startsWith("Bearer ")) {
    token = req.headers.authorization.split(" ")[1];
  }

  // Browser API calls
  if (!token && req.cookies?.swagger_token) {
    token = req.cookies.swagger_token;
  }

  if (!token) {
    return res.status(401).json({ success: false, message: 'Unauthorized' });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    return next();
  } catch {
    return res.status(401).json({ success: false, message: 'Invalid token' });
  }
};

module.exports = { isAuthenticated, ensureAuth, ensureGuest };
