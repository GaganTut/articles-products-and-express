/*jshint esversion: 6*/
const express = require('express');
const articlesRoute = require('./routes/articles.js');
const productsRoute = require('./routes/products.js');
const analyticsLog = require('./customMiddleWare/analyticsTracker');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const app = express();
const PORT = 8888;

const hbs = exphbs.create({
  extname: '.hbs',
  defaultLayout: 'main'
});

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(methodOverride('_method'));
app.use('/', analyticsLog);

app.use(express.static('public'));
app.use('/articles', articlesRoute);
app.use('/products', productsRoute);
app.get('/',(req, res) => {
  res.render('home');
});


const server = app.listen(PORT);