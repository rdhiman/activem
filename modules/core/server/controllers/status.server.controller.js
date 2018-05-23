'use strict';

let statusService = require('../services/status.server.service');
let pjson = require('../../../../package.json');
let _ = require('lodash');
let bluebird = require('bluebird');

exports.getServerStatus = (req, res) => {
    let services = {};
    let promises = [];

    services.mongo = statusService.getMongoStatus();
    promises.push(statusService.getCalendarApiStatus());
    promises.push(statusService.getWeekendBlockApiStatus());
    promises.push(statusService.getBitlyApiStatus());

    bluebird.all(promises).then(values => {
        services.calendarApi = values[0];
        services.weekendBlockApi = values[1];
        services.bitlyApi = values[2];

        let statusCode = 200;
        _.forOwn(services, value => {
            if(value !== 'ok'){
                statusCode = 500;
            }
        });

        let retJson = {
            services: services,
            status_code: statusCode,
            version: pjson.version
        };

        res.json(retJson);
    });
};
