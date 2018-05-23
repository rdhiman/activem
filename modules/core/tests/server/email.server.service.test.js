'use strict';

const emailService = require('../../server/services/email.server.service');
const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport();
const chai = require('chai');
const sinon = require('sinon');

describe('Service: Email', () => {

    beforeEach(() => {
        sinon.stub(transport, 'sendMail', () => {
            return true;
        });
    });

    afterEach(() => {
        transport.sendMail.restore();
    });
    
    it('send should send an email when there is email data', () => {
        let sampleEmailData = {
            id: 123,
            event: 'test event',
            name: 'test name',
            email: 'test@cincinnati.com',
            message: 'test message'
        };
        emailService.send(sampleEmailData).then(() => {
            let success = true;
            chai.expect(success).to.equal(true);
        }).catch(() => {
            let success = false;
            chai.expect(success).to.equal(true);
        });
    });

    it('send should not send an email when there is no email data', () => {
        emailService.send().then(() => {
            let success = true;
            chai.expect(success).to.equal(false);
        }).catch(() => {
            let success = false;
            chai.expect(success).to.equal(false);
        });
    });

});
