require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');

const { limiter } = require('./constants/limiter');
const { base } = require('./constants/globals');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { errorMiddleware } = require('./middlewares/errorMiddleware');
const router = require('./routes');

const { PORT = 3000 } = process.env;

const app = express();

mongoose.connect(base, {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true
})
  .then(() => {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(cookieParser());
    app.use(requestLogger);
    app.use(helmet());
    app.use(limiter);

    app.use(router);

    app.use(errorLogger);
    app.use(errors());
    app.use(errorMiddleware);

    app.listen(PORT);
  })
  .catch((err) => {
    console.log(`Connection failed with issue: ${err}`);
  });
