'use strict';

const DataProcessingObj = require('./data_processing');

var dataProcessing = new DataProcessingObj((err) => {
    console.log(err.message);
});

// var data = {
//     username: "arfan",
//     todo: "new task to do",
//     isDone: false,
//     hasAttachment: true
// };

// dataProcessing.saveData(data,
//     (err, result) => {
//         if (err) {
//             console.log(err.message);
//         } else {
//             console.log("result: " + result);
//         }
//     }
// );

// var user = {
//     username: 'arfan',
//     password: 'nity',
//     email: 'arfan@selfdevs.com',
//     DOB: Date.now()
// };

// dataProcessing.saveUser(user,
//     (err, result) => {
//         if (err) {
//             console.log(err.message);
//         } else {
//             console.log("result: " + result);
//         }
//     }
// );

// dataProcessing.findAllUser((err, result)=>{
//     if (err) {
//         console.log(err.message);
//     } else {
//         console.log(result);
//     } 
// });

dataProcessing.findAUser({password: 'pass'}, (err, result)=>{
    if (err) {
        console.log(err.message);
    } else if(result){
        console.log(result);
    } else{
        console.log("no data found");
    }
});