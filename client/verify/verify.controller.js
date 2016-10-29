(function () {
  'use strict';

  angular
    .module('app.verify')
    .controller('VerifyCtrl', VerifyCtrl);



  function VerifyCtrl ($state, $mdDialog, API, User, QRCode) {
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
            

            showAlert();


            // new page
            // please enter your drunk factor auth code
            // type it
            // send to /api/auth/decrypt
            //   username string
            //   code string
            //   200 ok if drunk enough
            //   400 if not enough
            //   
            // 
            // 
          }, function (error) {
            console.log('Error!', error);
          });
      }
      else {
        console.log('Invalid');
      }
    }

    function showAlert (success) {
      $mdDialog.show(
        $mdDialog.alert()
          .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('This is an alert title')
          .textContent('You can specify some description text in here.')
          .ariaLabel('Alert Dialog Demo')
          .ok('Got it!')
          .targetEvent(ev)
      );
    }
  }

})();
