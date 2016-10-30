(function () {
  'use strict';

  angular
    .module('app.investments')
    .controller('InvestmentsCtrl', InvestmentsCtrl);



  function InvestmentsCtrl ($state, $stateParams, API, Chartist) {
    var inv = this;

    if ($stateParams.level === -1) {
      $state.go('verify');
      return;
    }

    var _level = $stateParams.level / 1000;
    inv.level = _level ? _level : 0;

    var _message = 'You barerly made it through. Here are some investments:';

    if (inv.level <= 0.8) {
      _message = 'Awesome, good enough! Let\'s do something irresponsible:';
    }
    else if (inv.level <= 0.9) {
      _message = 'Few drinks, eh? Got some pretty solid offers for you below:';
    }
    else if (inv.level <= 1) {
      _message = 'You are smashed! Please seek medical help immediately! OR...';
      inv.ambulance = true;
    }

    inv.message = _message;

    API.getInvestments(inv.level)
      .then(function (investments) {
        inv.investments = investments;
      });
  }

})();
