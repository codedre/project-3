var User = function(info) {
  // I'm seeing a lot of repeated code, you could either use a method here to
  // capture the structure, and call it for each property, or, use a shorter form:
  // this.name   = info.name || '';
  // this.photo  = info.photo || '';
  // this.email  = info.email || '';
  // this.bio    = info.bio || '';
  undefined !== info.name ? this.name = info.name : this.name = '';
  undefined !== info.photo ? this.photo = info.photo : this.photo = '';
  undefined !== info.local ? this.email = info.local.email : this.email = '';
  undefined !== info.bio ? this.bio = info.bio : this.bio = '';
  undefined !== info.interests ? this.interests = info.interests : this.interests = '';
  undefined !== info._id ? this.id = info._id : this.id = '';
  undefined !== info.location ? this.location = info.location : this.location = '';
};

User.fetch = function() {
  var req = $.getJSON("/user/index.json") // REMOVE .json when appropriate
  .then(function(res) {
    var users = [];
    for(var i = 0; i < res.length; i++) {
      users.push(new User(res[i]));
    }
    return users;
  }).fail(function(res) {
    console.log("js failed to load");
  });
  return req;
};

User.prototype = {
  update: function(userData) {
    var self = this;
    var url = '/user/' + this.id;
    var request = $.ajax({
      url: url,
      type: 'PATCH',
      dataType: 'json',
      data: userData
  })
  .then(function(updatedUserInfo) {
    self.reload(updatedUserInfo);
  });
  return request;
},  // indentation is off here!
  reload: function(newData) {
    // this code is a bit complex, I'd document what it's doing and why
    // I also suspect there's an easier way to do this
    for(var attrname in newData) {
      if (attrname === "local") {
        if (null !== newData[attrname].email) {
          this.email = newData[attrname].email;
        } else {
          this.email = '';
        }
      }
      null !== newData[attrname] ? this[attrname] = newData[attrname] : this[attrname] = '';
    }
  },
  delete: function() {
    var self = this;
    var url = '/user/' + this.id;
    var request = $.ajax({
      url: url,
      type: 'DELETE',
    });
    return request;
  },
  logout: function() {
    var url = '/logout';
    var request = $.ajax({
      url: url,
      type: 'GET'
    });
    return request;
  }
};
