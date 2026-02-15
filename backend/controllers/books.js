const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  try {
    const db = mongodb.getDb();

    if (!db) {
      return res.status(500).json({ message: 'Database connection not established' });
    }
    const result = await db
    .collection('books')
    .find();

    const lists = await result.toArray();
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);

    if (!lists.length) {
      res.status(200).json(lists);
    } else {
      res.status(200).json({ message: 'No books found', data: [] });
    }

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getSingle = async (req, res) => {
  try {
    if(!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid book ID' });
    }
    const bookId = new ObjectId(req.params.id);
    const db = mongodb.getDb();
    const result = await db
      .collection('books')
      .find({ _id: bookId });

    result.toArray().then((lists) => {
      if (err) {
        return res.status(500).json({ message: err.message });
      }
      res.setHeader('Content-Type', 'application/json');
      res.status(200).json(lists[0]);
    });

    } catch (err) {
      res.status(500).json({ message: err.message });
    }
};

const addBook = async (req, res) => {
  try {
    const newBook = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      year: req.body.year,
      publishedBy: req.body.publishedBy,
      ageGroup: req.body.ageGroup,
      themes: req.body.themes,
      setting: req.body.setting,
      seriesInfo: {
        series: req.body.series,
        bookNumber: req.body.bookNumber
      }
    };

    const result = await mongodb
    .getDb()
    .collection('books')
    .insertOne(newBook);

    if(result.acknowledged) {
      res.status(201).json(result);
    } else {
    res.status(500).json({ message: 'Failed to add book' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const updateBook = async (req, res) => {
  try {
    if(!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid book ID' });
    }

    const bookId = new ObjectId(req.params.id);

    const updatedData = {
      title: req.body.title,
      author: req.body.author,
      genre: req.body.genre,
      year: req.body.year,
      publishedBy: req.body.publishedBy,
      ageGroup: req.body.ageGroup,
      themes: req.body.themes,
      setting: req.body.setting,
      seriesInfo: {
        series: req.body.series,
        bookNumber: req.body.bookNumber
      }
    }

    const result = await mongodb
      .getDb()
      .collection('books')
      .updateOne({ _id: bookId }, { $set: updatedData });

      if (result.modifiedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Book not found or no changes made' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const deleteBook = async (req, res) => {
  try {
    if(!ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ message: 'Invalid book ID' });
    }

    const bookId = new ObjectId(req.params.id);
    const result = await mongodb
    .getDb()
    .collection('books')
    .deleteOne({ _id: bookId });

    if (result.deletedCount > 0) {
      res.status(204).send();
    } else {
      res.status(404).json({ message: 'Book not found' });
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

module.exports = { getAll, getSingle, addBook, updateBook, deleteBook };
