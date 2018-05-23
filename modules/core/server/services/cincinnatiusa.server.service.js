'use strict';

const Bluebird = require('bluebird');
const request = Bluebird.promisify(require('request'), { multiArgs: true });
const requestConstants = {
    apiUrl: 'http://cincinnatiusa.com/api/weekendblockjson',
    onErrorMessage: { error: 'The API returned an error.' }
};

export function getWeekendEvents() {
    return request(requestConstants.apiUrl, {})
        .then(response => JSON.parse(response[1]))
        .catch(err => requestConstants.onErrorMessage);
}
