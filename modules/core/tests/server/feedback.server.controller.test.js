'use strict';

const feedbackController = require('../../server/controllers/feedback.server.controller');
const emailService = require('../../server/services/email.server.service');
const expect = require('chai').expect;
const sinon = require('sinon');
const Bluebird = require('bluebird');
const mockExpress = require('mock-express');
const nock = require('nock');
const app = mockExpress();

describe('Controller: Feedback', () => {
    let globals = {};
    beforeEach(() => {
        globals.req = app.makeRequest();
        globals.res = app.makeResponse();
        globals.req.query = {};
    });

    it('On an unsuccessful recaptcha and invalid email data, verify should return false', done => {
        let g = nock('https://www.google.com').post('/recaptcha/api/siteverify').reply(200, { success: false });
        globals.res.status = code => {
            expect(code).to.equal(200);
            return globals.res;
        };
        globals.res.json = obj => {
            expect(obj).to.deep.equal({ success: false });
            done();
        };

        feedbackController.processForm(globals.req, globals.res);
    });

    it('On a successful recaptcha and invalid email data, verify should return true', done => {
        let g = nock('https://www.google.com').post('/recaptcha/api/siteverify').reply(200, { success: true });

        sinon.stub(emailService, 'send', () => {
            return Bluebird.Promise.resolve(false);
        });

        globals.res.status = code => {
            expect(code).to.equal(200);
            return globals.res;
        };
        globals.res.json = obj => {
            expect(obj).to.deep.equal({ success: false });
            emailService.send.restore();
            done();
            
        };

        feedbackController.processForm(globals.req, globals.res);
    });

    it('On a successful recaptcha and valid email data, verify should return true', done => {
        let g = nock('https://www.google.com').post('/recaptcha/api/siteverify').reply(200, { success: true });

        sinon.stub(emailService, 'send', () => {
            return Bluebird.Promise.resolve(true);
        });

        globals.res.status = code => {
            expect(code).to.equal(200);
            return globals.res;
        };
        globals.res.json = obj => {
            expect(obj).to.deep.equal({ success: true });
            emailService.send.restore();
            done();
        };

        feedbackController.processForm(globals.req, globals.res);
    });

});
