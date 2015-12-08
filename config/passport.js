var FacebookStrategy  = require("passport-facebook").Strategy;
var GoogleStrategy    = require("passport-google-oauth2").Strategy;
var LocalStrategy     = require("passport-local").Strategy;
var User              = require("../models/user");
var env               = require("../env");

module.exports = function(passport) {

  passport.serializeUser(function(user, callback) {
    callback(null, user.id);
  });

  passport.deserializeUser(function(id, callback) {
    User.findById(id, function(err, user) {
      callback(err, user);
    });
  });

  passport.use("local-signup", new LocalStrategy({
    usernameField : "email",
    passwordField : "password",
    passReqToCallback : true
  }, function(req, email, password, callback){
    // Find a user with this e-mail
    User.findOne({ "local.email" : email }, function(err, user) {
      if (err) return callback(err);

      // If there already is a user with this email
      if (user) {
        return callback(null, false, req.flash("signupMessage", "This email is already used."));
      } else {
        // There is no email registered with this email

        // Create a new user
        var newUser = new User();
        newUser.local.email = email;
        newUser.local.password = newUser.encrypt(password);

        newUser.save(function(err) {
          if (err) throw err;
          return callback(null, newUser);
        });
      }
    });
  }));

  passport.use("local-login", new LocalStrategy({
    usernameField : "email",
    passwordField : "password",
    passReqToCallback : true
  }, function(req, email, password, callback){

    // Search for a user with this email
    User.findOne({ "local.email" : email }, function(err, user) {
      if (err) {
        return callback(err);
      }

      // If no user is found
      if (!user) {
        return callback(null, false, req.flash("loginMessage", "No user found."));
      }

      // Wrong password
      if (!user.validPassword(password)) {
        return callback(null, false, req.flash("loginMessage", "Oops! Wrong password."));
      }

      return callback(null, user);
    });
  }));

  // Facebook login
  passport.use('facebook', new FacebookStrategy({
    // Here we reference the values in env.js.
    clientID: env.facebook.clientID,
    clientSecret: env.facebook.clientSecret,
    callbackURL: env.facebook.callbackURL
  }, function(token, secret, profile, done){
    process.nextTick(function(){
      User.findOne({'facebook.id': profile.id}, function(err, user) {
        if(err) return done(err);

        // If the user already exists, just return that user.
        if(user){
          return done(null, user);
        } else {
          // Otherwise, create a brand new user using information passed from Facebook.
          var newUser = new User();

          // Here we're saving information passed to us from Facebook.
          newUser.facebook.id = profile.id;
          newUser.facebook.token = token;
          newUser.facebook.username = profile.username;
          newUser.facebook.displayName = profile.displayName;

          newUser.save(function(err){
            if(err) throw err;
            return done(null, newUser);
          })
        }
      })
    })
    }));

    //Google Login
  passport.use('google', new GoogleStrategy({
    // Here we reference the values in env.js.
    clientID: env.google.clientID,
    clientSecret: env.google.clientSecret,
    callbackURL: env.google.callbackURL
  }, function(token, secret, profile, done){
    process.nextTick(function(){
      User.findOne({'google.id': profile.id}, function(err, user) {
        if(err) return done(err);

        // If the user already exists, just return that user.
        if(user){
          return done(null, user);
        } else {
          // Otherwise, create a brand new user using information passed from Google.
          var newUser = new User();

          // Here we're saving information passed to us from Google.
          newUser.google.id = profile.id;
          newUser.google.token = token;
          newUser.google.name = profile.name;
          newUser.google.displayName = profile.displayName;

          newUser.save(function(err){
            if(err) throw err;
            return done(null, newUser);
          })
        }
      })
    })
    }));
};
