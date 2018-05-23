(() => {
    'use strict';

    describe('Routes', () => {

        let globals = {};

        function resolve(value) {
            return {
                forState: (state, injectedOverrides) => {
                    let stateDef = globals.$state.get(state);
                    return globals.$injector.invoke(stateDef.resolve[value], globals.$injector, injectedOverrides);
                }
            };
        }

        beforeEach(inject(($state, $injector, EventsService, CincinnatiusaService, BitlyService, $stateParams) => {
            _.assign(globals, { $state, $injector, EventsService, CincinnatiusaService, BitlyService });
            globals.params = { id: 123 };
            globals.eventObject = { catID: 123 };
        }));

        afterEach(function() {
            globals = {};
        });

        describe('Events resolves', () => {
            it('events should provide an eventsList dependency', () => {
                spyOn(globals.EventsService, 'getEventsJson');
                spyOn(globals.EventsService, 'getEventsPageSize').and.returnValue(0);
                const eventsList = resolve('eventsList').forState('events', { $stateParams: { } });
                expect(globals.EventsService.getEventsJson).toHaveBeenCalledWith({ }, { });
            });
            it('events should provide an eventsList dependency with pageIndex 0', () => {
                spyOn(globals.EventsService, 'getEventsJson');
                spyOn(globals.EventsService, 'getEventsPageSize').and.returnValue(0);
                const eventsList = resolve('eventsList').forState('events', { $stateParams: { pageIndex: 0 } });
                expect(globals.EventsService.getEventsJson).toHaveBeenCalledWith({ }, { pageIndex: 0 });
            });
            it('events should provide a weekendEvents dependency', () => {
                spyOn(globals.CincinnatiusaService, 'getWeekendEventsJson');
                spyOn(globals.EventsService, 'getEventsPageSize').and.returnValue(0);
                const weekendEvents = resolve('weekendEvents').forState('events', {});
                expect(globals.CincinnatiusaService.getWeekendEventsJson).toHaveBeenCalled();
            });
        });

        describe('EventDetails resolves', () => {
            it('eventDetails should provide an eventData dependency', () => {
                spyOn(globals.EventsService, 'getProductionJson');
                const eventData = resolve('eventData').forState('eventDetails', { $stateParams: globals.params });
                expect(globals.EventsService.getProductionJson).toHaveBeenCalled();
            });
            it('eventDetails should provide a futureEvents dependency', () => {
                spyOn(globals.EventsService, 'getProductionDatesJson');
                const eventData = resolve('futureEvents').forState('eventDetails', { $stateParams: globals.params });
                expect(globals.EventsService.getProductionDatesJson).toHaveBeenCalled();
            });
            it('eventDetails should provide a relatedEvents dependency', () => {
                spyOn(globals.EventsService, 'getEventsJson');
                const relatedEvents = resolve('relatedEvents').forState('eventDetails', { eventData: globals.eventObject });
                expect(globals.EventsService.getEventsJson).toHaveBeenCalled();
            });
        });

        describe('Presenter resolves', () => {
            it('presenter should provide a presenterData dependency', () => {
                spyOn(globals.EventsService, 'getPresenterJson');
                const presenterData = resolve('presenterData').forState('presenter', { $stateParams: globals.params });
                expect(globals.EventsService.getPresenterJson).toHaveBeenCalled();
            });
            it('presenter should provide a weekendEvents dependency', () => {
                spyOn(globals.CincinnatiusaService, 'getWeekendEventsJson');
                const weekendEvents = resolve('weekendEvents').forState('presenter', {});
                expect(globals.CincinnatiusaService.getWeekendEventsJson).toHaveBeenCalled();
            });
        });
        
        describe('Venue resolves', () => {
            it('venue should provide a venueData dependency', () => {
                spyOn(globals.EventsService, 'getVenueJson');
                const venueData = resolve('venueData').forState('venue', { $stateParams: globals.params });
                expect(globals.EventsService.getVenueJson).toHaveBeenCalled();
            });
            it('venue should provide a weekendEvents dependency', () => {
                spyOn(globals.CincinnatiusaService, 'getWeekendEventsJson');
                const weekendEvents = resolve('weekendEvents').forState('venue', {});
                expect(globals.CincinnatiusaService.getWeekendEventsJson).toHaveBeenCalled();
            });
        });


    });
})();