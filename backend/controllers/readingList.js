const mongoose = require('mongoose');
const User = require('../models/user');
const Book = require('../models/book');

// Get user's reading list
const getUserReadingList = async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: 'Invalid user ID' });
        }

        const user = await User.findById(userId).populate('readingList');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found '});
        }

        res.status(200).json({ success: true, data: user.readingList });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Add book to list
const addBookToList = async (req, res) => {
    try {
        const userId = req.params.userId;
        const { bookId } = req.body;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: 'Invalid user ID' });
        }

        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).json({ success: false, message: 'Invalid book ID' });
        }

        // Check if book exists
        const book = await Book.findById(bookId);
        if (!book) {
            return res.status(404).json({ success: false, message: 'Book not found' });
        }

        // Add book to list if not already there
        const user = await User.findByIdAndUpdate(
            userId,
            { $addToSet: { readingList: bookId } },
            { new: true }
        ).populate('readingList');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
        }

        res.status(200).json({ success: true, message: 'Book added to reading list', data:user.readingList });;
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

// Remove book from list
const removeBookFromList = async (req, res) => {
    try {
        const userId = req.param.userId;
        const bookId = req.params.bookId;

        if (!mongoose.Types.ObjectId.isValid(userId)) {
            return res.status(400).json({ success: false, message: 'Invalid user ID' });
        }

        if (!mongoose.Types.ObjectId.isValid(bookId)) {
            return res.status(400).json({ success: false, message: 'Invalid book ID' });
        }

        const user = await User.findByIdAndUpdate(
            userId,
            { $pull: { readinList: bookId } },
            { new: true }
        ).populate('readingList');

        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' })
        }

        res.status(200).json({ success: true, message: 'Book successfully removed from reading list', data: user.readingList });
    } catch (err) {
        res.status(500).json({ success: false, message: err.message });
    }
};

module.exports = { getUserReadingList, addBookToList, removeBookFromList };