'use strict';

require('babel-register');

const browserName = process.env.BROWSER || 'chrome';

// Protractor configuration
let config = {
    baseUrl: 'http://localhost:'+ (process.env.PORT || 3001),
    seleniumAddress: 'http://localhost:4444/wd/hub',
    maxSessions: 4,
    directConnect: !process.env.SELENIUM,
    chromeDriver: 'node_modules/.bin/chromedriver',
    capabilities: {
        browserName: browserName 
    },
    specs: [
        'modules/*/tests/e2e/*.js',
        'modules/*/tests/e2e/**/*.js'
    ],
    jasmineNodeOpts: {
        print: function() {},
        showColors: true
    },
    onPrepare: function() {
        const SpecReporter = require('jasmine-spec-reporter');
        jasmine.getEnv().addReporter(new SpecReporter({
            displayStacktrace: 'all',
            displaySpecDuration: true
        }));
    }
};

if (process.env.TRAVIS) {
  config.capabilities = {
    browserName: 'firefox'
  };
}

exports.config = config;
