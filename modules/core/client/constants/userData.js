(function () {
    'use strict';

    angular
        .module('core')
        .constant('userData', [
            {
                firstName: 'John',
                lastName: 'Smith',
                email: 'jsmith@gmail.com',
                role: 'escapes',
            },
            {
                firstName: 'Sean',
                lastName: 'John',
                email: 'sjohn@gmail.com',
                role: 'member',
            },
            {
                firstName: 'P',
                lastName: 'Diddy',
                email: 'pdiddy@gmail.com',
                role: 'group',
            },
            {
                firstName: 'J',
                lastName: 'Cole',
                email: 'jcole@gmail.com',
                role: 'notAllowed',
            }
        ]);
})();
