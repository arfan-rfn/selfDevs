'use strict';

const DataProcessingObj = require('./data_processing');
const constant = require('./dev_constant');

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

// var comment = {
//     desc: "this is the 2 description of the comment",
//     type: constant.commentType.QUESTION,
//     parent: '5bb56c1f32f10a1ab070e7df',
//     author: '5bb57cdbaac01627222138f8',
//     child: ['5bb6ce551d48e857fe3ad7f7', '5bb6cf53977dba590ac7b894', ],
// };

// dataProcessing.addComment(comment,
//     (err, result) => {
//         if (err) {
//             console.log(err.message);
//         } else {
//             console.log("result: " + result);
//         }
//     }
// );

var course = {
    authors: ['5bb573af702be321802f1261'],
    title: 'title of the course',
    desc: 'this is the description of the course',
    topic: ['python'],
};

dataProcessing.addCourse(course, 
    (err, result)=>{
        if(err){
            console.log(err.message);
        }else{
            console.log('result: ' + result);
        }
    });

// dataProcessing.addRating(constant.schemaType.USER, '5bee7bf480899403c034927d', '5bb57a4cd4a3072490a35a33', 77, (err, result) => {
//     if (err) {
//         console.log("here " +err.message);
//     } else if(result){
//         console.log("\nresult: "+result);
//     }else{
//         console.log("no result");
//     }
// });

// var lecture = {
//     // _id: '5bee532fc4a8207d3c547837',
//     authors: ['5bb57412b850aa21d9092768'],
//     video_id: 'nJZcbidTutE',
//     title: 'This is the title for the lecture',
//     desc: 'Isnt is good to have a desc???',
//     course: '5bee312566d1a36e62ff9b82',
//     tags:['song']
// };

// dataProcessing.addLecture(lecture, (err, data)=>{
//     if(err){
//         console.log('err: ' + err.message);
//     }else{
//         console.log('result: ' + data);
//     }
// });

// dataProcessing.getUserInfo('5bb5755216efef22d9d88e6a', (err, data)=>{
//     if(err){
//         console.log("error: " + err);
//     }else if(data){
//         console.log("Result: \n", data);
//     }else{
//         console.log('no data found');
//     }
// });
