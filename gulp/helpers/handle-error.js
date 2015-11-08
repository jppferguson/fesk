'use strict'

module.exports = function( error ) {

  console.log( error )
  this.emit('end');

}
