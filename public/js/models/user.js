var User = function(info) {
  console.log(info);
  this.name = info.name;
  this.photo = info.photo;
  // this.email = info.local.email;
  this.bio = info.bio;
  this.interests = info.interests;
  this.id = info._id;
  this.location = info.location;
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
  // something (in tunr we had fetchSongs, update, reload)
  queryLocation: function() {
    // somehow get location from filter options and use here

    // trying to get this package to work https://www.npmjs.com/package/json-query
    // var data = User.fetch();
    console.log("queryLocation");
    console.log(data);
    console.log(jsonQuery('loaction=Mid-Atlantic', {data: data}));
  }
};
