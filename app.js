const DataProcessingObj = require('./model/data_processing');
const DataModel = require('./model/data_model');
const course = require('./model/routes/course');
const user = require('./model/routes/users');

const express = require('express');
const bodyParser = require("body-parser");
const path = require('path');
const router = express.Router();

const app = express();

// variables 
var ERROR;

// set the view engine to ejs 
app.set('view engine', 'ejs');
app.use("/public", express.static(path.join(__dirname, 'views')));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Routers
app.use('/course', course);
app.use('/dev', user);

var dataProcessing = new DataProcessingObj((err) => {
    ERROR = err;
});

const server_port = 3000;
const server_ip = '127.0.0.1';

app.get("/", (req, res) => {
    if(ERROR){
        res.send('Service Unavailable!');
    }
    DataModel.course
        .find()
        .populate({
            path: 'authors',
            model: 'User',
        })
        .exec((err, result)=>res.render('index', {data: result}));
});

app.get("/:id", (req, res) => {
    if(ERROR){
        res.send('Service Unavailable!');
    }
    var userInfo = {
        userData:{},
        course: [],
        enroll:[]
    };
    DataModel.user
        .findOne({'username': req.params.id})
        .exec((err, result)=> {
            if(result){
                res.redirect('/dev/'+result._id);
            }else{
                res.send('nothing found!');
            }
        });
});

app.listen(server_port, server_ip, () => {
    console.log(`Listening of ${server_ip}, port ${server_port}`);
});