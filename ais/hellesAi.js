'use strit';

global.fasajkflsafsdf = 0;

var ai = function* (cell) {
  var id = cell.id;
  while (true) {
    fasajkflsafsdf++;
    var inFront = cell.scan();
    if (inFront && fasajkflsafsdf > 8) {
      if (inFront != cell.id){
        yield cell.attack();
      } else {
        yield cell.turnLeft();
      }
    }

    if (cell.energy > 5) {
      yield cell.reproduce();
    }

    yield cell.photosynthesis();
    yield cell.move();
  }
};

module.exports = ai;
