(function () {
  'use strict';

  angular
    .module('app.core')
    .config(configLayout);



  function configLayout ($mdIconProvider, $mdThemingProvider) {
    
    $mdIconProvider
      .icon('menu', 'assets/images/menu.svg', 24)
      .icon('logo', 'assets/images/logo.svg', 24)
      .icon('ambulance', 'assets/images/ambulance.svg', 64);
    
    $mdThemingProvider.theme('default')
      .primaryPalette('indigo')
      .accentPalette('red');
  }

})();
