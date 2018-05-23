'use strict';

const _ = require('lodash');
const config = require('./config');
const chalk = require('chalk');
const fileStreamRotator = require('file-stream-rotator');
const fs = require('fs');

const validFormats = ['combined', 'common', 'dev', 'short', 'tiny'];

const logger = {
    getFormat: getLogFormat,
    getOptions: getLogOptions
};

module.exports = logger;

function getLogFormat() {
    let format = config.log && config.log.format ? config.log.format.toString() : 'combined';

    if (!_.includes(validFormats, format)) {
        format = 'combined';

        if (process.env.NODE_ENV !== 'test') {
            console.log();
            console.log(chalk.yellow('Warning: An invalid format was provided. The logger will use th default format of "' + format + '"'));
            console.log();
        }
    }
    return format;
}

function getLogOptions() {
    let options = config.log && config.log.options ? _.clone(config.log.options, true) : {};

    // check if the current environment config has the log stream option set
    if (_.has(options, 'stream')) {

        try {

            // check if we need to use rotating logs
            if (_.has(options, 'stream.rotatingLogs') && options.stream.rotatingLogs.active) {

                if (options.stream.rotatingLogs.fileName.length && options.stream.directoryPath.length) {

                    // ensure the log directory exists
                    if (!fs.existsSync(options.stream.directoryPath)) {
                        fs.mkdirSync(options.stream.directoryPath);
                    }

                    options.stream = fileStreamRotator.getStream({
                        filename: options.stream.directoryPath + '/' + options.stream.rotatingLogs.fileName,
                        frequency: options.stream.rotatingLogs.frequency,
                        verbose: options.stream.rotatingLogs.verbose
                    });
                } else {
                    // throw a new error so we can catch and handle it gracefully
                    throw new Error('An invalid fileName or directoryPath was provided for the rotating logs option.');
                }
            } else {
                
                // create the WriteStream to use for the logs
                if (options.stream.fileName.length && options.stream.directoryPath.length) {

                    // ensure the log directory exists
                    if (!fs.existsSync(options.stream.directoryPath)) {
                        fs.mkdirSync(options.stream.directoryPath);
                    }

                    options.stream = fs.createWriteStream(options.stream.directoryPath + '/' + config.log.options.stream.fileName, { flags: 'a' });

                } else {
                    // throw a new error so we can catch and handle it gracefully
                    throw new Error('An invalid fileName or directoryPath was provided for stream option.');
                }
            }
        } catch (err) {

            // remove the stream option
            delete options.stream;

            if (process.env.NODE_ENV !== 'test') {
                console.log();
                console.log(chalk.red('An error has occured during the creation of the WriteStream. The stream option has been omitted.'));
                console.log(chalk.red(err));
                console.log();
            }
        }
    }

    return options;
}