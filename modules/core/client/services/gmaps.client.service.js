(() => {
    'use strict';

    class gmapsService {
        constructor($sce,googleMapsAPIKey) {
            _.assign(this, { $sce, googleMapsAPIKey });
        }

        generateDirectionsLink(street, city, state, zip) {
            let gmapsSearchUrl = 'http://maps.google.com/?q=';
            let address = _.join([street, city, state, zip],', ');
            return gmapsSearchUrl + address.replace(/ /g,'+');
        }

        generateMapEmbed(street, city, state, zip) {
            let gmapsAPI = 'https://www.google.com/maps/embed/v1/place?q=';
            let address = _.join([street, city, state, zip],', ');
            address = address.replace(/ /g,'+');
            let key = '&key='+ this.googleMapsAPIKey;
            let url = gmapsAPI + address + key;
            return this.$sce.trustAsResourceUrl(url);
        }
    }

    angular
        .module('core')
        .service('gmapsService', gmapsService);

})();
