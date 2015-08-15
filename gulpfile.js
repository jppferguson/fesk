'use strict';

var gulp         = require('gulp'),
    src          = 'src',
    dest         = 'dist',
    sources      = {},
    destinations = {},
    config       = {},
    plugins      = require('gulp-load-plugins')()


// add non-autoloaded libs to plugins object
plugins.argv        = require('yargs').argv
plugins.browserSync = require('browser-sync')
plugins.buffer      = require('vinyl-buffer')
plugins.del         = require('del')
plugins.gutil       = require('gulp-util')
plugins.notifier    = require('node-notifier')
plugins.path        = require('path')
plugins.reload      = plugins.browserSync.reload
plugins.source      = require('vinyl-source-stream')
plugins.transform   = require('vinyl-transform')





// setup sources object
sources.root = src

sources.images = {}
sources.images.root = src + '/images'
sources.images.glob = sources.images.root + '/**/*'

sources.scripts = {}
sources.scripts.root = src + '/scripts'
sources.scripts.main = sources.scripts.root + '/main.js'
sources.scripts.glob = sources.scripts.root + '/**/*.js'

sources.styles = {}
sources.styles.root = src + '/stylesheets'
sources.styles.glob = sources.styles.root + '/**/*.less'
sources.styles.build = sources.styles.root + '/main.less'

sources.templates = {}
sources.templates.root = src + '/templates'
sources.templates.glob = sources.templates.root + '/**/*.jade'


// setup destinations object
destinations.root = dest
destinations.bundle = 'app.js'
destinations.assets = dest + '/assets'
destinations.images = destinations.assets + '/img'
destinations.scripts = destinations.assets + '/js'
destinations.styles = destinations.assets + '/css'
destinations.stylesheet = destinations.styles + '/main.css'
destinations.templates = dest


// Gulp partials
require('./gulp/assets')( gulp, plugins, sources, destinations, config )
require('./gulp/browser-sync')( gulp, plugins, sources, destinations, config )
require('./gulp/lint')( gulp, plugins, sources, destinations, config )
require('./gulp/scripts')( gulp, plugins, sources, destinations, config )
require('./gulp/styles')( gulp, plugins, sources, destinations, config )
require('./gulp/templates')( gulp, plugins, sources, destinations, config )
require('./gulp/utilities')( gulp, plugins, sources, destinations, config )


// Core tasks
gulp.task( 'build',   [ 'assets:build', 'scripts:build', 'styles:build', 'templates:build' ] )
gulp.task( 'watch',   [ 'assets:watch', 'scripts:watch', 'styles:watch', 'templates:watch' ] )
gulp.task( 'serve',   [ 'browser-sync', 'watch' ] )
gulp.task( 'default', [ 'serve' ] );
