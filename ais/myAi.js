'use strict';


var ai = function* (cell) {

    while (true) {

        var cellInFront = yield cell.scan();

        if (cellInFront)  {

            yield cell.attack();

        }
        
        if (cell.energy > 200) {

            yield cell.reproduce();

        }



    }

};


module.exports = ai;
