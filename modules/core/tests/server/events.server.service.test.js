'use strict';

const eventsService = require('../../server/services/events.server.service');
const expect = require('chai').expect;
const nock = require('nock');

describe('Service: Events', () => {
    let globals = {};
    beforeEach(() => {
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
    });
    it('getEvents should return a clean error when the JSON parse fails', done => {
        let db = nock('http://services.cincinnati.com').get('/calendar/api.svc/production/search')
                    .query(queryObj => true).reply(200, globals.garbageJSON);

        eventsService.getEvents().then(obj => {
            expect(JSON.stringify(obj)).to.deep.equal(JSON.stringify(globals.expectedAPIError));
            done();
        });
    });
    it('getVenue should return a clean error when the JSON parse fails', done => {
        let db = nock('http://services.cincinnati.com').get('/calendar/api.svc/venue/id/123')
                    .query(queryObj => true).reply(200, globals.garbageJSON);

        eventsService.getVenue(123).then(obj => {
            expect(JSON.stringify(obj)).to.deep.equal(JSON.stringify(globals.expectedAPIError));
            done();
        });
    });
    it('getPresenter should return a clean error when the JSON parse fails', done => {
        let db = nock('http://services.cincinnati.com').get('/calendar/api.svc/presenter/id/123')
                    .query(queryObj => true).reply(200, globals.garbageJSON);

        eventsService.getPresenter(123).then(obj => {
            expect(JSON.stringify(obj)).to.deep.equal(JSON.stringify(globals.expectedAPIError));
            done();
        });
    });
    it('getProduction should return a clean error when the JSON parse fails', done => {
        let db = nock('http://services.cincinnati.com').get('/calendar/api.svc/production/id/123')
                    .query(queryObj => true).reply(200, globals.garbageJSON);

        eventsService.getProduction(123).then(obj => {
            expect(JSON.stringify(obj)).to.deep.equal(JSON.stringify(globals.expectedAPIError));
            done();
        });
    });
    it('getProductionDates should return a clean error when the JSON parse fails', done => {
        let db = nock('http://services.cincinnati.com').get('/calendar/api.svc/event/search/123')
                    .query(queryObj => true).reply(200, globals.garbageJSON);

        eventsService.getProductionDates(123).then(obj => {
            expect(JSON.stringify(obj)).to.deep.equal(JSON.stringify(globals.expectedAPIError));
            done();
        });
    });
    it('getCategories should return a clean error when the JSON parse fails', done => {
        let db = nock('http://services.cincinnati.com').get('/calendar/api.svc/categories')
                    .query(queryObj => true).reply(200, globals.garbageJSON);

        eventsService.getCategories().then(obj => {
            expect(JSON.stringify(obj)).to.deep.equal(JSON.stringify(globals.expectedAPIError));
            done();
        });
    });
    it('getEvents should return valid JSON when the status is 200', done => {
        let db = nock('http://services.cincinnati.com').get('/calendar/api.svc/production/search')
                    .query(queryObj => { return true; }).reply(200, globals.expectedOutput);

        eventsService.getEvents().then(obj => {
            expect(JSON.stringify(obj)).to.deep.equal(JSON.stringify(globals.expectedOutput));
            done();
        });
    });
    it('getProduction should return valid JSON when the status is 200', done => {
        let db = nock('http://services.cincinnati.com').get('/calendar/api.svc/production/id/123')
                    .query(queryObj => { return true; }).reply(200, globals.expectedOutput);

        eventsService.getProduction(123).then(obj => {
            expect(JSON.stringify(obj)).to.deep.equal(JSON.stringify(globals.expectedOutput));
            done();
        });
    });
    it('getProductionDate should return valid JSON when the status is 200', done => {
        let db = nock('http://services.cincinnati.com').get('/calendar/api.svc/event/search/123')
                    .query(queryObj => { return true; }).reply(200, globals.expectedOutput);

        eventsService.getProductionDates(123).then(obj => {
            expect(JSON.stringify(obj)).to.deep.equal(JSON.stringify(globals.expectedOutput));
            done();
        });
    });
    it('getPresenter should return valid JSON when the status is 200', done => {
        let db = nock('http://services.cincinnati.com').get('/calendar/api.svc/presenter/id/123')
                    .query(queryObj => { return true; }).reply(200, globals.expectedOutput);

        eventsService.getPresenter(123).then(obj => {
            expect(JSON.stringify(obj)).to.deep.equal(JSON.stringify(globals.expectedOutput));
            done();
        });
    });
    it('getVenue should return valid JSON when the status is 200', done => {
        let db = nock('http://services.cincinnati.com').get('/calendar/api.svc/venue/id/123')
                    .query(queryObj => { return true; }).reply(200, globals.expectedOutput);

        eventsService.getVenue(123).then(obj => {
            expect(JSON.stringify(obj)).to.deep.equal(JSON.stringify(globals.expectedOutput));
            done();
        });
    });
    it('getCategories should return valid JSON when the status is 200', done => {
        let db = nock('http://services.cincinnati.com').get('/calendar/api.svc/categories')
                    .query(queryObj => { return true; }).reply(200, globals.expectedOutput);

        eventsService.getCategories().then(obj => {
            expect(JSON.stringify(obj)).to.deep.equal(JSON.stringify(globals.expectedOutput));
            done();
        });
    });
});
