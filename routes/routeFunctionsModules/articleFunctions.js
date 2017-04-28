/*jshint esversion: 6*/
const Articles = require('../../db/Articles.js');

module.exports = (() => {
  const getAllArticles = (req, res) => {
    Articles.getList()
      .then(artArray => {
        artArray.forEach(element => {
          element.urlTitle = encodeTitle(element.title);
        });
        res.render('articleViews/allArticles', {articles: artArray});
      })
      .catch(error => {
        res.render('articleViews/allArticles', {articles: artArray});
      });
  };

  const getSingleArticle = (req, res) => {
    Articles.getByTitle(unEncode(req.params.title))
      .then(data => {
        data.urlTitle = encodeTitle(data.title);
        res.render('articleViews/singleArticle', data);
      })
      .catch(error => {
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
    if (req.body.title === unEncode(req.params.title)) {
      Articles.removeByTitle(req.body.title)
        .then(() => {
          res.redirect('/articles');
        })
        .catch(error => {
          res.redirect(`/articles/${req.params.title}`);
        });
    } else {
      res.redirect(`/articles/${req.params.title}`);
    }
  };

  const editArtPage = (req, res) => {
    Articles.getByTitle(unEncode(req.params.title))
      .then(data => {
        res.render('articleViews/editArticle', data);
      });
  };

  return {
    artPost,
    artPut,
    artDelete,
    getAllArticles,
    getSingleArticle,
    editArtPage
  };
})();


const encodeTitle = (title) => {
  return title.split(' ').join('%20');
};

const unEncode = (title) => {
  return title.split('%20').join(' ');
};