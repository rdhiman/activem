(() => {
    'use strict';

    describe('datePinner directive', () => {
        const datePinnerHtml = '<div date-pinner><div class="cal-date-tag-wrapper"><div><h2 class="cal-date"><span class="cal-sub-label"></span></h2></div></div></div>';
        let globals = {};

        beforeEach(inject(($compile, $rootScope, $window) => {  
            _.assign(globals, { $compile, $rootScope, $window });
            globals.scope = globals.$rootScope.$new();
            globals.rootScope = $rootScope;

            globals.dummyCallCount = 0;
            globals.dummyOffset = () => {
                if(globals.dummyCallCount){
                    return { top: 0 };
                }else{
                    globals.dummyCallCount = 1;
                    return { top: 2 };
                }
            };
        }));

        afterEach(() => {
            globals.scope.$destroy();
            globals = {};
        });

        it('should remove cal-pinned-date to the cal sub label if the page is not scrolled', () => {
            spyOn($.fn, 'removeClass');

            let element = globals.$compile(datePinnerHtml)(globals.scope);
            document.body.appendChild(element[0]);
            globals.scope.$digest();
            var event = $.Event('scroll');
            element.trigger(event);

            expect($.fn.removeClass).toHaveBeenCalled();
        });
        it('should add cal-pinned-date to the cal sub label if the page is scrolled enoguh', () => {
            spyOn($.fn, 'scrollTop').and.returnValue(10000);
            spyOn($.fn, 'addClass');

            let element = globals.$compile(datePinnerHtml)(globals.scope);
            document.body.appendChild(element[0]);
            globals.scope.$digest();
            var event = $.Event('scroll');
            element.trigger(event);

            expect($.fn.addClass).toHaveBeenCalled();
        });
        it('should do nothing if the windows scroll is greater than both the sub label offset and the wrapper offset is less than the scroll', () => {
            spyOn($.fn, 'scrollTop').and.returnValue(1);
            spyOn($.fn, 'offset').and.callFake(globals.dummyOffset);

            let element = globals.$compile(datePinnerHtml)(globals.scope);
            document.body.appendChild(element[0]);
            globals.scope.$digest();
            spyOn($.fn, 'removeClass');
            var event = $.Event('scroll');
            element.trigger(event);

            expect($.fn.removeClass).not.toHaveBeenCalled();
        });
    });
})();