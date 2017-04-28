/*jshint esversion: 6*/
const express = require('express');
const Products = require('../db/Products.js');
const prodFuncs = require('./routeFunctionsModules/productFunctions.js');
const router = express.Router();

router.route('/')
  .get((req, res) => {
    Products.getInventory()
      .then(prodArray => {
        res.render('productViews/allProducts', {products: prodArray});
      })
      .catch(error => {
        res.render('productViews/allProducts', {products: prodArray});
      });
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

router.route('/:id/edit')
  .get((req, res) => {
    Products.getByID(req.params.id)
      .then(data => {
        res.render('productViews/editProduct', data[0]);
      });
  });

router.route('/:id')
  .get((req, res) => {
    Products.getByID(req.params.id)
      .then(data => {
        res.render('productViews/singleProduct', data[0]);
      });
  })
  .put((req,res) => {
    prodFuncs.prodPut(req, res);
  })
  .delete((req, res) => {
    prodFuncs.prodDelete(req, res);
  });

  module.exports = router;