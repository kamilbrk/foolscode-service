var cache = require('memory-cache');
var User = require('./user');

module.exports = exports = new UserRepository();

function UserRepository() {
  this.cache = cache;
  this.cache.users = this.cache.users || [];
}

// Get all users
UserRepository.prototype.getAll = function() {
  return this.cache.users;
};

// Add a user to the repository
UserRepository.prototype.register = function(username, password, key) {
  var user = new User(username, password, key);
  this.cache.users.push(user);
};

// Get a user by ID
UserRepository.prototype.getById = function(id) {
  id = id.toLowerCase();
  for(var i = 0; i < this.cache.users.length; i++) {
    var user = this.cache.users[i];

    if (user.getId() === id) {
      return user;
    }
  }
};
