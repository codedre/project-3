var express = require("express");
var app = express();

app.listen(4000, function(){
  console.log("app listening on port 4000");
});

//root 
app.get("/", function(req, res){
  res.send("Hello World");
});

//index
app.get("/users", function(req, res){
  //display all users nearby
  //search users
  res.send("Hello World");
});

//new
app.get("/users/new", function(req, res){
  res.send("Hello World");
});

//create
app.post("/users", function(req, res){
  res.send("Hello World");
});

//show
app.get("/users/:id", function(req, res){
  res.send("Hello World");
});

//edit
app.get("/users/:id/edit", function(req, res){
  res.send("Hello World");
});

//update
app.put("/users/:id", function(req, res){
  res.send("Hello World");
});
