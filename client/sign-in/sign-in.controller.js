(function () {
  'use strict';

  angular
    .module('app.sign-in')
    .controller('SignInCtrl', SignInCtrl);



  function SignInCtrl ($state, $mdDialog, API, User, QRCode) {
    var sig = this;

    sig.data = {};
    sig.send = send;



    function send () {
      if (sig.form.$valid) {
        
        console.log('Signing in:', sig.data);

        return API.signIn(sig.data.username, sig.data.password)
          .then(function (response) {
            console.log('Response:', response);
            $state.go('verify');

            // new page
            // please enter your drunk factor auth code
            // type it
            // send to /api/auth/decrypt
            //   username string
            //   code string
            //   200 ok if drunk enough
            //   400 if not enough
            
          }, function (error) {
            wrongPassword();

            console.log('Error!', error);
          });
      }
      else {
        console.log('Invalid');
      }
    }

    function wrongPassword () {

      sig.data.password = null;

      $mdDialog.show(
        $mdDialog.alert()
          .clickOutsideToClose(true)
          .title('Error')
          .textContent('Username or password is incorrect.')
          .ariaLabel('Wrong username or password alert')
          .ok('I\'ll try again')
      );
    }
  }

})();
