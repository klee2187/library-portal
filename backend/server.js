const path = require('path');
const express = require('express');
const dotenv = require('dotenv');

const morgan = require('morgan');
const { engine } = require('express-handlebars');
const passport = require('passport');
const session = require('express-session');
const connectDB = require('./config/db');

// Load config
require('dotenv').config({ path: './config/.env' });

//Passport config
require('./config/passport')(passport);


const routes = require('./routes');

const port = process.env.PORT || 8080;
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
app.engine('hbs', engine({
  defaultLayout: 'main',
  extname: '.hbs'
}));
app.set('view engine', 'hbs');   
app.set('views', path.join(__dirname, '../frontend/views'));


// Express-session
app.use(session({
  secret: 'super pig',
  resave: false,
  saveUninitialized: false
}))

//Passport middleware
app.use(passport.initialize())
app.use(passport.session())

//CORS
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })

// Routes
app.use('/', routes);
app.use('/', require('./routes/index'))
app.use('/auth', require('./routes/auth'))

app.get('/', (req, res) => {
  res.send('Library Portal API is running')
});

app.listen(port, () => console.log(`Server running in ${process.env.NODE_ENV} on port ${port}`));

