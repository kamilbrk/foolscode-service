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

    // Take the first 10 bits as the drunk value (1-1,000)
    // and the last 22 bits as the time passed since the key was generated
    var allBits = decrypted.toString(2);

    // Make sure the value is 32 bits (smaller numbers could return less)
    while (allBits.length < 32) {
      allBits = '0' + allBits;
    }

    // Parse the two values
    var alcLvl = parseInt(allBits.substr(0, 10), 2);
    var seconds = parseInt(allBits.substr(10, 22), 2);

    // The limit right now is < 0.6
    var isDrunkEnough = alcLvl < 600;

    // The key also has to have been generated within the last 5 mins
    var timeCreated = userKey.time + seconds;
    var currentTime = new Date().getTime();
    var isValid = currentTime - timeCreated <= FiveMins;

    // Return the result
    callback({
      isDrunkEnough: isDrunkEnough,
      isValid: isValid
    });
  });
};



// Decrypt the provided value into a 32 bit int
DrunkCalculator.prototype.decrypt = function(encryptedValue, key, callback) {
  //  do things
  callback("stuff");
};
