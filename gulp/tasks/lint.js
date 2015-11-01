'use strict';

import config from '../config'
import eslint from 'gulp-eslint'
import gulp   from 'gulp'

gulp.task( 'eslint', function() {
  return gulp.src( config.sources.scripts.glob )
    .pipe( eslint() )
    .pipe( eslint.format() )
});

gulp.task( 'lint:scripts', [ 'eslint' ] )

