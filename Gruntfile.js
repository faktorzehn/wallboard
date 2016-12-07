'use strict';
var lrSnippet = require('grunt-contrib-livereload/lib/utils').livereloadSnippet;
var mountFolder = function (connect, dir) {
    return connect.static(require('path').resolve(dir));
};

module.exports = function (grunt) {
    // load all grunt tasks
    require('matchdep').filterDev('grunt-*').forEach(grunt.loadNpmTasks);

    // configurable paths
    var yeomanConfig = {
        app: 'app',
        dist: 'dist'
    };

    try {
        yeomanConfig.app = require('./bower.json').appPath || yeomanConfig.app;
    } catch (e) {
    }

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        yeoman: yeomanConfig,
        watch: {
            coffee: {
                files: ['<%= yeoman.app %>/scripts/{,**/}*.coffee'],
                tasks: ['coffee:dist']
            },
            coffeeTest: {
                files: ['test/spec/{,**/}*.coffee'],
                tasks: ['coffee:test']
            },
            compass: {
                files: ['<%= yeoman.app %>/styles/{,**/}*.{scss,sass}'],
                tasks: ['compass']
            },
            livereload: {
                files: [
                    '<%= yeoman.app %>/{,**/}*.{html,json}',
                    '{.tmp,<%= yeoman.app %>}/conf/{,**/}*.css',
                    '{.tmp,<%= yeoman.app %>}/styles/{,**/}*.css',
                    '{.tmp,<%= yeoman.app %>}/scripts/{,**/}*.js',
                    '<%= yeoman.app %>/images/{,**/}*.{png,jpg,jpeg,gif,webp,svg}'

                ],
                tasks: ['livereload']
            }
        },
        connect: {
            options: {
                port: 9001,
                // Change this to '0.0.0.0' to access the server from outside.
                hostname: 'localhost'
            },
            livereload: {
                options: {
                    middleware: function (connect) {
                        return [
                            lrSnippet,
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, yeomanConfig.app)
                        ];
                    }
                }
            },
            test: {
                options: {
                    middleware: function (connect) {
                        return [
                            mountFolder(connect, '.tmp'),
                            mountFolder(connect, 'test')
                        ];
                    }
                }
            }
        },
        open: {
            server: {
                url: 'http://localhost:<%= connect.options.port %>'
            }
        },
        clean: {
            dist: {
                files: [
                    {
                        dot: true,
                        src: [
                            '.tmp',
                            '<%= yeoman.dist %>/*',
                            '!<%= yeoman.dist %>/.git*'
                        ]
                    }
                ]
            },
            server: '.tmp'
        },
        jshint: {
            options: {
                jshintrc: '.jshintrc'
            },
            all: [
                'Gruntfile.js',
                '<%= yeoman.app %>/scripts/{,**/}*.js'
            ]
        },
        karma: {
            unit: {
                configFile: 'karma.conf.js',
                singleRun: true
            },

            unitWatch: {
                configFile: 'karma.conf.js',
                singleRun: false
            }
        },
        coffee: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/scripts',
                        src: '{,**/}*.coffee',
                        dest: '.tmp/scripts',
                        ext: '.js'
                    }
                ]
            },
            test: {
                files: [
                    {
                        expand: true,
                        cwd: 'test/spec',
                        src: '{,**/}*.coffee',
                        dest: '.tmp/spec',
                        ext: '.js'
                    }
                ]
            }
        },
        compass: {
            options: {
                sassDir: '<%= yeoman.app %>/styles',
                cssDir: '.tmp/styles',
                imagesDir: '<%= yeoman.app %>/images',
                javascriptsDir: '<%= yeoman.app %>/scripts',
                //fontsDir: '<%= yeoman.app %>/styles/fonts',
                //importPath: '<%= yeoman.app %>/components',
                relativeAssets: true
            },
            dist: {
                cssDir: '<%= yeoman.dist %>/images'

            },
            server: {
                options: {
                    //debugInfo: true
                }
            }
        },
        concat: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/scripts/scripts.js': [
                        '.tmp/scripts/{,**/}*.js',
                        '<%= yeoman.app %>/scripts/{,**/}*.js'
                    ]
                }
            }
        },
        useminPrepare: {
            html: '<%= yeoman.dist %>/index.html',
            options: {
                dest: '<%= yeoman.dist %>'
            }
        },
        usemin: {
            html: ['<%= yeoman.dist %>/{,**/}*.html'],
            css: ['<%= yeoman.dist %>/styles/{,**/}*.css'],
            options: {
                dirs: ['<%= yeoman.dist %>']
            }
        },
        imagemin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>/images',
                        src: '{,**/}*.{png,jpg,jpeg}',
                        dest: '<%= yeoman.dist %>/images'
                    }
                ]
            }
        },
        cssmin: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/styles/main.css': [
                        '.tmp/styles/{,**/}*.css',
                        '<%= yeoman.app %>/styles/{,**/}*.css'
                    ]
                }
            }
        },
        htmlmin: {
            dist: {
                options: {
                    /*removeCommentsFromCDATA: true,
                     // https://github.com/yeoman/grunt-usemin/issues/44
                     //collapseWhitespace: true,
                     collapseBooleanAttributes: true,
                     removeAttributeQuotes: true,
                     removeRedundantAttributes: true,
                     useShortDoctype: true,
                     removeEmptyAttributes: true,
                     removeOptionalTags: true*/
                },
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.app %>',
                        src: ['*.html', 'views/{,**/}*.html'],
                        dest: '<%= yeoman.dist %>'
                    }
                ]
            }
        },
        cdnify: {
            dist: {
                html: ['<%= yeoman.dist %>/*.html']
            }
        },
        ngmin: {
            dist: {
                files: [
                    {
                        expand: true,
                        cwd: '<%= yeoman.dist %>/scripts',
                        src: '*.js',
                        dest: '<%= yeoman.dist %>/scripts'
                    }
                ]
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%= yeoman.dist %>/scripts/scripts.js': [
                        '<%= yeoman.dist %>/scripts/scripts.js'
                    ]
                }
            },
            options: {
					mangle: false
            }
        },
        rev: {
            dist: {
                files: {
                    src: [
                        '<%= yeoman.dist %>/scripts/{,**/}*.js',
                        '<%= yeoman.dist %>/styles/{,**/}*.css',
                        '<%= yeoman.dist %>/images/{,**/}*.{png,jpg,jpeg,gif,webp,svg}',
                        '<%= yeoman.dist %>/styles/fonts/*'
                    ]
                }
            }
        },
        copy: {
            compass: {
                files: [
                    {
                        src: ['main.css'],
                        dest: '<%= yeoman.app %>/styles/',
                        filter: 'isFile',
                        expand: true,
                        flatten: true,
                        cwd: '.tmp/styles/'
                    }
                ]
            },

            conf: {
                files: [
                    {
                        cwd: '<%= yeoman.app %>',
                        src: 'conf/*.json',
                        dest: '<%= yeoman.dist %>',
                        expand: true
                    }
                ]
            },

            dist: {
                files: [
                    {
                        expand: true,
                        dot: true,
                        cwd: '<%= yeoman.app %>',
                        dest: '<%= yeoman.dist %>',
                        src: [
                            '*.{ico,txt}',
                            'favicon.png',
                            '.htaccess',
                            'components/**/*',
                            'images/{,**/}*.{gif,webp}',
                            'styles/fonts/*'
                        ]
                    }
                ]
            }
        },
        compress: {
            main: {
                options: {
                    archive: 'archive/<%= pkg.name %>_<%= pkg.version %>.zip',
                    mode: 'zip'
                },
                files: [
                    {
                        expand: true, src: '**/*', cwd: 'dist/'
                    }
                ]
            }
        },
        bump: {
            options: {
                files: ['package.json', 'bower.json'],
                updateConfigs: ['pkg'],
                commit: true,
                commitMessage: 'Release v%VERSION%',
                commitFiles: ['-a'],
                createTag: true,
                tagName: 'v%VERSION%',
                tagMessage: 'Version %VERSION%',
                push: true,
                pushTo: 'origin'
            }
        },
        'string-replace': {
            version: {
                files: {
                    '<%= yeoman.dist %>/views/main.html': '<%= yeoman.dist %>/views/main.html',
                    '<%= yeoman.dist %>/index.html': '<%= yeoman.dist %>/index.html'
                },
                options: {
                    replacements: [
                        {
                            pattern: /__VERSION__/g,
                            replacement: '<%= pkg.version %>'
                        }
                    ]
                }
            }
        },
        processhtml: {
            options: {
                process: true
            },
            dist: {
                files: {
                    '<%= yeoman.dist %>/index.html': ['<%= yeoman.dist %>/index.html']
                }
            }
        }
    });

    grunt.renameTask('regarde', 'watch');

    grunt.registerTask('server', [
        'clean:server',
        'coffee:dist',
        'compass:server',
        'livereload-start',
        'connect:livereload',
        'open',
        'watch',
        'karma:unitWatch'
    ]);

    grunt.registerTask('test', [
        'clean:server',
        'coffee',
        'compass',
        'connect:test',
        'karma:unit'
    ]);

    grunt.registerTask('build', [
        'clean:dist',
        'coffee',
        'compass:dist',
        'copy:compass',
        'useminPrepare',
        'imagemin',
        'cssmin',
        'htmlmin',
        'processhtml:dist',
        'concat',
        'copy',
        'ngmin',
        'uglify',
        'rev',
        'usemin',
        'string-replace:version',
        'compress'
    ]);

    /*
     Make a patch Release:
     - increment version number
     - build
     - commit to git and create tag vor version
     */
    grunt.registerTask('patch', [
        //'test',
        'bump-only:patch',
        'build',
        'bump-commit'
    ]);

    /*
     Make a minor Release:
     - increment version number
     - build
     - commit to git and create tag vor version
     */
    grunt.registerTask('release-minor', [
        //'test',
        'bump-only:minor',
        'build',
        'bump-commit'
    ]);

    /*
     Make a major Release:
     - increment version number
     - build
     - commit to git and create tag vor version
     */
    grunt.registerTask('release-major', [
        //'test',
        'bump-only:major',
        'build',
        'bump-commit'
    ]);

    grunt.registerTask('default', ['build']);
};
