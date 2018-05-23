(() => {
    'use strict';

    describe('chromeless filter', () => {
        let globals = {};

        beforeEach(inject(($filter, $window) => {
            globals.filter = $filter('chromeless');
            globals.$window = $window;
        }));
        afterEach(() => {
            globals = {};
        });

        it('When chromeless is false or does not exist, the url should be unchanged', () => {
            let input = '/';
            let result = globals.filter(input);
            expect(result).toEqual('');
        });

        it('When chromeless is true, the url should be have ?chromeless=true prepended', () => {
            let input = '/?';
            globals.$window.chromeless = true;
            let result = globals.filter(input);
            expect(result).toEqual('/?chromeless=true');
        });
    });
})();