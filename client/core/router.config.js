(function () {
  'use strict';

  angular
    .module('app.core')
    .run(runRouter)
    .config(configRouter);

  console.log('router.config.js here');


  function runRouter ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }


  function configRouter ($urlRouterProvider, $stateProvider) {
    console.log('config with states here');

    $urlRouterProvider.otherwise('/welcome');

    $stateProvider
      
      // Layout!
      .state('app', {
        abstract: true,
        templateUrl: 'layout/shell.html'
      })

      // Welcome page
      .state('welcome', {
        parent: 'app',
        url: '/welcome',
        templateUrl: 'welcome/welcome.html',
        controller: 'WelcomeCtrl as wel'
      })

      // Register page
      .state('register', {
        parent: 'app',
        url: '/register',
        templateUrl: 'register/register.html',
        controller: 'RegisterCtrl as reg'
      });

  }

})();
