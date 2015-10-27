'use strict';

let ai = function*(cell)
{
    while (true) {
        if (cell.scan() === null) {
            yield cell.reproduce();
        }
        else {
            if (cell.scan() != cell.id) {
                yield cell.attack();
            }
            if (cell.energy > 25) {
                yield cell.turnLeft();
                yield cell.move();
                yield cell.move();
            }
            else {
                yield cell.photosynthesis();
            }
        }
    }
}

module.exports = ai;