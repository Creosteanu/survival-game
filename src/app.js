'use strict';

var Q = require('q');

var dumbai = require('../ais/dumbai');

class cell {
    constructor(id, energy) {

        this.id = id;
        this.energy = energy;

    }

    photosynthesis() {

        this.action = 'photo';

        return Promise.resolve();

    }

}


(Q.async(function*() {

    try {
        console.log(1);
        var newCell = new cell(1, 10);

        console.log(1);
        yield dumbai(newCell);

        console.log(2);

        if (newCell.action === 'photo') {
            newCell.energy += 4;
        }

        yield dumbai(newCell);

        if (newCell.action === 'photo') {
            newCell.energy += 4;
        }
    } catch (ex) {
        console.log(ex);
    }
}))();

