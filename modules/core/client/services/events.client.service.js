(() => {
    'use strict';

    class EventsService {
        constructor($http) {
            _.merge(this, { $http });
            this.pageSize = 0;
            this.eventCategoryName = '';
            this.queryParams = {};
        }

        getEventsJson(params = {}, stateParams = false) {
            if (stateParams) {
                this.parseStateParams(stateParams);
                _.merge(params, this.queryParams);
            }

            return this.$http.get('api/events', { params }).then(response => response.data);
        }

        getEventCategoryName() {
            return this.eventCategoryName;
        }

        parseStateParams(stateParams = {}) {
            let queryParams = {};
            const pageSize = this.getEventsPageSize();

            this.eventCategoryName = '';

            if (stateParams.pageIndex) {
                stateParams.pageIndex = parseInt(stateParams.pageIndex);
            }

            if (_.isUndefined(stateParams.pageIndex)) {
                queryParams.pageIndex = 0;
            } else if (stateParams.pageIndex !== 0) {
                queryParams.pageIndex = stateParams.pageIndex - 1;
            }

            if (pageSize !== 0) {
                queryParams.pageSize = _.add(_.multiply(pageSize, 20), 20);
            }


            if (stateParams.date) {
                queryParams.date = stateParams.date;
                _.assign(queryParams, this.getPresetDateRange(stateParams.date));
            } else {
                if (stateParams.startDate) {
                    queryParams.startDate = moment(stateParams.startDate).format('YYYY-MM-DD');
                }
                if (stateParams.endDate) {
                    queryParams.endDate = moment(stateParams.endDate).format('YYYY-MM-DD');
                }
            }

            if (stateParams.cacheBust) {
                queryParams.cacheBust = true;
            }

            _.assign(queryParams, _.pick(stateParams, ['superCatIds', 'catIds', 'catName', 'keywords', 'location', 'freeOnly', 'attributeIds']));

            this.queryParams = queryParams;
            return this.queryParams;
        }

        getPresetDateRange(preset) {
            const ranges = {
                today: { 
                    startDate: moment().format('YYYY-MM-DD'),
                    endDate: moment().format('YYYY-MM-DD')
                },
                weekend: { 
                    startDate: moment().endOf('week').subtract({ days: 1 }).format('YYYY-MM-DD'),
                    endDate: moment().endOf('week').add({ days: 1 }).format('YYYY-MM-DD')
                },
                week: {
                    startDate: moment().startOf('week').add({ days: 1 }).format('YYYY-MM-DD'),
                    endDate: moment().endOf('week').add({ days: 1 }).format('YYYY-MM-DD')
                }
            };
            return ranges[preset] || ranges.today;
        }

        getQueryParams() {
            return this.queryParams;
        }

        getProductionJson(id, cacheBust) {
            let params = {};
            params.id = id;
            params.endDate = moment().add(1, 'years').format('MM-DD-YYYY');
            if (cacheBust) {
                params.cacheBust = true;
            }

            return this.$http.get('api/production', { params }).then(response => {
                this.eventCategoryName = response.data.catName;
                return response.data;
            });
        }

        getProductionDatesJson(id, params = {}) {
            params.id = id;
            if (params.cacheBust) {
                params.cacheBust = true;
            }

            return this.$http.get('api/production/dates', { params }).then(response => response.data);
        }

        getVenueJson(id, params = {}, stateParams = false) {
            params.id = id;

            if (stateParams) {
                this.parseStateParams(stateParams);
                _.merge(params, this.queryParams);
            }

            return this.$http.get('api/venue', { params }).then(response => response.data);
        }

        getPresenterJson(id, params = {}, stateParams = false) {
            params.id = id;

            if (stateParams) {
                this.parseStateParams(stateParams);
                _.merge(params, this.queryParams);
            }

            return this.$http.get('api/presenter', { params }).then(response => response.data);
        }

        setEventsPageSize(page) {
            this.pageSize = page;
        }

        getEventsPageSize() {
            return this.pageSize;
        }

        getCategoryTree(params = {}) {
            return this.$http.get('api/categories', { params }).then(response => response.data);
        }
    }

    angular
        .module('core')
        .service('EventsService', EventsService);

})();
