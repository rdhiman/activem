(() => {
    'use strict';

    function config($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
        $urlRouterProvider.otherwise('/not-found');
        $urlRouterProvider.when('','/');
        $urlMatcherFactoryProvider.strictMode(false);

        $stateProvider
            .state('mainView', {
                url: '/',
                templateUrl: 'core/client/views/notes.client.view.html',
                controller: 'GistsController as gistsCtl',
                resolve: {
                    locaNotesData(GistsService) {
                        return GistsService.getLocalNotes();
                    }
                }
            })
            .state('statsView', {
                url: '/stats',
                templateUrl: 'core/client/views/stats.client.view.html',
                controller: 'StatsController as statsCtl',
                resolve: {
                    gistsData(GistsService) {
                        return GistsService.getGists();
                    }
                }
            })
            .state('not-found', {
                url: '/not-found',
                templateUrl: 'core/client/views/404.client.view.html'
            });
    }

    angular
        .module('core')
        .config(config);
})();
