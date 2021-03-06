var express = require('express');
var app = express();
// Routers
var accountRouter = require('../routes/account-routes');
var authRouter = require('../routes/auth-routes');
var users = require('./user-repository');

// Static files
app.use(express.static(__dirname + '/../../client'));

// Vendor files straight from node_modules
app.use('/vendor', express.static(__dirname + '/../../node_modules'));


// Attach the account router
app.use('/api/account', accountRouter);
app.use('/api/auth', authRouter);

// register a default user
users.register("harambe","hackout","qwertyuiop");

module.exports = exports = app;
