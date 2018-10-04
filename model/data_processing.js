'use strict';

const dataModel = require('./data_model');

class DataProcessing{
    constructor(callback){
        const mongoose = require('mongoose');
        mongoose.connect("mongodb://asif:asif111sharif@ds121593.mlab.com:21593/dev", { useNewUrlParser: true });
        mongoose.connection.on('error', (err)=>{
            callback(err);
        });
    }

    saveData(data, callback){
        var newData = dataModel.test(data);
        newData.save((err, result)=>{
            if(err){
                callback(err, null);
            }else{
                callback(null, result);
            }
        });
    }

    saveUser(data, callback){
        var newData = dataModel.user(data);
        newData.save((err, result)=>{
            if(err){
                callback(err, null);
            }else{
                callback(null, result);
            }
        });
    }

    findAllUser(callback){
        dataModel.user.find({}, (err, result)=>{
            if (err) {
                callback(err, null);
            }else{
                callback(null, result);
            }
        });
    }

    findAUser(data, callback){
        dataModel.user.find(data, (err, result)=>{
            if (err) {
                callback(err, null);
            }else if(result.length > 0){
                callback(null, result);
            }else{
                callback(null, null); 
            }
        });
    }
}
module.exports = DataProcessing;