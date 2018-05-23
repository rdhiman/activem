(() => {
    'use strict';

    class FeedbackController {
        constructor($stateParams, FeedbackService, $window) {
            $window.document.title = 'Feedback - Cincinnati Calendar';
            this.eventUrl = '/event/' + $stateParams.id + '/' + $stateParams.name;
            this.formSubmitted = false;
            this.formError = false;
            this.feedback = {
                name: '',
                email: '',
                event: decodeURIComponent($stateParams.name.replace(/\-/g,' ')),
                message: '',
                id: $stateParams.id,
                gRecaptchaResponse: ''
            };

            this.submit = () => {
                if (this.feedbackForm.$valid) {
                    FeedbackService.sendForm(this.feedback)
                        .then(response => {
                            this.formSubmitted = true;
                            if (!response.success) {
                                this.formError = true;
                            }
                        });
                }
            };
        }
    }

    angular
        .module('core')
        .controller('FeedbackController', FeedbackController);

})();
