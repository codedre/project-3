var LoginView = function(user) {
  this.user = user;
  // need to fix this
  // this.$el = $('<div class="users"></div>');
};

LoginView.prototype = {
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
  // renderSignup: funciton() {},
  // renderConfirmLocation: function() {}
};
