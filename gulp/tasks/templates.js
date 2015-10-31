'use strict';

module.exports = function ( gulp, plugins, sources, destinations, config ) {

  gulp.task( 'templates:build', function() {
    return gulp.src( sources.templates.glob )
      .pipe( plugins.plumber() )
      .pipe( plugins.jade( {
        pretty: true
      } ) )
      .pipe( gulp.dest( destinations.root ) )
  } )

  gulp.task( 'templates:watch', [ 'templates:build' ], function() {
    gulp.watch( sources.templates.glob, [ 'templates:build', plugins.reload ] )
  } )

}
