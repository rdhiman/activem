'use strict';

const Bluebird = require('bluebird');
const request = Bluebird.promisify(require('request'), { multiArgs: true });
const mongoose = require('mongoose');
const eventsService = require('./events.server.service.js');
const cincinnatiUsaService = require('./cincinnatiusa.server.service.js');
const bitlyService = require('./bitly.server.service.js');


export function getMongoStatus() {
    if (mongoose.connection.readyState) {
        return 'ok';
    } else {
        return 'Mongo isn\'t avalible.';
    }
}

export function getCalendarApiStatus() {
    return eventsService.getEvents().then(result => {
        if(result.error) {
            return 'The calendar threw an error.';
        } else {
            return 'ok';
        }
    });
}

export function getWeekendBlockApiStatus() {
    return cincinnatiUsaService.getWeekendEvents().then(result => {
        if(result.error) {
            return 'The CincinnatiUsa Weekend Events API threw an error.';
        } else {
            return 'ok';
        }
    });
}

export function getBitlyApiStatus() {
    return bitlyService.getBitlyUrl('someUrl').then(result => {
        if(result.error) {
            return 'The bitly API threw an error.';
        } else {
            return 'ok';
        }
    });
}
