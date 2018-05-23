(() => {
    'use strict';

    function chromeless() {
        return function(url) {
            return window.chromeless ? url + 'chromeless=true' : '';
        };
    }

    angular
    .module('core')
    .filter('chromeless', chromeless);

})();