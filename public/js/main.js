$(document).ready(function() {
  // $("body").css({
  //   "background"            : "no-repeat",
  //   "background-image"      : "url(images/bg_home.jpg)",
  //   "background-position"   : "center center",
  //   "background-attachment" : "fixed",
  //   "background-size"       : "cover"
  // });

  User.fetch().then(function(users){
    users.forEach( function(user) {
      var view = new UserView(user).renderUsers();
    });
  });

});
