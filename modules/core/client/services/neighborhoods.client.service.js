(() => {
    'use strict';

    class NeighborhoodService {
        constructor($http) {
            _.merge(this, { $http });
            this.url = 'api/neighborhoods';
        }
        getNeighborhoods() {
            return this.$http.get(this.url)
                .then((response) => response.data)
                .catch(() => []);
        }
    }

    angular
        .module('core')
        .service('NeighborhoodService', NeighborhoodService);

})();