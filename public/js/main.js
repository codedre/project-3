$(document).ready(function() {

  // add row
  var row = $("<div class='row'></div>");
  $('main').append(row);
  // render search
  var userSearch = function() {
    var renSearch = new UserView().renderSearch();
  };
  userSearch();

  // render users
  User.fetch().then(function(users){
    $('.row').append("<div class='user-container'></div>");
    users.forEach( function(user) {
      var renUsers = new UserView(user).renderUsers(user);
    });
  });

});
