'use strict';

const devConstant = require('./dev_constant');

var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var ObjectId = Schema.Types.ObjectId;

var userSchema = new Schema({
    username: {type: String, unique: true, lowercase: true, trim: true, select: true},
    firstname: String,
    lastname: String,
    password: {type: String, select: false},
    email: String,
    mobile: Number,
    enroll: {type:[ObjectId], default:[]},
    teach: {type:[ObjectId], default:[]},
    comments: {type:[ObjectId], default:[]},
    profile_pic: String,
    dob: {type: Date},
    rating:{type: [{user: ObjectId, rate: Number}], default: []},
    point:{
        size: {type: Number, default: 0},
        sum: {type: Number, default: 0},
        point: {type: Number, default: 0},
    },
    date: {type: Date, default: Date.now()},
});

var courseSchema = new Schema({
    authors: [ObjectId],
    title: String,
    desc: String,
    profile_pic: String,
    topic: [String],
    tags: [String],
    lectures: {type: [ObjectId], default: []}, // important for sort the sections
    rating:{type: [{user: ObjectId, rate: Number}], default: []},
    enroll: {type: [ObjectId], default: []},
    paid: {type: Boolean, default: false},
    date: {type: Date, default: Date.now()},
});

var lectureSchema = new Schema({
    authors: [ObjectId],
    video_id: {type: String, required: true},
    title: {type: String, required: true},
    desc: String,
    course: ObjectId,
    profile_pic: String,
    tags:[String],
    resources: [String],
    paid: {type: Boolean, default: false},
    rating:{type: [{user: ObjectId, rate: Number}], default: []},
    date: {type: Date, default: Date.now()},
});

var commentSchema = new Schema({
    desc: {type: String},
    type: {
        type: String, 
        required: true, 
        enum: [devConstant.commentType.QUESTION,
            devConstant.commentType.ANSWER, 
            devConstant.commentType.COMMENT, 
            devConstant.commentType.REVIEW]},
    solved: Boolean,
    anonymous: {type: Boolean, default: false},
    parent: {type: ObjectId, required: true},
    author: {type: ObjectId, required: true},
    child: {type: [ObjectId],},
    notify: [ObjectId],  // notify all the people something happens
    rating:{type: [{user: ObjectId, rate: Number}], default: []},
    resources: [String],
    date: {type: Date, default: Date.now()},
});

module.exports = {
    user: mongoose.model('User', userSchema),
    course: mongoose.model('Courses', courseSchema),    
    lecture: mongoose.model('Lectures', lectureSchema),
    comment: mongoose.model('Comments', commentSchema),
};

