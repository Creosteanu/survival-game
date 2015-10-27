'use strict';

var ais = require('./helpers/aiLoader');

var systemCells = [];
var map = [];

var addCellInMap = function (cell) {

    if (!map[cell.x]) {
        map[cell.x] = [];
    }

    map[cell.x][cell.y] = cell;

};

var getCellAtPosition = function(x,y) {

    return map[x] ? map[x][y] : undefined;

};

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
}

class Cell {
    constructor(id, energy, ai, x, y) {

        this.id = id;
        this.energy = energy;
        this.cellInterface = new CellInterface(id, energy);
        this.generator = ai;
        this.ai = ai(this.cellInterface);
        this.x = x;
        this.y = y;
        this.facing = 0;

        addCellInMap(this);

        this.exposeScan();

    }

    exposeScan() {

        var self = this;
        this.cellInterface.scan = function () {

            return self.scan();

        };

    }

    resetInterface() {

        this.cellInterface.energy = this.energy;
        this.cellInterface.id = this.id;

    }

    getPositionInFront() {

        var nextPosition = {x: this.x, y: this.y};

        switch (Math.abs(this.facing % 4)) {
            case 0:
                nextPosition.x--;
                break;
            case 1:
                nextPosition.y++;
                break;
            case 2:
                nextPosition.x++;
                break;
            case 3:
                nextPosition.y--;
        }

        return nextPosition;

    }

    cellAt(position) {

        return getCellAtPosition(position.x, position.y);

    }

    photosynthesis() {

        this.energy += 3;
        this.resetInterface();

    }

    turnLeft() {

        this.facing--;

    }

    turnRight() {

        this.facing++;

    }

    move() {

        var positionInFront = this.getPositionInFront();
        var positionOccupied = this.cellAt(positionInFront);

        if (!positionOccupied) {
            delete map[this.x][this.y];
            this.x = positionInFront.x;
            this.y = positionInFront.y;
            addCellInMap(this);
        }

    }

    attack() {

        var positionInFront = this.getPositionInFront();
        var cellInFront = this.cellAt(positionInFront);

        if (cellInFront) {
            var energyStolen = Math.min(cellInFront.energy, 100);
            this.energy += energyStolen;
            cellInFront.energy -= energyStolen;
        }

    }

    reproduce() {

        var positionInFront = this.getPositionInFront();
        var positionOccupied = this.cellAt(positionInFront);

        if (!positionOccupied) {
            var cell = new Cell(this.id, Math.floor(this.energy / 2), this.generator, positionInFront.x, positionInFront.y);
            systemCells.push(cell);
            this.energy = Math.floor( this.energy / 2);
        }


    }

    scan() {

        var positionInFront = this.getPositionInFront();
        var cellInFront = this.cellAt(positionInFront);

        if (cellInFront) {
            return cellInFront.id;
        }

        return null;

    }

}

try {

    ais.forEach(function (ai, index) {

        var cell = new Cell(ai.name, 100, ai.generator, 0, index * 10);
        systemCells.push(cell);

    });

    for (var turn = 0; turn < 1000; turn++) {

        console.log('Processing turn:', turn);
        systemCells.forEach(function (cell) {

            try {

                var action = cell.ai.next();

                if (typeof cell[action.value] === 'function') {
                    cell[action.value]();
                }

            } catch (e) {
                console.log('Error on ', cell.id, e);
            }

        });

        console.log('Consuming energy');
        systemCells.forEach(function (cell) {
            cell.energy--;
        });

        console.log('Killing cells');
        systemCells = systemCells.filter(function (cell) {
            return cell.energy > 0;
        });

        console.log(systemCells.length);

    }

} catch (e) {
    console.log('System exception', e);
}