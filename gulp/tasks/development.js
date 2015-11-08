'use strict'

import gulp from 'gulp'
import run  from 'run-sequence'

gulp.task( 'dev', [ 'clean' ], function( callback ) {

  global.isProduction = false

  // Note: this is a temp solution until gulp 4.* is released
  run( [ 'lint', 'public:watch', 'assets:watch', 'scripts:watch', 'styles:watch', 'templates:watch' ], 'browser-sync', callback )

} )
