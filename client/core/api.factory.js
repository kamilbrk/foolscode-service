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

      var investments = [
        { name: 'Yahoo!', subtitle: 'Falling down every day.', url: 'http://google.co.uk', required: 0.0 },
        { name: 'Name 1', subtitle: 'Subtitle 1', url: 'http://google.co.uk', required: 0.1 },
        { name: 'Name 2', subtitle: 'Subtitle 2', url: 'http://google.co.uk', required: 0.2 },
        { name: 'Name 3', subtitle: 'Subtitle 3', url: 'http://google.co.uk', required: 0.3 },
        { name: 'Name 4', subtitle: 'Subtitle 4', url: 'http://google.co.uk', required: 0.4 },
        { name: 'Name 5', subtitle: 'Subtitle 5', url: 'http://google.co.uk', required: 0.5 },
        { name: 'Name 6', subtitle: 'Subtitle 6', url: 'http://google.co.uk', required: 0.6 },
        { name: 'Name 7', subtitle: 'Subtitle 7', url: 'http://google.co.uk', required: 0.7 },
        { name: 'Name 8', subtitle: 'Subtitle 8', url: 'http://google.co.uk', required: 0.8 },
        { name: 'Name 9', subtitle: 'Subtitle 9', url: 'http://google.co.uk', required: 0.9 },
        { name: 'Name10', subtitle: 'Subtitle10', url: 'http://google.co.uk', required: 1.0 }
      ];

      investments.forEach(function (investment) {
        if (investment.required <= level) {
          investment.enabled = true;
        }
      });

      return $q.when(investments);
    };

    Service.verify = function (username, key) {

      return $q.when(0.7);

      return _http({
        method: 'GET',
        url: 'auth/decrypt?user=' + username + '&key=' + key
      });
    };

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
