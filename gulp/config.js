
var config       = {},
    src          = 'src',
    dest         = 'dist'

config.plugins = require('gulp-load-plugins')()

// add non-autoloaded libs to plugins object
config.plugins.argv        = require('yargs').argv
config.plugins.browserSync = require('browser-sync')
config.plugins.buffer      = require('vinyl-buffer')
config.plugins.del         = require('del')
config.plugins.gutil       = require('gulp-util')
config.plugins.notifier    = require('node-notifier')
config.plugins.path        = require('path')
config.plugins.reload      = config.plugins.browserSync.reload
config.plugins.source      = require('vinyl-source-stream')
config.plugins.transform   = require('vinyl-transform')

// setup sources object
config.sources = {}
config.sources.root = src

config.sources.images = {}
config.sources.images.root = src + '/images'
config.sources.images.glob = config.sources.images.root + '/**/*'

config.sources.scripts = {}
config.sources.scripts.root = src + '/scripts'
config.sources.scripts.main = config.sources.scripts.root + '/main.js'
config.sources.scripts.glob = config.sources.scripts.root + '/**/*.js'

config.sources.styles = {}
config.sources.styles.root = src + '/stylesheets'
config.sources.styles.glob = config.sources.styles.root + '/**/*.less'
config.sources.styles.build = config.sources.styles.root + '/main.less'

config.sources.templates = {}
config.sources.templates.root = src + '/templates'
config.sources.templates.glob = config.sources.templates.root + '/**/*.jade'


// setup destinations object
config.destinations = {}
config.destinations.root = dest
config.destinations.bundle = 'app.js'
config.destinations.assets = dest + '/assets'
config.destinations.images = config.destinations.assets + '/img'
config.destinations.scripts = config.destinations.assets + '/js'
config.destinations.styles = config.destinations.assets + '/css'
config.destinations.stylesheet = config.destinations.styles + '/main.css'
config.destinations.templates = dest

module.exports = config
