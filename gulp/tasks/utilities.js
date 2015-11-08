'use strict'

import config from '../config'
import del    from 'del'
import gulp   from 'gulp'

gulp.task( 'clean', function( cb ) {
  del( [ config.destinations.root + '/**/*' ], cb );
})

gulp.task( 'public', function( cb ) {
  return gulp.src( 'src/public/**' )
    .pipe( gulp.dest( 'dist' ) )
})
