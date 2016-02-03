var User = function(info) {
  this.name         = info.name || '';
  this.photo        = info.photo || '';
  this.email        = info.local.email || '';
  this.bio          = info.bio || '';
  this.interests    = info.interests || '';
  this.id           = info._id || '';
  this.location     = info.location || '';
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

    // When a user has updated their profile the modified properties are saved to the db and are returned in the 'newData' object and each of its properties are being stored in the corresponding client side user object property

    for(var property in newData) {
      if (property === "local") {
        this.email = newData[property].email || '';
      }
      this[property] = newData[property] || '';
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


// var me=[];
// for (var variable in object) {
//   if (object.hasOwnProperty(variable)) {
//
//   }
// }
