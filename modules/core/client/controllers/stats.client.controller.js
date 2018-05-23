(() => {
    'use strict';

    class StatsController {
        constructor($stateParams, $state, GistsService, $window, gistsData) {
            _.assign(this, { $stateParams, $state, GistsService, $window, gistsData });
            const d3 = $window.d3;
        }

        mainView() {
            this.$state.go('mainView');
        }
    }

    angular
        .module('core')
        .controller('StatsController', StatsController);

})();
