(() => {
    'use strict';

    describe('Event Details controller', () => {

        let globals = {};

        beforeEach(inject(($controller, $location, $q, gmapsService, $rootScope, $timeout, $window, $httpBackend, BitlyService) => {
            _.assign(globals, { $httpBackend, $window, $timeout });
            globals.scope = $rootScope.$new();
            
            globals.sampleData = {};
            globals.sampleData.apiVenue = {
                venueAddress: '123 Main Street',
                venueCity: 'Cincinnati',
                venueState: 'Ohio',
                venueZip: '12345'
            };
            globals.sampleData.apiPresenter = {};

            globals.deferred = $q.defer();
            spyOn($location, 'absUrl').and.returnValue('someplace');
            spyOn(BitlyService, 'getBitlyUrl').and.returnValue(globals.deferred.promise);

            globals.controller = $controller('EventDetailsController', { eventData: globals.sampleData, futureEvents: {}, relatedEvents: {}, gmapsService, $location, $scope: globals.scope, $timeout: globals.$timeout, $window: globals.$window });
            
            $httpBackend.expectGET('api/events?pageIndex=0').respond({ success: true });
            $httpBackend.expectGET('api/cincinnatiusa').respond({ success: true });
        }));
        
        afterEach(() => {
            globals.$httpBackend.verifyNoOutstandingExpectation();
            globals.$httpBackend.flush();
            globals = {};
        });
        
        it('The controller should be defined', () => {
            expect(globals.controller).toBeDefined();
        });

        it('The addtocalendar.load function should be called after the associated view renders', () => {
            spyOn(globals.$window.addtocalendar, 'load');
            globals.scope.$broadcast('$viewContentLoaded');
            globals.$timeout.flush();
            globals.$timeout.verifyNoPendingTasks();
            expect(globals.$window.addtocalendar.load).toHaveBeenCalled();
        });

        it('The bitly share url should resolve with data', () => {
            globals.deferred.promise.then(() => {
                expect(globals.controller.bitlyShareUrl).toEqual('someurl');
            });

            globals.deferred.resolve({ url: 'someurl' });
        });

        it('The bitly share url should resolve with the location if no data', () => {
            globals.deferred.promise.then(() => {
                expect(globals.controller.bitlyShareUrl).toEqual('someplace');
            });

            globals.deferred.resolve({ error: 'someerror' });
        });

    });
})();