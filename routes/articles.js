/*jshint esversion: 6*/
const express = require('express');
const Articles = require('../db/Articles.js');
const artFuncs = require('./routeFunctionsModules/articleFunctions.js');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.render('allArticles', {articles: Articles.getList()});
  })
  .post((req, res) => {
    artFuncs.artPost(req, res);
  });

router.route('/new')
  .get((req, res) => {
    res.render('newArticles.hbs');
  });

router.route('/:title')
  .get((req, res) => {
    res.render('singleArticle', Articles.getByTitle(req.path.slice(1)));
  })
  .put((req,res) => {
    artFuncs.artPut(req, res);
  })
  .delete((req, res) => {
    artFuncs.artDelete(req, res);
  });

  module.exports = router;