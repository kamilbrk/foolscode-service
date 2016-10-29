var express = require('express');
var users = require('../main/user-repository');

var router = express.Router();

// Get all users (just a utility for development, nothing to see here folks)
router.get('/', function(req, res) {
  res.send(users.getAll());
});

// Register a new account
router.post('/register', function(req, res) {
  // Extract stuff from query params
  var username = req.query.username;
  var password = req.query.password;
  var key = req.query.key;

  // Create the user
  users.register(username, password, key);

  // Send back 200 because why not
  res.status(200).send();
});

// Login to an account
router.post('/login', function(req, res) {
  // Extract stuff from query params
  var username = req.query.username;
  var password = req.query.password;

  // Retrieve user
  var user = users.getById(username);

  if (!user) {
    res.status(400).send();
  }

  // Check the password
  if (user.authenticate(password)) {
    // Worlds worst authentication
    res.status(200).send();
  } else {
    res.status(400).send();
  }
});

module.exports = exports = router;
