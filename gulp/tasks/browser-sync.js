'use strict';

module.exports = function ( gulp, plugins, sources, destinations, config ) {

  gulp.task( 'browser-sync', [ 'build' ], function() {
    plugins.browserSync( {
      open:   !!plugins.argv.open,
      notify: !!plugins.argv.notify,
      server: {
        baseDir: destinations.root
      }
    } )
  } )

}
