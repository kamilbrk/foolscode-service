(function () {
  'use strict';

  angular
    .module('app.register')
    .controller('RegisterCtrl', RegisterCtrl);



  function RegisterCtrl ($http, QRCode) {
    var reg = this;

    reg.user = {
      // name: '',
      // email: ''
      // code: ''
    };

    var _qr;
    reg.send = send;

    _setupQr();




    function send () {
      if (reg.form.$valid) {
        console.log('Sending over to /api/register:', reg.user);

        $http.post('/api/register', reg.user)
          .then(function (response) {
            console.log('Response:', response);
          })
      }
      else {
        console.log('Invalid');
      }
    };

    function _setupQr () {
      _qr = new QRCode(document.querySelector('#qrcode'), {
        text: 'qwertyuiop'
      });
    }

  }

})();
