'use strict';

import { getProduction, getPresenter, getVenue } from '../services/events.server.service';
import { getCache, setCache } from '../services/cache.server.service';
const moment = require('moment');
const cacheTimeInMinutes = 15;


function renderServerIndex(res, chromeless, name, pageDescription, pageUrl) {
    res.render('modules/core/server/views/index', { chromeless, name, pageDescription, pageUrl });
}

/**
 * Render main application
 */
exports.renderIndex = (req, res) => {
    let chromeless = req.query.chromeless === 'true' ? true : false;
    let urlPath = req.params[0];
    let urlParts = [];
    let cacheBust = req.query.cacheBust;
    if (/(event|venue|presenter)\//.test(urlPath)) {
        urlParts = urlPath.split('/');
    }
    if (urlParts[0] === 'event') {
        getCache(urlParts[1]).then(response => {
            if(cacheBust !== 'true' && response && moment().isBefore(moment(response.date).add(cacheTimeInMinutes, 'minutes'))) {
                renderServerIndex(res, chromeless, response.json.prodName, response.json.prodDescription, urlPath, response.json.apiVenue.venuePhoto);
            } else {
                getProduction(urlParts[1]).then(response => {
                    if (response.error){
                        res.redirect('/not-found');
                    } else {
                        renderServerIndex(res, chromeless, response.prodName, response.prodDescription, urlPath, response.apiVenue.venuePhoto);
                        setCache(urlParts[1], response);
                    }
                });
            }
        });
    } else if (urlParts[0] === 'venue') {
        getCache(urlParts[1]).then(response => {
            if(cacheBust !== 'true' && response && moment().isBefore(moment(response.date).add(cacheTimeInMinutes, 'minutes'))) {
                renderServerIndex(res, chromeless, response.json.venueName, response.json.venueDescription, urlPath, response.venuePhoto);
            } else {
                getVenue(urlParts[1]).then(response => {
                    if (response.error){
                        res.redirect('/not-found');
                    } else {                
                        renderServerIndex(res, chromeless, response.venueName, response.venueDescription, urlPath, response.venuePhoto);
                        setCache(urlParts[1], response);
                    }
                });
            }
        });
    } else if (urlParts[0] === 'presenter') {
        getCache(urlParts[1]).then(response => {
            if(cacheBust !== 'true' && response && moment().isBefore(moment(response.date).add(cacheTimeInMinutes, 'minutes'))) {
                renderServerIndex(res, chromeless, response.json.presName, response.json.presDescription, urlPath);
            } else {
                getPresenter(urlParts[1]).then(response => {
                    if (response.error){
                        res.redirect('/not-found');
                    } else {
                        renderServerIndex(res, chromeless, response.presName, response.presDescription, urlPath);
                        setCache(urlParts[1], response);
                    }
                });
            }
        });
    } else {
        res.render('modules/core/server/views/index', { chromeless });
    }
};

/**
 * Render server error page
 */
exports.renderServerError = (req, res) => {
    res.status(500).render('modules/core/server/views/500', {
        error: 'Whoops! Something went wrong.'
    });
};

/**
 * Render 404 response, contingent on Accept HTTP header
 */
exports.renderNotFound = (req, res) => {
    res.status(404).format({
        'text/html': () => {
            res.render('modules/core/server/views/404', {
                url: req.originalUrl
            });
        },
        'application/json': () => {
            res.json({
                error: 'Path not found'
            });
        },
        default: () => {
            res.send('Path not found');
        }
    });
};