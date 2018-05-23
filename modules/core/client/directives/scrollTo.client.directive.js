(() => {
    'use strict';

    function scrollTo(scrollToService, $state, $document, $timeout, $window, EventsService) {
        return {
            restrict: 'A',
            link
        };

        function link(scope, element, attrs) {
            scope.scrollToPos = [];
            $document.bind('scroll', () => {
                scope.scrollPosition = [ $window.pageXOffset, $window.pageYOffset ];
            });

            scope.isInfiniteScrollState = state => {
                return state.name && (state.name.indexOf('events') > -1 || state.name.indexOf('presenter') > -1 || state.name.indexOf('venue') > -1);
            };

            scope.$on('$stateChangeSuccess', () => {
                $timeout(() => {
                    scope.scrollToPos = scrollToService.getScrollPos();
                    if($window.innerWidth < 980 && scope.isInfiniteScrollState($state.current) && scrollToService.lastInfiniteScrollState === $state.current.name) {
                        $window.scrollTo(scope.scrollToPos[0], scope.scrollToPos[1]);
                    } else {
                        $window.scrollTo(0, 0);
                    }
                }, 0);
            });

            scope.$on('$stateChangeStart', (event, toState, toParams, fromState, fromParams) => {
                if($window.innerWidth < 980){
                    if(scope.isInfiniteScrollState(toState) && scrollToService.lastInfiniteScrollState && scrollToService.lastInfiniteScrollState !== toState.name){
                        EventsService.setEventsPageSize(0);
                    }

                    if(scope.isInfiniteScrollState($state.current)){
                        scrollToService.setScrollPos(scope.scrollPosition);

                        scrollToService.lastInfiniteScrollState = $state.current.name;
                        
                        if(fromParams && fromParams.pageIndex){
                            EventsService.setEventsPageSize(fromParams.pageIndex - 1);
                        }
                    }
                }
            });
        }
    }
    angular
        .module('core')
        .directive('scrollTo', scrollTo);
})();