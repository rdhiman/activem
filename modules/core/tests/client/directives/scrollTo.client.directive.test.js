(() => {
    'use strict';

    describe('scrollTo directive', () => {
        let globals = {};

        const scrollDirective = '<div scroll-to></div>';

        function triggerScroll (elem) {
            elem.triggerHandler('scroll');
        }

        beforeEach(() => {
            angular.mock.module(function ($provide) {
                globals.myEventsServiceMock = {
                    getEventsJson: () => { return { success: 200 }; },
                    getVenueJson: () => { return { success: 200 }; },
                    getProductionJson: () => { return { success: 200 }; },
                    setEventsPageSize: size => { globals.myEventsServiceMock.size = size; },
                    getEventsPageSize: () => { return globals.myEventsServiceMock.size; },
                    getEventCategoryName: () => { return ''; }
                };

                $provide.value('EventsService', globals.myEventsServiceMock);
            });

            angular.mock.module(function ($provide) {
                globals.myCincyEventsServiceMock = {
                    getWeekendEventsJson: () => { return { success: 200 }; }
                };

                $provide.value('CincinnatiusaService', globals.myCincyEventsServiceMock);
            });
        });

        beforeEach(inject(($compile, $rootScope, scrollToService, $state, $document, $timeout, $window, $httpBackend, EventsService) => {
            _.assign(globals, { $compile, $rootScope, EventsService, scrollToService, $state, $document, $timeout, $window, $httpBackend });
            globals.$compile = $compile;
            globals.scope = $rootScope.$new();
            globals.$window.pageXOffset = 0;
            globals.$window.pageYOffset = 500;
            globals.$window.innerWidth = 979;
        }));

        afterEach(() => {
            globals.scope.$destroy();
            globals = {};
        });

        it('scroll should set scrollPosition value', () => {
            let element = globals.$compile(scrollDirective)(globals.scope);
            document.body.appendChild(element[0]);
            globals.scope.$digest();
            var event = $.Event('scroll');
            element.trigger(event);
            expect(globals.scope.scrollPosition).toEqual([0, 500]);
        });

        it('should call scrollToService.setScrollPos() on $stateChangeStart if state is an infinite scroll state', () => {
            globals.$state.go('events');
            globals.$rootScope.$digest();
            globals.scope = globals.$rootScope.$new();

            let element = globals.$compile(scrollDirective)(globals.scope);
            globals.scope.$digest();

            spyOn(globals.scrollToService, 'setScrollPos');
            globals.$rootScope.$broadcast('$stateChangeStart', {}, {});
            globals.scope.$digest('$stateChangeStart');
            expect(globals.scrollToService.setScrollPos).toHaveBeenCalledWith(globals.scope.scrollPosition);
        });
        it('should not call scrollToService.setScrollPos() on $stateChangeStart if page is too wide', () => {
            globals.$state.go('events');
            globals.$rootScope.$digest();
            globals.scope = globals.$rootScope.$new();
            globals.$window.innerWidth = 980;

            let element = globals.$compile(scrollDirective)(globals.scope);
            globals.scope.$digest();

            spyOn(globals.scrollToService, 'setScrollPos');
            globals.$rootScope.$broadcast('$stateChangeStart', {}, {});
            globals.scope.$digest('$stateChangeStart');
            expect(globals.scrollToService.setScrollPos).not.toHaveBeenCalled();
        });
        it('should not call scrollToService.setScrollPos() on $stateChangeStart if state is not an infinite scroll state', () => {
            globals.$state.go('not-found');
            globals.$rootScope.$digest();
            globals.scope = globals.$rootScope.$new();

            let element = globals.$compile(scrollDirective)(globals.scope);
            globals.scope.$digest();

            spyOn(globals.scrollToService, 'setScrollPos');
            globals.$rootScope.$broadcast('$stateChangeStart', {}, {});
            globals.scope.$digest('$stateChangeStart');
            expect(globals.scrollToService.setScrollPos).not.toHaveBeenCalled();
        });
        
        it('should call scrollToService.getScrollPos() on $stateChangeSuccess if state is an infinite scroll state', () => {
            globals.$state.go('events');
            globals.$rootScope.$digest();
            globals.scope = globals.$rootScope.$new();

            let element = globals.$compile(scrollDirective)(globals.scope);
            globals.scope.$digest();

            spyOn(globals.$window, 'scrollTo');


            globals.$rootScope.$broadcast('$stateChangeSuccess', {}, {});
            globals.scope.$digest('$stateChangeSuccess');
            globals.$timeout.flush();
            expect(globals.$window.scrollTo).toHaveBeenCalled();
        });
        it('should check $window.innerWidth and call $window.scrollTo with [0, 0] when window is too wide', () => {
            globals.$state.go('events', { }, { reload: true });
            globals.$rootScope.$digest();
            globals.scope = globals.$rootScope.$new();

            spyOn(globals.scrollToService, 'getScrollPos').and.returnValue([0, 500]);
            spyOn(globals.$window, 'scrollTo');

            let element = globals.$compile(scrollDirective)(globals.scope);
            globals.$window.innerWidth = 980;

            globals.scope.$digest();
            globals.scope.scrollToPos = [0, 500];

            globals.$rootScope.$broadcast('$stateChangeSuccess', {}, {});
            globals.scope.$digest('$stateChangeSucces');

            globals.$timeout.flush();
            expect(globals.scrollToService.getScrollPos).toHaveBeenCalled();
            expect(globals.$window.scrollTo).toHaveBeenCalledWith(0, 0);
        });
        it('should check $window.innerWidth and call $window.scrollTo with [0, 0] when state is not infinite scroll', () => {
            globals.$state.go('eventDetails', { id: 1, name: 'blah' }, { reload: true });
            globals.$rootScope.$digest();
            globals.scope = globals.$rootScope.$new();

            spyOn(globals.scrollToService, 'getScrollPos').and.returnValue([0, 500]);
            spyOn(globals.$window, 'scrollTo');

            let element = globals.$compile(scrollDirective)(globals.scope);

            globals.scope.$digest();
            globals.scope.scrollToPos = [0, 500];

            globals.$rootScope.$broadcast('$stateChangeSuccess', {}, {});
            globals.scope.$digest('$stateChangeSucces');

            globals.$timeout.flush();
            expect(globals.scrollToService.getScrollPos).toHaveBeenCalled();
            expect(globals.$window.scrollTo).toHaveBeenCalledWith(0, 0);
        });
        it('should check $window.innerWidth and call $window.scrollTo with [0, 0] when last infinite scroll state is different than current', () => {
            globals.$state.go('venue', { id: 1, name: 'blah' });
            globals.$rootScope.$digest();
            globals.scope = globals.$rootScope.$new();

            let element = globals.$compile(scrollDirective)(globals.scope);

            globals.$rootScope.$broadcast('$stateChangeStart', {}, {});
            globals.scope.$digest('$stateChangeStart');
            globals.$state.go('events');

            globals.scope.$digest();
            globals.scope.scrollToPos = [0, 500];

            spyOn(globals.scrollToService, 'getScrollPos').and.returnValue([0, 500]);
            spyOn(globals.$window, 'scrollTo');

            globals.$rootScope.$broadcast('$stateChangeSuccess', {}, {});
            globals.scope.$digest('$stateChangeSucces');

            globals.$timeout.flush();
            expect(globals.scrollToService.getScrollPos).toHaveBeenCalled();
            expect(globals.$window.scrollTo).toHaveBeenCalledWith(0, 0);
        });
        it('should check $window.innerWidth and call $window.scrollTo with [0, 500]', () => {
            globals.$state.go('events');

            globals.$rootScope.$digest();
            globals.scope = globals.$rootScope.$new();

            let element = globals.$compile(scrollDirective)(globals.scope);

            globals.$rootScope.$broadcast('$stateChangeStart', {}, {});
            globals.scope.$digest('$stateChangeStart');
            globals.$state.go('events');

            globals.scope.$digest();
            globals.scope.scrollToPos = [0, 500];

            spyOn(globals.scrollToService, 'getScrollPos').and.returnValue([0, 500]);
            spyOn(globals.$window, 'scrollTo');

            globals.$rootScope.$broadcast('$stateChangeSuccess', {}, {});
            globals.scope.$digest('$stateChangeSucces');

            globals.$timeout.flush();
            expect(globals.scrollToService.getScrollPos).toHaveBeenCalled();
            expect(globals.$window.scrollTo).toHaveBeenCalledWith(0, 500);
        });

        it('should set the page size back to 0 if the state is a new infinite scroll state', () => {
            globals.$state.go('events', { }, { reload: true });
            globals.$rootScope.$digest();
            globals.scope = globals.$rootScope.$new();
            let element = globals.$compile(scrollDirective)(globals.scope);
            globals.scope.toState = '';

            globals.$rootScope.$broadcast('$stateChangeStart', {}, {});
            globals.scope.$digest('$stateChangeStart');
            spyOn(globals.EventsService, 'setEventsPageSize');
            globals.$state.go('venue', { id: 1, name: 'blah' }, { reload: true });
            globals.$rootScope.$broadcast('$stateChangeSuccess', {}, {});
            globals.scope.$digest('$stateChangeSucces');

            expect(globals.EventsService.setEventsPageSize).toHaveBeenCalledWith(0);
        });

        it('should not set page size back to 0 if the state is the same state', () => {
            globals.$state.go('events', { }, { reload: true });
            globals.$rootScope.$digest();
            globals.scope = globals.$rootScope.$new();
            let element = globals.$compile(scrollDirective)(globals.scope);
            globals.scope.toState = '';

            globals.$rootScope.$broadcast('$stateChangeStart', {}, {});
            globals.scope.$digest('$stateChangeStart');
            spyOn(globals.EventsService, 'setEventsPageSize');
            globals.$state.go('events', { }, { reload: true });
            globals.$rootScope.$broadcast('$stateChangeSuccess', {}, {});
            globals.scope.$digest('$stateChangeSucces');

            

            expect(globals.EventsService.setEventsPageSize).not.toHaveBeenCalled();
        });

        it('should not set the page back to 0 if the state is not an infnite scroll state', () => {
            globals.$state.go('events', { }, { reload: true });

            globals.$rootScope.$digest();
            globals.scope = globals.$rootScope.$new();
            let element = globals.$compile(scrollDirective)(globals.scope);
            globals.scope.toState = '';

            globals.$rootScope.$broadcast('$stateChangeStart', {}, {});
            globals.scope.$digest('$stateChangeStart');
            spyOn(globals.EventsService, 'setEventsPageSize');
            globals.$state.go('eventDetails', { id: 1, name: 'blah' }, { reload: true });
            globals.$rootScope.$broadcast('$stateChangeSuccess', {}, {});
            globals.scope.$digest('$stateChangeSucces');

            expect(globals.EventsService.setEventsPageSize).not.toHaveBeenCalled();
        });

        it('should set the page size if the last state was infinite scroll', () => {
            globals.$state.go('events', { pageIndex: 10 }, { reload: true });

            globals.$rootScope.$digest();
            globals.scope = globals.$rootScope.$new();
            let element = globals.$compile(scrollDirective)(globals.scope);
            globals.scope.toState = '';

            spyOn(globals.EventsService, 'setEventsPageSize');
            globals.$rootScope.$broadcast('$stateChangeStart', {}, {});
            globals.scope.$digest('$stateChangeStart');
            
            globals.$state.go('eventDetails', { id: 1, name: 'blah' }, { reload: true });
            globals.$rootScope.$broadcast('$stateChangeSuccess', {}, {});
            globals.scope.$digest('$stateChangeSucces');

            expect(globals.EventsService.setEventsPageSize).toHaveBeenCalled();
        });
    });
})();