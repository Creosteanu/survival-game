'use strict';


var ai = function* (cell) {

    var myId = cell.id;

    while (true) {

        var scanRes = cell.scan()


        yield cell.photosynthesis();

        if(scanRes === myId) {
            console.log("1");

            yield cell.photosynthesis();
            yield cell.turnLeft();
        }
        // its not you
        else if(scanRes && scanRes !== myId) {
            //console.log("2")
            yield cell.attack();
        }
        // empty
        else {
            //console.log("3")
            yield cell.reproduce();
        }

        yield cell.photosynthesis();
    }

};


module.exports = ai;