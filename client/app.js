(function () {
  'use strict';

  console.info('Raging Alcoholic Permission Entry System v0.1');
  console.log('')

  angular
    .module('app', [
      'app.core',
      'app.layout',
      'app.welcome',
      'app.register'
    ]);

})();
