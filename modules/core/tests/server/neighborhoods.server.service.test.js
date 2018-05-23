'use strict';

const neighborhoodService = require('../../server/services/neighborhoods.server.service');
const expect = require('chai').expect;
const nock = require('nock');

describe('Service: Neighborhoods', () => {
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
    it('getNeighborhoods should return a clean error when the JSON parse fails', done => {
        let db = nock('http://services.cincinnati.com').get('/calendar/api.svc/neighborhoods')
                    .query(queryObj => true).reply(200, globals.garbageJSON);

        neighborhoodService.getNeighborhoods().then(obj => {
            expect(JSON.stringify(obj)).to.deep.equal(JSON.stringify(globals.expectedAPIError));
            done();
        });
    });
    it('getNeighborhoods should return valid JSON when the status is 200', done => {
        let db = nock('http://services.cincinnati.com').get('/calendar/api.svc/neighborhoods')
                    .query(queryObj => true).reply(200, globals.expectedOutput);

        neighborhoodService.getNeighborhoods().then(obj => {
            expect(JSON.stringify(obj)).to.deep.equal(JSON.stringify(globals.expectedOutput));
            done();
        });
    });
});
