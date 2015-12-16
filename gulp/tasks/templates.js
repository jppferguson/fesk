'use strict'

import browserSync from 'browser-sync'
import config      from '../config'
import gulp        from 'gulp'
import jade        from 'gulp-jade'
import handleError from '../helpers/handle-error'

gulp.task( 'templates:build', function() {
  return gulp.src( config.sources.templates.glob )
    .pipe( jade( {
      pretty: true
    } ) )
    .on( 'error', handleError )
    .pipe( gulp.dest( config.destinations.root ) )
} )

gulp.task( 'templates:watch', [ 'templates:build' ], function() {
  gulp.watch( config.sources.templates.glob, [ 'templates:build', browserSync.reload( { stream: true } ) ] )
} )
