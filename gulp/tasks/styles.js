'use strict';

import autoprefixer from 'gulp-autoprefixer'
import browserSync  from 'browser-sync'
import config       from '../config'
import gulp         from 'gulp'
import gulpif       from 'gulp-if'
import handleError  from '../helpers/handle-error'
import less         from 'gulp-less'
import minify       from 'gulp-minify-css'
import rename       from 'gulp-rename'
import sourcemaps   from 'gulp-sourcemaps'

gulp.task( 'styles:build', function() {
  return gulp.src( 'src/stylesheets/main.less' )
    .pipe( gulpif( !!config.settings.sourceMaps, sourcemaps.init() ) )
    .pipe( less() )
    .on( 'error', handleError )
    .pipe( autoprefixer( config.settings.autoprefixer ) )
    .pipe( gulpif( !!config.settings.sourceMaps,
      sourcemaps.write('./', {
        sourceRoot: config.sources.styles.root
      })
    ))
    .pipe( gulp.dest( config.destinations.styles ) )
    .pipe( rename( { suffix: '.min' } ) )
    .pipe( minify() )
    .pipe( gulpif( !!config.settings.sourceMaps,
      sourcemaps.write('./', {
        sourceRoot: config.sources.styles.root
      })
    ))
    .pipe( gulp.dest( config.destinations.styles ) )
    .pipe( gulpif( browserSync.active, browserSync.reload( { stream: true } ) ) )
} )

gulp.task( 'styles:watch', [ 'styles:build' ], function() {
  gulp.watch( config.sources.styles.glob, [ 'styles:build' ] )
})
