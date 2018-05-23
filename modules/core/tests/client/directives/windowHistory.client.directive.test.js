(() => {
    'use strict';

    describe('windowHistory directive', () => {
        let globals = {};

        const windowHistoryDirective = '<div window-history></div>';

        function triggerClick (elem) {
            elem.triggerHandler('click');
        }

        beforeEach(inject(($compile, $rootScope, $window) => {
            _.assign(globals, { $compile, $rootScope, $window });
            globals.$compile = $compile;
            globals.scope = $rootScope.$new();
        }));

        afterEach(() => {
            globals.scope.$destroy();
            globals = {};
        });

        it('Element click should call $window.history.back()', () => {
            let element = globals.$compile(windowHistoryDirective)(globals.scope);
            document.body.appendChild(element[0]);
            globals.scope.$digest();
            spyOn(globals.$window.history, 'back');
            var event = $.Event('click');
            element.trigger(event);
            expect(globals.$window.history.back).toHaveBeenCalled();
        });
    });
})();