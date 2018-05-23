'use strict';

const neighborhoodsController = require('../../server/controllers/neighborhoods.server.controller');
const cacheService = require('../../server/services/cache.server.service');
const expect = require('chai').expect;
const mockExpress = require('mock-express');
const nock = require('nock');
const sinon = require('sinon');
const app = mockExpress();

describe('Controller: Neighborhoods', () => {
    let globals = {};
    
    beforeEach(() => {
        globals.req = app.makeRequest();
        globals.res = app.makeResponse();
        globals.req.query = {};

        globals.getCacheStub = sinon.stub(cacheService, 'getCache');
        globals.getCacheStub.resolves(false);
        globals.setCacheStub = sinon.stub(cacheService, 'setCache');
        globals.setCacheStub.resolves(false);

        globals.garbageJSON = '<I am HTML, not JSON!  Fear me!/>';
        globals.expectedAPIError = {
            error: 'The API returned an error.'
        };
        globals.expectedOutput = {
            someJson: 'some json content'
        };
        globals.expectedCacheOutput = {
            json: 'some other json'
        };

        globals.res.status = code => {
            expect(code).to.equal(200);
            return globals.res;
        };
    });

    afterEach(() => {
        globals.getCacheStub.restore();
        globals.setCacheStub.restore();
    });

    it('getNeighborhoods should return valid JSON when the status is 200', done => {
        let db = nock('http://services.cincinnati.com').get('/calendar/api.svc/neighborhoods')
                    .query(queryObj => true).reply(200, globals.expectedOutput);
        globals.req.query = { };
        globals.res.status = code => {
            expect(code).to.equal(200);
            return globals.res;
        };
        globals.res.json = obj => {
            expect(JSON.stringify(obj)).to.deep.equal(JSON.stringify(globals.expectedOutput));
            done();
        };

        neighborhoodsController.getNeighborhoods(globals.req, globals.res);
    });

    it('getNeighborhoods should use the cache if it exists', done => {
        globals.getCacheStub.resolves(globals.expectedCacheOutput);
        
        globals.res.status = code => {
            expect(code).to.equal(200);
            return globals.res;
        };
        globals.res.json = obj => {
            expect(obj).to.deep.equal(globals.expectedCacheOutput.json);
            done();
        };

        neighborhoodsController.getNeighborhoods(globals.req, globals.res);
    });
    
});
