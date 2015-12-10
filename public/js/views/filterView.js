var FilterView = function() {
  this.$searchContainer = $('<div class="search-container"></div>');

};

FilterView.prototype = {
  renderSearch: function() {
    var self = this;
    self.$searchContainer.html(self.searchTemplate());

    $(".row").append(self.$searchContainer);
  },
  searchTemplate: function() {
    var html = $('<div class="filter"></div>');
    var filterGroup = $('<div id="filterGroup"></div>');
    var sel = $('<select class="btn btn-warning" id="filterLocation"></select>');
    sel.append('<option name="all">All</option>');
    sel.append('<option name="northWest">North West</option>');
    sel.append('<option name="west">West</option>');
    sel.append('<option name="southWest">South West</option>');
    sel.append('<option name="mid-west">Mid-West</option>');
    sel.append('<option name="southEast">South East</option>');
    sel.append('<option name="mid-atlantic">Mid-Atlantic</option>');
    sel.append('<option name="northEast">North East</option>');
    filterGroup.append(sel);
    html.append('<div class="filterText">Showing </div>');
    html.append(filterGroup);
    html.append('<div class="filterText"> Travelers</div>');
    // html.append('<p>Interested in <a class="btn btn-warning" href="#">Foodie</a> <a class="btn btn-warning" href="#">Wildlife</a> <a class="btn btn-default" href="#">+ Add Interest</a></p>');
    return(html);
  },
  filterListener: function() {

  }
};
