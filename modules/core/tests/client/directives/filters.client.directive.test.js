(() => {
    'use strict';

    describe('searchFilters directive', () => {
        const filtersHTML = '<search-filters total-events="totalEvents"></search-filters>';
        let globals = {};

        beforeEach(inject(($compile, $rootScope, eventCategories, $state, $window, EventsService, NeighborhoodService, $httpBackend, $q) => {
            _.assign(globals, { $compile, $rootScope, $state, $window, EventsService, NeighborhoodService, $httpBackend, $q });
            globals.scope = globals.$rootScope.$new();
            globals.deferred = globals.$q.defer();

            globals.scope.totalEvents = 0;
            globals.eventCategories = eventCategories;

            globals.$httpBackend.whenGET('api/neighborhoods').respond([]);
            globals.$httpBackend.whenGET('api/events?pageIndex=0').respond({ success: true });
            globals.$httpBackend.whenGET('api/cincinnatiusa').respond({ success: true });
            globals.$httpBackend.whenGET('api/categories').respond(globals.eventCategories);

        }));

        afterEach(function() {
            globals.$httpBackend.flush();
            globals.scope.$destroy();
            globals.$httpBackend.verifyNoOutstandingExpectation();
            globals.$httpBackend.verifyNoOutstandingRequest();
            globals = {};
        });

        it('There should be event categories', () => {
            expect(globals.eventCategories.length).toBeGreaterThan(0);
        });

        describe('updateSubcategories', () => {
            it('updateSubcategories should create a list of subcategories from the category tree and selected categories', () => {
                globals.element = globals.$compile(filtersHTML)(globals.scope);
                globals.scope.$digest();
                
                globals.scope.formdata.superCategories['100'] = true;
                globals.scope.categoryTree = [{
                    SuperCatID: 100,
                    Categories: [{
                        catID: 200
                    }]
                }];

                globals.scope.updateSubcategories();
                expect(globals.scope.subCategories).toEqual([{ catID: 200 }]);
            });
            it('updateSubcategories should not add a subcategory more than once', () => {
                globals.element = globals.$compile(filtersHTML)(globals.scope);
                globals.scope.$digest();
                
                globals.scope.formdata.superCategories['100'] = true;
                globals.scope.categoryTree = [{
                    SuperCatID: 100,
                    Categories: [{
                        catID: 200
                    }]
                },{
                    SuperCatID: 100,
                    Categories: [{
                        catID: 200
                    }]
                },{
                    SuperCatID: 100,
                    Categories: [{
                        catID: 300
                    }]
                }];

                globals.scope.updateSubcategories();
                expect(globals.scope.subCategories).toEqual([{ catID: 200 },{ catID: 300 }]);
            });
        });
        
        describe('Checkbox toggles', () => {
            it('All checkboxes should be checked', () => {
                globals.element = globals.$compile(filtersHTML)(globals.scope);
                globals.scope.$digest();
                globals.scope.checkAllCheckboxes();
                let randomCatId = _.sample(globals.eventCategories).SuperCatID;
                expect(globals.scope.formdata.superCategories[randomCatId]).toBe(true);
            });
            it('All checkboxes should be unchecked', () => {
                globals.element = globals.$compile(filtersHTML)(globals.scope);
                globals.scope.$digest();
                globals.scope.clearAllCheckboxes();
                let randomCatId = _.sample(globals.eventCategories).SuperCatID;
                expect(globals.scope.formdata.superCategories[randomCatId]).toBe(false);
            });
            it('"All" checkbox should be unchecked if a category is selected', () => {
                globals.element = globals.$compile(filtersHTML)(globals.scope);
                globals.scope.$digest();
                globals.scope.formdata.superCategories['1'] = true;                
                globals.scope.updateCheckboxes();
                expect(globals.scope.allCheckbox).toBe(false);
            });
        });

        describe('date toggles', () => {
            it('should set radios to hidden custom value when custom date is focused', () => {
                globals.element = globals.$compile(filtersHTML)(globals.scope);
                globals.scope.$digest();
                globals.scope.formdata.date = 'today';
                globals.scope.clearDateRadios();
                expect(globals.scope.formdata.date).toEqual('custom');
            });
        });

        describe('Filters show/hide', () => {
            it('Desktop filter should expand', () => {
                globals.element = globals.$compile(filtersHTML)(globals.scope);
                globals.scope.$digest();
                globals.scope.toggleDesktopFilters();
                globals.scope.$digest();
                let button = globals.element[0].querySelector('.cal-more-filters');
                let expand = globals.element[0].querySelector('.cal-filters-expanded');
                expect(angular.element(expand).hasClass('ng-hide')).toBe(false);
                expect(_.trim(angular.element(button).text())).toEqual('Collapse');
            });
            it('Desktop filter should collapse', () => {
                globals.element = globals.$compile(filtersHTML)(globals.scope);
                globals.scope.$digest();
                globals.scope.toggleDesktopFilters();
                globals.scope.toggleDesktopFilters();
                globals.scope.$digest();
                let button = globals.element[0].querySelector('.cal-more-filters');
                let expand = globals.element[0].querySelector('.cal-filters-expanded');
                expect(angular.element(expand).hasClass('ng-hide')).toBe(true);
                expect(_.trim(angular.element(button).text())).toEqual('More Filters');
            });
            it('Mobile filter should expand', () => {
                globals.element = globals.$compile(filtersHTML)(globals.scope);
                globals.scope.$digest();
                globals.scope.toggleMobileFilters();
                globals.scope.$digest();
                let button = globals.element[0].querySelector('.cal-filter-button');
                let expand = globals.element[0].querySelector('.cal-filters-wrapper');
                expect(angular.element(expand).hasClass('ng-hide')).toBe(false);
                expect(angular.element(button).text()).toEqual('Close');
            });
            it('Mobile filter should collapse', () => {
                globals.element = globals.$compile(filtersHTML)(globals.scope);
                globals.scope.$digest();
                globals.scope.toggleMobileFilters();
                globals.scope.toggleMobileFilters();
                globals.scope.$digest();
                let button = globals.element[0].querySelector('.cal-filter-button');
                let expand = globals.element[0].querySelector('.cal-filters-wrapper');
                expect(angular.element(expand).hasClass('ng-hide')).toBe(true);
                expect(angular.element(button).text()).toEqual('Filter');
            });
            it('toggleHiddenSubcategories should set showCategories to true', () => {
                globals.element = globals.$compile(filtersHTML)(globals.scope);
                globals.scope.$digest();
                globals.scope.showSubcategories = false;
                globals.scope.toggleHiddenSubcategories();
                expect(globals.scope.showSubcategories).toEqual(true);
            });
            it('toggleHiddenSubcategories should call clear if showCategories is false', () => {
                globals.element = globals.$compile(filtersHTML)(globals.scope);
                globals.scope.$digest();
                globals.scope.showSubcategories = true;
                spyOn(globals.scope, 'clearAllSubcategoryCheckboxes');
                globals.scope.toggleHiddenSubcategories();
                expect(globals.scope.showSubcategories).toEqual(false);
                expect(globals.scope.clearAllSubcategoryCheckboxes).toHaveBeenCalled();
            });
        });

        describe('category checkboxes', () => {
            it('should check Free and Family Friendly when params include freeOnly and/or attributeIds', () => {
                let dummyData = {
                    freeOnly: 'true',
                    attributeIds: '3'
                };
                spyOn(globals.EventsService, 'getQueryParams').and.returnValue(dummyData);

                globals.element = globals.$compile(filtersHTML)(globals.scope);
                globals.scope.$digest();

                expect(globals.scope.formdata.superCategories.free).toBe(true);
                expect(globals.scope.formdata.superCategories.family).toBe(true);
            });
            it('selecting "All" should clear selected categories and the subcategories', () => {
                let dummyData = {
                    catIds: '1',
                    superCatIds: '1',
                };
                spyOn(globals.EventsService, 'getQueryParams').and.returnValue(dummyData);

                globals.element = globals.$compile(filtersHTML)(globals.scope);
                globals.scope.$digest();

                globals.scope.subCategories = [{ catID: '1' }];
                globals.scope.updateCheckboxes('all');
                

                expect(globals.scope.formdata.superCategories['1']).toBe(false);
                expect(globals.scope.formdata.subCategories['1']).toBe(false);
                expect(globals.scope.allCheckbox).toBe(true);
            });
            it('selecting all subCategories should clear subcategories' , () => {
                globals.element = globals.$compile(filtersHTML)(globals.scope);
                globals.scope.$digest();

                globals.scope.subCategories = [{ catID: '1' }];
                globals.scope.formdata.subCategories['1'] = true;
                globals.scope.updateSubcategoryCheckboxes('all');

                expect(globals.scope.formdata.subCategories['1']).toBe(false);
                expect(globals.scope.allSubCategoriesCheckbox).toBe(true);
            });
            it('selecting subCategories should clear all subcategories' , () => {
                globals.element = globals.$compile(filtersHTML)(globals.scope);
                globals.scope.$digest();

                globals.scope.subCategories = [{ catID: '1' }];
                globals.scope.formdata.subCategories['1'] = true;
                globals.scope.updateSubcategoryCheckboxes();

                expect(globals.scope.formdata.subCategories['1']).toBe(true);
                expect(globals.scope.allSubCategoriesCheckbox).toBe(false);
            });
            it('checking all subcategory checkboxes should check all subcategories', () => {
                globals.element = globals.$compile(filtersHTML)(globals.scope);
                globals.scope.$digest();

                globals.scope.subCategories = [{ catID: 1 }];
                globals.scope.checkAllSubcategoryCheckboxes();

                expect(globals.scope.formdata.subCategories[1]).toBe(true);
            });
            it('super category should be selected if subcategory is present on load', () => {
                globals.element = globals.$compile(filtersHTML)(globals.scope);
                globals.scope.$digest();

                globals.scope.categoryTree = [{ SuperCatID: 100, Categories: [{ catID: 1 }, { catID: 2 }] }];
                globals.scope.checkSuperCategoryForSubCategory(1);

                expect(globals.scope.formdata.superCategories[100]).toBe(true);
            });
        });

        describe('filters refilter', () => {
            it('should call state.go with the correct parameters', () => {
                globals.element = globals.$compile(filtersHTML)(globals.scope);
                globals.scope.$digest();
                let expectedQueryParams = {
                    superCatIds: '1,2',
                    catIds: '100,101',
                    keywords: 'some,keywords',
                    location: 'some location',
                    attributeIds: '',
                    freeOnly: '',
                    date: 'today',
                    startDate: '',
                    endDate: '',
                    pageIndex: 1
                };

                globals.scope.subCategories = [{ catID: 100 },{ catID: 101 },{ catID: 102 }];
                globals.scope.formdata.superCategories['1'] = true;
                globals.scope.formdata.superCategories['2'] = true;
                globals.scope.formdata.subCategories['100'] = true;
                globals.scope.formdata.subCategories['101'] = true;
                globals.scope.formdata.keywords = 'some keywords';
                globals.scope.formdata.neighborhood = 'some location';
                globals.scope.formdata.date = 'today';
                globals.scope.formdata.startDate = '2016=10-10';
                globals.scope.formdata.endDate = '2016-11-11';

                spyOn(globals.$state, 'go');

                globals.scope.refilter();

                expect(globals.$state.go).toHaveBeenCalledWith('.', expectedQueryParams, { reload: true });
            });
            it('should properly set freeOnly and attributeIds parameters', () => {
                let dummyData = {};

                spyOn(globals.EventsService, 'getQueryParams').and.returnValue(dummyData);

                globals.element = globals.$compile(filtersHTML)(globals.scope);
                globals.scope.$digest();

                globals.scope.formdata.superCategories.free = true;
                globals.scope.formdata.superCategories.family = true;

                let expectedQueryParams = {
                    superCatIds: '',
                    catIds: '',
                    keywords: '',
                    location: '',
                    attributeIds: '3',
                    freeOnly: 'true',
                    date: '',
                    pageIndex: 1
                };

                spyOn(globals.$state, 'go');

                globals.scope.refilter();

                expect(globals.$state.go).toHaveBeenCalledWith('.', expectedQueryParams, { reload: true });
            });
            it('should use the startDate and endDate if date is custom', () => {
                globals.element = globals.$compile(filtersHTML)(globals.scope);
                globals.scope.$digest();

                let expectedQueryParams = {
                    superCatIds: '',
                    catIds: '',
                    keywords: 'some,keywords',
                    location: 'some location',
                    attributeIds: '',
                    freeOnly: '',
                    date: '',
                    startDate: '2016-10-10',
                    endDate: '2016-11-11',
                    pageIndex: 1
                };

                globals.scope.formdata.keywords = 'some keywords';
                globals.scope.formdata.neighborhood = 'some location';
                globals.scope.formdata.date = 'custom';
                globals.scope.formdata.startDate = '2016-10-10';
                globals.scope.formdata.endDate = '2016-11-11';

                spyOn(globals.$state, 'go');

                globals.scope.refilter();

                expect(globals.$state.go).toHaveBeenCalledWith('.', expectedQueryParams, { reload: true });
            });
        });

        describe('filter formdata initilzation', () => {
            it('should get queryparams from the events service', () => {
                let dummyData = { };
                spyOn(globals.EventsService, 'getQueryParams').and.returnValue(dummyData);

                globals.element = globals.$compile(filtersHTML)(globals.scope);
                globals.scope.$digest();

                expect(globals.EventsService.getQueryParams).toHaveBeenCalled();
            });
            it('should set formdata correctly when being initialized', () => {
                let dummyData = {
                    date: 'today',
                    startDate: '',
                    endDate: '',
                    location: 'somewhere',
                    keywords: 'some,keywords',
                    superCatIds: '1,2',
                    catIds: '100,101'
                };
                spyOn(globals.EventsService, 'getQueryParams').and.returnValue(dummyData);

                globals.element = globals.$compile(filtersHTML)(globals.scope);
                globals.scope.$digest();

                let expectedFormData = {
                    keywords: 'some keywords',
                    neighborhood: 'somewhere',
                    date: 'today',
                    startDate: false,
                    endDate: false,
                    superCategories: { },
                    subCategories: { }
                };

                globals.scope.subCategories = [{ catID: 100 },{ catID: 101 },{ catID: 102 }];
                expectedFormData.superCategories['1'] = true;
                expectedFormData.superCategories['2'] = true;
                expectedFormData.subCategories['100'] = true;
                expectedFormData.subCategories['101'] = true;

                expect(globals.scope.formdata).toEqual(expectedFormData);
            });
            it('should use startDate and endDate when date is not provided', () => {
                let dummyData = {
                    startDate: '2016-10-11',
                    endDate: '2016-11-11',
                };
                spyOn(globals.EventsService, 'getQueryParams').and.returnValue(dummyData);

                globals.element = globals.$compile(filtersHTML)(globals.scope);
                globals.scope.$digest();

                let expectedFormData = {
                    keywords: '',
                    neighborhood: '',
                    date: 'custom',
                    startDate: moment('2016-10-11').toDate(),
                    endDate: moment('2016-11-11').toDate(),
                    superCategories: { },
                    subCategories: { }
                };

                expect(globals.scope.formdata).toEqual(expectedFormData);
            });
            it('should use native template if touch device', () => {
                let dummyData = {};
                window.ontouchstart = true;
                spyOn(globals.EventsService, 'getQueryParams').and.returnValue(dummyData);

                globals.element = globals.$compile(filtersHTML)(globals.scope);
                globals.scope.$digest();

                let expectedTemplate = 'core/client/views/datepicker.native.client.view.html';

                expect(globals.scope.datepickers.template).toEqual(expectedTemplate);
            });
            it('should open datepicker if not touch device', () => {
                delete globals.$window.ontouchstart;
                let dummyData = {};
                spyOn(globals.EventsService, 'getQueryParams').and.returnValue(dummyData);

                globals.element = globals.$compile(filtersHTML)(globals.scope);
                globals.scope.$digest();

                globals.scope.open('start');

                expect(globals.scope.datepickers.start.opened).toEqual(true);
            });
            it('should update date range via updateDateRange', () => {
                let dummyData = {};
                let today = moment().format('YYYY-MM-DD');
                spyOn(globals.EventsService, 'getQueryParams').and.returnValue(dummyData);

                globals.element = globals.$compile(filtersHTML)(globals.scope);
                globals.scope.$digest();

                globals.scope.updateDateRange('today');

                let expectedFormData = {
                    keywords: '',
                    neighborhood: '',
                    date: 'custom',
                    startDate: moment(today).toDate(),
                    endDate: moment(today).toDate(),
                    superCategories: { },
                    subCategories: { }
                };

                expect(globals.scope.formdata).toEqual(expectedFormData);
            });
            it('should set startDate to today if endDate is passed alone', () => {
                delete globals.$window.ontouchstart;
                let today = moment().format('YYYY-MM-DD');
                let twoDaysFromToday = moment(today).add(2, 'days').format('YYYY-MM-DD');
                let dummyData = {
                    endDate: twoDaysFromToday
                };
                spyOn(globals.EventsService, 'getQueryParams').and.returnValue(dummyData);
                spyOn(globals.$state, 'go');

                globals.element = globals.$compile(filtersHTML)(globals.scope);
                globals.scope.$digest();
                globals.scope.refilter();

                let expectedParams = {
                    superCatIds: '',
                    catIds: '',
                    pageIndex: 1,
                    keywords: '',
                    location: '',
                    attributeIds: '',
                    freeOnly: '',
                    date: '',
                    startDate: today,
                    endDate: twoDaysFromToday
                };

                expect(globals.$state.go).toHaveBeenCalledWith('.', expectedParams, { reload: true });
            });
            it('should swap dates if endDate is earlier than startDate', () => {
                delete globals.$window.ontouchstart;
                let dummyData = {
                    startDate: '2016-11-11',
                    endDate: '2016-11-05',
                };
                spyOn(globals.EventsService, 'getQueryParams').and.returnValue(dummyData);
                spyOn(globals.$state, 'go');

                globals.element = globals.$compile(filtersHTML)(globals.scope);
                globals.scope.$digest();
                globals.scope.refilter();

                let expectedParams = {
                    superCatIds: '',
                    catIds: '',
                    pageIndex: 1,
                    keywords: '',
                    location: '',
                    attributeIds: '',
                    freeOnly: '',
                    date: '',
                    startDate: '2016-11-05',
                    endDate: '2016-11-11'
                };

                expect(globals.$state.go).toHaveBeenCalledWith('.', expectedParams, { reload: true });
            });
        });

        describe('Neighborhoods typeahead', () => {
            it('NeighborhoodService should provide an array for auto completion', () => {
                globals.element = globals.$compile(filtersHTML)(globals.scope);

                let expected = ['neighborhood 1', 'neighborhood 2'];
                globals.deferred.resolve(expected);
                spyOn(globals.NeighborhoodService, 'getNeighborhoods').and.returnValue(globals.deferred.promise);
                globals.scope.$digest();

                expect(globals.scope.neighborhoods).toEqual(expected);
            });
        });
    });
})();
