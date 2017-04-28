/*jshint esversion: 6*/
const pgp = require('pg-promise')();
const cn = {
  host: 'localhost',
  port: 5432,
  database: 'articles',
  user: 'charles',
};
const db = pgp(cn);


module.exports = (() => {

  const getInventory = () => {
    return db.any('SELECT * FROM products', [true])
      .catch(function(error) {
          return false;
      });
  };

  const addProduct = (prodInfo) => {
    return db.none('INSERT INTO products(name, price, inventory) VALUES($1, $2, $3)',
      [prodInfo.name, prodInfo.price, prodInfo.inventory])
      .then(() => {
        return true;
      })
      .catch(error => {
        return false;
      });
  };

  const getByID = (id) => {
    return db.any(`SELECT * FROM products WHERE id = $1`, [id])
      .catch(function(error) {
          return false;
      });
  };

  const editByID = (id, newProdInfo) => {
    return db.none(`UPDATE products SET name = $1, price = $2, inventory = $3, updated_at = now() WHERE id = $4`, [newProdInfo.name, newProdInfo.price, newProdInfo.inventory, id])
    .catch(error => {
      console.log(error);
    });
  };

  const removeByID = (id) => {
    return db.none(`DELETE FROM products WHERE id = $1`, [id])
      .catch(error => {
        return false;
      });
  };

  return {
    getInventory,
    addProduct,
    getByID,
    editByID,
    removeByID
  };
})();

