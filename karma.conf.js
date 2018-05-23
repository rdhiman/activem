'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    defaultAssets = require('./config/assets/default'),
    testAssets = require('./config/assets/test'),
    testConfig = require('./config/env/test'),
    karmaReporters = ['story', 'junit', 'kjhtml', 'coverage'];

// Karma configuration
module.exports = function(karmaConfig) {
    karmaConfig.set({
        // Frameworks to use
        frameworks: ['jasmine'],

        // List of files / patterns to load in the browser
        files: _.union(defaultAssets.client.lib.js, defaultAssets.client.lib.tests, defaultAssets.client.js, testAssets.tests.client, defaultAssets.client.views),

        // Test results reporter to use
        // Possible values: 'dots', 'progress', 'junit', 'growl', 'coverage'
        reporters: karmaReporters,

        // Configure the coverage reporter
        coverageReporter: {
            dir: 'test/coverage/client',
            instrumenters: {
                isparta: require('isparta')
            },
            instrumenter: {
                '**/*.js': 'isparta'
            },
            check: {
                global: {
                    statements: 98,
                    branches: 92,
                    functions: 97,
                    lines: 98
                },
                each: {
                    statements: 83,
                    branches: 75,
                    functions: 66,
                    lines: 66
                }
            },
            reporters: [
                {type: 'text'},
                {type: 'json', subdir: '.', file: 'coverage.json'},
                {type: 'html', subdir: '.', file: 'index.html'}
            ],
        },

        // Web server port
        port: 9876,

        // Enable / disable colors in the output (reporters and logs)
        colors: true,

        // Level of logging
        // Possible values: karmaConfig.LOG_DISABLE || karmaConfig.LOG_ERROR || karmaConfig.LOG_WARN || karmaConfig.LOG_INFO || karmaConfig.LOG_DEBUG
        logLevel: karmaConfig.LOG_INFO,

        // Enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        preprocessors: {
            'modules/*/client/views/**/*.html': ['ng-html2js'],
            'public/config.js': ['babel'],
            'public/application.js': ['babel'],
            'modules/*/client/**/*.js': ['coverage', 'babel'],
            'modules/*/tests/**/*.js': ['babel']
        },

        babelPreprocessor: {
            options: {
                sourceMap: 'inline'
            }
        },

        ngHtml2JsPreprocessor: {
            stripPrefix: 'modules/',
            moduleName: 'core'
        },

        // junit
        junitReporter: {
            outputDir: 'test/results/',
            suite: 'karma'
        },
        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: ['Firefox'],

        reportSlowerThan: 2000,

        // If browser does not capture in given timeout [ms], kill it
        captureTimeout: 60000,

        browserDisconnectTimeout: 60000,
        browserNoActivityTimeout: 20000,

        // Continuous Integration mode
        // If true, it capture browsers, run tests and exit
        singleRun: true
    });
};