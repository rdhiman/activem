'use strict';

const bluebird = require('bluebird');
const bitlyService = require('../../server/services/bitly.server.service');
const nock = require('nock');
const chai = require('chai');
const expect = chai.expect;

describe('bitly service', () => {
    let globals = {};


    beforeEach(() => {
        globals.expectedReturn = { data: 'some data' };
        globals.garbageReturn = '<html>Not json</html>';
        globals.expectedAPIError = { error: 'The API returned an error.' };
    });

    describe('get url', () => {
        it('should handle api errors', done => {
            let db = nock('https://api-ssl.bitly.com').get('/v3/shorten')
                    .query(queryObj => true).reply(200, globals.expectedReturn);

            bitlyService.getBitlyUrl('some url').then(obj => {
                expect(JSON.stringify(obj)).to.deep.equal(JSON.stringify(globals.expectedReturn));
                done();
            });
        });
        it('should hit the api if the url does exist', done => {
            let db = nock('https://api-ssl.bitly.com').get('/v3/shorten')
                    .query(queryObj => true).reply(200, globals.garbageReturn);

            bitlyService.getBitlyUrl('some url').then(obj => {
                expect(JSON.stringify(obj)).to.deep.equal(JSON.stringify(globals.expectedAPIError));
                done();
            });
        });
    });
});
