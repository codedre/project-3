var User = function(info) {
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
},
  reload: function(newData) {
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
  }
};
