'use strict';

const mongooseMock = require('mongoose-mock');
const bluebird = require('bluebird');
const proxyquire = require('proxyquire');
const sinon = require('sinon');
require('sinon-bluebird');
const chai = require('chai');
const expect = chai.expect;

describe('cacheService', () => {
    let globals = {};

    globals.updateReturnValue = '';
    globals.saveReturnValue = '';
    globals.findReturnValue = '';
    globals.val = () => {};
    globals.urlExists = { length: 0, '0': { update: () => {} } };
    sinon.stub(mongooseMock, 'model', () => {
        globals.val.find = (data) => {
            return { exec: globals.exec };
        };
        return globals.val;
    });
    globals.statusService = { };
    globals.statusServiceRetVal = 'ok';
    globals.statusService.getMongoStatus = () =>{
        return globals.statusServiceRetVal;
    };
    globals.cacheService = proxyquire('../../server/services/cache.server.service', { 'mongoose': mongooseMock, './status.server.service': globals.statusService });

    beforeEach(() => {
        globals.exec = () => {};
        globals.urlExists.length = 0;
        sinon.stub(globals, 'exec').resolves(globals.urlExists);
        globals.updateReturnValue = '';
        globals.saveReturnValue = '';
        globals.findReturnValue = '';
        globals.urlExists = { length: 0, '0': { update: () => {} } };
        sinon.stub(globals.urlExists[0], 'update').resolves(globals.updateReturnValue);
        globals.val.prototype.save = () => {};
        sinon.stub(globals.val.prototype, 'save').resolves(globals.saveReturnValue);
        globals.val.save = globals.val.prototype.save;
        globals.urlExists[0].save = globals.val.prototype.save;
    });

    describe('setCache', () => {
        it('should check if the url doesnt exists', (done) => {
            const json = {
                totalEvents: 200
            };
            globals.urlExists.length = 0;
            const called = globals.cacheService.setCache({ url: '/api/events?pageIndex=0', json: json })
            .then(() => {
                expect(globals.val.prototype.save.calledOnce).to.equal(true);
            })
            .finally(done);
        });
        it('function call should handle error', (done) => {
            const json = {
                totalEvents: 200
            };
            globals.exec = () => {};
            sinon.stub(globals, 'exec').rejects(globals.findReturnValue);
            globals.urlExists.length = 1;
            globals.findReturnValue = 'False';
            const called = globals.cacheService.setCache({ url: '/api/events?pageIndex=0', json: json })
            .then(() => {
                expect(globals.val.save.called).to.equal(false);
            })
            .finally(done);
        });
        it('should check if the url exists', (done) => {
            const json = {
                totalEvents: 200
            };
            globals.urlExists.length = 1;
            globals.exec = () => {};
            sinon.stub(globals, 'exec').resolves(globals.urlExists);
            const called = globals.cacheService.setCache({ url: '/api/events?pageIndex=0', json: json })
            .then(() => {
                expect(globals.urlExists[0].save.calledOnce).to.equal(true);
            })
            .finally(done);
        });
    });

    describe('getCache', () => {
        it('Return error if item doesnt exists', (done) => {
            const json = {
                totalEvents: 200
            };
            globals.urlExists.length = 0;
            globals.findReturnValue = 'False';
            globals.exec = () => {};
            sinon.stub(globals, 'exec').rejects(globals.findReturnValue);
            const called = globals.cacheService.getCache({ url: '/api/events?pageIndex=0', json: json })
            .then(() => {
                expect(globals.val.save.calledOnce).to.equal(false);
            })
            .finally(done);
        });
        it('Return item is it exists', (done) => {
            const json = {
                totalEvents: 200
            };
            globals.urlExists.length = 1;
            globals.exec = () => {};
            sinon.stub(globals, 'exec').resolves(globals.urlExists);
            const called = globals.cacheService.getCache({ url: '/api/events?pageIndex=0', json: json }, (garbage, data) => {
                expect(data).to.equal(globals.urlExists[0]);
            })
            .finally(done);
        });
        it('No callback if item doesnt exist', (done) => {
            const json = {
                totalEvents: 200
            };
            globals.urlExists.length = 0;
            let callback = sinon.spy();
            const called = globals.cacheService.getCache({ url: '/api/events?pageIndex=0', json: json }, callback)
            .then((returnVal) => {
                expect(returnVal).to.equal(false);
            })
            .finally(done);
        });
        it('if mongo is down, getCache resolve empty promise', (done) => {
            const json = {
                totalEvents: 200
            };
            globals.urlExists.length = 0;
            globals.statusServiceRetVal = 'not okay';
            let callback = sinon.spy();
            const called = globals.cacheService.getCache({ url: '/api/events?pageIndex=0', json: json }, callback)
            .then((returnVal) => {
                expect(returnVal).to.equal(false);
                done();
            });
        });
        it('if mongo is down, setCache resolve empty promise', (done) => {
            const json = {
                totalEvents: 200
            };
            globals.urlExists.length = 0;
            globals.statusServiceRetVal = 'not okay';
            let callback = sinon.spy();
            const called = globals.cacheService.setCache({ url: '/api/events?pageIndex=0', json: json }, callback)
            .then((returnVal) => {
                expect(returnVal).to.equal(false);
                done();
            });
        });
    });
});
