var UserView = function(user) {
  this.user = user;
  this.$userCard = $('<div class="card col-xs-12 col-md-3 col-lg-4"></div>');
  this.$searchContainer = $('<div class="search-container"></div>');

  if (this.user.id == currentUser._id){
    currentUser = this.user;
  }

  $(this.$userCard).on("click", function() {
    handleClickEvent(user);
  });

  $(".profile-btn").on("click", function() {
    handleClickEvent(currentUser);
  });

  function handleClickEvent(user){
    $('.row').empty();
    var profileView = function() {
      var renderProfile = new ProfileView(user);
      renderProfile.renderProfile(user);
      renderProfile.renderUsersLikeYou(user);
    };
    profileView();
  }

  $('#filterLocation').on("change", function() {
    var val = $('#filterLocation option:selected').val();
    var $cards = $(".location-text");

    $cards.each(function(index, el){
      $el = $(el);
      if (val === 'All') {
        $el.parents(':eq(2)').show();
      } else if ($el.text() != val) {
        $el.parents(':eq(2)').hide();
      } else if ($el.text() == val) {
        $el.parents(':eq(2)').show();
      }
    });
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
    block.append('<div class="card-text"><img src="/images/pin.png" class="pin"> <p class="location-text">'+ user.location +'</p></div>');
    var unordered = $('<ul></ul>');
    for (var i=0; i < user.interests.length && i < 5; i++) {
      unordered.append('<li class="btn btn-warning">'+ user.interests[i] +'</li>');
    }
    block.append(unordered);
    self.$userCard.append(block);
    $(".user-container").append(self.$userCard);
  },
  clearUsers: function() {
    $(".user-container").html("");
  }
};
