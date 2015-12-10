var UserView = function(user) {
  this.user = user;
  this.$userCard = $('<div class="card col-xs-12 col-md-3 col-lg-4"></div>');
  this.$searchContainer = $('<div class="search-container"></div>');

  $(this.$userCard).on("click", function() {
    console.log(this.id);
    // CLEAR EVERYTHING & RENDER USER#SHOW
    $('.row').empty();
    var profileView = function() {
      var renderProfile = new ProfileView().renderProfile(user);
    };
    profileView();
  });

  $('#filterLocation').change(function() {
    var val = $('#filterLocation option:selected').text();
    console.log(val);
  });
};

UserView.prototype = {
  renderUsers: function(user) {
    var self = this;
    // self.$userContainer.html(self.userTemplate(self.user));
    var block = $('<div class="card-block"></div>');
    self.$userCard.append('<img class="img-circle" src="'+ user.photo +'">');
    self.$userCard.attr('id', user.id);
    block.append('<h2 class="card-title">' + user.name + '</h2>');
    block.append('<p class="card-text"><img src="/images/pin.png" class="pin">' + ' ' + user.location + '</p>');
    var unordered = $('<ul></ul>');
    for (var i=0; i < user.interests.length; i++) {
      unordered.append('<li class="btn btn-warning">'+ user.interests[i] +'</li>');
    }
    block.append(unordered);
    self.$userCard.append(block);
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
    // var html = $('<div class="card"></div>');
    // html.append(block);
    // return(html);
  },
  searchTemplate: function() {
    var html = $('<div class="filter"></div>');
    html.append('<p class="search-bar">Showing <a class="btn btn-warning" href="#">Mid-Atlantic</a> travelers interested in</p>');
    html.append('<p class="search-bar"><a class="btn btn-warning" href="#">Foodie</a> <a class="btn btn-warning" href="#">Wildlife</a> <a class="btn btn-default" href="#">+ Add Interest</a></p>');
    var filterGroup = $('<div class="search-bar" id="filterGroup"></div>');
    var sel = $('<select class="btn btn-warning" id="filterLocation"></select>');
    sel.append('<option name="northWest">North West</option>');
    sel.append('<option name="west">West</option>');
    sel.append('<option name="southWest">South West</option>');
    sel.append('<option name="mid-west">Mid-West</option>');
    sel.append('<option name="southEast">South East</option>');
    sel.append('<option name="mid-atlantic">mid-atlantic</option>');
    sel.append('<option name="northEast">North East</option>');
    filterGroup.append(sel);
    html.append(filterGroup);
    return(html);
  },
  locationFilterTemplate: function() {
    // var filterGroup = $('<div id="filterGroup"></div>');
    // var select = ('<select class="filter option-set" data-filter-group="location"></select>');
    // select.append('<option data-filter-value=".red">Red</option>');
    // select.append('<option data-filter-value=".green">Green</option>');
    // select.append('<option data-filter-value=".blue">Blue</option>');
    // filterGroup.append(select);
    // return(filterGroup);
  },
  interestFilterTemplate: function() {}
};
