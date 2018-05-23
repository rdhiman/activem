'use strict';

module.exports = {
    client: {
        lib: {
            css: [
                'public/lib/bootstrap/dist/css/bootstrap.min.css'
            ],
            js: [
                'public/lib/jquery/dist/jquery.min.js',
                'public/lib/angular/angular.min.js',
                'public/lib/angular-resource/angular-resource.min.js',
                'public/lib/angular-animate/angular-animate.min.js',
                'public/lib/angular-cookies/angular-cookies.min.js',
                'public/lib/angular-sanitize/angular-sanitize.min.js',
                'public/lib/angular-touch/angular-touch.min.js',
                'public/lib/angular-ui-router/release/angular-ui-router.min.js',
                'public/lib/angular-bootstrap/ui-bootstrap-tpls.min.js',
                'public/lib/lodash/dist/lodash.min.js',
                'public/lib/ngDfp/angular-dfp.min.js',
                'public/lib/moment/moment.js',
                'public/atc.min.js',
                'public/lib/angular-recaptcha/release/angular-recaptcha.min.js'
            ],
        },
        sass: [],
        css: 'public/dist/application.min.css',
        js: 'public/dist/application.min.js'
    }
};