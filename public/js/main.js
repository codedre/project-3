$(document).ready(function() {
  $.getJSON('/auth').then(function(json) {
      if(json.isAuthenticated === "true"){
        loadUserIndexView();
      } else {
        var background = new WelcomeView().renderBackground();
      }
    });

    function loadUserIndexView(){
      // add row
      var row = $("<div class='row' id='row-style'></div>");
      $('main').append(row);
      // render search
      var userSearch = function() {
        var renSearch = new FilterView().renderSearch();
      };
      userSearch();
      // render users
      User.fetch().then(function(users){
        $('.row').append("<div class='user-container'></div>");
        users.forEach( function(user) {
          var renUsers = new UserView(user).renderUsers(user);
        });

      });
    }
});
