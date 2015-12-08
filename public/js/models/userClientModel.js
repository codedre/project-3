var User = function(info) {
  // take 'info' passed when function is called and store it in 'this'
  //this.name = info.name
};

User.fetch = function() {
  var req = $.getJSON("/user/index.json") // REMOVE .json when appropriate
  .then(function(res) {

  }).fail(function(res) {
    console.log("js failed to load");
  });
  return req;
};

User.prototype = {
  // something (in tunr we had fetchSongs, update, reload)
};
