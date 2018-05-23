(() => {
    'use strict';

    //Start by defining the main module and adding the module dependencies
    angular.module(ApplicationConfiguration.applicationModuleName, ApplicationConfiguration.applicationModuleVendorDependencies);

    // Setting HTML5 Location Mode
    angular.module(ApplicationConfiguration.applicationModuleName).config(($locationProvider, $compileProvider) => {
        $locationProvider.html5Mode(true).hashPrefix('!');
    });
})();
