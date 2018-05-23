(() => {
    'use strict';

    function config($stateProvider, $urlRouterProvider, $urlMatcherFactoryProvider) {
        $urlRouterProvider.otherwise('/not-found');
        $urlRouterProvider.when('','/');
        $urlMatcherFactoryProvider.strictMode(false);

        $stateProvider
            .state('events', {
                url: '/',
                templateUrl: 'core/client/views/index.client.view.html',
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
            .state('eventDetails', {
                url: '/event/{id:int}/{name}?cacheBust',
                templateUrl: 'core/client/views/eventDetails.client.view.html',
                controller: 'EventDetailsController as eventDetailsCtl',
                resolve: {
                    eventData(EventsService, $stateParams) {
                        return EventsService.getProductionJson($stateParams.id, $stateParams.cacheBust);
                    },
                    futureEvents(EventsService, $stateParams) {
                        return EventsService.getProductionDatesJson($stateParams.id, { pageSize: 250, cacheBust: $stateParams.cacheBust });
                    },
                    relatedEvents(EventsService, eventData, $stateParams) {
                        return EventsService.getEventsJson({ catIds: eventData.catID, excludeProdId: eventData.prodID, pageSize: 5, cacheBust: $stateParams.cacheBust });
                    }
                }
            })
            .state('presenter', {
                url: '/presenter/{id:int}/{name}?pageIndex&date&startDate&endDate&superCatIds&catIds&location&keywords&freeOnly&attributeIds&cacheBust',
                templateUrl: 'core/client/views/presenter.client.view.html',
                controller: 'presenterController as presenterCtl',
                resolve: {
                    presenterData(EventsService, $stateParams) {
                        return EventsService.getPresenterJson($stateParams.id, {}, $stateParams);
                    },
                    weekendEvents(CincinnatiusaService, $stateParams) {
                        return CincinnatiusaService.getWeekendEventsJson($stateParams.cacheBust);
                    }
                }
            })
            .state('venue', {
                url: '/venue/{id:int}/{name}?pageIndex&date&startDate&endDate&catIds&superCatIds&location&keywords&freeOnly&attributeIds&cacheBust',
                templateUrl: 'core/client/views/venue.client.view.html',
                controller: 'venueController as venueCtl',
                resolve: {
                    venueData(EventsService, $stateParams) {
                        return EventsService.getVenueJson($stateParams.id, {}, $stateParams);
                    },
                    weekendEvents(CincinnatiusaService, $stateParams) {
                        return CincinnatiusaService.getWeekendEventsJson($stateParams.cacheBust);
                    }
                }
            })
            .state('feedback', {
                url: '/feedback/{id:int}/{name}',
                templateUrl: 'core/client/views/feedback.client.view.html',
                controller: 'FeedbackController as feedbackCtl'
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
