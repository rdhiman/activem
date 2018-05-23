(() => {
    'use strict';

    describe('Venue controller', () => {

        let globals = {};

        beforeEach(inject(($controller, dayBreaksService, gmapsService) => {
            globals.venue = {
                venueAddress: '',
                venueCity: '',
                venueState: '',
                venueZip: '',
                production_events: {}
            };
            globals.venue.production_events = {
                pageProductions: [],
                totalProductionCount: 0
            };
            globals.weekendEvents = {
                nodes: []
            };
            globals.controller = $controller('venueController', { venueData : globals.venue, weekendEvents: globals.weekendEvents, dayBreaksService, gmapsService });
        }));
        afterEach(function() {
            globals = {};
        });
        
        it('The controller should be defined', () => {
            expect(globals.controller).toBeDefined();
        });

    });
})();