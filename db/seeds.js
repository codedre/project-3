require("./schema");
var mongoose = require("mongoose");
var db = mongoose.connection;
var artistData = require("./user_data");

db.on("error", function(err){
  console.log("Oops! Mongo threw an error. Is `mongod` running?");
  console.log(err.message);
  process.exit();
});

db.once("open", function () {
  console.log("Connected to the database.");
  var Artist = require("../models/user");
});
