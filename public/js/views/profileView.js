var ProfileView = function(user) {
  this.user = user;
  this.$profileContainer = $('<div class="profile-container"></div>');
};

ProfileView.prototype = {
  renderProfile: function(user) {
    var self = this;
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
    $right.append("<button id='edit-profile'>Edit Profile</button>");
    self.$profileContainer.append($bar);
    self.$profileContainer.append($left);
    self.$profileContainer.append($right);
    $(".row").append(self.$profileContainer);
  }
};
