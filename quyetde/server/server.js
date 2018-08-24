const express = require('express');
const fs = require('fs');
const bodyParser = require('body-parser');

let app = express();

app.use(bodyParser.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.send("Hello world");
});

app.post('/ask', (req, res) => {
  console.log("Question: " + req.body.question);
  fs.readFile('./questions.txt', (err, fileData) => {
    if(err) console.log(err)
    else {
      try {
        const newQuestion = { question: req.body.question }
        let questions = [];
        if(fileData.length > 0 && JSON.parse(fileData).length) {
          questions = JSON.parse(fileData);
        }
        questions.push(newQuestion);
        fs.writeFile('./questions.txt', JSON.stringify(questions), (err) => {
          if(err) console.log(err)
          else console.log("Success!");
        });
      } catch (error) {
        console.log("Error: ", error);
      }
    }
  });
});

app.listen(6969, (err) => {
  if(err) console.log(err)
  else console.log("Server is listening at port 6969!");
});