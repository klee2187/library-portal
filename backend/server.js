const path = require('path');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

const morgan = require('morgan');
const expressHandlebars = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const MongoDBStore = require('connect-mongodb-session')(session);
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
const swaggerDocument = require('./swagger.json')
const app = express();

// Connect to MongoDB (Mongoose)
connectDB();

// Static 
app.use('/public', express.static(path.join(__dirname, '../frontend/public')));

// Middleware -- parse request bodies
app.use (express.json());
app.use(express.urlencoded({ extended: true }));

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

// Express-session
app.set('trust proxy', 1);

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: { 
    secure: process.env.NODE_ENV === 'production',
    sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
    httpOnly: true,
    maxAge: 1000 * 60 * 60 * 24
  },
  store: new MongoDBStore({ 
    uri: process.env.MONGODB_URI,
    collection: 'sessions'
   })
}));

//Passport middleware
app.use(passport.initialize());
app.use(passport.session());

// Routes
app.use('/', routes);
app.use('/', require('./routes/index'));
app.use('/auth', require('./routes/auth'));
app.use('/profile', require('./routes/profile'));
app.use('/manage-books', require('./routes/manageBooks'));

// Swagger with credentials
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument, {
  swaggerOptions: {
    withCredentials: true
  }
}));

app.get('/', (req, res) => {
  res.send('Library Portal API is running')
});

app.listen(port, () => console.log(`Server running in ${process.env.NODE_ENV} on port ${port}`));

