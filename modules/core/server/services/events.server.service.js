'use strict';

const _ = require('lodash');
const Bluebird = require('bluebird');
const requestConstants = {
    apiBaseUrl: 'http://services.cincinnati.com/calendar/api.svc/',
    apiKey: '8760c9dd-1fef-429c-bdfc-1519274a598c',
    eventsLocation: 'production/search',
    productionLocation: 'production/id/',
    productionDates: 'event/search/',
    presenterLocation: 'presenter/id/',
    venueLocation: 'venue/id/',
    categoryLocation: 'categories',
    onErrorMessage: { error: 'The API returned an error.  Are your parameters valid?' }
};
const requestModule = Bluebird.promisify(require('request'), { multiArgs: true });
const request = requestModule.defaults({ baseUrl: requestConstants.apiBaseUrl });

export function getEvents(qs = {}) {
    qs.apiKey = requestConstants.apiKey;
    
    return request(requestConstants.eventsLocation, { qs })
        .then(response => JSON.parse(response[1]))
        .catch(err => requestConstants.onErrorMessage);
}

export function getProduction(id, qs = {}){
    qs.apiKey = requestConstants.apiKey;

    return request(requestConstants.productionLocation + id, { qs })
        .then(response => JSON.parse(response[1]))
        .catch(err => requestConstants.onErrorMessage);
}

export function getProductionDates(id, qs = {}){
    qs.apiKey = requestConstants.apiKey;

    return request(requestConstants.productionDates + id, { qs })
        .then(response => JSON.parse(response[1]))
        .catch(err => requestConstants.onErrorMessage);
}

export function getPresenter(id, qs = {}){
    qs.apiKey = requestConstants.apiKey;

    return request(requestConstants.presenterLocation + id, { qs })
        .then(response => JSON.parse(response[1]))
        .catch(err => requestConstants.onErrorMessage);
}

export function getVenue(id, qs = {}){
    qs.apiKey = requestConstants.apiKey;

    return request(requestConstants.venueLocation + id, { qs })
        .then(response => JSON.parse(response[1]))
        .catch(err => requestConstants.onErrorMessage);
}

export function getCategories(){
    return request(requestConstants.categoryLocation, { qs: { apiKey: requestConstants.apiKey } })
        .then(response => JSON.parse(response[1]))
        .catch(err => requestConstants.onErrorMessage);
}
