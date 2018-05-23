(() => {
    'use strict';

    describe('defaultSidebar directive', () => {
        const sidebarHTML = '<default-sidebar weekend-events="weekendEvents"></default-sidebar>';
        let globals = {};

        beforeEach(inject(($compile, $rootScope) => {
            _.assign(globals, { $compile, $rootScope });
            globals.scope = globals.$rootScope.$new();
            globals.scope.weekendEvents = [
                {
                    node: {
                        title: 'test'
                    }
                }
            ];
        }));
        afterEach(function() {
            globals.scope.$destroy();
            globals = {};
        });
        
        it('Weekendevents data should render in the sidebar',() => {
            globals.element = globals.$compile(sidebarHTML)(globals.scope);
            globals.scope.$digest();
            expect(globals.element.find('h3').text()).toMatch('test');
        });

    });
})();