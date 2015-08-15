'use strict';

module.exports = function ( gulp, plugins, sources, destinations, config ) {

  gulp.task( 'clean', function( cb ) {
    plugins.del( [ destinations.root + '/**/*' ], cb );
  });

  gulp.task( 'public', function( cb ) {
    return gulp.src('src/public/**')
      .pipe(gulp.dest('dist'))
  });

}
