'use strict';

module.exports = app => {
    const core = require('../controllers/core.server.controller');

    // Define error pages
    app.route('/server-error').get(core.renderServerError);

    // Define application route
    app.route('/').get(core.renderIndex);
};
