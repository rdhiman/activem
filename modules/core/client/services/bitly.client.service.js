(() => {
    'use strict';

    class BitlyService {
        constructor($http) {
            _.merge(this, { $http });
            this.url = 'api/bitly';
        }
        getBitlyUrl(params = {}) {
            if (params.cacheBust) {
                params.cacheBust = true;
            }

            return this.$http.get(this.url, { params }).then((response) => response.data);
        }

    }

    angular
        .module('core')
        .service('BitlyService', BitlyService);

})();