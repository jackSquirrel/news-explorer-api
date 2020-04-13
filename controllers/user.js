const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { key } = require('../keys/token_key');
const ValidationError = require('../errors/validation-error');
const { validationError } = require('../errors/error-messages');

const getUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

const createUser = (req, res, next) => {
  const { email, name, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => {
      User.create({ email, name, password: hash })
        .then(() => {
          res.send({ email, name });
        })
        .catch((err) => {
          if (err.name === 'ValidationError') {
            next(new ValidationError(validationError));
            return;
          }
          next(err);
        });
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  return User.findUserByCredentials(email, password, next)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        key,
        { expiresIn: '7d' }
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true
        })
        .send({ token });
    })
    .catch(next);
};

module.exports = {
  getUser,
  createUser,
  login
};
