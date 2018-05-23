(() => {
    'use strict';

    class EventsController {
        constructor(eventsList, dayBreaksService, weekendEvents, $stateParams, $state, EventsService, $window) {
            _.assign(this, { dayBreaksService, $stateParams, $state, EventsService });
            $window.document.title = 'Cincinnati Calendar';
            this.totalEvents = eventsList.totalProductionCount;
            this.dayBreaksService = dayBreaksService;
            this.events = dayBreaksService.add(eventsList.pageProductions);
            this.weekendEvents = weekendEvents.nodes;
            this.maxSize = 10;
            this.currentPage = $stateParams.pageIndex || 1;
        }

        pageChanged() {
            this.$state.go('.', { pageIndex: this.currentPage });
        }

        loadMore() {
            if(this.$stateParams.pageIndex === undefined && this.EventsService.pageSize === 0) {
                this.$stateParams.pageIndex = 2;
            } else {
                this.$stateParams.pageIndex++;
            }
            return this.EventsService.getEventsJson({}, this.$stateParams)
                .then(response => {
                    const results = this.dayBreaksService.add(response.pageProductions);
                    this.events = this.events.concat(results);
                    return this.events;
                });
        }

        hideLoadMore() {
            return this.totalEvents < (this.$stateParams.pageIndex + 1) * 20;
        }
    }

    angular
        .module('core')
        .controller('EventsController', EventsController);

})();
