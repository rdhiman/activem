'use strict';

module.exports = {
    client: {
        lib: {
            css: [
                'public/lib/bootstrap/dist/css/bootstrap.css'
            ],
            js: [
                'public/lib/jquery/dist/jquery.js',
                'public/lib/angular/angular.js',
                'public/lib/angular-resource/angular-resource.js',
                'public/lib/angular-animate/angular-animate.js',
                'public/lib/angular-cookies/angular-cookies.js',
                'public/lib/angular-sanitize/angular-sanitize.js',
                'public/lib/angular-touch/angular-touch.js',
                'public/lib/angular-ui-router/release/angular-ui-router.js',
                'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
                'public/lib/lodash/lodash.js',
                'public/lib/ngDfp/angular-dfp.min.js',
                'public/lib/moment/moment.js',
                'public/atc.min.js',
                'public/lib/angular-recaptcha/release/angular-recaptcha.min.js'
            ],
            tests: ['public/lib/angular-mocks/angular-mocks.js']
        },
        css: [
            'modules/*/client/styles/*.css'
        ],
        sass: [
            'modules/*/client/styles/*.scss'
        ],
        js: [
            'public/config.js',
            'public/application.js',
            'modules/*/client/*.js',
            'modules/*/client/**/*.js'
        ],
        views: ['modules/*/client/views/**/*.html'],
        templates: ['build/templates.js']
    },
    server: {
        gruntConfig: 'gruntfile.js',
        allJS: ['server.js', 'config/**/*.js', 'modules/*/server/**/*.js'],
        routes: ['modules/!(core)/server/routes/**/*.js', 'modules/core/server/routes/**/*.js'],
        views: 'modules/*/server/views/*.html'
    }
};
