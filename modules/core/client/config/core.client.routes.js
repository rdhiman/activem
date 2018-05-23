(() => {
    'use strict';

    function config($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
        $urlRouterProvider.otherwise('/not-found');
        $urlRouterProvider.when('','/');
        $urlMatcherFactoryProvider.strictMode(false);

        $stateProvider
            //events
            .state('mainView', {
                url: '/',
                templateUrl: 'core/client/views/notes.client.view.html',
                controller: 'GistsController as gistsCtl',
                resolve: {
                    // eventsList(EventsService, $stateParams) {
                    //     return EventsService.getEventsJson({}, $stateParams);
                    // },
                    // weekendEvents(CincinnatiusaService, $stateParams) {
                    //     return CincinnatiusaService.getWeekendEventsJson($stateParams.cacheBust);
                    // }
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
                    // eventData(EventsService, $stateParams) {
                    //     return EventsService.getProductionJson($stateParams.id, $stateParams.cacheBust);
                    // },
                    // futureEvents(EventsService, $stateParams) {
                    //     return EventsService.getProductionDatesJson($stateParams.id, { pageSize: 250, cacheBust: $stateParams.cacheBust });
                    // },
                    // relatedEvents(EventsService, eventData, $stateParams) {
                    //     return EventsService.getEventsJson({ catIds: eventData.catID, excludeProdId: eventData.prodID, pageSize: 5, cacheBust: $stateParams.cacheBust });
                    // }
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
