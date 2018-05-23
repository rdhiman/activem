(() => {
    'use strict';

    function datePinner($window) {

        return {
            restrict: 'A',
            link: link
        };

        function link(scope, element, attr) {
            angular.element($window).bind('scroll', () => {
                let scrollPos = $($window).scrollTop();
                element.find('.cal-sub-label').each((index, element) => {
                    let parent = $(element).parent('h2').parent();
                    let wrapper = $(element).parents('.cal-date-tag-wrapper');
                    if (parent.offset().top < scrollPos){
                        parent.addClass('cal-pinned-date');
                    } else if(wrapper.offset().top >= scrollPos){
                        parent.removeClass('cal-pinned-date');
                    }
                });
            });
        }
    }

    angular
        .module('core')
        .directive('datePinner', datePinner);
})();