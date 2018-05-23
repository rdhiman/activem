(() => {
    'use strict';

    describe('Events Service', () => {
        let globals = {};

        beforeEach(inject(($httpBackend, EventsService) => {
            _.assign(globals, { EventsService });
        }));
        afterEach(() => {
            globals = {};
        });
        describe('', () => {
            let $httpBackend;
            beforeEach(inject((_$httpBackend_) => {
                $httpBackend = _$httpBackend_;
            }));
            afterEach(() => {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });
            it('getEventsJson should return a promise with events data', () => {
                let params = {
                    startDate: '12-10-2015',
                    endDate: '12-20-2015',
                    superCatIds: '234,344',
                    location: 'somewhere',
                    latitude: '30.000', 
                    longitude: '30.000',
                    keywords: 'some event keywords'
                };
                let expected = { success: true };

                $httpBackend.expectGET('api/events?pageIndex=0').respond({ success: true });
                $httpBackend.expectGET('api/cincinnatiusa').respond({ success: true });
                $httpBackend
                    .whenGET('api/events?endDate=12-20-2015&keywords=some+event+keywords&latitude=30.000&location=somewhere&longitude=30.000&startDate=12-10-2015&superCatIds=234,344')
                    .respond(expected);
                $httpBackend
                    .whenGET('api/events')
                    .respond(expected);
                globals.EventsService.getEventsJson(params).then(res => {
                    expect(angular.equals(res, expected));
                });
                globals.EventsService.getEventsJson().then(res => {
                    expect(angular.equals(res, expected));
                });
                $httpBackend.flush();
            });
            it('getProductionJson should return a promise with production data', () => {
                let id = '234';
                let expected = { success: true };
                let oneYear = moment().add(1, 'years').format('MM-DD-YYYY');

                $httpBackend.expectGET('api/events?pageIndex=0').respond({ success: true });
                $httpBackend.expectGET('api/cincinnatiusa').respond({ success: true });
                $httpBackend
                    .whenGET('api/production?id=234&endDate='+oneYear)
                    .respond(expected);
                globals.EventsService.getProductionJson(id).then(res => {
                    expect(angular.equals(res, expected));
                });
                $httpBackend.flush();
            });
            it('getProductionJson should return a promise with cachebusted production data', () => {
                let id = '234';
                let expected = { success: true };
                let oneYear = moment().add(1, 'years').format('MM-DD-YYYY');

                $httpBackend.expectGET('api/events?pageIndex=0').respond({ success: true });
                $httpBackend.expectGET('api/cincinnatiusa').respond({ success: true });
                $httpBackend
                    .whenGET('api/production?cacheBust=true&id=234&endDate='+oneYear)
                    .respond(expected);
                globals.EventsService.getProductionJson(id, true).then(res => {
                    expect(angular.equals(res, expected));
                });
                $httpBackend.flush();
            });
            it('getProductionDatesJson should return a promise with production dates data', () => {
                let params = {
                    startDate: '12-10-2015',
                    endDate: '12-20-2015'
                };
                let id = '234';
                let expected = { success: true };

                $httpBackend.expectGET('api/events?pageIndex=0').respond({ success: true });
                $httpBackend.expectGET('api/cincinnatiusa').respond({ success: true });
                $httpBackend
                    .whenGET('api/production/dates?id=234&startDate=12-10-2015&endDate=12-20-2015')
                    .respond(expected);
                $httpBackend
                    .whenGET('api/production/dates?id=234')
                    .respond(expected);
                globals.EventsService.getProductionDatesJson(id, params).then(res => {
                    expect(angular.equals(res, expected));
                });
                globals.EventsService.getProductionDatesJson(id).then(res => {
                    expect(angular.equals(res, expected));
                });
                $httpBackend.flush();
            });
            it('getProductionDatesJson should return a promise with cachebusted production dates data', () => {
                let params = {
                    cacheBust: true
                };
                let id = '234';
                let expected = { success: true };

                $httpBackend.expectGET('api/events?pageIndex=0').respond({ success: true });
                $httpBackend.expectGET('api/cincinnatiusa').respond({ success: true });
                $httpBackend
                    .whenGET('api/production/dates?cacheBust=true&id=234')
                    .respond(expected);
                globals.EventsService.getProductionDatesJson(id, params).then(res => {
                    expect(angular.equals(res, expected));
                });
                $httpBackend.flush();
            });
            it('getVenueJson should return a promise with venue data', () => {
                let params = {
                    startDate: '12-10-2015',
                    endDate: '12-20-2015'
                };
                let id = '234';
                let expected = { success: true };

                $httpBackend.expectGET('api/events?pageIndex=0').respond({ success: true });
                $httpBackend.expectGET('api/cincinnatiusa').respond({ success: true });
                $httpBackend
                    .whenGET('api/venue?id=234&startDate=12-10-2015&endDate=12-20-2015')
                    .respond(expected);
                $httpBackend
                    .whenGET('api/venue?id=234')
                    .respond(expected);
                globals.EventsService.getVenueJson(id, params).then(res => {
                    expect(angular.equals(res, expected));
                });
                globals.EventsService.getVenueJson(id).then(res => {
                    expect(angular.equals(res, expected));
                });
                $httpBackend.flush();
            });
            it('getPresenterJson should return a promise with presenter data', () => {
                let params = {
                    startDate: '12-10-2015',
                    endDate: '12-20-2015'
                };
                let id = '234';
                let expected = { success: true };

                $httpBackend.expectGET('api/events?pageIndex=0').respond({ success: true });
                $httpBackend.expectGET('api/cincinnatiusa').respond({ success: true });
                $httpBackend
                    .whenGET('api/presenter?id=234&startDate=12-10-2015&endDate=12-20-2015')
                    .respond(expected);
                $httpBackend
                    .whenGET('api/presenter?id=234')
                    .respond(expected);
                globals.EventsService.getPresenterJson(id, params).then(res => {
                    expect(angular.equals(res, expected));
                });
                globals.EventsService.getPresenterJson(id).then(res => {
                    expect(angular.equals(res, expected));
                });
                $httpBackend.flush();
            });
            it('setEventsPageSize should set pageSize', () => {
                let expected = { success: true };
                globals.EventsService.pageSize = 0;

                $httpBackend
                    .whenGET('api/events?pageIndex=0&pageSize=60')
                    .respond(expected);
                $httpBackend
                    .whenGET('api/cincinnatiusa')
                    .respond(expected);
                globals.EventsService.setEventsPageSize(2);
                $httpBackend.flush();
                expect(globals.EventsService.pageSize).toEqual(2);
            });
            it('getEvents should call parseStateParams when second variable is present', () => {
                let params = {
                    startDate: '12-10-2015',
                    endDate: '12-20-2015',
                    superCatIds: '234,344',
                    location: 'somewhere',
                    latitude: '30.000', 
                    longitude: '30.000',
                    keywords: 'some event keywords'
                };
                let expected = { success: true };

                spyOn(globals.EventsService, 'parseStateParams');

                $httpBackend
                    .whenGET('api/events?pageIndex=1&endDate=12-20-2015&keywords=some+event+keywords&latitude=30.000&location=somewhere&longitude=30.000&startDate=12-10-2015&superCatIds=234,344')
                    .respond(expected);
                $httpBackend
                    .whenGET('api/events?endDate=12-20-2015&keywords=some+event+keywords&latitude=30.000&location=somewhere&longitude=30.000&startDate=12-10-2015&superCatIds=234,344')
                    .respond(expected);
                $httpBackend.whenGET('api/events').respond(expected);
                $httpBackend.expectGET('api/cincinnatiusa').respond({ success: true });

                globals.EventsService.getEventsJson(params, { pageIndex: 2 }).then(res => {
                    expect(globals.EventsService.parseStateParams).toHaveBeenCalled();
                });
                $httpBackend.flush();
            });
            it('getVenueJson should call parseStateParams when second variable is present', () => {
                let params = {
                    startDate: '12-10-2015',
                    endDate: '12-20-2015'
                };
                let id = '234';
                let expected = { success: true };

                spyOn(globals.EventsService, 'parseStateParams');

                $httpBackend
                    .whenGET('api/venue?pageIndex=1&id=234&startDate=12-10-2015&endDate=12-20-2015')
                    .respond(expected);
                $httpBackend
                    .whenGET('api/venue?id=234&startDate=12-10-2015&endDate=12-20-2015')
                    .respond(expected);
                $httpBackend.expectGET('api/events').respond({ success: true });
                $httpBackend.expectGET('api/cincinnatiusa').respond({ success: true });

                globals.EventsService.getVenueJson(id, params, { pageIndex: 2 }).then(res => {
                    expect(globals.EventsService.parseStateParams).toHaveBeenCalled();
                });
                $httpBackend.flush();
            });
            it('getPresenterJson should call parseStateParams when second variable is present', () => {
                let params = {
                    startDate: '12-10-2015',
                    endDate: '12-20-2015'
                };
                let id = '234';
                let expected = { success: true };

                spyOn(globals.EventsService, 'parseStateParams');

                $httpBackend
                    .whenGET('api/presenter?pageIndex=1&id=234&startDate=12-10-2015&endDate=12-20-2015')
                    .respond(expected);
                $httpBackend
                    .whenGET('api/presenter?id=234&startDate=12-10-2015&endDate=12-20-2015')
                    .respond(expected);
                $httpBackend.expectGET('api/events').respond({ success: true });
                $httpBackend.expectGET('api/cincinnatiusa').respond({ success: true });

                globals.EventsService.getPresenterJson(id, params, { pageIndex: 2 }).then(res => {
                    expect(globals.EventsService.parseStateParams).toHaveBeenCalled();
                });
                $httpBackend.flush();
            });
            it('getEventCategoryName should return the event category name', () => {
                let testData = {
                    startDate: '2016-10-11T20:10:26.591Z',
                    endDate: '2016-11-11T20:10:26.591Z'
                };

                let expectedOutput = {
                    pageIndex: 0,
                    startDate: moment('2016-10-11').format('YYYY-MM-DD'),
                    endDate: moment('2016-11-11').format('YYYY-MM-DD')
                };

                let expected = { success: true };

                $httpBackend
                    .whenGET('api/events?pageIndex=0')
                    .respond(expected);
                $httpBackend
                    .whenGET('api/cincinnatiusa')
                    .respond(expected);
                $httpBackend.flush();
                globals.EventsService.parseStateParams(testData);

                expect(globals.EventsService.getEventCategoryName()).toEqual('');
            });
        });
        describe('parseStateParams', () => {
            it('should provide a queryParams object with only defined stateparams attrs', () => {
                let testData = {
                    superCatIds: '1,2,3',
                    catIds: '1',
                    catName: 'Category',
                    keywords: 'hello',
                    location: 'somewhere'
                };
                let expectedOutput = {
                    pageIndex: 0,
                    superCatIds: '1,2,3',
                    catIds: '1',
                    catName: 'Category',
                    keywords: 'hello',
                    location: 'somewhere'
                };

                globals.EventsService.parseStateParams(testData);

                expect(globals.EventsService.queryParams).toEqual(expectedOutput);
            });
            it('should set pageIndex to 0 if missing', () => {
                let expectedOutput = {
                    pageIndex: 0
                };

                globals.EventsService.parseStateParams();

                expect(globals.EventsService.queryParams).toEqual(expectedOutput);
            });
            it('should reduce pageIndex by one if > 0', () => {
                let testData = {
                    pageIndex: '5'
                };
                let expectedOutput = {
                    pageIndex: 4
                };

                globals.EventsService.parseStateParams(testData);

                expect(globals.EventsService.queryParams).toEqual(expectedOutput);
            });
            it('should set the page size correctly', () => {
                let testData = {};
                let expectedOutput = {
                    pageIndex: 0,
                    pageSize: 60
                };
                globals.EventsService.setEventsPageSize(2);
                globals.EventsService.parseStateParams(testData);

                expect(globals.EventsService.queryParams).toEqual(expectedOutput);
            });
            it('should set the startDate and endDate based on date = today', () => {
                let testData = {
                    date: 'today'
                };
                let expectedOutput = {
                    pageIndex: 0,
                    startDate: moment().format('YYYY-MM-DD'),
                    endDate: moment().format('YYYY-MM-DD')
                };

                globals.EventsService.parseStateParams(testData);
                
                expect(globals.EventsService.queryParams.startDate).toEqual(expectedOutput.startDate);
                expect(globals.EventsService.queryParams.endDate).toEqual(expectedOutput.endDate);
            });
            it('should set the startDate and endDate based on date = weekend', () => {
                let testData = {
                    date: 'weekend'
                };
                let expectedOutput = {
                    pageIndex: 0,
                    endDate: moment().endOf('week').add({ days: 1 }).format('YYYY-MM-DD'),
                    startDate: moment().endOf('week').subtract({ days: 1 }).format('YYYY-MM-DD')
                };

                globals.EventsService.parseStateParams(testData);

                expect(globals.EventsService.queryParams.startDate).toEqual(expectedOutput.startDate);
                expect(globals.EventsService.queryParams.endDate).toEqual(expectedOutput.endDate);
            });
            it('should set the startDate and endDate based on date = week', () => {
                let testData = {
                    date: 'week'
                };
                let expectedOutput = {
                    pageIndex: 0,
                    startDate: moment().startOf('week').add({ days: 1 }).format('YYYY-MM-DD'),
                    endDate: moment().endOf('week').add({ days: 1 }).format('YYYY-MM-DD')
                };

                globals.EventsService.parseStateParams(testData);

                expect(globals.EventsService.queryParams.startDate).toEqual(expectedOutput.startDate);
            });
            it('should set the startDate and endDate based on date = custom', () => {
                let testData = {
                    startDate: '2016-10-11T20:10:26.591Z',
                    endDate: '2016-11-11T20:10:26.591Z'
                };
                let expectedOutput = {
                    pageIndex: 0,
                    startDate: moment('2016-10-11').format('YYYY-MM-DD'),
                    endDate: moment('2016-11-11').format('YYYY-MM-DD')
                };

                let expected = { success: true };
                globals.EventsService.parseStateParams(testData);                

                expect(globals.EventsService.queryParams.startDate).toEqual(expectedOutput.startDate);
                expect(globals.EventsService.queryParams.endDate).toEqual(expectedOutput.endDate);
            });
            it('getPresetDateRange should return today if no recognized preset', () => {
                let expected = {
                    startDate: moment().format('YYYY-MM-DD'),
                    endDate: moment().format('YYYY-MM-DD')
                };
                let result = globals.EventsService.getPresetDateRange('notfound');
                expect(result).toEqual(expected);
            });
            it('getQueryParams should return query params', () => {
                let result = globals.EventsService.getQueryParams();
                expect(result).toEqual({});
            });
            it('should set cacheBust to true if it is a parameter', () => {
                let testData = {
                    cacheBust: 'true'
                };
                globals.EventsService.parseStateParams(testData);                
                expect(globals.EventsService.queryParams.cacheBust).toEqual(true);
            });
        });
    });
    
})();
