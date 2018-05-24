(() => {
    'use strict';

    function gistsChart($state, $window, $filter) {
        var d3 = $window.d3;

        return {
            restrict: 'E',
            templateUrl: 'core/client/views/gistsLineChart.client.view.html',
            scope: {
                gistsData: '=',
            },
            link: link
        };

        function link(scope, element, attr) {
            let data = [];

            _.each(scope.gistsData, item => {
                let graphObject = {};
                graphObject.time = $filter('date')(item.created_at, 'mm');
                graphObject.count = 1;
                data.push(graphObject);
            });

            function InitChart() {
                var vis = d3.select('#visualisation'),
                    WIDTH = 1000,
                    HEIGHT = 500,
                    MARGINS = {
                        top: 20,
                        right: 20,
                        bottom: 20,
                        left: 50
                    },
                    xScale = d3.scaleLinear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([0, 60]),
                    yScale = d3.scaleLinear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([0, 1]),
                    xAxis = d3.axisBottom(xScale),
                    yAxis = d3.axisLeft(yScale);

                vis.append('svg:g')
                    .attr('class', 'x axis')
                    .attr('transform', 'translate(0,' + (HEIGHT - MARGINS.bottom) + ')')
                    .call(xAxis);
                vis.append('svg:g')
                    .attr('class', 'y axis')
                    .attr('transform', 'translate(' + (MARGINS.left) + ',0)')
                    .call(yAxis);
                var lineGen = d3.line()
                    .x(function(d) {
                        return xScale(d.time);
                    })
                    .y(function(d) {
                        return yScale(d.count);
                    })
                    .curve(d3.curveBasis);
                vis.append('svg:path')
                    .attr('d', lineGen(data))
                    .attr('stroke', '#39ACDC')
                    .attr('stroke-width', 2)
                    .attr('fill', 'none');
            }
            
            InitChart();
        }
    }

    angular
        .module('core')
        .directive('gistsChart', gistsChart);

})();