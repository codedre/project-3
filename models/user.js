var mongoose = require('mongoose');
var bcrypt   = require('bcrypt-nodejs');

var User = mongoose.Schema({
  local : {
    email        : String,
    password     : String
  },
  // TODO check keys/values for Facebook and customize.
  facebook : {
    id: String,
    token: String,
    username: String,
    displayName: String
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
