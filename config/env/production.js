'use strict';

var defaultEnvConfig = require('./default');

module.exports = {
    app: {
        title: 'Calendar of Events at Cincinnati.com',
        domain: 'calendar.cincinnati.com'
    },
    log: {
        // logging with Morgan - https://github.com/expressjs/morgan
        // Can specify one of 'combined', 'common', 'dev', 'short', 'tiny'
        format: process.env.LOG_FORMAT || 'combined',
        options: {
            // Stream defaults to process.stdout
            // Uncomment/comment to toggle the logging to a log on the file system
            stream: {
                directoryPath: process.env.LOG_DIR_PATH || process.cwd(),
                fileName: process.env.LOG_FILE || 'access.log',
                rotatingLogs: { // for more info on rotating logs - https://github.com/holidayextras/file-stream-rotator#usage
                    active: process.env.LOG_ROTATING_ACTIVE === 'true' ? true : false, // activate to use rotating logs 
                    fileName: process.env.LOG_ROTATING_FILE || 'access-%DATE%.log', // if rotating logs are active, this fileName setting will be used
                    frequency: process.env.LOG_ROTATING_FREQUENCY || 'daily',
                    verbose: process.env.LOG_ROTATING_VERBOSE === 'true' ? true : false
                }
            }
        }
    },
    facebook: {
        clientID: '157995810912644',
        clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
        callbackURL: '/api/auth/facebook/callback'
    },
    feedback: {
        email: 'calendar@cincinnati.com'
    },
    db: process.env.MONGO_URI || '',
};