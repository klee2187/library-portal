const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const morgan = require('morgan');
const expressHandlebars = require('express-handlebars');
const passport = require('passport');
const connectDB = require('./config/db');

// Load config
require('dotenv').config();

//Passport config
require('./config/passport')(passport);

// Register helpers for handlebars engine
const hbs = expressHandlebars.create({
  extname: '.hbs',
  helpers: {
    eq: (a, b) => a === b,
    ne: (a, b) => a !== b,
    lt: (a, b) => a < b,
    gt: (a, b) => a > b,
    lte: (a, b) => a <= b,
    gte: (a, b) => a >= b,
    and: (a, b) => a && b,
    or: (a, b) => a || b
  }
});

const routes = require('./routes');
const port = process.env.PORT || 8080;
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cookieParser = require('cookie-parser');
const app = express();

// Connect to MongoDB (Mongoose)
connectDB();

// 
app.set('trust proxy', 1);

// Static 
app.use(express.static(path.join(__dirname, 'public')));
app.use('/public', express.static(path.join(__dirname, '../frontend/public')));

// Middleware -- parse request bodies
app.use (express.json());
app.use(express.urlencoded({ extended: true }));

// Cookie parser
app.use(cookieParser());

// Logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Handlebars
app.engine('hbs', hbs.engine);

app.set('view engine', '.hbs');   
app.set('views', path.join(__dirname, '../frontend/views'));

//CORS
app.use(
  cors({
    origin:[ 
      'http://localhost',
      'https://library-portal-3dzg.onrender.com'
    ],
    credentials: true
  })
);

//Passport middleware
app.use(passport.initialize());

// Routes
// Auth FIRST (Google OAuth must not be overridden)
app.use('/auth', require('./routes/auth'));

// API routes
app.use('/', require('./routes/index'));
app.use('/profile', require('./routes/profile'));
app.use('/manage-books', require('./routes/manageBooks'));
// Swagger LAST
app.use('/', require('./routes/swagger'));

app.get('/', (req, res) => {
  res.send('Library Portal API is running')
});

app.listen(port, () => console.log(`Server running in ${process.env.NODE_ENV} on port ${port}`));

