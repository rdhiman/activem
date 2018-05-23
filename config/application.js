'use strict';

const config = require('./config');
const express = require('./express');
const chalk = require('chalk');

module.exports.init = callback => {
    let app = express.init();
    if (callback) callback(app, config);
};

module.exports.start = callback => {

    module.exports.init((app, config) => {

        // Start the app by listening on <port>
        app.listen(config.port, () => {

            // Logging initialization
            console.log('--');
            console.log(chalk.green(config.app.title));
            console.log(chalk.green('Environment:\t\t\t' + process.env.NODE_ENV));
            console.log(chalk.green('Port:\t\t\t\t' + config.port));
            if (process.env.NODE_ENV === 'secure') {
                console.log(chalk.green('HTTPs:\t\t\t\ton'));
            }
            console.log(chalk.green('App version:\t\t\t' + config.meanjs.version));
            console.log('--');

            if (callback) callback(app, config);
        });

    });

};
