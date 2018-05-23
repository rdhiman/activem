(function() {
    'use strict';

    function runBlock($state, $rootScope, $window, EventsService) {
        let lastPageUrl = '';

        function adblockEnabled() {
            return $window.adsEnabled ? 'true' : 'false';
        }

        $rootScope.$on('$stateChangeSuccess', () => {
            if(MAW){
                if(typeof utag === 'undefined'){
                    MAW.omniture('cincinnati', {
                        props: {
                            prop4: '',
                            prop8: $window.location.hostname,
                            prop12: moment().format('LT'),
                            prop13: moment().format('dddd'),
                            prop17: 'entertainment',
                            prop18: 'calendar',
                            prop19: '',
                            prop20: '',
                            prop23: 'calendar.cincinnati.com',
                            prop25: 'gpaper120',
                            prop33: 'entertainment',
                            prop34: 'entertainment:events',
                            prop35: '',
                            prop41: 'addtocalendar',
                            prop44: 'Cincinnati Calendar of Events',
                            prop46: EventsService.getEventCategoryName(),
                            prop51: $(window).scrollTop(),
                            prop58: adblockEnabled(),
                            prop66: 'Cincy Calendar',
                            prop64: '',
                            eVar99: 'LDSN'
                        }
                    });
                } else {
                    utag.data.analytics.prop12 = moment().format('LT');
                    utag.data.analytics.prop13 = moment().format('dddd');
                    utag.data.analytics.prop64 = lastPageUrl;
                    utag.data.analytics.prop51 = $(window).scrollTop();
                    utag.data.analytics.prop8 = $window.location.hostname;
                    utag.data.analytics.prop58 = adblockEnabled();
                    utag.data.analytics.prop46 = EventsService.getEventCategoryName();

                    utag.view(utag.data);
                }
            }
        });

        $rootScope.$on('$stateChangeStart', (event, toState) => {
            lastPageUrl = $window.location.href;
        });
    }

    angular
        .module('core')
        .run(runBlock);
})();