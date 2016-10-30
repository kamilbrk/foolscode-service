(function () {
  'use strict';

  angular
    .module('app.core')
    .run(runRouter)
    .config(configRouter);



  function runRouter ($rootScope, $state, $stateParams) {
    $rootScope.$state = $state;
    $rootScope.$stateParams = $stateParams;
  }


  function configRouter ($urlRouterProvider, $stateProvider) {
   
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
      })

      // Sign In page
      .state('signIn', {
        parent: 'app',
        url: '/sign-in',
        templateUrl: 'sign-in/sign-in.html',
        controller: 'SignInCtrl as sig'
      })

      // Verify page
      .state('verify', {
        parent: 'app',
        url: '/verify',
        templateUrl: 'verify/verify.html',
        controller: 'VerifyCtrl as ver',
        resolve: {
          signedIn: function ($q, User) {
            return User.isSignedIn() ? $q.when() : $q.reject();
          }
        }
      })

      // Investment page
      .state('investments', {
        parent: 'app',
        url: '/investments',
        params: {
          level: 0
        },
        templateUrl: 'investments/investments.html',
        controller: 'InvestmentsCtrl as inv',
        resolve: {
          signedIn: function ($q, User) {
            return User.isSignedIn() ? $q.when() : $q.reject();
          }
        }
      })

      // Users page
      .state('users', {
        parent: 'app',
        url: '/users',
        templateUrl: 'users/users.html',
        controller: 'UsersCtrl as usr'
      });

  }

})();
