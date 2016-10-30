var express = require('express');
var Skip32 = require('skip32').Skip32;
var DrunkCalculator = require('../main/drunk-calculator');
var users = require('../main/user-repository');

var router = express.Router();

router.get('/decrypt', function(req, res) {
  var calculator = new DrunkCalculator();
  var username = req.query.user;
  var key = parseInt(req.query.key, 16);

  var user = users.getById(username);

  res.set('Content-Type', 'application/json');

  calculator.calculate(user, key, function(result){
    if (result.isDrunkEnough && result.isValid)  {
      console.log(result.isDrunkEnough, result.isValid, result.alcoholLevel);
      res.status(200).send({
        alcoholLevel: result.alcoholLevel
      });
    }
    else{
      res.status(401).send({
        alcoholLevel: result.alcoholLevel
      });
    }
  });
});

module.exports = exports = router;
