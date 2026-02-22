const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const morgan = require('morgan');
const passport = require('passport');
const connectDB = require('./config/db');

const routes = require('./routes');

const port = process.env.PORT || 8080;
const app = express();

// Connect to MongoDB (Mongoose)
connectDB();

app.use (express.json());
app.use(express.urlencoded({ extended: true }));

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })

// Routes
app.use('/', routes);

app.get('/', (req, res) => {
  res.send('Library Portal API is running')
});

app.listen(port, () => console.log(`Server running on port ${port}`));

