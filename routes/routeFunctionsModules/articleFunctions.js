/*jshint esversion: 6*/
const Articles = require('../../db/Articles.js');

module.exports = (() => {
  const getAllArticles = (req, res) => {
    Articles.getList()
      .then(artArray => {
        res.render('articleViews/allArticles', {products: artArray});
      })
      .catch(error => {
        res.render('articleViews/allArticles', {products: artArray});
      });
  };

  const getSingleArticle = (req, res) => {
    ARticles.getByTitle(req.params.title)
      .then(data => {
        res.render('articleViews/singleArticle', data[0]);
      })
      .catch(() => {
        res.redirect('/articles');
      });
  };

  const artPost = (req, res) => {
    Articles.addArticle(req.body)
      .then(() => {
        res.redirect('/articles');
      })
      .catch(() => {
        res.redirect('/articles/new');
      });
  };

  const artPut = (req, res) => {
    Articles.editByTitle(unEncode(req.params.title), req.body)
      .then(() => {
        res.redirect(`/articles/${encodeTitle(req.body.title)}`);
      })
      .catch(() => {
        res.redirect(`/articles/${req.params.title}/edit`);
      });
  };

  const artDelete = (req, res) => {
    if (checkTitleInput(req.body) && Articles.removeByTitle(req.path.slice(1))) {
      res.redirect('/articles');
    } else {
      res.redirect(`/articles/${req.params.title}`);
    }
  };

  return {
    artPost,
    artPut,
    artDelete
  };
})();



const checkPostInput = (reqBody) => {
  if (reqBody.hasOwnProperty('title') &&
      reqBody.hasOwnProperty('body') &&
      reqBody.hasOwnProperty('author')) {
    return true;
  } else {
    return false;
  }
};

const encodeTitle = (title) => {
  return title.split(' ').join('-');
};

const checkTitleInput = (reqBody) => {
  if (reqBody.hasOwnProperty('title')) {
    return true;
  } else {
    return false;
  }
};

const filterExtraProps = (reqBody) => {
  return {
    title: reqBody.title,
    body: reqBody.body,
    author: reqBody.author,
    urlTitle: reqBody.urlTitle
  };
};