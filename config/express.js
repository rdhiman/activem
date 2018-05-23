'use strict';

/**
 * Module dependencies.
 */
const config = require('./config');
const express = require('express');
const path = require('path');
const logger = require('./logger');
const compress = require('compression');
const helmet = require('helmet');
const session = require('cookie-session');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const consolidate = require('consolidate');
const babelConnect = require('babel-connect');
const os = require('os');
const sassMiddleware = require('node-sass-middleware');
const serveStatic = require('serve-static');
const glob = require('glob');
const cacheDir = path.join(os.tmpdir(), 'ldsn_compiled_cache');
const core = require('../modules/core/server/controllers/core.server.controller');

// let obj = { first: 'Jane', last: 'Doe' };
// let { first: f, last: l } = obj;
// console.log(`${f} ${l}`);

function initLocalVariables(app) {
    // Setting application local variables
    app.locals.title = config.app.title;
    app.locals.description = config.app.description;
    app.locals.domain = config.app.domain;
    app.locals.keywords = config.app.keywords;
    app.locals.googleAnalyticsTrackingID = config.app.googleAnalyticsTrackingID;
    app.locals.facebookAppId = config.facebook.clientID;
    app.locals.jsFiles = config.files.client.js;
    app.locals.cssFiles = config.files.client.css;
    app.locals.livereload = config.livereload;

    // Passing the request url to environment locals
    app.use(function (req, res, next) {
        res.locals.host = req.protocol + '://' + req.hostname;
        res.locals.url = req.protocol + '://' + req.headers.host + req.originalUrl;
        next();
    });
} 

function initMiddleware(app) {
    // Showing stack errors
    app.set('showStackError', true);

    // Should be placed before express.static
    app.use(compress({
        filter: function (req, res) {
            return (/json|text|javascript|css|font|svg/).test(res.getHeader('Content-Type'));
        },
        level: 9
    }));

    // Enable logger (morgan)
    app.use(morgan(logger.getFormat(), logger.getOptions()));

    // Environment dependent middleware
    if (process.env.NODE_ENV === 'development') {
        app.set('view cache', false);
    } else if (process.env.NODE_ENV === 'production') {
        app.locals.cache = 'memory';
    }

    app.use(bodyParser.urlencoded({
        extended: true
    }));
    app.use(bodyParser.json({ limit: '1.5mb' }));
    app.use(methodOverride());

    app.use(cookieParser(config.sessionSecret));
    app.use(flash());

    // Passing the request url to environment locals
    app.use(function(req, res, next) {
        res.locals.url = req.protocol + '://' + req.headers.host + req.url;
        next();
    });    
} 

function initViewEngine(app) {
    app.engine('server.view.html', consolidate[config.templateEngine]);
    app.set('view engine', 'server.view.html');
    app.set('views', './');
} 


function initSession(app) {
    app.set('trust proxy', true);
    app.use(session({
        name: config.sessionCookie.name,
        secret: config.sessionSecret,
        cookie: {
            maxAge: config.sessionCookie.maxAge,
            httpOnly: config.sessionCookie.httpOnly
        }
    }));
} 

function initHelmetHeaders(app) {
    const SIX_MONTHS = 15778476000;
    app.use(helmet.frameguard());
    app.use(helmet.xssFilter());
    app.use(helmet.noSniff());
    app.use(helmet.ieNoOpen());
    app.use(helmet.hsts({
        maxAge: SIX_MONTHS,
        includeSubdomains: true,
        force: true
    }));
    app.disable('x-powered-by');
} 

/**
 * Configure the modules static routes
 */
function initModulesClientRoutes(app) {
    const modulesCacheDir = path.join(cacheDir, 'modules');

    app.use(babelConnect({
        src: 'public',
        dest: modulesCacheDir,
        ignore: /lib/,
        options: {
            sourceMaps: 'inline'
        }
    }));

    app.use(babelConnect({
        src: 'modules',
        dest: modulesCacheDir,
        options: {
            sourceMaps: 'inline'
        }
    }));

    app.use(sassMiddleware({
        src: 'modules',
        dest: modulesCacheDir,
        sourceMap: true
    }));

    glob.sync('modules/*/client').forEach(routePath => {
        let urlPath = routePath.replace(/modules/, '');
        servePath(app, urlPath, path.join(cacheDir, 'modules', urlPath));
        servePath(app, urlPath, routePath);
    });

    // Serve public/lib files
    servePath(app, '/', './public');

}

function servePath(app, urlPath, filePath) {
    app.use(urlPath, serveStatic(path.resolve(filePath), { maxAge: config.staticMaxAge }));
}

/**
 * Configure the modules server routes
 */
function initModulesServerRoutes(app) {
    config.files.server.routes.forEach(routePath => {
        require(path.resolve(routePath))(app);
    });

    app.route('/*').get(core.renderIndex);

} 

function initErrorRoutes(app) {
    app.use((err, req, res, next) => {
        if (!err) {
            return next();
        }

        console.error(err.stack);

        res.redirect('/server-error');
    });
} 

module.exports.init = () => {
    var app = express();

    // Initialize local variables
    initLocalVariables(app);

    // Initialize Express middleware
    initMiddleware(app);

    // Initialize Express view engine
    initViewEngine(app);

    // Initialize Express session
    initSession(app);

    // Initialize Helmet security headers
    initHelmetHeaders(app);

    // Initialize modules static client routes
    initModulesClientRoutes(app);

    // Initialize modules server routes
    initModulesServerRoutes(app);

    // Initialize error routes
    initErrorRoutes(app);

    return app;
};
