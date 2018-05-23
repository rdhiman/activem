'use strict';

const bitlyController = require('../../server/controllers/bitly.server.controller');
const bitlyService = require('../../server/services/bitly.server.service');
const cacheService = require('../../server/services/cache.server.service');
const expect = require('chai').expect;
const mockExpress = require('mock-express');
const nock = require('nock');
const sinon = require('sinon');
const app = mockExpress();

describe('Controller: Bitly', () => {
    let globals = {};
    
    beforeEach(() => {
        globals.req = app.makeRequest();
        globals.res = app.makeResponse();
        globals.req.query = { shareUrl: 'someUrl' };

        globals.getCacheStub = sinon.stub(cacheService, 'getCache');
        globals.getCacheStub.resolves(false);
        globals.setCacheStub = sinon.stub(cacheService, 'setCache');
        globals.setCacheStub.resolves(false);

        globals.expectedAPIError = {
            data: {
                error: 'The API returned an error.'
            }
        };
        globals.expectedOutput = { 
            data: { url: 'blah' } 
        };
        globals.expectedCacheOutput = {
            json: { url: 'some other json' }
        };

        process.env.NODE_ENV = 'production';

        globals.getBitlyUrlStub = sinon.stub(bitlyService, 'getBitlyUrl');
        globals.getBitlyUrlStub.resolves(globals.expectedOutput);

        globals.res.status = code => {
            expect(code).to.equal(200);
            return globals.res;
        };
    });

    afterEach(() => {
        globals.getCacheStub.restore();
        globals.setCacheStub.restore();
        globals.getBitlyUrlStub.restore();
    });

    it('bitlyController should return valid JSON when the status is 200', done => {
        globals.res.status = code => {
            expect(code).to.equal(200);
            return globals.res;
        };
        globals.res.json = obj => {
            expect(JSON.stringify(obj)).to.deep.equal(JSON.stringify(globals.expectedOutput.data));
            done();
        };

        bitlyController.getBitlyUrl(globals.req, globals.res);
    });

    it('bitlyController should use the cache if it exists', done => {
        globals.getCacheStub.resolves(globals.expectedCacheOutput);
        
        globals.res.status = code => {
            expect(code).to.equal(200);
            return globals.res;
        };
        globals.res.json = obj => {
            expect(obj).to.deep.equal(globals.expectedCacheOutput.json);
            done();
        };

        bitlyController.getBitlyUrl(globals.req, globals.res);
    });

    it('bitlyController should reutrn an error if no url', done => {
        globals.getCacheStub.resolves(globals.expectedCacheOutput);
        globals.req.query = { };
        globals.res.status = code => {
            expect(code).to.equal(200);
            return globals.res;
        };
        globals.res.json = obj => {
            expect(obj).to.deep.equal({ error: 'A URL is required!' });
            done();
        };

        bitlyController.getBitlyUrl(globals.req, globals.res);
    });

    it('bitlyController should return an error if calling from dev', done => {
        process.env.NODE_ENV = 'development';
        globals.getCacheStub.resolves(globals.expectedCacheOutput);
        globals.res.status = code => {
            expect(code).to.equal(200);
            return globals.res;
        };
        globals.res.json = obj => {
            expect(obj).to.deep.equal({ error: 'Bitly urls are not created on local or stage environments to save API calls.' });
            done();
        };

        bitlyController.getBitlyUrl(globals.req, globals.res);
    });

    it('bitlyController should return an error if calling from stage', done => {
        process.env.NODE_ENV = 'staging';
        globals.getCacheStub.resolves(globals.expectedCacheOutput);
        globals.res.status = code => {
            expect(code).to.equal(200);
            return globals.res;
        };
        globals.res.json = obj => {
            expect(obj).to.deep.equal({ error: 'Bitly urls are not created on local or stage environments to save API calls.' });
            done();
        };

        bitlyController.getBitlyUrl(globals.req, globals.res);
    });
    it('bitlyController should return an error if the api call fails', done => {
        globals.getCacheStub.resolves(false);
        globals.getBitlyUrlStub.restore();
        globals.getBitlyUrlStub = sinon.stub(bitlyService, 'getBitlyUrl');
        globals.getBitlyUrlStub.resolves(globals.expectedAPIError);

        globals.res.status = code => {
            expect(code).to.equal(200);
            return globals.res;
        };
        globals.res.json = obj => {
            expect(obj).to.deep.equal({ error: 'There was an error getting the bitly url' });
            done();
        };

        bitlyController.getBitlyUrl(globals.req, globals.res);
    });
    
});
