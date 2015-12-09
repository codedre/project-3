var UserView = function(user) {
  this.user = user;
  this.$el = $('<div class="user"></div>');
};

UserView.prototype = {
  renderUsers: function() {
    var self = this;
    self.$el.html(self.userTemplate(self.user));

    $("body").append(self.$el);



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
  userTemplate: function(user) {
    var html = $("<div>");
    html.append("<h2>" + user.name + "</h2>");
    // html.append("<img class='artist-photo' src='" + artist.photoUrl + "'>");
    // html.append("<button class='showSongs'>Show Songs</button>");
    // html.append("<button class='editArtist'>Edit Artist</button>");
    // html.append("<div class='songs'></div>");
    return(html);
  }
};
