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
//     username: 'chowdhury',
//     password: 'uddin',
//     email: 'rfn.com',
//     DOB: Date.now()
// };

// dataProcessing.updateUserId(user,
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


// dataProcessing.updateOne({username: 'arfan'}, {password: 'eeeeeeee'}, (err, result)=>{
//     if (err) {
//         console.log(err.message);
//     } else if(result){
//         console.log(result);
//     } else{
//         console.log("no data found");
//     }
// });

// dataProcessing.findAUser({username: 'arfan'}, (err, result)=>{
//     if (err) {
//         console.log(err.message);
//     } else if(result){
//         console.log(result);
//     } else{
//         console.log("no data found");
//     }
// });

var comment = {
    desc: "this is the 2 description of the comment",
    type: "2 test comment",
    parent: '5bb56c1f32f10a1ab070e7df',
    author: '5bb573af702be321802f1261',
    child: ['5bb6ce551d48e857fe3ad7f7', '5bb6cf53977dba590ac7b894', ],
};

dataProcessing.addComment(comment,
    (err, result) => {
        if (err) {
            console.log(err.message);
        } else {
            console.log("result: " + result);
            console.log("user ");
            dataProcessing.findAUser({_id: result.author}, (error, rslt)=>{
                if(error){console.log(error);}
                else{console.log(rslt);}
            });
        }
    }
);