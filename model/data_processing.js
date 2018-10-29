'use strict';

const dataModel = require('./data_model');

class DataProcessing{
    constructor(callback){
        const mongoose = require('mongoose');
        mongoose.set('useFindAndModify', false);
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

    updateOne(id, updateData, callback){
        if (id._id) {
            dataModel.user.findByIdAndUpdate(id._id, updateData, (err, result)=>{
                if (err) {
                    callback(err, null);
                }else{
                    callback(null, result); 
                }
            });   
        }else{
            dataModel.user.findOneAndUpdate(id, updateData, (err, result)=>{
                if (err) {
                    callback(err, null);
                }else{
                    callback(null, result); 
                }
            });
        }
    }

    addComment(data, callback){
        var newData = dataModel.comment(data);
        newData.save((err, result)=>{
            if(err){
                callback(err, null);
            }else{
                callback(null, result);
            }
        });
    }
}
module.exports = DataProcessing;