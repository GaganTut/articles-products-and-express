/*jshint esversion: 6*/

const articlesList = [];

module.exports = (() => {
  const artPost = (req, res) => {
    if (checkPostInput(req.body)) {
      req.body.urlTitle = encodeTitle(req.body.title);
      articlesList.push(filterExtraProps(req.body));
      res.redirect(200, '/articles');
    } else {
      res.redirect('/articles');
    }
  };

  const artPut = (req, res) => {
    if (checkTitleInput(req.body)) {
      editArticle(req.body);
      res.redirect(`articles/${req.body.title}`);
    } else {
      res.redirect(`/article/${req.body.title}/edit`);
    }
  };

  const artDelete = (req, res) => {
    if (checkTitleInput(req.body)) {
      deleteArticle(req.body.title);
      res.redirect('/articles');
    } else {
      res.redirect(`/article/${req.body.title}`);
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

const editArticle = (reqBody) => {
  for (let i = 0; i < articlesList.length; i++) {
    if (articlesList[i].title === reqBody.title) {
      updateArticle(articlesList[i], reqBody.body);
    }
  }
};

const updateArticle = (ogArt, updBod) => {
  if (updBod.body !== undefined) {
    ogArt.body = updBod.body;
  }
  if (updBod.author !== undefined) {
    ogArt.author = updBod.author;
  }
};