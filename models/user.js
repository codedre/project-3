var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

// Nice schema!
var User = mongoose.Schema({
  local : {
    email        : String,
    password     : String
  },
  facebook : {
    id: String,
    token: String,
    provider: String
  },
  google : {
    id: String,
    token: String,
    provider: String
  },
  name         : String,
  photo        : String,
  bio          : String,
  interests    : [],
  location     : String
});

User.methods.encrypt = function(password) {
  return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

User.methods.validPassword = function(password) {
  return bcrypt.compareSync(password, this.local.password);
};

module.exports = mongoose.model('User', User);
