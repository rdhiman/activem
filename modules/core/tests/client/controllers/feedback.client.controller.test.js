(() => {
    'use strict';

    describe('Feedback Form controller', () => {

        let globals = {};

        beforeEach(inject(($controller, FeedbackService, $rootScope, $q, $httpBackend) => {
            _.assign(globals, { FeedbackService, $rootScope, $q, $httpBackend });
            globals.stateParams = {
                id: 123,
                name: 'example event'
            };
            globals.controller = $controller('FeedbackController', { $stateParams: globals.stateParams, FeedbackService });

            globals.deferred = globals.$q.defer();

            globals.$httpBackend.expectGET('api/events?pageIndex=0').respond({ success: true });
            globals.$httpBackend.expectGET('api/cincinnatiusa').respond({ success: true });
        }));
 
        afterEach(() => {
            globals.$httpBackend.verifyNoOutstandingExpectation();
            globals.$httpBackend.verifyNoOutstandingRequest();
            globals = {};
        });

        it('On submitting a valid form, the form should submit', () => {
            globals.controller.feedbackForm = {
                $valid: true
            };
            
            globals.deferred.resolve({ success: true });
            spyOn(globals.FeedbackService, 'sendForm').and.returnValue(globals.deferred.promise);

            globals.controller.submit();
            globals.$rootScope.$apply();
            globals.$httpBackend.flush();
            expect(globals.controller.formSubmitted).toBe(true);
            expect(globals.controller.formError).toBe(false); 
        });

        it('On submitting an invalid form, the form should not submit', () => {
            globals.controller.feedbackForm = {
                $valid: false
            };

            globals.deferred.resolve({ success: true });
            spyOn(globals.FeedbackService, 'sendForm').and.returnValue(globals.deferred.promise);

            globals.controller.submit();
            globals.$rootScope.$apply();
            globals.$httpBackend.flush();
            expect(globals.controller.formSubmitted).toBe(false); 
            expect(globals.controller.formError).toBe(false);
        });

        it('On submitting an invalid recaptcha, the form should not submit', () => {
            globals.controller.feedbackForm = {
                $valid: true
            };

            globals.deferred.resolve({ success: false });
            spyOn(globals.FeedbackService, 'sendForm').and.returnValue(globals.deferred.promise);

            globals.controller.submit();
            globals.$rootScope.$apply();
            globals.$httpBackend.flush();
            expect(globals.controller.formSubmitted).toBe(true);
            expect(globals.controller.formError).toBe(true);
        });

    });
})();