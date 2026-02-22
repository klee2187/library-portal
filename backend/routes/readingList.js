const express = require('express');
const router = express.Router();

const readingListController = require('../controllers/readingList');
const { isAuthenticated } = require('../middleware/auth');

// Authenticate user routes
router.get('/:userId/readingList', readingListController.getUserReadingList);
router.post('/:userId/readingList', isAuthenticated, readingListController.addBookToList);
router.delete('/:userId/readingList/:bookId', isAuthenticated, readingListController.removeBookFromList);

module.exports = router;