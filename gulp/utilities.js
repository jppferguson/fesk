'use strict';

module.exports = function ( gulp, plugins, sources, destinations, config ) {

  gulp.task( 'clean', function( cb ) {
    plugins.del( destinations.root, cb );
  });

}
