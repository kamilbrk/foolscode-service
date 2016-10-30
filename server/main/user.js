module.exports = exports = User;

function User(username, password, key) {
  this.username = username;
  this.password = password;
  this.key = key;
  // Hardcode the creation date for now 
  this.created = new Date(1477872000000);
}

User.prototype.authenticate = function(password) {
  return this.password === password;
};

User.prototype.getId = function() {
  return this.username.toLowerCase();
};
