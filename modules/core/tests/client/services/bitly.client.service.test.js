(() => {
    'use strict';

    describe('bitly Service', () => {
        let globals = {};

        beforeEach(inject(($httpBackend, BitlyService) => {
            _.assign(globals, { $httpBackend, BitlyService });
        }));
        afterEach(() => {
            globals.$httpBackend.verifyNoOutstandingExpectation();
            globals.$httpBackend.verifyNoOutstandingRequest();
        });
        it('getBitlyUrl should return a promise with bitly data', () => {
            let expected = { success: true, data: 'blah' };
            globals.$httpBackend.expectGET('api/bitly?shareUrl=blah').respond(expected);
            globals.$httpBackend.expectGET('api/events?pageIndex=0').respond({ success: true });
            globals.$httpBackend.expectGET('api/cincinnatiusa').respond({ success: true });
            globals.BitlyService.getBitlyUrl({ shareUrl: 'blah' }).then(res => {
                expect(angular.equals(res, expected));
            });
            globals.$httpBackend.flush();
        });
        it('getBitlyUrl should passthrough cachebust', () => {
            let expected = { success: true, data: 'blah' };
            globals.$httpBackend.expectGET('api/bitly?shareUrl=blah&cacheBust=true').respond(expected);
            globals.$httpBackend.expectGET('api/events?pageIndex=0').respond({ success: true });
            globals.$httpBackend.expectGET('api/cincinnatiusa').respond({ success: true });
            globals.BitlyService.getBitlyUrl({ cacheBust: true, shareUrl: 'blah' }).then(res => {
                expect(angular.equals(res, expected));
            });
            globals.$httpBackend.flush();
        });
    });
})();