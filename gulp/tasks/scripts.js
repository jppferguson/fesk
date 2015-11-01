'use strict';

import browserify from 'browserify'
import buffer     from 'vinyl-buffer'
import config     from '../config'
import gulp       from 'gulp'
import plumber    from 'gulp-plumber'
import source     from 'vinyl-source-stream'
import sourcemaps from 'gulp-sourcemaps'
import util       from 'gulp-util'
import watchify   from 'watchify'

var minifyBundle = true, //gulp.configs.sourceMap || gulp.configs.isProduction;
    customOpts = {
      debug: true
    },
    bundler = browserify( customOpts )

bundler.add( config.sources.scripts.main )

// Do transformation tasks here
bundler.transform( require( 'babelify' ) );
bundler.transform( require( 'debowerify' ) );
bundler.transform( require( 'jadeify' ) );
// bundler.transform( require( 'reactify' ) );

function bundle() {
  return bundler.bundle()
    // log errors if they happen
    .on( 'error', handleError )
    .pipe( plumber() )
    .pipe( source( config.destinations.bundle ) )
    // optional, remove if you don't need to buffer file contents
    .pipe( buffer() )
    // optional, remove if you dont want sourcemaps
    .pipe( sourcemaps.init( { loadMaps: true } ) ) // loads map from browserify file
       // Add transformation tasks to the pipeline here.
    .pipe( sourcemaps.write( './' ) ) // writes .map file
    .pipe( gulp.dest( config.destinations.scripts ) )

}

function handleError( err ) {
  util.log( 'Browserify Error: ' + err.message )
  this.emit( 'end' );
}

// Trigger
gulp.task( 'watchify:build', function ( cb ) {
  bundler = watchify( bundler )
    .on('update', function() {
      gulp.start('watchify:update')
    })
    .on('time', function ( time ) {
      util.log( 'Rebundled in:', util.colors.cyan( time + 'ms' ) );
    })
  cb();
})

gulp.task('watchify:update', ['scripts:build'], function() {
  util.log(util.colors.bgYellow.black(' UPDATED '))
  browserSync.reload( { stream: true } )
})

// Tasks
gulp.task( 'scripts:build', [ 'lint:scripts' ], bundle )
gulp.task( 'scripts:watch', [ 'watchify:build', 'scripts:build' ] )
