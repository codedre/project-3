$(document).ready(function() {
  // $("body").css({
  //   "background"            : "no-repeat",
  //   "background-image"      : "url(images/bg_home.jpg)",
  //   "background-position"   : "center center",
  //   "background-attachment" : "fixed",
  //   "background-size"       : "cover"
  // });

  User.fetch().then(function(users){
    var renSearch = new UserView().renderSearch();
    // return collection based on search params

    // render every user in cursor
    users.forEach( function(user) {
      var renUsers = new UserView(user).renderUsers();
    });
  });

  var query = function() {
    User.queryLocation();
  };
  query();

});
