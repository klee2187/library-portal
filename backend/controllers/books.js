const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res) => {
  const result = await mongodb.getDb().collection('books').find();
  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res) => {
  const bookId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().collection('books').find({ _id: bookId });

  result.toArray().then((lists) => {
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const addBook = async (req, res) => {
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

  const result = await mongodb.getDb().collection('books').insertOne(newBook);
  res.status(201).json(result);
};

const updateBook = async (req, res) => {
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
  };

  const result = await mongodb
    .getDb()
    .collection('books')
    .updateOne({ _id: bookId }, { $set: updatedData });

  res.status(204).send();
};

const deleteBook = async (req, res) => {
  const bookId = new ObjectId(req.params.id);

  const result = await mongodb.getDb().collection('books').deleteOne({ _id: bookId });

  res.status(204).send();
};

module.exports = { getAll, getSingle, addBook, updateBook, deleteBook };
