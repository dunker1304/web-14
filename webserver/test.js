const fs = require('fs');

const objData = {
  a: 10,
  b: 15,
  c: 25
}

console.log('Start write file!');

fs.writeFile('./test.txt', JSON.stringify(objData), (error) => {
  if(error) console.log(error)
  else console.log('Write file success!');
});

fs.readFile('./test.txt', (err, fileData) => {
  if(err) console.log(err)
  else console.log("File data: "+JSON.parse(fileData).a);
});

console.log('End write file!');