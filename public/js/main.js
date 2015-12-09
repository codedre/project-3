$(document).ready(function() {

  var row = $("<div class='row'></div>");
  $('main').append(row);
  // RENDER SEARCH + RETURNED USERS
  var userSearch = function() {
    var renSearch = new UserView().renderSearch();

  };
  userSearch();

  User.fetch().then(function(users){
    // return collection based on search params
    // console.log(users);
    // render every user in cursor
    $('.row').append("<div class='user-container'></div>");
    users.forEach( function(user) {
      // console.log(user);
      var renUsers = new UserView(user).renderUsers(user);
    });
  });


});
