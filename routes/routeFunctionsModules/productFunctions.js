/*jshint esversion: 6*/
const Products = require('../../db/Products.js');

module.exports = (() => {
  const prodPost = (req, res) => {
    if (checkPostInput(req.body)) {
      if (Products.addProduct(filterExtraProps(req.body))) {
        res.redirect('/products');
      } else {
        res.redirect('/products/new');
      }
    } else {
      res.redirect('/products/new');
    }
  };

  const prodPut = (req, res) => {
    if (Products.editByID(req.params.id, req.body)) {
      res.redirect(`/products${req.path}`);
    } else {
      res.redirect(`/products${req.path}/edit`);
    }
  };

  const prodDelete = (req, res) => {
    if (req.body.id === req.params.id && Products.removeByID(req.params.id)) {
      res.redirect('/products');
    } else {
      res.redirect(`/products/${req.params.id}`);
    }
  };

  return {
    prodPost,
    prodPut,
    prodDelete
  };
})();

const checkPostInput = (reqBody) => {
  if (reqBody.hasOwnProperty('name') &&
      reqBody.hasOwnProperty('price') &&
      reqBody.hasOwnProperty('inventory') &&
      !isNaN(Number(reqBody.price)) &&
      !isNaN(Number(reqBody.inventory))) {
    return true;
  } else {
    return false;
  }
};

const filterExtraProps = (reqBody) => {
  return {
    name: reqBody.name,
    price: reqBody.price,
    inventory: reqBody.inventory,
    id: reqBody.id
  };
};
