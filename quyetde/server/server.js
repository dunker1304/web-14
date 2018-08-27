const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');
const cors = require('cors');

let app = express();

app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send("Hello world");
});

app.post('/ask', (req, res) => {
  fs.readFile('./questions.txt', (err, fileData) => {
    if(err) console.log(err)
    else {
      try {
        const newQuestion = { questionContent: req.body.question }
        let questions = [];
        if(fileData.length > 0 && JSON.parse(fileData).length) {
          questions = JSON.parse(fileData);
        }
        questions.push(newQuestion);
        fs.writeFile('./questions.txt', JSON.stringify(questions), (err) => {
          if(err) console.log(err)
          else res.redirect('http://localhost:8080/');
        });
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  });
});

app.get('/question', (req, res) => {
  fs.readFile('./questions.txt', (err, fileData) => {
    if(err) console.log(err)
    else {
      try {
        let questions = JSON.parse(fileData);
        let randomNum = Math.floor(Math.random()*questions.length);
        let randomQuestion = questions[randomNum];
        res.send({ message: "Success!", question: randomQuestion });
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