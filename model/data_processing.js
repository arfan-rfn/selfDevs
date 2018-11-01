'use strict';

const dataModel = require('./data_model');
const devConstant = require('./dev_constant');

class DataProcessing{
    constructor(callback){
        const mongoose = require('mongoose');
        mongoose.set('useFindAndModify', false);
        mongoose.connect("mongodb://asif:asif111sharif@ds121593.mlab.com:21593/dev", { 
            useCreateIndex: true,
            useNewUrlParser: true 
        });
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

    updateUserInfo(id, updateData, callback){
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
        data.notify = [data.author];
        switch (data.type) {
            case devConstant.commentType.QUESTION:
                data.solved = false;
                // TODO: find the author of the course, and add it to the data.notify list
                // TODO: send notification to all user _id on the notify list
                break;

            case devConstant.commentType.ANSWER:
                // TODO: add the comment author _id to the question notify (data.parent)
                // TODO: send notification to all the user _id on the QUESTION notify list
                break;

            case devConstant.commentType.REVIEW:
                // TODO: add the parent author _id to the notify list
                // TODO: send notification to the notify list
                break;

            case devConstant.commentType.COMMENT:
                // TODO: (same as review )add the parent author _id to the notify list
                // TODO: send notification to the notify list
                break;

            default:
                throw "CommentSchema.type must be a valid option!";
                break;
        }
        var newData = dataModel.comment(data);
        newData.save((err, result)=>{
            if(err){
                callback(err, null);
            }else{
                // update user schema
                dataModel.user.findByIdAndUpdate(result.author, 
                    {$push:{comments:result._id}}, 
                    (err, updatedUser)=>{
                    if (err) {
                        callback(err, null);
                    }else{
                        callback(null, result); 
                    }
                });
            }
        });
    }
}
module.exports = DataProcessing;