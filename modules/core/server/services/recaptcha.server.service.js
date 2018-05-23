'use strict';

const Bluebird = require('bluebird');
const requestPost = Bluebird.promisify(require('request').post, { multiArgs: true });
const requestConstants = {
    apiUrl: 'https://www.google.com/recaptcha/api/siteverify',
    apiSecret: '6Lfp8AgUAAAAAA0Sri7QDx7UGD-aHJdn7Nt7xHK6',
    onErrorMessage: { error: 'The API returned an error.' }
};

export function verify(qs = {}){
    qs.secret = requestConstants.apiSecret;

    return requestPost(requestConstants.apiUrl, { form: qs })
        .then(response => {
            return { success: JSON.parse(response[1]).success };
        })
        .catch(err => requestConstants.onErrorMessage);
}