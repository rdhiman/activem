'use strict';

const _ = require('lodash');
const expect = require('chai').expect;
const app = require('mock-express')();
const coreController = require('../../server/controllers/core.server.controller');
const eventsService = require('../../server/services/events.server.service');
const cacheService = require('../../server/services/cache.server.service');
const sinon = require('sinon');
const Bluebird = require('bluebird');

describe('Controllers: Core', () => {
    let globals = { };

    function extendResponse(res) {
        _.merge(globals.res, {
            status: statusCode => {
                globals.res.statusCode = statusCode;
                return globals.res;
            },
            format: obj => {
                let contentType = globals.req.contentType || 'default';
                obj[contentType]();
            },
            json: obj => {
                globals.res.render('json', obj);
            },
            send: message => {
                globals.res.render('send', { message });
            }
        });
    }

    beforeEach(() => {
        globals.req = app.makeRequest();
        globals.req.query = {};
        globals.req.params = {
            0: ''
        };

        globals.getCacheStub = sinon.stub(cacheService, 'getCache');
        globals.getCacheStub.resolves(false);
        globals.setCacheStub = sinon.stub(cacheService, 'setCache');
        globals.setCacheStub.resolves(false);
    });

    afterEach(() => {
        globals.getCacheStub.restore();
        globals.setCacheStub.restore();
    });

    describe('renderIndex', () => {
        describe('Success', () => {
            it('Should set proper view name', done => {
                let expectedView = 'modules/core/server/views/index';
                globals.res = app.makeResponse((err, sideEffects) => {
                    expect(sideEffects.viewName).to.equal(expectedView);
                    done();
                });
                coreController.renderIndex(globals.req, globals.res, done);
            });
            it('Chromeless parameter should pass to view', done => {
                globals.res = app.makeResponse((err, sideEffects) => {
                    expect(sideEffects.model.chromeless).to.equal(true);
                    done();
                });
                globals.req.query.chromeless = 'true';
                coreController.renderIndex(globals.req, globals.res, done);
            });
            
            it('An event url should return production details to the template', done => {
                let sampleResponse = {
                    prodName:'event name',
                    prodDescription: 'sample desc',
                    apiVenue: {
                        venuePhoto: 'sample/url'
                    }
                };
                let stub = sinon.stub(eventsService, 'getProduction', () => {
                    return Bluebird.Promise.resolve(sampleResponse);
                });

                globals.res = app.makeResponse((err, sideEffects) => {
                    expect(sideEffects.model.pageDescription).to.equal(sampleResponse.prodDescription);
                    done();
                    stub.restore();
                });
                globals.req.params = { 0: 'event/123' };
                coreController.renderIndex(globals.req, globals.res, done);
            });

            it('An error response from event url should cause a 404 redirect', done => {
                let errorResponse = {
                    error: 'error'
                };
                let stub = sinon.stub(eventsService, 'getProduction', () => {
                    return Bluebird.Promise.resolve(errorResponse);
                });

                globals.res = app.makeResponse((err, sideEffects) => {
                    expect(sideEffects.redirect).to.equal('/not-found');
                    done();
                    stub.restore();
                });
                globals.req.params = { 0: 'event/123' };
                coreController.renderIndex(globals.req, globals.res, done);
            });

            it('A venue url should return venue details to the template', done => {
                let sampleResponse = {
                    venueName:'venue name',
                    venueDescription: 'sample desc',
                    venuePhoto: 'sample/url'
                };
                let stub = sinon.stub(eventsService, 'getVenue', () => {
                    return Bluebird.Promise.resolve(sampleResponse);
                });

                globals.res = app.makeResponse((err, sideEffects) => {
                    expect(sideEffects.model.pageDescription).to.equal(sampleResponse.venueDescription);
                    done();
                    stub.restore();
                });
                globals.req.params = { 0: 'venue/123' };
                coreController.renderIndex(globals.req, globals.res, done);
            });

            it('An error response from venue url should cause a 404 redirect', done => {
                let errorResponse = {
                    error: 'error'
                };
                let stub = sinon.stub(eventsService, 'getVenue', () => {
                    return Bluebird.Promise.resolve(errorResponse);
                });

                globals.res = app.makeResponse((err, sideEffects) => {
                    expect(sideEffects.redirect).to.equal('/not-found');
                    done();
                    stub.restore();
                });
                globals.req.params = { 0: 'venue/123' };
                coreController.renderIndex(globals.req, globals.res, done);
            });

            it('A presenter url should return presenter details to the template', done => {
                let sampleResponse = {
                    presName:'presenter name',
                    presDescription: 'sample desc',
                };
                let stub = sinon.stub(eventsService, 'getPresenter', () => {
                    return Bluebird.Promise.resolve(sampleResponse);
                });

                globals.res = app.makeResponse((err, sideEffects) => {
                    expect(sideEffects.model.pageDescription).to.equal(sampleResponse.presDescription);
                    done();
                    stub.restore();
                });
                globals.req.params = { 0: 'presenter/123' };
                coreController.renderIndex(globals.req, globals.res, done);
            });

            it('An error response from presenter url should cause a 404 redirect', done => {
                let errorResponse = {
                    error: 'error'
                };
                let stub = sinon.stub(eventsService, 'getPresenter', () => {
                    return Bluebird.Promise.resolve(errorResponse);
                });

                globals.res = app.makeResponse((err, sideEffects) => {
                    expect(sideEffects.redirect).to.equal('/not-found');
                    done();
                    stub.restore();
                });
                globals.req.params = { 0: 'presenter/123' };
                coreController.renderIndex(globals.req, globals.res, done);
            });

            it('A presenter url should return presenter details to the template', done => {
                let sampleResponse = {
                    presName:'presenter name',
                    presDescription: 'sample desc',
                };
                let stub = sinon.stub(eventsService, 'getPresenter', () => {
                    return Bluebird.Promise.resolve(sampleResponse);
                });

                globals.res = app.makeResponse((err, sideEffects) => {
                    expect(sideEffects.model.pageDescription).to.equal(sampleResponse.presDescription);
                    done();
                    stub.restore();
                });
                globals.req.params = { 0: 'presenter/123' };
                coreController.renderIndex(globals.req, globals.res, done);
            });

            it('render event data should use cache when avalible', done => {
                let sampleResponse = {
                    json: {
                        prodName:'event name',
                        prodDescription: 'sample desc',
                        apiVenue: {
                            venuePhoto: 'sample/url'
                        }
                    }
                };
                globals.getCacheStub.resolves(sampleResponse);

                globals.res = app.makeResponse((err, sideEffects) => {
                    expect(sideEffects.model.pageDescription).to.equal(sampleResponse.json.prodDescription);
                    done();
                });
                globals.req.params = { 0: 'event/123' };
                coreController.renderIndex(globals.req, globals.res, done);
            });

            it('render venue data should use cache when avalible', done => {
                let sampleResponse = {
                    json: {
                        venueName:'venue name',
                        venueDescription: 'sample desc',
                        venuePhoto: 'sample/url'
                    }
                };
                globals.getCacheStub.resolves(sampleResponse);

                globals.res = app.makeResponse((err, sideEffects) => {
                    expect(sideEffects.model.pageDescription).to.equal(sampleResponse.json.venueDescription);
                    done();
                });
                globals.req.params = { 0: 'venue/123' };
                coreController.renderIndex(globals.req, globals.res, done);
            });

            it('render presenter data should use cache when avalible', done => {
                let sampleResponse = {
                    json: {
                        presName:'presenter name',
                        presDescription: 'sample desc',
                    }
                };
                globals.getCacheStub.resolves(sampleResponse);

                globals.res = app.makeResponse((err, sideEffects) => {
                    expect(sideEffects.model.pageDescription).to.equal(sampleResponse.json.presDescription);
                    done();
                });
                globals.req.params = { 0: 'presenter/123' };
                coreController.renderIndex(globals.req, globals.res, done);
            });
        });
    });

    describe('renderServerError', () => {
        describe('Success', () => {
            it('Should report 500 error', done => {
                globals.res = app.makeResponse((err, sideEffects) => {
                    expect(globals.res.statusCode).to.equal(500);
                    expect(sideEffects.model.error).to.equal('Whoops! Something went wrong.');
                    done();
                });
                extendResponse(globals.res);
                coreController.renderServerError(globals.req, globals.res, done);
            });
        });
    });

    describe('renderNotFound', () => {
        describe('Success', () => {
            it('Should format 404 as text/html', done => {
                globals.req.contentType = 'text/html';
                globals.res = app.makeResponse((err, sideEffects) => {
                    expect(globals.res.statusCode).to.equal(404);
                    expect(sideEffects.viewName).to.equal('modules/core/server/views/404');
                    done();
                });
                extendResponse(globals.res);
                coreController.renderNotFound(globals.req, globals.res, done);
            });
            it('Should format 404 as application/json', done => {
                globals.req.contentType = 'application/json';
                globals.res = app.makeResponse((err, sideEffects) => {
                    expect(globals.res.statusCode).to.equal(404);
                    expect(sideEffects.model.error).to.equal('Path not found');
                    done();
                });
                extendResponse(globals.res);
                coreController.renderNotFound(globals.req, globals.res, done);
            });
            it('Should format 404 with default format', done => {
                globals.res = app.makeResponse((err, sideEffects) => {
                    expect(globals.res.statusCode).to.equal(404);
                    expect(sideEffects.model.message).to.equal('Path not found');
                    done();
                });
                extendResponse(globals.res);
                coreController.renderNotFound(globals.req, globals.res, done);
            });
        });
    });
});