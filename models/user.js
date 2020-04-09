const mongoose = require('mongoose');

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
{versionKey: false});

module.exports = mongoose.model('user', userSchema);
