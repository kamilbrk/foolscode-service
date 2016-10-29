(function () {
  'use strict';

  angular
    .module('app.core')
    .config(configLayout);



  function configLayout ($mdIconProvider, $mdThemingProvider) {
    
    $mdIconProvider
      .defaultIconSet("./assets/images/avatars.svg", 128)
      .icon("menu"       , "./assets/images/menu.svg"        , 24)
      .icon("share"      , "./assets/images/share.svg"       , 24)
      .icon("google_plus", "./assets/images/google_plus.svg" , 512)
      .icon("hangouts"   , "./assets/images/hangouts.svg"    , 512)
      .icon("twitter"    , "./assets/images/twitter.svg"     , 512)
      .icon("phone"      , "./assets/images/phone.svg"       , 512);
    
    $mdThemingProvider.theme('default')
      .primaryPalette('indigo')
      .accentPalette('red');
  }

})();
