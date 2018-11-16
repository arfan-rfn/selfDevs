'use strict';

const dataModel = require('./data_model');
const devConstant = require('./dev_constant');

class DataProcessing {
    constructor(callback) {
        const mongoose = require('mongoose');
        mongoose.set('useFindAndModify', false);
        mongoose.connect("mongodb://asif:asif111sharif@ds121593.mlab.com:21593/dev", {
            useCreateIndex: true,
            useNewUrlParser: true
        });
        mongoose.connection.on('error', (err) => callback(err));
    }

    saveData(data, callback) {
        var newData = dataModel.test(data);
        newData.save((err, data) => callback(err, data));
    }

    saveUser(data, callback) {
        var newData = dataModel.user(data);
        newData.save((err, data) => callback(err, data));
    }

    findAllUser(callback) {
        dataModel.user.find({}, (err, data) => callback(err, data));
    }

    findAUser(data, callback) {
        dataModel.user.find(data, (err, data) => callback(err, data));
    }

    updateUserInfo(id, updateData, callback) {
        if (id._id) {
            dataModel.user.findByIdAndUpdate(id._id, updateData, (err, data) => callback(err, data));
        } else {
            dataModel.user.findOneAndUpdate(id, updateData, (err, data) => callback(err, data));
        }
    }

    addComment(data, callback) {
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
        }
        var newData = dataModel.comment(data);
        newData.save((err, data) => {
            if (err) {
                callback(err, null);
            } else {
                // update user schema
                dataModel.user.findByIdAndUpdate(data.author, {
                        $push: {
                            comments: data._id
                        }
                    },
                    (err, updatedUser) => {
                        if (err) {
                            callback(err, null);
                        } else {
                            callback(null, data);
                        }
                    });
            }
        });
    }

    addCourse(courseData, callback) {
        if (courseData._id) {
            dataModel.course.findByIdAndUpdate(courseData._id, courseData,
                (err, data) => callback(err, data)
            );
        } else {
            var newCourse = dataModel.course(courseData);
            newCourse.save((err, data) => callback(err, data));
        }
    }

    addLecture(lectureData, callback) {
        if (lectureData._id) {
            dataModel.lecture.findByIdAndUpdate(lectureData._id, lectureData,
                (err, data) => callback(err, data)
            );
        } else {
            var newCourse = dataModel.lecture(lectureData);
            newCourse.save((err, data) => {
                dataModel.course.findByIdAndUpdate(data.course, {$push:{lectures: data._id}},
                    (newErr, newData) => callback(newErr || err, data));
            });
        }
    }

    addRating(schema, id, user, rate, callback) {
        var errFound;
        dataModel[schema].findByIdAndUpdate(id, {
            $pull: {
                rating: {user: user}
            }
        }, (err) => errFound = err);
        dataModel[schema].findByIdAndUpdate(id, {
            $push: {
                rating: {
                    user: user,
                    rate: rate
                }
            }
        }, (err, data) => callback(errFound || err, data));
    }

    getUserInfo(id, callback){
        var userInfo = {
            userData:{},
            course: [],
            enroll:[]
        };
        dataModel.user.findById(id, (err, data)=>{
            if(err){
                return callback(err, null);
            }else if(data){
                userInfo.userData = data;
            }else{
                return callback(null, null);
            }
        });

        dataModel.course.find({authors: id}, (err, data)=>{
            if(err){
                return callback(err, userInfo);
            }else{
                userInfo.course = data;
            }
        });

        dataModel.course.find({enroll: id}, (err, data)=>{
            if(err){
                return callback(err, userInfo);
            }else{
                userInfo.enroll = data;
                return callback(err, userInfo);
            }
        });


    }
}
module.exports = DataProcessing;