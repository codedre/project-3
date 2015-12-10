var FilterView = function() {
  this.$searchContainer = $('<div class="search-container"></div>');

  $('#filterLocation').on("change", function() {
    var val = $('#filterLocation option:selected').val();
    var $cards = $(".card-text");
    console.log("Filter Changed!");

    $cards.each(function(index, el){
      $el = $(el);
      if (val === 'All') {
        $el.parents(':eq(1)').show();
      } else if ($el.text() != val) {
        $el.parents(':eq(1)').hide();
      } else if ($el.text() == val) {
        $el.parents(':eq(1)').show();
      }
    });
  });
};

FilterView.prototype = {
  renderSearch: function() {
    var self = this;
    self.$searchContainer.html(self.searchTemplate());

    $(".row").append(self.$searchContainer);
    console.log("Rendered Search!");
  },
  searchTemplate: function() {
    var html = $('<div class="filter"></div>');
    html.append('<p>Showing <a class="btn btn-warning" href="#">Mid-Atlantic</a> Travelers</p>');
    html.append('<p>Interested in <a class="btn btn-warning" href="#">Foodie</a> <a class="btn btn-warning" href="#">Wildlife</a> <a class="btn btn-default" href="#">+ Add Interest</a></p>');
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
    html.append(filterGroup);
    return(html);
  },
  filterListener: function() {
    $('#filterLocation').change(function() {
      var val = $('#filterLocation option:selected').val();
      var $cards = $(".card-text");
      console.log("Filter Changed!");

      $cards.each(function(index, el){
        $el = $(el);
        if (val === 'All') {
          $el.parents(':eq(1)').show();
        } else if ($el.text() != val) {
          $el.parents(':eq(1)').hide();
        } else if ($el.text() == val) {
          $el.parents(':eq(1)').show();
        }
      });
    });
  }
};
