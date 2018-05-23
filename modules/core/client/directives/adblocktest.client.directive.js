(() => {
    'use strict';

    function adBlockTest($window) {

        return {
            restrict: 'A',
            link: link
        };

        function link(scope, element, attr) {
            element.append('<div id="main_ad" style="height:1px; width:1px; overflow:auto;position: absolute;left: -999em;"><!--AD UNIT 4--></div>');

            var blockPosition = element.find('#main_ad');
            if(blockPosition[0] && blockPosition.height() === 1) {
                $window.adsEnabled = true;
            }
        }
    }

    angular
        .module('core')
        .directive('adBlockTest', adBlockTest);
})();