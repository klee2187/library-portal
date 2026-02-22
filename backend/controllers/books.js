const book = require('../models/book');

// GET ALL
const getAll = async (req, res) => {
  try {
    const books = await Book.find();
    res.status(200).json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// GET SINGLE
const getSingle = async (req, res) => {
  try {
    const book = await book.findById(req.params.id);

    if (!book) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ADD
const addBook = async (req, res) => {
  try {
    const book = await book.create(req.body);
    res.status(201).json(book);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// UPDATE
const updateBook = async (req, res) => {
  try {
    const updated = await book.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    if (!updated) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE
const deleteBook = async (req, res) => {
  try {
    const deleted = await book.findByIdAndDelete(req.params.id);

    if (!deleted) {
      return res.status(404).json({ message: 'Book not found' });
    }

    res.status(204).send();
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle, addBook, updateBook, deleteBook };
