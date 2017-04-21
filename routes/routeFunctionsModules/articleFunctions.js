/*jshint esversion: 6*/
const Articles = require('../../db/Articles.js');

module.exports = (() => {
  const artPost = (req, res) => {
    if (checkPostInput(req.body)) {
      req.body.urlTitle = encodeTitle(req.body.title);
      if (Articles.addArticle(filterExtraProps(req.body))) {
        res.redirect('/articles');
      } else {
        res.redirect('/articles/new');
      }
    } else {
      res.redirect('/articles/new');
    }
  };

  const artPut = (req, res) => {
    if (checkTitleInput(req.body) && Articles.editByTitle(req.path.slice(1), req.body)) {
      res.redirect(`/articles/${encodeTitle(req.body.title)}`);
    } else {
      res.redirect(`/article${req.path}/edit`);
    }
  };

  const artDelete = (req, res) => {
    if (checkTitleInput(req.body) && Articles.removeByTitle(req.path.slice(1))) {
      res.redirect('/articles');
    } else {
      res.redirect(`/article/${req.path.slice(1)}`);
    }
  };

  return {
    artPost,
    artPut,
    artDelete
  };
})();



const checkPostInput = (reqBody) => {
  if (reqBody.hasOwnProperty('title') && reqBody.hasOwnProperty('body') && reqBody.hasOwnProperty('author')) {
    return true;
  } else {
    return false;
  }
};

const encodeTitle = (title) => {
  return title.split(' ').join('%20');
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