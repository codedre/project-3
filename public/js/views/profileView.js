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
    $bar.append("<div><a href='/'><img src='/images/arrow.png' class='arrow'></a><span><a href='/' class='breadcrumb-inactive'>Home</a></span>" + "<span class='breadcrumb-inactive'> / </span>" + "<span><a href='' id='breadcrumb-active'>Profile</a></span></div>");
    $left.append(unordered);
    $right.append("<h1>" + user.name + "</h1>");
    $right.append("<h4><img src='/images/pin.png' class='pin'>" + " " + user.location + "</h4>");
    $right.append("<div class='rule'></div>");
    $right.append("<p>" + user.bio + "</p>");
    $right.append("<button id='edit-profile'>Edit Profile</button>");
    self.$profileContainer.append($bar);
    self.$profileContainer.append($left);
    self.$profileContainer.append($right);
    $(".row").append(self.$profileContainer);
    var editButton = self.$profileContainer.find("#edit-profile");

    editButton.on("click", function() {
      self.renderEditForm(self.user);
    });

  },
  renderEditForm: function(user){

    var self = this;
    var container = $(self.$profileContainer.find('#right-container'));
    container.append("<button class='updateProfile btn btn-success'>Update Profile</button>");
    container.append("<button class='deleteProfile btn btn-danger'>Delete Profile</button>");
    container.append(self.profileEditTemplate(user));
    container.children().not(".updateProfile, .deleteProfile, .edit-form").slideUp("fast");
    self.$profileContainer.find(".updateProfile").on("click", function() {
      self.updateProfile();
    });

  },

  profileEditTemplate: function(user){

    var html = $("<div class='edit-form'>");
    // html.append('<label for="name">Name</label><input class="form-control" type="text" name="name" id="name" placeholder="i.e. Carol Grimes" value="' + user.name + '">');
    html.append('<div class="form-group"><label for="name">Name</label><input class="form-control" type="text" name="name" id="name" placeholder="i.e. Carol Grimes" value="' + user.name + '"></div><div class="form-group"><label for="location">Current Location</label><select name="location" multiple class="form-control"><option>North West</option><option>West</option><option>South West</option><option>Mid-West</option><option>South East</option><option>Mid-Atlantic</option><option>North East</option></select></div><div class="form-group"><label for="photo">Profile Picture</label><input class="form-control" type="text" name="photo" id="photo" placeholder="http://example.com/myImage.jpg" value="' + user.photo + '"></div><div class="form-group"><label for="bio">Biography</label><textarea class="form-control" name="bio" id="bio" placeholder="A little bit about me..." rows="3" >' + user.bio +  '</textarea></div><div><label for="interests">Interests</label></div><div class="form-group"><div class="btn-group" data-toggle="buttons"><label class="btn btn-primary"><input type="checkbox" name="interests" value="Foodie" autocomplete="off"> Foodie </label><label class="btn btn-primary"><input type="checkbox" name="interests" value="Hiking" autocomplete="off"> Hiking </label><label class="btn btn-primary"><input type="checkbox" name="interests" value="Art" autocomplete="off"> Art </label><label class="btn btn-primary"><input type="checkbox" name="interests" value="History" autocomplete="off"> History </label><label class="btn btn-primary"><input type="checkbox" name="interests" value="Wildlife" autocomplete="off"> Wildlife</label><label class="btn btn-primary"><input type="checkbox" name="interests" value="Adventure" autocomplete="off"> Adventure </label><label class="btn btn-primary"><input type="checkbox" name="interests" value="Festivals" autocomplete="off"> Festivals </label><label class="btn btn-primary"><input type="checkbox" name="interests" value="Music" autocomplete="off"> Culture </label></div></div><div class="form-group"><label for="email">Email</label><input class="form-control" type="text" name="email" id="email" value="' + user.email + '"></div><input class="btn btn-success" type="submit" value="Update Profile"><button type="button" class="btn btn-danger delete" data-toggle="modal" data-target="#myModal">Delete Profile</button>');
    return(html);

  },

  updateProfile: function(){
    var self = this;
    var test = $('input:checkbox[name=interests]:checked').val();
    console.log(test );
    var data = {
      name: $('input[name=name]').val(),
      location: $('select[name=location] option:selected').val(),
      photo: $('input[name=photo]').val(),
      bio: $('textarea[name=bio]').val(),
      local: {
        email: $('input[name=email]').val(),
      },
      interests: $('input[name=interests]').val()
    };
    self.user.update(data).then(function() { self.renderProfile(self.user); });
  }
};
