const { celebrate, Joi } = require('celebrate');

// VALIDATION FOR ARTICLES

const getArticlesValid = celebrate({
  query: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().required().alphanum()
    })
  })
});

const createArticleValid = celebrate({
  body: Joi.object().keys({
    keyword: Joi.string().required(),
    title: Joi.string().required(),
    text: Joi.string().required(),
    date: Joi.string().required(),
    source: Joi.string().required(),
    link: Joi.string().required().regex(/https?:\/\/(www\.)?(?:[-\w.]+\.[a-z]+)(?:\/[-\w@/]*#?)?/),
    image: Joi.string().required().regex(/https?:\/\/(www\.)?(?:[-\w.]+\.[a-z]+)(?:\/[-\w@/]*#?)?(?:.(?:jpg|jpeg|png))?/)
  })
});

const deleteArticleValid = celebrate({
  params: Joi.object().keys({
    articleId: Joi.string().alphanum().required()
  }).unknown(true),
  query: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().required().alphanum()
    })
  })
});

// VALIDATION FOR USERS

const getUserValid = celebrate({
  query: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().required()
    })
  }).unknown(true)
});

const loginValid = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(/[-.\w]+@[-\w]+\.[a-z]+/),
    password: Joi.string().required()
  })
});

const createUserVaild = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required().alphanum().min(5)
  })
});

module.exports = {
  getArticlesValid,
  createArticleValid,
  deleteArticleValid,
  getUserValid,
  createUserVaild,
  loginValid
};
