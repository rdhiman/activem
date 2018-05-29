(() => {
    'use strict';

    class UserService {
        constructor($http, $window, userData) {
            _.merge(this, { $http, $window, userData });
            this.localStorageClientId = 'surfairLocalStorage';
        }

        getUserCredentials(currentUserData) {
            let user = _.find(this.userData, { email: currentUserData.email });
            if (user) {
                this.saveUserLocally(user);
                return user;
            } else {
                return {};
            }
        }

        saveUserLocally(user) { //save user in local storage
            this.$window.localStorage.setItem(this.localStorageClientId, JSON.stringify(user));
        }

        getUserFromLocalStorage() { // functoins to get user from local storage
            let localStorageData = this.$window.localStorage.getItem(this.localStorageClientId);
            if (localStorageData !== null) {
                return JSON.parse(this.$window.localStorage.getItem(this.localStorageClientId));
            } else {
                return {};
            }
        }

        deleteLocalUser() { //delete user from local storage
            this.$window.localStorage.removeItem(this.localStorageClientId);
        }
    }

    angular
        .module('core')
        .service('UserService', UserService);

})();
