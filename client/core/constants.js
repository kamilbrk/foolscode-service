(function () {
  'use strict';
  /* global $:false, _:false, QRCode:false, Chartist:false */


  angular
    .module('app.core')
    // .constant('$', $)
    // .constant('_', _)
    .constant('QRCode', QRCode)
    .constant('Chartist', Chartist);

})();
