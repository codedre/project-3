$(document).ready(function() {

  // RENDER SEARCH + RETURNED USERS
  var userSearch = function() {
    var renSearch = new UserView().renderSearch();

  };
  userSearch();

  User.fetch().then(function(users){
    // return collection based on search params
    
    // render every user in cursor
    users.forEach( function(user) {
      var renUsers = new UserView(user).renderUsers();
    });
  });


});
