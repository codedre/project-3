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
    successRedirect : '/',
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
    successRedirect : '/',
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
  User.findByIdAndUpdate(req.params.id, {$set: req.body}).then(function(results) {
    res.render("user/edit", {
      user: results
    });
  });
}

function getUserEdit(req, res){
  User.findByIdAndUpdate(req.params.id, {$set: req.body}).then(function(results) {
    res.render("user/edit", {
      user: results
    });
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
  getUserEdit : getUserEdit
};
