(() => {
    'use strict';

    function abbreviateMonth() {
        return function(timeString) {
            return timeString
                .replace(/January/g,'Jan.')
                .replace(/February/g,'Feb.')
                .replace(/August/g,'Aug.')
                .replace(/September/g,'Sept.')
                .replace(/October/g,'Oct.')
                .replace(/November/g,'Nov.')
                .replace(/December/g,'Dec.');
        };
    }

    angular
    .module('core')
    .filter('abbreviateMonth', abbreviateMonth);

})();