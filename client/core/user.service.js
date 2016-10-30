(function () {
  'use strict';

  angular
    .module('app.core')
    .factory('User', User);



  function User ($q) {

    var _initialised = false;

    var _username;
    var _signedIn = false;

    function signIn (username) {
      _username = username;
      _signedIn = true;

      save();
    }

    function signOut () {
      _username = null;
      _signedIn = false;

      save();
    }

    function isSignedIn () {
      return _signedIn;
    }

    function getUsername () {
      return _username;
    }

    function init () {
      if (!_initialised) {
        _signedIn = localStorage.getItem('signedIn');
        _username = localStorage.getItem('username');
        _initialised = true;
      }
    }

    function save () {
      localStorage.setItem('signedIn', _signedIn);
      localStorage.setItem('username', _username);
    }

    init();

    return {
      signIn: signIn,
      signOut: signOut,
      isSignedIn: isSignedIn,
      getUsername: getUsername
    };
  }

})();
