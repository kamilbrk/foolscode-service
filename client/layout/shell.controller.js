(function () {
  'use strict';

  angular
    .module('app.layout')
    .controller('ShellCtrl', ShellCtrl);



  /* @ngInject */
  function ShellCtrl ($state, $mdSidenav, User) {
    var app = this;

    app.signedIn = User.isSignedIn;
    app.signOut = signOut;
    // app.toggleSidebar = toggleSidebar;

    function signOut () {
      User.signOut();
      $state.go('welcome');
    };

    // function toggleSidebar () {
    //   $mdSidenav('left').toggle();
    // }
  }

})();
