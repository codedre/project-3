var express = require("express");
var app = express();

app.listen(4000, function(){
  console.log("app listening on port 4000");
});

app.get("/", function(req, res){
  res.send("Hello World");
});
