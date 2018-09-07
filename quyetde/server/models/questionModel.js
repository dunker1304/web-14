const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
    // id: Number,
    content: { type: String, require: true },
    yes: { type: Number, default: 0 },
    no: { type: Number, default: 0 }
}, {
    // _id: false,
    timestamps: true
});

module.exports = mongoose.model('question', QuestionSchema);