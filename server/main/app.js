var express = require('express');
var DrunkCalculator = require('drunk-calculator');
var users = require('user-repository');
var app = express();
var routers = {};

// Static files
app.use(express.static(__dirname + '/../../client'));

// Account Controller
var router = express.Router();

router.get('/register', function(req, res) {
  res.status(200).send('Register!');
});

// Attach the account router
app.use('/account', router);

module.exports = exports = app;
