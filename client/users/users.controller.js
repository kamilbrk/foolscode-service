(function () {
  'use strict';

  angular
    .module('app.users')
    .controller('UsersCtrl', UsersCtrl);



  function UsersCtrl (API) {
    var usr = this;

    API.getUsers()
      .then(function (users) {
        usr.users = users;
      });
  }

})();
