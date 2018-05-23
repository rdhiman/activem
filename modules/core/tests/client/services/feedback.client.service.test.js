(() => {
    'use strict';

    describe('Feedback Service', () => {
        let globals = {};

        beforeEach(inject(($httpBackend, FeedbackService) => {
            _.assign(globals, { $httpBackend, FeedbackService });
            $httpBackend.expectGET('api/events?pageIndex=0').respond({ success: true });
            $httpBackend.expectGET('api/cincinnatiusa').respond({ success: true });
        }));

        afterEach(() => {
            globals.$httpBackend.verifyNoOutstandingExpectation();
            globals.$httpBackend.verifyNoOutstandingRequest();
        });
        
        it('sendForm should return a promise with a success value', () => {
            let expected = { success: true };
            globals.$httpBackend
                .whenGET('api/feedback')
                .respond(expected);
            globals.FeedbackService.sendForm().then(res => {
                expect(angular.equals(res, expected));
            });
            globals.$httpBackend.flush();
        });
    });
})();