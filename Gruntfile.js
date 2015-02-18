'use strict';

module.exports = function (grunt) {


    // Load grunt tasks automatically, when needed
    require('jit-grunt')(grunt, {
        express: 'grunt-express-server'

    });

    // Define the configuration for all the tasks
    grunt.initConfig({
        express: {
            options: {
                port: process.env.PORT || 9000
            },
            dev: {
                options: {
                    script: 'app.js',
                    //debug: true
                }
            },
            prod: {
                options: {
                    script: 'app.js'

                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= express.options.port %>'
            }
        },
        watch: {
            express: {
                files: [
                    'app/**/*.{js,json,jade}'
                ],
                tasks: ['express:dev', 'wait'],
                options: {
                    livereload: true,
                    nospawn: true //Without this option specified express won't be reloaded
                }
            }
        },
        env: {
            test: {
                NODE_ENV: 'test'
            },
            prod: {
                NODE_ENV: 'production'
            },
            all: {}
        },
        jshint:{
            server: {
                options: {
                    jshintrc: 'app/.jshintrc'
                },
                src: [ 'app/{,*/}*.js']
            }

        },
        // Debugging with node inspector
        'node-inspector': {
            custom: {
                options: {
                    'web-host': 'localhost'
                }
            }
        },
        // Use nodemon to run server in debug mode with an initial breakpoint
        nodemon: {
            debug: {
                script: './app.js',
                options: {
                    nodeArgs: ['--debug-brk'],
                    env: {
                        PORT: process.env.PORT || 8000
                    },
                    callback: function (nodemon) {
                        nodemon.on('log', function (event) {
                            console.log(event.colour);
                        });

                        // opens browser on initial server start
                        nodemon.on('config:update', function () {
                            setTimeout(function () {
                                require('open')('http://localhost:8080/debug?port=5858');
                            }, 500);
                        });
                    }
                }
            }
        }

    });

    // Used for delaying livereload until after server has restarted
    grunt.registerTask('wait', function () {
        grunt.log.ok('Waiting for server reload...');

        var done = this.async();

        setTimeout(function () {
            grunt.log.writeln('Done waiting!');
            done();
        }, 1500);
    });

    grunt.registerTask('express-keepalive', 'Keep grunt running', function() {
        this.async();
    });

    grunt.registerTask('serve', function (target) {
        return grunt.task.run([
            'express:dev',
            'wait',
            'open',
            'watch'
        ]);
    });
    grunt.registerTask('default', function (target) {
        return grunt.task.run([ 'serve'  ]);
    });


};
