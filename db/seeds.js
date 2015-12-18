// require("./schema");
var mongoose = require("mongoose");
mongoose.connect(process.env.MONGOLAB_URI || 'mongodb://localhost/beacon');
var db = mongoose.connection;
var userData = require("./user_data");


// TODO Why is error a string here? Will err.message be logged?
// Answer: `on` is listening for events from the DB, and 'error'
// is the name of one such event. (much like "click" for browser JS
// or the 'auth:login-success' events we saw in angular)
db.on("error", function(err){
  console.log("Oops! Mongo threw an error. Is `mongod` running?");
  console.log(err.message);
  process.exit();
});

// this section is really well written! it demonstrates correct
// understanding of the async nature of JS, and uses well-named
// vars and functions. One note... I don't think you need to
// define your own custom forEach function. It's standard in
// node.js, you should be able to use:
// userData.forEach(function(userDatum) { .... })

db.once("open", function () {
  console.log("Connected to the database.");
  var User = require("../models/user");

  User.remove({}).then(function(){
    forEach(userData, function(userDatum){
      return new User(userDatum).save();
    }).then(function(){
      process.exit();
    });
  });
});

function forEach(collection, callback, index){
  if(!index) index = 0;
  return callback(collection[index]).then(function(){
    if(collection[index + 1]) return forEach(collection, callback, index + 1);
  });
}
