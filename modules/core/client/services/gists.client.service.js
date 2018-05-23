(() => {
    'use strict';

    class GistsService {
        constructor($http) {
            _.merge(this, { $http });

            this.url = 'api/bitly';
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

        getGists() {
            return this.$http.get('https://api.github.com/gists/public').then((response) => response.data);
        }
    }

    angular
        .module('core')
        .service('GistsService', GistsService);

})();
