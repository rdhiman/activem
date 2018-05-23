(() => {
    'use strict';

    // Init the application configuration module for AngularJS application
    window.ApplicationConfiguration = (() => {
        // Init module configuration options
        const applicationModuleName = 'cincy-cal';
        const applicationModuleVendorDependencies = [
            'ngResource',
            'ngCookies',
            'ngAnimate',
            'ngTouch',
            'ngSanitize',
            'ui.router',
            'ui.bootstrap',
            'ngDfp',
            'vcRecaptcha'
        ];

        // Add a new vertical module
        const registerModule = (moduleName, dependencies) => {
            // Create angular module
            angular.module(moduleName, dependencies || []);

            // Add the module to the AngularJS configuration file
            angular.module(applicationModuleName).requires.push(moduleName);
        };

        return {
            applicationModuleName: applicationModuleName,
            applicationModuleVendorDependencies: applicationModuleVendorDependencies,
            registerModule: registerModule
        };
    })();
})();
