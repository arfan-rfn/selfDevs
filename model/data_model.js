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
    enroll: [ObjectId],
    teach: [ObjectId],
    comments: [ObjectId],
    profile: String,
    ratings: {},
    dob: {type: Date},
    date: {type: Date, default: Date.now()},
});

var courseSchema = new Schema({
    author: [ObjectId],
    title: String,
    desc: String,
    topic: [String],
    tags: [String],
    lectures: [ObjectId], // important for sort the sections
    enrollment: Number,
    like: Number,
    voters: Number,
    date: {type: Date, default: Date.now()},
});

var lectureSchema = new Schema({
    video: String,
    title: String,
    desc: String,
    section: Boolean, // if true have child, false no child, a lecture
    child:[ObjectId],  // important for sort all the lectures in a section
    author: [ObjectId],
    parent: ObjectId,
    tags:[String],
    resources: [String],
    comments: [ObjectId],
    date: {type: Date, default: Date.now()},
});

var commentSchema = new Schema({
    desc: {type: String, required: true},
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
    like: {type: Number, default: 0},
    dislike: {type: Number, default: 0},
    resources: [String],
    date: {type: Date, default: Date.now()},
});

module.exports = {
    user: mongoose.model('User', userSchema),
    course: mongoose.model('Courses', courseSchema),    
    lecture: mongoose.model('Lectures', lectureSchema),
    comment: mongoose.model('Comments', commentSchema),
};

