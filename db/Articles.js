/*jshint esversion: 6*/

module.exports = (() => {
  const Articles = [];

  const getList = () => {
    if (Articles.length < 1) {
      return true;
    }
    return Articles;
  };

  const addArticle = (artInfo) => {
    if(checkDuplicates(artInfo.title)) {
      Articles.push(artInfo);
      return true;
    } else {
      return false;
    }
  };

  const checkDuplicates = (title) => {
    for (let i = 0; i < Articles.length; i++) {
      if (Articles[i].title === title) {
        return false;
      }
    }
    return true;
  };

  const getByTitle = (title) => {
    for (let i = 0; i < Articles.length; i++) {
      if(Articles[i].urlTitle === title) {
        return Articles[i];
      }
    }
    return {'notFound': true};
  };

  const editByTitle = (title, newArtInfo) => {
    for (let i = 0; i < Articles.length; i++) {
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
    return false;
  };

  const removeByTitle = (title) => {
    for (let i = 0; i < Articles.length; i++) {
      if(Articles[i].urlTitle === title) {
        Articles.splice(Articles.indexOf(Articles[i], 1));
        return true;
      }
    }
    return false;
  };

  return {
    getList,
    addArticle,
    getByTitle,
    editByTitle,
    removeByTitle
  };
})();

