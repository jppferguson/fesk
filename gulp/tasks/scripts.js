'use strict'

import babelify    from 'babelify'
import browserSync from 'browser-sync'
import browserify  from 'browserify'
import buffer      from 'vinyl-buffer'
import config      from '../config'
import debowerify  from 'debowerify'
import gulp        from 'gulp'
import gulpif      from 'gulp-if'
import handleError from '../helpers/handle-error'
import jadeify     from 'jadeify'
import source      from 'vinyl-source-stream'
import sourcemaps  from 'gulp-sourcemaps'
import uglifyify   from 'uglifyify'
import util        from 'gulp-util'
import watchify    from 'watchify'

function buildBundle( filename, watch ) {
  var rebundle
  var sourceMaps = !global.isProduction && !!config.settings.sourceMaps
  var minifyBundle = global.isProduction || config.settings.minify
  var bundler = browserify( filename, {
    // basedir: __dirname,
    debug: !global.isProduction,
    cache: {}, // required for watchify
    packageCache: {}, // required for watchify
    fullPaths: watch // required to be true only for watchify
  } )

  // allow watching
  if ( watch ) {
    bundler = watchify( bundler )
  }

  // Do transformation tasks here
  bundler.transform( babelify )
  bundler.transform( debowerify )
  bundler.transform( jadeify )
  if ( minifyBundle ) {
    bundler.transform( { global: true }, uglifyify )
  }

  rebundle = function() {
    return bundler.bundle()
      .on( 'error', handleError )
      .pipe( source( config.destinations.bundle ) )
      .pipe( buffer() ) // optional, remove if you don't need to buffer file contents
      .pipe( gulpif( sourceMaps,
        sourcemaps.init( {
          loadMaps: true  // loads map from browserify file
        } )
      ) )
      .pipe( gulpif( sourceMaps,
        sourcemaps.write( './' ) // writes .map file
      ) )
      .pipe( gulp.dest( config.destinations.scripts ) )
      .pipe( gulpif( browserSync.active,
        browserSync.reload( {
          stream: true,
          once: true
        } )
      ) )
  }

  bundler
    .on( 'update', rebundle )
    .on( 'time', function( time ) {
      util.log(
        util.colors.bgYellow.black( ' (RE)BUNDLED ' ) +
        util.colors.bgCyan.black( ' in ' + time + 'ms ' ),
        filename
      )
    } )
  return rebundle()
}

// Tasks
gulp.task( 'scripts:build', function() {
  return buildBundle( config.sources.scripts.main, false )
} )

gulp.task( 'scripts:watch', function() {
  return buildBundle( config.sources.scripts.main, true )
} )
