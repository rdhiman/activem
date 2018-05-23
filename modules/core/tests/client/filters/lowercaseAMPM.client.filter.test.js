(() => {
    'use strict';

    describe('AMPM filter', () => {
        let globals = {};

        beforeEach(inject($filter => {
            globals.filter = $filter('lowercaseAMPM');
        }));
        afterEach(() => {
            globals = {};
        });

        it('Should replace uppercase AM with lowercase a.m.', () => {
            let input = '7:00 AM';
            let result = globals.filter(input);
            expect(result).toEqual('7:00 a.m.');
        });

        it('Should replace uppercase PM with lowercase p.m.', () => {
            let input = '7:00 PM';
            let result = globals.filter(input);
            expect(result).toEqual('7:00 p.m.');
        });

        it('Should return an empty string on null values', () => {
            let input = null;
            let result = globals.filter(input);
            expect(result).toEqual('');
        });

    });
})();