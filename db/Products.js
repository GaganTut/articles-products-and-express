/*jshint esversion: 6*/

module.exports = (() => {
  const Products = [];

  const getInventory = () => {
    return Products;
  };

  const addProduct = (prodInfo) => {
    if(checkDuplicates(prodInfo.name)) {
      Products.push(prodInfo);
      return true;
    } else {
      return false;
    }
  };

  const checkDuplicates = (name) => {
    for (let i = 0; i < Products.length; i++) {
      if (Products[i].name === name) {
        return false;
      }
    }
    return true;
  };

  const getByID = (id) => {
    for (let i = 0; i < Products.length; i++) {
      if(Products[i].id === id) {
        return Products[i];
      }
    }
    return false;
  };

  const editByID = (id, newProdInfo) => {
    for (let i = 0; i < Products.length; i++) {
      if(Products[i].id === id) {
        if (newProdInfo.name !== undefined) {
          Products[i].name = newProdInfo.name;
        }
        if (newProdInfo.price !== undefined) {
          Products[i].price = newProdInfo.price;
        }
        if (newProdInfo.inventory !== undefined) {
          Products[i].inventory = newProdInfo.inventory;
        }

        return true;
      }
    }
    return false;
  };

  const removeByID = (id) => {
    for (let i = 0; i < Products.length; i++) {
      if(Products[i].id === id) {
        Products.splice(Products.indexOf(Products[i], 1));
        return true;
      }
    }
    return false;
  };

  return {
    getInventory,
    addProduct,
    getByID,
    editByID,
    removeByID
  };
})();

