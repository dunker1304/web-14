const express = require('express');
const QuestionRouter = express.Router();

const QuestionModel = require('../models/questionModel');

//Middleware
QuestionRouter.use((req, res, next) => {
    console.log('Hello middleware!');
    next();
});

QuestionRouter.get('/', (req, res) => {
  QuestionModel.find({  }, (err, questions) => {
    let randomNum = Math.floor(Math.random()*questions.length);
    QuestionModel
      .findOne({ })
      .skip(randomNum == 0 ? randomNum : randomNum - 1)
      .exec((err, questionFound) => {
        if(err) console.log(err)
        else res.send({ message: 'Success', question: questionFound });
      });
  });
});

QuestionRouter.get('/:questionId', (req, res) => {
  const { questionId } = req.params;
  QuestionModel.findById(questionId, (err, questionFound) => {
    if(err) console.log(err)
    else res.send({ message: "Success!", question: questionFound });
  });
});

module.exports = QuestionRouter;