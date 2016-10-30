(function() {
  'use strict';

  angular
    .module('app.investments')
    .directive('gauge', gauge);



  function gauge (Chartist) {
    return {
      restrict: 'EA',
      template: '<div class="chart-gauge ct-chart ct-negative-labels"></div>',
      scope: {
        level: '='
      },
      link: function (scope) {

        var _chartMax = 100;

        var val = scope.level * 100;
        
        if (val > 100) {
          val = 100;
        }

        var chart = new Chartist.Pie('.chart-gauge', {
          series: [val]
        }, {
          donut: true,
          donutWidth: 40,
          startAngle: 270,
          total: _chartMax * 2,
          showLabel: true,
          labelInterpolationFnc: function (value) {
            return Math.round(value / _chartMax * 100) + '%';
          }
        });
        
      }
    };
  }

})();
