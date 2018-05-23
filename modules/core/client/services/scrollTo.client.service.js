(() => {
    'use strict';

    class scrollToService {
        constructor() {
            this.scrollPos = [];
        }

        setScrollPos(scrollPosition) {
            this.scrollPos = scrollPosition;
        }

        getScrollPos() {
            return this.scrollPos;
        }
    }

    angular
        .module('core')
        .service('scrollToService', scrollToService);
})();