(() => {
    'use strict';

    describe('abbreviate month filter', () => {
        let globals = {};

        beforeEach(inject($filter => {
            globals.filter = $filter('abbreviateMonth');
        }));
        afterEach(() => {
            globals = {};
        });

        it('Should replace the full month with its AP abbreviation.', () => {
            let input = 'January February August September October November December';
            let result = globals.filter(input);
            expect(result).toEqual('Jan. Feb. Aug. Sept. Oct. Nov. Dec.');
        });

        it('Should not replace the month with an AP abbreviation.', () => {
            let input = 'March April May June July';
            let result = globals.filter(input);
            expect(result).toEqual(input);
        });

    });
})();