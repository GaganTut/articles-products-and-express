/*jshint esversion: 6*/
const Products = require('../../db/Products.js');

module.exports = (() => {
  const prodPost = (req, res) => {
    if (checkPostInput(req.body)) {
      req.body.id = createID();
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
    if (checkIdInput(req.body) && Products.editByID(req.path.slice(1), req.body)) {
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
      typeof reqBody.price === 'number' &&
      typeof reqBody.inventory === 'number') {
    return true;
  } else {
    return false;
  }
};

const createID = () => {
  return `id${parseInt(new Date() / 500)}`;
};

const checkIdInput = (reqBody) => {
  if (reqBody.hasOwnProperty('name') ||
      reqBody.hasOwnProperty('price') ||
      reqBody.hasOwnProperty('inventory')) {
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
