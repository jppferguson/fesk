'use strict'

var fs = require('fs')
var tasks = fs.readdirSync('./gulp/tasks/')
var config = require('./config')
var gulp = require('gulp')

// loop tasks folder
tasks.forEach( function( task ) {
  require( './tasks/' + task )
})

// Core tasks
gulp.task( 'build',   [ 'clean', 'assets:build', 'scripts:build', 'styles:build', 'templates:build', 'public' ] )
gulp.task( 'watch',   [ 'assets:watch', 'scripts:watch', 'styles:watch', 'templates:watch' ] )
gulp.task( 'serve',   [ 'browser-sync', 'watch' ] )
gulp.task( 'default', [ 'serve' ] );
