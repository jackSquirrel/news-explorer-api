const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getArticles, createArticle, deleteArticle } = require('../controllers/article');

router.get('/', celebrate({
  query: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().required().alphanum()
    })
  })
}), getArticles);

router.post('/', celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().regex(/https?:\/\/(www\.)?(?:[-\w.]+\.[a-z]+)(?:\/[-\w@/]*#?)?/),
    image: Joi.string().required().regex(/https?:\/\/(www\.)?(?:[-\w.]+\.[a-z]+)(?:\/[-\w@/]*#?)?(?:.(?:jpg|jpeg|png))?/)
  })
}), createArticle);

router.delete('/:articleId', celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().required()
  }).unknown(true),
  query: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().required().alphanum()
    })
  })
}), deleteArticle);

module.exports = router;
