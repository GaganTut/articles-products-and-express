/*jshint esversion: 6*/
const db = require('./connectionPort.js');

module.exports = (() => {

  const getInventory = () => {
    return db.any('SELECT * FROM products');
  };

  const addProduct = (prodInfo) => {
    return db.none('INSERT INTO products(name, price, inventory) VALUES($1, $2, $3)',
      [prodInfo.name, prodInfo.price, prodInfo.inventory]);
  };

  const getByID = (id) => {
    return db.any('SELECT * FROM products WHERE id = $1', [id]);
  };

  const editByID = (id, newProdInfo) => {
    return db.none('UPDATE products SET name = $1, price = $2, inventory = $3, updated_at = now() WHERE id = $4', [newProdInfo.name, newProdInfo.price, newProdInfo.inventory, id]);
  };

  const removeByID = (id) => {
    return db.none('DELETE FROM products WHERE id = $1', [id]);
  };

  return {
    getInventory,
    addProduct,
    getByID,
    editByID,
    removeByID
  };
})();

