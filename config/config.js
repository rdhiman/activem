'use strict';

/**
 * Module dependencies.
 */
const _ = require('lodash');
const chalk = require('chalk');
const glob = require('glob');
const fs = require('fs');
const path = require('path');

/**
 * Get files by glob patterns
 */
function getGlobbedPaths(globPatterns, excludes) {
    let files;
    let i;
    let output = [];
    const urlRegex = new RegExp('^(?:[a-z]+:)?\/\/', 'i');

    // If glob pattern is array then we use each pattern in a recursive way, otherwise we use glob
    if (_.isArray(globPatterns)) {
        globPatterns.forEach(globPattern => {
            output = _.union(output, getGlobbedPaths(globPattern, excludes));
        });
    } else if (_.isString(globPatterns)) {
        if (urlRegex.test(globPatterns)) {
            output.push(globPatterns);
        } else {
            files = glob.sync(globPatterns);
            if (excludes) {
                files = files.map(file => {
                    if (_.isArray(excludes)) {
                        for (i in excludes) {
                            file = file.replace(excludes[i], '');
                        }
                    } else {
                        file = file.replace(excludes, '');
                    }
                    return file.replace(/\.scss$/, '.css');
                });
            }
            output = _.union(output, files);
        }
    }
    return output;
}

/**
 * Validate NODE_ENV existence
 */
function validateEnvironmentVariable() {
    const environmentFiles = glob.sync('./config/env/' + process.env.NODE_ENV + '.js');
    console.log();
    if (!environmentFiles.length) {
        if (process.env.NODE_ENV) {
            console.error(chalk.red('+ Error: No configuration file found for "' + process.env.NODE_ENV + '" environment using development instead'));
        } else {
            console.error(chalk.red('+ Error: NODE_ENV is not defined! Using default development environment'));
        }
        process.env.NODE_ENV = 'development';
    }
    // Reset console color
    console.log(chalk.white(''));
}

/**
 * Validate Session Secret parameter is not set to default in production
 */
function validateSessionSecret(config, testing) {

    if (process.env.NODE_ENV !== 'production') {
        return true;
    }

    if (config.sessionSecret === 'MEAN') {
        if (!testing) {
            console.log(chalk.red('+ WARNING: It is strongly recommended that you change sessionSecret config while running in production!'));
            console.log(chalk.red('  Please add `sessionSecret: process.env.SESSION_SECRET || \'super amazing secret\'` to '));
            console.log(chalk.red('  `config/env/production.js` or `config/env/local.js`'));
            console.log();
        }
        return false;
    } else {
        return true;
    }
}

/**
 * Initialize global configuration files
 */
function initGlobalConfigFolders(config, assets) {
    // Appending files
    config.folders = {
        server: {},
        client: {}
    };

    // Setting globbed client paths
    config.folders.client = getGlobbedPaths(path.join(process.cwd(), 'modules/*/client/'), process.cwd().replace(new RegExp(/\\/g), '/'));
}

/**
 * Initialize global configuration files
 */
function initGlobalConfigFiles(config, assets) {
    // Appending files
    config.files = {
        server: {},
        client: {}
    };

    // Setting Globbed route files
    config.files.server.routes = getGlobbedPaths(assets.server.routes);

    // Setting Globbed config files
    config.files.server.configs = getGlobbedPaths(assets.server.config);

    // Setting Globbed js files
    config.files.client.js = getGlobbedPaths(assets.client.lib.js, 'public/').concat(getGlobbedPaths(assets.client.js, ['public/', 'modules/']));

    // Setting Globbed css files
    config.files.client.css = getGlobbedPaths(assets.client.lib.css, 'public/').concat(getGlobbedPaths(assets.client.css, ['public/', 'modules/']).concat(getGlobbedPaths(assets.client.sass, 'modules/')));

    // Setting Globbed test files
    config.files.client.tests = getGlobbedPaths(assets.client.tests);
}

/**
 * Initialize global configuration
 */
function initGlobalConfig() {
    // Validate NODE_ENV existence
    validateEnvironmentVariable();

    // Merge assets
    let defaultAssets = require(path.join(process.cwd(), 'config/assets/default'));
    let environmentAssets = require(path.join(process.cwd(), 'config/assets/', process.env.NODE_ENV)) || {};
    let assets = _.assign(defaultAssets, environmentAssets);

    // Merge config files
    let defaultConfig = require(path.join(process.cwd(), 'config/env/default'));
    let environmentConfig = require(path.join(process.cwd(), 'config/env/', process.env.NODE_ENV)) || {};
    let config = _.merge(defaultConfig, environmentConfig);

    // read package.json for MEAN.JS project information
    let pkg = require(path.resolve('./package.json'));
    config.meanjs = pkg;

    // We only extend the config object with the local.js custom/local environment if we are on
    // production or development environment. If test environment is used we don't merge it with local.js
    // to avoid running test suites on a prod/dev environment (which delete records and make modifications)
    if (process.env.NODE_ENV !== 'test') {
        config = _.merge(config, (fs.existsSync(path.join(process.cwd(), 'config/env/local.js')) && require(path.join(process.cwd(), 'config/env/local.js'))) || {});
    }

    // Initialize global globbed files
    initGlobalConfigFiles(config, assets);

    // Initialize global globbed folders
    initGlobalConfigFolders(config, assets);

    // Validate session secret
    validateSessionSecret(config);

    // Expose configuration utilities
    config.utils = {
        getGlobbedPaths,
        validateSessionSecret
    };

    return config;
}

/**
 * Set configuration object
 */
module.exports = initGlobalConfig();
