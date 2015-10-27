'use strict';

var fs = require('fs');

var ais = [];

var aiFiles = fs.readdirSync('./ais');

aiFiles.forEach(function (aiFile) {

    ais.push({generator: require('../ais/' + aiFile), name: aiFile});

});

module.exports = ais;