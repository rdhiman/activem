'use strict';

const statusController = require('../../server/controllers/status.server.controller');
const statusService = require('../../server/services/status.server.service');
const cacheService = require('../../server/services/cache.server.service');
const pjson = require('../../../../package.json');
const expect = require('chai').expect;
const mockExpress = require('mock-express');
const nock = require('nock');
const sinon = require('sinon');
const app = mockExpress();

describe('Controller: Status', () => {
    let globals = {};

    before(() => {
        globals.getMongoStatusStub = sinon.stub(statusService, 'getMongoStatus', () => {
            return 'ok';
        });
        globals.getCalendarApiStatusStub = sinon.stub(statusService, 'getCalendarApiStatus');
        globals.getCalendarApiStatusStub.resolves('ok');
        globals.getWeekendBlockApiStatusStub = sinon.stub(statusService, 'getWeekendBlockApiStatus');
        globals.getWeekendBlockApiStatusStub.resolves('ok');
        globals.getBitlyApiStatusStub = sinon.stub(statusService, 'getBitlyApiStatus');
        globals.getBitlyApiStatusStub.resolves('ok');
    });
    
    beforeEach(() => {
        globals.req = app.makeRequest();
        globals.res = app.makeResponse();

        globals.res.status = code => {
            expect(code).to.equal(200);
            return globals.res;
        };
    });

    it('should return a json list of all the services and their statuses', done => {
        globals.res.json = obj => {
            expect(obj.services.calendarApi).to.equal('ok');
            expect(obj.services.weekendBlockApi).to.equal('ok');
            expect(obj.services.bitlyApi).to.equal('ok');
            expect(obj.services.mongo).to.equal('ok');

            done();
        };

        statusController.getServerStatus(globals.req, globals.res);
    });
    it('should say the status is 200 if all services are ok', done => {
        globals.res.json = obj => {
            expect(obj.status_code).to.equal(200);

            done();
        };

        statusController.getServerStatus(globals.req, globals.res);
    });
    it('should say the status is 500 if any services are not ok', done => {
        globals.getBitlyApiStatusStub.reset();
        globals.getBitlyApiStatusStub.resolves('not ok!');
        globals.res.json = obj => {
            expect(obj.status_code).to.equal(500);

            done();
        };

        statusController.getServerStatus(globals.req, globals.res);
    });
    it('should report any statuses that are not ok', done => {
        globals.getBitlyApiStatusStub.reset();
        globals.getBitlyApiStatusStub.resolves('not ok!');
        globals.res.json = obj => {
            expect(obj.services.bitlyApi).to.equal('not ok!');

            done();
        };

        statusController.getServerStatus(globals.req, globals.res);
    });
    it('should report the version number', done => {
        globals.res.json = obj => {
            expect(obj.version).to.equal(pjson.version);

            done();
        };

        statusController.getServerStatus(globals.req, globals.res);
    });
});
