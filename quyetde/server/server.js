const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const QuestionModel = require('./models/questionModel');

mongoose.connect('mongodb://localhost/quyetde', (err) => {
  if(err) console.log("DB connect error!", err)
  else console.log("DB connect success!");
});

let app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send("Hello world");
});

app.post('/ask', (req, res) => {
  const newQuestion = {
    content: req.body.question
  }
  QuestionModel.create(newQuestion, (err, questionCreated) => {
    if(err) console.log(err)
    else res.redirect('http://localhost:8080/');
  });
});

app.get('/question', (req, res) => {
  QuestionModel.find({  }, (err, questions) => {
    let randomNum = Math.floor(Math.random()*questions.length);
    QuestionModel
      .findOne({ })
      .skip(randomNum == 0 ? randomNum : randomNum - 1)
      .exec((err, questionFound) => {
        console.log(questionFound)
        if(err) console.log(err)
        else res.send({ message: 'Success', question: questionFound });
      });
  });
});

app.get('/question/:questionId', (req, res) => {
  const { questionId } = req.params;
  QuestionModel.findById(questionId, (err, questionFound) => {
    if(err) console.log(err)
    else res.send({ message: "Success!", question: questionFound });
  });
})

app.put('/answer', (req, res) => {
  const { answer, questionId } = req.body;
  QuestionModel.findById(questionId, (err, questionFound) => {
    if(err) console.log(err)
    if(!questionFound) res.send({ message: 'Question not found!', question: null })
    else {
      questionFound[answer] += 1;
      questionFound.save((err, questionUpdated) => {
        if(err) console.log(err)
        else res.send({ message: 'Success', question: questionUpdated });
      })
    }
  });
  // QuestionModel.findByIdAndUpdate(
  //   questionId,
  //   { $inc: { [answer]: 1 } },
  //   { new: true },
  //   (err, questionUpdated) => {
  //     if(err) console.log(err)
  //     else res.send({ message: 'success', question: questionUpdated });
  //   });
});

app.listen(6969, (err) => {
  if(err) console.log(err)
  else console.log("Server is listening at port 6969!");
});