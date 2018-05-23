(() => {
    'use strict';

    class FeedbackService {
        constructor($http) {
            _.merge(this, { $http });
        }

        sendForm(formData) {
            return this.$http.get('api/feedback', { params: formData }).then(response => response.data);
        }
    }

    angular
        .module('core')
        .service('FeedbackService', FeedbackService);

})();
