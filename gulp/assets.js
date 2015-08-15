'use strict';

module.exports = function (gulp, plugins, sources, destinations, config) {

  gulp.task( 'images:build', function() {
    return gulp.src( sources.images.glob )
      .pipe( plugins.imagemin( {
        progressive: true
      } ) )
      .pipe( gulp.dest( destinations.images ) )
  } )

  gulp.task( 'images:watch', [ 'images:build' ], function() {
    gulp.watch( sources.images.glob, [ 'images:build', plugins.reload ] )
  } )

  gulp.task( 'assets:build', [ 'images:build' ] )
  gulp.task( 'assets:watch', [ 'images:watch' ] )

}
