const router = require('express').Router();

const { loginValid, createUserVaild } = require('../constants/validation');
const { auth } = require('../middlewares/auth');
const { createUser, login, logout } = require('../controllers/user');
const usersRouter = require('./users');
const articleRouter = require('./articles');
const NotFoundError = require('../errors/not-found');

router.post('/signup', createUserVaild, createUser);
router.post('/signin', loginValid, login);
router.post('/logout', logout);

router.use(auth);

router.use('/users', usersRouter);
router.use('/articles', articleRouter);
router.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

module.exports = router;
