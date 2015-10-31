'use strict';

var fs = require('fs')
var tasks = fs.readdirSync('./gulp/tasks/')
var gulp = require('gulp')
var config = require('./config')

// loop tasks folder
tasks.forEach( function( task ) {
  require( './tasks/' + task )( gulp, config.plugins, config.sources, config.destinations, config.config )
})

// Core tasks
gulp.task( 'build',   [ 'clean', 'assets:build', 'scripts:build', 'styles:build', 'templates:build', 'public' ] )
gulp.task( 'watch',   [ 'assets:watch', 'scripts:watch', 'styles:watch', 'templates:watch' ] )
gulp.task( 'serve',   [ 'browser-sync', 'watch' ] )
gulp.task( 'default', [ 'serve' ] );
