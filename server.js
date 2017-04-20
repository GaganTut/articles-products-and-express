/*jshint esversion: 6*/
const express = require('express');
const articlesRoute = require('./routes/articles.js');
const bodyParser = require('body-parser');
const app = express();
const PORT = 8888;

app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: true}));
app.use('/articles', articlesRoute);


const server = app.listen(PORT);