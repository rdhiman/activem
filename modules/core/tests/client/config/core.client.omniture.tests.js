(() => {
    'use strict';

    describe('omniture runblock', () => {
        let globals = {};

        beforeEach(() => {
            angular.mock.module(function ($provide) {
                globals.myEventsServiceMock = {
                    getEventsJson: () => { return { success: 200 }; },
                    getVenueJson: () => { return { success: 200 }; },
                    getProductionJson: () => { return { success: 200 }; },
                    setEventsPageSize: size => { globals.myEventsServiceMock.size = size; },
                    getEventsPageSize: () => { return globals.myEventsServiceMock.size; },
                    getEventCategoryName: () => { return 'some category'; }
                };

                $provide.value('EventsService', globals.myEventsServiceMock);
            });
        });

        beforeEach(inject(($rootScope, $state, $window, EventsService) => {
            _.assign(globals, { $rootScope, $state, EventsService, $window });
            globals.$window.innerWidth = 979;
            $window.utag = undefined;

            globals.MAW = {
                omniture: () => { 
                    globals.$window.utag = { 
                        data: {
                            analytics: { }
                        },
                        view: () => { }
                    };
                }
            };

            $window.MAW = globals.MAW;
        }));

        afterEach(() => {
            globals.$window.MAW = undefined;
            globals = {};
        });

        it('The first time through it should initialize MAW', () => {
            spyOn(globals.MAW, 'omniture');

            globals.$rootScope.$broadcast('$stateChangeSuccess', {}, {});

            expect(globals.MAW.omniture).toHaveBeenCalled();
        });
        it('The second time through it should call utag.view', () => {
            MAW.omniture();

            spyOn(globals.$window.utag, 'view');

            globals.$rootScope.$broadcast('$stateChangeSuccess', {}, {});

            expect(globals.$window.utag.view).toHaveBeenCalled();
        });
        it('should do nothing when MAW is undefined', () => {
            MAW.omniture();
            globals.$window.MAW = undefined;

            spyOn(globals.$window.utag, 'view');

            globals.$rootScope.$broadcast('$stateChangeSuccess', {}, {});

            expect(globals.$window.utag.view).not.toHaveBeenCalled();
        });
        it('should set the last page url when stateChangeStart happens', () => {
            MAW.omniture();
            spyOn(globals.MAW, 'omniture');

            globals.$state.go('events');

            globals.$rootScope.$broadcast('$stateChangeStart', {}, {});
            globals.$rootScope.$broadcast('$stateChangeSuccess', {}, {});

            expect(globals.$window.utag.data.analytics.prop64).toEqual('http://localhost:9876/context.html');
        });
    });
})();