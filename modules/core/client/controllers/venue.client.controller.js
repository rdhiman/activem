(() => {
    'use strict';

    class venueController {
        constructor(venueData, weekendEvents, dayBreaksService, gmapsService, $window) {
            $window.document.title = venueData.venueName + ' - Cincinnati Calendar';
            this.venue = venueData;
            this.events = dayBreaksService.add(venueData.production_events.pageProductions);
            this.totalEvents = venueData.production_events.totalProductionCount;
            
            delete this.venue.production_events;

            this.weekendEvents = weekendEvents.nodes;

            this.venue.directionsLink = gmapsService.generateDirectionsLink(
                this.venue.venueAddress,
                this.venue.venueCity,
                this.venue.venueState,
                this.venue.venueZip
            );
        }
    }

    angular
        .module('core')
        .controller('venueController', venueController);
})();