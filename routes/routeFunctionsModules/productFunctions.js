/*jshint esversion: 6*/
const Products = require('../../db/Products.js');

module.exports = (() => {
  const getAllProd = (req, res) => {
    Products.getInventory()
      .then(prodArray => {
        res.render('productViews/allProducts', {products: prodArray});
      })
      .catch(error => {
        res.render('productViews/allProducts', {products: prodArray});
      });
  };

  const getSingleProd = (req, res) => {
    Products.getByID(req.params.id)
      .then(data => {
        res.render('productViews/singleProduct', data[0]);
      })
      .catch(() => {
        res.redirect('/products');
      });
  };

  const prodPost = (req, res) => {
    Products.addProduct(req.body)
      .then(() => {
        res.redirect('/products');
      })
      .catch(error => {
        res.redirect('/products/new');
      });
  };

  const prodPut = (req, res) => {
    Products.editByID(req.params.id, req.body)
      .then(() => {
        res.redirect(`/products${req.path}`);
      })
      .catch(error => {
        res.redirect(`/products${req.path}/edit`);
      });
  };

  const prodDelete = (req, res) => {
    if (req.body.id === req.params.id) {
      Products.removeByID(req.params.id)
        .then(() => {
          res.redirect('/products');
        })
        .catch(() => {
          res.redirect(`/products/${req.params.id}`);
        });
    } else {
      res.redirect(`/products/${req.params.id}`);
    }
  };

  const editProdPage = (req, res) => {
    Products.getByID(req.params.id)
      .then(data => {
        res.render('productViews/editProduct', data[0]);
      })
      .catch(() => {
        res.render('/products');
      });
  };

  return {
    prodPost,
    prodPut,
    prodDelete,
    getAllProd,
    getSingleProd,
    editProdPage
  };
})();