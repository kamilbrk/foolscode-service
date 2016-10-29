var express = require('express');
var Skip32 = require('skip32').Skip32;
var DrunkCalculator = require('../main/drunk-calculator');
var users = require('../main/user-repository');

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
  var calculator = new DrunkCalculator();
  var username = req.query.user;
  var key = req.query.key;

  var user = users.getById(username);  

  calculator.calculate(user, key, function(result){
    if (result.isDrunkEnough && result.isValid)  { 
      res.status(200).send();
    }
    else{
      res.status(401).send();
    }
  })
});

module.exports = exports = router;
