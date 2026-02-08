console.log("SERVER STARTED");

const express = require('express');
const mongodb = require('./db/connect');

const booksRoutes = require('./routes/books');
const usersRoutes = require('./routes/users');
const routes = require('./routes');

const port = process.env.PORT || 8080;
const app = express();

app
  .use (express.json())
  .use(express.urlencoded({ extended: true }))
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/books', booksRoutes)
  .use('/users', usersRoutes)
  .use('/', routes);

app.get('/', (req, res) => {
  res.send('Library Portal API is running')
});

mongodb.initDb((err) => {
  if (err) {
    console.log(err);
  } else {
    app.listen(port);
    console.log(`Connected to DB and listening on ${port}`);
  }
});
