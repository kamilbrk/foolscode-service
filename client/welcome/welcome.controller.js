(function () {
  'use strict';

  angular
    .module('app.welcome')
    .controller('WelcomeCtrl', WelcomeCtrl);



  function WelcomeCtrl () {

    var wel = this;


    console.log('WelcomeCtrl here');

  }

})();
