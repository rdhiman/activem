'use strict';

const newrelic = require('newrelic');
require('babel-register');
const config = require('./config/config');
const mongoose = require('mongoose');
const chalk = require('chalk');

module.exports.db = mongoose.connect(config.db, function(err) {
    if (err) {
        console.error(chalk.red('Could not connect to MongoDB!'));
        console.log(chalk.red(err));
    }
});

const app = require('./config/application');
const server = app.start();

