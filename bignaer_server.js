// // function add(a, b){
// //     return a+ b;
// // }

// // var add = function(a, b){return a+b;}

// // var add = (a, b) => {return a + b;}

// var add = (a, b) => a+b;

// var result = add(124, 3);
// console.log(result);

// (function(){
//     console.log("function call");
// })();

// -------------------part 2--------------------
// function callback(){
    //     console.log('calling callbackl function');
// }

// const add = (a,b, callback) => {
    //     var result = a+b;
    //     console.log('result: '+result);
    //     callback();
    // }
    
    // add(3,4, callback);


// -------------------part 3--------------------
// const add = (a, b, raju) => {
//     var result = a+b;
//     console.log('result: '+result);
//     raju();
// }

// add(1,4,() => {console.log('this fun convet to Raju');});



// -------------------part 4 (OS/file)--------------------
// const fs = require('fs');
// const os = require('os');

// var user = os.userInfo();
// console.log(user.username);

// fs.appendFile('greating.txt', 'Hii, '+user.username+'!\n', ()=>{console.log('File Created!')});


// var _ = require('lodash');


// const notes = require('./notes');
// //get vale from file
// const age = notes.age;
// var result = notes.addNumber(age, 18)
// console.log(age);
// console.log('result is now: '+result);


// var data = ['persion', 'persion', 1, 2, 1, 2, 'name', 'age', '2'];
// var filter =  _.uniq(data);
// console.log('uniq is: '+filter);

// console.log(_.isString(3))

// // ------------------------String To Obj---------------------
// const jsonString = '{"name": "Raju", "age": 20, "city": "Surat"}';
// const jsonObject = JSON.parse(jsonString);

// console.log("Sting to Obj");
// console.log(jsonObject);
// // ------------------------Obj  To String---------------------
// const json = JSON.stringify(jsonObject);
// console.log("Obj to Sting");
// console.log(json);


