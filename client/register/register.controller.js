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
    var _key;
    reg.send = send;

    _setupQr();



    function send () {
      if (reg.form.$valid) {
        console.log('Sending over to /api/register:', reg.data);

        $http.post('/api/register', reg.data)
          .then(function (response) {
            console.log('Response:', response);
          })
      }
      else {
        console.log('Invalid');
      }
    };

    function _setupQr () {

      reg.data.key = Math.random().toString(36).substr(2, 10);

      _qr = new QRCode(document.querySelector('#qrcode'), {
        text: reg.data.key
      });

    }

  }

})();

// 07 860 033815
