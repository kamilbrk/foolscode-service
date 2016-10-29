var express = require('express');
var users = require('../main/user-repository');

var router = express.Router();

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

module.exports = exports = router;
