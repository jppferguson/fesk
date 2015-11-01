'use strict';

import browserSync from 'browser-sync'
import config      from '../config'
import gulp        from 'gulp'
import imagemin    from 'gulp-imagemin'

gulp.task( 'images:build', function() {
  return gulp.src( config.sources.images.glob )
    .pipe( imagemin( {
      progressive: true
    } ) )
    .pipe( gulp.dest( config.destinations.images ) )
} )

gulp.task( 'images:watch', [ 'images:build' ], function() {
  gulp.watch( config.sources.images.glob, [ 'images:build', browserSync.reload( { stream: true } ) ] )
} )

gulp.task( 'assets:build', [ 'images:build' ] )
gulp.task( 'assets:watch', [ 'images:watch' ] )
