(() => {
    'use strict';

    describe('ScrollTo Service', () => {
        let globals = {};

        beforeEach(inject((scrollToService) => {
            _.assign(globals, { scrollToService });
        }));
        afterEach(() => {
            globals = {};
        });
        it('setScrollPos should set scrollPos', () => {
            globals.scrollToService.scrollPos = [];
            const scrollPosition = [0, 500];
            globals.scrollToService.setScrollPos(scrollPosition);
            expect(globals.scrollToService.scrollPos).toEqual([0, 500]);
        });
        it('getScrollPos should return scrollPos', () => {
            globals.scrollToService.scrollPos = [0, 500];
            const expected = [0, 500];
            const result = globals.scrollToService.getScrollPos();
            expect(result).toEqual(expected);
        });
    });
})();
