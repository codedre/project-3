// adding in dependencies
var express        = require("express");
var app            = express();
var mongoose       = require("mongoose");
var passport       = require("passport");
var flash          = require("connect-flash");
var hbs            = require("hbs");
var morgan         = require("morgan");
var cookieParser   = require("cookie-parser");
var bodyParser     = require("body-parser");
var session        = require("express-session");
var methodOverride = require('method-override');


// connecting to db
mongoose.connect("mongodb://localhost/beacon");

// setting up middlewear
app.use(morgan("dev"));
app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(methodOverride('_method'));


app.set('view engine', 'hbs');
app.set('views','./views');
app.use(express.static(__dirname + '/public'));

app.use(session({ secret: 'TEAM-BEACON-FOR-THE-WIN' }));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

require('./config/passport')(passport);

app.use(function (req, res, next) {
  res.locals.currentUser = req.user;
  next();
});

var routes = require('./config/routes');
app.use(routes);

app.listen(4000, function(){
  console.log("app listening on port 4000");
});
