(() => {
    'use strict';

    describe('Events controller', () => {

        let globals = {};

        function mockResponse() {
            globals.deferred = globals.$q.defer();
            globals.loadMoreResponse = {};
            globals.deferred.resolve(globals.loadMoreResponse);
            return globals.deferred.promise;
        }

        beforeEach(inject(($controller, $state, $httpBackend, $q, $rootScope, dayBreaksService, EventsService) => {
            _.assign(globals, { $httpBackend, $q, dayBreaksService, $state, EventsService, $rootScope });
            globals.$scope = $rootScope.$new();
            globals.controller = $controller('EventsController', { eventsList: {}, weekendEvents: {}, $state });
            $httpBackend.expectGET('api/cincinnatiusa').respond({ success: true });
        }));
        afterEach(function() {
            globals.$scope.$destroy();
            globals.$httpBackend.flush();
            globals.$httpBackend.verifyNoOutstandingRequest();
            globals = {};
        });

        it('The controller should be defined', () => {
            expect(globals.controller).toBeDefined();
        });

        describe('pageChanged', () => {
            it('should call $state.go with currentPage', () => {
                globals.controller.currentPage = 2;
                spyOn(globals.controller.$state, 'go');
                globals.controller.pageChanged();
                expect(globals.controller.$state.go).toHaveBeenCalledWith('.', { pageIndex: 2 });
            });
        });

        describe('loadMore', () => {
            it('should set $stateParams.pageIndex to 2 if $stateParams.pageIndex === undefined && EventsService.pageSize === 0', () => {
                globals.controller.EventsService.pageSize = 0;
                spyOn(globals.controller.EventsService, 'getEventsJson').and.callFake(mockResponse);
                globals.controller.loadMore();
                expect(globals.controller.EventsService.getEventsJson).toHaveBeenCalledWith({}, { pageIndex: 2 });
            });
            it('should set $stateParams.pageIndex should increment if EventsService.pageSize is greater than 0', () => {
                globals.controller.EventsService.pageSize = 2;
                globals.controller.$stateParams.pageIndex = 1;
                spyOn(globals.controller.EventsService, 'getEventsJson').and.callFake(mockResponse);
                globals.controller.loadMore();
                expect(globals.controller.EventsService.getEventsJson).toHaveBeenCalledWith({}, { pageIndex: 2 });
            });
            it('should call dayBreaksService', () => {
                globals.controller.EventsService.pageSize = 2;
                spyOn(globals.controller.dayBreaksService, 'add').and.returnValue();
                spyOn(globals.controller.EventsService, 'getEventsJson').and.callFake(mockResponse);
                globals.controller.loadMore().then(() => {
                    expect(globals.controller.dayBreaksService.add).toHaveBeenCalled();
                });
            });
        });

        describe('hideLoadMore', () => {
            it('should show pagination / load more if the total number of results is greater than 20', () => {
                globals.controller.totalEvents = 32;
                globals.controller.$stateParams.pageIndex = 1;
                const result = globals.controller.hideLoadMore();
                expect(result).toBe(true);
            });
            it('should hide pagination / load more if the total number of results is less than 20 or load more reached the last page', () => {
                globals.controller.totalEvents = 32;
                globals.controller.$stateParams.pageIndex = 0;
                const result = globals.controller.hideLoadMore();
                expect(result).toBe(false);
            });
        });

    });
})();