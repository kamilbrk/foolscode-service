module.exports = exports = User;

function User(username, password, key) {
  this.username = username;
  this.userId = username.toLowerCase();
  this.password = password;
  this.key = key;
  this.created = new Date();
}

User.prototype.authenticate = function(password) {
  return this.password === password;
};

User.prototype.getId = function() {
  return this.userId;
};
