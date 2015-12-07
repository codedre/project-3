require("./schema");
var mongoose = require("mongoose");
var db = mongoose.connection;
var userData = require("./user_data");


// TODO Why is error a string here? Will err.message be logged?
db.on("error", function(err){
  console.log("Oops! Mongo threw an error. Is `mongod` running?");
  console.log(err.message);
  process.exit();
});

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
