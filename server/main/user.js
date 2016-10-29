module.exports = exports = User;

function User(username, password, key) {
  this.username = username;
  this.password = password;
  this.key = key;
  this.created = new Date().getTime();
}

User.prototype.authenticate = function(password) {
  return this.password === password;
};

User.prototype.getId = function() {
  return this.username.toLowerCase();
};
