(function () {
  'use strict';

  angular
    .module('app.register')
    .controller('RegisterCtrl', RegisterCtrl);



  function RegisterCtrl ($http, QRCode) {
    var reg = this;

    reg.data = {
      // username: '',
      // password: ''
      // key: ''
    };

    var _qr;

    reg.send = send;
    reg.firstStep = firstStep;
    reg.secondStep = secondStep;
    reg.step === 1;

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

        return $http
          .post('/account/register', reg.data)
          .then(function (response) {
            console.log('Response:', response);
          }, function (error) {
            console.log('Error!', error);
          });
      }
      else {
        console.log('Invalid');
      }
    };

    function _setupQr () {

      reg.data.key = Math.random().toString(36).substr(2, 10);
      
      if (!_qr) {
        _qr = new QRCode(document.querySelector('#qrcode'), reg.data.key);
      } else {
        _qr.clear();
        _qr.makeCode(reg.data.key);
      }
    }

  }

})();

// 07 860 033815
