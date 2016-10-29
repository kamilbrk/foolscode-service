(function () {
  'use strict';

  angular
    .module('app.layout')
    .controller('ShellCtrl', ShellCtrl);



  /* @ngInject */
  function ShellCtrl ($rootScope, $scope) {
    var app = this;

    app.signedIn = false;

    app.signIn = function () {
      app.signedIn = true;
    };

    app.signOut = function () {
      app.signedIn = false;
    };

  }

})();
