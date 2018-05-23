(() => {
    'use strict';

    function defaultSidebar() {
        return {
            restrict: 'E',
            scope: {
                weekendEvents: '='
            },
            templateUrl: 'core/client/views/sidebar.client.view.html'
        };
    }

    angular
        .module('core')
        .directive('defaultSidebar', defaultSidebar);

})();