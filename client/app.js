(function () {
  'use strict';

  console.info('Raging Alcoholic Permission Entry System');
  console.log('');

  angular
    .module('app', [
      'app.core',
      'app.layout',
      'app.welcome',
      'app.register',
      'app.sign-in',
      'app.verify',
      'app.users',
      'app.investments'
    ]);

})();
