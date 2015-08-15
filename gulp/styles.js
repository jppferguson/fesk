'use strict';

module.exports = function ( gulp, plugins, sources, destinations, config ) {

  gulp.task( 'styles:build', function() {
    return gulp.src( 'src/stylesheets/main.less' )
      .pipe( plugins.plumber() )
      .pipe( plugins.less() )
      .pipe( gulp.dest( destinations.styles ) )
  } )

  gulp.task( 'styles:watch', [ 'styles:build' ], function() {
    gulp.watch( sources.styles.glob, [ 'styles:build', 'styles:inject' ] )
  })

  // Inject the css
  gulp.task( 'styles:inject', [ 'styles:build' ], function() {
    if( plugins.browserSync )
      plugins.browserSync.reload( [ destinations.stylesheet ] )
  })

}
