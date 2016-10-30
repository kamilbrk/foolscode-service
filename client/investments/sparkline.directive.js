(function() {
  'use strict';

  angular
    .module('app.investments')
    .directive('sparkline', sparkline);



  function sparkline (Chartist) {
    return {
      restrict: 'EA',
      template: '<div class="chart-sparkline ct-chart"></div>',
      scope: {
        levels: '='
      },
      link: function (scope, elem) {
        var chart = new Chartist.Line(elem[0], {
          series: [scope.levels]
        }, {
          height: 75,
          // showArea: true,
          fullWidth: true,
          axisY: {
            showLabel: false,
            showGrid: false
          },
          axisX: {
            showLabel: false,
            showGrid: false
          },
          chartPadding: {
            top: 5,
            right: 5,
            bottom: 5,
            left: 5
          },
          plugins: [
            Chartist.plugins.ctThreshold({ threshold: 2.5 })
          ]
        });
        
      }
    };
  }

})();
