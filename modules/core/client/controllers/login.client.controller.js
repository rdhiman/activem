(() => {
    'use strict';

    class LoginController {
        constructor($stateParams, $state, $window) {
            _.assign(this, { $stateParams, $state, $window });
        }

        //do other things here such as have a form for the user to login and send a login request then
    }

    angular
        .module('core')
        .controller('LoginController', LoginController);

})();
