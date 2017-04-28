/*jshint esversion: 6*/
const express = require('express');
const Products = require('../db/Products.js');
const prodFuncs = require('./routeFunctionsModules/productFunctions.js');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    prodFuncs.getAllProd(req, res);
  })
  .post((req, res) => {
    prodFuncs.prodPost(req, res);
  });

router.route('/new')
  .get((req, res) => {
    res.render('productViews/newProduct');
  });

router.route('/:id/edit')
  .get((req, res) => {
    prodFuncs.editProdPage(req, res);
  });

router.route('/:id')
  .get((req, res) => {
    prodFuncs.getSingleProd(req, res);
  })
  .put((req,res) => {
    prodFuncs.prodPut(req, res);
  })
  .delete((req, res) => {
    prodFuncs.prodDelete(req, res);
  });

  module.exports = router;