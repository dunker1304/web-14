const express = require('express');
const Router = express.Router();

const GameModel = require('../models/game.model');

Router.get('/game/:id', (req, res) => {
    try {
        let gameId = req.params.id;
        if(gameId) {
            GameModel.findById(gameId, (err, gameFound) => {
                if(err) res.status(500).json({ success: 0, err: err })
                else res.json({ success: 1, game: gameFound });
            });
        } else res.json({ success: 0, err: "Missing parameter game id!" });
    } catch (error) {
        console.error(error);
    }
});

Router.post('/game', (req, res) => {
    try {
        let newGame = req.body;
        GameModel.create(newGame, (err, newGameCreated) => {
            if(err) res.status(500).json({ success: 0, err: err })
            else res.json({ success: 1, game: newGameCreated });
        });
    } catch (error) {
        console.error(error);
    }
});

Router.put('/game', (req, res) => {
    try {
        let gameId = req.body.gameId;

        if(gameId) {
            GameModel.findById(gameId, (err, gameFound) => {
                if(err) res.status(500).json({ success: 0, err: err })
                else if (gameFound) {
                    if(req.body.scores) {
                        gameFound.scores = req.body.scores;
                    } else gameFound.scores.push([ 0, 0, 0, 0 ]);

                    gameFound.save((err, gameUpdated) => {
                        if(err) res.status(500).json({ success: 0, err: err })
                        else res.json({ success: 1, game: gameUpdated });
                    });
                }
            });
        }
    } catch (error) {
        console.error(error);
    }
});

module.exports = Router;