'use strict';

module.exports = app => {
    const events = require('../controllers/events.server.controller');

    app.route('/api/events').get(events.getEvents);
    app.route('/api/production').get(events.getProduction);
    app.route('/api/production/dates').get(events.getProductionDates);
    app.route('/api/venue').get(events.getVenue);
    app.route('/api/presenter').get(events.getPresenter);
    app.route('/api/cincinnatiusa').get(events.getWeekendEvents);
    app.route('/api/categories').get(events.getCategories);
};
