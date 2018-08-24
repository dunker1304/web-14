const express = require('express');
const path = require('path');

let app = express();

// app.get('/', (req, res) => {
//   res.sendFile(path.resolve(__dirname, '../html-css/index.html'));
// });

app.get('/nam', (req, res) => {
  res.send('Hello nam');
});

app.get('/hoang', (req, res) => {
  res.send('Hello hoang');
});

app.get('/?name=hoang', (req, res) => {
  res.send('Hello hoang');
});

//http://localhost:6969/abcxyz
//http://localhost:6969/?name=abcxyz
//-> Hello abcxyz!
app.use(express.static('../html-css'));

app.listen(6969, (err) => {
  if(err) console.log(err)
  else console.log("Server is listening at port 6969!");
});