(() => {
    'use strict';

    function lowercaseAMPM() {
        return function(timeString) {
            return (timeString) ? timeString.replace(/AM/g,'a.m.').replace(/PM/g,'p.m.') : '';
        };
    }

    angular
    .module('core')
    .filter('lowercaseAMPM', lowercaseAMPM);

})();