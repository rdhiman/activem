(() => {
    'use strict';

    class presenterController {
        constructor(presenterData, weekendEvents, dayBreaksService, gmapsService, $window) {
            $window.document.title = presenterData.presName + ' - Cincinnati Calendar';
            this.presenter = presenterData;
            this.events = dayBreaksService.add(presenterData.production_events.pageProductions);
            this.totalEvents = presenterData.production_events.totalProductionCount;
            
            delete this.presenter.production_events;

            this.weekendEvents = weekendEvents.nodes;

            this.presenter.directionsLink = gmapsService.generateDirectionsLink(
                this.presenter.presAddress,
                this.presenter.presCity,
                this.presenter.presState,
                this.presenter.presZip
            );
        }
    }

    angular
        .module('core')
        .controller('presenterController', presenterController);
})();