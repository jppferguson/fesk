'use strict';

var stylish = require('jshint-stylish');

module.exports = function (gulp, plugins, sources, destinations, config) {

  gulp.task('eslint', function() {
    return gulp.src( sources.scripts.glob )
      .pipe( plugins.eslint() )
      .pipe( plugins.eslint.format() )
  });

  gulp.task( 'lint:scripts', [ 'eslint' ] )

}
