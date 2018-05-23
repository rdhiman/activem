(() => {
    'use strict';

    function windowHistory($window) {
        return {
            restrict: 'A',
            link
        };

        function link(scope, elem) {
            elem.bind('click', () => {
                $window.history.back(-1);
                return false;
            });
        }
    }

    angular
        .module('core')
        .directive('windowHistory', windowHistory);

})();