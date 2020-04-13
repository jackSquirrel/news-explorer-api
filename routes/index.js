const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const { auth } = require('../middlewares/auth');
const { createUser, login } = require('../controllers/user');
const usersRouter = require('./users');
const articleRouter = require('./articles');
const NotFoundError = require('../errors/not-found');

router.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(/[-.\w]+@[-\w]+\.[a-z]+/),
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required().alphanum().min(5)
  })
}), createUser);

router.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(/[-.\w]+@[-\w]+\.[a-z]+/),
    password: Joi.string().required()
  })
}), login);

router.use(auth);

router.use('/users', usersRouter);
router.use('/articles', articleRouter);
router.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
