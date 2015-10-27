'use strict';

var ais = require('./helpers/aiLoader');

class CellInterface {
    constructor(id, energy) {
        this.id = id;
        this.energy = energy;
    }

    photosynthesis() {
        return 'photosynthesis';
    }

    turnLeft() {
        return 'turnLeft';
    }

    turnRight() {
        return 'turnRight';
    }

    move() {
        return 'move';
    }

    attack() {
        return 'attack';
    }

    reproduce() {
        return 'reproduce';
    }

    scan() {
        return 'scan';
    }
}

class Cell {
    constructor(id, energy, ai, x, y) {

        this.id = id;
        this.energy = energy;
        this.cellInterface = new CellInterface(id, energy);
        this.ai = ai(this.cellInterface);
        this.x = x;
        this.y = y;

    }

    resetInterface() {

        this.cellInterface.energy = this.energy;
        this.cellInterface.id = this.id;

    }

    photosynthesis() {

        this.energy += 4;
        this.resetInterface();

    }

}

var systemCells = [];

ais.forEach(function (ai, index) {

    var cell = new Cell(ai.name, 5, ai.generator, 0, index * 10);
    systemCells.push(cell);

});

for (var turn = 0; turn < 10; turn++) {

    console.log('Processing turn:', turn);

    systemCells.forEach(function (cell) {

        console.log('Processing:', cell.id);
        var action = cell.ai.next();

        if (typeof cell[action.value] === 'function') {
            cell[action.value](systemCells);
        }

    });

}

