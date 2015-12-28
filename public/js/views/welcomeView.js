// to me this feels like it could be just a static HTML page.. it's not rendering
// any dynamic data, nor is it adding a lot of functionality.
var WelcomeView = function() {
  this.$onboard = $('<div class="onboard"></div>');
  this.$login = $('<div class="onboard-btn onboard-google"><a href="/auth/google">Enter with Google</a></div>');
  this.$signup = $('<div class="onboard-btn onboard-facebook"><a href="/auth/facebook">Enter with Facebook</a></div>');
};

WelcomeView.prototype = {
  renderBackground: function() {
    // need to make this work, placed it here to clean up main.js
    $("body").css({
      "background"            : "no-repeat",
      "background-image"      : "url(images/bg_home.jpg)",
      "background-position"   : "center center",
      "background-attachment" : "fixed",
      "background-size"       : "cover"
    });
  },
  renderOnboard: function() {
    var self = this;
    self.$onboard.append(self.$login);
    self.$onboard.append(self.$signup);
    $("body").append(self.$onboard);
  },
};
