(function () {
  'use strict';

  angular
    .module('app.verify')
    .controller('VerifyCtrl', VerifyCtrl);



  function VerifyCtrl ($state, $q, $mdDialog, API, User, QRCode) {
    var ver = this;

    if (!User.isSignedIn()) {
      // this should not be necessary - resolve in route config, but you know, just in case
      $state.go('sign-in');
      return;
    }

    ver.data = {
      username: User.getUsername()
    };
    ver.send = send;


    function send () {
      if (ver.form.$valid) {

        console.log('Verifying:', ver.data);

        return API.verify(ver.data.username, ver.data.key)
          .then(function (response) {
            console.log('Response:', response);


            if (response && response.alcoholLevel) {
              $state.go('investments', { level: response.alcoholLevel });
            }
            else {
              showAlert(); 
            }
            
          }, function (error) {
            console.log('Error!', error);

            showAlert();
          });
      }
      else {
        console.log('Invalid');
      }
    }

    function showAlert () {
      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('You are not drunk enough!')
          .textContent('Go and get some drink!')
          .ariaLabel('Not drunk enough!')
          .ok('Will do!')
      );
    }
  }

})();
