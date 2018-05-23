(() => {
    'use strict';

    class EventDetailsController {
        constructor(eventData, futureEvents, relatedEvents, BitlyService, gmapsService, $location, $scope, $timeout, $window, $stateParams) {
            $window.document.title = eventData.prodName + ' - Cincinnati Calendar';
            this.event = eventData;
            this.futureEvents = futureEvents.pageEvents;
            this.relatedEvents = relatedEvents.pageProductions;
            this.pageUrl = $location.absUrl();
            this.phone = eventData.prodPhone || eventData.apiPresenter.presPhone || eventData.apiVenue.venuePhone || '';
            BitlyService.getBitlyUrl({ cachBust: $stateParams.cacheBust, shareUrl: encodeURI($location.absUrl()) }).then(result => {
                if(result.error){
                    this.bitlyShareUrl = $location.absUrl();
                }else{
                    this.bitlyShareUrl = result.url;
                }
            });

            this.event.directionsLink = gmapsService.generateDirectionsLink(
                this.event.apiVenue.venueAddress,
                this.event.apiVenue.venueCity,
                this.event.apiVenue.venueState,
                this.event.apiVenue.venueZip
            );
            
            this.event.mapEmbed = gmapsService.generateMapEmbed(
                this.event.apiVenue.venueAddress,
                this.event.apiVenue.venueCity,
                this.event.apiVenue.venueState,
                this.event.apiVenue.venueZip
            );
            
            $scope.$on('$viewContentLoaded', () => {
                $timeout(() => {
                    $window.addtocalendar.load();
                });
            });
        }
    }

    angular
        .module('core')
        .controller('EventDetailsController', EventDetailsController);

})();
