(function () {
  'use strict';

  angular
    .module('app.core')
    .service('User', User);



  function User () {

    var _username;
    var _signedIn = false;

    function signIn (username) {
      _username = username;
      _signedIn = true;
    }

    function signOut () {
      _username = null;
      _signedIn = false;
    }

    function isSignedIn () {
      return _signedIn;
    }

    function getUsername () {
      return _username;
    }

    return {
      signIn: signIn,
      signOut: signOut,
      isSignedIn: isSignedIn,
      getUsername: getUsername
    };
  }

})();
