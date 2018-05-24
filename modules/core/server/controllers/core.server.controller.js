'use strict';


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
    res.render('modules/core/server/views/index', { chromeless });
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