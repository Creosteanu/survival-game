'use strict';

var Q = require('q');

var ai = Q.async(function* (cell) {

    console.log('before synthesis');
    yield cell.photosynthesis();
    console.log(cell.energy);

});


module.exports = ai;