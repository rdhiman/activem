(() => {
    'use strict';

    function gistsChart($state, $window) {
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
            console.log(scope.gistsData);
            //const svg = element.find('svg');


            // const chart = d3.select("#line-chart"),
            //     WIDTH = 1000,
            //     HEIGHT = 500,
            //     MARGINS = {
            //         top: 20,
            //         right: 20,
            //         bottom: 20,
            //         left: 50
            //     };
            // //const chart = d3.select(svg[0]).append('g').attr('transform', 'translate(90, 90)');


            // function renderBlankChart() {
            //     chart.append('circle')
            //          .attr('cx', 0)
            //          .attr('cy', 0)
            //          .attr('r', 90)
            //          .attr('fill', '#cbd1d9');
            // }

            // renderBlankChart();

            function InitChart() {
                    var data = [{
                        "sale": "202",
                        "year": "2000"
                    }, {
                        "sale": "215",
                        "year": "2002"
                    }, {
                        "sale": "179",
                        "year": "2004"
                    }, {
                        "sale": "199",
                        "year": "2006"
                    }, {
                        "sale": "134",
                        "year": "2008"
                    }, {
                        "sale": "176",
                        "year": "2010"
                    }];
                    var data2 = [{
                        "sale": "152",
                        "year": "2000"
                    }, {
                        "sale": "189",
                        "year": "2002"
                    }, {
                        "sale": "179",
                        "year": "2004"
                    }, {
                        "sale": "199",
                        "year": "2006"
                    }, {
                        "sale": "134",
                        "year": "2008"
                    }, {
                        "sale": "176",
                        "year": "2010"
                    }];
                    var vis = d3.select("#visualisation"),
                        WIDTH = 1000,
                        HEIGHT = 500,
                        MARGINS = {
                            top: 20,
                            right: 20,
                            bottom: 20,
                            left: 50
                        },
                        xScale = d3.scaleLinear().range([MARGINS.left, WIDTH - MARGINS.right]).domain([2000, 2010]),
                        yScale = d3.scaleLinear().range([HEIGHT - MARGINS.top, MARGINS.bottom]).domain([134, 215]),
                        xAxis = d3.axisBottom(xScale),
                        yAxis = d3.axisLeft(yScale);
                    
                    vis.append("svg:g")
                        .attr("class", "x axis")
                        .attr("transform", "translate(0," + (HEIGHT - MARGINS.bottom) + ")")
                        .call(xAxis);
                    vis.append("svg:g")
                        .attr("class", "y axis")
                        .attr("transform", "translate(" + (MARGINS.left) + ",0)")
                        .call(yAxis);
                    var lineGen = d3.line()
                        .x(function(d) {
                            return xScale(d.year);
                        })
                        .y(function(d) {
                            return yScale(d.sale);
                        })
                        .curve(d3.curveBasis);
                    vis.append('svg:path')
                        .attr('d', lineGen(data))
                        .attr('stroke', 'green')
                        .attr('stroke-width', 2)
                        .attr('fill', 'none');
                    vis.append('svg:path')
                        .attr('d', lineGen(data2))
                        .attr('stroke', 'blue')
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