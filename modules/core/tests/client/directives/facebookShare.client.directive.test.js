(() => {
    'use strict';

    describe('facebookShare directive', () => {
        const facebookShareHTML = '<facebook-share url="{{pageUrl}}" name="{{prodName}}" desc="{{prodDescription}}" image="{{venuePhoto}}"></facebook-share>';
        let globals = {};
        let uiMock = (obj) => {};

        beforeEach(inject(($compile, $rootScope, $window) => {
            _.assign(globals, { $compile, $rootScope, $window });
            globals.scope = globals.$rootScope.$new();
            globals.$window.FB = { ui: uiMock };
            globals.expected = {
                method: 'feed',
                link: '',
                name: '',
                description: '',
                picture: 'http://' + $window.location.host + '/images/cincy_facebook.jpg',
                caption: 'Cincinnati.com'
            };
        }));
        afterEach(function() {
            globals.scope.$destroy();
            globals = {};
        });
        
        it('If a Facebook image is supplied, use it',() => {
            globals.scope.venuePhoto = 'http://some.image/url.jpg';
            globals.expected.picture = globals.scope.venuePhoto;

            globals.element = globals.$compile(facebookShareHTML)(globals.scope);
            globals.scope.$digest();
            spyOn(globals.$window.FB, 'ui');
            globals.scope.share();
            expect(globals.$window.FB.ui).toHaveBeenCalledWith(globals.expected);
        });

        it('If no Facebook image is supplied, use default',() => {
            globals.element = globals.$compile(facebookShareHTML)(globals.scope);
            globals.scope.$digest();
            spyOn(globals.$window.FB, 'ui');
            globals.scope.share();
            expect(globals.$window.FB.ui).toHaveBeenCalledWith(globals.expected);
        }); 
    });
})();