'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash'),
    defaultAssets = require('./config/assets/default'),
    testAssets = require('./config/assets/test'),
    testConfig = require('./config/env/test'),
    fs = require('fs'),
    path = require('path');

module.exports = function(grunt) {
    // Project Configuration
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        env: {
            test: {
                NODE_ENV: 'test'
            },
            dev: {
                NODE_ENV: 'development'
            },
            prod: {
                NODE_ENV: 'production'
            },
            chrome: {
                BROWSER: 'chrome'
            },
            firefox: {
                BROWSER: 'firefox'
            }
        },
        watch: {
            serverViews: {
                files: defaultAssets.server.views,
                options: {
                    livereload: true
                }
            },
            serverJS: {
                files: _.union(defaultAssets.server.gruntConfig, defaultAssets.server.allJS),
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            clientViews: {
                files: defaultAssets.client.views,
                options: {
                    livereload: true
                }
            },
            clientJS: {
                files: defaultAssets.client.js,
                tasks: ['jshint'],
                options: {
                    livereload: true
                }
            },
            clientCSS: {
                files: defaultAssets.client.css,
                tasks: ['csslint'],
                options: {
                    livereload: true
                }
            },
            clientSCSS: {
                files: defaultAssets.client.sass,
                tasks: ['csslint'],
                options: {
                    livereload: true
                }
            }
        },
        nodemon: {
            dev: {
                script: 'server.js',
                options: {
                    nodeArgs: ['--debug'],
                    ext: 'js,html',
                    watch: _.union(defaultAssets.server.gruntConfig, defaultAssets.server.views, defaultAssets.server.allJS, defaultAssets.server.config)
                }
            }
        },
        concurrent: {
            default: ['nodemon', 'watch'],
            debug: ['nodemon', 'watch', 'node-inspector'],
            options: {
                logConcurrentOutput: true
            }
        },
        jshint: {
            all: {
                src: _.union(defaultAssets.server.gruntConfig, defaultAssets.server.allJS, defaultAssets.client.js, testAssets.tests.server, testAssets.tests.client, testAssets.tests.e2e),
                options: {
                    jshintrc: true,
                    node: true,
                    mocha: true,
                    jasmine: true
                }
            }
        },
        eslint: {
            options: {},
            target: _.union(defaultAssets.server.gruntConfig, defaultAssets.server.allJS, defaultAssets.client.js, testAssets.tests.server, testAssets.tests.client, testAssets.tests.e2e)
        },
        csslint: {
            options: {
                csslintrc: '.csslintrc'
            },
            all: {
                src: defaultAssets.client.css
            }
        },
        ngAnnotate: {
            production: {
                files: {
                    'public/dist/app.annotated.js': defaultAssets.client.js
                }
            }
        },
        babel: {
            options: {
                sourceMaps: false,
                minified: true
            },
            dist: {
                files: {
                    'public/dist/application.min.js': 'public/dist/app.annotated.js'
                }
            }
        },
        cssmin: {
            combine: {
                files: {
                    'public/dist/application.min.css': ['public/dist/application.css', defaultAssets.client.css]
                }
            }
        },
        sass_import: {
            dist: {
                files: {
                    'public/dist/application.scss': defaultAssets.client.sass
                }
            }
        },
        sass: {
            options: {
                sourcemap: 'none',
            },
            dist: {
                files: {
                    'public/dist/application.css': 'public/dist/application.scss'
                }
            }
        },
        copy: {
            main: {
                files: [
                    {
                        expand: true, 
                        cwd: 'modules/core/client/styles/fonts',
                        src: '**',
                        dest: 'public/dist/fonts/'
                    },
                    {
                        expand: true, 
                        cwd: 'modules/core/client/images',
                        src: '**',
                        dest: 'public/images/'
                    }
                ]
            }
        },
        clean: {
            dist: {
                src: [
                    'public/dist/*.js', 
                    'public/dist/*.scss', 
                    'public/dist/*.css',
                    '!public/dist/*.min.css', 
                    '!public/dist/*.min.js'
                ]
            }
        },
        'node-inspector': {
            custom: {
                options: {
                    'web-port': 1337,
                    'web-host': 'localhost',
                    'debug-port': 5858,
                    'save-live-edit': true,
                    'no-preload': true,
                    'stack-trace-limit': 50,
                    'hidden': []
                }
            }
        },
        mocha_istanbul: {
            default: {
                src: testAssets.tests.server,
                options: {
                    coverageFolder: 'test/coverage/server',
                    root: './modules',
                    require: ['test.js'],
                    nodeExec: 'babel-node',
                    scriptPath: require.resolve('babel-istanbul/lib/cli'),
                    timeout: 36000,
                    reportFormats: ['html', 'cobertura', 'lcov'],
                    check: {
                        branches: 90,
                        functions: 90,
                        lines: 91,
                        statements: 91
                    }
                }
            }
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js'
            }
        },
        protractor: {
            options: {
                configFile: 'protractor.conf.js',
                noColor: false,
                webdriverManagerUpdate: true
            },
            e2e: {
                options: {
                    args: {} // Target-specific arguments
                }
            }
        },
        shell: {
            mongodb: {
                command: 'mkdir -p data/db; mongod --dbpath ./data/db',
                options: {
                    async: true,
                    stdout: false,
                    stderr: true,
                    failOnError: true,
                    execOptions: {
                        cwd: '.'
                    }
                }
            }
        }
    });

    // Load NPM tasks
    require('load-grunt-tasks')(grunt);

    // Some tasks require calls to 'loadNpmTasks'
    grunt.loadNpmTasks('grunt-mocha-istanbul');
    grunt.loadNpmTasks('grunt-contrib-sass');

    // Run server for protractor:e2e tests
    grunt.task.registerTask('server', 'Starting the server', function () {
        require('babel-register');
        const path = require('path');
        
        // Get the callback
        const done = this.async();
        const app = require('./config/application');
        const server = app.start(() => {
            done();
        });
    });

    // Lint CSS and JavaScript files.
    grunt.registerTask('lint', ['jshint', 'eslint', 'csslint']);

    // Lint project files and minify them into two production files.
    grunt.registerTask('compile:js', ['ngAnnotate', 'babel']);
    grunt.registerTask('compile:css', ['sass_import', 'sass', 'cssmin']);
    grunt.registerTask('build', ['env:prod', 'lint', 'copy', 'compile:js', 'compile:css', 'clean']);

    // Run the project tests
    grunt.registerTask('test', ['env:test', 'lint', 'karma:unit', 'mocha_istanbul']);
    grunt.registerTask('test:client', ['env:test', 'lint', 'karma:unit']);
    grunt.registerTask('test:server', ['env:test', 'lint', 'mocha_istanbul']);
    grunt.registerTask('test:e2e', ['env:test', 'lint', 'server', 'protractor']);
    grunt.registerTask('test:e2e:firefox', ['env:firefox', 'test:e2e']);
    grunt.registerTask('test:e2e:chrome', ['env:chrome', 'test:e2e']);
    
    // Run project coverage
    grunt.registerTask('coverage', ['shell:mongodb', 'env:test', 'lint', 'mocha_istanbul:coverage', 'karma:unit']);

    // Run the project in development mode
    grunt.registerTask('default', ['shell:mongodb', 'env:dev', 'lint', 'concurrent:default']);

    // Run the project in debug mode
    grunt.registerTask('debug', ['shell:mongodb', 'env:dev', 'lint', 'concurrent:debug']);

    // Run the project in production mode
    grunt.registerTask('prod', ['build', 'env:prod', 'concurrent:default']);
};