'use strict';


var ai = function* (cell) {

    while (true) {

        yield cell.photosynthesis();
        console.log(cell.energy);

    }

};


module.exports = ai;