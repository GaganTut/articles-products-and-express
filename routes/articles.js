/*jshint esversion: 6*/
const express = require('express');
const artFuncs = require('./routeFunctionsModules/articleFunctions.js');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    console.log('here');
    res.send('Whatever');
  })
  .post((req, res) => {
    artFuncs.artPost(req, res);
  })
  .put((req,res) => {

  })
  .delete((req, res) => {

  });

router.route('/:title')
  .get((req, res) => {

  })
  .post((req, res) => {

  })
  .put((req,res) => {
    artFuncs.artPut(req, res);
  })
  .delete((req, res) => {
    artFuncs.artDelete(req, res);
  });

  module.exports = router;