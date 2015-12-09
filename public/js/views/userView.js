var UserView = function(user) {
  this.user = user;
  this.$el = $('<div class="user"></div>');


};

UserView.prototype = {
  renderUsers: function() {
    var self = this;
    self.$el.html(self.userTemplate(self.user));

    $("body").append(self.$el);
  },
  renderSearch: function() {
    var self = this;
    self.$el.html(self.searchTemplate());

    $("body").append(self.$el);
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
    var html = $('<div class="card"></div>');
    var block = $('<div class="card-block"></div>');
    html.append('<img class="img-circle" src="'+ user.photo +'">');
    block.append('<h2 class="card-title">' + user.name + '</h2>');
    block.append('<p class="card-text">'+ user.location +'</p>');
    var unordered = $('<ul></ul>');
    for (var i=0; i < user.interests.length; i++) {
      unordered.append('<li class="btn btn-warning">'+ user.interests[i] +'</li>');
    }
    block.append(unordered);
    html.append(block);
    return(html);
  },
  searchTemplate: function() {
    var html = $('<div class="filter"></div>');
    html.append('<p>Showing <a class="btn btn-warning" href="#">Mid-Atlantic</a> Travelers</p>');
    html.append('<p>Interested in <a class="btn btn-warning" href="#">Foodie</a> <a class="btn btn-warning" href="#">Wildlife</a> <a class="btn btn-default" href="#">+ Add Interest</a></p>');

    return(html);
  }
};
