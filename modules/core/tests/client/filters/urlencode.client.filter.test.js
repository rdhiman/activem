(() => {
    'use strict';

    describe('urlencode filter', () => {
        let globals = {};

        beforeEach(inject($filter => {
            globals.filter = $filter('urlencode');
        }));
        afterEach(() => {
            globals = {};
        });

        it('Should replaces spaces and slashes with a dashes(-) in a string', () => {
            let input = 'A string with spaces and a/slash';
            let result = globals.filter(input);
            expect(result).toEqual('A-string-with-spaces-and-a-slash');
        });

        it('Should replace special characters in a string', () => {
            let input = 'A string with ?#/:;&';
            let result = globals.filter(input);
            expect(result).toEqual('A-string-with-%3F%23-%3A%3B%26');
        });
    });
})();