(() => {
    'use strict';

    function urlencode() {
        return function(url) {
            return encodeURIComponent(url.replace(/ /g,'-').replace(/\//g,'-'));
        };
    }

    angular
    .module('core')
    .filter('urlencode', urlencode);

})();