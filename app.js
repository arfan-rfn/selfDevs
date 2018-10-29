const express = require('express');
const DataProcessingObj = require('./model/data_processing');

const app = express();

var dataProcessing = new DataProcessingObj((err) => {
    console.log(err.message);
});

const server_port = process.env.OPENSHIFT_NODEJS_PORT || 8080;
const server_ip = process.env.OPENSHIFT_NODEJS_IP || '127.0.0.1';

app.get("/", (req, res) => {
    dataProcessing.updateUsername({_id: '5bb573af702be321802f1261'}, {password: 'bbbbbb'}, (err, result)=>{
        if(err){
            res.end("something went wrong");
        }else if(result){
            res.json(result);
        }else{
            res.send('sorry no data found');
        }
    });
});

app.listen(server_port, server_ip, () => {
    console.log(`Listening of ${server_ip}, port ${server_port}`);
});