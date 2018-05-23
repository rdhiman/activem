(() => {
    'use strict';

    class StatsController {
        constructor($stateParams, $state, GistsService, $window, gistsData) {
            _.assign(this, { $stateParams, $state, GistsService, $window, gistsData});
            const d3 = $window.d3;
            // console.log($window.d3);
            // //this.gists = {};
            // console.log(gistsData);
            //this.gists = gistsData;
            // this.GistsService.getGists().then((response) => {
            //     this.gists = response;
            //     console.log(this.gists);
            // });
        }

        // getGists() {
        //     this.GistsService.getGists().then((response) => {
        //         this.gists = response;
        //         console.log(this.gists);
        //     });
        // }

        mainView() {
            this.$state.go('mainView');
        }
    }

    angular
        .module('core')
        .controller('StatsController', StatsController);

})();
