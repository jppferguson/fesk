'use strict';

var browserify  = require('browserify'),
    watchify    = require('watchify')

module.exports = function (gulp, plugins, sources, destinations, config) {

  var minifyBundle = true, //gulp.configs.sourceMap || gulp.configs.isProduction;
      customOpts = {
        debug: true
      },
      bundler = browserify( customOpts )

  bundler.add( sources.scripts.main )

  // Do transformation tasks here
  bundler.transform( require( 'babelify' ) );
  bundler.transform( require( 'debowerify' ) );
  bundler.transform( require( 'jadeify' ) );
  // bundler.transform( require( 'reactify' ) );

  function bundle() {
    return bundler.bundle()
      // log errors if they happen
      .on('error', plugins.util.log.bind(plugins.util, 'Browserify Error'))
      .pipe( plugins.source( destinations.bundle ) )
      // optional, remove if you don't need to buffer file contents
      .pipe(plugins.buffer())
      // optional, remove if you dont want sourcemaps
      .pipe(plugins.sourcemaps.init({loadMaps: true})) // loads map from browserify file
         // Add transformation tasks to the pipeline here.
      .pipe( plugins.sourcemaps.write('./')) // writes .map file
      .pipe( gulp.dest( destinations.scripts ) )

  }

  // Trigger
  gulp.task( 'watchify:build', function ( cb ) {
    bundler = watchify( bundler )
      .on('update', function() {
        gulp.start('watchify:update')
      })
      .on('time', function ( time ) {
        plugins.gutil.log( 'Rebundled in:', plugins.gutil.colors.cyan( time + 'ms' ) );
      })
    cb();
  })

  gulp.task('watchify:update', ['scripts:build'], function() {
    plugins.gutil.log(plugins.gutil.colors.bgYellow.black(' UPDATED '))
    plugins.reload()
  })

  // Tasks
  gulp.task( 'scripts:build', [ 'lint:scripts' ], bundle )
  gulp.task( 'scripts:watch', [ 'watchify:build', 'scripts:build' ] )

}
