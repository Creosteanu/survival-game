'use strict';


var ai = function* (cell) {

    while (true) {

        yield cell.photosynthesis();
        yield cell.photosynthesis();
        yield cell.turnLeft();
        yield cell.reproduce();

    }

};


module.exports = ai;