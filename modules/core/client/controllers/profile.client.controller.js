(() => {
    'use strict';

    class ProfileController {
        constructor($state, $window) {
            _.assign(this, { $state, $window });
            this.loggedInUserData = this.$state.params.loggedInUserData; //get logged in user's data and display on the profile page
        }

        loginView() {
            this.$state.go('login'); //go back to the login page
        }
    }

    angular
        .module('core')
        .controller('ProfileController', ProfileController);

})();
