(() => {
    'use strict';

    function facebookShare($window) {
        return {
            restrict: 'E',
            template: `
                      <a href="" ng-click="share()" class="cal-share-link cal-share-fb">
                          <span class="cal-share-name">Facebook</span>
                      </a>
                      `,
            link: ($scope, elem, attr) => {
                $scope.share = () => {
                    let image = attr.image || 'http://' + $window.location.host + '/images/cincy_facebook.jpg';
                    $window.FB.ui({
                        method: 'feed',
                        link: attr.url,
                        name: attr.name,
                        description: attr.desc,
                        picture: image,
                        caption: 'Cincinnati.com'
                    });
                };
            }
        };
    }

    angular
        .module('core')
        .directive('facebookShare', facebookShare);

})();