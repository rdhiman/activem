(() => {
    'use strict';

    class GistsService {
        constructor($http) {
            _.merge(this, { $http });
            this.pageSize = 0;
            this.eventCategoryName = '';
            this.queryParams = {};
        }

        updateGist(noteObject) {
            console.log(noteObject);
        }

        getEventsJson(params = {}, stateParams = false) {
            if (stateParams) {
                this.parseStateParams(stateParams);
                _.merge(params, this.queryParams);
            }

            return this.$http.get('api/events', { params }).then(response => response.data);
        }
    }

    angular
        .module('core')
        .service('GistsService', GistsService);

})();
