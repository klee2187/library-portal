const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users.js');
const validation = require('../middleware/validate');
const { ensureAuth } = require('../middleware/auth');
const { isEmployee } = require('../middleware/authorize');

// Logged-in user profile
router.get('/me', ensureAuth, (req, res) => {
  res.json(req.user);
});

// Authenticated routes
router.get('/', ensureAuth, usersController.getAll);
router.get('/:id', ensureAuth, usersController.getSingle);

// Employee-only routes
router.post('/', ensureAuth, isEmployee, validation.validateUser, usersController.addUser);
router.put('/:id', ensureAuth, isEmployee, validation.validateUser, usersController.updateUser);
router.delete('/:id', ensureAuth, isEmployee, usersController.deleteUser);

module.exports = router;
