(() => {
    'use strict';

    function clearInput($compile) {
        return {
            restrict: 'A',
            require: 'ngModel',
            scope: {
                text: '=ngModel',
                change: '&clearInputChange'
            },
            link: link
        };

        function link(scope, element, attrs, ctrl) {
            let clearButton = $compile('<span ng-show="text.length" ng-click="reset()" class="cal-input-clear-btn"></span>')(scope);
            element.after(clearButton);
            scope.reset = () => scope.text = '';
            scope.$watch('text', () => scope.change());
        }
    }

    angular
        .module('core')
        .directive('clearInput', clearInput);

})();