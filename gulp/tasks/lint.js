'use strict'

import config from '../config'
import eslint from 'gulp-eslint'
import gulp   from 'gulp'

function lint( src, formatter = 'stylish' ) {
  return gulp.src( src )
    .pipe( eslint() )
    .pipe( eslint.format( formatter ) )
}

gulp.task( 'eslint:scripts', function() {
  return lint( config.sources.scripts.glob )
} )
gulp.task( 'eslint:gulp',    function() {
  return lint( global.gulpPath + '/**/*.js' )
} )

// aliases
gulp.task( 'lint',         [ 'eslint:scripts', 'eslint:gulp' ] )
gulp.task( 'lint:gulp',    [ 'eslint:gulp' ] )
gulp.task( 'lint:scripts', [ 'eslint:scripts' ] )

