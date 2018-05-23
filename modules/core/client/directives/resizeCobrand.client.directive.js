(() => {
    'use strict';

    function resizeCobrand($rootScope, $window) {
        return {
            restrict: 'A',
            link: ($scope, elem, attr) => {
                const desktopId = attr.resizeCobrandDesktop;
                const mobileId = attr.resizeCobrandMobile;

                angular.element($window).bind('resize', () => {
                    if(!$scope.createdDesktopHeader && $window.innerWidth >= 980) {
                        //$window.MAW.header(desktopId, 'cincinnati', { 'layout': 'header-4' });
                        $scope.createdDesktopHeader = true;
                    }else if(!$scope.createdMobileHeader && $window.innerWidth < 980){
                        $window.MAW.header(mobileId, 'cincinnati', { 'layout': 'header-1' });
                        $scope.createdMobileHeader = true;
                    }
                });

                angular.element($window).trigger('resize');
            }
        };
    }

    angular
        .module('core')
        .directive('resizeCobrand', resizeCobrand);

})();