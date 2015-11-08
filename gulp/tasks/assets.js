'use strict';

import browserSync from 'browser-sync'
import config      from '../config'
import gulp        from 'gulp'
import handleError from '../helpers/handle-error'
import imagemin    from 'gulp-imagemin'

/*
 * Images
 *******************************/

gulp.task( 'images:build', function() {
  return gulp.src( config.sources.images.glob )
    .pipe( imagemin( {
      progressive: true
    } ) )
    .on( 'error', handleError )
    .pipe( gulp.dest( config.destinations.images ) )
    .pipe( gulpif( browserSync.active, browserSync.reload( { stream: true, once: true } ) ) )
} )

gulp.task( 'images:watch', [ 'images:build' ], function() {
  gulp.watch( config.sources.images.glob, [ 'images:build' ] )
} )

/*
 * Fonts
 *******************************/

gulp.task( 'fonts:build', function() {
  return gulp.src( config.sources.fonts.glob )
    .pipe( gulp.dest( config.destinations.fonts ) )
} )

gulp.task( 'fonts:watch', [ 'fonts:build' ], function() {
  gulp.watch( config.sources.fonts.glob, [ 'fonts:build' ] )
} )

gulp.task( 'assets:build', [ 'images:build', 'fonts:build' ] )
gulp.task( 'assets:watch', [ 'images:watch', 'fonts:watch' ] )
