// const 
// let 
// var 

// function functionName(age) {
//   console.log("Age: "+age);
// }

// const functionName = function(age) {
//   console.log(age);
// }
// functionName(undefined, 8);

// const functionName = (age) => {
//   console.log(age);
// }

// a = 6;

// function print() {
//   var b = 10;

//   console.log(a); // 6
//   console.log(b); // 10
// }

// print();

// console.log(global.b); // 6
// console.log(b); // undefined

// function count(num) {
//   for(var i = num; i >= 0; i--) {
//     print(i, num-i);
//   }
// }

// function print(num, time) {
//   setTimeout(function() {
//     console.log(num);
//   }, 1000*time);
// }

// count(5);
// count(5);
// async

// function printA(onLogADone) {
//   setTimeout(function() {
//     console.log("A");
//     onLogADone();
//   }, 1000);
// }

// function printB() {
//   console.log("B");
// }
// function printC() {
//   console.log("C");
// }

// printA(printB);
// printA(printC);