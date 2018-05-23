'use strict';

const eventsService = require('../../server/services/events.server.service');
const eventsController = require('../../server/controllers/events.server.controller');
const cacheService = require('../../server/services/cache.server.service');
const expect = require('chai').expect;
const mockExpress = require('mock-express');
const nock = require('nock');
const sinon = require('sinon');
const app = mockExpress();

describe('Controllers: Core Events', () => {
    let globals = {};

    beforeEach(() => {
        globals.req = app.makeRequest();
        globals.res = app.makeResponse();
        globals.req.query = { };

        globals.getCacheStub = sinon.stub(cacheService, 'getCache');
        globals.getCacheStub.resolves(false);
        globals.setCacheStub = sinon.stub(cacheService, 'setCache');
        globals.setCacheStub.resolves(false);

        globals.expectedError = {
            error: 'id required!'
        };
        globals.garbageJSON = '<I am HTML, not JSON!  Fear me!/>';
        globals.expectedAPIError = {
            error: 'The API returned an error.  Are your parameters valid?'
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
    it('getProduction should return an error with a missing id', done => {
        globals.res.status = code => {
            expect(code).to.equal(200);
            return globals.res;
        };
        globals.res.json = obj => {
            expect(JSON.stringify(obj)).to.deep.equal(JSON.stringify(globals.expectedError));
            done();
        };
        eventsController.getProduction(globals.req, globals.res, done);
    });
    it('getProductionDates should return an error with a missing id', done => {
        globals.res.status = code => {
            expect(code).to.equal(200);
            return globals.res;
        };
        globals.res.json = obj => {
            expect(JSON.stringify(obj)).to.deep.equal(JSON.stringify(globals.expectedError));
            done();
        };
        eventsController.getProductionDates(globals.req, globals.res, done);
    });
    it('getPresenter should return an error with a missing id', done => {
        globals.res.status = code => {
            expect(code).to.equal(200);
            return globals.res;
        };
        globals.res.json = obj => {
            expect(JSON.stringify(obj)).to.deep.equal(JSON.stringify(globals.expectedError));
            done();
        };
        eventsController.getPresenter(globals.req, globals.res, done);
    });
    it('getVenue should return an error with a missing id', done => {
        globals.res.status = code => {
            expect(code).to.equal(200);
            return globals.res;
        };
        globals.res.json = obj => {
            expect(JSON.stringify(obj)).to.deep.equal(JSON.stringify(globals.expectedError));
            done();
        };
        eventsController.getVenue(globals.req, globals.res, done);
    });
    it('getEvents should return valid JSON when the status is 200', done => {
        let db = nock('http://services.cincinnati.com').get('/calendar/api.svc/production/search')
                    .query(queryObj => { return true; }).reply(200, globals.expectedOutput);
        globals.req.query = { };
        globals.res.status = code => {
            expect(code).to.equal(200);
            return globals.res;
        };
        globals.res.json = obj => {
            expect(JSON.stringify(obj)).to.deep.equal(JSON.stringify(globals.expectedOutput));
            done();
        };

        eventsController.getEvents(globals.req, globals.res);
    });
    it('getProduction should return valid JSON when the status is 200', done => {
        let db = nock('http://services.cincinnati.com').get('/calendar/api.svc/production/id/123')
                    .query(queryObj => { return true; }).reply(200, globals.expectedOutput);
        globals.req.query = { id: 123 };
        globals.res.status = code => {
            expect(code).to.equal(200);
            return globals.res;
        };
        globals.res.json = obj => {
            expect(JSON.stringify(obj)).to.deep.equal(JSON.stringify(globals.expectedOutput));
            done();
        };

        eventsController.getProduction(globals.req, globals.res);
    });
    it('getProductionDates should return valid JSON when the status is 200', done => {
        let db = nock('http://services.cincinnati.com').get('/calendar/api.svc/event/search/123')
                    .query(queryObj => { return true; }).reply(200, globals.expectedOutput);
        globals.req.query = { id: 123 };
        globals.res.status = code => {
            expect(code).to.equal(200);
            return globals.res;
        };
        globals.res.json = obj => {
            expect(JSON.stringify(obj)).to.deep.equal(JSON.stringify(globals.expectedOutput));
            done();
        };

        eventsController.getProductionDates(globals.req, globals.res);
    });
    it('getPresenter should return valid JSON when the status is 200', done => {
        let db = nock('http://services.cincinnati.com').get('/calendar/api.svc/presenter/id/123')
                    .query(queryObj => { return true; }).reply(200, globals.expectedOutput);
        globals.req.query = { id: 123 };
        globals.res.status = code => {
            expect(code).to.equal(200);
            return globals.res;
        };
        globals.res.json = obj => {
            expect(JSON.stringify(obj)).to.deep.equal(JSON.stringify(globals.expectedOutput));
            done();
        };

        eventsController.getPresenter(globals.req, globals.res);
    });
    it('getVenue should return valid JSON when the status is 200', done => {
        let db = nock('http://services.cincinnati.com').get('/calendar/api.svc/venue/id/123')
                    .query(queryObj => { return true; }).reply(200, globals.expectedOutput);
        globals.req.query = { id: 123 };
        globals.res.status = code => {
            expect(code).to.equal(200);
            return globals.res;
        };
        globals.res.json = obj => {
            expect(JSON.stringify(obj)).to.deep.equal(JSON.stringify(globals.expectedOutput));
            done();
        };

        eventsController.getVenue(globals.req, globals.res);
    });
    it('getWeekendEvents should return valid JSON when the status is 200', done => {
        let db = nock('http://cincinnatiusa.com').get('/api/weekendblockjson')
                    .query(queryObj => { return true; }).reply(200, globals.expectedOutput);
        globals.res.status = code => {
            expect(code).to.equal(200);
            return globals.res;
        };
        globals.res.json = obj => {
            expect(JSON.stringify(obj)).to.deep.equal(JSON.stringify(globals.expectedOutput));
            done();
        };

        eventsController.getWeekendEvents(globals.req, globals.res);
    });
    it('getCategories should return valid JSON when the status is 200', done => {
        let db = nock('http://services.cincinnati.com/').get('/calendar/api.svc/categories')
                    .query(queryObj => { return true; }).reply(200, globals.expectedOutput);
        globals.res.status = code => {
            expect(code).to.equal(200);
            return globals.res;
        };
        globals.res.json = obj => {
            expect(JSON.stringify(obj)).to.deep.equal(JSON.stringify(globals.expectedOutput));
            done();
        };

        eventsController.getCategories(globals.req, globals.res);
    });
    it('getEvents should use the cache if it exists', done => {
        globals.getCacheStub.resolves(globals.expectedCacheOutput);
        
        globals.res.status = code => {
            expect(code).to.equal(200);
            return globals.res;
        };
        globals.res.json = obj => {
            expect(obj).to.deep.equal(globals.expectedCacheOutput.json);
            done();
        };

        eventsController.getEvents(globals.req, globals.res);
    });
    it('getProduction should rshould use the cache if it exists', done => {
        globals.getCacheStub.resolves(globals.expectedCacheOutput);

        globals.req.query = { id: 123 };
        globals.res.status = code => {
            expect(code).to.equal(200);
            return globals.res;
        };
        globals.res.json = obj => {
            expect(obj).to.deep.equal(globals.expectedCacheOutput.json);
            done();
        };

        eventsController.getProduction(globals.req, globals.res);
    });
    it('getProductionDates should should use the cache if it exists', done => {
        globals.getCacheStub.resolves(globals.expectedCacheOutput);

        globals.req.query = { id: 123 };
        globals.res.status = code => {
            expect(code).to.equal(200);
            return globals.res;
        };
        globals.res.json = obj => {
            expect(obj).to.deep.equal(globals.expectedCacheOutput.json);
            done();
        };

        eventsController.getProductionDates(globals.req, globals.res);
    });
    it('getPresenter should should use the cache if it exists', done => {
        globals.getCacheStub.resolves(globals.expectedCacheOutput);

        globals.req.query = { id: 123 };
        globals.res.status = code => {
            expect(code).to.equal(200);
            return globals.res;
        };
        globals.res.json = obj => {
            expect(obj).to.deep.equal(globals.expectedCacheOutput.json);
            done();
        };

        eventsController.getPresenter(globals.req, globals.res);
    });
    it('getVenue should should use the cache if it exists', done => {
        globals.getCacheStub.resolves(globals.expectedCacheOutput);

        globals.req.query = { id: 123 };
        globals.res.status = code => {
            expect(code).to.equal(200);
            return globals.res;
        };
        globals.res.json = obj => {
            expect(obj).to.deep.equal(globals.expectedCacheOutput.json);
            done();
        };

        eventsController.getVenue(globals.req, globals.res);
    });
    it('getWeekendEvents should should use the cache if it exists', done => {
        globals.getCacheStub.resolves(globals.expectedCacheOutput);

        globals.res.status = code => {
            expect(code).to.equal(200);
            return globals.res;
        };
        globals.res.json = obj => {
            expect(obj).to.deep.equal(globals.expectedCacheOutput.json);
            done();
        };

        eventsController.getWeekendEvents(globals.req, globals.res);
    });
    it('getCategories should should use the cache if it exists', done => {
        globals.getCacheStub.resolves(globals.expectedCacheOutput);

        globals.res.status = code => {
            expect(code).to.equal(200);
            return globals.res;
        };
        globals.res.json = obj => {
            expect(obj).to.deep.equal(globals.expectedCacheOutput.json);
            done();
        };

        eventsController.getCategories(globals.req, globals.res);
    });
});
