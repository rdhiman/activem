'use strict';

const bluebird = require('bluebird');
const proxyquire = require('proxyquire');
const nock = require('nock');
const chai = require('chai');
const sinon = require('sinon');
const expect = chai.expect;

describe('status service', () => {
    let globals = { };

    before(() => { 
        globals.mongoose = { };
        globals.mongoose.connection = { };
        globals.mongoose.connection.readyState = 1;
        globals.cincinnatiUsaService = require('../../server/services/cincinnatiusa.server.service.js');
        globals.cincinnatiUsaServiceStub = sinon.stub(globals.cincinnatiUsaService, 'getWeekendEvents');
        globals.cincinnatiUsaServiceStub.resolves('something good');
        globals.eventsService = require('../../server/services/events.server.service.js');
        globals.eventsServiceStub = sinon.stub(globals.eventsService, 'getEvents');
        globals.eventsServiceStub.resolves('something good');
        globals.bitlyService = require('../../server/services/bitly.server.service.js');
        globals.bitlyServiceStub = sinon.stub(globals.bitlyService, 'getBitlyUrl');
        globals.bitlyServiceStub.resolves('something good');
        globals.statusService = proxyquire('../../server/services/status.server.service', { 'mongoose': globals.mongoose });
    });

    describe('getMongoStatus', () => {
        it('should return ok if mongo is connected', () => {
            expect(globals.statusService.getMongoStatus()).to.equal('ok');
        });
        it('should return an error if mongo is not connected', () => {
            globals.mongoose.connection.readyState = 0;
            expect(globals.statusService.getMongoStatus()).to.equal('Mongo isn\'t avalible.');
        });
    });

    describe('getCalendarApiStatus', () => {
        it('should return ok if the calendar events API is avalible', done => {
            globals.statusService.getCalendarApiStatus().then(result => {
                expect(result).to.equal('ok');
                done();
            });
        });
        it('should return an error if the calendar events API is not avalible', done => {
            globals.eventsServiceStub.reset();
            globals.eventsServiceStub.resolves({ error: 'ah, scary!' });
            globals.statusService.getCalendarApiStatus().then(result => {
                expect(result).to.equal('The calendar threw an error.');
                done();
            });
        });
    });

    describe('getWeekendBlockApiStatus', () => {
        it('should return ok if the weekend calendar API is avalible', done => {
            globals.statusService.getWeekendBlockApiStatus().then(result => {
                expect(result).to.equal('ok');
                done();
            });
        });
        it('should return an error if the weekend calendar API is not avalible', done => {
            globals.cincinnatiUsaServiceStub.reset();
            globals.cincinnatiUsaServiceStub.resolves({ error: 'ah, scary!' });
            globals.statusService.getWeekendBlockApiStatus().then(result => {
                expect(result).to.equal('The CincinnatiUsa Weekend Events API threw an error.');
                done();
            });
        });
    });

    describe('getBitlyApiStatus', () => {
        it('should return ok if the bitly API is avalible', done => {
            globals.statusService.getBitlyApiStatus().then(result => {
                expect(result).to.equal('ok');
                done();
            });
        });
        it('should return an error if the bitly API is not avalible', done => {
            globals.bitlyServiceStub.reset();
            globals.bitlyServiceStub.resolves({ error: 'ah, scary!' });
            globals.statusService.getBitlyApiStatus().then(result => {
                expect(result).to.equal('The bitly API threw an error.');
                done();
            });
        });
    });
});
