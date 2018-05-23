(() => {
    'use strict';

    describe('adblocktest runblock', () => {
        const adBlockTestHTML = '<div ad-block-test></div>';
        let globals = {};

        beforeEach(inject(($window, $document, $rootScope, $compile) => {
            _.assign(globals, { $window, $document, $rootScope, $compile });
        }));

        afterEach(() => {
            globals.$window.adsEnabled = undefined;
            globals = {};
        });

        it('should add a div to the dom with id main_ad', () => {
            globals.scope = globals.$rootScope.$new();
            globals.element = globals.$compile(adBlockTestHTML)(globals.scope);
            globals.scope.$digest();

            $('body').append(globals.element);

            expect($('#main_ad').length).toEqual(1);
        });
        it('should set showAds to true when theres no adblocker', () => {
            spyOn($.fn, 'height').and.returnValue(1);

            globals.scope = globals.$rootScope.$new();
            globals.element = globals.$compile(adBlockTestHTML)(globals.scope);
            globals.scope.$digest();

            expect(globals.$window.adsEnabled).toEqual(true);
        });
        it('should detect when an adblocker has hidden the div', () => {
            spyOn($.fn, 'height').and.returnValue(0);

            globals.scope = globals.$rootScope.$new();
            globals.element = globals.$compile(adBlockTestHTML)(globals.scope);
            globals.scope.$digest();

            expect(globals.$window.adsEnabled).toEqual(undefined);
        });
    });
})();