/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { celebrate, Joi, errors } = require('celebrate');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { createUser, login } = require('./controllers/user');
const usersRouter = require('./routes/users');
const articleRouter = require('./routes/articles');
const { auth } = require('./middlewares/auth');
const { errorMiddleware } = require('./middlewares/errorMiddleware');
const NotFoundError = require('./errors/not-found');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect('mongodb://localhost:27017/explorer', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
  .then(() => {
    console.log('Connected to MongoDb');
  })
  .catch((err) => {
    console.log(`Connection failed with issue: ${err}`);
  });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(requestLogger);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(/[-.\w]+@[-\w]+\.[a-z]+/),
    name: Joi.string().required().min(2).max(30),
    password: Joi.string().required().alphanum().min(5)
  })
}), createUser);

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().regex(/[-.\w]+@[-\w]+\.[a-z]+/),
    password: Joi.string().required()
  })
}), login);

app.use(auth);

app.use('/users', usersRouter);
app.use('/articles', articleRouter);
app.use('/*', (req, res, next) => {
  next(new NotFoundError('Страница не найдена'));
});

app.use(errorLogger);
app.use(errors());
app.use(errorMiddleware);

app.listen(PORT);
