/*jshint esversion: 6*/
const express = require('express');
const Products = require('../db/Products.js');
const prodFuncs = require('./routeFunctionsModules/productFunctions.js');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    res.render('productViews/allProducts', {products: Products.getInventory()});
  }).put((req, res) => {
    prodFuncs.redirectPut(req, res);
  })
  .post((req, res) => {
    prodFuncs.prodPost(req, res);
  });

router.route('/new')
  .get((req, res) => {
    res.render('productViews/newProduct');
  });

router.get('/:id/edit', (req, res) => {
    res.render('productViews/editProduct', {id: req.params.id});
});

router.route('/:id')
  .get((req, res) => {
    res.render('productViews/singleProduct', Products.getByID(req.params.id));
  })
  .put((req,res) => {
    prodFuncs.prodPut(req, res);
  })
  .delete((req, res) => {
    prodFuncs.prodDelete(req, res);
  });

  module.exports = router;