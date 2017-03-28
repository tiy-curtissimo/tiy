'use strict'
const mkdirp = require('mkdirp-promise')
const fsp = require('fs-promise')
const bluebird = require('bluebird')
const co = bluebird.coroutine
const Game = require('./tic-tac-toe-game')
const path = require('path')

const GAME_SAVE_DIR = path.join(__dirname, '../sandwich')

const listGameFiles = co(function *() {
    yield mkdirp(GAME_SAVE_DIR)
    return fsp.readdir(GAME_SAVE_DIR)
})

const saveGame = co(function *(game, name){
    yield mkdirp(GAME_SAVE_DIR)
    const gameJson = game.toJson()
    const filename = path.join(GAME_SAVE_DIR, `${name}.game`)
    return fsp.writeFile(filename, gameJson)
})

const createDummyGames = co(function *(count) {
    
    for (let i = 0; i < count; i++) {
        yield saveGame(new Game({}), `fake-${i}`)
    }
})

const getGameData = gameFileName => {
    const filename = path.join(GAME_SAVE_DIR, gameFileName)
    return fsp.readFile(filename).then(JSON.parse)
}

const getAllGameData = co(function *() {
    const gameFiles = yield listGameFiles()
    const games = yield Promise.all(gameFiles.map(getGameData))
    return {
        games
    }
})

module.exports = {
    createDummyGames,
    getAllGameData
}
