"use strict";

var express = require('express');
var app = express();
var routers = {};

// Static files
app.use(express.static(__dirname + '/../../client'));

module.exports = exports = app;
