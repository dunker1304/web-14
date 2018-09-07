const express = require('express');
const fs = require('fs');
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
  // fs.readFile('./questions.txt', (err, fileData) => {
  //   if(err) console.log(err)
  //   else {
  //     try {
  //       let questions = JSON.parse(fileData);
  //       let randomNum = Math.floor(Math.random()*questions.length);
  //       let randomQuestion = questions[randomNum];
  //       res.send({ message: "Success!", question: randomQuestion });
  //     } catch (error) {
  //       console.log("Error!!! ", error);
  //     }
  //   }
  // });
});

app.get('/question/:questionId', (req, res) => {
  fs.readFile('./questions.txt', (err, fileData) => {
    if(err) console.log(err)
    else {
      try {
        let questionId = req.params.questionId;
        let questions = JSON.parse(fileData);
        let question = questions[questionId - 1];
        res.send({ message: "Success!", question });
      } catch (error) {
        console.log("Error!!! ", error);
      }
    }
  })
})

app.put('/answer', (req, res) => {
  // const answer = req.body.answer;
  // const questionId = req.body.questionId;
  const { answer, questionId } = req.body;
  fs.readFile('./questions.txt', (err, fileData) => {
    if(err) console.log(err)
    else {
      try {
        let questions = JSON.parse(fileData);
        if(questions[questionId - 1]) {
          // if(answer == 'yes')
          //   questions[questionId - 1].yes += 1
          // else
          //   questions[questionId - 1].no += 1
          questions[questionId - 1][answer] += 1;
        }
        fs.writeFile('./questions.txt', JSON.stringify(questions), (err) => {
          if(err) console.log(err)
          else res.send({ message: "Success!", question: questions[questionId - 1] });
        });
      } catch (error) {
        console.log("Error!!! ", error);
      }
    }
  });
});

app.listen(6969, (err) => {
  if(err) console.log(err)
  else console.log("Server is listening at port 6969!");
});