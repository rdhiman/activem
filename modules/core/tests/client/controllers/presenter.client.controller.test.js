(() => {
    'use strict';

    describe('Presenter controller', () => {

        let globals = {};

        beforeEach(inject(($controller, dayBreaksService, gmapsService) => {
            globals.presenter = {
                presAddress: '',
                presCity: '',
                presState: '',
                presZip: '',
                production_events: {}
            };
            globals.presenter.production_events = {
                pageProductions: [],
                totalProductionCount: 0
            };
            globals.weekendEvents = {
                nodes: []
            };
            globals.controller = $controller('presenterController', { presenterData : globals.presenter, weekendEvents: globals.weekendEvents, dayBreaksService, gmapsService });
        }));
        afterEach(function() {
            globals = {};
        });
        
        it('The controller should be defined', () => {
            expect(globals.controller).toBeDefined();
        });

    });
})();