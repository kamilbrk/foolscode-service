var Skip32 = require('Skip32');

module.exports = exports = DrunkCalculator;

var FiveMins = 5 * 60;

function DrunkCalculator() {
}

// Calculate how drunk the user is
// Returns a value between 0 and 1, with lower being more drunk
// We've calibrated that sober is around 0.75
DrunkCalculator.prototype.calculate = function(user, encryptedValue, callback) {
  // Get the user key
  var userKey = user.key;
  if (userKey.key) {
    throw 'User has no 2S2A key.';
  }

  // Decrypt the bits
  this.decrypt(encryptedValue, userKey, function(decrypted){

    var allBits = decrypted.toString(2);

    // Make sure the value is 32 bits (smaller numbers could return less)
    while (allBits.length < 32) {
      allBits = '0' + allBits;
    }

    // Parse the two values
    var alcoholLevel = parseInt(allBits.substr(0, 10), 2);
    var seconds = parseInt(allBits.substr(10, 22), 2);

    // The limit right now is < 0.6
    var isDrunkEnough = alcoholLevel < 600;

    // The key also has to have been generated within the last 5 mins
    var timeCreated = new Date(user.created.getTime() + seconds);
    var currentTime = new Date();
    var isValid = currentTime.getTime() - timeCreated.getTime() <= FiveMins;

    // Return the result
    callback({
      isDrunkEnough: isDrunkEnough,
      isValid: isValid,
      alcoholLevel: alcoholLevel
    });
  });
};

// Decrypt the provided value into a 32 bit int
DrunkCalculator.prototype.decrypt = function(encryptedValue, key, callback) {

  var spawn = require('child_process').spawn;

  var skipjackProc = spawn(__dirname + '\\skip32.exe', [key, encryptedValue, '0']);

  skipjackProc.stdout.on('data', function (data) {
    console.log('dec: ' + data);
    callback(+data);
  });
};
