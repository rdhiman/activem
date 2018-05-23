'use strict';

module.exports = app => {
    const feedback = require('../controllers/feedback.server.controller');

    app.route('/api/feedback').get(feedback.processForm);
};