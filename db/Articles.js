/*jshint esversion: 6*/
const db = require('./connectionPort.js');

module.exports = (() => {
  const getList = () => {
    return db.any('SELECT * FROM articles');
  };

  const addArticle = (artInfo) => {
    return db.none('INSERT INTO articles(title, body, author) VALUES($1, $2, $3)',
      [artInfo.title, artInfo.body, artInfo.author]);
  };

  const getByTitle = (title) => {
    return db.one('SELECT * FROM articles WHERE title = $1', [title]);
  };

  const editByTitle = (title, newArtInfo) => {
    return db.none('UPDATE articles SET title = $1, body = $2, author = $3, updated_at = now() WHERE title = $4', [newArtInfo.title, newArtInfo.body, newArtInfo.author, title]);
  };

  const removeByTitle = (title) => {
    return db.none('DELETE FROM articles WHERE title = $1', [title]);
  };

  return {
    getList,
    addArticle,
    getByTitle,
    editByTitle,
    removeByTitle
  };
})();

