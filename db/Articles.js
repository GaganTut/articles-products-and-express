/*jshint esversion: 6*/
const db = require('./connectionPort.js');

module.exports = (() => {
  const getList = () => {
    return db.any('SELECT * FROM articles');
  };

  const addArticle = (artInfo) => {
    return db.none('INSERT INTO articles(title, body, author) VALUES($1, $2, $3)',
      [prodInfo.title, prodInfo.body, prodInfo.author]);

    /*if(checkDuplicates(artInfo.title)) {
      Articles.push(artInfo);
      return true;
    } else {
      return false;
    }*/
  };
/*
  const checkDuplicates = (title) => {
    for (let i = 0; i < Articles.length; i++) {
      if (Articles[i].title === title) {
        return false;
      }
    }
    return true;
  };*/

  const getByTitle = (title) => {
    return db.any('SELECT * FROM articles WHERE title = $1', [title]);
    /*for (let i = 0; i < Articles.length; i++) {
      if(Articles[i].urlTitle === title) {
        return Articles[i];
      }
    }
    return {'notFound': true};*/
  };

  const editByTitle = (title, newArtInfo) => {
    return db.none('UPDATE products SET title = $1, body = $2, author = $3, updated_at = now() WHERE title = $4', [newProdInfo.title, newProdInfo.body, newProdInfo.author, title]);
    /*for (let i = 0; i < Articles.length; i++) {
      if(Articles[i].urlTitle === title) {
        if (newArtInfo.title !== undefined) {
          Articles[i].title = newArtInfo.title;
        }
        if (newArtInfo.body !== undefined) {
          Articles[i].body = newArtInfo.body;
        }
        if (newArtInfo.author !== undefined) {
          Articles[i].author = newArtInfo.author;
        }
        Articles[i].urlTitle = Articles[i].title.split(' ').join('-');

        return true;
      }
    }
    return false;*/
  };

  const removeByTitle = (title) => {
    return db.none('DELETE FROM products WHERE title = $1', [title]);
    /*for (let i = 0; i < Articles.length; i++) {
      if(Articles[i].urlTitle === title) {
        Articles.splice(Articles.indexOf(Articles[i], 1));
        return true;
      }
    }
    return false;*/
  };

  return {
    getList,
    addArticle,
    getByTitle,
    editByTitle,
    removeByTitle
  };
})();

