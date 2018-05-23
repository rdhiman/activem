'use strict';

module.exports = app => {
    const status = require('../controllers/status.server.controller');

    app.route('/status/environment').get(status.getServerStatus);
};