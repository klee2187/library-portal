const express = require('express');
const router = express.Router();

const usersController = require('../controllers/users.js');
const validation = require('../middleware/validate');

// Public routes
router.get('/', usersController.getAll);
router.get('/:id', usersController.getSingle);

// Validation routes
router.post('/', validation.validateUser, usersController.addUser);
router.put('/:id', validation.validateUser, usersController.updateUser);
router.delete('/:id', usersController.deleteUser);

module.exports = router;