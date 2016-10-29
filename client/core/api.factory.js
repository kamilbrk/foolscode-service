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

      User.signIn(username);

      return $q.when();

      return _http({
        method: 'POST',
        url: 'account/signin?username=' + username + '&password=' + password
      });
    };

    Service.verify = function (username, key) {
      return _http({
        method: 'GET',
        url: 'auth/verify?user=' + username + '&key=' + key
      });

      // 200
      // 400
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
