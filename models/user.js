const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const AuthError = require('../errors/auth-error');
const { wrongData } = require('../errors/error-messages');

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

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email }).select('+password')
    .then((user) => {
      if (!user) {
        throw new AuthError(wrongData);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError(wrongData);
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
