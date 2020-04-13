const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { getUser } = require('../controllers/user');

router.get('/me', celebrate({
  query: Joi.object().keys({
    user: Joi.object().keys({
      _id: Joi.string().required()
    })
  }).unknown(true)
}), getUser);

module.exports = router;
