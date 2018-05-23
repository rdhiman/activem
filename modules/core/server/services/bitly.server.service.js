'use strict';

const Bluebird = require('bluebird');
const request = Bluebird.promisify(require('request'), { multiArgs: true });
const requestConstants = {
    apiUrl: 'https://api-ssl.bitly.com/v3/shorten',
    access_token: '11b5a2a857c2ed08543d9d4032875160756d6bbd',
    onErrorMessage: { error: 'The API returned an error.' }
};

export function getBitlyUrl(url) {
    return request(requestConstants.apiUrl, { qs: { access_token: requestConstants.access_token, longUrl: url } })
        .then(response => JSON.parse(response[1]))
        .catch(err => requestConstants.onErrorMessage);
}
