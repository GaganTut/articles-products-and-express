/*jshint esversion: 6*/
const pgp = require('pg-promise')();

const cn = {
  host: 'localhost',
  port: 5432,
  database: 'articles',
  user: 'charles',
};
module.exports = pgp(cn);