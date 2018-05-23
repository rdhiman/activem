'use strict';

const cincinnatiUSAService = require('../../server/services/cincinnatiusa.server.service');
const expect = require('chai').expect;
const nock = require('nock');

describe('Service: cincinnatiusa.com weekend events', () => {
    let globals = {};
    beforeEach(() => {
        globals.garbageJSON = '<I am HTML, not JSON!  Fear me!/>';
        globals.expectedAPIError = {
            error: 'The API returned an error.'
        };
        globals.expectedOutput = {
            someJson: 'some json content'
        };
    });
    it('getWeekendEvents should return a clean error when the JSON parse fails', done => {
        let db = nock('http://cincinnatiusa.com').get('/api/weekendblockjson')
                    .query(queryObj => true).reply(200, globals.garbageJSON);

        cincinnatiUSAService.getWeekendEvents().then(obj => {
            expect(JSON.stringify(obj)).to.deep.equal(JSON.stringify(globals.expectedAPIError));
            done();
        });
    });
    it('getEvents should return valid JSON when the status is 200', done => {
        let db = nock('http://cincinnatiusa.com').get('/api/weekendblockjson')
                    .query(queryObj => { return true; }).reply(200, globals.expectedOutput);

        cincinnatiUSAService.getWeekendEvents().then(obj => {
            expect(JSON.stringify(obj)).to.deep.equal(JSON.stringify(globals.expectedOutput));
            done();
        });
    });
});
