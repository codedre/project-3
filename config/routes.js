// excellent job here with your routes. I like how everything is
// organized and using controllers.
// one suggestion (small would be to make better use of whitespace
// and new lines to group related sections of code more clearly)
// for example, iI'd put a new line above the require statement for
// controllers, to separate it from require statments for libraries
// also, alignment of equal signs helps a lot too:

// var express    = require('express');
// var router     = express.Router();
//
// var bodyParser     = require('body-parser'); // Parses information from POST
// var methodOverride = require('method-override'); // Used to manipulate POST methods
// var passport       = require("passport");
//
// var usersController    = require('../controllers/users');
// var staticsController  = require('../controllers/statics');

var express               = require('express');
var router                = express.Router();
// Parses information from POST
var bodyParser            = require('body-parser');
// Used to manipulate POST methods
var methodOverride        = require('method-override');
var passport              = require("passport");
var usersController       = require('../controllers/users');
var staticsController     = require('../controllers/statics');

router.route('/')
  .get(staticsController.home);

// why this one exception where you use an anonymous function?
// I'd try to be consistent and use a controller method here too.
// also, a more descriptive path would be nice, such as GET /auth/validate

router.get('/auth/validate', usersController.validateUser);

router.route('/signup')
  .get(usersController.getSignup)
  .post(usersController.postSignup);

router.route('/login')
  .get(usersController.getLogin)
  .post(usersController.postLogin);

router.route("/logout")
  .get(usersController.getLogout);

// Facebook login
router.route('/auth/facebook')
  .get(passport.authenticate('facebook', { scope : ['email'] }));

router.route('/auth/facebook/callback')
  .get(passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

// Google Login
router.route('/auth/google')
  .get(passport.authenticate('google', { scope:
    [ 'https://www.googleapis.com/auth/plus.login',
    'https://www.googleapis.com/auth/plus.profile.emails.read' ]
  }));

router.route('/auth/google/callback')
  .get(passport.authenticate('google', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

router.get("/user/index.:format?", usersController.getUserIndex);
router.get("/user/:id.:format?", usersController.getUserShow);
router.delete("/user/:id", usersController.deleteUserProfile);
router.patch("/user/:id", usersController.patchUserEdit);
router.get("/user/:id/edit", usersController.getUserEdit);




module.exports = router;
