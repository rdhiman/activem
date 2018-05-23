(() => {
    'use strict';

    describe('resizeCobrand directive', () => {
        const resizeHTML = `<header id="cal-header-desktop" class=""></header>
            <header resize-cobrand resize-cobrand-desktop="cal-header-desktop" resize-cobrand-mobile="cal-header-mobile" id="cal-header-mobile" class=""></header>`;
        let globals = {};

        beforeEach(() => {
            angular.mock.module(function ($provide) {
                globals.myMock = {
                    innerHeight: 400,
                    innerWidth: 1000,
                    onresize: () => {},
                    MAW: {}
                };
                globals.myMock.MAW.header = () => {};
                $provide.value('$window', globals.myMock);
            });
        });

        beforeEach(inject(($compile, $rootScope, $window) => {  
            _.assign(globals, { $compile, $rootScope });
            globals.scope = globals.$rootScope.$new();
            globals.rootScope = $rootScope;
            globals.window = $window;
        }));
        afterEach(function() {
            globals.scope.$destroy();
            globals = {};
        });
        describe('MAW functions', () => {
            it('should trigger MAW call on link', () => {
                spyOn(globals.window.MAW, 'header');
                globals.element = globals.$compile(resizeHTML)(globals.scope);
                globals.scope.$digest();
                expect(globals.window.MAW.header).toHaveBeenCalledWith('cal-header-desktop', 'cincinnati', { layout: 'header-4' });
            });
            it('desktop header should be called when screen size is >980px', () => {
                globals.myMock.innerWidth = 20;
                globals.element = globals.$compile(resizeHTML)(globals.scope);
                globals.scope.$digest();
                spyOn(globals.window.MAW, 'header');
                globals.myMock.innerWidth = 1000;
                angular.element(globals.myMock).trigger('resize');
                expect(globals.window.MAW.header).toHaveBeenCalledWith('cal-header-desktop', 'cincinnati', { layout: 'header-4' });
            });
            it('mobile header should be called when screen size <980px', () => {
                globals.element = globals.$compile(resizeHTML)(globals.scope);
                globals.scope.$digest();
                spyOn(globals.window.MAW, 'header');
                globals.myMock.innerWidth = 20;
                angular.element(globals.myMock).trigger('resize');
                expect(globals.window.MAW.header).toHaveBeenCalledWith('cal-header-mobile', 'cincinnati', { layout: 'header-1' });
            });
        });
    });
})();