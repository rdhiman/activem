'use strict';

module.exports = app => {
    const bitly = require('../controllers/bitly.server.controller');

    app.route('/api/bitly').get(bitly.getBitlyUrl);
};