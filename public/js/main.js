$(document).ready(function() {

  // RENDER SEARCH + RETURNED USERS
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
