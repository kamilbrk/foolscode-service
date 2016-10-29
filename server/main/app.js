var express = require('express');
var Skip32 = require('skip32').Skip32;
var DrunkCalculator = require('./drunk-calculator');
var users = require('./user-repository');
var app = express();
var routers = {};

// Static files
app.use(express.static(__dirname + '/../../client'));

// Account Controller
var router = express.Router();

router.get('/encrypt', function(req, res) {
  var key = 'qwertyuiop';
  var num = +req.query.input;

  var crypt = new Skip32(key);
  var result = crypt.encrypt(num);

  res.send({
    result: result
  });
});


router.get('/decrypt', function(req, res) {
  var key = 'qwertyuiop';
  var num = +req.query.input;

  var crypt = new Skip32(key);
  var result = crypt.decrypt(num);

  res.send({
    result: result
  });
});

router.get('/register', function(req, res) {
  var num = +req.query.num;

  var binary = num.toString(2);

  while (binary.length < 32) {
    binary = '0' + binary;
  }

  var bal = binary.substr(0, 10);
  var time = binary.substr(10, 22);

  res.send({
    bal: {
      bin: bal,
      dec: parseInt(bal, 2)
    },
    time: {
      bin: time,
      dec: parseInt(time, 2)
    }
  });
});

// Attach the account router
app.use('/account', router);

module.exports = exports = app;
