'use strict';


var smartAi = function* (cell) {

    var cells = [];

    while (true) {

        var cellInFront = cell.scan();

        if (cellInFront)  {

            if( cell.id !== cellInFront )
            {

                yield cell.attack();

            } else { 

                yield cell.turnLeft();

            }

        } 
        
        if (cell.energy > 10) {

            yield cell.reproduce();
            yield cell.move();

        }


        yield cell.move();
        yield cell.photosynthesis();



    }

};


module.exports = smartAi;
