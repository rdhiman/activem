(() => {
    'use strict';

    function trimHour() {
        return function(timeString) {
            return (timeString) ? timeString.replace(/^0/, '') : '';
        };
    }

    angular
    .module('core')
    .filter('trimHour', trimHour);

})();