var express = require("express");
var app = express();
var User = require("../models/user.js");
var passport = require("passport");

// GET /signup
function getSignup(request, response) {
  response.render("signup.hbs", { message: request.flash("signupMessage") });
}

// POST /signup
function postSignup(request, response) {
  var signupStrategy = passport.authenticate("local-signup", {
    // from a UX standpoint, I feel like it'd be better to
    // redirect to the the user's edit page after sucessful
    // authentication so they can fill out their profile
    successRedirect : '/user/index',
    failureRedirect : '/signup',
    failureFlash : true
  });

  return signupStrategy(request, response);
}

// GET /login
function getLogin(request, response) {
  response.render("login.hbs", { message: request.flash("loginMessage") });
}

// POST /login
function postLogin(request, response) {
  var loginProperty = passport.authenticate("local-login", {
    successRedirect : '/user/index',
    failureRedirect : '/login',
    failureFlash : true
  });

  return loginProperty(request, response);
}

// GET /logout
function getLogout(request, response) {
  request.logout();
  response.redirect('/');
  console.log("getLogout got called");
}

function getUserIndex(req,res){
  User.find({}).then(function(results) {
    res.json(results);
  });
}

function getUserShow(req, res){
  User.findById(req.params.id).then(function(results) {
    res.json(results);
  });
}

function getUserEdit(req, res){
  User.findById(req.params.id).then(function(results) {
    res.render("user/edit", {
      user: results
    });
  });
}

function patchUserEdit(req,res) {
  User.findByIdAndUpdate(req.params.id, {
    name: req.body.name,
    location: req.body.location,
    interests: req.body.interests,
    photo: req.body.photo,
    bio: req.body.bio,
    local: {
      email: req.body.local.email,
      password: req.body.local.password
    }
  }, {new: true}).then(function(user) {
    console.log(user);
    res.json(user);
  });
}

function deleteUserProfile(req,res) {
  User.findByIdAndRemove( req.params.id , function(err, user) {
    if(err){res.send(err);} else {
      res.json({success: "true"});
    }
  });
}

function validateUser(req, res) {
  var currentUser = req.user;
  if (req.user){
    res.json({isAuthenticated : "true", user: currentUser});
  } else {
    res.json({isAuthenticated : "false"});
  }
}

// I get that you were following the style of method names
// that we used in the authentication class,
// (e.g. getLogin, postLogin, etc) but I'd actually
// suggest following more restful conventions:
// index, show, edit, update, create, destroy
module.exports = {
  getLogin: getLogin,
  postLogin: postLogin ,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout,
  getUserIndex : getUserIndex,
  getUserShow : getUserShow,
  getUserEdit : getUserEdit,
  patchUserEdit : patchUserEdit,
  deleteUserProfile : deleteUserProfile,
  validateUser : validateUser
};
