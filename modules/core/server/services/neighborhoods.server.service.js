'use strict';

const _ = require('lodash');
const Bluebird = require('bluebird');
const requestConstants = {
    apiBaseUrl: 'http://services.cincinnati.com/calendar/api.svc/',
    apiKey: '8760c9dd-1fef-429c-bdfc-1519274a598c',
    neighborhoods: 'neighborhoods',
    onErrorMessage: { error: 'The API returned an error.' }
};
const requestModule = Bluebird.promisify(require('request'), { multiArgs: true });
const request = requestModule.defaults({ baseUrl: requestConstants.apiBaseUrl });

export function getNeighborhoods() {
    let qs = {
        apiKey : requestConstants.apiKey
    };

    return request(requestConstants.neighborhoods, { qs })
        .then(response => JSON.parse(response[1]))
        .catch(err => requestConstants.onErrorMessage);
}
