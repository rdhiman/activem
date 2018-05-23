(() => {
    'use strict';

    function searchFilters(eventCategories, EventsService, NeighborhoodService, $state, $window) {
        const isTouch = 'ontouchstart' in $window || $window.navigator.maxTouchPoints > 0 || $window.navigator.msMaxTouchPoints > 0;

        return {
            restrict: 'E',
            templateUrl: 'core/client/views/filters.client.view.html',
            link: link
        };

        function link(scope, element, attr) {
            let queryParams = EventsService.getQueryParams();

            scope.totalEvents = attr.totalEvents;

            scope.categoryTree = eventCategories;

            scope.subCategories = [];

            scope.showSubcategories = queryParams.catIds ? true : false;

            EventsService.getCategoryTree(queryParams).then(categoryTree => {
                scope.categoryTree = categoryTree;
                scope.categoryTree.push({ SuperCatID: 'family', SuperCat: 'Family Friendly', Categories: [] });
                scope.categoryTree.push({ SuperCatID: 'free', SuperCat: 'Free', Categories: [] });
                
                if(!queryParams.superCatIds){
                    scope.checkSuperCategoryForSubCategory(parseInt(queryParams.catIds));
                }
                scope.updateSubcategories();
            });

            NeighborhoodService.getNeighborhoods().then((neighborhoodList) => {
                scope.neighborhoods = neighborhoodList;
            });

            function initFilters() {
                scope.formdata = {
                    date: queryParams.date || 'custom',
                    startDate: queryParams.startDate ? moment(queryParams.startDate).toDate() : false,
                    endDate: queryParams.endDate ? moment(queryParams.endDate).toDate() : false,
                    neighborhood: queryParams.location || '',
                    keywords: queryParams.keywords || '',
                    superCategories: { },
                    subCategories: { }
                };

                scope.formdata.keywords = scope.formdata.keywords.replace(/,/g, ' ');

                if (queryParams.freeOnly) {
                    scope.formdata.superCategories.free = true;
                }

                if (queryParams.attributeIds) {
                    scope.formdata.superCategories.family = true;
                }

                if (queryParams.superCatIds) {
                    _.forEach(queryParams.superCatIds.split(','), id => {
                        scope.formdata.superCategories[id] = true;
                    });
                }

                scope.updateSubcategories();

                if (queryParams.catIds) {
                    _.forEach(queryParams.catIds.split(','), id => {
                        scope.formdata.subCategories[id] = true;
                    });
                    scope.showSubcategories = true;
                }

                if(!queryParams.superCatIds){
                    scope.checkSuperCategoryForSubCategory(parseInt(queryParams.catIds));
                }

                scope.allCheckbox = !!queryParams.catIds || !!queryParams.freeOnly || !!queryParams.attributeIds ? false : !!!queryParams.superCatIds;
                scope.allSubCategoriesCheckbox = false;

                scope.showDesktopFilters = false;

                scope.showMobileFilters = false;

                scope.updateNumFilters();
            }

            scope.datepickers = {
                template: isTouch ? 'core/client/views/datepicker.native.client.view.html' : 'core/client/views/datepicker.bootstrap.client.view.html',
                options: {
                    formatDay: 'd',
                    formatYear: 'yy',
                    minDate: moment().toDate(),
                    showWeeks: false
                },
                format: 'MMM d, yyyy',
                start: {
                    opened: false
                },
                end: {
                    opened: false
                }
            };
            scope.open = which => {
                scope.datepickers.start.opened = scope.datepickers.end.opened = false;
                scope.datepickers[which].opened = !isTouch;
            };

            scope.clearAllCategoryCheckboxes = () => {
                scope.clearAllSubcategoryCheckboxes();

                _.forEach(scope.categoryTree, category => {
                    scope.formdata.superCategories[category.SuperCatID] = false;
                });
            };

            scope.checkAllCheckboxes = () => {
                _.forEach(scope.categoryTree, category => {
                    scope.formdata.superCategories[category.SuperCatID] = true;
                });
                scope.updateNumFilters();
                scope.updateSubcategories();
            };

            scope.clearAllCheckboxes = () => {
                scope.clearAllCategoryCheckboxes();
                scope.allCheckbox = true;
                scope.updateNumFilters();
                scope.updateSubcategories();
            };

            scope.toggleHiddenSubcategories = () => {
                scope.showSubcategories = !scope.showSubcategories;
                scope.updateSubcategoryCheckboxes('all');

                if(!scope.showSubcategories) {
                    scope.clearAllSubcategoryCheckboxes();
                }
            };

            scope.clearAllSubcategoryCheckboxes = () => {
                _.forEach(scope.subCategories, subCategory => {
                    scope.formdata.subCategories[subCategory.catID] = false;
                });
            };

            scope.checkAllSubcategoryCheckboxes = () => {
                _.forEach(scope.subCategories, subCategory => {
                    scope.formdata.subCategories[subCategory.catID] = true;
                });
                scope.updateNumFilters();
            };

            scope.updateCheckboxes = which => {
                let categoriesChecked = _.some(scope.categoryTree, category => scope.formdata.superCategories[category.SuperCatID]);
                if (which === 'all') {
                    scope.clearAllCategoryCheckboxes();
                    scope.allCheckbox = true;
                } else {
                    scope.allCheckbox = !categoriesChecked;
                }

                scope.updateSubcategories();

                scope.updateNumFilters();
            };

            scope.updateSubcategoryCheckboxes = which => {
                let subCategoriesChecked = _.some(scope.subCategories, subCategory => scope.formdata.subCategories[subCategory.catID]);
                if (which === 'all') {
                    scope.clearAllSubcategoryCheckboxes();
                    scope.allSubCategoriesCheckbox = true;
                } else {
                    scope.allSubCategoriesCheckbox = !subCategoriesChecked;
                }

                scope.updateNumFilters();
            };

            scope.updateSubcategories = () => {
                scope.subCategories = [];
                _.forEach(scope.categoryTree, superCategory => {
                    if(scope.formdata.superCategories[superCategory.SuperCatID]){
                        _.forEach(superCategory.Categories, subCategory => {
                            let alreadyExists = false;

                            _.forEach(scope.subCategories, existingSubCategory => {
                                if(existingSubCategory.catID === subCategory.catID){
                                    alreadyExists = true;
                                }
                            });

                            if(!alreadyExists){
                                scope.subCategories = scope.subCategories.concat(subCategory);
                            }
                        });
                    }
                });

                if(!scope.subCategories.length){
                    scope.showSubcategories = false;
                }
            };

            scope.checkSuperCategoryForSubCategory = catID => {
                _.forEach(scope.categoryTree, superCategory => {
                    _.forEach(superCategory.Categories, subCategory => {
                        if(subCategory.catID === catID){
                            scope.formdata.superCategories[superCategory.SuperCatID] = true;
                        }
                    });
                });
            };

            scope.toggleDesktopFilters = () => {
                if (!scope.showDesktopFilters) {
                    scope.desktopExpandText = 'Collapse';
                    scope.showDesktopFilters = true;
                } else {
                    scope.desktopExpandText = 'More Filters';
                    scope.showDesktopFilters = false;
                }
            };

            scope.clearDateRadios = () => {
                scope.formdata.date = 'custom';
            };

            scope.updateDateRange = preset => {
                let range = EventsService.getPresetDateRange(preset);
                scope.formdata.startDate = moment(range.startDate).toDate();
                scope.formdata.endDate = moment(range.endDate).toDate();
                scope.updateNumFilters();
            };

            scope.toggleMobileFilters = () => {
                if (!scope.showMobileFilters) {
                    scope.showDesktopFilters = true;
                    scope.showMobileFilters = true;
                    scope.mobileExpandText = 'Close';
                } else {
                    scope.showDesktopFilters = false;
                    scope.showMobileFilters = false;
                    scope.mobileExpandText = 'Filter';
                    initFilters();
                }
            };

            scope.updateNumFilters = () => {
                let numFilters = 0;
                let datesFiltered = scope.formdata.endDate || scope.formdata.date !== 'custom';

                if (datesFiltered) numFilters += 1;

                _.forEach(scope.categoryTree, category => numFilters += scope.formdata.superCategories[category.SuperCatID] ? 1 : 0);
                _.forEach(scope.subCategories, subCategory => numFilters += scope.formdata.subCategories[subCategory.catID] ? 1 : 0);

                if (scope.formdata.keywords.length) numFilters += 1;

                if (scope.formdata.neighborhood.length) numFilters += 1;

                scope.numMobileFilters = numFilters;
                scope.numDesktopFilters = datesFiltered ? numFilters - 1 : numFilters;
            };

            scope.refilter = () => {
                queryParams.superCatIds = [];
                _.forEach(scope.categoryTree, category => {
                    if (category.SuperCatID === 'free') {
                        queryParams.freeOnly = scope.formdata.superCategories.free ? 'true' : '';
                    } else if (category.SuperCatID === 'family') {
                        queryParams.attributeIds = scope.formdata.superCategories.family ? '3' : '';
                    } else if (scope.formdata.superCategories[category.SuperCatID]) {
                        queryParams.superCatIds.push(category.SuperCatID);                                
                    }
                    delete queryParams[category.SuperCatID];
                });
                queryParams.superCatIds = queryParams.superCatIds.join(',');

                queryParams.catIds = [];
                _.forEach(scope.subCategories, subCategory => {
                    if (scope.formdata.subCategories[subCategory.catID]) {
                        queryParams.catIds.push(subCategory.catID);                                
                    }
                    delete queryParams[subCategory.catID];
                });
                queryParams.catIds = queryParams.catIds.join(',');

                queryParams.keywords = scope.formdata.keywords.replace(/ /g, ',');

                queryParams.location = scope.formdata.neighborhood;

                queryParams.date = scope.formdata.date;

                if (queryParams.date !== 'custom') {
                    queryParams.startDate = '';
                    queryParams.endDate = '';
                } else {
                    if (scope.formdata.endDate) {
                        queryParams.startDate = scope.formdata.startDate ? moment(scope.formdata.startDate).format('YYYY-MM-DD') : moment().format('YYYY-MM-DD');
                        queryParams.endDate = moment(scope.formdata.endDate).format('YYYY-MM-DD');
                        if (moment(queryParams.endDate).isBefore(queryParams.startDate)) {
                            let tempDate = queryParams.startDate;
                            queryParams.startDate = queryParams.endDate;
                            queryParams.endDate = tempDate;
                        }
                    }
                    queryParams.date = '';
                }

                queryParams.pageIndex = 1;
                EventsService.setEventsPageSize(0);
                $state.go('.', queryParams, { reload: true });
            };

            initFilters();
        }
    }

    angular
        .module('core')
        .directive('searchFilters', searchFilters);

})();