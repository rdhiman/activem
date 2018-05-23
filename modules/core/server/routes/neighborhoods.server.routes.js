'use strict';

module.exports = app => {
    const neighborhoods = require('../controllers/neighborhoods.server.controller');

    app.route('/api/neighborhoods').get(neighborhoods.getNeighborhoods);
};