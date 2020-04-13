const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const AuthError = require('../errors/auth-error');
const { authError } = require('../errors/error-messages');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => /[-.\w]+@[-\w]+\.[a-z]+/.test(email),
      message: (props) => `${props.value} неверный формат email`
    }
  },
  password: {
    type: String,
    required: true,
    select: false
  }
},
{ versionKey: false });

// eslint-disable-next-line func-names
userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError(authError);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError(authError);
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
