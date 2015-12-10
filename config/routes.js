var express = require('express');
var router = express.Router();
// Parses information from POST
var bodyParser = require('body-parser');
// Used to manipulate POST methods
var methodOverride = require('method-override');
var passport = require("passport");
var usersController = require('../controllers/users');
var staticsController = require('../controllers/statics');

router.route('/')
  .get(staticsController.home);

router.route('/auth').get(function(req,res){
  var currentUser = req.user;
  if (req.user){
    res.json({isAuthenticated : "true", user: currentUser});
  }else {
    res.json({isAuthenticated : "false"});
  }
});

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
  .get(passport.authenticate('facebook'));

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
