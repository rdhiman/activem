(() => {
    'use strict';

    describe('gmaps Service', () => {
        let globals = {};

        beforeEach(inject((gmapsService, googleMapsAPIKey, $sce) => {
            _.assign(globals, { googleMapsAPIKey, $sce });
            globals.service = gmapsService;
            globals.sampleData = {};
            globals.sampleData.apiVenue = {
                venueAddress: '123 Main Street',
                venueCity: 'Cincinnati',
                venueState: 'Ohio',
                venueZip: '12345'
            };
        }));
        afterEach(() => {
            globals = {};
        });

        it('generateDirectionsLink should return a valid url', () => {
            let directionsUrl = globals.service.generateDirectionsLink(
                globals.sampleData.apiVenue.venueAddress,
                globals.sampleData.apiVenue.venueCity,
                globals.sampleData.apiVenue.venueState,
                globals.sampleData.apiVenue.venueZip
            );
            expect(directionsUrl.indexOf(' ') === -1).toBe(true);
        });

        it('generateMapEmbed should return a valid api url', () => {
            let mapEmbed = globals.service.generateMapEmbed(
                globals.sampleData.apiVenue.venueAddress,
                globals.sampleData.apiVenue.venueCity,
                globals.sampleData.apiVenue.venueState,
                globals.sampleData.apiVenue.venueZip
            );
            let mapEmbedString = globals.$sce.getTrustedUrl(mapEmbed);
            expect(mapEmbedString.indexOf(' ') === -1).toBe(true);
            expect(mapEmbedString.indexOf(globals.googleMapsAPIKey) > -1).toBe(true);
        });

    });
})();
