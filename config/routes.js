var express = require('express');
var router = express.Router();
// Parses information from POST
var bodyParser = require('body-parser');
// Used to manipulate POST methods
var methodOverride = require('method-override');
var passport = require("passport");
var usersController = require('../controllers/users');
var staticsController = require('../controllers/statics');

function authenticatedUser(req, res, next) {
  // If the user is authenticated, then we continue the execution
  if (req.isAuthenticated()){
    res.json({isAuthenticated : "true"});
    return next();
  } else {
    res.json({isAuthenticated : "false"});
  }
    // res.redirect('/');
  // Otherwise the request is always redirected to the home page
}

router.route('/')
  .get(staticsController.home);

router.route('/auth').get(function(req,res){
  if (req.user){
    res.json({isAuthenticated : "true"});
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

router.route("/secret")
  .get(authenticatedUser, usersController.secret);

router.route('/auth/facebook')
  .get(passport.authenticate('facebook'));

router.route('/auth/facebook/callback')
  .get(passport.authenticate('facebook', {
    successRedirect: '/',
    failureRedirect: '/login'
  }));

router.get("/user/index.:format?", usersController.getUserIndex);

router.get("/user/:id.:format?", usersController.getUserShow);

router.delete("/user/:id", usersController.deleteUserProfile);
router.patch("/user/:id", usersController.patchUserEdit);
router.get("/user/:id/edit", usersController.getUserEdit);




module.exports = router;
