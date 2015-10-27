'use strit';

var ai = function* (cell) {
  var id = cell.id;
  while (true) {
    var inFront = cell.scan();
    if (!inFront && cell.energy > 10) {
      yield cell.reproduce();
    } else if (inFront && inFront != cell.id){
      yield cell.attack();
    }

    yield cell.turnLeft();
    yield cell.move();
    yield cell.photosynthesis();
    yield cell.photosynthesis();
    yield cell.photosynthesis();
  }
};

module.exports = ai;
