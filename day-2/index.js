'use strict'
const gameFs = require('./src/game-fs')

gameFs
    .createDummyGames(5)
    .then(gameFs.getAllGameData)
    .then(games => console.log(JSON.stringify(games, null, 2)))
