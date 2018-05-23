(() => {
    'use strict';

    describe('trimHour filter', () => {
        let globals = {};

        beforeEach(inject($filter => {
            globals.filter = $filter('trimHour');
        }));
        afterEach(() => {
            globals = {};
        });

        it('Should remove the leading 0 from the time', () => {
            let input = '07:30 AM';
            let result = globals.filter(input);
            expect(result).toEqual('7:30 AM');
        });

        it('Should not remove the leading 1 from the time', () => {
            let input = '10:00 AM';
            let result = globals.filter(input);
            expect(result).toEqual(input);
        });

        it('Should return an empty string on null values', () => {
            let input = null;
            let result = globals.filter(input);
            expect(result).toEqual('');
        });
        
    });
})();