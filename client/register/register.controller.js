(function () {
  'use strict';

  angular
    .module('app.register')
    .controller('RegisterCtrl', RegisterCtrl);



  function RegisterCtrl ($state, API, QRCode, User) {
    var reg = this;
    var _qr;

    reg.data = {};
    reg.optional = {};
    reg.send = send;
    reg.firstStep = firstStep;
    reg.secondStep = secondStep;
    reg.maxDate = new Date();

    firstStep();


    function firstStep () {
      reg.step = 1;
    }

    function secondStep () {
      if (reg.form.$valid) {
        reg.step = 2;
        _setupQr();
      }
    }


    function send () {
      if (reg.form.$valid) {

        if (!reg.data.key) {
          return;
        }

        console.log('Sending over to /api/register:', reg.data);

        return API.register(reg.data.username, reg.data.password, reg.data.key)
          .then(function (response) {
            console.log('Response:', response);

            User.signIn(reg.data.username);
            $state.go('verify');

          }, function (error) {
            console.log('Error!', error);
          });
      }
      else {
        console.log('Invalid');
      }
    };

    function _setupQr () {
      // reg.data.key = Math.random().toString(36).substr(2, 10);
      reg.data.key = 'qwertyuiop';

      if (!_qr) {
        _qr = new QRCode(document.querySelector('#qrcode'), reg.data.key);
      } else {
        _qr.clear();
        _qr.makeCode(reg.data.key);
      }
    }

  }

})();
