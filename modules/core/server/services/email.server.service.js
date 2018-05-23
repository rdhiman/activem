'use strict';

const _ = require('lodash');
const Bluebird = require('bluebird');
const nodemailer = require('nodemailer');
const transport = nodemailer.createTransport();
const config = require('../../../../config/config');
const emailConfig = {
    from: 'feedback@local.cincinnati.com',
    to: config.feedback.email,
    subject: 'Cincinnati Calendar Feedback'
};

export function send(emailData = {}){
    if (emailData.id) {
        let eventEditLink = 'http://local.cincinnati.com/cinadmin/calendar/productions.aspx?pid=' + emailData.id;
        let emailText = 'Name: ' + emailData.name + '\r\n' + 
            'Email: ' + emailData.email + '\r\n' + 
            'Event: ' + emailData.event + '\r\n' +
            'Event ID: ' + emailData.id + '\r\n' + 
            'Message: ' + emailData.message;
        let emailHTML = '<b>Name:</b> ' + emailData.name + '<br />' + 
            '<b>Email:</b> ' + emailData.email + '<br />' + 
            '<b>Event:</b> ' + emailData.event + '<br />' +
            '<b>Event ID:</b> ' + emailData.id + '<br />' + 
            '<b>Message:</b> ' + emailData.message + '<br />' +
            '<b>Edit event in admin:</b> <a href="' + eventEditLink + '">' + eventEditLink + '</a>';
        let mailOptions = {
            from: emailConfig.from,
            to: emailConfig.to,
            subject: emailConfig.subject,
            html: emailHTML,
            text: emailText
        };
        return transport.sendMail(mailOptions);
    } else {
        return Bluebird.Promise.reject(false);
    }
}