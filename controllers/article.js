const Article = require('../models/article');
const ValidationError = require('../errors/validation-error');
const NotFoundError = require('../errors/not-found');
const NotEnoughRights = require('../errors/no-rights');
const { validationError, articleNotFound, noRightsToRem, castErr } = require('../errors/error-messages');

const getArticles = (req, res, next) => {
  Article.find({ owner: req.user._id })
    .then((articles) => {
      res.send(articles);
    })
    .catch(next);
};

const createArticle = (req, res, next) => {
  const { keyword, title, text, date, source, link, image } = req.body;
  const owner = req.user;

  Article.create({ keyword, title, text, date, source, link, image, owner })
    .then((article) => {
      res.send(article);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new ValidationError(validationError));
        return;
      }
      next(err);
    });
};

const deleteArticle = (req, res, next) => {
  const { articleId } = req.params;
  Article.findById(articleId)
    .then((article) => {
      if (!article) {
        throw new NotFoundError(articleNotFound);
      }
      if (article.owner.toString() !== req.user._id) {
        throw new NotEnoughRights(noRightsToRem);
      }
      Article.findByIdAndRemove(articleId)
        .then(() => {
          res.send(article);
        })
        .catch(next);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new ValidationError(castErr));
        return;
      }
      next(err);
    });
};

module.exports = {
  getArticles,
  createArticle,
  deleteArticle
};
