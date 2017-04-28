/*jshint esversion: 6*/
const express = require('express');
const Articles = require('../db/Articles.js');
const artFuncs = require('./routeFunctionsModules/articleFunctions.js');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    artFuncs.getAllArticles(req, res);
  })
  .post((req, res) => {
    artFuncs.artPost(req, res);
  });

router.route('/new')
  .get((req, res) => {
    res.render('ArticleViews/newArticle');
  });

router.get('/:title/edit', (req, res) => {
    artFuncs.editArtPage(req, res);
});

router.route('/:title')
  .get((req, res) => {
    artFuncs.getSingleArticle(req, res);
  })
  .put((req,res) => {
    artFuncs.artPut(req, res);
  })
  .delete((req, res) => {
    artFuncs.artDelete(req, res);
  });

  module.exports = router;