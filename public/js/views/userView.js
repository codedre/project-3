var UserView = function(user) {
  this.user = user;

  //something like 'this.$el = $('<div class="user"....')'
  //this.renderUsers();
  //$(".users").append(this.$el);
};

UserView.prototype = {
  renderUsers: function() {
    var self = this;
    // display username, location, and interests
    // link to show page
  },
  renderSearch: function() {
    // start with search as static form, this will be used if need to remove the search
    // and regenerate it at some point
  },
  filterInterests: function() {
    // have search as static form with dropdowns on page, on submit
    // render apprpriate users
  },
  filterLocations: function() {
    // have search as static form with dropdowns on page, on submit
    // render apprpriate users
  },
};
