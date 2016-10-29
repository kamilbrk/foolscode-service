var User = require('./user');

module.exports = exports = new UserRepository();

function UserRepository() {
  this.users = [];
}

// Add a user to the repository
UserRepository.prototype.register = function(username, password, key) {
  var user = new User(username, password, key);
  this.users.push(user);
};

// Get a user by ID
UserRepository.prototype.getById = function(id) {
  id = id.toLowerCase();
  for(var i = 0; i < this.users.length; i++) {
    var user = this.users[i];

    if (user.getId() === id) {
      return user;
    }
  }
};
