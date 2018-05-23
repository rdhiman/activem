(() => {
    'use strict';

    class CincinnatiusaService {
        constructor($http) {
            _.merge(this, { $http });
            this.url = 'api/cincinnatiusa';
        }
        getWeekendEventsJson(cacheBust) {
            let params = {};
            if (cacheBust) {
                params.cacheBust = true;
            }

            return this.$http.get(this.url, { params })
                .then((response) => response.data)
                .catch(() => []);
        }
    }

    angular
        .module('core')
        .service('CincinnatiusaService', CincinnatiusaService);

})();