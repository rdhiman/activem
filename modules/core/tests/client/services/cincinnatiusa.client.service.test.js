(() => {
    'use strict';

    describe('cincinnatiusa.com Service', () => {
        let globals = {};

        beforeEach(inject(($httpBackend, CincinnatiusaService) => {
            _.assign(globals, { $httpBackend, CincinnatiusaService });
            $httpBackend.expectGET('api/events?pageIndex=0').respond({ success: true });
            $httpBackend.expectGET('api/cincinnatiusa').respond({ success: true });
        }));
        afterEach(() => {
            globals.$httpBackend.verifyNoOutstandingExpectation();
            globals.$httpBackend.verifyNoOutstandingRequest();
        });
        it('getWeekendEventsJson should return a promise with cincinnatiusa.com data', () => {
            let expected = { success: true };
            globals.$httpBackend
                .whenGET('api/cincinnatiusa')
                .respond(expected);
            globals.CincinnatiusaService.getWeekendEventsJson().then(res => {
                expect(angular.equals(res, expected));
            });
            globals.$httpBackend.flush();
        });

        it('getWeekendEventsJson should return a promise with cachebusted cincinnatiusa.com data', () => {
            let expected = { success: true };
            globals.$httpBackend
                .whenGET('api/cincinnatiusa?cacheBust=true')
                .respond(expected);
            globals.CincinnatiusaService.getWeekendEventsJson(true).then(res => {
                expect(angular.equals(res, expected));
            });
            globals.$httpBackend.flush();
        });

        it('getWeekendEventsJson should return a promise with cincinnatiusa.com empty data', () => {
            let expected = [];
            globals.$httpBackend
                .whenGET('api/cincinnatiusa')
                .respond(404,[]);
            globals.CincinnatiusaService.getWeekendEventsJson().then(res => {
                expect(angular.equals(res, expected));
            });
            globals.$httpBackend.flush();
        });
    });
})();