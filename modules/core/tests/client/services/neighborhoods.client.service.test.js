(() => {
    'use strict';

    describe('Neighborhoods Service', () => {
        let globals = {};

        beforeEach(inject(($httpBackend, NeighborhoodService) => {
            _.assign(globals, { $httpBackend, NeighborhoodService });
            $httpBackend.expectGET('api/events?pageIndex=0').respond({ success: true });
            $httpBackend.expectGET('api/cincinnatiusa').respond({ success: true });
        }));
        afterEach(() => {
            globals.$httpBackend.verifyNoOutstandingExpectation();
            globals.$httpBackend.verifyNoOutstandingRequest();
        });
        it('getNeighborhoods should return a promise with a list of neighborhoods', () => {
            let expected = [];
            globals.$httpBackend
                .whenGET('api/neighborhoods')
                .respond(expected);
            globals.NeighborhoodService.getNeighborhoods().then(res => {
                expect(angular.equals(res, expected));
            });
            globals.$httpBackend.flush();
        });

        it('getNeighborhoods should return a promise with an empty list of neighborhoods', () => {
            let expected = [];
            globals.$httpBackend
                .whenGET('api/neighborhoods')
                .respond(404,[]);
            globals.NeighborhoodService.getNeighborhoods().then(res => {
                expect(angular.equals(res, expected));
            });
            globals.$httpBackend.flush();
        });
    });
})();