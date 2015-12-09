var UserView = function(user) {
  this.user = user;
  this.$userCard = $('<div class="card col-xs-12 col-md-3 col-lg-4"></div>');
  this.$searchContainer = $('<div class="search-container"></div>');


};

UserView.prototype = {
  renderUsers: function(user) {
    var self = this;
    // self.$userContainer.html(self.userTemplate(self.user));
    var block = $('<div class="card-block"></div>');
    self.$userCard.append('<img class="img-circle" src="'+ user.photo +'">');
    self.$userCard.attr('id', user.id);
    block.append('<h2 class="card-title">' + user.name + '</h2>');
    block.append('<p class="card-text">'+ user.location +'<span class="glyphicon glyphicon-pushpin" aria-hidden="true"></span></p>');
    var unordered = $('<ul></ul>');
    for (var i=0; i < user.interests.length; i++) {
      unordered.append('<li class="btn btn-warning">'+ user.interests[i] +'</li>');
    }
    block.append(unordered);
    self.$userCard.append(block);
    console.log(self.$userCard);
    $(".user-container").append(self.$userCard);
  },
  renderSearch: function() {
    var self = this;
    self.$searchContainer.html(self.searchTemplate());

    $(".row").append(self.$searchContainer);
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
    html.append(block);
    return(html);
  },
  searchTemplate: function() {
    var html = $('<div class="filter"></div>');
    html.append('<p>Showing <a class="btn btn-warning" href="#">Mid-Atlantic</a> Travelers</p>');
    html.append('<p>Interested in <a class="btn btn-warning" href="#">Foodie</a> <a class="btn btn-warning" href="#">Wildlife</a> <a class="btn btn-default" href="#">+ Add Interest</a></p>');
    // html.append(this.locationFilterTemplate());
    return(html);
  },
  locationFilterTemplate: function() {
    var html = $('<div id="filterGroup"></div>');
    var select = ('<select class="filter option-set" data-filter-group="location"></select>');
    select.append('<option data-filter-value=".red">Red</option>');
    select.append('<option data-filter-value=".green">Green</option>');
    select.append('<option data-filter-value=".blue">Blue</option>');
    html.append(select);
    return(html);
  },
  interestFilterTemplate: function() {}
};
