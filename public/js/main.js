$(document).ready(function() {
  // this is really clever! I'd suggest putting it into a named function to
  // make it clearer what it's doing...
  currentUser = '';
  $.getJSON('/auth').then(function(json) {
      if(json.isAuthenticated === "true"){
        currentUser = json.user;
        $(".logout-btn").html("Logout " + currentUser.name );
        loadUserIndexView();
      } else {
        var background = new WelcomeView().renderBackground();
        var onboard = new WelcomeView().renderOnboard();
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
