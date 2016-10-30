(function () {
  'use strict';

  angular
    .module('app.investments')
    .controller('InvestmentsCtrl', InvestmentsCtrl);



  function InvestmentsCtrl ($stateParams, API, Chartist) {
    var inv = this;
    var _level;

    if ($stateParams.level !== 'undefined') {
      _level = $stateParams.level / 1000;
    }
    
    inv.level = _level ? _level : 0;

    // var _chartMax = 100;

    // var chart = new Chartist.Pie('.ct-chart', {
    //   series: [60]
    // }, {
    //   donut: true,
    //   donutWidth: 40,
    //   startAngle: 270,
    //   total: _chartMax * 2,
    //   showLabel: true,
    //   labelInterpolationFnc: function (value) {
    //     return Math.round(value / _chartMax * 100) + '%';
    //   }
    // });

    API.getInvestments(inv.level)
      .then(function (investments) {
        inv.investments = investments;
      });
  }

})();
