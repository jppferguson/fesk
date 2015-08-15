'use strict';

var stylish = require('jshint-stylish');

module.exports = function (gulp, plugins, sources, destinations, config) {

  gulp.task('jshint', function() {
    return gulp.src( sources.scripts.glob )
      .pipe( plugins.jshint() )
      .pipe( plugins.jshint.reporter( stylish ) );
  });

  gulp.task( 'lint:scripts', [ 'jshint' ] )

}
