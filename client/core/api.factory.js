(function () {
  'use strict';



  angular
    .module('app.core')
    .factory('API', API);



  function API ($http, $q, User) {

    var Service = {};
    var _baseURL = '/api/';

    Service.register = function (username, password, key) {
      return _http({
        method: 'POST',
        url: 'account/register?username=' + username + '&password=' + password + '&key=' + key
      });
    };

    Service.signIn = function (username, password) {
      User.signIn(username)
      
      return _http({
        method: 'POST',
        url: 'account/login?username=' + username + '&password=' + password
      });
    };

    Service.getUsers = function () {
      return _http({
        method: 'GET',
        url: 'account'
      });
    };

    Service.getInvestments = function (level) {

      var someLevels = [
        [4,3,3,2,0],
        [5,2,2,3,0],
        [3,1,1,2,0],
        [1,4,0,0,0]
      ];

      var investments = [
        { name: 'Yahoo!', subtitle: 'Stock falling down every day, right?', url: 'about:blank', required: 0 },
        { name: 'Company 1', subtitle: 'Solid chice 1', url: 'about:blank', required: 0.1 },
        { name: 'Company 2', subtitle: 'Solid chice 2', url: 'about:blank', required: 0.2 },
        { name: 'Company 3', subtitle: 'Solid chice 3', url: 'about:blank', required: 0.3 },
        { name: 'Company 4', subtitle: 'Solid chice 4', url: 'about:blank', required: 0.4 },
        { name: 'Company 5', subtitle: 'Solid chice 5', url: 'about:blank', required: 0.5 },
        { name: 'Company 6', subtitle: 'Solid chice 6', url: 'about:blank', required: 0.6 },
        { name: 'Company 7', subtitle: 'Solid chice 7', url: 'about:blank', required: 0.7 },
        { name: 'Company 8', subtitle: 'Solid chice 8', url: 'about:blank', required: 0.8 },
        { name: 'Company 9', subtitle: 'Solid chice 9', url: 'about:blank', required: 0.9 },
        { name: 'Company 10', subtitle: 'Solid chice 10', url: 'about:blank', required: 1 }
      ];

      investments.forEach(function (investment) {

        investment.levels = someLevels[getRandomInt(0, someLevels.length)];
        
        if (investment.required <= level) {
          investment.enabled = true;
        }
      });

      return $q.when(investments);
    };

    Service.verify = function (username, key) {

      // Passing 9B097E4B to /api/auth/decrypt returns 401 and 775 - too sober!
      // Passing AC2839F3 to /api/auth/decrypt returns 200 and 383 - drunk enough!

      // Does not work on a mac due to step32.exe binary - hard-coding the response for demos
      if (/Macintosh/.test(navigator.userAgent)) {
        if (key === '9B097E4B') {
          return $q.reject({ alcoholLevel: 775 });
        } else if (key === 'AC2839F3') {
          return $q.when({ alcoholLevel: 383 });
        }
        return $q.when({ alcoholLevel: 0 });
      }

      return _http({
        method: 'GET',
        url: 'auth/decrypt?user=' + username + '&key=' + key
      });
    };

    function getRandomInt (min, max) {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min)) + min;
    }

    function _http (request) {
      request.url = _baseURL + request.url;

      return $http(request)
        .then(function (response) {
          return response.data;
        }, function (responseError) {
          return $q.reject(responseError);
        });
    }

    return Service;
  }

})();
