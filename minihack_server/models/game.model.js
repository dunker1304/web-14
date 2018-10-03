const mongoose = require('mongoose');

const GameSchema = new mongoose.Schema({
    players : [{
        type: String
    }],
    scores: [[
        {
            type: Number,
            default: 0
        }
    ]]
});

module.exports = mongoose.model("Game", GameSchema);