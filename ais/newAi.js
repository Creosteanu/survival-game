'use strict';


var ai = function* (cell) {

    var counter = 0
    while (true) {
        if (counter < 4 && cell.energy > 6){
        	yield cell.reproduce();
	        yield cell.turnLeft();
	        counter++;
	    } else {
	    	yield cell.photosynthesis();
	    }


    }

};


module.exports = ai;
