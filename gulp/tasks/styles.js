'use strict';

import browserSync from 'browser-sync'
import config      from '../config'
import gulp        from 'gulp'
import less        from 'gulp-less'
import plumber     from 'gulp-plumber'

gulp.task( 'styles:build', function() {
  return gulp.src( 'src/stylesheets/main.less' )
    .pipe( plumber() )
    .pipe( less() )
    .pipe( gulp.dest( config.destinations.styles ) )
} )

gulp.task( 'styles:watch', [ 'styles:build' ], function() {
  gulp.watch( config.sources.styles.glob, [ 'styles:build', 'styles:inject' ] )
})

// Inject the css
gulp.task( 'styles:inject', [ 'styles:build' ], function() {
  if( browserSync )
    browserSync.reload( [ config.destinations.stylesheet ] )
})
