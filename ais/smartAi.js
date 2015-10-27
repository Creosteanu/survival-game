'use strict';

function *foo(cell) {
    var result = cell.scan();

    if (!result) {
        yield cell.reproduce();
    } else if (result !== cell.id) {
        yield cell.attack();
    } else {
        yield cell.move();
    }
}

var ai = function* (cell) {
    var result =  cell.scan();
    var minRequiredEnergy = 15;
   
    if (cell.energy < minRequiredEnergy) {
        for (let i=cell.energy; i < minRequiredEnergy; i+=3) {
            yield cell.photosynthesis();
        }
    }

    yield *foo(cell);
    yield cell.turnRight();
    yield *foo(cell);
    yield cell.turnRight();
    yield *foo(cell);
   
    yield cell.move();
};


module.exports = function *(cell) {
    while (true) {
        yield *ai(cell);
    }   
};
