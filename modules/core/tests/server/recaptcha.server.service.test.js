'use strict';

const recaptchaService = require('../../server/services/recaptcha.server.service');
const expect = require('chai').expect;
const nock = require('nock');

describe('Service: Recaptcha', () => {
    let globals = {};
    beforeEach(() => {
        globals.garbageJSON = '<I am HTML, not JSON!  Fear me!/>';
        globals.expectedAPIError = {
            error: 'The API returned an error.'
        };
        globals.expectedOutput = {
            success: false
        };
    });

    it('verify should return false when the JSON parse fails', done => {
        let g = nock('https://www.google.com').post('/recaptcha/api/siteverify').reply(200, globals.garbageJSON);

        recaptchaService.verify({ reponse: 'abc123' }).then(obj => {
            expect(obj).to.deep.equal(globals.expectedAPIError);
            done();
        });
    });
    
    it('verify should return valid JSON when the status is 200', done => {
        let g = nock('https://www.google.com').post('/recaptcha/api/siteverify').reply(200, globals.expectedOutput);

        recaptchaService.verify().then(obj => {
            expect(obj).to.deep.equal(globals.expectedOutput);
            done();
        });
    });
});
