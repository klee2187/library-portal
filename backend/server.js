const express = require('express');
const mongodb = require('./db/connect');
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

  //handlebars
  .engine('.hbs', exphbs({defaultLayout: 'main', extname: '.hbs'}))
  .set('view engine', '.hbs')
  .use('/', routes);

  //Static folder
  app.use(express.static(Path.join(__dirname, 'public')));

app.get('/dashboard', (req, res) => {
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
