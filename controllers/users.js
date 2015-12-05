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
}

// Restricted page
function secret(request, response){
  response.render('secret.hbs');
}

function getUserIndex(req,res){
  User.find({}).then(function(results) {
    res.render("user/index", {
      users: results
    });
  });
}

function getUserShow(req, res){
  User.findById(req.params.id).then(function(results) {
    res.render("user/show", {
      user: results
    });
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
    email: req.body.email,
    password: req.body.password
  }).then(function(results) {
    res.redirect("/user/" + req.params.id);
  });
}

module.exports = {
  getLogin: getLogin,
  postLogin: postLogin ,
  getSignup: getSignup,
  postSignup: postSignup,
  getLogout: getLogout,
  secret: secret,
  getUserIndex : getUserIndex,
  getUserShow : getUserShow,
  getUserEdit : getUserEdit,
  patchUserEdit : patchUserEdit
};
