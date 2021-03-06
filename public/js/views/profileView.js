var ProfileView = function(user) {
  this.user = user;
  this.$profileContainer = $('<div class="profile-container"></div>');
};

ProfileView.prototype = {
  renderProfile: function(user) {
    var self = this;
    self.$profileContainer.empty();
    var $bar = $("<div id='breadcrumb-container'></div>");
    var $left = $('<section id="left-container"></section>');
    var $right = $('<section id="right-container"></section>');
    $left.append("<img id='profile-photo' src='" + user.photo +"'>");
    $left.append("<h3>Interests</h3>");
    var unordered = $('<ul id="interests"></ul>');
    for (var i=0; i < user.interests.length; i++) {
      unordered.append('<li class="btn btn-warning">'+ user.interests[i] +'</li>');
    }
    $bar.append("<div><a href='/'><img src='/images/arrow.png' class='arrow'></a><span><a href='/' class='breadcrumb-inactive'>Home</a></span>" + "<span class='breadcrumb-inactive'> / </span>" + "<span id='breadcrumb-active'>Profile</span></div>");
    $left.append(unordered);
    $right.append("<h1>" + user.name + "</h1>");
    $right.append("<h4><img src='/images/pin.png' class='pin'>" + " " + user.location + "</h4>");
    $right.append("<div class='rule'></div>");
    $right.append("<p>" + user.bio + "</p>");
    $right.append("<a href='mailto:" + user.email + "'><button class='button' id='contact-button'>Contact Me</button></a>");
    $right.append("<button class='button' id='edit-button'>Edit Profile</button>");
    self.$profileContainer.append($bar);
    self.$profileContainer.append($left);
    self.$profileContainer.append($right);
    $(".row").append(self.$profileContainer);
    var editButton = self.$profileContainer.find("#edit-button");

    editButton.on("click", function() {
      self.renderEditForm(self.user);
    });

    // show edit controls
    if (currentUser.id != user.id) {
      $("#edit-button").hide();
    }

  },

  // this function is really long... I'd break it up into smaller pieces...
  renderSimilarUsers: function(user) {
    var $similarUsers = $("<div id='similar-users'></div>");
    var $similarUsersCardContainer = $("<div id='similar-users-container'></div>");
    $similarUsers.append("<h2>Similar Users</h2>");
    $similarUsers.append($similarUsers);
    User.fetch().then(function(users){
      // console.log(users);
      var filteredUsers = [];
      $(users).each(function(index, el) {
          if ((user.id !== el.id) && (user.location === el.location)) {
              filteredUsers.push(el);
          }
      });

      // to me this almost feels like it should be instantiating another sub-view
      var cardPositions = ["left","center","right"];
      // if (filteredUsers.length <= 3){
      //   for (var i = 0; i < filteredUsers.length; i++) {
      //     var $userCard = $('<div class="card"></div>');
      //     // console.log(users[i]);
      //     var usersBlock = $('<div class="card-block"></div>');
      //     $userCard.append('<img class="img-circle" src="' + filteredUsers[i].photo + '">');
      //     $userCard.attr('id', filteredUsers[i].id);
      //     $userCard.attr('class', 'card ' + cardPositions[i]);
      //     usersBlock.append('<h2 class="card-title">' + filteredUsers[i].name + '</h2>');
      //     usersBlock.append('<div class="card-text"><img src="/images/pin.png" class="pin"> <p class="location-text">'+ filteredUsers[i].location +'</p></div>');
      //     var unordered = $('<ul></ul>');
      //     // console.log(users[i].interests);
      //     for (var j = 0; j < filteredUsers[i].interests.length; j++) {
      //       unordered.append('<li class="btn btn-warning">'+ filteredUsers[i].interests[j] +'</li>');
      //     }
      //     usersBlock.append(unordered);
      //     $userCard.append(usersBlock);
      //     $similarUsersCardContainer.append($userCard);
      //
      //   }
      // $similarUsers.append($similarUsersCardContainer);
      // }

        var index = 0;
        while (index < 3) {
          var $userCard = $('<div class="card"></div>');
          // console.log(users[i]);
          var usersBlock = $('<div class="card-block"></div>');
          $userCard.append('<img class="img-circle" src="' + filteredUsers[index].photo + '">');
          $userCard.attr('id', filteredUsers[index].id);
          $userCard.attr('class', 'card ' + cardPositions[index]);
          usersBlock.append('<h2 class="card-title">' + filteredUsers[index].name + '</h2>');
          usersBlock.append('<div class="card-text"><img src="/images/pin.png" class="pin"> <p class="location-text">'+ filteredUsers[index].location +'</p></div>');
          var unordered = $('<ul></ul>');
          // console.log(users[i].interests);
          for (var j = 0; j < filteredUsers[index].interests.length; j++) {
            unordered.append('<li class="btn btn-warning">'+ filteredUsers[index].interests[j] +'</li>');
          }
          usersBlock.append(unordered);
          $userCard.append(usersBlock);
          $similarUsersCardContainer.append($userCard);

          $similarUsers.append($similarUsersCardContainer);
          index++;
        }

    });
    $("body").append($similarUsers);
  },

  renderEditForm: function(user){

    var self = this;
    var container = $(self.$profileContainer.find('#right-container'));
    container.append(self.profileEditTemplate(user));
    container.append("<button class='updateProfile btn btn-success'>Update Profile</button>");
    container.append("<button class='deleteProfile btn btn-danger' data-toggle='modal' data-target='#myModal'>Delete Profile</button>");
    container.children().not(".updateProfile, .deleteProfile, .edit-form").slideUp("fast");
    self.$profileContainer.find(".updateProfile").on("click", function() {
      self.updateProfile();
    });
    self.$profileContainer.find(".final-delete").on("click", function() {

      self.user.delete().then(function() {
        $('body').removeClass('modal-open');
        $('.modal-backdrop').remove();
        $('main').empty();
        window.location.href = "/logout";
      });
    });
    var interestsList = user.interests;

    $(interestsList).each(function(index, el) {
      $("input[value=" + el + "]").first().click();
    });

    $("select").val(user.location);

  },

  profileEditTemplate: function(user){

    var html = $("<div class='edit-form'>");
    /*jshint multistr: true */
    html.append(
      '<div class="form-group"><label for="name">Name</label> \
      <input class="form-control" type="text" name="name" id="name" placeholder="i.e. Carol Grimes" value="' + user.name + '"> \
      </div><div class="form-group"><label for="location">Current Location</label> \
      <select name="location" class="form-control"> \
      <option>North West</option><option>West</option><option>South West</option><option>Mid-West</option><option>South East</option><option>Mid-Atlantic</option><option>North East</option> \
      </select></div> \
      <div class="form-group"><label for="photo">Profile Picture</label> \
      <input class="form-control" type="text" name="photo" id="photo" placeholder="http://example.com/myImage.jpg" value="' + user.photo + '"></div> \
      <div class="form-group"><label for="bio">Biography</label> \
      <textarea class="form-control" name="bio" id="bio" placeholder="A little bit about me..." rows="3" >' + user.bio +  '</textarea></div> \
      <div><label for="interests">Interests</label></div><div class="form-group"> \
      <div class="btn-group" data-toggle="buttons"><label class="btn btn-primary"> \
      <input type="checkbox" name="interests" value="Foodie" autocomplete="off"> Foodie </label><label class="btn btn-primary"> \
      <input type="checkbox" name="interests" value="Hiking" autocomplete="off"> Hiking </label><label class="btn btn-primary"> \
      <input type="checkbox" name="interests" value="Art" autocomplete="off"> Art </label><label class="btn btn-primary"> \
      <input type="checkbox" name="interests" value="History" autocomplete="off"> History </label><label class="btn btn-primary"> \
      <input type="checkbox" name="interests" value="Wildlife" autocomplete="off"> Wildlife</label><label class="btn btn-primary"> \
      <input type="checkbox" name="interests" value="Adventure" autocomplete="off"> Adventure </label><label class="btn btn-primary"> \
      <input type="checkbox" name="interests" value="Festivals" autocomplete="off"> Festivals </label><label class="btn btn-primary"> \
      <input type="checkbox" name="interests" value="Culture" autocomplete="off"> Culture </label></div></div><div class="form-group"> \
      <label for="email">Email</label><input class="form-control" type="text" name="email" id="email" value="' + user.email + '"></div> \
      \
      <div class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"> \
      <div class="modal-dialog" role="document"> \
      <div class="modal-content"> \
      <div class="modal-header"> \
      <button id="close-btn" type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button> \
      <h4 class="modal-title danger" id="myModalLabel">CONFIRM ACCOUT DELETION</h4></div> \
      <div class="modal-body">We are so sad to see you go. But if you must know that your account will be deleted permanently. Are you sure you want to complete this action?</div> \
      <div class="modal-footer"> \
      <input type="submit" class="btn btn-danger delete final-delete" value="Delete Profile"> \
      </div></div></div></div>'
    );

    return(html);
  },

  updateProfile: function(){
    var self = this;
    var interests = [];
    var checkedBoxs = $("input[type='checkbox']:checked");
    for (i=0; i < checkedBoxs.length; i++) {
      interests.push(checkedBoxs.eq(i).val());
    }
    var data = {
      name: $('input[name=name]').val(),
      location: $('select[name=location] option:selected').val(),
      photo: $('input[name=photo]').val(),
      bio: $('textarea[name=bio]').val(),
      local: {
        email: $('input[name=email]').val(),
      },
      interests: interests
    };
    self.user.update(data).then(function() { self.renderProfile(self.user); });
  },
  deleteProfile: function() {
    console.log('POOF Profile Deleted!');
    var self = this;
    self.user.delete().then(function() {
      console.log(user);
      console.log("something");
      loadUserIndexView();
    });
  }
};
